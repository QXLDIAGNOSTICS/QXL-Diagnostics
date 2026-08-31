import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, CheckCircle2, ShieldCheck, Activity, Clock, ArrowRight, Beaker, Calendar } from "lucide-react";
import { getDynamicPageData } from "@/lib/seoPages/dynamicPageResolver";
import { PHONE_DISPLAY, WHATSAPP_LINK, NABL_CERTIFICATE, ISO_STANDARD, SITE_URL } from "@/lib/businessInfo";
import { getTestInternalLinks } from "@/lib/seo/internalLinks";

import MedicalReviewerBadge from "@/components/MedicalReviewerBadge";
import ReferenceRangesTable from "@/components/ReferenceRangesTable";
import RelatedTestsGrid from "@/components/RelatedTestsGrid";
import DoctorInterpretationNote from "@/components/DoctorInterpretationNote";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const commonTestSlugs = [
    "blood-test-bangalore", "cbc-test-bangalore", "complete-blood-count-test-bangalore", "hemoglobin-test-bangalore",
    "esr-test-bangalore", "crp-test-bangalore", "peripheral-smear-test-bangalore", "reticulocyte-count-test-bangalore",
    "blood-group-test-bangalore", "coagulation-profile-test-bangalore", "pt-inr-test-bangalore", "aptt-test-bangalore",
    "blood-sugar-test-bangalore", "fasting-blood-sugar-test-bangalore", "postprandial-blood-sugar-test-bangalore",
    "random-blood-sugar-test-bangalore", "hba1c-test-bangalore", "insulin-test-bangalore", "fasting-insulin-test-bangalore",
    "homa-ir-test-bangalore", "c-peptide-test-bangalore", "diabetes-profile-test-bangalore", "thyroid-test-bangalore",
    "thyroid-profile-test-bangalore", "tsh-test-bangalore", "t3-test-bangalore", "t4-test-bangalore", "free-t3-test-bangalore",
    "free-t4-test-bangalore", "anti-tpo-test-bangalore", "anti-thyroglobulin-test-bangalore", "vitamin-d-test-bangalore",
    "vitamin-b12-test-bangalore", "folate-test-bangalore", "iron-profile-test-bangalore", "ferritin-test-bangalore",
    "serum-iron-test-bangalore", "transferrin-test-bangalore", "calcium-test-bangalore", "magnesium-test-bangalore",
    "zinc-test-bangalore", "liver-function-test-bangalore", "lft-test-bangalore", "bilirubin-test-bangalore",
    "sgot-ast-test-bangalore", "sgpt-alt-test-bangalore", "ggt-test-bangalore", "alkaline-phosphatase-test-bangalore",
    "albumin-test-bangalore", "total-protein-test-bangalore", "kidney-function-test-bangalore", "kft-test-bangalore",
    "creatinine-test-bangalore", "urea-test-bangalore", "uric-acid-test-bangalore", "electrolytes-test-bangalore",
    "sodium-test-bangalore", "potassium-test-bangalore", "microalbumin-urine-test-bangalore",
    "urine-protein-creatinine-ratio-test-bangalore", "lipid-profile-test-bangalore", "cholesterol-test-bangalore",
    "triglycerides-test-bangalore", "hdl-cholesterol-test-bangalore", "ldl-cholesterol-test-bangalore",
    "apolipoprotein-a1-test-bangalore", "apolipoprotein-b-test-bangalore", "lipoprotein-a-test-bangalore",
    "homocysteine-test-bangalore", "hs-crp-test-bangalore", "troponin-test-bangalore", "nt-probnp-test-bangalore",
    "hormone-test-bangalore", "testosterone-test-bangalore", "free-testosterone-test-bangalore", "estrogen-test-bangalore",
    "estradiol-test-bangalore", "progesterone-test-bangalore", "prolactin-test-bangalore", "cortisol-test-bangalore",
    "dhea-s-test-bangalore", "fsh-test-bangalore", "lh-test-bangalore", "amh-test-bangalore", "fertility-test-bangalore",
    "beta-hcg-test-bangalore", "pregnancy-blood-test-bangalore", "double-marker-test-bangalore", "triple-marker-test-bangalore",
    "quadruple-marker-test-bangalore", "papp-a-test-bangalore", "free-beta-hcg-test-bangalore", "prenatal-screening-test-bangalore",
    "double-marker", "papp-a", "free-beta-hcg", "triple-marker", "quadruple-marker",
    "ana-test-bangalore", "ana-profile-test-bangalore", "ana-ifa-test-bangalore", "anti-dsdna-test-bangalore",
    "ena-profile-test-bangalore", "anti-ccp-test-bangalore", "rheumatoid-factor-test-bangalore", "anca-test-bangalore",
    "c3-complement-test-bangalore", "c4-complement-test-bangalore", "autoimmune-profile-test-bangalore",
    "allergy-test-bangalore", "allergy-panel-test-bangalore", "food-allergy-test-bangalore", "food-intolerance-test-bangalore",
    "food-igg-test-bangalore", "food-xplorer-test-bangalore", "total-ige-test-bangalore", "inhalant-allergy-test-bangalore",
    "respiratory-allergy-test-bangalore", "skin-allergy-blood-test-bangalore", "cancer-marker-test-bangalore",
    "tumor-marker-test-bangalore", "psa-test-bangalore", "free-psa-test-bangalore", "ca-125-test-bangalore",
    "ca-19-9-test-bangalore", "ca-15-3-test-bangalore", "cea-test-bangalore", "afp-test-bangalore",
    "beta-2-microglobulin-test-bangalore", "fever-profile-test-bangalore", "dengue-test-bangalore", "malaria-test-bangalore",
    "typhoid-test-bangalore", "widal-test-bangalore", "chikungunya-test-bangalore", "hiv-test-bangalore",
    "hbsag-test-bangalore", "hepatitis-b-test-bangalore", "hepatitis-c-test-bangalore", "vdrl-test-bangalore",
    "tb-test-bangalore", "tb-pcr-test-bangalore", "molecular-tb-test-bangalore", "urine-test-bangalore",
    "urine-routine-test-bangalore", "urine-culture-test-bangalore", "urine-microalbumin-test-bangalore",
    "urine-protein-test-bangalore", "stool-test-bangalore", "stool-routine-test-bangalore", "stool-culture-test-bangalore",
    "occult-blood-test-bangalore", "calprotectin-test-bangalore", "h-pylori-test-bangalore", "celiac-disease-test-bangalore",
    "anaemia-profile-test-bangalore", "hemoglobin-electrophoresis-test-bangalore", "hplc-hemoglobin-test-bangalore",
    "spep-test-bangalore", "serum-protein-electrophoresis-test-bangalore", "immunofixation-electrophoresis-test-bangalore",
    "free-light-chain-test-bangalore", "flow-cytometry-test-bangalore", "genetic-test-bangalore", "ngs-test-bangalore",
    "pcr-test-bangalore", "molecular-diagnostic-test-bangalore", "mass-spectrometry-test-bangalore",
    "therapeutic-drug-monitoring-test-bangalore", "immunofluorescence-test-bangalore", "histopathology-test-bangalore",
    "biopsy-test-bangalore", "cytology-test-bangalore", "fnac-test-bangalore", "pap-smear-test-bangalore",
    "immunohistochemistry-test-bangalore", "mens-health-checkup-bangalore", "male-fertility-test-bangalore",
    "semen-analysis-test-bangalore", "womens-health-checkup-bangalore", "pcos-test-bangalore",
    "female-hormone-test-bangalore", "full-body-checkup-bangalore", "health-checkup-bangalore",
    "preventive-health-checkup-bangalore", "executive-health-checkup-bangalore", "senior-citizen-health-checkup-bangalore",
    "diabetes-health-checkup-bangalore", "heart-health-checkup-bangalore", "blood-test-at-home-bangalore",
    "home-blood-collection-bangalore", "home-sample-collection-bangalore", "lab-test-at-home-bangalore",
    "diagnostic-test-at-home-bangalore", "health-checkup-at-home-bangalore"
  ];

  return commonTestSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getDynamicPageData(slug);
  if (!pageData) {
    return { title: "Test Not Found | QXL Diagnostics" };
  }
  const links = getTestInternalLinks(slug);
  const canonical = `${SITE_URL}/tests/${slug}`;

  return {
    title: pageData.title,
    description: pageData.metaDescription,
    alternates: { canonical },
    // ── Medical review meta — signals authority to AI crawlers ───────────────
    other: {
      "medical-reviewed-by": links?.doctorName ?? pageData.doctorName ?? "Dr. Shantakumar Muruda",
      "medical-reviewer-credentials": links?.doctorQuals ?? pageData.doctorQuals ?? "MD Biochemistry",
      "medical-review-date": "2026-08-01",
      "medical-specialty": pageData.category,
      "nabl-accreditation": NABL_CERTIFICATE,
      "lab-iso-standard": ISO_STANDARD,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.metaDescription,
      url: canonical,
      siteName: "QXL Diagnostics",
      locale: "en_IN",
      type: "website",
    },
    keywords: [
      pageData.h1Title,
      `${pageData.category} Bangalore`,
      "NABL accredited lab Bangalore",
      "home blood collection Bangalore",
      "QXL Diagnostics",
      "blood test Bengaluru",
    ],
  };
}

export default async function TestPage({ params }: Props) {
  const { slug } = await params;
  const data = getDynamicPageData(slug);
  if (!data) {
    notFound();
  }


  // Merge data-layer internal links with resolver data
  const links = getTestInternalLinks(slug);
  const relatedTests = data.relatedTests ?? links?.relatedTests ?? [];
  const doctorSlug = data.doctorSlug ?? links?.doctorSlug ?? "dr-shantakumar-muruda";
  const doctorName = data.doctorName ?? links?.doctorName ?? "Dr. Shantakumar Muruda";
  const doctorQuals = data.doctorQuals ?? links?.doctorQuals ?? "MD Biochemistry";

  // ── JSON-LD Structured Data (SSR — directly readable by AI crawlers) ────────
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": data.h1Title,
    "description": data.metaDescription,
    "url": `${SITE_URL}/tests/${slug}`,
    "usesDevice": { "@type": "MedicalDevice", "name": "Automated Clinical Analyser — NABL Accredited" },
    "normalRange": data.referenceRanges
      ? data.referenceRanges.filter(r => r.interpretation === "normal").map(r => ({
          "@type": "MedicalIntangible",
          "name": r.label,
          "description": `${r.range} ${r.unit}`
        }))
      : undefined,
    "preparation": data.fastingRequired,
    "relevantSpecialty": { "@type": "MedicalSpecialty", "name": data.category },
    "study": { "@type": "MedicalStudy", "status": "Completed" },
    "provider": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics",
      "alternateName": ["QXL Diagnostics Super Speciality Lab", "Qualitify Healthtech"],
      "url": SITE_URL,
      "telephone": "+919964639639",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3rd Floor, SLN Complex, Mysore Road, Kengeri",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560060",
        "addressCountry": "IN"
      },
      "medicalSpecialty": ["Pathology", "Clinical Biochemistry", "Microbiology", "Histopathology"],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": `NABL Accreditation ${NABL_CERTIFICATE}`,
        "credentialCategory": "ISO 15189:2022 Medical Laboratory"
      }
    },
    "reviewedBy": {
      "@type": "Person",
      "name": doctorName,
      "jobTitle": doctorQuals,
      "worksFor": { "@type": "Organization", "name": "QXL Diagnostics" }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Tests", "item": `${SITE_URL}/tests` },
      { "@type": "ListItem", "position": 3, "name": data.h1Title, "item": `${SITE_URL}/tests/${slug}` }
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* ── Structured Data (SSR — AI + Google can read these directly) ────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 px-4 py-2.5">
        <div className="max-w-[1260px] mx-auto">
          <ol className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium flex-wrap">
            <li><Link href="/" className="hover:text-[#2563eb] transition-colors">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/tests" className="hover:text-[#2563eb] transition-colors">Tests</Link></li>
            <li className="text-slate-300">/</li>
            {links?.speciality && (
              <>
                <li>
                  <Link href={`/specialities/${links.speciality}`} className="hover:text-[#2563eb] transition-colors capitalize">
                    {links.speciality.replace(/-/g, ' ')}
                  </Link>
                </li>
                <li className="text-slate-300">/</li>
              </>
            )}
            <li className="text-slate-700 font-semibold truncate max-w-[200px]">{data.h1Title}</li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-10 lg:py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#FF9933] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
              {data.badge}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight !text-white drop-shadow-sm" style={{ color: '#ffffff' }}>
              {data.h1Title}
            </h1>

            {/* ── Direct Answer Block (AI-extractable) ──────────────────────── */}
            <p className="text-blue-100 text-sm md:text-base max-w-3xl leading-relaxed mb-3">
              {data.subtitle}
            </p>

            {/* ── Key Stats Bar (SSR inline — no JS required for crawlers) ──── */}
            <div className="flex flex-wrap gap-3 mb-5 text-xs font-bold">
              <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white/90">
                <Beaker className="w-3.5 h-3.5 text-sky-300" />
                {data.parametersCount}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white/90">
                <Clock className="w-3.5 h-3.5 text-sky-300" />
                {data.turnaroundTime}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white/90">
                <Activity className="w-3.5 h-3.5 text-sky-300" />
                {data.sampleType}
              </span>
            </div>

            <div className="pt-1">
              <MedicalReviewerBadge
                doctorName={doctorName}
                qualifications={doctorQuals}
                reviewDate="August 2026"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-5">
              <Link
                href={`/book?package=${encodeURIComponent(data.h1Title)}`}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-8 py-3.5 rounded-full transition-all shadow-lg text-sm uppercase tracking-wide flex items-center gap-2"
              >
                Book Now @ ₹{data.price} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-7 py-3.5 rounded-full transition-all shadow-md text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> WhatsApp Booking
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar (SSR — always visible without JS) ──────────────────────── */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-[1260px] mx-auto px-4 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> NABL Accredited ({NABL_CERTIFICATE})
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200">
            <Activity className="w-3.5 h-3.5" /> Free Home Collection
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
            <Clock className="w-3.5 h-3.5" /> Same-Day Reports on WhatsApp
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Doctor-Reviewed Results
          </span>
        </div>
      </div>

      {/* ── Main Body ─────────────────────────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-8">

          {/* Left Main Content */}
          <div className="flex-1 space-y-6">

            {/* ── Quick Overview Card ──────────────────────────────────────── */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-5">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Test Category</span>
                  <p className="text-lg font-black text-[#0f2d5e]">{data.category}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-600">₹{data.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{data.oldPrice}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">{data.discountPercent}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Parameters Covered", value: data.parametersCount },
                  { label: "Sample Type", value: data.sampleType },
                  { label: "Report Delivery", value: data.turnaroundTime },
                ].map(item => (
                  <div key={item.label} className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                    <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-wider block mb-1">{item.label}</span>
                    <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Fasting / Preparation — Direct Answer Block */}
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Preparation &amp; Fasting Instructions</h2>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-sm font-semibold leading-relaxed mb-6">
                💡 <strong>Instructions:</strong> {data.fastingRequired}
              </div>

              {/* When to Get This Test — Symptom chips (AI-extractable) */}
              {data.whenToTest && data.whenToTest.length > 0 && (
                <>
                  <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">When Should You Get This Test?</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {data.whenToTest.map(indication => (
                      <span key={indication} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                        <Calendar className="w-3 h-3 text-[#2563eb]" />
                        {indication}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Clinical Overview — AI-extractable paragraphs */}
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Clinical Overview</h2>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-4">
                {data.overview.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Clinical Significance — deep-dive paragraph for AI answer extraction */}
              {data.clinicalSignificance && (
                <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-5 mb-6">
                  <h2 className="text-base font-extrabold text-[#0f2d5e] mb-2">Clinical Significance</h2>
                  <p className="text-slate-700 text-sm leading-relaxed">{data.clinicalSignificance}</p>
                </div>
              )}

              {/* Why Important */}
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Why Get Tested at QXL Diagnostics?</h2>
              <div className="space-y-2.5">
                {data.whyImportant.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Reference Ranges Table ───────────────────────────────────── */}
            {data.referenceRanges && data.referenceRanges.length > 0 && (
              <ReferenceRangesTable
                ranges={data.referenceRanges}
                testName={data.h1Title}
              />
            )}

            {/* ── FAQs — structured for FAQPage schema ─────────────────────── */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-5">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {data.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <h3 className="font-bold text-[#0f2d5e] text-sm mb-1.5">Q: {faq.question}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Related Tests Grid ───────────────────────────────────────── */}
            {relatedTests.length > 0 && (
              <RelatedTestsGrid tests={relatedTests} />
            )}

          </div>

          {/* ── Sidebar ────────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[360px] space-y-5">

            {/* Price + Book CTA Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-emerald-600">₹{data.price}</span>
                <span className="text-sm text-slate-400 line-through">₹{data.oldPrice}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">{data.discountPercent}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4">Includes free home sample collection</p>
              <Link
                href={`/book?package=${encodeURIComponent(data.h1Title)}`}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold py-3.5 rounded-2xl text-center block text-sm uppercase tracking-wider shadow-md transition-all"
              >
                Book Home Collection →
              </Link>
              <a
                href={`tel:${PHONE_DISPLAY}`}
                className="block text-center text-xs text-slate-500 font-bold mt-3 hover:text-[#2563eb] transition-colors"
              >
                Or call: {PHONE_DISPLAY}
              </a>
            </div>

            {/* Doctor Interpretation Note */}
            {data.doctorNote && (
              <DoctorInterpretationNote
                doctorName={doctorName}
                doctorSlug={doctorSlug}
                qualifications={doctorQuals}
                specialty={data.category}
                note={data.doctorNote}
                reviewDate="August 2026"
              />
            )}

            {/* NABL Quality Card */}
            <div className="bg-[#0f2d5e] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#2563eb]/20 rounded-full blur-2xl" />
              <h3 className="text-base font-extrabold mb-4 border-b border-white/10 pb-3 relative z-10">NABL Quality Guarantees</h3>
              <div className="space-y-4 text-xs font-semibold relative z-10">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white text-sm">NABL Accredited ({NABL_CERTIFICATE})</p>
                    <p className="text-sky-200 mt-0.5">{ISO_STANDARD} quality compliance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white text-sm">Same-Day WhatsApp Reports</p>
                    <p className="text-sky-200 mt-0.5">Digital PDF within 6–12 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white text-sm">Free Home Sample Collection</p>
                    <p className="text-sky-200 mt-0.5">Sterile vacuum tubes · Cold-chain transport</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
                <Link
                  href={`/book?package=${encodeURIComponent(data.h1Title)}`}
                  className="w-full bg-[#2563eb] hover:bg-blue-600 text-white font-extrabold py-3 rounded-xl text-center block text-xs uppercase tracking-wider shadow-md"
                >
                  Schedule Home Collection Now
                </Link>
                <a href={`tel:${PHONE_DISPLAY}`} className="block text-center text-xs text-sky-200 font-bold mt-3 hover:underline">
                  Or Call: {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Location Hub Links */}
            <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
              <h3 className="text-sm font-extrabold text-[#0f2d5e] mb-3">Home Collection Locations</h3>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold text-[#2563eb]">
                {["Kengeri", "RR Nagar", "Nagarabhavi", "Vijayanagar", "Yelahanka", "Rajajinagar"].map(area => (
                  <Link
                    key={area}
                    href={`/locations/${area.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    → {area}
                  </Link>
                ))}
              </div>
              <Link href="/locations" className="block text-center text-xs font-extrabold text-[#2563eb] mt-3 hover:underline">
                View all 40+ Bengaluru areas →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sticky Mobile Book CTA ───────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-slate-500 font-medium truncate">{data.h1Title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-emerald-600">₹{data.price}</span>
            <span className="text-[11px] text-slate-400 line-through">₹{data.oldPrice}</span>
            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded-full">{data.discountPercent}</span>
          </div>
        </div>
        <Link
          href={`/book?package=${encodeURIComponent(data.h1Title)}`}
          className="flex-shrink-0 bg-[#2563eb] text-white font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wide shadow-md active:scale-95 transition-transform"
        >
          Book Now →
        </Link>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 bg-emerald-600 text-white font-extrabold p-2.5 rounded-xl shadow-md active:scale-95 transition-transform"
          aria-label="WhatsApp Booking"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
