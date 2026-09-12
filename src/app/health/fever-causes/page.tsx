import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";

export const metadata: Metadata = {
  title: "Fever Causes, Symptoms & Tests | QXL Diagnostics",
  description: "Learn common causes of fever, associated symptoms, warning signs and when tests such as CBC, CRP or infection-specific investigations may be considered.",
  alternates: { canonical: `${SITE_URL}/health/fever-causes` },
};

export default function FeverPage() {
  return (
    <SymptomPageLayout
      data={{
        url: "/health/fever-causes",
        seoTitle: "Fever Causes, Symptoms & Tests | QXL Diagnostics",
        metaDescription: "Learn common causes of fever, associated symptoms, warning signs and when tests such as CBC, CRP or infection-specific investigations may be considered.",
        h1: "Fever: Causes, Warning Signs and When Tests May Be Needed",
        primaryKeyword: "fever",
        lastReviewed: "2026-09-11",
        reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
        parentHub: "/health/symptoms-causes",
        intro: "Fever is one of the most common health symptoms and one of the body's natural responses to infection or inflammation. In many people, fever is caused by a short-lived viral infection and settles within a few days. However, persistent, recurrent or unexplained fever may sometimes be associated with bacterial infections, mosquito-borne illnesses, urinary or respiratory infections, inflammatory diseases, medicines or, less commonly, other medical conditions.",
        quickAnswer: "Fever is usually caused by viral infections, bacterial infections or inflammatory conditions. Duration, associated symptoms and patient history are far more informative than the temperature reading alone.",
        causes: [
          { title: "Viral Infections", description: "Viral illnesses are among the most common causes of short-duration fever. Examples include viral upper respiratory infections, influenza, COVID-19, dengue, chikungunya, viral hepatitis and seasonal viral illnesses. Fever may occur with body pain, headache, tiredness, sore throat, cough and runny nose." },
          { title: "Respiratory Infections", description: "Fever associated with cough or breathing symptoms may occur with viral respiratory infection, influenza, tonsillitis, pharyngitis, sinusitis, bronchitis, pneumonia, tuberculosis or lung abscess. Fever with significant breathlessness or chest pain requires medical evaluation." },
          { title: "Urinary Tract & Kidney Infections", description: "Urinary infections can cause fever, particularly when infection involves the kidneys (pyelonephritis). Symptoms may include burning urination, frequent urination, lower abdominal discomfort, back or flank pain." },
          { title: "Dengue, Chikungunya & Malaria", description: "Mosquito-borne diseases are important causes of fever in India. Dengue may present with high fever, severe body pain, headache, pain behind the eyes, nausea and rash. Chikungunya causes fever with prominent joint pain. Malaria produces cyclical fever with chills, rigors, sweating and weakness." },
          { title: "Typhoid & Bacterial Infections", description: "Enteric/typhoid fever, staphylococcal, streptococcal, E. coli infections, brucellosis, leptospirosis, rickettsial infections, mycoplasma infections and tuberculosis can all cause fever. Clinical history and exposure details help guide investigation." },
          { title: "Tuberculosis", description: "TB is an important consideration in prolonged or unexplained fever. It may involve lungs, lymph nodes, abdomen, bones, kidneys, brain or other organs. Associated symptoms include persistent cough, weight loss, night sweats and tiredness." },
          { title: "Autoimmune & Inflammatory Disorders", description: "Fever can occasionally result from non-infectious conditions including rheumatoid arthritis, systemic lupus erythematosus, vasculitis, inflammatory bowel disease, sarcoidosis and other systemic inflammatory disorders." },
          { title: "Bloodstream Infection & Sepsis", description: "Severe bacterial infections can spread into the bloodstream and produce sepsis. Warning signs include very high or very low temperature, rapid breathing, low blood pressure, confusion, extreme weakness and reduced urine output. Sepsis is a medical emergency." },
          { title: "Drug-Induced Fever", description: "Some medicines may occasionally produce fever. Drug fever may be considered when fever begins after starting a new medicine and no convincing infectious or inflammatory explanation is identified. Never stop a prescribed medicine without medical advice." },
        ],
        redFlags: [
          "Fever persisting for more than a few days without obvious explanation",
          "Fever with severe difficulty breathing or falling oxygen saturation",
          "Fever with altered consciousness, severe confusion or seizures",
          "Fever with neck stiffness (possible meningitis)",
          "Fever with unusual bleeding or widespread rash",
          "Fever with severe abdominal pain or persistent vomiting",
          "Fever in a very young infant, elderly patient or immunocompromised person",
          "Fever during pregnancy or during chemotherapy",
          "Fever with signs of sepsis: low blood pressure, rapid breathing, extreme weakness, reduced urine output",
        ],
        tests: [
          { name: "CBC (Complete Blood Count)", reason: "Provides information about white blood cell count, haemoglobin and platelets — supports clinical assessment" },
          { name: "CRP (C-Reactive Protein)", reason: "Marker of inflammation or infection; helps assess severity" },
          { name: "ESR", reason: "Elevated in inflammatory and infectious conditions" },
          { name: "Peripheral Blood Smear", reason: "For suspected malaria or morphological abnormalities" },
          { name: "Liver Function Tests (LFT)", reason: "When liver involvement, hepatitis or jaundice is suspected" },
          { name: "Kidney Function Tests (KFT)", reason: "When renal involvement, dehydration or systemic illness is suspected" },
          { name: "Urine Routine Examination", reason: "To identify urinary tract infection" },
          { name: "Dengue Testing", reason: "When dengue is suspected clinically — test selection depends on day of illness" },
          { name: "Malaria Testing", reason: "When fever occurs with chills, rigors, sweating and relevant exposure" },
          { name: "Typhoid / Enteric Fever Investigations", reason: "When enteric fever is clinically suspected" },
          { name: "Blood Culture", reason: "When bloodstream infection or sepsis is suspected" },
          { name: "Urine Culture", reason: "When urinary infection is suspected, especially with fever and urinary symptoms" },
        ],
        faqs: [
          { q: "Is fever itself a disease?", a: "No. Fever is a symptom and physiological response that can occur with many different illnesses — not a diagnosis in itself." },
          { q: "Does high fever always mean bacterial infection?", a: "No. Viral infections can also produce high fever, while some significant bacterial infections may initially cause only modest temperature elevation." },
          { q: "Can dengue cause fever and low platelets?", a: "Yes. Platelet counts can decrease during dengue infection, but platelet count alone should not be used to determine the severity of dengue." },
          { q: "Can tuberculosis cause prolonged fever?", a: "Yes. TB should be considered among the possible causes of persistent fever, especially when accompanied by prolonged cough, weight loss, night sweats or reduced appetite." },
          { q: "Should everyone with fever undergo the same tests?", a: "No. Investigation should be based on the patient's symptoms, duration of fever, clinical assessment and likely causes. Testing should be targeted rather than ordering everything automatically." },
        ],
        clinicalNote: "QXL Diagnostics provides laboratory investigations that may assist doctors in evaluating fever when clinically indicated, including routine haematology, biochemistry, inflammatory markers, microbiology and selected infectious disease testing. Laboratory tests support clinical diagnosis — they do not replace consultation with a qualified healthcare professional.",
        relatedTopics: [
          { title: "Body Pain & Muscle Aches: Why Does My Whole Body Hurt?", url: "/health/body-pain-muscle-aches-causes" },
          { title: "Skin Rash & Itching: Why Is My Skin Itchy?", url: "/health/skin-rash-itching-causes" },
          { title: "Recurrent Infections: Why Do I Keep Getting Sick?", url: "/health/recurrent-infections-causes" },
          { title: "Headache Causes", url: "/health/headache-causes" },
        ],
      }}
    />
  );
}
