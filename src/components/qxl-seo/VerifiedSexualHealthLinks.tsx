import React from 'react';
import Link from 'next/link';
import { Stethoscope, HelpCircle, Activity, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

/** Add this on BOTH live pages. Links to approved symptom routes and FAQ hub. */
export function VerifiedSexualHealthLinks() {
  const symptoms = process.env.QXL_SYMPTOM_CONTENT_APPROVED !== 'false';
  const faq = process.env.QXL_SEXUAL_FAQ_APPROVED !== 'false';

  return (
    <section
      aria-labelledby="qxl-symptom-links"
      className="bg-gradient-to-br from-slate-50 via-sky-50/40 to-blue-50/30 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-[#0f2d5e] text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Clinical Guidance &amp; Resources
          </div>
          <h2 id="qxl-symptom-links" className="text-xl sm:text-2xl font-black text-[#0f2d5e] tracking-tight">
            Sexual Health Questions: Find the Right Next Step
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-semibold">Bengaluru · Evidence-Based</span>
      </div>

      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
        Itching, watery discharge, genital blisters, boils, painful urination or discomfort after sex can have different non-infectious or infectious causes. Symptoms alone do not diagnose an STI. Choose a dedicated guide below, discuss urgent symptoms with a physician, or review our NABL-accredited laboratory investigations.
      </p>

      <nav aria-label="Sexual health resources" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {symptoms && (
          <Link
            href="/sexual-health/symptoms"
            className="group flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#0f2d5e] group-hover:text-blue-600">
                18 Genital Symptoms &amp; Causes Directory
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </Link>
        )}

        {faq && (
          <Link
            href="/sexual-health/faq"
            className="group flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#0f2d5e] group-hover:text-indigo-600">
                Sexual Health Questions &amp; Answers (FAQ)
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </Link>
        )}

        <Link
          href="/sexual-health/packages"
          className="group flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-[#0f2d5e] group-hover:text-emerald-600">
              Compare 10 Diagnostic STI Packages
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/health-hub/after-unprotected-sex"
          className="group flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-[#0f2d5e] group-hover:text-rose-600">
              What to Do After Unprotected Sex
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/health-hub/hiv-test-window-period"
          className="group flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold text-[#0f2d5e] group-hover:text-sky-600">
              HIV Window Periods &amp; Timeline
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </nav>

      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-[13px] text-amber-900 leading-relaxed font-medium">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Emergency Protocol:</strong> Possible HIV exposure within 72 hours? Seek immediate medical evaluation for PEP (Post-Exposure Prophylaxis); do not delay care waiting for a test result. Sudden severe testicular pain, significant pelvic pain or acute systemic fever requires urgent emergency room care.
        </div>
      </div>
    </section>
  );
}
