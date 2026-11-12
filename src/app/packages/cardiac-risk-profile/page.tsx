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
  AlertTriangle,
  Heart,
  Activity,
  Stethoscope
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import { PACKAGE_MASTER } from '@/lib/packageMaster';

const cardioPkg = PACKAGE_MASTER.find((p) => p.package_id === 'PKG-QCARDIO-001');

export const metadata: Metadata = {
  title: "Cardiac Risk Blood Tests Bangalore | Lipids, ApoB & Lp(a) | QXL",
  description:
    "Cardiovascular risk blood testing in Bengaluru. Comprehensive Lipid Profile, High-Sensitivity CRP (hs-CRP), ApoB, Lipoprotein(a) & Homocysteine. NABL Accredited reference lab.",
  alternates: {
    canonical: `${SITE_URL}/packages/cardiac-risk-profile`,
  },
  openGraph: {
    title: "Cardiac Risk Blood Tests Bangalore | Lipids, ApoB & Lp(a) | QXL",
    description: "Advanced cardiac risk biomarkers in Bengaluru: ApoB, Lp(a), hs-CRP, Homocysteine and Lipid Profile. Doctor-led laboratory medicine.",
    url: `${SITE_URL}/packages/cardiac-risk-profile`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function CardiacRiskProfilePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/cardiac-risk-profile#panel`,
        "name": "Q-Cardio Advanced Cardiovascular Risk Panel",
        "code": {
          "@type": "MedicalCode",
          "code": "PKG-QCARDIO-001",
          "codingSystem": "QXL Laboratory Package Master"
        },
        "description": "Comprehensive cardiac and vascular risk evaluation panel including Lipid Profile, High-Sensitivity CRP, Apolipoprotein B (ApoB), Lipoprotein(a), and Homocysteine.",
        "offers": {
          "@type": "Offer",
          "price": "2199",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/cardiac-risk-profile`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Health Packages", "item": `${SITE_URL}/packages` },
          { "@type": "ListItem", "position": 3, "name": "Cardiovascular Risk Testing", "item": `${SITE_URL}/packages/cardiac-risk-profile` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why is hs-CRP important for heart risk?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "High-Sensitivity C-Reactive Protein (hs-CRP) measures low-grade vascular inflammation in arterial walls, identifying cardiovascular risk even in individuals with normal cholesterol levels."
            }
          },
          {
            "@type": "Question",
            "name": "What is the clinical difference between LDL cholesterol and ApoB?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ApoB measures the exact particle count of all atherogenic lipoproteins (LDL, VLDL remnants, and Lp(a)), providing a superior assessment of plaque-building particle burden, especially in insulin resistance and metabolic syndrome."
            }
          },
          {
            "@type": "Question",
            "name": "Is this test suitable for sudden chest pain?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. New, severe or unexplained chest pain requires immediate emergency hospital evaluation. Do not delay emergency care to book routine outpatient blood tests."
            }
          }
        ]
      }
    ]
  };

  const includedAssays = [
    { name: "Lipid Profile Comprehensive", method: "Direct Enzymatic Clearance", reason: "Total Cholesterol, HDL, LDL, VLDL, Triglycerides and Non-HDL ratio" },
    { name: "High-Sensitivity CRP (hs-CRP)", method: "Particle-Enhanced Immunoturbidimetry", reason: "Detects low-grade chronic arterial inflammation and cardiovascular risk tiering" },
    { name: "Apolipoprotein B (ApoB)", method: "Turbidimetric Immunoassay", reason: "Direct measure of circulating atherogenic lipoprotein particles" },
    { name: "Lipoprotein(a) / Lp(a)", method: "Particle-Enhanced Immunoturbidimetry", reason: "Evaluates inherited, genetically determined cardiovascular and aortic valve risk" },
    { name: "Serum Homocysteine", method: "Enzymatic Assay", reason: "Independent biomarker for vascular endothelial injury and thrombotic tendency" },
    { name: "Fasting Plasma Glucose (FBS)", method: "Hexokinase / GOD-PAP", reason: "Evaluates concurrent glycaemic dysregulation and insulin resistance" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="cardio-panel-jsonld"
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
          <span className="text-slate-800 font-bold">Cardiovascular Risk Testing</span>
        </div>
      </div>

      {/* Emergency Notice Banner */}
      <div className="bg-rose-600 text-white py-3 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-center">
        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-300" />
        <span>
          Emergency Safety Notice: New, severe or unexplained chest pain requires urgent emergency hospital care (Call 112). Do not delay emergency care for outpatient home blood collection.
        </span>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 border border-rose-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
              NABL ACCREDITED LAB (MC-6849) · ISO 15189:2022
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Cardiovascular Risk Laboratory Testing in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Cardiovascular risk assessment may include conventional lipid measurements and, in selected situations, additional biomarkers such as ApoB, Lipoprotein(a), hs-CRP or other investigations requested by a clinician.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Laboratory results should be interpreted together with age, blood pressure, smoking status, diabetes, family history, medications and other clinical factors. QXL provides routine and advanced cardiometabolic testing with home collection availability for eligible investigations.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/book?test=pkg-cardio"
                className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Book Cardio Risk Panel (₹2,199)
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`${WHATSAPP_LINK}?text=Hi%20QXL%20Diagnostics,%20I%20would%20like%20to%20enquire%20about%20the%20Cardiac%20Risk%20Profile`}
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
            <div className="text-rose-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Turnaround Time
            </div>
            <div className="text-2xl font-black text-slate-900">12 Hours</div>
            <p className="text-xs text-slate-600">Same-day reporting for lipids, hs-CRP, and glucose; specialized assays within 24 hours.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-amber-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Fasting Requirement
            </div>
            <div className="text-2xl font-black text-slate-900">10–12h Fasting</div>
            <p className="text-xs text-slate-600">Overnight fasting required for accurate triglycerides and lipid fractions. Water permitted.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-emerald-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Home Collection
            </div>
            <div className="text-2xl font-black text-slate-900">Scheduled Visit</div>
            <p className="text-xs text-slate-600">Doorstep cold-chain phlebotomy across eligible Bengaluru localities.</p>
          </div>
        </div>

        {/* Included Investigations Breakdown */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-600">Vascular Risk Biomarkers</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Key Assays in the Advanced Cardiac Risk Profile (26 Parameters)
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl">
              Moving beyond basic cholesterol tests to evaluate particle number (ApoB), inherited vulnerability (Lp(a)), and chronic vascular wall inflammation (hs-CRP).
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
                <div className="text-xs text-rose-700 font-medium">Methodology: {assay.method}</div>
                <p className="text-xs text-slate-600">{assay.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Note Alert */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm">
            <Stethoscope className="w-4 h-4" />
            Clinical Guidance & Review Policy
          </div>
          <p className="text-xs sm:text-sm text-rose-900/90 leading-relaxed">
            Cardiovascular risk markers provide probabilistic stratification rather than a definitive diagnosis of coronary stenosis. Biomarker results must be interpreted by your cardiologist or physician alongside clinical history, blood pressure, BMI, and non-invasive cardiac imaging where indicated.
          </p>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Who should test Lipoprotein(a)?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Major international cardiometabolic guidelines recommend measuring Lipoprotein(a) at least once in adulthood, particularly for adults with a family history of premature heart disease, recurrent events despite low LDL, or calcific aortic valve stenosis.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Can hs-CRP be elevated by common infections?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Yes. Acute viral or bacterial infections, trauma, or dental abscesses cause transient, marked spikes in CRP. For accurate cardiovascular risk stratification, hs-CRP testing should be deferred until 2 to 3 weeks after recovery from any acute systemic infection.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">How is cold-chain maintained for sensitive cardiac markers?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Venous samples are collected in standardized SST vacutainers, centrifuged promptly, and transported in temperature-logged cool boxes (2°C–8°C) directly to QXL’s Kengeri Reference Lab to guarantee specimen stability.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-rose-700 to-red-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Protect Your Heart with Advanced Diagnostics</h3>
            <p className="text-sm text-rose-100">
              Book doorstep phlebotomy across Bengaluru or visit Kengeri Central Lab & Yelahanka North Hub.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/book"
              className="bg-white text-rose-800 font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-rose-50 transition-all shadow-md"
            >
              Book Now
            </Link>
            <a
              href={`tel:${PHONE_E164}`}
              className="bg-rose-950/60 text-white font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-rose-950 transition-all border border-white/20"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
