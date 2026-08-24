"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, CheckCircle } from 'lucide-react';
import PopularPackagesGrid from '@/components/PopularPackagesGrid';
import MobileTrustBadges from '@/components/MobileTrustBadges';

import { packagesData } from '@/data/packages';

export default function PackagesPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Popular" | "Oncology" | "Cardio">("All");

  const filteredMobilePackages = packagesData.filter((p) => {
    if (activeFilter === "Popular") return p.most_booked;
    if (activeFilter === "Oncology") return p.tag.includes("ONCOLOGY");
    if (activeFilter === "Cardio") return p.tag.includes("CARDIO");
    return true;
  });

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* ── MOBILE VIEW (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col w-full pb-12">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 p-4 shadow-2xs">
          <div>
            <h1 className="font-black text-lg sm:text-xl tracking-tight text-[#0f2d5e]">Complete Diagnostic Packages</h1>
            <p className="text-[11px] text-slate-500 font-semibold">Doctor-curated health checkups</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 flex gap-2 overflow-x-auto scrollbar-none sticky top-[58px] z-30 bg-[#f8faff]">
          {(["All", "Popular", "Oncology", "Cardio"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all shadow-xs ${
                activeFilter === filter
                  ? "bg-[#D69A18] text-white shadow-amber-500/20"
                  : "bg-white text-slate-700 border border-gray-200 hover:bg-amber-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Package Cards List */}
        <div className="px-3.5 space-y-3.5">
          {filteredMobilePackages.map((pkg) => (
            <div
              key={pkg.id || pkg.name}
              className="bg-white rounded-2xl p-4 border border-amber-100/80 shadow-sm flex flex-col gap-2.5 text-left"
            >
              {/* Top Tag & Save badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {pkg.tag}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                  Save ₹{pkg.save || Number(pkg.old_price) - Number(pkg.price)}
                </span>
              </div>

              {/* Title & Parameters */}
              <div>
                <h3 className="font-black text-slate-900 text-base leading-tight mb-1">{pkg.name}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{pkg.includes}</p>
              </div>

              {/* Benefits Bullets */}
              {pkg.highlights && pkg.highlights.length > 0 && (
                <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                  {pkg.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5 font-extrabold text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D69A18] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing & CTA Row */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 mt-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-[#D69A18] text-2xl">₹{pkg.price}</span>
                  <span className="text-xs text-slate-400 line-through font-extrabold">₹{pkg.old_price}</span>
                </div>

                <Link
                  href={`/book?package=${encodeURIComponent(pkg.name)}`}
                  className="bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center gap-1"
                >
                  <span>Book Package @ ₹{pkg.price}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <MobileTrustBadges />
      </div>

      {/* ── DESKTOP VIEW (hidden on mobile) ── */}
      <div className="hidden lg:block">
        <section className="bg-[#e0f2fe] py-12 relative overflow-hidden border-b border-blue-100">
          <div className="max-w-[1200px] mx-auto px-4 w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block bg-blue-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 shadow-sm">
                Comprehensive Health
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">
                Expert Health Check <br />Packages for Everyone
              </h1>
              <p className="text-blue-800 text-sm font-medium mb-6 opacity-90">
                Browse our clinical packages and blood tests, certified with NABL-level quality. Free home collection and same-day electronic reports included.
              </p>
            </div>
          </div>
        </section>

        <PopularPackagesGrid />
      </div>
    </div>
  );
}
