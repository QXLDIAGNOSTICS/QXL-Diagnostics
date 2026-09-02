import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Building2, Stethoscope, FileText, Phone, Mail, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: "B2B Reference Laboratory Services Bengaluru | QXL Diagnostics",
  description: "B2B diagnostic testing, reference lab partnerships, and hospital laboratory outsourcing across Bengaluru. NABL Accredited (MC-10025), ISO 15189:2022 standards.",
};

export default function B2bReferenceLabPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2d5e] via-[#1e3a8a] to-[#0284c7] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-[1260px] mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="bg-blue-500/30 text-blue-200 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-blue-400/30 inline-block mb-4">
              B2B Diagnostic Solutions
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Super-Speciality Reference Laboratory Partner for Bengaluru Hospitals &amp; Clinics
            </h1>
            <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Outsource specialized pathology, histopathology, molecular testing, and rare bio-assays to our NABL Accredited (MC-10025) central laboratory in Kengeri, Mysuru Road.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#partner-form" className="bg-white text-[#0f2d5e] font-black px-7 py-3.5 rounded-full text-sm uppercase tracking-wider hover:bg-slate-100 transition-all shadow-lg">
                Become a B2B Partner →
              </a>
              <a href="tel:+919964639639" className="bg-white/10 hover:bg-white/20 text-white font-extrabold px-6 py-3.5 rounded-full text-sm border border-white/30 transition-all flex items-center gap-2">
                <Phone className="w-4 h-4" /> B2B Helpline: +91 9964 639 639
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-12 max-w-[1260px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Award className="w-10 h-10 text-[#2563eb] mb-4" />
            <h3 className="text-lg font-bold text-[#0f2d5e] mb-2">NABL Accredited Quality</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Processed under Certificate MC-10025 according to ISO 15189:2022 standards with daily multi-rule Westgard IQC.
            </p>
          </div>
          <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Clock className="w-10 h-10 text-[#2563eb] mb-4" />
            <h3 className="text-lg font-bold text-[#0f2d5e] mb-2">Guaranteed Turnaround Times</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Same-day reporting for routine panels and 24–48 hour TAT for specialized molecular and histopathology assays.
            </p>
          </div>
          <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Stethoscope className="w-10 h-10 text-[#2563eb] mb-4" />
            <h3 className="text-lg font-bold text-[#0f2d5e] mb-2">Consultant Physician Consultation</h3>
            <p className="text-slate-600 text-xs leading-relaxed font-medium">
              Direct access to our consultant biochemists, microbiologists, and histopathologists for clinical discussions.
            </p>
          </div>
        </div>
      </section>

      {/* B2B Partner Form */}
      <section id="partner-form" className="py-12 max-w-[900px] mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200">
          <h2 className="text-2xl font-extrabold text-[#0f2d5e] mb-2 text-center">Partner With QXL Diagnostics</h2>
          <p className="text-slate-600 text-xs text-center mb-8 font-medium">Fill in your facility details below. Our B2B account manager will connect within 2 business hours.</p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Facility / Clinic Name *</label>
                <input type="text" required placeholder="e.g. City Polyclinic & Nursing Home" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] bg-slate-50/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Facility Type *</label>
                <select required className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] bg-slate-50/50">
                  <option value="hospital">Hospital / Nursing Home</option>
                  <option value="polyclinic">Polyclinic / Clinic</option>
                  <option value="partner_lab">Partner Laboratory</option>
                  <option value="corporate">Corporate Medical Center</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Contact Person *</label>
                <input type="text" required placeholder="Dr. / Mr. / Ms. Full Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] bg-slate-50/50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Phone Number *</label>
                <input type="tel" required placeholder="+91 Contact Number" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] bg-slate-50/50" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Email Address *</label>
                <input type="email" required placeholder="official@facility.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] bg-slate-50/50" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Locality / Address in Bengaluru *</label>
                <textarea rows={3} placeholder="Full address with pincode" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] bg-slate-50/50"></textarea>
              </div>
              <div className="md:col-span-2 flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="dpdp-consent-b2b"
                  required
                  className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb] cursor-pointer shrink-0"
                />
                <label htmlFor="dpdp-consent-b2b" className="text-[11px] text-slate-500 font-medium leading-tight cursor-pointer">
                  I consent to QXL Diagnostics storing and processing facility details per DPDP guidelines and <a href="/privacy-policy" target="_blank" className="text-[#2563eb] underline font-semibold">Privacy Policy</a>.
                </label>
              </div>
            </div>

            <button type="submit" className="btn-sky w-full py-4 text-xs uppercase tracking-wider shadow-md cursor-pointer">
              Submit B2B Inquiry Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
