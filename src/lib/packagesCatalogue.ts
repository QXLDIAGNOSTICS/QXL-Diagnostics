/**
 * Single Canonical Package Catalogue for QXL Diagnostics.
 * Reconciles prices, MRPs, parameter counts, names, and stable slugs sitewide.
 *
 * DO NOT hardcode disparate prices (e.g. ₹1,900 for 80 parameters) elsewhere.
 */

export interface PackageCategoryBreakdown {
  categoryName: string;
  testsCount: number;
  testsList: string[];
}

export interface PackageItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  parametersCount: number;
  parametersLabel: string;
  category: string;
  tag?: string;
  includes: string;
  highlights: string[];
  fastingHours?: string;
  tat?: string;
  sampleType?: string;
  isPopular?: boolean;
  detailedBreakdown?: PackageCategoryBreakdown[];
}

export const CANONICAL_PACKAGES: PackageItem[] = [
  {
    id: "q-quick-fit",
    slug: "q-quick-fit",
    name: "Quick Fit Package",
    price: 1770,
    mrp: 4696,
    parametersCount: 14,
    parametersLabel: "14+ Parameters",
    category: "Fitness",
    tag: "FITNESS BASELINE",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests, TSH, Vitamin D, CBC, ESR, Urine Routine.",
    highlights: ["Essential fitness screening", "Diabetes & lipid baseline", "Liver & kidney health"],
    fastingHours: "8–10 Hours Fasting Required",
    tat: "Reports within 6 hours",
    sampleType: "Blood & Urine Sample",
    detailedBreakdown: [
      {
        categoryName: "Diabetes & Glycemic Profile (3)",
        testsCount: 3,
        testsList: ["Fasting Blood Sugar (FBS)", "HbA1c (Glycosylated Haemoglobin)", "Estimated Average Glucose (eAG)"]
      },
      {
        categoryName: "Lipid & Cardiac Baseline (5)",
        testsCount: 5,
        testsList: ["Total Cholesterol", "Triglycerides", "HDL Cholesterol", "LDL Cholesterol", "VLDL Cholesterol"]
      },
      {
        categoryName: "Hepatic & Renal Screening (4)",
        testsCount: 4,
        testsList: ["SGOT (AST)", "SGPT (ALT)", "Serum Creatinine", "Blood Urea Nitrogen (BUN)"]
      },
      {
        categoryName: "Thyroid & Haematology (2)",
        testsCount: 2,
        testsList: ["TSH (Thyroid Stimulating Hormone)", "Complete Blood Count (CBC Baseline)"]
      }
    ]
  },
  {
    id: "q-screen-diabetes",
    slug: "q-screen-diabetes",
    name: "Q-Screen Diabetes Package",
    price: 1900,
    mrp: 4960,
    parametersCount: 16,
    parametersLabel: "16+ Parameters",
    category: "Diabetes",
    tag: "DIABETES CARE",
    includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test, TSH, CBC, ESR, Urine Routine.",
    highlights: ["Early diabetes detection", "Monitor glycemic control", "Renal impact evaluation"],
    fastingHours: "8–10 Hours Fasting Required",
    tat: "Reports within 6 hours",
    sampleType: "Blood & Urine Sample",
    detailedBreakdown: [
      {
        categoryName: "Glycemic & Beta-Cell Control (4)",
        testsCount: 4,
        testsList: ["Fasting Blood Sugar (FBS)", "HbA1c (Glycosylated Haemoglobin)", "Estimated Average Glucose (eAG)", "C-Peptide Serum Assay"]
      },
      {
        categoryName: "Renal Micro-Vascular Health (3)",
        testsCount: 3,
        testsList: ["Urine Microalbumin", "Urine Creatinine", "Urine Albumin-Creatinine Ratio (ACR)"]
      },
      {
        categoryName: "Lipid & Organ Baseline (9)",
        testsCount: 9,
        testsList: ["Total Cholesterol", "Triglycerides", "HDL", "LDL", "VLDL", "Serum Creatinine", "Blood Urea", "SGPT (ALT)", "TSH"]
      }
    ]
  },
  {
    id: "q-master-health-pro",
    slug: "q-master-health-pro",
    name: "Q-Master Health Pro Package",
    price: 4600,
    mrp: 9600,
    parametersCount: 92,
    parametersLabel: "92 Parameters",
    category: "Executive",
    tag: "MOST BOOKED PRO",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, LFT, KFT (Creatinine, Urea, BUN, Uric Acid, Na, K, Cl), Thyroid Profile (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine, Gastritis Screen (H. pylori IgG), hs-CRP.",
    highlights: ["Complete systemic evaluation", "Cardiovascular risk markers", "Full vitamin & thyroid profile"],
    fastingHours: "10–12 Hours Fasting Required",
    tat: "Reports within 6 hours",
    sampleType: "Blood & Urine Sample",
    isPopular: true,
    detailedBreakdown: [
      {
        categoryName: "Diabetes & Insulin Control (5)",
        testsCount: 5,
        testsList: ["Fasting Blood Sugar (FBS)", "HbA1c", "Estimated Average Glucose (eAG)", "Fasting Serum Insulin", "HOMA-IR Index"]
      },
      {
        categoryName: "Lipid & Cardiac Risk Markers (9)",
        testsCount: 9,
        testsList: ["Total Cholesterol", "Triglycerides", "HDL Cholesterol", "LDL Cholesterol", "VLDL", "Apolipoprotein A-1", "Apolipoprotein B", "Apo B/A1 Ratio", "hs-CRP"]
      },
      {
        categoryName: "Liver Function Panel (11)",
        testsCount: 11,
        testsList: ["Total Bilirubin", "Direct Bilirubin", "Indirect Bilirubin", "SGOT (AST)", "SGPT (ALT)", "Alkaline Phosphatase", "Total Protein", "Albumin", "Globulin", "A/G Ratio", "GGT"]
      },
      {
        categoryName: "Kidney & Electrolytes Panel (9)",
        testsCount: 9,
        testsList: ["Serum Creatinine", "Blood Urea", "BUN", "Uric Acid", "Sodium (Na)", "Potassium (K)", "Chloride (Cl)", "Total Calcium", "Phosphorus"]
      },
      {
        categoryName: "Thyroid & Vitamins (5)",
        testsCount: 5,
        testsList: ["Total T3", "Total T4", "TSH", "Vitamin D (25-OH Total)", "Vitamin B12 (Cobalamin)"]
      },
      {
        categoryName: "Complete Blood Count & Urine (43)",
        testsCount: 43,
        testsList: ["Hemoglobin", "RBC Count", "WBC Total Count", "Platelet Count", "Differential Count (5 Parts)", "PCV", "MCV", "MCH", "MCHC", "RDW", "ESR", "Urine Complete Analysis (25 Parameters)"]
      }
    ]
  },
  {
    id: "q-advanced-arthritis",
    slug: "q-advanced-arthritis",
    name: "Q-Advanced Arthritis & Autoimmune Panel",
    price: 6900,
    mrp: 12660,
    parametersCount: 22,
    parametersLabel: "22+ Parameters",
    category: "Speciality",
    tag: "ADVANCED AUTOIMMUNE",
    includes: "FBS, HbA1c, Lipid Profile, hs-CRP, LFT, KFT, Thyroid Screen, Iron Studies, Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Markers (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine.",
    highlights: ["Autoimmune joint evaluation", "Inflammatory markers (hs-CRP, ESR)", "Bone & iron metabolism"],
    fastingHours: "Fasting Preferred",
    tat: "Reports within 24 hours",
    sampleType: "Blood & Urine Sample",
    detailedBreakdown: [
      {
        categoryName: "Autoimmune & Joint Biomarkers (4)",
        testsCount: 4,
        testsList: ["Rheumatoid Factor (RF Quantitative)", "Anti-CCP Antibodies", "ANA (Antinuclear Antibodies IFA Screen)", "Uric Acid"]
      },
      {
        categoryName: "Inflammatory Response (2)",
        testsCount: 2,
        testsList: ["hs-CRP (High-Sensitivity CRP)", "ESR (Erythrocyte Sedimentation Rate)"]
      },
      {
        categoryName: "Bone & Vitamin Profile (4)",
        testsCount: 4,
        testsList: ["Total Calcium", "Phosphorus", "Vitamin D (25-OH)", "Vitamin B12"]
      },
      {
        categoryName: "Endocrine & Steroid Profile (2)",
        testsCount: 2,
        testsList: ["DHEA-S", "Morning Cortisol"]
      },
      {
        categoryName: "Organ & Blood Count Baseline (10)",
        testsCount: 10,
        testsList: ["Liver Function Panel", "Kidney Function Panel", "Complete Blood Count (CBC)"]
      }
    ]
  },
  {
    id: "q-oncology-biomarker",
    slug: "q-oncology-biomarker",
    name: "Q-Oncology Biomarker Panel",
    price: 7900,
    mrp: 13600,
    parametersCount: 15,
    parametersLabel: "15+ Parameters",
    category: "Oncology",
    tag: "SPECIALIST ONCOLOGY",
    includes: "Tumour Biomarkers (AFP, CEA, Beta HCG, PSA Male / CA-125 Female, CA 19-9), CBC, ESR, Urine Routine, Stool Calprotectin, FOBT, Protein Electrophoresis.",
    highlights: ["Physician-directed tumour markers", "Monoclonal protein screening", "Stool calprotectin & occult blood"],
    fastingHours: "Fasting Preferred",
    tat: "Reports within 24–48 hours",
    sampleType: "Blood, Urine & Stool Sample",
    detailedBreakdown: [
      {
        categoryName: "Tumour Biomarkers (6)",
        testsCount: 6,
        testsList: ["Alpha-Fetoprotein (AFP)", "Carcinoembryonic Antigen (CEA)", "CA-125 (Ovarian/General)", "CA 19-9 (Pancreatic/GI)", "Quantitative Beta-HCG", "PSA Total (Male Specific)"]
      },
      {
        categoryName: "GI & Stool Screening (2)",
        testsCount: 2,
        testsList: ["Stool Calprotectin", "FOBT (Fecal Occult Blood Test)"]
      },
      {
        categoryName: "Protein & Hematology Screen (7)",
        testsCount: 7,
        testsList: ["Serum Protein Electrophoresis (SPEP)", "Complete Blood Count (CBC)", "ESR", "Urine Routine Analysis"]
      }
    ]
  },
  {
    id: "ultra-full-body-checkup",
    slug: "ultra-full-body-checkup",
    name: "Ultra Full Body Checkup - Master",
    price: 4999,
    mrp: 18588,
    parametersCount: 117,
    parametersLabel: "117 Parameters",
    category: "Executive",
    tag: "SENIOR CONSULTANT MASTER",
    includes: "All 92 Master Health Pro Parameters + Homocysteine + Lipoprotein(a) + Iron Profile (Iron, TIBC, Ferritin, % Saturation) + Electrolyte Profile.",
    highlights: ["117 comprehensive parameters", "Cardiac risk indicators (Homocysteine, Lp-a)", "Complete iron & vitamin panel"],
    fastingHours: "10–12 Hours Fasting Required",
    tat: "Reports within 6 hours",
    sampleType: "Blood & Urine Sample",
    detailedBreakdown: [
      {
        categoryName: "Advanced Cardiac & Vascular Risk (4)",
        testsCount: 4,
        testsList: ["Homocysteine", "Lipoprotein(a)", "hs-CRP", "Apo B / Apo A-1 Ratio"]
      },
      {
        categoryName: "Iron & Anemia Profile (4)",
        testsCount: 4,
        testsList: ["Serum Iron", "Total Iron Binding Capacity (TIBC)", "Serum Ferritin", "% Transferrin Saturation"]
      },
      {
        categoryName: "Systemic Executive Checkup (109)",
        testsCount: 109,
        testsList: ["Includes all 92 parameters of Master Health Pro: Diabetes, LFT, KFT, Electrolytes, Thyroid, Vitamins B12 & D, Complete Blood Count, and Urine Analysis."]
      }
    ]
  }
];
,
  {
    id: "q-cardiovascular-risk",
    slug: "q-cardiovascular-risk",
    name: "Q-Cardiovascular Risk Assessment Package",
    price: 9000,
    mrp: 18900,
    parametersCount: 25,
    parametersLabel: "25+ Parameters",
    category: "Cardiology",
    tag: "CARDIOVASCULAR PRO",
    includes: "CBC, Lipid Profile, Kidney Screen, Urine Routine, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen, Cortisol, Serum Magnesium.",
    highlights: ["Advanced cardiac biomarker profiling", "Lp(a), ApoB, Homocysteine & NT-proBNP", "Endothelial & metabolic risk"],
    fastingHours: "12 Hours Fasting",
    tat: "24 Hours",
  }
];

export function getPackageBySlugOrId(identifier: string): PackageItem | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toLowerCase();
  return CANONICAL_PACKAGES.find(
    (p) =>
      p.id.toLowerCase() === clean ||
      p.slug.toLowerCase() === clean ||
      p.name.toLowerCase() === clean ||
      clean.includes(p.id.toLowerCase())
  );
}

export function computeDiscountPercentage(price: number, mrp: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
