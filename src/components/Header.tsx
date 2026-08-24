"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Search, Phone, User, ChevronDown, ChevronRight, Mic, FileText, Menu, X, Home, Layers, Microscope, ShoppingCart, Calendar, CalendarCheck, Briefcase, Bot, Sparkles, Globe } from 'lucide-react';
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

import { getActiveCampaign } from '../lib/campaignScheduler';

function useHeaderCountdown() {
  const target = useRef(new Date('2026-08-31T23:59:59+05:30').getTime()).current;
  const [timeLeft, setTimeLeft] = useState({ d: 7, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const countdown = useHeaderCountdown();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("Bengaluru");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const locationMenuRef = useRef<HTMLDivElement>(null);

  const activeCampaign = getActiveCampaign();

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
      { label: "AI Assistant 🤖", href: "/#ai-assistant", visible: true },
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
    const handleOpenPrescription = () => setIsModalOpen(true);
    window.addEventListener('openPrescriptionModal', handleOpenPrescription);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("cms-update", onCmsUpdate);
      window.removeEventListener("focus", loadBranches);
      window.removeEventListener('cartChange', updateCartCount);
      window.removeEventListener('openPrescriptionModal', handleOpenPrescription);
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
    { label: "AI Assistant 🤖", href: "/#ai-assistant", visible: true },
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
        className="w-full relative lg:sticky lg:top-0 z-50"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.08) 0%, rgba(255,255,255,0.95) 50%, rgba(19, 136, 8, 0.05) 100%)',
          backdropFilter: 'blur(28px) saturate(200%) brightness(1.05)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.05)',
          boxShadow: '0 8px 40px rgba(255, 153, 51, 0.10), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(19, 136, 8, 0.15) inset'
        }}
      >
        {/* Top Announcement Bar — Desktop (Green Container with Live Countdown & Shimmer) */}
        <div className="hidden lg:flex bg-gradient-to-r from-[#138808] via-[#15803d] to-[#138808] text-white text-[11px] font-black py-2 px-3 items-center justify-center relative overflow-hidden z-20 shadow-xs border-b border-emerald-600/30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-sweep pointer-events-none" />
          <div className="flex flex-row items-center justify-center gap-3 max-w-[1400px] mx-auto w-full flex-wrap z-10">
            <span className="bg-amber-400 text-slate-950 text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="20" />
              </svg>
              <span>RAKSHA BANDHAN OFFER @ ₹800</span>
            </span>
            <span className="text-emerald-200 font-bold shrink-0">•</span>
            <span className="bg-black/25 text-amber-300 font-mono text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300/30 shrink-0 shadow-inner">
              ENDS IN: {countdown.d}d {String(countdown.h).padStart(2, '0')}h {String(countdown.m).padStart(2, '0')}m {String(countdown.s).padStart(2, '0')}s
            </span>
            <span className="text-emerald-200 font-bold shrink-0">•</span>
            <span className="font-extrabold text-white text-[11px] tracking-wide shrink-0">
              FREE HOME COLLECTION AVAILABLE
            </span>
            <span className="text-emerald-200 font-bold text-[10px] shrink-0">|</span>
            <Link
              href="/raksha-bandhan-health-checkup-bangalore"
              className="inline-flex items-center justify-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black px-3.5 py-1 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 uppercase tracking-wider cursor-pointer border border-amber-200"
            >
              CLAIM ₹800 OFFER →
            </Link>
          </div>
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
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Home Collection — compact pill */}
              <a href="tel:+919964639639" className="hidden sm:flex items-center gap-3 cursor-pointer transition-all hover:opacity-80">
                <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-tight justify-center">
                  <span className="text-[13px] font-medium text-slate-500">Home Collection</span>
                  <span className="text-black font-extrabold text-[16px] tracking-tight whitespace-nowrap">+91 9964 639 639</span>
                </div>
              </a>

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

      {/* placeholder — mobile header is rendered BELOW </header> so sticky works against viewport */}
    </header>

    {/* ── MOBILE HEADER (lg:hidden) — Universal Top Bar on All Pages ── */}
    <div className="lg:hidden flex flex-col w-full">
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-white flex items-center justify-between px-3 h-[60px] border-b border-slate-100 shadow-2xs max-w-full overflow-hidden">
        <div className="flex items-center gap-2 min-w-0">
          {pathname !== '/' && (
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors active:scale-95 text-slate-700 shrink-0 cursor-pointer"
              aria-label="Go back"
            >
              <svg className="w-5 h-5 text-[#0f2d5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          <Link href="/" className="flex items-center py-0.5 shrink-0">
            <img
              src={settings.logoImage || FALLBACK_LOGO}
              alt={settings.siteName || "QXL Diagnostics"}
              width={200}
              height={56}
              className="h-10 w-auto object-contain max-h-[42px]"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_LOGO;
              }}
            />
            <span className="logo-text-other hidden font-black text-base text-[#0f2d5e]">QXL Diagnostics</span>
          </Link>
        </div>

        {/* Menu / Right Sidebar Icon Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-transform cursor-pointer shrink-0"
          aria-label="Open Right Sidebar Menu"
        >
          <Menu className="w-6 h-6 text-[#0f2d5e]" strokeWidth={2.0} />
        </button>
      </div>

      {/* Spacer so page content doesn't hide behind the fixed header */}
      <div className="h-[60px]" />
    </div>

      {/* ── LOCATION MODAL (mobile, centered) ── */}
      {showLocationModal && (
        <div className="fixed inset-0 z-[10000] lg:hidden flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowLocationModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D69A18]" />
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
                        isExpanded ? 'bg-amber-50 text-[#D69A18]' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D69A18]" />
                        {cityKey} Centres ({cityBranches.length})
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${isExpanded ? 'rotate-180 text-[#D69A18]' : 'text-slate-400'}`} />
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
                                isBranchSelected ? 'font-extrabold text-[#D69A18] bg-amber-50/40' : 'text-slate-600 font-medium'
                              }`}
                            >
                              <span className="pr-4 line-clamp-2 leading-relaxed text-left" title={getShortLocationName(branch.name)}>{getShortLocationName(branch.name)}</span>
                              {isBranchSelected && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D69A18" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
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

      {/* ── MOBILE SIDEBAR DRAWER (Right Side) ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100000] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 right-0 w-[300px] h-full bg-white shadow-2xl flex flex-col z-[100001] overflow-hidden"
            >
              {/* Mobile Sidebar Header — High Contrast & Clean */}
              <div className="bg-[#FFF8EB] border-b border-[#F3DBA7] p-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#D69A18] flex items-center justify-center text-white shrink-0 shadow-sm">
                    {user ? <span className="text-base font-black text-white">{userInitial}</span> : <User className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="font-black text-base text-[#0f2d5e] leading-tight truncate max-w-[160px]" style={{ color: '#0f2d5e' }}>
                      {user ? userDisplayName : "Welcome Guest"}
                    </h3>
                    <Link
                      href={user ? "/profile" : "/login"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[12px] text-[#D69A18] font-bold hover:underline tracking-wide block mt-0.5"
                    >
                      {user ? "View Account Profile ›" : "Login or Register ›"}
                    </Link>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-xs transition-colors shrink-0 ml-2 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Scrollable Navigation Links */}
              <div className="flex-1 overflow-y-auto py-3 px-4 space-y-1">
                <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-slate-150/80">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#D69A18]" /> Translate Page
                  </span>
                  <LanguageSwitcher />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2 pt-1">Navigation</p>
                
                {navItems.map((item: any) => {
                  const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-[#FFF8EB] text-[#D69A18] font-black border border-[#F3DBA7] shadow-2xs'
                          : 'bg-slate-50 text-slate-800 font-bold hover:bg-amber-50/50 hover:text-[#D69A18] border border-slate-150/60'
                      }`}
                    >
                      <span className="text-[13px]">{item.label}</span>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D69A18]' : 'text-slate-400'}`} />
                    </Link>
                  );
                })}

                <div className="pt-2">
                  <InstallPrompt />
                </div>
              </div>

              {/* Sidebar Footer Action Section */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex-shrink-0 flex flex-col gap-3">
                <div className="flex gap-2">
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="flex-1 text-center bg-[#D69A18] text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" /> Call
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=919964639639"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-emerald-600 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    WhatsApp
                  </a>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <MapPin className="w-4 h-4 text-[#D69A18] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#0f2d5e] text-[11px] font-black">QXL Main Lab (Kengeri)</p>
                    <p className="text-slate-500 text-[10.5px] font-medium leading-tight">SLN Complex, Mysore Road, Kengeri, Bengaluru</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM NAVIGATION (5 Tabs with Center AI Button) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden flex flex-col bg-white border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <nav
          className="flex justify-around items-center h-[60px] px-1 relative"
          aria-label="Mobile navigation"
        >
          {[
            { label: "Home", href: "/", icon: Home, isCenter: false },
            { label: "Reports", href: "/report", icon: FileText, isCenter: false },
            { label: "AI Chat", href: "/#ai-assistant", icon: Bot, isCenter: true },
            { label: "Bookings", href: "/book", icon: Calendar, isCenter: false },
            { label: "Profile", href: user ? "/profile" : "/login", icon: User, isCenter: false },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = tab.href === '/' ? pathname === '/' : (tab.href !== '/#ai-assistant' && pathname?.startsWith(tab.href));

            if (tab.isCenter) {
              return (
                <button
                  type="button"
                  key={tab.label}
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('openAiChat'));
                  }}
                  className="flex flex-col items-center justify-center flex-1 h-full -mt-4 active:scale-95 transition-transform group cursor-pointer z-10"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#D69A18] to-[#f59e0b] text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-amber-400/30 group-hover:scale-110 transition-transform">
                    <Bot className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </div>
                  <span className="text-[10px] font-black text-[#D69A18] tracking-tight mt-0.5 uppercase">
                    AI Chat
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full active:scale-95 transition-transform ${
                  isActive ? 'text-[#D69A18]' : 'text-slate-400 hover:text-[#D69A18]'
                }`}
              >
                <TabIcon
                  className={`w-5 h-5 ${
                    isActive ? 'text-[#D69A18]' : 'text-slate-400'
                  }`}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
                <span
                  className={`text-[10px] ${
                    isActive ? 'font-black text-[#D69A18]' : 'font-semibold text-slate-400'
                  } tracking-tight`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Prescription Modal */}
      <PrescriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
