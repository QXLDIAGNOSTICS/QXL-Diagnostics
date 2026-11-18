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
import { VerifiedSexualHealthLinks } from '@/components/qxl-seo/VerifiedSexualHealthLinks';

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

        <VerifiedSexualHealthLinks />

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

          {/* Exposure-Specific Featured Profile */}
          <section id="oral-sex-sti-testing" className="sexual-health-featured-profile bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <span className="inline-block bg-[#2563eb] text-white font-black px-3.5 py-1 rounded-full text-[11px] uppercase tracking-wider">
              Exposure-Specific STI Screening
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
                STI Screening After Oral Sex
              </h2>
              <h3 className="text-base sm:text-lg font-bold text-slate-700">
                Throat Swab PCR &amp; Comprehensive Blood Testing
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Looking for oral gonorrhoea testing, chlamydia throat swab PCR, fourth-generation HIV screening, syphilis testing or the hepatitis B triple panel in Bangalore?
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Explore targeted STI investigations based on anatomical exposure sites, symptoms and testing timeline.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800 pt-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                Pharyngeal Gonorrhoea NAAT
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                Pharyngeal Chlamydia NAAT, where appropriate
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                HIV 1/2 Fourth-Generation Ag/Ab
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                Syphilis RPR + TPHA
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                Hepatitis B Triple Panel
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
                First-Catch Urine STI NAAT
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic pt-1">
              Confirm test availability, assay validation, collection location and total pricing before booking.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/sexual-health/sti-testing-after-oral-sex"
                className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow transition-all active:scale-95"
              >
                <span>View Targeted Post-Exposure Testing Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/packages/oral-rectal-sti-screening"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0c4a6e] font-extrabold text-xs uppercase tracking-wider px-5 py-3.5 rounded-full border border-slate-300 shadow-sm transition-all"
              >
                <span>See QXL-STI-10 Listing</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </section>

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

