"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Building2, TrendingUp, ShieldCheck, Users, Briefcase, Award, CheckCircle2, ChevronRight, Activity, Beaker, MapPin } from 'lucide-react';
import Link from 'next/link';
import { api } from '../../lib/api';

// ── Partnership hero slides (moved from homepage) ─────────────────────────────
const partnerSlides = [
  {
    badge: "PARTNER WITH US",
    title: "You too can",
    titleAccent: "Collaborate with us",
    subtitle: "Join as a partner of",
    subtitleAccent: "India's Leading Diagnostics Chain",
    description: "Join the QXL Diagnostics network. NABL Accredited Labs with a High Return on Investment. Full training, brand support, and dedicated relationship managers.",
    cta: "Explore Options",
    ctaLink: "#enquire",
    ctaSecondary: "View Models",
    ctaSecondaryLink: "#models",
    image: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150198/Assets-QXL/legacy-assets/image/franchise_partner_indian.jpg",
    bgFrom: "#f0f9ff",
    bgTo: "#e0f2fe",
    features: ["NABL Accredited", "High ROI", "Full Training", "Brand Trust"],
  },
  {
    badge: "FRANCHISE OPPORTUNITY",
    title: "Own a Franchise or Collaborate with",
    titleAccent: "India's Leading Diagnostics Brand",
    subtitle: "Partner with QXL Diagnostics and build a successful business",
    subtitleAccent: "in the rapidly growing healthcare sector.",
    description: "Join our network of diagnostic centers and benefit from our established brand, state-of-the-art technology, and comprehensive support system.",
    cta: "Enquire Now",
    ctaLink: "#enquire",
    ctaSecondary: "Contact Us",
    ctaSecondaryLink: "/contact",
    image: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150478/Assets-QXL/legacy-assets/image/user_male_professional.jpg",
    bgFrom: "#f0fdf4",
    bgTo: "#dcfce7",
    features: ["Proven Business Model", "Marketing Support", "Technical Training", "High ROI"],
  },
];

function PartnerSlider() {
  const [current, setCurrent] = useState(0);
  const slide = partnerSlides[current];

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % partnerSlides.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${slide.bgFrom}, ${slide.bgTo})`, transition: 'background 0.8s ease' }}>
      <div className="max-w-[1260px] mx-auto px-4 py-10 md:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            {/* Left: content */}
            <div className="flex-1">
              <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-3 shadow-sm">
                {slide.badge}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0d2e42] leading-tight mb-1">
                {slide.title}
              </h2>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#2563eb] leading-tight mb-3">
                {slide.titleAccent}
              </h2>
              <p className="text-sm font-bold text-slate-600 mb-1">{slide.subtitle} <span className="text-[#2563eb]">{slide.subtitleAccent}</span></p>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-5 max-w-lg">{slide.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {slide.features.map(f => (
                  <span key={f} className="bg-white/70 border border-[#2563eb]/20 text-[#2563eb] text-[10.5px] font-bold px-3 py-1 rounded-full shadow-sm">✓ {f}</span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={slide.ctaLink} className="bg-[#2563eb] text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-[#1d4ed8] transition-all shadow-md">{slide.cta}</a>
                <a href={slide.ctaSecondaryLink} className="bg-white/80 text-[#2563eb] font-bold px-6 py-2.5 rounded-full text-sm border border-[#2563eb]/20 hover:bg-white transition-all">{slide.ctaSecondary}</a>
              </div>
            </div>
            {/* Right: image */}
            <div className="w-full md:w-[380px] lg:w-[420px] h-56 md:h-72 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 border-4 border-white/40 relative">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-center"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {partnerSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-[#2563eb]' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
              aria-label={`Partner slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FranchisePage() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', state: '', city: '', model: '', budget: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setError(null);
    setSubmitting(true);
    try {
      await api.leads.collaboration({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        city: formData.state || null,
        interest: formData.model || null,
        message: [formData.city && `Region: ${formData.city}`, formData.budget && `Budget: ${formData.budget}`]
          .filter(Boolean)
          .join(' | ') || null,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Collaboration lead submission failed', err);
      setError('We could not submit your inquiry. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-16 md:py-24 border-b border-blue-100">
        <div className="max-w-[1260px] mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="inline-block bg-[#2563eb] text-white text-sm font-extrabold px-5 py-2.5 rounded-full tracking-wider uppercase mb-5 shadow-sm leading-tight max-w-[85%]">
              Your Lab. Our Brand. Shared Success.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-[#0f2d5e]">
              Build a Profitable <span className="text-[#2563eb]">Lab Collaboration</span> with the Trusted QXL Brand
            </h1>
            <p className="text-slate-600 text-sm md:text-base font-medium mb-8 leading-relaxed max-w-2xl">
              Become a collaboration partner with QXL Diagnostics and establish a world-class Diagnostic & Sample Collection Center in your city. We provide complete business support, advanced laboratory services, technology, branding, training, and marketing to help you build a successful healthcare business.
            </p>
            <div className="flex gap-4">
              <a href="#enquire" className="bg-[#2563eb] text-white font-extrabold px-8 py-3.5 rounded-full hover:bg-[#1d4ed8] transition-colors shadow-lg text-sm uppercase tracking-wider">
                Enquire Now
              </a>
            </div>
          </div>
          
          {/* Inquiry Form */}
          <div id="enquire" className="w-full lg:w-[450px] bg-white rounded-3xl p-8 shadow-2xl text-slate-800">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
                <h3 className="text-xl font-bold mb-2">Inquiry Submitted!</h3>
                <p className="text-sm text-slate-500 font-medium">Thank you for your interest. Our collaboration team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#0f2d5e] mb-2">Collaboration Inquiry Form</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#2563eb] outline-none bg-gray-50/50" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Mobile</label>
                    <input required type="tel" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#2563eb] outline-none bg-gray-50/50" placeholder="+91" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Email</label>
                  <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#2563eb] outline-none bg-gray-50/50" placeholder="mail@example.com" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Capital City</label>
                    <select value={formData.state} onChange={e=>setFormData({...formData, state:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#2563eb] outline-none bg-gray-50/50">
                      <option value="">Select City</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Pune">Pune</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Indore">Indore</option>
                      <option value="Kochi">Kochi</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                      <option value="Visakhapatnam">Visakhapatnam</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Region</label>
                    <input type="text" value={formData.city} onChange={e=>setFormData({...formData, city:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#2563eb] outline-none bg-gray-50/50" placeholder="Region" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Preferred Model</label>
                  <select value={formData.model} onChange={e=>setFormData({...formData, model:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#2563eb] outline-none bg-gray-50/50">
                    <option value="">Select Model</option>
                    <option value="HLM & LMS">Hospital & Laboratory Management (HLM/LMS)</option>
                    <option value="Lab Referral">Lab-to-Lab Referral & Super Speciality Testing</option>
                    <option value="Franchise & Collection">Lab Franchise & Collection Centre Network</option>
                    <option value="Corporate Health">Corporate, Clinical Research & Occupational Health Programs</option>
                    <option value="Home Health">Home Healthcare & Preventive Health Camps</option>
                    <option value="Government">Government & Institutional Empanelment</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Investment Budget</label>
                  <input type="text" value={formData.budget} onChange={e=>setFormData({...formData, budget:e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-[#2563eb] outline-none bg-gray-50/50" placeholder="e.g. 5 Lakhs" />
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-[#2563eb] text-white font-extrabold px-6 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors shadow-md text-sm uppercase tracking-wider mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Submitting…' : 'Submit Inquiry'}
                </button>
                {error && <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Partnership Highlight Slider ── */}
      <PartnerSlider />

      {/* Why QXL Diagnostics */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-4">Why QXL Diagnostics?</h2>
            <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mb-6" />
            <p className="text-slate-500 font-medium leading-relaxed mb-6">
              QXL Diagnostics is a fast-growing diagnostic healthcare network committed to delivering accurate, affordable, and reliable diagnostic services. Equipped with advanced laboratory technology and experienced medical professionals, we provide comprehensive pathology, radiology, preventive health packages, and specialized diagnostic solutions.
            </p>
            <p className="text-slate-500 font-medium leading-relaxed">
              Our laboratory follows stringent quality standards to ensure precise and timely reports. We aim to make quality diagnostics accessible across India through our expanding collaboration network.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Clinical Pathology", "Biochemistry", "Hematology", "Microbiology", "Immunology", "Serology", "Molecular Diagnostics", "Histopathology", "Cytology", "Preventive Health", "Women's Health", "Men's Health", "Diabetes Screening", "Cardiac Risk", "Cancer Screening", "Thyroid & Hormone"].map((item, i) => (
              <div key={i} className="bg-[#f8faff] border border-gray-150 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2563eb] flex-shrink-0" />
                <span className="text-sm font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Benefits */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-4">Why Partner with QXL Diagnostics?</h2>
              <div className="w-16 h-1 bg-[#2563eb] rounded-full mb-6" />
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Joining QXL Diagnostics means becoming part of a healthcare brand focused on quality, innovation, and patient satisfaction. Starting your diagnostic business with QXL offers numerous advantages:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Low Investment Opportunity", "High Growth Healthcare Industry", 
                  "Strong Brand Recognition", "Complete Business Setup", 
                  "Laboratory Infrastructure", "Digital Marketing Support", 
                  "Collaboration & Phlebotomy Training", "NABL Quality Focus",
                  "Technology-Driven Platform", "Online Booking & App"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#f0f9ff] rounded-[40px] p-8 md:p-12 relative overflow-hidden border border-[#dbeafe]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2563eb]/10 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-bold text-[#0f2d5e] mb-6">Our Partners Receive:</h3>
              <ul className="space-y-4">
                {[
                  "Staff Recruitment Assistance",
                  "Home Sample Collection Support",
                  "Real-Time Sample Tracking",
                  "Report Management System",
                  "Continuous Training Programs",
                  "Dedicated Relationship Manager",
                  "Business Performance Reviews"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white px-5 py-3.5 rounded-2xl shadow-sm">
                    <Award className="w-5 h-5 text-[#2563eb]" />
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Models */}
      <section id="models" className="py-16 bg-[#f8faff]">
        <div className="max-w-[1260px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-4">QXL Diagnostics Collaboration Models</h2>
            <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mb-4" />
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Our collaboration models are designed for entrepreneurs, healthcare professionals, hospitals, clinics, and medical businesses looking to establish a successful diagnostic center.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Hospital & Laboratory Management (HLM/LMS)", desc: "Dedicated diagnostic services and comprehensive laboratory management tailored for hospitals and healthcare institutions." },
              { title: "Lab-to-Lab Referral & Super Speciality Testing", desc: "Specialized testing services and reliable support for clinics, doctors, and other diagnostic laboratories." },
              { title: "Lab Franchise & Collection Centre Network", desc: "Start your own diagnostic and sample collection center with complete business support, branding, and advanced technology." },
              { title: "Corporate, Clinical Research & Occupational Health Programs", desc: "Health screening solutions and diagnostic partnerships for companies. Customized corporate wellness programs and pre-employment checkups." },
              { title: "Home Healthcare & Preventive Health Camps", desc: "Convenient at-home sample collection and preventive health checkups for patients to manage their wellbeing proactively." },
              { title: "Government & Institutional Empanelment", desc: "Providing advanced and precise diagnostic services in partnership with government bodies and large institutions." }
            ].map((model, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-150 hover:shadow-lg hover:border-[#2563eb]/30 transition-all text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#eff6ff] rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-[#2563eb]" />
                </div>
                <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-3">{model.title}</h3>
                <p className="text-slate-500 text-sm font-medium">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "What business models are available?", a: "QXL Diagnostics offers Sample Collection Centers, Full Diagnostic Laboratories, Hospital Partnerships, and Corporate Diagnostic Solutions." },
              { q: "Who can become a collaboration partner?", a: "Entrepreneurs, doctors, laboratory professionals, hospitals, clinics, healthcare investors, and business owners." },
              { q: "Can I start in a small city?", a: "Yes. QXL supports collaboration expansion across metropolitan, urban, semi-urban, and rural locations." },
              { q: "Will QXL provide staff training?", a: "Yes. Comprehensive technical, operational, and customer service training is provided." },
              { q: "Will marketing support be available?", a: "Yes. We provide branding, online marketing, promotional campaigns, and local marketing assistance." },
              { q: "Does QXL help with licensing?", a: "Yes. We guide collaboration partners through applicable regulatory and compliance requirements." }
            ].map((faq, i) => (
              <div key={i} className="bg-[#f8faff] rounded-2xl p-6 border border-blue-50">
                <h4 className="font-bold text-slate-800 mb-2">{faq.q}</h4>
                <p className="text-slate-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
