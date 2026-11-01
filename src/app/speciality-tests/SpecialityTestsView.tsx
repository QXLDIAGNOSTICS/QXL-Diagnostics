"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle, Phone, MessageCircle, Users } from "lucide-react";

export interface DirectorySpeciality {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  whoShouldTake: string;
  tests: string[];
  benefits: string[];
  packages: string[];
}

export default function SpecialityTestsView({ specialities }: { specialities: DirectorySpeciality[] }) {
  const [activeId, setActiveId] = useState(specialities[0]?.id ?? "");
  const [showFaq, setShowFaq] = useState(false);
  const active = specialities.find((s) => s.id === activeId) ?? specialities[0];
  if (!active) return null;

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-14 border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4">
            10 Specialities
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">
            Super Speciality Diagnostic Tests
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium mb-6">
            Advanced diagnostic testing across 10 medical specialities — reviewed by expert consultants. AI-assisted processing, precision reporting, and home sample collection across Bengaluru.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href="tel:+919964639639"
              className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1d4ed8] transition-all text-sm shadow-md">
              <Phone className="w-4 h-4" /> Book a Test
            </a>
            <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#25d366] text-[#25d366] font-bold px-6 py-3 rounded-full hover:bg-green-50 transition-all text-sm">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
            <Link href="/upload-prescription"
              className="inline-flex items-center gap-2 border-2 border-[#2563eb] text-[#2563eb] font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-all text-sm">
              Upload Prescription
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1260px] mx-auto px-4 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar Navigation ── */}
          <aside className="w-full lg:w-[260px] flex-shrink-0">
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm sticky top-24">
              <div className="bg-[#2563eb] text-white px-5 py-4">
                <h3 className="font-extrabold text-sm tracking-wide">Our Specialities</h3>
                <p className="text-blue-100 text-[11px] mt-0.5">Select to explore tests</p>
              </div>
              <nav className="py-2">
                {specialities.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setActiveId(s.id); setShowFaq(false); }}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-all ${
                      activeId === s.id
                        ? "bg-[#dbeafe] text-[#2563eb] font-extrabold border-r-4 border-[#2563eb]"
                        : "text-slate-600 hover:bg-gray-50 font-semibold"
                    }`}
                  >
                    <div className="w-7 h-7 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      <img 
                        src={`${s.icon}?v=3`} 
                        alt={s.title} 
                        className={`w-full h-full object-contain mix-blend-multiply ${s.title === "GASTROENTEROLOGY" ? "scale-[1.4]" : "scale-110"}`} 
                      />
                    </div>
                    <span className="text-[12px] leading-tight">{s.title}</span>
                    {activeId === s.id && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0">
            <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
              {/* Speciality Header */}
              <div className="relative overflow-hidden p-8 border-b border-gray-100"
                style={{ background: `linear-gradient(135deg, ${active.color}15 0%, ${active.color}05 100%)` }}>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center p-3 flex-shrink-0 overflow-hidden">
                    <img 
                      src={`${active.icon}?v=3`} 
                      alt={active.title} 
                      className={`w-14 h-14 object-contain mix-blend-multiply ${active.title === "GASTROENTEROLOGY" ? "scale-[1.4]" : "scale-110"}`} 
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f2d5e] mb-1">{active.title}</h2>
                    <p className="text-slate-500 text-sm font-medium max-w-xl">{active.description}</p>
                  </div>
                </div>
              </div>

              {/* Who Should Take */}
              <div className="px-8 pt-6 pb-0">
                <div className="bg-[#f0f9ff] border border-[#bfdbfe] rounded-xl p-4 flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[12px] font-extrabold text-[#0f2d5e] mb-1">Who Should Take These Tests?</p>
                    <p className="text-[12px] text-slate-600 font-medium leading-relaxed">{active.whoShouldTake}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-8">
                {/* Tests List */}
                <div>
                  <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                    </span>
                    Available Tests
                  </h3>
                  <ul className="space-y-2.5">
                    {active.tests.map((test, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-[#2563eb] flex-shrink-0 mt-0.5" />
                        <span className="text-[13px] text-slate-700 font-semibold">{test}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link href="/tests" className="inline-flex items-center text-xs font-bold text-[#2563eb] hover:underline">
                      View A-Z Test Directory <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Benefits + Packages */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0f2d5e] mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#dbeafe] flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
                      </span>
                      Clinical Benefits
                    </h3>
                    <ul className="space-y-2.5">
                      {active.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                          <span className="text-[13px] text-slate-700 font-semibold">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Packages */}
                  <div className="bg-[#dbeafe]/50 rounded-2xl p-5 border border-[#2563eb]/10">
                    <h3 className="text-sm font-extrabold text-[#0f2d5e] mb-3">Related Packages</h3>
                    <div className="space-y-3">
                      {active.packages.map((pkg, i) => (
                        <div key={i} className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                          <span className="text-[12px] font-bold text-slate-700">{pkg}</span>
                          <a href={`https://api.whatsapp.com/send?phone=919964639639&text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(pkg)}`}
                            target="_blank" rel="noreferrer"
                            className="bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-xl hover:bg-[#1d4ed8] transition-colors flex-shrink-0 ml-3">
                            Book
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2">
                    <a href="tel:+919964639639"
                      className="w-full flex items-center justify-center gap-2 bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm shadow-md">
                      <Phone className="w-4 h-4" /> Book This Test
                    </a>
                    <a href={`https://api.whatsapp.com/send?phone=919964639639&text=Hi%2C%20I%20want%20to%20know%20about%20${encodeURIComponent(active.title)}%20tests`}
                      target="_blank" rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 border-2 border-[#25d366] text-[#25d366] font-bold py-3 rounded-xl hover:bg-green-50 transition-colors text-sm">
                      <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
                    </a>
                    <div className="text-center pt-1">
                      <span className="text-[11px] text-slate-400 font-medium">📞 +91 9964 639 639 · 🕐 Open 24x7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation between specialities */}
            <div className="flex justify-between mt-6 gap-4">
              {specialities.findIndex((s) => s.id === activeId) > 0 && (
                <button
                  onClick={() => setActiveId(specialities[specialities.findIndex((s) => s.id === activeId) - 1].id)}
                  className="flex items-center gap-2 border border-gray-200 text-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Previous Speciality
                </button>
              )}
              {specialities.findIndex((s) => s.id === activeId) < specialities.length - 1 && (
                <button
                  onClick={() => setActiveId(specialities[specialities.findIndex((s) => s.id === activeId) + 1].id)}
                  className="flex items-center gap-2 bg-[#2563eb] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm ml-auto">
                  Next Speciality <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
