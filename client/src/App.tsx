import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar, ScrollToTopButton } from "@/components/ScrollAnimation";

// Critical landing page loaded directly for fastest Time to Interactive
import Home from "@/pages/Home";

// Secondary pages lazily loaded to minimize mobile bundle size and CPU parse time
const About = lazy(() => import("@/pages/About"));
const WebDevelopment = lazy(() => import("@/pages/WebDevelopment"));
const BillingSoftware = lazy(() => import("@/pages/BillingSoftware"));
const Internship = lazy(() => import("@/pages/Internship"));
const Enquiry = lazy(() => import("@/pages/Enquiry"));
const Careers = lazy(() => import("@/pages/Careers"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Heavy AI chatbot widget loaded lazily on demand
const Chatbot = lazy(() => import("@/components/Chatbot").then(m => ({ default: m.Chatbot })));

function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-950 text-cyan-400 gap-3">
      <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Loading Experience...</span>
    </div>
  );
}

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect touch devices (iOS & Android)
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // On mobile, native touch momentum scrolling is 120Hz hardware-accelerated by the OS compositor.
    // Hijacking touch events on mobile causes WebKit/Blink to stutter and hang.
    // On desktop, Lenis delivers the butter-smooth mousewheel glide seen on aventuradentalarts.com.
    if (isTouch) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Make lenis accessible globally for hero canvas synchronization
    (window as any).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);

  return <>{children}</>;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // If there is no hash in URL, scroll to top smoothly
    if (!window.location.hash) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/web-development" component={WebDevelopment} />
          <Route path="/billing-software" component={BillingSoftware} />
          <Route path="/internship" component={Internship} />
          <Route path="/careers" component={Careers} />
          <Route path="/jobs" component={Careers} />
          <Route path="/vacancies" component={Careers} />
          <Route path="/enquiry" component={Enquiry} />
          <Route path="/contact" component={Enquiry} />
          <Route path="/order" component={Enquiry} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function MainContent() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full relative max-w-[100vw]">
      <main className="flex-grow overflow-x-hidden w-full">
        <Router />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
      <ScrollToTopButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <CustomCursor />
          <MainContent />
          <Toaster />
        </SmoothScrollProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
