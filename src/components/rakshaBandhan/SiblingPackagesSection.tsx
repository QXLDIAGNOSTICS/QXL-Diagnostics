"use client";

import React, { useState } from "react";
import { UserCheck, Heart, Shield, ArrowRight, CheckCircle2, X } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface SiblingPackagesSectionProps {
  onOpenBooking: (packageTitle?: string) => void;
}

export default function SiblingPackagesSection({ onOpenBooking }: SiblingPackagesSectionProps) {
  const [activeModalPackage, setActiveModalPackage] = useState<typeof RAKSHA_CAMPAIGN_CONFIG.siblingPackages[0] | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#F5F9FC] relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-[#0A5DAA] text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            <span>PREVENTIVE WELLNESS PANELS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Comprehensive Health Checks for Men & Women.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Proactive health checkups tailored for men and women to monitor vital health parameters.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {RAKSHA_CAMPAIGN_CONFIG.siblingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 ${
                  pkg.targetGender === "Women"
                    ? "bg-gradient-to-r from-rose-400 via-teal-400 to-[#0A5DAA]"
                    : "bg-gradient-to-r from-[#0A5DAA] via-[#00A8A8] to-cyan-500"
                }`}
              />

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold uppercase tracking-wider">
                    For {pkg.targetGender}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#0A5DAA]">₹{pkg.specialPrice}</span>
                    <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  {pkg.title}
                </h3>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {pkg.subtitle}
                </p>

                <div className="space-y-3 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Package Highlights ({pkg.parametersCount} Parameters)
                  </div>
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00A8A8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setActiveModalPackage(pkg)}
                  className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <span>VIEW TESTS</span>
                </button>

                <button
                  onClick={() => onOpenBooking(pkg.title)}
                  className="py-3.5 px-4 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] hover:from-[#084b8a] hover:to-[#008f8f] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 uppercase"
                >
                  <span>BOOK NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View Tests Detail Modal */}
        {activeModalPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-left relative shadow-2xl border border-slate-100">
              <button
                onClick={() => setActiveModalPackage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold text-[#0A5DAA] uppercase">Detailed Inclusions</span>
                <h4 className="text-xl font-bold text-slate-900">{activeModalPackage.title}</h4>
              </div>

              <p className="text-xs text-slate-600 mb-4">{activeModalPackage.subtitle}</p>

              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-slate-900 mb-2">Covered Test Groups:</div>
                {activeModalPackage.testCategories.map((cat, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-[#00A8A8]" />
                    <span>{cat}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const title = activeModalPackage.title;
                    setActiveModalPackage(null);
                    onOpenBooking(title);
                  }}
                  className="w-full py-3 bg-[#0A5DAA] text-white font-bold rounded-xl text-xs uppercase"
                >
                  Book {activeModalPackage.title} (₹800)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
