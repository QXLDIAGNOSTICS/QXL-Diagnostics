import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import {
  ShieldCheck,
  Lock,
  Clock,
  FlaskConical,
  Phone,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Award,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK, NABL_CERTIFICATE } from '@/lib/businessInfo';
import SexualHealthNav from '@/components/sexual-health/SexualHealthNav';
import MedicalReviewNotice from '@/components/sexual-health/MedicalReviewNotice';

export const metadata: Metadata = {
  title: "VDRL & RPR Syphilis Test in Bangalore | Quantitative Titer | QXL Diagnostics",
  description:
    "Confidential VDRL and RPR syphilis testing in Bengaluru. Quantitative titer reporting, treponemal TPHA reflex confirmation, NABL Accredited laboratory, doorstep blood collection.",
  alternates: {
    canonical: `${SITE_URL}/tests/vdrl-rpr-test`,
  },
  openGraph: {
    title: "VDRL & RPR Syphilis Test in Bangalore | QXL Diagnostics",
    description:
      "Rapid Plasma Reagin (RPR) and VDRL testing with quantitative titers and TPHA confirmation for syphilis screening in Bengaluru.",
    url: `${SITE_URL}/tests/vdrl-rpr-test`,
    siteName: "QXL Diagnostics",
    type: "website",
  },
};

export default function VdrlRprTestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": `${SITE_URL}/tests/vdrl-rpr-test#test`,
        "name": "Syphilis Non-Treponemal Screening (VDRL / RPR Quantitative)",
        "code": {
          "@type": "MedicalCode",
          "code": "QXL-STI-03",
          "codingSystem": "QXL Laboratory Test Master"
        },
        "description": "Flocculation test detecting reaginic antibodies directed against cardiolipin-lecithin antigens, with end-point dilution quantitative titer reporting.",
        "usedToDiagnose": [
          { "@type": "MedicalCondition", "name": "Primary, Secondary, Latent, and Tertiary Syphilis" }
        ],
        "offers": {
          "@type": "Offer",
          "price": "350",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/tests/vdrl-rpr-test`
        }
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${SITE_URL}/tests/vdrl-rpr-test#webpage`,
        "url": `${SITE_URL}/tests/vdrl-rpr-test`,
        "name": "VDRL Test Near Me & RPR Test Price in Bangalore",
        "description": "Evidence-based clinical guide to VDRL/RPR syphilis serology, quantitative titers, false-positive causes, and TPHA confirmation.",
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
          { "@type": "ListItem", "position": 3, "name": "VDRL & RPR Test", "item": `${SITE_URL}/tests/vdrl-rpr-test` }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: "What is the difference between a VDRL and an RPR test?",
      a: "Both VDRL (Venereal Disease Research Laboratory) and RPR (Rapid Plasma Reagin) are non-treponemal serological tests measuring antibodies against cardiolipin released by cellular damage during Treponema pallidum infection. RPR uses carbon particles to visualize agglutination macroscopically without a microscope, making it faster and standardized for serum, whereas VDRL can also be performed on cerebrospinal fluid (CSF)."
    },
    {
      q: "What does an RPR titer (e.g. 1:16 or 1:4) mean?",
      a: "The titer represents the highest serum dilution at which antibody reactivity is still visible. A higher titer (such as 1:32 or 1:64) generally indicates active or recent infection, whereas lower titers may indicate early infection, late latent syphilis, or treated past infection. Monitoring for a four-fold drop in titer (e.g., from 1:32 down to 1:8) is how physicians confirm treatment success."
    },
    {
      q: "Can a VDRL test give a false positive?",
      a: "Yes. Non-treponemal tests are sensitive but not 100% specific. Biological false positives (BFPs) can occur in pregnancy, autoimmune disorders (like lupus), acute viral infections (Epstein-Barr, hepatitis), malaria, or following recent vaccinations. That is why CDC and Koneman diagnostic microbiology guidelines insist on confirming every reactive non-treponemal test with a specific treponemal assay like TPHA."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Script
        id="vdrl-rpr-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-xs text-slate-500 gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/sexual-health" className="hover:text-[#2563eb]">Sexual Health Hub</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold">VDRL &amp; RPR Syphilis Test</span>
        </div>
      </div>

      <section className="bg-gradient-to-br from-[#082142] via-[#0c4a6e] to-[#0f2d5e] text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block bg-[#f59e0b] text-slate-950 font-black px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              Syphilis Serology Profile
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              VDRL &amp; RPR Syphilis Testing in Bengaluru
            </h1>
            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-medium">
              Quantitative non-treponemal titers paired with treponemal TPHA reflex confirmation. NABL Accredited laboratory testing with discrete doorstep collection.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hello QXL, I would like to enquire about / book a VDRL & RPR Syphilis screen.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563eb] hover:bg-blue-600 text-white font-black px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire &amp; Book Syphilis Test</span>
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
        {/* Core Clinical Explanation */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8 text-slate-700 text-sm leading-relaxed">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e] mb-3">
                Why Quantitative Titers Matter in Syphilis Diagnosis
              </h2>
              <p>
                In accordance with <em>Koneman&apos;s Color Atlas and Textbook of Diagnostic Microbiology</em> (7th Edition, Chapter 20: The Spirochetes) and the CDC STI treatment guidelines, evaluating syphilis requires understanding non-treponemal versus treponemal antibody dynamics:
              </p>
              <div className="mt-4 space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-extrabold text-slate-900 text-sm">1. Non-Treponemal Tests (RPR / VDRL)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Detect antibodies against cardiolipin-lecithin-cholesterol antigens. Because these levels correlate with active spirochete activity, quantitative titers (e.g. 1:2, 1:4, 1:8, 1:16, 1:32) are reported. Following effective penicillin therapy, these titers decrease by four-fold (e.g., from 1:16 to 1:4).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="font-extrabold text-slate-900 text-sm">2. Treponemal Confirmation (TPHA / TPPA)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Detect specific antibodies against Treponema pallidum surface proteins. These tests confirm whether a positive RPR is a genuine syphilis infection or a biological false positive. Treponemal antibodies typically remain reactive for life even after complete clinical cure.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0c4a6e] mb-3">
                When Should You Get a Syphilis Test?
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Presence of a genital sore or chancre:</strong> Primary syphilis begins with a single, firm, round, typically painless ulcer at the site of infection (genitalia, rectum, mouth).</li>
                <li><strong>Secondary rash:</strong> Non-itchy reddish-brown rash on the palms of the hands and soles of the feet, accompanied by swollen lymph nodes or fever.</li>
                <li><strong>Known sexual partner exposure:</strong> Routine partner testing following a partner&apos;s positive diagnosis.</li>
                <li><strong>Routine sexual wellness / pre-marital screen:</strong> Annual screening for sexually active adults.</li>
              </ul>
            </div>
          </div>

          {/* Specimen & Quality Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <span className="text-xs font-black uppercase text-[#2563eb] tracking-wider block">Specimen Protocol</span>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#2563eb]" />
                  <span><strong>Sample:</strong> 3 mL Venous Blood (Serum)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span><strong>Fasting:</strong> No Fasting Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
                  <span><strong>TAT:</strong> 12–24 Hours</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/health-hub/genital-sores-causes"
                  className="text-xs font-black text-[#2563eb] hover:underline flex items-center gap-1"
                >
                  <span>Compare Syphilis vs Herpes Sores</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0c4a6e]">
            Frequently Asked Questions About Syphilis Serology
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base font-black text-[#0c4a6e]">{f.q}</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <MedicalReviewNotice />
        <SexualHealthNav currentPath="/tests/vdrl-rpr-test" />
      </main>
    </div>
  );
}

