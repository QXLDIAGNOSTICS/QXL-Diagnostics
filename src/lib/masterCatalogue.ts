/**
 * QXL DIAGNOSTICS — SINGLE SOURCE OF TRUTH TEST & PACKAGE CATALOGUE
 *
 * All prices, parameter counts, fasting instructions, TAT, sample types,
 * and canonical URL paths across /tests, test detail pages, /book, AI Assistant,
 * and llms.txt MUST consume from this master data file.
 */

export interface MasterCatalogEntry {
  id: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  mrp: number;
  parametersCount: number;
  paramText: string;
  fasting: boolean;
  fastingInstruction: string;
  sampleType: string;
  tat: string;
  slug: string;
  icon: string;
  popular?: boolean;
  aliases: string[];
  homeCollectionAvailable: boolean;
  kind: 'test' | 'package';
  includes?: string;
}

export const MASTER_CATALOGUE: MasterCatalogEntry[] = [
  // ── CORE BLOOD TESTS ───────────────────────────────────────────────────────
  {
    id: "cbc",
    name: "Complete Blood Count (CBC)",
    shortName: "CBC",
    category: "Blood Tests",
    price: 299,
    mrp: 450,
    parametersCount: 26,
    paramText: "26 Parameters",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "EDTA Whole Blood",
    tat: "6 Hours (Same Day)",
    slug: "/cbc-test",
    icon: "🩸",
    popular: true,
    aliases: ["cbc", "hemogram", "complete blood count", "cbp", "full blood count", "haemogram", "complete blood count (cbc)", "complete blood count (cbc / hemogram)"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "hba1c",
    name: "HbA1c (Glycated Haemoglobin)",
    shortName: "HbA1c",
    category: "Diabetes",
    price: 399,
    mrp: 600,
    parametersCount: 2,
    paramText: "2 Parameters",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "EDTA Whole Blood",
    tat: "6 Hours (Same Day)",
    slug: "/hba1c-test",
    icon: "🍬",
    popular: true,
    aliases: ["hba1c", "glycated hemoglobin", "3 month sugar test", "a1c", "glycosylated hb", "hba1c, glycated hemoglobin"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "thyroid-profile",
    name: "Thyroid Profile (T3, T4, TSH)",
    shortName: "Thyroid Profile",
    category: "Thyroid",
    price: 450,
    mrp: 750,
    parametersCount: 3,
    paramText: "3 Parameters",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours (Same Day)",
    slug: "/thyroid-test",
    icon: "🦋",
    popular: true,
    aliases: ["thyroid profile", "t3 t4 tsh", "total thyroid panel", "thyroid function test", "thyroid profile (t3, t4, tsh)", "thyroid profile total (t3, t4, tsh)", "tft"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "tsh",
    name: "Thyroid Stimulating Hormone (TSH)",
    shortName: "TSH",
    category: "Thyroid",
    price: 250,
    mrp: 400,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "4–6 Hours",
    slug: "/tsh-test",
    icon: "🦋",
    popular: true,
    aliases: ["tsh", "ultrasensitive tsh", "thyrotropin", "thyroid stimulating hormone (tsh)"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile (Full Cholesterol Panel)",
    shortName: "Lipid Profile",
    category: "Heart",
    price: 650,
    mrp: 950,
    parametersCount: 8,
    paramText: "8 Parameters",
    fasting: true,
    fastingInstruction: "10-12 Hrs Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours (Same Day)",
    slug: "/lipid-profile-test",
    icon: "❤️",
    popular: true,
    aliases: ["lipid profile", "cholesterol test", "lipid panel", "triglycerides", "hdl ldl", "lipid profile (cholesterol panel)"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "vitamin-d",
    name: "Vitamin D3 (25-OH Hydroxy)",
    shortName: "Vitamin D",
    category: "Vitamins",
    price: 990,
    mrp: 1500,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours (Same Day)",
    slug: "/vitamin-d-test",
    icon: "☀️",
    popular: true,
    aliases: ["vitamin d", "25 oh vitamin d", "vitamin d3", "calcidiol", "vitamin d3 (25-oh hydroxy vitamin d)"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12 (Serum Cobalamin)",
    shortName: "Vitamin B12",
    category: "Vitamins",
    price: 890,
    mrp: 1300,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours (Same Day)",
    slug: "/vitamin-b12-test",
    icon: "⚡",
    popular: true,
    aliases: ["vitamin b12", "b12 test", "cobalamin", "vitamin b12 (serum cobalamin)"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "lft",
    name: "Liver Function Test (LFT)",
    shortName: "LFT",
    category: "Liver",
    price: 750,
    mrp: 1100,
    parametersCount: 11,
    paramText: "11 Parameters",
    fasting: true,
    fastingInstruction: "8-10 Hrs Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours (Same Day)",
    slug: "/liver-function-test",
    icon: "🧪",
    popular: true,
    aliases: ["lft", "liver function test", "sgot sgpt bilirubin", "hepatic panel", "liver function test (lft complete)"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "kft",
    name: "Kidney Function Test (KFT / RFT)",
    shortName: "KFT / RFT",
    category: "Kidney",
    price: 690,
    mrp: 1000,
    parametersCount: 10,
    paramText: "10 Parameters",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum & Plasma",
    tat: "6 Hours (Same Day)",
    slug: "/kidney-function-test",
    icon: "💧",
    popular: true,
    aliases: ["kft", "rft", "kidney function test", "renal function test", "urea creatinine", "kidney function test (kft / rft complete)"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "fbs",
    name: "Fasting Blood Sugar (FBS)",
    shortName: "FBS",
    category: "Diabetes",
    price: 150,
    mrp: 250,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: true,
    fastingInstruction: "8-10 Hrs Fasting Required",
    sampleType: "Fluoride Plasma",
    tat: "4 Hours",
    slug: "/blood-sugar-test",
    icon: "🩸",
    popular: true,
    aliases: ["fbs", "fasting glucose", "fasting blood sugar"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "crp",
    name: "C-Reactive Protein (CRP Quantitative)",
    shortName: "CRP",
    category: "Blood Tests",
    price: 450,
    mrp: 700,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours",
    slug: "/crp-test",
    icon: "⚡",
    popular: true,
    aliases: ["crp", "c reactive protein", "quantitative crp"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "esr",
    name: "Erythrocyte Sedimentation Rate (ESR)",
    shortName: "ESR",
    category: "Blood Tests",
    price: 180,
    mrp: 250,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "EDTA Blood",
    tat: "4 Hours",
    slug: "/esr-test",
    icon: "🧪",
    popular: true,
    aliases: ["esr", "sed rate", "westergren esr"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "creatinine",
    name: "Serum Creatinine & eGFR Calculation",
    shortName: "Creatinine",
    category: "Kidney",
    price: 220,
    mrp: 350,
    parametersCount: 2,
    paramText: "2 Parameters",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "4 Hours",
    slug: "/creatinine-test",
    icon: "🧪",
    popular: true,
    aliases: ["creatinine", "serum creatinine", "egfr"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "uric-acid",
    name: "Serum Uric Acid Test (Gout Screening)",
    shortName: "Uric Acid",
    category: "Kidney",
    price: 250,
    mrp: 380,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "4 Hours",
    slug: "/uric-acid-test",
    icon: "🦴",
    popular: false,
    aliases: ["uric acid", "gout test", "serum urate"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "iron-profile",
    name: "Iron Profile (Serum Iron, TIBC, % Saturation)",
    shortName: "Iron Profile",
    category: "Vitamins",
    price: 850,
    mrp: 1300,
    parametersCount: 4,
    paramText: "4 Parameters",
    fasting: true,
    fastingInstruction: "10-12 Hrs Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours",
    slug: "/iron-profile-test",
    icon: "🩸",
    popular: false,
    aliases: ["iron profile", "fe tibc", "iron panel"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "ferritin",
    name: "Serum Ferritin Test (Iron Storage Marker)",
    shortName: "Ferritin",
    category: "Vitamins",
    price: 650,
    mrp: 980,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "6 Hours",
    slug: "/ferritin-test",
    icon: "🧲",
    popular: false,
    aliases: ["ferritin", "serum ferritin", "iron stores"],
    homeCollectionAvailable: true,
    kind: "test"
  },
  {
    id: "amh",
    name: "Anti-Mullerian Hormone (AMH Fertility Test)",
    shortName: "AMH",
    category: "Women's Health",
    price: 1850,
    mrp: 2800,
    parametersCount: 1,
    paramText: "1 Parameter",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Serum",
    tat: "12 Hours",
    slug: "/amh-test",
    icon: "🥚",
    popular: true,
    aliases: ["amh", "anti mullerian hormone", "ovarian reserve test"],
    homeCollectionAvailable: true,
    kind: "test"
  },

  // ── PREVENTIVE HEALTH CHECKUP PACKAGES ──────────────────────────────────────
  {
    id: "raksha-bandhan-800",
    name: "Full Body Health Checkup (80 Params)",
    shortName: "Full Body Checkup (80 Params)",
    category: "Preventive Package",
    price: 800,
    mrp: 5800,
    parametersCount: 80,
    paramText: "80 Parameters",
    fasting: true,
    fastingInstruction: "8-10 Hrs Fasting Required",
    sampleType: "Blood & Urine",
    tat: "12 Hours (Same Day)",
    slug: "/book?package=Full%20Body%20Checkup%20(80%20Params)",
    icon: "✨",
    popular: true,
    aliases: [
      "full body checkup", "full body health checkup", "full body health checkup (80 params)", 
      "800 rs pack", "800 rs package", "full body checkup 800", "raksha bandhan special health checkup",
      "raksha bandhan special health checkup (80 params)"
    ],
    homeCollectionAvailable: true,
    kind: "package",
    includes: "CBC (26), HbA1c & Fasting Glucose (3), Heart & Lipid Profile (8), Liver Function Test (11), Kidney Function Test (8), Thyroid Profile (3), Bone/Mineral Health & Urine Routine (21)."
  },
  {
    id: "pkg-fit",
    name: "Quick Fit Package",
    shortName: "Quick Fit Package",
    category: "Preventive Package",
    price: 1770,
    mrp: 4696,
    parametersCount: 55,
    paramText: "55 Parameters",
    fasting: true,
    fastingInstruction: "8-10 Hrs Fasting Required",
    sampleType: "Blood & Urine",
    tat: "12 Hours (Same Day)",
    slug: "/book?package=Quick%20Fit%20Package",
    icon: "🏋️",
    popular: false,
    aliases: ["quick fit package", "quick fit", "fitness package"],
    homeCollectionAvailable: true,
    kind: "package",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests, TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy."
  },
  {
    id: "pkg-diabetes",
    name: "Q-Screen Diabetes Package",
    shortName: "Q-Screen Diabetes Package",
    category: "Preventive Package",
    price: 1900,
    mrp: 4960,
    parametersCount: 62,
    paramText: "62 Parameters",
    fasting: true,
    fastingInstruction: "8-10 Hrs Fasting Required",
    sampleType: "Blood & Urine",
    tat: "12 Hours (Same Day)",
    slug: "/book?package=Q-Screen%20Diabetes%20Package",
    icon: "🩸",
    popular: true,
    aliases: ["q-screen diabetes package", "diabetes package", "q screen diabetes"],
    homeCollectionAvailable: true,
    kind: "package",
    includes: "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test, TSH, CBC, ESR, Urine Routine & Microscopy."
  },
  {
    id: "pkg-master-pro",
    name: "Q-Master Health Pro Package",
    shortName: "Q-Master Health Pro Package",
    category: "Preventive Package",
    price: 4600,
    mrp: 9600,
    parametersCount: 92,
    paramText: "92 Parameters",
    fasting: true,
    fastingInstruction: "8-10 Hrs Fasting Required",
    sampleType: "Blood & Urine",
    tat: "12 Hours (Same Day)",
    slug: "/book?package=Q-Master%20Health%20Pro%20Package",
    icon: "⭐",
    popular: true,
    aliases: ["q-master health pro package", "q master health pro", "master health pro"],
    homeCollectionAvailable: true,
    kind: "package",
    includes: "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen, Thyroid Function Tests, Vitamin D, Vitamin B12, CBC, ESR, Urine Routine, hs-CRP."
  },
  {
    id: "pkg-oncoscreen",
    name: "Q-Oncoscreen Package",
    shortName: "Q-Oncoscreen Package",
    category: "Preventive Package",
    price: 7900,
    mrp: 13600,
    parametersCount: 12,
    paramText: "12 Tumor & Inflammatory Biomarkers",
    fasting: false,
    fastingInstruction: "No Fasting Required",
    sampleType: "Blood & Stool",
    tat: "24-48 Hours",
    slug: "/book?package=Q-Oncoscreen%20Package",
    icon: "🎗️",
    popular: false,
    aliases: ["q-oncoscreen package", "oncoscreen package", "cancer marker screening package"],
    homeCollectionAvailable: true,
    kind: "package",
    includes: "AFP, CEA, Beta HCG, PSA (Male), CA-125 (Female), CA-19.9, CBC, ESR, Urine Routine, Calprotectin, FOBT, Protein Electrophoresis."
  },
  {
    id: "pkg-arthritis",
    name: "Q-Advanced Arthritis & Autoimmune Panel",
    shortName: "Q-Arthritis Panel",
    category: "Preventive Package",
    price: 6900,
    mrp: 12660,
    parametersCount: 30,
    paramText: "30 Parameters",
    fasting: true,
    fastingInstruction: "8-10 Hrs Fasting Required",
    sampleType: "Blood & Urine",
    tat: "24 Hours",
    slug: "/book?package=Q-Advanced%20Arthritis%20and%20Autoimmune%20Panel",
    icon: "🦴",
    popular: false,
    aliases: ["q-arthritis panel", "arthritis package", "autoimmune panel package"],
    homeCollectionAvailable: true,
    kind: "package",
    includes: "RF, Anti-CCP, ANA Autoimmune Tests, Calcium, Phosphorus, Vitamin D3, Iron Studies, Thyroid, DHEA-S, Cortisol, Lipid, LFT, KFT, CBC, ESR."
  },
  {
    id: "pkg-cardiac",
    name: "Q-Hypertension & Cardiovascular Risk Assessment",
    shortName: "Q-Cardiac Risk Assessment",
    category: "Preventive Package",
    price: 9000,
    mrp: 18900,
    parametersCount: 22,
    paramText: "22 Cardiovascular Biomarkers",
    fasting: true,
    fastingInstruction: "10-12 Hrs Fasting Required",
    sampleType: "Blood & Urine",
    tat: "24 Hours",
    slug: "/book?package=Q-Hypertension%20and%20Cardiovascular%20Risk%20Assessment%20Package",
    icon: "❤️",
    popular: false,
    aliases: ["cardiac risk package", "hypertension package", "cardiovascular risk assessment"],
    homeCollectionAvailable: true,
    kind: "package",
    includes: "Lipid + Apo Panel, Lipoprotein(a), hs-CRP, Fibrinogen, Homocysteine, NT-proBNP, Kidney Screen, Thyroid, Cortisol, Magnesium, Insulin, CBC."
  }
];

/**
 * Helper to match any search string / query parameter to a canonical MasterCatalogEntry.
 */
export function matchMasterItem(query: string): MasterCatalogEntry | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (!q) return undefined;

  // Direct match by ID
  const idMatch = MASTER_CATALOGUE.find(m => m.id === q);
  if (idMatch) return idMatch;

  // Direct match by alias
  const aliasMatch = MASTER_CATALOGUE.find(m => 
    m.aliases.some(a => a.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() === q)
  );
  if (aliasMatch) return aliasMatch;

  // Partial match by name
  const nameMatch = MASTER_CATALOGUE.find(m => {
    const mn = m.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    return mn.includes(q) || q.includes(mn);
  });
  if (nameMatch) return nameMatch;

  // Keyword token matching
  if (q.includes('cbc') || q.includes('hemogram') || q.includes('blood count')) {
    return MASTER_CATALOGUE.find(m => m.id === 'cbc');
  }
  if (q.includes('thyroid') || q.includes('t3') || q.includes('t4') || q.includes('tsh')) {
    return MASTER_CATALOGUE.find(m => m.id === 'thyroid-profile');
  }
  if (q.includes('hba1c') || q.includes('glycated')) {
    return MASTER_CATALOGUE.find(m => m.id === 'hba1c');
  }
  if (q.includes('lipid') || q.includes('cholesterol')) {
    return MASTER_CATALOGUE.find(m => m.id === 'lipid-profile');
  }
  if (q.includes('vitamin d') || q.includes('vit d')) {
    return MASTER_CATALOGUE.find(m => m.id === 'vitamin-d');
  }
  if (q.includes('vitamin b12') || q.includes('vit b12')) {
    return MASTER_CATALOGUE.find(m => m.id === 'vitamin-b12');
  }
  if (q.includes('full body') || q.includes('800') || q.includes('raksha')) {
    return MASTER_CATALOGUE.find(m => m.id === 'raksha-bandhan-800');
  }

  return undefined;
}

