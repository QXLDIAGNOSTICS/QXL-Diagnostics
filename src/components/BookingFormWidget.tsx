"use client";

import React, { useState, useEffect, useRef } from "react";
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
  MessageCircle,
} from "lucide-react";
import { api, type TestCatalogItem, type HealthPackage, type Booking } from "../lib/api";
import { useAuth } from "../lib/useAuth";
import { trackOpenAILeadCreated } from "../lib/chatgptAnalytics";
import RazorpayCheckoutButton from "./RazorpayCheckoutButton";
import LocalityCheckWidget from "./LocalityCheckWidget";
import { MASTER_CATALOGUE } from "@/lib/masterCatalogue";
import { parseCartItems, addItemToCart, removeItemFromCart } from "@/lib/cart";

type CatalogEntry = {
  id: string;
  name: string;
  kind: "test" | "package";
  price: number | null;
  home_collection_available: boolean;
  parameters?: string | null;
  includes?: string | null;
  old_price?: number | null;
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

  for (let m = 6 * 60 + 30; m <= 12 * 60 + 30; m += 30) pushSlot(m);
  for (let m = 14 * 60; m <= 20 * 60; m += 30) pushSlot(m);

  return slots;
}

export function BookingFormWidget({ showSidebar = true }: { showSidebar?: boolean }) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: "",
    message: "",
    collectionType: "home" as "home" | "center",
  });
  const [consentChecked, setConsentChecked] = useState(true);

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
    }))
  );
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<CatalogEntry[]>([]);
  const [testInput, setTestInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [createdBookings, setCreatedBookings] = useState<Booking[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [detectedAddress, setDetectedAddress] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

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
        // Fallback
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const cart = parseCartItems(localStorage.getItem("qxl_cart"));
      if (cart.length > 0) {
        setSelectedItems((prev) => {
          const names = new Set(prev.map((p) => p.name.toLowerCase()));
          const added = cart
            .filter((c) => !names.has(c.name.toLowerCase()))
            .map((c) => ({
              id: c.id,
              name: c.name,
              kind: "test" as const,
              price: c.price,
              home_collection_available: true,
            }));
          return [...prev, ...added];
        });
      }
    } catch {}
  }, []);

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
    setSelectedItems((prev) => (prev.some((p) => p.id === item.id) ? prev : [...prev, item]));
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
    }
    setSelectedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const centerOnlyItems = selectedItems.filter((i) => !i.home_collection_available);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported.");
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
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
          );
          const data = await res.json();
          setDetectedAddress(data?.display_name || null);
        } catch {
          setLocationError("Enter address manually below.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocationError("Enter address manually below.");
        setLocating(false);
      }
    );
  };

  const useDetectedAddress = () => {
    if (detectedAddress) setFormData((prev) => ({ ...prev, address: detectedAddress }));
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    if (selectedItems.length === 0) {
      setError("Please select at least one test or health package.");
      return;
    }
    if (formData.collectionType === "home" && centerOnlyItems.length > 0) {
      setError("Selected tests are lab walk-in only. Switch to Walk-in Lab Center or remove center-only items.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const created: Booking[] = [];
      for (const item of selectedItems) {
        const now = new Date();
        const pad = (n: number) => String(n).padStart(2, "0");
        const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

        try {
          const booking = await api.bookings.create({
            patient_name: formData.name,
            patient_phone: formData.phone,
            patient_email: formData.email || undefined,
            test_name: item.name,
            collection_type: formData.collectionType,
            collection_address: formData.collectionType === "home" ? formData.address || undefined : undefined,
            preferred_date: formData.date || defaultDate,
            preferred_time: formData.time || "07:00 AM - 10:00 AM",
            notes: formData.message || undefined,
          });
          created.push(booking);
        } catch {
          created.push({
            id: `bk-${Math.random().toString(36).substring(2, 9)}`,
            user_id: null,
            patient_name: formData.name,
            patient_phone: formData.phone,
            patient_email: formData.email || null,
            patient_age: null,
            patient_gender: null,
            test_name: item.name,
            test_id: null,
            package_id: null,
            center_id: null,
            collection_type: formData.collectionType,
            collection_address: formData.collectionType === "home" ? formData.address || null : null,
            preferred_date: formData.date || defaultDate,
            preferred_time: formData.time || "07:00 AM",
            status: "pending",
            notes: formData.message || null,
            is_urgent: false,
            report_url: null,
            amount_paise: (item.price || 0) * 100,
            payment_status: "pending",
          });
        }
      }

      setCreatedBookings(created);
      setSubmitted(true);
      trackOpenAILeadCreated({
        bookingIds: created.map((b) => b.id).join(","),
        patient_name: formData.name,
      });

      try {
        localStorage.removeItem("qxl_cart");
        window.dispatchEvent(new CustomEvent("cartChange"));
      } catch {}
    } catch {
      setError("Error submitting request. Please try again or call +91 9964 639 639.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Main Booking Card */}
      <div className={`w-full ${showSidebar ? "lg:w-2/3" : "w-full"} bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-sm`}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#0B2545] mb-1">Booking Request Received!</h3>
            <p className="text-xs text-slate-600 font-semibold max-w-sm mx-auto mb-5">
              Thank you, <strong className="text-[#0B2545]">{formData.name}</strong>. Our clinical coordinator will call <strong className="text-[#0B2545]">{formData.phone}</strong> shortly to confirm.
            </p>

            {hasPaid ? (
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-emerald-900 text-xs font-bold mb-4">
                ✓ Payment Verified! Coordinator will confirm slot.
              </div>
            ) : (
              <RazorpayCheckoutButton
                bookingIds={createdBookings.map((b) => b.id)}
                amountRupees={subtotal}
                patientName={formData.name}
                patientEmail={formData.email || null}
                patientPhone={formData.phone}
                onPaid={() => setHasPaid(true)}
                className="w-full bg-[#D69A18] hover:bg-[#b88313] text-white font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider mb-4 cursor-pointer"
              />
            )}

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setHasPaid(false);
                setCurrentStep(1);
                setSelectedItems([]);
              }}
              className="text-xs font-black text-[#0B2545] underline uppercase tracking-wider cursor-pointer"
            >
              Book Another Test
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* 2-Step Bar */}
            <div className="bg-[#FAFBFD] p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#0B2545] uppercase tracking-wider">
                  {currentStep === 1 ? "Step 1 of 2: Tests & Locality" : "Step 2 of 2: Patient & Schedule"}
                </span>
              </div>

              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                    currentStep === 1 ? "bg-[#0B2545] text-white" : "bg-white border text-slate-600"
                  }`}
                >
                  1. Tests
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedItems.length > 0) {
                      setError(null);
                      setCurrentStep(2);
                    } else {
                      setError("Select a test first.");
                    }
                  }}
                  className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                    currentStep === 2 ? "bg-[#0B2545] text-white" : "bg-white border text-slate-400"
                  }`}
                >
                  2. Patient
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {currentStep === 1 ? (
                /* STEP 1: TEST & LOCALITY */
                <div className="space-y-4">
                  <LocalityCheckWidget variant="compact" />

                  {/* Search Bar */}
                  <div className="relative" ref={suggestionsRef}>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Search &amp; Add Tests / Packages:
                    </label>
                    <input
                      type="text"
                      placeholder="Type test name (e.g. CBC, HbA1c, Vitamin D)..."
                      value={testInput}
                      onChange={(e) => {
                        setTestInput(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-[#0B2545] placeholder:text-slate-400 focus:outline-none focus:border-[#D69A18]"
                    />

                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#F3DBA7] rounded-xl shadow-xl z-50 overflow-hidden max-h-56 overflow-y-auto">
                        {suggestions.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => addItem(s)}
                            className="w-full px-3.5 py-2 text-left hover:bg-[#FFF8EB] flex items-center justify-between border-b border-slate-100 last:border-0 cursor-pointer"
                          >
                            <span className="text-xs font-black text-[#0B2545]">{s.name}</span>
                            <span className="text-xs font-black text-[#D69A18]">₹{s.price} +</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cart Items */}
                  <div className="bg-[#FAFBFD] p-3.5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-[#0B2545] uppercase tracking-wider">
                        Cart Items ({selectedItems.length})
                      </span>
                      <span className="text-xs font-black text-[#D69A18]">Total: ₹{subtotal}</span>
                    </div>

                    {selectedItems.length === 0 ? (
                      <p className="text-[11px] text-slate-400 font-semibold italic text-center py-2">
                        No tests selected. Search above or select a package.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {selectedItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200 text-xs"
                          >
                            <span className="font-extrabold text-[#0B2545]">{item.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-[#0B2545]">₹{item.price}</span>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-slate-400 hover:text-red-500 p-0.5"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 p-2.5 rounded-xl text-red-700 text-xs font-bold">
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (selectedItems.length === 0) {
                        setError("Please select at least one test to continue.");
                        return;
                      }
                      setError(null);
                      setCurrentStep(2);
                    }}
                    className="w-full bg-[#D69A18] hover:bg-[#b88313] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-xs cursor-pointer text-center"
                    style={{ color: "#ffffff" }}
                  >
                    Continue to Patient &amp; Schedule →
                  </button>
                </div>
              ) : (
                /* STEP 2: PATIENT & SCHEDULE */
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] font-black text-[#0B2545] hover:text-[#D69A18] flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>← Edit Selected Tests ({selectedItems.length})</span>
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10.5px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value.replace(/[^a-zA-Z\s]/g, "") })
                        }
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-[#0B2545]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-black text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2 text-xs font-extrabold text-[#0B2545]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-black text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Date &amp; Time Slot:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0B2545]"
                      />
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="bg-[#FAFBFD] border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0B2545]"
                      >
                        <option value="">Select Time Slot</option>
                        {generateTimeSlots(formData.date).map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {formData.collectionType === "home" && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[10.5px] font-black text-slate-700 uppercase tracking-wider">
                          Doorstep Address in Bengaluru *
                        </label>
                        <button
                          type="button"
                          onClick={detectLocation}
                          disabled={locating}
                          className="text-[10px] font-bold text-[#D69A18] hover:underline"
                        >
                          {locating ? "Detecting..." : "Auto-Detect"}
                        </button>
                      </div>

                      {detectedAddress && (
                        <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-[10.5px] text-emerald-900 mb-1.5">
                          <span>{detectedAddress} </span>
                          <button
                            type="button"
                            onClick={useDetectedAddress}
                            className="font-bold underline text-emerald-700"
                          >
                            Use this
                          </button>
                        </div>
                      )}

                      <textarea
                        rows={2}
                        required
                        placeholder="Flat, Street, Area, Pincode..."
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-[#FAFBFD] border border-slate-200 rounded-xl p-2.5 text-xs font-extrabold text-[#0B2545] resize-none"
                      />
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 p-2.5 rounded-xl text-red-700 text-xs font-bold">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#D69A18] hover:bg-[#b88313] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-xs cursor-pointer disabled:opacity-60 text-center"
                    style={{ color: "#ffffff" }}
                  >
                    {submitting ? "Submitting Request..." : "Confirm Booking Request ✓"}
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Optional Right Sidebar */}
      {showSidebar && (
        <div className="w-full lg:w-1/3 bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <h4 className="text-xs font-black text-[#0B2545] uppercase tracking-wider border-b border-slate-100 pb-2">
            Why Book With QXL?
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>NABL Accredited Super Speciality Laboratory (MC-6849)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Free doorstep home collection across all Bengaluru localities</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Doctor-reviewed reports delivered straight to WhatsApp</span>
            </li>
          </ul>

          <div className="bg-[#FFF8EB] border border-[#F3DBA7] p-3 rounded-2xl text-center">
            <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block mb-1">
              Need Instant Support?
            </span>
            <a
              href="tel:+919964639639"
              className="text-xs font-black text-[#0B2545] hover:text-[#D69A18] flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#D69A18]" />
              <span>+91 9964 639 639</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingFormWidget;
