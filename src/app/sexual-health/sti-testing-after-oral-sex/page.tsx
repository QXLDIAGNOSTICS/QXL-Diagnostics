import { getMedicalReview } from "@/lib/medicalReviews";

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Phone,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

const pageReview = getMedicalReview("/sexual-health/sti-testing-after-oral-sex");

export const metadata: Metadata = {
  title: "STI Testing After Oral Sex Bangalore | Throat PCR | QXL",
  description:
    "Confidential STI screening after oral sex in Bengaluru. Enquire about throat swab gonorrhoea and chlamydia NAAT, HIV 4th gen, syphilis and hepatitis B triple panel.",
  alternates: {
    canonical: `${SITE_URL}/sexual-health/sti-testing-after-oral-sex`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "STI Screening After Oral Sex – Throat Swab PCR & Comprehensive Blood Testing",
    description:
      "Understand which blood, throat swab and urine tests are appropriate after sexual exposure. Confidential STI testing enquiries in Bengaluru.",
    url: `${SITE_URL}/sexual-health/sti-testing-after-oral-sex`,
    siteName: "QXL Diagnostics",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "STI Testing After Oral Sex in Bangalore | QXL Diagnostics",
    description:
      "Throat swab STI NAAT, HIV 4th generation, syphilis and hepatitis B screening enquiries.",
  },
};

const FAQ_ITEMS = [
  {
    question: "Can oral sex transmit sexually transmitted infections?",
    answer: "Yes. Oral sex can transmit gonorrhoea, syphilis, herpes, HPV and other infections. The risk of HIV transmission through oral sex is very low."
  },
  {
    question: "Can urine PCR detect gonorrhoea in the throat?",
    answer: "No. A urine NAAT cannot exclude an infection confined to the throat."
  },
  {
    question: "Can a throat swab detect gonorrhoea and chlamydia together?",
    answer: "Certain dual-target NAAT assays can detect both organisms when the assay is appropriate for pharyngeal specimens. Confirm the specific laboratory assay before booking."
  },
  {
    question: "Is routine throat chlamydia screening necessary?",
    answer: "Routine pharyngeal chlamydia screening is generally not recommended. However, it may be detected by dual-target assays used for throat gonorrhoea testing."
  },
  {
    question: "What is included in the hepatitis B triple panel?",
    answer: "HBsAg, anti-HBs and total anti-HBc. All three markers are required for the triple panel."
  },
  {
    question: "Can I get tested eight months after sexual exposure?",
    answer: "Yes. Testing can help assess current infection and relevant antibody or antigen markers. A negative result cannot always exclude a previous infection that has already cleared."
  },
  {
    question: "When does a fourth-generation HIV test become reliable?",
    answer: "Laboratory-based fourth-generation HIV tests using venous blood usually detect infection within 18 to 45 days. Seek advice if you have taken PEP or PrEP or had subsequent exposures."
  },
  {
    question: "Can I have an STI without symptoms?",
    answer: "Yes. Several sexually transmitted infections can be asymptomatic, including throat gonorrhoea."
  },
  {
    question: "How much does comprehensive STI testing cost?",
    answer: "Charges depend on the investigations and specimen sites selected. QXL Diagnostics lists its fourth-generation HIV test at ₹945. Request an itemised quotation for other investigations."
  },
  {
    question: "Does QXL use a validated pharyngeal NAAT assay?",
    answer: "QXL Diagnostics lists extragenital STI screening. Contact the laboratory to confirm the assay's pharyngeal specimen compatibility, validation status and collection requirements before booking."
  },
  {
    question: "Is fasting necessary for sexual health blood tests?",
    answer: "Fasting is generally not required for the blood investigations described here. Follow any additional instructions for your selected tests."
  },
  {
    question: "Should I get a complete STD panel after unprotected sex?",
    answer: "Testing should be selected according to your exposure, symptoms, anatomical sites and timing. A single fixed panel is not appropriate for everyone."
  },
  {
    question: "Can antibiotics affect STI PCR test results?",
    answer: "Previous antibiotic treatment can influence the interpretation of infection testing. Inform your clinician before specimen collection."
  }
];

export default function StiTestingAfterOralSexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/sexual-health/sti-testing-after-oral-sex#webpage`,
        "url": `${SITE_URL}/sexual-health/sti-testing-after-oral-sex`,
        "name": "STI Screening After Oral Sex – Throat Swab PCR & Comprehensive Blood Testing",
        "description": "Clinical information about site-specific STI screening, pharyngeal gonorrhoea and chlamydia NAAT, HIV fourth-generation testing, syphilis screening and hepatitis B triple panel.",
        "inLanguage": "en-IN",
        "publisher": {
          "@id": `${SITE_URL}/#organization`
        },
        ...(pageReview ? {
          "reviewedBy": {
            "@type": "Physician",
            "name": pageReview.reviewerName,
            "url": `${SITE_URL}/${pageReview.reviewerSlug}`
          },
          "lastReviewed": pageReview.reviewedOn
        } : {}),
        "audience": {
          "@type": "Patient"
        },
        "medicalAudience": {
          "@type": "Patient"
        },
        "about": [
          { "@type": "MedicalCondition", "name": "Gonorrhoea", "alternateName": "Gonorrhea" },
          { "@type": "MedicalCondition", "name": "Chlamydial Infection" },
          { "@type": "MedicalCondition", "name": "Syphilis" },
          { "@type": "MedicalCondition", "name": "HIV Infection" },
          { "@type": "MedicalCondition", "name": "Hepatitis B" }
        ],
        "breadcrumb": {
          "@id": `${SITE_URL}/sexual-health/sti-testing-after-oral-sex#breadcrumb`
        }
      },
      {
        "@type": "MedicalOrganization",
        "@id": `${SITE_URL}/#organization`,
        "name": "QXL Diagnostics – Super Speciality Lab",
        "alternateName": "QXL Diagnostics",
        "legalName": "Qualitify Healthtech Private Limited",
        "url": `${SITE_URL}/`,
        "telephone": "+91-9964639639",
        "areaServed": {
          "@type": "City",
          "name": "Bengaluru"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3rd Floor, SLN Complex, Mysore Road, Kengeri",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560060",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/sexual-health/sti-testing-after-oral-sex#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sexual Health",
            "item": `${SITE_URL}/sexual-health`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "STI Testing After Oral Sex",
            "item": `${SITE_URL}/sexual-health/sti-testing-after-oral-sex`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/sexual-health/sti-testing-after-oral-sex#faq`,
        "mainEntity": FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="oral-sti-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">STI Testing After Oral Sex</span>
        </div>
      </nav>

      {/* Page Header */}
      <header className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Extragenital Clinical Protocol
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              STI Screening After Oral Sex – Throat Swab PCR &amp; Comprehensive Blood Testing
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Confidential sexual health testing enquiries in Bengaluru (Bangalore) at QXL Diagnostics – Super Speciality Lab.
            </p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Concerned about a sexually transmitted infection after oral sex, unprotected sex or a previous sexual exposure? Learn which throat swab, blood and urine tests may be appropriate, when to get tested and how to arrange specimen collection.
            </p>
            <p className="text-xs uppercase tracking-wider font-extrabold text-[#f59e0b]">
              Confidential enquiries | Site-specific testing | Laboratory-guided specimen collection
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`tel:${PHONE_E164}`}
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call QXL Diagnostics</span>
              </a>
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL Diagnostics, I would like to request a confidential testing quote regarding STI screening after oral sex.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request a Confidential Testing Quote</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="oral-sti-screening" className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Urgent Medical Advice Banner */}
        <aside aria-label="Urgent medical advice" className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-slate-800 space-y-2 shadow-sm">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <h2 className="text-lg font-black text-amber-950">
              Possible HIV exposure within 72 hours?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed pl-7">
            Seek urgent medical assessment for HIV post-exposure prophylaxis (PEP). If indicated, PEP should be started as soon as possible and within 72 hours. Do not wait for laboratory test results. Oral sex alone generally carries little to no HIV risk. A clinician can assess other exposure-related risks.
          </p>
        </aside>

        {/* Section 1: Recommended Tests Table */}
        <section id="recommended-tests" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Clinical Investigations</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Which STI tests should I consider after oral sex?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
              Testing should be selected according to the anatomical site exposed, type of sexual contact, symptoms, time since exposure, vaccination history and previous antibiotic or antiviral treatment.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
              Depending on individual circumstances, a clinician may consider the following investigations.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">
                STI investigations following oral and genital exposure
              </caption>
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200 font-bold">
                  <th className="p-4 sm:p-5">Investigation</th>
                  <th className="p-4 sm:p-5">Specimen</th>
                  <th className="p-4 sm:p-5">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">HIV-1/2 Fourth-Generation Ag/Ab Test</td>
                  <td className="p-4 sm:p-5">Venous blood</td>
                  <td className="p-4 sm:p-5">HIV antigen and antibody screening</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Syphilis RPR with TPHA Confirmation</td>
                  <td className="p-4 sm:p-5">Serum</td>
                  <td className="p-4 sm:p-5">Syphilis serological evaluation</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Hepatitis B Surface Antigen (HBsAg)</td>
                  <td className="p-4 sm:p-5">Serum</td>
                  <td className="p-4 sm:p-5">Marker of current HBV infection</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Hepatitis B Surface Antibody (Anti-HBs)</td>
                  <td className="p-4 sm:p-5">Serum</td>
                  <td className="p-4 sm:p-5">Assessment of immunity</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Hepatitis B Core Total Antibody (Total Anti-HBc)</td>
                  <td className="p-4 sm:p-5">Serum</td>
                  <td className="p-4 sm:p-5">Marker of previous or current natural infection</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Pharyngeal Neisseria gonorrhoeae NAAT</td>
                  <td className="p-4 sm:p-5">Throat swab</td>
                  <td className="p-4 sm:p-5">Detection of pharyngeal gonorrhoea</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Pharyngeal Chlamydia trachomatis NAAT</td>
                  <td className="p-4 sm:p-5">Throat swab</td>
                  <td className="p-4 sm:p-5">Detection when clinically appropriate</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Chlamydia and Gonorrhoea NAAT</td>
                  <td className="p-4 sm:p-5">First-catch urine or appropriate genital swab</td>
                  <td className="p-4 sm:p-5">Assessment of urogenital infection</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic">
            Availability, specimen compatibility, assay validation and applicable accreditation scope must be confirmed before collection. Not every patient requires every investigation.
          </p>
        </section>

        {/* Section 2: Throat Swab PCR / NAAT */}
        <section id="throat-swab-pcr" className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Molecular Swab Testing</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Throat Swab STI PCR / NAAT in Bangalore
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Gonorrhoea can infect the throat following oral sexual exposure. Chlamydia can also occur at this anatomical site, although routine throat screening for chlamydia is generally not recommended.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Certain dual-target nucleic acid amplification tests (NAATs) can detect <em>Neisseria gonorrhoeae</em> and <em>Chlamydia trachomatis</em> from a single throat specimen when the assay is suitable for this specimen type.
          </p>

          <div className="space-y-3 pt-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Does a throat swab detect both gonorrhoea and chlamydia?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              A suitable dual-target NAAT may detect both organisms. QXL Diagnostics lists anatomical-site STI screening under its extragenital testing profile. Please confirm the specific assay, validated specimen types and availability with our laboratory before booking.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Is throat swab testing the same as urine STI PCR?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              No. A urine NAAT evaluates urogenital infection and cannot exclude gonorrhoea or chlamydia confined to the throat. A pharyngeal specimen may be required following exposure involving the mouth or throat.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Routine throat cultures for common respiratory infections are not automatically equivalent to STI-specific molecular testing.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/packages/oral-rectal-sti-screening"
              className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-sm"
            >
              <span>Explore Extragenital STI Screening</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Section 3: Hepatitis B Triple Panel */}
        <section id="hepatitis-b-triple-panel" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Serological Profiling</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Hepatitis B Triple Panel Test in Bangalore
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Hepatitis B screening using three complementary serological markers can help assess current infection, previous infection, immunity and susceptibility.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-800">
            <li><strong>HBsAg</strong> – Hepatitis B Surface Antigen (indicates active current HBV infection)</li>
            <li><strong>Anti-HBs</strong> – Hepatitis B Surface Antibody (indicates immunity via vaccination or recovery)</li>
            <li><strong>Total Anti-HBc</strong> – Total Hepatitis B Core Antibody (marker of previous or current natural infection)</li>
          </ul>
          <p className="text-xs sm:text-sm text-amber-900 bg-amber-50 p-4 rounded-xl border border-amber-200 font-medium leading-relaxed">
            <strong>Diagnostic Note:</strong> HBsAg alone is not the complete hepatitis B triple panel. Total anti-HBc should not be confused with anti-HBc IgM alone.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Contact QXL Diagnostics to confirm all three components, combined panel pricing, specimen requirements and report turnaround time before booking.
          </p>
        </section>

        {/* Section 4: Fourth-Generation HIV Test */}
        <section id="hiv-fourth-generation" className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Early Detection Serology</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Fourth-Generation HIV Test After Sexual Exposure
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            A laboratory-based fourth-generation HIV test detects HIV-1 p24 antigen together with antibodies to HIV-1 and HIV-2.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Such tests using venous blood typically detect HIV within approximately 18 to 45 days of infection. Recent exposure, subsequent exposures and use of PEP or PrEP can influence follow-up testing.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            A reactive screening result requires additional testing according to the applicable diagnostic algorithm.
          </p>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-950 font-bold flex items-center justify-between flex-wrap gap-2">
            <span>Listed QXL price: ₹945 (Confirm current price when booking)</span>
            <Link href="/tests/hiv-test-bangalore" className="text-[#2563eb] hover:underline flex items-center gap-1">
              View HIV 4th Gen Assays <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Section 5: Syphilis Screening */}
        <section id="syphilis-screening" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Dual Serology</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Syphilis RPR and TPHA Screening
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Syphilis can be transmitted through contact with infectious lesions during oral, vaginal or anal sex. Serological assessment commonly combines a non-treponemal test such as RPR with a treponemal test such as TPHA.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Previous treatment, clinical findings and the timing of exposure are important when interpreting results. Early infection may require repeat testing.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Enquire about syphilis screening, quantitative RPR titres and TPHA reflex confirmation.
          </p>
        </section>

        {/* Section 6: First-Catch Urine PCR */}
        <section id="urine-pcr" className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Urogenital Evaluation</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              First-Catch Urine PCR for Gonorrhoea and Chlamydia
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            First-catch or first-void urine NAAT may be appropriate for urethral infection following genital exposure. Depending on anatomy and clinical circumstances, a vaginal or another genital swab may be preferred.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Follow the laboratory&apos;s assay-specific instructions concerning urine volume, collection, transport and the interval since last urination.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            A routine urine examination or urine culture is not equivalent to a targeted chlamydia and gonorrhoea NAAT.
          </p>
        </section>

        {/* Section 7: Testing Timeline */}
        <section id="testing-timeline" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Window Periods</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              STI Screening After 3, 6 or 8 Months of Exposure
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
              Sexual health testing can remain clinically useful even when the exposure occurred several months ago.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200 font-bold">
                  <th className="p-4 sm:p-5 w-1/3">Time since exposure</th>
                  <th className="p-4 sm:p-5">Testing considerations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Within 72 hours</td>
                  <td className="p-4 sm:p-5">Urgent assessment for HIV PEP if indicated. Do not wait for routine laboratory reports.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">First few weeks</td>
                  <td className="p-4 sm:p-5">Site-specific testing (throat swab NAAT at 7–14 days) and baseline serology. Repeat investigations may be needed.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">After 3 months</td>
                  <td className="p-4 sm:p-5">Review HIV, syphilis, HBV and other relevant results with a clinician. Conclusive window for 4th-gen HIV and syphilis serology.</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">After 6 to 8 months or longer</td>
                  <td className="p-4 sm:p-5">Assessment for current infection and relevant serological markers remains possible.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic">
            A negative throat or urine NAAT months after exposure does not establish that an infection never occurred. Some infections may clear spontaneously or following antibiotic treatment.
          </p>
        </section>

        {/* Section 8: Symptoms After Oral Sex */}
        <section id="symptoms" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Clinical Presentation</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Symptoms After Oral Sex – When Should I Get Tested?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Consider medical evaluation if you experience:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              Persistent sore throat after oral sex
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              Mouth ulcers, painful oral sores or blisters
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              Swollen cervical lymph nodes or unexplained fever
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              Genital discharge or painful urination
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              Genital sores, itching or discomfort
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              Rectal pain or discharge following anal exposure
            </li>
          </ul>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            These symptoms have many possible causes and do not necessarily indicate an STI. Gonorrhoea and other STIs can also occur without symptoms.
          </p>
          <p className="text-xs sm:text-sm text-rose-800 bg-rose-50 p-4 rounded-xl border border-rose-200 font-bold leading-relaxed">
            Seek urgent medical care for difficulty breathing, severe testicular or pelvic pain, or serious systemic symptoms.
          </p>
        </section>

        {/* Section 9: Pricing Table */}
        <section id="prices" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Transparent Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              STI Testing Cost in Bangalore
            </h2>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200 font-bold">
                  <th className="p-4 sm:p-5">Investigation</th>
                  <th className="p-4 sm:p-5">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Fourth-generation HIV Ag/Ab</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-700">₹945 – current listed price; confirm at booking</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Syphilis RPR + TPHA reflex</td>
                  <td className="p-4 sm:p-5">Request current price</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Hepatitis B triple panel</td>
                  <td className="p-4 sm:p-5">Confirm availability and price</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Throat swab gonorrhoea/chlamydia NAAT</td>
                  <td className="p-4 sm:p-5">Confirm assay, availability and price</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Urine/genital gonorrhoea/chlamydia NAAT</td>
                  <td className="p-4 sm:p-5">Request current price</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">Combined targeted STI profile</td>
                  <td className="p-4 sm:p-5">Individual quotation based on selected tests</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic">
            Request an itemised quotation including laboratory charges, specimen collection charges and expected report turnaround times.
          </p>
          <div>
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to get a confidential price estimate for oral/blood STI tests.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get a Confidential Price Estimate</span>
            </a>
          </div>
        </section>

        {/* Section 10: Collection Centres */}
        <section id="collection-centres" className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Laboratory Facilities</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Where Can I Get Confidential STI Testing in Bengaluru?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#2563eb] font-bold text-xs uppercase">
                <Building2 className="w-4 h-4" />
                <span>Central Reference Laboratory</span>
              </div>
              <h3 className="text-base font-black text-slate-900">
                QXL Diagnostics – Main Reference Laboratory, Kengeri
              </h3>
              <address className="not-italic text-xs text-slate-600 leading-relaxed">
                3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060, Karnataka, India.
              </address>
              <p className="text-[11px] text-slate-500">
                Opening Hours: Monday to Sunday, 06:30 AM to 08:00 PM
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#2563eb] font-bold text-xs uppercase">
                <Building2 className="w-4 h-4" />
                <span>North Bengaluru Hub</span>
              </div>
              <h3 className="text-base font-black text-slate-900">
                QXL Diagnostics – North Hub, Yelahanka
              </h3>
              <address className="not-italic text-xs text-slate-600 leading-relaxed">
                RDL Square, B.B. Road, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064, Karnataka, India.
              </address>
              <p className="text-[11px] text-slate-500">
                Opening Hours: Monday to Sunday, 07:00 AM to 08:00 PM
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Please confirm which location can undertake pharyngeal sample collection. Blood and eligible urine sample collection may be arranged separately. Throat and other procedural swabs may require an appointment.
          </p>
          <p className="text-xs font-semibold text-slate-800">
            Contact Helpline: <a href={`tel:${PHONE_E164}`} className="text-[#2563eb] hover:underline font-bold">{PHONE_DISPLAY}</a>
          </p>
        </section>

        {/* Section 11: Privacy Safeguards */}
        <section id="privacy" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Strict Privacy Safeguards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
            Confidential Sexual Health Testing
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Sexual health concerns deserve a respectful, non-judgmental and confidential approach. Contact QXL Diagnostics privately to discuss appropriate investigations and report delivery.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Please avoid sending intimate photographs, medical reports or detailed sexual histories through public comments or unverified communication channels.
          </p>
        </section>

        {/* Section 12: FAQs */}
        <section id="faq" className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Patient Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Common enquiries regarding STI testing after oral intimacy, sample collection, window periods, and panel interpretation.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 border border-slate-200 rounded-2xl p-5 open:bg-white open:shadow-sm transition-all"
              >
                <summary className="font-bold text-sm sm:text-base text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-[#2563eb] group-open:rotate-180 transition-transform font-bold text-base flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 border-t border-slate-100">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Section 13: Clinical References */}
        <section id="clinical-references" className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 text-xs text-slate-600">
          <h2 className="text-base sm:text-lg font-black text-[#0c4a6e]">
            Clinical References &amp; Authoritative Guidelines
          </h2>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>
              <a
                href="https://www.cdc.gov/sti/about/about-sti-risk-and-oral-sex.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                CDC – STI Risk and Oral Sex <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/std/treatment-guidelines/gonorrhea-adults.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                CDC – Gonococcal Infections in Adults &amp; Adolescents <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/std/treatment-guidelines/chlamydia.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                CDC – Chlamydial Infections Treatment Guidelines <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/hepatitis-b/hcp/diagnosis-testing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                CDC – Hepatitis B Testing and Diagnosis Guidelines <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/hiv/testing/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                CDC – HIV Testing and Biological Window Periods <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/hivnexus/hcp/pep/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563eb] hover:underline inline-flex items-center gap-1"
              >
                CDC – Clinical Guidance for HIV Post-Exposure Prophylaxis (PEP) <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
          <p className="pt-2 text-[11px] text-slate-500 italic">
            This information is for general education and is not a substitute for individual medical consultation.
          </p>
        </section>

        {/* Section 14: Medical Reviewer Notice */}
        <MedicalReviewNotice
          reviewedBy="Dr. Shantakumar Muruda, MD (Biochemistry)"
          reviewerTitle="Consultant Clinical Biochemist, Founder & CEO – QXL Diagnostics, NABL Lead & Technical Assessor"
          path="/sexual-health/sti-testing-after-oral-sex"
        />

        {/* Section 15: Footer CTA */}
        <footer className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-8 sm:p-10 rounded-3xl space-y-4 shadow-md text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-black">
            QXL Diagnostics – Sexual Health Testing Enquiries
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
            Request guidance on test availability, specimen collection and laboratory pricing from our diagnostic specialists.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
            <Link
              href="/sexual-health/packages"
              className="bg-[#2563eb] hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow"
            >
              Compare All Sexual Health Diagnostic Packages
            </Link>
            <a
              href={`tel:${PHONE_E164}`}
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/30 px-6 py-3.5 rounded-full transition-all"
            >
              Call QXL ({PHONE_DISPLAY})
            </a>
          </div>
        </footer>

        {/* Global Hub Navigation */}
        <SexualHealthNav currentPath="/sexual-health/sti-testing-after-oral-sex" />
      </main>
    </div>
  );
}

