import React from "react";
import Link from "next/link";
import { UserCheck, Calendar, BookOpen, ExternalLink } from "lucide-react";

export interface ReferenceItem {
  title: string;
  url: string;
  journalOrPublisher?: string;
}

export interface MedicalReviewProps {
  reviewerName: string;
  qualification: string;
  profileUrl: string;
  reviewedDate: string;
  department?: string;
  references?: ReferenceItem[];
}

export function MedicalReview({
  reviewerName,
  qualification,
  profileUrl,
  reviewedDate,
  department,
  references = []
}: MedicalReviewProps) {
  return (
    <aside className="p-5 my-8 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 space-y-4 shadow-sm" aria-label="Medical Review & References">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900">
              Medically reviewed by{" "}
              <Link href={profileUrl} className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-2">
                {reviewerName}
              </Link>
              , <span className="font-medium text-slate-600">{qualification}</span>
            </p>
            {department && (
              <p className="text-[11px] text-slate-500">{department}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Last reviewed: </span>
          <time dateTime={reviewedDate} className="font-semibold text-slate-700">
            {reviewedDate}
          </time>
        </div>
      </div>

      {references.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <h3>Authoritative Medical References</h3>
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-600">
            {references.map((ref, idx) => (
              <li key={idx} className="leading-normal">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 hover:underline inline-flex items-center gap-1"
                >
                  <span>{ref.title}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                {ref.journalOrPublisher && (
                  <span className="text-slate-500"> — {ref.journalOrPublisher}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </aside>
  );
}

export default MedicalReview;
