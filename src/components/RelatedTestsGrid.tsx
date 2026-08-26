import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, FlaskConical } from 'lucide-react';
import { slugToTestName } from '@/lib/seo/internalLinks';

interface RelatedTest {
  slug: string;
  price?: string;
  turnaround?: string;
}

interface Props {
  tests: RelatedTest[] | string[];
  heading?: string;
}

function normalise(t: RelatedTest | string): RelatedTest {
  if (typeof t === 'string') return { slug: t };
  return t;
}

export default function RelatedTestsGrid({ tests, heading = 'Related Tests at QXL Diagnostics' }: Props) {
  if (!tests || tests.length === 0) return null;

  const items = tests.map(normalise).slice(0, 6);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-extrabold text-[#0f2d5e] mb-5">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => {
          const name = slugToTestName(item.slug);
          return (
            <Link
              key={item.slug}
              href={`/tests/${item.slug}`}
              className="group flex items-center justify-between gap-3 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-2xl p-4 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#2563eb]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb]/20 transition-colors">
                  <FlaskConical className="w-4 h-4 text-[#2563eb]" />
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold text-[#0f2d5e] text-xs leading-snug truncate">{name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {item.price && (
                      <span className="text-emerald-600 font-bold text-[11px]">₹{item.price}</span>
                    )}
                    {item.turnaround && (
                      <span className="flex items-center gap-0.5 text-slate-400 text-[10px] font-medium">
                        <Clock className="w-2.5 h-2.5" />
                        {item.turnaround}
                      </span>
                    )}
                    {!item.price && !item.turnaround && (
                      <span className="text-slate-400 text-[10px] font-medium">Home collection available</span>
                    )}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563eb] transition-colors flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
