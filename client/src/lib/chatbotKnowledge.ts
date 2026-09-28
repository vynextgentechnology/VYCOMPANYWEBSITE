import founderPhoto from "@assets/valiullah_founder_chairman.webp";
import narendraPhoto from "@assets/narendra_prasath_ceo.webp";
import yuvanPhoto from "@assets/yuvan_shankar_raja_co_founder.webp";
import santhoshPhoto from "@assets/santhosh_managing_director.webp";
import yeswanthPhoto from "@assets/yeswanth_director.webp";
import sriPrajithPhoto from "@assets/sri_prajith_cto_cfo.webp";

export interface ChatAction {
  label: string;
  path?: string;
  externalUrl?: string;
  actionType?: "navigate" | "external" | "openForm" | "quickQuery";
  queryText?: string;
}

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  badge: string;
  department: string;
  photo: string;
  summary: string;
  focus: string[];
}

export interface BotResponse {
  text: string;
  actions?: ChatAction[];
  showLeadForm?: boolean;
  leaders?: LeaderProfile[];
}

export interface QuickSuggestion {
  id: string;
  label: string;
  iconName: string;
  query: string;
}

export const COMPANY_LEADERS: Record<string, LeaderProfile> = {
  ceo: {
    id: "ceo",
    name: "Mr. Narendhra Prashath",
    role: "Chief Executive Officer (CEO)",
    badge: "CEO",
    department: "Corporate Leadership",
    photo: narendraPhoto,
    summary: "Directs corporate strategy, client acquisition, enterprise technology consulting, and digital transformation.",
    focus: ["Corporate Strategy", "Enterprise Tech", "Client Acquisition"],
  },
  founder: {
    id: "founder",
    name: "Mr. Valiullah",
    role: "Founder & Executive Chairman",
    badge: "Founder & Chair",
    department: "Founding Governance",
    photo: founderPhoto,
    summary: "Visionary founder governing corporate mission, core software architectures, POS engine R&D, and developer incubation.",
    focus: ["System Architecture", "POS Engine R&D", "Tech Incubation"],
  },
  coFounder: {
    id: "co-founder",
    name: "Mr. Yuvan Shankar Raja",
    role: "Co-Founder",
    badge: "Co-Founder",
    department: "Founding Board",
    photo: yuvanPhoto,
    summary: "Co-Founder driving business architecture, financial technology innovation, and strategic industry alliances.",
    focus: ["Fintech Systems", "Strategic Scale", "Commercial Alliances"],
  },
  cto: {
    id: "cto",
    name: "Mr. Sri Prajith",
    role: "Chief Technology & Chief Financial Officer (CTO / CFO)",
    badge: "CTO / CFO",
    department: "Executive Tech & Finance",
    photo: sriPrajithPhoto,
    summary: "Commands dual executive portfolios across technical cloud architecture, DevSecOps, fiscal governance, and economic performance.",
    focus: ["Cloud DevSecOps", "Fiscal Governance", "99.9% SLAs"],
  },
  md: {
    id: "md",
    name: "Mr. Santhosh",
    role: "Managing Director",
    badge: "Managing Director",
    department: "Executive Management",
    photo: santhoshPhoto,
    summary: "Managing Director steering technical operations, agile engineering delivery standards, and core software solutions.",
    focus: ["DevOps Automation", "Agile Sprints", "Code Quality Rigor"],
  },
  director: {
    id: "director",
    name: "Mr. Yeswanth",
    role: "Director",
    badge: "Director",
    department: "Corporate Strategy",
    photo: yeswanthPhoto,
    summary: "Director spearheading regional partnerships, client retention, and market expansion across Tamil Nadu and pan-India.",
    focus: ["Market Expansion", "Key Partnerships", "Client Retention"],
  },
};

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: "web-dev",
    label: "🌐 Web Development",
    iconName: "Globe",
    query: "Tell me about your Web Development services and delivery timeline",
  },
  {
    id: "billing",
    label: "🧾 Billing & POS Demo",
    iconName: "Receipt",
    query: "Tell me about your retail POS and billing software features",
  },
  {
    id: "ceo",
    label: "👔 Who is Company CEO?",
    iconName: "User",
    query: "Who is the company CEO?",
  },
  {
    id: "pricing",
    label: "💰 Get Price Estimate",
    iconName: "DollarSign",
    query: "How much does a website or POS software cost? I need an estimate",
  },
  {
    id: "human",
    label: "📞 Talk to Human Lead",
    iconName: "Phone",
    query: "Can I speak directly with someone from your team right now?",
  },
  {
    id: "careers",
    label: "💼 Careers & Jobs",
    iconName: "Briefcase",
    query: "What job openings are available at VY NextGen Technologies?",
  },
  {
    id: "internship",
    label: "🎓 Internship Program",
    iconName: "GraduationCap",
    query: "How can I apply for the software engineering internship program?",
  },
];

/**
 * Returns a warm, human-like greeting based on current time of day
 */
export function getFriendlyGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 17) return "Good afternoon! 🌤️";
  return "Good evening! 🌙";
}

export function getInitialWelcomeMessage(): BotResponse {
  const greeting = getFriendlyGreeting();
  return {
    text: `👋 **${greeting} Welcome to VY NextGen Technologies!**

I'm **VY Assistant**, your dedicated tech consultant. Whether you're looking to build a high-performance website, modernize your retail store with fast POS billing, or speak with our leadership team, I'm here to help you every step of the way! 😊

**Here are some popular topics to explore:**
• 👔 **"Who is company CEO?"** or meet our executive founders
• 🌐 **Custom Web & Mobile Development** (React, Next.js, 3–7 day delivery)
• 🧾 **GST Billing & POS Solutions** (Offline-first, thermal printer & barcode support)
• 💰 **Instant Project Estimates & Free Consultations**

Feel free to click any suggestion below or ask me anything in your own words!`,
    actions: [
      { label: "👔 Meet the CEO", queryText: "Who is the company CEO?", actionType: "quickQuery" },
      { label: "🌐 Web Development", path: "/web-development", actionType: "navigate" },
      { label: "🧾 Billing Software Demo", path: "/billing-software", actionType: "navigate" },
      { label: "💰 Request Price Estimate", path: "/enquiry", actionType: "navigate" },
      { label: "💬 Chat on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi%20VY%20NextGen%20Technology,%20I%20am%20chatting%20on%20your%20website%20and%20would%20love%20some%20information.", actionType: "external" },
    ],
  };
}

interface ConversationContext {
  lastTopic?: "web" | "billing" | "ceo" | "founder" | "internship" | "careers" | "pricing" | "contact";
  userName?: string;
}

/**
 * Helper to analyze previous conversation history and deduce context
 */
function analyzeContext(history?: { sender: "user" | "bot"; text: string }[]): ConversationContext {
  const ctx: ConversationContext = {};
  if (!history || history.length === 0) return ctx;

  for (let i = history.length - 1; i >= 0; i--) {
    const text = history[i].text.toLowerCase();

    // Check for user's introduced name
    if (history[i].sender === "user") {
      const nameMatch = text.match(/(?:my name is|i am|i'm|this is|call me)\s+([a-zA-Z]{2,20})/i);
      if (nameMatch && !ctx.userName) {
        ctx.userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1).toLowerCase();
      }
    }

    if (!ctx.lastTopic) {
      if (text.includes("web") || text.includes("website") || text.includes("frontend") || text.includes("app dev")) {
        ctx.lastTopic = "web";
      } else if (text.includes("billing") || text.includes("pos") || text.includes("invoice") || text.includes("inventory")) {
        ctx.lastTopic = "billing";
      } else if (text.includes("ceo") || text.includes("narend")) {
        ctx.lastTopic = "ceo";
      } else if (text.includes("founder") || text.includes("valiullah") || text.includes("yuvan")) {
        ctx.lastTopic = "founder";
      } else if (text.includes("intern") || text.includes("college") || text.includes("student")) {
        ctx.lastTopic = "internship";
      } else if (text.includes("job") || text.includes("career") || text.includes("hiring")) {
        ctx.lastTopic = "careers";
      } else if (text.includes("price") || text.includes("cost") || text.includes("quote") || text.includes("fee")) {
        ctx.lastTopic = "pricing";
      }
    }
  }

  return ctx;
}

/**
 * Main intelligent conversational matcher with memory, empathetic human handling,
 * and contextual multi-turn dialogue.
 */
export function findBotResponse(userMessage: string, history?: { sender: "user" | "bot"; text: string }[]): BotResponse {
  const cleanInput = userMessage.trim();
  const lower = cleanInput.toLowerCase();
  const ctx = analyzeContext(history);
  const namePrefix = ctx.userName ? `${ctx.userName}, ` : "";

  if (!cleanInput) {
    return {
      text: "I'm right here! Feel free to ask anything about our Web Development, Billing & POS systems, pricing, or leadership team. 😊",
    };
  }

  // 1. Check for Phone Number or Email Lead capture directly in chat
  const phoneMatch = cleanInput.match(/(?:(?:\+?91[-.\s]?)?[6-9]\d{9})/);
  const emailMatch = cleanInput.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (phoneMatch || emailMatch) {
    const contactValue = phoneMatch ? phoneMatch[0] : emailMatch![0];
    return {
      text: `🎉 **Thank you so much!** I've noted down your contact info: **${contactValue}**.
      
Our team, overseen by CEO **Mr. Narendhra Prashath**, will connect with you promptly! Would you prefer a WhatsApp message, a direct phone call, or an email regarding your project scope?`,
      showLeadForm: true,
      actions: [
        { label: "💬 Message on WhatsApp", externalUrl: `https://wa.me/918754020556?text=Hi,%20I%20just%20shared%20my%20contact%20(${contactValue})%20on%20your%20website%20chatbot.`, actionType: "external" },
        { label: "📞 Request Instant Call", externalUrl: "tel:+918754020556", actionType: "external" },
        { label: "📝 Fill Full Requirement Form", path: "/enquiry", actionType: "navigate" },
      ],
    };
  }

  // 2. Name Introduction & Memory
  const nameIntro = lower.match(/^(?:my name is|i am|i'm|this is|call me)\s+([a-zA-Z]{2,20})/i);
  if (nameIntro && nameIntro[1]) {
    const identifiedName = nameIntro[1].charAt(0).toUpperCase() + nameIntro[1].slice(1).toLowerCase();
    return {
      text: `Delighted to meet you, **${identifiedName}**! 😊👋
      
Welcome to VY NextGen Technologies! How can I assist you with your project today?
• Are you looking for a **high-speed custom website or web app**?
• Interested in our **Billing & GST POS software** demo?
• Or would you like to discuss pricing and project timelines?`,
      actions: [
        { label: "🌐 Web Development", path: "/web-development", actionType: "navigate" },
        { label: "🧾 Billing Software Demo", path: "/billing-software", actionType: "navigate" },
        { label: "💰 Request Custom Estimate", path: "/enquiry", actionType: "navigate" },
        { label: "💬 WhatsApp Us", externalUrl: "https://wa.me/918754020556", actionType: "external" },
      ],
    };
  }

  // 3. Small Talk, Pleasantries & "How are you?"
  if (/^(how are you|how r u|how are u|how do you do|how is it going|hows it going|whats up|sup|wassup)/i.test(lower)) {
    return {
      text: `I'm doing great, thank you so much for asking! 😊✨
      
The engineering team here at VY NextGen Technologies has been busy shipping awesome web platforms and retail POS installations. How is your day going, and what exciting project brings you to our website today?`,
      actions: [
        { label: "🌐 Need a Website", path: "/web-development", actionType: "navigate" },
        { label: "🧾 Need POS Billing", path: "/billing-software", actionType: "navigate" },
        { label: "👔 Who is Company CEO?", queryText: "Who is the company CEO?", actionType: "quickQuery" },
      ],
    };
  }

  // 4. "Who created you?" / "Are you AI or human?"
  if (/(who (made|created|built) you|are you (ai|human|bot|real)|what is your name)/i.test(lower)) {
    return {
      text: `🤖 I'm **VY Assistant**, the official AI concierge for **VY NextGen Technologies**!
      
I was engineered by our software development team right here in Tamil Nadu, under the guidance of our leadership team:
• **Mr. Narendhra Prashath** (CEO)
• **Mr. Valiullah** (Founder & Chairman)
• **Mr. Yuvan Shankar Raja** (Co-Founder)

While I handle inquiries 24/7 with lightning speed, our real senior software architects and business consultants are standing by right now if you'd like to talk directly!`,
      actions: [
        { label: "📞 Speak to a Real Human", externalUrl: "tel:+918754020556", actionType: "external" },
        { label: "💬 Chat on WhatsApp", externalUrl: "https://wa.me/918754020556", actionType: "external" },
        { label: "👔 Meet the Leadership", path: "/about", actionType: "navigate" },
      ],
    };
  }

  // 5. Talk to Human / Call Me / Speak to Representative
  if (/(talk to human|speak to (someone|agent|person|human|sales|rep|manager)|call me|give me (call|ring)|contact human|real person)/i.test(lower)) {
    return {
      text: `📞 **${namePrefix}We'd Love to Connect with You Personally!**
      
Nothing beats a direct conversation with our engineering and business consulting team:
• 📱 **Direct Call**: [+91 87540 20556](tel:+918754020556) *(Mon–Sat 9AM–7PM IST)*
• 💬 **WhatsApp**: [+91 87540 20556](https://wa.me/918754020556) *(Instant response 24/7)*
• ✉️ **Email**: [vynextgentechnology@gmail.com](mailto:vynextgentechnology@gmail.com)

Drop your phone number below and our senior technical lead will call you back today!`,
      showLeadForm: true,
      actions: [
        { label: "📞 Call +91 87540 20556 Now", externalUrl: "tel:+918754020556", actionType: "external" },
        { label: "💬 Open WhatsApp Chat", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20would%20like%20to%20speak%20with%20a%20representative.", actionType: "external" },
        { label: "📝 Fill Enquiry Form", path: "/enquiry", actionType: "navigate" },
      ],
    };
  }

  // 6. Discounts, Offers, Negotiation & Deals
  if (/(discount|offer|deal|concession|reduce price|less price|cheaper|bargain|negotiat|budget friendly|low budget)/i.test(lower)) {
    return {
      text: `🤝 **${namePrefix}We Always Support Growing Businesses & Startups!**
      
At VY NextGen Technologies, we believe quality software should be accessible to everyone:
• 🚀 **Startup & New Business Bundles**: Save up to 20% when bundling Web Development + GST Billing software.
• 💳 **Milestone Payment Flexibility**: Pay in structured phases (30% advance, 40% design/alpha approval, 30% final deployment).
• 🎁 **Free Extras Included**: Free SSL certificate, free domain guidance, 1 year basic technical maintenance, and Google Business setup!

Talk directly with CEO **Mr. Narendhra Prashath** or our team on WhatsApp to see what special package we can craft for your budget!`,
      actions: [
        { label: "💬 Discuss Budget on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20have%20a%20specific%20budget%20for%20my%20software%20project%20and%20would%20like%20to%20discuss%20available%20offers.", actionType: "external" },
        { label: "📝 Submit Project Scope", path: "/enquiry", actionType: "navigate" },
      ],
    };
  }

  // 7. Contextual "How much?" / "Cost" / "Pricing"
  if (/(how much|cost|price|pricing|charge|rate|fee|package|estimate)/i.test(lower)) {
    if (ctx.lastTopic === "billing") {
      return {
        text: `🧾 **Transparent Pricing for VY POS & Billing Software:**
        
• **Starter POS (Single Counter / Retail)**: ₹4,999 – ₹7,999 one-time setup (perpetual license with thermal printing & barcode scan).
• **Standard Business (Inventory & Multi-User)**: ₹8,999 – ₹14,999 (full stock ledger, WhatsApp invoices, GST GSTR-1/3B export).
• **Enterprise Multi-Branch / Cloud**: Custom quotation with real-time sync across branches.

🎁 *Zero hidden monthly subscription fees for offline edition! Includes free on-site/remote installation and staff training.*`,
        showLeadForm: true,
        actions: [
          { label: "Book Free POS Demo", path: "/billing-software", actionType: "navigate" },
          { label: "💬 Get Instant Quote on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20need%20a%20price%20quote%20for%20the%20Billing%20Software.", actionType: "external" },
        ],
      };
    } else if (ctx.lastTopic === "internship") {
      return {
        text: `🎓 **Software Internship Program Investment:**
        
• **1-Month Fast-Track Sprint**: Production project training, Git/GitHub, React/TypeScript fundamentals.
• **3-Month Comprehensive Incubation**: Full-stack MERN/Next.js architecture, live client project experience, verified Certificate of Completion & Letter of Recommendation.
• **Stipend/PPO**: Outstanding performers are shortlisted for paid engineering positions!

Our goal is real industry employability, not just dry classroom theory.`,
        actions: [
          { label: "Explore Curriculum", path: "/internship", actionType: "navigate" },
          { label: "Apply for Internship", path: "/enquiry", actionType: "navigate" },
        ],
      };
    } else {
      return {
        text: `💰 **${namePrefix}Transparent & Competitive Project Pricing:**
        
• 🌐 **Starter Business Website**: ₹5,999 – ₹9,999 (Fast 3-5 pages, 100% mobile responsive, SEO ready, delivered in 3-5 days).
• 🚀 **Dynamic Web Portal / Corporate Platform**: ₹12,000 – ₹25,000+ (Custom UI/UX, CMS admin panel, contact forms, custom animations).
• 🛒 **Full E-Commerce Marketplace**: ₹18,000 – ₹38,000+ (Payment gateway, shopping cart, product catalog, order management).
• 🧾 **GST Billing & POS Software**: ₹4,999 – ₹14,999 (Thermal printer, barcode scanner, offline-first).

Would you like a tailored quote specifically for your project?`,
        showLeadForm: true,
        actions: [
          { label: "📝 Request Free Custom Quote", path: "/enquiry", actionType: "navigate" },
          { label: "💬 Discuss on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20would%20like%20a%20price%20estimate%20for%20my%20project.", actionType: "external" },
        ],
      };
    }
  }

  // 8. Contextual "How long?" / "Timeline"
  if (/(how long|timeline|turnaround|how fast|delivery time|duration|days|weeks)/i.test(lower)) {
    return {
      text: `⏱️ **${namePrefix}Fast Turnarounds Without Compromising Quality:**
      
• 🌐 **Standard Business Websites**: 3 to 7 business days from requirement sign-off.
• 🛒 **E-Commerce & Dynamic Web Apps**: 10 to 21 business days with full payment gateway & product configuration.
• 🧾 **Billing & POS Deployment**: Same-day or next-day on-site/remote setup, hardware printer configuration, and staff training!
• 📱 **Mobile Applications**: 2 to 4 weeks for MVP release.

Do you have a specific launch deadline in mind? Let us know and we'll do everything possible to meet your schedule! 😊`,
      actions: [
        { label: "Share Your Target Timeline", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Fast-Track on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20have%20an%20urgent%20software%20project%20with%20a%20tight%20deadline.", actionType: "external" },
      ],
    };
  }

  // 9. CEO Query
  if (/(who.*(is|s).*ceo|company.*ceo|tell.*about.*ceo|about.*narend|who.*leads.*company|\bceo\b)/i.test(lower)) {
    return {
      text: `👔 **Chief Executive Officer (CEO) — Mr. Narendhra Prashath**
      
Mr. Narendhra Prashath heads executive governance, client technology advisory, and digital transformation initiatives at **VY NextGen Technologies**. Under his leadership, our team has delivered dozens of custom web applications and enterprise retail systems across Tamil Nadu and pan-India.`,
      leaders: [COMPANY_LEADERS.ceo],
      actions: [
        { label: "Read Executive Profiles", path: "/about", actionType: "navigate" },
        { label: "WhatsApp CEO Office", externalUrl: "https://wa.me/918754020556?text=Hi%20Narendhra%20Prashath%20/%20CEO%20Office,%20I%20am%20interested%20in%20a%20business%20collaboration.", actionType: "external" },
        { label: "Who is Co-Founder?", queryText: "Who is the co-founder?", actionType: "quickQuery" },
      ],
    };
  }

  // 10. Co-Founder Query
  if (/(co[-\s]?founder|cofounder|\byuvan\b|shankar.*raja)/i.test(lower)) {
    return {
      text: `💡 **Co-Founder — Mr. Yuvan Shankar Raja**
      
Mr. Yuvan Shankar Raja is the Co-Founder steering business architecture, financial technology innovation, and strategic corporate alliances at **VY NextGen Technologies**.`,
      leaders: [COMPANY_LEADERS.coFounder],
      actions: [
        { label: "Read Full Bio", path: "/about", actionType: "navigate" },
        { label: "Connect on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20would%20like%20to%20connect%20with%20Co-Founder%20Yuvan%20Shankar%20Raja.", actionType: "external" },
      ],
    };
  }

  // 11. Founder & Executive Chairman
  if (/(who.*(is|s).*founder|valiullah|executive chairman|\bchairman\b)/i.test(lower) && !lower.includes("co founder") && !lower.includes("co-founder")) {
    return {
      text: `🏛️ **Founder & Executive Chairman — Mr. Valiullah**
      
Mr. Valiullah is the founding visionary behind **VY NextGen Technologies**, guiding core engineering architectures, POS retail engines, and developer incubation programs.`,
      leaders: [COMPANY_LEADERS.founder],
      actions: [
        { label: "Read Executive Profiles", path: "/about", actionType: "navigate" },
        { label: "Connect on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20would%20like%20to%20connect%20with%20Founder%20Valiullah.", actionType: "external" },
      ],
    };
  }

  // 12. Complete Leadership Team
  if (/(leadership|management|directors|board|team leaders|who runs|founders)/i.test(lower)) {
    return {
      text: `🌟 **Executive Leadership Team — VY NextGen Technologies**
      
Our company is led by seasoned industry builders and technologists:
• **Mr. Narendhra Prashath** — Chief Executive Officer (CEO)
• **Mr. Valiullah** — Founder & Executive Chairman
• **Mr. Yuvan Shankar Raja** — Co-Founder
• **Mr. Sri Prajith** — Chief Technology & Chief Financial Officer (CTO/CFO)
• **Mr. Santhosh** — Managing Director (MD)
• **Mr. Yeswanth** — Director`,
      leaders: [
        COMPANY_LEADERS.ceo,
        COMPANY_LEADERS.founder,
        COMPANY_LEADERS.coFounder,
      ],
      actions: [
        { label: "View All Executive Bios", path: "/about", actionType: "navigate" },
        { label: "💬 Connect with Leadership", externalUrl: "https://wa.me/918754020556", actionType: "external" },
      ],
    };
  }

  // 13. Web Development Queries
  if (/(web|website|web app|frontend|react|nextjs|portal|landing page|ecommerce|e-commerce|online store)/i.test(lower)) {
    return {
      text: `🌐 **${namePrefix}World-Class Web & Digital Platform Engineering**
      
We don't build generic template sites — we build lightning-fast, high-converting digital experiences:
• ⚡ **Modern Tech Stack**: React, Next.js, TypeScript, Tailwind CSS, Node.js, and PostgreSQL.
• 📱 **100% Responsive**: Pixel-perfect layout across iPhones, Androids, iPads, and desktops.
• 🚀 **SEO & Performance**: 95+ Google PageSpeed score, sub-1-second load times, structured schema markup.
• 🛒 **E-Commerce Ready**: Razorpay, Stripe, WhatsApp order checkout, and custom admin dashboard.
• 🛡️ **Source Code Ownership**: You own 100% of your code and intellectual property. No vendor lock-in!`,
      actions: [
        { label: "Explore Web Engineering", path: "/web-development", actionType: "navigate" },
        { label: "💰 Calculate Cost Estimate", path: "/enquiry", actionType: "navigate" },
        { label: "⏱️ Delivery Timelines", queryText: "How long does a website take to build?", actionType: "quickQuery" },
        { label: "💬 WhatsApp Us", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20am%20interested%20in%20Web%20Development%20services.", actionType: "external" },
      ],
    };
  }

  // 14. Billing Software & POS Solutions
  if (/(billing|pos|invoice|invoicing|gst|thermal|barcode|inventory|counter|retail software|supermarket|restaurant|pharmacy)/i.test(lower)) {
    return {
      text: `🧾 **${namePrefix}High-Speed Retail Billing & POS Software**
      
Engineered specifically for supermarkets, grocery stores, textile shops, restaurants, pharmacies, and wholesale distribution:
• ⚡ **Sub-2-Second Checkout**: Lightning-quick barcode lookup and 1-click invoice printing.
• 📴 **100% Offline Capability**: Never lose a sale even during internet or power interruptions!
• 🖨️ **Hardware Compatible**: Works seamlessly with thermal receipt printers (2-inch & 3-inch), laser printers, USB/Bluetooth barcode scanners, and cash drawers.
• 📲 **WhatsApp Invoices**: Send digital PDF bills directly to customer mobile numbers to save paper.
• 📊 **Smart GST Filing**: Automatic GSTR-1, GSTR-3B tax calculations and Excel/Tally exports.`,
      actions: [
        { label: "Explore Billing Features", path: "/billing-software", actionType: "navigate" },
        { label: "🛒 Schedule Free Demo", path: "/billing-software", actionType: "navigate" },
        { label: "💰 Pricing Packages", queryText: "How much does billing software cost?", actionType: "quickQuery" },
        { label: "💬 Chat on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20need%20a%20demo%20of%20the%20Billing%20Software.", actionType: "external" },
      ],
    };
  }

  // 15. Mobile App Development
  if (/(mobile app|android|ios|flutter|react native|apk|app development)/i.test(lower)) {
    return {
      text: `📱 **Native & Cross-Platform Mobile Application Development**
      
We build slick, intuitive mobile applications that users love:
• 🍏 **iOS & Android**: Single unified codebase using React Native or Flutter, saving you up to 40% on build costs.
• 🔔 **Real-Time Push Notifications**: Firebase messaging, custom alerts, and user retention workflows.
• 💳 **In-App Payments**: Secure UPI, credit card, netbanking, and wallet integrations.
• 🚀 **App Store & Play Store Guidance**: Complete assistance with Google Play Console and Apple Developer account deployment.`,
      actions: [
        { label: "Request App Architecture Call", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Discuss App on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20want%20to%20develop%20a%20Mobile%20App.", actionType: "external" },
      ],
    };
  }

  // 16. Maintenance, Support & AMC
  if (/(maintenance|support|amc|after launch|bug|update|warranty|post launch)/i.test(lower)) {
    return {
      text: `🛡️ **Long-Term Peace of Mind & Dedicated Support**
      
We never launch and leave:
• 🎁 **Free Warranty**: All our web and billing projects include 30 to 90 days of free post-launch bug fixing and support.
• 🔄 **Annual Maintenance Contracts (AMC)**: Affordable packages for regular security patches, content updates, server monitoring, and automated backups.
• ⚡ **Dedicated SLA**: Fast priority response via WhatsApp and telephone hotline (+91 87540 20556).`,
      actions: [
        { label: "💬 Inquire About AMC Support", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20would%20like%20to%20know%20about%20your%20maintenance%20and%20support%20packages.", actionType: "external" },
        { label: "Contact Us", path: "/enquiry", actionType: "navigate" },
      ],
    };
  }

  // 17. NDA & Intellectual Property / Source Code Ownership
  if (/(nda|confidential|source code|ownership|ip|intellectual property|security)/i.test(lower)) {
    return {
      text: `🔒 **100% Intellectual Property Ownership & Confidentiality**
      
• 📝 **Mutual Non-Disclosure Agreement (NDA)**: We gladly sign strict NDAs before you share sensitive business workflows or startup concepts.
• 💻 **Full Source Code Handover**: Once the project milestone is settled, you receive complete repository ownership with clean documentation. No proprietary lock-ins or recurring code ransom!
• 🛡️ **Enterprise Security**: Industry best practices for data encryption, HTTPS/SSL, and secure database schemas.`,
      actions: [
        { label: "Request Mutual NDA", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Message on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20have%20a%20confidential%20project%20and%20would%20like%20to%20discuss%20with%20an%20NDA.", actionType: "external" },
      ],
    };
  }

  // 18. Careers & Hiring
  if (/(career|careers|job|jobs|hiring|vacancy|vacancies|apply|resume|cv|developer job|fresher job)/i.test(lower)) {
    return {
      text: `💼 **Build the Future with VY NextGen Technologies!**
      
We are always on the lookout for hungry builders, problem solvers, and engineers:
• 💻 **Frontend Engineer**: React, Next.js, Tailwind CSS, TypeScript
• ⚙️ **Backend Engineer**: Node.js, Express, PostgreSQL, REST/GraphQL
• 🚀 **Full-Stack Developer**: Modern JavaScript / TypeScript architectures
• 🎨 **UI/UX Designer**: Figma wireframes, clickable prototypes, micro-animations
• 📈 **Business Development Specialist**: Retail POS consulting & client acquisition

Applications are screened within 48 hours!`,
      actions: [
        { label: "View Openings & Apply", path: "/careers", actionType: "navigate" },
        { label: "💬 Message HR on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hello%20HR%20Team,%20I%20am%20interested%20in%20career%20opportunities%20at%20VY%20NextGen%20Technologies.", actionType: "external" },
      ],
    };
  }

  // 19. Internship Program
  if (/(intern|internship|training|student|college|certificate|mern|learn|mentor|stipend)/i.test(lower)) {
    return {
      text: `🎓 **Software Engineering Internship & Incubation Program**
      
Gain actual product engineering experience that elevates your career:
• 🛠️ **Real-World Code**: Build production-grade Full-Stack applications with React, TypeScript, and Node.js.
• 👨‍🏫 **1-on-1 Mentorship**: Senior software architects review your pull requests and guide your system design.
• 📜 **Verified Credentials**: Official Certificate of Completion and personalized Letter of Recommendation.
• 💼 **Placement Opportunities**: High-performing interns receive immediate consideration for full-time engineering placements!`,
      actions: [
        { label: "Explore Internship Program", path: "/internship", actionType: "navigate" },
        { label: "Apply Now", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Chat with Coordinator", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20am%20interested%20in%20the%20Software%20Development%20Internship%20Program.", actionType: "external" },
      ],
    };
  }

  // 20. Contact & Location
  if (/(contact|phone|number|call|email|address|location|office|reach|whatsapp|where.*located|tamil nadu|madurai|chennai|hours)/i.test(lower)) {
    return {
      text: `📍 **We're Always Here for You!**
      
• 📱 **Direct Call**: [+91 87540 20556](tel:+918754020556)
• 💬 **WhatsApp**: [+91 87540 20556](https://wa.me/918754020556) *(Instant response 24/7)*
• ✉️ **Official Email**: [vynextgentechnology@gmail.com](mailto:vynextgentechnology@gmail.com)
• 🏢 **Headquarters**: Tamil Nadu, India *(serving pan-India & global clients)*
• ⏰ **Business Hours**: Monday to Saturday, 9:00 AM – 7:00 PM IST

Leave your contact number below and we'll reach out to you within the hour!`,
      showLeadForm: true,
      actions: [
        { label: "📞 Call +91 87540 20556", externalUrl: "tel:+918754020556", actionType: "external" },
        { label: "💬 WhatsApp Us", externalUrl: "https://wa.me/918754020556", actionType: "external" },
        { label: "📝 Fill Enquiry Form", path: "/enquiry", actionType: "navigate" },
      ],
    };
  }

  // 21. Tamil / Regional Friendly Greeting & Tanglish
  if (/(vanakkam|epdi irukinga|nandri|tamil|website venum|billing venum|evalavu|evlo|panradhu)/i.test(lower)) {
    return {
      text: `வணக்கம்! (Vanakkam!) 🙏
      
VY NextGen Technologies-க்கு உங்களை அன்போடு வரவேற்கிறோம்!
நமது தலைமை நிர்வாக அதிகாரி (CEO) **Mr. Narendhra Prashath** தலைமையிலான எங்கள் தொழில்நுட்ப குழு உங்களுக்கு உதவ தயாராக உள்ளது:

• 🌐 **Custom Website & Web Application**: அதிவேகமான மற்றும் மொபைலில் அருமையாக இயங்கும் இணையதளங்கள் (3-7 நாட்களில் டெலிவரி).
• 🧾 **GST Billing & POS Software**: மளிகை, சூப்பர் மார்க்கெட், ரெஸ்டாரன்ட் & டெக்ஸ்டைல் கடைகளுக்கான அதிவேக பில்லிங் சாப்ட்வேர் (ஆஃப்லைன் வசதியுடன்).
• 🎓 **Software Internship**: மாணவர்களுக்கான நேரடி பயிற்சி & சான்றிதழ்.

உங்களுக்கு எந்த சேவை பற்றி தகவல் வேண்டும்? தமிழ் அல்லது ஆங்கிலத்தில் தாராளமாக கேளுங்கள்! 😊`,
      actions: [
        { label: "👔 CEO விவரங்கள்", queryText: "Who is the company CEO?", actionType: "quickQuery" },
        { label: "🌐 Web Development", path: "/web-development", actionType: "navigate" },
        { label: "🧾 Billing Software", path: "/billing-software", actionType: "navigate" },
        { label: "💬 WhatsApp தொடர்பு (+91 87540 20556)", externalUrl: "https://wa.me/918754020556?text=Vanakkam%20VY%20NextGen%20Technology,%20enakku%20unga%20services%20patri%20details%20theva.", actionType: "external" },
      ],
    };
  }

  // 22. Greetings
  if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|greetings)(\s|$|[!?.])/i.test(lower)) {
    const greeting = getFriendlyGreeting();
    return {
      text: `Hello there! ${greeting} It's wonderful to connect with you. 😊
      
How can I assist you with your business goals today?
• Planning a **new custom website or redesigning an existing one**?
• Looking for a **retail POS & GST Billing software demo**?
• Interested in **meeting our CEO & executive leadership team**?
• Want to discuss **pricing and project timelines**?

Feel free to ask whatever is on your mind!`,
      actions: [
        { label: "👔 Who is Company CEO?", queryText: "Who is the company CEO?", actionType: "quickQuery" },
        { label: "🌐 Web Development", path: "/web-development", actionType: "navigate" },
        { label: "🧾 Billing Software Demo", path: "/billing-software", actionType: "navigate" },
        { label: "💰 Request Price Quote", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Chat on WhatsApp", externalUrl: "https://wa.me/918754020556", actionType: "external" },
      ],
    };
  }

  // 23. Gratitude & Goodbyes
  if (/(thank|thanks|thank you|thx|appreciate|helpful|great job|awesome|bye|goodbye|see you)/i.test(lower)) {
    return {
      text: `You're very welcome, ${namePrefix}! It was truly my pleasure helping you! 😊❤️
      
If you ever have more questions or want to kickstart a project with CEO **Mr. Narendhra Prashath** and our engineering team, we are always just a quick message away on WhatsApp or phone at **+91 87540 20556**.
      
Wishing you tremendous success with your business! Have an amazing day ahead! 🚀`,
      actions: [
        { label: "💬 Keep in touch on WhatsApp", externalUrl: "https://wa.me/918754020556", actionType: "external" },
        { label: "📝 Submit Project Details", path: "/enquiry", actionType: "navigate" },
      ],
    };
  }

  // 24. Empathetic Fallback with Context Sensitivity
  return {
    text: `That's an interesting question${namePrefix ? `, ${namePrefix}` : ""}! 😊
    
To ensure you get the most accurate and thoughtful answer, here are the main ways our team can help:
• 👔 **Executive Leadership**: Ask me *"Who is the CEO?"* or *"Who is the founder?"*
• 🌐 **Custom Web & Mobile Platforms**: Fast, responsive websites built with React & Next.js
• 🧾 **POS & Retail Billing**: Sub-2s checkout, offline mode, GST tax reports & WhatsApp receipts
• 💰 **Custom Quotations**: 100% free consultation and project scope breakdown

Would you like to connect directly with CEO **Mr. Narendhra Prashath** or our senior tech leads right now?`,
    showLeadForm: true,
    actions: [
      { label: "👔 Meet the CEO", queryText: "Who is the company CEO?", actionType: "quickQuery" },
      { label: "📝 Request Free Consultation", path: "/enquiry", actionType: "navigate" },
      { label: "💬 Chat on WhatsApp (+91 87540 20556)", externalUrl: "https://wa.me/918754020556", actionType: "external" },
    ],
  };
}
