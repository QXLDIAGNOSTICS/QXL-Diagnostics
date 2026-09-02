"use client";
import React, { useState, useEffect } from "react";
import { X, Phone, CheckCircle, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function CallbackModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    // Only show if the modal has not been shown in this session
    if (typeof window !== "undefined") {
      const hasBeenShown = sessionStorage.getItem("qxl_callback_shown");
      if (hasBeenShown) return;
    }

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setOpen(true);
        sessionStorage.setItem("qxl_callback_shown", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    
    const textMsg = `*Request a Call Back*
*Name:* ${name.trim()}
*Phone:* ${phone.trim()}
*Message:* ${message.trim() || 'Please call me back.'}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919964639639&text=${encodeURIComponent(textMsg)}`;
    window.open(whatsappUrl, '_blank');
    
    setStatus("success");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(10,20,50,0.45)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Request a Call Back"
    >
      <div
        className="relative w-full max-w-[460px] rounded-[28px] overflow-hidden shadow-2xl"
        style={{ background: "white" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-all"
          aria-label="Close modal"
        >
          <X className="w-3.5 h-3.5 text-slate-500" />
        </button>

        {/* Top Section — light blue brand header */}
        <div
          className="relative overflow-hidden px-6 pt-4 pb-3 flex flex-col items-center text-center border-b border-sky-100"
          style={{
            background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"100px", height:"100px", borderRadius:"50%", background:"radial-gradient(circle,rgba(56,189,248,0.2) 0%,transparent 70%)", filter:"blur(20px)" }} />
            <div style={{ position:"absolute", bottom:"-10px", left:"-10px", width:"80px", height:"80px", borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.15) 0%,transparent 70%)", filter:"blur(16px)" }} />
          </div>

          {/* Icon & Heading Row */}
          <div className="flex items-center gap-3 relative z-10 mb-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm bg-white border border-sky-200 shrink-0">
              <Phone className="w-4 h-4 text-[#0ea5e9]" />
            </div>
            <h2 className="text-[#0f2d5e] text-lg font-black text-left">
              Request a Call Back
            </h2>
          </div>
          <p className="relative z-10 text-slate-500 text-[11px] font-medium leading-normal max-w-[340px]">
            Our team will call you within 30 minutes during working hours.
          </p>
        </div>

        {/* Bottom Section — light blue liquid glass form */}
        <div
          className="px-6 pt-3.5 pb-4"
          style={{
            background: "linear-gradient(135deg, rgba(224,242,254,0.85) 0%, rgba(240,249,255,0.9) 100%)",
            backdropFilter: "blur(16px)",
          }}
        >
          {status === "success" ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-9 h-9 text-emerald-500" />
              <p className="text-[#0f2d5e] font-bold text-center text-sm">We&apos;ll call you shortly!</p>
              <p className="text-slate-500 text-[11px] text-center max-w-[260px]">Thank you, {name}. Our team will reach you at {phone}.</p>
              <button
                onClick={handleClose}
                className="mt-1 bg-[#1d4ed8] text-white font-extrabold px-6 py-1.5 rounded-full text-xs hover:bg-[#1e40af] transition-all shadow"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              {/* Name & Phone in 2 columns for wider modal layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Name field */}
                <div>
                  <label className="text-[10px] font-bold text-[#0f2d5e] block mb-0.5">Your Name</label>
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1.5px solid rgba(125,199,232,0.45)",
                      boxShadow: "0 2px 8px rgba(14,165,233,0.06)",
                    }}
                  >
                    <svg className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                      className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Phone field */}
                <div>
                  <label className="text-[10px] font-bold text-[#0f2d5e] block mb-0.5">Phone Number</label>
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1.5px solid rgba(125,199,232,0.45)",
                      boxShadow: "0 2px 8px rgba(14,165,233,0.06)",
                    }}
                  >
                    <span className="text-xs font-extrabold text-[#0284c7] flex-shrink-0 border-r border-sky-200 pr-1.5 mr-0.5">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="9964 639 639"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Message field */}
              <div>
                <label className="text-[10px] font-bold text-[#0f2d5e] block mb-0.5">Message (Optional)</label>
                <div
                  className="flex items-start gap-2 rounded-xl px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1.5px solid rgba(125,199,232,0.45)",
                    boxShadow: "0 2px 8px rgba(14,165,233,0.06)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Any specific requirements?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="dpdp-consent-modal"
                  required
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
                <label htmlFor="dpdp-consent-modal" className="text-[10px] text-slate-500 font-medium leading-tight cursor-pointer">
                  I consent to QXL Diagnostics contacting me &amp; storing data per DPDP guidelines and <a href="/privacy-policy" target="_blank" className="text-blue-600 underline font-semibold">Privacy Policy</a>.
                </label>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-xs font-bold text-center">Something went wrong. Please try again.</p>
              )}

              <div className="flex items-center gap-3 mt-1">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                  style={{
                    background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
                    color: "white",
                    boxShadow: "0 4px 14px rgba(14,165,233,0.25)",
                  }}
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting…</>
                  ) : (
                    <><Phone className="w-3.5 h-3.5" /> Call Me Back</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-slate-400 text-[10px] font-semibold hover:text-slate-600 transition-colors px-2"
                >
                  No thanks, maybe later
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
