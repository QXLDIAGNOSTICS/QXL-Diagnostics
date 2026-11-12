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
  Award,
  ArrowRight
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "Syphilis Test in Bangalore | TPHA & RPR Dual Serology | QXL Diagnostics",
  description:
    "Confidential syphilis blood testing in Bengaluru. Treponemal TPHA confirmation and non-treponemal RPR titers. Accurate differentiation of active vs treated infection. NABL Accredited laboratory.",
  alternates: {
    canonical: `${SITE_URL}/tests/syphilis-test`,
  },
  openGraph: {
    title: "Syphilis Test in Bangalore | TPHA & RPR Dual Serology | QXL Diagnostics",
    description:
      "Dual-algorithm syphilis testing combining quantitative RPR titers with TPHA treponemal confirmation in Bengaluru.",
    url: `${SITE_URL}/tests/syphilis-test`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function SyphilisTestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": `${SITE_URL}/tests/syphilis-test#test`,
        "name": "Syphilis Dual Serology Profile (Treponemal TPHA + Quantitative RPR)",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-03",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Comprehensive serologic evaluation for Treponema pallidum infection following CDC diagnostic algorithm guidelines.",
        "usedToDiagnose": [
          { "@type": "MedicalCondition", "name": "Syphilis (Treponema pallidum infection)" }
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/syphilis-test#webpage`,
        "url": `${SITE_URL}/tests/syphilis-test`,
        "name": "Syphilis Testing in Bangalore: TPHA, RPR & Traditional vs Reverse Algorithms",
        "description": "Clinical overview of syphilis serology, staging, biological false positives, and treatment response monitoring.",
        "publisher": {
          "@type": "DiagnosticLab",
          "name": "QXL Diagnostics",
          "url": SITE_URL
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Sexual Health Hub", "item": `${SITE_URL}/sexual-health` },
          { "@type": "ListItem", "position": 3, "name": "Syphilis Test", "item": `${SITE_URL}/tests/syphilis-test` }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: "Why is one test not enough to diagnose syphilis?",
      a: "No single serological test can reliably diagnose syphilis on its own. Non-treponemal tests (RPR/VDRL) can be falsely positive due to viral infections, lupus, pregnancy, or malaria. Treponemal tests (TPHA/TPPA) remain reactive for life even after a patient is completely cured. Therefore, CDC guidelines require BOTH tests together to differentiate active syphilis from a biological false positive or past successfully treated infection."
    },
    {
      q: "What is the difference between active syphilis and past treated syphilis?",
      a: "In past treated syphilis, the treponemal test (TPHA) remains positive forever, but the non-treponemal test (RPR) becomes negative or drops to a stable low 'serofast' titer (e.g. 1:1 or 1:2). In active syphilis, both TPHA and RPR are reactive, and the RPR titer is typically significantly higher (e.g. 1:16, 1:32, 1:64) or rising."
    },
    {
      q: "How soon after a chancre appears can syphilis be detected by blood test?",
      a: "Antibodies typically take 1 to 3 weeks after the appearance of the primary chancre (around 3 to 6 weeks after sexual exposure) to reach detectable levels in blood. If you have an active sore, darkfield microscopy or lesion PCR provides the earliest direct detection before blood antibodies form."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="syphilis-test-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Syphilis Test (TPHA &amp; RPR)</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Treponemal &amp; Non-Treponemal Protocol
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Syphilis Testing in Bengaluru: TPHA &amp; Quantitative RPR
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Comprehensive two-tier syphilis serology following CDC and Koneman diagnostic microbiology guidelines. Accurate distinction between active infection and past resolved illness.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to book a Syphilis Dual Serology test (TPHA + RPR).")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire &amp; Book Syphilis Screen</span>
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="bg-white/10 hover:bg-white/20 text-white font-bold border border-white/30 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Diagnostic Framework */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Algorithmic Diagnosis</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Traditional vs Reverse Syphilis Screening Algorithms
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Per the CDC STI Treatment Guidelines and Koneman Chapter 20, diagnostic laboratories employ two main serologic pathways to ensure clinical precision:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-base font-black text-[#0c4a6e]">1. Traditional Algorithm</h3>
              <p className="leading-relaxed text-slate-600">
                Begins with a quantitative non-treponemal screening test (RPR or VDRL). If reactive, the laboratory automatically reflexes to a specific treponemal confirmation test (TPHA or TPPA).
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                <strong>Best For:</strong> Patients with symptomatic ulcers, suspected acute active reinfection, or routine checkups in general diagnostic practice.
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-base font-black text-[#0c4a6e]">2. Reverse Sequence Algorithm</h3>
              <p className="leading-relaxed text-slate-600">
                Begins with an automated treponemal immunoassay (EIA/CLIA). If reactive, the laboratory reflexes to a quantitative RPR to assess current disease activity and establish baseline titers.
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                <strong>Best For:</strong> High-throughput reference laboratory screening and detecting very early primary or late latent syphilis where non-treponemal tests may be negative.
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-black text-[#0c4a6e]">{f.q}</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/tests/syphilis-test" />
      </main>
    </div>
  );
}

