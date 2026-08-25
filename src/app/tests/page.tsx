"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ChevronRight } from "lucide-react";

const popularTests = [
  { id: "cbc", name: "Complete Blood Count (CBC)", sub: "26 Parameters", price: 200, fasting: "No Fasting Required", sample: "Blood (EDTA)", tat: "Report in 6 Hours", icon: "🩸" },
  { id: "thyroid", name: "Thyroid Profile (Total)", sub: "3 Tests (T3, T4, TSH)", price: 650, fasting: "10-12 Hrs Fasting Required", sample: "Blood (Serum)", tat: "Report in 6 Hours", icon: "🦋" },
  { id: "lft", name: "Liver Function Test (LFT)", sub: "11 Parameters", price: 650, fasting: "8-10 Hrs Fasting Required", sample: "Blood (Serum)", tat: "Report in 6 Hours", icon: "🧪" },
  { id: "kft", name: "Kidney Function Test (KFT)", sub: "8 Parameters", price: 650, fasting: "No Fasting Required", sample: "Blood & Urine", tat: "Report in 6 Hours", icon: "💧" },
  { id: "lipid", name: "Lipid Profile", sub: "8 Parameters", price: 750, fasting: "10-12 Hrs Fasting Required", sample: "Blood (Serum)", tat: "Report in 6 Hours", icon: "❤️" },
  { id: "hba1c", name: "HbA1c (Glycated Hemoglobin)", sub: "Diabetes Monitoring", price: 350, fasting: "No Fasting Required", sample: "Blood (EDTA)", tat: "Report in 6 Hours", icon: "🍬" },
  { id: "vitd", name: "Vitamin D (25 OH)", sub: "Bone Health Marker", price: 900, fasting: "No Fasting Required", sample: "Blood (Serum)", tat: "Report in 12 Hours", icon: "☀️" },
  { id: "vitb12", name: "Vitamin B12", sub: "Nerve & RBC Health", price: 600, fasting: "No Fasting Required", sample: "Blood (Serum)", tat: "Report in 12 Hours", icon: "⚡" },
];

const healthPackages = [
  { id: "freedom80", name: "Freedom 80 Health Check", sub: "80 Parameters Panel", price: 800, originalPrice: 5800, fasting: "10-12 Hrs Fasting Required", sample: "Blood & Urine", tat: "Report in 6 Hours", icon: "👨‍👩‍👧‍👦" },
  { id: "advance_whole", name: "Advance Whole Body Checkup", sub: "120 Parameters Panel", price: 1999, originalPrice: 6000, fasting: "10-12 Hrs Fasting Required", sample: "Blood & Urine", tat: "Report in 12 Hours", icon: "👨" },
  { id: "diabetes_care", name: "Diabetes Care Package", sub: "40 Parameters Panel", price: 599, originalPrice: 2000, fasting: "8-10 Hrs Fasting Required", sample: "Blood & Urine", tat: "Report in 6 Hours", icon: "🩺" },
  { id: "heart_care", name: "Heart Care Package", sub: "35 Parameters Panel", price: 699, originalPrice: 2600, fasting: "10-12 Hrs Fasting Required", sample: "Blood (Serum)", tat: "Report in 6 Hours", icon: "🫀" },
];

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState<"popular" | "packages" | "all">("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("qxl_cart");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const handleToggleCart = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (cartItems.includes(name)) {
      updated = cartItems.filter((item) => item !== name);
    } else {
      updated = [...cartItems, name];
    }
    try {
      localStorage.setItem("qxl_cart", JSON.stringify(updated));
    } catch {}
    setCartItems(updated);
    window.dispatchEvent(new CustomEvent("cartChange"));
  };

  const filteredTests = popularTests.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackages = healthPackages.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#f8faff] min-h-screen pb-24">
      {/* Page Header (Clean White Design) */}
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
            placeholder="Search for tests, packages, symptoms..."
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
            className={`py-3 px-2 transition-colors relative cursor-pointer ${
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
            className={`py-3 px-2 transition-colors relative cursor-pointer ${
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
            className={`py-3 px-2 transition-colors relative cursor-pointer ${
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
      <div className="p-4 max-w-md mx-auto space-y-4">
        {(activeTab === "popular" || activeTab === "all") && (
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-1">
              Popular Diagnostic Tests
            </h2>
            {filteredTests.map((test) => {
              const inCart = cartItems.includes(test.name);
              return (
                <div
                  key={test.id}
                  className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs hover:border-[#D69A18]/50 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-lg shrink-0 mt-0.5">
                        {test.icon}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-xs leading-snug">
                          {test.name}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-semibold">{test.sub}</p>
                      </div>
                    </div>
                    <span className="font-black text-[#0f2d5e] text-sm shrink-0">₹{test.price}</span>
                  </div>

                  {/* Metadata Chips: Fasting, Sample, TAT */}
                  <div className="flex flex-wrap gap-1.5 my-2">
                    <span className="text-[9.5px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                      ⏳ {test.fasting}
                    </span>
                    <span className="text-[9.5px] font-bold text-blue-800 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                      🔬 {test.sample}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                      ⚡ {test.tat}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <Link
                      href={`/book?test=${encodeURIComponent(test.name)}`}
                      className="text-[10.5px] font-extrabold text-slate-600 hover:text-[#0f2d5e] underline"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => handleToggleCart(test.name, e)}
                      className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        inCart
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-[#D69A18] hover:bg-[#b88313] !text-white shadow-xs"
                      }`}
                      style={!inCart ? { color: '#ffffff' } : undefined}
                    >
                      <span className={!inCart ? "!text-white font-black" : ""} style={!inCart ? { color: '#ffffff' } : undefined}>
                        {inCart ? "✓ Added" : "+ Add"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(activeTab === "packages" || activeTab === "all") && (
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-1">
              Health Packages
            </h2>
            {filteredPackages.map((pkg) => {
              const inCart = cartItems.includes(pkg.name);
              return (
                <div
                  key={pkg.id}
                  className="bg-white border border-gray-150 rounded-2xl p-4 shadow-xs hover:border-[#D69A18]/50 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-lg shrink-0 mt-0.5">
                        {pkg.icon}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-xs leading-snug">
                          {pkg.name}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-semibold">{pkg.sub}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="font-black text-[#0f2d5e] text-sm">₹{pkg.price}</span>
                      <span className="text-[9.5px] text-slate-400 line-through font-bold">₹{pkg.originalPrice}</span>
                    </div>
                  </div>

                  {/* Metadata Chips: Fasting, Sample, TAT */}
                  <div className="flex flex-wrap gap-1.5 my-2">
                    <span className="text-[9.5px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                      ⏳ {pkg.fasting}
                    </span>
                    <span className="text-[9.5px] font-bold text-blue-800 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                      🔬 {pkg.sample}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                      ⚡ {pkg.tat}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <Link
                      href={`/book?package=${encodeURIComponent(pkg.name)}`}
                      className="text-[10.5px] font-extrabold text-slate-600 hover:text-[#0f2d5e] underline"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => handleToggleCart(pkg.name, e)}
                      className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        inCart
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-[#D69A18] hover:bg-[#b88313] !text-white shadow-xs"
                      }`}
                      style={!inCart ? { color: '#ffffff' } : undefined}
                    >
                      <span className={!inCart ? "!text-white font-black" : ""} style={!inCart ? { color: '#ffffff' } : undefined}>
                        {inCart ? "✓ Added" : "+ Add"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Button */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-white/90 backdrop-blur-xs pointer-events-none z-30 flex justify-center border-t border-slate-100">
        <Link
          href="/book"
          className="pointer-events-auto w-full max-w-md mx-4 bg-[#D69A18] hover:bg-[#b88313] !text-white font-black py-3.5 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 uppercase text-xs tracking-wider active:scale-95 transition-transform cursor-pointer"
          style={{ color: '#ffffff' }}
        >
          <span className="!text-white font-black" style={{ color: '#ffffff' }}>Proceed to Checkout</span>
          <ChevronRight className="w-4 h-4 text-white" />
        </Link>
      </div>
    </div>
  );
}
