import type { DiagnosticTest } from "@/types/catalogue";

export const TESTS: DiagnosticTest[] = [
  // ── CORE HAEMATOLOGY ────────────────────────────────────────────────────────
  {
    id: "cbc",
    slug: "cbc-test-bangalore",
    name: "Complete Blood Count (CBC) with Peripheral Smear",
    shortName: "CBC with Automated Smear",
    aliases: ["cbc", "complete blood count", "hemogram", "full blood count", "cbc test bangalore"],
    category: "Haematology",
    department: "Haematopathology",
    specimenOptions: [
      {
        specimen: "EDTA Whole Blood (2–3 mL)",
        collectionMode: "home_blood",
        note: "Routine venous blood collection in lavender top tube."
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required. Maintain routine hydration.",
    tatMinutesMin: 360,
    tatMinutesMax: 720,
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: [
      "haemoglobin",
      "rbc_count",
      "pcv_hematocrit",
      "mcv",
      "mch",
      "mchc",
      "rdw_cv",
      "rdw_sd",
      "total_leukocyte_count",
      "neutrophils_absolute",
      "lymphocytes_absolute",
      "monocytes_absolute",
      "eosinophils_absolute",
      "basophils_absolute",
      "neutrophils_percent",
      "lymphocytes_percent",
      "monocytes_percent",
      "eosinophils_percent",
      "basophils_percent",
      "platelet_count",
      "mpv",
      "pdw",
      "pct",
      "plcr",
      "immature_granulocytes",
      "peripheral_smear_review"
    ],
    sellingPrice: 250,
    mrp: 350,
    methodology: "Automated 6-part differential impedance & flow cytometry with reflex manual smear examination",
    reviewerId: "dr-naveen-kumar-n",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "esr",
    slug: "erythrocyte-sedimentation-rate",
    name: "Erythrocyte Sedimentation Rate (ESR)",
    shortName: "ESR",
    aliases: ["esr", "erythrocyte sedimentation rate", "sed rate"],
    category: "Haematology",
    department: "Haematology",
    specimenOptions: [
      {
        specimen: "EDTA / Sodium Citrate Blood",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["esr_automated"],
    sellingPrice: 150,
    mrp: 200,
    methodology: "Modified Westergren / Photometric infrared sedimentation",
    reviewerId: "dr-naveen-kumar-n",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── GLYCEMIC & DIABETES ─────────────────────────────────────────────────────
  {
    id: "fbs",
    slug: "fasting-blood-sugar",
    name: "Fasting Blood Sugar (FBS)",
    shortName: "Glucose Fasting",
    aliases: ["fbs", "fasting blood sugar", "glucose fasting", "fbs test"],
    category: "Diabetes",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Sodium Fluoride Plasma (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "required",
    preparationText: "Overnight fasting of 8–10 hours required. Plain water permitted.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["glucose_fasting"],
    sellingPrice: 100,
    mrp: 150,
    methodology: "Hexokinase / GOD-PAP photometric",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "hba1c",
    slug: "hba1c-test-bangalore",
    name: "HbA1c (Glycated Haemoglobin)",
    shortName: "HbA1c",
    aliases: ["hba1c", "glycated hemoglobin", "glycosylated hemoglobin", "a1c"],
    category: "Diabetes",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "EDTA Whole Blood (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["hba1c_level"],
    sellingPrice: 400,
    mrp: 600,
    methodology: "High-Performance Liquid Chromatography (HPLC) — NGSP/IFCC traceable",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "insulin-fasting",
    slug: "fasting-insulin-test",
    name: "Insulin (Fasting)",
    shortName: "Fasting Insulin",
    aliases: ["insulin fasting", "serum insulin", "fasting insulin test"],
    category: "Diabetes",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "required",
    preparationText: "8–10 hours overnight fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["insulin_fasting"],
    sellingPrice: 700,
    mrp: 1100,
    methodology: "Chemiluminescent Microparticle Immunoassay (CMIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "c-peptide",
    slug: "c-peptide-test",
    name: "C-Peptide (Fasting)",
    shortName: "C-Peptide",
    aliases: ["c peptide", "c-peptide fasting", "serum c peptide"],
    category: "Diabetes",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "required",
    preparationText: "8–10 hours fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["c_peptide_level"],
    sellingPrice: 850,
    mrp: 1400,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "urine-microalbumin",
    slug: "urine-microalbumin-test",
    name: "Urine Microalbumin",
    shortName: "Microalbuminuria",
    aliases: ["urine microalbumin", "microalbumin", "urine albumin spot"],
    category: "Diabetes",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Spot Urine (Early Morning / Random)",
        collectionMode: "home_urine"
      }
    ],
    fasting: "not_required",
    preparationText: "First morning midstream clean catch sample preferred.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["urine_microalbumin"],
    sellingPrice: 450,
    mrp: 750,
    methodology: "Immunoturbidimetry",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "urine-protein-creatinine-ratio",
    slug: "urine-protein-creatinine-ratio",
    name: "Urine Protein to Creatinine Ratio (UPCR)",
    shortName: "UPCR",
    aliases: ["upcr", "urine protein creatinine ratio", "spot upcr"],
    category: "Renal",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Spot Clean Catch Urine",
        collectionMode: "home_urine"
      }
    ],
    fasting: "not_required",
    preparationText: "Clean-catch midstream urine sample.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["upcr_ratio"],
    sellingPrice: 500,
    mrp: 850,
    methodology: "Photometric pyrogallol red & enzymatic creatinine",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── LIPID PROFILE ───────────────────────────────────────────────────────────
  {
    id: "lipid-profile",
    slug: "lipid-profile-test-bangalore",
    name: "Lipid Profile Comprehensive",
    shortName: "Lipid Profile",
    aliases: ["lipid profile", "cholesterol test", "lipid panel", "cholesterol panel"],
    category: "Cardiology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "required",
    preparationText: "10–12 hours fasting required. Plain water permitted. Avoid alcohol 24h prior.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: [
      "cholesterol_total",
      "triglycerides",
      "cholesterol_hdl",
      "cholesterol_ldl",
      "cholesterol_vldl"
    ],
    sellingPrice: 450,
    mrp: 750,
    methodology: "Enzymatic colorimetric CHOD-PAP / GPO-PAP direct clearance",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── LIVER FUNCTION TEST (LFT) ───────────────────────────────────────────────
  {
    id: "lft",
    slug: "liver-function-test-bangalore",
    name: "Liver Function Test (LFT)",
    shortName: "LFT",
    aliases: ["lft", "liver function test", "hepatic function panel", "liver panel"],
    category: "Gastroenterology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting strictly required; 4-hour fasting preferred for lipid clarity.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: [
      "bilirubin_total",
      "bilirubin_direct",
      "bilirubin_indirect",
      "sgot_ast",
      "sgpt_alt",
      "alkaline_phosphatase",
      "total_protein",
      "albumin",
      "globulin",
      "ag_ratio",
      "gamma_gt"
    ],
    sellingPrice: 500,
    mrp: 850,
    methodology: "Photometric IFCC with pyridoxal phosphate / Biuret / Bromocresol green",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── KIDNEY FUNCTION TEST (KFT) ─────────────────────────────────────────────
  {
    id: "kft",
    slug: "kidney-function-test-bangalore",
    name: "Kidney Function Test (KFT / RFT) with Electrolytes",
    shortName: "KFT with Electrolytes",
    aliases: ["kft", "renal function test", "rft", "kidney panel", "kidney profile"],
    category: "Nephrology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required. Maintain normal water intake.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: [
      "serum_urea",
      "blood_urea_nitrogen",
      "serum_creatinine",
      "uric_acid",
      "calcium_total",
      "phosphorus_inorganic",
      "sodium",
      "potassium",
      "chloride",
      "bun_creatinine_ratio"
    ],
    sellingPrice: 550,
    mrp: 900,
    methodology: "Enzymatic IDMS-traceable creatinine / Urease-GLDH / Ion-Selective Electrode (ISE)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── THYROID & VITAMINS ──────────────────────────────────────────────────────
  {
    id: "tsh",
    slug: "tsh",
    name: "Thyroid Stimulating Hormone (Ultrasensitive TSH)",
    shortName: "Ultrasensitive TSH",
    aliases: ["tsh", "thyroid stimulating hormone", "tsh ultrasensitive"],
    category: "Endocrinology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "Morning sample preferred before taking thyroid hormone replacement.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["tsh_level"],
    sellingPrice: 200,
    mrp: 350,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "thyroid-profile",
    slug: "thyroid-profile",
    name: "Thyroid Profile Total (T3, T4, TSH)",
    shortName: "Thyroid Profile (T3, T4, TSH)",
    aliases: ["thyroid profile", "thyroid panel", "t3 t4 tsh"],
    category: "Endocrinology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "Morning collection recommended. Take morning thyroid medication after draw.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["total_t3", "total_t4", "tsh_level"],
    sellingPrice: 400,
    mrp: 650,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "vitamin-d",
    slug: "vitamin-d-test-bangalore",
    name: "Vitamin D 25-Hydroxy (25-OH Total)",
    shortName: "Vitamin D (25-OH)",
    aliases: ["vitamin d", "vit d", "25 hydroxy vitamin d", "vitamin d3"],
    category: "Nutritional",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["vitamin_d_25_oh"],
    sellingPrice: 800,
    mrp: 1400,
    methodology: "Chemiluminescence Immunoassay (CLIA) — NIST traceable",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "vitamin-b12",
    slug: "vitamin-b12-test-bangalore",
    name: "Vitamin B12 (Cyanocobalamin)",
    shortName: "Vitamin B12",
    aliases: ["vitamin b12", "vit b12", "cobalamin"],
    category: "Nutritional",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required. Avoid high-dose vitamin supplements 24h prior.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["vitamin_b12_level"],
    sellingPrice: 600,
    mrp: 1100,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── URINE ROUTINE & MICROSCOPY ──────────────────────────────────────────────
  {
    id: "urine-routine",
    slug: "urine-test-bangalore",
    name: "Urine Routine Examination & Microscopy (CUE)",
    shortName: "Urine Routine (CUE)",
    aliases: ["urine routine", "urine test", "urinalysis", "urine routine and microscopy", "cue"],
    category: "Clinical Pathology",
    department: "Clinical Pathology",
    specimenOptions: [
      {
        specimen: "Midstream Clean Catch Urine (15–30 mL)",
        collectionMode: "home_urine",
        note: "Collect first-morning midstream urine in sterile container."
      }
    ],
    fasting: "not_required",
    preparationText: "Clean-catch midstream urine sample in sterile container provided by phlebotomist.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: [
      "urine_color",
      "urine_appearance",
      "urine_ph",
      "urine_specific_gravity",
      "urine_protein",
      "urine_glucose",
      "urine_ketone",
      "urine_bilirubin",
      "urine_urobilinogen",
      "urine_nitrite",
      "urine_wbc_pus_cells",
      "urine_rbc",
      "urine_epithelial_cells",
      "urine_casts",
      "urine_crystals",
      "urine_bacteria",
      "urine_yeast",
      "urine_mucus",
      "urine_amorphous_deposits",
      "urine_leukocyte_esterase"
    ],
    sellingPrice: 150,
    mrp: 220,
    methodology: "Reflectance photometry dry chemistry strip with high-power brightfield microscopy",
    reviewerId: "dr-naveen-kumar-n",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── ADVANCED CARDIAC & SPECIAL BIOCHEMICAL MARKERS ─────────────────────────
  {
    id: "apob",
    slug: "apob-test",
    name: "Apolipoprotein B (Apo-B)",
    shortName: "Apo B",
    aliases: ["apob", "apo-b", "apolipoprotein b"],
    category: "Cardiology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "required",
    preparationText: "10–12 hours fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["apolipoprotein_b"],
    sellingPrice: 650,
    mrp: 1100,
    methodology: "Immunoturbidimetric assay",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "apoa1",
    slug: "apoa1-test",
    name: "Apolipoprotein A-1 (Apo A-1)",
    shortName: "Apo A-1",
    aliases: ["apoa1", "apo a-1", "apolipoprotein a1"],
    category: "Cardiology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "required",
    preparationText: "10–12 hours fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["apolipoprotein_a1"],
    sellingPrice: 650,
    mrp: 1100,
    methodology: "Immunoturbidimetric assay",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "hscrp",
    slug: "hs-crp-test",
    name: "High-Sensitivity C-Reactive Protein (hs-CRP)",
    shortName: "hs-CRP Cardiac",
    aliases: ["hscrp", "hs-crp", "cardiac crp", "high sensitivity crp"],
    category: "Cardiology",
    department: "Clinical Biochemistry",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required. Avoid testing during acute viral/bacterial infections.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["hs_crp_cardiac"],
    sellingPrice: 480,
    mrp: 800,
    methodology: "Particle-enhanced immunoturbidimetry",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "hpylori-igg",
    slug: "h-pylori-igg-test",
    name: "Helicobacter pylori IgG Antibodies (Gastritis Screen)",
    shortName: "H. pylori IgG",
    aliases: ["h pylori", "helicobacter pylori", "h pylori igg", "gastritis test"],
    category: "Gastroenterology",
    department: "Serology & Immunology",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: ["h_pylori_igg_antibody"],
    sellingPrice: 950,
    mrp: 1500,
    methodology: "Enzyme-Linked Immunosorbent Assay (ELISA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── AUTOIMMUNE & RHEUMATOLOGY ──────────────────────────────────────────────
  {
    id: "rf-quantitative",
    slug: "rheumatoid-factor-rf-quantitative-test",
    name: "Rheumatoid Factor (RF Quantitative)",
    shortName: "RF Quantitative",
    aliases: ["rf quantitative", "rheumatoid factor", "ra factor"],
    category: "Immunology",
    department: "Clinical Immunology",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["rheumatoid_factor_quantitative"],
    sellingPrice: 450,
    mrp: 700,
    methodology: "Nephelometry / Immunoturbidimetry",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "anti-ccp",
    slug: "anti-cyclic-citrullinated-peptide-anti-ccp-test",
    name: "Anti-Cyclic Citrullinated Peptide (Anti-CCP)",
    shortName: "Anti-CCP",
    aliases: ["anti-ccp", "anti ccp", "cyclic citrullinated peptide"],
    category: "Immunology",
    department: "Clinical Immunology",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: ["anti_ccp_igg"],
    sellingPrice: 1450,
    mrp: 2200,
    methodology: "Chemiluminescent Microparticle Immunoassay (CMIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "ana-screen",
    slug: "antinuclear-antibodies-ana-test",
    name: "Antinuclear Antibodies (ANA IFA / Screen)",
    shortName: "ANA Screen",
    aliases: ["ana", "antinuclear antibodies", "ana ifa", "ana screen"],
    category: "Immunology",
    department: "Clinical Immunology",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood"
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: ["ana_ifa_screen"],
    sellingPrice: 850,
    mrp: 1400,
    methodology: "Indirect Immunofluorescence Assay (IFA) on HEp-2 cells",
    reviewerId: "dr-naveen-kumar-n",
    reviewedDate: "2026-10-15",
    active: true
  },

  // ── SPECIALISED PROCEDURAL TESTS (SPECIMEN-SPECIFIC COLLECTION LOGIC) ──────
  {
    id: "aqp4-antibody",
    slug: "aquaporin-4-igg-antibody",
    name: "Aquaporin-4 IgG Antibody (AQP4 / NMO)",
    shortName: "AQP4 NMO Antibody",
    aliases: ["aquaporin-4 igg antibody", "aqp4", "nmo antibody", "devic disease marker"],
    category: "Neurology",
    department: "Neuroimmunology",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood",
        note: "Home venous blood draw may be scheduled across Bengaluru."
      },
      {
        specimen: "Cerebrospinal Fluid (CSF 1–2 mL)",
        collectionMode: "hospital_procedure",
        note: "CSF collection requires a lumbar puncture performed under clinical supervision by a neurologist/hospital specialist."
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required. Lumbar puncture for CSF must be performed in a clinical setting.",
    tatDisplay: "48 Hours",
    parameterIds: ["aqp4_igg_titer"],
    sellingPrice: 3600,
    mrp: 4935,
    methodology: "Cell-Based Assay (CBA) / Indirect Immunofluorescence (IFA)",
    reviewerId: "dr-pritilata-rout",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "nmdar-antibody",
    slug: "n-methyl-d-aspartate-receptor-antibody",
    name: "N-Methyl-D-Aspartate Receptor (NMDA-R) Antibody",
    shortName: "NMDA Receptor Ab",
    aliases: ["n-methyl-d-aspartate receptor antibody", "nmdar antibody", "anti nmda", "anti-nmdar encephalitis"],
    category: "Neurology",
    department: "Neuroimmunology",
    specimenOptions: [
      {
        specimen: "Serum (2 mL)",
        collectionMode: "home_blood",
        note: "Serum can be collected at home or walk-in centre."
      },
      {
        specimen: "Cerebrospinal Fluid (CSF 1–2 mL)",
        collectionMode: "hospital_procedure",
        note: "CSF is the clinically preferred specimen for NMDA-R encephalitis and requires clinical lumbar puncture."
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required. Lumbar puncture performed by specialist.",
    tatDisplay: "48 Hours",
    parameterIds: ["nmdar_antibody_titer"],
    sellingPrice: 5600,
    mrp: 8360,
    methodology: "Transfected Cell-Based Assay (CBA)",
    reviewerId: "dr-pritilata-rout",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "paraneoplastic-panel",
    slug: "paraneoplastic-neurologic-antibody-panel",
    name: "Paraneoplastic Neurologic Antibody Panel (8 Markers)",
    shortName: "Paraneoplastic Panel",
    aliases: ["paraneoplastic neurologic antibody panel", "paraneoplastic panel", "anti-hu", "anti-yo", "anti-ri"],
    category: "Neurology",
    department: "Neuroimmunology",
    specimenOptions: [
      {
        specimen: "Serum (3 mL)",
        collectionMode: "home_blood",
        note: "Serum collection available at home."
      },
      {
        specimen: "CSF (2 mL)",
        collectionMode: "hospital_procedure",
        note: "CSF collection requires lumbar puncture procedure in clinical environment."
      }
    ],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "3–5 Days",
    parameterIds: [
      "anti_hu_antibody",
      "anti_yo_antibody",
      "anti_ri_antibody",
      "anti_amphiphysin",
      "anti_cv2_cramp",
      "anti_pnma2_ta",
      "anti_sox1",
      "anti_titin"
    ],
    sellingPrice: 7600,
    mrp: 8500,
    methodology: "Line Blot / Immunoblot & IFA",
    reviewerId: "dr-pritilata-rout",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "autoimmune-encephalitis",
    slug: "autoimmune-encephalitis-antibody-panel",
    name: "Autoimmune Encephalitis Panel (Paired CSF & Serum)",
    shortName: "Encephalitis Panel Paired",
    aliases: ["autoimmune encephalitis antibody panel", "encephalitis panel", "paired encephalitis screen"],
    category: "Neurology",
    department: "Neuroimmunology",
    specimenOptions: [
      {
        specimen: "Paired CSF (2 mL) and Serum (3 mL)",
        collectionMode: "hospital_procedure",
        note: "Requires simultaneous procedural CSF lumbar puncture and venous blood draw under hospital/neurology care."
      }
    ],
    fasting: "not_required",
    preparationText: "Specialist specimen collection required. Lumbar puncture must be performed by a clinical neurologist.",
    tatDisplay: "3–5 Days",
    parameterIds: [
      "nmdar_paired",
      "lgi1_paired",
      "caspr2_paired",
      "ampar1_paired",
      "ampar2_paired",
      "gabab_paired"
    ],
    sellingPrice: 13860,
    mrp: 24500,
    methodology: "Multiplex Cell-Based Indirect Immunofluorescence",
    reviewerId: "dr-pritilata-rout",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "oligoclonal-bands",
    slug: "oligoclonal-bands-paired-csf-and-serum",
    name: "Oligoclonal Bands (OCB) — Paired CSF & Serum",
    shortName: "OCB Paired CSF/Serum",
    aliases: ["oligoclonal bands", "ocb", "paired csf and serum ocb", "multiple sclerosis bands"],
    category: "Neurology",
    department: "Neuroimmunology",
    specimenOptions: [
      {
        specimen: "Paired CSF (1.5 mL) and Serum (2 mL)",
        collectionMode: "hospital_procedure",
        note: "Must be collected concurrently; CSF requires sterile clinical lumbar puncture."
      }
    ],
    fasting: "not_required",
    preparationText: "Specialist hospital collection required. Contact QXL logistics prior to procedure for specimen transport medium.",
    tatDisplay: "48 Hours",
    parameterIds: ["ocb_csf_bands", "ocb_serum_comparison"],
    sellingPrice: 5390,
    mrp: 6800,
    methodology: "Isoelectric Focusing (IEF) on agarose gel followed by immunofixation",
    reviewerId: "dr-pritilata-rout",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "flow-cytometry",
    slug: "flow-cytometry-immunophenotyping",
    name: "Flow Cytometry Immunophenotyping for Haematologic Malignancy",
    shortName: "Leukemia/Lymphoma Flow Cytometry",
    aliases: ["flow cytometry immunophenotyping", "flow cytometry", "leukemia flow cytometry", "bone marrow flow"],
    category: "Haematology",
    department: "Haematopathology",
    specimenOptions: [
      {
        specimen: "EDTA Peripheral Blood (Fresh, <24h)",
        collectionMode: "home_blood",
        note: "Peripheral blood collection available at home for circulating blast/lymphocytosis evaluation."
      },
      {
        specimen: "Bone Marrow Aspirate in Sodium Heparin / EDTA",
        collectionMode: "hospital_procedure",
        note: "Bone marrow aspiration requires specialist procedure by a haematologist or oncologist in a hospital setting."
      }
    ],
    fasting: "not_required",
    preparationText: "Fresh specimen required (<24h viability). For bone marrow aspirate, coordinate transport medium with QXL reference lab.",
    tatDisplay: "24–48 Hours",
    parameterIds: [
      "cd45_blast_gating",
      "cd34_stem_marker",
      "cd117_myeloid_marker",
      "hla_dr_marker",
      "cd19_b_cell",
      "cd20_b_cell",
      "cd10_common_all",
      "cd3_t_cell",
      "cd5_t_cell",
      "cd7_t_cell",
      "cd13_myeloid",
      "cd33_myeloid",
      "mpo_myeloperoxidase",
      "kappa_light_chain",
      "lambda_light_chain",
      "flow_cytometry_interpretation"
    ],
    sellingPrice: 6900,
    mrp: 10200,
    methodology: "Multi-Color Laser Flow Cytometry (10-color panel) with expert haematopathologist gating",
    reviewerId: "dr-naveen-kumar-n",
    reviewedDate: "2026-10-15",
    active: true
  },
  // ── ONCOLOGY & CARDIAC EXTENSIONS ──────────────────────────────────────────
  {
    id: "kft-mini",
    slug: "kidney-function-test-mini",
    name: "Kidney Renal Baseline Screen",
    shortName: "Renal Baseline",
    aliases: ["kft mini", "renal baseline", "creatinine urea bun"],
    category: "Nephrology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["serum_urea", "blood_urea_nitrogen", "serum_creatinine"],
    sellingPrice: 350,
    mrp: 550,
    methodology: "Enzymatic IDMS / Urease",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "afp-biomarker",
    slug: "alpha-fetoprotein-afp-test",
    name: "Alpha-Fetoprotein (AFP)",
    shortName: "AFP",
    aliases: ["afp", "alpha fetoprotein", "liver tumour marker"],
    category: "Oncology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: ["alpha_fetoprotein"],
    sellingPrice: 750,
    mrp: 1200,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "cea-biomarker",
    slug: "carcinoembryonic-antigen-cea-test",
    name: "Carcinoembryonic Antigen (CEA)",
    shortName: "CEA",
    aliases: ["cea", "carcinoembryonic antigen"],
    category: "Oncology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: ["carcinoembryonic_antigen"],
    sellingPrice: 750,
    mrp: 1200,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "psa-total",
    slug: "prostate-specific-antigen-psa-test",
    name: "Prostate-Specific Antigen (PSA Total)",
    shortName: "PSA Total",
    aliases: ["psa", "psa total", "prostate specific antigen"],
    category: "Oncology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "Avoid vigorous bicycle exercise or digital rectal exam 48h prior.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["psa_total"],
    sellingPrice: 700,
    mrp: 1100,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "ca125-biomarker",
    slug: "cancer-antigen-125-ca-125-test",
    name: "Cancer Antigen 125 (CA-125)",
    shortName: "CA-125",
    aliases: ["ca125", "ca-125", "ovarian tumour marker"],
    category: "Oncology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required. Avoid collection during active menstruation if possible.",
    tatDisplay: "24 Hours",
    parameterIds: ["ca125_ovarian"],
    sellingPrice: 950,
    mrp: 1500,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "ca199-biomarker",
    slug: "carbohydrate-antigen-19-9-ca-19-9-test",
    name: "Carbohydrate Antigen 19-9 (CA 19-9)",
    shortName: "CA 19-9",
    aliases: ["ca199", "ca 19-9", "gi tumour marker"],
    category: "Oncology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: ["ca199_pancreatic"],
    sellingPrice: 1100,
    mrp: 1800,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "beta-hcg",
    slug: "beta-hcg-test",
    name: "Beta Human Chorionic Gonadotropin (Beta-hCG)",
    shortName: "Beta hCG",
    aliases: ["beta hcg", "bhcg", "human chorionic gonadotropin"],
    category: "Oncology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "6–12 Hours (Same Day)",
    parameterIds: ["beta_hcg_quantitative"],
    sellingPrice: 550,
    mrp: 900,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "calprotectin-stool",
    slug: "fecal-calprotectin-test",
    name: "Fecal Calprotectin",
    shortName: "Calprotectin",
    aliases: ["fecal calprotectin", "calprotectin stool", "ibd test"],
    category: "Gastroenterology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Spot Stool Sample (Clean Sterile Cup)", collectionMode: "submitted_specimen" }],
    fasting: "not_required",
    preparationText: "Collect random stool sample in clean container provided.",
    tatDisplay: "24–48 Hours",
    parameterIds: ["fecal_calprotectin"],
    sellingPrice: 2400,
    mrp: 3500,
    methodology: "Quantitative Enzyme Immunoassay (ELISA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "fobt-stool",
    slug: "fecal-occult-blood-test",
    name: "Fecal Occult Blood Test (FOBT)",
    shortName: "FOBT",
    aliases: ["fobt", "fecal occult blood", "stool occult blood"],
    category: "Gastroenterology",
    department: "Clinical Pathology",
    specimenOptions: [{ specimen: "Spot Stool Sample", collectionMode: "submitted_specimen" }],
    fasting: "not_required",
    preparationText: "Avoid red meat, turnips, and nonsteroidal anti-inflammatory drugs 48h prior.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["fecal_occult_blood"],
    sellingPrice: 300,
    mrp: 450,
    methodology: "Immunochemical Faecal Occult Blood Test (iFOBT / FIT)",
    reviewerId: "dr-naveen-kumar-n",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "spep-protein",
    slug: "serum-protein-electrophoresis",
    name: "Serum Protein Electrophoresis (SPEP) with M-Band Analysis",
    shortName: "SPEP M-Band Analysis",
    aliases: ["spep", "serum protein electrophoresis", "myeloma electrophoresis"],
    category: "Oncology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: [
      "total_serum_protein",
      "albumin_fraction",
      "alpha1_globulin",
      "alpha2_globulin",
      "beta_globulin",
      "gamma_globulin",
      "m_band_detection"
    ],
    sellingPrice: 850,
    mrp: 1400,
    methodology: "Capillary Electrophoresis with high-resolution scanning densitometry",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "homocysteine-test",
    slug: "homocysteine-test",
    name: "Homocysteine (Plasma)",
    shortName: "Homocysteine",
    aliases: ["homocysteine", "plasma homocysteine"],
    category: "Cardiology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "EDTA Plasma on Ice (<1h separation)", collectionMode: "home_blood" }],
    fasting: "required",
    preparationText: "10–12 hours fasting required. Immediate cold-chain transit mandatory.",
    tatDisplay: "24 Hours",
    parameterIds: ["homocysteine_level"],
    sellingPrice: 850,
    mrp: 1500,
    methodology: "Chemiluminescent Immunoassay (CLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "lipoprotein-a",
    slug: "lipoprotein-a-lp-a-test",
    name: "Lipoprotein(a) [Lp(a)]",
    shortName: "Lipoprotein(a)",
    aliases: ["lipoprotein a", "lp(a)", "lpa"],
    category: "Cardiology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "required",
    preparationText: "10–12 hours fasting required.",
    tatDisplay: "24 Hours",
    parameterIds: ["lipoprotein_a"],
    sellingPrice: 900,
    mrp: 1600,
    methodology: "Particle-enhanced immunoturbidimetry (isoform-independent)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "nt-probnp",
    slug: "nt-probnp-test",
    name: "NT-proBNP (N-Terminal pro-B-type Natriuretic Peptide)",
    shortName: "NT-proBNP",
    aliases: ["nt-probnp", "bnp", "heart failure marker"],
    category: "Cardiology",
    department: "Clinical Biochemistry",
    specimenOptions: [{ specimen: "EDTA Plasma / Serum (2 mL)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["nt_probnp_cardiac"],
    sellingPrice: 2200,
    mrp: 3500,
    methodology: "Electrochemiluminescence Immunoassay (ECLIA)",
    reviewerId: "dr-shantakumar-muruda",
    reviewedDate: "2026-10-15",
    active: true
  },
  {
    id: "fibrinogen-plasma",
    slug: "fibrinogen-test",
    name: "Fibrinogen Activity (Clauss)",
    shortName: "Fibrinogen",
    aliases: ["fibrinogen", "factor i"],
    category: "Haematology",
    department: "Haematopathology",
    specimenOptions: [{ specimen: "Sodium Citrate Plasma (Blue top tube, exact 9:1 ratio)", collectionMode: "home_blood" }],
    fasting: "not_required",
    preparationText: "No fasting required.",
    tatDisplay: "12 Hours (Same Day)",
    parameterIds: ["fibrinogen_clotting"],
    sellingPrice: 700,
    mrp: 1100,
    methodology: "Clauss clotting assay on automated coagulometer",
    reviewerId: "dr-naveen-kumar-n",
    reviewedDate: "2026-10-15",
    active: true
  }
];

export const testsById: Record<string, DiagnosticTest> = Object.fromEntries(
  TESTS.map(t => [t.id, t])
);
