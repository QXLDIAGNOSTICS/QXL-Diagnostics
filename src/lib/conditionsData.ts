export const healthConditions = [
  {
    id: "diabetes",
    name: "Diabetes",
    slug: "diabetes",
    description: "Comprehensive diagnostic testing for Type 1, Type 2, and Gestational Diabetes. Early detection and regular monitoring are key to managing diabetes effectively.",
    relatedTests: ["hba1c-test", "fasting-blood-sugar-fbs", "post-prandial-blood-sugar-ppbs", "kidney-function-test-kft", "lipid-profile"],
    relatedPackages: ["Quick Fit Package", "Q-Master Health Pro"]
  },
  {
    id: "thyroid-disorders",
    name: "Thyroid Disorders",
    slug: "thyroid-disorders",
    description: "Expert testing for Hypothyroidism, Hyperthyroidism, and Autoimmune Thyroid conditions (Hashimoto's & Graves' disease).",
    relatedTests: ["thyroid-profile", "vitamin-d-test", "vitamin-b12-test", "iron-profile"],
    relatedPackages: ["Quick Fit Package", "Q-Master Health Pro"]
  },
  {
    id: "heart-disease",
    name: "Heart Disease & Hypertension",
    slug: "heart-disease",
    description: "Advanced cardiac risk profiling to assess the risk of coronary artery disease, heart failure, and stroke.",
    relatedTests: ["lipid-profile", "crp-test", "fasting-blood-sugar-fbs"],
    relatedPackages: ["Advanced Cardiac Risk Panel ₹4,200", "Q-Master Health Pro"]
  },
  {
    id: "anemia",
    name: "Anemia & Blood Disorders",
    slug: "anemia",
    description: "Accurate diagnostics for iron deficiency anemia, vitamin B12 deficiency, and complex hematological conditions.",
    relatedTests: ["cbc-complete-blood-count", "iron-profile", "vitamin-b12-test"],
    relatedPackages: ["Anemia Profile ₹1,200", "Q-Master Health Pro"]
  }
];
