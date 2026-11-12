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
  Sun,
  Zap,
  Activity,
  Stethoscope
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Vitamin D & B12 Blood Tests Bangalore | Home Collection | QXL",
  description:
    "Vitamin D3 & Vitamin B12 blood tests in Bengaluru. Chemiluminescence immunoassay (CLIA), Calcium, Ferritin & Complete Hemogram. NABL Accredited lab with doorstep collection.",
  alternates: {
    canonical: `${SITE_URL}/packages/vitamin-deficiency-profile`,
  },
  openGraph: {
    title: "Vitamin D & B12 Blood Tests Bangalore | Home Collection | QXL",
    description: "Doctor-led Vitamin D3, B12, Calcium and nutritional deficiency testing across Bengaluru. Automated CLIA precision and doorstep phlebotomy.",
    url: `${SITE_URL}/packages/vitamin-deficiency-profile`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function VitaminDeficiencyProfilePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/vitamin-deficiency-profile#panel`,
        "name": "Vitamin D & B12 Deficiency Profile",
        "description": "Essential nutritional deficiency assessment covering 25-OH Vitamin D3, Vitamin B12, Serum Calcium, Serum Ferritin, and Complete Blood Count.",
        "offers": {
          "@type": "Offer",
          "price": "899",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/vitamin-deficiency-profile`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Health Packages", "item": `${SITE_URL}/packages` },
          { "@type": "ListItem", "position": 3, "name": "Vitamin Deficiency Testing", "item": `${SITE_URL}/packages/vitamin-deficiency-profile` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does a Vitamin D and B12 test require fasting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, standalone Vitamin D and Vitamin B12 tests do not strictly require fasting. However, if ordered with fasting glucose or lipids, an 8 to 10-hour overnight fast is recommended."
            }
          },
          {
            "@type": "Question",
            "name": "Can low Vitamin B12 cause brain fog and tingling?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Vitamin B12 is essential for myelin sheath integrity and neurotransmitter synthesis. Insufficiency can cause peripheral neuropathy (tingling in feet) and cognitive fatigue even before anaemia develops."
            }
          },
          {
            "@type": "Question",
            "name": "How is Vitamin D measured at QXL?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vitamin D is measured as 25-Hydroxy Vitamin D [25(OH)D] using fully automated Chemiluminescent Microparticle Immunoassay (CMIA) calibrated against NIST reference standards."
            }
          }
        ]
      }
    ]
  };

  const includedAssays = [
    { name: "25-Hydroxy Vitamin D3 [25(OH)D]", method: "Chemiluminescence Immunoassay (CLIA)", reason: "Gold-standard measure of total circulating Vitamin D stores for bone & metabolic health" },
    { name: "Serum Vitamin B12 (Cobalamin)", method: "Direct Chemiluminescence (CLIA)", reason: "Assesses cellular cobalamin required for neurological integrity and red cell maturation" },
    { name: "Serum Calcium Total", method: "Arsenazo III Photometric", reason: "Evaluates calcium homeostasis directly regulated by active Vitamin D and PTH" },
    { name: "Serum Ferritin", method: "Particle-Enhanced Turbidimetric", reason: "Measures cellular iron storage to distinguish nutritional fatigue from latent iron deficiency" },
    { name: "Complete Blood Count (CBC with Smear)", method: "6-Part Flow Cytometry", reason: "Examines 26 parameters for macrocytic or microcytic anaemia (MCV, RDW, Hemoglobin)" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="vitamin-panel-jsonld"
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
          <span className="text-slate-800 font-bold">Vitamin Deficiency Testing</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-200 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              NABL ACCREDITED LAB (MC-6849) · ISO 15189:2022
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Vitamin Deficiency Testing in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Vitamin D and Vitamin B12 testing may be useful when clinically indicated by symptoms, nutritional risk, medical history or treatment monitoring.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Symptoms such as fatigue, weakness, bone discomfort, neurological symptoms or anaemia can have many causes and should not automatically be attributed to vitamin deficiency. QXL provides individual vitamin tests and selected nutritional profiles with clear sample requirements and home collection options.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/book?test=pkg-vitamins"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Book Vitamin Checkup (Starts ₹410)
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`${WHATSAPP_LINK}?text=Hi%20QXL%20Diagnostics,%20I%20would%20like%20to%20enquire%20about%20Vitamin%20D%20and%20B12%20testing`}
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
            <div className="text-amber-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Turnaround Time
            </div>
            <div className="text-2xl font-black text-slate-900">Same Day (12h)</div>
            <p className="text-xs text-slate-600">Automated chemiluminescence reporting with same-day digital report release.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-blue-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Preparation
            </div>
            <div className="text-2xl font-black text-slate-900">No Fasting Required</div>
            <p className="text-xs text-slate-600">Sample can be collected at any time of day unless co-ordered with metabolic tests.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-emerald-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Home Sample Collection
            </div>
            <div className="text-2xl font-black text-slate-900">Bengaluru Wide</div>
            <p className="text-xs text-slate-600">Temperature-controlled doorstep phlebotomy across eligible Bengaluru localities.</p>
          </div>
        </div>

        {/* Included Investigations Breakdown */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">Nutritional Biomarkers</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Essential Assays in the Vitamin & Energy Profile
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl">
              High-precision immunoassays evaluated against international clinical cutoffs for bone strength, cognitive stamina, and cellular energy production.
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
                <div className="text-xs text-amber-700 font-medium">Methodology: {assay.method}</div>
                <p className="text-xs text-slate-600">{assay.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Note Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
            <Stethoscope className="w-4 h-4" />
            Clinical Guidance & Review Policy
          </div>
          <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
            High-dose supplement use within 48 to 72 hours prior to testing can artificially elevate circulating concentrations. Discuss current dietary supplements, biotin intake, and fortified foods with your clinician prior to sample collection.
          </p>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Why is Vitamin D deficiency so common in urban Bengaluru?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Urban indoor lifestyles, high melanin skin pigmentation requiring prolonged UV exposure, and atmospheric particulate filtering limit dermal synthesis, resulting in over 70% insufficiency in urban Indian working adults.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">What is the difference between Vitamin B12 and Active B12?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Total Serum B12 measures both bound inactive forms and active cobalamin. Active B12 (Holotranscobalamin) measures only the physiologically active fraction available for cellular uptake, providing higher specificity in borderline cases.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Does biotin interfere with vitamin testing?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                High-dose biotin supplements (&gt;5 mg/day) commonly found in hair and nail products can interfere with streptavidin-biotin immunoassays. It is recommended to withhold high-dose biotin for 48 hours before testing.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Reclaim Your Energy & Vitality</h3>
            <p className="text-sm text-amber-100">
              Reliable doorstep blood collection across Bengaluru or walk-in at Kengeri Reference Lab & Yelahanka North Hub.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/book"
              className="bg-white text-slate-900 font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-amber-50 transition-all shadow-md"
            >
              Book Now
            </Link>
            <a
              href={`tel:${PHONE_E164}`}
              className="bg-amber-950/60 text-white font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-amber-950 transition-all border border-white/20"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
