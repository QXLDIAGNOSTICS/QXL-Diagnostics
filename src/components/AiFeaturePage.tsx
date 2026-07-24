"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  Brain,
  FileText,
  Stethoscope,
  Activity,
  ArrowRight,
  MessageSquare,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Upload,
  HeartPulse,
  Apple,
  Dumbbell,
  History,
  Settings,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import AiChat from "@/components/AiChat";

interface AiFeaturePageProps {
  title: string;
  subtitle: string;
  badge: string;
  featureKey: string;
  iconName: string;
  sampleInputPlaceholder: string;
  defaultPrompt: string;
  actionText: string;
  actionLink: string;
}

export default function AiFeaturePage({
  title,
  subtitle,
  badge,
  featureKey,
  iconName,
  sampleInputPlaceholder,
  defaultPrompt,
  actionText,
  actionLink,
}: AiFeaturePageProps) {
  const [inputText, setInputText] = useState(defaultPrompt);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  const renderIcon = () => {
    switch (iconName) {
      case "mic":
        return <Mic className="w-6 h-6 text-[#2563eb]" />;
      case "file":
        return <FileText className="w-6 h-6 text-[#2563eb]" />;
      case "stethoscope":
        return <Stethoscope className="w-6 h-6 text-[#2563eb]" />;
      case "heart":
        return <HeartPulse className="w-6 h-6 text-[#2563eb]" />;
      case "apple":
        return <Apple className="w-6 h-6 text-[#2563eb]" />;
      case "fitness":
        return <Dumbbell className="w-6 h-6 text-[#2563eb]" />;
      case "history":
        return <History className="w-6 h-6 text-[#2563eb]" />;
      case "settings":
        return <Settings className="w-6 h-6 text-[#2563eb]" />;
      default:
        return <Brain className="w-6 h-6 text-[#2563eb]" />;
    }
  };

  const handleRunAi = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText && !file) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      let aiOutput = "";
      if (featureKey.includes("finder") || featureKey.includes("test")) {
        aiOutput = `Based on your clinical input ("${inputText}"), we recommend the following diagnostic panel:\n\n• Complete Blood Count (CBC) — ₹350\n• Fasting Blood Sugar & HbA1c — ₹450\n• Thyroid Profile (T3, T4, TSH) — ₹550\n• Vitamin D3 & B12 — ₹1,200\n\nNABL Accredited · Same-Day Digital Reports · Free Home Collection in Bengaluru.`;
      } else if (featureKey.includes("recommender") || featureKey.includes("package")) {
        aiOutput = `Recommended Health Package: Q-Master Health Pro Package (₹4,600)\n\nIncludes 20 Parameters: Lipid Profile, Liver Function, Kidney Function, Thyroid Profile, Vitamin D & B12, HbA1c, CBC, and Inflammatory Markers.\n\nIdeal for annual preventative screening.`;
      } else if (featureKey.includes("explainer") || featureKey.includes("report")) {
        aiOutput = `Clinical Report Analysis:\n\n1. Hemoglobin: 14.2 g/dL (Normal)\n2. Fasting Glucose: 108 mg/dL (Mildly Elevated — Borderline Fasting Glucose)\n3. TSH: 2.4 mIU/L (Optimal)\n\nRecommendation: Repeat Fasting Blood Sugar in 3 months and maintain a low glycemic index diet.`;
      } else if (featureKey.includes("scanner") || featureKey.includes("prescription")) {
        aiOutput = `Prescription OCR Extraction:\n\nExtracted Tests:\n1. HbA1c & Fasting Glucose\n2. Lipid Profile (Total Cholesterol, HDL, LDL, Triglycerides)\n3. Serum Creatinine & eGFR\n\nAll tests are available in our Q-Screen Diabetes Package with Home Sample Collection.`;
      } else if (featureKey.includes("symptom")) {
        aiOutput = `Triage Risk Assessment: Low to Moderate Risk\n\nIdentified Symptoms: ${inputText || "General Fatigue"}\n\nSuggested Diagnostics: Full Body Checkup, Vitamin D Assessment, Thyroid Panel. Please consult a doctor if fever exceeds 101°F.`;
      } else if (featureKey.includes("voice")) {
        aiOutput = `Voice Input Processed Successfully: "${inputText}"\n\nAssistant Response: You can book your blood test online for home sample collection across Bengaluru. Call +91 99646 39639 for instant assistance.`;
      } else if (featureKey.includes("risk")) {
        aiOutput = `10-Year Cardiovascular Risk Score: 4.2% (Low Risk Category)\n\nKey Markers Evaluated: Apo-B, hs-CRP, Lipid Ratio, HbA1c. We recommend maintaining regular aerobic exercise and low saturated fat intake.`;
      } else if (featureKey.includes("nutrition")) {
        aiOutput = `AI Clinical Nutrition Plan:\n\n• Breakfast: Oats with flaxseeds, walnuts & almond milk\n• Lunch: Brown rice/Ragi ball with dal, spinach & cucumber salad\n• Evening: Green tea & roasted chana\n• Dinner: Grilled protein with steamed vegetables`;
      } else if (featureKey.includes("fitness")) {
        aiOutput = `AI Clinical Fitness Guidance:\n\n• 30 minutes brisk walking / cycling 5 days a week\n• Mobility & joint flexibility exercises\n• Posture correction & core stability routines`;
      } else {
        aiOutput = `QXL Medical AI Summary:\n\nProcessed query: "${inputText}". All tests are NABL accredited with free home collection in Bengaluru.`;
      }
      setResult(aiOutput);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-[#0f2d5e] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb / Top Banner */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/ai"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2563eb] hover:underline"
          >
            ← Back to AI Suite
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] text-[10px] font-extrabold uppercase tracking-widest border border-blue-200">
            <Sparkles className="w-3 h-3 animate-pulse" />
            {badge}
          </span>
        </div>

        {/* Feature Header */}
        <div className="bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e8f4fd] rounded-3xl p-8 border border-sky-200/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#2563eb] flex items-center justify-center shadow-md mb-3">
              {renderIcon()}
            </div>
            <h1 className="text-3xl font-extrabold text-[#0f2d5e]">{title}</h1>
            <p className="text-slate-600 text-sm font-medium max-w-xl">{subtitle}</p>
          </div>

          <Link
            href={actionLink}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2563eb] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#1d4ed8] transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            {actionText} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Interactive Feature Panel */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-sky-200/60 shadow-xl space-y-6">
          <form onSubmit={handleRunAi} className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Input Medical Details or Query
            </label>

            <div className="relative">
              <textarea
                rows={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={sampleInputPlaceholder}
                className="w-full p-4 rounded-2xl border border-sky-200 bg-sky-50/40 text-sm font-semibold text-[#0f2d5e] focus:outline-none focus:border-[#2563eb] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Optional File Upload */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-[#2563eb]" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Attach Medical File (Optional)</p>
                  <p className="text-[10px] font-semibold text-slate-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
              <label className="cursor-pointer px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                {file ? file.name : "Choose File"}
              </label>
            </div>

            {/* Submit / Run Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || (!inputText && !file)}
                className="px-8 py-3.5 rounded-2xl bg-[#2563eb] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#1d4ed8] transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Run AI Evaluation
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Result Box */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-sky-50 border border-sky-200 text-slate-800 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap space-y-4"
            >
              <div className="flex items-center gap-2 text-[#2563eb] font-extrabold uppercase tracking-wider text-xs">
                <Bot className="w-4 h-4" /> AI Evaluation Output
              </div>
              <div>{result}</div>

              <div className="pt-3 border-t border-sky-200/60 flex items-center justify-between flex-wrap gap-3">
                <span className="text-[10px] text-slate-500 font-semibold">
                  Reviewed against NABL clinical reference benchmarks.
                </span>
                <Link
                  href={actionLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition-colors"
                >
                  {actionText} →
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <AiChat />
    </div>
  );
}
