"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, Shield, Clock, Home, ArrowRight, Info } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface RakshaOfferCardProps {
  onOpenBooking: (packageTitle?: string) => void;
}

export default function RakshaOfferCard({ onOpenBooking }: RakshaOfferCardProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const toggleCategory = (idx: number) => {
    setExpandedCategory(expandedCategory === idx ? null : idx);
  };

  return (
    <section id="rakhi-offer-card" className="py-4 sm:py-8 bg-white relative">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10.5px] sm:text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D69A18]" />
            <span>FESTIVE CAMPAIGN OFFER</span>
          </div>
        </div>

        {/* Offer Card Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F3DBA7] shadow-lg overflow-hidden relative max-w-xl mx-auto">
          
          {/* Top Banner Ribbon */}
          <div className="bg-gradient-to-r from-[#15803d] via-[#16a34a] to-[#15803d] p-3.5 sm:p-4 text-white px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 relative overflow-hidden text-left">
            <div className="flex flex-wrap items-center gap-2 z-10">
              <span className="p-1 px-2 rounded-lg bg-[#D69A18] text-white font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-2xs shrink-0">
                🎁 RAKSHA BANDHAN OFFER
              </span>
              <h2 className="font-black text-sm sm:text-base !text-white leading-tight">
                {RAKSHA_CAMPAIGN_CONFIG.offerTitle}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-[10.5px] sm:text-xs font-mono font-bold text-emerald-100 bg-black/25 px-2.5 py-1 rounded-full border border-emerald-300/30 z-10 w-fit shrink-0">
              <Clock className="w-3 h-3 text-emerald-300" />
              <span>{RAKSHA_CAMPAIGN_CONFIG.offerValidityText}</span>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Pricing & Quick Highlights Card */}
            <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs text-left space-y-3">
              
              {/* Tag Pill */}
              <div className="p-1.5 px-2.5 bg-[#FFF8EB] border border-[#F3DBA7] rounded-lg text-[10.5px] font-bold text-[#D69A18] flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 font-extrabold text-[10px] sm:text-[11px]">
                  <Sparkles className="w-3 h-3 text-[#D69A18] shrink-0" />
                  <span>7-DAY EXCLUSIVE OFFER</span>
                </span>
                <span className="bg-[#D69A18] text-white px-2 py-0.5 rounded text-[9.5px] font-black shrink-0">₹800 ONLY</span>
              </div>

              {/* Pricing row */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#0f2d5e]">
                    {RAKSHA_CAMPAIGN_CONFIG.currencySymbol}{RAKSHA_CAMPAIGN_CONFIG.specialPrice}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-400 line-through">
                    {RAKSHA_CAMPAIGN_CONFIG.currencySymbol}{RAKSHA_CAMPAIGN_CONFIG.originalPrice}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] sm:text-[11px] whitespace-nowrap shadow-2xs shrink-0">
                  {RAKSHA_CAMPAIGN_CONFIG.discountBadgeText}
                </span>
              </div>

              {/* Free Home Sample Collection Box */}
              <div className="p-2 bg-[#FFF8EB] border border-[#F3DBA7] rounded-lg text-[11px] font-extrabold text-[#D69A18] flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 shrink-0 text-[#D69A18]" />
                <span>Free Home Sample Collection Included</span>
              </div>

              {/* Parameters & Accreditation Specs Table */}
              <div className="space-y-1 pt-1.5 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="flex justify-between items-center py-0.5 gap-2">
                  <span className="text-slate-500 shrink-0">Parameters:</span>
                  <span className="font-extrabold text-[#0f2d5e] text-right">{RAKSHA_CAMPAIGN_CONFIG.parameterCount} Health Parameters</span>
                </div>
                <div className="flex justify-between items-center py-0.5 gap-2">
                  <span className="text-slate-500 shrink-0">Accreditation:</span>
                  <span className="font-extrabold text-[#0f2d5e] text-right">NABL ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber})</span>
                </div>
                <div className="flex justify-between items-center py-0.5 gap-2">
                  <span className="text-slate-500 shrink-0">Report Delivery:</span>
                  <span className="font-extrabold text-[#0f2d5e] text-right">6–12 Hours (WhatsApp &amp; Email)</span>
                </div>
                <div className="flex justify-between items-center py-0.5 gap-2">
                  <span className="text-slate-500 shrink-0">Fasting:</span>
                  <span className="font-extrabold text-[#0f2d5e] text-right">10–12 Hours Fasting</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onOpenBooking(RAKSHA_CAMPAIGN_CONFIG.offerTitle)}
                className="w-full py-2.5 px-4 bg-[#D69A18] hover:bg-[#b88313] text-white font-black rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider group cursor-pointer"
              >
                <span>BOOK PACKAGE @ ₹800</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* View More Details Toggle Button */}
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full py-2.5 px-4 bg-[#FFF8EB] hover:bg-amber-100/80 border border-[#F3DBA7] text-[#D69A18] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <span>
                  {showDetails
                    ? "Hide Test Breakdown Details ↑"
                    : "View 80 Parameters & Test Breakdown ↓"}
                </span>
              </button>
            </div>

            {/* Conditionally Expanded Test Breakdown & Trust Badge */}
            {showDetails && (
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 text-left animate-in fade-in duration-300">
                <div className="flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[10.5px] text-slate-500 bg-slate-50 py-1.5 px-2.5 rounded-lg border border-slate-200 text-center font-medium">
                  <Shield className="w-3 h-3 text-[#D69A18] shrink-0" />
                  <span>Verified by Senior Pathologists • Doctor-Led Lab</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="text-xs font-extrabold text-[#0f2d5e]">
                      Includes Essential Health Tests ({RAKSHA_CAMPAIGN_CONFIG.parameterCount} Parameters)
                    </h3>
                    <span className="text-[10px] text-slate-400 font-semibold">Click category</span>
                  </div>

                  <div className="space-y-2">
                    {RAKSHA_CAMPAIGN_CONFIG.packageInclusions.map((cat, idx) => {
                      const isExpanded = expandedCategory === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
                        >
                          <button
                            onClick={() => toggleCategory(idx)}
                            className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-amber-50/40 transition-colors gap-2 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <CheckCircle2 className="w-4 h-4 text-[#D69A18] shrink-0" />
                              <span className="font-extrabold text-[#0f2d5e] text-xs truncate">{cat.category}</span>
                              <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full bg-[#FFF8EB] text-[#D69A18] text-[9.5px] font-bold border border-[#F3DBA7]">
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
                            <div className="px-3.5 py-2.5 bg-slate-50/80 border-t border-slate-100">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                                {cat.items.map((test, tIdx) => (
                                  <div key={tIdx} className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D69A18] shrink-0" />
                                    <span className="text-[11px] leading-snug font-medium text-slate-700">{test}</span>
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
              </div>
            )}

            {/* Disclaimer Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-[10px] text-slate-400 text-left font-medium">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p>{RAKSHA_CAMPAIGN_CONFIG.disclaimerText}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
