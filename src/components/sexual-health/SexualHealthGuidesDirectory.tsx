import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Phone,
  Compass,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Activity,
  Microscope,
  FileCheck2,
  Users2,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164 } from '@/lib/businessInfo';

interface GuideLink {
  title: string;
  href: string;
}

interface GuideCategory {
  title: string;
  icon: React.ReactNode;
  badge: string;
  links: GuideLink[];
}

const CATEGORIES: GuideCategory[] = [
  {
    title: "After Sexual Exposure",
    badge: "Exposure Assessment",
    icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
    links: [
      { title: "STI Testing After Unprotected Sex in Bangalore", href: "/health-hub/after-unprotected-sex" },
      { title: "Condom Broke or Slipped During Sex – STI Testing and Urgent Advice", href: "/sexual-health/condom-break-sti-testing" },
      { title: "STI Testing Window Periods – When to Test After Sexual Exposure", href: "/sexual-health/sti-testing-window-periods" },
      { title: "Fourth-Generation HIV Testing After Exposure in Bangalore", href: "/sexual-health/hiv-testing-after-exposure" },
      { title: "HIV PEP and PrEP – Urgent Care, Baseline and Follow-Up Testing", href: "/sexual-health/hiv-pep-prep-testing" },
      { title: "STI Screening After Oral Sex – Throat Swab PCR & Comprehensive Blood Testing", href: "/sexual-health/sti-testing-after-oral-sex" },
      { title: "STI Testing After Anal Sex – Rectal Swab NAAT in Bengaluru", href: "/sexual-health/sti-testing-after-anal-sex" },
      { title: "STI Testing After Vaginal Sex – Blood, Urine and Genital Swabs", href: "/sexual-health/sti-testing-after-vaginal-sex" },
      { title: "STI Screening Without Symptoms – Testing After a New Partner", href: "/sexual-health/asymptomatic-sti-screening" }
    ]
  },
  {
    title: "Symptoms and Differential Diagnosis",
    badge: "Symptom Investigation",
    icon: <Activity className="w-5 h-5 text-amber-600" />,
    links: [
      { title: "Penile Discharge, Burning Urine and Private-Part Pain After Sex", href: "/sexual-health/genital-discharge-and-burning" },
      { title: "Private-Part Itching, Redness, Burning and Genital Skin Irritation", href: "/sexual-health/genital-itching-and-irritation" },
      { title: "Genital Sores, Blisters, Boils, Marks and Ulcers After Sex", href: "/sexual-health/genital-sores-blisters-ulcers" },
      { title: "Vaginal Discharge, Itching, Odour and Burning After Sex", href: "/sexual-health/vaginal-discharge-testing" },
      { title: "Sore Throat, Mouth Ulcers or White Tonsil Spots After Oral Sex", href: "/sexual-health/oral-throat-symptoms" },
      { title: "Fever, Rash, Swollen Glands or HIV Anxiety After Sex", href: "/sexual-health/hiv-symptoms-and-anxiety" },
      { title: "UTI vs STI – Burning Urine, Urethritis and Urine PCR Testing", href: "/sexual-health/uti-vs-sti" }
    ]
  },
  {
    title: "Specific Tests and Infections",
    badge: "Assay Diagnostics",
    icon: <Microscope className="w-5 h-5 text-[#2563eb]" />,
    links: [
      { title: "Gonorrhoea and Chlamydia PCR / NAAT Testing in Bangalore", href: "/sexual-health/gonorrhea-chlamydia-pcr" },
      { title: "Syphilis RPR, VDRL and TPHA Screening in Bangalore", href: "/sexual-health/syphilis-rpr-tpha-testing" },
      { title: "Hepatitis B Triple Panel – HBsAg, Anti-HBs and Total Anti-HBc", href: "/sexual-health/hepatitis-b-triple-panel" },
      { title: "Hepatitis C Antibody and HCV RNA PCR After Sexual Exposure", href: "/sexual-health/hepatitis-c-testing" },
      { title: "Genital and Oral Herpes Testing – HSV-1, HSV-2 Lesion PCR", href: "/sexual-health/genital-herpes-testing" },
      { title: "HPV DNA Testing, Genital Warts and Cervical Screening", href: "/sexual-health/hpv-dna-testing" },
      { title: "Trichomonas vaginalis Testing – Urine or Vaginal Swab NAAT", href: "/sexual-health/trichomonas-testing" },
      { title: "Persistent Urethritis and Mycoplasma genitalium Testing", href: "/sexual-health/persistent-urethritis-testing" },
      { title: "Other Genital Infections – Candida, BV, Dermatitis and Less Common Causes", href: "/sexual-health/other-genital-infections" }
    ]
  },
  {
    title: "Sample Collection, Reports and Follow-up",
    badge: "Laboratory Protocol",
    icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
    links: [
      { title: "STI Specimen Collection – Blood, First-Catch Urine, Throat and Genital Swabs", href: "/sexual-health/sti-sample-collection" },
      { title: "STI Testing After Antibiotics, PEP or Previous Treatment", href: "/sexual-health/sti-testing-after-antibiotics" },
      { title: "Negative STI Tests But Symptoms Persist – Next Steps", href: "/sexual-health/negative-sti-test-persistent-symptoms" },
      { title: "Understanding STI Reports – Reactive, Non-Reactive, Detected and Not Detected", href: "/sexual-health/understanding-sti-test-results" }
    ]
  },
  {
    title: "Partners, Pregnancy and Urgent Care",
    badge: "Clinical Safety",
    icon: <Users2 className="w-5 h-5 text-purple-600" />,
    links: [
      { title: "Couples, Premarital and New-Partner STI Screening in Bangalore", href: "/sexual-health/couples-sti-screening" },
      { title: "Pregnancy Testing and STI Screening After Unprotected Sex", href: "/sexual-health/pregnancy-and-sti-testing" },
      { title: "STIs, Fertility and Reproductive Health Investigations", href: "/sexual-health/sti-and-fertility" },
      { title: "Urgent Medical Help After Sexual Exposure or Sexual Assault", href: "/sexual-health/urgent-medical-support" }
    ]
  },
  {
    title: "Confidential Testing and Booking",
    badge: "Patient Privacy",
    icon: <Lock className="w-5 h-5 text-slate-800" />,
    links: [
      { title: "Confidential STD, STI and HIV Testing in Bengaluru", href: "/sexual-health/confidential-sti-testing-bangalore" },
      { title: "STI and STD Test Cost in Bangalore – Individual Tests and Packages", href: "/sexual-health/sti-test-cost-bangalore" },
      { title: "Confidential STI Home Sample Collection in Bangalore", href: "/sexual-health/sti-home-sample-collection" }
    ]
  },
  {
    title: "Other Exposure and Inclusive Care",
    badge: "Inclusive Health",
    icon: <HeartHandshake className="w-5 h-5 text-teal-600" />,
    links: [
      { title: "STI Risk From Kissing, Genital Rubbing and Non-Penetrative Sex", href: "/sexual-health/sti-risk-kissing-and-genital-contact" },
      { title: "Inclusive and Confidential Sexual Health Testing in Bengaluru", href: "/sexual-health/inclusive-sexual-health-testing" }
    ]
  }
];

export default function SexualHealthGuidesDirectory() {
  return (
    <section
      id="sexual-health-guide"
      aria-label="Sexual Health Knowledge and Diagnostic Centre"
      className="space-y-10 scroll-mt-24"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0c4a6e] to-[#082142] text-white p-8 sm:p-10 rounded-3xl shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-200 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Complete 38-Topic Clinical Index
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Sexual Health Knowledge and Diagnostic Centre
        </h2>
        <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed max-w-3xl font-medium">
          Evidence-based diagnostic guidance on STI testing after unprotected sex, genital symptoms, window periods, blood serology, and site-specific PCR in Bengaluru.
        </p>

        {/* Urgent Care Callout */}
        <div className="bg-amber-500/10 border-l-4 border-amber-400 p-4 rounded-r-2xl text-xs sm:text-sm text-amber-100 flex items-start gap-3 mt-4">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-bold block mb-1">
              Possible HIV exposure within 72 hours?
            </strong>
            <span>
              Seek urgent medical assessment for Post-Exposure Prophylaxis (PEP) immediately; do not wait for a laboratory test. Severe pelvic or testicular pain, heavy bleeding, breathing difficulty or sexual assault may require emergency medical attention.{' '}
            </span>
            <Link
              href="/health-hub/after-unprotected-sex"
              className="text-amber-300 font-bold underline hover:text-white transition-colors"
            >
              Read urgent-care guidance &rarr;
            </Link>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold">
          <a
            href={`tel:${PHONE_E164}`}
            className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-amber-500 text-slate-950 px-5 py-2.5 rounded-full uppercase tracking-wider transition-all shadow"
          >
            <Phone className="w-3.5 h-3.5" /> Call Private Helpline: {PHONE_DISPLAY}
          </a>
          <Link
            href="/sexual-health/packages"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-full uppercase tracking-wider transition-all"
          >
            <span>View Listed Test Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Categorized Grid */}
      <div className="space-y-8">
        {CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                  {cat.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#0c4a6e]">
                  {cat.title}
                </h3>
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1 rounded-full self-start sm:self-auto">
                {cat.badge} · {cat.links.length} Guides
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.links.map((link, lIdx) => (
                <Link
                  key={lIdx}
                  href={link.href}
                  className="group flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-[#2563eb] hover:shadow-md transition-all"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#2563eb] leading-snug">
                    {link.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563eb] group-hover:translate-x-1 shrink-0 mt-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

