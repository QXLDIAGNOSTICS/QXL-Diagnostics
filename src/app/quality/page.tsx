import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Award, CheckCircle2, Thermometer, AlertCircle, FileCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { SITE_URL, NABL_CERTIFICATE, PHONE_DISPLAY } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Quality Systems & NABL MC-6849 Accreditation | QXL Diagnostics",
  description: "Official Quality & Accreditation Hub for QXL Diagnostics Bengaluru. NABL Certificate MC-6849, ISO 15189:2022 standards, Westgard IQC, EQAS, cold-chain transport, and critical value protocols.",
  keywords: ["NABL accreditation MC-6849", "ISO 15189 laboratory bangalore", "Westgard IQC diagnostic lab", "cold chain sample transport", "critical value alert protocol"],
  alternates: { canonical: `${SITE_URL}/quality` },
};

export default function QualityHubPage() {
  const qualitySchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${SITE_URL}/quality#organization`,
    "name": "QXL Diagnostics Super Speciality Lab",
    "url": SITE_URL,
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Laboratory Accreditation",
      "name": "NABL Accreditation Certificate MC-6849",
      "description": "ISO 15189:2022 Medical Laboratory Accreditation by National Accreditation Board for Testing and Calibration Laboratories (NABL), DST/QCI",
      "recognizedBy": {
        "@type": "Organization",
        "name": "NABL (National Accreditation Board for Testing and Calibration Laboratories)",
        "url": "https://www.nabl-india.org"
      }
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qualitySchema) }} />
      <Header />

      {/* NABL Accreditation Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white py-3 px-4 text-center border-b border-emerald-700/50 shadow-md">
        <div className="max-w-[1260px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-sm sm:text-base font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-xs"></span>
            <span className="text-white font-black">Doctor-Led NABL Accredited Diagnostic Lab in Bengaluru</span>
          </div>
          <p className="text-xs text-emerald-100 font-bold shrink-0">
            NABL MC-6849 • 300+ Tests • Free Home Collection Across Bengaluru
          </p>
        </div>
      </div>
      <section className="bg-gradient-to-r from-[#0f2d5e] via-[#164263] to-[#1e40af] text-white py-16">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 text-amber-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-300" />
              NABL Accreditation Certificate MC-6849
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Quality Assurance &amp; ISO 15189 Laboratory Systems
            </h1>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
              At QXL Diagnostics, quality is not a static certificate — it is an active daily operating system built under ISO 15189:2022 standards and directed by Clinical Biochemist &amp; NABL Lead Assessor Dr. Shantakumar Muruda.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 max-w-[1260px] mx-auto px-4">
        
        {/* Certificate Verification Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Verifiable Accreditation
            </span>
            <h2 className="text-2xl font-black text-[#0f2d5e]">NABL Certificate MC-6849</h2>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              QXL Diagnostics Super Speciality Lab (Qualitify Healthtech Pvt Ltd) holds active NABL accreditation under Certificate Number <strong>MC-6849</strong> operating to <strong>ISO 15189:2022</strong>. We encourage every patient and referring doctor to verify our scope directly on the NABL portal.
            </p>
          </div>
          <a
            href="https://www.nabl-india.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs px-6 py-3.5 rounded-full shadow-md transition-all flex items-center gap-2 shrink-0 uppercase tracking-wider"
          >
            <span>Verify on NABL Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Key Quality Pillars */}
        <div className="mb-14">
          <div className="mb-8 text-center">
            <span className="text-[10px] font-black text-[#2563eb] uppercase tracking-widest block mb-1">Pillars of Clinical Precision</span>
            <h2 className="text-3xl font-black text-[#0f2d5e]">How We Protect Every Report</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. IQC */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-lg">Multi-Rule Westgard IQC</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Internal Quality Control (IQC) reagents are run every single shift across all automated biochemistry and immunoassay platforms. Runs are accepted only when multi-rule Westgard criteria (1-2s, 1-3s, 2-2s, R-4s, 4-1s, 10x) pass validation.
              </p>
            </div>

            {/* 2. EQAS */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-lg">EQAS Proficiency Testing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Participation in national and international External Quality Assessment Schemes (EQAS). Blinded proficiency samples are evaluated to benchmark our analytical performance against peer laboratories worldwide.
              </p>
            </div>

            {/* 3. Cold Chain */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-lg">Cold-Chain Sample Transport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-analytical stability is maintained using calibrated insulated cooler boxes with gel packs (2°C–8°C for serum/plasma). Temperature logging ensures enzyme activity and cellular integrity are preserved during home-to-lab transport.
              </p>
            </div>

            {/* 4. Critical Panic Values */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-lg">Critical Panic Value Escalation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Life-threatening abnormal results (such as critical glucose, severe electrolyte imbalance, or acute troponin elevation) trigger immediate telephone escalation to the patient and treating physician before digital report release.
              </p>
            </div>

            {/* 5. Barcode Traceability */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-lg">100% Barcode Sample Tracking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every vacutainer tube is barcoded at bedside bedside collection. Automated bidirectionally interfaced analyzers read sample IDs directly, eliminating manual transcription errors and sample mix-ups.
              </p>
            </div>

            {/* 6. Specialist Review */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-lg">Doctor-Led Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every abnormal report undergoes delta-check evaluation against patient history and is reviewed and validated by consultant pathologists (MD Biochemistry, MD Pathology, Senior Histopathologist) before release.
              </p>
            </div>

          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-900 to-[#0f2d5e] text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-black text-white">Experience Accredited Diagnostic Quality</h3>
          <p className="text-xs text-blue-100 max-w-xl mx-auto font-medium">
            Book your blood test or full body checkup online for free home collection across Bengaluru.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/book" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-md transition-all">
              Book a Test Now
            </Link>
            <Link href="/dr-shantakumar-muruda" className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all border border-white/20">
              Meet Dr. Shantakumar Muruda
            </Link>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
