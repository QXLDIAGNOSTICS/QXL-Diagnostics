"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

/** Deep navy base + frosted glass panels matching QXL design mockup. */
const BASE = "#082142";
const GLASS = "rgba(255, 255, 255, 0.04)";
const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.08)";
const GLASS_SOFT = "rgba(148, 163, 184, 0.06)";

export default function Footer() {
  const pathname = usePathname();
  const { user } = useAuth();
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState<any>({
    siteName: "QXL Diagnostics",
    logoText: "QXL",
    logoImage: FALLBACK_LOGO,
    contactPhone: "+91 9964 639 639",
    supportEmail: "info@qxldiagnostics.com",
    hqAddress: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060",
    northHubAddress: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560 064",
    workingHours: "Centres: Mon–Sat 7 AM–9 PM, Sun 7 AM–2 PM (24×7 Lab Processing)",
    whatsappNumber: "+91 9964 639 639",
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
    ]
  });

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const loadSettings = () => setSettings(cmsStore.getSettings());
    loadSettings();
    window.addEventListener("cms-update", loadSettings);
    
    // Set current date on client side to avoid hydration mismatch
    setCurrentDate(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
    
    return () => window.removeEventListener("cms-update", loadSettings);
  }, []);

  return (
    <footer className={`relative overflow-hidden ${pathname !== "/" ? "hidden lg:block" : ""}`} style={{ zIndex: 1, background: BASE }}>


      {/* Subtle glass skin — faint highlights only, no color wash */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255,255,255,0.045) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 90% 100%, rgba(255,255,255,0.03) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 18%, transparent 100%)',
          }}
        />
      </div>

      {/* Book a Test — frosted glass strip */}
      <div
        className="relative z-10"
        style={{
          background: GLASS,
          backdropFilter: 'blur(24px) saturate(140%)',
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          borderBottom: GLASS_BORDER,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-[1260px] mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-white font-extrabold text-base sm:text-lg tracking-tight">Book a Test Today</h3>
            <p className="text-white/50 text-xs font-medium mt-0.5">Free home sample collection · NABL accredited · Same-day reports</p>
          </div>
          <div className="flex gap-2.5 flex-wrap justify-center">
            <a
              href="https://wa.me/919964639639?text=Hi%2C%20I%20want%20to%20book%20a%20test%20at%20QXL%20Diagnostics"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-extrabold px-4 py-2 rounded-full text-xs uppercase tracking-wide transition-all hover:scale-105 text-white"
              style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.998-1.417A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fillRule="evenodd" clipRule="evenodd"/></svg>
              WhatsApp
            </a>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 font-extrabold px-4 py-2 rounded-full text-xs uppercase tracking-wide text-white transition-all hover:scale-105"
              style={{
                background: '#D69A18',
                boxShadow: '0 4px 16px rgba(214,154,24,0.3)',
              }}
            >
              Book Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-[1260px] mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand & Accreditation Column */}
          <div className="flex flex-col items-start text-left space-y-3">
            {/* Logo & NABL Badge Side-by-Side (Full Width Equal Grid) */}
            <div className="w-full max-w-sm flex items-center gap-2.5">
              <div
                className="flex-1 h-13 sm:h-15 px-3 py-1.5 rounded-xl bg-white shadow-2xs flex items-center justify-center"
                style={{ border: GLASS_BORDER }}
              >
                <img
                  src={optimizeCloudinaryUrl(settings.logoImage || FALLBACK_LOGO, { w: 180, h: 50, crop: "fit" })}
                  alt={`${settings.siteName || "QXL"} Logo`}
                  width={180} height={50}
                  className="h-9 sm:h-11 max-w-full w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fb = e.currentTarget.parentElement?.querySelector('.logo-text-footer') as HTMLElement;
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
              </div>
              <div
                className="flex-1 h-13 sm:h-15 px-2 py-1 rounded-xl bg-white shadow-2xs flex items-center justify-center"
                style={{ border: GLASS_BORDER }}
              >
                <img
                  src="https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150212/Assets-QXL/legacy-assets/image/nabl.png"
                  alt="NABL Accredited ISO 15189"
                  width={120} height={60}
                  className="h-10 sm:h-12 max-w-full w-auto object-contain"
                />
              </div>
            </div>
            <span className="logo-text-footer font-black text-xl text-white block hidden">{settings.logoText || "QXL"}</span>
            <p className="text-white/45 text-xs leading-relaxed font-medium max-w-sm">
              {settings.footerDesc}
            </p>
          </div>

          {/* Quick Links Column (2-Column Grid on Mobile) */}
          <div className="text-left">
            <p className="font-black text-[#D69A18] text-[11px] uppercase tracking-wider mb-3 pb-1 border-b border-amber-500/20">Quick Links</p>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-3 gap-y-2">
              {(settings.navItems || []).filter((l: any) => l.visible !== false).map((l: any) => {
                let label = l.label, href = l.href;
                if (!user && (l.label === "My Bookings" || l.label === "My Reports")) href = `/login?redirect=${encodeURIComponent(l.href)}`;
                if (String(l.label).toLowerCase() === "login") { label = user ? "Profile" : "Login"; href = user ? "/profile" : "/login"; }
                return (
                  <li key={label}>
                    <Link href={href} className="text-white/60 hover:text-[#D69A18] text-xs font-semibold transition-all flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-[#D69A18]/60 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Specialities Column (2-Column Grid on Mobile) */}
          <div className="text-left">
            <p className="font-black text-[#D69A18] text-[11px] uppercase tracking-wider mb-3 pb-1 border-b border-amber-500/20">Specialities</p>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-3 gap-y-2">
              {specialities.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/60 hover:text-[#D69A18] text-xs font-semibold transition-all flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#D69A18]/60 flex-shrink-0" />
                    <span className="truncate">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="text-left">
            <p className="font-black text-[#D69A18] text-[11px] uppercase tracking-wider mb-3 pb-1 border-b border-amber-500/20">Contact Us</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-amber-500/10 border border-amber-500/20">
                  <MapPin className="w-3.5 h-3.5 text-[#D69A18]" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold mb-0.5">Main Lab (Kengeri)</p>
                  <p className="text-white/45 text-[11px] font-medium leading-relaxed">{settings.hqAddress || "3rd Floor, SLN Complex, Kengeri, Bengaluru – 560 060"}</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-amber-500/10 border border-amber-500/20">
                  <MapPin className="w-3.5 h-3.5 text-[#D69A18]" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold mb-0.5">North Hub (Yelahanka)</p>
                  <p className="text-white/45 text-[11px] font-medium leading-relaxed">{settings.northHubAddress || "L Square, Yelahanka, Bengaluru – 560 064"}</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-500/10 border border-amber-500/20">
                  <Phone className="w-3.5 h-3.5 text-[#D69A18]" />
                </div>
                <div>
                  <a href={`tel:${settings.phone_e164 || settings.contactPhone || '+919964639639'}`} className="text-white text-xs font-extrabold hover:text-[#D69A18] transition-colors">
                    {settings.phone_display || settings.contactPhone || '+91 9964 639 639'}
                  </a>
                  <span className="text-white/40 text-[10px] font-semibold block">{settings.workingHours}</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-500/10 border border-amber-500/20">
                  <Mail className="w-3.5 h-3.5 text-[#D69A18]" />
                </div>
                <a href={`mailto:${settings.supportEmail}`} className="text-white/50 text-xs font-medium hover:text-[#D69A18] transition-colors truncate">
                  {settings.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — with pb-20 on mobile to avoid overlapping fixed mobile nav bar */}
      <div
        className="relative z-10"
        style={{
          borderTop: GLASS_BORDER,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-[1260px] mx-auto px-4 pt-4 pb-20 lg:pb-5 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <p className="text-white/40 text-[11px] font-medium">
            {settings.copyrightText || `© ${year} QXL Diagnostics. All rights reserved.`}
          </p>
          <p className="text-white/35 text-[11px] font-semibold text-center">
            {currentDate && `Last updated: ${currentDate} · `}NABL Accredited Medical Laboratory · {ISO_STANDARD} · Bengaluru, Karnataka
          </p>
          <div className="flex gap-3 items-center justify-center flex-wrap my-1">
            {[
              { href: SOCIAL_LINKS.facebook, label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              { href: SOCIAL_LINKS.instagram, label: "Instagram", path: null, isInsta: true },
              { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", path: null, isLi: true },
            ].map(s => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: GLASS, border: GLASS_BORDER }}
                aria-label={s.label}>
                {s.path && (
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d={s.path} /></svg>
                )}
                {s.isInsta && (
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                )}
                {s.isLi && (
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                )}
              </Link>
            ))}
            <div className="w-px h-4 mx-1 bg-white/10" />
            <Link href="/privacy-policy" className="text-white/50 hover:text-white text-xs font-semibold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-xs font-semibold transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
