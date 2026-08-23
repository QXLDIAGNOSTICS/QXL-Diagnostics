"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Phone, ArrowRight, HeartHandshake } from "lucide-react";

import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";
import RakshaHeroSection from "@/components/rakshaBandhan/RakshaHeroSection";
import RakshaPosterCarousel from "@/components/rakshaBandhan/RakshaPosterCarousel";
import RakshaOfferCard from "@/components/rakshaBandhan/RakshaOfferCard";
import SiblingPackagesSection from "@/components/rakshaBandhan/SiblingPackagesSection";
import GiftHealthStepsSection from "@/components/rakshaBandhan/GiftHealthStepsSection";
import WhyQxlSection from "@/components/rakshaBandhan/WhyQxlSection";
import TestCategoriesSection from "@/components/rakshaBandhan/TestCategoriesSection";
import EmotionalBanner from "@/components/rakshaBandhan/EmotionalBanner";
import HowItWorksSection from "@/components/rakshaBandhan/HowItWorksSection";
import RakshaFaqAccordion from "@/components/rakshaBandhan/RakshaFaqAccordion";
import BookingModal from "@/components/rakshaBandhan/BookingModal";
import StickyMobileCta from "@/components/rakshaBandhan/StickyMobileCta";
import RakshaFooterSection from "@/components/rakshaBandhan/RakshaFooterSection";

export default function RakshaBandhanClientPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("Raksha Bandhan Health Checkup (₹800)");

  const handleOpenBooking = (pkgTitle?: string) => {
    if (pkgTitle) {
      setSelectedPackage(`${pkgTitle} (₹800)`);
    } else {
      setSelectedPackage("Raksha Bandhan Health Checkup (₹800)");
    }
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Top Campaign Bar */}
      <div className="bg-gradient-to-r from-[#0A5DAA] via-[#084B8A] to-[#00A8A8] text-white py-2 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px] uppercase">
              SPECIAL OFFER
            </span>
            <span className="truncate">
              Raksha Bandhan Preventive Health Checkup @ ₹800 (80 Health Parameters) • Free Home Sample Collection across Bengaluru
            </span>
          </div>

          <a
            href={`tel:${RAKSHA_CAMPAIGN_CONFIG.contactPhoneE164}`}
            className="hidden md:flex items-center gap-1.5 font-bold hover:underline shrink-0 bg-white/10 px-3 py-1 rounded-full text-cyan-50"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{RAKSHA_CAMPAIGN_CONFIG.contactPhoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Main Header / Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A5DAA] to-[#00A8A8] flex items-center justify-center text-white font-black text-xl shadow-md">
              Q
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                QXL DIAGNOSTICS
              </div>
              <div className="text-[10px] font-bold text-[#00A8A8] uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>NABL Accredited Lab ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber})</span>
              </div>
            </div>
          </Link>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${RAKSHA_CAMPAIGN_CONFIG.contactPhoneE164}`}
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#0A5DAA] px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#00A8A8]" />
              <span>{RAKSHA_CAMPAIGN_CONFIG.contactPhoneDisplay}</span>
            </a>

            <button
              onClick={() => handleOpenBooking()}
              className="py-2.5 px-5 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] hover:from-[#084b8a] hover:to-[#008f8f] text-white text-xs font-extrabold rounded-xl shadow-md uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Page Sections */}
      <main>
        <RakshaHeroSection onOpenBooking={handleOpenBooking} />
        <RakshaPosterCarousel onOpenBooking={handleOpenBooking} />
        <RakshaOfferCard onOpenBooking={handleOpenBooking} />
        <SiblingPackagesSection onOpenBooking={handleOpenBooking} />
        <GiftHealthStepsSection onOpenBooking={() => handleOpenBooking()} />
        <WhyQxlSection />
        <TestCategoriesSection onOpenBooking={handleOpenBooking} />
        <EmotionalBanner onOpenBooking={() => handleOpenBooking()} />
        <HowItWorksSection />
        
        {/* Final Conversion Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#F5F9FC] relative text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#00A8A8] text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>GIFT HEALTH THIS FESTIVE SEASON</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Celebrate Your Bond. Take Care of Your Health.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
              Book your Raksha Bandhan Health Check with QXL Diagnostics today. Fast, reliable diagnostic testing across Bengaluru.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto py-4 px-8 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all text-base uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>BOOK YOUR HEALTH CHECK</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={`tel:${RAKSHA_CAMPAIGN_CONFIG.contactPhoneE164}`}
                className="w-full sm:w-auto py-4 px-8 bg-white border-2 border-slate-200 hover:border-[#0A5DAA] text-slate-800 hover:text-[#0A5DAA] font-bold rounded-2xl shadow-sm transition-all text-base uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-[#00A8A8]" />
                <span>CALL QXL DIAGNOSTICS</span>
              </a>
            </div>
          </div>
        </section>

        <RakshaFaqAccordion />
      </main>

      <RakshaFooterSection />

      {/* Sticky Mobile CTA */}
      <StickyMobileCta onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackageDefault={selectedPackage}
      />

    </div>
  );
}
