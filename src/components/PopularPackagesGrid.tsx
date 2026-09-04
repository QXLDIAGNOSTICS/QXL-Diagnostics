"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Dna, Clock, ShieldCheck, FileText, Info, X } from 'lucide-react';
import { CANONICAL_PACKAGES, type PackageItem } from '@/lib/packagesCatalogue';
import { addItemToCart } from '@/lib/cart';

export const ALL_PACKAGES = CANONICAL_PACKAGES.map((pkg) => ({
  id: pkg.id,
  slug: pkg.slug,
  name: pkg.name,
  price: String(pkg.price),
  old_price: String(pkg.mrp),
  save_amount: String(pkg.mrp - pkg.price),
  discountPercent: `${Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100)}% OFF`,
  parameters: pkg.parametersLabel,
  includes: pkg.includes,
  tag: pkg.tag || 'PREVENTIVE OFFER',
  most_booked: !!pkg.isPopular,
  benefits: pkg.highlights,
}));

export default function PopularPackagesGrid() {
  const [selectedPkg, setSelectedPkg] = useState<PackageItem | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const handleAddToCart = (pkg: PackageItem) => {
    addItemToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      fasting: pkg.fastingHours || "8–10 Hours Fasting",
      tat: pkg.tat || "Reports within 6 hours",
    });
    setAddedToast(pkg.name);
    setTimeout(() => setAddedToast(null), 3000);
  };

  return (
    <section className="py-14 bg-[#f8faff] border-t border-slate-200 relative">
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-slate-900 text-white font-extrabold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <span className="text-emerald-400">✓</span>
          <span className="text-xs">{addedToast} added to cart!</span>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="bg-blue-100 text-blue-900 border border-blue-200 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            NABL CERTIFIED (MC-6849)
          </span>
          <h2 className="text-3xl font-black text-[#0f2d5e] mt-2">All Doctor-Curated Health Checkup Packages</h2>
          <p className="text-slate-600 text-sm mt-1 font-semibold">
            Explore complete parameter breakdowns, fasting instructions, and doctor guidance. Free doorstep sample collection across Bengaluru &amp; same-day digital reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CANONICAL_PACKAGES.map((pkg: PackageItem) => {
            const saveAmount = pkg.mrp - pkg.price;
            return (
              <div
                key={pkg.id}
                className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between h-full relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border bg-blue-50 text-blue-700 border-blue-100">
                      {pkg.tag || 'PREVENTIVE OFFER'}
                    </span>
                    <span className="text-[10.5px] font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Dna className="w-3 h-3 text-[#D69A18]" />
                      {pkg.parametersLabel}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug mb-3 group-hover:text-[#2563eb] transition-colors">
                    {pkg.name}
                  </h3>

                  <div className="mb-3 space-y-1.5">
                    {pkg.highlights.map((b, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-semibold leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="my-3 pt-3 border-t border-dashed border-gray-200">
                    <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                      <strong className="text-slate-800 font-bold">Includes:</strong> {pkg.includes}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100 space-y-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through block mb-0.5 font-semibold">₹{pkg.mrp}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{pkg.price}
                        </span>
                        <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Save ₹{saveAmount}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPkg(pkg)}
                      className="text-xs font-extrabold text-[#2563eb] hover:text-[#1d4ed8] hover:underline flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all"
                    >
                      <Info className="w-3.5 h-3.5" />
                      Read Full Details
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(pkg)}
                      className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer text-center"
                    >
                      + Add to Cart
                    </button>
                    <Link
                      href={`/book?package=${pkg.slug}`}
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-center"
                    >
                      Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Rich Read Full Details Modal ── */}
      {selectedPkg && (
        <div className="fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative border border-slate-200 max-h-[90vh] flex flex-col my-auto overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/80 sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#2563eb] text-white px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-xs">
                    {selectedPkg.tag || "PREVENTIVE HEALTH PACKAGE"}
                  </span>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                    {selectedPkg.parametersLabel}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {selectedPkg.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPkg(null)}
                className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center font-black text-base cursor-pointer transition-colors shadow-xs shrink-0 ml-3"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-slate-800">
              {/* Pricing & Offer Box */}
              <div className="flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-2xl border border-sky-200">
                <div>
                  <span className="text-xs text-slate-400 line-through font-bold block mb-0.5">MRP ₹{selectedPkg.mrp}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#0f2d5e]">₹{selectedPkg.price}</span>
                    <span className="bg-emerald-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                      Save ₹{selectedPkg.mrp - selectedPkg.price}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs font-bold text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 justify-end text-emerald-700 font-extrabold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>NABL Certified (MC-6849)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">Free Doorstep Home Collection</p>
                </div>
              </div>

              {/* Fasting & Report TAT Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D69A18] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Report TAT</span>
                    <span>{selectedPkg.tat || "Reports within 6 hours"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dna className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Fasting Rule</span>
                    <span>{selectedPkg.fastingHours || "8–10 Hours Fasting"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Sample Required</span>
                    <span>{selectedPkg.sampleType || "Blood & Urine Sample"}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2">Key Clinical Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPkg.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Categorized Parameter Breakdown */}
              {selectedPkg.detailedBreakdown && selectedPkg.detailedBreakdown.length > 0 ? (
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2.5">
                    Complete Parameter Breakdown ({selectedPkg.parametersLabel})
                  </h4>
                  <div className="space-y-3">
                    {selectedPkg.detailedBreakdown.map((cat, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <h5 className="font-extrabold text-[#0f2d5e] text-xs sm:text-sm">{cat.categoryName}</h5>
                          <span className="bg-blue-50 text-blue-700 border border-blue-200 font-black text-[10px] px-2.5 py-0.5 rounded-full">
                            {cat.testsCount} Tests
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {cat.testsList.map((testItem, tIdx) => (
                            <span key={tIdx} className="text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                              • {testItem}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-1.5">Full Test Inclusions</h4>
                  <p className="text-xs text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200 leading-relaxed">
                    {selectedPkg.includes}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  handleAddToCart(selectedPkg);
                  setSelectedPkg(null);
                }}
                className="flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border border-slate-300 hover:bg-slate-100 text-slate-800 bg-white cursor-pointer shadow-2xs text-center"
              >
                + Add to Cart
              </button>

              <Link
                href={`/book?package=${selectedPkg.slug}`}
                onClick={() => setSelectedPkg(null)}
                className="flex-1 text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black py-3 rounded-2xl text-xs uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                Book Package @ ₹{selectedPkg.price} &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
