/**
 * QXL DIAGNOSTICS — MARKETING & CLINICAL CLAIMS MASTER (SINGLE SOURCE OF TRUTH)
 * Governs all approved marketing statements, clinical boundaries, evidence sources,
 * approving authorities, and prohibited marketing overstatements.
 * 
 * Medical Rule: Marketing copy must never outrun operational reality or
 * clinical guidelines (e.g. acute emergency protocols, NABL scope, fasting requirements).
 */

export interface GovernedClaim {
  id: string;
  topic: string;
  approvedText: string;
  prohibitedTerms: string[];
  evidenceSource: string;
  approvingPerson: string;
  approvalRole: string;
  lastReviewDate: string;
  category: 'ACCREDITATION' | 'HOME_COLLECTION' | 'MEDICAL_SAFETY' | 'TAT' | 'CLINICAL_INTERPRETATION';
}

export const CLAIMS_MASTER: Record<string, GovernedClaim> = {
  ACCREDITATION_CLAIM: {
    id: "CLM-ACC-01",
    topic: "NABL Accreditation Status",
    approvedText: "QXL Diagnostics Super Speciality Reference Laboratory is an NABL-accredited medical testing laboratory under Certificate Number MC-6849, operating in accordance with ISO 15189:2022 standards.",
    prohibitedTerms: [
      "NABL Certified",
      "certified phlebotomist",
      "100% precision",
      "100% accuracy",
      "MC-10025",
    ],
    evidenceSource: "Official NABL Certificate MC-6849 under ISO 15189:2022 standard; Quality Management System Manual.",
    approvingPerson: "Dr. Shantakumar Muruda",
    approvalRole: "NABL Lead Assessor / CEO & Clinical Biochemist",
    lastReviewDate: "2026-11-01",
    category: "ACCREDITATION",
  },

  HOME_COLLECTION_SERVICEABILITY: {
    id: "CLM-COL-01",
    topic: "Home Collection Pricing & Coverage",
    approvedText: "Free home sample collection for eligible bookings across supported Bengaluru service areas. Serviceability and slot availability are confirmed by PIN code at booking.",
    prohibitedTerms: [
      "100% of pin codes in Bangalore without restriction",
      "Guaranteed collection everywhere in Karnataka within 30 minutes",
    ],
    evidenceSource: "QXL Logistics Network covering 60+ mapped Bengaluru localities with operational dispatch hubs at Kengeri and Yelahanka.",
    approvingPerson: "Operations & Logistics Directorate",
    approvalRole: "Head of Field Phlebotomy",
    lastReviewDate: "2026-11-01",
    category: "HOME_COLLECTION",
  },

  TURNAROUND_TIME: {
    id: "CLM-TAT-01",
    topic: "Laboratory Report Turnaround Times",
    approvedText: "Turnaround times are test-specific and calculated from the time of sample receipt at the processing laboratory. Routine core assays (CBC, blood sugar, lipid, renal, liver, thyroid) are typically delivered same day (6 to 12 hours). Specialized and send-out investigations adhere to validated analytical schedules.",
    prohibitedTerms: [
      "All reports in 6 hours guaranteed",
      "Instant reports for all investigations",
    ],
    evidenceSource: "Laboratory Information Management System (LIMS) analytical run validation metrics.",
    approvingPerson: "Dr. Shantakumar Muruda",
    approvalRole: "CEO & Clinical Biochemist",
    lastReviewDate: "2026-11-01",
    category: "TAT",
  },

  MEDICAL_AUTHORISATION: {
    id: "CLM-AUT-01",
    topic: "Laboratory Report Authorization",
    approvedText: "Laboratory results are reviewed and authorised according to QXL's validated reporting workflow and by appropriately qualified laboratory professionals based on test discipline, report complexity and signatory requirements.",
    prohibitedTerms: [
      "Every test reviewed by our panel of specialists",
      "All tests individually examined by an MD Pathologist",
    ],
    evidenceSource: "QXL Clinical Governance Policy & Standard Operating Procedure on Result Authorization & Delta Checks.",
    approvingPerson: "Medical Advisory Committee",
    approvalRole: "Consultant Pathologist & Clinical Biochemist Panel",
    lastReviewDate: "2026-11-01",
    category: "CLINICAL_INTERPRETATION",
  },

  CHEST_PAIN_EMERGENCY: {
    id: "CLM-SAF-01",
    topic: "Acute Chest Pain Patient Protocol",
    approvedText: "New, severe, persistent or unexplained chest pain—especially with breathlessness, sweating, nausea, fainting or pain spreading to the arm, jaw or back—requires urgent medical evaluation. Do not delay emergency care to arrange a home blood test. Call 112 or visit the nearest emergency department immediately.",
    prohibitedTerms: [
      "Book a home cardiac test if you have chest pain",
      "Wait for troponin home collection during active chest discomfort",
    ],
    evidenceSource: "American Heart Association (AHA) & ESC Acute Coronary Syndrome Emergency Clinical Guidelines.",
    approvingPerson: "Dr. Shantakumar Muruda",
    approvalRole: "CEO & Clinical Biochemist",
    lastReviewDate: "2026-11-01",
    category: "MEDICAL_SAFETY",
  },

  LIPID_FASTING_NUANCE: {
    id: "CLM-LIP-01",
    topic: "Lipid Profile Preparation",
    approvedText: "A routine lipid profile can frequently be performed without fasting for cardiovascular risk screening. A fasting sample (10 to 12 hours) may be requested when significant hypertriglyceridaemia is suspected or when specifically indicated by your clinician or laboratory protocol.",
    prohibitedTerms: [
      "10 to 12 hours strict fasting is always 100% mandatory for all cholesterol checks",
    ],
    evidenceSource: "AHA/ACC Multisociety Guideline on the Management of Blood Cholesterol & European Atherosclerosis Society Guidelines.",
    approvingPerson: "Dr. Shantakumar Muruda",
    approvalRole: "CEO & Clinical Biochemist",
    lastReviewDate: "2026-11-01",
    category: "CLINICAL_INTERPRETATION",
  },

  HBA1C_DIAGNOSTIC_CUTOFFS: {
    id: "CLM-HBA-01",
    topic: "HbA1c Diagnostic Interpretation",
    approvedText: "HbA1c ≥6.5% is within the diagnostic range for diabetes. In the absence of unequivocal hyperglycaemia, diagnosis generally requires confirmatory abnormal testing according to clinical guidelines.",
    prohibitedTerms: [
      "6.5% confirms diabetes on its own without qualification",
      "A single HbA1c test proves diabetes instantly",
    ],
    evidenceSource: "American Diabetes Association (ADA) Standards of Care in Diabetes 2026; WHO Clinical Criteria.",
    approvingPerson: "Dr. Shantakumar Muruda",
    approvalRole: "PHFI Diabetologist / CEO",
    lastReviewDate: "2026-11-01",
    category: "CLINICAL_INTERPRETATION",
  },

  SPECIMEN_TRANSPORT: {
    id: "CLM-PRE-01",
    topic: "Specimen Cold-Chain & Pre-Analytical Transport",
    approvedText: "Samples are transported under validated test-specific temperature, time and stability requirements (including 2°C–8°C cold chain where indicated) with temperature logging to preserve analyte integrity during transit.",
    prohibitedTerms: [
      "All blood specimens without exception must be kept at 2–8°C",
      "Universal freezing for all routine blood samples",
    ],
    evidenceSource: "ISO 15189:2022 Pre-analytical specimen handling SOPs; CLSI GP44-A4 procedures.",
    approvingPerson: "Dr. Shantakumar Muruda",
    approvalRole: "NABL Lead Assessor / CEO",
    lastReviewDate: "2026-11-01",
    category: "HOME_COLLECTION",
  },
};

/**
 * Validates that candidate copy does not contain prohibited marketing terms
 */
export function validateClaimCopy(text: string): { isValid: boolean; violations: string[] } {
  const violations: string[] = [];
  for (const claim of Object.values(CLAIMS_MASTER)) {
    for (const term of claim.prohibitedTerms) {
      if (text.toLowerCase().includes(term.toLowerCase())) {
        violations.push(`Violation of claim ${claim.id}: "${term}" found in text`);
      }
    }
  }
  return {
    isValid: violations.length === 0,
    violations,
  };
}

