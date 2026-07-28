import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { topTests } from "@/lib/testsData";
import { Clock, Droplet, FileText, Activity, Phone, ArrowLeft, ShieldCheck, Microscope } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const test = topTests.find((t) => t.slug === slug);
  if (!test) return { title: "Test Not Found" };

  return {
    title: `${test.name} in Bengaluru | QXL Diagnostics`,
    description: `Book ${test.name} test in Bengaluru. ${test.description} NABL Certified Lab, Home Sample Collection available. Price: ₹${test.price}.`,
    alternates: {
      canonical: `https://qxldiagnostics.com/tests/${slug}`,
    }
  };
}

export default async function TestDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const test = topTests.find((t) => t.slug === slug);

  if (!test) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": test.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-[1260px] mx-auto px-4 w-full flex items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#2563eb]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/speciality-tests" className="hover:text-[#2563eb]">Tests</Link>
          <span className="mx-2">/</span>
          <span className="text-[#0f2d5e]">{test.name}</span>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto px-4 w-full mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <Link href="/speciality-tests" className="inline-flex items-center text-xs font-bold text-[#2563eb] hover:underline mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Tests
          </Link>
          
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Microscope className="w-48 h-48" />
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0f2d5e] mb-4">{test.name}</h1>
            <p className="text-slate-600 font-medium leading-relaxed max-w-2xl text-sm mb-6">
              {test.description}
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#f0f9ff] p-4 rounded-2xl flex flex-col gap-1 border border-[#e0f2fe]">
                <Activity className="w-5 h-5 text-[#2563eb]" />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Parameters</span>
                <span className="font-extrabold text-[#0f2d5e] text-lg">{test.parameters}</span>
              </div>
              <div className="bg-[#f0f9ff] p-4 rounded-2xl flex flex-col gap-1 border border-[#e0f2fe]">
                <Clock className="w-5 h-5 text-[#2563eb]" />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Results In</span>
                <span className="font-extrabold text-[#0f2d5e] text-lg">{test.turnaround}</span>
              </div>
              <div className="bg-[#f0f9ff] p-4 rounded-2xl flex flex-col gap-1 border border-[#e0f2fe]">
                <Droplet className="w-5 h-5 text-[#2563eb]" />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Sample</span>
                <span className="font-extrabold text-[#0f2d5e] text-lg">{test.sampleType}</span>
              </div>
              <div className="bg-[#f0f9ff] p-4 rounded-2xl flex flex-col gap-1 border border-[#e0f2fe]">
                <FileText className="w-5 h-5 text-[#2563eb]" />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Report</span>
                <span className="font-extrabold text-[#0f2d5e] text-lg">Digital</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
              <div className="flex-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Test Price</span>
                <span className="text-3xl font-extrabold text-[#0f2d5e]">₹{test.price}</span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Link href="/book" className="flex-1 sm:flex-none bg-[#2563eb] text-white font-extrabold px-8 py-3.5 rounded-xl text-sm hover:bg-[#1d4ed8] shadow-md transition-all text-center uppercase tracking-wider">
                  Book Now
                </Link>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer" className="flex-1 sm:flex-none bg-green-500 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm hover:bg-green-600 shadow-md transition-all text-center flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Test Preparation */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#2563eb]" />
              Preparation & Requirements
            </h2>
            <div className="bg-orange-50 text-orange-900 p-4 rounded-xl font-medium text-sm border border-orange-100">
              {test.preparation}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {test.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-extrabold text-slate-800 text-sm mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[320px] space-y-6">
          <div className="bg-gradient-to-br from-[#0f2d5e] to-[#1e3a8a] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="font-extrabold text-lg mb-2">Home Sample Collection</h3>
            <p className="text-sm text-sky-100 mb-6 font-medium leading-relaxed">
              Book this test online and get safe, hygienic sample collection from your home in Bengaluru.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-xs font-bold text-white">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">✓</div>
                NABL Certified Lab
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-white">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">✓</div>
                Free Home Collection
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-white">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">✓</div>
                100% Accurate Reports
              </li>
            </ul>
            <Link href="/book" className="block w-full bg-white text-[#0f2d5e] font-extrabold py-3 rounded-xl text-center text-sm shadow hover:bg-sky-50 transition-colors">
              Book Home Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
