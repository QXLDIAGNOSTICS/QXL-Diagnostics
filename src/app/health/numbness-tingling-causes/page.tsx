import type { Metadata } from "next";
import { SITE_URL } from "@/lib/businessInfo";
import SymptomPageLayout from "@/components/SymptomPageLayout";
export const metadata: Metadata = {
  title: "Numbness & Tingling: Causes & Warning Signs | QXL Diagnostics",
  description: "Pins and needles, numbness and tingling in hands or feet may be caused by Vitamin B12 deficiency, diabetes, nerve compression, thyroid disease or neurological conditions.",
  alternates: { canonical: `${SITE_URL}/health/numbness-tingling-causes` },
};
export default function NumbnessTinglingPage() {
  return (
    <SymptomPageLayout data={{
      url: "/health/numbness-tingling-causes",
      seoTitle: "Numbness & Tingling: Causes & Warning Signs | QXL Diagnostics",
      metaDescription: "Pins and needles, numbness and tingling in hands or feet may be caused by Vitamin B12 deficiency, diabetes, nerve compression, thyroid disease or neurological conditions.",
      h1: "Numbness & Tingling: Why Do My Hands or Feet Feel Pins and Needles?",
      primaryKeyword: "numbness and tingling", lastReviewed: "2026-09-11",
      reviewedBy: "Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder & CEO, QXL Diagnostics Super Speciality Lab, Bengaluru",
      parentHub: "/health/symptoms-causes",
      intro: "Numbness, tingling or pins-and-needles sensation (paraesthesia) in the hands, feet or other parts of the body can arise from compression, metabolic causes, nutritional deficiencies or neurological conditions. Sudden new numbness or weakness on one side of the body is a medical emergency.",
      quickAnswer: "Common causes of numbness and tingling include Vitamin B12 deficiency, diabetes (peripheral neuropathy), carpal tunnel syndrome, nerve compression in the neck or back, hypothyroidism and anxiety. Sudden one-sided numbness or weakness is a stroke warning sign.",
      causes: [
        { title: "Vitamin B12 Deficiency (Peripheral Neuropathy)", description: "B12 deficiency is a very common and treatable cause of pins-and-needles, numbness and burning sensation in the feet and hands. May also cause balance problems, memory difficulty and fatigue. Common in vegetarians, vegans, those with poor absorption and long-term metformin users. Serum Vitamin B12 testing is confirmatory." },
        { title: "Diabetic Peripheral Neuropathy", description: "Long-standing or poorly controlled diabetes damages peripheral nerves, typically causing symmetric tingling, numbness or burning beginning in the feet and gradually progressing up the legs ('glove and stocking' pattern). HbA1c and fasting glucose are key tests." },
        { title: "Carpal Tunnel Syndrome", description: "Compression of the median nerve at the wrist causes tingling, numbness and pain in the thumb, index, middle and part of the ring finger — particularly at night or with certain hand positions. More common in women, those doing repetitive wrist activities, those with hypothyroidism, diabetes or pregnancy." },
        { title: "Nerve Compression in Neck or Back", description: "Disc prolapse or spondylosis compressing a nerve root causes pain and tingling radiating down the arm or leg (radiculopathy). The distribution helps localise the affected nerve root." },
        { title: "Hypothyroidism", description: "Thyroid underactivity can cause peripheral neuropathy and carpal tunnel syndrome through tissue accumulation and metabolic effects. TSH is the key test." },
        { title: "Alcohol-Related Neuropathy", description: "Chronic excessive alcohol use damages peripheral nerves, causing symmetric tingling and numbness beginning in the feet. Often combined with Vitamin B12 and folate deficiency." },
        { title: "Hyperventilation & Anxiety", description: "Rapid breathing causes low blood carbon dioxide, leading to tingling around the mouth, in the hands and feet, and sometimes muscle spasms. Typically resolves when breathing normalises." },
        { title: "Transient Ischaemic Attack (TIA) or Stroke", description: "A TIA or stroke can cause sudden numbness or weakness on one side of the face, arm or leg. This is a medical emergency. Do not delay evaluation for sudden one-sided neurological symptoms." },
        { title: "Autoimmune Neuropathies", description: "Conditions such as Guillain-Barré syndrome cause rapidly progressive ascending numbness and weakness. Multiple sclerosis can cause tingling and sensory symptoms in discrete locations. Both require urgent evaluation." },
        { title: "Lyme Disease & Other Infections", description: "Certain infections can affect peripheral nerves — though Lyme disease is uncommon in India, other infectious neuropathies including leprosy must be considered in appropriate contexts." },
      ],
      redFlags: [
        "🚨 Sudden numbness or weakness on one side of the body — possible stroke or TIA",
        "🚨 Sudden facial droop, arm drift or speech difficulty with numbness — stroke emergency",
        "🚨 Rapidly progressive ascending numbness and weakness affecting breathing (possible GBS)",
        "🚨 Numbness after significant spinal injury",
        "Numbness with difficulty walking or balance problems",
        "Numbness with loss of bladder or bowel control",
        "Persistent numbness that started suddenly without obvious position/pressure cause",
        "Numbness with significant muscle wasting",
      ],
      tests: [
        { name: "Serum Vitamin B12", reason: "Important and treatable cause of peripheral neuropathy and paraesthesia" },
        { name: "Fasting Glucose / HbA1c", reason: "To diagnose or monitor diabetic neuropathy" },
        { name: "TSH (Thyroid Profile)", reason: "Hypothyroidism causes carpal tunnel syndrome and peripheral neuropathy" },
        { name: "CBC", reason: "Macrocytic anaemia may accompany B12 deficiency" },
        { name: "Serum Folate", reason: "Often tested alongside B12, particularly in vegetarians" },
        { name: "Kidney Function Tests", reason: "Uraemia from renal failure can cause peripheral neuropathy" },
        { name: "Calcium / Magnesium", reason: "Electrolyte disturbances cause tingling and muscle cramps" },
        { name: "Electrolytes", reason: "Low potassium or sodium can affect nerve function" },
        { name: "Nerve Conduction Study (NCS)", reason: "Definitive test for peripheral neuropathy type and severity — not a blood test" },
      ],
      faqs: [
        { q: "Can Vitamin B12 deficiency cause pins and needles?", a: "Yes. B12 deficiency is one of the most important and treatable causes of peripheral neuropathy, causing tingling, numbness, burning sensation in the hands and feet, and sometimes balance problems." },
        { q: "Can diabetes cause numbness in the feet?", a: "Yes. Diabetic peripheral neuropathy is very common in people with long-standing or poorly controlled diabetes, typically starting in the feet and gradually progressing upward." },
        { q: "Is numbness in hands always carpal tunnel syndrome?", a: "Not always. Numbness in the thumb, index and middle fingers, particularly at night or with wrist flexion, is characteristic of carpal tunnel syndrome. But nerve compression at the neck, diabetes and B12 deficiency can cause similar symptoms." },
        { q: "Is sudden numbness on one side of the body an emergency?", a: "Yes. Sudden numbness or weakness involving one side of the face, arm or leg — especially with speech difficulty — is a stroke warning sign and requires immediate emergency attention." },
      ],
      clinicalNote: "QXL Diagnostics provides Vitamin B12, HbA1c, TSH, CBC and other investigations with home collection across Bengaluru.",
      relatedTopics: [
        { title: "Dizziness Causes", url: "/health/dizziness-causes" },
        { title: "Fatigue & Tiredness", url: "/health/fatigue-tiredness" },
        { title: "Body Pain & Muscle Aches", url: "/health/body-pain-muscle-aches-causes" },
        { title: "Frequent Urination & Excessive Thirst", url: "/health/frequent-urination-excessive-thirst-causes" },
      ],
    }} />
  );
}
