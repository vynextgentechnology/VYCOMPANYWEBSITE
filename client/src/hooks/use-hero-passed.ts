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
        // Reveal navigation when reaching the end of the hero scrub
        setIsPastHero(rect.bottom <= window.innerHeight * 1.05);
      } else {
        setIsPastHero(window.scrollY > (window.innerWidth < 768 ? 200 : 1500));
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHome]);

  return isPastHero;
}
