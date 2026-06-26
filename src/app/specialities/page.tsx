"use client";
import React from 'react';
import Link from 'next/link';

export default function SpecialitiesPage() {
  const specialities = [
    { name: "BONE DISORDERS", icon: "/image/spec_bone.png", href: "/specialities/bone-disorders" },
    { name: "CARDIOLOGY", icon: "/image/spec_cardiology.png", href: "/specialities/cardiology" },
    { name: "ENDOCRINOLOGY", icon: "/image/spec_endocrinology.png", href: "/specialities/endocrinology" },
    { name: "GASTROENTEROLOGY", icon: "/image/spec_gastro.png", href: "/specialities/gastroenterology" },
    { name: "HEMATOLOGY", icon: "/image/spec_hematology.png", href: "/specialities/hematology" },
    { name: "INFECTIOUS DISEASES", icon: "/image/spec_infectious.png", href: "/specialities/infectious-diseases" },
    { name: "ONCOLOGY", icon: "/image/spec_oncology.png", href: "/specialities/oncology" },
    { name: "NEUROLOGY", icon: "/image/spec_neurology.png", href: "/specialities/neurology" },
    { name: "UROLOGY", icon: "/image/spec_urology.png", href: "/specialities/urology" },
    { name: "WOMEN'S HEALTH", icon: "/image/spec_womens.png", href: "/specialities/womens-health" },
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Our Clinical Specialities</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
            Discover specialized laboratory diagnostic tests, panels, and clinical profiles tailored to distinct medical disciplines.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
        </div>
      </section>

      {/* Grid of Specialities */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {specialities.map(spec => (
              <Link 
                key={spec.name} 
                href={spec.href}
                className="flex flex-col items-center justify-center p-8 bg-white border border-gray-150 rounded-2xl hover:border-[#2563eb] hover:shadow-md transition-all text-center h-full group"
              >
                <div className="mb-4 w-32 h-32 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 bg-white rounded-full overflow-hidden">
                  <img 
                    src={`${spec.icon}?v=3`} 
                    alt={spec.name} 
                    className={`w-28 h-28 object-contain mix-blend-multiply ${spec.name === "GASTROENTEROLOGY" ? "scale-[1.4]" : "scale-110"}`}
                    onError={(e) => { 
                      e.currentTarget.style.display = 'none'; 
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svg.setAttribute("class", "w-10 h-10 text-[#0f2d5e]");
                        svg.setAttribute("fill", "none");
                        svg.setAttribute("viewBox", "0 0 24 24");
                        svg.setAttribute("stroke", "currentColor");
                        svg.setAttribute("stroke-width", "1.5");
                        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.54-1.033-7.593-2.736m15.186 0a11.97 11.97 0 00-1.743-1.846M4.407 7.764a11.97 11.97 0 011.743-1.846" />';
                        parent.appendChild(svg);
                      }
                    }} 
                  />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xs tracking-wider uppercase group-hover:text-[#2563eb] transition-colors">{spec.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
