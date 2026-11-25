import React from "react";
import Link from "next/link";
import { ShieldCheck, Stethoscope, Award, MessageCircle, Calendar } from "lucide-react";
import { getAutoReviewDate } from "@/lib/dateUtils";

interface DoctorReviewerCardProps {
  reviewer?: string;
  date?: string;
  /** Credentials/designation line; defaults to Dr. Muruda's biochemistry bio. */
  title?: string;
  /** Reviewer assigned but sign-off not yet confirmed: avoid "reviewed" claims. */
  pending?: boolean;
}

const PROFILE_LINKS: Record<string, string> = {
  "shantakumar muruda": "/dr-shantakumar-muruda",
  "pritilata rout": "/dr-pritilata-rout",
  "naveen kumar": "/dr-naveen-kumar-n",
  "ajitha pillai": "/dr-ajitha-pillai",
};

export default function DoctorReviewerCard({
  reviewer = "Dr. Shantakumar Muruda, MD (Biochemistry)",
  date,
  title,
  pending = false,
}: DoctorReviewerCardProps) {
  const displayDate = getAutoReviewDate(date);
  const lower = reviewer.toLowerCase();
  const profileHref = Object.entries(PROFILE_LINKS).find(([name]) => lower.includes(name))?.[1];
  return (
    <section
      aria-label="Medical Reviewer & Editorial Policy"
      className="my-10 rounded-3xl border border-blue-200/90 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 p-6 sm:p-8 shadow-xs not-prose"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Doctor Avatar / Icon */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#003882] to-[#0066cc] text-white flex items-center justify-center shadow-md">
            <Stethoscope className="w-8 h-8 text-blue-200" />
          </div>
          {!pending && (
            <div
              className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs"
              title="Clinically Verified Medical Reviewer"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Doctor Details */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {pending ? (
              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Award className="w-3 h-3 text-amber-600" /> Assigned Medical Reviewer
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  <Award className="w-3 h-3 text-emerald-600" /> Medically Reviewed &amp; Fact-Checked
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-blue-500" /> Reviewed: {displayDate}
                </span>
              </>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#0d2e42] tracking-tight">
            {reviewer}
          </h3>

          {title ? (
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">{title}</p>
          ) : (
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
              Head of Clinical Biochemistry &amp; Quality Management,{" "}
              <strong className="text-slate-800">QXL Diagnostics Bengaluru</strong> (NABL Accredited
              Laboratory NABLM1126KA10694). Trained Lead Assessor for ISO 15189:2022 medical laboratory standards.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 pt-5 border-t border-blue-150/70 text-xs text-slate-600 leading-relaxed space-y-2">
        <p>
          <strong className="text-slate-800">QXL Clinical Editorial Commitment:</strong> Every health guide, biomarker explanation, and screening schedule published on this portal undergoes rigorous clinical review by qualified MD pathologists and biochemists to ensure adherence to peer-reviewed evidence (ACOG, WHO, ICMR) and laboratory diagnostic accuracy.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {profileHref && (
          <Link
            href={profileHref}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            View Doctor Profile &amp; Research
          </Link>
        )}
        <a
          href="https://wa.me/919964639639?text=Hello%20Dr.%20Muruda%20Team%2C%20I%20have%20a%20clinical%20question%20regarding%20a%20laboratory%20test"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-bold transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" /> Ask Lab Medical Team
        </a>
      </div>
    </section>
  );
}
