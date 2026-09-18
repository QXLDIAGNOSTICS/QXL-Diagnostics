import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Newspaper, Building2, ExternalLink, ShieldCheck, Microscope, Award, FileText, CheckCircle2, MessageSquareText, Phone } from "lucide-react";
import { SITE_URL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/businessInfo";

const ARTICLE_URL = `${SITE_URL}/news/qxl-diagnostics-60-hospital-laboratory-partnerships-2028/`;
const OG_IMAGE_URL = `${SITE_URL}/images/news/qxl-hlm-expansion-banner.svg`;

export const metadata: Metadata = {
  title: "QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028 | Media Coverage",
  description:
    "Read national media coverage of QXL Diagnostics' plan to expand Hospital Laboratory Management partnerships across India, targeting 60 hospital laboratory partnerships by 2028.",
  alternates: {
    canonical: ARTICLE_URL,
  },
  openGraph: {
    title: "QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028",
    description: "National media coverage of QXL Diagnostics' Hospital Laboratory Management expansion strategy.",
    url: ARTICLE_URL,
    type: "article",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "QXL Diagnostics Hospital Laboratory Management media coverage and 60 hospital partnerships expansion plan",
      },
    ],
    siteName: "QXL Diagnostics",
  },
  twitter: {
    card: "summary_large_image",
    title: "QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028",
    description: "Media coverage of QXL Diagnostics' Hospital Laboratory Management expansion.",
    images: [OG_IMAGE_URL],
  },
};

const mediaPublications = [
  {
    name: "Business Standard",
    category: "NATIONAL BUSINESS DAILY",
    desc: "Business Standard reports on QXL Diagnostics' strategy to expand its Hospital Laboratory Management network, targeting 60 hospital laboratory partnerships by 2028.",
    url: "https://www.business-standard.com/content/press-releases-ani/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-126091600351_1.html",
    cta: "Read on Business Standard",
    logo: "/images/media/business-standard.svg",
    accentColor: "border-t-4 border-t-[#0f2d5e]",
    badgeBg: "bg-blue-50 text-[#0f2d5e] border-blue-200",
  },
  {
    name: "The Hindu",
    category: "NATIONAL NEWSPAPER",
    desc: "The Hindu features syndicated media coverage detailing QXL Diagnostics' doctor-led laboratory management model for hospitals in India.",
    url: "https://www.thehindu.com/brandhub/pr-release/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028/article71471156.ece",
    cta: "Read on The Hindu",
    logo: "/images/media/the-hindu.svg",
    accentColor: "border-t-4 border-t-slate-800",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
  },
  {
    name: "The Hindu BusinessLine",
    category: "FINANCIAL DAILY",
    desc: "BusinessLine coverage highlighting QXL Diagnostics' hybrid hospital laboratory model combining onsite emergency testing with central reference diagnostics.",
    url: "https://www.thehindubusinessline.com/brandhub/pr-release/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028/article71471158.ece",
    cta: "Read on BusinessLine",
    logo: "/images/media/businessline.svg",
    accentColor: "border-t-4 border-t-[#005596]",
    badgeBg: "bg-sky-50 text-[#005596] border-sky-200",
  },
  {
    name: "News18",
    category: "NATIONAL NEWS NETWORK",
    desc: "News18 agency feed report on QXL Diagnostics Super Speciality Lab's plan to partner with 60 hospitals across India.",
    url: "https://www.news18.com/amp/agency-feeds/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-10333227.html",
    cta: "Read on News18",
    logo: "/images/media/news18.svg",
    accentColor: "border-t-4 border-t-[#CC0000]",
    badgeBg: "bg-red-50 text-[#CC0000] border-red-200",
  },
  {
    name: "The Tribune",
    category: "NATIONAL DAILY",
    desc: "The Tribune business section feature detailing QXL's expansion in laboratory operations, quality management and NABL accreditation readiness.",
    url: "https://www.tribuneindia.com/news/business/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-2-2/",
    cta: "Read on The Tribune",
    logo: "/images/media/the-tribune.svg",
    accentColor: "border-t-4 border-t-[#0f172a]",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
  },
  {
    name: "ANI News",
    category: "NEWS AGENCY WIRE",
    desc: "Asian News International coverage of QXL Diagnostics' hospital laboratory partnership framework and super-speciality diagnostic capabilities.",
    url: "https://www.aninews.in/news/business/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-202820260916105453/",
    cta: "Read ANI Coverage",
    logo: "/images/media/ani.svg",
    accentColor: "border-t-4 border-t-[#D32F2F]",
    badgeBg: "bg-red-50 text-[#D32F2F] border-red-200",
  },
  {
    name: "Press Trust of India",
    category: "NATIONAL PRESS WIRE",
    desc: "Press Trust of India distribution report detailing QXL Diagnostics' turnkey laboratory management model for hospitals and nursing homes.",
    url: "https://www.ptinews.com/press-release/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028/4070100",
    cta: "Read PTI Coverage",
    logo: "/images/media/pti.svg",
    accentColor: "border-t-4 border-t-[#003366]",
    badgeBg: "bg-blue-50 text-[#003366] border-blue-200",
  },
  {
    name: "Business Wire India",
    desc: "Official press release distribution on Business Wire India with 177 online postings reported across national media networks.",
    category: "OFFICIAL PRESS RELEASE WIRE",
    url: "https://www.businesswireindia.com/qxl-diagnostics-targets-60-hospital-laboratory-partnerships-by-2028-101689.html",
    cta: "Read Original Press Release",
    logo: "/images/media/business-wire.svg",
    accentColor: "border-t-4 border-t-[#00A3E0]",
    badgeBg: "bg-cyan-50 text-[#00A3E0] border-cyan-200",
  },
];

const hlmPillars = [
  {
    title: "24×7 Onsite Emergency Testing",
    desc: "High-frequency, urgent investigations (CBC, Electrolytes, Creatinine, ABG, Cardiac Markers) remain inside the hospital laboratory close to the patient.",
    icon: ShieldCheck,
  },
  {
    title: "Central Super-Speciality Lab",
    desc: "Specialised or lower-volume tests (Autoimmune IFA, Hormones, HPLC, Molecular, Histopathology) connect seamlessly to QXL's central reference laboratory.",
    icon: Microscope,
  },
  {
    title: "NABL Quality Governance",
    desc: "QXL implements standard operating procedures, IQC, EQAS/PT, documentation, and accreditation preparedness under NABL lead assessor supervision.",
    icon: Award,
  },
  {
    title: "Turnkey Operations & Manpower",
    desc: "Complete operational support covering equipment placement, reagent inventory, LIS digital workflow, and trained laboratory personnel.",
    icon: Building2,
  },
];

export default function MediaCoveragePage() {
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028",
    description: "Media coverage of QXL Diagnostics' Hospital Laboratory Management expansion strategy and target of 60 hospital laboratory partnerships by 2028.",
    datePublished: "2026-09-16",
    dateModified: "2026-09-18",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": ARTICLE_URL,
    },
    author: {
      "@type": "Organization",
      name: "QXL Diagnostics Super Speciality Lab",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "QXL Diagnostics Super Speciality Lab",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    image: [OG_IMAGE_URL],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "News", item: `${SITE_URL}/news/` },
      { "@type": "ListItem", position: 3, name: "QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028", item: ARTICLE_URL },
    ],
  };

  return (
    <main className="bg-[#f8fafc] min-h-screen text-slate-800 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO HEADER ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 75% 20%, #38bdf8 0%, transparent 60%)" }} />
        
        <div className="max-w-[1240px] mx-auto px-4 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-sky-300 mb-6 font-semibold flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
            <Link href="/news/" className="hover:text-white transition-colors">News</Link>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-white">Hospital Laboratory Partnerships</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="bg-[#D69A18] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
              NATIONAL MEDIA COVERAGE
            </span>
            <span className="bg-white/10 text-sky-200 border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full">
              Business Wire India Distribution
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight text-white tracking-tight">
            QXL Diagnostics Targets 60 Hospital Laboratory Partnerships by 2028
          </h1>

          <p className="text-sky-100 text-base md:text-lg max-w-3xl leading-relaxed mb-6 font-medium">
            National media coverage of QXL Diagnostics&apos; Hospital Laboratory Management (HLM) expansion strategy across India.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-200 pt-4 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#D69A18]" />
              <span>Published: 16 September 2026</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>177 Online Media Postings</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>QXL Super Speciality Lab, Bengaluru</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN ARTICLE & MEDIA CARDS BODY ── */}
      <section className="py-12 max-w-[1240px] mx-auto px-4">

        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-10">
          
          {/* Section 1: About the Announcement */}
          <div>
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest block mb-1">PRESS RELEASE SUMMARY</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mb-4">About the Announcement</h2>
            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <p>
                <strong>QXL Diagnostics Super Speciality Lab</strong> has announced its strategic plan to expand its Hospital Laboratory Management (HLM) network, targeting <strong className="text-[#0f2d5e]">60 hospital laboratory partnerships by 2028</strong>.
              </p>
              <p>
                The initiative enables hospitals, nursing homes, and healthcare groups to access professionally managed laboratory operations, diagnostic infrastructure, quality systems, trained laboratory personnel, specialised testing, and reference laboratory support.
              </p>
            </div>
          </div>

          {/* 177 Online Postings Stat Callout Banner */}
          <aside className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-l-4 border-[#D69A18] rounded-2xl p-6 sm:p-8 shadow-xs border border-amber-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center shrink-0 shadow-2xs">
                  <Newspaper className="w-7 h-7 text-[#D69A18]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl sm:text-3xl font-black text-[#0f2d5e]">177 Online Postings</span>
                    <span className="bg-[#D69A18] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">VERIFIED REPORT</span>
                  </div>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed m-0">
                    The release was distributed across 177 online publications and news platforms through Business Wire India, including major Google News and Yahoo News listings.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Section 2: Four Pillars of QXL HLM */}
          <div>
            <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest block mb-1">CORE ARCHITECTURE</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e] mb-6">The QXL Hospital Laboratory Management Model</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hlmPillars.map((pillar, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 hover:border-[#D69A18] hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#D69A18] border border-amber-300 flex items-center justify-center mb-3">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-[#0f2d5e] text-base mb-2">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Featured Media Coverage Cards Grid (The 8 Selected Outlets) */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-[#D69A18] font-black text-xs uppercase tracking-widest block mb-1">EDITORIAL CITATIONS</span>
                <h2 className="text-2xl md:text-3xl font-black text-[#0f2d5e]">Featured Media Coverage</h2>
              </div>
              <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full w-fit">
                8 Selected Outlets
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaPublications.map((pub, idx) => (
                <article
                  key={idx}
                  className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group ${pub.accentColor}`}
                >
                  <div className="p-6 space-y-4">
                    {/* Top Row: Category tag + Logo */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${pub.badgeBg}`}>
                        {pub.category}
                      </span>
                    </div>

                    {/* Logo Box */}
                    <div className="h-20 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-center justify-center p-4 group-hover:bg-white group-hover:border-amber-300 transition-colors">
                      <Image
                        src={pub.logo}
                        alt={pub.name}
                        width={220}
                        height={60}
                        className="max-h-14 sm:max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-lg font-black text-[#0f2d5e] group-hover:text-[#D69A18] transition-colors">
                      {pub.name}
                    </h3>
                    
                    <p className="text-xs text-slate-600 font-medium leading-relaxed m-0">
                      {pub.desc}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50/60 border-t border-slate-100">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-white hover:bg-[#0f2d5e] text-[#0f2d5e] hover:text-white border border-slate-300 hover:border-[#0f2d5e] font-extrabold py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-2 transition-all shadow-2xs"
                    >
                      <span>{pub.cta}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Section 4: Contextual Internal Links Section */}
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 space-y-3">
            <h3 className="text-sm font-extrabold text-[#0f2d5e] uppercase tracking-wider">Explore Related QXL Services &amp; Information</h3>
            <div className="flex flex-wrap gap-2.5 text-xs font-bold">
              <Link href="/about" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl hover:border-[#D69A18] hover:text-[#0f2d5e] transition-colors">
                About Us →
              </Link>
              <Link href="/hospital-laboratory-management" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl hover:border-[#D69A18] hover:text-[#0f2d5e] transition-colors">
                Hospital Laboratory Management →
              </Link>
              <Link href="/contact" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl hover:border-[#D69A18] hover:text-[#0f2d5e] transition-colors">
                Contact Us →
              </Link>
              <Link href="/locations" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl hover:border-[#D69A18] hover:text-[#0f2d5e] transition-colors">
                Locations →
              </Link>
              <Link href="/test-directory" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-xl hover:border-[#D69A18] hover:text-[#0f2d5e] transition-colors">
                Test Directory →
              </Link>
            </div>
          </div>

          {/* Section 5: HLM Page Call to Action */}
          <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] rounded-3xl p-8 md:p-10 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-[#D69A18] text-white flex items-center justify-center mx-auto shadow-lg">
              <Building2 className="w-7 h-7" />
            </div>
            
            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Hospital Laboratory Management by QXL Diagnostics
              </h2>
              <p className="text-sky-100 text-sm md:text-base leading-relaxed font-medium">
                Learn how QXL Diagnostics partners with hospitals to manage laboratory operations, quality systems, staffing, equipment, specialised testing and reference laboratory services.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/hospital-laboratory-management/"
                className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg inline-flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Explore Hospital Laboratory Management</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${PHONE_E164}`}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black px-7 py-4 rounded-2xl text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-[#D69A18]" />
                <span>Hospital Partnerships: {PHONE_DISPLAY}</span>
              </a>
            </div>
          </section>

        </div>
      </section>

      {/* ── MOBILE STICKY HLM CTA ── */}
      <div className="qxl-mobile-hlm-cta">
        <Link href="/hospital-laboratory-management/#hlm-inquiry">
          Partner with QXL
        </Link>
      </div>
    </main>
  );
}
