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
  Layers,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import { PACKAGE_MASTER } from '@/lib/packageMaster';

export const metadata: Metadata = {
  title: "Full Body Health Checkup in Bangalore | Prices & Home Collection | QXL",
  description:
    "Doctor-curated preventive full body health checkups in Bangalore. Compare Quick Fit (₹1,770), Q-Screen (₹1,999) & Q-Master Pro (₹4,600). NABL Accredited lab with free home sample collection.",
  alternates: {
    canonical: `${SITE_URL}/full-body-checkup-bangalore`,
  },
  openGraph: {
    title: "Full Body Health Checkup in Bangalore | Prices & Home Collection | QXL",
    description: "Doctor-curated full body health checkups in Bangalore: Quick Fit (80 params, ₹1,770) & Q-Master Pro (92 params, ₹4,600). NABL Accredited laboratory.",
    url: `${SITE_URL}/packages/full-body-checkup-bangalore`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function FullBodyCheckupPackagesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/packages/full-body-checkup-bangalore#page`,
        "name": "Full Body Health Checkup Packages in Bengaluru",
        "description": "Preventive laboratory health checkups comparing Quick Fit, Q-Screen Diabetes, and Q-Master Pro packages at QXL Diagnostics.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Health Packages", "item": `${SITE_URL}/packages` },
            { "@type": "ListItem", "position": 3, "name": "Full Body Health Checkup", "item": `${SITE_URL}/packages/full-body-checkup-bangalore` }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between Quick Fit and Q-Master Health Pro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Quick Fit (80 parameters, ₹1,770) covers vital baseline health including CBC, HbA1c, Lipids, Liver, Kidney, and Vitamin D. Q-Master Health Pro (92 parameters, ₹4,600) adds advanced cardiovascular ApoB, ApoA1, HOMA-IR insulin resistance, Vitamin B12, and comprehensive organ biomarkers."
            }
          },
          {
            "@type": "Question",
            "name": "What are the fasting rules for a full body checkup?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An overnight fast of 10 to 12 hours is mandatory for lipid fractions and fasting blood glucose. Plain drinking water is permitted and encouraged to maintain good hydration."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly are reports delivered?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Routine full body packages are reported within 12 hours on the same day. Extended 117-parameter Ultra Full Body checkups with specialized referral assays are reported within 24 hours."
            }
          }
        ]
      }
    ]
  };

  const packagesList = [
    {
      id: "quick-fit",
      name: "Quick Fit Comprehensive Package",
      code: "PKG-QF-001",
      price: 1770,
      mrp: 3540,
      discount: "50% OFF",
      params: "80 Parameters",
      tat: "12 Hours (Same Day)",
      fasting: "10-12h Overnight Fasting",
      popular: true,
      description: "Essential annual health screening for active adults, professionals, and fitness enthusiasts.",
      includes: [
        "Complete Blood Count (CBC 26 Parameters with Peripheral Smear)",
        "Erythrocyte Sedimentation Rate (ESR)",
        "Fasting Plasma Glucose (FBS)",
        "HbA1c (Glycated Haemoglobin by HPLC)",
        "Lipid Profile Comprehensive (Cholesterol, HDL, LDL, VLDL, Triglycerides)",
        "Liver Function Test (LFT 11 Parameters)",
        "Kidney Function Test (KFT / RFT 9 Parameters)",
        "Thyroid Stimulating Hormone (TSH Ultrasensitive)",
        "25-Hydroxy Vitamin D3",
        "Urine Routine & Microscopic Examination (18 Parameters)"
      ]
    },
    {
      id: "q-screen",
      name: "Q-Screen Diabetes & Metabolic Health",
      code: "PKG-QSD-001",
      price: 1999,
      mrp: 3999,
      discount: "50% OFF",
      params: "62 Parameters",
      tat: "12 Hours (Same Day)",
      fasting: "8-10h Overnight Fasting",
      popular: false,
      description: "Specialized endocrine and microvascular complication screening for diabetic & prediabetic adults.",
      includes: [
        "Fasting Plasma Glucose & HPLC HbA1c",
        "Urine Albumin-to-Creatinine Ratio (UACR)",
        "Fasting Serum Insulin & Estimated Average Glucose (eAG)",
        "Lipid Profile Comprehensive",
        "Kidney Function Test (Creatinine, Urea, Uric Acid, eGFR)",
        "Liver Function Test (IFCC Kinetic)",
        "Complete Hemogram with Smear"
      ]
    },
    {
      id: "q-master",
      name: "Q-Master Health Pro Executive Checkup",
      code: "PKG-QMASTER-001",
      price: 4600,
      mrp: 9200,
      discount: "50% OFF",
      params: "92 Parameters",
      tat: "12–24 Hours",
      fasting: "10-12h Overnight Fasting",
      popular: true,
      description: "Comprehensive executive diagnostic evaluation with advanced cardiovascular, insulin and nutritional markers.",
      includes: [
        "All Quick Fit Core Assays (CBC, LFT, KFT, Lipids, HbA1c, TSH)",
        "Apolipoprotein B (ApoB) & Apolipoprotein A1 (ApoA1)",
        "High-Sensitivity CRP (hs-CRP Cardiac Risk)",
        "Serum Ferritin (Iron Stores)",
        "Serum Vitamin B12 (Cobalamin)",
        "25-OH Vitamin D3",
        "Fasting Serum Insulin & HOMA-IR Calculation",
        "Urine Microalbumin / Creatinine Ratio (UACR)",
        "Serum Electrolytes (Sodium, Potassium, Chloride)"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="full-body-packages-jsonld"
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
          <span className="text-slate-800 font-bold">Full Body Health Checkup</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              NABL ACCREDITED LAB (MC-6849) · ISO 15189:2022
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Full Body Health Checkup in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              A preventive laboratory health check can help establish a baseline for metabolic, liver, kidney, thyroid, haematological and selected nutritional health markers.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              QXL offers doctor-curated preventive health packages with transparent test lists, preparation instructions, pricing and test-specific turnaround times. The exact investigations included in each package are generated directly from QXL&apos;s controlled Package Master so the website, booking cart and laboratory order remain consistent.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#packages-grid"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Compare Health Check Packages
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`${WHATSAPP_LINK}?text=Hi%20QXL%20Diagnostics,%20I%20would%20like%20to%20enquire%20about%20Full%20Body%20Health%20Checkup%20Packages`}
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
      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Why Choose QXL Highlights */}
        <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Why Choose QXL Diagnostics in Bengaluru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Doctor-led environment</strong> with MD Pathologist & Biochemist clinical supervision.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Transparent test lists</strong> with zero hidden fees or vague parameter counts.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Pincode-based home collection</strong> with temperature-logged 2°C–8°C cold chains.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Digital reports within 12h</strong> via secure WhatsApp, SMS and PDF access.</span>
            </div>
          </div>
        </section>

        {/* Packages Comparison Grid */}
        <section id="packages-grid" className="space-y-6">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">Curated Preventative Panels</span>
            <h2 className="text-3xl font-black text-slate-900">Compare Full Body Health Packages</h2>
            <p className="text-sm text-slate-600">
              Each package reflects governed pricing and parameter counts synchronized across the booking system.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packagesList.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-3xl p-6 sm:p-8 border transition-all ${
                  pkg.popular
                    ? "border-blue-600 shadow-xl bg-gradient-to-b from-blue-50/40 to-white relative"
                    : "border-slate-200 shadow-sm bg-white"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Most Recommended
                  </span>
                )}

                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{pkg.code}</span>
                    <h3 className="text-xl font-black text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1 border-t border-slate-100">
                    <span className="text-3xl font-black text-slate-900">₹{pkg.price}</span>
                    <span className="text-sm text-slate-400 line-through">₹{pkg.mrp}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {pkg.discount}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100 font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{pkg.params}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{pkg.tat}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Key Investigations:</span>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {pkg.includes.map((inc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                  <Link
                    href={`/book?package=${pkg.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    Book This Package
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`${WHATSAPP_LINK}?text=Hi%20QXL%20Diagnostics,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(pkg.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Note Alert */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            Clinical Governance & Limitations Note
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Preventive health packages are laboratory screening tools designed to evaluate physiological trends and baseline organ functions. They do not replace a full physician physical examination and should not be represented as diagnosing every possible medical condition. Abnormal findings should always be evaluated by a qualified doctor.
          </p>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Is home collection free in Bengaluru?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Scheduled home sample collection is free for orders meeting the minimum booking threshold (₹1,000) across eligible Bengaluru service areas. Enter your PIN code during online checkout to confirm instant eligibility.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">Can I drink tea or coffee before a fasting checkup?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                No. Tea, coffee, milk, or sweetened drinks stimulate gastric secretions, insulin release, and metabolic pathways that skew blood glucose and liver enzymes. Only plain water is permitted during the 10 to 12-hour fasting window.
              </p>
            </div>
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-extrabold text-slate-900 text-sm">How do I access my laboratory reports?</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Once clinically authorized by our pathologist, a secure direct download link is instantly dispatched to your registered WhatsApp number and SMS. You can also view historical reports on the patient dashboard.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
