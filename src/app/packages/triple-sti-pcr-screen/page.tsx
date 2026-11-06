import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck, ChevronRight, Phone, MessageSquare, ArrowRight, FlaskConical, Clock, Lock } from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import { QXL_STI_PACKAGES } from '@/lib/sexualHealthData';
import StiPackageCard from '@/components/sexual-health/StiPackageCard';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

const pkg = QXL_STI_PACKAGES.find(p => p.code === 'QXL-STI-05')!;

export const metadata: Metadata = {
  title: "Triple STI Multiplex PCR Screen (Chlamydia, Gonorrhea, Trichomonas) | QXL Diagnostics",
  description:
    "Confidential Triple STI PCR screen in Bengaluru. First-catch urine molecular testing for Chlamydia trachomatis, Neisseria gonorrhoeae, and Trichomonas vaginalis.",
  alternates: {
    canonical: `${SITE_URL}/packages/triple-sti-pcr-screen`,
  },
  openGraph: {
    title: "Triple STI Multiplex PCR Screen | QXL Diagnostics",
    description: "Gold standard 3-target urine PCR for Chlamydia, Gonorrhea, and Trichomonas in Bengaluru.",
    url: `${SITE_URL}/packages/triple-sti-pcr-screen`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function TripleStiPcrPackagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/triple-sti-pcr-screen#panel`,
        "name": "Triple STI Multiplex PCR Screen",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-05",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Simultaneous molecular detection of Chlamydia trachomatis, Neisseria gonorrhoeae, and Trichomonas vaginalis from first-catch urine.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/triple-sti-pcr-screen`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Sexual Health Hub", "item": `${SITE_URL}/sexual-health` },
          { "@type": "ListItem", "position": 3, "name": "Triple STI PCR Screen", "item": `${SITE_URL}/packages/triple-sti-pcr-screen` }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="triple-sti-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Triple STI PCR Screen</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Package Code: {pkg.code}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Triple STI Multiplex PCR Screen in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Simultaneous nucleic acid amplification for Chlamydia, Gonorrhea, and Trichomonas. A non-invasive first-catch urine test delivering fast, definitive answers.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-12">
        <div className="max-w-xl mx-auto">
          <StiPackageCard pkg={pkg} highlight={true} />
        </div>

        <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 max-w-4xl mx-auto text-xs sm:text-sm text-slate-700">
          <h3 className="text-lg font-black text-[#0c4a6e]">
            Clinical Value of Multiplex PCR for Urogenital Discharge
          </h3>
          <p className="leading-relaxed">
            Per Koneman&apos;s Diagnostic Microbiology, co-infection between <em>Chlamydia trachomatis</em>, <em>Neisseria gonorrhoeae</em>, and <em>Trichomonas vaginalis</em> is common. Traditional microscopy has low sensitivity (under 60% for Trichomonas). Real-time multiplex PCR provides &gt;98% analytical sensitivity, ensuring that both bacterial and protozoan causes of urethritis/vaginitis are identified simultaneously.
          </p>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/packages/triple-sti-pcr-screen" />
      </main>
    </div>
  );
}

