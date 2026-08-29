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
    <div className="sticky top-[90px] z-30 w-full text-left">
      <div className="bg-white p-6 sm:p-7 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-blue-100 shadow-[0_8px_30px_rgba(37,99,235,0.08)] relative z-10">
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-bold text-[#0f2d5e] mb-0.5 md:mb-1">Request a Call Back</h3>
          <p className="text-xs md:text-sm text-slate-500 font-medium">Leave your number and we'll call you right away.</p>
        </div>
        
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center my-4">
            <p className="text-emerald-600 text-sm font-bold">Request received! We'll call you shortly.</p>
          </div>
        ) : (
          <form className="flex flex-col gap-3 md:gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] md:text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl md:rounded-2xl px-3.5 py-2.5 md:px-5 md:py-3.5 text-xs md:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] md:text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 Contact number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl md:rounded-2xl px-3.5 py-2.5 md:px-5 md:py-3.5 text-xs md:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] md:text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Message (Optional)
              </label>
              <textarea
                rows={1}
                placeholder="Any specific requirements?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl md:rounded-2xl px-3.5 py-2 md:px-5 md:py-3.5 text-xs md:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-xs resize-none"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2563eb] text-white font-black px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-md hover:bg-[#1d4ed8] active:scale-[0.98] transition-all text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Submitting...' : 'Request Call'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
