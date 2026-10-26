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

export const CONDITIONS_DATA: Record<string, ConditionItem> = {
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
      { name: "Free T3 & Free T4", slug: "thyroid-test", price: "700", description: "Direct measure of active unbound circulating thyroid hormones." },
      { name: "Anti-TPO Autoantibody Test", slug: "thyroid-test", price: "750", description: "Detects autoimmune Hashimoto's thyroiditis." }
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
  }
};
