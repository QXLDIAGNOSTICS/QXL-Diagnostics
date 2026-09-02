import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CANONICAL_PACKAGES, type PackageItem } from '@/lib/packagesCatalogue';

export const ALL_PACKAGES = CANONICAL_PACKAGES.map((pkg) => ({
  id: pkg.id,
  slug: pkg.slug,
  name: pkg.name,
  price: String(pkg.price),
  old_price: String(pkg.mrp),
  save_amount: String(pkg.mrp - pkg.price),
  discountPercent: `${Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100)}% OFF`,
  parameters: pkg.parametersLabel,
  includes: pkg.includes,
  tag: pkg.tag || 'PREVENTIVE OFFER',
  most_booked: !!pkg.isPopular,
  benefits: pkg.highlights,
}));

export default function PopularPackagesGrid() {
  return (
    <section className="py-14 bg-[#f8faff] border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="bg-blue-100 text-blue-900 border border-blue-200 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
            Complete Diagnostic Packages
          </span>
          <h2 className="text-3xl font-black text-[#0f2d5e] mt-2">All Doctor-Curated Health Checkup Packages</h2>
          <p className="text-slate-600 text-sm mt-1">
            Choose the package depth that fits your health goals. Free home sample collection across Bengaluru &amp; same-day reports included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CANONICAL_PACKAGES.map((pkg: PackageItem) => {
            const saveAmount = pkg.mrp - pkg.price;
            return (
              <div
                key={pkg.id}
                className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="mb-3 pt-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 border bg-blue-50 text-blue-700 border-blue-100">
                      {pkg.tag || 'PREVENTIVE OFFER'}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{pkg.name}</h3>
                  </div>

                  <div className="mb-3">
                    <ul className="space-y-1.5">
                      {pkg.highlights.map((b, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 font-semibold leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="my-3 pt-3 border-t border-dashed border-gray-200">
                    <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed">
                      <strong className="text-slate-800 font-bold">Includes:</strong> {pkg.includes}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-auto border-t border-gray-100">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-xs text-slate-400 line-through block mb-0.5">₹{pkg.mrp}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-slate-900">
                          ₹{pkg.price}
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Save ₹{saveAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/book?package=${pkg.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
                  >
                    Book Package @ ₹{pkg.price} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

