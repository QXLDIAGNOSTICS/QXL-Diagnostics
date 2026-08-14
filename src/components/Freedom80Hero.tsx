"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Freedom80Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-sky-50/30 to-white py-12 lg:py-16">
      {/* Subtle Ashoka Chakra Watermark background animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
        <svg className="w-[600px] h-[600px] animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="#000080" strokeWidth="0.5">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="10" fill="#000080" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Copy & Price Tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Independence Badge with Premium Glow */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white px-5 py-2 rounded-full text-[11px] sm:text-xs font-black tracking-widest uppercase mb-6 shadow-[0_8px_20px_-4px_rgba(16,185,129,0.5)] border border-emerald-300/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12 transform -translate-x-full" />
              <span className="text-sm">🇮🇳</span> INDIA'S 80th INDEPENDENCE DAY SPECIAL
            </div>

            {/* Main Title with Premium Spacing */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#0284c7] tracking-tight leading-[1.1] mb-4 drop-shadow-sm">
              QXL FREEDOM 80 HEALTH CHECK
            </h1>

            <p className="text-xl sm:text-3xl lg:text-4xl font-black text-emerald-600 mb-8 leading-snug drop-shadow-sm">
              80 PARAMETERS AT ONLY ₹800
            </p>

            {/* Premium Price Box with Tricolour Gradient Border */}
            <div className="bg-white/95 rounded-[2rem] p-1 shadow-[0_20px_50px_-12px_rgba(2,132,199,0.15)] mb-8 backdrop-blur-xl w-full max-w-md relative group">
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-white to-emerald-400 rounded-[2rem] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white/95 rounded-[1.8rem] p-6 h-full flex flex-col justify-center border border-white/50 shadow-inner">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> SPECIAL OFFER PRICE
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl sm:text-6xl font-black text-[#0284c7] tracking-tighter">₹800</span>
                  <span className="text-xl text-slate-400 line-through font-bold decoration-2">₹5,800</span>
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase shadow-md shadow-emerald-500/20">
                    SAVE 86%
                  </span>
                </div>
                <p className="text-[13px] font-bold text-slate-500 leading-relaxed">
                  Market / Regular Value: ₹5,800 · Available at all Bengaluru centres & free home collection.
                </p>
              </div>
            </div>

            {/* CTAs — Solid Blue Button with White Text */}
            <div className="flex flex-wrap items-center gap-3 mb-6 w-full">
              <Link
                href="/book?package=QXL%20Freedom%2080%20Health%20Check"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black px-8 py-4 rounded-full text-base shadow-xl active:scale-95 transition-all uppercase tracking-wider text-center cursor-pointer"
              >
                Book Now @ ₹800 →
              </Link>
              <a
                href="#freedom80-details"
                className="bg-white border-2 border-slate-200 text-slate-900 font-black px-6 py-4 rounded-full text-sm hover:bg-slate-50 transition-all text-center shadow-sm uppercase tracking-wider"
              >
                View Details
              </a>
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-2 text-slate-600 font-extrabold text-sm italic border-l-4 border-emerald-500 pl-3">
              “The Freedom to Know Your Health.”
            </div>
          </motion.div>

          {/* Right Column: Realistic Family Photo with Tricolour Ribbon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Tricolour Ribbon animation layer */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/30 via-white/50 to-emerald-500/30 rounded-[36px] blur-xl animate-tricolour-wave pointer-events-none" />

            <div className="relative rounded-[32px] overflow-hidden border-8 border-white shadow-2xl bg-white">
              <img
                src="https://res.cloudinary.com/btjglif5/image/upload/v1784150179/Assets-QXL/legacy-assets/image/family_clinic_consult.jpg"
                alt="Indian Family Health Checkup Freedom 80"
                className="w-full h-[440px] sm:h-[480px] object-cover"
              />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">🇮🇳 FREEDOM 80 CHECKUP</div>
                  <div className="text-sm font-extrabold text-[#0f2d5e]">Grandparent · Parents · Young Adult</div>
                </div>
                <span className="bg-[#2563eb] text-white font-black text-xs px-3 py-1.5 rounded-full shadow-xs">
                  ₹800 Only
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
