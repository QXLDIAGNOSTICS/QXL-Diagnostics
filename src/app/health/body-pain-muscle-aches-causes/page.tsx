import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Body Pain & Muscle Aches: Causes & Tests | QXL Diagnostics",
  description: "Generalised body pain and muscle aches may result from viral infection, thyroid disease, Vitamin D deficiency, fibromyalgia, autoimmune disease or medicines.",
  alternates: { canonical: `${SITE_URL}/health/body-pain-muscle-aches-causes` },
};
export default function BodyPainPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/body-pain-muscle-aches-causes",
      seoTitle: "Body Pain & Muscle Aches: Causes & Tests | QXL Diagnostics",
      metaDescription: "Generalised body pain and muscle aches may result from viral infection, thyroid disease, Vitamin D deficiency, fibromyalgia, autoimmune disease or medicines.",
      h1: "Body Pain & Muscle Aches: Why Does My Whole Body Hurt?",
      primaryKeyword: "body pain and muscle aches", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Generalised body pain and muscle aches (myalgia) are extremely common symptoms. Most episodes are caused by viral infections and resolve within a week. Persistent, severe or unexplained body pain warrants investigation for underlying medical causes.",
      quickAnswer: "Body pain most commonly occurs with viral infections. Persistent body pain may be linked to Vitamin D deficiency, thyroid disease, fibromyalgia, autoimmune conditions, medicines or systemic illness.",
      causes: [
        { title: "Viral Infections", description: "The most common cause of acute generalised body pain. Dengue causes severe myalgia ('breakbone fever'), influenza causes prominent muscle aches and fatigue, COVID-19 and other viral illnesses also cause myalgia. Pain typically resolves as the infection settles." },
        { title: "Hypothyroidism", description: "An underactive thyroid can cause muscle pain, stiffness, cramps, weakness and generalised aching. Associated with fatigue, weight gain, cold intolerance, constipation and dry skin. TSH is the key screening test." },
        { title: "Vitamin D Deficiency", description: "Severe Vitamin D deficiency can cause diffuse bone and muscle discomfort, proximal muscle weakness and generalised aching. Common in those who spend most time indoors. 25-OH Vitamin D levels can confirm deficiency." },
        { title: "Fibromyalgia", description: "A chronic condition causing widespread musculoskeletal pain, fatigue, sleep disturbance and cognitive difficulties. No laboratory abnormality is typically found; diagnosis is clinical based on symptom pattern and exclusion of other conditions." },
        { title: "Polymyalgia Rheumatica", description: "Causes aching and stiffness in the shoulder and hip girdle, typically in people over 50. Usually associated with markedly elevated ESR and CRP. Often responds dramatically to corticosteroids." },
        { title: "Statin Medications", description: "Muscle pain (myalgia) is a recognised side effect of statin medications used to lower cholesterol. CK (creatine kinase) elevation may occur. Discuss with your prescribing doctor if suspected." },
        { title: "Autoimmune Myositis", description: "Inflammatory muscle diseases (polymyositis, dermatomyositis) cause proximal muscle weakness and pain. CK and aldolase are elevated. May be associated with skin changes (dermatomyositis)." },
        { title: "SLE & Autoimmune Diseases", description: "Systemic lupus erythematosus and other connective tissue diseases can cause diffuse muscle and joint pain, fatigue, fever and organ-specific features." },
        { title: "Post-Infectious Fatigue", description: "After dengue, COVID-19, malaria, typhoid and other infections, patients may experience persistent body aches, fatigue and reduced stamina for weeks to months." },
        { title: "Electrolyte Disturbances", description: "Low potassium (hypokalaemia), low calcium, low sodium and low magnesium can all cause muscle cramps, weakness and generalised discomfort." },
      ],
      redFlags: [
        "Body pain with severe muscle weakness — difficulty lifting arms above head or climbing stairs",
        "Body pain with difficulty swallowing, breathing or speaking (possible myositis or rare neuromuscular condition)",
        "Shoulder and hip girdle stiffness in someone over 50 with high ESR (possible PMR)",
        "Body pain with red-brown urine after intense exercise (possible rhabdomyolysis)",
        "Body pain with high fever not settling within a few days",
        "Body pain with skin changes (rash, calcinosis) suggesting dermatomyositis",
        "Body pain with significant weight loss or night sweats",
        "Sudden onset of severe muscle pain after a new medication",
      ],
      tests: [
        { name: "CBC", reason: "To screen for infection, anaemia or blood disorders" },
        { name: "ESR / CRP", reason: "Elevated in inflammatory conditions including PMR, myositis and infection" },
        { name: "TSH", reason: "Hypothyroidism causes muscle pain and stiffness" },
        { name: "25-OH Vitamin D", reason: "When Vitamin D deficiency is suspected" },
        { name: "Electrolytes (Sodium, Potassium, Calcium, Magnesium)", reason: "Deficiencies can cause muscle cramps, weakness and pain" },
        { name: "Creatine Kinase (CK)", reason: "Elevated in muscle inflammation, myositis or rhabdomyolysis" },
        { name: "Vitamin B12", reason: "Deficiency can cause muscle pain and neurological symptoms" },
        { name: "Ferritin / Iron Studies", reason: "Iron deficiency can cause muscle fatigue and discomfort" },
        { name: "ANA", reason: "If autoimmune condition is suspected from other clinical features" },
      ],
      faqs: [
        { q: "Can Vitamin D deficiency cause whole body pain?", a: "Severe Vitamin D deficiency can cause diffuse bone and muscle discomfort, weakness and generalised aching. However, mild low Vitamin D does not automatically explain all body pain — the clinical picture must fit." },
        { q: "Why do muscles hurt during a viral fever?", a: "Viruses trigger immune responses that release cytokines (chemical signals), which cause muscle inflammation and pain as part of the body's defence. This is why body pain is a prominent feature of influenza, dengue and COVID-19." },
        { q: "Can statins cause body pain?", a: "Yes. Muscle pain (myalgia) is a recognised statin side effect. In rare cases, more serious muscle damage (myopathy or rhabdomyolysis) can occur. If you suspect statin-related muscle pain, discuss it with your prescribing doctor." },
      ],
      clinicalNote: "QXL Diagnostics provides CBC, ESR/CRP, TSH, Vitamin D, CK, electrolytes and other investigations with home collection across Bengaluru.",
      relatedTopics: [
        { title: "Joint Pain Causes", url: "/health/joint-pain-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Fever Causes", url: "/health/fever-causes" },
        { title: "Numbness & Tingling Causes", url: "/health/numbness-tingling-causes" },
      ],
    }} />
  );
}
