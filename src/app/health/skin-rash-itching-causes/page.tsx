import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Skin Rash & Itching: Causes & Warning Signs | QXL Diagnostics",
  description: "Skin rash and itching may be caused by allergies, eczema, infections, liver disease, kidney disease, thyroid conditions, autoimmune disease or medicines.",
  alternates: { canonical: `${SITE_URL}/health/skin-rash-itching-causes` },
};
export default function SkinRashPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/skin-rash-itching-causes",
      seoTitle: "Skin Rash & Itching: Causes & Warning Signs | QXL Diagnostics",
      metaDescription: "Skin rash and itching may be caused by allergies, eczema, infections, liver disease, kidney disease, thyroid conditions, autoimmune disease or medicines.",
      h1: "Skin Rash & Itching: Why Is My Skin Itchy or Breaking Out?",
      primaryKeyword: "skin rash and itching", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Skin rashes and itching (pruritus) are very common. Most are caused by allergic reactions, contact irritants, dry skin or infections. However, persistent unexplained itching or rash — particularly without obvious skin change — may sometimes indicate an internal medical condition.",
      quickAnswer: "Common causes of skin rash include allergies (urticaria/hives), eczema, psoriasis, fungal infections and viral illness. Itching without obvious skin changes may indicate liver, kidney or thyroid disease. Drug reactions can cause both rash and itching.",
      causes: [
        { title: "Allergic Urticaria (Hives)", description: "Allergic reactions cause raised, itchy wheals (hives) that can appear and disappear. Triggers include foods, medicines, insect stings, latex and infections. Severe allergic reactions may cause throat swelling or difficulty breathing — an emergency." },
        { title: "Contact Dermatitis", description: "Direct contact with a substance (soap, detergent, jewellery metal, cosmetics, plants) causes a localised itchy rash at the point of contact. Patch testing can identify the specific allergen." },
        { title: "Eczema / Atopic Dermatitis", description: "Chronic itchy, inflamed skin, often with dry skin, scaling and sometimes oozing. Common in children but can persist into adulthood. Associated with asthma and allergic rhinitis. Triggers include dry weather, soaps, certain foods and stress." },
        { title: "Psoriasis", description: "Chronic autoimmune skin condition causing well-defined scaly plaques, most commonly on elbows, knees and scalp. Often associated with joint involvement (psoriatic arthritis) and other systemic conditions." },
        { title: "Fungal Infections", description: "Ringworm (tinea), candida and other fungal infections cause circular or spreading itchy rashes. Common in humid climates, particularly affecting skin folds, feet (athlete's foot) and groin." },
        { title: "Viral Infections", description: "Many viral illnesses cause rashes: dengue (maculopapular rash), chikungunya, chickenpox (varicella), measles, rubella, COVID-19 and Epstein-Barr virus infection. Rash with fever often indicates a systemic viral illness." },
        { title: "Drug Reactions", description: "Many medications cause rashes — from mild macular rashes to severe Stevens-Johnson syndrome. Common culprits include antibiotics (sulfonamides, penicillins, carbamazepine), NSAIDs and many others. Do not stop prescribed medication without medical advice." },
        { title: "Liver Disease & Cholestasis", description: "Bile salt accumulation in the skin from liver disease or bile-duct obstruction causes severe itching, often without visible rash. May be associated with jaundice (yellow skin/eyes), dark urine and pale stools." },
        { title: "Chronic Kidney Disease", description: "Uraemia causes persistent itching (uraemic pruritus) in patients with significant kidney impairment, due to accumulation of metabolic waste products and altered immune function." },
        { title: "Hypothyroidism & Hyperthyroidism", description: "Thyroid disorders can affect skin. Hypothyroidism causes dry, rough, itchy skin. Hyperthyroidism may cause warm, moist, smooth skin and occasional generalised itching." },
        { title: "Autoimmune Conditions", description: "SLE causes a characteristic butterfly rash across the cheeks and nose. Dermatomyositis causes heliotrope rash around the eyes. Many other autoimmune conditions cause skin involvement." },
        { title: "Scabies", description: "A parasitic mite infestation causing intense itching, worse at night, with characteristic burrows in web spaces between fingers, wrists, belt area and genitals. Spreads by close contact." },
      ],
      redFlags: [
        "🚨 Rash with throat tightening, difficulty breathing, swollen tongue or rapid heart rate — anaphylaxis emergency",
        "🚨 Widespread blistering rash, skin peeling or mouth/eye involvement after starting a new medicine — possible Stevens-Johnson syndrome",
        "🚨 Purple non-blanching rash (does not fade when pressed) with fever — possible meningococcal sepsis",
        "Persistent unexplained itching without obvious skin rash (consider liver, kidney or blood disorder)",
        "Rash with jaundice, dark urine or pale stools",
        "Rash with high fever and general deterioration",
        "Skin rash associated with significant joint pain, mouth ulcers or hair loss (possible SLE)",
        "Rapidly spreading or worsening skin rash involving the face",
      ],
      tests: [
        { name: "CBC with Differential", reason: "For infection, eosinophilia (allergic/parasitic), blood disorders" },
        { name: "Total IgE & Specific IgE (RAST)", reason: "For allergic sensitisation in urticaria or atopic eczema" },
        { name: "Liver Function Tests", reason: "For suspected hepatic cause of itching or jaundice" },
        { name: "Kidney Function Tests", reason: "For suspected uraemic pruritus in kidney disease" },
        { name: "TSH", reason: "Both hypo- and hyperthyroidism can cause skin changes" },
        { name: "ANA / Autoimmune Antibodies", reason: "When autoimmune skin disease is clinically suspected" },
        { name: "Blood Glucose / HbA1c", reason: "Diabetes predisposes to recurrent skin and fungal infections" },
        { name: "Dengue / Chikungunya Testing", reason: "When rash occurs with fever and relevant mosquito exposure" },
      ],
      faqs: [
        { q: "Can liver disease cause itching?", a: "Yes. Bile salts accumulating in the skin from liver disease or bile-duct obstruction cause severe itching, often without visible rash. This may be associated with jaundice, dark urine and pale stools." },
        { q: "Why does itching get worse at night?", a: "Itching often worsens at night due to reduced distractions, changes in skin temperature, lowered cortisol and the normal pattern of some conditions like scabies, eczema and cholestatic pruritus." },
        { q: "Can I take antihistamines for any rash?", a: "Antihistamines help with allergic urticaria and some itching. However, rash with fever, blistering, skin peeling or difficulty breathing needs urgent medical attention — not antihistamines alone." },
      ],
      clinicalNote: "QXL Diagnostics provides allergy testing (Total IgE, specific IgE panels, Phadiatop), liver function tests, kidney function, CBC and ANA testing with home collection across Bengaluru.",
      relatedTopics: [
        { title: "Fever Causes", url: "/health/fever-causes" },
        { title: "Recurrent Infections", url: "/health/recurrent-infections-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Hair Loss Causes", url: "/health/hair-loss-causes" },
      ],
    }} />
  );
}
