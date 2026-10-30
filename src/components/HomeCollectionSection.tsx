"use client";
import React from 'react';
import { CalendarCheck, MapPin, Syringe, FileText, FlaskConical, ThermometerSnowflake, HeartPulse } from 'lucide-react';
import Link from 'next/link';

export default function HomeCollectionSection({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const Heading = decorativeHeading ? 'p' : 'h2';
  const steps = [
    {
      icon: <CalendarCheck className="w-5 h-5 text-[#2563EB]" />,
      title: "Book Online",
      desc: "Select your tests and choose a convenient time slot for home collection."
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#2563EB]" />,
      title: "We Come to You",
      desc: "Our highly trained phlebotomist will visit your home at the scheduled time."
    },
    {
      icon: <Syringe className="w-5 h-5 text-[#2563EB]" />,
      title: "Safe Collection",
      desc: "Samples are collected safely using sterile, single-use equipment."
    },
    {
      icon: <FileText className="w-5 h-5 text-[#2563EB]" />,
      title: "Digital Reports",
      desc: "Receive accurate, expert-reviewed reports via email or WhatsApp."
    },
    {
      icon: <FlaskConical className="w-5 h-5 text-[#2563EB]" />,
      title: "NABL Accredited Labs",
      desc: "All samples are analyzed in our fully accredited, state-of-the-art laboratory."
    },
    {
      icon: <ThermometerSnowflake className="w-5 h-5 text-[#2563EB]" />,
      title: "Cold Chain Transport",
      desc: "Samples are sealed and carried in temperature-controlled boxes to ensure stability."
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-[#2563EB]" />,
      title: "Clinical Support",
      desc: "Get optional post-report guidance from our panel of clinical biochemists."
    }
  ];

  return (
    <section className="py-6 sm:py-10 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 w-full">
        <div className="bg-[#F0F7FF] border border-[#BFDBFE] p-5 sm:p-8 text-center rounded-3xl relative shadow-sm">
          
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

          <span className="inline-block bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
            Convenience at your Doorstep
          </span>
          <Heading className="text-[#0f2d5e] text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2">
            Free Home Sample Collection
          </Heading>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto font-medium mb-6 leading-relaxed">
            Home sample collection is available in eligible Bengaluru PIN codes, subject to slot confirmation. Samples are transported under strict cold chain according to test-specific pre-analytical requirements, with digital reports confirmed at booking.
          </p>

          {/* 7 Home Collection Process Steps */}
          <div className="relative w-full mb-6 py-1">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 scrollbar-none justify-start lg:justify-center">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-[#BFDBFE] p-4 rounded-2xl flex flex-col items-center text-center w-[200px] sm:w-[220px] shrink-0 snap-start hover:border-[#2563EB] shadow-2xs transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center mb-3 shrink-0">
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
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold px-7 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Book Home Collection Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
