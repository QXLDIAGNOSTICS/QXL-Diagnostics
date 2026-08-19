"use client";
import React from 'react';
import { Award, Star, Briefcase, Trophy, Target, Lightbulb, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TeamPage() {
  const doctors = [
    {
      name: "Dr. Shantakumar Muruda",
      role: "Founder & CEO",
      qualification: "MD (BIOCHEMISTRY)",
      image: "/images/dr_shantakumar_new.jpg",
      imagePosition: "center 20%",
      slug: "/dr-shantakumar-muruda",
      isFounder: true,
      description: "Over 20 years of experience in Clinical Biochemistry, Laboratory Operations, and Hospital Management. NABL Lead Assessor (150+ assessments) and PHFI-certified Diabetologist.",
      experience: "Over 20 years",
      expertise: "Clinical Biochemistry, Laboratory Operations, Hospital establishment and Management, Diabetology",
      achievements: "NABL Lead Assessor (150+ assessments), PHFI-certified Diabetologist.",
      contribution: "Drives QXL's strategic vision, integrating cutting-edge technology with stringent diagnostic quality control."
    },
    {
      name: "Dr. Pritilata Rout",
      role: "Senior Consultant Histopathologist",
      qualification: "MD (PATHOLOGY), PDF (NEUROPATH)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png",
      slug: "/dr-pritilata-rout",
      isFounder: false,
      description: "Senior Consultant Histopathologist with specialized fellowship training in Neuropathology and extensive diagnostic expertise.",
      experience: "28+ years (Since 1996)",
      expertise: "Neuropathology, Epilepsy Pathology, Cytopathology, Onco-Pathology",
      achievements: "Post-doctoral fellowship in Neuropathology from the prestigious NIMHANS (2001).",
      contribution: "Provides expert, meticulous diagnostic interpretation for complex histopathology, cytology, and oncology cases."
    },
    {
      name: "Dr. Ajitha Pillai",
      role: "Senior Consultant",
      qualification: "MD (MICROBIOLOGY)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg",
      slug: "/dr-ajitha-pillai",
      isFounder: false,
      description: "Senior Consultant Microbiologist specializing in clinical microbiology, infectious diseases, and advanced infection control protocols.",
      experience: "25+ years",
      expertise: "Clinical Microbiology, Infectious Diseases, Infection Control, Serology",
      achievements: "Instrumental in setting up advanced infectious disease testing protocols.",
      contribution: "Leads the microbiology department, ensuring rapid and accurate identification of pathogens to guide effective treatments."
    },
    {
      name: "Dr. Naveen Kumar N",
      role: "Consultant Pathologist",
      qualification: "DCP, DNB (PATHOLOGY)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg",
      slug: "/dr-naveen-kumar-n",
      isFounder: false,
      description: "Consultant Pathologist with extensive experience in clinical pathology, driving accurate diagnostics and continuous quality improvement.",
      experience: "10+ years",
      expertise: "Pathology, Histopathology, Hematology, Laboratory Quality Management",
      achievements: "Pivotal role in continuous NABL certification maintenance.",
      contribution: "Oversees routine pathology, histopathology and hematology, ensuring laboratory operations consistently meet rigorous regulatory standards."
    }
  ];

  const founder = doctors.find(d => d.isFounder);
  const consultants = doctors.filter(d => !d.isFounder);

  return (
    <div className="bg-[#f8faff] min-h-screen">


      <section className="py-14">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-[#0284c7]" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0c4a6e] uppercase tracking-wider">Founder &amp; CEO</h2>
          </div>
          {founder && <DoctorCard doc={founder} isHero />}
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
              <DoctorCard key={doc.name} doc={doc} />
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

const DoctorCard = ({ doc, isHero = false }: { doc: any; isHero?: boolean }) => {
  return (
    <article
      className={`group overflow-hidden rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isHero ? "md:flex-row max-w-4xl" : ""
      }`}
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
        border: '1px solid rgba(125,199,232,0.28)',
        boxShadow: '0 8px 32px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      <div
        className={`relative overflow-hidden shrink-0 ${
          isHero ? "w-full md:w-[35%] min-h-[260px] md:min-h-[300px]" : "h-64 sm:h-72"
        } bg-gradient-to-b from-sky-50 to-sky-100/50`}
      >
        <img
          src={doc.image}
          alt={doc.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ 
            objectPosition: doc.imagePosition || "top"
          }}
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
        <div className="flex flex-col items-start gap-2 mb-6">
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
        
        <div className="grid grid-cols-1 gap-3 mb-6">
          {[
            { icon: Briefcase, label: "Experience", value: doc.experience },
            { icon: Target, label: "Expertise", value: doc.expertise },
            { icon: Trophy, label: "Achievements", value: doc.achievements },
            { icon: Lightbulb, label: "Contribution to QXL", value: doc.contribution },
          ].map(({ icon: Icon, label, value }) => value && (
            <div key={label} className="flex items-start gap-3 rounded-xl p-3" style={{ background: 'rgba(224,242,254,0.4)' }}>
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                <Icon className="w-4 h-4 text-[#0284c7]" />
              </div>
              <div>
                <span className="font-bold text-[#0c4a6e] block text-[10px] uppercase tracking-wider mb-0.5">{label}</span>
                <span className="text-slate-600 text-[12px] leading-snug font-medium line-clamp-2">{value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-sky-100">
          <Link href={doc.slug} className="inline-flex items-center gap-2 text-[#0284c7] font-bold text-sm hover:text-[#0c4a6e] transition-colors group-hover:translate-x-1">
            View Full Profile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
