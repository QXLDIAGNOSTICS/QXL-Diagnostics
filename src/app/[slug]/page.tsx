import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, CheckCircle2, ShieldCheck, Activity, Clock, ArrowRight } from "lucide-react";
import { getDynamicPageData } from "@/lib/seoPages/dynamicPageResolver";
import { PHONE_DISPLAY, WHATSAPP_LINK, NABL_CERTIFICATE, ISO_STANDARD } from "@/lib/businessInfo";

type Props = { params: Promise<{ slug: string }> };

const INVALID_SLUGS = new Set(["home", "urology-3", "test", "demo", "sample", "admin", "login", "index"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Guard against internal system paths or obsolete slugs
  if (slug.includes('.') || slug.startsWith('_') || INVALID_SLUGS.has(slug.toLowerCase())) {
    return { title: "Page Not Found | QXL Diagnostics" };
  }

  const pageData = getDynamicPageData(slug);
  if (!pageData) {
    return { title: "Page Not Found | QXL Diagnostics" };
  }

  return {
    title: pageData.title,
    description: pageData.metaDescription,
    alternates: {
      canonical: `https://qxldiagnostics.com/${slug}`,
    },
    openGraph: {
      title: pageData.title,
      description: pageData.metaDescription,
      url: `https://qxldiagnostics.com/${slug}`,
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function CatchAllSlugPage({ params }: Props) {
  const { slug } = await params;

  // Filter out internal static assets, system requests, or invalid slugs
  if (slug.includes('.') || slug.startsWith('_') || INVALID_SLUGS.has(slug.toLowerCase())) {
    notFound();
  }

  const data = getDynamicPageData(slug);
  if (!data) {
    notFound();
  }


  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    "name": data.h1Title,
    "description": data.metaDescription,
    "url": `https://qxldiagnostics.com/${slug}`,
    "provider": {
      "@type": "DiagnosticLab",
      "name": "QXL Diagnostics",
      "url": "https://qxldiagnostics.com"
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-[#0d2e42] via-[#164263] to-[#0f2d5e] text-white py-12 lg:py-16 border-b border-sky-900">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#FF9933] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">
              {data.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight !text-white drop-shadow-sm" style={{ color: '#ffffff' }}>
              {data.h1Title}
            </h1>
            <p className="text-blue-100 font-medium text-sm md:text-base leading-relaxed mb-6">
              {data.subtitle}
            </p>
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

      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10">
          
          {/* Main Body */}
          <div className="flex-1 space-y-8">
            
            {/* Quick Test Overview Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Service Category</span>
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
                  <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-wider block mb-1">Sample Type</span>
                  <p className="font-bold text-slate-800 text-sm">{data.sampleType}</p>
                </div>
                <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                  <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-wider block mb-1">Report Delivery</span>
                  <p className="font-bold text-slate-800 text-sm">{data.turnaroundTime}</p>
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Preparation &amp; Instructions</h2>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-xs font-semibold leading-relaxed mb-6">
                💡 <strong>Instructions:</strong> {data.fastingRequired}
              </div>

              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Service Details &amp; Clinical Information</h2>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
                {data.overview.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-3">Why Patients Choose QXL Diagnostics?</h2>
              <div className="space-y-2.5">
                {data.whyImportant.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {data.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <h3 className="font-bold text-[#0f2d5e] text-sm mb-1.5">Q: {faq.question}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[360px] space-y-6">
            <div className="bg-[#0f2d5e] text-white rounded-3xl p-7 shadow-xl relative overflow-hidden">
              <h3 className="text-lg font-extrabold mb-4 border-b border-white/10 pb-4">NABL Quality Guarantees</h3>
              
              <div className="space-y-4 text-xs font-semibold">
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

              <div className="mt-8 pt-6 border-t border-white/10">
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
          </div>

        </div>
      </section>
    </div>
  );
}
