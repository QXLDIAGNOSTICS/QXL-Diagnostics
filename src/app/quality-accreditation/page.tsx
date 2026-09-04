import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  Thermometer, 
  BarChart3, 
  Lock, 
  Stethoscope, 
  Clock, 
  ExternalLink, 
  ChevronRight, 
  Microscope, 
  Cpu, 
  UserCheck, 
  AlertTriangle,
  Download,
  Building2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import { SITE_URL, NABL_CERTIFICATE, ISO_STANDARD, PHONE_DISPLAY, PHONE_E164, EMAIL } from '@/lib/businessInfo';
import { ACCREDITATION_DETAILS, ACCREDITATION_SCOPE } from '@/config/accreditation';

export const metadata: Metadata = {
  title: "Quality Assurance & NABL Accreditation (MC-6849) | QXL Diagnostics",
  description: "Official Quality & NABL Accreditation Portal for QXL Diagnostics Bengaluru. ISO 15189:2022 standards, Certificate MC-6849, Westgard IQC, EQAS proficiency testing, cold-chain integrity, and critical value protocols.",
  keywords: ["NABL Accreditation MC-6849", "ISO 15189:2022 laboratory bangalore", "Westgard IQC diagnostic lab", "sample traceability barcode", "critical value alert protocol"],
  alternates: { canonical: `${SITE_URL}/quality-accreditation` },
  openGraph: {
    title: "NABL Accreditation & Clinical Quality Governance | QXL Diagnostics",
    description: "ISO 15189:2022 accredited diagnostic testing, Westgard multi-rule IQC, and pathologist-verified reporting.",
    url: `${SITE_URL}/quality-accreditation`,
    type: "website",
  },
};

export default function QualityAccreditationPage() {
  const qualitySchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${SITE_URL}/quality-accreditation#organization`,
    "name": "QXL Diagnostics Super Speciality Lab",
    "url": SITE_URL,
    "telephone": PHONE_E164,
    "email": EMAIL,
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Medical Laboratory Accreditation",
      "name": `NABL Accreditation Certificate ${NABL_CERTIFICATE}`,
      "description": `ISO 15189:2022 Medical Laboratory Accreditation by National Accreditation Board for Testing and Calibration Laboratories (NABL)`,
      "recognizedBy": {
        "@type": "Organization",
        "name": ACCREDITATION_DETAILS.accreditationBody,
        "url": ACCREDITATION_DETAILS.verificationPortalUrl
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is QXL Diagnostics' NABL Accreditation Certificate Number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `QXL Diagnostics Super Speciality Laboratory holds active NABL accreditation under Certificate Number ${NABL_CERTIFICATE} operating strictly in compliance with ISO 15189:2022 international standards.`
        }
      },
      {
        "@type": "Question",
        "name": "What does NABL ISO 15189:2022 accreditation mean for patients and doctors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NABL ISO 15189:2022 accreditation confirms that a medical laboratory has undergone formal independent assessment of technical competence, staff qualifications, equipment calibration, biological reference ranges, sample traceability, and daily quality control systems."
        }
      },
      {
        "@type": "Question",
        "name": "How does QXL Diagnostics ensure sample identity and prevent sample swaps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "QXL employs 100% bedside primary tube barcoding at specimen collection. Automated analyzers read sample barcodes directly via bidirectional LIS interfacing, completely eliminating manual transcription and tube swapping."
        }
      },
      {
        "@type": "Question",
        "name": "What is QXL's Critical Panic Value Protocol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When a laboratory test result falls outside safe physiological thresholds (e.g., severe electrolyte derangements, acute low platelets, or extreme blood glucose), QXL mandates immediate direct telephone notification to the ordering physician or patient before digital report release."
        }
      }
    ]
  };

  const qualityPillars = [
    {
      icon: Award,
      title: `NABL ISO 15189:2022 Standard`,
      desc: `Formally accredited by NABL (Certificate No. ${NABL_CERTIFICATE}) for technical competence, valid test methods, calibrated instrumentation, and certified medical staff.`,
    },
    {
      icon: BarChart3,
      title: "Daily Westgard Multi-Rule IQC",
      desc: "Every automated biochemistry and immunoassay analyzer undergoes multi-level daily Internal Quality Control validation enforcing Westgard rules (1-2s, 1-3s, 2-2s, R-4s, 4-1s, 10x).",
    },
    {
      icon: CheckCircle2,
      title: "External Quality Assurance (EQAS/PT)",
      desc: "QXL participates in national and international External Quality Assessment Schemes (EQAS), evaluating blinded proficiency testing samples against peer laboratories globally.",
    },
    {
      icon: Thermometer,
      title: "Cold-Chain Temperature Monitoring",
      desc: "From bedside home collection to central laboratory, all blood specimens are transported in insulated cooler boxes at strictly logged 2°C–8°C temperatures to protect specimen stability.",
    },
    {
      icon: Lock,
      title: "100% Barcode Primary Tube Tracking",
      desc: "Bedside barcoding combined with bidirectional LIS instrument interfacing ensures 100% sample identity integrity with zero manual data entry swaps.",
    },
    {
      icon: Stethoscope,
      title: "Consultant Pathologist Verification",
      desc: "Every abnormal, high-complexity, or delta-check flagged investigation report is individually reviewed and authorized by consultant pathologists and clinical biochemists.",
    },
  ];

  return (
    <main className="bg-slate-50 min-h-screen text-slate-900 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qualitySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-16 border-b border-sky-900 relative overflow-hidden">
        <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-amber-300" />
            <span>NABL ACCREDITED LABORATORY ({NABL_CERTIFICATE})</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight" style={{ color: '#ffffff' }}>
            NABL Accreditation &amp; Clinical Quality Systems
          </h1>
          <p className="text-base md:text-lg text-sky-100 max-w-3xl font-medium leading-relaxed mb-6">
            Doctor-led diagnostic excellence operating strictly under NABL Accreditation ({NABL_CERTIFICATE}), international ISO 15189:2022 standards, daily multi-rule Westgard IQC, and 100% pathologist authorization.
          </p>
          <div className="flex items-center text-xs text-sky-200 gap-2 font-semibold flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white font-bold">Quality &amp; Accreditation</span>
          </div>
        </div>
      </section>

      {/* Official Certificate Verification Card */}
      <section className="py-8 max-w-[1260px] mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
              Verifiable National Accreditation
            </span>
            <h2 className="text-2xl font-black text-[#0f2d5e]">NABL Certificate {NABL_CERTIFICATE}</h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed font-medium">
              QXL Diagnostics Super Speciality Laboratory (Qualitify Healthtech Pvt Ltd) maintains active NABL accreditation under Certificate Number <strong>{NABL_CERTIFICATE}</strong> adhering strictly to <strong>ISO 15189:2022</strong>. We encourage doctors, health systems, and patients to verify our official scope.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={ACCREDITATION_DETAILS.verificationPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold text-xs px-6 py-3.5 rounded-full shadow-md transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              <span>Verify on NABL Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Scope of Accreditation */}
      <section className="py-12 bg-white border-t border-b border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="bg-blue-50 text-[#2563eb] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Accredited Laboratory Departments
            </span>
            <h2 className="text-3xl font-black text-[#0f2d5e] mt-3">Scope of NABL Accreditation</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 font-medium">
              ISO 15189:2022 technical evaluation applies to investigations across our core diagnostic departments:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACCREDITATION_SCOPE.map((dept, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563eb] flex items-center justify-center shrink-0 font-bold">
                  <Microscope className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-slate-800">{dept}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Key Quality Pillars */}
      <section className="py-16 bg-[#f8faff]">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-blue-100 text-[#2563eb] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Quality Assurance Framework
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f2d5e] mt-3">Six Pillars of QXL Diagnostic Accuracy</h2>
            <p className="text-slate-600 text-sm mt-2 font-medium">
              How QXL protects patient safety and analytical precision across every sample processed in Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mb-5 border border-blue-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment & Critical Value Protocol Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4 space-y-12">
          
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Equipment Calibration */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#2563eb] flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-[#0f2d5e]">Automated Platform Calibration</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  QXL operates fully automated biochemistry, immunoassay, and haematology analyzers from industry leaders (Roche, Sysmex, Mindray). Daily 2-point calibration and routine preventative maintenance ensure zero drift in analytical precision.
                </p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700">
                ✓ Automated Bidirectional LIS Interfacing
              </div>
            </div>

            {/* Critical Panic Value Policy */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>CRITICAL PANIC VALUE PROTOCOL</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">Immediate Physician Notification</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  When a lab result falls outside safe physiological thresholds (e.g. critical blood glucose, severe potassium derangements, acute troponin), QXL mandates immediate verbal phone escalation to the ordering doctor or patient before digital release.
                </p>
              </div>
              <div className="pt-2 text-xs text-sky-300 font-bold">
                Quality Desk Hotline: <a href={`tel:${PHONE_E164}`} className="underline text-white">{PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>

          {/* Medical Leadership */}
          <div className="bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 rounded-3xl p-8 space-y-4">
            <h3 className="text-xl font-extrabold text-[#0f2d5e] flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#2563eb]" />
              Medical Governance &amp; Pathologist Supervision
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Quality at QXL Diagnostics is directed by <strong>Dr. Shantakumar Muruda, MD (Biochemistry)</strong>, an empaneled NABL Lead Assessor with 150+ laboratory audits, alongside Senior Consultant Histopathologist <strong>Dr. Pritilata Rout, MD (Pathology)</strong> (NIMHANS alumna), Consultant Pathologist <strong>Dr. Naveen Kumar N</strong>, and Consultant Microbiologist <strong>Dr. Ajitha Pillai</strong>.
            </p>
          </div>

        </div>
      </section>

      <FaqSection />
      <Footer />
    </main>
  );
}
