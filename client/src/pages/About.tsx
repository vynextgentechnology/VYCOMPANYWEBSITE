import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  HeartHandshake, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Users,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
import { MouseScrollIndicator } from "@/components/ScrollAnimation";
import { SpotlightCard } from "@/components/InteractiveSpotlightCard";
import founderPhoto from "@assets/valiullah_founder_chairman.webp";
import narendraPhoto from "@assets/narendra_prasath_ceo.webp";
import yuvanPhoto from "@assets/yuvan_shankar_raja_co_founder.webp";
import santhoshPhoto from "@assets/santhosh_managing_director.webp";
import yeswanthPhoto from "@assets/yeswanth_director.webp";
import sriPrajithPhoto from "@assets/sri_prajith_cto_cfo.webp";
import logoImg from "@assets/vy_nextgen_logo.webp";

export interface ExecutiveLeader {
  name: string;
  role: string;
  badge: string;
  department: string;
  photo: string;
  summary: string;
  focus: string[];
}

const leaders: ExecutiveLeader[] = [
  {
    name: "Mr. Valiullah",
    role: "Founder & Executive Chairman",
    badge: "Founder & Chair",
    department: "Founding Governance",
    photo: founderPhoto,
    summary: "Visionary founder governing corporate mission, core software architectures, regional digital transformation, and software developer incubation.",
    focus: ["System Architecture", "POS Engine R&D", "Tech Incubation"],
  },
  {
    name: "Mr. Yuvan Shankar Raja",
    role: "Co-Founder",
    badge: "Co-Founder",
    department: "Founding Board",
    photo: yuvanPhoto,
    summary: "Co-Founder driving business architecture, financial technology innovation, and strategic industry partnerships.",
    focus: ["Fintech Systems", "Strategic Scale", "Commercial Alliances"],
  },
  {
    name: "Mr. Narendhra Prashath",
    role: "Chief Executive Officer (CEO)",
    badge: "CEO",
    department: "Corporate Leadership",
    photo: narendraPhoto,
    summary: "Chief Executive Officer directing corporate strategy, technology consulting, enterprise client solutions and digital innovation.",
    focus: ["Corporate Strategy", "Enterprise Tech", "Client Acquisition"],
  },
  {
    name: "Mr. Sri Prajith",
    role: "Chief Technology & Chief Financial Officer",
    badge: "CTO / CFO",
    department: "Executive Technology & Finance",
    photo: sriPrajithPhoto,
    summary: "Executive Vice President commanding dual portfolios across technical architecture, cloud infrastructure, fiscal governance, and economic performance.",
    focus: ["Cloud DevSecOps", "Fiscal Governance", "99.9% SLAs"],
  },
  {
    name: "Mr. Santhosh",
    role: "Managing Director",
    badge: "Managing Director",
    department: "Executive Management",
    photo: santhoshPhoto,
    summary: "Managing Director steering technical operations, engineering delivery standards, and core software solutions.",
    focus: ["DevOps Automation", "Agile Sprints", "Code Quality Rigor"],
  },
  {
    name: "Mr. Yeswanth",
    role: "Director",
    badge: "Director",
    department: "Corporate Strategy",
    photo: yeswanthPhoto,
    summary: "Director spearheading strategic partnerships, client relations, and market expansion across Tamil Nadu and pan-India.",
    focus: ["Market Expansion", "Key Partnerships", "Client Retention"],
  },
];

const milestones = [
  {
    year: "2025",
    title: "Company Foundation",
    tag: "Genesis",
    color: "#06b6d4",
    desc: "Established as a high-tech MSME enterprise in Karur, Tamil Nadu with a clear mission to bridge digital gaps for regional businesses.",
  },
  {
    year: "2026 (Q1)",
    title: "Billing & POS Software Launch",
    tag: "Product Release",
    color: "#3b82f6",
    desc: "Engineered and deployed our flagship retail billing software with 3-second barcode scanning, thermal printing, and GST compliance.",
  },
  {
    year: "2026 (Q2)",
    title: "Cloud & Custom ERP Solutions",
    tag: "Enterprise Scale",
    color: "#6366f1",
    desc: "Expanded enterprise offerings into custom ERP portals, inventory platforms, multi-store sync, and scalable cloud microservices.",
  },
  {
    year: "2026 (Q3-Q4)",
    title: "Tech Academy & AI-Driven Solutions",
    tag: "Modern Era",
    color: "#10b981",
    desc: "Mentored 100+ collegiate developers, launched ISO verified internships, and deployed 50+ enterprise systems across Tamil Nadu.",
  },
];

const values = [
  {
    icon: <Target className="w-6 h-6 text-cyan-400" />,
    title: "Precision Engineering",
    desc: "We build software with clean, maintainable architecture, sub-second load times, and rigorous quality assurance.",
    glow: "hover:border-cyan-500/50"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
    title: "Security & Transparency",
    desc: "Clear upfront scopes, no hidden fees, and 100% client ownership of all intellectual property, credentials, and source code.",
    glow: "hover:border-blue-500/50"
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-indigo-400" />,
    title: "Client-Centric SLA",
    desc: "We don't just ship code and leave; our dedicated Karur team provides 6 months of free post-launch support and warranty.",
    glow: "hover:border-indigo-500/50"
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    title: "Talent Empowerment",
    desc: "We are deeply committed to training collegiate talent into industry-ready engineers via our 1-month intensive tech internship.",
    glow: "hover:border-emerald-500/50"
  },
];

const marqueeItems = [
  "50+ Projects Engineered",
  "99.9% Uptime Architecture",
  "3-Second GST Billing POS",
  "100% Client Code Ownership",
  "ISO Certified Tech Academy",
  "6 Months Free SLA Support",
  "Full-Stack Web & Mobile Systems",
  "Karur Headquarters • Pan-India Reach",
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 80%"],
  });
  const smoothTimelineProgress = useSpring(timelineProgress, { stiffness: 100, damping: 30 });
  const timelineHeight = useTransform(smoothTimelineProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 font-sans overflow-x-hidden">
      <Navigation />

      {/* 1. Cinematic Hero Section with Ambient Glows */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 bg-slate-950 text-white overflow-hidden">
        {/* Ambient Glow Spheres (Zyvex Style) */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <img src={logoImg} alt="VY NextGen Logo" className="h-5 w-auto rounded object-contain" />
              <span className="font-mono tracking-wide">// VY NEXTGEN TECHNOLOGIES • EST. 2025</span>
            </div>

            {/* Main Animated Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white">
              <span className="text-white">Pioneering</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                Digital Evolution
              </span>{" "}
              <br className="hidden sm:inline" />
              <span className="text-white">from Karur to the World</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal px-2 mb-10">
              We engineer mission-critical websites, scalable GST billing software, and custom cloud ERP platforms while cultivating tomorrow's software developers.
            </p>

            {/* Live Metrics Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-800/80">
              {[
                { val: "50+", label: "Projects Delivered" },
                { val: "99.9%", label: "Uptime Architecture" },
                { val: "100+", label: "Interns Mentored" },
                { val: "6 Mos", label: "Free SLA Warranty" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md"
                >
                  <p className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">{m.val}</p>
                  <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{m.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Animated Mouse Scroll Indicator */}
            <div className="mt-12 flex justify-center">
              <MouseScrollIndicator targetId="leadership" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Zyvex-Style Infinite Marquee Ticker Banner */}
      <div className="stats-banner py-4 bg-slate-900/90 border-y border-cyan-500/20 overflow-hidden relative backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 pointer-events-none" />
        <div className="animate-marquee items-center gap-8 text-xs sm:text-sm font-mono tracking-wider uppercase text-cyan-300 font-semibold">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="inline-flex items-center gap-8">
              <span>{item}</span>
              <span className="text-blue-500">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mission & Vision Section (Cybernetic Infrastructure Cards) */}
      <section className="py-24 bg-slate-950 relative overflow-hidden border-b border-slate-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">// ARCHITECTURAL PURPOSE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Our Mission & Strategic Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group backdrop-blur-xl"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase text-blue-400 font-bold block mb-1">Purpose & Execution</span>
              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To democratize enterprise-grade software and automated digital tools for retail shops, startups, and expanding businesses, enabling frictionless operations, tax compliance, and accelerated digital scalability.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group backdrop-blur-xl"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">Horizon & Impact</span>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To be recognized as South India's premier digital technology partner, revered for rock-solid software engineering, customer-first service, and an uncompromising dedication to nurturing future engineering talent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-24 bg-slate-900/60 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">// ENGINEERING FOUNDATIONS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">The Values That Guide Us</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Standardizing trust, technical rigor, and full client transparency in every software build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor="rgba(6, 182, 212, 0.15)"
                  className={`h-full bg-slate-950/80 p-7 rounded-2xl border border-slate-800 ${v.glow} transition-all duration-300 backdrop-blur-md shadow-xl flex flex-col justify-between`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 shadow-inner">
                      {v.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{v.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Executive Director Board — Cinematic Cyber Card Grid with Visual Effects */}
      <section id="leadership" className="py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900">
        {/* Animated Ambient Halo Spheres */}
        <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 -right-40 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-35 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-lg shadow-cyan-500/10 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>// COMPANY OFFICIALS • EXECUTIVE LEADERSHIP</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2 tracking-tight">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Leadership.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Meet the exceptional minds driving VY NextGen Technologies' vision, core system architectures, and operational excellence.
            </p>
          </div>

          {/* Executive Members Grid with Rich Visuals & Micro-Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            {leaders.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-slate-800 via-slate-800/50 to-slate-900 hover:from-cyan-400/60 hover:via-blue-500/40 hover:to-indigo-500/50 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)] flex flex-col justify-between"
              >
                <SpotlightCard
                  spotlightColor="rgba(6, 182, 212, 0.22)"
                  className="bg-slate-950/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden"
                >
                  {/* Subtle Corner Tech Accent */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-slate-700 group-hover:text-cyan-400/70 transition-colors duration-300 select-none">
                    [ 0{idx + 1} ]
                  </div>

                  <div>
                    {/* Photo Container with Glass Frame & Light Sheen Effect */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 aspect-[4/5] w-full transition-all duration-500 shadow-inner">
                      {/* Active Official Micro-Badge */}
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-mono font-medium text-slate-300 shadow-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        <span className="tracking-wider">OFFICIAL</span>
                      </div>

                      {/* Photo */}
                      <img
                        src={leader.photo}
                        alt={`${leader.name} - ${leader.role}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Ambient Gradient Shadows */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />

                      {/* Shimmer Light Sweep on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    </div>

                    {/* Member Details */}
                    <div className="pt-5 pb-1">
                      {/* Blue Pill Badge with Glow */}
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-md shadow-blue-600/30 group-hover:shadow-cyan-500/40 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300">
                        <Sparkles className="w-3 h-3 text-cyan-200" />
                        <span>{leader.badge}</span>
                      </span>

                      {/* Department / Category Tag */}
                      <p className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400/90 flex items-center gap-1.5 mt-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span>{leader.department}</span>
                      </p>

                      {/* Member Name with Shimmering Gradient Hover */}
                      <h3 className="text-lg sm:text-xl font-black text-white mt-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-cyan-200 group-hover:to-blue-300 transition-all duration-300">
                        {leader.name}
                      </h3>

                      {/* Member Role Title */}
                      <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                        {leader.role}
                      </p>

                      {/* Summary Bio */}
                      <p className="text-xs text-slate-400 leading-relaxed mt-2.5 group-hover:text-slate-200 transition-colors duration-300">
                        {leader.summary}
                      </p>

                      {/* Executive Focus Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-3.5 mt-3 border-t border-slate-800/80">
                        {leader.focus.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/90 text-cyan-300/80 border border-slate-800/80 group-hover:border-cyan-500/30 transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Animated Neon Glowing Bottom Accent Line */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Company Evolution Timeline (Zyvex Style Vertical Timeline) */}

      <section id="timeline" ref={timelineRef} className="py-28 bg-slate-900/60 relative overflow-hidden border-t border-slate-900">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">// EVOLUTION</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">
              Company <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">History.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              From our founding roots in Karur to delivering high-scale software systems and empowering next-gen engineers.
            </p>
          </div>

          <div className="relative">
            {/* Center Vertical Inactive Track */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2" />

            {/* Center Vertical Animated Scroll-Driven Beam */}
            <motion.div 
              style={{ height: timelineHeight }}
              className="absolute left-4 sm:left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-emerald-400 -translate-x-1/2 shadow-[0_0_14px_#06b6d4] origin-top z-10" 
            />

            <div className="space-y-12">
              {milestones.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center ${
                    idx % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"
                  } flex-row`}
                >
                  {/* Timeline Dot Node with Pulsing Ring */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      whileInView={{ scale: [0.8, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="w-5 h-5 rounded-full border-2 border-white shadow-lg"
                      style={{ backgroundColor: m.color, boxShadow: `0 0 16px ${m.color}` }}
                    />
                  </div>

                  {/* Content Card with Spotlight */}
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8">
                    <SpotlightCard
                      spotlightColor="rgba(6, 182, 212, 0.16)"
                      className="bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 p-6 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-white shadow"
                          style={{ backgroundColor: m.color }}
                        >
                          {m.year}
                        </span>
                        <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                          // {m.tag}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {m.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {m.desc}
                      </p>
                    </SpotlightCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Interactive Call-To-Action Strip */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            // ACCELERATE YOUR GROWTH
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Build Something Remarkable Together?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Whether you need a custom web application, point-of-sale GST software, or want to join our developer internship, we're ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md sm:max-w-none mx-auto">
            <Link href="/web-development">
              <Button size="lg" className="w-full sm:w-auto rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 shadow-xl shadow-cyan-500/25 h-12">
                Start a Project <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+918754020556">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-slate-700 bg-slate-900/60 text-white hover:bg-slate-800 font-bold px-8 h-12">
                <Phone className="mr-2 w-4 h-4 text-cyan-400" /> Call: 8754020556
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
