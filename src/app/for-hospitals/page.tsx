import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ShieldCheck, Phone, Mail, FileText, ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { SITE_URL, NABL_CERTIFICATE, ISO_STANDARD, PHONE_DISPLAY, EMAIL } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "Hospital Reference Laboratory Partnerships Bengaluru | QXL Diagnostics",
  description: "Reference laboratory services, specialized pathology, histopathology, molecular PCR, and hospital lab management across Bengaluru. NABL Accredited (MC-6849).",
  alternates: { canonical: `${SITE_URL}/for-hospitals` },
};

export default function ForHospitalsPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-16">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Hospital &amp; Reference Lab Solutions
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
              Hospital Diagnostic Outsourcing &amp; Reference Testing
            </h1>
            <p className="text-sky-100 text-base md:text-lg leading-relaxed mb-8 font-medium">
              Empower your hospital or nursing home with NABL-accredited reference testing, specialized histopathology, molecular PCR, and rapid cold-chain sample pick-ups across Bengaluru.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/b2b-reference-lab"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
              >
                Become a B2B Partner <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${PHONE_DISPLAY}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Lab Coordinator: {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-[1260px] mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-xs font-extrabold text-slate-700">
          <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" /> NABL Accredited ({NABL_CERTIFICATE})
          </span>
          <span className="flex items-center gap-1.5 text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200">
            <Award className="w-4 h-4" /> {ISO_STANDARD} Quality Standard
          </span>
          <span className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
            <Building2 className="w-4 h-4" /> 24×7 Central Lab Processing
          </span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 max-w-[1260px] mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0f2d5e]">Histopathology &amp; Biopsy</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Surgical tissue biopsy, frozen section consultation, FNAC, and immunohistochemistry panels directed by NIMHANS-trained senior histopathologists.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0f2d5e]">Critical Value Alerts</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Direct phone call notifications to hospital duty doctors immediately upon detecting critical life-threatening lab values prior to written report delivery.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0f2d5e]">Turnkey Lab Management</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Complete outsourcing of hospital satellite laboratories including Westgard IQC, NABL accreditation compliance, and trained technician staffing.
            </p>
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-12 bg-[#0f2d5e] text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Ready to Partner with QXL Diagnostics?</h2>
            <p className="text-sky-200 text-sm font-medium">Our B2B team will set up your sample logistics and portal login within 24 hours.</p>
          </div>
          <Link
            href="/b2b-reference-lab"
            className="bg-[#D69A18] hover:bg-[#b88313] text-white font-extrabold px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shrink-0"
          >
            Submit B2B Inquiry Request →
          </Link>
        </div>
      </section>
    </div>
  );
}
