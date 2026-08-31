"use client";

import React from "react";
import { Heart, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface EmotionalBannerProps {
  onOpenBooking: () => void;
}

export default function EmotionalBanner({ onOpenBooking }: EmotionalBannerProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-r from-[#0A5DAA] via-[#084B8A] to-[#00A8A8] text-white">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Top Festive Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-widest mx-auto">
          <HeartHandshake className="w-4 h-4 text-amber-400" />
          <span>PREVENTIVE PROMISE OF HEALTH</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight max-w-4xl mx-auto">
          Some Bonds Deserve a Lifetime of Good Health.
        </h2>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-cyan-100 font-medium max-w-2xl mx-auto leading-relaxed">
          Prioritise proactive wellness and care for your family.
        </p>

        {/* CTA Area */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="py-4 px-9 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-2xl hover:scale-105 transition-all text-base uppercase tracking-wider flex items-center justify-center gap-2 group"
          >
            <span>BOOK YOUR HEALTH CHECK</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-cyan-200">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>NABL Certified Lab ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber})</span>
          </div>
          <span className="text-cyan-400 hidden sm:inline">•</span>
          <span>Free Bengaluru Home Collection</span>
        </div>

      </div>
    </section>
  );
}
