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
  certificate_number: "MC-6849",
  standard: "ISO 15189:2022",
  status: "Active",
  issue_date: "2024-09-18",
  valid_until: "17 September 2026 (continuation & cycloid surveillance in progress)",
  scope_url: "https://qxldiagnostics.com/quality",
  certificate_url: "https://qxldiagnostics.com/quality#certificate",
  last_verified: "2026-11-01",
  approved_wording: "NABL-accredited medical laboratory under Certificate MC-6849 (ISO 15189:2022 standards)",
  accreditation_body: "National Accreditation Board for Testing and Calibration Laboratories (NABL), India",
};

/**
 * Standardized marketing text helpers to avoid loose terminology.
 */
export const ACCREDITATION_TERMS = {
  BADGE_LABEL: "NABL-Accredited Medical Laboratory",
  SHORT_BADGE: "NABL Accredited (MC-6849)",
  STANDARDS_TAG: "ISO 15189:2022 Medical Laboratory Standards",
  PHLEBOTOMY_ROLE: "Trained Phlebotomy Specialist",
  REPORT_SIGNATORY: "Appropriately qualified laboratory professionals according to test discipline and QXL authorization policy",
} as const;

/**
 * Audit-enforced prohibited patterns.
 */
export const PROHIBITED_CREDENTIAL_PATTERNS = [
  /MC-10025/i,
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

