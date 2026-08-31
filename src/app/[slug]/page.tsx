import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, CheckCircle2, ShieldCheck, Activity, Clock, ArrowRight, Beaker, Calendar, AlertCircle } from "lucide-react";
import { getDynamicPageData } from "@/lib/seoPages/dynamicPageResolver";
import { PHONE_DISPLAY, WHATSAPP_LINK, NABL_CERTIFICATE, ISO_STANDARD, SITE_URL } from "@/lib/businessInfo";
import { getTestInternalLinks } from "@/lib/seo/internalLinks";

import MedicalReviewerBadge from "@/components/MedicalReviewerBadge";
import ReferenceRangesTable from "@/components/ReferenceRangesTable";
import RelatedTestsGrid from "@/components/RelatedTestsGrid";
import DoctorInterpretationNote from "@/components/DoctorInterpretationNote";

type Props = { params: Promise<{ slug: string }> };

const INVALID_SLUGS = new Set(["home", "urology-3", "test", "demo", "sample", "admin", "login", "index"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (slug.includes('.') || slug.startsWith('_') || INVALID_SLUGS.has(slug.toLowerCase())) {
    return { title: "Page Not Found | QXL Diagnostics" };
  }

  const pageData = getDynamicPageData(slug);
  if (!pageData) {
    return { title: "Page Not Found | QXL Diagnostics" };
  }

  const links = getTestInternalLinks(slug);
  const canonical = `${SITE_URL}/${slug}`;

  return {
    title: pageData.title,
    description: pageData.metaDescription,
    alternates: { canonical },
    other: {
      "medical-reviewed-by": links?.doctorName ?? pageData.doctorName ?? "Dr. Shantakumar Muruda",
      "medical-reviewer-credentials": links?.doctorQuals ?? pageData.doctorQuals ?? "MD Biochemistry",
      "medical-review-date": "2026-08-31",
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
      "NABL Certified lab Bangalore",
      "home blood collection Bangalore",
      "QXL Diagnostics",
      "blood test Bengaluru",
    ],
  };
}

export default async function DynamicSlugTestPage({ params }: Props) {
  const { slug } = await params;

  if (slug.includes('.') || slug.startsWith('_') || INVALID_SLUGS.has(slug.toLowerCase())) {
    notFound();
  }

  const data = getDynamicPageData(slug);
  if (!data) {
    notFound();
  }

  const links = getTestInternalLinks(slug);
  const relatedTests = data.relatedTests ?? links?.relatedTests ?? [];
  const doctorSlug = data.doctorSlug ?? links?.doctorSlug ?? "dr-shantakumar-muruda";
  const doctorName = data.doctorName ?? links?.doctorName ?? "Dr. Shantakumar Muruda";
  const doctorQuals = data.doctorQuals ?? links?.doctorQuals ?? "MD Biochemistry, NABL Lead Assessor";

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": data.h1Title,
    "description": data.metaDescription,
    "url": `${SITE_URL}/${slug}`,
    "usesDevice": { "@type": "MedicalDevice", "name": "Automated Clinical Analyser — NABL Certified" },
    "normalRange": data.referenceRanges
      ? data.referenceRanges.map(r => ({
          "@type": "MedicalIntangible",
          "name": r.label,
          "description": `${r.range} ${r.unit}`
        }))
      : undefined,
    "preparation": data.fastingRequired,
    "relevantSpecialty": { "@type": "MedicalSpecialty", "name": data.category },
    "provider": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics",
      "alternateName": ["QXL Diagnostics Super Speciality Lab", "Qualitify Healthtech"],
      "url": SITE_URL,
      "telephone": PHONE_DISPLAY,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3rd Floor, SLN Complex, Mysore Road, Kengeri",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560060",
        "addressCountry": "IN"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": `NABL Certification ${NABL_CERTIFICATE}`,
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
      { "@type": "ListItem", "position": 3, "name": data.h1Title, "item": `${SITE_URL}/${slug}` }
    ]
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24">
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 px-4 py-2.5">
        <div className="max-w-[1260px] mx-auto">
          <ol className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium flex-wrap">
            <li><Link href="/" className="hover:text-[#2563eb] transition-colors">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link href="/test-directory" className="hover:text-[#2563eb] transition-colors">Tests</Link></li>
            <li className="text-slate-300">/</li>
            <li className="text-slate-700 font-semibold truncate max-w-[240px]">{data.h1Title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-10 lg:py-14 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#FF9933] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
              {data.badge}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight !text-white drop-shadow-sm" style={{ color: '#ffffff' }}>
              {data.h1Title}
            </h1>

            <p className="text-blue-100 text-sm md:text-base max-w-3xl leading-relaxed mb-4">
              {data.subtitle}
            </p>

            {/* Key Specifications */}
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

            {/* Pathologist Review Badge */}
            <div className="pt-1 mb-5">
              <MedicalReviewerBadge
                doctorName={doctorName}
                qualifications={doctorQuals}
                reviewDate="August 2026"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/book?package=${encodeURIComponent(data.h1Title)}`}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-8 py-3.5 rounded-full transition-all shadow-lg text-sm uppercase tracking-wide flex items-center gap-2"
              >
                Book Test @ ₹{data.price} <ArrowRight className="w-4 h-4" />
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

      {/* Quality Trust Bar */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-[1260px] mx-auto px-4 flex flex-wrap items-center gap-4 justify-center sm:justify-start">
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> NABL Certified ({NABL_CERTIFICATE})
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200">
            <Activity className="w-3.5 h-3.5" /> Free Home Sample Collection
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
            <Clock className="w-3.5 h-3.5" /> Same-Day Reports on WhatsApp
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Doctor-Reviewed Results
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="py-10">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-8">
          
          {/* Main Body */}
          <div className="flex-1 space-y-6">
            
            {/* Quick Test Summary Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-5">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Department</span>
                  <p className="text-lg font-black text-[#0f2d5e]">{data.category}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-600">₹{data.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{data.oldPrice}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-1 rounded-full">{data.discountPercent}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                  <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-wider block mb-1">Parameters Covered</span>
                  <p className="font-bold text-slate-800 text-sm">{data.parametersCount}</p>
                </div>
                <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                  <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-wider block mb-1">Sample Specimen</span>
                  <p className="font-bold text-slate-800 text-sm">{data.sampleType} ({data.sampleVolume || '2 mL'})</p>
                </div>
                <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                  <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-wider block mb-1">Report Delivery SLA</span>
                  <p className="font-bold text-slate-800 text-sm">{data.turnaroundTime}</p>
                </div>
              </div>

              {/* Fasting & Preparation */}
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Preparation &amp; Fasting Guidelines</h2>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-sm font-semibold leading-relaxed mb-6">
                💡 <strong>Instructions:</strong> {data.fastingRequired}
              </div>

              {/* When to Get Tested */}
              {data.whenToTest && data.whenToTest.length > 0 && (
                <>
                  <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">When Should You Get Tested?</h2>
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

              {/* Detailed Multi-Paragraph Overview */}
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Detailed Clinical Overview</h2>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
                {data.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Clinical Significance Box */}
              {data.clinicalSignificance && (
                <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-5 mb-6">
                  <h2 className="text-base font-extrabold text-[#0f2d5e] mb-2">Clinical Significance</h2>
                  <p className="text-slate-700 text-sm leading-relaxed">{data.clinicalSignificance}</p>
                </div>
              )}

              {/* Preanalytical & Limitations Notes */}
              {(data.preanalyticalNotes || (data.limitations && data.limitations.length > 0)) && (
                <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5 mb-6 text-xs text-red-950">
                  <h2 className="text-sm font-extrabold text-red-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" /> Diagnostic Limitations &amp; Interferences
                  </h2>
                  {data.preanalyticalNotes && <p className="mb-2 font-medium">{data.preanalyticalNotes}</p>}
                  {data.limitations && (
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 font-medium">
                      {data.limitations.map((lim, idx) => (
                        <li key={idx}>{lim}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Why Important Points */}
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

            {/* Reference Ranges Table */}
            {data.referenceRanges && data.referenceRanges.length > 0 && (
              <ReferenceRangesTable
                ranges={data.referenceRanges}
                testName={data.h1Title}
              />
            )}

            {/* FAQs */}
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

            {/* Related Tests Grid */}
            {relatedTests.length > 0 && (
              <RelatedTestsGrid tests={relatedTests} />
            )}

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[360px] space-y-5">
            {/* Price & Booking Card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-emerald-600">₹{data.price}</span>
                <span className="text-sm text-slate-400 line-through">₹{data.oldPrice}</span>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full">{data.discountPercent}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4">Includes free doorstep home sample collection</p>
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
              <h3 className="text-base font-extrabold !text-white text-white mb-4 border-b border-white/10 pb-3 relative z-10" style={{ color: '#ffffff' }}>NABL Quality Guarantees</h3>
              
              <div className="space-y-4 text-xs font-semibold relative z-10">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white text-sm">NABL Certified ({NABL_CERTIFICATE})</p>
                    <p className="text-sky-200 mt-0.5">{ISO_STANDARD} quality compliance</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white text-sm">Same-Day Digital Reports</p>
                    <p className="text-sky-200 mt-0.5">Delivered straight to WhatsApp &amp; Email</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white text-sm">Free Doorstep Collection</p>
                    <p className="text-sky-200 mt-0.5">Sterile vacuum containers &amp; cold-chain kits</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
                <Link
                  href={`/book?package=${encodeURIComponent(data.h1Title)}`}
                  className="w-full bg-[#2563eb] hover:bg-blue-600 text-white font-extrabold py-3 rounded-xl text-center block text-xs uppercase tracking-wider shadow-md"
                >
                  Schedule Home Collection
                </Link>
                <a href={`tel:${PHONE_DISPLAY}`} className="block text-center text-xs text-sky-200 font-bold mt-3 hover:underline">
                  Or Call Helpline: {PHONE_DISPLAY}
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

      {/* Sticky Mobile Book CTA */}
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
