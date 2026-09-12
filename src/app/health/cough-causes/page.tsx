import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";

export const metadata: Metadata = {
  title: "Cough Causes, Types & Warning Signs | QXL Diagnostics",
  description: "Learn causes of dry, wet, persistent and chronic cough, warning signs and when chest imaging or selected laboratory tests may be considered.",
  alternates: { canonical: `${SITE_URL}/health/cough-causes` },
};

export default function CoughPage() {
  return (
    <SymptomPageLayout
      data={{
        url: "/health/cough-causes",
        seoTitle: "Cough Causes, Types & Warning Signs | QXL Diagnostics",
        metaDescription: "Learn causes of dry, wet, persistent and chronic cough, warning signs and when chest imaging or selected laboratory tests may be considered.",
        h1: "Cough: Causes, Types, Tests and Warning Signs",
        primaryKeyword: "cough",
        lastReviewed: "2026-09-11",
        reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
        parentHub: "/health/symptoms-causes",
        intro: "Cough is one of the most common reasons people seek medical attention. Most coughs are caused by viral upper respiratory infections and resolve within 1–2 weeks. However, a cough that persists for more than 3 weeks, produces blood, or is associated with breathlessness, fever or weight loss may need further evaluation.",
        quickAnswer: "A cough can be caused by viral infection, post-nasal drip, asthma, acid reflux, environmental irritants, or medications. A persistent cough lasting more than 3 weeks, or one associated with blood, breathlessness or fever, requires medical assessment.",
        causes: [
          { title: "Viral Upper Respiratory Infection", description: "The most common cause of acute cough. Usually accompanied by runny nose, sore throat, mild fever and tiredness. Typically resolves within 1–2 weeks without antibiotics." },
          { title: "Post-Nasal Drip / Sinusitis", description: "Mucus dripping from the back of the nose into the throat causes a chronic cough, often worse at night or on waking. Associated with nasal congestion, throat clearing and sneezing." },
          { title: "Asthma", description: "Cough-variant asthma may present primarily as a persistent dry cough without obvious wheezing. Cough is often worse at night, with exercise, or with cold air or allergen exposure." },
          { title: "Acid Reflux (GERD)", description: "Stomach acid reaching the throat can trigger a chronic cough, often worse after meals or when lying down. May occur without heartburn." },
          { title: "Influenza", description: "Influenza causes a prominent, often dry cough associated with high fever, severe body pain, headache and rapid onset of illness." },
          { title: "COVID-19", description: "COVID-19 commonly presents with cough, fever, fatigue and breathlessness. Cough may be persistent even after the acute illness resolves." },
          { title: "Pneumonia", description: "Pneumonia typically presents with cough (often productive), fever, breathlessness and chest pain. Bacterial pneumonia may require antibiotic treatment." },
          { title: "Tuberculosis", description: "A cough persisting for more than 2–3 weeks in the Indian context warrants consideration of TB, particularly with night sweats, weight loss, fever or haemoptysis." },
          { title: "Medicines (ACE Inhibitors)", description: "A dry persistent cough is a well-known side effect of ACE inhibitor blood pressure medications. This typically begins weeks to months after starting the drug." },
          { title: "Environmental Irritants", description: "Cigarette smoke, air pollution, dust, chemical fumes, mould and occupational exposures can cause or worsen chronic cough." },
          { title: "Pertussis (Whooping Cough)", description: "Causes prolonged, paroxysmal coughing spells that may be followed by a characteristic 'whoop'. Can affect unvaccinated or partially vaccinated individuals." },
        ],
        redFlags: [
          "Coughing up blood (haemoptysis) — always requires prompt medical evaluation",
          "Persistent cough lasting more than 3 weeks without obvious explanation",
          "Cough with significant breathlessness, falling oxygen levels or rapid breathing",
          "Cough with high fever not settling within a few days",
          "Cough with significant weight loss, night sweats or persistent fatigue",
          "Cough with severe chest pain",
          "Cough with sudden onset of breathlessness (possible pneumothorax or pulmonary embolism)",
          "New cough in a smoker over 40 or a person with a history of malignancy",
        ],
        tests: [
          { name: "CBC", reason: "To look for signs of infection, anaemia or blood disorders" },
          { name: "CRP / ESR", reason: "Inflammatory markers to assess severity and guide treatment" },
          { name: "Sputum for AFB / Culture", reason: "When tuberculosis is clinically suspected" },
          { name: "Chest X-Ray", reason: "To identify pneumonia, TB, pleural effusion or other chest pathology (imaging, not a lab test)" },
          { name: "Tuberculosis Investigations (CB-NAAT, IGRA)", reason: "For confirmed or highly suspected TB based on clinical pattern" },
          { name: "Spirometry / Peak Flow", reason: "For suspected asthma or COPD (non-laboratory test)" },
          { name: "Allergy Testing (Total IgE, specific IgE)", reason: "When allergic asthma or allergic rhinitis is suspected" },
          { name: "COVID-19 PCR / Antigen", reason: "When COVID-19 is clinically suspected" },
        ],
        faqs: [
          { q: "How long is too long for a cough?", a: "A cough persisting more than 3 weeks without a clear cause warrants medical evaluation. This is especially important with blood in sputum, significant weight loss or breathing difficulty." },
          { q: "Can acid reflux cause chronic cough?", a: "Yes. GERD-related cough can be persistent and dry, and may occur without obvious heartburn." },
          { q: "Can my blood pressure medication cause a cough?", a: "Yes. ACE inhibitor medications (commonly prescribed for hypertension and heart disease) cause a dry persistent cough in a proportion of patients. Discuss alternatives with your prescribing doctor." },
          { q: "Does a cough always need antibiotics?", a: "No. Most acute coughs are caused by viral infections and do not respond to antibiotics. Antibiotics are appropriate only when a bacterial infection is identified or strongly suspected." },
        ],
        clinicalNote: "When your doctor recommends investigations for a persistent cough, QXL Diagnostics provides CBC, inflammatory markers, allergy testing and selected microbiology investigations with home sample collection across Bengaluru.",
        relatedTopics: [
          { title: "Fever: Causes & Warning Signs", url: "/health/fever-causes" },
          { title: "Shortness of Breath: Why Am I Breathless?", url: "/health/shortness-of-breath-causes" },
          { title: "Recurrent Infections: Why Do I Keep Getting Sick?", url: "/health/recurrent-infections-causes" },
          { title: "Chest Pain: Causes & Emergency Warning Signs", url: "/health/chest-pain-causes" },
        ],
      }}
    />
  );
}
