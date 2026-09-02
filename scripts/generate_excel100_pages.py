import json

raw_tests = [
    ("1", "Complete Blood Count", "complete-blood-count", "CBC", "24 Parameters (RBC, WBC, Differential, Platelets, Indices)", "EDTA Whole Blood", "No fasting required.", "4–6 Hours", "Haematology", 350, 500),
    ("2", "Hemoglobin", "hemoglobin", "Hb", "Haemoglobin Concentration & Hematocrit", "EDTA Whole Blood", "No fasting required.", "4–6 Hours", "Haematology", 200, 300),
    ("3", "Erythrocyte Sedimentation Rate", "erythrocyte-sedimentation-rate", "ESR", "Erythrocyte Sedimentation Rate", "EDTA Whole Blood / Sodium Citrate", "No fasting required.", "4–6 Hours", "Haematology", 200, 300),
    ("4", "Blood Group & Rh Typing", "blood-group-rh-typing", "ABO Rh", "ABO Blood Grouping & Rh Factor Determination", "EDTA Whole Blood", "No fasting required.", "2–4 Hours", "Haematology", 250, 400),
    ("5", "Peripheral Blood Smear", "peripheral-blood-smear", "PBS", "Cellular Morphology, Atypia & Parasite Screening", "Whole Blood Smear", "No fasting required.", "6–12 Hours", "Haematology", 350, 500),
    ("6", "Reticulocyte Count", "reticulocyte-count", "Retic", "Reticulocyte Percentage & Absolute Count", "EDTA Whole Blood", "No fasting required.", "6–12 Hours", "Haematology", 400, 600),
    ("7", "Iron Profile", "iron-profile", "Fe Panel", "Serum Iron, TIBC, UIBC & % Transferrin Saturation", "Serum", "10–12 hours fasting required.", "6–12 Hours", "Biochemistry", 900, 1400),
    ("8", "Ferritin", "ferritin", "Serum Ferritin", "Serum Ferritin Concentration", "Serum", "No fasting required.", "6–12 Hours", "Biochemistry", 600, 900),
    ("9", "Vitamin B12", "vitamin-b12", "Cobalamin", "Serum B12 (Cobalamin)", "Serum", "6–8 hours fasting recommended.", "6–12 Hours", "Biochemistry", 890, 1300),
    ("10", "Folate", "folate", "Folic Acid", "Serum Folate Concentration", "Serum", "8 hours fasting recommended.", "6–12 Hours", "Biochemistry", 800, 1200),
    ("11", "HbA1c", "hba1c", "Glycated Hb", "HbA1c Percentage & Estimated Average Glucose (eAG)", "EDTA Whole Blood", "No fasting required.", "4–6 Hours", "Diabetes Diagnostics", 350, 500),
    ("12", "Fasting Blood Sugar", "fasting-blood-sugar", "FBS", "Fasting Plasma Glucose", "Fluoride Plasma", "8–10 hours strict overnight fasting required.", "4–6 Hours", "Diabetes Diagnostics", 150, 250),
    ("13", "Post Prandial Blood Sugar", "post-prandial-blood-sugar", "PPBS", "2-Hour Post Prandial Plasma Glucose", "Fluoride Plasma", "Blood drawn exactly 2 hours after meal.", "4–6 Hours", "Diabetes Diagnostics", 150, 250),
    ("14", "Random Blood Sugar", "random-blood-sugar", "RBS", "Random Plasma Glucose", "Fluoride Plasma", "No fasting required.", "2–4 Hours", "Diabetes Diagnostics", 150, 250),
    ("15", "Insulin – Fasting", "insulin-fasting", "Fasting Insulin", "Fasting Serum Insulin Concentration", "Serum", "8–10 hours fasting required.", "6–12 Hours", "Endocrinology", 750, 1100),
    ("16", "C-Peptide", "c-peptide", "C-Peptide", "Fasting Serum C-Peptide Concentration", "Serum", "8–10 hours fasting required.", "6–12 Hours", "Endocrinology", 950, 1400),
    ("17", "Lipid Profile", "lipid-profile", "Lipid Panel", "Total Cholesterol, HDL, LDL, VLDL, Triglycerides & Ratios", "Serum", "10–12 hours strict fasting required.", "6–12 Hours", "Cardiovascular", 650, 950),
    ("18", "Liver Function Test", "liver-function-test", "LFT", "11 Parameters (Bilirubin, SGOT, SGPT, ALP, GGT, Proteins)", "Serum", "8 hours fasting recommended.", "6–12 Hours", "Biochemistry", 750, 1100),
    ("19", "Kidney Function Test", "kidney-function-test", "KFT", "Urea, Creatinine, Uric Acid, BUN & Electrolytes", "Serum", "No fasting required.", "6–12 Hours", "Biochemistry", 690, 1000),
    ("20", "Electrolytes", "electrolytes", "Serum Electrolytes", "Sodium, Potassium & Chloride", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 450, 650),
    ("21", "Calcium", "calcium", "Serum Calcium", "Total Serum Calcium Concentration", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 250, 400),
    ("22", "Phosphorus", "phosphorus", "Inorganic Phosphorus", "Serum Inorganic Phosphorus", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 250, 400),
    ("23", "Magnesium", "magnesium", "Serum Magnesium", "Serum Magnesium Concentration", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 400, 600),
    ("24", "Uric Acid", "uric-acid", "Uric Acid", "Serum Uric Acid Concentration", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 250, 400),
    ("25", "Vitamin D", "vitamin-d", "25-OH Vitamin D", "25-Hydroxyvitamin D Total", "Serum", "No fasting required.", "6–12 Hours", "Biochemistry", 990, 1500),
    ("26", "Thyroid Profile", "thyroid-profile", "T3 T4 TSH", "Total T3, Total T4 & TSH", "Serum", "No fasting required.", "6–12 Hours", "Endocrinology", 550, 800),
    ("27", "TSH", "tsh", "Thyroid Stimulating Hormone", "3rd Gen Ultra-Sensitive TSH", "Serum", "No fasting required.", "4–6 Hours", "Endocrinology", 300, 450),
    ("28", "Free T3", "free-t3", "FT3", "Free Triiodothyronine", "Serum", "No fasting required.", "6–12 Hours", "Endocrinology", 400, 600),
    ("29", "Free T4", "free-t4", "FT4", "Free Thyroxine", "Serum", "No fasting required.", "6–12 Hours", "Endocrinology", 400, 600),
    ("30", "Total T3", "total-t3", "T3", "Total Triiodothyronine", "Serum", "No fasting required.", "4–6 Hours", "Endocrinology", 250, 400),
    ("31", "Total T4", "total-t4", "T4", "Total Thyroxine", "Serum", "No fasting required.", "4–6 Hours", "Endocrinology", 250, 400),
    ("32", "Anti-TPO Antibody", "anti-tpo-antibody", "Anti-TPO", "Thyroid Peroxidase Antibodies", "Serum", "No fasting required.", "6–12 Hours", "Endocrinology", 900, 1300),
    ("33", "Thyroglobulin", "thyroglobulin", "Tg", "Serum Thyroglobulin", "Serum", "No fasting required.", "12–24 Hours", "Endocrinology", 1200, 1800),
    ("34", "Thyroglobulin Antibody", "thyroglobulin-antibody", "Anti-Tg", "Anti-Thyroglobulin Antibodies", "Serum", "No fasting required.", "12–24 Hours", "Endocrinology", 1000, 1500),
    ("35", "PSA – Total", "psa-total", "Total PSA", "Prostate Specific Antigen Total", "Serum", "Avoid ejaculation for 48h prior.", "6–12 Hours", "Oncology", 650, 950),
    ("36", "PSA – Free", "psa-free", "Free PSA", "Free PSA & Free/Total Ratio", "Serum", "Avoid ejaculation for 48h prior.", "6–12 Hours", "Oncology", 950, 1400),
    ("37", "Testosterone – Total", "testosterone-total", "Total Testosterone", "Total Testosterone Concentration", "Serum", "Morning collection recommended (8–10 AM).", "6–12 Hours", "Endocrinology", 650, 950),
    ("38", "Testosterone – Free", "testosterone-free", "Free Testosterone", "Free & Bioavailable Testosterone", "Serum", "Morning collection recommended.", "12–24 Hours", "Endocrinology", 1200, 1800),
    ("39", "Estradiol", "estradioli", "E2", "Serum Estradiol (E2)", "Serum", "Specify phase of menstrual cycle.", "6–12 Hours", "Endocrinology", 650, 950),
    ("40", "Progesterone", "progesterone", "P4", "Serum Progesterone", "Serum", "Specify day of menstrual cycle.", "6–12 Hours", "Endocrinology", 650, 950),
    ("41", "FSH", "fsh", "Follicle Stimulating Hormone", "Serum FSH", "Serum", "Day 2–5 of cycle recommended.", "6–12 Hours", "Endocrinology", 550, 800),
    ("42", "LH", "lh", "Luteinizing Hormone", "Serum LH", "Serum", "Day 2–5 of cycle recommended.", "6–12 Hours", "Endocrinology", 550, 800),
    ("43", "Prolactin", "prolactin", "PRL", "Serum Prolactin", "Serum", "Rest 20 mins prior to blood draw.", "6–12 Hours", "Endocrinology", 550, 800),
    ("44", "Cortisol", "cortisol", "Serum Cortisol", "Serum Cortisol (8 AM / 4 PM)", "Serum", "Specify time of blood draw (Diurnal peak).", "6–12 Hours", "Endocrinology", 650, 950),
    ("45", "DHEA-S", "dhea-s", "DHEA-Sulfate", "Dehydroepiandrosterone Sulfate", "Serum", "No fasting required.", "6–12 Hours", "Endocrinology", 850, 1250),
    ("46", "AMH", "amh", "Anti-Mullerian Hormone", "Serum AMH (Ovarian Reserve)", "Serum", "Can be tested on any day of cycle.", "12–24 Hours", "Endocrinology", 1800, 2600),
    ("47", "β-hCG", "beta-hcg", "Beta hCG", "Quantitative Serum β-hCG", "Serum", "No fasting required.", "4–6 Hours", "Endocrinology", 550, 800),
    ("48", "Insulin – Post Prandial", "insulin-post-prandial", "PP Insulin", "2-Hour Post Prandial Serum Insulin", "Serum", "Blood drawn 2 hours after meal.", "6–12 Hours", "Endocrinology", 750, 1100),
    ("49", "HOMA-IR", "homa-ir", "Insulin Resistance", "HOMA-IR Index (Fasting Glucose + Fasting Insulin)", "Serum + Plasma", "8–10 hours fasting required.", "6–12 Hours", "Endocrinology", 900, 1350),
    ("50", "hs-CRP", "hs-crp", "High-Sensitivity CRP", "High-Sensitivity C-Reactive Protein", "Serum", "No fasting required.", "6–12 Hours", "Cardiovascular", 750, 1100),
    ("51", "CRP", "crp", "C-Reactive Protein", "Quantitative CRP", "Serum", "No fasting required.", "4–6 Hours", "Inflammatory Diagnostics", 500, 750),
    ("52", "Procalcitonin", "procalcitonin", "PCT", "Serum Procalcitonin (Sepsis Marker)", "Serum", "No fasting required.", "6–12 Hours", "Infectious Diseases", 2200, 3200),
    ("53", "D-Dimer", "d-dimer", "D-Dimer", "Quantitative Plasma D-Dimer", "Citrated Plasma", "No fasting required.", "4–6 Hours", "Hematology", 1200, 1800),
    ("54", "PT / INR", "pt-inr", "Prothrombin Time", "Prothrombin Time & INR Ratio", "Citrated Plasma", "No fasting required.", "4–6 Hours", "Hematology", 400, 600),
    ("55", "aPTT", "aptt", "Activated Partial Thromboplastin Time", "Activated Partial Thromboplastin Time", "Citrated Plasma", "No fasting required.", "4–6 Hours", "Hematology", 500, 750),
    ("56", "Fibrinogen", "fibrinogen", "Plasma Fibrinogen", "Quantitative Fibrinogen Level", "Citrated Plasma", "No fasting required.", "6–12 Hours", "Hematology", 750, 1100),
    ("57", "Bleeding Time", "bleeding-time", "BT", "Standardised Bleeding Time", "Capillary Blood", "In-lab procedure.", "Immediate", "Hematology", 200, 300),
    ("58", "Clotting Time", "clotting-time", "CT", "Whole Blood Clotting Time", "Venous Blood", "In-lab procedure.", "Immediate", "Hematology", 200, 300),
    ("59", "Blood Urea Nitrogen", "blood-urea-nitrogen", "BUN", "Serum Blood Urea Nitrogen", "Serum", "No fasting required.", "4–6 Hours", "Kidney Diagnostics", 200, 300),
    ("60", "Creatinine", "creatinine", "Serum Creatinine", "Serum Creatinine & eGFR", "Serum", "No fasting required.", "4–6 Hours", "Kidney Diagnostics", 250, 380),
    ("61", "eGFR", "egfr", "Estimated GFR", "CKD-EPI Estimated GFR", "Serum Data", "Calculated from serum creatinine.", "4–6 Hours", "Kidney Diagnostics", 300, 450),
    ("62", "Sodium", "sodium", "Serum Na+", "Serum Sodium Concentration", "Serum", "No fasting required.", "4–6 Hours", "Electrolytes", 200, 300),
    ("63", "Potassium", "potassium", "Serum K+", "Serum Potassium Concentration", "Serum", "No fasting required.", "4–6 Hours", "Electrolytes", 200, 300),
    ("64", "Chloride", "chloride", "Serum Cl-", "Serum Chloride Concentration", "Serum", "No fasting required.", "4–6 Hours", "Electrolytes", 200, 300),
    ("65", "Bicarbonate", "bicarbonate", "Serum HCO3-", "Serum Bicarbonate / Total CO2", "Serum", "No fasting required.", "4–6 Hours", "Electrolytes", 350, 500),
    ("66", "SGPT / ALT", "sgpt-alt", "ALT", "Serum Glutamic Pyruvic Transaminase", "Serum", "No fasting required.", "4–6 Hours", "Liver Diagnostics", 200, 300),
    ("67", "SGOT / AST", "sgot-ast", "AST", "Serum Glutamic Oxaloacetic Transaminase", "Serum", "No fasting required.", "4–6 Hours", "Liver Diagnostics", 200, 300),
    ("68", "Alkaline Phosphatase", "alkaline-phosphatase", "ALP", "Serum Alkaline Phosphatase", "Serum", "No fasting required.", "4–6 Hours", "Liver Diagnostics", 220, 350),
    ("69", "Gamma GT", "gamma-gt", "GGT", "Gamma Glutamyl Transferase", "Serum", "No fasting required.", "4–6 Hours", "Liver Diagnostics", 350, 500),
    ("70", "Bilirubin – Total", "bilirubin-total", "Total Bilirubin", "Serum Total Bilirubin", "Serum", "No fasting required.", "4–6 Hours", "Liver Diagnostics", 200, 300),
    ("71", "Bilirubin – Direct", "bilirubin-direct", "Conjugated Bilirubin", "Serum Direct Bilirubin", "Serum", "No fasting required.", "4–6 Hours", "Liver Diagnostics", 200, 300),
    ("72", "Bilirubin – Indirect", "bilirubin-indirect", "Unconjugated Bilirubin", "Calculated Indirect Bilirubin", "Serum", "No fasting required.", "4–6 Hours", "Liver Diagnostics", 200, 300),
    ("73", "Total Protein", "total-protein", "Total Protein", "Serum Total Protein & A/G Ratio", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 200, 300),
    ("74", "Albumin", "albumin", "Serum Albumin", "Serum Albumin Concentration", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 180, 270),
    ("75", "Globulin", "globulin", "Serum Globulin", "Calculated Serum Globulin", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 180, 270),
    ("76", "Amylase", "amylase", "Serum Amylase", "Serum Amylase Activity", "Serum", "No fasting required.", "4–6 Hours", "Pancreatic Diagnostics", 450, 650),
    ("77", "Lipase", "lipase", "Serum Lipase", "Serum Lipase Activity", "Serum", "No fasting required.", "4–6 Hours", "Pancreatic Diagnostics", 550, 800),
    ("78", "LDH", "ldh", "Lactate Dehydrogenase", "Serum Lactate Dehydrogenase", "Serum", "No fasting required.", "4–6 Hours", "Biochemistry", 400, 600),
    ("79", "CK / CPK", "ck-cpk", "Creatine Kinase", "Total Creatine Phosphokinase", "Serum", "Avoid strenuous exercise 24h prior.", "4–6 Hours", "Cardiology / Muscle", 450, 650),
    ("80", "CK-MB", "ck-mb", "Creatine Kinase MB", "Creatine Kinase MB Isoenzyme", "Serum", "No fasting required.", "4–6 Hours", "Cardiology", 600, 900),
    ("81", "Troponin I", "troponin-i", "hs-cTnI", "High-Sensitivity Cardiac Troponin I", "Serum", "No fasting required.", "2–4 Hours", "Cardiology", 1100, 1600),
    ("82", "Troponin T", "troponin-t", "hs-cTnT", "High-Sensitivity Cardiac Troponin T", "Serum", "No fasting required.", "2–4 Hours", "Cardiology", 1200, 1800),
    ("83", "NT-proBNP", "nt-probnp", "NT-proBNP", "N-Terminal proBNP (Heart Failure Marker)", "Serum", "No fasting required.", "4–6 Hours", "Cardiology", 2400, 3500),
    ("84", "Urine Routine & Microscopy", "urine-routine-microscopy", "Urine Routine", "18 Physical, Chemical & Microscopic Parameters", "Mid-stream Urine", "Collect fresh mid-stream sample.", "2–4 Hours", "Urinalysis", 200, 300),
    ("85", "Urine Culture", "urine-culture", "Urine C&S", "Bacterial Culture & Antibiotic Sensitivity", "Sterile Mid-stream Urine", "Collect in sterile container prior to antibiotics.", "48 Hours", "Microbiology", 650, 950),
    ("86", "Urine Microalbumin", "urine-microalbumin", "Microalbuminuria", "Urine Microalbumin & Albumin/Creatinine Ratio", "Random / Spot Urine", "Morning first-void sample preferred.", "4–6 Hours", "Nephrology", 550, 800),
    ("87", "Urine Protein – 24 Hour", "urine-protein-24-hour", "24h Urine Protein", "Total 24-Hour Urine Protein Excretion", "24-Hour Urine", "Collect all urine passed over 24 hours.", "12–24 Hours", "Nephrology", 500, 750),
    ("88", "Stool Routine Examination", "stool-routine-examination", "Stool Routine", "Physical, Chemical & Parasitic Ova/Cyst Exam", "Fresh Stool Sample", "Collect in clean container.", "4–6 Hours", "Gastroenterology", 250, 400),
    ("89", "Stool Occult Blood", "stool-occult-blood", "FOBT", "Fecal Occult Blood Test", "Fresh Stool Sample", "Avoid red meat 48h prior if non-immunochemical.", "4–6 Hours", "Gastroenterology", 350, 500),
    ("90", "HBsAg", "hbsag", "Hepatitis B Surface Ag", "Hepatitis B Surface Antigen (CLIA / Rapid)", "Serum", "No fasting required.", "4–6 Hours", "Virology", 450, 650),
    ("91", "Anti-HCV", "anti-hcv", "Hepatitis C Ab", "Hepatitis C Total Antibodies", "Serum", "No fasting required.", "4–6 Hours", "Virology", 550, 800),
    ("92", "HIV 1 & 2 Antibody", "hiv-1-2-antibody", "HIV 4th Gen", "HIV 1 & 2 Antibodies + p24 Antigen", "Serum", "No fasting required.", "4–6 Hours", "Virology", 500, 750),
    ("93", "VDRL", "vdrl", "Syphilis Screen", "VDRL / RPR Syphilis Serology", "Serum", "No fasting required.", "4–6 Hours", "Serology", 300, 450),
    ("94", "Widal Test", "widal-test", "Widal", "Salmonella Typhi & Paratyphi Agglutination", "Serum", "No fasting required.", "4–6 Hours", "Serology", 300, 450),
    ("95", "Dengue NS1 Antigen", "dengue-ns1-antigen", "Dengue NS1", "Dengue Virus NS1 Early Antigen", "Serum", "Test within 1–5 days of fever.", "2–4 Hours", "Serology", 600, 900),
    ("96", "Dengue IgM & IgG", "dengue-igm-igg", "Dengue Serology", "Dengue Specific Antibodies (IgM & IgG)", "Serum", "Test from day 5 of fever.", "2–4 Hours", "Serology", 750, 1100),
    ("97", "Malaria Parasite", "malaria-parasite", "MP Smear / Antigen", "Malaria Rapid Antigen & Thick/Thin Smear", "EDTA Whole Blood", "Collect during fever spike.", "2–4 Hours", "Parasitology", 350, 500),
    ("98", "Typhoid IgM", "typhoid-igm", "Typhidot IgM", "Salmonella Typhi IgM Antibodies", "Serum", "Test from day 3–4 of fever.", "4–6 Hours", "Serology", 550, 800),
    ("99", "COVID-19 RT-PCR", "covid-19-rt-pcr", "RT-PCR COVID", "SARS-CoV-2 Real-Time RT-PCR Assay", "Nasopharyngeal Swab", "No eating or drinking 30m prior.", "6–12 Hours", "Molecular Diagnostics", 800, 1200),
    ("100", "Vitamin B1 (Thiamine)", "vitamin-b1-thiamine", "Thiamine B1", "Whole Blood Thiamine Pyrophosphate (TPP)", "Whole Blood / EDTA", "No fasting required.", "24–48 Hours", "Nutritional Panels", 1800, 2600)
]

data_dict = {}

for item in raw_tests:
    num, name, slug, short_name, params, sample, prep, tat, cat, price, old_price = item
    
    # Formulate rich clinical overview & FAQs
    overview = [
        f"{name} ({short_name}) is a key diagnostic test offered by QXL Diagnostics in Bengaluru using automated, NABL-accredited laboratory analyzers.",
        f"This investigation measures {params.lower()} to provide quantitative clinical data for diagnosis, baseline health assessment, and monitoring.",
        "Samples are collected directly at your home by qualified phlebotomy specialists using sterile vacuum tubes and transported in temperature-controlled cold-chain kits."
    ]
    
    why_important = [
        f"Evaluates essential clinical parameters for {name}.",
        f"Conducted at NABL accredited laboratory (MC-10025) following ISO 15189:2022 standards.",
        "Digital PDF report delivered directly to your WhatsApp & Email on the same day.",
        "Medically reviewed by Consultant Pathologists & Clinical Biochemists led by Dr. Shantakumar Muruda, MD."
    ]
    
    faqs = [
        {"question": f"What does the {name} test measure?", "answer": f"The {name} test measures {params.lower()} to evaluate patient health and organ function."},
        {"question": f"Do I need to fast for {name}?", "answer": f"{prep}"},
        {"question": f"How is the sample for {name} collected?", "answer": f"A sample of {sample.lower()} is collected by a trained phlebotomist using sterile equipment."},
        {"question": f"How long does it take to get {name} results?", "answer": f"Digital reports are generated within {tat} and sent directly to your WhatsApp and email."},
        {"question": f"Can I book {name} test at home in Bangalore?", "answer": f"Yes! QXL Diagnostics provides free doorstep sample collection for {name} across all Bengaluru localities including Kengeri, RR Nagar, Yelahanka, Nagarabhavi, and Whitefield."}
    ]
    
    entry = {
        "slug": slug,
        "title": f"{name} Test in Bangalore | Price, Normal Range & Home Collection | QXL",
        "metaDescription": f"Book {name} ({short_name}) at home in Bangalore. NABL accredited precision, same-day digital reports, starting at ₹{price}. {prep}",
        "badge": "NABL ACCREDITED LAB (MC-10025) · FREE HOME COLLECTION",
        "h1Title": f"{name} ({short_name}) in Bangalore",
        "subtitle": f"{name} evaluates {params.lower()} with NABL-certified precision. {prep}",
        "price": str(price),
        "oldPrice": str(old_price),
        "discountPercent": f"{int((1 - price/old_price)*100)}% OFF",
        "parametersCount": params,
        "sampleType": sample,
        "fastingRequired": prep,
        "turnaroundTime": f"Same Day ({tat})",
        "category": cat,
        "overview": overview,
        "whyImportant": why_important,
        "faqs": faqs,
        "doctorSlug": "dr-shantakumar-muruda",
        "doctorName": "Dr. Shantakumar Muruda",
        "doctorQuals": "MD Biochemistry, NABL Lead Assessor"
    }
    
    data_dict[slug] = entry

print(f"Generated {len(data_dict)} dedicated test page definitions.")

ts_content = "import type { DynamicPageData } from './dynamicPageResolver';\n\n"
ts_content += "export const excel100TestsData: Record<string, DynamicPageData> = "
ts_content += json.dumps(data_dict, indent=2)
ts_content += ";\n"

with open("src/lib/seoPages/excel100TestsData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved to src/lib/seoPages/excel100TestsData.ts")
