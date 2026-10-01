import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroScrollAnimation } from "@/components/HeroScrollAnimation";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Smartphone, 
  Receipt, 
  GraduationCap, 
  Lightbulb, 
  ArrowRight,
  CheckCircle2,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  // Interactive Project Cost Estimator States
  const [calcService, setCalcService] = useState<"web" | "ecommerce" | "app" | "billing">("web");
  const [calcScale, setCalcScale] = useState<"standard" | "custom" | "enterprise">("custom");
  const [calcTimeline, setCalcTimeline] = useState<"standard" | "express">("standard");

  // Project Scope & Timeline Estimator
  const calculateEstimate = () => {
    let days = "7 - 14 Days";
    let tierName = "Custom Scope";

    if (calcService === "web") {
      days = calcScale === "standard" ? "5 - 7 Days" : calcScale === "custom" ? "10 - 14 Days" : "2 - 4 Weeks";
      tierName = calcScale === "standard" ? "Starter Web Architecture" : calcScale === "custom" ? "Custom Business Platform" : "Enterprise Web Portal";
    } else if (calcService === "ecommerce") {
      days = calcScale === "standard" ? "10 - 14 Days" : calcScale === "custom" ? "2 - 3 Weeks" : "4 - 6 Weeks";
      tierName = calcScale === "standard" ? "Standard E-Store" : calcScale === "custom" ? "Multi-Category Marketplace" : "OmniChannel E-Commerce";
    } else if (calcService === "app") {
      days = calcScale === "standard" ? "2 - 3 Weeks" : calcScale === "custom" ? "3 - 5 Weeks" : "6 - 8 Weeks";
      tierName = calcScale === "standard" ? "MVP Mobile App" : calcScale === "custom" ? "Full Feature iOS & Android" : "Enterprise Mobile App";
    } else if (calcService === "billing") {
      days = calcScale === "standard" ? "1 - 2 Days" : calcScale === "custom" ? "3 - 5 Days" : "1 - 2 Weeks";
      tierName = calcScale === "standard" ? "Single Store POS" : calcScale === "custom" ? "Retail & Inventory POS" : "Multi-Branch Cloud Billing";
    }

    return {
      tierName,
      duration: calcTimeline === "express" ? "Priority Express (~50% Faster)" : days,
    };
  };

  const estimate = calculateEstimate();

  const services = [
    {
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      title: "Custom Web Development",
      badge: "High ROI",
      desc: "Fast, responsive web portals, landing pages, and web apps built with modern React, Next.js, and TypeScript.",
      href: "/web-development",
      points: ["100% Mobile Responsive", "SEO Optimized Architecture", "Fast Load Times (<1s)", "Custom Admin CMS"]
    },
    {
      icon: <Receipt className="w-6 h-6 text-amber-400" />,
      title: "Billing & GST Software",
      badge: "Featured",
      desc: "Smart point-of-sale (POS) and invoicing software with barcode scanning, automated GST reports, and WhatsApp bills.",
      href: "/billing-software",
      points: ["Superfast 3-Sec Billing", "Offline Operation Support", "Barcode & Thermal Printing", "Daily Profit/Loss Reports"]
    },
    {
      icon: <Smartphone className="w-6 h-6 text-sky-400" />,
      title: "Mobile App Development",
      badge: "iOS & Android",
      desc: "Native and cross-platform mobile apps providing seamless UX, push notifications, and payment gateway integration.",
      href: "/web-development",
      points: ["Cross-platform React Native", "Smooth Gestures & Offline Cache", "Google Play & App Store Setup", "Real-time Push Alerts"]
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      title: "UI/UX & Product Design",
      badge: "Design Systems",
      desc: "Intuitive user experiences, clickable Figma prototypes, responsive interfaces, and custom brand design systems.",
      href: "/web-development",
      points: ["User Journey & Wireframing", "Figma Interactive Prototypes", "Modern Component Libraries", "Conversion-Focused UI"]
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-rose-400" />,
      title: "Tech Internship & Training",
      badge: "Batch Open",
      desc: "1-month hands-on developer training with live project coding, 1-on-1 mentorship, and recognized completion certificate.",
      href: "/internship",
      points: ["Full-Stack MERN / React", "Live GitHub Portfolio Project", "Verifiable Certificate", "Letter of Recommendation"]
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      title: "IT Consulting & Digital Strategy",
      badge: "Enterprise",
      desc: "Strategic technical advice to modernize legacy systems, cloud migration, cybersecurity audits, and workflow automation.",
      href: "/about",
      points: ["Cloud Architecture Planning", "Database Optimization", "Payment Gateway Setup", "Business Process Automation"]
    },
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Next.js", category: "Framework" },
    { name: "Node.js", category: "Backend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Express", category: "API" },
    { name: "Flutter / RN", category: "Mobile" },
    { name: "Docker", category: "DevOps" },
    { name: "AWS Cloud", category: "Cloud" },
  ];

  const portfolioItems = [
    {
      title: "OmniChannel E-Commerce Store",
      category: "Web & E-Commerce",
      desc: "High-speed multi-vendor shopping platform with Razorpay payment integration, product variations, and SMS dispatch.",
      tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
      stat: "+180% Sales Growth"
    },
    {
      title: "Smart Retail GST POS Software",
      category: "Billing Solution",
      desc: "Supermarket billing system supporting 10,000+ SKU barcodes, thermal printing, and automatic GST e-way billing.",
      tech: ["Electron", "SQLite", "ESC/POS", "TypeScript"],
      stat: "3-Sec Checkouts"
    },
    {
      title: "Enterprise Cloud ERP & Management Portal",
      category: "Enterprise Software",
      desc: "Centralized cloud ERP platform for multi-warehouse inventory, procurement workflows, and real-time ledger accounting.",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
      stat: "99.9% Uptime"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Dynamic Nav: Hidden during 3D hero animation, reveals smoothly once past hero */}
      <Navigation />

      {/* 3D Golden Robot Animation Section (Full Screen Scrubbing) */}
      <HeroScrollAnimation />

      {/* Section Divider Accent */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent relative z-20" />

      {/* Trust Counters Strip */}
      <section className="bg-slate-900/90 border-b border-slate-800/80 py-8 relative shadow-xl backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 md:border-0 md:border-r md:border-slate-800">
              <p className="text-3xl sm:text-4xl font-black text-cyan-400">50+</p>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Delivered Projects</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 md:border-0 md:border-r md:border-slate-800">
              <p className="text-3xl sm:text-4xl font-black text-white">100%</p>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Client Satisfaction</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 md:border-0 md:border-r md:border-slate-800">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">100+</p>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Interns Mentored</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 md:border-0">
              <p className="text-3xl sm:text-4xl font-black text-sky-400">24/7</p>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">Technical Support SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee Strip */}
      <section className="py-6 bg-slate-950 border-b border-slate-800/60 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Modern Technologies We Specialize In:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 shadow-sm"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
              End-To-End Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-2">
              Comprehensive IT & Software Solutions
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
              Tailored technology engineering for retail shops, startups, enterprises, and citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-900/80 rounded-2xl p-7 border border-slate-800 shadow-xl hover:shadow-2xl hover:border-cyan-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800 mb-6">
                    {service.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={service.href}>
                  <Button variant="ghost" className="w-full min-h-[48px] justify-between px-0 text-cyan-400 font-bold hover:bg-transparent hover:text-cyan-300 group/btn">
                    <span>Explore & Get Started</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Cost Calculator */}
      <section id="calculator" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 text-white">
              Interactive Project Cost Estimator
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Configure your requirements below to get an instant estimate of project budget and delivery turnaround.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Controls (2 cols) */}
              <div className="md:col-span-2 space-y-6">
                {/* 1. Service Type */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                    1. Select Project Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {[
                      { id: "web", label: "Business Website", icon: "🌐" },
                      { id: "ecommerce", label: "E-Commerce Portal", icon: "🛒" },
                      { id: "app", label: "Mobile Application", icon: "📱" },
                      { id: "billing", label: "Billing & GST POS", icon: "🧾" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCalcService(item.id as any)}
                        className={`p-3 sm:p-3.5 min-h-[48px] rounded-xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
                          calcService === item.id
                            ? "bg-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <span className="text-sm font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Scale & Features */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                    2. Project Scope & Design Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {[
                      { id: "standard", label: "Starter", desc: "Core essentials" },
                      { id: "custom", label: "Professional", desc: "Custom features" },
                      { id: "enterprise", label: "Enterprise", desc: "Full scale & SLA" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCalcScale(item.id as any)}
                        className={`p-3 min-h-[48px] rounded-xl text-center border transition-all cursor-pointer ${
                          calcScale === item.id
                            ? "bg-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                        }`}
                      >
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Delivery Speed */}
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                    3. Turnaround Speed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      onClick={() => setCalcTimeline("standard")}
                      className={`p-3 min-h-[48px] rounded-xl border text-center transition-all cursor-pointer ${
                        calcTimeline === "standard"
                          ? "bg-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <p className="text-sm font-bold">Standard Delivery</p>
                      <p className="text-[11px] text-slate-400">Regular development cycle</p>
                    </button>
                    <button
                      onClick={() => setCalcTimeline("express")}
                      className={`p-3 min-h-[48px] rounded-xl border text-center transition-all cursor-pointer ${
                        calcTimeline === "express"
                          ? "bg-cyan-500/20 border-cyan-400 text-white ring-1 ring-cyan-400"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      <p className="text-sm font-bold text-cyan-300">⚡ Express Delivery</p>
                      <p className="text-[11px] text-slate-400">Dedicated sprint team</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Estimate Result Display (1 col) */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-center relative">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold uppercase">
                    Estimated Scope & Timeline
                  </span>

                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Solution Tier</p>
                    <p className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">
                      {estimate.tierName}
                    </p>
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                      Custom RFP Quote
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-left space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estimated Turnaround:</span>
                      <span className="font-bold text-white">{estimate.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Free Support:</span>
                      <span className="font-bold text-emerald-400">6 Months Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Source Code:</span>
                      <span className="font-bold text-white">100% Client Ownership</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <Link href="/web-development" className="block">
                    <Button className="w-full min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25">
                      Request Scope & Proposal
                    </Button>
                  </Link>
                  <a
                    href={`https://wa.me/918754020556?text=${encodeURIComponent(
                      `Hello, I would like to discuss a project for ${calcService} (${calcScale} scope) with ${estimate.duration} turnaround. Can we connect?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full min-h-[48px] rounded-xl border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/40 text-xs font-semibold">
                      <FaWhatsapp className="mr-1.5 w-4 h-4" /> Discuss on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies / Portfolio Preview */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/80">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
                Featured Client Deployments
              </h2>
              <p className="text-slate-400 mt-2">
                Real results delivered across commercial websites, retail automation, and digital portals.
              </p>
            </div>
            <Link href="/web-development" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto min-h-[48px] rounded-full px-6 border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white font-bold">
                Order Your Custom Project <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {portfolioItems.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-cyan-950/40 transition-all duration-300">
                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{item.desc}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map((t) => (
                      <span key={t} className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Live Client Architecture</span>
                  <Link href="/web-development" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    <span>Request Similar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact CTA Strip leading to Contact Page */}
      <section className="py-20 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-widest font-mono font-bold text-cyan-400 mb-3 bg-cyan-950/80 border border-cyan-500/30 px-3.5 py-1.5 rounded-full">
            START YOUR TRANSFORMATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Ready to Build Your Next-Gen System?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            From high-speed web platforms to retail billing software and talent training, our engineering team is ready to deliver.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <Link href="/enquiry" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 cursor-pointer">
                <span>Contact Engineering Team</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a
              href="https://wa.me/918754020556"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/40 text-sm font-semibold cursor-pointer">
                <FaWhatsapp className="mr-2 w-4 h-4" /> Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
