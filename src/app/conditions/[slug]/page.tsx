import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound, redirect } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Activity,
  Stethoscope,
  AlertTriangle,
  FileText,
  ChevronRight,
  Phone,
  MessageSquare,
  HelpCircle,
  Clock,
  Lock,
  Award
} from 'lucide-react';
import MedicalReviewerBadge from '@/components/MedicalReviewerBadge';
import { CONDITIONS_DATA } from '@/lib/conditionsData';
import {
  SITE_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_LINK,
  NABL_CERTIFICATE,
  ISO_STANDARD
} from '@/lib/businessInfo';

export const CONDITION_REDIRECT_MAP: Record<string, string> = {
  "food-sensitivity": "food-intolerance-digestive",
  "hair-fall-investigation": "hair-fall",
  "joint-pain-arthritis": "joint-pain",
  "allergy-testing": "allergy",
  "fever-infections": "fever-season",
  "thyroid-health": "thyroid",
  "heart-health": "cardiac-risk-heart-health",
  "womens-health": "pcos-pcod-hormone-testing",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CONDITIONS_DATA).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (CONDITION_REDIRECT_MAP[slug]) {
    redirect(`/conditions/${CONDITION_REDIRECT_MAP[slug]}`);
  }
  const condition = CONDITIONS_DATA[slug];
  if (!condition) return { title: "Condition Diagnostics | QXL Diagnostics" };

  const canonical = `${SITE_URL}/conditions/${slug}`;

  return {
    title: condition.title,
    description: condition.subtitle,
    alternates: {
      canonical,
    },
    openGraph: {
      title: condition.title,
      description: condition.subtitle,
      url: canonical,
      siteName: "QXL Diagnostics",
      type: "article",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: condition.title,
      description: condition.subtitle,
    },
  };
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params;
  if (CONDITION_REDIRECT_MAP[slug]) {
    redirect(`/conditions/${CONDITION_REDIRECT_MAP[slug]}`);
  }
  const condition = CONDITIONS_DATA[slug];
  if (!condition) notFound();

  const canonicalUrl = `${SITE_URL}/conditions/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": condition.title,
        "description": condition.subtitle,
        "inLanguage": "en-IN",
        "publisher": {
          "@type": "DiagnosticLab",
          "name": "QXL Diagnostics",
          "url": SITE_URL,
          "telephone": PHONE_DISPLAY
        },
        "about": {
          "@type": "MedicalCondition",
          "name": condition.h1Title,
          "signOrSymptom": condition.symptoms.map(s => ({
            "@type": "MedicalSignOrSymptom",
            "name": s
          }))
        },
        "breadcrumb": { "@id": `${canonicalUrl}#breadcrumbs` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
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
            "name": "Conditions Directory",
            "item": `${SITE_URL}/conditions`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": condition.h1Title,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": condition.faqs.map(faq => ({
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
    <main className="bg-slate-50 min-h-screen text-slate-900">
      <Script
        id={`condition-${slug}-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Strip */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/conditions" className="hover:text-blue-600 transition-colors">Conditions</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">{condition.h1Title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#0f2d5e] to-[#1e3a8a] text-white py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-200 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            {condition.category} Clinical Guide
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {condition.h1Title}
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-3xl leading-relaxed">
            {condition.subtitle}
          </p>

          <div className="pt-2">
            <MedicalReviewerBadge />
          </div>
        </div>
      </section>

      <section className="py-12 max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left main content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Clinical Overview */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> Clinical Overview &amp; Diagnostic Importance
            </h2>
            {condition.overview.map((paragraph, idx) => (
              <p key={idx} className="text-sm text-slate-700 leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {/* Symptoms */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Common Symptoms &amp; Clinical Indicators
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {condition.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Tests */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-600" /> Recommended Laboratory Investigations
              </h2>
              <span className="text-xs text-slate-500 font-semibold">NABL Accredited Assays</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {condition.recommendedTests.map((t, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-all bg-slate-50/50">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="text-lg font-black text-slate-900">₹{t.price}</span>
                    <Link
                      href={`/${t.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 uppercase tracking-wider transition-all shadow-sm"
                    >
                      View Test <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testing & Preparation Guidelines */}
          {condition.guidelines && condition.guidelines.length > 0 && (
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Pre-Test Preparation &amp; Clinical Guidelines
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {condition.guidelines.map((guideline, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                    <span className="leading-relaxed">{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Frequently Asked Questions */}
          {condition.faqs && condition.faqs.length > 0 && (
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
              </h2>
              <div className="space-y-3 pt-1">
                {condition.faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group border border-slate-200 rounded-xl p-4 bg-slate-50/50 open:bg-white transition-all"
                  >
                    <summary className="font-bold text-sm text-slate-900 cursor-pointer flex items-center justify-between gap-3 select-none">
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                    </summary>
                    <p className="text-xs sm:text-sm text-slate-700 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Booking Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl space-y-5">
            <span className="inline-block bg-emerald-400 text-slate-950 font-black px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
              Doorstep Phlebotomy
            </span>
            <h3 className="text-xl font-black text-white leading-snug">
              Book Home Sample Collection Across Bangalore
            </h3>
            <p className="text-xs text-blue-100/90 leading-relaxed">
              Safe sample draw by trained phlebotomy specialists. Samples transported in cold-chain containers to our NABL Accredited central laboratory ({NABL_CERTIFICATE}).
            </p>

            <div className="space-y-2 pt-1 text-xs text-blue-200">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>NABL Accredited ({NABL_CERTIFICATE}, {ISO_STANDARD})</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-Day &amp; 6–12h Digital Reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-sky-300 shrink-0" />
                <span>Barcoded Tamper-Evident Tubes</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/home-blood-collection-bangalore"
                className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                Book Home Collection
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                <Phone className="w-3.5 h-3.5" /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Quick Navigator to other Conditions */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
              Explore More Diagnostic Guides
            </h4>
            <ul className="space-y-1 text-xs">
              {Object.values(CONDITIONS_DATA)
                .filter(c => c.slug !== slug)
                .slice(0, 7)
                .map(c => (
                  <li key={c.slug}>
                    <Link
                      href={`/conditions/${c.slug}`}
                      className="block p-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
                    >
                      {c.h1Title}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/conditions"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                View all 15 condition guides &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
