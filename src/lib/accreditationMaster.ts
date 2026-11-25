/**
 * QXL Diagnostics — Central Accreditation Master
 * Single Source of Truth for Quality & Regulatory Credentials
 *
 * Governs NABL Certificate, ISO Standards, validity windows,
 * and strict terminology rules across all web pages and components.
 */

export interface FacilityAccreditation {
  facility_id: string;
  facility_name: string;
  certificate_number: string;
  standard: string;
  status: "Active" | "Renewal In Progress" | "Suspended";
  issue_date: string;
  valid_until: string;
  scope_url: string;
  certificate_url: string;
  last_verified: string;
  approved_wording: string;
  accreditation_body: string;
}

export const MAIN_LAB_ACCREDITATION: FacilityAccreditation = {
  facility_id: "QXL-BLR-KENGERI-01",
  facility_name: "QXL Diagnostics Super Speciality Reference Laboratory (Qualitify Healthtech Pvt Ltd)",
  certificate_number: "NABLM1126KA10694",
  standard: "ISO 15189:2022",
  status: "Active",
  issue_date: "2026-11-23",
  valid_until: "2030-11-22",
  scope_url: "https://qxldiagnostics.com/quality",
  certificate_url: "https://qxldiagnostics.com/certificates/nabl-kengeri-NABLM1126KA10694.jpeg",
  last_verified: "2026-11-25",
  approved_wording: "NABL-accredited medical laboratory under Certificate NABLM1126KA10694 (ISO 15189:2022 standards)",
  accreditation_body: "National Accreditation Board for Testing and Calibration Laboratories (NABL), India",
};

export const NORTH_HUB_ACCREDITATION: FacilityAccreditation = {
  facility_id: "QXL-BLR-YLH-02",
  facility_name: "QXL Diagnostics – Super Speciality Lab North Hub at North City Specialities (a unit of Qualitify Healthtech Pvt Ltd)",
  certificate_number: "MC-10025",
  standard: "ISO 15189:2022",
  status: "Active",
  issue_date: "2026-04-02",
  valid_until: "2030-04-01",
  scope_url: "https://qxldiagnostics.com/quality-accreditation",
  certificate_url: "https://qxldiagnostics.com/certificates/nabl-north-hub-MC-10025.jpeg",
  last_verified: "2026-11-25",
  approved_wording: "NABL-accredited medical laboratory under Certificate MC-10025 (ISO 15189:2022) — North Hub, 1st Floor, North City Specialities, Yelahanka New Town, Bengaluru",
  accreditation_body: "National Accreditation Board for Testing and Calibration Laboratories (NABL), India",
};

export const ALL_FACILITY_ACCREDITATIONS: FacilityAccreditation[] = [MAIN_LAB_ACCREDITATION, NORTH_HUB_ACCREDITATION];

/**
 * Standardized marketing text helpers to avoid loose terminology.
 */
export const ACCREDITATION_TERMS = {
  BADGE_LABEL: "NABL-Accredited Medical Laboratory",
  SHORT_BADGE: "NABL Accredited (NABLM1126KA10694)",
  STANDARDS_TAG: "ISO 15189:2022 Medical Laboratory Standards",
  PHLEBOTOMY_ROLE: "Trained Phlebotomy Specialist",
  REPORT_SIGNATORY: "Appropriately qualified laboratory professionals according to test discipline and QXL authorization policy",
} as const;

/**
 * Audit-enforced prohibited patterns.
 */
export const PROHIBITED_CREDENTIAL_PATTERNS = [
  /100% precision/i,
  /NABL Certified/i,
  /certified phlebotomist/i,
  /every single report.*pathologist/i,
  /all reports within 6–?12 hours/i,
] as const;

export function validateAccreditationText(text: string): string[] {
  const violations: string[] = [];
  for (const pattern of PROHIBITED_CREDENTIAL_PATTERNS) {
    if (pattern.test(text)) {
      violations.push(`Prohibited credential/terminology detected: ${pattern}`);
    }
  }
  return violations;
}

