import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Newspaper, Calendar, CheckCircle2, ExternalLink, Award, Share2, Building2, Search, Sparkles } from "lucide-react";
import { SITE_URL } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "Newsroom & Media Coverage | QXL Diagnostics Super Speciality Lab",
  description:
    "Explore national media coverage, press releases, and corporate announcements from QXL Diagnostics Super Speciality Lab, Bengaluru. Covered in Business Standard, The Hindu, News18 & more.",
  alternates: {
    canonical: `${SITE_URL}/news/`,
  },
  openGraph: {
    title: "Newsroom & Media Coverage | QXL Diagnostics",
    description: "National media coverage of QXL Diagnostics Super Speciality Lab's Hospital Laboratory Management expansion.",
    url: `${SITE_URL}/news/`,
    type: "website",
    siteName: "QXL Diagnostics",
  },
};

const topOutlets = [
  { name: "Business Standard", logo: "/images/media/business-standard.svg", width: 240, height: 70 },
  { name: "The Hindu", logo: "/images/media/the-hindu.svg", width: 220, height: 70 },
  { name: "BusinessLine", logo: "/images/media/businessline.svg", width: 240, height: 70 },
  { name: "News18", logo: "/images/media/news18.svg", width: 180, height: 70 },
  { name: "The Tribune", logo: "/images/media/the-tribune.svg", width: 220, height: 70 },
  { name: "ANI News", logo: "/images/media/ani.svg", width: 180, height: 70 },
  { name: "PTI", logo: "/images/media/pti.svg", width: 200, height: 70 },
  { name: "Business Wire India", logo: "/images/media/business-wire.svg", width: 260, height: 70 },
];

export default function NewsIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news/` },
    ],
  };

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #38bdf8 0%, transparent 60%)" }} />
        
        <div className="max-w-[1240px] mx-auto px-4 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sky-300 mb-6 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white">Newsroom</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
              QXL MEDIA CENTRE
            </span>
            <span className="bg-white/10 text-sky-200 border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full">
              Press Releases &amp; Media Coverage
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight text-white tracking-tight">
            Newsroom &amp; Media Coverage
          </h1>

          <p className="text-sky-100 text-base md:text-lg max-w-3xl leading-relaxed font-medium mb-8">
            Official announcements, national media coverage, and corporate updates from QXL Diagnostics Super Speciality Lab, Bengaluru.
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-4xl">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-xs">
              <span className="block text-2xl font-black text-[#F3DBA7]">177</span>
              <span className="text-[11px] text-sky-200 font-bold uppercase tracking-wider">Online Postings</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-xs">
              <span className="block text-2xl font-black text-[#38bdf8]">8</span>
              <span className="text-[11px] text-sky-200 font-bold uppercase tracking-wider">Major Media Outlets</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-xs">
              <span className="block text-2xl font-black text-emerald-400">60</span>
              <span className="text-[11px] text-sky-200 font-bold uppercase tracking-wider">Hospital Target 2028</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-xs">
              <span className="block text-2xl font-black text-amber-300">NABL</span>
              <span className="text-[11px] text-sky-200 font-bold uppercase tracking-wider">Accredited Lab</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP OUTLETS LOGO STRIP ── */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white via-slate-50/70 to-white border-y border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-3 shadow-2xs">
              NATIONAL MEDIA RECOGNITION
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0f2d5e] tracking-tight uppercase leading-snug">
              AS FEATURED IN LEADING NATIONAL PUBLICATIONS
            </h2>
            <div className="w-28 h-1.5 bg-gradient-to-r from-[#D69A18] via-amber-400 to-[#0f2d5e] mx-auto mt-3 rounded-full"></div>
          </div>

          {/* 8 Prominent Outlet Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {topOutlets.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-[#D69A18] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center min-h-[90px] sm:min-h-[110px] group"
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                  className="max-h-12 sm:max-h-14 md:max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MAIN FEATURED ANNOUNCEMENT CARD ── */}
      <section className="py-14 max-w-[1240px] mx-auto px-4">
        <div className="mb-8">
          <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest block mb-1">FEATURED COVERAGE</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e]">Latest Media Announcement</h2>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
          
          {/* Main Content */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-[#D69A18]">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2026-09-16">16 September 2026</time>
                </span>
                <span>•</span>
                <span>Business Wire India Distribution</span>
                <span>•</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-extrabold border border-emerald-200">
                  177 Postings
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] leading-tight mb-4 hover:text-[#D69A18] transition-colors">
                <Link href="/news/qxl-diagnostics-60-hospital-laboratory-partnerships-2028/">
                  QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028
                </Link>
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-5">
                QXL Diagnostics Super Speciality Lab has announced its expansion strategy to partner with 60 hospitals across India by 2028 under its turnkey Hospital Laboratory Management (HLM) framework.
              </p>

              {/* Key Bullet Highlights */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 mb-2">
                {[
                  "Turnkey laboratory operations for hospitals & nursing homes",
                  "24×7 onsite emergency testing + central super-speciality reference lab",
                  "NABL quality governance & ISO 15189 compliance readiness",
                  "Doctor-led management by MD Biochemistry Founder",
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/news/qxl-diagnostics-60-hospital-laboratory-partnerships-2028/"
                className="bg-[#0f2d5e] hover:bg-[#1e3a8a] text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Read Full Media Coverage &amp; 8 Outlets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Digital Health News Editorial Feature */}
        <div className="mt-8 bg-gradient-to-br from-white via-sky-50/40 to-white rounded-3xl border border-sky-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mb-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-[#D69A18]">
                  <Calendar className="w-4 h-4" />
                  <time dateTime="2026-09-22">22 September 2026</time>
                </span>
                <span>•</span>
                <span className="text-sky-800 font-extrabold bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Digital Health News (DHN Feature)
                </span>
                <span>•</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-extrabold border border-emerald-200">
                  Editorial Recognition
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] leading-tight mb-4">
                Digital Health News Features QXL Diagnostics&apos; Doctor-Led Quality Governance &amp; HLM Model
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium mb-5">
                Digital Health News (DHN) published an exclusive editorial spotlighting QXL Diagnostics Super Speciality Lab for its technology-assisted laboratory quality systems, NABL accreditation standards, and physician-trusted Hospital Laboratory Management (HLM) framework.
              </p>

              {/* Key Highlights */}
              <div className="bg-white border border-sky-150 rounded-2xl p-4 space-y-2 mb-2 shadow-2xs">
                {[
                  "Doctor-led clinical governance under Founder & Chief Clinical Biochemist Dr. Shantakumar Muruda",
                  "Strict NABL MC-6849 & ISO 15189:2022 medical laboratory compliance",
                  "Turnkey HLM model relieving hospitals of equipment capital burdens",
                  "AI-assisted diagnostic guidance & same-day digital report delivery",
                ].map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <a
                href="https://digitalhealthnews.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0B2545] hover:bg-[#164263] text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Read Digital Health News Feature</span>
                <ExternalLink className="w-4 h-4 text-sky-300" />
              </a>

              <span className="text-xs text-slate-500 font-semibold">
                Healthcare Industry Editorial &amp; Hospital Partnership Mention
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOSPITAL PARTNERSHIPS SECTION BANNER ── */}
      <section className="py-10 max-w-[1240px] mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0B2545] to-[#0f2d5e] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg border border-white/10">
          <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <span className="inline-block bg-[#D69A18] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                FOR HOSPITAL ADMINISTRATORS &amp; DIRECTORS
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                Learn About QXL&apos;s Turnkey Hospital Laboratory Management Model
              </h3>
              <p className="text-sky-100 text-sm leading-relaxed font-medium">
                Operate a financially sustainable hospital laboratory without carrying full equipment &amp; manpower burdens.
              </p>
            </div>
            <div className="md:col-span-4 text-left md:text-right">
              <Link
                href="/hospital-laboratory-management/"
                className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition-all"
              >
                <span>Explore HLM Model</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
