import React from 'react';
import Link from 'next/link';
import { UserCheck, ShieldCheck } from 'lucide-react';

interface Props {
  doctorName?: string;
  qualifications?: string;
  reviewDate?: string;
}

export default function MedicalReviewerBadge({
  doctorName = "Dr. Shantakumar Muruda",
  qualifications = "MD (Biochemistry)",
  reviewDate = "18 August 2026",
}: Props) {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-100 px-3.5 py-1.5 rounded-xl text-xs backdrop-blur-sm">
      <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>
        Medically Reviewed by{" "}
        <Link
          href="/doctors/dr-shantakumar-muruda-6f7b6161"
          className="font-bold underline hover:text-emerald-300 transition-colors"
        >
          {doctorName}, {qualifications}
        </Link>
      </span>
      <span className="text-emerald-400/60 hidden sm:inline">•</span>
      <span className="text-emerald-200/90 text-[11px]">Clinically Reviewed: {reviewDate}</span>
    </div>
  );
}
