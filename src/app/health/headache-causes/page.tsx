import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";

export const metadata: Metadata = {
  title: "Headache Causes, Types & Warning Signs | QXL Diagnostics",
  description: "Learn common headache causes including migraine, tension headache, dehydration and illness, plus warning signs and when selected tests may be useful.",
  alternates: { canonical: `${SITE_URL}/health/headache-causes` },
};

export default function HeadachePage() {
  return (
    <SymptomPageLayout
      data={{
        url: "/health/headache-causes",
        seoTitle: "Headache Causes, Types & Warning Signs | QXL Diagnostics",
        metaDescription: "Learn common headache causes including migraine, tension headache, dehydration and illness, plus warning signs and when selected tests may be useful.",
        h1: "Headache Causes: Why Do I Have a Headache?",
        primaryKeyword: "headache",
        lastReviewed: "2026-09-11",
        reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
        parentHub: "/health/symptoms-causes",
        intro: "Headache is extremely common. Most headaches are not caused by a serious disease. However, a headache that is sudden, unusually severe, new, persistent or associated with other warning symptoms should be medically evaluated.",
        quickAnswer: "A headache can occur because of migraine, stress, poor sleep, dehydration, skipped meals, viral illness, eye strain or muscle tension. Less commonly, headache may be related to medical conditions such as severe hypertension, infection around the brain, eye disease or head injury.",
        causes: [
          { title: "Migraine", description: "A common cause of repeated headaches. The headache may throb or pulsate, affect one or both sides, become worse with normal activity. Associated symptoms include nausea, vomiting, sensitivity to light and sound, and sometimes an aura (flashing lights, zigzag lines)." },
          { title: "Tension-Type Headache", description: "Often feels like pressure around the head, tightness or a band around the forehead. Associated with stress, poor sleep, long working hours, neck tension and prolonged screen use." },
          { title: "Poor Sleep", description: "Too little sleep or irregular sleeping hours can trigger headache. If you wake with headaches and also have loud snoring or excessive daytime sleepiness, sleep apnoea may need evaluation." },
          { title: "Dehydration", description: "Not drinking enough water can cause headache, particularly after excessive sweating, exercise, hot weather, vomiting, diarrhoea or long periods without adequate fluids." },
          { title: "Missing Meals", description: "Skipping breakfast or going many hours without eating can trigger headache, particularly in people with migraine. Low blood sugar can cause headache with hunger, sweating, trembling and dizziness." },
          { title: "Stress", description: "Stress can trigger or worsen both migraine and tension-type headaches. However, a new or persistent headache should not automatically be called a 'stress headache' without considering its pattern and other symptoms." },
          { title: "Fever and Viral Infections", description: "Viral infections commonly cause headache, fever, body pain, tiredness, sore throat and respiratory symptoms. The headache usually improves as the infection settles." },
          { title: "Sinus Problems", description: "An acute sinus infection may produce facial pressure, pain around the forehead or cheeks, blocked nose, nasal discharge and fever. Many repeated 'sinus headaches' are actually migraine." },
          { title: "Eye Strain", description: "Long screen exposure and uncorrected vision problems may contribute to headache. A severe headache with a painful red eye, blurred vision, nausea or vomiting requires urgent medical attention." },
          { title: "High Blood Pressure", description: "Most mild or moderately high blood pressure does not usually explain repeated headaches. However, severely elevated blood pressure associated with other symptoms requires medical assessment." },
          { title: "Anaemia", description: "Anaemia can sometimes cause headache, weakness, tiredness, dizziness, breathlessness and palpitations. A CBC may be advised if these symptoms are present." },
          { title: "Medication-Overuse Headache", description: "Taking headache medicines very frequently can sometimes make headaches occur more often. Someone who repeatedly needs painkillers throughout the month should discuss this with a doctor." },
        ],
        redFlags: [
          "Headache that starts very suddenly and becomes extremely severe within seconds or minutes",
          "The worst headache you have ever experienced — a completely new, unusually severe headache",
          "Headache with weakness on one side, facial drooping, difficulty speaking, confusion, loss of balance or seizure",
          "Headache with fever and neck stiffness",
          "Headache after significant head injury, especially with vomiting, sleepiness or worsening pain",
          "Headache with sudden vision problems or painful red eye",
          "A completely new headache appearing later in life",
          "Your usual headache suddenly changes in pattern, frequency or severity",
        ],
        tests: [
          { name: "CBC", reason: "To look for anaemia or signs that may support infection or systemic illness" },
          { name: "Blood Glucose", reason: "When low or high glucose is suspected" },
          { name: "HbA1c", reason: "To assess longer-term blood glucose or screen for diabetes when appropriate" },
          { name: "ESR", reason: "May help when an inflammatory condition is suspected" },
          { name: "CRP", reason: "May be useful when inflammation or infection is suspected" },
          { name: "TSH / Thyroid Profile", reason: "When thyroid disease is suspected from other symptoms" },
          { name: "Electrolytes", reason: "With dehydration, vomiting, diarrhoea or metabolic illness" },
          { name: "Ferritin / Iron Studies", reason: "When iron deficiency or anaemia is suspected" },
          { name: "Vitamin B12", reason: "When B12 deficiency is suspected, especially with numbness, tingling or anaemia" },
        ],
        faqs: [
          { q: "Why am I getting headaches every day?", a: "Daily headaches can occur with chronic migraine, tension-type headache, poor sleep, stress, frequent painkiller use or other medical conditions. A headache occurring almost every day should be medically evaluated." },
          { q: "Can dehydration cause headache?", a: "Yes. Not drinking enough water, sweating excessively, exercising in hot weather, vomiting or diarrhoea can lead to dehydration and headache." },
          { q: "Can anaemia cause headache?", a: "Yes. Significant anaemia can be associated with headache, tiredness, weakness, breathlessness, dizziness and palpitations. A CBC is commonly used to assess for anaemia." },
          { q: "Does every headache need blood tests?", a: "No. Most headaches do not require a large panel of laboratory tests. Blood tests are selected when the doctor suspects conditions such as anaemia, diabetes, thyroid disease, inflammation or metabolic disturbances." },
          { q: "When should I go to hospital immediately for a headache?", a: "Seek urgent attention if the headache starts suddenly and is extremely severe, is your first 'worst-ever' headache, occurs with weakness or difficulty speaking, occurs with fever and stiff neck, follows significant head injury, or is dramatically different from your usual headaches." },
        ],
        clinicalNote: "Laboratory investigations should be performed when clinically appropriate. If your doctor recommends blood investigations while evaluating recurrent headache, selected tests such as CBC, blood glucose/HbA1c, thyroid profile, ESR/CRP, ferritin/iron profile, Vitamin B12, electrolytes or kidney/liver function tests may be considered depending on the clinical picture. QXL Diagnostics provides laboratory testing and home sample collection across Bengaluru.",
        relatedTopics: [
          { title: "Fatigue & Tiredness: Why Am I Always Tired?", url: "/health/fatigue-tiredness" },
          { title: "Dizziness: Why Do I Feel Dizzy?", url: "/health/dizziness-causes" },
          { title: "Fever: Causes & Warning Signs", url: "/health/fever-causes" },
          { title: "Numbness & Tingling Causes", url: "/health/numbness-tingling-causes" },
        ],
      }}
    />
  );
}
