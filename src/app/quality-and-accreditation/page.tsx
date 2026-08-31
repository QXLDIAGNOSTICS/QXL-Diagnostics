import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, CheckCircle2, FileText, Check, AlertCircle, Building2, UserCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Quality & NABL Certification (MC-10025) | QXL Diagnostics",
  description: "Official QXL Diagnostics Quality & NABL Certification documentation. ISO 15189:2022 standards, Internal Quality Control (IQC), External Quality Assessment Schemes (EQAS), and critical value protocols.",
  keywords: ["NABL Certified lab bangalore", "MC-10025", "ISO 15189 laboratory", "quality control diagnostic lab", "QXL accreditation"],
  alternates: {
    canonical: "https://qxldiagnostics.com/quality-and-accreditation",
  },
};

export default function QualityAccreditationPage() {
  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0f2d5e] to-[#1e40af] text-white py-14">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 text-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-amber-300" />
            NABL Certification MC-10025
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Quality Assurance & NABL Certification
          </h1>
          <p className="text-blue-100 text-base max-w-3xl mt-3 leading-relaxed">
            QXL Diagnostics operates strictly under NABL Certification (Certificate No. MC-10025) adhering to ISO 15189:2022 standards for medical laboratories, ensuring high analytical accuracy, traceability, and patient safety.
          </p>
        </div>
      </section>

      {/* Key Quality Pillars */}
      <section className="py-12 max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-base">NABL Certification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Formally accredited by National Accreditation Board for Testing and Calibration Laboratories (NABL) under Certificate MC-10025.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-base">ISO 15189:2022</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full compliance with international quality management, technical competence, and ethical requirements for medical laboratories.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <FileText className="w-8 h-8 text-amber-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-base">EQAS & IQC Testing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Daily multi-rule Westgard Internal Quality Control (IQC) and participation in accredited External Quality Assessment Schemes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <UserCheck className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-base">Doctor-Led Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% of diagnostic reports are verified and authorized by consultant pathologists, biochemists, and microbiologists.
            </p>
          </div>
        </div>

        {/* Clinical Quality Protocols */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0f2d5e] mb-3">Pre-Analytical & Analytical Quality Controls</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Quality control at QXL Diagnostics extends across all three phases of testing: Pre-Analytical (specimen collection, transport, centrifugation), Analytical (instrument calibration, controls, delta checks), and Post-Analytical (pathologist authorization and critical result notification).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" /> Critical Value Notification Protocol
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When a test result falls within defined panic or critical ranges (e.g. severe potassium imbalance, acute low platelets, extreme blood glucose), our laboratory team immediately contacts the patient and treating physician via priority telephone call.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500" /> Sample Rejection & Integrity Policy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To guarantee analytical precision, samples exhibiting haemolysis, lipaemia, clotted EDTA whole blood, or improper collection tube fill volume are flagged and re-collected free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
