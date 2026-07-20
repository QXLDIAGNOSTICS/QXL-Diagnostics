export interface PackageData {
  slug: string;
  name: string;
  tag: string;
  description: string;
  overview: string;
  testsIncluded: string[];
  benefits: string[];
  suitableFor: string[];
  preparation: string[];
  price: number;
  oldPrice: number;
  parameters: string;
  includes: string;
  faqs: { question: string; answer: string }[];
  relatedTests: string[];
  relatedDiseases: string[];
  tags: string[];
}

export const packagesData: PackageData[] = [
  {
    slug: "quick-fit-package",
    name: "Quick Fit Package",
    tag: "QUICK",
    description:
      "A comprehensive yet affordable full-body screening that covers blood sugar, thyroid, liver, kidney, lipid, and vitamin parameters — ideal for anyone wanting a quick annual health check without breaking the bank.",
    overview:
      "The Quick Fit Package from QXL Diagnostics is designed for individuals who want a fast, reliable snapshot of their overall health. It bundles 13+ essential parameters including fasting blood sugar, HbA1c, insulin, HOMA-IR, a full lipid profile, liver and kidney function tests, thyroid screening (TSH), Vitamin D, CBC, ESR, and urine routine analysis. This package is particularly valuable for young professionals, busy adults, and anyone seeking a yearly wellness check. Results are delivered the same day electronically, and home sample collection is available across Bengaluru at no extra charge. The panel helps detect early signs of metabolic syndrome, pre-diabetes, dyslipidaemia, liver or kidney dysfunction, and vitamin deficiency — conditions that are increasingly common yet often go unnoticed until they become symptomatic.",
    testsIncluded: [
      "Fasting Blood Sugar (FBS)",
      "HbA1c & eAG",
      "Fasting Insulin",
      "HOMA-IR",
      "Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides)",
      "Liver Function Tests (SGOT, SGPT, ALP, Bilirubin, Total Protein, Albumin)",
      "Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid)",
      "Thyroid Stimulating Hormone (TSH)",
      "Vitamin D (25-OH)",
      "Complete Blood Count (CBC)",
      "Erythrocyte Sedimentation Rate (ESR)",
      "Urine Routine & Microscopy",
    ],
    benefits: [
      "Covers metabolic, hepatic, renal, and thyroid health in a single panel",
      "HbA1c and HOMA-IR provide a deeper view of glucose regulation beyond fasting sugar",
      "Same-day electronic report delivery via WhatsApp and email",
      "Free home sample collection across Bengaluru",
      "NABL-accredited laboratory ensuring accurate and reliable results",
      "Significant savings of ₹2,926 compared to ordering individual tests",
      "Suitable for annual wellness screening and corporate health programmes",
    ],
    suitableFor: [
      "Healthy adults aged 18–60 looking for an annual health check-up",
      "Working professionals with sedentary lifestyles",
      "Individuals with a family history of diabetes, hypertension, or heart disease",
      "Anyone wanting a quick yet thorough metabolic and organ-function screen",
      "Corporate wellness programmes and employee health drives",
    ],
    preparation: [
      "Fast for 8–12 hours before the sample collection (water is permitted)",
      "Avoid heavy exercise on the day of the test",
      "Inform the phlebotomist of any medications you are currently taking",
      "Collect the first morning mid-stream urine sample if home collection is scheduled early",
      "Stay well-hydrated to make venipuncture easier",
      "Avoid alcohol for at least 24 hours before the test",
    ],
    price: 1770,
    oldPrice: 4696,
    parameters: "13 Parameters",
    includes:
      "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Liver Function Tests, Kidney Function Tests (Creatinine, Urea, BUN, Uric Acid), TSH, Vitamin D, CBC, ESR, Urine Routine & Microscopy.",
    faqs: [
      {
        question: "What does the Quick Fit Package test for?",
        answer:
          "The Quick Fit Package screens for blood sugar control (FBS, HbA1c, Insulin, HOMA-IR), lipid levels, liver and kidney function, thyroid health (TSH), Vitamin D status, blood count abnormalities, and urinary tract issues through urine routine analysis.",
      },
      {
        question: "Who should take the Quick Fit Package?",
        answer:
          "Any adult aged 18–60 who wants a cost-effective, comprehensive annual health screening. It is especially recommended for individuals with sedentary lifestyles, family history of diabetes or heart disease, and those who want to monitor their overall wellness.",
      },
      {
        question: "Do I need to fast before the test?",
        answer:
          "Yes, fasting for 8–12 hours is required for accurate blood sugar and lipid results. You may drink plain water during the fasting window. Avoid tea, coffee, or juice before the sample is collected.",
      },
      {
        question: "When will I receive my reports?",
        answer:
          "Electronic reports are typically delivered the same day — within 6 to 8 hours of sample collection — via WhatsApp and email. You can also download them from the QXL patient portal.",
      },
      {
        question: "Is home sample collection available?",
        answer:
          "Yes, QXL Diagnostics offers free home sample collection across Bengaluru. You can schedule a preferred time slot during booking, and a trained phlebotomist will visit your home.",
      },
      {
        question: "How accurate are QXL Diagnostics results?",
        answer:
          "QXL Diagnostics is NABL-accredited and uses advanced automated analysers calibrated to international standards. Every report undergoes multi-level quality checks to ensure accuracy and reliability.",
      },
    ],
    relatedTests: [
      "HbA1c Test",
      "Lipid Profile",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Thyroid Profile",
      "Vitamin D Test",
      "CBC Test",
      "Insulin Fasting Test",
    ],
    relatedDiseases: [
      "Type 2 Diabetes Mellitus",
      "Hyperlipidaemia",
      "Fatty Liver Disease",
      "Chronic Kidney Disease",
      "Hypothyroidism",
      "Metabolic Syndrome",
      "Vitamin D Deficiency",
      "Anaemia",
    ],
    tags: [
      "full body checkup",
      "annual health check",
      "blood test package",
      "metabolic screening",
      "quick fit",
      "NABL lab Bengaluru",
      "home collection",
      "budget health package",
    ],
  },

  {
    slug: "q-screen-diabetes-package",
    name: "Q-Screen Diabetes Package",
    tag: "DIABETES",
    description:
      "A specialised diabetes screening panel that goes beyond basic blood sugar testing — includes microalbumin, C-peptide, electrolytes, and thyroid screening to detect early diabetic complications and guide treatment.",
    overview:
      "The Q-Screen Diabetes Package is a clinically focused panel built for individuals living with diabetes, pre-diabetes, or those at high risk of developing the condition. It covers 12+ parameters including fasting blood sugar, HbA1c, eAG, urine microalbumin, urine protein/creatinine ratio, C-peptide, lipid profile, liver function tests, kidney function tests (including electrolytes — sodium, potassium, chloride), TSH, CBC, ESR, and urine routine & microscopy. This package is particularly important because diabetes is a systemic disease — prolonged high blood sugar damages blood vessels, nerves, kidneys, eyes, and the heart. The inclusion of microalbuminuria screening catches diabetic nephropathy at its earliest, most treatable stage. C-peptide measurement helps distinguish between Type 1 and Type 2 diabetes and assesses pancreatic beta-cell function. Electrolyte assessment is critical because diabetic patients on medications like metformin or ACE inhibitors are at risk of electrolyte imbalances. Home sample collection and same-day electronic reports make this a convenient yet thorough diabetic health review.",
    testsIncluded: [
      "Fasting Blood Sugar (FBS)",
      "HbA1c & eAG",
      "Urine Microalbumin",
      "Urine Protein/Creatinine Ratio",
      "C-Peptide (Fasting)",
      "Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides)",
      "Liver Function Tests (SGOT, SGPT, ALP, Bilirubin, Total Protein, Albumin)",
      "Kidney Function Tests (Creatinine, Urea, BUN, Sodium, Potassium, Chloride)",
      "Thyroid Stimulating Hormone (TSH)",
      "Complete Blood Count (CBC)",
      "Erythrocyte Sedimentation Rate (ESR)",
      "Urine Routine & Microscopy",
    ],
    benefits: [
      "Detects early diabetic kidney disease through microalbuminuria screening",
      "C-peptide differentiates Type 1 from Type 2 diabetes and assesses pancreatic reserve",
      "Electrolyte panel monitors medication-related imbalances (metformin, diuretics)",
      "Lipid profile assesses cardiovascular risk — the leading cause of death in diabetics",
      "HbA1c provides a 3-month average of blood sugar control",
      "Thyroid screening catches hypothyroidism which commonly co-exists with diabetes",
      "Same-day electronic reports and free home collection across Bengaluru",
    ],
    suitableFor: [
      "Individuals diagnosed with Type 1 or Type 2 diabetes mellitus",
      "Pre-diabetic individuals (impaired fasting glucose or impaired glucose tolerance)",
      "People with a strong family history of diabetes",
      "Patients on anti-diabetic medications needing regular monitoring",
      "Gestational diabetes patients requiring close metabolic oversight",
      "Obese individuals with risk factors for metabolic syndrome",
    ],
    preparation: [
      "Fast for 8–12 hours before sample collection (water is permitted)",
      "Continue prescribed medications unless your doctor advises otherwise — inform the phlebotomist",
      "Avoid vigorous exercise for at least 24 hours before the test",
      "Avoid alcohol for 24 hours prior to sample collection",
      "Collect a first morning mid-stream urine sample for microalbumin analysis",
      "Stay hydrated to assist with venipuncture",
    ],
    price: 1900,
    oldPrice: 4960,
    parameters: "12 Parameters",
    includes:
      "FBS, HbA1c, eAG, Urine Microalbumin, Protein/Creatinine Ratio, C-Peptide, Lipid Profile, Liver Function Test, Kidney Function Test (Creatinine, Urea, BUN, Sodium, Potassium, Chloride), TSH, CBC, ESR, Urine Routine & Microscopy.",
    faqs: [
      {
        question: "Why should I choose the Q-Screen Diabetes Package over a basic sugar test?",
        answer:
          "A basic blood sugar test only checks fasting or random glucose levels. The Q-Screen Diabetes Package provides a complete metabolic and organ-function assessment including HbA1c (3-month sugar average), C-peptide (pancreatic function), microalbumin (early kidney damage), electrolytes, lipids, liver, and thyroid screening — giving your doctor a holistic picture to guide treatment.",
      },
      {
        question: "What is C-peptide and why is it tested?",
        answer:
          "C-peptide is a byproduct of insulin production in the pancreas. It directly reflects how much insulin your pancreas is making. Low C-peptide may indicate Type 1 diabetes or advanced Type 2, while normal-to-high levels suggest insulin resistance. It helps classify diabetes type and assess whether oral medications or insulin injections are more appropriate.",
      },
      {
        question: "What is microalbuminuria and why is it important in diabetes?",
        answer:
          "Microalbuminuria is the presence of small amounts of albumin (a protein) in the urine — often the earliest sign of diabetic kidney disease. Detecting it early allows interventions (medication changes, blood pressure control) that can slow or prevent progression to chronic kidney disease or kidney failure.",
      },
      {
        question: "How often should diabetic patients take this test?",
        answer:
          "Most endocrinologists recommend the Q-Screen Diabetes Package every 3 to 6 months for stable diabetics, and every 3 months for those with uncontrolled blood sugar or recent medication changes. Annual comprehensive screening is recommended for pre-diabetic individuals.",
      },
      {
        question: "Can I take my diabetes medications on the day of the test?",
        answer:
          "In most cases, yes — continue your regular medications. However, if you are on insulin or sulfonylureas, your doctor may advise adjusting the dose. Always inform the phlebotomist about all medications you are taking.",
      },
      {
        question: "Is the urine sample collection complicated?",
        answer:
          "No. You simply collect a first morning mid-stream urine sample in the sterile container provided by QXL. The phlebotomist will guide you on proper collection technique during the home visit.",
      },
    ],
    relatedTests: [
      "HbA1c Test",
      "Fasting Blood Sugar",
      "Urine Microalbumin Test",
      "C-Peptide Test",
      "Lipid Profile",
      "Kidney Function Test",
      "Thyroid Profile",
      "Electrolyte Panel",
    ],
    relatedDiseases: [
      "Type 1 Diabetes Mellitus",
      "Type 2 Diabetes Mellitus",
      "Pre-diabetes",
      "Diabetic Nephropathy",
      "Diabetic Retinopathy",
      "Metabolic Syndrome",
      "Hyperlipidaemia",
      "Polycystic Ovary Syndrome (PCOS)",
    ],
    tags: [
      "diabetes screening",
      "blood sugar test",
      "HbA1c",
      "microalbumin",
      "C-peptide",
      "diabetic health check",
      "NABL lab Bengaluru",
      "home collection",
      "kidney screen diabetics",
    ],
  },

  {
    slug: "q-master-health-pro-package",
    name: "Q-Master Health Pro Package",
    tag: "PRO",
    description:
      "An advanced full-body health screening with 25+ parameters including apolipoproteins, H. pylori gastritis screen, hs-CRP inflammation marker, and comprehensive metabolic and organ-function panels.",
    overview:
      "The Q-Master Health Pro Package is QXL Diagnostics' flagship comprehensive health screening panel, designed for individuals who want a thorough, physician-grade assessment of their overall health. It covers 25+ parameters including fasting blood sugar, HbA1c, eAG, fasting insulin, HOMA-IR, lipid profile with apolipoproteins (Apo A-1, Apo B, Apo B/A1 ratio), liver function tests, a kidney screen with electrolytes, thyroid function tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, urine routine & microscopy, H. pylori gastritis screen (IgG antibodies), and high-sensitivity C-reactive protein (hs-CRP) for systemic inflammation. This panel goes far beyond standard health check-ups by including advanced cardiovascular risk markers (apolipoproteins), gastrointestinal infection screening (H. pylori), and inflammation assessment (hs-CRP) — parameters typically only available in specialised clinical settings. It is ideal for men and women over 30, individuals with a family history of heart disease or cancer, and anyone seeking an in-depth annual wellness assessment.",
    testsIncluded: [
      "Fasting Blood Sugar (FBS)",
      "HbA1c & eAG",
      "Fasting Insulin",
      "HOMA-IR",
      "Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides)",
      "Apolipoprotein A-1 (Apo A-1)",
      "Apolipoprotein B (Apo B)",
      "Apo B/A1 Ratio",
      "Liver Function Tests (SGOT, SGPT, ALP, Bilirubin, Total Protein, Albumin, GGT)",
      "Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride)",
      "Thyroid Function Tests (Free T3, Free T4, TSH)",
      "Vitamin D (25-OH)",
      "Vitamin B12",
      "Complete Blood Count (CBC)",
      "Erythrocyte Sedimentation Rate (ESR)",
      "Urine Routine & Microscopy",
      "H. pylori IgG Antibodies (Gastritis Screen)",
      "High-Sensitivity C-Reactive Protein (hs-CRP)",
    ],
    benefits: [
      "Apolipoprotein testing provides superior cardiovascular risk prediction compared to standard lipid panels",
      "H. pylori screening detects the most common cause of gastritis, peptic ulcers, and stomach cancer",
      "hs-CRP detects chronic low-grade inflammation linked to heart disease, diabetes, and cancer",
      "HOMA-IR quantifies insulin resistance — a precursor to Type 2 diabetes",
      "Comprehensive thyroid panel (T3, T4, TSH) detects both hyper- and hypothyroidism",
      "Vitamin B12 and D screening covers the two most common nutritional deficiencies in India",
      "Same-day electronic report delivery and free home sample collection across Bengaluru",
    ],
    suitableFor: [
      "Adults aged 30 and above seeking an advanced annual health check-up",
      "Individuals with a family history of cardiovascular disease, diabetes, or cancer",
      "People experiencing chronic fatigue, unexplained weight gain, or digestive issues",
      "Patients with existing metabolic conditions requiring comprehensive monitoring",
      "Health-conscious individuals wanting proactive disease prevention",
      "Corporate executives and high-stress professionals",
    ],
    preparation: [
      "Fast for 8–12 hours before sample collection (plain water is allowed)",
      "Avoid alcohol for 48 hours before the test",
      "Refrain from strenuous exercise for 24 hours prior",
      "Inform the phlebotomist about all current medications and supplements",
      "If H. pylori testing is a priority, avoid proton pump inhibitors (PPIs) for 2 weeks if medically safe to do so — consult your doctor",
      "Stay well-hydrated on the morning of the test",
      "Collect a first morning mid-stream urine sample if requested",
    ],
    price: 4600,
    oldPrice: 9600,
    parameters: "25 Parameters",
    includes:
      "FBS, HbA1c, eAG, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo-B, Apo B/A1 Ratio, Liver Function Tests, Kidney Screen (Creatinine, Urea, BUN, Uric Acid, Sodium, Potassium, Chloride), Thyroid Function Tests (T3, T4, TSH), Vitamin D, Vitamin B12, CBC, ESR, Urine Routine & Microscopy, Gastritis Screen (H. pylori IgG Antibodies), hs-CRP.",
    faqs: [
      {
        question: "What makes the Q-Master Health Pro Package different from a standard full-body check-up?",
        answer:
          "Standard check-ups typically cover basic blood sugar, lipids, and a few organ-function tests. The Q-Master Health Pro includes advanced markers like apolipoproteins (superior heart-disease predictors), H. pylori gastritis screening, hs-CRP for systemic inflammation, HOMA-IR for insulin resistance, and Vitamin B12 — providing a far more detailed and clinically actionable health picture.",
      },
      {
        question: "What is Apo B/A1 ratio and why does it matter?",
        answer:
          "Apolipoprotein B (Apo B) represents the number of atherogenic (plaque-forming) particles in your blood, while Apo A-1 represents protective particles. The Apo B/A1 ratio is a powerful predictor of cardiovascular risk — often more accurate than standard LDL cholesterol. A high ratio indicates elevated risk for heart attack and stroke.",
      },
      {
        question: "What is H. pylori and why is it tested?",
        answer:
          "Helicobacter pylori is a bacterium that infects the stomach lining and is responsible for the majority of gastritis and peptic ulcers. Chronic H. pylori infection is also a risk factor for stomach cancer. The IgG antibody test detects current or past infection, helping your doctor decide if eradication therapy is needed.",
      },
      {
        question: "What does hs-CRP indicate?",
        answer:
          "High-sensitivity C-reactive protein (hs-CRP) is a marker of systemic inflammation. Elevated levels are associated with an increased risk of heart disease, stroke, diabetes, and certain cancers. In the context of cardiovascular assessment, hs-CRP adds independent predictive value beyond traditional risk factors like cholesterol.",
      },
      {
        question: "How often should I take the Q-Master Health Pro Package?",
        answer:
          "For adults over 30, an annual screening with the Q-Master Health Pro is recommended. For individuals with existing metabolic conditions (diabetes, hypertension, dyslipidaemia), every 6 months may be advisable as per your physician's recommendation.",
      },
      {
        question: "Can I eat before the test?",
        answer:
          "No, fasting for 8–12 hours is required. Water is permitted. Avoid tea, coffee, juice, or any food during the fasting window to ensure accurate blood sugar, lipid, insulin, and HOMA-IR results.",
      },
    ],
    relatedTests: [
      "HbA1c Test",
      "Apolipoprotein A-1",
      "Apolipoprotein B",
      "hs-CRP Test",
      "H. pylori Antibody Test",
      "Thyroid Profile (T3, T4, TSH)",
      "Vitamin B12 Test",
      "Vitamin D Test",
      "Insulin Fasting Test",
      "Liver Function Test",
      "Kidney Function Test with Electrolytes",
    ],
    relatedDiseases: [
      "Coronary Artery Disease",
      "Type 2 Diabetes Mellitus",
      "Hyperlipidaemia",
      "H. pylori Gastritis",
      "Peptic Ulcer Disease",
      "Hypothyroidism",
      "Hyperthyroidism",
      "Vitamin B12 Deficiency",
      "Vitamin D Deficiency",
      "Metabolic Syndrome",
      "Chronic Kidney Disease",
      "Fatty Liver Disease",
    ],
    tags: [
      "advanced health checkup",
      "master health check",
      "apolipoprotein test",
      "H. pylori screening",
      "hs-CRP",
      "full body checkup Bengaluru",
      "NABL lab",
      "premium health package",
      "home collection",
    ],
  },

  {
    slug: "q-oncoscreen-package",
    name: "Q-Oncoscreen Package",
    tag: "ONCOSCREEN",
    description:
      "A dedicated cancer screening panel covering key tumour markers for both sexes, stool calprotectin, faecal occult blood, and serum protein electrophoresis — designed for early detection and peace of mind.",
    overview:
      "The Q-Oncoscreen Package is a purpose-built cancer screening panel from QXL Diagnostics that combines multiple tumour markers with functional gastrointestinal and haematological assessments. It covers 15+ parameters including Alpha Fetoprotein (AFP — liver cancer marker), Carcinoembryonic Antigen (CEA — colorectal, lung, breast marker), Beta-HCG (germ cell tumour marker), Prostate-Specific Antigen (PSA — prostate cancer marker in males), CA-125 (ovarian cancer marker in females), CA-19.9 (pancreatic cancer marker), CBC, ESR, urine routine & microscopy, calprotectin in stool (intestinal inflammation marker), Faecal Occult Blood Test (FOBT — detects hidden blood in stool, a key early sign of colorectal cancer), and Serum Protein Electrophoresis (detects abnormal protein patterns seen in multiple myeloma and other blood cancers). This panel is not a diagnostic tool for confirmed cancer but serves as an important screening and risk-stratification panel. It is particularly valuable for individuals over 40, those with a family history of cancer, smokers, and anyone experiencing unexplained weight loss, fatigue, or persistent digestive issues.",
    testsIncluded: [
      "Alpha Fetoprotein (AFP) — Liver Cancer Marker",
      "Carcinoembryonic Antigen (CEA) — Colorectal, Lung, Breast Marker",
      "Beta-HCG — Germ Cell Tumour Marker",
      "Prostate-Specific Antigen (PSA) — Male Only",
      "CA-125 — Ovarian Cancer Marker (Female Only)",
      "CA-19.9 — Pancreatic Cancer Marker",
      "Complete Blood Count (CBC)",
      "Erythrocyte Sedimentation Rate (ESR)",
      "Urine Routine & Microscopy",
      "Calprotectin in Stool",
      "Faecal Occult Blood Test (FOBT)",
      "Serum Protein Electrophoresis (SPEP)",
    ],
    benefits: [
      "Multi-marker panel covers common cancers of the liver, colon, prostate, ovary, pancreas, and blood",
      "FOBT and calprotectin screen for colorectal cancer and inflammatory bowel conditions",
      "Protein electrophoresis detects abnormal monoclonal proteins linked to multiple myeloma",
      "Gender-specific markers (PSA for males, CA-125 for females) tailor the screen to individual risk",
      "Non-invasive screening that can be completed in a single home visit",
      "Same-day electronic reports for quick review by your oncologist or physician",
      "Affordable alternative to imaging-heavy cancer screening programmes",
    ],
    suitableFor: [
      "Adults over 40, especially those without access to regular cancer screening",
      "Individuals with a family history of cancer (first-degree relatives)",
      "Smokers and former smokers at elevated risk for lung and colorectal cancer",
      "People experiencing unexplained weight loss, persistent fatigue, or changes in bowel habits",
      "Men over 50 for prostate cancer screening (PSA)",
      "Women over 45 for ovarian cancer risk assessment (CA-125)",
      "Individuals with a history of inflammatory bowel disease or chronic gastrointestinal symptoms",
    ],
    preparation: [
      "No fasting is required for tumour marker tests, but fasting 6–8 hours is recommended for optimal results",
      "For FOBT, avoid red meat, vitamin C supplements, and iron tablets for 3 days before the test",
      "Collect a stool sample using the kit provided by QXL — a small amount is sufficient",
      "Inform the phlebotomist if you have had any recent infections, surgeries, or are pregnant (AFP and HCG can be elevated in pregnancy)",
      "Men should avoid prostate stimulation (digital rectal exam, cycling) for 48 hours before the PSA test",
      "Avoid vigorous exercise for 24 hours before the blood draw",
    ],
    price: 7900,
    oldPrice: 13600,
    parameters: "15 Parameters",
    includes:
      "Cancer Markers (Alpha Fetoprotein AFP, Carcinoembryonic Antigen (CEA), Beta HCG, Prostate-Specific Antigen (PSA) - Male, CA-125 (Ovarian Cancer Marker) - Female, CA-19.9 (Pancreatic Cancer Marker)), CBC, ESR, Urine Routine & Microscopy, Calprotectin in Stool, Fecal Occult Blood Test (FOBT), Protein Electrophoresis.",
    faqs: [
      {
        question: "Does this package diagnose cancer?",
        answer:
          "No, the Q-Oncoscreen Package is a screening tool, not a diagnostic test. Elevated tumour markers can be caused by benign conditions (infections, inflammation, benign tumours) as well as malignancy. If any marker is abnormal, your physician will recommend further investigations such as imaging (CT, MRI, PET-CT), biopsies, or endoscopy for a definitive diagnosis.",
      },
      {
        question: "What is calprotectin and why is it in a cancer screen?",
        answer:
          "Calprotectin is a protein released by white blood cells in the intestine. Elevated levels indicate intestinal inflammation, which can be associated with inflammatory bowel disease (IBD) or, in some cases, colorectal cancer. It helps differentiate functional disorders (like IBS) from organic disease requiring further investigation.",
      },
      {
        question: "What is Serum Protein Electrophoresis (SPEP)?",
        answer:
          "SPEP is a lab test that separates the proteins in your blood into distinct fractions. Abnormal protein patterns (particularly a sharp spike called an M-protein) can indicate multiple myeloma, Waldenström's macroglobulinaemia, or other plasma cell disorders. It is an essential screening test for blood cancers that other tumour markers miss.",
      },
      {
        question: "How accurate is the Faecal Occult Blood Test (FOBT)?",
        answer:
          "FOBT detects hidden (occult) blood in stool samples that are not visible to the naked eye. It has a sensitivity of approximately 70–90% for colorectal cancer and is widely recommended by gastroenterology guidelines. A positive FOBT should be followed by a colonoscopy for definitive evaluation.",
      },
      {
        question: "Should I take this test even if I feel fine?",
        answer:
          "Yes — many cancers are asymptomatic in their early stages. Screening is most valuable when performed before symptoms develop, as early-stage cancers are significantly more treatable. Annual or biennial screening from age 40 onwards is recommended for average-risk individuals.",
      },
      {
        question: "Are there gender-specific differences in the markers tested?",
        answer:
          "Yes. PSA (Prostate-Specific Antigen) is only tested in males as it screens for prostate cancer. CA-125 is only tested in females as it is an ovarian cancer marker. The remaining markers (AFP, CEA, Beta-HCG, CA-19.9) are tested in both sexes.",
      },
    ],
    relatedTests: [
      "Alpha Fetoprotein (AFP)",
      "Carcinoembryonic Antigen (CEA)",
      "Prostate-Specific Antigen (PSA)",
      "CA-125 Test",
      "CA-19.9 Test",
      "Faecal Occult Blood Test (FOBT)",
      "Stool Calprotectin Test",
      "Serum Protein Electrophoresis",
      "CBC Test",
    ],
    relatedDiseases: [
      "Colorectal Cancer",
      "Liver Cancer (Hepatocellular Carcinoma)",
      "Prostate Cancer",
      "Ovarian Cancer",
      "Pancreatic Cancer",
      "Multiple Myeloma",
      "Inflammatory Bowel Disease (IBD)",
      "Peptic Ulcer Disease",
      "Germ Cell Tumours",
    ],
    tags: [
      "cancer screening",
      "tumour markers",
      "oncoscreen",
      "PSA test",
      "CEA test",
      "AFP test",
      "colon cancer screening",
      "NABL lab Bengaluru",
      "home collection",
      "protein electrophoresis",
    ],
  },

  {
    slug: "q-advanced-arthritis-and-autoimmune-panel",
    name: "Q-Advanced Arthritis and Autoimmune Panel",
    tag: "ADVANCED",
    description:
      "A comprehensive autoimmune and arthritis screening panel with 22+ parameters including RF, Anti-CCP, ANA, DHEA-S, cortisol, iron studies, bone health markers, and a full metabolic panel — designed for joint pain and autoimmune disease evaluation.",
    overview:
      "The Q-Advanced Arthritis and Autoimmune Panel is a clinically rigorous diagnostic panel from QXL Diagnostics, specifically designed for individuals experiencing joint pain, swelling, stiffness, or suspected autoimmune conditions. It covers 22+ parameters including fasting blood sugar, HbA1c, eAG, lipid profile, hs-CRP (high-sensitivity C-reactive protein), liver function tests, kidney function tests, thyroid screen (T3, T4, TSH), iron studies (serum iron, TIBC, transferrin), bone health markers (calcium, phosphorus), Vitamin B12, Vitamin D, autoimmune tests (Rheumatoid Factor [RF], Anti-CCyclic Citrullinated Peptide [Anti-CCP], Antinuclear Antibody [ANA]), DHEA-S (dehydroepiandrosterone sulfate), cortisol, CBC, ESR, and urine routine & microscopy. This panel is essential because autoimmune conditions — rheumatoid arthritis, lupus, Sjögren's syndrome, scleroderma, and others — are notoriously difficult to diagnose in their early stages. The combination of RF, Anti-CCP, and ANA provides a high-sensitivity screening for rheumatoid arthritis and systemic lupus erythematosus. DHEA-S and cortisol assessment evaluates adrenal function and stress response, which play a critical role in autoimmune disease activity. Iron studies and bone health markers help evaluate secondary complications like anaemia of chronic disease and osteoporosis.",
    testsIncluded: [
      "Fasting Blood Sugar (FBS)",
      "HbA1c & eAG",
      "Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides)",
      "High-Sensitivity C-Reactive Protein (hs-CRP)",
      "Liver Function Tests (SGOT, SGPT, ALP, Bilirubin, Total Protein, Albumin)",
      "Kidney Function Tests (Creatinine, Urea, BUN)",
      "Thyroid Screen (Free T3, Free T4, TSH)",
      "Serum Iron",
      "Total Iron Binding Capacity (TIBC)",
      "Transferrin Saturation",
      "Serum Calcium",
      "Serum Phosphorus",
      "Vitamin B12",
      "Vitamin D (25-OH)",
      "Rheumatoid Factor (RF)",
      "Anti-CCP Antibodies",
      "Antinuclear Antibody (ANA)",
      "DHEA-S",
      "Cortisol",
      "Complete Blood Count (CBC)",
      "Erythrocyte Sedimentation Rate (ESR)",
      "Urine Routine & Microscopy",
    ],
    benefits: [
      "RF, Anti-CCP, and ANA together provide the highest sensitivity screening for rheumatoid arthritis and lupus",
      "hs-CRP detects systemic inflammation that may precede clinical symptoms of autoimmune flare",
      "Iron studies differentiate between iron-deficiency anaemia and anaemia of chronic inflammatory disease",
      "Bone health markers (calcium, phosphorus, Vitamin D) assess osteoporosis risk common in autoimmune patients",
      "DHEA-S and cortisol evaluate adrenal axis function affected by chronic autoimmune inflammation",
      "Full metabolic panel provides a baseline for medication safety (methotrexate, biologics)",
      "Same-day electronic reports and free home collection across Bengaluru",
    ],
    suitableFor: [
      "Individuals experiencing persistent joint pain, swelling, or morning stiffness lasting more than 30 minutes",
      "Patients with a family history of autoimmune diseases (rheumatoid arthritis, lupus, psoriasis)",
      "People with unexplained fatigue, low-grade fever, and multiple joint involvement",
      "Individuals being evaluated for undifferentiated connective tissue disease",
      "Patients starting or currently on DMARDs (Disease-Modifying Anti-Rheumatic Drugs) who need baseline monitoring",
      "Women aged 20–50, who are at disproportionately higher risk for autoimmune conditions",
    ],
    preparation: [
      "Fast for 8–12 hours before sample collection (water is permitted)",
      "Avoid anti-inflammatory medications (NSAIDs like ibuprofen, naproxen) for 48 hours if medically safe — consult your rheumatologist",
      "Cortisol levels are best measured in the morning (8–10 AM) — schedule an early appointment",
      "Avoid vigorous exercise for 24 hours before the test as it can elevate cortisol and inflammatory markers",
      "Inform the phlebotomist of any current or recent infections, as these can affect ANA and ESR results",
      "Stay hydrated and avoid alcohol for 24 hours prior",
    ],
    price: 6900,
    oldPrice: 12660,
    parameters: "22 Parameters",
    includes:
      "FBS, HbA1c, eAG, Lipid Profile, hs-CRP, Liver Function Tests, Kidney Function Tests, Thyroid Screen (T3, T4, TSH), Iron Studies (Iron, TIBC, Transferrin), Bone Health (Calcium, Phosphorus), Vitamin B12, Vitamin D, Autoimmune Tests (RF, Anti-CCP, ANA), DHEA-S, Cortisol, CBC, ESR, Urine Routine & Microscopy.",
    faqs: [
      {
        question: "What autoimmune diseases does this panel screen for?",
        answer:
          "The panel screens for rheumatoid arthritis (RF + Anti-CCP), systemic lupus erythematosus (ANA), and provides markers that can be associated with Sjögren's syndrome, scleroderma, and mixed connective tissue disease. It is a screening panel — positive results require clinical correlation and may need confirmatory tests like anti-dsDNA, anti-Smith, or specific antibody panels.",
      },
      {
        question: "What is Anti-CCP and why is it better than RF alone?",
        answer:
          "Anti-CCP (Anti-Cyclic Citrullinated Peptide) antibodies are highly specific for rheumatoid arthritis (>95% specificity), meaning a positive result is very likely to indicate RA. RF (Rheumatoid Factor), while sensitive, can be positive in many other conditions (infections, other autoimmune diseases, even healthy elderly individuals). Combining both tests maximises both sensitivity and specificity for RA diagnosis.",
      },
      {
        question: "Why are DHEA-S and cortisol included in an arthritis panel?",
        answer:
          "Chronic autoimmune inflammation disrupts the hypothalamic-pituitary-adrenal (HPA) axis, leading to altered cortisol and DHEA-S levels. Cortisol is the body's natural anti-inflammatory hormone. Measuring both helps assess the body's stress response, disease activity, and can guide decisions about corticosteroid therapy. Low DHEA-S is associated with fatigue and disease flares in lupus and RA patients.",
      },
      {
        question: "Can normal results rule out autoimmune disease?",
        answer:
          "Not always. Some autoimmune conditions can have negative autoantibody tests, especially in early disease or during immunosuppressive treatment. A normal ANA, RF, and Anti-CCP significantly reduces the likelihood of RA and lupus but does not entirely exclude all autoimmune conditions. Clinical assessment by a rheumatologist remains essential.",
      },
      {
        question: "How does iron study help in arthritis patients?",
        answer:
          "Anaemia of chronic disease (ACD) is common in rheumatoid arthritis and other inflammatory conditions. Unlike iron-deficiency anaemia, ACD shows low serum iron but normal or elevated ferritin (an acute-phase reactant). The iron panel (iron, TIBC, transferrin) helps differentiate between the two, which is critical because the treatment differs significantly.",
      },
      {
        question: "Do I need to stop my arthritis medications before the test?",
        answer:
          "Generally, continue all prescribed medications. However, if you are on high-dose NSAIDs, your doctor may advise pausing them for 48 hours as they can affect hs-CRP and ESR results. Never stop DMARDs, biologics, or corticosteroids without explicit physician guidance. Inform the phlebotomist about all medications.",
      },
    ],
    relatedTests: [
      "Rheumatoid Factor (RF)",
      "Anti-CCP Antibody Test",
      "ANA (Antinuclear Antibody) Test",
      "hs-CRP Test",
      "ESR Test",
      "Vitamin D Test",
      "Vitamin B12 Test",
      "Thyroid Profile",
      "Iron Studies",
      "Serum Calcium",
      "Cortisol Test",
      "DHEA-S Test",
    ],
    relatedDiseases: [
      "Rheumatoid Arthritis",
      "Systemic Lupus Erythematosus (SLE)",
      "Sjögren's Syndrome",
      "Scleroderma",
      "Psoriatic Arthritis",
      "Mixed Connective Tissue Disease",
      "Osteoarthritis",
      "Fibromyalgia",
      "Anaemia of Chronic Disease",
      "Osteoporosis",
      "Hypothyroidism",
      "Vitamin D Deficiency",
    ],
    tags: [
      "arthritis screening",
      "autoimmune panel",
      "rheumatoid arthritis test",
      "ANA test",
      "Anti-CCP",
      "joint pain test",
      "NABL lab Bengaluru",
      "home collection",
      "rheumatology",
    ],
  },

  {
    slug: "q-hypertension-and-cardiovascular-risk-assessment-package",
    name: "Q-Hypertension and Cardiovascular Risk Assessment Package",
    tag: "CARDIO",
    description:
      "The most comprehensive cardiac risk assessment panel available — 25 parameters including NT-proBNP, apolipoproteins, Lp(a), homocysteine, fibrinogen, hs-CRP, insulin, cortisol, and a full metabolic and kidney screen for hypertension evaluation.",
    overview:
      "The Q-Hypertension and Cardiovascular Risk Assessment Package is QXL Diagnostics' most advanced cardiac screening panel, designed for individuals with hypertension, pre-hypertension, or elevated cardiovascular risk. It covers 25+ parameters including CBC, lipid profile, kidney screen with electrolytes (BUN, urea, creatinine, sodium, potassium, chloride), urine routine & microscopy, fasting blood sugar, Apo A1, Apo B, Apo B/A1 ratio, hs-CRP, Lipoprotein(a) [Lp(a)], fibrinogen, homocysteine, NT-proBNP, fasting insulin, C-peptide, thyroid screen (T3, T4, TSH), cortisol, and serum magnesium. This panel goes far beyond a standard lipid profile by including the most clinically significant cardiovascular risk markers available in modern laboratory medicine. NT-proBNP is the gold-standard biomarker for detecting heart failure and cardiac stress. Lp(a) is an independent, genetically determined risk factor for atherosclerosis and heart valve calcification. Homocysteine, when elevated, damages blood vessel walls and accelerates atherosclerosis. Fibrinogen is a clotting factor that, when elevated, increases the risk of thrombotic events (heart attack, stroke). Apolipoproteins provide a superior assessment of atherogenic particle burden compared to standard LDL cholesterol. Cortisol and insulin resistance markers (HOMA-IR, C-peptide) address the metabolic drivers of hypertension. Serum magnesium is frequently depleted in hypertensive patients and its deficiency worsens blood pressure control.",
    testsIncluded: [
      "Complete Blood Count (CBC)",
      "Lipid Profile (Total Cholesterol, HDL, LDL, VLDL, Triglycerides)",
      "Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride)",
      "Urine Routine & Microscopy",
      "Fasting Blood Sugar (FBS)",
      "Apolipoprotein A1 (Apo A1)",
      "Apolipoprotein B (Apo B)",
      "Apo B/A1 Ratio",
      "High-Sensitivity C-Reactive Protein (hs-CRP)",
      "Lipoprotein(a) [Lp(a)]",
      "Fibrinogen",
      "Homocysteine",
      "NT-proBNP (N-Terminal Pro-B-Type Natriuretic Peptide)",
      "Fasting Insulin",
      "C-Peptide",
      "Thyroid Screen (Free T3, Free T4, TSH)",
      "Cortisol Level",
      "Serum Magnesium",
    ],
    benefits: [
      "NT-proBNP detects early heart failure and cardiac wall stress before symptoms appear",
      "Lp(a) is an independent genetic risk factor for heart disease not measured by standard lipid panels",
      "Homocysteine and fibrinogen identify clotting and vascular inflammation risks",
      "Apolipoprotein testing (Apo A1, Apo B) outperforms standard LDL for predicting heart attacks",
      "Electrolyte panel (Na, K, Cl) is critical for hypertension medication monitoring (ACE inhibitors, diuretics)",
      "Cortisol and insulin markers address metabolic drivers of secondary hypertension",
      "Serum magnesium assessment guides supplementation in resistant hypertension",
      "Free home sample collection and same-day electronic reports across Bengaluru",
    ],
    suitableFor: [
      "Individuals diagnosed with hypertension (Stage 1 or Stage 2) needing comprehensive risk assessment",
      "People with pre-hypertension (120–139/80–89 mmHg) seeking early intervention",
      "Patients with a family history of heart attack, stroke, or sudden cardiac death",
      "Individuals with metabolic syndrome, obesity, or Type 2 diabetes",
      "Smokers and former smokers with elevated cardiovascular risk",
      "Patients on antihypertensive medications requiring comprehensive monitoring",
      "Adults over 40 seeking a proactive cardiovascular health assessment",
    ],
    preparation: [
      "Fast for 8–12 hours before sample collection (plain water is permitted)",
      "Avoid vigorous exercise for 24 hours before the test — it can temporarily elevate NT-proBNP and cortisol",
      "Avoid alcohol for at least 24 hours prior",
      "Continue all prescribed antihypertensive medications — do not stop them for the test",
      "Inform the phlebotomist about all current medications including blood pressure drugs, statins, and supplements",
      "If possible, schedule an early morning appointment (8–10 AM) as cortisol levels are highest in the morning and this provides a standardised reference point",
      "Stay well-hydrated but avoid excessive caffeine before the test",
    ],
    price: 9000,
    oldPrice: 18900,
    parameters: "25 Parameters",
    includes:
      "CBC, Lipid Profile, Kidney Screen (BUN, Urea, Creatinine, Sodium, Potassium, Chloride), Urine Routine & Microscopy, FBS, Apo A1, Apo B, Apo B/A1 Ratio, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen (T3, T4, TSH), Cortisol Level, Serum Magnesium.",
    faqs: [
      {
        question: "What is NT-proBNP and why is it important?",
        answer:
          "NT-proBNP (N-Terminal Pro-B-Type Natriuretic Peptide) is a peptide hormone released by the heart when it is under stress or stretched due to increased blood volume or pressure. Elevated NT-proBNP levels are the gold-standard blood test for detecting heart failure, even in its earliest, most treatable stages. It is also used to monitor treatment response in known heart failure patients.",
      },
      {
        question: "What is Lipoprotein(a) [Lp(a)] and why should I test for it?",
        answer:
          "Lp(a) is a genetically determined variant of LDL cholesterol that promotes atherosclerosis and blood clot formation. Unlike standard cholesterol, Lp(a) levels are largely determined by genetics and are not significantly affected by diet, exercise, or statin therapy. Approximately 20% of the population has elevated Lp(a), making it one of the most common independent risk factors for premature heart disease. Testing once in a lifetime is sufficient as levels remain stable.",
      },
      {
        question: "What does homocysteine indicate?",
        answer:
          "Homocysteine is an amino acid that, when elevated (hyperhomocysteinaemia), damages the endothelial lining of blood vessels and promotes atherosclerosis and blood clot formation. Elevated levels are associated with an increased risk of heart attack, stroke, and peripheral vascular disease. It can be caused by B-vitamin deficiencies (B6, B12, folate), kidney disease, or genetic factors. Treatment with B-vitamins can often normalise levels.",
      },
      {
        question: "What is fibrinogen and why is it in a cardiac panel?",
        answer:
          "Fibrinogen is a clotting protein produced by the liver. When elevated, it increases blood viscosity and promotes formation of blood clots (thrombi) in arteries, raising the risk of heart attack and stroke. Elevated fibrinogen is also an inflammatory marker and is commonly elevated in metabolic syndrome, diabetes, and chronic inflammatory conditions. It provides independent cardiovascular risk prediction beyond standard lipid testing.",
      },
      {
        question: "Why is cortisol tested in a hypertension panel?",
        answer:
          "Chronic cortisol elevation (from stress, Cushing's syndrome, or exogenous steroids) is a well-established cause of secondary hypertension. Cortisol increases blood pressure through multiple mechanisms: sodium retention, increased vascular sensitivity to catecholamines, and activation of the renin-angiotensin-aldosterone system. Even mildly elevated cortisol contributes to resistant hypertension. Identifying cortisol excess allows targeted treatment.",
      },
      {
        question: "Why is magnesium tested in a cardiac panel?",
        answer:
          "Magnesium is an essential mineral involved in blood vessel relaxation and blood pressure regulation. Magnesium deficiency is extremely common — especially in patients taking diuretics — and is associated with elevated blood pressure, cardiac arrhythmias, and increased cardiovascular mortality. Correcting magnesium deficiency can improve blood pressure control and reduce the risk of arrhythmias.",
      },
      {
        question: "How often should I take this panel?",
        answer:
          "For newly diagnosed hypertensive patients, a baseline assessment is recommended. Follow-up testing every 6 to 12 months is advised, depending on your cardiologist's recommendation. Patients with uncontrolled hypertension, recent cardiac events, or those on multiple antihypertensive medications may benefit from more frequent monitoring.",
      },
    ],
    relatedTests: [
      "NT-proBNP Test",
      "Lipoprotein(a) Test",
      "Homocysteine Test",
      "Fibrinogen Test",
      "hs-CRP Test",
      "Apolipoprotein A1",
      "Apolipoprotein B",
      "Lipid Profile",
      "Kidney Function Test with Electrolytes",
      "Thyroid Profile",
      "Cortisol Test",
      "Serum Magnesium",
      "Insulin Fasting Test",
      "C-Peptide Test",
    ],
    relatedDiseases: [
      "Essential Hypertension",
      "Secondary Hypertension",
      "Heart Failure",
      "Coronary Artery Disease",
      "Atherosclerosis",
      "Stroke",
      "Peripheral Vascular Disease",
      "Metabolic Syndrome",
      "Type 2 Diabetes Mellitus",
      "Atrial Fibrillation",
      "Resistant Hypertension",
      "Cushing's Syndrome",
      "Chronic Kidney Disease",
    ],
    tags: [
      "hypertension screening",
      "cardiac risk assessment",
      "NT-proBNP",
      "Lipoprotein(a)",
      "homocysteine",
      "heart disease screening",
      "cardiovascular panel",
      "NABL lab Bengaluru",
      "home collection",
      "blood pressure test",
    ],
  },
];
