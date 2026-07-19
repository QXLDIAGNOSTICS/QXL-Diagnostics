"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, MapPin, Syringe, FileText } from 'lucide-react';
import Link from 'next/link';

export default function HomeCollectionSection({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const Heading = decorativeHeading ? 'p' : 'h2';
  const steps = [
    {
      icon: <CalendarCheck className="w-6 h-6 text-[#2563eb]" />,
      title: "Book Online",
      desc: "Select your tests and choose a convenient time slot for home collection."
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#2563eb]" />,
      title: "We Come to You",
      desc: "Our highly trained phlebotomist will visit your home at the scheduled time."
    },
    {
      icon: <Syringe className="w-6 h-6 text-[#2563eb]" />,
      title: "Safe Collection",
      desc: "Samples are collected safely using sterile, single-use equipment."
    },
    {
      icon: <FileText className="w-6 h-6 text-[#2563eb]" />,
      title: "Digital Reports",
      desc: "Receive accurate, expert-reviewed reports via email or WhatsApp."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#f0f9ff] to-[#eff6ff] border-t border-blue-100">
      <div className="max-w-[1260px] mx-auto px-4 w-full text-center">
        <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">Convenience at your Doorstep</span>
        <Heading className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Free Home Sample Collection</Heading>
        <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium mb-10">
          Experience world-class diagnostic services without leaving the comfort of your home. Available across all major locations in Bengaluru.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-blue-50 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-[15px] mb-2">{step.title}</h3>
              <p className="text-slate-500 text-[12px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <Link href="/book" className="inline-block bg-[#2563eb] text-white font-extrabold px-10 py-3.5 rounded-full shadow-lg hover:bg-[#1d4ed8] hover:scale-105 transition-all text-sm">
          Book Home Collection Now
        </Link>
      </div>
    </section>
  );
}
