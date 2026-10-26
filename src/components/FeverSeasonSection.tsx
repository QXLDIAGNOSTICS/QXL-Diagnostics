"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Dna, Clock, Plus, Check, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export interface FeverPackage {
  id: string;
  name: string;
  parametersCount: number;
  tat: string;
  originalPrice: number;
  discountPercent: number;
  currentPrice: number;
  slug: string;
  tag: string;
  description: string;
}

export const FEVER_PACKAGES: FeverPackage[] = [
  {
    id: "cbc-platelets",
    name: "CBC with Platelet Count",
    parametersCount: 26,
    tat: "6 hours",
    originalPrice: 350,
    discountPercent: 28,
    currentPrice: 250,
    slug: "cbc-test",
    tag: "MOST FREQUENT IN FEVER",
    description: "Emergency platelet surveillance & total leukocyte counts for viral fever.",
  },
  {
    id: "dengue-cbc",
    name: "Dengue Profile - Rapid with CBC",
    parametersCount: 27,
    tat: "6 hours",
    originalPrice: 950,
    discountPercent: 37,
    currentPrice: 600,
    slug: "packages",
    tag: "DAY 1 DETECTION",
    description: "Dengue NS1 Antigen + IgG/IgM Antibodies + Full Hemogram & Platelets.",
  },
  {
    id: "typhoid-malaria",
    name: "Typhoid & Malaria Fever Screen",
    parametersCount: 15,
    tat: "6 hours",
    originalPrice: 980,
    discountPercent: 44,
    currentPrice: 550,
    slug: "packages",
    tag: "VECTOR & ENTERIC",
    description: "TyphiDot IgM/IgG antibody screen with Malaria antigen & peripheral smear.",
  },
  {
    id: "fever-comprehensive",
    name: "Acute Fever Profile (#36)",
    parametersCount: 69,
    tat: "12 hours",
    originalPrice: 3200,
    discountPercent: 44,
    currentPrice: 1800,
    slug: "packages",
    tag: "COMPREHENSIVE DIFFERENTIAL",
    description: "Full differential: CBC, Dengue NS1, Widal/Typhoid, Urine Routine, SGPT & ESR.",
  },
  {
    id: "monsoon-fever-pro",
    name: "Monsoon & Viral Fever Panel Pro",
    parametersCount: 74,
    tat: "12 hours",
    originalPrice: 4200,
    discountPercent: 52,
    currentPrice: 1999,
    slug: "packages",
    tag: "EXTENDED OUTBREAK PANEL",
    description: "Complete seasonal outbreak screening covering Dengue, Chikungunya, Typhoid & CBC.",
  },
];

interface Props {
  cartItems?: string[];
  onToggleCart?: (item: { id: string; name: string; price: number }) => void;
  onSelectPackage?: (pkg: FeverPackage) => void;
}

export default function FeverSeasonSection({
  cartItems = [],
  onToggleCart,
  onSelectPackage,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll, { passive: true });
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="fever-season" className="w-full bg-gradient-to-b from-[#F0F7FF] via-[#EAF3FD] to-[#F5F9FF] py-8 sm:py-12 border-y border-[#D6E6F7] overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4">
        
        {/* Top Header Badge Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#1E40AF] text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              Seasonal Outbreak Surveillance
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-white/80 border border-slate-200/80 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              NABL Accredited · Doctor Verified
            </span>
          </div>

          <Link
            href="/packages"
            className="text-xs sm:text-sm font-extrabold text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex items-center gap-1 transition-colors"
          >
            <span>View All Infectious Disease Panels</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Main Grid: Left Hero Card + Right Package Slide Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Left Column: Modern Hero Visual Card (4 Cols on LG, Full width on Mobile) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-3xl sm:rounded-[30px] p-5 sm:p-6 border border-[#BFDBFE] shadow-sm relative overflow-hidden group">
            
            {/* Top Text Content */}
            <div className="relative z-10">
              <span className="text-[11px] font-extrabold text-[#2563EB] uppercase tracking-widest block mb-1">
                Stay Ahead Of
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] tracking-tight leading-tight">
                Fever Season
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-600 font-medium mt-2 leading-relaxed">
                Early viral screening, Dengue NS1 & platelet monitoring with doorstep blood draw in 60 minutes across Bengaluru.
              </p>

              {/* Clinical Highlights Pills */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse shrink-0"></span>
                  <span>Same-Day Emergency Platelet TAT (6 hrs)</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 bg-[#F0FDF4] border border-[#DCFCE7] px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>Zero Sample Collection Charge in BLR</span>
                </div>
              </div>
            </div>

            {/* Hero Image Card */}
            <div className="mt-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <Image
                src="/images/home_sections/fever_season_hero.jpg"
                alt="Compassionate Home Sample Collection for Fever"
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  Phlebotomist at home in 60 mins
                </span>
                <span className="text-[10px] text-emerald-300 font-black">FASTEST TAT</span>
              </div>
            </div>

            {/* Bottom Doctor Consultation Tip */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Don&apos;t ignore fever &gt; 101°F
              </span>
              <a
                href="https://api.whatsapp.com/send?phone=919964639639&text=Hello%20QXL,%20I%20have%20fever%20symptoms%20and%20need%20urgent%20blood%20test"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] font-bold hover:underline"
              >
                Chat with Lab
              </a>
            </div>
          </div>

          {/* Right Column: Slide / Carousel of Fever Test Panels (8 Cols on LG) */}
          <div className="lg:col-span-8 flex flex-col justify-between relative">
            
            {/* Carousel Container with Arrows */}
            <div className="relative group/carousel h-full flex flex-col justify-between">
              
              <div
                ref={scrollRef}
                className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-1 -mx-1 snap-x snap-mandatory h-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {FEVER_PACKAGES.map((pkg) => {
                  const isAdded = cartItems.some(
                    (item) =>
                      item.toLowerCase() === pkg.name.toLowerCase() ||
                      item.toLowerCase() === pkg.id.toLowerCase()
                  );

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage && onSelectPackage(pkg)}
                      className="shrink-0 w-[260px] sm:w-[285px] md:w-[300px] bg-white rounded-3xl p-5 sm:p-5.5 border border-[#BFDBFE]/70 hover:border-[#2563EB] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 snap-start flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        {/* Tag Pill */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                            {pkg.tag}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {pkg.tat}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-extrabold text-[#0f2d5e] text-base leading-snug line-clamp-2 min-h-[46px] group-hover:text-[#2563EB] transition-colors">
                          {pkg.name}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-slate-500 font-medium mt-1 mb-4 line-clamp-2 leading-relaxed">
                          {pkg.description}
                        </p>

                        {/* Parameters & Reports Metric Row */}
                        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 mb-4">
                          <div className="flex items-start gap-1.5">
                            <Dna className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                INCLUDES
                              </span>
                              <span className="text-xs font-black text-slate-800">
                                {pkg.parametersCount} Tests
                              </span>
                            </div>
                          </div>

                          <div className="flex items-start gap-1.5">
                            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                                REPORTS IN
                              </span>
                              <span className="text-xs font-black text-slate-800">
                                {pkg.tat}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Add to Cart Action */}
                      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs text-slate-400 font-bold line-through">
                              ₹{pkg.originalPrice}
                            </span>
                            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                              {pkg.discountPercent}% Off
                            </span>
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-[#0f2d5e] tracking-tight">
                            ₹{pkg.currentPrice}
                          </div>
                        </div>

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
                          className={`px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs ${
                            isAdded
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600"
                              : "bg-[#0f2d5e] hover:bg-[#2563EB] text-white border border-[#0f2d5e]"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 stroke-[3]" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slider Arrows (Floating on hover / visible on tablet/desktop) */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  aria-label="Previous fever packages"
                  className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {canScrollRight && (
                <button
                  type="button"
                  onClick={() => scroll("right")}
                  aria-label="Next fever packages"
                  className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Mobile swipe helper text */}
            <div className="flex sm:hidden justify-center items-center gap-1 text-[11px] text-slate-400 font-semibold mt-2">
              <span>Swipe left to view all fever panels</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
