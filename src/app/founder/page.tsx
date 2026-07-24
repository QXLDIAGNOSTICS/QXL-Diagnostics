"use client";
import React from 'react';
import { Award, Star, Briefcase, Trophy, Target, Lightbulb } from 'lucide-react';

export default function FounderPage() {
  const doctors = [
    {
      name: "Dr. Shantakumar Muruda",
      role: "Founder & CEO",
      qualification: "MD (BIOCHEMISTRY)",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150160/Assets-QXL/legacy-assets/image/dr_shantakumar_v4.jpg",
      imagePosition: "center 20%",
      imageScale: 1.35,
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
    <div className="min-h-screen">
      {/* Page Hero */}
      <section className="py-12">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="glass-panel p-8 md:p-12 rounded-3xl">
            <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4 shadow-sm">
              Leadership &amp; Expertise
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0c4a6e] mb-3 leading-tight uppercase">
              FOUNDER AND CONSULTANTS
            </h1>
            <p className="text-slate-700 text-sm md:text-base max-w-3xl font-medium leading-relaxed">
              Meet the visionary leadership and the highly qualified panel of Consultants who drive QXL Diagnostics' commitment to unparalleled accuracy and precision.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-8">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-[#0284c7]" />
            <h2 className="text-2xl font-extrabold text-[#0c4a6e] uppercase tracking-wider">Founder &amp; CEO</h2>
          </div>
          {founder && (
            <div className="max-w-4xl mx-auto">
              <DoctorProfile doc={founder} isHero={true} />
            </div>
          )}
        </div>
      </section>

      {/* Senior Consultants */}
      <section className="py-8">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-[#0284c7]" />
            <h2 className="text-2xl font-extrabold text-[#0c4a6e] uppercase tracking-wider">Our Consultants</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultants.map((doc, idx) => (
              <DoctorProfile key={idx} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="glass-panel p-10 text-center rounded-3xl">
            <h2 className="text-3xl font-black text-[#0c4a6e] mb-4">Consult with our Experts</h2>
            <p className="text-slate-700 text-sm md:text-base font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              Every test performed at QXL Diagnostics is reviewed by our panel of specialists to ensure you receive clinically meaningful answers.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="tel:+919964639639"
                className="btn-sky shadow-md">
                Call Support
              </a>
              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer"
                className="glass-pill text-[#0284c7] font-extrabold px-8 py-3.5 hover:bg-sky-100/50 transition-all text-xs uppercase tracking-wider shadow-sm">
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

const DoctorProfile = ({ doc, isHero = false }: { doc: any, isHero?: boolean }) => {
  return (
    <div className={`glass-card p-2 rounded-3xl flex flex-col ${isHero ? 'md:flex-row' : ''}`}>
      <div className={`overflow-hidden rounded-2xl ${isHero ? 'w-full md:w-1/3 min-h-[300px]' : 'h-64'} bg-sky-50/50`}>
        <img src={doc.image} alt={doc.name}
          className="w-full h-full object-cover rounded-2xl"
          style={{ 
            objectPosition: doc.imagePosition || 'top',
            transform: doc.imageScale ? `scale(${doc.imageScale})` : 'none',
          }}
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop"; }} />
      </div>
      <div className={`p-6 md:p-8 flex flex-col flex-1 ${isHero ? 'justify-center' : ''}`}>
        <h3 className={`${isHero ? 'text-3xl' : 'text-xl'} font-extrabold text-[#0c4a6e] mb-2`}>{doc.name}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-[#2563eb] text-white text-[11px] font-extrabold px-3 py-1 rounded-full">{doc.role}</span>
          <span className="glass-pill text-[#0284c7] text-[11px] font-extrabold px-3 py-1">{doc.qualification}</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4 text-[13px]">
          <div className="flex items-start gap-3">
            <Briefcase className="w-4 h-4 text-[#0284c7] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0c4a6e] block mb-0.5">Experience</span>
              <span className="text-slate-700 leading-relaxed font-medium">{doc.experience}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Target className="w-4 h-4 text-[#0284c7] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0c4a6e] block mb-0.5">Expertise</span>
              <span className="text-slate-700 leading-relaxed font-medium">{doc.expertise}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Trophy className="w-4 h-4 text-[#0284c7] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0c4a6e] block mb-0.5">Achievements</span>
              <span className="text-slate-700 leading-relaxed font-medium">{doc.achievements}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Lightbulb className="w-4 h-4 text-[#0284c7] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#0c4a6e] block mb-0.5">Contribution to QXL</span>
              <span className="text-slate-700 leading-relaxed font-medium">{doc.contribution}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
