"use client";
import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, Share2, MessageCircle, Clock } from "lucide-react";
import { WHATSAPP_LINK } from "../lib/businessInfo";

const personas = [
  {
    role: "Father",
    title: "Who never complains.",
    quote: "“I’m fine. I don't need tests.”",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150236/Assets-QXL/legacy-assets/image/senior_bp_check.png",
    color: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-100 text-blue-700"
  },
  {
    role: "Mother",
    title: "Who always puts the family first.",
    quote: "“Take care of the children first, I’ll manage.”",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150185/Assets-QXL/legacy-assets/image/female_doctor_consult.jpg",
    color: "from-rose-500 to-pink-600",
    badgeBg: "bg-rose-100 text-rose-700"
  },
  {
    role: "Youngster",
    title: "Too busy to think about health.",
    quote: "“I’m young and active, nothing will happen.”",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150205/Assets-QXL/legacy-assets/image/happy_couple_phone.jpg",
    color: "from-amber-500 to-orange-600",
    badgeBg: "bg-amber-100 text-amber-700"
  },
  {
    role: "Grandparent",
    title: "Who quietly ignores warning signs.",
    quote: "“It’s just old age, don't worry about it.”",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150179/Assets-QXL/legacy-assets/image/family_clinic_consult.jpg",
    color: "from-emerald-600 to-teal-700",
    badgeBg: "bg-emerald-100 text-emerald-700"
  }
];

export default function EmotionalFamilyCampaign() {
  const shareOffer = () => {
    const text = `💙 *QXL DIAGNOSTICS FAMILY HEALTH CHECK* 💙\nDon't let "I'll get tested later" become too late. Book home blood collection for your family today:\nhttps://qxldiagnostics.com`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 via-white to-blue-50/50 text-[#0f2d5e] relative overflow-hidden border-t border-slate-200/60">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            Family Preventive Care Campaign
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4 text-[#0f2d5e]">
            EVERY FAMILY HAS SOMEONE WHO SAYS…
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#2563eb] italic">
            “I’m fine. I’ll get tested later.”
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-medium mt-4 leading-relaxed">
            Turn <strong className="text-[#0f2d5e]">“later”</strong> into <strong className="text-emerald-600">“today.”</strong> Give your loved ones the confidence of knowing their health.
          </p>
        </div>

        {/* 4 Personas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {personas.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 hover:border-blue-300 rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Image Box */}
                <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 relative">
                  <img
                    src={p.image}
                    alt={p.role}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className={`absolute bottom-3 left-3 font-black text-xs px-3 py-1 rounded-full shadow-sm ${p.badgeBg}`}>
                    {p.role}
                  </span>
                </div>

                <h3 className="font-extrabold text-[#0f2d5e] text-base leading-snug mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-xs italic font-medium bg-slate-50 border border-slate-100 p-3 rounded-xl">
                  {p.quote}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-between text-xs font-extrabold text-[#2563eb] hover:text-blue-700 transition-colors"
                >
                  <span>Book Health Check for {p.role}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call To Action Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-sky-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-[#0f2d5e]">
              Share with someone who always puts their health last.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Free home blood collection across Bengaluru with same-day doctor-verified reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={shareOffer}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider"
            >
              <span>Book Health Check</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
