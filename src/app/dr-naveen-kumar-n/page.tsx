import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, Phone, Mail, ArrowRight, Building2 } from 'lucide-react';
import { SITE_URL, NABL_CERTIFICATE, PHONE_DISPLAY, EMAIL } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "Dr. Naveen Kumar N (DNB Pathology) | Consultant Haematopathologist",
  description: "Consultant Pathologist & Haematologist at QXL Diagnostics Bengaluru. Specialist in CBC cell morphology, peripheral blood smears, flow cytometry, and autoimmune panels.",
  alternates: { canonical: `${SITE_URL}/dr-naveen-kumar-n` },
  openGraph: {
    title: "Dr. Naveen Kumar N — Consultant Pathologist, QXL Diagnostics",
    description: "Pathologist & Haematology Specialist at QXL Diagnostics Bengaluru.",
    url: `${SITE_URL}/dr-naveen-kumar-n`,
    type: "profile",
  },
};

export default function DrNaveenKumarPage() {
  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/dr-naveen-kumar-n#physician`,
    "name": "Dr. Naveen Kumar N",
    "jobTitle": "Consultant Pathologist & Haematologist",
    "medicalSpecialty": ["Pathology", "Haematology", "Autoimmune Serology", "Coagulation"],
    "description": "Dr. Naveen Kumar N is a Consultant Pathologist at QXL Diagnostics specializing in haematopathology, peripheral blood morphology, flow cytometry immunophenotyping, and autoimmune ANA IFA reporting.",
    "worksFor": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics Super Speciality Lab",
      "url": SITE_URL
    },
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "M.S. Ramaiah Medical College, Bangalore" },
      { "@type": "EducationalOrganization", "name": "National Board of Examinations (NBE)" }
    ],
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "DCP — Diploma in Clinical Pathology" },
      { "@type": "EducationalOccupationalCredential", "name": "DNB Pathology — Diplomate of National Board" }
    ],
    "knowsAbout": [
      "Peripheral Blood Smear Cell Morphology",
      "ANA Immunofluorescence (IFA) Staining Patterns",
      "5-Part Differential Leukocyte Automated Flags",
      "Coagulation Profiles (PT/INR, aPTT, D-Dimer)",
      "Hemoglobinopathy HPLC Electrophoresis"
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-emerald-400 to-[#2563eb] text-white font-black text-4xl flex items-center justify-center border-4 border-white/20 shadow-xl shrink-0">
              NK
            </div>
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-block bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Consultant Pathologist &amp; Haematologist
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white" style={{ color: '#ffffff' }}>
                Dr. Naveen Kumar N
              </h1>
              <p className="text-sky-200 font-bold text-base md:text-lg">
                DCP, DNB (Pathology) · M.S. Ramaiah Alumnus
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-sky-100 font-semibold pt-1">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <Award className="w-4 h-4 text-amber-400" /> 8+ Years Diagnostic Experience
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> NABL Quality Assurance Specialist
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Clinical Biography</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dr. Naveen Kumar N is a Consultant Pathologist at QXL Diagnostics Super Speciality Laboratory. An alumnus of M.S. Ramaiah Medical College, Bengaluru, Dr. Naveen completed his DNB in Pathology and has dedicated his career to haematopathology, bone marrow reporting, and autoimmune diagnostics.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                At QXL Diagnostics, Dr. Naveen personally examines peripheral blood smears whenever automated 5-part differential cell counters flag abnormal morphology, atypical lymphocytes, or immature blasts — ensuring diagnostic precision for patients undergoing Dengue, leukaemia, or anaemia evaluations.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Laboratory Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Peripheral Smear Microscopic Examination",
                  "Automated CBC Automated Counter Calibration",
                  "ANA IFA Nuclear Staining Pattern Interpretation",
                  "Hemoglobinopathy Mapping via HPLC",
                  "Coagulation Profile & D-Dimer Assays",
                  "Bone Marrow Aspiration & Biopsy Reporting",
                  "Rheumatoid Arthritis & Anti-CCP Serology",
                  "Immune Thrombocytopenia (ITP) Platelet Trends"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 bg-sky-50/70 p-3 rounded-2xl border border-sky-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Qualifications</h2>
              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#2563eb] shrink-0" />
                  <div>
                    <p className="font-extrabold text-sm text-[#0f2d5e]">Diplomate of National Board (DNB) — Pathology</p>
                    <p className="text-slate-500 font-medium">National Board of Examinations (NBE), New Delhi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-[#2563eb] shrink-0" />
                  <div>
                    <p className="font-extrabold text-sm text-[#0f2d5e]">Diploma in Clinical Pathology (DCP)</p>
                    <p className="text-slate-500 font-medium">M.S. Ramaiah Medical College, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-[#0f2d5e]">Consultant Contact</h3>
              <div className="space-y-3 text-xs font-bold text-slate-700">
                <a href={`tel:${PHONE_DISPLAY}`} className="flex items-center gap-2 text-[#2563eb] hover:underline">
                  <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[#2563eb] hover:underline">
                  <Mail className="w-4 h-4" /> {EMAIL}
                </a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-[#0f2d5e]">Other QXL Consultants</h3>
              <div className="space-y-2 text-xs font-semibold">
                <Link href="/dr-shantakumar-muruda" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#2563eb] transition-colors">
                  <span>Dr. Shantakumar Muruda (MD Biochemistry)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/dr-pritilata-rout" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#2563eb] transition-colors">
                  <span>Dr. Pritilata Rout (MD Pathology)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/dr-ajitha-pillai" className="flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#2563eb] transition-colors">
                  <span>Dr. Ajitha Pillai (MD Microbiology)</span>
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
