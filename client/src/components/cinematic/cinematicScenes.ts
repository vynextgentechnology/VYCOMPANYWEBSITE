import { 
  Cpu, 
  Code2, 
  Receipt, 
  GraduationCap, 
  Briefcase, 
  Radio, 
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";
import React from "react";
import { CinematicSceneConfig } from "./types";

export const CINEMATIC_SCENES: Record<string, CinematicSceneConfig> = {
  about: {
    id: "about",
    route: "/about",
    name: "About VY NextGen",
    badge: "AI COMMAND CENTER",
    badgeIcon: Cpu,
    badgeSystemCode: "SYS.ID // NCC-01 • HQ-KARUR",
    title: "Inside the Intelligence Center of",
    titleHighlight: "Next-Gen Software",
    titleAfter: "Engineering",
    description:
      "We orchestrate mission-critical software, scalable GST billing architectures, and enterprise cloud portals from our centralized technology operations in Karur, Tamil Nadu.",
    themeColor: "cyan",
    sceneTag: "COMMAND_CENTER_V2",
    alignment: "center",
    posterDesktop: "/cinematic/about-command-center.webp",
    posterMobile: "/cinematic/mobile/about-command-center.webp",
    videoDesktop: null, // Ready for video drop-in: "/cinematic/about-command-center.mp4",
    videoMobile: null,  // Ready for video drop-in: "/cinematic/mobile/about-command-center.mp4",
    ambientGlows: {
      primary: "rgba(6, 182, 212, 0.22)", // Cyan glow
      secondary: "rgba(37, 99, 235, 0.18)", // Deep blue
    },
    hudTelemetry: {
      nodeId: "NODE_ACC_ALPHA_01",
      protocol: "SECURE_FIBER_MESH_v4",
      sector: "SECTOR_07_CORE_INFRA",
      securityLevel: "LEVEL_4_OPERATIONAL",
      coordinates: "10.9601° N, 78.0766° E",
    },
    primaryCta: {
      label: "Explore Leadership & Vision",
      href: "#leadership",
    },
    secondaryCta: {
      label: "Our Journey & Milestones",
      href: "#milestones",
      variant: "outline",
    },
    stats: [
      { value: "50+", label: "Engineered Systems", sub: "Enterprise Deliveries" },
      { value: "99.9%", label: "Uptime SLA", sub: "High-Availability Arch" },
      { value: "3s", label: "POS Transaction Speed", sub: "Lightning GST Core" },
      { value: "100%", label: "Source Code Ownership", sub: "Client IP Guarantee" },
    ],
  },

  webDevelopment: {
    id: "web-development",
    route: "/web-development",
    name: "Web & Mobile Development",
    badge: "DIGITAL FUTURE CITY",
    badgeIcon: Code2,
    badgeSystemCode: "SECTOR // DFC-02 • HIGH_SCALE",
    title: "Software Architecture for the",
    titleHighlight: "Modern Connected",
    titleAfter: "Enterprise",
    description:
      "Engineered for sub-second page performance, flawless responsive layouts, and conversion-optimized architectures that power scaling brands across Tamil Nadu and beyond.",
    themeColor: "blue",
    sceneTag: "DIGITAL_CITY_GRID",
    alignment: "center",
    posterDesktop: "/cinematic/web-digital-city.webp",
    posterMobile: "/cinematic/mobile/web-digital-city.webp",
    videoDesktop: null,
    videoMobile: null,
    ambientGlows: {
      primary: "rgba(59, 130, 246, 0.25)", // Electric blue
      secondary: "rgba(6, 182, 212, 0.18)", // Cyan
    },
    hudTelemetry: {
      nodeId: "NODE_DFC_SCALE_02",
      protocol: "HTTP3_QUIC_EDGE_SYNC",
      sector: "METROPOLIS_DATA_FABRIC",
      securityLevel: "ZERO_TRUST_SSL_TLS1.3",
      coordinates: "KARUR_FIBER_GATEWAY // 10Gbps",
    },
    primaryCta: {
      label: "Submit Project Enquiry",
      href: "/enquiry",
    },
    secondaryCta: {
      label: "Instant WhatsApp Estimate",
      href: "https://wa.me/918072709943?text=Hi%20VY%20NextGen,%20I%20am%20interested%20in%20Web%20%26%20App%20Development.",
      isExternal: true,
      isWhatsApp: true,
      variant: "outline",
    },
    stats: [
      { value: "<1.0s", label: "Page Load Speed", sub: "Edge-Optimized CDN" },
      { value: "100%", label: "Mobile Responsive", sub: "360px to 4K Ultra HD" },
      { value: "6 Mo", label: "Free SLA Warranty", sub: "Dedicated Code Support" },
      { value: "Zero", label: "Cloud Downtime", sub: "Fault-Tolerant Clusters" },
    ],
  },

  billingSoftware: {
    id: "billing-software",
    route: "/billing-software",
    name: "Billing & GST Software",
    badge: "BUSINESS DATA CORE",
    badgeIcon: Receipt,
    badgeSystemCode: "CORE.ID // BDC-03 • FINTECH",
    title: "High-Speed Billing & Real-Time",
    titleHighlight: "Business Intelligence",
    titleAfter: "Core",
    description:
      "Process transactions in under 3 seconds, manage multi-store stock in real time, and generate 100% compliant GST invoices with thermal printer and WhatsApp integrations.",
    themeColor: "amber",
    sceneTag: "BUSINESS_CORE_ANALYTICS",
    alignment: "center",
    posterDesktop: "/cinematic/billing-business-core.webp",
    posterMobile: "/cinematic/mobile/billing-business-core.webp",
    videoDesktop: null,
    videoMobile: null,
    ambientGlows: {
      primary: "rgba(245, 158, 11, 0.22)", // Warm Amber
      secondary: "rgba(6, 182, 212, 0.16)", // Cyan contrast
    },
    hudTelemetry: {
      nodeId: "NODE_BDC_TXN_03",
      protocol: "REALTIME_INVENTORY_WEBSOCKET",
      sector: "FINANCIAL_DATA_STREAM",
      securityLevel: "AES_256_BANK_GRADE",
      coordinates: "LOCAL_OFFLINE_SYNC_ENGINE",
    },
    primaryCta: {
      label: "Book Free Live Software Demo",
      href: "/enquiry",
    },
    secondaryCta: {
      label: "Chat With Billing Specialist",
      href: "https://wa.me/918072709943?text=Hi%20VY%20NextGen,%20I%20would%20like%20a%20free%20demo%20of%20your%20Billing%20%26%20GST%20Software.",
      isExternal: true,
      isWhatsApp: true,
      variant: "outline",
    },
    stats: [
      { value: "3 Sec", label: "Barcode Invoicing", sub: "Ultra-Fast Checkout" },
      { value: "100%", label: "GST Compliant", sub: "GSTR-1 / GSTR-3B Ready" },
      { value: "Offline", label: "Works Without Net", sub: "Auto Cloud Sync" },
      { value: "WhatsApp", label: "PDF Bill Dispatch", sub: "Zero Paper Printing Cost" },
    ],
  },

  internship: {
    id: "internship",
    route: "/internship",
    name: "IT Internship & Training",
    badge: "FUTURE TECHNOLOGY LAB",
    badgeIcon: GraduationCap,
    badgeSystemCode: "LAB.ID // FTL-04 • INCUBATOR",
    title: "Learn, Build & Innovate Inside an",
    titleHighlight: "Active Engineering",
    titleAfter: "Laboratory",
    description:
      "Bridge collegiate theory with industrial-grade software engineering. Build production full-stack React and Node.js applications with direct 1-on-1 mentorship from executive software architects.",
    themeColor: "emerald",
    sceneTag: "INNOVATION_LAB_MATRIX",
    alignment: "center",
    posterDesktop: "/cinematic/internship-future-lab.webp",
    posterMobile: "/cinematic/mobile/internship-future-lab.webp",
    videoDesktop: null,
    videoMobile: null,
    ambientGlows: {
      primary: "rgba(16, 185, 129, 0.22)", // Vibrant Emerald
      secondary: "rgba(6, 182, 212, 0.18)", // Cyan
    },
    hudTelemetry: {
      nodeId: "NODE_FTL_ACADEMY_04",
      protocol: "LIVE_DEV_MENTORSHIP_STREAM",
      sector: "TALENT_INCUBATION_SECTOR",
      securityLevel: "ISO_9001_VERIFIED_TRAINING",
      coordinates: "ACTIVE_BATCH_COHORT_2026",
    },
    primaryCta: {
      label: "Apply for Next Cohort",
      href: "#apply-now",
    },
    secondaryCta: {
      label: "Official Google Form Registration",
      href: "https://forms.gle/skWDWMTWipZjRf8U6",
      isExternal: true,
      variant: "outline",
    },
    stats: [
      { value: "100+", label: "Engineers Mentored", sub: "Collegiate Graduates" },
      { value: "ISO", label: "Verified Credentials", sub: "Official Certificate" },
      { value: "1-on-1", label: "Founder Mentorship", sub: "Senior Architect Guidance" },
      { value: "Live", label: "Production Capstone", sub: "Real Commercial Code" },
    ],
  },

  careers: {
    id: "careers",
    route: "/careers",
    name: "Careers & Open Positions",
    badge: "TECH OPERATIONS CENTER",
    badgeIcon: Briefcase,
    badgeSystemCode: "OPS.ID // TOC-05 • TALENT_HUB",
    title: "Architect the Next Generation of",
    titleHighlight: "Enterprise Systems",
    titleAfter: "With Us",
    description:
      "Join an ambitious team of software engineers, UI/UX designers, and business strategists building foundational tech infrastructure from Karur with modern equipment and zero corporate bureaucracy.",
    themeColor: "violet",
    sceneTag: "OPERATIONS_CENTER_HUB",
    alignment: "center",
    posterDesktop: "/cinematic/careers-tech-center.webp",
    posterMobile: "/cinematic/mobile/careers-tech-center.webp",
    videoDesktop: null,
    videoMobile: null,
    ambientGlows: {
      primary: "rgba(139, 92, 246, 0.24)", // Violet
      secondary: "rgba(59, 130, 246, 0.18)", // Blue
    },
    hudTelemetry: {
      nodeId: "NODE_TOC_TALENT_05",
      protocol: "MERIT_ENGINEERING_RECRUITMENT",
      sector: "OPERATION_ROOM_SOUTH",
      securityLevel: "DIRECT_FOUNDER_ACCESS",
      coordinates: "KARUR_DEV_CAMPUS // ON-SITE & HYBRID",
    },
    primaryCta: {
      label: "View Open Vacancies",
      href: "#openings",
    },
    secondaryCta: {
      label: "Apply via Google Form",
      href: "https://forms.gle/37Y58m92rFvAhyBHA",
      isExternal: true,
      variant: "outline",
    },
    stats: [
      { value: "Freshers", label: "Welcome To Apply", sub: "Paid Traineeships" },
      { value: "Fast", label: "Merit Promotions", sub: "No Bureaucracy" },
      { value: "High-Spec", label: "Modern Hardware", sub: "Ergonomic Workstations" },
      { value: "Karur HQ", label: "Flexible Hybrid", sub: "Collaborative Culture" },
    ],
  },

  enquiry: {
    id: "enquiry",
    route: "/enquiry",
    name: "Contact & Project Intake",
    badge: "COMMUNICATION HUB",
    badgeIcon: Radio,
    badgeSystemCode: "RELAY.ID // CH-06 • DIRECT_LINK",
    title: "Connect Your Enterprise to the",
    titleHighlight: "Next Generation",
    titleAfter: "of Tech",
    description:
      "Initiate a project intake, request a live product demo, or discuss enterprise custom software. Our engineering leadership responds within 2 business hours.",
    themeColor: "cyan",
    sceneTag: "COMMUNICATION_RELAY",
    alignment: "center",
    posterDesktop: "/cinematic/contact-communication-hub.webp",
    posterMobile: "/cinematic/mobile/contact-communication-hub.webp",
    videoDesktop: null,
    videoMobile: null,
    ambientGlows: {
      primary: "rgba(6, 182, 212, 0.24)", // Cyan
      secondary: "rgba(37, 99, 235, 0.18)", // Indigo
    },
    hudTelemetry: {
      nodeId: "NODE_CH_INTAKE_06",
      protocol: "ENCRYPTED_DIRECT_DISPATCH",
      sector: "CENTRAL_COMMS_SWITCH",
      securityLevel: "HIGH_AVAILABILITY_RELAY",
      coordinates: "LATENCY: 12ms // BUFFER: OK",
    },
    primaryCta: {
      label: "Complete Intake Form",
      href: "#contact-form",
    },
    secondaryCta: {
      label: "Call Operations Lead",
      href: "tel:+918072709943",
      variant: "outline",
    },
    stats: [
      { value: "<2 Hours", label: "Response SLA", sub: "Dedicated Human Support" },
      { value: "100% Free", label: "Technical Consultation", sub: "Architecture Breakdown" },
      { value: "Direct", label: "Founder Access", sub: "Executive Attention" },
      { value: "Pan-India", label: "Delivery Reach", sub: "Remote & On-Site Deploy" },
    ],
  },
};

/**
 * Returns the cinematic scene configuration for a given pathname.
 * Handles aliases such as /contact -> enquiry, /jobs -> careers, etc.
 */
export function getCinematicSceneForPath(pathname: string): CinematicSceneConfig | null {
  const normalized = pathname.toLowerCase().replace(/\/$/, "");

  if (normalized === "/about") return CINEMATIC_SCENES.about;
  if (normalized === "/web-development") return CINEMATIC_SCENES.webDevelopment;
  if (normalized === "/billing-software") return CINEMATIC_SCENES.billingSoftware;
  if (normalized === "/internship") return CINEMATIC_SCENES.internship;
  if (normalized === "/careers" || normalized === "/jobs" || normalized === "/vacancies") return CINEMATIC_SCENES.careers;
  if (normalized === "/enquiry" || normalized === "/contact" || normalized === "/order") return CINEMATIC_SCENES.enquiry;

  return null;
}
