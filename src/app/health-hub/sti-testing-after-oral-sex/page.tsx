import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  Stethoscope,
  BookOpen,
  Phone,
  MessageSquare
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "STI Testing After Oral Sex: Throat Gonorrhea & Chlamydia NAAT | QXL Diagnostics",
  description:
    "Clinical guide to sore throat after oral sex and pharyngeal STI testing. Why urine tests miss oral infections, CDC throat swab NAAT recommendations, and confidential testing in Bengaluru.",
  alternates: {
    canonical: `${SITE_URL}/health-hub/sti-testing-after-oral-sex`,
  },
  openGraph: {
    title: "STI Testing After Oral Sex: Throat Gonorrhea & Chlamydia | QXL Diagnostics",
    description:
      "Understand pharyngeal gonorrhea, oral chlamydia, and syphilis testing after oral sex. Why anatomical-site swabs are mandatory.",
    url: `${SITE_URL}/health-hub/sti-testing-after-oral-sex`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function StiTestingAfterOralSexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/health-hub/sti-testing-after-oral-sex#webpage`,
        "url": `${SITE_URL}/health-hub/sti-testing-after-oral-sex`,
        "name": "STI Testing After Oral Sex: Pharyngeal Gonorrhea & Chlamydia Clinical Guide",
        "description": "Evidence-based overview of extragenital sexually transmitted infections, pharyngeal swab NAAT protocols, and diagnostic limitations of urine tests.",
        "publisher": {
          "@type": "DiagnosticLab",
          "name": "QXL Diagnostics",
          "url": SITE_URL
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
          { "@type": "ListItem", "position": 2, "name": "Sexual Health Hub", "item": `${SITE_URL}/sexual-health` },
          { "@type": "ListItem", "position": 3, "name": "STI Testing After Oral Sex", "item": `${SITE_URL}/health-hub/sti-testing-after-oral-sex` }
        ]
      }
    ]
  };

  const pathogens = [
    {
      name: "Pharyngeal Neisseria gonorrhoeae",
      frequency: "Most Common Bacterial Throat STI",
      symptoms: "Usually asymptomatic (>85%). When symptomatic: persistent sore throat, difficulty swallowing, red pharynx, cervical lymph node swelling.",
      diagnosticTest: "Pharyngeal Swab Nucleic Acid Amplification Test (NAAT / PCR)",
      note: "Pharyngeal gonorrhea is a major driver of antimicrobial resistance and is significantly harder to eradicate than urogenital gonorrhea."
    },
    {
      name: "Pharyngeal Chlamydia trachomatis",
      frequency: "Common, Underdiagnosed",
      symptoms: "Almost entirely asymptomatic. Rarely causes mild pharyngitis or tonsillar erythema.",
      diagnosticTest: "Pharyngeal Swab Real-Time PCR (NAAT)",
      note: "Standard urine tests will be completely negative if the infection is localized solely to the pharynx."
    },
    {
      name: "Oral Syphilis (Treponema pallidum)",
      frequency: "Moderate Frequency",
      symptoms: "Primary oral chancre (firm, painless ulcer on the lip, tongue, or tonsil) or secondary mucous patches (grayish-white erosion).",
      diagnosticTest: "Serological Dual Testing (Quantitative RPR + TPHA reflex)",
      note: "Often mistaken for a common canker sore (aphthous ulcer), but a syphilitic chancre is indurated and typically painless."
    },
    {
      name: "Oral Herpes Simplex (HSV-1 / HSV-2)",
      frequency: "Very Common",
      symptoms: "Painful fluid-filled blisters (cold sores) on the lips, vermilion border, gums, or pharynx that crust over.",
      diagnosticTest: "Lesion swab Real-Time PCR / Type-specific IgG serology",
      note: "Can be transmitted bidirectionally between mouth and genitalia during oral intimacy."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="oral-sti-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">STI Testing After Oral Sex</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Extragenital Clinical Protocol
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              STI Testing After Oral Sex: Throat Gonorrhea &amp; Chlamydia
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Why routine urine tests fail to detect throat STIs, how pharyngeal swab NAAT works, and when to get tested after oral exposure.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to enquire about pharyngeal throat swab STI testing.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire / Book Throat Swab</span>
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="bg-white/10 hover:bg-white/20 text-white font-bold border border-white/30 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Core Clinical Myth Busting */}
        <div className="p-6 rounded-3xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 leading-relaxed space-y-2">
          <strong className="text-base text-amber-950 block font-black">
            The Critical Diagnostic Limitation of Urine Testing:
          </strong>
          <p>
            A common misconception is that providing a urine sample checks for &ldquo;all STIs.&rdquo; In reality, a urine PCR test ONLY detects bacteria colonizing the urethra.
          </p>
          <p>
            Per the US CDC Sexually Transmitted Infections Treatment Guidelines and Koneman&apos;s Diagnostic Microbiology, <strong>over 85% of pharyngeal gonorrhea and chlamydia infections are extragenital and asymptomatic</strong>. If your exposure was oral, an anatomical-site throat swab is medically mandatory.
          </p>
        </div>

        {/* Pathogen Cards */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Infectious Pathogens</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Common Pathogens Transmitted During Oral Intimacy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathogens.map((p, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-black text-[#0c4a6e]">{p.name}</h3>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {p.frequency}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Clinical Presentation:</strong> {p.symptoms}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Appropriate Test:</strong> <span className="text-[#2563eb] font-bold">{p.diagnosticTest}</span>
                </p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                  {p.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Swab Collection Preparation */}
        <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700">
          <h3 className="text-xl font-black text-[#0c4a6e]">
            How to Prepare for a Pharyngeal Swab
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
            <li><strong>Optimal Window:</strong> Test 7 to 14 days after oral exposure to allow adequate bacterial replication for molecular detection.</li>
            <li><strong>Pre-test preparation:</strong> Do not use antibacterial mouthwash, throat lozenges, or gargles for at least 1 hour prior to collection.</li>
            <li><strong>Procedure:</strong> A clinical provider gently swabs the posterior oropharynx and tonsillar pillars using a sterile Dacron or flocked swab. The procedure takes less than 10 seconds.</li>
          </ul>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/health-hub/sti-testing-after-oral-sex" />
      </main>
    </div>
  );
}

