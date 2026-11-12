import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  Lock,
  Clock,
  FlaskConical,
  Phone,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Award,
  Stethoscope,
  MapPin,
  Calendar
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import { QXL_STI_PACKAGES, CLINICAL_PATHWAYS, SEXUAL_HEALTH_FAQ } from '@/lib/sexualHealthData';
import HivWindowCalculator from '@/components/sexual-health/HivWindowCalculator';
import PepUrgentBanner from '@/components/sexual-health/PepUrgentBanner';
import StiPackageCard from '@/components/sexual-health/StiPackageCard';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "Confidential STD & HIV Testing in Bengaluru | Doctor-Led STI Clinic | QXL Diagnostics",
  description:
    "Confidential, doctor-led STD & STI testing in Bengaluru. NABL Accredited 4th Gen HIV Duo, Syphilis RPR/TPHA, Chlamydia & Gonorrhea PCR, and complete STI screening packages with discrete home collection.",
  alternates: {
    canonical: `${SITE_URL}/sexual-health`,
  },
  openGraph: {
    title: "Confidential STD & HIV Testing in Bengaluru | QXL Diagnostics",
    description:
      "Advanced molecular PCR and 4th Gen serology for HIV, Syphilis, Chlamydia, Gonorrhea, and complete STI panels. Discrete home collection across Bengaluru.",
    url: `${SITE_URL}/sexual-health`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function SexualHealthHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/sexual-health#webpage`,
        "url": `${SITE_URL}/sexual-health`,
        "name": "Confidential STD & HIV Testing Hub Bengaluru",
        "description": "Comprehensive guide and diagnostic booking for sexually transmitted infections (STIs), HIV 4th generation testing, and molecular PCR in Bengaluru.",
        "publisher": {
          "@type": "DiagnosticLab",
          "name": "QXL Diagnostics",
          "url": SITE_URL,
          "telephone": PHONE_DISPLAY
        },
        "about": [
          { "@type": "MedicalCondition", "name": "Sexually Transmitted Infection" },
          { "@type": "MedicalCondition", "name": "HIV" },
          { "@type": "MedicalCondition", "name": "Syphilis" },
          { "@type": "MedicalCondition", "name": "Chlamydia" },
          { "@type": "MedicalCondition", "name": "Gonorrhea" }
        ],
        "specialty": "InfectiousDisease"
      },
      {
        "@type": "BreadcrumbList",
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
            "name": "Sexual Health Hub",
            "item": `${SITE_URL}/sexual-health`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": SEXUAL_HEALTH_FAQ.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="sexual-health-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Strip */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/specialities" className="hover:text-[#2563eb]">Specialities</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Sexual Health &amp; STI Diagnostics</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#2563eb]/30 border border-sky-400/40 text-sky-200 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#f59e0b]" /> Confidential Diagnostic Hub • Bengaluru
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Confidential STD, STI &amp; HIV Testing in Bengaluru
            </h1>

            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Doctor-led guidance, gold-standard molecular PCR, and 4th Generation HIV ECLIA testing. Discrete doorstep collection by trained phlebotomy specialists or in-clinic testing with guaranteed privacy.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#packages"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                View 10 STI Diagnostic Packages
              </a>
              <a
                href="#calculator"
                className="bg-white/10 hover:bg-white/20 text-white font-bold border border-white/30 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                HIV Window Period Calculator
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <Phone className="w-3.5 h-3.5" /> Call {PHONE_DISPLAY}
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-sky-800/60 text-xs">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>100% Confidential &amp; Barcoded</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-300 shrink-0" />
                <span>NABL Accredited ({NABL_CERTIFICATE})</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-Day &amp; 24h Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Doctor-Reviewed Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-16">
        {/* 1. Emergency PEP Alert */}
        <PepUrgentBanner />

        {/* 2. Window Period Calculator */}
        <section id="calculator" className="scroll-mt-24">
          <HivWindowCalculator />
        </section>

        {/* 3. Diagnostic Packages Grid */}
        <section id="packages" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">
              Evidence-Based Diagnostic Profiles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0c4a6e] tracking-tight">
              10 Structured Sexual Health &amp; STI Packages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Designed to cover specific exposure timelines, anatomical infection sites, and symptomatic presentations. Each investigation connects to QXL&apos;s verified laboratory test master.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QXL_STI_PACKAGES.map((pkg, idx) => (
              <StiPackageCard key={pkg.code} pkg={pkg} highlight={idx === 0} />
            ))}
          </div>
        </section>

        {/* 4. Clinician-Directed Pathways */}
        <section className="space-y-8 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">
              Specialist Clinical Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Clinician-Directed Testing Pathways
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Certain clinical situations require specialized physician evaluation rather than commercial self-order packages. QXL provides dedicated testing algorithms for acute viral exposures and post-exposure prophylaxis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLINICAL_PATHWAYS.map((p) => (
              <div key={p.id} className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-900 border border-rose-200">
                    {p.urgency}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Physician Directed</span>
                </div>

                <h3 className="text-xl font-black text-[#0f2d5e] leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.summary}
                </p>

                <div className="space-y-1.5 pt-2">
                  <strong className="text-xs text-slate-900 uppercase tracking-wider block">
                    Diagnostic Protocol Steps:
                  </strong>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {p.clinicalSteps.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Guideline Framework:</span>
                  <span className="text-xs font-semibold text-slate-700">{p.guidelineReference}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Clinical Specimen Guide */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">
              Microbiology &amp; Specimen Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Why Different STIs Require Different Specimen Types
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Based on Koneman&apos;s Color Atlas and Textbook of Diagnostic Microbiology (7th Edition, Chapter 2) and CDC STI treatment guidelines, no single biological sample can detect every sexually transmitted organism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold text-sm">
                🩸
              </div>
              <h3 className="text-base font-black text-slate-900">Blood Draw (Venous Serum)</h3>
              <p className="leading-relaxed text-slate-600">
                Required for blood-borne and systemic infections: <strong>HIV-1/2 (p24 antigen and antibodies), Syphilis (RPR/VDRL &amp; TPHA), Hepatitis B (HBsAg), and Hepatitis C (Anti-HCV)</strong>. Blood serology does not detect localized urethral chlamydia or gonorrhea.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                🧪
              </div>
              <h3 className="text-base font-black text-slate-900">First-Catch Urine (NAAT / PCR)</h3>
              <p className="leading-relaxed text-slate-600">
                Required for <strong>Chlamydia trachomatis, Neisseria gonorrhoeae, and Trichomonas vaginalis</strong> urethral infection. Must be first-void urine (first 20–30 mL) after holding urine for 1–2 hours. Urine cannot detect throat or rectal colonization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm">
                🔬
              </div>
              <h3 className="text-base font-black text-slate-900">Anatomical Swabs (Lesion / Mucosa)</h3>
              <p className="leading-relaxed text-slate-600">
                Mandatory for <strong>Genital Herpes (HSV-1/2 PCR from active sores), pharyngeal swabs (after oral sex), and rectal swabs (after anal sex)</strong>. Collected with sterile Dacron/flocked swabs in viral transport medium.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQs */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-black text-[#0c4a6e]">
              Confidentiality, Test Timing &amp; Clinical Procedures
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {SEXUAL_HEALTH_FAQ.map((faq, fIdx) => (
              <div key={fIdx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-black text-[#0c4a6e] flex items-start gap-2.5">
                  <span className="text-[#2563eb] shrink-0 font-extrabold">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Medical Review Notice */}
        <MedicalReviewNotice />

        {/* 8. Comprehensive Cross-Navigation */}
        <SexualHealthNav currentPath="/sexual-health" />
      </main>
    </div>
  );
}

