/**
 * Canonical Accreditation & Quality Governance Constants for QXL Diagnostics.
 *
 * Primary NABL Accreditation: MC-6849 (ISO 15189:2022)
 * Do NOT hardcode "MC-6849" or "NABL Accredited" elsewhere in the codebase.
 */

export const NABL_CERTIFICATE = "MC-6849";
export const NABL_LEGACY_CERTIFICATE_DISCLAIMER = "MC-6849 (formerly MC-6849)";
export const ISO_STANDARD = "ISO 15189:2022";
export const NABL_ACCREDITATION_TEXT = "NABL accredited medical laboratory (ISO 15189:2022) · Certificate No. MC-6849";

export const ACCREDITATION_SCOPE = [
  "Clinical Biochemistry & Immunoassay",
  "Haematology & Immunohaematology",
  "Histopathology & Surgical Pathology",
  "Cytopathology & Liquid-Based Pap Smear",
  "Microbiology & Infectious Disease Serology",
  "Molecular Diagnostics & Real-Time PCR"
];

export const ACCREDITATION_DETAILS = {
  accreditationBody: "National Accreditation Board for Testing and Calibration Laboratories (NABL)",
  parentOrganization: "Quality Council of India (QCI), Govt. of India",
  standard: "ISO 15189:2022 Medical Laboratories — Requirements for Quality and Competence",
  certificateNumber: "MC-6849",
  verificationPortalUrl: "https://www.nabl-india.org",
  governanceLead: "Dr. Shantakumar Muruda, MD (Biochemistry), Empaneled NABL Lead Assessor",
  pathologyLead: "Dr. Pritilata Rout, MD (Pathology), NIMHANS Alumna, Senior Consultant Histopathologist"
};
