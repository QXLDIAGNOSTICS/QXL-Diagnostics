import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
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
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import {
  SEXUAL_HEALTH_LANDING_PAGES,
  getSexualHealthPageBySlug,
  getAllSexualHealthSlugs
} from '@/lib/sexual-health/landingPagesData';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';
import PepUrgentBanner from '@/components/sexual-health/PepUrgentBanner';
import HivWindowCalculator from '@/components/sexual-health/HivWindowCalculator';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSexualHealthSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSexualHealthPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found | QXL Diagnostics',
      robots: { index: false, follow: false },
    };
  }

  const canonicalUrl = `${SITE_URL}/sexual-health/${slug}`;

  return {
    title: page.seoTitle || page.title,
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      siteName: 'QXL Diagnostics',
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: page.title,
      description: page.description,
    },
  };
}

export default async function SexualHealthLandingPageDynamic({ params }: PageProps) {
  const { slug } = await params;
  const page = getSexualHealthPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/sexual-health/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": page.h1,
        "description": page.description,
        "inLanguage": "en-IN",
        "lastReviewed": "2026-11-18",
        "reviewedBy": {
          "@type": "Person",
          "name": "Dr. Shantakumar Muruda, MD (Biochemistry)",
          "jobTitle": "Consultant Clinical Biochemist, Founder & CEO – QXL Diagnostics, NABL Lead & Technical Assessor",
          "worksFor": {
            "@id": `${SITE_URL}/#organization`
          }
        },
        "publisher": {
          "@id": `${SITE_URL}/#organization`
        },
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "name": "QXL Diagnostics",
          "url": SITE_URL
        }
      },
      {
        "@type": "MedicalOrganization",
        "@id": `${SITE_URL}/#organization`,
        "name": "QXL Diagnostics",
        "url": SITE_URL,
        "logo": `${SITE_URL}/images/qxl-logo.png`,
        "telephone": PHONE_E164,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": PHONE_E164,
          "contactType": "customer support",
          "areaServed": "IN-KA",
          "availableLanguage": ["English", "Kannada", "Hindi"]
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sexual Health Hub",
            "item": `${SITE_URL}/sexual-health`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": page.h1,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": page.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <Script
        id={`landing-${slug}-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">{page.h1}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
                {page.badge}
              </span>
              <span className="inline-block bg-white/10 text-white font-medium px-3 py-1 rounded-full text-xs">
                {page.category}
              </span>
              <span className="inline-flex items-center gap-1 text-sky-200 text-xs font-semibold bg-sky-900/50 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                NABL Accredited Lab (MC-6849)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {page.h1}
            </h1>

            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium max-w-3xl">
              {page.subtitle}
            </p>

            {/* Emergency Notice if present */}
            {page.emergencyNotice && (
              <div className="bg-rose-950/80 border border-rose-400/60 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-rose-100 space-y-2">
                <div className="flex items-center gap-2 font-black text-white text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{page.emergencyNotice.title}</span>
                  <span className="ml-auto bg-rose-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full">
                    {page.emergencyNotice.badge}
                  </span>
                </div>
                <p className="leading-relaxed text-rose-200/95">
                  {page.emergencyNotice.text}
                </p>
              </div>
            )}

            {/* Hero CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/sexual-health/packages"
                className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-900/30"
              >
                <span>View STI Packages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Consultation</span>
              </a>
              <a
                href={`tel:${PHONE_E164}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors border border-white/20"
              >
                <Phone className="w-4 h-4" />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 max-w-7xl py-12 space-y-14">
        {/* Urgent PEP Banner if indicated */}
        {page.showPepBanner && <PepUrgentBanner />}

        {/* Interactive HIV Window Calculator if indicated */}
        {page.showHivCalculator && (
          <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
            <HivWindowCalculator />
          </section>
        )}

        {/* Clinical Overview Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Clinical Overview</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Evidence-Based Understanding &amp; Diagnostic Protocol
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
            {page.overview.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Key Clinical Takeaways */}
          {page.keyTakeaways && page.keyTakeaways.length > 0 && (
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 sm:p-6 space-y-3">
              <h3 className="text-base font-bold text-[#0c4a6e] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563eb]" />
                Key Clinical Takeaways
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-800">
                {page.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Recommended Investigations Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Recommended Investigations</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Available Laboratory Assays &amp; Pricing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              NABL-accredited diagnostic investigations performed under strict ISO 15189:2022 standards.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0c4a6e] text-white uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Investigation / Assay</th>
                  <th className="py-3 px-4">Specimen Type</th>
                  <th className="py-3 px-4">Window / Timing</th>
                  <th className="py-3 px-4">Turnaround Time</th>
                  <th className="py-3 px-4">Price (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {page.investigations.map((inv, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>{inv.name}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{inv.clinicalNote}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{inv.specimen}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{inv.window}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{inv.tat}</td>
                    <td className="py-3.5 px-4 font-black text-[#2563eb]">{inv.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Milestones / Timeline if present */}
        {page.milestones && page.milestones.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Testing Timeline</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
                Step-by-Step Clinical Milestones Following Exposure
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {page.milestones.map((m, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900">
                      {m.timeframe}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      Milestone {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-[#0c4a6e]">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.clinicalGuidance}
                  </p>
                  <div className="pt-2 text-xs border-t border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-500">Action:</span>
                    <span className="font-bold text-[#2563eb]">{m.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Preparation Guidelines if present */}
        {page.preparationGuidelines && page.preparationGuidelines.length > 0 && (
          <section className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-3">
            <h3 className="text-base font-black text-amber-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Pre-Test Preparation Guidelines
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-amber-950/90 leading-relaxed">
              {page.preparationGuidelines.map((guide, idx) => (
                <li key={idx}>{guide}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Central Bengaluru Laboratory & Privacy Notice */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Strict Confidentiality &amp; Laboratory Governance</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-sky-400" />
                Physical Central Facilities in Bengaluru
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Samples are processed directly at our NABL-accredited reference laboratory facilities in Kengeri and Yelahanka, operating under ISO 15189:2022 standards (Certificate No. MC-6849). No third-party outsourcing.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <div><strong>Kengeri Hub:</strong> 540, 1st Floor, 5th Cross, Kengeri Satellite Town, Bengaluru 560060</div>
                <div><strong>Yelahanka Facility:</strong> North Bengaluru Referral Centre, Yelahanka, Bengaluru 560064</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                100% Discrete Patient Privacy Guarantee
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Numeric Barcoding:</strong> Laboratory samples are processed via alphanumeric barcodes without patient names on testing tubes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Encrypted Digital PDF:</strong> Password-protected lab reports delivered exclusively to your private WhatsApp or email.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Discreet Phlebotomy:</strong> Trained phlebotomy specialists available in plain clothes with temperature-controlled cold chain.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
              Direct Questions &amp; Clinical Answers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear, transparent answers designed for patient clarity and AI-assisted search retrieval.
            </p>
          </div>

          <div className="space-y-3">
            {page.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm transition-all duration-200 open:border-blue-300 open:shadow-md"
              >
                <summary className="font-bold text-sm sm:text-base text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="flex items-start gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#2563eb] shrink-0 mt-1" />
                    <span>{faq.question}</span>
                  </span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed pl-6 border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Clinical Evidence & References */}
        {page.clinicalReferences && page.clinicalReferences.length > 0 && (
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3 text-xs text-slate-600">
            <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              Clinical Evidence &amp; Guideline References
            </h3>
            <ul className="space-y-1.5">
              {page.clinicalReferences.map((ref, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <ExternalLink className="w-3 h-3 text-[#2563eb] shrink-0" />
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2563eb] underline underline-offset-2"
                  >
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related Sexual Health Links */}
        {page.relatedSlugs && page.relatedSlugs.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Related Sexual Health Topics &amp; Investigations
            </h3>
            <div className="flex flex-wrap gap-2">
              {page.relatedSlugs.map((rSlug) => (
                <Link
                  key={rSlug}
                  href={`/sexual-health/${rSlug}`}
                  className="inline-flex items-center gap-1 bg-slate-100 hover:bg-blue-50 hover:text-[#2563eb] text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                >
                  <span>{rSlug.replace(/-/g, ' ')}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Clinical Review Notice */}
        <MedicalReviewNotice />

        {/* Sexual Health Navigation Bar */}
        <SexualHealthNav currentPath={`/sexual-health/${slug}`} />
      </main>
    </div>
  );
}

