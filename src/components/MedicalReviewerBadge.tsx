import React from 'react';
import Link from 'next/link';
import { UserCheck, ShieldCheck } from 'lucide-react';
import { getAutoReviewDate } from '@/lib/dateUtils';

interface Props {
  doctorName?: string;
  doctorSlug?: string;
  qualifications?: string;
  reviewDate?: string;
}

export default function MedicalReviewerBadge({
  doctorName = "Dr. Shantakumar Muruda",
  doctorSlug = "dr-shantakumar-muruda",
  qualifications = "MD (Biochemistry)",
  reviewDate,
}: Props) {
  const displayReviewDate = getAutoReviewDate(reviewDate);
  const profileHref = doctorSlug.startsWith("/") ? doctorSlug : `/${doctorSlug}`;
  return (
    <div className="inline-flex flex-wrap items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-100 px-3.5 py-1.5 rounded-xl text-xs backdrop-blur-sm">
      <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>
        Medically Reviewed by{" "}
        <Link
          href={profileHref}
          className="font-bold underline hover:text-emerald-300 transition-colors"
        >
          {doctorName}, {qualifications}
        </Link>
      </span>
      <span className="text-emerald-400/60 hidden sm:inline">•</span>
      <span className="text-emerald-200/90 text-[11px]">Clinically Reviewed: {displayReviewDate}</span>
    </div>
  );
}
