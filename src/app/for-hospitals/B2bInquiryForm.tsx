"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, MessageSquareText, FileText } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_LINK } from "@/lib/businessInfo";

export default function B2bInquiryForm() {
  const [formState, setFormState] = useState({
    name: "",
    institution: "",
    role: "Owner/MD",
    mobile: "",
    intent: "Referral rate card",
    volume: "<500",
    consent: true,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.institution || !formState.mobile) return;
    setStatus("loading");

    // Track GTM b2b_form_submit conversion event
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "b2b_form_submit",
        institution_role: formState.role,
        b2b_intent: formState.intent,
        monthly_volume: formState.volume,
      });
    }

    // Format WhatsApp inquiry payload
    const msg = `*New B2B Reference Lab Inquiry*
*Name:* ${formState.name}
*Institution:* ${formState.institution}
*Role:* ${formState.role}
*Mobile:* ${formState.mobile}
*Intent:* ${formState.intent}
*Monthly Volume:* ${formState.volume}`;

    const waUrl = `https://api.whatsapp.com/send?phone=919964639639&text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  const trackWhatsAppClick = () => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "b2b_whatsapp_click" });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl text-slate-800 text-left">
      <h3 className="text-xl font-black text-[#0f2d5e] mb-1">Request B2B Rate Card</h3>
      <p className="text-xs text-slate-500 font-semibold mb-6">
        Fill this 5-field form to receive our referral rate card and TAT directory.
      </p>

      {status === "success" ? (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-emerald-900 text-base">Inquiry Submitted!</h4>
            <p className="text-xs text-emerald-700 font-semibold mt-1">
              Dr. Muruda or the B2B desk will call you within one working day.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href="https://wa.me/919964639639?text=Hi%2C%20I%20just%20submitted%20a%20B2B%20inquiry%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="bg-[#25D366] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Dr. / Mr. / Ms. Full Name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2563eb]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
              Institution / Hospital Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. City Care Hospital & Polyclinic"
              value={formState.institution}
              onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2563eb]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Your Role <span className="text-rose-500">*</span>
              </label>
              <select
                value={formState.role}
                onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2563eb]"
              >
                <option value="Owner/MD">Owner / MD</option>
                <option value="Medical Director">Medical Director</option>
                <option value="Lab In-charge">Lab In-charge</option>
                <option value="Purchase/Admin">Purchase / Admin</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 Mobile Number"
                value={formState.mobile}
                onChange={(e) => setFormState({ ...formState, mobile: e.target.value.replace(/\D/g, "") })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                What are you looking for? <span className="text-rose-500">*</span>
              </label>
              <select
                value={formState.intent}
                onChange={(e) => setFormState({ ...formState, intent: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2563eb]"
              >
                <option value="Referral rate card">Referral rate card</option>
                <option value="Collection centre">Collection centre</option>
                <option value="HLM/lab takeover">HLM / Lab takeover</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Monthly Sample Volume
              </label>
              <select
                value={formState.volume}
                onChange={(e) => setFormState({ ...formState, volume: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#2563eb]"
              >
                <option value="<500">&lt;500 samples/mo</option>
                <option value="500–2,000">500–2,000 samples/mo</option>
                <option value="2,000–10,000">2,000–10,000 samples/mo</option>
                <option value=">10,000">&gt;10,000 samples/mo</option>
              </select>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="dpdp-b2b-consent"
              required
              checked={formState.consent}
              onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
            />
            <label htmlFor="dpdp-b2b-consent" className="text-[10.5px] text-slate-500 font-medium leading-tight cursor-pointer">
              I consent to QXL Diagnostics contacting me about laboratory reference services and processing this data per the DPDP Act, 2023 and Privacy Policy.
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer mt-2"
          >
            <Send className="w-4 h-4" />
            <span>{status === "loading" ? "Submitting Inquiry..." : "Submit B2B Inquiry"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
