"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Shield, Search, Compass, AlertCircle, ExternalLink } from 'lucide-react';
import { api } from '../../lib/api';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
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

const DEFAULT_CENTERS = [
  {
    id: "center-1",
    name: "QXL Main Lab — Super Speciality Hub",
    slug: "kengeri-main-lab",
    address: "3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060",
    city: "Bengaluru",
    phone: "+91 99646 39639",
    hours: "Open 24x7",
    lat: 12.9113827,
    lng: 77.4850301,
    is_nabl: true,
  },
  {
    id: "center-2",
    name: "QXL Diagnostics — North Hub (Yelahanka)",
    slug: "yelahanka-north-hub",
    address: "L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064",
    city: "Bengaluru",
    phone: "+91 99646 39639",
    hours: "Mon - Sun: 7:00 AM - 9:00 PM",
    lat: 13.0991,
    lng: 77.5968,
    is_nabl: true,
  },
  {
    id: "center-3",
    name: "QXL Diagnostics — South Hub (Jayanagar)",
    slug: "jayanagar-south-hub",
    address: "4th Block, 11th Main Rd, Near Maiya Hotel, Jayanagar, Bengaluru – 560011",
    city: "Bengaluru",
    phone: "+91 99646 39639",
    hours: "Mon - Sun: 7:00 AM - 8:30 PM",
    lat: 12.9250,
    lng: 77.5838,
    is_nabl: true,
  },
  {
    id: "center-4",
    name: "QXL Diagnostics — East Hub (Indiranagar)",
    slug: "indiranagar-hub",
    address: "100 Feet Road, Near HAL 2nd Stage, Indiranagar, Bengaluru – 560038",
    city: "Bengaluru",
    phone: "+91 99646 39639",
    hours: "Mon - Sun: 7:00 AM - 9:00 PM",
    lat: 12.9719,
    lng: 77.6412,
    is_nabl: true,
  },
  {
    id: "center-5",
    name: "QXL Diagnostics — Tech Corridor (Whitefield)",
    slug: "whitefield-tech-hub",
    address: "ITPB Main Road, Near Forum Shantiniketan, Whitefield, Bengaluru – 560066",
    city: "Bengaluru",
    phone: "+91 99646 39639",
    hours: "Mon - Sun: 7:00 AM - 8:30 PM",
    lat: 12.9863,
    lng: 77.7337,
    is_nabl: true,
  },
];

export default function CentersPage() {
  const [centers, setCenters] = useState<any[]>(DEFAULT_CENTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
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
      const matchesSearch =
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity =
        selectedCity === "All Cities" ||
        (center.city && center.city.toLowerCase() === selectedCity.toLowerCase());

      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0;
    });

  const uniqueCities = Array.from(new Set(centers.map((c) => c.city || "Bengaluru")));

  const getMapIframeSrc = (center: any) => {
    if (!center) return "";
    const q = center.lat && center.lng 
      ? `${center.lat},${center.lng}`
      : `${center.name} ${center.address}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Hero */}
      <section className="py-8 flex-shrink-0">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-sm">Diagnostic Network</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c4a6e] mb-2">Our Labs &amp; Collection Centres</h1>
              <p className="text-slate-700 text-xs md:text-sm max-w-xl font-medium">
                Locate QXL Speciality Labs and local clinic collection units. Walk in or book online for home collections.
              </p>
            </div>

            {/* GPS tracker button */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <button
                onClick={handleTrackLocation}
                disabled={locating}
                className="btn-sky flex items-center gap-2"
              >
                <Compass className={`w-4.5 h-4.5 ${locating ? 'animate-spin' : ''}`} />
                {locating ? "Locating..." : "Find Closest Centre to Me"}
              </button>
              {userCoords && (
                <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 rounded-md px-2.5 py-1">
                  ✓ GPS Location active. Sorted by proximity.
                </span>
              )}
              {gpsError && (
                <span className="text-[10px] text-rose-600 font-bold bg-rose-50 border border-rose-200 rounded-md px-2.5 py-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {gpsError}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main split-screen section */}
      <section className="flex-1 w-full max-w-[1260px] mx-auto px-4 py-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left panel: search and list (5/12 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Search and Filters */}
            <div className="glass-panel p-4 rounded-2xl space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0284c7]" />
                <input
                  type="text"
                  placeholder="Search by center name or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 glass-pill text-xs font-semibold text-[#0c4a6e] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
              </div>

              {/* City filter pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["All Cities", ...uniqueCities].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                      selectedCity === city
                        ? "bg-[#2563eb] text-white shadow-sm"
                        : "glass-pill text-[#0369a1] hover:bg-sky-100/60"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Centres list */}
            <div className="flex-1 overflow-y-auto space-y-4 max-h-[60vh] lg:max-h-[680px] pr-1">
              {filteredCenters.length === 0 ? (
                <div className="glass-card p-8 text-center text-slate-500 font-semibold">
                  No diagnostic centres match your search criteria.
                </div>
              ) : (
                filteredCenters.map((center, idx) => {
                  const isSelected = selectedCenter && selectedCenter.id === center.id;
                  const isClosest = userCoords && idx === 0;
                  
                  return (
                    <div
                      key={center.id || idx}
                      onClick={() => setSelectedCenter(center)}
                      className={`glass-card p-5 transition-all cursor-pointer flex flex-col justify-between relative group ${
                        isSelected ? "border-[#2563eb] ring-2 ring-[#2563eb]/20 shadow-md" : ""
                      }`}
                    >
                      {/* Nearest badge */}
                      {isClosest && (
                        <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
                          NEAREST
                        </span>
                      )}

                      <div>
                        <h3 className="font-extrabold text-[#0c4a6e] text-sm mb-2 flex items-start gap-1.5 pr-14 leading-tight group-hover:text-[#2563eb] transition-colors">
                          <Shield className="w-4 h-4 text-[#0284c7] flex-shrink-0 mt-0.5" />
                          {center.slug ? (
                            <Link href={`/centers/${center.slug}`} className="hover:underline" onClick={(e) => e.stopPropagation()}>
                              {center.name}
                            </Link>
                          ) : (
                            <span>{center.name}</span>
                          )}
                        </h3>

                        {/* Distance info */}
                        {center.distance !== null && (
                          <p className="text-[11px] text-emerald-600 font-bold mb-3">
                            📍 {center.distance.toFixed(1)} km away from you
                          </p>
                        )}
                        
                        <div className="space-y-2.5 text-[11px] text-slate-700 font-medium">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0 mt-0.5" />
                            <span className="leading-normal">{center.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0" />
                            <span>{center.hours || "Mon - Sat: 8:00 AM - 7:00 PM"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0" />
                            <a href={`tel:${(center.phone || "+91 99646 39639").replace(/ /g, '')}`} className="hover:underline">{center.phone || "+91 99646 39639"}</a>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 border-t border-sky-200/40 pt-3 mt-4">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            center.name + " " + center.address
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center glass-pill text-[#0c4a6e] py-2 text-[10px] font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 hover:bg-sky-100/50"
                        >
                          Directions <ExternalLink className="w-3 h-3" />
                        </a>
                        <Link
                          href={`/book?center=${encodeURIComponent(center.name)}`}
                          className="flex-1 text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-colors shadow-sm"
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
          <div className="lg:col-span-7 h-[400px] lg:h-[760px] flex flex-col">
            {selectedCenter ? (
              <div className="glass-panel rounded-3xl p-3 shadow-md flex flex-col h-full overflow-hidden">
                {/* Map header */}
                <div className="bg-sky-50/60 border-b border-sky-200/40 p-3.5 rounded-t-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0284c7]" />
                    <span className="font-extrabold text-xs text-[#0c4a6e] truncate max-w-md">
                      Map: {selectedCenter.name}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedCenter.name + " " + selectedCenter.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#2563eb] font-extrabold uppercase tracking-wider flex items-center gap-1 hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Embedded Map iframe */}
                <div className="flex-1 w-full bg-slate-100 relative rounded-b-2xl overflow-hidden">
                  <iframe
                    src={getMapIframeSrc(selectedCenter)}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map for ${selectedCenter.name}`}
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-3xl flex flex-col items-center justify-center p-8 h-full text-slate-500">
                <MapPin className="w-12 h-12 mb-3 text-[#0284c7]" />
                <p className="font-bold text-sm">Select a centre to view its location map</p>
              </div>
            )}
          </div>
          
        </div>
      </section>
    </div>
  );
}
