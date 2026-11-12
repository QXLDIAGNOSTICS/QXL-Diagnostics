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

const pkg = QXL_STI_PACKAGES.find(p => p.code === 'QXL-STI-10')!;

export const metadata: Metadata = {
  title: "Oral & Rectal Extragenital STI Screening (Throat & Anal NAAT) | QXL Diagnostics",
  description:
    "Targeted molecular screening for pharyngeal and anorectal Chlamydia & Gonorrhea in Bengaluru. CDC-recommended anatomical site testing for oral and anal exposure.",
  alternates: {
    canonical: `${SITE_URL}/packages/oral-rectal-sti-screening`,
  },
  openGraph: {
    title: "Oral & Rectal Extragenital STI Screening | QXL Diagnostics",
    description: "Site-specific swab NAAT for throat and rectal Gonorrhea and Chlamydia in Bengaluru. Highly confidential.",
    url: `${SITE_URL}/packages/oral-rectal-sti-screening`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function OralRectalStiPackagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/oral-rectal-sti-screening#panel`,
        "name": "Anatomical-Site Extragenital STI Screening Profile",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-10",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Anatomical-site specific molecular swab testing for extragenital Chlamydia and Gonorrhea colonization in pharyngeal and anorectal mucosal surfaces.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/oral-rectal-sti-screening`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Sexual Health Hub", "item": `${SITE_URL}/sexual-health` },
          { "@type": "ListItem", "position": 3, "name": "Oral & Rectal STI Screening", "item": `${SITE_URL}/packages/oral-rectal-sti-screening` }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="oral-rectal-sti-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Oral &amp; Rectal STI Screening</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Package Code: {pkg.code}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Anatomical-Site Extragenital STI Screening in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Targeted pharyngeal and anorectal molecular swabs for Gonorrhea and Chlamydia. Essential CDC-guided testing following oral or anal exposures that urine tests cannot detect.
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
            CDC Testing Recommendation for Extragenital Infections
          </h3>
          <p className="leading-relaxed">
            Clinical studies highlighted by the CDC confirm that over 70% of extragenital gonococcal and chlamydial infections occur in the absence of urogenital symptoms or positive urine tests. If exposure involved oral intimacy or receptive anal intimacy, providing a urine sample alone provides a false sense of security. Swabs taken directly from the throat or rectum are essential for accurate clinical evaluation.
          </p>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/packages/oral-rectal-sti-screening" />
      </main>
    </div>
  );
}

