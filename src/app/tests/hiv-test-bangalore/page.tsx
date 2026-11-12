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
  AlertCircle,
  Award,
  Stethoscope,
  MapPin,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import HivWindowCalculator from '@/components/sexual-health/HivWindowCalculator';
import PepUrgentBanner from '@/components/sexual-health/PepUrgentBanner';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "HIV Test in Bangalore | 4th Gen Duo ₹945 | Same Day Report | QXL Diagnostics",
  description:
    "Confidential 4th Generation HIV test in Bengaluru at ₹945. NABL Accredited laboratory testing for HIV-1/2 antibodies and p24 antigen. Doorstep blood collection, same-day report within 6 hours, confidential testing with privacy-conscious collection.",
  alternates: {
    canonical: `${SITE_URL}/tests/hiv-test-bangalore`,
  },
  openGraph: {
    title: "HIV Test in Bangalore | 4th Gen p24 Duo ₹945 | QXL Diagnostics",
    description:
      "NABL Accredited 4th Gen HIV ECLIA test in Bengaluru. p24 antigen and antibody detection in 6 hours. Confidential home collection.",
    url: `${SITE_URL}/tests/hiv-test-bangalore`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function HivTestBangalorePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": `${SITE_URL}/tests/hiv-test-bangalore#test`,
        "name": "HIV-1/2 Antigen and Antibody Screening (4th Gen Duo)",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-01",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "4th Generation electrochemiluminescence immunoassay (ECLIA) detecting HIV-1 p24 antigen and HIV-1/HIV-2 antibodies in human serum.",
        "usedToDiagnose": [
          { "@type": "MedicalCondition", "name": "Human Immunodeficiency Virus Infection" }
        ],
        "significance": "Shortens the diagnostic window period to 18–45 days post-exposure by identifying circulating p24 capsid antigen before complete antibody seroconversion.",
        "normalRange": "Non-reactive (Index < 1.0)",
        "offers": {
          "@type": "Offer",
          "price": "945",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/tests/hiv-test-bangalore`
        }
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/hiv-test-bangalore#webpage`,
        "url": `${SITE_URL}/tests/hiv-test-bangalore`,
        "name": "HIV Test Near Me & HIV Test Price Bangalore",
        "description": "Comprehensive medical guide to 4th generation HIV testing in Bengaluru, costs, window periods, and confidential booking.",
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
          { "@type": "ListItem", "position": 3, "name": "HIV Test Bangalore", "item": `${SITE_URL}/tests/hiv-test-bangalore` }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: "What is the cost of an HIV test in Bangalore at QXL Diagnostics?",
      a: "The 4th Generation HIV-1/2 Antigen & Antibody Duo test is priced at ₹945 at QXL Diagnostics. This includes both p24 antigen and antibody detection, processed on automated chemiluminescent immunoassay analyzers with same-day digital reporting."
    },
    {
      q: "How early can this 4th generation test detect HIV after exposure?",
      a: "The 4th generation assay detects infection between 18 and 45 days after exposure. The viral p24 antigen is typically detectable in blood before antibodies have formed. Per CDC guidelines, a negative 4th generation test from a blood draw at 45 days is >99% conclusive."
    },
    {
      q: "Will my test result be kept completely confidential?",
      a: "Yes. QXL Diagnostics enforces strict confidentiality. You can opt for numeric barcode labeling where personal details are masked in laboratory worklists. Reports are password-encrypted and accessible only to you."
    },
    {
      q: "What happens if an HIV screening test comes back reactive?",
      a: "A reactive screening result is never reported as an automatic diagnosis. In accordance with National AIDS Control Organisation (NACO) and WHO guidelines, reactive samples are reflexively confirmed using supplementary assays. Our medical team offers compassionate, confidential post-test counselling."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="hiv-test-bangalore-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">HIV Test Bangalore</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#2563eb]/30 border border-sky-400/40 text-sky-200 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#f59e0b]" /> 4th Generation ECLIA Duo Assay
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                HIV Test in Bangalore (4th Generation p24 Ag/Ab)
              </h1>

              <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
                Advanced NABL Accredited HIV screening detecting both p24 antigen and HIV-1/2 antibodies. Fast, discrete, and doctor-reviewed with reports delivered in 6 hours.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold pt-2">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Lock className="w-3.5 h-3.5 text-[#f59e0b]" /> 100% Confidential
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" /> 6-Hour Turnaround
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                  <FlaskConical className="w-3.5 h-3.5 text-sky-300" /> Serum (No Fasting)
                </span>
              </div>
            </div>

            {/* Pricing Booking Card */}
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">Verified Lab Price</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#0f2d5e]">₹945</span>
                  <span className="text-sm text-slate-400 line-through">₹1,450</span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">35% Savings</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-y border-slate-150 py-3">
                <div className="flex justify-between">
                  <span>Accreditation:</span>
                  <strong className="text-slate-800">NABL Accredited (MC-6849)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Home Collection:</span>
                  <strong className="text-emerald-700">Doorstep Collection Available</strong>
                </div>
                <div className="flex justify-between">
                  <span>Report Time:</span>
                  <strong className="text-slate-800">Within 6 Hours</strong>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-md active:scale-95 text-center"
                >
                  <span>Book HIV 4th Gen Test</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to book a confidential HIV 4th Gen Duo test (₹945).")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Urgent PEP Notice */}
        <PepUrgentBanner />

        {/* Clinical Deep Dive */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8 text-slate-700 text-sm leading-relaxed">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e] mb-3">
                Understanding the 4th Generation HIV Antigen/Antibody Duo Test
              </h2>
              <p>
                The 4th generation HIV test is the international gold standard recommended by the US CDC, WHO, and NACO for primary HIV screening. Unlike earlier 3rd generation assays that only detected host antibodies, the 4th generation test simultaneously detects:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2 font-medium">
                <li><strong>HIV-1 p24 Antigen:</strong> The viral capsid core protein produced during active viral replication in early acute infection.</li>
                <li><strong>HIV-1 and HIV-2 IgM &amp; IgG Antibodies:</strong> The immune response proteins produced by the human body in response to the virus.</li>
              </ul>
              <p className="mt-3">
                Because p24 antigen appears in the bloodstream before the immune system produces detectable quantities of antibodies, this test shortens the diagnostic &ldquo;window period&rdquo; by several weeks.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-black text-[#0c4a6e]">
                Testing Timeline: When is an HIV Test Conclusive?
              </h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">1</span>
                  <div>
                    <strong>Days 0 to 3 (&lt;72 Hours) — Emergency PEP Window:</strong>
                    <p className="text-slate-600 mt-0.5">Too early for diagnostic antibodies or p24 antigen. If an exposure occurred within this timeframe, consult a doctor immediately for Post-Exposure Prophylaxis (PEP).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">2</span>
                  <div>
                    <strong>Days 18 to 44 — 4th Generation Detection Window:</strong>
                    <p className="text-slate-600 mt-0.5">p24 antigen peaks during this phase. Over 95% of infections are detectable by day 28.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">3</span>
                  <div>
                    <strong>Day 45 — CDC 99% Conclusive Milestone:</strong>
                    <p className="text-slate-600 mt-0.5">A 4th generation lab test from a blood draw is considered &gt;99% conclusive at 45 days per CDC guidelines.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">4</span>
                  <div>
                    <strong>Day 90 — 100% Definitive Window:</strong>
                    <p className="text-slate-600 mt-0.5">Definitive exclusion for all test types, fulfilling all global clinical criteria.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0c4a6e] mb-3">
                How Sample Collection Works (Clinic or Home Collection)
              </h3>
              <p>
                QXL Diagnostics provides trained phlebotomy specialists who collect a 3 mL venous blood sample using sterile, single-use vacuum collection tubes.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs sm:text-sm">
                <li>No fasting required; you may eat and drink normally before testing.</li>
                <li>Doorstep collection available across North, South, East, and West Bengaluru.</li>
                <li>Strict temperature-regulated cold chain ensures biological integrity.</li>
                <li>Anonymous numerical barcode reporting available upon patient request.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <span className="text-xs font-black text-[#f59e0b] uppercase tracking-wider block">Doctor-Led Quality</span>
              <h4 className="text-xl font-black leading-snug">
                NABL Accredited Laboratory Testing in Bengaluru
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Processed in our central facility (NABL Certificate MC-6849). Every positive or borderline sample undergoes strict verification under NACO algorithms before reporting.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${PHONE_E164}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                Related Sexual Health Tests
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/tests/vdrl-rpr-test" className="text-[#2563eb] hover:underline font-bold block">
                    → Syphilis VDRL / RPR &amp; TPHA Dual Serology
                  </Link>
                </li>
                <li>
                  <Link href="/tests/chlamydia-gonorrhea-pcr" className="text-[#2563eb] hover:underline font-bold block">
                    → Chlamydia &amp; Gonorrhea Urine PCR (NAAT)
                  </Link>
                </li>
                <li>
                  <Link href="/tests/std-sti-panel" className="text-[#2563eb] hover:underline font-bold block">
                    → Comprehensive 10-Target STI Screen
                  </Link>
                </li>
                <li>
                  <Link href="/health-hub/hiv-test-window-period" className="text-[#2563eb] hover:underline font-bold block">
                    → HIV Test Window Period Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Calculator */}
        <section>
          <HivWindowCalculator />
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
            Frequently Asked Questions About HIV Testing
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-black text-[#0c4a6e]">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/tests/hiv-test-bangalore" />
      </main>
    </div>
  );
}

