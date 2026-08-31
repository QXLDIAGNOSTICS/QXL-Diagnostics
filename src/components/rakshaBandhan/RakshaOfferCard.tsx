"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, Shield, Clock, Home, ArrowRight, Info } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG, isCampaignActive } from "@/lib/rakshaBandhanConfig";

interface RakshaOfferCardProps {
  onOpenBooking: (packageTitle?: string) => void;
}

export default function RakshaOfferCard({ onOpenBooking }: RakshaOfferCardProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Auto-hide when campaign has expired — no manual code changes required after endsAt
  if (!isCampaignActive()) return null;

  const toggleCategory = (idx: number) => {
    setExpandedCategory(expandedCategory === idx ? null : idx);
  };

  return (
    <section id="rakhi-offer-card" className="py-4 sm:py-8 bg-white relative">
      <div className="max-w-[1140px] mx-auto px-3 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10.5px] sm:text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D69A18]" />
            <span>SPECIAL PREVENTIVE OFFER</span>
          </div>
        </div>

        {/* Offer Card Container — 2-Column Responsive Layout on Desktop */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F3DBA7] shadow-lg overflow-hidden relative max-w-xl lg:max-w-none mx-auto">
          
          {/* Top Banner Ribbon */}
          <div className="bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#15803d] p-3.5 sm:p-5 text-white px-4 sm:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 relative overflow-hidden text-left border-b border-emerald-700/50">
            <div className="flex flex-wrap items-center gap-2 z-10">
              <span className="p-1 px-2.5 rounded-lg bg-[#D69A18] text-white font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-2xs shrink-0">
                ✨ SPECIAL OFFER
              </span>
              <h2 className="font-black text-sm sm:text-lg !text-white leading-tight">
                {RAKSHA_CAMPAIGN_CONFIG.offerTitle}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-[10.5px] sm:text-xs font-mono font-bold text-emerald-100 bg-black/25 px-3 py-1 rounded-full border border-emerald-300/30 z-10 w-fit shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{RAKSHA_CAMPAIGN_CONFIG.offerValidityText}</span>
            </div>
          </div>

          {/* Card Content Body: 1 Column on Mobile / 2 Columns on Desktop */}
          <div className="p-4 sm:p-6 lg:p-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
            
            {/* Left Column (Desktop: 7 Cols) — Campaign Overview & Parameter Breakdown */}
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1 mt-4 lg:mt-0">
              <div className="bg-[#FFF8EB] p-4 rounded-2xl border border-[#F3DBA7] space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#D69A18] shrink-0" />
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    NABL Certified &amp; Doctor-Led Diagnostics
                  </h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  Includes full body screening covering 80 essential blood parameters — Complete Hemogram (CBC), Thyroid Profile (TSH, T3, T4), Lipid Profile, Liver &amp; Kidney Function Tests, Diabetes Screening (HbA1c &amp; FBS), Vitamin D3 &amp; B12.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Included Health Tests ({RAKSHA_CAMPAIGN_CONFIG.parameterCount} Parameters)
                  </h3>
                  <span className="text-[11px] text-[#D69A18] font-bold">Tap to inspect</span>
                </div>

                <div className="space-y-2.5">
                  {RAKSHA_CAMPAIGN_CONFIG.packageInclusions.map((cat, idx) => {
                    const isExpanded = expandedCategory === idx || (typeof window !== 'undefined' && window.innerWidth >= 1024 && expandedCategory === null && idx === 0);
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleCategory(idx)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-amber-50/40 transition-colors gap-2 cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <CheckCircle2 className="w-4.5 h-4.5 text-[#D69A18] shrink-0" />
                            <span className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">{cat.category}</span>
                            <span className="shrink-0 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#FFF8EB] text-[#D69A18] text-[10px] font-extrabold border border-[#F3DBA7]">
                              {cat.count} Tests
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#D69A18] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                              {cat.items.map((test, tIdx) => (
                                <div key={tIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D69A18] shrink-0" />
                                  <span className="text-xs leading-snug font-medium text-slate-700">{test}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Disclaimer Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[10.5px] text-slate-400 text-left font-medium">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <p>{RAKSHA_CAMPAIGN_CONFIG.disclaimerText}</p>
              </div>
            </div>

            {/* Right Column (Desktop: 5 Cols) — Pricing & Quick Action Box */}
            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24">
              <div className="bg-[#FFFBF0] p-3.5 sm:p-6 rounded-2xl border border-[#F3DBA7] shadow-sm text-left space-y-3.5">
                
                {/* Tag Pill */}
                <div className="p-2 px-3 bg-[#FFF8EB] border border-[#F3DBA7] rounded-xl text-[11px] font-bold text-[#D69A18] flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 font-extrabold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D69A18] shrink-0" />
                    <span>SPECIAL PREVENTIVE OFFER</span>
                  </span>
                  <span className="bg-[#D69A18] text-white px-2.5 py-0.5 rounded-md text-[10px] font-black shrink-0">₹800 ONLY</span>
                </div>

                {/* Pricing row */}
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-4xl font-black text-slate-900">
                      {RAKSHA_CAMPAIGN_CONFIG.currencySymbol}{RAKSHA_CAMPAIGN_CONFIG.specialPrice}
                    </span>
                    <span className="text-sm sm:text-lg font-bold text-slate-400 line-through">
                      {RAKSHA_CAMPAIGN_CONFIG.currencySymbol}{RAKSHA_CAMPAIGN_CONFIG.originalPrice}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] sm:text-xs whitespace-nowrap shadow-2xs shrink-0 max-w-full truncate">
                    {RAKSHA_CAMPAIGN_CONFIG.discountBadgeText}
                  </span>
                </div>

                {/* Free Home Sample Collection Box */}
                <div className="p-2.5 bg-[#FFF8EB] border border-[#F3DBA7] rounded-xl text-xs font-extrabold text-[#D69A18] flex items-center gap-2">
                  <Home className="w-4 h-4 shrink-0 text-[#D69A18]" />
                  <span>Free Home Sample Collection Included</span>
                </div>

                {/* Parameters & Accreditation Specs Table */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between items-center py-1 gap-2">
                    <span className="text-slate-500 shrink-0">Parameters:</span>
                    <span className="font-extrabold text-slate-900 text-right">{RAKSHA_CAMPAIGN_CONFIG.parameterCount} Health Parameters</span>
                  </div>
                  <div className="flex justify-between items-center py-1 gap-2">
                    <span className="text-slate-500 shrink-0">Accreditation:</span>
                    <span className="font-extrabold text-slate-900 text-right">NABL ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber})</span>
                  </div>
                  <div className="flex justify-between items-center py-1 gap-2">
                    <span className="text-slate-500 shrink-0">Report Delivery:</span>
                    <span className="font-extrabold text-slate-900 text-right">6–12 Hours (WhatsApp &amp; Email)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 gap-2">
                    <span className="text-slate-500 shrink-0">Fasting:</span>
                    <span className="font-extrabold text-slate-900 text-right">10–12 Hours Fasting</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onOpenBooking(RAKSHA_CAMPAIGN_CONFIG.offerTitle)}
                  className="w-full py-3 px-5 bg-[#D69A18] hover:bg-[#b88313] text-white font-black rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider group cursor-pointer"
                  style={{ color: '#ffffff' }}
                >
                  <span>BOOK PACKAGE @ ₹800</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
