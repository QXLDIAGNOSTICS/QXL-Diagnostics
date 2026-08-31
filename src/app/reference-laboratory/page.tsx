import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Stethoscope, ShieldCheck, FileCheck, Phone, Mail, Award, CheckCircle2, ArrowRight, Microchip, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Reference Laboratory Partner for Doctors & Hospitals | QXL Diagnostics",
  description: "QXL Diagnostics reference laboratory services for hospitals, polyclinics, nursing homes, and diagnostic centres across Bengaluru & Karnataka. NABL Certified (MC-10025), specialized testing & MD pathologist review.",
  keywords: ["reference laboratory bangalore", "b2b diagnostic lab bengaluru", "hospital lab outsourcing", "NABL reference lab", "specialised diagnostic referral"],
  alternates: {
    canonical: "https://qxldiagnostics.com/reference-laboratory",
  },
};

export default function ReferenceLaboratoryPage() {
  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0f2d5e] via-[#1e3a8a] to-[#2563eb] text-white py-14">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 text-amber-200 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4 text-amber-300" />
            Institutional & Referral Laboratory Partner
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            A Reference Laboratory Built for Doctors, Hospitals & Partner Labs
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
            QXL Diagnostics serves as an extension of the clinician&apos;s diagnostic decision-making process. We support hospitals, specialist clinics, polyclinics, and independent laboratories with super-speciality referral testing and doctor-reviewed reports.
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            <a href="tel:+919964639639" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-sm uppercase tracking-wider transition-all">
              <Phone className="w-4 h-4" /> Partner Desk: +91 9964 639 639
            </a>
            <a href="mailto:info@qxldiagnostics.com" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 text-sm uppercase tracking-wider transition-all">
              <Mail className="w-4 h-4" /> Email Reference Team
            </a>
          </div>
        </div>
      </section>

      {/* Super-Speciality Capabilities */}
      <section className="py-14 max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200">Speciality Referral Capabilities</span>
          <h2 className="text-3xl font-extrabold text-[#0f2d5e] mt-3">Super-Speciality Reference Testing</h2>
          <p className="text-slate-600 text-sm mt-2">
            Broad test menu covering advanced investigations that smaller laboratories and clinical setups refer out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <Layers className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-lg">Autoimmune Diagnostics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ANA by HEp-2 IFA, ENA Profile, Anti-dsDNA, Anti-CCP, ANCA PR3/MPO, and disease-specific autoantibody panels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <Microchip className="w-8 h-8 text-purple-600" />
            <h3 className="font-bold text-slate-900 text-lg">Protein Electrophoresis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Serum Protein Electrophoresis (SPEP), Immunofixation Electrophoresis (IFE), and Serum Free Light Chains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <Stethoscope className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-lg">Histo-Cytopathology & IHC</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Small biopsy, surgical pathology, FNAC, Pap smear, special stains, and Immunohistochemistry (IHC) marker panels.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
