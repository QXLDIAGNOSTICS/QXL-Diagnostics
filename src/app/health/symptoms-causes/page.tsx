import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  Activity,
  Thermometer,
  Wind,
  ZapOff,
  Eye,
  Scissors,
  Scale,
  AlertCircle,
  Droplets,
  Bone,
  Waves,
  Zap,
  Sun,
  RefreshCw,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { SITE_URL } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "Symptoms & Causes: Common Health Symptoms | QXL Diagnostics",
  description:
    "Understand common symptoms, possible causes, warning signs and when laboratory tests may be considered. Clinically reviewed health information from QXL Diagnostics.",
  alternates: { canonical: `${SITE_URL}/health/symptoms-causes` },
  openGraph: {
    title: "Symptoms & Causes: Common Health Symptoms | QXL Diagnostics",
    description:
      "Understand common symptoms, possible causes, warning signs and when laboratory tests may be considered. Clinically reviewed health information from QXL Diagnostics.",
    url: `${SITE_URL}/health/symptoms-causes`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

const symptoms = [
  {
    title: "Headache",
    subtitle: "Why Do I Have a Headache?",
    url: "/health/headache-causes",
    icon: Activity,
    color: "blue",
    tags: ["Migraine", "Tension", "Dehydration", "Fever"],
    urgency: "emergency-possible",
  },
  {
    title: "Fever",
    subtitle: "Causes, Warning Signs & When Tests May Be Needed",
    url: "/health/fever-causes",
    icon: Thermometer,
    color: "red",
    tags: ["Viral", "Dengue", "Malaria", "Infection"],
    urgency: "emergency-possible",
  },
  {
    title: "Cough",
    subtitle: "Causes, Types, Tests and Warning Signs",
    url: "/health/cough-causes",
    icon: Wind,
    color: "sky",
    tags: ["Dry", "Wet", "Persistent", "Respiratory"],
    urgency: "emergency-possible",
  },
  {
    title: "Fatigue & Tiredness",
    subtitle: "Why Am I Always Tired?",
    url: "/health/fatigue-tiredness",
    icon: ZapOff,
    color: "amber",
    tags: ["Anaemia", "Thyroid", "Diabetes", "Sleep"],
    urgency: "routine",
  },
  {
    title: "Dizziness",
    subtitle: "Why Do I Feel Dizzy?",
    url: "/health/dizziness-causes",
    icon: RefreshCw,
    color: "purple",
    tags: ["Vertigo", "BP", "Anaemia", "Glucose"],
    urgency: "emergency-possible",
  },
  {
    title: "Hair Loss",
    subtitle: "Why Is My Hair Falling?",
    url: "/health/hair-loss-causes",
    icon: Scissors,
    color: "pink",
    tags: ["Iron deficiency", "Thyroid", "PCOS", "Stress"],
    urgency: "routine",
  },
  {
    title: "Unexplained Weight Loss",
    subtitle: "Why Am I Losing Weight Without Trying?",
    url: "/health/unexplained-weight-loss",
    icon: Scale,
    color: "teal",
    tags: ["Diabetes", "Thyroid", "Infection", "GI"],
    urgency: "urgent",
  },
  {
    title: "Chest Pain",
    subtitle: "Causes, Tests and Emergency Warning Signs",
    url: "/health/chest-pain-causes",
    icon: Heart,
    color: "red",
    tags: ["Cardiac", "Reflux", "Pulmonary", "Anxiety"],
    urgency: "emergency",
  },
  {
    title: "Shortness of Breath",
    subtitle: "Why Am I Breathless?",
    url: "/health/shortness-of-breath-causes",
    icon: Wind,
    color: "sky",
    tags: ["Asthma", "Anaemia", "Heart", "Lung"],
    urgency: "emergency-possible",
  },
  {
    title: "Stomach Pain",
    subtitle: "Why Does My Abdomen Hurt?",
    url: "/health/stomach-abdominal-pain-causes",
    icon: AlertCircle,
    color: "orange",
    tags: ["Gastritis", "Gallstones", "IBS", "Appendix"],
    urgency: "emergency-possible",
  },
  {
    title: "Nausea & Vomiting",
    subtitle: "Why Do I Feel Sick?",
    url: "/health/nausea-vomiting-causes",
    icon: Waves,
    color: "emerald",
    tags: ["Infection", "Pregnancy", "Migraine", "Medicines"],
    urgency: "emergency-possible",
  },
  {
    title: "Diarrhoea",
    subtitle: "Why Do I Have Loose Motions?",
    url: "/health/diarrhoea-loose-motion-causes",
    icon: Droplets,
    color: "blue",
    tags: ["Infection", "IBS", "IBD", "Food poisoning"],
    urgency: "emergency-possible",
  },
  {
    title: "Joint Pain",
    subtitle: "Why Do My Joints Hurt?",
    url: "/health/joint-pain-causes",
    icon: Bone,
    color: "amber",
    tags: ["Arthritis", "Gout", "Autoimmune", "Infection"],
    urgency: "routine",
  },
  {
    title: "Body Pain & Muscle Aches",
    subtitle: "Why Does My Whole Body Hurt?",
    url: "/health/body-pain-muscle-aches-causes",
    icon: Zap,
    color: "purple",
    tags: ["Viral", "Thyroid", "Vitamin D", "Fibromyalgia"],
    urgency: "routine",
  },
  {
    title: "Swelling of Feet, Ankles or Face",
    subtitle: "Why Am I Retaining Fluid?",
    url: "/health/swelling-feet-ankles-face-causes",
    icon: Waves,
    color: "teal",
    tags: ["Heart", "Kidney", "Liver", "Thyroid"],
    urgency: "urgent",
  },
  {
    title: "Frequent Urination & Excessive Thirst",
    subtitle: "Why Am I Peeing So Often?",
    url: "/health/frequent-urination-excessive-thirst-causes",
    icon: Droplets,
    color: "sky",
    tags: ["Diabetes", "UTI", "Kidney", "Medicines"],
    urgency: "urgent",
  },
  {
    title: "Numbness & Tingling",
    subtitle: "Why Do My Hands or Feet Feel Pins and Needles?",
    url: "/health/numbness-tingling-causes",
    icon: Zap,
    color: "indigo",
    tags: ["Diabetes", "B12", "Nerve", "Thyroid"],
    urgency: "emergency-possible",
  },
  {
    title: "Skin Rash & Itching",
    subtitle: "Why Is My Skin Itchy or Breaking Out?",
    url: "/health/skin-rash-itching-causes",
    icon: Sun,
    color: "orange",
    tags: ["Allergy", "Eczema", "Infection", "Liver"],
    urgency: "emergency-possible",
  },
  {
    title: "Recurrent Infections",
    subtitle: "Why Do I Keep Getting Sick?",
    url: "/health/recurrent-infections-causes",
    icon: RefreshCw,
    color: "rose",
    tags: ["Immunity", "Diabetes", "Chronic disease", "Medicines"],
    urgency: "urgent",
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; tag: string; tagText: string }> = {
  blue: { bg: "bg-blue-50", border: "hover:border-blue-400", icon: "text-blue-600 bg-blue-50", tag: "bg-blue-100", tagText: "text-blue-700" },
  red: { bg: "bg-red-50", border: "hover:border-red-400", icon: "text-red-600 bg-red-50", tag: "bg-red-100", tagText: "text-red-700" },
  sky: { bg: "bg-sky-50", border: "hover:border-sky-400", icon: "text-sky-600 bg-sky-50", tag: "bg-sky-100", tagText: "text-sky-700" },
  amber: { bg: "bg-amber-50", border: "hover:border-amber-400", icon: "text-amber-600 bg-amber-50", tag: "bg-amber-100", tagText: "text-amber-700" },
  purple: { bg: "bg-purple-50", border: "hover:border-purple-400", icon: "text-purple-600 bg-purple-50", tag: "bg-purple-100", tagText: "text-purple-700" },
  pink: { bg: "bg-pink-50", border: "hover:border-pink-400", icon: "text-pink-600 bg-pink-50", tag: "bg-pink-100", tagText: "text-pink-700" },
  teal: { bg: "bg-teal-50", border: "hover:border-teal-400", icon: "text-teal-600 bg-teal-50", tag: "bg-teal-100", tagText: "text-teal-700" },
  orange: { bg: "bg-orange-50", border: "hover:border-orange-400", icon: "text-orange-600 bg-orange-50", tag: "bg-orange-100", tagText: "text-orange-700" },
  emerald: { bg: "bg-emerald-50", border: "hover:border-emerald-400", icon: "text-emerald-600 bg-emerald-50", tag: "bg-emerald-100", tagText: "text-emerald-700" },
  indigo: { bg: "bg-indigo-50", border: "hover:border-indigo-400", icon: "text-indigo-600 bg-indigo-50", tag: "bg-indigo-100", tagText: "text-indigo-700" },
  rose: { bg: "bg-rose-50", border: "hover:border-rose-400", icon: "text-rose-600 bg-rose-50", tag: "bg-rose-100", tagText: "text-rose-700" },
};

const urgencyBadge: Record<string, { label: string; style: string }> = {
  emergency: { label: "🚨 Emergency Warning Signs Present", style: "bg-red-100 text-red-800 border-red-200" },
  "emergency-possible": { label: "⚠️ Can Have Urgent Signs", style: "bg-amber-100 text-amber-800 border-amber-200" },
  urgent: { label: "⏱ See a Doctor Promptly", style: "bg-orange-100 text-orange-800 border-orange-200" },
  routine: { label: "✓ Often Routine Evaluation", style: "bg-emerald-100 text-emerald-800 border-emerald-200" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Health", item: `${SITE_URL}/health` },
    { "@type": "ListItem", position: 3, name: "Symptoms & Causes", item: `${SITE_URL}/health/symptoms-causes` },
  ],
};

export default function SymptomsCausesHubPage() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #2563eb 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 50%)" }} />
        <div className="max-w-[1260px] mx-auto px-4 relative z-10">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[11px] text-sky-300 mb-5 font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Symptoms &amp; Causes</span>
          </nav>

          <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Clinically Reviewed Health Information
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight text-white tracking-tight max-w-4xl">
            Symptoms &amp; Causes: Understand What Your Body May Be Telling You
          </h1>
          <p className="text-sky-200 text-base md:text-lg font-semibold leading-relaxed max-w-3xl mb-6">
            Symptoms such as headache, fever, tiredness, dizziness, cough, hair loss, weight loss, joint pain or frequent urination can have many possible causes. Sometimes the explanation is temporary and uncomplicated. At other times, persistent, severe or unexplained symptoms need medical assessment and selected investigations.
          </p>

          <div className="bg-white/8 border border-white/15 rounded-2xl p-5 max-w-3xl">
            <p className="text-xs text-sky-100 font-bold mb-3">The QXL Symptoms &amp; Causes Health Hub answers four questions clearly:</p>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                "What could be causing the symptom?",
                "Which warning signs should not be ignored?",
                "When should medical care be sought?",
                "Which laboratory investigations may be considered?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-sky-200 font-semibold">
                  <div className="w-5 h-5 rounded-full bg-[#D69A18]/20 border border-[#D69A18]/40 text-[#D69A18] flex items-center justify-center text-[10px] font-black shrink-0">
                    {i + 1}
                  </div>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="flex items-center gap-2 text-xs text-sky-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All articles medically reviewed by Dr. Shantakumar Muruda, MD</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-sky-200 font-bold">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Last reviewed: September 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLINICAL PRINCIPLE ── */}
      <div className="max-w-[1260px] mx-auto px-4 py-6">
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 font-semibold leading-relaxed">
            <strong className="text-[#0f2d5e]">Clinical principle:</strong> Laboratory tests should support a clinical assessment, not replace it. A symptom alone is not a reason to order every available test. Always consult a qualified healthcare professional before requesting investigations.
          </p>
        </div>
      </div>

      {/* ── URGENCY LEGEND ── */}
      <div className="max-w-[1260px] mx-auto px-4 pb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-black text-slate-600">Guide:</span>
          {Object.values(urgencyBadge).map((b, i) => (
            <span key={i} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${b.style}`}>{b.label}</span>
          ))}
        </div>
      </div>

      {/* ── SYMPTOM GRID ── */}
      <section className="max-w-[1260px] mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {symptoms.map((symptom, i) => {
            const colors = colorMap[symptom.color] || colorMap.blue;
            const urgency = urgencyBadge[symptom.urgency];
            return (
              <Link
                key={i}
                href={symptom.url}
                className={`bg-white rounded-3xl border border-slate-200 p-6 flex flex-col gap-4 transition-all hover:shadow-md ${colors.border} group`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${colors.icon} group-hover:scale-110 transition-transform`}>
                    <symptom.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-black text-[#0f2d5e] text-base leading-tight">{symptom.title}</h2>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-tight">{symptom.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {symptom.tags.map((tag, j) => (
                    <span key={j} className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${colors.tag} ${colors.tagText}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${urgency.style}`}>
                    {urgency.label}
                  </span>
                  <span className="text-[#D69A18] font-black text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-[#0f2d5e] mb-5">How to Use These Articles</h2>
            <p className="text-sm text-slate-600 font-semibold leading-relaxed mb-6">
              Start with the symptom that best matches the problem. Each page explains common causes first, then important less-common causes, red flags, tests that may be considered, and related QXL health topics. Emergency symptoms are clearly separated from non-urgent laboratory pathways.
            </p>

            <h3 className="text-base font-extrabold text-[#0f2d5e] mb-3">QXL&apos;s Approach to Symptom-Based Testing</h3>
            <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-semibold text-slate-700">
              {["Symptom", "Safety triage", "Clinical pattern", "Likely cause", "Appropriate investigation", "Clinical care"].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-xs font-extrabold text-[#0f2d5e] text-center whitespace-nowrap">
                    {step}
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-[#D69A18] shrink-0 hidden md:block" />}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-4">
              Not: <span className="line-through text-red-400">Symptom → buy a large test package</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── MEDICAL REVIEW ── */}
      <section className="py-14 max-w-[1260px] mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-slate-100 rounded-2xl p-6 border border-slate-200">
          <h2 className="text-base font-extrabold text-[#0f2d5e] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Medical Review
          </h2>
          <p className="text-xs text-slate-600 font-semibold">
            <strong>Medically reviewed by:</strong> Dr. Shantakumar Muruda, MD - Medical Biochemistry; Founder &amp; CEO, QXL Diagnostics Super Speciality Lab, Bengaluru
          </p>
          <p className="text-xs text-slate-600 font-semibold mt-2">
            <strong>Last medically reviewed:</strong> 2026-09-11
          </p>
          <p className="text-xs text-slate-500 font-semibold mt-3 leading-relaxed">
            <strong>Medical Disclaimer:</strong> This information is intended for general health education and does not replace consultation, diagnosis or treatment by a qualified healthcare professional. Seek urgent medical attention for severe, sudden or rapidly worsening symptoms or any emergency warning signs described on the individual symptom pages.
          </p>
        </div>
      </section>
    </div>
  );
}
