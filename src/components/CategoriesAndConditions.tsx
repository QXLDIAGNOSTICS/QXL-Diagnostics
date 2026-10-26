"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ConditionCard {
  id: string;
  name: string;
  image: string;
  link: string;
  hasOverlayTitle?: boolean;
}

const CONDITIONS: ConditionCard[] = [
  { id: "thyroid", name: "Thyroid", image: "/images/home_sections/cond_thyroid.png", link: "/conditions/thyroid" },
  { id: "hairfall", name: "Hair Fall", image: "/images/home_sections/cond_hairfall.png", link: "/conditions/hair-fall" },
  { id: "jointpain", name: "Joint Pain", image: "/images/home_sections/cond_jointpain.png", link: "/conditions/joint-pain" },
  { id: "allergy", name: "Allergy", image: "/images/home_sections/cond_allergy.png", link: "/conditions/allergy" },
  { id: "diabetes", name: "Diabetes", image: "/images/home_sections/cond_diabetes.jpg", link: "/conditions/diabetes-testing", hasOverlayTitle: true },
  { id: "heart", name: "Heart Health", image: "/images/home_sections/cond_heart.jpg", link: "/conditions/heart-health", hasOverlayTitle: true },
  { id: "fatigue", name: "Fatigue & Energy", image: "/images/home_sections/cond_fatigue.jpg", link: "/conditions/anaemia-testing", hasOverlayTitle: true },
  { id: "gut", name: "Gut & Digestion", image: "/images/home_sections/cond_gut.jpg", link: "/conditions/food-intolerance-digestive", hasOverlayTitle: true },
  { id: "pcos", name: "Women's Health", image: "/images/home_sections/cond_pcos.jpg", link: "/conditions/womens-health", hasOverlayTitle: true },
];

export default function CategoriesAndConditions() {
  const conditionsScrollRef = useRef<HTMLDivElement>(null);

  const scrollConditions = (direction: "left" | "right") => {
    if (conditionsScrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      conditionsScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-4 sm:py-6 overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4">
        {/* Full-Width Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              FOR YOUR
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Health Conditions
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollConditions("left")}
              aria-label="Previous conditions"
              className="w-8.5 h-8.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollConditions("right")}
              aria-label="Next conditions"
              className="w-8.5 h-8.5 rounded-full bg-[#38322e]/85 hover:bg-black text-white flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Condition Cards */}
        <div className="relative group">
          <div
            ref={conditionsScrollRef}
            className="flex items-stretch gap-3.5 sm:gap-4.5 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-1 -mx-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CONDITIONS.map((cond) => (
              <Link
                key={cond.id}
                href={cond.link}
                className="shrink-0 w-[160px] sm:w-[185px] md:w-[200px] aspect-[183/258] relative rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 snap-start group/card cursor-pointer border border-stone-200/70 bg-white"
              >
                <Image
                  src={cond.image}
                  alt={cond.name}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 185px, 200px"
                  className="object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                />

                {/* Overlay Title for newly added real photos */}
                {cond.hasOverlayTitle && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/90 via-white/50 to-transparent pointer-events-none" />
                    <div className="absolute top-3.5 left-4 z-10 pointer-events-none">
                      <span className="text-[16px] sm:text-[18px] font-black text-[#0f2d5e] tracking-tight leading-tight block">
                        {cond.name}
                      </span>
                    </div>
                  </>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
