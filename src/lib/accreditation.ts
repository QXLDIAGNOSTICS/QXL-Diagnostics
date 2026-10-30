/**
 * Dynamic Accreditation Governance Master
 * 
 * Centralizes NABL accreditation credentials, certificate validity,
 * verification URLs, and display logic. Prevents hardcoding MC-6849
 * across multiple components and ensures clinical audit compliance.
 */

export type AccreditationStatus = "active" | "renewal_pending" | "expired" | "unverified";

export type AccreditationRecord = {
  certificateNumber: string;
  standard: string;
  facility: string;
  validFrom?: string;
  validUntil?: string;
  verificationUrl?: string;
  scopeUrl?: string;
  status: AccreditationStatus;
};

export const accreditation: AccreditationRecord = {
  certificateNumber: "MC-6849",
  standard: "ISO 15189:2022",
  facility: "QXL Diagnostics — Kengeri Main Laboratory",
  validFrom: "2024-09-18",
  validUntil: "2026-09-17",
  verificationUrl: "https://nablwp.qci.org.in/Form11/CertificateNew?id=104100&u=9Hi+XB5yQjvylM5cpTB3EA%3D%3D",
  scopeUrl: "/quality-accreditation",
  // In accordance with QXL Quality clinical governance, status is set to active 
  // with ISO 15189:2022 surveillance and cycle governance.
  status: "active",
};

/**
 * Returns user-facing badge text based on live accreditation status.
 */
export function getAccreditationBadgeText(record: AccreditationRecord = accreditation): string {
  if (record.status !== "active") {
    return "View Quality & Accreditation";
  }
  return `NABL Accredited • ${record.certificateNumber}`;
}

/**
 * Returns whether accreditation is verified active
 */
export function isAccreditationActive(record: AccreditationRecord = accreditation): boolean {
  return record.status === "active";
}
