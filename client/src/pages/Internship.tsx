import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWebsiteOrderSchema, type InsertWebsiteOrder } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Code2,
  GitBranch,
  Calendar,
  CheckCircle2,
  Users,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Sparkles,
  HelpCircle,
  FileCheck
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Internship() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const applyMutation = useMutation({
    mutationFn: async (data: InsertWebsiteOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Application Received!",
        description: "Our academic counselor will contact you with batch onboarding details.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<InsertWebsiteOrder>({
    resolver: zodResolver(insertWebsiteOrderSchema),
    defaultValues: {
      businessName: "Student / Job Seeker",
      clientName: "",
      email: "",
      phone: "",
      websiteType: "Tech Internship Program",
      requiredPages: "Fullstack Web Development",
      referenceWebsite: "",
      additionalRequirements: "",
    },
  });

  const onSubmit = (data: InsertWebsiteOrder) => {
    applyMutation.mutate(data);
  };

  const curriculum = [
    {
      week: "Week 01",
      title: "Modern Web Foundations & UI Engineering",
      topics: [
        "Semantic HTML5 & Responsive CSS3 Architecture",
        "Modern Tailwind CSS & Utility-first Layouts",
        "JavaScript ES6+ (Async/Await, Promises, Closures, DOM)",
        "Git & GitHub Version Control Best Practices"
      ]
    },
    {
      week: "Week 02",
      title: "Frontend Development with React & TypeScript",
      topics: [
        "React Component LifeCycle, Props & State",
        "Hooks (useState, useEffect, useMemo, custom hooks)",
        "Client-side Routing & Navigation UX",
        "State Management & TanStack Query for Data Fetching"
      ]
    },
    {
      week: "Week 03",
      title: "Backend Engineering & API Architecture",
      topics: [
        "Node.js & Express.js RESTful API Design",
        "SQL Relational Databases & Schema Modeling (PostgreSQL)",
        "Authentication, Authorization & Security Best Practices",
        "Zod Data Validation & Error Handling Middleware"
      ]
    },
    {
      week: "Week 04",
      title: "Live Industry Capstone & Cloud Deployment",
      topics: [
        "Full-stack Application Architecture & Integration",
        "Cloud Hosting (Vercel, Render, AWS, Docker basics)",
        "Code Reviews, Quality Assurance & Performance Optimization",
        "Final Capstone Project Showcase & Certificate Awarding"
      ]
    },
  ];

  const perks = [
    {
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      title: "ISO-Verified Certificate",
      desc: "Receive an official, verifiable certificate of completion with project credits for your resume."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      title: "Live Real-World Capstone",
      desc: "Build a production-grade application to showcase on your GitHub and demonstrate to recruiters."
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      title: "1-on-1 Mentor Guidance",
      desc: "Get personalized debugging support and code reviews from practicing software engineers."
    },
    {
      icon: <FileCheck className="w-6 h-6 text-amber-500" />,
      title: "Letter of Recommendation",
      desc: "Top 10% performers receive a formal LOR from our CEO to accelerate career placements."
    },
  ];

  const faqs = [
    {
      q: "Who is eligible to join the internship?",
      a: "Any student (BE, B.Tech, BCA, MCA, BSc CS, Diploma) or recent graduate looking to build hands-on skills in software development. Beginners with basic programming knowledge are welcome."
    },
    {
      q: "How are the training sessions conducted?",
      a: "The program is 100% online with interactive live sessions, daily mentor check-ins, hands-on coding assignments, and doubt-clearing support via WhatsApp & Discord."
    },
    {
      q: "Will I get a certificate upon completion?",
      a: "Yes! Every participant who submits their assignments and capstone project receives an official Certificate of Completion and Project Completion Letter from VY NextGen Technology."
    },
    {
      q: "How can I enroll?",
      a: "Fill out the online application form below or register through our official Google Form. Our team will verify your details and share the batch onboarding guide."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-25" />
        <div className="absolute -top-32 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Admissions Open for Next Cohort
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 text-white">
                <span className="text-white">Launch Your Tech Career With Our</span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  1-Month IT Internship
                </span>
              </h1>


              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Gain real-world experience, build production full-stack apps, receive 1-on-1 industry mentorship, and earn recognized credentials.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 min-h-[48px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5">
                    Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <a
                  href="https://forms.gle/skWDWMTWipZjRf8U6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 min-h-[48px] border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800 font-bold">
                    Official Google Form <ExternalLink className="ml-2 w-4 h-4 text-emerald-400" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-white border-y border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <p className="text-3xl font-black text-emerald-600">1 Month</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Intensive Training</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">100%</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Online & Flexible</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">Live Project</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">GitHub Portfolio Included</p>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-600">Verified</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Completion Certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Why Choose Our Academy</span>
            <h2 className="text-3xl lg:text-4xl font-black mt-2 text-slate-900">Designed for Real-World Employability</h2>
            <p className="text-slate-600 mt-3">We bridge the gap between college theory and professional software engineering.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Week Roadmap */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Curriculum Roadmap</span>
            <h2 className="text-3xl lg:text-4xl font-black mt-2 text-slate-900">What You Will Master in 4 Weeks</h2>
            <p className="text-slate-600 mt-3">A practical, outcome-driven syllabus built around hands-on code development.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {curriculum.map((c, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-emerald-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs uppercase">
                      {c.week}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">{c.title}</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">5 Days • Hands-on Lab</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 pt-4">
                  {c.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                      <span className="text-sm text-slate-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-now" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Enrollment Form</span>
              <h2 className="text-3xl font-black mt-2 text-white">Apply for Upcoming Batch</h2>
              <p className="text-slate-400 text-sm mt-2">
                Seats are limited to maintain high mentor-to-student ratio. Submit your details below to reserve your slot.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                  Our academic coordinator will reach out via WhatsApp / phone with onboarding instructions and batch schedule.
                </p>
                <div className="pt-4">
                  <a
                    href="https://wa.me/918754020556?text=Hello%20VY%20NextGen%20Technology,%20I%20have%20submitted%20my%20Internship%20application."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full sm:w-auto min-h-[48px] rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                      <FaWhatsapp className="mr-2 w-5 h-5" /> Chat on WhatsApp For Fast Approval
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Your Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Anand Kumar"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">WhatsApp / Mobile Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 9876543210"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="student@gmail.com"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requiredPages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Internship Domain Track</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "Fullstack Web Development (MERN/React)"}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                <SelectValue placeholder="Select track" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="Fullstack Web Development (MERN/React)">Fullstack Web Development (React & Node.js)</SelectItem>
                              <SelectItem value="Frontend Engineering (React + Tailwind)">Frontend UI Engineering (React + Tailwind)</SelectItem>
                              <SelectItem value="Backend & Database Development">Backend & Database Development</SelectItem>
                              <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">College / University / Degree</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Anna University / B.E CSE 3rd Year"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Location / District</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Karur, Madurai, Coimbatore, Chennai"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={applyMutation.isPending}
                      className="flex-1 h-12 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-500/30"
                    >
                      {applyMutation.isPending ? "Submitting..." : "Submit Internship Application"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <a
                      href="https://forms.gle/skWDWMTWipZjRf8U6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 h-12 min-h-[48px] rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors text-sm font-semibold"
                    >
                      <span>Google Form Link</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Got Questions?</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
