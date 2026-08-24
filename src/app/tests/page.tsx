"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";

const popularTests = [
  { id: "cbc", name: "Complete Blood Count (CBC)", sub: "26 Parameters", price: 200, icon: "🩸" },
  { id: "thyroid", name: "Thyroid Profile (Total)", sub: "3 Tests (T3, T4, TSH)", price: 650, icon: "🦋" },
  { id: "lft", name: "Liver Function Test (LFT)", sub: "11 Parameters", price: 650, icon: "🧪" },
  { id: "kft", name: "Kidney Function Test (KFT)", sub: "8 Parameters", price: 650, icon: "💧" },
  { id: "lipid", name: "Lipid Profile", sub: "8 Parameters", price: 750, icon: "❤️" },
  { id: "hba1c", name: "HbA1c", sub: "Diabetes Monitoring", price: 350, icon: "🍬" },
  { id: "vitd", name: "Vitamin D (25 OH)", sub: "Bone Health Marker", price: 900, icon: "☀️" },
  { id: "vitb12", name: "Vitamin B12", sub: "Nerve & Red Blood Cell Health", price: 600, icon: "⚡" },
];

const healthPackages = [
  { id: "freedom80", name: "Freedom 80 Health Check", sub: "80 Parameters", price: 800, originalPrice: 5000, icon: "👨‍👩‍👧‍👦" },
  { id: "advance_whole", name: "Advance Whole Body Checkup", sub: "120 Parameters", price: 1999, originalPrice: 6000, icon: "👨" },
  { id: "diabetes_care", name: "Diabetes Care Package", sub: "40 Parameters", price: 599, originalPrice: 2000, icon: "🩺" },
  { id: "heart_care", name: "Heart Care Package", sub: "35 Parameters", price: 699, originalPrice: 2600, icon: "🫀" },
];

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState<"popular" | "packages" | "all">("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = popularTests.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackages = healthPackages.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f8faff] min-h-screen pb-24">
      {/* Page Header (Clean White Design without duplicate back button) */}
      <div className="bg-white border-b border-slate-100 p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h1 className="font-black text-lg sm:text-xl tracking-tight text-[#0f2d5e]">Tests &amp; Packages</h1>
          <span className="text-[10.5px] font-black text-[#D69A18] bg-[#FFF8EB] border border-[#F3DBA7] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            NABL Accredited
          </span>
        </div>

        {/* Search bar */}
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="Search for tests, packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-xs font-semibold px-4 py-2.5 rounded-xl focus:outline-none focus:border-[#D69A18] pr-10"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[108px] z-30 shadow-xs">
        <div className="flex justify-around text-xs font-black">
          <button
            onClick={() => setActiveTab("popular")}
            className={`py-3 px-2 transition-colors relative ${
              activeTab === "popular" ? "text-[#D69A18]" : "text-slate-500"
            }`}
          >
            Popular Tests
            {activeTab === "popular" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D69A18] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`py-3 px-2 transition-colors relative ${
              activeTab === "packages" ? "text-[#D69A18]" : "text-slate-500"
            }`}
          >
            Health Packages
            {activeTab === "packages" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D69A18] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`py-3 px-2 transition-colors relative ${
              activeTab === "all" ? "text-[#D69A18]" : "text-slate-500"
            }`}
          >
            All Tests
            {activeTab === "all" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D69A18] rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="p-4 max-w-md mx-auto space-y-2.5">
        {(activeTab === "popular" || activeTab === "all") && (
          <div className="space-y-2">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-1">
              Popular Diagnostic Tests
            </h2>
            {filteredTests.map((test) => (
              <Link
                key={test.id}
                href={`/book?test=${encodeURIComponent(test.name)}`}
                className="bg-white hover:bg-amber-50/50 border border-gray-150 rounded-2xl p-3.5 flex items-center justify-between shadow-xs active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-lg shrink-0">
                    {test.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-slate-900 text-xs group-hover:text-[#D69A18] transition-colors">
                      {test.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{test.sub}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-[#D69A18] text-sm">₹{test.price}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D69A18]" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {(activeTab === "packages" || activeTab === "all") && (
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-1">
              Health Packages
            </h2>
            {filteredPackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/book?package=${encodeURIComponent(pkg.name)}`}
                className="bg-white hover:bg-amber-50/50 border border-gray-150 rounded-2xl p-3.5 flex items-center justify-between shadow-xs active:scale-[0.99] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-lg shrink-0">
                    {pkg.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-slate-900 text-xs group-hover:text-[#D69A18] transition-colors">
                      {pkg.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{pkg.sub}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="font-black text-[#D69A18] text-sm">₹{pkg.price}</span>
                    <span className="text-[9px] text-slate-400 line-through">₹{pkg.originalPrice}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D69A18]" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Button */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-white/90 backdrop-blur-xs pointer-events-none z-30 flex justify-center border-t border-slate-100">
        <Link
          href="/book"
          className="pointer-events-auto w-full max-w-md mx-4 bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 uppercase text-xs tracking-wider active:scale-95 transition-transform"
        >
          <span>View All Tests &amp; Packages</span>
          <ChevronRight className="w-4 h-4 text-white" />
        </Link>
      </div>
    </div>
  );
}
