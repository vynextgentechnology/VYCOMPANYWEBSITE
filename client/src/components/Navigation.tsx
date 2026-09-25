import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Code2, 
  Receipt, 
  Layers, 
  GraduationCap, 
  ArrowRight,
  Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@assets/vy_nextgen_logo.webp";
import { useIsPastHero } from "@/hooks/use-hero-passed";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location] = useLocation();
  const isPastHero = useIsPastHero();

  const isHome = location === "/";
  const showNav = !isHome || isPastHero;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const serviceItems = [
    {
      title: "Web & Mobile Development",
      desc: "Custom full-stack web applications, portals & mobile apps",
      href: "/web-development",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      tag: "Popular"
    },
    {
      title: "Billing & GST Software",
      desc: "Smart invoicing, POS, barcode & inventory management",
      href: "/billing-software",
      icon: <Receipt className="w-5 h-5 text-amber-400" />,
      tag: "Featured"
    },
    {
      title: "UI/UX & Product Design",
      desc: "Figma wireframing, clickable prototypes & brand systems",
      href: "/web-development",
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      tag: "Creative"
    },
  ];

  return (
    <AnimatePresence>
      {showNav && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isHome
              ? isScrolled
                ? "bg-slate-950/90 backdrop-blur-xl shadow-2xl border-b border-cyan-500/30 py-3.5"
                : "bg-slate-950/60 backdrop-blur-md py-4 border-b border-cyan-500/10"
              : isScrolled
                ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-100 py-3.5"
                : "bg-white/70 backdrop-blur-md py-5"
          }`}
        >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className={`h-10 sm:h-11 px-2 py-1 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0 ${
            isHome
              ? "bg-slate-900 border border-cyan-500/40 shadow-lg shadow-cyan-950/50"
              : "bg-[#041d57] border border-blue-900/30 shadow-md shadow-blue-950/20"
          }`}>
            <img
              src={logoImg}
              alt="VY NextGen Technologies Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col whitespace-nowrap select-none">
            <span className={`text-lg sm:text-xl font-black tracking-tight leading-none whitespace-nowrap ${
              isHome ? "text-white" : "text-slate-900"
            }`}>
              VY NEXTGEN
            </span>
            <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-1 whitespace-nowrap ${
              isHome ? "text-cyan-400 font-mono" : "text-blue-600"
            }`}>
              TECHNOLOGIES
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-7">
          <Link
            href="/"
            className={`text-xs lg:text-sm font-semibold transition-colors py-2 ${
              isHome
                ? "text-cyan-400 font-bold font-mono"
                : location === "/" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            className={`text-xs lg:text-sm font-semibold transition-colors py-2 ${
              isHome
                ? "text-slate-300 hover:text-cyan-300"
                : location === "/about" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-xs lg:text-sm font-semibold transition-colors py-2 cursor-pointer ${
                isHome
                  ? "text-slate-300 hover:text-cyan-300"
                  : location.startsWith("/web-development") || location.startsWith("/billing-software")
                    ? "text-blue-600 font-bold"
                    : "text-slate-600 hover:text-blue-600"
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full left-0 w-80 rounded-2xl shadow-2xl p-3 mt-1 ${
                    isHome 
                      ? "bg-[#090d16] border border-cyan-500/40 text-white shadow-[0_0_35px_rgba(6,182,212,0.25)]" 
                      : "bg-white border border-slate-100 text-slate-900"
                  }`}
                >
                  <div className="space-y-1">
                    {serviceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`flex items-start gap-3 p-3 rounded-xl transition-colors group ${
                          isHome ? "hover:bg-slate-900" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isHome ? "bg-slate-900 border border-slate-800" : "bg-slate-100"
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold transition-colors ${
                              isHome ? "text-slate-200 group-hover:text-cyan-400" : "text-slate-800 group-hover:text-blue-600"
                            }`}>
                              {item.title}
                            </p>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                              isHome ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30" : "bg-blue-100 text-blue-700"
                            }`}>
                              {item.tag}
                            </span>
                          </div>
                          <p className={`text-xs mt-0.5 line-clamp-2 ${isHome ? "text-slate-400" : "text-slate-500"}`}>
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/internship"
            className={`flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors py-2 ${
              isHome
                ? "text-slate-300 hover:text-emerald-400"
                : location === "/internship" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Internship</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </Link>

          <Link
            href="/careers"
            className={`flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors py-2 ${
              isHome
                ? "text-slate-300 hover:text-cyan-300"
                : location === "/careers" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Careers</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
              isHome ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30" : "bg-blue-100 text-blue-700"
            }`}>
              Hiring
            </span>
          </Link>

          <Link
            href="/enquiry"
            className={`text-xs lg:text-sm font-semibold transition-colors py-2 ${
              isHome ? "text-slate-300 hover:text-cyan-300" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>

        </nav>

        {/* Right Action CTAs */}
        <div className="hidden md:flex items-center gap-2 xl:gap-4">
          <Link href="/enquiry">
            <button className={`rounded-xl px-3.5 xl:px-5 h-9 xl:h-10 text-xs xl:text-sm font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isHome
                ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25"
            }`}>
              <span>[ ENQUIRE NOW ]</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button with 48px Touch Target */}
        <button
          className={`md:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl transition-colors active:scale-95 cursor-pointer ${
            isHome ? "text-slate-200 hover:bg-slate-900" : "text-slate-700 hover:bg-slate-100"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-Viewport Dismissible Mobile Overlay & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Slide-in Mobile Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className={`absolute top-0 right-0 bottom-0 w-full max-w-sm flex flex-col shadow-2xl overflow-hidden ${
                isHome 
                  ? "bg-slate-950 border-l border-cyan-500/30 text-white" 
                  : "bg-white border-l border-slate-200 text-slate-900"
              }`}
            >
              {/* Drawer Top Header with Brand & Close Button */}
              <div className={`p-4 flex items-center justify-between border-b ${
                isHome ? "border-slate-800 bg-slate-900/60" : "border-slate-100 bg-slate-50"
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className={`h-9 px-2 py-0.5 rounded-lg flex items-center justify-center ${
                    isHome ? "bg-slate-900 border border-cyan-500/40" : "bg-[#041d57] border border-blue-900/30"
                  }`}>
                    <img src={logoImg} alt="VY NextGen Logo" className="h-6 w-auto object-contain" />
                  </div>
                  <div>
                    <span className={`text-sm font-black tracking-tight block ${isHome ? "text-white" : "text-slate-900"}`}>
                      VY NEXTGEN
                    </span>
                    <span className={`text-[9px] font-bold font-mono tracking-wider uppercase block ${isHome ? "text-cyan-400" : "text-blue-600"}`}>
                      TECHNOLOGIES
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-3 min-w-[48px] min-h-[48px] rounded-xl flex items-center justify-center transition-colors active:scale-95 cursor-pointer ${
                    isHome 
                      ? "text-slate-300 hover:text-white bg-slate-900 border border-slate-800" 
                      : "text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
                  }`}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Menu Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center min-h-[48px] px-3.5 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isHome ? "text-cyan-400 bg-slate-900/70 border border-cyan-500/30 font-mono" : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center min-h-[48px] px-3.5 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isHome ? "text-slate-200 hover:text-cyan-400 hover:bg-slate-900/50" : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  About Us & Leadership
                </Link>
                
                {/* Services Group */}
                <div className="pt-2 pb-1">
                  <p className={`text-xs font-bold uppercase tracking-wider px-3.5 mb-2 ${isHome ? "text-cyan-400/80 font-mono" : "text-slate-400"}`}>
                    Solutions & Services
                  </p>
                  <div className={`space-y-1.5 pl-2 border-l-2 ml-3.5 ${isHome ? "border-cyan-500/40" : "border-blue-500/30"}`}>
                    <Link
                      href="/web-development"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 min-h-[48px] px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        isHome ? "text-slate-200 hover:text-cyan-300 hover:bg-slate-900/50" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Web & App Development</span>
                    </Link>
                    <Link
                      href="/billing-software"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 min-h-[48px] px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        isHome ? "text-slate-200 hover:text-amber-300 hover:bg-slate-900/50" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Receipt className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Billing & GST Software</span>
                    </Link>
                    <Link
                      href="/web-development"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 min-h-[48px] px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                        isHome ? "text-slate-200 hover:text-emerald-300 hover:bg-slate-900/50" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>UI/UX & Product Design</span>
                    </Link>
                  </div>
                </div>

                <Link
                  href="/internship"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between min-h-[48px] px-3.5 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isHome ? "text-slate-200 hover:text-emerald-400 hover:bg-slate-900/50" : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                    <span>Tech Internship</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isHome ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    Enroll Now
                  </span>
                </Link>

                <Link
                  href="/careers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between min-h-[48px] px-3.5 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isHome ? "text-slate-200 hover:text-cyan-400 hover:bg-slate-900/50" : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-5 h-5 text-cyan-400" />
                    <span>Careers & Jobs</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isHome ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40" : "bg-blue-100 text-blue-700"
                  }`}>
                    Hiring
                  </span>
                </Link>

                <Link
                  href="/enquiry"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center min-h-[48px] px-3.5 py-2.5 rounded-xl text-base font-bold transition-colors ${
                    isHome ? "text-slate-200 hover:text-cyan-400 hover:bg-slate-900/50" : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  Contact Us
                </Link>
              </div>

              {/* Bottom Sticky Action CTAs with Safe Area Padding */}
              <div className={`p-4 border-t ${
                isHome ? "border-slate-800 bg-slate-950" : "border-slate-100 bg-white"
              } pb-safe space-y-2.5`}>
                <Link href="/enquiry" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className={`w-full min-h-[48px] rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isHome 
                      ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  }`}>
                    <span>[ SUBMIT PROJECT ENQUIRY ]</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                <a
                  href="https://wa.me/918754020556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 min-h-[48px] w-full rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30 text-xs font-semibold"
                >
                  <span>Chat on WhatsApp: +91 87540 20556</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
