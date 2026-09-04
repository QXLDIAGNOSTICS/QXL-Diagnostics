"use client";
import React, { useState } from 'react';

export default function StickyBookingForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="sticky top-[90px] z-30 w-full text-left h-full">
      <div className="bg-white p-5 sm:p-6 md:p-7 rounded-3xl border border-slate-200/80 shadow-sm relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="mb-4 md:mb-5">
            <span className="text-[10px] font-black text-[#D69A18] uppercase tracking-widest block mb-1">
              Quick Appointment
            </span>
            <h3 className="text-lg md:text-xl font-bold text-[#0f2d5e] mb-0.5">
              Request a Call Back
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Leave your number and we'll call you right away.
            </p>
          </div>
          
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center my-4">
              <p className="text-emerald-700 text-xs sm:text-sm font-extrabold">
                ✓ Request received! Our medical team will call you shortly.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10.5px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 Contact number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-extrabold text-slate-700 mb-1 uppercase tracking-wider">
                  Message (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific requirements or test names?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-2xs resize-none"
                />
              </div>
              
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="dpdp-consent-sticky"
                  required
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                />
                <label htmlFor="dpdp-consent-sticky" className="text-[10px] text-slate-500 font-medium leading-tight cursor-pointer">
                  I consent to QXL Diagnostics contacting me via Call/WhatsApp &amp; storing data per DPDP guidelines and <a href="/privacy-policy" target="_blank" className="text-blue-600 underline font-semibold">Privacy Policy</a>.
                </label>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? 'Submitting...' : 'Request Call Back →'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bottom Reassurance Strip — Ensures 100% Flush Alignment with Left Recommended Packages Container */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2.5 shrink-0">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-600">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px]">
              ✓ NABL MC-6849
            </span>
            <span className="text-slate-500 font-bold">Free Doorstep Pickup</span>
          </div>
          <a 
            href="tel:+919964639639" 
            className="text-center text-xs font-black text-[#0f2d5e] hover:text-[#2563eb] bg-[#f8fafc] hover:bg-slate-100 py-2.5 px-3 rounded-2xl border border-slate-200/80 transition-all block"
          >
            📞 Helpline: +91 9964 639 639
          </a>
        </div>
      </div>
    </div>
  );
}
