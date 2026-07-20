"use client";
import React from 'react';
import { Target, Eye, HeartPulse, CheckCircle, ShieldCheck, Clock, Award, MapPin, Mail, Phone, Cpu, FlaskConical, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';
import Accreditations from '@/components/Accreditations';
import FaqSection from '@/components/FaqSection';
import HomeCollectionSection from '@/components/HomeCollectionSection';

export default function AboutPage() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* ── Banner Slider Section (Hero) ── */}
      <section className="w-full relative group">
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
          <div className="min-w-full flex-none snap-start">
            <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150040/Assets-QXL/legacy-assets/image/about_banner_final_1.png" alt="Banner 1" className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover" />
          </div>
          <div className="min-w-full flex-none snap-start">
            <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150042/Assets-QXL/legacy-assets/image/about_banner_final_2.jpg" alt="Banner 2" className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover" />
          </div>
          <div className="min-w-full flex-none snap-start">
            <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150045/Assets-QXL/legacy-assets/image/about_banner_final_3.png" alt="Banner 3" className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover" />
          </div>
          <div className="min-w-full flex-none snap-start">
            <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150046/Assets-QXL/legacy-assets/image/about_banner_final_4.png" alt="Banner 4" className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover" />
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/90 backdrop-blur-sm text-[#0f2d5e] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/90 backdrop-blur-sm text-[#0f2d5e] p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 pointer-events-none z-10">
          <div className="w-2 h-2 rounded-full bg-white/80"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
      </section>

      {/* ── Precision Diagnostics ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-[#0f2d5e] text-3xl md:text-4xl font-extrabold mb-6">Precision Diagnostics. Expert Interpretation.</h2>
              <p className="text-[#2563eb] text-lg font-bold mb-4">
                QXL Diagnostics, Unit of Qualitify Healthtech Pvt. Ltd., <span className="text-slate-600 font-medium">is a super speciality diagnostic laboratory established to deliver advanced, reliable and clinically meaningful diagnostic answers. We support patients, clinicians, hospitals and healthcare institutions through a wide range of routine, specialty and super-speciality investigations.</span>
              </p>
              <p className="text-slate-600 text-[15px] leading-relaxed font-medium mb-8">
                Our laboratory is equipped for advanced testing including autoimmune panels, India-specific allergen panels, immunofluorescence, immunoblot, ELISA, chemiluminescence, Multiplex PCR with FilmArray for syndrome-based testing, coagulation factor assays, TB PCR by CB NAAT with NTM screening, automated microbiology for infectious diseases, maternal screening, electrophoresis assays, and Histo-Cytopathology with IHC.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="https://maps.app.goo.gl/GYhGxRvN4J4Wm8zJ8?g_st=aw" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#2563eb] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#1e40af] transition-colors shadow-md">
                  <Eye className="w-4 h-4" />
                  Take a Virtual Tour
                </a>
                <a href="https://maps.app.goo.gl/GCW7zkQYoJNdaHNv7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-50 text-[#2563eb] border border-blue-100 px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-100 transition-colors shadow-sm">
                  <MapPin className="w-4 h-4" />
                  View Location
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#e0efff] p-4 md:p-6 rounded-3xl h-[400px] shadow-sm relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1709890456187!6m8!1m7!1sAF1QipOT_E1OvCmLPtbrGMkCFVjybPWfPYcc217TvRyC!2m2!1d12.911377!2d77.4850693!3f193.36!4f0!5f90"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1.5rem' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="shadow-md relative z-10"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Analytical Equipment ── */}
      <section className="py-16 bg-[#f8faff]">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#0f2d5e] text-4xl font-extrabold mb-4">Our Analytical Equipment</h2>
            <div className="w-16 h-1 bg-[#2563eb] mx-auto mb-6 rounded-full"></div>
            <p className="text-slate-600 max-w-2xl mx-auto font-medium text-lg">Equipped with state-of-the-art analytical instruments that ensure precision, accuracy, and efficiency in all our diagnostic processes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="rounded-3xl overflow-hidden shadow-sm h-[350px]">
              <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150168/Assets-QXL/legacy-assets/image/equipment_1.jpg" alt="Lab Technician operating equipment" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-sm h-[350px]">
              <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150172/Assets-QXL/legacy-assets/image/equipment_2.png" alt="Analytical Equipment in use" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              { title: "DXI 9000 Analyzer", desc: "High-throughput clinical chemistry analyzer renowned for accuracy in biochemical parameter analysis. Designed for high-volume operations with rapid turnaround and precision reporting." },
              { title: "IMMULITE 2000", desc: "Advanced immunoassay analyzer for comprehensive hormone profiling, tumor marker testing, infectious disease serology, and allergy-related biomarker detection with exceptional sensitivity." },
              { title: "VITEK System", desc: "Automated microbial identification and antimicrobial susceptibility testing system. Provides rapid identification of bacterial and fungal pathogens to support targeted antimicrobial therapy." },
              { title: "BACT/ALERT", desc: "Automated blood culture system for early detection of microbial growth. Critical for rapid diagnosis of bloodstream infections and sepsis with continuous monitoring capability." },
              { title: "PHADIATOP / Allergy Testing", desc: "Advanced in vitro allergy testing platform detecting specific IgE antibodies to common allergens including India-specific food and environmental panels for personalised allergy management." },
              { title: "FTIR Spectroscopy", desc: "Fourier Transform Infrared Spectroscopy for precise chemical compound characterisation. Used for kidney stone composition analysis, drug identification, and biomarker profiling." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-[#2563eb]" />
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-[14px] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-[900px] mx-auto mb-16">
            <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-6">What We Offer</h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              At QXL Diagnostics, we believe the future of diagnostics is not only about performing more tests, but about delivering better answers through clinical context, expert review, technology and precision. Our services range from routine blood investigations to advanced specialty panels in oncology, autoimmune diseases, molecular diagnostics, reproductive health, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <Target className="w-8 h-8 text-[#2563eb]" />, title: "AI-Powered Diagnostic Intelligence", desc: "Our laboratory processes combine advanced analytical platforms with clinician-reviewed interpretations, supporting clinicians in moving from test results to clinically meaningful answers." },
              { icon: <MapPin className="w-8 h-8 text-[#2563eb]" />, title: "Home Sample Collection Across Bengaluru", desc: "Trained phlebotomists visit your home or clinic at your convenience. Hygienic, safe, and professional sample collection with digital report delivery." },
              { icon: <ShieldCheck className="w-8 h-8 text-[#2563eb]" />, title: "Expert-Reviewed Reports", desc: "Every report is reviewed by our experienced team of pathologists, microbiologists and biochemists before release — ensuring accuracy you can trust." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-[#f8faff] p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-extrabold text-[#0f2d5e] text-xl mb-4">{feature.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#0d2e42] text-white p-10 md:p-14 rounded-3xl text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563eb]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2563eb]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl font-extrabold mb-6 relative z-10">Experience the QXL Diagnostics Advantage</h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-4xl mx-auto mb-8 relative z-10">
              Precision diagnostics in Bengaluru — advanced super speciality testing with home sample collection, same-day reports, and consultant-reviewed results. QXL Diagnostics is committed to delivering the highest standard of diagnostic care to patients and healthcare professionals.
            </p>
            <p className="text-white font-bold text-xl relative z-10">
              Explore our services today and discover the QXL difference — where innovation meets care.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quality (Accreditations) ── */}
      <Accreditations />

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── Contact ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Get in Touch</h2>
            <p className="text-slate-500 text-sm font-medium">We are here to assist you with all your diagnostic needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
             <div className="bg-[#f8faff] p-8 rounded-2xl border border-blue-50 flex flex-col items-center text-center">
               <div className="bg-[#2563eb] p-4 rounded-full mb-4 shadow-md"><MapPin className="text-white w-6 h-6" /></div>
               <h4 className="text-[#0f2d5e] font-bold mb-2">Location</h4>
               <p className="text-slate-500 text-sm">3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060</p>
             </div>
             <div className="bg-[#f8faff] p-8 rounded-2xl border border-blue-50 flex flex-col items-center text-center">
               <div className="bg-[#2563eb] p-4 rounded-full mb-4 shadow-md"><Mail className="text-white w-6 h-6" /></div>
               <h4 className="text-[#0f2d5e] font-bold mb-2">Email</h4>
               <p className="text-slate-500 text-sm">qxldiagnostics@gmail.com</p>
             </div>
             <div className="bg-[#f8faff] p-8 rounded-2xl border border-blue-50 flex flex-col items-center text-center">
               <div className="bg-[#2563eb] p-4 rounded-full mb-4 shadow-md"><Phone className="text-white w-6 h-6" /></div>
               <h4 className="text-[#0f2d5e] font-bold mb-2">Phone</h4>
               <p className="text-slate-500 text-sm">+91 9964 639639</p>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
