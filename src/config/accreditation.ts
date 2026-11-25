/**
 * Canonical Accreditation & Quality Governance Constants for QXL Diagnostics.
 *
 * Primary NABL Accreditation: NABLM1126KA10694 (ISO 15189:2022)
 * Do NOT hardcode "NABLM1126KA10694" or "NABL Accredited" elsewhere in the codebase.
 */

import { accreditation, getAccreditationBadgeText, isAccreditationActive } from '@/lib/accreditation';

export { accreditation, getAccreditationBadgeText, isAccreditationActive };
export const NABL_CERTIFICATE = accreditation.certificateNumber;
export const NABL_LEGACY_CERTIFICATE_DISCLAIMER = `${accreditation.certificateNumber} (ISO 15189:2022)`;
export const ISO_STANDARD = accreditation.standard;
export const NABL_ACCREDITATION_TEXT = getAccreditationBadgeText(accreditation);

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
  certificateNumber: "NABLM1126KA10694",
  legalEntity: "Qualitify Healthtech Private Limited (QXL Diagnostics)",
  discipline: "Medical Testing Laboratory",
  validityReference: "Certificate NABLM1126KA10694 (in lieu of MC-6849), issued 23 November 2026, valid until 22 November 2030",
  northHubCertificateNumber: "MC-10025",
  northHubValidity: "Issued 2 April 2026, valid until 1 April 2030",
  northHubAddress: "1st Floor, North City Specialities, Yelahanka New Town, Bengaluru, Karnataka",
  verificationPortalUrl: "https://nablwp.qci.org.in/",
  primaryLabAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060",
  governanceLead: "Dr. Shantakumar Muruda, MD (Biochemistry), Empaneled NABL Lead Assessor",
  pathologyLead: "Dr. Pritilata Rout, MD (Pathology), NIMHANS Alumna, Senior Consultant Histopathologist"
};
