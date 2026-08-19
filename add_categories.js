const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./src/lib/testGuideData.json', 'utf8'));

const categories = {
  "Blood Health": [
    "Anemia Evaluation Profile",
    "Comprehensive Iron Studies",
    "Basic Iron Deficiency Profile"
  ],
  "Joint & Heart Health": [
    "Inflammatory Arthritis Evaluation",
    "Cardiac Risk & Acute Injury Pathways",
    "Cardiolipin Antibody Profile"
  ],
  "Pregnancy Care": [
    "Initial Antenatal Laboratory Profile",
    "Recurrent Pregnancy Loss / APS Evaluation"
  ],
  "Hormonal & PCOS": [
    "Androgen Evaluation Profile",
    "PCOS Diagnostic and Metabolic Profile",
    "PCOS Evaluation - Not Population Screening"
  ],
  "Autoimmune & Protein Disorders": [
    "Autoimmune Liver Disease Evaluation",
    "Monoclonal Gammopathy / Myeloma Evaluation"
  ],
  "Tuberculosis & Adrenal Health": [
    "Adrenal Insufficiency Evaluation",
    "Tuberculosis Evaluation - Active vs Latent"
  ],
  "Blood & Metabolism": [
    "Basic Metabolic Panel - Standardized"
  ],
  "Specialist Testing": [
    "Breast Screening Guidance & Biomarker Monitoring",
    "Urine Drug Screen - 10 Classes with Confirmation"
  ],
  "Diabetes & Bone Health": [
    "Basic Bone and Mineral Profile",
    "Comprehensive Diabetes Monitoring Profile",
    "Diabetes Glycemic Profile - Basic"
  ],
  "Bleeding & Coagulation": [
    "Basic Coagulation Profile",
    "Extended Bleeding and Coagulation Evaluation"
  ],
  "Pregnancy Risk Screening": [
    "First-Trimester Combined Aneuploidy Screen",
    "Second-Trimester Triple Marker Screen",
    "Second-Trimester Quadruple Marker Screen"
  ],
  "Electrolytes & Kidneys": [
    "Electrolytes Plus",
    "Kidney Function Test - Basic",
    "Kidney Function and Mineral Profile"
  ],
  "Infection Screening": [
    "STI Screening Panel - Risk Based",
    "Acute Fever Initial Evaluation - Context Based"
  ],
  "PCOS & Fertility": [
    "Female Fertility Evaluation - Clinician Directed",
    "Menopause Assessment - Clinician Directed",
    "Complex Menopause and Amenorrhea Evaluation"
  ],
  "Pregnancy & Immunity": [
    "MMR Immunity Profile"
  ],
  "Bone & Musculoskeletal Health": [
    "Musculoskeletal Inflammation Screen",
    "Osteoporosis and Secondary-Cause Laboratory Panel"
  ],
  "Men's Health": [
    "Prostate Assessment - PSA Based",
    "Prostate Cancer Risk Assessment - PSA Reflex"
  ],
  "Antiphospholipid Antibodies": [
    "Complete Antiphospholipid Syndrome Panel"
  ],
  "Respiratory & Microbiology": [
    "Specimen-Specific Culture and Susceptibility Menu",
    "Pneumonia Severity and Etiology Evaluation"
  ]
};

// Flatten to map title -> category
const titleToCategory = {};
for (const [cat, titles] of Object.entries(categories)) {
  for (const t of titles) {
    titleToCategory[t.toLowerCase().trim()] = cat;
  }
}

// Ensure all get a category
data.forEach(item => {
  const match = titleToCategory[item.title.toLowerCase().trim()];
  if (match) {
    item.category = match;
  } else {
    // try replacing en-dash with hyphen or removing "–"
    const cleaned = item.title.replace(/–/g, '-').toLowerCase().trim();
    if (titleToCategory[cleaned]) {
        item.category = titleToCategory[cleaned];
    } else {
        item.category = "Other"; // fallback
        console.log("Missing category for:", item.title);
    }
  }
});

fs.writeFileSync('./src/lib/testGuideData.json', JSON.stringify(data, null, 2));
console.log("Categories updated!");
