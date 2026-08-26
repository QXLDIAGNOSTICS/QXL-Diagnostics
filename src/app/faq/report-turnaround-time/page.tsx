import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ShieldCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Report Turnaround Time (TAT) & Delivery Schedule | QXL Diagnostics",
  description: "Check QXL Diagnostics report processing times: 6-hour turnaround for routine CBC & Glucose, same-day digital PDF reports via WhatsApp and Email.",
  alternates: { canonical: `${SITE_URL}/faq/report-turnaround-time` },
};

export default function ReportTurnaroundTimePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly will I get my blood test reports from QXL Diagnostics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Routine tests like Complete Blood Count (CBC), Fasting Glucose, Liver Function Tests (LFT), Kidney Function Tests (KFT), and Dengue serology are delivered within 6 to 12 hours on the same day. Specialized assays like Biopsy Histopathology or ANA Profiles take 24 to 48 hours."
        }
      },
      {
        "@type": "Question",
        "name": "How will I receive my diagnostic report?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will receive an automated WhatsApp notification with a direct download link and an encrypted PDF report attached to your registered email address as soon as senior consultant doctors sign off your results."
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
            Service Timelines
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-white" style={{ color: '#ffffff' }}>
            Report Turnaround Time (TAT) &amp; Delivery Schedule
          </h1>
          <p className="text-sky-100 text-sm sm:text-base font-medium max-w-2xl">
            Detailed clinical turnaround schedules for routine pathology, hormone panels, microbiology cultures, and histopathology at QXL Diagnostics Bengaluru.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-[1000px] mx-auto px-4 space-y-8">
          
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Test Processing Schedule Table</h2>
            <div className="space-y-3 text-xs font-semibold">
              {[
                { test: "Routine Blood & Urine (CBC, Sugar, LFT, KFT, Lipid)", tat: "6 – 12 Hours (Same Day)", badge: "Same Day" },
                { test: "Thyroid & Hormone Panels (TSH, T3, T4, Vitamin D3, B12)", tat: "6 – 12 Hours (Same Day)", badge: "Same Day" },
                { test: "HbA1c Gold-Standard HPLC Assay", tat: "6 – 8 Hours", badge: "Same Day" },
                { test: "Autoimmune ANA IFA & ENA Profiles", tat: "24 Hours", badge: "Next Day" },
                { test: "Blood & Urine Culture Sensitivity (VITEK-2)", tat: "48 – 72 Hours (Growth dependent)", badge: "Microbiology" },
                { test: "Surgical Biopsy Histopathology & IHC", tat: "48 – 72 Hours", badge: "Specialist Review" },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
                  <div>
                    <span className="font-extrabold text-[#0f2d5e] text-sm block">{row.test}</span>
                    <span className="text-slate-500 font-medium">{row.tat}</span>
                  </div>
                  <span className="bg-sky-100 text-[#2563eb] text-[10px] font-black px-2.5 py-1 rounded-full shrink-0">
                    {row.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f2d5e] text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-extrabold text-sm">Track your existing booking report status online</p>
              <p className="text-xs text-sky-200">Login with your registered phone number or call {PHONE_DISPLAY}</p>
            </div>
            <Link href="/report" className="bg-[#2563eb] text-white font-extrabold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-blue-600 shrink-0">
              Download Report →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
