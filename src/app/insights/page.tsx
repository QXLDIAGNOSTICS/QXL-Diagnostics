import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, ShieldCheck, AlertTriangle, FileText, ArrowRight, CheckCircle2, Lock, Scale, HelpCircle } from 'lucide-react';
import { SITE_URL, NABL_CERTIFICATE } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "QXL Clinical Insights & Population Health Data Governance | QXL Diagnostics",
  description: "Official Population Health Research & Clinical Data Governance framework for QXL Diagnostics Bengaluru. LIS data verification and methodology protocols.",
  alternates: { canonical: `${SITE_URL}/insights` },
  openGraph: {
    title: "QXL Clinical Insights & Laboratory Data Governance",
    description: "Methodology, data verification hold, and clinical research standards at QXL Diagnostics Bengaluru.",
    url: `${SITE_URL}/insights`,
    type: "website",
  },
};

export default function InsightsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "QXL Clinical Insights & Population Health Data Governance",
    "description": "Clinical data governance, methodology protocols, and LIS data verification standards at QXL Diagnostics Bengaluru.",
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
            <span className="inline-block bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Clinical Laboratory Data Governance
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white" style={{ color: '#ffffff' }}>
              QXL Clinical Insights &amp; Population Health Governance
            </h1>
            <p className="text-sky-100 text-sm md:text-base leading-relaxed mb-6 font-medium">
              A rigorous framework for anonymized, aggregated population health statistics, biomarker epidemiological trends, and diagnostic data verification derived directly from NABL accredited laboratory testing across Bengaluru.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> NABL Accredited Quality ({NABL_CERTIFICATE})
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                <Lock className="w-4 h-4 text-sky-300" /> Strictly Anonymized Secondary LIS Data
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Review & Data Audit Hold Alert */}
      <section className="py-8 max-w-[1260px] mx-auto px-4">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="bg-amber-200 text-amber-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                Medical Review &amp; LIS Audit Hold Active
              </span>
              <span className="text-xs font-bold text-amber-800">Status: Rigorous Methodology Audit</span>
            </div>
            <h2 className="text-xl font-extrabold text-amber-950">
              Clinical Insights Medical Audit Notice
            </h2>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              In accordance with QXL Diagnostics medical authority guidelines, all published population health statistics, sample sizes, and prevalence figures are subject to strict primary LIS (Laboratory Information System) data extraction and statistical validation.
            </p>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              Prior illustrative website copy and unverified statistical estimates have been withdrawn under a <strong>Medical Review Hold</strong>. Only fully validated, reproducible datasets with documented inclusion/exclusion criteria, exact sampling dates, and consultant pathologist review will be released on this portal.
            </p>
          </div>
        </div>
      </section>

      {/* Methodological Standards & Governance Framework */}
      <section className="py-8">
        <div className="max-w-[1260px] mx-auto px-4 space-y-8">
          <div>
            <span className="text-xs text-[#2563eb] font-extrabold uppercase tracking-wider">Research Standards</span>
            <h2 className="text-2xl font-extrabold text-[#0f2d5e]">QXL Laboratory Research Protocol</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Every future clinical dataset published by QXL Diagnostics will strictly adhere to the following methodological criteria:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0f2d5e]">1. LIS Data Derivation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                100% of sample counts, biological reference ranges, and prevalence figures are extracted directly from bidirectional LIS database queries run on calibrated analyzers.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0f2d5e]">2. Standardized Diagnostic Cutoffs</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Diagnostic classifications follow precise clinical guidelines:
              </p>
              <ul className="text-[11px] text-slate-600 space-y-1 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <li>• <strong>HbA1c Prediabetes:</strong> 5.7%–6.4% (ADA / WHO criteria)</li>
                <li>• <strong>HbA1c Diabetes:</strong> ≥6.5% (ADA / WHO criteria)</li>
                <li>• <strong>Vitamin D Deficiency:</strong> &lt;20 ng/mL (Endocrine Society)</li>
                <li>• <strong>eGFR Impairment:</strong> &lt;60 mL/min/1.73m² (KDIGO guidelines)</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0f2d5e]">3. Patient Privacy &amp; DPDP Compliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                All epidemiological queries undergo strict de-identification removing patient identifiers, names, phone numbers, and addresses in full compliance with DPDP 2023 guidelines.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0f2d5e]">4. Sampling &amp; Limitation Transparency</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Every study explicitly documents sampling window, age/gender distributions, inclusion/exclusion criteria, and sampling limitations (e.g. urban self-referred population bias).
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0f2d5e]">5. Medical Director Sign-off</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                No population health report is published without prior review and authorization by Founder &amp; Clinical Biochemist Dr. Shantakumar Muruda (MD) and consultant pathologists.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#2563eb] flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0f2d5e]">6. Verification Queries</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Researchers and medical institutions seeking aggregated data for public health studies can contact our Quality &amp; Research Desk at <a href="mailto:info@qxldiagnostics.com" className="text-[#2563eb] font-bold hover:underline">info@qxldiagnostics.com</a>.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-3">
            <h3 className="text-lg font-extrabold text-[#0f2d5e]">Looking for Clinical Diagnostic Testing?</h3>
            <p className="text-xs text-slate-600 max-w-xl mx-auto font-medium">
              Explore our NABL accredited test catalogue or learn more about our quality control protocols.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <Link href="/tests" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-extrabold px-5 py-2.5 rounded-full transition-all">
                Browse Test Catalogue
              </Link>
              <Link href="/quality-accreditation" className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-full transition-all">
                View NABL Accreditation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
