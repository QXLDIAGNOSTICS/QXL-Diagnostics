"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, CheckCircle2, Clock, Beaker, ArrowRight, Sparkles } from "lucide-react";
import { ALL_DIRECTORY_TESTS, TestDirectoryItem, CATEGORIES } from "@/app/tests/page";

interface TestSearchEngineProps {
  title?: string;
  subtitle?: string;
  showCategoryPills?: boolean;
  limitResults?: number;
}

export default function TestSearchEngine({
  title = "Find Diagnostic Tests & Packages",
  subtitle = "Search 300+ blood, pathology, and speciality tests by name, symptom, or preparation",
  showCategoryPills = true,
  limitResults,
}: TestSearchEngineProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [fastingFilter, setFastingFilter] = useState<"all" | "no-fasting" | "fasting">("all");

  const filteredTests = useMemo(() => {
    return ALL_DIRECTORY_TESTS.filter((test) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories"
          ? true
          : selectedCategory === "Popular Tests"
          ? test.popular === true
          : test.category === selectedCategory;

      // Fasting filter
      const isFasting = test.fasting.toLowerCase().includes("fasting required");
      const matchesFasting =
        fastingFilter === "all"
          ? true
          : fastingFilter === "fasting"
          ? isFasting
          : !isFasting;

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        test.name.toLowerCase().includes(q) ||
        test.shortName.toLowerCase().includes(q) ||
        test.category.toLowerCase().includes(q) ||
        test.aliases.some((alias) => alias.toLowerCase().includes(q));

      return matchesCategory && matchesFasting && matchesSearch;
    });
  }, [selectedCategory, fastingFilter, searchQuery]);

  const displayedTests = limitResults ? filteredTests.slice(0, limitResults) : filteredTests;

  return (
    <div className="w-full">
      {/* Engine Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <span className="inline-block bg-sky-100 text-[#2563eb] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-sky-200">
          Smart Test Directory
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] mb-2">{title}</h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">{subtitle}</p>
      </div>

      {/* Main Search Input & Fasting Toggles */}
      <div className="max-w-3xl mx-auto mb-6 space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search CBC, HbA1c, Vitamin D, Thyroid, Liver, SPEP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-semibold px-5 py-4 rounded-2xl border-2 border-sky-200 focus:border-[#2563eb] focus:outline-none shadow-md pr-12 transition-all"
          />
          <Search className="w-5 h-5 text-sky-600 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Fasting Quick Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-extrabold uppercase text-[10px]">Filter by Fasting:</span>
            <button
              onClick={() => setFastingFilter("all")}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                fastingFilter === "all" ? "bg-[#0f2d5e] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Tests
            </button>
            <button
              onClick={() => setFastingFilter("no-fasting")}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                fastingFilter === "no-fasting" ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              💡 No Fasting Needed
            </button>
            <button
              onClick={() => setFastingFilter("fasting")}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                fastingFilter === "fasting" ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              🌙 Fasting Required
            </button>
          </div>
          <span className="text-slate-500 font-semibold text-[11px]">
            Showing <strong className="text-[#0f2d5e]">{displayedTests.length}</strong> of {ALL_DIRECTORY_TESTS.length} tests
          </span>
        </div>
      </div>

      {/* Category Pills */}
      {showCategoryPills && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mb-6 max-w-5xl mx-auto">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-[#2563eb] text-white shadow-sm scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {displayedTests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-2xl">{test.icon}</span>
                <span className="text-[10px] font-extrabold bg-sky-50 text-[#2563eb] px-2.5 py-0.5 rounded-full border border-sky-100 uppercase">
                  {test.category}
                </span>
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-base leading-snug mb-1 hover:text-[#2563eb] transition-colors">
                <Link href={test.slug}>{test.name}</Link>
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-2">
                <Beaker className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                {test.parametersCount} · {test.sampleType}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4 text-[11px]">
                <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {test.tat}
                </span>
                <span className={`font-semibold px-2 py-0.5 rounded-md ${
                  test.fasting.toLowerCase().includes("no fasting")
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-900 border border-amber-200"
                }`}>
                  {test.fasting}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-emerald-600">₹{test.price}</span>
                  <span className="text-xs text-slate-400 line-through">₹{test.mrp}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-semibold">Free home collection</span>
              </div>
              <Link
                href={test.slug}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {displayedTests.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto">
          <p className="text-slate-500 font-bold text-sm mb-2">No tests matched your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All Categories");
              setFastingFilter("all");
            }}
            className="text-xs font-black text-[#2563eb] hover:underline"
          >
            Reset Filters &amp; View All Tests
          </button>
        </div>
      )}
    </div>
  );
}
