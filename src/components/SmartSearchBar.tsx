"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  FileText,
  ArrowLeft,
  X,
  Clock,
  TrendingUp,
  Activity,
  Plus,
  Check,
  Trash2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { parseCartItems, addItemToCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

interface SmartSearchBarProps {
  placeholder?: string;
  isMobile?: boolean;
}

interface TestMatch {
  id?: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  fasting: string;
  tat: string;
  parameters: string;
  keywords: string[];
}

const POPULAR_SEARCHES = ["CBC", "Thyroid", "HbA1c", "Vitamin D", "Lipid Profile"];

// Comprehensive Medical Ontology Catalog with Abbreviations, Synonyms, Symptoms & Patient Terms
const INTELLIGENT_CATALOG: TestMatch[] = [
  {
    name: "Complete Blood Count (CBC) / Complete Hemogram",
    category: "Hematology",
    price: 299,
    oldPrice: 800,
    fasting: "No Fasting",
    tat: "6 Hours",
    parameters: "26 Parameters",
    keywords: [
      "cbc", "cbp", "hemogram", "haemogram", "heamogram", "complete hemogram", "complete haemogram", "blood count", "wbc", "rbc", "platelet", "platelets",
      "hemoglobin", "haemoglobin", "hb", "anemia", "infection", "fever", "weakness", "blood test", "esr", "differential count"
    ],
  },
  {
    name: "HbA1c (Glycated Hemoglobin) - 3 Month Average Sugar",
    category: "Diabetes Care",
    price: 399,
    oldPrice: 1200,
    fasting: "No Fasting",
    tat: "6 Hours",
    parameters: "Single Parameter",
    keywords: [
      "hba1c", "hba1", "a1c", "glycated hemoglobin", "glycosylated hemoglobin", "sugar", "sugar test", "glucose",
      "diabetes", "diabetic", "3 month sugar", "dibetes", "suger", "insulin"
    ],
  },
  {
    name: "Fasting Blood Sugar (FBS)",
    category: "Diabetes Care",
    price: 190,
    oldPrice: 350,
    fasting: "Fasting 8-10 hrs",
    tat: "6 Hours",
    parameters: "Single Parameter",
    keywords: [
      "fbs", "fasting sugar", "sugar test", "sugar", "glucose", "fasting blood glucose", "diabetes", "dibetes", "fasting"
    ],
  },
  {
    name: "Post Prandial Blood Sugar (PPBS)",
    category: "Diabetes Care",
    price: 190,
    oldPrice: 350,
    fasting: "Post Meals 2 hrs",
    tat: "6 Hours",
    parameters: "Single Parameter",
    keywords: [
      "ppbs", "pp sugar", "post meals sugar", "sugar test", "sugar", "glucose", "diabetes", "pp"
    ],
  },
  {
    name: "Thyroid Profile Total (T3, T4, TSH)",
    category: "Endocrinology",
    price: 399,
    oldPrice: 1100,
    fasting: "No Fasting",
    tat: "6 Hours",
    parameters: "3 Parameters",
    keywords: [
      "thyroid", "tft", "tsh", "t3", "t4", "thyroxin", "thyrod", "thyriod", "throid", "weight gain", "weight loss",
      "hair fall", "hypothyroid", "hyperthyroid", "thyroid test", "tsh test"
    ],
  },
  {
    name: "Liver Function Test (LFT) - 11 Parameters",
    category: "Gastroenterology",
    price: 799,
    oldPrice: 1600,
    fasting: "Fasting 8 hrs",
    tat: "Same Day",
    parameters: "11 Parameters",
    keywords: [
      "lft", "liver", "liver test", "liver function", "sgot", "sgpt", "bilirubin", "jaundice", "fatty liver",
      "leaver", "alcohol", "transaminase", "alkaline phosphatase", "yellow eyes"
    ],
  },
  {
    name: "Kidney Function Test (KFT) / Renal Profile",
    category: "Nephrology",
    price: 799,
    oldPrice: 1700,
    fasting: "No Fasting",
    tat: "Same Day",
    parameters: "12 Parameters",
    keywords: [
      "kft", "rft", "kidney", "kidney test", "kidny", "renal", "creatinine", "creatnine", "creatinin", "urea", "uric acid", "swelling", "bun",
      "egfr"
    ],
  },
  {
    name: "Vitamin D (25-OH Hydroxy Vitamin D3)",
    category: "Vitamins & Minerals",
    price: 899,
    oldPrice: 2400,
    fasting: "No Fasting",
    tat: "Same Day",
    parameters: "Single Parameter",
    keywords: [
      "vitamin d", "vitamin d3", "vit d", "vit d3", "vitmin d", "d3", "bone density", "calcium", "joint pain",
      "bone pain", "sunlight vitamin", "vitamind", "vitamin"
    ],
  },
  {
    name: "Vitamin B12 (Cyanocobalamin)",
    category: "Vitamins & Minerals",
    price: 799,
    oldPrice: 1900,
    fasting: "No Fasting",
    tat: "Same Day",
    parameters: "Single Parameter",
    keywords: [
      "vitamin b12", "vit b12", "b12", "cyanocobalamin", "vitmin b12", "nerve pain", "numbness",
      "fatigue", "weakness", "tingling", "vitamin"
    ],
  },
  {
    name: "Dengue NS1 Antigen & IgG/IgM Combo",
    category: "Fever & Infection",
    price: 600,
    oldPrice: 1200,
    fasting: "No Fasting",
    tat: "4 Hours",
    parameters: "Single Parameter",
    keywords: [
      "dengue", "dengu", "ns1", "fever", "high fever", "platelet drop", "mosquito fever", "chills", "dengue test"
    ],
  },
  {
    name: "Malaria Parasite Identification (MP Rapid & Smear)",
    category: "Fever & Infection",
    price: 350,
    oldPrice: 700,
    fasting: "No Fasting",
    tat: "4 Hours",
    parameters: "Single Parameter",
    keywords: [
      "malaria", "malarya", "mp test", "fever", "shivering", "mosquito", "malaria test"
    ],
  },
  {
    name: "Typhoid Widal & Typhidot Antigen",
    category: "Fever & Infection",
    price: 400,
    oldPrice: 800,
    fasting: "No Fasting",
    tat: "6 Hours",
    parameters: "Single Parameter",
    keywords: [
      "typhoid", "widal", "typhidot", "enteric fever", "fever", "stomach infection", "typhoid test"
    ],
  },
  {
    name: "CRP (C-Reactive Protein) High Sensitivity",
    category: "Inflammation",
    price: 500,
    oldPrice: 950,
    fasting: "No Fasting",
    tat: "4 Hours",
    parameters: "Single Parameter",
    keywords: [
      "crp", "c-reactive protein", "inflammation", "fever", "viral infection", "body pain"
    ],
  },
  {
    name: "Lipid Profile Total (Cholesterol, Triglycerides, HDL, LDL)",
    category: "Cardiology",
    price: 699,
    oldPrice: 1600,
    fasting: "Fasting 10-12 hrs",
    tat: "Same Day",
    parameters: "9 Parameters",
    keywords: [
      "lipid", "cholesterol", "cholestrol", "triglycerides", "hdl", "ldl", "heart", "cardiac", "blood pressure",
      "bp", "chest pain", "fat", "lipid profile"
    ],
  },
  {
    name: "Quick Fit Health Checkup (80 Parameters)",
    category: "Full Body Checkup",
    price: 1770,
    oldPrice: 5800,
    fasting: "Fasting 10 hrs",
    tat: "6 Hours",
    parameters: "80 Parameters",
    keywords: [
      "full body", "whole body", "full body checkup", "health package", "annual checkup",
      "master checkup", "preventive health", "fullbody", "package", "checkup"
    ],
  },
];

// Levenshtein distance helper for fuzzy typo matching
function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function isIntelligentMatch(queryTerm: string, item: TestMatch): boolean {
  const q = queryTerm.toLowerCase().trim();
  if (!q) return false;

  // Direct substring match on name or category
  if (item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)) {
    return true;
  }

  // Keyword / abbreviation / symptom / synonym match
  for (const kw of item.keywords) {
    if (kw.toLowerCase().includes(q) || q.includes(kw.toLowerCase())) {
      return true;
    }
  }

  // Fuzzy typo matching (handles e.g. "thyrod", "dibetes", "vitmin", "hemogram", "dengu", "malarya", "kidny", "leaver")
  if (q.length >= 4) {
    for (const kw of item.keywords) {
      if (Math.abs(kw.length - q.length) <= 2) {
        const dist = getLevenshteinDistance(q, kw.toLowerCase());
        if (dist <= 2) return true;
      }
    }
  }

  return false;
}

export default function SmartSearchBar({
  placeholder = "Search tests, checkups or health concerns",
  isMobile = false,
}: SmartSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const cart = parseCartItems(localStorage.getItem("qxl_cart"));
      setAddedItems(cart.map((i) => i.name));
      const recent = JSON.parse(localStorage.getItem("qxl_recent_searches") || '["Full Body Checkup", "CBC"]');
      setRecentSearches(recent);
    } catch {}

    const handleCartChange = () => {
      try {
        const cart = parseCartItems(localStorage.getItem("qxl_cart"));
        setAddedItems(cart.map((i) => i.name));
      } catch {}
    };

    window.addEventListener("cartChange", handleCartChange);
    return () => window.removeEventListener("cartChange", handleCartChange);
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    const updated = [cleanTerm, ...recentSearches.filter((t) => t.toLowerCase() !== cleanTerm.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("qxl_recent_searches", JSON.stringify(updated));
    } catch {}
  };

  const handleClearHistory = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("qxl_recent_searches");
    } catch {}
  };

  const handleAddToCart = (test: TestMatch, e: React.MouseEvent) => {
    e.stopPropagation();
    addItemToCart({
      id: test.id || test.name.toLowerCase().replace(/\s+/g, "-"),
      name: test.name,
      price: test.price,
      fasting: test.fasting,
      tat: test.tat,
    });
    setAddedItems((prev) => [...prev.filter((n) => n.toLowerCase() !== test.name.toLowerCase()), test.name]);
  };

  // Perform intelligent search query evaluation
  const matchedResults = query.trim()
    ? INTELLIGENT_CATALOG.filter((item) => isIntelligentMatch(query, item))
    : [];

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const searchPrompts = [
    placeholder,
    "Search CBC, HbA1c, Thyroid or blood tests...",
    "Search symptoms like fever, fatigue, joint pain...",
    "Search packages like Full Body Checkup...",
    "Search Vitamin D, B12, Lipid or Liver tests..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIdx(prev => (prev + 1) % searchPrompts.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [searchPrompts.length]);

  return (
    <>
      {/* ── Standard Inline Search Bar Component with Animations ── */}
      <div
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className={`group relative flex items-center w-full bg-white transition-all duration-300 cursor-pointer overflow-hidden ${
          isMobile
            ? "rounded-2xl border border-slate-200 hover:border-[#D69A18] px-3.5 py-2.5 gap-2.5 shadow-2xs hover:shadow-[0_4px_20px_rgba(214,154,24,0.18)]"
            : "rounded-xl border border-slate-200 hover:border-[#D69A18] py-3 px-3.5 gap-2.5 shadow-2xs hover:shadow-[0_4px_20px_rgba(214,154,24,0.18)]"
        }`}
      >
        {/* Subtle animated glowing background highlight on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Animated Search Icon */}
        <Search className="w-4 h-4 text-slate-400 group-hover:text-[#D69A18] group-hover:scale-110 transition-all duration-300 shrink-0" />

        {/* Cycling Text Animation */}
        <div className="flex-1 overflow-hidden h-5 relative flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={placeholderIdx}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`absolute inset-x-0 text-slate-400 select-none truncate ${
                isMobile ? "text-[13px] font-medium" : "text-[14px] font-medium"
              }`}
            >
              {query || searchPrompts[placeholderIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Upload Prescription Rx Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent("openPrescriptionModal"));
          }}
          className="relative flex items-center justify-center p-1.5 hover:bg-amber-50 rounded-xl transition-all cursor-pointer shrink-0 border-l border-slate-200/80 pl-2 group/rx z-10"
          title="Upload Prescription"
        >
          <FileText className="w-5 h-5 text-[#0f2d5e] group-hover/rx:text-[#D69A18] group-hover/rx:scale-110 transition-all duration-200" strokeWidth={1.8} />
          <span className="absolute -bottom-1 -right-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full border border-white flex items-center justify-center shadow-2xs group-hover/rx:scale-110 transition-transform">
            <Plus className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
          </span>
        </button>
      </div>

      {/* ── DEDICATED SEARCH SCREEN (P0 Full-Screen Search Interface) ── */}
      {isOpen && (
        <div className="fixed inset-0 z-[100005] bg-white flex flex-col overflow-hidden animate-in fade-in duration-200">
          {/* Top Search Input Header */}
          <div className="bg-white border-b border-slate-200 p-3 sm:p-4 flex items-center gap-3 shrink-0 shadow-xs">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
              aria-label="Close search"
            >
              <ArrowLeft className="w-5 h-5 text-[#0f2d5e]" />
            </button>

            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#D69A18] rounded-2xl px-3.5 py-2.5 gap-2.5 shadow-inner">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    saveRecentSearch(query);
                  }
                }}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none text-[#0f2d5e] placeholder-slate-400 text-sm font-bold focus:outline-none min-w-0"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 shrink-0 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Prescription Rx Button */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent("openPrescriptionModal"));
              }}
              className="w-9 h-9 rounded-full bg-amber-50 border border-[#F3DBA7] flex items-center justify-center text-[#D69A18] shrink-0 cursor-pointer"
              title="Upload Prescription"
            >
              <FileText className="w-4 h-4 text-[#D69A18]" />
            </button>
          </div>

          {/* Search Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* If Query is Empty -> Show Recent Searches & Popular Searches */}
            {!query.trim() ? (
              <>
                {/* 1. Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <h3 className="font-extrabold text-[#0f2d5e] text-xs uppercase tracking-wider">
                          Recent Searches
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearHistory}
                        className="text-[11px] font-extrabold text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Clear
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleSelectSearch(term)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-amber-50 border border-slate-200 hover:border-[#F3DBA7] text-[#0f2d5e] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                        >
                          <span>{term}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Popular Searches (P0 Exact Requirement List) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-3">
                    <TrendingUp className="w-4 h-4 text-[#D69A18]" />
                    <h3 className="font-extrabold text-[#0f2d5e] text-xs uppercase tracking-wider">
                      Popular Searches
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {POPULAR_SEARCHES.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => handleSelectSearch(term)}
                        className="px-4 py-2 bg-[#FFF8EB] hover:bg-[#FFF2D6] border border-[#F3DBA7] hover:border-[#D69A18] text-[#0f2d5e] font-black text-xs rounded-xl shadow-2xs transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#D69A18]" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* If User is Typing -> Intelligent Live Results */
              <div className="space-y-4" role="status" aria-live="polite">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#D69A18]" />
                    <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
                      Intelligent Search Results ({matchedResults.length})
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700">✓ Free Home Collection</span>
                </div>

                {matchedResults.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <p className="text-slate-500 font-extrabold text-sm">No exact test matches found for "{query}"</p>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto font-medium">
                      Try searching by medical abbreviation (e.g. CBC, LFT, KFT), symptom (e.g. fever, fatigue), or health package name.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/book");
                      }}
                      className="inline-flex items-center gap-2 bg-[#D69A18] hover:bg-[#b88313] !text-white font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                      style={{ color: "#ffffff" }}
                    >
                      <span className="!text-white font-black" style={{ color: "#ffffff" }}>Proceed to Custom Booking</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {matchedResults.map((test, idx) => {
                      const isAdded = addedItems.includes(test.name);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            saveRecentSearch(test.name);
                            setIsOpen(false);
                            router.push(`/book?tests=${encodeURIComponent(test.name)}`);
                          }}
                          className="bg-white border border-slate-200 hover:border-[#D69A18] rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                        >
                          <div className="flex flex-col gap-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="bg-amber-50 text-[#D69A18] border border-[#F3DBA7] text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase shrink-0">
                                {test.category}
                              </span>
                              <span className="font-extrabold text-[#0f2d5e] text-xs sm:text-sm leading-snug truncate">
                                {test.name}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-[10.5px] text-slate-500 font-semibold mt-0.5">
                              <span>{test.parameters}</span>
                              <span>•</span>
                              <span className="text-emerald-700 font-bold">⏳ {test.fasting}</span>
                              <span>•</span>
                              <span className="text-sky-700 font-bold">⚡ {test.tat}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <span className="font-black text-[#0f2d5e] text-sm block">₹{test.price}</span>
                              {test.oldPrice && (
                                <span className="text-[11px] text-slate-400 line-through font-bold block">₹{test.oldPrice}</span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(test, e)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                                isAdded
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                  : "bg-[#D69A18] hover:bg-[#b88313] !text-white shadow-xs active:scale-95"
                              }`}
                              style={!isAdded ? { color: "#ffffff" } : undefined}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5 text-white" />
                                  <span className="!text-white font-black" style={{ color: "#ffffff" }}>Add</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
