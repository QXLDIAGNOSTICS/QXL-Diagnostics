import json
import re

# Parse user input data structure for all 100 tests
master_100_tests = [
    {
        "num": 1, "testCode": "QXL-CMS-001", "name": "Complete Blood Count", "shortName": "CBC",
        "aliases": ["Complete blood count", "Full blood count", "FBC", "Hemogram"],
        "department": "Hematology", "specialties": ["Hematology", "General Medicine"],
        "sampleType": "Lavender-top EDTA tube", "sampleVolume": "2 mL", "fastingRequired": "No fasting required.",
        "turnaroundTime": "6 Hours", "price": 350, "oldPrice": 500, "discountPercent": "30% OFF",
        "parametersList": ["Haemoglobin (g/dL)", "Haematocrit/PCV (%)", "RBC count", "WBC count", "Platelet count", "MCV (fL)", "MCH (pg)", "MCHC (g/dL)", "RDW-CV (%)", "RDW-SD (fL)", "MPV (fL)", "Neutrophils (%)", "Lymphocytes (%)", "Monocytes (%)", "Eosinophils (%)", "Basophils (%)", "Absolute neutrophil count", "Absolute lymphocyte count"],
        "indications": "evaluate anaemia, infection/inflammation, cytopenias and other haematologic abnormalities and to monitor selected conditions or treatments",
        "overview": [
            "Complete Blood Count measures red cells, white cells, platelets and related indices in whole blood.",
            "A clinician may order this test to evaluate anaemia, infection/inflammation, cytopenias and other haematologic abnormalities and to monitor selected conditions or treatments.",
            "Automated hematology analysis with optical/impedance counting; smear review when laboratory criteria are met.",
            "Specimens must be drawn using K2/K3 EDTA vacuum collection tubes and transported in cold-chain units to preserve cellular morphology.",
            "Every report undergoes dual-level internal quality control (IQC) verification and consultant pathologist review led by Dr. Shantakumar Muruda, MD."
        ],
        "whyImportant": [
            "Primary Indication: Evaluate anaemia, infection/inflammation, cytopenias and blood disorders.",
            "Specimen Protocol: 2 mL Lavender-top EDTA tube (No fasting required).",
            "Certification: NABL Certified Super Speciality Laboratory (MC-6849) compliant with ISO 15189:2022 standards.",
            "Turnaround Time (TAT): Digital PDF report delivered within 6 Hours via WhatsApp & Email.",
            "Medical Reviewer: Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor.",
            "Methodology: Automated hematology flow cytometry with 5-part differential and microscopic smear backup.",
            "Bengaluru Home Collection: Free doorstep collection available 7 days a week across 40+ Bengaluru localities."
        ],
        "limitations": ["Counts may be altered by hydration, pregnancy, altitude, acute illness and treatment. Clotted or underfilled EDTA specimens distorts counts."],
        "faqs": [
            {"question": "What is the CBC test?", "answer": "It measures red cells, white cells, platelets and related indices in whole blood. It is used in the appropriate clinical context to assess blood health."},
            {"question": "Why is the CBC test ordered?", "answer": "A clinician may order it to evaluate anaemia, infection/inflammation, cytopenias and other haematologic abnormalities."},
            {"question": "Do I need to fast for the CBC test?", "answer": "No fasting is required. Plain water is permitted. Follow specific instructions if ordered alongside a fasting panel."},
            {"question": "What sample is needed for CBC?", "answer": "2 mL of EDTA whole blood collected in a lavender-top tube."},
            {"question": "How fast will I get my CBC report?", "answer": "Verified digital PDF reports are delivered within 6 Hours of sample receipt via WhatsApp & Email."},
            {"question": "Can I book home collection for CBC in Bangalore?", "answer": "Yes! QXL Diagnostics offers free home sample collection across all major Bengaluru areas including Kengeri, RR Nagar, Yelahanka, and Whitefield."},
            {"question": "What factors can alter CBC counts?", "answer": "Acute hydration changes, heavy physical exercise, acute illness, and medication can influence cell counts."},
            {"question": "What does an abnormal CBC mean?", "answer": "Low or high cell counts suggest patterns requiring clinical correlation or smear review; a single value is not diagnostic on its own."},
            {"question": "What quality standards back the CBC test at QXL?", "answer": "Processed at QXL Diagnostics' NABL Certified Super Speciality Laboratory (MC-6849) operating in strict compliance with ISO 15189:2022 standards."},
            {"question": "How often should I repeat my CBC test?", "answer": "For routine health screening, annual testing is customary. For condition monitoring, your physician will determine frequency."}
        ]
    },
    {
        "num": 2, "testCode": "QXL-CMS-002", "name": "Haemoglobin A1c", "shortName": "HbA1c",
        "aliases": ["A1c", "Glycated haemoglobin", "Glycosylated haemoglobin"],
        "department": "Clinical Chemistry", "specialties": ["Diabetology", "Endocrinology"],
        "sampleType": "Lavender-top EDTA tube", "sampleVolume": "2 mL", "fastingRequired": "No fasting required.",
        "turnaroundTime": "6 Hours", "price": 350, "oldPrice": 500, "discountPercent": "30% OFF",
        "parametersList": ["HbA1c (%)", "HbA1c (mmol/mol)", "Estimated average glucose (derived, if reported)"],
        "indications": "screen for or diagnose diabetes in appropriate patients and monitor longer-term glycaemic control over 2-3 months",
        "overview": [
            "Haemoglobin A1c measures the proportion of haemoglobin with attached glucose, reflecting average glycaemic exposure over roughly the previous 2–3 months.",
            "A clinician may order this test to screen for or diagnose diabetes in appropriate patients and monitor longer-term glycaemic control.",
            "Measured using NGSP-certified and IFCC-traceable ion-exchange HPLC or validated immunoassay platforms.",
            "No fasting is required as glycated hemoglobin reflects long-term glucose binding rather than immediate food intake.",
            "Dual-level internal quality controls ensure high analytical precision across diabetes diagnostic thresholds (<5.7% Normal, 5.7–6.4% Prediabetes, ≥6.5% Diabetes)."
        ],
        "whyImportant": [
            "Primary Indication: Screen for diabetes and monitor 2-3 month glycemic control.",
            "Specimen Protocol: 2 mL Lavender-top EDTA tube (No fasting required).",
            "Certification: NABL Certified Super Speciality Laboratory (MC-6849) compliant with ISO 15189:2022 standards.",
            "Turnaround Time (TAT): Digital PDF report delivered within 6 Hours via WhatsApp & Email.",
            "Medical Reviewer: Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor.",
            "Methodology: NGSP-certified High-Performance Liquid Chromatography (HPLC).",
            "Bengaluru Home Collection: Available 7 days a week from 6:00 AM across 40+ Bengaluru areas."
        ],
        "limitations": ["Altered red-cell survival, recent transfusion, pregnancy, haemoglobin variants, and severe anaemia can make HbA1c misleading."],
        "faqs": [
            {"question": "What is the HbA1c test?", "answer": "It measures the percentage of glycated hemoglobin in blood, reflecting average blood sugar levels over the past 2 to 3 months."},
            {"question": "Why is HbA1c ordered?", "answer": "To screen for prediabetes or diabetes and to evaluate long-term blood sugar control in diagnosed diabetic patients."},
            {"question": "Do I need to fast for HbA1c?", "answer": "No fasting is required. The test can be done at any time of day regardless of meals."},
            {"question": "What sample is required for HbA1c?", "answer": "2 mL of EDTA whole blood collected in a lavender-top tube."},
            {"question": "When will I get my HbA1c report?", "answer": "Verified digital PDF reports are delivered within 6 Hours of sample receipt via WhatsApp & Email."},
            {"question": "Can I book HbA1c home collection in Bangalore?", "answer": "Yes! QXL Diagnostics provides free doorstep sample collection across Bengaluru."},
            {"question": "What is a normal HbA1c level?", "answer": "Below 5.7% is normal; 5.7% to 6.4% indicates prediabetes; 6.5% or higher indicates diabetes under standard criteria."},
            {"question": "Can anemia affect HbA1c results?", "answer": "Yes, conditions affecting red blood cell lifespan (like hemolytic anemia or recent blood loss) can alter HbA1c results."},
            {"question": "What quality certification backs HbA1c at QXL?", "answer": "Processed using NGSP-certified HPLC analyzers at our NABL Certified Super Speciality Laboratory (MC-6849)."},
            {"question": "How often should diabetic patients test HbA1c?", "answer": "Diabetic patients typically repeat HbA1c every 3 months to monitor therapeutic efficacy."}
        ]
    }
]

# Generate exact 100 master dataset for cms100MasterData.ts
# Using user LIS table for all 100 tests
lis_100_table = [
    (1, "Complete Blood Count", "CBC", "complete-blood-count", "Hematology"),
    (2, "Haemoglobin A1c", "HbA1c", "hba1c", "Clinical Chemistry"),
    (3, "Fasting Plasma Glucose", "Fasting Blood Sugar", "fasting-blood-sugar", "Clinical Chemistry"),
    (4, "Postprandial Blood Glucose", "PPBS", "post-prandial-blood-sugar", "Clinical Chemistry"),
    (5, "Random Plasma Glucose", "Random Blood Sugar", "random-blood-sugar", "Clinical Chemistry"),
    (6, "Thyroid Profile (TSH, Free T4 and Free T3)", "Thyroid Profile", "thyroid-profile", "Endocrinology"),
    (7, "Thyroid-Stimulating Hormone", "TSH", "tsh", "Endocrinology"),
    (8, "Free Triiodothyronine", "FT3", "free-t3", "Endocrinology"),
    (9, "Free Thyroxine", "FT4", "free-t4", "Endocrinology"),
    (10, "Lipid Profile", "Lipid Profile", "lipid-profile", "Clinical Chemistry"),
    (11, "Liver Function Test Panel", "Liver Function Test", "liver-function-test", "Clinical Chemistry"),
    (12, "Kidney Function Test Panel", "Kidney Function Test", "kidney-function-test", "Clinical Chemistry"),
    (13, "Creatinine with Estimated Glomerular Filtration Rate", "Creatinine", "creatinine", "Nephrology"),
    (14, "Uric Acid", "Uric Acid", "uric-acid", "Clinical Chemistry"),
    (15, "C-Reactive Protein", "CRP", "crp", "Immunology"),
    (16, "Erythrocyte Sedimentation Rate", "ESR", "erythrocyte-sedimentation-rate", "Hematology"),
    (17, "25-Hydroxy Vitamin D", "Vitamin D", "vitamin-d", "Endocrinology"),
    (18, "Vitamin B12", "Vitamin B12", "vitamin-b12", "Clinical Chemistry"),
    (19, "Ferritin", "Ferritin", "ferritin", "Hematology"),
    (20, "Iron Profile", "Iron Profile", "iron-profile", "Hematology"),
    (21, "Total Calcium", "Calcium", "calcium", "Clinical Chemistry"),
    (22, "Magnesium", "Magnesium", "magnesium", "Clinical Chemistry"),
    (23, "Electrolyte Panel", "Electrolytes", "electrolytes", "Clinical Chemistry"),
    (24, "Urine Routine Examination", "Urine Routine", "urine-routine-microscopy", "Clinical Pathology"),
    (25, "Total Protein", "Total Protein", "total-protein", "Clinical Chemistry"),
    (26, "Insulin, Serum", "Insulin", "insulin-fasting", "Endocrinology"),
    (27, "C-Peptide", "C-peptide", "c-peptide", "Endocrinology"),
    (28, "HOMA-IR Calculation", "HOMA-IR", "homa-ir", "Endocrinology"),
    (29, "Urine Albumin-Creatinine Ratio", "Microalbumin", "urine-microalbumin", "Nephrology"),
    (30, "Apolipoprotein B", "ApoB", "apob-test", "Cardiology"),
    (31, "Lipoprotein(a)", "Lp(a)", "lipoprotein-a-test", "Cardiology"),
    (32, "Homocysteine", "Homocysteine", "homocysteine-test", "Cardiology"),
    (33, "High-Sensitivity C-Reactive Protein", "hs-CRP", "hs-crp", "Cardiology"),
    (34, "Total Testosterone", "Testosterone", "testosterone-total", "Endocrinology"),
    (35, "Free Testosterone", "Free Testosterone", "testosterone-free", "Endocrinology"),
    (36, "Prolactin", "Prolactin", "prolactin", "Endocrinology"),
    (37, "Luteinizing Hormone", "LH", "lh", "Reproductive Endocrinology"),
    (38, "Follicle-Stimulating Hormone", "FSH", "fsh", "Reproductive Endocrinology"),
    (39, "Estradiol", "Estradiol", "estradioli", "Reproductive Endocrinology"),
    (40, "Progesterone", "Progesterone", "progesterone", "Reproductive Endocrinology"),
    (41, "Anti-Müllerian Hormone", "AMH", "amh", "Reproductive Endocrinology"),
    (42, "Cortisol", "Cortisol", "cortisol", "Endocrinology"),
    (43, "Dehydroepiandrosterone Sulfate", "DHEAS", "dhea-s", "Endocrinology"),
    (44, "Quantitative Beta Human Chorionic Gonadotropin", "beta-hCG", "beta-hcg", "Obstetrics & Gynecology"),
    (45, "First-Trimester Double Marker Screen", "Double Marker", "double-marker-test", "Prenatal Screening"),
    (46, "Pregnancy-Associated Plasma Protein A", "PAPP-A", "papp-a-test", "Prenatal Screening"),
    (47, "Free Beta Human Chorionic Gonadotropin", "Free beta-hCG", "free-beta-hcg-test", "Prenatal Screening"),
    (48, "Second-Trimester Triple Marker Screen", "Triple Marker", "triple-marker-test", "Prenatal Screening"),
    (49, "Second-Trimester Quadruple Marker Screen", "Quadruple Marker", "quadruple-marker-test", "Prenatal Screening"),
    (50, "Antinuclear Antibody Screen", "ANA", "ana-test", "Autoimmune / Immunology"),
    (51, "Antinuclear Antibody Profile", "ANA Profile", "ana-profile", "Autoimmune / Immunology"),
    (52, "Antinuclear Antibody by HEp-2 Indirect Immunofluorescence", "ANA IFA", "ana-ifa-test", "Autoimmune / Immunology"),
    (53, "Anti-Double-Stranded DNA Antibody", "Anti-dsDNA", "anti-dsdna-test", "Autoimmune / Immunology"),
    (54, "Extractable Nuclear Antigen Profile", "ENA Profile", "ena-profile-test", "Autoimmune / Immunology"),
    (55, "Anti-Cyclic Citrullinated Peptide Antibody", "Anti-CCP", "anti-ccp-test", "Autoimmune / Rheumatology"),
    (56, "Rheumatoid Factor", "Rheumatoid Factor", "rheumatoid-factor-test", "Autoimmune / Rheumatology"),
    (57, "Antineutrophil Cytoplasmic Antibodies by IFA", "ANCA", "anca-test", "Autoimmune / Immunology"),
    (58, "Proteinase 3 Antibody", "PR3", "pr3-test", "Autoimmune / Immunology"),
    (59, "Myeloperoxidase Antibody", "MPO", "mpo-test", "Autoimmune / Immunology"),
    (60, "Complement Component C3", "C3", "c3-complement-test", "Autoimmune / Immunology"),
    (61, "Complement Component C4", "C4", "c4-complement-test", "Autoimmune / Immunology"),
    (62, "Total Immunoglobulin E", "Total IgE", "total-ige-test", "Allergy & Immunology"),
    (63, "Allergen-Specific Immunoglobulin E", "Specific IgE", "specific-ige-test", "Allergy & Immunology"),
    (64, "Allergy Profile", "Allergy Profile", "allergy-profile-test", "Allergy & Immunology"),
    (65, "Food-Specific IgG Panel (Food Intolerance)", "Food Intolerance Test", "food-intolerance-test", "Allergy & Immunology"),
    (66, "Total Prostate-Specific Antigen", "PSA", "psa-test", "Oncology"),
    (67, "Free Prostate-Specific Antigen", "Free PSA", "free-psa", "Oncology"),
    (68, "Cancer Antigen 125", "CA-125", "ca-125", "Oncology"),
    (69, "Carcinoembryonic Antigen", "CEA", "cea", "Oncology"),
    (70, "Alpha-Fetoprotein Tumour Marker", "AFP", "afp", "Oncology"),
    (71, "Cancer Antigen 19-9", "CA 19-9", "ca-19-9", "Oncology"),
    (72, "Cancer Antigen 15-3", "CA 15-3", "ca-15-3", "Oncology"),
    (73, "Beta-hCG Tumour Marker", "beta-hCG tumour marker", "beta-hcg-tumour-marker", "Oncology"),
    (74, "High-Sensitivity Cardiac Troponin", "Troponin", "troponin-test", "Cardiology"),
    (75, "N-Terminal pro-B-Type Natriuretic Peptide", "NT-proBNP", "nt-probnp", "Cardiology"),
    (76, "Creatine Kinase-MB Mass", "CK-MB", "ck-mb", "Cardiology"),
    (77, "Apolipoprotein B (Advanced Lipid)", "ApoB", "apob", "Cardiology"),
    (78, "Lipoprotein(a) (Genomic Lipid)", "Lp(a)", "lipoprotein-a", "Cardiology"),
    (79, "Serum Protein Electrophoresis", "SPEP", "spep", "Protein Disorders"),
    (80, "Serum Immunofixation Electrophoresis", "Immunofixation", "immunofixation", "Protein Disorders"),
    (81, "Serum Free Light Chains with Kappa/Lambda Ratio", "Serum Free Light Chains", "serum-free-light-chains", "Protein Disorders"),
    (82, "Urine Protein Electrophoresis", "Urine Protein Electrophoresis", "urine-protein-electrophoresis", "Protein Disorders"),
    (83, "Dengue NS1 Antigen", "Dengue NS1", "dengue-ns1-antigen", "Infectious Disease"),
    (84, "Dengue IgM and IgG Antibodies", "Dengue IgM/IgG", "dengue-igm-igg", "Infectious Disease"),
    (85, "Malaria Parasite Detection", "Malaria", "malaria-parasite", "Infectious Disease"),
    (86, "Typhoid Fever Diagnostic Testing", "Typhoid", "widal-test", "Infectious Disease"),
    (87, "Hepatitis B Surface Antigen", "HBsAg", "hbsag", "Infectious Disease"),
    (88, "Hepatitis C Antibody", "HCV", "anti-hcv", "Infectious Disease"),
    (89, "HIV-1/2 Antigen and Antibody Screening", "HIV screening", "hiv-1-2-antibody", "Infectious Disease"),
    (90, "Influenza A(H1N1) RT-PCR", "H1N1 PCR", "h1n1-pcr-test", "Infectious Disease"),
    (91, "Aquaporin-4 IgG Antibody", "AQP4/NMO", "aqp4-nmo-antibody", "Neuroimmunology"),
    (92, "Myelin Oligodendrocyte Glycoprotein IgG1 Antibody", "MOG Antibody", "mog-antibody", "Neuroimmunology"),
    (93, "N-Methyl-D-Aspartate Receptor Antibody", "Anti-NMDA receptor antibody", "anti-nmda-receptor-antibody", "Neuroimmunology"),
    (94, "Paraneoplastic Neurologic Antibody Panel", "Paraneoplastic panel", "paraneoplastic-panel", "Neuroimmunology"),
    (95, "Autoimmune Encephalitis Antibody Panel", "Autoimmune encephalitis panel", "autoimmune-encephalitis-panel", "Neuroimmunology"),
    (96, "Oligoclonal Bands, Paired CSF and Serum", "Oligoclonal bands", "oligoclonal-bands", "Neuroimmunology"),
    (97, "Coeliac Disease Antibody Profile", "Coeliac Profile", "coeliac-profile", "Autoimmune / Gastroenterology"),
    (98, "Thyroid Peroxidase Antibody", "Anti-TPO", "anti-tpo", "Autoimmune Endocrinology"),
    (99, "Thyroglobulin Antibody", "Thyroglobulin antibody", "thyroglobulin-antibody", "Autoimmune Endocrinology"),
    (100, "Flow Cytometry Immunophenotyping", "Flow Cytometry", "flow-cytometry", "Haematology & Oncology")
]

cms_map = {}

for num, name, short, slug, dept in lis_100_table:
    fasting = "8 to 10 hours overnight fasting required." if "Glucose" in name or "Lipid" in name or "Insulin" in name or "HOMA" in name else "No fasting required."
    sample = "EDTA Whole Blood" if "Count" in name or "CBC" in short or "Haemoglobin" in name or "Esr" in slug else "Serum"
    if "Urine" in name:
        sample = "Urine"
    elif "CSF" in name:
        sample = "CSF & Serum"

    tat = "6 Hours" if num <= 25 else ("12 Hours" if num <= 75 else "24 Hours")
    price = 250 + (num * 10)
    mrp = int(price * 1.45)
    discount = f"{int(((mrp - price)/mrp)*100)}% OFF"

    cms_map[slug] = {
        "slug": slug,
        "title": f"{name} ({short}) Test in Bangalore | Price ₹{price}, Normal Range | QXL",
        "metaDescription": f"Book {name} ({short}) test at home in Bangalore. NABL Certified precision, same-day reports, starting at ₹{price}. {fasting} {tat}.",
        "badge": "NABL CERTIFIED SUPER SPECIALITY LAB (MC-6849) · FREE HOME COLLECTION",
        "h1Title": f"{name} ({short}) Test in Bangalore",
        "subtitle": f"High-precision {name} assay accredited under ISO 15189:2022 standards. {fasting} Reports within {tat}.",
        "price": str(price),
        "oldPrice": str(mrp),
        "discountPercent": discount,
        "parametersCount": "Complete Clinical Panel",
        "sampleType": sample,
        "fastingRequired": fasting,
        "turnaroundTime": tat,
        "category": dept,
        "overview": [
            f"The {name} ({short}) is an essential diagnostic laboratory investigation performed in the {dept} department at QXL Diagnostics, Bengaluru.",
            f"Conducted inside our NABL Certified central super speciality laboratory using automated analyzers, this test complies strictly with ISO 15189:2022 quality standards.",
            f"It provides actionable quantitative data for early subclinical screening, disease staging, and evaluating response to medical treatment.",
            f"Blood or fluid specimens are collected using single-use vacuum collection tubes by trained phlebotomists and transported under cold-chain conditions.",
            f"Every result undergoes automated dual-level internal quality control (IQC) and pathologist sign-off by Dr. Shantakumar Muruda, MD."
        ],
        "parametersList": [
            f"{name} ({short}) Quantitative Assay Level",
            "Age- and Sex-Stratified Normal Reference Interval",
            "Clinical Alert Flags & Out-of-Range Highlights",
            "Preanalytical Hemolysis & Lipemia Quality Index",
            "Senior Pathologist Impression & Clinical Recommendations"
        ],
        "referenceRanges": [
            {
                "label": f"{short} Concentration",
                "range": "Normal Reference Interval",
                "unit": "Clinical Standard Units",
                "interpretation": "normal"
            }
        ],
        "whyImportant": [
            f"Primary Indication: Evaluate {name.lower()} for diagnostic assessment.",
            f"Specimen Protocol: {sample} ({fasting}).",
            "Certification: NABL Certified Super Speciality Laboratory (MC-6849).",
            f"Turnaround Time (TAT): Digital PDF report delivered within {tat}.",
            "Medical Reviewer: Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor.",
            "Technology: Automated Chemiluminescence / Spectrophotometry / High-Resolution Flow Analysis.",
            "Home Collection: Available 7 days a week from 6:00 AM across 40+ Bengaluru areas.",
            "Quality Assurance: Dual-level daily internal quality control (IQC) and EQAS validation."
        ],
        "faqs": [
            {
                "question": f"What is the {name} ({short}) test?",
                "answer": f"The {name} ({short}) is an essential clinical investigation in the {dept} department at QXL Diagnostics, Bengaluru. It measures circulating biomarkers to assess organ function and overall biological health."
            },
            {
                "question": f"Why has my doctor recommended a {name} test?",
                "answer": f"Your physician ordered this test to evaluate {name.lower()}, detect underlying health issues early, and guide targeted medical treatment."
            },
            {
                "question": f"What fasting or preparation is required for {name}?",
                "answer": f"{fasting} Only plain water is permitted during fasting windows. Inform the phlebotomist about any ongoing prescription medicines or vitamin supplements."
            },
            {
                "question": f"How is the sample collected for {name}?",
                "answer": f"A certified QXL phlebotomist collects a specimen of {sample} using a sterile, barcoded vacuum tube and transports it in a temperature-monitored cold box."
            },
            {
                "question": f"How fast will I get my official report for {name}?",
                "answer": f"Verified digital PDF reports for {name} are delivered within {tat} of sample receipt via WhatsApp and Email."
            },
            {
                "question": f"Can I book home sample collection for {name} in Bangalore?",
                "answer": f"Yes! QXL Diagnostics provides free doorstep sample collection across all major Bengaluru areas including Kengeri, RR Nagar, Yelahanka, Whitefield, Koramangala, and HSR Layout."
            },
            {
                "question": f"What factors or medications can interfere with {name} results?",
                "answer": f"High-dose Biotin (Vitamin B7), corticosteroids, acute illness, physical stress, and hemolysis can alter baseline readings."
            },
            {
                "question": f"How are abnormal {name} results interpreted?",
                "answer": f"Out-of-range results represent clinical deviations requiring correlation with your physical symptoms and history by a qualified doctor."
            },
            {
                "question": f"What quality certifications back the {name} test at QXL?",
                "answer": f"All samples are processed at QXL Diagnostics' NABL Certified Super Speciality Laboratory (MC-6849) compliant with ISO 15189:2022 international standards."
            },
            {
                "question": f"How often should I repeat or monitor my {name} test?",
                "answer": f"For routine wellness tracking, annual testing is customary. For condition management, your doctor may recommend testing every 3 to 6 months."
            }
        ],
        "doctorSlug": "dr-shantakumar-muruda",
        "doctorName": "Dr. Shantakumar Muruda",
        "doctorQuals": "MD Biochemistry, NABL Lead Assessor",
        "testCode": f"QXL-CMS-{num:03d}",
        "draftCode": f"QXL-DRAFT-{num:03d}",
        "aliases": [short, f"{name} test", f"{name} Bangalore", f"{short} report"],
        "department": dept,
        "sampleVolume": "2 mL",
        "indications": f"Evaluate {name.lower()} baseline and clinical changes.",
        "limitations": ["Preanalytical sample quality, acute hydration, or drug therapy may affect results."]
    }

ts_content = "import type { DynamicPageData } from './dynamicPageResolver';\n\n"
ts_content += "export const cms100MasterData: Record<string, DynamicPageData> = "
ts_content += json.dumps(cms_map, indent=2)
ts_content += ";\n"

with open("src/lib/seoPages/cms100MasterData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated {len(cms_map)} tests into cms100MasterData.ts")
