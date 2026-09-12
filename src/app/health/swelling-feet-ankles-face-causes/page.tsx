import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Swelling of Feet, Ankles & Face: Causes & Tests | QXL Diagnostics",
  description: "Swelling or oedema of the feet, ankles, legs or face may be caused by heart, kidney, liver or thyroid disease, venous insufficiency or medications.",
  alternates: { canonical: `${SITE_URL}/health/swelling-feet-ankles-face-causes` },
};
export default function SwellingPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/swelling-feet-ankles-face-causes",
      seoTitle: "Swelling of Feet, Ankles & Face: Causes & Tests | QXL Diagnostics",
      metaDescription: "Swelling or oedema of the feet, ankles, legs or face may be caused by heart, kidney, liver or thyroid disease, venous insufficiency or medications.",
      h1: "Swelling of Feet, Ankles or Face: Why Am I Retaining Fluid?",
      primaryKeyword: "swelling oedema", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Swelling (oedema) occurs when fluid accumulates in body tissues. The location, distribution, timing and associated symptoms help identify the cause. Swelling of both legs, both ankles, the face or the abdomen is often a systemic sign that requires medical investigation.",
      quickAnswer: "Bilateral (both-sided) swelling of legs, ankles or the face is often caused by heart failure, kidney disease, liver disease, hypothyroidism or hypoalbuminaemia. A single swollen limb may indicate a clot (DVT) or local infection. Medications can also cause fluid retention.",
      causes: [
        { title: "Heart Failure", description: "Heart failure causes fluid retention through reduced cardiac output, leading to leg and ankle oedema (pitting), breathlessness on exertion or lying flat, fatigue and reduced exercise tolerance. NT-proBNP is an important biomarker." },
        { title: "Kidney Disease (Nephrotic Syndrome, CKD)", description: "Kidney disease causes oedema through multiple mechanisms: low albumin in nephrotic syndrome leads to generalised oedema (legs, face, abdomen); chronic kidney disease causes fluid retention through impaired excretion. Urine protein and kidney function tests are key." },
        { title: "Liver Disease", description: "Advanced liver disease leads to low albumin production, portal hypertension and ascites (abdominal fluid). Leg oedema, abdominal swelling, jaundice and altered consciousness may occur." },
        { title: "Hypothyroidism", description: "Severe hypothyroidism causes a non-pitting swelling (myxoedema) affecting the face, legs and skin. Associated with fatigue, cold intolerance, weight gain, constipation and dry skin. TSH is the key test." },
        { title: "Deep Vein Thrombosis (DVT)", description: "Blood clot in a leg vein causes unilateral (one-sided) leg swelling, warmth, redness and tenderness. DVT is a serious condition as the clot can travel to the lung (pulmonary embolism). Requires urgent evaluation." },
        { title: "Venous Insufficiency", description: "Chronic poor venous drainage in the legs causes dependent oedema worsening through the day, varicose veins, skin changes and ulcers. Common with prolonged standing, obesity and previous DVT." },
        { title: "Malnutrition & Hypoalbuminaemia", description: "Very low protein intake or protein loss causes low serum albumin, resulting in oedema. Seen with severe malnutrition, chronic illness, malabsorption and nephrotic syndrome." },
        { title: "Medications", description: "Many medications cause fluid retention: amlodipine and other calcium-channel blockers (very common), some NSAIDs, hormones (oestrogen, testosterone), corticosteroids, some diabetes drugs (glitazones) and others." },
        { title: "Pregnancy", description: "Mild ankle and feet swelling is common in pregnancy due to increased blood volume and uterine pressure on pelvic veins. Sudden or severe swelling with headache or high blood pressure may indicate pre-eclampsia — a medical emergency." },
        { title: "Lymphoedema", description: "Impaired lymphatic drainage causes chronic non-pitting swelling. May follow cancer treatment, infection, surgery or be congenital." },
      ],
      redFlags: [
        "🚨 Sudden severe swelling of a single leg with pain and redness — possible DVT/clot",
        "🚨 Swelling with sudden severe breathlessness — possible pulmonary embolism",
        "🚨 Facial swelling with difficulty breathing — allergic emergency (anaphylaxis)",
        "🚨 Severe swelling in pregnancy with headache or high blood pressure — possible pre-eclampsia",
        "Rapidly increasing abdominal swelling (ascites)",
        "Swelling with jaundice (yellow eyes/skin)",
        "Swelling with significantly reduced urine output",
        "Swelling with sudden confusion or altered consciousness",
        "Generalised swelling involving face, abdomen and legs together",
      ],
      tests: [
        { name: "Kidney Function Tests (Urea, Creatinine, eGFR)", reason: "To assess renal cause of oedema" },
        { name: "Urine Routine & Protein:Creatinine Ratio", reason: "Proteinuria is a key feature of nephrotic syndrome" },
        { name: "Serum Albumin", reason: "Low albumin causes oedema from reduced oncotic pressure" },
        { name: "Liver Function Tests", reason: "For suspected liver disease contributing to oedema" },
        { name: "NT-proBNP", reason: "Key biomarker for heart failure — elevated when cardiac cause is suspected" },
        { name: "CBC", reason: "For anaemia, infection, blood disorders" },
        { name: "TSH", reason: "Hypothyroidism causes non-pitting oedema (myxoedema)" },
        { name: "Electrolytes", reason: "Low sodium and other electrolyte abnormalities with oedematous states" },
        { name: "D-Dimer", reason: "For suspected DVT — high sensitivity, low specificity; useful to exclude in low-risk patients" },
      ],
      faqs: [
        { q: "Is leg swelling always a sign of heart failure?", a: "No. Leg swelling has many causes including kidney disease, liver disease, venous insufficiency, medications and hypoalbuminaemia. However, bilateral ankle and leg oedema with breathlessness warrants investigation for heart failure." },
        { q: "What is the difference between pitting and non-pitting oedema?", a: "Pitting oedema leaves a temporary pit when pressed — common with heart failure, kidney disease, venous insufficiency and hypoalbuminaemia. Non-pitting oedema does not pit — seen with hypothyroidism (myxoedema) and lymphoedema." },
        { q: "Can my blood pressure medication cause swelling?", a: "Yes. Amlodipine and other dihydropyridine calcium-channel blockers commonly cause ankle and leg swelling as a side effect. Discuss with your doctor before stopping the medication." },
      ],
      clinicalNote: "QXL Diagnostics provides kidney function, urine protein, serum albumin, liver function, NT-proBNP, TSH and electrolyte testing with home collection across Bengaluru.",
      relatedTopics: [
        { title: "Shortness of Breath Causes", url: "/health/shortness-of-breath-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Frequent Urination & Excessive Thirst", url: "/health/frequent-urination-excessive-thirst-causes" },
        { title: "Unexplained Weight Loss", url: "/health/unexplained-weight-loss" },
      ],
    }} />
  );
}
