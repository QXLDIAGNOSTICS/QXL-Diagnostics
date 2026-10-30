/**
 * Centralized Diagnostic Test Master & Clinical Governance Specification
 *
 * Implements the single source of truth for assay definitions, pricing, specimen
 * requirements, turnaround times, and automated quality validation.
 */

export type AccreditationScopeStatus =
  | "verified-in-scope"
  | "not-in-scope"
  | "not-verified";

export type TestRecord = {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  price: number;
  mrp?: number;
  specimen: string;
  fasting: string;
  tat: string;
  methodology?: string;
  homeCollection: boolean;
  accreditationScope: AccreditationScopeStatus;
  reviewer?: {
    name: string;
    qualification: string;
    profileUrl: string;
  };
};

export const MASTER_TESTS: Record<string, TestRecord> = {
  HBA1C: {
    id: "HBA1C",
    slug: "/hba1c-test-bangalore",
    name: "HbA1c (Glycated Haemoglobin)",
    aliases: ["Glycated Haemoglobin", "Glycosylated Haemoglobin", "A1c"],
    price: 380,
    mrp: 600,
    specimen: "EDTA Whole Blood",
    fasting: "Not required",
    tat: "6 hours",
    methodology: "High-Performance Liquid Chromatography (HPLC) - NGSP & IFCC Certified",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  },
  CBC: {
    id: "CBC",
    slug: "/cbc-test-bangalore",
    name: "Complete Blood Count (CBC)",
    aliases: ["Hemogram", "Complete Hemogram", "Full Blood Count"],
    price: 350,
    mrp: 500,
    specimen: "EDTA Whole Blood",
    fasting: "Not required",
    tat: "6 hours",
    methodology: "Automated 5-Part Cell Counter with Peripheral Smear Examination",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Pritilata Rout",
      qualification: "MD Pathology",
      profileUrl: "/dr-pritilata-rout",
    },
  },
  THYROID: {
    id: "THYROID",
    slug: "/thyroid-test-bangalore",
    name: "Thyroid Profile Total (T3, T4, TSH)",
    aliases: ["Thyroid Function Test", "TFT", "Thyroid Panel"],
    price: 499,
    mrp: 800,
    specimen: "Blood (Serum)",
    fasting: "Recommended early morning",
    tat: "6 hours",
    methodology: "Chemiluminescent Microparticle Immunoassay (CMIA)",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  },
  VITAMIN_D: {
    id: "VITAMIN_D",
    slug: "/vitamin-d-test-bangalore",
    name: "Vitamin D (25-Hydroxy)",
    aliases: ["25-OH Vitamin D", "Calcidiol", "Total Vitamin D"],
    price: 899,
    mrp: 1800,
    specimen: "Blood (Serum)",
    fasting: "Not required",
    tat: "6-8 hours",
    methodology: "Direct Competitive Chemiluminescent Immunoassay (CLIA)",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Naveen Kumar N",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-naveen-kumar-n",
    },
  },
  VITAMIN_B12: {
    id: "VITAMIN_B12",
    slug: "/vitamin-b12-test-bangalore",
    name: "Vitamin B12 (Cobalamin)",
    aliases: ["Cyanocobalamin", "Cobalamin", "Serum B12"],
    price: 699,
    mrp: 1400,
    specimen: "Blood (Serum)",
    fasting: "10-12 hours fasting recommended",
    tat: "6-8 hours",
    methodology: "Chemiluminescence Immunoassay (CLIA)",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  },
  LIPID_PROFILE: {
    id: "LIPID_PROFILE",
    slug: "/lipid-profile-test-bangalore",
    name: "Lipid Profile Comprehensive",
    aliases: ["Cholesterol Panel", "Lipid Panel", "Coronary Risk Profile"],
    price: 599,
    mrp: 1100,
    specimen: "Blood (Serum)",
    fasting: "10-12 hours overnight fasting mandatory",
    tat: "6 hours",
    methodology: "Enzymatic Colorimetric & Direct Clearance",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  },
  LFT: {
    id: "LFT",
    slug: "/liver-function-test-bangalore",
    name: "Liver Function Test (LFT)",
    aliases: ["Hepatic Function Panel", "Liver Panel"],
    price: 650,
    mrp: 1200,
    specimen: "Blood (Serum)",
    fasting: "8-10 hours fasting recommended",
    tat: "6 hours",
    methodology: "Spectrophotometric / Enzymatic Rate Method",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Naveen Kumar N",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-naveen-kumar-n",
    },
  },
  KFT: {
    id: "KFT",
    slug: "/kidney-function-test-bangalore",
    name: "Kidney Function Test (KFT / RFT)",
    aliases: ["Renal Function Panel", "Renal Profile"],
    price: 650,
    mrp: 1200,
    specimen: "Blood (Serum)",
    fasting: "Not strictly required (maintain normal hydration)",
    tat: "6 hours",
    methodology: "Jaffe Rate Blanked / Enzymatic Urease & Ion Selective Electrode (ISE)",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  },
  VZV_PCR: {
    id: "VZV_PCR",
    slug: "/tests/vzv-pcr",
    name: "Varicella-Zoster Virus (VZV) DNA PCR",
    aliases: ["VZV Real-Time PCR", "Shingles PCR", "Herpes Zoster DNA Qualitative"],
    price: 3200,
    mrp: 4500,
    specimen: "Skin lesion swab, vesicle fluid, or crust / scab in viral transport medium (VTM)",
    fasting: "Not required",
    tat: "24-48 hours",
    methodology: "Real-Time Polymerase Chain Reaction (TaqMan qPCR)",
    homeCollection: false, // Requires trained clinic/lesion sampling or specialist lab collection
    accreditationScope: "not-verified",
    reviewer: {
      name: "Dr. Ajitha Pillai",
      qualification: "MD Microbiology",
      profileUrl: "/dr-ajitha-pillai",
    },
  },
  VZV_IGG: {
    id: "VZV_IGG",
    slug: "/tests/vzv-igg",
    name: "Varicella-Zoster Virus (VZV) IgG Antibody",
    aliases: ["VZV IgG ELISA", "Chickenpox Immunity Antibody", "Anti-VZV IgG"],
    price: 950,
    mrp: 1400,
    specimen: "Blood (Serum)",
    fasting: "Not required",
    tat: "24 hours",
    methodology: "Enzyme-Linked Immunosorbent Assay (ELISA) / CLIA",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Ajitha Pillai",
      qualification: "MD Microbiology",
      profileUrl: "/dr-ajitha-pillai",
    },
  },
};

/**
 * Audit-enforced prohibited patterns.
 * Flagged in CI/testing to prevent obsolete claims or unverified absolutes.
 */
export const PROHIBITED_MARKETING_CLAIMS = [
  /MC-10025/i,
  /100% precision/i,
  /100% pathologist authori[sz]ation/i,
  /every single report.*pathologist/i,
  /multi-level MD doctor verification/i,
];

/**
 * Validates text or page content against prohibited medical/marketing claims.
 */
export function validateContentClaims(content: string): string[] {
  const violations: string[] = [];
  for (const pattern of PROHIBITED_MARKETING_CLAIMS) {
    if (pattern.test(content)) {
      violations.push(`Prohibited marketing claim detected: ${pattern}`);
    }
  }
  return violations;
}
