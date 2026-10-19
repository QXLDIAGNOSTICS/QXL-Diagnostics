import React from 'react';
import Link from 'next/link';
import { Quote, BadgeCheck } from 'lucide-react';

interface Props {
  doctorName: string;
  doctorSlug: string;
  qualifications: string;
  specialty: string;
  note: string;
  reviewDate?: string;
  photoUrl?: string;
}

export default function DoctorInterpretationNote({
  doctorName,
  doctorSlug,
  qualifications,
  specialty,
  note,
  reviewDate = '2026',
  photoUrl,
}: Props) {
  return (
    <div className="bg-gradient-to-br from-[#eff6ff] via-[#f0f7ff] to-[#dbeafe] border border-blue-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 relative z-10">
        {/* Doctor avatar */}
        <div className="flex-shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={doctorName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-2xl font-black text-[#0284c7] shadow-sm">
              {doctorName.charAt(3).toUpperCase()}
            </div>
          )}
        </div>

        {/* Doctor info */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full mb-1">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="text-emerald-700 text-[10px] font-extrabold uppercase tracking-wider">
              Doctor-Reviewed Content
            </span>
          </div>
          <div>
            <Link
              href={`/${doctorSlug}`}
              className="font-extrabold text-[#0B2545] text-sm hover:text-[#2563eb] transition-colors"
            >
              {doctorName}
            </Link>
          </div>
          <p className="text-slate-500 text-[11px] font-medium mt-0.5">
            {qualifications} · {specialty}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="relative z-10 bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
        <Quote className="w-5 h-5 text-sky-500/70 mb-2 flex-shrink-0" />
        <p className="text-slate-700 text-sm leading-relaxed font-medium">
          {note}
        </p>
        <p className="text-slate-400 text-[10px] font-semibold mt-3 pt-3 border-t border-slate-100">
          Clinically reviewed · {reviewDate} · QXL Diagnostics NABL Lab
        </p>
      </div>
    </div>
  );
}
