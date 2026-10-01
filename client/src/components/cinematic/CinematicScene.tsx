import React, { useEffect, useRef, useState } from "react";
import { CinematicSceneProps } from "./types";

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  scene,
  className = "",
  isMobile = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [videoError, setVideoError] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const videoSrc = isMobile ? scene.videoMobile || scene.videoDesktop : scene.videoDesktop;
  const posterSrc = isMobile ? scene.posterMobile || scene.posterDesktop : scene.posterDesktop;

  // Viewport & tab visibility observer for video playback control
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !videoSrc || prefersReducedMotion) return;

    let isVisible = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !document.hidden) {
            video.play().catch(() => {
              // Autoplay policy fallback
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (container) {
      observer.observe(container);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isVisible) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [videoSrc, prefersReducedMotion]);

  // Procedural futuristic ambient backdrop styles per scene
  const sceneThemes: Record<string, { radial: string; mesh: string; beam: string }> = {
    cyan: {
      radial: "from-cyan-900/20 via-slate-950 to-slate-950",
      mesh: "rgba(6, 182, 212, 0.12)",
      beam: "from-cyan-500/20 via-blue-600/10 to-transparent",
    },
    blue: {
      radial: "from-blue-900/20 via-slate-950 to-slate-950",
      mesh: "rgba(59, 130, 246, 0.12)",
      beam: "from-blue-500/20 via-cyan-600/10 to-transparent",
    },
    emerald: {
      radial: "from-emerald-900/20 via-slate-950 to-slate-950",
      mesh: "rgba(16, 185, 129, 0.12)",
      beam: "from-emerald-500/20 via-teal-600/10 to-transparent",
    },
    amber: {
      radial: "from-amber-900/20 via-slate-950 to-slate-950",
      mesh: "rgba(245, 158, 11, 0.12)",
      beam: "from-amber-500/20 via-cyan-600/10 to-transparent",
    },
    violet: {
      radial: "from-violet-900/20 via-slate-950 to-slate-950",
      mesh: "rgba(139, 92, 246, 0.14)",
      beam: "from-violet-500/20 via-indigo-600/10 to-transparent",
    },
    rose: {
      radial: "from-rose-900/20 via-slate-950 to-slate-950",
      mesh: "rgba(244, 63, 94, 0.12)",
      beam: "from-rose-500/20 via-blue-600/10 to-transparent",
    },
  };

  const themeConfig = sceneThemes[scene.themeColor] || sceneThemes.cyan;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-950 ${className}`}
    >
      {/* 1. Base Radial Atmospheric Fill */}
      <div className={`absolute inset-0 bg-radial-gradient ${themeConfig.radial}`} />

      {/* 2. Dynamic Ambient Lighting Orbs */}
      <div
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-70 transition-all duration-700"
        style={{ backgroundColor: scene.ambientGlows.primary }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[450px] rounded-full blur-[150px] pointer-events-none opacity-60 transition-all duration-700"
        style={{ backgroundColor: scene.ambientGlows.secondary }}
      />

      {/* 3. Volumetric Light Beams */}
      <div
        className={`absolute -top-20 left-1/3 w-[800px] h-[600px] bg-gradient-to-b ${themeConfig.beam} transform -rotate-12 blur-3xl opacity-50 pointer-events-none`}
      />

      {/* 4. Background Video (if provided and valid) */}
      {videoSrc && !videoError && !prefersReducedMotion ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen transition-opacity duration-1000"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={!posterError ? posterSrc : undefined}
          onError={() => setVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : posterSrc && !posterError ? (
        /* 5. Poster Image Layer (High-Resolution Visual) */
        <img
          src={posterSrc}
          alt={scene.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen select-none transition-opacity duration-700 render-high-quality"
          onError={() => setPosterError(true)}
          loading="eager"
        />
      ) : (
        /* 6. Procedural Futuristic Cyber-Grid Mesh (Zero Network 404 Fallback) */
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, ${themeConfig.mesh} 0%, transparent 60%),
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          }}
        />
      )}

      {/* 7. Subtle Tech Particle Sparkle Overlay */}
      <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />
    </div>
  );
};
