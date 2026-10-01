import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface CinematicPageTransitionProps {
  children: React.ReactNode;
}

export const CinematicPageTransition: React.FC<CinematicPageTransitionProps> = ({ children }) => {
  const [location] = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger subtle cybernetic system transfer flash on navigation
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 420);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative w-full overflow-x-clip">
      {/* Subtle Cinematic Route Flash (System Transfer HUD) */}
      <AnimatePresence>
        {isTransitioning && !shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-slate-950/20 backdrop-blur-[1px]"
          >
            {/* Top & Bottom Cybernetic Shutter Lines */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />

            {/* Micro Telemetry Transfer Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-950/80 border border-cyan-500/30 rounded-full px-4 py-1.5 backdrop-blur-md flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>VY NEXTGEN // SYSTEM TRANSFER</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content with Smooth Entrance */}
      <motion.div
        key={location}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
