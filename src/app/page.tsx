"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, FileText, MessageCircle, CheckCircle, MapPin, Building2, Phone, Sparkles, Microscope } from "lucide-react";
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
import EmotionalFamilySection from "../components/EmotionalFamilySection";
import DoctorLedLabSection from "../components/DoctorLedLabSection";
import RunningTextMarquee from "../components/RunningTextMarquee";
import RakshaOfferCard from "../components/rakshaBandhan/RakshaOfferCard";
import MobileTrustBadges from "../components/MobileTrustBadges";
import SmartSearchBar from "../components/SmartSearchBar";


// ── Why Choose QXL — 10 Specialty Slides ─────────────────────────────────────
const whySlides = [
  {
    specialty: "BONE DISORDERS",
    titlePlain: "Bone Disorders",
    titleAccent: "Panel",
    highlight: "Calcium · Phosphorus · Vitamin D · ALP",
    sub: "Detect osteoporosis, fracture risk, and bone density issues early with a targeted bone health assessment.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150389/Assets-QXL/legacy-assets/image/spec_bone.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "CARDIOLOGY",
    titlePlain: "Cardiology",
    titleAccent: "Heart Risk Assessment",
    highlight: "Lipids · hs-CRP · NT-proBNP · Homocysteine",
    sub: "Comprehensive cardiac risk profiling — covering lipid disorders, inflammation markers, and heart stress indicators.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150392/Assets-QXL/legacy-assets/image/spec_cardiology.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "ENDOCRINOLOGY",
    titlePlain: "Endocrinology",
    titleAccent: "Hormone & Thyroid Panel",
    highlight: "TSH · T3 · T4 · Cortisol · Insulin",
    sub: "Full hormonal mapping including thyroid, adrenal, and metabolic hormones — essential for energy and wellness.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "GASTROENTEROLOGY",
    titlePlain: "Gastroenterology",
    titleAccent: "Gut & Liver Panel",
    highlight: "H.pylori · Liver Function · Calprotectin",
    sub: "Identify digestive disorders, liver disease, gut infections, and inflammation from a single comprehensive profile.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "HEMATOLOGY",
    titlePlain: "Hematology",
    titleAccent: "Complete Blood Analysis",
    highlight: "CBC · ESR · Iron Studies · Peripheral Smear",
    sub: "Detect anaemia, blood cell disorders, clotting abnormalities, and infection through a detailed blood workup.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150417/Assets-QXL/legacy-assets/image/spec_hematology.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "INFECTIOUS DISEASES",
    titlePlain: "Infectious Diseases",
    titleAccent: "Immunity & Infection Panel",
    highlight: "Fever Panel · Dengue · Typhoid · Covid · HIV",
    sub: "From common viral fever to complex infections — early identification for fast, targeted treatment.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150422/Assets-QXL/legacy-assets/image/spec_infectious.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "ONCOLOGY",
    titlePlain: "Oncology",
    titleAccent: "Cancer Marker Screening",
    highlight: "AFP · CEA · PSA · CA-125 · CA-19.9",
    sub: "Early cancer marker screening across multiple organs — giving you the best chance for timely intervention.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150430/Assets-QXL/legacy-assets/image/spec_oncology.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "NEUROLOGY",
    titlePlain: "Neurology",
    titleAccent: "Brain & Nerve Health",
    highlight: "Homocysteine · B12 · Thyroid · Vitamin D",
    sub: "Nutritional and metabolic factors that drive neurological disorders — identified and addressed proactively.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150423/Assets-QXL/legacy-assets/image/spec_neurology.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "UROLOGY",
    titlePlain: "Urology",
    titleAccent: "Kidney & Urinary Panel",
    highlight: "Creatinine · Urea · BUN · Urine Microscopy",
    sub: "Monitor kidney function, detect urinary tract infections, and assess renal health through precise biomarkers.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png",
    imgBg: "#FFF8EB",
  },
  {
    specialty: "WOMEN'S HEALTH",
    titlePlain: "Women's Health",
    titleAccent: "Complete Wellness Panel",
    highlight: "FSH · LH · AMH · Thyroid · CBC · Vit D",
    sub: "From fertility and hormonal health to thyroid and nutrition — a dedicated panel designed for every woman's body.",
    image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png",
    imgBg: "#FFF8EB",
  },
];

function WhyChooseSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % whySlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActive((prev) => (prev + 1) % whySlides.length);
  const prev = () => setActive((prev) => (prev - 1 + whySlides.length) % whySlides.length);

  const slide = whySlides[active];

  return (
    <section className="py-4 sm:py-8 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-t border-[#F3DBA7]/40 relative overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-6">
          <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[9.5px] sm:text-[10.5px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-1.5 shadow-2xs">
            Our Specialities
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-[#0f2d5e] mb-1">
            The QXL Difference
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Excellence in every test, care in every result.
          </p>
          <div className="w-12 h-1 bg-[#D69A18] mx-auto mt-2 rounded-full" />
        </div>

        {/* Slide Card Container (Compact Stacked Mobile / Desktop Split) */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#F3DBA7] shadow-md flex flex-col md:flex-row transition-all duration-300">
          
          {/* Left / Top Image Panel */}
          <div className="w-full md:w-[40%] h-[120px] sm:h-[180px] md:h-auto flex-shrink-0 relative overflow-hidden bg-[#FFF8EB] border-b md:border-b-0 md:border-r border-[#F3DBA7]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center p-2 sm:p-4"
              >
                <img
                  src={slide.image}
                  alt={slide.specialty}
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right / Content Panel */}
          <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-6 md:pl-8 md:pr-10 text-left z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5"
              >
                <span className="inline-block bg-[#D69A18] text-white text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  {slide.specialty}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-[#0f2d5e] leading-tight">
                  {slide.titlePlain}{" "}<span className="text-[#D69A18]">{slide.titleAccent}</span>
                </h3>
                <p className="text-[#D69A18] font-black text-xs">{slide.highlight}</p>
                <p className="text-slate-600 text-[11.5px] sm:text-xs font-medium leading-relaxed max-w-lg">{slide.sub}</p>
                
                <div className="pt-2">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-1.5 bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold px-4 py-2 rounded-xl text-[11px] uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Controls / Dots & Arrows Bar */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
              <div className="flex items-center gap-1">
                {whySlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      active === i ? "w-5 bg-[#D69A18]" : "w-1.5 bg-amber-200 hover:bg-amber-300"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="w-7 h-7 rounded-full bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] hover:bg-[#D69A18] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="w-7 h-7 rounded-full bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] hover:bg-[#D69A18] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}



// ── Promo: QXL Packages Slider — Desktop ──────────────────────────────────────
const promoSlides = [
  {
    name: "Raksha Bandhan Special Checkup",
    price: "₹800",
    original: "₹5,800",
    tag: "FESTIVE OFFER",
    desc: "Comprehensive 80 health parameters screening covering 8 major health areas — gift health to your sibling.",
    includes: ["CBC (26), HbA1c & Glucose (3)", "Lipid Profile (8), Liver Function (11)", "Kidney Function (8), Thyroid Profile (3)", "Bone, Mineral & Urine Analysis (21)"],
    tests: "80 Parameters",
    image: "/images/posters/165a1294-8527-4943-ba13-ac45a6139251.jpeg",
    imgBg: "#FFF7ED",
    ctaLink: "/raksha-bandhan-health-checkup-bangalore",
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

function QuickBookingForm({ formState, setFormState, handleContactSubmit, formStatus }: any) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-blue-100 shadow-[0_8px_30px_rgba(37,99,235,0.08)] relative z-10">
      <div className="mb-3 md:mb-6">
        <h3 className="text-lg md:text-xl font-bold text-[#0f2d5e] mb-0.5 md:mb-1">Request a Call Back</h3>
        <p className="text-xs md:text-sm text-slate-500 font-medium">Leave your number and we'll call you right away.</p>
      </div>
      
      <form className="flex flex-col gap-3 md:gap-5" onSubmit={handleContactSubmit}>
        <div>
          <label className="block text-[11px] md:text-xs font-bold text-slate-700 mb-1 md:mb-1.5 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
          <input type="text" required placeholder="Enter your name" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value.replace(/[^a-zA-Z\s]/g, '')})} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl md:rounded-2xl px-3.5 py-2.5 md:px-5 md:py-4 text-xs md:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-xs" />
        </div>
        <div>
          <label className="block text-[11px] md:text-xs font-bold text-slate-700 mb-1 md:mb-1.5 uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
          <input type="tel" required placeholder="+91 Contact number" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value.replace(/\D/g, '')})} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl md:rounded-2xl px-3.5 py-2.5 md:px-5 md:py-4 text-xs md:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-xs" />
        </div>

        <div>
          <label className="block text-[11px] md:text-xs font-bold text-slate-700 mb-1 md:mb-1.5 uppercase tracking-wider">Message (Optional)</label>
          <textarea rows={1} placeholder="Any specific requirements?" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl md:rounded-2xl px-3.5 py-2 md:px-5 md:py-4 text-xs md:text-sm font-semibold text-[#0f2d5e] placeholder:text-slate-400 focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all shadow-xs resize-none" />
        </div>
        
        <div className="pt-1 md:pt-2">
          <button type="submit" disabled={formStatus === 'loading'} className="w-full bg-[#2563eb] text-white font-black px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-md hover:bg-[#1d4ed8] active:scale-[0.98] transition-all text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2">
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
}

function useCountdown() {
  const target = new Date('2026-08-31T23:59:59+05:30').getTime();
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
  const [mobileOfferIndex, setMobileOfferIndex] = useState(0);
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const mobileOfferBanners = [
    {
      badge: "🎁 SPECIAL OFFER",
      title: "Raksha Bandhan Checkup",
      sub: "Comprehensive 80 essential health parameters",
      price: "₹800",
      bgGradient: "bg-gradient-to-br from-sky-50/95 via-cyan-50/90 to-blue-50/80 border border-sky-200/90 shadow-sm",
      badgeStyle: "bg-sky-100 text-sky-950 border border-sky-200",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150239/Assets-QXL/legacy-assets/image/slide_blood_test.jpg",
      ctaLink: "/raksha-bandhan-health-checkup-bangalore"
    },
    {
      badge: "🩺 MOST POPULAR",
      title: "Full Body Checkup",
      sub: "Complete Liver, Kidney, Heart & Diabetes Panel",
      price: "₹1,900",
      bgGradient: "bg-gradient-to-br from-indigo-50/95 via-blue-50/90 to-sky-50/80 border border-indigo-200/90 shadow-sm",
      badgeStyle: "bg-indigo-100 text-indigo-950 border border-indigo-200",
      image: "https://res.cloudinary.com/btjglif5/image/upload/v1784150207/Assets-QXL/legacy-assets/image/home_blood_draw.jpg",
      ctaLink: "/packages"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMobileOfferIndex((prev) => (prev + 1) % mobileOfferBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [mobileOfferBanners.length]);

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
    
    const rakshaBandhanPackage = {
      id: "raksha-bandhan-800",
      name: "Raksha Bandhan Special Health Checkup",
      price: "800",
      originalPrice: "5800",
      original_price: "5800",
      tag: "FESTIVE OFFER",
      badge: "SAVE ₹5,000",
      description: "Comprehensive 80 health parameters screening covering 8 major health areas — gift health to your sibling.",
      parameterCount: 80,
      parameters_count: 80,
      includes: [
        "Complete Blood Count (26 parameters)",
        "Diabetes & Sugar (HbA1c & Fasting Glucose)",
        "Lipid Profile (8 parameters)",
        "Liver Function Panel (11 parameters)",
        "Kidney Function Panel (8 parameters)",
        "Thyroid Profile (3 parameters)",
        "Bone, Mineral & Urinary Analysis (21 parameters)"
      ],
      popular: true,
      isMostBooked: true,
      slug: "raksha-bandhan-health-checkup-bangalore",
    };

    const isSpidyOffer = (name?: string | null, price?: number | string | null) => {
      if (!name) return false;
      const n = String(name).toLowerCase();
      const p = Number(price);
      return (
        n.includes('spidy') || 
        n.includes('nothing') || 
        n.includes('swing') || 
        n.includes('eat') || 
        n.includes('jump') || 
        n.includes('sleep') || 
        n.includes('100% off') || 
        p === 1 || 
        p === 0
      );
    };

    // Load dynamic locations & packages safely for rendering
    setLocations(cmsStore.getAll("locations"));
    const fallbackPackages = cmsStore.getAll("packages").filter(p => !isSpidyOffer(p.name, p.price)).sort((a, b) => Number(a.price) - Number(b.price));
    setRecommendedPackages([rakshaBandhanPackage, ...fallbackPackages.filter(p => p.id !== 'raksha-bandhan-800')]);

    if (api && api.packages) {
      api.packages.list()
        .then((data) => {
          if (data && data.length > 0) {
            const cleanData = data.filter((p: any) => !isSpidyOffer(p.name, p.price));
            const sorted = cleanData.sort((a, b) => Number(a.price) - Number(b.price));
            setRecommendedPackages([rakshaBandhanPackage, ...sorted.filter(p => p.id !== 'raksha-bandhan-800')]);
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
  const mapLat = activeLocationObj?.lat || 12.9113827;
  const mapLng = activeLocationObj?.lng || 77.4850301;
  const mapSrc = `https://maps.google.com/maps?q=${mapLat},${mapLng}+(QXL+Diagnostics+Super+Speciality+Lab)&z=16&ie=UTF8&iwloc=&output=embed`;

  // ── Happy Onam Campaign Poster Slides ─────────────────────
  // ── Package & Home Collection Hero Slides ────────────────────────────────
  const contentSlides = [


    {
      badge: "DOCTOR-LED SUPER SPECIALITY LAB",
      title: "NABL ACCREDITED DIAGNOSTIC CARE",
      titleAccent: "PRECISION BLOOD & PATHOLOGY TESTING",
      subtitle: "State-of-the-art laboratory testing backed by senior consultant pathologists and microbiologists.",
      subtitleAccent: "Free Home Collection Available Across All Areas in Bengaluru",
      description: "Trusted by thousands of families and clinicians across Bengaluru for ultra-precise diagnostic testing.",
      cta: "Book a Test Now",
      ctaLink: "/book",
      ctaSecondary: "Call +91 9964 639 639",
      ctaSecondaryLink: "tel:+919964639639",
      image: "/images/posters/e630d3d6-7600-4a93-a304-02c0b772dfe9.jpeg",
      imageFit: "contain",
      bgFrom: "#f0fdf4", bgTo: "#eff6ff",
      features: ["NABL Accredited", "Doctor Reviewed", "24x7 Diagnostics", "Bengaluru Home Collection"],
    },
    {
      badge: "HEALTH CHECKUP · 8 ORGAN SYSTEMS",
      title: "PREVENTIVE FULL BODY DIAGNOSTICS",
      titleAccent: "DOCTOR-LED LABORATORY TESTING",
      subtitle: "Comprehensive organ screening for heart, liver, kidney, thyroid, blood count & bone minerals.",
      subtitleAccent: "Only ₹800 · 6-Hour Digital Reports Delivered on WhatsApp",
      description: "Trusted diagnostic testing by Bengaluru's NABL accredited super speciality laboratory.",
      cta: "Book Package @ ₹800",
      ctaLink: "/packages",
      ctaSecondary: "Call +91 9964 639 639",
      ctaSecondaryLink: "tel:+919964639639",
      image: "/images/posters/165a1294-8527-4943-ba13-ac45a6139251.jpeg",
      imageFit: "contain",
      bgFrom: "#fff7ed", bgTo: "#f0fdf4",
      features: ["80 Health Parameters", "8 Major Health Areas", "Free Home Collection", "₹800 Only (Worth ₹5,800)"],
    },
  ];

  // All hero slides
  const slides = [...contentSlides];

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
  const activeSlide: any = slides[currentSlide % (slides.length || 1)] || slides[0] || {};

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
      {/* Evergreen SEO H1 — never change this to a campaign/festive title */}
      <h1 className="sr-only">NABL-Accredited Diagnostic Lab in Bengaluru — Home Collection &amp; Same-Day Reports</h1>
      <p className="sr-only">Doctor-led NABL-accredited super-speciality diagnostic laboratory. Advanced blood tests, histopathology, molecular diagnostics and free home sample collection across Bengaluru.</p>

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
                  {activeSlide?.imageOnly ? (
                    <React.Fragment>
                      {/* Full-width image-only slide — banner fills entire slide */}
                      <motion.div
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={activeSlide.image}
                          alt={activeSlide.title || 'QXL Diagnostics'}
                          fill
                          className="object-cover object-center"
                          sizes="100vw"
                          priority
                        />
                      </motion.div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {/* Decorative Festive Background */}
                      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                      {/* Content — left side */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full md:w-[55%] px-8 md:px-12 py-8 h-full flex flex-col justify-center z-20 relative text-left overflow-hidden"
                      >
                        {/* Badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 text-[9px] font-black px-3.5 py-1.5 rounded-full tracking-widest uppercase shadow-md border border-amber-300 truncate max-w-[90%]">
                            <span>{activeSlide.badge}</span>
                          </span>

                          <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-300 text-emerald-800 text-[9.5px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                            FESTIVE SPECIAL @ ₹800
                          </span>
                        </div>

                        {/* Title — single compact block */}
                        <h2 className="text-[22px] md:text-[28px] leading-[1.15] font-black text-[#0f2d5e] mb-1 pr-4">
                          {activeSlide.title}
                        </h2>
                        <p className="text-[16px] md:text-[20px] leading-[1.2] font-extrabold text-[#2563eb] mb-2 pr-4">
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
                                  ? "bg-blue-50 border-blue-300 text-blue-800"
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
                            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-2.5 rounded-full text-[12px] shadow-md hover:shadow-lg active:scale-95 transition-all uppercase tracking-wide border border-amber-200"
                          >
                            <span className="flex items-center gap-1.5">
                              <span>{activeSlide.cta}</span>
                              <span className="text-sm">→</span>
                            </span>
                          </Link>
                          <a
                            href={activeSlide.ctaSecondaryLink}
                            className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-full text-[11px] uppercase tracking-wide border border-blue-300/80 shadow-sm transition-all"
                          >
                            {activeSlide.ctaSecondary}
                          </a>
                        </div>

                      </motion.div>

                      {/* Image / Decorative — right side, flush 50% */}
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 right-0 bottom-0 w-[50%] h-full z-10 flex items-center justify-center overflow-hidden rounded-r-3xl"
                        style={{ background: activeSlide.noImage ? 'linear-gradient(135deg, #FFF8EE 0%, #FFFBF0 50%, #F0FFF4 100%)' : 'transparent' }}
                      >
                        {activeSlide.noImage ? (
                          <div className="flex flex-col items-center justify-center w-full h-full px-6 text-center gap-3">
                            {/* Pookkalam flower motif */}
                            <div className="text-[72px] leading-none select-none" aria-hidden="true">🌸</div>
                            <div className="flex gap-1.5 flex-wrap justify-center">
                              {['🌼','🪔','🌺','🌸','🌼','🌺','🪔'].map((e, i) => (
                                <span key={i} className="text-[22px]">{e}</span>
                              ))}
                            </div>
                            <p className="text-[13px] font-extrabold text-amber-700 tracking-wide uppercase mt-1">Wishing you a joyous</p>
                            <p className="text-[28px] font-black text-[#0f2d5e] leading-tight">Happy Onam!</p>
                            <div className="flex gap-2 mt-1 flex-wrap justify-center">
                              {['🌼','🌿','🌼','🌿','🌼'].map((e, i) => (
                                <span key={i} className="text-[18px]">{e}</span>
                              ))}
                            </div>
                            <p className="text-[11px] text-slate-500 font-semibold mt-1">QXL Diagnostics Super Speciality Lab</p>
                          </div>
                        ) : (
                          <img
                            src={activeSlide.image}
                            alt={activeSlide.title}
                            className="w-full h-full object-contain object-center rounded-2xl p-1.5"
                          />
                        )}
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



        {/* ── 24x7 Diagnostic Lab Banner ── */}
        <section className="py-8 z-30 relative">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <div className="rounded-[28px] overflow-hidden shadow-xl border border-white/50 relative bg-gradient-to-r from-[#FF9933]/10 via-white to-[#138808]/10 p-8 md:p-12">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#138808]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF9933]/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-left">
                  <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-3.5 shadow-sm">
                    24×7 DIAGNOSTIC SERVICES
                  </span>
                  <h2 className="text-[28px] md:text-[38px] leading-[1.1] font-extrabold text-[#0b132b] mb-2">
                    NABL Accredited Diagnostics
                  </h2>
                  <h3 className="text-[22px] md:text-[28px] leading-[1.2] font-extrabold text-[#2563eb] mb-4">
                    Doctor-Led Diagnostic Lab in Bengaluru
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {["Blood tests", "Pathology tests", "Preventive health checkups", "Home sample collection"].map(service => (
                      <div key={service} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-slate-700 font-bold text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-6">
                    Available at all QXL centres & partner facilities across Bengaluru.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a href="tel:+919964639639" className="bg-[#2563eb] text-white font-black px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-widest flex items-center gap-2 border border-white/40">
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
                    <span className="bg-[#f0fdf4] text-[#16a34a] border border-[#dcfce7] px-3 py-1 rounded-full text-[10px] font-extrabold">{Math.round((1 - Number(pkg.price) / Number(pkg.old_price || pkg.original_price || pkg.originalPrice || 5800)) * 100)}% OFF</span>
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
                      <span className="text-xs text-slate-400 line-through font-semibold">₹{pkg.old_price || pkg.original_price || pkg.originalPrice || "5800"}</span>
                      <span className="text-[11px] font-extrabold text-[#16a34a]">{Math.round((1 - Number(pkg.price) / Number(pkg.old_price || pkg.original_price || pkg.originalPrice || 5800)) * 100)}% OFF</span>
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

        {/* ── Home Collection & Offer Ticker Bar ── */}
        <div className="w-full bg-[#059669] text-white py-3 px-2 overflow-x-auto whitespace-nowrap flex items-center z-20 shadow-inner border-y border-emerald-700/60 relative my-2">
          <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
          <div className="flex items-center gap-4 w-max min-w-full px-4 animate-marquee-fast hover:[animation-play-state:paused]">
            {[1, 2].map((repeatKey) => (
              <React.Fragment key={repeatKey}>
                <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-xs">
                  NABL ACCREDITED LAB
                </span>
                <span className="text-emerald-200 font-bold shrink-0">•</span>
                <span className="font-extrabold text-white text-[12px] tracking-wide shrink-0">
                  DOCTOR-LED DIAGNOSTICS &amp; 300+ TEST PANELS
                </span>
                <span className="text-emerald-200 font-bold shrink-0">•</span>

                <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-xs">
                  🏡 HOME COLLECTION AVAILABLE
                </span>
                <span className="text-emerald-200 font-bold shrink-0">•</span>
                <span className="font-extrabold text-white text-[12px] tracking-wide shrink-0">
                  FREE HOME SAMPLE COLLECTION ACROSS BENGALURU · SAME DAY DIGITAL REPORTS
                </span>
                <span className="text-emerald-200 font-bold shrink-0">•</span>

                <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shrink-0 shadow-xs">
                  ⚡ NABL ACCREDITED LAB
                </span>
                <span className="text-emerald-200 font-bold shrink-0">•</span>
                <span className="font-extrabold text-white text-[12px] tracking-wide shrink-0">
                  EXPERT DOCTOR-REVIEWED REPORTS · FAST & RELIABLE
                </span>
                <span className="text-emerald-200 font-bold shrink-0">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

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
                <QuickBookingForm formState={formState} setFormState={setFormState} handleContactSubmit={handleContactSubmit} formStatus={formStatus} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Raksha Bandhan Festive Offer Section ── */}
        <RakshaOfferCard onOpenBooking={(title) => setSelectedPackage({ name: title || "Raksha Bandhan Special Health Checkup", price: "800", old_price: "5800", includes: "CBC (26), HbA1c & Fasting Sugar (3), Lipid Profile (8), Liver Function (11), Kidney Function (8), Thyroid Profile (3), Bone & Urinary (21)" })} />

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

              {/* Google Map Container (Mobile Optimized & Perfectly Aligned) */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-[#FFF8EB] text-[#D69A18] border border-[#F3DBA7] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                    Our Location
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("QXL Diagnostics Kengeri Bengaluru")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-black text-[#D69A18] hover:underline flex items-center gap-1 bg-[#FFF8EB] border border-[#F3DBA7] px-3 py-1 rounded-full shadow-2xs"
                  >
                    Open in Maps &rarr;
                  </a>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm font-medium mb-3">
                  Conveniently located in Bengaluru, providing state-of-the-art super speciality diagnostic facilities.
                </p>
                
                <div className="w-full h-[250px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 relative">
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

        <ReviewsSection />
        <FaqSection />
      </div>

      {/* ── MOBILE VIEW (lg:hidden) — EXACT REFERENCE DESIGN ── */}
      <div className="lg:hidden flex flex-col w-full max-w-full overflow-x-hidden bg-white pt-[68px] pb-[85px]">

        {/* ── Top Header Section (Greeting + Search + Amber Banner + Dots) ── */}
        <div className="bg-white px-4 pt-3 sm:pt-4 pb-2">
          {/* Greeting */}
          <p className="text-[13.5px] sm:text-[14.5px] font-medium text-slate-500 mb-1">{greeting},</p>
          <h2 className="text-[23px] sm:text-[26px] font-black text-[#0f2d5e] leading-[1.18] mb-3 sm:mb-4">
            Take charge of your<br />health today!
          </h2>

          {/* Smart Search Bar */}
          <div className="mb-3 sm:mb-3.5">
            <SmartSearchBar placeholder="Search tests, checkups or health concerns" isMobile={true} />
          </div>

          {/* Popular Search Chips */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1.5 mb-3.5 sm:mb-4">
            <span className="text-[10px] font-black text-slate-400 uppercase shrink-0">Popular:</span>
            {[
              { label: "Full Body Checkup", href: "/packages" },
              { label: "CBC", href: "/book?tests=CBC" },
              { label: "Diabetes", href: "/book?tests=HbA1c" },
              { label: "Thyroid", href: "/book?tests=TSH" },
              { label: "Vitamin D", href: "/book?tests=Vitamin%20D" },
              { label: "Fever", href: "/book?tests=Dengue" },
              { label: "Heart", href: "/book?tests=Lipid" },
              { label: "Women's Health", href: "/specialities/womens-health" },
            ].map(chip => (
              <Link
                key={chip.label}
                href={chip.href}
                className="px-3 py-1 bg-[#FFF8EB] border border-[#F3DBA7] hover:border-[#D69A18] text-[#0f2d5e] font-extrabold text-[11px] rounded-full whitespace-nowrap active:scale-95 transition-all shrink-0"
              >
                {chip.label}
              </Link>
            ))}
          </div>


          {/* Carousel dots */}
          <div className="flex justify-center items-center gap-2 mt-3.5 mb-2.5">
            <span className="w-6 h-2 rounded-full bg-[#D69A18]" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* ── Book a Test Section (Responsive Grid & Icons) ── */}
        <div className="bg-white px-4 pt-3.5 sm:pt-4 pb-5 sm:pb-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3.5 sm:mb-4">
            <span className="text-[17px] sm:text-[18px] font-black text-[#0f2d5e]">Book a Test</span>
            <Link href="/tests" className="text-[12.5px] sm:text-[13.5px] font-extrabold text-[#D69A18] hover:underline">View All</Link>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {/* 1. Popular Tests */}
            <Link href="/tests" className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
              <div className="w-[56px] sm:w-[64px] h-[56px] sm:h-[64px] rounded-2xl bg-[#FFFBF0] border border-[#F3DBA7] flex items-center justify-center shadow-2xs shrink-0">
                <Microscope className="w-6 sm:w-7 h-6 sm:h-7 text-[#D69A18]" strokeWidth={1.8} />
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 text-center leading-[1.15] mt-0.5">Popular<br />Tests</span>
            </Link>

            {/* 2. Health Packages */}
            <Link href="/packages" className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
              <div className="w-[56px] sm:w-[64px] h-[56px] sm:h-[64px] rounded-2xl bg-[#FFFBF0] border border-[#F3DBA7] flex items-center justify-center shadow-2xs shrink-0">
                <svg className="w-6 sm:w-7 h-6 sm:h-7 text-[#D69A18]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v1.281m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 text-center leading-[1.15] mt-0.5">Health<br />Packages</span>
            </Link>

            {/* 3. Home Collection */}
            <Link href="/home-collection" className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
              <div className="w-[56px] sm:w-[64px] h-[56px] sm:h-[64px] rounded-2xl bg-[#FFFBF0] border border-[#F3DBA7] flex items-center justify-center shadow-2xs shrink-0">
                <svg className="w-6 sm:w-7 h-6 sm:h-7 text-[#D69A18]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 text-center leading-[1.15] mt-0.5">Home<br />Collection</span>
            </Link>

            {/* 4. Upload Prescription */}
            <button
              onClick={() => setIsPrescriptionModalOpen(true)}
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform cursor-pointer"
            >
              <div className="w-[56px] sm:w-[64px] h-[56px] sm:h-[64px] rounded-2xl bg-[#FFFBF0] border border-[#F3DBA7] flex items-center justify-center shadow-2xs shrink-0">
                <svg className="w-6 sm:w-7 h-6 sm:h-7 text-[#D69A18]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 text-center leading-[1.15] mt-0.5">Upload<br />Prescription</span>
            </button>
          </div>
        </div>


        {/* ── 24×7 Diagnostic Services Mobile Banner ── */}
        <section className="py-4 px-4 bg-[#f8faff] border-t border-slate-100 my-4 sm:my-6">
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF8EB] via-white to-amber-50/60 p-5 border border-[#F3DBA7] shadow-sm">
            <span className="inline-block bg-[#D69A18] text-white text-[10px] font-black px-3 py-1 rounded-full tracking-wider uppercase mb-2.5 shadow-2xs">
              24×7 DIAGNOSTIC SERVICES
            </span>
            <h3 className="text-[20px] font-black text-[#0f2d5e] leading-tight mb-1">
              NABL Accredited Diagnostics
            </h3>
            <p className="text-[13px] font-bold text-[#D69A18] mb-3.5">
              Doctor-Led Diagnostic Lab in Bengaluru
            </p>

            <div className="grid grid-cols-2 gap-2.5 mb-4 bg-white/70 p-3 rounded-xl border border-amber-100/80">
              {["Blood tests", "Pathology tests", "Preventive health checkups", "Home sample collection"].map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11.5px] font-bold text-slate-800 leading-tight">{s}</span>
                </div>
              ))}
            </div>

            <p className="text-[11.5px] text-slate-500 font-semibold mb-4 leading-normal">
              Available at all QXL centres &amp; partner facilities across Bengaluru.
            </p>

            <a
              href="tel:+919964639639"
              className="w-full bg-[#D69A18] hover:bg-[#b88313] !text-white font-extrabold text-sm py-3 px-5 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              <Phone className="w-4 h-4 text-white" />
              <span className="!text-white font-black" style={{ color: '#ffffff' }}>Call +91 9964 639 639</span>
            </a>
          </div>
        </section>

        {/* ── Recommended Packages Carousel Mobile ── */}
        <section className="py-4 px-4 bg-white border-t border-slate-100 my-4 sm:my-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-[10px] font-black text-[#D69A18] uppercase tracking-wider block">Health Packages</span>
              <h3 className="text-[17px] font-black text-[#0f2d5e]">Recommended Packages</h3>
            </div>
            <Link href="/packages" className="text-xs font-bold text-[#D69A18]">View All</Link>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-none">
            {recommendedPackages.map((pkg) => (
              <div key={pkg.name} className="w-[260px] shrink-0 snap-start bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-[#FFF8EB] text-[#D69A18] text-[9.5px] font-black px-2.5 py-0.5 rounded-full border border-[#F3DBA7] uppercase">{pkg.tag || "PACKAGE"}</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{Math.round((1 - Number(pkg.price) / Number(pkg.old_price || pkg.original_price || pkg.originalPrice || 5800)) * 100)}% OFF</span>
                  </div>
                  <h4 className="font-extrabold text-[#0f2d5e] text-sm leading-tight mb-1">{pkg.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mb-2">{pkg.includes}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-black text-slate-900">₹{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through">₹{pkg.old_price || pkg.original_price || pkg.originalPrice || "5800"}</span>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setSelectedPackage(pkg)} className="flex-1 py-2 rounded-xl text-[10px] font-extrabold border border-slate-200 text-slate-700 bg-slate-50">Details</button>
                    <Link href={`/book?package=${encodeURIComponent(pkg.name)}`} className="flex-1 py-2 rounded-xl text-[10px] font-extrabold bg-[#D69A18] text-white text-center">BOOK NOW</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Raksha Bandhan Festive Offer Section ── */}
        <div className="my-4 sm:my-6">
          <RakshaOfferCard onOpenBooking={(title) => setSelectedPackage({ name: title || "Raksha Bandhan Special Health Checkup", price: "800", old_price: "5800", includes: "CBC (26), HbA1c & Fasting Sugar (3), Lipid Profile (8), Liver Function (11), Kidney Function (8), Thyroid Profile (3), Bone & Urinary (21)" })} />
        </div>

        {/* ── Explore by Health Need (Exact 2nd Reference Image Design) ── */}
        <section className="py-5 px-4 bg-slate-50/60 border-t border-slate-100 my-4 sm:my-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[19px] font-black text-[#0f2d5e]">Explore by Health Need</h3>
            <Link href="/specialities/womens-health" className="text-xs font-bold text-slate-500 hover:text-[#0f2d5e]">View All</Link>
          </div>

          {/* 1. Top Featured Card: Full Body Checkups */}
          <Link
            href="/book?package=Full+Body+Health+Checkup"
            className="bg-white rounded-3xl p-4 border border-[#F3DBA7] shadow-xs flex items-center justify-between gap-3 mb-4 active:scale-[0.99] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#F3DBA7] shrink-0 bg-amber-50 shadow-2xs">
                <img src="https://res.cloudinary.com/btjglif5/image/upload/v1784150207/Assets-QXL/legacy-assets/image/home_blood_draw.jpg" alt="Full Body Checkups" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-[#0f2d5e] text-base leading-tight group-hover:text-[#D69A18] transition-colors">
                  Full Body Checkups
                </h4>
                <span className="text-xs font-semibold text-slate-400 mt-0.5">
                  Comprehensive Wellness Packages
                </span>
              </div>
            </div>
            <span className="bg-[#D69A18] text-white text-[10.5px] font-black px-3.5 py-1.5 rounded-full tracking-wider uppercase shadow-xs shrink-0">
              POPULAR
            </span>
          </Link>

          {/* 2. Horizontal Organ/Health Cards Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 scrollbar-none">
            {[
              { label: "Heart", href: "/specialities/cardiology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150392/Assets-QXL/legacy-assets/image/spec_cardiology.png" },
              { label: "Thyroid", href: "/specialities/endocrinology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150406/Assets-QXL/legacy-assets/image/spec_endocrinology.png" },
              { label: "Liver", href: "/specialities/gastroenterology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150407/Assets-QXL/legacy-assets/image/spec_gastro.png" },
              { label: "Bone & Joint", href: "/specialities/bone-disorders", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150389/Assets-QXL/legacy-assets/image/spec_bone.png" },
              { label: "Brain & Nerves", href: "/specialities/neurology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150423/Assets-QXL/legacy-assets/image/spec_neurology.png" },
              { label: "Blood", href: "/specialities/hematology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150417/Assets-QXL/legacy-assets/image/spec_hematology.png" },
              { label: "Kidney", href: "/specialities/urology", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150438/Assets-QXL/legacy-assets/image/spec_urology.png" },
              { label: "Women", href: "/specialities/womens-health", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150447/Assets-QXL/legacy-assets/image/spec_womens.png" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-[100px] shrink-0 snap-start bg-white border border-slate-200 rounded-3xl p-3 flex flex-col items-center justify-center text-center shadow-2xs active:scale-95 transition-transform group"
              >
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-amber-300/80 bg-[#FFF8EB] mb-2 shadow-2xs shrink-0 flex items-center justify-center p-1.5">
                  <img src={item.img} alt={item.label} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-extrabold text-[#0f2d5e] text-xs leading-tight group-hover:text-[#D69A18] transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why Choose QXL ── */}
        <div className="my-4 sm:my-6">
          <WhyChooseSlider />
        </div>

        {/* ── AI Powered Diagnostics ── */}
        <div className="my-4 sm:my-6">
          <AiDiagnostics />
        </div>

        {/* ── Home Collection Section ── */}
        <div className="my-4 sm:my-6">
          <HomeCollectionSection />
        </div>

        {/* ── Meet Our Team (Large Scrollable Carousel) ── */}
        <section className="py-5 px-4 bg-white border-t border-slate-100 my-4 sm:my-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-[10px] font-black text-[#D69A18] uppercase tracking-wider block">Our Experts</span>
              <h3 className="text-[18px] font-black text-[#0f2d5e]">Meet Our Team</h3>
            </div>
            <span className="text-[11px] font-extrabold text-slate-400">Scroll &rarr;</span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 scrollbar-none">
            {[
              { name: "Dr. Shantakumar Muruda", role: "Founder & CEO", qual: "MD, BIOCHEMISTRY", slug: "dr-shantakumar-muruda", img: "/images/dr_shantakumar_new.jpg", pos: "object-cover object-center" },
              { name: "Dr. Ajitha Pillai", role: "Senior Consultant", qual: "MD, MICROBIOLOGY", slug: "dr-ajitha-pillai", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150130/Assets-QXL/legacy-assets/image/dr_ajitha_latest.jpg", pos: "object-[center_top]" },
              { name: "Dr. Naveen Kumar N", role: "Consultant Pathologist", qual: "DCP, DNB PATHOLOGY", slug: "dr-naveen-kumar-n", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150134/Assets-QXL/legacy-assets/image/dr_naveen_latest.jpg", pos: "object-[center_top]" },
              { name: "Dr. Pritilata Rout", role: "Senior Consultant", qual: "MD, PATHOLOGY", slug: "dr-pritilata-rout", img: "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png", pos: "object-[center_top]" },
            ].map(d => (
              <Link
                key={d.name}
                href={`/${d.slug}`}
                className="w-[180px] shrink-0 snap-start bg-[#FFF8EB] border border-[#F3DBA7] p-4 rounded-3xl text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md transition-all active:scale-95 group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-[#D69A18] mb-3 shrink-0 bg-white shadow-md relative">
                  <img src={d.img} alt={d.name} className={`w-full h-full object-cover ${d.pos} group-hover:scale-105 transition-transform duration-300`} />
                </div>
                <div className="flex flex-col items-center text-center">
                  <h4 className="font-black text-[#0f2d5e] text-sm leading-tight mb-1">{d.name}</h4>
                  <span className="text-[11px] font-extrabold text-[#D69A18] block">{d.role}</span>
                  <span className="text-[10px] font-extrabold text-slate-500 block mt-2 bg-white/80 px-2.5 py-0.5 rounded-full border border-amber-200/60">{d.qual}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Blog & Reviews ── */}
        <div className="my-4 sm:my-6 space-y-4 sm:space-y-6">
          <BlogSlider />
          <ReviewsSection />
          <FaqSection />
        </div>
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
                <span className="text-sm text-slate-400 line-through">₹{selectedPackage.old_price || selectedPackage.original_price || selectedPackage.originalPrice || "5800"}</span>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full">
                  Save ₹{Number(selectedPackage.old_price || selectedPackage.original_price || selectedPackage.originalPrice || 5800) - Number(selectedPackage.price)} ({Math.round((1 - Number(selectedPackage.price) / Number(selectedPackage.old_price || selectedPackage.original_price || selectedPackage.originalPrice || 5800)) * 100)}% OFF)
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
                <span>📋 NABL Accredited (MC-10025)</span>
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
