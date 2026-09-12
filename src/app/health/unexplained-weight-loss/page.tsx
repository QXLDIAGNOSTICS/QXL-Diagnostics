import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Unexplained Weight Loss: Causes & Tests | QXL Diagnostics",
  description: "Unintentional weight loss may be linked to diabetes, thyroid disease, infections, digestive disorders, poor nutrition or chronic disease. Learn warning signs.",
  alternates: { canonical: `${SITE_URL}/health/unexplained-weight-loss` },
};
export default function WeightLossPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/unexplained-weight-loss", seoTitle: "Unexplained Weight Loss: Causes & Tests | QXL Diagnostics",
      metaDescription: "Unintentional weight loss may be linked to diabetes, thyroid disease, infections, digestive disorders, poor nutrition or chronic disease. Learn warning signs.",
      h1: "Unexplained Weight Loss: Why Am I Losing Weight Without Trying?",
      primaryKeyword: "unexplained weight loss", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Unexplained or unintentional weight loss means losing body weight without deliberately dieting, exercising more or trying to reduce weight. A clinically significant threshold is an unintentional loss of more than about 5% of usual body weight over 6–12 months. Smaller amounts also matter when accompanied by fever, night sweats or other concerning symptoms.",
      quickAnswer: "Unintentional weight loss can result from diabetes, hyperthyroidism, chronic infections (including TB), digestive disorders, depression, chronic organ disease or rarely cancer. The important clinical question is how much has been lost, over how long, and with what other symptoms.",
      causes: [
        { title: "Reduced Food Intake", description: "Sometimes the body is simply receiving fewer calories: poor appetite, dental problems, difficulty swallowing, chronic nausea, depression, dementia, social isolation, financial or food-access problems or severe illness." },
        { title: "Diabetes", description: "Uncontrolled diabetes can cause weight loss despite normal or increased food intake. Look for excessive thirst, frequent urination, fatigue, blurred vision, recurrent infections and increased hunger. Fasting glucose and HbA1c are appropriate tests." },
        { title: "Hyperthyroidism", description: "An overactive thyroid accelerates metabolism, causing weight loss despite normal appetite. Associated symptoms: palpitations, tremor, heat intolerance, excess sweating, frequent bowel movements, anxiety and muscle weakness. Test: TSH and free T4." },
        { title: "Tuberculosis & Chronic Infection", description: "TB is an important consideration in unexplained weight loss in India. Possible associations: persistent fever, night sweats, prolonged cough, reduced appetite, lymph node enlargement. HIV, chronic hepatitis and other chronic infections may also cause weight loss." },
        { title: "Gastrointestinal & Malabsorption Disorders", description: "Weight loss can occur when nutrients are not adequately absorbed. Possible causes: coeliac disease, inflammatory bowel disease, chronic pancreatitis, persistent diarrhoea, malabsorption or gastrointestinal cancers. Clues include diarrhoea, greasy stools, abdominal pain, bloating and nutritional deficiencies." },
        { title: "Cancer", description: "Cancer is an important but not the most common cause of unexplained weight loss. Concern increases when weight loss occurs with persistent fever, night sweats, unexplained pain, new lumps, blood in stool or urine, persistent cough or change in bowel habits." },
        { title: "Depression & Mental Health", description: "Depression may reduce appetite, motivation to cook, physical activity, sleep quality and overall caloric intake. Some patients present primarily with weight loss and reduced appetite rather than stating they feel depressed." },
        { title: "Chronic Organ Disease", description: "Long-standing heart, lung, kidney or liver disease can cause reduced appetite, increased energy expenditure, chronic inflammation and muscle loss." },
        { title: "Medicines & Substances", description: "Certain medications can reduce appetite or alter metabolism. Weight loss may also occur with excess alcohol use, stimulant misuse, some diabetes medications and cancer treatments." },
      ],
      redFlags: [
        "Unexplained weight loss with persistent fever or drenching night sweats",
        "Weight loss with cough lasting several weeks (possible TB or lung malignancy)",
        "Weight loss with blood in stool, black stools or blood in urine",
        "Weight loss with persistent vomiting or difficulty swallowing",
        "Weight loss with severe abdominal pain",
        "Weight loss with new lump or persistently enlarged lymph node",
        "Weight loss with significant loss of appetite lasting more than 2 weeks",
        "Weight loss with progressive breathlessness or jaundice",
        "More than 5% body weight lost unintentionally over 6–12 months",
      ],
      tests: [
        { name: "CBC", reason: "To assess for anaemia, infection or abnormal blood counts" },
        { name: "Fasting Blood Glucose / HbA1c", reason: "To screen for diabetes" },
        { name: "TSH ± Free T4", reason: "To assess thyroid function" },
        { name: "Kidney Function Tests", reason: "To identify chronic renal disease" },
        { name: "Liver Function Tests", reason: "To identify hepatic disease or malnutrition markers" },
        { name: "Electrolytes / Calcium", reason: "Calcium abnormalities can indicate malignancy or parathyroid disease" },
        { name: "ESR / CRP", reason: "Inflammatory markers — elevated in infection, inflammation or malignancy" },
        { name: "HIV Testing", reason: "When clinically appropriate based on risk factors" },
        { name: "Additional Infection Testing", reason: "TB investigations, hepatitis serology and others based on clinical risk" },
      ],
      faqs: [
        { q: "How much weight loss is medically significant?", a: "An unintentional loss of more than 5% of usual body weight over 6–12 months is a commonly used clinical threshold for concern. Smaller losses also matter with accompanying symptoms." },
        { q: "Is cancer always the cause of unexplained weight loss?", a: "No. There are many more common causes including diabetes, thyroid disease, depression, infections and gastrointestinal disorders. Cancer is important to consider but is not the most likely explanation in every patient." },
        { q: "Can diabetes cause weight loss?", a: "Yes. Uncontrolled diabetes, particularly Type 1, can cause significant weight loss despite a normal or increased appetite, through glucose loss in the urine and metabolic changes." },
      ],
      clinicalNote: "QXL Diagnostics provides CBC, blood glucose, HbA1c, thyroid profile, kidney and liver function tests, inflammatory markers and other investigations with home sample collection across Bengaluru.",
      relatedTopics: [
        { title: "Diarrhoea: Why Do I Have Loose Motions?", url: "/health/diarrhoea-loose-motion-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Recurrent Infections", url: "/health/recurrent-infections-causes" },
        { title: "Stomach Pain Causes", url: "/health/stomach-abdominal-pain-causes" },
      ],
    }} />
  );
}
