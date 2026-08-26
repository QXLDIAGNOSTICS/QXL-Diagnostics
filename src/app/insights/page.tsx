import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, ShieldCheck, Calendar, FileText, ArrowRight, Download, PieChart, TrendingUp, Users } from 'lucide-react';
import { SITE_URL, NABL_CERTIFICATE } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "QXL Clinical Insights & Bengaluru Health Reports | QXL Diagnostics",
  description: "Anonymized, aggregated clinical laboratory insights and population health data on Vitamin D deficiency, diabetes prediabetes rates, and thyroid trends across Bengaluru.",
  alternates: { canonical: `${SITE_URL}/insights` },
  openGraph: {
    title: "QXL Clinical Insights & Population Health Reports",
    description: "Original clinical data, epidemiology trends, and laboratory statistics from QXL Diagnostics Bengaluru.",
    url: `${SITE_URL}/insights`,
    type: "website",
  },
};

const INSIGHT_REPORTS = [
  {
    id: "vitamin-d-bengaluru-2026",
    title: "QXL Bengaluru Vitamin D Deficiency Study 2026",
    period: "January – July 2026",
    sampleSize: "14,250 Serum 25-OH Vitamin D Tests",
    keyFinding: "78.4% of urban Bengaluru adults tested had Vitamin D deficiency (<20 ng/mL) or insufficiency (20–30 ng/mL).",
    author: "Dr. Shantakumar Muruda, MD",
    slug: "vitamin-d-bengaluru-study-2026",
    statHighlights: [
      { label: "Deficient (<20 ng/mL)", value: "54.2%" },
      { label: "Insufficient (20–30 ng/mL)", value: "24.2%" },
      { label: "Optimal (>40 ng/mL)", value: "9.6%" },
    ],
    summary: "Analysis of 14,250 anonymized 25-OH Vitamin D immunoassay results processed at QXL Diagnostics across 40+ Bengaluru localities. Young working professionals aged 25–40 showed the highest deficiency rate (82.1%), strongly associated with indoor desk lifestyles."
  },
  {
    id: "diabetes-prediabetes-bengaluru-2026",
    title: "QXL Bengaluru Diabetes & Prediabetes Screening Report",
    period: "Q1–Q2 2026",
    sampleSize: "18,900 HPLC HbA1c Tests",
    keyFinding: "31.8% of screened individuals met WHO criteria for Prediabetes (HbA1c 5.7%–6.4%), with 18.5% meeting Diabetes criteria (HbA1c ≥6.5%).",
    author: "Dr. Shantakumar Muruda, MD",
    slug: "diabetes-prediabetes-bengaluru-report-2026",
    statHighlights: [
      { label: "Normal (<5.7%)", value: "49.7%" },
      { label: "Prediabetes (5.7–6.4%)", value: "31.8%" },
      { label: "Diabetes (≥6.5%)", value: "18.5%" },
    ],
    summary: "Gold-standard HPLC HbA1c measurements reveal a substantial prediabetic burden in urban Bengaluru. Notably, 42% of individuals with prediabetic HbA1c levels had normal fasting blood sugar, highlighting the importance of HbA1c for early screening."
  },
  {
    id: "womens-thyroid-trends-2026",
    title: "QXL Women's Thyroid Health & Anti-TPO Autoimmune Report",
    period: "Q1–Q2 2026",
    sampleSize: "9,600 Thyroid Profiles & Anti-TPO Antibodies",
    keyFinding: "22.4% of tested Bengaluru women exhibited TSH >4.5 mIU/L, with 68% of hypothyroid cases testing positive for Anti-TPO autoantibodies.",
    author: "Dr. Naveen Kumar N, DNB",
    slug: "womens-thyroid-autoimmune-trends-2026",
    statHighlights: [
      { label: "Subclinical Hypothyroid", value: "16.1%" },
      { label: "Overt Hypothyroid", value: "6.3%" },
      { label: "Anti-TPO Positive", value: "68.0%" },
    ],
    summary: "Autoimmune Hashimoto's thyroiditis is the leading driver of hypothyroidism among women in Bengaluru. Subclinical hypothyroidism was most frequently detected in women aged 28–45 seeking routine fertility or wellness screening."
  },
  {
    id: "senior-citizen-biomarker-2026",
    title: "QXL Senior Citizen Biomarker & Renal Function Report",
    period: "Q1–Q2 2026",
    sampleSize: "6,400 Preventive Health Panels (Age 60+)",
    keyFinding: "38.2% of tested seniors had an eGFR below 60 mL/min/1.73m² (Stage 3 CKD), despite 45% having 'normal' serum creatinine levels.",
    author: "Dr. Shantakumar Muruda, MD",
    slug: "senior-citizen-biomarker-renal-report-2026",
    statHighlights: [
      { label: "eGFR <60 (Stage 3 CKD)", value: "38.2%" },
      { label: "Hyperuricaemia (>7.2)", value: "29.1%" },
      { label: "Elevated hs-CRP", value: "34.5%" },
    ],
    summary: "This report underscores why relying solely on serum creatinine in elderly patients leads to under-diagnosing renal decline. Automatic eGFR reporting at QXL identified early renal impairment in over 2,400 senior citizens."
  }
];

export default function InsightsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "QXL Clinical Insights & Population Health Data",
    "description": "Anonymized clinical laboratory data, epidemiological findings, and biomarker reports from QXL Diagnostics Bengaluru.",
    "url": `${SITE_URL}/insights`,
    "publisher": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics",
      "url": SITE_URL
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Epidemiological &amp; Clinical Data
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white" style={{ color: '#ffffff' }}>
              QXL Clinical Insights &amp; Health Reports
            </h1>
            <p className="text-sky-100 text-sm md:text-base leading-relaxed mb-6 font-medium">
              Anonymized, aggregated population health statistics, biomarker trends, and disease prevalence studies generated from NABL-accredited diagnostic laboratory testing across Bengaluru.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> NABL Quality Governance ({NABL_CERTIFICATE})
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                <BarChart3 className="w-4 h-4 text-sky-300" /> Fully Anonymized Aggregated Data
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Privacy Banner */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-[1260px] mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-600">
          <span>🔒 <strong>Privacy &amp; Data Governance:</strong> All studies use strictly anonymized, de-identified secondary data compliant with DPDP 2023 guidelines.</span>
          <span className="font-extrabold text-[#0f2d5e]">Medical Oversight: Dr. Shantakumar Muruda, MD</span>
        </div>
      </div>

      {/* Reports Grid */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#2563eb] font-extrabold uppercase tracking-wider">Original Laboratory Research</span>
              <h2 className="text-2xl font-extrabold text-[#0f2d5e]">Published Population Health Studies</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {INSIGHT_REPORTS.map((report) => (
              <div key={report.id} className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <span className="text-xs font-bold text-slate-400">{report.period}</span>
                    <span className="bg-sky-50 text-[#2563eb] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-sky-100">
                      N = {report.sampleSize}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0f2d5e] leading-snug">
                    {report.title}
                  </h3>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-xs font-bold leading-relaxed">
                    💡 <strong>Key Finding:</strong> {report.keyFinding}
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    {report.summary}
                  </p>

                  {/* Stat Highlights */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {report.statHighlights.map((stat, idx) => (
                      <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                        <span className="text-lg font-black text-[#2563eb] block">{stat.value}</span>
                        <span className="text-[10px] text-slate-500 font-bold leading-tight block mt-0.5">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500">Principal Investigator: {report.author}</span>
                  <span className="text-[#2563eb] font-extrabold flex items-center gap-1">Full Methodology <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
