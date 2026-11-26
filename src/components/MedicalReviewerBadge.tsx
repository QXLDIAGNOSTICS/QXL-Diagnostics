import React from 'react';
import Link from 'next/link';
import { UserCheck } from 'lucide-react';
import { getMedicalReview, formatReviewDate } from '@/lib/medicalReviews';

interface Props {
  doctorName?: string;
  doctorSlug?: string;
  qualifications?: string;
  /** Page path used to look up a genuine review record. */
  path: string;
}

/**
 * Shows "Medically reviewed … on <date>" only when src/lib/medicalReviews.ts holds a
 * sign-off for this page; otherwise names the assigned reviewer with "review pending".
 */
export default function MedicalReviewerBadge({
  doctorName = "Dr. Shantakumar Muruda",
  doctorSlug = "dr-shantakumar-muruda",
  qualifications = "MD (Biochemistry)",
  path,
}: Props) {
  const review = getMedicalReview(path);
  const name = review?.reviewerName ?? doctorName;
  const slug = review?.reviewerSlug ?? doctorSlug;
  const profileHref = slug.startsWith("/") ? slug : `/${slug}`;
  return (
    <div className="inline-flex flex-wrap items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-100 px-3.5 py-1.5 rounded-xl text-xs backdrop-blur-sm">
      <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>
        {review ? "Medically Reviewed by" : "Medical reviewer:"}{" "}
        <Link
          href={profileHref}
          className="font-bold underline hover:text-emerald-300 transition-colors"
        >
          {name}{review ? "" : `, ${qualifications}`}
        </Link>
      </span>
      <span className="text-emerald-400/60 hidden sm:inline">•</span>
      <span className="text-emerald-200/90 text-[11px]">
        {review ? `Reviewed: ${formatReviewDate(review.reviewedOn)}` : "Clinical review pending"}
      </span>
    </div>
  );
}
