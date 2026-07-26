"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function SpecialitiesPage() {
  const specialities = [
    { name: "Bone Disorders", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150389/Assets-QXL/legacy-assets/image/spec_bone.png", href: "/specialities/bone-disorders" },
    { name: "Cardiology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150392/Assets-QXL/legacy-assets/image/spec_cardiology.png", href: "/specialities/cardiology" },
    { name: "Endocrinology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png", href: "/specialities/endocrinology" },
    { name: "Gastroenterology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png", href: "/specialities/gastroenterology" },
    { name: "Hematology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150417/Assets-QXL/legacy-assets/image/spec_hematology.png", href: "/specialities/hematology" },
    { name: "Infectious Diseases", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150422/Assets-QXL/legacy-assets/image/spec_infectious.png", href: "/specialities/infectious-diseases" },
    { name: "Oncology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150430/Assets-QXL/legacy-assets/image/spec_oncology.png", href: "/specialities/oncology" },
    { name: "Neurology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150423/Assets-QXL/legacy-assets/image/spec_neurology.png", href: "/specialities/neurology" },
    { name: "Urology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png", href: "/specialities/urology" },
    { name: "Women's Health", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png", href: "/specialities/womens-health" },
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <section
        className="relative overflow-hidden py-12 border-b border-sky-100"
        style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 55%, #eff6ff 100%)' }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-10 right-20 w-64 h-64 rounded-full bg-sky-300/25 blur-3xl" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c4a6e] mb-3 tracking-tight">Our Clinical Specialities</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
            Discover specialized laboratory diagnostic tests, panels, and clinical profiles tailored to distinct medical disciplines.
          </p>
          <div className="w-16 h-1 bg-[#0284c7] rounded-full mt-4" />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {specialities.map((spec) => (
              <Link
                key={spec.name}
                href={spec.href}
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
                  <img
                    src={`${spec.icon}?v=3`}
                    alt={spec.name}
                    className={`w-24 h-24 object-contain mix-blend-multiply ${
                      spec.name === "Gastroenterology" ? "scale-[1.35]" : "scale-110"
                    }`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
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
        </div>
      </section>
    </div>
  );
}
