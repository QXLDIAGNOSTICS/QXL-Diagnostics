"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Dna, Clock, ShieldCheck, FileText, Info, X, Search, Phone, MessageCircle, AlertCircle, UserCheck, Stethoscope } from 'lucide-react';
import { CANONICAL_PACKAGES, type PackageItem } from '@/lib/packagesCatalogue';
import { addItemToCart } from '@/lib/cart';

export const ALL_PACKAGES = CANONICAL_PACKAGES.map((pkg) => ({
  id: pkg.id,
  slug: pkg.slug,
  name: pkg.name,
  price: pkg.price ? String(pkg.price) : "Contact Us",
  old_price: pkg.mrp ? String(pkg.mrp) : "",
  save_amount: pkg.price && pkg.mrp ? String(pkg.mrp - pkg.price) : "",
  discountPercent: pkg.price && pkg.mrp ? `${Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100)}% OFF` : "SPECIALITY",
  parameters: pkg.parametersLabel,
  includes: pkg.includes,
  tag: pkg.tag || 'PREVENTIVE OFFER',
  most_booked: !!pkg.isPopular,
  benefits: pkg.highlights,
  contactForPrice: !!pkg.contactForPrice,
  guidanceLevel: pkg.guidanceLevel,
}));

export default function PopularPackagesGrid() {
  const [selectedPkg, setSelectedPkg] = useState<PackageItem | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedGuidance, setSelectedGuidance] = useState('ALL');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    CANONICAL_PACKAGES.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['ALL', ...Array.from(cats)];
  }, []);

  const filteredPackages = useMemo(() => {
    const list = CANONICAL_PACKAGES.filter((pkg) => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = pkg.name.toLowerCase().includes(q);
        const matchIncludes = pkg.includes.toLowerCase().includes(q);
        const matchGuide = pkg.guideNumber ? pkg.guideNumber.toLowerCase().includes(q) : false;
        const matchHelp = pkg.mayHelpWhen ? pkg.mayHelpWhen.toLowerCase().includes(q) : false;
        if (!matchName && !matchIncludes && !matchGuide && !matchHelp) {
          return false;
        }
      }
      // Category match
      if (selectedCategory !== 'ALL' && pkg.category !== selectedCategory) {
        return false;
      }
      // Guidance level match
      if (selectedGuidance !== 'ALL' && pkg.guidanceLevel !== selectedGuidance) {
        return false;
      }
      return true;
    });

    // Sort by price: lowest price first, followed by doctor-directed/quote packages
    return list.sort((a, b) => {
      const priceA = typeof a.price === 'number' && a.price > 0 && !a.contactForPrice ? a.price : 999999;
      const priceB = typeof b.price === 'number' && b.price > 0 && !b.contactForPrice ? b.price : 999999;
      return priceA - priceB;
    });
  }, [searchQuery, selectedCategory, selectedGuidance]);

  const standardPackages = useMemo(() => {
    return filteredPackages.filter((pkg) => typeof pkg.price === 'number' && pkg.price > 0 && !pkg.contactForPrice);
  }, [filteredPackages]);

  const contactPackages = useMemo(() => {
    return filteredPackages.filter((pkg) => pkg.contactForPrice || typeof pkg.price !== 'number' || pkg.price === 0);
  }, [filteredPackages]);

  const handleAddToCart = (pkg: PackageItem) => {
    if (pkg.contactForPrice || !pkg.price) {
      window.location.href = `https://wa.me/919964639639?text=${encodeURIComponent(`Hi QXL Diagnostics, I want to enquire about ${pkg.name}`)}`;
      return;
    }
    addItemToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      fasting: pkg.fastingHours || "8–10 Hours Fasting",
      tat: pkg.tat || "Reports within 6 hours",
    });
    setAddedToast(pkg.name);
    setTimeout(() => setAddedToast(null), 3500);
    window.location.href = `/book?package=${encodeURIComponent(pkg.slug || pkg.id || pkg.name)}`;
  };

  const getGuidanceBadgeStyle = (level?: string) => {
    switch (level) {
      case 'SELF-REQUEST POSSIBLE':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'CONSULTATION RECOMMENDED':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'DOCTOR-DIRECTED':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-[#f8faff] border-t border-slate-200 relative">
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-slate-900 text-white font-extrabold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <span className="text-emerald-400">✓</span>
          <span className="text-xs">{addedToast} added to cart!</span>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
          <span className="bg-blue-100 text-blue-900 border border-blue-200 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            NABL ACCREDITED (MC-6849) • ISO 15189:2022
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-[#0f2d5e] mt-1.5">
            Complete Diagnostic Packages
          </h1>
          <p className="text-slate-600 text-xs mt-0.5 font-semibold">
            Doctor-curated health checkups with free doorstep sample collection across Bengaluru &amp; same-day reports.
          </p>
        </div>

        {/* ── Search & Filter Control Bar ── */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs mb-5 space-y-2.5">
          {/* Top Row: Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 49+ packages (e.g. #01 Anemia, PCOS, Diabetes, Thyroid, Cortisol, Troponin, Fever)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#2563eb] focus:bg-white text-slate-800 font-bold text-xs rounded-xl pl-9 pr-4 py-2 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-[10px] bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Guidance Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Guidance Level:
            </span>
            {[
              { key: 'ALL', label: 'All Packages (49)' },
              { key: 'SELF-REQUEST POSSIBLE', label: 'Self-Request Possible' },
              { key: 'CONSULTATION RECOMMENDED', label: 'Consultation Recommended' },
              { key: 'DOCTOR-DIRECTED', label: 'Doctor-Directed' },
            ].map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setSelectedGuidance(g.key)}
                className={`text-[11px] font-black px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  selectedGuidance === g.key
                    ? 'bg-[#0f2d5e] text-white border-[#0f2d5e] shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills (Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar pt-1 border-t border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'ALL' ? 'All Specialities' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider">
            Showing {filteredPackages.length} of {CANONICAL_PACKAGES.length} Diagnostic Packages
          </p>
          {(searchQuery || selectedCategory !== 'ALL' || selectedGuidance !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedGuidance('ALL');
              }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* Package Containers */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs max-w-lg mx-auto my-8">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-black text-slate-800 mb-1">No Matching Packages Found</h3>
            <p className="text-xs text-slate-500 font-semibold mb-4">
              Try adjusting your search terms or clearing category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedGuidance('ALL');
              }}
              className="bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-xl"
            >
              Show All 49 Packages
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* CONTAINER 1: Standard Packages with Transparent Fixed Pricing */}
            {standardPackages.length > 0 && (
              <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                        Instant Online Booking ({standardPackages.length} Packages)
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0f2d5e]">
                      Standard Health Packages
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                      Doctor-curated preventive health checkups with transparent pricing and free doorstep sample collection.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {standardPackages.map((pkg: PackageItem) => {
                    const saveAmount = pkg.price && pkg.mrp ? pkg.mrp - pkg.price : 0;
                    return (
                      <div
                        key={pkg.id}
                        className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl rounded-3xl p-6 shadow-xs transition-all duration-300 flex flex-col justify-between h-full relative group"
                      >
                        <div>
                          {/* Guidance / Tag Bar */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider border ${getGuidanceBadgeStyle(pkg.guidanceLevel)}`}>
                              {pkg.guidanceLevel || pkg.tag || 'PREVENTIVE OFFER'}
                            </span>
                            <span className="text-[10.5px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                              <Dna className="w-3 h-3 text-[#D69A18]" />
                              {pkg.parametersLabel}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug mb-2 group-hover:text-[#2563eb] transition-colors">
                            {pkg.name}
                          </h3>

                          {/* May Help When Tagline if present */}
                          {pkg.mayHelpWhen && (
                            <p className="text-[11px] font-extrabold text-blue-900 bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-xl mb-3 leading-snug">
                              💡 {pkg.mayHelpWhen}
                            </p>
                          )}

                          {/* Key Highlights */}
                          <div className="mb-3 space-y-1.5">
                            {pkg.highlights.map((b, i) => (
                              <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-semibold leading-tight">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5" />
                                <span className="line-clamp-2">{b}</span>
                              </div>
                            ))}
                          </div>

                          {/* Inclusions */}
                          <div className="my-3 pt-3 border-t border-dashed border-gray-200">
                            <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                              <strong className="text-slate-800 font-bold">Includes:</strong> {pkg.includes}
                            </p>
                          </div>
                        </div>

                        {/* Card Bottom Area: Pricing & Actions */}
                        <div className="pt-4 mt-auto border-t border-gray-100 space-y-3">
                          <div className="flex items-center justify-between gap-2 min-h-[44px]">
                            <div>
                              <span className="text-[11px] text-slate-400 line-through block mb-0.5 font-semibold">₹{pkg.mrp}</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-black text-slate-900">₹{pkg.price}</span>
                                {saveAmount > 0 && (
                                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                    Save ₹{saveAmount}
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedPkg(pkg)}
                              className="text-xs font-extrabold text-[#2563eb] hover:text-[#1d4ed8] flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl border border-blue-200 transition-all shrink-0"
                            >
                              <Info className="w-3.5 h-3.5" />
                              Details
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => handleAddToCart(pkg)}
                              className="w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer text-center"
                            >
                              + Add to Cart
                            </button>
                            <Link
                              href={`/book?package=${pkg.slug}`}
                              className="flex items-center justify-center gap-1 w-full py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all shadow-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-center"
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
            )}

            {/* CONTAINER 2: Doctor-Directed & Speciality Packages (Price on Request) */}
            {contactPackages.length > 0 && (
              <div className="bg-gradient-to-b from-purple-50/60 via-slate-50/30 to-white rounded-3xl p-5 sm:p-8 border border-purple-200/80 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-purple-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                      <span className="text-[11px] font-black uppercase tracking-wider text-purple-900 bg-purple-100 border border-purple-200 px-3 py-0.5 rounded-full">
                        Specialist &amp; Doctor-Directed ({contactPackages.length} Panels)
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0f2d5e]">
                      Doctor-Directed &amp; Speciality Packages
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                      Specialised profiles requiring tailored specimen handling or clinical guidance. Contact us for pricing &amp; consultation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contactPackages.map((pkg: PackageItem) => (
                    <div
                      key={pkg.id}
                      className="bg-white border border-purple-200/80 hover:border-purple-400 hover:shadow-xl rounded-3xl p-6 shadow-xs transition-all duration-300 flex flex-col justify-between h-full relative group"
                    >
                      <div>
                        {/* Guidance / Tag Bar */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider border ${getGuidanceBadgeStyle(pkg.guidanceLevel)}`}>
                            {pkg.guidanceLevel || pkg.tag || 'DOCTOR-DIRECTED'}
                          </span>
                          <span className="text-[10.5px] font-extrabold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                            <Dna className="w-3 h-3 text-[#D69A18]" />
                            {pkg.parametersLabel}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug mb-2 group-hover:text-purple-700 transition-colors">
                          {pkg.name}
                        </h3>

                        {/* May Help When Tagline if present */}
                        {pkg.mayHelpWhen && (
                          <p className="text-[11px] font-extrabold text-purple-900 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-xl mb-3 leading-snug">
                            💡 {pkg.mayHelpWhen}
                          </p>
                        )}

                        {/* Key Highlights */}
                        <div className="mb-3 space-y-1.5">
                          {pkg.highlights.map((b, i) => (
                            <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-semibold leading-tight">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-purple-600 mt-0.5" />
                              <span className="line-clamp-2">{b}</span>
                            </div>
                          ))}
                        </div>

                        {/* Inclusions */}
                        <div className="my-3 pt-3 border-t border-dashed border-purple-100">
                          <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                            <strong className="text-slate-800 font-bold">Includes:</strong> {pkg.includes}
                          </p>
                        </div>
                      </div>

                      {/* Card Bottom Area: Pricing Guidance & Aligned Buttons */}
                      <div className="pt-4 mt-auto border-t border-gray-100 space-y-3">
                        <div className="flex items-center justify-between gap-2 min-h-[44px]">
                          <div className="bg-amber-50/90 border border-amber-200/80 px-3 py-1.5 rounded-2xl flex-1">
                            <span className="text-[9.5px] font-black uppercase text-amber-800 tracking-wider block">
                              Pricing Guidance
                            </span>
                            <span className="text-xs font-black text-[#0f2d5e] flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              Contact for Price
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedPkg(pkg)}
                            className="text-xs font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-xl border border-purple-200 transition-all shrink-0"
                          >
                            <Info className="w-3.5 h-3.5" />
                            Details
                          </button>
                        </div>

                        {/* Perfectly Aligned 2-Column Action Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <a
                            href="tel:+919964639639"
                            className="flex items-center justify-center gap-1 w-full py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-center"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-600" /> Call Us
                          </a>
                          <a
                            href={`https://wa.me/919964639639?text=${encodeURIComponent(`Hi QXL Diagnostics, I want to enquire about the price & details for ${pkg.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 w-full py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white text-center"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Enquire Price
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Rich Read Full Details Modal ── */}
      {selectedPkg && (
        <div className="fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative border border-slate-200 max-h-[90vh] flex flex-col my-auto overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/80 sticky top-0 z-10">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-xs border ${getGuidanceBadgeStyle(selectedPkg.guidanceLevel)}`}>
                    {selectedPkg.guidanceLevel || selectedPkg.tag || "DIAGNOSTIC PACKAGE"}
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
              {/* Pricing Box */}
              {selectedPkg.contactForPrice || !selectedPkg.price ? (
                <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-4.5 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block">
                        PACKAGE PRICING &amp; BOOKING GUIDANCE
                      </span>
                      <span className="text-xl font-black text-[#0f2d5e]">Contact Us for Price Quote</span>
                    </div>
                    <a
                      href={`https://wa.me/919964639639?text=${encodeURIComponent(`Hi QXL Diagnostics, I want to enquire about pricing for ${selectedPkg.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 shrink-0"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp Price Quote
                    </a>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Call or WhatsApp <strong>+91 9964 639 639</strong> for transparent pricing, specimen collection details, and phlebotomist availability.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-2xl border border-sky-200">
                  <div>
                    <span className="text-xs text-slate-400 line-through font-bold block mb-0.5">MRP ₹{selectedPkg.mrp}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-[#0f2d5e]">₹{selectedPkg.price}</span>
                      {selectedPkg.mrp && (
                        <span className="bg-emerald-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                          Save ₹{selectedPkg.mrp - selectedPkg.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-xs font-bold text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 justify-end text-emerald-700 font-extrabold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>NABL Accredited (MC-6849)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">Free Doorstep Home Collection</p>
                  </div>
                </div>
              )}

              {/* Guidance Level Clinical Explanation if present */}
              {selectedPkg.guidanceLevel && (
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#0f2d5e]">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    <span>How to use this package ({selectedPkg.guidanceLevel})</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {selectedPkg.guidanceLevel === 'SELF-REQUEST POSSIBLE' &&
                      'Suitable for selected wellness or monitoring needs. Reception will confirm fasting, specimen and timing requirements.'}
                    {selectedPkg.guidanceLevel === 'CONSULTATION RECOMMENDED' &&
                      'Symptoms, medicines, age, menstrual-cycle timing or previous reports can change which tests are appropriate. Discuss the package before booking.'}
                    {selectedPkg.guidanceLevel === 'DOCTOR-DIRECTED' &&
                      'Pregnancy screening, clotting, cancer, infection and autoimmune panels require a defined clinical question and professional guidance.'}
                  </p>
                </div>
              )}

              {/* May Help When Box */}
              {selectedPkg.mayHelpWhen && (
                <div className="bg-sky-50/80 border border-sky-200 p-4 rounded-2xl">
                  <h4 className="font-extrabold text-sky-950 text-xs uppercase tracking-wider mb-1">
                    MAY HELP WHEN
                  </h4>
                  <p className="text-xs font-bold text-sky-900 leading-snug">
                    {selectedPkg.mayHelpWhen}
                  </p>
                </div>
              )}

              {/* Fasting & Report TAT Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D69A18] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Report TAT</span>
                    <span>{selectedPkg.tat || "Standard Clinical TAT"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dna className="w-4 h-4 text-[#2563eb] shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Fasting Rule</span>
                    <span>{selectedPkg.fastingHours || "Fasting on Advice"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase">Sample Required</span>
                    <span>{selectedPkg.sampleType || "Blood & Specimen"}</span>
                  </div>
                </div>
              </div>

              {/* Key Tests Checklist */}
              {selectedPkg.keyTests && selectedPkg.keyTests.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Key Tests &amp; Components ({selectedPkg.keyTests.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedPkg.keyTests.map((kt, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{kt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Before Booking Guidance Note */}
              {selectedPkg.beforeBooking && (
                <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-1">
                  <h4 className="font-extrabold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-amber-700" /> Before Sample Collection
                  </h4>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    {selectedPkg.beforeBooking}
                  </p>
                </div>
              )}

              {/* Detailed Categorized Breakdown if available */}
              {selectedPkg.detailedBreakdown && selectedPkg.detailedBreakdown.length > 0 && (
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
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
              <a
                href={`tel:+919964639639`}
                className="flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border border-slate-300 hover:bg-slate-100 text-slate-800 bg-white cursor-pointer shadow-2xs text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-emerald-600" /> Call +91 9964 639 639
              </a>

              <a
                href={`https://wa.me/919964639639?text=${encodeURIComponent(`Hi QXL Diagnostics, I want to book / enquire about ${selectedPkg.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-2xl text-xs uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
