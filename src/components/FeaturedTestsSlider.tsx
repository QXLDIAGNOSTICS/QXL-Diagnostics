"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FileText, Dna, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function FeaturedTestsSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // 4 Carousel Slides matching user screenshots
  const slides = [
    // Slide 1: Most Booked Health Checkup Packages
    {
      id: "slide-1",
      type: "packages",
      title: "Full Body Checkup Packages",
      subtitle: "Comprehensive screening packages reviewed by expert senior consultant doctors.",
      items: [
        {
          name: "Full Body Checkup - Complete",
          badge: "Checkup",
          oldPrice: "₹5,243",
          price: "₹1,599",
          discount: "70% Off",
          params: "92 parameters",
          tat: "Reports within 12 hours",
          slug: "full-body-checkup-complete",
        },
        {
          name: "Ultra Full Body Checkup - Master",
          badge: "Checkup",
          oldPrice: "₹18,588",
          price: "₹4,999",
          discount: "73% Off",
          params: "117 parameters",
          tat: "Reports within 12 hours",
          slug: "ultra-full-body-checkup",
        },
      ],
    },

    // Slide 2: Most Booked Routine Diagnostic Tests in Bangalore
    {
      id: "slide-2",
      type: "tests",
      title: "Most Booked Tests in Bangalore",
      subtitle: "Fast, accurate NABL Accredited pathology and blood tests with same-day reports.",
      items: [
        {
          name: "Glycosylated Haemoglobin (HbA1c)",
          badge: "Test",
          oldPrice: "₹618",
          price: "₹490",
          discount: "21% Off",
          params: "1 test",
          tat: "Reports within 6 hours",
          slug: "hba1c-test",
        },
        {
          name: "Thyroid Function Test (TFT)",
          badge: "Test",
          oldPrice: "₹589",
          price: "₹500",
          discount: "15% Off",
          params: "3 tests",
          tat: "Reports within 6 hours",
          slug: "thyroid-function-test",
        },
        {
          name: "Vitamin B12 & Vitamin D Combo",
          badge: "Test",
          oldPrice: "₹1,800",
          price: "₹800",
          discount: "55% Off",
          params: "2 tests",
          tat: "Reports within 12 hours",
          slug: "vitamin-b12-vitamin-d",
        },
      ],
    },

    // Slide 3: Special Organ Screening Banner (Thyroid Focus)
    {
      id: "slide-3",
      type: "banner-thyroid",
      title: "Get your thyroid levels tested",
      subtitle: "Keep your thyroid and overall health in check with regular monitoring by consultant pathologists.",
      testCard: {
        name: "Thyroid Function Test (TFT)",
        badge: "Test",
        oldPrice: "₹589",
        price: "₹500",
        discount: "15% Off",
        params: "3 tests included",
        tat: "Reports within 6 hours",
        slug: "thyroid-function-test",
      },
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
      trustedCount: "100,000+ patients in Bengaluru",
    },

    // Slide 4: Clinic & Healthcare Partner Banner
    {
      id: "slide-4",
      type: "banner-clinic",
      title: "Own a clinic or diagnostic centre?",
      subtitle: "Unlock full diagnostic capabilities today. Partner with Bengaluru's NABL Accredited Super Speciality Lab.",
      trustedCount: "Trusted by 500+ doctors & healthcare facilities",
      cta: "Partner With Us",
      ctaLink: "/partner-with-us",
      image: "/images/dr_shantakumar_new.jpg",
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[activeSlide];

  return (
    <section className="py-12 bg-white border-t border-slate-200 text-left">
      <div className="max-w-[1260px] mx-auto px-4 w-full">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-2xs mb-2">
              FEATURED DIAGNOSTICS &amp; PACKAGES
            </span>
            <h2 className="text-[#0f2d5e] text-2xl sm:text-3xl font-black tracking-tight">
              {current.title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1 max-w-2xl">
              {current.subtitle}
            </p>
          </div>

          {/* Navigation Controls (Left / Right Arrow Buttons & Slide Counter) */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {activeSlide + 1} / {slides.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#D69A18] shadow-2xs flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#D69A18] shadow-2xs flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content Renderers */}
        <div className="relative min-h-[360px] flex items-center justify-center">

          {/* ── Slide Type 1 & 2: Grid / Swipe Carousel of Test / Checkup Cards ── */}
          {(current.type === "packages" || current.type === "tests") && current.items && (
            <div className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 w-full pb-3 scrollbar-none">
              {current.items.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[85%] sm:w-[320px] md:w-full shrink-0 snap-center bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-all group text-left"
                >
                  {/* Card Header — Compact 115px height for clean card alignment */}
                  <div className="bg-gradient-to-r from-[#0f2d5e] via-[#16386b] to-[#1d4ed8] p-3.5 sm:p-4 text-white relative min-h-[115px] flex flex-col justify-between">
                    <span 
                      className="absolute top-3.5 right-3.5 bg-[#D69A18] !text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs"
                      style={{ color: '#ffffff' }}
                    >
                      {item.badge}
                    </span>
                    <h3 
                      className="font-extrabold text-sm sm:text-[15px] !text-white leading-tight truncate my-1 pr-16"
                      style={{ color: '#ffffff' }}
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-auto shrink-0">
                      <span className="text-[11px] text-blue-200/80 line-through font-semibold">
                        {item.oldPrice}
                      </span>
                      <span 
                        className="text-xl sm:text-2xl font-black !text-white"
                        style={{ color: '#ffffff' }}
                      >
                        {item.price}
                      </span>
                      <span className="bg-amber-400 text-slate-950 text-[9.5px] font-black px-2 py-0.5 rounded-md uppercase ml-auto">
                        {item.discount}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-4">
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 font-bold border-b border-slate-100 pb-3 sm:pb-4">
                      <div className="flex items-center gap-2">
                        <Dna className="w-4 h-4 text-[#D69A18] shrink-0" />
                        <span className="text-[11px] leading-tight font-extrabold text-[#0f2d5e]">{item.params} included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-[11px] leading-tight text-slate-600">{item.tat}</span>
                      </div>
                    </div>

                    {/* Action Buttons matching screenshot */}
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <Link
                        href={`/book?package=${encodeURIComponent(item.name)}`}
                        className="w-full text-center border-2 border-[#0f2d5e] text-[#0f2d5e] hover:bg-[#0f2d5e]/5 font-black py-2.5 px-3 rounded-2xl text-xs transition-colors block"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/book?package=${encodeURIComponent(item.name)}`}
                        className="w-full text-center bg-[#D69A18] hover:bg-[#C58B12] text-white font-black py-2.5 px-3 rounded-2xl text-xs shadow-xs hover:shadow-md transition-all uppercase tracking-wider block"
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Slide Type 3: Organ Screening Highlight (Thyroid) ── */}
          {current.type === "banner-thyroid" && current.testCard && (
            <div className="w-full bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-xs">
              {/* Left Test Card */}
              <div className="w-full lg:w-1/3 bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200">
                <div className="bg-gradient-to-r from-[#0f2d5e] via-[#1b3a6b] to-[#1e40af] p-5 text-white relative">
                  <span className="absolute top-4 right-4 bg-[#D69A18] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {current.testCard.badge}
                  </span>
                  <h3 
                    className="font-extrabold text-lg !text-white text-white mb-2 pr-12"
                    style={{ color: '#ffffff' }}
                  >
                    {current.testCard.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-300 line-through">{current.testCard.oldPrice}</span>
                    <span className="text-2xl font-black text-white">{current.testCard.price}</span>
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md ml-auto">
                      {current.testCard.discount}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#D69A18]" />
                      <span>{current.testCard.tat}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Dna className="w-4 h-4 text-[#D69A18]" />
                      <span>{current.testCard.params}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link href={`/book?package=${encodeURIComponent(current.testCard.name)}`} className="text-center border-2 border-[#0f2d5e] text-[#0f2d5e] font-black py-2 rounded-xl text-xs">
                      View Details
                    </Link>
                    <Link href={`/book?package=${encodeURIComponent(current.testCard.name)}`} className="text-center bg-[#D69A18] text-white font-black py-2 rounded-xl text-xs uppercase tracking-wider shadow-xs">
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Banner Content */}
              <div className="flex-1 space-y-4 text-left">
                <span className="inline-flex items-center gap-1.5 bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10.5px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D69A18]" />
                  NABL ACCREDITED PATHOLOGY
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-[#0f2d5e] leading-tight">
                  {current.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-xl leading-relaxed">
                  {current.subtitle}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 font-black">
                    🏆
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#0f2d5e]">Trusted Diagnostic Leader</p>
                    <p className="text-xs font-semibold text-slate-500">{current.trustedCount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Slide Type 4: Own a Clinic / Partner Banner ── */}
          {current.type === "banner-clinic" && (
            <div className="w-full rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-r from-[#0f2d5e] via-[#16386b] to-[#1d4ed8] !text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
              <div className="space-y-4 flex-1 text-left">
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10.5px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                  DOCTOR &amp; CLINIC B2B PARTNERSHIP
                </span>
                <h3 className="text-3xl sm:text-4xl font-black !text-white leading-tight" style={{ color: '#ffffff' }}>
                  {current.title}
                </h3>
                <p className="!text-slate-100 text-sm sm:text-base font-medium max-w-xl leading-relaxed" style={{ color: '#f1f5f9' }}>
                  {current.subtitle}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={current.ctaLink || "/partner-with-us"}
                    className="bg-[#D69A18] hover:bg-[#C58B12] text-white font-black px-7 py-3 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                  >
                    {current.cta || "Partner With Us"} &rarr;
                  </Link>
                  <a
                    href="tel:+919964639639"
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-full text-xs uppercase tracking-wider border border-white/20 transition-all"
                  >
                    Call Partner Desk
                  </a>
                </div>
              </div>

              {/* Right Accent Image */}
              <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-amber-400/40 shadow-xl shrink-0 bg-slate-800">
                <Image
                  src={current.image || "/images/dr_shantakumar_new.jpg"}
                  alt="Doctor Partnership"
                  width={220}
                  height={220}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeSlide ? "w-8 bg-[#D69A18]" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
