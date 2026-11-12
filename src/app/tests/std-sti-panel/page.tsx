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
  Sparkles
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "Full STD/STI Testing Panels in Bangalore | Complete Screening | QXL Diagnostics",
  description:
    "Comprehensive STD & STI panels in Bengaluru. Blood & urine multiplex PCR screening for HIV, Syphilis, Chlamydia, Gonorrhea, Trichomonas, Hepatitis B/C & Herpes. Confidential testing with privacy-conscious sample collection and report delivery.",
  alternates: {
    canonical: `${SITE_URL}/tests/std-sti-panel`,
  },
  openGraph: {
    title: "Full STD/STI Testing Panels in Bangalore | QXL Diagnostics",
    description:
      "NABL Accredited multi-pathogen STD screening combining 4th Gen serology and molecular NAAT PCR in Bengaluru. Same-day & 24h reports.",
    url: `${SITE_URL}/tests/std-sti-panel`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function StdStiPanelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/tests/std-sti-panel#panel`,
        "name": "Comprehensive STI Master Diagnostic Panel (10 Targets)",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-07",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Integrated dual-specimen diagnostic panel utilizing blood serology and first-catch urine multiplex PCR to screen for viral, bacterial, and protozoan sexually transmitted pathogens.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "3999",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/tests/std-sti-panel`
        }
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/std-sti-panel#webpage`,
        "url": `${SITE_URL}/tests/std-sti-panel`,
        "name": "Full STD Panel Bangalore & STI Screening Packages",
        "description": "Detailed guide to selecting the right sexual health checkup panel, testing methods, specimen handling, and confidential reporting.",
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
          { "@type": "ListItem", "position": 3, "name": "STD/STI Diagnostic Panels", "item": `${SITE_URL}/tests/std-sti-panel` }
        ]
      }
    ]
  };

  const panels = [
    {
      name: "Essential Blood-Borne STI Screen (QXL-STI-06)",
      specimen: "Serum (Venous Blood)",
      tat: "12–24 Hours",
      targets: ["HIV-1/2 (4th Gen p24 Ag + Ab)", "Syphilis (RPR + TPHA reflex)", "Hepatitis B (HBsAg)", "Hepatitis C (Anti-HCV)"],
      description: "Ideal baseline checkup after an unbarriered encounter or for pre-marital peace of mind. Covers the 4 major systemic blood-borne infections."
    },
    {
      name: "Triple STI Urine PCR Screen (QXL-STI-05)",
      specimen: "First-Catch Urine (20–30 mL)",
      tat: "24–48 Hours",
      targets: ["Chlamydia trachomatis DNA", "Neisseria gonorrhoeae DNA", "Trichomonas vaginalis DNA"],
      description: "High-sensitivity molecular amplification for individuals presenting with burning urination, discharge, or pelvic itching. Non-invasive urine test."
    },
    {
      name: "Comprehensive STI Master Panel (QXL-STI-07)",
      specimen: "Blood (Serum) + First-Catch Urine",
      tat: "24–48 Hours",
      targets: [
        "HIV-1/2 4th Gen Duo",
        "Syphilis RPR & TPHA",
        "Hepatitis B Surface Antigen",
        "Hepatitis C Total Antibody",
        "Chlamydia PCR",
        "Gonorrhea PCR",
        "Trichomonas PCR",
        "HSV-1 & HSV-2 IgG Antibodies"
      ],
      description: "Our complete 10-target evaluation combining molecular NAAT for mucosal pathogens with chemiluminescence serology for systemic pathogens."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="std-sti-panel-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">STD/STI Diagnostic Panels</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Comprehensive Multiplex Screening
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Full STD &amp; STI Diagnostic Panels in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Multi-pathogen sexual health screening combining molecular PCR with automated chemiluminescent serology. Fast, private, and doctor-reviewed with discrete doorstep collection.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to enquire about / book an STI Diagnostic Panel.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire &amp; Book Panel via WhatsApp</span>
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
        {/* Panel Selection Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Tailored Screening Tiers</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Choose the Right Diagnostic Panel for Your Exposure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {panels.map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-[#0c4a6e] leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                    <p><strong>Specimen:</strong> {p.specimen}</p>
                    <p><strong>Report TAT:</strong> {p.tat}</p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[11px] font-black uppercase text-slate-400 block mb-1.5">Investigated Targets:</span>
                    <div className="flex flex-wrap gap-1">
                      {p.targets.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10.5px] bg-sky-50 text-sky-900 border border-sky-200/80 px-2 py-0.5 rounded-md font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Hello QXL, I would like to book the ${p.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-sm text-center"
                  >
                    <span>Enquire &amp; Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Specimen Instructions */}
        <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-black text-[#0c4a6e]">
            Specimen Collection Guidelines for Combined Panels
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            For combined blood and urine panels (such as the Comprehensive STI Master Panel), both samples are collected during a single home collection visit or clinic appointment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-700">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">1. Blood Sample:</strong>
              <p>Venous draw collected by our trained phlebotomy specialist. No fasting is required.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">2. First-Catch Urine Sample:</strong>
              <p>You must not urinate for at least 1–2 hours prior to collection. Collect the first 20–30 mL of urine voided into the sterile collection cup.</p>
            </div>
          </div>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/tests/std-sti-panel" />
      </main>
    </div>
  );
}

