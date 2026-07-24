"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  BrainCircuit,
  FileText,
  ShieldCheck,
  Stethoscope,
  Activity,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import AiChat from "@/components/AiChat";

const AI_CAPABILITIES = [
  {
    icon: BrainCircuit,
    title: "Symptom & Diagnostic Mapper",
    description:
      "Enter symptoms or medical queries to receive AI-backed test recommendations tailored to your profile.",
  },
  {
    icon: FileText,
    title: "Prescription OCR & Summarizer",
    description:
      "Upload doctor prescriptions or previous lab reports for instant AI extraction of required tests.",
  },
  {
    icon: Stethoscope,
    title: "Package Recommendation Engine",
    description:
      "Get personalized health package suggestions based on age, gender, lifestyle, and clinical history.",
  },
  {
    icon: Zap,
    title: "Instant 24/7 AI Triage",
    description:
      "Get immediate answers regarding fasting guidelines, report turnaround times, and sample collection rules.",
  },
];

const SAMPLE_PROMPTS = [
  "I have chronic fatigue and joint pain. What diagnostic panel should I get?",
  "Explain my CBC report results and hemoglobin level.",
  "Which health package is best for a 45-year-old diabetic patient?",
  "What is the difference between Fasting Blood Sugar and HbA1c?",
];

export default function AiPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "overview">("chat");
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; time: string; action?: { text: string; link: string } }>>([
    {
      sender: "ai",
      text: "Welcome to QXL Medical Intelligence. I can help you analyze symptoms, recommend lab test panels, explain fasting rules, or suggest full body packages.",
      time: "Now",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const newMsg = { sender: "user" as const, text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      let aiReply = "Based on your query, we recommend consulting our specialist lab panels. For accurate evaluation, an expert-reviewed blood profile is recommended.";
      let actionObj = { text: "Book Recommended Test", link: "/book" };

      const lower = query.toLowerCase();
      if (lower.includes("fatigue") || lower.includes("tired") || lower.includes("joint")) {
        aiReply = "For chronic fatigue and joint discomfort, we recommend checking complete blood counts, thyroid levels, vitamin D, B12, and inflammatory markers like hs-CRP.";
        actionObj = { text: "View Q-Master Health Pro", link: "/packages" };
      } else if (lower.includes("cbc") || lower.includes("hemoglobin") || lower.includes("blood count")) {
        aiReply = "Complete Blood Count (CBC) evaluates red blood cells, white blood cells, and platelets. Normal hemoglobin ranges are 13.8–17.2 g/dL (men) and 12.1–15.1 g/dL (women).";
        actionObj = { text: "Book CBC Test (₹350)", link: "/book" };
      } else if (lower.includes("diabetic") || lower.includes("sugar") || lower.includes("hba1c")) {
        aiReply = "For diabetes assessment, HbA1c provides a 3-month average glucose picture. Fasting Blood Sugar measures current baseline levels. Fasting of 10–12 hours is required.";
        actionObj = { text: "View Q-Screen Diabetes Panel", link: "/packages" };
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: actionObj,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-[#0f2d5e] relative overflow-hidden">
      {/* Ambient background spatial glow orbs */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#38bdf8]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#0284c7]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Hero Header Section */}
      <section className="pt-12 pb-8 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-sky-200/60 shadow-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#0ea5e9] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
            Next-Gen Medical Intelligence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f2d5e] tracking-tight mb-4 leading-[1.1]"
        >
          QXL Intelligence Engine
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg font-medium mb-8 leading-relaxed"
        >
          Ask clinical questions, decode your lab reports, analyze prescriptions,
          and discover precision health packages with our NABL-integrated AI Assistant.
        </motion.p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-200/60 shadow-sm gap-2">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white shadow-md shadow-sky-500/20"
                : "text-slate-600 hover:text-[#0284c7] hover:bg-sky-50/50"
            }`}
          >
            <Bot className="w-4 h-4" /> Interactive AI Assistant
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white shadow-md shadow-sky-500/20"
                : "text-slate-600 hover:text-[#0284c7] hover:bg-sky-50/50"
            }`}
          >
            <Activity className="w-4 h-4" /> Capabilities & Security
          </button>
        </div>
      </section>

      {/* Main Interactive Container */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        {activeTab === "chat" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Sidebar with quick prompts & info */}
            <div className="space-y-6">
              {/* Card 1: Sample Queries */}
              <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-sky-200/50 p-6 shadow-xl shadow-sky-500/5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-sky-100/80 text-[#0284c7] flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm text-[#0f2d5e] uppercase tracking-wider">
                    Suggested Prompts
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 font-medium leading-relaxed">
                  Tap any common health query below to start the conversation:
                </p>
                <div className="space-y-2.5">
                  {SAMPLE_PROMPTS.map((prompt, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="p-3 rounded-2xl bg-sky-50/60 border border-sky-100 hover:border-sky-300 hover:bg-sky-100/50 text-xs font-semibold text-[#0369a1] cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-2">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Security & Privacy */}
              <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-sky-600 text-white p-6 shadow-xl shadow-sky-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-sky-200" />
                  <h4 className="font-extrabold text-sm uppercase tracking-wider">
                    HIPAA & ISO Certified Privacy
                  </h4>
                </div>
                <p className="text-xs text-sky-100 leading-relaxed font-medium mb-4">
                  Your chat logs and uploaded medical prescriptions are encrypted. AI suggestions are reviewed against NABL clinical benchmarks.
                </p>
                <div className="space-y-2 text-[11px] text-sky-100 font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-200" />
                    <span>End-to-end medical data encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-200" />
                    <span>Real-time test catalog matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-200" />
                    <span>Free Home Sample Collection guidance</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/upload-prescription"
                  className="w-full py-3.5 px-6 rounded-2xl bg-white border border-sky-200/80 text-[#0284c7] font-extrabold text-xs uppercase tracking-wider hover:bg-sky-50 transition-all text-center shadow-sm flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Upload Full Prescription
                </Link>
                <Link
                  href="/book"
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-600 text-white font-extrabold text-xs uppercase tracking-wider hover:shadow-lg transition-all text-center shadow-md flex items-center justify-center gap-2"
                >
                  Book Recommended Test <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* AI Chat Window Panel */}
            <div className="lg:col-span-2 rounded-3xl bg-white/90 backdrop-blur-2xl border border-sky-200/60 p-6 shadow-2xl shadow-sky-500/10 min-h-[550px] flex flex-col justify-between">
              <div className="mb-4 pb-4 border-b border-sky-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center text-white shadow-md shadow-sky-500/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base text-[#0f2d5e]">
                      QXL Clinical Assistant
                    </h2>
                    <p className="text-xs font-semibold text-[#0369a1]">
                      Ask anything about tests, packages, symptoms or reports
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-200/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live AI Active
                </span>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 bg-sky-50/40 rounded-2xl border border-sky-100 p-4 space-y-4 overflow-y-auto max-h-[380px] min-h-[320px] mb-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-br-none shadow-sm"
                          : "bg-white text-slate-800 border border-sky-100 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.action && (
                        <div className="mt-3 pt-2 border-t border-sky-100">
                          <Link
                            href={msg.action.link}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-[#0284c7] font-extrabold text-xs hover:bg-sky-100 transition-colors"
                          >
                            <span>{msg.action.text}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-sky-100 text-slate-500 text-xs w-fit">
                    <Bot className="w-4 h-4 text-[#0ea5e9] animate-spin" />
                    <span className="font-semibold">AI is analyzing clinical data...</span>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2 bg-white p-2 rounded-2xl border border-sky-200/80 shadow-inner"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask a medical question, e.g. What is included in Q-Master Health Pro?"
                  className="flex-1 px-4 py-2.5 bg-transparent text-xs sm:text-sm text-[#0f2d5e] font-semibold outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 text-white font-extrabold text-xs uppercase tracking-wider hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Ask AI</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* Overview Tab */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {AI_CAPABILITIES.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white/80 backdrop-blur-xl border border-sky-200/60 p-6 shadow-xl shadow-sky-500/5 flex flex-col justify-between hover:border-sky-400 transition-all group"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-sky-100/80 text-[#0284c7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-extrabold text-base text-[#0f2d5e] mb-2">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quality & Security Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700 text-white p-8 md:p-12 shadow-2xl shadow-sky-500/20 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest mb-4">
                  Clinical Governance & Safety
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mb-4">
                  NABL & ISO 15189 Quality Standards
                </h2>
                <p className="text-sky-100 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                  While our AI provides state-of-the-art diagnostic recommendations and report summaries, all final test evaluations, sample processing, and report sign-offs are handled by senior consultant pathologists at QXL Diagnostics.
                </p>
                <Link
                  href="/quality-accreditation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0284c7] font-extrabold text-xs uppercase tracking-wider hover:bg-sky-50 transition-all shadow-md"
                >
                  View Quality Standards <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Floating Chat widget automatically active on page */}
      <AiChat />
    </div>
  );
}
