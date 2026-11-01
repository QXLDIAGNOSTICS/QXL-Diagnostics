"use client";
import React from 'react';
import { Award, Star, Briefcase, Trophy, Target, Lightbulb, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Doctor } from '@/lib/api';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';

export default function TeamView({ doctors }: { doctors: Doctor[] }) {
  const founder = doctors.find(d => d.is_founder);
  const consultants = doctors.filter(d => d !== founder);

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
              <DoctorCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Consult with our Experts CTA */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="bg-[#F0F7FF] p-8 md:p-12 rounded-3xl border border-[#BFDBFE] shadow-sm text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] tracking-tight">Consult with our Experts</h2>
            <p className="text-slate-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
              Every test performed at QXL Diagnostics is reviewed by our panel of specialists to ensure you receive clinically meaningful answers.
            </p>
            <div className="flex gap-4 justify-center flex-wrap pt-2">
              <a
                href="tel:+919964639639"
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] !text-white font-black px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                <Phone className="w-4 h-4 text-white" /> Call Support
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919964639639"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] !text-white font-black px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                style={{ color: '#ffffff' }}
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const DoctorCard = ({ doc, isHero = false }: { doc: Doctor; isHero?: boolean }) => {
  return (
    <article
      className={`group overflow-hidden rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isHero ? "md:flex-row max-w-5xl w-full" : ""
      }`}
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
        border: '1px solid rgba(125,199,232,0.28)',
        boxShadow: '0 8px 32px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      <div
        className={`relative overflow-hidden shrink-0 ${
          isHero ? "w-full md:w-[46%] lg:w-[48%] min-h-[380px] md:min-h-[460px] lg:min-h-[520px]" : "h-64 sm:h-72"
        } bg-gradient-to-b from-sky-50 to-sky-100/50`}
      >
        <img
          src={optimizeCloudinaryUrl(doc.card_image_url || doc.image_url || '', { w: 1200 })}
          alt={doc.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ 
            objectPosition: doc.image_position || "center 10%"
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
            {doc.title}
          </span>
          <span className="bg-sky-50 text-[#0284c7] border border-sky-200/80 text-[11px] font-extrabold px-3 py-1 rounded-full">
            {doc.card_qualification || doc.qualification}
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
          <Link href={doc.profile_path || `/doctors/${doc.slug}`} className="inline-flex items-center gap-2 text-[#0284c7] font-bold text-sm hover:text-[#0c4a6e] transition-colors group-hover:translate-x-1">
            View Full Profile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
