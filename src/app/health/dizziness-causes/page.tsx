import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Dizziness & Vertigo: Causes & Warning Signs | QXL Diagnostics",
  description: "Learn common causes of dizziness including vertigo, dehydration, low blood pressure, anaemia, glucose problems and neurological warning signs.",
  alternates: { canonical: `${SITE_URL}/health/dizziness-causes` },
};
export default function DizzinessPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/dizziness-causes", seoTitle: "Dizziness & Vertigo: Causes & Warning Signs | QXL Diagnostics",
      metaDescription: "Learn common causes of dizziness including vertigo, dehydration, low blood pressure, anaemia, glucose problems and neurological warning signs.",
      h1: "Dizziness: Why Do I Feel Dizzy? Causes, Tests and Warning Signs",
      primaryKeyword: "dizziness", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Dizziness is a symptom, not a diagnosis. It may arise from an inner-ear balance disorder, dehydration, low blood pressure, anaemia, glucose abnormalities, medications, migraine, heart rhythm disturbances or neurological disease. The first useful question is not simply 'Why am I dizzy?' but rather 'What exactly do I mean by dizzy?'",
      quickAnswer: "Dizziness can mean vertigo (spinning sensation), light-headedness (feeling faint), disequilibrium (unsteadiness walking) or non-specific head sensations. Each type points to different possible causes.",
      causes: [
        { title: "Inner-Ear / Vestibular Causes (Vertigo)", description: "BPPV (Benign Paroxysmal Positional Vertigo) is the most common cause of true vertigo — brief spinning episodes triggered by head position changes. Other inner-ear causes include vestibular neuritis, labyrinthitis and Ménière disease." },
        { title: "Dehydration", description: "Common clues include thirst, dark urine, dry mouth, reduced urine output and light-headedness on standing. Particularly relevant in hot weather, fever, vomiting or diarrhoea." },
        { title: "Low Blood Pressure (Orthostatic Hypotension)", description: "Dizziness or light-headedness occurring after standing suddenly or prolonged standing. Can be caused by dehydration, blood loss, certain medicines and underlying heart or autonomic conditions." },
        { title: "Anaemia", description: "Low haemoglobin reduces oxygen delivery to the brain. Dizziness may accompany fatigue, breathlessness, palpitations, reduced exercise capacity and pallor." },
        { title: "Blood Glucose Problems", description: "Low glucose (hypoglycaemia) may cause dizziness, sweating, trembling, hunger, weakness and confusion — especially in people taking glucose-lowering medication. High glucose can cause dehydration and fatigue." },
        { title: "Migraine", description: "Vestibular migraine can cause prominent dizziness even when headache is mild or absent. Often underdiagnosed." },
        { title: "Medicines", description: "Blood-pressure medicines, sedatives, anti-anxiety medicines, antidepressants and anti-seizure medicines can all contribute to dizziness, particularly when starting a new medication or after dose changes." },
        { title: "Heart Problems", description: "Dizziness or near-fainting can occasionally result from arrhythmias, very low blood pressure or structural heart disease. Palpitations, chest discomfort or actual fainting significantly increases concern." },
        { title: "Neurological Causes", description: "Less commonly, acute dizziness with other neurological symptoms can arise from stroke, transient ischaemic attack (TIA) or multiple sclerosis. Neurological symptoms change the clinical urgency completely." },
      ],
      redFlags: [
        "New weakness or numbness on one side of the body",
        "Slurred speech or facial drooping",
        "Double vision or sudden loss of vision",
        "Severe new difficulty walking or falls",
        "Sudden severe headache accompanying dizziness",
        "Loss of consciousness or near-fainting",
        "Chest pain or severe palpitations with dizziness",
        "New confusion or altered consciousness",
        "Significant head injury preceding dizziness",
        "New hearing loss with severe continuous vertigo",
      ],
      tests: [
        { name: "CBC", reason: "To identify anaemia as a cause of light-headedness" },
        { name: "Blood Glucose", reason: "To detect hypoglycaemia or significant hyperglycaemia" },
        { name: "HbA1c", reason: "Longer-term glucose assessment when diabetes is suspected" },
        { name: "Electrolytes", reason: "Low sodium or potassium can cause dizziness and weakness" },
        { name: "Kidney Function Tests", reason: "When dehydration, renal disease or metabolic disorder is suspected" },
        { name: "TSH", reason: "Thyroid disorders can occasionally contribute to dizziness and balance issues" },
        { name: "Ferritin / Iron Studies", reason: "When iron deficiency contributing to anaemia is suspected" },
        { name: "Vitamin B12", reason: "B12 deficiency can cause balance problems and neurological symptoms" },
      ],
      faqs: [
        { q: "What is the most common cause of vertigo?", a: "BPPV (Benign Paroxysmal Positional Vertigo) is the most common cause of true vertigo. It causes brief spinning episodes triggered by head position changes and can often be treated with a repositioning manoeuvre." },
        { q: "Can low blood pressure cause dizziness?", a: "Yes. Orthostatic hypotension — a drop in blood pressure on standing — is a common cause of dizziness and light-headedness." },
        { q: "Should I take a blood test for dizziness?", a: "Not necessarily first. Many common dizziness disorders require blood pressure measurement, ear and neurological examination, ECG and positional testing rather than blood tests. Your doctor will decide which investigations are appropriate." },
      ],
      clinicalNote: "QXL Diagnostics provides CBC, blood glucose, electrolytes, thyroid and other laboratory investigations when your doctor recommends testing for dizziness. Home collection available across Bengaluru.",
      relatedTopics: [
        { title: "Headache Causes", url: "/health/headache-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Numbness & Tingling Causes", url: "/health/numbness-tingling-causes" },
        { title: "Shortness of Breath", url: "/health/shortness-of-breath-causes" },
      ],
    }} />
  );
}
