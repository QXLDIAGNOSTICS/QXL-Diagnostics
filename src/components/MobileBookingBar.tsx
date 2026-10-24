"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

interface MobileBookingBarProps {
  price: number;
  originalPrice?: number;
  title?: string;
  onBook?: () => void;
  bookHref?: string;
  whatsappMessage?: string;
  isProcedural?: boolean;
}

export default function MobileBookingBar({
  price,
  originalPrice,
  title,
  onBook,
  bookHref = "/book",
  whatsappMessage,
  isProcedural = false
}: MobileBookingBarProps) {
  const waUrl = whatsappMessage
    ? `https://wa.me/919964639639?text=${encodeURIComponent(whatsappMessage)}`
    : "https://wa.me/919964639639";

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-4 py-2.5 flex items-center justify-between gap-3 min-h-[64px]"
      role="region"
      aria-label="Mobile booking action bar"
    >
      <div className="flex-1 min-w-0 pr-1">
        {title && (
          <p className="text-[11px] font-semibold text-slate-500 truncate mb-0.5">
            {title}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <strong className="text-xl font-black text-slate-900 tracking-tight">
            ₹{price.toLocaleString("en-IN")}
          </strong>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-slate-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp QXL Diagnostics"
          className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="ml-1.5 hidden sm:inline">WhatsApp</span>
        </a>

        {onBook ? (
          <button
            type="button"
            onClick={onBook}
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-5 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-400"
          >
            {isProcedural ? "Enquire" : "Book Now"}
          </button>
        ) : (
          <a
            href={bookHref}
            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-5 bg-[#2563eb] hover:bg-[#1d4ed8] active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-400"
          >
            {isProcedural ? "Enquire" : "Book Now"}
          </a>
        )}
      </div>
    </aside>
  );
}

export { MobileBookingBar };
