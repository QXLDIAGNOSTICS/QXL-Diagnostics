"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Award, CheckCircle2, FileCheck, Thermometer, BarChart3, Lock, Stethoscope, Clock } from 'lucide-react';
import FaqSection from '@/components/FaqSection';

export default function QualityAccreditationPage() {
  const qualityPillars = [
    {
      icon: Award,
      title: "ISO 15189:2022 NABL Certification",
      desc: "Our central reference laboratory operates under strict NABL Certification (Certificate No. MC-6849) for medical laboratories, adhering to International ISO 15189:2022 standards.",
    },
    {
      icon: BarChart3,
      title: "Daily Internal Quality Control (IQC)",
      desc: "Every automated analyzer undergoes multi-level daily Internal Quality Control validation utilizing Westgard multi-rules prior to processing patient specimens.",
    },
    {
      icon: CheckCircle2,
      title: "External Quality Assurance (EQAS)",
      desc: "QXL regularly participates in accredited External Quality Assessment Schemes (EQAS) with international proficiency testing providers to ensure continuous inter-lab accuracy.",
    },
    {
      icon: Thermometer,
      title: "Cold-Chain Temperature Control",
      desc: "From doorstep phlebotomy to central processing, all blood samples are transported in insulated vacuum containers with real-time temperature monitoring.",
    },
    {
      icon: Lock,
      title: "Barcode Sample Tracking & Zero Swap",
      desc: "Unique primary tube barcoding at patient bedside prevents manual labeling errors, ensuring 100% sample identity integrity through automated LIS analyzer interfacing.",
    },
    {
      icon: Stethoscope,
      title: "Doctor & Pathologist Sign-Off",
      desc: "All critical, abnormal, or high-complexity investigation reports are personally reviewed and validated by our team of senior consultant pathologists & microbiologists.",
    },
  ];

  const standards = [
    {
      metric: "MC-6849",
      label: "NABL Certification Scope",
      sub: "ISO 15189:2022 Certified Standard",
    },
    {
      metric: "99.98%",
      label: "Diagnostic Accuracy Rate",
      sub: "Validated by Daily IQC & EQAS",
    },
    {
      metric: "100%",
      label: "Barcode Primary Tube Tracking",
      sub: "Zero Manual Interventions",
    },
    {
      metric: "24×7",
      label: "Emergency Processing Lab",
      sub: "Immediate Critical Value Alerts",
    },
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen text-slate-800 font-sans">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0A5DAA] via-[#084B8A] to-[#00A8A8] text-white py-14 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-200 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span>NABL certified laboratory (MC-6849)</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
            Quality Assurance & Clinical Excellence
          </h1>
          <p className="text-base md:text-lg text-cyan-100 max-w-2xl font-medium leading-relaxed mb-4">
            Doctor-led diagnostic testing backed by ISO 15189:2022 accreditation, automated delta checks, and rigorous quality control protocols.
          </p>
          <div className="flex items-center text-xs text-cyan-200 gap-1.5 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-white font-bold">Quality & Accreditation</span>
          </div>
        </div>
      </section>

      {/* Standards Counter Bar */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {standards.map((s, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-2xl md:text-3xl font-black text-[#0A5DAA]">{s.metric}</div>
                <div className="text-xs font-extrabold text-slate-900 mt-1">{s.label}</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Pillars Grid */}
      <section className="py-16 bg-[#f8faff]">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-blue-100 text-[#0A5DAA] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Clinical Quality Governance
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f2d5e] mt-3">Six Pillars of QXL Diagnostic Accuracy</h2>
            <p className="text-slate-600 text-sm mt-2 font-medium">
              Every blood sample collected across Bengaluru is processed in accordance with internationally recognized quality control frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#00A8A8] flex items-center justify-center mb-5 border border-cyan-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Critical Value & Safety Policy Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="bg-gradient-to-r from-slate-900 to-[#0f2d5e] rounded-3xl p-8 md:p-12 text-white shadow-2xl text-left relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>CRITICAL VALUE REPORTING POLICY</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                  Immediate Notification for Panic Laboratory Values
                </h2>
                <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-3xl">
                  When a lab result falls outside safe physiological limits (such as critical blood glucose, severe potassium derangements, or acute cardiac markers), QXL Diagnostic protocol mandates immediate verbal telephone notification to the ordering physician or patient, followed by prompt digital delivery.
                </p>
                <div className="pt-2 text-xs text-cyan-300 font-bold">
                  * NABL Certification applies to investigations included within our current accredited scope (Certificate No. MC-6849).
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-3">
                <a
                  href="tel:+919964639639"
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#00A8A8] hover:bg-teal-600 text-white font-extrabold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider text-center"
                >
                  Contact Quality Desk: +91 9964 639 639
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
