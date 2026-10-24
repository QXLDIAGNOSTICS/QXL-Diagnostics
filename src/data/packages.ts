import type { HealthPackage } from "@/types/catalogue";

/**
 * QXL Diagnostics — Canonical Health Packages Master
 * 
 * CRITICAL RULE: Parameter counts are NEVER hard-coded as numbers here.
 * Parameter counts are calculated dynamically from included test parameter IDs
 * using calculatePackageParameterCount(pkg, testsById).
 */
export const PACKAGES: HealthPackage[] = [
  {
    id: "q-quick-fit",
    slug: "q-quick-fit",
    name: "Quick Fit Package",
    aliases: [
      "quick-fit",
      "quick fit",
      "quick fit package",
      "q-quick-fit",
      "pkg-fit",
      "pkg-1770",
      "fitness package"
    ],
    includedTestIds: [
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
    derivedParameterIds: ["derived_eag", "derived_homa_ir"],
    sellingPrice: 1770,
    mrp: 4696,
    fasting: "required",
    tatDisplay: "12 Hours (Same Day)",
    guidance: "self_request",
    active: true,
    tag: "FITNESS BASELINE",
    highlights: [
      "Essential fitness & lifestyle screening",
      "Complete metabolic, lipid, liver & kidney health",
      "Vitamin D & Glycemic status (HbA1c + HOMA-IR)"
    ],
    idealFor: "Working professionals and adults wanting a rapid, comprehensive preventive baseline checkup."
  },
  {
    id: "q-screen-diabetes",
    slug: "q-screen-diabetes",
    name: "Q-Screen Diabetes Package",
    aliases: [
      "q-screen-diabetes",
      "q-diabetes-screen",
      "diabetes package",
      "diabetes checkup",
      "pkg-diabetes",
      "pkg-1900"
    ],
    includedTestIds: [
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
    derivedParameterIds: ["derived_eag"],
    sellingPrice: 1900,
    mrp: 4960,
    fasting: "required",
    tatDisplay: "12 Hours (Same Day)",
    guidance: "self_request",
    active: true,
    tag: "DIABETES CARE",
    highlights: [
      "Early glycemic dysfunction & insulin reserve (C-Peptide)",
      "Kidney micro-vascular surveillance (Microalbumin & UPCR)",
      "Complete metabolic, lipid & haematology profile"
    ],
    idealFor: "Individuals with diabetes, pre-diabetes, metabolic syndrome, or family history of high blood sugar."
  },
  {
    id: "q-master-pro",
    slug: "q-master-pro",
    name: "Q-Master Health Pro Package",
    aliases: [
      "q-master-pro",
      "q-master-health-pro",
      "master health pro",
      "master full body",
      "pkg-master-pro",
      "pkg-4600"
    ],
    includedTestIds: [
      "cbc",
      "esr",
      "fbs",
      "hba1c",
      "insulin-fasting",
      "lipid-profile",
      "lft",
      "kft",
      "tsh",
      "thyroid-profile",
      "vitamin-d",
      "vitamin-b12",
      "urine-routine",
      "apob",
      "apoa1",
      "hscrp",
      "hpylori-igg",
      "c-peptide",
      "urine-microalbumin",
      "urine-protein-creatinine-ratio",
      "rf-quantitative"
    ],
    derivedParameterIds: [
      "derived_eag",
      "derived_homa_ir",
      "derived_apob_a1_ratio"
    ],
    sellingPrice: 4600,
    mrp: 9600,
    fasting: "required",
    tatDisplay: "12 Hours (Same Day)",
    guidance: "self_request",
    active: true,
    tag: "EXECUTIVE FULL BODY",
    highlights: [
      "Complete annual full-body organ & vascular screening",
      "Advanced cardiovascular risk (Apo A-1, Apo B, hs-CRP)",
      "Vitamins D & B12, Gastritis Screen (H. pylori IgG)"
    ],
    idealFor: "Adults 30+ seeking complete annual preventive health evaluation."
  },
  {
    id: "q-arthritis-autoimmune",
    slug: "q-arthritis-autoimmune",
    name: "Q-Advanced Arthritis & Autoimmune Panel",
    aliases: [
      "q-arthritis-autoimmune",
      "q-advanced-arthritis",
      "arthritis package",
      "autoimmune panel",
      "pkg-arthritis",
      "pkg-6900"
    ],
    includedTestIds: [
      "cbc",
      "esr",
      "rf-quantitative",
      "anti-ccp",
      "ana-screen"
    ],
    sellingPrice: 6900,
    mrp: 12660,
    fasting: "not_required",
    tatDisplay: "24 Hours",
    guidance: "consultation_recommended",
    active: true,
    tag: "AUTOIMMUNE & JOINTS",
    highlights: [
      "Differential diagnosis for persistent joint pain and stiffness",
      "Rheumatoid arthritis specific antibodies (RF & Anti-CCP)",
      "High-sensitivity ANA screen on HEp-2 cells"
    ],
    idealFor: "Patients experiencing joint inflammation, swelling, morning stiffness, or unexplained auto-inflammatory symptoms."
  },
  {
    id: "q-onco-screen",
    slug: "q-onco-screen",
    name: "Q-Oncology Biomarker Panel",
    aliases: [
      "q-onco-screen",
      "q-oncology-biomarker",
      "oncoscreen",
      "cancer marker panel",
      "pkg-oncoscreen",
      "pkg-7900"
    ],
    includedTestIds: [
      "afp-biomarker",
      "cea-biomarker",
      "psa-total",
      "ca125-biomarker",
      "ca199-biomarker",
      "beta-hcg",
      "calprotectin-stool",
      "fobt-stool",
      "spep-protein"
    ],
    sellingPrice: 7900,
    mrp: 13600,
    fasting: "not_required",
    tatDisplay: "24–48 Hours",
    guidance: "doctor_directed",
    active: true,
    tag: "ONCOLOGY SURVEILLANCE",
    highlights: [
      "Physician-directed tumor marker panel for treatment evaluation & monitoring",
      "Serum Protein Electrophoresis with M-band detection",
      "Organ-specific circulating biomarkers (AFP, CEA, PSA, CA-125, CA 19-9)"
    ],
    idealFor: "Patients undergoing post-treatment surveillance or under direct oncologist guidance."
  },
  {
    id: "q-cardio-risk",
    slug: "q-cardio-risk",
    name: "Q-Cardiovascular Risk Assessment Package",
    aliases: [
      "q-cardio-risk",
      "cardiac risk package",
      "cardiovascular assessment",
      "heart package",
      "pkg-cardiac",
      "pkg-9000"
    ],
    includedTestIds: [
      "lipid-profile",
      "apob",
      "apoa1",
      "hscrp",
      "kft",
      "fbs",
      "hba1c",
      "homocysteine-test",
      "lipoprotein-a",
      "nt-probnp",
      "fibrinogen-plasma"
    ],
    derivedParameterIds: ["derived_eag", "derived_apob_a1_ratio"],
    sellingPrice: 9000,
    mrp: 18900,
    fasting: "required",
    tatDisplay: "24 Hours",
    guidance: "consultation_recommended",
    active: true,
    tag: "ADVANCED CARDIAC RISK",
    highlights: [
      "Next-generation atherogenic particle evaluation (Apo B, Lp(a))",
      "Myocardial stress & heart strain marker (NT-proBNP)",
      "Endothelial injury & thrombotic markers (Homocysteine, Fibrinogen, hs-CRP)"
    ],
    idealFor: "Individuals with strong cardiovascular family history, hypertension, or high coronary risk."
  }
];

export const packagesById: Record<string, HealthPackage> = Object.fromEntries(
  PACKAGES.map(p => [p.id, p])
);
