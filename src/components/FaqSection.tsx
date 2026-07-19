"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { api, type FAQItem } from '@/lib/api';

export default function FaqSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    let cancelled = false;
    api.faqs.list()
      .then((items) => {
        if (!cancelled) setFaqs(items);
      })
      .catch((err) => console.error('Failed to load FAQs', err));
    return () => { cancelled = true; };
  }, []);

  if (faqs.length === 0) return null;

  // Page-level FAQPage structured data generated from the FAQs actually
  // rendered below, so schema always matches on-page visible content
  // (required by Google's structured data guidelines).
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 bg-[#f8faff] border-t border-gray-150">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[800px] mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Help Center</span>
          <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm font-medium">Everything you need to know about our testing processes.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={faq.id} className={`bg-white rounded-2xl border transition-all duration-300 ${openIdx === idx ? 'border-[#2563eb] shadow-md' : 'border-gray-100 hover:border-blue-200'}`}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className={`font-bold text-[14px] pr-4 ${openIdx === idx ? 'text-[#2563eb]' : 'text-[#0f2d5e]'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openIdx === idx ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-[#2563eb]' : 'text-gray-400'}`} />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 px-5 ${openIdx === idx ? 'max-h-[480px] pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-slate-500 text-[13px] leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
