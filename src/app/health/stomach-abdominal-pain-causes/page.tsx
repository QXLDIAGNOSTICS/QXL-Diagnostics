import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Stomach Pain: Abdominal Pain Causes & Tests | QXL Diagnostics",
  description: "Stomach or abdominal pain may come from gastritis, ulcers, gallstones, pancreas, bowel, appendix, urinary or gynaecological causes. Learn warning signs.",
  alternates: { canonical: `${SITE_URL}/health/stomach-abdominal-pain-causes` },
};
export default function StomachPainPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/stomach-abdominal-pain-causes",
      seoTitle: "Stomach Pain: Abdominal Pain Causes & Tests | QXL Diagnostics",
      metaDescription: "Stomach or abdominal pain may come from gastritis, ulcers, gallstones, pancreas, bowel, appendix, urinary or gynaecological causes. Learn warning signs.",
      h1: "Stomach Pain: Why Does My Abdomen Hurt? Causes, Tests and Warning Signs",
      primaryKeyword: "stomach pain", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Abdominal pain is one of the most common reasons people seek medical attention. The location, character, timing and associated symptoms of the pain provide important clinical clues to its cause. Some causes of abdominal pain are emergencies requiring immediate attention.",
      quickAnswer: "Stomach or abdominal pain can arise from many organs: stomach, small intestine, large intestine, gallbladder, liver, pancreas, kidneys, bladder, uterus and ovaries. The cause varies depending on where the pain is, how it started and what makes it better or worse.",
      causes: [
        { title: "Gastritis & Peptic Ulcer Disease", description: "Inflammation of the stomach lining (gastritis) or ulcers in the stomach or duodenum typically cause upper abdominal burning or discomfort, often related to meals, empty stomach, NSAIDs or H. pylori infection. Pain may radiate to the back." },
        { title: "Irritable Bowel Syndrome (IBS)", description: "A common functional bowel disorder causing cramping abdominal pain, bloating, and alternating diarrhoea and constipation. Pain is often relieved by passing stool. No structural abnormality is found on investigations." },
        { title: "Gallstones & Biliary Colic", description: "Right upper abdominal or epigastric pain, often occurring after fatty meals, associated with nausea and vomiting. Severe pain can indicate biliary colic. Fever and jaundice may indicate cholecystitis or cholangitis." },
        { title: "Appendicitis", description: "Pain typically begins around the navel and moves to the right lower abdomen. Accompanied by nausea, vomiting, fever and tenderness. Appendicitis is a surgical emergency — do not delay evaluation." },
        { title: "Pancreatitis", description: "Severe upper abdominal pain radiating to the back, often worsened by eating and partially relieved by leaning forward. Associated with nausea, vomiting and tenderness. Can be caused by gallstones or alcohol." },
        { title: "Constipation", description: "Hard, infrequent stools with discomfort and bloating. A very common cause of abdominal pain, particularly in the lower abdomen and left side. Usually not dangerous but can be persistent." },
        { title: "Urinary Tract Infection & Kidney Stones", description: "UTI causes lower abdominal pain with burning urination and frequency. Kidney stones cause severe loin-to-groin pain (renal colic), often with blood in urine, nausea and vomiting." },
        { title: "Gastrointestinal Infections", description: "Viral gastroenteritis, food poisoning, bacterial infections (salmonella, E. coli, campylobacter) and parasitic infections cause cramping abdominal pain with diarrhoea, nausea, vomiting and sometimes fever." },
        { title: "Inflammatory Bowel Disease (Crohn's / Ulcerative Colitis)", description: "Chronic relapsing abdominal pain and diarrhoea (often bloody in UC). May be associated with weight loss, fatigue and extra-intestinal features such as joint pain or skin changes." },
        { title: "Gynaecological Causes (Women)", description: "Ovarian cysts, endometriosis, pelvic inflammatory disease (PID) and ectopic pregnancy can all cause lower abdominal pain in women. Severe sudden pelvic pain may represent an ectopic pregnancy — a surgical emergency." },
      ],
      redFlags: [
        "🚨 Sudden severe abdominal pain — especially if rigid abdomen",
        "🚨 Abdominal pain with fever and vomiting suggesting appendicitis or peritonitis",
        "🚨 Abdominal pain with jaundice (yellow eyes/skin)",
        "🚨 Abdominal pain with blood in stool or black tarry stools",
        "🚨 Abdominal pain with blood in vomit",
        "🚨 Severe right lower abdominal pain with fever (possible appendicitis)",
        "🚨 Severe sudden lower abdominal pain in a woman who could be pregnant (possible ectopic)",
        "🚨 Abdominal pain with rapidly worsening weakness, low blood pressure or shock",
        "Abdominal pain with significant unintentional weight loss",
        "Persistent abdominal pain without explanation lasting more than 2 weeks",
      ],
      tests: [
        { name: "CBC", reason: "To assess for infection, anaemia or inflammatory markers" },
        { name: "CRP / ESR", reason: "Inflammation markers — elevated in infection, IBD or pancreatitis" },
        { name: "Liver Function Tests", reason: "For jaundice, biliary disease, hepatitis or suspected liver cause" },
        { name: "Amylase / Lipase", reason: "Elevated in pancreatitis" },
        { name: "Urine Routine & Culture", reason: "For suspected urinary tract infection or kidney stones" },
        { name: "Stool Examination / Culture", reason: "For suspected gastrointestinal infection or parasite" },
        { name: "H. pylori Testing", reason: "Stool antigen or breath test for suspected peptic ulcer disease" },
        { name: "Kidney Function Tests", reason: "When renal cause is suspected or dehydration is significant" },
        { name: "Ultrasound Abdomen", reason: "First-line imaging for gallstones, kidney stones, organ enlargement — not a lab test" },
      ],
      faqs: [
        { q: "Where is appendicitis pain felt?", a: "Appendicitis typically begins as pain around the navel that then moves to the right lower abdomen. It is usually accompanied by nausea, vomiting, fever and tenderness on pressing the right lower abdomen." },
        { q: "Can gas cause severe abdominal pain?", a: "Gas and trapped wind can cause cramping discomfort. However, severe, persistent or worsening abdominal pain should not be dismissed as gas without medical evaluation, especially with fever or other symptoms." },
        { q: "What blood tests are done for stomach pain?", a: "CBC, CRP, liver function tests, amylase (for pancreatitis) and urine tests are commonly used. Specific tests depend on the location of pain and associated symptoms." },
      ],
      clinicalNote: "QXL Diagnostics provides CBC, liver function tests, amylase, urine tests, stool examinations and H. pylori testing with home sample collection across Bengaluru.",
      relatedTopics: [
        { title: "Nausea & Vomiting", url: "/health/nausea-vomiting-causes" },
        { title: "Diarrhoea: Loose Motion Causes", url: "/health/diarrhoea-loose-motion-causes" },
        { title: "Unexplained Weight Loss", url: "/health/unexplained-weight-loss" },
        { title: "Fever Causes", url: "/health/fever-causes" },
      ],
    }} />
  );
}
