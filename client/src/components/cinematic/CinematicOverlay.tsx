import React from "react";
import { CinematicOverlayProps } from "./types";

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
  themeColor = "cyan",
  telemetry,
  badge,
  className = "",
}) => {
  // Theme color styling mappings
  const themeStyles = {
    cyan: {
      bracket: "border-cyan-500/40 text-cyan-400",
      accentDot: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
      pillBorder: "border-cyan-500/30 text-cyan-300 bg-cyan-950/40",
      scanlineGlow: "rgba(6, 182, 212, 0.03)",
    },
    blue: {
      bracket: "border-blue-500/40 text-blue-400",
      accentDot: "bg-blue-400 shadow-[0_0_8px_#60a5fa]",
      pillBorder: "border-blue-500/30 text-blue-300 bg-blue-950/40",
      scanlineGlow: "rgba(59, 130, 246, 0.03)",
    },
    emerald: {
      bracket: "border-emerald-500/40 text-emerald-400",
      accentDot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
      pillBorder: "border-emerald-500/30 text-emerald-300 bg-emerald-950/40",
      scanlineGlow: "rgba(16, 185, 129, 0.03)",
    },
    amber: {
      bracket: "border-amber-500/40 text-amber-400",
      accentDot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
      pillBorder: "border-amber-500/30 text-amber-300 bg-amber-950/40",
      scanlineGlow: "rgba(245, 158, 11, 0.03)",
    },
    violet: {
      bracket: "border-violet-500/40 text-violet-400",
      accentDot: "bg-violet-400 shadow-[0_0_8px_#a78bfa]",
      pillBorder: "border-violet-500/30 text-violet-300 bg-violet-950/40",
      scanlineGlow: "rgba(139, 92, 246, 0.03)",
    },
    rose: {
      bracket: "border-rose-500/40 text-rose-400",
      accentDot: "bg-rose-400 shadow-[0_0_8px_#fb7185]",
      pillBorder: "border-rose-500/30 text-rose-300 bg-rose-950/40",
      scanlineGlow: "rgba(244, 63, 94, 0.03)",
    },
  }[themeColor];

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-10 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Cinematic Radial Vignette & Edge Shadowing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.75)_80%,rgba(2,6,23,0.98)_100%)]" />

      {/* 2. Top & Bottom Seamless Blends */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent" />

      {/* 3. Subtle Cybernetic HUD Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 4. Fine Corner HUD Brackets (Desktop / Tablet) */}
      <div className="hidden sm:block">
        {/* Top Left Bracket */}
        <div className={`absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 ${themeStyles.bracket}`} />
        {/* Top Right Bracket */}
        <div className={`absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 ${themeStyles.bracket}`} />
        {/* Bottom Left Bracket */}
        <div className={`absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 ${themeStyles.bracket}`} />
        {/* Bottom Right Bracket */}
        <div className={`absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 ${themeStyles.bracket}`} />
      </div>

      {/* 5. Minimal Technical Telemetry Sidebar / Coordinates (Desktop Only) */}
      {telemetry && (
        <div className="hidden lg:flex flex-col justify-between absolute inset-y-12 right-8 pointer-events-none text-[10px] font-mono tracking-widest text-slate-500/70 select-none">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${themeStyles.accentDot} animate-pulse`} />
            <span>{telemetry.nodeId}</span>
          </div>

          <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-4 text-[9px] uppercase tracking-widest text-slate-600">
            <span>{telemetry.sector}</span>
            <span className="w-8 h-[1px] bg-slate-800" />
            <span>{telemetry.protocol}</span>
          </div>

          <div className="text-right">
            <span>{telemetry.securityLevel}</span>
          </div>
        </div>
      )}

      {/* 6. Subtle Horizontal Scanline Flare */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${themeStyles.scanlineGlow} 50%, transparent 100%)`,
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
};
