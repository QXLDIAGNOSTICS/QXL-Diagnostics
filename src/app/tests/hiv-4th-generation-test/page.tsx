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
import HivWindowCalculator from '@/components/sexual-health/HivWindowCalculator';
import PepUrgentBanner from '@/components/sexual-health/PepUrgentBanner';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "HIV 4th Generation Test (p24 Antigen + Antibody) | QXL Diagnostics",
  description:
    "Learn about the 4th Generation HIV test (p24 antigen + HIV 1/2 antibodies). Understand the 18–45 day window period, ECLIA technology, NABL Accredited testing, and same-day reporting in Bengaluru.",
  alternates: {
    canonical: `${SITE_URL}/tests/hiv-4th-generation-test`,
  },
  openGraph: {
    title: "HIV 4th Generation Test (p24 Antigen + Antibody) | QXL Diagnostics",
    description:
      "Advanced 4th Gen HIV ECLIA screening in Bengaluru. Simultaneous p24 antigen and antibody detection. Conclusive from 45 days.",
    url: `${SITE_URL}/tests/hiv-4th-generation-test`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function HivFourthGenTestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": `${SITE_URL}/tests/hiv-4th-generation-test#test`,
        "name": "HIV 4th Generation ECLIA / CLIA Screening Test",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-02",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "4th generation automated chemiluminescent microparticle immunoassay simultaneously detecting HIV-1 p24 capsid antigen and HIV-1/2 antibodies.",
        "usedToDiagnose": [
          { "@type": "MedicalCondition", "name": "Acute and Chronic HIV Infection" }
        ],
        "offers": {
          "@type": "Offer",
          "price": "945",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/tests/hiv-4th-generation-test`
        }
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/hiv-4th-generation-test#webpage`,
        "url": `${SITE_URL}/tests/hiv-4th-generation-test`,
        "name": "HIV 4th Generation Test Explained: p24 Antigen & Window Period",
        "description": "Scientific overview of 4th generation HIV testing, comparison with 3rd generation and RNA NAT assays, and clinical accuracy standards.",
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
          { "@type": "ListItem", "position": 3, "name": "HIV 4th Generation Test", "item": `${SITE_URL}/tests/hiv-4th-generation-test` }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: "What makes the 4th generation HIV test superior to older tests?",
      a: "Older 2nd and 3rd generation tests only detected antibodies created by the immune system, which takes between 3 to 12 weeks to appear. The 4th generation test adds the detection of the HIV p24 antigen—a structural viral protein that appears in high numbers within 2 to 3 weeks of infection. This shortens the diagnostic window period dramatically."
    },
    {
      q: "Can the p24 antigen disappear after a few weeks?",
      a: "Yes. In early infection, p24 antigen rises sharply. As the body mounts an immune response and produces antibodies, those antibodies bind to the p24 antigen, forming immune complexes that can lower free p24 levels. However, because the 4th generation test detects BOTH p24 antigen and antibodies, the test remains highly positive once antibody levels take over."
    },
    {
      q: "Is a 4th generation test at 45 days 100% conclusive?",
      a: "Per CDC guidelines, a laboratory 4th generation test conducted on blood drawn from a vein is over 99% conclusive at 45 days post-exposure. In clinical practice, guidelines recommend an optional final follow-up test at 90 days for complete definitive peace of mind or in patients with underlying autoimmune conditions."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="hiv-4th-gen-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">HIV 4th Generation Test</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Diagnostic Microbiology Standard
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              HIV 4th Generation Test: p24 Antigen &amp; Antibody Combo
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Simultaneous detection of viral p24 protein and HIV-1/2 antibodies via automated chemiluminescence. The CDC and NACO recommended standard for early, highly specific diagnosis.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/book"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Book 4th Gen Test (₹945)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
        <PepUrgentBanner />

        {/* Technical Comparison Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Assay Generation Comparison</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              How 4th Generation Testing Compares to 3rd Gen &amp; RNA NAT
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-2xl overflow-hidden">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Assay Type</th>
                  <th className="p-4">What It Detects</th>
                  <th className="p-4">Window Period (CDC)</th>
                  <th className="p-4">Primary Clinical Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="bg-blue-50/60 font-semibold">
                  <td className="p-4 text-[#0f2d5e] font-black">4th Gen Lab Combo (QXL Standard)</td>
                  <td className="p-4">HIV-1 p24 antigen + HIV-1/2 antibodies</td>
                  <td className="p-4 font-bold text-[#2563eb]">18–45 Days (99% at Day 45)</td>
                  <td className="p-4">First-line international standard for all diagnostic screenings.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">HIV-1 RNA PCR (NAT)</td>
                  <td className="p-4">Viral genomic RNA</td>
                  <td className="p-4">10–33 Days</td>
                  <td className="p-4">Acute retroviral syndrome diagnosis &amp; viral load monitoring.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">3rd Generation ELISA / Rapid</td>
                  <td className="p-4">HIV-1 &amp; HIV-2 antibodies only</td>
                  <td className="p-4">23–90 Days</td>
                  <td className="p-4">Older screening format; misses early infections before antibody rise.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Interactive Calculator Embed */}
        <section>
          <HivWindowCalculator />
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
            Clinical Insights &amp; FAQs
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
        <SexualHealthNav currentPath="/tests/hiv-4th-generation-test" />
      </main>
    </div>
  );
}

