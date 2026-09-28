import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

const TOTAL_FRAMES = 207;
const FRAME_PREFIX_DESKTOP = "/hero-frames/ezgif-frame-";
const FRAME_PREFIX_MOBILE = "/hero-frames-mobile/ezgif-frame-";
const FRAME_EXT = ".jpg";
const AUDIO_URL = "/audio/hero-audio.mp3";
const AUDIO_DURATION = 10.762;

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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
  const lastScrollTimeRef = useRef<number>(0);

  // Sound Engine
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const isMutedRef = useRef<boolean>(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const forwardBufferRef = useRef<AudioBuffer | null>(null);
  const reverseBufferRef = useRef<AudioBuffer | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const activeDirectionRef = useRef<"forward" | "reverse" | null>(null);
  const currentPlaybackRateRef = useRef<number>(1);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAudioLoadedRef = useRef<boolean>(false);
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);

  // Keep isMutedRef synchronized
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (gainNodeRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      if (isMuted) {
        gainNodeRef.current.gain.setTargetAtTime(0, now, 0.05);
      } else if (isHeroVisibleRef.current && currentProgressRef.current < 0.88) {
        gainNodeRef.current.gain.setTargetAtTime(0.85, now, 0.08);
      }
    }
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.muted = isMuted;
    }
  }, [isMuted]);

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
    // Loaded frames are retained in memory to avoid garbage collection stutter
  }, [loadSingleFrame]);

  // Canvas geometry & fill-rate optimization
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMob = window.innerWidth < 768;
    setIsMobile(isMob);
    isMobileRef.current = isMob;

    // Optimized DPR: 1.1x on mobile, 1.5x on desktop for high fill-rate efficiency without lag
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

    const sourceW = isMob ? 800 : 1920;
    const sourceH = isMob ? 450 : 1080;
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
      [25, 50, 75, 100, 135, 170, 206].forEach((idx, i) => {
        setTimeout(() => {
          if (!isLoadedRef.current[idx]) loadSingleFrame(idx);
        }, 80 + i * 50);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [loadSingleFrame, preloadSurroundingFrames]);

  const initAudio = useCallback(async () => {
    if (audioContextRef.current && isAudioLoadedRef.current) {
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = audioCtx;

      if (audioCtx.state === "suspended") {
        await audioCtx.resume().catch(() => {});
      }

      if (!gainNodeRef.current) {
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.connect(audioCtx.destination);
        gainNodeRef.current = gainNode;
      }

      const res = await fetch(AUDIO_URL);
      const arrayBuffer = await res.arrayBuffer();
      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      forwardBufferRef.current = decodedBuffer;

      const numChannels = decodedBuffer.numberOfChannels;
      const length = decodedBuffer.length;
      const sampleRate = decodedBuffer.sampleRate;
      const revBuffer = audioCtx.createBuffer(numChannels, length, sampleRate);

      for (let ch = 0; ch < numChannels; ch++) {
        const src = decodedBuffer.getChannelData(ch);
        const dst = revBuffer.getChannelData(ch);
        for (let i = 0, j = length - 1; i < length; i++, j--) {
          dst[i] = src[j];
        }
      }
      reverseBufferRef.current = revBuffer;
      isAudioLoadedRef.current = true;
      setIsAudioActive(true);
    } catch {
      isAudioLoadedRef.current = false;
    }
  }, []);

  const stopCurrentSource = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current.currentTime, 0.04);
    }
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop(audioContextRef.current ? audioContextRef.current.currentTime + 0.05 : 0);
      } catch {}
      activeSourceRef.current = null;
      activeDirectionRef.current = null;
    }
    if (fallbackAudioRef.current && !fallbackAudioRef.current.paused) {
      fallbackAudioRef.current.pause();
    }
  }, []);

  const syncAudioToScroll = useCallback((progress: number, isScrollingDown: boolean, speedMultiplier: number) => {
    if (isMutedRef.current || !isHeroVisibleRef.current) {
      stopCurrentSource();
      return;
    }

    const targetAudioTime = Math.min(AUDIO_DURATION - 0.05, Math.max(0, progress * AUDIO_DURATION));

    if (isAudioLoadedRef.current && forwardBufferRef.current && audioContextRef.current && gainNodeRef.current) {
      const audioCtx = audioContextRef.current;
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }

      const desiredDirection = isScrollingDown ? "forward" : "reverse";
      const bufferToUse = isScrollingDown ? forwardBufferRef.current : reverseBufferRef.current;
      if (!bufferToUse) return;

      const sourceOffset = isScrollingDown
        ? targetAudioTime
        : Math.max(0, Math.min(AUDIO_DURATION, AUDIO_DURATION - targetAudioTime));

      const now = audioCtx.currentTime;
      const targetRate = Math.max(0.65, Math.min(2.0, speedMultiplier));

      if (activeSourceRef.current && activeDirectionRef.current === desiredDirection) {
        if (Math.abs(currentPlaybackRateRef.current - targetRate) > 0.1) {
          activeSourceRef.current.playbackRate.setTargetAtTime(targetRate, now, 0.05);
          currentPlaybackRateRef.current = targetRate;
        }
        return;
      }

      stopCurrentSource();

      const newSource = audioCtx.createBufferSource();
      newSource.buffer = bufferToUse;
      newSource.playbackRate.setValueAtTime(targetRate, now);
      currentPlaybackRateRef.current = targetRate;
      newSource.connect(gainNodeRef.current);

      try {
        newSource.start(0, Math.min(AUDIO_DURATION - 0.05, Math.max(0, sourceOffset)));
        activeSourceRef.current = newSource;
        activeDirectionRef.current = desiredDirection;
        gainNodeRef.current.gain.setValueAtTime(0.01, now);
        gainNodeRef.current.gain.setTargetAtTime(0.85, now + 0.01, 0.04);
        setIsAudioActive(true);
      } catch {}
    }
  }, [stopCurrentSource]);

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

    const frameToDraw = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
    const isScrollingDown = currentProgress >= lastScrollProgressRef.current;

    preloadSurroundingFrames(frameToDraw, isScrollingDown ? "down" : "up");

    if (frameToDraw !== renderedFrameRef.current) {
      drawFrame(frameToDraw);
    }

    updateOverlayStyles(currentProgress);

    const prevProgress = lastScrollProgressRef.current;
    const deltaProgress = Math.abs(currentProgress - prevProgress);
    const now = performance.now();
    const deltaTime = Math.max(16, now - lastScrollTimeRef.current);
    lastScrollProgressRef.current = currentProgress;
    lastScrollTimeRef.current = now;

    const scrollRate = (deltaProgress * AUDIO_DURATION) / (deltaTime / 1000);
    const speedMultiplier = Math.max(0.65, Math.min(2.0, scrollRate || 1.0));

    if (currentProgress < 0.88) {
      syncAudioToScroll(currentProgress, isScrollingDown, speedMultiplier);

      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }
      scrollStopTimerRef.current = setTimeout(() => {
        stopCurrentSource();
      }, 180);
    } else {
      stopCurrentSource();
    }

    isTickingRef.current = false;

    if (Math.abs(targetProgress - currentProgress) > 0.001) {
      isTickingRef.current = true;
      rafIdRef.current = requestAnimationFrame(updateAnimation);
    }
  }, [drawFrame, updateOverlayStyles, syncAudioToScroll, stopCurrentSource, preloadSurroundingFrames]);

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
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
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
        } else {
          stopCurrentSource();
          if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame, stopCurrentSource]);

  useEffect(() => {
    return () => {
      stopCurrentSource();
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.pause();
        fallbackAudioRef.current.src = "";
        fallbackAudioRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopCurrentSource]);

  const toggleMute = useCallback(() => {
    initAudio();
    setIsMuted((prev) => !prev);
  }, [initAudio]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full bg-[#0c131a]"
      style={{
        /* Balanced scroll height: 220vh on mobile (~2 natural thumb swipes), 360vh on desktop */
        height: isMobile ? "220vh" : "360vh",
      }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: "100vh",
          minHeight: "100vh",
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
              width: "100vw",
              height: "100vh",
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
                  const target = document.getElementById("services") || document.querySelector("section:nth-of-type(2)");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
                  }
                }}
                className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-cyan-300 tracking-wider uppercase bg-slate-900/90 sm:bg-slate-900/70 sm:backdrop-blur-sm px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full w-fit mx-auto border border-cyan-500/30 cursor-pointer active:scale-95 transition-transform shadow-md hover:border-cyan-400 hover:text-white"
              >
                <span>Scroll to explore</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
              </button>
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

          {/* Audio Control */}
          <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 pointer-events-auto">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="group flex items-center gap-2 min-h-[44px] px-3.5 py-2 sm:min-h-0 sm:px-3.5 sm:py-2 rounded-full bg-slate-900/90 sm:bg-slate-900/80 sm:backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-colors text-[11px] sm:text-xs font-medium cursor-pointer active:scale-95 shadow-lg"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                  <span className="text-slate-400 group-hover:text-slate-200">Sound: Muted</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-0.5 h-3.5 sm:h-4">
                    <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_0.8s_ease-in-out_infinite] h-3" : "h-1.5"}`} />
                    <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-4" : "h-2"}`} />
                    <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5" : "h-1.5"}`} />
                  </div>
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  <span className="hidden xs:inline sm:inline text-cyan-300">Synchronized Audio</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
