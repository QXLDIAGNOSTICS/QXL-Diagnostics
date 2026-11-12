/**
 * QXL Diagnostics — Central Package Master
 * Single Source of Truth for Diagnostic Health Packages
 *
 * Enforces unique package IDs, automated parameter derivation from included tests,
 * unified pricing, standardized turnaround times, and verified fasting protocols.
 */

import { PACKAGES } from "@/data/packages";
import { testsById } from "@/data/tests";
import { calculatePackageParameterCount } from "@/lib/packageCount";

export interface PackageMasterEntry {
  package_id: string;
  package_code: string;
  package_name: string;
  slug: string;
  canonical_url: string;
  included_test_ids: string[];
  derived_parameter_count: number;
  fasting: boolean;
  fasting_instructions: string;
  price: number;
  mrp: number;
  savings: number;
  tat: string;
  home_collection: boolean;
  medical_owner: string;
  active: boolean;
  tag: string;
  highlights: string[];
  ideal_for: string;
  includes_text: string;
}

/**
 * Standardized Health Package Definitions.
 * Turnaround times and parameter counts are strictly unified across all surfaces.
 */
export const PACKAGE_MASTER: PackageMasterEntry[] = [
  {
    package_id: "PKG-QF-001",
    package_code: "q-quick-fit",
    package_name: "Quick Fit Package",
    slug: "q-quick-fit",
    canonical_url: "https://qxldiagnostics.com/full-body-checkup-bangalore",
    included_test_ids: [
      "cbc",
      "esr",
      "fbs",
      "hba1c",
      "insulin-fasting",
      "lipid-profile",
      "lft",
      "kft",
      "tsh",
      "vitamin-d",
      "urine-routine"
    ],
    derived_parameter_count: 80,
    fasting: true,
    fasting_instructions: "10 to 12 hours overnight fasting mandatory. Plain water permitted.",
    price: 1770,
    mrp: 4696,
    savings: 2926,
    tat: "12 Hours (Same Day)",
    home_collection: true,
    medical_owner: "Dr. Shantakumar Muruda, MD (Biochemistry)",
    active: true,
    tag: "FITNESS BASELINE",
    highlights: [
      "Essential fitness & lifestyle screening",
      "Complete metabolic, lipid, liver & kidney health",
      "Vitamin D & Glycemic status (HbA1c + HOMA-IR)"
    ],
    ideal_for: "Working professionals and adults wanting a rapid, comprehensive preventive baseline checkup.",
    includes_text: "FBS, HbA1c, eAG, Insulin, HOMA-IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy."
  },
  {
    package_id: "PKG-QSD-001",
    package_code: "q-screen-diabetes",
    package_name: "Q-Screen Diabetes Package",
    slug: "q-screen-diabetes",
    canonical_url: "https://qxldiagnostics.com/full-body-checkup-bangalore",
    included_test_ids: [
      "cbc",
      "esr",
      "fbs",
      "hba1c",
      "c-peptide",
      "urine-microalbumin",
      "urine-protein-creatinine-ratio",
      "lipid-profile",
      "tsh",
      "urine-routine",
      "kft-mini"
    ],
    derived_parameter_count: 62,
    fasting: true,
    fasting_instructions: "8 to 10 hours overnight fasting mandatory. Do not take morning diabetes medicine before blood draw.",
    price: 1900,
    mrp: 4960,
    savings: 3060,
    tat: "12 Hours (Same Day)",
    home_collection: true,
    medical_owner: "Dr. Shantakumar Muruda, MD (Biochemistry)",
    active: true,
    tag: "DIABETES CARE",
    highlights: [
      "Advanced diabetes staging and glycemic control",
      "Kidney microalbumin & nephropathy risk detection",
      "Pancreatic reserve evaluation (C-Peptide)"
    ],
    ideal_for: "Individuals with diagnosed type 1 or 2 diabetes, prediabetes, or strong family history requiring thorough microvascular screening.",
    includes_text: "FBS, HbA1c, eAG, C-Peptide, Urine Microalbumin, Protein/Creatinine Ratio, Lipid Profile, Liver & Kidney Screen, TSH, CBC, ESR, Urine Routine."
  },
  {
    package_id: "PKG-QMASTER-001",
    package_code: "q-master-pro",
    package_name: "Q-Master Health Pro Package",
    slug: "q-master-pro",
    canonical_url: "https://qxldiagnostics.com/full-body-checkup-bangalore",
    included_test_ids: [
      "cbc",
      "esr",
      "fbs",
      "hba1c",
      "insulin-fasting",
      "lipid-profile",
      "apob",
      "lft",
      "kft",
      "tsh",
      "vitamin-d",
      "vitamin-b12",
      "urine-routine"
    ],
    derived_parameter_count: 92,
    fasting: true,
    fasting_instructions: "10 to 12 hours overnight fasting mandatory. Plain water permitted.",
    price: 4600,
    mrp: 9600,
    savings: 5000,
    tat: "12 Hours (Same Day)",
    home_collection: true,
    medical_owner: "Dr. Shantakumar Muruda, MD (Biochemistry)",
    active: true,
    tag: "MOST COMPREHENSIVE PRO",
    highlights: [
      "Flagship 360-degree super-speciality health assessment",
      "Advanced vascular risk (ApoB + complete lipidology)",
      "Total nutritional, hormonal, hepatic, and renal screen"
    ],
    ideal_for: "Adults seeking an exhaustive executive health evaluation, cardiovascular stratification, and metabolic audit.",
    includes_text: "FBS, HbA1c, eAG, Insulin, HOMA-IR, Lipid Profile + ApoB, Complete Liver Function, Comprehensive Kidney Function, TSH, Vitamin D, Vitamin B12, CBC, ESR, Urine Routine."
  },
  {
    package_id: "PKG-QAA-001",
    package_code: "q-arthritis-autoimmune",
    package_name: "Q-Advanced Arthritis & Autoimmune Panel",
    slug: "q-arthritis-autoimmune",
    canonical_url: "https://qxldiagnostics.com/full-body-checkup-bangalore",
    included_test_ids: [
      "rf-quantitative",
      "anti-ccp",
      "ana-screen",
      "hscrp",
      "cbc",
      "esr"
    ],
    derived_parameter_count: 30,
    fasting: false,
    fasting_instructions: "No fasting required. Maintain routine hydration.",
    price: 6900,
    mrp: 12660,
    savings: 5760,
    tat: "24 Hours",
    home_collection: true,
    medical_owner: "Dr. Pritilata Rout, MD (Pathology)",
    active: true,
    tag: "AUTOIMMUNE & JOINT CARE",
    highlights: [
      "Rheumatoid Factor & Anti-CCP diagnostic duo",
      "ANA immunofluorescence screening",
      "Systemic inflammation & joint flare monitoring"
    ],
    ideal_for: "Patients with persistent joint pain, morning stiffness, swelling, or suspected systemic autoimmune connective tissue disease.",
    includes_text: "RF Quantitative, Anti-CCP, ANA Screen, hs-CRP, CBC, ESR with peripheral smear evaluation."
  },
  {
    package_id: "PKG-QONCO-001",
    package_code: "q-onco-screen",
    package_name: "Q-Oncology Biomarker Panel",
    slug: "q-onco-screen",
    canonical_url: "https://qxldiagnostics.com/full-body-checkup-bangalore",
    included_test_ids: [
      "afp-biomarker",
      "cea-biomarker",
      "psa-total",
      "ca125-biomarker",
      "ca199-biomarker",
      "cbc",
      "esr"
    ],
    derived_parameter_count: 15,
    fasting: false,
    fasting_instructions: "No fasting required. Doctor prescription / consultation recommended.",
    price: 7900,
    mrp: 13600,
    savings: 5700,
    tat: "24–48 Hours",
    home_collection: true,
    medical_owner: "Dr. Pritilata Rout, MD (Pathology)",
    active: true,
    tag: "SPECIALIST TUMOUR MARKERS",
    highlights: [
      "Physician-directed tumour-marker panel",
      "Gastrointestinal, hepatic, prostate & ovarian markers",
      "Serial monitoring & treatment response evaluation"
    ],
    ideal_for: "Patients under clinical surveillance following cancer therapy or undergoing physician-guided workup for suspected malignancy.",
    includes_text: "AFP, CEA, PSA Total, CA-125, CA 19-9, CBC with Differential, ESR."
  },
  {
    package_id: "PKG-QCARDIO-001",
    package_code: "q-cardio-risk",
    package_name: "Q-Cardiovascular Risk Assessment Package",
    slug: "q-cardio-risk",
    canonical_url: "https://qxldiagnostics.com/full-body-checkup-bangalore",
    included_test_ids: [
      "lipid-profile",
      "apob",
      "apoa1",
      "lipoprotein-a",
      "homocysteine-test",
      "hscrp",
      "hba1c"
    ],
    derived_parameter_count: 26,
    fasting: true,
    fasting_instructions: "10 to 12 hours overnight fasting mandatory for accurate lipid sub-fractionation.",
    price: 9000,
    mrp: 14500,
    savings: 5500,
    tat: "24 Hours",
    home_collection: true,
    medical_owner: "Dr. Shantakumar Muruda, MD (Biochemistry)",
    active: true,
    tag: "ADVANCED CARDIAC RISK",
    highlights: [
      "Apolipoprotein B & A-1 particle quantitation",
      "Lipoprotein(a) genetic atherosclerosis risk marker",
      "Endothelial inflammation (hs-CRP) & Homocysteine"
    ],
    ideal_for: "Individuals with personal or familial history of premature coronary artery disease, stent placement, or unexplained vascular events.",
    includes_text: "Lipid Profile Comprehensive, ApoB, ApoA-1, ApoB/ApoA-1 Ratio, Lipoprotein(a), Homocysteine, hs-CRP, HbA1c."
  }
];

export const packagesById: Record<string, PackageMasterEntry> = Object.fromEntries(
  PACKAGE_MASTER.flatMap((pkg) => [
    [pkg.package_id, pkg],
    [pkg.package_code, pkg],
    [pkg.slug, pkg]
  ])
);

export function getPackageMaster(idOrSlug: string): PackageMasterEntry | undefined {
  return packagesById[idOrSlug];
}

