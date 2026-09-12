import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";

export const metadata: Metadata = {
  title: "Fatigue & Tiredness: Causes & Blood Tests | QXL Diagnostics",
  description: "Persistent tiredness can be linked to sleep, anaemia, iron deficiency, thyroid disease, diabetes and other conditions. Learn causes, tests and warning signs.",
  alternates: { canonical: `${SITE_URL}/health/fatigue-tiredness` },
};

export default function FatiguePage() {
  return (
    <SymptomPageLayout
      data={{
        url: "/health/fatigue-tiredness",
        seoTitle: "Fatigue & Tiredness: Causes & Blood Tests | QXL Diagnostics",
        metaDescription: "Persistent tiredness can be linked to sleep, anaemia, iron deficiency, thyroid disease, diabetes and other conditions. Learn causes, tests and warning signs.",
        h1: "Fatigue & Tiredness: Why Am I Always Tired?",
        primaryKeyword: "fatigue",
        lastReviewed: "2026-09-11",
        reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
        parentHub: "/health/symptoms-causes",
        intro: "Fatigue is deceptively simple. Sometimes the explanation is obvious: poor sleep, overwork, skipped meals, dehydration or a recent infection. Sometimes the first clue is a haemoglobin of 8 g/dL, an abnormal TSH, uncontrolled diabetes or severe Vitamin B12 deficiency. Fatigue is a symptom, not a diagnosis.",
        quickAnswer: "Persistent tiredness that does not improve after correcting sleep, hydration and routine deserves medical evaluation. Common medical causes include iron deficiency anaemia, thyroid disease, diabetes, Vitamin B12 deficiency, Vitamin D deficiency and sleep disorders.",
        causes: [
          { title: "Iron Deficiency & Anaemia", description: "One of the most important causes, particularly in women. Iron is essential for haemoglobin and oxygen transport. When haemoglobin falls, tissues receive less oxygen, causing persistent tiredness, reduced exercise capacity, breathlessness on climbing stairs, palpitations, headache, dizziness and poor concentration. Low iron stores may contribute to fatigue even before obvious anaemia develops — serum ferritin can be useful." },
          { title: "Vitamin B12 Deficiency", description: "B12 deficiency can produce fatigue, poor concentration, memory difficulty, pins-and-needles sensations, numbness, burning feet and balance problems in addition to macrocytic anaemia. People consuming little or no animal-derived food, those with poor absorption (pernicious anaemia, previous gastric surgery, intestinal disease) or long-term metformin users may be at greater risk." },
          { title: "Vitamin D Deficiency", description: "Low Vitamin D may accompany fatigue, muscle discomfort, generalised aches, proximal muscle weakness and bone discomfort. People working predominantly indoors in modern Indian cities may have lower 25-hydroxy Vitamin D levels. However, not every tired person has Vitamin D deficiency and not every low result explains the fatigue — the laboratory result must fit the clinical picture." },
          { title: "Hypothyroidism", description: "An underactive thyroid is an important diagnosis to consider when fatigue is accompanied by cold intolerance, constipation, dry skin, hair loss, weight gain, slowing of thought or speech, menstrual disturbance, muscle aches or excessive sleepiness. A TSH, often with free T4 when indicated, can clarify the diagnosis." },
          { title: "Hyperthyroidism", description: "An overactive thyroid can also cause fatigue due to enormous metabolic stress. Look for heat intolerance, excessive sweating, palpitations, tremor, weight loss despite appetite, anxiety and loose stools. A person can be restless and exhausted simultaneously." },
          { title: "Type 2 Diabetes & Glucose Fluctuations", description: "Diabetes commonly presents far more quietly than expected. Fatigue may occur with persistent hyperglycaemia. Patients may also notice excessive thirst, frequent urination, blurred vision, recurrent infections and unexplained weight change. For persistent unexplained tiredness, fasting glucose and HbA1c are often more useful early tests." },
          { title: "Post-Infectious Fatigue", description: "Physical endurance may remain reduced for days or weeks after the acute illness has settled. In Indian practice this may follow dengue, COVID-19, influenza, typhoid fever, malaria, infectious mononucleosis or other significant systemic infections." },
          { title: "Sleep Disorders", description: "Chronic sleep restriction, insomnia, and obstructive sleep apnoea (OSA) are underdiagnosed causes of fatigue. Think about OSA when there is loud snoring, witnessed breathing pauses, morning headache, dry mouth on waking and daytime sleepiness — particularly in overweight individuals or those with difficult-to-control hypertension." },
          { title: "Stress, Anxiety & Depression", description: "Mental health and physical energy are deeply connected. Chronic stress disturbs sleep, appetite and concentration. Depression may enter as fatigue — 'I have no energy', 'everything feels difficult', 'I can't concentrate'. These symptoms deserve the same medical seriousness as hypertension or diabetes." },
          { title: "Kidney & Liver Disease", description: "Both chronic kidney disease and chronic liver disease can produce substantial fatigue through anaemia, metabolic disturbance, sleep disorders, chronic inflammation and muscle loss. Persistent unexplained fatigue therefore sometimes warrants renal and liver function testing." },
          { title: "Autoimmune & Inflammatory Diseases", description: "Systemic inflammation consumes energy. Fatigue can be prominent in rheumatoid arthritis, SLE, Sjögren syndrome, inflammatory bowel disease, vasculitis and polymyalgia rheumatica — usually with other clinical clues such as joint pain, morning stiffness, rashes or dry eyes." },
          { title: "Medicines & Substances", description: "Some antihistamines, antidepressants, anti-anxiety medicines, beta blockers, muscle relaxants and opioids can cause fatigue. Alcohol can impair restorative sleep and produce next-day fatigue. Always discuss your medication list with your doctor before making changes." },
        ],
        redFlags: [
          "Fatigue with persistent unexplained fever or night sweats",
          "Fatigue with significant unintentional weight loss",
          "Fatigue with breathlessness on minimal exertion or difficulty lying flat",
          "Fatigue with chest discomfort or palpitations at rest",
          "Fatigue with significant swelling of feet or face",
          "Fatigue with jaundice or dark urine",
          "Fatigue with blood in stool, urine or vomit",
          "Fatigue with confusion or neurological symptoms",
          "Fatigue that is rapidly worsening without explanation",
          "Fatigue with enlarged lymph nodes that are persisting",
        ],
        tests: [
          { name: "CBC (Complete Blood Count)", reason: "To identify anaemia, and assess haemoglobin, white cell count and platelets" },
          { name: "Serum Ferritin", reason: "Best single test for iron stores — may reveal iron deficiency before anaemia develops" },
          { name: "Iron Studies (TIBC, serum iron)", reason: "To confirm iron deficiency and understand iron metabolism" },
          { name: "Fasting / Random Blood Glucose", reason: "Initial screen for diabetes or hypoglycaemia" },
          { name: "HbA1c", reason: "Reflects average blood glucose over approximately 3 months" },
          { name: "TSH (Thyroid Stimulating Hormone)", reason: "To screen for both underactive and overactive thyroid" },
          { name: "Free T4", reason: "When TSH is abnormal or thyroid disease is clinically likely" },
          { name: "Vitamin B12", reason: "Particularly when fatigue is associated with neurological symptoms, anaemia or dietary risk" },
          { name: "25-Hydroxy Vitamin D", reason: "When Vitamin D deficiency is clinically suspected" },
          { name: "Kidney Function Tests (KFT)", reason: "When renal disease or metabolic disorder is suspected" },
          { name: "Liver Function Tests (LFT)", reason: "When liver disease is suspected or other systemic symptoms are present" },
          { name: "CRP / ESR", reason: "To assess for active inflammation or chronic infection" },
        ],
        faqs: [
          { q: "What is the most common cause of tiredness in women in India?", a: "Iron deficiency anaemia is among the most common identifiable medical causes of persistent tiredness in women, often related to heavy menstrual bleeding or inadequate dietary iron." },
          { q: "Can thyroid disease cause constant fatigue?", a: "Yes. Both hypothyroidism (underactive thyroid) and hyperthyroidism (overactive thyroid) can cause significant fatigue, though through different mechanisms." },
          { q: "Should I take iron tablets if I feel tired all the time?", a: "Not without testing first. Iron supplementation is appropriate when iron deficiency is confirmed. Taking iron when not deficient provides no benefit and may have side effects. A CBC and ferritin test will clarify." },
          { q: "Can stress alone cause extreme tiredness?", a: "Yes. Chronic stress, anxiety and depression can cause profound fatigue. However, important medical causes should not be dismissed without appropriate assessment." },
          { q: "What is the difference between normal tiredness and medical fatigue?", a: "Normal tiredness is typically linked to a busy period and improves after rest, sleep or food. Medical fatigue persists despite adequate rest, may occur without obvious trigger, and may affect work, study or daily activity for weeks or months." },
        ],
        clinicalNote: "If your doctor recommends blood investigations for persistent tiredness, tests such as CBC, ferritin/iron studies, blood glucose/HbA1c, TSH/free T4, Vitamin B12, Vitamin D, kidney and liver function tests may be considered depending on the clinical picture. QXL Diagnostics provides all these investigations with free home sample collection across Bengaluru.",
        relatedTopics: [
          { title: "Headache Causes", url: "/health/headache-causes" },
          { title: "Hair Loss: Why Is My Hair Falling?", url: "/health/hair-loss-causes" },
          { title: "Dizziness: Why Do I Feel Dizzy?", url: "/health/dizziness-causes" },
          { title: "Numbness & Tingling Causes", url: "/health/numbness-tingling-causes" },
        ],
      }}
    />
  );
}
