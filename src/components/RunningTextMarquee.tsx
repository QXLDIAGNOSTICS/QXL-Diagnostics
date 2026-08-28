"use client";
import React from "react";
import Link from "next/link";

export default function RunningTextMarquee() {
  const tickerItems1 = [
    "🩺 BENGALURU'S DOCTOR-LED DIAGNOSTIC SUPER SPECIALITY LAB",
    "🩸 FULL BODY HEALTH CHECKUPS & SPECIALIZED BLOOD TESTS",
    "🩺 DIABETES SCREENING: FASTING SUGAR, HbA1c & eAG",
    "🧬 LIVER FUNCTION TESTS (BILIRUBIN, SGOT, SGPT)",
    "💧 KIDNEY & ELECTROLYTES SCREENING (CREATININE, BUN, UREA)",
    "❤️ HEART & CHOLESTEROL: ADVANCED LIPID PROFILE",
    "🦋 THYROID SCREEN: TSH, TOTAL T3 & TOTAL T4",
    "💪 IRON STATUS & ANAEMIA SCREENING",
    "🔬 COMPLETE URINE ROUTINE & MICROSCOPY"
  ];

  const tickerItems2 = [
    "🔬 NABL ACCREDITED LABORATORY (MC-6849)",
    "🏆 DR. SHANTAKUMAR MURUDA — CLINICAL BIOCHEMIST (MD) & FOUNDER",
    "🧬 CLINICAL BIOCHEMISTRY & MOLECULAR DIAGNOSTICS",
    "🧫 MICROBIOLOGY & IMMUNOLOGY HORMONAL PANELS",
    "📍 KENGERI MAIN LAB — 3rd FLOOR, SLN COMPLEX, MYSORE ROAD",
    "📍 YELAHANKA NORTH HUB — OPPOSITE RMZ GALLERIA MALL",
    "📞 24x7 ONLINE BOOKING & SUPPORT: +91 9964 639 639",
    "🌐 ONLINE REPORT ACCESS & QUALITY SYSTEMS"
  ];

  const tickerItems3 = [
    "🏠 FREE HOME SAMPLE COLLECTION ACROSS ALL BENGALURU NEIGHBORHOODS",
    "⚡ FAST 6-HOUR DIGITAL REPORT DELIVERY ON YOUR MOBILE & WHATSAPP",
    "❤️ PREVENTIVE HEALTH SCREENING FOR HIGH CHOLESTEROL & CARDIAC RISK",
    "🌿 VITAMIN D3 & B12 DEFICIENCY TESTING",
    "👨‍👩‍👧‍👦 COMPREHENSIVE FAMILY WELLNESS CHECKUPS",
    "📞 CALL +91 9964 639 639 TO BOOK YOUR HEALTH CHECKUP TODAY"
  ];

  return (
    <div className="w-full flex flex-col gap-1.5 py-2.5 bg-slate-100 overflow-hidden border-y border-slate-200 shadow-xs">
      
      {/* ── Line 1: Blue Ticker (Diagnostic Tests) ── */}
      <div className="relative w-full overflow-hidden flex items-center bg-[#0f2d5e] py-2 shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee-fast hover:[animation-play-state:paused] cursor-pointer" style={{ animationDuration: '65s' }}>
          {tickerItems1.map((item, idx) => (
            <span key={`t1-p-${idx}`} className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-blue-300">★</span>
            </span>
          ))}
          {tickerItems1.map((item, idx) => (
            <span key={`t1-d-${idx}`} aria-hidden="true" className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-blue-300">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Line 2: Sky Blue Ticker (Doctor-Led Lab & Accreditation) ── */}
      <div className="relative w-full overflow-hidden flex items-center bg-[#38b6f4] py-2 shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee-reverse hover:[animation-play-state:paused] cursor-pointer" style={{ animationDuration: '65s' }}>
          {tickerItems2.map((item, idx) => (
            <span key={`t2-p-${idx}`} className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-sky-100">✦</span>
            </span>
          ))}
          {tickerItems2.map((item, idx) => (
            <span key={`t2-d-${idx}`} aria-hidden="true" className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-sky-100">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Line 3: Vibrant Blue Ticker (Home Collection) ── */}
      <div className="relative w-full overflow-hidden flex items-center bg-[#0284c7] py-2 shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee-fast hover:[animation-play-state:paused] cursor-pointer" style={{ animationDuration: '65s' }}>
          {tickerItems3.map((item, idx) => (
            <span key={`t3-p-${idx}`} className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-sky-200">☘</span>
            </span>
          ))}
          {tickerItems3.map((item, idx) => (
            <span key={`t3-d-${idx}`} aria-hidden="true" className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-sky-200">☘</span>
            </span>
          ))}
        </div>
      </div>


    </div>
  );
}
