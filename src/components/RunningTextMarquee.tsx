"use client";
import React from "react";
import Link from "next/link";

export default function RunningTextMarquee() {
  const tickerItems1 = [
    "🇮🇳 QXL FREEDOM 80 CHECKUP — ONLY ₹800 (WORTH ₹5,800)",
    "🩸 BLOOD HEALTH: 25 PARAMETERS (CBC, ESR, HAEMOGLOBIN)",
    "🩺 DIABETES SCREENING: FASTING SUGAR, HbA1c & eAG",
    "🧬 LIVER FUNCTION: 12 PARAMETERS (BILIRUBIN, SGOT, SGPT)",
    "💧 KIDNEY & ELECTROLYTES: 12 PARAMETERS (CREATININE, BUN, UREA)",
    "❤️ HEART & CHOLESTEROL: 9 PARAMETERS (LIPID PROFILE)",
    "🦋 THYROID SCREEN: TSH, TOTAL T3 & TOTAL T4",
    "💪 IRON STATUS & ANAEMIA: 5 VITAL PARAMETERS",
    "🔬 COMPLETE URINE EXAMINATION: 11 PARAMETERS"
  ];

  const tickerItems2 = [
    "🩺 BENGALURU'S DOCTOR-LED DIAGNOSTIC SUPER SPECIALITY LAB",
    "🔬 NABL ACCREDITED LABORATORY (MC-6849)",
    "🏆 DR. SHANTAKUMAR MURUDA — CONSULTANT PATHOLOGIST & FOUNDER",
    "🧬 CLINICAL BIOCHEMISTRY & MOLECULAR DIAGNOSTICS",
    "🧫 MICROBIOLOGY & IMMUNOLOGY HORMONAL PANELS",
    "📍 KENGERI MAIN LAB — 3rd FLOOR, SLN COMPLEX, MYSORE ROAD",
    "📍 YELAHANKA NORTH HUB — OPPOSITE RMZ GALLERIA MALL",
    "📞 24x7 BOOKINGS & SUPPORT: +91 9964 639 639",
    "🌐 ONLINE REPORT ACCESS & AI TREND ANALYTICS"
  ];

  const tickerItems3 = [
    "🇮🇳 FREEDOM FROM UNDETECTED DIABETES & SILENT HEALTH RISKS",
    "🏠 FREE HOME SAMPLE COLLECTION ACROSS ALL BENGALURU NEIGHBORHOODS",
    "⚡ FAST 6-HOUR DIGITAL REPORT DELIVERY ON YOUR MOBILE & WHATSAPP",
    "❤️ FREEDOM FROM HIGH CHOLESTEROL & CARDIAC RISK",
    "🌿 FREEDOM FROM VITAMIN D & B12 DEFICIENCIES",
    "👨‍👩‍👧‍👦 A HEALTHY FAMILY. A STRONGER INDIA.",
    "🇮🇳 KNOW YOUR HEALTH. CELEBRATE YOUR FREEDOM.",
    "📞 CALL +91 9964 639 639 TO BOOK YOUR ₹800 CHECKUP TODAY"
  ];

  return (
    <div className="w-full flex flex-col gap-1.5 py-2.5 bg-gradient-to-r from-[#fff7ed] via-white to-[#f0fdf4] overflow-hidden border-y-2 border-amber-300/80 shadow-xs">
      
      {/* ── Line 1: Saffron Ticker (Freedom 80 Parameters - Slow Scroll) ── */}
      <div className="relative w-full overflow-hidden flex items-center bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#d97706] py-2 shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee-fast hover:[animation-play-state:paused] cursor-pointer" style={{ animationDuration: '65s' }}>
          {[...tickerItems1, ...tickerItems1].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-amber-200">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Line 2: Blue Ticker (Doctor-Led Lab & Accreditation - Slow Reverse Scroll) ── */}
      <div className="relative w-full overflow-hidden flex items-center bg-gradient-to-r from-[#2563eb] via-[#0284c7] to-[#0369a1] py-2 shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee-reverse hover:[animation-play-state:paused] cursor-pointer" style={{ animationDuration: '65s' }}>
          {[...tickerItems2, ...tickerItems2].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-sky-200">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Line 3: Green Ticker (Home Collection & Patriotic Health Freedom - Slow Scroll) ── */}
      <div className="relative w-full overflow-hidden flex items-center bg-gradient-to-r from-[#16a34a] via-[#15803d] to-[#059669] py-2 shadow-xs">
        <div className="flex whitespace-nowrap animate-marquee-fast hover:[animation-play-state:paused] cursor-pointer" style={{ animationDuration: '65s' }}>
          {[...tickerItems3, ...tickerItems3].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider mx-6">
              <span>{item}</span>
              <span className="text-emerald-200">☘</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
