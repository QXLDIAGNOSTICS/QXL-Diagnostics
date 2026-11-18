import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  Activity,
  ArrowRight,
  Stethoscope,
  CheckCircle2,
  Phone,
  ChevronRight,
  HeartPulse,
  Sparkles,
  MapPin,
  Clock,
  Award
} from 'lucide-react';
import MedicalReviewerBadge from '@/components/MedicalReviewerBadge';
import { CONDITIONS_DATA } from '@/lib/conditionsData';
import {
  SITE_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  NABL_CERTIFICATE,
  ISO_STANDARD
} from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Health Conditions & Diagnostic Testing Directory Bangalore | QXL Diagnostics",
  description:
    "Explore comprehensive clinical diagnostic guides for diabetes, thyroid, cardiac risk, PCOS, fatty liver, kidney disease, anaemia, food intolerance, and senior health in Bengaluru. NABL Accredited testing with home collection.",
  alternates: {
    canonical: `${SITE_URL}/conditions`,
  },
  openGraph: {
    title: "Health Conditions & Diagnostic Testing Directory Bangalore | QXL Diagnostics",
    description:
      "Doctor-reviewed clinical diagnostic guides for metabolic, hormonal, cardiovascular, renal, and nutritional health conditions in Bengaluru.",
    url: `${SITE_URL}/conditions`,
    siteName: "QXL Diagnostics",
    locale: "en_IN",
    type: "website",
  },
};

export default function ConditionsDirectoryPage() {
  const conditionsList = Object.values(CONDITIONS_DATA);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/conditions#webpage`,
        "url": `${SITE_URL}/conditions`,
        "name": "Health Conditions & Diagnostic Testing Directory Bangalore",
        "description": "Comprehensive doctor-reviewed clinical diagnostic guides for major health conditions in Bengaluru.",
        "inLanguage": "en-IN",
        "publisher": {
          "@type": "DiagnosticLab",
          "name": "QXL Diagnostics",
          "url": SITE_URL,
          "telephone": PHONE_DISPLAY
        },
        "breadcrumb": { "@id": `${SITE_URL}/conditions#breadcrumbs` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/conditions#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Conditions Directory",
            "item": `${SITE_URL}/conditions`
          }
        ]
      }
    ]
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <Script
        id="conditions-directory-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Strip */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Health Conditions Directory</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0f2d5e] to-[#1e3a8a] text-white py-14 lg:py-18">
        <div className="max-w-[1200px] mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-200 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            15 Doctor-Reviewed Diagnostic Guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Health Conditions &amp; Diagnostic Testing in Bangalore
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-3xl leading-relaxed">
            Evidence-based medical guides covering biological symptoms, underlying causes, pre-test preparation, and recommended laboratory investigations. NABL Accredited laboratory processing ({NABL_CERTIFICATE}, {ISO_STANDARD}) with gentle home blood collection across 61+ Bengaluru localities.
          </p>

          <div className="pt-2">
            <MedicalReviewerBadge />
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-12 max-w-[1200px] mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-[#0f2d5e]">
              Explore Clinical Condition Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select a clinical condition to view symptom checklists, fasting instructions, and doctor-recommended tests.
            </p>
          </div>
          <span className="text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full border border-blue-100 self-start sm:self-auto">
            {conditionsList.length} Comprehensive Profiles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditionsList.map((item) => (
            <div
              key={item.slug}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200/70">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> NABL Verified
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0f2d5e] leading-snug">
                  {item.h1Title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.subtitle}
                </p>

                {/* Symptom Highlights */}
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                    Key Indicators:
                  </span>
                  <ul className="space-y-1">
                    {item.symptoms.slice(0, 3).map((sym, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-600 flex items-start gap-1.5 line-clamp-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 font-semibold">
                  {item.recommendedTests.length} Recommended Tests
                </span>
                <Link
                  href={`/conditions/${item.slug}`}
                  className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Home Collection Trust Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block bg-amber-400 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
                Bengaluru Doorstep Diagnostics
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Accurate Diagnostic Testing, Collected at Your Home
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
                Our trained phlebotomy specialists bring laboratory-grade sterile vacuum tubes directly to your doorstep anywhere in Bengaluru. Dual-barcode identification, cold-chain temperature preservation, and fast digital reporting within 6 to 12 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/home-blood-collection-bangalore"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Book Home Collection
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                <Phone className="w-3.5 h-3.5" /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-blue-800/60 text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>NABL Accredited ({NABL_CERTIFICATE})</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>6–12 Hour Fast Results</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-300 shrink-0" />
              <span>61+ Bengaluru Localities</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Doctor-Reviewed Reports</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
