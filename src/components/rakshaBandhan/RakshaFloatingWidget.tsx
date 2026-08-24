"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, Gift } from "lucide-react";

export default function RakshaFloatingWidget() {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState({ d: 7, h: 12, m: 45, s: 30 });

  useEffect(() => {
    const targetDate = new Date("2026-08-31T23:59:59+05:30").getTime();
    
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      setCountdown({ d, h, m, s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Raksha Bandhan offer widget" className="fixed bottom-24 right-4 z-[99] hidden lg:flex flex-col items-end gap-2 group animate-in fade-in slide-in-from-bottom-6 duration-500">
      
      {/* Floating Sparkle Card */}
      <div className="relative bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-0.5 rounded-2xl shadow-2xl animate-rakhi-glow transition-all hover:scale-105">
        
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -left-2 bg-slate-900 text-white rounded-full p-1 shadow-md hover:bg-rose-600 transition-colors z-20"
          aria-label="Close widget"
        >
          <X className="w-3 h-3" />
        </button>

        <Link
          href="/raksha-bandhan-health-checkup-bangalore"
          className="relative bg-slate-950 text-white p-3.5 rounded-[14px] flex items-center gap-3 overflow-hidden block"
        >
          {/* Animated Background Shimmer Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent animate-shimmer-sweep pointer-events-none" />

          {/* Animated Golden Rakhi Mandala Icon */}
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            {/* Spinning Mandala Motif */}
            <svg className="w-10 h-10 text-amber-400 animate-rakhi-spin" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M50 0 L55 20 L50 25 L45 20 Z" />
              <path d="M100 50 L80 55 L75 50 L80 45 Z" />
              <path d="M50 100 L45 80 L50 75 L55 80 Z" />
              <path d="M0 50 L20 45 L25 50 L20 55 Z" />
              <circle cx="50" cy="50" r="22" className="text-amber-500" />
              <circle cx="50" cy="50" r="14" className="text-red-600" />
              <circle cx="50" cy="50" r="6" className="text-amber-300" />
            </svg>
            <Gift className="w-4 h-4 text-white absolute z-10 animate-bounce" />
          </div>

          {/* Text Content */}
          <div className="flex flex-col text-left pr-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-black tracking-widest uppercase">
              <Sparkles className="w-3 h-3 animate-pulse text-amber-300" />
              <span>Raksha Bandhan @ ₹800</span>
            </div>
            
            <div className="text-white text-xs font-black tracking-tight leading-tight flex items-center gap-2 mt-0.5">
              <span>80 Tests · Save ₹5,000</span>
            </div>

            {/* Dynamic Live Ticking Timer */}
            <div className="mt-1 flex items-center gap-1 text-[10px] font-mono text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
              <span>ENDS IN:</span>
              <span className="text-white">{countdown.d}d {String(countdown.h).padStart(2, '0')}h {String(countdown.m).padStart(2, '0')}m {String(countdown.s).padStart(2, '0')}s</span>
            </div>
          </div>

          {/* CTA Badge Button */}
          <span className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black px-2.5 py-1.5 rounded-xl uppercase tracking-wider shrink-0 shadow-sm transition-transform group-hover:scale-105">
            CLAIM →
          </span>
        </Link>
      </div>
    </aside>
  );
}
