"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Phone, ArrowRight, Clock, Maximize2, X, CheckCircle2, ShieldCheck } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface RakshaPosterCarouselProps {
  onOpenBooking: (packageTitle?: string) => void;
}

export default function RakshaPosterCarousel({ onOpenBooking }: RakshaPosterCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  const posterSlides = [
    {
      id: "poster-1",
      title: "Gift of Protection Health Check (8 Organ Systems)",
      subtitle: "Diabetes, Blood/Anaemia, Heart, Thyroid, Liver, Kidneys, Bone/Mineral, Bladder",
      price: "₹800 SPECIAL",
      imageSrc: "/images/posters/92e65b9b-f53b-497e-8ec7-334f4ea012fa.jpeg",
      altText: "QXL Diagnostics Gift of Protection Health Check Poster for Raksha Bandhan",
    },
    {
      id: "poster-2",
      title: "Special Raksha Bandhan: Gift the Bond of Health Check-up",
      subtitle: "80 Health Parameters • 8 Major Health Areas • Only ₹800 (Worth ₹5,800)",
      price: "₹800 (WORTH ₹5,800)",
      imageSrc: "/images/posters/165a1294-8527-4943-ba13-ac45a6139251.jpeg",
      altText: "Special Raksha Bandhan Gift the Bond of Health Check-up Poster ₹800 Only",
    },
    {
      id: "poster-3",
      title: "Give the Gift of Health to Your Cherished Sibling",
      subtitle: "Special Home Collection for the Festival • Book Your Rakhi Health Check Special",
      price: "7-DAY FESTIVE OFFER",
      imageSrc: "/images/posters/8a688ccd-573a-4ff7-b6dc-512d8174a0df.jpeg",
      altText: "Give the Gift of Health to Your Cherished Sibling Poster",
    },
    {
      id: "poster-4",
      title: "Raksha Bandhan Festive Offer — Upto 50% Off",
      subtitle: "Exclusive Festive Health Packages • Free Home Collection across Bengaluru",
      price: "UPTO 50% OFF",
      imageSrc: "/images/posters/03960ebd-40e9-4efb-9b7e-38577ef50d5f.jpeg",
      altText: "Raksha Bandhan Offer Upto 50 Percent Off Poster",
    },
    {
      id: "poster-5",
      title: "Happy Raksha Bandhan — Full Body Health Check-up",
      subtitle: "80 Health Parameters Starts @ ₹800 Only (Worth ₹5,800)",
      price: "STARTS @ ₹800 ONLY",
      imageSrc: "/images/posters/85abf12b-7faf-40ad-a033-b637ca7f8c2c.jpeg",
      altText: "Happy Raksha Bandhan Full Body Health Checkup Poster 80 Parameters",
    },
    {
      id: "poster-6",
      title: "A Rakhi Promise That Goes Beyond Words",
      subtitle: "Promise to take care of each other's health, today and every day.",
      price: "SIBLING CHECKUP",
      imageSrc: "/images/posters/b2daa5d0-9f39-4111-91fd-e6cb54ef816f.jpeg",
      altText: "A Rakhi Promise That Goes Beyond Words Poster",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posterSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, posterSlides.length]);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? posterSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % posterSlides.length);
  };

  const slide = posterSlides[currentSlide];

  return (
    <section className="py-12 md:py-16 bg-[#F5F9FC] border-y border-slate-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Header & 7-Day Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>7-DAY EXCLUSIVE OFFER • ₹800 ONLY (WORTH ₹5,800)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Official Campaign Offer Posters ({currentSlide + 1} / {posterSlides.length})
            </h2>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 mr-2">
              {posterSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentSlide(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === idx ? "w-8 bg-[#0A5DAA]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to poster slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-md transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Poster Carousel Frame */}
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            
            {/* Left Image View Column */}
            <div className="lg:col-span-8 relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[16/9] bg-slate-900 group overflow-hidden">
              <Image
                src={slide.imageSrc}
                alt={slide.altText}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Lightbox Trigger */}
              <button
                onClick={() => setActiveLightboxImage(slide.imageSrc)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 transition-colors shadow-lg"
                title="Expand poster image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Price Tag Overlay */}
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase shadow-lg border border-white/20">
                {slide.price}
              </div>
            </div>

            {/* Right Information & CTA Column */}
            <div className="lg:col-span-4 p-6 sm:p-8 text-left space-y-5 bg-gradient-to-b from-white to-[#F5F9FC]">
              
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-md bg-cyan-50 border border-cyan-200 text-[#0A5DAA] text-[11px] font-extrabold uppercase tracking-wider">
                  POSTER {currentSlide + 1} OF {posterSlides.length}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {slide.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {slide.subtitle}
                </p>
              </div>

              {/* Highlight Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2 text-xs">
                <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>7-Day Festive Highlights</span>
                </div>
                <div className="space-y-1 text-amber-800 font-medium text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>80 Health Parameters Covered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Free Home Collection across Bengaluru</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>NABL Certified Lab (MC-10025)</span>
                  </div>
                </div>
              </div>

              {/* Primary Booking Button */}
              <button
                onClick={() => onOpenBooking(slide.title)}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] hover:from-[#084b8a] hover:to-[#008f8f] text-white font-extrabold rounded-xl shadow-lg hover:scale-[1.01] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 group"
              >
                <span>BOOK @ ₹800 NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A8A8]" />
                <span>Call / WhatsApp: {RAKSHA_CAMPAIGN_CONFIG.contactPhoneDisplay}</span>
              </div>

            </div>

          </div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activeLightboxImage && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-5xl h-[85vh]">
              <Image
                src={activeLightboxImage}
                alt="Full size Raksha Bandhan campaign poster"
                fill
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
