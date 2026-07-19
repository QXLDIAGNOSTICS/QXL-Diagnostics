"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { cmsStore } from '../lib/cmsStore';

export default function Footer() {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState<any>({
    siteName: "QXL Diagnostics",
    logoText: "QXL",
    logoImage: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
    contactPhone: "+91 99646 39639",
    supportEmail: "qxldiagnostics@gmail.com",
    hqAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060",
    northHubAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064",
    workingHours: "Open 24x7",
    whatsappNumber: "+91 99646 39639",
    copyrightText: "© 2026 QXL Diagnostics. All rights reserved.",
    footerDesc: "QXL Diagnostics is a super speciality diagnostic laboratory in Bengaluru offering advanced pathology, microbiology, immunology, molecular diagnostics, histopathology, cytology and precision diagnostic services for patients, clinicians and hospitals.",
    navItems: [
      { label: "Home", href: "/", visible: true },
      { label: "About Us", href: "/about", visible: true },
      { label: "Founder & Consultants", href: "/founder", visible: true },
      { label: "Our Specialities", href: "/specialities", visible: true },
      { label: "Packages", href: "/packages", visible: true },
      { label: "Book a Test", href: "/book", visible: true },
      { label: "Find Nearest Centre", href: "/centers", visible: true },
      { label: "Download Report", href: "/report", visible: true },
      { label: "Collaborate with us", href: "/franchise", visible: true },
      { label: "Login", href: "/login", visible: true }
    ]
  });

  useEffect(() => {
    const loadSettings = () => {
      setSettings(cmsStore.getSettings());
    };
    loadSettings();
    window.addEventListener("cms-update", loadSettings);
    return () => window.removeEventListener("cms-update", loadSettings);
  }, []);

  return (
    <footer className="bg-[#0d2e42] text-white">
      {/* Main Footer */}
      <div className="max-w-[1260px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="bg-white p-2 rounded-xl inline-block mb-5 shadow-lg">
              <img
                src={settings.logoImage || "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"}
                alt={`${settings.siteName || "QXL"} Logo`}
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallbackSpan = e.currentTarget.parentElement?.querySelector('.logo-text-footer') as HTMLElement;
                  if (fallbackSpan) fallbackSpan.classList.remove('hidden');
                }}
              />
            </div>
            <span className="logo-text-footer font-extrabold text-2xl text-teal-400 block mb-5 hidden">
              {settings.logoText || "QXL"}
            </span>
            <p className="text-slate-300 text-[13px] leading-relaxed font-medium mb-5">
              {settings.footerDesc || "QXL Diagnostics is a super speciality diagnostic laboratory in Bengaluru offering advanced pathology, microbiology, immunology, molecular diagnostics, histopathology, cytology and precision diagnostic services for patients, clinicians and hospitals."}
            </p>
            {/* Certifications / Badges */}
            <div className="flex items-center gap-5 bg-white py-3 px-5 rounded-2xl max-w-fit shadow-lg mt-2">
               <img 
                 src="https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150212/Assets-QXL/legacy-assets/image/nabl.png" 
                 alt="NABL Accredited and ISO Certified" 
                 className="h-16 w-auto object-contain"
               />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5 pb-2 border-b border-white/10">Quick Links</h4>
            <ul className="space-y-3">
              {(settings.navItems || []).filter((l: any) => l.visible !== false).map((l: any) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-slate-300 hover:text-white text-[13px] font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#2563eb] group-hover:w-3 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5 pb-2 border-b border-white/10">Specialities</h4>
            <ul className="space-y-3">
              {[
                { label: "Neurology", href: "/specialities/neurology" },
                { label: "Hematology", href: "/specialities/hematology" },
                { label: "Cardiology", href: "/specialities/cardiology" },
                { label: "Urology", href: "/specialities/urology" },
                { label: "Endocrinology", href: "/specialities/endocrinology" },
                { label: "Oncology", href: "/specialities/oncology" },
                { label: "Infectious Diseases", href: "/specialities/infectious-diseases" },
                { label: "Women's Health", href: "/specialities/womens-health" },
                { label: "Gastroenterology", href: "/specialities/gastroenterology" },
                { label: "Bone Disorders", href: "/specialities/bone-disorders" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-slate-300 hover:text-white text-[13px] font-medium transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#2563eb] group-hover:w-3 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider mb-5 pb-2 border-b border-white/10">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563eb]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#2563eb]" />
                </div>
                <div>
                  <p className="text-white text-[12px] font-bold mb-0.5">Main Lab (Kengeri)</p>
                  <p className="text-slate-300 text-[12px] font-medium leading-relaxed">
                    {settings.hqAddress || "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060"}
                  </p>
                </div>
              </li>
              {settings.northHubAddress && (
                <li className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div>
                    <p className="text-white text-[12px] font-bold mb-0.5">North Hub (Yelahanka)</p>
                    <p className="text-slate-300 text-[12px] font-medium leading-relaxed">
                      {settings.northHubAddress}
                    </p>
                  </div>
                </li>
              )}
              <li className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563eb]/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#2563eb]" />
                </div>
                <div>
                  <a href={`tel:${settings.contactPhone || '+919964639639'}`} className="text-white text-[13px] font-bold hover:text-blue-300 transition-colors">{settings.contactPhone || '+91 99646 39639'}</a>
                  <p className="text-slate-400 text-[11px] mt-0.5">{settings.workingHours}</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563eb]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#2563eb]"><circle cx="12" cy="12" r="10"></circle><path d="M9 17V7h4a3 3 0 0 1 0 6H9"></path></svg>
                </div>
                <div>
                  <p className="text-white text-[12px] font-bold mb-0.5">Parking Available</p>
                  <p className="text-slate-400 text-[11px]">Free basement parking for patients at both centers.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563eb]/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#2563eb]" />
                </div>
                <a href={`mailto:${settings.supportEmail}`}
                  className="text-slate-300 text-[13px] font-medium hover:text-white transition-colors self-center">
                  {settings.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1260px] mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-400 text-[12px] font-medium">
            {settings.copyrightText || `© ${year} QXL Diagnostics. All rights reserved.`}
          </p>
          <p className="text-slate-400 text-[12px] font-medium">
            NABL Certified · ISO 15189 · CAP Standards · Bengaluru, Karnataka
          </p>
          <div className="flex gap-4 items-center">
            <Link href="https://www.facebook.com/qxldiagnostics" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Link>
            <Link href="https://twitter.com/qxldiagnostics" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </Link>
            <Link href="https://www.instagram.com/qxldiagnostics" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </Link>
            <Link href="https://www.linkedin.com/company/qxl-diagnostics" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </Link>
            <div className="w-px h-4 bg-white/20 mx-2"></div>
            <Link href="/privacy-policy" className="text-slate-400 hover:text-white text-[12px] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-[12px] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
