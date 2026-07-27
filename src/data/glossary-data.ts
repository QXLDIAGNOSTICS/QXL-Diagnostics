export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category: string;
  relatedTests: string[];
  relatedDiseases: string[];
}

export const glossaryData: GlossaryTerm[] = [
  {
    term: "AFP (Alpha-Fetoprotein)",
    slug: "alpha-fetoprotein",
    definition: "A glycoprotein produced during fetal development by the yolk sac and liver. In adults, elevated AFP can indicate liver cancer, germ cell tumors, or liver disease. It is also used during pregnancy to screen for neural tube defects.",
    category: "Tumor Markers",
    relatedTests: ["Liver Function Tests", "CEA", "Beta-HCG"],
    relatedDiseases: ["Liver Cancer", "Germ Cell Tumors", "Hepatocellular Carcinoma"]
  },
  {
    term: "Albumin",
    slug: "albumin",
    definition: "The most abundant protein in human blood plasma, synthesized by the liver. It maintains oncotic pressure and transports hormones, vitamins, and drugs. Low levels indicate liver disease, kidney disease, or malnutrition.",
    category: "Proteins & Electrolytes",
    relatedTests: ["Total Protein", "Globulin", "Liver Function Tests", "Kidney Function Tests"],
    relatedDiseases: ["Liver Cirrhosis", "Nephrotic Syndrome", "Malnutrition"]
  },
  {
    term: "Alkaline Phosphatase (ALP)",
    slug: "alkaline-phosphatase",
    definition: "An enzyme found in liver, bones, kidneys, and digestive system. Elevated levels may indicate liver disease, bone disorders, or bile duct obstruction. Different isoenzymes help identify the source.",
    category: "Liver & Enzymes",
    relatedTests: ["Liver Function Tests", "Gamma-GT", "Bilirubin"],
    relatedDiseases: ["Liver Disease", "Bone Disorders", "Bile Duct Obstruction", "Paget's Disease"]
  },
  {
    term: "Alpha-1 Antitrypsin",
    slug: "alpha-1-antitrypsin",
    definition: "A protein produced by the liver that protects the lungs from damage by enzymes. Deficiency can lead to lung disease (emphysema) and liver disease.",
    category: "Proteins & Electrolytes",
    relatedTests: ["Liver Function Tests", "Lung Function Tests"],
    relatedDiseases: ["Emphysema", "Liver Disease", "COPD"]
  },
  {
    term: "ANA (Antinuclear Antibody)",
    slug: "ana-antinuclear-antibody",
    definition: "An autoantibody that targets the nucleus of cells. A positive ANA test indicates an autoimmune condition but is not specific to any one disease. It is a screening test for systemic lupus erythematosus (SLE) and other autoimmune disorders.",
    category: "Autoimmune Markers",
    relatedTests: ["Anti-dsDNA", "Anti-CCP", "Rheumatoid Factor", "Complement C3", "Complement C4"],
    relatedDiseases: ["Systemic Lupus Erythematosus", "Sjögren's Syndrome", "Rheumatoid Arthritis", "Scleroderma"]
  },
  {
    term: "Anti-CCP (Anti-Cyclic Citrullinated Peptide)",
    slug: "anti-ccp",
    definition: "An autoantibody highly specific for rheumatoid arthritis. Anti-CCP can detect RA earlier and more specifically than rheumatoid factor, and positive results indicate a more aggressive disease course.",
    category: "Autoimmune Markers",
    relatedTests: ["Rheumatoid Factor", "ANA", "ESR", "CRP"],
    relatedDiseases: ["Rheumatoid Arthritis"]
  },
  {
    term: "Anti-dsDNA",
    slug: "anti-ds-double-stranded-dna",
    definition: "An autoantibody directed against double-stranded DNA, highly specific for systemic lupus erythematosus (SLE). Levels correlate with disease activity, particularly lupus nephritis.",
    category: "Autoimmune Markers",
    relatedTests: ["ANA", "Complement C3", "Complement C4", "ESR", "CRP"],
    relatedDiseases: ["Systemic Lupus Erythematosus", "Lupus Nephritis"]
  },
  {
    term: "Anti-TPO (Anti-Thyroid Peroxidase Antibody)",
    slug: "anti-tpo",
    definition: "An autoantibody against thyroid peroxidase, an enzyme essential for thyroid hormone production. Elevated levels indicate autoimmune thyroid disease, primarily Hashimoto's thyroiditis and Graves' disease.",
    category: "Thyroid",
    relatedTests: ["TSH", "T3", "T4", "Thyroglobulin Antibody"],
    relatedDiseases: ["Hashimoto's Thyroiditis", "Graves' Disease", "Hypothyroidism"]
  },
  {
    term: "APTT (Activated Partial Thromboplastin Time)",
    slug: "aptt",
    definition: "A blood test that measures how long it takes blood to clot via the intrinsic pathway. Used to monitor heparin therapy and diagnose bleeding disorders such as hemophilia.",
    category: "Coagulation",
    relatedTests: ["PT/INR", "D-Dimer", "Fibrinogen", "Bleeding Time"],
    relatedDiseases: ["Hemophilia", "DIC", "Liver Disease", "Von Willebrand Disease"]
  },
  {
    term: "Apolipoprotein A-1 (Apo A-1)",
    slug: "apolipoprotein-a1",
    definition: "The main protein component of HDL (good) cholesterol. Low levels are associated with increased cardiovascular risk. It promotes reverse cholesterol transport from tissues to the liver.",
    category: "Cardiovascular",
    relatedTests: ["Lipid Profile", "HDL", "LDL", "Apolipoprotein B", "Lipoprotein(a)"],
    relatedDiseases: ["Cardiovascular Disease", "Atherosclerosis"]
  },
  {
    term: "Apolipoprotein B (Apo B)",
    slug: "apolipoprotein-b",
    definition: "The primary protein in LDL (bad) cholesterol particles. Elevated Apo B indicates higher cardiovascular risk. It is considered a better predictor of heart disease than standard LDL cholesterol.",
    category: "Cardiovascular",
    relatedTests: ["Lipid Profile", "LDL", "Apolipoprotein A-1", "Lipoprotein(a)"],
    relatedDiseases: ["Cardiovascular Disease", "Atherosclerosis", "Familial Hypercholesterolemia"]
  },
  {
    term: "Basophils",
    slug: "basophils",
    definition: "The least common type of white blood cell, making up less than 1% of total WBCs. They release histamine and heparin and play a role in allergic reactions and parasitic infections.",
    category: "Hematology",
    relatedTests: ["CBC", "WBC Differential", "Allergy Panel"],
    relatedDiseases: ["Allergic Reactions", "Chronic Myelogenous Leukemia", "Hypothyroidism"]
  },
  {
    term: "Beta-HCG (Human Chorionic Gonadotropin)",
    slug: "beta-hcg",
    definition: "A hormone produced by the placenta during pregnancy. Used to detect and monitor pregnancy, and as a tumor marker for gestational trophoblastic disease and certain cancers.",
    category: "Tumor Markers",
    relatedTests: ["Pregnancy Test", "AFP", "CA-125"],
    relatedDiseases: ["Pregnancy", "Gestational Trophoblastic Disease", "Testicular Cancer"]
  },
  {
    term: "Bicarbonate (HCO3-)",
    slug: "bicarbonate",
    definition: "An electrolyte that helps maintain acid-base balance in the blood. Low levels indicate metabolic acidosis; high levels indicate metabolic alkalosis. Essential for kidney and lung function assessment.",
    category: "Electrolytes",
    relatedTests: ["Electrolyte Panel", "ABG", "Kidney Function Tests", "Chloride"],
    relatedDiseases: ["Metabolic Acidosis", "Kidney Disease", "Diabetic Ketoacidosis"]
  },
  {
    term: "Bilirubin",
    slug: "bilirubin",
    definition: "A yellow pigment produced from the breakdown of hemoglobin. Processed by the liver and excreted in bile. Elevated levels cause jaundice and may indicate liver disease, bile duct obstruction, or hemolytic anemia.",
    category: "Liver & Enzymes",
    relatedTests: ["Liver Function Tests", "Albumin", "SGOT", "SGPT"],
    relatedDiseases: ["Jaundice", "Liver Disease", "Gallstones", "Hemolytic Anemia"]
  },
  {
    term: "Blood Urea Nitrogen (BUN)",
    slug: "blood-urea-nitrogen",
    definition: "A waste product formed in the liver from protein metabolism and excreted by the kidneys. Elevated BUN may indicate kidney disease, dehydration, or high protein intake. Used with creatinine to assess kidney function.",
    category: "Kidney",
    relatedTests: ["Creatinine", "eGFR", "Kidney Function Tests", "Uric Acid"],
    relatedDiseases: ["Kidney Disease", "Dehydration", "Heart Failure"]
  },
  {
    term: "BNP (B-type Natriuretic Peptide)",
    slug: "bnp",
    definition: "A hormone released by the heart ventricles in response to increased wall stress. Elevated levels are a key marker for diagnosing and monitoring heart failure severity.",
    category: "Cardiovascular",
    relatedTests: ["NT-proBNP", "Troponin", "CK-MB", "Lipid Profile"],
    relatedDiseases: ["Heart Failure", "Congestive Heart Failure", "Cardiomyopathy"]
  },
  {
    term: "Bleeding Time",
    slug: "bleeding-time",
    definition: "A test that measures how quickly small blood vessels constrict and form a platelet plug after a standardized puncture. Evaluates platelet function and vascular integrity.",
    category: "Coagulation",
    relatedTests: ["Platelet Count", "PT/INR", "APTT"],
    relatedDiseases: ["Platelet Disorders", "Von Willebrand Disease", "Aspirin Therapy Monitoring"]
  },
  {
    term: "Calcium",
    slug: "calcium",
    definition: "The most abundant mineral in the body, essential for bone health, muscle contraction, nerve signaling, and blood clotting. Regulated by parathyroid hormone and vitamin D. Abnormal levels affect multiple organ systems.",
    category: "Electrolytes & Minerals",
    relatedTests: ["Phosphorus", "Magnesium", "PTH", "Vitamin D"],
    relatedDiseases: ["Osteoporosis", "Hyperparathyroidism", "Hypocalcemia", "Kidney Stones"]
  },
  {
    term: "CA-125 (Cancer Antigen 125)",
    slug: "ca-125",
    definition: "A glycoprotein biomarker primarily used to monitor ovarian cancer treatment and detect recurrence. Elevated in ovarian, endometrial, and some other cancers, as well as benign conditions like endometriosis.",
    category: "Tumor Markers",
    relatedTests: ["AFP", "CEA", "CA-19.9"],
    relatedDiseases: ["Ovarian Cancer", "Endometrial Cancer", "Endometriosis"]
  },
  {
    term: "CA-19.9 (Cancer Antigen 19.9)",
    slug: "ca-19-9",
    definition: "A tumor marker primarily associated with pancreatic cancer. Also elevated in bile duct cancer, gastric cancer, and some benign conditions. Used for monitoring treatment response.",
    category: "Tumor Markers",
    relatedTests: ["CEA", "AFP", "CA-125"],
    relatedDiseases: ["Pancreatic Cancer", "Bile Duct Cancer", "Gastric Cancer"]
  },
  {
    term: "CBC (Complete Blood Count)",
    slug: "complete-blood-count",
    definition: "A comprehensive blood test that evaluates overall health and detects anemia, infection, and many other disorders. Measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
    category: "Hematology",
    relatedTests: ["Hemoglobin", "Hematocrit", "WBC", "RBC", "Platelet Count", "MCV", "MCH", "MCHC", "RDW"],
    relatedDiseases: ["Anemia", "Infection", "Leukemia", "Blood Disorders"]
  },
  {
    term: "CEA (Carcinoembryonic Antigen)",
    slug: "carcinoembryonic-antigen",
    definition: "A glycoprotein normally produced during fetal development. In adults, elevated CEA may indicate colorectal cancer, and it is used to monitor treatment response and recurrence.",
    category: "Tumor Markers",
    relatedTests: ["AFP", "CA-19.9", "CA-125", "Fecal Occult Blood"],
    relatedDiseases: ["Colorectal Cancer", "Lung Cancer", "Pancreatic Cancer"]
  },
  {
    term: "Chloride",
    slug: "chloride",
    definition: "An essential electrolyte that helps maintain fluid balance, blood volume, and acid-base balance. Works closely with sodium and bicarbonate. Abnormal levels can indicate kidney disease or dehydration.",
    category: "Electrolytes",
    relatedTests: ["Sodium", "Potassium", "Bicarbonate", "Electrolyte Panel"],
    relatedDiseases: ["Dehydration", "Kidney Disease", "Metabolic Acidosis"]
  },
  {
    term: "CK-MB (Creatine Kinase-MB)",
    slug: "ck-mb",
    definition: "An isoenzyme of creatine kinase found predominantly in heart muscle. Elevated levels within 4-6 hours of chest pain indicate myocardial infarction (heart attack). Now largely supplemented by troponin testing.",
    category: "Cardiovascular",
    relatedTests: ["Troponin", "LDH", "BNP", "Lipid Profile"],
    relatedDiseases: ["Myocardial Infarction", "Heart Attack", "Myocarditis"]
  },
  {
    term: "C-Peptide",
    slug: "c-peptide",
    definition: "A byproduct of insulin production that indicates how much insulin the pancreas is producing. Used to differentiate type 1 from type 2 diabetes and assess beta-cell function.",
    category: "Diabetes & Endocrine",
    relatedTests: ["Insulin", "Fasting Blood Sugar", "HbA1c", "HOMA-IR"],
    relatedDiseases: ["Type 1 Diabetes", "Type 2 Diabetes", "Insulinoma"]
  },
  {
    term: "CRP (C-Reactive Protein)",
    slug: "c-reactive-protein",
    definition: "An acute-phase protein produced by the liver in response to inflammation. Highly sensitive CRP (hs-CRP) is used to assess cardiovascular risk. Standard CRP detects and monitors infection and inflammatory conditions.",
    category: "Inflammation Markers",
    relatedTests: ["ESR", "Procalcitonin", "CBC", "hs-CRP"],
    relatedDiseases: ["Infection", "Autoimmune Disease", "Cardiovascular Disease", "Inflammatory Conditions"]
  },
  {
    term: "Creatinine",
    slug: "creatine",
    definition: "A waste product from muscle metabolism excreted by the kidneys. Blood creatinine levels are used to estimate kidney function (eGFR). Elevated levels indicate impaired kidney function.",
    category: "Kidney",
    relatedTests: ["BUN", "eGFR", "Kidney Function Tests", "Uric Acid"],
    relatedDiseases: ["Kidney Disease", "Acute Kidney Injury", "Chronic Kidney Disease"]
  },
  {
    term: "Cortisol",
    slug: "cortisol",
    definition: "A steroid hormone produced by the adrenal glands, often called the 'stress hormone.' Regulates metabolism, immune response, and stress response. Abnormal levels indicate Cushing's syndrome or Addison's disease.",
    category: "Hormones & Endocrine",
    relatedTests: ["DHEA-S", "ACTH", "Aldosterone"],
    relatedDiseases: ["Cushing's Syndrome", "Addison's Disease", "Adrenal Insufficiency"]
  },
  {
    term: "D-Dimer",
    slug: "d-dimer",
    definition: "A fibrin degradation product, a small protein fragment present in blood after a blood clot is degraded. Elevated levels indicate active clotting and are used to rule out deep vein thrombosis and pulmonary embolism.",
    category: "Coagulation",
    relatedTests: ["Fibrinogen", "PT/INR", "APTT"],
    relatedDiseases: ["Deep Vein Thrombosis", "Pulmonary Embolism", "DIC", "Blood Clots"]
  },
  {
    term: "DHEA-S (Dehydroepiandrosterone Sulfate)",
    slug: "dhea-s",
    definition: "An androgen hormone produced by the adrenal glands. Serves as a precursor to male and female sex hormones. Used to evaluate adrenal function and diagnose adrenal tumors or hyperplasia.",
    category: "Hormones & Endocrine",
    relatedTests: ["Testosterone", "Cortisol", "FSH", "LH"],
    relatedDiseases: ["PCOS", "Adrenal Tumors", "Adrenal Hyperplasia"]
  },
  {
    term: "Eosinophils",
    slug: "eosinophils",
    definition: "A type of white blood cell involved in fighting parasitic infections and allergic reactions. Elevated levels (eosinophilia) commonly indicate allergies, asthma, or parasitic infections.",
    category: "Hematology",
    relatedTests: ["CBC", "WBC Differential", "IgE"],
    relatedDiseases: ["Allergies", "Asthma", "Parasitic Infections", "Eosinophilic Esophagitis"]
  },
  {
    term: "ESR (Erythrocyte Sedimentation Rate)",
    slug: "erythrocyte-sedimentation-rate",
    definition: "A non-specific marker of inflammation that measures how quickly red blood cells settle at the bottom of a tube. Elevated ESR indicates inflammation or infection but does not identify the cause.",
    category: "Inflammation Markers",
    relatedTests: ["CRP", "CBC", "hs-CRP", "Procalcitonin"],
    relatedDiseases: ["Infection", "Autoimmune Disease", "Cancer", "Inflammatory Conditions"]
  },
  {
    term: "Estradiol (E2)",
    slug: "estradiol",
    definition: "The primary estrogen hormone in women, produced mainly by the ovaries. Regulates the menstrual cycle, reproductive function, and bone health. Also present in small amounts in men.",
    category: "Hormones & Endocrine",
    relatedTests: ["FSH", "LH", "Progesterone", "Testosterone", "AMH"],
    relatedDiseases: ["PCOS", "Menopause", "Infertility", "Estrogen Deficiency"]
  },
  {
    term: "eGFR (Estimated Glomerular Filtration Rate)",
    slug: "egfr",
    definition: "A calculated value based on creatinine that estimates how well the kidneys filter waste. Below 60 mL/min indicates kidney disease; below 15 indicates kidney failure.",
    category: "Kidney",
    relatedTests: ["Creatinine", "BUN", "Kidney Function Tests"],
    relatedDiseases: ["Chronic Kidney Disease", "Acute Kidney Injury", "Kidney Failure"]
  },
  {
    term: "Fasting Blood Sugar (FBS/FPG)",
    slug: "fasting-blood-sugar",
    definition: "Blood glucose measured after at least 8 hours of fasting. Normal range is 70-100 mg/dL. Levels of 100-125 indicate prediabetes; 126 or higher on two occasions indicates diabetes.",
    category: "Diabetes & Endocrine",
    relatedTests: ["HbA1c", "Insulin", "C-Peptide", "HOMA-IR", "Oral Glucose Tolerance Test"],
    relatedDiseases: ["Diabetes", "Prediabetes", "Hypoglycemia"]
  },
  {
    term: "Ferritin",
    slug: "ferritin",
    definition: "A blood protein containing iron and indicating total iron stores in the body. Low ferritin indicates iron deficiency; elevated ferritin may indicate inflammation, liver disease, or hemochromatosis.",
    category: "Iron Studies",
    relatedTests: ["Iron", "TIBC", "Transferrin", "Hemoglobin", "Hematocrit"],
    relatedDiseases: ["Iron Deficiency Anemia", "Hemochromatosis", "Chronic Inflammation"]
  },
  {
    term: "Fibrinogen",
    slug: "fibrinogen",
    definition: "A glycoprotein produced by the liver that is essential for blood clotting. Converted to fibrin by thrombin during coagulation. Elevated levels increase cardiovascular risk.",
    category: "Coagulation",
    relatedTests: ["D-Dimer", "PT/INR", "APTT"],
    relatedDiseases: ["Blood Clots", "DIC", "Cardiovascular Disease", "Liver Disease"]
  },
  {
    term: "Folate (Folic Acid)",
    slug: "folate",
    definition: "A B vitamin essential for DNA synthesis and red blood cell formation. Deficiency causes megaloblastic anemia and is critical during pregnancy to prevent neural tube defects.",
    category: "Vitamins & Nutrients",
    relatedTests: ["Vitamin B12", "CBC", "MCV", "Homocysteine"],
    relatedDiseases: ["Megaloblastic Anemia", "Neural Tube Defacts", "Pregnancy Complications"]
  },
  {
    term: "FSH (Follicle-Stimulating Hormone)",
    slug: "fsh",
    definition: "A gonadotropin hormone produced by the pituitary gland. In women, it stimulates ovarian follicle development. In men, it promotes sperm production. Used to evaluate fertility and menopause.",
    category: "Hormones & Endocrine",
    relatedTests: ["LH", "Estradiol", "Testosterone", "AMH", "Prolactin"],
    relatedDiseases: ["Infertility", "Menopause", "PCOS", "Hypogonadism"]
  },
  {
    term: "Gamma-GT (Gamma-Glutamyl Transferase)",
    slug: "gamma-gt",
    definition: "An enzyme found mainly in the liver and bile ducts. Elevated levels are a sensitive indicator of liver disease and bile duct problems. Also elevated with alcohol use and certain medications.",
    category: "Liver & Enzymes",
    relatedTests: ["Liver Function Tests", "ALP", "SGOT", "SGPT"],
    relatedDiseases: ["Liver Disease", "Bile Duct Disease", "Alcohol-Related Liver Damage"]
  },
  {
    term: "Globulin",
    slug: "globulin",
    definition: "A group of proteins in the blood produced by the liver and immune system. Includes antibodies (immunoglobulins), transport proteins, and clotting factors. Elevated levels may indicate chronic infection or autoimmune disease.",
    category: "Proteins & Electrolytes",
    relatedTests: ["Albumin", "Total Protein", "Immunoglobulin", "Protein Electrophoresis"],
    relatedDiseases: ["Chronic Infection", "Autoimmune Disease", "Liver Disease"]
  },
  {
    term: "Glucose",
    slug: "glucose",
    definition: "The primary sugar in blood and the body's main source of energy. Blood glucose levels are regulated by insulin and glucagon. Abnormal levels indicate diabetes, hypoglycemia, or other metabolic disorders.",
    category: "Diabetes & Endocrine",
    relatedTests: ["Fasting Blood Sugar", "HbA1c", "Insulin", "HOMA-IR"],
    relatedDiseases: ["Diabetes", "Hypoglycemia", "Metabolic Syndrome"]
  },
  {
    term: "HbA1c (Glycated Hemoglobin)",
    slug: "hba1c",
    definition: "A measure of average blood sugar levels over the past 2-3 months. Normal is below 5.7%, prediabetes is 5.7-6.4%, and diabetes is 6.5% or above. Does not require fasting.",
    category: "Diabetes & Endocrine",
    relatedTests: ["Fasting Blood Sugar", "Insulin", "C-Peptide", "HOMA-IR"],
    relatedDiseases: ["Diabetes", "Prediabetes"]
  },
  {
    term: "HDL (High-Density Lipoprotein)",
    slug: "hdl",
    definition: "Known as 'good cholesterol,' HDL carries cholesterol from arteries back to the liver for removal. Higher levels are protective against cardiovascular disease. Optimal is above 60 mg/dL.",
    category: "Cardiovascular",
    relatedTests: ["LDL", "Total Cholesterol", "Triglycerides", "Lipid Profile", "Apolipoprotein A-1"],
    relatedDiseases: ["Cardiovascular Disease", "Atherosclerosis"]
  },
  {
    term: "Hematocrit",
    slug: "hematocrit",
    definition: "The percentage of blood volume occupied by red blood cells. Low hematocrit indicates anemia; high hematocrit may indicate dehydration or polycythemia. Used alongside hemoglobin to assess oxygen-carrying capacity.",
    category: "Hematology",
    relatedTests: ["Hemoglobin", "CBC", "RBC", "MCV"],
    relatedDiseases: ["Anemia", "Polycythemia", "Dehydration"]
  },
  {
    term: "Hemoglobin (Hb)",
    slug: "hemoglobin",
    definition: "The iron-containing protein in red blood cells that carries oxygen from the lungs to tissues. Low levels indicate anemia; high levels may indicate polycythemia or lung disease.",
    category: "Hematology",
    relatedTests: ["Hematocrit", "CBC", "MCH", "MCHC", "Iron", "Ferritin"],
    relatedDiseases: ["Anemia", "Polycythemia", "Sickle Cell Disease", "Thalassemia"]
  },
  {
    term: "Homocysteine",
    slug: "homocysteine",
    definition: "An amino acid produced during methionine metabolism. Elevated levels are a risk factor for cardiovascular disease, stroke, and blood clots. Influenced by B vitamin levels (B6, B12, folate).",
    category: "Cardiovascular",
    relatedTests: ["Vitamin B12", "Folate", "hs-CRP", "Lipid Profile"],
    relatedDiseases: ["Cardiovascular Disease", "Stroke", "Blood Clots"]
  },
  {
    term: "HOMA-IR (Homeostatic Model Assessment for Insulin Resistance)",
    slug: "homa-ir",
    definition: "A calculated index using fasting glucose and insulin levels to assess insulin resistance. Values above 2.0 suggest insulin resistance, a precursor to type 2 diabetes and metabolic syndrome.",
    category: "Diabetes & Endocrine",
    relatedTests: ["Fasting Blood Sugar", "Insulin", "C-Peptide", "HbA1c"],
    relatedDiseases: ["Type 2 Diabetes", "Metabolic Syndrome", "PCOS", "Insulin Resistance"]
  },
  {
    term: "Immunoglobulin (IgG, IgA, IgM, IgE)",
    slug: "immunoglobulin",
    definition: "Antibodies produced by the immune system to fight infections. Different types serve different functions: IgG is the most abundant and provides long-term immunity; IgA protects mucosal surfaces; IgM is the first responder; IgE is involved in allergies.",
    category: "Immune System",
    relatedTests: ["CBC", "Complement C3", "Complement C4", "ANA"],
    relatedDiseases: ["Immunodeficiency", "Allergies", "Chronic Infections", "Autoimmune Disease"]
  },
  {
    term: "INR (International Normalized Ratio)",
    slug: "inr",
    definition: "A standardized measurement of prothrombin time used to monitor warfarin (blood thinner) therapy. Normal INR for healthy individuals is 0.8-1.1; on warfarin, target is typically 2.0-3.0.",
    category: "Coagulation",
    relatedTests: ["PT", "APTT", "D-Dimer"],
    relatedDiseases: ["Atrial Fibrillation", "Deep Vein Thrombosis", "Heart Valve Replacement"]
  },
  {
    term: "Insulin",
    slug: "insulin",
    definition: "A hormone produced by the pancreas that regulates blood sugar levels by facilitating glucose uptake into cells. Measured to assess insulin production, resistance, and diabetes type.",
    category: "Diabetes & Endocrine",
    relatedTests: ["Fasting Blood Sugar", "C-Peptide", "HbA1c", "HOMA-IR"],
    relatedDiseases: ["Type 1 Diabetes", "Type 2 Diabetes", "Insulinoma", "Metabolic Syndrome"]
  },
  {
    term: "Iron",
    slug: "iron",
    definition: "An essential mineral for hemoglobin production and oxygen transport. Low iron causes iron deficiency anemia; excess iron can damage organs (hemochromatosis). Part of a complete iron studies panel.",
    category: "Iron Studies",
    relatedTests: ["Ferritin", "TIBC", "Transferrin", "Hemoglobin", "CBC"],
    relatedDiseases: ["Iron Deficiency Anemia", "Hemochromatosis"]
  },
  {
    term: "LDL (Low-Density Lipoprotein)",
    slug: "ldl",
    definition: "Known as 'bad cholesterol,' LDL carries cholesterol to arteries where it can form plaques. High levels increase cardiovascular risk. Optimal is below 100 mg/dL; below 70 is ideal for high-risk patients.",
    category: "Cardiovascular",
    relatedTests: ["HDL", "Total Cholesterol", "Triglycerides", "Lipid Profile", "Apolipoprotein B"],
    relatedDiseases: ["Cardiovascular Disease", "Atherosclerosis", "Familial Hypercholesterolemia"]
  },
  {
    term: "LH (Luteinizing Hormone)",
    slug: "lh",
    definition: "A gonadotropin hormone produced by the pituitary gland. Triggers ovulation in women and stimulates testosterone production in men. Used in fertility assessments and to diagnose hormonal imbalances.",
    category: "Hormones & Endocrine",
    relatedTests: ["FSH", "Estradiol", "Testosterone", "Prolactin", "AMH"],
    relatedDiseases: ["Infertility", "PCOS", "Hypogonadism", "Menopause"]
  },
  {
    term: "Lipoprotein(a)",
    slug: "lipoprotein-a",
    definition: "A genetically determined lipoprotein particle similar to LDL but with an attached protein. Elevated levels are an independent risk factor for cardiovascular disease, not significantly reduced by statins.",
    category: "Cardiovascular",
    relatedTests: ["LDL", "HDL", "Lipid Profile", "Apolipoprotein B"],
    relatedDiseases: ["Cardiovascular Disease", "Atherosclerosis"]
  },
  {
    term: "Lymphocytes",
    slug: "lymphocytes",
    definition: "A type of white blood cell crucial for immune response. Includes T cells, B cells, and natural killer cells. Elevated levels may indicate viral infection, chronic inflammation, or lymphocytic leukemia.",
    category: "Hematology",
    relatedTests: ["CBC", "WBC Differential", "Immunoglobulin"],
    relatedDiseases: ["Viral Infections", "Lymphocytic Leukemia", "Chronic Lymphocytic Leukemia"]
  },
  {
    term: "MCH (Mean Corpuscular Hemoglobin)",
    slug: "mch",
    definition: "The average amount of hemoglobin per red blood cell. High MCH may indicate macrocytic anemia (B12 or folate deficiency); low MCH may indicate microcytic anemia (iron deficiency or thalassemia).",
    category: "Hematology",
    relatedTests: ["CBC", "MCHC", "MCV", "Hemoglobin", "RDW"],
    relatedDiseases: ["Anemia", "Thalassemia", "B12 Deficiency"]
  },
  {
    term: "MCHC (Mean Corpuscular Hemoglobin Concentration)",
    slug: "mchc",
    definition: "The average concentration of hemoglobin in a given volume of packed red blood cells. Low MCHC indicates hypochromic anemia; high MCHC may indicate spherocytosis or acute hemolysis.",
    category: "Hematology",
    relatedTests: ["CBC", "MCH", "MCV", "Hemoglobin"],
    relatedDiseases: ["Anemia", "Spherocytosis", "Iron Deficiency Anemia"]
  },
  {
    term: "MCV (Mean Corpuscular Volume)",
    slug: "mcv",
    definition: "The average size of red blood cells. Low MCV indicates microcytic anemia (iron deficiency, thalassemia); normal MCV is normocytic anemia; high MCV indicates macrocytic anemia (B12 or folate deficiency).",
    category: "Hematology",
    relatedTests: ["CBC", "MCH", "MCHC", "RDW", "Hemoglobin"],
    relatedDiseases: ["Iron Deficiency Anemia", "B12 Deficiency", "Thalassemia"]
  },
  {
    term: "Magnesium",
    slug: "magnesium",
    definition: "An essential mineral involved in over 300 enzymatic reactions, including muscle and nerve function, blood sugar control, and blood pressure regulation. Deficiency can cause arrhythmias and muscle cramps.",
    category: "Electrolytes & Minerals",
    relatedTests: ["Calcium", "Potassium", "Electrolyte Panel"],
    relatedDiseases: ["Hypomagnesemia", "Arrhythmias", "Muscle Cramps", "Preeclampsia"]
  },
  {
    term: "Monocytes",
    slug: "monocytes",
    definition: "The largest type of white blood cell that differentiates into macrophages and dendritic cells. They play a role in chronic infection, inflammation, and immune regulation. Elevated in chronic infections and autoimmune diseases.",
    category: "Hematology",
    relatedTests: ["CBC", "WBC Differential"],
    relatedDiseases: ["Chronic Infections", "Autoimmune Disease", "Monocytic Leukemia"]
  },
  {
    term: "Neutrophils",
    slug: "neutrophils",
    definition: "The most abundant type of white blood cell, serving as the first line of defense against bacterial infections. Elevated levels (neutrophilia) indicate bacterial infection; low levels (neutropenia) increase infection risk.",
    category: "Hematology",
    relatedTests: ["CBC", "WBC Differential", "CRP"],
    relatedDiseases: ["Bacterial Infections", "Neutropenia", "Leukemia"]
  },
  {
    term: "NT-proBNP (N-terminal pro-B-type Natriuretic Peptide)",
    slug: "nt-probnp",
    definition: "A precursor to BNP that is more stable and longer-lasting. Elevated levels indicate heart failure and correlate with severity. Used to diagnose, assess severity, and monitor treatment of heart failure.",
    category: "Cardiovascular",
    relatedTests: ["BNP", "Troponin", "CK-MB"],
    relatedDiseases: ["Heart Failure", "Congestive Heart Failure"]
  },
  {
    term: "Parathyroid Hormone (PTH)",
    slug: "parathyroid-hormone",
    definition: "A hormone produced by the parathyroid glands that regulates calcium and phosphorus levels in the blood. High PTH with low calcium indicates hyperparathyroidism; low PTH may indicate hypoparathyroidism.",
    category: "Hormones & Endocrine",
    relatedTests: ["Calcium", "Phosphorus", "Vitamin D"],
    relatedDiseases: ["Hyperparathyroidism", "Hypoparathyroidism", "Osteoporosis"]
  },
  {
    term: "Phosphorus",
    slug: "phosphorus",
    definition: "An essential mineral that works with calcium for bone health and is involved in energy production (ATP). Abnormal levels can indicate kidney disease, parathyroid disorders, or vitamin D deficiency.",
    category: "Electrolytes & Minerals",
    relatedTests: ["Calcium", "PTH", "Vitamin D", "Kidney Function Tests"],
    relatedDiseases: ["Kidney Disease", "Hyperparathyroidism", "Osteoporosis"]
  },
  {
    term: "Platelet Count",
    slug: "platelet-count",
    definition: "Measures the number of platelets (thrombocytes) in blood, essential for blood clotting. Low count (thrombocytopenia) increases bleeding risk; high count (thrombocytosis) may increase clotting risk.",
    category: "Hematology",
    relatedTests: ["CBC", "PT/INR", "APTT", "Bleeding Time"],
    relatedDiseases: ["Thrombocytopenia", "Thrombocytosis", "ITP", "Dengue Fever"]
  },
  {
    term: "PCR (Polymerase Chain Reaction)",
    slug: "pcr",
    definition: "A molecular technique that amplifies specific DNA or RNA sequences for detection. Used to identify infections (COVID-19, HIV, Hepatitis), genetic mutations, and for forensic analysis. Highly sensitive and specific.",
    category: "Molecular Diagnostics",
    relatedTests: ["RT-PCR", "Viral Load", "Gene Mutation Testing"],
    relatedDiseases: ["COVID-19", "HIV", "Hepatitis B", "Hepatitis C"]
  },
  {
    term: "Prealbumin (Transthyretin)",
    slug: "prealbumin",
    definition: "A protein produced by the liver with a short half-life, making it an excellent marker for recent nutritional status. Used to monitor nutrition in hospitalized patients and assess protein-energy malnutrition.",
    category: "Proteins & Electrolytes",
    relatedTests: ["Albumin", "Total Protein", "Transferrin"],
    relatedDiseases: ["Malnutrition", "Liver Disease", "Inflammation"]
  },
  {
    term: "Progesterone",
    slug: "progesterone",
    definition: "A steroid hormone primarily produced by the corpus luteum after ovulation. Prepares the uterine lining for pregnancy and maintains early pregnancy. Low levels may indicate anovulation or luteal phase deficiency.",
    category: "Hormones & Endocrine",
    relatedTests: ["Estradiol", "FSH", "LH", "Prolactin"],
    relatedDiseases: ["Infertility", "Menopause", "Luteal Phase Defect"]
  },
  {
    term: "Prolactin",
    slug: "prolactin",
    definition: "A hormone produced by the pituitary gland that stimulates milk production after childbirth. Elevated levels (hyperprolactinemia) can cause irregular periods, infertility, and galactorrhea.",
    category: "Hormones & Endocrine",
    relatedTests: ["FSH", "LH", "Estradiol", "Testosterone"],
    relatedDiseases: ["Hyperprolactinemia", "Infertility", "Pituitary Adenoma"]
  },
  {
    term: "Procalcitonin (PCT)",
    slug: "procalcitonin",
    definition: "A biomarker that rises significantly during bacterial infections. More specific than CRP for bacterial sepsis. Used to guide antibiotic therapy and distinguish bacterial from viral infections.",
    category: "Inflammation Markers",
    relatedTests: ["CRP", "ESR", "CBC", "Blood Culture"],
    relatedDiseases: ["Bacterial Sepsis", "Pneumonia", "Meningitis"]
  },
  {
    term: "Protein Electrophoresis (SPEP)",
    slug: "protein-electrophoresis",
    definition: "A laboratory test that separates blood proteins into fractions (albumin, alpha-1, alpha-2, beta, gamma globulins). Used to detect monoclonal proteins associated with multiple myeloma and other conditions.",
    category: "Proteins & Electrolytes",
    relatedTests: ["Albumin", "Globulin", "Immunoglobulin", "Total Protein"],
    relatedDiseases: ["Multiple Myeloma", "Waldenström's Macroglobulinemia", "Liver Disease"]
  },
  {
    term: "PSA (Prostate-Specific Antigen)",
    slug: "prostate-specific-antigen",
    definition: "A protein produced by prostate cells. Elevated levels may indicate prostate cancer, benign prostatic hyperplasia (BPH), or prostate infection. Used for screening and monitoring prostate conditions.",
    category: "Tumor Markers",
    relatedTests: ["Free PSA", "DRE"],
    relatedDiseases: ["Prostate Cancer", "Benign Prostatic Hyperplasia", "Prostatitis"]
  },
  {
    term: "Free PSA",
    slug: "free-psa",
    definition: "The fraction of PSA not bound to proteins in the blood. The free PSA/total PSA ratio helps distinguish between prostate cancer and BPH. A low ratio (below 25%) increases suspicion of prostate cancer.",
    category: "Tumor Markers",
    relatedTests: ["Total PSA", "DRE"],
    relatedDiseases: ["Prostate Cancer", "Benign Prostatic Hyperplasia"]
  },
  {
    term: "PT (Prothrombin Time)",
    slug: "prothrombin-time",
    definition: "Measures how long it takes blood to clot via the extrinsic pathway. Used to monitor warfarin therapy and assess liver function. Results reported as INR for standardization.",
    category: "Coagulation",
    relatedTests: ["INR", "APTT", "D-Dimer", "Fibrinogen"],
    relatedDiseases: ["Liver Disease", "Vitamin K Deficiency", "Warfarin Therapy"]
  },
  {
    term: "RBC (Red Blood Cell Count)",
    slug: "red-blood-cell-count",
    definition: "The number of red blood cells per unit volume of blood. Essential for oxygen transport. Low count indicates anemia; high count may indicate polycythemia or dehydration.",
    category: "Hematology",
    relatedTests: ["Hemoglobin", "Hematocrit", "CBC", "MCV", "RDW"],
    relatedDiseases: ["Anemia", "Polycythemia", "Blood Loss"]
  },
  {
    term: "RDW (Red Cell Distribution Width)",
    slug: "red-cell-distribution-width",
    definition: "Measures the variation in size of red blood cells (anisocytosis). Elevated RDW indicates a wide range of cell sizes, commonly seen in iron deficiency anemia, B12 deficiency, and mixed deficiencies.",
    category: "Hematology",
    relatedTests: ["CBC", "MCV", "MCH", "Hemoglobin", "Iron Studies"],
    relatedDiseases: ["Iron Deficiency Anemia", "B12 Deficiency", "Thalassemia"]
  },
  {
    term: "Reticulocyte Count",
    slug: "reticulocyte-count",
    definition: "Measures the percentage of immature red blood cells (reticulocytes) in the blood. Indicates bone marrow's ability to produce red blood cells. High count suggests blood loss or hemolysis; low count suggests bone marrow failure.",
    category: "Hematology",
    relatedTests: ["CBC", "Hemoglobin", "Hematocrit", "Iron Studies"],
    relatedDiseases: ["Anemia", "Bone Marrow Failure", "Hemolytic Anemia"]
  },
  {
    term: "Rheumatoid Factor (RF)",
    slug: "rheumatoid-factor",
    definition: "An autoantibody directed against the Fc portion of IgG. Present in about 70-80% of rheumatoid arthritis patients. Also elevated in other autoimmune diseases, chronic infections, and some elderly individuals.",
    category: "Autoimmune Markers",
    relatedTests: ["Anti-CCP", "ANA", "ESR", "CRP"],
    relatedDiseases: ["Rheumatoid Arthritis", "Sjögren's Syndrome", "Lupus"]
  },
  {
    term: "SGOT (AST - Aspartate Aminotransferase)",
    slug: "sgot-ast",
    definition: "An enzyme found in liver, heart, muscles, kidneys, and brain. Elevated levels indicate liver damage, heart attack, or muscle injury. Part of the standard liver function test panel.",
    category: "Liver & Enzymes",
    relatedTests: ["SGPT", "Liver Function Tests", "CK-MB", "LDH"],
    relatedDiseases: ["Liver Disease", "Myocardial Infarction", "Muscle Damage"]
  },
  {
    term: "SGPT (ALT - Alanine Aminotransferase)",
    slug: "sgpt-alt",
    definition: "An enzyme found predominantly in the liver. More specific to liver damage than SGOT. Elevated levels indicate hepatitis, liver disease, or drug-induced liver injury.",
    category: "Liver & Enzymes",
    relatedTests: ["SGOT", "Liver Function Tests", "Gamma-GT", "ALP"],
    relatedDiseases: ["Hepatitis", "Fatty Liver Disease", "Drug-Induced Liver Injury"]
  },
  {
    term: "Sodium",
    slug: "sodium",
    definition: "The primary extracellular electrolyte, essential for fluid balance, nerve impulse transmission, and muscle function. Regulated by kidneys and hormones (aldosterone, ADH). Abnormal levels can be life-threatening.",
    category: "Electrolytes",
    relatedTests: ["Potassium", "Chloride", "Bicarbonate", "Electrolyte Panel"],
    relatedDiseases: ["Hyponatremia", "Hypernatremia", "Dehydration", "Heart Failure"]
  },
  {
    term: "Testosterone",
    slug: "testosterone",
    definition: "The primary male sex hormone, also present in smaller amounts in women. Produced by testes in men and ovaries/adrenal glands in women. Regulates libido, muscle mass, bone density, and red blood cell production.",
    category: "Hormones & Endocrine",
    relatedTests: ["FSH", "LH", "Estradiol", "DHEA-S", "SHBG"],
    relatedDiseases: ["Hypogonadism", "PCOS", "Infertility", "Testosterone Deficiency"]
  },
  {
    term: "TIBC (Total Iron-Binding Capacity)",
    slug: "tibc",
    definition: "Measures the maximum amount of iron that can be bound by transferrin in the blood. High TIBC indicates iron deficiency; low TIBC may indicate chronic disease, inflammation, or iron overload.",
    category: "Iron Studies",
    relatedTests: ["Iron", "Ferritin", "Transferrin", "Hemoglobin"],
    relatedDiseases: ["Iron Deficiency Anemia", "Hemochromatosis"]
  },
  {
    term: "T3 (Triiodothyronine)",
    slug: "t3",
    definition: "The active thyroid hormone that regulates metabolism, energy production, and growth. Measured as total T3 or free T3. Low levels indicate hypothyroidism; high levels indicate hyperthyroidism.",
    category: "Thyroid",
    relatedTests: ["T4", "TSH", "Free T3", "Free T4", "Anti-TPO"],
    relatedDiseases: ["Hypothyroidism", "Hyperthyroidism", "Graves' Disease", "Hashimoto's Thyroiditis"]
  },
  {
    term: "T4 (Thyroxine)",
    slug: "t4",
    definition: "The major hormone produced by the thyroid gland, converted to the active T3 in tissues. Measured as total T4 or free T4. Used with TSH to assess thyroid function.",
    category: "Thyroid",
    relatedTests: ["T3", "TSH", "Free T4", "Free T3", "Anti-TPO"],
    relatedDiseases: ["Hypothyroidism", "Hyperthyroidism", "Thyroiditis"]
  },
  {
    term: "Transferrin",
    slug: "transferrin",
    definition: "The primary iron transport protein in blood. Levels increase in iron deficiency and decrease in chronic disease or iron overload. Used alongside iron, ferritin, and TIBC to assess iron status.",
    category: "Iron Studies",
    relatedTests: ["Iron", "Ferritin", "TIBC", "Hemoglobin"],
    relatedDiseases: ["Iron Deficiency Anemia", "Hemochromatosis", "Chronic Disease"]
  },
  {
    term: "Troponin",
    slug: "troponin",
    definition: "A protein complex found in cardiac and skeletal muscle. Cardiac-specific troponins (troponin I and T) are the gold standard biomarkers for detecting myocardial infarction (heart attack). Elevated within 3-6 hours of injury.",
    category: "Cardiovascular",
    relatedTests: ["CK-MB", "LDH", "BNP", "NT-proBNP", "Lipid Profile"],
    relatedDiseases: ["Myocardial Infarction", "Heart Attack", "Myocarditis", "Pulmonary Embolism"]
  },
  {
    term: "Triglycerides",
    slug: "triglycerides",
    definition: "The most common type of fat in the body, used for energy storage. High levels increase cardiovascular risk and are associated with metabolic syndrome, diabetes, and pancreatitis.",
    category: "Cardiovascular",
    relatedTests: ["LDL", "HDL", "Total Cholesterol", "Lipid Profile"],
    relatedDiseases: ["Cardiovascular Disease", "Metabolic Syndrome", "Pancreatitis"]
  },
  {
    term: "TSH (Thyroid-Stimulating Hormone)",
    slug: "tsh",
    definition: "Produced by the pituitary gland, TSH stimulates the thyroid to produce T3 and T4. High TSH indicates hypothyroidism; low TSH indicates hyperthyroidism. The most sensitive screening test for thyroid disorders.",
    category: "Thyroid",
    relatedTests: ["T3", "T4", "Free T3", "Free T4", "Anti-TPO"],
    relatedDiseases: ["Hypothyroidism", "Hyperthyroidism", "Goiter"]
  },
  {
    term: "Total Cholesterol",
    slug: "total-cholesterol",
    definition: "The sum of all cholesterol fractions in the blood (LDL + HDL + VLDL). Desirable is below 200 mg/dL. High total cholesterol increases cardiovascular risk, but the ratio of LDL to HDL is more informative.",
    category: "Cardiovascular",
    relatedTests: ["LDL", "HDL", "Triglycerides", "Lipid Profile"],
    relatedDiseases: ["Cardiovascular Disease", "Atherosclerosis"]
  },
  {
    term: "Total Protein",
    slug: "total-protein",
    definition: "Measures the total amount of albumin and globulin proteins in blood. Abnormal levels may indicate liver disease, kidney disease, dehydration, or multiple myeloma.",
    category: "Proteins & Electrolytes",
    relatedTests: ["Albumin", "Globulin", "Liver Function Tests"],
    relatedDiseases: ["Liver Disease", "Kidney Disease", "Multiple Myeloma"]
  },
  {
    term: "Uric Acid",
    slug: "uric-acid",
    definition: "A waste product from the breakdown of purines in the body. Elevated levels can cause gout (joint inflammation) and kidney stones. Also associated with cardiovascular disease and metabolic syndrome.",
    category: "Kidney",
    relatedTests: ["BUN", "Creatinine", "eGFR", "Kidney Function Tests"],
    relatedDiseases: ["Gout", "Kidney Stones", "Cardiovascular Disease", "Metabolic Syndrome"]
  },
  {
    term: "Vitamin B12",
    slug: "vitamin-b12",
    definition: "An essential vitamin for nerve function, red blood cell formation, and DNA synthesis. Deficiency causes megaloblastic anemia and neurological problems. Common in vegans, elderly, and those with malabsorption.",
    category: "Vitamins & Nutrients",
    relatedTests: ["Folate", "CBC", "MCV", "Homocysteine"],
    relatedDiseases: ["Megaloblastic Anemia", "Neuropathy", "Pernicious Anemia"]
  },
  {
    term: "Vitamin D (25-Hydroxyvitamin D)",
    slug: "vitamin-d",
    definition: "A fat-soluble vitamin crucial for calcium absorption, bone health, and immune function. Deficiency causes rickets in children and osteomalacia in adults. Levels below 20 ng/mL are deficient.",
    category: "Vitamins & Nutrients",
    relatedTests: ["Calcium", "PTH", "Phosphorus"],
    relatedDiseases: ["Osteoporosis", "Rickets", "Osteomalacia", "Vitamin D Deficiency"]
  },
  {
    term: "WBC (White Blood Cell Count)",
    slug: "white-blood-cell-count",
    definition: "The total number of white blood cells in blood, essential for immune defense. High count indicates infection, inflammation, or leukemia; low count (leukopenia) indicates immune suppression or bone marrow problems.",
    category: "Hematology",
    relatedTests: ["CBC", "WBC Differential", "Neutrophils", "Lymphocytes"],
    relatedDiseases: ["Infection", "Leukemia", "Immune Deficiency", "Inflammation"]
  },
  {
    term: "Complement C3",
    slug: "complement-c3",
    definition: "A protein of the complement system involved in the immune response. Low levels indicate complement consumption seen in autoimmune diseases like lupus and certain infections.",
    category: "Immune System",
    relatedTests: ["Complement C4", "ANA", "Anti-dsDNA", "Immunoglobulin"],
    relatedDiseases: ["Systemic Lupus Erythematosus", "Autoimmune Disease", "Infections"]
  },
  {
    term: "Complement C4",
    slug: "complement-c4",
    definition: "A complement protein that works with C3 in the classical complement pathway. Low levels in the context of positive ANA strongly suggest active lupus.",
    category: "Immune System",
    relatedTests: ["Complement C3", "ANA", "Anti-dsDNA", "Immunoglobulin"],
    relatedDiseases: ["Systemic Lupus Erythematosus", "Autoimmune Disease", "Angioedema"]
  },
  {
    term: "Vitamin B9 (Folate)",
    slug: "vitamin-b9-folate",
    definition: "An essential B vitamin required for DNA synthesis and cell division. Critical during pregnancy for preventing neural tube defects. Deficiency causes megaloblastic anemia and elevated homocysteine.",
    category: "Vitamins & Nutrients",
    relatedTests: ["Vitamin B12", "Homocysteine", "CBC", "MCV"],
    relatedDiseases: ["Megaloblastic Anemia", "Neural Tube Defects", "Pregnancy Complications"]
  },
  {
    term: "Urine Routine & Microscopy",
    slug: "urine-routine-microscopy",
    definition: "A comprehensive urine test that evaluates color, clarity, specific gravity, pH, protein, glucose, ketones, blood, and microscopic examination of cells, casts, and crystals. Screens for kidney disease, UTI, and diabetes.",
    category: "Urinalysis",
    relatedTests: ["Creatinine", "eGFR", "Kidney Function Tests"],
    relatedDiseases: ["Urinary Tract Infection", "Kidney Disease", "Diabetes"]
  },
  {
    term: "Fecal Occult Blood Test (FOBT)",
    slug: "fecal-occult-blood-test",
    definition: "Detects hidden blood in stool that is not visible to the naked eye. Used as a screening test for colorectal cancer, polyps, and gastrointestinal bleeding.",
    category: "Gastrointestinal",
    relatedTests: ["CEA", "CBC", "Protein Electrophoresis"],
    relatedDiseases: ["Colorectal Cancer", "Colorectal Polyps", "GI Bleeding"]
  },
  {
    term: "H. pylori Antibodies",
    slug: "h-pylori-antibodies",
    definition: "Blood test detecting antibodies against Helicobacter pylori bacteria, which causes stomach ulcers and gastritis. Positive results indicate current or past infection.",
    category: "Gastrointestinal",
    relatedTests: ["CBC", "Liver Function Tests", "Stool Antigen"],
    relatedDiseases: ["Peptic Ulcer Disease", "Gastritis", "Stomach Cancer"]
  },
  {
    term: "Calprotectin (Stool)",
    slug: "calprotectin",
    definition: "A protein released by white blood cells during intestinal inflammation. Elevated stool calprotectin levels indicate inflammatory bowel disease (IBD) and help differentiate IBD from irritable bowel syndrome (IBS).",
    category: "Gastrointestinal",
    relatedTests: ["Fecal Occult Blood", "CBC", "ESR", "CRP"],
    relatedDiseases: ["Crohn's Disease", "Ulcerative Colitis", "Inflammatory Bowel Disease"]
  }
];
