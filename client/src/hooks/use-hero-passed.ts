import { useState, useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Hook to detect whether the user has scrolled past the 3D Hero Animation on the Home page.
 * On non-home pages, this always returns true so Navbar, WhatsApp, and Chatbot are visible.
 */
export function useIsPastHero() {
  const [location] = useLocation();
  const isHome = location === "/";
  const [isPastHero, setIsPastHero] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsPastHero(true);
      return;
    }

    const checkScroll = () => {
      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const scrollableDist = rect.height - window.innerHeight;
        const progress = scrollableDist > 0 ? Math.min(1, Math.max(0, -rect.top / scrollableDist)) : 0;
        // Reveal navigation when reaching the ending phase where remaining content pops out
        setIsPastHero(progress >= 0.65 || rect.bottom <= window.innerHeight * 1.05);
      } else {
        setIsPastHero(window.scrollY > (window.innerWidth < 768 ? 800 : 1500));
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHome]);

  return isPastHero;
}
