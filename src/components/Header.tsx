"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Search, Phone, User, ChevronDown, ChevronRight, Mic, FileText, Menu, X, Home, Layers, Microscope } from 'lucide-react';
import PrescriptionModal from './PrescriptionModal';
import SmartSearchBar from './SmartSearchBar';
import { motion, AnimatePresence } from 'framer-motion';

import { cmsStore } from '../lib/cmsStore';
import { useAuth } from '../lib/useAuth';
import { api } from '../lib/api';

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("Bengaluru");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const locationMenuRef = useRef<HTMLDivElement>(null);

  const [branches, setBranches] = useState<any[]>([]);
  const [expandedCity, setExpandedCity] = useState<string | null>("Bengaluru");

  const [settings, setSettings] = useState<any>({
    siteName: "QXL Diagnostics",
    logoText: "QXL",
    logoImage: "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png",
    contactPhone: "+91 99646 39639",
    whatsappNumber: "+91 99646 39639",
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
    setIsMounted(true);
    const saved = localStorage.getItem('qxl_location');
    if (saved) setLocation(saved);

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
    };
  }, []);

  const getShortLocationName = (fullName: string) => {
    return fullName
      .replace("QXL Diagnostics ", "")
      .replace("QXL @ ", "")
      .replace("Qxl @ ", "")
      .replace("QXL@", "");
  };

  const changeLocation = (loc: string) => {
    setLocation(loc);
    localStorage.setItem('qxl_location', loc);
    window.dispatchEvent(new CustomEvent('locationChange', { detail: loc }));
    setShowLocationModal(false);
  };

  const defaultNavItems = [
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
  ];
  const navItems = ((settings.navItems && settings.navItems.length > 0) ? settings.navItems : defaultNavItems)
    .filter((item: any) => item.visible !== false)
    .map((item: any) => {
      if (String(item.label).toLowerCase() === "login") {
        return user ? { ...item, label: "Profile", href: "/profile" } : { ...item, label: "Login", href: "/login" };
      }
      return item;
    });
  const userDisplayName = user?.name?.trim() || user?.phone || "Profile";
  const userInitial = (user?.name?.trim()?.[0] || "U").toUpperCase();

  // Group real centers (from the backend, kept in sync with /admin/locations)
  // by city so any newly added location/city shows up here automatically —
  // falls back to a static seed list only while the API hasn't loaded yet.
  const fallbackBranches = [
    { id: "loc-1", name: "Kengeri – QXL Diagnostics Super Speciality Reference Laboratory (NABL Accredited)", city: "Bengaluru" },
    { id: "loc-2", name: "Nayandahalli (Mysuru Road) – Spandana Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-3", name: "Nagarabhavi – Astrio Multispeciality Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-4", name: "Chandra Layout – Nandi Diagnostics, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-5", name: "Yelahanka Old Town – Shushrusha Hospital, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-6", name: "Yelahanka (Galleria Mall) – North City Specialities Powered by QXL Diagnostics (NABL Accredited)", city: "Bengaluru" },
    { id: "loc-7", name: "Sanjaynagar – Nisarga Diagnostics, Powered by QXL Diagnostics", city: "Bengaluru" },
    { id: "loc-8", name: "Vidyaranyapura – Dr. Abhi Kollur's Clinic, Powered by QXL Diagnostics", city: "Bengaluru" },
  ];
  const sourceBranches = branches.length > 0 ? branches : fallbackBranches;
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
      <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">

      {/* ── DESKTOP HEADER (lg:block) ── */}
      <div className="hidden lg:block">
        {/* Top Row */}
        <div className="border-b border-gray-100 py-3">
          <div className="w-full px-4 lg:px-8 flex items-center justify-between">

            {/* Logo & Location */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                  src={settings.logoImage || "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"}
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
              <div className="h-8 w-px bg-gray-200 mx-5 hidden md:block"></div>
              <div className="relative" ref={locationMenuRef}>
                <div
                  className="flex items-center cursor-pointer text-gray-700 hover:text-[#2563eb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb] rounded-lg p-1"
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
                  <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center mr-2">
                    <MapPin className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <span className="font-semibold text-sm text-[#4a5568] max-w-[150px] truncate">
                    {isMounted ? getShortLocationName(location) : "Bengaluru"}
                  </span>
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-400 hidden sm:block" />
                </div>
                <AnimatePresence>
                  {showLocationModal && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 max-h-[350px] overflow-y-auto origin-top-left"
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
                              <span className="truncate">{getShortLocationName(branch.name)}</span>
                              {location === branch.name && <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />}
                            </div>
                          ))}
                        </div>
                      ))}

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-[600px] mx-6 hidden md:block">
              <div className="flex items-center w-full relative">
                <SmartSearchBar placeholder={settings.searchPlaceholder || "Search Tests"} isMobile={false} />
                <button onClick={() => setIsModalOpen(true)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#1e3a8a] hover:bg-blue-50 rounded-full transition-colors" aria-label="Upload Prescription">
                  <FileText className="w-5 h-5" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 bg-red-500 rounded-full border border-white flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center ml-2 mr-2">
                <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center mr-2 flex-shrink-0">
                  <svg className="w-4 h-4 text-[#2563eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex flex-col leading-tight whitespace-nowrap">
                  <span className="text-[11px] text-gray-500 font-medium">Home Collection</span>
                  <a href={`tel:+919964639639`} className="text-[#0f2d5e] font-extrabold text-[15px] hover:underline tracking-tight">+91 9964 639639</a>
                </div>
              </div>
              {user && (
                <Link
                  href="/profile"
                  className="hidden xl:flex items-center gap-2 max-w-[180px] rounded-full border border-blue-100 bg-blue-50/70 px-3 py-2 hover:bg-blue-50 transition-colors"
                  title={userDisplayName}
                >
                  <span className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                    {userInitial}
                  </span>
                  <span className="text-[12px] font-extrabold text-[#0f2d5e] truncate">
                    {userDisplayName}
                  </span>
                </Link>
              )}
              <Link 
                href="/book" 
                className="hidden xl:inline-block bg-[#2563eb] text-white font-extrabold px-6 py-2.5 rounded-full text-xs hover:bg-[#1d4ed8] active:scale-95 transition-all shadow-md uppercase tracking-wider whitespace-nowrap"
                style={{ color: '#ffffff' }}
              >
                Book a Test
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Nav Row */}
        <div className="bg-white py-3">
          <div className="max-w-[1260px] mx-auto px-4 w-full">
            <nav className="flex items-center justify-center w-full">
              <div className="flex items-center justify-between w-full max-w-[1260px] text-black text-[11px] xl:text-[12px] font-extrabold gap-2">
                {navItems.map((item: any) => (
                  <Link 
                    key={item.label} 
                    href={item.href} 
                    className="text-black font-extrabold hover:text-[#2563eb] transition-colors uppercase tracking-wide whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#2563eb] after:transition-all after:duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* ── MOBILE HEADER (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col w-full bg-white">
        {/* Row 1: Hamburger + Logo | Location + User */}
        <div className="py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
            <Link href="/">
              <img
                src={settings.logoImage || "https://res.cloudinary.com/btjglif5/image/upload/f_auto,q_auto/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"}
                alt={settings.siteName || "QXL Diagnostics"}
                width={204}
                height={64}
                className="h-16 w-auto object-contain"
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
            {/* Location → opens centered modal */}
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1.5"
              aria-label="Select location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0" />
              <span className="font-extrabold text-[11px] text-[#2563eb] max-w-[70px] truncate">{getShortLocationName(location)}</span>
              <ChevronDown className="w-3 h-3 text-[#2563eb] flex-shrink-0" />
            </button>
            <Link
              href={user ? "/profile" : "/login"}
              className="w-9 h-9 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563eb]"
              aria-label={user ? "Open profile" : "Log in"}
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Row 2: Search Bar */}
        <div className="px-4 pb-3">
          <SmartSearchBar placeholder="Search For Lab Tests/Package" isMobile={true} />
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
                              <span className="pr-4 truncate">{getShortLocationName(branch.name)}</span>
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
                        className={`min-h-[48px] px-4 rounded-xl flex items-center justify-between transition-colors ${isActive
                          ? 'bg-[#eff6ff] text-[#2563eb] font-extrabold'
                          : 'text-black hover:bg-gray-50 font-extrabold'
                          }`}
                      >
                        <span className="text-sm">{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
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

      {/* ── MOBILE BOTTOM NAVIGATION (truly fixed at bottom, 5 tabs) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-[9999] lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -2px 12px rgba(0,0,0,0.08)' }}
      >
        <div className="flex justify-around items-center h-14">
          {[
            { label: "Home", href: "/", icon: Home },
            { label: "Book a Test", href: "/book", icon: Microscope },
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
                className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
              >
                <TabIcon
                  className={`w-[22px] h-[22px] transition-all ${
                    isActive ? 'text-[#2563eb]' : 'text-gray-900'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className={`text-[9px] font-bold tracking-wide uppercase leading-none ${
                    isActive ? 'text-[#2563eb]' : 'text-gray-900'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Prescription Modal */}
      <PrescriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
