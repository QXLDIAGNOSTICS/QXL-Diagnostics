import React from 'react';
import { UserCheck, BookOpen, Lock, Award } from 'lucide-react';
import { NABL_CERTIFICATE } from '@/lib/businessInfo';
import { getMedicalReview, formatReviewDate } from '@/lib/medicalReviews';

interface Props {
  reviewedBy?: string;
  reviewerTitle?: string;
  /** Page path; "Clinically reviewed" and a date appear only with a registry record. */
  path: string;
}

export default function MedicalReviewNotice({
  reviewedBy = "Dr. Shantakumar Muruda, MD (Biochemistry)",
  reviewerTitle = "Consultant Clinical Biochemist, Founder & CEO – QXL Diagnostics, NABL Lead & Technical Assessor",
  path,
}: Props) {
  const review = getMedicalReview(path);
  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-7 space-y-4 my-8 text-xs text-slate-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#2563eb]">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 block text-xs">
              {review ? `Clinically Reviewed by ${review.reviewerName}` : `Assigned medical reviewer: ${reviewedBy}`}
            </span>
            <span className="text-[11px] text-slate-500">{reviewerTitle}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold">
            <Award className="w-3 h-3" /> NABL Accredited ({NABL_CERTIFICATE})
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            {review ? `Reviewed: ${formatReviewDate(review.reviewedOn)}` : "Clinical review pending"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 leading-relaxed text-[11.5px]">
        <div>
          <strong className="text-slate-800 block mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#2563eb]" /> Clinical Reference Standards:
          </strong>
          Content developed in alignment with Koneman&apos;s Color Atlas and Textbook of Diagnostic Microbiology (7th Edition, Chapters 2, 11, and 20), CDC Sexually Transmitted Infections Treatment Guidelines, World Health Organization (WHO) Post-Exposure Prophylaxis (PEP) protocols, and NACO HIV diagnostic algorithms.
        </div>

        <div>
          <strong className="text-slate-800 block mb-1 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-600" /> Patient Privacy &amp; Specimen Safety:
          </strong>
          All sexual health investigations adhere to strict confidential diagnostic protocols. Doorstep sample collection is conducted by trained phlebotomy specialists in unmarked packaging. Digital reports are encrypted and delivered directly to the patient with optional anonymous barcode reporting.
        </div>
      </div>
    </div>
  );
}

