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
  title: "Chlamydia & Gonorrhea PCR Test in Bangalore | Urine NAAT | QXL Diagnostics",
  description:
    "Real-time PCR (NAAT) urine testing for Chlamydia trachomatis & Neisseria gonorrhoeae in Bengaluru. Accurate diagnosis for burning urination and discharge. Confidential home collection.",
  alternates: {
    canonical: `${SITE_URL}/tests/chlamydia-gonorrhea-pcr`,
  },
  openGraph: {
    title: "Chlamydia & Gonorrhea PCR Test in Bangalore | QXL Diagnostics",
    description:
      "Gold standard molecular NAAT PCR for Chlamydia and Gonorrhea detection from first-catch urine or swab in Bengaluru.",
    url: `${SITE_URL}/tests/chlamydia-gonorrhea-pcr`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function ChlamydiaGonorrheaPcrPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": `${SITE_URL}/tests/chlamydia-gonorrhea-pcr#test`,
        "name": "Chlamydia trachomatis & Neisseria gonorrhoeae DNA by Real-Time PCR (NAAT)",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-04",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Qualitative in vitro molecular nucleic acid amplification test (NAAT) for the direct detection of C. trachomatis and N. gonorrhoeae bacterial DNA.",
        "usedToDiagnose": [
          { "@type": "MedicalCondition", "name": "Chlamydial Urogenital Infection" },
          { "@type": "MedicalCondition", "name": "Gonococcal Urethritis and Cervicitis" }
        ],
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "2200",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/tests/chlamydia-gonorrhea-pcr`
        }
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/chlamydia-gonorrhea-pcr#webpage`,
        "url": `${SITE_URL}/tests/chlamydia-gonorrhea-pcr`,
        "name": "Burning Urination & Chlamydia / Gonorrhea PCR Testing in Bangalore",
        "description": "Comprehensive patient and clinical guide on molecular testing for urethral discharge, dysuria, first-catch urine instructions, and extragenital site requirements.",
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
          { "@type": "ListItem", "position": 3, "name": "Chlamydia & Gonorrhea PCR", "item": `${SITE_URL}/tests/chlamydia-gonorrhea-pcr` }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: "Why is a PCR (NAAT) test preferred over bacterial culture or urine routine for Chlamydia and Gonorrhea?",
      a: "Nucleic Acid Amplification Tests (NAAT / PCR) are recognized by the CDC and Koneman's Textbook of Diagnostic Microbiology (Ch. 11) as the gold standard. Chlamydia trachomatis is an obligate intracellular bacterium that does not grow on standard culture media. A routine urine analysis only shows non-specific pus cells, while PCR directly amplifies and detects the bacterial DNA with >98% sensitivity."
    },
    {
      q: "How should I collect the first-catch urine sample?",
      a: "Do not urinate for at least 1 to 2 hours before sample collection. When providing the sample, collect the very first 20 to 30 mL of urine that exits into the sterile container. Do NOT clean with antiseptic wipes beforehand, and do NOT provide a midstream sample, as the goal is to wash the infected urethral cells into the cup."
    },
    {
      q: "Can this urine test detect Chlamydia or Gonorrhea in my throat or rectum?",
      a: "No. A urine test ONLY evaluates the urinary tract. If you engaged in oral or receptive anal intimacy, pharyngeal or rectal infections will be completely missed by a urine test. Per CDC guidelines, site-specific throat or rectal swabs are required for extragenital exposure."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="chlamydia-gonorrhea-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Chlamydia &amp; Gonorrhea PCR</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Molecular NAAT Diagnostic Standard
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Chlamydia &amp; Gonorrhea PCR Test in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Gold-standard Real-Time PCR (NAAT) from non-invasive first-catch urine or swab. Precise pathogen differentiation for burning urination, urethral discharge, or pelvic discomfort.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to book a Chlamydia & Gonorrhea Urine PCR test.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire &amp; Book Urine PCR</span>
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
        {/* Extragenital Clinical Warning */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3.5 text-xs sm:text-sm text-amber-950 leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Important Clinical Exposure Rule:</strong> If your potential exposure involved oral sex or receptive anal sex, a urine PCR test will NOT detect throat or rectal colonization.
            <Link href="/health-hub/sti-testing-after-oral-sex" className="text-[#2563eb] font-bold underline ml-1 hover:text-blue-800">
              Read about site-specific throat and rectal STI testing here &rarr;
            </Link>
          </div>
        </div>

        {/* Symptoms and Biology */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6 text-slate-700 text-sm leading-relaxed">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e] mb-3">
                Symptoms of Chlamydia and Gonorrhea Infection
              </h2>
              <p>
                Both <em>Chlamydia trachomatis</em> and <em>Neisseria gonorrhoeae</em> cause acute inflammation of the mucous membranes of the genitourinary tract. While up to 70% of female infections and 50% of male infections may remain asymptomatic, common symptoms include:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1.5 text-xs sm:text-sm">
                <li>Burning sensation or sharp pain during urination (dysuria)</li>
                <li>Clear, white, yellow, or purulent discharge from the penis or vagina</li>
                <li>Testicular or epididymal tenderness/swelling in men</li>
                <li>Abnormal post-coital bleeding or pelvic discomfort in women</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0c4a6e] mb-2">
                Why Non-Invasive First-Catch Urine is Preferred
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                In past decades, painful urethral swabs were required for men. Today, modern molecular real-time PCR (NAAT) provides equivalent or superior analytical sensitivity using a simple, pain-free first-void urine specimen collected in privacy.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700">
              <span className="text-[11px] font-black uppercase text-[#2563eb] tracking-wider block">Specimen Requirements</span>
              <p><strong>Sample Type:</strong> First-catch urine (20–30 mL)</p>
              <p><strong>Preparation:</strong> Hold urine for minimum 1–2 hours</p>
              <p><strong>Turnaround Time:</strong> 24 to 48 Hours</p>
              <p><strong>Collection:</strong> Home collection kit or walk-in lab</p>
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
        <SexualHealthNav currentPath="/tests/chlamydia-gonorrhea-pcr" />
      </main>
    </div>
  );
}

