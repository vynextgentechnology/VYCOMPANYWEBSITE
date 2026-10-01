import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CinematicScene } from "./CinematicScene";
import { CinematicOverlay } from "./CinematicOverlay";
import { CinematicHeroProps } from "./types";

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  scene,
  className = "",
  children,
  showScrollIndicator = true,
  onScrollToContent,
  overrideTitle,
  overrideDescription,
  customActions,
}) => {
  const shouldReduceMotion = useReducedMotion();
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

  // Theme color styling mappings
  const themeStyles = {
    cyan: {
      badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
      badgeShadow: "shadow-cyan-500/10",
      gradient: "from-cyan-400 via-blue-400 to-indigo-400",
      btnPrimary: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30",
      btnSecondary: "border-cyan-500/40 text-cyan-200 hover:bg-cyan-950/50",
      statVal: "text-cyan-300",
      statBorder: "border-cyan-500/20",
    },
    blue: {
      badgeBg: "bg-blue-500/10 border-blue-500/30 text-blue-300",
      badgeShadow: "shadow-blue-500/10",
      gradient: "from-blue-400 via-cyan-300 to-indigo-300",
      btnPrimary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30",
      btnSecondary: "border-blue-500/40 text-blue-200 hover:bg-blue-950/50",
      statVal: "text-blue-300",
      statBorder: "border-blue-500/20",
    },
    emerald: {
      badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      badgeShadow: "shadow-emerald-500/10",
      gradient: "from-emerald-400 via-teal-300 to-cyan-400",
      btnPrimary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30",
      btnSecondary: "border-emerald-500/40 text-emerald-200 hover:bg-emerald-950/50",
      statVal: "text-emerald-300",
      statBorder: "border-emerald-500/20",
    },
    amber: {
      badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      badgeShadow: "shadow-amber-500/10",
      gradient: "from-amber-400 via-orange-300 to-cyan-400",
      btnPrimary: "bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-600/30",
      btnSecondary: "border-amber-500/40 text-amber-200 hover:bg-amber-950/50",
      statVal: "text-amber-300",
      statBorder: "border-amber-500/20",
    },
    violet: {
      badgeBg: "bg-violet-500/10 border-violet-500/30 text-violet-300",
      badgeShadow: "shadow-violet-500/10",
      gradient: "from-violet-400 via-indigo-300 to-cyan-300",
      btnPrimary: "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30",
      btnSecondary: "border-violet-500/40 text-violet-200 hover:bg-violet-950/50",
      statVal: "text-violet-300",
      statBorder: "border-violet-500/20",
    },
    rose: {
      badgeBg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
      badgeShadow: "shadow-rose-500/10",
      gradient: "from-rose-400 via-pink-300 to-purple-400",
      btnPrimary: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30",
      btnSecondary: "border-rose-500/40 text-rose-200 hover:bg-rose-950/50",
      statVal: "text-rose-300",
      statBorder: "border-rose-500/20",
    },
  }[scene.themeColor];

  const BadgeIcon = scene.badgeIcon || Sparkles;

  // Stagger animation timing variants
  const fadeIn = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.6,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1],
    },
  });

  const handleScrollCue = () => {
    if (onScrollToContent) {
      onScrollToContent();
    } else {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: "smooth" });
    }
  };

  return (
    <section
      className={`relative pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-center bg-slate-950 text-white overflow-hidden ${className}`}
      aria-label={`${scene.name} Hero`}
    >
      {/* 1. Underlying Cinematic Visual Scene */}
      <CinematicScene scene={scene} isMobile={isMobile} />

      {/* 2. HUD & Lighting Overlay */}
      <CinematicOverlay
        themeColor={scene.themeColor}
        telemetry={scene.hudTelemetry}
        badge={scene.badge}
      />

      {/* 3. Foreground Hero Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20 max-w-5xl text-center">
        {/* Eyebrow System Badge (0ms delay) */}
        <motion.div {...fadeIn(0)} className="flex justify-center mb-6">
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg ${themeStyles.badgeBg} ${themeStyles.badgeShadow}`}
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            <span className="font-mono tracking-wider uppercase">{scene.badge}</span>
            {scene.badgeSystemCode && (
              <span className="hidden sm:inline-block font-mono text-[11px] opacity-75 border-l border-white/20 pl-2">
                {scene.badgeSystemCode}
              </span>
            )}
          </div>
        </motion.div>

        {/* Master Headline (100ms delay) */}
        <motion.div {...fadeIn(0.1)}>
          {overrideTitle ? (
            overrideTitle
          ) : (
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.12] mb-6 text-white max-w-4xl mx-auto">
              <span>{scene.title}</span>{" "}
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${themeStyles.gradient}`}>
                {scene.titleHighlight}
              </span>
              {scene.titleAfter && <span> {scene.titleAfter}</span>}
            </h1>
          )}
        </motion.div>

        {/* Subtitle / Description (220ms delay) */}
        <motion.div {...fadeIn(0.22)}>
          {overrideDescription ? (
            overrideDescription
          ) : (
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal px-2 mb-10">
              {scene.description}
            </p>
          )}
        </motion.div>

        {/* Action Buttons (350ms delay) */}
        <motion.div {...fadeIn(0.35)}>
          {customActions ? (
            customActions
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {/* Primary CTA */}
              {scene.primaryCta && (
                scene.primaryCta.isExternal ? (
                  <a
                    href={scene.primaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className={`w-full sm:w-auto rounded-full px-8 h-12 text-sm sm:text-base font-bold transition-all duration-300 hover:scale-105 ${themeStyles.btnPrimary}`}
                    >
                      {scene.primaryCta.label}
                      {scene.primaryCta.icon || <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </a>
                ) : scene.primaryCta.href.startsWith("#") ? (
                  <a href={scene.primaryCta.href} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className={`w-full sm:w-auto rounded-full px-8 h-12 text-sm sm:text-base font-bold transition-all duration-300 hover:scale-105 ${themeStyles.btnPrimary}`}
                    >
                      {scene.primaryCta.label}
                      {scene.primaryCta.icon || <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </a>
                ) : (
                  <Link href={scene.primaryCta.href} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className={`w-full sm:w-auto rounded-full px-8 h-12 text-sm sm:text-base font-bold transition-all duration-300 hover:scale-105 ${themeStyles.btnPrimary}`}
                    >
                      {scene.primaryCta.label}
                      {scene.primaryCta.icon || <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </Link>
                )
              )}

              {/* Secondary CTA */}
              {scene.secondaryCta && (
                scene.secondaryCta.isExternal ? (
                  <a
                    href={scene.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className={`w-full sm:w-auto rounded-full px-8 h-12 text-sm sm:text-base font-bold bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                        scene.secondaryCta.isWhatsApp
                          ? "border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40"
                          : themeStyles.btnSecondary
                      }`}
                    >
                      {scene.secondaryCta.isWhatsApp && <FaWhatsapp className="mr-2 w-4 h-4 text-emerald-400" />}
                      {scene.secondaryCta.label}
                      {!scene.secondaryCta.isWhatsApp && (scene.secondaryCta.icon || <ArrowRight className="ml-2 w-4 h-4" />)}
                    </Button>
                  </a>
                ) : scene.secondaryCta.href.startsWith("#") ? (
                  <a href={scene.secondaryCta.href} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`w-full sm:w-auto rounded-full px-8 h-12 text-sm sm:text-base font-bold bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:scale-105 ${themeStyles.btnSecondary}`}
                    >
                      {scene.secondaryCta.label}
                      {scene.secondaryCta.icon || <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </a>
                ) : (
                  <Link href={scene.secondaryCta.href} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`w-full sm:w-auto rounded-full px-8 h-12 text-sm sm:text-base font-bold bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:scale-105 ${themeStyles.btnSecondary}`}
                    >
                      {scene.secondaryCta.label}
                      {scene.secondaryCta.icon || <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </Link>
                )
              )}
            </div>
          )}
        </motion.div>

        {/* Live Metrics Showcase (420ms delay) */}
        {scene.stats && scene.stats.length > 0 && (
          <motion.div
            {...fadeIn(0.42)}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80"
          >
            {scene.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-slate-800/60 transition-all hover:border-slate-700/80"
              >
                <div className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${themeStyles.statVal}`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                  {stat.label}
                </div>
                {stat.sub && (
                  <div className="text-[10px] sm:text-xs text-slate-500 font-mono mt-0.5">
                    {stat.sub}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Additional Custom Injected Page Content */}
        {children && <div className="mt-8">{children}</div>}

        {/* Scroll Cue Indicator (500ms delay) */}
        {showScrollIndicator && (
          <motion.div
            {...fadeIn(0.5)}
            className="mt-12 flex flex-col items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            onClick={handleScrollCue}
            role="button"
            tabIndex={0}
            aria-label="Scroll down to content"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleScrollCue();
            }}
          >
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-2">
              SCROLL TO EXPLORE
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
