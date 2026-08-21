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
    title: "CBC Test in Bangalore | Complete Blood Count | QXL Diagnostics",
    h1Title: "CBC – Complete Blood Count Test in Bangalore",
    subtitle: "Measures red blood cells, white blood cells, haemoglobin, hematocrit, and platelets to evaluate overall health, anaemia, infection, and immunity.",
    price: "395",
    oldPrice: "527",
    discountPercent: "25% OFF",
    parametersCount: "24 Parameters",
    sampleType: "EDTA Whole Blood",
    fastingRequired: "No fasting required for CBC test.",
    turnaroundTime: "Same Day (6 Hours)",
    overview: [
      "A Complete Blood Count, commonly called CBC, is one of the most frequently requested blood investigations. It measures and characterises the major cellular components of blood: red blood cells, white blood cells and platelets.",
      "CBC testing provides useful information when investigating anaemia, infections, inflammatory conditions, abnormal bleeding, fatigue, fever and general health status."
    ],
    whyImportant: [
      "Evaluates haemoglobin levels to screen for anaemia.",
      "Identifies white blood cell variations indicating infection or inflammation.",
      "Monitors platelet counts essential for normal blood clotting."
    ],
    faqs: [
      { question: "What is a CBC test?", answer: "A CBC measures haemoglobin, RBCs, WBCs, and platelets in EDTA whole blood." },
      { question: "Does CBC detect anaemia?", answer: "Yes, haemoglobin and red blood cell indices (MCV, MCH, MCHC) help evaluate anaemia." },
      { question: "Does CBC require fasting?", answer: "No, fasting is not required for a CBC test." }
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
