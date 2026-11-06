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
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "Genital Herpes Test in Bangalore | HSV-1 & HSV-2 PCR & IgG | QXL Diagnostics",
  description:
    "Confidential genital herpes testing in Bengaluru. Real-time PCR lesion swab testing and type-specific IgG serology for HSV-1 & HSV-2. NABL Accredited laboratory with discrete reporting.",
  alternates: {
    canonical: `${SITE_URL}/tests/hsv-herpes-test`,
  },
  openGraph: {
    title: "Genital Herpes Test in Bangalore | HSV-1 & HSV-2 PCR | QXL Diagnostics",
    description:
      "Direct viral detection via PCR lesion swab and type-specific IgG serology for Herpes Simplex Virus in Bengaluru.",
    url: `${SITE_URL}/tests/hsv-herpes-test`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function HsvHerpesTestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": `${SITE_URL}/tests/hsv-herpes-test#test`,
        "name": "Herpes Simplex Virus (HSV-1 & HSV-2) DNA by Real-Time PCR",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-09",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Qualitative molecular detection and typing of Herpes Simplex Virus Type 1 and Type 2 DNA directly from mucosal or lesion exudate swabs.",
        "usedToDiagnose": [
          { "@type": "MedicalCondition", "name": "Genital Herpes" },
          { "@type": "MedicalCondition", "name": "Herpes Labialis (Cold Sores)" }
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/hsv-herpes-test#webpage`,
        "url": `${SITE_URL}/tests/hsv-herpes-test`,
        "name": "Genital Herpes Testing in Bangalore: HSV PCR vs Type-Specific IgG Serology",
        "description": "Clinical overview of herpes testing methods, why routine IgM testing is discouraged by CDC, and differentiating herpes from syphilitic chancres.",
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
          { "@type": "ListItem", "position": 3, "name": "Genital Herpes Test", "item": `${SITE_URL}/tests/hsv-herpes-test` }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: "What is the most accurate test for genital herpes?",
      a: "Direct lesion PCR (swab of an active blister or ulcer) is the gold standard recommended by the CDC. PCR amplifies the viral DNA directly from the lesion fluid and can distinguish whether the sore is caused by HSV-1 or HSV-2 with >99% specificity. If no active sores are present, type-specific IgG blood serology can determine past exposure."
    },
    {
      q: "Why do CDC guidelines advise against routine HSV IgM testing?",
      a: "Routine HSV IgM testing is discouraged because IgM assays cannot accurately distinguish between HSV-1 and HSV-2, frequently produce false positives, and can remain elevated during recurrent outbreaks or primary infections. Type-specific glycoprotein G-based IgG assays or lesion PCR are the only medically validated diagnostic choices."
    },
    {
      q: "What is the difference between HSV-1 and HSV-2?",
      a: "Traditionally, HSV-1 primarily causes oral herpes (cold sores), while HSV-2 primarily causes genital herpes. However, due to oral-genital contact, an increasing proportion of first-episode genital herpes is now caused by HSV-1. Genital HSV-1 typically has significantly lower recurrence rates than genital HSV-2, making type differentiation clinically valuable."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="hsv-herpes-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Genital Herpes Test (HSV PCR)</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Molecular Virology &amp; Serology
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Genital Herpes Testing in Bengaluru (HSV-1 &amp; HSV-2)
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Definitive direct viral detection via Real-Time PCR lesion swab or type-specific IgG serology. Discrete clinical assessment and doctor-reviewed reporting.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to book an HSV Genital Herpes PCR / Serology test.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire &amp; Book Herpes Test</span>
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
        {/* Clinical Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6 text-slate-700 text-sm leading-relaxed">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e] mb-3">
                Diagnostic Pathways for Genital Herpes
              </h2>
              <p>
                In accordance with the CDC STI Treatment Guidelines and <em>Koneman&apos;s Textbook of Diagnostic Microbiology</em>, diagnosing herpes simplex depends heavily on whether active physical lesions are present:
              </p>
              <div className="mt-4 space-y-3 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-extrabold text-slate-900">1. Active Lesion Swab: Real-Time PCR (Preferred)</h3>
                  <p className="text-slate-600 mt-1">
                    When blisters, painful fluid-filled vesicles, or open ulcers are present, a swab sample should be collected directly from the lesion base. PCR has 3- to 5-fold higher analytical sensitivity than traditional viral cell culture and provides same-day to 48-hour differentiation between HSV-1 and HSV-2.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-extrabold text-slate-900">2. Blood Draw: Type-Specific Glycoprotein G IgG Serology</h3>
                  <p className="text-slate-600 mt-1">
                    When no active lesions are present, an antibody blood test can determine whether a patient has established antibodies to HSV-1 or HSV-2. It takes 6 to 12 weeks after initial exposure for IgG antibodies to reach detectable levels.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <strong>Clinical Advisory on HSV IgM:</strong> QXL Diagnostics adheres to international medical consensus discouraging routine asymptomatic HSV IgM screening due to cross-reactivity and unreliable clinical interpretation.
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700">
              <span className="text-[11px] font-black uppercase text-[#2563eb] tracking-wider block">Specimen Requirements</span>
              <p><strong>Active Sores:</strong> Sterile Dacron swab in viral transport medium (VTM)</p>
              <p><strong>Past Exposure Screen:</strong> 3 mL Venous Blood (Serum)</p>
              <p><strong>Fasting:</strong> No Fasting Required</p>
              <p><strong>Turnaround Time:</strong> 24 to 48 Hours</p>
              <div className="pt-2">
                <Link
                  href="/health-hub/genital-sores-causes"
                  className="text-xs font-black text-[#2563eb] hover:underline flex items-center gap-1"
                >
                  <span>Differentiating Herpes from Syphilis &rarr;</span>
                </Link>
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
        <SexualHealthNav currentPath="/tests/hsv-herpes-test" />
      </main>
    </div>
  );
}

