import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck, 
  Linkedin,
  Instagram,
  Facebook
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logoImg from "@assets/vy_nextgen_logo.webp";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & About Column */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="h-12 px-2.5 py-1 bg-[#041d57] rounded-xl border border-blue-900/50 flex items-center justify-center shadow-lg shadow-blue-950/40 group-hover:scale-105 transition-transform">
                <img
                  src={logoImg}
                  alt="VY NextGen Technologies Logo"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">
                  VY NextGen Technologies
                </span>
                <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                  Software & IT Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering enterprises, retailers, and startups with high-performance web applications, mobile apps, GST billing software, and developer mentorship.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/918754020556"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/vynextgentechnology?igsi=dnEycjhyMGIxcnU4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/people/Vynextgentechnology/61593831857829/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-500 hover:border-blue-600/40 hover:bg-blue-600/10 transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/40 text-blue-300 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Certified Software & IT Engineering Solutions</span>
            </div>
          </div>

          {/* Column 2: IT Solutions */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              IT Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/web-development" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Custom Web Development</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/web-development" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Mobile Apps (iOS & Android)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/billing-software" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Billing & GST Software</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">Popular</span>
                </Link>
              </li>
              <li>
                <Link href="/web-development" className="hover:text-cyan-400 transition-colors">
                  E-Commerce & Online Stores
                </Link>
              </li>
              <li>
                <Link href="/web-development" className="hover:text-cyan-400 transition-colors">
                  UI/UX & Product Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Academy */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Company & Academy
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  Executive Leadership Team
                </Link>
              </li>
              <li>
                <Link href="/internship" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Tech Internship Program</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Open</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Careers & Job Openings</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="/web-development" className="hover:text-cyan-400 transition-colors">
                  Development Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Headquarters
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Karur, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+918754020556" className="hover:text-white transition-colors">
                  +91 87540 20556
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:vynextgentechnology@gmail.com" className="hover:text-white transition-colors truncate">
                  vynextgentechnology@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-400 pt-1">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM (IST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} VY NextGen Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/careers" className="hover:text-white transition-colors">
              Careers
            </Link>
            <Link href="/enquiry" className="hover:text-white transition-colors">
              Project Enquiry
            </Link>
            <Link href="/billing-software" className="hover:text-white transition-colors">
              Billing Software
            </Link>
            <Link href="/internship" className="hover:text-white transition-colors">
              Tech Internship
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
