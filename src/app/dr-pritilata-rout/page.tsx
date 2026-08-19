"use client";
import React from 'react';
import { Award, Briefcase, Trophy, Target, Lightbulb, Phone } from 'lucide-react';

export default function DrPritilataRoutPage() {
  const doc = {
    name: "Dr. Pritilata Rout",
    role: "Senior Consultant Histopathologist",
    qualification: "MD (PATHOLOGY), PDF (NEUROPATH)",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png",
    experience: "28+ years (Since 1996)",
    expertise: "Neuropathology, Epilepsy Pathology, Cytopathology, Onco-Pathology",
    achievements: "Post-doctoral fellowship in Neuropathology from the prestigious NIMHANS (2001).",
    contribution: "Provides expert, meticulous diagnostic interpretation for complex histopathology, cytology, and oncology cases."
  };

  const detailRows = [
    { icon: Briefcase, label: "Experience", value: doc.experience },
    { icon: Target, label: "Expertise", value: doc.expertise },
    { icon: Trophy, label: "Achievements", value: doc.achievements },
    { icon: Lightbulb, label: "Contribution to QXL", value: doc.contribution },
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen pb-20">
      <section className="relative overflow-hidden py-14 border-b border-sky-100" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #eff6ff 100%)' }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-16 right-10 w-72 h-72 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-300/15 blur-3xl" />
        </div>
        <div className="relative max-w-[1260px] mx-auto px-4 w-full text-center">
          <span className="inline-block bg-[#0284c7] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4 shadow-sm shadow-sky-500/25">
            {doc.role}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0c4a6e] mb-3 leading-tight uppercase tracking-tight">
            {doc.name}
          </h1>
          <p className="text-[#0284c7] text-lg font-bold">{doc.qualification}</p>
        </div>
      </section>

      <section className="py-14 max-w-[1000px] mx-auto px-4 w-full">
        <article
          className="group overflow-hidden rounded-3xl flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
            border: '1px solid rgba(125,199,232,0.28)',
            boxShadow: '0 8px 32px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <div className="relative overflow-hidden shrink-0 w-full md:w-[40%] min-h-[350px] md:min-h-[450px] bg-gradient-to-b from-sky-50 to-sky-100/50">
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ objectPosition: "top" }}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/80 to-transparent md:hidden" />
          </div>

          <div className="p-6 md:p-10 flex flex-col flex-1 justify-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0c4a6e] mb-4 tracking-tight">
              About {doc.name}
            </h3>
            
            <div className="grid grid-cols-1 gap-4 text-[14px]">
              {detailRows.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-2xl px-4 py-4"
                  style={{
                    background: 'rgba(224,242,254,0.45)',
                    border: '1px solid rgba(125,199,232,0.2)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 text-[#0284c7]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0c4a6e] block mb-1 text-[12px] uppercase tracking-wide">{label}</span>
                    <span className="text-slate-600 leading-relaxed font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a
                href="https://api.whatsapp.com/send?phone=919964639639"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-extrabold px-8 py-3.5 rounded-full text-sm text-white transition-all hover:scale-105"
                style={{ background: '#25D366', boxShadow: '0 4px 18px rgba(37,211,102,0.3)' }}
              >
                <Phone className="w-4 h-4" /> Consult on WhatsApp
              </a>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
