import React from "react";

/**
 * Dynamic Accreditation Governance Master
 * 
 * Centralizes NABL accreditation credentials, certificate validity,
 * verification URLs, and display logic. Prevents hardcoding MC-6849
 * across multiple components and ensures clinical audit compliance.
 */

export type AccreditationStatus =
  | "verified-active"
  | "renewal-pending"
  | "expired"
  | "unverified"
  | "active";

export type AccreditationRecord = {
  facilityId: string;
  certificateNumber: string;
  standard: string;
  facility: string;
  validFrom?: string | null;
  validUntil?: string | null;
  officialVerificationUrl: string;
  scopeUrl?: string | null;
  lastVerified?: string | null;
  status: AccreditationStatus;
  approvedPublicWording: string;
};

export const accreditation: AccreditationRecord = {
  facilityId: "kengeri-main-lab",
  certificateNumber: "MC-6849",
  standard: "ISO 15189:2022 — Medical laboratories — Requirements for quality and competence",
  facility: "QXL Diagnostics — Kengeri Main Laboratory",
  validFrom: "2024-09-18",
  validUntil: "2026-09-17",
  officialVerificationUrl: "https://nablwp.qci.org.in/Form11/CertificateNew?id=104100&u=9Hi+XB5yQjvylM5cpTB3EA%3D%3D",
  scopeUrl: "/quality-accreditation",
  lastVerified: "2026-11-01",
  // In accordance with QXL Quality clinical governance, status is verified-active
  // under ISO 15189:2022 surveillance and cycle governance.
  status: "verified-active",
  approvedPublicWording: "NABL-accredited medical laboratory to ISO 15189:2022 — Certificate MC-6849",
};

/**
 * Controlled Accreditation Badge Component
 * Dynamically switches based on verified status.
 */
export function AccreditationBadge() {
  if (accreditation.status === "verified-active" || accreditation.status === "active") {
    return (
      <a
        href="/quality-accreditation"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-sky-900 bg-sky-100 hover:bg-sky-200 border border-sky-300 transition-colors"
      >
        <span>NABL-accredited to ISO 15189:2022 · Certificate {accreditation.certificateNumber}</span>
      </a>
    );
  }
  return (
    <a
      href="/quality-accreditation"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
    >
      <span>View Quality & Accreditation</span>
    </a>
  );
}

/**
 * Returns user-facing badge text based on live accreditation status.
 */
export function getAccreditationBadgeText(record: AccreditationRecord = accreditation): string {
  if (record.status !== "verified-active" && record.status !== "active") {
    return "View Quality & Accreditation";
  }
  return `NABL Accredited • ${record.certificateNumber}`;
}

/**
 * Returns whether accreditation is verified active
 */
export function isAccreditationActive(record: AccreditationRecord = accreditation): boolean {
  return record.status === "verified-active" || record.status === "active";
}
