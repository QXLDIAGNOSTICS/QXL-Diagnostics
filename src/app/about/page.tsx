"use client";

import React from 'react';
import { Target, CheckCircle, ShieldCheck, MapPin, Mail, Phone, Cpu, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Accreditations from '@/components/Accreditations';
import FaqSection from '@/components/FaqSection';
import DoctorLedManifesto from '@/components/DoctorLedManifesto';

export default function AboutPage() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      
      {/* ── Banner Slider Section (Hero) ── */}
      <section className="w-full relative group py-4 sm:py-6 bg-white border-b border-slate-100">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-6">
          <div className="bg-[#FFFBF0] p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-[#F3DBA7] shadow-sm relative overflow-hidden">
            <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-xl sm:rounded-2xl">
              <div className="min-w-full flex-none snap-start">
                <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150040/Assets-QXL/legacy-assets/image/about_banner_final_1.png" alt="QXL Diagnostic Lab" className="w-full h-[180px] sm:h-[320px] md:h-[420px] object-cover rounded-xl sm:rounded-2xl" />
              </div>
              <div className="min-w-full flex-none snap-start">
                <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150042/Assets-QXL/legacy-assets/image/about_banner_final_2.jpg" alt="Pathology Laboratory" className="w-full h-[180px] sm:h-[320px] md:h-[420px] object-cover rounded-xl sm:rounded-2xl" />
              </div>
              <div className="min-w-full flex-none snap-start">
                <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150045/Assets-QXL/legacy-assets/image/about_banner_final_3.png" alt="Doctor-Led Diagnostics" className="w-full h-[180px] sm:h-[320px] md:h-[420px] object-cover rounded-xl sm:rounded-2xl" />
              </div>
              <div className="min-w-full flex-none snap-start">
                <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150046/Assets-QXL/legacy-assets/image/about_banner_final_4.png" alt="State of the Art Equipment" className="w-full h-[180px] sm:h-[320px] md:h-[420px] object-cover rounded-xl sm:rounded-2xl" />
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#D69A18] text-[#0f2d5e] hover:text-white p-2 sm:p-2.5 rounded-full transition-all shadow-md z-10 cursor-pointer border border-[#F3DBA7]"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#D69A18] text-[#0f2d5e] hover:text-white p-2 sm:p-2.5 rounded-full transition-all shadow-md z-10 cursor-pointer border border-[#F3DBA7]"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
              <div className="w-2 h-2 rounded-full bg-[#D69A18]"></div>
              <div className="w-2 h-2 rounded-full bg-white/70"></div>
              <div className="w-2 h-2 rounded-full bg-white/70"></div>
              <div className="w-2 h-2 rounded-full bg-white/70"></div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </section>

      {/* ── Precision Diagnostics Overview ── */}
      <section className="py-6 sm:py-10 bg-white border-b border-slate-100">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-6">
          <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7 space-y-3 text-left">
              <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                About QXL Diagnostics
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-[#0f2d5e] leading-tight">
                Precision Diagnostics. Doctor-Led Interpretation.
              </h1>
              <p className="text-[#D69A18] font-bold text-xs sm:text-sm leading-relaxed">
                QXL Diagnostics, Unit of Qualitify Healthtech Pvt. Ltd., <span className="text-slate-700 font-medium">is a super speciality diagnostic laboratory established to deliver advanced, reliable and clinically meaningful diagnostic answers.</span>
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                Our laboratory is equipped for advanced testing including autoimmune panels, India-specific allergen panels, immunofluorescence, immunoblot, ELISA, chemiluminescence, Multiplex PCR with FilmArray for syndrome-based testing, coagulation factor assays, TB PCR by CB NAAT with NTM screening, automated microbiology, maternal screening, and Histo-Cytopathology with IHC.
              </p>
              
              <div className="pt-2">
                <a 
                  href="https://maps.app.goo.gl/GCW7zkQYoJNdaHNv7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] hover:bg-[#D69A18] hover:text-white font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-2xs cursor-pointer active:scale-95"
                >
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>View Lab Location</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl h-[240px] sm:h-[320px] shadow-sm relative overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1709890456187!6m8!1m7!1sAF1QipOT_E1OvCmLPtbrGMkCFVjybPWfPYcc217TvRyC!2m2!1d12.911377!2d77.4850693!3f193.36!4f0!5f90"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Analytical Equipment ── */}
      <section className="py-6 sm:py-10 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
              State-of-the-Art Technology
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#0f2d5e] mb-1">
              Our Analytical Equipment
            </h2>
            <div className="w-12 h-1 bg-[#D69A18] mx-auto rounded-full mt-2" />
            <p className="text-slate-600 text-xs sm:text-sm font-medium mt-2">
              Equipped with world-class analytical instruments for maximum precision and rapid turnaround times.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
            <div className="rounded-2xl overflow-hidden h-[180px] sm:h-[260px] border border-slate-200 shadow-2xs">
              <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150168/Assets-QXL/legacy-assets/image/equipment_1.jpg" alt="Lab Technician operating equipment" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-[180px] sm:h-[260px] border border-slate-200 shadow-2xs">
              <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150172/Assets-QXL/legacy-assets/image/equipment_2.png" alt="Analytical Equipment in use" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left">
            {[
              { title: "DXI 9000 Analyzer", desc: "High-throughput clinical chemistry analyzer renowned for accuracy in biochemical parameter analysis. Designed for high-volume operations with rapid turnaround." },
              { title: "IMMULITE 2000", desc: "Advanced immunoassay analyzer for hormone profiling, tumor marker testing, infectious disease serology, and allergy detection with high sensitivity." },
              { title: "VITEK System", desc: "Automated microbial identification and antimicrobial susceptibility testing system supporting targeted pathogen therapy." },
              { title: "BACT/ALERT", desc: "Automated blood culture system for early detection of microbial growth, critical for rapid diagnosis of bloodstream infections and sepsis." },
              { title: "PHADIATOP / Allergy Testing", desc: "Advanced in vitro allergy testing platform detecting specific IgE antibodies for India-specific food and environmental panels." },
              { title: "FTIR Spectroscopy", desc: "Fourier Transform Infrared Spectroscopy for precise chemical compound characterisation, used for stone composition analysis." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-left space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center mb-2">
                  <Cpu className="w-4 h-4 text-[#D69A18]" />
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-xs sm:text-sm">{feature.title}</h3>
                <p className="text-slate-600 text-[11.5px] sm:text-xs leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="py-6 sm:py-10 bg-white border-b border-slate-100">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
              Comprehensive Services
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#0f2d5e] mb-1">
              What We Offer
            </h2>
            <div className="w-12 h-1 bg-[#D69A18] mx-auto rounded-full mt-2" />
            <p className="text-slate-600 text-xs sm:text-sm font-medium mt-2">
              From routine blood investigations to advanced super-specialty panels in oncology, autoimmune, and reproductive health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: <Target className="w-6 h-6 text-[#D69A18]" />, title: "AI-Powered Intelligence", desc: "Laboratory processes combine advanced analytical platforms with clinician-reviewed interpretations for actionable diagnostics." },
              { icon: <MapPin className="w-6 h-6 text-[#D69A18]" />, title: "Home Sample Collection", desc: "Trained phlebotomists visit your home across Bengaluru with hygienic, safe collection and digital report delivery." },
              { icon: <ShieldCheck className="w-6 h-6 text-[#D69A18]" />, title: "Expert-Reviewed Reports", desc: "Every report is reviewed by our team of senior pathologists, microbiologists and biochemists before release." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center mx-auto mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-sm sm:text-base">{feature.title}</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* QXL Advantage Banner */}
          <div className="bg-[#FFFBF0] text-[#0f2d5e] p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center relative overflow-hidden shadow-sm border border-[#F3DBA7]">
            <h2 className="text-lg sm:text-2xl font-black text-[#0f2d5e] mb-2">Experience the QXL Diagnostics Advantage</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto mb-4 font-medium">
              Precision diagnostics in Bengaluru — advanced super speciality testing with home sample collection, same-day reports, and consultant-reviewed results.
            </p>
            <p className="text-[#D69A18] font-black text-xs sm:text-sm uppercase tracking-wider">
              Explore our services today and discover the QXL difference — where innovation meets care.
            </p>
          </div>
        </div>
      </section>

      {/* ── Doctor-Led Corporate Manifesto ── */}
      <DoctorLedManifesto />

      {/* ── Quality (Accreditations) ── */}
      <Accreditations />

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── Contact Support ── */}
      <section className="py-6 sm:py-10 bg-white border-t border-slate-100">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-6">
          <div className="text-center mb-6">
            <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 shadow-2xs">
              Support
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#0f2d5e] mb-1">
              Get in Touch
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">We are here to assist you with all your diagnostic needs.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center text-center space-y-2">
               <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center mb-1"><MapPin className="text-[#D69A18] w-5 h-5" /></div>
               <h3 className="text-[#0f2d5e] font-extrabold text-xs">Location</h3>
               <p className="text-slate-600 text-[11px] font-medium leading-snug">3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060</p>
             </div>
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center text-center space-y-2">
               <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center mb-1"><Mail className="text-[#D69A18] w-5 h-5" /></div>
               <h3 className="text-[#0f2d5e] font-extrabold text-xs">Email</h3>
               <p className="text-slate-600 text-[11px] font-medium leading-snug">qxldiagnostics@gmail.com</p>
             </div>
             <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col items-center text-center space-y-2">
               <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center mb-1"><Phone className="text-[#D69A18] w-5 h-5" /></div>
               <h3 className="text-[#0f2d5e] font-extrabold text-xs">Phone</h3>
               <p className="text-slate-600 text-[11px] font-medium leading-snug">+91 9964 639 639</p>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
