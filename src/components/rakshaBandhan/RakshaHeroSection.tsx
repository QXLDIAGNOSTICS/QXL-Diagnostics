"use client";

import React from "react";
import { Heart, ShieldCheck, Clock, Phone, Sparkles, CheckCircle2, ArrowRight, Award, UserCheck, Stethoscope } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface RakshaHeroSectionProps {
  onOpenBooking: (packageTitle?: string) => void;
}

export default function RakshaHeroSection({ onOpenBooking }: RakshaHeroSectionProps) {
  const scrollToOffer = () => {
    const el = document.getElementById("rakhi-offer-card");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F9FC] via-white to-[#F5F9FC] pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-100">
      {/* Decorative Brand Accent Background Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00A8A8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#0A5DAA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Campaign Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/60 shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                7-DAY EXCLUSIVE OFFER
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full">
                ₹800 ONLY (WORTH ₹5,800)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              This Raksha Bandhan, <br />
              <span className="text-[#D69A18]">
                Gift Health.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
              {RAKSHA_CAMPAIGN_CONFIG.heroSubheadline}
            </p>

            {/* Key Trust Signals Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="p-2 rounded-xl bg-[#FFF8EB] text-[#D69A18]">
                  <ShieldCheck className="w-4 h-4 text-[#D69A18]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">NABL Accredited</div>
                  <div className="text-[11px] text-slate-500">Lab ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber})</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="p-2 rounded-xl bg-[#FFF8EB] text-[#D69A18]">
                  <Heart className="w-4 h-4 text-[#D69A18]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">80 Health Tests</div>
                  <div className="text-[11px] text-slate-500">Full Body Screening</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="p-2 rounded-xl bg-[#FFF8EB] text-[#D69A18]">
                  <Clock className="w-4 h-4 text-[#D69A18]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Free Home Collection</div>
                  <div className="text-[11px] text-slate-500">Across Bengaluru</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onOpenBooking()}
                className="py-4 px-8 bg-[#D69A18] hover:bg-amber-600 text-white text-base font-extrabold rounded-2xl shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-wide group cursor-pointer"
              >
                <span>BOOK YOUR HEALTH CHECK</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToOffer}
                className="py-4 px-8 bg-white border-2 border-[#0A5DAA]/20 hover:border-[#0A5DAA] text-[#0A5DAA] text-base font-bold rounded-2xl shadow-sm hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <span>VIEW RAKHI OFFER</span>
              </button>
            </div>

            {/* Call Line */}
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#00A8A8]" />
                <span>Same-Day Digital Reports</span>
              </div>
              <span className="text-slate-300">•</span>
              <a
                href={`tel:${RAKSHA_CAMPAIGN_CONFIG.contactPhoneE164}`}
                className="flex items-center gap-1.5 font-bold text-[#0A5DAA] hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {RAKSHA_CAMPAIGN_CONFIG.contactPhoneDisplay}</span>
              </a>
            </div>

          </div>

          {/* Right Campaign Visual Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Offer Floating Badge */}
              <div className="absolute -top-5 -left-5 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl shadow-xl border border-white/20 transform -rotate-3">
                <div className="text-[10px] font-bold tracking-widest uppercase text-amber-100">Raksha Bandhan Price</div>
                <div className="text-3xl font-black leading-none mt-0.5">₹800 <span className="text-xs font-normal line-through text-amber-200">₹2,400</span></div>
                <div className="text-[11px] font-bold text-amber-100 mt-1">SAVE 66% TODAY</div>
              </div>

              {/* Campaign Visual Card */}
              <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#0A5DAA] via-[#084B8A] to-[#00A8A8] text-white shadow-2xl overflow-hidden border border-white/20 text-left">
                {/* Decorative Festive Saffron Background Accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative space-y-6">
                  {/* Top Raksha Bandhan Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                        <Heart className="w-5 h-5 fill-amber-300" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-300 uppercase tracking-widest">QXL Festive Panel</div>
                        <div className="text-sm font-black text-white">Raksha Bandhan Special</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase">
                      66% OFF
                    </span>
                  </div>

                  {/* Visual Graphic Representation */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4">
                    <div className="flex items-center justify-between text-xs text-cyan-100">
                      <span className="font-semibold">Preventive Health Package</span>
                      <span className="font-extrabold text-amber-300">64 Parameters</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-xs bg-white/10 p-2.5 rounded-xl">
                        <Stethoscope className="w-4 h-4 text-cyan-300 shrink-0" />
                        <span>CBC (26) • HbA1c & Fasting Glucose (3)</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs bg-white/10 p-2.5 rounded-xl">
                        <Heart className="w-4 h-4 text-rose-300 shrink-0" />
                        <span>Lipid Profile (8) • Liver Function (11)</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs bg-white/10 p-2.5 rounded-xl">
                        <Award className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>Kidney Panel (8) • Thyroid TSH/T3/T4 (3)</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-cyan-100 font-medium">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
                        <span>Free Doorstep Collection</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <span>6-Hour Digital Report</span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor & Lab Accreditation Footer */}
                  <div className="flex items-center gap-3 bg-slate-900/40 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                    <UserCheck className="w-5 h-5 text-teal-300 shrink-0" />
                    <div className="text-xs">
                      <div className="font-bold text-white">NABL Accredited Laboratory</div>
                      <div className="text-[11px] text-cyan-200">Certificate No: {RAKSHA_CAMPAIGN_CONFIG.nablCertNumber} • Bengaluru</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking(RAKSHA_CAMPAIGN_CONFIG.offerTitle)}
                    className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>CLAIM RAKSHA BANDHAN OFFER (₹800)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
