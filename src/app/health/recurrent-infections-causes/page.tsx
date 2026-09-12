import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Recurrent Infections: Why Do I Keep Getting Sick? | QXL Diagnostics",
  description: "Getting infections repeatedly may signal diabetes, immune deficiency, nutritional deficiency, chronic disease or structural problems. Learn tests and warning signs.",
  alternates: { canonical: `${SITE_URL}/health/recurrent-infections-causes` },
};
export default function RecurrentInfectionsPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/recurrent-infections-causes",
      seoTitle: "Recurrent Infections: Why Do I Keep Getting Sick? | QXL Diagnostics",
      metaDescription: "Getting infections repeatedly may signal diabetes, immune deficiency, nutritional deficiency, chronic disease or structural problems. Learn tests and warning signs.",
      h1: "Recurrent Infections: Why Do I Keep Getting Sick?",
      primaryKeyword: "recurrent infections", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Getting repeated infections — frequent colds, UTIs, skin infections, chest infections, or other recurring illnesses — may have a specific identifiable cause, particularly if infections are unusually frequent, severe, prolonged or fail to respond to standard treatment.",
      quickAnswer: "Common medical causes of recurrent infections include undiagnosed or poorly controlled diabetes, nutritional deficiencies, medications that suppress immunity, and structural problems. Less commonly, primary immune deficiency or haematological disease may be responsible.",
      causes: [
        { title: "Undiagnosed or Poorly Controlled Diabetes", description: "Diabetes impairs white blood cell function, impairs blood flow, damages nerves (masking early warning signs) and creates a high-glucose environment in tissues that encourages bacterial and fungal growth. Recurrent UTIs, skin infections, fungal infections and slow-healing wounds are classic. HbA1c and fasting glucose are the key tests." },
        { title: "Nutritional Deficiencies", description: "Immune function requires adequate protein, Vitamin C, Vitamin D, Vitamin B12, zinc, iron and selenium. Deficiencies — particularly Vitamin D and iron deficiency in the Indian context — can impair immune responses. Nutritional assessment matters particularly in those eating very restricted diets or with malabsorption." },
        { title: "Immunosuppressive Medications", description: "Corticosteroids, disease-modifying antirheumatic drugs (DMARDs), biologics for autoimmune diseases, chemotherapy and other immunosuppressants significantly increase infection risk. This is expected in many cases but the pattern should be monitored." },
        { title: "HIV", description: "HIV progressively impairs cellular immunity. Recurrent or unusual infections — including opportunistic infections — may be the first clinical presentation. HIV testing is appropriate when recurrent or atypical infections occur without other explanation." },
        { title: "Structural or Anatomical Problems", description: "Structural issues predispose to localised recurrent infections: recurrent UTIs with structural urinary tract abnormality or kidney stones; recurrent chest infections with bronchiectasis or foreign body; recurrent sinus infections with anatomical obstruction." },
        { title: "Chronic Kidney or Liver Disease", description: "Both conditions impair immune defences. Chronic kidney disease patients, particularly those on dialysis, have increased infection risk. Advanced liver disease is associated with impaired complement and opsonisation." },
        { title: "Primary Immune Deficiency", description: "Though rare, congenital or primary immune deficiencies should be considered when recurrent infections are unusually frequent, severe, from unusual organisms or begin in infancy or early childhood. Immunoglobulin levels (IgG, IgA, IgM) and other specialist tests may be useful." },
        { title: "Haematological Conditions", description: "Some blood disorders, particularly lymphoma, leukaemia and myeloma, and treatment-related complications can impair immune function and increase infection susceptibility." },
        { title: "Stress & Lifestyle Factors", description: "Chronic stress, sleep deprivation, extreme physical activity, very poor nutrition and heavy alcohol use can modestly impair immune responses. However, when infections are recurrent and significant, medical causes should not be dismissed as 'just stress'." },
        { title: "Anatomical Skin Barrier Problems", description: "Eczema and psoriasis damage the skin barrier, making recurrent bacterial skin infections (particularly Staphylococcal) more likely. Recurrent cellulitis may follow lymphoedema or venous insufficiency." },
      ],
      redFlags: [
        "Infections with unusual organisms not typically pathogenic in healthy individuals",
        "Infections in sites uncommonly affected (brain, bone, deep tissue) without obvious cause",
        "Infections that recur despite completing appropriate treatment",
        "Very prolonged recovery from ordinary infections",
        "Recurrent infections with significant weight loss, night sweats or enlarged lymph nodes",
        "Family history of similar severe recurrent infections or immune deficiency",
        "Recurrent infections developing after starting new immunosuppressive medication",
        "Recurrent infections with new abnormal blood count (very low white cells, high lymphocytes)",
      ],
      tests: [
        { name: "Fasting Blood Glucose / HbA1c", reason: "Diabetes is the most common identifiable medical cause of recurrent infections" },
        { name: "CBC with Differential", reason: "To assess neutrophil count, lymphocyte count and overall white cell picture" },
        { name: "Immunoglobulins (IgG, IgA, IgM)", reason: "For suspected primary immune deficiency or myeloma" },
        { name: "Serum Protein Electrophoresis", reason: "When myeloma or hypogammaglobulinaemia is suspected" },
        { name: "HIV Testing", reason: "When recurrent or unusual infections occur without other explanation" },
        { name: "Serum Vitamin D (25-OH)", reason: "Vitamin D deficiency is common and may modestly affect immune function" },
        { name: "Serum Vitamin B12 / Folate", reason: "Deficiency can cause neutrophil hypersegmentation and impaired white cell function" },
        { name: "Serum Iron / Ferritin", reason: "Iron deficiency impairs immune cell function" },
        { name: "Kidney & Liver Function Tests", reason: "Chronic organ disease reduces immune competence" },
        { name: "Urine Culture", reason: "When recurrent UTI is the pattern of infection" },
      ],
      faqs: [
        { q: "Why do some people get infections more easily than others?", a: "Immune defence varies by genetic factors, age, nutritional status, underlying medical conditions (especially diabetes), medications and lifestyle. A medical evaluation can identify modifiable causes." },
        { q: "Can Vitamin D deficiency make you more prone to infections?", a: "Vitamin D plays a role in immune function, and deficiency has been associated with increased susceptibility to respiratory infections in some studies. However, correcting deficiency is only part of the picture — other causes must be excluded." },
        { q: "When should I be investigated for immune deficiency?", a: "If you are getting unusually frequent, severe or prolonged infections, infections with uncommon organisms, or recurrent infections despite treatment — a medical evaluation is appropriate." },
      ],
      clinicalNote: "QXL Diagnostics provides HbA1c, CBC, immunoglobulins, HIV testing, Vitamin D, iron studies and other investigations with home sample collection across Bengaluru.",
      relatedTopics: [
        { title: "Fever Causes", url: "/health/fever-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Unexplained Weight Loss", url: "/health/unexplained-weight-loss" },
        { title: "Skin Rash & Itching", url: "/health/skin-rash-itching-causes" },
      ],
    }} />
  );
}
