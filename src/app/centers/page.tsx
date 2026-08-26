"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Shield, Search, Compass, AlertCircle, ExternalLink, Sparkles, Navigation, CheckCircle2, Building2 } from 'lucide-react';
import { api } from '../../lib/api';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function isOpenNow(hoursString: string): boolean {
  if (hoursString.includes("24x7")) return true;
  const now = new Date();
  const currentHour = now.getHours();
  // Most centers open 6:30 AM to 8:00 PM (6.5 to 20)
  return currentHour >= 6 && currentHour < 20;
}

const DEFAULT_CENTERS = [
  {
    id: "center-1",
    name: "QXL Main Super Speciality Reference Laboratory (Kengeri)",
    slug: "kengeri-main-lab",
    pincode: "560060",
    locality: "Kengeri",
    address: "3rd Floor, SLN Complex, Mysuru Road, Kengeri, Bengaluru – 560060",
    city: "Bengaluru",
    phone: "+91 9964 639 639",
    hours: "Lab Operations: 24x7 | Walk-in: 6:30 AM - 8:00 PM",
    lat: 12.9113827,
    lng: 77.4850301,
    is_nabl: true,
    type: "physical_lab",
  },
  {
    id: "center-2",
    name: "QXL Diagnostics Partner Centre (Yelahanka)",
    slug: "yelahanka-north-hub",
    pincode: "560064",
    locality: "Yelahanka",
    address: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064",
    city: "Bengaluru",
    phone: "+91 9964 639 639",
    hours: "Mon - Sun: 7:00 AM - 8:00 PM",
    lat: 13.0991,
    lng: 77.5968,
    is_nabl: true,
    type: "physical_centre",
  },
  {
    id: "center-3",
    name: "QXL Home Blood Collection Service Hub (Jayanagar)",
    slug: "jayanagar-south-hub",
    pincode: "560041",
    locality: "Jayanagar",
    address: "Coverage: Jayanagar 4th Block, JP Nagar, Banashankari & South Bengaluru",
    city: "Bengaluru",
    phone: "+91 9964 639 639",
    hours: "Home Collection: 6:30 AM - 8:00 PM",
    lat: 12.9250,
    lng: 77.5838,
    is_nabl: true,
    type: "home_collection_service",
  },
  {
    id: "center-4",
    name: "QXL Home Blood Collection Service Hub (Indiranagar)",
    slug: "indiranagar-hub",
    pincode: "560038",
    locality: "Indiranagar",
    address: "Coverage: Indiranagar, HAL 2nd Stage, Domlur & Central Bengaluru",
    city: "Bengaluru",
    phone: "+91 9964 639 639",
    hours: "Home Collection: 6:30 AM - 8:00 PM",
    lat: 12.9719,
    lng: 77.6412,
    is_nabl: true,
    type: "home_collection_service",
  },
  {
    id: "center-5",
    name: "QXL Home Blood Collection Service Hub (Whitefield)",
    slug: "whitefield-tech-hub",
    pincode: "560066",
    locality: "Whitefield",
    address: "Coverage: Whitefield, ITPL, Kadugodi, Hope Farm, Brookefield & EPIP Zone",
    city: "Bengaluru",
    phone: "+91 9964 639 639",
    hours: "Home Collection: 6:30 AM - 8:00 PM",
    lat: 12.9863,
    lng: 77.7337,
    is_nabl: true,
    type: "home_collection_service",
  },
];

export default function CentersPage() {
  const [centers, setCenters] = useState<any[]>(DEFAULT_CENTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [pincodeQuery, setPincodeQuery] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("All Localities");
  const [selectedCenter, setSelectedCenter] = useState<any>(DEFAULT_CENTERS[0]);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.centers
      .list()
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data) && data.length > 0) {
          setCenters(data);
          setSelectedCenter(data[0]);
        }
      })
      .catch((err) => console.error("Failed to load backend centers, using defaults", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleTrackLocation = () => {
    setLocating(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocating(false);
      },
      (error) => {
        console.error("GPS error:", error);
        setGpsError("Unable to access your location. Please check browser permissions.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const centersWithDistance = centers.map((center) => {
    let distance = null;
    if (userCoords && center.lat && center.lng) {
      distance = calculateDistance(userCoords.lat, userCoords.lng, center.lat, center.lng);
    }
    return { ...center, distance };
  });

  const filteredCenters = centersWithDistance
    .filter((center) => {
      const q = searchQuery.toLowerCase();
      const p = pincodeQuery.trim();

      const matchesSearch =
        !q ||
        center.name.toLowerCase().includes(q) ||
        center.address.toLowerCase().includes(q) ||
        (center.pincode && center.pincode.includes(q)) ||
        (center.locality && center.locality.toLowerCase().includes(q));

      const matchesPincode =
        !p || (center.pincode && center.pincode.includes(p)) || center.address.includes(p);

      const matchesLocality =
        selectedLocality === "All Localities" ||
        (center.locality && center.locality.toLowerCase() === selectedLocality.toLowerCase()) ||
        center.address.toLowerCase().includes(selectedLocality.toLowerCase());

      return matchesSearch && matchesPincode && matchesLocality;
    })
    .sort((a, b) => {
      if (a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0;
    });

  const uniqueLocalities = Array.from(new Set(centers.map((c) => c.locality).filter(Boolean)));

  const getMapIframeSrc = (center: any) => {
    if (!center) return "";
    const q = center.lat && center.lng 
      ? `${center.lat},${center.lng}`
      : `${center.name} ${center.address}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  // Build JSON-LD MedicalClinic & LocalBusiness schemas
  const centersJsonLd = {
    "@context": "https://schema.org",
    "@graph": centers.map((c) => ({
      "@type": ["MedicalClinic", "LocalBusiness"],
      "@id": `https://www.qxldiagnostics.com/centers#${c.slug || c.id}`,
      "name": c.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": c.address,
        "addressLocality": c.locality || "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": c.pincode || "560060",
        "addressCountry": "IN"
      },
      "telephone": c.phone || "+91 9964 639 639",
      "openingHours": "Mo-Su 06:30-20:00",
      "geo": c.lat && c.lng ? {
        "@type": "GeoCoordinates",
        "latitude": c.lat,
        "longitude": c.lng
      } : undefined,
      "parentOrganization": {
        "@type": "DiagnosticLab",
        "name": "QXL Diagnostics Super Speciality Lab",
        "url": "https://www.qxldiagnostics.com"
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(centersJsonLd) }} />

      {/* Page Hero */}
      <section className="py-4 sm:py-8 bg-white border-b border-slate-100 flex-shrink-0">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-6 w-full">
          <div className="bg-[#FFFBF0] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#F3DBA7] shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <span className="inline-block bg-[#FFF8EB] border border-[#F3DBA7] text-[#D69A18] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                Diagnostic Network
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-[#0f2d5e] leading-tight">
                QXL Diagnostic Labs &amp; Collection Centres
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-xl">
                Locate QXL NABL-accredited laboratory hubs across Bengaluru. Search by 6-digit pincode, area, or GPS distance.
              </p>
            </div>

            {/* GPS tracker button */}
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <button
                onClick={handleTrackLocation}
                disabled={locating}
                className="inline-flex items-center gap-2 bg-[#D69A18] hover:bg-[#b88313] text-white font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Compass className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? "Locating..." : "Find Nearest Lab to Me"}</span>
              </button>
              {userCoords && (
                <span className="text-[10.5px] text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1">
                  ✓ GPS Active. Sorted by distance.
                </span>
              )}
              {gpsError && (
                <span className="text-[10.5px] text-rose-600 font-bold bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {gpsError}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main split-screen section */}
      <section className="flex-1 w-full max-w-[1260px] mx-auto px-3 sm:px-6 py-4 sm:py-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Left panel: search and list (5/12 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Text search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D69A18]" />
                  <input
                    type="text"
                    placeholder="Search area or center..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D69A18]"
                  />
                </div>

                {/* Pincode search (6-digit) */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6-digit Pincode (e.g. 560060)"
                    value={pincodeQuery}
                    onChange={(e) => setPincodeQuery(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Locality filter pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["All Localities", ...uniqueLocalities].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocality(loc)}
                    className={`px-3 py-1 rounded-full text-[10.5px] font-extrabold transition-all cursor-pointer ${
                      selectedLocality === loc
                        ? "bg-[#D69A18] text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-[#D69A18]"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Centres list */}
            <div className="flex-1 overflow-y-auto space-y-3.5 max-h-[60vh] lg:max-h-[680px] pr-1">
              {filteredCenters.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs font-semibold">
                  No diagnostic centres match your search query or pincode.
                </div>
              ) : (
                filteredCenters.map((center, idx) => {
                  const isSelected = selectedCenter && selectedCenter.id === center.id;
                  const isClosest = userCoords && idx === 0;
                  const open = isOpenNow(center.hours || "");
                  
                  return (
                    <div
                      key={center.id || idx}
                      onClick={() => setSelectedCenter(center)}
                      className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative text-left shadow-2xs group ${
                        isSelected ? "border-[#D69A18] ring-2 ring-[#D69A18]/20" : "border-slate-200 hover:border-amber-300"
                      }`}
                    >
                      {/* Open/Closed and Nearest badges */}
                      <div className="flex items-center gap-2 absolute top-3.5 right-3.5">
                        <span className={`text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          open ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-slate-100 text-slate-600"
                        }`}>
                          {open ? "● OPEN NOW" : "CLOSED NOW"}
                        </span>
                        {isClosest && (
                          <span className="bg-blue-600 text-white text-[9.5px] font-black px-2 py-0.5 rounded-full shadow-2xs uppercase tracking-wider">
                            NEAREST
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-black text-[#0f2d5e] text-xs sm:text-sm mb-1.5 flex items-start gap-1.5 pr-28 leading-tight group-hover:text-[#D69A18] transition-colors">
                          <Shield className="w-4 h-4 text-[#D69A18] shrink-0 mt-0.5" />
                          <span>{center.name}</span>
                        </h3>

                        {/* Distance info */}
                        {center.distance !== null && (
                          <p className="text-[10.5px] text-emerald-700 font-extrabold mb-2">
                            📍 {center.distance.toFixed(1)} km away from your location
                          </p>
                        )}
                        
                        <div className="space-y-2 text-[11px] text-slate-600 font-medium">
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#D69A18] shrink-0 mt-0.5" />
                            <span className="leading-snug">{center.address}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#D69A18] shrink-0" />
                            <span>{center.hours || "Mon - Sat: 8:00 AM - 7:00 PM"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#D69A18] shrink-0" />
                            <a href={`tel:${(center.phone || "+91 9964 639 639").replace(/ /g, '')}`} className="hover:underline font-bold text-slate-700">{center.phone || "+91 9964 639 639"}</a>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 border-t border-slate-100 pt-3 mt-3">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            center.name + " " + center.address
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-[#0f2d5e] py-2 rounded-xl text-[10.5px] font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Directions</span> <ExternalLink className="w-3 h-3" />
                        </a>
                        <Link
                          href={`/book?center=${encodeURIComponent(center.name)}`}
                          className="flex-1 text-center bg-[#D69A18] hover:bg-[#b88313] text-white py-2 rounded-xl text-[10.5px] font-black uppercase tracking-wider transition-all shadow-2xs active:scale-95"
                        >
                          Book Here
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right panel: dynamic interactive map (7/12 columns) */}
          <div className="lg:col-span-7 h-[360px] sm:h-[480px] lg:h-[760px] flex flex-col text-left">
            {selectedCenter ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-3 border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                <div className="bg-[#FFFBF0] border-b border-[#F3DBA7] p-3 px-4 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-4 h-4 text-[#D69A18] shrink-0" />
                    <span className="font-extrabold text-xs text-[#0f2d5e] truncate">
                      Map: {selectedCenter.name}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedCenter.name + " " + selectedCenter.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#D69A18] font-black uppercase tracking-wider flex items-center gap-1 hover:underline shrink-0"
                  >
                    <span>Open Map</span> <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex-1 w-full bg-slate-100 relative rounded-b-xl sm:rounded-b-2xl overflow-hidden mt-2">
                  <iframe
                    src={getMapIframeSrc(selectedCenter)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${selectedCenter.name}`}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-8 h-full text-slate-500 border border-slate-200">
                <MapPin className="w-10 h-10 mb-2 text-[#D69A18]" />
                <p className="font-bold text-xs sm:text-sm">Select a centre to view its location map</p>
              </div>
            )}
          </div>
          
        </div>
      </section>
    </div>
  );
}
