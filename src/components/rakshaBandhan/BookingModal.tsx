"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, User, Phone, MapPin, ShieldCheck, HeartHandshake } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackageDefault?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedPackageDefault = "Full Body Health Checkup (80 Params - ₹800)",
}: BookingModalProps) {
  const [packageName, setPackageName] = useState(selectedPackageDefault);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [locationType, setLocationType] = useState<"home" | "lab">("home");
  const [address, setAddress] = useState("");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !consent) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName("");
    setPhone("");
    setPreferredDate("");
    setAddress("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>SPECIAL OFFER • ₹800 ONLY</span>
          </div>
          
          <h3 className="text-xl font-bold text-white">Book Your Health Checkup</h3>
          <p className="text-sm text-cyan-100 mt-1">
            NABL Accredited Lab • Free Home Sample Collection Across Bengaluru
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-teal-100 text-[#00A8A8] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h4>
              <p className="text-slate-600 text-sm max-w-xs mx-auto mb-6">
                Thank you <span className="font-semibold text-slate-800">{fullName}</span>. Our healthcare executive will contact you shortly at <span className="font-semibold text-slate-800">{phone}</span> to confirm your sample collection slot.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 space-y-1 mb-6 text-left border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Package:</span>
                  <span className="font-medium text-slate-900">{packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Special Price:</span>
                  <span className="font-bold text-[#0A5DAA]">₹800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Collection Mode:</span>
                  <span className="font-medium text-slate-900 capitalize">{locationType} Collection</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 bg-[#0A5DAA] hover:bg-[#084b8a] text-white font-semibold rounded-xl shadow-lg transition-all"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Health Package
                </label>
                <select
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:bg-white transition-all font-medium"
                >
                  <option value="Full Body Health Checkup (80 Params - ₹800)">
                    Full Body Special Checkup (80 Parameters - ₹800)
                  </option>
                  <option value="Women's Health Check (₹800)">
                    Women's Health Check (Special ₹800)
                  </option>
                  <option value="Men's Health Check (₹800)">
                    Men's Health Check (Special ₹800)
                  </option>
                  <option value="Family Duo Package (2 Checkups - ₹1500)">
                    Family Duo Combo (2 Members - Special ₹1,500)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter patient name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Collection Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocationType("home")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                      locationType === "home"
                        ? "bg-teal-50 border-[#00A8A8] text-[#00A8A8]"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Home Collection
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocationType("lab")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                      locationType === "lab"
                        ? "bg-teal-50 border-[#00A8A8] text-[#00A8A8]"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Visit QXL Lab
                  </button>
                </div>
              </div>

              {locationType === "home" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Bengaluru Locality / Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indiranagar, Whitefield, Kengeri, Yelahanka"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:bg-white transition-all"
                  />
                </div>
              )}

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#00A8A8] rounded border-slate-300 focus:ring-[#00A8A8]"
                  />
                  <span className="text-xs text-slate-500 leading-tight">
                    I agree to allow QXL Diagnostics healthcare representatives to contact me via Phone/WhatsApp regarding my test booking.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !consent}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] hover:from-[#084b8a] hover:to-[#008f8f] text-white font-bold rounded-xl shadow-lg shadow-cyan-900/10 transition-all flex items-center justify-center gap-2 text-base uppercase tracking-wide disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Your Booking...</span>
                ) : (
                  <>
                    <span>Confirm Booking • ₹800</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>NABL Accredited Lab ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber}) • 100% Secure</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
