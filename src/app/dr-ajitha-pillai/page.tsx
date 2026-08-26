import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, EMAIL } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Dr. Ajitha Pillai (MD Microbiology) | Senior Clinical Microbiologist",
  description: "Senior Consultant Clinical Microbiologist at QXL Diagnostics Bengaluru. Specialist in infectious disease serology, bacterial culture sensitivity, molecular PCR, and allergy panels.",
  alternates: { canonical: `${SITE_URL}/dr-ajitha-pillai` },
  openGraph: {
    title: "Dr. Ajitha Pillai — Senior Consultant Clinical Microbiologist",
    description: "Infectious Disease & Microbiology Specialist at QXL Diagnostics Bengaluru.",
    url: `${SITE_URL}/dr-ajitha-pillai`,
    type: "profile",
  },
};

export default function DrAjithaPillaiPage() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/dr-ajitha-pillai#physician`,
    "name": "Dr. Ajitha Pillai",
    "jobTitle": "Senior Consultant Clinical Microbiologist",
    "medicalSpecialty": ["Microbiology", "Infectious Diseases", "Molecular Diagnostics", "Allergy Testing"],
    "description": "Dr. Ajitha Pillai is a Senior Consultant Clinical Microbiologist at QXL Diagnostics. She oversees infection serology, automated blood culture sensitivity, molecular PCR assays, and IgE allergy testing.",
    "worksFor": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics Super Speciality Lab",
      "url": SITE_URL
    },
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "Medical College Trivandrum, University of Kerala" }
    ],
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "MD Microbiology" }
    ],
    "knowsAbout": [
      "Automated Blood & Urine Culture Sensitivity (VITEK-2)",
      "Dengue, Typhoid, Hepatitis Infection Serology",
      "Real-Time PCR Molecular Testing (TB-PCR, Viral Load)",
      "Specific IgE Food & Inhalant Allergy Panels",
      "Hospital Infection Control & Antibiogram Reporting"
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />

      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-sky-400 to-emerald-600 text-white font-black text-4xl flex items-center justify-center border-4 border-white/20 shadow-xl shrink-0">
              AP
            </div>
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-block bg-sky-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Senior Consultant Clinical Microbiologist
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white" style={{ color: '#ffffff' }}>
                Dr. Ajitha Pillai
              </h1>
              <p className="text-sky-200 font-bold text-base md:text-lg">
                MD (Microbiology) · Medical College Trivandrum Alumna
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-sky-100 font-semibold pt-1">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <Award className="w-4 h-4 text-amber-400" /> 18+ Years Clinical Microbiology Experience
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Molecular PCR &amp; Antibiogram Lead
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Clinical Biography</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dr. Ajitha Pillai is a Senior Consultant Clinical Microbiologist heading the Infectious Disease and Molecular Microbiology department at QXL Diagnostics Super Speciality Laboratory. With 18+ years of expertise, Dr. Pillai specializes in automated microbial identification, antibiotic susceptibility testing (MIC values), viral serology, and food/inhalant IgE allergy panels.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                She leads QXL Diagnostics' critical value alert protocol for blood cultures and urgent dengue/typhoid notifications to treating physicians across Bengaluru.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Laboratory Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Automated Blood & Urine Culture Sensitivity (MIC Values)",
                  "Dengue NS1 Antigen & IgM/IgG Serology",
                  "Real-Time PCR Molecular Testing (TB-PCR, Viral Load)",
                  "Comprehensive Food & Inhalant IgE Allergy Panels",
                  "Hepatitis B & C Chemiluminescent Immunoassay",
                  "Fungal Culture & KOH Microscopic Examination",
                  "Hospital Cumulative Antibiogram Generation",
                  "Stool Culture & Parasitology Examinations"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 bg-sky-50/70 p-3 rounded-2xl border border-sky-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-[#0f2d5e]">Consultant Contact</h3>
              <div className="space-y-3 text-xs font-bold text-slate-700">
                <a href={`tel:${PHONE_DISPLAY}`} className="flex items-center gap-2 text-[#2563eb] hover:underline"><Phone className="w-4 h-4" /> {PHONE_DISPLAY}</a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[#2563eb] hover:underline"><Mail className="w-4 h-4" /> {EMAIL}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
