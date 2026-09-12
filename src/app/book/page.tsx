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
  Send,
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ShoppingCart,
  Zap,
  Tag,
} from "lucide-react";
import { api, type TestCatalogItem, type HealthPackage, type Booking } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";
import LocalityCheckWidget from "@/components/LocalityCheckWidget";
import { trackChatGPTBookingStart, trackChatGPTBookingCompleted } from "@/lib/chatgptAnalytics";
import { matchMasterItem, MASTER_CATALOGUE } from "@/lib/masterCatalogue";
import { parseCartItems, addItemToCart, removeItemFromCart, type CartItem } from "@/lib/cart";
import ReactMarkdown from "react-markdown";
import { QXL_AI_KEY, OPENAI_API_KEY, getQxlSystemPrompt, getGroundedClinicalAiResponse } from "@/lib/qxlAiSystemPrompt";

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
  const cutoff = isToday ? now.getHours() * 60 + now.getMinutes() + 15 : -1;

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

  // Catalog state - populated with master catalogue
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

  // AI Assistant Search State
  const [aiQuery, setAiQuery] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiRecommendedItems, setAiRecommendedItems] = useState<CatalogEntry[]>([]);
  const [showAiBox, setShowAiBox] = useState(false);

  // Voice States
  const [isAiListening, setIsAiListening] = useState(false);
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(false);
  const aiRecognitionRef = useRef<any>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Right sidebar catalog state
  const [rightFilterCat, setRightFilterCat] = useState<string>("all");
  const [rightSearchQuery, setRightSearchQuery] = useState<string>("");

  // Booking states
  const [submitted, setSubmitted] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [createdBookings, setCreatedBookings] = useState<Booking[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Location detection
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setCatalogLoading(true);
      try {
        const tests = await api.tests.list().catch(() => []);
        const packages = await api.packages.list().catch(() => []);

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
        // Local catalogue fallback
      } finally {
        setCatalogLoading(false);
      }
    })();
  }, []);

  const findCatalogMatch = (wanted: string, items: CatalogEntry[]): CatalogEntry | undefined => {
    const masterMatch = matchMasterItem(wanted);
    if (masterMatch) {
      const matchInItems = items.find(
        (c) => c.id === masterMatch.id || c.name.toLowerCase() === masterMatch.name.toLowerCase()
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
    for (const w of rawWanted) {
      const match = findCatalogMatch(w, catalog);
      if (match) matches.push(match);
    }

    if (matches.length) {
      setSelectedItems((prev) => {
        const existingNames = new Set(prev.map((p) => p.name.toLowerCase()));
        const uniqueMatches = matches.filter((m) => !existingNames.has(m.name.toLowerCase()));
        return [...prev, ...uniqueMatches];
      });
    }
  }, [catalog]);

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
        .slice(0, 15)
    : catalog.filter((c) => !selectedItems.some((s) => s.id === c.id)).slice(0, 10);

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

  const handleAiSearch = async (queryText?: string) => {
    const q = (queryText || aiQuery || testInput).trim();
    if (!q) return;

    setShowAiBox(true);
    const instantReply = getGroundedClinicalAiResponse(q);
    setAiResponse(instantReply);

    const lowerQ = q.toLowerCase();
    const matchedInstant: CatalogEntry[] = catalog.filter((c) => {
      const nameL = c.name.toLowerCase();
      return (
        instantReply.toLowerCase().includes(nameL) ||
        (lowerQ.includes("fever") && (nameL.includes("fever") || nameL.includes("cbc") || nameL.includes("quick fit"))) ||
        (lowerQ.includes("diabet") && (nameL.includes("hba1c") || nameL.includes("sugar") || nameL.includes("diabetes"))) ||
        (lowerQ.includes("thyroid") && (nameL.includes("thyroid") || nameL.includes("tsh"))) ||
        (lowerQ.includes("full body") && c.kind === "package")
      );
    });
    setAiRecommendedItems(matchedInstant.length > 0 ? matchedInstant.slice(0, 6) : catalog.filter(c => c.kind === "package").slice(0, 4));
    setAiLoading(true);

    try {
      const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || OPENAI_API_KEY;
      if (openAiKey) {
        const prompt = getQxlSystemPrompt(q);
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openAiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: prompt },
              { role: "user", content: q }
            ],
            temperature: 0.3,
            max_tokens: 500
          })
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content || "";
          if (reply.trim()) {
            setAiResponse(reply);
            return;
          }
        }
      }
    } catch {
      // Instant fallback reply active
    } finally {
      setAiLoading(false);
    }
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

  const matchCategoryFilter = (item: CatalogEntry, catId: string): boolean => {
    if (catId === "all") return true;
    if (catId === "package" || catId === "packages") return item.kind === "package";
    if (catId === "test" || catId === "tests") return item.kind === "test";

    const lowerName = item.name.toLowerCase();
    const lowerCat = (item.category || "").toLowerCase();

    if (catId === "diabetes") {
      return (
        lowerCat.includes("diabetes") ||
        lowerName.includes("hba1c") ||
        lowerName.includes("glucose") ||
        lowerName.includes("sugar") ||
        lowerName.includes("insulin") ||
        lowerName.includes("c-peptide") ||
        lowerName.includes("homa") ||
        lowerName.includes("acr") ||
        lowerName.includes("diabetes")
      );
    }
    if (catId === "thyroid") {
      return (
        lowerCat.includes("thyroid") ||
        lowerName.includes("thyroid") ||
        lowerName.includes("tsh") ||
        lowerName.includes("ft3") ||
        lowerName.includes("ft4") ||
        lowerName.includes("triiodothyronine") ||
        lowerName.includes("thyroxine") ||
        lowerName.includes("tpo") ||
        lowerName.includes("thyroglobulin")
      );
    }
    if (catId === "heart") {
      return (
        lowerCat.includes("heart") ||
        lowerCat.includes("cardio") ||
        lowerName.includes("lipid") ||
        lowerName.includes("cholesterol") ||
        lowerName.includes("crp") ||
        lowerName.includes("troponin") ||
        lowerName.includes("bnp") ||
        lowerName.includes("cardiac") ||
        lowerName.includes("apolipoprotein") ||
        lowerName.includes("lipoprotein") ||
        lowerName.includes("homocysteine") ||
        lowerName.includes("ck-mb") ||
        lowerName.includes("cardiovascular")
      );
    }
    if (catId === "vitamins") {
      return (
        lowerCat.includes("vitamin") ||
        lowerName.includes("vitamin") ||
        lowerName.includes("ferritin") ||
        lowerName.includes("iron") ||
        lowerName.includes("calcium") ||
        lowerName.includes("magnesium") ||
        lowerName.includes("electrolyte") ||
        lowerName.includes("uric acid")
      );
    }
    if (catId === "hormones") {
      return (
        lowerCat.includes("hormone") ||
        lowerName.includes("testosterone") ||
        lowerName.includes("prolactin") ||
        lowerName.includes("luteinizing") ||
        lowerName.includes("follicle") ||
        lowerName.includes("estradiol") ||
        lowerName.includes("progesterone") ||
        lowerName.includes("müllerian") ||
        lowerName.includes("cortisol") ||
        lowerName.includes("dhea") ||
        lowerName.includes("gonadotropin") ||
        lowerName.includes("hcg")
      );
    }
    if (catId === "autoimmune") {
      return (
        lowerCat.includes("autoimmune") ||
        lowerName.includes("antinuclear") ||
        lowerName.includes("ana ") ||
        lowerName.includes("ana-") ||
        lowerName.includes("dna antibody") ||
        lowerName.includes("extractable nuclear") ||
        lowerName.includes("citrullinated") ||
        lowerName.includes("rheumatoid") ||
        lowerName.includes("anca") ||
        lowerName.includes("complement") ||
        lowerName.includes("coeliac") ||
        lowerName.includes("aquaporin") ||
        lowerName.includes("myelin") ||
        lowerName.includes("encephalitis") ||
        lowerName.includes("arthritis")
      );
    }
    if (catId === "oncology") {
      return (
        lowerCat.includes("oncology") ||
        lowerCat.includes("cancer") ||
        lowerName.includes("prostate") ||
        lowerName.includes("psa") ||
        lowerName.includes("cancer antigen") ||
        lowerName.includes("carcinoembryonic") ||
        lowerName.includes("alpha-fetoprotein") ||
        lowerName.includes("electrophoresis") ||
        lowerName.includes("immunofixation") ||
        lowerName.includes("light chain") ||
        lowerName.includes("flow cytometry") ||
        lowerName.includes("tumour")
      );
    }
    if (catId === "infections") {
      return (
        lowerCat.includes("infection") ||
        lowerName.includes("dengue") ||
        lowerName.includes("malaria") ||
        lowerName.includes("typhoid") ||
        lowerName.includes("hepatitis") ||
        lowerName.includes("hiv") ||
        lowerName.includes("influenza") ||
        lowerName.includes("urine routine") ||
        lowerName.includes("fever")
      );
    }
    return true;
  };

  const filteredRightCatalog = catalog.filter((item) => {
    if (!matchCategoryFilter(item, rightFilterCat)) return false;

    const query = (testInput || rightSearchQuery).trim().toLowerCase();
    if (query) {
      return (
        item.name.toLowerCase().includes(query) ||
        (item.parameters && item.parameters.toLowerCase().includes(query)) ||
        (item.includes && item.includes.toLowerCase().includes(query)) ||
        (item.category && item.category.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-16 text-slate-800">
      {/* ── TOP HEADER ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-6 sm:py-8 border-b border-blue-900 shadow-sm">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5 flex-wrap">
              <span className="bg-[#D69A18] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                QUICK 2-STEP BOOKING
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                ✓ NABL MC-6849
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black !text-white leading-tight" style={{ color: "#ffffff" }}>
              Book Lab Test &amp; Home Sample Collection
            </h1>
            <p className="!text-sky-100 text-xs sm:text-sm font-semibold mt-1" style={{ color: "#e0f2fe" }}>
              100% Free Doorstep Collection across all Bengaluru localities · Doctor-reviewed reports
            </p>
          </div>

          <a
            href="tel:+919964639639"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-extrabold px-4 py-2 rounded-full text-xs flex items-center gap-2 transition-all shrink-0 shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#D69A18]" />
            <span>Need Help? +91 9964 639 639</span>
          </a>
        </div>
      </section>

      {/* ── STEPPER NAV BAR ── */}
      <div className="max-w-[1260px] mx-auto px-4 pt-6">
        {!submitted && (
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs mb-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-black text-[#0B2545] uppercase tracking-wider">
                {currentStep === 1 ? "Step 1 of 2: Select Tests & Packages" : "Step 2 of 2: Patient & Schedule"}
              </span>
              <span className="text-xs font-black text-[#D69A18]">
                {currentStep === 1 ? "50% Complete" : "100% Complete"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  currentStep === 1
                    ? "bg-[#0B2545] text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                }`}
              >
                <span>{currentStep === 2 ? "✓ 1. Tests Selected" : "1. Select Tests & Packages"}</span>
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
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  currentStep === 2
                    ? "bg-[#0B2545] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>2. Patient Details &amp; Slot</span>
              </button>
            </div>
          </div>
        )}

        {/* ── SUCCESS VIEW ── */}
        {submitted ? (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-200 shadow-md text-center max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-[#0B2545] mb-2">Booking Request Received!</h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 font-semibold">
              Thank you, <strong className="text-[#0B2545]">{formData.name}</strong>. Our clinical coordinator will call you at <strong className="text-[#0B2545]">{formData.phone}</strong> within 15 minutes to confirm your sample collection.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-700 border-b border-emerald-200/60 pb-1.5">
                <span>Selected Tests:</span>
                <span className="text-[#0B2545] text-right font-black">{selectedItems.map((i) => i.name).join(", ")}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700 border-b border-emerald-200/60 pb-1.5">
                <span>Collection Mode:</span>
                <span className="text-emerald-800 font-extrabold">{formData.collectionType === "home" ? "Free Doorstep Home Collection" : "Walk-in Center"}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-700">
                <span>Total Amount:</span>
                <span className="text-[#D69A18] font-black text-base">₹{total}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href={getWhatsAppDirectLink()}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                style={{ color: "#ffffff" }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm via WhatsApp</span>
              </a>

              <RazorpayCheckoutButton
                bookingIds={createdBookings.map((b) => b.id)}
                amountRupees={total}
                patientName={formData.name}
                patientEmail={formData.email || null}
                patientPhone={formData.phone}
                onPaid={() => setHasPaid(true)}
                className="w-full bg-[#D69A18] hover:bg-[#b88313] text-white font-black py-3 px-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer"
              />
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setHasPaid(false);
                setCreatedBookings([]);
                setCurrentStep(1);
                setSelectedItems([]);
              }}
              className="text-[#0B2545] font-extrabold hover:text-[#D69A18] text-xs uppercase tracking-wider underline cursor-pointer"
            >
              + Book Another Test or Family Member
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* ── STEP 1: SELECT TESTS ── */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT 7 COLUMNS: SEARCH, CATEGORY FILTERS & CATALOGUE LIST */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Home Collection Banner */}
                  <div className="bg-gradient-to-r from-[#0B2545] to-[#128C7E] p-5 rounded-3xl text-white shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                          <Home className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-0.5">
                            100% FREE DOORSTEP COLLECTION
                          </span>
                          <h3 className="text-base sm:text-lg font-black leading-tight !text-white" style={{ color: "#ffffff" }}>
                            Home Sample Visits Across Bengaluru
                          </h3>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-50 font-medium leading-relaxed" style={{ color: "#f0fdf4" }}>
                      Trained NABL-certified phlebotomists arrive at your doorstep across 60+ Bengaluru localities.
                    </p>
                  </div>

                  {/* Instant Search Box */}
                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs relative" ref={suggestionsRef}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                        <Search className="w-4 h-4 text-[#D69A18]" /> Search Any Blood Test or Package
                      </label>
                      <span className="text-[10.5px] font-bold text-slate-500">
                        {catalog.length}+ Master Tests
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type test name (e.g. CBC, Fasting Sugar, Thyroid, Vitamin D, Full Body)..."
                        value={testInput}
                        disabled={catalogLoading}
                        onChange={(e) => {
                          setTestInput(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full bg-[#FAFBFD] border border-slate-200 focus:border-[#D69A18] focus:ring-2 focus:ring-[#D69A18]/20 rounded-2xl px-4 py-3 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 outline-none transition-all shadow-2xs"
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

                    {/* Search Autocomplete Suggestions Dropdown */}
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-amber-200 rounded-2xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto divide-y divide-slate-100">
                        {suggestions.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => addItem(s)}
                            className="w-full px-4 py-3 text-left hover:bg-[#FFF8EB] flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <div>
                              <span className="text-xs font-black text-[#0B2545] block">{s.name}</span>
                              <span className="text-[10px] text-slate-500 font-semibold">
                                {s.kind === "package" ? "Health Package" : "Laboratory Test"} · Report in 6 Hours
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-[#D69A18]">₹{s.price}</span>
                              <span className="text-[10px] font-black bg-[#D69A18] text-white px-2 py-0.5 rounded-full">
                                + Add
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── PROMINENT CATEGORY FILTER BUTTONS & MASTER CATALOG ── */}
                  <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                          <Filter className="w-4 h-4 text-[#D69A18]" /> Filter Diagnostic Catalog
                        </h3>
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                          Click any category button below to show matching packages &amp; tests.
                        </p>
                      </div>
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10.5px] font-black px-2.5 py-1 rounded-full w-fit shrink-0">
                        {filteredRightCatalog.length} Items Found
                      </span>
                    </div>

                    {/* Category Buttons List Bar */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-200">
                      {[
                        { id: "all", label: "All", icon: "✨" },
                        { id: "package", label: "Packages", icon: "📦" },
                        { id: "test", label: "Tests", icon: "🧪" },
                        { id: "diabetes", label: "Diabetes", icon: "🍬" },
                        { id: "thyroid", label: "Thyroid", icon: "🦋" },
                        { id: "heart", label: "Heart", icon: "❤️" },
                        { id: "vitamins", label: "Vitamins & Minerals", icon: "☀️" },
                        { id: "hormones", label: "Hormones", icon: "⚡" },
                        { id: "autoimmune", label: "Autoimmune", icon: "🧬" },
                        { id: "oncology", label: "Oncology", icon: "🔬" },
                        { id: "infections", label: "Infections", icon: "🦠" },
                      ].map((cat) => {
                        const isActive = rightFilterCat === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setRightFilterCat(cat.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                              isActive
                                ? "bg-[#0B2545] text-white shadow-sm ring-2 ring-[#D69A18]"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                            }`}
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Master Catalogue Item Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto pr-1">
                      {filteredRightCatalog.length === 0 ? (
                        <div className="col-span-full py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          <p className="text-xs font-extrabold text-slate-600">No tests match your selected filter or search query.</p>
                          <button
                            type="button"
                            onClick={() => {
                              setRightFilterCat("all");
                              setTestInput("");
                              setRightSearchQuery("");
                            }}
                            className="mt-2 text-xs font-black text-[#D69A18] hover:underline cursor-pointer"
                          >
                            Reset Filters &amp; Show All 100+ Tests
                          </button>
                        </div>
                      ) : (
                        filteredRightCatalog.map((item) => {
                          const isAdded = selectedItems.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
                          return (
                            <div
                              key={item.id}
                              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                                isAdded
                                  ? "bg-emerald-50 border-emerald-300 shadow-2xs"
                                  : "bg-white border-slate-200 hover:border-[#D69A18]"
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span
                                    className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                      item.kind === "package" ? "bg-amber-100 text-amber-900" : "bg-blue-100 text-blue-900"
                                    }`}
                                  >
                                    {item.kind === "package" ? "PACKAGE" : "TEST"}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    {item.old_price && item.old_price > (item.price || 0) && (
                                      <span className="text-[10px] text-slate-400 line-through">₹{item.old_price}</span>
                                    )}
                                    <span className="text-xs font-black text-[#D69A18]">₹{item.price}</span>
                                  </div>
                                </div>
                                <h4 className="text-xs font-black text-[#0B2545] leading-tight mb-1">{item.name}</h4>
                                <p className="text-[10.5px] text-slate-500 font-semibold line-clamp-2 leading-relaxed">
                                  {item.parameters || item.includes || "NABL Accredited Parameter Panel"}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => (isAdded ? removeItem(item.id) : addItem(item))}
                                className={`mt-3 w-full py-2 rounded-xl text-[10.5px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                  isAdded
                                    ? "bg-emerald-600 text-white shadow-2xs"
                                    : "bg-[#FFF8EB] border border-[#F3DBA7] text-[#0B2545] hover:bg-[#D69A18] hover:text-white"
                                }`}
                              >
                                {isAdded ? "✓ Added to Booking" : "+ Add"}
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT 5 COLUMNS: CART SUMMARY & ALL CATALOG LIST */}
                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
                  {/* Cart Summary Card */}
                  <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-md space-y-4">
                    <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ShoppingCart className="w-4 h-4 text-[#D69A18]" /> Cart Summary
                      </span>
                      <span className="bg-[#D69A18] text-white px-2 py-0.5 rounded-full text-[10px] font-black">
                        {selectedItems.length} {selectedItems.length === 1 ? "Item" : "Items"}
                      </span>
                    </h3>

                    {selectedItems.length === 0 ? (
                      <div className="text-center py-5 px-3 bg-[#FAFBFD] rounded-2xl border border-dashed border-slate-200">
                        <p className="text-xs font-bold text-slate-600">Your cart is empty.</p>
                        <p className="text-[11px] text-slate-400 font-semibold mt-1">
                          Search above or select a category to add tests to your booking.
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
                              <span className="font-black text-[#0B2545] block truncate">{item.name}</span>
                              <span className="text-[10px] text-slate-500 font-semibold">₹{item.price}</span>
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

                    <div className="space-y-1.5 text-xs font-semibold pt-2 border-t border-slate-100">
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

                  {/* All 100+ Catalog Items Right Sidebar */}
                  <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5 text-[#D69A18]" /> Quick Catalog Filters ({filteredRightCatalog.length})
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        1-Tap Add
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="Search inside catalog list..."
                      value={rightSearchQuery}
                      onChange={(e) => setRightSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] font-bold text-[#0B2545] placeholder:text-slate-400 outline-none focus:border-[#D69A18]"
                    />

                    <div className="flex flex-wrap gap-1 pb-1">
                      {[
                        { id: "all", label: "All" },
                        { id: "package", label: "Packages" },
                        { id: "test", label: "Tests" },
                        { id: "diabetes", label: "Diabetes" },
                        { id: "thyroid", label: "Thyroid" },
                        { id: "heart", label: "Heart" },
                        { id: "vitamins", label: "Vitamins" },
                        { id: "hormones", label: "Hormones" },
                        { id: "autoimmune", label: "Autoimmune" },
                        { id: "oncology", label: "Oncology" },
                        { id: "infections", label: "Infections" },
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

                    <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
                      {filteredRightCatalog.map((item) => {
                        const isAdded = selectedItems.some((s) => s.name.toLowerCase() === item.name.toLowerCase());
                        return (
                          <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-black text-[#0B2545] truncate block">{item.name}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{item.parameters || "Accredited Test"}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-black text-[#0B2545]">₹{item.price}</span>
                              <button
                                type="button"
                                onClick={() => (isAdded ? removeItem(item.id) : addItem(item))}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
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

            {/* ── STEP 2: PATIENT & SCHEDULE ── */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-5">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-[#0B2545] hover:text-[#D69A18] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>← Edit Selected Tests ({selectedItems.length} items)</span>
                  </button>

                  {/* Patient Info Card */}
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                    <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#D69A18]" /> Patient Details
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
                          onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, "") })}
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0B2545] outline-none focus:border-[#D69A18]"
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
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0B2545] outline-none focus:border-[#D69A18]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address for Digital PDF Report (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="For automatic report delivery"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0B2545] outline-none focus:border-[#D69A18]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Slot Card */}
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                    <h3 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D69A18]" /> Schedule Sample Collection
                    </h3>

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
                              className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
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

                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2">
                        Select Time Slot:
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-44 overflow-y-auto pr-1">
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

                  {/* Doorstep Address & Locality Checker */}
                  <div className="space-y-4">
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
                          className="text-[11px] font-extrabold bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#D69A18] hover:text-white transition-all cursor-pointer"
                        >
                          {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <LocateFixed className="w-3 h-3" />}
                          <span>{locating ? "Detecting..." : "Auto-Detect Address"}</span>
                        </button>
                      </div>

                      {detectedAddress && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex flex-col gap-2">
                          <p><strong>Detected Address:</strong> {detectedAddress}</p>
                          <button
                            type="button"
                            onClick={useDetectedAddress}
                            className="bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-lg text-[10.5px] w-fit"
                          >
                            Use Detected Address ✓
                          </button>
                        </div>
                      )}
                      {locationError && <p className="text-[11px] font-bold text-amber-700">{locationError}</p>}

                      <textarea
                        rows={3}
                        required
                        placeholder="House No, Apartment Name, Street, Area, Landmark, Pincode..."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl p-3 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 outline-none focus:border-[#D69A18] resize-none"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-[#D69A18] rounded shrink-0"
                      />
                      <span className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                        I consent to QXL Diagnostics processing my details for sample collection and report delivery under DPDP Act 2023 &amp; <a href="/privacy-policy" target="_blank" className="text-[#0B2545] font-bold underline">Privacy Policy</a>.
                      </span>
                    </label>
                  </div>
                </div>

                {/* RIGHT 4 COLUMNS: CONFIRMATION SUMMARY */}
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
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      {/* ── STICKY MOBILE BOTTOM BAR ── */}
      {currentStep === 1 && selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-50 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              {selectedItems.length} {selectedItems.length === 1 ? "Item" : "Items"} Selected
            </span>
            <span className="text-base font-black text-[#D69A18]">₹{total}</span>
          </div>
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            style={{ color: "#ffffff" }}
          >
            <span>Next: Patient &amp; Slot →</span>
          </button>
        </div>
      )}
    </div>
  );
}
