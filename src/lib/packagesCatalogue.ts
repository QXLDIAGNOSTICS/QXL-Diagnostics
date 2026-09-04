/**
 * Single Canonical Package Catalogue for QXL Diagnostics.
 * Reconciles prices, MRPs, parameter counts, names, and stable slugs sitewide.
 *
 * DO NOT hardcode disparate prices (e.g. ₹1,900 for 80 parameters) elsewhere.
 */

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
  isPopular?: boolean;
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
    fastingHours: "8–10 Hours Fasting",
    tat: "Same Day",
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
    fastingHours: "8–10 Hours Fasting",
    tat: "Same Day",
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
    fastingHours: "10–12 Hours Fasting",
    tat: "Same Day",
    isPopular: true,
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
    tat: "24 Hours",
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
    tat: "24–48 Hours",
  },
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
