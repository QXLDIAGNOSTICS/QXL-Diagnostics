import React from 'react';
import Link from 'next/link';
import { ShieldCheck, UserCheck, Award, Stethoscope, CheckCircle2, AlertCircle, FileText, ArrowRight, Microchip, Activity, HelpCircle } from 'lucide-react';

export default function DoctorLedManifesto() {
  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 text-slate-900 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 space-y-14">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 border border-blue-200 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
            <UserCheck className="w-4 h-4 text-blue-600" />
            Doctor-Led Laboratory Medicine
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2d5e] tracking-tight leading-tight">
            Doctor-Led Diagnostics. <br />
            Reference-Lab Expertise. <br />
            <span className="text-blue-600">Quality You Can Verify.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            At QXL Diagnostics, laboratory medicine is led by doctors—not just machines. Every diagnostic result represents more than a number; it is part of a patient&apos;s clinical story.
          </p>
        </div>

        {/* The 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden group hover:border-blue-300 transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-extrabold text-lg">01</div>
            <h3 className="font-extrabold text-slate-900 text-lg">Doctor-Led Diagnostics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Qualified laboratory specialists support technically reliable and clinically meaningful diagnostic testing under physician oversight.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden group hover:border-cyan-300 transition-all">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center font-extrabold text-lg">02</div>
            <h3 className="font-extrabold text-slate-900 text-lg">Advanced Reference Testing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Routine investigations and super-speciality diagnostics (autoimmune, molecular, SPEP, IHC) integrated within a broad reference laboratory model.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-extrabold text-lg">03</div>
            <h3 className="font-extrabold text-slate-900 text-lg">Verified Quality Systems</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Testing is supported by NABL-accredited laboratory processes (MC-6849), ISO 15189:2022 standards, and daily multi-rule Westgard IQC.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative overflow-hidden group hover:border-amber-300 transition-all">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-extrabold text-lg">04</div>
            <h3 className="font-extrabold text-slate-900 text-lg">Medically Reviewed Content</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Patient and clinician education is developed strictly around accepted principles of laboratory medicine—not generic health marketing.
            </p>
          </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: When Laboratory Interpretation Matters */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              When Laboratory Interpretation Matters
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Many laboratory results cannot be interpreted correctly from a single number alone:
            </p>
            <ul className="space-y-2.5 pt-2">
              <li className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>A positive ANA test</strong> does not automatically mean a patient has an autoimmune disease.</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>An elevated ferritin result</strong> does not always indicate excess iron store overload.</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>An abnormal HbA1c result</strong> may require consideration of haemoglobinopathies or altered red-cell survival.</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>An M-band on serum protein electrophoresis</strong> requires immunofixation and free light-chain testing.</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>An elevated tumour marker</strong> does not by itself diagnose cancer in asymptomatic individuals.</span>
              </li>
            </ul>
          </div>

          {/* Section 2: Reference Laboratory for Doctors & Hospitals */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              Reference Laboratory for Doctors & Hospitals
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              QXL Diagnostics functions as a trusted B2B reference laboratory partner for hospitals, nursing homes, specialist clinics, and polyclinics across Karnataka.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <strong className="block text-slate-900">Autoimmune Assays</strong>
                <span className="text-slate-500">ANA IFA, ENA Profile, Anti-CCP, ANCA PR3/MPO</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <strong className="block text-slate-900">Protein Electrophoresis</strong>
                <span className="text-slate-500">SPEP, Immunofixation, Serum Free Light Chains</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <strong className="block text-slate-900">Cardiometabolic Risk</strong>
                <span className="text-slate-500">ApoB, ApoA1, Lp(a), hs-CRP, Homocysteine</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <strong className="block text-slate-900">Histo-Cytopathology</strong>
                <span className="text-slate-500">Biopsy, FNAC, Pap Smear, Special Stains, IHC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Diagnostic Pathway */}
        <div className="bg-[#0f2d5e] text-white p-8 md:p-12 rounded-3xl space-y-6 border border-slate-700 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-[#D69A18] block">End-to-End Quality Pathway</span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#D69A18] leading-tight">From Sample to Clinical Clarity</h3>
            <p className="text-slate-200 text-xs sm:text-sm font-medium pt-1">Every QXL laboratory result travels through 9 standardized clinical quality steps.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 text-center pt-4">
            {[
              { step: "1", title: "Test Selection" },
              { step: "2", title: "Preparation" },
              { step: "3", title: "Collection" },
              { step: "4", title: "Transport" },
              { step: "5", title: "Lab Analysis" },
              { step: "6", title: "IQC Verification" },
              { step: "7", title: "Specialist Review" },
              { step: "8", title: "Digital Report" },
              { step: "9", title: "Clinician Action" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur border border-white/20 p-3 rounded-xl">
                <span className="w-6 h-6 bg-[#D69A18] text-white font-black rounded-full text-xs flex items-center justify-center mx-auto mb-1.5 shadow-xs">{item.step}</span>
                <span className="text-[11px] font-bold text-white leading-tight block">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed FAQ Section */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-[#0f2d5e]">Doctor-Led Diagnostics FAQ</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">What does &quot;doctor-led diagnostic laboratory&quot; mean?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A doctor-led laboratory combines modern analytical technology with oversight from qualified laboratory medical specialists (Pathologists, Biochemists, Microbiologists). Complex and clinically significant findings are evaluated within a medical framework rather than treated simply as automated numbers.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">What does NABL accreditation mean?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                NABL accreditation (Certificate MC-6849) indicates that a laboratory has been independently assessed against defined technical and quality requirements under ISO 15189:2022 standards for competence, equipment calibration, personnel qualifications, and traceability.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Why are test limitations explicitly stated on QXL pages?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No laboratory investigation is perfect. Factors such as medications, specimen quality, timing, biological variation, and cross-reactivity can influence results. Explaining limitations helps patients and clinicians use laboratory information responsibly.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Can laboratory tests diagnose a disease on their own?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Some tests are highly diagnostic in the correct clinical context, while many others contribute only one part of the diagnostic process. Results must be interpreted by a qualified treating physician alongside physical examination and medical history.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
