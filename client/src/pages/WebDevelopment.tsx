import { useState } from "react";
import { Link } from "wouter";
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
  Code2,
  Smartphone,
  Globe,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  PhoneCall,
  Clock
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WebDevelopment() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const orderMutation = useMutation({
    mutationFn: async (data: InsertWebsiteOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Project Request Submitted!",
        description: "Our engineering lead will review your requirements and contact you within 2 hours.",
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
      businessName: "",
      clientName: "",
      email: "",
      phone: "",
      websiteType: "Corporate Business Website",
      requiredPages: "5 - 10 Pages",
      referenceWebsite: "",
      additionalRequirements: "",
      district: "",
    },
  });

  const onSubmit = (data: InsertWebsiteOrder) => {
    orderMutation.mutate(data);
  };

  const steps = [
    { num: "01", title: "Discovery & Strategy", desc: "Understanding your brand vision, target audience, and functional specifications." },
    { num: "02", title: "UI/UX & Prototyping", desc: "Designing responsive wireframes and interactive Figma layouts for user approval." },
    { num: "03", title: "Full-Stack Development", desc: "Clean TypeScript code, responsive UI, database modeling, and API integrations." },
    { num: "04", title: "Testing & Quality Assurance", desc: "Cross-browser testing, mobile audit, SEO optimization, and load speed checks." },
    { num: "05", title: "Launch & 6-Month Support", desc: "Production cloud deployment, domain configuration, and ongoing SLA maintenance." },
  ];

  const packages = [
    {
      title: "Business Starter",
      badge: "Custom RFP Quote",
      ideal: "For local businesses, clinics, and professional portfolios",
      features: [
        "1 - 5 High-Converting Pages",
        "Mobile & Tablet Responsive",
        "WhatsApp Click-to-Chat",
        "Google Maps & Contact Form",
        "Basic On-Page SEO",
        "Free 1 Year SSL Certificate"
      ]
    },
    {
      title: "Corporate & Growth",
      badge: "Tailored Growth Scope",
      popular: true,
      ideal: "For growing companies, agencies & institutions",
      features: [
        "6 - 15 Custom Styled Pages",
        "Custom Dynamic CMS Admin",
        "Fast Page Speed (<1s load)",
        "Social Media & Analytics Sync",
        "Lead Capture Inquiries to Email",
        "6 Months Priority Maintenance"
      ]
    },
    {
      title: "E-Commerce & SaaS",
      badge: "Enterprise Scale",
      ideal: "For online brands, marketplaces & web apps",
      features: [
        "Unlimited Product Catalog",
        "Razorpay / UPI Payment Gateway",
        "Customer Login & Order History",
        "Automated WhatsApp / SMS Bills",
        "Inventory & Coupon Management",
        "Dedicated Engineering Support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600/10">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-25" />
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[130px]" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Full-Stack Web & Mobile Engineering
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 text-white">
              <span className="text-white">Build Your High-Performance</span>{" "}
              <span className="text-gradient-cyan">Website & App</span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              We design and develop custom websites, web portals, and mobile applications engineered for high conversion, lightning-fast speeds, and flawless mobile experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquiry">
                <Button size="lg" className="rounded-full px-8 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30">
                  Submit Project Enquiry <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://wa.me/918754020556?text=Hello%20VY%20NextGen%20Technology,%20I%20would%20like%20to%20order%20a%20website/app%20project."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 font-bold">
                  <FaWhatsapp className="mr-2 w-5 h-5 text-emerald-400" /> WhatsApp Quick Quote
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Package Tiers */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Standardized Packages</span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mt-2">Development Packages & Capabilities</h2>
            <p className="text-slate-600 mt-3">Choose a foundational package structure or customize your project scope in the form below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all duration-200 ${
                  pkg.popular
                    ? "bg-slate-900 text-white border-blue-500 shadow-2xl relative md:scale-105"
                    : "bg-slate-50 text-slate-900 border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold mb-1">{pkg.title}</h3>
                  <p className={`text-xs mb-3 ${pkg.popular ? "text-slate-400" : "text-slate-500"}`}>{pkg.ideal}</p>
                  <div className="mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      pkg.popular ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" : "bg-blue-100 text-blue-700"
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-200/40">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? "text-cyan-400" : "text-blue-600"}`} />
                        <span className={pkg.popular ? "text-slate-300" : "text-slate-700"}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <a href="#order-form">
                    <Button
                      className={`w-full rounded-xl font-bold h-11 ${
                        pkg.popular
                          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "bg-white border border-slate-300 text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      Select This Package
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5-Step Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Development Lifecycle</span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mt-2">How We Bring Your Idea To Life</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="font-mono text-2xl font-black text-blue-600/30 mb-2 block">{step.num}</span>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Enquiry & Consultation Desk */}
      <section id="order-form" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Direct Enquiry Desk</span>
              <h2 className="text-3xl font-black mt-2 text-white">Submit Your Project Enquiry</h2>
              <p className="text-slate-400 text-sm mt-2">
                Provide your requirements below. Our technical team will reach out with a detailed proposal and contract.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enquiry Successfully Submitted!</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                  Thank you! Our engineering lead will review your specifications and get in touch within 2 hours.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-full text-slate-300 border-slate-700"
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Company / Business Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. NextGen Logistics"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Contact Person Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="contact@company.com"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400"
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
                          <FormLabel className="text-slate-300">Mobile / WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 9876543210"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="websiteType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Project / Service Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "Corporate Business Website"}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                <SelectValue placeholder="Select service category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="Corporate Business Website">Corporate Business Website</SelectItem>
                              <SelectItem value="E-Commerce Online Store">E-Commerce Online Store</SelectItem>
                              <SelectItem value="Custom Web Application / SaaS">Custom Web Application / SaaS</SelectItem>
                              <SelectItem value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</SelectItem>
                              <SelectItem value="Landing Page & Lead Funnel">Landing Page & Lead Funnel</SelectItem>
                              <SelectItem value="Website Redesign & Maintenance">Website Redesign & Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requiredPages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Estimated Page Count / Modules</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "1 - 5 Pages"}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                <SelectValue placeholder="Select pages" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="Single Page Landing">Single Page Landing (1 Page)</SelectItem>
                              <SelectItem value="1 - 5 Pages">1 - 5 Pages (Standard)</SelectItem>
                              <SelectItem value="6 - 15 Pages">6 - 15 Pages (Growth)</SelectItem>
                              <SelectItem value="15+ Pages / Custom Portal">15+ Pages / Complex Portal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="referenceWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Reference Website / Competitor Link (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. https://apple.com or competitor.in"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400"
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
                          <FormLabel className="text-slate-300">Your City / Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Karur, Chennai, Bangalore"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Project Description & Special Features Needed</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your brand, required integrations (payment gateway, CRM, WhatsApp automation), target launch date..."
                            rows={3}
                            {...field}
                            value={field.value || ""}
                            className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={orderMutation.isPending}
                      className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/30"
                    >
                      {orderMutation.isPending ? "Submitting Enquiry..." : "Confirm & Submit Project Enquiry"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <a
                      href="tel:+918754020556"
                      className="flex items-center justify-center gap-2 px-6 h-12 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors text-sm font-semibold"
                    >
                      <PhoneCall className="w-4 h-4 text-cyan-400" />
                      <span>Call Engineering Team</span>
                    </a>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
