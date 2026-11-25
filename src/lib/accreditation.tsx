import React from "react";
import Link from "next/link";

/**
 * Dynamic Accreditation Governance Master
 * 
 * Centralizes NABL accreditation credentials, certificate validity,
 * verification URLs, and display logic. Prevents hardcoding NABLM1126KA10694
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
  certificateImageUrl?: string;
  replacesCertificate?: string;
  /** Facility name exactly as printed on the NABL certificate. */
  registeredName?: string;
  /** Facility address exactly as printed on the certificate. */
  registeredAddress?: string;
  legalEntity?: string;
  fieldOfAccreditation?: string;
  issuingAuthority?: string;
  validityNote?: string;
  signatories?: { name: string; title: string }[];
};

const NABL_VALIDITY_NOTE =
  "This certificate remains valid for the Scope of Accreditation as specified in the annexure subject to continued satisfactory compliance to the above standard & the relevant requirements of NABL. (To see the scope of accreditation of this laboratory, you may also visit NABL website www.nabl-india.org)";

export const accreditation: AccreditationRecord = {
  facilityId: "kengeri-main-lab",
  certificateNumber: "NABLM1126KA10694",
  standard: "ISO 15189:2022 — Medical laboratories — Requirements for quality and competence",
  facility: "QXL Diagnostics — Kengeri Main Laboratory",
  validFrom: "2026-11-23",
  validUntil: "2030-11-22",
  officialVerificationUrl: "https://nablwp.qci.org.in/Form11/CertificateNew?id=104100&u=9Hi+XB5yQjvylM5cpTB3EA%3D%3D",
  scopeUrl: "/quality-accreditation",
  lastVerified: "2026-11-25",
  // In accordance with QXL Quality clinical governance, status is verified-active
  // under ISO 15189:2022 surveillance and cycle governance.
  status: "verified-active",
  approvedPublicWording: "NABL-accredited medical laboratory to ISO 15189:2022 — Certificate NABLM1126KA10694",
  certificateImageUrl: "/certificates/nabl-kengeri-NABLM1126KA10694.jpeg",
  replacesCertificate: "MC-6849",
  registeredName: "QXL DIAGNOSTICS SUPER SPECIALITY LAB, UNIT OF QUALITIFY HEALTHTECH PRIVATE LIMITED",
  registeredAddress: "3RD FLOOR, SLN COMPLEX, MYSORE ROAD, KENGERI, BENGALURU, BENGALURU URBAN, KARNATAKA, INDIA",
  legalEntity: "QUALITIFY HEALTHTECH PRIVATE LIMITED",
  fieldOfAccreditation: "MEDICAL TESTING",
  issuingAuthority: "National Accreditation Board for Testing and Calibration Laboratories (NABL) / ilac-MRA",
  validityNote: NABL_VALIDITY_NOTE,
  signatories: [
    { name: "Anuja Anand", title: "Director" },
    { name: "Dr. Ramanand N. Shukla", title: "Chief Executive Officer" },
  ],
};

/**
 * North Hub at North City Specialities, Yelahanka — independently accredited
 * under its own NABL certificate (separate scope from the Kengeri main lab).
 */
export const northHubAccreditation: AccreditationRecord = {
  facilityId: "yelahanka-north-hub",
  certificateNumber: "MC-10025",
  standard: "ISO 15189:2022 — Medical laboratories — Requirements for quality and competence",
  facility: "QXL Diagnostics – Super Speciality Lab North Hub at North City Specialities, Yelahanka",
  validFrom: "2026-04-02",
  validUntil: "2030-04-01",
  officialVerificationUrl: "https://nablwp.qci.org.in/",
  scopeUrl: "/quality-accreditation",
  lastVerified: "2026-11-25",
  status: "verified-active",
  approvedPublicWording: "NABL-accredited medical laboratory to ISO 15189:2022 — Certificate MC-10025 (North Hub, Yelahanka)",
  certificateImageUrl: "/certificates/nabl-north-hub-MC-10025.jpeg",
  registeredName: "QXL DIAGNOSTICS – SUPER SPECIALITY LAB NORTH HUB AT NORTH CITY SPECIALITIES (A UNIT OF QUALITIFY HEALTHTECH PRIVATE LIMITED)",
  registeredAddress: "1ST FLOOR, NORTH CITY SPECIALITIES, YELAHANKA NEW TOWN, BENGALURU, YELAHANKA, KARNATAKA, INDIA",
  legalEntity: "QUALITIFY HEALTHTECH PRIVATE LIMITED",
  fieldOfAccreditation: "MEDICAL TESTING",
  issuingAuthority: "National Accreditation Board for Testing and Calibration Laboratories (NABL) / ilac-MRA",
  validityNote: NABL_VALIDITY_NOTE,
  signatories: [
    { name: "Pankaj Johri", title: "Director" },
    { name: "Dr. Ramanand N. Shukla", title: "Chief Executive Officer" },
  ],
};

export const allAccreditations: AccreditationRecord[] = [accreditation, northHubAccreditation];

/**
 * Controlled Accreditation Badge Component
 * Dynamically switches based on verified status.
 */
export function AccreditationBadge() {
  if (accreditation.status === "verified-active" || accreditation.status === "active") {
    return (
      <Link
        href="/quality-accreditation"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-sky-900 bg-sky-100 hover:bg-sky-200 border border-sky-300 transition-colors"
      >
        <span>NABL-accredited to ISO 15189:2022 · Certificate {accreditation.certificateNumber}</span>
      </Link>
    );
  }
  return (
    <Link
      href="/quality-accreditation"
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
    >
      <span>View Quality & Accreditation</span>
    </Link>
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
