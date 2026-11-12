import React from 'react';
import Link from 'next/link';
import { Clock, FlaskConical, ArrowRight, MessageSquare, MapPin, Lock } from 'lucide-react';
import { StiPackage } from '@/lib/sexualHealthData';
import { WHATSAPP_LINK } from '@/lib/businessInfo';

interface Props {
  pkg: StiPackage;
  highlight?: boolean;
}

export default function StiPackageCard({ pkg, highlight = false }: Props) {
  const whatsappPackageUrl = `${WHATSAPP_LINK}?text=${encodeURIComponent(`Hello QXL Diagnostics, I would like to enquire about / book the ${pkg.code}: ${pkg.name}.`)}`;

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between bg-white overflow-hidden ${
        highlight
          ? 'border-[#2563eb] shadow-xl ring-2 ring-[#2563eb]/20'
          : 'border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300'
      }`}
    >
      {/* Top Banner */}
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
            {pkg.code}
          </span>
          <span
            className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              pkg.verifiedInCatalogue
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-amber-100 text-amber-900 border border-amber-200'
            }`}
          >
            {pkg.launchStatus}
          </span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0c4a6e] leading-snug">
            {pkg.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            {pkg.tagline}
          </p>
        </div>

        {/* Price & Turnaround Row */}
        <div className="flex items-baseline justify-between py-3 px-4 rounded-2xl bg-slate-50 border border-slate-150">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Laboratory Fee</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#0f2d5e]">
                {pkg.priceDisplay}
              </span>
              {pkg.mrp && pkg.mrp > (pkg.price || 0) && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{pkg.mrp}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Report TAT</span>
            <span className="text-xs font-black text-slate-800 flex items-center justify-end gap-1">
              <Clock className="w-3.5 h-3.5 text-[#2563eb]" /> {pkg.tat}
            </span>
          </div>
        </div>

        {/* Specimen and Collection Rules */}
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
            <span><strong>Specimen:</strong> {pkg.specimen}</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
            <span><strong>Fasting / Prep:</strong> {pkg.fastingInstruction}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              <strong>Sample Collection:</strong> {pkg.homeCollectionAvailable ? "Doorstep Home Collection & Lab Visit Available" : "Clinic Procedural Swab Only (Clinical Specialist)"}
            </span>
          </div>
        </div>

        {/* Target Pathogens */}
        <div className="pt-2">
          <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block mb-2">
            Investigated Target Pathogens ({pkg.parametersCount}):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pkg.targetPathogens.map((tp, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-sky-50 text-sky-900 border border-sky-200/80 px-2.5 py-1 rounded-lg"
              >
                {tp}
              </span>
            ))}
          </div>
        </div>

        {/* Intended Patients */}
        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-150 leading-relaxed">
          <strong className="text-slate-800">Clinical Indication:</strong> {pkg.intendedPatients}
        </p>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0 bg-white space-y-2.5">
        <div className="flex flex-col sm:flex-row gap-2">
          {pkg.verifiedInCatalogue ? (
            <Link
              href="/book"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-95 text-center"
            >
              <span>{pkg.bookingCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <a
              href={whatsappPackageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all shadow-md active:scale-95 text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire &amp; Book via WhatsApp</span>
            </a>
          )}
          <Link
            href={pkg.slug}
            className="inline-flex items-center justify-center gap-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all text-center"
          >
            <span>Details</span>
          </Link>
        </div>
        <p className="text-[10px] text-center text-slate-400">
          Strictly confidential. Password-protected digital report delivery.
        </p>
      </div>
    </div>
  );
}

