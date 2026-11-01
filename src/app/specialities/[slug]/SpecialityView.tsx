"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight, CheckCircle, Activity, Stethoscope, Microscope, Shield, Clock, FlaskConical, Users, FileText,
  Heart, Brain, Droplet, Baby, Bone,
} from 'lucide-react';
import type { Speciality } from '@/lib/api';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_NUMBER } from '@/lib/businessInfo';

// Decorative icon beside "<Name> Test Profiles"; new specialities get a generic one.
const PROFILE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  cardiology: Heart,
  neurology: Brain,
  hematology: Droplet,
  'womens-health': Baby,
  endocrinology: Droplet,
  urology: Activity,
  gastroenterology: Activity,
  'bone-disorders': Bone,
};
const WHY_ICONS = [Shield, Microscope, Activity, CheckCircle];
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;

interface Props {
  speciality: Speciality;
  /** All active specialities, for the sidebar list. */
  others: Pick<Speciality, 'name' | 'slug'>[];
  logoUrl: string;
}

export default function SpecialityView({ speciality: s, others, logoUrl }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const ProfileIcon = PROFILE_ICONS[s.slug] ?? Microscope;
  const hero = s.hero_image_url ? optimizeCloudinaryUrl(s.hero_image_url, { w: 2000 }) : null;
  const callout = s.callout && s.callout.title ? s.callout : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="glass-panel text-[#0c4a6e] py-16 lg:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={hero ? { backgroundImage: `url('${hero}')` } : undefined}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#2563eb] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-sm">{s.name}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#0c4a6e] leading-tight">{s.hero_title}</h1>
            <p className="text-slate-700 text-base md:text-lg mb-8 leading-relaxed font-medium">{s.hero_description}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#test-profiles" className="bg-[#2563eb] text-white font-extrabold px-6 py-3 rounded-full hover:bg-[#1d4ed8] transition-all text-sm shadow-md">View Test Profiles</a>
              <Link href="/book" className="bg-white border-2 border-[#2563eb] text-[#2563eb] font-extrabold px-6 py-3 rounded-full hover:bg-sky-50 transition-all text-sm shadow-sm" style={{ color: '#2563eb' }}>Book a Test</Link>
              <Link href="/upload-prescription" className="border-2 border-slate-300 text-slate-700 font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-all text-sm">Upload Prescription</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center text-xs text-gray-500 flex-wrap gap-1">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/specialities" className="hover:text-sky-600">Our Specialities</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-semibold">{s.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            {s.intro && (
              <section>
                <p className="text-gray-700 text-lg leading-relaxed">{s.intro}</p>
              </section>
            )}

            {/* Who Should Take */}
            {s.who_should_take.length > 0 && (
              <section className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-sky-600" />
                  <h2 className="text-lg font-bold text-sky-900">Who Should Take These Tests?</h2>
                </div>
                <ul className="space-y-2 text-sm text-sky-800">
                  {s.who_should_take.map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Featured callout (e.g. clinical guide) */}
            {callout && (
              <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-200 rounded-2xl p-6 shadow-xs mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-sky-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {callout.badge}
                      </span>
                      <span className="text-xs font-semibold text-sky-800">{callout.note}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{callout.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm max-w-2xl leading-relaxed">{callout.text}</p>
                  </div>
                  <Link
                    href={callout.link}
                    className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm whitespace-nowrap shadow-sm transition-all"
                  >
                    {callout.link_label} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Test Profiles */}
            <section id="test-profiles">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <ProfileIcon className="w-6 h-6 text-sky-600" /> {s.name} Test Profiles
              </h2>
              <div className="grid gap-5">
                {s.profiles.map((t) => (
                  <div key={t.name} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-sky-400 hover:shadow-md transition-all">
                    <div className={`flex flex-col md:flex-row justify-between gap-3${t.price ? ' items-start md:items-center' : ''}`}>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{t.tests}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> TAT: {t.tat}</span>
                          <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Sample: {t.sample}</span>
                        </div>
                      </div>
                      {t.price ? (
                        <div className="flex flex-col md:items-end gap-2 shrink-0 w-full md:w-auto">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-[#0f2d5e]">₹{t.price}</span>
                            {t.old_price ? <span className="text-xs text-slate-400 line-through">₹{t.old_price}</span> : null}
                          </div>
                          <Link
                            href={`/book?package=${encodeURIComponent(t.name)}`}
                            className="bg-[#2563eb] text-white font-extrabold px-5 py-2.5 rounded-xl whitespace-nowrap hover:bg-[#1d4ed8] transition-all text-xs uppercase tracking-wider shadow-md text-center"
                          >
                            Book Now @ ₹{t.price}
                          </Link>
                        </div>
                      ) : (
                        <Link href={`/book?package=${encodeURIComponent(t.name)}`} className="self-start bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-sky-700 transition-colors text-sm">Book Now</Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Clinical Usefulness */}
            {s.clinician_notes.length > 0 && (
              <section className="bg-white border border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-sky-600" /> For Clinicians</h2>
                {s.clinician_notes.map((note, i) => (
                  <p key={i} className={`text-gray-700 text-sm leading-relaxed${i < s.clinician_notes.length - 1 ? ' mb-3' : ''}`}>{note}</p>
                ))}
              </section>
            )}

            {/* Clinical Disclaimer Callout */}
            {s.disclaimer && (
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 leading-relaxed font-semibold">
                ⚠️ <strong>Clinical Disclaimer:</strong> {s.disclaimer}
              </div>
            )}

            {/* Why QXL */}
            {s.why_choose.length > 0 && (
              <section className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Why Choose QXL Diagnostics?</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {s.why_choose.map((item, i) => {
                    const Icon = WHY_ICONS[i % WHY_ICONS.length];
                    return (
                      <div key={i} className="flex gap-3">
                        <div className="mt-0.5 bg-sky-100 p-1.5 rounded-lg flex-shrink-0"><Icon className="w-5 h-5 text-sky-600" /></div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* FAQ */}
            {s.faqs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {s.faqs.map((faq, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-4 flex justify-between items-center font-semibold text-sm text-gray-900 hover:bg-gray-50">
                        {faq.q}
                        <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                      </button>
                      {openFaq === i && <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Banner */}
            <section className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-2xl p-6 md:p-8 text-white shadow-xl">
              <h3 className="text-xl md:text-2xl font-extrabold mb-2 text-white">{s.cta_title}</h3>
              <p className="text-sky-100 text-sm md:text-base mb-6 font-medium leading-relaxed">{s.cta_text}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book" className="bg-white font-extrabold px-6 py-3 rounded-full text-sm hover:bg-sky-50 transition-all shadow-md cursor-pointer flex items-center gap-1.5" style={{ color: '#0369a1' }}>
                  Book a Test
                </Link>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="bg-white/15 hover:bg-white/25 border-2 border-white text-white font-extrabold px-6 py-3 rounded-full text-sm transition-all shadow-sm">
                  WhatsApp Us
                </a>
                <a href={`tel:${PHONE_E164}`} className="bg-white/15 hover:bg-white/25 border-2 border-white/80 text-white font-extrabold px-6 py-3 rounded-full text-sm transition-all shadow-sm">
                  📞 Call Now
                </a>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-gradient-to-br from-sky-600 to-sky-800 text-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-2 text-white">{s.help_title || 'Need help choosing the right test?'}</h3>
              <p className="text-sky-100 text-xs mb-5 font-medium leading-relaxed">{s.help_text || 'Our medical consultant team can guide you to the right diagnostic profile for your symptoms.'}</p>
              <a href={`tel:${PHONE_E164}`} className="w-full bg-white font-extrabold py-3 rounded-xl flex justify-center hover:bg-sky-50 transition-colors mb-3 shadow text-sm cursor-pointer" style={{ color: '#0369a1' }}>📞 Call {PHONE_DISPLAY}</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="w-full border border-sky-300 bg-sky-700/80 text-white font-bold py-3 rounded-xl flex justify-center hover:bg-sky-600 transition-colors text-sm shadow-sm mb-3">WhatsApp Us</a>
              <Link href="/upload-prescription" className="w-full border border-sky-300/60 bg-transparent text-white font-bold py-3 rounded-xl flex justify-center hover:bg-white/10 transition-colors text-sm"><FileText className="w-4 h-4 mr-2" /> Upload Prescription</Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Our Specialities</h3>
              <ul className="space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/specialities/${o.slug}`} className="text-gray-600 hover:text-sky-600 text-sm flex items-center justify-between group font-medium">
                      {o.name}<ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-sky-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": s.hero_title,
            "provider": { "@type": "MedicalClinic", "name": "QXL Diagnostics", "image": logoUrl },
            "areaServed": { "@type": "City", "name": "Bengaluru" },
            "description": s.hero_description,
            "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" },
          }),
        }}
      />
    </div>
  );
}
