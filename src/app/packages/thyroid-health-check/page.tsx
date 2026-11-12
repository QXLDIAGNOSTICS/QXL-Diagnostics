import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  ChevronRight,
  Phone,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Zap,
  Stethoscope
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Thyroid Blood Test Bangalore | TSH, FT4 & Profiles | QXL",
  description:
    "Thyroid testing in Bengaluru. 3rd Generation TSH, Free T3, Free T4, Total T3/T4 & Anti-TPO antibody panels. NABL Accredited reference lab with morning home collection.",
  alternates: {
    canonical: `${SITE_URL}/packages/thyroid-health-check`,
  },
  openGraph: {
    title: "Thyroid Blood Test Bangalore | TSH, FT4 & Profiles | QXL",
    description: "Doctor-led thyroid hormone and autoimmune antibody testing in Bengaluru. NABL ISO 15189:2022 precision and morning phlebotomy.",
    url: `${SITE_URL}/packages/thyroid-health-check`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function ThyroidHealthCheckPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/thyroid-health-check#panel`,
        "name": "Comprehensive Thyroid Profile & Autoimmune Panel",
        "description": "Doctor-led thyroid gland evaluation covering Ultrasensitive 3rd Gen TSH, Free T3, Free T4, Total T3, Total T4, and Anti-TPO autoantibody screening.",
        "offers": {
          "@type": "Offer",
          "price": "650",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/thyroid-health-check`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Health Packages", "item": `${SITE_URL}/packages` },
          { "@type": "ListItem", "position": 3, "name": "Thyroid Testing", "item": `${SITE_URL}/packages/thyroid-health-check` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Should I take my thyroid medication (Thyronorm/Eltroxin) before the test?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For routine monitoring, take your morning dose of levothyroxine immediately after the blood draw to prevent transient post-ingestion peaks from artificially skewing circulating Free T4 levels."
            }
          },
          {
            "@type": "Question",
            "name": "What is the best time for a thyroid blood test?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Morning collection between 07:00 AM and 10:00 AM is clinically preferred because TSH exhibits a natural diurnal circadian rhythm, peaking in early morning hours."
            }
          },
          {
            "@type": "Question",
            "name": "Why is Free T4 more informative than Total T4?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Over 99.7% of circulating thyroxine is bound to proteins (TBG). Free T4 measures the unbound, biologically active fraction that actually enters cells, unaffected by pregnancy, oral contraceptives, or hepatic protein changes."
            }
          }
        ]
      }
    ]
  };

  const includedAssays = [
    { name: "Thyroid Stimulating Hormone (TSH Ultrasensitive)", method: "3rd Generation CLIA / CMIA", reason: "Single most sensitive primary screen for hyperthyroidism and primary hypothyroidism" },
    { name: "Free Thyroxine (FT4)", method: "Direct Competitive Immunoassay", reason: "Measures biologically active unbound hormone; unaffected by binding globulin variations" },
    { name: "Free Triiodothyronine (FT3)", method: "Chemiluminescent Microparticle", reason: "Evaluates active peripheral hormone, crucial in T3-thyrotoxicosis and metabolic conversion" },
    { name: "Total Thyroxine (T4) & Total T3", method: "Standardised Photometric Immunoassay", reason: "Assesses complete glandular output and binding protein capacity" },
    { name: "Anti-Thyroid Peroxidase (Anti-TPO)", method: "Quantitative Immunoassay", reason: "Identifies Hashimoto's thyroiditis and autoimmune thyroid disease risk" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="thyroid-panel-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/packages" className="hover:text-blue-600">Health Packages</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">Thyroid Testing</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
              NABL ACCREDITED LAB (MC-6849) · ISO 15189:2022
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Thyroid Testing in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Thyroid laboratory assessment may involve TSH alone or a combination of thyroid hormones and antibodies depending on the clinical question.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Testing may be used for screening, diagnosis, medication monitoring, pregnancy-related assessment or investigation of suspected autoimmune thyroid disease. QXL provides thyroid testing with test-specific preparation information and medically reviewed results.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/book?test=thyroid"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Book Thyroid Profile (From ₹250)
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`${WHATSAPP_LINK}?text=Hi%20QXL%20Diagnostics,%20I%20would%20like%20to%20enquire%20about%20Thyroid%20Testing`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-12">
        {/* Package Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-indigo-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Turnaround Time
            </div>
            <div className="text-2xl font-black text-slate-900">6 Hours (Same Day)</div>
            <p className="text-xs text-slate-600">Automated Roche/Beckman high-throughput immunoassay with same-day reports.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-amber-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Timing Preference
            </div>
            <div className="text-2xl font-black text-slate-900">Morning Draw</div>
            <p className="text-xs text-slate-600">07:00 AM – 10:00 AM preferred. Take morning medication after blood draw.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-emerald-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Home Sample Collection
            </div>
            <div className="text-2xl font-black text-slate-900">Doorstep Phlebotomy</div>
            <p className="text-xs text-slate-600">Early morning collection slots available across eligible Bengaluru localities.</p>
          </div>
        </div>

        {/* Included Investigations Breakdown */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600">Endocrine Assays</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Core Thyroid Diagnostic Assays
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl">
              From routine TSH monitoring to advanced Free T3, Free T4 and Anti-TPO autoantibody differentiation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {includedAssays.map((assay, i) => (
              <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {assay.name}
                  </h3>
                </div>
                <div className="text-xs text-indigo-700 font-medium">Methodology: {assay.method}</div>
                <p className="text-xs text-slate-600">{assay.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Note Alert */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm">
            <Stethoscope className="w-4 h-4" />
            Clinical Guidance & Review Policy
          </div>
          <p className="text-xs sm:text-sm text-indigo-950/90 leading-relaxed">
            TSH reference ranges shift significantly during pregnancy trimesters and in older adults. Subclinical hypothyroidism (elevated TSH with normal Free T4) requires clinical correlation by your endocrinologist before starting lifelong replacement therapy.
          </p>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Is fasting mandatory for a TSH test?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Fasting is not strictly required for a standalone TSH or Thyroid Profile. However, an early morning sample (07:00 AM – 10:00 AM) before your morning meal is recommended for standardized basal comparison.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">What does a positive Anti-TPO antibody test mean?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Positive Anti-TPO antibodies indicate autoimmune thyroiditis (Hashimoto's disease), the leading cause of primary hypothyroidism. It identifies underlying immune reactivity even before thyroid hormone levels decline.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">How often should thyroid levels be monitored on treatment?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Following dose adjustments of levothyroxine, TSH should be rechecked in 6 to 8 weeks. Once thyroid levels stabilize within target clinical range, monitoring every 6 to 12 months is usually sufficient.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-950 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Accurate Thyroid Diagnostics with Rapid Turnaround</h3>
            <p className="text-sm text-indigo-200">
              Convenient morning home collection across Bengaluru or walk-in at Kengeri Reference Lab & Yelahanka North Hub.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/book"
              className="bg-white text-indigo-950 font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-md"
            >
              Book Now
            </Link>
            <a
              href={`tel:${PHONE_E164}`}
              className="bg-indigo-900/60 text-white font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-indigo-900 transition-all border border-white/20"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
