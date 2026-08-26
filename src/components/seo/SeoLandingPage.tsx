import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  MessageCircle,
  FileText,
  Microscope,
  Dna,
  Activity,
  Building2,
  UserCheck,
  Home,
  Clock,
  HeartPulse,
  Droplets,
  FlaskConical,
  Stethoscope,
  CalendarCheck,
  Truck,
  Brain,
  Baby,
  Apple,
  Sun,
  Thermometer,
  TestTube2,
  Syringe,
  ChevronRight,
} from "lucide-react";
import type { IconName, SeoLandingData } from "@/lib/seoPages/types";
import { SITE_URL, WHATSAPP_LINK } from "@/lib/businessInfo";

const ICONS: Record<IconName, React.ComponentType<{ className?: string }>> = {
  award: Award,
  shield: ShieldCheck,
  check: CheckCircle2,
  mapPin: MapPin,
  phone: Phone,
  whatsapp: MessageCircle,
  fileText: FileText,
  microscope: Microscope,
  dna: Dna,
  activity: Activity,
  building: Building2,
  userCheck: UserCheck,
  home: Home,
  clock: Clock,
  heart: HeartPulse,
  droplet: Droplets,
  flaskConical: FlaskConical,
  stethoscope: Stethoscope,
  calendarCheck: CalendarCheck,
  truck: Truck,
  vial: TestTube2,
  brain: Brain,
  baby: Baby,
  apple: Apple,
  sun: Sun,
  thermometer: Thermometer,
  testTube: TestTube2,
  syringe: Syringe,
};

function buildJsonLd(data: SeoLandingData) {
  const url = `${SITE_URL}${data.slug}`;
  const description =
    data.aiOverview.length > 300 ? `${data.aiOverview.slice(0, 297)}...` : data.aiOverview;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: data.breadcrumbLabel, item: url },
      ],
    },
    {
      "@type": ["WebPage", "MedicalWebPage"],
      "@id": `${url}#webpage`,
      url,
      name: `${data.h1Lead} ${data.h1Highlight}`.trim(),
      description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about:
        data.pageType === "test" && data.medicalTestName
          ? { "@id": `${url}#medical-test` }
          : undefined,
      breadcrumb: { "@id": `${url}#breadcrumb` },
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "City", name: "Bengaluru" },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  if (data.pageType === "test" && data.medicalTestName) {
    graph.splice(1, 0, {
      "@type": "MedicalTest",
      "@id": `${url}#medical-test`,
      name: data.medicalTestName,
      url,
      description,
      howPerformed: "A small blood sample is collected by a certified phlebotomist at home or at a QXL centre and analysed at our NABL-accredited laboratory.",
      normalRange: "Reference ranges are printed on every report and interpreted against your age and sex. Please consult your doctor for clinical interpretation.",
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url,
        offeredBy: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "City", name: "Bengaluru" },
      },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export default function SeoLandingPage({ data }: { data: SeoLandingData }) {
  const jsonLd = buildJsonLd(data);

  return (
    <div className="bg-white text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0b132b] via-[#0f2d5e] to-[#1c3a6e] text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 rounded-full text-sky-300 text-xs font-black uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{data.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                {data.h1Lead} <span className="text-sky-400">{data.h1Highlight}</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
                {data.heroIntro}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/book"
                  className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-sky-500/50 transition-all text-xs uppercase tracking-wider"
                >
                  Book a Test Online
                </Link>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Booking</span>
                </a>
                <a
                  href="tel:+919964639639"
                  className="text-sky-300 hover:text-white font-bold text-sm flex items-center gap-2 underline underline-offset-4 decoration-sky-700"
                >
                  <Phone className="w-4 h-4" />
                  +91 9964 639 639
                </a>
              </div>
            </div>

            {/* AI / Search answer box */}
            <div className="w-full lg:w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
              <span className="bg-sky-500/30 text-sky-200 border border-sky-400/40 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-4">
                AI &amp; Search Overview
              </span>
              <h2 className="text-lg font-extrabold text-white mb-3 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-400" />
                {data.aiOverviewTitle}
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed mb-6">
                {data.aiOverview}
              </p>
              <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
                {data.aiOverviewPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#f8faff] border-b border-slate-100 py-3">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex items-center gap-1 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2563eb]">{data.breadcrumbLabel}</span>
        </div>
      </nav>

      {/* ── Highlights ───────────────────────────────────────── */}
      <section className="py-14 max-w-[1260px] mx-auto px-4 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.highlights.map((h, i) => {
            const Icon = ICONS[h.icon];
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-extrabold text-[#0f2d5e] text-base mb-2">{h.title}</h2>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Long-form content sections ──────────────────────── */}
      <section className="py-6 pb-14 max-w-[900px] mx-auto px-4 w-full">
        {data.sections.map((s, i) => (
          <article key={i} className="mb-10 last:mb-0">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] mb-4">{s.heading}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j} className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-4">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-4 space-y-2">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      {/* ── Feature group (what's included etc.) ────────────── */}
      {data.featureGroup && (
        <section className="py-14 bg-[#f8faff] border-y border-slate-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-sky-100 text-[#0284c7] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-sky-200">
                Details
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0f2d5e] mt-2">
                {data.featureGroup.title}
              </h2>
              {data.featureGroup.subtitle && (
                <p className="text-slate-600 text-sm font-medium mt-2">{data.featureGroup.subtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.featureGroup.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <h3 className="font-extrabold text-[#0f2d5e] text-sm">{item.title}</h3>
                  </div>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Steps ────────────────────────────────────────────── */}
      {data.steps && (
        <section className="py-14 max-w-[1260px] mx-auto px-4 w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f2d5e]">How It Works</h2>
            <p className="text-slate-600 text-sm font-medium mt-2">
              From booking to report — a simple, transparent process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.steps.map((step, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <span className="absolute -top-4 left-6 w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                  {i + 1}
                </span>
                <h3 className="font-extrabold text-[#0f2d5e] text-sm mt-4 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-14 bg-[#f8faff] border-t border-slate-100">
        <div className="max-w-[800px] mx-auto px-4 w-full">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2">
              Help Center
            </span>
            <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 open:border-[#2563eb] open:shadow-md transition-all"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-bold text-[14px] pr-4 text-[#0f2d5e] group-open:text-[#2563eb]">
                    {faq.q}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 group-open:text-[#2563eb] transition-transform shrink-0" />
                </summary>
                <p className="px-5 pb-5 text-[13px] text-slate-600 font-medium leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related links ────────────────────────────────────── */}
      <section className="py-14 max-w-[1260px] mx-auto px-4 w-full">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] text-center mb-10">
          Explore More at QXL Diagnostics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.relatedLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#0f2d5e] text-sm">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#2563eb] group-hover:translate-x-1 transition-transform" />
              </div>
              {link.desc && (
                <p className="text-slate-500 text-xs font-medium mt-1.5 leading-relaxed">{link.desc}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Final CTA band ───────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-r from-[#0b132b] via-[#0f2d5e] to-[#1c3a6e] text-white">
        <div className="max-w-[1260px] mx-auto px-4 w-full text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to Book? Get Tested with QXL Diagnostics Today
          </h2>
          <p className="text-slate-300 text-sm font-medium max-w-2xl mx-auto">
            Free home sample collection across Bengaluru • NABL-accredited laboratory (MC-10025) •
            Same-day digital reports for most routine tests.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/book"
              className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-sky-500/50 transition-all text-xs uppercase tracking-wider"
            >
              Book a Test Online
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href="tel:+919964639639"
              className="border border-white/30 hover:bg-white/10 text-white font-extrabold px-6 py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 9964 639 639</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
