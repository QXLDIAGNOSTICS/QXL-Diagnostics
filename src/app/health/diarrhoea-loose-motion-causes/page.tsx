import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Diarrhoea & Loose Motions: Causes & Warning Signs | QXL Diagnostics",
  description: "Diarrhoea and loose motions may be caused by viral or bacterial infection, food poisoning, IBS, IBD, lactose intolerance or medications. Learn warning signs.",
  alternates: { canonical: `${SITE_URL}/health/diarrhoea-loose-motion-causes` },
};
export default function DiarrhoeaPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/diarrhoea-loose-motion-causes",
      seoTitle: "Diarrhoea & Loose Motions: Causes & Warning Signs | QXL Diagnostics",
      metaDescription: "Diarrhoea and loose motions may be caused by viral or bacterial infection, food poisoning, IBS, IBD, lactose intolerance or medications. Learn warning signs.",
      h1: "Diarrhoea: Why Do I Have Loose Motions? Causes, Tests and Warning Signs",
      primaryKeyword: "diarrhoea", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Diarrhoea — loose or watery stools occurring more than three times per day — is very common and most often self-limiting. However, persistent, severe or bloody diarrhoea with dehydration or fever requires medical evaluation.",
      quickAnswer: "Most acute diarrhoea is caused by viral gastroenteritis or food poisoning and resolves within a few days with oral rehydration. Persistent diarrhoea lasting more than 2 weeks or diarrhoea with blood, fever, severe pain or dehydration requires medical attention.",
      causes: [
        { title: "Viral Gastroenteritis", description: "The most common cause of acute diarrhoea worldwide. Caused by norovirus, rotavirus, adenovirus and others. Usually lasts 1–3 days. Oral rehydration is the primary treatment; antibiotics are not needed." },
        { title: "Bacterial Food Poisoning", description: "Salmonella, Staphylococcus, Campylobacter, Shigella, E. coli and other bacteria cause diarrhoea (sometimes with blood), vomiting and fever from contaminated food or water. More likely to require specific treatment." },
        { title: "Enteric Fever (Typhoid)", description: "Salmonella typhi causes high fever, abdominal pain, headache and loose stools. Stool culture, blood culture and Widal test (with limitations) may be used in evaluation." },
        { title: "Parasitic Infections", description: "Giardia lamblia, Entamoeba histolytica, Cryptosporidium and other parasites can cause prolonged diarrhoea, particularly with travel, contaminated water or immunocompromise." },
        { title: "Irritable Bowel Syndrome (IBS)", description: "A functional bowel disorder causing alternating diarrhoea and constipation, cramping abdominal pain relieved by defecation and bloating. No structural abnormality is found. Diagnosis is clinical." },
        { title: "Inflammatory Bowel Disease (IBD)", description: "Crohn's disease and ulcerative colitis cause chronic relapsing diarrhoea, often with blood, abdominal pain, weight loss and fatigue. Calprotectin and colonoscopy are key in evaluation." },
        { title: "Lactose Intolerance", description: "Difficulty digesting lactose causes loose stools, bloating and cramping after milk or dairy products. Common in adults, particularly in certain ethnic groups." },
        { title: "Coeliac Disease", description: "Gluten intolerance causes chronic diarrhoea (often fatty/bulky stools), weight loss, abdominal bloating and nutritional deficiencies. Anti-tTG IgA antibody is the initial blood test." },
        { title: "Medications", description: "Antibiotics (especially broad-spectrum), metformin, NSAIDs, laxatives and many other medications can cause diarrhoea. Antibiotic-associated diarrhoea from Clostridioides difficile can be serious." },
        { title: "Traveller's Diarrhoea", description: "Diarrhoea developing during or after international travel, particularly to regions with different sanitation. Often bacterial or parasitic in origin." },
      ],
      redFlags: [
        "🚨 Bloody diarrhoea or black tarry stools",
        "🚨 Severe dehydration: very little urine, sunken eyes, extreme weakness, rapid heart rate",
        "🚨 High fever with severe diarrhoea",
        "🚨 Diarrhoea with severe abdominal pain",
        "🚨 Diarrhoea in young children or elderly patients that is persistent",
        "🚨 Diarrhoea after antibiotic treatment (possible C. difficile)",
        "Diarrhoea persisting more than 2 weeks without explanation",
        "Diarrhoea with significant unintentional weight loss",
        "Chronic diarrhoea with nutritional deficiency symptoms",
      ],
      tests: [
        { name: "Stool Routine Examination", reason: "To assess for blood, pus, parasites and WBCs" },
        { name: "Stool Culture", reason: "When bacterial infection is suspected (high fever, bloody stool)" },
        { name: "Stool for Ova & Parasites", reason: "For suspected parasitic infection or prolonged diarrhoea" },
        { name: "CBC", reason: "To assess for infection, anaemia, or eosinophilia (parasites)" },
        { name: "CRP / ESR", reason: "Inflammatory markers — elevated in IBD, bacterial infection" },
        { name: "Stool Calprotectin", reason: "Marker of intestinal inflammation — elevated in IBD, not IBS" },
        { name: "Electrolytes", reason: "To assess dehydration and electrolyte loss from diarrhoea" },
        { name: "Anti-tTG IgA", reason: "For suspected coeliac disease — initial serological test" },
        { name: "Kidney Function Tests", reason: "When dehydration is significant" },
      ],
      faqs: [
        { q: "When does diarrhoea need a doctor?", a: "Seek medical attention if diarrhoea lasts more than 2 days without improvement, is accompanied by blood, involves significant dehydration, comes with high fever or severe abdominal pain, or occurs in an elderly or immunocompromised patient." },
        { q: "Is oral rehydration solution (ORS) important?", a: "Yes. The biggest risk with acute diarrhoea is dehydration. Oral rehydration with ORS is the primary treatment for most cases of gastroenteritis, regardless of whether an antibiotic is used." },
        { q: "Does diarrhoea always need antibiotics?", a: "No. Most acute diarrhoea from viral causes does not benefit from antibiotics. Targeted antibiotic treatment may be appropriate for confirmed or strongly suspected bacterial infections based on clinical assessment." },
      ],
      clinicalNote: "QXL Diagnostics provides stool examinations, stool culture, stool calprotectin, blood tests and coeliac serology with home sample collection across Bengaluru.",
      relatedTopics: [
        { title: "Nausea & Vomiting", url: "/health/nausea-vomiting-causes" },
        { title: "Stomach Pain Causes", url: "/health/stomach-abdominal-pain-causes" },
        { title: "Unexplained Weight Loss", url: "/health/unexplained-weight-loss" },
        { title: "Fever Causes", url: "/health/fever-causes" },
      ],
    }} />
  );
}
