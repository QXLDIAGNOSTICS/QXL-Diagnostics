import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, EMAIL } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Dr. Pritilata Rout (MD Pathology) | Senior Consultant Histopathologist",
  description: "Senior Consultant Histopathologist at QXL Diagnostics Bengaluru. NIMHANS alumna specializing in tissue biopsies, FNAC, Pap smears, and immunohistochemistry (IHC).",
  alternates: { canonical: `${SITE_URL}/dr-pritilata-rout` },
  openGraph: {
    title: "Dr. Pritilata Rout — Senior Consultant Histopathologist",
    description: "Histopathology & Cytopathology Specialist at QXL Diagnostics Bengaluru.",
    url: `${SITE_URL}/dr-pritilata-rout`,
    type: "profile",
  },
};

export default function DrPritilataRoutPage() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/dr-pritilata-rout#physician`,
    "name": "Dr. Pritilata Rout",
    "jobTitle": "Senior Consultant Histopathologist & Cytopathologist",
    "medicalSpecialty": ["Pathology", "Histopathology", "Cytopathology", "Onco-Pathology"],
    "description": "Dr. Pritilata Rout is a Senior Consultant Histopathologist at QXL Diagnostics. An alumna of NIMHANS, she specializes in surgical pathology, tumor immunohistochemistry, FNAC, and PAP smears.",
    "worksFor": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics Super Speciality Lab",
      "url": SITE_URL
    },
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "National Institute of Mental Health and Neurosciences (NIMHANS)" }
    ],
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "MD Pathology (NIMHANS)" }
    ],
    "knowsAbout": [
      "Surgical Tissue Biopsy Reporting",
      "Immunohistochemistry (IHC) Biomarker Staining",
      "Fine Needle Aspiration Cytology (FNAC)",
      "Liquid-Based Pap Smear Cervical Screening",
      "Frozen Section Intraoperative Consultations"
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />

      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-purple-400 to-[#2563eb] text-white font-black text-4xl flex items-center justify-center border-4 border-white/20 shadow-xl shrink-0">
              PR
            </div>
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-block bg-purple-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Senior Consultant Histopathologist
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white" style={{ color: '#ffffff' }}>
                Dr. Pritilata Rout
              </h1>
              <p className="text-sky-200 font-bold text-base md:text-lg">
                MD (Pathology) · NIMHANS Alumna
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-sky-100 font-semibold pt-1">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <Award className="w-4 h-4 text-amber-400" /> 15+ Years Surgical Pathology Expertise
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> NIMHANS Neuropathology Alumna
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
                Dr. Pritilata Rout is a Senior Consultant Histopathologist leading the Surgical Pathology and Cytopathology department at QXL Diagnostics Super Speciality Laboratory. Having trained at the prestigious National Institute of Mental Health and Neurosciences (NIMHANS), Dr. Rout brings deep expertise in surgical tissue margin evaluation, neuropathology, endocrine pathology, and tumor biomarker profiling.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dr. Rout evaluates all core biopsy samples, endoscopic biopsies, FNAC smears, and liquid-based Pap smears submitted to QXL Diagnostics by hospital partners and surgical specialists across Bengaluru.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Laboratory Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Surgical Tissue Biopsy & Resection Margins",
                  "Immunohistochemistry (IHC) Biomarker Panels",
                  "Fine Needle Aspiration Cytology (FNAC)",
                  "Liquid-Based Cervical Pap Smear Screening",
                  "Frozen Section Intraoperative Pathology",
                  "Neuropathology & CNS Tumor Grading",
                  "Endocrine & Thyroid Nodule Cytology",
                  "Gastrointestinal & Liver Biopsy Interpretation"
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
