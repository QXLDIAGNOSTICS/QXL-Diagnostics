"use client";
import React from 'react';
import { CalendarCheck, MapPin, Syringe, FileText } from 'lucide-react';
import Link from 'next/link';

export default function HomeCollectionSection({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const Heading = decorativeHeading ? 'p' : 'h2';
  const steps = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-[#0284c7]" />,
      title: "Book Online",
      desc: "Select your tests and choose a convenient time slot for home collection."
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#0284c7]" />,
      title: "We Come to You",
      desc: "Our highly trained phlebotomist will visit your home at the scheduled time."
    },
    {
      icon: <Syringe className="w-6 h-6 text-[#0284c7]" />,
      title: "Safe Collection",
      desc: "Samples are collected safely using sterile, single-use equipment."
    },
    {
      icon: <FileText className="w-6 h-6 text-[#0284c7]" />,
      title: "Digital Reports",
      desc: "Receive accurate, expert-reviewed reports via email or WhatsApp."
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        <div className="glass-panel p-8 md:p-12 text-center rounded-3xl">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">Convenience at your Doorstep</span>
          <Heading className="text-[#0c4a6e] text-3xl font-extrabold mb-3">Free Home Sample Collection</Heading>
          <p className="text-slate-700 text-sm max-w-2xl mx-auto font-medium mb-10">
            Experience world-class diagnostic services without leaving the comfort of your home. Available across all major locations in Bengaluru.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {steps.map((step, idx) => (
              <div key={idx} className="glass-card p-6 rounded-3xl flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full glass-pill flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-extrabold text-[#0c4a6e] text-[15px] mb-2">{step.title}</h3>
                <p className="text-slate-600 text-[12px] leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/book" className="btn-sky px-10 py-4 shadow-lg text-sm">
            Book Home Collection Now
          </Link>
        </div>
      </div>
    </section>
  );
}
