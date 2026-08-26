import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, EMAIL } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Blood Test Fasting Instructions & Guidelines | QXL Diagnostics",
  description: "Complete guide on blood test fasting requirements: 10–12 hour fasting for Lipid Profile & Fasting Blood Sugar, water intake rules, and morning timing.",
  alternates: { canonical: `${SITE_URL}/faq/fasting-instructions` },
};

export default function FastingInstructionsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which blood tests require 10–12 hours of overnight fasting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fasting Blood Sugar (FBS), Lipid Profile (Total Cholesterol, Triglycerides, LDL, HDL), Fasting Insulin, HOMA-IR, and Comprehensive Metabolic Panels require 10 to 12 hours of overnight fasting. Only plain water is permitted during the fasting window."
        }
      },
      {
        "@type": "Question",
        "name": "Can I drink water during a blood test fast?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, drinking moderate amounts of plain water is allowed and encouraged before blood collection. Water prevents dehydration and makes vein access easier during phlebotomy. Avoid tea, coffee, milk, juices, or sugar-sweetened beverages."
        }
      },
      {
        "@type": "Question",
        "name": "Can I take my regular morning medications before a blood test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blood pressure and cardiac medications can usually be taken with water unless instructed otherwise by your doctor. However, diabetes medications (insulin, metformin) should NOT be taken until after your fasting blood sample is drawn to prevent hypoglycemia."
        }
      }
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-gradient-to-br from-[#0d2e42] to-[#0f2d5e] text-white py-12">
        <div className="max-w-[1000px] mx-auto px-4">
          <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-3">
            Patient Preparation Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white" style={{ color: '#ffffff' }}>
            Blood Test Fasting Instructions &amp; Preparation
          </h1>
          <p className="text-sky-100 text-sm sm:text-base font-medium max-w-2xl">
            Clear clinical guidelines on overnight fasting, water consumption, and medication timing for accurate laboratory testing at QXL Diagnostics Bengaluru.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1000px] mx-auto px-4 space-y-8">
          
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Test-Specific Fasting Window Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <span className="text-amber-900 font-extrabold text-sm block mb-1">10–12 Hours Fasting Required</span>
                <p className="text-slate-600 font-medium">Fasting Blood Glucose (FBS), Lipid Profile, Fasting Insulin, HOMA-IR, Vitamin B12, Iron Profile.</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <span className="text-emerald-900 font-extrabold text-sm block mb-1">No Fasting Required (Non-Fasting)</span>
                <p className="text-slate-600 font-medium">HbA1c, Thyroid Profile (TSH/T3/T4), Complete Blood Count (CBC), Dengue Serology, Blood Grouping, CRP, ESR.</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Key Rules During Fasting</h2>
            <ul className="space-y-3 text-xs font-semibold text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Drink Plain Water:</strong> You may drink plain water. Staying hydrated keeps veins prominent for phlebotomy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Avoid Beverages:</strong> Do NOT drink tea, coffee, milk, juices, or carbonated drinks during the fasting window.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Avoid Smoking &amp; Alcohol:</strong> Refrain from smoking or alcohol consumption for at least 12–24 hours prior to blood collection.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0f2d5e] text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-extrabold text-sm">Need help confirming your test fasting requirements?</p>
              <p className="text-xs text-sky-200">Call QXL Laboratory customer care at {PHONE_DISPLAY}</p>
            </div>
            <Link href="/book" className="bg-[#2563eb] text-white font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-blue-600 shrink-0">
              Book Home Collection →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
