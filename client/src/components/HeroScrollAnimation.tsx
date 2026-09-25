import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

const TOTAL_FRAMES = 207;
const DESKTOP_FRAME_PREFIX = "/hero-frames/ezgif-frame-";
const MOBILE_FRAME_PREFIX = "/hero-frames-mobile/ezgif-frame-";
const FRAME_EXT = ".jpg";
const AUDIO_URL = "/audio/hero-audio.mp3";
const AUDIO_DURATION = 10.762;

type PerformanceTier = "HIGH" | "MEDIUM" | "LOW";

export function HeroScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bottomCueRef = useRef<HTMLDivElement>(null);

  // Performance Tier: LOW (Mobile <768px), MEDIUM (Tablets 768-1023px), HIGH (Desktop >=1024px)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });
  const isMobileRef = useRef<boolean>(isMobile);
  const [tier, setTier] = useState<PerformanceTier>(isMobile ? "LOW" : "HIGH");
  const tierRef = useRef<PerformanceTier>(tier);

  // Cached frame images: dynamic sliding-window buffer
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const loadingSetRef = useRef<Set<number>>(new Set());
  const nearestLoadedRef = useRef<number[]>(new Array(TOTAL_FRAMES).fill(0));

  // Canvas dimensions & pre-computed cover geometry cache
  const canvasWidthRef = useRef<number>(0);
  const canvasHeightRef = useRef<number>(0);
  const renderWRef = useRef<number>(0);
  const renderHRef = useRef<number>(0);
  const offsetXRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);

  // Scheduled animation update state
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isTickingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const isHeroVisibleRef = useRef<boolean>(true);

  // Velocity tracking for audio playback rate matching
  const lastScrollProgressRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);

  // Sound Engine (Web Audio API with PCM Buffers for exact forward & reverse scroll matching)
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const isMutedRef = useRef<boolean>(true);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const forwardBufferRef = useRef<AudioBuffer | null>(null);
  const reverseBufferRef = useRef<AudioBuffer | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const activeDirectionRef = useRef<"forward" | "reverse" | null>(null);
  const sourceStartedAtAudioTimeRef = useRef<number>(0);
  const sourceOffsetTimeRef = useRef<number>(0);
  const currentPlaybackRateRef = useRef<number>(1);
  const scrollStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isAudioLoadedRef = useRef<boolean>(false);
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);

  // Keep isMutedRef in sync with state
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

  // Determine current frame URL based on device capability tier:
  // LOW (<768px) and MEDIUM (768-1023px): lightweight 800px frames (/hero-frames-mobile/)
  // HIGH (>=1024px): full 1920x1080 frames (/hero-frames/)
  const getFrameUrl = useCallback((index: number, currentTier: PerformanceTier) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    const prefix = currentTier === "HIGH" ? DESKTOP_FRAME_PREFIX : MOBILE_FRAME_PREFIX;
    return `${prefix}${frameNumber}${FRAME_EXT}`;
  }, []);

  // Update nearest loaded frame lookup table whenever a frame finishes loading
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

  // Load a single frame asynchronously
  const loadSingleFrame = useCallback((idx: number, currentTier: PerformanceTier): Promise<void> => {
    if (idx < 0 || idx >= TOTAL_FRAMES) return Promise.resolve();
    if (isLoadedRef.current[idx] && imagesRef.current[idx]) return Promise.resolve();
    if (loadingSetRef.current.has(idx)) return Promise.resolve();

    loadingSetRef.current.add(idx);

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameUrl(idx, currentTier);

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
        img.onload = onDone;
        img.onerror = () => {
          loadingSetRef.current.delete(idx);
          resolve();
        };
      }
    });
  }, [getFrameUrl, updateNearestLookup, drawFrame]);

  // Dynamic Scroll Buffer & Memory Management:
  // On mobile (<768px): loads every 2nd frame in buffer window, keeping memory small & fast
  // On desktop: loads all frames in buffer window
  const manageFrameBuffer = useCallback((centerIdx: number, direction: "down" | "up" = "down") => {
    const isMob = isMobileRef.current;
    const currentTier = tierRef.current;
    const bufAhead = isMob ? 8 : 14;
    const bufBehind = isMob ? 4 : 8;
    const evictDist = isMob ? 18 : 26;
    const step = isMob ? 2 : 1;

    const start = Math.max(0, centerIdx - bufBehind);
    const end = Math.min(TOTAL_FRAMES - 1, centerIdx + bufAhead);

    // Directional priority: load ahead of scroll direction first
    const framesToLoad: number[] = [];
    if (direction === "down") {
      for (let i = centerIdx; i <= end; i += step) framesToLoad.push(i);
      for (let i = centerIdx - step; i >= start; i -= step) framesToLoad.push(i);
    } else {
      for (let i = centerIdx; i >= start; i -= step) framesToLoad.push(i);
      for (let i = centerIdx + step; i <= end; i += step) framesToLoad.push(i);
    }

    // Preserve frame 0 as root fallback anchor
    if (!isLoadedRef.current[0] && !loadingSetRef.current.has(0)) {
      loadSingleFrame(0, currentTier);
    }

    // Dispatch asynchronous fetch for unbuffered frames
    for (const idx of framesToLoad) {
      if (!isLoadedRef.current[idx] && !loadingSetRef.current.has(idx)) {
        loadSingleFrame(idx, currentTier);
      }
    }

    // Memory Eviction: release decoded image bitmaps outside the buffer
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i !== 0 && Math.abs(i - centerIdx) > evictDist) {
        const oldImg = imagesRef.current[i];
        if (oldImg) {
          oldImg.onload = null;
          oldImg.onerror = null;
          oldImg.src = "";
          imagesRef.current[i] = null;
          isLoadedRef.current[i] = false;
        }
      }
    }
  }, [loadSingleFrame]);

  // Capability check, Viewport detection & High-DPI Canvas sizing
  const evaluateTierAndResizeCanvas = useCallback(() => {
    const width = window.innerWidth;
    const mobile = width < 768;
    const tablet = width >= 768 && width < 1024;

    setIsMobile(mobile);
    isMobileRef.current = mobile;

    const currentTier: PerformanceTier = mobile ? "LOW" : tablet ? "MEDIUM" : "HIGH";
    tierRef.current = currentTier;
    setTier(currentTier);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mobile optimization: Lock DPR to 1.0 on mobile to cut 89% fill-rate strain and prevent GPU throttle.
    // Desktop: Cap DPR at 1.75 for retina sharpness.
    const maxDpr = mobile ? 1.0 : tablet ? 1.25 : 1.75;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    const displayW = window.innerWidth;
    const displayH = window.innerHeight;
    const targetW = Math.round(displayW * dpr);
    const targetH = Math.round(displayH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      canvasWidthRef.current = targetW;
      canvasHeightRef.current = targetH;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = mobile ? "medium" : "high";
      }
    }

    // Source frames:
    // Mobile / Tablet: 800x450 (16:9)
    // Desktop: 1920x1080 (16:9)
    const sourceW = mobile || tablet ? 800 : 1920;
    const sourceH = mobile || tablet ? 450 : 1080;
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

  // Window resize & orientation change listener
  useEffect(() => {
    evaluateTierAndResizeCanvas();
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(evaluateTierAndResizeCanvas, 80);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [evaluateTierAndResizeCanvas]);

  // Initial Progressive Frame Loading
  useEffect(() => {
    let isCancelled = false;
    const currentTier = tierRef.current;

    // Stage 1: Load Frame 0 immediately for instant First Paint (<80ms)
    loadSingleFrame(0, currentTier);

    // Stage 2: Preload initial buffer window and spaced milestone keyframes
    const initialTimer = setTimeout(() => {
      if (isCancelled) return;
      manageFrameBuffer(0, "down");

      // Key milestone preloading (spaced frames so any fast scroll immediately finds a frame)
      const milestones = [25, 50, 75, 100, 135, 170, 206];
      milestones.forEach((idx, i) => {
        setTimeout(() => {
          if (!isCancelled && !isLoadedRef.current[idx] && !loadingSetRef.current.has(idx)) {
            loadSingleFrame(idx, currentTier);
          }
        }, 120 + i * 70);
      });
    }, 80);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimer);
    };
  }, [loadSingleFrame, manageFrameBuffer]);

  // Load and decode audio buffer on demand
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

      if (!fallbackAudioRef.current) {
        const fbAudio = new Audio(AUDIO_URL);
        fbAudio.preload = "auto";
        fbAudio.volume = 0.75;
        fallbackAudioRef.current = fbAudio;
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

  // Stop current Web Audio source smoothly
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

  // Precision audio scrubber
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
        sourceStartedAtAudioTimeRef.current = now;
        sourceOffsetTimeRef.current = sourceOffset;

        gainNodeRef.current.gain.setValueAtTime(0.01, now);
        gainNodeRef.current.gain.setTargetAtTime(0.85, now + 0.01, 0.04);
        setIsAudioActive(true);
      } catch {}
      return;
    }

    if (fallbackAudioRef.current) {
      const fb = fallbackAudioRef.current;
      const diff = Math.abs(fb.currentTime - targetAudioTime);
      if (diff > 0.4) {
        fb.currentTime = targetAudioTime;
      }
      fb.playbackRate = Math.max(0.7, Math.min(1.8, speedMultiplier));
      if (fb.paused) {
        fb.play().then(() => setIsAudioActive(true)).catch(() => {});
      }
    }
  }, [stopCurrentSource]);

  // Direct DOM style updates for header and bottom cue
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

  // Scheduled animation update
  // On mobile (<768px): Uses instant/snappy catch-up (0.45) so touch movement feels 1:1 connected with fingers
  // On desktop: Smooth glide easing (0.18)
  const updateAnimation = useCallback(() => {
    if (!isHeroVisibleRef.current) {
      isTickingRef.current = false;
      return;
    }

    const isMob = isMobileRef.current;
    const targetProgress = targetProgressRef.current;
    let currentProgress = currentProgressRef.current;
    const diff = targetProgress - currentProgress;

    // Responsive catch-up: mobile touch needs immediate responsiveness, desktop uses smooth easing
    const catchupFactor = isMob ? 0.45 : 0.20;
    if (Math.abs(diff) > (isMob ? 0.06 : 0.12)) {
      currentProgress = targetProgress;
    } else {
      currentProgress += diff * catchupFactor;
    }

    currentProgressRef.current = currentProgress;

    const frameToDraw = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))));
    const isScrollingDown = currentProgress >= lastScrollProgressRef.current;

    manageFrameBuffer(frameToDraw, isScrollingDown ? "down" : "up");

    if (frameToDraw !== renderedFrameRef.current) {
      drawFrame(frameToDraw);
    }

    updateOverlayStyles(currentProgress);

    // Audio timeline synchronization
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
  }, [drawFrame, updateOverlayStyles, syncAudioToScroll, stopCurrentSource, manageFrameBuffer]);

  // Compute scroll progress through hero container
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

  // Unified scroll listeners for both Mobile and Desktop
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

  // IntersectionObserver to pause rendering and silence audio when off-screen
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

  // Clean up Web Audio nodes on unmount
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

  // Toggle mute button
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
        /* Mobile: 220vh (~2 natural thumb swipes, perfectly balanced and never feels stuck).
           Tablet: 300vh. Desktop: 380vh. */
        height: isMobile ? "220vh" : tier === "MEDIUM" ? "300vh" : "380vh",
      }}
    >
      {/*
        STICKY VIEWPORT — pins to top while the section scrolls underneath.
        Height is always 100vh / 100dvh so it fills the screen completely.
      */}
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{
          height: "100vh",
          minHeight: "100vh",
        }}
      >
        {/* INNER WRAPPER */}
        <div
          className="absolute inset-0"
          style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }}
        >
          {/* Hardware-Accelerated 2D Canvas Scrub (Both Mobile & Desktop) */}
          <canvas
            ref={canvasRef}
            className="select-none pointer-events-none z-0 render-high-quality"
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

          {/* Minimal Initial Hero Header */}
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
                  const target = document.getElementById("solutions") || document.querySelector("section:nth-of-type(2)");
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

          {/* Subtle Scroll Cue at the End of the Hero Experience */}
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

          {/* Sleek Audio Control Badge */}
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
                  <span className="hidden xs:inline sm:inline text-cyan-300">
                    Synchronized Audio
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
