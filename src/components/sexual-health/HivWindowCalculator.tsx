"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, AlertTriangle, ShieldCheck, Clock, CheckCircle2, Phone, MessageSquare, ArrowRight, Info, HeartPulse } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';

type TestType = '4th-gen-lab' | 'rapid-combo' | 'rna-nat' | '3rd-gen-ab';

export default function HivWindowCalculator() {
  const [exposureDate, setExposureDate] = useState<string>(() => {
    // Default to 28 days ago as an educational preview
    const d = new Date();
    d.setDate(d.getDate() - 28);
    return d.toISOString().split('T')[0];
  });
  const [testType, setTestType] = useState<TestType>('4th-gen-lab');

  // Calculate days elapsed
  const daysElapsed = useMemo(() => {
    if (!exposureDate) return 0;
    const exp = new Date(exposureDate).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - exp) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, [exposureDate]);

  // Window assessments based on CDC & Koneman diagnostic microbiology guidelines
  const analysis = useMemo(() => {
    const isPepActive = daysElapsed <= 3;
    let windowStatus = '';
    let statusColor = '';
    let recommendation = '';
    let conclusiveness = '';

    if (daysElapsed < 10) {
      if (isPepActive) {
        windowStatus = 'Critical PEP Window Active (<72h)';
        statusColor = 'bg-rose-600 text-white';
        recommendation = 'Seek emergency medical evaluation immediately for Post-Exposure Prophylaxis (PEP). PEP can prevent HIV transmission if started within 72 hours (optimally <24 hours). Baseline HIV and kidney testing should be performed concurrently.';
        conclusiveness = 'Too early for serological detection. Do NOT wait for lab test results to start PEP.';
      } else {
        windowStatus = 'Eclipse / Pre-Detection Phase (Day 4–9)';
        statusColor = 'bg-amber-500 text-slate-900';
        recommendation = 'Viral antigen (p24) and antibodies are not yet present in high enough concentrations in blood. Standard laboratory tests may yield false negatives. If high clinical suspicion exists, consult an infectious disease specialist regarding qualitative HIV RNA NAT.';
        conclusiveness = 'Sub-detectable serological window. Retest scheduled for Day 18–28.';
      }
    } else if (daysElapsed >= 10 && daysElapsed < 18) {
      windowStatus = 'Early Window Period (RNA NAT Detectable)';
      statusColor = 'bg-sky-600 text-white';
      recommendation = 'Qualitative HIV-1 RNA PCR (NAT) can detect viral genetic material from 10–33 days. 4th generation antigen/antibody combo tests begin detecting p24 antigen around day 18. Testing now can provide early answers, but follow-up is necessary.';
      conclusiveness = 'RNA NAT is sensitive. Standard 4th Gen Ag/Ab test should be completed from Day 18 onwards.';
    } else if (daysElapsed >= 18 && daysElapsed < 45) {
      windowStatus = '4th Generation Ag/Ab Detection Window';
      statusColor = 'bg-blue-600 text-white';
      recommendation = 'Optimal window for 4th Generation ECLIA Duo testing. At this stage, free p24 antigen peaks while IgM antibodies are developing. A negative 4th generation lab test at this stage provides very high reassurance.';
      conclusiveness = 'Approximately 95%–98% conclusive. CDC guidelines advise final baseline confirmation at Day 45–90.';
    } else if (daysElapsed >= 45 && daysElapsed < 90) {
      windowStatus = 'CDC 45-Day Conclusive Milestone (Laboratory 4th Gen)';
      statusColor = 'bg-emerald-600 text-white';
      recommendation = 'Per CDC laboratory testing guidance, a 4th generation antigen/antibody combo test performed on blood from a vein is >99% conclusive at 45 days after exposure.';
      conclusiveness = '>99% Conclusive for venous blood 4th Gen tests. Only individuals with confirmed immune compromise require 90-day retesting.';
    } else {
      windowStatus = '100% Definitive Window Milestone (Day 90+)';
      statusColor = 'bg-emerald-700 text-white';
      recommendation = 'At 90 days or more, all CDC, WHO, and NACO standard window periods are complete. A negative result from any 4th generation or 3rd generation antibody assay is 100% definitive and conclusive.';
      conclusiveness = '100% Definitive across all certified laboratory assays.';
    }

    return { isPepActive, windowStatus, statusColor, recommendation, conclusiveness };
  }, [daysElapsed]);

  const setDaysAgo = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    setExposureDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0c4a6e] via-[#0f2d5e] to-[#082142] p-6 sm:p-8 text-white relative">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b] text-slate-950 uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5" /> Clinical Guidance Tool
          </span>
          <span className="text-xs text-sky-200/90 font-medium">CDC &amp; WHO Guidelines Aligned</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Interactive HIV Test Window-Period Calculator
        </h3>
        <p className="text-sm sm:text-base text-sky-100/90 mt-2 max-w-2xl">
          Determine the most accurate testing window, assay sensitivity, and whether emergency Post-Exposure Prophylaxis (PEP) is required.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Urgent PEP Notification if < 72 Hours */}
        {analysis.isPepActive && (
          <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-500/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-rose-950 text-base sm:text-lg flex items-center gap-2">
                  CRITICAL: Emergency PEP Window Active (&lt;72 Hours)
                </h4>
                <p className="text-xs sm:text-sm text-rose-900 mt-1 leading-relaxed">
                  Post-Exposure Prophylaxis (PEP) can prevent HIV if initiated within 72 hours of exposure (ideally within 24 hours).
                  <strong> Do not delay medication while waiting for lab tests.</strong> Contact an emergency clinician or QXL immediately.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
              <a
                href={`tel:${PHONE_E164}`}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" /> Call Urgent Helpline
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Doctor
              </a>
            </div>
          </div>
        )}

        {/* Form Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          {/* Exposure Date Input */}
          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#2563eb]" /> 1. Date of Potential Exposure
            </label>
            <input
              type="date"
              value={exposureDate}
              onChange={(e) => setExposureDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            />
            {/* Quick selectors */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold">
              <span className="text-slate-500 text-[11px]">Quick presets:</span>
              <button
                type="button"
                onClick={() => setDaysAgo(2)}
                className={`px-2.5 py-1 rounded-md transition-all ${daysElapsed === 2 ? 'bg-rose-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                2 Days (PEP)
              </button>
              <button
                type="button"
                onClick={() => setDaysAgo(14)}
                className={`px-2.5 py-1 rounded-md transition-all ${daysElapsed === 14 ? 'bg-[#2563eb] text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                14 Days
              </button>
              <button
                type="button"
                onClick={() => setDaysAgo(28)}
                className={`px-2.5 py-1 rounded-md transition-all ${daysElapsed === 28 ? 'bg-[#2563eb] text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                28 Days (4 Weeks)
              </button>
              <button
                type="button"
                onClick={() => setDaysAgo(45)}
                className={`px-2.5 py-1 rounded-md transition-all ${daysElapsed === 45 ? 'bg-[#2563eb] text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                45 Days (CDC)
              </button>
              <button
                type="button"
                onClick={() => setDaysAgo(90)}
                className={`px-2.5 py-1 rounded-md transition-all ${daysElapsed === 90 ? 'bg-emerald-700 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                90 Days (Definitive)
              </button>
            </div>
          </div>

          {/* Test Type Input */}
          <div className="space-y-3">
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2563eb]" /> 2. Selected Laboratory Assay
            </label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value as TestType)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            >
              <option value="4th-gen-lab">4th Generation Laboratory Combo (p24 Ag + Ab Venous Draw) [Recommended]</option>
              <option value="rapid-combo">Rapid Fingerstick 4th Gen Combo / Antibody</option>
              <option value="rna-nat">HIV-1 RNA PCR (Nucleic Acid Test - NAT)</option>
              <option value="3rd-gen-ab">3rd Generation Antibody-Only Assay</option>
            </select>
            <p className="text-[11px] text-slate-500">
              QXL standard testing uses <strong>4th Generation ECLIA</strong> from venous blood, providing high accuracy from 18 to 45 days.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#f59e0b] font-black">Timeline Status</span>
              <h4 className="text-2xl sm:text-3xl font-black mt-1 text-white">
                {daysElapsed} {daysElapsed === 1 ? 'Day' : 'Days'} Elapsed Since Exposure
              </h4>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${analysis.statusColor} shadow-md`}>
              {analysis.windowStatus}
            </span>
          </div>

          {/* Progress Timeline Graphic */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 font-bold mb-2">
              <span>Day 0 (Exposure)</span>
              <span>Day 10 (RNA NAT)</span>
              <span>Day 18–28 (p24 Peak)</span>
              <span>Day 45 (CDC 99%)</span>
              <span>Day 90 (100% Definitive)</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-rose-500 via-[#2563eb] to-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, Math.max(5, (daysElapsed / 90) * 100))}%` }}
              />
            </div>
          </div>

          {/* Analysis & Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <span className="text-xs text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Conclusiveness Rating
              </span>
              <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                {analysis.conclusiveness}
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
              <span className="text-xs text-[#f59e0b] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clinical Guidance
              </span>
              <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                {analysis.recommendation}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              Need confidential guidance? Trained phlebotomy specialists and post-test doctor review available.
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tests/hiv-test-bangalore"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all flex items-center gap-2 shadow-md"
              >
                <span>Book HIV 4th Gen Test (₹945)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full transition-all border border-white/20"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong>Medical Disclaimer:</strong> This window-period calculator is an educational resource based on clinical testing guidelines from the US Centers for Disease Control and Prevention (CDC), World Health Organization (WHO), and the National AIDS Control Organisation (NACO, India). It does not replace individualized clinical judgment. If you believe you have been exposed to HIV within the last 72 hours, seek urgent medical evaluation for PEP without delay.
          </p>
        </div>
      </div>
    </div>
  );
}

