import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import HivWindowCalculator from '@/components/sexual-health/HivWindowCalculator';
import PepUrgentBanner from '@/components/sexual-health/PepUrgentBanner';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "HIV Test Window Period Guide: 14, 28, 45 & 90 Days Explained | QXL Diagnostics",
  description:
    "Complete clinical guide to HIV test window periods. Understand testing accuracy after 14, 28, 45, and 90 days. Interactive calculator, CDC guidelines, 4th Gen Duo accuracy, and emergency PEP advice.",
  alternates: {
    canonical: `${SITE_URL}/health-hub/hiv-test-window-period`,
  },
  openGraph: {
    title: "HIV Test Window Period: 14, 28, 45 & 90 Days Explained | QXL Diagnostics",
    description:
      "When is an HIV test conclusive? Explore the CDC window period milestones with our interactive testing calculator.",
    url: `${SITE_URL}/health-hub/hiv-test-window-period`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function HivTestWindowPeriodGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/health-hub/hiv-test-window-period#webpage`,
        "url": `${SITE_URL}/health-hub/hiv-test-window-period`,
        "name": "HIV Test Window Period Guide: 14, 28, 45 & 90 Days",
        "description": "Evidence-based educational overview of HIV diagnostic window periods, assay generations, and CDC conclusiveness milestones.",
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
          { "@type": "ListItem", "position": 3, "name": "HIV Test Window Period Guide", "item": `${SITE_URL}/health-hub/hiv-test-window-period` }
        ]
      }
    ]
  };

  const milestones = [
    {
      period: "Within 72 Hours (Days 0–3)",
      title: "Emergency Post-Exposure Prophylaxis (PEP) Window",
      accuracy: "Too early for diagnostic detection",
      details: "If unbarriered sexual contact or a condom tear occurred within the last 72 hours, do not wait for lab test results. Consult an emergency physician immediately to evaluate starting a 28-day antiretroviral PEP regimen, which is most effective when started within 24 hours.",
      action: "Emergency Physician & Baseline Lab Testing",
      badgeColor: "bg-rose-600 text-white"
    },
    {
      period: "Day 10 to 14",
      title: "Earliest Detection with HIV-1 RNA PCR (NAT)",
      accuracy: "High analytical viral RNA sensitivity",
      details: "Nucleic Acid Tests (NAT) directly amplify viral genetic material in plasma. While not routinely used for primary screening due to cost, RNA PCR can detect viral replication earlier than any serologic test.",
      action: "Specialist-directed Acute Retroviral Syndrome Evaluation",
      badgeColor: "bg-sky-600 text-white"
    },
    {
      period: "Day 18 to 28 (2 to 4 Weeks)",
      title: "4th Generation p24 Antigen Peak",
      accuracy: "95%–98% Detection Rate",
      details: "During this window, the viral capsid protein p24 reaches its peak concentration in the blood before host antibodies are fully formed. A 4th Generation lab test (ECLIA) conducted at 28 days provides strong reassurance.",
      action: "4th Gen Lab Test (p24 Ag + Ab Duo) [₹945]",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      period: "Day 45 (6 Weeks)",
      title: "CDC 99% Conclusive Milestone for 4th Generation Lab Assays",
      accuracy: ">99% Conclusive per CDC Guidelines",
      details: "The US Centers for Disease Control and Prevention (CDC) guidelines state that a 4th generation antigen/antibody combo test conducted on a blood sample drawn from a vein is over 99% conclusive at 45 days. 99% of infected individuals will test positive by this milestone.",
      action: "Conclusive Milestone Testing",
      badgeColor: "bg-emerald-600 text-white"
    },
    {
      period: "Day 90 (3 Months)",
      title: "100% Definitive Global Window Milestone",
      accuracy: "100% Definitive Across All Approved Assays",
      details: "At 90 days, all antibody-based screening tests (including 3rd generation ELISA, rapid fingerstick tests, and 4th generation combo tests) have reached the definitive clinical window. A negative result at 90 days is considered 100% conclusive by CDC, WHO, and NACO.",
      action: "Definitive Final Baseline Peace of Mind",
      badgeColor: "bg-emerald-700 text-white"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="hiv-window-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">HIV Test Window Period Guide</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Patient Education &amp; Timeline Calculator
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              HIV Test Window Periods: 14, 28, 45 &amp; 90 Days Explained
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Understand the science behind diagnostic window periods, how p24 antigen testing shortens detection times, and when your HIV test results become medically conclusive.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        <PepUrgentBanner />

        {/* Embedded Interactive Calculator */}
        <section>
          <HivWindowCalculator />
        </section>

        {/* Chronological Milestone Cards */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">CDC Testing Timeline</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Detailed Breakdown of Testing Milestones Following Exposure
            </h2>
          </div>

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${m.badgeColor}`}>
                    {m.period}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Accuracy: {m.accuracy}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0c4a6e]">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {m.details}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                  <span className="font-bold text-slate-600">Recommended Action:</span>
                  <span className="font-black text-[#2563eb]">{m.action}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/health-hub/hiv-test-window-period" />
      </main>
    </div>
  );
}

