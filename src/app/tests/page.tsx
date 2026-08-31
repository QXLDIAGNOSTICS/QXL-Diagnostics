"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles, Filter } from "lucide-react";
import { NABL_CERTIFICATE, PHONE_DISPLAY, WHATSAPP_LINK } from "@/lib/businessInfo";

import { MASTER_CATALOGUE } from "@/lib/masterCatalogue";

export interface TestDirectoryItem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  mrp: number;
  parametersCount: string;
  sampleType: string;
  fasting: string;
  tat: string;
  icon: string;
  popular?: boolean;
  aliases: string[];
}

export const CATEGORIES = [
  "All Categories",
  "Popular Tests",
  "Blood Tests",
  "Diabetes",
  "Thyroid",
  "Heart",
  "Liver",
  "Kidney",
  "Vitamins",
  "Hormones",
  "Women's Health",
  "Fertility",
  "Pregnancy Screening",
  "Autoimmune",
  "Allergy",
  "Food Intolerance",
  "Cancer Markers",
  "Infectious Diseases",
  "Molecular Diagnostics",
  "Neurology",
  "Gastroenterology",
  "Advanced Reference Tests"
] as const;

export const ALL_DIRECTORY_TESTS: TestDirectoryItem[] = MASTER_CATALOGUE.map((m) => ({
  id: m.id,
  slug: m.slug,
  name: m.name,
  shortName: m.shortName,
  category: m.category,
  price: m.price,
  mrp: m.mrp,
  parametersCount: m.paramText,
  sampleType: m.sampleType,
  fasting: m.fastingInstruction,
  tat: m.tat,
  icon: m.icon,
  popular: m.popular,
  aliases: m.aliases,
}));


export default function TestsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddToCart = (name: string) => {
    try {
      const stored = localStorage.getItem("qxl_cart");
      const current: string[] = stored ? JSON.parse(stored) : [];
      if (!current.includes(name)) {
        const updated = [...current, name];
        localStorage.setItem("qxl_cart", JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("cartChange"));
      }
    } catch {}
  };

  const filteredTests = useMemo(() => {
    return ALL_DIRECTORY_TESTS.filter((test) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories"
          ? true
          : selectedCategory === "Popular Tests"
          ? test.popular === true
          : test.category === selectedCategory;

      // Search filter (Name, Short Name, Category, Aliases)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        test.name.toLowerCase().includes(q) ||
        test.shortName.toLowerCase().includes(q) ||
        test.category.toLowerCase().includes(q) ||
        test.aliases.some((alias) => alias.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Diagnostic Tests Directory — QXL Diagnostics Bengaluru",
    "description": "Complete list of NABL Certified diagnostic blood tests, hormone panels, and advanced reference assays available at QXL Diagnostics Bengaluru.",
    "numberOfItems": filteredTests.length,
    "itemListElement": filteredTests.slice(0, 30).map((t, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": t.name,
      "url": `https://qxldiagnostics.com${t.slug}`
    }))
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Banner Header */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-10 lg:py-14 border-b border-sky-950 shadow-md">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-400/90 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  NABL ACCREDITED ({NABL_CERTIFICATE})
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                  Free Doorstep Collection
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
                Diagnostic Tests at QXL Diagnostics Bengaluru
              </h1>
              <p className="text-sky-100 text-xs sm:text-sm font-medium leading-relaxed">
                Explore our comprehensive laboratory test inventory—from routine blood counts and HbA1c to advanced immunofluorescence, SPEP, and fetal screening assays. All tests reviewed by consultant pathologists.
              </p>
            </div>

            {/* Quick Contact Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shrink-0 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>ISO 15189:2022 Quality Assured</span>
              </div>
              <p className="text-slate-200 font-semibold">Same-Day Reports on WhatsApp &amp; Email</p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-xs transition-all uppercase text-[11px] tracking-wide"
              >
                Booking Helpline: {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Search Bar Input */}
          <div className="mt-8 relative max-w-3xl">
            <input
              type="text"
              placeholder="Search by test name, short code, symptom, or alias (e.g. CBC, HbA1c, TSH, SPEP, ANA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-semibold px-5 py-3.5 rounded-2xl border-2 border-amber-400/60 focus:border-amber-400 focus:outline-none shadow-lg pr-12"
            />
            <Search className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Category Pills Slider */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1260px] mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-[#0f2d5e] text-white shadow-xs scale-105"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Directory Listing */}
      <main className="max-w-[1260px] mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#0f2d5e] tracking-tight">
              {selectedCategory === "All Categories" ? "All Diagnostic Tests" : selectedCategory}
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Showing {filteredTests.length} popular test{filteredTests.length !== 1 ? "s" : ""} (from 300+ total catalogue) available in Bengaluru
            </p>
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-amber-700 hover:underline font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200"
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredTests.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
            <p className="text-3xl mb-3">🔍</p>
            <h3 className="font-extrabold text-slate-800 text-lg mb-2">No matching tests found</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
              We couldn't find a test matching &quot;{searchQuery}&quot;. Contact our central laboratory team directly for custom assay inquiries.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#0f2d5e] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider"
            >
              Ask Lab Desk on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon, Name, Category */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        {test.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {test.category}
                        </span>
                        <Link href={test.slug} className="block mt-1">
                          <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-[#0f2d5e] transition-colors">
                            {test.name}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Aliases Pill */}
                  {test.aliases.length > 0 && (
                    <p className="text-[10.5px] text-slate-500 font-semibold mb-3 leading-normal">
                      <span className="font-bold text-slate-700">Also known as:</span> {test.aliases.slice(0, 4).join(" · ")}
                    </p>
                  )}

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="text-[9.5px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                      🔬 {test.sampleType}
                    </span>
                    <span className="text-[9.5px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      ⏳ {test.fasting}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      ⚡ Report: {test.tat}
                    </span>
                    <span className="text-[9.5px] font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                      📊 {test.parametersCount}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-[#0f2d5e]">₹{test.price}</span>
                      <span className="text-[11px] text-slate-400 line-through font-semibold">₹{test.mrp}</span>
                    </div>
                    <span className="text-[9.5px] font-extrabold text-emerald-600 block">Home Collection Included</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={test.slug}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-extrabold px-2.5 py-1.5 rounded-xl transition-all"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(test.name)}
                      className="bg-[#2563eb] hover:bg-blue-700 text-white text-[11px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-2xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* SEO Content Footer Box */}
      <section className="max-w-[1260px] mx-auto px-4 mt-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-lg font-black text-[#0f2d5e]">
            Why Search &amp; Book Diagnostic Tests at QXL Diagnostics Bengaluru?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-xs text-slate-600 font-medium leading-relaxed">
            <div>
              <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Pathologist-Led Validation
              </h3>
              <p>Every test parameter is analyzed using automated analyzer platforms and verified by consultant pathologists and clinical biochemists under NABL MC-6849 quality controls.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" /> Doorstep Phlebotomy Across Bengaluru
              </h3>
              <p>Free home blood sample collection available across Kengeri, Yelahanka, RR Nagar, Nagarabhavi, Vijayanagar, JP Nagar, Whitefield, HSR, and all major areas with cold-chain transport.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" /> Same-Day Digital Delivery
              </h3>
              <p>Receive clear, doctor-reviewed PDF reports directly on your WhatsApp and Email within 4 to 12 hours for routine diagnostics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
