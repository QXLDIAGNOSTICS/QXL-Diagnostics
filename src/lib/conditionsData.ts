import { findMasterBySlug, nameMatchesMaster } from "./masterCatalogue";

export interface ConditionItem {
  slug: string;
  title: string;
  h1Title: string;
  subtitle: string;
  category: string;
  symptoms: string[];
  recommendedTests: { name: string; slug: string; price: string; description: string }[];
  overview: string[];
  guidelines: string[];
  faqs: { question: string; answer: string }[];
}

const RAW_CONDITIONS_DATA: Record<string, ConditionItem> = {
  "diabetes-testing": {
    slug: "diabetes-testing",
    title: "Diabetes Blood Tests & Diagnostic Screening Bangalore | QXL",
    h1Title: "Diabetes Blood Tests & Monitoring in Bangalore",
    subtitle: "Comprehensive NABL Accredited diagnostic screening for prediabetes, Type 1, Type 2, and gestational diabetes mellitus.",
    category: "Metabolic & Diabetes",
    symptoms: ["Increased thirst (polydipsia)", "Frequent urination (polyuria)", "Unexplained weight loss", "Chronic fatigue", "Blurred vision"],
    recommendedTests: [
      { name: "HbA1c Glycated Haemoglobin", slug: "hba1c-test-bangalore", price: "399", description: "Reflects average blood sugar over 2–3 months without fasting." },
      { name: "Fasting Blood Sugar (FBS)", slug: "fasting-blood-sugar-test-bangalore", price: "150", description: "Measures baseline glucose after 8–10 hours overnight fast." },
      { name: "Fasting Insulin & HOMA-IR", slug: "homa-ir-test-bangalore", price: "650", description: "Evaluates cellular insulin resistance and hyperinsulinaemia." },
      { name: "C-Peptide Blood Test", slug: "c-peptide-test-bangalore", price: "750", description: "Measures natural pancreatic insulin production." }
    ],
    overview: [
      "Diabetes mellitus is a metabolic disorder characterized by persistent hyperglycaemia resulting from defects in insulin secretion, insulin action, or both.",
      "Early detection through routine screening prevents long-term microvascular and macrovascular complications affecting the eyes, kidneys, nerves, and heart."
    ],
    guidelines: [
      "Fasting glucose tests require strict 8 to 10 hours overnight fasting (water permitted).",
      "HbA1c testing does not require fasting and can be collected at any time of day.",
      "Patients taking insulin or diabetes medications should follow physician guidance regarding morning dosing."
    ],
    faqs: [
      { question: "What is the difference between Fasting Glucose and HbA1c?", answer: "Fasting glucose measures your blood sugar at one exact moment after an overnight fast, whereas HbA1c reflects average blood sugar control over the past 2 to 3 months." },
      { question: "How often should diabetics test their HbA1c?", answer: "Clinical guidelines recommend testing HbA1c every 3 months for unmanaged diabetes and every 6 months for well-controlled diabetes." }
    ]
  },
  "thyroid-disorders": {
    slug: "thyroid-disorders",
    title: "Thyroid Function Tests & Diagnostic Screening Bangalore | QXL",
    h1Title: "Thyroid Disorders & Blood Testing in Bangalore",
    subtitle: "Complete thyroid evaluation including TSH, Free T3, Free T4, Anti-TPO, and Anti-Thyroglobulin antibodies.",
    category: "Thyroid & Endocrinology",
    symptoms: ["Unexplained weight gain or difficulty losing weight", "Cold intolerance or excessive sweating", "Chronic fatigue & muscle weakness", "Hair thinning & dry skin", "Irregular menstrual cycles"],
    recommendedTests: [
      { name: "TSH (Thyroid Stimulating Hormone)", slug: "tsh-test-bangalore", price: "350", description: "Primary first-line laboratory test for thyroid screening." },
      { name: "Free T3 (FT3)", slug: "free-t3-test-bangalore", price: "450", description: "Measures active unbound triiodothyronine hormone." },
      { name: "Free T4 (FT4)", slug: "free-t4-test-bangalore", price: "450", description: "Measures active unbound thyroxine gland output." },
      { name: "Anti-TPO Autoantibodies", slug: "anti-tpo-test-bangalore", price: "750", description: "Diagnoses autoimmune Hashimoto's thyroiditis or Graves' disease." }
    ],
    overview: [
      "Thyroid disorders — including hypothyroidism (underactive thyroid) and hyperthyroidism (overactive thyroid) — affect millions of adults in India, particularly women.",
      "Evaluation begins with serum TSH, followed by Free T4, Free T3, and thyroid autoantibody testing when indicated."
    ],
    guidelines: [
      "Routine thyroid tests generally do not require strict fasting.",
      "If taking thyroid hormone replacement (levothyroxine), consult your doctor whether to hold the morning dose prior to sample collection."
    ],
    faqs: [
      { question: "Does high TSH mean underactive thyroid?", answer: "Yes, elevated TSH usually indicates hypothyroidism, as the pituitary gland produces more TSH to stimulate an underperforming thyroid." }
    ]
  },
  "anaemia-testing": {
    slug: "anaemia-testing",
    title: "Anaemia & Iron Deficiency Blood Tests Bangalore | QXL",
    h1Title: "Anaemia & Iron Deficiency Diagnostics in Bangalore",
    subtitle: "NABL Accredited laboratory testing for iron deficiency, Vitamin B12 deficiency, folate deficiency, and haemoglobinopathies.",
    category: "Haematology & Nutrition",
    symptoms: ["Pale skin and inner eyelids", "Shortness of breath on mild exertion", "Dizziness & lightheadedness", "Cold hands and feet", "Brittle nails or unusual cravings (pica)"],
    recommendedTests: [
      { name: "CBC (Complete Blood Count)", slug: "cbc-test-bangalore", price: "299", description: "Measures Haemoglobin, RBC, WBC, and Platelet count." },
      { name: "Iron Profile & Ferritin", slug: "iron-profile-test-bangalore", price: "850", description: "Complete iron availability, TIBC, and tissue iron storage." },
      { name: "Vitamin B12 Blood Test", slug: "vitamin-b12-test-bangalore", price: "600", description: "Evaluates cobalamin levels for megaloblastic anaemia." }
    ],
    overview: [
      "Anaemia is characterized by a low concentration of haemoglobin or red blood cells, impairing oxygen delivery to tissues.",
      "Iron deficiency is the most frequent cause in India, alongside Vitamin B12 and Folate deficiencies."
    ],
    guidelines: [
      "Morning fasting is recommended for Iron Profile testing due to diurnal serum iron fluctuations.",
      "CBC testing alone does not require fasting."
    ],
    faqs: [
      { question: "What is the most sensitive test for iron deficiency?", answer: "Serum Ferritin is the single most sensitive marker for detecting early iron store depletion before overt anaemia develops." }
    ]
  },
  "food-intolerance-digestive": {
    slug: "food-intolerance-digestive",
    title: "Food Sensitivity & Intolerance Diagnostics Bangalore | QXL",
    h1Title: "Food Sensitivity & Digestive Intolerance Testing in Bangalore",
    subtitle: "Comprehensive 287 IgG food antigen microarray panel for evaluating delayed dietary sensitivities, chronic bloating, and digestive discomfort.",
    category: "Gastroenterology & Allergy",
    symptoms: ["Chronic abdominal bloating & gas", "Recurrent IBS symptoms", "Unexplained skin rashes or eczema", "Post-meal fatigue & brain fog", "Irritable bowel discomfort"],
    recommendedTests: [
      { name: "Comprehensive Food Sensitivity Test (287 Foods)", slug: "food-sensitivity-test-bangalore", price: "14500", description: "Evaluates delayed IgG antibody reactivity against 287 food antigens." },
      { name: "Total IgE Allergy Panel", slug: "ige-allergy-test", price: "1200", description: "Screens for immediate IgE-mediated allergic reactions." },
      { name: "Liver Function Test (LFT)", slug: "liver-function-test", price: "425", description: "Evaluates hepatic digestive enzyme production and bile excretion." }
    ],
    overview: [
      "Delayed food sensitivity involves Immunoglobulin G (IgG) antibody reactions to specific food proteins, causing symptoms hours to days after consumption.",
      "Quantitative 287 food IgG testing provides an empirical basis for structured elimination and rotation diets under clinical guidance."
    ],
    guidelines: [
      "No fasting is required for the 287 food sensitivity IgG blood panel.",
      "Maintain a regular diet leading up to sample collection so circulating food-specific IgG antibodies remain detectable."
    ],
    faqs: [
      { question: "How does a food sensitivity IgG test help structure a diet?", answer: "IgG testing categorizes 287 foods into low, moderate, and elevated reactivity tiers, allowing clinicians and nutritionists to guide targeted elimination diets." }
    ]
  },
  "thyroid": {
    slug: "thyroid",
    title: "Thyroid Blood Tests & Function Profile Bangalore | QXL Diagnostics",
    h1Title: "Thyroid Function Tests & Hormonal Screening in Bangalore",
    subtitle: "Complete clinical thyroid evaluation including TSH, Free T3, Free T4, Anti-TPO, and Total Thyroid profiles with doctor-reviewed reports.",
    category: "Thyroid & Endocrinology",
    symptoms: ["Unexplained weight changes", "Cold intolerance or heat sensitivity", "Hair thinning & dry skin", "Chronic fatigue & brain fog", "Mood fluctuations and irregular cycles"],
    recommendedTests: [
      { name: "Thyroid Function Test (TFT - T3, T4, TSH)", slug: "thyroid-test", price: "500", description: "Comprehensive 3-parameter thyroid hormonal profile." },
      { name: "TSH (Thyroid Stimulating Hormone)", slug: "tsh-test-bangalore", price: "350", description: "First-line screening marker for hypothyroid or hyperthyroid states." },
      { name: "Thyroid Profile Free (FT3, FT4, TSH)", slug: "book?test=thyroid-profile-free", price: "750", description: "Direct measure of active unbound circulating thyroid hormones with TSH." },
      { name: "Anti-TPO Autoantibody Test", slug: "thyroid-peroxidase-antibody", price: "1290", description: "Detects autoimmune Hashimoto's thyroiditis." }
    ],
    overview: [
      "The thyroid gland regulates basal metabolic rate, energy expenditure, protein synthesis, and hormone sensitivity throughout the body.",
      "Routine screening with sensitive ultrasensitive chemiluminescence assays ensures early detection before severe metabolic or cardiovascular symptoms emerge."
    ],
    guidelines: [
      "No strict fasting required for routine TSH or Thyroid Profile.",
      "If you take levothyroxine or thyroid medications, consult your physician on whether to take your dose before or after morning collection."
    ],
    faqs: [
      { question: "Can thyroid imbalance cause sudden hair fall?", answer: "Yes, both hypothyroidism and hyperthyroidism disrupt the hair follicle growth cycle, frequently causing diffuse hair thinning and shedding." },
      { question: "How fast do I get thyroid reports at QXL?", answer: "Thyroid test reports are processed via automated immunoassay analyzers and delivered within 6 hours." }
    ]
  },
  "hair-fall": {
    slug: "hair-fall",
    title: "Hair Fall Blood Tests & Trigger Diagnostics Bangalore | QXL",
    h1Title: "Hair Fall & Scalp Health Trigger Diagnostics in Bangalore",
    subtitle: "Don't just treat the hair from outside. Find the root biological trigger — Ferritin, Thyroid, Vitamin D3, B12, Zinc, and DHT hormones.",
    category: "Dermatology & Metabolic Health",
    symptoms: ["Excessive hair shedding (>100 strands daily)", "Widening hair partition or receding hairline", "Brittle, dull hair texture", "Chronic fatigue alongside hair thinning", "Scalp sensitivity or unexplained patchy loss"],
    recommendedTests: [
      { name: "Hair Fall Comprehensive Screen", slug: "packages", price: "2399", description: "Includes Serum Ferritin, Thyroid (TSH), Vitamin D3, Vitamin B12, Iron & CBC." },
      { name: "Serum Ferritin & Iron Studies", slug: "iron-profile-test-bangalore", price: "850", description: "Evaluates cellular iron storage essential for hair follicle matrix replication." },
      { name: "Vitamin D3 (25-OH) Total", slug: "vitamin-d-test", price: "990", description: "Critical for hair follicle stem cell activation and cycling." },
      { name: "Vitamin B12 Blood Assay", slug: "vitamin-b12-test", price: "990", description: "Supports oxygen transport and red blood cell nourishment of hair roots." }
    ],
    overview: [
      "Hair follicles are among the most metabolically active structures in the human body. When systemic deficiencies or hormonal shifts occur, the body diverts resources away from hair growth, triggering telogen effluvium.",
      "Treating hair fall effectively requires diagnosing internal triggers: iron deficiency, thyroid dysfunction, Vitamin D deficiency, hormonal fluctuations, or autoimmune alopecia."
    ],
    guidelines: [
      "Overnight 8-hour fasting is recommended if the panel includes full iron studies and fasting metabolic markers.",
      "Avoid heavy biotin supplements for 48 hours prior to testing as high-dose biotin can interfere with certain immunoassay assays."
    ],
    faqs: [
      { question: "Why is ferritin crucial for hair growth?", answer: "Ferritin stores iron inside cells. When ferritin drops below optimal levels (often <50 ng/mL), hair follicles enter a resting shedding phase even if basic hemoglobin looks normal." },
      { question: "Which doctor reviews my hair fall diagnostic report?", answer: "All QXL diagnostic panels are signed off by Consultant Pathologists and Biochemists with medical reference ranges tailored for clinical dermatology." }
    ]
  },
  "joint-pain": {
    slug: "joint-pain",
    title: "Joint Pain, Arthritis & Bone Health Blood Tests Bangalore | QXL",
    h1Title: "Joint Pain, Arthritis & Bone Diagnostics in Bangalore",
    subtitle: "Accurate NABL Accredited testing for Rheumatoid Arthritis (RA Factor, Anti-CCP), Uric Acid Gout, Calcium, Vitamin D, and Autoimmune joint markers.",
    category: "Rheumatology & Orthopaedics",
    symptoms: ["Morning stiffness in fingers, knees or joints lasting >30 mins", "Joint swelling, redness and tenderness", "Persistent lower back or hip discomfort", "Difficulty climbing stairs or bearing weight", "Sudden acute throbbing pain in big toe (Gout)"],
    recommendedTests: [
      { name: "Arthritis & Joint Profile", slug: "packages", price: "1899", description: "Comprehensive RA Factor, Serum Uric Acid, Calcium, Vitamin D & hs-CRP." },
      { name: "Anti-CCP Autoantibody Test", slug: "speciality-tests", price: "1250", description: "Gold standard diagnostic marker with >95% specificity for Rheumatoid Arthritis." },
      { name: "Serum Uric Acid Test", slug: "kidney-function-test", price: "250", description: "Identifies hyperuricemia and crystal-induced gouty arthritis." },
      { name: "Vitamin D3 & Calcium Panel", slug: "vitamin-d-test", price: "1150", description: "Evaluates bone mineral density risk, osteopenia, and calcium metabolic balance." }
    ],
    overview: [
      "Joint pain can stem from osteoarthritis (mechanical wear), inflammatory arthritis (Rheumatoid arthritis, Ankylosing Spondylitis), metabolic crystal deposition (Gout), or underlying nutritional osteomalacia.",
      "Differential blood diagnosis is essential before starting immunosuppressants, uric-acid lowering drugs, or anti-inflammatory therapies."
    ],
    guidelines: [
      "Fasting is recommended if Serum Uric Acid and bone metabolic panels are combined with lipid profiles.",
      "Avoid acute alcohol consumption 24 hours prior to uric acid testing."
    ],
    faqs: [
      { question: "What is the difference between RA factor and Anti-CCP?", answer: "While RA factor can be positive in several inflammatory conditions, Anti-CCP is highly specific for rheumatoid arthritis and can detect it years before joint erosion begins." },
      { question: "Can low Vitamin D cause widespread joint and body aches?", answer: "Yes, severe Vitamin D deficiency causes osteomalacia and bone turnover stress, frequently masquerading as chronic joint and muscle pain." }
    ]
  },
  "allergy": {
    slug: "allergy",
    title: "Allergy Blood Tests & Total IgE Screening Bangalore | QXL",
    h1Title: "Allergy Testing, Total IgE & Environmental Panels in Bangalore",
    subtitle: "Identify allergic triggers with advanced ImmunoCAP Total IgE, Phadiatop respiratory inhalant screens, food allergen panels, and CBC eosinophil counts.",
    category: "Allergy & Clinical Immunology",
    symptoms: ["Frequent sneezing, runny or congested nose (Rhinitis)", "Itchy, watery or red eyes", "Skin urticaria, hives, itching or eczema", "Wheezing, nocturnal cough or breathing tightness", "Immediate food reactions (swelling, gastrointestinal distress)"],
    recommendedTests: [
      { name: "Total IgE Serum Test", slug: "speciality-tests", price: "600", description: "Quantitative measurement of total circulating allergic immunoglobulin E." },
      { name: "Complete Blood Count (CBC) with Absolute Eosinophils", slug: "cbc-test", price: "250", description: "Evaluates allergic cellular response through circulating eosinophil levels." },
      { name: "Phadiatop Inhalant Allergy Screen", slug: "speciality-tests", price: "1800", description: "Screens for common aeroallergens including pollen, dust mites, and pet dander." },
      { name: "Comprehensive Food Allergy Profile", slug: "speciality-tests", price: "4500", description: "Specific IgE antibody panels for dairy, nuts, seafood, wheat, and eggs." }
    ],
    overview: [
      "Allergic reactions occur when the immune system overreacts to harmless environmental antigens by producing allergen-specific IgE antibodies.",
      "Modern in-vitro blood testing avoids the discomfort and anaphylaxis risk of skin prick tests, and can be safely performed without discontinuing antihistamines."
    ],
    guidelines: [
      "No fasting required for allergy blood tests.",
      "Unlike skin prick testing, blood allergy tests are unaffected by antihistamines or corticosteroid nasal sprays."
    ],
    faqs: [
      { question: "Do I need to stop allergy medications before a blood test?", answer: "No. Serum IgE antibody blood tests are unaffected by antihistamines, making them safer and more convenient than skin-prick testing." },
      { question: "How does Total IgE differ from Specific IgE?", answer: "Total IgE measures overall allergic reactivity in your body, whereas Specific IgE identifies the exact allergen (such as dust mite, pollen, or egg)." }
    ]
  },
  "fever-season": {
    slug: "fever-season",
    title: "Fever Blood Tests, Dengue & Monsoon Profiles Bangalore | QXL",
    h1Title: "Fever Profiles, Dengue & Infectious Disease Testing in Bangalore",
    subtitle: "Stay ahead of fever season with rapid NABL Accredited diagnostic panels — Dengue NS1 & IgM, Malaria, Typhoid, CBC Platelet count, and CRP.",
    category: "Infectious Diseases & Fever",
    symptoms: ["Sudden high grade fever with chills or rigors", "Severe body ache, headache or retro-orbital pain (behind eyes)", "Rapidly dropping platelet count or petechial spots", "Joint and muscle aches (breakbone fever)", "Nausea, persistent fatigue and loss of appetite"],
    recommendedTests: [
      { name: "Dengue Profile - Rapid with CBC", slug: "packages", price: "600", description: "Includes Dengue NS1 Antigen, IgM & IgG Antibodies + Complete Blood Count with Platelets." },
      { name: "Fever Profile - Comprehensive", slug: "packages", price: "1999", description: "69 Parameters covering Dengue, Malaria, Typhoid (Widal), Urine Routine, LFT, KFT & CBC." },
      { name: "Monsoon Fever Panel", slug: "packages", price: "1599", description: "68 Parameters targeted for seasonal viral infections, vector-borne illnesses & blood count." },
      { name: "Complete Blood Count (CBC) with Platelet Count", slug: "cbc-test", price: "250", description: "Essential monitor for daily platelet counts and hematocrit during viral fever." }
    ],
    overview: [
      "Seasonal and monsoon fevers can rapidly escalate from common viral syndromes to critical vector-borne conditions like Dengue, Malaria, or bacterial Typhoid.",
      "Early diagnosis on Day 1 to Day 3 of fever with NS1 antigen and platelet monitoring prevents critical complications like dengue shock or severe thrombocytopenia."
    ],
    guidelines: [
      "No fasting required for fever and infectious disease panels.",
      "Home sample collection is prioritized with priority 6-hour express reporting across Bengaluru."
    ],
    faqs: [
      { question: "When should I test for Dengue after fever starts?", answer: "Dengue NS1 Antigen is detectable from Day 1 to Day 5 of fever onset. Platelet count should be monitored closely during the defervescence stage (Day 3 to Day 7)." },
      { question: "Can QXL phlebotomists collect fever blood samples at home?", answer: "Yes, QXL provides doorstep home sample collection across all Bengaluru localities with sterilized, sterile single-use vacuum tubes." }
    ]
  },
  "pcos-pcod-hormone-testing": {
    slug: "pcos-pcod-hormone-testing",
    title: "PCOS & PCOD Hormone Blood Tests Bangalore | QXL Diagnostics",
    h1Title: "PCOS & PCOD Diagnostic Hormone Profile in Bangalore",
    subtitle: "Comprehensive hormonal and metabolic evaluation for Polycystic Ovary Syndrome including LH:FSH ratio, Total Testosterone, DHEA-S, Fasting Insulin, and AMH.",
    category: "Women's Health & Endocrinology",
    symptoms: [
      "Irregular, delayed, or missed menstrual cycles (oligomenorrhea/amenorrhea)",
      "Excess facial or body hair growth (hirsutism) and cystic hormonal acne",
      "Thinning scalp hair or androgenic hair fall along the parting line",
      "Rapid, unexplained weight gain around the lower abdomen and difficulty losing weight",
      "Darkened velvety skin patches (acanthosis nigricans) on neck, underarms, or groin",
      "Mood fluctuations, fatigue, and difficulty conceiving (ovulatory subfertility)"
    ],
    recommendedTests: [
      { name: "Total & Free Testosterone", slug: "tests/testosterone-test-bangalore", price: "600", description: "Measures circulating androgen levels responsible for hirsutism, acne, and ovulatory arrest." },
      { name: "Anti-Müllerian Hormone (AMH)", slug: "tests/amh-test-bangalore", price: "1600", description: "Evaluates ovarian antral follicle reserve; elevated AMH is a classic biomarker of polycystic ovaries." },
      { name: "Fasting Insulin & HOMA-IR", slug: "tests/homa-ir-test-bangalore", price: "650", description: "Detects underlying hyperinsulinaemia and cellular insulin resistance that drives ovarian androgen overproduction." },
      { name: "Thyroid Stimulating Hormone (TSH)", slug: "tsh-test-bangalore", price: "180", description: "Rules out concurrent subclinical hypothyroidism which mimics PCOS menstrual irregularity." }
    ],
    overview: [
      "Polycystic Ovary Syndrome (PCOS) is a complex neuro-endocrine and metabolic disorder affecting an estimated 1 in 5 women of reproductive age in Bengaluru.",
      "Accurate laboratory diagnosis per the Rotterdam criteria requires biochemical confirmation of hyperandrogenism and exclusion of mimicking disorders such as thyroid dysfunction, hyperprolactinemia, or non-classical congenital adrenal hyperplasia."
    ],
    guidelines: [
      "Basal reproductive hormone testing (LH, FSH, Estradiol) is ideally performed on Day 2 to Day 4 of spontaneous or progesterone-induced menstrual bleeding.",
      "Fasting Insulin and Glucose require an 8 to 10 hour overnight fast (water permitted).",
      "AMH, DHEA-S, and Total Testosterone can be collected on any cycle day and do not strictly require fasting."
    ],
    faqs: [
      { question: "Can a blood test diagnose PCOS without an ultrasound scan?", answer: "Under the international Rotterdam criteria, PCOS diagnosis requires at least two of three features: ovulatory dysfunction (irregular cycles), clinical or biochemical hyperandrogenism (elevated testosterone/DHEAS), and polycystic ovarian morphology on ultrasound. Blood testing is essential to confirm biochemical androgen excess and exclude thyroid or prolactin causes." },
      { question: "Why is Fasting Insulin tested in PCOS?", answer: "Between 70% and 80% of women with PCOS have underlying cellular insulin resistance, regardless of body weight. High circulating insulin stimulates the ovarian theca cells to overproduce testosterone and suppresses hepatic SHBG production." }
    ]
  },
  "cardiac-risk-heart-health": {
    slug: "cardiac-risk-heart-health",
    title: "Cardiac Risk & Heart Disease Biomarker Screening Bangalore | QXL",
    h1Title: "Cardiac Biomarkers & Cardiovascular Risk Blood Tests in Bangalore",
    subtitle: "Advanced cardiovascular disease screening including Lipid Profile, hs-CRP, Apolipoprotein B (ApoB), Troponin-I, and Homocysteine.",
    category: "Cardiology & Vascular Health",
    symptoms: [
      "Chest heaviness, tightness, or dull ache during moderate physical exertion",
      "Unexplained shortness of breath when climbing stairs or walking briskly",
      "Family history of premature coronary artery disease or heart attack (first-degree relative under age 55 in men, under 65 in women)",
      "Elevated blood pressure (hypertension > 130/80 mmHg) or high resting heart rate",
      "Sedentary desk lifestyle, high occupational stress, or smoking history"
    ],
    recommendedTests: [
      { name: "Lipid Profile Complete", slug: "lipid-profile-test", price: "550", description: "Direct measurement of Total Cholesterol, HDL, LDL, VLDL, and Triglycerides with atherogenic ratios." },
      { name: "High Sensitivity C-Reactive Protein (hs-CRP)", slug: "tests/hscrp-test-bangalore", price: "650", description: "Gold-standard inflammatory marker evaluating arterial plaque vulnerability and baseline vascular inflammation." },
      { name: "Apolipoprotein B (ApoB)", slug: "tests/apob-test-bangalore", price: "500", description: "Quantifies the exact total number of atherogenic particles (LDL + VLDL + IDL); superior to LDL-C alone." },
      { name: "High Sensitivity Troponin-I", slug: "tests/troponin-test-bangalore", price: "1400", description: "Ultra-sensitive myocardial injury biomarker for clinical cardiac muscle evaluation." }
    ],
    overview: [
      "Cardiovascular disease remains the leading cause of premature mortality among urban working populations in Bengaluru, often developing asymptomatically over decades.",
      "Traditional cholesterol numbers alone miss significant cardiovascular risk. Modern cardiology guidelines (ACC/AHA and European Society of Cardiology) emphasize particle counting via Apolipoprotein B and systemic inflammatory assessment via hs-CRP."
    ],
    guidelines: [
      "Lipid Profile testing requires a mandatory 10 to 12 hour overnight fast (water is permitted). Avoid alcohol and rich fatty meals for 24 hours prior.",
      "hs-CRP and ApoB do not require strict fasting, but are best drawn simultaneously with the morning fasting lipid draw."
    ],
    faqs: [
      { question: "Why is ApoB considered a better cardiac marker than standard LDL cholesterol?", answer: "Each atherogenic particle (whether LDL, VLDL, or IDL) carries exactly one molecule of Apolipoprotein B. ApoB directly counts the number of plaque-causing particles entering arterial walls, identifying hidden heart disease risk in patients whose standard LDL-C appears normal." },
      { question: "What does an elevated hs-CRP level mean for heart disease?", answer: "High-sensitivity CRP measures subtle vascular inflammation. An hs-CRP below 1.0 mg/L indicates low cardiovascular risk, 1.0 to 3.0 mg/L indicates average risk, and above 3.0 mg/L indicates elevated risk of future arterial plaque instability." }
    ]
  },
  "fatty-liver-lft-screening": {
    slug: "fatty-liver-lft-screening",
    title: "Fatty Liver Disease & Liver Function Blood Tests Bangalore | QXL",
    h1Title: "Fatty Liver & Hepatic Function Diagnostics in Bangalore",
    subtitle: "NABL-accredited diagnostic panel for Non-Alcoholic Fatty Liver Disease (NAFLD/MASLD), elevated SGOT/SGPT enzymes, GGT, and viral hepatitis screening.",
    category: "Gastroenterology & Hepatology",
    symptoms: [
      "Dull ache or fullness in the right upper quadrant of the abdomen",
      "Persistent daytime fatigue, sluggishness, and sluggish digestion",
      "Mild jaundice (yellowing of eyes/skin) or dark tea-colored urine",
      "Elevated liver enzymes (SGOT/AST or SGPT/ALT) detected on routine annual tests",
      "Metabolic risk factors: abdominal obesity, elevated triglycerides, or prediabetes"
    ],
    recommendedTests: [
      { name: "Liver Function Test (LFT Complete)", slug: "liver-function-test", price: "650", description: "Includes Total & Direct Bilirubin, SGOT/AST, SGPT/ALT, Alkaline Phosphatase, Total Protein, Albumin, and A/G ratio." },
      { name: "Lipid Profile Complete", slug: "lipid-profile-test", price: "550", description: "Evaluates hypertriglyceridemia, which is directly linked to hepatic steatosis (fat accumulation)." },
      { name: "Fasting Blood Sugar & HbA1c", slug: "tests/hba1c-test-bangalore", price: "350", description: "Screens for insulin resistance and type 2 diabetes, the primary metabolic drivers of fatty liver." },
      { name: "Hepatitis B & C Serology", slug: "sexual-health/hepatitis-b-triple-panel", price: "1250", description: "Rules out chronic viral hepatitis B or C as an underlying cause of transaminitis." }
    ],
    overview: [
      "Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD / NAFLD), colloquially termed 'fatty liver', affects over 30% of urban adults in Bengaluru.",
      "Because liver tissue lacks sensory pain fibers, fat accumulation causes zero early symptoms until progressive steatohepatitis (MASH) or fibrosis develops. Routine blood testing monitors hepatic enzyme leakage and synthetic capacity."
    ],
    guidelines: [
      "Fasting for 8 to 10 hours overnight is recommended for liver function and glucose screening.",
      "Avoid strenuous exercise and alcoholic beverages for 48 hours prior to sampling, as both temporarily elevate transaminases (AST/ALT)."
    ],
    faqs: [
      { question: "Can a blood test distinguish between Grade 1, Grade 2, and Grade 3 Fatty Liver?", answer: "Ultrasound imaging grades physical fat echogenicity (Grade 1 to 3), whereas blood tests (LFT, AST, ALT, GGT, Platelets) assess whether that fat is actively inflaming or damaging liver cells (steatohepatitis) or impacting metabolic liver function." },
      { question: "Is Fatty Liver reversible?", answer: "Yes. Early-stage steatosis is completely reversible with dietary changes, regular aerobic exercise, and glycemic control. Follow-up LFT testing every 3 to 6 months monitors whether elevated liver enzymes are normalizing." }
    ]
  },
  "kidney-renal-health-screening": {
    slug: "kidney-renal-health-screening",
    title: "Kidney Function & Renal Health Blood Tests Bangalore | QXL",
    h1Title: "Kidney Function & Renal Disease Diagnostic Testing in Bangalore",
    subtitle: "Comprehensive renal panel evaluating Serum Creatinine, eGFR, Blood Urea Nitrogen (BUN), Serum Electrolytes, and Urine Routine & Microscopy.",
    category: "Nephrology & Renal Health",
    symptoms: [
      "Swelling (edema) in feet, ankles, lower legs, or puffiness around eyes upon waking",
      "Persistent foamy, bubbly, or cola-colored urine",
      "Significant increase or decrease in urination frequency, especially waking at night (nocturia)",
      "Uncontrolled hypertension, persistent metallic taste, or unexplained nausea",
      "Long-term medical history of diabetes mellitus, high blood pressure, or regular NSAID painkiller use"
    ],
    recommendedTests: [
      { name: "Kidney Function Test (KFT with Electrolytes)", slug: "kidney-function-test", price: "650", description: "Measures Blood Urea, Serum Creatinine, BUN, Uric Acid, Sodium, Potassium, and Chloride." },
      { name: "Serum Creatinine with eGFR Calculation", slug: "tests/creatinine-test-bangalore", price: "180", description: "Standard clinical marker of glomerular filtration rate and staging of chronic kidney disease." },
      { name: "Serum Uric Acid", slug: "tests/uric-acid-test-bangalore", price: "180", description: "Screens for hyperuricemia, gout, and uric acid nephrolithiasis (kidney stones)." },
      { name: "Urine Routine & Microscopy", slug: "tests/urine-test-bangalore", price: "150", description: "Evaluates proteinuria, microhematuria, urinary casts, pus cells, and specific gravity." }
    ],
    overview: [
      "Chronic Kidney Disease (CKD) progresses silently without early symptoms. Up to 90% of renal nephron function can be lost before noticeable symptoms appear.",
      "Hypertension and diabetes are responsible for over 70% of end-stage renal disease cases in India. Early screening with Serum Creatinine, eGFR, and Urine Routine allows timely nephroprotective medical interventions."
    ],
    guidelines: [
      "Maintain normal water hydration prior to testing. Severe dehydration artificially elevates blood urea and serum creatinine.",
      "Avoid consuming excessive red meat or protein supplements for 24 hours prior to creatinine testing.",
      "Morning first-void midstream urine is optimal for urinary protein and sediment analysis."
    ],
    faqs: [
      { question: "What is eGFR and why is it reported alongside Creatinine?", answer: "eGFR (estimated Glomerular Filtration Rate) calculates how many milliliters of blood your kidneys filter per minute, based on your serum creatinine level, age, and sex. A normal eGFR is 90 mL/min/1.73m² or higher. An eGFR consistently below 60 indicates reduced kidney function." },
      { question: "How often should diabetic and hypertensive patients test their kidney function?", answer: "Clinical guidelines recommend that all individuals with diabetes or hypertension undergo kidney function testing (Serum Creatinine, eGFR, and Urine Routine/Albumin) at least once every 12 months, or every 6 months if borderline values were previously observed." }
    ]
  },
  "vitamin-deficiency-fatigue": {
    slug: "vitamin-deficiency-fatigue",
    title: "Vitamin D3, B12 & Fatigue Deficiency Screening Bangalore | QXL",
    h1Title: "Vitamin D, B12 & Micronutrient Deficiency Tests in Bangalore",
    subtitle: "Essential biochemical screening for chronic exhaustion, brain fog, bone aches, peripheral neuropathy, and immune resilience.",
    category: "Nutritional & Preventive Health",
    symptoms: [
      "Constant daytime tiredness, lethargy, and lack of energy despite 7–8 hours of sleep",
      "Pins-and-needles tingling sensations or numbness in hands, fingers, or feet (neuropathy)",
      "Persistent lower back pain, deep bone ache, and generalized muscle weakness",
      "Morning brain fog, poor working memory, difficulty concentrating, and mood lability",
      "Strict vegetarian or vegan diet, indoor office desk work with zero direct sun exposure"
    ],
    recommendedTests: [
      { name: "Vitamin D3 (25-Hydroxycholecalciferol ECLIA)", slug: "vitamin-d-test", price: "999", description: "Measures circulating storage 25-OH Vitamin D; crucial for calcium absorption, bone mineralization, and immunity." },
      { name: "Vitamin B12 (Cyanocobalamin ECLIA)", slug: "vitamin-b12-test", price: "799", description: "Essential for healthy myelin nerve sheath maintenance, red blood cell synthesis, and brain neurochemistry." },
      { name: "Complete Blood Count (CBC) with Smear", slug: "cbc-test", price: "250", description: "Screens for macrocytic megaloblastic anemia characteristic of B12 or folate deficiency." },
      { name: "Iron Profile Complete", slug: "tests/iron-profile-test-bangalore", price: "380", description: "Evaluates serum iron and ferritin stores to rule out concurrent iron-deficiency fatigue." }
    ],
    overview: [
      "Over 80% of urban Bengaluru residents suffer from subclinical or severe Vitamin D3 deficiency (<20 ng/mL) due to indoor lifestyles, atmospheric pollution, and lack of midday sun exposure.",
      "Furthermore, Vitamin B12 deficiency is widespread among vegetarian populations as B12 is exclusively obtained through animal-derived foods or supplementation. Early detection prevents irreversible peripheral nerve damage and chronic depressive fatigue."
    ],
    guidelines: [
      "No strict fasting required for Vitamin D3 and B12 testing.",
      "If taking high-dose biotin (Vitamin B7) or multivitamin supplements, pause supplementation for 48 hours prior to testing as high circulating biotin can interfere with immunoassay analytical signals."
    ],
    faqs: [
      { question: "What are normal versus deficient levels of Vitamin D3?", answer: "Per clinical endocrine guidelines: below 20 ng/mL is considered Deficient; 20 to 30 ng/mL is Insufficient; and 30 to 100 ng/mL is Optimal. Values above 100 ng/mL indicate excessive intake." },
      { question: "Why do vegetarians need regular Vitamin B12 testing?", answer: "Plants do not produce Vitamin B12. Vegetarians and vegans who do not take fortified foods or regular oral supplements deplete their hepatic B12 storage reserves over 2 to 5 years, resulting in nerve tingling, brain fog, and megaloblastic anemia." }
    ]
  },
  "senior-citizen-health-screening": {
    slug: "senior-citizen-health-screening",
    title: "Senior Citizen Full Body Health Checkup Bangalore | QXL",
    h1Title: "Senior Citizen Diagnostic Health Assessment in Bangalore",
    subtitle: "Specialized geriatric screening panel covering cardiac markers, diabetes control, kidney & liver function, bone density minerals, and complete blood count.",
    category: "Geriatric & Preventive Health",
    symptoms: [
      "Adults aged 60 and above requiring comprehensive annual preventive health monitoring",
      "Progressive joint stiffness, osteoarthritis pain, and reduced physical mobility",
      "Changes in memory, daytime sleepiness, or progressive loss of muscle strength (sarcopenia)",
      "Polypharmacy monitoring: evaluating kidney and liver function in patients taking chronic medications",
      "Post-menopausal bone health monitoring and screening for osteoporosis risk"
    ],
    recommendedTests: [
      { name: "Q-Master Pro Full Body Package (92 Parameters)", slug: "packages", price: "2499", description: "Our most comprehensive health checkup: covers Vitamin D3, B12, Thyroid T3/T4/TSH, HbA1c, CBC, LFT, KFT, Lipid Profile, hs-CRP, and Urine Analysis." },
      { name: "Kidney Function Test (KFT with Electrolytes)", slug: "kidney-function-test", price: "650", description: "Essential monitor for age-related decline in glomerular filtration rate (eGFR) and drug clearance." },
      { name: "HbA1c Glycated Hemoglobin", slug: "tests/hba1c-test-bangalore", price: "350", description: "Accurate quarterly monitor of glycemic control without risk of hypoglycemic fasting episodes." },
      { name: "Lipid Profile Complete", slug: "lipid-profile-test", price: "550", description: "Evaluates cardiovascular atherogenic risk and monitors statin therapy efficacy." }
    ],
    overview: [
      "Geriatric health management requires specialized multi-organ screening to detect chronic asymptomatic conditions early—including chronic kidney disease, silent ischemic heart disease, osteomalacia, and type 2 diabetes.",
      "QXL Diagnostics provides gentle, comfortable doorstep blood collection for elderly citizens across Bengaluru, eliminating stressful clinic travel and long waiting room queues."
    ],
    guidelines: [
      "Fasting for 10 to 12 hours overnight is recommended for the lipid and glucose components.",
      "Senior citizens may take their regular morning cardiac or blood pressure medications with a small sip of water, unless instructed otherwise by their physician.",
      "Gentle phlebotomy using fine butterfly needles is performed by trained specialists experienced in fragile geriatric veins."
    ],
    faqs: [
      { question: "How can elderly parents get blood tests done at home in Bangalore?", answer: "QXL Diagnostics offers priority doorstep blood collection across all 60+ Bengaluru localities. Our trained phlebotomy specialists arrive at your home with sterile single-use vacuum tubes, collect samples gently in the comfort of your living room, and digital reports are delivered within 6 to 12 hours via WhatsApp and our secure portal." },
      { question: "Which health package is most suitable for seniors over 60?", answer: "The Q-Master Pro Full Body Health Package (92 parameters) is our recommended profile for seniors, as it includes vital bone and nerve markers (Vitamin D3, Vitamin B12, Calcium) alongside complete heart, diabetes, kidney, and liver panels." }
    ]
  }
};

/**
 * Recommended-test prices always come from MASTER_CATALOGUE so condition pages,
 * test pages, booking and llms.txt cannot drift apart. A price is only replaced when
 * the card's name matches the catalogue item behind its link; otherwise it is kept.
 */
export const CONDITIONS_DATA: Record<string, ConditionItem> = Object.fromEntries(
  Object.entries(RAW_CONDITIONS_DATA).map(([key, condition]) => [
    key,
    {
      ...condition,
      recommendedTests: condition.recommendedTests.map((test) => {
        const master = findMasterBySlug(test.slug);
        return master && nameMatchesMaster(test.name, master) ? { ...test, price: String(master.price) } : test;
      }),
    },
  ])
);
