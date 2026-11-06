import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  Phone,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Lock,
  Stethoscope
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import PepUrgentBanner from '@/components/sexual-health/PepUrgentBanner';
import HivWindowCalculator from '@/components/sexual-health/HivWindowCalculator';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "What to Do After Unprotected Sex: PEP Window & STI Testing Timeline | QXL Diagnostics",
  description:
    "Emergency clinical action plan after unprotected sex or a broken condom. Understand the 72-hour PEP window, baseline blood testing, and the exact testing schedule for HIV, Syphilis, Chlamydia & Gonorrhea.",
  alternates: {
    canonical: `${SITE_URL}/health-hub/after-unprotected-sex`,
  },
  openGraph: {
    title: "What to Do After Unprotected Sex: PEP Window & STI Timeline | QXL Diagnostics",
    description:
      "Hour-by-hour clinical guide: 72-hour PEP emergency window, baseline laboratory investigations, and conclusive STI testing schedule.",
    url: `${SITE_URL}/health-hub/after-unprotected-sex`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function AfterUnprotectedSexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/health-hub/after-unprotected-sex#webpage`,
        "url": `${SITE_URL}/health-hub/after-unprotected-sex`,
        "name": "What to Do After Unprotected Sex: The 72-Hour PEP Protocol and STI Testing Schedule",
        "description": "Urgent medical guidance on condom rupture, unbarriered intercourse, Post-Exposure Prophylaxis timing, baseline organ function tests, and subsequent diagnostic milestones.",
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
          { "@type": "ListItem", "position": 3, "name": "After Unprotected Sex Guide", "item": `${SITE_URL}/health-hub/after-unprotected-sex` }
        ]
      }
    ]
  };

  const steps = [
    {
      hour: "Hours 0 to 72 (Most Critical: <24h)",
      title: "Evaluate Need for Post-Exposure Prophylaxis (PEP)",
      description: "If an exposure to HIV is suspected, consult an emergency physician or sexual health clinic immediately. PEP consists of three antiretroviral medications taken for 28 days that can stop HIV from establishing infection in your body. It MUST be initiated within 72 hours. Do not wait for lab test results to start PEP.",
      badge: "Emergency Action",
      badgeColor: "bg-rose-600 text-white"
    },
    {
      hour: "Day 1 to 3",
      title: "Baseline Laboratory Safety Profile",
      description: "Before or concurrently with initiating PEP or broad STI evaluation, a baseline blood panel is required: HIV 4th Gen Duo (to confirm pre-existing negative status), Serum Creatinine with eGFR (to verify kidney safety for tenofovir-based PEP), Liver Function Tests (LFT), and Hepatitis B Surface Antigen (HBsAg).",
      badge: "Baseline Diagnostics",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      hour: "Day 14 (2 Weeks)",
      title: "Chlamydia & Gonorrhea Urine PCR",
      description: "Bacterial pathogens replicate faster than viral infections. By day 14, a first-catch urine PCR (NAAT) can accurately identify Chlamydia trachomatis and Neisseria gonorrhoeae, even if you remain completely asymptomatic.",
      badge: "Molecular PCR",
      badgeColor: "bg-sky-600 text-white"
    },
    {
      hour: "Day 28 to 45 (4 to 6 Weeks)",
      title: "4th Generation HIV & Syphilis Serology",
      description: "Viral p24 antigen peaks between weeks 3 and 4. A 4th Generation HIV test conducted at day 28 provides over 95% certainty, reaching >99% conclusiveness at day 45 per CDC guidelines. Quantitative Syphilis RPR/VDRL is also performed at this stage.",
      badge: "Serology Screening",
      badgeColor: "bg-emerald-600 text-white"
    },
    {
      hour: "Day 90 (3 Months)",
      title: "Definitive Conclusive Screening",
      description: "A final blood panel covering HIV 4th Gen Duo, Syphilis RPR/TPHA, Hepatitis B (HBsAg), and Hepatitis C (Anti-HCV) provides 100% definitive clinical peace of mind across all CDC and WHO standards.",
      badge: "Definitive Milestone",
      badgeColor: "bg-emerald-700 text-white"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="after-unprotected-sex-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">After Unprotected Sex Guide</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Emergency Clinical Pathway
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              What to Do After Unprotected Sex: PEP Window &amp; Testing Plan
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              A calm, clinically verified step-by-step guide. From emergency PEP evaluation within 72 hours to baseline laboratory workups and definitive STI testing milestones.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Urgent PEP Banner */}
        <PepUrgentBanner />

        {/* Step-by-Step Timeline */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Action Protocol</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Your Step-by-Step Clinical Timeline Following Exposure
            </h2>
          </div>

          <div className="space-y-4">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${s.badgeColor}`}>
                    {s.hour}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0c4a6e]">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What NOT to do */}
        <section className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-rose-950">
          <h3 className="text-lg font-black text-rose-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            What NOT to Do Immediately After Exposure
          </h3>
          <ul className="list-disc pl-5 space-y-2 leading-relaxed">
            <li><strong>Do NOT douche or apply harsh chemicals/soaps:</strong> Aggressive washing or douching irritates the genital and rectal mucosa, causing micro-abrasions that significantly increase the risk of viral transmission.</li>
            <li><strong>Do NOT take random leftover antibiotics:</strong> Self-medicating with unprescribed amoxicillin, ciprofloxacin, or azithromycin masks symptoms without curing resistant gonococcal or chlamydial strains and can invalidate laboratory molecular PCR tests.</li>
            <li><strong>Do NOT assume a urine test taken the next morning is negative:</strong> Biological pathogens take days to weeks to replicate. A negative test on day 1 provides zero reassurance regarding the new exposure.</li>
          </ul>
        </section>

        {/* Interactive Calculator */}
        <section>
          <HivWindowCalculator />
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/health-hub/after-unprotected-sex" />
      </main>
    </div>
  );
}

