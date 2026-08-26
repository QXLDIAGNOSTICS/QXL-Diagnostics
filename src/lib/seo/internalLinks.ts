/**
 * QXL Diagnostics — Central Internal Linking Map
 *
 * Each entry maps a test slug to:
 *  - relatedTests: 3–5 related test page slugs (for RelatedTestsGrid)
 *  - speciality: parent speciality slug (for breadcrumb & sidebar link)
 *  - relatedConditions: condition page slugs (for contextual content links)
 *  - doctorSlug: which QXL doctor reviews content for this test category
 *
 * Always use canonical -bangalore suffix (not -bengaluru).
 */

export interface TestInternalLinks {
  relatedTests: string[];
  speciality: string;
  relatedConditions: string[];
  doctorSlug: string;
  doctorName: string;
  doctorQuals: string;
}

export const TEST_INTERNAL_LINKS: Record<string, TestInternalLinks> = {
  // ── Haematology ───────────────────────────────────────────────────────────
  "cbc-test-bangalore": {
    relatedTests: ["esr-test-bangalore", "iron-profile-test-bangalore", "ferritin-test-bangalore", "vitamin-b12-test-bangalore", "dengue-test-bangalore"],
    speciality: "hematology",
    relatedConditions: ["anaemia-testing"],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "esr-test-bangalore": {
    relatedTests: ["crp-test-bangalore", "cbc-test-bangalore", "rheumatoid-factor-test-bangalore", "ana-test-bangalore", "anti-ccp-test-bangalore"],
    speciality: "hematology",
    relatedConditions: ["anaemia-testing"],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "iron-profile-test-bangalore": {
    relatedTests: ["cbc-test-bangalore", "ferritin-test-bangalore", "vitamin-b12-test-bangalore", "folate-test-bangalore"],
    speciality: "hematology",
    relatedConditions: ["anaemia-testing"],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "ferritin-test-bangalore": {
    relatedTests: ["iron-profile-test-bangalore", "cbc-test-bangalore", "esr-test-bangalore"],
    speciality: "hematology",
    relatedConditions: ["anaemia-testing"],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },

  // ── Diabetes & Endocrinology ───────────────────────────────────────────────
  "hba1c-test-bangalore": {
    relatedTests: ["blood-sugar-test-bangalore", "diabetes-profile-test-bangalore", "insulin-test-bangalore", "kidney-function-test-bangalore", "lipid-profile-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: ["diabetes-testing"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "blood-sugar-test-bangalore": {
    relatedTests: ["hba1c-test-bangalore", "diabetes-profile-test-bangalore", "insulin-test-bangalore", "kidney-function-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: ["diabetes-testing"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "diabetes-profile-test-bangalore": {
    relatedTests: ["hba1c-test-bangalore", "blood-sugar-test-bangalore", "insulin-test-bangalore", "kidney-function-test-bangalore", "lipid-profile-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: ["diabetes-testing"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Thyroid ────────────────────────────────────────────────────────────────
  "thyroid-test-bangalore": {
    relatedTests: ["tsh-test-bangalore", "free-t3-test-bangalore", "free-t4-test-bangalore", "anti-tpo-test-bangalore", "vitamin-b12-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: ["thyroid-disorders"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "thyroid-profile-test-bangalore": {
    relatedTests: ["tsh-test-bangalore", "free-t3-test-bangalore", "free-t4-test-bangalore", "anti-tpo-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: ["thyroid-disorders"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "tsh-test-bangalore": {
    relatedTests: ["thyroid-test-bangalore", "free-t4-test-bangalore", "free-t3-test-bangalore", "anti-tpo-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: ["thyroid-disorders"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "anti-tpo-test-bangalore": {
    relatedTests: ["tsh-test-bangalore", "thyroid-test-bangalore", "free-t4-test-bangalore", "ana-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: ["thyroid-disorders"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Vitamins & Nutrition ───────────────────────────────────────────────────
  "vitamin-d-test-bangalore": {
    relatedTests: ["calcium-test-bangalore", "magnesium-test-bangalore", "vitamin-b12-test-bangalore", "pth-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "vitamin-b12-test-bangalore": {
    relatedTests: ["folate-test-bangalore", "cbc-test-bangalore", "iron-profile-test-bangalore", "vitamin-d-test-bangalore"],
    speciality: "hematology",
    relatedConditions: ["anaemia-testing"],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Cardiovascular ─────────────────────────────────────────────────────────
  "lipid-profile-test-bangalore": {
    relatedTests: ["hs-crp-test-bangalore", "homocysteine-test-bangalore", "troponin-test-bangalore", "blood-sugar-test-bangalore", "kidney-function-test-bangalore"],
    speciality: "cardiology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "troponin-test-bangalore": {
    relatedTests: ["nt-probnp-test-bangalore", "hs-crp-test-bangalore", "d-dimer-test-bangalore", "lipid-profile-test-bangalore", "cardiac-biomarker-test-bangalore"],
    speciality: "cardiology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "d-dimer-test-bangalore": {
    relatedTests: ["troponin-test-bangalore", "nt-probnp-test-bangalore", "hs-crp-test-bangalore"],
    speciality: "cardiology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Liver ─────────────────────────────────────────────────────────────────
  "liver-function-test-bangalore": {
    relatedTests: ["kidney-function-test-bangalore", "lipid-profile-test-bangalore", "cbc-test-bangalore", "hepatitis-b-test-bangalore", "hepatitis-c-test-bangalore"],
    speciality: "gastroenterology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Kidney ────────────────────────────────────────────────────────────────
  "kidney-function-test-bangalore": {
    relatedTests: ["creatinine-test-bangalore", "uric-acid-test-bangalore", "liver-function-test-bangalore", "urine-test-bangalore", "urine-microalbumin-test-bangalore"],
    speciality: "urology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "creatinine-test-bangalore": {
    relatedTests: ["kidney-function-test-bangalore", "uric-acid-test-bangalore", "urine-microalbumin-test-bangalore"],
    speciality: "urology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "uric-acid-test-bangalore": {
    relatedTests: ["kidney-function-test-bangalore", "creatinine-test-bangalore", "urine-test-bangalore"],
    speciality: "urology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Inflammation ──────────────────────────────────────────────────────────
  "crp-test-bangalore": {
    relatedTests: ["esr-test-bangalore", "cbc-test-bangalore", "ana-test-bangalore", "rheumatoid-factor-test-bangalore", "hs-crp-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Autoimmune ────────────────────────────────────────────────────────────
  "ana-test-bangalore": {
    relatedTests: ["ana-profile-test-bangalore", "ena-profile-test-bangalore", "anti-dsdna-test-bangalore", "anca-test-bangalore", "anti-ccp-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "ana-profile-test-bangalore": {
    relatedTests: ["ana-test-bangalore", "ena-profile-test-bangalore", "anti-dsdna-test-bangalore", "anca-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "anti-ccp-test-bangalore": {
    relatedTests: ["rheumatoid-factor-test-bangalore", "ana-test-bangalore", "esr-test-bangalore", "crp-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "rheumatoid-factor-test-bangalore": {
    relatedTests: ["anti-ccp-test-bangalore", "esr-test-bangalore", "crp-test-bangalore", "ana-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "allergy-test-bangalore": {
    relatedTests: ["total-ige-test-bangalore", "food-allergy-test-bangalore", "food-intolerance-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },

  // ── Hormones & Reproductive ────────────────────────────────────────────────
  "amh-test-bangalore": {
    relatedTests: ["fsh-test-bangalore", "lh-test-bangalore", "prolactin-test-bangalore", "female-hormone-test-bangalore", "pcos-test-bangalore"],
    speciality: "womens-health",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },
  "fsh-test-bangalore": {
    relatedTests: ["lh-test-bangalore", "amh-test-bangalore", "prolactin-test-bangalore", "estradiol-test-bangalore"],
    speciality: "womens-health",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "pcos-test-bangalore": {
    relatedTests: ["fsh-test-bangalore", "lh-test-bangalore", "amh-test-bangalore", "testosterone-test-bangalore", "insulin-test-bangalore"],
    speciality: "womens-health",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "testosterone-test-bangalore": {
    relatedTests: ["lh-test-bangalore", "fsh-test-bangalore", "prolactin-test-bangalore", "dheas-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
  "prolactin-test-bangalore": {
    relatedTests: ["fsh-test-bangalore", "lh-test-bangalore", "testosterone-test-bangalore", "thyroid-test-bangalore"],
    speciality: "endocrinology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Prenatal ──────────────────────────────────────────────────────────────
  "double-marker-test-bangalore": {
    relatedTests: ["triple-marker-test-bangalore", "quadruple-marker-test-bangalore", "beta-hcg-test-bangalore", "antenatal-profile-test-bangalore"],
    speciality: "womens-health",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },
  "triple-marker-test-bangalore": {
    relatedTests: ["double-marker-test-bangalore", "quadruple-marker-test-bangalore", "beta-hcg-test-bangalore"],
    speciality: "womens-health",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },
  "beta-hcg-test-bangalore": {
    relatedTests: ["double-marker-test-bangalore", "progesterone-test-bangalore", "fsh-test-bangalore"],
    speciality: "womens-health",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },

  // ── Oncology ──────────────────────────────────────────────────────────────
  "psa-test-bangalore": {
    relatedTests: ["ca-125-test-bangalore", "cea-test-bangalore", "afp-test-bangalore", "tumor-marker-test-bangalore"],
    speciality: "oncology",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },
  "ca-125-test-bangalore": {
    relatedTests: ["cea-test-bangalore", "afp-test-bangalore", "psa-test-bangalore", "ca-19-9-test-bangalore"],
    speciality: "oncology",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },
  "cea-test-bangalore": {
    relatedTests: ["ca-125-test-bangalore", "afp-test-bangalore", "psa-test-bangalore", "ca-19-9-test-bangalore"],
    speciality: "oncology",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },
  "tumor-marker-test-bangalore": {
    relatedTests: ["psa-test-bangalore", "ca-125-test-bangalore", "cea-test-bangalore", "afp-test-bangalore", "cancer-marker-test-bangalore"],
    speciality: "oncology",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },

  // ── Histopathology ─────────────────────────────────────────────────────────
  "histopathology-test-bangalore": {
    relatedTests: ["biopsy-test-bangalore", "immunohistochemistry-test-bangalore", "cytology-test-bangalore"],
    speciality: "oncology",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },
  "biopsy-test-bangalore": {
    relatedTests: ["histopathology-test-bangalore", "immunohistochemistry-test-bangalore"],
    speciality: "oncology",
    relatedConditions: [],
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology",
  },

  // ── Infectious Disease ─────────────────────────────────────────────────────
  "dengue-test-bangalore": {
    relatedTests: ["malaria-test-bangalore", "typhoid-test-bangalore", "cbc-test-bangalore", "crp-test-bangalore"],
    speciality: "infectious-diseases",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },
  "malaria-test-bangalore": {
    relatedTests: ["dengue-test-bangalore", "typhoid-test-bangalore", "cbc-test-bangalore"],
    speciality: "infectious-diseases",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },
  "typhoid-test-bangalore": {
    relatedTests: ["dengue-test-bangalore", "malaria-test-bangalore", "cbc-test-bangalore", "crp-test-bangalore"],
    speciality: "infectious-diseases",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },
  "hiv-test-bangalore": {
    relatedTests: ["hepatitis-b-test-bangalore", "hepatitis-c-test-bangalore", "vdrl-test-bangalore"],
    speciality: "infectious-diseases",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },
  "hepatitis-b-test-bangalore": {
    relatedTests: ["hepatitis-c-test-bangalore", "hiv-test-bangalore", "liver-function-test-bangalore"],
    speciality: "infectious-diseases",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },

  // ── Molecular ─────────────────────────────────────────────────────────────
  "molecular-diagnostic-test-bangalore": {
    relatedTests: ["pcr-test-bangalore", "ngs-test-bangalore", "genetic-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },
  "flow-cytometry-test-bangalore": {
    relatedTests: ["cbc-test-bangalore", "molecular-diagnostic-test-bangalore", "tumor-marker-test-bangalore"],
    speciality: "hematology",
    relatedConditions: [],
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology",
  },

  // ── GI ───────────────────────────────────────────────────────────────────
  "stool-test-bangalore": {
    relatedTests: ["calprotectin-test-bangalore", "h-pylori-test-bangalore", "liver-function-test-bangalore"],
    speciality: "gastroenterology",
    relatedConditions: [],
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology",
  },
  "calprotectin-test-bangalore": {
    relatedTests: ["stool-test-bangalore", "h-pylori-test-bangalore", "crp-test-bangalore"],
    speciality: "gastroenterology",
    relatedConditions: [],
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry",
  },
};

/** Get internal links for a given test slug (returns undefined if not mapped) */
export function getTestInternalLinks(slug: string): TestInternalLinks | undefined {
  return TEST_INTERNAL_LINKS[slug];
}

/** Get the names of related tests for display (returns empty array if not mapped) */
export function getRelatedTestSlugs(slug: string): string[] {
  return TEST_INTERNAL_LINKS[slug]?.relatedTests ?? [];
}

/** Get human-readable test name from slug */
export function slugToTestName(slug: string): string {
  return slug
    .replace(/-test-bangalore$/, '')
    .replace(/-profile-bangalore$/, ' Profile')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bCbc\b/, 'CBC')
    .replace(/\bEsr\b/, 'ESR')
    .replace(/\bCrp\b/, 'CRP')
    .replace(/\bLft\b/, 'LFT')
    .replace(/\bKft\b/, 'KFT')
    .replace(/\bTsh\b/, 'TSH')
    .replace(/\bHba1c\b/, 'HbA1c')
    .replace(/\bHiv\b/, 'HIV')
    .replace(/\bAna\b/, 'ANA')
    .replace(/\bAnca\b/, 'ANCA')
    .replace(/\bAmh\b/, 'AMH')
    .replace(/\bPsa\b/, 'PSA')
    .replace(/\bCea\b/, 'CEA')
    .replace(/\bAfp\b/, 'AFP')
    .replace(/\bPcr\b/, 'PCR')
    .replace(/\bNgs\b/, 'NGS')
    .replace(/\bCa 125\b/, 'CA-125')
    .replace(/\bNt Probnp\b/, 'NT-proBNP')
    .trim();
}
