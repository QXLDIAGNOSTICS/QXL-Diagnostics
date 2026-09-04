"use client";
import React from 'react';
import PopularPackagesGrid from '@/components/PopularPackagesGrid';
import MobileTrustBadges from '@/components/MobileTrustBadges';

export default function PackagesPage() {
  return (
    <div className="bg-[#f8faff] min-h-screen pb-12">
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-100 p-4 sm:p-8 shadow-2xs text-center">
        <div className="max-w-[1200px] mx-auto">
          <span className="inline-block bg-blue-100 text-blue-900 border border-blue-200 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
            NABL ACCREDITED (MC-6849)
          </span>
          <h1 className="font-black text-2xl sm:text-4xl tracking-tight text-[#0f2d5e]">
            Complete Diagnostic Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
            Doctor-curated health checkups with free doorstep sample collection across Bengaluru &amp; same-day reports.
          </p>
        </div>
      </div>

      {/* Unified Single-Render Package Grid */}
      <PopularPackagesGrid />

      {/* Trust Badges */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <MobileTrustBadges />
      </div>
    </div>
  );
}

