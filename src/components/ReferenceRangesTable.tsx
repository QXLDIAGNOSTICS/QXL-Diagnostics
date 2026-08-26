import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Star } from 'lucide-react';

interface ReferenceRange {
  label: string;
  range: string;
  unit: string;
  interpretation: 'normal' | 'borderline' | 'abnormal' | 'info';
  note?: string;
}

interface Props {
  ranges: ReferenceRange[];
  disclaimer?: string;
  testName?: string;
}

const BADGE: Record<ReferenceRange['interpretation'], { bg: string; text: string; dot: string; label: string }> = {
  normal:     { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500', label: 'Normal' },
  borderline: { bg: 'bg-amber-50 border-amber-200',    text: 'text-amber-800',   dot: 'bg-amber-400',   label: 'Borderline' },
  abnormal:   { bg: 'bg-red-50 border-red-200',        text: 'text-red-800',     dot: 'bg-red-500',     label: 'Abnormal' },
  info:       { bg: 'bg-sky-50 border-sky-200',        text: 'text-sky-800',     dot: 'bg-sky-400',     label: 'Reference' },
};

export default function ReferenceRangesTable({ ranges, disclaimer, testName }: Props) {
  if (!ranges || ranges.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-slate-50/60">
        <div className="w-9 h-9 rounded-xl bg-[#0f2d5e] flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-[#0f2d5e]">
            Reference Ranges{testName ? ` — ${testName}` : ''}
          </h2>
          <p className="text-[11px] text-slate-500 font-medium">
            NABL-validated intervals · Adults · values may vary by age &amp; sex
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 px-6 py-3 border-b border-gray-100 bg-white">
        {(['normal', 'borderline', 'abnormal', 'info'] as const).map(k => (
          <span key={k} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <span className={`w-2.5 h-2.5 rounded-full ${BADGE[k].dot}`} />
            {BADGE[k].label}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th scope="col" className="px-6 py-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider w-[40%]">
                Parameter / Group
              </th>
              <th scope="col" className="px-4 py-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider w-[28%]">
                Range
              </th>
              <th scope="col" className="px-4 py-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider w-[14%]">
                Unit
              </th>
              <th scope="col" className="px-4 py-3 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider w-[18%]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ranges.map((row, idx) => {
              const style = BADGE[row.interpretation];
              return (
                <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'} hover:bg-sky-50/30 transition-colors`}>
                  <td className="px-6 py-3.5 font-semibold text-[#0f2d5e] text-xs leading-snug">
                    {row.label}
                    {row.note && (
                      <span className="block text-[10px] text-slate-400 font-medium mt-0.5">{row.note}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-700 text-xs">{row.range}</td>
                  <td className="px-4 py-3.5 text-slate-500 text-[11px] font-medium">{row.unit}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-extrabold uppercase tracking-wide ${style.bg} ${style.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {style.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-4 bg-amber-50/60 border-t border-amber-100">
        <p className="text-[11px] text-amber-800 font-semibold leading-relaxed">
          ⚕️ {disclaimer || 'Reference ranges are population-based guidelines. Results must be interpreted in clinical context by a qualified physician. Always consult your doctor before making healthcare decisions.'}
        </p>
      </div>
    </div>
  );
}
