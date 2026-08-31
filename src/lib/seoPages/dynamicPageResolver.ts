import { topTests } from '../testsData';
import { prenatalScreeningPagesWithAliases } from './prenatalScreeningData';
import { masterExtractedPagesData } from './extractedMasterData';

export interface ReferenceRange {
  label: string;
  range: string;
  unit: string;
  interpretation: 'normal' | 'borderline' | 'abnormal' | 'info';
  note?: string;
}

export interface DynamicPageData {
  slug: string;
  title: string;
  metaDescription: string;
  badge: string;
  h1Title: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  discountPercent: string;
  parametersCount: string;
  sampleType: string;
  fastingRequired: string;
  turnaroundTime: string;
  overview: string[];
  parametersList: string[];
  whyImportant: string[];
  faqs: { question: string; answer: string }[];
  category: string;
  // ── Phase 2: Enriched fields for GEO/AEO/AI discoverability ──────────────
  /** Structured reference ranges table (normal/borderline/abnormal rows). */
  referenceRanges?: ReferenceRange[];
  /** Related test slugs for internal linking. */
  relatedTests?: string[];
  /** Attributed clinical interpretation note from a QXL MD. */
  doctorNote?: string;
  /** Doctor slug for link to profile page. */
  doctorSlug?: string;
  /** Doctor display name. */
  doctorName?: string;
  /** Doctor qualifications string. */
  doctorQuals?: string;
  /** Symptoms / indications that prompt this test (plain-language chips). */
  whenToTest?: string[];
  /** 2–3 sentences of deeper clinical significance — for AI extractable blocks. */
  clinicalSignificance?: string;
}


const CLINICAL_PAGES_DATA: Record<string, Partial<DynamicPageData>> = {
  "ana-test-bangalore": {
    title: "ANA Profile Test in Bangalore | Autoimmune IFA Screen | QXL",
    h1Title: "ANA Profile Test (HEp-2 IFA) in Bangalore",
    subtitle: "Gold-standard Indirect Immunofluorescence (IFA) assay for Antinuclear Antibodies on HEp-2 cell substrate with 12-parameter ENA correlation.",
    price: "1450",
    oldPrice: "2200",
    discountPercent: "34% OFF",
    parametersCount: "12 Parameters (IFA Pattern + ENA Correlation)",
    sampleType: "Serum",
    fastingRequired: "No fasting required.",
    turnaroundTime: "24 Hours (Next Day)",
    overview: [
      "The Antinuclear Antibody (ANA) profile test by Indirect Immunofluorescence (IFA) on HEp-2 cells is the gold standard investigation for systemic autoimmune conditions.",
      "Identifies nuclear staining patterns (homogeneous, speckled, nucleolar, centromere) and titer strength to evaluate Systemic Lupus Erythematosus (SLE), Sjogren's syndrome, Scleroderma, and MCTD."
    ],
    whyImportant: [
      "HEp-2 substrate IFA technology for pattern recognition.",
      "Pathologist-reviewed immunofluorescence traces.",
      "Free home collection across Bengaluru with temperature-controlled transport."
    ],
    faqs: [
      { question: "What does a positive ANA test mean?", answer: "A positive ANA (titer ≥ 1:80) indicates immune system autoantibody production. It requires correlation with staining patterns and specific ENA panels to confirm autoimmune disease." },
      { question: "Is fasting required for ANA test?", answer: "No fasting is required for the ANA blood draw." }
    ],
    category: "Autoimmune Diagnostics",
    clinicalSignificance: "ANA IFA on HEp-2 cells remains the primary screening recommendation of the American College of Rheumatology (ACR). At QXL Diagnostics, immunofluorescence patterns are evaluated by consultant pathologists and correlated with clinical presentation.",
    whenToTest: ["Persistent joint pain & morning stiffness", "Butterfly rash across nose & cheeks", "Photosensitivity", "Raynaud's phenomenon (fingers turning white/blue)", "Unexplained chronic fatigue"],
    doctorNote: "A positive ANA is a clue, not a diagnosis. I always evaluate the titer strength (1:160 vs 1:40) and staining pattern before ordering extended ENA blot testing to identify specific target antigens like anti-dsDNA or anti-Sm.",
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology"
  },
  "spep-test-bangalore": {
    title: "SPEP Test Bangalore | Serum Protein Electrophoresis | QXL",
    h1Title: "Serum Protein Electrophoresis (SPEP) Test in Bangalore",
    subtitle: "Separates serum proteins into Albumin and Globulin fractions (Alpha-1, Alpha-2, Beta, Gamma) to detect M-spikes and monoclonal gammopathies.",
    price: "1600",
    oldPrice: "2400",
    discountPercent: "33% OFF",
    parametersCount: "6 Protein Fractions",
    sampleType: "Serum",
    fastingRequired: "No fasting required.",
    turnaroundTime: "24–48 Hours",
    overview: [
      "Serum Protein Electrophoresis (SPEP) quantifies serum protein fractions to identify monoclonal immunoglobulin spikes (M-protein) associated with Multiple Myeloma and MGUS.",
      "Followed by Immunofixation Electrophoresis (IFE) for heavy and light chain characterization."
    ],
    whyImportant: [
      "Densitometric trace analysis for precise M-band quantification.",
      "Essential evaluation for bone pain, unexplained anaemia, and high ESR.",
      "Senior pathologist review on all abnormal electrophoretic patterns."
    ],
    faqs: [
      { question: "What is an M-spike on SPEP?", answer: "An M-spike indicates a monoclonal protein produced by abnormal plasma cells, requiring further evaluation for Multiple Myeloma or MGUS." },
      { question: "Is fasting required for SPEP?", answer: "Fasting is not mandatory, though morning sample collection is preferred." }
    ],
    category: "Histopathology & Protein Diagnostics",
    clinicalSignificance: "SPEP is critical in evaluating patients with unexplained anemia, bone lesions, hypercalcemia, or proteinuria. The presence of a localized band in the gamma region warrants reflex immunofixation.",
    whenToTest: ["Unexplained bone pain or rib fractures", "Persistently high ESR > 100", "Megaloblastic or unexplained anaemia", "Proteinuria or renal insufficiency"],
    doctorNote: "When I identify an M-band on SPEP densitometry, I immediately advise Immunofixation Electrophoresis (IFE) and serum free light chains (Kappa/Lambda) to establish baseline quantification before treatment.",
    doctorSlug: "dr-pritilata-rout",
    doctorName: "Dr. Pritilata Rout",
    doctorQuals: "MD Pathology (NIMHANS)"
  },
  "double-marker-test-bangalore": {
    title: "Double Marker Test Bangalore | First Trimester Screening | QXL",
    h1Title: "First Trimester Double Marker Screening in Bangalore",
    subtitle: "Measures PAPP-A and Free β-hCG levels between 11w0d and 13w6d of pregnancy, combined with NT scan data for fetal risk assessment.",
    price: "2200",
    oldPrice: "3200",
    discountPercent: "31% OFF",
    parametersCount: "2 Biomarkers + FMF Software Risk Calculation",
    sampleType: "Serum Blood + NT Scan Data",
    fastingRequired: "No fasting required.",
    turnaroundTime: "24 Hours",
    overview: [
      "First Trimester Double Marker screening combines maternal blood markers (PAPP-A & Free β-hCG) with NT ultrasound measurements to evaluate risk for Down Syndrome (Trisomy 21), Edwards Syndrome (Trisomy 18), and Patau Syndrome (Trisomy 13).",
      "Calculated using FMF-accredited software algorithms."
    ],
    whyImportant: [
      "Optimal window 11 to 13.6 weeks of gestation.",
      "Chemiluminescent immunoassay for precise MoM calculations.",
      "Free doorstep sample collection across Bengaluru."
    ],
    faqs: [
      { question: "When should the Double Marker test be done?", answer: "Between 11 weeks + 0 days and 13 weeks + 6 days of pregnancy." },
      { question: "Is ultrasound needed before Double Marker blood test?", answer: "Yes, an NT scan CRL and NT millimeter measurement are required for the risk software calculation." }
    ],
    category: "Maternal & Prenatal Diagnostics",
    clinicalSignificance: "First trimester prenatal screening provides early non-invasive risk assessment for major fetal chromosomal abnormalities.",
    whenToTest: ["11 to 13.6 weeks pregnancy screening", "Maternal age above 35 years", "Obstetrician-directed risk evaluation"],
    doctorNote: "Double Marker screening provides a risk ratio, not a diagnostic result. Screen-positive results are followed up with non-invasive prenatal testing (NIPT) or amniocentesis after detailed genetic counseling.",
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology & Serology Specialist"
  },
  "blood-test-bangalore": {
    title: "Blood Test in Bangalore | Home Collection | QXL Diagnostics",
    h1Title: "Blood Test in Bangalore – Home Sample Collection Available",
    subtitle: "A blood test is a laboratory investigation performed on a small sample of blood to assess different aspects of health, including cells, glucose regulation, liver & kidney function, hormones, and vitamins.",
    price: "350",
    oldPrice: "500",
    discountPercent: "30% OFF",
    parametersCount: "Test-Specific",
    sampleType: "Blood / Serum / EDTA",
    fastingRequired: "Depends on investigation (Fasting for glucose/lipid, no fasting for CBC/HbA1c).",
    turnaroundTime: "Same Day (6–12 Hours)",
    overview: [
      "A blood test is a laboratory investigation performed on a small sample of blood to assess different aspects of health. Depending on the investigation ordered, blood testing can provide information about blood cells, glucose regulation, cholesterol, liver and kidney function, thyroid hormones, vitamins, minerals, inflammation, infections, hormones and several specialised medical conditions.",
      "At QXL Diagnostics, blood samples are processed using validated laboratory procedures and NABL quality systems. Patients can visit a QXL service point or request home blood collection across Bengaluru."
    ],
    whyImportant: [
      "Investigate symptoms, establish baseline health information, or diagnose & monitor disease.",
      "Suitable for routine screening, preventive health checks, and physician-requested investigations.",
      "Processed at NABL-accredited super speciality diagnostic laboratory (MC-6849)."
    ],
    faqs: [
      { question: "Can I book a blood test at home in Bangalore?", answer: "Yes, home blood sample collection is available across Bengaluru subject to service availability." },
      { question: "Do all blood tests require fasting?", answer: "No. Fasting depends on the particular investigation." },
      { question: "How many blood tubes will be collected?", answer: "It depends on the tests ordered." },
      { question: "Can senior citizens book home collection?", answer: "Yes, home collection is ideal for senior citizens." },
      { question: "Can multiple family members book together?", answer: "Yes, subject to scheduling." },
      { question: "Where can I get a blood test near me in Bengaluru?", answer: "QXL provides laboratory and home collection services across Kengeri, RR Nagar, Nagarabhavi, Jayanagar, JP Nagar, Yelahanka, Whitefield, and all Bengaluru localities." }
    ],
    category: "Diagnostic Blood Tests"
  },
  "home-blood-collection-bangalore": {
    title: "Home Blood Collection Bangalore | Blood Test at Home | QXL",
    h1Title: "Home Blood Collection in Bangalore",
    subtitle: "Home blood collection allows patients to have laboratory samples collected at their residence without travelling to a diagnostic centre by trained phlebotomy specialists.",
    price: "350",
    oldPrice: "500",
    discountPercent: "30% OFF",
    parametersCount: "All Tests",
    sampleType: "Blood / Urine",
    fastingRequired: "Follow the preparation requirements of the individual test being booked.",
    turnaroundTime: "Same Day (6–12 Hours)",
    overview: [
      "Home blood collection allows patients to have laboratory samples collected at their residence or another eligible location without travelling to a diagnostic centre. A trained phlebotomy professional visits at the scheduled time, verifies the patient and requested investigations, collects the required specimens and transports them to the laboratory under appropriate handling conditions.",
      "QXL Diagnostics provides home blood sample collection across Bengaluru for eligible investigations using cold-chain transport kits."
    ],
    whyImportant: [
      "Avoid travel and waiting at diagnostic centers.",
      "Convenient early-morning fasting collection.",
      "Useful for elderly patients, children, and people with mobility limitations."
    ],
    faqs: [
      { question: "How do I book a blood test at home in Bangalore?", answer: "Call or WhatsApp +91 9964 639 639 or book directly on qxldiagnostics.com." },
      { question: "Is fasting home collection available?", answer: "Yes, early morning appointments are scheduled specifically for fasting tests." },
      { question: "Can several tests be collected during one visit?", answer: "Yes, multiple blood and urine samples can be collected during a single phlebotomy visit." }
    ],
    category: "Home Phlebotomy Services"
  },
  "full-body-checkup-bangalore": {
    title: "Full Body Health Checkup in Bangalore | QXL Diagnostics",
    h1Title: "Full Body Health Checkup in Bangalore",
    subtitle: "Comprehensive preventive health checkup combining 80 key health parameters across blood, liver, kidney, thyroid, heart, and urine screening.",
    price: "800",
    oldPrice: "1600",
    discountPercent: "50% OFF",
    parametersCount: "80 Parameters",
    sampleType: "Blood & Urine",
    fastingRequired: "8 to 10 hours overnight fasting required for accurate glucose & lipid readings.",
    turnaroundTime: "Same Day (6–12 Hours)",
    overview: [
      "A full body health checkup is a preventive laboratory screening package combining multiple investigations to evaluate important areas of health, including blood count, blood glucose, HbA1c, lipid profile, liver function, kidney function, thyroid parameters, and urine examination.",
      "QXL Diagnostics offers preventive health packages with complimentary home sample collection across Bengaluru."
    ],
    whyImportant: [
      "Detects early metabolic, diabetic, and organ function changes before symptoms appear.",
      "Evaluates cardiovascular risk, liver enzymes, and kidney filtration markers.",
      "All reports reviewed by consultant pathologists led by Dr. Shantakumar Muruda (MD)."
    ],
    faqs: [
      { question: "What tests are included in a full body checkup?", answer: "80 parameters covering CBC, Diabetes, Liver Function, Kidney & Electrolytes, Lipid Profile, Thyroid, Iron, and Complete Urine Examination." },
      { question: "Does a full body checkup require fasting?", answer: "Yes, an 8 to 10 hour overnight fast is required for fasting glucose and lipid profile parameters." }
    ],
    category: "Preventive Health Packages"
  },
  "cbc-test-bangalore": {
    title: "CBC Test in Bangalore | Complete Blood Count & Home Collection | QXL",
    h1Title: "CBC – Complete Blood Count Test in Bangalore",
    subtitle: "Measures red blood cells, white blood cells, haemoglobin, hematocrit, differential count, and platelets to evaluate overall health, anaemia, infection, and immunity.",
    price: "350",
    oldPrice: "500",
    discountPercent: "30% OFF",
    parametersCount: "24 Parameters (RBC, WBC, Differential, Platelets, Indices)",
    sampleType: "EDTA Whole Blood (K2/K3 EDTA)",
    fastingRequired: "No fasting required for CBC test alone.",
    turnaroundTime: "Same Day (4–6 Hours)",
    overview: [
      "A Complete Blood Count (CBC) is the cornerstone haematological investigation performed on EDTA whole blood using automated 5-part differential cell counters.",
      "Measures Haemoglobin (Hb), Total RBC Count, Hematocrit (HCT/PCV), Red Cell Indices (MCV, MCH, MCHC, RDW), Total Leukocyte Count (TLC), 5-part Differential WBC Count (Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils), and Absolute Platelet Count.",
      "Peripheral blood smear morphology examination is performed whenever automated flags indicate cell atypia, severe leucopenia/thrombocytopenia, or abnormal blasts."
    ],
    whyImportant: [
      "Evaluates haemoglobin and red cell indices to diagnose microcytic, normocytic, or macrocytic anaemia.",
      "Identifies leukocytosis or leukopenia indicative of acute bacterial/viral infections, inflammation, or bone marrow disorders.",
      "Monitors platelet counts critical for fever workups (e.g., Dengue) and bleeding risks.",
      "Medically reviewed by Consultant Pathologists & Clinical Biochemists led by Dr. Shantakumar Muruda, MD."
    ],
    faqs: [
      { question: "What parameters are included in a CBC test?", answer: "A CBC includes 24 parameters: Haemoglobin, RBC Count, PCV/HCT, MCV, MCH, MCHC, RDW, Total WBC Count, 5-part Differential (Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils), and Platelet Count." },
      { question: "Does CBC require fasting?", answer: "No, fasting is NOT required for a CBC blood draw." },
      { question: "When is a peripheral blood smear needed with a CBC?", answer: "A peripheral blood smear is performed when automated cell counters detect abnormal cell morphology, immature blood cells, or significant cell count abnormalities." },
      { question: "What does low haemoglobin mean?", answer: "Low haemoglobin (below 12 g/dL in women, 13 g/dL in men) indicates anaemia, which may result from iron deficiency, B12 deficiency, chronic disease, or blood loss." },
      { question: "Can I book a CBC blood test at home in Bangalore?", answer: "Yes. QXL Diagnostics offers free home blood collection for CBC across all Bengaluru localities including Kengeri, RR Nagar, Yelahanka, Nagarabhavi, Vijayanagar, and more." }
    ],
    category: "Haematology Diagnostics",
    clinicalSignificance: "The Complete Blood Count (CBC) is the most frequently ordered laboratory investigation worldwide and remains the first-line test for evaluating systemic health. Haemoglobin and red cell indices identify the type and severity of anaemia; white cell count and differential distinguish bacterial from viral infections; platelet count guides clinical decisions in fever workups and bleeding disorders. A single CBC drawn at QXL Diagnostics provides 24 data points reviewed by our consultant haematopathologist.",
    whenToTest: ["Unexplained fatigue or weakness", "Persistent fever", "Frequent infections", "Easy bruising or bleeding", "Pre-operative fitness assessment", "Routine annual health check", "Dengue or malaria follow-up"],
    relatedTests: ["esr-test-bangalore", "iron-profile-test-bangalore", "ferritin-test-bangalore", "vitamin-b12-test-bangalore", "dengue-test-bangalore"],
    referenceRanges: [
      { label: "Haemoglobin — Men",         range: "13.0 – 17.0",  unit: "g/dL",  interpretation: "normal" },
      { label: "Haemoglobin — Women",        range: "12.0 – 15.0",  unit: "g/dL",  interpretation: "normal" },
      { label: "Haemoglobin — Low (Anaemia)",range: "< 12.0",       unit: "g/dL",  interpretation: "abnormal" },
      { label: "Total WBC Count",            range: "4,000 – 11,000",unit: "cells/µL",interpretation: "normal" },
      { label: "WBC — Leukocytosis",         range: "> 11,000",     unit: "cells/µL",interpretation: "abnormal", note: "Suggests bacterial infection or inflammation" },
      { label: "WBC — Leukopenia",           range: "< 4,000",      unit: "cells/µL",interpretation: "borderline", note: "Can indicate viral infection or bone marrow suppression" },
      { label: "Platelet Count — Normal",    range: "1,50,000 – 4,00,000", unit: "/µL", interpretation: "normal" },
      { label: "Platelet Count — Low",       range: "< 1,00,000",  unit: "/µL",  interpretation: "abnormal", note: "Clinical alert in dengue; below 50,000 requires urgent review" },
      { label: "MCV (Mean Cell Volume)",     range: "80 – 100",    unit: "fL",   interpretation: "normal" },
      { label: "MCV — Microcytic",           range: "< 80",        unit: "fL",   interpretation: "borderline", note: "Suggests iron deficiency anaemia" },
      { label: "MCV — Macrocytic",           range: "> 100",       unit: "fL",   interpretation: "borderline", note: "Suggests B12 / folate deficiency" }
    ],
    doctorNote: "The CBC is the window into systemic disease. I particularly focus on the neutrophil-to-lymphocyte ratio and platelet trends in fever workups — a dropping platelet count with dengue positivity demands daily monitoring. A low MCV with iron deficiency should always prompt a dietary and gastrointestinal workup, not just supplementation.",
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology"
  },
  "hba1c-test-bangalore": {
    title: "HbA1c Test in Bangalore | Diabetes Test | QXL Diagnostics",
    h1Title: "HbA1c Test in Bangalore",
    subtitle: "Measures glycated haemoglobin to estimate average blood glucose exposure over the past 2 to 3 months for diabetes screening and monitoring.",
    price: "350",
    oldPrice: "500",
    discountPercent: "30% OFF",
    parametersCount: "Glycated Hb & eAG",
    sampleType: "EDTA Whole Blood",
    fastingRequired: "No fasting required. Test can be done at any time of the day.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "HbA1c is a blood test that measures the proportion of haemoglobin in red blood cells that has glucose attached to it. Because red blood cells circulate for several weeks, HbA1c provides an estimate of average glucose exposure over approximately the preceding two to three months.",
      "The test is widely used to monitor people with diabetes and contribute to the diagnosis of prediabetes and diabetes."
    ],
    whyImportant: [
      "Reflects 2–3 months of blood sugar control without being affected by short-term diet.",
      "Does not require fasting, making it convenient for home collection.",
      "Calculates estimated Average Glucose (eAG) for practical clinical understanding."
    ],
    faqs: [
      { question: "What does HbA1c measure?", answer: "It measures the percentage of haemoglobin in red blood cells coated with glucose, reflecting average blood sugar over the past 2 to 3 months." },
      { question: "Do I need fasting for HbA1c?", answer: "No, fasting is NOT required for an HbA1c test. You can have it drawn at any time of the day." },
      { question: "What is a normal HbA1c level?", answer: "Below 5.7% is normal (non-diabetic). 5.7%–6.4% indicates prediabetes. 6.5% or above on two occasions confirms diabetes." },
      { question: "What is eAG and how does it relate to HbA1c?", answer: "eAG (estimated Average Glucose) is calculated from HbA1c. An HbA1c of 7% corresponds to an eAG of approximately 154 mg/dL." },
      { question: "Can I book an HbA1c test at home in Bangalore?", answer: "Yes. QXL Diagnostics provides free home collection for HbA1c across all Bengaluru areas. No fasting needed." }
    ],
    category: "Diabetes Diagnostics",
    clinicalSignificance: "HbA1c is the gold-standard marker for long-term glycaemic control. Unlike fasting blood glucose which reflects a single moment, HbA1c integrates glucose exposure over the preceding 60–90 days. It is recommended by WHO and the ADA for both diabetes diagnosis and monitoring. At QXL Diagnostics, HbA1c is measured on a validated ion-exchange HPLC platform — the same technology used in reference hospitals — ensuring interference-free results even in the presence of common haemoglobin variants prevalent in South India.",
    whenToTest: ["Monitoring diabetes control every 3 months", "Screening for prediabetes", "Fatigue, frequent urination, or excessive thirst", "Before starting or adjusting diabetes medication", "Annual preventive health check", "PCOS or metabolic syndrome workup"],
    relatedTests: ["blood-sugar-test-bangalore", "diabetes-profile-test-bangalore", "kidney-function-test-bangalore", "lipid-profile-test-bangalore", "urine-microalbumin-test-bangalore"],
    referenceRanges: [
      { label: "HbA1c — Normal (Non-Diabetic)",   range: "< 5.7",     unit: "%",    interpretation: "normal" },
      { label: "HbA1c — Prediabetes",              range: "5.7 – 6.4", unit: "%",    interpretation: "borderline", note: "Increased risk; lifestyle intervention recommended" },
      { label: "HbA1c — Diabetes (WHO Criteria)",  range: "≥ 6.5",     unit: "%",    interpretation: "abnormal",   note: "Diagnosis requires confirmation on repeat sample" },
      { label: "HbA1c — Well Controlled Diabetes", range: "< 7.0",     unit: "%",    interpretation: "normal",     note: "Target for most adults with diabetes (ADA 2024)" },
      { label: "eAG at HbA1c 6.5%",               range: "~140",      unit: "mg/dL", interpretation: "info" },
      { label: "eAG at HbA1c 7.0%",               range: "~154",      unit: "mg/dL", interpretation: "info" },
      { label: "eAG at HbA1c 8.0%",               range: "~183",      unit: "mg/dL", interpretation: "info" }
    ],
    doctorNote: "I always pair HbA1c with fasting plasma glucose and urine microalbumin in diabetic follow-ups. A patient may have a normal fasting glucose yet an elevated HbA1c if post-meal excursions are high. The reverse is also true in early prediabetes. For South Indian patients, I specifically verify that our HPLC platform provides reliable results in the context of HbE and sickle-cell trait, which are not uncommon in this region.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "thyroid-test-bangalore": {
    title: "Thyroid Test in Bangalore | T3 T4 TSH | QXL Diagnostics",
    h1Title: "Thyroid Profile Test in Bangalore",
    subtitle: "Comprehensive assessment of thyroid gland function measuring TSH, Total T3, and Total T4 hormones using automated immunoassay analyzers.",
    price: "550",
    oldPrice: "800",
    discountPercent: "31% OFF",
    parametersCount: "3 Parameters (T3, T4, TSH)",
    sampleType: "Serum",
    fastingRequired: "No special fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "A thyroid profile consists of blood tests used to evaluate the function of the thyroid gland and its regulation by the pituitary gland. It measures TSH, Total T3, and Total T4.",
      "Thyroid hormones influence metabolism, energy use, temperature regulation, heart rate, and growth."
    ],
    whyImportant: [
      "Screens for hypothyroidism (underactive thyroid) and hyperthyroidism (overactive thyroid).",
      "Monitors thyroid hormone replacement therapy.",
      "Essential for evaluating unexplained weight changes, fatigue, and hair loss."
    ],
    faqs: [
      { question: "What tests are included in a thyroid profile?", answer: "A standard thyroid profile includes TSH (Thyroid Stimulating Hormone), Total T3 (triiodothyronine), and Total T4 (thyroxine)." },
      { question: "Do thyroid tests require fasting?", answer: "No fasting is required for thyroid tests. The sample can be collected at any time of day." },
      { question: "What does high TSH mean?", answer: "A TSH above 4.5 mIU/L typically indicates an underactive thyroid (hypothyroidism). Treatment and interpretation should be directed by your physician." },
      { question: "What does low TSH mean?", answer: "A TSH below 0.4 mIU/L may indicate an overactive thyroid (hyperthyroidism) or suppression from medications, and requires clinical review." },
      { question: "Can I book a thyroid test at home in Bangalore?", answer: "Yes. QXL Diagnostics offers free home collection for the thyroid profile across all Bengaluru areas. No fasting required." }
    ],
    category: "Endocrinology Diagnostics",
    clinicalSignificance: "The thyroid gland regulates metabolic rate, energy utilisation, cardiac rhythm, temperature homeostasis, and cognitive function. TSH from the pituitary gland is the most sensitive first-line indicator of thyroid dysfunction — even subtle TSH changes often precede clinical symptoms by months. QXL Diagnostics measures thyroid hormones on a third-generation TSH assay platform with functional sensitivity below 0.01 mIU/L, enabling detection of subclinical hyperthyroidism.",
    whenToTest: ["Unexplained weight gain or loss", "Fatigue and sluggishness", "Hair fall or hair thinning", "Cold intolerance", "Irregular menstrual cycles", "Fertility workup", "Monitoring levothyroxine therapy", "Neck swelling or goitre"],
    relatedTests: ["tsh-test-bangalore", "free-t3-test-bangalore", "free-t4-test-bangalore", "anti-tpo-test-bangalore", "vitamin-b12-test-bangalore"],
    referenceRanges: [
      { label: "TSH — Normal Adult",           range: "0.40 – 4.50", unit: "mIU/L", interpretation: "normal" },
      { label: "TSH — Subclinical Hypothyroid",range: "4.5 – 10.0",  unit: "mIU/L", interpretation: "borderline", note: "Often asymptomatic; monitor with Anti-TPO" },
      { label: "TSH — Overt Hypothyroidism",   range: "> 10.0",      unit: "mIU/L", interpretation: "abnormal",   note: "Usually requires treatment with levothyroxine" },
      { label: "TSH — Hyperthyroidism",         range: "< 0.40",      unit: "mIU/L", interpretation: "abnormal",   note: "Further workup with FT3/FT4 required" },
      { label: "Total T4 — Normal",             range: "5.0 – 12.0",  unit: "µg/dL", interpretation: "normal" },
      { label: "Total T3 — Normal",             range: "0.8 – 2.0",   unit: "ng/mL", interpretation: "normal" },
      { label: "TSH in Pregnancy (1st Trimester)", range: "0.1 – 2.5",unit: "mIU/L", interpretation: "info",       note: "Tighter target; consult your obstetrician" }
    ],
    doctorNote: "Thyroid disease is one of the most under-diagnosed conditions I encounter. Many patients come to us already fatigued for years, only to discover a TSH above 8. I particularly watch for subclinical hypothyroidism in women planning pregnancy — a TSH above 2.5 in the first trimester requires immediate review. I also recommend checking Anti-TPO antibodies whenever TSH is borderline, as it identifies autoimmune thyroiditis years before the gland fails.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "vitamin-d-test-bangalore": {
    title: "Vitamin D Test in Bangalore | 25-OH Vitamin D | QXL",
    h1Title: "Vitamin D Test in Bangalore",
    subtitle: "Measures 25-Hydroxy Vitamin D levels in serum to evaluate bone health, calcium absorption, and deficiency status.",
    price: "990",
    oldPrice: "1500",
    discountPercent: "34% OFF",
    parametersCount: "25-OH Vitamin D Total",
    sampleType: "Serum",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "A vitamin D blood test measures the concentration of 25-hydroxy vitamin D (25-OH vitamin D), which is the primary circulating form reflecting vitamin D from sunlight, food, and supplements.",
      "Vitamin D plays a critical role in calcium and phosphate balance, bone mineralization, and neuromuscular function."
    ],
    whyImportant: [
      "Identifies vitamin D deficiency associated with bone pain, osteoporosis, and fatigue.",
      "Monitors vitamin D supplementation safety and efficacy.",
      "NABL-validated immunoassay platform ensuring precise quantitative results."
    ],
    faqs: [
      { question: "What is a 25-OH Vitamin D test?", answer: "It measures 25-hydroxyvitamin D (calcidiol) in serum — the standard marker doctors use to assess total body vitamin D status from sun exposure, food, and supplements." },
      { question: "Do I need fasting for a Vitamin D test?", answer: "No, fasting is not required for a Vitamin D test." },
      { question: "What are the symptoms of Vitamin D deficiency?", answer: "Common symptoms include bone pain, muscle weakness, fatigue, frequent infections, and depression. Many people are deficient without obvious symptoms." },
      { question: "What is a normal Vitamin D level in India?", answer: "The ICMR/Endocrine Society defines: Deficient < 12 ng/mL, Insufficient 12–20 ng/mL, Sufficient 20–50 ng/mL, Optimal 40–60 ng/mL for most adults." },
      { question: "Can I book a Vitamin D test at home in Bangalore?", answer: "Yes. QXL Diagnostics offers free home sample collection for the Vitamin D test across all Bengaluru localities." }
    ],
    category: "Vitamin & Nutritional Panels",
    clinicalSignificance: "Vitamin D deficiency is highly prevalent in urban India, including among people in sunny Bengaluru, due to indoor lifestyles, sun avoidance, and limited dietary sources. Beyond bone health, emerging evidence links adequate vitamin D to immune function, cardiovascular health, glucose metabolism, and mental well-being. Supplementation without testing can lead to under- or over-dosing — 25-OH Vitamin D testing provides the only objective guide to corrective dosage.",
    whenToTest: ["Bone pain or muscle weakness", "Osteoporosis or osteopaenia", "Fatigue or low mood", "Frequent infections", "Monitoring supplementation", "Post-menopausal women", "Diabetes or metabolic syndrome workup", "Annual preventive check"],
    relatedTests: ["calcium-test-bangalore", "magnesium-test-bangalore", "vitamin-b12-test-bangalore", "thyroid-test-bangalore", "iron-profile-test-bangalore"],
    referenceRanges: [
      { label: "Deficiency",               range: "< 12",      unit: "ng/mL", interpretation: "abnormal",   note: "High risk of bone disease and immune suppression" },
      { label: "Insufficiency",            range: "12 – 20",   unit: "ng/mL", interpretation: "borderline", note: "Supplementation usually recommended" },
      { label: "Sufficient (General)",     range: "20 – 50",   unit: "ng/mL", interpretation: "normal" },
      { label: "Optimal Target (Adults)",  range: "40 – 60",   unit: "ng/mL", interpretation: "normal",     note: "Target range for most supplement protocols" },
      { label: "Toxicity Risk",            range: "> 100",     unit: "ng/mL", interpretation: "abnormal",   note: "Hypercalcaemia risk; high-dose supplementation without testing" }
    ],
    doctorNote: "Vitamin D deficiency is almost universal in my urban patient population — I rarely see a report above 30 ng/mL without supplementation. I routinely check Vitamin D in all patients with fatigue, bone pain, recurrent infections, and in all women over 40. Importantly, I pair it with calcium and magnesium to avoid the trap of supplementing D3 without addressing co-factor deficiencies.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "vitamin-b12-test-bangalore": {
    title: "Vitamin B12 Test in Bangalore | QXL Diagnostics",
    h1Title: "Vitamin B12 Blood Test in Bangalore",
    subtitle: "Evaluates serum cobalamin levels to assess nerve health, DNA synthesis, and red blood cell formation.",
    price: "890",
    oldPrice: "1300",
    discountPercent: "31% OFF",
    parametersCount: "Serum Cobalamin",
    sampleType: "Serum",
    fastingRequired: "6 to 8 hours fasting recommended for optimal accuracy.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Vitamin B12 (cobalamin) is an essential water-soluble vitamin involved in red blood cell production, myelin sheath maintenance for nerve function, and DNA synthesis.",
      "Serum B12 testing helps evaluate unexplained fatigue, numbness, tingling in hands and feet, memory issues, and megaloblastic anaemia."
    ],
    whyImportant: [
      "Detects B12 deficiency common in vegetarians, older adults, and individuals with malabsorption.",
      "Evaluates neurological symptoms and peripheral neuropathy.",
      "Processed on high-sensitivity automated immunoassay platforms."
    ],
    faqs: [
      { question: "What causes Vitamin B12 deficiency?", answer: "Inadequate dietary intake (common in strict vegetarians), pernicious anaemia, or intestinal malabsorption conditions." },
      { question: "Can B12 deficiency cause numbness or tingling?", answer: "Yes, B12 is essential for myelin sheath integrity. Deficiency often manifests as peripheral neuropathy, tingling, or memory lapses." },
      { question: "Do I need to fast for a B12 test?", answer: "An 8-hour overnight fast is recommended for optimal serum accuracy." },
      { question: "Can I book a B12 test at home in Bangalore?", answer: "Yes. QXL Diagnostics provides free doorstep sample collection for Vitamin B12 across all Bengaluru localities." }
    ],
    category: "Vitamin & Nutritional Panels",
    clinicalSignificance: "Vitamin B12 (cobalamin) is a critical co-factor for DNA synthesis and nerve myelin maintenance. Because plants do not synthesize cobalamin, B12 deficiency is widespread among urban populations in Bengaluru, particularly those following strict vegetarian diets. Left untreated, chronic deficiency leads to irreversible subacute combined degeneration of the spinal cord and megaloblastic anaemia. At QXL Diagnostics, B12 is measured using quantitative chemiluminescent immunoassay (CLIA).",
    whenToTest: ["Tingling, numbness, or burning sensation in hands/feet", "Unexplained chronic fatigue and brain fog", "Strict vegetarian or vegan diet", "Megaloblastic anaemia found on CBC", "Post-bariatric surgery evaluation", "Metformin long-term use follow-up"],
    relatedTests: ["folate-test-bangalore", "cbc-test-bangalore", "iron-profile-test-bangalore", "vitamin-d-test-bangalore", "homocysteine-test-bangalore"],
    referenceRanges: [
      { label: "Normal Range",           range: "211 – 911",  unit: "pg/mL", interpretation: "normal" },
      { label: "Borderline Deficiency",  range: "150 – 210",  unit: "pg/mL", interpretation: "borderline", note: "Early biochemical deficiency; MMA or homocysteine confirmation recommended" },
      { label: "Overt B12 Deficiency",   range: "< 150",      unit: "pg/mL", interpretation: "abnormal",   note: "Neurological & haematological risk; requires therapeutic supplementation" }
    ],
    doctorNote: "In South India, B12 deficiency is extremely common due to dietary patterns. I frequently see patients presenting with unexplained neurological symptoms like tingling or burning feet who have serum B12 below 180 pg/mL. When B12 is borderline (150–210 pg/mL), I recommend testing serum Homocysteine or Methylmalonic Acid to confirm functional tissue deficiency before starting treatment.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "lipid-profile-test-bangalore": {
    title: "Lipid Profile Test Bangalore | Cholesterol Test | QXL",
    h1Title: "Lipid Profile & Cholesterol Test in Bangalore",
    subtitle: "Complete lipid panel measuring Total Cholesterol, HDL, LDL, VLDL, and Triglycerides for cardiovascular risk evaluation.",
    price: "650",
    oldPrice: "950",
    discountPercent: "31% OFF",
    parametersCount: "8 Parameters",
    sampleType: "Serum",
    fastingRequired: "10 to 12 hours strict overnight fasting required. Only water permitted.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "A lipid profile is a panel of biochemical tests measuring circulating fats (cholesterol and triglycerides) in blood to evaluate cardiovascular risk.",
      "Includes Total Cholesterol, High-Density Lipoprotein (HDL - 'good' cholesterol), Low-Density Lipoprotein (LDL - 'bad' cholesterol), Very Low-Density Lipoprotein (VLDL), and Triglycerides."
    ],
    whyImportant: [
      "Key screening tool for evaluating heart disease, hypertension, and stroke risk.",
      "Monitors effectiveness of diet, exercise, or lipid-lowering medication (statins).",
      "Processed using enzymatic clinical chemistry analyzers with strict NABL quality controls."
    ],
    faqs: [
      { question: "Do I need to fast for a lipid profile?", answer: "Yes, 10 to 12 hours of strict fasting is required for accurate triglyceride measurement and the Friedewald LDL calculation. Only plain water is permitted." },
      { question: "What is LDL cholesterol?", answer: "LDL (Low-Density Lipoprotein) is often called 'bad' cholesterol. High LDL contributes to arterial plaque buildup, increasing the risk of heart attack and stroke." },
      { question: "What is HDL cholesterol?", answer: "HDL (High-Density Lipoprotein) is 'good' cholesterol that transports cholesterol from arteries back to the liver. Higher HDL is protective against cardiovascular disease." },
      { question: "What does a high triglycerides level mean?", answer: "High triglycerides (>150 mg/dL) are associated with metabolic syndrome, obesity, alcohol intake, uncontrolled diabetes, and increased cardiovascular risk." },
      { question: "Can I book a lipid profile test at home in Bangalore?", answer: "Yes. QXL offers free home collection for the lipid profile with strict cold-chain transport. Ensure 10–12 hours of fasting before your phlebotomist arrives." }
    ],
    category: "Cardiovascular Health",
    clinicalSignificance: "Dyslipidaemia is a major modifiable cardiovascular risk factor. The lipid profile provides the foundation for ASCVD (atherosclerotic cardiovascular disease) risk stratification using total cholesterol, LDL, HDL, and triglycerides. At QXL Diagnostics, all lipid parameters are measured enzymatically on NABL-validated analysers, with LDL calculated using the Friedewald equation (when triglycerides <400 mg/dL) or direct measurement when indicated.",
    whenToTest: ["Family history of heart disease or stroke", "Diabetes or prediabetes", "Hypertension", "Obesity (BMI > 25)", "Routine annual check from age 35", "Monitoring statin or cholesterol-lowering therapy", "Fatty liver workup"],
    relatedTests: ["hs-crp-test-bangalore", "homocysteine-test-bangalore", "troponin-test-bangalore", "blood-sugar-test-bangalore", "liver-function-test-bangalore"],
    referenceRanges: [
      { label: "Total Cholesterol — Desirable",      range: "< 200",     unit: "mg/dL", interpretation: "normal" },
      { label: "Total Cholesterol — Borderline High",range: "200 – 239", unit: "mg/dL", interpretation: "borderline" },
      { label: "Total Cholesterol — High Risk",      range: "≥ 240",     unit: "mg/dL", interpretation: "abnormal" },
      { label: "LDL Cholesterol — Optimal",          range: "< 100",     unit: "mg/dL", interpretation: "normal" },
      { label: "LDL Cholesterol — Near-Optimal",     range: "100 – 129", unit: "mg/dL", interpretation: "normal" },
      { label: "LDL Cholesterol — Borderline High",  range: "130 – 159", unit: "mg/dL", interpretation: "borderline" },
      { label: "LDL Cholesterol — High",             range: "≥ 160",     unit: "mg/dL", interpretation: "abnormal" },
      { label: "HDL Cholesterol — Low (Risk Factor)",range: "< 40",      unit: "mg/dL", interpretation: "abnormal",   note: "Below 40 in men or 50 in women increases CV risk" },
      { label: "HDL Cholesterol — Optimal",          range: "≥ 60",      unit: "mg/dL", interpretation: "normal",     note: "Protective; reduces overall CV risk" },
      { label: "Triglycerides — Normal",             range: "< 150",     unit: "mg/dL", interpretation: "normal" },
      { label: "Triglycerides — Borderline High",    range: "150 – 199", unit: "mg/dL", interpretation: "borderline" },
      { label: "Triglycerides — High",               range: "≥ 200",     unit: "mg/dL", interpretation: "abnormal" }
    ],
    doctorNote: "I interpret the lipid panel as a risk profile, not isolated numbers. An LDL of 140 with an HDL of 55 and controlled diabetes is very different from the same LDL in a smoker with low HDL. I always look at the non-HDL cholesterol and the total cholesterol-to-HDL ratio as composite markers. In Indian patients, high triglycerides and low HDL is the most common pattern — often driven by refined carbohydrates rather than saturated fat.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "liver-function-test-bangalore": {
    title: "Liver Function Test Bangalore | LFT Test | QXL Diagnostics",
    h1Title: "Liver Function Test (LFT) in Bangalore",
    subtitle: "Evaluates liver enzymes (SGOT, SGPT, ALP, GGT), Bilirubin, Albumin, and Total Protein for hepatic health assessment.",
    price: "750",
    oldPrice: "1100",
    discountPercent: "31% OFF",
    parametersCount: "11 Parameters",
    sampleType: "Serum",
    fastingRequired: "8 hours fasting recommended for optimal serum clarity.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Liver Function Tests (LFT) assess liver enzyme activity, bilirubin metabolism, and protein synthesis to evaluate liver cell health and bile duct patency.",
      "Parameters include Total, Direct & Indirect Bilirubin, SGOT (AST), SGPT (ALT), Alkaline Phosphatase (ALP), Gamma-GT (GGT), Total Protein, Albumin, Globulin, and A/G Ratio."
    ],
    whyImportant: [
      "Screens for fatty liver disease, viral hepatitis, and liver inflammation.",
      "Monitors potential side-effects of long-term medications.",
      "Evaluates causes of jaundice, fatigue, and abdominal discomfort."
    ],
    faqs: [
      { question: "What does an LFT include?", answer: "Total Bilirubin, Direct Bilirubin, Indirect Bilirubin, SGOT (AST), SGPT (ALT), Alkaline Phosphatase (ALP), Gamma-GT (GGT), Total Protein, Albumin, Globulin, and A/G Ratio." },
      { question: "What does high SGPT/ALT mean?", answer: "Elevated SGPT indicates liver cell inflammation or injury, commonly caused by fatty liver (MASLD), alcohol, viral hepatitis, or hepatotoxic medications." },
      { question: "Do I need to fast for an LFT?", answer: "8 hours of overnight fasting is recommended for clear serum and accurate bilirubin/lipid parameters." },
      { question: "Can I book an LFT test at home in Bangalore?", answer: "Yes. QXL Diagnostics provides free home blood sample collection across all Bengaluru localities with same-day digital reports." }
    ],
    category: "Hepatic Diagnostics",
    clinicalSignificance: "Liver Function Tests (LFT) evaluate hepatocellular integrity (SGOT/SGPT), cholestatic biliary function (ALP/GGT), and hepatic synthetic capacity (Albumin/Total Protein). Non-alcoholic fatty liver disease (NAFLD/MASLD) has become a primary public health issue in urban Bengaluru. Transaminase elevations often serve as the first subclinical sign of hepatic steatosis or early fibrosis. QXL Diagnostics processes all LFT samples on NABL-validated automated clinical chemistry platforms.",
    whenToTest: ["Routine health checkup", "Unexplained fatigue or nausea", "Abdominal discomfort or right upper quadrant heaviness", "Jaundice or yellowing of eyes/skin", "Monitoring cholesterol/fatty liver treatment", "Long-term medication review (statins, painkillers, anti-TB)"],
    relatedTests: ["kidney-function-test-bangalore", "lipid-profile-test-bangalore", "cbc-test-bangalore", "hepatitis-b-test-bangalore", "hepatitis-c-test-bangalore"],
    referenceRanges: [
      { label: "Total Bilirubin",          range: "0.2 – 1.2",  unit: "mg/dL", interpretation: "normal" },
      { label: "Direct Bilirubin",         range: "0.0 – 0.3",  unit: "mg/dL", interpretation: "normal" },
      { label: "SGPT (ALT)",               range: "7 – 56",     unit: "U/L",   interpretation: "normal" },
      { label: "SGPT — Elevated (Fatty Liver)", range: "> 56",   unit: "U/L",   interpretation: "abnormal", note: "Commonly seen in fatty liver or alcohol intake" },
      { label: "SGOT (AST)",               range: "10 – 40",    unit: "U/L",   interpretation: "normal" },
      { label: "Alkaline Phosphatase (ALP)",range: "44 – 147",  unit: "U/L",   interpretation: "normal" },
      { label: "Gamma-GT (GGT)",           range: "9 – 48",     unit: "U/L",   interpretation: "normal" },
      { label: "Serum Albumin",            range: "3.5 – 5.0",  unit: "g/dL",  interpretation: "normal" },
      { label: "Globulin",                 range: "2.0 – 3.5",  unit: "g/dL",  interpretation: "normal" },
      { label: "A/G Ratio",                range: "1.1 – 2.2",  unit: "ratio", interpretation: "normal" }
    ],
    doctorNote: "When interpreting an LFT, I don't just look at SGPT in isolation — I assess the De Ritis ratio (AST/ALT ratio). An ALT higher than AST with elevated GGT strongly points to non-alcoholic fatty liver disease (NAFLD), whereas AST twice ALT suggests alcoholic or toxic etiology. Early detection through routine LFT allows patients to reverse fatty liver before permanent fibrosis occurs.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "kidney-function-test-bangalore": {
    title: "Kidney Function Test Bangalore | KFT | Creatinine | QXL",
    h1Title: "Kidney Function Test (KFT) in Bangalore",
    subtitle: "Measures Serum Creatinine, Blood Urea Nitrogen (BUN), Uric Acid, and Electrolytes (Sodium, Potassium) to evaluate renal filtration.",
    price: "690",
    oldPrice: "1000",
    discountPercent: "31% OFF",
    parametersCount: "10 Parameters",
    sampleType: "Serum & Plasma",
    fastingRequired: "No special fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Kidney Function Tests (KFT / RFT) evaluate renal filtration capacity and electrolyte balance using blood serum measurements.",
      "Includes Serum Creatinine, eGFR, Blood Urea Nitrogen (BUN), Urea, Uric Acid, Sodium, Potassium, Chloride, Calcium, and Phosphorus."
    ],
    whyImportant: [
      "Essential for individuals managing diabetes, high blood pressure, or kidney stone history.",
      "Creatinine & eGFR provide direct quantitative markers of renal filtration capacity.",
      "Monitors medication safety and electrolyte balance."
    ],
    faqs: [
      { question: "What parameters are included in a KFT?", answer: "Serum Creatinine, eGFR, Blood Urea Nitrogen (BUN), Serum Urea, Uric Acid, Sodium, Potassium, Chloride, Calcium, and Phosphorus." },
      { question: "What is eGFR and why is it important?", answer: "eGFR (estimated Glomerular Filtration Rate) calculates kidney filtering capacity based on creatinine, age, and sex. An eGFR above 90 is normal; below 60 indicates reduced kidney function." },
      { question: "Do I need to fast for a KFT?", answer: "No fasting is required, though adequate hydration before sample collection is recommended." },
      { question: "Can I book a KFT test at home in Bangalore?", answer: "Yes. QXL Diagnostics provides free doorstep collection for KFT across all Bengaluru localities." }
    ],
    category: "Renal Diagnostics",
    clinicalSignificance: "Kidney Function Tests (KFT) evaluate renal filtration, nitrogenous waste clearance, and electrolyte balance. Diabetic kidney disease (diabetic nephropathy) and hypertensive nephrosclerosis develop insidiously without early clinical symptoms. Routine monitoring of serum creatinine and eGFR allows early identification of chronic kidney disease (CKD). QXL Diagnostics calculates CKD-EPI eGFR automatically on all KFT reports.",
    whenToTest: ["Hypertension or high blood pressure monitoring", "Diabetes or prediabetes annual screening", "Kidney stone history or flank pain", "Swelling in feet, ankles, or under eyes (edema)", "Long-term NSAID or painkiller medication use", "Routine preventive health checkup"],
    relatedTests: ["creatinine-test-bangalore", "uric-acid-test-bangalore", "liver-function-test-bangalore", "urine-test-bangalore", "urine-microalbumin-test-bangalore"],
    referenceRanges: [
      { label: "Serum Creatinine — Men",   range: "0.7 – 1.3",  unit: "mg/dL", interpretation: "normal" },
      { label: "Serum Creatinine — Women", range: "0.6 – 1.1",  unit: "mg/dL", interpretation: "normal" },
      { label: "Creatinine — Elevated",    range: "> 1.3",      unit: "mg/dL", interpretation: "abnormal", note: "Indicates impaired renal clearance" },
      { label: "eGFR — Normal (Stage 1)",  range: "≥ 90",       unit: "mL/min/1.73m²", interpretation: "normal" },
      { label: "eGFR — Mildly Decreased (Stage 2)", range: "60 – 89", unit: "mL/min/1.73m²", interpretation: "borderline" },
      { label: "eGFR — Moderate Decrease (Stage 3)", range: "30 – 59", unit: "mL/min/1.73m²", interpretation: "abnormal", note: "Requires nephrology or physician evaluation" },
      { label: "Blood Urea Nitrogen (BUN)",range: "7 – 20",     unit: "mg/dL", interpretation: "normal" },
      { label: "Serum Sodium (Na+)",       range: "136 – 145",  unit: "mEq/L", interpretation: "normal" },
      { label: "Serum Potassium (K+)",     range: "3.5 – 5.1",  unit: "mEq/L", interpretation: "normal" },
      { label: "Potassium — High (Hyperkalaemia)", range: "> 5.5", unit: "mEq/L", interpretation: "abnormal", note: "Critical value requiring urgent clinical alert" }
    ],
    doctorNote: "In diabetic and hypertensive patients, relying on Serum Creatinine alone can miss early renal decline because creatinine stays within normal limits until over 50% of nephrons are lost. That is why QXL automatically includes eGFR calculation on every KFT report. For complete renal protection, I always advise diabetic patients to pair their annual KFT with a Spot Urine Microalbumin-to-Creatinine Ratio.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "dengue-test-bangalore": {
    title: "Dengue Test Bangalore | NS1, IgM & Dengue Testing | QXL",
    h1Title: "Dengue Blood Test in Bangalore",
    subtitle: "Rapid NABL-accredited diagnostic screening for acute Dengue infection including Dengue NS1 Antigen, IgM & IgG Antibodies, and Complete Platelet Count.",
    price: "600",
    oldPrice: "900",
    discountPercent: "33% OFF",
    parametersCount: "NS1 / IgM / IgG / Platelets",
    sampleType: "Serum & Whole Blood",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (3–6 Hours)",
    overview: [
      "Dengue laboratory testing identifies acute Dengue virus infection based on symptom duration using NS1 antigen testing (Days 1–7) or IgM antibody testing (After Day 7).",
      "Includes complete platelet count monitoring essential for tracking clinical dengue recovery."
    ],
    whyImportant: [
      "Detects early Dengue NS1 antigen during initial fever days.",
      "Provides fast 3–6 hour report turnaround for urgent clinical management.",
      "Accompanied by daily platelet count monitoring option."
    ],
    faqs: [
      { question: "Which Dengue test should I take on Day 1 of fever?", answer: "Dengue NS1 Antigen test is recommended during the first 1 to 7 days of fever for early virus detection." },
      { question: "When is Dengue IgM / IgG antibody testing needed?", answer: "Dengue IgM antibodies develop after Day 5 of fever, indicating recent acute infection. IgG indicates past infection or immunity." },
      { question: "How fast will I get my Dengue test report?", answer: "Dengue samples are given high priority at QXL and processed in 3 to 6 hours with immediate digital PDF delivery." },
      { question: "Does QXL provide home sample collection for Dengue fever?", answer: "Yes. Phlebotomists visit your home across Bengaluru with cold-chain transport kits for safe sample processing." }
    ],
    category: "Infectious Disease Testing",
    clinicalSignificance: "Dengue virus infection is endemic in Bengaluru, with seasonal peaks during monsoon and post-monsoon months. Rapid laboratory confirmation differentiates Dengue from Typhoid, Chikungunya, and Malaria. Dengue NS1 antigen is detectable from Day 1 of symptoms. Serial monitoring of Complete Blood Count (CBC) with absolute platelet counts and hematocrit is vital for detecting plasma leakage and severe thrombocytopenia.",
    whenToTest: ["High fever (101°F+) with severe body aches", "Severe pain behind eyes (retro-orbital pain)", "Joint & muscle pain ('breakbone fever')", "Skin rash or petechiae", "Falling platelet count on CBC", "Sudden weakness or nausea during fever"],
    relatedTests: ["cbc-test-bangalore", "crp-test-bangalore", "typhoid-test-bangalore", "malaria-test-bangalore", "esr-test-bangalore"],
    referenceRanges: [
      { label: "Dengue NS1 Antigen",        range: "Negative",  unit: "Qualitative", interpretation: "normal" },
      { label: "Dengue NS1 — Positive",     range: "Positive",  unit: "Qualitative", interpretation: "abnormal", note: "Confirms acute Dengue infection (Days 1–7)" },
      { label: "Dengue IgM Antibody",       range: "Negative",  unit: "Index",       interpretation: "normal" },
      { label: "Dengue IgM — Positive",      range: "Positive",  unit: "Index",       interpretation: "abnormal", note: "Indicates recent acute Dengue infection (>Day 5)" },
      { label: "Platelet Count — Normal",   range: "1.5 – 4.0", unit: "Lakhs/µL",   interpretation: "normal" },
      { label: "Platelet Count — Warning",  range: "50k – 1.0L",unit: "/µL",        interpretation: "borderline", note: "Requires daily CBC monitoring" },
      { label: "Platelet Count — Critical", range: "< 50,000",  unit: "/µL",        interpretation: "abnormal",   note: "High risk of bleeding; medical alert" }
    ],
    doctorNote: "During Dengue season in Bengaluru, timing is everything. Dengue NS1 is highly accurate during the first 5 days of fever, whereas IgM antibodies only peak after Day 7. I always advise patients to monitor Platelet Count and Hematocrit (PCV) daily — a rising PCV with dropping platelets indicates hemoconcentration and plasma leakage, which requires immediate fluid management.",
    doctorSlug: "dr-ajitha-pillai",
    doctorName: "Dr. Ajitha Pillai",
    doctorQuals: "MD Microbiology"
  },
  "tsh-test-bangalore": {
    title: "TSH Test in Bangalore | Thyroid Blood Test | QXL Diagnostics",
    h1Title: "TSH – Thyroid Stimulating Hormone Test in Bangalore",
    subtitle: "TSH is produced by the pituitary gland to regulate thyroid activity. It is the primary first-line laboratory test used to assess underactive (hypothyroidism) or overactive (hyperthyroidism) thyroid function.",
    price: "350",
    oldPrice: "500",
    discountPercent: "30% OFF",
    parametersCount: "TSH Quantitative",
    sampleType: "Serum",
    fastingRequired: "Usually no fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "TSH, or thyroid stimulating hormone, is produced by the pituitary gland and helps regulate the thyroid gland. The thyroid produces hormones that affect metabolism, body temperature, heart rate, energy levels, digestion and many other functions.",
      "Because of the feedback loop between the pituitary and thyroid, TSH is commonly used as an initial laboratory test when assessing thyroid function. An elevated TSH may occur with an underactive thyroid, while a low TSH may occur with an overactive thyroid."
    ],
    whyImportant: [
      "First-line screening test for thyroid dysfunction.",
      "Essential for evaluating fatigue, weight changes, cold/heat intolerance, and hair fall.",
      "Monitors levothyroxine thyroid hormone replacement therapy."
    ],
    faqs: [
      { question: "Does TSH require fasting?", answer: "Usually no routine fasting is required." },
      { question: "What does high TSH mean?", answer: "It commonly occurs with hypothyroidism (underactive thyroid) but requires clinical interpretation." },
      { question: "What does low TSH mean?", answer: "It may occur with hyperthyroidism (overactive thyroid) or other pituitary situations." },
      { question: "Can pregnancy affect TSH?", answer: "Yes, pregnancy-specific reference ranges may be required." }
    ],
    category: "Thyroid & Endocrinology"
  },
  "fasting-blood-sugar-test-bangalore": {
    title: "Fasting Blood Sugar Test Bangalore | FBS/FPG | QXL",
    h1Title: "Fasting Blood Sugar Test in Bangalore",
    subtitle: "Measures fasting plasma glucose after an 8-hour overnight fast for diabetes and prediabetes screening and blood sugar monitoring.",
    price: "150",
    oldPrice: "250",
    discountPercent: "40% OFF",
    parametersCount: "Fasting Plasma Glucose",
    sampleType: "Fluoride Plasma",
    fastingRequired: "Strict 8 to 10 hours overnight fasting required. Water permitted.",
    turnaroundTime: "Same Day (4 Hours)",
    overview: [
      "A fasting plasma glucose test measures the concentration of glucose in blood after a period without caloric intake. Glucose is the body's principal circulating sugar and an important source of energy.",
      "For diagnostic fasting plasma glucose testing, fasting generally means having no caloric intake for at least eight hours. Plain water is permitted."
    ],
    whyImportant: [
      "Primary laboratory test for diabetes and prediabetes screening.",
      "Monitors glucose control in individuals with diabetes.",
      "Processed in fluoride vacuum tubes to prevent ex-vivo glycolysis."
    ],
    faqs: [
      { question: "How long should I fast?", answer: "At least eight hours of overnight fasting is required." },
      { question: "Can I drink water?", answer: "Yes, plain water is permitted during fasting." },
      { question: "What is the difference between fasting and random glucose?", answer: "Fasting glucose requires an 8-hour fast; random glucose can be drawn at any time." }
    ],
    category: "Diabetes Diagnostics"
  },
  "creatinine-test-bangalore": {
    title: "Creatinine Test in Bangalore | Kidney Function Test | QXL",
    h1Title: "Serum Creatinine Test in Bangalore",
    subtitle: "Serum Creatinine measurement is used to calculate eGFR and evaluate renal filtration in patients with hypertension, diabetes, or kidney concerns.",
    price: "250",
    oldPrice: "400",
    discountPercent: "37% OFF",
    parametersCount: "Serum Creatinine & eGFR",
    sampleType: "Serum",
    fastingRequired: "Usually no fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Creatinine is a waste product generated largely from normal muscle metabolism. It enters the bloodstream and is filtered primarily through the kidneys.",
      "A serum creatinine test is used with age and sex to calculate estimated glomerular filtration rate (eGFR) for renal filtration assessment."
    ],
    whyImportant: [
      "Key renal filtration marker for diabetes and hypertension monitoring.",
      "Calculates estimated Glomerular Filtration Rate (eGFR).",
      "Crucial for checking renal safety prior to CT contrast or specific medications."
    ],
    faqs: [
      { question: "What does serum creatinine measure?", answer: "Serum Creatinine measures a breakdown waste product of muscle tissue filtered by the kidneys, serving as a key quantitative renal marker." },
      { question: "What is a normal creatinine level?", answer: "0.7 to 1.3 mg/dL for men and 0.6 to 1.1 mg/dL for women. Values vary slightly by muscle mass and age." },
      { question: "Does high creatinine always mean kidney failure?", answer: "Not necessarily. Dehydration, intense physical exercise, high red meat consumption, or certain medications can cause temporary creatinine elevations." },
      { question: "Is fasting required for a Creatinine test?", answer: "No fasting is required for a serum creatinine blood test." }
    ],
    category: "Renal Diagnostics",
    clinicalSignificance: "Serum Creatinine is the standard biochemical marker used to assess renal excretory function and calculate estimated Glomerular Filtration Rate (eGFR). Because muscle mass generates creatinine at a constant daily rate, elevated serum concentrations reflect reduced glomerular filtration. Creatinine is routinely monitored before administering IV contrast materials for CT scans and when initiating nephrotoxic medications.",
    whenToTest: ["Pre-CT scan contrast safety check", "Hypertension or diabetes monitoring", "Swelling in legs, ankles, or face", "Changes in urination frequency or color", "Medication dosage adjustment (NSAIDs, antibiotics)"],
    relatedTests: ["kidney-function-test-bangalore", "uric-acid-test-bangalore", "urine-test-bangalore", "blood-sugar-test-bangalore"],
    referenceRanges: [
      { label: "Serum Creatinine — Adult Men",   range: "0.7 – 1.3", unit: "mg/dL", interpretation: "normal" },
      { label: "Serum Creatinine — Adult Women", range: "0.6 – 1.1", unit: "mg/dL", interpretation: "normal" },
      { label: "Borderline Elevation",           range: "1.2 – 1.5", unit: "mg/dL", interpretation: "borderline", note: "eGFR evaluation recommended" },
      { label: "High Creatinine",                range: "> 1.5",     unit: "mg/dL", interpretation: "abnormal",   note: "Significant renal impairment; doctor consultation needed" }
    ],
    doctorNote: "Serum Creatinine is simple, accurate, and essential. However, in elderly patients with low muscle mass, a 'normal' serum creatinine of 1.0 mg/dL may actually mask an eGFR below 50 mL/min. At QXL, we always compute age and sex-adjusted eGFR to prevent under-diagnosing early renal dysfunction.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "cholesterol-test-bangalore": {
    title: "Cholesterol Test in Bangalore | Heart Risk Blood Test | QXL",
    h1Title: "Cholesterol Blood Test in Bangalore",
    subtitle: "Measures Total Cholesterol in blood to assess cardiovascular wellness and atherogenic lipid risk.",
    price: "295",
    oldPrice: "450",
    discountPercent: "34% OFF",
    parametersCount: "Total Cholesterol",
    sampleType: "Serum",
    fastingRequired: "10 to 12 hours fasting recommended when combined with full lipid profile.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Cholesterol is an essential lipid for cell membranes and hormone synthesis, but elevated levels of atherogenic particles contribute to cardiovascular disease.",
      "A total cholesterol test measures overall blood cholesterol. For a complete assessment, ordering a full Lipid Profile (measuring HDL, LDL, and Triglycerides) is recommended."
    ],
    whyImportant: [
      "Essential screening for cardiovascular health and lipid risk.",
      "Monitors dietary changes and cholesterol-lowering treatment.",
      "Prominently linked with QXL Lipid Profile Test for complete breakdown."
    ],
    faqs: [
      { question: "Does high cholesterol cause symptoms?", answer: "Usually no, which is why periodic blood testing is recommended." },
      { question: "Is total cholesterol enough?", answer: "A full lipid profile (including LDL and HDL) provides a much more complete cardiac risk picture." }
    ],
    category: "Cardiovascular Health"
  },
  "crp-test-bangalore": {
    title: "CRP Test Bangalore | C-Reactive Protein Test | QXL Diagnostics",
    h1Title: "C-Reactive Protein (CRP) Test in Bangalore",
    subtitle: "Measures acute-phase reactant C-reactive protein in serum to detect and monitor systemic inflammation, infection, or tissue injury.",
    price: "450",
    oldPrice: "700",
    discountPercent: "35% OFF",
    parametersCount: "CRP Quantitative",
    sampleType: "Serum",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "C-reactive protein (CRP) is an acute-phase protein produced primarily by the liver in response to systemic inflammation. Blood CRP levels rise rapidly during acute infection or inflammatory flares.",
      "CRP provides a quantitative indicator of systemic inflammation, helping clinicians track disease activity and treatment response over time."
    ],
    whyImportant: [
      "Sensitive marker for acute bacterial infections and inflammatory conditions.",
      "Monitors treatment progress in autoimmune and inflammatory disorders.",
      "Distinguished from high-sensitivity hs-CRP used for cardiac risk."
    ],
    faqs: [
      { question: "What does high CRP mean?", answer: "High CRP (C-Reactive Protein) indicates acute systemic inflammation in the body from bacterial infection, tissue injury, or autoimmune flares." },
      { question: "Is CRP different from hs-CRP?", answer: "Yes. Standard CRP measures higher inflammatory levels (>5 mg/L) for infections and autoimmune disease. High-sensitivity hs-CRP measures low baseline levels (0.5–5 mg/L) for cardiac risk." },
      { question: "Does CRP require fasting?", answer: "No fasting is required for a CRP blood test." },
      { question: "Can I book a CRP test at home in Bangalore?", answer: "Yes. QXL Diagnostics provides free doorstep collection for CRP with same-day digital reports." }
    ],
    category: "Inflammatory & Infection Diagnostics",
    clinicalSignificance: "C-reactive protein (CRP) is an acute-phase reactant synthesized by the liver within 6 hours of an inflammatory stimulus, rising up to 1,000-fold during severe infection. Unlike ESR, CRP rises rapidly and falls quickly once inflammation resolves, making it an ideal real-time marker for monitoring response to antibiotic or anti-inflammatory treatment.",
    whenToTest: ["Acute bacterial fever or infection workup", "Post-surgical infection screening", "Rheumatoid arthritis or lupus flare-up monitoring", "Inflammatory bowel disease (IBD) evaluation"],
    relatedTests: ["esr-test-bangalore", "cbc-test-bangalore", "ana-test-bangalore", "rheumatoid-factor-test-bangalore", "hs-crp-test-bangalore"],
    referenceRanges: [
      { label: "Normal CRP",                 range: "< 5.0",      unit: "mg/L", interpretation: "normal" },
      { label: "Mildly Elevated",            range: "5.0 – 10.0", unit: "mg/L", interpretation: "borderline", note: "Mild viral infection, exercise, or minor inflammation" },
      { label: "Moderate Elevation",         range: "10.0 – 50.0",unit: "mg/L", interpretation: "abnormal",   note: "Bacterial infection or systemic inflammatory flare" },
      { label: "Severe Elevation",           range: "> 50.0",     unit: "mg/L", interpretation: "abnormal",   note: "Severe acute bacterial infection or tissue necrosis" }
    ],
    doctorNote: "CRP is one of the most useful real-time biomarkers in clinical medicine. In acute fever, a CRP above 40 mg/L strongly points to a bacterial infection rather than viral. Because CRP has a half-life of ~19 hours, dropping CRP levels give us early confidence that antibiotic therapy is working.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "esr-test-bangalore": {
    title: "ESR Test in Bangalore | Sedimentation Rate | QXL Diagnostics",
    h1Title: "ESR – Erythrocyte Sedimentation Rate Test in Bangalore",
    subtitle: "Measures the rate at which red blood cells settle over one hour to assess systemic inflammatory activity in the body.",
    price: "150",
    oldPrice: "250",
    discountPercent: "40% OFF",
    parametersCount: "ESR (Westergren)",
    sampleType: "Anticoagulated Whole Blood",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (4 Hours)",
    overview: [
      "Erythrocyte sedimentation rate (ESR) measures how rapidly red blood cells settle in a vertical tube of anticoagulated blood over one hour.",
      "Increased plasma inflammatory proteins cause red blood cells to aggregate and settle faster, resulting in an elevated ESR value."
    ],
    whyImportant: [
      "Classic, established laboratory marker for investigating inflammatory conditions.",
      "Useful in evaluating rheumatoid arthritis, polymyalgia rheumatica, and chronic infections.",
      "Often tested alongside CBC and CRP for complementary inflammatory insights."
    ],
    faqs: [
      { question: "What does ESR measure?", answer: "Erythrocyte Sedimentation Rate (ESR) measures how quickly red blood cells settle at the bottom of a vertical tube in one hour, indicating systemic inflammation." },
      { question: "Why is ESR tested along with CRP?", answer: "ESR reflects long-term chronic inflammation over weeks, while CRP reflects acute real-time inflammation over days. Testing both provides a complete picture." },
      { question: "Does ESR require fasting?", answer: "No fasting is required for an ESR test." }
    ],
    category: "Inflammatory Diagnostics",
    clinicalSignificance: "Erythrocyte Sedimentation Rate (ESR) is a classic hematological marker of systemic inflammation. Fibrinogen and immunoglobulin proteins cause red blood cells to form rouleaux stacks that settle rapidly under gravity. ESR is elevated in autoimmune conditions (Rheumatoid Arthritis, Polymyalgia Rheumatica, Lupus), chronic infections (Tuberculosis), and malignancies.",
    whenToTest: ["Joint pain, morning stiffness, or arthritis", "Unexplained prolonged fever or weight loss", "Suspected autoimmune disease or vasculitis", "Tuberculosis workup or monitoring"],
    relatedTests: ["crp-test-bangalore", "cbc-test-bangalore", "rheumatoid-factor-test-bangalore", "anti-ccp-test-bangalore", "ana-test-bangalore"],
    referenceRanges: [
      { label: "Normal ESR — Men (< 50 yrs)",   range: "< 15",   unit: "mm/hr", interpretation: "normal" },
      { label: "Normal ESR — Women (< 50 yrs)", range: "< 20",   unit: "mm/hr", interpretation: "normal" },
      { label: "Normal ESR — Men (> 50 yrs)",   range: "< 20",   unit: "mm/hr", interpretation: "normal" },
      { label: "Normal ESR — Women (> 50 yrs)", range: "< 30",   unit: "mm/hr", interpretation: "normal" },
      { label: "Elevated ESR",                 range: "> 30",   unit: "mm/hr", interpretation: "abnormal", note: "Indicates active inflammatory or infectious process" },
      { label: "Markedly Elevated ESR",        range: "> 100",  unit: "mm/hr", interpretation: "abnormal", note: "Strong association with vasculitis, severe infection, or myeloma" }
    ],
    doctorNote: "Although ESR is non-specific, an ESR exceeding 100 mm/hr is a key red flag that demands thorough investigation for conditions like Polymyalgia Rheumatica, Temporal Arteritis, Multiple Myeloma, or occult Tuberculosis.",
    doctorSlug: "dr-naveen-kumar-n",
    doctorName: "Dr. Naveen Kumar N",
    doctorQuals: "DCP, DNB Pathology"
  },
  "uric-acid-test-bangalore": {
    title: "Uric Acid Test Bangalore | Gout Blood Test | QXL Diagnostics",
    h1Title: "Serum Uric Acid Test in Bangalore",
    subtitle: "Measures serum urate levels to evaluate hyperuricaemia, gout joint pain, and kidney stone risk.",
    price: "250",
    oldPrice: "400",
    discountPercent: "37% OFF",
    parametersCount: "Serum Uric Acid",
    sampleType: "Serum",
    fastingRequired: "Follow physician instructions; 4 hours fasting recommended.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Uric acid is a waste product formed during purine breakdown in the body, normally excreted by the kidneys into urine.",
      "Persistently high serum uric acid (hyperuricaemia) can lead to urate crystal deposition in joints (gout) and contribute to certain kidney stones."
    ],
    whyImportant: [
      "Essential evaluation for joint swelling, intense big toe pain, or suspected gout.",
      "Monitors urate-lowering medication (allopurinol / febuxostat).",
      "Evaluates purine breakdown in renal and metabolic conditions."
    ],
    faqs: [
      { question: "What causes high Uric Acid?", answer: "Diets high in purines (red meat, seafood, beer), obesity, kidney dysfunction, high fructose intake, or metabolic syndrome." },
      { question: "Can high Uric Acid cause joint pain?", answer: "Yes. Urate crystals can deposit in joint fluid, causing sudden intense joint inflammation known as Gout (commonly affecting the big toe)." },
      { question: "Is fasting required for a Uric Acid test?", answer: "A 4-hour fast is recommended for optimal serum accuracy." }
    ],
    category: "Metabolic & Joint Diagnostics",
    clinicalSignificance: "Serum Uric Acid is the end-product of purine nucleotide metabolism in humans. Hyperuricaemia (serum urate > 6.8 mg/dL) exceeds urate solubility limits, predisposing to monosodium urate crystal deposition in synovial joints (gouty arthritis) and renal tubules (urate kidney stones). Uric acid is also an independent risk factor for metabolic syndrome and hypertension.",
    whenToTest: ["Sudden severe joint pain and redness (especially big toe, ankle, or knee)", "Kidney stone history", "Monitoring allopurinol or febuxostat urate-lowering therapy", "Metabolic syndrome workup"],
    relatedTests: ["kidney-function-test-bangalore", "creatinine-test-bangalore", "crp-test-bangalore", "esr-test-bangalore"],
    referenceRanges: [
      { label: "Serum Uric Acid — Men",   range: "3.5 – 7.2", unit: "mg/dL", interpretation: "normal" },
      { label: "Serum Uric Acid — Women", range: "2.6 – 6.0", unit: "mg/dL", interpretation: "normal" },
      { label: "Hyperuricaemia (High)",   range: "> 7.2",     unit: "mg/dL", interpretation: "abnormal", note: "Increased risk of gout flares and renal urate stones" }
    ],
    doctorNote: "Intense pain in the big toe (podagra) waking a patient at night is classic for gout. However, during an acute gout flare, serum uric acid can actually drop temporarily as urate crystals deposit into the joint. I always re-test uric acid 2–4 weeks after the acute inflammation settles.",
    doctorSlug: "dr-shantakumar-muruda",
    doctorName: "Dr. Shantakumar Muruda",
    doctorQuals: "MD Biochemistry, NABL Lead Assessor"
  },
  "testosterone-test-bangalore": {
    title: "Testosterone Test Bangalore | Male Hormone Blood Test | QXL",
    h1Title: "Testosterone Blood Test in Bangalore",
    subtitle: "Measures Total Testosterone levels in serum. Early morning collection is recommended for evaluating male hypogonadism and hormone balance.",
    price: "750",
    oldPrice: "1200",
    discountPercent: "37% OFF",
    parametersCount: "Total Testosterone",
    sampleType: "Serum",
    fastingRequired: "Early morning fasting collection (7 AM – 10 AM) strongly recommended.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Testosterone is the primary androgenic hormone produced mainly by the testes in men and in smaller quantities by ovaries and adrenal glands in women.",
      "Blood testosterone concentrations follow a diurnal rhythm, peaking in the early morning. Diagnostic evaluation for male hypogonadism requires early morning testing."
    ],
    whyImportant: [
      "Evaluates symptoms of low testosterone (fatigue, reduced muscle mass, erectile dysfunction).",
      "Essential component of male fertility and endocrine workups.",
      "NABL-validated immunoassay platform ensuring high clinical accuracy."
    ],
    faqs: [
      { question: "What time of day should testosterone be tested?", answer: "Early morning (7 AM to 10 AM) is strongly recommended when evaluating male testosterone deficiency." },
      { question: "Is one low result enough to diagnose deficiency?", answer: "No, clinical guidelines recommend confirming low levels with a repeat early morning test." }
    ],
    category: "Hormone & Endocrinology"
  },
  "prolactin-test-bangalore": {
    title: "Prolactin Test Bangalore | PRL Hormone Test | QXL Diagnostics",
    h1Title: "Prolactin Blood Test in Bangalore",
    subtitle: "Measures serum prolactin hormone levels to evaluate hyperprolactinaemia, galactorrhoea, pituitary conditions, and menstrual irregularities.",
    price: "450",
    oldPrice: "700",
    discountPercent: "35% OFF",
    parametersCount: "Serum Prolactin",
    sampleType: "Serum",
    fastingRequired: "Morning collection 2 to 3 hours after waking recommended.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Prolactin is a peptide hormone synthesized and secreted by lactotroph cells in the anterior pituitary gland.",
      "Persistent hyperprolactinaemia can suppress gonadotropin-releasing hormone, causing reproductive hormone disruption, irregular periods, galactorrhoea, or fertility concerns."
    ],
    whyImportant: [
      "Investigates unexplained milk secretion (galactorrhoea) and menstrual irregularities.",
      "Evaluates male fertility concerns and decreased libido.",
      "Monitors pituitary microadenoma or dopamine agonist therapy."
    ],
    faqs: [
      { question: "When should prolactin blood samples be drawn?", answer: "Samples should ideally be drawn in the morning, 2 to 3 hours after waking up, resting quietly before the draw." },
      { question: "Can stress affect prolactin levels?", answer: "Yes, physical and emotional stress, exercise, and sleep disruption can temporarily elevate prolactin." }
    ],
    category: "Pituitary & Reproductive Endocrinology"
  },
  "free-t3-test-bangalore": {
    title: "Free T3 Test in Bangalore | FT3 Thyroid Test | QXL Diagnostics",
    h1Title: "Free T3 (FT3) Test in Bangalore",
    subtitle: "Measures unbound triiodothyronine (FT3) circulating in blood to evaluate thyroid function, particularly suspected hyperthyroidism and T3 toxicosis.",
    price: "450",
    oldPrice: "700",
    discountPercent: "35% OFF",
    parametersCount: "Free T3 Quantitative",
    sampleType: "Serum",
    fastingRequired: "Usually no fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Free T3 measures the unbound fraction of triiodothyronine circulating in blood. T3 is one of the principal thyroid hormones and has important effects on metabolism, heart rate, temperature regulation and energy use.",
      "FT3 is generally interpreted together with TSH and Free T4. It is particularly useful in selected patients with suspected hyperthyroidism when T3 concentrations may rise disproportionately."
    ],
    whyImportant: [
      "Evaluates suspected hyperthyroidism and T3 thyrotoxicosis.",
      "Monitors antithyroid drug therapy.",
      "Interpreted alongside TSH and Free T4 for complete thyroid hormone status."
    ],
    faqs: [
      { question: "What is Free T3?", answer: "Free T3 measures the active, unbound triiodothyronine hormone circulating in your blood." },
      { question: "What is the difference between T3 and Free T3?", answer: "Total T3 measures both bound and unbound hormone; Free T3 measures only the biologically active unbound fraction." }
    ],
    category: "Thyroid & Endocrinology"
  },
  "free-t4-test-bangalore": {
    title: "Free T4 Test Bangalore | FT4 Thyroid Blood Test | QXL",
    h1Title: "Free T4 (FT4) Test in Bangalore",
    subtitle: "Measures unbound thyroxine (FT4) circulating in blood to evaluate thyroid gland output alongside TSH.",
    price: "450",
    oldPrice: "700",
    discountPercent: "35% OFF",
    parametersCount: "Free T4 Quantitative",
    sampleType: "Serum",
    fastingRequired: "Usually no fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Free T4 measures the fraction of thyroxine circulating in blood that is not bound to transport proteins. It is one of the most useful tests for assessing thyroid function together with TSH.",
      "When TSH is abnormal, Free T4 helps determine whether thyroid hormone concentrations are increased, reduced or within the expected range."
    ],
    whyImportant: [
      "Direct measure of active thyroxine output from the thyroid gland.",
      "Crucial for diagnosing hypothyroidism and hyperthyroidism.",
      "Monitors levothyroxine medication dosage adjustments."
    ],
    faqs: [
      { question: "Why are TSH and FT4 tested together?", answer: "TSH indicates pituitary stimulation, while FT4 shows actual thyroid hormone production; testing both gives a complete picture." },
      { question: "Should I take levothyroxine before my FT4 test?", answer: "Ask your treating physician; some doctors prefer blood drawn before taking morning thyroid medication." }
    ],
    category: "Thyroid & Endocrinology"
  },
  "anti-tpo-test-bangalore": {
    title: "Anti-TPO Test Bangalore | Thyroid Antibody Test | QXL",
    h1Title: "Anti-TPO Thyroid Antibody Test in Bangalore",
    subtitle: "Measures Anti-Thyroid Peroxidase autoantibodies in serum to diagnose autoimmune thyroid disease such as Hashimoto's thyroiditis and Graves' disease.",
    price: "750",
    oldPrice: "1200",
    discountPercent: "37% OFF",
    parametersCount: "Anti-TPO Autoantibodies",
    sampleType: "Serum",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Thyroid peroxidase is an enzyme involved in thyroid hormone production. Anti-TPO antibodies develop when the immune system produces antibodies directed against this thyroid enzyme.",
      "Elevated Anti-TPO antibodies are strongly associated with autoimmune thyroid conditions, particularly Hashimoto thyroiditis, and may also occur in Graves disease."
    ],
    whyImportant: [
      "Confirms underlying autoimmune cause of hypothyroidism (Hashimoto's thyroiditis).",
      "Assesses risk of developing overt thyroid dysfunction in subclinical hypothyroidism.",
      "Important evaluation during recurrent pregnancy loss or fertility workups."
    ],
    faqs: [
      { question: "Does positive Anti-TPO mean Hashimoto disease?", answer: "High Anti-TPO antibodies strongly suggest an autoimmune etiology such as Hashimoto's thyroiditis." },
      { question: "Can Anti-TPO be positive with normal TSH?", answer: "Yes, antibodies can be elevated for years before TSH levels become abnormal." }
    ],
    category: "Thyroid & Autoimmune Diagnostics"
  },
  "anti-thyroglobulin-antibody-test-bangalore": {
    title: "Anti-Thyroglobulin Antibody Test Bangalore | QXL",
    h1Title: "Anti-Thyroglobulin Antibody Test in Bangalore",
    subtitle: "Measures serum anti-thyroglobulin (TgAb) autoantibodies to assist in thyroid autoimmune assessment and thyroglobulin cancer surveillance.",
    price: "750",
    oldPrice: "1200",
    discountPercent: "37% OFF",
    parametersCount: "Anti-Thyroglobulin Antibodies",
    sampleType: "Serum",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Thyroglobulin is a protein produced by thyroid follicular cells. Anti-thyroglobulin antibodies (TgAb) are autoantibodies directed against this protein.",
      "They can occur in autoimmune thyroid disorders such as Hashimoto thyroiditis and Graves disease, and are essential for ensuring accurate interpretation of thyroglobulin testing in thyroid cancer follow-up."
    ],
    whyImportant: [
      "Complementary marker for autoimmune thyroiditis alongside Anti-TPO.",
      "Essential pre-requisite for interpreting Thyroglobulin (Tg) tumor marker assays.",
      "Processed on high-sensitivity automated immunoassay analyzer platforms."
    ],
    faqs: [
      { question: "Is Anti-Tg the same as Anti-TPO?", answer: "No, Anti-Tg targets thyroglobulin protein, while Anti-TPO targets the thyroid peroxidase enzyme." }
    ],
    category: "Thyroid & Autoimmune Diagnostics"
  },
  "fasting-insulin-test-bangalore": {
    title: "Fasting Insulin Test Bangalore | Insulin Resistance | QXL",
    h1Title: "Fasting Insulin Blood Test in Bangalore",
    subtitle: "Measures fasting serum insulin levels to evaluate hyperinsulinaemia, insulin resistance, metabolic syndrome, and PCOS.",
    price: "550",
    oldPrice: "900",
    discountPercent: "38% OFF",
    parametersCount: "Fasting Serum Insulin",
    sampleType: "Serum",
    fastingRequired: "Strict 8 to 10 hours overnight fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Insulin is a peptide hormone produced by pancreatic beta cells that facilitates cellular glucose uptake.",
      "Fasting insulin measurement is used alongside fasting glucose to evaluate hyperinsulinaemia and calculate insulin resistance indices (HOMA-IR)."
    ],
    whyImportant: [
      "Detects early compensatory hyperinsulinaemia before blood glucose levels rise.",
      "Essential component of metabolic syndrome and PCOS evaluations.",
      "Combines with fasting glucose for HOMA-IR calculation."
    ],
    faqs: [
      { question: "Does high fasting insulin mean insulin resistance?", answer: "Elevated fasting insulin often reflects compensatory pancreatic secretion in response to cellular insulin resistance." },
      { question: "How long should I fast for insulin testing?", answer: "An 8 to 10 hour overnight fast is required." }
    ],
    category: "Diabetes & Metabolic Diagnostics"
  },
  "c-peptide-test-bangalore": {
    title: "C-Peptide Test Bangalore | Insulin Production Test | QXL",
    h1Title: "C-Peptide Blood Test in Bangalore",
    subtitle: "Measures serum C-peptide to evaluate endogenous pancreatic beta-cell insulin production and differentiate Type 1 from Type 2 diabetes.",
    price: "750",
    oldPrice: "1200",
    discountPercent: "37% OFF",
    parametersCount: "Serum C-Peptide",
    sampleType: "Serum / Plasma",
    fastingRequired: "8 hours fasting recommended for fasting C-peptide.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "C-peptide is cleaved from proinsulin during endogenous insulin synthesis and secreted in equimolar amounts into blood.",
      "Because pharmaceutical insulin injections do not contain C-peptide, the test reliably measures a patient's own pancreatic insulin production."
    ],
    whyImportant: [
      "Differentiates Type 1 diabetes (very low/absent C-peptide) from Type 2 diabetes (normal/high C-peptide).",
      "Evaluates cause of unexplained hypoglycaemia (insulinoma vs exogenous insulin).",
      "Monitors residual beta-cell function."
    ],
    faqs: [
      { question: "What is C-peptide?", answer: "C-peptide is a byproduct created when the pancreas produces insulin, serving as a direct marker of natural insulin production." }
    ],
    category: "Diabetes & Pancreatic Diagnostics"
  },
  "homa-ir-test-bangalore": {
    title: "HOMA-IR Test Bangalore | Insulin Resistance Assessment | QXL",
    h1Title: "HOMA-IR Insulin Resistance Assessment in Bangalore",
    subtitle: "Calculates Homeostatic Model Assessment for Insulin Resistance (HOMA-IR) from simultaneous Fasting Glucose and Fasting Insulin measurements.",
    price: "650",
    oldPrice: "1100",
    discountPercent: "40% OFF",
    parametersCount: "Fasting Glucose + Fasting Insulin + HOMA-IR Index",
    sampleType: "Fluoride Plasma & Serum",
    fastingRequired: "Strict 8 to 10 hours overnight fasting required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "HOMA-IR (Homeostatic Model Assessment of Insulin Resistance) is a calculated mathematical model derived from fasting glucose and fasting insulin levels.",
      "It provides a quantitative estimate of insulin sensitivity, helping evaluate metabolic health, fatty liver risk, and prediabetes trajectory."
    ],
    whyImportant: [
      "Quantitative index for tracking insulin sensitivity improvements over time.",
      "Included in comprehensive metabolic and PCOS screening profiles.",
      "Requires simultaneous fasting blood draw."
    ],
    faqs: [
      { question: "How is HOMA-IR calculated?", answer: "HOMA-IR = (Fasting Glucose mg/dL × Fasting Insulin µIU/mL) / 405." }
    ],
    category: "Metabolic & Diabetes Diagnostics"
  },
  "apolipoprotein-b-test-bangalore": {
    title: "ApoB Test Bangalore | Apolipoprotein B Heart Risk Test | QXL",
    h1Title: "Apolipoprotein B (ApoB) Test in Bangalore",
    subtitle: "Measures serum Apolipoprotein B to quantify the total number of circulating atherogenic lipoprotein particles (LDL, VLDL, IDL) for advanced cardiac risk assessment.",
    price: "750",
    oldPrice: "1200",
    discountPercent: "37% OFF",
    parametersCount: "Serum ApoB",
    sampleType: "Serum",
    fastingRequired: "Usually not essential.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Apolipoprotein B is the primary structural protein component on all potential atherogenic lipoprotein particles, including LDL, VLDL, and IDL.",
      "Because each atherogenic particle carries exactly one ApoB molecule, ApoB directly reflects atherogenic particle number, proving superior to LDL-C alone in discordant cases."
    ],
    whyImportant: [
      "Advanced cardiovascular risk marker for patients with diabetes, metabolic syndrome, or high triglycerides.",
      "Directly quantifies atherogenic particle count.",
      "NABL immunoturbidimetric methodology."
    ],
    faqs: [
      { question: "Why test ApoB instead of LDL alone?", answer: "LDL-C measures cholesterol content, whereas ApoB measures the actual number of plaque-causing particles, which can be high even if LDL-C appears normal." }
    ],
    category: "Advanced Cardiovascular Risk"
  },
  "apolipoprotein-a1-test-bangalore": {
    title: "ApoA1 Test Bangalore | Apolipoprotein A1 | QXL Diagnostics",
    h1Title: "Apolipoprotein A1 (ApoA1) Test in Bangalore",
    subtitle: "Measures serum Apolipoprotein A1, the major structural protein component of anti-atherogenic High-Density Lipoprotein (HDL) particles.",
    price: "750",
    oldPrice: "1200",
    discountPercent: "37% OFF",
    parametersCount: "Serum ApoA1 & ApoB/ApoA1 Ratio",
    sampleType: "Serum",
    fastingRequired: "Usually not required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Apolipoprotein A1 is the principal protein constituent of HDL ('good') cholesterol particles, participating in reverse cholesterol transport from peripheral tissues back to the liver.",
      "Evaluated alongside ApoB to calculate the ApoB/ApoA1 ratio for detailed coronary risk stratification."
    ],
    whyImportant: [
      "Measures protective anti-atherogenic HDL protein particles.",
      "Calculates ApoB/ApoA1 balance ratio.",
      "NABL-accredited clinical chemistry platform."
    ],
    faqs: [
      { question: "What is the ApoB/ApoA1 ratio?", answer: "It is the ratio of bad atherogenic particles (ApoB) to good protective particles (ApoA1), serving as a strong cardiovascular risk indicator." }
    ],
    category: "Advanced Cardiovascular Risk"
  },
  "lipoprotein-a-test-bangalore": {
    title: "Lipoprotein(a) Test Bangalore | Lp(a) Heart Risk | QXL",
    h1Title: "Lipoprotein(a) – Lp(a) Test in Bangalore",
    subtitle: "Measures serum Lipoprotein(a), an independent, genetically determined cardiovascular risk factor for premature coronary artery disease and aortic stenosis.",
    price: "990",
    oldPrice: "1600",
    discountPercent: "38% OFF",
    parametersCount: "Serum Lp(a) Quantitative",
    sampleType: "Serum",
    fastingRequired: "Usually not required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Lipoprotein(a), written as Lp(a), is an LDL-like lipoprotein particle bound to apolipoprotein(a). Plasma concentrations are 90% genetically determined.",
      "Elevated Lp(a) is an independent causal risk factor for premature coronary heart disease, stroke, and calcific aortic valve stenosis."
    ],
    whyImportant: [
      "One-time test recommended in adulthood to identify inherited high cardiac risk.",
      "Crucial for individuals with a family history of early heart attacks.",
      "Quantitative NABL immunoassay assay."
    ],
    faqs: [
      { question: "Is high Lp(a) inherited?", answer: "Yes, Lp(a) levels are predominantly determined by genetics and remain relatively stable throughout adult life." }
    ],
    category: "Advanced Cardiovascular Risk"
  },
  "homocysteine-test-bangalore": {
    title: "Homocysteine Test Bangalore | Cardiovascular & B12 Evaluation | QXL",
    h1Title: "Homocysteine Blood Test in Bangalore",
    subtitle: "Measures plasma homocysteine levels to assess vascular endothelial risk, hypercoagulability, and B12/Folate metabolic pathways.",
    price: "850",
    oldPrice: "1350",
    discountPercent: "37% OFF",
    parametersCount: "Plasma Homocysteine",
    sampleType: "Plasma (EDTA/Citrate, immediate cold transport)",
    fastingRequired: "10 to 12 hours overnight fast recommended.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Homocysteine is a sulfur-containing amino acid intermediate generated during methionine metabolism. It requires Vitamin B12, Folate, and Vitamin B6 for remethylation/transsulfuration.",
      "Hyperhomocysteinaemia causes endothelial injury, oxidative stress, and increased vascular thrombosis risk."
    ],
    whyImportant: [
      "Evaluates unexplained arterial or venous thrombosis history.",
      "Identifies functional B12 and Folate metabolic deficiencies.",
      "Strict pre-analytical cold-chain handling to prevent falsely elevated results."
    ],
    faqs: [
      { question: "What causes elevated homocysteine?", answer: "Vitamin B12 or Folate deficiency, MTHFR gene variants, kidney impairment, and smoking can elevate homocysteine." }
    ],
    category: "Cardiovascular & Nutritional Diagnostics"
  },
  "hs-crp-test-bangalore": {
    title: "hs-CRP Test Bangalore | Cardiovascular Risk Test | QXL",
    h1Title: "High-Sensitivity CRP (hs-CRP) Test in Bangalore",
    subtitle: "Measures low-range C-reactive protein concentrations (0.1 - 10 mg/L) to evaluate vascular low-grade inflammation and cardiac risk.",
    price: "550",
    oldPrice: "850",
    discountPercent: "35% OFF",
    parametersCount: "hs-CRP High Sensitivity",
    sampleType: "Serum",
    fastingRequired: "Usually not required.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "High-sensitivity C-reactive protein (hs-CRP) measures low-level vascular inflammation in healthy individuals to refine 10-year cardiovascular risk assessment.",
      "Distinct from routine high-range CRP used for acute infections; hs-CRP detects subclinical atherosclerotic plaque inflammation."
    ],
    whyImportant: [
      "Assesses low-grade vascular inflammation for coronary artery disease risk stratification.",
      "Categorizes cardiac risk: Low (<1 mg/L), Average (1–3 mg/L), High (>3 mg/L).",
      "High-sensitivity immunoturbidimetric assay."
    ],
    faqs: [
      { question: "Is hs-CRP different from regular CRP?", answer: "Yes, hs-CRP detects tiny baseline inflammation levels (0.1–10 mg/L) for cardiac risk, whereas regular CRP measures high levels (10–500 mg/L) for infection." }
    ],
    category: "Cardiovascular Risk Diagnostics"
  },
  "d-dimer-test-bangalore": {
    title: "D-Dimer Test Bangalore | Blood Clot Evaluation | QXL Diagnostics",
    h1Title: "D-Dimer Blood Test in Bangalore",
    subtitle: "Quantitative citrated plasma D-Dimer test to evaluate fibrin degradation products and rule out Deep Vein Thrombosis (DVT) or Pulmonary Embolism (PE).",
    price: "950",
    oldPrice: "1500",
    discountPercent: "36% OFF",
    parametersCount: "D-Dimer Quantitative (FEU / DDU)",
    sampleType: "Citrated Plasma",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (3–6 Hours)",
    overview: [
      "D-dimer is a specific fibrin degradation product generated when cross-linked fibrin blood clots undergo plasmin-mediated fibrinolysis.",
      "A negative quantitative D-dimer result has a high negative predictive value to rule out DVT or PE in low-to-intermediate risk patients."
    ],
    whyImportant: [
      "High negative predictive value for ruling out venous thromboembolism.",
      "Fast 3–6 hour priority report turnaround.",
      "Quantitative immunoturbidimetric assay using sodium citrate tubes."
    ],
    faqs: [
      { question: "Can a negative D-Dimer rule out a blood clot?", answer: "Yes, in patients with low-to-intermediate clinical probability, a normal D-Dimer reliably excludes DVT/PE." }
    ],
    category: "Coagulation & Thrombosis"
  },
  "iron-profile-test-bangalore": {
    title: "Iron Profile Test Bangalore | Iron, TIBC & Transferrin Saturation | QXL",
    h1Title: "Iron Profile Test in Bangalore",
    subtitle: "Complete iron panel measuring Serum Iron, Total Iron Binding Capacity (TIBC), UIBC, Transferrin Saturation, and Ferritin.",
    price: "850",
    oldPrice: "1350",
    discountPercent: "37% OFF",
    parametersCount: "4 Parameters (Iron, TIBC, Saturation %, Ferritin)",
    sampleType: "Serum",
    fastingRequired: "Morning fasting collection (10–12 hours) recommended due to diurnal iron variation.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "An Iron Profile evaluates circulating iron availability, transport capacity, and tissue iron storage levels.",
      "Includes Serum Iron, Total Iron Binding Capacity (TIBC), Unsaturated Iron Binding Capacity (UIBC), Transferrin Saturation %, and Serum Ferritin."
    ],
    whyImportant: [
      "Differentiates iron deficiency anaemia from anaemia of chronic disease.",
      "Evaluates iron overload disorders (haemochromatosis).",
      "Morning fasting collection ensures accurate baseline serum iron levels."
    ],
    faqs: [
      { question: "Why is morning fasting recommended for iron testing?", answer: "Serum iron levels fluctuate significantly throughout the day, peaking in the morning after fasting." }
    ],
    category: "Haematology & Iron Metabolism"
  },
  "transferrin-test-bangalore": {
    title: "Transferrin Test Bangalore | Iron Transport Test | QXL",
    h1Title: "Serum Transferrin Test in Bangalore",
    subtitle: "Measures serum transferrin protein concentration to evaluate iron transport capacity and nutritional status.",
    price: "550",
    oldPrice: "850",
    discountPercent: "35% OFF",
    parametersCount: "Serum Transferrin",
    sampleType: "Serum",
    fastingRequired: "Morning fasting recommended.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "Transferrin is the main glycoprotein produced by the liver responsible for binding and transporting ferric iron through blood plasma.",
      "Transferrin concentrations rise in iron deficiency as the body attempts to maximize iron transport, and fall in protein-energy malnutrition or iron overload."
    ],
    whyImportant: [
      "Direct quantitative measurement of iron transport protein capacity.",
      "Useful marker for protein nutritional assessment.",
      "NABL clinical chemistry immunoassay platform."
    ],
    faqs: [
      { question: "What causes high transferrin?", answer: "Iron deficiency anaemia causes increased transferrin synthesis to capture available iron." }
    ],
    category: "Iron Metabolism"
  },
  "tibc-uibc-test-bangalore": {
    title: "TIBC & UIBC Test Bangalore | Iron Binding Capacity | QXL",
    h1Title: "TIBC & UIBC Iron Tests in Bangalore",
    subtitle: "Measures Total Iron Binding Capacity (TIBC) and Unsaturated Iron Binding Capacity (UIBC) to calculate transferrin saturation percentage.",
    price: "450",
    oldPrice: "700",
    discountPercent: "35% OFF",
    parametersCount: "TIBC & UIBC",
    sampleType: "Serum",
    fastingRequired: "10 to 12 hours fasting recommended.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "TIBC measures the total capacity of serum transferrin to bind iron. UIBC measures the unoccupied binding sites.",
      "Used together with serum iron to calculate Transferrin Saturation % = (Serum Iron / TIBC) × 100."
    ],
    whyImportant: [
      "TIBC rises in iron deficiency anaemia and falls in iron overload / haemochromatosis.",
      "Provides transferrin saturation % for accurate clinical diagnosis."
    ],
    faqs: [
      { question: "What is transferrin saturation?", answer: "It is the percentage of transferrin iron-binding sites currently occupied by iron, normally 20% to 50%." }
    ],
    category: "Iron Metabolism"
  },
  "calcium-test-bangalore": {
    title: "Calcium Test Bangalore | Serum Calcium Blood Test | QXL",
    h1Title: "Serum Calcium Test in Bangalore",
    subtitle: "Measures Total Serum Calcium to evaluate bone metabolism, parathyroid gland function, and kidney health.",
    price: "200",
    oldPrice: "350",
    discountPercent: "42% OFF",
    parametersCount: "Total Serum Calcium",
    sampleType: "Serum",
    fastingRequired: "No fasting required.",
    turnaroundTime: "Same Day (4 Hours)",
    overview: [
      "Serum calcium is a vital mineral essential for bone structure, muscle contraction, nerve signal transmission, and blood coagulation.",
      "Regulated closely by Parathyroid Hormone (PTH), Vitamin D, and calcitonin. Intersected with serum albumin for corrected calcium calculations."
    ],
    whyImportant: [
      "Screens for hypercalcaemia (hyperparathyroidism, bone disorders) and hypocalcaemia (vitamin D deficiency, kidney disease).",
      "Essential evaluation for bone density loss, muscle cramps, and renal conditions.",
      "Photometric Arsenazo III laboratory methodology."
    ],
    faqs: [
      { question: "Why is serum albumin checked with calcium?", answer: "About 40% of blood calcium is bound to albumin; low albumin can cause falsely low total calcium results unless corrected." }
    ],
    category: "Bone & Mineral Metabolism"
  }
};

const SIMPLE_SLUG_MAP: Record<string, string> = {
  "cbc": "cbc-test-bangalore",
  "hba1c": "hba1c-test-bangalore",
  "thyroid": "thyroid-test-bangalore",
  "vitamin-d": "vitamin-d-test-bangalore",
  "vitamin-b12": "vitamin-b12-test-bangalore",
  "lipid-profile": "lipid-profile-test-bangalore",
  "lft": "liver-function-test-bangalore",
  "kft": "kidney-function-test-bangalore",
  "ana": "ana-test-bangalore",
  "spep": "spep-test-bangalore",
  "psa": "psa-test-bangalore",
  "crp": "crp-test-bangalore",
  "esr": "esr-test-bangalore",
  "ferritin": "ferritin-test-bangalore",
  "iron-profile": "iron-profile-test-bangalore",
  "dengue": "dengue-test-bangalore",
  "malaria": "malaria-test-bangalore",
  "typhoid": "typhoid-test-bangalore",
  "hiv": "hiv-test-bangalore",
  "hbsag": "hepatitis-b-test-bangalore"
};

export function getDynamicPageData(slug: string): DynamicPageData | null {
  let cleanSlug = slug.toLowerCase().replace(/^\/|\/$/g, '').replace(/^tests\//, '');
  if (SIMPLE_SLUG_MAP[cleanSlug]) {
    cleanSlug = SIMPLE_SLUG_MAP[cleanSlug];
  }
  
  // ── Phase 1: Check Prenatal Screening Pack (Volume 4) ────────────────────
  if (prenatalScreeningPagesWithAliases[cleanSlug]) {
    return prenatalScreeningPagesWithAliases[cleanSlug];
  }
  
  // ── Phase 2: Check Master Extracted 194 Diagnostic Test Definitions ─────────
  if (masterExtractedPagesData[cleanSlug]) {
    return masterExtractedPagesData[cleanSlug];
  }
  
  // Check explicit clinical mappings next
  if (CLINICAL_PAGES_DATA[cleanSlug]) {
    const explicitData = CLINICAL_PAGES_DATA[cleanSlug];
    return {
      slug: cleanSlug,
      title: explicitData.title || `${cleanSlug} | QXL Diagnostics`,
      metaDescription: explicitData.subtitle || `Book ${cleanSlug} in Bangalore with NABL accredited precision and doorstep collection.`,
      badge: "NABL ACCREDITED LAB (MC-6849) · FREE HOME COLLECTION",
      h1Title: explicitData.h1Title || cleanSlug.replace(/-/g, ' '),
      subtitle: explicitData.subtitle || "High accuracy diagnostic investigation performed by QXL Diagnostics.",
      price: explicitData.price || "499",
      oldPrice: explicitData.oldPrice || "750",
      discountPercent: explicitData.discountPercent || "33% OFF",
      parametersCount: explicitData.parametersCount || "Test-Specific",
      sampleType: explicitData.sampleType || "Blood / Serum",
      fastingRequired: explicitData.fastingRequired || "Follow test-specific guidelines.",
      turnaroundTime: explicitData.turnaroundTime || "Same Day (6–12 Hours)",
      overview: explicitData.overview || [
        `${cleanSlug} is an essential investigation offered by QXL Diagnostics across Bengaluru.`,
        "Samples are processed under ISO 15189:2022 quality standards with consultant pathologist validation."
      ],
      parametersList: explicitData.parametersList || [
        "Primary Clinical Parameters",
        "Sample Integrity & Quality Control Checks",
        "Pathologist Validation & Reference Ranges"
      ],
      whyImportant: explicitData.whyImportant || [
        "Provides accurate baseline health data for your doctor.",
        "Conducted at NABL accredited super speciality laboratory (MC-6849).",
        "Digital PDF report delivered directly to your WhatsApp & Email."
      ],
      faqs: explicitData.faqs || [
        { question: "Is home collection available for this test?", answer: "Yes, free doorstep sample collection is available across Bengaluru." },
        { question: "When will I receive my report?", answer: "Digital reports are delivered within 6 to 12 hours on the same day." }
      ],
      category: explicitData.category || "Diagnostic Services"
    };
  }

  // Match with existing topTests if exact slug matches or matches test slug without -bangalore
  const matchedTest = topTests.find(t => 
    t.slug === cleanSlug || 
    t.slug === `${cleanSlug}-bangalore` ||
    `${t.slug}-bangalore` === cleanSlug
  );

  if (matchedTest) {
    return {
      slug: cleanSlug,
      title: `${matchedTest.name} in Bangalore | Price, Fasting & Home Collection | QXL Diagnostics`,
      metaDescription: `Book ${matchedTest.name} at home in Bangalore. NABL accredited lab, same-day reports, sterile sample collection. Starting at ₹${matchedTest.price}.`,
      badge: "NABL ACCREDITED LAB · FREE HOME COLLECTION",
      h1Title: `${matchedTest.name} in Bangalore`,
      subtitle: matchedTest.description,
      price: matchedTest.price,
      oldPrice: (Number(matchedTest.price) * 1.4).toFixed(0),
      discountPercent: "30% OFF",
      parametersCount: `${matchedTest.parameters} Parameter${matchedTest.parameters > 1 ? 's' : ''}`,
      sampleType: matchedTest.sampleType,
      fastingRequired: matchedTest.preparation,
      turnaroundTime: matchedTest.turnaround || "6 to 12 Hours",
      overview: [
        `${matchedTest.name} is a vital diagnostic test conducted by QXL Diagnostics across Bangalore using automated, high-precision analyzer instruments.`,
        `Samples are collected directly at your home by trained phlebotomy specialists using sterile single-use vacuum tubes and transported in temperature-controlled cold-chain kits.`
      ],
      parametersList: [
        `${matchedTest.name} Core Parameters`,
        "Sample Quality & Hemolysis Checks",
        "Reference Range Validation by Consultant Pathologists"
      ],
      whyImportant: [
        "Provides accurate baseline clinical data for your doctor.",
        "Detects early underlying health changes before symptoms develop.",
        "Processed at NABL-accredited ISO 15189:2022 laboratory (MC-6849)."
      ],
      faqs: matchedTest.faqs || [
        { question: `Do I need to fast for ${matchedTest.name}?`, answer: matchedTest.preparation },
        { question: "How soon will I receive my digital report?", answer: "Your digital report will be sent directly to your WhatsApp and Email within 6 to 12 hours." }
      ],
      category: "Diagnostic Blood Test"
    };
  }

  // Slugs that do not match registered clinical pages or test definitions return null
  return null;
}

