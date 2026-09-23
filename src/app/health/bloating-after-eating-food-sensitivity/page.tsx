import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  UserCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  FlaskConical,
  Activity,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bloating After Eating? Food Sensitivity, IBS & SIBO | QXL",
  description:
    "Dr Shantakumar Muruda explains bloating after eating, food sensitivity, lactose intolerance, gluten, IBS, SIBO, IgG tests and gut health in Bengaluru.",
  alternates: {
    canonical: "https://qxldiagnostics.com/health/bloating-after-eating-food-sensitivity"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  },
  openGraph: {
    type: "article",
    title: "Why Am I Bloated After Eating? Food Sensitivity, IBS, SIBO & Food Intolerance Explained",
    description:
      "Dr Shantakumar Muruda explains the medical differences between food sensitivity, food intolerance, allergy, lactose intolerance, celiac disease, IBS and SIBO.",
    url: "https://qxldiagnostics.com/health/bloating-after-eating-food-sensitivity",
    siteName: "QXL Diagnostics",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloating After Eating? Food Sensitivity, IBS & SIBO Explained",
    description:
      "Evidence-based guidance on food sensitivity, intolerance, lactose, gluten, IBS, SIBO and appropriate diagnostic testing."
  }
};

const articleLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://qxldiagnostics.com/#organization",
      "name": "QXL Diagnostics Super Speciality Lab",
      "url": "https://qxldiagnostics.com/",
      "telephone": "+91-99646-39639",
      "areaServed": {
        "@type": "City",
        "name": "Bengaluru"
      }
    },
    {
      "@type": "Person",
      "@id": "https://qxldiagnostics.com/dr-shantakumar-muruda#person",
      "name": "Dr. Shantakumar Muruda",
      "url": "https://qxldiagnostics.com/dr-shantakumar-muruda",
      "jobTitle": "Founder & Chief Clinical Biochemist",
      "affiliation": {
        "@id": "https://qxldiagnostics.com/#organization"
      }
    },
    {
      "@type": "BlogPosting",
      "@id": "https://qxldiagnostics.com/health/bloating-after-eating-food-sensitivity#article",
      "url": "https://qxldiagnostics.com/health/bloating-after-eating-food-sensitivity",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://qxldiagnostics.com/health/bloating-after-eating-food-sensitivity"
      },
      "headline":
        "Why Am I Bloated After Eating? Food Sensitivity, Food Intolerance, IBS, SIBO and the Tests That Actually Matter",
      "description":
        "Evidence-based explanation of post-meal bloating, food sensitivity, food intolerance, lactose intolerance, celiac disease, IBS, SIBO, IgG food testing and appropriate diagnostic pathways.",
      "datePublished": "2026-09-23T09:00:00+05:30",
      "dateModified": "2026-09-23T09:00:00+05:30",
      "inLanguage": "en-IN",
      "author": {
        "@id": "https://qxldiagnostics.com/dr-shantakumar-muruda#person"
      },
      "publisher": {
        "@id": "https://qxldiagnostics.com/#organization"
      },
      "articleSection": [
        "Gastroenterology",
        "Digestive Health",
        "Food Sensitivity",
        "Food Intolerance"
      ],
      "keywords": [
        "bloating after eating",
        "food sensitivity test Bangalore",
        "food intolerance test Bangalore",
        "food intolerance test near me",
        "287 food sensitivity test",
        "lactose intolerance",
        "gluten intolerance",
        "IBS Bangalore",
        "SIBO test Bangalore",
        "hydrogen breath test Bangalore",
        "gut health test Bangalore",
        "food allergy vs food intolerance"
      ],
      "about": [
        {
          "@type": "MedicalCondition",
          "name": "Irritable Bowel Syndrome"
        },
        {
          "@type": "MedicalCondition",
          "name": "Celiac Disease"
        },
        {
          "@type": "MedicalCondition",
          "name": "Lactose Intolerance"
        },
        {
          "@type": "MedicalCondition",
          "name": "Small Intestinal Bacterial Overgrowth"
        }
      ],
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://qxldiagnostics.com/#website",
        "name": "QXL Diagnostics",
        "url": "https://qxldiagnostics.com/"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://qxldiagnostics.com/health/bloating-after-eating-food-sensitivity#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://qxldiagnostics.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Symptoms & Causes",
          "item": "https://qxldiagnostics.com/health/symptoms-causes"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Bloating After Eating & Food Sensitivity",
          "item": "https://qxldiagnostics.com/health/bloating-after-eating-food-sensitivity"
        }
      ]
    }
  ]
};

export default function BloatingFoodSensitivityArticle() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans antialiased">
      {/* Schema Injection */}
      <Script
        id="bloating-article-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* Top Breadcrumb & Metadata Header */}
      <header className="bg-[#0B2545] text-white pt-8 pb-12 px-4 sm:px-6 border-b border-amber-400/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-300 font-medium overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/health/symptoms-causes" className="hover:text-amber-400 transition-colors">
              Symptoms &amp; Causes
            </Link>
            <span>/</span>
            <span className="text-amber-300 font-bold truncate">Bloating &amp; Food Sensitivity</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 text-xs font-black uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-amber-400" />
            <span>Gastroenterology &amp; Clinical Biochemistry</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-white">
            Why Am I Bloated After Eating? Food Sensitivity, Food Intolerance, IBS, SIBO and the Tests That Actually Matter
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-slate-700/80 pt-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">
                DS
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Medical Author &amp; Reviewer</span>
                <Link
                  href="/dr-shantakumar-muruda"
                  className="font-bold text-white hover:text-amber-300 transition-colors"
                >
                  Dr. Shantakumar Muruda
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-700 pl-4">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Published 23 Sep 2026</span>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-700 pl-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NABL Accredited Clinical Review</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Body Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Key Takeaways Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 sm:p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-[#0B2545] font-black text-sm uppercase tracking-wider">
            <SparklesIcon className="w-4 h-4 text-amber-600" />
            <span>AEO Clinical Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            Post-meal bloating is frequently misdiagnosed. It arises from distinct medical mechanisms: 
            <strong> IgE Food Allergy</strong> (immediate immune reaction), <strong>Food Intolerance</strong> (enzymatic deficiency like lactase or histaminase), 
            <strong> IgG Food Sensitivity</strong> (delayed immune reaction to specific proteins), <strong>Celiac Disease</strong> (autoimmune gluten damage), 
            and <strong>SIBO</strong> (small intestinal bacterial fermentative overgrowth). Diagnostic accuracy requires targeted blood paneling rather than guesswork.
          </p>
        </div>

        {/* Section 1: The Spectrum of Post-Meal Bloating */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3">
            1. Understanding Post-Meal Bloating: Allergy vs Intolerance vs Sensitivity
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Persistent abdominal distension, fullness, gas, and discomfort after eating affect up to 30% of urban adults in Bengaluru. Patients often confuse food sensitivity with food allergy or lactose intolerance. Clinical distinction is essential:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="bg-rose-100 text-rose-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">IgE Food Allergy</span>
              <h3 className="text-sm font-black text-slate-900">Immediate Immune Response</h3>
              <p className="text-xs text-slate-600 leading-normal">
                IgE-mediated reactions occur within minutes to 2 hours of exposure. Symptoms include hives, swelling, wheezing, or anaphylaxis.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="bg-sky-100 text-sky-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">Enzymatic Intolerance</span>
              <h3 className="text-sm font-black text-slate-900">Digestive Enzyme Deficiency</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Non-immune mechanism caused by inability to break down specific sugars like lactose (lactase deficiency) or fructose.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">IgG Food Sensitivity</span>
              <h3 className="text-sm font-black text-slate-900">Delayed Immune Reactivity</h3>
              <p className="text-xs text-slate-600 leading-normal">
                IgG-mediated responses develop 4 to 72 hours post-ingestion. Causes chronic low-grade inflammation, bloating, fatigue, and IBS-like symptoms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Clinical Diagnostics at QXL */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-black text-[#0B2545] border-b border-slate-100 pb-3">
            2. The 287 Food Sensitivity Panel &amp; Differential Testing
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            At QXL Diagnostics Super Speciality Lab in Bengaluru, we evaluate digestive distress using high-throughput micro-array ELISA technology:
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <FlaskConical className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-black text-emerald-950">287 Food Sensitivity IgG Microarray</h4>
                <p className="text-xs text-emerald-800 leading-relaxed mt-0.5">
                  Screens 287 Indian and international food antigens (dairy, grains, spices, nuts, meats, pulses) to identify specific IgG antibody titers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-sky-50/60 rounded-2xl border border-sky-200">
              <Activity className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-black text-sky-950">Celiac Disease Panel (tTG IgA + Total IgA)</h4>
                <p className="text-xs text-sky-800 leading-relaxed mt-0.5">
                  Rules out autoimmune enteropathy caused by gluten proteins prior to initiating elimination diets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Primary & Secondary CTAs */}
        <section className="bg-[#0B2545] text-white rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-xl">
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Get Tested at Home Across Bengaluru
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Phlebotomists collect blood samples at your doorstep with cold-chain transport to our Doctor-Led NABL accredited central lab.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Home Collection</span>
            </Link>

            <Link
              href="/tests/food-sensitivity-test-bangalore"
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Explore 287 Food Sensitivity Test</span>
            </Link>

            <a
              href="https://wa.me/919964639639"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 border border-white/20"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp +91 9964 639 639</span>
            </a>
          </div>
        </section>

        {/* Doctor Review Attribution Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#0B2545] text-amber-400 font-black flex items-center justify-center text-xl shrink-0">
            DSM
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs font-black text-amber-600 uppercase tracking-wider">Clinical Guidance &amp; Review</div>
            <h3 className="text-base font-black text-[#0B2545]">
              <Link href="/dr-shantakumar-muruda" className="hover:underline">
                Dr. Shantakumar Muruda
              </Link>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Founder &amp; Chief Clinical Biochemist, QXL Diagnostics Super Speciality Lab, Bengaluru.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}
