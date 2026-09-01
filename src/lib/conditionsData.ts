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
  }
};
