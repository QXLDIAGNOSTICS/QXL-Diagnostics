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
  FileText,
  Calendar,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import { PACKAGE_MASTER } from '@/lib/packageMaster';

const diabetesPkg = PACKAGE_MASTER.find((p) => p.package_id === 'PKG-QSD-001');

export const metadata: Metadata = {
  title: "Diabetes Blood Tests in Bangalore | HbA1c & Monitoring | QXL",
  description:
    "Comprehensive diabetes monitoring in Bengaluru. Fasting Blood Glucose, HPLC HbA1c, Urine Microalbumin (UACR), Lipid Profile & Kidney function. NABL Accredited, home collection.",
  alternates: {
    canonical: `${SITE_URL}/packages/diabetes-health-check`,
  },
  openGraph: {
    title: "Diabetes Blood Tests in Bangalore | HbA1c & Monitoring | QXL",
    description: "Doctor-curated diabetes monitoring tests in Bengaluru with gold-standard HPLC HbA1c, urine microalbumin & doorstep cold-chain collection.",
    url: `${SITE_URL}/packages/diabetes-health-check`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function DiabetesHealthCheckPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTestPanel",
        "@id": `${SITE_URL}/packages/diabetes-health-check#panel`,
        "name": "Q-Screen Diabetes & Metabolic Health Panel",
        "code": {
          "@type": "MedicalCode",
          "code": "PKG-QSD-001",
          "codingSystem": "QXL Laboratory Package Master"
        },
        "description": "Comprehensive diabetes screening and complication monitoring panel including HPLC HbA1c, fasting plasma glucose, urine albumin-to-creatinine ratio (UACR), lipid profile, and renal function.",
        "offers": {
          "@type": "Offer",
          "price": "1999",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/packages/diabetes-health-check`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Health Packages", "item": `${SITE_URL}/packages` },
          { "@type": "ListItem", "position": 3, "name": "Diabetes Monitoring Tests", "item": `${SITE_URL}/packages/diabetes-health-check` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does this diabetes panel require fasting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, 8 to 10 hours of overnight fasting is mandatory for accurate Fasting Blood Sugar (FBS) and Lipid Profile results. Plain drinking water is permitted."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly are diabetes test reports delivered?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Routine diabetes monitoring parameters including HbA1c and Fasting Glucose are reported within 6 to 12 hours on the same day via secure digital WhatsApp and SMS download."
            }
          },
          {
            "@type": "Question",
            "name": "Why is Urine Microalbumin (UACR) included in diabetes monitoring?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Urine Albumin-to-Creatinine Ratio (UACR) detects microscopic glomerular leakage in the kidneys long before blood creatinine rises, allowing early prevention of diabetic nephropathy."
            }
          }
        ]
      }
    ]
  };

  const includedAssays = [
    { name: "HbA1c (Glycated Haemoglobin)", method: "High-Performance Liquid Chromatography (HPLC)", reason: "Gold-standard 90-day cumulative glycaemic control" },
    { name: "Fasting Plasma Glucose (FBS)", method: "Hexokinase / GOD-PAP Enzymatic", reason: "Basal overnight glucose regulation" },
    { name: "Postprandial Blood Sugar (PPBS)", method: "Enzymatic Photometric", reason: "Evaluates insulin surge and carbohydrate clearance 2 hours post-meal" },
    { name: "Urine Albumin-Creatinine Ratio (UACR)", method: "Immunoturbidimetric & Jaffe Rate Blanked", reason: "Detects earliest microscopic kidney leakage (diabetic nephropathy)" },
    { name: "Lipid Profile Comprehensive", method: "Enzymatic Direct Clearance", reason: "Assesses diabetic dyslipidaemia (Triglycerides, HDL, LDL, VLDL, Non-HDL)" },
    { name: "Kidney Function Test (KFT)", method: "Jaffe Rate Blanked & Enzymatic Urease", reason: "Serum Creatinine, eGFR, Blood Urea Nitrogen & Uric Acid" },
    { name: "Liver Function Test (LFT)", method: "IFCC Standardised Kinetic", reason: "Screens for non-alcoholic fatty liver disease (MASLD) common in diabetes" },
    { name: "Complete Blood Count (CBC with Smear)", method: "6-Part Differential Flow Cytometry", reason: "Examines 26 parameters for anaemia, infection markers and platelet health" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="diabetes-panel-jsonld"
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
          <span className="text-slate-800 font-bold">Diabetes Monitoring Tests</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              NABL ACCREDITED LAB (MC-6849) · ISO 15189:2022
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Diabetes Monitoring Tests in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Diabetes monitoring commonly involves assessment of long-term glucose control, current glucose status and, depending on the clinical situation, renal, lipid and related metabolic markers.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              QXL provides laboratory testing for diabetes assessment and monitoring with clear specimen requirements, preparation instructions and test-specific turnaround times. The appropriate combination of tests depends on whether the goal is screening, diagnosis, routine follow-up, complication monitoring or clinician-directed investigation.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/book?test=pkg-diabetes"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Book Diabetes Checkup (₹1,999)
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`${WHATSAPP_LINK}?text=Hi%20QXL%20Diagnostics,%20I%20would%20like%20to%20enquire%20about%20the%20Diabetes%20Monitoring%20Panel`}
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
            <div className="text-blue-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Turnaround Time
            </div>
            <div className="text-2xl font-black text-slate-900">12 Hours</div>
            <p className="text-xs text-slate-600">Same-day verified digital reports signed by MD Pathologist & Biochemist.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-amber-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Patient Preparation
            </div>
            <div className="text-2xl font-black text-slate-900">8–10h Fasting</div>
            <p className="text-xs text-slate-600">Overnight fasting mandatory for FBS and lipid profiling. Water permitted.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
            <div className="text-emerald-600 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Home Collection
            </div>
            <div className="text-2xl font-black text-slate-900">Eligible PINs</div>
            <p className="text-xs text-slate-600">Doorstep cold-chain phlebotomy across eligible Bengaluru localities.</p>
          </div>
        </div>

        {/* Included Investigations Breakdown */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">Core Diagnostic Assays</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Key Investigations in the Diabetes Monitoring Panel (62 Parameters)
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl">
              Unlike generic test bundles, QXL’s diabetes evaluations include comprehensive organ complication screening, matching ADA 2026 standards of medical care.
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
                <div className="text-xs text-blue-700 font-medium">Methodology: {assay.method}</div>
                <p className="text-xs text-slate-600">{assay.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Note Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-blue-800 font-extrabold text-sm">
            <Stethoscope className="w-4 h-4" />
            Clinical Guidance & Review Policy
          </div>
          <p className="text-xs sm:text-sm text-blue-900/90 leading-relaxed">
            Diabetes monitoring results must be evaluated alongside clinical history, prescribed medications (insulin, metformin, SGLT2 inhibitors or GLP-1 agonists), and lifestyle factors. In people with haemoglobinopathies or altered red-cell turnover, HbA1c may require correlation with fructosamine or self-monitoring blood glucose logs.
          </p>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">How often should HbA1c be tested in diabetes?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                In adults with type 2 diabetes whose therapy has changed or who are not meeting glycaemic targets, HbA1c is routinely tested every 3 months. In clinically stable patients with consistent control, reassessment twice yearly is generally recommended.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Can I take morning diabetes medicines before the blood draw?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Generally, oral hypoglycaemic agents or morning insulin should be taken with breakfast immediately after the fasting blood draw, rather than during fasting, to avoid hypoglycaemia. Always confirm timing with your treating doctor.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Where is the sample processed?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                All samples are transported under strict cold-chain protocols (2°C–8°C) to QXL’s central reference laboratory at SLN Complex, Mysore Road, Kengeri, Bengaluru 560060, accredited under ISO 15189:2022 (Certificate MC-6849).
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Schedule Your Diabetes Checkup Today</h3>
            <p className="text-sm text-blue-100">
              Convenient home sample collection across Bengaluru or walk-in at Kengeri Reference Lab & Yelahanka North Hub.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/book"
              className="bg-white text-blue-800 font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-blue-50 transition-all shadow-md"
            >
              Book Now
            </Link>
            <a
              href={`tel:${PHONE_E164}`}
              className="bg-blue-900/60 text-white font-extrabold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider hover:bg-blue-900 transition-all border border-white/20"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
