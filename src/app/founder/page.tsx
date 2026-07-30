"use client";
import React from 'react';
import { Award, Star, Briefcase, Trophy, Target, Lightbulb, Phone } from 'lucide-react';

export default function FounderPage() {
  const doctors = [
    {
      name: "Dr. Shantakumar Muruda",
      role: "Founder & CEO",
      qualification: "MD (BIOCHEMISTRY)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150160/Assets-QXL/legacy-assets/image/dr_shantakumar_v4.jpg",
      experience: "Over 20 years",
      expertise: "Clinical Biochemistry, Laboratory Operations, Hospital establishment and Management, Diabetology",
      achievements: "NABL Lead Assessor (150+ assessments), PHFI-certified Diabetologist.",
      contribution: "Drives QXL's strategic vision, integrating cutting-edge technology with stringent diagnostic quality control.",
      isFounder: true
    },
    {
      name: "Dr. Ajitha Pillai",
      role: "Senior Consultant",
      qualification: "MD (MICROBIOLOGY)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg",
      experience: "20+ years",
      expertise: "Clinical Microbiology, Molecular Biology, Infectious and Autoimmune Serology",
      achievements: "Head of Microbiology, Molecular Biology, Immunology, Serology and Infection control to premium tertiary care hospitals in Bengaluru.",
      contribution: "Leads the infectious diseases testing vertical and ensures highly rigorous infection control protocols.",
      isFounder: false
    },
    {
      name: "Dr. Pritilata Rout",
      role: "Senior Consultant Histopathologist",
      qualification: "MD (PATHOLOGY), PDF (NEUROPATH)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png",
      experience: "28+ years (Since 1996)",
      expertise: "Neuropathology, Epilepsy Pathology, Cytopathology, Onco-Pathology",
      achievements: "Post-doctoral fellowship in Neuropathology from the prestigious NIMHANS (2001).",
      contribution: "Provides expert, meticulous diagnostic interpretation for complex histopathology, cytology, and oncology cases.",
      isFounder: false
    },
    {
      name: "Dr. Naveen Kumar N",
      role: "Consultant Pathologist",
      qualification: "DCP, DNB (PATHOLOGY)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg",
      experience: "10+ years",
      expertise: "Pathology, Histopathology, Hematology, Laboratory Quality Management",
      achievements: "Pivotal role in continuous NABL certification maintenance.",
      contribution: "Oversees routine pathology, histopathology and hematology, ensuring laboratory operations consistently meet rigorous regulatory standards.",
      isFounder: false
    }
  ];

  const founder = doctors.find(d => d.isFounder);
  const consultants = doctors.filter(d => !d.isFounder);

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <section className="relative overflow-hidden py-14 border-b border-sky-100"
        style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #eff6ff 100%)' }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-16 right-10 w-72 h-72 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-300/15 blur-3xl" />
        </div>
        <div className="relative max-w-[1260px] mx-auto px-4 w-full">
          <span className="inline-block bg-[#0284c7] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4 shadow-sm shadow-sky-500/25">
            Leadership & Expertise
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0c4a6e] mb-3 leading-tight uppercase tracking-tight">
            Founder and Consultants
          </h1>
          <p className="text-slate-600 text-sm md:text-base max-w-3xl font-medium leading-relaxed">
            Meet the visionary leadership and the highly qualified panel of Consultants who drive QXL Diagnostics&apos; commitment to unparalleled accuracy and precision.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#0284c7]" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0c4a6e] uppercase tracking-wider">Founder &amp; CEO</h2>
          </div>
          {founder && <DoctorProfile doc={founder} isHero />}
        </div>
      </section>

      <section className="py-14 bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe]/40 border-t border-sky-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
              <Award className="w-5 h-5 text-[#0284c7]" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0c4a6e] uppercase tracking-wider">Our Consultants</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultants.map((doc) => (
              <DoctorProfile key={doc.name} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Near-black glass CTA */}
      <section className="relative overflow-hidden py-16" style={{ background: '#060a12' }}>
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)',
            }}
          />
        </div>
        <div
          className="relative max-w-3xl mx-auto px-4 text-center rounded-3xl py-10"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Consult with our Experts</h2>
          <p className="text-white/45 text-sm font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
            Every test performed at QXL Diagnostics is reviewed by our panel of specialists to ensure you receive clinically meaningful answers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="tel:+919964639639"
              className="inline-flex items-center gap-2 font-extrabold px-8 py-3.5 rounded-full text-sm text-white transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.16)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <Phone className="w-4 h-4" /> Call Support
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=919964639639"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-extrabold px-8 py-3.5 rounded-full text-sm text-white transition-all hover:scale-105"
              style={{ background: '#25D366', boxShadow: '0 4px 18px rgba(37,211,102,0.3)' }}
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

const DoctorProfile = ({ doc, isHero = false }: { doc: any; isHero?: boolean }) => {
  const detailRows = [
    { icon: Briefcase, label: "Experience", value: doc.experience },
    { icon: Target, label: "Expertise", value: doc.expertise },
    { icon: Trophy, label: "Achievements", value: doc.achievements },
    { icon: Lightbulb, label: "Contribution to QXL", value: doc.contribution },
  ];

  return (
    <article
      className={`group overflow-hidden rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isHero ? "md:flex-row" : ""
      }`}
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
        border: '1px solid rgba(125,199,232,0.28)',
        boxShadow: '0 8px 32px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      <div
        className={`relative overflow-hidden ${
          isHero ? "w-full md:w-[45%] min-h-[420px]" : "h-96"
        } bg-gradient-to-b from-sky-50 to-sky-100/50`}
      >
        <img
          src={doc.image}
          alt={doc.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: doc.imagePosition || "top" }}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/80 to-transparent md:hidden" />
      </div>

      <div className={`p-6 md:p-8 flex flex-col flex-1 ${isHero ? "justify-center md:px-10" : ""}`}>
        <h3 className={`${isHero ? "text-2xl md:text-3xl" : "text-xl"} font-extrabold text-[#0c4a6e] mb-3 tracking-tight`}>
          {doc.name}
        </h3>
        <div className="flex flex-wrap gap-2 mb-6">
          <span
            className="text-white text-[11px] font-extrabold px-3 py-1 rounded-full"
            style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)' }}
          >
            {doc.role}
          </span>
          <span className="bg-sky-50 text-[#0284c7] border border-sky-200/80 text-[11px] font-extrabold px-3 py-1 rounded-full">
            {doc.qualification}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 text-[13px]">
          {detailRows.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-2xl px-3.5 py-3"
              style={{
                background: 'rgba(224,242,254,0.45)',
                border: '1px solid rgba(125,199,232,0.2)',
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Icon className="w-4 h-4 text-[#0284c7]" />
              </div>
              <div>
                <span className="font-bold text-[#0c4a6e] block mb-0.5 text-[11px] uppercase tracking-wide">{label}</span>
                <span className="text-slate-600 leading-relaxed">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
