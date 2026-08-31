"use client";
import React from 'react';
import { ShieldCheck, Award, Microscope, Stethoscope, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import { NABL_CERTIFICATE } from '@/lib/businessInfo';

export default function DoctorLedLabSection() {
  const departments = [
    { title: "Clinical Biochemistry", desc: "Automated high-precision metabolic & enzymatic profiles." },
    { title: "Pathology & Hematology", desc: "Advanced cell analysis, blood morphology & clotting assays." },
    { title: "Microbiology", desc: "Culture, sensitivity, bacterial & fungal screening." },
    { title: "Molecular Diagnostics", desc: "Real-time PCR & genetic pattern recognition." },
    { title: "Immunology & Serology", desc: "Hormones, viral markers & autoimmune panels." },
    { title: "Histopathology & Cytology", desc: "Biopsy evaluation & fine needle aspiration cytology." }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#fff7ed] via-white to-[#f0fdf4] border-t border-emerald-200/50 relative overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-300 shadow-xs">
                <Stethoscope className="w-4 h-4 text-emerald-700" /> DOCTOR-LED SUPER SPECIALITY LAB
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-slate-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs">
                <span className="text-amber-500 font-black">4.9 ★★★★★</span> (500+ Google Reviews)
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0284c7] leading-tight mb-6">
              Bengaluru's Doctor-Led Diagnostic Laboratory
            </h2>
            <p className="text-slate-700 text-base md:text-lg font-bold leading-relaxed mb-8">
              QXL Diagnostics is a doctor-led, NABL accredited ({NABL_CERTIFICATE}) super-speciality diagnostic laboratory in Bengaluru, combining advanced laboratory technology, quality systems and specialist medical review for accurate, timely results.
            </p>

            {/* Department Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {departments.map((dept) => (
                <div key={dept.title} className="bg-white/90 border border-emerald-200/80 rounded-2xl p-4 hover:border-emerald-400 shadow-xs transition-all">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <h3 className="font-extrabold text-[#0284c7] text-sm">{dept.title}</h3>
                  </div>
                  <p className="text-slate-600 text-xs font-semibold pl-6">{dept.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/quality-accreditation"
                className="bg-gradient-to-r from-amber-500 via-[#0284c7] to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-black px-7 py-3.5 rounded-full text-sm shadow-md active:scale-95 transition-all uppercase tracking-wider"
              >
                Learn About Our Lab Standards →
              </Link>
              <Link
                href="/team"
                className="bg-white hover:bg-slate-50 text-slate-800 font-black px-6 py-3.5 rounded-full text-sm border border-emerald-300/80 shadow-xs transition-all"
              >
                Consultant Specialists
              </Link>
            </div>
          </div>

          {/* Right Column: Imagery & NABL Badge */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-100 relative bg-slate-100">
              <img
                src="https://res.cloudinary.com/btjglif5/image/upload/v1784150239/Assets-QXL/legacy-assets/image/doctor_patient_consultation.jpg"
                alt="Doctor-Led Diagnostic Lab Bengaluru"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#2563eb] uppercase tracking-wider">NABL ACCREDITED ({NABL_CERTIFICATE})</div>
                  <div className="text-sm font-extrabold text-[#0f2d5e]">Direct Doctor Verification for Every Report</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
