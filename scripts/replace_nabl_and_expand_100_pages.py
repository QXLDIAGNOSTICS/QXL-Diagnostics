import os
import re
import json

# Step 1: Global replacement of NABL accredited -> NABL Certified in all files in src/
src_dir = "src"

def replace_in_file(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        new_content = content
        # Replace variations
        new_content = re.sub(r'NABL[ -][Aa]ccredited', 'NABL Certified', new_content)
        new_content = re.sub(r'NABL[ -][Aa]ccreditation', 'NABL Certification', new_content)
        new_content = re.sub(r'accredited laboratory', 'certified laboratory', new_content, flags=re.IGNORECASE)
        new_content = re.sub(r'accredited lab', 'certified lab', new_content, flags=re.IGNORECASE)
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json')):
            filepath = os.path.join(root, file)
            replace_in_file(filepath)

print("Finished global string replacement for NABL Certified.")

# Step 2: Regenerate cms100MasterData.ts with ultra-massive data for all 100 tests
def build_mega_test(num, name, slug, short, dept, sample, vol, fasting, tat, price, mrp, discount, why_ordered, limitation):
    faqs = [
        {
            "question": f"What is the {name} ({short}) test?",
            "answer": f"The {name} ({short}) is an essential diagnostic laboratory investigation performed in the {dept} department at QXL Diagnostics, Bengaluru. It measures critical circulating biomarkers to evaluate patient health, organ function, cellular composition, and biological equilibrium with high analytical sensitivity."
        },
        {
            "question": f"Why has my doctor recommended a {name} test?",
            "answer": f"Your treating physician may order a {name} test to {why_ordered.lower()} It provides objective quantitative data to detect early subclinical illness, monitor chronic conditions, evaluate unexplained physical symptoms, and guide targeted therapeutic choices."
        },
        {
            "question": f"What are the fasting and preparation rules for the {name} test?",
            "answer": f"{fasting} If fasting is required, only plain water is permitted during the fasting window. Avoid coffee, tea, milk, fruit juices, or alcohol. Inform the phlebotomy technician about any prescription medicines or dietary supplements (such as Biotin B7) taken prior to collection."
        },
        {
            "question": f"What specimen is required and how is it collected for {name}?",
            "answer": f"This test requires a specimen volume of {vol} of {sample}. Specimen collection is performed by certified QXL phlebotomists using sterile, single-use vacuum collection tubes and transported in temperature-monitored cold-chain containers to preserve sample integrity."
        },
        {
            "question": f"How long does it take to receive the official digital PDF report for {name}?",
            "answer": f"Verified digital PDF reports for {name} are delivered within {tat} of specimen arrival at our certified super speciality central laboratory (MC-6849). Reports are delivered securely to your registered WhatsApp number and Email."
        },
        {
            "question": f"Can I book a doorstep home sample collection for {name} in Bangalore?",
            "answer": f"Yes! QXL Diagnostics offers free doorstep home sample collection for {name} across all major Bengaluru localities including Kengeri, Rajarajeshwari Nagar (RR Nagar), Yelahanka, Nagarabhavi, Vijayanagar, Whitefield, Koramangala, Indiranagar, and HSR Layout."
        },
        {
            "question": f"What clinical factors, drugs, or interferences can affect {name} results?",
            "answer": f"{limitation} Additional factors such as acute physical stress, heavy exercise, hydration status, circadian hormonal fluctuations, and high-dose vitamin supplements can alter baseline readings."
        },
        {
            "question": f"How are abnormal {name} values interpreted by doctors?",
            "answer": f"Abnormal values (outside certified NABL laboratory reference intervals) represent physiological deviations requiring clinical correlation. A single abnormal number is evaluated alongside your physical examination, clinical history, and related diagnostic investigations by a qualified physician."
        },
        {
            "question": f"What quality standards and certifications back the {name} test at QXL?",
            "answer": f"All specimens are processed at QXL Diagnostics' NABL Certified Super Speciality Laboratory (MC-6849) operating in strict compliance with ISO 15189:2022 international quality standards. Every report undergoes dual-level automated internal quality control (IQC) and pathologist validation led by Dr. Shantakumar Muruda, MD."
        },
        {
            "question": f"How often should a person repeat or monitor their {name} test?",
            "answer": f"Repeat frequency depends on your clinical baseline. For routine preventive health tracking, annual testing is customary. For active condition management or therapeutic dose adjustments, your physician may recommend repeating the test every 3 to 6 months."
        }
    ]

    overview = [
        f"The {name} ({short}) is a foundational diagnostic assay offered by QXL Diagnostics across Bengaluru, Karnataka. Belonging to the {dept} speciality, this investigation quantitatively measures critical biomarkers in {sample.lower()} to assess biological homeostasis.",
        f"Conducted inside our state-of-the-art super speciality central laboratory using high-precision automated analyzers, the {name} assay strictly follows ISO 15189:2022 international guidelines. Automated calibration curves and multi-level control standards ensure gold-standard reproducibility.",
        f"In clinical practice, {name} plays a dual role: it serves as an early screening tool for subclinical metabolic or cellular disturbances, and as an objective biomarker for monitoring response to therapeutic interventions and lifestyle modifications.",
        f"Specimens are drawn by trained phlebotomy specialists adhering to international venipuncture protocols. Samples are immediately inverted, stored in temperature-regulated insulated transport units, and processed within strict stability timeframes to prevent pre-analytical hemolysis or degradation.",
        f"Every generated result undergoes rigorous internal quality control verification. Samples showing abnormal cell morphology, extreme out-of-range values, or diagnostic flags are automatically routed to our consultant pathologist for microscopic review and clinical sign-off."
    ]

    why_important = [
        f"Primary Indication: {why_ordered}",
        f"Specimen Specifications: {vol} of {sample} ({fasting}).",
        f"Quality Certification: NABL Certified Super Speciality Laboratory (MC-6849) compliant with ISO 15189:2022 standards.",
        f"Report Turnaround (TAT): Official digital report issued within {tat} via WhatsApp & Email.",
        f"Medical Reviewer Sign-off: Validated by Dr. Shantakumar Muruda, MD (Biochemistry) and Consultant Pathologists.",
        "Analytical Methodology: Automated high-sensitivity chemiluminescence, spectrophotometry, or hematology flow analysis.",
        "Bengaluru Home Collection: Available 7 days a week from 6:00 AM with temperature-monitored cold-chain sample transport.",
        "Reference Intervals: Age- and sex-stratified normal ranges printed clearly on every official report for easy reading.",
        "Interference Controls: Rigorous screening for pre-analytical hemolysis, lipemia, icterus, and clot interference.",
        "Patient Safety Protocols: 100% single-use sterile vacuum collection tubes and barcoded tracking system."
    ]

    parameters_list = [
        f"Primary Analyte: {name} ({short}) Quantitative Level",
        "Age- and Sex-Adjusted Reference Interval",
        "Clinical Alert Flags (High / Low / Critical)",
        "Pre-analytical Specimen Quality Index (Hemolysis/Lipemia Check)",
        "Pathologist Interpretation & Clinical Notes"
    ]

    return {
        "slug": slug,
        "title": f"{name} Test in Bangalore | Price ₹{price}, Normal Range & Home Collection | QXL",
        "metaDescription": f"Book {name} ({short}) test at home in Bangalore. NABL certified precision, same-day reports, starting at ₹{price}. {fasting} {tat}.",
        "badge": "NABL CERTIFIED SUPER SPECIALITY LAB (MC-6849) · FREE HOME COLLECTION",
        "h1Title": f"{name} ({short}) Test in Bangalore",
        "subtitle": f"{name} evaluates key clinical biomarkers with NABL-certified precision. {fasting} Reports delivered within {tat}.",
        "price": str(price),
        "oldPrice": str(mrp),
        "discountPercent": discount,
        "parametersCount": "Comprehensive Clinical Panel",
        "sampleType": sample,
        "fastingRequired": fasting,
        "turnaroundTime": tat,
        "category": dept,
        "overview": overview,
        "parametersList": parameters_list,
        "whyImportant": why_important,
        "faqs": faqs,
        "doctorSlug": "dr-shantakumar-muruda",
        "doctorName": "Dr. Shantakumar Muruda",
        "doctorQuals": "MD Biochemistry, NABL Lead Assessor",
        "testCode": f"QXL-CMS-{num:03d}",
        "aliases": [short, f"{name} test", f"{name} Bangalore", f"{name} report"],
        "department": dept,
        "sampleVolume": vol,
        "indications": why_ordered,
        "limitations": [limitation],
        "preanalyticalNotes": f"Collect {vol} of {sample}. Fasting requirement: {fasting}.",
        "interpretiveNotes": limitation
    }

# 100 Tests Data
raw_100_list = [
    (1, "Complete Blood Count", "complete-blood-count", "CBC", "Hematology", "EDTA Whole Blood", "2 mL", "No fasting required.", "6 Hours", 350, 500, "30% OFF", "evaluate anaemia, infection/inflammation, cytopenias and other haematologic abnormalities.", "Counts may be altered by hydration, pregnancy, altitude, acute illness, and treatment. Clotted or underfilled EDTA specimens distorts counts."),
    (2, "Haemoglobin A1c", "hba1c", "HbA1c", "Clinical Chemistry", "EDTA Whole Blood", "2 mL", "No fasting required.", "6 Hours", 350, 500, "30% OFF", "screen for or diagnose diabetes in appropriate patients and monitor longer-term glycaemic control over 2–3 months.", "Altered red-cell survival, recent transfusion, pregnancy, haemoglobin variants, and severe anaemia can make HbA1c misleading."),
    (3, "Fasting Plasma Glucose", "fasting-blood-sugar", "FBS", "Clinical Chemistry", "Fluoride Plasma", "2 mL", "Strict overnight fasting for 8 to 10 hours required.", "6 Hours", 150, 250, "40% OFF", "screen for and help diagnose diabetes or prediabetes and monitor fasting glucose metabolism.", "Acute illness, stress, corticosteroids, and delayed sample separation can alter glucose. Ongoing glycolysis lowers glucose if processing is delayed."),
    (4, "Postprandial Blood Glucose", "post-prandial-blood-sugar", "PPBS", "Clinical Chemistry", "Fluoride Plasma", "2 mL", "Blood collected exactly 2 hours after meal.", "6 Hours", 150, 250, "40% OFF", "assess post-meal glycaemia and support diabetes monitoring or selected diagnostic evaluations.", "A nonstandard meal or incorrect timing reduces comparability. Delayed processing causes glycolysis."),
    (5, "Random Plasma Glucose", "random-blood-sugar", "RBS", "Clinical Chemistry", "Fluoride Plasma", "2 mL", "No fasting required.", "4 Hours", 150, 250, "40% OFF", "evaluate symptoms of hyperglycaemia or hypoglycaemia and support urgent glucose assessment.", "Food intake, stress, illness, medicines and time of day influence random glucose."),
    (6, "Thyroid Profile (TSH, Free T4 and Free T3)", "thyroid-profile", "Thyroid Profile", "Immunoassay", "Serum", "1 mL", "No fasting required.", "12 Hours", 550, 800, "31% OFF", "evaluate suspected thyroid dysfunction (hypothyroidism/hyperthyroidism) and monitor thyroid treatment.", "Acute non-thyroidal illness, pregnancy, and biotin supplementation can alter thyroid hormone immunoassay results."),
    (7, "Thyroid-Stimulating Hormone", "tsh", "TSH", "Immunoassay", "Serum", "1 mL", "No fasting required.", "6 Hours", 300, 450, "33% OFF", "screen for and monitor primary thyroid gland disorders.", "TSH may be unreliable in pituitary disease, severe acute illness, or shortly after thyroid medication dosage changes."),
    (8, "Free Triiodothyronine", "free-t3", "FT3", "Immunoassay", "Serum", "1 mL", "No fasting required.", "12 Hours", 400, 600, "33% OFF", "support evaluation of suspected hyperthyroidism or selected discordant thyroid-function patterns.", "FT3 is usually not the primary test for hypothyroidism and may be lowered by non-thyroidal illness."),
    (9, "Free Thyroxine", "free-t4", "FT4", "Immunoassay", "Serum", "1 mL", "No fasting required.", "12 Hours", 400, 600, "33% OFF", "evaluate active unbound thyroid hormone concentration alongside TSH.", "Pregnancy, severe illness, abnormal binding proteins and high-dose biotin can affect immunoassay estimates."),
    (10, "Lipid Profile", "lipid-profile", "Lipid Panel", "Clinical Chemistry", "Serum", "1 mL", "10 to 12 hours strict fasting recommended.", "12 Hours", 650, 950, "31% OFF", "estimate atherosclerotic cardiovascular risk and monitor cholesterol-lowering treatment.", "Calculated LDL may be unreliable at high triglyceride levels (>400 mg/dL); non-fasting status affects triglyceride levels."),
    (11, "Liver Function Test Panel", "liver-function-test", "LFT", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "12 Hours", 750, 1100, "31% OFF", "evaluate liver cell injury, cholestasis, biliary tract health, and hepatic synthetic capacity.", "Haemolysis falsely increases AST and LDH; alcohol, strenuous exercise, and medications affect liver enzyme baseline."),
    (12, "Kidney Function Test Panel", "kidney-function-test", "KFT", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "12 Hours", 690, 1000, "31% OFF", "evaluate kidney filtration capacity, fluid balance, and renal clearance of nitrogenous wastes.", "eGFR equations have limitations in extreme muscle mass, pregnancy, and rapidly changing acute kidney injury."),
    (13, "Creatinine with eGFR", "creatinine", "Creatinine", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "6 Hours", 250, 380, "34% OFF", "assess and monitor kidney filtration and support medication dosing decisions.", "Creatinine-based eGFR is less reliable in rapidly changing kidney function or unusual muscle mass."),
    (14, "Uric Acid", "uric-acid", "Uric Acid", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "6 Hours", 250, 400, "37% OFF", "support evaluation or monitoring of gout, urate kidney stones, or hyperuricaemia.", "Hyperuricaemia supports but does not diagnose acute gout; serum urate levels can paradoxically drop during an acute gout flare."),
    (15, "C-Reactive Protein", "crp", "CRP", "Immunology", "Serum", "1 mL", "No fasting required.", "6 Hours", 500, 750, "33% OFF", "assess or monitor systemic inflammatory activity, bacterial infections, or autoimmune flares.", "Elevated CRP indicates systemic inflammation but does not specify the anatomical location or exact underlying cause."),
    (16, "Erythrocyte Sedimentation Rate", "erythrocyte-sedimentation-rate", "ESR", "Hematology", "EDTA Whole Blood", "2 mL", "No fasting required.", "6 Hours", 200, 300, "33% OFF", "support evaluation or monitoring of chronic inflammatory, infectious, or rheumatologic conditions.", "ESR is non-specific and is influenced by red blood cell morphology, severe anaemia, pregnancy, and advancing age."),
    (17, "25-Hydroxy Vitamin D", "vitamin-d", "Vitamin D", "Immunoassay", "Serum", "1 mL", "No fasting required.", "24 Hours", 990, 1500, "34% OFF", "evaluate Vitamin D status, bone health, calcium absorption, and deficiency risks.", "Assays vary in detection of D2 and D3 forms; acute illness and binding protein alterations can affect measured total concentration."),
    (18, "Vitamin B12", "vitamin-b12", "Cobalamin", "Immunoassay", "Serum", "1 mL", "6 to 8 hours fasting recommended.", "24 Hours", 890, 1300, "31% OFF", "evaluate suspected B12 deficiency, macrocytic anaemia, neuropathy, or intestinal malabsorption.", "Recent Vitamin B12 supplementation or injections dramatically increase serum levels; active liver disease can falsely elevate B12."),
    (19, "Ferritin", "ferritin", "Ferritin", "Immunoassay", "Serum", "1 mL", "No fasting required.", "24 Hours", 600, 900, "33% OFF", "evaluate body iron stores, iron deficiency anaemia, or iron overload conditions.", "Ferritin is an acute-phase reactant; levels rise during systemic infection, chronic inflammation, or acute liver damage."),
    (20, "Iron Profile", "iron-profile", "Iron Panel", "Clinical Chemistry", "Serum", "1 mL", "8 to 12 hours morning fasting preferred.", "24 Hours", 900, 1400, "35% OFF", "evaluate total serum iron, transferrin saturation, and iron transport capacity.", "Serum iron exhibits marked diurnal variation (highest in morning); recent iron supplements skew results.")
]

additional_tests = [
    ("Hemoglobin", "hemoglobin", "Hb", "Hematology", "EDTA Whole Blood", "2 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "measure total oxygen-carrying protein in blood.", "Altered by dehydration, polycythemia, or acute blood loss."),
    ("Blood Group & Rh Typing", "blood-group-rh-typing", "Blood Group", "Hematology", "EDTA Whole Blood", "2 mL", "No fasting required.", "2 Hours", 250, 400, "37% OFF", "determine ABO blood type and Rh D factor for transfusion or pregnancy.", "Recent blood transfusions or bone marrow transplant can cause mixed-field agglutination."),
    ("Peripheral Blood Smear", "peripheral-blood-smear", "PBS", "Hematology", "Whole Blood Smear", "Smear Slide", "No fasting required.", "12 Hours", 350, 500, "30% OFF", "examine blood cell morphology under microscopy for atypical cells or parasites.", "Requires fresh blood smear preparation within hours of collection."),
    ("Reticulocyte Count", "reticulocyte-count", "Retic Count", "Hematology", "EDTA Whole Blood", "2 mL", "No fasting required.", "12 Hours", 400, 600, "33% OFF", "evaluate bone marrow red blood cell production activity.", "Aplastic anemia or acute chemotherapy suppresses reticulocyte response."),
    ("Folate", "folate", "Folic Acid", "Immunoassay", "Serum", "1 mL", "8 hours fasting recommended.", "12 Hours", 800, 1200, "33% OFF", "assess serum folate levels for megaloblastic anemia evaluation.", "Recent dietary folate intake or vitamin fortification increases serum levels."),
    ("Insulin – Fasting", "insulin-fasting", "Fasting Insulin", "Immunoassay", "Serum", "1 mL", "8 to 10 hours fasting required.", "12 Hours", 750, 1100, "31% OFF", "assess basal insulin secretion and insulin resistance.", "Exogenous insulin administration or anti-insulin antibodies interfere with immunoassay."),
    ("C-Peptide", "c-peptide", "C-Peptide", "Immunoassay", "Serum", "1 mL", "8 to 10 hours fasting required.", "12 Hours", 950, 1400, "32% OFF", "evaluate endogenous beta-cell insulin secretion capacity.", "Renal impairment delays C-peptide clearance, leading to elevated serum concentrations."),
    ("Electrolytes", "electrolytes", "Serum Electrolytes", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 450, 650, "30% OFF", "measure Sodium, Potassium, and Chloride for acid-base and fluid balance.", "In vitro haemolysis falsely elevates potassium levels due to erythrocyte rupture."),
    ("Calcium", "calcium", "Serum Calcium", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 250, 400, "37% OFF", "evaluate serum total calcium for bone, parathyroid, and renal health.", "Changes in serum albumin concentration alter total calcium; calculated or ionized calcium may be needed."),
    ("Phosphorus", "phosphorus", "Serum Phosphorus", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 250, 400, "37% OFF", "assess inorganic phosphate levels for mineral metabolism.", "Hemolyzed samples or delayed plasma separation cause intracellular phosphate release."),
    ("Magnesium", "magnesium", "Serum Magnesium", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 400, 600, "33% OFF", "assess serum magnesium for neuromuscular and cardiac stability.", "Serum magnesium represents less than 1% of total body magnesium stores."),
    ("Total T3", "total-t3", "T3", "Immunoassay", "Serum", "1 mL", "No fasting required.", "4 Hours", 250, 400, "37% OFF", "measure total circulating triiodothyronine.", "Altered thyroid-binding globulin (TBG) levels affect total T3 concentration."),
    ("Total T4", "total-t4", "T4", "Immunoassay", "Serum", "1 mL", "No fasting required.", "4 Hours", 250, 400, "37% OFF", "measure total circulating thyroxine.", "Estrogen therapy or pregnancy increases TBG, falsely raising total T4."),
    ("Anti-TPO Antibody", "anti-tpo-antibody", "Anti-TPO", "Immunoassay", "Serum", "1 mL", "No fasting required.", "12 Hours", 900, 1300, "30% OFF", "evaluate autoimmune thyroiditis (Hashimoto's or Graves' disease).", "Present in low titers in a minority of healthy individuals without clinical dysfunction."),
    ("Thyroglobulin", "thyroglobulin", "Tg", "Immunoassay", "Serum", "1 mL", "No fasting required.", "24 Hours", 1200, 1800, "33% OFF", "monitor differentiated thyroid cancer recurrence after thyroidectomy.", "Presence of anti-thyroglobulin autoantibodies invalidates immunometric Tg assays."),
    ("Thyroglobulin Antibody", "thyroglobulin-antibody", "Anti-Tg", "Immunoassay", "Serum", "1 mL", "No fasting required.", "24 Hours", 1000, 1500, "33% OFF", "screen for autoantibodies interfering with thyroglobulin testing.", "Can be positive in autoimmune thyroid disease without thyroid malignancy."),
    ("PSA – Total", "psa-total", "Total PSA", "Immunoassay", "Serum", "1 mL", "Avoid ejaculation 48h prior.", "12 Hours", 650, 950, "31% OFF", "screen for prostate tissue volume changes or prostate carcinoma.", "Prostatic massage, urinary retention, or recent ejaculation falsely raises PSA."),
    ("PSA – Free", "psa-free", "Free PSA", "Immunoassay", "Serum", "1 mL", "Avoid ejaculation 48h prior.", "12 Hours", 950, 1400, "32% OFF", "evaluate Free/Total PSA ratio to differentiate benign prostatic hyperplasia from carcinoma.", "Unstable at room temperature; requires rapid serum separation and refrigeration."),
    ("Testosterone – Total", "testosterone-total", "Total Testosterone", "Immunoassay", "Serum", "1 mL", "Morning collection (8–10 AM) recommended.", "12 Hours", 650, 950, "31% OFF", "assess androgen levels in hypogonadism or PCOS.", "Exhibits diurnal variation (peaks in early morning); SHBG changes alter total levels."),
    ("Testosterone – Free", "testosterone-free", "Free Testosterone", "Immunoassay", "Serum", "1 mL", "Morning collection recommended.", "24 Hours", 1200, 1800, "33% OFF", "evaluate unbound bioactive testosterone.", "Direct analog immunoassays may be less accurate than calculated free testosterone."),
    ("Estradiol", "estradioli", "E2", "Immunoassay", "Serum", "1 mL", "Specify menstrual cycle phase.", "12 Hours", 650, 950, "31% OFF", "evaluate ovarian estrogen production, fertility, or menopause.", "Varies dramatically across menstrual cycle phases; fulvestrant interferes with assays."),
    ("Progesterone", "progesterone", "P4", "Immunoassay", "Serum", "1 mL", "Specify day of cycle.", "12 Hours", 650, 950, "31% OFF", "assess ovulation and corpus luteum luteal phase adequacy.", "Pulsatile release causes significant intra-day concentration fluctuations."),
    ("FSH", "fsh", "FSH", "Immunoassay", "Serum", "1 mL", "Day 2–5 of cycle recommended.", "12 Hours", 550, 800, "31% OFF", "assess pituitary-gonadal axis and ovarian/testicular reserve.", "Exogenous hormone replacement or oral contraceptives suppress serum FSH."),
    ("LH", "lh", "LH", "Immunoassay", "Serum", "1 mL", "Day 2–5 of cycle recommended.", "12 Hours", 550, 800, "31% OFF", "evaluate mid-cycle ovulatory surge or hypogonadism.", "Pulsatile secretion requires careful clinical correlation with menstrual cycle day."),
    ("Prolactin", "prolactin", "PRL", "Immunoassay", "Serum", "1 mL", "Rest 20 minutes before draw.", "12 Hours", 550, 800, "31% OFF", "investigate galactorrhea, amenorrhea, or pituitary prolactinoma.", "Stress, breast examination, or macroprolactinemia causes false hyperprolactinemia."),
    ("Cortisol", "cortisol", "Cortisol", "Immunoassay", "Serum", "1 mL", "Specify 8 AM or 4 PM timing.", "12 Hours", 650, 950, "31% OFF", "evaluate adrenal function (Cushing's syndrome or Addison's disease).", "Strict diurnal rhythm; high-dose synthetic glucocorticoids cross-react in immunoassays."),
    ("DHEA-S", "dhea-s", "DHEA-S", "Immunoassay", "Serum", "1 mL", "No fasting required.", "12 Hours", 850, 1250, "32% OFF", "evaluate adrenal androgen production in hirsutism or virilization.", "Declines naturally with age; corticosteroid therapy suppresses DHEA-S levels."),
    ("AMH", "amh", "Anti-Mullerian Hormone", "Immunoassay", "Serum", "1 mL", "Can be tested any day of cycle.", "24 Hours", 1800, 2600, "30% OFF", "assess ovarian follicular reserve and egg count potential.", "Does not measure oocyte quality or guarantee pregnancy; oral contraceptives slightly suppress levels."),
    ("β-hCG", "beta-hcg", "Beta hCG", "Immunoassay", "Serum", "1 mL", "No fasting required.", "6 Hours", 550, 800, "31% OFF", "confirm pregnancy or monitor early gestational hCG doubling.", "Heterophile antibodies can cause false-positive serum beta-hCG values."),
    ("Insulin – Post Prandial", "insulin-post-prandial", "PP Insulin", "Immunoassay", "Serum", "1 mL", "Blood drawn 2h post meal.", "12 Hours", 750, 1100, "31% OFF", "assess post-prandial insulin response and hyperinsulinemia.", "Exogenous insulin administration interferes with endogenous measurement."),
    ("HOMA-IR", "homa-ir", "HOMA-IR", "Clinical Chemistry", "Serum + Plasma", "2 mL", "8 to 10 hours fasting required.", "12 Hours", 900, 1350, "33% OFF", "calculate insulin resistance index from fasting glucose and insulin.", "Invalid if patient is on insulin therapy or during acute pancreatic illness."),
    ("hs-CRP", "hs-crp", "hs-CRP", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "12 Hours", 750, 1100, "31% OFF", "assess low-grade vascular inflammation and cardiac risk.", "Acute infections or trauma markedly elevate hs-CRP, obscuring baseline vascular risk."),
    ("Procalcitonin", "procalcitonin", "PCT", "Immunoassay", "Serum", "1 mL", "No fasting required.", "12 Hours", 2200, 3200, "31% OFF", "evaluate severe systemic bacterial infection or sepsis risk.", "Viral infections typically do not elevate PCT; major surgery or trauma causes transient elevation."),
    ("D-Dimer", "d-dimer", "D-Dimer", "Hematology", "Citrated Plasma", "2 mL", "No fasting required.", "6 Hours", 1200, 1800, "33% OFF", "rule out venous thromboembolism (DVT / Pulmonary Embolism).", "Elevated in inflammation, pregnancy, malignancy, or recent surgery (low specificity)."),
    ("PT / INR", "pt-inr", "PT/INR", "Hematology", "Citrated Plasma", "2 mL", "No fasting required.", "6 Hours", 400, 600, "33% OFF", "monitor warfarin anticoagulant therapy and extrinsic clotting pathway.", "Underfilled sodium citrate tubes alter citrate-to-blood ratio, distorting INR."),
    ("aPTT", "aptt", "aPTT", "Hematology", "Citrated Plasma", "2 mL", "No fasting required.", "6 Hours", 500, 750, "33% OFF", "evaluate intrinsic coagulation pathway and heparin therapy.", "Heparin contamination or lupus anticoagulants prolong aPTT."),
    ("Fibrinogen", "fibrinogen", "Fibrinogen", "Hematology", "Citrated Plasma", "2 mL", "No fasting required.", "12 Hours", 750, 1100, "31% OFF", "measure clotting factor I concentration.", "Fibrin degradation products (FDPs) interfere with functional assay timing."),
    ("Bleeding Time", "bleeding-time", "BT", "Hematology", "Capillary Blood", "In-Lab", "No fasting required.", "Immediate", 200, 300, "33% OFF", "assess primary hemostasis and capillary platelet function.", "Technique dependent; aspirin or NSAIDs prolong bleeding time."),
    ("Clotting Time", "clotting-time", "CT", "Hematology", "Venous Blood", "In-Lab", "No fasting required.", "Immediate", 200, 300, "33% OFF", "evaluate overall intrinsic coagulation cascade.", "Superseded by automated aPTT for clinical sensitivity."),
    ("Blood Urea Nitrogen", "blood-urea-nitrogen", "BUN", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "6 Hours", 200, 300, "33% OFF", "evaluate protein catabolism and renal excretion.", "High protein diets or gastrointestinal bleeding raise BUN independently of kidney function."),
    ("eGFR", "egfr", "eGFR", "Clinical Chemistry", "Serum", "1 mL", "Calculated", "6 Hours", 300, 450, "33% OFF", "estimate glomerular filtration rate using CKD-EPI formula.", "Not accurate in acute kidney injury, extreme body size, or amputees."),
    ("Sodium", "sodium", "Sodium", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "assess extracellular fluid electrolyte status.", "Hyperlipidemia or hyperproteinemia can cause pseudohyponatremia on indirect ISE."),
    ("Potassium", "potassium", "Potassium", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "assess intracellular electrolyte and cardiac rhythm risk.", "In vitro hemolysis or delayed centrifugation causes false hyperkalemia."),
    ("Chloride", "chloride", "Chloride", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "assess acid-base disturbances and anion gap.", "Bromide medication toxicity cross-reacts as false hyperchloremia."),
    ("Bicarbonate", "bicarbonate", "HCO3", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 350, 500, "30% OFF", "assess metabolic acid-base status.", "Sample exposure to ambient air causes CO2 loss and falsely low bicarbonate."),
    ("SGPT / ALT", "sgpt-alt", "ALT", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "detect hepatocyte necrosis and acute liver injury.", "Strenuous weightlifting or muscle trauma can elevate serum ALT."),
    ("SGOT / AST", "sgot-ast", "AST", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "detect liver cell injury or myocardial/skeletal muscle damage.", "AST is present in cardiac and skeletal muscle; non-specific for liver alone."),
    ("Alkaline Phosphatase", "alkaline-phosphatase", "ALP", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 220, 350, "37% OFF", "detect cholestasis, biliary obstruction, or bone turnover.", "Physiologically elevated during rapid bone growth in children and third trimester pregnancy."),
    ("Gamma GT", "gamma-gt", "GGT", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 350, 500, "30% OFF", "confirm biliary origin of elevated ALP or evaluate alcohol use.", "Enzyme-inducing medications (anticonvulsants) raise GGT without liver pathology."),
    ("Bilirubin – Total", "bilirubin-total", "Total Bilirubin", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "assess total serum bile pigment concentration for jaundice.", "Direct light exposure photo-degrades bilirubin in sample tubes."),
    ("Bilirubin – Direct", "bilirubin-direct", "Direct Bilirubin", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "measure conjugated bilirubin to evaluate biliary excretion.", "Severe hemolysis interferes with diazo reaction chemistry."),
    ("Bilirubin – Indirect", "bilirubin-indirect", "Indirect Bilirubin", "Clinical Chemistry", "Serum", "1 mL", "Calculated", "4 Hours", 200, 300, "33% OFF", "assess unconjugated bilirubin for hemolytic states.", "Calculated by subtracting direct from total bilirubin."),
    ("Total Protein", "total-protein", "Total Protein", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 200, 300, "33% OFF", "measure total serum albumin and globulins.", "Dehydration falsely elevates protein concentration due to hemoconcentration."),
    ("Albumin", "albumin", "Albumin", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 180, 270, "33% OFF", "assess hepatic protein synthesis and nutritional status.", "Infusion of IV albumin or blood products temporarily alters results."),
    ("Globulin", "globulin", "Globulin", "Clinical Chemistry", "Serum", "1 mL", "Calculated", "4 Hours", 180, 270, "33% OFF", "assess serum immunoglobulins and inflammatory proteins.", "Calculated by subtracting albumin from total protein."),
    ("Amylase", "amylase", "Amylase", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 450, 650, "30% OFF", "evaluate acute pancreatitis or salivary gland disorders.", "Macroamylasemia causes persistent hyperamylasemia without pancreatic pathology."),
    ("Lipase", "lipase", "Lipase", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 550, 800, "31% OFF", "specifically evaluate acute pancreatic tissue injury.", "More specific for pancreatitis than amylase; stays elevated longer."),
    ("LDH", "ldh", "LDH", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 400, 600, "33% OFF", "assess tissue breakdown, hemolysis, or tumor burden.", "In vitro hemolysis renders sample invalid due to massive erythrocyte LDH leakage."),
    ("CK / CPK", "ck-cpk", "CPK", "Clinical Chemistry", "Serum", "1 mL", "Avoid strenuous exercise 24h prior.", "4 Hours", 450, 650, "30% OFF", "assess muscle damage, rhabdomyolysis, or myositis.", "Intramuscular injections or strenuous exercise elevate total CPK."),
    ("CK-MB", "ck-mb", "CK-MB", "Clinical Chemistry", "Serum", "1 mL", "No fasting required.", "4 Hours", 600, 900, "33% OFF", "assess cardiac muscle tissue injury.", "Severe skeletal muscle trauma can elevate CK-MB mass."),
    ("Troponin I", "troponin-i", "hs-cTnI", "Cardiology", "Serum", "1 mL", "No fasting required.", "2 Hours", 1100, 1600, "31% OFF", "detect acute myocardial infarction (heart attack).", "Renal failure or pulmonary embolism can cause baseline troponin elevation."),
    ("Troponin T", "troponin-t", "hs-cTnT", "Cardiology", "Serum", "1 mL", "No fasting required.", "2 Hours", 1200, 1800, "33% OFF", "detect acute myocardial injury with high sensitivity.", "Skeletal myopathies can cross-react in certain cTnT assays."),
    ("NT-proBNP", "nt-probnp", "NT-proBNP", "Cardiology", "Serum", "1 mL", "No fasting required.", "4 Hours", 2400, 3500, "31% OFF", "assess ventricular wall stress and heart failure.", "Elevated in renal insufficiency due to reduced clearance."),
    ("Urine Routine & Microscopy", "urine-routine-microscopy", "Urine Routine", "Urinalysis", "Mid-stream Urine", "20 mL", "Clean mid-stream catch required.", "2 Hours", 200, 300, "33% OFF", "screen for UTI, hematuria, proteinuria, and kidney disease.", "Contamination with vaginal secretions or menstrual blood alters results."),
    ("Urine Culture", "urine-culture", "Urine C&S", "Microbiology", "Sterile Urine", "10 mL", "Sterile mid-stream catch prior to antibiotics.", "48 Hours", 650, 950, "31% OFF", "identify bacterial urinary pathogens and drug sensitivity.", "Prior antibiotic administration suppresses bacterial growth in culture."),
    ("Urine Microalbumin", "urine-microalbumin", "Microalbumin", "Nephrology", "Random Urine", "10 mL", "First morning void preferred.", "4 Hours", 550, 800, "31% OFF", "detect early diabetic nephropathy and endothelial damage.", "Fever, acute exercise, or UTI causes transient false-positive microalbuminuria."),
    ("Urine Protein – 24 Hour", "urine-protein-24-hour", "24h Urine Protein", "Nephrology", "24-Hour Urine", "Container", "Collect 24h urine volume strictly.", "12 Hours", 500, 750, "33% OFF", "quantify daily protein excretion in nephrotic syndrome.", "Incomplete 24-hour collection invalidates total protein calculation."),
    ("Stool Routine Examination", "stool-routine-examination", "Stool Routine", "Gastroenterology", "Fresh Stool", "Container", "Clean container, no urine mix.", "4 Hours", 250, 400, "37% OFF", "screen for intestinal parasites, ova, cysts, and digestion status.", "Urine or water contamination damages protozoal trophozoites."),
    ("Stool Occult Blood", "stool-occult-blood", "FOBT", "Gastroenterology", "Fresh Stool", "Container", "Avoid red meat 48h prior.", "4 Hours", 350, 500, "30% OFF", "detect hidden gastrointestinal bleeding.", "Red meat, peroxidase-rich foods, or aspirin cause false positives."),
    ("HBsAg", "hbsag", "HBsAg", "Virology", "Serum", "1 mL", "No fasting required.", "4 Hours", 450, 650, "30% OFF", "screen for active Hepatitis B virus infection.", "Recent Hepatitis B vaccination can cause transient false positivity for days."),
    ("Anti-HCV", "anti-hcv", "Anti-HCV", "Virology", "Serum", "1 mL", "No fasting required.", "4 Hours", 550, 800, "31% OFF", "screen for antibodies against Hepatitis C virus.", "Does not differentiate between acute, chronic, or resolved HCV infection."),
    ("HIV 1 & 2 Antibody", "hiv-1-2-antibody", "HIV Combo", "Virology", "Serum", "1 mL", "No fasting required.", "4 Hours", 500, 750, "33% OFF", "screen for HIV infection via 4th generation antigen/antibody combo.", "Testing within the early window period (first 2-3 weeks) may yield false negatives."),
    ("VDRL", "vdrl", "VDRL", "Serology", "Serum", "1 mL", "No fasting required.", "4 Hours", 300, 450, "33% OFF", "screen for Treponema pallidum syphilis serology.", "Biological false positives occur in malaria, lupus, pregnancy, or leprosy."),
    ("Widal Test", "widal-test", "Widal", "Serology", "Serum", "1 mL", "No fasting required.", "4 Hours", 300, 450, "33% OFF", "evaluate agglutinating antibodies against Salmonella typhi.", "Prior typhoid vaccination or past exposure causes elevated baseline titers."),
    ("Dengue NS1 Antigen", "dengue-ns1-antigen", "Dengue NS1", "Serology", "Serum", "1 mL", "Test within day 1-5 of fever.", "2 Hours", 600, 900, "33% OFF", "detect early Dengue viral antigen during acute fever phase.", "Sensitivity drops significantly after day 5 of fever onset."),
    ("Dengue IgM & IgG", "dengue-igm-igg", "Dengue Serology", "Serology", "Serum", "1 mL", "Test from day 5 of fever.", "2 Hours", 750, 1100, "31% OFF", "detect acute (IgM) or past/secondary (IgG) Dengue infection.", "Cross-reactivity occurs with other flaviviruses like Zika or West Nile."),
    ("Malaria Parasite", "malaria-parasite", "MP Smear", "Parasitology", "EDTA Whole Blood", "2 mL", "Collect during fever spike.", "2 Hours", 350, 500, "30% OFF", "detect Plasmodium vivax / falciparum in blood smear or antigen.", "Low parasite density during early infection may require repeat blood smears."),
    ("Typhoid IgM", "typhoid-igm", "Typhidot", "Serology", "Serum", "1 mL", "Test from day 3-4 of fever.", "4 Hours", 550, 800, "31% OFF", "detect early IgM antibodies against Salmonella typhi.", "Cross-reactivity with other enterobacteriaceae infections can occur."),
    ("COVID-19 RT-PCR", "covid-19-rt-pcr", "COVID PCR", "Molecular", "Nasopharyngeal Swab", "Swab", "No eating 30m prior.", "12 Hours", 800, 1200, "33% OFF", "gold-standard molecular RT-PCR detection of SARS-CoV-2 viral RNA.", "Improper swab sampling technique can produce false-negative results."),
    ("Vitamin B1 (Thiamine)", "vitamin-b1-thiamine", "Vitamin B1", "Nutritional", "Whole Blood", "2 mL", "No fasting required.", "24 Hours", 1800, 2600, "30% OFF", "assess thiamine pyrophosphate (TPP) for Wernicke-Korsakoff or beriberi.", "Light-sensitive specimen; requires immediate protection from ambient light.")
]

for item in additional_tests:
    name, slug, short, dept, sample, vol, fasting, tat, price, mrp, discount, why, lim = item
    raw_100_list.append((len(raw_100_list)+1, name, slug, short, dept, sample, vol, fasting, tat, price, mrp, discount, why, lim))

cms_map = {}
for entry in raw_100_list:
    num, name, slug, short, dept, sample, vol, fasting, tat, price, mrp, discount, why, lim = entry
    test_obj = build_mega_test(num, name, slug, short, dept, sample, vol, fasting, tat, price, mrp, discount, why, lim)
    cms_map[slug] = test_obj

ts_content = "import type { DynamicPageData } from './dynamicPageResolver';\n\n"
ts_content += "export const cms100MasterData: Record<string, DynamicPageData> = "
ts_content += json.dumps(cms_map, indent=2)
ts_content += ";\n"

with open("src/lib/seoPages/cms100MasterData.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Successfully generated {len(cms_map)} mega-expanded test pages with NABL Certified branding into src/lib/seoPages/cms100MasterData.ts")
