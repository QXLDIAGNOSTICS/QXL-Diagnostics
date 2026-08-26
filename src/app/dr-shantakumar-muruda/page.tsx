import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, GraduationCap, FileText, CheckCircle2, Phone, Mail, ArrowRight, Building2 } from 'lucide-react';
import { SITE_URL, NABL_CERTIFICATE, PHONE_DISPLAY, EMAIL } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Dr. Shantakumar Muruda (MD) | Clinical Biochemist & NABL Lead Assessor",
  description: "Founder & CEO of QXL Diagnostics. MD in Clinical Biochemistry, NABL Lead Assessor with 150+ audits. Specialist in diabetes HPLC, lipid risk, and laboratory quality management.",
  alternates: { canonical: `${SITE_URL}/dr-shantakumar-muruda` },
  openGraph: {
    title: "Dr. Shantakumar Muruda (MD) — Founder & CEO, QXL Diagnostics",
    description: "Clinical Biochemist, NABL Lead Assessor, Laboratory Director at QXL Diagnostics Bengaluru.",
    url: `${SITE_URL}/dr-shantakumar-muruda`,
    type: "profile",
  },
};

export default function DrShantakumarMurudaPage() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/dr-shantakumar-muruda#physician`,
    "name": "Dr. Shantakumar Muruda",
    "jobTitle": "Founder & CEO, Chief Clinical Biochemist",
    "medicalSpecialty": ["Clinical Biochemistry", "Laboratory Quality Management", "Metabolic Diagnostics", "Diabetes & Endocrinology"],
    "description": "Dr. Shantakumar Muruda, MD, is the Founder & CEO of QXL Diagnostics. With over 20 years of experience in Clinical Biochemistry and 150+ NABL ISO 15189 laboratory assessments, he leads clinical operations and quality assurance at QXL.",
    "worksFor": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics Super Speciality Lab",
      "url": SITE_URL
    },
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "Rajiv Gandhi University of Health Sciences (RGUHS)" },
      { "@type": "EducationalOrganization", "name": "PHFI — Public Health Foundation of India" }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "MD Clinical Biochemistry",
        "credentialCategory": "Medical Doctorate"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "NABL Lead Assessor (ISO 15189:2022)",
        "recognizedBy": { "@type": "Organization", "name": "National Accreditation Board for Testing and Calibration Laboratories" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "PHFI Certified Diabetologist",
        "credentialCategory": "Clinical Endocrinology"
      }
    ],
    "knowsAbout": [
      "HbA1c Ion-Exchange HPLC",
      "Friedewald & Direct LDL Cholesterol Calculations",
      "Serum Electrophoresis (SPEP & IFE)",
      "Westgard IQC Multi-Rule Quality Control",
      "NABL ISO 15189 Audit Protocols"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/dr-shantakumar-muruda",
      "https://qxldiagnostics.com/team"
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-sky-400 to-[#2563eb] text-white font-black text-4xl flex items-center justify-center border-4 border-white/20 shadow-xl shrink-0">
              SM
            </div>
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Founder &amp; Chief Clinical Biochemist
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white" style={{ color: '#ffffff' }}>
                Dr. Shantakumar Muruda
              </h1>
              <p className="text-sky-200 font-bold text-base md:text-lg">
                MD (Clinical Biochemistry) · NABL Lead Assessor · PHFI Diabetologist
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-sky-100 font-semibold pt-1">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <Award className="w-4 h-4 text-amber-400" /> 20+ Years Clinical Experience
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 150+ NABL ISO 15189 Lab Assessments
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 grid lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Biography */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Clinical Biography</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dr. Shantakumar Muruda is the Founder and Chief Executive Officer of QXL Diagnostics Super Speciality Laboratory. With over two decades of leadership in laboratory medicine, clinical biochemistry, and hospital diagnostics, Dr. Muruda established QXL to bridge the gap between high-complexity laboratory data and actionable patient care.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                As a senior NABL Lead Assessor having conducted over 150 independent hospital laboratory audits under ISO 15189 standards, Dr. Muruda oversees all quality management systems, multi-rule Westgard internal quality controls, and proficiency testing programs at QXL Diagnostics.
              </p>
            </div>

            {/* Areas of Expertise */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Areas of Laboratory Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Ion-Exchange HPLC HbA1c Quantification",
                  "Cardiovascular Risk Stratification & Lipid Panel",
                  "Liver & Renal Biochemical Function Assays",
                  "Serum Protein Electrophoresis (SPEP) & Immunofixation",
                  "Therapeutic Drug Monitoring (TDM) & Mass Spectrometry",
                  "Subclinical Thyroid & Metabolic Syndrome Workup",
                  "ISO 15189:2022 Quality Management Implementation",
                  "Interference Resolution in South Indian Variant Hb"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 bg-sky-50/70 p-3 rounded-2xl border border-sky-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic & Professional Credentials */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Qualifications &amp; Accreditations</h2>
              <div className="space-y-4 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#2563eb] shrink-0" />
                  <div>
                    <p className="font-extrabold text-sm text-[#0f2d5e]">Doctor of Medicine (MD) — Clinical Biochemistry</p>
                    <p className="text-slate-500 font-medium">Rajiv Gandhi University of Health Sciences (RGUHS)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-extrabold text-sm text-[#0f2d5e]">NABL Lead Assessor (ISO 15189:2022)</p>
                    <p className="text-slate-500 font-medium">Empaneled lead assessor for National Accreditation Board for Testing and Calibration Laboratories (150+ audits conducted nationwide)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-extrabold text-sm text-[#0f2d5e]">Post Graduate Diploma in Diabetes Management</p>
                    <p className="text-slate-500 font-medium">Public Health Foundation of India (PHFI)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supervised Specialities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Supervised Diagnostic Specialities</h2>
              <div className="flex flex-wrap gap-2">
                {["Clinical Biochemistry", "Diabetes Diagnostics", "Endocrinology Panels", "Lipid & Cardiac Biomarkers", "Nutritional Panels", "NABL Quality Assurance", "B2B Reference Services"].map(spec => (
                  <span key={spec} className="bg-slate-100 text-[#0f2d5e] text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Contact & Consultation Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-[#0f2d5e]">Consultant Contact</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                For laboratory consultation, B2B reference partnerships, or report interpretation queries:
              </p>
              <div className="space-y-3 text-xs font-bold text-slate-700">
                <a href={`tel:${PHONE_DISPLAY}`} className="flex items-center gap-2 text-[#2563eb] hover:underline">
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[#2563eb] hover:underline">
                  <Mail className="w-4 h-4" /> {EMAIL}
                </a>
                <div className="flex items-start gap-2 text-slate-600 font-medium">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>Kengeri Main Lab: 3rd Floor, SLN Complex, Mysore Road, Bengaluru 560060</span>
                </div>
              </div>
              <Link href="/for-doctors" className="w-full bg-[#2563eb] text-white font-extrabold py-3 rounded-2xl text-center block text-xs uppercase tracking-wider shadow-xs hover:bg-[#1d4ed8] transition-colors">
                B2B Reference Lab Referral →
              </Link>
            </div>

            {/* Pathologist Team Navigation */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-[#0f2d5e]">QXL Consultant Pathologists</h3>
              <div className="space-y-2 text-xs font-semibold">
                <Link href="/dr-pritilata-rout" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#2563eb] transition-colors">
                  <span>Dr. Pritilata Rout (MD Pathology)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/dr-ajitha-pillai" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#2563eb] transition-colors">
                  <span>Dr. Ajitha Pillai (MD Microbiology)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/dr-naveen-kumar-n" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#2563eb] transition-colors">
                  <span>Dr. Naveen Kumar N (DNB Pathology)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
