import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Hair Loss Causes & Blood Tests | QXL Diagnostics",
  description: "Learn common causes of hair loss including iron deficiency, thyroid disease, stress, PCOS, illness and patterned hair loss, plus tests that may be useful.",
  alternates: { canonical: `${SITE_URL}/health/hair-loss-causes` },
};
export default function HairLossPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/hair-loss-causes", seoTitle: "Hair Loss Causes & Blood Tests | QXL Diagnostics",
      metaDescription: "Learn common causes of hair loss including iron deficiency, thyroid disease, stress, PCOS, illness and patterned hair loss, plus tests that may be useful.",
      h1: "Hair Loss: Why Is My Hair Falling? Causes, Blood Tests and Warning Signs",
      primaryKeyword: "hair loss", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Hair loss can result from genetic patterned hair loss, iron deficiency, thyroid disease, recent fever or illness, pregnancy, PCOS, stress, medications, autoimmune disease, scalp disorders or nutritional problems. The pattern of hair loss matters as much as the amount.",
      quickAnswer: "There is no single 'hair loss blood test'. The investigation depends on the pattern of loss, associated symptoms and clinical examination. Common medical causes include iron deficiency, thyroid dysfunction, hormonal problems and nutritional deficiencies.",
      causes: [
        { title: "Genetic Pattern Hair Loss (Androgenetic Alopecia)", description: "The most common cause overall. In men: temple recession, frontal thinning and crown thinning. In women: widening central part, reduced density over the crown with relative preservation of the frontal hairline. Genetic in origin." },
        { title: "Telogen Effluvium", description: "Diffuse hair shedding triggered by a physical or emotional shock 2–4 months earlier. Common triggers include major fever, dengue, COVID-19, severe infection, surgery, childbirth, major emotional stress, rapid weight loss or nutritional deficiency." },
        { title: "Iron Deficiency", description: "Deserves particular attention when hair loss occurs with fatigue, heavy periods, breathlessness, dizziness or poor dietary iron intake. CBC and ferritin/iron studies are the appropriate investigations. Iron supplementation should follow proper assessment." },
        { title: "Thyroid Disorders", description: "Both hypothyroidism and hyperthyroidism can affect hair growth. Look for associated symptoms: weight changes, cold or heat intolerance, constipation, palpitations, fatigue and menstrual changes. TSH (and free T4 when indicated) are the appropriate tests." },
        { title: "Nutritional Problems", description: "Hair growth can be affected by protein deficiency, iron deficiency, Vitamin B12 deficiency, zinc deficiency and severe calorie restriction or malabsorption. Vitamin D is frequently tested in hair-loss patients, but a low result should not automatically be assumed to be the primary cause." },
        { title: "PCOS & Hormonal Hair Loss", description: "Women with PCOS may develop scalp thinning together with acne, increased facial or body hair, irregular periods and weight gain. Hormonal testing should be targeted to the clinical picture." },
        { title: "Alopecia Areata", description: "An autoimmune condition presenting with sudden smooth bald patches, minimal scaling and sometimes eyebrow or beard involvement. Requires clinical examination; blood testing alone does not diagnose alopecia areata." },
        { title: "Scalp Disorders", description: "Hair loss may occur with fungal infection (tinea capitis), severe seborrhoeic dermatitis, psoriasis, inflammatory scalp disease or scarring alopecia. Scalp redness, pain, pus, scaling or scarring warrants dermatological evaluation." },
        { title: "Medications", description: "Hair shedding may occasionally follow anticoagulants, retinoids, anti-thyroid drugs, anticonvulsants, cancer therapies or hormonal treatments. Do not stop prescribed medication without medical advice." },
      ],
      redFlags: [
        "Sudden or rapidly progressive hair loss",
        "Patchy hair loss or distinct bald areas appearing quickly",
        "Hair loss associated with scalp pain, pus or scarring",
        "Severe scalp itching or inflammation",
        "Hair loss with unexplained weight loss",
        "Hair loss with marked fatigue or anaemia symptoms",
        "Hair loss with menstrual irregularity or signs of androgen excess (virilisation)",
        "Eyebrow or significant body-hair loss",
      ],
      tests: [
        { name: "CBC (Complete Blood Count)", reason: "To check haemoglobin and assess for anaemia" },
        { name: "Serum Ferritin", reason: "Best single indicator of iron stores — often the most useful test for hair loss" },
        { name: "Iron Studies (TIBC, serum iron)", reason: "To confirm iron deficiency and iron metabolism" },
        { name: "TSH", reason: "To screen for thyroid dysfunction (both hypo- and hyperthyroidism)" },
        { name: "Free T4", reason: "When TSH is abnormal or thyroid disease is clinically likely" },
        { name: "Vitamin B12", reason: "When B12 deficiency is suspected from other symptoms or dietary risk" },
        { name: "25-Hydroxy Vitamin D", reason: "When clinically appropriate — note: low Vitamin D may not be the primary cause of hair loss" },
        { name: "Hormonal Tests (LH, FSH, testosterone, DHEAS, prolactin)", reason: "When PCOS or androgen excess is suspected from clinical pattern" },
      ],
      faqs: [
        { q: "How much hair fall is normal?", a: "Some daily shedding is normal. What deserves attention is a clear increase from your usual shedding, visible scalp widening, thinning ponytail volume, receding hairline, bald patches or progressive loss lasting months." },
        { q: "Can Vitamin D deficiency cause hair loss?", a: "Vitamin D is frequently tested in hair-loss patients, but the evidence linking low Vitamin D specifically to hair loss is limited. A low result does not automatically mean it is the primary cause." },
        { q: "Why does hair fall out after illness or dengue?", a: "Telogen effluvium — diffuse shedding — commonly occurs 6–12 weeks after a major physical stress such as fever, infection, dengue, COVID-19, surgery or childbirth. The hair cycle is temporarily disrupted." },
        { q: "Does iron deficiency always show as low haemoglobin?", a: "No. Iron stores (measured by serum ferritin) can be depleted before haemoglobin falls to anaemic levels. This is why ferritin is often more useful than CBC alone in suspected iron-deficiency-related hair loss." },
      ],
      clinicalNote: "QXL Diagnostics provides CBC, ferritin, iron studies, TSH, Vitamin D, Vitamin B12 and hormonal investigations with free home collection across Bengaluru. Test selection should follow your doctor's advice based on the pattern of hair loss and associated symptoms.",
      relatedTopics: [
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Skin Rash & Itching Causes", url: "/health/skin-rash-itching-causes" },
        { title: "Unexplained Weight Loss", url: "/health/unexplained-weight-loss" },
        { title: "Frequent Urination & Excessive Thirst", url: "/health/frequent-urination-excessive-thirst-causes" },
      ],
    }} />
  );
}
