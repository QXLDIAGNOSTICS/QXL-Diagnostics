"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { api, type FAQItem } from '@/lib/api';

export default function FaqSection({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const Heading = decorativeHeading ? 'p' : 'h2';

  useEffect(() => {
    setFaqs([
      {
        id: 'faq1',
        question: 'How do I book a home collection?',
        answer: 'Simply fill out our Home Collection form, message us on WhatsApp (+91 9964 636848), or select a health package and complete the check-out.',
        sort_order: 1
      },
      {
        id: 'faq2',
        question: 'How long does it take to receive reports?',
        answer: 'QXL Diagnostics provides same-day digital reports for most routine tests such as CBC, thyroid, and blood sugar. Reports are shared by email and WhatsApp and can be downloaded from the patient portal.',
        sort_order: 2
      },
      {
        id: 'faq3',
        question: 'Do I need to fast before my blood test?',
        answer: 'It depends on the test. For instance, tests like Fasting Blood Sugar and Lipid Profile typically require 10-12 hours of overnight fasting. Only water is permitted. Our team will provide specific instructions based on your selected package.',
        sort_order: 3
      },
      {
        id: 'faq4',
        question: 'Are your phlebotomists trained and certified?',
        answer: 'Absolutely. We ensure all our phlebotomists are highly trained, NABL-certified professionals with extensive experience in safe and painless blood collection.',
        sort_order: 4
      },
      {
        id: 'faq5',
        question: 'Can I access my medical reports online?',
        answer: 'Yes, you can easily view and download your reports securely through our online patient portal by logging in with your registered mobile number.',
        sort_order: 5
      }
    ].map(f => ({
      is_active: true,
      category: null,
      ...f
    })));
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
          <Heading className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Frequently Asked Questions</Heading>
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
