import { useEffect, useRef, useState, useCallback } from "react";
import { 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Code2, 
  Receipt, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { Link } from "wouter";

const TOTAL_FRAMES = 207;
const FRAME_PREFIX = "/hero-frames/ezgif-frame-";
const FRAME_EXT = ".jpg";
const AUDIO_URL = "/audio/hero-audio.mp3";
const AUDIO_DURATION = 10.762;

/**
 * Mobile-First High-Performance CSS 3D Hero
 * Eliminates 63MB image downloads and frame scrubbing lag on mobile devices.
 * Delivers instant 0ms First Paint, 120Hz native touch scrolling, and futuristic aesthetics.
 */
function Mobile3DHero() {
  const scrollToSolutions = () => {
    const target = document.getElementById("services") || document.getElementById("solutions") || document.querySelector("section:nth-of-type(2)");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[92dvh] flex flex-col justify-between bg-[#070d18] text-white overflow-hidden pt-12 pb-8 px-4"
    >
      {/* Background Cyber Grid & Glow Orbs */}
      <div className="absolute inset-0 tech-grid-pattern-dark opacity-35 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Content */}
      <div className="relative z-10 text-center max-w-md mx-auto mt-2">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-lg shadow-cyan-950/60 mb-4 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-300">
            VY NEXTGEN TECHNOLOGIES
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl xs:text-4xl font-black tracking-tight text-white leading-[1.15] mb-3">
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
            Next-Gen Systems
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs xs:text-sm text-slate-300 leading-relaxed max-w-xs mx-auto mb-5 font-normal">
          Enterprise Web Platforms • Cloud GST Billing • iOS & Android Ecosystems
        </p>
      </div>

      {/* Centerpiece: Interactive CSS 3D Holographic Card */}
      <div className="relative z-10 my-auto py-2 w-full max-w-sm mx-auto [perspective:1000px]">
        <div 
          className="relative rounded-2xl p-4 bg-gradient-to-br from-slate-900/95 via-slate-950/98 to-[#09152a] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-300 [transform-style:preserve-3d] active:scale-[0.98]"
          style={{
            transform: "rotateX(2deg) rotateY(-2deg)",
          }}
        >
          {/* Card Top Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-tight">Core Architecture</p>
                <p className="text-[10px] text-cyan-400 font-mono">STATUS: OPTIMAL</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold font-mono">
              99.9% UPTIME
            </span>
          </div>

          {/* 3D Pillars Grid */}
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">React & Next.js Platforms</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                &lt;1s Load
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Retail GST & POS Engine</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                Offline Ready
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">iOS & Android Apps</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Cross-Platform
              </span>
            </div>
          </div>

          {/* Micro Guarantee Tag */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Source Code Ownership
            </span>
            <span className="text-cyan-400 font-mono">Tamil Nadu & Global</span>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons & Scroll Cue */}
      <div className="relative z-10 w-full max-w-sm mx-auto space-y-3 mt-3">
        {/* Buttons Row */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={scrollToSolutions}
            className="w-full min-h-[46px] rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <span>SOLUTIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <Link href="/enquiry" className="w-full">
            <button
              type="button"
              className="w-full min-h-[46px] rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <span>GET QUOTE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToSolutions}
          className="flex items-center justify-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-slate-400 hover:text-cyan-300 w-full py-1 cursor-pointer transition-colors"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-3 h-3 text-cyan-400 animate-bounce" />
        </button>
      </div>
    </section>
  );
}

/**
 * Desktop Hardware-Accelerated 2D Canvas Scrub Animation
 * Retained exclusively on desktop screens (>=768px) with zero frame eviction for silky 60fps scrubbing.
 */
function DesktopCanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bottomCueRef = useRef<HTMLDivElement>(null);

  // Cached frame images: loaded frames remain in memory to completely avoid re-fetching
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const loadingSetRef = useRef<Set<number>>(new Set());
  const nearestLoadedRef = useRef<number[]>(new Array(TOTAL_FRAMES).fill(0));

  // Canvas dimensions & pre-computed cover geometry cache
  const renderWRef = useRef<number>(0);
  const renderHRef = useRef<number>(0);
  const offsetXRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);

  // Animation state
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
  }, [isMuted]);

  const getFrameUrl = useCallback((index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `${FRAME_PREFIX}${frameNumber}${FRAME_EXT}`;
  }, []);

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

  // Buffer manager: loads frames ahead & behind without evicting already loaded frames
  const preloadSurroundingFrames = useCallback((centerIdx: number) => {
    const bufAhead = 16;
    const bufBehind = 10;
    const start = Math.max(0, centerIdx - bufBehind);
    const end = Math.min(TOTAL_FRAMES - 1, centerIdx + bufAhead);

    for (let i = centerIdx; i <= end; i++) {
      if (!isLoadedRef.current[i] && !loadingSetRef.current.has(i)) {
        loadSingleFrame(i);
      }
    }
    for (let i = centerIdx - 1; i >= start; i--) {
      if (!isLoadedRef.current[i] && !loadingSetRef.current.has(i)) {
        loadSingleFrame(i);
      }
    }
  }, [loadSingleFrame]);

  // Canvas geometry sizing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use native 1.0x - 1.5x DPR for optimal GPU fill-rate and zero lag
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
        ctx.imageSmoothingQuality = "medium";
      }
    }

    const sourceW = 1920;
    const sourceH = 1080;
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
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [resizeCanvas]);

  // Initial progressive loading
  useEffect(() => {
    loadSingleFrame(0);

    const timer = setTimeout(() => {
      preloadSurroundingFrames(0);
      // Key milestone preloading for instant scrub responsiveness
      [25, 50, 75, 100, 135, 170, 206].forEach((idx, i) => {
        setTimeout(() => {
          if (!isLoadedRef.current[idx]) loadSingleFrame(idx);
        }, 100 + i * 50);
      });
    }, 60);

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

    const targetProgress = targetProgressRef.current;
    let currentProgress = currentProgressRef.current;
    const diff = targetProgress - currentProgress;

    if (Math.abs(diff) > 0.15) {
      currentProgress = targetProgress;
    } else {
      currentProgress += diff * 0.22;
    }

    currentProgressRef.current = currentProgress;

    const frameToDraw = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
    const isScrollingDown = currentProgress >= lastScrollProgressRef.current;

    preloadSurroundingFrames(frameToDraw);

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
    if (lenis) {
      lenis.on("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
    };
  }, [onScroll]);

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
        height: "360vh",
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
              <span className="inline-block text-xs uppercase tracking-[0.25em] font-semibold text-cyan-300 mb-3 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-cyan-500/30 shadow-lg">
                VY NextGen Technologies
              </span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Architecting <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                  Next-Gen Systems
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto font-normal leading-relaxed mb-6">
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
                className="flex items-center justify-center gap-1.5 text-xs font-semibold text-cyan-300 tracking-wider uppercase bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full w-fit mx-auto border border-cyan-500/30 cursor-pointer active:scale-95 transition-transform shadow-md hover:border-cyan-400 hover:text-white"
              >
                <span>Scroll to explore</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
              </button>
            </div>
          </div>

          {/* End of Hero Scroll Cue */}
          <div
            ref={bottomCueRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 text-center hidden"
            style={{ willChange: "opacity" }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 text-white text-xs font-medium shadow-2xl">
              <span>Continue scrolling to view solutions</span>
              <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce shrink-0" />
            </div>
          </div>

          {/* Audio Control */}
          <div className="absolute bottom-6 right-6 z-30 pointer-events-auto">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-colors text-xs font-medium cursor-pointer active:scale-95 shadow-lg"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
                  <span className="text-slate-400 group-hover:text-slate-200">Sound: Muted</span>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-0.5 h-4">
                    <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_0.8s_ease-in-out_infinite] h-3" : "h-1.5"}`} />
                    <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-4" : "h-2"}`} />
                    <span className={`w-0.5 bg-cyan-400 rounded-full transition-all ${isAudioActive ? "animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5" : "h-1.5"}`} />
                  </div>
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300">Synchronized Audio</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Responsive Hero Section Controller
 * Seamlessly routes Mobile (<768px) to the lightweight, zero-lag 3D Hero,
 * and Desktop (>=768px) to the high-frame-rate canvas scrubber.
 */
export function HeroScrollAnimation() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <Mobile3DHero />;
  }

  return <DesktopCanvasHero />;
}
