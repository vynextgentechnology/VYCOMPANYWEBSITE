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
  Receipt,
  ScanBarcode,
  TrendingUp,
  ShieldCheck,
  Printer,
  Smartphone,
  CheckCircle2,
  Store,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Clock,
  PhoneCall
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function BillingSoftware() {
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
        title: "Demo Request Received!",
        description: "Our billing specialist will contact you to schedule your free live demo.",
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
      websiteType: "Billing & GST Software",
      requiredPages: "Single Store / Standard POS",
      referenceWebsite: "",
      additionalRequirements: "",
    },
  });

  const onSubmit = (data: InsertWebsiteOrder) => {
    orderMutation.mutate(data);
  };

  const businessTypes = [
    { title: "Supermarket & Groceries", icon: "🛒", desc: "Fast barcode lookup, weight scale integration & loose item billing." },
    { title: "Retail & Apparel", icon: "👕", desc: "Size, color, batch variations with customized barcode tags." },
    { title: "Hardware & Electricals", icon: "🔧", desc: "Item serial numbers, warranty tracking, and wholesale invoicing." },
    { title: "Pharmacies & Medicals", icon: "💊", desc: "Expiry tracking, schedule H drug registers, and salt search." },
    { title: "Restaurants & Cafes", icon: "☕", desc: "KOT printing, table management, takeaway & delivery billing." },
    { title: "Wholesale & Distribution", icon: "📦", desc: "Credit limits, bulk discounting, and transport E-Way bills." },
  ];

  const features = [
    {
      icon: <Receipt className="w-6 h-6 text-blue-600" />,
      title: "100% GST & Tax Compliant",
      desc: "Instant CGST/SGST/IGST breakdown, GST filing reports (GSTR-1, GSTR-3B) with one-click Excel export."
    },
    {
      icon: <ScanBarcode className="w-6 h-6 text-indigo-600" />,
      title: "Fast Barcode & Touch POS",
      desc: "Generate bills in under 3 seconds using USB/wireless barcode scanners or intuitive touch screens."
    },
    {
      icon: <Printer className="w-6 h-6 text-emerald-600" />,
      title: "Universal Printer Support",
      desc: "Works with all thermal printers (2-inch / 3-inch, 58mm/80mm), laser printers, and continuous stationery."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      title: "Live Inventory & Low-Stock Alerts",
      desc: "Real-time stock deduction, low stock push alerts, reorder level forecasting, and stock audit tools."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-purple-600" />,
      title: "WhatsApp & SMS Invoicing",
      desc: "Save paper by automatically sending digital PDF bills directly to client WhatsApp and mobile numbers."
    },
    {
      icon: <Store className="w-6 h-6 text-rose-600" />,
      title: "Multi-Store Cloud Sync",
      desc: "Manage multiple retail branches from one central dashboard with inter-store stock transfers."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600/10">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-30" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Next-Gen Retail & Wholesale Billing
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 text-white">
                <span className="text-white">Modern Billing &</span>{" "}
                <span className="text-gradient-cyan">GST Software</span>{" "}
                <span className="text-white">For Growing Businesses</span>
              </h1>


              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Supercharge your store checkout with high-speed POS billing, automated GST invoicing, live inventory control, and customer WhatsApp receipts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#request-demo" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 min-h-[48px] bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
                    Request Free Demo <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
                <a
                  href="https://wa.me/918754020556?text=Hello%20VY%20NextGen%20Technology,%20I%20would%20like%20to%20see%20a%20demo%20of%20your%20Billing%20Software."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 min-h-[48px] border-emerald-500/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 font-bold">
                    <FaWhatsapp className="mr-2 w-5 h-5 text-emerald-400" /> WhatsApp Quick Demo
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Counters */}
      <section className="bg-white border-y border-slate-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-blue-600">&lt; 3 Sec</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Average Bill Checkout</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-slate-900">100%</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">GST Tax Compliance</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-slate-900">Offline</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Works Even Without Internet</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-blue-600">Free Setup</p>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">& Staff Training Included</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Tailored Solutions</span>
            <h2 className="text-3xl lg:text-4xl font-black mt-2 text-slate-900">Built for Every Retail & Wholesale Vertical</h2>
            <p className="text-slate-600 mt-3">From neighborhood supermarkets to large distribution warehouses, our billing software adapts to your exact business workflow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessTypes.map((biz, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-3xl mb-4 p-3 bg-blue-50 rounded-xl inline-block">{biz.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{biz.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{biz.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Powerful Capabilities</span>
            <h2 className="text-3xl lg:text-4xl font-black mt-2 text-slate-900">Everything You Need to Run Your Shop</h2>
            <p className="text-slate-600 mt-3">Packed with high-performance features designed to eliminate calculation mistakes and stop inventory leakages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 border border-slate-200">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Request / Order Form */}
      <section id="request-demo" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Get Started Today</span>
              <h2 className="text-3xl font-black mt-2 text-white">Request a Free Live Demo & Quotation</h2>
              <p className="text-slate-400 text-sm mt-2">
                Experience the software in action with your own store inventory. No commitment required.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Demo Request Submitted!</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                  Thank you! Our technical specialist will reach out to you within 2 hours to set up your free demo session.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="rounded-full text-slate-300 border-slate-700"
                >
                  Submit Another Inquiry
                </Button>
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
                          <FormLabel className="text-slate-300">Shop / Business Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Sri Murugan Supermarket"
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

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="business@example.com"
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
                      name="requiredPages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Business / Store Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "Supermarket / Grocery"}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                <SelectValue placeholder="Select store type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="Supermarket / Grocery">Supermarket / Grocery</SelectItem>
                              <SelectItem value="Textile & Garments">Textile & Garments</SelectItem>
                              <SelectItem value="Hardware & Electrical">Hardware & Electrical</SelectItem>
                              <SelectItem value="Medical & Pharmacy">Medical & Pharmacy</SelectItem>
                              <SelectItem value="Restaurant / Cafe">Restaurant / Cafe</SelectItem>
                              <SelectItem value="Wholesale Distributor">Wholesale Distributor</SelectItem>
                              <SelectItem value="Other Retail">Other Retail</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">City / District (Tamil Nadu / All India)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Karur, Trichy, Coimbatore, Chennai"
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
                        <FormLabel className="text-slate-300">Any Specific Requirements or Existing Hardware</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Do you already have barcode scanners, thermal printers, or need hardware recommendations?"
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
                      className="flex-1 h-12 min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/30"
                    >
                      {orderMutation.isPending ? "Submitting..." : "Schedule Free Live Demo"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <a
                      href="tel:+918754020556"
                      className="flex items-center justify-center gap-2 px-6 h-12 min-h-[48px] rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors text-sm font-semibold"
                    >
                      <PhoneCall className="w-4 h-4 text-cyan-400" />
                      <span>Call Us Directly</span>
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
