import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Chest Pain: Causes & Emergency Warning Signs | QXL Diagnostics",
  description: "Chest pain may arise from the heart, lungs, food pipe, muscles or anxiety. Learn patterns, emergency warning signs and tests doctors may use.",
  alternates: { canonical: `${SITE_URL}/health/chest-pain-causes` },
};
export default function ChestPainPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/chest-pain-causes", seoTitle: "Chest Pain: Causes & Emergency Warning Signs | QXL Diagnostics",
      metaDescription: "Chest pain may arise from the heart, lungs, food pipe, muscles or anxiety. Learn patterns, emergency warning signs and tests doctors may use.",
      h1: "Chest Pain: Why Does My Chest Hurt? Causes, Tests and Emergency Warning Signs",
      primaryKeyword: "chest pain", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Chest pain is a symptom, not a diagnosis. It may arise from the heart, acid reflux, chest-wall muscles, lungs or anxiety. The first priority is to identify whether the pattern could represent an emergency — not to decide at home whether the pain is 'gas' or 'heart pain'.",
      quickAnswer: "Chest pain can come from the heart, lungs, digestive tract, chest-wall muscles or anxiety. New, severe or exertion-related chest pain, especially with breathlessness, sweating or radiation to the arm or jaw, is a medical emergency.",
      causes: [
        { title: "Coronary Artery Disease & Angina", description: "Chest discomfort caused by reduced blood flow to the heart may occur during physical exertion, emotional stress, climbing stairs or walking uphill. Possible associated symptoms: breathlessness, sweating, nausea and radiation to the arm, shoulder, jaw or back." },
        { title: "Acute Coronary Syndrome / Heart Attack", description: "A heart attack may present as new chest pressure, persistent heaviness, tightness, burning or discomfort with breathlessness, sweating, nausea or sudden unexplained weakness. Not every heart attack produces dramatic crushing pain." },
        { title: "Acid Reflux / GERD", description: "Gastro-oesophageal reflux causes burning behind the breastbone, sour taste, symptoms after meals and worse symptoms when lying down. However, reflux and heart pain can overlap. Never assume new chest pain is acidity without appropriate assessment." },
        { title: "Musculoskeletal Chest Pain", description: "Muscle strain, costochondritis, rib injury, poor posture and exercise-related strain cause chest pain that may worsen with movement, deep breathing or pressing the affected area." },
        { title: "Lung & Pleural Causes", description: "Chest pain may arise from pneumonia, pleurisy, pneumothorax, pulmonary embolism and other pulmonary disorders. Pain often worsens during breathing." },
        { title: "Anxiety & Panic", description: "Anxiety may cause chest tightness, palpitations, rapid breathing, tingling, dizziness and a sense of impending danger. However, anxiety should not be diagnosed until important physical causes have been reasonably considered." },
        { title: "Pericarditis", description: "Inflammation of the sac surrounding the heart causes sharp chest pain, often improved by leaning forward and worsened by lying flat. May follow a viral illness." },
      ],
      redFlags: [
        "🚨 New, severe or persistent chest pain — call emergency services immediately",
        "🚨 Chest pain triggered by exertion or that occurs at rest",
        "🚨 Chest pain with breathlessness, sweating or fainting",
        "🚨 Chest pain radiating to the arm, jaw, shoulder or back",
        "🚨 Chest pain with nausea or vomiting",
        "🚨 Chest pain with sudden severe weakness",
        "🚨 Chest pain with coughing blood",
        "🚨 Sudden severe breathlessness with chest pain",
        "🚨 Chest pain with neurological symptoms (weakness, confusion, slurred speech)",
        "🚨 Do NOT wait for a blood-test appointment if a heart attack is suspected",
      ],
      tests: [
        { name: "High-Sensitivity Cardiac Troponin", reason: "Key biomarker for myocardial injury — used in emergency evaluation of possible heart attack. Repeat testing is often needed." },
        { name: "ECG (Electrocardiogram)", reason: "First-line investigation for suspected cardiac cause — not a laboratory blood test but essential" },
        { name: "CBC", reason: "Anaemia can contribute to chest symptoms; infection markers" },
        { name: "Blood Glucose / HbA1c", reason: "Diabetes is a major cardiovascular risk factor" },
        { name: "Lipid Profile", reason: "Cholesterol assessment for cardiovascular risk evaluation" },
        { name: "Kidney Function Tests", reason: "For overall cardiovascular risk and medication safety" },
        { name: "D-Dimer", reason: "Only in appropriately selected patients based on clinical probability of pulmonary embolism — not a routine test" },
        { name: "CRP / ESR", reason: "For inflammatory causes (pericarditis, myocarditis)" },
      ],
      faqs: [
        { q: "How do I know if chest pain is a heart attack?", a: "You cannot reliably distinguish heart attack from other causes at home. New, severe or exertion-related chest pain — especially with breathlessness, sweating or arm/jaw radiation — requires emergency evaluation. Do not self-diagnose." },
        { q: "Can a normal ECG rule out a heart attack?", a: "No. A single normal ECG or a single early troponin result does not always exclude acute coronary syndrome. Clinical timing and repeat assessment matter." },
        { q: "Can gas or acidity cause chest pain?", a: "Yes. Acid reflux (GERD) and oesophageal spasm can cause significant chest pain. However, these should only be concluded after cardiac causes have been appropriately assessed." },
        { q: "Is left-sided chest pain always from the heart?", a: "No. The location alone does not determine the cause. Musculoskeletal pain, lung problems and digestive issues can all cause left-sided chest pain." },
      ],
      clinicalNote: "Chest pain cannot be evaluated adequately with blood tests alone. If your doctor recommends cardiac markers, lipid profile, blood glucose or inflammatory tests, QXL Diagnostics provides NABL-accredited testing with home collection across Bengaluru.",
      relatedTopics: [
        { title: "Shortness of Breath: Why Am I Breathless?", url: "/health/shortness-of-breath-causes" },
        { title: "Dizziness Causes", url: "/health/dizziness-causes" },
        { title: "Nausea & Vomiting", url: "/health/nausea-vomiting-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
      ],
    }} />
  );
}
