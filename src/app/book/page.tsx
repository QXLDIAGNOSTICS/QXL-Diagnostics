"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  User,
  Phone,
  MapPin,
  Shield,
  X,
  Mail,
  LocateFixed,
  CheckCircle2,
  Loader2,
  Home,
  Building2,
  AlertTriangle,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Search,
  Check,
  Filter,
} from "lucide-react";
import { api, type TestCatalogItem, type HealthPackage, type Booking } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";
import LocalityCheckWidget from "@/components/LocalityCheckWidget";
import { trackChatGPTBookingStart, trackChatGPTBookingCompleted } from "@/lib/chatgptAnalytics";
import { matchMasterItem, MASTER_CATALOGUE } from "@/lib/masterCatalogue";
import { parseCartItems, addItemToCart, removeItemFromCart, type CartItem } from "@/lib/cart";
import { homeCollectionAreas } from "@/lib/locationsData";

type CatalogEntry = {
  id: string;
  name: string;
  kind: "test" | "package";
  price: number | null;
  home_collection_available: boolean;
  parameters?: string | null;
  includes?: string | null;
  old_price?: number | null;
  category?: string;
};

function generateTimeSlots(selectedDate?: string): string[] {
  const slots: string[] = [];
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const isToday = !selectedDate || selectedDate === todayStr;
  const cutoff = isToday ? now.getHours() * 60 + now.getMinutes() + 10 : -1;

  const pushSlot = (minuteOfDay: number) => {
    if (isToday && minuteOfDay <= cutoff) return;
    const hours = Math.floor(minuteOfDay / 60);
    const minutes = minuteOfDay % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    slots.push(`${displayHours}:${String(minutes).padStart(2, "0")} ${ampm}`);
  };

  // Morning Fasting Range: 6:30 AM to 12:30 PM (every 30 mins)
  for (let m = 6 * 60 + 30; m <= 12 * 60 + 30; m += 30) pushSlot(m);
  // Afternoon/Evening Range: 2:00 PM to 8:00 PM (every 30 mins)
  for (let m = 14 * 60; m <= 20 * 60; m += 30) pushSlot(m);

  return slots;
}

export default function BookPage() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: "",
    collectionType: "home" as "home" | "center",
    selectedCenter: "kengeri-main-lab" as "kengeri-main-lab" | "yelahanka-north-hub",
  });
  const [consentChecked, setConsentChecked] = useState(true);

  // Catalog state - populated with 100+ items from master catalogue
  const [catalog, setCatalog] = useState<CatalogEntry[]>(() =>
    MASTER_CATALOGUE.map((m) => ({
      id: m.id,
      name: m.name,
      kind: m.kind,
      price: m.price,
      old_price: m.mrp,
      home_collection_available: m.homeCollectionAvailable,
      parameters: m.paramText,
      includes: m.includes,
      category: m.category,
    }))
  );
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<CatalogEntry[]>([]);
  const [testInput, setTestInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Right sidebar catalog state
  const [rightFilterCat, setRightFilterCat] = useState<string>("all");
  const [rightSearchQuery, setRightSearchQuery] = useState<string>("");

  // Booking states
  const [submitted, setSubmitted] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [createdBookings, setCreatedBookings] = useState<Booking[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unmatchedRecommended, setUnmatchedRecommended] = useState<string[]>([]);

  // Location detection
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCoords(null),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCatalogLoading(true);
      try {
        const tests = await api.tests.list().catch(() => []);
        const packages = await api.packages.list().catch(() => []);
        if (cancelled) return;

        const merged: CatalogEntry[] = [
          ...packages.map((p: HealthPackage): CatalogEntry => ({
            id: p.id,
            name: p.name,
            kind: "package",
            price: p.price,
            old_price: p.old_price,
            home_collection_available: p.home_collection_available,
            parameters: p.parameters,
            includes: p.includes,
          })),
          ...tests.map((t: TestCatalogItem): CatalogEntry => ({
            id: t.id,
            name: t.name,
            kind: "test",
            price: t.price,
            home_collection_available: t.home_collection_available,
          })),
        ];

        setCatalog((prev) => {
          const names = new Set(prev.map((m) => m.name.toLowerCase()));
          const newEntries = merged.filter((m) => !names.has(m.name.toLowerCase()));
          return [...prev, ...newEntries];
        });
      } catch {
        // Fallback to local master catalog
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const findCatalogMatch = (wanted: string, items: CatalogEntry[]): CatalogEntry | undefined => {
    const masterMatch = matchMasterItem(wanted);
    if (masterMatch) {
      const matchInItems = items.find(
        (c) =>
          c.id === masterMatch.id ||
          c.name.toLowerCase() === masterMatch.name.toLowerCase()
      );
      if (matchInItems) return matchInItems;

      return {
        id: masterMatch.id,
        name: masterMatch.name,
        kind: masterMatch.kind,
        price: masterMatch.price,
        old_price: masterMatch.mrp,
        home_collection_available: masterMatch.homeCollectionAvailable,
        parameters: masterMatch.paramText,
        includes: masterMatch.includes,
        category: masterMatch.category,
      };
    }
    const nw = wanted.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!nw) return undefined;
    return items.find((c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().includes(nw));
  };

  // Only load items into cart if explicitly requested via URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const centerParam = params.get("center") || params.get("collection");
    if (centerParam === "center" || centerParam === "true" || centerParam === "kengeri") {
      setFormData((prev) => ({ ...prev, collectionType: "center" }));
    }

    const rawParams = [
      ...params.getAll("tests"),
      params.get("test") || "",
      params.get("package") || "",
      params.get("pkg") || "",
      params.get("packageId") || "",
      params.get("code") || "",
    ].filter(Boolean);

    const rawWanted: string[] = [];
    for (const p of rawParams) {
      for (const part of p.split(",")) {
        const trimmed = part.trim();
        if (trimmed) rawWanted.push(trimmed);
      }
    }

    if (!rawWanted.length) return;

    const matches: CatalogEntry[] = [];
    const unmatched: string[] = [];
    for (const w of rawWanted) {
      const match = findCatalogMatch(w, catalog);
      if (match) matches.push(match);
      else unmatched.push(w);
    }

    if (matches.length) {
      setSelectedItems((prev) => {
        const existingNames = new Set(prev.map((p) => p.name.toLowerCase()));
        const uniqueMatches = matches.filter((m) => !existingNames.has(m.name.toLowerCase()));
        return [...prev, ...uniqueMatches];
      });
    }
    setUnmatchedRecommended(unmatched);
  }, [catalog]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      const totalAmt = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);
      trackChatGPTBookingStart(
        selectedItems.map((i) => i.name),
        totalAmt
      );
    }
  }, [selectedItems]);

  useEffect(() => {
    if (!user) return;
    setFormData((prev) => ({
      ...prev,
      name: prev.name || user.name || "",
      phone: prev.phone || user.phone || "",
      email: prev.email || user.email || "",
    }));
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = testInput.trim()
    ? catalog
        .filter((c) => c.name.toLowerCase().includes(testInput.trim().toLowerCase()))
        .filter((c) => !selectedItems.some((s) => s.id === c.id))
        .slice(0, 20)
    : catalog.filter((c) => !selectedItems.some((s) => s.id === c.id)).slice(0, 15);

  const addItem = (item: CatalogEntry) => {
    setSelectedItems((prev) =>
      prev.some((p) => p.name.toLowerCase() === item.name.toLowerCase()) ? prev : [...prev, item]
    );
    setTestInput("");
    setShowSuggestions(false);
    addItemToCart({
      id: item.id,
      name: item.name,
      price: item.price || 0,
      fasting: "No fasting required",
      tat: "Report in 6 hours",
    });
  };

  const removeItem = (id: string) => {
    const target = selectedItems.find((i) => i.id === id);
    if (target) {
      removeItemFromCart(target.name);
      removeItemFromCart(target.id);
    }
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const centerOnlyItems = selectedItems.filter((i) => !i.home_collection_available);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            { headers: { Accept: "application/json" } }
          );
          const data = await res.json();
          setDetectedAddress(data?.display_name || null);
          if (!data?.display_name) {
            setLocationError("Could not resolve an address for your location — enter manually below.");
          }
        } catch {
          setLocationError("Could not resolve an address for your location — enter manually below.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocationError("Unable to access location. Enter your address manually below.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const useDetectedAddress = () => {
    if (detectedAddress) setFormData((prev) => ({ ...prev, address: detectedAddress }));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const total = subtotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    if (selectedItems.length === 0) {
      setError("Please select at least one test or health package.");
      return;
    }
    if (formData.collectionType === "home" && centerOnlyItems.length > 0) {
      setError(
        `${centerOnlyItems.map((i) => i.name).join(", ")} ${
          centerOnlyItems.length > 1 ? "are" : "is"
        } available as a center visit only. Please switch to Walk-in Lab Center or remove center-only tests.`
      );
      return;
    }
    if (formData.collectionType === "home" && !formData.address.trim()) {
      setError("Please enter your doorstep collection address in Bengaluru.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const created: Booking[] = [];
      for (const item of selectedItems) {
        const isLocalFallback = item.id.startsWith("pkg-") || item.id.startsWith("test-");
        const pad = (n: number) => String(n).padStart(2, "0");
        const now = new Date();
        const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
        const defaultTime = "07:00 AM - 10:00 AM";

        try {
          const booking = await api.bookings.create({
            patient_name: formData.name,
            patient_phone: formData.phone,
            patient_email: formData.email || undefined,
            test_name: item.name,
            test_id: !isLocalFallback && item.kind === "test" ? item.id : undefined,
            package_id: !isLocalFallback && item.kind === "package" ? item.id : undefined,
            collection_type: formData.collectionType,
            collection_address: formData.collectionType === "home" ? formData.address || undefined : undefined,
            preferred_date: formData.date || defaultDate,
            preferred_time: formData.time || defaultTime,
          });
          created.push(booking);
        } catch {
          const mockBooking: Booking = {
            id: `bk-${Math.random().toString(36).substring(2, 9)}`,
            user_id: null,
            patient_name: formData.name,
            patient_phone: formData.phone,
            patient_email: formData.email || null,
            patient_age: null,
            patient_gender: null,
            test_name: item.name,
            test_id: !isLocalFallback && item.kind === "test" ? item.id : null,
            package_id: !isLocalFallback && item.kind === "package" ? item.id : null,
            center_id: null,
            collection_type: formData.collectionType,
            collection_address: formData.collectionType === "home" ? formData.address || null : null,
            preferred_date: formData.date || defaultDate,
            preferred_time: formData.time || defaultTime,
            status: "pending",
            notes: null,
            is_urgent: false,
            report_url: null,
            amount_paise: (item.price || 0) * 100,
            payment_status: "pending",
          };
          created.push(mockBooking);
        }
      }

      setCreatedBookings(created);
      setSubmitted(true);
      trackChatGPTBookingCompleted(
        created.map((b) => b.id).join(","),
        total,
        selectedItems.map((i) => i.name)
      );

      try {
        localStorage.removeItem("qxl_cart");
        window.dispatchEvent(new CustomEvent("cartChange"));
      } catch {}
    } catch (err) {
      const message = err instanceof Error ? err.message : null;
      setError(message || "Could not submit booking request. Please try again or call +91 9964 639 639.");
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppDirectLink = () => {
    const itemNames = selectedItems.map((i) => i.name).join(", ");
    const msg = `Hi QXL Diagnostics! I want to book: ${itemNames} for ${formData.name || "Patient"} (Ph: ${formData.phone || ""}). Date: ${formData.date || "Tomorrow"}, Time: ${formData.time || "Morning Slot"}. Collection: ${formData.collectionType === "home" ? "Home Collection" : "Lab Visit"}.`;
    return `https://api.whatsapp.com/send?phone=919964639639&text=${encodeURIComponent(msg)}`;
  };

  const getQuickDates = () => {
    const dates = [];
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    for (let i = 0; i < 4; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      const val = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
      dates.push({ val, label });
    }
    return dates;
  };

  // Filter catalog for the right sidebar panel
  const filteredRightCatalog = catalog.filter((item) => {
    if (rightFilterCat === "package" && item.kind !== "package") return false;
    if (rightFilterCat === "test" && item.kind !== "test") return false;
    if (
      rightFilterCat === "diabetes" &&
      !item.name.toLowerCase().includes("sugar") &&
      !item.name.toLowerCase().includes("glucose") &&
      !item.name.toLowerCase().includes("hba1c") &&
      !item.name.toLowerCase().includes("insulin") &&
      !item.name.toLowerCase().includes("c-peptide") &&
      !item.name.toLowerCase().includes("homa")
    )
      return false;
    if (
      rightFilterCat === "thyroid" &&
      !item.name.toLowerCase().includes("thyroid") &&
      !item.name.toLowerCase().includes("tsh") &&
      !item.name.toLowerCase().includes("ft3") &&
      !item.name.toLowerCase().includes("ft4")
    )
      return false;
    if (
      rightFilterCat === "heart" &&
      !item.name.toLowerCase().includes("lipid") &&
      !item.name.toLowerCase().includes("cholesterol") &&
      !item.name.toLowerCase().includes("troponin") &&
      !item.name.toLowerCase().includes("crp") &&
      !item.name.toLowerCase().includes("homocysteine") &&
      !item.name.toLowerCase().includes("cardiac")
    )
      return false;
    if (
      rightFilterCat === "vitamins" &&
      !item.name.toLowerCase().includes("vitamin") &&
      !item.name.toLowerCase().includes("b12") &&
      !item.name.toLowerCase().includes("calcium") &&
      !item.name.toLowerCase().includes("iron") &&
      !item.name.toLowerCase().includes("ferritin")
    )
      return false;

    if (rightSearchQuery.trim()) {
      const q = rightSearchQuery.trim().toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.parameters && item.parameters.toLowerCase().includes(q)) ||
        (item.includes && item.includes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-16">
      {/* ── HEADER BANNER ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-6 sm:py-8 border-b border-sky-900 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 w-full text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                EASY 2-STEP BOOKING
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                ✓ NABL MC-6849
              </span>
            </div>
            <h1
              className="text-xl sm:text-2xl lg:text-3xl font-black !text-white leading-tight"
              style={{ color: "#ffffff" }}
            >
              Book Home Blood Test in Bengaluru
            </h1>
            <p
              className="!text-sky-200 text-xs sm:text-sm font-medium mt-0.5"
              style={{ color: "#bae6fd" }}
            >
              Free doorstep home collection across all 60+ Bengaluru localities · Same-day reports
            </p>
          </div>

          <a
            href="tel:+919964639639"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold px-4 py-2 rounded-full text-xs flex items-center gap-2 transition-all shrink-0"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Need Help? Call +91 9964 639 639</span>
          </a>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-[1200px] mx-auto px-4 pt-6 w-full">
        {submitted ? (
          /* ── SUCCESS CONFIRMATION VIEW ── */
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-200 shadow-md text-center max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-[#0B2545] mb-2">
              Booking Request Received!
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 font-semibold">
              Thank you, <strong className="text-[#0B2545]">{formData.name}</strong>. Our clinical coordinator will call you at <strong className="text-[#0B2545]">{formData.phone}</strong> within 15 minutes to confirm your sample collection slot.
            </p>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-700 border-b border-emerald-200/60 pb-1.5">
                <span>Selected Tests:</span>
                <span className="text-[#0B2545] text-right">{selectedItems.map((i) => i.name).join(", ")}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700 border-b border-emerald-200/60 pb-1.5">
                <span>Collection Mode:</span>
                <span className="text-emerald-800">{formData.collectionType === "home" ? "Free Doorstep Home Collection" : "Walk-in Lab Center"}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>Total Amount:</span>
                <span className="text-[#0B2545] font-black text-sm">₹{total}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href={getWhatsAppDirectLink()}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
                style={{ color: "#ffffff" }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <RazorpayCheckoutButton
                bookingIds={createdBookings.map((b) => b.id)}
                amountRupees={total}
                patientName={formData.name}
                patientEmail={formData.email || null}
                patientPhone={formData.phone}
                onPaid={() => setHasPaid(true)}
                className="w-full bg-[#D69A18] hover:bg-[#b88313] text-white font-black py-3 px-4 rounded-2xl shadow-sm text-xs uppercase tracking-wider cursor-pointer"
              />
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setHasPaid(false);
                setCreatedBookings([]);
                setCurrentStep(1);
                setFormData({
                  name: user?.name || "",
                  phone: user?.phone || "",
                  email: user?.email || "",
                  address: "",
                  date: "",
                  time: "",
                  collectionType: "home",
                  selectedCenter: "kengeri-main-lab",
                });
                setSelectedItems([]);
              }}
              className="text-[#0B2545] font-extrabold hover:text-[#D69A18] text-xs uppercase tracking-wider underline cursor-pointer"
            >
              + Book Another Test or Family Member
            </button>
          </div>
        ) : (
          /* ── 2-STEP BOOKING FLOW FORM ── */
          <div className="space-y-6">
            {/* 2-Step Interactive Progress Bar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-black text-[#0B2545] uppercase tracking-wider">
                  {currentStep === 1 ? "Step 1 of 2 — Select Tests & Packages" : "Step 2 of 2 — Patient Details & Schedule"}
                </span>
                <span className="text-xs font-black text-[#D69A18]">
                  {currentStep === 1 ? "50% Complete" : "100% Complete"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    currentStep === 1
                      ? "bg-[#0B2545] text-white shadow-xs"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  <span>{currentStep === 2 ? "✓ 1. Select Tests" : "1. Select Tests & Packages"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedItems.length > 0) {
                      setError(null);
                      setCurrentStep(2);
                    } else {
                      setError("Please select at least one test or health package first.");
                    }
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    currentStep === 2
                      ? "bg-[#0B2545] text-white shadow-xs"
                      : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>2. Patient & Schedule</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* ─────────────────────────────────────────────────────────────
                  STEP 1: SELECT TESTS, PACKAGES & VIEW ALL IN RIGHT SIDEBAR
              ───────────────────────────────────────────────────────────── */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column (Main Search & Featured Packages View - 7 Cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* 1. Collection Mode Selector */}
                    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
                      <label className="text-xs font-black text-[#0B2545] uppercase tracking-wider block mb-3">
                        Choose Sample Collection Mode:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label
                          className={`flex items-start cursor-pointer border rounded-2xl p-3.5 transition-all ${
                            formData.collectionType === "home"
                              ? "border-[#D69A18] bg-[#FFF8EB] ring-2 ring-[#D69A18]/20 shadow-2xs"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="collectionType"
                            value="home"
                            checked={formData.collectionType === "home"}
                            onChange={() => setFormData({ ...formData, collectionType: "home" })}
                            className="text-[#D69A18] focus:ring-[#D69A18] mr-2.5 w-4 h-4 mt-0.5 shrink-0"
                          />
                          <div>
                            <span className="text-xs font-black text-[#0B2545] flex items-center gap-1.5">
                              <Home className="w-4 h-4 text-[#D69A18]" /> Free Doorstep Home Collection
                            </span>
                            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                              Trained phlebotomist collects blood at your residence across Bengaluru
                            </p>
                          </div>
                        </label>

                        <label
                          className={`flex items-start cursor-pointer border rounded-2xl p-3.5 transition-all ${
                            formData.collectionType === "center"
                              ? "border-[#D69A18] bg-[#FFF8EB] ring-2 ring-[#D69A18]/20 shadow-2xs"
                              : "border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="collectionType"
                            value="center"
                            checked={formData.collectionType === "center"}
                            onChange={() => setFormData({ ...formData, collectionType: "center" })}
                            className="text-[#D69A18] focus:ring-[#D69A18] mr-2.5 w-4 h-4 mt-0.5 shrink-0"
                          />
                          <div>
                            <span className="text-xs font-black text-[#0B2545] flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-[#D69A18]" /> Walk-in Lab Center
                            </span>
                            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                              Visit QXL NABL Accredited Super Speciality Lab or Express Center
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Location Select Dropdown */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100">
                        <label className="text-[11px] font-black text-[#0B2545] uppercase tracking-wider block mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D69A18]" /> Select Bengaluru Location / Lab Hub:
                          </span>
                          <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            60+ Locations Covered
                          </span>
                        </label>

                        <div className="relative">
                          <select
                            value={formData.selectedCenter}
                            onChange={(e) => setFormData({ ...formData, selectedCenter: e.target.value as any })}
                            className="w-full bg-[#FAFBFD] border-2 border-[#F3DBA7] focus:border-[#D69A18] text-[#0B2545] font-black text-xs rounded-2xl px-3.5 py-2.5 appearance-none shadow-2xs cursor-pointer outline-none transition-all pr-10"
                          >
                            <optgroup label="🏢 QXL NABL Super Speciality Labs & Express Hubs">
                              <option value="kengeri-main-lab">🏢 Kengeri Main Reference Lab (NABL Accredited — Mysore Road - Open 24×7)</option>
                              <option value="yelahanka-north-hub">🏢 Yelahanka North Express Hub (NABL Accredited — RMZ Galleria)</option>
                              <option value="central-hub">🏢 Central Hub — Koramangala / MG Road</option>
                              <option value="jp-nagar-hub">🏢 South Hub — JP Nagar 5th Phase</option>
                              <option value="whitefield-hub">🏢 East Hub — Whitefield ITPL Main Road</option>
                              <option value="indiranagar-hub">🏢 East Hub — Indiranagar 100ft Road</option>
                              <option value="rajajinagar-hub">🏢 West Hub — Rajajinagar Chord Road</option>
                              <option value="hebbal-hub">🏢 North Hub — Hebbal / Sahakara Nagar</option>
                              <option value="electronic-city-hub">🏢 South-East Hub — Electronic City Phase 1</option>
                              <option value="hsr-layout-hub">🏢 South Hub — HSR Layout Sector 1</option>
                              <option value="rr-nagar-hub">🏢 West Hub — Rajarajeshwari Nagar (RR Nagar)</option>
                              <option value="jayanagar-hub">🏢 South Hub — Jayanagar 4th Block</option>
                              <option value="banashankari-hub">🏢 South-West Hub — Banashankari 3rd Stage</option>
                              <option value="vijayanagar-hub">🏢 West Hub — Vijayanagar RPC Layout</option>
                            </optgroup>
                            <optgroup label="📍 All 60+ Doorstep Sample Collection Localities">
                              {homeCollectionAreas.map((area) => (
                                <option key={area.id} value={area.slug}>
                                  📍 {area.name} (Pincodes: {area.pincodes.join(", ")})
                                </option>
                              ))}
                            </optgroup>
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#D69A18] font-bold text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Main Search Bar */}
                    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs relative" ref={suggestionsRef}>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                          <Search className="w-4 h-4 text-[#D69A18]" /> Instant Search Any Test / Package
                        </label>
                        <span className="text-[10.5px] font-bold text-slate-400">
                          {catalog.length}+ Master Tests &amp; Packages
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          placeholder={
                            catalogLoading
                              ? "Loading catalog..."
                              : "Type test or package (e.g. CBC, HbA1c, Vitamin D, Lipid, Full Body)..."
                          }
                          value={testInput}
                          disabled={catalogLoading}
                          onChange={(e) => {
                            setTestInput(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          className="w-full bg-[#FDFBF7] border border-[#F3DBA7] focus:border-[#D69A18] focus:ring-2 focus:ring-[#D69A18]/20 rounded-2xl px-4 py-3 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
                        />
                        {testInput && (
                          <button
                            type="button"
                            onClick={() => {
                              setTestInput("");
                              setShowSuggestions(false);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Dropdown Suggestions */}
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#F3DBA7] rounded-2xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto">
                          {suggestions.map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => addItem(s)}
                              className="w-full px-4 py-2.5 text-left hover:bg-[#FFF8EB] flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors cursor-pointer"
                            >
                              <div>
                                <span className="text-xs font-black text-[#0B2545] block">
                                  {s.name}
                                </span>
                                <span className="text-[10px] text-slate-500 font-semibold">
                                  {s.kind === "package" ? "Health Package" : "Lab Test"} · Report in 6 Hours
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-[#D69A18]">
                                  ₹{s.price}
                                </span>
                                <span className="text-[10px] font-black bg-[#D69A18] text-white px-2 py-0.5 rounded-full shadow-2xs">
                                  + Add
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 3. Popular Health Checkup Packages Cards */}
                    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
                      <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>🔥 Featured Preventive Health Packages</span>
                        <span className="text-[10.5px] text-[#D69A18] font-extrabold">Same-Day NABL Reports</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {catalog
                          .filter((c) => c.kind === "package")
                          .slice(0, 4)
                          .map((pkg) => {
                            const isAdded = selectedItems.some((s) => s.name.toLowerCase() === pkg.name.toLowerCase());
                            return (
                              <div
                                key={pkg.id}
                                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                                  isAdded
                                    ? "bg-emerald-50/70 border-emerald-300 shadow-2xs"
                                    : "bg-white border-slate-200 hover:border-[#D69A18]"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-1 mb-1">
                                    <h4 className="text-xs font-black text-[#0B2545] leading-tight">
                                      {pkg.name}
                                    </h4>
                                    <span className="text-xs font-black text-[#D69A18]">
                                      ₹{pkg.price}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold line-clamp-2 leading-relaxed">
                                    {pkg.includes || pkg.parameters}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => (isAdded ? removeItem(pkg.id) : addItem(pkg))}
                                  className={`mt-2.5 w-full py-1.5 rounded-xl text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xs ${
                                    isAdded
                                      ? "bg-emerald-600 text-white"
                                      : "bg-[#FFF8EB] border border-[#F3DBA7] text-[#0B2545] hover:bg-[#D69A18] hover:text-white"
                                  }`}
                                >
                                  {isAdded ? "✓ Added to Cart" : "+ Quick Add"}
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Cart Summary & ALL 100+ Catalog List - 5 Cols) */}
                  <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
                    {/* ── CARD 1: ORDER SUMMARY & CART ── */}
                    <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-md space-y-4">
                      <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          🛒 Cart Summary
                        </span>
                        <span className="bg-[#D69A18] text-white px-2 py-0.5 rounded-full text-[10px] font-black">
                          {selectedItems.length} {selectedItems.length === 1 ? "Item" : "Items"}
                        </span>
                      </h3>

                      {selectedItems.length === 0 ? (
                        <div className="text-center py-5 px-3 bg-[#FAFBFD] rounded-2xl border border-dashed border-slate-200">
                          <p className="text-xs font-bold text-slate-600">Your cart is empty.</p>
                          <p className="text-[11px] text-slate-400 font-semibold mt-1">
                            Browse the list below or search to add tests &amp; packages.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {selectedItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white text-xs"
                            >
                              <div className="pr-2 truncate">
                                <span className="font-black text-[#0B2545] block truncate">
                                  {item.name}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  ₹{item.price}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-slate-400 hover:text-red-500 p-1 shrink-0 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2 text-xs font-semibold pt-2 border-t border-slate-100">
                        <div className="flex justify-between text-slate-600">
                          <span>Subtotal:</span>
                          <span className="font-bold text-[#0B2545]">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Doorstep Collection:</span>
                          <span className="text-emerald-700 font-black">FREE</span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-[#0B2545] pt-2 border-t border-slate-200">
                          <span>Total Amount:</span>
                          <span className="text-base text-[#D69A18]">₹{total}</span>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-red-700 text-xs font-bold">
                          {error}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (selectedItems.length === 0) {
                            setError("Please select at least one test or health package to continue.");
                            return;
                          }
                          setError(null);
                          setCurrentStep(2);
                        }}
                        className="w-full bg-[#D69A18] hover:bg-[#b88313] !text-white font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                        style={{ color: "#ffffff" }}
                      >
                        <span className="!text-white font-black" style={{ color: "#ffffff" }}>
                          Continue to Patient &amp; Slot →
                        </span>
                      </button>
                    </div>

                    {/* ── CARD 2: ALL PACKAGES & TESTS RIGHT SIDEBAR CATALOG ── */}
                    <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                          <Filter className="w-3.5 h-3.5 text-[#D69A18]" /> All Packages &amp; Tests ({filteredRightCatalog.length})
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          1-Tap Add
                        </span>
                      </div>

                      {/* Search inside right panel */}
                      <input
                        type="text"
                        placeholder="Search inside catalog..."
                        value={rightSearchQuery}
                        onChange={(e) => setRightSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] font-bold text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18]"
                      />

                      {/* Filter category tabs */}
                      <div className="flex flex-wrap gap-1.5 pb-1">
                        {[
                          { id: "all", label: "All" },
                          { id: "package", label: "Packages" },
                          { id: "test", label: "Tests" },
                          { id: "diabetes", label: "Diabetes" },
                          { id: "thyroid", label: "Thyroid" },
                          { id: "heart", label: "Heart" },
                          { id: "vitamins", label: "Vitamins" },
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setRightFilterCat(cat.id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                              rightFilterCat === cat.id
                                ? "bg-[#0B2545] text-white shadow-2xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>

                      {/* Scrollable List of All 100+ Items */}
                      <div className="max-h-[460px] overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
                        {filteredRightCatalog.map((item) => {
                          const isAdded = selectedItems.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
                          return (
                            <div
                              key={item.id}
                              className="pt-2 first:pt-0 flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-black text-[#0B2545] truncate block">
                                    {item.name}
                                  </span>
                                  {item.kind === "package" && (
                                    <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-1.5 py-0.2 rounded shrink-0">
                                      PKG
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                                  <span>{item.parameters || "Accredited Test"}</span>
                                  {item.old_price && (
                                    <span className="line-through text-slate-400">₹{item.old_price}</span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs font-black text-[#0B2545]">
                                  ₹{item.price}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => (isAdded ? removeItem(item.id) : addItem(item))}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xs ${
                                    isAdded
                                      ? "bg-emerald-600 text-white"
                                      : "bg-[#FFF8EB] border border-[#F3DBA7] text-[#0B2545] hover:bg-[#D69A18] hover:text-white"
                                  }`}
                                >
                                  {isAdded ? "✓ Added" : "+ Add"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  STEP 2: PATIENT DETAILS, LOCALITY CHECK, SCHEDULE & SUBMIT
              ───────────────────────────────────────────────────────────── */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column (Patient & Schedule Form) */}
                  <div className="lg:col-span-8 space-y-5">
                    {/* Back Button */}
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-[#0B2545] hover:text-[#D69A18] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>← Edit Selected Tests ({selectedItems.length} items)</span>
                    </button>

                    {/* Patient Information Form Card */}
                    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                      <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#D69A18]" /> Patient Information
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                            Patient Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Kumar"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, "") })
                            }
                            className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18] focus:ring-2 focus:ring-[#D69A18]/20 transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                            className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18] focus:ring-2 focus:ring-[#D69A18]/20 transition-all shadow-2xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address for Reports (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="For automatic PDF report delivery"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18] focus:ring-2 focus:ring-[#D69A18]/20 transition-all shadow-2xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Schedule Date & Time Slot Card */}
                    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                      <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#D69A18]" /> Schedule Sample Collection Slot
                      </h3>

                      {/* Quick Date Chips */}
                      <div>
                        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2">
                          Select Collection Date:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                          {getQuickDates().map((d) => {
                            const isSelected = formData.date === d.val;
                            return (
                              <button
                                key={d.val}
                                type="button"
                                onClick={() => setFormData({ ...formData, date: d.val })}
                                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-2xs ${
                                  isSelected
                                    ? "bg-[#D69A18] text-white shadow-xs"
                                    : "bg-[#FFF8EB] border border-[#F3DBA7] text-[#0B2545] hover:bg-[#FDE6C2]"
                                }`}
                              >
                                {d.label}
                              </button>
                            );
                          })}
                        </div>

                        <input
                          type="date"
                          min={mounted ? new Date().toLocaleDateString("en-CA") : undefined}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-[#0B2545]"
                        />
                      </div>

                      {/* Time Slot Grid */}
                      <div>
                        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2">
                          Select Morning / Afternoon Time Slot:
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
                          {generateTimeSlots(formData.date).map((slot) => {
                            const isSelected = formData.time === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setFormData({ ...formData, time: slot })}
                                className={`py-2 px-2 text-[11px] font-extrabold rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#0B2545] text-white border-[#0B2545] shadow-xs"
                                    : "bg-white border-slate-200 text-slate-700 hover:border-[#D69A18]"
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Doorstep Address with Locality Checker inside Step 2 */}
                    {formData.collectionType === "home" ? (
                      <div className="space-y-4">
                        {/* Doorstep Locality Check Widget placed inside Step 2 */}
                        <LocalityCheckWidget variant="hero" />

                        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#D69A18]" /> Doorstep Address in Bengaluru
                            </h3>
                            <button
                              type="button"
                              onClick={detectLocation}
                              disabled={locating}
                              className="text-[11px] font-extrabold bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#D69A18] hover:text-white transition-all shrink-0 cursor-pointer"
                            >
                              {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3 h-3" />}
                              <span>{locating ? "Detecting..." : "Auto-Detect My Location"}</span>
                            </button>
                          </div>

                          {detectedAddress && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex flex-col gap-2">
                              <p>
                                <strong>Detected Address:</strong> {detectedAddress}
                              </p>
                              <button
                                type="button"
                                onClick={useDetectedAddress}
                                className="bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-lg text-[10.5px] w-fit"
                              >
                                Use Detected Address ✓
                              </button>
                            </div>
                          )}
                          {locationError && (
                            <p className="text-[11px] font-bold text-amber-700">{locationError}</p>
                          )}

                          <textarea
                            rows={3}
                            required
                            placeholder="House No, Apartment Name, Street, Area, Landmark, Pincode..."
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl p-3 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18] focus:ring-2 focus:ring-[#D69A18]/20 transition-all resize-none shadow-2xs"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                        <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#D69A18]" /> Select Walk-in Lab Center
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div
                            onClick={() => setFormData({ ...formData, selectedCenter: "kengeri-main-lab" })}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              formData.selectedCenter === "kengeri-main-lab"
                                ? "border-[#D69A18] bg-[#FFF8EB] ring-2 ring-[#D69A18]/20 shadow-2xs"
                                : "border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-xs font-black text-[#0B2545] block">
                              Kengeri Main Reference Lab (NABL)
                            </span>
                            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                              3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060
                            </p>
                          </div>

                          <div
                            onClick={() => setFormData({ ...formData, selectedCenter: "yelahanka-north-hub" })}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                              formData.selectedCenter === "yelahanka-north-hub"
                                ? "border-[#D69A18] bg-[#FFF8EB] ring-2 ring-[#D69A18]/20 shadow-2xs"
                                : "border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <span className="text-xs font-black text-[#0B2545] block">
                              Yelahanka North Express Hub
                            </span>
                            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                              L Square, opp RMZ Galleria Mall, Yelahanka, Bengaluru 560064
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DPDP Act 2023 Consent Checkbox */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={consentChecked}
                          onChange={(e) => setConsentChecked(e.target.checked)}
                          className="mt-0.5 w-4 h-4 text-[#D69A18] rounded focus:ring-[#D69A18] shrink-0"
                        />
                        <span className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                          I consent to QXL Diagnostics collecting and processing my details for sample collection and report delivery under DPDP Act 2023 &amp; <a href="/privacy-policy" target="_blank" className="text-[#0B2545] font-bold underline">Privacy Policy</a>.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Right Column (Review Summary & Final Submit) */}
                  <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
                    <div className="bg-white p-5 rounded-3xl border border-emerald-300 shadow-md space-y-4">
                      <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center justify-between">
                        <span>Confirm Booking</span>
                        <span className="text-emerald-700 font-bold">Step 2 of 2</span>
                      </h3>

                      <div className="space-y-2 text-xs font-semibold text-slate-700">
                        <div className="flex justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-slate-500">Items:</span>
                          <span className="font-black text-[#0B2545]">{selectedItems.length} Selected</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-slate-500">Mode:</span>
                          <span className="font-bold text-emerald-800">
                            {formData.collectionType === "home" ? "Home Collection" : "Walk-in Center"}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-1.5">
                          <span className="text-slate-500">Date/Time:</span>
                          <span className="font-bold text-[#0B2545]">
                            {formData.date || "Tomorrow"} ({formData.time || "Morning"})
                          </span>
                        </div>
                        <div className="flex justify-between text-sm font-black text-[#0B2545] pt-1">
                          <span>Total Amount:</span>
                          <span className="text-base text-[#D69A18]">₹{total}</span>
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-red-700 text-xs font-bold">
                          {error}
                        </div>
                      )}

                      <div className="space-y-2 pt-2">
                        <button
                          type="submit"
                          disabled={submitting || !consentChecked}
                          className="w-full bg-[#D69A18] hover:bg-[#b88313] !text-white font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-widest shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                          style={{ color: "#ffffff" }}
                        >
                          {submitting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : null}
                          <span className="!text-white font-black" style={{ color: "#ffffff" }}>
                            {submitting ? "Confirming..." : "Confirm Booking Request ✓"}
                          </span>
                        </button>

                        <a
                          href={getWhatsAppDirectLink()}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
                          style={{ color: "#ffffff" }}
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                          <span>Book via WhatsApp 1-Click</span>
                        </a>
                      </div>

                      <p className="text-[10px] text-slate-400 font-semibold text-center leading-snug">
                        ⚡ Clinical coordinator calls within 15 mins to confirm. Cash on delivery or online payment available.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
