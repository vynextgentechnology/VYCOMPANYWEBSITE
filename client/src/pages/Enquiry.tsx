import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  insertContactMessageSchema, 
  type InsertContactMessage,
  insertWebsiteOrderSchema, 
  type InsertWebsiteOrder 
} from "@shared/schema";
import { useContactMutation } from "@/hooks/use-contact";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Layers,
  Send,
  Linkedin,
  Instagram,
  Facebook,
  ChevronDown
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Enquiry() {
  const [showDetailedScope, setShowDetailedScope] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [lastOrderData, setLastOrderData] = useState<InsertWebsiteOrder | null>(null);
  const { toast } = useToast();

  // Primary Direct Inquiry Form Hook (Contact API)
  const contactMutation = useContactMutation();
  const contactForm = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onContactSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        contactForm.reset();
      },
    });
  };

  // Detailed Website Order Form Hook (Order API)
  const orderForm = useForm<InsertWebsiteOrder>({
    resolver: zodResolver(insertWebsiteOrderSchema),
    defaultValues: {
      businessName: "",
      clientName: "",
      email: "",
      phone: "",
      websiteType: "Corporate Business Website",
      requiredPages: "1 - 5 Pages",
      referenceWebsite: "",
      district: "",
      taluk: "",
      villageArea: "",
      additionalRequirements: "",
    },
  });

  const orderMutation = useMutation({
    mutationFn: async (data: InsertWebsiteOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json();
    },
    onSuccess: (_, variables) => {
      setOrderSubmitted(true);
      setLastOrderData(variables);
      toast({
        title: "Detailed Proposal Request Received",
        description: "Our engineering team has received your specifications and will respond within 2 hours.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Submission Error",
        description: err.message || "Failed to submit enquiry. Please call us or try again.",
        variant: "destructive",
      });
    },
  });

  function onOrderSubmit(data: InsertWebsiteOrder) {
    orderMutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600/20 selection:text-blue-300 overflow-x-hidden">
      <Navigation />

      {/* Hero Header */}
      <section className="relative pt-32 pb-8 lg:pt-36 lg:pb-12 bg-slate-950 text-white overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIRECT CLIENT INTAKE • RAPID CONSULTATION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              Contact & Project <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Enquiry</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Reach out for custom software inquiries, live demos, or technical consulting. We respond within 2 hours.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                2-Hour Quick Response
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                100% Free Consultation
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Custom Tailored Solutions
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Primary Dual Contact & Direct Inquiry Section */}
      <section id="contact-form" className="pb-16 pt-2 bg-slate-950 text-white relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-5">
              
              {/* Left Contact Details Sidebar */}
              <div className="lg:col-span-2 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
                <div className="space-y-6">
                  <div>
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Let's Connect</span>
                    <h2 className="text-2xl font-black text-white mt-1">Start Your Project</h2>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      Reach out for custom software inquiries, live demos, or technical consulting. We respond within 2 hours.
                    </p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Direct Call</p>
                        <a href="tel:+918754020556" className="font-bold text-white hover:text-cyan-300 transition-colors">
                          +91 87540 20556
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                        <FaWhatsapp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">WhatsApp Instant</p>
                        <a
                          href="https://wa.me/918754020556"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-emerald-400 hover:underline"
                        >
                          Chat: 8754020556
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Official Email</p>
                        <a href="mailto:vynextgentechnology@gmail.com" className="font-medium text-white hover:text-cyan-300 transition-colors break-all">
                          vynextgentechnology@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Office Location</p>
                        <p className="font-medium text-white">Karur, Tamil Nadu, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 mb-3">Connect on Social Channels</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://wa.me/918754020556" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <FaWhatsapp size={18} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href="https://www.instagram.com/vynextgentechnology?igsi=dnEycjhyMGIxcnU4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <Instagram size={18} />
                    </a>
                    <a href="https://www.facebook.com/people/Vynextgentechnology/61593831857829/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                      <Facebook size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Contact Form */}
              <div className="lg:col-span-3 p-8 sm:p-10 bg-slate-950">
                <h3 className="text-xl font-bold text-white mb-6">Send Us a Direct Inquiry</h3>
                
                <Form {...contactForm}>
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <FormField
                        control={contactForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300 text-xs uppercase font-bold">Your Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Ramesh Kumar"
                                {...field}
                                className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={contactForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300 text-xs uppercase font-bold">Mobile Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. +91 98765 43210"
                                {...field}
                                className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs uppercase font-bold">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              {...field}
                              className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-xs uppercase font-bold">Project Details or Inquiry</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about what you want to build (website, mobile app, billing software, or internship inquiry)..."
                              rows={4}
                              {...field}
                              className="bg-slate-900 border-slate-800 text-white focus:border-cyan-500 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="flex-1 h-12 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 cursor-pointer"
                      >
                        {contactMutation.isPending ? "Submitting Inquiry..." : "Submit Inquiry"}
                        {!contactMutation.isPending && <Send className="ml-2 w-4 h-4" />}
                      </Button>

                      <a
                        href="https://wa.me/918754020556"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-12 min-h-[48px] rounded-xl border-emerald-500/50 text-emerald-400 hover:bg-emerald-950/40 text-sm font-semibold cursor-pointer"
                        >
                          <FaWhatsapp className="mr-2 w-4 h-4" /> Quick WhatsApp
                        </Button>
                      </a>
                    </div>
                  </form>
                </Form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Optional Detailed Project Scoping Accordion / Section */}
      <section className="pb-20 bg-slate-950 text-white relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  ADVANCED SCOPING
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Need a Comprehensive Project Specification Sheet?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Specify page counts, regional location, domain, and detailed software features for formal RFP tenders.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDetailedScope(!showDetailedScope)}
                className="rounded-xl border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40 font-semibold text-xs shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <span>{showDetailedScope ? "Hide Scoping Form" : "Open Detailed Scoping Form"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDetailedScope ? "rotate-180" : ""}`} />
              </Button>
            </div>

            <AnimatePresence>
              {showDetailedScope && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-slate-800 overflow-hidden"
                >
                  {orderSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Detailed Scope Submitted!</h4>
                      <p className="text-slate-300 text-sm max-w-md mx-auto">
                        Thank you, <strong className="text-cyan-300">{lastOrderData?.clientName}</strong>. Our engineering leads will draft a comprehensive proposal and estimate within 2 hours.
                      </p>
                      <Button
                        onClick={() => {
                          setOrderSubmitted(false);
                          orderForm.reset();
                        }}
                        variant="outline"
                        className="rounded-full text-xs text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                      >
                        Submit Another Scope
                      </Button>
                    </div>
                  ) : (
                    <Form {...orderForm}>
                      <form onSubmit={orderForm.handleSubmit(onOrderSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <FormField
                            control={orderForm.control}
                            name="businessName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">Company / Business Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Acme Enterprises" {...field} className="bg-slate-900 border-slate-800 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={orderForm.control}
                            name="clientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">Contact Person Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Ramesh Kumar" {...field} className="bg-slate-900 border-slate-800 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <FormField
                            control={orderForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">Official Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="you@company.com" {...field} className="bg-slate-900 border-slate-800 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={orderForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">Direct Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+91 98765 43210" {...field} className="bg-slate-900 border-slate-800 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <FormField
                            control={orderForm.control}
                            name="websiteType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">System / Architecture Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                    <SelectItem value="Corporate Business Website">Corporate Business Website</SelectItem>
                                    <SelectItem value="E-Commerce & Online Store">E-Commerce & Online Store</SelectItem>
                                    <SelectItem value="Custom Web Application / Portal">Custom Web Application / Portal</SelectItem>
                                    <SelectItem value="Mobile Application (Android/iOS)">Mobile Application (Android/iOS)</SelectItem>
                                    <SelectItem value="GST Billing & POS Software">GST Billing & POS Software</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={orderForm.control}
                            name="requiredPages"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">Page Scope / Scale</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value || "1 - 5 Pages"}>
                                  <FormControl>
                                    <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                      <SelectValue placeholder="Select scope" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                    <SelectItem value="1 - 5 Pages">1 - 5 Pages (Starter Landing)</SelectItem>
                                    <SelectItem value="6 - 15 Pages">6 - 15 Pages (Growth Business)</SelectItem>
                                    <SelectItem value="15+ Pages">15+ Pages (Enterprise Portal)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                          <FormField
                            control={orderForm.control}
                            name="district"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">District</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Karur, Chennai" {...field} value={field.value || ""} className="bg-slate-900 border-slate-800 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={orderForm.control}
                            name="taluk"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">Taluk / Region</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Kulithalai" {...field} value={field.value || ""} className="bg-slate-900 border-slate-800 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={orderForm.control}
                            name="referenceWebsite"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-300 text-xs uppercase font-bold">Reference Link / Example</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. https://example.com" {...field} value={field.value || ""} className="bg-slate-900 border-slate-800 text-white" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={orderForm.control}
                          name="additionalRequirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-300 text-xs uppercase font-bold">Additional Technical Specifications</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Specify any custom database structures, payment gateway requirements, API connections, or design inspirations..."
                                  rows={3}
                                  {...field}
                                  value={field.value || ""}
                                  className="bg-slate-900 border-slate-800 text-white resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={orderMutation.isPending}
                          className="w-full sm:w-auto h-12 min-h-[48px] px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 cursor-pointer"
                        >
                          {orderMutation.isPending ? "Submitting Scope..." : "Confirm & Submit Project Scope"}
                          {!orderMutation.isPending && <ArrowRight className="ml-2 w-4 h-4" />}
                        </Button>
                      </form>
                    </Form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Support strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Direct Helpline</p>
                <a href="tel:+918754020556" className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                  +91 87540 20556
                </a>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Official Mail Desk</p>
                <a href="mailto:vynextgentechnology@gmail.com" className="text-xs font-bold text-white hover:text-cyan-400 transition-colors truncate block">
                  vynextgentechnology@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Engineering HQ</p>
                <p className="text-sm font-bold text-white">Karur, Tamil Nadu</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
