"use client";

import React from "react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface StickyMobileCtaProps {
  onOpenBooking: () => void;
}

export default function StickyMobileCta({ onOpenBooking }: StickyMobileCtaProps) {
  const whatsappUrl = `https://wa.me/${RAKSHA_CAMPAIGN_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hi QXL Diagnostics, I would like to book the Raksha Bandhan Health Checkup offer (₹800)."
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0 shadow-md"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Call Button */}
        <a
          href={`tel:${RAKSHA_CAMPAIGN_CONFIG.contactPhoneE164}`}
          className="p-3 bg-blue-50 text-[#0A5DAA] border border-blue-200 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs"
          aria-label="Call QXL Diagnostics"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Primary Book Now CTA */}
        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>BOOK NOW • ₹800</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
