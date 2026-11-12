import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "Genital Sores & Ulcers Causes: Syphilis vs Herpes Differential | QXL Diagnostics",
  description:
    "Clinical guide to genital ulcers and sores. Learn the medical differences between a painless syphilis chancre and painful herpes blisters, diagnostic swab PCR, blood serology, and treatment.",
  alternates: {
    canonical: `${SITE_URL}/health-hub/genital-sores-causes`,
  },
  openGraph: {
    title: "Genital Sores Causes: Syphilis vs Herpes Differential | QXL Diagnostics",
    description:
      "Clinical differential between painless syphilitic chancre and painful genital herpes blisters based on CDC guidelines.",
    url: `${SITE_URL}/health-hub/genital-sores-causes`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function GenitalSoresCausesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/health-hub/genital-sores-causes#webpage`,
        "url": `${SITE_URL}/health-hub/genital-sores-causes`,
        "name": "Genital Ulcer Etiology: Syphilis versus Herpes Simplex Differential Guide",
        "description": "Comprehensive microbiology review of genital ulcer disease, physical characteristics, diagnostic algorithms, and swab vs serology requirements.",
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
          { "@type": "ListItem", "position": 3, "name": "Genital Sores & Ulcers Differential", "item": `${SITE_URL}/health-hub/genital-sores-causes` }
        ]
      }
    ]
  };

  const comparisons = [
    {
      feature: "Typical Pain Level",
      syphilis: "Painless (often unnoticed, particularly inside vagina or rectum)",
      herpes: "Highly painful, tender, burning or tingling sensation",
      chancroid: "Severely painful, tender to touch"
    },
    {
      feature: "Number of Lesions",
      syphilis: "Usually single (solitary primary chancre)",
      herpes: "Multiple, clustered vesicles that rupture into shallow ulcers",
      chancroid: "Single or multiple, autoinoculable"
    },
    {
      feature: "Border & Margins",
      syphilis: "Clean, sharply demarcated, indurated (firm/hard button-like border)",
      herpes: "Erythematous (red) base with non-indurated ragged border",
      chancroid: "Ragged, undermined edges with purulent discharge"
    },
    {
      feature: "Base of Ulcer",
      syphilis: "Clean, smooth, non-purulent exudate",
      herpes: "Shallow, grey-white membrane turning to crusted scabs",
      chancroid: "Necrotic, purulent, bleeds easily when scraped"
    },
    {
      feature: "Lymph Node Response",
      syphilis: "Bilateral, painless, firm, non-suppurative lymphadenopathy",
      herpes: "Bilateral, tender, painful inguinal lymphadenopathy",
      chancroid: "Unilateral, intensely painful, fluctuant buboes (pus-filled)"
    },
    {
      feature: "Gold Standard Test",
      syphilis: "Quantitative RPR/VDRL + TPHA confirmation / Treponema PCR",
      herpes: "Lesion swab Real-Time PCR (HSV-1 & HSV-2 DNA typing)",
      chancroid: "PCR / Special culture for Haemophilus ducreyi"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="genital-sores-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Genital Sores Differential</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Clinical Differential Microbiology
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Painless vs Painful Genital Sores: Syphilis vs Herpes
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Based on Koneman&apos;s Diagnostic Microbiology (Chapters 2 &amp; 20) and CDC STI Guidelines, discover how clinical appearance and laboratory diagnostics differentiate genital ulcers.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Differential Comparison Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Comparative Medical Matrix</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Diagnostic Differentiation of Common Genital Ulcers
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Clinical Feature</th>
                  <th className="p-4 bg-blue-900/50">Primary Syphilis (Chancre)</th>
                  <th className="p-4 bg-sky-950/60">Genital Herpes (HSV-1/2)</th>
                  <th className="p-4">Chancroid (H. ducreyi)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {comparisons.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-4 font-bold text-slate-900">{c.feature}</td>
                    <td className="p-4 font-semibold text-[#0c4a6e] bg-blue-50/30">{c.syphilis}</td>
                    <td className="p-4 font-semibold text-slate-800 bg-sky-50/20">{c.herpes}</td>
                    <td className="p-4 text-slate-600">{c.chancroid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Diagnostic Action Plan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-700">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-[#0c4a6e] flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-[#2563eb]" />
              Recommended Laboratory Testing for Genital Sores
            </h3>
            <p className="leading-relaxed text-slate-600">
              Never guess based on visual appearance alone. Clinical studies demonstrate that atypical presentations occur in over 30% of cases. The definitive evaluation consists of:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Direct Swab PCR:</strong> Real-time PCR for HSV-1 and HSV-2 DNA from lesion exudate.</li>
              <li><strong>Serological Syphilis Panel:</strong> Quantitative RPR/VDRL titer with reflexive TPHA confirmation.</li>
              <li><strong>Blood Screen for Co-infections:</strong> 4th Generation HIV Duo and Hepatitis B/C screening.</li>
            </ul>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
            <h3 className="text-lg font-black text-amber-950 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Critical Medical Advice Before Testing
            </h3>
            <p className="leading-relaxed text-amber-900">
              <strong>Do not apply topical steroid creams, antibiotic ointments, or disinfectants to the sore before clinical evaluation.</strong>
            </p>
            <p className="leading-relaxed text-amber-900">
              Applying over-the-counter creams alters the ulcer morphology, destroys viable surface viral or bacterial DNA needed for PCR amplification, and delays appropriate targeted antibiotic or antiviral therapy.
            </p>
          </div>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/health-hub/genital-sores-causes" />
      </main>
    </div>
  );
}

