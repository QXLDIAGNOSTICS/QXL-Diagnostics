"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Dna, FileText, Plus, Check } from "lucide-react";

export interface MostBookedTest {
  id: string;
  name: string;
  parametersCount?: number;
  tat: string;
  originalPrice: number;
  discountPercent: number;
  currentPrice: number;
  slug: string;
}

export const MOST_BOOKED_TESTS: MostBookedTest[] = [
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    parametersCount: 26,
    tat: "6 hours",
    originalPrice: 350,
    discountPercent: 28,
    currentPrice: 250,
    slug: "cbc-test",
  },
  {
    id: "hba1c",
    name: "Glycosylated Haemoglobin (HbA1c)",
    parametersCount: 3,
    tat: "6 hours",
    originalPrice: 720,
    discountPercent: 47,
    currentPrice: 380,
    slug: "hba1c-test",
  },
  {
    id: "tft",
    name: "Thyroid Profile (TSH, FT3, FT4)",
    parametersCount: 3,
    tat: "6 hours",
    originalPrice: 550,
    discountPercent: 36,
    currentPrice: 350,
    slug: "thyroid-test",
  },
  {
    id: "vit-d",
    name: "Vitamin D (25-OH Total)",
    parametersCount: 1,
    tat: "6 hours",
    originalPrice: 1300,
    discountPercent: 68,
    currentPrice: 410,
    slug: "vitamin-d-test",
  },
  {
    id: "vit-b12",
    name: "Vitamin B12",
    parametersCount: 1,
    tat: "6 hours",
    originalPrice: 1600,
    discountPercent: 62,
    currentPrice: 600,
    slug: "vitamin-b12-test",
  },
  {
    id: "lipid",
    name: "Lipid Profile (Cholesterol & Ratios)",
    parametersCount: 8,
    tat: "6 hours",
    originalPrice: 560,
    discountPercent: 40,
    currentPrice: 336,
    slug: "lipid-profile",
  },
  {
    id: "lft",
    name: "Liver Function Test (LFT)",
    parametersCount: 11,
    tat: "6 hours",
    originalPrice: 780,
    discountPercent: 45,
    currentPrice: 425,
    slug: "liver-function-test",
  },
  {
    id: "kft",
    name: "Kidney Function Test (KFT)",
    parametersCount: 10,
    tat: "6 hours",
    originalPrice: 1150,
    discountPercent: 63,
    currentPrice: 425,
    slug: "kidney-function-test",
  },
];

interface Props {
  cartItems?: string[];
  onToggleCart?: (item: { id: string; name: string; price: number }) => void;
}

export default function MostBookedTestsCarousel({
  cartItems = [],
  onToggleCart,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-4 sm:py-6 overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4 relative">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Most Booked Tests
          </h2>
          <Link
            href="/tests"
            className="text-xs sm:text-sm font-extrabold text-[#2563EB] hover:underline flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-1 -mx-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {MOST_BOOKED_TESTS.map((test) => {
              const isAdded = cartItems.some(
                (item) =>
                  item.toLowerCase() === test.name.toLowerCase() ||
                  item.toLowerCase() === test.id.toLowerCase()
              );

              return (
                <div
                  key={test.id}
                  className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-white rounded-[24px] sm:rounded-[26px] p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 snap-start flex flex-col justify-between"
                >
                  <div>
                    {/* Test Title */}
                    <Link href={`/${test.slug}`}>
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 min-h-[44px] hover:text-[#2563EB] transition-colors mb-4">
                        {test.name}
                      </h3>
                    </Link>

                    {/* Includes & Reports In Row */}
                    <div className="flex items-center gap-4 mb-6">
                      {test.parametersCount ? (
                        <div className="flex items-start gap-1.5">
                          <Dna className="w-4 h-4 text-[#9A8068] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                              INCLUDES
                            </span>
                            <span className="text-xs font-extrabold text-slate-900 leading-tight">
                              {test.parametersCount} Parameters
                            </span>
                          </div>
                        </div>
                      ) : null}

                      <div className="flex items-start gap-1.5">
                        <FileText className="w-4 h-4 text-[#9A8068] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                            REPORTS IN
                          </span>
                          <span className="text-xs font-extrabold text-slate-900 leading-tight">
                            {test.tat}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Add Row */}
                  <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-xs text-slate-400 font-semibold line-through">
                          ₹{test.originalPrice}
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-[#E6F7F0] border border-emerald-200 px-1.5 py-0.5 rounded-full">
                          {test.discountPercent}% Off
                        </span>
                      </div>
                      <div className="text-xl font-black text-slate-900 tracking-tight">
                        ₹{test.currentPrice}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onToggleCart) {
                          onToggleCart({
                            id: test.id,
                            name: test.name,
                            price: test.currentPrice,
                          });
                        }
                      }}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs ${
                        isAdded
                          ? "bg-slate-100 text-slate-700 border border-slate-300"
                          : "bg-white border-2 border-[#f97316] text-[#f97316] hover:bg-[#fff7ed]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>In cart</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button (Matching Image 4) */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next tests"
            className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#525252]/80 hover:bg-[#333333] text-white items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous tests"
            className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#525252]/80 hover:bg-[#333333] text-white items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
