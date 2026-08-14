"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Heart, 
  Activity, 
  Droplet, 
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Flame,
  Award
} from "lucide-react";
import { WHATSAPP_LINK } from "../lib/businessInfo";

const healthAreas = [
  {
    id: "blood",
    title: "General Health & Anaemia",
    subtitle: "Blood Health",
    parametersCount: 25,
    icon: Activity,
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-600",
    description: "Complete Blood Count (CBC) including Haemoglobin, RBC, WBC, Platelets, Differential Count, Hematocrit, MCV, MCH, MCHC, ESR & Iron profile indicators to detect anaemia, infection and blood disorders.",
    testsList: [
      "Haemoglobin (Hb)", "Total WBC Count", "RBC Count", "Platelet Count",
      "Packed Cell Volume (PCV/HCT)", "MCV", "MCH", "MCHC", "RDW",
      "Neutrophils", "Lymphocytes", "Eosinophils", "Monocytes", "Basophils",
      "Erythrocyte Sedimentation Rate (ESR)", "Absolute Neutrophil Count",
      "Absolute Lymphocyte Count", "Absolute Eosinophil Count", "Absolute Monocyte Count",
      "Peripheral Smear Examination", "RBC Morphology", "Platelet Morphology",
      "Infection & Inflammation Marker Screen", "Anaemia Severity Screen", "Oxygen Carrying Index"
    ]
  },
  {
    id: "diabetes",
    title: "Diabetes & Blood Sugar Health",
    subtitle: "Diabetes Screening",
    parametersCount: 3,
    icon: Droplet,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-600",
    description: "Screening for prediabetes, early-stage type 2 diabetes, and estimated average blood glucose levels.",
    testsList: [
      "Fasting Blood Sugar (FBS)", 
      "HbA1c (Glycated Haemoglobin)", 
      "Estimated Average Glucose (eAG)"
    ]
  },
  {
    id: "liver",
    title: "Liver Health",
    subtitle: "Liver Function Test (LFT)",
    parametersCount: 12,
    icon: Sparkles,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-600",
    description: "Comprehensive assessment of liver cell health, bile flow, fatty liver indicators, and protein synthesis capacity.",
    testsList: [
      "SGOT / AST", "SGPT / ALT", "Serum Bilirubin (Total)", "Serum Bilirubin (Direct)",
      "Serum Bilirubin (Indirect)", "Alkaline Phosphatase (ALP)", "Total Protein",
      "Serum Albumin", "Serum Globulin", "Albumin / Globulin Ratio (A/G Ratio)",
      "Gamma-GT (GGT)", "Liver Enzyme Stress Index"
    ]
  },
  {
    id: "kidney",
    title: "Kidney Health",
    subtitle: "Kidney Function & Electrolytes",
    parametersCount: 12,
    icon: ShieldCheck,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    description: "Evaluates renal filtration rate, nitrogenous waste accumulation, electrolyte balance, and fluid regulation.",
    testsList: [
      "Serum Creatinine", "Blood Urea", "Blood Urea Nitrogen (BUN)", "BUN / Creatinine Ratio",
      "Serum Uric Acid", "Serum Sodium (Na+)", "Serum Potassium (K+)", "Serum Chloride (Cl-)",
      "Glomerular Filtration Rate (eGFR Indicator)", "Serum Calcium", "Serum Phosphorus", "Kidney Electrolyte Index"
    ]
  },
  {
    id: "heart",
    title: "Heart & Cholesterol Health",
    subtitle: "Lipid Profile & Cardiac Risk",
    parametersCount: 9,
    icon: Heart,
    color: "from-red-500 to-rose-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    description: "Full lipid panel profiling good cholesterol, bad cholesterol, triglycerides, and atherosclerosis risk ratios.",
    testsList: [
      "Total Cholesterol", "Triglycerides", "HDL Cholesterol (Good)", "LDL Cholesterol (Bad)",
      "VLDL Cholesterol", "Total Cholesterol / HDL Ratio", "LDL / HDL Ratio",
      "Non-HDL Cholesterol", "Atherogenic Index"
    ]
  },
  {
    id: "thyroid",
    title: "Thyroid Health",
    subtitle: "Thyroid Profile",
    parametersCount: 3,
    icon: Sparkles,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    description: "Evaluates thyroid gland activity to detect hypothyroidism, hyperthyroidism, and metabolic slow-down.",
    testsList: [
      "Thyroid Stimulating Hormone (TSH)", 
      "Total Triiodohydronine (T3)", 
      "Total Thyroxine (T4)"
    ]
  },
  {
    id: "iron",
    title: "Bone, Mineral & Joint Health",
    subtitle: "Iron Status & Minerals",
    parametersCount: 5,
    icon: Award,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-600",
    description: "Assesses iron stores, total iron binding capacity, and essential bone mineral reserves.",
    testsList: [
      "Serum Iron", "Total Iron Binding Capacity (TIBC)", 
      "Transferrin Saturation Percentage", "Serum Calcium", "Serum Phosphorus"
    ]
  },
  {
    id: "urinary",
    title: "Urinary Health",
    subtitle: "Complete Urine Examination",
    parametersCount: 11,
    icon: Activity,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    textColor: "text-sky-600",
    description: "Screening for urinary tract infection (UTI), kidney stone crystals, micro-proteinuria, and metabolic waste.",
    testsList: [
      "Urine Color & Clarity", "Specific Gravity", "Urine pH", "Urine Protein / Albumin",
      "Urine Glucose / Sugar", "Urine Ketones", "Urine Bilirubin", "Urobilinogen",
      "Pus Cells / Leucocytes", "Epithelial Cells", "Crystals & Casts Screen"
    ]
  }
];

export default function Freedom80Section() {
  const [expandedArea, setExpandedArea] = useState<string | null>("blood");
  const [showAllModal, setShowAllModal] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedArea(prev => prev === id ? null : id);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Flag Theme Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
        
        {/* Banner Header — LIGHT THEME */}
        <div className="bg-gradient-to-br from-[#f8fafc] via-white to-[#eff6ff] rounded-3xl p-6 sm:p-10 text-[#0f2d5e] shadow-xl relative overflow-hidden border border-sky-200/80 mb-10">
          
          {/* Animated Ashoka Chakra Background Graphic (Light) */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-[0.06] pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#000080" strokeWidth="2" />
              {[...Array(24)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
                  y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
                  stroke="#000080"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 via-white to-emerald-600 p-[1px] rounded-full shadow-sm">
                <div className="bg-white px-4 py-1.5 rounded-full flex items-center gap-2 border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                  <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#0f2d5e] uppercase">
                    🇮🇳 CELEBRATING INDIA'S 80TH INDEPENDENCE DAY 🇮🇳
                  </span>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#0f2d5e]">
                QXL FREEDOM <span className="text-[#2563eb]">80</span> HEALTH CHECK
              </h2>

              <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
                Empower your family with complete health freedom. One comprehensive preventive checkup covering 
                <strong className="text-[#0f2d5e]"> 80 Health Parameters</strong> across <strong className="text-[#0f2d5e]">8 Major Health Areas</strong>.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex items-center gap-2 bg-white/90 border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-xs font-extrabold text-[#0f2d5e]">80 Health Parameters</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-extrabold text-[#0f2d5e]">8 Major Health Areas</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-extrabold text-[#0f2d5e]">NABL Accredited Lab</span>
                </div>
              </div>
            </div>

            {/* Price Box — LIGHT THEME */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 text-center min-w-[280px] sm:min-w-[320px] shadow-xl relative">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                SPECIAL INDEPENDENCE OFFER
              </span>
              
              <div className="mt-4">
                <span className="text-slate-400 text-sm line-through font-bold block mb-1">
                  Regular Value: ₹5,800
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-black text-amber-500">₹</span>
                  <span className="text-5xl sm:text-6xl font-black text-[#0f2d5e] tracking-tight">800</span>
                </div>
                <span className="text-xs text-emerald-600 font-extrabold block mt-1">
                  SAVE ₹5,000 (86% OFF)
                </span>
              </div>

              <div className="mt-6 space-y-2.5">
                <Link
                  href="/book?package=QXL%20Freedom%2080%20Health%20Check"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-wider"
                >
                  <span>Book Now at ₹800</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`${WHATSAPP_LINK}&text=${encodeURIComponent("Hi QXL Diagnostics, I want to book the QXL Freedom 80 Health Check offer for ₹800.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-6 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-slate-500 mt-4 leading-tight">
                *Fasting for 8–10 hours recommended. Free Home Sample Collection available across Bengaluru.
              </p>
            </div>
          </div>
        </div>

        {/* 8 Major Health Areas Title */}
        <div className="text-center mb-8">
          <span className="inline-block bg-orange-100 text-orange-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2 border border-orange-200">
            80 Parameters Breakdown
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0f2d5e]">
            8 Major Health Areas Screened
          </h3>
          <p className="text-slate-600 text-sm font-medium mt-1">
            Click on any health area to explore all included parameters.
          </p>
        </div>

        {/* 8 Health Areas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {healthAreas.map((area) => {
            const Icon = area.icon;
            const isExpanded = expandedArea === area.id;

            return (
              <div
                key={area.id}
                onClick={() => toggleExpand(area.id)}
                className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between ${
                  isExpanded ? `${area.borderColor} ring-2 ring-blue-400/30` : "border-slate-200"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${area.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${area.textColor}`} />
                    </div>
                    <span className="bg-slate-100 text-slate-700 font-extrabold text-[11px] px-2.5 py-1 rounded-full">
                      {area.parametersCount} Parameters
                    </span>
                  </div>

                  <h4 className="font-extrabold text-[#0f2d5e] text-base leading-snug mb-1">
                    {area.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {area.subtitle}
                  </p>
                </div>

                <div className={`px-5 py-3 border-t bg-slate-50/80 flex items-center justify-between text-xs font-bold ${area.textColor}`}>
                  <span>{isExpanded ? "Hide Parameters" : "View Parameters"}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                {/* Expanded Parameter Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-600"
                    >
                      <p className="font-medium text-slate-700 mb-3 leading-relaxed">
                        {area.description}
                      </p>
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                          Included Tests ({area.testsList.length}):
                        </span>
                        {area.testsList.map((test, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{test}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* View All 80 Parameters Trigger Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAllModal(true)}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#0f2d5e] hover:bg-slate-50 font-extrabold px-6 py-3 rounded-2xl shadow-sm transition-all text-xs uppercase tracking-wider cursor-pointer"
          >
            <span>View Full List of All 80 Parameters</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Modal for All 80 Parameters */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Full Parameter Checklist
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0f2d5e] mt-1">
                    QXL Freedom 80 — All 80 Parameters
                  </h3>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-extrabold text-xl p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {healthAreas.map((area) => (
                  <div key={area.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <h4 className="font-extrabold text-[#0f2d5e] text-sm mb-2 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${area.textColor.replace("text-", "bg-")}`} />
                      {area.title} ({area.parametersCount} Parameters)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {area.testsList.map((test, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{test}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-bold block">Freedom 80 Offer Price</span>
                  <span className="text-2xl font-black text-[#0f2d5e]">₹800 <span className="text-xs text-slate-400 line-through font-normal">₹5,800</span></span>
                </div>
                <Link
                  href="/book?package=QXL%20Freedom%2080%20Health%20Check"
                  onClick={() => setShowAllModal(false)}
                  className="w-full sm:w-auto bg-[#2563eb] text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg hover:bg-blue-700 transition-all text-xs uppercase tracking-wider text-center"
                >
                  Book Freedom 80 Package
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
