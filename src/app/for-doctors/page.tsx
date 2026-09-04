import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, FileText, Download, Building2, Stethoscope, Clock, AlertTriangle, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { SITE_URL, NABL_CERTIFICATE, ISO_STANDARD, PHONE_DISPLAY, EMAIL } from '@/lib/businessInfo';

export const metadata: Metadata = {
  title: "For Doctors & Reference Lab Services Bangalore | QXL Diagnostics",
  description: "B2B reference laboratory services, hospital lab outsourcing, critical value alerts, and specialist pathologist consultation in Bengaluru. NABL Accredited (MC-6849).",
  alternates: { canonical: `${SITE_URL}/for-doctors` },
  keywords: [
    "reference lab Bangalore",
    "speciality reference laboratory Bangalore",
    "B2B diagnostic lab Bangalore",
    "hospital laboratory management Bangalore",
    "outsourced laboratory testing Bangalore",
    "lab to lab referral Bengaluru"
  ],
  openGraph: {
    title: "For Doctors & Hospital Reference Laboratory Services | QXL Diagnostics",
    description: "Partner with QXL Diagnostics for specialized histopathology, molecular PCR, flow cytometry, autoimmune panels, and B2B reference testing in Bengaluru.",
    url: `${SITE_URL}/for-doctors`,
    type: "website",
  },
};

export default function ForDoctorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "B2B Reference Laboratory Services & Clinician Portal — QXL Diagnostics",
    "description": "Information for treating physicians, hospitals, and nursing homes seeking reference laboratory testing, critical value reporting, and pathologist consultation in Bengaluru.",
    "url": `${SITE_URL}/for-doctors`,
    "provider": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics Super Speciality Lab",
      "url": SITE_URL,
      "hasCredential": `NABL Accreditation ${NABL_CERTIFICATE}`
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Physician &amp; Reference Laboratory Hub
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white" style={{ color: '#ffffff' }}>
              QXL Diagnostics — Doctor-Led Reference Laboratory
            </h1>
            <p className="text-sky-100 text-sm md:text-base leading-relaxed mb-6 font-medium">
              Comprehensive B2B reference laboratory support for hospitals, nursing homes, polyclinics, and private practitioners across Bengaluru. Outsource your specialized pathology, histopathology, molecular PCR, and autoimmune testing to NABL Accredited experts.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`tel:${PHONE_DISPLAY}`}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Lab Doctor ({PHONE_DISPLAY})
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> B2B Partner Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Banner */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-[1260px] mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs font-extrabold text-slate-700">
          <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" /> NABL Accredited ({NABL_CERTIFICATE})
          </span>
          <span className="flex items-center gap-1.5 text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200">
            <Activity className="w-4 h-4" /> {ISO_STANDARD} Medical Laboratory Quality Standards
          </span>
          <span className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
            <Stethoscope className="w-4 h-4" /> 4 Consultant Pathologists &amp; Biochemists
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 space-y-12">

          {/* Core Reference Services */}
          <div>
            <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-2">B2B &amp; Reference Laboratory Services</h2>
            <p className="text-slate-600 text-sm font-medium mb-6">Designed to expand your hospital or clinic&apos;s diagnostic capabilities with zero capital expenditure.</p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Histopathology & IHC",
                  desc: "Surgical biopsy processing, frozen section consultation, FNAC, Pap smears, and immunohistochemistry panels directed by Dr. Pritilata Rout (NIMHANS alumna).",
                  icon: FileText,
                  badge: "24–48h TAT"
                },
                {
                  title: "Autoimmune & Immunofluorescence",
                  desc: "ANA by IFA (HEp-2), ENA 12-antibody quantitative profile, Anti-CCP, ANCA, and complement levels reviewed by Dr. Naveen Kumar N (DNB Pathology).",
                  icon: Activity,
                  badge: "Same-Day / 24h"
                },
                {
                  title: "Molecular PCR & Infectious Disease",
                  desc: "Quantitative viral load, Real-Time TB-PCR, Dengue serology, multiplex pathogen panels, and hospital antibiogram reporting directed by Dr. Ajitha Pillai (MD Microbiology).",
                  icon: Stethoscope,
                  badge: "High Priority"
                },
                {
                  title: "HPLC Diabetes & Hb Variants",
                  desc: "Ion-exchange HPLC for precision HbA1c and thalassemia hemoglobinopathy mapping under Dr. Shantakumar Muruda (MD Biochemistry).",
                  icon: ShieldCheck,
                  badge: "6-Hour TAT"
                },
                {
                  title: "Hospital Lab Management",
                  desc: "End-to-end outsourcing of hospital satellite laboratories, including NABL Accreditation compliance, Westgard IQC setup, and technician staffing.",
                  icon: Building2,
                  badge: "Turnkey Solution"
                },
                {
                  title: "Cold-Chain Logistics Network",
                  desc: "13 dedicated phlebotomy and sample transport runners covering hospital sample pick-ups across all Bengaluru zones 7 AM – 9 PM daily.",
                  icon: Clock,
                  badge: "Bengaluru Wide"
                }
              ].map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div key={idx} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#2563eb] flex items-center justify-center border border-sky-100">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200">
                          {service.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-2">{service.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Values Policy */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <h2 className="text-xl font-extrabold text-amber-900">QXL Critical Laboratory Values Notification Policy</h2>
            </div>
            <p className="text-amber-900 text-sm leading-relaxed font-medium">
              Whenever a laboratory result crosses a predefined life-threatening threshold (e.g., Potassium &gt;5.5 mEq/L, Platelets &lt;50,000/µL, Hemoglobin &lt;6.0 g/dL, or Troponin-I elevation), QXL Diagnostics activates an immediate direct verbal call to the referring doctor or hospital duty officer before releasing the written PDF report.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs font-extrabold text-amber-900">
              <div className="bg-white/80 p-3 rounded-2xl border border-amber-200">Potassium &gt;5.5 or &lt;2.8 mEq/L</div>
              <div className="bg-white/80 p-3 rounded-2xl border border-amber-200">Platelets &lt;50,000 /µL</div>
              <div className="bg-white/80 p-3 rounded-2xl border border-amber-200">Serum Creatinine &gt;4.0 mg/dL</div>
              <div className="bg-white/80 p-3 rounded-2xl border border-amber-200">Positive Malarial Parasite / Blasts</div>
            </div>
          </div>

          {/* Sample Stability & Logistics */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#0f2d5e] border-b border-gray-100 pb-3">Sample Transport &amp; Stability Guidelines</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-[#0f2d5e] text-sm block mb-1">Cold-Chain Temperature</span>
                <p className="text-slate-600">All serum, plasma, and whole blood samples travel in insulated cooler boxes maintained strictly between 2°C and 8°C with digital gel ice packs.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-[#0f2d5e] text-sm block mb-1">Vacuum Tube Barcoding</span>
                <p className="text-slate-600">Every sample tube is barcoded at the patient site prior to centrifugation, eliminating sample mix-up or labeling ambiguity.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="font-extrabold text-[#0f2d5e] text-sm block mb-1">Histopathology Fixation</span>
                <p className="text-slate-600">Biopsy tissue specimens must be immersed in 10% Neutral Buffered Formalin (minimum 10:1 formalin-to-tissue volume ratio).</p>
              </div>
            </div>
          </div>

          {/* Contact & Consultation CTA */}
          <div className="bg-[#0f2d5e] text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-white">Connect with a QXL Laboratory Consultant</h2>
              <p className="text-sky-200 text-sm font-medium">Discuss complex cases, request custom panel pricing, or arrange hospital sample pickup.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${PHONE_DISPLAY}`}
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-md"
              >
                Call: {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider border border-white/20"
              >
                Email Partner Team
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
