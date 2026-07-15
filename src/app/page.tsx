"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, FileText, Phone, MessageCircle, Droplet, Activity, Heart, Shield, Star, Users, Microscope, CheckCircle, Award, Clock, MapPin } from "lucide-react";
import PrescriptionModal from "../components/PrescriptionModal";
import { cmsStore } from '../lib/cmsStore';
import BlogSlider from "../components/BlogSlider";
import AiDiagnostics from "../components/AiDiagnostics";
import HomeCollectionSection from "../components/HomeCollectionSection";
import Accreditations from "../components/Accreditations";
import FaqSection from "../components/FaqSection";
import ReviewsSection from "../components/ReviewsSection";

// ── Why Choose QXL — 10 Specialty Slides ─────────────────────────────────────
const whySlides = [
  {
    specialty: "BONE DISORDERS",
    titlePlain: "Bone Disorders",
    titleAccent: "Panel",
    highlight: "Calcium · Phosphorus · Vitamin D · ALP",
    sub: "Detect osteoporosis, fracture risk, and bone density issues early with a targeted bone health assessment.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150385/Assets-QXL/legacy-assets/image/slide_vitamin_bone_new.jpg",
    imgBg: "#E8F5E9",
  },
  {
    specialty: "CARDIOLOGY",
    titlePlain: "Cardiology",
    titleAccent: "Heart Risk Assessment",
    highlight: "Lipids · hs-CRP · NT-proBNP · Homocysteine",
    sub: "Comprehensive cardiac risk profiling — covering lipid disorders, inflammation markers, and heart stress indicators.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150215/Assets-QXL/legacy-assets/image/nurse_bp_check.png",
    imgBg: "#E3F2FD",
  },
  {
    specialty: "ENDOCRINOLOGY",
    titlePlain: "Endocrinology",
    titleAccent: "Hormone & Thyroid Panel",
    highlight: "TSH · T3 · T4 · Cortisol · Insulin",
    sub: "Full hormonal mapping including thyroid, adrenal, and metabolic hormones — essential for energy and wellness.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150380/Assets-QXL/legacy-assets/image/slide_thyroid_test.jpg",
    imgBg: "#E8EAF6",
  },
  {
    specialty: "GASTROENTEROLOGY",
    titlePlain: "Gastroenterology",
    titleAccent: "Gut & Liver Panel",
    highlight: "H.pylori · Liver Function · Calprotectin",
    sub: "Identify digestive disorders, liver disease, gut infections, and inflammation from a single comprehensive profile.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150203/Assets-QXL/legacy-assets/image/gastro_consult.png",
    imgBg: "#FFF8E1",
  },
  {
    specialty: "HEMATOLOGY",
    titlePlain: "Hematology",
    titleAccent: "Complete Blood Analysis",
    highlight: "CBC · ESR · Iron Studies · Peripheral Smear",
    sub: "Detect anaemia, blood cell disorders, clotting abnormalities, and infection through a detailed blood workup.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150239/Assets-QXL/legacy-assets/image/slide_blood_test.jpg",
    imgBg: "#FCE4EC",
  },
  {
    specialty: "INFECTIOUS DISEASES",
    titlePlain: "Infectious Diseases",
    titleAccent: "Immunity & Infection Panel",
    highlight: "Fever Panel · Dengue · Typhoid · Covid · HIV",
    sub: "From common viral fever to complex infections — early identification for fast, targeted treatment.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150328/Assets-QXL/legacy-assets/image/slide_immunity_test_new.jpg",
    imgBg: "#E0F7FA",
  },
  {
    specialty: "ONCOLOGY",
    titlePlain: "Oncology",
    titleAccent: "Cancer Marker Screening",
    highlight: "AFP · CEA · PSA · CA-125 · CA-19.9",
    sub: "Early cancer marker screening across multiple organs — giving you the best chance for timely intervention.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150119/Assets-QXL/legacy-assets/image/doctor_patient_consult.jpg",
    imgBg: "#EDE7F6",
  },
  {
    specialty: "NEUROLOGY",
    titlePlain: "Neurology",
    titleAccent: "Brain & Nerve Health",
    highlight: "Homocysteine · B12 · Thyroid · Vitamin D",
    sub: "Nutritional and metabolic factors that drive neurological disorders — identified and addressed proactively.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150236/Assets-QXL/legacy-assets/image/senior_bp_check.png",
    imgBg: "#E8F5E9",
  },
  {
    specialty: "UROLOGY",
    titlePlain: "Urology",
    titleAccent: "Kidney & Urinary Panel",
    highlight: "Creatinine · Urea · BUN · Urine Microscopy",
    sub: "Monitor kidney function, detect urinary tract infections, and assess renal health through precise biomarkers.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150124/Assets-QXL/legacy-assets/image/doctor_smiling.png",
    imgBg: "#E3F2FD",
  },
  {
    specialty: "WOMEN'S HEALTH",
    titlePlain: "Women's Health",
    titleAccent: "Complete Wellness Panel",
    highlight: "FSH · LH · AMH · Thyroid · CBC · Vit D",
    sub: "From fertility and hormonal health to thyroid and nutrition — a dedicated panel designed for every woman's body.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150185/Assets-QXL/legacy-assets/image/female_doctor_consult.jpg",
    imgBg: "#FCE4EC",
  },
];

function WhyChooseSlider() {
  const [active, setActive] = useState(0);
  const prev = () => setActive(p => (p - 1 + whySlides.length) % whySlides.length);
  const next = () => setActive(p => (p + 1) % whySlides.length);
  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
   
  }, []);
  const slide = whySlides[active];
  return (
    <section className="py-10 bg-[#f0f6ff] border-t border-blue-100">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        {/* Heading */}
        <div className="text-center mb-7">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">Our Specialities</span>
          <h2 className="text-[#0f2d5e] text-2xl md:text-3xl font-extrabold mb-1">The QXL Difference</h2>
          <p className="text-slate-500 text-sm font-medium">Excellence in every test, care in every result.</p>
          <div className="w-14 h-1 bg-[#2563eb] mx-auto rounded-full mt-3" />
        </div>

        {/* Slide Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-white flex flex-row" style={{ minHeight: 220 }}>
          {/* Left arrow — always on the far left edge of the card */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-[#2563eb] hover:text-white transition-all group"
          >
            <ChevronRight className="w-4 h-4 rotate-180 text-slate-500 group-hover:text-white" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col justify-center pl-16 pr-6 py-8 bg-[#f7faff] text-left"
            >
              <span className="inline-block bg-[#2563eb]/10 text-[#2563eb] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2 w-fit">
                {slide.specialty}
              </span>
              <h3 className="text-[20px] md:text-[26px] font-extrabold text-[#0d2e42] leading-tight mb-0.5">
                {slide.titlePlain}{" "}<span className="text-[#2563eb]">{slide.titleAccent}</span>
              </h3>
              <p className="text-[#2563eb] font-bold text-[12px] md:text-[13px] mb-2">{slide.highlight}</p>
              <p className="text-[#555] text-[13px] md:text-[14px] font-medium leading-relaxed mb-5 max-w-sm">{slide.sub}</p>
              <Link
                href="/book"
                className="inline-block bg-[#2563eb] text-white font-bold px-6 py-2.5 rounded-full text-[13px] hover:bg-[#1d4ed8] transition-all w-fit shadow-sm"
              >
                Book Now →
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right Image Panel */}
          <div
            className="w-[38%] md:w-[40%] flex-shrink-0 relative overflow-hidden rounded-r-2xl bg-white/10"
            style={{ minHeight: 220 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: slide.imgBg }}
              >
                <Image
                  src={slide.image}
                  alt={slide.specialty}
                  fill
                  sizes="(max-width:768px) 38vw, 480px"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow — on the boundary between text and image */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-[#2563eb] hover:text-white transition-all group"
          >
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {whySlides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-[#2563eb]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



// ── Promo: QXL Packages Slider — Desktop ──────────────────────────────────────
const promoSlides = [
  {
    name: "Quick Fit Package",
    price: "₹1,770",
    original: "₹4,696",
    tag: "POPULAR",
    desc: "A fast, comprehensive metabolic & organ function panel covering blood sugar, lipids, liver, kidney, thyroid and more.",
    includes: ["FBS, HbA1c, eAG, Insulin, HOMA IR", "Lipid Profile, Liver & Kidney Function", "TSH, Vitamin D, CBC, ESR", "Urine Routine & Microscopy"],
    tests: "16+ Tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150179/Assets-QXL/legacy-assets/image/family_clinic_consult.jpg",
    imgBg: "#E3F2FD",
    ctaLink: "/packages",
  },
  {
    name: "Q-Screen Diabetes Package",
    price: "₹1,900",
    original: "₹4,960",
    tag: "DIABETES CARE",
    desc: "Advanced diabetes monitoring with kidney microalbumin, C-Peptide, and comprehensive metabolic markers.",
    includes: ["FBS, HbA1c, eAG, C-Peptide", "Urine Microalbumin, Protein/Creatinine", "Lipid Profile, Liver & Kidney Function", "TSH, CBC, ESR, Urine Routine"],
    tests: "18+ Tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150207/Assets-QXL/legacy-assets/image/home_blood_draw.jpg",
    imgBg: "#E8F5E9",
    ctaLink: "/packages",
  },
  {
    name: "Q-Master Health Pro",
    price: "₹4,600",
    original: "₹9,600",
    tag: "BEST SELLER",
    desc: "Our premium all-in-one health package covering metabolic, cardiac, hormonal, nutritional and inflammatory markers.",
    includes: ["FBS, HbA1c, Lipid + Apo Panel", "Full Thyroid (T3, T4, TSH), Vit D & B12", "Kidney Screen (7 markers), LFT", "H.pylori IgG, hs-CRP, CBC, ESR"],
    tests: "25+ Tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150209/Assets-QXL/legacy-assets/image/medical_team_group.jpg",
    imgBg: "#EDE7F6",
    ctaLink: "/packages",
  },
  {
    name: "Q-Oncoscreen Package",
    price: "₹7,900",
    original: "₹13,600",
    tag: "CANCER SCREENING",
    desc: "Comprehensive cancer marker panel for early detection across multiple organs, plus blood and stool analysis.",
    includes: ["AFP, CEA, Beta HCG, PSA (Male)", "CA-125 (Female), CA-19.9", "CBC, ESR, Urine Routine", "Calprotectin, FOBT, Protein Electrophoresis"],
    tests: "12+ Markers",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150119/Assets-QXL/legacy-assets/image/doctor_patient_consult.jpg",
    imgBg: "#E8EAF6",
    ctaLink: "/packages",
  },
  {
    name: "Q-Arthritis & Autoimmune Panel",
    price: "₹6,900",
    original: "₹12,660",
    tag: "AUTOIMMUNE",
    desc: "Targets arthritis, autoimmune and hormonal markers — comprehensive joint and immune function assessment.",
    includes: ["RF, Anti-CCP, ANA Autoimmune Tests", "Bone Health: Calcium, Phosphorus, Vit D", "Iron Studies, Thyroid, DHEA-S, Cortisol", "Lipid, LFT, KFT, CBC, ESR"],
    tests: "30+ Tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150166/Assets-QXL/legacy-assets/image/elderly_bp_check.jpg",
    imgBg: "#E3F2FD",
    ctaLink: "/packages",
  },
  {
    name: "Q-Hypertension & Cardiac Risk",
    price: "₹9,000",
    original: "₹18,900",
    tag: "CARDIAC CARE",
    desc: "Advanced cardiovascular risk profiling with inflammation, clotting, heart stress and metabolic biomarkers.",
    includes: ["Lipid + Apo Panel, Lipoprotein(a), hs-CRP", "Fibrinogen, Homocysteine, NT-proBNP", "Kidney Screen, Thyroid (T3, T4, TSH)", "Cortisol, Magnesium, Insulin, CBC"],
    tests: "22+ Tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150119/Assets-QXL/legacy-assets/image/doctor_patient_consult.jpg",
    imgBg: "#E8F5E9",
    ctaLink: "/packages",
  },
];

function PromoHighlightSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % promoSlides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const slide = promoSlides[active];
  const prev2 = () => setActive(p => (p - 1 + promoSlides.length) % promoSlides.length);
  const next2 = () => setActive(p => (p + 1) % promoSlides.length);
  return (
    <section className="py-10 bg-white border-t border-blue-100">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        {/* Heading */}
        <div className="text-center mb-7">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">Our Packages</span>
          <h2 className="text-[#0f2d5e] text-2xl md:text-3xl font-extrabold mb-1">Featured Packages & Offers</h2>
          <p className="text-slate-500 text-sm font-medium">Trusted diagnostics at unbeatable value — book today.</p>
          <div className="w-14 h-1 bg-[#2563eb] mx-auto rounded-full mt-3" />
        </div>

        {/* Package Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-white flex flex-row border border-blue-50 hover:shadow-lg transition-shadow duration-300" style={{ minHeight: 210 }}>
          {/* Left arrow */}
          <button onClick={prev2} aria-label="Previous package"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-[#2563eb] hover:text-white transition-all group">
            <ChevronRight className="w-4 h-4 rotate-180 text-slate-500 group-hover:text-white" />
          </button>

          {/* Left: Package Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col justify-center pl-16 pr-6 py-8 bg-[#f7faff]"
            >
              {/* Tag + Tests count */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-[#2563eb] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full tracking-widest uppercase shadow-sm">
                  {slide.tag}
                </span>
                <span className="inline-block bg-blue-50 text-[#2563eb] text-[9px] font-bold px-2.5 py-1 rounded-full border border-blue-200">
                  {slide.tests}
                </span>
              </div>
              {/* Package name */}
              <h3 className="text-[18px] md:text-[22px] font-extrabold text-[#0d2e42] leading-tight mb-2">{slide.name}</h3>
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[#2563eb] font-extrabold text-[22px] md:text-[26px]">{slide.price}</span>
                <span className="text-gray-400 text-[13px] line-through font-medium">{slide.original}</span>
                <span className="text-[10px] text-green-600 font-bold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">Save {Math.round((1 - parseInt(slide.price.replace(/[^\d]/g,'')) / parseInt(slide.original.replace(/[^\d]/g,''))) * 100)}%</span>
              </div>
              {/* Description */}
              <p className="text-[12px] md:text-[13px] text-[#555] font-medium mb-3 max-w-sm leading-relaxed">{slide.desc}</p>
              {/* Includes list */}
              <div className="flex flex-col gap-1 mb-5">
                {slide.includes.map((inc, idx) => (
                  <span key={idx} className="flex items-start gap-1.5 text-[11px] text-[#444] font-medium">
                    <CheckCircle className="w-3 h-3 text-[#2563eb] flex-shrink-0 mt-0.5" />
                    {inc}
                  </span>
                ))}
              </div>
              {/* CTA */}
              <Link href={slide.ctaLink}
                className="inline-block bg-[#2563eb] text-white font-bold px-7 py-2.5 rounded-full shadow-md hover:bg-[#1d4ed8] transition-all text-sm w-fit">
                Book Now →
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right: Image Panel */}
          <div
            className="w-[36%] md:w-[38%] flex-shrink-0 relative overflow-hidden rounded-r-2xl"
            style={{ backgroundColor: slide.imgBg, minHeight: 210 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={slide.image}
                  alt={slide.name}
                  fill
                  sizes="(max-width:768px) 36vw, 460px"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button onClick={next2} aria-label="Next package"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-[#2563eb] hover:text-white transition-all group">
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-1.5 mt-4">
          {promoSlides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-[#2563eb]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Mobile: Why Choose QXL Specialty Slides ──────────────────────────────────
function MobileWhyChooseSlider() {
  const [active, setActive] = useState(0);
  const prev = () => setActive(p => (p - 1 + whySlides.length) % whySlides.length);
  const next = () => setActive(p => (p + 1) % whySlides.length);
  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
   
  }, []);
  const slide = whySlides[active];
  return (
    <section className="py-5 bg-[#f0f6ff] border-t border-blue-100">
      <div className="px-4 mb-3">
        <p className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Our Specialities</p>
        <h2 className="text-[#0d2e42] font-extrabold text-base">The QXL Difference</h2>
      </div>
      <div className="mx-4 rounded-2xl overflow-hidden shadow-md bg-white flex flex-row min-h-[145px] relative">
        {/* Arrows */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center">
          <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center pl-9 pr-3 py-4 bg-[#f7faff] text-left"
          >
            <span className="inline-block bg-[#2563eb]/10 text-[#2563eb] text-[7px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest mb-1 w-fit">{slide.specialty}</span>
            <h3 className="text-[12px] font-extrabold text-[#0d2e42] leading-tight mb-0.5">
              {slide.titlePlain} <span className="text-[#2563eb]">{slide.titleAccent}</span>
            </h3>
            <p className="text-[#2563eb] font-bold text-[9px] mb-1">{slide.highlight}</p>
            <p className="text-[10px] text-[#555] font-medium mb-3 leading-snug">{slide.sub}</p>
            <Link href="/book" className="inline-block bg-[#2563eb] text-white font-bold px-3 py-1.5 rounded-full text-[10px] w-fit shadow-sm active:scale-95 transition-transform">
              Book Now →
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Right image */}
        <div className="w-[110px] flex-shrink-0 relative overflow-hidden bg-white/10" style={{ minHeight: '145px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: slide.imgBg }}
            >
              <Image
                src={slide.image}
                alt={slide.specialty}
                fill
                sizes="110px"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center">
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {whySlides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-5 bg-[#2563eb]' : 'w-1.5 bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
}



// ── Mobile: QXL Packages Slider ─────────────────────────────────────────────
function MobilePromoHighlightSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % promoSlides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const slide = promoSlides[active];
  return (
    <section className="py-5 bg-white border-t border-blue-100">
      <div className="px-4 mb-3">
        <p className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Our Packages</p>
        <h2 className="text-[#0d2e42] font-extrabold text-base">Featured Packages</h2>
      </div>
      <div className="mx-4 rounded-2xl overflow-hidden shadow-md bg-white flex flex-row min-h-[155px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center px-4 py-4 bg-[#f7faff] text-left"
          >
            <span className="inline-block bg-[#2563eb] text-white text-[7px] font-extrabold px-1.5 py-0.5 rounded-full tracking-widest uppercase mb-1.5 w-fit">{slide.tag}</span>
            <h3 className="text-[12px] font-extrabold text-[#0d2e42] leading-tight mb-0.5">{slide.name}</h3>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[#2563eb] font-extrabold text-[15px]">{slide.price}</span>
              <span className="text-gray-400 text-[10px] line-through">{slide.original}</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {slide.includes.slice(0, 2).map(h => (
                <span key={h} className="text-[8px] bg-blue-50 text-[#2563eb] font-semibold px-2 py-0.5 rounded-full border border-blue-100 leading-tight">{h}</span>
              ))}
            </div>
            <Link href={slide.ctaLink} className="inline-block bg-[#2563eb] text-white font-bold px-3 py-1.5 rounded-full text-[10px] mt-1 w-fit shadow-sm active:scale-95 transition-transform">
              Book Now →
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Right image */}
        <div className="w-[110px] flex-shrink-0 relative overflow-hidden bg-white/10" style={{ minHeight: '155px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: slide.imgBg }}
            >
              <Image src={slide.image} alt={slide.name} fill sizes="110px" className="object-cover object-center" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {promoSlides.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-5 bg-[#2563eb]' : 'w-1.5 bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
}




export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState("Bengaluru");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [recommendedPackages, setRecommendedPackages] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('qxl_location');
    if (saved) setLocation(saved);
    
    const handleLoc = (e: any) => setLocation(e.detail);
    window.addEventListener('locationChange', handleLoc);
    
    // Load dynamic locations for map rendering
    setLocations(cmsStore.getAll("locations"));
    setRecommendedPackages(cmsStore.getAll("packages"));
    
    return () => window.removeEventListener('locationChange', handleLoc);
  }, []);

  // Find selected location details
  const activeLocationObj = locations.find(loc => loc.name === location || loc.city === location);
  const mapSrc = activeLocationObj && activeLocationObj.lat && activeLocationObj.lng
    ? `https://maps.google.com/maps?q=${activeLocationObj.lat},${activeLocationObj.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(location + " Diagnostics")}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const slides = [
    {
      imageOnly: false,
      badge: "FRANCHISE OPPORTUNITY",
      title: "Own a Franchise or Collaborate with",
      titleAccent: "India's Leading Diagnostics Brand",
      subtitle: "Partner with QXL Diagnostics and build a successful business",
      subtitleAccent: "in the rapidly growing healthcare sector.",
      description: "Join our network of diagnostic centers and benefit from our established brand, state-of-the-art technology, and comprehensive support system.",
      cta: "Enquire Now",
      ctaLink: "/franchise",
      ctaSecondary: "Contact Us",
      ctaSecondaryLink: "/contact",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150478/Assets-QXL/legacy-assets/image/user_male_professional.jpg",
      imageFit: "cover",
      bgFrom: "#f0fdf4",
      bgTo: "#dcfce7",
      features: ["Proven Business Model", "Marketing Support", "Technical Training", "High ROI"]
    },
    {
      badge: "SUPER SPECIALITY DIAGNOSTICS",
      title: "DOCTOR DRIVEN SUPER SPECIALITY",
      titleAccent: "DIAGNOSTICS LAB IN BENGALURU",
      subtitle: "Advanced pathology, microbiology, molecular diagnostics,",
      subtitleAccent: "histopathology & precision testing — expert-reviewed reports",
      description: "QXL Diagnostics delivers clinically meaningful diagnostic answers through advanced super speciality testing, home sample collection across Bengaluru, and consultant-reviewed reports.",
      cta: "Book a Test",
      ctaLink: "/book",
      ctaSecondary: "Our Specialities",
      ctaSecondaryLink: "/speciality-tests",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150476/Assets-QXL/legacy-assets/image/user_female_microscope.jpg",
      imageFit: "cover",
      bgFrom: "#eff6ff",
      bgTo: "#dbeafe",
      features: ["NABL Certified", "Expert-Reviewed Reports", "AI-Assisted Diagnostics", "Home Collection"],
    },
    {
      badge: "AI TECHNOLOGY",
      title: "AI-POWERED SUPER SPECIALITY",
      titleAccent: "DIAGNOSTICS LAB IN BENGALURU",
      subtitle: "Unmatched precision and speed in diagnostic testing,",
      subtitleAccent: "driven by cutting-edge artificial intelligence.",
      description: "Experience the next generation of healthcare with AI-assisted diagnostics, ensuring faster turnaround times and superior accuracy for complex tests.",
      cta: "Book a Test",
      ctaLink: "/book",
      ctaSecondary: "Our Specialities",
      ctaSecondaryLink: "/specialities",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150124/Assets-QXL/legacy-assets/image/doctor_smiling.png",
      imageFit: "cover",
      bgFrom: "#eff6ff",
      bgTo: "#dbeafe",
      features: ["AI Precision", "Faster Results", "Advanced Technology", "NABL Certified"]
    },
    {
      badge: "FAMILY CARE",
      title: "Double the Care",
      titleAccent: "Double the Savings",
      subtitle: "Full Body Comprehensive Health Check-up",
      subtitleAccent: "1+1 FAMILY OFFER",
      description: "Get comprehensive insights for two people for the price of one. 86+ Parameters included.",
      cta: "Book Now",
      ctaLink: "/book",
      ctaSecondary: "Learn More",
      ctaSecondaryLink: "/packages",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150179/Assets-QXL/legacy-assets/image/family_clinic_consult.jpg",
      imageFit: "cover",
      bgFrom: "#f0f9ff",
      bgTo: "#e0f2fe",
      features: ["86+ Tests", "1+1 Offer", "Save 50%", "Home Collection"],
    },
    {
      badge: "EXECUTIVE SCREENING",
      title: "QXL SUPER SPECIALITY",
      titleAccent: "HEALTH SCREENING PACKAGE",
      subtitle: "TOTAL TESTS 317",
      subtitleAccent: "AT JUST ₹7999",
      description: "Advanced diagnostic package tailored for busy professionals. Comprehensive screening to keep you at peak performance.",
      cta: "Book Now »",
      ctaLink: "/book",
      ctaSecondary: "View Package",
      ctaSecondaryLink: "/packages",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150119/Assets-QXL/legacy-assets/image/doctor_patient_consult.jpg",
      imageFit: "cover",
      bgFrom: "#dbeafe",
      bgTo: "#eff6ff",
      features: ["317 Tests", "₹7999 Only", "Priority Service"],
    },
    {
      badge: "PARTNER WITH US",
      title: "You too can",
      titleAccent: "Collaborate with us",
      subtitle: "Join as a partner of",
      subtitleAccent: "India’s Leading Diagnostics Chain",
      description: "Join the QXL Diagnostics network. NABL Accredited Labs with a High Return on Investment.",
      cta: "Explore Options",
      ctaLink: "/franchise",
      ctaSecondary: "Learn More",
      ctaSecondaryLink: "/about",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150198/Assets-QXL/legacy-assets/image/franchise_partner_indian.jpg",
      imageFit: "cover",
      bgFrom: "#f0f9ff",
      bgTo: "#e0f2fe",
      features: ["NABL", "High ROI", "Full Training", "Brand Trust"],
    },
    {
      badge: "FRIENDSHIP OFFER",
      title: "Best friends do everything together.",
      titleAccent: "WHY NOT HEALTH CHECKUPS TOO?",
      subtitle: "BUY 1 GET 1 FREE",
      subtitleAccent: "FULL BODY CHECKUP",
      description: "Bring a friend and get a Free FATTY LIVER TEST. Starting at just ₹850 ONLY.",
      cta: "Book Offer",
      ctaLink: "/book",
      ctaSecondary: "Share with Friend",
      ctaSecondaryLink: "#",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150205/Assets-QXL/legacy-assets/image/happy_couple_phone.jpg",
      imageFit: "cover",
      bgFrom: "#dbeafe",
      bgTo: "#eff6ff",
      features: ["BOGO Offer", "Free Liver Test", "₹850 Only", "Shared Health"],
    },
    {
      badge: "PREVENTIVE CARE",
      title: "Know your health risks.",
      titleAccent: "Before they become health problems.",
      subtitle: "Advanced Preventive Screenings",
      subtitleAccent: "Starting at ₹5,999 ONLY",
      description: "Prevention is better than cure. Discover your health baseline with our comprehensive full body checkups.",
      cta: "Book Now »",
      ctaLink: "/book",
      ctaSecondary: "Reports in 6 hours",
      ctaSecondaryLink: "/packages",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150209/Assets-QXL/legacy-assets/image/medical_team_group.jpg",
      imageFit: "cover",
      bgFrom: "#eff6ff",
      bgTo: "#e0f2fe",
      features: ["₹5,999 Only", "6-Hour Reports", "Full Body", "Actionable Data"],
    },
  ];

  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10500);
    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const mobileSlides = slides.filter(s => !s.imageOnly);

  const [isMobileHovered, setIsMobileHovered] = useState(false);
  
  useEffect(() => {
    if (isMobileHovered) return;
    const timer = setInterval(() => {
      setCurrentMobileSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 10500);
    return () => clearInterval(timer);
  }, [mobileSlides.length, isMobileHovered]);

  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const activeSlide = slides[currentSlide];

  const bodyOrgans = [
    { name: "Heart", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150111/Assets-QXL/legacy-assets/image/cardiology.jpg" },
    { name: "Thyroid", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png" },
    { name: "Liver", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png" },
    { name: "Bone & Joint", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150107/Assets-QXL/legacy-assets/image/bone_disorders.jpg" },
    { name: "Infertility", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png" },
    { name: "Kidney", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8faff]">
      {/* SEO H1 Tag - Visually Hidden */}
      <h1 className="sr-only">QXL Diagnostics | NABL Certified Diagnostic Lab in Bengaluru</h1>

      {/* ── DESKTOP VIEW (hidden lg:flex) ── */}
      <div className="hidden lg:flex flex-col w-full">
        {/* ── Hero Slider ── */}
        <section className="pt-6 pb-4 relative group overflow-hidden">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div
              className="relative rounded-[28px] overflow-hidden flex flex-col md:flex-row h-[580px] md:h-[520px]"
              style={{ background: `linear-gradient(135deg, ${activeSlide.bgFrom} 0%, ${activeSlide.bgTo} 100%)` }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0 }}
                  className="absolute inset-0 w-full h-full flex flex-col md:flex-row"
                >
                  {activeSlide.imageOnly ? (
                    <div className="w-full h-full relative z-10">
                      <Image
                        src={activeSlide.image}
                        alt={activeSlide.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  ) : (
                    <>
                      {/* Decorative blobs */}
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563eb]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2563eb]/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
       
                      {/* Content */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-[52%] px-8 md:px-14 py-6 md:py-0 h-[330px] md:h-full flex flex-col justify-center z-10 relative text-left"
                      >
                        <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-3.5 w-fit shadow-sm">
                          {activeSlide.badge}
                        </span>
                        <h2 className="text-[26px] md:text-[34px] leading-[1.1] font-extrabold text-[#0d2e42] mb-1">
                          {activeSlide.title}
                        </h2>
                        <h2 className="text-[26px] md:text-[34px] leading-[1.1] font-extrabold text-[#2563eb] mb-2.5">
                          {activeSlide.titleAccent}
                        </h2>
                        <p className="text-[14px] md:text-[16px] font-bold text-slate-600 mb-1">
                          {activeSlide.subtitle}{" "}
                          <span className="text-[#2563eb]">{activeSlide.subtitleAccent}</span>
                        </p>
                        <p className="text-[12.5px] text-slate-500 font-medium leading-relaxed mb-4 max-w-md">
                          {activeSlide.description}
                        </p>
    
                        {/* Feature pills */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {activeSlide.features.map((f) => (
                            <span key={f} className="bg-white/70 border border-[#2563eb]/20 text-[#2563eb] text-[10.5px] font-bold px-3 py-1 rounded-full shadow-sm">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
    
                      </motion.div>
    
                      {/* Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="w-56 h-56 rounded-2xl bg-[#dbeafe] absolute top-10 right-10 lg:w-[450px] lg:h-[450px] overflow-hidden border-8 border-white/20 shadow-2xl z-20"
                      >
                        <Image
                          src={activeSlide.image}
                          alt={activeSlide.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
    
              {/* Slide dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((s, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-7 bg-[#2563eb]" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
    
          {/* Arrows */}
          <button onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md border border-gray-100 flex items-center justify-center text-slate-700 hover:bg-white hover:text-[#2563eb] transition-all z-20 opacity-0 group-hover:opacity-100">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <button onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md border border-gray-100 flex items-center justify-center text-slate-700 hover:bg-white hover:text-[#2563eb] transition-all z-20 opacity-0 group-hover:opacity-100">
            <ChevronRight className="w-5 h-5" />
          </button>
        </section>

        {/* ── Action Cards ── */}
        <section className="pt-2 pb-6 z-30 relative -mt-4">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/upload-prescription"
                className="bg-white rounded-2xl p-5 border border-gray-150 shadow-sm flex items-center justify-between group hover:shadow-[0_12px_30px_rgba(37,99,235,0.12)] hover:border-blue-400/50 hover:scale-[1.015] transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center mr-4 flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[14px]">Upload Prescription</h3>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb] transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#2563eb] group-hover:text-white transition-colors" />
                </div>
              </Link>

              <Link href="/home-collection"
                className="bg-white rounded-2xl p-5 border border-gray-150 shadow-sm flex items-center justify-between group hover:shadow-[0_12px_30px_rgba(37,99,235,0.12)] hover:border-blue-400/50 hover:scale-[1.015] transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[14px]">Home Sample Collection</h3>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb] transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#2563eb] group-hover:text-white transition-colors" />
                </div>
              </Link>

              <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer"
                className="bg-white rounded-2xl p-5 border border-gray-150 shadow-sm flex items-center justify-between group hover:shadow-[0_12px_30px_rgba(37,99,235,0.12)] hover:border-blue-400/50 hover:scale-[1.015] transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[14px]">Doctor Enquiry</h3>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb] transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#2563eb] group-hover:text-white transition-colors" />
                </div>
              </a>

              <Link href="/franchise"
                className="bg-white rounded-2xl p-5 border border-gray-150 shadow-sm flex items-center justify-between group hover:shadow-[0_12px_30px_rgba(37,99,235,0.12)] hover:border-blue-400/50 hover:scale-[1.015] transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[14px] mb-0.5">Collaborate with us</h3>

                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb] transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#2563eb] group-hover:text-white transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Recommended Packages ── */}
        <section className="py-10 bg-white border-t border-gray-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="flex justify-between items-end mb-7">
              <div>
                <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Health Packages</span>
                <h2 className="text-[#0f2d5e] text-2xl font-extrabold mt-0.5">Recommended Packages</h2>
                <p className="text-slate-500 text-xs font-semibold mt-1">Our most popular general health panels — trusted by thousands</p>
              </div>
              <Link href="/packages" className="border border-[#2563eb] text-[#2563eb] font-bold px-6 py-2 rounded-xl text-xs hover:bg-[#dbeafe] transition-colors">
                View All
              </Link>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 scrollbar-hide">
              {recommendedPackages.map((pkg, idx) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="w-[85vw] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] flex-shrink-0 snap-start bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_12px_30px_rgba(37,99,235,0.15)] hover:border-blue-400/50 hover:scale-[1.015] transition-all flex flex-col group h-[320px] text-left duration-300"
                >
                  <div className="w-full bg-gradient-to-r from-[#dbeafe] to-[#eff6ff] px-4 py-3 flex justify-between items-center border-b border-[#bfdbfe]">
                    <span className="bg-[#2563eb] text-white px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider shadow-sm">{pkg.tag || "PACKAGE"}</span>
                    <span className="bg-white text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm border border-emerald-100">{Math.round((1 - Number(pkg.price) / Number(pkg.old_price)) * 100)}% OFF</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-[14px] leading-tight mb-2">{pkg.name}</h3>
                      <div className="flex flex-col gap-1.5 mb-3 h-[45px] overflow-hidden">
                        <span className="bg-[#dbeafe] text-[#2563eb] text-[9px] font-bold px-2 py-1 rounded-md line-clamp-2 overflow-hidden text-ellipsis">{pkg.includes}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold mb-1">🏠 Free Home Collection Available</p>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-3 mt-2">
                        <span className="text-xl font-black text-slate-900">₹{pkg.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{pkg.old_price}</span>
                        <span className="text-[11px] text-emerald-600 font-extrabold">{Math.round((1 - Number(pkg.price) / Number(pkg.old_price)) * 100)}% OFF</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href="/packages" className="flex-1 text-center border border-gray-200 text-slate-600 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors">
                          Details
                        </Link>
                        <Link href={`/book?package=${encodeURIComponent(pkg.name)}`}
                          className="flex-1 text-center bg-[#2563eb] py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#1d4ed8] transition-colors"
                          style={{ color: '#ffffff' }}>
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Speciality Tests ── */}
        <section className="py-14 bg-gradient-to-b from-[#eff6ff] to-[#dbeafe] border-t border-blue-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="mb-10 text-center">
              <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">Our Specialities</span>
              <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Speciality Tests</h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
                Accurate and reliable diagnostics for all your health needs, with advanced testing across multiple specialties.
              </p>
              <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              {[
                { title: "NEUROLOGY", href: "/specialities/neurology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150423/Assets-QXL/legacy-assets/image/spec_neurology.png" },
                { title: "HEMATOLOGY", href: "/specialities/hematology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150417/Assets-QXL/legacy-assets/image/spec_hematology.png" },
                { title: "CARDIOLOGY", href: "/specialities/cardiology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150392/Assets-QXL/legacy-assets/image/spec_cardiology.png" },
                { title: "UROLOGY", href: "/specialities/urology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png" },
                { title: "ENDOCRINOLOGY", href: "/specialities/endocrinology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png" },
                { title: "ONCOLOGY", href: "/specialities/oncology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150430/Assets-QXL/legacy-assets/image/spec_oncology.png" },
                { title: "INFECTIOUS DISEASES", href: "/specialities/infectious-diseases", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150422/Assets-QXL/legacy-assets/image/spec_infectious.png" },
                { title: "WOMEN'S HEALTH", href: "/specialities/womens-health", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png" },
                { title: "GASTROENTEROLOGY", href: "/specialities/gastroenterology", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png" },
                { title: "BONE DISORDERS", href: "/specialities/bone-disorders", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150389/Assets-QXL/legacy-assets/image/spec_bone.png" },
              ].map((s, idx) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-white rounded-2xl border border-gray-100 hover:border-blue-400/50 hover:shadow-[0_12px_30px_rgba(37,99,235,0.15)] hover:scale-[1.03] transition-all duration-300"
                >
                  <Link href={s.href} className="group flex flex-col items-center p-4 sm:p-6 h-full">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto mb-4 rounded-3xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      <Image 
                        src={`${s.icon}?v=3`} 
                        alt={s.title} 
                        width={160} 
                        height={160} 
                        unoptimized
                        className={`w-full h-full object-contain mix-blend-multiply ${s.title === "GASTROENTEROLOGY" ? "scale-[1.4]" : "scale-110"}`} 
                      />
                    </div>
                    <h3 className="font-extrabold text-[#0f2d5e] group-hover:text-[#2563eb] text-[11px] tracking-wider leading-tight transition-colors">{s.title}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/speciality-tests" className="inline-block bg-[#2563eb] text-white font-extrabold px-10 py-3 rounded-full hover:bg-[#1d4ed8] transition-colors shadow-md text-sm">
                View All Speciality Tests
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why Choose QXL — Feature Slides Under Speciality Tests ── */}
        <WhyChooseSlider />

        {/* ── AI Powered Diagnostics ── */}
        <AiDiagnostics />

        {/* ── Home Collection ── */}
        <HomeCollectionSection />

        {/* ── Meet Our Team ── */}
        <section className="py-14 bg-[#f0f9ff] border-t border-blue-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="mb-10 text-center">
              <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Our Experts</span>
              <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Meet Our Team</h2>
              <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
                Combining over four decades of medical expertise, our team delivers exceptional diagnostic services with a commitment to precision and care.
              </p>
              <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150160/Assets-QXL/legacy-assets/image/dr_shantakumar_v4.jpg" },
                { name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png" },
                { name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg" },
                { name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg" },
              ].map((doc: any) => (
                <div key={doc.name} className="bg-white rounded-2xl overflow-hidden flex flex-col items-center p-4 text-center group border border-gray-100 hover:shadow-lg transition-all hover:border-[#2563eb]/20">
                  <div className="w-56 h-56 rounded-2xl overflow-hidden mb-4 bg-[#f8fafc] flex items-center justify-center border border-gray-100">
                    <Image src={doc.image} alt={doc.name} width={224} height={224}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      style={{ 
                        objectPosition: doc.imagePosition || 'top',
                        transform: doc.imageScale ? `scale(${doc.imageScale})` : 'none',
                      }}
                      onError={(e) => { e.currentTarget.srcset = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"; }} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-[15px] mb-1">{doc.name}</h3>
                  <p className="text-[11px] font-bold text-[#2563eb] uppercase tracking-wider">({doc.qual})</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Promo Highlights Slider — After Meet Our Team ── */}
        <PromoHighlightSlider />
        <BlogSlider />

        {/* ── Form and Maps ── */}
        <section className="py-16 bg-white border-t border-gray-150">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Contact Form */}
              <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#2563eb]/10 shadow-sm">
                <span className="inline-block bg-white text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-sm">Get in Touch</span>
                <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-2">Book a Test / Inquiry</h2>
                <p className="text-slate-500 text-sm font-medium mb-6">Fill out the form below and our team will contact you shortly.</p>
                
                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input type="tel" placeholder="+91 9964 639639" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Service</label>
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all text-slate-600">
                      <option>Home Collection</option>
                      <option>Lab Visit</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea rows={3} placeholder="How can we help you?" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all resize-none"></textarea>
                  </div>
                  <button type="button" className="w-full bg-[#2563eb] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md hover:bg-[#1d4ed8] transition-all mt-2 text-sm uppercase tracking-wider">
                    Submit Inquiry
                  </button>
                </form>
              </div>

              {/* Google Map */}
              <div className="flex flex-col">
                <span className="inline-block bg-[#dbeafe] text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3 w-fit">Our Location</span>

                <p className="text-slate-500 text-sm font-medium mb-6">Conveniently located in Bengaluru, providing state-of-the-art diagnostic facilities.</p>
                
                <div className="w-full flex-1 min-h-[350px] rounded-3xl overflow-hidden shadow-md border border-gray-200">
                  <iframe 
                    src={mapSrc} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${location} Diagnostics Lab Location`}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── MOBILE VIEW (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col w-full overflow-x-hidden">


        {/* Mobile Hero Slider */}
        <section className="w-full bg-white pb-2">
          <div 
            className="relative w-full overflow-hidden"
            onTouchStart={() => setIsMobileHovered(true)}
            onTouchEnd={() => setIsMobileHovered(false)}
          >
            {mobileSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`transition-opacity duration-500 ${idx === currentMobileSlide ? 'block' : 'hidden'}`}
              >
                {/* Content slides — text left, image right */}
                <div
                  className="mx-3 mt-2 rounded-2xl overflow-hidden flex flex-row items-stretch"
                  style={{
                    minHeight: '160px',
                    background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`
                  }}
                >
                  {/* Left: Text Content */}
                  <div className="flex-1 flex flex-col justify-center px-4 py-4 z-10 text-left">
                    {slide.badge && (
                      <span className="inline-block bg-[#2563eb] text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full tracking-widest uppercase mb-1.5 w-fit">
                        {slide.badge}
                      </span>
                    )}
                    <h2 className="text-[13px] font-extrabold text-[#0d2e42] leading-tight mb-0.5">
                      {slide.title}
                    </h2>
                    {slide.titleAccent && (
                      <h2 className="text-[13px] font-extrabold text-[#2563eb] leading-tight mb-1">
                        {slide.titleAccent}
                      </h2>
                    )}
                    {slide.subtitle && (
                      <p className="text-[10px] font-bold text-slate-600 mb-0.5">{slide.subtitle}</p>
                    )}
                    {slide.subtitleAccent && (
                      <p className="text-[10px] font-extrabold text-[#2563eb] mb-2">{slide.subtitleAccent}</p>
                    )}
                    {slide.cta && (
                      <Link
                        href={slide.ctaLink}
                        className="inline-block bg-[#2563eb] text-white font-bold px-4 py-1.5 rounded-full text-[10px] w-fit mt-1 shadow-sm active:scale-95 transition-transform"
                      >
                        {slide.cta}
                      </Link>
                    )}
                  </div>
                  {/* Right: Image */}
                  <div className="w-[130px] flex-shrink-0 relative overflow-hidden rounded-r-2xl bg-white/20">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover object-center"
                      style={{ imageRendering: 'auto' }}
                      priority
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots + prev/next */}
          <div className="flex justify-center items-center gap-1.5 pt-2 pb-1">
            {mobileSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentMobileSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === currentMobileSlide ? 'w-5 bg-[#2563eb]' : 'w-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
        </section>

        {/* Action Cards */}
        <section className="px-4 py-3 flex flex-col gap-2.5 bg-white border-t border-gray-100">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Need help?</p>

          {/* Prescription Card */}
          <div
            onClick={() => setIsPrescriptionModalOpen(true)}
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-[#0d2e42] text-sm leading-tight">Have a Prescription?</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Upload and book your tests</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </div>

          {/* WhatsApp Booking */}
          <a
            href="https://wa.me/918105085888"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-[#0d2e42] text-sm leading-tight">WhatsApp Booking</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Text us on WhatsApp to book a test</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </a>

          {/* Franchise */}
          <Link
            href="/franchise"
            className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-[#0d2e42] text-sm leading-tight">Collaborate with us</p>

            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
          </Link>
        </section>

        {/* ── Accreditation ── */}
        <Accreditations />

        {/* ── Reviews ── */}
        <ReviewsSection />

        {/* ── FAQs ── */}
        <FaqSection />

        {/* Recommended Packages — one per screen, full-width snap scroll */}
        <section className="py-4 bg-[#f8faff] border-t border-gray-100">
          <div className="flex items-center justify-between px-4 mb-3">
            <div>
              <p className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Health Packages</p>
              <h2 className="text-[#0d2e42] font-extrabold text-base leading-tight">Recommended Packages</h2>
            </div>
            <Link href="/packages" className="text-[#2563eb] text-xs font-bold flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-0">
            {recommendedPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="w-[calc(100vw-32px)] mx-4 flex-shrink-0 snap-center bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden"
              >
                {/* Top colour strip */}
                <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-4 py-3 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-white/90 uppercase tracking-widest">
                    {pkg.tag || 'PACKAGE'}
                  </span>
                  {pkg.old_price && (
                    <span className="text-[10px] font-extrabold text-[#2563eb] bg-white px-2.5 py-1 rounded-full shadow-sm">
                      {Math.round((1 - Number(pkg.price) / Number(pkg.old_price)) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="font-extrabold text-[#0d2e42] text-[15px] leading-snug">{pkg.name}</h3>

                  {pkg.includes && (
                    <p className="text-[11px] text-slate-500 bg-blue-50 px-3 py-2 rounded-xl font-medium leading-relaxed">
                      {pkg.includes}
                    </p>
                  )}

                  <p className="text-[11px] text-slate-400 font-semibold">🏠 Free Home Collection Available</p>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
                    <div>
                      {pkg.old_price && (
                        <p className="text-[11px] text-gray-400 line-through font-medium">₹{pkg.old_price}</p>
                      )}
                      <p className="font-black text-[#0d2e42] text-[22px] leading-tight">₹{pkg.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href="/packages"
                        className="border border-gray-200 text-slate-600 text-[11px] font-bold px-3 py-2.5 rounded-xl active:scale-95 transition-transform"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/book?package=${encodeURIComponent(pkg.name)}`}
                        className="bg-[#2563eb] text-white text-[12px] font-extrabold px-5 py-2.5 rounded-xl active:scale-95 transition-transform shadow-md"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 mt-3">
            {recommendedPackages.map((_, idx) => (
              <div
                key={idx}
                className="h-1.5 w-1.5 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </section>

        {/* Speciality Tests — full vertical list */}
        <section className="bg-white border-t border-gray-100">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div>
              <p className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Our Specialities</p>
              <h2 className="text-[#0d2e42] font-extrabold text-base leading-tight">Speciality Tests</h2>
            </div>
            <Link href="/speciality-tests" className="text-[#2563eb] text-xs font-bold flex items-center gap-0.5">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex flex-col divide-y divide-gray-100 px-4 pb-4">
            {[
              { title: "Neurology", desc: "Brain & Nervous System", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150423/Assets-QXL/legacy-assets/image/spec_neurology.png", href: "/specialities/neurology" },
              { title: "Hematology", desc: "Blood Disorders & CBC", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150417/Assets-QXL/legacy-assets/image/spec_hematology.png", href: "/specialities/hematology" },
              { title: "Cardiology", desc: "Heart & Cardiovascular", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150392/Assets-QXL/legacy-assets/image/spec_cardiology.png", href: "/specialities/cardiology" },
              { title: "Urology", desc: "Kidney & Urinary Health", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png", href: "/specialities/urology" },
              { title: "Endocrinology", desc: "Thyroid, Diabetes & Hormones", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png", href: "/specialities/endocrinology" },
              { title: "Oncology", desc: "Cancer Markers & Screening", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150430/Assets-QXL/legacy-assets/image/spec_oncology.png", href: "/specialities/oncology" },
              { title: "Infectious Diseases", desc: "Viral, Bacterial & Fungal", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150422/Assets-QXL/legacy-assets/image/spec_infectious.png", href: "/specialities/infectious-diseases" },
              { title: "Women's Health", desc: "Gynaecology & Fertility", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png", href: "/specialities/womens-health" },
              { title: "Gastroenterology", desc: "Liver, Gut & Digestive", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png", href: "/specialities/gastroenterology" },
              { title: "Bone Disorders", desc: "Calcium, Vitamin D & Joints", icon: "https://res.cloudinary.com/btjglif5/image/upload/v1784150389/Assets-QXL/legacy-assets/image/spec_bone.png", href: "/specialities/bone-disorders" },
            ].map((spec, i) => (
              <Link
                key={i}
                href={spec.href}
                className="flex items-center gap-3 py-3 active:bg-blue-50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-xl bg-[#eff6ff] border border-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={`${spec.icon}?v=3`}
                    alt={spec.title}
                    width={48}
                    height={48}
                    unoptimized
                    className={`w-12 h-12 object-contain mix-blend-multiply ${spec.title === "Gastroenterology" ? "scale-[1.4]" : "scale-110"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-[#0d2e42] text-[13px] leading-tight">{spec.title}</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">{spec.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 group-active:text-[#2563eb] transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Mobile Why Choose QXL Slides */}
        <MobileWhyChooseSlider />

        {/* AI Powered Diagnostics (Mobile is inside the component) */}
        <AiDiagnostics />

        {/* Technologies removed */}



        {/* Home Collection */}
        <HomeCollectionSection />

        {/* Meet Our Team */}
        <section className="py-8 bg-[#f0f9ff] border-t border-blue-100">
          <div className="px-4">
            <div className="mb-6 text-center">
              <span className="inline-block bg-blue-50 text-[#2563eb] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest mb-1.5">Our Experts</span>
              <h2 className="text-[#0f2d5e] text-xl font-extrabold">Meet Our Team</h2>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                Combining over four decades of medical expertise, our team delivers exceptional diagnostic services with a commitment to precision and care.
              </p>
              <div className="w-10 h-0.5 bg-[#2563eb] mx-auto rounded-full mt-3" />
            </div>
            <div className="flex overflow-x-auto gap-4 scrollbar-none pb-4 snap-x snap-mandatory">
              {[
                { name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150160/Assets-QXL/legacy-assets/image/dr_shantakumar_v4.jpg" },
                { name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png" },
                { name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg" },
                { name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg" },
              ].map((doc) => (
                <div key={doc.name} className="w-[180px] bg-white rounded-2xl overflow-hidden flex flex-col items-center p-3 text-center border border-gray-100 shadow-sm flex-shrink-0 snap-start">
                  <div className="w-36 h-36 rounded-xl overflow-hidden mb-3 bg-[#f8fafc] flex items-center justify-center">
                    <Image src={doc.image} alt={doc.name} width={144} height={144}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'top' }}
                      onError={(e) => { e.currentTarget.srcset = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"; }} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-[12px] mb-0.5">{doc.name}</h3>
                  <p className="text-[9px] font-bold text-[#2563eb] uppercase tracking-wider">({doc.qual})</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Promo Highlights Slider */}
        <MobilePromoHighlightSlider />
        <BlogSlider />

        {/* Contact Form and Location Map */}
        <section className="py-8 bg-white border-t border-gray-150">
          <div className="px-4 flex flex-col gap-8">
            {/* Form */}
            <div className="bg-[#f0f9ff] p-5 rounded-2xl border border-[#2563eb]/10 shadow-sm">
              <span className="inline-block bg-white text-[#2563eb] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2 shadow-xs">Get in Touch</span>
              <h2 className="text-[#0f2d5e] text-lg font-extrabold mb-1">Book a Test / Inquiry</h2>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed">Fill out the form below and our team will contact you shortly.</p>
              
              <form className="flex flex-col gap-3">
                <input type="text" placeholder="Full Name" className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                <select className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all text-slate-600">
                  <option>Home Collection</option>
                  <option>Lab Visit</option>
                  <option>General Inquiry</option>
                </select>
                <textarea rows={3} placeholder="Message" className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all resize-none"></textarea>
                <button type="button" className="w-full bg-[#2563eb] text-white font-extrabold py-3 rounded-xl shadow-sm hover:bg-[#1d4ed8] transition-all text-xs uppercase tracking-wider mt-1">
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="flex flex-col">
              <span className="inline-block bg-[#dbeafe] text-[#2563eb] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2 w-fit">Our Location</span>
              <p className="text-slate-500 text-xs mb-3 leading-relaxed">Conveniently located in Bengaluru, providing state-of-the-art diagnostic facilities.</p>
              <div className="w-full h-[220px] rounded-2xl overflow-hidden shadow-xs border border-gray-200 mt-1">
                <iframe 
                  src={mapSrc} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${location} Diagnostics Lab Location`}
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Accreditation */}
        <Accreditations />

        {/* Reviews */}
        <ReviewsSection />

        {/* FAQs */}
        <FaqSection />
      </div>

      <PrescriptionModal isOpen={isPrescriptionModalOpen} onClose={() => setIsPrescriptionModalOpen(false)} />

      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
