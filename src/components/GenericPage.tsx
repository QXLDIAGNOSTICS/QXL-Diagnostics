"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle, FileText, MapPin, Phone, Mail } from "lucide-react";
import AiChat from "@/components/AiChat";

interface GenericPageProps {
  title: string;
  subtitle: string;
  badge?: string;
  contentParagraphs?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function GenericPage({
  title,
  subtitle,
  badge = "QXL Diagnostic Services",
  contentParagraphs = [
    "QXL Diagnostics is a NABL-accredited super speciality diagnostic laboratory in Bengaluru offering 300+ advanced pathology, molecular diagnostic, and histopathology tests with same-day digital report delivery.",
    "Our certified phlebotomists provide free home sample collection across Bengaluru. All samples are analyzed in automated ISO 15189 standard analyzers with dual pathologically verified Quality Control checks.",
    "For inquiries, test bookings, or clinical assistance, please call our 24x7 customer desk at +91 99646 39639 or book online.",
  ],
  ctaText = "Book a Diagnostic Test",
  ctaLink = "/book",
}: GenericPageProps) {
  return (
    <div className="min-h-screen bg-[#f8faff] text-[#0f2d5e] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e8f4fd] rounded-3xl p-8 border border-sky-200/60 shadow-sm space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] text-[10px] font-extrabold uppercase tracking-widest border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            {badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2d5e]">{title}</h1>
          <p className="text-slate-600 text-sm font-medium max-w-2xl">{subtitle}</p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 border border-sky-200/60 shadow-xl space-y-6">
          <div className="space-y-4">
            {contentParagraphs.map((para, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
            <h3 className="text-xs font-extrabold text-[#0f2d5e] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> NABL Certified Laboratory Standards
            </h3>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              Main Lab: 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060 · Call: +91 99646 39639
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2563eb] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#1d4ed8] transition-all shadow-sm"
              >
                {ctaText} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-sky-300 text-[#2563eb] text-xs font-extrabold uppercase tracking-wider hover:bg-sky-50 transition-all"
              >
                Contact Customer Care
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AiChat />
    </div>
  );
}
