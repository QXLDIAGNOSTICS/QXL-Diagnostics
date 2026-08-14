"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Freedom80Breakdown() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    {
      title: "Blood Health — 25 Parameters",
      count: 25,
      icon: "🩸",
      desc: "Complete Blood Count (CBC) including Haemoglobin, RBC, WBC, Platelet count, Differential count, PCV/HCT, MCV, MCH, MCHC, RDW, Neutrophils, Lymphocytes, Eosinophils, Monocytes, Basophils, ESR, Peripheral Smear & RBC Morphology."
    },
    {
      title: "Diabetes Screening — 3 Parameters",
      count: 3,
      icon: "🩺",
      desc: "Fasting Blood Sugar (FBS), HbA1c (Glycated Haemoglobin) & Estimated Average Glucose (eAG) for 3-month glycemic evaluation."
    },
    {
      title: "Liver Health — 12 Parameters",
      count: 12,
      icon: "🧬",
      desc: "Liver Function Test (LFT) including Bilirubin Total, Direct & Indirect, SGOT/AST, SGPT/ALT, Alkaline Phosphatase (ALP), Total Protein, Albumin, Globulin, A/G Ratio & Gamma-GT."
    },
    {
      title: "Kidney & Electrolytes — 12 Parameters",
      count: 12,
      icon: "💧",
      desc: "Kidney Function Test (KFT) including Serum Creatinine, Blood Urea Nitrogen (BUN), Urea, Uric Acid, Serum Sodium, Potassium, Chloride, Calcium & Phosphorus."
    },
    {
      title: "Heart & Cholesterol Health — 9 Parameters",
      count: 9,
      icon: "❤️",
      desc: "Lipid Profile including Total Cholesterol, HDL (Good), LDL (Bad), VLDL, Triglycerides, Non-HDL Cholesterol & Coronary Risk Ratios."
    },
    {
      title: "Thyroid Health — 3 Parameters",
      count: 3,
      icon: "🦋",
      desc: "Thyroid Screen (TSH - Thyroid Stimulating Hormone, Total T3 & Total T4) for metabolic and endocrine balance."
    },
    {
      title: "Iron Status — 5 Parameters",
      count: 5,
      icon: "💪",
      desc: "Serum Iron, Total Iron Binding Capacity (TIBC), Unsaturated Iron Binding Capacity (UIBC), Transferrin Saturation % & Anaemia severity markers."
    },
    {
      title: "Complete Urine Examination — 11 Parameters",
      count: 11,
      icon: "🔬",
      desc: "Physical, chemical & microscopic examination including Urine Protein, Glucose, Bilirubin, Urobilinogen, Specific Gravity, pH, Leukocytes, Nitrite, Epithelial Cells, Pus Cells & RBCs."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-sky-50/40 to-emerald-50/30 relative">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#2563eb] text-amber-400 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">
            <span>🇮🇳</span> 80 PARAMETERS DETAILED BREAKDOWN
          </span>
          <h2 className="text-[#0284c7] text-3xl md:text-4xl font-black mb-4">
            What Does the Freedom 80 Health Check Include?
          </h2>
          <p className="text-slate-600 font-bold text-base md:text-lg">
            Comprehensive organ system evaluation verified by consultant pathologists in Bengaluru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Accordion List */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {categories.map((cat, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={cat.title}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#2563eb] shadow-md"
                      : "bg-white/80 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="font-extrabold text-[#0284c7] text-base md:text-lg">
                        {cat.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="bg-sky-100 text-[#0284c7] font-black text-xs px-2.5 py-1 rounded-full">
                        {cat.count} Tests
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#2563eb]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 font-medium"
                      >
                        {cat.desc}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Summary Badge Card — Light Green, White & Light Blue Theme */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-gradient-to-br from-[#f0fdf4] via-white to-[#e0f2fe] text-slate-900 p-8 rounded-3xl shadow-xl relative overflow-hidden text-center border-4 border-emerald-400/60">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="inline-block bg-emerald-600 text-white font-black text-xs uppercase px-3.5 py-1 rounded-full mb-4 tracking-wider shadow-sm">
                FULL SCREENING
              </div>
              <h3 className="text-3xl font-black text-[#0284c7] mb-2">TOTAL: 80 PARAMETERS</h3>
              <p className="text-emerald-800 text-sm font-bold mb-6">
                8 Major Health Areas · NABL Certified Quality · Fast 6-Hour Reports
              </p>

              <div className="bg-emerald-50/80 rounded-2xl p-4 mb-6 border border-emerald-200 shadow-sm">
                <div className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">Independence Day Offer Price</div>
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-4xl font-black text-amber-600">₹800</span>
                  <span className="text-lg text-slate-400 line-through font-semibold">₹5,800</span>
                  <span className="text-xs font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md">86% OFF</span>
                </div>
              </div>

              <Link
                href="/book?package=QXL%20Freedom%2080%20Health%20Check"
                className="w-full block bg-gradient-to-r from-amber-500 via-[#0284c7] to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-black py-4 rounded-2xl text-base shadow-lg hover:shadow-xl active:scale-95 transition-all text-center uppercase tracking-wider"
              >
                Book Freedom 80 Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
