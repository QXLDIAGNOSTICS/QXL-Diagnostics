"use client";
import React from 'react';
import { CalendarCheck, MapPin, Syringe, FileText, FlaskConical, ThermometerSnowflake, HeartPulse } from 'lucide-react';
import Link from 'next/link';

export default function HomeCollectionSection({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const Heading = decorativeHeading ? 'p' : 'h2';
  const steps = [
    {
      icon: <CalendarCheck className="w-5 h-5 text-[#D69A18]" />,
      title: "Book Online",
      desc: "Select your tests and choose a convenient time slot for home collection."
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#D69A18]" />,
      title: "We Come to You",
      desc: "Our highly trained phlebotomist will visit your home at the scheduled time."
    },
    {
      icon: <Syringe className="w-5 h-5 text-[#D69A18]" />,
      title: "Safe Collection",
      desc: "Samples are collected safely using sterile, single-use equipment."
    },
    {
      icon: <FileText className="w-5 h-5 text-[#D69A18]" />,
      title: "Digital Reports",
      desc: "Receive accurate, expert-reviewed reports via email or WhatsApp."
    },
    {
      icon: <FlaskConical className="w-5 h-5 text-[#D69A18]" />,
      title: "NABL Accredited Labs",
      desc: "All samples are analyzed in our fully accredited, state-of-the-art laboratory."
    },
    {
      icon: <ThermometerSnowflake className="w-5 h-5 text-[#D69A18]" />,
      title: "Cold Chain Transport",
      desc: "Samples are sealed and carried in temperature-controlled boxes to ensure stability."
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-[#D69A18]" />,
      title: "Clinical Support",
      desc: "Get optional post-report guidance from our panel of clinical biochemists."
    }
  ];

  return (
    <section className="py-6 sm:py-10 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 w-full">
        <div className="bg-[#FFFBF0] border border-[#F3DBA7] p-5 sm:p-8 text-center rounded-3xl relative shadow-sm">
          
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 8px)); }
            }
            .animate-steps-marquee {
              display: flex;
              gap: 16px;
              width: max-content;
              animation: marquee-scroll 40s linear infinite;
            }
            .steps-marquee-container:hover .animate-steps-marquee {
              animation-play-state: paused;
            }
          `}} />

          <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
            Convenience at your Doorstep
          </span>
          <Heading className="text-[#0f2d5e] text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2">
            Free Home Sample Collection
          </Heading>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium mb-6 leading-relaxed">
            Experience world-class diagnostic services without leaving the comfort of your home. Available across all major locations in Bengaluru.
          </p>

          {/* Scrolling Steps Container */}
          <div className="steps-marquee-container relative w-full overflow-hidden mb-6 py-1">
            {/* Gradients on edges for smooth fading */}
            <div className="absolute left-0 top-0 bottom-0 w-6 md:w-16 bg-gradient-to-r from-[#FFFBF0] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 md:w-16 bg-gradient-to-l from-[#FFFBF0] to-transparent z-10 pointer-events-none" />

            <div className="animate-steps-marquee">
              {/* Primary step list for search crawlers & screen readers */}
              {steps.map((step, idx) => (
                <div 
                  key={`primary-${idx}`} 
                  className="bg-white border border-[#F3DBA7] p-4 rounded-2xl flex flex-col items-center text-center w-[210px] sm:w-[240px] flex-shrink-0 whitespace-normal hover:border-[#D69A18] shadow-2xs transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center mb-3 shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="font-extrabold text-[#0f2d5e] text-xs sm:text-[13px] mb-1 leading-snug">{step.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
              {/* Visual loop duplicate set — hidden from search crawlers & screen readers */}
              {steps.map((step, idx) => (
                <div 
                  key={`duplicate-${idx}`} 
                  aria-hidden="true"
                  className="bg-white border border-[#F3DBA7] p-4 rounded-2xl flex flex-col items-center text-center w-[210px] sm:w-[240px] flex-shrink-0 whitespace-normal hover:border-[#D69A18] shadow-2xs transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center mb-3 shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="font-extrabold text-[#0f2d5e] text-xs sm:text-[13px] mb-1 leading-snug">{step.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold px-7 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Book Home Collection Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
