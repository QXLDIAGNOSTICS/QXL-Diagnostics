"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Cpu, ShieldCheck, Activity, Award, CheckCircle } from 'lucide-react';
import { NABL_CERTIFICATE } from '@/lib/businessInfo';

interface LabImage {
  id: number;
  src: string;
  title: string;
  department: string;
  techSpec: string;
  description: string;
}

const LAB_IMAGES: LabImage[] = [
  {
    id: 1,
    src: '/images/about-lab/lab-1.jpg',
    title: 'Automated Clinical Chemistry & Immunoassay Hub',
    department: 'Clinical Biochemistry',
    techSpec: 'Integrated Roche Cobas & Mindray Systems',
    description: 'High-throughput automated analyzers with internal quality control for liver, kidney, lipid, and metabolic panels.'
  },
  {
    id: 2,
    src: '/images/about-lab/lab-2.jpg',
    title: 'Advanced Haematology & Cell Analysis Station',
    department: 'Haematology',
    techSpec: 'Automated 5-Part Differential Analyzer',
    description: 'Precision cellular analysis for CBC, platelet parameters, absolute counts, and abnormal blood cell flagging.'
  },
  {
    id: 3,
    src: '/images/about-lab/lab-3.jpg',
    title: 'Molecular Diagnostics & Real-Time PCR Unit',
    department: 'Molecular Diagnostics',
    techSpec: 'Multiplex PCR & Viral Load Platform',
    description: 'Syndrome-based nucleic acid amplification testing for infectious diseases, TB CBNAAT, and viral markers.'
  },
  {
    id: 4,
    src: '/images/about-lab/lab-4.jpg',
    title: 'Chemiluminescence Immunoassay (CLIA) Suite',
    department: 'Endocrinology & Immunology',
    techSpec: 'Calibrated Chemiluminescent Assays',
    description: 'Ultra-sensitive evaluation of thyroid hormones (TSH, Free T3/T4), Vitamin D, B12, and reproductive hormones.'
  },
  {
    id: 5,
    src: '/images/about-lab/lab-5.jpg',
    title: 'Histopathology & Microtomy Workstation',
    department: 'Histo-Cytopathology',
    techSpec: 'Precision Tissue Processing & IHC',
    description: 'Specialised tissue sectioning, routine H&E staining, and immunohistochemistry for oncological diagnostics.'
  },
  {
    id: 6,
    src: '/images/about-lab/lab-6.jpg',
    title: 'HPLC Glycated Haemoglobin (HbA1c) Testing',
    department: 'Diabetology & Metabolism',
    techSpec: 'Ion-Exchange High Performance Liquid Chromatography',
    description: 'Gold-standard HbA1c testing for precise 3-month blood glucose evaluation and variant detection.'
  },
  {
    id: 7,
    src: '/images/about-lab/lab-7.jpg',
    title: 'Autoimmune & Allergy Testing Workstation',
    department: 'Speciality Immunology',
    techSpec: 'ANA IFA & Immunoblot Systems',
    description: 'Comprehensive screening for autoimmune disorders, ANA patterns, ENA profiles, and food/respiratory allergy panels.'
  },
  {
    id: 8,
    src: '/images/about-lab/lab-8.jpg',
    title: 'Automated Microbiology & Sensitivity Incubators',
    department: 'Clinical Microbiology',
    techSpec: 'Automated Blood Culture & ID/AST',
    description: 'Fast identification of bacterial pathogens and antimicrobial susceptibility profiling under specialist supervision.'
  },
  {
    id: 9,
    src: '/images/about-lab/lab-9.jpg',
    title: 'Cold-Chain Sample Reception & Verification',
    department: 'Pre-Analytical Logistics',
    techSpec: 'Temperature-Monitored Transport Logistics',
    description: 'Rigorous sample accessioning, barcode verification, and temperature check prior to laboratory processing.'
  },
  {
    id: 10,
    src: '/images/about-lab/lab-10.jpg',
    title: 'Internal Quality Control (IQC) Monitoring Station',
    department: 'Quality Governance',
    techSpec: 'Daily Multi-Rule Westgard IQC',
    description: 'Real-time calibration tracking and inter-laboratory quality assurance ensuring error-free report generation.'
  },
  {
    id: 11,
    src: '/images/about-lab/lab-11.jpg',
    title: 'Sterile Phlebotomy & Specimen Processing Bay',
    department: 'Pre-Analytical Processing',
    techSpec: 'Sterile Single-Use Collection Protocol',
    description: 'Hygienic specimen preparation, centrifugation, and serum separation under strict safety protocols.'
  },
  {
    id: 12,
    src: '/images/about-lab/lab-12.jpg',
    title: 'Pathologist Microscopy & Biopsy Review Bench',
    department: 'Clinical Verification',
    techSpec: 'High-Resolution Research Microscopy',
    description: 'Direct microscopic review of peripheral blood smears, bone marrow, and tissue biopsies by senior pathologists.'
  },
  {
    id: 13,
    src: '/images/about-lab/lab-13.jpg',
    title: 'Coagulation & Haemostasis Testing Suite',
    department: 'Speciality Haematology',
    techSpec: 'Automated Coagulation Analyzer',
    description: 'PT/INR, APTT, D-Dimer, and fibrinogen quantification for clotting status and thrombophilia evaluation.'
  },
  {
    id: 14,
    src: '/images/about-lab/lab-14.jpg',
    title: 'Reagent Storage & Cold Chain Stability Units',
    department: 'Laboratory Operations',
    techSpec: '2°C–8°C Temperature Logged Storage',
    description: 'Automated temperature logging for reagents and controls to guarantee analytical validity.'
  },
  {
    id: 15,
    src: '/images/about-lab/lab-15.jpg',
    title: 'Pathology Authorization & Tele-Diagnostics Console',
    department: 'Post-Analytical Governance',
    techSpec: 'LIS Integrated Digital Sign-Off',
    description: 'Final multi-stage verification and digital report authorization by MD Pathologists and Biochemists.'
  }
];

export default function LabGallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<LabImage | null>(null);
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const departments = ['All', 'Clinical Biochemistry', 'Haematology', 'Molecular Diagnostics', 'Histo-Cytopathology', 'Quality Governance'];

  const filteredImages = filterDepartment === 'All' 
    ? LAB_IMAGES 
    : LAB_IMAGES.filter(img => img.department.toLowerCase().includes(filterDepartment.toLowerCase()));

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % LAB_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + LAB_IMAGES.length) % LAB_IMAGES.length);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  const currentLab = LAB_IMAGES[currentIndex];

  return (
    <section className="py-12 bg-slate-900 text-white overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1260px] mx-auto px-4 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
            <Cpu className="w-4 h-4 text-amber-400" />
            Active Infrastructure & Technology Showcase
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Inside Our Super Speciality Reference Laboratory
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
            Take a virtual tour through QXL Diagnostics&apos; NABL-accredited reference facility (Certificate {NABL_CERTIFICATE}) in Kengeri, Bengaluru. Real photographs of our actual analytical equipment, cleanrooms, and medical workstations.
          </p>
        </div>

        {/* Featured Interactive Showcase Slider */}
        <div 
          className="bg-slate-800/80 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-sm items-stretch max-w-[1020px] mx-auto"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Main Visual Display */}
          <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full w-full bg-slate-950 group overflow-hidden">
            <img 
              src={currentLab.src} 
              alt={currentLab.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            {/* Quick Expand Button */}
            <button 
              onClick={() => setSelectedImage(currentLab)}
              className="absolute top-3 right-3 bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white p-2 rounded-full border border-slate-700 transition-all cursor-pointer shadow-lg z-10"
              title="View full resolution photo"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Navigation Overlay Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white p-2.5 rounded-full border border-slate-700 transition-all cursor-pointer opacity-90 group-hover:opacity-100 z-10"
              aria-label="Previous lab photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button 
              onClick={nextSlide}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white p-2.5 rounded-full border border-slate-700 transition-all cursor-pointer opacity-90 group-hover:opacity-100 z-10"
              aria-label="Next lab photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Mobile Caption Overlay */}
            <div className="absolute bottom-3 left-3 right-3 lg:hidden z-10">
              <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider block mb-0.5">
                {currentLab.department}
              </span>
              <h3 className="text-xs font-bold text-white leading-snug truncate">
                {currentLab.title}
              </h3>
            </div>
          </div>

          {/* Detailed Info Panel */}
          <div className="lg:col-span-6 p-5 lg:p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {currentLab.department}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> NABL Scope
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                {currentLab.title}
              </h3>

              <div className="bg-slate-900/90 border border-slate-700/60 p-2.5 rounded-xl space-y-0.5">
                <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider block">Equipment & Methodology</span>
                <p className="text-xs text-slate-200 font-bold leading-snug">{currentLab.techSpec}</p>
              </div>

              <p className="text-slate-300 text-xs font-medium leading-relaxed line-clamp-2">
                {currentLab.description}
              </p>

              <div className="pt-1 grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="flex items-center gap-1 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>ISO 15189:2022</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Daily IQC Control</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Pathologist Sign-Off</span>
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <CheckCircle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Barcode Tracking</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Bar */}
            <div className="pt-3 border-t border-slate-700/60">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quick Select Photo</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                {LAB_IMAGES.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      currentIndex === idx ? 'border-amber-400 scale-105 shadow-md shadow-amber-400/20' : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100000] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl text-white space-y-0">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-amber-400 hover:text-slate-950 text-white p-2.5 rounded-full transition-all border border-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-[320px] sm:h-[480px] w-full bg-slate-950 relative">
              <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-full object-contain" />
            </div>

            <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
                  {selectedImage.department}
                </span>
                <span className="text-xs text-slate-400 font-semibold">QXL Super Speciality Lab • Kengeri, Bengaluru</span>
              </div>
              <h3 className="text-xl font-black text-white">{selectedImage.title}</h3>
              <p className="text-xs font-bold text-amber-400">{selectedImage.techSpec}</p>
              <p className="text-slate-300 text-xs sm:text-sm font-medium">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
