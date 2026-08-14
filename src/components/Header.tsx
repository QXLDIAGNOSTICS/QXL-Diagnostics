"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Search, Phone, User, ChevronDown, ChevronRight, Mic, FileText, Menu, X, Home, Layers, Microscope, ShoppingCart, Calendar, CalendarCheck } from 'lucide-react';
import PrescriptionModal from './PrescriptionModal';
import SmartSearchBar from './SmartSearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

import { cmsStore } from '../lib/cmsStore';
import { useAuth } from '../lib/useAuth';
import { api } from '../lib/api';
import { optimizeCloudinaryUrl } from '../lib/cloudinary';
import InstallPrompt from './InstallPrompt';

const FALLBACK_LOGO =
  "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png";

// Countdown to August 20, 2026 11:59:59 PM IST (1 week offer)
function useCountdown() {
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

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("Bengaluru");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const locationMenuRef = useRef<HTMLDivElement>(null);

  const countdown = useCountdown();

  const [branches, setBranches] = useState<any[]>([]);
  const [expandedCity, setExpandedCity] = useState<string | null>("Bengaluru");
  const [cartCount, setCartCount] = useState(0);
  const [tickerIndex, setTickerIndex] = useState(0);

  const [settings, setSettings] = useState<any>({
    siteName: "QXL Diagnostics",
    logoText: "QXL",
    logoImage: FALLBACK_LOGO,
    contactPhone: "+91 9964 639 639",
    whatsappNumber: "+91 9964 639 639",
    navItems: [
      { label: "Home", href: "/", visible: true },
      { label: "About Us", href: "/about", visible: true },
      { label: "Founder & Consultants", href: "/founder", visible: true },
      { label: "Our Specialities", href: "/specialities", visible: true },
      { label: "Packages", href: "/packages", visible: true },
      { label: "Find Nearest Centre", href: "/centers", visible: true },
      { label: "My Bookings", href: "/dashboard", visible: true },
      { label: "My Reports", href: "/report", visible: true },
      { label: "Login", href: "/login", visible: true }
    ]
  });

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('qxl_location');
    if (saved) setLocation(saved);
    
    const ticker = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % 2);
    }, 3500);

    const loadSettings = () => {
      setSettings(cmsStore.getSettings());
    };
    loadSettings();

    // Location selector must reflect real, admin-managed centers (see
    // /admin/locations, backed by the `centers` API) — not the legacy local
    // cmsStore mock data, otherwise newly added centers never show up here.
    const loadBranches = () => {
      api.centers
        .list()
        .then((centers) => setBranches(centers))
        .catch((err) => console.error("Failed to load centers for location selector", err));
    };
    loadBranches();

    const onCmsUpdate = () => {
      loadSettings();
      loadBranches();
    };
    window.addEventListener("cms-update", onCmsUpdate);
    window.addEventListener("focus", loadBranches);

    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('qxl_cart') || '[]');
        setCartCount(cart.length);
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener('cartChange', updateCartCount);

    const handleClickOutside = (e: MouseEvent) => {
      if (locationMenuRef.current && !locationMenuRef.current.contains(e.target as Node)) {
        setShowLocationModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("cms-update", onCmsUpdate);
      window.removeEventListener("focus", loadBranches);
      window.removeEventListener('cartChange', updateCartCount);
      clearInterval(ticker);
    };
  }, []);

  const getShortLocationName = (fullName: string) => {
    let name = fullName
      .replace("QXL Diagnostics ", "")
      .replace("QXL @ ", "")
      .replace("Qxl @ ", "")
      .replace("QXL@", "");
    
    // Replace Kengeri references with Bangalore for display
    if (name.toLowerCase().includes("kengeri")) {
      return "Bangalore";
    }
    return name;
  };

  const changeLocation = (loc: string) => {
    setLocation(loc);
    localStorage.setItem('qxl_location', loc);
    window.dispatchEvent(new CustomEvent('locationChange', { detail: loc }));
    setShowLocationModal(false);
  };

  const defaultNavItems = [
    { label: "Home", href: "/", visible: true },
    { label: "🇮🇳 Freedom 80 Offer", href: "/#freedom80-section", visible: true },
    { label: "Doctor-Led Lab", href: "/doctor-led-diagnostic-lab-bengaluru", visible: true },
    { label: "About Us", href: "/about", visible: true },
    { label: "Our Specialities", href: "/specialities", visible: true },
    { label: "Packages", href: "/packages", visible: true },
    { label: "Find Nearest Centre", href: "/centers", visible: true },
    { label: "My Bookings", href: "/dashboard", visible: true },
    { label: "My Reports", href: "/report", visible: true },
  ];
  const navItems = ((settings.navItems && settings.navItems.length > 0) ? settings.navItems : defaultNavItems)
    .filter((item: any) => item.visible !== false)
    .map((item: any) => {
      let href = item.href;
      if (!user && (item.label === "My Bookings" || item.label === "My Reports")) {
        href = `/login?redirect=${encodeURIComponent(item.href)}`;
      }
      if (String(item.label).toLowerCase() === "login" || String(item.label).toLowerCase() === "patient portal") {
        return user ? { ...item, label: "Profile", href: "/profile" } : { ...item, label: "Login", href: "/login" };
      }
      return { ...item, href };
    });
  const userDisplayName = user?.name?.trim() || user?.phone || "Profile";
  const userInitial = (user?.name?.trim()?.[0] || "U").toUpperCase();

  // Group real centers (from the backend, kept in sync with /admin/locations)
  // by city so any newly added location/city shows up here automatically —
  // falls back to a static seed list only while the API hasn't loaded yet.
  const fallbackBranches = [
    { id: "loc-1", name: "Bangalore – QXL Diagnostics Super Speciality Reference Laboratory (NABL Accredited) (Kengeri)", city: "Bengaluru" },
    { id: "loc-2", name: "Nayandahalli (Mysuru Road) – Spandana Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-3", name: "Nagarabhavi – Astrio Multispeciality Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-4", name: "Chandra Layout – Nandi Diagnostics, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-5", name: "Yelahanka Old Town – Shushrusha Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-6", name: "Yelahanka (Galleria Mall) – North City Specialities Powered by QXL Diagnostics (NABL Accredited)", city: "Bengaluru" },
    { id: "loc-7", name: "Sanjaynagar – Nisarga Diagnostics, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-8", name: "Vidyaranyapura – Dr. Abhi Kollur's Clinic, Powered by QXL Diagnostics", city: "Bengaluru" },
  ];
  const sourceBranches = (branches.length > 0 ? branches : fallbackBranches).filter((b: any) => {
    const cityName = (b.city || "").toLowerCase();
    const branchName = (b.name || "").toLowerCase();
    return !cityName.includes("delhi") && !cityName.includes("kochi") &&
           !branchName.includes("delhi") && !branchName.includes("kochi");
  });
  const groupedByCity: Record<string, any[]> = {};
  for (const b of sourceBranches) {
    const city = (b.city || "Bengaluru").trim();
    if (!groupedByCity[city]) groupedByCity[city] = [];
    groupedByCity[city].push(b);
  }
  const cityNames = Object.keys(groupedByCity).sort((a, b) =>
    a === "Bengaluru" ? -1 : b === "Bengaluru" ? 1 : a.localeCompare(b)
  );

  return (
    <>
      {/* Spatial liquid glass header — Indian Flag Theme */}
      <header
        className="w-full sticky top-0 z-50"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.08) 0%, rgba(255,255,255,0.95) 50%, rgba(19, 136, 8, 0.05) 100%)',
          backdropFilter: 'blur(28px) saturate(200%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.05)',
          boxShadow: '0 8px 40px rgba(255, 153, 51, 0.10), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(19, 136, 8, 0.15) inset'
        }}
      >
        {/* Top Announcement Bar — Desktop */}
        <div className="hidden lg:flex bg-emerald-600 text-white text-[11px] font-black py-2 px-3 items-center justify-center relative overflow-hidden z-20">
          <div className="flex flex-row items-center justify-center gap-3 max-w-[1400px] mx-auto w-full flex-wrap">
            
            {/* Badges & Offer */}
            <span className="bg-white/20 text-white border border-white/30 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              🇮🇳 INDEPENDENCE DAY SPECIAL
            </span>
            <span className="text-emerald-200 font-bold shrink-0">•</span>
            <span className="font-extrabold text-white text-[10px] tracking-wide shrink-0">
              QXL FREEDOM 80 · 80 PARAMETERS · <span className="text-amber-200 font-black underline decoration-2">ONLY ₹800</span>
            </span>
            <span className="bg-white/15 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">SAVE 86%</span>

            <span className="text-emerald-300 font-bold text-[10px] shrink-0">|</span>

            {/* Countdown */}
            {!countdown.expired && (
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-amber-200 text-[9px] font-black uppercase tracking-wider">⏰ LIMITED OFFER ENDS:</span>
                <div className="flex items-center gap-0.5">
                  {[{v: countdown.d, l:'D'}, {v: countdown.h, l:'H'}, {v: countdown.m, l:'M'}, {v: countdown.s, l:'S'}].map(({v, l}, i) => (
                    <React.Fragment key={l}>
                      <div className="bg-white/20 rounded px-1.5 py-0.5 text-center min-w-[26px]">
                        <span className="font-black text-white text-[11px] tabular-nums">{String(v).padStart(2,'0')}</span>
                        <span className="text-emerald-200 text-[7px] block font-bold leading-none">{l}</span>
                      </div>
                      {i < 3 && <span className="text-amber-200 font-black text-[11px]">:</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            {countdown.expired && (
              <span className="text-amber-200 text-[9px] font-black uppercase tracking-wider shrink-0">🇮🇳 OFFER EXPIRED</span>
            )}

            <span className="text-emerald-300 font-bold text-[10px] shrink-0">|</span>

            {/* Book Now Button */}
            <Link
              href="/book?package=QXL%20Freedom%2080%20Health%20Check"
              className="inline-flex items-center justify-center gap-1 bg-white hover:bg-slate-100 text-[10px] font-black px-3.5 py-1 rounded-full shadow-md active:scale-95 transition-all shrink-0 uppercase tracking-wider cursor-pointer"
              style={{ color: '#059669' }}
            >
              Book Now →
            </Link>
          </div>
          {/* Animated Tricolour Underline */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[2.5px] animate-tricolour-wave"
            style={{
              background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
              backgroundSize: '200% 100%'
            }}
          />
        </div>


        {/* Liquid glass orb decorations — spatial depth */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:'absolute', top:'-40px', left:'-60px', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle, rgba(255, 153, 51, 0.15) 0%, transparent 70%)', filter:'blur(30px)' }} />
          <div style={{ position:'absolute', top:'-30px', right:'10%', width:'160px', height:'160px', borderRadius:'50%', background:'radial-gradient(circle, rgba(0, 0, 128, 0.10) 0%, transparent 70%)', filter:'blur(24px)' }} />
          <div style={{ position:'absolute', bottom:'-20px', left:'40%', width:'220px', height:'80px', borderRadius:'50%', background:'radial-gradient(circle, rgba(19, 136, 8, 0.15) 0%, transparent 70%)', filter:'blur(20px)' }} />
        </div>

      {/* ── DESKTOP HEADER (lg:block) ── */}
      <div className="hidden lg:block relative z-10">
        {/* Top Row */}
        <div className="py-2.5" style={{ borderBottom: '1px solid rgba(125,199,232,0.18)' }}>
          <div className="w-full px-4 lg:px-8 flex items-center justify-between">

            {/* Logo & Location */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                  src={optimizeCloudinaryUrl(settings.logoImage || FALLBACK_LOGO, { w: 302, h: 95, crop: "fit" })}
                  alt={settings.siteName || "QXL Diagnostics"}
                  width={302}
                  height={95}
                  fetchPriority="high"
                  style={{ height: '95px', width: 'auto', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackSpan = e.currentTarget.parentElement?.querySelector('.logo-text-header') as HTMLElement;
                    if (fallbackSpan) fallbackSpan.classList.remove('hidden');
                  }}
                />
                <span className="logo-text-header font-extrabold text-2xl text-[#0f2d5e] hidden">
                  {settings.logoText || "QXL"}
                </span>
              </Link>
              <div className="h-7 w-px mx-5 hidden md:block" style={{ background: 'linear-gradient(to bottom, transparent, rgba(125,199,232,0.4), transparent)' }}></div>
              <div className="relative" ref={locationMenuRef}>
                <div
                  className="flex items-center cursor-pointer transition-all duration-200 focus:outline-none rounded-2xl p-1.5 pr-3 group"
                  style={{ background: 'rgba(224,242,254,0.55)', border: '1px solid rgba(125,199,232,0.3)', backdropFilter: 'blur(8px)' }}
                  onClick={() => setShowLocationModal(!showLocationModal)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setShowLocationModal(!showLocationModal);
                    }
                  }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.3) 0%, rgba(255, 153, 51, 0.1) 100%)', boxShadow: '0 2px 8px rgba(255, 153, 51, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                    <MapPin className="w-3.5 h-3.5 text-[#000080]" />
                  </div>
                  <span className="font-semibold text-sm text-[#0b132b] max-w-[150px] truncate">
                    {isMounted ? getShortLocationName(location) : "Bengaluru"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 ml-1 text-[#FF9933]" />
                </div>
                <AnimatePresence>
                  {showLocationModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 rounded-2xl py-2 z-[100] max-h-[420px] overflow-y-auto origin-top-left"
                      style={{ background: 'rgba(240,249,255,0.95)', backdropFilter: 'blur(24px) saturate(180%)', border: '1px solid rgba(125,199,232,0.3)', boxShadow: '0 20px 60px rgba(14,165,233,0.15), 0 1px 0 rgba(255,255,255,0.9) inset' }}
                    >
                      {cityNames.map((cityName) => (
                        <div key={cityName}>
                          <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mt-1 first:mt-0">
                            {cityName} Centres
                          </div>
                          {groupedByCity[cityName].map((branch: any) => (
                            <div
                              key={branch.id}
                              onClick={() => changeLocation(branch.name)}
                              className={`px-5 py-2 text-[11px] cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between ${
                                location === branch.name ? 'font-extrabold text-[#2563eb]' : 'text-slate-700 font-medium'
                              }`}
                            >
                              <span className="line-clamp-2 leading-relaxed pr-2 text-left" title={getShortLocationName(branch.name)}>{getShortLocationName(branch.name)}</span>
                              {location === branch.name && <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0" />}
                            </div>
                          ))}
                        </div>
                      ))}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Search Bar — liquid glass input */}
            <div className="flex-1 max-w-[600px] mx-6 hidden md:block relative z-30">
              <div className="flex items-center w-full relative group">
                <div className="w-full transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(255,153,51,0.15)]" style={{ borderRadius: '999px', background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255, 153, 51, 0.35)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 16px rgba(255, 153, 51, 0.08), inset 0 1px 0 rgba(255,255,255,0.85)' }}>
                  <SmartSearchBar placeholder={settings.searchPlaceholder || "Search Tests"} isMobile={false} />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#0284c7] hover:bg-sky-100/60 rounded-full transition-colors" aria-label="Upload Prescription">
                  <FileText className="w-5 h-5" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-rose-500 rounded-full border border-white flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Home Collection — liquid glass pill with ticker */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl cursor-pointer" style={{ background: 'rgba(224,242,254,0.55)', border: '1px solid rgba(125,199,232,0.28)', backdropFilter: 'blur(8px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(147,210,255,0.7) 0%, rgba(186,230,255,0.5) 100%)', boxShadow: '0 2px 8px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.9)' }}>
                  <svg className="w-3.5 h-3.5 text-[#0284c7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="relative overflow-hidden h-[36px] w-[145px]">
                  <AnimatePresence mode="wait">
                    {tickerIndex === 0 ? (
                      <motion.div key="1" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col justify-center leading-tight whitespace-nowrap">
                        <span className="text-[10px] text-[#0369a1]/80 font-semibold tracking-wide">Home Collection</span>
                        <a href="tel:+919964639639" className="text-[#0369a1] font-extrabold text-[13px] hover:text-[#0284c7] whitespace-nowrap">+91 9964 639 639</a>
                      </motion.div>
                    ) : (
                      <motion.div key="2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex flex-col justify-center leading-tight whitespace-nowrap">
                        <span className="text-[10px] text-[#16a34a] font-bold uppercase tracking-wider animate-pulse">Call Now</span>
                        <a href="tel:+919964639639" className="text-[#0369a1] font-extrabold text-[13px] hover:text-[#0284c7] whitespace-nowrap">+91 9964 639 639</a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {user && (
                <Link
                  href="/profile"
                  className="hidden xl:flex items-center gap-2 max-w-[180px] rounded-full px-3 py-2 transition-all duration-200"
                  style={{ background: 'rgba(224,242,254,0.6)', border: '1px solid rgba(125,199,232,0.3)', backdropFilter: 'blur(8px)' }}
                  title={userDisplayName}
                >
                  <span className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}>
                    {userInitial}
                  </span>
                  <span className="text-[12px] font-extrabold text-[#0369a1] truncate">{userDisplayName}</span>
                </Link>
              )}
              {/* Language Switcher */}
              <LanguageSwitcher />
              {/* Cart — spatial glass orb */}
              <Link
                href="/book"
                className="hidden xl:flex items-center justify-center w-9 h-9 rounded-full relative transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(224,242,254,0.65)', border: '1px solid rgba(125,199,232,0.35)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.85)' }}
                title="Cart / Booked Tests"
              >
                <ShoppingCart className="w-4 h-4 text-[#0284c7]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold text-white" style={{ background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)', boxShadow: '0 2px 6px rgba(239,68,68,0.4)' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Book a Test — clean pill button */}
              <Link
                href="/book"
                className="hidden xl:inline-flex items-center font-black px-6 py-2.5 rounded-full text-[11px] uppercase tracking-wider whitespace-nowrap active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)', color: '#ffffff' }}
              >
                <span className="!text-white font-black flex items-center gap-1.5" style={{ color: '#ffffff' }}>
                  <span>BOOK A TEST</span>
                  <span>→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Nav Row — single-line glass strip (never wraps) */}
        <div className="pb-2 pt-1 px-3 xl:px-4">
          <div className="max-w-[1400px] mx-auto">
            <nav
              className="rounded-2xl px-2 xl:px-3 relative overflow-hidden bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-md"
            >
              <div className="flex flex-nowrap items-center justify-between w-full gap-0 py-1.5 text-[9.5px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] font-extrabold relative z-10">
                {navItems.map((item: any) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="relative shrink-0 inline-flex items-center justify-center px-1.5 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg uppercase tracking-wide whitespace-nowrap leading-none transition-all duration-300 text-[#0b132b] hover:text-[#000080]"
                      style={isActive ? {
                        background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.15), rgba(255, 153, 51, 0.05))',
                        color: '#000080',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 4px rgba(255, 153, 51, 0.05)'
                      } : undefined}
                      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255, 153, 51, 0.1)'; }}
                      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* ── MOBILE HEADER (lg:hidden) — EXACT IMAGE 2 DESIGN ── */}
      <div className="lg:hidden flex flex-col w-full relative z-10 bg-white pb-3 rounded-b-2xl shadow-sm border-b border-gray-100">
        {/* Top Strip (Blue Strip): Location & Call Number */}
        <div className="bg-[#2563eb] text-white px-4 py-1.5 flex items-center justify-between text-[11px] font-extrabold shadow-sm">
          {/* Location Selector */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-1 text-white hover:text-sky-100 transition-colors"
            title="Select Location"
          >
            <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
            <span>{getShortLocationName(location) || "Bangalore"}</span>
            <ChevronDown className="w-3 h-3 text-white/80 shrink-0" />
          </button>

          {/* Call Number */}
          <a
            href={`tel:${settings.phone_e164 || '+919964639639'}`}
            className="flex items-center gap-1.5 text-white hover:text-sky-100 transition-colors"
            title="Call QXL Diagnostics"
          >
            <Phone className="w-3.5 h-3.5 fill-white text-white shrink-0" />
            <span>9964 639 639</span>
          </a>
        </div>

        {/* Main Bar: Hamburger, QXL Logo, Translate & Blue CART Pill */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200/60 transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Company Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src={optimizeCloudinaryUrl(settings.logoImage || FALLBACK_LOGO, { w: 220, h: 60, crop: "fit" })}
                alt={settings.siteName || "QXL Diagnostics"}
                width={220}
                height={60}
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallbackSpan = e.currentTarget.parentElement?.querySelector('.logo-text-mobile') as HTMLElement;
                  if (fallbackSpan) fallbackSpan.classList.remove('hidden');
                }}
              />
              <span className="logo-text-mobile font-extrabold text-lg text-[#0f2d5e] hidden">
                {settings.logoText || "QXL"}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Translate Dropdown */}
            <LanguageSwitcher />

            {/* Blue CART Pill Button */}
            <Link
              href="/book"
              className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 text-white text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-md active:scale-95 transition-all relative"
              title="Cart / Bookings"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span>CART</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 rounded-full text-[10px] w-4.5 h-4.5 flex items-center justify-center font-bold text-white bg-rose-500 shadow-sm border border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Row 3: Search Bar */}
        <div className="px-4">
          <div className="bg-[#f8fafc] border border-slate-200 rounded-xl flex items-center px-3.5 py-2.5 relative shadow-xs">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <div 
              className="absolute inset-0 z-20 cursor-text"
              onClick={() => {
                const searchInput = document.querySelector('.mobile-search-trigger input') as HTMLInputElement;
                if (searchInput) searchInput.focus();
              }}
            />
            <div className="w-full opacity-0 absolute top-0 left-0 h-full pointer-events-none mobile-search-trigger">
              <SmartSearchBar placeholder="Search for Tests/Packages" isMobile={true} />
            </div>
            <span className="text-slate-400 text-xs ml-2 font-medium">Search for Tests/Packages</span>
          </div>
        </div>

        {/* Mobile Announcement Bar — Horizontal Scroll with Countdown */}
        <div className="mt-3 bg-emerald-600 text-white py-2 px-1 overflow-x-auto whitespace-nowrap flex items-center z-20 shadow-inner border-y border-emerald-700/50 relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {/* Hide webkit scrollbar using a global hack or just let it hide via touch */}
          <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
          
          <div className="flex items-center gap-2.5 w-max min-w-full px-3">
            <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs shrink-0">
              🇮🇳 INDEPENDENCE DAY SPECIAL
            </span>
            <span className="text-emerald-200 font-bold shrink-0">•</span>
            <span className="font-extrabold text-white text-[11px] tracking-wide shrink-0">
              QXL FREEDOM 80 · 80 PARAMETERS · <span className="text-amber-200 font-black underline decoration-2">ONLY ₹800</span>
            </span>
            <span className="bg-white/15 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white/30 uppercase tracking-wider shrink-0">
              SAVE 86%
            </span>
            {/* Countdown for mobile */}
            {!countdown.expired && (
              <>
                <span className="text-emerald-300 font-bold shrink-0">|</span>
                <span className="text-amber-200 text-[9px] font-black uppercase tracking-wider shrink-0">⏰ ENDS:</span>
                <div className="flex items-center gap-0.5 shrink-0">
                  {[{v: countdown.d, l:'D'}, {v: countdown.h, l:'H'}, {v: countdown.m, l:'M'}, {v: countdown.s, l:'S'}].map(({v, l}, i) => (
                    <React.Fragment key={l}>
                      <div className="bg-white/20 rounded px-1 py-0.5 text-center min-w-[22px]">
                        <span className="font-black text-white text-[10px] tabular-nums">{String(v).padStart(2,'0')}</span>
                        <span className="text-emerald-200 text-[7px] block font-bold leading-none">{l}</span>
                      </div>
                      {i < 3 && <span className="text-amber-200 font-black text-[10px]">:</span>}
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
            <Link
              href="/book?package=QXL%20Freedom%2080%20Health%20Check"
              className="inline-flex items-center justify-center gap-1 bg-white hover:bg-slate-100 text-[10px] font-black px-3.5 py-1 rounded-full shadow-md active:scale-95 transition-all shrink-0 uppercase tracking-wider cursor-pointer ml-1"
              style={{ color: '#059669' }}
            >
              Book Now →
            </Link>
          </div>
        </div>
      </div>

    </header>

      {/* ── LOCATION MODAL (mobile, centered) ── */}
      {showLocationModal && (
        <div className="fixed inset-0 z-[10000] lg:hidden flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowLocationModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563eb]" />
                <span className="font-extrabold text-[#0f2d5e] text-sm">Select Your Location</span>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-3 overflow-y-auto">
              {cityNames.map((cityKey) => {
                const isExpanded = expandedCity === cityKey;
                const cityBranches = groupedByCity[cityKey];
                
                return (
                  <div key={cityKey} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50 flex flex-col">
                    <button
                      onClick={() => setExpandedCity(isExpanded ? null : cityKey)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 font-extrabold text-xs transition-all ${
                        isExpanded ? 'bg-blue-50 text-[#2563eb]' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#2563eb]" />
                        {cityKey} Centres ({cityBranches.length})
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${isExpanded ? 'rotate-180 text-[#2563eb]' : 'text-slate-400'}`} />
                    </button>
                    
                    {isExpanded && (
                      <div className="bg-white border-t border-gray-100 py-1 flex flex-col max-h-[200px] overflow-y-auto divide-y divide-gray-50">
                        {cityBranches.map((branch: any) => {
                          const isBranchSelected = location === branch.name;
                          return (
                            <button
                              key={branch.id}
                              onClick={() => changeLocation(branch.name)}
                              className={`w-full text-left px-5 py-3 text-xs transition-colors flex items-center justify-between ${
                                isBranchSelected ? 'font-extrabold text-[#2563eb] bg-blue-50/20' : 'text-slate-600 font-medium'
                              }`}
                            >
                              <span className="pr-4 line-clamp-2 leading-relaxed text-left" title={getShortLocationName(branch.name)}>{getShortLocationName(branch.name)}</span>
                              {isBranchSelected && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[9998] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 w-[280px] h-[100dvh] bg-white shadow-2xl flex flex-col z-[9999]"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#eff6ff] to-white flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center text-white flex-shrink-0">
                    {user ? <span className="text-sm font-extrabold">{userInitial}</span> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-extrabold text-sm text-[#0f2d5e] truncate max-w-[145px]">
                      {user ? userDisplayName : "Welcome Guest"}
                    </p>
                    <Link href={user ? "/profile" : "/login"} onClick={() => setMobileMenuOpen(false)} className="text-[11px] text-[#2563eb] font-bold hover:underline">
                      {user ? "View Profile" : "Login / Register"}
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-slate-700 shadow-sm transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links — scrollable */}
              <div className="flex-1 overflow-y-auto py-2 px-3">
                <nav className="flex flex-col gap-0.5">
                  {navItems.map((item: any) => {
                    const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`min-h-[48px] px-4 rounded-xl flex items-center justify-between transition-colors mb-1 ${isActive
                          ? 'bg-[#e0f2fe] text-[#0284c7] font-extrabold'
                          : 'bg-[#f0f9ff] text-[#0369a1] hover:bg-[#e0f2fe] font-extrabold'
                          }`}
                      >
                        <span className="text-sm">{item.label}</span>
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#0284c7]' : 'text-[#7dd3fc]'}`} />
                      </Link>
                    );
                  })}
                  <div className="pt-1 border-t border-gray-100 mt-1">
                    <InstallPrompt />
                  </div>
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0 flex flex-col gap-3" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100/50 border border-blue-200">
                    <MapPin className="w-3.5 h-3.5 text-[#0369a1]" />
                  </div>
                  <div>
                    <p className="text-[#0f2d5e] text-[12px] font-bold mb-0.5">Main Lab (Kengeri)</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed">{settings.hqAddress || "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060"}</p>
                  </div>
                </div>
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="w-full text-center bg-white text-slate-700 font-extrabold py-3 rounded-xl hover:bg-gray-100 transition-colors text-xs flex items-center justify-center gap-2 border border-slate-200 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#2563eb]" /> Call: {settings.contactPhone}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM NAVIGATION — frosted glass ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden flex flex-col"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >


        <nav
          className="mx-2 mb-2 rounded-[22px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(224,242,254,0.78) 100%)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(125,199,232,0.35)',
            boxShadow: '0 -4px 24px rgba(14,165,233,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
          aria-label="Mobile navigation"
        >
          <div className="flex justify-around items-stretch h-[60px] px-1">
            {[
              { label: "Home", href: "/", icon: Home },
              { label: "Packages", href: "/packages", icon: Layers },
              { label: "Reports", href: "/report", icon: FileText },
              { label: user ? "Profile" : "Login", href: user ? "/profile" : "/login", icon: User },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = tab.href === '/' ? pathname === '/' : pathname?.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full rounded-xl mx-0.5 transition-colors"
                  style={isActive ? {
                    background: 'rgba(186,230,255,0.55)',
                  } : undefined}
                >
                  <TabIcon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-[#0284c7]' : 'text-slate-500'
                    }`}
                    strokeWidth={isActive ? 2.4 : 1.9}
                  />
                  <span
                    className={`text-[9px] font-bold tracking-wide uppercase leading-none ${
                      isActive ? 'text-[#0284c7]' : 'text-slate-500'
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Prescription Modal */}
      <PrescriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
