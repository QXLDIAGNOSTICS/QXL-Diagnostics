"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSchemaProps {
  title?: string;
  faqs: FaqItem[];
  className?: string;
}

export default function FaqSchema({ title, faqs, className = '' }: FaqSchemaProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (faqs.length === 0) return null;

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
    <section className={`py-16 bg-[#f8faff] border-t border-gray-150 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style>{`
        .faq-details { overflow: hidden; }
        .faq-details > .faq-content-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 300ms ease-in-out;
        }
        .faq-details[open] > .faq-content-wrap {
          grid-template-rows: 1fr;
        }
        .faq-details > .faq-content-wrap > .faq-content-inner {
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-[800px] mx-auto px-4 w-full">
        {title && (
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2">
              Help Center
            </span>
            <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">{title}</h2>
            <p className="text-slate-500 text-sm font-medium">Everything you need to know about our testing processes.</p>
          </div>
        )}

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <details
                key={idx}
                open={isOpen}
                onToggle={(e) => {
                  const el = e.currentTarget;
                  setOpenIdx(el.open ? idx : null);
                }}
                className={`faq-details group bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#2563eb] shadow-md'
                    : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                <summary className="w-full flex items-center justify-between p-5 text-left list-none cursor-pointer focus:outline-none select-none">
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? 'bg-blue-100' : 'bg-gray-50 group-hover:bg-blue-50'
                    }`}>
                      <HelpCircle className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-[#2563eb]' : 'text-gray-400'}`} />
                    </span>
                    <span className={`font-bold text-[14px] pr-4 transition-colors duration-300 ${
                      isOpen ? 'text-[#2563eb]' : 'text-[#0f2d5e]'
                    }`}>
                      {faq.question}
                    </span>
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isOpen ? 'bg-blue-50' : 'bg-gray-50'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#2563eb]' : 'text-gray-400'
                    }`} />
                  </div>
                </summary>
                <div className="faq-content-wrap">
                  <div className="faq-content-inner">
                    <div className="px-5 pb-5">
                      <p className="text-slate-500 text-[13px] leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
