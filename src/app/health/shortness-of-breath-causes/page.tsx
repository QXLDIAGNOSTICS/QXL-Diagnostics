import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Shortness of Breath: Causes & Warning Signs | QXL Diagnostics",
  description: "Breathlessness may be caused by asthma, anaemia, heart disease, lung infection, COPD, pulmonary disease or anxiety. Learn tests and emergency warning signs.",
  alternates: { canonical: `${SITE_URL}/health/shortness-of-breath-causes` },
};
export default function BreathlessnessPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/shortness-of-breath-causes",
      seoTitle: "Shortness of Breath: Causes & Warning Signs | QXL Diagnostics",
      metaDescription: "Breathlessness may be caused by asthma, anaemia, heart disease, lung infection, COPD, pulmonary disease or anxiety. Learn tests and emergency warning signs.",
      h1: "Shortness of Breath: Why Am I Breathless? Causes, Tests and Warning Signs",
      primaryKeyword: "shortness of breath", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Shortness of breath (dyspnoea) is the uncomfortable awareness of breathing. It can range from mild exertional breathlessness to severe breathlessness at rest. Sudden or severe breathlessness, or breathlessness with chest pain, is a medical emergency.",
      quickAnswer: "Common causes of breathlessness include asthma, anaemia, heart failure, lung infection, COPD, pulmonary disease and anxiety. Sudden severe breathlessness or breathlessness with chest pain or low oxygen levels requires immediate medical attention.",
      causes: [
        { title: "Asthma", description: "Causes episodic breathlessness, wheeze and chest tightness, often triggered by exercise, allergens, cold air or respiratory infections. Typically worse at night or early morning. Often begins in childhood or young adulthood." },
        { title: "Anaemia", description: "Low haemoglobin reduces oxygen-carrying capacity of the blood. Breathlessness on exertion may be accompanied by fatigue, palpitations, dizziness and pallor. CBC and ferritin reveal the diagnosis." },
        { title: "Heart Failure", description: "Breathlessness that is worse on exertion, when lying flat (orthopnoea) or in the early hours (paroxysmal nocturnal dyspnoea). Often accompanied by swollen feet and ankles, reduced exercise tolerance and fatigue." },
        { title: "Pneumonia & Lung Infections", description: "Breathlessness with fever, productive cough and chest pain suggests pneumonia. May also occur with pleuritis, lung abscess or empyema." },
        { title: "COPD (Chronic Obstructive Pulmonary Disease)", description: "Progressive breathlessness, especially in long-term smokers or those with occupational dust exposure. Chronic productive cough and wheeze are typical. Breathlessness worsens over years." },
        { title: "Pulmonary Embolism", description: "Sudden breathlessness, often with pleuritic chest pain and sometimes haemoptysis. A serious, potentially life-threatening condition requiring immediate evaluation." },
        { title: "COVID-19 & Post-COVID", description: "COVID-19 can cause acute breathlessness. Post-COVID breathlessness — persistent after the acute infection — affects a proportion of patients and warrants medical evaluation." },
        { title: "Pleural Effusion", description: "Fluid around the lung can cause breathlessness, particularly on exertion. May result from heart failure, infection, inflammation, malignancy or other causes." },
        { title: "Anxiety & Panic Disorder", description: "Anxiety can cause hyperventilation and the sensation of breathlessness, tingling in the hands or face and a feeling of not getting enough air. However, physical causes must be excluded first." },
        { title: "Thyroid Disease", description: "Both severe hypothyroidism (myxoedema, pleural effusion) and severe hyperthyroidism (heart rate, cardiac output) can cause breathlessness in selected patients." },
      ],
      redFlags: [
        "🚨 Sudden severe breathlessness — call emergency services immediately",
        "🚨 Breathlessness with chest pain or chest tightness",
        "🚨 Breathlessness with confusion or reduced consciousness",
        "🚨 Breathlessness with very low oxygen saturation",
        "🚨 Breathlessness with coughing up blood",
        "🚨 Breathlessness with a very rapid or irregular heartbeat",
        "🚨 Breathlessness with swollen legs and inability to lie flat",
        "🚨 Breathlessness after a period of immobility, long travel or recent surgery (possible clot)",
        "Breathlessness getting steadily worse over weeks without explanation",
      ],
      tests: [
        { name: "CBC", reason: "To identify anaemia as a cause of breathlessness" },
        { name: "CRP / ESR", reason: "Inflammatory markers for infection or inflammatory conditions" },
        { name: "NT-proBNP", reason: "Cardiac biomarker — elevated in heart failure" },
        { name: "High-Sensitivity Cardiac Troponin", reason: "For suspected myocardial involvement" },
        { name: "Kidney & Liver Function Tests", reason: "For systemic causes and medication safety" },
        { name: "Thyroid Profile (TSH, Free T4)", reason: "Thyroid disease can cause breathlessness through cardiac and metabolic effects" },
        { name: "D-Dimer", reason: "In appropriately selected patients with clinically suspected pulmonary embolism" },
        { name: "Arterial Blood Gas", reason: "For acute severe breathlessness — measures oxygen and carbon dioxide levels" },
        { name: "Allergy Testing (IgE)", reason: "When allergic asthma or allergy-driven breathlessness is suspected" },
      ],
      faqs: [
        { q: "When should I go to emergency for breathlessness?", a: "Immediately if breathlessness is sudden, severe, associated with chest pain, low oxygen saturation, confusion or you cannot complete a sentence." },
        { q: "Can anaemia cause shortness of breath?", a: "Yes. Significant anaemia impairs oxygen delivery to tissues, causing breathlessness on exertion. Often accompanied by fatigue, pallor and palpitations." },
        { q: "Can anxiety cause breathlessness?", a: "Yes. Anxiety and panic attacks can cause hyperventilation and the sensation of breathlessness. However, physical causes including asthma, heart disease and anaemia must be excluded before attributing breathlessness to anxiety alone." },
      ],
      clinicalNote: "QXL Diagnostics provides CBC, NT-proBNP, thyroid profile, allergy testing, CRP and other investigations with home collection across Bengaluru when clinically appropriate.",
      relatedTopics: [
        { title: "Chest Pain: Causes & Emergency Warning Signs", url: "/health/chest-pain-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Swelling of Feet, Ankles or Face", url: "/health/swelling-feet-ankles-face-causes" },
        { title: "Dizziness Causes", url: "/health/dizziness-causes" },
      ],
    }} />
  );
}
