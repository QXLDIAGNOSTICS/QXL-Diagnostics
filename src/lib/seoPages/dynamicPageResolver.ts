import { topTests } from '../testsData';

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
}

const CLINICAL_PAGES_DATA: Record<string, Partial<DynamicPageData>> = {
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
    subtitle: "Home blood collection allows patients to have laboratory samples collected at their residence without travelling to a diagnostic centre by certified phlebotomists.",
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
      { question: "When is a peripheral blood smear needed with a CBC?", answer: "A peripheral blood smear is performed when automated cell counters detect abnormal cell morphology, immature blood cells, or significant cell count abnormalities." }
    ],
    category: "Haematology Diagnostics"
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
      { question: "What does HbA1c measure?", answer: "It measures average blood sugar control over the past 2 to 3 months." },
      { question: "Do I need fasting for HbA1c?", answer: "No, fasting is not required for an HbA1c test." }
    ],
    category: "Diabetes Diagnostics"
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
      { question: "What tests are included in a thyroid profile?", answer: "TSH (Thyroid Stimulating Hormone), Total T3, and Total T4." },
      { question: "Do thyroid tests require fasting?", answer: "Usually no fasting is required." }
    ],
    category: "Endocrinology Diagnostics"
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
      { question: "What is a 25-OH Vitamin D test?", answer: "It is the standard blood test used by doctors to assess overall vitamin D status in the body." },
      { question: "Do I need fasting for a Vitamin D test?", answer: "No fasting is required." }
    ],
    category: "Vitamin & Nutritional Panels"
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
      { question: "What causes Vitamin B12 deficiency?", answer: "Inadequate dietary intake (common in strict vegetarians), pernicious anaemia, or intestinal malabsorption." },
      { question: "Can B12 deficiency cause numbness or tingling?", answer: "Yes, B12 is essential for nerve health, and deficiency can lead to peripheral nerve symptoms." }
    ],
    category: "Vitamin & Nutritional Panels"
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
      { question: "Do I need to fast for a lipid profile?", answer: "Yes, 10 to 12 hours of strict fasting is required for accurate triglyceride and LDL calculations." },
      { question: "What is LDL cholesterol?", answer: "LDL is Low-Density Lipoprotein, often called 'bad' cholesterol, associated with arterial plaque buildup." }
    ],
    category: "Cardiovascular Health"
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
      { question: "What does an LFT include?", answer: "Bilirubin (Total/Direct/Indirect), SGOT, SGPT, ALP, GGT, Total Protein, Albumin, Globulin, A/G Ratio." },
      { question: "What does high SGPT/ALT mean?", answer: "Elevated SGPT indicates liver cell injury or stress, commonly seen in fatty liver, alcohol use, or hepatitis." }
    ],
    category: "Hepatic Diagnostics"
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
      { question: "What is creatinine?", answer: "Creatinine is a waste product from muscle breakdown filtered by healthy kidneys. Elevated levels suggest reduced renal filtration." },
      { question: "Is fasting required for a KFT?", answer: "No fasting is required." }
    ],
    category: "Renal Diagnostics"
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
      { question: "Which dengue test should I take on Day 1 of fever?", answer: "Dengue NS1 Antigen test is recommended during the first 1 to 7 days of fever." },
      { question: "When will I get the report?", answer: "Dengue results are processed with high clinical priority in 3 to 6 hours." }
    ],
    category: "Infectious Disease Testing"
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
      { question: "What does creatinine measure?", answer: "It is a waste product filtered by the kidneys used as a key marker of kidney filtration." },
      { question: "Does high creatinine always mean kidney disease?", answer: "Not always; muscle mass, dehydration, and certain medications can also influence results." }
    ],
    category: "Renal Diagnostics"
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
      { question: "What does high CRP mean?", answer: "High CRP indicates systemic inflammation in the body but does not pinpoint the exact cause or location." },
      { question: "Is CRP the same as hs-CRP?", answer: "No, hs-CRP measures lower baseline concentrations used specifically in cardiovascular risk assessment." }
    ],
    category: "Inflammatory & Infection Diagnostics"
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
      { question: "What does ESR measure?", answer: "It measures how quickly red blood cells settle under standardized laboratory conditions." },
      { question: "Does ESR require fasting?", answer: "No fasting is required for an ESR test." }
    ],
    category: "Inflammatory Diagnostics"
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
      { question: "Is uric acid the same as gout?", answer: "No. High uric acid increases the risk of gout, but not everyone with high levels develops joint symptoms." },
      { question: "Can diet affect uric acid?", answer: "Yes, purine-rich foods like red meat, seafood, and alcohol can elevate uric acid levels." }
    ],
    category: "Metabolic & Joint Diagnostics"
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

export function getDynamicPageData(slug: string): DynamicPageData {
  const cleanSlug = slug.toLowerCase().replace(/^\/|\/$/g, '');
  
  // Check explicit clinical mappings first
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

  // Format readable title from slug
  const titleWords = cleanSlug
    .replace(/-bangalore$/, '')
    .replace(/-test$/, '')
    .replace(/-checkup$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1));
  
  const rawTitle = titleWords.join(' ');

  // Match with existing topTests if possible
  const matchedTest = topTests.find(t => 
    t.slug === cleanSlug || 
    cleanSlug.includes(t.slug) || 
    t.slug.includes(cleanSlug.replace(/-bangalore$/, ''))
  );

  if (matchedTest) {
    return {
      slug: cleanSlug,
      title: `${matchedTest.name} in Bangalore | Price, Fasting & Home Collection | QXL Diagnostics`,
      metaDescription: `Book ${matchedTest.name} at home in Bangalore. NABL accredited lab, same-day reports, 100% sterile sample collection. Starting at ₹${matchedTest.price}.`,
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
        `Samples are collected directly at your home by NABL-certified phlebotomists using sterile single-use vacuum tubes and transported in temperature-controlled cold-chain kits.`
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

  // Fallback generator for custom/specialized SEO slugs
  let category = "Specialised Health Test";
  let fasting = "Fasting for 8-10 hours is recommended for accurate results.";
  let testPrice = "499";
  let paramsCount = "15+ Parameters";

  if (cleanSlug.includes("sugar") || cleanSlug.includes("hba1c") || cleanSlug.includes("diabetes")) {
    category = "Diabetes Diagnostics";
    fasting = cleanSlug.includes("hba1c") ? "No fasting required." : "Fasting for 8 to 10 hours required.";
    testPrice = "350";
  } else if (cleanSlug.includes("thyroid") || cleanSlug.includes("tsh") || cleanSlug.includes("t3") || cleanSlug.includes("t4")) {
    category = "Hormonal & Thyroid Panel";
    fasting = "No fasting required.";
    testPrice = "550";
  } else if (cleanSlug.includes("vitamin")) {
    category = "Nutritional & Vitamin Panel";
    fasting = "No fasting required.";
    testPrice = "990";
  } else if (cleanSlug.includes("lipid") || cleanSlug.includes("cholesterol") || cleanSlug.includes("heart") || cleanSlug.includes("cardiac")) {
    category = "Cardiovascular Health";
    fasting = "10 to 12 hours strict fasting required. Water allowed.";
    testPrice = "650";
  } else if (cleanSlug.includes("liver") || cleanSlug.includes("lft") || cleanSlug.includes("sgpt") || cleanSlug.includes("sgot")) {
    category = "Hepatic (Liver) Profile";
    fasting = "Fasting for 8 hours recommended.";
    testPrice = "750";
  } else if (cleanSlug.includes("kidney") || cleanSlug.includes("kft") || cleanSlug.includes("creatinine") || cleanSlug.includes("renal")) {
    category = "Renal (Kidney) Profile";
    fasting = "No fasting required.";
    testPrice = "690";
  } else if (cleanSlug.includes("full-body") || cleanSlug.includes("health-checkup") || cleanSlug.includes("wellness")) {
    category = "Comprehensive Health Package";
    fasting = "8 to 10 hours overnight fasting required.";
    testPrice = "800";
    paramsCount = "80 Parameters";
  }

  const formattedName = rawTitle.length > 2 ? rawTitle : "Diagnostic Test";

  return {
    slug: cleanSlug,
    title: `${formattedName} in Bangalore | QXL Diagnostics NABL Lab`,
    metaDescription: `Book ${formattedName} in Bangalore. NABL accredited lab (MC-6849), free doorstep sample collection, same-day reports on WhatsApp & Email.`,
    badge: `NABL ACCREDITED · FREE DOORSTEP COLLECTION`,
    h1Title: `${formattedName} in Bangalore`,
    subtitle: `High-accuracy ${formattedName} performed by QXL Diagnostics with NABL-accredited precision, fast doorstep blood collection, and doctor-validated reports.`,
    price: testPrice,
    oldPrice: (Number(testPrice) * 1.5).toFixed(0),
    discountPercent: "33% OFF",
    parametersCount: paramsCount,
    sampleType: cleanSlug.includes("urine") ? "Urine" : "Blood",
    fastingRequired: fasting,
    turnaroundTime: "Same Day (6–12 Hours)",
    overview: [
      `${formattedName} is an essential investigation offered by QXL Diagnostics for patients in Bangalore.`,
      `Samples are collected at home by certified phlebotomists using sterile single-use vacuum tubes and transported in temperature-controlled cooler containers to our NABL accredited main laboratory.`
    ],
    parametersList: [
      `${formattedName} Primary Parameters`,
      "Biochemical / Hematological Analysis",
      "Doctor Verification & Quality Controls"
    ],
    whyImportant: [
      "Provides actionable health insights for early diagnosis.",
      "Conducted at NABL accredited ISO 15189 laboratory (MC-6849).",
      "Doctor-reviewed PDF report sent directly to your WhatsApp and Email."
    ],
    faqs: [
      { question: `How do I prepare for ${formattedName}?`, answer: fasting },
      { question: "Is home sample collection available for this test?", answer: "Yes! QXL Diagnostics provides free doorstep blood sample collection across all localities in Bangalore." },
      { question: "When will I get my report?", answer: "Digital PDF reports are sent to your WhatsApp and Email within 6 to 12 hours on the same day." }
    ],
    category
  };
}
