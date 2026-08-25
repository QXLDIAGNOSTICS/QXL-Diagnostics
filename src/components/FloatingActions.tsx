"use client";
import React, { useState, useEffect } from 'react';
import { HelpCircle, Phone, MessageCircle, Bot, Calendar, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {/* Floating Help Button */}
      <div className={`fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-[9990] transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#0f2d5e] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#1a3d75] active:scale-95 transition-all cursor-pointer border border-white/20"
          aria-label="Need Help?"
        >
          <div className="w-6 h-6 rounded-full bg-[#D69A18] flex items-center justify-center text-white shrink-0">
            <HelpCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider pr-1">Help</span>
        </button>
      </div>

      {/* Help Bottom Sheet Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-end lg:items-center justify-center p-0 lg:p-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-t-3xl lg:rounded-3xl shadow-2xl overflow-hidden z-10 animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="bg-[#FFF8EB] border-b border-[#F3DBA7] p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#D69A18] flex items-center justify-center text-white">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0f2d5e] text-sm">Need Assistance?</h3>
                  <p className="text-slate-500 text-[11px] font-medium">We are here to guide your diagnostic journey</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Help Actions List */}
            <div className="p-4 space-y-2.5">
              <a
                href="https://api.whatsapp.com/send?phone=919964639639"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-emerald-950 text-xs sm:text-sm">WhatsApp QXL Coordinator</h4>
                    <p className="text-emerald-700 text-[11px] font-medium">Instant chat support & test guidance</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:+919964639639"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-sky-200 bg-sky-50/50 hover:bg-sky-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Call QXL Helpline</h4>
                    <p className="text-slate-600 text-[11px] font-medium">+91 9964 639 639 (24x7 Assistance)</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0284c7] group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent('openAiChat'));
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D69A18] to-[#f59e0b] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Ask QXL AI Assistant</h4>
                    <p className="text-slate-600 text-[11px] font-medium">Explain tests, fasting & symptom guidance</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#D69A18] group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2d5e] text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">Booking Assistance</h4>
                    <p className="text-slate-600 text-[11px] font-medium">Select tests or schedule home collection</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
