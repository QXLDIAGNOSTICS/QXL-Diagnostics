"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, FileText, MessageCircle, CheckCircle, MapPin, Building2, Phone } from "lucide-react";
import PrescriptionModal from "../components/PrescriptionModal";
import { cmsStore } from '../lib/cmsStore';
import { api } from '../lib/api';
import { WHATSAPP_LINK } from '../lib/businessInfo';
import { optimizeCloudinaryUrl } from '../lib/cloudinary';
import BlogSlider from "../components/BlogSlider";
import AiDiagnostics from "../components/AiDiagnostics";
import HomeCollectionSection from "../components/HomeCollectionSection";
import Accreditations from "../components/Accreditations";
import FaqSection from "../components/FaqSection";
import ReviewsSection from "../components/ReviewsSection";
import SeoContent from "../components/SeoContent";
import CallbackModal from "../components/CallbackModal";
import AppDownloadBanner from "../components/AppDownloadBanner";
import Freedom80Hero from "../components/Freedom80Hero";
import Freedom80CampaignSection from "../components/Freedom80CampaignSection";
import Freedom80Breakdown from "../components/Freedom80Breakdown";
import EmotionalFamilySection from "../components/EmotionalFamilySection";
import DoctorLedLabSection from "../components/DoctorLedLabSection";
import Freedom80FullWidthBanner from "../components/Freedom80FullWidthBanner";
import RunningTextMarquee from "../components/RunningTextMarquee";

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
    image: "/images/doctor_smiling_new.png",
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
          <p className="text-slate-600 text-sm font-medium">Excellence in every test, care in every result.</p>
          <div className="w-14 h-1 bg-[#2563eb] mx-auto rounded-full mt-3" />
        </div>

        {/* Spatial Liquid Glass Slide Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-50/90 via-white/85 to-blue-50/90 backdrop-blur-2xl border border-sky-200/60 shadow-[0_20px_60px_rgba(14,165,233,0.12)] flex flex-row transition-all duration-300" style={{ minHeight: 230 }}>
          {/* Left arrow — spatial liquid glass */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-xl border border-white/30 shadow-xl shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col justify-center pl-16 sm:pl-20 pr-6 py-8 bg-gradient-to-r from-sky-50/80 via-white/70 to-transparent backdrop-blur-md text-left z-10"
            >
              <span className="inline-block bg-gradient-to-r from-sky-500 to-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2.5 w-fit shadow-md shadow-sky-500/20">
                {slide.specialty}
              </span>
              <h3 className="text-[20px] md:text-[26px] font-black text-[#0f2d5e] leading-tight mb-1">
                {slide.titlePlain}{" "}<span className="text-[#2563eb]">{slide.titleAccent}</span>
              </h3>
              <p className="text-[#0284c7] font-extrabold text-[12px] md:text-[13px] mb-2">{slide.highlight}</p>
              <p className="text-slate-600 text-[13px] md:text-[14px] font-medium leading-relaxed mb-5 max-w-sm">{slide.sub}</p>
              <Link
                href="/book"
                className="inline-block bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 !text-white font-black px-7 py-3 rounded-full text-[13px] hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] hover:scale-105 transition-all w-fit shadow-md border border-white/40"
                style={{ color: '#ffffff' }}
              >
                <span className="!text-white font-black" style={{ color: '#ffffff' }}>Book Now →</span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right Image Panel with Spatial Glass Blend */}
          <div
            className="w-[38%] md:w-[42%] flex-shrink-0 relative overflow-hidden rounded-r-3xl bg-white/10"
            style={{ minHeight: 230 }}
          >
            {/* Spatial Gradient Blend Overlay */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-10 pointer-events-none" />

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

          {/* Right arrow — spatial liquid glass */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-xl border border-white/30 shadow-xl shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-0.5 mt-4">
          {whySlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="min-w-11 min-h-11 flex items-center justify-center"
              aria-label={`Go to speciality slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-[#2563eb]" : "w-2 bg-gray-400"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}



// ── Promo: QXL Packages Slider — Desktop ──────────────────────────────────────
const promoSlides = [
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
    tag: "MOST BOOKED",
    desc: "Our premium all-in-one health package covering metabolic, cardiac, hormonal, nutritional and inflammatory markers.",
    includes: ["FBS, HbA1c, Lipid + Apo Panel", "Full Thyroid (T3, T4, TSH), Vit D & B12", "Kidney Screen (7 markers), LFT", "H.pylori IgG, hs-CRP, CBC, ESR"],
    tests: "25+ Tests",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150209/Assets-QXL/legacy-assets/image/medical_team_group.jpg",
    imgBg: "#EDE7F6",
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
    <section className="py-10 bg-transparent border-t border-blue-100/40">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        {/* Heading */}
        <div className="text-center mb-7">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">Our Packages</span>
          <h2 className="text-[#0f2d5e] text-2xl md:text-3xl font-extrabold mb-1">Featured Packages & Offers</h2>
          <p className="text-slate-500 text-sm font-medium">Trusted diagnostics at unbeatable value — book today.</p>
          <div className="w-14 h-1 bg-[#2563eb] mx-auto rounded-full mt-3" />
        </div>

        {/* Spatial Liquid Glass Package Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-sky-50/90 via-white/85 to-blue-50/90 backdrop-blur-2xl border border-sky-200/60 shadow-[0_20px_60px_rgba(14,165,233,0.12)] flex flex-row transition-all duration-300" style={{ minHeight: 230 }}>
          {/* Left arrow — spatial liquid glass */}
          <button onClick={prev2} aria-label="Previous package"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-xl border border-white/30 shadow-xl shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Left: Package Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
              className="flex-1 flex flex-col justify-center pl-16 sm:pl-20 pr-6 py-8 bg-gradient-to-r from-sky-50/80 via-white/70 to-transparent backdrop-blur-md z-10"
            >
              {/* Tag + Tests count */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-gradient-to-r from-sky-500 to-[#2563eb] text-white text-[9px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase shadow-md shadow-sky-500/20">
                  {slide.tag}
                </span>
                <span className="inline-block bg-sky-100/80 text-[#0284c7] text-[9px] font-extrabold px-2.5 py-1 rounded-full border border-sky-200">
                  {slide.tests}
                </span>
              </div>
              {/* Package name */}
              <h3 className="text-[18px] md:text-[22px] font-black text-[#0f2d5e] leading-tight mb-2">{slide.name}</h3>
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[#2563eb] font-black text-[22px] md:text-[26px]">{slide.price}</span>
                <span className="text-slate-400 text-[13px] line-through font-medium">{slide.original}</span>
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Save {Math.round((1 - parseInt(slide.price.replace(/[^\d]/g,'')) / parseInt(slide.original.replace(/[^\d]/g,''))) * 100)}%</span>
              </div>
              {/* Description */}
              <p className="text-[12px] md:text-[13px] text-slate-600 font-medium mb-3 max-w-sm leading-relaxed">{slide.desc}</p>
              {/* Includes list */}
              <div className="flex flex-col gap-1 mb-5">
                {slide.includes.map((inc, idx) => (
                  <span key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                    {inc}
                  </span>
                ))}
              </div>
              {/* CTA */}
              <Link href={slide.ctaLink}
                className="inline-block bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 !text-white font-black px-7 py-3 rounded-full shadow-md hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] hover:scale-105 transition-all text-sm w-fit border border-white/40"
                style={{ color: '#ffffff' }}>
                <span className="!text-white font-black" style={{ color: '#ffffff' }}>Book Now →</span>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Right: Image Panel with Spatial Glass Blend */}
          <div
            className="w-[36%] md:w-[40%] flex-shrink-0 relative overflow-hidden rounded-r-3xl bg-white/10"
            style={{ backgroundColor: slide.imgBg, minHeight: 230 }}
          >
            {/* Spatial Gradient Blend Overlay */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-10 pointer-events-none" />

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

          {/* Right arrow — spatial liquid glass */}
          <button onClick={next2} aria-label="Next package"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-xl border border-white/30 shadow-xl shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-0.5 mt-4">
          {promoSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="min-w-11 min-h-11 flex items-center justify-center"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-[#2563eb]" : "w-2 bg-gray-400"}`} />
            </button>
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
        <p className="text-[#0d2e42] font-extrabold text-base">The QXL Difference</p>
      </div>
      <div className="mx-4 rounded-3xl overflow-hidden bg-gradient-to-r from-sky-50/90 via-white/85 to-blue-50/90 backdrop-blur-2xl border border-sky-200/60 shadow-[0_12px_36px_rgba(14,165,233,0.10)] flex flex-row min-h-[155px] relative">
        {/* Arrows */}
        <button onClick={prev} aria-label="Previous speciality" className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-md border border-white/30 shadow-md hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer">
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center pl-11 pr-3 py-4 bg-gradient-to-r from-sky-50/80 via-white/70 to-transparent backdrop-blur-md text-left z-10"
          >
            <span className="inline-block bg-gradient-to-r from-sky-500 to-[#2563eb] text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-1.5 w-fit shadow-xs">{slide.specialty}</span>
            <h3 className="text-[13px] font-black text-[#0f2d5e] leading-tight mb-0.5">
              {slide.titlePlain} <span className="text-[#2563eb]">{slide.titleAccent}</span>
            </h3>
            <p className="text-[#0284c7] font-extrabold text-[9px] mb-1">{slide.highlight}</p>
            <p className="text-[10px] text-slate-600 font-medium mb-3 leading-snug">{slide.sub}</p>
            <Link href="/book" className="inline-block bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 !text-white font-black px-3.5 py-1.5 rounded-full text-[10px] w-fit shadow-sm active:scale-95 transition-transform" style={{ color: '#ffffff' }}>
              <span className="!text-white font-black" style={{ color: '#ffffff' }}>Book Now →</span>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Right image */}
        <div className="w-[115px] flex-shrink-0 relative overflow-hidden rounded-r-3xl bg-white/10" style={{ minHeight: '155px' }}>
          <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/90 via-white/40 to-transparent z-10 pointer-events-none" />

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
                sizes="115px"
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={next} aria-label="Next speciality" className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-md border border-white/30 shadow-md hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer">
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
      <div className="flex justify-center gap-0.5 mt-3">
        {whySlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="min-w-11 min-h-11 flex items-center justify-center"
            aria-label={`Go to speciality slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-[#2563eb]" : "w-1.5 bg-gray-400"}`}
            />
          </button>
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
    <section className="py-5 bg-transparent border-t border-blue-100">
      <div className="px-4 mb-3">
        <p className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Our Packages</p>
        <p className="text-[#0d2e42] font-extrabold text-base">Featured Packages</p>
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
            <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full tracking-widest uppercase mb-1.5 w-fit">{slide.tag}</span>
            <h3 className="text-[12px] font-extrabold text-[#0d2e42] leading-tight mb-0.5">{slide.name}</h3>
            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[#2563eb] font-extrabold text-[15px]">{slide.price}</span>
              <span className="text-slate-500 text-[10px] line-through">{slide.original}</span>
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
      <div className="flex justify-center gap-0.5 mt-3">
        {promoSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="min-w-11 min-h-11 flex items-center justify-center"
            aria-label={`Go to package slide ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-[#2563eb]" : "w-1.5 bg-gray-400"}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

import { BookingFormWidget } from '../components/BookingFormWidget';

function QuickBookingForm({ formState, setFormState, handleContactSubmit, formStatus }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-blue-100 shadow-[0_8px_30px_rgba(37,99,235,0.08)] relative z-10">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#0f2d5e] mb-1">Request a Call Back</h3>
        <p className="text-sm text-slate-500 font-medium">Leave your number and we'll call you right away.</p>
      </div>
      
      <form className="flex flex-col gap-5" onSubmit={handleContactSubmit}>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
          <input type="text" required placeholder="Enter your name" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value.replace(/[^a-zA-Z\s]/g, '')})} className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
          <input type="tel" required placeholder="+91 Contact number" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value.replace(/\D/g, '')})} className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-sm" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Message (Optional)</label>
          <textarea rows={2} placeholder="Any specific requirements?" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl px-5 py-4 text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-sm resize-none" />
        </div>
        
        <div className="pt-2">
          <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-[#2563eb] text-white font-black px-6 py-4 rounded-2xl shadow-lg hover:bg-[#1d4ed8] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2">
            {formStatus === 'loading' ? 'Submitting...' : 'Request Call'}
          </button>
        </div>
        
        {formStatus === 'success' && (
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center mt-2">
            <p className="text-emerald-600 text-sm font-bold">Request received! We'll call you shortly.</p>
          </div>
        )}
        {formStatus === 'error' && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center mt-2">
            <p className="text-red-600 text-sm font-bold">Error submitting request. Please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
}function useCountdown() {
  const target = new Date('2026-08-20T23:59:59+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, expired: false });
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0, expired: true }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
        expired: false
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return timeLeft;
}


export default function Home() {
  const countdown = useCountdown();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [location, setLocation] = useState("Bengaluru");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [recommendedPackages, setRecommendedPackages] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);
  const [formState, setFormState] = useState({ name: '', phone: '', service: 'Home Collection', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showContactServiceDropdown, setShowContactServiceDropdown] = useState(false);
  const [collapsedMobileDesc, setCollapsedMobileDesc] = useState<Record<string, boolean>>({});

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setFormStatus('loading');
    
    const message = `*New Inquiry from Website*
*Name:* ${formState.name}
*Phone:* ${formState.phone}
*Service:* ${formState.service}
*Message:* ${formState.message || 'None'}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919964639639&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setFormStatus('success');
    setFormState({ name: '', phone: '', service: 'Home Collection', message: '' });
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem('qxl_location');
    if (saved) setLocation(saved);
    
    try {
      setCartItems(JSON.parse(localStorage.getItem('qxl_cart') || '[]'));
    } catch {}

    const handleLoc = (e: any) => setLocation(e.detail);
    const handleCart = () => {
      try {
        setCartItems(JSON.parse(localStorage.getItem('qxl_cart') || '[]'));
      } catch {}
    };

    window.addEventListener('locationChange', handleLoc);
    window.addEventListener('cartChange', handleCart);
    
    // Load dynamic locations & packages safely for rendering
    setLocations(cmsStore.getAll("locations"));
    const fallbackPackages = cmsStore.getAll("packages").sort((a, b) => Number(a.price) - Number(b.price));
    setRecommendedPackages(fallbackPackages);

    if (api && api.packages) {
      api.packages.list()
        .then((data) => {
          if (data && data.length > 0) {
            setRecommendedPackages(data.sort((a, b) => Number(a.price) - Number(b.price)));
          }
        })
        .catch(() => {
          // Graceful fallback to local CMS store packages
        });
    }
    
    return () => {
      window.removeEventListener('locationChange', handleLoc);
      window.removeEventListener('cartChange', handleCart);
    };
  }, []);

  const handleToggleCart = (name: string) => {
    let updated: string[];
    if (cartItems.includes(name)) {
      updated = cartItems.filter(item => item !== name);
    } else {
      updated = [...cartItems, name];
    }
    try {
      localStorage.setItem('qxl_cart', JSON.stringify(updated));
    } catch {}
    setCartItems(updated);
    window.dispatchEvent(new CustomEvent('cartChange'));
  };

  const activeLocationObj = locations.find(loc => loc.name === location || loc.city === location);
  const mapSrc = activeLocationObj && activeLocationObj.lat && activeLocationObj.lng
    ? `https://maps.google.com/maps?q=QXL+Diagnostics+${activeLocationObj.lat},${activeLocationObj.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent("QXL Diagnostics " + location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // ── All poster images (imageOnly slides) ─────────────────────────────────────
  const posterImages = [
    "/posters/02998fde-ef5f-4292-910c-7530f67acd7e.jpeg",
    "/posters/07e29c76-b80d-406c-b9cb-5741d1cddc98.jpeg",
    "/posters/0b7b423e-88d8-4f9c-baef-cf5b79e5cecc.jpeg",
    "/posters/244bb0ec-8188-47a6-b185-b78d3646e4f0.jpeg",
    "/posters/247d0b13-34e7-4296-b29a-148ce54d7fa4.jpeg",
    "/posters/2730d20d-0638-4bd1-a949-6c76ba6cf6d4.jpeg",
    "/posters/7726ca5b-1d20-4cf5-8130-785dcde255dc.jpeg",
    "/posters/de0b69c4-521d-4674-8ef7-52e52eef4865.jpeg",
    "/posters/ee2d2cb7-5bf7-462f-ac54-b34303d3a215.jpeg",
    "/posters/ee7fee8d-4658-46d5-aea8-d31f44aaeee9.jpeg",
  ];

  const posterSlides = posterImages.map((img, i) => ({
    title: i === 0 ? "QXL Freedom 80 — Independence Day Special" : `QXL Freedom Sale Poster ${i}`,
    image: img,
    ctaLink: "/book?package=QXL%20Freedom%2080%20Health%20Check",
    imageOnly: true,
  }));

  // ── Original content-rich slides (restored) ────────────────────────────────
  const contentSlides = [
    {
      badge: "🇮🇳 INDEPENDENCE DAY SPECIAL 🇮🇳",
      title: "India's Independence Day",
      titleAccent: "Doctor-Led Diagnostic Lab in Bengaluru",
      subtitle: "QXL FREEDOM 80 HEALTH CHECK — 80 PARAMETERS AT ₹800 (WORTH ₹5,800)",
      subtitleAccent: "Available at all QXL centres & partner facilities across Bengaluru.",
      description: "Celebrate India's Independence Day with complete health freedom. Expert doctor-led diagnostics for your entire family.",
      cta: "BOOK NOW @ ₹800",
      ctaLink: "/book?package=QXL%20Freedom%2080%20Health%20Check",
      ctaSecondary: "VIEW PACKAGE",
      ctaSecondaryLink: "/packages",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1200&auto=format&fit=crop",
      imageFit: "cover",
      bgFrom: "#fff7ed", bgTo: "#f0fdf4",
      features: ["Blood tests", "Pathology tests", "Preventive health checkups", "Home sample collection"],
      freedom80Card: true, flagAnimation: true,
    },
    {
      badge: "🇮🇳 SENIOR CITIZENS HEALTH FREEDOM 🇮🇳",
      title: "SENIOR CITIZENS CARE",
      titleAccent: "FULL FREEDOM & VITALITY PANEL",
      subtitle: "Comprehensive Heart, Bone, Diabetes & Kidney Screening",
      subtitleAccent: "Free Home Blood Sample Collection for Elders",
      description: "Specially curated diagnostic parameters to keep your parents & grandparents healthy, active, and independent.",
      cta: "Book Senior Care Checkup",
      ctaLink: "/book?package=QXL%20Freedom%2080%20Health%20Check",
      ctaSecondary: "Call +91 9964 639 639",
      ctaSecondaryLink: "tel:+919964639639",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
      imageFit: "cover",
      bgFrom: "#fff7ed", bgTo: "#eff6ff",
      features: ["Heart & Lipids", "Bone & Joint", "Kidney Function", "Elder Care"],
      flagAnimation: true,
    },
    {
      badge: "🇮🇳 WOMEN'S HEALTH & METABOLIC FREEDOM 🇮🇳",
      title: "WOMEN'S WELLNESS FREEDOM",
      titleAccent: "HORMONE, ANEMIA & THYROID SCREENING",
      subtitle: "Thyroid, Iron Profile, Vitamin D, Vitamin B12, Calcium & Hormones",
      subtitleAccent: "Doctor-Reviewed Detailed Clinical Interpretation",
      description: "Empowering women across Bengaluru with deep metabolic, hormonal, and nutritional clarity.",
      cta: "Book Women's Screening",
      ctaLink: "/book?package=QXL%20Freedom%2080%20Health%20Check",
      ctaSecondary: "View All Packages",
      ctaSecondaryLink: "/packages",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
      imageFit: "cover",
      bgFrom: "#f0fdf4", bgTo: "#fff7ed",
      features: ["Iron & Anemia", "Thyroid Profile", "Vitamin D & B12", "Hormonal Balance"],
      flagAnimation: true,
    },
    {
      badge: "🇮🇳 INDEPENDENCE DAY SPECIAL 🇮🇳",
      title: "QXL FREEDOM 80 HEALTH CHECK",
      titleAccent: "80 PARAMETERS AT ONLY ₹800",
      subtitle: "80 Parameters across 8 Major Health Areas · Regular Value ₹5,800 (86% OFF)",
      subtitleAccent: "🏠 Free Home Sample Collection Available Across Bengaluru",
      description: "Blood Health (25), Diabetes (3), Liver (12), Kidney & Electrolytes (12), Heart (9), Thyroid (3), Iron & Minerals (5), Complete Urine Examination (11).",
      cta: "BOOK NOW @ ₹800",
      ctaLink: "/book?package=QXL%20Freedom%2080%20Health%20Check",
      ctaSecondary: "View Details",
      ctaSecondaryLink: "/packages",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1200&auto=format&fit=crop",
      imageFit: "cover",
      bgFrom: "#f0fdf4", bgTo: "#fff7ed",
      features: ["80 Parameters", "8 Health Areas", "Only ₹800", "Free Home Collection"],
      flagAnimation: true,
    },
    {
      badge: "🇮🇳 FREEDOM FROM SILENT HEALTH RISKS 🇮🇳",
      title: "PREVENTIVE HEALTH FREEDOM",
      titleAccent: "EARLY DIAGNOSTICS SAVE LIVES",
      subtitle: "Complete Lipid Profile, Fatty Liver Markers & Glycemic Index",
      subtitleAccent: "Fast 6-Hour Digital Report Delivery on Mobile",
      description: "Detect hidden health risks before symptoms arise with QXL's NABL-accredited diagnostic precision.",
      cta: "Book Preventive Screen",
      ctaLink: "/book?package=QXL%20Freedom%2080%20Health%20Check",
      ctaSecondary: "Explore AI Reports",
      ctaSecondaryLink: "/about",
      image: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150124/Assets-QXL/legacy-assets/image/doctor_smiling.png",
      imageFit: "cover",
      bgFrom: "#eff6ff", bgTo: "#f0fdf4",
      features: ["Fatty Liver Screen", "Lipid Profile", "HbA1c Sugar", "6-Hour Delivery"],
      flagAnimation: true,
    },
    {
      badge: "⚡ POPULAR CHECKUP",
      title: "QUICK FIT PACKAGE",
      titleAccent: "COMPLETE ESSENTIAL HEALTH CHECK",
      subtitle: "FBS, HbA1c, LFT, KFT, TSH, Vitamin D, CBC, ESR",
      subtitleAccent: "Only ₹1,770 · Worth ₹4,696 · Save 62%",
      description: "Essential preventive screening covering blood count, liver, kidney, blood sugar, and thyroid health.",
      cta: "Book Quick Fit @ ₹1,770",
      ctaLink: "/book?package=Quick%20Fit%20Package",
      ctaSecondary: "View All Packages",
      ctaSecondaryLink: "/packages",
      image: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150124/Assets-QXL/legacy-assets/image/doctor_smiling.png",
      imageFit: "cover",
      bgFrom: "#f0fdf4", bgTo: "#fff7ed",
      features: ["12+ Parameters", "₹1,770 Offer", "Vitamin D Included", "Free Home Collection"],
      flagAnimation: false,
    },
    {
      badge: "🏠 FREE HOME SAMPLE COLLECTION",
      title: "24x7 BENGALURU HOME SERVICE",
      titleAccent: "CERTIFIED PHLEBOTOMIST AT YOUR DOORSTEP",
      subtitle: "Kengeri, Mysore Road, Yelahanka & All Neighborhoods",
      subtitleAccent: "Fast 6-Hour Electronic Report Delivery",
      description: "Safe, sterile, and professional blood collection at your convenient time anywhere in Bengaluru.",
      cta: "Book Home Collection",
      ctaLink: "/home-collection",
      ctaSecondary: "Call +91 9964 639 639",
      ctaSecondaryLink: "tel:+919964639639",
      image: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150209/Assets-QXL/legacy-assets/image/medical_team_group.jpg",
      imageFit: "cover",
      bgFrom: "#f0fdf4", bgTo: "#dcfce7",
      features: ["Free Home Collection", "NABL Phlebotomists", "6-Hour Reports", "Bengaluru 24x7"],
      flagAnimation: false,
    },
  ];

  // Combined: poster image-only slides first, then content slides
  const slides = [...posterSlides, ...contentSlides];

  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10500);
    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mobileSlides: any[] = slides; // all slides are now full slides

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeSlide: any = slides[currentSlide];

  const bodyOrgans = [
    { name: "Heart", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150392/Assets-QXL/legacy-assets/image/spec_cardiology.png" },
    { name: "Thyroid", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png" },
    { name: "Liver", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png" },
    { name: "Bone & Joint", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150389/Assets-QXL/legacy-assets/image/spec_bone.png" },
    { name: "Infertility", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png" },
    { name: "Kidney", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SEO H1 Tag - Visually Hidden */}
      <h1 className="sr-only">QXL Diagnostics | NABL Certified Diagnostic Lab in Bengaluru</h1>

      {/* ── DESKTOP VIEW (hidden lg:flex) ── */}
      <div className="hidden lg:flex flex-col w-full">
        {/* ── Hero Slider ── */}
        <section className="pt-6 pb-4 relative group overflow-hidden">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div
              className="relative rounded-[28px] overflow-hidden flex flex-col md:flex-row h-[400px] md:h-[420px] shadow-lg border border-amber-200/50"
              style={{ background: 'linear-gradient(135deg, #FFF4E6 0%, #FFFFFF 40%, #FFFFFF 60%, #E8F5E9 100%)' }}
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
                    <React.Fragment>
                      {/* Full-width Indian tricolour stripe — spans entire slide top */}
                      <div className="absolute top-0 left-0 right-0 h-[4px] flex z-30 pointer-events-none">
                        <div className="flex-1" style={{ background: '#FF9933' }} />
                        <div className="flex-1" style={{ background: '#ffffff' }} />
                        <div className="flex-1" style={{ background: '#138808' }} />
                      </div>

                      {/* LEFT — text content 44% */}
                      <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                        className="flex-none w-[44%] h-full flex flex-col justify-center pl-10 pr-6 pt-8 pb-8 z-10 relative"
                        style={{ background: 'linear-gradient(160deg, #FFF8EE 0%, #FFF1DC 55%, #EDFFF2 100%)' }}
                      >
                        {/* Saffron left accent bar */}
                        <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full" style={{ background: 'linear-gradient(to bottom, #FF9933, #138808)' }} />

                        <span className="inline-flex items-center gap-1.5 bg-[#FF9933] text-white text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase mb-4 w-fit shadow-md">
                          🇮🇳 INDEPENDENCE DAY SPECIAL
                        </span>

                        <h2 className="text-[28px] leading-[1.12] font-black mb-2" style={{ color: '#0f2d5e' }}>
                          QXL Freedom 80
                          <br />
                          <span style={{ color: '#138808' }}>Health Check</span>
                        </h2>

                        <p className="text-[12px] font-extrabold mb-1" style={{ color: '#FF9933' }}>
                          80 Parameters · Only ₹800 (Worth ₹5,800)
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium mb-5 leading-snug">
                          🏠 Free Home Collection &nbsp;·&nbsp; NABL Accredited &nbsp;·&nbsp; 6-hr Reports
                        </p>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-[38px] font-black leading-none" style={{ color: '#138808' }}>₹800</span>
                          <span className="text-[13px] text-slate-400 line-through font-medium">₹5,800</span>
                          <span className="text-white text-[8px] font-black px-2 py-0.5 rounded-full" style={{ background: '#FF9933' }}>86% OFF</span>
                        </div>

                        <a
                          href={activeSlide.ctaLink || '/book?package=QXL%20Freedom%2080%20Health%20Check'}
                          className="w-fit text-white font-black px-7 py-3 rounded-full text-[12px] uppercase tracking-wider shadow-lg hover:shadow-xl active:scale-95 transition-all"
                          style={{ background: 'linear-gradient(135deg, #FF9933 0%, #e67e00 100%)' }}
                        >
                          BOOK NOW @ ₹800 →
                        </a>
                      </motion.div>

                      {/* RIGHT — poster image 56% */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.65, delay: 0.05 }}
                        className="flex-1 h-full relative z-10 overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #FFF8EE 0%, #FFF4E6 50%, #EDFFF2 100%)' }}
                      >
                        <Image
                          src={activeSlide.image}
                          alt={activeSlide.title}
                          fill
                          className="object-contain p-2"
                          sizes="56vw"
                          priority
                        />
                      </motion.div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {/* Decorative blobs */}
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                      {/* Content — left side */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-[55%] px-8 md:px-12 py-8 h-full flex flex-col justify-center z-20 relative text-left overflow-hidden"
                      >
                        {/* Badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-block bg-[#FF9933] text-white text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-md border border-orange-300 truncate max-w-[90%]">
                            {activeSlide.badge}
                          </span>
                          {activeSlide.flagAnimation && !countdown.expired && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1 shrink-0">
                              ⏰ Offer Ends: {countdown.d}d {countdown.h}h {countdown.m}m {countdown.s}s
                            </span>
                          )}
                        </div>

                        {/* Title — single compact block */}
                        <h2 className="text-[22px] md:text-[28px] leading-[1.15] font-black text-[#0f2d5e] mb-1 pr-4">
                          {activeSlide.title}
                        </h2>
                        <p className="text-[16px] md:text-[20px] leading-[1.2] font-extrabold text-[#138808] mb-2 pr-4">
                          {activeSlide.titleAccent}
                        </p>

                        {/* Short subtitle only */}
                        <p className="text-[12px] text-slate-600 font-medium mb-3 max-w-sm leading-snug line-clamp-2">
                          {activeSlide.subtitle}
                        </p>

                        {/* Feature pills — max 4, single row */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {activeSlide.features.slice(0, 4).map((f: string, i: number) => (
                            <span
                              key={f}
                              className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                                i % 3 === 0
                                  ? "bg-amber-50 border-amber-300 text-amber-800"
                                  : i % 3 === 1
                                  ? "bg-sky-50 border-sky-300 text-sky-800"
                                  : "bg-emerald-50 border-emerald-300 text-emerald-800"
                              }`}
                            >
                              ✓ {f}
                            </span>
                          ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Link
                            href={activeSlide.ctaLink}
                            className="bg-[#FF9933] hover:bg-orange-500 text-white font-black px-5 py-2.5 rounded-full text-[12px] shadow-md hover:shadow-lg active:scale-95 transition-all uppercase tracking-wide"
                          >
                            {activeSlide.cta}
                          </Link>
                          {activeSlide.freedom80Card !== true && (
                            <a
                              href={activeSlide.ctaSecondaryLink}
                              className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-full text-[11px] uppercase tracking-wide border border-emerald-300/80 shadow-sm transition-all"
                            >
                              {activeSlide.ctaSecondary}
                            </a>
                          )}
                        </div>

                        {/* Freedom 80 Package Mini-Card — only on first slide */}
                        {activeSlide.freedom80Card === true && (
                          <div className="bg-white/90 border border-amber-200 rounded-xl px-3 py-2.5 shadow-sm flex items-center gap-3 max-w-[360px]">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">MOST BOOKED</span>
                                <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">86% OFF</span>
                              </div>
                              <p className="text-[#0f2d5e] font-black text-[11px] truncate">QXL Freedom 80 · 80 Parameters</p>
                              <div className="flex items-baseline gap-1.5 mt-0.5">
                                <span className="text-emerald-600 font-black text-base">₹800</span>
                                <span className="text-slate-400 text-[10px] line-through">₹5,800</span>
                                <span className="text-slate-500 text-[9px]">· Free Home Collection</span>
                              </div>
                            </div>
                            <Link
                              href="/book?package=QXL%20Freedom%2080%20Health%20Check"
                              className="bg-[#2563eb] hover:bg-blue-700 text-white font-black px-3 py-2 rounded-lg text-[10px] uppercase tracking-wide shadow-md transition-all active:scale-95 whitespace-nowrap flex-shrink-0"
                            >
                              BOOK NOW
                            </Link>
                          </div>
                        )}

                      </motion.div>

                      {/* Image — right side, flush panel */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="absolute top-0 right-0 bottom-0 w-[45%] overflow-hidden z-10"
                      >
                        <img
                          src={activeSlide.image}
                          alt={activeSlide.title}
                          className="w-full h-full object-cover object-center"
                        />
                        {/* Soft left fade so text doesn't clash */}
                        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/40 to-transparent pointer-events-none" />
                      </motion.div>
                    </React.Fragment>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Slide dots removed as requested */}

            </div>
          </div>
    
          {/* Spatial Liquid Glass Arrow Buttons */}
          <button onClick={handlePrev}
            aria-label="Previous hero slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-xl border border-white/30 shadow-xl shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button onClick={handleNext}
            aria-label="Next hero slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-[#2563eb] hover:bg-sky-500 backdrop-blur-xl border border-white/30 shadow-xl shadow-sky-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer group">
            <ChevronRight className="w-5 h-5 text-white" />
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
                    <Building2 className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[14px]">Partner with us</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Lab partner or franchise?</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb] transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#2563eb] group-hover:text-white transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </section>



        {/* ── 24x7 Diagnostic Lab Banner (Independence Day Theme) ── */}
        <section className="py-8 z-30 relative">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="rounded-[28px] overflow-hidden shadow-xl border border-white/50 relative bg-gradient-to-r from-[#FF9933]/10 via-white to-[#138808]/10 p-8 md:p-12">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#138808]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF9933]/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-left">
                  <span className="inline-block bg-[#000080] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-3.5 shadow-sm">
                    24×7 DIAGNOSTIC SERVICES
                  </span>
                  <h2 className="text-[28px] md:text-[38px] leading-[1.1] font-extrabold text-[#0b132b] mb-2">
                    India's Independence Day
                  </h2>
                  <h3 className="text-[22px] md:text-[28px] leading-[1.2] font-extrabold text-[#FF9933] mb-4">
                    Doctor-Led Diagnostic Lab in Bengaluru
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {["Blood tests", "Pathology tests", "Preventive health checkups", "Home sample collection"].map(service => (
                      <div key={service} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#138808]" />
                        <span className="text-slate-700 font-bold text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-6">
                    Available at all QXL centres & partner facilities across Bengaluru.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a href="tel:+919964639639" className="bg-[#FF9933] text-white font-black px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-widest flex items-center gap-2 border border-white/40">
                      Call +91 9964 639 639
                    </a>
                    <a href="https://www.qxldiagnostics.com" target="_blank" rel="noreferrer" className="text-[#000080] font-bold text-sm hover:underline">
                      www.qxldiagnostics.com
                    </a>
                  </div>
                </div>
                
                {/* 24/7 Graphic */}
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/80 border-8 border-white shadow-2xl flex flex-col items-center justify-center flex-shrink-0 relative">
                  <div className="absolute inset-0 border-4 border-dashed border-[#138808]/30 rounded-full animate-[spin_30s_linear_infinite]" />
                  <span className="text-6xl md:text-7xl font-black text-[#000080] tracking-tighter">24<span className="text-[#FF9933]">/</span>7</span>
                  <span className="text-xs md:text-sm font-bold tracking-widest text-[#138808] uppercase mt-1">Care & Precision</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Recommended Packages ── */}
        <section className="py-10 bg-transparent border-t border-gray-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="flex justify-between items-end mb-7">
              <div>
                <span className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Health Packages</span>
                <h2 className="text-[#0f2d5e] text-2xl font-extrabold mt-0.5">Recommended Packages</h2>
                <p className="text-slate-500 text-xs font-semibold mt-1">Our most popular general health panels — trusted by thousands</p>
              </div>
              <Link href="/packages" className="border border-blue-600 text-blue-600 font-extrabold px-5 py-2 rounded-full text-xs hover:bg-blue-50 transition-all">
                View All
              </Link>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 scrollbar-hide">
              {recommendedPackages.map((pkg, idx) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="w-[280px] md:w-[300px] flex-shrink-0 snap-start bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400/50 transition-all flex flex-col group h-[385px] text-left relative z-10 duration-300"
                >
                  {/* Card Header (Pills) */}
                  <div className="w-full bg-[#f0f9ff] px-4 py-3 flex justify-between items-center border-b border-sky-100/50">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {pkg.most_booked ? (
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-extrabold shadow-[0_0_12px_rgba(249,115,22,0.4)] flex items-center gap-1 border border-orange-400 tracking-wider">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          MOST BOOKED
                        </span>
                      ) : (
                        <span className="bg-[#2563eb] text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase">{pkg.tag || "PACKAGE"}</span>
                      )}
                    </div>
                    <span className="bg-[#f0fdf4] text-[#16a34a] border border-[#dcfce7] px-3 py-1 rounded-full text-[10px] font-extrabold">{Math.round((1 - Number(pkg.price) / Number(pkg.old_price)) * 100)}% OFF</span>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-extrabold text-[#0f2d5e] text-[15px] leading-tight hover:text-[#2563eb] transition-colors">{pkg.name}</h3>
                      </div>
                      
                      {/* Parameter Box */}
                      <div className="mb-3">
                        <div className="bg-[#eff6ff] border border-sky-150/40 text-[#1d4ed8] text-[10.5px] font-medium px-3 py-2.5 rounded-xl h-[52px] flex items-center overflow-hidden leading-normal">
                          <p className="line-clamp-2">{pkg.includes}</p>
                        </div>
                      </div>

                      {/* Home Collection Notice */}
                      <p className="text-[10px] text-slate-500 font-bold mb-3 flex items-center gap-1.5">
                        🏠 Free Home Collection Available
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-extrabold text-slate-900">₹{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through font-semibold">₹{pkg.old_price}</span>
                      <span className="text-[11px] font-extrabold text-[#16a34a]">{Math.round((1 - Number(pkg.price) / Number(pkg.old_price)) * 100)}% OFF</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 items-center mt-auto">
                      <button
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className="flex-1 h-9 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center justify-center"
                      >
                        Details
                      </button>

                      <Link
                        href={`/book?package=${encodeURIComponent(pkg.name)}`}
                        className="flex-grow bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl text-[10px] shadow-sm uppercase tracking-wider flex items-center justify-center gap-1 font-extrabold transition-all h-9 flex items-center justify-center text-center"
                      >
                        BOOK NOW
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Booking Form (Full Details, 2-Column Desktop) ── */}
        <section className="hidden lg:block py-16 bg-transparent border-y border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/50 to-sky-200/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          
          <div className="max-w-[1260px] mx-auto px-4 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Text & Features */}
              <div className="lg:col-span-7 lg:pr-8">
                <span className="inline-block bg-white text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-4 shadow-sm border border-blue-100">Quick Booking</span>
                <h2 className="text-[#0f2d5e] text-4xl lg:text-5xl font-black mb-5 leading-tight">Book a Test at Home</h2>
                <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 max-w-xl">
                  Safe, hygienic, and incredibly fast. Search for your tests, choose a time slot, and our expert phlebotomists will arrive at your doorstep. Get accurate reports digitally within 24 hours.
                </p>
                <ul className="space-y-4 text-sm font-semibold text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-extrabold">✓</span>
                    <span>NABL Accredited accuracy and reliability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-extrabold">✓</span>
                    <span>100% sterile vacuum containers used for collection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-extrabold">✓</span>
                    <span>Strict cold-chain logistics ensures sample integrity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-extrabold">✓</span>
                    <span>Secure digital reports delivered straight to WhatsApp</span>
                  </li>
                </ul>
              </div>
              
              {/* Right Column: Booking Widget */}
              <div className="lg:col-span-5 relative">
                {/* Add a subtle highlight behind the form */}
                <div className="absolute inset-0 bg-blue-100/50 blur-2xl transform scale-105 rounded-[3rem] -z-10"></div>
                <QuickBookingForm formState={formState} setFormState={setFormState} handleContactSubmit={handleContactSubmit} formStatus={formStatus} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Speciality Tests ── */}
        <section className="py-14 bg-gradient-to-b from-transparent to-blue-50/50 border-t border-blue-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="mb-10 text-center">
              <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-sm">Our Specialities</span>
              <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Speciality Tests</h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
                Accurate and reliable diagnostics for all your health needs, with advanced testing across multiple specialties.
              </p>
              <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
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
                  whileHover={{ y: -6 }}
                  className="rounded-3xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)',
                    border: '1px solid rgba(125,199,232,0.3)',
                    boxShadow: '0 8px 28px rgba(14,165,233,0.08)',
                  }}
                >
                  <Link href={s.href} className="group flex flex-col items-center p-4 sm:p-5 h-full">
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden"
                      style={{
                        background: 'linear-gradient(145deg, rgba(224,242,254,0.95) 0%, rgba(186,230,255,0.5) 100%)',
                        border: '1px solid rgba(125,199,232,0.25)',
                      }}
                    >
                      <Image 
                        src={optimizeCloudinaryUrl(s.icon, { w: 190, h: 190 })} 
                        alt="" 
                        width={160} 
                        height={160} 
                        unoptimized
                        className={`w-full h-full object-contain mix-blend-multiply ${s.title === "GASTROENTEROLOGY" ? "scale-[1.4]" : "scale-110"}`} 
                      />
                    </div>
                    <h3 className="font-extrabold text-[#0c4a6e] group-hover:text-[#0284c7] text-[11px] tracking-wider leading-tight transition-colors text-center">{s.title}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/speciality-tests" className="inline-block bg-[#2563eb] !text-white font-extrabold px-10 py-3 rounded-full hover:bg-[#1d4ed8] transition-colors shadow-md text-sm" style={{ color: '#ffffff' }}>
                <span className="!text-white font-black" style={{ color: '#ffffff' }}>View All Speciality Tests</span>
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
        <section className="py-14 bg-transparent border-t border-blue-100">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="mb-10 text-center">
              <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Our Experts</span>
              <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Meet Our Team</h2>
              <p className="text-slate-600 text-sm max-w-2xl mx-auto font-medium">
                Combining over four decades of medical expertise, our team delivers exceptional diagnostic services with a commitment to precision and care.
              </p>
              <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", role: "Founder & CEO", slug: "dr-shantakumar-muruda", image: "/images/dr_shantakumar_new.jpg", imagePosition: "center top", imageScale: 1.3, imageTranslateY: "-24%" },
                { name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", role: "Senior Consultant", slug: "dr-pritilata-rout", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png" },
                { name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", role: "Senior Consultant", slug: "dr-ajitha-pillai", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg" },
                { name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", role: "Consultant Pathologist", slug: "dr-naveen-kumar-n", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg" },
              ].map((doc: any) => (
                <Link
                  href={`/${doc.slug}`}
                  key={doc.name}
                  className="group rounded-3xl overflow-hidden flex flex-col text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)',
                    border: '1px solid rgba(125,199,232,0.3)',
                    boxShadow: '0 8px 28px rgba(14,165,233,0.08)',
                  }}
                >
                  <div className="relative aspect-square overflow-hidden bg-sky-50">
                    <Image src={doc.image} alt={doc.name} width={280} height={280}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ 
                        objectPosition: doc.imagePosition || 'top',
                        transform: doc.imageScale ? `scale(${doc.imageScale}) ${doc.imageTranslateY ? `translateY(${doc.imageTranslateY})` : ''}` : 'none'
                      }}
                      onError={(e) => { e.currentTarget.srcset = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"; }} />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <div className="px-4 pb-5 pt-1">
                    <h3 className="font-extrabold text-[#0c4a6e] text-[15px] mb-1.5 leading-snug">{doc.name}</h3>
                    <span
                      className="inline-block text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full mb-2"
                      style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)' }}
                    >
                      {doc.role}
                    </span>
                    <p className="text-[11px] font-bold text-[#0284c7] uppercase tracking-wider">{doc.qual}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Promo Highlights Slider — After Meet Our Team ── */}
        <PromoHighlightSlider />
        <BlogSlider />

        {/* ── Form and Maps ── */}
        <section className="py-16 bg-transparent border-t border-gray-150">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Contact Form */}
              <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-[#2563eb]/10 shadow-sm">
                <span className="inline-block bg-white text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-sm">Get in Touch</span>
                <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-2">Book a Test / Inquiry</h2>
                <p className="text-slate-600 text-sm font-medium mb-6">Fill out the form below and our team will contact you shortly.</p>
                
                <form className="flex flex-col gap-4" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input type="text" required placeholder="John Doe" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value.replace(/[^a-zA-Z\s]/g, '')})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                      <input type="tel" required placeholder="+91 9964 639 639" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value.replace(/\D/g, '')})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Service</label>
                    <button
                      type="button"
                      onClick={() => setShowContactServiceDropdown(!showContactServiceDropdown)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all text-left flex justify-between items-center text-slate-700"
                    >
                      {formState.service}
                      <svg className={`w-4 h-4 transition-transform ${showContactServiceDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showContactServiceDropdown && (
                      <div className="absolute top-[68px] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-30 flex flex-col py-2 overflow-hidden">
                        {['Home Collection', 'Lab Visit', 'General Inquiry'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => { setFormState({...formState, service: opt}); setShowContactServiceDropdown(false); }}
                            className={`text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${formState.service === opt ? 'font-bold text-[#2563eb] bg-blue-50/50' : 'text-slate-600'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                    <textarea rows={3} placeholder="How can we help you?" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all resize-none"></textarea>
                  </div>
                  {formStatus === 'success' && <p className="text-green-600 text-xs font-bold">Your inquiry has been submitted successfully!</p>}
                  {formStatus === 'error' && <p className="text-red-600 text-xs font-bold">There was an error submitting your inquiry. Please try again or contact us via WhatsApp.</p>}
                  <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-[#2563eb] text-white font-extrabold px-6 py-3.5 rounded-xl shadow-md hover:bg-[#1d4ed8] transition-all mt-2 text-sm uppercase tracking-wider disabled:opacity-70">
                    {formStatus === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                  </button>
                </form>
              </div>

              {/* Google Map */}
              <div className="flex flex-col">
                <span className="inline-block bg-[#dbeafe] text-[#1d4ed8] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3 w-fit">Our Location</span>

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

        {/* ── Accreditation / Reviews / FAQs (desktop) ── */}
        <Accreditations />
        {/* ── App Download Banner (after Certified for Excellence) ── */}
        <AppDownloadBanner />
        <ReviewsSection />
        <FaqSection />
        <SeoContent />
      </div>

      {/* ── MOBILE VIEW (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col w-full overflow-x-hidden">


        {/* Mobile Hero Slider */}
        <section className="w-full bg-transparent pb-2">
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
                {slide.imageOnly ? (
                  <div className="mx-3 mt-2 rounded-2xl overflow-hidden shadow-md relative h-[220px]">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={idx === 0}
                    />
                    {/* Book Now overlay */}
                    <a
                      href={slide.ctaLink || '/book?package=QXL%20Freedom%2080%20Health%20Check'}
                      className="absolute bottom-3 right-3 bg-[#FF9933] text-white font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wide shadow-md active:scale-95 transition-all z-20"
                    >
                      BOOK NOW @ ₹800
                    </a>
                  </div>
                ) : (
                  /* Content slides — text left, image right */
                  <div
                    className="mx-3 mt-2 rounded-2xl overflow-hidden flex flex-row items-stretch border border-amber-200/60 shadow-md"
                    style={{
                      minHeight: '260px',
                      background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #f0fdf4 100%)'
                    }}
                  >
                    {/* Left: Text Content */}
                    <div className="flex-1 flex flex-col justify-center px-4 py-4 z-10 text-left">
                      {slide.badge && (
                        <div className="flex flex-col gap-1 mb-1.5 w-fit">
                          <span className="inline-block bg-[#f97316] text-white text-[8px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase border border-orange-300 shadow-xs">
                            {slide.badge}
                          </span>
                          {slide.flagAnimation && !countdown.expired && (
                            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-300 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse whitespace-nowrap">
                              ⏰ Ends: {countdown.d}d {countdown.h}h {countdown.m}m {countdown.s}s
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-[14px] font-black text-[#0f2d5e] leading-tight mb-0.5">
                        {slide.title}
                      </p>
                      {slide.titleAccent && (
                        <p className="text-[14px] font-black text-[#0f2d5e] leading-tight mb-1">
                          {slide.titleAccent}
                        </p>
                      )}
                      {slide.subtitle && (
                        <p className="text-[10px] font-bold text-slate-700 mb-0.5">{slide.subtitle}</p>
                      )}
                      {slide.subtitleAccent && (
                        <p className="text-[10px] font-black text-[#0284c7] mb-2">{slide.subtitleAccent}</p>
                      )}
                      {slide.cta && (
                        <Link
                          href={slide.ctaLink}
                          className="inline-block bg-[#2563eb] text-white font-black px-4 py-1.5 rounded-full text-[10px] w-fit mt-1 shadow-md active:scale-95 transition-transform uppercase tracking-wider"
                        >
                          {slide.cta}
                        </Link>
                      )}
                    </div>
                    {/* Right: Image */}
                    <div className="w-[125px] flex-shrink-0 relative overflow-hidden rounded-r-2xl bg-white/20">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="125px"
                        className="object-cover object-center"
                        style={{ imageRendering: 'auto' }}
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dots removed as requested */}
        </section>

        {/* ── NEW MOBILE Action Grid (Agilus Style 2x2) ── */}
        <section className="px-4 py-4 bg-transparent flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#eafaf1] hover:bg-[#dcfce7] border border-[#bbf7d0] rounded-2xl p-3.5 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-[#166534] text-xs leading-tight">Book via<br/>WhatsApp</span>
            </a>
            
            <a
              href="tel:+919964639639"
              className="flex items-center gap-3 bg-[#e0f2fe] hover:bg-[#bae6fd] border border-[#7dd3fc] rounded-2xl p-3.5 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-[#0284c7] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-[#0369a1] text-xs leading-tight">Book via<br/>Call</span>
            </a>

            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="flex items-center gap-3 bg-[#fef3c7] hover:bg-[#fde68a] border border-[#fcd34d] rounded-2xl p-3.5 active:scale-95 transition-transform text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-[#92400e] text-xs leading-tight">Upload<br/>and Book</span>
            </button>

            <Link
              href="/book"
              className="flex items-center gap-3 bg-[#f3e8ff] hover:bg-[#e9d5ff] border border-[#d8b4fe] rounded-2xl p-3.5 active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-[#9333ea] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-[#6b21a8] text-xs leading-tight">Find Nearby<br/>Labs</span>
            </Link>
          </div>
        </section>



        {/* ── MOBILE Explore by Health Need (Agilus Layout) ── */}
        <section className="py-5 bg-transparent border-t border-gray-100">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-[#0d2e42] font-black text-lg leading-tight">Explore by Health Need</h2>
            <Link href="/speciality-tests" className="text-[#2563eb] text-[11px] font-bold">View All</Link>
          </div>

          {/* Featured Full Body Checkups Pill Card (Agilus style) */}
          <div className="px-4 mb-3">
            <Link
              href="/book?package=QXL%20Freedom%2080%20Health%20Check"
              className="w-full bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between shadow-xs transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#2563eb] flex items-center justify-center font-extrabold text-base">
                  🩸
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[#0f2d5e] text-sm">Full Body Checkups</span>
                  <span className="text-[10px] text-slate-500 font-bold">80 Parameters @ ₹800</span>
                </div>
              </div>
              <span className="bg-[#2563eb] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                POPULAR
              </span>
            </Link>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 px-4 pb-2">
            {bodyOrgans.map((organ, idx) => (
              <Link
                key={idx}
                href="/speciality-tests"
                className="w-[95px] flex-shrink-0 snap-center bg-[#f8fafc] rounded-2xl border border-slate-200/80 p-3 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden relative border border-white shadow-xs">
                  <Image src={organ.image} alt={organ.name} fill className="object-cover" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f2d5e] text-center leading-tight">{organ.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recommended Packages — one per screen, full-width snap scroll */}
        <section className="py-4 bg-transparent border-t border-gray-100">
          <div className="flex items-center justify-between px-4 mb-3">
            <div>
              <p className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Health Packages</p>
              <p className="text-[#0d2e42] font-extrabold text-base leading-tight">Recommended Packages</p>
            </div>
            <Link href="/packages" className="text-[#2563eb] text-xs font-bold flex items-center gap-0.5">
              View all packages <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-0">
            {recommendedPackages.map((pkg, idx) => (
              <div
                key={idx}
                className="w-[calc(100vw-32px)] mx-4 flex-shrink-0 snap-center bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden"
              >
                {/* Top colour strip */}
                <div className={`px-4 py-3 flex items-center justify-between ${pkg.most_booked ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6]'}`}>
                  <span className="text-[10px] font-extrabold text-white/90 uppercase tracking-widest flex items-center gap-1">
                    {pkg.most_booked && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    )}
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
                  <div className="cursor-pointer flex flex-col gap-3" onClick={() => setSelectedPackage(pkg)}>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-extrabold text-[#0d2e42] text-[15px] leading-snug">{pkg.name}</h3>
                      <span className="text-[9px] font-extrabold text-[#0284c7] bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">Details 🔍</span>
                    </div>

                    {pkg.includes && !collapsedMobileDesc[pkg.name] && (
                      <div className="relative">
                        <p className="text-[11px] text-slate-600 bg-blue-50 px-3 py-2 rounded-xl font-medium leading-relaxed pr-12">
                          {pkg.includes}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCollapsedMobileDesc(prev => ({ ...prev, [pkg.name]: true }));
                          }}
                          className="absolute right-2 bottom-2 text-[10px] font-bold text-[#0284c7] hover:text-[#0369a1] bg-sky-50/90 hover:bg-sky-100/90 px-2.5 py-0.5 rounded-lg border border-sky-200/50 shadow-sm"
                        >
                          Hide
                        </button>
                      </div>
                    )}
                    {pkg.includes && collapsedMobileDesc[pkg.name] && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCollapsedMobileDesc(prev => ({ ...prev, [pkg.name]: false }));
                        }}
                        className="text-left text-[11px] font-bold text-sky-600 hover:text-[#2563eb] py-1 flex items-center gap-1"
                      >
                        + Show Description
                      </button>
                    )}

                    <p className="text-[11px] text-slate-600 font-semibold">🏠 Free Home Collection Available</p>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
                    <div>
                      {pkg.old_price && (
                        <p className="text-[11px] text-slate-500 line-through font-medium">₹{pkg.old_price}</p>
                      )}
                      <p className="font-black text-[#0d2e42] text-[22px] leading-tight">₹{pkg.price}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        type="button"
                        onClick={() => handleToggleCart(pkg.name)}
                        className={`h-9 px-4 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all border cursor-pointer flex items-center justify-center ${
                          cartItems.includes(pkg.name)
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {cartItems.includes(pkg.name) ? "✓ Added" : "+ Cart"}
                      </button>
                      <Link
                        href={`/book?package=${encodeURIComponent(pkg.name)}`}
                        className="bg-[#2563eb] text-white text-[12px] font-extrabold px-5 py-2.5 rounded-xl active:scale-95 transition-transform shadow-md h-9 flex items-center justify-center"
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

          {/* ── Quick Booking Form (Mobile - Full Details) ── */}
          <div className="lg:hidden bg-transparent py-8 border-y border-blue-100">
            <div className="px-4 mb-6">
              <span className="inline-block bg-white text-[#2563eb] text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2 shadow-sm border border-blue-100">Quick Booking</span>
              <h2 className="text-[#0f2d5e] text-2xl font-black leading-tight mb-2">Book a Test at Home</h2>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">Search your tests, pick a time slot, and we'll collect the sample right from your home safely.</p>
            </div>
            <div className="px-4">
              <QuickBookingForm formState={formState} setFormState={setFormState} handleContactSubmit={handleContactSubmit} formStatus={formStatus} />
            </div>
          </div>

        {/* Speciality Tests — full vertical list */}
        <section className="bg-transparent border-t border-gray-100">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div>
              <p className="text-[10px] font-extrabold text-[#2563eb] uppercase tracking-widest">Our Specialities</p>
              <p className="text-[#0d2e42] font-extrabold text-base leading-tight">Speciality Tests</p>
            </div>
            <Link href="/speciality-tests" className="text-[#2563eb] text-xs font-bold flex items-center gap-0.5">
              View all speciality tests <ChevronRight className="w-3.5 h-3.5" />
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
                    src={optimizeCloudinaryUrl(spec.icon, { w: 96, h: 96 })}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className={`w-12 h-12 object-contain mix-blend-multiply ${spec.title === "Gastroenterology" ? "scale-[1.4]" : "scale-110"}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-[#0d2e42] text-[13px] leading-tight">{spec.title}</p>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">{spec.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 group-active:text-[#2563eb] transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* Mobile Why Choose QXL Slides */}
        <MobileWhyChooseSlider />

        {/* AI Powered Diagnostics (Mobile is inside the component) */}
        <AiDiagnostics decorativeHeading />

        {/* Technologies removed */}



        {/* Home Collection */}
        <HomeCollectionSection decorativeHeading />

        {/* Meet Our Team */}
        <section className="py-8 bg-transparent border-t border-blue-100">
          <div className="px-4">
            <div className="mb-6 text-center">
              <span className="inline-block bg-blue-50 text-[#2563eb] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest mb-1.5">Our Experts</span>
              <p className="text-[#0f2d5e] text-xl font-extrabold">Meet Our Team</p>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Combining over four decades of medical expertise, our team delivers exceptional diagnostic services with a commitment to precision and care.
              </p>
              <div className="w-10 h-0.5 bg-[#2563eb] mx-auto rounded-full mt-3" />
            </div>
            <div className="flex overflow-x-auto gap-4 scrollbar-none pb-4 snap-x snap-mandatory">
              {[
                { name: "Dr. Shantakumar Muruda", qual: "MD, BIOCHEMISTRY", image: "/images/dr_shantakumar_new.jpg", imagePosition: "center top", imageScale: 1.3, imageTranslateY: "-24%" },
                { name: "Dr. Pritilata Rout", qual: "MD, PATHOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png" },
                { name: "Dr. Ajitha Pillai", qual: "MD, MICROBIOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg" },
                { name: "Dr. Naveen Kumar N", qual: "DCP, DNB PATHOLOGY", image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg" },
              ].map((doc: any) => (
                <div key={doc.name} className="w-[180px] bg-white rounded-2xl overflow-hidden flex flex-col items-center p-3 text-center border border-gray-100 shadow-sm flex-shrink-0 snap-start">
                  <div className="w-36 h-36 rounded-xl overflow-hidden mb-3 bg-[#f8fafc] flex items-center justify-center">
                    <Image src={doc.image} alt={doc.name} width={144} height={144}
                      className="w-full h-full object-cover"
                      style={{ 
                        objectPosition: doc.imagePosition || 'top',
                        transform: doc.imageScale ? `scale(${doc.imageScale}) ${doc.imageTranslateY ? `translateY(${doc.imageTranslateY})` : ''}` : 'none',
                      }}
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
        {/* Mobile App Download Banner */}
        <BlogSlider decorativeHeading />

        {/* Contact Form and Location Map */}
        <section className="py-8 bg-transparent border-t border-gray-150">
          <div className="px-4 flex flex-col gap-8">
            {/* Form */}
            <div className="bg-[#f0f9ff] p-5 rounded-2xl border border-[#2563eb]/10 shadow-sm">
              <span className="inline-block bg-white text-[#2563eb] text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2 shadow-xs">Get in Touch</span>
              <p className="text-[#0f2d5e] text-lg font-extrabold mb-1">Book a Test / Inquiry</p>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">Fill out the form below and our team will contact you shortly.</p>
              
              <form className="flex flex-col gap-3" onSubmit={handleContactSubmit}>
                <input type="text" required placeholder="Full Name" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value.replace(/[^a-zA-Z\s]/g, '')})} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                <input type="tel" required placeholder="Phone Number" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value.replace(/\D/g, '')})} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all" />
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowContactServiceDropdown(!showContactServiceDropdown)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all text-left flex justify-between items-center text-slate-700"
                  >
                    {formState.service}
                    <svg className={`w-3.5 h-3.5 transition-transform ${showContactServiceDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {showContactServiceDropdown && (
                    <div className="absolute top-[42px] left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-30 flex flex-col py-1.5 overflow-hidden">
                      {['Home Collection', 'Lab Visit', 'General Inquiry'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setFormState({...formState, service: opt}); setShowContactServiceDropdown(false); }}
                          className={`text-left px-3 py-2.5 text-xs hover:bg-blue-50 transition-colors ${formState.service === opt ? 'font-bold text-[#2563eb] bg-blue-50/50' : 'text-slate-600'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <textarea rows={3} placeholder="Message" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all resize-none"></textarea>
                
                {formStatus === 'success' && <p className="text-green-600 text-[10px] font-bold">Inquiry submitted successfully!</p>}
                {formStatus === 'error' && <p className="text-red-600 text-[10px] font-bold">Error submitting. Try again.</p>}
                
                <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-[#2563eb] text-white font-extrabold py-3 rounded-xl shadow-sm hover:bg-[#1d4ed8] transition-all text-xs uppercase tracking-wider mt-1 disabled:opacity-70">
                  {formStatus === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="flex flex-col">
              <span className="inline-block bg-[#dbeafe] text-[#1d4ed8] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2 w-fit">Our Location</span>
              <p className="text-slate-600 text-xs mb-3 leading-relaxed">Conveniently located in Bengaluru, providing state-of-the-art diagnostic facilities.</p>
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

        {/* Accreditation / Reviews / FAQs (mobile — decorative headings; desktop owns real H2s) */}
        <Accreditations decorativeHeading />
        {/* ── App Download Banner (mobile, after Certified for Excellence) ── */}
        <AppDownloadBanner />

        {/* Reviews */}
        <ReviewsSection decorativeHeading />

        {/* FAQs */}
        <FaqSection decorativeHeading />

        {/* SEO Content */}
        <SeoContent />
      </div>

      <PrescriptionModal isOpen={isPrescriptionModalOpen} onClose={() => setIsPrescriptionModalOpen(false)} />

      {selectedPackage && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl relative border border-blue-100 max-h-[85vh] flex flex-col my-auto overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-white sticky top-0 z-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#2563eb] text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                    {selectedPackage.tag || "HEALTH PACKAGE"}
                  </span>
                  {selectedPackage.most_booked && (
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold shadow-[0_0_12px_rgba(249,115,22,0.4)] border border-orange-400 tracking-wider">
                      ⭐ MOST BOOKED
                    </span>
                  )}
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  {selectedPackage.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center font-black text-base cursor-pointer transition-colors shadow-sm shrink-0 ml-3"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="flex items-baseline gap-3 bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
                <span className="text-3xl font-black text-slate-900">₹{selectedPackage.price}</span>
                <span className="text-sm text-slate-400 line-through">₹{selectedPackage.old_price}</span>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full">
                  Save ₹{Number(selectedPackage.old_price) - Number(selectedPackage.price)} ({Math.round((1 - Number(selectedPackage.price) / Number(selectedPackage.old_price)) * 100)}% OFF)
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-1">Included Diagnostic Tests</h4>
                <p className="text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed font-semibold text-xs md:text-sm">
                  {selectedPackage.includes}
                </p>
              </div>

              {selectedPackage.who_should_take && (
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-1">Ideal For</h4>
                  <p className="text-slate-600 font-medium text-xs md:text-sm">
                    {selectedPackage.who_should_take} ({selectedPackage.age || "All ages"}, {selectedPackage.gender || "Both"})
                  </p>
                </div>
              )}

              {selectedPackage.benefits && selectedPackage.benefits.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2">Key Highlights</h4>
                  <ul className="space-y-1.5">
                    {selectedPackage.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                        <span className="text-emerald-500 font-extrabold">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 text-xs text-slate-500 flex items-center gap-4 font-semibold">
                <span>🏠 Free Home Collection</span>
                <span>📋 NABL Accredited (MC-6849)</span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  handleToggleCart(selectedPackage.name);
                  setSelectedPackage(null);
                }}
                className={`flex-1 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border cursor-pointer ${
                  cartItems.includes(selectedPackage.name)
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cartItems.includes(selectedPackage.name) ? "✓ Added to Cart" : "+ Add to Cart"}
              </button>

              <Link
                href={`/book?package=${encodeURIComponent(selectedPackage.name)}`}
                onClick={() => setSelectedPackage(null)}
                className="flex-1 text-center bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 !text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md border border-white/30"
                style={{ color: '#ffffff' }}
              >
                <span className="!text-white font-black" style={{ color: '#ffffff' }}>BOOK NOW</span>
                <span className="animate-pulse !text-white font-black" style={{ color: '#ffffff' }}>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      <CallbackModal />

      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
