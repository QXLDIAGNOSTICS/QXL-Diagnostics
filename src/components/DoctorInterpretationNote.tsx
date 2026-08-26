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
    <div className="bg-gradient-to-br from-[#0f2d5e] to-[#1a4070] rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#2563eb]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start gap-4 mb-5 relative z-10">
        {/* Doctor avatar */}
        <div className="flex-shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={doctorName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-[#2563eb]/40 border border-white/20 flex items-center justify-center text-2xl font-black text-white shadow-inner">
              {doctorName.charAt(3).toUpperCase()}
            </div>
          )}
        </div>

        {/* Doctor info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BadgeCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest">
              Doctor-Reviewed Content
            </span>
          </div>
          <Link
            href={`/${doctorSlug}`}
            className="font-extrabold text-white text-sm hover:text-sky-300 transition-colors"
          >
            {doctorName}
          </Link>
          <p className="text-sky-200 text-[11px] font-medium mt-0.5">
            {qualifications} · {specialty}
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="relative z-10 bg-white/8 border border-white/15 rounded-2xl p-5 backdrop-blur-sm">
        <Quote className="w-5 h-5 text-sky-400/60 mb-2 flex-shrink-0" />
        <p className="text-blue-100 text-sm leading-relaxed font-medium">
          {note}
        </p>
        <p className="text-sky-300/60 text-[10px] font-semibold mt-3 pt-3 border-t border-white/10">
          Clinically reviewed · {reviewDate} · QXL Diagnostics NABL Lab
        </p>
      </div>
    </div>
  );
}
