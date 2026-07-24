"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { cmsStore } from '../lib/cmsStore';
import { useAuth } from '../lib/useAuth';
import { SOCIAL_LINKS, ISO_STANDARD } from '../lib/businessInfo';
import { optimizeCloudinaryUrl } from '../lib/cloudinary';

const FALLBACK_LOGO =
  "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png";

const specialities = [
  { label: "Cardiology Biomarkers", href: "/specialities/cardiology" },
  { label: "Endocrinology", href: "/specialities/endocrinology" },
  { label: "Neurology Tests", href: "/specialities/neurology" },
  { label: "Oncology Markers", href: "/specialities/oncology" },
  { label: "Women's Health", href: "/specialities/womens-health" },
  { label: "Infectious Diseases", href: "/specialities/infectious-diseases" },
  { label: "Gastroenterology", href: "/specialities/gastroenterology" },
  { label: "Haematology", href: "/specialities/hematology" },
  { label: "Bone Disorders", href: "/specialities/bone-disorders" },
  { label: "Urology", href: "/specialities/urology" },
];

export default function Footer() {
  const { user } = useAuth();
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState<any>({
    siteName: "QXL Diagnostics",
    logoText: "QXL",
    logoImage: FALLBACK_LOGO,
    contactPhone: "+91 99646 39639",
    supportEmail: "qxldiagnostics@gmail.com",
    hqAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060",
    northHubAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064",
    workingHours: "Open 24x7",
    whatsappNumber: "+91 99646 39639",
    copyrightText: `© ${year} QXL Diagnostics. All rights reserved.`,
    footerDesc: "QXL Diagnostics is a NABL-accredited super speciality diagnostic laboratory in Bengaluru offering advanced pathology, molecular diagnostics, histopathology, and AI-assisted precision diagnostics.",
    navItems: [
      {label: "Home", href: "/", visible: true},
      {label: "About Us", href: "/about", visible: true},
      {label: "Founder & Consultants", href: "/founder", visible: true},
      {label: "Our Specialities", href: "/specialities", visible: true},
      {label: "Packages", href: "/packages", visible: true},
      {label: "Find Nearest Centre", href: "/centers", visible: true},
      {label: "My Bookings", href: "/dashboard", visible: true},
      {label: "My Reports", href: "/report", visible: true},
      {label: "Login", href: "/login", visible: true}
    ]
  });

  useEffect(() => {
    const loadSettings = () => setSettings(cmsStore.getSettings());
    loadSettings();
    window.addEventListener("cms-update", loadSettings);
    return () => window.removeEventListener("cms-update", loadSettings);
  }, []);

  return (
    <footer className="relative overflow-hidden" style={{ zIndex: 1, background: '#0a0a0a' }}>
      {/* Subtle gradient overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ position:'absolute', top:'-80px', left:'-60px', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', bottom:'-60px', right:'-40px', width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', filter:'blur(50px)' }} />
      </div>

      {/* Book a Test Banner */}
      <div className="relative z-10" style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div className="max-w-[1260px] mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-extrabold text-xl mb-1">Book a Test Today</h3>
            <p className="text-white/60 text-sm font-medium">Free home sample collection · NABL certified · Same-day digital reports</p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href="https://wa.me/919964639639?text=Hi%2C%20I%20want%20to%20book%20a%20test%20at%20QXL%20Diagnostics"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-extrabold px-5 py-2.5 rounded-full text-[12px] uppercase tracking-wide transition-all hover:scale-105 text-white"
              style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.998-1.417A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fillRule="evenodd" clipRule="evenodd"/></svg>
              WhatsApp
            </a>
            <Link href="/book" className="btn-sky gap-2 px-5 py-2.5 text-[12px] shadow-md">
              Book Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-[1260px] mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="inline-block mb-5 p-2.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img
                src={optimizeCloudinaryUrl(settings.logoImage || FALLBACK_LOGO, { w: 224, h: 56, crop: "fit" })}
                alt={`${settings.siteName || "QXL"} Logo`}
                width={224} height={56}
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fb = e.currentTarget.parentElement?.querySelector('.logo-text-footer') as HTMLElement;
                  if (fb) fb.classList.remove('hidden');
                }}
              />
            </div>
            <span className="logo-text-footer font-extrabold text-2xl text-white block mb-5 hidden">{settings.logoText || "QXL"}</span>
            <p className="text-white/50 text-[13px] leading-relaxed font-medium mb-5">
              {settings.footerDesc}
            </p>
            {/* NABL Badge */}
            <div className="inline-flex items-center gap-3 py-3 px-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img
                src="https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150212/Assets-QXL/legacy-assets/image/nabl.png"
                alt="NABL Accredited ISO Certified"
                width={100} height={50}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <p className="font-extrabold text-white text-[11px] uppercase tracking-[0.12em] mb-5 pb-2 border-b border-white/10 w-fit mx-auto md:mx-0">Quick Links</p>
            <ul className="space-y-2.5">
              {(settings.navItems || []).filter((l: any) => l.visible !== false).map((l: any) => {
                let label = l.label, href = l.href;
                if (!user && (l.label === "My Bookings" || l.label === "My Reports")) href = `/login?redirect=${encodeURIComponent(l.href)}`;
                if (String(l.label).toLowerCase() === "login") { label = user ? "Profile" : "Login"; href = user ? "/profile" : "/login"; }
                return (
                  <li key={label}>
                    <Link href={href} className="text-white/50 hover:text-white text-[13px] font-semibold transition-all flex items-center justify-center md:justify-start gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0 transition-all group-hover:w-2.5 group-hover:bg-white/60" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Specialities */}
          <div className="text-center md:text-left">
            <p className="font-extrabold text-white text-[11px] uppercase tracking-[0.12em] mb-5 pb-2 border-b border-white/10 w-fit mx-auto md:mx-0">Specialities</p>
            <ul className="space-y-2.5">
              {specialities.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-[13px] font-semibold transition-all flex items-center justify-center md:justify-start gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0 transition-all group-hover:w-2.5 group-hover:bg-white/60" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <p className="font-extrabold text-white text-[11px] uppercase tracking-[0.12em] mb-5 pb-2 border-b border-white/10 w-fit mx-auto md:mx-0">Contact Us</p>
            <ul className="space-y-4">
              <li className="flex flex-col items-center md:flex-row md:items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <MapPin className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <p className="text-white/80 text-[12px] font-bold mb-0.5">Main Lab (Kengeri)</p>
                  <p className="text-white/40 text-[12px] font-medium leading-relaxed">{settings.hqAddress}</p>
                </div>
              </li>
              {settings.northHubAddress && (
                <li className="flex flex-col items-center md:flex-row md:items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <MapPin className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <p className="text-white/80 text-[12px] font-bold mb-0.5">North Hub (Yelahanka)</p>
                    <p className="text-white/40 text-[12px] font-medium leading-relaxed">{settings.northHubAddress}</p>
                  </div>
                </li>
              )}
              <li className="flex flex-col items-center md:flex-row md:items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Phone className="w-4 h-4 text-white/60" />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <a href={`tel:${settings.contactPhone || '+919964639639'}`} className="text-white text-[13px] font-extrabold hover:text-white/80 transition-colors">{settings.contactPhone || '+91 99646 39639'}</a>
                  <p className="text-white/40 text-[11px] font-semibold mt-0.5">{settings.workingHours}</p>
                </div>
              </li>
              <li className="flex flex-col items-center md:flex-row md:items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Mail className="w-4 h-4 text-white/60" />
                </div>
                <a href={`mailto:${settings.supportEmail}`} className="text-white/50 text-[13px] font-medium hover:text-white transition-colors self-center">{settings.supportEmail}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/8">
        <div className="max-w-[1260px] mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-[12px] font-semibold">
            {settings.copyrightText || `© ${year} QXL Diagnostics. All rights reserved.`}
          </p>
          <p className="text-white/40 text-[12px] font-semibold">
            NABL Certified · {ISO_STANDARD} · Bengaluru, Karnataka
          </p>
          <div className="flex gap-4 items-center flex-wrap">
            {[
              { href: SOCIAL_LINKS.facebook, label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              { href: SOCIAL_LINKS.instagram, label: "Instagram", path: null, isInsta: true },
              { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", path: null, isLi: true },
            ].map(s => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label={s.label}>
                {s.path && (
                  <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={s.path} /></svg>
                )}
                {s.isInsta && (
                  <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                )}
                {s.isLi && (
                  <svg className="w-3.5 h-3.5 text-white/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                )}
              </Link>
            ))}
            <div className="w-px h-4 mx-1 bg-white/10" />
            <Link href="/privacy-policy" className="text-white/40 hover:text-white/80 text-[12px] font-semibold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 hover:text-white/80 text-[12px] font-semibold transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
