"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Shield, Search, Compass, AlertCircle, ExternalLink } from 'lucide-react';
import { cmsStore } from '../../lib/cmsStore';

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export default function CentersPage() {
  const [centers, setCenters] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

const defaultLocations = [
  { id: "loc-1", name: "Kengeri – QXL Diagnostics Super Speciality Reference Laboratory (NABL Accredited)", address: "Kengeri, Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Open 24X7", lat: 12.9175, lng: 77.4836 },
  { id: "loc-2", name: "Nayandahalli (Mysuru Road) – Spandana Hospital, Powered by QXL Diagnostics", address: "Nayandahalli (Mysuru Road), Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Open 24X7", lat: 12.9469, lng: 77.5255 },
  { id: "loc-3", name: "Nagarabhavi – Astrio Multispeciality Hospital, Powered by QXL Diagnostics", address: "Nagarabhavi, Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Open 24X7", lat: 12.9669, lng: 77.5110 },
  { id: "loc-4", name: "Chandra Layout – Nandi Diagnostics, Powered by QXL Diagnostics", address: "Chandra Layout, Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Mon - Sun: 7:00 AM - 9:00 PM", lat: 12.9602, lng: 77.5246 },
  { id: "loc-5", name: "Yelahanka Old Town – Shushrusha Hospital, Powered by QXL Diagnostics", address: "Yelahanka Old Town, Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Open 24X7", lat: 13.0970, lng: 77.5954 },
  { id: "loc-6", name: "Yelahanka (Galleria Mall) – North City Specialities Powered by QXL Diagnostics (NABL Accredited)", address: "Yelahanka (Galleria Mall), Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Mon - Sun: 7:00 AM - 9:00 PM", lat: 13.1007, lng: 77.5963 },
  { id: "loc-7", name: "Sanjaynagar – Nisarga Diagnostics, Powered by QXL Diagnostics", address: "Sanjaynagar, Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Mon - Sun: 7:00 AM - 9:00 PM", lat: 13.0333, lng: 77.5794 },
  { id: "loc-8", name: "Vidyaranyapura – Dr. Abhi Kollur's Clinic, Powered by QXL Diagnostics", address: "Vidyaranyapura, Bengaluru", city: "Bengaluru", phone: "+91 99646 39639", hours: "Mon - Sun: 7:00 AM - 9:00 PM", lat: 13.0805, lng: 77.5562 },
];

  useEffect(() => {
    const data = cmsStore.getAll("locations");
    const mergedData = data.length > 0 ? data : defaultLocations;
    setCenters(mergedData);
    if (mergedData.length > 0) {
      setSelectedCenter(mergedData[0]);
    }
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

  // Calculate distances and attach to center objects
  const centersWithDistance = centers.map((center) => {
    let distance = null;
    if (userCoords && center.lat && center.lng) {
      distance = calculateDistance(userCoords.lat, userCoords.lng, center.lat, center.lng);
    }
    return { ...center, distance };
  });

  // Sort and filter centers
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
      // If user location is active, sort by distance
      if (a.distance !== null && b.distance !== null) {
        return a.distance - b.distance;
      }
      return 0; // maintain original order
    });

  // Get cities list for filtering
  const uniqueCities = Array.from(new Set(centers.map((c) => c.city || "Bengaluru")));

  // Select dynamic map iframe source
  const getMapIframeSrc = (center: any) => {
    if (!center) return "";
    // If coordinates are available, use them, otherwise search address
    const q = center.lat && center.lng 
      ? `${center.lat},${center.lng}`
      : `${center.name} ${center.address}`;
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="bg-[#f8faff] min-h-screen flex flex-col">
      {/* Page Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-10 border-b border-gray-100 flex-shrink-0">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-2">Our Labs</h1>
              <p className="text-slate-500 text-xs md:text-sm max-w-xl font-semibold">
                Locate QXL Speciality Labs and local clinic collection units. Walk in or book online for home collections.
              </p>
              <div className="w-16 h-1.5 bg-[#2563eb] rounded-full mt-3"></div>
            </div>

            {/* GPS tracker button */}
            <div className="flex flex-col items-start md:items-end gap-2">
              <button
                onClick={handleTrackLocation}
                disabled={locating}
                className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-70 cursor-pointer"
              >
                <Compass className={`w-4.5 h-4.5 ${locating ? 'animate-spin' : ''}`} />
                {locating ? "Locating..." : "Find Closest Centre to Me"}
              </button>
              {userCoords && (
                <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 border border-emerald-100 rounded-md px-2.5 py-1">
                  ✓ GPS Location active. Sorted by proximity.
                </span>
              )}
              {gpsError && (
                <span className="text-[10px] text-rose-500 font-bold bg-rose-50 border border-rose-100 rounded-md px-2.5 py-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {gpsError}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main split-screen section */}
      <section className="flex-1 w-full max-w-[1260px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left panel: search and list (5/12 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Search and Filters */}
            <div className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by center name or area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-slate-800"
                />
              </div>

              {/* City filter pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["All Cities", ...uniqueCities].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer ${
                      selectedCity === city
                        ? "bg-[#2563eb] text-white shadow-sm"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
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
                <div className="bg-white border border-gray-150 rounded-2xl p-8 text-center text-slate-400 font-semibold">
                  No diagnostic centres match your search criteria.
                </div>
              ) : (
                filteredCenters.map((center, idx) => {
                  const isSelected = selectedCenter && selectedCenter.id === center.id;
                  const isClosest = userCoords && idx === 0; // closest because list is sorted
                  
                  return (
                    <div
                      key={center.id || idx}
                      onClick={() => setSelectedCenter(center)}
                      className={`bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative group ${
                        isSelected ? "border-[#2563eb] ring-2 ring-[#2563eb]/15" : "border-gray-150"
                      }`}
                    >
                      {/* Nearest badge */}
                      {isClosest && (
                        <span className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
                          NEAREST
                        </span>
                      )}

                      <div>
                        <h3 className="font-extrabold text-slate-800 text-sm mb-2 flex items-start gap-1.5 pr-14 leading-tight group-hover:text-[#2563eb] transition-colors">
                          <Shield className="w-4 h-4 text-[#2563eb] flex-shrink-0 mt-0.5" />
                          <span>{center.name}</span>
                        </h3>

                        {/* Distance info */}
                        {center.distance !== null && (
                          <p className="text-[11px] text-emerald-600 font-bold mb-3">
                            📍 {center.distance.toFixed(1)} km away from you
                          </p>
                        )}
                        
                        <div className="space-y-2.5 text-[11px] text-slate-500 font-semibold">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#0f2d5e] flex-shrink-0 mt-0.5" />
                            <span className="leading-normal">{center.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#0f2d5e] flex-shrink-0" />
                            <span>{center.hours || "Mon - Sat: 8:00 AM - 7:00 PM"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#0f2d5e] flex-shrink-0" />
                            <a href={`tel:${(center.phone || "+91 99646 39639").replace(/ /g, '')}`} className="hover:underline">{center.phone || "+91 99646 39639"}</a>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 border-t border-gray-100 pt-3 mt-4">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            center.name + " " + center.address
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center bg-slate-50 hover:bg-slate-100 text-[#0f2d5e] py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                        >
                          Directions <ExternalLink className="w-3 h-3" />
                        </a>
                        <Link
                          href={`/book?center=${encodeURIComponent(center.name)}`}
                          className="flex-1 text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
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
              <div className="bg-white border border-gray-150 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
                {/* Map header */}
                <div className="bg-slate-50 border-b border-gray-100 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2563eb]" />
                    <span className="font-extrabold text-xs text-[#0f2d5e] truncate max-w-md">
                      Map: {selectedCenter.name}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      selectedCenter.name + " " + selectedCenter.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#2563eb] font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Embedded Map iframe */}
                <div className="flex-1 w-full bg-slate-100 relative">
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
              <div className="bg-slate-50 border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 h-full text-slate-400">
                <MapPin className="w-12 h-12 mb-3 text-slate-300" />
                <p className="font-bold text-sm">Select a centre to view its location map</p>
              </div>
            )}
          </div>
          
        </div>
      </section>
    </div>
  );
}
