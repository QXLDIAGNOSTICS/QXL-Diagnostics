"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Search, Phone, User, ChevronDown, ChevronRight, Mic, FileText, Menu, X, Home, Layers, Microscope, ShoppingCart, Calendar, CalendarCheck, Briefcase, Bot, Sparkles, Globe, MessageSquareText } from 'lucide-react';
import PrescriptionModal from './PrescriptionModal';
import SmartSearchBar from './SmartSearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

import { cmsStore } from '../lib/cmsStore';
import { useAuth } from '../lib/useAuth';
import { api } from '../lib/api';
import { optimizeCloudinaryUrl } from '../lib/cloudinary';
import InstallPrompt from './InstallPrompt';
import CartDrawer from './CartDrawer';
import AiDiagnostics from './AiDiagnostics';

const FALLBACK_LOGO =
  "https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png";

import { getActiveCampaign } from '../lib/campaignScheduler';
import { isCampaignActive } from '../lib/rakshaBandhanConfig';

function useHeaderCountdown() {
  const target = useRef(new Date('2026-08-31T23:59:59+05:30').getTime()).current;
  const [timeLeft, setTimeLeft] = useState({ d: 7, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ d, h, m, s });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return timeLeft;
}

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const countdown = useHeaderCountdown();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
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
      { label: "Founder & Consultants", href: "/team", visible: true },
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
    { label: "Tests", href: "/tests", visible: true },
    { label: "Health Packages", href: "/packages", visible: true },
    { label: "Specialities", href: "/specialities", visible: true },
    { label: "Home Collection", href: "/home-blood-collection-bangalore", visible: true },
    { label: "Locations", href: "/centers", visible: true },
    { label: "For Doctors", href: "/doctor-led-diagnostic-lab-bengaluru", visible: true },
    { label: "About QXL", href: "/about", visible: true },
    { label: "My Reports", href: "/report", visible: true },
    { label: "My Bookings", href: "/dashboard", visible: true },
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
    { id: "loc-1", name: "Bangalore – QXL Diagnostics Super Speciality Reference Laboratory (NABL Certified) (Kengeri)", city: "Bengaluru" },
    { id: "loc-2", name: "Nayandahalli (Mysuru Road) – Spandana Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-3", name: "Nagarabhavi – Astrio Multispeciality Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-4", name: "Chandra Layout – Nandi Diagnostics, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-5", name: "Yelahanka Old Town – Shushrusha Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-6", name: "Yelahanka (Galleria Mall) – North City Specialities Powered by QXL Diagnostics (NABL Certified)", city: "Bengaluru" },
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
      {/* Pure Solid White Header */}
      <header
        className="w-full relative lg:sticky lg:top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs"
        style={{
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* Top Announcement Bar — Desktop (Deep Navy Bar with Smooth Marquee) */}
        <div className="hidden lg:flex bg-[#0B2545] text-white text-[11px] font-black py-1 px-3 items-center overflow-hidden border-b border-amber-500/20 shadow-xs relative">
          <div className="flex whitespace-nowrap animate-marquee-fast hover:[animation-play-state:paused] w-max cursor-pointer" style={{ animationDuration: '45s' }}>
            {[1, 2].map((repeatKey) => (
              <div key={repeatKey} className="flex items-center gap-4 shrink-0 mr-8">
                <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">NABL ACCREDITED (MC-6849)</span>
                <span className="text-sky-100 font-bold">•</span>
                <div className="brand-strip text-[11px] font-black !text-white inline-flex items-center gap-1 m-0 p-0">
                  <span>Doctor-Led NABL Certified Diagnostic Lab in Bengaluru</span>
                </div>
                <span className="text-sky-100 font-bold">•</span>
                <span className="text-white text-[11px] font-black">300+ Tests &amp; Preventive Checkup Packages</span>
                <span className="text-sky-100 font-bold">•</span>
                <span className="text-white text-[11px] font-black">Free Doorstep Home Collection Across All Bengaluru Localities</span>
                <span className="text-sky-100 font-bold">•</span>
                <a href="tel:+919964639639" className="text-amber-300 font-extrabold hover:underline text-[11px]">24×7 Support: +91 9964 639 639</a>
              </div>
            ))}
          </div>
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
                <div className="w-full transition-all duration-300 rounded-full bg-white border border-slate-200 shadow-sm focus-within:border-[#0f2d5e] focus-within:ring-2 focus-within:ring-[#0f2d5e]/10">
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
                  <span className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #D69A18 0%, #E08500 100%)', boxShadow: '0 2px 8px rgba(214,154,24,0.35)' }}>
                    {userInitial}
                  </span>
                  <span className="text-[12px] font-extrabold text-[#0B2545] truncate">{userDisplayName}</span>
                </Link>
              )}
              {/* Language Switcher */}
              <LanguageSwitcher />
              {/* Cart — spatial glass orb */}
              <Link
                href="/book"
                className="hidden xl:flex items-center justify-center w-9 h-9 rounded-full relative transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(255,248,235,0.75)', border: '1px solid rgba(243,219,167,0.6)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(214,154,24,0.15), inset 0 1px 0 rgba(255,255,255,0.85)' }}
                title="Cart / Booked Tests"
              >
                <ShoppingCart className="w-4 h-4 text-[#D69A18]" />
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
                style={{ background: 'linear-gradient(135deg, #D69A18 0%, #E08500 100%)', color: '#ffffff' }}
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
                      className={`relative shrink-0 inline-flex items-center justify-center px-1.5 xl:px-2.5 2xl:px-3 py-1.5 rounded-lg uppercase tracking-wide whitespace-nowrap leading-none transition-all duration-200 ${
                        isActive
                          ? "bg-[#FFF8EB] text-[#D69A18] font-black border border-[#F3DBA7]"
                          : "text-[#0f2d5e] hover:bg-slate-100 hover:text-[#D69A18]"
                      }`}
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
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-white flex items-center justify-between px-2.5 sm:px-4 h-[60px] border-b border-slate-100 shadow-2xs max-w-full overflow-hidden">
        {/* Left Side: Menu + Logo + Location Pill */}
        <div className="flex items-center gap-1.5 xs:gap-2 min-w-0 shrink">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-transform cursor-pointer shrink-0"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#0f2d5e]" strokeWidth={2.2} />
          </button>

          <Link href="/" className="flex items-center py-0.5 shrink-0">
            <img
              src={settings.logoImage || FALLBACK_LOGO}
              alt={settings.siteName || "QXL Diagnostics"}
              width={140}
              height={36}
              className="h-6 xs:h-7 w-auto object-contain max-h-[26px] xs:max-h-[30px]"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_LOGO;
              }}
            />
            <span className="logo-text-other hidden font-black text-base text-[#0f2d5e]">QXL Diagnostics</span>
          </Link>

          {/* Location Button Pill Right After Logo — Compact & Crisp */}
          <button
            type="button"
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-1 bg-white border border-slate-200 hover:border-amber-300 px-2 py-0.5 rounded-full text-[10px] xs:text-[11px] font-black text-[#0f2d5e] shrink active:scale-95 transition-all cursor-pointer shadow-2xs min-w-0"
            aria-label="Change Location"
            title={location || "Bangalore"}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-amber-50 flex items-center justify-center shrink-0 border border-amber-200/80">
              <MapPin className="w-2.5 h-2.5 text-[#D69A18] shrink-0" />
            </div>
            <span className="truncate max-w-[65px] xs:max-w-[90px] font-black text-[#0f2d5e]">
              {isMounted ? getShortLocationName(location) : "Bangalore"}
            </span>
            <ChevronDown className="w-2.5 h-2.5 text-[#D69A18] shrink-0" />
          </button>
        </div>

        {/* Right Side: Cart & Profile Icons */}
        <div className="flex items-center gap-1.5 shrink-0 ml-1">
          <Link
            href="/book"
            className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0f2d5e] relative active:scale-95 transition-transform shrink-0 cursor-pointer"
            aria-label="View Cart and Checkout"
          >
            <ShoppingCart className="w-4 h-4 text-[#0f2d5e]" strokeWidth={2.0} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href={user ? "/profile" : "/login"}
            className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0f2d5e] active:scale-95 transition-transform shrink-0 cursor-pointer"
            aria-label="User Profile"
          >
            {user ? (
              <span className="text-xs font-black text-[#0f2d5e]">{userInitial}</span>
            ) : (
              <User className="w-4 h-4 text-[#0f2d5e]" strokeWidth={2.0} />
            )}
          </Link>
        </div>
      </div>

      {/* Spacer for Fixed Top Header (60px) */}
      <div className="h-[60px]" />
    </div>

      {/* ── LOCATION BOTTOM SHEET MODAL (mobile slide-up bottom sheet) ── */}
      <AnimatePresence>
        {showLocationModal && (
          <div className="fixed inset-0 z-[100001] lg:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setShowLocationModal(false)}
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative bg-white rounded-t-3xl shadow-2xl w-full max-h-[85vh] flex flex-col overflow-hidden z-10"
            >
              {/* Handle Bar */}
              <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D69A18]" />
                  <div>
                    <h3 className="font-black text-[#0f2d5e] text-base leading-tight">Select Location</h3>
                    <p className="text-[11px] text-slate-500 font-semibold">Home collection available in your area</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                  aria-label="Close location modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(85vh-90px)]">

                {/* 1. Detect Current Location */}
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        () => changeLocation("Bengaluru (GPS)"),
                        () => changeLocation("Bengaluru")
                      );
                    } else {
                      changeLocation("Bengaluru");
                    }
                  }}
                  className="w-full p-3.5 rounded-2xl bg-amber-50/80 border border-[#F3DBA7] hover:bg-amber-100/80 transition-all flex items-center justify-between text-left cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#D69A18] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-extrabold text-[#0f2d5e] text-xs block">
                        Detect Current Location
                      </span>
                      <span className="text-[10.5px] text-slate-500 font-medium">Using GPS for instant detection</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D69A18]" />
                </button>

                {/* 2. Enter PIN Code */}
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
                  <label className="block text-[11px] font-black text-[#0f2d5e] uppercase tracking-wider mb-2">
                    Enter PIN Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 560102"
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-[#0f2d5e] focus:outline-none focus:border-[#D69A18]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          changeLocation(`PIN ${e.currentTarget.value} - Bengaluru`);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = (e.currentTarget.previousElementSibling as HTMLInputElement)?.value;
                        if (input) changeLocation(`PIN ${input} - Bengaluru`);
                      }}
                      className="bg-[#D69A18] hover:bg-[#b88313] text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                      style={{ color: '#ffffff' }}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* 3. Saved Address */}
                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Saved Address</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Default</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => changeLocation("HSR Layout, Bengaluru")}
                    className="w-full text-left flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[#0f2d5e] shrink-0 mt-0.5">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-extrabold text-[#0f2d5e] text-xs block">Home</span>
                      <span className="text-[11px] text-slate-600 font-medium leading-tight block">
                        HSR Layout, Sector 2, Bengaluru - 560102
                      </span>
                    </div>
                  </button>
                </div>

                {/* 4. Select QXL Centre */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black text-[#0f2d5e] uppercase tracking-wider block px-1">
                    Select QXL Centre
                  </span>
                  <div className="space-y-2">
                    {cityNames.map((cityKey) => {
                      const isExpanded = expandedCity === cityKey;
                      const cityBranches = groupedByCity[cityKey];
                      return (
                        <div key={cityKey} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                          <button
                            onClick={() => setExpandedCity(isExpanded ? null : cityKey)}
                            className={`w-full flex items-center justify-between px-4 py-3 font-extrabold text-xs transition-all ${
                              isExpanded ? 'bg-amber-50 text-[#D69A18]' : 'text-slate-700'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#D69A18]" />
                              {cityKey} Centres ({cityBranches.length})
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-[#D69A18]' : 'text-slate-400'}`} />
                          </button>

                          {isExpanded && (
                            <div className="bg-white border-t border-slate-100 divide-y divide-slate-100 max-h-[180px] overflow-y-auto">
                              {cityBranches.map((branch: any) => {
                                const isBranchSelected = location === branch.name;
                                return (
                                  <button
                                    key={branch.id}
                                    onClick={() => changeLocation(branch.name)}
                                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between ${
                                      isBranchSelected ? 'font-extrabold text-[#D69A18] bg-amber-50/50' : 'text-slate-600 font-medium'
                                    }`}
                                  >
                                    <span>{getShortLocationName(branch.name)}</span>
                                    {isBranchSelected && <span className="text-[#D69A18] font-bold">✓</span>}
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MOBILE SIDEBAR DRAWER (Left Side) ── */}
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed inset-y-0 left-0 w-[300px] h-full bg-white shadow-2xl flex flex-col z-[100001] overflow-hidden"
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

      {/* ── MOBILE BOTTOM NAVIGATION (5 Tabs: Home | Tests | Bookings | Reports | Profile) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden flex flex-col bg-white border-t border-slate-200/80 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <nav
          className="flex justify-between items-center h-[62px] px-1 relative"
          aria-label="Mobile navigation"
        >
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full active:scale-95 transition-transform relative ${
              pathname === '/' ? 'text-[#0f2d5e]' : 'text-slate-400 hover:text-[#0f2d5e]'
            }`}
          >
            {pathname === '/' && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-[#D69A18]" />
            )}
            <Home className={`w-5 h-5 ${pathname === '/' ? 'text-[#0f2d5e]' : 'text-slate-400'}`} strokeWidth={pathname === '/' ? 2.4 : 1.8} />
            <span className={`text-[10px] ${pathname === '/' ? 'font-black text-[#0f2d5e]' : 'font-semibold text-slate-400'} tracking-tight`}>
              Home
            </span>
          </Link>

          {/* Tab 2: Tests */}
          <Link
            href="/tests"
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full active:scale-95 transition-transform relative ${
              pathname?.startsWith('/tests') ? 'text-[#0f2d5e]' : 'text-slate-400 hover:text-[#0f2d5e]'
            }`}
          >
            {pathname?.startsWith('/tests') && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-[#D69A18]" />
            )}
            <Microscope className={`w-5 h-5 ${pathname?.startsWith('/tests') ? 'text-[#0f2d5e]' : 'text-slate-400'}`} strokeWidth={pathname?.startsWith('/tests') ? 2.4 : 1.8} />
            <span className={`text-[10px] ${pathname?.startsWith('/tests') ? 'font-black text-[#0f2d5e]' : 'font-semibold text-slate-400'} tracking-tight`}>
              Tests
            </span>
          </Link>

          {/* Tab 3 (CENTER): AI Chat */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('openAiChat'))}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full active:scale-95 transition-transform relative text-[#2563eb] cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 text-white flex items-center justify-center shadow-xs">
              <MessageSquareText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] font-black text-[#2563eb] tracking-tight">
              AI Chat
            </span>
          </button>

          {/* Tab 4: Bookings */}
          <Link
            href="/book"
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full active:scale-95 transition-transform relative ${
              pathname?.startsWith('/book') ? 'text-[#0f2d5e]' : 'text-slate-400 hover:text-[#0f2d5e]'
            }`}
          >
            {pathname?.startsWith('/book') && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-[#D69A18]" />
            )}
            <Calendar className={`w-5 h-5 ${pathname?.startsWith('/book') ? 'text-[#0f2d5e]' : 'text-slate-400'}`} strokeWidth={pathname?.startsWith('/book') ? 2.4 : 1.8} />
            <span className={`text-[10px] ${pathname?.startsWith('/book') ? 'font-black text-[#0f2d5e]' : 'font-semibold text-slate-400'} tracking-tight`}>
              Bookings
            </span>
          </Link>

          {/* Tab 5: Reports */}
          <Link
            href="/report"
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full active:scale-95 transition-transform relative ${
              pathname?.startsWith('/report') ? 'text-[#0f2d5e]' : 'text-slate-400 hover:text-[#0f2d5e]'
            }`}
          >
            {pathname?.startsWith('/report') && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-[#D69A18]" />
            )}
            <FileText className={`w-5 h-5 ${pathname?.startsWith('/report') ? 'text-[#0f2d5e]' : 'text-slate-400'}`} strokeWidth={pathname?.startsWith('/report') ? 2.4 : 1.8} />
            <span className={`text-[10px] ${pathname?.startsWith('/report') ? 'font-black text-[#0f2d5e]' : 'font-semibold text-slate-400'} tracking-tight`}>
              Reports
            </span>
          </Link>
        </nav>
      </div>

      {/* ── QXL HEALTH AI ASSISTANT MODAL OVERLAY ── */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100005] bg-white flex flex-col overflow-hidden animate-in fade-in duration-200">
          <div className="bg-gradient-to-r from-[#D69A18] via-amber-600 to-amber-700 text-white p-3.5 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white leading-snug">QXL Health AI Assistant</h3>
                <p className="text-[10px] text-amber-100 font-bold">24/7 Smart Symptom &amp; Diagnostic Advisor</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAiModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AiDiagnostics decorativeHeading={true} />
          </div>
        </div>
      )}

      {/* Prescription Modal */}
      <PrescriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </>
  );
}
