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

const pkg = QXL_STI_PACKAGES.find(p => p.code === 'QXL-STI-06')!;

export const metadata: Metadata = {
  title: "Essential Blood-Borne STI Screening Panel | QXL Diagnostics",
  description:
    "Core blood-borne STI screening in Bengaluru. Single blood draw covering 4th Gen HIV Duo, Syphilis RPR/TPHA, Hepatitis B (HBsAg), and Hepatitis C (Anti-HCV). NABL Accredited laboratory.",
  alternates: {
    canonical: `${SITE_URL}/packages/essential-sti-screening`,
  },
  openGraph: {
    title: "Essential Blood-Borne STI Screening Panel | QXL Diagnostics",
    description: "Comprehensive 4-target blood STI screening panel in Bengaluru. Fast 12-24h turnaround, confidential home collection.",
    url: `${SITE_URL}/packages/essential-sti-screening`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function EssentialStiPackagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/essential-sti-screening#panel`,
        "name": "Essential Blood-Borne STI Screening Panel",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-06",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Essential serological screening for four major blood-borne and systemic sexually transmitted infections from a single venous blood draw.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/essential-sti-screening`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Sexual Health Hub", "item": `${SITE_URL}/sexual-health` },
          { "@type": "ListItem", "position": 3, "name": "Essential STI Screen", "item": `${SITE_URL}/packages/essential-sti-screening` }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="essential-sti-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Essential STI Screen</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Package Code: {pkg.code}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Essential Blood-Borne STI Screening in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              A single blood draw covering HIV 4th Gen Duo, Syphilis dual serology, Hepatitis B, and Hepatitis C. Fast, accurate, and completely confidential.
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
            Who Should Consider the Essential Blood-Borne STI Screen?
          </h3>
          <p className="leading-relaxed">
            This panel is designed for sexually active adults seeking a dependable baseline health checkup, individuals entering a new relationship, or patients following unbarriered intimacy once the initial 28–45 day window period has elapsed. It covers the four primary blood-borne pathogens responsible for chronic systemic morbidity if left undetected.
          </p>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/packages/essential-sti-screening" />
      </main>
    </div>
  );
}

