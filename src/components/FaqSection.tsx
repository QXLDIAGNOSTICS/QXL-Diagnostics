"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { api, type FAQItem } from '@/lib/api';
import Link from 'next/link';

function CallbackForm({ faqQuestion }: { faqQuestion: string }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-4 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl border border-emerald-100 text-[13px] font-bold">
        Thanks, {name}! We'll call you back shortly at {phone}.
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="mt-3">
        <button 
          onClick={() => setShowForm(true)}
          className="inline-flex items-center text-xs font-bold text-white bg-[#D69A18] hover:bg-amber-600 px-4 py-2 rounded-lg transition-colors shadow-2xs cursor-pointer"
        >
          Request Call Back
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col sm:flex-row gap-2 max-w-xl">
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name}
        onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
        required
        className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#D69A18] bg-slate-50/50"
      />
      <input 
        type="tel" 
        placeholder="Phone Number" 
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
        required
        className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#D69A18] bg-slate-50/50"
      />
      <button 
        type="submit" 
        className="inline-flex items-center justify-center text-xs font-bold text-white bg-[#D69A18] hover:bg-amber-600 px-4 py-2 rounded-lg transition-colors shadow-2xs shrink-0 whitespace-nowrap cursor-pointer"
      >
        Submit Request
      </button>
    </form>
  );
}

export default function FaqSection({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [visibleCount, setVisibleCount] = useState(10);
  const Heading = decorativeHeading ? 'p' : 'h2';

  useEffect(() => {
    const newFaqs = [
      { q: "Which blood test should I get if I feel tired all the time?", a: "Persistent fatigue may be caused by anemia, thyroid disorders, diabetes, vitamin deficiencies, or infections. Your doctor may recommend a Complete Blood Count (CBC), Thyroid Profile (TSH), Blood Sugar (Fasting & HbA1c), Vitamin D, Vitamin B12, Iron Studies, and Kidney & Liver Function Tests." },
      { q: "What blood tests are recommended for unexplained weight loss?", a: "Unexplained weight loss should be evaluated with CBC, Blood Sugar, HbA1c, Thyroid Profile, Liver Function Test, Kidney Function Test, ESR, and CRP to identify possible metabolic, infectious, or inflammatory conditions." },
      { q: "Which tests help identify the cause of frequent fever?", a: "Common tests include CBC, ESR, CRP, Blood Culture, Urine Analysis, Dengue Test, Malaria Test, Typhoid Test, and other investigations based on your symptoms." },
      { q: "Which tests are recommended for persistent headaches?", a: "Your doctor may recommend CBC, Blood Sugar, Electrolytes, Vitamin B12, Vitamin D, Thyroid Profile, and Lipid Profile. Imaging studies may be required if serious neurological conditions are suspected." },
      { q: "What blood tests should I take for dizziness?", a: "CBC, Blood Sugar, Iron Studies, Vitamin B12, Electrolytes, Thyroid Profile, and Blood Pressure evaluation are commonly recommended." },
      { q: "What tests are recommended for chest pain?", a: "Troponin-I/T, CK-MB, Lipid Profile, hs-CRP, Blood Sugar, ECG, and other cardiac investigations help evaluate heart-related chest pain." },
      { q: "Which blood tests are useful for palpitations?", a: "Thyroid Profile, Electrolytes, CBC, Blood Sugar, and Cardiac Markers may be recommended depending on your symptoms." },
      { q: "What tests are done for high blood pressure?", a: "Kidney Function Tests, Blood Sugar, Lipid Profile, Electrolytes, Urine Analysis, and Thyroid Profile are commonly advised." },
      { q: "Which tests check for diabetes?", a: "Fasting Blood Sugar, Postprandial Blood Sugar (PPBS), HbA1c, and Urine Sugar are commonly used to diagnose and monitor diabetes." },
      { q: "What is the HbA1c test?", a: "HbA1c measures your average blood sugar level over the previous 2–3 months and helps diagnose and monitor diabetes." },
      { q: "Which tests diagnose thyroid disorders?", a: "TSH, Free T3, Free T4, and Anti-TPO Antibody are commonly used to assess thyroid function." },
      { q: "Which blood tests help investigate hair loss?", a: "CBC, Iron Studies, Ferritin, Vitamin D, Vitamin B12, Zinc, and Thyroid Profile are often recommended." },
      { q: "What tests are recommended for joint pain?", a: "ESR, CRP, Rheumatoid Factor (RF), Anti-CCP, Uric Acid, Calcium, and Vitamin D are commonly performed." },
      { q: "Which test is used to diagnose gout?", a: "Serum Uric Acid is the primary laboratory test used when gout is suspected." },
      { q: "What blood tests are recommended for osteoporosis?", a: "Calcium, Vitamin D, Phosphorus, Parathyroid Hormone (PTH), and Bone Profile tests are commonly advised." },
      { q: "Which tests evaluate kidney function?", a: "Serum Creatinine, Blood Urea, eGFR, Electrolytes, and Urine Routine Examination help assess kidney health." },
      { q: "What tests help diagnose urinary tract infections?", a: "Urine Routine Examination and Urine Culture & Sensitivity are commonly recommended." },
      { q: "Which tests are used for liver disease?", a: "Liver Function Test (LFT), Hepatitis Screening, Bilirubin, Albumin, and PT/INR are commonly performed." },
      { q: "What tests detect fatty liver?", a: "Liver Function Test, Lipid Profile, Blood Sugar, and abdominal ultrasound are commonly recommended." },
      { q: "Which tests check pancreatic health?", a: "Serum Amylase, Serum Lipase, Blood Sugar, and HbA1c are commonly used." },
      { q: "Which tests help diagnose stomach infections?", a: "CBC, Stool Routine Examination, Stool Culture, H. pylori Test, and CRP may be recommended." },
      { q: "What tests are recommended for diarrhoea?", a: "Stool Routine Examination, Stool Culture, CBC, Electrolytes, and CRP help identify common causes." },
      { q: "Which tests identify food allergies?", a: "Total IgE and Specific IgE allergy tests help identify allergic triggers." },
      { q: "What blood tests are recommended for skin rashes?", a: "CBC, ESR, CRP, Total IgE, ANA, and Allergy Profile may be advised." },
      { q: "Which tests investigate persistent itching?", a: "Liver Function Test, Kidney Function Test, Blood Sugar, CBC, and Allergy Profile are commonly recommended." },
      { q: "Which blood tests are recommended for acne?", a: "Hormonal Profile, Blood Sugar, Testosterone, DHEAS, and Thyroid Profile may be useful." },
      { q: "Which tests help diagnose PCOS?", a: "LH, FSH, Testosterone, Prolactin, AMH, TSH, and Blood Sugar are commonly recommended." },
      { q: "What fertility tests are available for women?", a: "AMH, LH, FSH, Estradiol, Progesterone, Prolactin, and Thyroid Profile are commonly performed." },
      { q: "Which tests evaluate male infertility?", a: "Semen Analysis, Testosterone, LH, FSH, and Prolactin are commonly recommended." },
      { q: "What is the PSA test?", a: "PSA (Prostate-Specific Antigen) is a blood test used to assess prostate health." },
      { q: "Which blood tests are recommended for anemia?", a: "CBC, Iron Studies, Ferritin, Vitamin B12, and Folate help determine the cause of anemia." },
      { q: "What tests help identify vitamin deficiencies?", a: "Vitamin D, Vitamin B12, Folate, Iron Studies, and Calcium are commonly recommended." },
      { q: "Which tests are recommended for numbness and tingling?", a: "Vitamin B12, Blood Sugar, HbA1c, Thyroid Profile, and Electrolytes are often advised." },
      { q: "Which blood tests help investigate memory problems?", a: "Vitamin B12, Thyroid Profile, Blood Sugar, CBC, and Electrolytes may be recommended." },
      { q: "What tests are recommended for depression or fatigue?", a: "CBC, Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, and Iron Studies may help identify underlying medical causes." },
      { q: "Which tests are recommended before pregnancy?", a: "CBC, Blood Group, Thyroid Profile, Blood Sugar, Rubella Antibody, Hepatitis B, HIV, and Vitamin D are commonly advised." },
      { q: "Which tests are recommended during pregnancy?", a: "CBC, Blood Sugar, Urine Routine, Thyroid Profile, Blood Group, and infection screening are commonly performed." },
      { q: "Which tests help evaluate menopause?", a: "FSH, LH, Estradiol, Thyroid Profile, and Vitamin D are commonly recommended." },
      { q: "Which tests are useful for gum disease?", a: "Blood Sugar, HbA1c, CBC, and Vitamin C assessment may be considered." },
      { q: "Which tests investigate recurring mouth ulcers?", a: "CBC, Vitamin B12, Folate, Iron Studies, and Blood Sugar are commonly recommended." },
      { q: "Which blood tests help diagnose autoimmune diseases?", a: "ANA, ESR, CRP, Rheumatoid Factor, Anti-CCP, and Complement Levels may be advised." },
      { q: "Which tests help identify recurring infections?", a: "CBC, ESR, CRP, Blood Sugar, HIV Screening, and Immunoglobulin tests may be recommended." },
      { q: "Which tests are recommended for frequent bruising?", a: "CBC, Platelet Count, PT/INR, aPTT, and Liver Function Test help evaluate bleeding disorders." },
      { q: "Which tests investigate swollen lymph nodes?", a: "CBC, ESR, CRP, Peripheral Smear, and infection screening are commonly recommended." },
      { q: "Which blood tests help assess poor circulation?", a: "Lipid Profile, Blood Sugar, D-Dimer, and hs-CRP may be useful." },
      { q: "Which tests help diagnose deep vein thrombosis (DVT)?", a: "D-Dimer is commonly used along with imaging studies when DVT is suspected." },
      { q: "Which blood tests are recommended for routine annual health screening?", a: "CBC, Blood Sugar, HbA1c, Lipid Profile, Liver Function, Kidney Function, Thyroid Profile, Vitamin D, Vitamin B12, and Urine Analysis are commonly included." },
      { q: "How should I prepare for a blood test?", a: "Some blood tests require fasting for 8–12 hours, while others do not. Always follow the preparation instructions provided for your specific test." },
      { q: "Can I book a home sample collection?", a: "Yes. Many diagnostic tests can be performed through home sample collection by trained phlebotomists, depending on your location and test availability." },
      { q: "How do I choose the right health checkup package?", a: "The right package depends on your age, gender, symptoms, lifestyle, family history, and existing medical conditions. A healthcare professional or diagnostic expert can help you choose the most appropriate option." },
      { q: "What blood tests are recommended for unexplained weight gain?", a: "Weight gain may be associated with thyroid disorders, hormonal imbalances, or metabolic conditions. Your doctor may recommend a Thyroid Profile (TSH, FT3, FT4), Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, and Kidney Function Test." },
      { q: "Which tests help identify the cause of excessive sweating?", a: "A Thyroid Profile, Blood Sugar, CBC, Electrolytes, and infection markers such as ESR or CRP may be recommended based on your symptoms." },
      { q: "What tests are recommended for frequent urination?", a: "Blood Sugar, HbA1c, Urine Routine Examination, Urine Culture, and Kidney Function Tests help identify common causes." },
      { q: "Which tests should I get for excessive thirst?", a: "Fasting Blood Sugar, HbA1c, Electrolytes, Kidney Function Tests, and Urine Analysis are commonly recommended." },
      { q: "What blood tests are useful for unexplained swelling in the legs?", a: "Kidney Function Tests, Liver Function Tests, Albumin, D-Dimer, BNP (if indicated), and Urine Protein testing may be advised." },
      { q: "Which tests help diagnose dehydration?", a: "Electrolytes, Kidney Function Tests, Blood Urea, Creatinine, and Urine Specific Gravity help assess hydration status." },
      { q: "What tests are recommended for frequent muscle cramps?", a: "Calcium, Magnesium, Potassium, Vitamin D, and Kidney Function Tests are commonly recommended." },
      { q: "Which blood tests help investigate muscle weakness?", a: "CBC, Vitamin D, Vitamin B12, Calcium, Thyroid Profile, and Creatine Kinase (CK) may be useful." },
      { q: "Which tests are recommended for unexplained bruising?", a: "CBC, Platelet Count, PT/INR, aPTT, and Liver Function Tests help evaluate clotting disorders." },
      { q: "What tests help determine the cause of bleeding gums?", a: "CBC, Platelet Count, Blood Sugar, HbA1c, and Vitamin C assessment may be recommended." },
      { q: "Which blood tests are recommended for nosebleeds?", a: "CBC, Platelet Count, PT/INR, Liver Function Test, and Blood Pressure evaluation may be advised." },
      { q: "What tests help diagnose blood clotting disorders?", a: "PT/INR, aPTT, D-Dimer, Fibrinogen, and Platelet Count are commonly performed." },
      { q: "Which tests are recommended for persistent constipation?", a: "Thyroid Profile, Blood Sugar, Calcium, Electrolytes, and CBC may help identify underlying causes." },
      { q: "What tests help identify chronic diarrhoea?", a: "Stool Routine Examination, Stool Culture, CBC, ESR, CRP, and Electrolytes are commonly recommended." },
      { q: "Which blood tests are recommended for unexplained nausea?", a: "Liver Function Tests, Kidney Function Tests, Blood Sugar, Electrolytes, and Pancreatic Enzymes may be advised." },
      { q: "What tests help investigate frequent vomiting?", a: "Electrolytes, Kidney Function Tests, Liver Function Tests, CBC, and Blood Sugar help assess the underlying cause." },
      { q: "Which tests are recommended for acid reflux?", a: "H. pylori testing, CBC, and other digestive investigations may be recommended depending on symptoms." },
      { q: "What tests help diagnose food poisoning?", a: "Stool Culture, CBC, Electrolytes, and CRP are commonly recommended." },
      { q: "Which blood tests are recommended for bad breath?", a: "Blood Sugar, Kidney Function Tests, Liver Function Tests, and H. pylori testing may be useful." },
      { q: "What tests help identify nutritional deficiencies?", a: "Vitamin D, Vitamin B12, Folate, Iron Studies, Calcium, and Albumin are commonly recommended." },
      { q: "Which tests are recommended for chronic fatigue syndrome?", a: "CBC, Thyroid Profile, Blood Sugar, Vitamin D, Vitamin B12, Iron Studies, ESR, and CRP help identify possible underlying conditions." },
      { q: "What blood tests help evaluate poor immunity?", a: "CBC, Immunoglobulin Levels, Vitamin D, Blood Sugar, and HIV screening may be recommended when clinically appropriate." },
      { q: "Which tests are useful for frequent colds or infections?", a: "CBC, ESR, CRP, Blood Sugar, and Immune Profile tests may be considered." },
      { q: "What tests are recommended for enlarged lymph nodes?", a: "CBC, ESR, CRP, Peripheral Blood Smear, and additional tests depending on your doctor's evaluation." },
      { q: "Which blood tests are recommended for unexplained night sweats?", a: "CBC, ESR, CRP, Blood Culture, Thyroid Profile, and infection screening may be advised." },
      { q: "What tests help diagnose anemia?", a: "CBC, Ferritin, Iron Studies, Vitamin B12, Folate, and Reticulocyte Count help determine the type and cause of anemia." },
      { q: "Which blood tests help investigate pale skin?", a: "CBC, Iron Studies, Vitamin B12, and Folate are commonly recommended." },
      { q: "What tests are recommended for cold hands and feet?", a: "CBC, Thyroid Profile, Blood Sugar, and Iron Studies may help identify possible causes." },
      { q: "Which tests help identify hormonal imbalance?", a: "Thyroid Profile, Cortisol, Testosterone, Estrogen, Progesterone, LH, FSH, and Prolactin may be recommended depending on symptoms." },
      { q: "What tests are recommended for low energy levels?", a: "CBC, Blood Sugar, Thyroid Profile, Vitamin D, Vitamin B12, Iron Studies, and Kidney Function Tests may be advised." },
      { q: "Which tests help investigate sleep problems?", a: "Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, and Iron Studies may help identify contributing medical conditions." },
      { q: "What blood tests are recommended for anxiety symptoms?", a: "Thyroid Profile, Blood Sugar, Vitamin B12, Vitamin D, CBC, and Electrolytes may be recommended to rule out physical causes." },
      { q: "Which tests help identify the cause of depression?", a: "CBC, Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, and Iron Studies are commonly recommended." },
      { q: "Which blood tests are recommended for poor concentration?", a: "Vitamin B12, Thyroid Profile, Blood Sugar, CBC, and Iron Studies may be useful." },
      { q: "What tests help investigate memory loss?", a: "Vitamin B12, Thyroid Profile, Blood Sugar, CBC, and Electrolytes are commonly recommended." },
      { q: "Which tests are recommended for tingling in the hands?", a: "Vitamin B12, Blood Sugar, HbA1c, Thyroid Profile, and Electrolytes help evaluate common causes." },
      { q: "What blood tests are recommended for numbness in the feet?", a: "Vitamin B12, HbA1c, Blood Sugar, Thyroid Profile, and Kidney Function Tests may be advised." },
      { q: "Which tests help identify vitamin deficiencies causing nerve problems?", a: "Vitamin B12, Folate, Vitamin D, and Blood Sugar testing are commonly recommended." },
      { q: "What tests are recommended before starting a new exercise programme?", a: "CBC, Blood Sugar, Lipid Profile, Kidney Function Test, Liver Function Test, and ECG (if advised) may be useful." },
      { q: "Which blood tests are recommended before surgery?", a: "CBC, Blood Group, PT/INR, Blood Sugar, Kidney Function Test, Liver Function Test, and infection screening are commonly requested." },
      { q: "Which tests are recommended before international travel?", a: "Depending on your destination, your doctor may recommend CBC, Hepatitis Screening, HIV testing (where appropriate), immunity testing, and vaccination-related blood tests." },
      { q: "What tests are recommended after recovering from COVID-19 or a viral illness?", a: "CBC, CRP, D-Dimer, Blood Sugar, Liver Function Test, and Kidney Function Test may be advised depending on ongoing symptoms." },
      { q: "Which blood tests are useful for smokers?", a: "CBC, Lipid Profile, Blood Sugar, Liver Function Test, Kidney Function Test, and hs-CRP help assess overall health risks." },
      { q: "What tests are recommended for people who consume alcohol regularly?", a: "Liver Function Test, Lipid Profile, Blood Sugar, Vitamin B12, Folate, and CBC are commonly recommended." },
      { q: "Which blood tests are recommended for vegetarians?", a: "Vitamin B12, Iron Studies, Ferritin, Folate, Vitamin D, and CBC help assess common nutritional deficiencies." },
      { q: "Which blood tests are recommended for senior citizens?", a: "CBC, Blood Sugar, HbA1c, Lipid Profile, Kidney Function Test, Liver Function Test, Thyroid Profile, Vitamin D, Vitamin B12, and Urine Analysis are commonly included." },
      { q: "Which health tests are recommended every year?", a: "Annual health screening often includes CBC, Blood Sugar, HbA1c, Lipid Profile, Kidney Function Test, Liver Function Test, Thyroid Profile, Urine Analysis, and Blood Pressure evaluation." },
      { q: "Can I have blood tests done at home?", a: "Yes. Many diagnostic tests are available through home sample collection by trained phlebotomists, depending on your location and the specific test required." },
      { q: "How long does it take to receive blood test reports?", a: "Report turnaround time depends on the test. Routine investigations are often available within 24 hours, while specialised tests may take longer." },
      { q: "How can QXL Diagnostics help me choose the right test?", a: "QXL Diagnostics can guide you in selecting the most appropriate test or health checkup package based on your symptoms, age, medical history, and your doctor's recommendation. Always consult a qualified healthcare professional for diagnosis and treatment." },
      { q: "Which blood tests are recommended for hair thinning?", a: "Hair thinning may be caused by nutritional deficiencies, thyroid disorders, hormonal imbalance, or anemia. Common tests include CBC, Ferritin, Iron Studies, Vitamin D, Vitamin B12, Zinc, and Thyroid Profile." },
      { q: "What tests help investigate brittle nails?", a: "CBC, Iron Studies, Vitamin B12, Vitamin D, Calcium, and Thyroid Profile may help identify nutritional or metabolic causes." },
      { q: "Which tests are recommended for frequent headaches with blurred vision?", a: "Blood Sugar, HbA1c, Blood Pressure evaluation, CBC, Lipid Profile, and an eye examination may be recommended." },
      { q: "What blood tests are useful for unexplained eye redness?", a: "CBC, ESR, CRP, Blood Sugar, and autoimmune screening such as ANA may be advised depending on your symptoms." },
      { q: "Which tests help diagnose dry eyes?", a: "Blood Sugar, Thyroid Profile, ANA, and Vitamin A assessment may be recommended in selected cases." },
      { q: "What tests are recommended for ringing in the ears (tinnitus)?", a: "CBC, Thyroid Profile, Blood Sugar, Vitamin B12, and Lipid Profile may help identify underlying conditions." },
      { q: "Which blood tests are useful for hearing loss?", a: "Blood Sugar, Thyroid Profile, Vitamin B12, CBC, and autoimmune screening may be considered." },
      { q: "What tests help investigate frequent sinus infections?", a: "CBC, ESR, CRP, Total IgE, and Allergy Profile may help determine the cause." },
      { q: "Which tests are recommended for chronic allergies?", a: "Total IgE, Specific IgE Allergy Panel, CBC, and Eosinophil Count are commonly recommended." },
      { q: "What tests help identify asthma triggers?", a: "Total IgE, Specific IgE Allergy Tests, CBC, and Eosinophil Count may be useful." },
      { q: "Which blood tests are recommended for chronic cough?", a: "CBC, ESR, CRP, Total IgE, and infection screening may be recommended based on symptoms." },
      { q: "What tests help diagnose pneumonia?", a: "CBC, CRP, Procalcitonin, Blood Culture, and other investigations may be advised depending on clinical findings." },
      { q: "Which tests are recommended for tuberculosis screening?", a: "TB-specific laboratory tests, CBC, ESR, and additional investigations may be recommended by your doctor." },
      { q: "What tests help diagnose viral infections?", a: "CBC, CRP, and virus-specific laboratory tests may be recommended depending on your symptoms." },
      { q: "Which blood tests are recommended for dengue fever?", a: "Dengue NS1 Antigen, Dengue IgM/IgG Antibody, CBC, and Platelet Count are commonly used." },
      { q: "What tests help diagnose malaria?", a: "Peripheral Blood Smear and Rapid Malaria Antigen Tests are commonly recommended." },
      { q: "Which tests are recommended for typhoid fever?", a: "Blood Culture, Typhoid IgM, and CBC may be advised depending on the stage of illness." },
      { q: "What tests help identify bacterial infections?", a: "CBC, CRP, Procalcitonin, Blood Culture, and Urine Culture may be recommended." },
      { q: "Which blood tests are recommended for fungal infections?", a: "CBC, ESR, CRP, and fungal culture or microscopy may be advised depending on the suspected infection." },
      { q: "What tests help diagnose parasitic infections?", a: "Stool Routine Examination, Stool Ova & Parasite Test, CBC, and Eosinophil Count are commonly performed." },
      { q: "Which blood tests are recommended for high cholesterol?", a: "A Lipid Profile measures Total Cholesterol, LDL, HDL, Triglycerides, and other lipid parameters." },
      { q: "What tests help evaluate high triglycerides?", a: "Lipid Profile, Blood Sugar, HbA1c, Liver Function Test, and Thyroid Profile are commonly recommended." },
      { q: "Which tests are useful for obesity assessment?", a: "Blood Sugar, HbA1c, Lipid Profile, Thyroid Profile, and Liver Function Test help assess metabolic health." },
      { q: "What blood tests are recommended before starting a weight-loss programme?", a: "CBC, Blood Sugar, HbA1c, Thyroid Profile, Liver Function Test, Kidney Function Test, and Lipid Profile are commonly advised." },
      { q: "Which tests help investigate unexplained abdominal swelling?", a: "Liver Function Test, Kidney Function Test, CBC, Albumin, and abdominal imaging may be recommended." },
      { q: "What tests help identify gallstones?", a: "Liver Function Test and imaging studies such as ultrasound are commonly used." },
      { q: "Which blood tests are recommended for jaundice?", a: "Liver Function Test, Bilirubin, Hepatitis Screening, CBC, and PT/INR are commonly recommended." },
      { q: "What tests help diagnose hepatitis?", a: "Hepatitis A, B, C, and E screening, along with Liver Function Tests, are commonly performed." },
      { q: "Which blood tests are useful for chronic liver disease?", a: "Liver Function Test, Albumin, PT/INR, CBC, and Hepatitis Screening may be advised." },
      { q: "What tests help investigate enlarged liver?", a: "Liver Function Test, Hepatitis Screening, CBC, and abdominal ultrasound are commonly recommended." },
      { q: "Which blood tests are recommended for pancreatic disorders?", a: "Serum Amylase, Serum Lipase, Blood Sugar, HbA1c, and Liver Function Test may be useful." },
      { q: "What tests help diagnose chronic pancreatitis?", a: "Serum Lipase, Serum Amylase, Blood Sugar, HbA1c, and imaging studies may be recommended." },
      { q: "Which blood tests are recommended for unexplained weight gain in children?", a: "Thyroid Profile, Blood Sugar, CBC, and Lipid Profile may help identify possible causes." },
      { q: "What tests help monitor childhood growth?", a: "CBC, Vitamin D, Calcium, Thyroid Profile, and Iron Studies may be advised when clinically indicated." },
      { q: "Which blood tests are recommended for delayed puberty?", a: "LH, FSH, Testosterone or Estrogen, Thyroid Profile, and other hormone tests may be recommended." },
      { q: "What tests help investigate delayed growth?", a: "Thyroid Profile, Vitamin D, Calcium, CBC, and hormone evaluations may be advised." },
      { q: "Which blood tests are recommended for bone pain?", a: "Calcium, Vitamin D, Phosphorus, Alkaline Phosphatase, and Kidney Function Tests are commonly performed." },
      { q: "What tests help diagnose calcium deficiency?", a: "Serum Calcium, Vitamin D, Parathyroid Hormone (PTH), and Magnesium may be recommended." },
      { q: "Which blood tests are recommended for Vitamin D deficiency?", a: "A 25-Hydroxy Vitamin D blood test is the standard investigation used to assess Vitamin D levels." },
      { q: "What tests help investigate Vitamin B12 deficiency?", a: "Vitamin B12, CBC, Folate, and Homocysteine testing may be advised." },
      { q: "Which blood tests are useful for folate deficiency?", a: "Serum Folate, CBC, and Vitamin B12 are commonly recommended." },
      { q: "What tests help diagnose iron deficiency?", a: "Ferritin, Serum Iron, TIBC, Transferrin Saturation, and CBC help evaluate iron status." },
      { q: "Which blood tests are recommended for sports fitness?", a: "CBC, Blood Sugar, Kidney Function Test, Liver Function Test, Vitamin D, and Iron Studies may be included." },
      { q: "What tests help monitor athletes' health?", a: "CBC, Electrolytes, Iron Studies, Vitamin D, Kidney Function Test, and Liver Function Test are commonly recommended." },
      { q: "Which blood tests are recommended for office workers?", a: "Annual health screening with CBC, Blood Sugar, Lipid Profile, Liver Function Test, Kidney Function Test, and Thyroid Profile helps monitor overall health." },
      { q: "What tests help evaluate work-related stress?", a: "Blood Sugar, Thyroid Profile, Vitamin D, Vitamin B12, CBC, and Iron Studies may help identify underlying medical conditions contributing to fatigue or stress." },
      { q: "Which blood tests are recommended for shift workers?", a: "Blood Sugar, Thyroid Profile, Vitamin D, Vitamin B12, CBC, and Lipid Profile are commonly recommended." },
      { q: "What tests help identify lifestyle-related diseases?", a: "Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, and Blood Pressure evaluation help assess common lifestyle-related conditions." },
      { q: "Which health checkup package is best for adults aged 30–40?", a: "Adults in this age group may benefit from a preventive health package including CBC, Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Profile, and Urine Analysis." },
      { q: "Why should I choose QXL Diagnostics for preventive health screening?", a: "QXL Diagnostics offers a wide range of laboratory investigations, preventive health packages, home sample collection (where available), accurate testing, and timely reports to support early detection and better health management. Always discuss your results with a qualified healthcare professional." },
      { q: "What blood tests are recommended before getting married?", a: "A premarital health screening may include Blood Group & Rh Typing, CBC, Blood Sugar, Thyroid Profile, HIV, Hepatitis B & C screening, VDRL (Syphilis), and other tests based on your healthcare provider's advice." },
      { q: "Which tests help assess overall immunity?", a: "CBC, Vitamin D, Vitamin B12, Immunoglobulin Levels (IgG, IgA, IgM), and Blood Sugar may help evaluate immune health when clinically indicated." },
      { q: "What blood tests should I get if I feel weak after recovering from an illness?", a: "CBC, Iron Studies, Vitamin B12, Vitamin D, Blood Sugar, and Kidney & Liver Function Tests may help identify ongoing health issues." },
      { q: "Which tests are recommended for unexplained loss of appetite?", a: "CBC, Liver Function Test, Kidney Function Test, Blood Sugar, Thyroid Profile, and CRP may be recommended depending on your symptoms." },
      { q: "What tests help identify chronic inflammation?", a: "ESR, CRP, CBC, ANA, and Rheumatoid Factor may help detect inflammation in the body." },
      { q: "Which blood tests are recommended for unexplained body pain?", a: "CBC, ESR, CRP, Vitamin D, Calcium, Thyroid Profile, and Rheumatoid Factor may be useful." },
      { q: "What tests help diagnose rheumatoid arthritis?", a: "Rheumatoid Factor (RF), Anti-CCP Antibody, ESR, CRP, and CBC are commonly recommended." },
      { q: "Which tests are recommended for lupus?", a: "ANA Profile, ESR, CRP, Complement Levels (C3 & C4), CBC, and Urine Analysis may be advised." },
      { q: "What tests help diagnose gout?", a: "Serum Uric Acid, ESR, CRP, Kidney Function Tests, and joint fluid analysis (when indicated) are commonly used." },
      { q: "Which tests are recommended for osteoporosis risk?", a: "Vitamin D, Calcium, Phosphorus, Parathyroid Hormone (PTH), and Bone Profile tests help evaluate bone health." },
      { q: "What tests help diagnose vitamin deficiencies?", a: "Vitamin D, Vitamin B12, Folate, Iron Studies, Ferritin, and Calcium tests are commonly performed." },
      { q: "Which blood tests are recommended for unexplained fatigue after exercise?", a: "CBC, Iron Studies, Electrolytes, Vitamin D, Creatine Kinase (CK), and Thyroid Profile may be recommended." },
      { q: "What tests help investigate excessive hair growth in women?", a: "Testosterone, DHEAS, LH, FSH, Prolactin, Thyroid Profile, and Blood Sugar may help identify hormonal causes." },
      { q: "Which tests are recommended for low libido?", a: "Testosterone, Estrogen, Thyroid Profile, Blood Sugar, Prolactin, and Vitamin D may be useful depending on symptoms." },
      { q: "What blood tests help evaluate erectile dysfunction?", a: "Blood Sugar, HbA1c, Testosterone, Lipid Profile, Thyroid Profile, and Kidney Function Tests may be recommended." },
      { q: "Which tests are recommended for frequent miscarriages?", a: "Thyroid Profile, Antiphospholipid Antibody Tests, Blood Sugar, Hormonal Profile, and other investigations may be advised by your doctor." },
      { q: "What tests help diagnose polycystic ovary syndrome (PCOS)?", a: "LH, FSH, Testosterone, AMH, Prolactin, TSH, Blood Sugar, and Lipid Profile are commonly recommended." },
      { q: "Which tests are recommended for menopause symptoms?", a: "FSH, LH, Estradiol, Thyroid Profile, Vitamin D, and Calcium may help evaluate menopausal health." },
      { q: "What blood tests are useful for irregular menstrual cycles?", a: "Thyroid Profile, Prolactin, LH, FSH, Testosterone, and Blood Sugar may be recommended." },
      { q: "Which tests help diagnose hormonal imbalance in men?", a: "Testosterone, LH, FSH, Prolactin, Thyroid Profile, and Blood Sugar may be advised." },
      { q: "What blood tests are recommended for persistent bloating?", a: "CBC, Liver Function Test, Thyroid Profile, H. pylori testing, Stool Examination, and Blood Sugar may be useful." },
      { q: "Which tests help identify lactose intolerance?", a: "Your doctor may recommend specific diagnostic tests based on your symptoms, along with other digestive investigations where appropriate." },
      { q: "What tests are recommended for gluten sensitivity?", a: "Anti-tTG Antibody and other coeliac disease-related tests may be recommended by your healthcare provider." },
      { q: "Which blood tests help evaluate chronic constipation?", a: "Thyroid Profile, Blood Sugar, Calcium, CBC, and Electrolytes may help identify underlying causes." },
      { q: "What tests are recommended for unexplained diarrhoea?", a: "Stool Routine Examination, Stool Culture, CBC, CRP, Electrolytes, and digestive investigations may be advised." },
      { q: "Which blood tests help investigate frequent stomach infections?", a: "CBC, Stool Examination, H. pylori testing, CRP, and Stool Culture may help determine the cause." },
      { q: "What tests are recommended for abdominal cramps?", a: "CBC, CRP, Electrolytes, Stool Examination, and Urine Analysis may be recommended depending on symptoms." },
      { q: "Which tests help diagnose dehydration in children and adults?", a: "Electrolytes, Kidney Function Tests, Blood Urea, Creatinine, and Urine Analysis help assess hydration status." },
      { q: "What blood tests are recommended for frequent urination at night?", a: "Blood Sugar, HbA1c, Kidney Function Tests, Urine Analysis, and PSA (for men when appropriate) may be advised." },
      { q: "Which tests help investigate blood in the urine?", a: "Urine Routine Examination, Urine Culture, Kidney Function Tests, and other investigations may be recommended by your doctor." },
      { q: "What blood tests are useful for kidney disease monitoring?", a: "Serum Creatinine, Blood Urea, eGFR, Electrolytes, Urine Protein, and Kidney Function Tests help monitor kidney health." },
      { q: "Which tests are recommended after a kidney stone?", a: "Kidney Function Tests, Urine Analysis, Serum Calcium, Uric Acid, and other metabolic evaluations may be advised." },
      { q: "What tests help diagnose gallbladder disease?", a: "Liver Function Tests and imaging studies are commonly used to evaluate gallbladder disorders." },
      { q: "Which blood tests are recommended for pancreatic disorders?", a: "Serum Amylase, Serum Lipase, Blood Sugar, HbA1c, and Liver Function Tests are commonly recommended." },
      { q: "What tests help identify alcohol-related liver damage?", a: "Liver Function Test, GGT, Albumin, PT/INR, and CBC may help evaluate liver health." },
      { q: "Which blood tests are recommended for smokers?", a: "CBC, Lipid Profile, Blood Sugar, Liver Function Test, Kidney Function Test, and hs-CRP may be included in a preventive health assessment." },
      { q: "What tests help evaluate obesity-related health risks?", a: "Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, and Thyroid Profile help assess metabolic health." },
      { q: "Which blood tests are recommended for high cholesterol?", a: "A Lipid Profile, Blood Sugar, HbA1c, Liver Function Test, and Thyroid Profile are commonly recommended." },
      { q: "What tests help identify metabolic syndrome?", a: "Blood Sugar, HbA1c, Lipid Profile, Blood Pressure assessment, Waist Circumference, and other metabolic evaluations are commonly used." },
      { q: "Which blood tests are recommended before starting cholesterol medication?", a: "Lipid Profile, Liver Function Test, Kidney Function Test, and Blood Sugar are commonly recommended before treatment." },
      { q: "What tests help evaluate unexplained swelling in the face?", a: "Kidney Function Tests, Urine Analysis, Thyroid Profile, CBC, and Allergy Profile may be recommended." },
      { q: "Which blood tests are useful for chronic itching without a rash?", a: "Liver Function Test, Kidney Function Test, Blood Sugar, CBC, Thyroid Profile, and Allergy Tests may help identify possible causes." },
      { q: "What tests are recommended for recurring boils or skin infections?", a: "Blood Sugar, HbA1c, CBC, CRP, and bacterial culture of the affected area may be recommended." },
      { q: "Which blood tests help diagnose eczema?", a: "CBC, Total IgE, Allergy Profile, and Eosinophil Count may be useful in evaluating allergic skin conditions." },
      { q: "What tests are recommended for psoriasis?", a: "CBC, ESR, CRP, and other investigations may be advised depending on your symptoms and medical history." },
      { q: "Which blood tests help identify autoimmune skin disorders?", a: "ANA Profile, ESR, CRP, CBC, and other autoimmune markers may be recommended." },
      { q: "What tests are recommended for unexplained skin darkening?", a: "Blood Sugar, Thyroid Profile, Cortisol, Vitamin B12, and Iron Studies may help identify underlying causes." },
      { q: "Which blood tests are useful for frequent dizziness on standing?", a: "CBC, Blood Sugar, Electrolytes, Vitamin B12, and Thyroid Profile may be recommended." },
      { q: "What tests help investigate fainting episodes?", a: "Blood Sugar, CBC, Electrolytes, Thyroid Profile, and other investigations may be advised based on your symptoms." },
      { q: "What health checkup is recommended if I have no symptoms?", a: "Even without symptoms, an annual preventive health checkup including CBC, Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Profile, Urine Analysis, and other age-appropriate tests can help detect health problems early. Always consult a healthcare professional to choose the most suitable screening package." },
      { q: "What blood tests are recommended for frequent infections?", a: "CBC, ESR, CRP, Blood Sugar, Vitamin D, Vitamin B12, and other tests may be recommended to identify underlying conditions that could contribute to recurrent infections." },
      { q: "Which tests help diagnose autoimmune diseases?", a: "ANA Profile, Rheumatoid Factor (RF), Anti-CCP, ESR, CRP, and Complement Levels (C3, C4) are commonly recommended based on your symptoms." },
      { q: "What tests are recommended for swollen lymph nodes?", a: "CBC, ESR, CRP, Peripheral Blood Smear, and additional tests depending on your doctor's assessment." },
      { q: "Which blood tests help investigate unexplained fever?", a: "CBC, ESR, CRP, Blood Culture, Urine Analysis, and infection-specific tests may be recommended." },
      { q: "What tests are recommended for chronic fatigue?", a: "CBC, Iron Studies, Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, and Kidney & Liver Function Tests may help identify possible causes." },
      { q: "Which blood tests are useful for persistent weakness?", a: "CBC, Blood Sugar, Iron Studies, Vitamin B12, Vitamin D, and Electrolytes are commonly advised." },
      { q: "What tests help diagnose vitamin deficiencies?", a: "Vitamin D, Vitamin B12, Folate, Ferritin, Iron Studies, and Calcium tests help evaluate nutritional status." },
      { q: "Which tests are recommended for poor wound healing?", a: "Blood Sugar, HbA1c, CBC, Protein Levels, Vitamin C, and Zinc assessments may be considered." },
      { q: "What blood tests are recommended for unexplained weight changes?", a: "Thyroid Profile, Blood Sugar, HbA1c, CBC, Liver Function Test, and Kidney Function Test are commonly recommended." },
      { q: "Which tests help identify dehydration?", a: "Electrolytes, Blood Urea, Creatinine, Kidney Function Tests, and Urine Analysis help evaluate hydration status." },
      { q: "What tests are recommended for persistent nausea?", a: "Liver Function Test, Kidney Function Test, Blood Sugar, Electrolytes, and Pancreatic Enzyme Tests may be advised." },
      { q: "Which blood tests help investigate vomiting?", a: "CBC, Electrolytes, Blood Sugar, Kidney Function Test, and Liver Function Test are commonly recommended." },
      { q: "What tests are recommended for loss of taste or smell?", a: "Depending on the clinical history, your doctor may recommend infection-related laboratory tests and general health screening." },
      { q: "Which blood tests are useful for persistent cough?", a: "CBC, ESR, CRP, Allergy Profile, and infection-related tests may be recommended." },
      { q: "What tests help diagnose seasonal allergies?", a: "Total IgE, Specific IgE Allergy Tests, CBC, and Eosinophil Count may be advised." },
      { q: "Which blood tests are recommended for breathing difficulties?", a: "CBC, CRP, D-Dimer, Allergy Profile, and other investigations depending on your symptoms." },
      { q: "What tests help evaluate chronic sinus problems?", a: "CBC, ESR, CRP, Allergy Profile, and Total IgE may be recommended." },
      { q: "Which blood tests are useful for asthma monitoring?", a: "CBC, Total IgE, Eosinophil Count, and other allergy-related investigations may be advised." },
      { q: "What tests are recommended for recurrent ear infections?", a: "CBC, CRP, Blood Sugar, and Culture & Sensitivity testing of ear discharge when indicated." },
      { q: "Which blood tests help investigate hearing problems?", a: "Blood Sugar, Thyroid Profile, Vitamin B12, and CBC may be recommended depending on the clinical assessment." },
      { q: "What tests are recommended for blurred vision?", a: "Blood Sugar, HbA1c, Lipid Profile, and other investigations based on your symptoms may be advised." },
      { q: "Which blood tests help diagnose diabetic eye disease?", a: "HbA1c, Blood Sugar, Kidney Function Tests, and Lipid Profile help monitor diabetes-related complications." },
      { q: "What tests are recommended for dry mouth?", a: "Blood Sugar, HbA1c, ANA Profile, and Thyroid Profile may be useful depending on your symptoms." },
      { q: "Which blood tests help investigate excessive thirst?", a: "Blood Sugar, HbA1c, Kidney Function Tests, Electrolytes, and Urine Analysis are commonly recommended." },
      { q: "What tests are recommended for frequent urination?", a: "Blood Sugar, HbA1c, Urine Routine Examination, Urine Culture, and Kidney Function Tests may help identify the cause." },
      { q: "Which blood tests help evaluate bladder health?", a: "Urine Routine Examination, Urine Culture, Kidney Function Tests, and Blood Sugar may be advised." },
      { q: "What tests are recommended for blood in urine?", a: "Urine Analysis, Urine Culture, Kidney Function Tests, CBC, and additional investigations may be required based on your doctor's evaluation." },
      { q: "Which blood tests help diagnose kidney infections?", a: "CBC, CRP, Kidney Function Tests, Urine Routine Examination, and Urine Culture are commonly recommended." },
      { q: "What tests are recommended for kidney function monitoring?", a: "Serum Creatinine, Blood Urea, eGFR, Electrolytes, and Urine Protein tests help monitor kidney health." },
      { q: "Which blood tests help investigate liver disease?", a: "Liver Function Test, Bilirubin, Albumin, PT/INR, Hepatitis Screening, and CBC are commonly recommended." },
      { q: "What tests are recommended for fatty liver screening?", a: "Liver Function Test, Lipid Profile, Blood Sugar, HbA1c, and imaging studies may be advised." },
      { q: "Which blood tests help evaluate gallbladder disorders?", a: "Liver Function Test, Bilirubin, and other investigations based on your symptoms may be recommended." },
      { q: "What tests are recommended for pancreatic health?", a: "Serum Amylase, Serum Lipase, Blood Sugar, HbA1c, and Liver Function Tests are commonly used." },
      { q: "Which blood tests help investigate abdominal pain?", a: "CBC, CRP, Liver Function Test, Kidney Function Test, Blood Sugar, and Urine Analysis may be recommended depending on the location and nature of the pain." },
      { q: "What tests are recommended for constipation?", a: "Thyroid Profile, Blood Sugar, Calcium, CBC, and Electrolytes may help identify underlying medical conditions." },
      { q: "Which blood tests help evaluate diarrhoea?", a: "Stool Examination, Stool Culture, CBC, Electrolytes, and CRP are commonly recommended." },
      { q: "What tests are recommended for bloating?", a: "CBC, Thyroid Profile, H. pylori testing, Stool Examination, and Liver Function Tests may be useful." },
      { q: "Which blood tests help investigate indigestion?", a: "H. pylori testing, CBC, Liver Function Test, and Blood Sugar may be recommended." },
      { q: "What tests are recommended for unexplained muscle pain?", a: "Creatine Kinase (CK), Vitamin D, Calcium, Thyroid Profile, ESR, and CRP may help determine the cause." },
      { q: "Which blood tests help evaluate muscle weakness?", a: "CBC, Electrolytes, Vitamin D, Vitamin B12, Creatine Kinase, and Thyroid Profile are commonly advised." },
      { q: "What tests are recommended for joint swelling?", a: "ESR, CRP, Rheumatoid Factor, Anti-CCP, Uric Acid, and CBC may be recommended." },
      { q: "Which blood tests help diagnose arthritis?", a: "Rheumatoid Factor, Anti-CCP, ESR, CRP, CBC, and Uric Acid help evaluate different types of arthritis." },
      { q: "What tests are recommended for osteoporosis screening?", a: "Vitamin D, Calcium, Phosphorus, Parathyroid Hormone, and Bone Health investigations may be advised." },
      { q: "Which blood tests help investigate brittle bones?", a: "Calcium, Vitamin D, Phosphorus, Alkaline Phosphatase, and Kidney Function Tests are commonly recommended." },
      { q: "What tests are recommended for numbness?", a: "Vitamin B12, Blood Sugar, HbA1c, Thyroid Profile, Electrolytes, and Vitamin D may help identify underlying causes." },
      { q: "Which blood tests help evaluate tingling in the hands and feet?", a: "Vitamin B12, Blood Sugar, HbA1c, Thyroid Profile, Kidney Function Tests, and Electrolytes are commonly advised." },
      { q: "What tests are recommended for memory problems?", a: "Vitamin B12, Thyroid Profile, Blood Sugar, CBC, and Electrolytes may be recommended to identify reversible medical causes." },
      { q: "Which blood tests help investigate sleep disturbances?", a: "Thyroid Profile, Vitamin D, Vitamin B12, Blood Sugar, CBC, and Iron Studies may help evaluate underlying health conditions." },
      { q: "What tests are recommended for routine preventive health screening?", a: "A preventive health screening commonly includes CBC, Blood Sugar, HbA1c, Lipid Profile, Liver Function Test, Kidney Function Test, Thyroid Profile, Urine Analysis, Vitamin D, and Vitamin B12 based on age and risk factors." },
      { q: "How can I choose the right diagnostic test or health package?", a: "The most appropriate test or health package depends on your symptoms, age, medical history, family history, lifestyle, and your doctor's recommendation. A healthcare professional can help you select the most suitable investigations for your needs." }
    ].map((f, i) => ({
      id: `faq-med-${i}`,
      question: f.q,
      answer: f.a,
      sort_order: i + 1,
      is_active: true,
      category: null,
    }));
    
    setFaqs(newFaqs);
  }, []);

  if (faqs.length === 0) return null;

  // Page-level FAQPage structured data generated from the FAQs actually
  // rendered below, so schema always matches on-page visible content
  // (required by Google's structured data guidelines).
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-6 sm:py-10 bg-white border-t border-slate-150">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-3 sm:px-6 w-full">
        <div className="text-center mb-5 space-y-1">
          <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            Help Center
          </span>
          <Heading className="text-[#0f2d5e] text-xl sm:text-2xl font-black tracking-tight">
            Frequently Asked Questions
          </Heading>
          <p className="text-slate-500 text-xs font-medium">
            Everything you need to know about our testing processes.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.slice(0, visibleCount).map((faq, idx) => (
            <div
              key={faq.id}
              className={`bg-white rounded-xl border transition-all duration-200 ${
                openIdx === idx
                  ? 'border-[#D69A18] shadow-xs bg-[#FFF8EB]/30'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left focus:outline-none cursor-pointer"
              >
                <span
                  className={`font-extrabold text-xs sm:text-[13.5px] pr-3 leading-snug ${
                    openIdx === idx ? 'text-[#D69A18]' : 'text-[#0f2d5e]'
                  }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIdx === idx ? 'bg-[#FFF8EB] text-[#D69A18]' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      openIdx === idx ? 'rotate-180 text-[#D69A18]' : 'text-slate-400'
                    }`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 px-3.5 sm:px-4 ${
                  openIdx === idx ? 'max-h-[600px] pb-3.5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-slate-600 text-xs leading-relaxed border-t border-amber-100/60 pt-3 font-medium">
                  {faq.answer}
                </p>
                <CallbackForm faqQuestion={faq.question} />
              </div>
            </div>
          ))}
        </div>
        
        {visibleCount < faqs.length && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 20)}
              className="inline-flex items-center text-xs font-black text-[#D69A18] bg-[#FFF8EB] border border-[#F3DBA7] hover:bg-amber-100/60 px-6 py-2.5 rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              Load More FAQs &rarr;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
