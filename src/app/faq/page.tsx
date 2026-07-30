"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, ArrowRight, ShieldAlert, BookOpen
} from 'lucide-react';

const faqData = [
  {
    "id": "RE",
    "name": "Respiratory",
    "faqs": [
      {
        "q": "What tests are done for a persistent cough or breathlessness?",
        "a": "A Respiratory & Infection Panel is typically recommended, including CBC, ESR, CRP, Sputum for AFB/Gene Xpert, D-Dimer, ABG, Total IgE, and a Chest X-ray. These tests help identify infections such as pneumonia or tuberculosis, as well as asthma, COPD, and allergies."
      },
      {
        "q": "When should I get a respiratory test panel done?",
        "a": "Testing is recommended if your cough lasts more than 2–3 weeks or is accompanied by fever, wheezing, chest pain while breathing, or blood-tinged sputum."
      }
    ]
  },
  {
    "id": "CV",
    "name": "Cardiovascular",
    "faqs": [
      {
        "q": "What tests check for heart problems causing chest pain or palpitations?",
        "a": "A Cardiac Risk & Chest Pain Panel includes Lipid Profile, Troponin-I/T, CK-MB, NT-proBNP, hs-CRP, HbA1c, Electrolytes, and usually an ECG to evaluate heart disease and heart attacks."
      },
      {
        "q": "Who should get a cardiac risk panel done?",
        "a": "Anyone experiencing chest discomfort, palpitations, unexplained fatigue, leg swelling, diabetes, hypertension, or a family history of heart disease."
      }
    ]
  },
  {
    "id": "GI",
    "name": "Gastrointestinal",
    "faqs": [
      {
        "q": "What tests are recommended for stomach pain, bloating, or diarrhoea?",
        "a": "A Digestive Health Panel includes CBC, CRP, Stool Routine & Occult Blood, H. pylori tests, Amylase, Lipase, and Liver Function Tests (LFT)."
      },
      {
        "q": "Do I need a stool test for ongoing digestive symptoms?",
        "a": "Yes. Stool Routine & Occult Blood testing helps detect infections, inflammation, and intestinal bleeding in patients with persistent digestive symptoms."
      }
    ]
  },
  {
    "id": "NS",
    "name": "Nervous System (Central)",
    "faqs": [
      {
        "q": "What tests help investigate frequent headaches or dizziness?",
        "a": "A Neuro Screen Panel includes CBC, ESR, Blood Glucose, Electrolytes, Lipid Profile, Vitamin B12, Homocysteine, and PT/INR."
      },
      {
        "q": "Can a blood test detect the cause of memory problems or numbness?",
        "a": "Blood tests cannot diagnose conditions like stroke directly but can identify reversible causes such as Vitamin B12 deficiency, high homocysteine, or blood sugar imbalance."
      }
    ]
  },
  {
    "id": "MS",
    "name": "Musculoskeletal",
    "faqs": [
      {
        "q": "What tests are used for joint pain or morning stiffness?",
        "a": "A Joint & Bone Health Panel includes CBC, ESR, CRP, RA Factor, Anti-CCP, Uric Acid, Calcium, and Vitamin D."
      },
      {
        "q": "Is a uric acid test needed for joint swelling?",
        "a": "Yes. A Uric Acid test helps diagnose gout, particularly when sudden pain affects a single joint."
      }
    ]
  },
  {
    "id": "EN",
    "name": "Endocrine (General)",
    "faqs": [
      {
        "q": "What tests check for diabetes or thyroid problems?",
        "a": "An Endocrine & Diabetes Panel includes Fasting & PP Blood Glucose, HbA1c, TSH, FT3, FT4, Serum Cortisol, Insulin, and Electrolytes."
      },
      {
        "q": "How often should I test HbA1c and TSH?",
        "a": "If symptoms are present, establish a baseline. Patients with diabetes or thyroid disorders are generally advised to repeat testing every 3–6 months."
      }
    ]
  },
  {
    "id": "RU",
    "name": "Renal / Urinary",
    "faqs": [
      {
        "q": "What tests diagnose a urinary tract infection or kidney stones?",
        "a": "A Kidney & Urinary Panel includes Urine Routine & Microscopy, Urine Culture & Sensitivity, and Kidney Function Tests (Urea, Creatinine, eGFR)."
      },
      {
        "q": "Do I need a kidney function test for occasional back pain?",
        "a": "Yes, if the pain is associated with burning urination, blood in urine, or cloudy urine."
      }
    ]
  },
  {
    "id": "HB",
    "name": "Hepatobiliary (Liver, Gallbladder & Bile Ducts)",
    "faqs": [
      {
        "q": "What tests check liver and gallbladder health?",
        "a": "A Liver & Gallbladder Panel includes LFT, Hepatitis A/B/C screening, and PT/INR."
      },
      {
        "q": "What does jaundice with pale stools indicate, and what test is needed?",
        "a": "It may indicate bile duct blockage. Liver Function Tests and an abdominal ultrasound are recommended."
      }
    ]
  },
  {
    "id": "PA",
    "name": "Pancreatic",
    "faqs": [
      {
        "q": "What tests are used to check for pancreatitis?",
        "a": "A Pancreatic Health Panel includes Serum Amylase, Serum Lipase, Fasting Glucose, HbA1c, and LFT."
      },
      {
        "q": "Can pancreatic problems cause high blood sugar?",
        "a": "Yes. Chronic pancreatic disease may reduce insulin production, causing elevated blood sugar levels."
      }
    ]
  },
  {
    "id": "RF",
    "name": "Reproductive – Female",
    "faqs": [
      {
        "q": "What tests are done for irregular periods or PCOS symptoms?",
        "a": "A Women's Health Panel includes LH, FSH, Prolactin, TSH, AMH, and Testosterone."
      },
      {
        "q": "What test screens for ovarian or breast-related concerns?",
        "a": "CA-125 (or CEA where appropriate) together with a pelvic ultrasound is commonly used for ovarian evaluation."
      }
    ]
  },
  {
    "id": "RM",
    "name": "Reproductive – Male",
    "faqs": [
      {
        "q": "What tests check prostate health or urinary difficulty in men?",
        "a": "A Men's Health Panel includes PSA (Total/Free), Testosterone, LH, FSH, and Urine Routine."
      },
      {
        "q": "What test is used for male infertility?",
        "a": "Semen Analysis, along with Testosterone, LH, and FSH testing."
      }
    ]
  },
  {
    "id": "HL",
    "name": "Hematologic / Lymphatic",
    "faqs": [
      {
        "q": "What tests check for anemia or fatigue with pale skin?",
        "a": "A Blood & Immunity Panel includes CBC, Peripheral Smear, Iron Studies, Vitamin B12, and Folate."
      },
      {
        "q": "What test is needed for swollen lymph nodes with fever?",
        "a": "CBC, ESR, and Peripheral Smear are recommended as initial investigations."
      }
    ]
  },
  {
    "id": "SK",
    "name": "Skin & Integumentary",
    "faqs": [
      {
        "q": "What tests help identify the cause of a persistent skin rash?",
        "a": "A Dermatology Screen Panel includes CBC, Total IgE, KOH Mount, and ANA."
      },
      {
        "q": "Is a blood test needed for dry, itchy skin?",
        "a": "Vitamin D, Total IgE, and CBC can help identify nutritional or allergic causes."
      }
    ]
  },
  {
    "id": "IM",
    "name": "Immune System",
    "faqs": [
      {
        "q": "What tests check for autoimmune conditions like lupus?",
        "a": "ANA, RA Factor, ESR, CRP, and Complement C3/C4."
      },
      {
        "q": "What test should I get for frequent infections and fatigue?",
        "a": "CBC, ESR, CRP, and when appropriate, HIV screening and Anti-tTG testing."
      }
    ]
  },
  {
    "id": "OC",
    "name": "Ocular (Eye)",
    "faqs": [
      {
        "q": "Can blood tests help with blurred vision or eye problems?",
        "a": "A Diabetic Eye Risk Panel includes Fasting & PP Glucose, HbA1c, and Lipid Profile."
      },
      {
        "q": "Why is HbA1c relevant to eye symptoms?",
        "a": "Poor blood sugar control can damage the retina and increase the risk of diabetic retinopathy."
      }
    ]
  },
  {
    "id": "AU",
    "name": "Auditory (Ear)",
    "faqs": [
      {
        "q": "What tests are relevant for ear infections or discharge?",
        "a": "CBC, ESR, CRP, and Ear Discharge Culture & Sensitivity."
      },
      {
        "q": "Is diabetes linked to ear or balance symptoms?",
        "a": "Yes. Poorly controlled diabetes can contribute to recurring ear infections and dizziness."
      }
    ]
  },
  {
    "id": "MH",
    "name": "Mental Health (Psychiatric)",
    "faqs": [
      {
        "q": "Can a blood test explain low mood or fatigue?",
        "a": "A Wellness Baseline Panel includes TSH, FT3, FT4, CBC, Vitamin D, Vitamin B12, and Fasting Glucose."
      },
      {
        "q": "Why check thyroid levels for mood or sleep symptoms?",
        "a": "Thyroid disorders can cause fatigue, anxiety, depression, irritability, and sleep disturbances."
      }
    ]
  },
  {
    "id": "OD",
    "name": "Oral (Mouth) & Dental",
    "faqs": [
      {
        "q": "Is there a link between blood sugar and gum disease?",
        "a": "Yes. HbA1c and Random Blood Sugar testing can help identify diabetes-related gum disease."
      },
      {
        "q": "What test helps with recurring mouth ulcers?",
        "a": "CBC and Vitamin B12 testing are recommended."
      }
    ]
  },
  {
    "id": "PV",
    "name": "Peripheral Vascular",
    "faqs": [
      {
        "q": "What tests check for poor circulation in the legs?",
        "a": "A Vascular Health Panel includes Lipid Profile, D-Dimer, HbA1c, and hs-CRP."
      },
      {
        "q": "Is a D-Dimer test needed for leg swelling?",
        "a": "Yes, particularly when swelling is sudden and affects one leg."
      }
    ]
  },
  {
    "id": "AN",
    "name": "Autonomic Nervous System",
    "faqs": [
      {
        "q": "What tests are relevant for fainting spells or abnormal sweating?",
        "a": "Fasting Glucose, HbA1c, Vitamin B12, Electrolytes, and TSH."
      },
      {
        "q": "Is diabetes linked to fainting or bladder dysfunction?",
        "a": "Yes. Long-standing diabetes can damage autonomic nerves."
      }
    ]
  },
  {
    "id": "PN",
    "name": "Peripheral Nervous System",
    "faqs": [
      {
        "q": "What tests are done for numbness or tingling in the hands and feet?",
        "a": "A Peripheral Neuropathy Panel includes Fasting Glucose, HbA1c, Vitamin B12, Vitamin D, and TSH."
      },
      {
        "q": "Why is Vitamin B12 tested for tingling in the feet?",
        "a": "Vitamin B12 deficiency is one of the most common and treatable causes of nerve-related symptoms."
      }
    ]
  },
  {
    "id": "SP",
    "name": "Spleen",
    "faqs": [
      {
        "q": "What tests check for an enlarged spleen?",
        "a": "CBC, Peripheral Smear, LDH, Reticulocyte Count, Direct Coombs Test, and abdominal ultrasound."
      },
      {
        "q": "What does easy bruising with upper-left abdominal fullness suggest?",
        "a": "It may indicate spleen enlargement affecting blood cell counts."
      }
    ]
  },
  {
    "id": "TH",
    "name": "Thyroid Gland",
    "faqs": [
      {
        "q": "What tests confirm a thyroid problem?",
        "a": "A Thyroid Profile Panel includes TSH, FT3, FT4, and Anti-TPO Antibody."
      },
      {
        "q": "Why is Anti-TPO tested along with TSH?",
        "a": "Anti-TPO helps identify autoimmune thyroid diseases such as Hashimoto's thyroiditis and Graves' disease."
      }
    ]
  },
  {
    "id": "GEN",
    "name": "General Health & Diagnostics",
    "faqs": [
      {
        "q": "What blood tests are recommended before getting married?",
        "a": "A premarital health screening may include Blood Group & Rh Typing, CBC, Blood Sugar, Thyroid Profile, HIV, Hepatitis B & C screening, VDRL (Syphilis), and other tests based on your healthcare provider's advice."
      },
      {
        "q": "Which tests help assess overall immunity?",
        "a": "CBC, Vitamin D, Vitamin B12, Immunoglobulin Levels (IgG, IgA, IgM), and Blood Sugar may help evaluate immune health when clinically indicated."
      },
      {
        "q": "What blood tests should I get if I feel weak after recovering from an illness?",
        "a": "CBC, Iron Studies, Vitamin B12, Vitamin D, Blood Sugar, and Kidney & Liver Function Tests may help identify ongoing health issues."
      },
      {
        "q": "Which tests are recommended for unexplained loss of appetite?",
        "a": "CBC, Liver Function Test, Kidney Function Test, Blood Sugar, Thyroid Profile, and CRP may be recommended depending on your symptoms."
      },
      {
        "q": "What tests help identify chronic inflammation?",
        "a": "ESR, CRP, CBC, ANA, and Rheumatoid Factor may help detect inflammation in the body."
      },
      {
        "q": "Which blood tests are recommended for unexplained body pain?",
        "a": "CBC, ESR, CRP, Vitamin D, Calcium, Thyroid Profile, and Rheumatoid Factor may be useful."
      },
      {
        "q": "What tests help diagnose rheumatoid arthritis?",
        "a": "Rheumatoid Factor (RF), Anti-CCP Antibody, ESR, CRP, and CBC are commonly recommended."
      },
      {
        "q": "Which tests are recommended for lupus?",
        "a": "ANA Profile, ESR, CRP, Complement Levels (C3 & C4), CBC, and Urine Analysis may be advised."
      },
      {
        "q": "What tests help diagnose gout?",
        "a": "Serum Uric Acid, ESR, CRP, Kidney Function Tests, and joint fluid analysis (when indicated) are commonly used."
      },
      {
        "q": "Which tests are recommended for osteoporosis risk?",
        "a": "Vitamin D, Calcium, Phosphorus, Parathyroid Hormone (PTH), and Bone Profile tests help evaluate bone health."
      },
      {
        "q": "What tests help diagnose vitamin deficiencies?",
        "a": "Vitamin D, Vitamin B12, Folate, Iron Studies, Ferritin, and Calcium tests are commonly performed."
      },
      {
        "q": "Which blood tests are recommended for unexplained fatigue after exercise?",
        "a": "CBC, Iron Studies, Electrolytes, Vitamin D, Creatine Kinase (CK), and Thyroid Profile may be recommended."
      },
      {
        "q": "What tests help investigate excessive hair growth in women?",
        "a": "Testosterone, DHEAS, LH, FSH, Prolactin, Thyroid Profile, and Blood Sugar may help identify hormonal causes."
      },
      {
        "q": "Which tests are recommended for low libido?",
        "a": "Testosterone, Estrogen, Thyroid Profile, Blood Sugar, Prolactin, and Vitamin D may be useful depending on symptoms."
      },
      {
        "q": "What blood tests help evaluate erectile dysfunction?",
        "a": "Blood Sugar, HbA1c, Testosterone, Lipid Profile, Thyroid Profile, and Kidney Function Tests may be recommended."
      },
      {
        "q": "Which tests are recommended for frequent miscarriages?",
        "a": "Thyroid Profile, Antiphospholipid Antibody Tests, Blood Sugar, Hormonal Profile, and other investigations may be advised by your doctor."
      },
      {
        "q": "What tests help diagnose polycystic ovary syndrome (PCOS)?",
        "a": "LH, FSH, Testosterone, AMH, Prolactin, TSH, Blood Sugar, and Lipid Profile are commonly recommended."
      },
      {
        "q": "Which tests are recommended for menopause symptoms?",
        "a": "FSH, LH, Estradiol, Thyroid Profile, Vitamin D, and Calcium may help evaluate menopausal health."
      },
      {
        "q": "What blood tests are useful for irregular menstrual cycles?",
        "a": "Thyroid Profile, Prolactin, LH, FSH, Testosterone, and Blood Sugar may be recommended."
      },
      {
        "q": "Which tests help diagnose hormonal imbalance in men?",
        "a": "Testosterone, LH, FSH, Prolactin, Thyroid Profile, and Blood Sugar may be advised."
      },
      {
        "q": "What blood tests are recommended for persistent bloating?",
        "a": "CBC, Liver Function Test, Thyroid Profile, H. pylori testing, Stool Examination, and Blood Sugar may be useful."
      },
      {
        "q": "Which tests help identify lactose intolerance?",
        "a": "Your doctor may recommend specific diagnostic tests based on your symptoms, along with other digestive investigations where appropriate."
      },
      {
        "q": "What tests are recommended for gluten sensitivity?",
        "a": "Anti-tTG Antibody and other coeliac disease-related tests may be recommended by your healthcare provider."
      },
      {
        "q": "Which blood tests help evaluate chronic constipation?",
        "a": "Thyroid Profile, Blood Sugar, Calcium, CBC, and Electrolytes may help identify underlying causes."
      },
      {
        "q": "What tests are recommended for unexplained diarrhoea?",
        "a": "Stool Routine Examination, Stool Culture, CBC, CRP, Electrolytes, and digestive investigations may be advised."
      },
      {
        "q": "Which blood tests help investigate frequent stomach infections?",
        "a": "CBC, Stool Examination, H. pylori testing, CRP, and Stool Culture may help determine the cause."
      },
      {
        "q": "What tests are recommended for abdominal cramps?",
        "a": "CBC, CRP, Electrolytes, Stool Examination, and Urine Analysis may be recommended depending on symptoms."
      },
      {
        "q": "Which tests help diagnose dehydration in children and adults?",
        "a": "Electrolytes, Kidney Function Tests, Blood Urea, Creatinine, and Urine Analysis help assess hydration status."
      },
      {
        "q": "What blood tests are recommended for frequent urination at night?",
        "a": "Blood Sugar, HbA1c, Kidney Function Tests, Urine Analysis, and PSA (for men when appropriate) may be advised."
      },
      {
        "q": "Which tests help investigate blood in the urine?",
        "a": "Urine Routine Examination, Urine Culture, Kidney Function Tests, and other investigations may be recommended by your doctor."
      },
      {
        "q": "What blood tests are useful for kidney disease monitoring?",
        "a": "Serum Creatinine, Blood Urea, eGFR, Electrolytes, Urine Protein, and Kidney Function Tests help monitor kidney health."
      },
      {
        "q": "Which tests are recommended after a kidney stone?",
        "a": "Kidney Function Tests, Urine Analysis, Serum Calcium, Uric Acid, and other metabolic evaluations may be advised."
      },
      {
        "q": "What tests help diagnose gallbladder disease?",
        "a": "Liver Function Tests and imaging studies are commonly used to evaluate gallbladder disorders."
      },
      {
        "q": "Which blood tests are recommended for pancreatic disorders?",
        "a": "Serum Amylase, Serum Lipase, Blood Sugar, HbA1c, and Liver Function Tests are commonly recommended."
      },
      {
        "q": "What tests help identify alcohol-related liver damage?",
        "a": "Liver Function Test, GGT, Albumin, PT/INR, and CBC may help evaluate liver health."
      },
      {
        "q": "Which blood tests are recommended for smokers?",
        "a": "CBC, Lipid Profile, Blood Sugar, Liver Function Test, Kidney Function Test, and hs-CRP may be included in a preventive health assessment."
      },
      {
        "q": "What tests help evaluate obesity-related health risks?",
        "a": "Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, and Thyroid Profile help assess metabolic health."
      },
      {
        "q": "Which blood tests are recommended for high cholesterol?",
        "a": "A Lipid Profile, Blood Sugar, HbA1c, Liver Function Test, and Thyroid Profile are commonly recommended."
      },
      {
        "q": "What tests help identify metabolic syndrome?",
        "a": "Blood Sugar, HbA1c, Lipid Profile, Blood Pressure assessment, Waist Circumference, and other metabolic evaluations are commonly used."
      },
      {
        "q": "Which blood tests are recommended before starting cholesterol medication?",
        "a": "Lipid Profile, Liver Function Test, Kidney Function Test, and Blood Sugar are commonly recommended before treatment."
      },
      {
        "q": "What tests help evaluate unexplained swelling in the face?",
        "a": "Kidney Function Tests, Urine Analysis, Thyroid Profile, CBC, and Allergy Profile may be recommended."
      },
      {
        "q": "Which blood tests are useful for chronic itching without a rash?",
        "a": "Liver Function Test, Kidney Function Test, Blood Sugar, CBC, Thyroid Profile, and Allergy Tests may help identify possible causes."
      },
      {
        "q": "What tests are recommended for recurring boils or skin infections?",
        "a": "Blood Sugar, HbA1c, CBC, CRP, and bacterial culture of the affected area may be recommended."
      },
      {
        "q": "Which blood tests help diagnose eczema?",
        "a": "CBC, Total IgE, Allergy Profile, and Eosinophil Count may be useful in evaluating allergic skin conditions."
      },
      {
        "q": "What tests are recommended for psoriasis?",
        "a": "CBC, ESR, CRP, and other investigations may be advised depending on your symptoms and medical history."
      },
      {
        "q": "Which blood tests help identify autoimmune skin disorders?",
        "a": "ANA Profile, ESR, CRP, CBC, and other autoimmune markers may be recommended."
      },
      {
        "q": "What tests are recommended for unexplained skin darkening?",
        "a": "Blood Sugar, Thyroid Profile, Cortisol, Vitamin B12, and Iron Studies may help identify underlying causes."
      },
      {
        "q": "Which blood tests are useful for frequent dizziness on standing?",
        "a": "CBC, Blood Sugar, Electrolytes, Vitamin B12, and Thyroid Profile may be recommended."
      },
      {
        "q": "What tests help investigate fainting episodes?",
        "a": "Blood Sugar, CBC, Electrolytes, Thyroid Profile, and other investigations may be advised based on your symptoms."
      },
      {
        "q": "What health checkup is recommended if I have no symptoms?",
        "a": "Even without symptoms, an annual preventive health checkup including CBC, Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Profile, Urine Analysis, and other age-appropriate tests can help detect health problems early. Always consult a healthcare professional to choose the most suitable screening package."
      },
      {
        "q": "What blood tests are recommended for frequent infections?",
        "a": "CBC, ESR, CRP, Blood Sugar, Vitamin D, Vitamin B12, and other tests may be recommended to identify underlying conditions that could contribute to recurrent infections."
      },
      {
        "q": "Which tests help diagnose autoimmune diseases?",
        "a": "ANA Profile, Rheumatoid Factor (RF), Anti-CCP, ESR, CRP, and Complement Levels (C3, C4) are commonly recommended based on your symptoms."
      },
      {
        "q": "What tests are recommended for swollen lymph nodes?",
        "a": "CBC, ESR, CRP, Peripheral Blood Smear, and additional tests depending on your doctor's assessment."
      },
      {
        "q": "Which blood tests help investigate unexplained fever?",
        "a": "CBC, ESR, CRP, Blood Culture, Urine Analysis, and infection-specific tests may be recommended."
      },
      {
        "q": "What tests are recommended for chronic fatigue?",
        "a": "CBC, Iron Studies, Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, and Kidney & Liver Function Tests may help identify possible causes."
      },
      {
        "q": "Which blood tests are useful for persistent weakness?",
        "a": "CBC, Blood Sugar, Iron Studies, Vitamin B12, Vitamin D, and Electrolytes are commonly advised."
      },
      {
        "q": "What tests help diagnose vitamin deficiencies?",
        "a": "Vitamin D, Vitamin B12, Folate, Ferritin, Iron Studies, and Calcium tests help evaluate nutritional status."
      },
      {
        "q": "Which tests are recommended for poor wound healing?",
        "a": "Blood Sugar, HbA1c, CBC, Protein Levels, Vitamin C, and Zinc assessments may be considered."
      },
      {
        "q": "What blood tests are recommended for unexplained weight changes?",
        "a": "Thyroid Profile, Blood Sugar, HbA1c, CBC, Liver Function Test, and Kidney Function Test are commonly recommended."
      },
      {
        "q": "Which tests help identify dehydration?",
        "a": "Electrolytes, Blood Urea, Creatinine, Kidney Function Tests, and Urine Analysis help evaluate hydration status."
      },
      {
        "q": "What tests are recommended for persistent nausea?",
        "a": "Liver Function Test, Kidney Function Test, Blood Sugar, Electrolytes, and Pancreatic Enzyme Tests may be advised."
      },
      {
        "q": "Which blood tests help investigate vomiting?",
        "a": "CBC, Electrolytes, Blood Sugar, Kidney Function Test, and Liver Function Test are commonly recommended."
      },
      {
        "q": "What tests are recommended for loss of taste or smell?",
        "a": "Depending on the clinical history, your doctor may recommend infection-related laboratory tests and general health screening."
      },
      {
        "q": "Which blood tests are useful for persistent cough?",
        "a": "CBC, ESR, CRP, Allergy Profile, and infection-related tests may be recommended."
      },
      {
        "q": "What tests help diagnose seasonal allergies?",
        "a": "Total IgE, Specific IgE Allergy Tests, CBC, and Eosinophil Count may be advised."
      },
      {
        "q": "Which blood tests are recommended for breathing difficulties?",
        "a": "CBC, CRP, D-Dimer, Allergy Profile, and other investigations depending on your symptoms."
      },
      {
        "q": "What tests help evaluate chronic sinus problems?",
        "a": "CBC, ESR, CRP, Allergy Profile, and Total IgE may be recommended."
      },
      {
        "q": "Which blood tests are useful for asthma monitoring?",
        "a": "CBC, Total IgE, Eosinophil Count, and other allergy-related investigations may be advised."
      },
      {
        "q": "What tests are recommended for recurrent ear infections?",
        "a": "CBC, CRP, Blood Sugar, and Culture & Sensitivity testing of ear discharge when indicated."
      },
      {
        "q": "Which blood tests help investigate hearing problems?",
        "a": "Blood Sugar, Thyroid Profile, Vitamin B12, and CBC may be recommended depending on the clinical assessment."
      },
      {
        "q": "What tests are recommended for blurred vision?",
        "a": "Blood Sugar, HbA1c, Lipid Profile, and other investigations based on your symptoms may be advised."
      },
      {
        "q": "Which blood tests help diagnose diabetic eye disease?",
        "a": "HbA1c, Blood Sugar, Kidney Function Tests, and Lipid Profile help monitor diabetes-related complications."
      },
      {
        "q": "What tests are recommended for dry mouth?",
        "a": "Blood Sugar, HbA1c, ANA Profile, and Thyroid Profile may be useful depending on your symptoms."
      },
      {
        "q": "Which blood tests help investigate excessive thirst?",
        "a": "Blood Sugar, HbA1c, Kidney Function Tests, Electrolytes, and Urine Analysis are commonly recommended."
      },
      {
        "q": "What tests are recommended for frequent urination?",
        "a": "Blood Sugar, HbA1c, Urine Routine Examination, Urine Culture, and Kidney Function Tests may help identify the cause."
      },
      {
        "q": "Which blood tests help evaluate bladder health?",
        "a": "Urine Routine Examination, Urine Culture, Kidney Function Tests, and Blood Sugar may be advised."
      },
      {
        "q": "What tests are recommended for blood in urine?",
        "a": "Urine Analysis, Urine Culture, Kidney Function Tests, CBC, and additional investigations may be required based on your doctor's evaluation."
      },
      {
        "q": "Which blood tests help diagnose kidney infections?",
        "a": "CBC, CRP, Kidney Function Tests, Urine Routine Examination, and Urine Culture are commonly recommended."
      },
      {
        "q": "What tests are recommended for kidney function monitoring?",
        "a": "Serum Creatinine, Blood Urea, eGFR, Electrolytes, and Urine Protein tests help monitor kidney health."
      },
      {
        "q": "Which blood tests help investigate liver disease?",
        "a": "Liver Function Test, Bilirubin, Albumin, PT/INR, Hepatitis Screening, and CBC are commonly recommended."
      },
      {
        "q": "What tests are recommended for fatty liver screening?",
        "a": "Liver Function Test, Lipid Profile, Blood Sugar, HbA1c, and imaging studies may be advised."
      },
      {
        "q": "Which blood tests help evaluate gallbladder disorders?",
        "a": "Liver Function Test, Bilirubin, and other investigations based on your symptoms may be recommended."
      },
      {
        "q": "What tests are recommended for pancreatic health?",
        "a": "Serum Amylase, Serum Lipase, Blood Sugar, HbA1c, and Liver Function Tests are commonly used."
      },
      {
        "q": "Which blood tests help investigate abdominal pain?",
        "a": "CBC, CRP, Liver Function Test, Kidney Function Test, Blood Sugar, and Urine Analysis may be recommended depending on the location and nature of the pain."
      },
      {
        "q": "What tests are recommended for constipation?",
        "a": "Thyroid Profile, Blood Sugar, Calcium, CBC, and Electrolytes may help identify underlying medical conditions."
      },
      {
        "q": "Which blood tests help evaluate diarrhoea?",
        "a": "Stool Examination, Stool Culture, CBC, Electrolytes, and CRP are commonly recommended."
      },
      {
        "q": "What tests are recommended for bloating?",
        "a": "CBC, Thyroid Profile, H. pylori testing, Stool Examination, and Liver Function Tests may be useful."
      },
      {
        "q": "Which blood tests help investigate indigestion?",
        "a": "H. pylori testing, CBC, Liver Function Test, and Blood Sugar may be recommended."
      },
      {
        "q": "What tests are recommended for unexplained muscle pain?",
        "a": "Creatine Kinase (CK), Vitamin D, Calcium, Thyroid Profile, ESR, and CRP may help determine the cause."
      },
      {
        "q": "Which blood tests help evaluate muscle weakness?",
        "a": "CBC, Electrolytes, Vitamin D, Vitamin B12, Creatine Kinase, and Thyroid Profile are commonly advised."
      },
      {
        "q": "What tests are recommended for joint swelling?",
        "a": "ESR, CRP, Rheumatoid Factor, Anti-CCP, Uric Acid, and CBC may be recommended."
      },
      {
        "q": "Which blood tests help diagnose arthritis?",
        "a": "Rheumatoid Factor, Anti-CCP, ESR, CRP, CBC, and Uric Acid help evaluate different types of arthritis."
      },
      {
        "q": "What tests are recommended for osteoporosis screening?",
        "a": "Vitamin D, Calcium, Phosphorus, Parathyroid Hormone, and Bone Health investigations may be advised."
      },
      {
        "q": "Which blood tests help investigate brittle bones?",
        "a": "Calcium, Vitamin D, Phosphorus, Alkaline Phosphatase, and Kidney Function Tests are commonly recommended."
      },
      {
        "q": "What tests are recommended for numbness?",
        "a": "Vitamin B12, Blood Sugar, HbA1c, Thyroid Profile, Electrolytes, and Vitamin D may help identify underlying causes."
      },
      {
        "q": "Which blood tests help evaluate tingling in the hands and feet?",
        "a": "Vitamin B12, Blood Sugar, HbA1c, Thyroid Profile, Kidney Function Tests, and Electrolytes are commonly advised."
      },
      {
        "q": "What tests are recommended for memory problems?",
        "a": "Vitamin B12, Thyroid Profile, Blood Sugar, CBC, and Electrolytes may be recommended to identify reversible medical causes."
      },
      {
        "q": "Which blood tests help investigate sleep disturbances?",
        "a": "Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, CBC, and Iron Studies may help evaluate underlying health conditions."
      },
      {
        "q": "What tests are recommended for routine preventive health screening?",
        "a": "A preventive health screening commonly includes CBC, Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Profile, Urine Analysis, Vitamin D, and Vitamin B12 based on age and risk factors."
      },
      {
        "q": "How can I choose the right diagnostic test or health package?",
        "a": "The most appropriate test or health package depends on your symptoms, age, medical history, family history, lifestyle, and your doctor's recommendation. A healthcare professional can help you select the most suitable investigations for your needs."
      }
    ]
  },
  {
    "id": "NEW_0",
    "name": "General - General & Test-Literacy FAQs",
    "faqs": [
      {
        "q": "What is a CBC (Complete Blood Count) test and what does it check?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "Do I need to fast before a blood test?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What is a normal HbA1c level, and what does it mean if it's high?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What is the difference between fasting and random blood sugar tests?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What blood tests should I get for a routine full body checkup?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "Why am I always tired even after resting?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What causes flu-like symptoms, and how is flu diagnosed?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What does a high or low white blood cell (WBC) count mean?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What is the difference between LFT and KFT?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "How often should I get blood tests done if I'm generally healthy?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What is a lipid profile, and what does it check for heart health?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What blood tests check for vitamin deficiency?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "Can a blood test diagnose anxiety or depression?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What is the difference between TSH, T3 and T4 thyroid tests?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "Why does my stomach hurt, and what tests help find the cause?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "What is considered normal blood pressure, and does high blood pressure need blood tests?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "Can stress cause abnormal blood test results?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      },
      {
        "q": "How soon can blood tests detect an infection?",
        "a": "The questions people ask most before and after getting a blood test — what tests measure, whether fasting is needed, and how to read results."
      }
    ]
  },
  {
    "id": "NEW_1",
    "name": "Endocrine - Diabetes Mellitus",
    "faqs": [
      {
        "q": "What tests are used to diagnose diabetes?",
        "a": "Good to know: Abnormal results usually need confirmation unless symptoms of high blood sugar are already obvious."
      }
    ]
  },
  {
    "id": "NEW_2",
    "name": "Endocrine - Hypothyroidism",
    "faqs": [
      {
        "q": "What blood tests confirm an underactive thyroid (hypothyroidism)?",
        "a": "Good to know: Results should be interpreted alongside pregnancy status, pituitary conditions, and current medications."
      }
    ]
  },
  {
    "id": "NEW_3",
    "name": "Endocrine - Hyperthyroidism",
    "faqs": [
      {
        "q": "What blood tests confirm an overactive thyroid (hyperthyroidism)?",
        "a": "Good to know: Biotin supplements can interfere with these test results — mention any supplement use to your lab."
      }
    ]
  },
  {
    "id": "NEW_4",
    "name": "Endocrine - Graves' Disease",
    "faqs": [
      {
        "q": "What test confirms Graves' disease specifically?",
        "a": "Answer coming soon based on clinical review draft."
      }
    ]
  },
  {
    "id": "NEW_5",
    "name": "Endocrine - Hashimoto's Thyroiditis",
    "faqs": [
      {
        "q": "What test confirms Hashimoto's thyroiditis?",
        "a": "Answer coming soon based on clinical review draft."
      }
    ]
  },
  {
    "id": "NEW_6",
    "name": "Hematologic - Anemia",
    "faqs": [
      {
        "q": "What tests are done to find the cause of anemia?",
        "a": "Good to know: Which advanced tests are needed depends on the red-cell size pattern and clinical picture."
      }
    ]
  },
  {
    "id": "NEW_7",
    "name": "Reproductive - Female - PCOS",
    "faqs": [
      {
        "q": "What blood tests are used to diagnose PCOS?",
        "a": "Good to know: PCOS is a clinical diagnosis made after excluding other conditions; hormone ratios alone shouldn't be used as a stand-alone diagnostic test."
      }
    ]
  },
  {
    "id": "NEW_8",
    "name": "Cardiovascular - Hypertension",
    "faqs": [
      {
        "q": "What blood tests are done after a high blood pressure diagnosis?",
        "a": "Good to know: Blood pressure itself is diagnosed with a cuff measurement, not a blood test — blood tests assess risk and downstream effects."
      }
    ]
  },
  {
    "id": "NEW_9",
    "name": "Renal / Urinary - Urinary Tract Infection (UTI)",
    "faqs": [
      {
        "q": "Are blood tests used to diagnose a UTI?",
        "a": "Good to know: Urine testing is required to diagnose most uncomplicated UTIs and isn't replaced by a blood panel."
      }
    ]
  },
  {
    "id": "NEW_10",
    "name": "Renal / Urinary - Chronic Kidney Disease (CKD)",
    "faqs": [
      {
        "q": "What blood tests monitor chronic kidney disease?",
        "a": "Good to know: A CKD diagnosis requires evidence the kidney function drop has lasted at least 3 months; a urine albumin-to-creatinine ratio is also essential and isn't a blood test."
      }
    ]
  },
  {
    "id": "NEW_11",
    "name": "Renal / Urinary - Kidney Stones",
    "faqs": [
      {
        "q": "What blood tests check for kidney stone risk?",
        "a": "Good to know: Blood tests alone can't identify the stone's type or location — imaging and urine metabolic testing are needed for that."
      }
    ]
  },
  {
    "id": "NEW_12",
    "name": "Musculoskeletal - Rheumatoid Arthritis",
    "faqs": [
      {
        "q": "What blood tests diagnose rheumatoid arthritis?",
        "a": "Good to know: A negative antibody result doesn't rule out RA — some cases are seronegative, so blood tests support but don't alone confirm the diagnosis."
      }
    ]
  },
  {
    "id": "NEW_13",
    "name": "Musculoskeletal - Gout",
    "faqs": [
      {
        "q": "What blood test checks for gout?",
        "a": "Good to know: Uric acid can be normal during an acute gout attack — joint fluid crystal analysis is the actual diagnostic gold standard."
      }
    ]
  },
  {
    "id": "NEW_14",
    "name": "Musculoskeletal - Osteoporosis",
    "faqs": [
      {
        "q": "What blood tests are relevant for osteoporosis?",
        "a": "Good to know: Blood tests support the workup, but a bone-mineral density (DEXA) scan is required to actually diagnose osteoporosis."
      }
    ]
  },
  {
    "id": "NEW_15",
    "name": "Liver - Fatty Liver Disease",
    "faqs": [
      {
        "q": "What blood tests detect fatty liver disease?",
        "a": "Good to know: Normal liver enzymes don't rule out significant fatty liver disease — imaging and fibrosis assessment remain important."
      }
    ]
  },
  {
    "id": "NEW_16",
    "name": "Liver - Hepatitis B",
    "faqs": [
      {
        "q": "What blood tests diagnose Hepatitis B?",
        "a": "Good to know: Marker combinations and chronicity need clinical interpretation — a positive result should be followed up with a specialist."
      }
    ]
  },
  {
    "id": "NEW_17",
    "name": "Liver - Hepatitis C",
    "faqs": [
      {
        "q": "What blood test diagnoses Hepatitis C?",
        "a": "Good to know: A reactive antibody shows current or past exposure — HCV RNA is needed to confirm an active, current infection."
      }
    ]
  },
  {
    "id": "NEW_18",
    "name": "Respiratory - Asthma",
    "faqs": [
      {
        "q": "Can a blood test diagnose asthma?",
        "a": "Good to know: Blood tests support but don't diagnose asthma — spirometry and clinical assessment remain essential."
      }
    ]
  },
  {
    "id": "NEW_19",
    "name": "Respiratory - COVID-19",
    "faqs": [
      {
        "q": "What blood tests are used for COVID-19?",
        "a": "Good to know: Blood antibody tests are not recommended to diagnose a current, active infection."
      }
    ]
  },
  {
    "id": "NEW_20",
    "name": "Mental Health - Anxiety Disorders",
    "faqs": [
      {
        "q": "What blood tests are done when investigating anxiety?",
        "a": "Good to know: No blood test diagnoses an anxiety disorder itself — testing is used to exclude medical causes alongside a clinical assessment."
      }
    ]
  },
  {
    "id": "NEW_21",
    "name": "Mental Health - Depression",
    "faqs": [
      {
        "q": "What blood tests are done when investigating depression?",
        "a": "Good to know: No blood test diagnoses depression. If you're having thoughts of self-harm or feel unable to stay safe, please seek immediate help rather than waiting on test results."
      }
    ]
  },
  {
    "id": "NEW_22",
    "name": "Central Nervous System - Migraine",
    "faqs": [
      {
        "q": "What blood tests are done for frequent headaches or migraine?",
        "a": "Good to know: A sudden, severe headache, or one with fever, confusion, or focal weakness, needs urgent in-person evaluation, not routine blood testing."
      }
    ]
  },
  {
    "id": "NEW_23",
    "name": "Gastrointestinal - GERD (Acid Reflux)",
    "faqs": [
      {
        "q": "Are blood tests useful for GERD (acid reflux)?",
        "a": "Good to know: Alarm symptoms (difficulty swallowing, unintended weight loss, bleeding) need an endoscopy, not just blood work."
      }
    ]
  },
  {
    "id": "NEW_24",
    "name": "Ocular - Diabetic Retinopathy",
    "faqs": [
      {
        "q": "What blood tests are relevant for diabetes-related eye damage?",
        "a": "Good to know: A retinal examination or photography is what actually diagnoses and grades diabetic retinopathy — blood tests only assess contributing risk."
      }
    ]
  }
];

export default function SymptomGuideFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap(d => d.faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a }
    })))
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-grow pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 text-[#0f2d5e] py-16 px-4 border-b border-blue-200">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center gap-2 bg-white border border-blue-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <BookOpen size={16} className="text-[#2563eb]" /> 
              <span className="text-[#0f2d5e] tracking-wide">QXL Diagnostics Knowledge Base</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight text-[#0f2d5e]">
              Symptom & Test Guide FAQs
            </h1>
            <div className="text-sm font-semibold text-blue-600 mb-4 bg-white/50 inline-block px-3 py-1 rounded-full border border-blue-200">
              Last updated: 29 July 2026 · Pending final clinical sign-off before publishing
            </div>
            <p className="text-blue-800/90 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Find direct answers on which diagnostic tests match common symptoms, organised by body system.
            </p>
            <p className="text-blue-100/90 text-sm md:text-base max-w-3xl mx-auto font-medium leading-relaxed mt-4 bg-blue-900/20 p-4 rounded-xl border border-blue-400/20">
              <strong>Common Health Questions:</strong> The health questions people actually search for most — "why am I always tired," "what tests detect diabetes," "what does a high WBC count mean" — answered directly and grounded in QXL's clinician-drafted test catalogue. Built to be quoted accurately by AI answer engines.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 mt-12 space-y-8">
          {faqData.map((system, sIdx) => {
            return (
              <div key={system.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-white to-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm border border-blue-200/50">
                      {system.name}
                    </span>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="p-3">
                  <div className="flex flex-col gap-2">
                    {system.faqs.map((faq, fIdx) => (
                      <details key={fIdx} className="group bg-white rounded-xl [&_summary::-webkit-details-marker]:hidden border border-transparent hover:border-gray-100">
                        <summary className="flex items-center justify-between p-4 font-semibold cursor-pointer text-gray-800 rounded-xl transition-colors select-none">
                          <span className="pr-4 leading-relaxed text-[15px]">{faq.q}</span>
                          <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 bg-slate-50 text-slate-500 p-1.5 rounded-full border border-slate-100">
                            <ChevronDown size={18} />
                          </span>
                        </summary>
                        <div className="px-4 pb-5 pt-1 text-[14.5px] text-slate-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      
        {/* Medical Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 mt-12 mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 text-sm leading-relaxed shadow-sm">
            <h4 className="font-bold text-amber-950 mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" /> Medical Disclaimer
            </h4>
            <p className="mb-3">
              This page is for general information only and does not replace medical advice. Please consult a doctor to interpret symptoms and test results.
            </p>
            <p className="text-xs text-amber-800/80">
              Test names, panels and limitation notes reflect QXL Diagnostics' internal clinical-review draft dated 29 July 2026. This catalogue itself states it is a "clinician-review draft, not a direct-to-consumer diagnostic promise" — confirm final clinical approval, live test-menu availability, and pricing before this content goes live.
            </p>
          </div>
        </div>
      </main>

    </div>
  );
}
