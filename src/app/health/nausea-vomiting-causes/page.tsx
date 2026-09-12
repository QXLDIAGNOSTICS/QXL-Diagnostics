import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Nausea & Vomiting: Causes & Warning Signs | QXL Diagnostics",
  description: "Nausea and vomiting may be caused by infection, food poisoning, pregnancy, migraine, medicines, gallbladder disease, pancreatitis or metabolic disorders.",
  alternates: { canonical: `${SITE_URL}/health/nausea-vomiting-causes` },
};
export default function NauseaVomitingPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/nausea-vomiting-causes",
      seoTitle: "Nausea & Vomiting: Causes & Warning Signs | QXL Diagnostics",
      metaDescription: "Nausea and vomiting may be caused by infection, food poisoning, pregnancy, migraine, medicines, gallbladder disease, pancreatitis or metabolic disorders.",
      h1: "Nausea & Vomiting: Why Do I Feel Sick or Keep Vomiting?",
      primaryKeyword: "nausea and vomiting", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Nausea and vomiting are symptoms that can arise from many different causes — from the very common (viral gastroenteritis, food poisoning, pregnancy) to the serious (pancreatitis, bowel obstruction, metabolic emergencies). Duration, severity, associated symptoms and context are all important.",
      quickAnswer: "Nausea and vomiting commonly result from viral gastroenteritis, food poisoning, pregnancy or medications. When vomiting is persistent, associated with blood, severe pain or dehydration, medical evaluation is needed.",
      causes: [
        { title: "Viral Gastroenteritis", description: "The most common cause of acute nausea and vomiting, usually with diarrhoea. Caused by norovirus, rotavirus and other viruses. Typically self-limiting within 1–3 days. Oral rehydration is the key treatment." },
        { title: "Food Poisoning", description: "Contaminated food or water causes vomiting (sometimes with diarrhoea and fever) within hours to days of consumption. Common bacteria: Salmonella, Staphylococcus, Campylobacter, Bacillus cereus." },
        { title: "Pregnancy (Morning Sickness)", description: "Nausea and vomiting are extremely common in the first trimester of pregnancy. Severe persistent vomiting (hyperemesis gravidarum) may require medical treatment and hospitalisation." },
        { title: "Medications & Drugs", description: "Many medicines can cause nausea: antibiotics, NSAIDs, opioids, iron supplements, cancer chemotherapy, certain antibiotics and metformin. Alcohol excess is another common cause." },
        { title: "Migraine", description: "Nausea and vomiting are prominent features of migraine attacks, often alongside severe headache, sensitivity to light and sound and visual aura." },
        { title: "Gallbladder Disease", description: "Biliary colic causes sudden right upper abdominal pain with nausea and vomiting, often after fatty meals. Cholecystitis adds fever and persistent pain." },
        { title: "Pancreatitis", description: "Severe upper abdominal pain radiating to the back with nausea and vomiting. May be caused by gallstones or alcohol." },
        { title: "Gastrointestinal Obstruction", description: "Bowel obstruction causes persistent vomiting (often bilious or faeculent), abdominal distension and inability to pass stool. A surgical emergency." },
        { title: "Motion Sickness / Vestibular Disorders", description: "Inner-ear disorders and motion sickness cause nausea through balance-system stimulation. BPPV and labyrinthitis may present with prominent nausea." },
        { title: "Metabolic Causes (DKA, Uraemia)", description: "Diabetic ketoacidosis (DKA) can present with nausea, vomiting, abdominal pain and altered consciousness. Uraemia from kidney failure also causes persistent nausea. These are medical emergencies." },
      ],
      redFlags: [
        "🚨 Vomiting blood (haematemesis) or coffee-ground material",
        "🚨 Vomiting with severe abdominal pain — possible surgical emergency",
        "🚨 Vomiting with severe headache and neck stiffness (possible meningitis)",
        "🚨 Persistent vomiting causing inability to keep any fluids down",
        "🚨 Signs of dehydration: sunken eyes, dry mouth, reduced urine, extreme weakness",
        "🚨 Vomiting with confusion or altered consciousness",
        "🚨 Vomiting with suspected bowel obstruction: distension, no stool, bilious vomiting",
        "🚨 Persistent vomiting during pregnancy (hyperemesis gravidarum)",
        "Vomiting with significant unexplained weight loss over weeks",
      ],
      tests: [
        { name: "Blood Glucose", reason: "To exclude hypoglycaemia or DKA in diabetics" },
        { name: "Ketones / Urine Ketones", reason: "For suspected DKA" },
        { name: "Electrolytes", reason: "Vomiting causes loss of sodium, potassium and chloride — important to assess" },
        { name: "Kidney Function Tests", reason: "To assess dehydration severity and exclude uraemia" },
        { name: "Liver Function Tests", reason: "For biliary, hepatic or pancreatic causes" },
        { name: "Amylase / Lipase", reason: "For suspected pancreatitis" },
        { name: "CBC", reason: "For infection markers, anaemia" },
        { name: "Pregnancy Test (urine/serum HCG)", reason: "In women of reproductive age — always important to consider" },
        { name: "Urine Routine", reason: "For UTI or ketones" },
      ],
      faqs: [
        { q: "When does vomiting need a doctor?", a: "Seek medical attention if vomiting is persistent, associated with blood, severe pain or dehydration (very little urine, extreme thirst, dizziness on standing), occurs with severe headache or neck stiffness, or you cannot keep any fluids down." },
        { q: "Can anxiety cause nausea?", a: "Yes. Anxiety and stress can cause nausea through the gut-brain connection. However, persistent nausea should be medically evaluated to exclude physical causes." },
        { q: "Is morning nausea always pregnancy?", a: "Not always, though pregnancy is an important cause in women of reproductive age. Morning nausea can also occur with acid reflux, anxiety, certain medications or vestibular disorders." },
      ],
      clinicalNote: "When your doctor recommends investigations for nausea and vomiting, QXL Diagnostics provides electrolytes, blood glucose, liver and kidney function tests, amylase and other tests with home collection across Bengaluru.",
      relatedTopics: [
        { title: "Stomach Pain Causes", url: "/health/stomach-abdominal-pain-causes" },
        { title: "Diarrhoea Causes", url: "/health/diarrhoea-loose-motion-causes" },
        { title: "Headache Causes", url: "/health/headache-causes" },
        { title: "Dizziness Causes", url: "/health/dizziness-causes" },
      ],
    }} />
  );
}
