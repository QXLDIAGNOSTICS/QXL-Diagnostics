"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin, Search, CheckCircle2, Clock, MessageCircle, ArrowRight, Sparkles, Building2, ChevronRight, X } from "lucide-react";
import { homeCollectionAreas, HomeCollectionArea } from "@/lib/locationsData";
import { WHATSAPP_LINK } from "@/lib/businessInfo";

const POPULAR_LOCALITIES = [
  { name: "JP Nagar", pincode: "560078", slug: "jp-nagar" },
  { name: "Kengeri", pincode: "560060", slug: "kengeri" },
  { name: "Yelahanka", pincode: "560064", slug: "yelahanka" },
  { name: "HSR Layout", pincode: "560102", slug: "hsr-layout" },
  { name: "Indiranagar", pincode: "560038", slug: "indiranagar" },
  { name: "Whitefield", pincode: "560066", slug: "whitefield" },
  { name: "RR Nagar", pincode: "560098", slug: "rajarajeshwari-nagar" },
  { name: "Koramangala", pincode: "560034", slug: "koramangala" },
];

interface LocalityCheckWidgetProps {
  variant?: "hero" | "compact" | "standalone";
  className?: string;
  onSelectArea?: (area: HomeCollectionArea) => void;
}

export default function LocalityCheckWidget({
  variant = "hero",
  className = "",
  onSelectArea,
}: LocalityCheckWidgetProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<HomeCollectionArea | null>(null);
  const [matchedPincode, setMatchedPincode] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("qxl_location");
      if (saved) {
        const found = homeCollectionAreas.find(
          (a) => a.name.toLowerCase() === saved.toLowerCase() || a.slug === saved
        );
        if (found) {
          setSelectedArea(found);
          setMatchedPincode(found.pincodes[0] || "560001");
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Filter matching areas
  const filteredAreas = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return homeCollectionAreas.filter(
      (area) =>
        area.name.toLowerCase().includes(q) ||
        area.slug.toLowerCase().includes(q) ||
        area.pincodes.some((pin) => pin.includes(q))
    ).slice(0, 8);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectArea = (area: HomeCollectionArea, pin?: string) => {
    const activePin = pin || area.pincodes[0] || "";
    setSelectedArea(area);
    setMatchedPincode(activePin);
    setQuery("");
    setIsOpen(false);

    try {
      localStorage.setItem("qxl_location", area.name);
      window.dispatchEvent(new CustomEvent("locationChange", { detail: area.name }));
    } catch {
      // Ignore storage errors
    }

    if (onSelectArea) {
      onSelectArea(area);
    }
  };

  const getWhatsAppBookingLink = (areaName: string, pin: string) => {
    const msg = `Hi QXL Diagnostics! I want to check slot & book home blood sample collection in ${areaName}${pin ? ` (Pin: ${pin})` : ""}. Please send available morning slots.`;
    return `https://api.whatsapp.com/send?phone=919964639639&text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full bg-white rounded-3xl border border-amber-200/90 shadow-[0_8px_30px_rgba(214,154,24,0.12)] p-3.5 sm:p-5 relative transition-all ${className}`}
    >
      {/* Header Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-[#D69A18]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#0B2545] tracking-tight leading-tight">
              Check Doorstep Collection in Your Area
            </h3>
            <p className="text-[10.5px] text-slate-500 font-semibold">
              Free home collection across all 60+ Bengaluru localities
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Instant Slot Confirmation
        </span>
      </div>

      {/* Input Search Box */}
      <div className="relative mb-3">
        <div className="relative flex items-center bg-[#FDFBF7] border border-[#F3DBA7] focus-within:border-[#D69A18] focus-within:ring-2 focus-within:ring-[#D69A18]/20 rounded-2xl px-3.5 py-2.5 transition-all shadow-2xs">
          <Search className="w-4 h-4 text-[#D69A18] mr-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Enter Pincode (e.g. 560078) or Area (e.g. JP Nagar)..."
            className="w-full bg-transparent text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="p-1 hover:bg-amber-100/60 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && filteredAreas.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#F3DBA7] rounded-2xl shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
            {filteredAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => handleSelectArea(area, area.pincodes[0])}
                className="w-full px-4 py-2.5 text-left hover:bg-[#FFF8EB] flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
              >
                <div>
                  <span className="text-xs font-black text-[#0B2545] block">
                    {area.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Lab: {area.nearestLab}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold bg-amber-50 text-[#D69A18] border border-[#F3DBA7] px-2 py-0.5 rounded-md">
                    Pin: {area.pincodes.join(", ")}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Select Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none mb-3">
        <span className="text-[10px] font-extrabold text-slate-400 shrink-0 uppercase tracking-wider">
          Quick Select:
        </span>
        {POPULAR_LOCALITIES.map((loc) => {
          const isSelected = selectedArea?.slug === loc.slug;
          return (
            <button
              key={loc.slug}
              type="button"
              onClick={() => {
                const found = homeCollectionAreas.find((a) => a.slug === loc.slug);
                if (found) handleSelectArea(found, loc.pincode);
              }}
              className={`text-[10.5px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#D69A18] text-white shadow-xs"
                  : "bg-[#FFF8EB] border border-[#F3DBA7] text-[#0B2545] hover:bg-[#FDE6C2]"
              }`}
            >
              {loc.name}
            </button>
          );
        })}
      </div>

      {/* Result Card: Instant Confirmation Banner */}
      {selectedArea ? (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300/80 rounded-2xl p-3.5 shadow-2xs">
          <div className="flex items-start gap-2.5 mb-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <h4 className="text-xs sm:text-sm font-black text-emerald-950 truncate">
                  Free Doorstep Collection Available in {selectedArea.name}
                </h4>
                <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                  Pin {matchedPincode || selectedArea.pincodes[0]}
                </span>
              </div>
              <p className="text-[11px] text-emerald-900 font-bold flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Next slot open: <strong className="text-emerald-950 font-black">Tomorrow 7:00 AM</strong></span>
              </p>
              <p className="text-[10px] text-emerald-800/90 font-semibold flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3 text-emerald-700" />
                <span>Nearest Lab: {selectedArea.nearestLab}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons: 1-Click WhatsApp & Express Checkout */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={getWhatsAppBookingLink(selectedArea.name, matchedPincode)}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3 py-2 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-center"
              style={{ color: '#ffffff' }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>1-Click WhatsApp</span>
            </a>

            <Link
              href={`/book?area=${encodeURIComponent(selectedArea.slug)}&pincode=${encodeURIComponent(matchedPincode || selectedArea.pincodes[0])}`}
              className="bg-[#D69A18] hover:bg-[#b88313] text-white font-extrabold px-3 py-2 rounded-xl text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all text-center"
              style={{ color: '#ffffff' }}
            >
              <span>Express Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFF8EB] border border-[#F3DBA7] rounded-2xl p-3 text-center">
          <p className="text-[11px] font-bold text-[#0B2545]">
            💡 Select your area above to confirm instant morning slots &amp; 1-click booking.
          </p>
        </div>
      )}
    </div>
  );
}
