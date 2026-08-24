"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Sparkles, Shield, Clock, Home, ArrowRight, Info } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface RakshaOfferCardProps {
  onOpenBooking: (packageTitle?: string) => void;
}

export default function RakshaOfferCard({ onOpenBooking }: RakshaOfferCardProps) {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (idx: number) => {
    setExpandedCategory(expandedCategory === idx ? null : idx);
  };

  return (
    <section id="rakhi-offer-card" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#00A8A8] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FESTIVE CAMPAIGN OFFER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {RAKSHA_CAMPAIGN_CONFIG.offerHeading}
          </h2>
          <p className="text-base text-slate-600">
            Gift your sibling comprehensive diagnostic screening from Bengaluru's trusted NABL accredited laboratory.
          </p>
        </div>

        {/* Offer Card Container */}
        <div className="bg-gradient-to-b from-[#FFFBF0] via-white to-[#F0FDF4] rounded-3xl border border-amber-200/80 shadow-2xl overflow-hidden relative group">
          
          {/* Background Static Rakhi Mandala Motifs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none opacity-20 text-amber-500">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M50 0 L55 20 L50 25 L45 20 Z" />
              <path d="M100 50 L80 55 L75 50 L80 45 Z" />
              <path d="M50 100 L45 80 L50 75 L55 80 Z" />
              <path d="M0 50 L20 45 L25 50 L20 55 Z" />
              <circle cx="50" cy="50" r="24" className="text-amber-600" />
              <circle cx="50" cy="50" r="14" className="text-red-500" />
            </svg>
          </div>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 pointer-events-none opacity-15 text-amber-600">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 5 L55 25 L50 30 L45 25 Z" />
              <path d="M95 50 L75 55 L70 50 L75 45 Z" />
              <path d="M50 95 L45 75 L50 70 L55 75 Z" />
              <path d="M5 50 L25 45 L30 50 L25 55 Z" />
            </svg>
          </div>

          {/* Top Banner Ribbon */}
          <div className="bg-gradient-to-r from-[#138808] via-[#15803d] to-[#138808] p-4 text-white px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 relative overflow-hidden">
            <div className="flex items-center gap-3 z-10">
              <span className="p-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm">
                🎁 RAKSHA BANDHAN OFFER
              </span>
              <span className="font-extrabold text-sm sm:text-base text-amber-100">
                {RAKSHA_CAMPAIGN_CONFIG.offerTitle}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-200 bg-black/25 px-3 py-1.5 rounded-full border border-amber-300/30 z-10">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>{RAKSHA_CAMPAIGN_CONFIG.offerValidityText}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Pricing & Quick Highlights */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-left space-y-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>7-DAY EXCLUSIVE OFFER</span>
                    </span>
                    <span className="bg-amber-200/80 px-2 py-0.5 rounded text-[11px]">₹800 ONLY</span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-[#0A5DAA]">
                      {RAKSHA_CAMPAIGN_CONFIG.currencySymbol}{RAKSHA_CAMPAIGN_CONFIG.specialPrice}
                    </span>
                    <span className="text-xl font-bold text-slate-400 line-through">
                      {RAKSHA_CAMPAIGN_CONFIG.currencySymbol}{RAKSHA_CAMPAIGN_CONFIG.originalPrice}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-extrabold text-xs">
                      {RAKSHA_CAMPAIGN_CONFIG.discountBadgeText}
                    </span>
                  </div>

                  <div className="p-3 bg-teal-50/70 border border-teal-100 rounded-xl text-xs font-bold text-[#00A8A8] flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>Free Home Sample Collection Included</span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Parameters Covered:</span>
                      <span className="font-bold text-slate-900">{RAKSHA_CAMPAIGN_CONFIG.parameterCount} Health Parameters</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Lab Accreditation:</span>
                      <span className="font-bold text-slate-900">NABL Accredited ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber})</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Report Delivery:</span>
                      <span className="font-bold text-slate-900">6–12 Hours (WhatsApp & Email)</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Fasting Requirement:</span>
                      <span className="font-bold text-slate-900">10–12 Hours Fasting Recommended</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking(RAKSHA_CAMPAIGN_CONFIG.offerTitle)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] hover:from-[#084b8a] hover:to-[#008f8f] text-white font-bold rounded-xl shadow-lg shadow-cyan-900/10 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-base uppercase tracking-wider group"
                  >
                    <span>BOOK NOW</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-white/60 p-3 rounded-xl border border-slate-100">
                  <Shield className="w-4 h-4 text-[#0A5DAA]" />
                  <span>Verified by Senior Pathologists • Doctor-Led Lab</span>
                </div>
              </div>

              {/* Right Column: Detailed Test Breakdown Accordion */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>Includes Essential Health Tests ({RAKSHA_CAMPAIGN_CONFIG.parameterCount} Parameters)</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Click category to view tests</span>
                </div>

                <div className="space-y-2.5">
                  {RAKSHA_CAMPAIGN_CONFIG.packageInclusions.map((cat, idx) => {
                    const isExpanded = expandedCategory === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => toggleCategory(idx)}
                          className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50/80 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#00A8A8] shrink-0" />
                            <div>
                              <span className="font-bold text-slate-900 text-sm">{cat.category}</span>
                              <span className="ml-2.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                                {cat.count} Tests
                              </span>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-4 pt-1 bg-slate-50/50 border-t border-slate-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                              {cat.items.map((test, tIdx) => (
                                <div key={tIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A8A8]" />
                                  <span>{test}</span>
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

            {/* Disclaimer Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-500 text-left">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>{RAKSHA_CAMPAIGN_CONFIG.disclaimerText}</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
