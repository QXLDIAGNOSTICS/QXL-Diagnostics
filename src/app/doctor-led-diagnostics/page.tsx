import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { UserCheck, ShieldCheck, Award, Stethoscope, CheckCircle2, AlertCircle, FileText, ArrowRight, Microchip, Activity, HelpCircle, Phone, MessageSquare, Building2, Upload } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PopularPackagesGrid from '@/components/PopularPackagesGrid';

export const metadata: Metadata = {
  title: "Doctor-Led Diagnostics & Reference Lab Expertise | QXL Diagnostics",
  description: "At QXL Diagnostics, laboratory medicine is led by doctors—not just machines. NABL-accredited (MC-10025) routine & super-speciality reference diagnostics across Bengaluru.",
  keywords: ["doctor led diagnostics bangalore", "pathologist led lab bengaluru", "NABL reference laboratory", "super speciality diagnostic lab", "QXL diagnostics doctor led"],
  alternates: {
    canonical: "https://qxldiagnostics.com/doctor-led-diagnostics",
  },
};

export default function DoctorLedDiagnosticsPage() {
  return (
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0f2d5e] via-[#1b3d7a] to-[#2563eb] text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 text-amber-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-amber-300" />
            Doctor-Led Laboratory Medicine
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Doctor-Led Diagnostics. <br />
            Reference-Lab Expertise. <br />
            <span className="text-amber-300">Quality You Can Verify.</span>
          </h1>

          <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
            At QXL Diagnostics, laboratory medicine is led by doctors—not just machines. Every diagnostic result represents more than a number. It is part of a patient&apos;s clinical story.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/book"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-7 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-sm uppercase tracking-wider transition-all"
            >
              Book a Test <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/home-blood-collection-bangalore"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 flex items-center gap-2 text-sm uppercase tracking-wider transition-all"
            >
              Home Collection
            </Link>
            <a
              href="https://wa.me/919964639639?text=Hi%20QXL%2C%20I%20want%20to%20upload%20my%20prescription."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600/40 hover:bg-emerald-600/60 text-white font-bold px-6 py-3.5 rounded-xl border border-emerald-400/40 flex items-center gap-2 text-sm uppercase tracking-wider transition-all"
            >
              <Upload className="w-4 h-4 text-emerald-400" /> Upload Prescription
            </a>
          </div>
        </div>
      </section>

      {/* The Four Pillars */}
      <section className="py-14 max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200">QXL Core Framework</span>
          <h2 className="text-3xl font-black text-[#0f2d5e] mt-2">Our Four Strategic Pillars</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm">01</div>
            <h3 className="font-extrabold text-slate-900 text-base">Doctor-Led Diagnostics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Qualified laboratory specialists support technically reliable and clinically meaningful diagnostic testing under physician oversight.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center font-black text-sm">02</div>
            <h3 className="font-extrabold text-slate-900 text-base">Advanced Reference Testing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Routine investigations and super-speciality diagnostics (autoimmune, molecular, SPEP, IHC) integrated within a broad reference laboratory model.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black text-sm">03</div>
            <h3 className="font-extrabold text-slate-900 text-base">Verified Quality Systems</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Testing is supported by NABL-accredited laboratory processes (MC-10025), ISO 15189:2022 standards, and daily multi-rule Westgard IQC.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-black text-sm">04</div>
            <h3 className="font-extrabold text-slate-900 text-base">Medically Reviewed Information</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Patient and clinician education is developed strictly around accepted principles of laboratory medicine—not generic health marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Clinical Body */}
      <section className="py-10 max-w-[1200px] mx-auto px-4 space-y-12">
        
        {/* Doctor-Led Laboratory Medicine */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Physician Oversight</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2d5e]">Doctor-Led Laboratory Medicine</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Modern analysers can generate thousands of results every day, but clinically reliable diagnostics requires more than automation. At QXL Diagnostics, laboratory services are supported by qualified medical professionals with expertise in laboratory medicine, clinical biochemistry, pathology and specialised diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Our Laboratory Team Reviews Results In Context Of:</h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Analytical quality & reference intervals</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Previous patient results & delta check variations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Possible analytical interference & specimen status</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Critical or potentially significant laboratory findings</li>
              </ul>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-2">
              <h3 className="font-bold text-[#0f2d5e] text-sm">Crucial for Complex Investigations:</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This physician-led approach is particularly vital for complex investigations such as autoimmune testing, protein electrophoresis, endocrine investigations, tumour markers, prenatal screening, specialised biochemistry, histopathology, and molecular diagnostics.
              </p>
            </div>
          </div>
        </div>

        {/* When Laboratory Interpretation Matters */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-[#0f2d5e]">When Laboratory Interpretation Matters</h2>
          <p className="text-sm text-slate-600">
            Many laboratory results cannot be interpreted correctly from a single number alone:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-slate-200 p-4 rounded-xl space-y-1">
              <strong className="text-xs text-slate-900 block">ANA Autoantibodies</strong>
              <p className="text-xs text-slate-600">A positive ANA test does not automatically mean a patient has an autoimmune disease.</p>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl space-y-1">
              <strong className="text-xs text-slate-900 block">Serum Ferritin</strong>
              <p className="text-xs text-slate-600">An elevated ferritin result does not always indicate iron overload; it acts as an acute-phase reactant.</p>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl space-y-1">
              <strong className="text-xs text-slate-900 block">HbA1c Glucose</strong>
              <p className="text-xs text-slate-600">An abnormal HbA1c result may require consideration of haemoglobin variants or altered RBC survival.</p>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl space-y-1">
              <strong className="text-xs text-slate-900 block">Serum Protein Electrophoresis</strong>
              <p className="text-xs text-slate-600">An M-band on SPEP requires immunofixation, free light-chain testing, and specialist review.</p>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl space-y-1">
              <strong className="text-xs text-slate-900 block">Tumour Markers</strong>
              <p className="text-xs text-slate-600">An elevated tumour marker does not by itself diagnose cancer in asymptomatic individuals.</p>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl space-y-1">
              <strong className="text-xs text-slate-900 block">Thyroid Function</strong>
              <p className="text-xs text-slate-600">An abnormal TSH requires interpretation alongside Free T4, medications, and clinical history.</p>
            </div>
          </div>
        </div>

        {/* 9-Step Diagnostic Pathway */}
        <div className="bg-gradient-to-br from-[#0f2d5e] to-[#1e3a8a] text-white p-8 md:p-12 rounded-3xl space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">From Sample to Clinical Clarity</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Our 9-Step Quality Pathway</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 text-center pt-2">
            {[
              { step: "1", title: "Test Selection" },
              { step: "2", title: "Patient Prep" },
              { step: "3", title: "Collection" },
              { step: "4", title: "Transport" },
              { step: "5", title: "Lab Analysis" },
              { step: "6", title: "IQC Verification" },
              { step: "7", title: "Specialist Review" },
              { step: "8", title: "Digital Report" },
              { step: "9", title: "Clinician Action" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur border border-white/15 p-3 rounded-xl">
                <span className="w-6 h-6 bg-amber-400 text-slate-950 font-black rounded-full text-xs flex items-center justify-center mx-auto mb-1.5">{item.step}</span>
                <span className="text-[11px] font-bold text-white leading-tight block">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition for Patients, Doctors, Hospitals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-[#0f2d5e] text-lg">For Patients</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Accurate & clinically responsible testing</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Convenient home blood collection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Understandable, doctor-reviewed reports</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-[#0f2d5e] text-lg">For Doctors</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Reliable & reproducible laboratory results</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Access to routine & super-speciality assays</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Direct pathologist consultation when needed</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-[#0f2d5e] text-lg">For Hospitals & Partner Labs</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Broad speciality referral test menu</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Standardized sample cold-chain logistics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> NABL accredited quality processing</li>
            </ul>
          </div>
        </div>

        {/* Popular Health Packages Grid */}
        <PopularPackagesGrid />

      </section>

      <Footer />
    </main>
  );
}
