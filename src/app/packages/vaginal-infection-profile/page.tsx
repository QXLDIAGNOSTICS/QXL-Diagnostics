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

const pkg = QXL_STI_PACKAGES.find(p => p.code === 'QXL-STI-08')!;

export const metadata: Metadata = {
  title: "Vaginal Infection Diagnostic Profile (Vaginitis & BV) | QXL Diagnostics",
  description:
    "Comprehensive diagnostic evaluation for abnormal vaginal discharge, bacterial vaginosis (Nugent scoring), candidiasis culture, and Trichomonas/Chlamydia/Gonorrhea PCR in Bengaluru.",
  alternates: {
    canonical: `${SITE_URL}/packages/vaginal-infection-profile`,
  },
  openGraph: {
    title: "Vaginal Infection Diagnostic Profile | QXL Diagnostics",
    description: "Clinical evaluation for bacterial vaginosis, yeast infections, and sexually transmitted cervicitis in Bengaluru.",
    url: `${SITE_URL}/packages/vaginal-infection-profile`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function VaginalInfectionPackagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/vaginal-infection-profile#panel`,
        "name": "Vaginal Infection Diagnostic Profile (Vaginitis & Microecology)",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-08",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Multi-component microscopic, microbiological culture, and molecular PCR panel for vaginitis and sexually transmitted discharge.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/vaginal-infection-profile`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Sexual Health Hub", "item": `${SITE_URL}/sexual-health` },
          { "@type": "ListItem", "position": 3, "name": "Vaginal Infection Profile", "item": `${SITE_URL}/packages/vaginal-infection-profile` }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="vaginal-infection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Vaginal Infection Profile</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Package Code: {pkg.code}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Vaginal Infection Diagnostic Profile in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Precision clinical microscopy, fungal speciation, and molecular NAAT for recurrent vaginal discharge, pruritus, or fishy odor. Collected respectfully by clinical providers.
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
            Clinical Differential: Bacterial Vaginosis vs Yeast vs STIs
          </h3>
          <p className="leading-relaxed">
            Per Koneman&apos;s Diagnostic Microbiology Chapter 2 (Genital Tract Infections), empiric self-treatment with over-the-counter antifungals fails in up to 40% of women because Bacterial Vaginosis (caused by shifts in Gardnerella and anaerobic flora) or Trichomonas vaginalis requires targeted antibiotic therapy rather than antifungals. This profile provides definitive microbiological identification to restore normal vaginal microecology.
          </p>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/packages/vaginal-infection-profile" />
      </main>
    </div>
  );
}

