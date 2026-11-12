/**
 * QXL DIAGNOSTICS — DOCTOR & MEDICAL SPECIALIST MASTER (SINGLE SOURCE OF TRUTH)
 * Governs all doctor profiles, clinical disciplines, qualifications, and
 * laboratory report review / authorization roles.
 * 
 * Clinical Rule: Reports are verified according to test discipline, report
 * complexity, and statutory signatory requirements.
 */

export interface MedicalSpecialist {
  id: string;
  name: string;
  salutation: string;
  role: string;
  qualification: string;
  discipline: 'CLINICAL_BIOCHEMISTRY' | 'HISTOPATHOLOGY' | 'MICROBIOLOGY' | 'PATHOLOGY_HAEMATOLOGY';
  isFounder: boolean;
  registrationNumber?: string;
  slug: string;
  image: string;
  imagePosition?: string;
  experienceYears: string;
  areasOfExpertise: string[];
  authorisationRole: {
    signatoryAuthority: string[];
    criticalValueEscalation: boolean;
    clinicalConsultationAvailable: boolean;
    governanceSummary: string;
  };
  academicBackground: string;
  nablCredentials?: string;
}

export const DOCTOR_MASTER: Record<string, MedicalSpecialist> = {
  DR_SHANTAKUMAR_MURUDA: {
    id: "DOC-QXL-001",
    name: "Dr. Shantakumar Muruda",
    salutation: "Dr.",
    role: "Founder & Chief Executive Officer / Clinical Biochemist",
    qualification: "MD (Medical Biochemistry)",
    discipline: "CLINICAL_BIOCHEMISTRY",
    isFounder: true,
    slug: "/dr-shantakumar-muruda",
    image: "/founder.jpeg",
    imagePosition: "center 15%",
    experienceYears: "Over 20 years",
    areasOfExpertise: [
      "Clinical Biochemistry",
      "Endocrinology & Diabetology Assays",
      "Cardiovascular Biomarkers & Lipidology",
      "Laboratory Quality Systems & ISO 15189 Implementation",
    ],
    authorisationRole: {
      signatoryAuthority: [
        "Biochemistry & Immunoassay Profiles",
        "Diabetes (HbA1c HPLC, Insulin, C-Peptide)",
        "Advanced Lipids (ApoB, Lp(a), hs-CRP)",
        "Specialist Hormone & Renal Chemistry",
      ],
      criticalValueEscalation: true,
      clinicalConsultationAvailable: true,
      governanceSummary: "Oversees analytical biochemistry quality control (IQC/EQAS), Westgard rule compliance, and signs off on high-complexity clinical biochemistry reports.",
    },
    academicBackground: "MD in Medical Biochemistry; PHFI-certified in Diabetology.",
    nablCredentials: "Empaneled NABL Lead Assessor with over 150+ hospital and medical laboratory audit assessments across India.",
  },

  DR_PRITILATA_ROUT: {
    id: "DOC-QXL-002",
    name: "Dr. Pritilata Rout",
    salutation: "Dr.",
    role: "Senior Consultant Histopathologist",
    qualification: "MD (Pathology), PDF (Neuropathology, NIMHANS)",
    discipline: "HISTOPATHOLOGY",
    isFounder: false,
    slug: "/dr-pritilata-rout",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png",
    experienceYears: "28+ years (Since 1996)",
    areasOfExpertise: [
      "Histopathology & Surgical Biopsy",
      "Neuropathology & Epilepsy Pathology",
      "Oncopathology & Tumour Margins",
      "Fine Needle Aspiration Cytology (FNAC)",
    ],
    authorisationRole: {
      signatoryAuthority: [
        "Histopathology Biopsy Evaluations",
        "Cytopathology & FNAC",
        "Immunohistochemistry (IHC) Panels",
        "Oncology Second Opinions",
      ],
      criticalValueEscalation: true,
      clinicalConsultationAvailable: true,
      governanceSummary: "Directs tissue diagnostics and microscopic examinations, providing authoritative reports for surgical biopsies and oncological specimens.",
    },
    academicBackground: "Post-doctoral fellowship (PDF) in Neuropathology from NIMHANS Bengaluru (2001); MD in Pathology.",
    nablCredentials: "Senior peer reviewer for histopathology and cytopathology quality management systems.",
  },

  DR_AJITHA_PILLAI: {
    id: "DOC-QXL-003",
    name: "Dr. Ajitha Pillai",
    salutation: "Dr.",
    role: "Senior Consultant Microbiologist",
    qualification: "MD (Microbiology)",
    discipline: "MICROBIOLOGY",
    isFounder: false,
    slug: "/dr-ajitha-pillai",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg",
    experienceYears: "25+ years",
    areasOfExpertise: [
      "Clinical Microbiology & Culture Sensitivity",
      "Infectious Disease Serology & PCR",
      "Hospital Infection Control & Antibiograms",
      "Automated Blood Culture & Pathogen Identification",
    ],
    authorisationRole: {
      signatoryAuthority: [
        "Aerobic & Anaerobic Culture Reports",
        "Antibiotic Susceptibility Testing (AST / MIC)",
        "Infectious Serology (HIV, Hepatitis, Syphilis)",
        "Molecular Pathogen Detection",
      ],
      criticalValueEscalation: true,
      clinicalConsultationAvailable: true,
      governanceSummary: "Validates pathogen isolates, reviews minimum inhibitory concentrations (MIC), and authorizes microbiology and molecular infectious disease reports.",
    },
    academicBackground: "MD in Microbiology with 25+ years in teaching and tertiary diagnostic hospital microbiology.",
    nablCredentials: "Expert evaluator for microbiology pre-analytical and biological safety compliance.",
  },

  DR_NAVEEN_KUMAR_N: {
    id: "DOC-QXL-004",
    name: "Dr. Naveen Kumar N",
    salutation: "Dr.",
    role: "Consultant Pathologist",
    qualification: "DCP, DNB (Pathology)",
    discipline: "PATHOLOGY_HAEMATOLOGY",
    isFounder: false,
    slug: "/dr-naveen-kumar-n",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg",
    experienceYears: "10+ years",
    areasOfExpertise: [
      "Haematology & Peripheral Blood Smear Examination",
      "Clinical Pathology & Urinalysis",
      "Coagulation & Thrombosis Profiling",
      "Daily Quality Control (IQC) Management",
    ],
    authorisationRole: {
      signatoryAuthority: [
        "Complete Blood Count (CBC) Smear Verifications",
        "Haematology Delta-Check Discrepancies",
        "Clinical Pathology & Fluid Analyses",
        "Routine Coagulation (PT/INR, APTT)",
      ],
      criticalValueEscalation: true,
      clinicalConsultationAvailable: true,
      governanceSummary: "Supervises day-to-day haematology instrumentation, manual slide reviews for abnormal cell morphology, and authorises routine pathology reports.",
    },
    academicBackground: "DCP, DNB in Pathology with specialization in laboratory quality control and hematological morphology.",
    nablCredentials: "Internal Auditor for ISO 15189:2022 laboratory quality management.",
  },
};

/**
 * Standard legal and medical governance statement across all QXL pages
 */
export const CANONICAL_REVIEWER_STATEMENT = 
  "Laboratory results are reviewed and authorised according to QXL's validated reporting workflow and by appropriately qualified laboratory professionals based on test discipline, report complexity and signatory requirements.";

/**
 * Returns all medical specialists
 */
export function getAllDoctors(): MedicalSpecialist[] {
  return Object.values(DOCTOR_MASTER);
}

/**
 * Retrieves a doctor by slug or ID
 */
export function getDoctor(slugOrId: string): MedicalSpecialist | undefined {
  return Object.values(DOCTOR_MASTER).find(
    (d) => d.id === slugOrId || d.slug === slugOrId || d.name.toLowerCase() === slugOrId.toLowerCase()
  );
}

