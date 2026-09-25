import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  Sparkles,
  RefreshCw,
  User,
  Phone,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Loader2,
  ChevronDown,
  Globe,
  Receipt,
  Briefcase,
  GraduationCap,
  DollarSign,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useIsPastHero } from "@/hooks/use-hero-passed";
import {
  findBotResponse,
  getInitialWelcomeMessage,
  QUICK_SUGGESTIONS,
  type ChatAction,
  type LeaderProfile,
} from "@/lib/chatbotKnowledge";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  actions?: ChatAction[];
  showLeadForm?: boolean;
  isLeadSubmitted?: boolean;
  feedback?: "up" | "down" | null;
  leaders?: LeaderProfile[];
  timestamp: string;
}

const STORAGE_KEY = "vy_nextgen_chat_history_v2";
const SOUND_PREF_KEY = "vy_nextgen_chat_sound_pref";

/**
 * Lightweight synthesizer for modern UI sound chime without any external audio files
 */
function playChime(enabled: boolean) {
  if (!enabled) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    // Soft high-tech pop chime (F5 -> C6)
    osc.frequency.setValueAtTime(698.46, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {
    // Ignore restricted audio contexts
  }
}

export function Chatbot() {
  const isPastHero = useIsPastHero();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem(SOUND_PREF_KEY) !== "disabled";
    } catch {
      return true;
    }
  });

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);

  // Form states for inline lead capture
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    requirement: "General Enquiry",
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // Load initial messages from sessionStorage or default welcome
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }

    const initial = getInitialWelcomeMessage();
    return [
      {
        id: "msg-welcome",
        sender: "bot",
        text: initial.text,
        actions: initial.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Persist sound preference
  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_PREF_KEY, next ? "enabled" : "disabled");
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Keyboard shortcut to close with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("smooth");
    }
  }, [messages, isTyping]);

  // Welcome prompt popup after 2.5s on desktop, 4s on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcomeBubble(true);
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowNotificationBadge(false);
    setShowWelcomeBubble(false);
    playChime(soundEnabled);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleResetChat = () => {
    const initial = getInitialWelcomeMessage();
    const resetWelcomeMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "bot",
      text: initial.text,
      actions: initial.actions,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([resetWelcomeMsg]);
    toast({
      title: "Chat Reset",
      description: "Conversation has been refreshed.",
    });
  };

  const handleSendMessage = (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: "msg-user-" + Date.now(),
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Natural typing delay (500ms - 850ms) to feel human
    const delay = Math.min(850, Math.max(450, trimmed.length * 20));

    setTimeout(() => {
      const response = findBotResponse(trimmed);
      const botMsg: ChatMessage = {
        id: "msg-bot-" + Date.now(),
        sender: "bot",
        text: response.text,
        actions: response.actions,
        showLeadForm: response.showLeadForm,
        leaders: response.leaders,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playChime(soundEnabled);
    }, delay);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.actionType === "navigate" && action.path) {
      setLocation(action.path);
      // Close on mobile for smooth page browsing
      if (window.innerWidth < 640) {
        setIsOpen(false);
      }
    } else if (action.actionType === "external" && action.externalUrl) {
      window.open(action.externalUrl, "_blank", "noopener,noreferrer");
    } else if (action.queryText) {
      handleSendMessage(action.queryText);
    }
  };

  const handleFeedback = (messageId: string, type: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback: type } : msg
      )
    );
    toast({
      title: type === "up" ? "Thank you! ❤️" : "Feedback Noted",
      description:
        type === "up"
          ? "Glad I could help you with that!"
          : "We will keep improving our answers.",
    });
  };

  const handleLeadSubmit = async (messageId: string, e: React.FormEvent) => {
    e.preventDefault();
    const clientName = leadForm.name.trim();
    const clientPhone = leadForm.phone.trim();
    const clientReq = leadForm.requirement;

    if (!clientName || !clientPhone) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your Name and Phone Number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingLead(true);

    // Build the prefilled WhatsApp message to the company number
    const companyWhatsAppNumber = "918754020556";
    const whatsappMessage = 
`*New Website Callback Request - VY NextGen Technologies*

👤 *Client Name:* ${clientName}
📱 *Phone / WhatsApp:* ${clientPhone}
📋 *Requirement:* ${clientReq}

_Sent directly via VY NextGen Website Assistant_`;

    const whatsappUrl = `https://wa.me/${companyWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      // 1. Log in backend database / email notification
      await apiRequest("POST", "/api/contact", {
        name: clientName,
        phone: clientPhone,
        email: `${clientPhone.replace(/\D/g, "")}@vyclient.com`,
        message: `[Chatbot Inquiry] Requirement: ${clientReq}`,
      });

      // 2. Mark this message's lead form as submitted
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, isLeadSubmitted: true } : msg
        )
      );

      // 3. Directly open WhatsApp with pre-filled details to send to company number
      try {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch (openErr) {
        console.warn("Popup blocked or direct window.open restricted:", openErr);
      }

      toast({
        title: "Details Sent! 🚀",
        description: "Opening WhatsApp with your inquiry details...",
      });

      // 4. Send celebratory human confirmation in chat
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-confirm-" + Date.now(),
            sender: "bot",
            text: `✅ **Thank you, ${clientName}!**\n\nYour details have been registered and routed directly to our WhatsApp support at **+91 87540 20556**.\n\nIf WhatsApp did not open automatically on your device, tap the button below to send your details with one click:`,
            actions: [
              {
                label: "💬 Send to WhatsApp Now",
                externalUrl: whatsappUrl,
                actionType: "external",
              },
              {
                label: "📞 Call +91 87540 20556",
                externalUrl: "tel:+918754020556",
                actionType: "external",
              },
            ],
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        playChime(soundEnabled);
      }, 400);

      // Reset form
      setLeadForm({
        name: "",
        phone: "",
        requirement: "General Enquiry",
      });
    } catch (err: any) {
      console.error("Chat lead submission error:", err);
      // Still open WhatsApp even if backend network hiccup occurs!
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      toast({
        title: "Directing to WhatsApp",
        description: "Opening WhatsApp to send your inquiry directly.",
      });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Helper to format text with Markdown bold, links, and bullets
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");

    return lines.map((line, idx) => {
      if (line.startsWith("• ") || line.startsWith("- ")) {
        const content = line.substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-slate-200">
            <span className="text-cyan-400 font-bold mt-0.5 select-none">•</span>
            <span
              dangerouslySetInnerHTML={{
                __html: formatInlineMarkdown(content),
              }}
            />
          </div>
        );
      }

      return (
        <p
          key={idx}
          className={`${line.trim() === "" ? "h-2" : "my-1"} leading-relaxed`}
          dangerouslySetInnerHTML={{
            __html: formatInlineMarkdown(line),
          }}
        />
      );
    });
  };

  const formatInlineMarkdown = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline font-medium hover:text-cyan-300 transition-colors">$1</a>'
    );
    return formatted;
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-3.5 h-3.5 text-cyan-400" />;
      case "Receipt":
        return <Receipt className="w-3.5 h-3.5 text-emerald-400" />;
      case "DollarSign":
        return <DollarSign className="w-3.5 h-3.5 text-amber-400" />;
      case "Briefcase":
        return <Briefcase className="w-3.5 h-3.5 text-indigo-400" />;
      case "GraduationCap":
        return <GraduationCap className="w-3.5 h-3.5 text-purple-400" />;
      case "Phone":
        return <Phone className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  if (!isPastHero) {
    return null;
  }

  return (
    <>
      {/* 1. Welcoming Prompt Tooltip Bubble (When Closed) */}
      <AnimatePresence>
        {!isOpen && showWelcomeBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 max-w-[290px] sm:max-w-xs select-none"
          >
            <div
              onClick={handleOpenChat}
              className="relative p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 text-slate-100 text-xs shadow-2xl backdrop-blur-xl flex items-start gap-3 cursor-pointer hover:border-cyan-400 transition-all group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 pr-2">
                <div className="flex items-center gap-1.5 font-bold text-white mb-0.5">
                  <span>VY Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-slate-300 text-[11px] leading-snug">
                  👋 Need a website, billing software, or a quick quote? Tap here to chat!
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWelcomeBubble(false);
                }}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {/* Pointer triangle */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-b border-r border-cyan-500/40 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Launcher Trigger Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-50 flex items-center"
      >
        <button
          onClick={isOpen ? handleCloseChat : handleOpenChat}
          aria-label={isOpen ? "Close Chatbot" : "Open VY Assistant"}
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-blue-600/40 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-300/40 group cursor-pointer"
        >
          {/* Outer Ping Status Beacon */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-slate-950" />
          </span>

          {/* Unread AI Badge */}
          {showNotificationBadge && !isOpen && (
            <span className="absolute -top-2.5 -left-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-[10px] font-black text-white shadow-md animate-bounce">
              AI
            </span>
          )}

          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200" />
          ) : (
            <div className="relative">
              <Bot className="w-5 h-5 sm:w-7 sm:h-7 transition-transform duration-200 group-hover:scale-110" />
              <Sparkles className="w-3 h-3 text-cyan-200 absolute -top-1 -right-1 animate-pulse" />
            </div>
          )}
        </button>
      </motion.div>

      {/* 3. Main Glassmorphic Chat Window - Anchored to Right Side */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{ transformOrigin: "bottom right" }}
            className={`fixed z-50 flex flex-col overflow-hidden bg-slate-950/98 backdrop-blur-2xl border border-cyan-500/30 text-slate-100 shadow-[0_20px_60px_-15px_rgba(4,29,87,0.9)] rounded-2xl sm:rounded-3xl
              right-3 sm:right-6 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-24
              ${
                isExpanded
                  ? "w-[calc(100vw-24px)] sm:w-[560px] max-w-[560px] h-[640px] max-h-[calc(100dvh-95px)] sm:max-h-[calc(100vh-130px)]"
                  : "w-[calc(100vw-24px)] sm:w-[410px] max-w-[410px] h-[540px] sm:h-[580px] max-h-[calc(100dvh-95px)] sm:max-h-[calc(100vh-130px)]"
              }
            `}
          >
            {/* Top Cyan Accent Strip */}
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shrink-0" />

            {/* Header */}
            <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-cyan-400/30 shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight leading-none">
                      VY NextGen Assistant
                    </h3>
                    <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold border border-cyan-500/30">
                      AI 2.0
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Typically replies instantly
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                {/* Sound Toggle */}
                <button
                  onClick={toggleSound}
                  className={`p-2 rounded-xl transition-colors ${
                    soundEnabled
                      ? "text-cyan-400 hover:bg-slate-800/80"
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/80"
                  }`}
                  title={soundEnabled ? "Sound enabled (Click to mute)" : "Sound muted (Click to unmute)"}
                  aria-label="Toggle Sound"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/918754020556?text=Hi%20VY%20NextGen%20Technology,%20I%20am%20chatting%20on%20your%20website%20and%20need%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
                  title="WhatsApp Representative"
                  aria-label="WhatsApp Representative"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>

                {/* Reset Chat */}
                <button
                  onClick={handleResetChat}
                  className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
                  title="Restart Conversation"
                  aria-label="Restart Conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Laptop Expand Toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:inline-flex p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  title={isExpanded ? "Collapse Window" : "Expand Window"}
                  aria-label="Expand Window"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={handleCloseChat}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  title="Close Chat"
                  aria-label="Close Chat"
                >
                  <ChevronDown className="w-5 h-5 sm:hidden" />
                  <X className="w-4 h-4 hidden sm:block" />
                </button>
              </div>
            </div>

            {/* Quick Topic Chips Scrollable Row */}
            <div
              className="px-3 py-2 bg-slate-950/90 border-b border-slate-800/70 flex items-center gap-1.5 overflow-x-auto overflow-y-hidden no-scrollbar shrink-0 select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {QUICK_SUGGESTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSendMessage(item.query)}
                  className="shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-medium text-slate-300 hover:text-cyan-300 transition-all active:scale-95 cursor-pointer"
                >
                  {getIcon(item.iconName)}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Chat Messages Scroll Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 space-y-3.5 text-xs sm:text-sm chat-scrollbar overscroll-contain">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[92%] sm:max-w-[85%] ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Message Avatar */}
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-white ${
                        msg.sender === "user"
                          ? "bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20"
                          : "bg-slate-800 border border-slate-700 text-cyan-400"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>

                    {/* Chat Bubble */}
                    <div
                      className={`p-3.5 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white rounded-tr-none shadow-md shadow-blue-600/20"
                          : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm"
                      }`}
                    >
                      {renderFormattedText(msg.text)}

                      {/* Rich Leader Profile Card(s) with Photo, Name & Details */}
                      {msg.leaders && msg.leaders.length > 0 && (
                        <div className="mt-3.5 space-y-3 w-full">
                          {msg.leaders.map((leader) => (
                            <div
                              key={leader.id}
                              className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-slate-950/90 via-slate-900/95 to-blue-950/50 border border-cyan-500/40 shadow-xl shadow-cyan-950/30 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-3.5 text-center sm:text-left transition-all hover:border-cyan-400 group"
                            >
                              {/* Leader Photo with Glowing Border - Completely Unobstructed */}
                              <div className="shrink-0">
                                <img
                                  src={leader.photo}
                                  alt={leader.name}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-cyan-400/60 shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-200"
                                />
                              </div>

                              {/* Leader Bio Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                                  <h4 className="text-sm font-bold text-white tracking-tight">
                                    {leader.name}
                                  </h4>
                                  <span className="px-2 py-0.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                                    {leader.badge}
                                  </span>
                                </div>
                                <span className="text-[11px] font-semibold text-cyan-400 block mt-0.5">
                                  {leader.role}
                                </span>
                                <span className="text-[10px] text-slate-400 block mt-0.5">
                                  {leader.department}
                                </span>
                                <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5">
                                  {leader.summary}
                                </p>

                                {/* Focus Area Tags */}
                                <div className="flex flex-wrap gap-1 mt-2 justify-center sm:justify-start">
                                  {leader.focus.map((f, i) => (
                                    <span
                                      key={i}
                                      className="px-1.5 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 text-[9px] font-medium text-cyan-300"
                                    >
                                      #{f}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Lead Capture Form */}
                      {msg.showLeadForm && !msg.isLeadSubmitted && (
                        <div className="mt-3.5 pt-3 border-t border-slate-800">
                          <p className="text-[11px] font-semibold text-cyan-300 mb-2 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            Request Instant Callback & Free Quote:
                          </p>
                          <form
                            onSubmit={(e) => handleLeadSubmit(msg.id, e)}
                            className="space-y-2.5"
                          >
                            <input
                              type="text"
                              required
                              placeholder="Your Name *"
                              value={leadForm.name}
                              onChange={(e) =>
                                setLeadForm({ ...leadForm, name: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 text-[16px] sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="WhatsApp / Phone Number *"
                              value={leadForm.phone}
                              onChange={(e) =>
                                setLeadForm({ ...leadForm, phone: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 text-[16px] sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                            <select
                              value={leadForm.requirement}
                              onChange={(e) =>
                                setLeadForm({
                                  ...leadForm,
                                  requirement: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-700 text-[16px] sm:text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                            >
                              <option value="Custom Web Development">
                                Web Development Project
                              </option>
                              <option value="Billing / POS Software Demo">
                                Retail POS / Billing Software
                              </option>
                              <option value="Pricing Quotation">
                                Price Quotation / Estimate
                              </option>
                              <option value="Internship / Training">
                                Internship Program
                              </option>
                              <option value="Career Application">
                                Job / Career Enquiry
                              </option>
                              <option value="General Question">
                                Other / General Support
                              </option>
                            </select>

                            <button
                              type="submit"
                              disabled={isSubmittingLead}
                              className="w-full min-h-[44px] py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                              {isSubmittingLead ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Submitting...</span>
                                </>
                              ) : (
                                <>
                                  <span>Request Priority Callback</span>
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </form>
                        </div>
                      )}

                      {/* Lead Submitted Confirmation Badge */}
                      {msg.isLeadSubmitted && (
                        <div className="mt-2 py-2 px-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Submitted successfully! Our team will contact you.</span>
                        </div>
                      )}

                      {/* Action Navigation Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                          {msg.actions.map((action, actionIdx) => (
                            <button
                              key={actionIdx}
                              onClick={() => handleActionClick(action)}
                              className="min-h-[36px] sm:min-h-[32px] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 text-cyan-300 hover:text-white border border-slate-700 text-xs font-medium transition-all active:scale-95 cursor-pointer"
                            >
                              <span>{action.label}</span>
                              {action.actionType === "external" ? (
                                <ExternalLink className="w-3 h-3 text-slate-400" />
                              ) : (
                                <ArrowRight className="w-3 h-3 text-cyan-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Human-Friendly Helpful Feedback (For Bot Messages) */}
                      {msg.sender === "bot" && msg.id !== "msg-welcome" && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-500">
                          <span>Was this helpful?</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleFeedback(msg.id, "up")}
                              className={`p-1 rounded-md transition-colors ${
                                msg.feedback === "up"
                                  ? "text-emerald-400 bg-emerald-950/60"
                                  : "hover:text-emerald-400 hover:bg-slate-800"
                              }`}
                              title="Helpful"
                              aria-label="Thumbs up"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleFeedback(msg.id, "down")}
                              className={`p-1 rounded-md transition-colors ${
                                msg.feedback === "down"
                                  ? "text-rose-400 bg-rose-950/60"
                                  : "hover:text-rose-400 hover:bg-slate-800"
                              }`}
                              title="Not helpful"
                              aria-label="Thumbs down"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Timestamp */}
                  <span className="text-[10px] text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </motion.div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 flex items-center gap-1.5 shadow-sm">
                    <span className="text-xs text-slate-400 mr-1">VY Assistant is thinking</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sticky Bottom Input Bar (Virtual Keyboard Safe for Mobile) */}
            <div className="p-3 bg-slate-900/95 border-t border-slate-800/80 shrink-0 pb-safe">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about Web Dev, POS, Pricing, Jobs..."
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-[16px] sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors pr-8"
                  />
                  {inputText && (
                    <button
                      type="button"
                      onClick={() => setInputText("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                      aria-label="Clear input text"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 hover:shadow-cyan-500/35 hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Bottom Footer Info */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 px-1">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live AI Concierge
                </span>
                <a
                  href="tel:+918754020556"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium"
                >
                  <Phone className="w-2.5 h-2.5 text-cyan-400" />
                  +91 87540 20556
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
