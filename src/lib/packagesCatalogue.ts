/**
 * Single Canonical Package Catalogue for QXL Diagnostics.
 * Reconciles prices, MRPs, parameter counts, names, and stable slugs sitewide.
 * Includes 7 Core Preventive Packages + 42 Doctor-Driven Speciality Diagnostic Packages.
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
  price?: number;
  mrp?: number;
  parametersCount?: number;
  parametersLabel: string;
  category: string;
  tag?: string;
  includes: string;
  highlights: string[];
  fastingHours?: string;
  tat?: string;
  sampleType?: string;
  isPopular?: boolean;
  contactForPrice?: boolean;
  priceDisplay?: string;
  guidanceLevel?: "SELF-REQUEST POSSIBLE" | "CONSULTATION RECOMMENDED" | "DOCTOR-DIRECTED";
  mayHelpWhen?: string;
  beforeBooking?: string;
  keyTests?: string[];
  guideNumber?: string;
  detailedBreakdown?: PackageCategoryBreakdown[];
}

export const PREVENTIVE_PACKAGES: PackageItem[] = [
  {
    id: "q-quick-fit",
    slug: "q-quick-fit",
    name: "Quick Fit Package",
    price: 1,
    mrp: 1,
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
    tat: "Reports within 24 hours",
    sampleType: "Blood & Urine Sample"
  }
];

export const PATIENT_GUIDE_PACKAGES: PackageItem[] = [
  {
    "id": "pkg-01-anemia-evaluation-profile",
    "slug": "pkg-01-anemia-evaluation-profile",
    "name": "#01 Anemia Evaluation Profile",
    "guideNumber": "#01",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Blood Health",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Complete Blood Count (CBC), Ferritin, Serum iron, TIBC and transferrin saturation, Reticulocyte count, Vitamin B12, Serum folate, CRP/ESR when inflammation is suspected",
    "highlights": [
      "May help when: Fatigue, pallor, low hemoglobin or suspected nutrient deficiency",
      "Includes: Complete Blood Count (CBC)",
      "Includes: Ferritin",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Fatigue, pallor, low hemoglobin or suspected nutrient deficiency",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Complete Blood Count (CBC)",
      "Ferritin",
      "Serum iron, TIBC and transferrin saturation",
      "Reticulocyte count",
      "Vitamin B12",
      "Serum folate",
      "CRP/ESR when inflammation is suspected"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-02-inflammatory-arthritis-evaluation",
    "slug": "pkg-02-inflammatory-arthritis-evaluation",
    "name": "#02 Inflammatory Arthritis Evaluation",
    "guideNumber": "#02",
    "parametersCount": 8,
    "parametersLabel": "8 Key Components",
    "category": "Joint & Heart Health",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "CBC, ESR and CRP, Rheumatoid factor, Anti-CCP, ANA with targeted reflex testing, Uric acid, HLA-B27 when clinically compatible, Kidney and liver baseline tests",
    "highlights": [
      "May help when: Persistent inflammatory joint pain, swelling or stiffness",
      "Includes: CBC",
      "Includes: ESR and CRP",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Persistent inflammatory joint pain, swelling or stiffness",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "CBC",
      "ESR and CRP",
      "Rheumatoid factor",
      "Anti-CCP",
      "ANA with targeted reflex testing",
      "Uric acid",
      "HLA-B27 when clinically compatible",
      "Kidney and liver baseline tests"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-03-initial-antenatal-laboratory-profile",
    "slug": "pkg-03-initial-antenatal-laboratory-profile",
    "name": "#03 Initial Antenatal Laboratory Profile",
    "guideNumber": "#03",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Pregnancy Care",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "CBC, ABO/Rh group and antibody screen, Urinalysis and urine culture, Glucose assessment, HIV, hepatitis B/C and syphilis screening, Rubella IgG, TSH and STI NAAT according to risk/protocol",
    "highlights": [
      "May help when: Initial laboratory assessment during pregnancy",
      "Includes: CBC",
      "Includes: ABO/Rh group and antibody screen",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Initial laboratory assessment during pregnancy",
    "beforeBooking": "Pregnancy tests and timing should follow the treating obstetrician's plan.",
    "keyTests": [
      "CBC",
      "ABO/Rh group and antibody screen",
      "Urinalysis and urine culture",
      "Glucose assessment",
      "HIV, hepatitis B/C and syphilis screening",
      "Rubella IgG",
      "TSH and STI NAAT according to risk/protocol"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-04-comprehensive-iron-studies",
    "slug": "pkg-04-comprehensive-iron-studies",
    "name": "#04 Comprehensive Iron Studies",
    "guideNumber": "#04",
    "parametersCount": 6,
    "parametersLabel": "6 Key Components",
    "category": "Blood Health",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Serum iron, Ferritin, TIBC or transferrin, UIBC, Calculated transferrin saturation, CRP when ferritin may be affected by inflammation",
    "highlights": [
      "May help when: Suspected iron deficiency, overload or treatment monitoring",
      "Includes: Serum iron",
      "Includes: Ferritin",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Suspected iron deficiency, overload or treatment monitoring",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Serum iron",
      "Ferritin",
      "TIBC or transferrin",
      "UIBC",
      "Calculated transferrin saturation",
      "CRP when ferritin may be affected by inflammation"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-05-androgen-evaluation-profile",
    "slug": "pkg-05-androgen-evaluation-profile",
    "name": "#05 Androgen Evaluation Profile",
    "guideNumber": "#05",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Hormonal & PCOS",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Total testosterone, SHBG and albumin, Calculated free testosterone, DHEA-S, Androstenedione, DHT when indicated, 17-hydroxyprogesterone when indicated",
    "highlights": [
      "May help when: Androgen excess/deficiency symptoms or reproductive concerns",
      "Includes: Total testosterone",
      "Includes: SHBG and albumin",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Androgen excess/deficiency symptoms or reproductive concerns",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "Total testosterone",
      "SHBG and albumin",
      "Calculated free testosterone",
      "DHEA-S",
      "Androstenedione",
      "DHT when indicated",
      "17-hydroxyprogesterone when indicated"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-06-autoimmune-liver-disease-evaluation",
    "slug": "pkg-06-autoimmune-liver-disease-evaluation",
    "name": "#06 Autoimmune Liver Disease Evaluation",
    "guideNumber": "#06",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Autoimmune & Protein Disorders",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Liver function tests: bilirubin, AST, ALT, ALP, GGT and proteins, Total IgG, ANA and smooth-muscle antibody, LKM-1 and SLA antibodies, Antimitochondrial antibody, Hepatitis B/C screening to exclude viral causes, IgG4 or metabolic tests when indicated",
    "highlights": [
      "May help when: Abnormal liver tests with suspected autoimmune disease",
      "Includes: Liver function tests: bilirubin, AST, ALT, ALP, GGT and proteins",
      "Includes: Total IgG",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Abnormal liver tests with suspected autoimmune disease",
    "beforeBooking": "Doctor or laboratory consultation is advised before booking; exact tests depend on the clinical question.",
    "keyTests": [
      "Liver function tests: bilirubin, AST, ALT, ALP, GGT and proteins",
      "Total IgG",
      "ANA and smooth-muscle antibody",
      "LKM-1 and SLA antibodies",
      "Antimitochondrial antibody",
      "Hepatitis B/C screening to exclude viral causes",
      "IgG4 or metabolic tests when indicated"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-07-adrenal-insufficiency-evaluation",
    "slug": "pkg-07-adrenal-insufficiency-evaluation",
    "name": "#07 Adrenal Insufficiency Evaluation",
    "guideNumber": "#07",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Tuberculosis & Adrenal Health",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "8 a.m. cortisol with paired ACTH, Sodium and potassium, Glucose, Creatinine, Cosyntropin stimulation test when indicated, Renin/aldosterone for suspected primary disease, 21-hydroxylase antibodies when indicated",
    "highlights": [
      "May help when: Symptoms or clinical suspicion of cortisol deficiency",
      "Includes: 8 a.m. cortisol with paired ACTH",
      "Includes: Sodium and potassium",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Symptoms or clinical suspicion of cortisol deficiency",
    "beforeBooking": "Doctor or laboratory consultation is advised before booking; exact tests depend on the clinical question.",
    "keyTests": [
      "8 a.m. cortisol with paired ACTH",
      "Sodium and potassium",
      "Glucose",
      "Creatinine",
      "Cosyntropin stimulation test when indicated",
      "Renin/aldosterone for suspected primary disease",
      "21-hydroxylase antibodies when indicated"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-08-basic-metabolic-panel-standardized",
    "slug": "pkg-08-basic-metabolic-panel-standardized",
    "name": "#08 Basic Metabolic Panel - Standardized",
    "guideNumber": "#08",
    "parametersCount": 8,
    "parametersLabel": "8 Key Components",
    "category": "Blood & Metabolism",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Fasting or random glucose, Urea/BUN, Creatinine with calculated eGFR, Sodium, Potassium, Chloride, Bicarbonate, Calcium",
    "highlights": [
      "May help when: General metabolic, glucose, kidney and electrolyte assessment",
      "Includes: Fasting or random glucose",
      "Includes: Urea/BUN",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "General metabolic, glucose, kidney and electrolyte assessment",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Fasting or random glucose",
      "Urea/BUN",
      "Creatinine with calculated eGFR",
      "Sodium",
      "Potassium",
      "Chloride",
      "Bicarbonate",
      "Calcium"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-09-breast-screening-guidance-biomarker-monitoring",
    "slug": "pkg-09-breast-screening-guidance-biomarker-monitoring",
    "name": "#09 Breast Screening Guidance & Biomarker Monitoring",
    "guideNumber": "#09",
    "parametersCount": 3,
    "parametersLabel": "3 Key Components",
    "category": "Specialist Testing",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "No routine blood test is recommended for breast-cancer screening, Clinical breast assessment and age/risk-appropriate imaging, CA 15-3, CA 27.29 or CEA only when an oncologist selects them for monitoring",
    "highlights": [
      "May help when: Screening guidance or oncologist-directed biomarker monitoring",
      "Includes: No routine blood test is recommended for breast-cancer screening",
      "Includes: Clinical breast assessment and age/risk-appropriate imaging",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Screening guidance or oncologist-directed biomarker monitoring",
    "beforeBooking": "There is no routine blood-marker package for breast-cancer screening. Ask about appropriate clinical assessment and imaging.",
    "keyTests": [
      "No routine blood test is recommended for breast-cancer screening",
      "Clinical breast assessment and age/risk-appropriate imaging",
      "CA 15-3, CA 27.29 or CEA only when an oncologist selects them for monitoring"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-10-basic-bone-and-mineral-profile",
    "slug": "pkg-10-basic-bone-and-mineral-profile",
    "name": "#10 Basic Bone and Mineral Profile",
    "guideNumber": "#10",
    "parametersCount": 8,
    "parametersLabel": "8 Key Components",
    "category": "Diabetes & Bone Health",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Calcium, Phosphorus, Magnesium, Albumin, Alkaline phosphatase, 25-OH vitamin D, Intact PTH, Creatinine with eGFR",
    "highlights": [
      "May help when: Vitamin D, mineral balance or general bone-health concerns",
      "Includes: Calcium",
      "Includes: Phosphorus",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Vitamin D, mineral balance or general bone-health concerns",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Calcium",
      "Phosphorus",
      "Magnesium",
      "Albumin",
      "Alkaline phosphatase",
      "25-OH vitamin D",
      "Intact PTH",
      "Creatinine with eGFR"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-11-cardiac-risk-acute-injury-pathways",
    "slug": "pkg-11-cardiac-risk-acute-injury-pathways",
    "name": "#11 Cardiac Risk & Acute Injury Pathways",
    "guideNumber": "#11",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "Joint & Heart Health",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Lipid profile with LDL and non-HDL, High-sensitivity CRP for selected risk assessment, High-sensitivity troponin I OR T for acute symptoms, BNP/NT-proBNP for suspected heart failure, ApoB and lipoprotein(a) when indicated",
    "highlights": [
      "May help when: Cardiovascular risk review or acute symptoms through separate pathways",
      "Includes: Lipid profile with LDL and non-HDL",
      "Includes: High-sensitivity CRP for selected risk assessment",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Cardiovascular risk review or acute symptoms through separate pathways",
    "beforeBooking": "Chest pain, sweating, severe breathlessness or fainting needs urgent medical assessment - do not wait for a package test.",
    "keyTests": [
      "Lipid profile with LDL and non-HDL",
      "High-sensitivity CRP for selected risk assessment",
      "High-sensitivity troponin I OR T for acute symptoms",
      "BNP/NT-proBNP for suspected heart failure",
      "ApoB and lipoprotein(a) when indicated"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-12-cardiolipin-antibody-profile",
    "slug": "pkg-12-cardiolipin-antibody-profile",
    "name": "#12 Cardiolipin Antibody Profile",
    "guideNumber": "#12",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "Joint & Heart Health",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Anticardiolipin IgG, Anticardiolipin IgM, Anti-beta-2 glycoprotein I IgG/IgM, Lupus anticoagulant, Repeat qualifying positives after at least 12 weeks",
    "highlights": [
      "May help when: Thrombosis or defined pregnancy complications",
      "Includes: Anticardiolipin IgG",
      "Includes: Anticardiolipin IgM",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Thrombosis or defined pregnancy complications",
    "beforeBooking": "A qualifying positive result generally needs repeat testing after at least 12 weeks and clinical criteria.",
    "keyTests": [
      "Anticardiolipin IgG",
      "Anticardiolipin IgM",
      "Anti-beta-2 glycoprotein I IgG/IgM",
      "Lupus anticoagulant",
      "Repeat qualifying positives after at least 12 weeks"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-13-basic-coagulation-profile",
    "slug": "pkg-13-basic-coagulation-profile",
    "name": "#13 Basic Coagulation Profile",
    "guideNumber": "#13",
    "parametersCount": 3,
    "parametersLabel": "3 Key Components",
    "category": "Bleeding & Coagulation",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Prothrombin time/INR, Activated partial thromboplastin time (APTT), CBC with platelet count",
    "highlights": [
      "May help when: Bleeding history, anticoagulant monitoring or selected procedures",
      "Includes: Prothrombin time/INR",
      "Includes: Activated partial thromboplastin time (APTT)",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Bleeding history, anticoagulant monitoring or selected procedures",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "Prothrombin time/INR",
      "Activated partial thromboplastin time (APTT)",
      "CBC with platelet count"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-14-extended-bleeding-and-coagulation-evaluation",
    "slug": "pkg-14-extended-bleeding-and-coagulation-evaluation",
    "name": "#14 Extended Bleeding and Coagulation Evaluation",
    "guideNumber": "#14",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Bleeding & Coagulation",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "PT/INR, APTT, Fibrinogen, Thrombin time, Platelet count, D-dimer only when clinically indicated, Mixing studies or von Willebrand testing when indicated",
    "highlights": [
      "May help when: Unexplained bleeding/clotting or abnormal basic tests",
      "Includes: PT/INR",
      "Includes: APTT",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Unexplained bleeding/clotting or abnormal basic tests",
    "beforeBooking": "Bleeding time and clotting time are not included as routine modern screening tests.",
    "keyTests": [
      "PT/INR",
      "APTT",
      "Fibrinogen",
      "Thrombin time",
      "Platelet count",
      "D-dimer only when clinically indicated",
      "Mixing studies or von Willebrand testing when indicated"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-15-first-trimester-combined-aneuploidy-screen",
    "slug": "pkg-15-first-trimester-combined-aneuploidy-screen",
    "name": "#15 First-Trimester Combined Aneuploidy Screen",
    "guideNumber": "#15",
    "parametersCount": 4,
    "parametersLabel": "4 Key Components",
    "category": "Pregnancy Risk Screening",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "PAPP-A, Free beta-hCG, Nuchal-translucency ultrasound, Maternal and gestational information for validated risk calculation",
    "highlights": [
      "May help when: First-trimester aneuploidy risk screening",
      "Includes: PAPP-A",
      "Includes: Free beta-hCG",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "First-trimester aneuploidy risk screening",
    "beforeBooking": "Screening estimates risk; it does not diagnose a chromosomal condition.",
    "keyTests": [
      "PAPP-A",
      "Free beta-hCG",
      "Nuchal-translucency ultrasound",
      "Maternal and gestational information for validated risk calculation"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-16-second-trimester-triple-marker-screen",
    "slug": "pkg-16-second-trimester-triple-marker-screen",
    "name": "#16 Second-Trimester Triple Marker Screen",
    "guideNumber": "#16",
    "parametersCount": 3,
    "parametersLabel": "3 Key Components",
    "category": "Pregnancy Risk Screening",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Alpha-fetoprotein (AFP) hCG, Unconjugated estriol (uE3), Maternal and gestational information for validated risk calculation",
    "highlights": [
      "May help when: Second-trimester biochemical risk screening",
      "Includes: Alpha-fetoprotein (AFP) hCG",
      "Includes: Unconjugated estriol (uE3)",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Second-trimester biochemical risk screening",
    "beforeBooking": "Screening estimates risk; gestational age and maternal information are essential.",
    "keyTests": [
      "Alpha-fetoprotein (AFP) hCG",
      "Unconjugated estriol (uE3)",
      "Maternal and gestational information for validated risk calculation"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-17-second-trimester-quadruple-marker-screen",
    "slug": "pkg-17-second-trimester-quadruple-marker-screen",
    "name": "#17 Second-Trimester Quadruple Marker Screen",
    "guideNumber": "#17",
    "parametersCount": 4,
    "parametersLabel": "4 Key Components",
    "category": "Pregnancy Risk Screening",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Alpha-fetoprotein (AFP) hCG, Unconjugated estriol (uE3), Inhibin A, Maternal and gestational information for validated risk calculation",
    "highlights": [
      "May help when: Second-trimester biochemical risk screening",
      "Includes: Alpha-fetoprotein (AFP) hCG",
      "Includes: Unconjugated estriol (uE3)",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Second-trimester biochemical risk screening",
    "beforeBooking": "Screening estimates risk; abnormal results require counselling and follow-up.",
    "keyTests": [
      "Alpha-fetoprotein (AFP) hCG",
      "Unconjugated estriol (uE3)",
      "Inhibin A",
      "Maternal and gestational information for validated risk calculation"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-18-electrolytes-plus",
    "slug": "pkg-18-electrolytes-plus",
    "name": "#18 Electrolytes Plus",
    "guideNumber": "#18",
    "parametersCount": 6,
    "parametersLabel": "6 Key Components",
    "category": "Electrolytes & Kidneys",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Sodium, Potassium, Chloride, Bicarbonate/total carbon dioxide, Magnesium when indicated, Calcium when indicated",
    "highlights": [
      "May help when: Vomiting, dehydration, kidney disease or medication monitoring",
      "Includes: Sodium",
      "Includes: Potassium",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Vomiting, dehydration, kidney disease or medication monitoring",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Sodium",
      "Potassium",
      "Chloride",
      "Bicarbonate/total carbon dioxide",
      "Magnesium when indicated",
      "Calcium when indicated"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-19-sti-screening-panel-risk-based",
    "slug": "pkg-19-sti-screening-panel-risk-based",
    "name": "#19 STI Screening Panel - Risk Based",
    "guideNumber": "#19",
    "parametersCount": 6,
    "parametersLabel": "6 Key Components",
    "category": "Infection Screening",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "HIV-1/2 antigen-antibody test, Hepatitis B infection/immunity panel, Hepatitis C screening, Chlamydia and gonorrhea NAAT, Syphilis screening with confirmation, Other site-specific tests based on exposure",
    "highlights": [
      "May help when: Risk-based STI screening, symptoms or exposure concerns",
      "Includes: HIV-1/2 antigen-antibody test",
      "Includes: Hepatitis B infection/immunity panel",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Risk-based STI screening, symptoms or exposure concerns",
    "beforeBooking": "Testing is confidential. Specimen site and tests depend on exposure and symptoms.",
    "keyTests": [
      "HIV-1/2 antigen-antibody test",
      "Hepatitis B infection/immunity panel",
      "Hepatitis C screening",
      "Chlamydia and gonorrhea NAAT",
      "Syphilis screening with confirmation",
      "Other site-specific tests based on exposure"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-20-female-fertility-evaluation-clinician-directed",
    "slug": "pkg-20-female-fertility-evaluation-clinician-directed",
    "name": "#20 Female Fertility Evaluation - Clinician Directed",
    "guideNumber": "#20",
    "parametersCount": 9,
    "parametersLabel": "9 Key Components",
    "category": "PCOS & Fertility",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "FSH and LH, Prolactin, Estradiol, Cycle-timed progesterone, AMH, TSH, DHEA-S, Testosterone/SHBG, Pregnancy test when appropriate",
    "highlights": [
      "May help when: Fertility evaluation with cycle-timed interpretation",
      "Includes: FSH and LH",
      "Includes: Prolactin",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Fertility evaluation with cycle-timed interpretation",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "FSH and LH",
      "Prolactin",
      "Estradiol",
      "Cycle-timed progesterone",
      "AMH",
      "TSH",
      "DHEA-S",
      "Testosterone/SHBG",
      "Pregnancy test when appropriate"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-21-menopause-assessment-clinician-directed",
    "slug": "pkg-21-menopause-assessment-clinician-directed",
    "name": "#21 Menopause Assessment - Clinician Directed",
    "guideNumber": "#21",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "PCOS & Fertility",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "TSH and free T4, FSH, LH, Estradiol, Pregnancy test or prolactin when presentation is atypical",
    "highlights": [
      "May help when: Uncertain menopause or premature ovarian insufficiency concerns",
      "Includes: TSH and free T4",
      "Includes: FSH",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Uncertain menopause or premature ovarian insufficiency concerns",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "TSH and free T4",
      "FSH",
      "LH",
      "Estradiol",
      "Pregnancy test or prolactin when presentation is atypical"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-22-complex-menopause-and-amenorrhea-evaluation",
    "slug": "pkg-22-complex-menopause-and-amenorrhea-evaluation",
    "name": "#22 Complex Menopause and Amenorrhea Evaluation",
    "guideNumber": "#22",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "PCOS & Fertility",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Pregnancy test when appropriate, TSH and free T4, FSH, Prolactin, Estradiol, Androgen/17-OHP testing only for specific symptoms, HbA1c and lipids as a separate health assessment",
    "highlights": [
      "May help when: Complex amenorrhea or atypical endocrine symptoms",
      "Includes: Pregnancy test when appropriate",
      "Includes: TSH and free T4",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Complex amenorrhea or atypical endocrine symptoms",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "Pregnancy test when appropriate",
      "TSH and free T4",
      "FSH",
      "Prolactin",
      "Estradiol",
      "Androgen/17-OHP testing only for specific symptoms",
      "HbA1c and lipids as a separate health assessment"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-23-mmr-immunity-profile",
    "slug": "pkg-23-mmr-immunity-profile",
    "name": "#23 MMR Immunity Profile",
    "guideNumber": "#23",
    "parametersCount": 4,
    "parametersLabel": "4 Key Components",
    "category": "Pregnancy & Immunity",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Measles IgG, Mumps IgG, Rubella IgG, PCR/IgM only through an acute- infection pathway when disease is suspected",
    "highlights": [
      "May help when: Immunity documentation when vaccination records are unavailable",
      "Includes: Measles IgG",
      "Includes: Mumps IgG",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Immunity documentation when vaccination records are unavailable",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Measles IgG",
      "Mumps IgG",
      "Rubella IgG",
      "PCR/IgM only through an acute- infection pathway when disease is suspected"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-24-monoclonal-gammopathy-myeloma-evaluation",
    "slug": "pkg-24-monoclonal-gammopathy-myeloma-evaluation",
    "name": "#24 Monoclonal Gammopathy / Myeloma Evaluation",
    "guideNumber": "#24",
    "parametersCount": 8,
    "parametersLabel": "8 Key Components",
    "category": "Autoimmune & Protein Disorders",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "CBC, Serum protein electrophoresis (SPEP), Serum immunofixation, Free light chains and ratio, IgG, IgA and IgM, Calcium and creatinine/eGFR, Albumin, total protein, LDH and beta-2 microglobulin, Urine electrophoresis/ immunofixation when indicated",
    "highlights": [
      "May help when: Suspected monoclonal protein disorder under specialist review",
      "Includes: CBC",
      "Includes: Serum protein electrophoresis (SPEP)",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Suspected monoclonal protein disorder under specialist review",
    "beforeBooking": "Doctor or laboratory consultation is advised before booking; exact tests depend on the clinical question.",
    "keyTests": [
      "CBC",
      "Serum protein electrophoresis (SPEP)",
      "Serum immunofixation",
      "Free light chains and ratio",
      "IgG, IgA and IgM",
      "Calcium and creatinine/eGFR",
      "Albumin, total protein, LDH and beta-2 microglobulin",
      "Urine electrophoresis/ immunofixation when indicated"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-25-musculoskeletal-inflammation-screen",
    "slug": "pkg-25-musculoskeletal-inflammation-screen",
    "name": "#25 Musculoskeletal Inflammation Screen",
    "guideNumber": "#25",
    "parametersCount": 6,
    "parametersLabel": "6 Key Components",
    "category": "Bone & Musculoskeletal Health",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "CBC, ESR and CRP, Rheumatoid factor/anti-CCP when indicated, Uric acid, Vitamin D and calcium when indicated, Joint-fluid analysis for suspected infection or crystals",
    "highlights": [
      "May help when: Selected joint or musculoskeletal symptoms after assessment",
      "Includes: CBC",
      "Includes: ESR and CRP",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Selected joint or musculoskeletal symptoms after assessment",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "CBC",
      "ESR and CRP",
      "Rheumatoid factor/anti-CCP when indicated",
      "Uric acid",
      "Vitamin D and calcium when indicated",
      "Joint-fluid analysis for suspected infection or crystals"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-26-osteoporosis-and-secondary-cause-laboratory-panel",
    "slug": "pkg-26-osteoporosis-and-secondary-cause-laboratory-panel",
    "name": "#26 Osteoporosis and Secondary-Cause Laboratory Panel",
    "guideNumber": "#26",
    "parametersCount": 8,
    "parametersLabel": "8 Key Components",
    "category": "Bone & Musculoskeletal Health",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Calcium, phosphorus and magnesium, 25-OH vitamin D, Intact PTH, Albumin and ALP, Creatinine, TSH, P1NP and osteocalcin, Beta-CTX when monitoring is required",
    "highlights": [
      "May help when: Low bone density, fractures or secondary-cause evaluation",
      "Includes: Calcium, phosphorus and magnesium",
      "Includes: 25-OH vitamin D",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Low bone density, fractures or secondary-cause evaluation",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "Calcium, phosphorus and magnesium",
      "25-OH vitamin D",
      "Intact PTH",
      "Albumin and ALP",
      "Creatinine",
      "TSH",
      "P1NP and osteocalcin",
      "Beta-CTX when monitoring is required"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-27-recurrent-pregnancy-loss-aps-evaluation",
    "slug": "pkg-27-recurrent-pregnancy-loss-aps-evaluation",
    "name": "#27 Recurrent Pregnancy Loss / APS Evaluation",
    "guideNumber": "#27",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "Pregnancy Care",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Lupus anticoagulant, Anticardiolipin IgG/IgM, Anti-beta-2 glycoprotein I IgG/IgM, Repeat qualifying positives after at least 12 weeks, Other tests only after obstetric/ specialist review",
    "highlights": [
      "May help when: Recurrent pregnancy loss or APS evaluation",
      "Includes: Lupus anticoagulant",
      "Includes: Anticardiolipin IgG/IgM",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Recurrent pregnancy loss or APS evaluation",
    "beforeBooking": "This is not a routine antenatal panel. Blanket TORCH/ANA testing is not offered without a specific indication.",
    "keyTests": [
      "Lupus anticoagulant",
      "Anticardiolipin IgG/IgM",
      "Anti-beta-2 glycoprotein I IgG/IgM",
      "Repeat qualifying positives after at least 12 weeks",
      "Other tests only after obstetric/ specialist review"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-28-prostate-assessment-psa-based",
    "slug": "pkg-28-prostate-assessment-psa-based",
    "name": "#28 Prostate Assessment - PSA Based",
    "guideNumber": "#28",
    "parametersCount": 3,
    "parametersLabel": "3 Key Components",
    "category": "Men's Health",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Total PSA, Repeat PSA after resolving temporary causes of elevation when advised, Urinalysis and creatinine/eGFR for urinary symptoms",
    "highlights": [
      "May help when: PSA-based prostate assessment after shared decision-making",
      "Includes: Total PSA",
      "Includes: Repeat PSA after resolving temporary causes of elevation when advised",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "PSA-based prostate assessment after shared decision-making",
    "beforeBooking": "Prostatic acid phosphatase is not included in the routine modern prostate assessment.",
    "keyTests": [
      "Total PSA",
      "Repeat PSA after resolving temporary causes of elevation when advised",
      "Urinalysis and creatinine/eGFR for urinary symptoms"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-29-prostate-cancer-risk-assessment-psa-reflex",
    "slug": "pkg-29-prostate-cancer-risk-assessment-psa-reflex",
    "name": "#29 Prostate Cancer Risk Assessment - PSA Reflex",
    "guideNumber": "#29",
    "parametersCount": 4,
    "parametersLabel": "4 Key Components",
    "category": "Men's Health",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Total PSA, Reflex free PSA with calculated free-to-total percentage, PHI/4Kscore only when selected by a urologist, Urology assessment and MRI when indicated",
    "highlights": [
      "May help when: PSA risk clarification through a urology pathway",
      "Includes: Total PSA",
      "Includes: Reflex free PSA with calculated free-to-total percentage",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "PSA risk clarification through a urology pathway",
    "beforeBooking": "PSA is not diagnostic by itself. Results should be interpreted with age, symptoms and prior values.",
    "keyTests": [
      "Total PSA",
      "Reflex free PSA with calculated free-to-total percentage",
      "PHI/4Kscore only when selected by a urologist",
      "Urology assessment and MRI when indicated"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-30-pcos-diagnostic-and-metabolic-profile",
    "slug": "pkg-30-pcos-diagnostic-and-metabolic-profile",
    "name": "#30 PCOS Diagnostic and Metabolic Profile",
    "guideNumber": "#30",
    "parametersCount": 8,
    "parametersLabel": "8 Key Components",
    "category": "Hormonal & PCOS",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "TSH, Total/free testosterone and SHBG, DHEA-S, Prolactin, FSH and LH, HbA1c or oral glucose tolerance test, Full lipid profile, Pregnancy test/17-OHP when indicated",
    "highlights": [
      "May help when: Irregular cycles, androgen symptoms or suspected PCOS",
      "Includes: TSH",
      "Includes: Total/free testosterone and SHBG",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Irregular cycles, androgen symptoms or suspected PCOS",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "TSH",
      "Total/free testosterone and SHBG",
      "DHEA-S",
      "Prolactin",
      "FSH and LH",
      "HbA1c or oral glucose tolerance test",
      "Full lipid profile",
      "Pregnancy test/17-OHP when indicated"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-31-pcos-evaluation-not-population-screening",
    "slug": "pkg-31-pcos-evaluation-not-population-screening",
    "name": "#31 PCOS Evaluation - Not Population Screening",
    "guideNumber": "#31",
    "parametersCount": 8,
    "parametersLabel": "8 Key Components",
    "category": "Hormonal & PCOS",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "TSH, Total/free testosterone and SHBG, DHEA-S, Prolactin, 17-hydroxyprogesterone, HbA1c or oral glucose tolerance test, Full lipid profile, Pregnancy test when appropriate",
    "highlights": [
      "May help when: Clinical evaluation of suspected PCOS - not population screening",
      "Includes: TSH",
      "Includes: Total/free testosterone and SHBG",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Clinical evaluation of suspected PCOS - not population screening",
    "beforeBooking": "Symptoms, medicines, age, cycle timing or treatment can change the appropriate tests and interpretation.",
    "keyTests": [
      "TSH",
      "Total/free testosterone and SHBG",
      "DHEA-S",
      "Prolactin",
      "17-hydroxyprogesterone",
      "HbA1c or oral glucose tolerance test",
      "Full lipid profile",
      "Pregnancy test when appropriate"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-32-complete-antiphospholipid-syndrome-panel",
    "slug": "pkg-32-complete-antiphospholipid-syndrome-panel",
    "name": "#32 Complete Antiphospholipid Syndrome Panel",
    "guideNumber": "#32",
    "parametersCount": 4,
    "parametersLabel": "4 Key Components",
    "category": "Antiphospholipid Antibodies",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Anticardiolipin IgG/IgM, Anti-beta-2 glycoprotein I IgG/IgM, Lupus anticoagulant, Repeat qualifying positives after at least 12 weeks",
    "highlights": [
      "May help when: Suspected antiphospholipid syndrome",
      "Includes: Anticardiolipin IgG/IgM",
      "Includes: Anti-beta-2 glycoprotein I IgG/IgM",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Suspected antiphospholipid syndrome",
    "beforeBooking": "Antibody results alone do not diagnose antiphospholipid syndrome.",
    "keyTests": [
      "Anticardiolipin IgG/IgM",
      "Anti-beta-2 glycoprotein I IgG/IgM",
      "Lupus anticoagulant",
      "Repeat qualifying positives after at least 12 weeks"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-33-basic-iron-deficiency-profile",
    "slug": "pkg-33-basic-iron-deficiency-profile",
    "name": "#33 Basic Iron Deficiency Profile",
    "guideNumber": "#33",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "Blood Health",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Complete Blood Count (CBC), Serum iron, TIBC, Ferritin, Calculated transferrin saturation",
    "highlights": [
      "May help when: A focused first-line check for possible iron deficiency",
      "Includes: Complete Blood Count (CBC)",
      "Includes: Serum iron",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "A focused first-line check for possible iron deficiency",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Complete Blood Count (CBC)",
      "Serum iron",
      "TIBC",
      "Ferritin",
      "Calculated transferrin saturation"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-34-kidney-function-test-basic",
    "slug": "pkg-34-kidney-function-test-basic",
    "name": "#34 Kidney Function Test - Basic",
    "guideNumber": "#34",
    "parametersCount": 6,
    "parametersLabel": "6 Key Components",
    "category": "Electrolytes & Kidneys",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Urea/BUN, Creatinine with calculated eGFR, Uric acid, Sodium, potassium and chloride, Routine urinalysis, Urine ACR for diabetes, hypertension or CKD risk",
    "highlights": [
      "May help when: Routine kidney assessment or diabetes/hypertension risk",
      "Includes: Urea/BUN",
      "Includes: Creatinine with calculated eGFR",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Routine kidney assessment or diabetes/hypertension risk",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Urea/BUN",
      "Creatinine with calculated eGFR",
      "Uric acid",
      "Sodium, potassium and chloride",
      "Routine urinalysis",
      "Urine ACR for diabetes, hypertension or CKD risk"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-35-kidney-function-and-mineral-profile",
    "slug": "pkg-35-kidney-function-and-mineral-profile",
    "name": "#35 Kidney Function and Mineral Profile",
    "guideNumber": "#35",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Electrolytes & Kidneys",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Urea/BUN, Creatinine with eGFR, Sodium, potassium and chloride, Calcium, phosphorus and magnesium, Serum albumin, Routine urinalysis, Urine albumin-creatinine ratio (UACR)",
    "highlights": [
      "May help when: Expanded kidney and mineral assessment",
      "Includes: Urea/BUN",
      "Includes: Creatinine with eGFR",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Expanded kidney and mineral assessment",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "Urea/BUN",
      "Creatinine with eGFR",
      "Sodium, potassium and chloride",
      "Calcium, phosphorus and magnesium",
      "Serum albumin",
      "Routine urinalysis",
      "Urine albumin-creatinine ratio (UACR)"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-36-acute-fever-initial-evaluation-context-based",
    "slug": "pkg-36-acute-fever-initial-evaluation-context-based",
    "name": "#36 Acute Fever Initial Evaluation - Context Based",
    "guideNumber": "#36",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Infection Screening",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "CBC, CRP, Liver function tests, Creatinine/eGFR and electrolytes, Malaria rapid test and smear when relevant, Dengue test selected by illness day, Urinalysis/culture when indicated",
    "highlights": [
      "May help when: Acute fever assessed according to illness day and local risk",
      "Includes: CBC",
      "Includes: CRP",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Acute fever assessed according to illness day and local risk",
    "beforeBooking": "Widal is not used as a stand-alone routine fever screen. Test selection depends on illness day.",
    "keyTests": [
      "CBC",
      "CRP",
      "Liver function tests",
      "Creatinine/eGFR and electrolytes",
      "Malaria rapid test and smear when relevant",
      "Dengue test selected by illness day",
      "Urinalysis/culture when indicated"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-37-diabetes-glycemic-profile-basic",
    "slug": "pkg-37-diabetes-glycemic-profile-basic",
    "name": "#37 Diabetes Glycemic Profile - Basic",
    "guideNumber": "#37",
    "parametersCount": 4,
    "parametersLabel": "4 Key Components",
    "category": "Diabetes & Bone Health",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "HbA1c, Fasting blood glucose, Post-meal blood glucose, Creatinine with calculated eGFR",
    "highlights": [
      "May help when: Diabetes screening or basic glucose monitoring",
      "Includes: HbA1c",
      "Includes: Fasting blood glucose",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Diabetes screening or basic glucose monitoring",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "HbA1c",
      "Fasting blood glucose",
      "Post-meal blood glucose",
      "Creatinine with calculated eGFR"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-38-comprehensive-diabetes-monitoring-profile",
    "slug": "pkg-38-comprehensive-diabetes-monitoring-profile",
    "name": "#38 Comprehensive Diabetes Monitoring Profile",
    "guideNumber": "#38",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Diabetes & Bone Health",
    "tag": "SELF-REQUEST POSSIBLE",
    "guidanceLevel": "SELF-REQUEST POSSIBLE",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "HbA1c, Fasting and post-meal glucose, Lipid profile, Creatinine with eGFR, Urine albumin-creatinine ratio, Routine urinalysis, Liver function tests",
    "highlights": [
      "May help when: Ongoing diabetes care with kidney and heart-risk monitoring",
      "Includes: HbA1c",
      "Includes: Fasting and post-meal glucose",
      "Guidance: SELF-REQUEST POSSIBLE"
    ],
    "mayHelpWhen": "Ongoing diabetes care with kidney and heart-risk monitoring",
    "beforeBooking": "Ask reception about fasting, sample type and whether previous reports or medicines affect interpretation.",
    "keyTests": [
      "HbA1c",
      "Fasting and post-meal glucose",
      "Lipid profile",
      "Creatinine with eGFR",
      "Urine albumin-creatinine ratio",
      "Routine urinalysis",
      "Liver function tests"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-39-specimen-specific-culture-and-susceptibility-menu",
    "slug": "pkg-39-specimen-specific-culture-and-susceptibility-menu",
    "name": "#39 Specimen-Specific Culture and Susceptibility Menu",
    "guideNumber": "#39",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "Respiratory & Microbiology",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Correct specimen selected for the suspected site, Gram stain where appropriate, Culture and organism identification, Antimicrobial susceptibility testing, Anaerobic, fungal or mycobacterial culture when indicated",
    "highlights": [
      "May help when: Suspected bacterial infection with the correct specimen",
      "Includes: Correct specimen selected for the suspected site",
      "Includes: Gram stain where appropriate",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Suspected bacterial infection with the correct specimen",
    "beforeBooking": "Cultures are specimen-specific; urine, blood, sputum and swabs should not be bundled together.",
    "keyTests": [
      "Correct specimen selected for the suspected site",
      "Gram stain where appropriate",
      "Culture and organism identification",
      "Antimicrobial susceptibility testing",
      "Anaerobic, fungal or mycobacterial culture when indicated"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-40-tuberculosis-evaluation-active-vs-latent",
    "slug": "pkg-40-tuberculosis-evaluation-active-vs-latent",
    "name": "#40 Tuberculosis Evaluation - Active vs Latent",
    "guideNumber": "#40",
    "parametersCount": 7,
    "parametersLabel": "7 Key Components",
    "category": "Tuberculosis & Adrenal Health",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Sputum CBNAAT/molecular test, AFB smear, Mycobacterial culture, Drug-susceptibility testing, HIV screening, Baseline liver/kidney tests before treatment, IGRA/TB Gold only for latent- infection assessment",
    "highlights": [
      "May help when: Suspected active TB or separate latent-infection assessment",
      "Includes: Sputum CBNAAT/molecular test",
      "Includes: AFB smear",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Suspected active TB or separate latent-infection assessment",
    "beforeBooking": "TB Gold/IGRA cannot distinguish active from latent TB and is not the confirmation test for active disease.",
    "keyTests": [
      "Sputum CBNAAT/molecular test",
      "AFB smear",
      "Mycobacterial culture",
      "Drug-susceptibility testing",
      "HIV screening",
      "Baseline liver/kidney tests before treatment",
      "IGRA/TB Gold only for latent- infection assessment"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-41-pneumonia-severity-and-etiology-evaluation",
    "slug": "pkg-41-pneumonia-severity-and-etiology-evaluation",
    "name": "#41 Pneumonia Severity and Etiology Evaluation",
    "guideNumber": "#41",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "Respiratory & Microbiology",
    "tag": "DOCTOR-DIRECTED",
    "guidanceLevel": "DOCTOR-DIRECTED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "CBC and CRP, Kidney, electrolyte and liver tests for moderate/severe illness, Respiratory viral NAAT, Sputum Gram stain/culture when indicated, Blood cultures or urinary antigens for selected severe cases",
    "highlights": [
      "May help when: Suspected pneumonia after clinical assessment and imaging",
      "Includes: CBC and CRP",
      "Includes: Kidney, electrolyte and liver tests for moderate/severe illness",
      "Guidance: DOCTOR-DIRECTED"
    ],
    "mayHelpWhen": "Suspected pneumonia after clinical assessment and imaging",
    "beforeBooking": "Imaging and clinical assessment are central; cultures are reserved for selected cases.",
    "keyTests": [
      "CBC and CRP",
      "Kidney, electrolyte and liver tests for moderate/severe illness",
      "Respiratory viral NAAT",
      "Sputum Gram stain/culture when indicated",
      "Blood cultures or urinary antigens for selected severe cases"
    ],
    "fastingHours": "As advised by Physician",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  },
  {
    "id": "pkg-42-urine-drug-screen-10-classes-with-confirmation",
    "slug": "pkg-42-urine-drug-screen-10-classes-with-confirmation",
    "name": "#42 Urine Drug Screen - 10 Classes with Confirmation",
    "guideNumber": "#42",
    "parametersCount": 5,
    "parametersLabel": "5 Key Components",
    "category": "Specialist Testing",
    "tag": "CONSULTATION RECOMMENDED",
    "guidanceLevel": "CONSULTATION RECOMMENDED",
    "contactForPrice": true,
    "priceDisplay": "Contact Us for Price",
    "includes": "Immunoassay screen for 10 defined drug classes, Urine creatinine, specific gravity and pH, Oxidant/adulterant checks, GC-MS or LC-MS/MS confirmation for non-negative results, Defined cutoffs and chain-of- custody where required",
    "highlights": [
      "May help when: Clinical, workplace or legal testing with defined purpose",
      "Includes: Immunoassay screen for 10 defined drug classes",
      "Includes: Urine creatinine, specific gravity and pH",
      "Guidance: CONSULTATION RECOMMENDED"
    ],
    "mayHelpWhen": "Clinical, workplace or legal testing with defined purpose",
    "beforeBooking": "Screening results are presumptive; consequential non-negative results require mass-spectrometry confirmation.",
    "keyTests": [
      "Immunoassay screen for 10 defined drug classes",
      "Urine creatinine, specific gravity and pH",
      "Oxidant/adulterant checks",
      "GC-MS or LC-MS/MS confirmation for non-negative results",
      "Defined cutoffs and chain-of- custody where required"
    ],
    "fastingHours": "Fasting Instructions on Booking",
    "tat": "Same-Day / Standard Clinical TAT",
    "sampleType": "Blood / Specimen as per protocol"
  }
];

export const CANONICAL_PACKAGES: PackageItem[] = [
  ...PREVENTIVE_PACKAGES,
  ...PATIENT_GUIDE_PACKAGES,
];

export function getPackageBySlugOrId(identifier: string): PackageItem | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toLowerCase();
  return CANONICAL_PACKAGES.find(
    (p) =>
      p.id.toLowerCase() === clean ||
      p.slug.toLowerCase() === clean ||
      p.name.toLowerCase() === clean ||
      p.guideNumber?.toLowerCase() === clean ||
      clean.includes(p.id.toLowerCase())
  );
}

export function computeDiscountPercentage(price?: number, mrp?: number): number {
  if (!price || !mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}
