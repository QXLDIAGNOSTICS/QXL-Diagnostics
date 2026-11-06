/**
 * QXL Diagnostics — Central Test Master Database & Clinical Governance
 * Single Source of Truth for Laboratory Assays
 *
 * Implements immutable canonical test IDs, exact analytical methodology,
 * specimen containers, fasting rules, pricing, TAT, and NABL accreditation status.
 */

export type AccreditationScopeStatus =
  | "verified-in-scope"
  | "not-in-scope"
  | "not-verified";

export interface CanonicalTestMasterEntry {
  test_id: string;                    // Immutable ID (e.g., CBC001, HBA1C001)
  legacy_id?: string;                 // e.g. "cbc", "hba1c"
  canonical_name: string;             // Official clinical assay name
  short_name: string;
  aliases: string[];                  // Synonyms and colloquial terms
  department: string;                 // Laboratory division
  specimen: string;                   // Biological specimen
  container: string;                  // Tube type / Vacutainer color
  minimum_volume: string;             // Volume required
  fasting: boolean;                   // Boolean flag
  fasting_instructions: string;       // Exact patient preparation
  collection_timing?: string;         // e.g. "Morning 06:30 AM–11:00 AM preferred"
  methodology: string;                // Analytical method
  analyser_platform: string;          // Instrument platform
  tat: string;                        // Turnaround time
  price: number;                      // Selling price (INR)
  mrp: number;                        // Maximum retail price (INR)
  discount_percentage: number;
  home_collection_eligible: boolean;  // Doorstep phlebotomy feasibility
  nabl_scope_status: AccreditationScopeStatus;
  medical_reviewer: {
    name: string;
    qualification: string;
    profile_url: string;
  };
  review_date: string;
  canonical_url: string;
  active: boolean;
  parameter_count: number;
  parameters: string[];
}

export const TEST_MASTER: CanonicalTestMasterEntry[] = [
  // ── 1. COMPLETE BLOOD COUNT (CBC) ──────────────────────────────────────────
  {
    test_id: "CBC001",
    legacy_id: "cbc",
    canonical_name: "Complete Blood Count (CBC) with Peripheral Smear",
    short_name: "CBC with Smear",
    aliases: ["cbc", "hemogram", "complete hemogram", "full blood count", "haemogram", "cbc test bangalore"],
    department: "Haematopathology",
    specimen: "EDTA Whole Blood",
    container: "Lavender Top (K2/K3 EDTA Tube)",
    minimum_volume: "2.0 mL",
    fasting: false,
    fasting_instructions: "No fasting required. Maintain normal hydration prior to sample collection.",
    collection_timing: "Any time of day",
    methodology: "Automated 6-Part Differential Flow Cytometry & Impedance with Reflex Manual Smear Examination",
    analyser_platform: "Sysmex XN-Series / Mindray Automated Haematology Line",
    tat: "6 Hours (Same Day)",
    price: 250,
    mrp: 350,
    discount_percentage: 28,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Pritilata Rout",
      qualification: "MD Pathology",
      profile_url: "/dr-pritilata-rout"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/cbc-test-bangalore",
    active: true,
    parameter_count: 26,
    parameters: [
      "Haemoglobin (Hb)",
      "RBC Count",
      "PCV / Haematocrit",
      "MCV",
      "MCH",
      "MCHC",
      "RDW-CV",
      "RDW-SD",
      "Total Leukocyte Count (TLC / WBC)",
      "Neutrophils (Absolute & %)",
      "Lymphocytes (Absolute & %)",
      "Monocytes (Absolute & %)",
      "Eosinophils (Absolute & %)",
      "Basophils (Absolute & %)",
      "Platelet Count",
      "Mean Platelet Volume (MPV)",
      "Platelet Distribution Width (PDW)",
      "Plateletcrit (PCT)",
      "P-LCR",
      "Immature Granulocytes (IG)",
      "Peripheral Smear Examination"
    ]
  },

  // ── 2. HBA1C (GLYCATED HAEMOGLOBIN) ────────────────────────────────────────
  {
    test_id: "HBA1C001",
    legacy_id: "hba1c",
    canonical_name: "Haemoglobin A1c (HbA1c / Glycated Haemoglobin)",
    short_name: "HbA1c",
    aliases: ["hba1c", "glycated hemoglobin", "3 month sugar test", "a1c", "glycosylated haemoglobin"],
    department: "Clinical Biochemistry",
    specimen: "EDTA Whole Blood",
    container: "Lavender Top (K2/K3 EDTA Tube)",
    minimum_volume: "2.0 mL",
    fasting: false,
    fasting_instructions: "No fasting required. Sample can be collected at any time regardless of food intake.",
    collection_timing: "Any time of day",
    methodology: "High-Performance Liquid Chromatography (HPLC) - NGSP & IFCC Certified",
    analyser_platform: "Bio-Rad D-10 / Tosoh G8 Automated HPLC Analyser",
    tat: "6 Hours (Same Day)",
    price: 380,
    mrp: 720,
    discount_percentage: 47,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/hba1c-test-bangalore",
    active: true,
    parameter_count: 3,
    parameters: [
      "HbA1c Concentration (%)",
      "Estimated Average Glucose (eAG, mg/dL)",
      "IFCC-Standardized HbA1c (mmol/mol)"
    ]
  },

  // ── 3. FASTING PLASMA GLUCOSE (FBS) ────────────────────────────────────────
  {
    test_id: "FBS001",
    legacy_id: "fbs",
    canonical_name: "Fasting Plasma Glucose (Fasting Blood Sugar)",
    short_name: "Fasting Glucose (FBS)",
    aliases: ["fbs", "fasting glucose", "fasting plasma glucose", "fasting blood sugar"],
    department: "Clinical Biochemistry",
    specimen: "Fluoride Plasma",
    container: "Grey Top (Sodium Fluoride / Potassium Oxalate Tube)",
    minimum_volume: "2.0 mL",
    fasting: true,
    fasting_instructions: "8 to 10 hours overnight fasting required. Plain water permitted. Do not take morning diabetes medication before draw.",
    collection_timing: "Morning 06:30 AM–10:30 AM",
    methodology: "Hexokinase / Glucose Oxidase Peroxidase (GOD-PAP) Photometric",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "4 Hours (Same Day)",
    price: 35,
    mrp: 70,
    discount_percentage: 50,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/fasting-plasma-glucose",
    active: true,
    parameter_count: 1,
    parameters: ["Fasting Plasma Glucose (mg/dL)"]
  },

  // ── 4. POSTPRANDIAL BLOOD GLUCOSE (PPBS) ───────────────────────────────────
  {
    test_id: "PPBS001",
    legacy_id: "ppbs",
    canonical_name: "Postprandial Blood Glucose (PPBS)",
    short_name: "PPBS Glucose",
    aliases: ["ppbs", "postprandial glucose", "after food sugar test", "pp blood sugar"],
    department: "Clinical Biochemistry",
    specimen: "Fluoride Plasma",
    container: "Grey Top (Sodium Fluoride / Potassium Oxalate Tube)",
    minimum_volume: "2.0 mL",
    fasting: false,
    fasting_instructions: "Collect blood sample exactly 2 hours after the start of a standard meal or 75g glucose intake.",
    collection_timing: "Exactly 2 hours post-meal",
    methodology: "Hexokinase / GOD-PAP Photometric",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "4 Hours (Same Day)",
    price: 35,
    mrp: 70,
    discount_percentage: 50,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/tests/postprandial-blood-glucose",
    active: true,
    parameter_count: 1,
    parameters: ["Postprandial Plasma Glucose (mg/dL)"]
  },

  // ── 5. THYROID PROFILE TOTAL (T3, T4, TSH) ─────────────────────────────────
  {
    test_id: "THYROID001",
    legacy_id: "thyroid-profile",
    canonical_name: "Thyroid Profile Total (Total T3, Total T4, Ultrasensitive TSH)",
    short_name: "Thyroid Profile (Total)",
    aliases: ["thyroid profile", "tft", "t3 t4 tsh", "thyroid panel", "thyroid function test"],
    department: "Clinical Biochemistry & Immunology",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: false,
    fasting_instructions: "No fasting strictly required; early morning collection recommended. Take morning thyroid tablet after blood collection.",
    collection_timing: "Early morning 06:30 AM–10:00 AM preferred",
    methodology: "Chemiluminescent Microparticle Immunoassay (CMIA / CLIA)",
    analyser_platform: "Abbott Architect i2000SR / Roche Cobas e411",
    tat: "6 Hours (Same Day)",
    price: 350,
    mrp: 550,
    discount_percentage: 36,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/thyroid-test-bangalore",
    active: true,
    parameter_count: 3,
    parameters: [
      "Total Triiodothyronine (T3)",
      "Total Thyroxine (T4)",
      "Ultrasensitive Thyroid-Stimulating Hormone (TSH)"
    ]
  },

  // ── 6. THYROID PROFILE FREE (FT3, FT4, TSH) ────────────────────────────────
  {
    test_id: "THYROID002",
    legacy_id: "free-thyroid-profile",
    canonical_name: "Thyroid Profile Free (Free T3, Free T4, Ultrasensitive TSH)",
    short_name: "Thyroid Profile (Free)",
    aliases: ["free thyroid profile", "ft3 ft4 tsh", "free t3 free t4 ultrasensitive tsh"],
    department: "Clinical Biochemistry & Immunology",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: false,
    fasting_instructions: "No fasting required. Morning collection advised. Take thyroid replacement medications after blood collection.",
    collection_timing: "Morning preferred",
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    analyser_platform: "Roche Cobas e411 / Abbott Architect i2000SR",
    tat: "6 Hours (Same Day)",
    price: 750,
    mrp: 1200,
    discount_percentage: 37,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/tests/free-thyroid-profile",
    active: true,
    parameter_count: 3,
    parameters: [
      "Free Triiodothyronine (FT3)",
      "Free Thyroxine (FT4)",
      "Ultrasensitive Thyroid-Stimulating Hormone (TSH)"
    ]
  },

  // ── 7. LIPID PROFILE COMPREHENSIVE ─────────────────────────────────────────
  {
    test_id: "LIPID001",
    legacy_id: "lipid-profile",
    canonical_name: "Lipid Profile Comprehensive",
    short_name: "Lipid Profile",
    aliases: ["lipid profile", "cholesterol test", "lipid panel", "coronary risk profile", "lipid profile test bangalore"],
    department: "Clinical Biochemistry",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: true,
    fasting_instructions: "10 to 12 hours overnight fasting mandatory. Plain water permitted. Avoid alcohol and fatty dinner on previous evening.",
    collection_timing: "Morning 06:30 AM–10:30 AM",
    methodology: "Enzymatic Colorimetric (CHOD-PAP, GPO-PAP) & Direct Clearance Homogeneous Assay",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "6 Hours (Same Day)",
    price: 336,
    mrp: 600,
    discount_percentage: 44,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/lipid-profile-test-bangalore",
    active: true,
    parameter_count: 8,
    parameters: [
      "Total Cholesterol",
      "Triglycerides",
      "HDL Cholesterol (Good Cholesterol)",
      "LDL Cholesterol (Bad Cholesterol - Direct)",
      "VLDL Cholesterol",
      "Total Cholesterol / HDL Ratio",
      "LDL / HDL Ratio",
      "Non-HDL Cholesterol"
    ]
  },

  // ── 8. LIVER FUNCTION TEST (LFT) ───────────────────────────────────────────
  {
    test_id: "LFT001",
    legacy_id: "lft",
    canonical_name: "Liver Function Test (LFT)",
    short_name: "Liver Function Test",
    aliases: ["lft", "liver function test panel", "hepatic panel", "liver function test bangalore"],
    department: "Clinical Biochemistry",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: true,
    fasting_instructions: "8 to 10 hours overnight fasting recommended. Plain water permitted.",
    collection_timing: "Morning preferred",
    methodology: "Spectrophotometric / IFCC Standardized Enzymatic Rate Method",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "6 Hours (Same Day)",
    price: 425,
    mrp: 780,
    discount_percentage: 45,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Naveen Kumar N",
      qualification: "MD Biochemistry",
      profile_url: "/dr-naveen-kumar-n"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/liver-function-test-bangalore",
    active: true,
    parameter_count: 11,
    parameters: [
      "Total Bilirubin",
      "Direct Bilirubin (Conjugated)",
      "Indirect Bilirubin (Unconjugated)",
      "Aspartate Aminotransferase (AST / SGOT)",
      "Alanine Aminotransferase (ALT / SGPT)",
      "SGOT / SGPT Ratio",
      "Alkaline Phosphatase (ALP)",
      "Gamma-Glutamyl Transferase (GGT)",
      "Total Serum Protein",
      "Serum Albumin",
      "Albumin / Globulin (A/G) Ratio"
    ]
  },

  // ── 9. KIDNEY FUNCTION TEST (KFT / RFT) ───────────────────────────────────
  {
    test_id: "KFT001",
    legacy_id: "kft",
    canonical_name: "Kidney Function Test (KFT / RFT) with Electrolytes",
    short_name: "Kidney Function Test",
    aliases: ["kft", "rft", "kidney function test panel", "renal function test", "kidney function test bangalore"],
    department: "Clinical Biochemistry",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: false,
    fasting_instructions: "Not strictly required. Maintain normal hydration; drink adequate plain water before draw.",
    collection_timing: "Any time of day",
    methodology: "Enzymatic Urease, Jaffe Rate-Blanked Kinetic & Ion-Selective Electrode (ISE)",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "6 Hours (Same Day)",
    price: 425,
    mrp: 1150,
    discount_percentage: 63,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/kidney-function-test-bangalore",
    active: true,
    parameter_count: 10,
    parameters: [
      "Blood Urea Nitrogen (BUN)",
      "Serum Urea",
      "Serum Creatinine",
      "Uric Acid",
      "BUN / Creatinine Ratio",
      "Estimated Glomerular Filtration Rate (eGFR - CKD-EPI)",
      "Serum Calcium",
      "Serum Sodium (Na+)",
      "Serum Potassium (K+)",
      "Serum Chloride (Cl-)"
    ]
  },

  // ── 10. IRON PROFILE (SERUM IRON, TIBC, UIBC, % SATURATION) ────────────────
  {
    test_id: "IRON001",
    legacy_id: "iron-profile",
    canonical_name: "Iron Profile (Serum Iron, TIBC, UIBC, % Transferrin Saturation)",
    short_name: "Iron Profile",
    aliases: ["iron profile", "fe tibc", "iron studies", "iron profile test bangalore"],
    department: "Clinical Biochemistry",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: true,
    fasting_instructions: "10 to 12 hours overnight fasting mandatory. Morning sample required due to diurnal iron variation. Avoid iron supplements for 24 hours prior.",
    collection_timing: "Morning 06:30 AM–10:30 AM",
    methodology: "Ferrozine Photometric Assay with Direct TIBC Measurement",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "6 Hours (Same Day)",
    price: 380,
    mrp: 520,
    discount_percentage: 27,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/iron-profile-test-bangalore",
    active: true,
    parameter_count: 4,
    parameters: [
      "Serum Iron",
      "Total Iron Binding Capacity (TIBC)",
      "Unsaturated Iron Binding Capacity (UIBC)",
      "Transferrin Saturation (%)"
    ]
  },

  // ── 11. VITAMIN D (25-HYDROXY) ─────────────────────────────────────────────
  {
    test_id: "VITD001",
    legacy_id: "vitamin-d",
    canonical_name: "Vitamin D 25-Hydroxy (25-OH Total)",
    short_name: "Vitamin D (25-OH)",
    aliases: ["vitamin d", "25-oh vitamin d", "calcidiol", "vitamin d test bangalore"],
    department: "Clinical Biochemistry & Immunology",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: false,
    fasting_instructions: "No fasting required. Maintain normal diet and hydration.",
    collection_timing: "Any time of day",
    methodology: "Direct Competitive Chemiluminescent Immunoassay (CLIA)",
    analyser_platform: "Abbott Architect i2000SR / Roche Cobas e411",
    tat: "6–8 Hours (Same Day)",
    price: 410,
    mrp: 1300,
    discount_percentage: 68,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Naveen Kumar N",
      qualification: "MD Biochemistry",
      profile_url: "/dr-naveen-kumar-n"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/vitamin-d-test-bangalore",
    active: true,
    parameter_count: 1,
    parameters: ["25-Hydroxy Vitamin D Total (D2 + D3)"]
  },

  // ── 12. VITAMIN B12 (CYANOCOBALAMIN) ───────────────────────────────────────
  {
    test_id: "VITB12001",
    legacy_id: "vitamin-b12",
    canonical_name: "Vitamin B12 (Cyanocobalamin)",
    short_name: "Vitamin B12",
    aliases: ["vitamin b12", "cyanocobalamin", "serum b12", "cobalamin", "vitamin b12 test bangalore"],
    department: "Clinical Biochemistry & Immunology",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "3.0 mL",
    fasting: false,
    fasting_instructions: "No fasting strictly required; overnight fasting of 8 hours preferred. Avoid high-dose B-complex vitamins 24h prior.",
    collection_timing: "Morning preferred",
    methodology: "Chemiluminescent Microparticle Immunoassay (CMIA / CLIA)",
    analyser_platform: "Abbott Architect i2000SR / Roche Cobas e411",
    tat: "6–8 Hours (Same Day)",
    price: 600,
    mrp: 1600,
    discount_percentage: 62,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/vitamin-b12-test-bangalore",
    active: true,
    parameter_count: 1,
    parameters: ["Vitamin B12 Level (pg/mL)"]
  },

  // ── 13. APOLIPOPROTEIN B (APOB) ───────────────────────────────────────────
  {
    test_id: "APOB001",
    legacy_id: "apob",
    canonical_name: "Apolipoprotein B (ApoB)",
    short_name: "ApoB",
    aliases: ["apob", "apolipoprotein b", "apob test", "atherogenic particle count"],
    department: "Clinical Biochemistry",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "2.0 mL",
    fasting: false,
    fasting_instructions: "No fasting required. Serum ApoB particle count is unaffected by acute meals.",
    collection_timing: "Any time of day",
    methodology: "Automated WHO-IFCC Standardized Immunoturbidimetric Assay",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "12 Hours (Same Day)",
    price: 550,
    mrp: 665,
    discount_percentage: 17,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/apob-test",
    active: true,
    parameter_count: 1,
    parameters: ["Serum Apolipoprotein B (mg/dL)"]
  },

  // ── 14. HIGH-SENSITIVITY C-REACTIVE PROTEIN (HS-CRP) ──────────────────────
  {
    test_id: "HSCRP001",
    legacy_id: "hscrp",
    canonical_name: "High-Sensitivity C-Reactive Protein (hs-CRP)",
    short_name: "hs-CRP",
    aliases: ["hscrp", "hs-crp", "cardiac crp", "high sensitivity crp"],
    department: "Clinical Biochemistry & Immunology",
    specimen: "Blood (Serum)",
    container: "Gold/Yellow Top (SST with Clot Activator & Gel)",
    minimum_volume: "2.0 mL",
    fasting: false,
    fasting_instructions: "No fasting required. Defer testing during acute viral/bacterial infections or severe trauma.",
    collection_timing: "Any time of day",
    methodology: "Particle-Enhanced Immunoturbidimetric Assay",
    analyser_platform: "Roche Cobas Pro / Beckman Coulter DxC 700 AU",
    tat: "6 Hours (Same Day)",
    price: 450,
    mrp: 750,
    discount_percentage: 40,
    home_collection_eligible: true,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-10-15",
    canonical_url: "https://qxldiagnostics.com/tests/hs-crp-test",
    active: true,
    parameter_count: 1,
    parameters: ["High-Sensitivity CRP (mg/L)"]
  },

  // ── 15. HIGH-SENSITIVITY CARDIAC TROPONIN ──────────────────────────────────
  {
    test_id: "TROPONIN001",
    legacy_id: "hs-troponin",
    canonical_name: "High-Sensitivity Cardiac Troponin (hs-cTnI / hs-cTnT)",
    short_name: "hs-Troponin",
    aliases: ["cardiac troponin", "troponin i", "troponin t", "hs troponin", "troponin test"],
    department: "Clinical Biochemistry & Emergency Biomarkers",
    specimen: "Blood (Serum / Heparin Plasma)",
    container: "Gold/Yellow Top (SST) or Green Top (Heparin)",
    minimum_volume: "3.0 mL",
    fasting: false,
    fasting_instructions: "Emergency Notice: In acute chest pain or suspected acute coronary syndrome, seek immediate hospital emergency care (call 112). Outpatient home blood collection is not an alternative to emergency hospital assessment.",
    collection_timing: "Clinical stat testing / serial monitoring",
    methodology: "Chemiluminescent Microparticle Immunoassay (CMIA / ECLIA)",
    analyser_platform: "Roche Cobas e411 / Abbott Architect i2000SR",
    tat: "2–4 Hours (Stat Protocol)",
    price: 1160,
    mrp: 1550,
    discount_percentage: 25,
    home_collection_eligible: false,
    nabl_scope_status: "verified-in-scope",
    medical_reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profile_url: "/dr-shantakumar-muruda"
    },
    review_date: "2026-11-01",
    canonical_url: "https://qxldiagnostics.com/high-sensitivity-cardiac-troponin",
    active: true,
    parameter_count: 1,
    parameters: ["High-Sensitivity Cardiac Troponin (ng/L)"]
  }
];

// Lookup indexes
export const testsByCanonicalId: Record<string, CanonicalTestMasterEntry> = Object.fromEntries(
  TEST_MASTER.map((t) => [t.test_id, t])
);

export const testsByLegacyId: Record<string, CanonicalTestMasterEntry> = Object.fromEntries(
  TEST_MASTER.filter((t) => t.legacy_id).map((t) => [t.legacy_id!, t])
);

export function getCanonicalTest(idOrAlias: string): CanonicalTestMasterEntry | undefined {
  const clean = idOrAlias.trim().toLowerCase();
  return (
    testsByCanonicalId[idOrAlias.toUpperCase()] ||
    testsByLegacyId[clean] ||
    TEST_MASTER.find(
      (t) =>
        t.canonical_name.toLowerCase() === clean ||
        t.short_name.toLowerCase() === clean ||
        t.aliases.some((a) => a.toLowerCase() === clean)
    )
  );
}

// Backward compatibility types and exports for existing consumers
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
    id: "HBA1C001",
    slug: "/hba1c-test-bangalore",
    name: "Haemoglobin A1c (HbA1c)",
    aliases: ["Glycated Haemoglobin", "Glycosylated Haemoglobin", "A1c"],
    price: 380,
    mrp: 720,
    specimen: "EDTA Whole Blood",
    fasting: "No fasting required",
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
    id: "CBC001",
    slug: "/cbc-test-bangalore",
    name: "Complete Blood Count (CBC)",
    aliases: ["Hemogram", "Complete Hemogram", "Full Blood Count"],
    price: 250,
    mrp: 350,
    specimen: "EDTA Whole Blood",
    fasting: "No fasting required",
    tat: "6 hours",
    methodology: "Automated 6-Part Flow Cytometry with Peripheral Smear Review",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Pritilata Rout",
      qualification: "MD Pathology",
      profileUrl: "/dr-pritilata-rout",
    },
  },
  THYROID: {
    id: "THYROID001",
    slug: "/thyroid-test-bangalore",
    name: "Thyroid Profile Total (T3, T4, TSH)",
    aliases: ["Thyroid Function Test", "TFT", "Thyroid Panel"],
    price: 350,
    mrp: 550,
    specimen: "Blood (Serum)",
    fasting: "Morning collection advised; take thyroid medication after draw",
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
  LIPID_PROFILE: {
    id: "LIPID001",
    slug: "/lipid-profile-test-bangalore",
    name: "Lipid Profile Comprehensive",
    aliases: ["Cholesterol Panel", "Lipid Panel", "Coronary Risk Profile"],
    price: 336,
    mrp: 600,
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
    id: "LFT001",
    slug: "/liver-function-test-bangalore",
    name: "Liver Function Test (LFT)",
    aliases: ["Hepatic Function Panel", "Liver Panel"],
    price: 425,
    mrp: 780,
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
    id: "KFT001",
    slug: "/kidney-function-test-bangalore",
    name: "Kidney Function Test (KFT / RFT)",
    aliases: ["Renal Function Panel", "Renal Profile"],
    price: 425,
    mrp: 1150,
    specimen: "Blood (Serum)",
    fasting: "Not strictly required (maintain normal hydration)",
    tat: "6 hours",
    methodology: "Jaffe Rate Blanked / Enzymatic Urease & ISE",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  },
  IRON_PROFILE: {
    id: "IRON001",
    slug: "/iron-profile-test-bangalore",
    name: "Iron Profile",
    aliases: ["Iron Studies", "Fe TIBC", "Transferrin Saturation"],
    price: 380,
    mrp: 520,
    specimen: "Blood (Serum)",
    fasting: "10-12 hours overnight fasting mandatory",
    tat: "6 hours",
    methodology: "Ferrozine Photometric Assay with Direct TIBC",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  },
  FBS: {
    id: "FBS001",
    slug: "/fasting-plasma-glucose",
    name: "Fasting Plasma Glucose (Fasting Blood Sugar)",
    aliases: ["FBS", "Fasting Glucose", "Fasting Sugar"],
    price: 35,
    mrp: 70,
    specimen: "Fluoride Plasma",
    fasting: "8 to 10 hours overnight fasting required. Plain water permitted.",
    tat: "4 hours",
    methodology: "Hexokinase / GOD-PAP Photometric",
    homeCollection: true,
    accreditationScope: "verified-in-scope",
    reviewer: {
      name: "Dr. Shantakumar Muruda",
      qualification: "MD Biochemistry",
      profileUrl: "/dr-shantakumar-muruda",
    },
  }
};

/**
 * Audit-enforced prohibited marketing claims.
 */
export const PROHIBITED_MARKETING_CLAIMS = [
  /MC-10025/i,
  /100% precision/i,
  /100% pathologist authori[sz]ation/i,
  /every single report.*pathologist/i,
  /multi-level MD doctor verification/i,
  /NABL Certified/i,
  /certified phlebotomist/i,
];

export function validateContentClaims(content: string): string[] {
  const violations: string[] = [];
  for (const pattern of PROHIBITED_MARKETING_CLAIMS) {
    if (pattern.test(content)) {
      violations.push(`Prohibited marketing claim detected: ${pattern}`);
    }
  }
  return violations;
}
