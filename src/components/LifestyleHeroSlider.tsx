"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

interface HeroCard {
  id: string;
  image: string;
  headline: string;
  badgeTitle: string;
  priceText: string;
  link: string;
  pkgName?: string;
  pkgPrice?: number;
}

const HERO_CARDS: HeroCard[] = [
  {
    id: "lifestyle",
    image: "/images/home_sections/hero_lifestyle.jpg",
    headline: "Your lifestyle impacts your health.",
    badgeTitle: "Track it with Quick Fit (80 Params)",
    priceText: "Starts at ₹1,770",
    link: "/book?package=q-quick-fit",
    pkgName: "Quick Fit Package",
    pkgPrice: 1770,
  },
  {
    id: "hairfall",
    image: "/images/home_sections/hero_hairfall.jpg",
    headline: "Stop treating the hair. Find the trigger.",
    badgeTitle: "Hair Fall & Metabolic Checkups",
    priceText: "Starts at ₹2,499",
    link: "/conditions/hair-fall",
    pkgName: "Hair Fall Comprehensive Screen",
    pkgPrice: 2499,
  },
  {
    id: "vitamin",
    image: "/images/home_sections/vitamin_photo_hd.png",
    headline: "Your vitamin levels directly affect energy & focus.",
    badgeTitle: "Get a Vitamin D & B12 Checkup",
    priceText: "Starts at ₹410",
    link: "/vitamin-d-test",
    pkgName: "Vitamin D (25-OH Total)",
    pkgPrice: 410,
  },
  {
    id: "cardiac",
    image: "/images/home_sections/card_heart_hero.jpg",
    headline: "Silent cardiac risks shouldn't wait for symptoms.",
    badgeTitle: "Heart Risk & Lipid Checkup",
    priceText: "Starts at ₹799",
    link: "/conditions/heart-health",
    pkgName: "Lipid Profile & hs-CRP Cardiac Screen",
    pkgPrice: 799,
  },
  {
    id: "diabetes",
    image: "/images/home_sections/card_diabetes_hero.jpg",
    headline: "Track your 3-month sugar with clinical precision.",
    badgeTitle: "Diabetes Care & HbA1c Panel",
    priceText: "Starts at ₹380",
    link: "/hba1c-test",
    pkgName: "Haemoglobin A1c (HbA1c)",
    pkgPrice: 380,
  },
  {
    id: "fever",
    image: "/images/home_sections/fever_season_hero.jpg",
    headline: "High fever, chills or fatigue? Don't wait.",
    badgeTitle: "Dengue & Viral Fever Surveillance",
    priceText: "Starts at ₹250 (6-Hr Reports)",
    link: "#fever-season",
    pkgName: "CBC with Platelet Count",
    pkgPrice: 250,
  },
  {
    id: "senior",
    image: "/images/home_sections/card_senior_hero.jpg",
    headline: "Complete full-body peace of mind for 30+.",
    badgeTitle: "Q-Master Health Pro (92 Params)",
    priceText: "Starts at ₹4,600",
    link: "/book?package=q-master-pro",
    pkgName: "Q-Master Health Pro Package",
    pkgPrice: 4600,
  },
];

export default function LifestyleHeroSlider({
  onSelectPackage,
}: {
  onSelectPackage?: (pkg: { name: string; price: number; includes: string } | string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -330 : 330;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF7F2] py-4 sm:py-6 overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4 relative">
        {/* Horizontal Scrollable Carousel Container */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex items-center gap-3.5 sm:gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-2 pt-1 px-1 -mx-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {HERO_CARDS.map((card) => (
              <div
                key={card.id}
                className="shrink-0 w-[270px] sm:w-[310px] md:w-[350px] aspect-[294/372] relative rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 snap-center group/card cursor-pointer border border-stone-200/70 bg-slate-900"
                onClick={() => {
                  if (onSelectPackage && card.pkgName && card.pkgPrice) {
                    onSelectPackage({
                      name: card.pkgName,
                      price: card.pkgPrice,
                      includes: card.badgeTitle,
                    });
                  }
                }}
              >
                <Link href={card.link} className="block w-full h-full relative">
                  {/* Photo Background */}
                  <Image
                    src={card.image}
                    alt={card.headline}
                    fill
                    sizes="(max-width: 640px) 270px, (max-width: 768px) 310px, 350px"
                    className="object-cover object-center group-hover/card:scale-[1.03] transition-transform duration-500"
                    priority={card.id === "lifestyle"}
                  />

                  {/* Top Vignette for Typography Readability */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/95 via-white/60 to-transparent pointer-events-none" />

                  {/* Top Headline Typography */}
                  <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 z-10 pointer-events-none">
                    <h3 className="text-[17px] sm:text-[19px] md:text-[21px] font-black text-[#0f2d5e] leading-snug tracking-tight drop-shadow-2xs max-w-[90%]">
                      {card.headline}
                    </h3>
                  </div>

                  {/* Bottom Dark Capsule with Package Details & Real Price */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10">
                    <div className="bg-[#2a241f]/90 hover:bg-[#1a1613] backdrop-blur-md text-white rounded-2xl p-3 sm:p-3.5 flex items-center justify-between transition-all duration-200 shadow-lg border border-white/10 group-hover/card:border-amber-400/40">
                      <div className="pr-2">
                        <p className="text-[11.5px] sm:text-[12.5px] font-extrabold text-white/95 leading-tight truncate">
                          {card.badgeTitle}
                        </p>
                        <p className="text-[12px] sm:text-[13px] font-black text-amber-300 mt-0.5 tracking-wide">
                          {card.priceText}
                        </p>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover/card:bg-amber-400 group-hover/card:text-slate-900 transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-white group-hover/card:text-slate-900 transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next slide"
            className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#38322e]/85 hover:bg-black text-white items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous slide"
            className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#38322e]/85 hover:bg-black text-white items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
