"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Speciality } from '@/lib/api';

export default function SpecialitiesGrid({ specialities }: { specialities: Pick<Speciality, 'name' | 'slug' | 'card_image_url'>[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
      {specialities.map((spec) => (
        <Link
          key={spec.slug}
          href={`/specialities/${spec.slug}`}
          className="group relative flex flex-col items-center text-center rounded-3xl p-5 md:p-6 h-full transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)',
            border: '1px solid rgba(125,199,232,0.28)',
            boxShadow: '0 6px 24px rgba(14,165,233,0.06)',
          }}
        >
          <div
            className="mb-4 w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(145deg, rgba(224,242,254,0.9) 0%, rgba(186,230,255,0.45) 100%)',
              border: '1px solid rgba(125,199,232,0.25)',
            }}
          >
            {spec.card_image_url && (
              <img
                src={`${spec.card_image_url}?v=3`}
                alt={spec.name}
                className={`w-24 h-24 object-contain mix-blend-multiply ${
                  spec.slug === "gastroenterology" ? "scale-[1.35]" : "scale-110"
                }`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
          <h3 className="font-extrabold text-[#0c4a6e] text-[11px] md:text-xs tracking-wider uppercase group-hover:text-[#0284c7] transition-colors leading-snug">
            {spec.name}
          </h3>
          <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-sky-500/0 group-hover:text-[#0284c7] transition-all">
            Explore <ArrowUpRight className="w-3 h-3" />
          </span>
        </Link>
      ))}
    </div>
  );
}
