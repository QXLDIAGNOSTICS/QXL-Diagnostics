// Auto-generated diagnostic tests data
// This file contains 100+ diagnostic tests with complete metadata

export interface FAQ {
  question: string;
  answer: string;
}

export interface TestData {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  subcategory: string;
  description: string;
  purpose: string;
  whyDone: string[];
  whoNeedsIt: string[];
  symptoms: string[];
  conditionsDetected: string[];
  preparation: string[];
  procedure: string;
  sampleType: string;
  turnaroundTime: string;
  normalRange: string;
  highResults: string;
  lowResults: string;
  interpretation: string;
  relatedTests: string[];
  relatedDiseases: string[];
  relatedPackages: string[];
  faqs: FAQ[];
  references: string[];
  price: number;
  homeCollection: boolean;
  tags: string[];
}

export const testsData: TestData[] = [

{
  "slug": "cbc",
  "name": "Complete Blood Count (CBC)",
  "shortName": "CBC",
  "category": "Hematology",
  "subcategory": "Blood Counts",
  "description": "A Complete Blood Count (CBC) is a comprehensive blood test that evaluates overall health and detects disorders including anemia, infection, and leukemia. It measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
  "purpose": "To evaluate overall health and detect a wide range of disorders including anemia, infection, and leukemia.",
  "whyDone": [
    "To screen for general health during a routine check-up",
    "To help diagnose the cause of signs and symptoms such as fatigue, weakness, fever, bruising, or bleeding",
    "To monitor an existing blood condition or the side effects of treatment",
    "To diagnose blood disorders such as anemia, infection, and leukemia"
  ],
  "whoNeedsIt": [
    "Individuals undergoing routine health check-ups",
    "Patients with symptoms of anemia such as fatigue and pallor",
    "Patients with signs of infection or immune disorders",
    "Patients on medications that may affect blood counts",
    "Individuals with a family history of blood disorders"
  ],
  "symptoms": [
    "Fatigue and weakness",
    "Unexplained bruising",
    "Frequent infections",
    "Unusual bleeding",
    "Pale skin",
    "Shortness of breath"
  ],
  "conditionsDetected": [
    "Anemia",
    "Infection",
    "Leukemia",
    "Lymphoma",
    "Thrombocytopenia",
    "Polycythemia",
    "Sickle cell disease",
    "Iron deficiency"
  ],
  "preparation": [
    "No fasting is typically required",
    "Inform your doctor about any medications you are taking",
    "Avoid vigorous exercise before the test"
  ],
  "procedure": "A phlebotomist draws a small sample of blood from a vein in your arm using a needle. The blood is collected in an EDTA tube and sent to the laboratory for analysis.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "WBC: 4,000-11,000/uL, RBC: 4.5-5.5 million/uL (M), 4.0-5.0 million/uL (F), Hemoglobin: 13.5-17.5 g/dL (M), 12.0-15.5 g/dL (F), Hematocrit: 38.3-48.6% (M), 35.5-44.9% (F), Platelets: 150,000-450,000/uL",
  "highResults": "Elevated WBC may indicate infection, inflammation, leukemia, or tissue damage. Elevated RBC may indicate polycythemia, dehydration, or lung disease. High platelets may indicate inflammation, infection, or bone marrow disorders.",
  "lowResults": "Low WBC may indicate bone marrow problems, autoimmune disorders, or viral infections. Low RBC or hemoglobin may indicate anemia, bleeding, or nutritional deficiencies. Low platelets may indicate clotting disorders or bone marrow failure.",
  "interpretation": "CBC results should be interpreted in conjunction with clinical findings. Abnormal values may indicate a range of conditions from benign to serious.",
  "relatedTests": [
    "esr",
    "peripheral-smear",
    "reticulocyte-count",
    "hemoglobin",
    "hematocrit"
  ],
  "relatedDiseases": [
    "Anemia",
    "Leukemia",
    "Infection",
    "Thrombocytopenia",
    "Polycythemia"
  ],
  "relatedPackages": [
    "complete-health-checkup",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "Is fasting required for CBC?",
      "answer": "No, fasting is not required for a Complete Blood Count."
    },
    {
      "question": "How long does the CBC test take?",
      "answer": "The blood draw takes about 5 minutes. Results are typically available within 4-6 hours."
    },
    {
      "question": "What can cause abnormal CBC results?",
      "answer": "Infections, anemia, leukemia, nutritional deficiencies, autoimmune disorders, and certain medications."
    },
    {
      "question": "How often should I get a CBC done?",
      "answer": "Once a year during routine check-ups for healthy individuals. More frequently if you have a chronic condition."
    },
    {
      "question": "Can CBC detect cancer?",
      "answer": "It can sometimes detect blood cancers like leukemia and lymphoma, but cannot detect solid tumors."
    }
  ],
  "references": [
    "NCBI - Complete Blood Count: https://www.ncbi.nlm.nih.gov/books/NBK279/",
    "Mayo Clinic - CBC: https://www.mayoclinic.org/tests-procedures/complete-blood-count/about/pac-20384919"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "blood test",
    "CBC",
    "blood count",
    "anemia",
    "infection"
  ]
},
{
  "slug": "esr",
  "name": "Erythrocyte Sedimentation Rate (ESR)",
  "shortName": "ESR",
  "category": "Hematology",
  "subcategory": "Blood Counts",
  "description": "ESR measures the rate at which red blood cells settle in a tube of anticoagulated blood over one hour. It is a non-specific marker of inflammation.",
  "purpose": "To detect and monitor inflammation caused by infections, autoimmune diseases, or malignancies.",
  "whyDone": [
    "To help diagnose inflammatory conditions",
    "To monitor disease activity in rheumatoid arthritis or lupus",
    "To evaluate treatment effectiveness for inflammatory diseases",
    "To screen for hidden inflammation"
  ],
  "whoNeedsIt": [
    "Patients with suspected autoimmune disorders",
    "Individuals with unexplained fever or weight loss",
    "Patients with chronic inflammatory diseases",
    "Patients with suspected temporal arteritis"
  ],
  "symptoms": [
    "Joint pain and swelling",
    "Unexplained fever",
    "Weight loss",
    "Fatigue",
    "Night sweats"
  ],
  "conditionsDetected": [
    "Rheumatoid arthritis",
    "Systemic lupus erythematosus",
    "Infections",
    "Temporal arteritis",
    "Polymyalgia rheumatica",
    "Multiple myeloma"
  ],
  "preparation": [
    "No fasting required",
    "Inform your doctor if pregnant or taking oral contraceptives"
  ],
  "procedure": "A blood sample is drawn and placed in a tall thin tube. The rate of red blood cell settling is measured in mm/hr.",
  "sampleType": "Whole Blood (ESR tube with Sodium Citrate)",
  "turnaroundTime": "1-2 hours",
  "normalRange": "Males: 0-15 mm/hr, Females: 0-20 mm/hr (varies with age)",
  "highResults": "Elevated ESR indicates inflammation, infection, autoimmune disease, or malignancy. Very high (>100) is associated with multiple myeloma or temporal arteritis.",
  "lowResults": "Low ESR is generally not clinically significant but may be seen in polycythemia or sickle cell anemia.",
  "interpretation": "ESR is non-specific and must be interpreted alongside clinical findings. Useful for monitoring disease activity.",
  "relatedTests": [
    "crp",
    "hs-crp",
    "cbc",
    "peripheral-smear",
    "ana"
  ],
  "relatedDiseases": [
    "Rheumatoid arthritis",
    "Lupus",
    "Infection",
    "Temporal arteritis",
    "Multiple myeloma"
  ],
  "relatedPackages": [
    "inflammatory-panel",
    "autoimmune-screening"
  ],
  "faqs": [
    {
      "question": "What is a normal ESR value?",
      "answer": "Males: 0-15 mm/hr, Females: 0-20 mm/hr. ESR naturally increases with age."
    },
    {
      "question": "Can ESR detect cancer?",
      "answer": "It may be elevated in certain cancers like multiple myeloma, but is not a specific cancer marker."
    },
    {
      "question": "Difference between ESR and CRP?",
      "answer": "ESR is slower and non-specific. CRP rises and falls more quickly and is more sensitive for acute inflammation."
    },
    {
      "question": "Does exercise affect ESR?",
      "answer": "Strenuous exercise can temporarily increase ESR. Avoid vigorous exercise 24 hours before."
    },
    {
      "question": "How often should ESR be repeated?",
      "answer": "Depends on the condition being monitored, often every few weeks to months."
    }
  ],
  "references": [
    "MedlinePlus - ESR: https://medlineplus.gov/ency/article/003483.htm"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "ESR",
    "inflammation",
    "sedimentation rate",
    "autoimmune"
  ]
},
{
  "slug": "peripheral-smear",
  "name": "Peripheral Smear Examination",
  "shortName": "PS",
  "category": "Hematology",
  "subcategory": "Blood Counts",
  "description": "A peripheral smear is a microscopic examination of blood to evaluate morphology and count of red blood cells, white blood cells, and platelets.",
  "purpose": "To examine blood cell morphology and identify abnormalities not detected by automated counters.",
  "whyDone": [
    "To confirm abnormal CBC results",
    "To evaluate unexplained anemia or jaundice",
    "To diagnose sickle cell anemia and malaria",
    "To detect abnormal cells suggestive of malignancy"
  ],
  "whoNeedsIt": [
    "Patients with abnormal CBC results",
    "Patients with unexplained anemia or jaundice",
    "Patients with suspected malaria",
    "Patients with suspected leukemia"
  ],
  "symptoms": [
    "Persistent fatigue",
    "Pallor or jaundice",
    "Enlarged lymph nodes",
    "Unexplained weight loss",
    "Recurrent infections"
  ],
  "conditionsDetected": [
    "Iron deficiency anemia",
    "Megaloblastic anemia",
    "Sickle cell anemia",
    "Thalassemia",
    "Malaria",
    "Leukemia",
    "Lymphoma"
  ],
  "preparation": [
    "No special preparation required",
    "Usually ordered along with CBC"
  ],
  "procedure": "A drop of blood is spread on a glass slide, stained with special dyes, and examined under a microscope by a hematologist.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "6-24 hours",
  "normalRange": "Normal morphology for RBCs, WBCs, and platelets",
  "highResults": "May show abnormal cell morphology, increased white cells, blast cells, or parasites.",
  "lowResults": "May show microcytic/macrocytic red cells, hypochromia, target cells, sickle cells, or reduced platelets.",
  "interpretation": "Provides morphological context to CBC results. Essential for diagnosing anemias, detecting malaria, and identifying hematological malignancies.",
  "relatedTests": [
    "cbc",
    "reticulocyte-count",
    "hemoglobin",
    "iron-studies"
  ],
  "relatedDiseases": [
    "Anemia",
    "Leukemia",
    "Malaria",
    "Thalassemia",
    "Sickle cell disease"
  ],
  "relatedPackages": [
    "complete-health-checkup",
    "anemia-workup"
  ],
  "faqs": [
    {
      "question": "Is peripheral smear painful?",
      "answer": "No, it only requires a standard blood draw."
    },
    {
      "question": "When is it ordered?",
      "answer": "When CBC results are abnormal, malaria is suspected, or blood cell morphology needs evaluation."
    },
    {
      "question": "How is it different from CBC?",
      "answer": "CBC provides quantitative data while peripheral smear provides qualitative morphological information."
    },
    {
      "question": "Can it detect malaria?",
      "answer": "Yes, it is the gold standard for detecting and identifying malaria parasites."
    },
    {
      "question": "How long for results?",
      "answer": "Results typically take 6-24 hours."
    }
  ],
  "references": [
    "NCBI - Peripheral Blood Smear: https://www.ncbi.nlm.nih.gov/books/NBK459152/"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "peripheral smear",
    "blood smear",
    "malaria",
    "anemia"
  ]
},
{
  "slug": "reticulocyte-count",
  "name": "Reticulocyte Count",
  "shortName": "Retic Count",
  "category": "Hematology",
  "subcategory": "Blood Counts",
  "description": "A reticulocyte count measures immature red blood cells, reflecting bone marrow's ability to produce RBCs.",
  "purpose": "To assess bone marrow function and RBC production in anemia evaluation.",
  "whyDone": [
    "To determine the cause of anemia",
    "To evaluate bone marrow response to treatment",
    "To monitor bone marrow after chemotherapy",
    "To assess recovery from blood loss or hemolysis"
  ],
  "whoNeedsIt": [
    "Patients with newly diagnosed anemia",
    "Patients being treated for anemia",
    "Patients receiving chemotherapy",
    "Patients with suspected hemolytic anemia"
  ],
  "symptoms": [
    "Fatigue",
    "Shortness of breath",
    "Pallor",
    "Dizziness",
    "Rapid heartbeat"
  ],
  "conditionsDetected": [
    "Hemolytic anemia",
    "Blood loss anemia",
    "Bone marrow failure",
    "Response to anemia therapy",
    "Thalassemia"
  ],
  "preparation": [
    "No fasting required",
    "Inform doctor about medications affecting bone marrow"
  ],
  "procedure": "Blood drawn and analyzed using flow cytometry or manual counting with special staining to identify reticulocytes.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "6-12 hours",
  "normalRange": "0.5-1.5% of total RBCs (Absolute: 25,000-75,000/uL)",
  "highResults": "Elevated count indicates increased bone marrow activity, seen in hemolytic anemia or blood loss recovery.",
  "lowResults": "Low count indicates decreased bone marrow production, seen in aplastic anemia or nutritional deficiencies.",
  "interpretation": "Helps differentiate anemias from decreased production versus increased destruction or loss.",
  "relatedTests": [
    "cbc",
    "hemoglobin",
    "hematocrit",
    "peripheral-smear",
    "iron-studies"
  ],
  "relatedDiseases": [
    "Hemolytic anemia",
    "Aplastic anemia",
    "Iron deficiency anemia",
    "Bone marrow failure"
  ],
  "relatedPackages": [
    "anemia-workup"
  ],
  "faqs": [
    {
      "question": "What does high reticulocyte count mean?",
      "answer": "Your bone marrow is producing RBCs rapidly, often in response to blood loss or hemolysis."
    },
    {
      "question": "What does low count mean?",
      "answer": "Bone marrow is not producing enough RBCs, indicating aplastic anemia or nutritional deficiencies."
    },
    {
      "question": "Is fasting required?",
      "answer": "No, fasting is not required."
    },
    {
      "question": "How is this different from CBC?",
      "answer": "CBC counts all blood cells, while reticulocyte count specifically measures immature RBCs."
    },
    {
      "question": "How quickly does the count change?",
      "answer": "Reticulocytes mature in 1-2 days. The count can change relatively quickly."
    }
  ],
  "references": [
    "MedlinePlus - Reticulocyte Count: https://medlineplus.gov/ency/article/003646.htm"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "reticulocyte",
    "bone marrow",
    "anemia",
    "red blood cells"
  ]
},
{
  "slug": "platelet-count",
  "name": "Platelet Count",
  "shortName": "Platelets",
  "category": "Hematology",
  "subcategory": "Blood Counts",
  "description": "Measures the number of platelets in blood. Platelets are cell fragments crucial for blood clotting.",
  "purpose": "To evaluate blood's ability to clot and screen for clotting disorders.",
  "whyDone": [
    "To investigate unexplained bruising or bleeding",
    "To monitor platelet counts before surgery",
    "To evaluate clotting disorders",
    "To monitor effects of chemotherapy"
  ],
  "whoNeedsIt": [
    "Patients with unexplained bruising",
    "Patients scheduled for surgery",
    "Patients on blood thinners",
    "Patients undergoing chemotherapy",
    "Patients with suspected dengue"
  ],
  "symptoms": [
    "Easy bruising",
    "Petechiae",
    "Prolonged bleeding from cuts",
    "Blood in urine or stools",
    "Heavy menstrual periods"
  ],
  "conditionsDetected": [
    "Thrombocytopenia",
    "Thrombocytosis",
    "Dengue fever",
    "ITP",
    "Bone marrow disorders",
    "DIC"
  ],
  "preparation": [
    "No fasting required",
    "Inform doctor about medications affecting platelets"
  ],
  "procedure": "Blood drawn and analyzed using an automated cell counter to measure platelets per microliter.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "150,000-450,000 per microliter",
  "highResults": "Elevated platelets may indicate infection, inflammation, iron deficiency, or essential thrombocythemia.",
  "lowResults": "Low platelets may indicate dengue, ITP, aplastic anemia, or DIC. Severe (<20,000) carries spontaneous bleeding risk.",
  "interpretation": "Platelet count should be interpreted alongside clinical symptoms and coagulation tests.",
  "relatedTests": [
    "cbc",
    "peripheral-smear",
    "pt-inr",
    "aptt",
    "d-dimer"
  ],
  "relatedDiseases": [
    "Dengue",
    "ITP",
    "DIC",
    "Thrombocytopenia",
    "Essential thrombocythemia"
  ],
  "relatedPackages": [
    "dengue-panel",
    "coagulation-panel"
  ],
  "faqs": [
    {
      "question": "What is a dangerous platelet count?",
      "answer": "Below 20,000/uL carries risk of spontaneous bleeding. Above 1,000,000 may increase clotting risk."
    },
    {
      "question": "Can dengue cause low platelets?",
      "answer": "Yes, dengue commonly causes thrombocytopenia. Daily monitoring is recommended."
    },
    {
      "question": "How does aspirin affect platelets?",
      "answer": "Aspirin inhibits platelet function for the platelet's lifetime (7-10 days)."
    },
    {
      "question": "What foods help increase platelets?",
      "answer": "Foods rich in vitamin C, folate, B12, and iron. Fruits, leafy greens, and lean proteins."
    },
    {
      "question": "Can low platelets be serious?",
      "answer": "Yes, severe thrombocytopenia can lead to spontaneous internal bleeding including intracranial hemorrhage."
    }
  ],
  "references": [
    "NCBI - Platelet Count: https://www.ncbi.nlm.nih.gov/books/NBK391/"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "platelets",
    "clotting",
    "thrombocytopenia",
    "dengue"
  ]
},
{
  "slug": "hemoglobin",
  "name": "Hemoglobin Test",
  "shortName": "Hb",
  "category": "Hematology",
  "subcategory": "Blood Counts",
  "description": "Hemoglobin is the oxygen-carrying protein in red blood cells. This test measures its amount in the blood.",
  "purpose": "To assess oxygen-carrying capacity and screen for anemia.",
  "whyDone": [
    "To diagnose anemia",
    "To screen for hemoglobinopathies like sickle cell disease",
    "To monitor chronic conditions affecting blood",
    "To evaluate polycythemia"
  ],
  "whoNeedsIt": [
    "Individuals with symptoms of anemia or polycythemia",
    "Pregnant women",
    "Patients with chronic kidney or lung disease",
    "Athletes for screening"
  ],
  "symptoms": [
    "Fatigue and weakness",
    "Pale skin",
    "Shortness of breath",
    "Dizziness",
    "Cold hands and feet"
  ],
  "conditionsDetected": [
    "Iron deficiency anemia",
    "Megaloblastic anemia",
    "Sickle cell disease",
    "Thalassemia",
    "Polycythemia vera"
  ],
  "preparation": [
    "No fasting required",
    "Avoid strenuous exercise",
    "Stay well-hydrated"
  ],
  "procedure": "Blood drawn from a vein and analyzed using spectrophotometry or automated analyzers.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Males: 13.5-17.5 g/dL, Females: 12.0-15.5 g/dL",
  "highResults": "May indicate polycythemia vera, dehydration, lung disease, or high altitude residence.",
  "lowResults": "Indicates anemia from iron deficiency, blood loss, nutritional deficiencies, or chronic disease.",
  "interpretation": "Should be interpreted alongside hematocrit, RBC indices, and clinical context.",
  "relatedTests": [
    "cbc",
    "hematocrit",
    "mcv",
    "mch",
    "mchc",
    "iron-studies"
  ],
  "relatedDiseases": [
    "Anemia",
    "Polycythemia",
    "Sickle cell disease",
    "Thalassemia"
  ],
  "relatedPackages": [
    "complete-health-checkup",
    "anemia-panel"
  ],
  "faqs": [
    {
      "question": "What is normal hemoglobin?",
      "answer": "Males: 13.5-17.5 g/dL, Females: 12.0-15.5 g/dL."
    },
    {
      "question": "Can dehydration affect it?",
      "answer": "Yes, dehydration can falsely elevate hemoglobin due to reduced plasma volume."
    },
    {
      "question": "How to increase naturally?",
      "answer": "Iron-rich foods, vitamin C for absorption, folate, and vitamin B12."
    },
    {
      "question": "Is it the same as HbA1c?",
      "answer": "No. Hemoglobin measures oxygen-carrying protein; HbA1c measures glucose attachment to hemoglobin."
    },
    {
      "question": "What does low hemoglobin in pregnancy mean?",
      "answer": "It indicates anemia, common due to increased blood volume. Should be treated to prevent complications."
    }
  ],
  "references": [
    "MedlinePlus - Hemoglobin: https://medlineplus.gov/ency/article/003645.htm"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "hemoglobin",
    "Hb",
    "anemia",
    "oxygen"
  ]
},
{
  "slug": "hematocrit",
  "name": "Hematocrit Test",
  "shortName": "Hct",
  "category": "Hematology",
  "subcategory": "Blood Counts",
  "description": "Hematocrit measures the percentage of blood volume occupied by red blood cells.",
  "purpose": "To determine proportion of RBCs and diagnose anemia or polycythemia.",
  "whyDone": [
    "To diagnose anemia or polycythemia",
    "To monitor treatment",
    "As part of CBC",
    "To evaluate hydration status"
  ],
  "whoNeedsIt": [
    "Patients with anemia or polycythemia symptoms",
    "Patients being treated for blood disorders",
    "Pregnant women",
    "Athletes"
  ],
  "symptoms": [
    "Fatigue",
    "Weakness",
    "Shortness of breath",
    "Dizziness",
    "Pale or flushed skin"
  ],
  "conditionsDetected": [
    "Anemia",
    "Polycythemia vera",
    "Dehydration",
    "Bone marrow disorders"
  ],
  "preparation": [
    "No fasting required",
    "Avoid strenuous exercise"
  ],
  "procedure": "Blood drawn and centrifuged in a capillary tube. Percentage of packed red cells measured.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Males: 38.3-48.6%, Females: 35.5-44.9%",
  "highResults": "Indicates polycythemia, dehydration, or chronic hypoxia.",
  "lowResults": "Indicates anemia, overhydration, or bone marrow failure.",
  "interpretation": "Reported as part of CBC. Should be interpreted alongside hemoglobin and RBC count.",
  "relatedTests": [
    "cbc",
    "hemoglobin",
    "mcv",
    "mch"
  ],
  "relatedDiseases": [
    "Anemia",
    "Polycythemia",
    "Dehydration"
  ],
  "relatedPackages": [
    "complete-health-checkup"
  ],
  "faqs": [
    {
      "question": "What is normal hematocrit?",
      "answer": "Males: 38.3-48.6%, Females: 35.5-44.9%."
    },
    {
      "question": "Can dehydration affect it?",
      "answer": "Yes, dehydration concentrates the blood and can elevate hematocrit."
    },
    {
      "question": "How is it different from hemoglobin?",
      "answer": "Hematocrit is the percentage of red cells by volume; hemoglobin is the amount of protein in g/dL."
    },
    {
      "question": "What causes high hematocrit?",
      "answer": "Polycythemia, dehydration, lung disease, high altitude, and smoking."
    },
    {
      "question": "Does altitude affect it?",
      "answer": "Yes, high altitude stimulates more RBC production."
    }
  ],
  "references": [
    "MedlinePlus - Hematocrit: https://medlineplus.gov/ency/article/003649.htm"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "hematocrit",
    "Hct",
    "red blood cells",
    "anemia"
  ]
},
{
  "slug": "mch",
  "name": "Mean Corpuscular Hemoglobin (MCH)",
  "shortName": "MCH",
  "category": "Hematology",
  "subcategory": "RBC Indices",
  "description": "MCH measures the average amount of hemoglobin in each red blood cell, helping classify anemia types.",
  "purpose": "To evaluate hemoglobin content of RBCs and classify anemia.",
  "whyDone": [
    "To classify types of anemia",
    "As part of CBC evaluation",
    "To guide further diagnostic testing"
  ],
  "whoNeedsIt": [
    "Patients with diagnosed or suspected anemia",
    "Patients with abnormal CBC",
    "Patients with fatigue or pallor"
  ],
  "symptoms": [
    "Fatigue",
    "Pallor",
    "Shortness of breath",
    "Weakness"
  ],
  "conditionsDetected": [
    "Microcytic anemia",
    "Macrocytic anemia",
    "Iron deficiency anemia",
    "Vitamin B12 deficiency",
    "Folate deficiency"
  ],
  "preparation": [
    "No fasting required",
    "Part of routine CBC"
  ],
  "procedure": "Calculated from CBC by dividing hemoglobin by RBC count. No separate blood draw needed.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "27-33 picograms (pg)",
  "highResults": "Indicates macrocytic cells, typically from B12 or folate deficiency.",
  "lowResults": "Indicates hypochromic cells, typically from iron deficiency or thalassemia.",
  "interpretation": "Part of RBC indices. Should be interpreted alongside MCV and MCHC.",
  "relatedTests": [
    "cbc",
    "mcv",
    "mchc",
    "hemoglobin",
    "iron-studies"
  ],
  "relatedDiseases": [
    "Iron deficiency anemia",
    "Megaloblastic anemia",
    "Thalassemia"
  ],
  "relatedPackages": [
    "anemia-workup"
  ],
  "faqs": [
    {
      "question": "What does high MCH mean?",
      "answer": "RBCs contain more hemoglobin, usually indicating larger cells from B12 or folate deficiency."
    },
    {
      "question": "What does low MCH mean?",
      "answer": "RBCs contain less hemoglobin, suggesting iron deficiency or thalassemia."
    },
    {
      "question": "Is MCH the same as MCHC?",
      "answer": "No. MCH measures hemoglobin per cell (pg); MCHC measures concentration (g/dL)."
    },
    {
      "question": "Can MCH be normal in anemia?",
      "answer": "Yes, in anemia of chronic disease."
    },
    {
      "question": "Do I need a separate test?",
      "answer": "No, MCH is calculated as part of a standard CBC."
    }
  ],
  "references": [
    "NCBI - MCH: https://www.ncbi.nlm.nih.gov/books/NBK553/"
  ],
  "price": 100,
  "homeCollection": true,
  "tags": [
    "MCH",
    "RBC indices",
    "anemia"
  ]
},
{
  "slug": "mcv",
  "name": "Mean Corpuscular Volume (MCV)",
  "shortName": "MCV",
  "category": "Hematology",
  "subcategory": "RBC Indices",
  "description": "MCV measures average RBC size, classifying anemia as microcytic, normocytic, or macrocytic.",
  "purpose": "To determine average RBC size and classify anemia type.",
  "whyDone": [
    "To classify anemia type",
    "To guide further testing",
    "As part of routine CBC"
  ],
  "whoNeedsIt": [
    "Patients with anemia",
    "Patients with abnormal CBC",
    "Chronic alcohol users"
  ],
  "symptoms": [
    "Fatigue",
    "Pallor",
    "Shortness of breath",
    "Weakness"
  ],
  "conditionsDetected": [
    "Iron deficiency anemia (microcytic)",
    "B12 deficiency (macrocytic)",
    "Folate deficiency (macrocytic)",
    "Thalassemia (microcytic)"
  ],
  "preparation": [
    "No fasting required",
    "Part of routine CBC"
  ],
  "procedure": "Calculated from CBC by dividing total packed RBC volume by RBC count.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "80-100 femtoliters (fL)",
  "highResults": "Macrocytosis from B12/folate deficiency, liver disease, hypothyroidism, or alcohol use.",
  "lowResults": "Microcytosis from iron deficiency, thalassemia, or chronic disease.",
  "interpretation": "Most important RBC index for classifying anemia.",
  "relatedTests": [
    "cbc",
    "mch",
    "mchc",
    "iron-studies",
    "vitamin-b12",
    "folic-acid"
  ],
  "relatedDiseases": [
    "Iron deficiency anemia",
    "Megaloblastic anemia",
    "Thalassemia"
  ],
  "relatedPackages": [
    "anemia-workup"
  ],
  "faqs": [
    {
      "question": "What does high MCV mean?",
      "answer": "RBCs are larger than normal, often due to B12 or folate deficiency."
    },
    {
      "question": "What does low MCV mean?",
      "answer": "RBCs are smaller, often due to iron deficiency or thalassemia."
    },
    {
      "question": "Can alcohol raise MCV?",
      "answer": "Yes, chronic alcohol use is a common cause."
    },
    {
      "question": "Is MCV part of CBC?",
      "answer": "Yes, automatically calculated and reported."
    },
    {
      "question": "What is the next test if abnormal?",
      "answer": "If low: iron studies. If high: B12, folate, liver function tests."
    }
  ],
  "references": [
    "NCBI - MCV: https://www.ncbi.nlm.nih.gov/books/NBK541/"
  ],
  "price": 100,
  "homeCollection": true,
  "tags": [
    "MCV",
    "RBC indices",
    "anemia",
    "microcytic",
    "macrocytic"
  ]
},
{
  "slug": "mchc",
  "name": "Mean Corpuscular Hemoglobin Concentration (MCHC)",
  "shortName": "MCHC",
  "category": "Hematology",
  "subcategory": "RBC Indices",
  "description": "MCHC measures the average concentration of hemoglobin in a given volume of packed RBCs.",
  "purpose": "To assess hemoglobin concentration within red cells.",
  "whyDone": [
    "To help classify anemia",
    "To evaluate hypochromic/hyperchromic cells",
    "As part of CBC"
  ],
  "whoNeedsIt": [
    "Patients with anemia",
    "Patients with abnormal CBC",
    "Patients with suspected iron deficiency"
  ],
  "symptoms": [
    "Fatigue",
    "Pallor",
    "Weakness"
  ],
  "conditionsDetected": [
    "Iron deficiency anemia (low MCHC)",
    "Hereditary spherocytosis (high MCHC)",
    "Thalassemia"
  ],
  "preparation": [
    "No fasting required",
    "Part of routine CBC"
  ],
  "procedure": "Calculated from CBC by dividing hemoglobin by hematocrit.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "32-36 g/dL",
  "highResults": "May indicate spherocytosis or agglutination.",
  "lowResults": "Hypochromic cells from iron deficiency or thalassemia.",
  "interpretation": "Complements MCV and MCH. Low MCHC indicates hypochromia.",
  "relatedTests": [
    "cbc",
    "mcv",
    "mch",
    "peripheral-smear",
    "iron-studies"
  ],
  "relatedDiseases": [
    "Iron deficiency anemia",
    "Hereditary spherocytosis",
    "Thalassemia"
  ],
  "relatedPackages": [
    "anemia-workup"
  ],
  "faqs": [
    {
      "question": "What is the difference between MCH and MCHC?",
      "answer": "MCH measures hemoglobin per cell (pg); MCHC measures concentration per volume (g/dL)."
    },
    {
      "question": "What does low MCHC mean?",
      "answer": "Hypochromic red cells with reduced hemoglobin, usually from iron deficiency."
    },
    {
      "question": "What does high MCHC mean?",
      "answer": "Rare, may indicate hereditary spherocytosis."
    },
    {
      "question": "Is MCHC part of CBC?",
      "answer": "Yes, automatically calculated and reported."
    },
    {
      "question": "Can MCHC be falsely high?",
      "answer": "Yes, in severe hyperlipidemia or agglutination."
    }
  ],
  "references": [
    "NCBI - MCHC: https://www.ncbi.nlm.nih.gov/books/NBK554/"
  ],
  "price": 100,
  "homeCollection": true,
  "tags": [
    "MCHC",
    "RBC indices",
    "hypochromic",
    "anemia"
  ]
},
{
  "slug": "iron-studies",
  "name": "Iron Studies (Iron Profile)",
  "shortName": "Iron Panel",
  "category": "Hematology",
  "subcategory": "Iron Studies",
  "description": "A group of blood tests measuring iron levels, transport, and storage including serum iron, TIBC, transferrin saturation, and ferritin.",
  "purpose": "To evaluate iron levels and diagnose iron deficiency or overload.",
  "whyDone": [
    "To diagnose iron deficiency anemia",
    "To evaluate hemochromatosis",
    "To assess anemia of chronic disease",
    "To monitor iron supplementation"
  ],
  "whoNeedsIt": [
    "Patients with unexplained anemia",
    "Patients with iron deficiency symptoms",
    "Family history of hemochromatosis",
    "Patients on iron therapy",
    "Pregnant women"
  ],
  "symptoms": [
    "Fatigue and weakness",
    "Pallor",
    "Shortness of breath",
    "Brittle nails",
    "Pica",
    "Restless legs"
  ],
  "conditionsDetected": [
    "Iron deficiency anemia",
    "Hemochromatosis",
    "Anemia of chronic disease",
    "Thalassemia",
    "Sideroblastic anemia"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid iron supplements for 24-48 hours before testing"
  ],
  "procedure": "Blood drawn after overnight fasting. Multiple parameters measured for comprehensive iron evaluation.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Serum Iron: 60-170 ug/dL, TIBC: 250-370 ug/dL, Transferrin Saturation: 20-50%, Ferritin: 12-150 ng/mL (F), 12-300 ng/mL (M)",
  "highResults": "High serum iron and ferritin with low TIBC may indicate hemochromatosis or iron overload.",
  "lowResults": "Low serum iron with high TIBC and low transferrin saturation indicates iron deficiency.",
  "interpretation": "Iron studies should be interpreted together. Iron deficiency: low iron, high TIBC, low TSAT, low ferritin.",
  "relatedTests": [
    "ferritin",
    "tibc",
    "cbc",
    "hemoglobin",
    "transferrin-saturation"
  ],
  "relatedDiseases": [
    "Iron deficiency anemia",
    "Hemochromatosis",
    "Anemia of chronic disease"
  ],
  "relatedPackages": [
    "anemia-workup",
    "iron-panel"
  ],
  "faqs": [
    {
      "question": "Why is fasting required?",
      "answer": "Serum iron fluctuates after meals. Fasting provides a baseline for accuracy."
    },
    {
      "question": "Can supplements affect the test?",
      "answer": "Yes, avoid iron supplements for 24-48 hours before testing."
    },
    {
      "question": "What is the difference between serum iron and ferritin?",
      "answer": "Serum iron measures circulating iron; ferritin measures stored iron."
    },
    {
      "question": "What is TIBC?",
      "answer": "Total Iron Binding Capacity measures the blood's capacity to bind and transport iron."
    },
    {
      "question": "What does transferrin saturation indicate?",
      "answer": "Below 20% suggests iron deficiency; above 50% may indicate overload."
    }
  ],
  "references": [
    "LabTestsOnline - Iron Tests: https://labtestsonline.org/tests/iron-tests"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "iron",
    "ferritin",
    "TIBC",
    "anemia",
    "hemochromatosis"
  ]
},
{
  "slug": "ferritin",
  "name": "Serum Ferritin",
  "shortName": "Ferritin",
  "category": "Hematology",
  "subcategory": "Iron Studies",
  "description": "Ferritin is a blood protein containing iron, reflecting total iron stores. Most sensitive test for iron deficiency.",
  "purpose": "To assess iron stores and diagnose iron deficiency or overload.",
  "whyDone": [
    "To diagnose iron deficiency before anemia",
    "To evaluate iron overload",
    "To monitor treatment response",
    "To differentiate causes of anemia"
  ],
  "whoNeedsIt": [
    "Patients with suspected iron deficiency",
    "Patients with unexplained anemia",
    "Patients with chronic blood loss",
    "Patients on iron therapy"
  ],
  "symptoms": [
    "Fatigue",
    "Weakness",
    "Pale skin",
    "Brittle nails",
    "Hair loss"
  ],
  "conditionsDetected": [
    "Iron deficiency (early)",
    "Iron overload (hemochromatosis)",
    "Chronic inflammation",
    "Liver disease",
    "Certain malignancies"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended",
    "Avoid iron supplements for 48 hours",
    "Note: ferritin is an acute phase reactant"
  ],
  "procedure": "Blood drawn and ferritin measured using immunoassay techniques.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Males: 12-300 ng/mL, Females: 12-150 ng/mL",
  "highResults": "May indicate hemochromatosis, liver disease, inflammation, infections, or malignancies.",
  "lowResults": "Earliest and most specific marker of iron deficiency.",
  "interpretation": "Most reliable single test for iron stores. Below 30 ng/mL is suggestive of iron deficiency.",
  "relatedTests": [
    "iron-studies",
    "tibc",
    "cbc",
    "hemoglobin"
  ],
  "relatedDiseases": [
    "Iron deficiency anemia",
    "Hemochromatosis",
    "Inflammation",
    "Liver disease"
  ],
  "relatedPackages": [
    "anemia-workup",
    "iron-panel"
  ],
  "faqs": [
    {
      "question": "What is a normal ferritin level?",
      "answer": "Males: 12-300 ng/mL, Females: 12-150 ng/mL. Optimal above 50 ng/mL."
    },
    {
      "question": "Can ferritin be normal in iron deficiency?",
      "answer": "In early deficiency, it may still be in range but declining. Below 30 is suggestive."
    },
    {
      "question": "Why is ferritin elevated in infection?",
      "answer": "Ferritin is an acute phase reactant that rises during inflammation independently of iron stores."
    },
    {
      "question": "What does very high ferritin mean?",
      "answer": "Very high (>1000) may indicate hemochromatosis, liver disease, or malignancy."
    },
    {
      "question": "How to increase ferritin?",
      "answer": "Iron-rich foods, vitamin C for absorption, iron supplements as prescribed."
    }
  ],
  "references": [
    "LabTestsOnline - Ferritin: https://labtestsonline.org/tests/ferritin"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "ferritin",
    "iron stores",
    "anemia",
    "hemochromatosis"
  ]
},
{
  "slug": "tibc",
  "name": "Total Iron Binding Capacity (TIBC)",
  "shortName": "TIBC",
  "category": "Hematology",
  "subcategory": "Iron Studies",
  "description": "TIBC measures the total capacity of transferrin to bind iron, reflecting blood's iron transport ability.",
  "purpose": "To assess iron transport capacity and diagnose iron deficiency or overload.",
  "whyDone": [
    "To diagnose iron deficiency anemia",
    "To evaluate iron overload",
    "As part of complete iron studies"
  ],
  "whoNeedsIt": [
    "Patients with suspected iron deficiency",
    "Patients with unexplained anemia",
    "Patients evaluated for hemochromatosis"
  ],
  "symptoms": [
    "Fatigue",
    "Weakness",
    "Pallor"
  ],
  "conditionsDetected": [
    "Iron deficiency anemia",
    "Hemochromatosis",
    "Anemia of chronic disease"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid iron supplements 48 hours before testing"
  ],
  "procedure": "Blood drawn after fasting. TIBC calculated by measuring total iron that can be bound by serum transferrin.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "250-370 ug/dL",
  "highResults": "Indicates increased transferrin production, typically from iron deficiency.",
  "lowResults": "Indicates decreased transferrin, seen in iron overload, chronic disease, or liver cirrhosis.",
  "interpretation": "Interpreted alongside serum iron and transferrin saturation.",
  "relatedTests": [
    "iron-studies",
    "ferritin",
    "transferrin-saturation",
    "cbc"
  ],
  "relatedDiseases": [
    "Iron deficiency anemia",
    "Hemochromatosis",
    "Chronic disease"
  ],
  "relatedPackages": [
    "anemia-workup",
    "iron-panel"
  ],
  "faqs": [
    {
      "question": "What does high TIBC mean?",
      "answer": "More transferrin available, usually indicating iron deficiency."
    },
    {
      "question": "What does low TIBC mean?",
      "answer": "May indicate iron overload, chronic disease, or liver cirrhosis."
    },
    {
      "question": "Is fasting required?",
      "answer": "Yes, 8-12 hours of fasting recommended."
    },
    {
      "question": "What is the difference between TIBC and transferrin?",
      "answer": "TIBC measures total binding capacity; transferrin is the actual protein."
    },
    {
      "question": "How is it used with other tests?",
      "answer": "Alongside serum iron, ferritin, and transferrin saturation for complete iron assessment."
    }
  ],
  "references": [
    "LabTestsOnline - TIBC: https://labtestsonline.org/tests/total-iron-binding-capacity-tibc"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "TIBC",
    "iron binding capacity",
    "transferrin",
    "anemia"
  ]
},
{
  "slug": "transferrin-saturation",
  "name": "Transferrin Saturation",
  "shortName": "TSAT",
  "category": "Hematology",
  "subcategory": "Iron Studies",
  "description": "Calculates the percentage of transferrin saturated with iron, derived from serum iron and TIBC values.",
  "purpose": "To evaluate iron availability for red blood cell production.",
  "whyDone": [
    "To diagnose iron deficiency",
    "To screen for hemochromatosis",
    "As part of iron study panel"
  ],
  "whoNeedsIt": [
    "Patients with suspected iron deficiency",
    "Patients screened for hemochromatosis",
    "CKD patients on erythropoietin"
  ],
  "symptoms": [
    "Fatigue",
    "Pallor",
    "Joint pain (hemochromatosis)"
  ],
  "conditionsDetected": [
    "Iron deficiency",
    "Hemochromatosis",
    "Anemia of chronic disease"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid iron supplements 48 hours before"
  ],
  "procedure": "Calculated from serum iron and TIBC: (Serum Iron / TIBC) x 100.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "20-50%",
  "highResults": ">50% suggests iron overload. >60% highly suggestive of hereditary hemochromatosis.",
  "lowResults": "<20% indicates iron deficiency.",
  "interpretation": "Most useful single screening test for both iron deficiency and overload.",
  "relatedTests": [
    "iron-studies",
    "ferritin",
    "tibc",
    "cbc"
  ],
  "relatedDiseases": [
    "Iron deficiency anemia",
    "Hemochromatosis"
  ],
  "relatedPackages": [
    "anemia-workup",
    "iron-panel"
  ],
  "faqs": [
    {
      "question": "What is normal?",
      "answer": "20-50%. Below 20% indicates deficiency; above 50% may indicate overload."
    },
    {
      "question": "Can meals affect it?",
      "answer": "Yes, serum iron rises after meals. Fasting is recommended."
    },
    {
      "question": "What does high saturation mean?",
      "answer": "May indicate hereditary hemochromatosis or iron overload."
    },
    {
      "question": "How is it calculated?",
      "answer": "(Serum Iron / TIBC) x 100."
    },
    {
      "question": "When to test for hemochromatosis?",
      "answer": "If saturation is consistently >50%, genetic testing may be recommended."
    }
  ],
  "references": [
    "LabTestsOnline - Transferrin Saturation: https://labtestsonline.org/tests/transferrin"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "transferrin saturation",
    "iron",
    "hemochromatosis"
  ]
},
{
  "slug": "fibrinogen",
  "name": "Fibrinogen Test",
  "shortName": "Fibrinogen",
  "category": "Hematology",
  "subcategory": "Coagulation",
  "description": "Fibrinogen is a liver-produced protein essential for blood clotting. Measures clotting ability.",
  "purpose": "To evaluate blood clotting ability and diagnose fibrinogen disorders.",
  "whyDone": [
    "To investigate unexplained bleeding or clotting",
    "To evaluate DIC",
    "To monitor liver synthetic capacity",
    "To assess cardiovascular risk"
  ],
  "whoNeedsIt": [
    "Patients with unexplained bleeding",
    "Patients with suspected DIC",
    "Patients with severe liver disease",
    "Patients with thrombotic events"
  ],
  "symptoms": [
    "Easy bruising",
    "Prolonged bleeding",
    "Blood clots",
    "Heavy menstrual bleeding"
  ],
  "conditionsDetected": [
    "DIC",
    "Afibrinogenemia",
    "Hypofibrinogenemia",
    "Liver disease",
    "Thrombotic disorders"
  ],
  "preparation": [
    "No fasting required",
    "Avoid blood-thinning medications if possible"
  ],
  "procedure": "Blood drawn and mixed with anticoagulant. Measured using clotting assays or immunological methods.",
  "sampleType": "Plasma (Sodium Citrate)",
  "turnaroundTime": "4-6 hours",
  "normalRange": "200-400 mg/dL",
  "highResults": "Acute phase reactant seen in inflammation, infection, tissue injury, and cardiovascular risk.",
  "lowResults": "May indicate liver disease, DIC, or inherited fibrinogen disorders.",
  "interpretation": "Both a clotting factor and acute phase reactant. Interpret alongside other coagulation tests.",
  "relatedTests": [
    "pt-inr",
    "aptt",
    "d-dimer",
    "cbc",
    "liver-function-test"
  ],
  "relatedDiseases": [
    "DIC",
    "Liver disease",
    "Thrombosis",
    "Afibrinogenemia"
  ],
  "relatedPackages": [
    "coagulation-panel",
    "liver-panel"
  ],
  "faqs": [
    {
      "question": "What is fibrinogen?",
      "answer": "A liver protein essential for blood clotting, converted to fibrin when activated."
    },
    {
      "question": "What does high fibrinogen mean?",
      "answer": "May indicate inflammation, infection, tissue damage, or cardiovascular risk."
    },
    {
      "question": "What does low fibrinogen mean?",
      "answer": "May indicate severe liver disease, DIC, or inherited deficiency."
    },
    {
      "question": "Is it the same as fibrin?",
      "answer": "No. Fibrinogen is soluble; when activated, it converts to insoluble fibrin forming clots."
    },
    {
      "question": "Can high fibrinogen cause heart attacks?",
      "answer": "High fibrinogen is a cardiovascular risk factor contributing to arterial clot formation."
    }
  ],
  "references": [
    "LabTestsOnline - Fibrinogen: https://labtestsonline.org/tests/fibrinogen"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "fibrinogen",
    "clotting",
    "coagulation",
    "DIC"
  ]
},
{
  "slug": "fasting-blood-glucose",
  "name": "Fasting Blood Glucose (FBG)",
  "shortName": "FBG",
  "category": "Clinical Chemistry",
  "subcategory": "Glucose & Diabetes",
  "description": "Measures blood sugar after an overnight fast. Primary screening test for diabetes and prediabetes.",
  "purpose": "To screen for and diagnose diabetes mellitus, prediabetes, and monitor blood sugar control.",
  "whyDone": [
    "To screen for diabetes during routine check-ups",
    "To diagnose prediabetes and diabetes",
    "To monitor blood sugar in known diabetics",
    "To evaluate gestational diabetes"
  ],
  "whoNeedsIt": [
    "Individuals over 40",
    "Overweight individuals",
    "People with family history of diabetes",
    "Pregnant women (24-28 weeks)"
  ],
  "symptoms": [
    "Increased thirst",
    "Frequent urination",
    "Unexplained weight loss",
    "Blurred vision",
    "Slow-healing wounds",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Diabetes mellitus",
    "Prediabetes",
    "Gestational diabetes",
    "Hypoglycemia",
    "Metabolic syndrome"
  ],
  "preparation": [
    "Fast for 8-12 hours (water allowed)",
    "Avoid alcohol for 24 hours",
    "Avoid strenuous exercise the day before"
  ],
  "procedure": "Blood drawn from a vein after an overnight fast of at least 8 hours.",
  "sampleType": "Serum (Fluoride tube)",
  "turnaroundTime": "1-2 hours",
  "normalRange": "Normal: <100 mg/dL, Prediabetes: 100-125 mg/dL, Diabetes: >=126 mg/dL",
  "highResults": "Elevated fasting glucose indicates diabetes or prediabetes. Levels >200 mg/dL with symptoms confirm diabetes.",
  "lowResults": "Low fasting glucose (<70 mg/dL) may indicate hypoglycemia from insulin overdose, medications, or liver disease.",
  "interpretation": "Initial test for diabetes diagnosis. Two abnormal results on separate occasions required for definitive diagnosis.",
  "relatedTests": [
    "hba1c",
    "postprandial-glucose",
    "insulin",
    "c-peptide",
    "homa-ir"
  ],
  "relatedDiseases": [
    "Diabetes mellitus",
    "Prediabetes",
    "Metabolic syndrome",
    "Gestational diabetes"
  ],
  "relatedPackages": [
    "diabetes-panel",
    "complete-health-checkup",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "How long should I fast?",
      "answer": "At least 8-12 hours. Water is permitted, but no food, tea, coffee, or juice."
    },
    {
      "question": "What is normal fasting blood sugar?",
      "answer": "Below 100 mg/dL. 100-125 is prediabetes, >=126 is diabetes."
    },
    {
      "question": "Can stress affect it?",
      "answer": "Yes, physical or emotional stress can temporarily raise blood glucose."
    },
    {
      "question": "Is this enough to diagnose diabetes?",
      "answer": "It is a screening test. Diagnosis requires two abnormal results or confirmation with HbA1c."
    },
    {
      "question": "What if my fasting glucose is high?",
      "answer": "Follow your doctor's recommendations including diet, exercise, and possibly medication."
    }
  ],
  "references": [
    "ADA - Standards of Medical Care: https://diabetesjournals.org/care/issue/44/Supplement_1"
  ],
  "price": 100,
  "homeCollection": true,
  "tags": [
    "blood sugar",
    "glucose",
    "diabetes",
    "fasting",
    "prediabetes"
  ]
},
{
  "slug": "hba1c",
  "name": "Glycated Hemoglobin (HbA1c)",
  "shortName": "HbA1c",
  "category": "Clinical Chemistry",
  "subcategory": "Glucose & Diabetes",
  "description": "Measures percentage of hemoglobin with glucose attached, reflecting average blood glucose over 2-3 months. Gold standard for diabetes monitoring.",
  "purpose": "To assess long-term blood glucose control and diagnose diabetes.",
  "whyDone": [
    "To diagnose diabetes and prediabetes",
    "To monitor long-term blood sugar control",
    "To adjust diabetes medications",
    "To assess risk of diabetes complications"
  ],
  "whoNeedsIt": [
    "Diabetic patients (every 3-6 months)",
    "Individuals screened for diabetes",
    "Patients with diabetes risk factors"
  ],
  "symptoms": [
    "Increased thirst",
    "Frequent urination",
    "Fatigue",
    "Blurred vision",
    "Unexplained weight loss"
  ],
  "conditionsDetected": [
    "Diabetes mellitus",
    "Prediabetes",
    "Poorly controlled diabetes",
    "Gestational diabetes"
  ],
  "preparation": [
    "No fasting required",
    "Can be done any time of day",
    "Conditions affecting RBC turnover may affect results"
  ],
  "procedure": "Blood drawn from a vein. HbA1c measured using HPLC or immunoassay.",
  "sampleType": "Whole Blood (EDTA)",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Normal: <5.7%, Prediabetes: 5.7-6.4%, Diabetes: >=6.5%",
  "highResults": "Indicates poor long-term blood glucose control with increased risk of complications.",
  "lowResults": "May indicate hypoglycemia or conditions affecting RBC lifespan.",
  "interpretation": "Provides 2-3 month glucose average. More convenient than daily monitoring, no fasting needed.",
  "relatedTests": [
    "fasting-blood-glucose",
    "postprandial-glucose",
    "insulin",
    "c-peptide"
  ],
  "relatedDiseases": [
    "Diabetes mellitus",
    "Prediabetes",
    "Metabolic syndrome"
  ],
  "relatedPackages": [
    "diabetes-panel",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "How often should it be tested?",
      "answer": "Stable control: every 6 months. Poor control: every 3 months."
    },
    {
      "question": "Do I need to fast?",
      "answer": "No, HbA1c does not require fasting."
    },
    {
      "question": "What does 7% mean?",
      "answer": "Average blood glucose of ~154 mg/dL. ADA target is below 7%."
    },
    {
      "question": "Can anemia affect it?",
      "answer": "Yes, conditions affecting RBC lifespan can alter results."
    },
    {
      "question": "What is the relationship to average glucose?",
      "answer": "eAG (mg/dL) = 28.7 x HbA1c - 46.7. HbA1c 7% = ~154 mg/dL."
    }
  ],
  "references": [
    "ADA - HbA1c: https://diabetesjournals.org/care/article/40/Supplement_1/S48/30756/6"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "HbA1c",
    "A1c",
    "glycated hemoglobin",
    "diabetes"
  ]
},
{
  "slug": "lipid-profile",
  "name": "Lipid Profile",
  "shortName": "Lipid Panel",
  "category": "Clinical Chemistry",
  "subcategory": "Lipids",
  "description": "Measures cholesterol and triglycerides including total cholesterol, LDL, HDL, and triglycerides for cardiovascular risk assessment.",
  "purpose": "To evaluate cardiovascular risk by measuring blood cholesterol and triglyceride levels.",
  "whyDone": [
    "To screen for cardiovascular disease risk",
    "To monitor cholesterol during treatment",
    "To evaluate familial hyperlipidemia",
    "As part of routine health check-ups"
  ],
  "whoNeedsIt": [
    "Adults over 20 (every 4-6 years)",
    "Individuals with cardiovascular risk factors",
    "Patients with existing heart disease or diabetes"
  ],
  "symptoms": [
    "Usually no symptoms",
    "Xanthomas in severe cases",
    "Chest pain if contributing to atherosclerosis"
  ],
  "conditionsDetected": [
    "Hyperlipidemia",
    "Familial hypercholesterolemia",
    "Cardiovascular risk",
    "Metabolic syndrome",
    "Pancreatitis"
  ],
  "preparation": [
    "Fast for 9-12 hours",
    "Avoid alcohol for 24 hours",
    "Avoid high-fat meals the day before"
  ],
  "procedure": "Blood drawn after overnight fast. Lipid levels measured using enzymatic methods.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Total Cholesterol: <200 mg/dL, LDL: <100 mg/dL, HDL: >40(M)/>50(F) mg/dL, TG: <150 mg/dL",
  "highResults": "High cholesterol/LDL/TG increase cardiovascular risk. Very high TG (>500) can cause pancreatitis.",
  "lowResults": "Low HDL is a cardiovascular risk factor. Very low total cholesterol may indicate liver disease.",
  "interpretation": "LDL is the primary treatment target, but HDL, TG, and total cholesterol/HDL ratio are also important.",
  "relatedTests": [
    "total-cholesterol",
    "triglycerides",
    "hdl",
    "ldl",
    "lipoprotein-a"
  ],
  "relatedDiseases": [
    "Atherosclerosis",
    "Coronary artery disease",
    "Familial hyperlipidemia",
    "Metabolic syndrome"
  ],
  "relatedPackages": [
    "cardiac-risk-panel",
    "complete-health-checkup",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "Why is fasting required?",
      "answer": "Triglycerides rise significantly after eating. Fasting provides standardized baseline."
    },
    {
      "question": "How often should I get it done?",
      "answer": "Healthy adults: every 4-6 years. With risk factors: every 3-12 months."
    },
    {
      "question": "What is good vs bad cholesterol?",
      "answer": "HDL ('good') removes cholesterol from arteries. LDL ('bad') deposits it in artery walls."
    },
    {
      "question": "Can I lower cholesterol without medication?",
      "answer": "Yes, through diet, exercise, weight management, and quitting smoking."
    },
    {
      "question": "What LDL level is optimal?",
      "answer": "Most adults: <100. High-risk: <70. Very high-risk: <55 mg/dL."
    }
  ],
  "references": [
    "AHA - Cholesterol: https://www.heart.org/en/health-topics/cholesterol"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "cholesterol",
    "lipids",
    "LDL",
    "HDL",
    "triglycerides",
    "cardiac risk"
  ]
},
{
  "slug": "total-cholesterol",
  "name": "Total Cholesterol",
  "shortName": "TC",
  "category": "Clinical Chemistry",
  "subcategory": "Lipids",
  "description": "Measures total amount of cholesterol in blood including LDL, HDL, and other lipoproteins.",
  "purpose": "To assess cardiovascular risk by measuring total cholesterol level.",
  "whyDone": [
    "To screen for cardiovascular risk",
    "To monitor cholesterol management",
    "As part of routine screening"
  ],
  "whoNeedsIt": [
    "Adults over 20",
    "Individuals with cardiovascular risk factors",
    "Patients on statin therapy"
  ],
  "symptoms": [
    "Usually no symptoms"
  ],
  "conditionsDetected": [
    "Hypercholesterolemia",
    "Cardiovascular disease risk"
  ],
  "preparation": [
    "Fast for 9-12 hours",
    "Avoid high-fat meals the day before"
  ],
  "procedure": "Blood drawn after fasting and analyzed using enzymatic methods.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Desirable: <200 mg/dL, Borderline high: 200-239, High: >=240 mg/dL",
  "highResults": "Increases risk of atherosclerosis, coronary artery disease, and stroke.",
  "lowResults": "Very low may indicate liver disease, malnutrition, or hyperthyroidism.",
  "interpretation": "Should be interpreted alongside LDL, HDL, and triglycerides.",
  "relatedTests": [
    "ldl",
    "hdl",
    "triglycerides",
    "lipid-profile"
  ],
  "relatedDiseases": [
    "Atherosclerosis",
    "Coronary artery disease",
    "Stroke"
  ],
  "relatedPackages": [
    "lipid-panel",
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "What is healthy total cholesterol?",
      "answer": "Below 200 mg/dL is desirable."
    },
    {
      "question": "Does it alone indicate heart risk?",
      "answer": "No, composition matters. High HDL is protective while high LDL is harmful."
    },
    {
      "question": "How to lower it?",
      "answer": "Low saturated fat diet, exercise, weight management, no smoking."
    },
    {
      "question": "Can it be too low?",
      "answer": "Very low (<120) may indicate liver disease or hyperthyroidism."
    },
    {
      "question": "Does age affect it?",
      "answer": "Yes, cholesterol tends to rise with age."
    }
  ],
  "references": [
    "AHA - About Cholesterol: https://www.heart.org/en/health-topics/cholesterol/about-cholesterol"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "cholesterol",
    "total cholesterol",
    "cardiac risk"
  ]
},
{
  "slug": "triglycerides",
  "name": "Triglycerides",
  "shortName": "TG",
  "category": "Clinical Chemistry",
  "subcategory": "Lipids",
  "description": "Fats in the blood. Elevated levels are associated with heart disease, stroke, and pancreatitis risk.",
  "purpose": "To measure triglyceride levels and assess cardiovascular and pancreatitis risk.",
  "whyDone": [
    "To assess cardiovascular risk",
    "To evaluate metabolic syndrome",
    "To screen for pancreatitis risk"
  ],
  "whoNeedsIt": [
    "Adults during lipid screening",
    "Patients with diabetes or metabolic syndrome",
    "Patients with family history of pancreatitis"
  ],
  "symptoms": [
    "Usually no symptoms",
    "Abdominal pain with very high levels"
  ],
  "conditionsDetected": [
    "Hypertriglyceridemia",
    "Metabolic syndrome",
    "Pancreatitis risk",
    "Cardiovascular risk"
  ],
  "preparation": [
    "Fast for 9-12 hours",
    "Avoid alcohol for 24-72 hours",
    "Avoid high-fat meals"
  ],
  "procedure": "Blood drawn after fasting. Measured using enzymatic methods.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Normal: <150, Borderline: 150-199, High: 200-499, Very high: >=500 mg/dL",
  "highResults": "Associated with obesity, diabetes, metabolic syndrome. Very high (>500) causes acute pancreatitis.",
  "lowResults": "Very low may indicate malnutrition or hyperthyroidism.",
  "interpretation": "Independent risk factor for cardiovascular disease.",
  "relatedTests": [
    "lipid-profile",
    "total-cholesterol",
    "ldl",
    "hdl"
  ],
  "relatedDiseases": [
    "Metabolic syndrome",
    "Pancreatitis",
    "Cardiovascular disease",
    "Diabetes"
  ],
  "relatedPackages": [
    "lipid-panel",
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "What causes high triglycerides?",
      "answer": "Obesity, high-sugar diets, excess alcohol, diabetes, hypothyroidism."
    },
    {
      "question": "What is dangerous?",
      "answer": ">500 mg/dL significantly increases acute pancreatitis risk."
    },
    {
      "question": "How to lower naturally?",
      "answer": "Reduce sugar/refined carbs, limit alcohol, exercise, lose weight, increase omega-3s."
    },
    {
      "question": "Why is fasting required?",
      "answer": "Triglycerides rise significantly after eating."
    },
    {
      "question": "Are they the same as cholesterol?",
      "answer": "No. Triglycerides store unused calories; cholesterol builds cells and makes hormones."
    }
  ],
  "references": [
    "AHA - Triglycerides: https://www.heart.org/en/health-topics/cholesterol/about-cholesterol/triglycerides"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "triglycerides",
    "TG",
    "lipids",
    "pancreatitis"
  ]
},
{
  "slug": "hdl",
  "name": "HDL Cholesterol (Good Cholesterol)",
  "shortName": "HDL",
  "category": "Clinical Chemistry",
  "subcategory": "Lipids",
  "description": "HDL helps remove excess cholesterol from arteries and transports it back to the liver for excretion.",
  "purpose": "To measure HDL levels and assess cardiovascular protection.",
  "whyDone": [
    "To evaluate cardiovascular risk",
    "To assess protective lipid component",
    "As part of routine lipid screening"
  ],
  "whoNeedsIt": [
    "Adults during lipid screening",
    "Patients at cardiovascular risk",
    "Patients with metabolic syndrome"
  ],
  "symptoms": [
    "Usually no symptoms"
  ],
  "conditionsDetected": [
    "Low HDL (cardiovascular risk factor)",
    "Metabolic syndrome"
  ],
  "preparation": [
    "Fast for 9-12 hours",
    "Regular exercise can raise HDL"
  ],
  "procedure": "HDL measured from fasting blood sample using direct immunoassay.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Males: >40 mg/dL (optimal: >60), Females: >50 mg/dL (optimal: >60)",
  "highResults": "High HDL is protective. Levels >60 provide significant cardiovascular protection.",
  "lowResults": "Low HDL (<40 M, <50 F) is an independent cardiovascular risk factor.",
  "interpretation": "Higher HDL is better. Exercise, weight loss, and quitting smoking can raise HDL.",
  "relatedTests": [
    "ldl",
    "total-cholesterol",
    "triglycerides",
    "lipid-profile"
  ],
  "relatedDiseases": [
    "Cardiovascular disease",
    "Metabolic syndrome"
  ],
  "relatedPackages": [
    "lipid-panel",
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "How to raise HDL?",
      "answer": "Aerobic exercise, weight loss, quitting smoking, healthy fats."
    },
    {
      "question": "Is high HDL always good?",
      "answer": "Very high HDL (>100) may not always be protective but is generally beneficial."
    },
    {
      "question": "What is the ideal level?",
      "answer": "Above 60 mg/dL is cardioprotective."
    },
    {
      "question": "Does exercise increase HDL?",
      "answer": "Yes, regular aerobic exercise can raise HDL by 5-10%."
    },
    {
      "question": "Can medication raise HDL?",
      "answer": "Niacin can raise HDL, but pharmacological raising may not reduce cardiovascular events."
    }
  ],
  "references": [
    "AHA - HDL Cholesterol: https://www.heart.org/en/health-topics/cholesterol/about-cholesterol/hdl-good-and-bad-cholesterol"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "HDL",
    "good cholesterol",
    "lipids",
    "cardiac risk"
  ]
},
{
  "slug": "ldl",
  "name": "LDL Cholesterol (Bad Cholesterol)",
  "shortName": "LDL",
  "category": "Clinical Chemistry",
  "subcategory": "Lipids",
  "description": "LDL deposits cholesterol in artery walls, contributing to plaque buildup and increasing heart disease and stroke risk.",
  "purpose": "To measure LDL levels and assess cardiovascular risk.",
  "whyDone": [
    "To assess cardiovascular risk",
    "To guide statin therapy",
    "To monitor treatment response",
    "As part of lipid screening"
  ],
  "whoNeedsIt": [
    "Adults during lipid screening",
    "Patients with cardiovascular disease",
    "Patients with diabetes",
    "Patients on statin therapy"
  ],
  "symptoms": [
    "Usually no symptoms"
  ],
  "conditionsDetected": [
    "Hypercholesterolemia",
    "Atherosclerosis risk",
    "Familial hyperlipidemia"
  ],
  "preparation": [
    "Fast for 9-12 hours",
    "LDL calculated via Friedewald: TC - HDL - TG/5"
  ],
  "procedure": "LDL directly measured or calculated from fasting lipid panel.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Optimal: <100, Near optimal: 100-129, Borderline: 130-159, High: 160-189, Very high: >=190 mg/dL",
  "highResults": "Primary driver of atherosclerosis and major target for cardiovascular prevention.",
  "lowResults": "Very low levels generally not a concern unless with fat-soluble vitamin deficiency.",
  "interpretation": "Primary target for cholesterol-lowering therapy. Goals depend on cardiovascular risk.",
  "relatedTests": [
    "hdl",
    "total-cholesterol",
    "triglycerides",
    "lipid-profile",
    "lipoprotein-a"
  ],
  "relatedDiseases": [
    "Atherosclerosis",
    "Coronary artery disease",
    "Stroke",
    "Familial hyperlipidemia"
  ],
  "relatedPackages": [
    "lipid-panel",
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "What is the ideal LDL?",
      "answer": "Most adults: <100. High-risk: <70. Very high-risk: <55 mg/dL."
    },
    {
      "question": "How is LDL calculated?",
      "answer": "Friedewald: LDL = TC - HDL - (TG/5). Direct measurement used when TG is high."
    },
    {
      "question": "Can diet lower LDL?",
      "answer": "Yes, reducing saturated/trans fat, increasing soluble fiber, plant sterols can lower by 10-30%."
    },
    {
      "question": "When are statins prescribed?",
      "answer": "When LDL is significantly elevated, cardiovascular disease exists, or 10-year risk is high."
    },
    {
      "question": "Can LDL be too low?",
      "answer": "Below 40 is uncommon and generally not harmful."
    }
  ],
  "references": [
    "AHA - LDL Cholesterol: https://www.heart.org/en/health-topics/cholesterol/about-cholesterol/hdl-good-and-bad-cholesterol"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "LDL",
    "bad cholesterol",
    "lipids",
    "atherosclerosis"
  ]
},
{
  "slug": "liver-function-test",
  "name": "Liver Function Test (LFT)",
  "shortName": "LFT",
  "category": "Clinical Chemistry",
  "subcategory": "Liver & Biliary",
  "description": "Blood tests measuring liver enzymes, proteins, and bilirubin to assess liver health and detect damage.",
  "purpose": "To evaluate liver function, detect liver damage, and monitor liver disease.",
  "whyDone": [
    "To screen for liver disease",
    "To monitor chronic liver conditions",
    "To evaluate medication side effects",
    "To assess jaundice"
  ],
  "whoNeedsIt": [
    "Patients with liver disease symptoms",
    "Patients on hepatotoxic medications",
    "Chronic alcohol users",
    "Patients with hepatitis or cirrhosis"
  ],
  "symptoms": [
    "Jaundice",
    "Abdominal pain",
    "Dark urine",
    "Pale stools",
    "Fatigue",
    "Nausea"
  ],
  "conditionsDetected": [
    "Hepatitis",
    "Cirrhosis",
    "Fatty liver disease",
    "Liver cancer",
    "Drug-induced liver injury",
    "Obstructive jaundice"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid alcohol for 24 hours",
    "Inform doctor about all medications"
  ],
  "procedure": "Blood drawn after fasting. Multiple liver markers measured from the same sample.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "SGOT: 5-40 U/L, SGPT: 5-35 U/L, ALP: 44-147 U/L, Total Bilirubin: 0.1-1.2 mg/dL, Albumin: 3.5-5.0 g/dL",
  "highResults": "Elevated AST/ALT indicate liver cell damage. High ALP/GGT indicate bile duct obstruction.",
  "lowResults": "Low albumin indicates chronic liver disease with reduced synthetic function.",
  "interpretation": "Pattern of abnormalities helps differentiate liver cell damage, bile duct obstruction, and synthetic dysfunction.",
  "relatedTests": [
    "sgot",
    "sgpt",
    "alkaline-phosphatase",
    "bilirubin",
    "albumin",
    "ggt"
  ],
  "relatedDiseases": [
    "Hepatitis",
    "Cirrhosis",
    "Fatty liver",
    "Liver cancer",
    "Gallstones"
  ],
  "relatedPackages": [
    "liver-panel",
    "complete-health-checkup",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "What is the difference between SGOT and SGPT?",
      "answer": "SGPT (ALT) is more specific to the liver. SGOT (AST) is also found in heart and muscles."
    },
    {
      "question": "Why is fasting required?",
      "answer": "Eating can affect certain liver enzymes and bilirubin levels."
    },
    {
      "question": "Can medications affect LFT?",
      "answer": "Yes, paracetamol, statins, antibiotics, and herbal supplements can elevate liver enzymes."
    },
    {
      "question": "What does high ALP indicate?",
      "answer": "Bile duct obstruction, liver disease, or bone disorders. GGT helps differentiate."
    },
    {
      "question": "How often should LFT be done?",
      "answer": "Healthy: annually. Liver disease or on hepatotoxic drugs: every 3-6 months."
    }
  ],
  "references": [
    "NCBI - Liver Function Tests: https://www.ncbi.nlm.nih.gov/books/NBK470313/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "liver",
    "LFT",
    "bilirubin",
    "SGOT",
    "SGPT",
    "hepatitis"
  ]
},
{
  "slug": "sgot",
  "name": "SGOT (AST)",
  "shortName": "SGOT",
  "category": "Clinical Chemistry",
  "subcategory": "Liver & Biliary",
  "description": "SGOT (AST) is an enzyme found in the liver, heart, muscles, and kidneys. Elevated levels indicate cell damage.",
  "purpose": "To detect liver cell damage and assess liver or heart injury.",
  "whyDone": [
    "To evaluate liver damage",
    "To assess heart attack",
    "To monitor liver disease",
    "To detect drug-induced liver injury"
  ],
  "whoNeedsIt": [
    "Patients with suspected liver disease",
    "Patients with chest pain",
    "Patients on hepatotoxic medications"
  ],
  "symptoms": [
    "Abdominal pain",
    "Jaundice",
    "Nausea",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Hepatitis",
    "Cirrhosis",
    "Myocardial infarction",
    "Muscle injury"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid strenuous exercise before testing"
  ],
  "procedure": "Blood drawn and SGOT measured spectrophotometrically.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "5-40 U/L",
  "highResults": "Indicates liver damage, heart attack, muscle injury, or pancreatitis.",
  "lowResults": "Generally not clinically significant.",
  "interpretation": "Less specific to liver than SGPT. AST/ALT >2 suggests alcoholic liver disease.",
  "relatedTests": [
    "sgpt",
    "liver-function-test",
    "alkaline-phosphatase",
    "troponin-i"
  ],
  "relatedDiseases": [
    "Hepatitis",
    "Cirrhosis",
    "Myocardial infarction",
    "Muscle injury"
  ],
  "relatedPackages": [
    "liver-panel",
    "cardiac-marker-panel"
  ],
  "faqs": [
    {
      "question": "Can exercise raise SGOT?",
      "answer": "Yes, avoid vigorous exercise 24 hours before."
    },
    {
      "question": "What is the difference from SGPT?",
      "answer": "SGOT is found in liver, heart, muscles, kidneys. SGPT is more liver-specific."
    },
    {
      "question": "What does AST/ALT ratio indicate?",
      "answer": ">2 suggests alcoholic liver disease. <1 suggests viral hepatitis."
    },
    {
      "question": "How high can SGOT go?",
      "answer": "In acute viral hepatitis, can rise to 1000+ U/L."
    },
    {
      "question": "Is SGOT the same as AST?",
      "answer": "Yes, they refer to the same enzyme."
    }
  ],
  "references": [
    "LabTestsOnline - AST: https://labtestsonline.org/tests/aspartate-aminotransferase-ast"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "SGOT",
    "AST",
    "liver enzyme",
    "liver damage"
  ]
},
{
  "slug": "sgpt",
  "name": "SGPT (ALT)",
  "shortName": "SGPT",
  "category": "Clinical Chemistry",
  "subcategory": "Liver & Biliary",
  "description": "SGPT (ALT) is an enzyme primarily found in the liver. Most specific blood test for liver cell damage.",
  "purpose": "To detect liver cell damage and monitor liver disease.",
  "whyDone": [
    "To diagnose liver disease",
    "To monitor chronic hepatitis treatment",
    "To detect drug-induced liver injury"
  ],
  "whoNeedsIt": [
    "Patients with suspected liver disease",
    "Patients on hepatotoxic medications"
  ],
  "symptoms": [
    "Abdominal pain",
    "Jaundice",
    "Dark urine",
    "Nausea",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Viral hepatitis",
    "NAFLD",
    "Alcoholic liver disease",
    "Drug-induced liver injury",
    "Cirrhosis"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid alcohol for 24 hours"
  ],
  "procedure": "Blood drawn and SGPT measured spectrophotometrically.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "5-35 U/L",
  "highResults": "Most sensitive indicator of liver cell damage. Levels >1000 suggest acute hepatitis or drug toxicity.",
  "lowResults": "Generally not clinically significant.",
  "interpretation": "Most specific marker of liver cell injury. Persistent elevation warrants investigation.",
  "relatedTests": [
    "sgot",
    "liver-function-test",
    "alkaline-phosphatase",
    "bilirubin",
    "ggt"
  ],
  "relatedDiseases": [
    "Hepatitis",
    "NAFLD",
    "Cirrhosis",
    "Drug-induced liver injury"
  ],
  "relatedPackages": [
    "liver-panel",
    "complete-health-checkup"
  ],
  "faqs": [
    {
      "question": "How high can SGPT be?",
      "answer": "In acute viral hepatitis, can exceed 1000 U/L."
    },
    {
      "question": "What does mildly elevated SGPT mean?",
      "answer": "Can indicate NAFLD, early hepatitis, alcohol use, or medication effects."
    },
    {
      "question": "Is SGPT the same as ALT?",
      "answer": "Yes, they refer to the same enzyme."
    },
    {
      "question": "Can fatty liver cause high SGPT?",
      "answer": "Yes, NAFLD is a common cause of mildly elevated SGPT."
    },
    {
      "question": "How quickly does it normalize?",
      "answer": "After resolving the cause, typically within 2-4 weeks."
    }
  ],
  "references": [
    "LabTestsOnline - ALT: https://labtestsonline.org/tests/alanine-aminotransferase-alt"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "SGPT",
    "ALT",
    "liver enzyme",
    "hepatitis",
    "NAFLD"
  ]
},
{
  "slug": "alkaline-phosphatase",
  "name": "Alkaline Phosphatase (ALP)",
  "shortName": "ALP",
  "category": "Clinical Chemistry",
  "subcategory": "Liver & Biliary",
  "description": "Enzyme found in liver, bones, intestines, and kidneys. Elevated levels may indicate liver disease, bile duct obstruction, or bone disorders.",
  "purpose": "To detect liver/bile duct disorders and bone disease.",
  "whyDone": [
    "To evaluate liver or bile duct obstruction",
    "To detect bone disorders",
    "As part of LFT panel",
    "To evaluate Paget's disease"
  ],
  "whoNeedsIt": [
    "Patients with jaundice",
    "Suspected gallstones",
    "Suspected bone disease",
    "Children and adolescents"
  ],
  "symptoms": [
    "Jaundice",
    "Abdominal pain",
    "Bone pain",
    "Itching"
  ],
  "conditionsDetected": [
    "Bile duct obstruction",
    "Gallstones",
    "Hepatitis",
    "Paget's disease",
    "Osteomalacia",
    "Bone metastases"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn and ALP measured using kinetic enzymatic methods.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "44-147 U/L (adults; children and pregnant women higher)",
  "highResults": "Elevated in bile duct obstruction, liver disease, bone disease, or normal growth in children.",
  "lowResults": "May indicate zinc deficiency, hypothyroidism, or malnutrition.",
  "interpretation": "ALP elevation with elevated GGT suggests liver source. Isolated ALP elevation suggests bone.",
  "relatedTests": [
    "ggt",
    "liver-function-test",
    "bilirubin",
    "sgot",
    "sgpt"
  ],
  "relatedDiseases": [
    "Gallstones",
    "Bile duct obstruction",
    "Paget's disease",
    "Osteomalacia"
  ],
  "relatedPackages": [
    "liver-panel",
    "bone-profile"
  ],
  "faqs": [
    {
      "question": "Why is ALP elevated in children?",
      "answer": "Produced by bone-forming cells during growth. This is normal."
    },
    {
      "question": "Does elevated ALP mean liver disease?",
      "answer": "Not always. Bone disease, pregnancy, and growth also elevate ALP. GGT helps differentiate."
    },
    {
      "question": "What is ALP-GGT relationship?",
      "answer": "If both elevated, source is likely liver. If ALP high but GGT normal, source is bone."
    },
    {
      "question": "Is fasting required?",
      "answer": "Recommended as ALP can rise after meals from intestinal ALP."
    },
    {
      "question": "What does very high ALP indicate?",
      "answer": "Severe bile duct obstruction, Paget's disease, or bone metastases."
    }
  ],
  "references": [
    "LabTestsOnline - ALP: https://labtestsonline.org/tests/alkaline-phosphatase"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "ALP",
    "alkaline phosphatase",
    "liver",
    "bone",
    "bile duct"
  ]
},
{
  "slug": "bilirubin",
  "name": "Bilirubin Test (Total & Direct)",
  "shortName": "Bilirubin",
  "category": "Clinical Chemistry",
  "subcategory": "Liver & Biliary",
  "description": "Yellow pigment from RBC breakdown processed by the liver. Measures total and direct bilirubin to evaluate jaundice.",
  "purpose": "To evaluate jaundice, liver function, and bile duct obstruction.",
  "whyDone": [
    "To diagnose jaundice cause",
    "To evaluate liver disease",
    "To detect bile duct obstruction",
    "To monitor neonatal jaundice"
  ],
  "whoNeedsIt": [
    "Patients with jaundice",
    "Patients with liver disease",
    "Newborns with jaundice",
    "Patients with hemolytic anemia"
  ],
  "symptoms": [
    "Yellowing of skin and eyes",
    "Dark urine",
    "Pale stools",
    "Itching",
    "Abdominal pain"
  ],
  "conditionsDetected": [
    "Hepatitis",
    "Cirrhosis",
    "Gallstones",
    "Hemolytic anemia",
    "Bile duct obstruction",
    "Gilbert's syndrome"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended",
    "Avoid certain medications"
  ],
  "procedure": "Blood drawn and bilirubin measured using spectrophotometry.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Total: 0.1-1.2 mg/dL, Direct: 0.0-0.3 mg/dL, Indirect: 0.2-0.8 mg/dL",
  "highResults": "Elevated total causes jaundice. High direct suggests liver/obstructive disease. High indirect suggests hemolysis.",
  "lowResults": "Generally not clinically significant.",
  "interpretation": "Pattern differentiates hemolytic (indirect), liver disease (both), and obstructive (direct) causes.",
  "relatedTests": [
    "liver-function-test",
    "sgot",
    "sgpt",
    "alkaline-phosphatase",
    "cbc"
  ],
  "relatedDiseases": [
    "Jaundice",
    "Hepatitis",
    "Cirrhosis",
    "Gallstones",
    "Hemolytic anemia"
  ],
  "relatedPackages": [
    "liver-panel",
    "jaundice-panel"
  ],
  "faqs": [
    {
      "question": "What is Gilbert's syndrome?",
      "answer": "A common benign condition with reduced liver bilirubin processing, causing mild intermittent jaundice."
    },
    {
      "question": "What causes dark urine?",
      "answer": "Conjugated bilirubin is water-soluble and excreted in urine."
    },
    {
      "question": "Can dehydration affect it?",
      "answer": "Yes, dehydration can concentrate blood and elevate bilirubin."
    },
    {
      "question": "What is neonatal jaundice?",
      "answer": "Common in newborns due to immature liver. Most resolve; severe cases need phototherapy."
    },
    {
      "question": "When is urgent evaluation needed?",
      "answer": "In newborns with severe jaundice (>20 mg/dL) or adults with rapidly rising bilirubin."
    }
  ],
  "references": [
    "LabTestsOnline - Bilirubin: https://labtestsonline.org/tests/bilirubin"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "bilirubin",
    "jaundice",
    "liver",
    "bile"
  ]
},
{
  "slug": "kidney-function-test",
  "name": "Kidney Function Test (KFT/RFT)",
  "shortName": "KFT",
  "category": "Clinical Chemistry",
  "subcategory": "Kidney",
  "description": "Blood and urine tests evaluating kidney function, measuring creatinine, BUN, electrolytes, and other markers.",
  "purpose": "To evaluate kidney function and detect kidney disease.",
  "whyDone": [
    "To screen for kidney disease",
    "To monitor chronic kidney disease",
    "To evaluate dehydration",
    "To assess kidney function before medications"
  ],
  "whoNeedsIt": [
    "Patients with hypertension or diabetes",
    "Patients with suspected kidney disease",
    "Patients on nephrotoxic medications",
    "Elderly individuals"
  ],
  "symptoms": [
    "Swelling (edema)",
    "Fatigue",
    "Changes in urination",
    "Nausea",
    "Shortness of breath",
    "Itching"
  ],
  "conditionsDetected": [
    "Chronic kidney disease",
    "Acute kidney injury",
    "Kidney stones",
    "Electrolyte imbalances"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Stay well hydrated",
    "Avoid heavy protein meals"
  ],
  "procedure": "Blood drawn from a vein, and urine may also be collected. Multiple kidney markers measured.",
  "sampleType": "Serum + Urine",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Creatinine: 0.7-1.3 (M)/0.6-1.1 (F) mg/dL, BUN: 7-20 mg/dL, eGFR: >90 mL/min/1.73m2",
  "highResults": "Elevated creatinine and BUN with reduced eGFR indicate impaired kidney function.",
  "lowResults": "Low BUN may indicate liver disease or malnutrition.",
  "interpretation": "eGFR is the best overall kidney function indicator. CKD staged based on eGFR.",
  "relatedTests": [
    "creatinine",
    "bun",
    "uric-acid",
    "electrolytes",
    "urine-routine"
  ],
  "relatedDiseases": [
    "Chronic kidney disease",
    "Acute kidney injury",
    "Kidney stones",
    "Diabetic nephropathy"
  ],
  "relatedPackages": [
    "kidney-panel",
    "complete-health-checkup",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "What is eGFR?",
      "answer": "Estimated Glomerular Filtration Rate estimating kidney filtration. Normal >90 mL/min."
    },
    {
      "question": "What creatinine level indicates failure?",
      "answer": ">4.0 mg/dL with low eGFR may indicate severe CKD (stage 4-5)."
    },
    {
      "question": "How often should it be checked?",
      "answer": "Annually for healthy. Every 3-6 months for diabetes, hypertension, or CKD."
    },
    {
      "question": "Can dehydration affect results?",
      "answer": "Yes, dehydration can elevate creatinine and BUN."
    },
    {
      "question": "Is KFT the same as RFT?",
      "answer": "Yes, both refer to the same group of tests."
    }
  ],
  "references": [
    "KDIGO - Clinical Practice Guidelines: https://kdigo.org/guidelines/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "kidney",
    "KFT",
    "RFT",
    "creatinine",
    "eGFR",
    "renal"
  ]
},
{
  "slug": "creatinine",
  "name": "Serum Creatinine",
  "shortName": "Creatinine",
  "category": "Clinical Chemistry",
  "subcategory": "Kidney",
  "description": "Waste product from muscle metabolism filtered by kidneys. Levels reflect kidney function.",
  "purpose": "To assess kidney function and screen for kidney disease.",
  "whyDone": [
    "To evaluate kidney function",
    "To monitor chronic kidney disease",
    "To assess medication dose adjustments",
    "To screen for acute kidney injury"
  ],
  "whoNeedsIt": [
    "Patients with suspected kidney disease",
    "Patients on nephrotoxic medications",
    "Patients with hypertension or diabetes"
  ],
  "symptoms": [
    "Usually no symptoms until advanced disease",
    "Fatigue",
    "Swelling",
    "Changes in urination"
  ],
  "conditionsDetected": [
    "Chronic kidney disease",
    "Acute kidney injury",
    "Kidney obstruction"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended",
    "Avoid heavy meat meals and creatine supplements"
  ],
  "procedure": "Blood drawn and creatinine measured using Jaffe reaction or enzymatic methods.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 hours",
  "normalRange": "Males: 0.7-1.3 mg/dL, Females: 0.6-1.1 mg/dL",
  "highResults": "Indicates reduced kidney function. Acute increases suggest acute kidney injury.",
  "lowResults": "May indicate reduced muscle mass, malnutrition, or liver disease.",
  "interpretation": "More specific than BUN for kidney function. eGFR calculated from creatinine.",
  "relatedTests": [
    "bun",
    "kidney-function-test",
    "uric-acid",
    "electrolytes"
  ],
  "relatedDiseases": [
    "Chronic kidney disease",
    "Acute kidney injury",
    "Diabetic nephropathy"
  ],
  "relatedPackages": [
    "kidney-panel",
    "complete-health-checkup"
  ],
  "faqs": [
    {
      "question": "What does high creatinine mean?",
      "answer": "Kidneys not filtering properly. May indicate CKD, AKI, or dehydration."
    },
    {
      "question": "Does muscle mass affect it?",
      "answer": "Yes, bodybuilders may have higher levels. Elderly may have lower."
    },
    {
      "question": "Can diet affect it?",
      "answer": "High protein and creatine supplements can temporarily raise levels."
    },
    {
      "question": "What is the relationship to eGFR?",
      "answer": "As creatinine rises, eGFR falls."
    },
    {
      "question": "How much rise is concerning?",
      "answer": "0.3 mg/dL rise within 48 hours or 1.5x baseline within a week may indicate AKI."
    }
  ],
  "references": [
    "LabTestsOnline - Creatinine: https://labtestsonline.org/tests/creatinine"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "creatinine",
    "kidney",
    "renal",
    "eGFR"
  ]
},
{
  "slug": "bun",
  "name": "Blood Urea Nitrogen (BUN)",
  "shortName": "BUN",
  "category": "Clinical Chemistry",
  "subcategory": "Kidney",
  "description": "Measures nitrogen from urea, a waste product produced in the liver and filtered by kidneys.",
  "purpose": "To assess kidney function and evaluate hydration status.",
  "whyDone": [
    "To evaluate kidney function",
    "To assess hydration",
    "To monitor dialysis",
    "As part of metabolic panel"
  ],
  "whoNeedsIt": [
    "Patients with suspected kidney disease",
    "Patients on dialysis",
    "Patients with dehydration",
    "Patients with liver disease"
  ],
  "symptoms": [
    "Usually no symptoms",
    "Nausea",
    "Fatigue",
    "Confusion in severe cases"
  ],
  "conditionsDetected": [
    "Kidney disease",
    "Dehydration",
    "GI bleeding",
    "Heart failure"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended",
    "High protein meal can temporarily elevate BUN"
  ],
  "procedure": "Blood drawn and BUN measured using enzymatic methods.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 hours",
  "normalRange": "7-20 mg/dL",
  "highResults": "May indicate kidney disease, dehydration, high protein diet, GI bleeding, or heart failure.",
  "lowResults": "May indicate liver disease, malnutrition, overhydration, or pregnancy.",
  "interpretation": "Interpret alongside creatinine. BUN/Creatinine ratio (10:1-20:1) helps differentiate causes.",
  "relatedTests": [
    "creatinine",
    "kidney-function-test",
    "electrolytes"
  ],
  "relatedDiseases": [
    "Chronic kidney disease",
    "Dehydration",
    "GI bleeding",
    "Heart failure"
  ],
  "relatedPackages": [
    "kidney-panel",
    "metabolic-panel"
  ],
  "faqs": [
    {
      "question": "What is normal BUN?",
      "answer": "7-20 mg/dL."
    },
    {
      "question": "What does the BUN/Creatinine ratio indicate?",
      "answer": "High ratio (>20:1) suggests dehydration or GI bleeding. Low (<10:1) suggests liver disease."
    },
    {
      "question": "Can high protein diet affect BUN?",
      "answer": "Yes, high protein increases urea production."
    },
    {
      "question": "Is BUN the same as urea?",
      "answer": "BUN measures nitrogen portion. Blood urea = BUN x 2.14."
    },
    {
      "question": "Does BUN increase with age?",
      "answer": "Yes, due to reduced kidney function."
    }
  ],
  "references": [
    "MedlinePlus - BUN: https://medlineplus.gov/ency/article/003462.htm"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "BUN",
    "blood urea nitrogen",
    "kidney",
    "urea"
  ]
},
{
  "slug": "uric-acid",
  "name": "Serum Uric Acid",
  "shortName": "Uric Acid",
  "category": "Clinical Chemistry",
  "subcategory": "Kidney",
  "description": "Waste product from purine breakdown, normally filtered by kidneys. Elevated levels cause gout and kidney stones.",
  "purpose": "To diagnose gout, monitor kidney function, and assess purine metabolism disorders.",
  "whyDone": [
    "To diagnose gout",
    "To monitor during chemotherapy",
    "To evaluate kidney stones",
    "To assess cardiovascular risk"
  ],
  "whoNeedsIt": [
    "Patients with joint pain (suspected gout)",
    "Patients undergoing chemotherapy",
    "Patients with recurrent kidney stones",
    "Patients with metabolic syndrome"
  ],
  "symptoms": [
    "Severe joint pain (big toe)",
    "Joint swelling and redness",
    "Kidney stones",
    "Abdominal pain"
  ],
  "conditionsDetected": [
    "Gout",
    "Uric acid kidney stones",
    "Tumor lysis syndrome",
    "Chronic kidney disease",
    "Metabolic syndrome"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid purine-rich foods 24 hours",
    "Avoid alcohol 48 hours"
  ],
  "procedure": "Blood drawn after fasting. Measured using enzymatic (uricase) methods.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Males: 3.4-7.0 mg/dL, Females: 2.4-6.0 mg/dL",
  "highResults": "Hyperuricemia can lead to gout, kidney stones, and kidney damage.",
  "lowResults": "May indicate Fanconi syndrome, liver disease, or SIADH.",
  "interpretation": "Not all with hyperuricemia develop gout. Treatment initiated with symptoms or complications.",
  "relatedTests": [
    "kidney-function-test",
    "creatinine",
    "lipid-profile"
  ],
  "relatedDiseases": [
    "Gout",
    "Kidney stones",
    "Metabolic syndrome",
    "Chronic kidney disease"
  ],
  "relatedPackages": [
    "kidney-panel",
    "metabolic-panel"
  ],
  "faqs": [
    {
      "question": "What level causes gout?",
      "answer": ">6.8 mg/dL, the saturation point where urate crystals form."
    },
    {
      "question": "Can diet affect uric acid?",
      "answer": "Yes, purine-rich foods (red meat, shellfish, beer) can raise levels."
    },
    {
      "question": "Does it affect kidneys?",
      "answer": "High uric acid can cause kidney stones and urate nephropathy."
    },
    {
      "question": "What medications raise it?",
      "answer": "Thiazide diuretics, low-dose aspirin, cyclosporine, some chemotherapy drugs."
    },
    {
      "question": "How to lower naturally?",
      "answer": "Drink water, limit alcohol/purine foods, maintain healthy weight."
    }
  ],
  "references": [
    "MedlinePlus - Uric Acid: https://medlineplus.gov/ency/article/003674.htm"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "uric acid",
    "gout",
    "kidney stones",
    "purines"
  ]
},
{
  "slug": "electrolytes",
  "name": "Serum Electrolytes",
  "shortName": "Electrolytes",
  "category": "Clinical Chemistry",
  "subcategory": "Electrolytes",
  "description": "Measures sodium, potassium, chloride, and bicarbonate levels essential for nerve function, muscle contraction, and fluid balance.",
  "purpose": "To evaluate fluid balance, kidney function, and electrolyte imbalances.",
  "whyDone": [
    "To diagnose electrolyte imbalances",
    "To monitor kidney function",
    "To evaluate dehydration",
    "To monitor patients on diuretics or IV fluids"
  ],
  "whoNeedsIt": [
    "Patients with kidney disease",
    "Patients on diuretics",
    "Patients with vomiting/diarrhea",
    "Hospitalized patients",
    "Patients with heart conditions"
  ],
  "symptoms": [
    "Muscle cramps",
    "Weakness",
    "Irregular heartbeat",
    "Nausea",
    "Confusion",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Hyponatremia",
    "Hypernatremia",
    "Hypokalemia",
    "Hyperkalemia",
    "Metabolic acidosis",
    "Metabolic alkalosis"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended",
    "Avoid excessive fluid intake"
  ],
  "procedure": "Blood drawn and electrolytes measured using ion-selective electrode methods.",
  "sampleType": "Serum",
  "turnaroundTime": "1-2 hours",
  "normalRange": "Sodium: 136-145 mEq/L, Potassium: 3.5-5.0 mEq/L, Chloride: 98-107 mEq/L, Bicarbonate: 22-29 mEq/L",
  "highResults": "Hyperkalemia can cause fatal cardiac arrhythmias. Hypernatremia causes thirst and confusion.",
  "lowResults": "Hyponatremia can cause seizures. Hypokalemia causes muscle weakness and arrhythmias.",
  "interpretation": "Electrolyte imbalances can be life-threatening, especially potassium disturbances.",
  "relatedTests": [
    "sodium",
    "potassium",
    "chloride",
    "calcium",
    "kidney-function-test"
  ],
  "relatedDiseases": [
    "Kidney disease",
    "Heart failure",
    "Addison's disease",
    "Diabetic ketoacidosis"
  ],
  "relatedPackages": [
    "metabolic-panel",
    "kidney-panel"
  ],
  "faqs": [
    {
      "question": "What happens if potassium is too high?",
      "answer": "Can cause dangerous heart rhythm changes and cardiac arrest."
    },
    {
      "question": "Can dehydration cause imbalance?",
      "answer": "Yes, severe dehydration can cause life-threatening disturbances."
    },
    {
      "question": "What foods are high in potassium?",
      "answer": "Bananas, oranges, potatoes, spinach, tomatoes."
    },
    {
      "question": "How do diuretics affect electrolytes?",
      "answer": "Loop diuretics can cause low potassium. Potassium-sparing diuretics can raise it."
    },
    {
      "question": "Is fasting required?",
      "answer": "Fasting for 8-12 hours is recommended."
    }
  ],
  "references": [
    "LabTestsOnline - Electrolyte Panel: https://labtestsonline.org/tests/electrolyte-panel"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "electrolytes",
    "sodium",
    "potassium",
    "chloride",
    "fluid balance"
  ]
},
{
  "slug": "sodium",
  "name": "Serum Sodium",
  "shortName": "Na+",
  "category": "Clinical Chemistry",
  "subcategory": "Electrolytes",
  "description": "Primary extracellular electrolyte critical for fluid balance, nerve function, and muscle contraction.",
  "purpose": "To evaluate sodium levels and detect hyponatremia or hypernatremia.",
  "whyDone": [
    "To diagnose sodium imbalances",
    "To monitor heart failure or kidney disease patients",
    "To evaluate dehydration"
  ],
  "whoNeedsIt": [
    "Hospitalized patients",
    "Patients on diuretics",
    "Patients with CKD or heart failure",
    "Elderly patients"
  ],
  "symptoms": [
    "Confusion",
    "Headache",
    "Nausea",
    "Muscle cramps",
    "Seizures (severe hyponatremia)"
  ],
  "conditionsDetected": [
    "Hyponatremia",
    "Hypernatremia",
    "SIADH",
    "Diabetes insipidus",
    "Dehydration"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn and sodium measured using ion-selective electrode methods.",
  "sampleType": "Serum",
  "turnaroundTime": "1-2 hours",
  "normalRange": "136-145 mEq/L",
  "highResults": "Hypernatremia (>145) indicates dehydration or diabetes insipidus.",
  "lowResults": "Hyponatremia (<136) is the most common electrolyte abnormality. Severe cases cause cerebral edema.",
  "interpretation": "Sodium imbalances should be corrected gradually to avoid osmotic demyelination syndrome.",
  "relatedTests": [
    "electrolytes",
    "potassium",
    "chloride",
    "kidney-function-test"
  ],
  "relatedDiseases": [
    "SIADH",
    "Diabetes insipidus",
    "Heart failure",
    "Liver cirrhosis"
  ],
  "relatedPackages": [
    "electrolyte-panel",
    "metabolic-panel"
  ],
  "faqs": [
    {
      "question": "What causes low sodium?",
      "answer": "SIADH, heart failure, liver cirrhosis, kidney disease, excessive water intake."
    },
    {
      "question": "What causes high sodium?",
      "answer": "Dehydration, diabetes insipidus, excessive salt intake."
    },
    {
      "question": "Can too much water lower sodium?",
      "answer": "Yes, water intoxication can cause dangerous hyponatremia."
    },
    {
      "question": "How is hyponatremia treated?",
      "answer": "Depends on cause: fluid restriction, salt tablets, or IV saline."
    },
    {
      "question": "Is sodium affected by eating?",
      "answer": "Relatively stable after meals, but very salty meals can cause transient changes."
    }
  ],
  "references": [
    "NCBI - Hyponatremia: https://www.ncbi.nlm.nih.gov/books/NBK463/"
  ],
  "price": 100,
  "homeCollection": true,
  "tags": [
    "sodium",
    "Na+",
    "electrolyte",
    "hyponatremia"
  ]
},
{
  "slug": "potassium",
  "name": "Serum Potassium",
  "shortName": "K+",
  "category": "Clinical Chemistry",
  "subcategory": "Electrolytes",
  "description": "Critical for heart rhythm, nerve function, and muscle contraction. Even small changes can be life-threatening.",
  "purpose": "To detect potassium imbalances affecting heart rhythm and muscle function.",
  "whyDone": [
    "To diagnose hypo/hyperkalemia",
    "To monitor patients on ACE inhibitors or diuretics",
    "To evaluate kidney disease",
    "To monitor cardiac patients"
  ],
  "whoNeedsIt": [
    "Patients on potassium-affecting medications",
    "Patients with kidney disease",
    "Cardiac patients",
    "Patients with metabolic acidosis"
  ],
  "symptoms": [
    "Muscle weakness",
    "Irregular heartbeat",
    "Numbness/tingling",
    "Fatigue",
    "Paralysis (severe)"
  ],
  "conditionsDetected": [
    "Hypokalemia",
    "Hyperkalemia",
    "Kidney failure",
    "Addison's disease",
    "Diabetic ketoacidosis"
  ],
  "preparation": [
    "Fasting for 8-12 hours",
    "Avoid strenuous exercise",
    "Avoid prolonged tourniquet"
  ],
  "procedure": "Blood drawn carefully to avoid hemolysis. Measured using ion-selective electrode methods.",
  "sampleType": "Serum",
  "turnaroundTime": "1-2 hours",
  "normalRange": "3.5-5.0 mEq/L",
  "highResults": "Hyperkalemia (>5.0) can cause fatal cardiac arrhythmias. Medical emergency.",
  "lowResults": "Hypokalemia (<3.5) can cause muscle weakness, cramps, and cardiac arrhythmias.",
  "interpretation": "Potassium imbalances require prompt evaluation and treatment.",
  "relatedTests": [
    "electrolytes",
    "sodium",
    "chloride",
    "kidney-function-test"
  ],
  "relatedDiseases": [
    "Kidney failure",
    "Addison's disease",
    "Diabetic ketoacidosis",
    "Heart arrhythmias"
  ],
  "relatedPackages": [
    "electrolyte-panel",
    "cardiac-panel"
  ],
  "faqs": [
    {
      "question": "What causes high potassium?",
      "answer": "Kidney failure, ACE inhibitors, potassium-sparing diuretics, tissue damage, acidosis."
    },
    {
      "question": "What causes low potassium?",
      "answer": "Vomiting, diarrhea, diuretics, hyperaldosteronism, malnutrition."
    },
    {
      "question": "Why is careful blood draw needed?",
      "answer": "Hemolysis (RBC breakdown) during collection can falsely elevate potassium."
    },
    {
      "question": "What foods are high in potassium?",
      "answer": "Bananas, oranges, potatoes, tomatoes, spinach, avocados."
    },
    {
      "question": "Can potassium levels change quickly?",
      "answer": "Yes, potassium can change rapidly and requires prompt evaluation if abnormal."
    }
  ],
  "references": [
    "MedlinePlus - Potassium: https://medlineplus.gov/ency/article/000508.htm"
  ],
  "price": 100,
  "homeCollection": true,
  "tags": [
    "potassium",
    "K+",
    "electrolyte",
    "heart rhythm"
  ]
},
{
  "slug": "chloride",
  "name": "Serum Chloride",
  "shortName": "Cl-",
  "category": "Clinical Chemistry",
  "subcategory": "Electrolytes",
  "description": "Chloride is a major electrolyte that helps maintain fluid balance, blood volume, and acid-base balance.",
  "purpose": "To evaluate chloride levels and acid-base balance.",
  "whyDone": [
    "To diagnose chloride imbalances",
    "To evaluate acid-base disorders",
    "As part of electrolyte panel"
  ],
  "whoNeedsIt": [
    "Patients with kidney disease",
    "Patients with vomiting or diarrhea",
    "Patients with acid-base disorders",
    "Hospitalized patients"
  ],
  "symptoms": [
    "Weakness",
    "Irregular heartbeat",
    "Difficulty breathing",
    "Excessive thirst"
  ],
  "conditionsDetected": [
    "Hyperchloremia",
    "Hypochloremia",
    "Metabolic acidosis",
    "Kidney disease"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn and chloride measured using ion-selective electrode methods.",
  "sampleType": "Serum",
  "turnaroundTime": "1-2 hours",
  "normalRange": "98-107 mEq/L",
  "highResults": "Hyperchloremia may indicate dehydration, kidney disease, or metabolic acidosis.",
  "lowResults": "Hypochloremia may indicate vomiting, metabolic alkalosis, or SIADH.",
  "interpretation": "Chloride is typically interpreted alongside sodium and bicarbonate for acid-base assessment.",
  "relatedTests": [
    "electrolytes",
    "sodium",
    "potassium",
    "bicarbonate"
  ],
  "relatedDiseases": [
    "Kidney disease",
    "Metabolic acidosis",
    "Metabolic alkalosis",
    "Dehydration"
  ],
  "relatedPackages": [
    "electrolyte-panel",
    "metabolic-panel"
  ],
  "faqs": [
    {
      "question": "What does high chloride mean?",
      "answer": "May indicate dehydration, kidney disease, or metabolic acidosis."
    },
    {
      "question": "What does low chloride mean?",
      "answer": "May indicate vomiting, metabolic alkalosis, or SIADH."
    },
    {
      "question": "What is the relationship with sodium?",
      "answer": "Chloride typically follows sodium. Low chloride with low sodium is common in hyponatremia."
    },
    {
      "question": "Is chloride important for acid-base balance?",
      "answer": "Yes, chloride works with bicarbonate to maintain acid-base balance (chloride shift)."
    },
    {
      "question": "Is fasting required?",
      "answer": "Fasting for 8-12 hours is recommended."
    }
  ],
  "references": [
    "LabTestsOnline - Chloride: https://labtestsonline.org/tests/chloride"
  ],
  "price": 100,
  "homeCollection": true,
  "tags": [
    "chloride",
    "Cl-",
    "electrolyte",
    "acid-base"
  ]
},
{
  "slug": "calcium",
  "name": "Serum Calcium",
  "shortName": "Ca2+",
  "category": "Clinical Chemistry",
  "subcategory": "Electrolytes",
  "description": "Calcium is essential for bone health, muscle contraction, nerve signaling, and blood clotting.",
  "purpose": "To evaluate calcium levels and detect bone, kidney, or parathyroid disorders.",
  "whyDone": [
    "To evaluate bone health",
    "To diagnose hypercalcemia or hypocalcemia",
    "To monitor parathyroid function",
    "To screen for certain cancers"
  ],
  "whoNeedsIt": [
    "Patients with bone pain or osteoporosis",
    "Patients with kidney stones",
    "Patients with parathyroid disorders",
    "Patients with certain cancers"
  ],
  "symptoms": [
    "Bone pain",
    "Muscle weakness",
    "Confusion",
    "Nausea",
    "Kidney stones"
  ],
  "conditionsDetected": [
    "Hypercalcemia",
    "Hypocalcemia",
    "Hyperparathyroidism",
    "Bone metastases",
    "Vitamin D deficiency"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn and calcium measured using colorimetric or atomic absorption methods.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 hours",
  "normalRange": "Total Calcium: 8.5-10.5 mg/dL, Ionized Calcium: 4.5-5.5 mg/dL",
  "highResults": "Hypercalcemia may indicate hyperparathyroidism, malignancy, vitamin D excess, or bone metastases.",
  "lowResults": "Hypocalcemia may indicate hypoparathyroidism, vitamin D deficiency, or chronic kidney disease.",
  "interpretation": "Total calcium should be interpreted with albumin levels. Ionized calcium is more accurate in hypoalbuminemia.",
  "relatedTests": [
    "phosphorus",
    "magnesium",
    "parathyroid-hormone",
    "vitamin-d",
    "albumin"
  ],
  "relatedDiseases": [
    "Hyperparathyroidism",
    "Bone metastases",
    "Osteoporosis",
    "Chronic kidney disease"
  ],
  "relatedPackages": [
    "bone-profile",
    "metabolic-panel"
  ],
  "faqs": [
    {
      "question": "What does high calcium mean?",
      "answer": "May indicate hyperparathyroidism, malignancy, vitamin D excess, or bone metastases."
    },
    {
      "question": "What does low calcium mean?",
      "answer": "May indicate hypoparathyroidism, vitamin D deficiency, or chronic kidney disease."
    },
    {
      "question": "Why is albumin important?",
      "answer": "Calcium binds to albumin. Low albumin can falsely lower total calcium. Ionized calcium is more accurate."
    },
    {
      "question": "Can high calcium cause kidney stones?",
      "answer": "Yes, hypercalcemia increases the risk of calcium oxalate kidney stones."
    },
    {
      "question": "What foods are high in calcium?",
      "answer": "Dairy products, leafy greens, fortified foods, and sardines."
    }
  ],
  "references": [
    "LabTestsOnline - Calcium: https://labtestsonline.org/tests/calcium"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "calcium",
    "Ca2+",
    "bone health",
    "parathyroid",
    "electrolyte"
  ]
},
{
  "slug": "phosphorus",
  "name": "Serum Phosphorus",
  "shortName": "Phosphorus",
  "category": "Clinical Chemistry",
  "subcategory": "Electrolytes",
  "description": "Phosphorus is essential for bone health, energy production, and acid-base balance. Works closely with calcium.",
  "purpose": "To evaluate phosphorus levels and bone/kidney function.",
  "whyDone": [
    "To evaluate bone metabolism",
    "To monitor kidney disease",
    "To assess parathyroid function"
  ],
  "whoNeedsIt": [
    "Patients with kidney disease",
    "Patients with bone disorders",
    "Patients with parathyroid disease"
  ],
  "symptoms": [
    "Muscle weakness",
    "Bone pain",
    "Confusion",
    "Loss of appetite"
  ],
  "conditionsDetected": [
    "Hyperphosphatemia",
    "Hypophosphatemia",
    "Chronic kidney disease",
    "Parathyroid disorders"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn and phosphorus measured using colorimetric methods.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 hours",
  "normalRange": "2.5-4.5 mg/dL",
  "highResults": "Hyperphosphatemia may indicate kidney failure, hypoparathyroidism, or excessive vitamin D.",
  "lowResults": "Hypophosphatemia may indicate hyperparathyroidism, vitamin D deficiency, or malnutrition.",
  "interpretation": "Phosphorus and calcium are inversely related through PTH and vitamin D regulation.",
  "relatedTests": [
    "calcium",
    "parathyroid-hormone",
    "vitamin-d",
    "kidney-function-test"
  ],
  "relatedDiseases": [
    "Chronic kidney disease",
    "Hyperparathyroidism",
    "Osteomalacia"
  ],
  "relatedPackages": [
    "bone-profile",
    "kidney-panel"
  ],
  "faqs": [
    {
      "question": "What does high phosphorus mean?",
      "answer": "May indicate kidney failure, hypoparathyroidism, or excessive vitamin D."
    },
    {
      "question": "What does low phosphorus mean?",
      "answer": "May indicate hyperparathyroidism, vitamin D deficiency, or malnutrition."
    },
    {
      "question": "How is phosphorus related to calcium?",
      "answer": "They are inversely related. High phosphorus can lower calcium and vice versa."
    },
    {
      "question": "Does kidney disease affect phosphorus?",
      "answer": "Yes, failing kidneys cannot excrete phosphorus adequately, leading to hyperphosphatemia."
    },
    {
      "question": "What foods are high in phosphorus?",
      "answer": "Dairy, meat, fish, nuts, beans, and processed foods with phosphate additives."
    }
  ],
  "references": [
    "LabTestsOnline - Phosphorus: https://labtestsonline.org/tests/phosphorus"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "phosphorus",
    "bone health",
    "kidney",
    "electrolyte"
  ]
},
{
  "slug": "magnesium",
  "name": "Serum Magnesium",
  "shortName": "Mg2+",
  "category": "Clinical Chemistry",
  "subcategory": "Electrolytes",
  "description": "Magnesium is essential for muscle and nerve function, blood sugar control, blood pressure regulation, and bone health.",
  "purpose": "To evaluate magnesium levels and detect imbalances.",
  "whyDone": [
    "To diagnose magnesium deficiency",
    "To monitor patients on magnesium-depleting medications",
    "To evaluate cardiac arrhythmias"
  ],
  "whoNeedsIt": [
    "Patients with cardiac arrhythmias",
    "Patients on diuretics or PPIs",
    "Patients with alcohol use disorder",
    "Patients with malabsorption"
  ],
  "symptoms": [
    "Muscle cramps",
    "Tremors",
    "Fatigue",
    "Irregular heartbeat",
    "Seizures"
  ],
  "conditionsDetected": [
    "Hypomagnesemia",
    "Hypermagnesemia",
    "Cardiac arrhythmias",
    "Magnesium deficiency"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn and magnesium measured using colorimetric or atomic absorption methods.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 hours",
  "normalRange": "1.7-2.2 mg/dL",
  "highResults": "Hypermagnesemia may indicate kidney failure, excessive magnesium supplementation, or dehydration.",
  "lowResults": "Hypomagnesemia may indicate alcohol use, diarrhea, diuretics, or PPI use.",
  "interpretation": "Magnesium deficiency is common but often overlooked. It can cause resistant hypokalemia and hypocalcemia.",
  "relatedTests": [
    "electrolytes",
    "calcium",
    "potassium",
    "kidney-function-test"
  ],
  "relatedDiseases": [
    "Cardiac arrhythmias",
    "Alcohol use disorder",
    "Chronic kidney disease",
    "Malabsorption syndromes"
  ],
  "relatedPackages": [
    "electrolyte-panel",
    "cardiac-panel"
  ],
  "faqs": [
    {
      "question": "What does low magnesium mean?",
      "answer": "May indicate alcohol use, diarrhea, diuretics, PPI use, or malabsorption."
    },
    {
      "question": "Can magnesium deficiency cause other problems?",
      "answer": "Yes, it can cause resistant hypokalemia, hypocalcemia, and cardiac arrhythmias."
    },
    {
      "question": "What foods are high in magnesium?",
      "answer": "Nuts, seeds, whole grains, leafy greens, and dark chocolate."
    },
    {
      "question": "Is magnesium deficiency common?",
      "answer": "Yes, especially in hospitalized patients, those with diabetes, and chronic alcohol users."
    },
    {
      "question": "Can supplements help?",
      "answer": "Yes, oral magnesium supplements can correct deficiency. Severe cases may need IV magnesium."
    }
  ],
  "references": [
    "LabTestsOnline - Magnesium: https://labtestsonline.org/tests/magnesium"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "magnesium",
    "Mg2+",
    "electrolyte",
    "heart rhythm",
    "muscle function"
  ]
},
{
  "slug": "tsh",
  "name": "Thyroid Stimulating Hormone (TSH)",
  "shortName": "TSH",
  "category": "Endocrinology",
  "subcategory": "Thyroid",
  "description": "TSH is produced by the pituitary gland and regulates thyroid hormone production. Most sensitive screening test for thyroid disorders.",
  "purpose": "To screen for and diagnose thyroid disorders.",
  "whyDone": [
    "To screen for thyroid disorders",
    "To monitor thyroid hormone replacement",
    "To evaluate infertility",
    "To check thyroid function in newborns"
  ],
  "whoNeedsIt": [
    "Patients with fatigue, weight changes, or hair loss",
    "Patients with family history of thyroid disease",
    "Patients with infertility",
    "Newborns for screening"
  ],
  "symptoms": [
    "Fatigue",
    "Weight gain or loss",
    "Cold or heat intolerance",
    "Hair loss",
    "Depression",
    "Anxiety",
    "Constipation",
    "Rapid heartbeat"
  ],
  "conditionsDetected": [
    "Hypothyroidism",
    "Hyperthyroidism",
    "Hashimoto's thyroiditis",
    "Graves' disease",
    "Thyroid nodules"
  ],
  "preparation": [
    "No fasting required but morning testing preferred",
    "Avoid biotin supplements 48 hours before"
  ],
  "procedure": "Blood drawn from a vein. TSH measured using chemiluminescent immunoassay.",
  "sampleType": "Serum",
  "turnaroundTime": "1-2 hours",
  "normalRange": "0.4-4.0 mIU/L (optimal 0.5-2.5)",
  "highResults": "High TSH indicates hypothyroidism. Very high TSH may indicate severe hypothyroidism or thyroid gland failure.",
  "lowResults": "Low TSH indicates hyperthyroidism. Very low TSH may indicate Graves' disease or toxic nodular goiter.",
  "interpretation": "TSH is the best initial test for thyroid screening. Inverse relationship with T3 and T4 levels.",
  "relatedTests": [
    "t3",
    "t4",
    "free-t4"
  ],
  "relatedDiseases": [
    "Hypothyroidism",
    "Hyperthyroidism",
    "Hashimoto's",
    "Graves' disease"
  ],
  "relatedPackages": [
    "thyroid-panel",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "Is fasting required?",
      "answer": "No, but morning testing preferred as TSH peaks overnight."
    },
    {
      "question": "Can biotin affect TSH?",
      "answer": "Yes, stop biotin 48 hours before testing."
    },
    {
      "question": "What does high TSH mean?",
      "answer": "Indicates hypothyroidism. The pituitary produces more TSH to stimulate an underactive thyroid."
    },
    {
      "question": "What does low TSH mean?",
      "answer": "Indicates hyperthyroidism. The pituitary reduces TSH when thyroid hormones are high."
    },
    {
      "question": "How often should TSH be checked?",
      "answer": "Every 6-8 weeks when adjusting medication, then annually once stable."
    }
  ],
  "references": [
    "LabTestsOnline - TSH: https://labtestsonline.org/tests/thyroid-stimulating-hormone-tsh"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "TSH",
    "thyroid",
    "hypothyroidism",
    "hyperthyroidism"
  ]
},
{
  "slug": "t3",
  "name": "Triiodothyronine (T3)",
  "shortName": "T3",
  "category": "Endocrinology",
  "subcategory": "Thyroid",
  "description": "T3 is the more biologically active thyroid hormone, influencing metabolism, growth, and development.",
  "purpose": "To help diagnose hyperthyroidism and assess thyroid function.",
  "whyDone": [
    "To help diagnose hyperthyroidism",
    "To monitor thyroid function",
    "To evaluate T3 thyrotoxicosis"
  ],
  "whoNeedsIt": [
    "Patients with suspected hyperthyroidism",
    "Patients with normal T4 but abnormal TSH"
  ],
  "symptoms": [
    "Weight loss",
    "Rapid heartbeat",
    "Anxiety",
    "Tremors",
    "Heat intolerance",
    "Excessive sweating"
  ],
  "conditionsDetected": [
    "Hyperthyroidism",
    "T3 thyrotoxicosis",
    "Graves' disease"
  ],
  "preparation": [
    "No fasting required",
    "Avoid biotin 48 hours before"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "80-200 ng/dL",
  "highResults": "Elevated T3 indicates hyperthyroidism. T3 is particularly elevated in T3 thyrotoxicosis.",
  "lowResults": "Low T3 may indicate hypothyroidism or non-thyroidal illness.",
  "interpretation": "T3 is less commonly ordered than T4 and TSH. Useful when TSH is low but T4 is normal.",
  "relatedTests": [
    "tsh",
    "t4",
    "free-t4"
  ],
  "relatedDiseases": [
    "Hyperthyroidism",
    "Graves' disease"
  ],
  "relatedPackages": [
    "thyroid-panel"
  ],
  "faqs": [
    {
      "question": "When is T3 ordered?",
      "answer": "When TSH is low but T4 is normal, to rule out T3 thyrotoxicosis."
    },
    {
      "question": "What is T3 thyrotoxicosis?",
      "answer": "Only T3 is elevated while T4 and TSH are normal. Can be an early form of hyperthyroidism."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "What is the difference between T3 and T4?",
      "answer": "T3 is more active (about 4x more potent). T4 is converted to T3 in the body."
    },
    {
      "question": "Does biotin affect T3?",
      "answer": "Yes, biotin can interfere with immunoassay-based testing."
    }
  ],
  "references": [
    "LabTestsOnline - T3: https://labtestsonline.org/tests/triiodothyronine-t3"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "T3",
    "triiodothyronine",
    "thyroid",
    "hyperthyroidism"
  ]
},
{
  "slug": "t4",
  "name": "Thyroxine (T4)",
  "shortName": "T4",
  "category": "Endocrinology",
  "subcategory": "Thyroid",
  "description": "T4 is the main hormone produced by the thyroid gland. Most circulates bound to proteins; only free T4 is biologically active.",
  "purpose": "To help diagnose thyroid disorders and monitor treatment.",
  "whyDone": [
    "To help diagnose hypothyroidism and hyperthyroidism",
    "To monitor thyroid hormone replacement",
    "As part of thyroid evaluation"
  ],
  "whoNeedsIt": [
    "Patients with suspected thyroid disease",
    "Patients on thyroid medication"
  ],
  "symptoms": [
    "Fatigue",
    "Weight changes",
    "Hair loss",
    "Cold/heat intolerance",
    "Depression"
  ],
  "conditionsDetected": [
    "Hypothyroidism",
    "Hyperthyroidism",
    "Thyroid cancer"
  ],
  "preparation": [
    "No fasting required",
    "Avoid biotin 48 hours before"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "5.0-12.0 ug/dL",
  "highResults": "High T4 may indicate hyperthyroidism or thyroid hormone excess from medications.",
  "lowResults": "Low T4 may indicate hypothyroidism or non-thyroidal illness.",
  "interpretation": "Total T4 includes bound and free hormone. Free T4 is a better measure of thyroid status.",
  "relatedTests": [
    "tsh",
    "free-t4",
    "t3"
  ],
  "relatedDiseases": [
    "Hypothyroidism",
    "Hyperthyroidism"
  ],
  "relatedPackages": [
    "thyroid-panel"
  ],
  "faqs": [
    {
      "question": "What is total T4 vs free T4?",
      "answer": "Total includes both bound and free. Free is only the biologically active portion."
    },
    {
      "question": "When is total T4 ordered?",
      "answer": "Less commonly now. Free T4 is preferred as it is not affected by protein levels."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "Can pregnancy affect T4?",
      "answer": "Yes, total T4 may be elevated due to increased binding proteins."
    },
    {
      "question": "What is the normal range?",
      "answer": "Total T4: 5.0-12.0 ug/dL. Free T4: 0.8-1.8 ng/dL."
    }
  ],
  "references": [
    "LabTestsOnline - T4: https://labtestsonline.org/tests/thyroxine-t4"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "T4",
    "thyroxine",
    "thyroid",
    "hypothyroidism"
  ]
},
{
  "slug": "free-t4",
  "name": "Free Thyroxine (Free T4)",
  "shortName": "FT4",
  "category": "Endocrinology",
  "subcategory": "Thyroid",
  "description": "Free T4 is the biologically active form not bound to carrier proteins. Most accurate measure of thyroid status.",
  "purpose": "To accurately assess thyroid function independent of binding protein variations.",
  "whyDone": [
    "To diagnose thyroid disorders more accurately",
    "To monitor thyroid treatment",
    "To evaluate thyroid function in pregnancy"
  ],
  "whoNeedsIt": [
    "Patients with abnormal TSH",
    "Patients with suspected thyroid disease"
  ],
  "symptoms": [
    "Fatigue",
    "Weight changes",
    "Hair loss",
    "Cold/heat intolerance",
    "Depression"
  ],
  "conditionsDetected": [
    "Hypothyroidism",
    "Hyperthyroidism"
  ],
  "preparation": [
    "No fasting required",
    "Avoid biotin 48 hours before"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "0.8-1.8 ng/dL",
  "highResults": "Elevated Free T4 indicates hyperthyroidism or excessive thyroid hormone intake.",
  "lowResults": "Low Free T4 indicates hypothyroidism or thyroid hormone deficiency.",
  "interpretation": "Not affected by carrier protein changes (pregnancy, liver disease), making it more reliable than total T4.",
  "relatedTests": [
    "tsh",
    "t3",
    "total-t4"
  ],
  "relatedDiseases": [
    "Hypothyroidism",
    "Hyperthyroidism"
  ],
  "relatedPackages": [
    "thyroid-panel"
  ],
  "faqs": [
    {
      "question": "Why is Free T4 better?",
      "answer": "Not affected by carrier protein changes, making it more accurate."
    },
    {
      "question": "What does high Free T4 mean?",
      "answer": "Indicates hyperthyroidism or excessive thyroid hormone intake."
    },
    {
      "question": "What does low Free T4 mean?",
      "answer": "Indicates hypothyroidism."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "Can biotin affect Free T4?",
      "answer": "Yes, stop biotin 48 hours before testing."
    }
  ],
  "references": [
    "LabTestsOnline - Free T4: https://labtestsonline.org/tests/thyroxine-free-t4"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "Free T4",
    "FT4",
    "thyroid",
    "hypothyroidism"
  ]
},
{
  "slug": "cortisol",
  "name": "Serum Cortisol",
  "shortName": "Cortisol",
  "category": "Endocrinology",
  "subcategory": "Adrenal",
  "description": "Cortisol is produced by the adrenal glands. It regulates metabolism, immune response, and stress response.",
  "purpose": "To evaluate adrenal gland function and diagnose cortisol disorders.",
  "whyDone": [
    "To diagnose Cushing's or Addison's disease",
    "To evaluate adrenal insufficiency",
    "To investigate unexplained weight gain or fatigue"
  ],
  "whoNeedsIt": [
    "Patients with suspected Cushing's or Addison's disease",
    "Patients with unexplained weight gain, fatigue, or muscle weakness"
  ],
  "symptoms": [
    "Weight gain (central obesity)",
    "Moon face",
    "Buffalo hump",
    "Muscle weakness",
    "Fatigue",
    "High blood pressure",
    "Easy bruising"
  ],
  "conditionsDetected": [
    "Cushing's syndrome",
    "Addison's disease",
    "Adrenal insufficiency"
  ],
  "preparation": [
    "Morning sample preferred (cortisol peaks 6-8 AM)",
    "Avoid strenuous exercise before testing",
    "Avoid estrogen and steroid medications if possible"
  ],
  "procedure": "Blood drawn from a vein in the morning.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "6-23 ug/dL (8 AM), <10 ug/dL (4 PM)",
  "highResults": "Elevated cortisol may indicate Cushing's syndrome, stress, pregnancy, or obesity.",
  "lowResults": "Low cortisol may indicate Addison's disease, adrenal insufficiency, or pituitary disease.",
  "interpretation": "Cortisol follows a diurnal pattern, peaking in the morning. Interpretation requires proper timing.",
  "relatedTests": [
    "acth",
    "dhea-s"
  ],
  "relatedDiseases": [
    "Cushing's syndrome",
    "Addison's disease"
  ],
  "relatedPackages": [
    "adrenal-panel",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "Why is morning cortisol preferred?",
      "answer": "Cortisol peaks at 6-8 AM. Morning values are most reliable for diagnosis."
    },
    {
      "question": "What does high cortisol mean?",
      "answer": "May indicate Cushing's syndrome, chronic stress, obesity, or ectopic ACTH production."
    },
    {
      "question": "What does low cortisol mean?",
      "answer": "May indicate Addison's disease, adrenal insufficiency, or pituitary disease."
    },
    {
      "question": "Can stress affect cortisol?",
      "answer": "Yes, acute stress can significantly elevate cortisol levels."
    },
    {
      "question": "Is fasting required?",
      "answer": "No, but morning sample is preferred."
    }
  ],
  "references": [
    "NCBI - Cortisol: https://www.ncbi.nlm.nih.gov/books/NBK34/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "cortisol",
    "Cushing",
    "Addison",
    "adrenal",
    "stress hormone"
  ]
},
{
  "slug": "insulin",
  "name": "Serum Insulin",
  "shortName": "Insulin",
  "category": "Endocrinology",
  "subcategory": "Metabolic",
  "description": "Insulin is produced by the pancreas and regulates blood sugar levels. This test measures fasting insulin levels.",
  "purpose": "To evaluate insulin resistance, pancreatic function, and diabetes risk.",
  "whyDone": [
    "To assess insulin resistance (HOMA-IR)",
    "To diagnose insulinoma",
    "To evaluate metabolic syndrome",
    "To assess pancreatic beta-cell function"
  ],
  "whoNeedsIt": [
    "Patients with suspected insulin resistance",
    "Patients with metabolic syndrome",
    "Patients with recurrent hypoglycemia"
  ],
  "symptoms": [
    "Fatigue after meals",
    "Weight gain",
    "Dark skin patches (acanthosis nigricans)",
    "Increased hunger"
  ],
  "conditionsDetected": [
    "Insulin resistance",
    "Metabolic syndrome",
    "Type 2 diabetes risk",
    "Insulinoma"
  ],
  "preparation": [
    "Fasting for 10-12 hours required",
    "Standardized morning sample"
  ],
  "procedure": "Blood drawn from a vein after overnight fasting.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "2.6-24.9 uIU/mL (fasting)",
  "highResults": "High fasting insulin indicates insulin resistance, pre-diabetes, or insulinoma.",
  "lowResults": "Low insulin may indicate Type 1 diabetes or advanced pancreatic disease.",
  "interpretation": "Used to calculate HOMA-IR = (Fasting Insulin x Fasting Glucose) / 405.",
  "relatedTests": [
    "homa-ir",
    "fasting-blood-glucose",
    "hba1c",
    "c-peptide"
  ],
  "relatedDiseases": [
    "Insulin resistance",
    "Metabolic syndrome",
    "Type 2 diabetes",
    "Insulinoma"
  ],
  "relatedPackages": [
    "diabetes-panel",
    "metabolic-panel"
  ],
  "faqs": [
    {
      "question": "What is HOMA-IR?",
      "answer": "(Fasting Insulin x Fasting Glucose) / 405. Normal <2.0, >2.5 suggests insulin resistance."
    },
    {
      "question": "Why is fasting required?",
      "answer": "Insulin rises significantly after eating. Fasting provides a baseline."
    },
    {
      "question": "What does high fasting insulin mean?",
      "answer": "Indicates insulin resistance, a precursor to Type 2 diabetes."
    },
    {
      "question": "Can high insulin cause weight gain?",
      "answer": "Yes, insulin promotes fat storage. High levels are associated with central obesity."
    },
    {
      "question": "Is insulin testing needed for diabetes?",
      "answer": "Not routinely. Used for specific questions like insulin resistance assessment."
    }
  ],
  "references": [
    "NCBI - Insulin: https://www.ncbi.nlm.nih.gov/books/NBK53/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "insulin",
    "insulin resistance",
    "HOMA-IR",
    "diabetes"
  ]
},
{
  "slug": "c-peptide",
  "name": "C-Peptide",
  "shortName": "C-Peptide",
  "category": "Endocrinology",
  "subcategory": "Metabolic",
  "description": "C-Peptide is released when insulin is produced from proinsulin. It reflects the body's own insulin production.",
  "purpose": "To assess pancreatic insulin production and classify diabetes type.",
  "whyDone": [
    "To differentiate Type 1 from Type 2 diabetes",
    "To assess residual beta-cell function",
    "To evaluate insulinoma"
  ],
  "whoNeedsIt": [
    "Patients with newly diagnosed diabetes",
    "Patients on insulin therapy being evaluated"
  ],
  "symptoms": [
    "Fatigue",
    "Weight changes",
    "Frequent infections",
    "Blurred vision"
  ],
  "conditionsDetected": [
    "Type 1 diabetes",
    "Type 2 diabetes",
    "Insulinoma",
    "MODY"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn from a vein after fasting.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "0.8-3.9 ng/mL (fasting)",
  "highResults": "High C-peptide may indicate insulin resistance, Type 2 diabetes, or insulinoma.",
  "lowResults": "Low or absent C-peptide indicates Type 1 diabetes.",
  "interpretation": "More reliable marker of insulin production than direct insulin measurement. Not affected by insulin antibodies.",
  "relatedTests": [
    "insulin",
    "fasting-blood-glucose",
    "hba1c"
  ],
  "relatedDiseases": [
    "Type 1 diabetes",
    "Type 2 diabetes",
    "Insulinoma"
  ],
  "relatedPackages": [
    "diabetes-panel"
  ],
  "faqs": [
    {
      "question": "Why is C-peptide better than insulin?",
      "answer": "Not cleared by the liver like insulin, so blood levels more accurately reflect pancreatic production."
    },
    {
      "question": "What does low C-peptide mean?",
      "answer": "Pancreas is not producing enough insulin, typical of Type 1 diabetes."
    },
    {
      "question": "What does high C-peptide mean?",
      "answer": "High insulin production, seen in insulin resistance or Type 2 diabetes."
    },
    {
      "question": "Is fasting required?",
      "answer": "Yes, fasting for 8-12 hours recommended."
    },
    {
      "question": "Can it guide treatment?",
      "answer": "Yes, helps determine if a diabetic patient still produces enough insulin."
    }
  ],
  "references": [
    "LabTestsOnline - C-Peptide: https://labtestsonline.org/tests/c-peptide"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "C-peptide",
    "insulin production",
    "diabetes classification"
  ]
},
{
  "slug": "testosterone",
  "name": "Serum Testosterone (Total)",
  "shortName": "Testosterone",
  "category": "Endocrinology",
  "subcategory": "Reproductive",
  "description": "Testosterone is the primary male sex hormone. It regulates reproductive function, muscle mass, and bone density.",
  "purpose": "To evaluate male hypogonadism, sexual dysfunction, and reproductive health.",
  "whyDone": [
    "To diagnose male hypogonadism",
    "To evaluate erectile dysfunction",
    "To assess infertility",
    "To monitor testosterone replacement therapy"
  ],
  "whoNeedsIt": [
    "Men with symptoms of low testosterone",
    "Men with ED or infertility",
    "Women with hirsutism"
  ],
  "symptoms": [
    "Decreased libido",
    "Erectile dysfunction",
    "Fatigue",
    "Loss of muscle mass",
    "Increased body fat",
    "Depression"
  ],
  "conditionsDetected": [
    "Male hypogonadism",
    "Infertility",
    "Erectile dysfunction",
    "PCOS (women)"
  ],
  "preparation": [
    "Early morning sample preferred (8-10 AM)",
    "Avoid intense exercise 24-48 hours before"
  ],
  "procedure": "Blood drawn from a vein in the early morning.",
  "sampleType": "Serum",
  "turnaroundTime": "6-12 hours",
  "normalRange": "Males: 300-1000 ng/dL, Females: 15-70 ng/dL",
  "highResults": "High testosterone may indicate androgen-producing tumors or anabolic steroid use. In women, may indicate PCOS.",
  "lowResults": "Low testosterone indicates hypogonadism causing infertility, osteoporosis, and sexual dysfunction.",
  "interpretation": "Levels should be confirmed with a repeat morning sample before treatment.",
  "relatedTests": [
    "lh",
    "fsh",
    "estradiol"
  ],
  "relatedDiseases": [
    "Male hypogonadism",
    "PCOS",
    "Infertility"
  ],
  "relatedPackages": [
    "male-health-panel",
    "reproductive-panel"
  ],
  "faqs": [
    {
      "question": "Why morning testing?",
      "answer": "Testosterone peaks in early morning (6-10 AM) and declines throughout the day."
    },
    {
      "question": "What is normal?",
      "answer": "Males: 300-1000 ng/dL. Females: 15-70 ng/dL. Optimal male: 500-700."
    },
    {
      "question": "What does low testosterone mean?",
      "answer": "May indicate hypogonadism, pituitary disease, testicular failure, or chronic illness."
    },
    {
      "question": "Can exercise affect it?",
      "answer": "Yes, intense exercise can temporarily raise testosterone."
    },
    {
      "question": "Is TRT safe?",
      "answer": "Has benefits and risks. Requires monitoring for polycythemia, prostate issues, and cardiovascular effects."
    }
  ],
  "references": [
    "Endocrine Society - Male Hypogonadism: https://www.endocrine.org/clinical-practice-guidelines/male-hypogonadism"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "testosterone",
    "male hormone",
    "hypogonadism",
    "ED",
    "infertility"
  ]
},
{
  "slug": "estradiol",
  "name": "Serum Estradiol (E2)",
  "shortName": "Estradiol",
  "category": "Endocrinology",
  "subcategory": "Reproductive",
  "description": "Estradiol is the primary female sex hormone responsible for reproductive and sexual development.",
  "purpose": "To evaluate ovarian function, fertility, and menopausal status.",
  "whyDone": [
    "To evaluate ovarian function and fertility",
    "To monitor menopausal status",
    "To assess hormone replacement therapy",
    "To evaluate gynecomastia in men"
  ],
  "whoNeedsIt": [
    "Women with menstrual irregularities",
    "Women in menopause evaluation",
    "Couples undergoing fertility treatment"
  ],
  "symptoms": [
    "Menstrual irregularities",
    "Hot flashes",
    "Night sweats",
    "Vaginal dryness",
    "Infertility"
  ],
  "conditionsDetected": [
    "Ovarian failure",
    "PCOS",
    "Menopause",
    "Gynecomastia"
  ],
  "preparation": [
    "Fasting not required",
    "Timing depends on clinical context (day 2-3 for fertility evaluation)"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Males: 10-40 pg/mL, Premenopausal: 30-400 pg/mL (varies), Postmenopausal: <30 pg/mL",
  "highResults": "High estradiol in men may indicate liver disease or testicular tumors. In women, may indicate ovarian tumors.",
  "lowResults": "Low estradiol indicates ovarian failure, menopause, or hypothalamic-pituitary disease.",
  "interpretation": "Levels vary throughout menstrual cycle. Day 2-3 values used for baseline fertility assessment.",
  "relatedTests": [
    "fsh",
    "lh",
    "progesterone",
    "testosterone"
  ],
  "relatedDiseases": [
    "Ovarian failure",
    "PCOS",
    "Menopause",
    "Infertility"
  ],
  "relatedPackages": [
    "reproductive-panel",
    "fertility-panel"
  ],
  "faqs": [
    {
      "question": "When should it be tested in women?",
      "answer": "Day 2-3 of cycle for baseline fertility evaluation."
    },
    {
      "question": "What does high estradiol mean in men?",
      "answer": "May indicate liver disease, testicular tumors, or obesity."
    },
    {
      "question": "What does low estradiol mean?",
      "answer": "Ovarian failure, menopause, hypothalamic-pituitary disease, or eating disorders."
    },
    {
      "question": "Does the menstrual cycle affect it?",
      "answer": "Yes, levels fluctuate, peaking just before ovulation."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "LabTestsOnline - Estradiol: https://labtestsonline.org/tests/estradiol"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "estradiol",
    "E2",
    "estrogen",
    "menopause",
    "fertility"
  ]
},
{
  "slug": "progesterone",
  "name": "Serum Progesterone",
  "shortName": "Progesterone",
  "category": "Endocrinology",
  "subcategory": "Reproductive",
  "description": "Progesterone is produced by the ovaries after ovulation. It prepares the uterine lining for pregnancy.",
  "purpose": "To confirm ovulation and assess luteal phase function.",
  "whyDone": [
    "To confirm ovulation has occurred",
    "To assess luteal phase deficiency",
    "To monitor early pregnancy",
    "To evaluate abnormal uterine bleeding"
  ],
  "whoNeedsIt": [
    "Women undergoing fertility evaluation",
    "Women with recurrent miscarriages"
  ],
  "symptoms": [
    "Abdominal cramping",
    "Breast tenderness",
    "Bloating",
    "Irregular periods"
  ],
  "conditionsDetected": [
    "Anovulation",
    "Luteal phase deficiency",
    "Ectopic pregnancy",
    "Ovarian cysts"
  ],
  "preparation": [
    "Fasting not required",
    "Day 21 of a 28-day cycle (7 days after ovulation)"
  ],
  "procedure": "Blood drawn from a vein on Day 21.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Follicular: 0.2-1.5 ng/mL, Luteal: 2.0-25 ng/mL, Pregnancy: varies",
  "highResults": "High progesterone in non-pregnant women may indicate ovarian cysts or adrenal tumors.",
  "lowResults": "Low progesterone in luteal phase may indicate anovulation or threat of miscarriage.",
  "interpretation": "Day 21 progesterone >3 ng/mL generally confirms ovulation.",
  "relatedTests": [
    "estradiol",
    "fsh",
    "lh",
    "beta-hcg"
  ],
  "relatedDiseases": [
    "Anovulation",
    "Luteal phase deficiency",
    "Recurrent miscarriage"
  ],
  "relatedPackages": [
    "fertility-panel"
  ],
  "faqs": [
    {
      "question": "When is it tested?",
      "answer": "Day 21 of a 28-day cycle to confirm ovulation."
    },
    {
      "question": "What does Day 21 >3 ng/mL mean?",
      "answer": "Confirms ovulation occurred during that cycle."
    },
    {
      "question": "What does low progesterone mean?",
      "answer": "May indicate anovulation, luteal phase deficiency, or miscarriage risk."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "Can it be tested during pregnancy?",
      "answer": "Yes, to assess early pregnancy health."
    }
  ],
  "references": [
    "LabTestsOnline - Progesterone: https://labtestsonline.org/tests/progesterone"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "progesterone",
    "ovulation",
    "luteal phase",
    "fertility"
  ]
},
{
  "slug": "fsh",
  "name": "Follicle Stimulating Hormone (FSH)",
  "shortName": "FSH",
  "category": "Endocrinology",
  "subcategory": "Reproductive",
  "description": "FSH is produced by the pituitary and stimulates the ovaries and testes. In women, it regulates follicle development.",
  "purpose": "To evaluate reproductive function and diagnose fertility disorders.",
  "whyDone": [
    "To evaluate female fertility and ovarian reserve",
    "To diagnose menopause",
    "To evaluate male infertility",
    "To investigate delayed or precocious puberty"
  ],
  "whoNeedsIt": [
    "Women with infertility or menstrual irregularities",
    "Men with infertility",
    "Women in menopause evaluation"
  ],
  "symptoms": [
    "Irregular periods",
    "Hot flashes",
    "Night sweats",
    "Low sperm count (men)"
  ],
  "conditionsDetected": [
    "Menopause",
    "Ovarian failure",
    "PCOS",
    "Hypogonadism"
  ],
  "preparation": [
    "Fasting not required",
    "Day 2-3 of menstrual cycle for fertility evaluation"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Premenopausal: 3-10 mIU/mL, Postmenopausal: 25-135 mIU/mL, Men: 1.5-12.4 mIU/mL",
  "highResults": "High FSH with low estrogen indicates ovarian failure or menopause. In men, may indicate testicular failure.",
  "lowResults": "Low FSH may indicate pituitary disease, hypothalamic dysfunction, or PCOS.",
  "interpretation": "FSH >25 mIU/mL with low estrogen and amenorrhea confirms menopause. FSH/LH ratio >2 may indicate PCOS.",
  "relatedTests": [
    "lh",
    "estradiol",
    "amh"
  ],
  "relatedDiseases": [
    "Menopause",
    "Ovarian failure",
    "PCOS"
  ],
  "relatedPackages": [
    "fertility-panel",
    "menopause-panel"
  ],
  "faqs": [
    {
      "question": "When is FSH tested in women?",
      "answer": "Day 2-3 for fertility evaluation. Any time for menopause diagnosis."
    },
    {
      "question": "What level indicates menopause?",
      "answer": "FSH >25-30 mIU/mL with low estradiol and menopausal symptoms."
    },
    {
      "question": "What does high FSH mean?",
      "answer": "In women: ovarian failure or menopause. In men: testicular failure."
    },
    {
      "question": "What does low FSH mean?",
      "answer": "Pituitary or hypothalamic disease, anorexia, or PCOS."
    },
    {
      "question": "What is the FSH/LH ratio?",
      "answer": ">2 may suggest PCOS. <1 is normal in reproductive age women."
    }
  ],
  "references": [
    "LabTestsOnline - FSH: https://labtestsonline.org/tests/follicle-stimulating-hormone-fsh"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "FSH",
    "follicle stimulating hormone",
    "fertility",
    "menopause"
  ]
},
{
  "slug": "lh",
  "name": "Luteinizing Hormone (LH)",
  "shortName": "LH",
  "category": "Endocrinology",
  "subcategory": "Reproductive",
  "description": "LH is produced by the pituitary. In women, the LH surge triggers ovulation. In men, it stimulates testosterone production.",
  "purpose": "To evaluate reproductive function and detect ovulation.",
  "whyDone": [
    "To detect the LH surge and predict ovulation",
    "To evaluate male infertility",
    "To investigate menstrual irregularities"
  ],
  "whoNeedsIt": [
    "Women tracking ovulation",
    "Women with menstrual irregularities",
    "Men with infertility"
  ],
  "symptoms": [
    "Irregular periods",
    "Anovulation",
    "Absence of periods",
    "Infertility"
  ],
  "conditionsDetected": [
    "PCOS",
    "Hypogonadism",
    "Pituitary disorders"
  ],
  "preparation": [
    "Fasting not required",
    "For ovulation tracking: test daily from Day 10-16. For evaluation: Day 2-3."
  ],
  "procedure": "Blood drawn from a vein. For ovulation tracking, urine LH kits may also be used.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Follicular: 2-15 mIU/mL, LH surge: 20-100 mIU/mL, Men: 1.5-9.3 mIU/mL",
  "highResults": "High LH with high testosterone suggests PCOS. In men, may indicate testicular failure.",
  "lowResults": "Low LH may indicate pituitary disease or hypothalamic dysfunction.",
  "interpretation": "In PCOS, LH is often elevated relative to FSH (LH:FSH >2:1). LH surge precedes ovulation by 24-36 hours.",
  "relatedTests": [
    "fsh",
    "estradiol",
    "testosterone"
  ],
  "relatedDiseases": [
    "PCOS",
    "Ovarian failure"
  ],
  "relatedPackages": [
    "fertility-panel"
  ],
  "faqs": [
    {
      "question": "What is the LH surge?",
      "answer": "A dramatic rise (20-100 mIU/mL) that triggers ovulation, occurring 24-36 hours before egg release."
    },
    {
      "question": "How do I track ovulation?",
      "answer": "Test daily from Day 10-16. Positive test predicts ovulation within 24-36 hours."
    },
    {
      "question": "What does high LH mean?",
      "answer": "In PCOS: elevated with LH:FSH >2:1. In men: may indicate testicular failure."
    },
    {
      "question": "What does low LH mean?",
      "answer": "Pituitary or hypothalamic disease, eating disorders, or excessive exercise."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "LabTestsOnline - LH: https://labtestsonline.org/tests/luteinizing-hormone-lh"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "LH",
    "luteinizing hormone",
    "ovulation",
    "PCOS"
  ]
},
{
  "slug": "prolactin",
  "name": "Serum Prolactin",
  "shortName": "Prolactin",
  "category": "Endocrinology",
  "subcategory": "Reproductive",
  "description": "Prolactin is produced by the pituitary and stimulates milk production. Elevated levels can cause menstrual irregularities and infertility.",
  "purpose": "To evaluate hyperprolactinemia and related symptoms.",
  "whyDone": [
    "To diagnose hyperprolactinemia",
    "To investigate menstrual irregularities or infertility",
    "To evaluate galactorrhea",
    "To assess pituitary function"
  ],
  "whoNeedsIt": [
    "Women with menstrual irregularities or galactorrhea",
    "Men with ED or gynecomastia",
    "Patients with suspected pituitary tumors"
  ],
  "symptoms": [
    "Irregular periods",
    "Galactorrhea",
    "Infertility",
    "Erectile dysfunction",
    "Headache",
    "Visual disturbances"
  ],
  "conditionsDetected": [
    "Prolactinoma",
    "Hypothyroidism",
    "Pituitary tumors",
    "Medication-induced hyperprolactinemia"
  ],
  "preparation": [
    "No fasting required",
    "Avoid breast stimulation before testing",
    "Morning sample preferred"
  ],
  "procedure": "Blood drawn from a vein in the morning.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Males: 2-18 ng/mL, Females: 2-29 ng/mL",
  "highResults": "Elevated prolactin may indicate prolactinoma, hypothyroidism, medications (antipsychotics), or renal failure.",
  "lowResults": "Low prolactin is generally not clinically significant.",
  "interpretation": "Prolactin >200 ng/mL is almost always a macroprolactinoma. Levels 25-100 require further investigation.",
  "relatedTests": [
    "fsh",
    "lh",
    "tsh"
  ],
  "relatedDiseases": [
    "Prolactinoma",
    "Hypothyroidism",
    "Pituitary tumor",
    "Infertility"
  ],
  "relatedPackages": [
    "pituitary-panel",
    "reproductive-panel"
  ],
  "faqs": [
    {
      "question": "What does high prolactin mean?",
      "answer": "May indicate prolactinoma, hypothyroidism, medications, or renal failure."
    },
    {
      "question": "Can stress affect prolactin?",
      "answer": "Yes, stress, breast stimulation, and exercise can temporarily elevate it."
    },
    {
      "question": "What is a prolactinoma?",
      "answer": "A benign pituitary tumor producing excess prolactin. Causes galactorrhea, menstrual irregularities, infertility."
    },
    {
      "question": "When is testing recommended?",
      "answer": "Menstrual irregularities, galactorrhea, infertility, ED, or headaches with visual changes."
    },
    {
      "question": "What medications raise prolactin?",
      "answer": "Antipsychotics, metoclopramide, certain antidepressants, and some blood pressure medications."
    }
  ],
  "references": [
    "LabTestsOnline - Prolactin: https://labtestsonline.org/tests/prolactin"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "prolactin",
    "prolactinoma",
    "galactorrhea",
    "pituitary",
    "infertility"
  ]
},
{
  "slug": "amh",
  "name": "Anti-Mullerian Hormone (AMH)",
  "shortName": "AMH",
  "category": "Endocrinology",
  "subcategory": "Reproductive",
  "description": "AMH is produced by ovarian follicles and is a reliable marker of ovarian reserve.",
  "purpose": "To evaluate ovarian reserve and fertility potential.",
  "whyDone": [
    "To assess ovarian reserve before fertility treatment",
    "To predict response to ovarian stimulation",
    "To evaluate premature ovarian insufficiency",
    "To help diagnose PCOS"
  ],
  "whoNeedsIt": [
    "Women planning IVF",
    "Women with suspected premature ovarian insufficiency"
  ],
  "symptoms": [
    "Irregular periods",
    "Difficulty conceiving",
    "Hot flashes in young women"
  ],
  "conditionsDetected": [
    "Diminished ovarian reserve",
    "Premature ovarian insufficiency",
    "PCOS (elevated)"
  ],
  "preparation": [
    "No fasting required",
    "Can be tested any day of the menstrual cycle"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "20-29: 1.0-6.8 ng/mL, 30-39: 0.5-3.5 ng/mL, 40-50: <1.0 ng/mL",
  "highResults": "Very high AMH may indicate PCOS. Very low for age indicates diminished ovarian reserve.",
  "lowResults": "Low AMH for age indicates diminished ovarian reserve and reduced fertility potential.",
  "interpretation": "Most reliable single test for ovarian reserve. Unlike FSH, it can be tested any day.",
  "relatedTests": [
    "fsh",
    "estradiol"
  ],
  "relatedDiseases": [
    "Diminished ovarian reserve",
    "Premature ovarian insufficiency",
    "PCOS"
  ],
  "relatedPackages": [
    "fertility-panel",
    "ovarian-reserve-panel"
  ],
  "faqs": [
    {
      "question": "When is AMH tested?",
      "answer": "Any day of the menstrual cycle. Unlike FSH, AMH does not fluctuate."
    },
    {
      "question": "What does low AMH mean?",
      "answer": "Diminished ovarian reserve and reduced fertility potential."
    },
    {
      "question": "What does high AMH mean?",
      "answer": "May indicate PCOS, with many small follicles producing AMH."
    },
    {
      "question": "Can AMH predict IVF success?",
      "answer": "Yes, helps predict ovarian response to stimulation."
    },
    {
      "question": "Does AMH indicate egg quality?",
      "answer": "Reflects quantity more than quality. Age is still the best predictor of quality."
    }
  ],
  "references": [
    "ESHRE - Ovarian Stimulation Guidelines: https://www.eshre.eu/"
  ],
  "price": 500,
  "homeCollection": true,
  "tags": [
    "AMH",
    "anti-mullerian hormone",
    "ovarian reserve",
    "IVF",
    "fertility"
  ]
},
{
  "slug": "dhea-s",
  "name": "Dehydroepiandrosterone Sulfate (DHEA-S)",
  "shortName": "DHEA-S",
  "category": "Endocrinology",
  "subcategory": "Adrenal",
  "description": "DHEA-S is an androgen hormone produced by the adrenal glands. It is a precursor to sex hormones.",
  "purpose": "To evaluate adrenal function and diagnose adrenal disorders.",
  "whyDone": [
    "To evaluate adrenal androgen production",
    "To investigate hirsutism in women",
    "To diagnose adrenal tumors"
  ],
  "whoNeedsIt": [
    "Women with hirsutism or virilization",
    "Patients with suspected adrenal tumors",
    "Women with PCOS"
  ],
  "symptoms": [
    "Hirsutism (excess hair growth)",
    "Acne",
    "Deep voice",
    "Irregular periods"
  ],
  "conditionsDetected": [
    "Adrenal tumors",
    "PCOS",
    "Congenital adrenal hyperplasia"
  ],
  "preparation": [
    "Fasting not required",
    "Morning sample preferred",
    "Avoid DHEA supplements before testing"
  ],
  "procedure": "Blood drawn from a vein in the morning.",
  "sampleType": "Serum",
  "turnaroundTime": "4-6 hours",
  "normalRange": "Males: 130-330 ug/dL, Females: 18-244 ug/dL",
  "highResults": "Elevated DHEA-S may indicate adrenal tumors, congenital adrenal hyperplasia, or Cushing's.",
  "lowResults": "Low DHEA-S may indicate adrenal insufficiency or hypopituitarism.",
  "interpretation": "Most reliable marker of adrenal androgen production. Helps differentiate adrenal from ovarian sources of excess androgens.",
  "relatedTests": [
    "testosterone",
    "cortisol"
  ],
  "relatedDiseases": [
    "Adrenal tumors",
    "PCOS",
    "Congenital adrenal hyperplasia"
  ],
  "relatedPackages": [
    "adrenal-panel",
    "hormone-panel"
  ],
  "faqs": [
    {
      "question": "What does high DHEA-S mean?",
      "answer": "May indicate adrenal tumors, congenital adrenal hyperplasia, or Cushing's."
    },
    {
      "question": "What does low DHEA-S mean?",
      "answer": "Adrenal insufficiency, hypopituitarism, or chronic illness."
    },
    {
      "question": "Is DHEA-S different from DHEA?",
      "answer": "DHEA-S is the sulfated form and is more stable in blood. Preferred test for adrenal function."
    },
    {
      "question": "How is it related to PCOS?",
      "answer": "May be mildly elevated along with testosterone. Very high levels suggest adrenal tumor."
    },
    {
      "question": "Is fasting required?",
      "answer": "No, but morning testing is preferred."
    }
  ],
  "references": [
    "LabTestsOnline - DHEA-S: https://labtestsonline.org/tests/dehydroepiandrosterone-sulfate"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "DHEA-S",
    "adrenal",
    "androgen",
    "hirsutism",
    "PCOS"
  ]
},
{
  "slug": "homa-ir",
  "name": "HOMA-IR (Insulin Resistance Index)",
  "shortName": "HOMA-IR",
  "category": "Endocrinology",
  "subcategory": "Metabolic",
  "description": "HOMA-IR is calculated from fasting insulin and glucose to quantify insulin resistance.",
  "purpose": "To assess insulin resistance and metabolic risk.",
  "whyDone": [
    "To quantify insulin resistance",
    "To assess metabolic syndrome risk",
    "To predict Type 2 diabetes risk",
    "To monitor lifestyle interventions"
  ],
  "whoNeedsIt": [
    "Patients with metabolic syndrome",
    "Patients at risk for Type 2 diabetes",
    "Patients with PCOS"
  ],
  "symptoms": [
    "Weight gain",
    "Dark skin patches",
    "Fatigue after meals"
  ],
  "conditionsDetected": [
    "Insulin resistance",
    "Metabolic syndrome",
    "Type 2 diabetes risk"
  ],
  "preparation": [
    "Fasting for 10-12 hours required",
    "Standardized morning sample"
  ],
  "procedure": "Calculated from fasting insulin and glucose.",
  "sampleType": "Calculated",
  "turnaroundTime": "Combined results",
  "normalRange": "<2.0 (Normal), 2.0-2.5 (Borderline), >2.5 (Insulin resistant)",
  "highResults": "High HOMA-IR indicates insulin resistance, precursor to Type 2 diabetes.",
  "lowResults": "Low HOMA-IR indicates normal insulin sensitivity.",
  "interpretation": "HOMA-IR = (Fasting Insulin x Fasting Glucose) / 405. >2.5 suggests clinically significant insulin resistance.",
  "relatedTests": [
    "fasting-blood-glucose",
    "insulin",
    "hba1c"
  ],
  "relatedDiseases": [
    "Insulin resistance",
    "Metabolic syndrome",
    "Type 2 diabetes"
  ],
  "relatedPackages": [
    "diabetes-panel",
    "metabolic-panel"
  ],
  "faqs": [
    {
      "question": "How is HOMA-IR calculated?",
      "answer": "(Fasting Insulin x Fasting Glucose) / 405."
    },
    {
      "question": "What does high HOMA-IR mean?",
      "answer": ">2.5 suggests insulin resistance, precursor to Type 2 diabetes."
    },
    {
      "question": "Can it be improved?",
      "answer": "Yes, through weight loss, exercise, dietary changes, and adequate sleep."
    },
    {
      "question": "Is it better than fasting glucose alone?",
      "answer": "Yes, detects insulin resistance before fasting glucose becomes abnormal."
    },
    {
      "question": "What is normal?",
      "answer": "<2.0 is normal. Optimal is <1.0."
    }
  ],
  "references": [
    "Diabetes Care - HOMA-IR: https://diabetesjournals.org/care"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "HOMA-IR",
    "insulin resistance",
    "metabolic syndrome",
    "Type 2 diabetes"
  ]
},
{
  "slug": "ana",
  "name": "Antinuclear Antibody (ANA)",
  "shortName": "ANA",
  "category": "Immunology & Serology",
  "subcategory": "Autoimmune",
  "description": "ANA detects autoantibodies directed against cell nucleus components. A key screening test for systemic autoimmune diseases.",
  "purpose": "To screen for systemic autoimmune diseases.",
  "whyDone": [
    "To screen for lupus and other autoimmune conditions",
    "To investigate joint pain, rashes, or unexplained inflammation",
    "To evaluate connective tissue disease"
  ],
  "whoNeedsIt": [
    "Patients with joint pain, fatigue, or rashes",
    "Patients with unexplained inflammation",
    "Family history of autoimmune disease"
  ],
  "symptoms": [
    "Joint pain",
    "Skin rash",
    "Fatigue",
    "Hair loss",
    "Mouth sores",
    "Raynaud's phenomenon"
  ],
  "conditionsDetected": [
    "Systemic lupus erythematosus",
    "Sjogren's syndrome",
    "Rheumatoid arthritis",
    "Scleroderma",
    "Dermatomyositis"
  ],
  "preparation": [
    "No fasting required",
    "Note biotin interference"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-5 days",
  "normalRange": "Negative (titer <1:40)",
  "highResults": "Positive ANA at high titers >1:160 suggests autoimmune disease. Pattern helps narrow diagnosis.",
  "lowResults": "ANA can be positive in healthy individuals (5-15%), especially elderly women. A negative ANA makes lupus unlikely.",
  "interpretation": "ANA is sensitive but not specific. High titer with clinical symptoms warrants further testing such as anti-dsDNA and anti-Smith.",
  "relatedTests": [
    "anti-dsDNA",
    "anti-smith",
    "complement-c3",
    "complement-c4"
  ],
  "relatedDiseases": [
    "Lupus",
    "Sjogren's",
    "Rheumatoid arthritis"
  ],
  "relatedPackages": [
    "autoimmune-panel"
  ],
  "faqs": [
    {
      "question": "What does positive ANA mean?",
      "answer": "Autoantibodies present. May indicate autoimmune disease but also 5-15% of healthy people have low-positive ANA."
    },
    {
      "question": "What titer is significant?",
      "answer": ">1:160 is generally considered significant, especially with symptoms."
    },
    {
      "question": "What pattern matters?",
      "answer": "Homogeneous suggests lupus, speckled suggests Sjogren's or scleroderma, nucleolar suggests scleroderma."
    },
    {
      "question": "Can ANA be falsely positive?",
      "answer": "Yes, infections, medications, and aging can cause low-positive ANA."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ACR - ANA Testing: https://www.rheumatology.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "ANA",
    "antinuclear antibody",
    "lupus",
    "autoimmune"
  ]
},
{
  "slug": "anti-dsDNA",
  "name": "Anti-Double-Stranded DNA (Anti-dsDNA)",
  "shortName": "Anti-dsDNA",
  "category": "Immunology & Serology",
  "subcategory": "Autoimmune",
  "description": "Anti-dsDNA is a highly specific antibody for systemic lupus erythematosus (SLE). Levels often correlate with disease activity.",
  "purpose": "To diagnose lupus and monitor disease activity.",
  "whyDone": [
    "To confirm lupus diagnosis",
    "To monitor lupus disease activity and flares",
    "To assess kidney involvement in lupus"
  ],
  "whoNeedsIt": [
    "Patients with positive ANA and suspected lupus"
  ],
  "symptoms": [
    "Joint pain",
    "Skin rash",
    "Kidney problems",
    "Fatigue",
    "Hair loss"
  ],
  "conditionsDetected": [
    "Systemic lupus erythematosus",
    "Lupus nephritis"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-5 days",
  "normalRange": "Negative (<30 IU/mL)",
  "highResults": "Elevated anti-dsDNA confirms lupus diagnosis. Rising levels suggest flare, especially lupus nephritis.",
  "lowResults": "Negative result makes lupus less likely.",
  "interpretation": "Highly specific for SLE (>95%). Titers correlate with disease activity, especially nephritis.",
  "relatedTests": [
    "ana",
    "complement-c3",
    "complement-c4",
    "urine-protein"
  ],
  "relatedDiseases": [
    "Lupus",
    "Lupus nephritis"
  ],
  "relatedPackages": [
    "autoimmune-panel"
  ],
  "faqs": [
    {
      "question": "How specific is this for lupus?",
      "answer": ">95% specific. If positive with lupus symptoms, diagnosis is highly likely."
    },
    {
      "question": "Do levels correlate with flares?",
      "answer": "Yes, rising levels often precede clinical flares, especially kidney involvement."
    },
    {
      "question": "What is the treatment?",
      "answer": "Immunosuppressants like hydroxychloroquine, corticosteroids, or mycophenolate for kidney involvement."
    },
    {
      "question": "How often should it be monitored?",
      "answer": "Every 3-6 months or more frequently during active disease."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "Lupus Foundation - Anti-dsDNA: https://www.lupus.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "anti-dsDNA",
    "dsDNA",
    "lupus",
    "SLE",
    "lupus nephritis"
  ]
},
{
  "slug": "anti-ccp",
  "name": "Anti-Cyclic Citrullinated Peptide (Anti-CCP)",
  "shortName": "Anti-CCP",
  "category": "Immunology & Serology",
  "subcategory": "Autoimmune",
  "description": "Anti-CCP is a highly specific marker for rheumatoid arthritis, often appearing before symptoms onset.",
  "purpose": "To diagnose rheumatoid arthritis and predict severity.",
  "whyDone": [
    "To diagnose rheumatoid arthritis early",
    "To predict joint destruction risk",
    "To differentiate RA from other forms of arthritis"
  ],
  "whoNeedsIt": [
    "Patients with joint pain and suspected RA",
    "Patients with positive RF"
  ],
  "symptoms": [
    "Joint swelling and pain",
    "Morning stiffness >30 minutes",
    "Symmetrical joint involvement"
  ],
  "conditionsDetected": [
    "Rheumatoid arthritis"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-5 days",
  "normalRange": "Negative (<20 U/mL)",
  "highResults": "Highly specific for rheumatoid arthritis. Positive result indicates aggressive RA with higher risk of joint destruction.",
  "lowResults": "Negative result makes RA less likely, especially combined with negative RF.",
  "interpretation": "Anti-CCP is more specific (95-98%) than RF for RA. Can appear years before symptoms. Predicts erosive disease.",
  "relatedTests": [
    "rf",
    "esr",
    "crp"
  ],
  "relatedDiseases": [
    "Rheumatoid arthritis"
  ],
  "relatedPackages": [
    "autoimmune-panel",
    "arthritis-panel"
  ],
  "faqs": [
    {
      "question": "How early can it appear?",
      "answer": "Can be positive years before symptoms, making it useful for early diagnosis."
    },
    {
      "question": "Is it better than RF?",
      "answer": "More specific (95% vs 70-80%). Both together improve diagnostic accuracy."
    },
    {
      "question": "What does it predict?",
      "answer": "Higher risk of erosive joint disease and more aggressive RA."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "Can it be used for monitoring?",
      "answer": "Less useful for monitoring than RF. Levels do not consistently track with disease activity."
    }
  ],
  "references": [
    "ACR - RA Classification: https://www.rheumatology.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "anti-CCP",
    "rheumatoid arthritis",
    "RA",
    "autoimmune"
  ]
},
{
  "slug": "rf",
  "name": "Rheumatoid Factor (RF)",
  "shortName": "RF",
  "category": "Immunology & Serology",
  "subcategory": "Autoimmune",
  "description": "RF is an autoantibody directed against IgG. Elevated in rheumatoid arthritis and other autoimmune and infectious conditions.",
  "purpose": "To help diagnose rheumatoid arthritis and Sjogren's syndrome.",
  "whyDone": [
    "To support RA diagnosis",
    "To evaluate Sjogren's syndrome",
    "To investigate chronic inflammatory conditions"
  ],
  "whoNeedsIt": [
    "Patients with joint pain",
    "Patients with dry eyes and mouth",
    "Patients with suspected autoimmune disease"
  ],
  "symptoms": [
    "Joint swelling and pain",
    "Morning stiffness",
    "Dry eyes and mouth",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Rheumatoid arthritis",
    "Sjogren's syndrome",
    "Cryoglobulinemia",
    "Chronic infections"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 days",
  "normalRange": "<14 IU/mL (Negative), 14-30 (Equivocal), >30 (Positive)",
  "highResults": "Elevated in RA (60-80% of patients), Sjogren's, cryoglobulinemia, and chronic infections.",
  "lowResults": "Low or negative RF does not rule out RA. 20-30% of RA patients are RF-negative.",
  "interpretation": "RF is sensitive but not specific for RA. Combined with anti-CCP improves RA diagnosis.",
  "relatedTests": [
    "anti-ccp",
    "esr",
    "crp"
  ],
  "relatedDiseases": [
    "Rheumatoid arthritis",
    "Sjogren's syndrome",
    "Cryoglobulinemia"
  ],
  "relatedPackages": [
    "autoimmune-panel",
    "arthritis-panel"
  ],
  "faqs": [
    {
      "question": "What does positive RF mean?",
      "answer": "Autoantibody present. Most commonly associated with RA but also seen in infections, Sjogren's, and aging."
    },
    {
      "question": "Is it specific for RA?",
      "answer": "No. About 5% of healthy elderly people have positive RF. Anti-CCP is more specific."
    },
    {
      "question": "Can infections cause positive RF?",
      "answer": "Yes, hepatitis C, endocarditis, and other chronic infections can elevate RF."
    },
    {
      "question": "Should RF be monitored?",
      "answer": "In RA, declining RF may indicate treatment response."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ACR - RF Testing: https://www.rheumatology.org/"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "RF",
    "rheumatoid factor",
    "rheumatoid arthritis",
    "Sjogren's"
  ]
},
{
  "slug": "crp",
  "name": "C-Reactive Protein (CRP)",
  "shortName": "CRP",
  "category": "Immunology & Serology",
  "subcategory": "Inflammation",
  "description": "CRP is an acute-phase protein produced by the liver in response to inflammation. Levels rise rapidly during infection or tissue injury.",
  "purpose": "To detect and monitor acute inflammation and infection.",
  "whyDone": [
    "To detect acute inflammation or infection",
    "To monitor treatment response in inflammatory conditions",
    "To assess cardiovascular risk (hs-CRP)"
  ],
  "whoNeedsIt": [
    "Patients with fever or suspected infection",
    "Patients with autoimmune disease flare",
    "Cardiovascular risk assessment"
  ],
  "symptoms": [
    "Fever",
    "Joint pain",
    "Swelling",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Infection",
    "Autoimmune disease flare",
    "Tissue injury",
    "Cardiovascular disease"
  ],
  "preparation": [
    "No fasting required for standard CRP. hs-CRP requires fasting."
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "4-24 hours",
  "normalRange": "<3.0 mg/L (Normal), 3-10 (Mild elevation), 10-40 (Moderate), >40 (Severe)",
  "highResults": "High CRP indicates acute infection, autoimmune flare, or tissue injury. Very high >100 usually bacterial infection.",
  "lowResults": "Low CRP indicates absence of significant acute inflammation.",
  "interpretation": "CRP rises within 6 hours of inflammation onset and peaks at 48 hours. Useful for monitoring treatment response.",
  "relatedTests": [
    "esr",
    "procalcitonin",
    "cbc"
  ],
  "relatedDiseases": [
    "Infection",
    "Autoimmune disease",
    "Cardiovascular disease"
  ],
  "relatedPackages": [
    "infection-panel",
    "inflammation-panel"
  ],
  "faqs": [
    {
      "question": "How quickly does CRP rise?",
      "answer": "Within 6 hours of inflammation onset, peaks at 48 hours."
    },
    {
      "question": "What does very high CRP mean?",
      "answer": ">100 mg/L usually indicates serious bacterial infection, severe tissue injury, or active autoimmune disease."
    },
    {
      "question": "Difference from ESR?",
      "answer": "CRP rises faster and falls faster. ESR changes more slowly. CRP is better for acute monitoring."
    },
    {
      "question": "Is fasting required?",
      "answer": "Not for standard CRP. Required for hs-CRP (cardiovascular risk)."
    },
    {
      "question": "What is hs-CRP?",
      "answer": "High-sensitivity CRP measures low levels for cardiovascular risk assessment. >3.0 mg/L indicates higher risk."
    }
  ],
  "references": [
    "CDC - CRP: https://www.cdc.gov/"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "CRP",
    "C-reactive protein",
    "inflammation",
    "infection"
  ]
},
{
  "slug": "hs-crp",
  "name": "High-Sensitivity C-Reactive Protein (hs-CRP)",
  "shortName": "hs-CRP",
  "category": "Immunology & Serology",
  "subcategory": "Cardiovascular",
  "description": "hs-CRP measures low levels of CRP to assess cardiovascular disease risk. Chronic low-grade inflammation contributes to atherosclerosis.",
  "purpose": "To assess cardiovascular disease risk.",
  "whyDone": [
    "To evaluate cardiovascular risk",
    "To stratify heart attack and stroke risk",
    "To monitor response to cardiovascular risk reduction"
  ],
  "whoNeedsIt": [
    "Adults at intermediate cardiovascular risk",
    "Patients with family history of heart disease",
    "Patients with metabolic syndrome"
  ],
  "symptoms": [
    "Usually asymptomatic until event",
    "Risk factors: smoking, diabetes, hypertension, obesity"
  ],
  "conditionsDetected": [
    "Cardiovascular disease",
    "Atherosclerosis"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended",
    "Avoid acute infection or inflammation testing"
  ],
  "procedure": "Blood drawn from a vein after fasting.",
  "sampleType": "Serum",
  "turnaroundTime": "4-24 hours",
  "normalRange": "<1.0 mg/L (Low risk), 1.0-3.0 (Average risk), >3.0 (High risk)",
  "highResults": "High hs-CRP indicates increased cardiovascular risk. >3.0 mg/L warrants aggressive risk factor management.",
  "lowResults": "Low hs-CRP indicates lower cardiovascular risk.",
  "interpretation": "hs-CRP should be measured twice for accuracy. Used alongside lipid panel for comprehensive risk assessment.",
  "relatedTests": [
    "lipid-profile",
    "lipoprotein-a",
    "homocysteine"
  ],
  "relatedDiseases": [
    "Cardiovascular disease",
    "Atherosclerosis"
  ],
  "relatedPackages": [
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "How is it different from regular CRP?",
      "answer": "hs-CRP measures lower levels more precisely. Used for cardiovascular risk, not acute infection."
    },
    {
      "question": "What level is concerning?",
      "answer": ">3.0 mg/L indicates higher cardiovascular risk. >10 suggests acute inflammation - retest later."
    },
    {
      "question": "Is it affected by infections?",
      "answer": "Yes, acute infections raise CRP. Test when well, not during illness."
    },
    {
      "question": "What reduces hs-CRP?",
      "answer": "Statin therapy, weight loss, exercise, smoking cessation, healthy diet."
    },
    {
      "question": "How often should it be tested?",
      "answer": "Every 1-2 years for cardiovascular risk monitoring."
    }
  ],
  "references": [
    "AHA - hs-CRP: https://www.heart.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "hs-CRP",
    "cardiovascular risk",
    "heart disease",
    "inflammation"
  ]
},
{
  "slug": "immunoglobulins",
  "name": "Serum Immunoglobulins (IgG, IgA, IgM)",
  "shortName": "Immunoglobulins",
  "category": "Immunology & Serology",
  "subcategory": "Immune Function",
  "description": "Immunoglobulins are antibodies produced by B cells. IgG, IgA, and IgM levels assess immune function and detect immune deficiency or overactivity.",
  "purpose": "To evaluate immune function and diagnose immunodeficiency or immune dysregulation.",
  "whyDone": [
    "To diagnose immune deficiency",
    "To investigate recurrent infections",
    "To evaluate multiple myeloma and lymphoma"
  ],
  "whoNeedsIt": [
    "Patients with recurrent infections",
    "Patients with suspected immunodeficiency",
    "Patients with chronic diarrhea"
  ],
  "symptoms": [
    "Recurrent infections",
    "Chronic diarrhea",
    "Failure to thrive (children)"
  ],
  "conditionsDetected": [
    "Primary immunodeficiency",
    "Common variable immunodeficiency",
    "Multiple myeloma",
    "IgA deficiency"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-5 days",
  "normalRange": "IgG: 700-1600 mg/dL, IgA: 70-400 mg/dL, IgM: 40-235 mg/dL",
  "highResults": "Elevated immunoglobulins indicate chronic infection, autoimmune disease, or lymphoproliferative disorders.",
  "lowResults": "Low immunoglobulins indicate primary or secondary immunodeficiency.",
  "interpretation": "IgG subclass deficiency can cause recurrent infections even with normal total IgG.",
  "relatedTests": [
    "cbc",
    "s-pep",
    "hiv"
  ],
  "relatedDiseases": [
    "Immunodeficiency",
    "Multiple myeloma",
    "Lymphoma"
  ],
  "relatedPackages": [
    "immunodeficiency-panel"
  ],
  "faqs": [
    {
      "question": "Which immunoglobulin is most important?",
      "answer": "IgG is most abundant. IgA protects mucosal surfaces. IgM is first response to infection."
    },
    {
      "question": "What causes low immunoglobulins?",
      "answer": "Primary immunodeficiency, immunosuppressive therapy, nephrotic syndrome, protein-losing enteropathy."
    },
    {
      "question": "What causes high immunoglobulins?",
      "answer": "Chronic infection, autoimmune disease, multiple myeloma, liver disease."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "What is selective IgA deficiency?",
      "answer": "Most common primary immunodeficiency. May cause allergic reactions to blood transfusions."
    }
  ],
  "references": [
    "IDSA - Immunodeficiency: https://www.idsociety.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "immunoglobulins",
    "IgG",
    "IgA",
    "IgM",
    "immune function",
    "immunodeficiency"
  ]
},
{
  "slug": "complement-c3",
  "name": "Complement Component C3",
  "shortName": "C3",
  "category": "Immunology & Serology",
  "subcategory": "Immune Function",
  "description": "C3 is a key complement protein involved in immune defense. Low levels indicate consumption due to immune complex disease.",
  "purpose": "To assess complement system activity and monitor autoimmune disease.",
  "whyDone": [
    "To monitor lupus activity",
    "To evaluate immune complex disease",
    "To diagnose complement deficiency"
  ],
  "whoNeedsIt": [
    "Patients with lupus",
    "Patients with recurrent infections",
    "Patients with vasculitis"
  ],
  "symptoms": [
    "Joint pain",
    "Skin rash",
    "Kidney problems",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Lupus",
    "Glomerulonephritis",
    "Vasculitis",
    "Hereditary angioedema"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 days",
  "normalRange": "90-180 mg/dL",
  "highResults": "High C3 may indicate acute inflammation or infection.",
  "lowResults": "Low C3 indicates complement consumption in lupus, glomerulonephritis, or vasculitis.",
  "interpretation": "Low C3 with low C4 suggests immune complex activation (lupus nephritis). Low C3 with normal C4 may indicate alternative pathway activation.",
  "relatedTests": [
    "complement-c4",
    "ana",
    "anti-dsDNA"
  ],
  "relatedDiseases": [
    "Lupus",
    "Glomerulonephritis"
  ],
  "relatedPackages": [
    "autoimmune-panel",
    "lupus-panel"
  ],
  "faqs": [
    {
      "question": "What does low C3 mean?",
      "answer": "Complement is being consumed, often due to immune complex disease like lupus nephritis."
    },
    {
      "question": "How is it used in lupus?",
      "answer": "Falling C3/C4 levels often precede flare. Rising levels indicate treatment response."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "What causes high C3?",
      "answer": "Acute inflammation, infection, or pregnancy."
    },
    {
      "question": "What is hereditary angioedema?",
      "answer": "C1 esterase inhibitor deficiency causing recurrent swelling. C4 is usually low."
    }
  ],
  "references": [
    "ACR - Complement Testing: https://www.rheumatology.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "C3",
    "complement",
    "lupus",
    "immune function"
  ]
},
{
  "slug": "complement-c4",
  "name": "Complement Component C4",
  "shortName": "C4",
  "category": "Immunology & Serology",
  "subcategory": "Immune Function",
  "description": "C4 is part of the classical complement pathway. Low levels indicate immune complex activation or hereditary angioedema.",
  "purpose": "To complement C3 testing in autoimmune evaluation.",
  "whyDone": [
    "To monitor lupus activity",
    "To diagnose hereditary angioedema",
    "To evaluate vasculitis"
  ],
  "whoNeedsIt": [
    "Patients with lupus",
    "Patients with recurrent angioedema",
    "Patients with vasculitis"
  ],
  "symptoms": [
    "Facial swelling",
    "Lip/tongue swelling",
    "Joint pain",
    "Skin rash"
  ],
  "conditionsDetected": [
    "Hereditary angioedema",
    "Lupus",
    "Vasculitis",
    "Immune complex disease"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 days",
  "normalRange": "10-40 mg/dL",
  "highResults": "High C4 may indicate acute inflammation.",
  "lowResults": "Low C4 with low C3 suggests immune complex activation (lupus). Low C4 with normal C3 may indicate hereditary angioedema.",
  "interpretation": "C4 is more sensitive than C3 for detecting immune complex consumption. Persistently low C4 with normal C3 suggests hereditary angioedema.",
  "relatedTests": [
    "complement-c3",
    "ana",
    "c1-esterase-inhibitor"
  ],
  "relatedDiseases": [
    "Hereditary angioedema",
    "Lupus",
    "Vasculitis"
  ],
  "relatedPackages": [
    "autoimmune-panel"
  ],
  "faqs": [
    {
      "question": "What is hereditary angioedema?",
      "answer": "Genetic condition causing recurrent swelling. C4 is usually low even between attacks."
    },
    {
      "question": "How is it used with C3?",
      "answer": "Both low suggests immune complex disease (lupus). Low C4 with normal C3 suggests hereditary angioedema."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "What causes false low C4?",
      "answer": "Acute inflammation, recent infection, or sample hemolysis."
    },
    {
      "question": "Can it normalize during lupus remission?",
      "answer": "Yes, C4 often normalizes during remission and drops before flares."
    }
  ],
  "references": [
    "ACR - Complement Testing: https://www.rheumatology.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "C4",
    "complement",
    "hereditary angioedema",
    "lupus"
  ]
},
{
  "slug": "anca",
  "name": "Anti-Neutrophil Cytoplasmic Antibodies (ANCA)",
  "shortName": "ANCA",
  "category": "Immunology & Serology",
  "subcategory": "Autoimmune",
  "description": "ANCA are autoantibodies targeting neutrophil cytoplasmic antigens. They are markers for systemic vasculitis.",
  "purpose": "To diagnose ANCA-associated vasculitis.",
  "whyDone": [
    "To diagnose vasculitis",
    "To evaluate kidney disease of unknown cause",
    "To differentiate types of vasculitis"
  ],
  "whoNeedsIt": [
    "Patients with kidney disease of unknown cause",
    "Patients with suspected vasculitis",
    "Patients with lung hemorrhage"
  ],
  "symptoms": [
    "Kidney damage",
    "Lung hemorrhage",
    "Sinusitis",
    "Skin ulcers",
    "Nerve damage"
  ],
  "conditionsDetected": [
    "Granulomatosis with polyangiitis",
    "Microscopic polyangiitis",
    "Eosinophilic granulomatosis with polyangiitis"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-5 days",
  "normalRange": "Negative",
  "highResults": "Positive ANCA with symptoms confirms ANCA-associated vasculitis. c-ANCA/PR3 is GPA-specific. p-ANCA/MPO is MPA/EGPA-specific.",
  "lowResults": "Negative ANCA makes ANCA-associated vasculitis unlikely but does not exclude all vasculitis types.",
  "interpretation": "c-ANCA (PR3) is specific for GPA. p-ANCA (MPO) is seen in MPA and EGPA. Atypical ANCA seen in autoimmune hepatitis.",
  "relatedTests": [
    "ana",
    "crp",
    "esr",
    "cbc"
  ],
  "relatedDiseases": [
    "Vasculitis",
    "GPA",
    "MPA",
    "EGPA"
  ],
  "relatedPackages": [
    "vasculitis-panel"
  ],
  "faqs": [
    {
      "question": "What types of ANCA exist?",
      "answer": "c-ANCA (PR3) for GPA. p-ANCA (MPO) for MPA/EGPA. Atypical for autoimmune hepatitis."
    },
    {
      "question": "How specific is ANCA for vasculitis?",
      "answer": "c-ANCA/PR3 is highly specific for GPA. p-ANCA/MPO is less specific."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "How is ANCA used for monitoring?",
      "answer": "Rising ANCA levels may predict relapse, especially in GPA."
    },
    {
      "question": "What is GPA?",
      "answer": "Granulomatosis with polyangiitis - affects lungs, kidneys, sinuses, and other organs."
    }
  ],
  "references": [
    "ANCA vasculitis guidelines: https://www.rheumatology.org/"
  ],
  "price": 450,
  "homeCollection": true,
  "tags": [
    "ANCA",
    "vasculitis",
    "GPA",
    "MPA",
    "autoimmune"
  ]
},
{
  "slug": "anti-tpo",
  "name": "Anti-Thyroid Peroxidase Antibodies (Anti-TPO)",
  "shortName": "Anti-TPO",
  "category": "Immunology & Serology",
  "subcategory": "Autoimmune",
  "description": "Anti-TPO are autoantibodies against thyroid peroxidase, a key enzyme in thyroid hormone production. They are markers of autoimmune thyroid disease.",
  "purpose": "To diagnose autoimmune thyroid disease.",
  "whyDone": [
    "To diagnose Hashimoto's thyroiditis",
    "To investigate hypothyroidism of unknown cause",
    "To evaluate thyroid dysfunction in pregnancy"
  ],
  "whoNeedsIt": [
    "Patients with hypothyroidism",
    "Pregnant women with thyroid dysfunction",
    "Patients with family history of autoimmune thyroid disease"
  ],
  "symptoms": [
    "Fatigue",
    "Weight gain",
    "Hair loss",
    "Cold intolerance",
    "Goiter"
  ],
  "conditionsDetected": [
    "Hashimoto's thyroiditis",
    "Graves' disease",
    "Postpartum thyroiditis"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-5 days",
  "normalRange": "Negative (<35 IU/mL)",
  "highResults": "Positive Anti-TPO confirms autoimmune thyroid disease. Present in 90-95% of Hashimoto's and 60-80% of Graves'.",
  "lowResults": "Negative Anti-TPO does not exclude thyroid disease but makes autoimmune cause less likely.",
  "interpretation": "Anti-TPO is the most sensitive marker for Hashimoto's. May be positive years before hypothyroidism develops.",
  "relatedTests": [
    "tsh",
    "free-t4",
    "anti-thyroglobulin"
  ],
  "relatedDiseases": [
    "Hashimoto's thyroiditis",
    "Graves' disease"
  ],
  "relatedPackages": [
    "thyroid-panel"
  ],
  "faqs": [
    {
      "question": "How sensitive is Anti-TPO?",
      "answer": "90-95% sensitive for Hashimoto's. Most sensitive single test for autoimmune thyroid disease."
    },
    {
      "question": "Does it mean I need treatment?",
      "answer": "Not necessarily. Many people have positive Anti-TPO with normal thyroid function. Monitor TSH."
    },
    {
      "question": "Can it be positive in pregnancy?",
      "answer": "Yes, and may increase risk of postpartum thyroiditis. Monitor thyroid function."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "How often should it be retested?",
      "answer": "Usually once for diagnosis. Repeat if thyroid function changes."
    }
  ],
  "references": [
    "ATA - Thyroid Antibodies: https://www.thyroid.org/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "Anti-TPO",
    "thyroid antibodies",
    "Hashimoto's",
    "autoimmune thyroid"
  ]
},
{
  "slug": "anti-thyroglobulin",
  "name": "Anti-Thyroglobulin Antibodies (Anti-Tg)",
  "shortName": "Anti-Tg",
  "category": "Immunology & Serology",
  "subcategory": "Autoimmune",
  "description": "Anti-Tg are autoantibodies against thyroglobulin, the protein precursor of thyroid hormones. They are markers of autoimmune thyroid disease.",
  "purpose": "To complement Anti-TPO in diagnosing autoimmune thyroid disease.",
  "whyDone": [
    "To diagnose autoimmune thyroid disease",
    "To monitor thyroid cancer recurrence",
    "To evaluate thyroid dysfunction"
  ],
  "whoNeedsIt": [
    "Patients with thyroid disease",
    "Thyroid cancer patients on surveillance",
    "Patients with positive Anti-TPO"
  ],
  "symptoms": [
    "Fatigue",
    "Weight changes",
    "Thyroid swelling"
  ],
  "conditionsDetected": [
    "Hashimoto's thyroiditis",
    "Graves' disease",
    "Thyroid cancer"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-5 days",
  "normalRange": "Negative (<40 IU/mL)",
  "highResults": "Positive Anti-Tg with positive Anti-TPO confirms autoimmune thyroid disease. In thyroid cancer, rising levels may indicate recurrence.",
  "lowResults": "Negative Anti-Tg does not exclude thyroid disease.",
  "interpretation": "Anti-Tg is less sensitive than Anti-TPO for Hashimoto's but useful for thyroid cancer surveillance.",
  "relatedTests": [
    "anti-tpo",
    "tsh",
    "thyroglobulin"
  ],
  "relatedDiseases": [
    "Hashimoto's",
    "Thyroid cancer"
  ],
  "relatedPackages": [
    "thyroid-panel"
  ],
  "faqs": [
    {
      "question": "How is it used in thyroid cancer?",
      "answer": "After thyroidectomy, rising Anti-Tg may indicate recurrence. Used with thyroglobulin monitoring."
    },
    {
      "question": "Is it the same as Anti-TPO?",
      "answer": "No, different targets. Anti-TPO targets thyroid peroxidase. Anti-Tg targets thyroglobulin."
    },
    {
      "question": "Can it be positive in healthy people?",
      "answer": "Yes, 5-10% of healthy individuals have low-positive Anti-Tg."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "When should thyroid cancer patients be tested?",
      "answer": "Every 6-12 months after treatment. Rising levels warrant further investigation."
    }
  ],
  "references": [
    "ATA - Thyroid Cancer Follow-up: https://www.thyroid.org/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "Anti-Tg",
    "thyroglobulin antibodies",
    "thyroid cancer",
    "Hashimoto's"
  ]
},
{
  "slug": "dengue-ns1",
  "name": "Dengue NS1 Antigen",
  "shortName": "Dengue NS1",
  "category": "Infectious Disease",
  "subcategory": "Vector-borne",
  "description": "Dengue NS1 protein is released into blood during early viral replication. It is detectable before antibodies develop.",
  "purpose": "To diagnose dengue fever in the first 5 days of illness.",
  "whyDone": [
    "To detect early dengue infection",
    "To confirm dengue before antibodies appear",
    "To differentiate dengue from other febrile illnesses"
  ],
  "whoNeedsIt": [
    "Patients with fever and travel to dengue-endemic areas",
    "Patients with acute febrile illness in tropical regions"
  ],
  "symptoms": [
    "High fever",
    "Severe headache",
    "Pain behind eyes",
    "Joint pain",
    "Muscle pain",
    "Skin rash"
  ],
  "conditionsDetected": [
    "Dengue fever",
    "Dengue hemorrhagic fever"
  ],
  "preparation": [
    "Test within first 5 days of fever onset",
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum/Plasma",
  "turnaroundTime": "2-4 hours",
  "normalRange": "Negative",
  "highResults": "Positive NS1 confirms early dengue infection. Most sensitive in first 3 days.",
  "lowResults": "Negative NS1 does not rule out dengue if tested late (>5 days). Serology needed.",
  "interpretation": "NS1 is positive in 80-90% of dengue cases in first 3 days. Sensitivity declines after day 5.",
  "relatedTests": [
    "dengue-igm",
    "dengue-igg",
    "cbc"
  ],
  "relatedDiseases": [
    "Dengue fever",
    "Dengue hemorrhagic fever"
  ],
  "relatedPackages": [
    "dengue-panel",
    "fever-panel"
  ],
  "faqs": [
    {
      "question": "When is NS1 positive?",
      "answer": "Days 1-5 of fever. Most sensitive in first 3 days."
    },
    {
      "question": "What if NS1 is negative?",
      "answer": "May be tested too late. Dengue IgM/IgG serology should be ordered if symptoms persist."
    },
    {
      "question": "Can it distinguish dengue types?",
      "answer": "No. NS1 is positive for all dengue serotypes."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "How does it compare to PCR?",
      "answer": "Both detect early infection. NS1 is faster and more widely available."
    }
  ],
  "references": [
    "WHO - Dengue Diagnosis: https://www.who.int/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "dengue",
    "NS1",
    "dengue fever",
    "vector-borne",
    "tropical"
  ]
},
{
  "slug": "dengue-igm",
  "name": "Dengue IgM Antibody",
  "shortName": "Dengue IgM",
  "category": "Infectious Disease",
  "subcategory": "Vector-borne",
  "description": "Dengue IgM antibodies appear 4-5 days after fever onset and persist for 2-3 months. They indicate recent or current infection.",
  "purpose": "To confirm recent dengue infection after the acute phase.",
  "whyDone": [
    "To confirm recent dengue infection",
    "To diagnose dengue in later stages",
    "To differentiate from previous dengue exposure"
  ],
  "whoNeedsIt": [
    "Patients with fever >5 days",
    "Patients with suspected dengue after acute phase"
  ],
  "symptoms": [
    "Fever",
    "Joint pain",
    "Rash",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Dengue fever",
    "Recent dengue infection"
  ],
  "preparation": [
    "Test after day 5 of fever",
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 hours",
  "normalRange": "Negative",
  "highResults": "Positive IgM indicates recent dengue infection. May cross-react with other flaviviruses.",
  "lowResults": "Negative IgM with symptoms may indicate early infection (test NS1) or past infection.",
  "interpretation": "IgM appears 4-5 days post-fever. Cross-reactivity with other flaviviruses is a limitation.",
  "relatedTests": [
    "dengue-ns1",
    "dengue-igg",
    "cbc"
  ],
  "relatedDiseases": [
    "Dengue fever",
    "Zika",
    "Chikungunya"
  ],
  "relatedPackages": [
    "dengue-panel",
    "fever-panel"
  ],
  "faqs": [
    {
      "question": "When does IgM appear?",
      "answer": "4-5 days after fever onset. Peaks around 2 weeks."
    },
    {
      "question": "How long does it last?",
      "answer": "2-3 months after infection."
    },
    {
      "question": "Can it cross-react?",
      "answer": "Yes, with Zika, Chikungunya, and other flaviviruses."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "What if both NS1 and IgM are negative?",
      "answer": "May be too early (test NS1) or too late (test IgG). Consider other diagnoses."
    }
  ],
  "references": [
    "WHO - Dengue Diagnosis: https://www.who.int/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "dengue IgM",
    "dengue antibodies",
    "recent infection"
  ]
},
{
  "slug": "dengue-igg",
  "name": "Dengue IgG Antibody",
  "shortName": "Dengue IgG",
  "category": "Infectious Disease",
  "subcategory": "Vector-borne",
  "description": "Dengue IgG antibodies appear 10-14 days after fever onset and persist for life. They indicate past infection or secondary infection.",
  "purpose": "To determine past dengue exposure or secondary infection.",
  "whyDone": [
    "To assess past dengue exposure",
    "To identify secondary dengue infection",
    "To determine immune status before travel"
  ],
  "whoNeedsIt": [
    "Patients with convalescent dengue",
    "Travelers to dengue areas",
    "Patients with suspected secondary dengue"
  ],
  "symptoms": [
    "Fever",
    "Joint pain",
    "Rash"
  ],
  "conditionsDetected": [
    "Past dengue infection",
    "Secondary dengue infection"
  ],
  "preparation": [
    "Test after day 10 of fever",
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "2-4 hours",
  "normalRange": "Negative",
  "highResults": "Positive IgG with high titer (>1:1280) suggests secondary infection. Four-fold rise confirms acute infection.",
  "lowResults": "Negative IgG indicates no past dengue exposure.",
  "interpretation": "IgG appears 10-14 days post-fever. Rising titers between acute and convalescent samples confirm recent infection.",
  "relatedTests": [
    "dengue-ns1",
    "dengue-igm"
  ],
  "relatedDiseases": [
    "Dengue fever",
    "Secondary dengue infection"
  ],
  "relatedPackages": [
    "dengue-panel"
  ],
  "faqs": [
    {
      "question": "When does IgG appear?",
      "answer": "10-14 days after fever onset. Persists for life."
    },
    {
      "question": "What indicates secondary infection?",
      "answer": "High titer IgG (>1:1280) or four-fold rise between acute and convalescent samples."
    },
    {
      "question": "Is it useful for acute diagnosis?",
      "answer": "No, appears too late. NS1 or IgM are better for acute diagnosis."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "Can it be used for immunity assessment?",
      "answer": "Yes, positive IgG indicates past exposure and some immunity."
    }
  ],
  "references": [
    "WHO - Dengue Diagnosis: https://www.who.int/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "dengue IgG",
    "past infection",
    "secondary dengue",
    "immunity"
  ]
},
{
  "slug": "malaria-parasite",
  "name": "Malaria Parasite (Thick and Thin Smear)",
  "shortName": "Malaria Smear",
  "category": "Infectious Disease",
  "subcategory": "Vector-borne",
  "description": "Microscopic examination of blood smears to detect and identify malaria parasites. Remains the gold standard for malaria diagnosis.",
  "purpose": "To diagnose malaria and identify species.",
  "whyDone": [
    "To confirm malaria diagnosis",
    "To identify malaria species",
    "To monitor treatment response"
  ],
  "whoNeedsIt": [
    "Patients with fever and travel to malaria-endemic areas",
    "Patients with fever, chills, and sweats"
  ],
  "symptoms": [
    "Cyclical fever",
    "Chills",
    "Sweats",
    "Headache",
    "Nausea",
    "Vomiting"
  ],
  "conditionsDetected": [
    "Plasmodium falciparum",
    "Plasmodium vivax",
    "Plasmodium ovale",
    "Plasmodium malariae"
  ],
  "preparation": [
    "Test during febrile episode",
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Whole blood (EDTA)",
  "turnaroundTime": "2-4 hours",
  "normalRange": "Negative for malaria parasites",
  "highResults": "Positive smear confirms malaria. Species identification guides treatment. Parasitemia level assesses severity.",
  "lowResults": "Negative smear does not rule out malaria. Repeat in 12-24 hours if clinical suspicion is high.",
  "interpretation": "Thick smear detects parasites (sensitive). Thin smear identifies species. Quantitative Buffy Coat (QBC) is alternative.",
  "relatedTests": [
    "rapid-malaria-test",
    "cbc",
    "ldh"
  ],
  "relatedDiseases": [
    "Malaria",
    "Plasmodium infection"
  ],
  "relatedPackages": [
    "malaria-panel",
    "fever-panel"
  ],
  "faqs": [
    {
      "question": "Is this the gold standard?",
      "answer": "Yes, microscopic smear remains gold standard for malaria diagnosis and species identification."
    },
    {
      "question": "What is parasitemia?",
      "answer": "Percentage of red blood cells infected. >5% in P. falciparum indicates severe malaria."
    },
    {
      "question": "How often should smears be repeated?",
      "answer": "Every 12-24 hours for 3 days if initial smear is negative but clinical suspicion is high."
    },
    {
      "question": "What is the difference between thick and thin smear?",
      "answer": "Thick: more sensitive, detects parasites. Thin: identifies species and assesses parasitemia."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "CDC - Malaria Diagnosis: https://www.cdc.gov/malaria/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "malaria",
    "Plasmodium",
    "blood smear",
    "vector-borne",
    "tropical"
  ]
},
{
  "slug": "widal-test",
  "name": "Widal Test (Typhoid Serology)",
  "shortName": "Widal",
  "category": "Infectious Disease",
  "subcategory": "Bacterial",
  "description": "The Widal test detects antibodies against Salmonella typhi O and H antigens. It is used to support typhoid fever diagnosis.",
  "purpose": "To support diagnosis of typhoid fever.",
  "whyDone": [
    "To diagnose typhoid fever",
    "To evaluate fever of unknown origin in endemic areas",
    "To confirm suspected enteric fever"
  ],
  "whoNeedsIt": [
    "Patients with prolonged fever in endemic areas",
    "Patients with suspected typhoid fever"
  ],
  "symptoms": [
    "Sustained fever",
    "Abdominal pain",
    "Headache",
    "Constipation or diarrhea",
    "Rose spots"
  ],
  "conditionsDetected": [
    "Typhoid fever",
    "Paratyphoid fever"
  ],
  "preparation": [
    "Test after day 7 of fever",
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "O antigen: <1:80, H antigen: <1:160",
  "highResults": "Rising titers (>4-fold) between acute and convalescent samples confirm typhoid.",
  "lowResults": "Low titers do not exclude typhoid. Early antibiotic use may reduce antibody response.",
  "interpretation": "Widal test has limitations: cross-reactivity, false positives in chronic carriers. Blood culture is gold standard.",
  "relatedTests": [
    "blood-culture",
    "cbc",
    "crp"
  ],
  "relatedDiseases": [
    "Typhoid fever",
    "Enteric fever"
  ],
  "relatedPackages": [
    "fever-panel"
  ],
  "faqs": [
    {
      "question": "Is Widal test reliable?",
      "answer": "Has significant limitations. Blood culture is gold standard. Widal is supportive evidence."
    },
    {
      "question": "When should it be tested?",
      "answer": "After day 7 of fever. Earlier testing may be falsely negative."
    },
    {
      "question": "What is a significant titer?",
      "answer": ">4-fold rise between acute and convalescent samples is most meaningful."
    },
    {
      "question": "Can it cross-react?",
      "answer": "Yes, with other Salmonella species, chronic carriers, and other infections."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "WHO - Typhoid Diagnosis: https://www.who.int/"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "Widal",
    "typhoid",
    "Salmonella",
    "enteric fever",
    "bacterial"
  ]
},
{
  "slug": "blood-culture",
  "name": "Blood Culture (Aerobic and Anaerobic)",
  "shortName": "Blood Culture",
  "category": "Infectious Disease",
  "subcategory": "Bacterial",
  "description": "Blood culture detects bacteria or fungi in the bloodstream. It is the gold standard for diagnosing bacteremia and sepsis.",
  "purpose": "To diagnose bloodstream infections and sepsis.",
  "whyDone": [
    "To identify causative organisms in bacteremia",
    "To guide antibiotic therapy",
    "To diagnose endocarditis and sepsis"
  ],
  "whoNeedsIt": [
    "Patients with suspected sepsis",
    "Patients with fever and chills",
    "Patients with central line infections",
    "Post-surgical patients with fever"
  ],
  "symptoms": [
    "High fever",
    "Chills",
    "Rapid heartbeat",
    "Low blood pressure",
    "Confusion"
  ],
  "conditionsDetected": [
    "Bacteremia",
    "Sepsis",
    "Endocarditis",
    "Central line infection"
  ],
  "preparation": [
    "Collect before starting antibiotics if possible",
    "Two sets from different sites",
    "Proper skin antisepsis"
  ],
  "procedure": "Blood drawn from two different venipuncture sites.",
  "sampleType": "Whole blood (aerobic and anaerobic bottles)",
  "turnaroundTime": "2-5 days (up to 14 for slow growers)",
  "normalRange": "Negative",
  "highResults": "Positive culture identifies causative organism and allows antibiotic sensitivity testing.",
  "lowResults": "Negative culture does not rule out infection if collected after antibiotics or from incorrect site.",
  "interpretation": "Collect at least 2 sets before antibiotics. 20-30 mL total blood for adults. Anaerobic cultures essential for gut organisms.",
  "relatedTests": [
    "procalcitonin",
    "crp",
    "cbc"
  ],
  "relatedDiseases": [
    "Sepsis",
    "Bacteremia",
    "Endocarditis"
  ],
  "relatedPackages": [
    "sepsis-workup"
  ],
  "faqs": [
    {
      "question": "How much blood is needed?",
      "answer": "20-30 mL total (10 mL per bottle) for adults. More blood increases sensitivity."
    },
    {
      "question": "How long does it take?",
      "answer": "Most positive within 24-48 hours. Some organisms take up to 14 days."
    },
    {
      "question": "Should I collect before antibiotics?",
      "answer": "Yes, if possible. Antibiotics can reduce culture sensitivity by 30-40%."
    },
    {
      "question": "How many sets are needed?",
      "answer": "At least 2 sets from different sites to distinguish contamination from true bacteremia."
    },
    {
      "question": "What is a common contaminant?",
      "answer": "Coagulase-negative staphylococci. Two positive sets with same organism equals true infection."
    }
  ],
  "references": [
    "IDSA - Blood Culture Guidelines: https://www.idsociety.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "blood culture",
    "bacteremia",
    "sepsis",
    "infection",
    "antibiotic sensitivity"
  ]
},
{
  "slug": "urine-culture",
  "name": "Urine Culture and Sensitivity",
  "shortName": "Urine Culture",
  "category": "Infectious Disease",
  "subcategory": "Bacterial",
  "description": "Urine culture identifies bacteria in the urinary tract and determines antibiotic sensitivity. Essential for diagnosing UTI and guiding treatment.",
  "purpose": "To diagnose urinary tract infection and guide antibiotic therapy.",
  "whyDone": [
    "To identify causative organism in UTI",
    "To determine antibiotic sensitivity",
    "To evaluate recurrent UTI"
  ],
  "whoNeedsIt": [
    "Patients with UTI symptoms",
    "Patients with recurrent UTI",
    "Patients with complicated UTI",
    "Pregnant women"
  ],
  "symptoms": [
    "Dysuria",
    "Frequent urination",
    "Urgency",
    "Cloudy urine",
    "Foul-smelling urine",
    "Flank pain"
  ],
  "conditionsDetected": [
    "Urinary tract infection",
    "Pyelonephritis",
    "Cystitis",
    "Asymptomatic bacteriuria (pregnancy)"
  ],
  "preparation": [
    "Clean-catch midstream urine preferred",
    "Avoid antibiotics before collection if possible"
  ],
  "procedure": "Clean-catch midstream urine sample.",
  "sampleType": "Urine",
  "turnaroundTime": "24-48 hours",
  "normalRange": "<100,000 CFU/mL (significant bacteriuria), <10,000 (contamination)",
  "highResults": "Positive culture with symptoms confirms UTI. >100,000 CFU/mL is significant.",
  "lowResults": "Low colony counts with symptoms may still indicate UTI, especially in symptomatic patients.",
  "interpretation": "Clean-catch midstream is critical. >100,000 CFU/mL with symptoms indicates UTI. >100,000 without symptoms in pregnant women should be treated.",
  "relatedTests": [
    "urine-routine",
    "cbc"
  ],
  "relatedDiseases": [
    "Urinary tract infection",
    "Pyelonephritis",
    "Cystitis"
  ],
  "relatedPackages": [
    "uti-panel"
  ],
  "faqs": [
    {
      "question": "What is significant bacteriuria?",
      "answer": ">100,000 CFU/mL from clean-catch midstream specimen."
    },
    {
      "question": "How do I collect properly?",
      "answer": "Clean midstream. First void discarded, midstream collected in sterile container."
    },
    {
      "question": "Can low counts mean infection?",
      "answer": "Yes, if symptoms are present. Also consider contamination or fastidious organisms."
    },
    {
      "question": "Is asymptomatic bacteriuria treated?",
      "answer": "Generally no, except in pregnant women and before urological procedures."
    },
    {
      "question": "How long for results?",
      "answer": "24-48 hours for preliminary, 48-72 hours for full sensitivity results."
    }
  ],
  "references": [
    "IDSA - UTI Guidelines: https://www.idsociety.org/"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "urine culture",
    "UTI",
    "urinary tract infection",
    "bacterial",
    "antibiotic sensitivity"
  ]
},
{
  "slug": "hepatitis-b-surface-antigen",
  "name": "Hepatitis B Surface Antigen (HBsAg)",
  "shortName": "HBsAg",
  "category": "Infectious Disease",
  "subcategory": "Viral",
  "description": "HBsAg is the first serological marker to appear in acute hepatitis B infection. Its presence indicates active infection or carrier state.",
  "purpose": "To detect active hepatitis B infection.",
  "whyDone": [
    "To screen for hepatitis B",
    "To identify carriers and infectious individuals",
    "To determine vaccination candidacy"
  ],
  "whoNeedsIt": [
    "Blood donors",
    "Pregnant women",
    "Healthcare workers",
    "IV drug users",
    "Sexual contacts of HBV patients"
  ],
  "symptoms": [
    "Fatigue",
    "Jaundice",
    "Abdominal pain",
    "Nausea"
  ],
  "conditionsDetected": [
    "Acute hepatitis B",
    "Chronic hepatitis B",
    "HBV carrier"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "Negative",
  "highResults": "Positive HBsAg indicates active hepatitis B infection. Persistence >6 months indicates chronic infection.",
  "lowResults": "Negative HBsAg indicates no active infection. Anti-HBs positive indicates immunity.",
  "interpretation": "First marker to appear. Persistent positivity >6 months equals chronic hepatitis B. Anti-HBs develops after resolution or vaccination.",
  "relatedTests": [
    "hepatitis-b-antibodies",
    "hepatitis-b-dna",
    "liver-function-test"
  ],
  "relatedDiseases": [
    "Hepatitis B",
    "Chronic hepatitis",
    "Liver cirrhosis"
  ],
  "relatedPackages": [
    "hepatitis-panel",
    "liver-screening"
  ],
  "faqs": [
    {
      "question": "What does positive HBsAg mean?",
      "answer": "Active hepatitis B infection. If >6 months, classified as chronic."
    },
    {
      "question": "Is it the same as HBV DNA?",
      "answer": "HBsAg indicates infection. HBV DNA quantifies viral load. Both important for management."
    },
    {
      "question": "When does it appear?",
      "answer": "2-8 weeks after exposure. Peaks during acute illness."
    },
    {
      "question": "What if HBsAg is positive?",
      "answer": "Further testing: HBV DNA, HBeAg, liver function. Determines if treatment needed."
    },
    {
      "question": "Can it be false positive?",
      "answer": "Rarely. Confirm with repeat testing."
    }
  ],
  "references": [
    "CDC - Hepatitis B: https://www.cdc.gov/hepatitis/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "HBsAg",
    "hepatitis B",
    "HBV",
    "liver disease",
    "viral hepatitis"
  ]
},
{
  "slug": "hepatitis-b-antibodies",
  "name": "Hepatitis B Antibodies (Anti-HBs, Anti-HBc, HBeAg)",
  "shortName": "Hep B Ab",
  "category": "Infectious Disease",
  "subcategory": "Viral",
  "description": "Hepatitis B antibody panel differentiates acute vs chronic infection, immunity, and infectivity. Includes Anti-HBs, Anti-HBc, and HBeAg.",
  "purpose": "To determine hepatitis B infection stage and immunity.",
  "whyDone": [
    "To differentiate acute vs chronic hepatitis B",
    "To assess immunity after vaccination",
    "To determine infectivity and treatment need"
  ],
  "whoNeedsIt": [
    "Patients with positive HBsAg",
    "Patients post-vaccination",
    "Patients with liver disease"
  ],
  "symptoms": [
    "Fatigue",
    "Jaundice",
    "Abdominal pain"
  ],
  "conditionsDetected": [
    "Acute hepatitis B",
    "Chronic hepatitis B",
    "Past infection with immunity",
    "Vaccine immunity"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "HBsAg: Negative, Anti-HBs: Negative or positive (vaccinated), Anti-HBc: Negative",
  "highResults": "Anti-HBs positive indicates immunity. Anti-HBc positive indicates past or current infection. HBeAg positive indicates high infectivity.",
  "lowResults": "Pattern of results determines infection stage. Isolated Anti-HBc may indicate past infection or false positive.",
  "interpretation": "Anti-HBs positive indicates immunity from past infection or vaccination. >10 mIU/mL is protective.",
  "relatedTests": [
    "hepatitis-b-surface-antigen",
    "hepatitis-b-dna",
    "liver-function-test"
  ],
  "relatedDiseases": [
    "Hepatitis B",
    "Liver cirrhosis"
  ],
  "relatedPackages": [
    "hepatitis-panel"
  ],
  "faqs": [
    {
      "question": "What does isolated Anti-HBc mean?",
      "answer": "Could be past resolved infection, false positive, or occult HBV. Needs further evaluation."
    },
    {
      "question": "What does Anti-HBs positive mean?",
      "answer": "Immunity from past infection or vaccination. >10 mIU/mL is protective."
    },
    {
      "question": "What does HBeAg positive mean?",
      "answer": "High viral replication and infectivity. Indicates active disease needing treatment."
    },
    {
      "question": "How is vaccine immunity determined?",
      "answer": "Anti-HBs >10 mIU/mL with negative HBsAg and Anti-HBc."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "CDC - Hepatitis B: https://www.cdc.gov/hepatitis/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "hepatitis B antibodies",
    "Anti-HBs",
    "Anti-HBc",
    "HBeAg",
    "immunity"
  ]
},
{
  "slug": "hepatitis-c-antibody",
  "name": "Hepatitis C Antibody (Anti-HCV)",
  "shortName": "Anti-HCV",
  "category": "Infectious Disease",
  "subcategory": "Viral",
  "description": "Anti-HCV detects antibodies to hepatitis C virus. It indicates past or present HCV infection. RNA testing confirms active infection.",
  "purpose": "To screen for hepatitis C infection.",
  "whyDone": [
    "To screen for hepatitis C",
    "To identify past or present HCV infection",
    "To evaluate patients with risk factors"
  ],
  "whoNeedsIt": [
    "Blood donors",
    "IV drug users (past or present)",
    "Patients with unexplained liver disease",
    "HIV-positive patients",
    "Recipients of blood products before 1992"
  ],
  "symptoms": [
    "Usually asymptomatic",
    "Fatigue",
    "Abdominal discomfort"
  ],
  "conditionsDetected": [
    "Hepatitis C infection",
    "Chronic hepatitis C"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "Negative",
  "highResults": "Positive Anti-HCV indicates exposure to hepatitis C. Does not distinguish past from active infection. HCV RNA needed to confirm.",
  "lowResults": "Negative Anti-HCV indicates no exposure. Window period: 8-12 weeks post-exposure.",
  "interpretation": "Antibody appears 8-12 weeks post-exposure. Positive result needs HCV RNA confirmation. False positives occur in low-prevalence populations.",
  "relatedTests": [
    "hepatitis-c-rna",
    "liver-function-test"
  ],
  "relatedDiseases": [
    "Hepatitis C",
    "Chronic hepatitis",
    "Liver cirrhosis",
    "Liver cancer"
  ],
  "relatedPackages": [
    "hepatitis-panel",
    "liver-screening"
  ],
  "faqs": [
    {
      "question": "What does positive Anti-HCV mean?",
      "answer": "Exposure to hepatitis C. Could be past resolved or current active infection."
    },
    {
      "question": "Do I need further testing?",
      "answer": "Yes, HCV RNA (PCR) to confirm active infection and determine if treatment needed."
    },
    {
      "question": "What is the window period?",
      "answer": "8-12 weeks. RNA testing can detect infection earlier (1-2 weeks post-exposure)."
    },
    {
      "question": "Can hepatitis C be cured?",
      "answer": "Yes, direct-acting antivirals (DAAs) cure >95% of cases in 8-12 weeks."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "CDC - Hepatitis C: https://www.cdc.gov/hepatitis/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "Anti-HCV",
    "hepatitis C",
    "HCV",
    "liver disease",
    "viral hepatitis"
  ]
},
{
  "slug": "hiv-1-2",
  "name": "HIV 1/2 Antibody/Antigen Combination Assay",
  "shortName": "HIV 1/2",
  "category": "Infectious Disease",
  "subcategory": "Viral",
  "description": "This 4th generation test detects both HIV antibodies and p24 antigen, allowing earlier detection than antibody-only tests.",
  "purpose": "To screen for HIV infection.",
  "whyDone": [
    "To screen for HIV-1 and HIV-2 infection",
    "To detect early (acute) HIV infection",
    "To diagnose HIV in exposed individuals"
  ],
  "whoNeedsIt": [
    "Individuals at risk for HIV",
    "Pregnant women",
    "Blood donors",
    "Healthcare workers after needlestick injury"
  ],
  "symptoms": [
    "Usually asymptomatic in early stage",
    "Fever",
    "Rash",
    "Fatigue",
    "Swollen lymph nodes"
  ],
  "conditionsDetected": [
    "HIV-1 infection",
    "HIV-2 infection",
    "Acute HIV syndrome"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum/Plasma",
  "turnaroundTime": "2-4 hours (rapid) or 1-3 days (lab)",
  "normalRange": "Negative",
  "highResults": "Positive screening test requires confirmatory testing (HIV-1 RNA or differentiation assay).",
  "lowResults": "Negative result with no recent exposure is reassuring. Recent exposure may be in window period.",
  "interpretation": "4th generation test detects p24 antigen 10-14 days post-exposure. Antibodies appear 2-8 weeks. Window period: 18-45 days.",
  "relatedTests": [
    "hiv-viral-load",
    "cd4-count"
  ],
  "relatedDiseases": [
    "HIV/AIDS",
    "Acute retroviral syndrome"
  ],
  "relatedPackages": [
    "hiv-panel",
    "sti-panel"
  ],
  "faqs": [
    {
      "question": "How soon after exposure can it detect HIV?",
      "answer": "p24 antigen: 10-14 days. Antibodies: 2-8 weeks. Window period: 18-45 days."
    },
    {
      "question": "What does positive screening test mean?",
      "answer": "Requires confirmatory testing (HIV-1 RNA or HIV-1/HIV-2 differentiation assay)."
    },
    {
      "question": "What is p24 antigen?",
      "answer": "HIV core protein detected in blood before antibodies develop. Indicates acute infection."
    },
    {
      "question": "Is rapid testing as accurate?",
      "answer": "Yes, 4th generation rapid tests have similar sensitivity and specificity."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "CDC - HIV Testing: https://www.cdc.gov/hiv/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "HIV",
    "HIV-1",
    "HIV-2",
    "AIDS",
    "STI",
    "sexual health"
  ]
},
{
  "slug": "vdrl",
  "name": "Venereal Disease Research Laboratory (VDRL)",
  "shortName": "VDRL",
  "category": "Infectious Disease",
  "subcategory": "STI",
  "description": "VDRL is a screening test for syphilis. It detects reagin, a non-specific antibody produced during Treponema pallidum infection.",
  "purpose": "To screen for syphilis infection.",
  "whyDone": [
    "To screen for syphilis",
    "To monitor treatment response",
    "To evaluate chancre or rash suspicious for syphilis"
  ],
  "whoNeedsIt": [
    "Individuals at risk for STIs",
    "Pregnant women",
    "Patients with chancre or rash"
  ],
  "symptoms": [
    "Painless chancre",
    "Rash on palms and soles",
    "Lymphadenopathy",
    "Condylomata lata"
  ],
  "conditionsDetected": [
    "Syphilis (primary, secondary, latent)"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein. CSF for neurosyphilis.",
  "sampleType": "Serum or CSF",
  "turnaroundTime": "24 hours",
  "normalRange": "Non-reactive",
  "highResults": "Reactive VDRL requires confirmatory treponemal test (FTA-ABS). False positives in autoimmune disease, pregnancy, and infections.",
  "lowResults": "Non-reactive result does not exclude syphilis. Early primary and late latent may be non-reactive.",
  "interpretation": "Screening test. False positives common. Confirm with FTA-ABS or TP-PA. CSF VDRL for neurosyphilis.",
  "relatedTests": [
    "tpa",
    "rpr",
    "fta-abs"
  ],
  "relatedDiseases": [
    "Syphilis",
    "Treponema pallidum",
    "STI"
  ],
  "relatedPackages": [
    "sti-panel",
    "syphilis-screening"
  ],
  "faqs": [
    {
      "question": "Is VDRL specific for syphilis?",
      "answer": "No, can be falsely positive in autoimmune disease, pregnancy, and infections."
    },
    {
      "question": "What is the difference between VDRL and RPR?",
      "answer": "Both are non-treponemal tests. RPR is more sensitive in primary syphilis. VDRL preferred for CSF."
    },
    {
      "question": "When does VDRL become positive?",
      "answer": "Primary syphilis: 1-2 weeks after chancre. All primary cases positive by 4 weeks."
    },
    {
      "question": "Can it be used to monitor treatment?",
      "answer": "Yes, titers should decline after treatment. Four-fold decrease indicates adequate response."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "CDC - Syphilis: https://www.cdc.gov/std/"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "VDRL",
    "syphilis",
    "STI",
    "sexual health",
    "Treponema"
  ]
},
{
  "slug": "tpa",
  "name": "Treponema Pallidum Antibodies (TPA/FTA-ABS)",
  "shortName": "TPA",
  "category": "Infectious Disease",
  "subcategory": "STI",
  "description": "TPA/FTA-ABS is a specific treponemal test confirming syphilis infection. It remains positive for life after infection.",
  "purpose": "To confirm syphilis diagnosis after positive screening test.",
  "whyDone": [
    "To confirm syphilis infection",
    "To differentiate true from false positive VDRL/RPR",
    "To diagnose late or treated syphilis"
  ],
  "whoNeedsIt": [
    "Patients with positive VDRL/RPR",
    "Patients with suspected syphilis",
    "Pregnant women with positive screening"
  ],
  "symptoms": [
    "Painless chancre",
    "Rash",
    "Lymphadenopathy",
    "Neurological symptoms"
  ],
  "conditionsDetected": [
    "Syphilis (all stages)"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "Non-reactive",
  "highResults": "Reactive TPA confirms syphilis infection. Does not indicate stage or activity.",
  "lowResults": "Non-reactive TPA with positive VDRL suggests false positive VDRL.",
  "interpretation": "Specific for syphilis. Stays positive for life even after treatment. Cannot distinguish active from treated infection.",
  "relatedTests": [
    "vdrl",
    "rpr",
    "rpr-titer"
  ],
  "relatedDiseases": [
    "Syphilis",
    "Treponema pallidum",
    "Neurosyphilis"
  ],
  "relatedPackages": [
    "sti-panel",
    "syphilis-screening"
  ],
  "faqs": [
    {
      "question": "Why can't it be used for treatment monitoring?",
      "answer": "Remains positive for life after infection, even after successful treatment."
    },
    {
      "question": "What is the difference between TPA and FTA-ABS?",
      "answer": "Both are treponemal tests. FTA-ABS is fluorescent. TPA is ELISA-based."
    },
    {
      "question": "When does it become positive?",
      "answer": "1-2 weeks after chancre appears, usually before VDRL/RPR."
    },
    {
      "question": "Can it be negative in late syphilis?",
      "answer": "Rarely. Most patients remain reactive for life."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "CDC - Syphilis: https://www.cdc.gov/std/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "TPA",
    "FTA-ABS",
    "syphilis",
    "treponemal test",
    "STI"
  ]
},
{
  "slug": "d-dimer",
  "name": "D-Dimer",
  "shortName": "D-Dimer",
  "category": "Infectious Disease",
  "subcategory": "Coagulation",
  "description": "D-Dimer is a fibrin degradation product. Elevated levels indicate active clot formation and breakdown. Used to rule out thromboembolic events.",
  "purpose": "To rule out DVT and pulmonary embolism when pre-test probability is low.",
  "whyDone": [
    "To rule out deep vein thrombosis",
    "To rule out pulmonary embolism",
    "To evaluate disseminated intravascular coagulation"
  ],
  "whoNeedsIt": [
    "Patients with suspected DVT",
    "Patients with suspected PE",
    "Patients with unexplained shortness of breath",
    "Post-surgical patients"
  ],
  "symptoms": [
    "Leg swelling and pain",
    "Shortness of breath",
    "Chest pain",
    "Rapid heart rate"
  ],
  "conditionsDetected": [
    "Deep vein thrombosis",
    "Pulmonary embolism",
    "DIC",
    "Disseminated intravascular coagulation"
  ],
  "preparation": [
    "Age-adjusted cut-offs: >age x 10 for patients >50"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Plasma (citrate)",
  "turnaroundTime": "1-4 hours",
  "normalRange": "<500 ng/mL (or age-adjusted)",
  "highResults": "Elevated D-Dimer cannot confirm thrombosis. Useful for ruling out when negative.",
  "lowResults": "Negative D-Dimer in low pre-test probability patient effectively rules out DVT/PE.",
  "interpretation": "Age-adjusted D-Dimer (>age x 10 for >50 years) improves specificity. Negative result in low-risk patient rules out VTE.",
  "relatedTests": [
    "ct-pulmonary-angiography",
    "venous-doppler",
    "coagulation-panel"
  ],
  "relatedDiseases": [
    "DVT",
    "Pulmonary embolism",
    "DIC"
  ],
  "relatedPackages": [
    "thrombosis-workup"
  ],
  "faqs": [
    {
      "question": "What does elevated D-Dimer mean?",
      "answer": "Active clot formation/breakdown. Not specific - also elevated in infection, cancer, surgery, and pregnancy."
    },
    {
      "question": "When is it useful?",
      "answer": "When negative in low pre-test probability patient. Effectively rules out DVT/PE."
    },
    {
      "question": "What is age-adjusted D-Dimer?",
      "answer": ">age x 10 for patients >50 years. Improves specificity in elderly patients."
    },
    {
      "question": "Can it be used to diagnose DVT?",
      "answer": "No, only to rule it out. Imaging (ultrasound or CT) needed for diagnosis."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ACEP - D-Dimer: https://www.acep.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "D-Dimer",
    "DVT",
    "pulmonary embolism",
    "DIC",
    "thrombosis"
  ]
},
{
  "slug": "procalcitonin",
  "name": "Procalcitonin (PCT)",
  "shortName": "PCT",
  "category": "Infectious Disease",
  "subcategory": "Inflammation",
  "description": "Procalcitonin is a peptide precursor of calcitonin. It rises specifically in bacterial infections, helping differentiate bacterial from viral infections.",
  "purpose": "To differentiate bacterial from viral infection and guide antibiotic therapy.",
  "whyDone": [
    "To differentiate bacterial from viral infection",
    "To guide antibiotic duration",
    "To assess sepsis severity"
  ],
  "whoNeedsIt": [
    "Patients with suspected bacterial infection",
    "Patients with sepsis",
    "Patients being evaluated for antibiotic discontinuation"
  ],
  "symptoms": [
    "Fever",
    "Chills",
    "Rapid breathing",
    "Low blood pressure"
  ],
  "conditionsDetected": [
    "Bacterial sepsis",
    "Severe bacterial infection",
    "Sepsis"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "1-4 hours",
  "normalRange": "<0.1 ng/mL (No infection), 0.1-0.25 (Possible), 0.25-0.5 (Likely bacterial), >0.5 (Sepsis likely)",
  "highResults": "High PCT indicates bacterial infection. >0.5 ng/mL strongly suggests bacterial sepsis.",
  "lowResults": "Low PCT does not exclude infection but makes bacterial cause less likely.",
  "interpretation": "PCT is more specific for bacterial infection than CRP. Helps guide antibiotic initiation and discontinuation.",
  "relatedTests": [
    "crp",
    "blood-culture",
    "lactate"
  ],
  "relatedDiseases": [
    "Sepsis",
    "Bacterial infection",
    "Pneumonia"
  ],
  "relatedPackages": [
    "sepsis-workup",
    "infection-panel"
  ],
  "faqs": [
    {
      "question": "How is it different from CRP?",
      "answer": "PCT is more specific for bacterial infection. CRP rises in any inflammation."
    },
    {
      "question": "What level needs antibiotics?",
      "answer": ">0.25 ng/mL suggests bacterial infection. >0.5 suggests sepsis."
    },
    {
      "question": "Can it guide antibiotic duration?",
      "answer": "Yes, declining PCT supports antibiotic discontinuation."
    },
    {
      "question": "Is it elevated in viral infections?",
      "answer": "Usually normal or mildly elevated. Significant elevation >0.5 suggests bacterial co-infection."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "Surviving Sepsis Campaign: https://www.survivingsepsis.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "procalcitonin",
    "PCT",
    "sepsis",
    "bacterial infection",
    "antibiotic stewardship"
  ]
},
{
  "slug": "psa",
  "name": "Prostate-Specific Antigen (PSA)",
  "shortName": "PSA",
  "category": "Tumor Markers",
  "subcategory": "Prostate",
  "description": "PSA is a protein produced by the prostate gland. Elevated levels may indicate prostate cancer, benign prostatic hyperplasia, or prostatitis.",
  "purpose": "To screen for and monitor prostate cancer.",
  "whyDone": [
    "To screen for prostate cancer",
    "To monitor prostate cancer treatment",
    "To evaluate elevated PSA and prostate health"
  ],
  "whoNeedsIt": [
    "Men over 50",
    "Men over 40 with risk factors (African descent, family history)"
  ],
  "symptoms": [
    "Usually asymptomatic",
    "Difficulty urinating",
    "Weak urine stream",
    "Frequent urination"
  ],
  "conditionsDetected": [
    "Prostate cancer",
    "Benign prostatic hyperplasia",
    "Prostatitis"
  ],
  "preparation": [
    "No fasting required",
    "Avoid digital rectal exam 48 hours before",
    "Avoid prostate biopsy 6 weeks before"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "<4.0 ng/mL (general), age-specific ranges apply",
  "highResults": "Elevated PSA may indicate prostate cancer, BPH, or prostatitis. PSA velocity and density help assess cancer risk.",
  "lowResults": "Low PSA does not rule out prostate cancer. Some aggressive cancers have low PSA.",
  "interpretation": "PSA is not cancer-specific. Free/total PSA ratio helps differentiate cancer from BPH. PSA velocity >0.75 ng/mL/year is concerning.",
  "relatedTests": [
    "free-psa",
    "prostate-exam"
  ],
  "relatedDiseases": [
    "Prostate cancer",
    "BPH",
    "Prostatitis"
  ],
  "relatedPackages": [
    "prostate-panel",
    "cancer-screening"
  ],
  "faqs": [
    {
      "question": "What is normal PSA?",
      "answer": "General <4.0 ng/mL, but age-specific: 40-49: <2.5, 50-59: <3.5, 60-69: <4.5, 70+: <6.5."
    },
    {
      "question": "What is free/total PSA ratio?",
      "answer": "<10% suggests cancer. >25% suggests BPH. Helps avoid unnecessary biopsies."
    },
    {
      "question": "What is PSA velocity?",
      "answer": "Rate of PSA increase over time. >0.75 ng/mL/year is suspicious for cancer."
    },
    {
      "question": "Can DRE affect PSA?",
      "answer": "Yes, temporarily. Avoid DRE 48 hours before testing."
    },
    {
      "question": "Should all men be screened?",
      "answer": "Discuss with doctor. Benefits and risks of screening should be individualized."
    }
  ],
  "references": [
    "NCI - PSA Testing: https://www.cancer.gov/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "PSA",
    "prostate cancer",
    "prostate-specific antigen",
    "cancer screening",
    "men's health"
  ]
},
{
  "slug": "alpha-fetoprotein",
  "name": "Alpha-Fetoprotein (AFP)",
  "shortName": "AFP",
  "category": "Tumor Markers",
  "subcategory": "Liver/Germ Cell",
  "description": "AFP is a glycoprotein normally produced during fetal development. Elevated in adults may indicate liver cancer, germ cell tumors, or liver disease.",
  "purpose": "To screen for liver cancer and monitor germ cell tumors.",
  "whyDone": [
    "To screen for hepatocellular carcinoma",
    "To monitor germ cell tumors",
    "To evaluate liver disease and pregnancy complications"
  ],
  "whoNeedsIt": [
    "Patients with chronic liver disease",
    "Patients with liver cirrhosis",
    "Patients with testicular or ovarian tumors"
  ],
  "symptoms": [
    "Abdominal pain",
    "Weight loss",
    "Jaundice",
    "Testicular mass"
  ],
  "conditionsDetected": [
    "Hepatocellular carcinoma",
    "Germ cell tumors",
    "Liver cirrhosis",
    "Pregnancy (physiologic)"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "<10 ng/mL (non-pregnant), <400 ng/mL (pregnancy 2nd trimester)",
  "highResults": "Elevated AFP may indicate liver cancer, germ cell tumors, or chronic liver disease. Very high levels suggest malignancy.",
  "lowResults": "Low AFP does not rule out liver cancer. Some tumors do not produce AFP.",
  "interpretation": "AFP is elevated in 60-70% of hepatocellular carcinomas. Used with ultrasound for screening in high-risk patients.",
  "relatedTests": [
    "liver-function-test",
    "ultrasound-liver",
    "hcg"
  ],
  "relatedDiseases": [
    "Liver cancer",
    "Testicular cancer",
    "Ovarian cancer"
  ],
  "relatedPackages": [
    "liver-cancer-screening"
  ],
  "faqs": [
    {
      "question": "How is it used for liver cancer screening?",
      "answer": "Combined with liver ultrasound every 6 months in high-risk patients (cirrhosis, chronic hepatitis B)."
    },
    {
      "question": "What level suggests liver cancer?",
      "answer": ">20 ng/mL with liver mass is highly suspicious. >200 ng/mL often indicates advanced disease."
    },
    {
      "question": "Can it be elevated in liver disease?",
      "answer": "Yes, acute hepatitis, chronic hepatitis, and cirrhosis can elevate AFP moderately."
    },
    {
      "question": "Is it used in pregnancy?",
      "answer": "Yes, elevated in pregnancy. Very high levels may indicate neural tube defects."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "AASLD - HCC Screening: https://www.aasld.org/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "AFP",
    "alpha-fetoprotein",
    "liver cancer",
    "germ cell tumor",
    "cancer marker"
  ]
},
{
  "slug": "cea",
  "name": "Carcinoembryonic Antigen (CEA)",
  "shortName": "CEA",
  "category": "Tumor Markers",
  "subcategory": "Gastrointestinal",
  "description": "CEA is a glycoprotein involved in cell adhesion. It is elevated in colorectal cancer and other malignancies, as well as smoking and inflammatory conditions.",
  "purpose": "To monitor colorectal cancer treatment and detect recurrence.",
  "whyDone": [
    "To monitor colorectal cancer after treatment",
    "To detect cancer recurrence",
    "To evaluate other GI malignancies"
  ],
  "whoNeedsIt": [
    "Colorectal cancer patients post-treatment",
    "Patients with suspected GI cancers",
    "Smokers"
  ],
  "symptoms": [
    "Weight loss",
    "Blood in stool",
    "Abdominal pain",
    "Change in bowel habits"
  ],
  "conditionsDetected": [
    "Colorectal cancer",
    "Gastric cancer",
    "Pancreatic cancer",
    "Lung cancer (smokers)"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "<3.0 ng/mL (non-smokers), <5.0 ng/mL (smokers)",
  "highResults": "Elevated CEA may indicate colorectal cancer recurrence or progression. Rising levels after treatment suggest recurrence.",
  "lowResults": "Low CEA does not rule out cancer. Not all colorectal cancers produce CEA.",
  "interpretation": "CEA is not useful for screening. Best used for monitoring known cancer. Level correlates with tumor burden.",
  "relatedTests": [
    "colorectal-screening",
    "ca-19-9"
  ],
  "relatedDiseases": [
    "Colorectal cancer",
    "GI cancers"
  ],
  "relatedPackages": [
    "colorectal-panel"
  ],
  "faqs": [
    {
      "question": "What does elevated CEA mean?",
      "answer": "May indicate colorectal cancer recurrence, other GI cancers, or benign conditions (smoking, IBD)."
    },
    {
      "question": "How often should it be monitored?",
      "answer": "Every 3-6 months post-surgery. Rising levels suggest recurrence."
    },
    {
      "question": "Can smoking affect it?",
      "answer": "Yes, smokers may have CEA up to 5.0 ng/mL. This is considered normal for smokers."
    },
    {
      "question": "Is it used for screening?",
      "answer": "No, not sensitive enough for early detection. Used for monitoring known cancer."
    },
    {
      "question": "What level suggests recurrence?",
      "answer": ">20% increase from nadir or >5.0 ng/mL after previous normalization."
    }
  ],
  "references": [
    "NCI - CEA: https://www.cancer.gov/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "CEA",
    "carcinoembryonic antigen",
    "colorectal cancer",
    "GI cancer",
    "cancer marker"
  ]
},
{
  "slug": "ca-125",
  "name": "Cancer Antigen 125 (CA-125)",
  "shortName": "CA-125",
  "category": "Tumor Markers",
  "subcategory": "Ovarian",
  "description": "CA-125 is a glycoprotein elevated in ovarian cancer and other conditions. It is the most widely used tumor marker for ovarian cancer.",
  "purpose": "To monitor ovarian cancer treatment and detect recurrence.",
  "whyDone": [
    "To monitor ovarian cancer",
    "To evaluate pelvic mass",
    "To assess treatment response in ovarian cancer"
  ],
  "whoNeedsIt": [
    "Ovarian cancer patients",
    "Women with pelvic mass or pain",
    "BRCA mutation carriers"
  ],
  "symptoms": [
    "Pelvic pain",
    "Abdominal bloating",
    "Urinary frequency",
    "Pelvic mass"
  ],
  "conditionsDetected": [
    "Ovarian cancer",
    "Endometriosis",
    "PID",
    "Uterine fibroids",
    "Pregnancy"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "<35 U/mL",
  "highResults": "Elevated CA-125 may indicate ovarian cancer, endometriosis, or pelvic inflammatory disease.",
  "lowResults": "Low CA-125 does not rule out ovarian cancer. Many early ovarian cancers have normal CA-125.",
  "interpretation": "CA-125 is not specific for ovarian cancer. Elevated in many benign conditions. Best for monitoring known ovarian cancer.",
  "relatedTests": [
    "he4",
    "ultrasound-pelvic"
  ],
  "relatedDiseases": [
    "Ovarian cancer",
    "Endometriosis",
    "PID"
  ],
  "relatedPackages": [
    "ovarian-panel"
  ],
  "faqs": [
    {
      "question": "Is it good for ovarian cancer screening?",
      "answer": "No, not sensitive for early-stage ovarian cancer. Best for monitoring known disease."
    },
    {
      "question": "What causes false elevation?",
      "answer": "Endometriosis, PID, uterine fibroids, pregnancy, menstruation, liver disease."
    },
    {
      "question": "What level suggests ovarian cancer?",
      "answer": ">65 U/mL with pelvic mass is highly suspicious. >1000 suggests advanced disease."
    },
    {
      "question": "What is HE4?",
      "answer": "Another ovarian cancer marker. Used with CA-125 in ROMA score for better specificity."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ACOG - Ovarian Cancer Screening: https://www.acog.org/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "CA-125",
    "ovarian cancer",
    "cancer marker",
    "women's health"
  ]
},
{
  "slug": "ca-19-9",
  "name": "Cancer Antigen 19-9 (CA 19-9)",
  "shortName": "CA 19-9",
  "category": "Tumor Markers",
  "subcategory": "Pancreatic/Biliary",
  "description": "CA 19-9 is a glycoprotein elevated in pancreatic and biliary cancers. It is the most useful tumor marker for pancreatic adenocarcinoma.",
  "purpose": "To monitor pancreatic cancer treatment and detect recurrence.",
  "whyDone": [
    "To monitor pancreatic cancer",
    "To evaluate biliary obstruction",
    "To assess treatment response"
  ],
  "whoNeedsIt": [
    "Pancreatic cancer patients",
    "Patients with biliary obstruction",
    "Patients with suspected pancreatic cancer"
  ],
  "symptoms": [
    "Abdominal pain",
    "Weight loss",
    "Jaundice",
    "Dark urine",
    "Pale stools"
  ],
  "conditionsDetected": [
    "Pancreatic cancer",
    "Cholangiocarcinoma",
    "Biliary obstruction",
    "Pancreatitis"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "<37 U/mL",
  "highResults": "Elevated CA 19-9 may indicate pancreatic cancer, biliary obstruction, or pancreatitis.",
  "lowResults": "Low CA 19-9 does not rule out pancreatic cancer. Lewis antigen-negative individuals cannot produce CA 19-9.",
  "interpretation": "CA 19-9 is not specific. Elevated in biliary obstruction and pancreatitis. Best for monitoring known pancreatic cancer.",
  "relatedTests": [
    "cea",
    "liver-function-test"
  ],
  "relatedDiseases": [
    "Pancreatic cancer",
    "Cholangiocarcinoma",
    "Biliary obstruction"
  ],
  "relatedPackages": [
    "pancreatic-panel"
  ],
  "faqs": [
    {
      "question": "Is it good for pancreatic cancer screening?",
      "answer": "No, not sensitive enough for early detection. Used for monitoring known disease."
    },
    {
      "question": "What causes elevation?",
      "answer": "Pancreatic cancer, biliary obstruction, pancreatitis, cholangiocarcinoma."
    },
    {
      "question": "What are Lewis antigen-negative individuals?",
      "answer": "5-10% of people who cannot produce CA 19-9 regardless of cancer."
    },
    {
      "question": "What level suggests pancreatic cancer?",
      "answer": ">1000 U/mL suggests advanced disease. Rising levels after treatment indicate recurrence."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "NCCN - Pancreatic Cancer: https://www.nccn.org/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "CA 19-9",
    "pancreatic cancer",
    "biliary cancer",
    "cancer marker"
  ]
},
{
  "slug": "beta-hcg",
  "name": "Beta Human Chorionic Gonadotropin (Beta hCG)",
  "shortName": "Beta hCG",
  "category": "Tumor Markers",
  "subcategory": "Germ Cell/Trophoblastic",
  "description": "Beta hCG is produced by trophoblastic tissue. It is elevated in pregnancy, gestational trophoblastic disease, and germ cell tumors.",
  "purpose": "To diagnose pregnancy and monitor gestational trophoblastic disease and germ cell tumors.",
  "whyDone": [
    "To confirm pregnancy",
    "To monitor gestational trophoblastic disease",
    "To evaluate testicular cancer and germ cell tumors"
  ],
  "whoNeedsIt": [
    "Pregnant women",
    "Patients with gestational trophoblastic disease",
    "Testicular cancer patients"
  ],
  "symptoms": [
    "Amenorrhea",
    "Nausea",
    "Breast tenderness",
    "Pelvic mass",
    "Testicular mass"
  ],
  "conditionsDetected": [
    "Pregnancy",
    "Gestational trophoblastic disease",
    "Germ cell tumors",
    "Ectopic pregnancy"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "4-24 hours",
  "normalRange": "Non-pregnant: <5 mIU/mL",
  "highResults": "In pregnancy, levels rise appropriately. Abnormal rise may indicate ectopic pregnancy or molar pregnancy.",
  "lowResults": "Negative hCG in a woman with amenorrhea suggests non-pregnancy cause.",
  "interpretation": "Doubling time helps differentiate normal pregnancy from ectopic. In cancer, levels correlate with tumor burden.",
  "relatedTests": [
    "ultrasound-pelvic",
    "progesterone"
  ],
  "relatedDiseases": [
    "Pregnancy",
    "Ectopic pregnancy",
    "Germ cell tumor",
    "Molar pregnancy"
  ],
  "relatedPackages": [
    "pregnancy-test",
    "germ-cell-panel"
  ],
  "faqs": [
    {
      "question": "When can it detect pregnancy?",
      "answer": "Serum hCG can detect pregnancy 8-11 days after ovulation. Levels double every 48-72 hours in normal pregnancy."
    },
    {
      "question": "What is abnormal rise?",
      "answer": "Slow rise may indicate ectopic pregnancy. Very high levels may indicate molar pregnancy."
    },
    {
      "question": "Is it used in men?",
      "answer": "Yes, elevated levels may indicate testicular cancer. Always abnormal in men."
    },
    {
      "question": "What is gestational trophoblastic disease?",
      "answer": "Abnormal growth of trophoblastic tissue (molar pregnancy, choriocarcinoma)."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ACOG - hCG Testing: https://www.acog.org/"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "hCG",
    "pregnancy test",
    "beta hCG",
    "germ cell tumor",
    "molar pregnancy"
  ]
},
{
  "slug": "ca-15-3",
  "name": "Cancer Antigen 15-3 (CA 15-3)",
  "shortName": "CA 15-3",
  "category": "Tumor Markers",
  "subcategory": "Breast",
  "description": "CA 15-3 is a glycoprotein elevated in breast cancer. It is most useful for monitoring treatment response and detecting metastatic recurrence.",
  "purpose": "To monitor breast cancer treatment and detect recurrence.",
  "whyDone": [
    "To monitor metastatic breast cancer",
    "To assess treatment response",
    "To detect breast cancer recurrence"
  ],
  "whoNeedsIt": [
    "Metastatic breast cancer patients",
    "Breast cancer patients on treatment"
  ],
  "symptoms": [
    "Breast lump",
    "Bone pain",
    "Weight loss"
  ],
  "conditionsDetected": [
    "Metastatic breast cancer"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24 hours",
  "normalRange": "<30 U/mL",
  "highResults": "Elevated CA 15-3 may indicate metastatic breast cancer. Levels correlate with tumor burden.",
  "lowResults": "Low CA 15-3 does not rule out breast cancer. Many early breast cancers have normal CA 15-3.",
  "interpretation": "CA 15-3 is not useful for screening. Best for monitoring known metastatic breast cancer.",
  "relatedTests": [
    "cea",
    "brca"
  ],
  "relatedDiseases": [
    "Breast cancer",
    "Metastatic breast cancer"
  ],
  "relatedPackages": [
    "breast-cancer-panel"
  ],
  "faqs": [
    {
      "question": "Is it used for breast cancer screening?",
      "answer": "No, not sensitive enough for early detection. Used for monitoring metastatic disease."
    },
    {
      "question": "What causes elevation?",
      "answer": "Metastatic breast cancer, other cancers, benign breast disease, liver disease."
    },
    {
      "question": "How often should it be monitored?",
      "answer": "Every 2-3 months during treatment. Rising levels may indicate progression."
    },
    {
      "question": "What is BRCA?",
      "answer": "BRCA1/BRCA2 genes. Mutations increase breast and ovarian cancer risk. Genetic testing, not tumor marker."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "NCI - Breast Cancer Markers: https://www.cancer.gov/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "CA 15-3",
    "breast cancer",
    "cancer marker",
    "women's health"
  ]
},
{
  "slug": "vitamin-d",
  "name": "25-Hydroxy Vitamin D",
  "shortName": "Vitamin D",
  "category": "Vitamins & Nutrition",
  "subcategory": "Vitamins",
  "description": "25-Hydroxy Vitamin D is the major circulating form and best indicator of vitamin D status. Essential for calcium absorption and bone health.",
  "purpose": "To assess vitamin D status and diagnose deficiency or toxicity.",
  "whyDone": [
    "To diagnose vitamin D deficiency",
    "To evaluate osteoporosis risk",
    "To monitor supplementation therapy",
    "To assess bone pain and fracture risk"
  ],
  "whoNeedsIt": [
    "Patients with bone pain or fractures",
    "Elderly and postmenopausal women",
    "Patients with malabsorption syndromes",
    "Patients on long-term corticosteroids",
    "Pregnant and lactating women"
  ],
  "symptoms": [
    "Bone pain",
    "Muscle weakness",
    "Fatigue",
    "Frequent infections",
    "Depression",
    "Slow wound healing"
  ],
  "conditionsDetected": [
    "Vitamin D deficiency",
    "Osteomalacia",
    "Osteoporosis",
    "Rickets",
    "Vitamin D toxicity"
  ],
  "preparation": [
    "No fasting required",
    "Supplement timing does not affect results significantly"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "Sufficient: 30-100 ng/mL, Insufficient: 20-29 ng/mL, Deficient: <20 ng/mL, Toxic: >100 ng/mL",
  "highResults": "Toxicity (>100 ng/mL) causes hypercalcemia, kidney stones, and soft tissue calcification. Usually from excessive supplementation.",
  "lowResults": "Deficiency (<20 ng/mL) causes osteomalacia, rickets, increased fracture risk, and immune dysfunction.",
  "interpretation": "Vitamin D is essential for calcium absorption. Deficiency is extremely common, especially in northern latitudes and dark-skinned individuals.",
  "relatedTests": [
    "calcium",
    "phosphorus",
    "pth",
    "alkaline-phosphatase"
  ],
  "relatedDiseases": [
    "Osteoporosis",
    "Osteomalacia",
    "Rickets",
    "Hyperparathyroidism"
  ],
  "relatedPackages": [
    "bone-health-panel",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "What is the optimal level?",
      "answer": "30-50 ng/mL is considered optimal. Levels >50 provide no additional benefit and may be harmful."
    },
    {
      "question": "How much should I supplement?",
      "answer": "Depends on level. Deficiency: 50,000 IU weekly for 8-12 weeks, then 1000-2000 IU daily maintenance."
    },
    {
      "question": "Can I get enough from sunlight?",
      "answer": "10-30 minutes of midday sunlight several times per week can maintain adequate levels, but many people need supplementation."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "How often should it be tested?",
      "answer": "Annually if normal. Every 3-6 months if deficient and supplementing."
    }
  ],
  "references": [
    "Endocrine Society - Vitamin D Guidelines: https://www.endocrine.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "vitamin D",
    "25-hydroxy vitamin D",
    "bone health",
    "osteoporosis",
    "deficiency"
  ]
},
{
  "slug": "vitamin-b12",
  "name": "Vitamin B12 (Cobalamin)",
  "shortName": "Vitamin B12",
  "category": "Vitamins & Nutrition",
  "subcategory": "Vitamins",
  "description": "Vitamin B12 is essential for red blood cell formation, neurological function, and DNA synthesis. Deficiency causes megaloblastic anemia and neuropathy.",
  "purpose": "To assess vitamin B12 status and diagnose deficiency or excess.",
  "whyDone": [
    "To diagnose B12 deficiency",
    "To evaluate megaloblastic anemia",
    "To investigate neurological symptoms",
    "To monitor supplementation"
  ],
  "whoNeedsIt": [
    "Patients with anemia or fatigue",
    "Patients with neurological symptoms (numbness, tingling)",
    "Vegetarians and vegans",
    "Elderly patients",
    "Patients on metformin or PPIs"
  ],
  "symptoms": [
    "Fatigue",
    "Weakness",
    "Numbness and tingling",
    "Difficulty walking",
    "Memory problems",
    "Glossitis",
    "Pale skin"
  ],
  "conditionsDetected": [
    "Vitamin B12 deficiency",
    "Megaloblastic anemia",
    "Pernicious anemia",
    "Neuropathy"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "200-900 pg/mL (optimal >400 pg/mL)",
  "highResults": "Elevated B12 may indicate liver disease, myeloproliferative disorders, or excess supplementation. Usually benign.",
  "lowResults": "Deficiency (<200 pg/mL) causes megaloblastic anemia and neurological damage. Can be irreversible if prolonged.",
  "interpretation": "Low B12 with high MCV suggests megaloblastic anemia. Check methylmalonic acid and homocysteine for confirmation.",
  "relatedTests": [
    "folate",
    "cbc",
    "methylmalonic-acid",
    "homocysteine"
  ],
  "relatedDiseases": [
    "Megaloblastic anemia",
    "Pernicious anemia",
    "Neuropathy",
    "Dementia"
  ],
  "relatedPackages": [
    "anemia-panel",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "Who is at risk for deficiency?",
      "answer": "Vegetarians/vegans, elderly, patients on metformin or PPIs, those with pernicious anemia or GI surgery."
    },
    {
      "question": "What does low B12 cause?",
      "answer": "Megaloblastic anemia, fatigue, neuropathy (numbness, tingling), memory problems, and depression."
    },
    {
      "question": "How is it treated?",
      "answer": "Oral supplements (1000 mcg daily) or intramuscular injections for severe deficiency or malabsorption."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "Can B12 be too high?",
      "answer": "Elevated B12 is usually benign. May indicate liver disease or excess supplementation. Rarely harmful."
    }
  ],
  "references": [
    "ASH - B12 Deficiency: https://www.hematology.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "vitamin B12",
    "cobalamin",
    "anemia",
    "neuropathy",
    "deficiency"
  ]
},
{
  "slug": "folic-acid",
  "name": "Folic Acid (Folate)",
  "shortName": "Folate",
  "category": "Vitamins & Nutrition",
  "subcategory": "Vitamins",
  "description": "Folate is essential for DNA synthesis and red blood cell formation. Deficiency causes megaloblastic anemia and neural tube defects in pregnancy.",
  "purpose": "To assess folate status and diagnose deficiency.",
  "whyDone": [
    "To diagnose folate deficiency",
    "To evaluate megaloblastic anemia",
    "To assess neural tube defect risk in pregnancy"
  ],
  "whoNeedsIt": [
    "Pregnant women",
    "Patients with anemia",
    "Patients with alcohol use disorder",
    "Patients with malabsorption syndromes"
  ],
  "symptoms": [
    "Fatigue",
    "Weakness",
    "Pale skin",
    "Mouth sores",
    "Diarrhea",
    "Neural tube defects (in newborns)"
  ],
  "conditionsDetected": [
    "Folate deficiency",
    "Megaloblastic anemia",
    "Neural tube defects"
  ],
  "preparation": [
    "No fasting required",
    "Avoid high-dose supplements before testing"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum or Red Blood Cell Folate",
  "turnaroundTime": "24-48 hours",
  "normalRange": "Serum: 2.7-17.0 ng/mL, RBC Folate: 140-628 ng/mL",
  "highResults": "High folate may mask B12 deficiency. Usually from supplementation.",
  "lowResults": "Deficiency causes megaloblastic anemia and increases neural tube defect risk in pregnancy.",
  "interpretation": "RBC folate is a better indicator of long-term folate status. Serum folate reflects recent intake.",
  "relatedTests": [
    "vitamin-b12",
    "cbc",
    "homocysteine",
    "methylmalonic-acid"
  ],
  "relatedDiseases": [
    "Megaloblastic anemia",
    "Neural tube defects",
    "Malabsorption"
  ],
  "relatedPackages": [
    "anemia-panel",
    "pregnancy-panel"
  ],
  "faqs": [
    {
      "question": "Why is folate important in pregnancy?",
      "answer": "Prevents neural tube defects (spina bifida). Women should supplement 400-800 mcg daily before conception."
    },
    {
      "question": "What causes deficiency?",
      "answer": "Poor diet, alcohol use, malabsorption (celiac disease), medications (methotrexate)."
    },
    {
      "question": "How does it relate to B12?",
      "answer": "Both cause megaloblastic anemia. High folate can mask B12 deficiency, which can cause irreversible nerve damage."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    },
    {
      "question": "How much should pregnant women take?",
      "answer": "400-800 mcg daily starting at least 1 month before conception and through first trimester."
    }
  ],
  "references": [
    "ACOG - Folate Supplementation: https://www.acog.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "folic acid",
    "folate",
    "pregnancy",
    "anemia",
    "neural tube defects"
  ]
},
{
  "slug": "homocysteine",
  "name": "Homocysteine",
  "shortName": "Homocysteine",
  "category": "Vitamins & Nutrition",
  "subcategory": "Metabolites",
  "description": "Homocysteine is an amino acid byproduct of methionine metabolism. Elevated levels are associated with cardiovascular disease and thrombosis.",
  "purpose": "To assess cardiovascular disease risk and evaluate B vitamin status.",
  "whyDone": [
    "To assess cardiovascular risk",
    "To evaluate B12 and folate deficiency",
    "To assess thrombosis risk"
  ],
  "whoNeedsIt": [
    "Patients at risk for cardiovascular disease",
    "Patients with recurrent DVT",
    "Patients with B12 or folate deficiency"
  ],
  "symptoms": [
    "Usually asymptomatic",
    "May have fatigue or cognitive changes"
  ],
  "conditionsDetected": [
    "Hyperhomocysteinemia",
    "B12 deficiency",
    "Folate deficiency",
    "Thrombosis risk"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended",
    "Avoid high-protein meals before testing"
  ],
  "procedure": "Blood drawn from a vein after fasting.",
  "sampleType": "Plasma (EDTA)",
  "turnaroundTime": "24-48 hours",
  "normalRange": "<15 umol/L (optimal <10 umol/L)",
  "highResults": "Elevated homocysteine increases cardiovascular and thrombosis risk. May indicate B12 or folate deficiency.",
  "lowResults": "Low homocysteine is generally not clinically significant.",
  "interpretation": "Homocysteine is an independent risk factor for cardiovascular disease. Elevated levels respond well to B vitamin supplementation.",
  "relatedTests": [
    "vitamin-b12",
    "folic-acid",
    "lipid-profile",
    "d-dimer"
  ],
  "relatedDiseases": [
    "Cardiovascular disease",
    "Thrombosis",
    "B12 deficiency",
    "Folate deficiency"
  ],
  "relatedPackages": [
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "What level is concerning?",
      "answer": ">15 umol/L indicates hyperhomocysteinemia. Optimal is <10 umol/L."
    },
    {
      "question": "How is it treated?",
      "answer": "B6, B12, and folate supplementation can lower levels by 20-40%."
    },
    {
      "question": "Is it a cardiovascular risk factor?",
      "answer": "Yes, independent risk factor. Each 5 umol/L increase raises cardiovascular risk by approximately 20%."
    },
    {
      "question": "Is fasting required?",
      "answer": "Fasting recommended for accurate results."
    },
    {
      "question": "Does it relate to DVT risk?",
      "answer": "Yes, elevated homocysteine increases risk of venous thromboembolism."
    }
  ],
  "references": [
    "AHA - Homocysteine: https://www.heart.org/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "homocysteine",
    "cardiovascular risk",
    "B12",
    "folate",
    "thrombosis"
  ]
},
{
  "slug": "troponin-i",
  "name": "Cardiac Troponin I (cTnI)",
  "shortName": "Troponin I",
  "category": "Cardiac Markers",
  "subcategory": "Acute",
  "description": "Troponin I is a cardiac-specific protein released during myocardial injury. It is the gold standard biomarker for diagnosing myocardial infarction.",
  "purpose": "To diagnose acute myocardial infarction (heart attack).",
  "whyDone": [
    "To diagnose heart attack",
    "To evaluate chest pain in emergency",
    "To assess myocardial injury",
    "To monitor post-MI complications"
  ],
  "whoNeedsIt": [
    "Patients with acute chest pain",
    "Patients with suspected myocardial infarction",
    "Post-surgical patients with ECG changes"
  ],
  "symptoms": [
    "Chest pain or pressure",
    "Shortness of breath",
    "Sweating",
    "Nausea",
    "Arm or jaw pain",
    "Lightheadedness"
  ],
  "conditionsDetected": [
    "Acute myocardial infarction",
    "Unstable angina",
    "Myocarditis",
    "Pulmonary embolism",
    "Heart failure"
  ],
  "preparation": [
    "No fasting required",
    "Do not delay testing for results"
  ],
  "procedure": "Blood drawn from a vein. Serial measurements at 0, 3, and 6 hours.",
  "sampleType": "Serum",
  "turnaroundTime": "1-4 hours",
  "normalRange": "<0.04 ng/mL",
  "highResults": "Elevated troponin indicates myocardial injury. Rise and fall pattern confirms acute MI.",
  "lowResults": "Normal troponin does not rule out MI if tested too early. Serial measurements essential.",
  "interpretation": "Troponin rises 3-6 hours after injury, peaks at 12-24 hours, and remains elevated for 7-14 days. Serial measurements essential.",
  "relatedTests": [
    "troponin-t",
    "ck-mb",
    "ecg",
    "nt-probnp"
  ],
  "relatedDiseases": [
    "Acute myocardial infarction",
    "Unstable angina",
    "Myocarditis"
  ],
  "relatedPackages": [
    "cardiac-panel",
    "chest-pain-workup"
  ],
  "faqs": [
    {
      "question": "When does troponin rise?",
      "answer": "3-6 hours after injury. Peaks at 12-24 hours. Remains elevated for 7-14 days."
    },
    {
      "question": "Why serial measurements?",
      "answer": "Early measurement may be negative. Rise and fall pattern confirms acute injury vs chronic elevation."
    },
    {
      "question": "What else can elevate troponin?",
      "answer": "Heart failure, myocarditis, PE, sepsis, kidney disease, strenuous exercise. Context is key."
    },
    {
      "question": "What is high-sensitivity troponin?",
      "answer": "Detects lower levels, allows earlier diagnosis. Can rule out MI in 1 hour with negative result."
    },
    {
      "question": "Is fasting required?",
      "answer": "No. Do not delay testing for results."
    }
  ],
  "references": [
    "ACC - Troponin Guidelines: https://www.acc.org/"
  ],
  "price": 400,
  "homeCollection": false,
  "tags": [
    "troponin",
    "troponin I",
    "heart attack",
    "MI",
    "cardiac",
    "chest pain"
  ]
},
{
  "slug": "troponin-t",
  "name": "Cardiac Troponin T (cTnT)",
  "shortName": "Troponin T",
  "category": "Cardiac Markers",
  "subcategory": "Acute",
  "description": "Troponin T is a cardiac-specific protein released during myocardial injury. Used for diagnosis and prognosis of myocardial infarction.",
  "purpose": "To diagnose acute myocardial infarction and assess cardiac risk.",
  "whyDone": [
    "To diagnose heart attack",
    "To evaluate acute coronary syndrome",
    "To assess prognosis in heart failure"
  ],
  "whoNeedsIt": [
    "Patients with acute chest pain",
    "Patients with suspected ACS",
    "Heart failure patients for risk stratification"
  ],
  "symptoms": [
    "Chest pain",
    "Shortness of breath",
    "Sweating",
    "Nausea",
    "Arm or jaw pain"
  ],
  "conditionsDetected": [
    "Acute myocardial infarction",
    "Acute coronary syndrome",
    "Myocarditis",
    "Heart failure"
  ],
  "preparation": [
    "No fasting required",
    "Do not delay testing"
  ],
  "procedure": "Blood drawn from a vein. Serial measurements at 0, 3, and 6 hours.",
  "sampleType": "Serum",
  "turnaroundTime": "1-4 hours",
  "normalRange": "<0.01 ng/mL",
  "highResults": "Elevated troponin T indicates myocardial injury. Rise and fall pattern confirms acute MI.",
  "lowResults": "Normal troponin T does not rule out MI if tested too early. Serial measurements essential.",
  "interpretation": "Troponin T is slightly less cardiac-specific than Troponin I but equally useful for MI diagnosis.",
  "relatedTests": [
    "troponin-i",
    "ck-mb",
    "ecg",
    "nt-probnp"
  ],
  "relatedDiseases": [
    "Acute myocardial infarction",
    "Acute coronary syndrome",
    "Myocarditis"
  ],
  "relatedPackages": [
    "cardiac-panel",
    "chest-pain-workup"
  ],
  "faqs": [
    {
      "question": "What is the difference between Troponin I and T?",
      "answer": "Both are equally useful for MI diagnosis. Troponin I is slightly more cardiac-specific. Some labs use one or the other."
    },
    {
      "question": "When should I be tested?",
      "answer": "Immediately if you have chest pain with other symptoms. Do not wait."
    },
    {
      "question": "Can it be elevated without a heart attack?",
      "answer": "Yes, in heart failure, myocarditis, PE, sepsis, kidney disease. Clinical context matters."
    },
    {
      "question": "How long does it stay elevated?",
      "answer": "7-14 days. Useful for late presenters but cannot distinguish old from new injury."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ACC - ACS Guidelines: https://www.acc.org/"
  ],
  "price": 400,
  "homeCollection": false,
  "tags": [
    "troponin",
    "troponin T",
    "heart attack",
    "MI",
    "cardiac",
    "ACS"
  ]
},
{
  "slug": "ck-mb",
  "name": "Creatine Kinase-MB (CK-MB)",
  "shortName": "CK-MB",
  "category": "Cardiac Markers",
  "subcategory": "Acute",
  "description": "CK-MB is an isoenzyme of creatine kinase found primarily in cardiac muscle. It rises after myocardial injury and helps time the onset of MI.",
  "purpose": "To help diagnose myocardial infarction and estimate timing of injury.",
  "whyDone": [
    "To help diagnose MI",
    "To estimate timing of myocardial injury",
    "To detect reinfarction after MI"
  ],
  "whoNeedsIt": [
    "Patients with suspected MI presenting late",
    "Patients with suspected reinfarction",
    "When troponin timing is ambiguous"
  ],
  "symptoms": [
    "Chest pain",
    "Shortness of breath",
    "Sweating",
    "Nausea"
  ],
  "conditionsDetected": [
    "Acute myocardial infarction",
    "Myocardial injury",
    "Rhabdomyolysis",
    "Reinfarction"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum",
  "turnaroundTime": "1-4 hours",
  "normalRange": "<5.0 ng/mL or <3% of total CK",
  "highResults": "Elevated CK-MB indicates myocardial injury. CK-MB index >2.5-3% suggests cardiac source.",
  "lowResults": "Normal CK-MB does not rule out MI if tested early or late.",
  "interpretation": "CK-MB rises 4-6 hours, peaks at 12-24 hours, and normalizes in 48-72 hours. Useful for detecting reinfarction (troponin stays elevated longer).",
  "relatedTests": [
    "troponin-i",
    "troponin-t",
    "total-ck"
  ],
  "relatedDiseases": [
    "Acute myocardial infarction",
    "Rhabdomyolysis"
  ],
  "relatedPackages": [
    "cardiac-panel"
  ],
  "faqs": [
    {
      "question": "How is it different from troponin?",
      "answer": "Troponin is more specific and stays elevated longer. CK-MB normalizes in 48-72 hours, useful for detecting reinfarction."
    },
    {
      "question": "What is the CK-MB index?",
      "answer": "CK-MB as percentage of total CK. >2.5-3% suggests cardiac source. >5% is strongly suggestive of MI."
    },
    {
      "question": "When does it rise?",
      "answer": "4-6 hours after injury. Peaks at 12-24 hours. Normalizes in 48-72 hours."
    },
    {
      "question": "What else can elevate CK-MB?",
      "answer": "Rhabdomyolysis, muscular trauma, electrical injury, and cardiac surgery."
    },
    {
      "question": "Is it still used?",
      "answer": "Less commonly now with high-sensitivity troponins. Still useful for reinfarction detection."
    }
  ],
  "references": [
    "ACC - Cardiac Biomarkers: https://www.acc.org/"
  ],
  "price": 350,
  "homeCollection": false,
  "tags": [
    "CK-MB",
    "creatine kinase",
    "heart attack",
    "cardiac",
    "reinfarction"
  ]
},
{
  "slug": "nt-probnp",
  "name": "NT-proBNP (N-Terminal Pro-B-Type Natriuretic Peptide)",
  "shortName": "NT-proBNP",
  "category": "Cardiac Markers",
  "subcategory": "Heart Failure",
  "description": "NT-proBNP is released by the heart in response to ventricular stretching. It is the gold standard biomarker for diagnosing and managing heart failure.",
  "purpose": "To diagnose and assess severity of heart failure.",
  "whyDone": [
    "To diagnose heart failure",
    "To assess heart failure severity",
    "To monitor treatment response",
    "To differentiate cardiac vs pulmonary causes of breathlessness"
  ],
  "whoNeedsIt": [
    "Patients with shortness of breath",
    "Patients with suspected heart failure",
    "Heart failure patients for monitoring"
  ],
  "symptoms": [
    "Shortness of breath",
    "Fatigue",
    "Swollen legs (edema)",
    "Rapid or irregular heartbeat",
    "Difficulty exercising"
  ],
  "conditionsDetected": [
    "Heart failure",
    "Acute decompensated heart failure",
    "Cardiomyopathy",
    "Valvular heart disease"
  ],
  "preparation": [
    "No fasting required",
    "Affected by age and kidney function"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Plasma (EDTA)",
  "turnaroundTime": "1-4 hours",
  "normalRange": "Age-adjusted: <450 (age <50), <900 (age 50-75), <1800 (age >75) pg/mL",
  "highResults": "Elevated NT-proBNP indicates ventricular strain. Higher levels indicate more severe heart failure.",
  "lowResults": "Low NT-proBNP effectively rules out heart failure (negative predictive value >98%).",
  "interpretation": "NT-proBNP is affected by age and kidney function. Age-adjusted cutoffs improve accuracy. Serial measurements guide treatment.",
  "relatedTests": [
    "bnp",
    "troponin-i",
    "ecg",
    "echocardiography"
  ],
  "relatedDiseases": [
    "Heart failure",
    "Cardiomyopathy",
    "Valvular heart disease"
  ],
  "relatedPackages": [
    "heart-failure-panel",
    "cardiac-panel"
  ],
  "faqs": [
    {
      "question": "What is the difference between BNP and NT-proBNP?",
      "answer": "Both measure the same thing. NT-proBNP has longer half-life and is less affected by obesity. Different cutoffs used."
    },
    {
      "question": "What level indicates heart failure?",
      "answer": "Age-adjusted: >450 (<50yo), >900 (50-75yo), >1800 (>75yo) pg/mL strongly suggests heart failure."
    },
    {
      "question": "Can it be used to monitor treatment?",
      "answer": "Yes, falling levels indicate treatment response. Rising levels suggest worsening heart failure."
    },
    {
      "question": "What lowers NT-proBNP?",
      "answer": "Effective heart failure treatment (diuretics, ACE inhibitors, beta-blockers), weight loss, exercise."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ESC - Heart Failure Guidelines: https://www.escardio.org/"
  ],
  "price": 400,
  "homeCollection": false,
  "tags": [
    "NT-proBNP",
    "BNP",
    "heart failure",
    "cardiac",
    "breathlessness"
  ]
},
{
  "slug": "bnp",
  "name": "B-Type Natriuretic Peptide (BNP)",
  "shortName": "BNP",
  "category": "Cardiac Markers",
  "subcategory": "Heart Failure",
  "description": "BNP is released by the heart in response to ventricular stretching. Used for diagnosis and monitoring of heart failure.",
  "purpose": "To diagnose heart failure and assess treatment response.",
  "whyDone": [
    "To diagnose heart failure",
    "To guide treatment in acute heart failure",
    "To differentiate cardiac vs pulmonary causes of dyspnea"
  ],
  "whoNeedsIt": [
    "Patients with acute shortness of breath",
    "Patients with suspected heart failure",
    "Heart failure patients on treatment"
  ],
  "symptoms": [
    "Shortness of breath",
    "Fatigue",
    "Swollen legs",
    "Weight gain",
    "Exercise intolerance"
  ],
  "conditionsDetected": [
    "Heart failure",
    "Acute decompensated heart failure",
    "Left ventricular dysfunction"
  ],
  "preparation": [
    "No fasting required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Plasma (EDTA)",
  "turnaroundTime": "1-4 hours",
  "normalRange": "<100 pg/mL (rules out HF), 100-400 (gray zone), >400 (suggests HF)",
  "highResults": "Elevated BNP indicates heart failure. >400 pg/mL strongly suggests diagnosis.",
  "lowResults": "BNP <100 pg/mL effectively rules out acute heart failure.",
  "interpretation": "BNP rises with ventricular strain. Affected by age, obesity, and kidney function. Useful for acute presentation and monitoring.",
  "relatedTests": [
    "nt-probnp",
    "troponin-i",
    "ecg",
    "echocardiography"
  ],
  "relatedDiseases": [
    "Heart failure",
    "Left ventricular dysfunction",
    "Cardiomyopathy"
  ],
  "relatedPackages": [
    "heart-failure-panel",
    "cardiac-panel"
  ],
  "faqs": [
    {
      "question": "What is the difference between BNP and NT-proBNP?",
      "answer": "BNP has shorter half-life (20 min vs 120 min). NT-proBNP is more stable and less affected by obesity."
    },
    {
      "question": "What level indicates heart failure?",
      "answer": ">400 pg/mL suggests heart failure. <100 rules it out. 100-400 is gray zone requiring clinical judgment."
    },
    {
      "question": "Can obesity lower BNP?",
      "answer": "Yes, obesity can falsely lower BNP. Consider using NT-proBNP in obese patients."
    },
    {
      "question": "How is it used for monitoring?",
      "answer": "Falling BNP indicates treatment response. Rising BNP suggests worsening heart failure."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "AHA - BNP and Heart Failure: https://www.heart.org/"
  ],
  "price": 400,
  "homeCollection": false,
  "tags": [
    "BNP",
    "heart failure",
    "cardiac",
    "natriuretic peptide",
    "dyspnea"
  ]
},
{
  "slug": "lipoprotein-a",
  "name": "Lipoprotein(a) [Lp(a)]",
  "shortName": "Lp(a)",
  "category": "Cardiac Markers",
  "subcategory": "Lipids",
  "description": "Lp(a) is a LDL-like particle with an additional apolipoprotein(a) component. It is an independent, genetically determined cardiovascular risk factor.",
  "purpose": "To assess genetic cardiovascular risk independent of other lipid levels.",
  "whyDone": [
    "To assess inherited cardiovascular risk",
    "To evaluate patients with premature heart disease",
    "To stratify risk in patients with normal lipid panels"
  ],
  "whoNeedsIt": [
    "Patients with premature heart disease",
    "Family history of heart disease",
    "Patients with normal lipids but high risk"
  ],
  "symptoms": [
    "Usually asymptomatic until cardiovascular event"
  ],
  "conditionsDetected": [
    "Elevated cardiovascular risk",
    "Atherosclerosis",
    "Premature coronary artery disease"
  ],
  "preparation": [
    "Fasting not required (Lp(a) is genetically determined and stable)"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Serum or plasma",
  "turnaroundTime": "24-48 hours",
  "normalRange": "<30 mg/dL (low risk), 30-50 (intermediate), >50 (high risk), >125 (very high risk)",
  "highResults": "Elevated Lp(a) is an independent cardiovascular risk factor. Levels >50 mg/dL significantly increase heart attack and stroke risk.",
  "lowResults": "Low Lp(a) indicates lower inherited cardiovascular risk.",
  "interpretation": "Lp(a) is 90% genetically determined. Does not respond significantly to lifestyle or most medications. Levels remain stable throughout life.",
  "relatedTests": [
    "lipid-profile",
    "ldl",
    "hs-crp",
    "coronary-calcium-score"
  ],
  "relatedDiseases": [
    "Cardiovascular disease",
    "Atherosclerosis",
    "Stroke",
    "Aortic stenosis"
  ],
  "relatedPackages": [
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "What is Lp(a)?",
      "answer": "An LDL-like particle with an additional protein (apolipoprotein(a)). It promotes atherosclerosis and blood clotting."
    },
    {
      "question": "Is it genetic?",
      "answer": "Yes, 90% determined by genetics. Levels remain stable throughout life and are not significantly affected by diet or exercise."
    },
    {
      "question": "What level is concerning?",
      "answer": ">50 mg/dL increases cardiovascular risk. >125 mg/dL indicates very high risk."
    },
    {
      "question": "How is it treated?",
      "answer": "Currently no approved medication specifically lowers Lp(a). Statins do not reduce it. PCSK9 inhibitors reduce it by 20-30%."
    },
    {
      "question": "When should it be tested?",
      "answer": "At least once in adults. Earlier if family history of premature heart disease. Do not need to retest as levels are stable."
    }
  ],
  "references": [
    "European Atherosclerosis Society - Lp(a): https://eas-society.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "Lp(a)",
    "lipoprotein(a)",
    "cardiovascular risk",
    "genetic",
    "lipids"
  ]
},
{
  "slug": "apo-a1",
  "name": "Apolipoprotein A-I (ApoA-I)",
  "shortName": "ApoA-I",
  "category": "Cardiac Markers",
  "subcategory": "Lipids",
  "description": "ApoA-I is the major protein component of HDL cholesterol. It promotes reverse cholesterol transport, removing cholesterol from arteries.",
  "purpose": "To assess HDL function and cardiovascular risk.",
  "whyDone": [
    "To evaluate HDL particle function",
    "To assess cardiovascular risk",
    "To investigate lipid metabolism disorders"
  ],
  "whoNeedsIt": [
    "Patients with cardiovascular risk factors",
    "Patients with family history of heart disease",
    "Patients with abnormal lipid panels"
  ],
  "symptoms": [
    "Usually asymptomatic"
  ],
  "conditionsDetected": [
    "Low HDL function",
    "Cardiovascular risk",
    "Familial lipid disorders"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn from a vein after fasting.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "Males: 104-202 mg/dL, Females: 108-225 mg/dL",
  "highResults": "High ApoA-I indicates good HDL function and lower cardiovascular risk.",
  "lowResults": "Low ApoA-I indicates reduced HDL function and increased cardiovascular risk.",
  "interpretation": "ApoA-I is a better marker of HDL function than HDL cholesterol level. Low levels indicate impaired reverse cholesterol transport.",
  "relatedTests": [
    "lipid-profile",
    "hdl",
    "apo-b",
    "lipoprotein-a"
  ],
  "relatedDiseases": [
    "Cardiovascular disease",
    "Familial hypoalphalipoproteinemia",
    "Tangier disease"
  ],
  "relatedPackages": [
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "How is it different from HDL?",
      "answer": "HDL measures cholesterol content. ApoA-I measures the protein component. ApoA-I better reflects HDL function."
    },
    {
      "question": "What does low ApoA-I mean?",
      "answer": "Reduced reverse cholesterol transport, increased cardiovascular risk. May indicate familial disorder."
    },
    {
      "question": "How can I raise ApoA-I?",
      "answer": "Exercise, weight loss, moderate alcohol, and certain medications (niacin, fibrates)."
    },
    {
      "question": "Is fasting required?",
      "answer": "Yes, fasting for 8-12 hours recommended."
    },
    {
      "question": "What is the ApoA-I/ApoB ratio?",
      "answer": "Ratio >1.0 indicates favorable lipid profile. <1.0 indicates increased cardiovascular risk."
    }
  ],
  "references": [
    "ACC - Apolipoprotein Testing: https://www.acc.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "ApoA-I",
    "apolipoprotein",
    "HDL",
    "cardiovascular risk",
    "lipids"
  ]
},
{
  "slug": "apo-b",
  "name": "Apolipoprotein B (ApoB)",
  "shortName": "ApoB",
  "category": "Cardiac Markers",
  "subcategory": "Lipids",
  "description": "ApoB is the primary protein in LDL, VLDL, and Lp(a) particles. Each atherogenic particle contains one ApoB molecule, making it a direct measure of atherogenic particle count.",
  "purpose": "To directly measure atherogenic particle count and assess cardiovascular risk.",
  "whyDone": [
    "To assess atherogenic particle burden",
    "To evaluate cardiovascular risk",
    "To guide statin therapy"
  ],
  "whoNeedsIt": [
    "Patients with cardiovascular risk factors",
    "Patients with discordant lipid panels",
    "Patients on statin therapy"
  ],
  "symptoms": [
    "Usually asymptomatic"
  ],
  "conditionsDetected": [
    "High atherogenic particle burden",
    "Cardiovascular risk",
    "Familial hypercholesterolemia"
  ],
  "preparation": [
    "Fasting for 8-12 hours recommended"
  ],
  "procedure": "Blood drawn from a vein after fasting.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "<90 mg/dL (low risk), 90-130 (borderline), 130-150 (high risk), >150 (very high risk)",
  "highResults": "High ApoB indicates high atherogenic particle burden, increasing cardiovascular risk regardless of LDL levels.",
  "lowResults": "Low ApoB indicates fewer atherogenic particles and lower cardiovascular risk.",
  "interpretation": "ApoB is the best single measure of atherogenic particle count. Better predictor of cardiovascular risk than LDL cholesterol.",
  "relatedTests": [
    "lipid-profile",
    "ldl",
    "apo-a1",
    "lipoprotein-a"
  ],
  "relatedDiseases": [
    "Cardiovascular disease",
    "Familial hypercholesterolemia",
    "Atherosclerosis"
  ],
  "relatedPackages": [
    "cardiac-risk-panel"
  ],
  "faqs": [
    {
      "question": "Why is ApoB better than LDL?",
      "answer": "LDL measures cholesterol mass. ApoB counts actual atherogenic particles. Some people have normal LDL but high ApoB (discordance)."
    },
    {
      "question": "What level is optimal?",
      "answer": "<90 mg/dL for most people. <80 mg/dL for high-risk patients. <60 mg/dL for very high-risk."
    },
    {
      "question": "What is LDL particle discordance?",
      "answer": "When LDL cholesterol is normal but ApoB is elevated, indicating more small dense atherogenic particles."
    },
    {
      "question": "Is fasting required?",
      "answer": "Yes, fasting for 8-12 hours recommended."
    },
    {
      "question": "How does it respond to treatment?",
      "answer": "Statins, ezetimibe, and PCSK9 inhibitors all reduce ApoB. Goal is to lower ApoB to target level."
    }
  ],
  "references": [
    "ACC - Apolipoprotein Testing: https://www.acc.org/"
  ],
  "price": 400,
  "homeCollection": true,
  "tags": [
    "ApoB",
    "apolipoprotein B",
    "atherogenic particles",
    "cardiovascular risk",
    "lipids"
  ]
},
{
  "slug": "pt-inr",
  "name": "Prothrombin Time and International Normalized Ratio (PT/INR)",
  "shortName": "PT/INR",
  "category": "Coagulation",
  "subcategory": "Coagulation",
  "description": "PT/INR measures the extrinsic and common coagulation pathways. INR standardizes PT results across laboratories. Essential for monitoring warfarin therapy.",
  "purpose": "To evaluate bleeding disorders and monitor warfarin therapy.",
  "whyDone": [
    "To monitor warfarin (Coumadin) therapy",
    "To evaluate bleeding or clotting disorders",
    "To assess liver function",
    "To prepare for surgery"
  ],
  "whoNeedsIt": [
    "Patients on warfarin therapy",
    "Patients with unexplained bleeding",
    "Patients with liver disease",
    "Pre-surgical patients"
  ],
  "symptoms": [
    "Easy bruising",
    "Prolonged bleeding from cuts",
    "Blood in urine or stool",
    "Heavy menstrual periods",
    "Nosebleeds"
  ],
  "conditionsDetected": [
    "Coagulation factor deficiency",
    "Liver disease",
    "Vitamin K deficiency",
    "DIC",
    "Warfarin effect"
  ],
  "preparation": [
    "Inform lab of all anticoagulant medications",
    "Fasting not required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Plasma (citrate)",
  "turnaroundTime": "1-4 hours",
  "normalRange": "PT: 11-13.5 seconds, INR: 0.8-1.2 (therapeutic on warfarin: 2.0-3.0)",
  "highResults": "Elevated PT/INR indicates coagulation factor deficiency, liver disease, vitamin K deficiency, or warfarin effect.",
  "lowResults": "Low PT/INR indicates hypercoagulable state or polycythemia.",
  "interpretation": "INR is used for warfarin monitoring. Target INR depends on condition: 2.0-3.0 for most indications, 2.5-3.5 for mechanical heart valves.",
  "relatedTests": [
    "aptt",
    "fibrinogen",
    "d-dimer",
    "liver-function-test"
  ],
  "relatedDiseases": [
    "Venous thromboembolism",
    "Atrial fibrillation",
    "Liver disease",
    "DIC"
  ],
  "relatedPackages": [
    "coagulation-panel",
    "pre-surgical-screening"
  ],
  "faqs": [
    {
      "question": "What INR is therapeutic?",
      "answer": "Most conditions: 2.0-3.0. Mechanical mitral valve: 2.5-3.5. Your doctor will set your target."
    },
    {
      "question": "What affects INR?",
      "answer": "Warfarin, vitamin K intake, antibiotics, liver disease, alcohol, and many drug interactions."
    },
    {
      "question": "How often should INR be checked?",
      "answer": "Weekly when starting warfarin, then every 2-4 weeks when stable. More frequently if INR is out of range."
    },
    {
      "question": "What if INR is too high?",
      "answer": ">4.5 increases bleeding risk. >5.0 may require holding warfarin or giving vitamin K. Seek immediate medical attention."
    },
    {
      "question": "Is fasting required?",
      "answer": "No, but inform the lab of all medications."
    }
  ],
  "references": [
    "ACCP - Anticoagulation Guidelines: https://www.chestnet.org/"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "PT",
    "INR",
    "warfarin",
    "coagulation",
    "bleeding",
    "blood thinners"
  ]
},
{
  "slug": "aptt",
  "name": "Activated Partial Thromboplastin Time (APTT)",
  "shortName": "APTT",
  "category": "Coagulation",
  "subcategory": "Coagulation",
  "description": "APTT measures the intrinsic and common coagulation pathways. Used to monitor heparin therapy and evaluate bleeding disorders.",
  "purpose": "To evaluate bleeding disorders and monitor heparin therapy.",
  "whyDone": [
    "To monitor unfractionated heparin therapy",
    "To evaluate bleeding tendency",
    "To screen for factor deficiencies",
    "To assess DIC"
  ],
  "whoNeedsIt": [
    "Patients on heparin therapy",
    "Patients with unexplained bleeding",
    "Pre-surgical patients",
    "Patients with suspected DIC"
  ],
  "symptoms": [
    "Easy bruising",
    "Prolonged bleeding",
    "Blood in urine or stool",
    "Joint bleeding"
  ],
  "conditionsDetected": [
    "Heparin effect",
    "Coagulation factor deficiency",
    "Hemophilia",
    "DIC",
    "Lupus anticoagulant"
  ],
  "preparation": [
    "Fasting not required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Plasma (citrate)",
  "turnaroundTime": "1-4 hours",
  "normalRange": "25-35 seconds (therapeutic on heparin: 1.5-2.5x control, typically 60-80 seconds)",
  "highResults": "Prolonged APTT indicates heparin effect, coagulation factor deficiency, hemophilia, or DIC.",
  "lowResults": "Shortened APTT may indicate hypercoagulable state.",
  "interpretation": "APTT is used for unfractionated heparin monitoring. Target is 1.5-2.5 times normal control. NOT used for LMWH monitoring.",
  "relatedTests": [
    "pt-inr",
    "fibrinogen",
    "d-dimer"
  ],
  "relatedDiseases": [
    "Hemophilia A and B",
    "DIC",
    "Venous thromboembolism"
  ],
  "relatedPackages": [
    "coagulation-panel"
  ],
  "faqs": [
    {
      "question": "What does prolonged APTT mean?",
      "answer": "Heparin therapy, factor deficiency (VIII, IX, XI, XII), lupus anticoagulant, liver disease, or DIC."
    },
    {
      "question": "How is heparin monitored?",
      "answer": "Target APTT is 1.5-2.5 times normal control. Adjust heparin dose to maintain target."
    },
    {
      "question": "Does LMWH need APTT monitoring?",
      "answer": "No, low molecular weight heparin (enoxaparin) does not require routine monitoring. Use anti-Xa if needed."
    },
    {
      "question": "What is hemophilia?",
      "answer": "Inherited deficiency of clotting factors (VIII = Hemophilia A, IX = Hemophilia B). Causes prolonged APTT with normal PT."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ACCP - Anticoagulation Guidelines: https://www.chestnet.org/"
  ],
  "price": 200,
  "homeCollection": true,
  "tags": [
    "APTT",
    "heparin",
    "coagulation",
    "bleeding",
    "hemophilia"
  ]
},
{
  "slug": "fibrinogen-test",
  "name": "Fibrinogen (Functional)",
  "shortName": "Fibrinogen",
  "category": "Coagulation",
  "subcategory": "Coagulation",
  "description": "Fibrinogen is a clotting protein converted to fibrin during coagulation. Essential for clot formation and measured in DIC and bleeding assessment.",
  "purpose": "To evaluate clotting ability and diagnose fibrinogen disorders.",
  "whyDone": [
    "To evaluate bleeding tendency",
    "To diagnose DIC",
    "To assess fibrinogen deficiency or excess",
    "To monitor thrombolytic therapy"
  ],
  "whoNeedsIt": [
    "Patients with unexplained bleeding",
    "Patients with suspected DIC",
    "Patients on thrombolytic therapy",
    "Pre-surgical patients"
  ],
  "symptoms": [
    "Prolonged bleeding",
    "Easy bruising",
    "Bleeding from multiple sites"
  ],
  "conditionsDetected": [
    "DIC",
    "Afibrinogenemia",
    "Hypofibrinogenemia",
    "Thrombosis (elevated)",
    "Liver disease"
  ],
  "preparation": [
    "Fasting not required"
  ],
  "procedure": "Blood drawn from a vein.",
  "sampleType": "Plasma (citrate)",
  "turnaroundTime": "2-4 hours",
  "normalRange": "200-400 mg/dL",
  "highResults": "Elevated fibrinogen is an acute phase reactant. Increased in inflammation, infection, and thrombosis.",
  "lowResults": "Low fibrinogen indicates DIC, liver failure, thrombolytic therapy, or congenital deficiency.",
  "interpretation": "Fibrinogen is consumed in DIC. Low fibrinogen with elevated D-Dimer and prolonged PT/APTT strongly suggests DIC.",
  "relatedTests": [
    "d-dimer",
    "pt-inr",
    "aptt"
  ],
  "relatedDiseases": [
    "DIC",
    "Liver failure",
    "Thrombosis",
    "Afibrinogenemia"
  ],
  "relatedPackages": [
    "coagulation-panel",
    "dic-panel"
  ],
  "faqs": [
    {
      "question": "What is DIC?",
      "answer": "Disseminated intravascular coagulation - widespread activation of clotting consuming clotting factors and fibrinogen, causing both bleeding and clotting."
    },
    {
      "question": "What does low fibrinogen mean?",
      "answer": "DIC, liver failure, thrombolytic therapy, or congenital deficiency. May cause serious bleeding."
    },
    {
      "question": "What does high fibrinogen mean?",
      "answer": "Inflammation, infection, stress, or thrombosis. Also an independent cardiovascular risk factor."
    },
    {
      "question": "Is it affected by pregnancy?",
      "answer": "Yes, fibrinogen rises during normal pregnancy. Levels >600 mg/dL may increase thrombosis risk."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "ISTH - DIC Scoring: https://www.isth.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "fibrinogen",
    "coagulation",
    "DIC",
    "bleeding",
    "clotting"
  ]
},
{
  "slug": "urine-routine",
  "name": "Urine Routine and Microscopy",
  "shortName": "Urine Routine",
  "category": "Urinalysis",
  "subcategory": "Routine",
  "description": "Comprehensive urinalysis including dipstick chemistry and microscopic examination. Screens for kidney disease, UTI, and metabolic disorders.",
  "purpose": "To screen for kidney disease, UTI, and metabolic disorders.",
  "whyDone": [
    "To screen for kidney disease",
    "To diagnose UTI",
    "To evaluate hematuria or proteinuria",
    "To monitor chronic kidney disease"
  ],
  "whoNeedsIt": [
    "Annual health checkups",
    "Patients with diabetes or hypertension",
    "Patients with urinary symptoms",
    "Pregnant women"
  ],
  "symptoms": [
    "Frequent urination",
    "Burning with urination",
    "Blood in urine",
    "Foamy urine",
    "Swelling (edema)"
  ],
  "conditionsDetected": [
    "UTI",
    "Kidney disease",
    "Diabetes",
    "Hematuria",
    "Proteinuria",
    "Kidney stones"
  ],
  "preparation": [
    "Clean-catch midstream sample preferred",
    "First morning sample best for proteinuria"
  ],
  "procedure": "Clean-catch midstream urine sample collected in sterile container.",
  "sampleType": "Urine",
  "turnaroundTime": "2-4 hours",
  "normalRange": "Color: yellow, pH: 4.5-8.0, Specific gravity: 1.005-1.030, Protein: negative, Glucose: negative, Blood: negative, Leukocytes: negative",
  "highResults": "Abnormal results may indicate UTI (leukocytes, nitrites), kidney disease (protein, blood), diabetes (glucose), or liver disease (bilirubin).",
  "lowResults": "Normal urinalysis does not rule out intermittent conditions like UTI or early kidney disease.",
  "interpretation": "Dipstick provides rapid screening. Microscopy confirms and identifies casts, crystals, and cellular elements.",
  "relatedTests": [
    "urine-microalbumin",
    "urine-culture",
    "creatinine"
  ],
  "relatedDiseases": [
    "UTI",
    "Kidney disease",
    "Diabetes",
    "Kidney stones",
    "Glomerulonephritis"
  ],
  "relatedPackages": [
    "kidney-panel",
    "uti-panel",
    "executive-health-checkup"
  ],
  "faqs": [
    {
      "question": "What does protein in urine mean?",
      "answer": "May indicate kidney disease, UTI, dehydration, or preeclampsia in pregnancy. Needs follow-up."
    },
    {
      "question": "What does blood in urine mean?",
      "answer": "UTI, kidney stones, kidney disease, or rarely cancer. Needs further evaluation."
    },
    {
      "question": "What do white blood cells mean?",
      "answer": "Usually indicates UTI. May also be contamination or kidney infection."
    },
    {
      "question": "How should I collect the sample?",
      "answer": "Clean-catch midstream: clean area, start urinating, collect midstream in sterile container."
    },
    {
      "question": "When is first morning sample best?",
      "answer": "For proteinuria detection, as urine is most concentrated. Also best for pregnancy testing."
    }
  ],
  "references": [
    "ADA - Urinalysis: https://www.diabetes.org/"
  ],
  "price": 150,
  "homeCollection": true,
  "tags": [
    "urine routine",
    "urinalysis",
    "UTI",
    "kidney disease",
    "screening"
  ]
},
{
  "slug": "urine-microalbumin",
  "name": "Urine Microalbumin (Albumin-to-Creatinine Ratio)",
  "shortName": "Microalbumin",
  "category": "Urinalysis",
  "subcategory": "Kidney",
  "description": "Microalbuminuria is the earliest sign of diabetic kidney disease. The albumin-to-creatinine ratio corrects for urine concentration.",
  "purpose": "To detect early kidney damage, especially in diabetes.",
  "whyDone": [
    "To screen for diabetic nephropathy",
    "To detect early kidney disease",
    "To monitor kidney disease progression"
  ],
  "whoNeedsIt": [
    "Patients with diabetes (annual screening)",
    "Patients with hypertension",
    "Patients with chronic kidney disease"
  ],
  "symptoms": [
    "Usually asymptomatic in early stages",
    "May have foamy urine or edema in advanced disease"
  ],
  "conditionsDetected": [
    "Diabetic nephropathy",
    "Early kidney disease",
    "Hypertensive nephrosclerosis"
  ],
  "preparation": [
    "First morning sample preferred",
    "Avoid strenuous exercise 24 hours before",
    "Avoid UTI if possible"
  ],
  "procedure": "First morning urine sample or random spot urine.",
  "sampleType": "Urine",
  "turnaroundTime": "24 hours",
  "normalRange": "ACR: <30 mg/g (normal), 30-300 (microalbuminuria), >300 (macroalbuminuria/overt proteinuria)",
  "highResults": "Microalbuminuria (30-300 mg/g) indicates early kidney damage. Macroalbuminuria (>300) indicates established kidney disease.",
  "lowResults": "Normal ACR indicates no significant albuminuria at this time.",
  "interpretation": "Two out of three samples needed for diagnosis due to variability. Microalbuminuria is reversible with early treatment.",
  "relatedTests": [
    "urine-routine",
    "creatinine",
    "hba1c",
    "blood-pressure"
  ],
  "relatedDiseases": [
    "Diabetic nephropathy",
    "Chronic kidney disease",
    "Hypertension"
  ],
  "relatedPackages": [
    "kidney-panel",
    "diabetes-panel"
  ],
  "faqs": [
    {
      "question": "What is microalbuminuria?",
      "answer": "Small amounts of albumin in urine (30-300 mg/g). Earliest sign of diabetic kidney disease."
    },
    {
      "question": "How often should diabetics be screened?",
      "answer": "Annually starting at diagnosis for Type 2, 5 years after diagnosis for Type 1."
    },
    {
      "question": "Can it be reversed?",
      "answer": "Yes, with tight blood sugar control, ACE inhibitors or ARBs, and blood pressure control."
    },
    {
      "question": "What if it is positive?",
      "answer": "Confirm with repeat testing. Start ACE inhibitor or ARB if confirmed. Optimize diabetes and blood pressure control."
    },
    {
      "question": "Is fasting required?",
      "answer": "No. First morning sample preferred."
    }
  ],
  "references": [
    "ADA - Diabetic Nephropathy: https://www.diabetes.org/"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "microalbumin",
    "ACR",
    "diabetic nephropathy",
    "kidney disease",
    "albuminuria"
  ]
},
{
  "slug": "urine-protein-creatinine",
  "name": "Urine Protein-to-Creatinine Ratio (UPCR)",
  "shortName": "UPCR",
  "category": "Urinalysis",
  "subcategory": "Kidney",
  "description": "UPCR provides an estimate of 24-hour protein excretion from a spot urine sample. Used to quantify proteinuria.",
  "purpose": "To quantify proteinuria without 24-hour urine collection.",
  "whyDone": [
    "To quantify proteinuria",
    "To monitor kidney disease progression",
    "To evaluate nephrotic syndrome"
  ],
  "whoNeedsIt": [
    "Patients with proteinuria on screening",
    "Patients with known kidney disease",
    "Patients with edema or nephrotic symptoms"
  ],
  "symptoms": [
    "Foamy urine",
    "Edema (swelling)",
    "Weight gain",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Proteinuria",
    "Nephrotic syndrome",
    "Chronic kidney disease",
    "Diabetic nephropathy"
  ],
  "preparation": [
    "Random or first morning sample",
    "No fasting required"
  ],
  "procedure": "Random urine sample.",
  "sampleType": "Urine",
  "turnaroundTime": "24 hours",
  "normalRange": "<0.2 g/g (normal), 0.2-3.5 (nephrotic range), >3.5 (nephrotic syndrome)",
  "highResults": "Elevated UPCR indicates proteinuria. >3.5 g/g suggests nephrotic syndrome.",
  "lowResults": "Normal UPCR indicates no significant proteinuria.",
  "interpretation": "UPCR >0.5 g/g correlates with >500 mg/24hr proteinuria. Eliminates need for timed collections in most cases.",
  "relatedTests": [
    "urine-routine",
    "urine-microalbumin",
    "creatinine",
    "albumin"
  ],
  "relatedDiseases": [
    "Nephrotic syndrome",
    "Chronic kidney disease",
    "Diabetic nephropathy"
  ],
  "relatedPackages": [
    "kidney-panel"
  ],
  "faqs": [
    {
      "question": "What is the advantage over 24-hour collection?",
      "answer": "Simpler, more convenient, and equally accurate. Eliminates errors from incomplete collections."
    },
    {
      "question": "What does >3.5 g/g mean?",
      "answer": "Nephrotic-range proteinuria. Suggests nephrotic syndrome with edema, low albumin, and high cholesterol."
    },
    {
      "question": "Can it be affected by exercise?",
      "answer": "Yes, strenuous exercise can temporarily increase proteinuria. Avoid exercise 24 hours before."
    },
    {
      "question": "What is nephrotic syndrome?",
      "answer": "Triad of proteinuria >3.5 g/day, low serum albumin, and edema. Requires kidney biopsy for diagnosis."
    },
    {
      "question": "Is fasting required?",
      "answer": "No."
    }
  ],
  "references": [
    "NKF - Proteinuria: https://www.kidney.org/"
  ],
  "price": 250,
  "homeCollection": true,
  "tags": [
    "UPCR",
    "proteinuria",
    "protein-creatinine ratio",
    "kidney disease",
    "nephrotic syndrome"
  ]
},
{
  "slug": "24-hour-urine-protein",
  "name": "24-Hour Urine Protein",
  "shortName": "24hr Urine Protein",
  "category": "Urinalysis",
  "subcategory": "Kidney",
  "description": "Gold standard for quantifying protein excretion over 24 hours. Collects all urine produced in a day to measure total protein loss.",
  "purpose": "To accurately quantify 24-hour protein excretion.",
  "whyDone": [
    "To confirm proteinuria quantification",
    "To evaluate nephrotic syndrome",
    "To monitor kidney disease"
  ],
  "whoNeedsIt": [
    "Patients with significant proteinuria",
    "Patients being evaluated for nephrotic syndrome",
    "Pregnant women with preeclampsia"
  ],
  "symptoms": [
    "Foamy urine",
    "Edema",
    "Weight gain",
    "Fatigue"
  ],
  "conditionsDetected": [
    "Nephrotic syndrome",
    "Chronic kidney disease",
    "Preeclampsia",
    "Glomerulonephritis"
  ],
  "preparation": [
    "Start collection in morning, discard first void, collect all urine for 24 hours",
    "Keep sample refrigerated"
  ],
  "procedure": "24-hour urine collection in provided container.",
  "sampleType": "Urine (24-hour collection)",
  "turnaroundTime": "24-48 hours",
  "normalRange": "<150 mg/24 hours (normal), >3500 mg/24 hours (nephrotic range)",
  "highResults": "Elevated protein excretion indicates kidney disease. >3500 mg suggests nephrotic syndrome.",
  "lowResults": "Normal protein excretion excludes significant kidney disease.",
  "interpretation": "Complete 24-hour collection is critical. Incomplete collections can be assessed by comparing urine creatinine to expected values.",
  "relatedTests": [
    "urine-protein-creatinine",
    "urine-routine",
    "albumin"
  ],
  "relatedDiseases": [
    "Nephrotic syndrome",
    "Chronic kidney disease",
    "Preeclampsia"
  ],
  "relatedPackages": [
    "kidney-panel"
  ],
  "faqs": [
    {
      "question": "Why collect for 24 hours?",
      "answer": "Gold standard for quantifying total daily protein loss. More accurate than spot measurements in some cases."
    },
    {
      "question": "How do I collect properly?",
      "answer": "Start in morning, discard first void. Collect ALL urine for next 24 hours. Keep refrigerated. Deliver to lab."
    },
    {
      "question": "What if I miss a collection?",
      "answer": "The test may need to be repeated. Inform your healthcare provider."
    },
    {
      "question": "What is nephrotic-range proteinuria?",
      "answer": ">3500 mg/24 hours. Associated with edema, low albumin, and high lipids."
    },
    {
      "question": "Can UPCR replace this test?",
      "answer": "For most clinical purposes, yes. 24-hour collection reserved for cases where UPCR is inconclusive."
    }
  ],
  "references": [
    "NKF - Proteinuria Testing: https://www.kidney.org/"
  ],
  "price": 300,
  "homeCollection": true,
  "tags": [
    "24-hour urine",
    "proteinuria",
    "kidney disease",
    "nephrotic syndrome"
  ]
},
{
  "slug": "acth",
  "name": "Adrenocorticotropic Hormone (ACTH)",
  "shortName": "ACTH",
  "category": "Endocrinology",
  "subcategory": "Adrenal",
  "description": "ACTH is produced by the pituitary and stimulates cortisol production from the adrenal glands. Used to evaluate adrenal and pituitary function.",
  "purpose": "To evaluate adrenal and pituitary function.",
  "whyDone": [
    "To diagnose Cushing's disease vs ectopic ACTH",
    "To evaluate Addison's disease",
    "To differentiate primary vs secondary adrenal insufficiency"
  ],
  "whoNeedsIt": [
    "Patients with suspected Cushing's syndrome",
    "Patients with suspected adrenal insufficiency",
    "Patients with abnormal cortisol levels"
  ],
  "symptoms": [
    "Weight gain",
    "Moon face",
    "Buffalo hump",
    "Fatigue",
    "Muscle weakness",
    "Dark skin pigmentation"
  ],
  "conditionsDetected": [
    "Cushing's disease",
    "Ectopic ACTH syndrome",
    "Addison's disease",
    "Secondary adrenal insufficiency",
    "ACTH-producing pituitary adenoma"
  ],
  "preparation": [
    "Morning sample preferred (8 AM)",
    "Avoid stress before testing",
    "Avoid steroid medications if possible"
  ],
  "procedure": "Blood drawn from a vein in the morning.",
  "sampleType": "Plasma (EDTA)",
  "turnaroundTime": "24-48 hours",
  "normalRange": "7-63 pg/mL (8 AM)",
  "highResults": "Elevated ACTH with high cortisol suggests Cushing's disease (pituitary) or ectopic ACTH. Very high levels suggest ectopic source.",
  "lowResults": "Low ACTH with low cortisol suggests secondary (pituitary) adrenal insufficiency. High cortisol with low ACTH suggests adrenal tumor.",
  "interpretation": "ACTH stimulation test and dexamethasone suppression test are used alongside ACTH for complete evaluation.",
  "relatedTests": [
    "cortisol",
    "dhea-s",
    "dexamethasone-suppression-test"
  ],
  "relatedDiseases": [
    "Cushing's syndrome",
    "Addison's disease",
    "Pituitary adenoma"
  ],
  "relatedPackages": [
    "adrenal-panel"
  ],
  "faqs": [
    {
      "question": "What does high ACTH mean?",
      "answer": "Cushing's disease (pituitary source) or ectopic ACTH production (lung tumor, etc.). Paired with cortisol levels."
    },
    {
      "question": "What does low ACTH mean?",
      "answer": "Secondary adrenal insufficiency (pituitary problem). Adrenal glands are not stimulated enough."
    },
    {
      "question": "When should it be tested?",
      "answer": "Morning (8 AM) when ACTH peaks. Always interpret with cortisol level."
    },
    {
      "question": "What is the difference between primary and secondary adrenal insufficiency?",
      "answer": "Primary (Addison's): adrenal gland problem, high ACTH. Secondary: pituitary problem, low ACTH."
    },
    {
      "question": "Is fasting required?",
      "answer": "No, but morning sample preferred."
    }
  ],
  "references": [
    "Endocrine Society - Cushing's: https://www.endocrine.org/"
  ],
  "price": 400,
  "homeCollection": false,
  "tags": [
    "ACTH",
    "adrenal",
    "Cushing's",
    "Addison's",
    "pituitary",
    "hormones"
  ]
},
{
  "slug": "parathyroid-hormone",
  "name": "Parathyroid Hormone (PTH)",
  "shortName": "PTH",
  "category": "Endocrinology",
  "subcategory": "Calcium",
  "description": "PTH is produced by the parathyroid glands and regulates calcium and phosphorus metabolism. Essential for bone health and calcium homeostasis.",
  "purpose": "To evaluate calcium metabolism and parathyroid gland function.",
  "whyDone": [
    "To diagnose hyperparathyroidism",
    "To evaluate hypocalcemia",
    "To assess bone metabolism",
    "To investigate kidney stones"
  ],
  "whoNeedsIt": [
    "Patients with high or low calcium",
    "Patients with osteoporosis",
    "Patients with recurrent kidney stones",
    "Patients with fatigue and bone pain"
  ],
  "symptoms": [
    "Bone pain",
    "Fatigue",
    "Weakness",
    "Kidney stones",
    "Abdominal pain",
    "Confusion",
    "Constipation"
  ],
  "conditionsDetected": [
    "Primary hyperparathyroidism",
    "Hypoparathyroidism",
    "Secondary hyperparathyroidism",
    "Vitamin D deficiency"
  ],
  "preparation": [
    "Fasting preferred for accurate calcium measurement",
    "Avoid biotin supplements 48 hours before"
  ],
  "procedure": "Blood drawn from a vein after fasting.",
  "sampleType": "Serum",
  "turnaroundTime": "24-48 hours",
  "normalRange": "10-65 pg/mL",
  "highResults": "Elevated PTH with high calcium indicates primary hyperparathyroidism. Elevated PTH with low calcium indicates secondary hyperparathyroidism (vitamin D deficiency).",
  "lowResults": "Low PTH with high calcium indicates non-PTH-mediated hypercalcemia (malignancy, sarcoidosis). Low PTH with low calcium indicates hypoparathyroidism.",
  "interpretation": "PTH must always be interpreted alongside calcium and vitamin D levels. PTH and calcium should move in opposite directions in normal physiology.",
  "relatedTests": [
    "calcium",
    "phosphorus",
    "vitamin-d",
    "alkaline-phosphatase"
  ],
  "relatedDiseases": [
    "Hyperparathyroidism",
    "Hypoparathyroidism",
    "Osteoporosis",
    "Kidney stones"
  ],
  "relatedPackages": [
    "bone-health-panel",
    "calcium-panel"
  ],
  "faqs": [
    {
      "question": "What does high PTH mean?",
      "answer": "Primary hyperparathyroidism (usually parathyroid adenoma). Causes high calcium, bone loss, and kidney stones."
    },
    {
      "question": "What does low PTH mean?",
      "answer": "Hypoparathyroidism (usually post-surgical) or non-PTH-mediated hypercalcemia (malignancy)."
    },
    {
      "question": "How does it relate to calcium?",
      "answer": "PTH raises blood calcium by increasing bone resorption, kidney reabsorption, and vitamin D activation."
    },
    {
      "question": "Is fasting required?",
      "answer": "Fasting preferred for accurate calcium measurement, which is essential for PTH interpretation."
    },
    {
      "question": "What is the treatment for hyperparathyroidism?",
      "answer": "Surgery (parathyroidectomy) is the definitive treatment. Mild cases may be monitored with calcium and vitamin D."
    }
  ],
  "references": [
    "Endocrine Society - Hyperparathyroidism: https://www.endocrine.org/"
  ],
  "price": 350,
  "homeCollection": true,
  "tags": [
    "PTH",
    "parathyroid hormone",
    "calcium",
    "hyperparathyroidism",
    "bone health"
  ]
}

];

export const getTestBySlug = (slug: string): TestData | undefined => {
  return testsData.find((test) => test.slug === slug);
};

export const getTestsByCategory = (category: string): TestData[] => {
  return testsData.filter((test) => test.category === category);
};
