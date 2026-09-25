import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Users,
  Code2,
  Zap,
  ArrowRight,
  TrendingUp,
  Laptop,
  HeartHandshake,
  Send,
  FileCheck2,
  CalendarCheck,
  UserCheck,
  ExternalLink,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Official Google Form URL for VY NextGen Technologies Job Vacancies.
 */
export const GOOGLE_FORM_CAREERS_URL = "https://docs.google.com/forms/d/e/1FAIpQLScfJHdU2Ea2BZCnXHRXrR89hz8vs0h5HhGV_wforZRAbUSISg/viewform";

export interface JobListing {
  id: string;
  title: string;
  department: "Engineering & Technology" | "Design & Creative" | "Business & Sales" | "Freshers & Trainees";
  employmentType: "Full-Time" | "Part-Time" | "Internship to Full-Time";
  workMode: "On-Site (Karur)" | "Hybrid" | "Remote Friendly";
  experience: string;
  urgencyTag: "Urgent Hiring" | "Hot Opening" | "Featured" | "Freshers Welcome" | "Immediate Joiner";
  tagColor: string;
  location: string;
  postedDate: string;
  shortDescription: string;
  skills: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

const JOB_VACANCIES: JobListing[] = [
  {
    id: "fullstack-sr",
    title: "Senior Full-Stack Developer",
    department: "Engineering & Technology",
    employmentType: "Full-Time",
    workMode: "Hybrid",
    experience: "2 - 5 Years",
    urgencyTag: "Urgent Hiring",
    tagColor: "bg-rose-500/10 text-rose-600 border-rose-200",
    location: "Karur, Tamil Nadu (Hybrid Available)",
    postedDate: "Actively Hiring",
    shortDescription: "Lead end-to-end architecture and deployment of enterprise web applications, real-time dashboards, and secure backend microservices.",
    skills: ["React.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "RESTful APIs", "Git"],
    responsibilities: [
      "Architect and build high-performance, fault-tolerant web applications using modern TypeScript, React, and Node.js.",
      "Design normalized relational database schemas, migrations, and high-speed queries using PostgreSQL and Drizzle ORM.",
      "Collaborate directly with founders, clients, and junior developers to turn complex business requirements into elegant code.",
      "Implement robust automated testing, code reviews, and zero-downtime deployment pipelines.",
      "Mentor junior software engineers and tech interns in software craftsmanship."
    ],
    requirements: [
      "Proven 2+ years of hands-on software development experience with React and Node.js/TypeScript ecosystems.",
      "Proficient with relational databases (PostgreSQL/MySQL) and writing optimized SQL queries.",
      "Familiarity with cloud hosting, Linux environments, Nginx, and modern CI/CD.",
      "Strong problem-solving attitude and ability to thrive in an agile, fast-paced environment."
    ],
    benefits: [
      "Performance incentives and annual appraisals",
      "Flexible hybrid working options",
      "Direct mentorship and leadership exposure",
      "Career progression roadmap into Lead Architect",
      "Sponsored technical certifications and learning budget"
    ]
  },
  {
    id: "frontend-react",
    title: "Frontend Engineer (React & TypeScript)",
    department: "Engineering & Technology",
    employmentType: "Full-Time",
    workMode: "Hybrid",
    experience: "1 - 3 Years",
    urgencyTag: "Hot Opening",
    tagColor: "bg-blue-500/10 text-blue-600 border-blue-200",
    location: "Karur, Tamil Nadu / Hybrid",
    postedDate: "Actively Hiring",
    shortDescription: "Craft pixel-perfect, responsive web interfaces, interactive animations, and responsive web portals with React and Tailwind.",
    skills: ["React 18+", "TypeScript", "Tailwind CSS", "Framer Motion", "TanStack Query", "Radix UI", "Vite"],
    responsibilities: [
      "Translate Figma designs and UX flows into blazing-fast, accessible, and responsive web pages.",
      "Manage client state, caching, and server state synchronisation with TanStack React Query.",
      "Implement micro-interactions and smooth scroll animations using Framer Motion.",
      "Ensure web accessibility (a11y), cross-browser compatibility, and SEO performance."
    ],
    requirements: [
      "1+ years of experience with React, TypeScript, and modern CSS/Tailwind.",
      "Deep understanding of React Hooks, component lifecycle, and virtual DOM.",
      "Keen visual eye for modern typography, layouts, and UX details.",
      "Familiarity with Git, GitHub, and pull-request collaboration."
    ],
    benefits: [
      "Work with cutting-edge UI tech stack",
      "Ergonomic developer workstations and dual displays",
      "Fast-track promotion path to Lead Frontend Engineer",
      "Performance incentives on timely client deliveries"
    ]
  },
  {
    id: "billing-software-dev",
    title: "Billing Software & POS Systems Specialist",
    department: "Engineering & Technology",
    employmentType: "Full-Time",
    workMode: "On-Site (Karur)",
    experience: "1 - 4 Years",
    urgencyTag: "Featured",
    tagColor: "bg-amber-500/10 text-amber-600 border-amber-200",
    location: "Karur, Tamil Nadu",
    postedDate: "Actively Hiring",
    shortDescription: "Build, maintain, and roll out VY NextGen's proprietary Billing, GST invoicing, barcode generator, and inventory engines.",
    skills: ["Desktop / Web App Dev", "SQL / SQLite", "GST Computation Logic", "Thermal Printing SDKs", "Barcode Scanners", "Inventory Logic"],
    responsibilities: [
      "Develop and optimize POS billing modules for supermarkets, textile stores, restaurants, and wholesale traders.",
      "Integrate thermal receipt printers, barcode scanners, and weighing scale serial ports.",
      "Implement compliant GST tax rate calculation engines, HSN code lookups, and audit report generation.",
      "Conduct customer onboarding, local database backups, and client-side patch deployments."
    ],
    requirements: [
      "Experience developing billing, inventory, or ERP software solutions.",
      "Strong command of database concepts, transactional integrity, and data recovery.",
      "Comfortable with hardware peripheral communication (USB, Bluetooth, COM ports).",
      "Willingness to interact with regional business clients in Tamil Nadu."
    ],
    benefits: [
      "Incentives on proprietary software deployments",
      "Client visit allowances and travel perks",
      "High job stability in high-demand enterprise retail software"
    ]
  },
  {
    id: "uiux-designer",
    title: "UI/UX & Product Designer",
    department: "Design & Creative",
    employmentType: "Full-Time",
    workMode: "Hybrid",
    experience: "1 - 3 Years",
    urgencyTag: "Hot Opening",
    tagColor: "bg-purple-500/10 text-purple-600 border-purple-200",
    location: "Karur, Tamil Nadu / Hybrid",
    postedDate: "Actively Hiring",
    shortDescription: "Design intuitive user journeys, wireframes, modern mobile application mockups, and cohesive brand design systems.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing", "Responsive UI", "Brand Identity"],
    responsibilities: [
      "Create high-fidelity wireframes, interactive prototypes, and scalable design systems in Figma.",
      "Conduct user workflow research and competitive UI benchmarking for client websites and SaaS tools.",
      "Collaborate closely with frontend engineers during sprint design-handoffs.",
      "Design striking branding assets, banners, and digital collateral for VY NextGen."
    ],
    requirements: [
      "Portfolio showcasing end-to-end web and mobile app design case studies.",
      "Strong understanding of typography, contrast ratios, spacing grids, and component variants in Figma.",
      "Empathy for real-world user workflows and commercial enterprise software usability."
    ],
    benefits: [
      "Creative freedom to define product design standards",
      "Paid Figma Professional licensing",
      "Exposure to a diverse spectrum of industry clients"
    ]
  },
  {
    id: "junior-software-trainee",
    title: "Junior Software Trainee / Associate Developer",
    department: "Freshers & Trainees",
    employmentType: "Full-Time",
    workMode: "On-Site (Karur)",
    experience: "Freshers / 0 - 1 Year",
    urgencyTag: "Freshers Welcome",
    tagColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    location: "Karur, Tamil Nadu",
    postedDate: "Actively Hiring",
    shortDescription: "An exceptional career launchpad for recent graduates and passionate coders wanting direct project mentorship under senior architects.",
    skills: ["JavaScript", "HTML5 & CSS3", "React Basics", "Git & GitHub", "Problem Solving", "Curiosity to Learn"],
    responsibilities: [
      "Complete hands-on development modules on React, TypeScript, and modern backend APIs.",
      "Assist senior engineers by creating reusable components, fixing UI bugs, and executing test cases.",
      "Write clean, commented, and readable code according to company standards.",
      "Participate in daily engineering standups and sprint planning sessions."
    ],
    requirements: [
      "Degree in B.E/B.Tech (CSE, IT, ECE), MCA, B.Sc Computer Science or self-taught coding enthusiasts.",
      "Foundational grasp of HTML, CSS, and modern JavaScript.",
      "Positive attitude, hunger to build real-world software, and strong willingness to receive mentorship."
    ],
    benefits: [
      "Comprehensive 3-month structured onboarding and mentorship",
      "Immediate absorption into live enterprise client projects",
      "Certificate of Engineering Traineeship with full-time confirmation"
    ]
  },
  {
    id: "business-dev-sales",
    title: "Business Development & Client Relations Executive",
    department: "Business & Sales",
    employmentType: "Full-Time",
    workMode: "On-Site (Karur)",
    experience: "1 - 3 Years",
    urgencyTag: "Immediate Joiner",
    tagColor: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    location: "Karur & Central Tamil Nadu",
    postedDate: "Actively Hiring",
    shortDescription: "Drive commercial client acquisition, pitch website development and billing software solutions to regional businesses and enterprises.",
    skills: ["Client Consultation", "Software Demos", "Sales Negotiation", "Lead Generation", "Tamil & English Fluency", "CRM"],
    responsibilities: [
      "Identify prospective business clients (retailers, manufacturers, educational institutions, service providers).",
      "Conduct in-person and online demonstrations of VY NextGen billing software and web services.",
      "Draft commercial quotes, follow up with leads, and close project agreements.",
      "Cultivate enduring relationships with existing corporate accounts for recurring engagements."
    ],
    requirements: [
      "Excellent communication and presentation abilities in Tamil and English.",
      "Prior experience in IT sales, software consulting, or B2B business development is an added advantage.",
      "Goal-driven mindset with enthusiasm for client delight."
    ],
    benefits: [
      "High uncapped monthly sales commissions and bonuses",
      "Fuel allowance and official mobile conveyance expenses",
      "Rapid leadership elevation into Regional Sales Manager"
    ]
  },
  {
    id: "qa-test-engineer",
    title: "QA Automation & Software Test Engineer",
    department: "Engineering & Technology",
    employmentType: "Full-Time",
    workMode: "Hybrid",
    experience: "1 - 3 Years",
    urgencyTag: "Hot Opening",
    tagColor: "bg-teal-500/10 text-teal-600 border-teal-200",
    location: "Karur, Tamil Nadu / Hybrid",
    postedDate: "Actively Hiring",
    shortDescription: "Ensure bulletproof stability, zero regressions, and high security for client web portals and financial billing engines.",
    skills: ["Manual Testing", "API Testing (Postman)", "Playwright / Cypress", "Bug Tracking", "Cross-Browser Testing", "SQL"],
    responsibilities: [
      "Formulate comprehensive test plans, edge-case scenarios, and test data for billing and web applications.",
      "Perform end-to-end manual and automated UI testing, load testing, and security sanity checks.",
      "Execute REST API verification using Postman and report detailed bug reports with reproducible steps.",
      "Validate bug fixes and sign off on production releases."
    ],
    requirements: [
      "1+ years of experience in manual or automated web application testing.",
      "Good understanding of SDLC, STLC, and Defect Lifecycle.",
      "Familiarity with web dev tools, console logs, network inspection, and database queries."
    ],
    benefits: [
      "Work across diverse fin-tech and enterprise software domains",
      "Access to latest automated testing suites and devices",
      "Continuous learning and quality governance exposure"
    ]
  }
];

const PERKS_LIST = [
  {
    icon: <Code2 className="w-6 h-6 text-blue-500" />,
    title: "Cutting-Edge Tech Stack",
    desc: "Build with React 19, TypeScript, Node.js, PostgreSQL, Tailwind CSS, and AI-powered engineering tools."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
    title: "Rapid Career Acceleration",
    desc: "Fast-track promotions based on merit and real output, not corporate bureaucracy or years of waiting."
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-500" />,
    title: "Direct Founder Mentorship",
    desc: "Learn directly from our founders, CTO, and executive leadership who actively code and design beside you."
  },
  {
    icon: <Laptop className="w-6 h-6 text-cyan-500" />,
    title: "Modern Developer Workspaces",
    desc: "High-spec machines, ergonomic setups, high-speed fiber internet, and collaborative work culture."
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    title: "Performance Bonuses",
    desc: "Quarterly performance incentives, festival bonuses, and project milestone celebration rewards."
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-rose-500" />,
    title: "Work-Life Harmony",
    desc: "Respectful work hours, generous paid leaves, team outings, and supportive peer community in Karur."
  }
];

const HIRING_PROCESS = [
  {
    step: "01",
    title: "Submit Google Form",
    desc: "Complete our quick 2-minute official Google Form with your details, skills, and resume link.",
    icon: <Send className="w-5 h-5 text-blue-500" />
  },
  {
    step: "02",
    title: "Skill Conversation",
    desc: "A relaxed 30-minute introductory phone/video conversation to discuss your background and technical passion.",
    icon: <CalendarCheck className="w-5 h-5 text-emerald-500" />
  },
  {
    step: "03",
    title: "Practical Evaluation",
    desc: "A short, real-world coding exercise or design challenge tailored to your actual day-to-day role.",
    icon: <FileCheck2 className="w-5 h-5 text-indigo-500" />
  },
  {
    step: "04",
    title: "Offer & Welcome",
    desc: "Direct conversation with our leadership team, transparent role discussion, and warm onboarding welcome!",
    icon: <UserCheck className="w-5 h-5 text-amber-500" />
  }
];

const FAQS = [
  {
    q: "How do I apply for a vacancy at VY NextGen Technologies?",
    a: "We accept applications exclusively through our official Google Form. Simply click 'Apply via Google Form' on any role or in the hero banner, fill out your details in 2 minutes, and our HR team will review your application."
  },
  {
    q: "Can freshers apply for engineering roles at VY NextGen?",
    a: "Absolutely! We actively hire ambitious freshers for our Junior Software Trainee and Associate Developer roles. If you have a solid understanding of fundamental programming, strong curiosity, and a willingness to learn, we would love to mentor you."
  },
  {
    q: "Where is the office located and are remote options available?",
    a: "Our headquarters and development center are situated in Karur, Tamil Nadu. We offer flexible hybrid schedules for experienced developers and designers, with on-site collaboration for trainees and billing specialists."
  },
  {
    q: "How soon can I expect a response after submitting my application?",
    a: "Our recruitment desk reviews every Google Form application within 24 to 48 hours. If your profile matches an open vacancy, our HR coordinator will contact you via WhatsApp or phone call."
  },
  {
    q: "What if there is no opening matching my exact profile right now?",
    a: "You can still submit your application! In the Google Form, select 'General Application / Other Openings', tell us what you do best, and our talent team will reach out when a suitable vacancy opens."
  }
];

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>("All");
  const [activeJobDetails, setActiveJobDetails] = useState<JobListing | null>(null);

  // Filtered Job listings based on search and category selections
  const filteredJobs = useMemo(() => {
    return JOB_VACANCIES.filter((job) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === "All" || job.department === selectedDept;

      const matchesMode =
        selectedWorkMode === "All" ||
        (selectedWorkMode === "On-Site" && job.workMode.includes("On-Site")) ||
        (selectedWorkMode === "Hybrid" && job.workMode.includes("Hybrid")) ||
        (selectedWorkMode === "Remote" && job.workMode.includes("Remote"));

      return matchesSearch && matchesDept && matchesMode;
    });
  }, [searchQuery, selectedDept, selectedWorkMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Main Navigation */}
      <Navigation />

      {/* ========================================================================= */}
      {/* HERO SECTION (Starting Itself with Single Google Form) */}
      {/* ========================================================================= */}
      <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-slate-950 via-[#041d57] to-slate-950 text-white overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Subtle grid texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>We're Hiring • Current Job Vacancies & Careers</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]"
            >
              Build the Future of Software with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                VY NextGen Technologies
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Join an energetic team of software architects, creative designers, and tech leaders in Karur, Tamil Nadu. Explore the open roles below and apply through our official Google Form.
            </motion.p>

            {/* Starting Google Form CTA (The Only One) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-4 flex flex-col items-center justify-center space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <a
                  href={GOOGLE_FORM_CAREERS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    className="w-full sm:w-auto min-h-[48px] rounded-full px-8 h-13 py-3.5 text-base font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 hover:from-blue-600 hover:via-cyan-600 hover:to-indigo-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-105"
                  >
                    <span>Apply via Official Google Form</span>
                    <ExternalLink className="w-4 h-4 ml-2.5" />
                  </Button>
                </a>

                <a href="#vacancies" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto min-h-[48px] rounded-full px-7 h-13 py-3.5 text-base font-semibold border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all"
                  >
                    <span>View Available Jobs Below</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs text-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Single official application form for all vacancies — select your role inside the form.</span>
              </div>
            </motion.div>

            {/* Highlights Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80"
            >
              <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-2xl sm:text-3xl font-black text-white">7+</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Open Positions</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-2xl sm:text-3xl font-black text-cyan-400">100%</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Mentorship & Growth</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">Karur & Hybrid</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Flexible Work Modes</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-2xl sm:text-3xl font-black text-indigo-400">Quick Apply</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Direct Google Form</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* WHY JOIN VY NEXTGEN / PERKS & CULTURE */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Why VY NextGen
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Where Your Engineering Talents Flourish
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We empower ambitious software engineers, designers, and innovators to solve high-impact problems with modern tools and zero red tape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PERKS_LIST.map((perk, idx) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-200 mb-5">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ACTIVE JOB VACANCIES SECTION */}
      {/* ========================================================================= */}
      <section id="vacancies" className="py-20 lg:py-28 bg-slate-50 relative">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              Active Vacancies
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What Jobs Are Available
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore our current open positions across Engineering, Design, POS & Billing, and Sales. To apply, submit your profile via the official Google Form at the top.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 mb-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              
              {/* Keyword Search */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search by role title, skill (e.g. React, GST, Figma)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-slate-50/70 border-slate-200 focus:bg-white text-sm rounded-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Department Selector */}
              <div className="md:col-span-3">
                <Select value={selectedDept} onValueChange={setSelectedDept}>
                  <SelectTrigger className="h-11 bg-slate-50/70 border-slate-200 text-sm rounded-xl">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Departments</SelectItem>
                    <SelectItem value="Engineering & Technology">Engineering & Tech</SelectItem>
                    <SelectItem value="Design & Creative">Design & Creative</SelectItem>
                    <SelectItem value="Business & Sales">Business & Sales</SelectItem>
                    <SelectItem value="Freshers & Trainees">Freshers & Trainees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Work Mode Selector */}
              <div className="md:col-span-3">
                <Select value={selectedWorkMode} onValueChange={setSelectedWorkMode}>
                  <SelectTrigger className="h-11 bg-slate-50/70 border-slate-200 text-sm rounded-xl">
                    <SelectValue placeholder="Work Arrangement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Work Modes</SelectItem>
                    <SelectItem value="On-Site">On-Site (Karur)</SelectItem>
                    <SelectItem value="Hybrid">Hybrid Mode</SelectItem>
                    <SelectItem value="Remote">Remote Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Filter Tags & Results Counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-slate-600 mr-1">Quick Filters:</span>
                {["All", "Engineering & Technology", "Design & Creative", "Freshers & Trainees"].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedDept === dept
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {dept === "Engineering & Technology" ? "Engineering" : dept === "Freshers & Trainees" ? "Freshers" : dept}
                  </button>
                ))}
              </div>

              <div className="font-semibold text-slate-700">
                Showing <span className="text-blue-600 font-bold">{filteredJobs.length}</span> active vacancies
              </div>
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="max-w-5xl mx-auto space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No vacancies match your current filters</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try adjusting your search terms or department filter, or apply via Google Form so we have your resume on file.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDept("All");
                      setSelectedWorkMode("All");
                    }}
                    className="rounded-xl text-xs font-bold"
                  >
                    Reset All Filters
                  </Button>
                  <a href="#top">
                    <Button className="rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                      <span>Apply via Top Google Form</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 p-6 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    
                    {/* Left: Job Meta & Details */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${job.tagColor}`}>
                          {job.urgencyTag}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {job.department}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {job.employmentType}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                          {job.shortDescription}
                        </p>
                      </div>

                      {/* Job Metadata Pills (Location, Experience & Work Mode) */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 pt-1">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>Exp: {job.experience}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{job.workMode}</span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        {job.skills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 5 && (
                          <span className="text-[11px] font-medium text-blue-600">
                            +{job.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: View Role Details Action */}
                    <div className="flex items-center shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <Button
                        variant="outline"
                        onClick={() => setActiveJobDetails(job)}
                        className="w-full sm:w-auto min-h-[48px] rounded-xl h-11 px-5 text-xs font-bold border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                      >
                        <span>View Role Details</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </div>

                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Bottom Banner */}
          <div className="max-w-5xl mx-auto mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#041d57] to-blue-900 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Talent Network
                </span>
                <h3 className="text-2xl font-bold">
                  Don't see the exact title you're seeking?
                </h3>
                <p className="text-sm text-slate-300 max-w-xl">
                  We are always seeking exceptional talent in AI engineering, mobile development, sales, and software design. Complete our official Google Form and select 'General Application'.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
                <a href="#top" className="w-full sm:w-auto">
                  <Button
                    className="w-full sm:w-auto min-h-[48px] rounded-full px-7 h-11 text-sm font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
                  >
                    <span>Apply via Top Google Form</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a
                  href="https://wa.me/918754020556?text=Hi%20VY%20NextGen%20HR%2C%20I%20am%20interested%20in%20career%20opportunities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 h-11 min-h-[48px] rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp HR</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* HIRING PROCESS PIPELINE */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Smooth & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Step Hiring Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We respect your time. Our hiring steps are designed to be clear, prompt, and conversational.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {HIRING_PROCESS.map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              Questions & Answers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Answers to common queries regarding joining VY NextGen Technologies.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 last:border-0 pb-2">
                  <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-blue-600 hover:no-underline text-sm sm:text-base py-3">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1 pb-3">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* JOB DETAILS MODAL */}
      {/* ========================================================================= */}
      <Dialog open={!!activeJobDetails} onOpenChange={(open) => !open && setActiveJobDetails(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
          {activeJobDetails && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${activeJobDetails.tagColor}`}>
                    {activeJobDetails.urgencyTag}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {activeJobDetails.department}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {activeJobDetails.employmentType}
                  </span>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-black text-slate-900">
                  {activeJobDetails.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-600 pt-1">
                  {activeJobDetails.shortDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Work Arrangement</span>
                  <span className="font-bold text-slate-800">{activeJobDetails.workMode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Experience Needed</span>
                  <span className="font-bold text-slate-800">{activeJobDetails.experience}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Job Location</span>
                  <span className="font-bold text-blue-600">{activeJobDetails.location}</span>
                </div>
              </div>

              {/* Key Responsibilities */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {activeJobDetails.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements & Qualifications */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Candidate Requirements
                </h4>
                <ul className="space-y-2">
                  {activeJobDetails.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills Badges */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Required Competencies & Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeJobDetails.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Role Benefits */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Benefits & Perks
                </h4>
                <ul className="space-y-2">
                  {activeJobDetails.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  <span>To apply, use the official Google Form at the top • Questions? Call HR: </span>
                  <a href="tel:+918754020556" className="font-bold text-blue-600 hover:underline">
                    +91 87540 20556
                  </a>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setActiveJobDetails(null)}
                    className="w-full sm:w-auto min-h-[48px] rounded-xl text-xs font-bold px-6"
                  >
                    Close
                  </Button>
                </div>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
