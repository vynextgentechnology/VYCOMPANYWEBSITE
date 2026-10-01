import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const TOTAL_FRAMES = 200;
const FRAME_PREFIX_DESKTOP = "/hero-frames/ezgif-frame-";
const FRAME_PREFIX_MOBILE = "/hero-frames-mobile/ezgif-frame-";
const FRAME_EXT = ".webp";

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const endContentRef = useRef<HTMLDivElement>(null);
  const dimOverlayRef = useRef<HTMLDivElement>(null);
  const bottomCueRef = useRef<HTMLDivElement>(null);

  // Viewport detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });
  const isMobileRef = useRef<boolean>(isMobile);

  // Frame image buffer: loaded frames remain in memory to eliminate re-fetching & GC stutter
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const loadingSetRef = useRef<Set<number>>(new Set());
  const nearestLoadedRef = useRef<number[]>(new Array(TOTAL_FRAMES).fill(0));

  // Canvas geometry cache
  const renderWRef = useRef<number>(0);
  const renderHRef = useRef<number>(0);
  const offsetXRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);

  // Animation update state
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isTickingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const isHeroVisibleRef = useRef<boolean>(true);

  // Velocity tracking
  const lastScrollProgressRef = useRef<number>(0);

  // Uses lightweight 36KB mobile frames on mobile, full master frames on desktop
  const getFrameUrl = useCallback((index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    const prefix = isMobileRef.current ? FRAME_PREFIX_MOBILE : FRAME_PREFIX_DESKTOP;
    return `${prefix}${frameNumber}${FRAME_EXT}`;
  }, []);

  // Update nearest loaded frame lookup table
  const updateNearestLookup = useCallback((loadedIdx: number) => {
    const lookup = nearestLoadedRef.current;
    lookup[loadedIdx] = loadedIdx;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (isLoadedRef.current[i]) {
        lookup[i] = i;
      } else {
        let closest = lookup[i];
        let minDiff = Math.abs(i - closest);
        for (const check of [loadedIdx, lookup[Math.max(0, i - 1)], lookup[Math.min(TOTAL_FRAMES - 1, i + 1)]]) {
          if (isLoadedRef.current[check] && Math.abs(i - check) < minDiff) {
            closest = check;
            minDiff = Math.abs(i - check);
          }
        }
        lookup[i] = closest;
      }
    }
  }, []);

  // Hardware-accelerated direct canvas draw
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const actualIdx = nearestLoadedRef.current[frameIdx] ?? 0;
    const img = imagesRef.current[actualIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.drawImage(
      img,
      offsetXRef.current,
      offsetYRef.current,
      renderWRef.current,
      renderHRef.current
    );
    renderedFrameRef.current = frameIdx;
  }, []);

  // Asynchronous image loader with off-thread decode
  const loadSingleFrame = useCallback((idx: number): Promise<void> => {
    if (idx < 0 || idx >= TOTAL_FRAMES) return Promise.resolve();
    if (isLoadedRef.current[idx] && imagesRef.current[idx]) return Promise.resolve();
    if (loadingSetRef.current.has(idx)) return Promise.resolve();

    loadingSetRef.current.add(idx);

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(idx);

      const onDone = () => {
        loadingSetRef.current.delete(idx);
        imagesRef.current[idx] = img;
        isLoadedRef.current[idx] = true;
        updateNearestLookup(idx);

        const targetIdx = Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1));
        if (idx === 0 || targetIdx === idx) {
          drawFrame(idx);
        }
        resolve();
      };

      if (img.complete && img.naturalWidth > 0) {
        onDone();
      } else {
        img.onload = () => {
          if ("decode" in img) {
            img.decode().then(onDone).catch(onDone);
          } else {
            onDone();
          }
        };
        img.onerror = () => {
          loadingSetRef.current.delete(idx);
          resolve();
        };
      }
    });
  }, [getFrameUrl, updateNearestLookup, drawFrame]);

  // Buffer manager: loads frames without evicting already loaded frames
  const preloadSurroundingFrames = useCallback((centerIdx: number, direction: "down" | "up" = "down") => {
    const isMob = isMobileRef.current;
    const bufAhead = isMob ? 10 : 16;
    const bufBehind = isMob ? 6 : 10;
    const step = isMob ? 2 : 1;

    const start = Math.max(0, centerIdx - bufBehind);
    const end = Math.min(TOTAL_FRAMES - 1, centerIdx + bufAhead);

    if (direction === "down") {
      for (let i = centerIdx; i <= end; i += step) {
        if (!isLoadedRef.current[i] && !loadingSetRef.current.has(i)) loadSingleFrame(i);
      }
      for (let i = centerIdx - 1; i >= start; i--) {
        if (!isLoadedRef.current[i] && !loadingSetRef.current.has(i)) loadSingleFrame(i);
      }
    } else {
      for (let i = centerIdx; i >= start; i -= step) {
        if (!isLoadedRef.current[i] && !loadingSetRef.current.has(i)) loadSingleFrame(i);
      }
      for (let i = centerIdx + 1; i <= end; i++) {
        if (!isLoadedRef.current[i] && !loadingSetRef.current.has(i)) loadSingleFrame(i);
      }
    }
  }, [loadSingleFrame]);

  // Canvas geometry & fill-rate optimization
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMob = window.innerWidth < 768;
    setIsMobile(isMob);
    isMobileRef.current = isMob;

    // Optimized DPR: 1.15x on mobile, 1.5x on desktop for high fill-rate efficiency without lag
    const dpr = isMob ? Math.min(window.devicePixelRatio || 1, 1.15) : Math.min(window.devicePixelRatio || 1, 1.5);
    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = isMob ? "medium" : "high";
      }
    }

    const sourceW = isMob ? 960 : 1920;
    const sourceH = isMob ? 540 : 1080;
    const scale = Math.max(targetW / sourceW, targetH / sourceH);
    const rw = sourceW * scale;
    const rh = sourceH * scale;
    renderWRef.current = rw;
    renderHRef.current = rh;
    offsetXRef.current = (targetW - rw) * 0.5;
    offsetYRef.current = (targetH - rh) * 0.5;

    const currentFrame = Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1));
    drawFrame(currentFrame);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 80);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [resizeCanvas]);

  // Initial progressive loading
  useEffect(() => {
    loadSingleFrame(0);

    const timer = setTimeout(() => {
      preloadSurroundingFrames(0, "down");
      // Preload milestone keyframes so any fast scroll immediately finds a frame
      [25, 50, 75, 100, 125, 150, 175, 199].forEach((idx, i) => {
        setTimeout(() => {
          if (!isLoadedRef.current[idx]) loadSingleFrame(idx);
        }, 80 + i * 40);
      });
    }, 40);

    return () => clearTimeout(timer);
  }, [loadSingleFrame, preloadSurroundingFrames]);

  // Smooth background prefetcher during browser idle time for zero-lag scrubbing
  useEffect(() => {
    let cancelled = false;
    let nextIdx = 1;

    const prefetchNext = () => {
      if (cancelled || nextIdx >= TOTAL_FRAMES) return;

      const batchSize = isMobileRef.current ? 2 : 4;
      for (let b = 0; b < batchSize && nextIdx < TOTAL_FRAMES; b++) {
        if (!isLoadedRef.current[nextIdx] && !loadingSetRef.current.has(nextIdx)) {
          loadSingleFrame(nextIdx);
        }
        nextIdx++;
      }

      if (nextIdx < TOTAL_FRAMES && !cancelled) {
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          (window as any).requestIdleCallback(
            () => {
              setTimeout(prefetchNext, isMobileRef.current ? 40 : 20);
            },
            { timeout: 800 }
          );
        } else {
          setTimeout(prefetchNext, isMobileRef.current ? 60 : 30);
        }
      }
    };

    const startTimer = setTimeout(prefetchNext, 250);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [loadSingleFrame]);

  const updateOverlayStyles = useCallback((progress: number) => {
    if (headerRef.current) {
      if (progress <= 0.18) {
        const opacity = Math.max(0, 1 - progress * 5.5);
        const translateY = -progress * 50;
        headerRef.current.style.opacity = String(opacity);
        headerRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        headerRef.current.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
        headerRef.current.style.display = "flex";
      } else {
        headerRef.current.style.opacity = "0";
        headerRef.current.style.pointerEvents = "none";
        headerRef.current.style.display = "none";
      }
    }

    if (endContentRef.current) {
      if (progress >= 0.58) {
        // Pop-out scroll-driven entrance animation between 0.58 and 0.88
        const popProgress = Math.min(1, Math.max(0, (progress - 0.58) / 0.30));
        const scale = 0.68 + popProgress * 0.32;
        const translateY = Math.round((1 - popProgress) * 55);
        const opacity = Math.min(1, popProgress * 1.35);

        endContentRef.current.style.opacity = String(opacity);
        endContentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        endContentRef.current.style.pointerEvents = popProgress > 0.4 ? "auto" : "none";
        endContentRef.current.style.display = popProgress > 0.01 ? "flex" : "none";

        if (dimOverlayRef.current) {
          dimOverlayRef.current.style.opacity = String(popProgress * 0.85);
        }
      } else {
        endContentRef.current.style.opacity = "0";
        endContentRef.current.style.pointerEvents = "none";
        endContentRef.current.style.display = "none";
        if (dimOverlayRef.current) {
          dimOverlayRef.current.style.opacity = "0";
        }
      }
    }

    if (bottomCueRef.current) {
      if (progress >= 0.85) {
        const opacity = Math.min(1, (progress - 0.85) * 8);
        bottomCueRef.current.style.opacity = String(opacity);
        bottomCueRef.current.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
        bottomCueRef.current.style.display = "block";
      } else {
        bottomCueRef.current.style.opacity = "0";
        bottomCueRef.current.style.pointerEvents = "none";
        bottomCueRef.current.style.display = "none";
      }
    }
  }, []);

  const updateAnimation = useCallback(() => {
    if (!isHeroVisibleRef.current) {
      isTickingRef.current = false;
      return;
    }

    const isMob = isMobileRef.current;
    const targetProgress = targetProgressRef.current;
    let currentProgress = currentProgressRef.current;
    const diff = targetProgress - currentProgress;

    // Mobile uses instant 0.40 catch-up for 1:1 thumb responsiveness; Desktop uses smooth 0.20 glide
    const catchup = isMob ? 0.40 : 0.20;
    if (Math.abs(diff) > (isMob ? 0.08 : 0.14)) {
      currentProgress = targetProgress;
    } else {
      currentProgress += diff * catchup;
    }

    currentProgressRef.current = currentProgress;

    // Robot scrub completes smoothly by 0.68 of scroll track, reserving remaining track for pop-out reveal
    const animProgress = Math.min(1, Math.max(0, currentProgress / 0.68));
    const frameToDraw = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(animProgress * (TOTAL_FRAMES - 1))));
    const isScrollingDown = currentProgress >= lastScrollProgressRef.current;

    preloadSurroundingFrames(frameToDraw, isScrollingDown ? "down" : "up");

    if (frameToDraw !== renderedFrameRef.current) {
      drawFrame(frameToDraw);
    }

    updateOverlayStyles(currentProgress);

    lastScrollProgressRef.current = currentProgress;
    isTickingRef.current = false;

    if (Math.abs(targetProgress - currentProgress) > 0.001) {
      isTickingRef.current = true;
      rafIdRef.current = requestAnimationFrame(updateAnimation);
    }
  }, [drawFrame, updateOverlayStyles, preloadSurroundingFrames]);

  const calculateScrollProgress = useCallback(() => {
    const container = containerRef.current;
    if (!container) return 0;
    const rect = container.getBoundingClientRect();
    const scrollableDist = rect.height - window.innerHeight;
    if (scrollableDist <= 0) return 0;
    const currentScroll = -rect.top;
    return Math.min(1, Math.max(0, currentScroll / scrollableDist));
  }, []);

  const onScroll = useCallback(() => {
    targetProgressRef.current = calculateScrollProgress();

    if (!isTickingRef.current) {
      isTickingRef.current = true;
      rafIdRef.current = requestAnimationFrame(updateAnimation);
    }
  }, [calculateScrollProgress, updateAnimation]);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis && !isMobile) {
      lenis.on("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (lenis && !isMobile) {
        lenis.off("scroll", onScroll);
      }
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isMobile, onScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isHeroVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          const currentFrame = Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1));
          drawFrame(currentFrame);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full bg-[#0c131a]"
      style={{
        /* Balanced scroll height: 260vh on mobile, 360vh on desktop for smooth animation and pop-out reveal */
        height: isMobile ? "260vh" : "360vh",
      }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: "100dvh",
          minHeight: "100dvh",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
        >
          {/* Hardware-Accelerated 2D Canvas Scrub (Both Mobile & Desktop) */}
          <canvas
            ref={canvasRef}
            className="select-none pointer-events-none z-0"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#0c131a",
              transform: "translate3d(0, 0, 0)",
              willChange: "transform",
            }}
          />

          {/* Initial Hero Header */}
          <div
            ref={headerRef}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none transition-none"
            style={{ willChange: "opacity, transform" }}
          >
            <div className="max-w-3xl text-center pointer-events-auto px-2">
              <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-cyan-300 mb-2.5 sm:mb-3 bg-slate-900/90 sm:bg-slate-900/80 sm:backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-cyan-500/30 shadow-lg">
                VY NextGen Technologies
              </span>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 sm:mb-4 leading-tight">
                Architecting <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                  Next-Gen Systems
                </span>
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed mb-5 sm:mb-6">
                Web Platforms • Mobile Ecosystems • Cloud GST Billing
              </p>

              <button
                type="button"
                onClick={() => {
                  window.scrollBy({ top: window.innerHeight * 1.5, behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-cyan-300 tracking-wider uppercase bg-slate-900/90 sm:bg-slate-900/70 sm:backdrop-blur-sm px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit mx-auto border border-cyan-500/30 cursor-pointer active:scale-95 transition-transform shadow-md hover:border-cyan-400 hover:text-white"
              >
                <span>Scroll to explore</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Ending Pop-Out CTA Section (Emerges directly at the ending of the robot animation) */}
          <div
            ref={endContentRef}
            id="ready-to-build"
            className="absolute inset-0 z-30 flex items-center justify-center px-4 pointer-events-none"
            style={{
              opacity: 0,
              transform: "translate3d(0, 55px, 0) scale(0.68)",
              willChange: "opacity, transform",
              display: "none",
            }}
          >
            {/* Soft dark vignette behind the pop-out card */}
            <div
              ref={dimOverlayRef}
              className="absolute inset-0 bg-slate-950/80 pointer-events-none transition-opacity duration-300 backdrop-blur-[2px]"
              style={{ opacity: 0 }}
            />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-r from-blue-600/20 via-cyan-500/25 to-blue-600/20 blur-3xl rounded-full pointer-events-none" />

            {/* Pop-Out Tech Card Content */}
            <div className="relative z-10 w-full max-w-3xl text-center pointer-events-auto px-4 py-8 flex flex-col items-center">
              {/* Badge */}
              <span className="inline-flex items-center text-[10px] sm:text-xs uppercase tracking-widest font-mono font-bold text-cyan-400 mb-5 bg-cyan-950/70 border border-cyan-500/40 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                START YOUR TRANSFORMATION
              </span>

              {/* Heading with Glowing Radar Beacon Dots */}
              <div className="relative inline-block mb-5">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
                  Ready to Build Your Next-Gen <br className="hidden sm:inline" />
                  System?
                </h2>

                {/* Glowing Cyan Radar Beacon below System? */}
                <span className="absolute -bottom-4 left-1/2 -translate-x-5 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-950/60 shadow-[0_0_18px_rgba(6,182,212,0.45)]">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                </span>

                {/* Glowing Cyan Radar Beacon to the right */}
                <span className="absolute bottom-2 -right-7 sm:-right-9 flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-950/60 shadow-[0_0_18px_rgba(6,182,212,0.45)]">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed font-normal">
                From high-speed web platforms to retail billing software and talent training, our engineering team is ready to deliver.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Link href="/enquiry" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_10px_30px_rgba(37,99,235,0.45)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group">
                    <span>Contact Engineering Team</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/918754020556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-full border border-emerald-500/60 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-950/60 hover:border-emerald-400 text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.18)]"
                  >
                    <FaWhatsapp className="mr-2 w-4 h-4 text-emerald-400" /> Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* End of Hero Scroll Cue */}
          <div
            ref={bottomCueRef}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 w-full max-w-xs sm:max-w-none text-center hidden"
            style={{ willChange: "opacity" }}
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-950/90 sm:bg-slate-950/85 sm:backdrop-blur-xl border border-cyan-500/30 text-white text-[11px] sm:text-xs font-medium shadow-2xl">
              <span>Continue scrolling to view solutions</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-bounce shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
