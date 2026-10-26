"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Dna, FileText, Plus, Check } from "lucide-react";

export interface PackageCardData {
  id: string;
  name: string;
  parametersCount: number;
  tat: string;
  originalPrice: number;
  discountPercent: number;
  currentPrice: number;
  slug?: string;
  tag?: string;
}

export const PACKAGES_DATA: PackageCardData[] = [
  {
    id: "q-quick-fit",
    name: "Quick Fit Health Package",
    parametersCount: 80,
    tat: "12 hours",
    originalPrice: 4696,
    discountPercent: 62,
    currentPrice: 1770,
    slug: "book?package=q-quick-fit",
    tag: "MOST POPULAR",
  },
  {
    id: "q-screen-diabetes",
    name: "Q-Screen Diabetes Package",
    parametersCount: 62,
    tat: "12 hours",
    originalPrice: 4960,
    discountPercent: 62,
    currentPrice: 1900,
    slug: "book?package=q-screen-diabetes",
    tag: "DIABETES CARE",
  },
  {
    id: "q-master-pro",
    name: "Q-Master Health Pro Package",
    parametersCount: 92,
    tat: "12 hours",
    originalPrice: 9600,
    discountPercent: 52,
    currentPrice: 4600,
    slug: "book?package=q-master-pro",
    tag: "EXECUTIVE FULL BODY",
  },
  {
    id: "ultra-full-body",
    name: "Ultra Full Body Checkup",
    parametersCount: 117,
    tat: "24 hours",
    originalPrice: 18588,
    discountPercent: 73,
    currentPrice: 4999,
    slug: "packages",
    tag: "COMPREHENSIVE",
  },
  {
    id: "q-cardio-risk",
    name: "Cardiovascular Risk Assessment",
    parametersCount: 48,
    tat: "24 hours",
    originalPrice: 18900,
    discountPercent: 52,
    currentPrice: 9000,
    slug: "packages",
    tag: "CARDIAC RISK",
  },
  {
    id: "q-arthritis-autoimmune",
    name: "Advanced Arthritis & Autoimmune",
    parametersCount: 36,
    tat: "24 hours",
    originalPrice: 12660,
    discountPercent: 45,
    currentPrice: 6900,
    slug: "packages",
    tag: "JOINT HEALTH",
  },
];

interface Props {
  cartItems?: string[];
  onToggleCart?: (item: { id: string; name: string; price: number }) => void;
  onSelectPackage?: (pkg: PackageCardData) => void;
}

export default function PackagesCarousel({
  cartItems = [],
  onToggleCart,
  onSelectPackage,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-4 sm:py-6 overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4 relative">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Popular Health Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Doctor-reviewed comprehensive screenings with fast digital reports
            </p>
          </div>
          <Link
            href="/packages"
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
            {PACKAGES_DATA.map((pkg) => {
              const isAdded = cartItems.some(
                (item) =>
                  item.toLowerCase() === pkg.name.toLowerCase() ||
                  item.toLowerCase() === pkg.id.toLowerCase()
              );

              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage && onSelectPackage(pkg)}
                  className="shrink-0 w-[270px] sm:w-[290px] md:w-[310px] bg-white rounded-[24px] sm:rounded-[26px] p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 snap-start flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Package Title */}
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-[17px] leading-snug line-clamp-1 mb-4">
                      {pkg.name}
                    </h3>

                    {/* Includes & Reports In Row */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {/* Includes */}
                      <div className="flex items-start gap-2">
                        <Dna className="w-5 h-5 text-[#9A8068] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                            INCLUDES
                          </span>
                          <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-tight">
                            {pkg.parametersCount} Parameters
                          </span>
                        </div>
                      </div>

                      {/* Reports In */}
                      <div className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-[#9A8068] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                            REPORTS IN
                          </span>
                          <span className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-tight">
                            {pkg.tat}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Add Row */}
                  <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                    {/* Price and discount badge */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs text-slate-400 font-semibold line-through">
                          ₹{pkg.originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-800 bg-[#E6F7F0] border border-emerald-200 px-2 py-0.5 rounded-full">
                          {pkg.discountPercent}% Off
                        </span>
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        ₹{pkg.currentPrice.toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Add to Cart button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleCart) {
                          onToggleCart({
                            id: pkg.id,
                            name: pkg.name,
                            price: pkg.currentPrice,
                          });
                        }
                      }}
                      className={`px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs ${
                        isAdded
                          ? "bg-emerald-600 text-white border-2 border-emerald-600"
                          : "bg-white border-2 border-[#f97316] text-[#f97316] hover:bg-[#fff7ed]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Added</span>
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

          {/* Right Arrow Button (Matching Image 2) */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next packages"
            className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#525252]/80 hover:bg-[#333333] text-white items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous packages"
            className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#525252]/80 hover:bg-[#333333] text-white items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
