"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const specialities = [
  { name: "Bone Disorders", slug: "bone-disorders", icon: "🦴", href: "/specialities/bone-disorders", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150389/Assets-QXL/legacy-assets/image/spec_bone.png" },
  { name: "Cardiology", slug: "cardiology", icon: "🫀", href: "/specialities/cardiology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150392/Assets-QXL/legacy-assets/image/spec_cardiology.png" },
  { name: "Endocrinology", slug: "endocrinology", icon: "🧬", href: "/specialities/endocrinology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png" },
  { name: "Gastroenterology", slug: "gastroenterology", icon: "🔬", href: "/specialities/gastroenterology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png" },
  { name: "Hematology", slug: "hematology", icon: "🩸", href: "/specialities/hematology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150417/Assets-QXL/legacy-assets/image/spec_hematology.png" },
  { name: "Infectious Diseases", slug: "infectious-diseases", icon: "🦠", href: "/specialities/infectious-diseases", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150422/Assets-QXL/legacy-assets/image/spec_infectious.png" },
  { name: "Oncology", slug: "oncology", icon: "🎗️", href: "/specialities/oncology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150430/Assets-QXL/legacy-assets/image/spec_oncology.png" },
  { name: "Neurology", slug: "neurology", icon: "🧠", href: "/specialities/neurology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150423/Assets-QXL/legacy-assets/image/spec_neurology.png" },
  { name: "Urology", slug: "urology", icon: "💧", href: "/specialities/urology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png" },
  { name: "Women's Health", slug: "womens-health", icon: "👩‍⚕️", href: "/specialities/womens-health", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png" },
];

export default function SpecialitiesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 30%, #e8f4fd 60%, #dbeafe 100%)' }}>
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 70% 30%, rgba(125,211,232,0.4) 0%, transparent 60%)' }} />
        <div className="max-w-[1200px] mx-auto px-4 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block glass-pill px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#0ea5e9' }}>
              10 Specialities
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#0c4a6e', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
              Our Clinical Specialities
            </h1>
            <p className="text-sm md:text-base max-w-xl font-medium leading-relaxed" style={{ color: '#0369a1' }}>
              Discover specialized laboratory diagnostic tests, panels, and clinical profiles tailored to distinct medical disciplines — all NABL-certified and consultant-reviewed.
            </p>
            <div className="w-16 h-1 rounded-full mt-4" style={{ background: 'linear-gradient(135deg, #7dd3fc, #0ea5e9)' }} />
          </motion.div>
        </div>
      </section>

      {/* Grid of Specialities */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {specialities.map((spec, i) => (
              <motion.div
                key={spec.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={spec.href}
                  className="flex flex-col items-center justify-center p-6 glass-card group"
                  style={{ minHeight: 200 }}
                >
                  <div className="mb-4 w-28 h-28 flex items-center justify-center flex-shrink-0 rounded-full overflow-hidden transition-transform group-hover:scale-110" style={{ background: 'rgba(240,249,255,0.8)' }}>
                    <img
                      src={`${spec.img}?v=4`}
                      alt={spec.name}
                      className={`w-24 h-24 object-contain mix-blend-multiply ${spec.slug === 'gastroenterology' ? 'scale-[1.4]' : 'scale-110'}`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const span = document.createElement('span');
                          span.textContent = spec.icon;
                          span.className = 'text-4xl';
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <h3 className="font-extrabold text-xs tracking-wider uppercase group-hover:text-sky-600 transition-colors" style={{ color: '#0c4a6e' }}>
                    {spec.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
