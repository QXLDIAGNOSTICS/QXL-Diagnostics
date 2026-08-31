import json

cms_tests = [
    {
        "id": "QXL-CMS-001",
        "test_code": "QXL-DRAFT-001",
        "test_name": "Complete Blood Count",
        "short_name": "CBC",
        "aliases": ["Complete blood count", "Full blood count", "FBC", "Hemogram"],
        "department": "Hematology",
        "speciality": ["Hematology", "General Medicine"],
        "seo_title": "CBC Test – Preparation & Results | QXL",
        "meta_description": "Understand the CBC test: purpose, sample, preparation, reporting time, interpretation and important limitations.",
        "h1": "Complete Blood Count",
        "price": "350",
        "mrp": "500",
        "discount": "30% OFF",
        "sample_type": "EDTA Whole Blood",
        "tube_type": "Lavender-top EDTA tube",
        "vacutainer": "Lavender-top EDTA tube",
        "sample_volume": "2 mL",
        "fasting_required": False,
        "fasting_duration": "Not required",
        "report_tat": "6 hours",
        "tat_hours": 6,
        "parameters_count": 24,
        "parameters": [
            "Haemoglobin (g/dL)", "Haematocrit/PCV (%)", "RBC count", "WBC count", "Platelet count",
            "MCV (fL)", "MCH (pg)", "MCHC (g/dL)", "RDW-CV (%)", "RDW-SD (fL)", "MPV (fL)", "PDW",
            "Plateletcrit", "P-LCR", "Neutrophils (%)", "Lymphocytes (%)", "Monocytes (%)", "Eosinophils (%)",
            "Basophils (%)", "Absolute neutrophil count", "Absolute lymphocyte count", "Absolute monocyte count",
            "Absolute eosinophil count", "Absolute basophil count"
        ],
        "method": "Automated hematology analysis with optical/impedance counting; smear review when laboratory criteria are met.",
        "clinical_indications": "Evaluate anaemia, infection/inflammation, cytopenias and other haematologic abnormalities and to monitor selected conditions or treatments.",
        "what_is_test": "Complete Blood Count measures red cells, white cells, platelets and related indices in whole blood.",
        "why_ordered": "A clinician may order this test to evaluate anaemia, infection/inflammation, cytopenias and other haematologic abnormalities and to monitor selected conditions or treatments.",
        "interpretation": "Low or high cell counts and abnormal indices suggest patterns that may require smear review or further testing; no single CBC pattern is diagnostic of a specific disease.",
        "limitations": [
            "Counts may be altered by hydration, pregnancy, altitude, acute illness and treatment.",
            "Abnormal flags may require a peripheral smear or repeat specimen."
        ],
        "interferences": [
            "Clotted or underfilled EDTA specimens",
            "Platelet clumping",
            "Cold agglutinins",
            "Nucleated red cells",
            "Delayed analysis may distort counts or indices"
        ],
        "canonical_slug": "cbc-test",
        "reviewer": "Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor",
        "textbook_reference_1": "Burtis CA, Bruns DE, eds. Tietz Fundamentals of Clinical Chemistry and Molecular Diagnostics. 7th ed. Saunders/Elsevier; 2015. Ch 6, Ch 28, Ch 50.",
        "textbook_reference_2": "Wu AHB, ed. Tietz Clinical Guide to Laboratory Tests. 4th ed. W.B. Saunders; 2006. Erythrocyte Count and ESR entries, pp 360-363.",
        "preanalytical_notes": "Use properly filled, well-mixed EDTA whole blood. Reject clotted specimens and control delay and temperature.",
        "interpretive_notes": "Interpret haemoglobin, red-cell indices, leukocyte differential and platelet count together, using age-, sex- and pregnancy-appropriate intervals.",
        "validation_notes": "Textbooks were used as supporting background. Current guidelines, manufacturer IFU and QXL SOP remain controlling.",
        "faqs": [
            {"question": "What is the CBC test?", "answer": "It measures red cells, white cells, platelets and related indices in whole blood."},
            {"question": "Why is the CBC test ordered?", "answer": "To evaluate anaemia, infection/inflammation, cytopenias and monitor treatments."},
            {"question": "Do I need to fast for the CBC test?", "answer": "Fasting is not routinely required."},
            {"question": "What sample is needed for the CBC test?", "answer": "2 mL EDTA whole blood in a Lavender-top EDTA tube."},
            {"question": "How should I prepare for the CBC test?", "answer": "Collection can be done at any time. Do not stop prescribed medicines on your own."},
            {"question": "What can an abnormal CBC result mean?", "answer": "Suggests patterns requiring smear review; no single pattern is diagnostic."},
            {"question": "When will the CBC report be ready?", "answer": "Report within 6 hours of sample receipt."},
            {"question": "Can medicines affect the CBC test?", "answer": "Tell the laboratory about medicines and high-dose biotin use."},
            {"question": "Does the CBC result diagnose a condition?", "answer": "Not by itself. Counts may be altered by hydration, pregnancy, altitude, or illness."}
        ]
    },
    {
        "id": "QXL-CMS-002",
        "test_code": "QXL-DRAFT-002",
        "test_name": "Haemoglobin A1c",
        "short_name": "HbA1c",
        "aliases": ["A1c", "Glycated haemoglobin", "Glycosylated haemoglobin"],
        "department": "Clinical Chemistry",
        "speciality": ["Diabetology", "Endocrinology"],
        "seo_title": "HbA1c Test – Preparation & Results | QXL",
        "meta_description": "Understand the HbA1c test: purpose, sample, preparation, reporting time, interpretation and important limitations.",
        "h1": "Haemoglobin A1c",
        "price": "350",
        "mrp": "500",
        "discount": "30% OFF",
        "sample_type": "EDTA Whole Blood",
        "tube_type": "Lavender-top EDTA tube",
        "vacutainer": "Lavender-top EDTA tube",
        "sample_volume": "2 mL",
        "fasting_required": False,
        "fasting_duration": "Not required",
        "report_tat": "6 hours",
        "tat_hours": 6,
        "parameters_count": 3,
        "parameters": ["HbA1c (%)", "HbA1c (mmol/mol)", "Estimated average glucose (derived)"],
        "method": "NGSP-certified and IFCC-traceable HbA1c method, typically ion-exchange HPLC or validated immunoassay.",
        "clinical_indications": "Screen for or diagnose diabetes in appropriate patients and monitor longer-term glycaemic control.",
        "what_is_test": "Haemoglobin A1c measures the proportion of haemoglobin with attached glucose, reflecting average glycaemic exposure over roughly 2–3 months.",
        "why_ordered": "To screen for or diagnose diabetes in appropriate patients and monitor longer-term glycaemic control.",
        "interpretation": "Higher HbA1c generally reflects higher average glucose, but diagnosis depends on clinical context and guideline criteria.",
        "limitations": [
            "Altered red-cell survival", "Recent transfusion", "Pregnancy", "Haemoglobin variants", "Anaemia", "Erythropoietin therapy"
        ],
        "interferences": [
            "Assay-specific haemoglobin variant interference", "Conditions changing erythrocyte turnover"
        ],
        "canonical_slug": "hba1c-test",
        "reviewer": "Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor",
        "textbook_reference_1": "Burtis CA, Bruns DE, eds. Tietz Fundamentals of Clinical Chemistry. 7th ed. 2015. Ch 22, Ch 33, Ch 35.",
        "textbook_reference_2": "Wu AHB, ed. Tietz Clinical Guide to Laboratory Tests. 4th ed. 2006. Glycated Hemoglobin(s), pp 480-481.",
        "preanalytical_notes": "Use EDTA whole blood collected and mixed according to the validated method.",
        "interpretive_notes": "HbA1c reflects glycaemic exposure over preceding weeks, weighted toward recent time.",
        "validation_notes": "Textbooks were used as supporting background. Current guidelines and QXL SOP remain controlling.",
        "faqs": [
            {"question": "What is the HbA1c test?", "answer": "Reflects average blood sugar levels over the past 2–3 months."},
            {"question": "Why is the HbA1c test ordered?", "answer": "To diagnose or monitor diabetes and prediabetes."},
            {"question": "Do I need to fast for the HbA1c test?", "answer": "Fasting is not required."},
            {"question": "What sample is needed for HbA1c?", "answer": "2 mL EDTA whole blood."},
            {"question": "How should I prepare for HbA1c?", "answer": "No special preparation. Maintain normal diet."},
            {"question": "What can an abnormal HbA1c mean?", "answer": "Higher levels indicate elevated average blood sugar."},
            {"question": "When will the HbA1c report be ready?", "answer": "Digital report delivered within 6 hours."},
            {"question": "Can anaemia affect HbA1c?", "answer": "Yes, conditions affecting red blood cell life span can alter results."},
            {"question": "Does HbA1c diagnose diabetes?", "answer": "HbA1c ≥ 6.5% is a diagnostic threshold when confirmed."}
        ]
    },
    {
        "id": "QXL-CMS-003",
        "test_code": "QXL-DRAFT-003",
        "test_name": "Fasting Plasma Glucose",
        "short_name": "Fasting Blood Sugar",
        "aliases": ["FBS", "FPG", "Fasting glucose"],
        "department": "Clinical Chemistry",
        "speciality": ["Diabetology", "Endocrinology"],
        "seo_title": "Fasting Blood Sugar Test – Preparation & Results | QXL",
        "meta_description": "Understand the Fasting Blood Sugar test: purpose, sample, preparation, reporting time, interpretation and important limitations.",
        "h1": "Fasting Plasma Glucose",
        "price": "150",
        "mrp": "250",
        "discount": "40% OFF",
        "sample_type": "Fluoride Plasma",
        "tube_type": "Grey-top fluoride tube",
        "vacutainer": "Grey-top fluoride tube",
        "sample_volume": "2 mL",
        "fasting_required": True,
        "fasting_duration": "8–10 hours",
        "report_tat": "6 hours",
        "tat_hours": 6,
        "parameters_count": 1,
        "parameters": ["Fasting plasma glucose (mg/dL)"],
        "method": "Standardized hexokinase / glucose oxidase enzymatic method.",
        "clinical_indications": "Screen for and help diagnose diabetes or prediabetes and monitor glucose metabolism.",
        "what_is_test": "Fasting Plasma Glucose measures plasma glucose after a defined period without caloric intake.",
        "why_ordered": "To screen for and help diagnose diabetes or prediabetes.",
        "interpretation": "Fasting plasma glucose < 100 mg/dL is normal, 100–125 mg/dL indicates prediabetes, ≥ 126 mg/dL indicates diabetes.",
        "limitations": ["Acute illness", "Stress", "Corticosteroids", "Delayed separation can alter glucose"],
        "interferences": ["Ongoing glycolysis if processing delayed", "Severe lipaemia or haemolysis"],
        "canonical_slug": "fasting-blood-sugar-test",
        "reviewer": "Dr. Shantakumar Muruda, MD (Biochemistry), NABL Lead Assessor",
        "textbook_reference_1": "Burtis CA, Bruns DE, eds. Tietz Fundamentals of Clinical Chemistry. 7th ed. 2015. Ch 22.",
        "textbook_reference_2": "Wu AHB, ed. Tietz Clinical Guide to Laboratory Tests. 4th ed. 2006. Glucose, pp 446-451.",
        "preanalytical_notes": "Collect after 8–10h overnight fast. Separate plasma promptly to prevent glycolysis.",
        "interpretive_notes": "Abnormal diagnostic result generally requires confirmation on a subsequent day.",
        "validation_notes": "Textbooks used as background. Current ADA guidelines remain controlling.",
        "faqs": [
            {"question": "What is Fasting Blood Sugar?", "answer": "Measures blood glucose after an overnight fast."},
            {"question": "Why is Fasting Blood Sugar ordered?", "answer": "To screen for diabetes or evaluate metabolic health."},
            {"question": "How long must I fast for FBS?", "answer": "Strict overnight fast for 8 to 10 hours."},
            {"question": "Can I drink water before FBS?", "answer": "Yes, plain water is allowed."},
            {"question": "What sample is collected?", "answer": "2 mL Fluoride plasma in a Grey-top tube."}
        ]
    }
]

# Generate comprehensive dynamic page data structure for CMS
data_map = {}
for item in cms_tests:
    slug = item["canonical_slug"]
    data_map[slug] = {
        "slug": slug,
        "title": item["seo_title"],
        "metaDescription": item["meta_description"],
        "badge": "NABL ACCREDITED LAB (MC-6849) · FREE HOME COLLECTION",
        "h1Title": item["h1"],
        "subtitle": item["what_is_test"],
        "price": item["price"],
        "oldPrice": item["mrp"],
        "discountPercent": item["discount"],
        "parametersCount": f"{item['parameters_count']} Parameters",
        "sampleType": item["sample_type"],
        "fastingRequired": f"{'Yes (' + item['fasting_duration'] + ')' if item['fasting_required'] else 'No fasting required'}",
        "turnaroundTime": f"Same Day ({item['report_tat']})",
        "category": item["department"],
        "overview": [
            item["what_is_test"],
            f"The test code for this investigation is {item['id']} ({item['test_code']}). Processed in the {item['department']} department using {item['method'].lower()}.",
            f"Aliases: {', '.join(item['aliases'])}."
        ],
        "parametersList": item["parameters"],
        "whyImportant": [
            item["why_ordered"],
            f"Clinical Indications: {item['clinical_indications']}",
            f"Interpretation Guidance: {item['interpretation']}",
            f"Textbook Reference: {item['textbook_reference_1']}"
        ],
        "faqs": item["faqs"],
        "doctorSlug": "dr-shantakumar-muruda",
        "doctorName": item["reviewer"].split(',')[0],
        "doctorQuals": "MD Biochemistry, NABL Lead Assessor",
        "testCode": item["test_code"],
        "aliases": item["aliases"],
        "department": item["department"],
        "speciality": ", ".join(item["speciality"]),
        "vacutainer": item["vacutainer"],
        "sampleVolume": item["sample_volume"],
        "method": item["method"],
        "indications": item["clinical_indications"],
        "interpretation": item["interpretation"],
        "limitations": item["limitations"],
        "interferences": item["interferences"],
        "textbookReferences": [item["textbook_reference_1"], item["textbook_reference_2"]],
        "preanalyticalNotes": item["preanalytical_notes"],
        "interpretiveNotes": item["interpretive_notes"],
        "validationNotes": item["validation_notes"]
    }

ts_content = "import type { DynamicPageData } from './dynamicPageResolver';\n\n"
ts_content += "export const cms100MasterData: Record<string, DynamicPageData> = "
ts_content += json.dumps(data_map, indent=2)
ts_content += ";\n"

with open("src/lib/seoPages/cms100MasterData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved CMS Master Data to src/lib/seoPages/cms100MasterData.ts")
