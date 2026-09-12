import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Phone,
  MessageSquareText,
  FlaskConical,
  BookOpen,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { SITE_URL, PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from "@/lib/businessInfo";

export interface SymptomSection {
  heading: string;
  content: string | string[];
}

export interface SymptomPageData {
  url: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  lastReviewed: string;
  reviewedBy: string;
  parentHub: string;
  intro: string;
  quickAnswer?: string;
  causes: { title: string; description: string }[];
  redFlags: string[];
  tests: { name: string; reason: string }[];
  relatedTopics: { title: string; url: string }[];
  faqs?: { q: string; a: string }[];
  clinicalNote?: string;
  disclaimer?: string;
}

interface SymptomPageProps {
  data: SymptomPageData;
  children?: React.ReactNode;
}

export default function SymptomPageLayout({ data, children }: SymptomPageProps) {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#0f2d5e] to-[#164263] text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #2563eb 0%, transparent 60%)" }} />
        <div className="max-w-[1260px] mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[11px] text-sky-300 mb-5 font-semibold flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/health/symptoms-causes" className="hover:text-white transition-colors">Symptoms &amp; Causes</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{data.h1}</span>
          </nav>

          <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
            Health Information · Clinically Reviewed
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight text-white tracking-tight max-w-4xl">
            {data.h1}
          </h1>

          {data.quickAnswer && (
            <div className="bg-white/8 border border-white/15 rounded-2xl p-5 max-w-3xl mb-6">
              <p className="text-sky-100 text-sm font-semibold leading-relaxed">
                <span className="font-black text-white">Quick Answer: </span>
                {data.quickAnswer}
              </p>
            </div>
          )}

          <p className="text-sky-200 text-sm md:text-base font-semibold leading-relaxed max-w-3xl mb-6">
            {data.intro}
          </p>

          {/* Trust Strip */}
          <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-white/15">
            <div className="flex items-center gap-2 text-xs text-sky-200 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Medically reviewed by {data.reviewedBy}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-sky-200 font-bold">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Last reviewed: {data.lastReviewed}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1260px] mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <main className="lg:col-span-8 space-y-8" id="main-content">
            {/* Causes */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-[#0f2d5e] mb-5">
                Common Causes of {data.primaryKeyword.charAt(0).toUpperCase() + data.primaryKeyword.slice(1)}
              </h2>
              <div className="space-y-4">
                {data.causes.map((cause, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                    <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-2">
                      {i + 1}. {cause.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">{cause.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Extra children (page-specific content) */}
            {children}

            {/* Red Flags / Warning Signs */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-[#0f2d5e] mb-5">
                ⚠️ When Should You Seek Medical Care?
              </h2>
              <div className="bg-red-50/70 border border-red-200 rounded-2xl p-6">
                <div className="flex gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-red-800">
                    Seek urgent medical attention if you experience any of the following:
                  </p>
                </div>
                <ul className="space-y-2">
                  {data.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-red-800 font-semibold">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Tests */}
            {data.tests.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-black text-[#0f2d5e] mb-3">
                  Which Laboratory Tests May Be Considered?
                </h2>
                <p className="text-xs text-slate-500 font-semibold mb-5 bg-blue-50/70 border border-blue-200 rounded-xl p-3">
                  <strong>Clinical note:</strong> Laboratory tests should be selected by a doctor based on your symptoms, history and clinical examination. Not every person requires all of the tests listed below.
                </p>
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0f2d5e] text-white">
                        <th className="text-left px-5 py-3.5 font-black text-xs w-2/5">Test</th>
                        <th className="text-left px-5 py-3.5 font-black text-xs">Why a Doctor May Consider It</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.tests.map((test, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                          <td className="px-5 py-3.5 border-b border-slate-100">
                            <span className="text-xs font-extrabold text-[#0f2d5e]">{test.name}</span>
                          </td>
                          <td className="px-5 py-3.5 border-b border-slate-100">
                            <span className="text-xs text-slate-600 font-semibold leading-relaxed">{test.reason}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* FAQs */}
            {data.faqs && data.faqs.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-black text-[#0f2d5e] mb-5">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                      <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-2">{faq.q}</h3>
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Clinical Note */}
            {data.clinicalNote && (
              <section className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-2 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-blue-600" />
                  QXL Diagnostic Support
                </h3>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">{data.clinicalNote}</p>
              </section>
            )}

            {/* Related Topics */}
            {data.relatedTopics.length > 0 && (
              <section>
                <h2 className="text-lg font-black text-[#0f2d5e] mb-4">Related Health Topics</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {data.relatedTopics.map((topic, i) => (
                    <Link
                      key={i}
                      href={topic.url}
                      className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3 hover:border-blue-400 hover:shadow-sm transition-all group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-extrabold text-[#0f2d5e] group-hover:text-blue-600 transition-colors">{topic.title}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Medical Review */}
            <section className="bg-slate-100 rounded-2xl p-5 border border-slate-200">
              <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Medical Review
              </h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                <strong>Medically reviewed by:</strong> {data.reviewedBy}
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                <strong>Last medically reviewed:</strong> {data.lastReviewed}
              </p>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                <strong>Clinical reference framework:</strong> Harrison&apos;s Principles of Internal Medicine; Tietz Fundamentals of Clinical Chemistry and Molecular Diagnostics; and relevant specialty guidance as clinically appropriate.
              </p>
            </section>

            {/* Disclaimer */}
            <div className="bg-yellow-50/70 border border-yellow-200 rounded-2xl p-5">
              <p className="text-xs text-yellow-900 font-semibold leading-relaxed">
                <strong>Medical Disclaimer:</strong> This information is intended for general health education and does not diagnose an individual medical condition. It does not replace consultation, diagnosis or treatment by a qualified healthcare professional. Seek urgent medical attention for severe, sudden or rapidly worsening symptoms or any emergency warning signs described above.
              </p>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#0B2545] to-[#0f2d5e] rounded-2xl p-6 text-white sticky top-5">
              <h3 className="font-black text-base mb-2">Book a Test</h3>
              <p className="text-xs text-sky-200 font-semibold leading-relaxed mb-5">
                When your doctor recommends a laboratory test, QXL provides NABL-accredited testing with free home collection across Bengaluru.
              </p>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/919964639639?text=Hi%2C%20I%20would%20like%20to%20book%20a%20lab%20test.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1eb956] text-white font-black px-4 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>Book via WhatsApp</span>
                </a>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-black px-4 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-[#D69A18]" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <Link
                  href="/home-sample-collection"
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Free Home Collection →</span>
                </Link>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15">
                <p className="text-[10px] text-sky-300 font-bold">NABL Accredited · MC-6849 · ISO 15189:2022</p>
                <p className="text-[10px] text-sky-400 font-semibold mt-0.5">Home collection available across Bengaluru</p>
              </div>
            </div>

            {/* Hub Link */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-3">Symptoms &amp; Causes Hub</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-3">
                Explore our full library of clinically reviewed symptom guides.
              </p>
              <Link
                href="/health/symptoms-causes"
                className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors"
              >
                <span>View All Symptoms →</span>
              </Link>
            </div>

            {/* Upload Prescription */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-extrabold text-[#0f2d5e] text-sm mb-2">Have a Prescription?</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-3">
                Upload your doctor&apos;s prescription and we&apos;ll help you book the right tests.
              </p>
              <Link
                href="/upload-prescription"
                className="text-xs font-black text-[#D69A18] hover:text-amber-700 flex items-center gap-1.5 transition-colors"
              >
                <span>Upload Prescription →</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
