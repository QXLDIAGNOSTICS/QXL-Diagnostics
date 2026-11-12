import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { ShieldCheck, ChevronRight, Phone, MessageSquare, ArrowRight, Lock, Clock, Award } from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import { QXL_STI_PACKAGES } from '@/lib/sexualHealthData';
import StiPackageCard from '@/components/sexual-health/StiPackageCard';
import PepUrgentBanner from '@/components/sexual-health/PepUrgentBanner';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "Sexual Health & STI Diagnostic Packages Bangalore | QXL Diagnostics",
  description:
    "Explore our complete range of 10 sexual health & STI packages in Bengaluru. 4th Gen HIV, Syphilis dual serology, urine PCR, vaginal profiles, and comprehensive multi-pathogen screening.",
  alternates: {
    canonical: `${SITE_URL}/sexual-health/packages`,
  },
  openGraph: {
    title: "Sexual Health & STI Diagnostic Packages Bangalore | QXL Diagnostics",
    description:
      "All 10 structured STI packages with NABL Accredited laboratory testing, discrete doorstep collection, and fast turnaround in Bengaluru.",
    url: `${SITE_URL}/sexual-health/packages`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function SexualHealthPackagesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/sexual-health/packages#webpage`,
        "url": `${SITE_URL}/sexual-health/packages`,
        "name": "Sexual Health & STI Diagnostic Packages Catalogue",
        "description": "Complete directory of all 10 diagnostic packages for sexually transmitted infection screening at QXL Diagnostics Bengaluru.",
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
          { "@type": "ListItem", "position": 3, "name": "STI Packages", "item": `${SITE_URL}/sexual-health/packages` }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="sexual-health-packages-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">All STI Packages</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Complete Package Directory
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              All 10 Sexual Health &amp; STI Diagnostic Packages
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Carefully structured profiles tailored for specific exposures, timeline milestones, and clinical symptoms. Confidential doorstep collection across Bengaluru.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        <PepUrgentBanner />

        {/* 10 Package Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Verified Laboratory Profiles</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
                Explore Our Diagnostic Profiles
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              Showing all 10 clinical profiles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QXL_STI_PACKAGES.map((pkg, idx) => (
              <StiPackageCard key={pkg.code} pkg={pkg} highlight={idx === 0} />
            ))}
          </div>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/sexual-health/packages" />
      </main>
    </div>
  );
}

