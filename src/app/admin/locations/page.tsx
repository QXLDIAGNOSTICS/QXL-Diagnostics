"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MapPin, Plus, Search, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { api, type Center } from "@/lib/api";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function LocationsAdminPage() {
  const [locations, setLocations] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [phone, setPhone] = useState("+91 99646 39639");
  const [hours, setHours] = useState("Mon - Sat: 8:00 AM - 7:00 PM | Sun: Closed");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await api.centers.adminList(200, 0);
      setLocations(items);
    } catch {
      setError("Failed to load locations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setAddress("");
    setCity("");
    setPhone("+91 99646 39639");
    setHours("Mon - Sat: 8:00 AM - 7:00 PM | Sun: Closed");
    setLat("");
    setLng("");
    setImageUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (loc: Center) => {
    setEditingId(loc.id);
    setName(loc.name);
    setAddress(loc.address);
    setCity(loc.city || "Bengaluru");
    setPhone(loc.phone || "+91 99646 39639");
    setHours(loc.hours || "Mon - Sat: 8:00 AM - 7:00 PM | Sun: Closed");
    setLat(loc.lat != null ? String(loc.lat) : "");
    setLng(loc.lng != null ? String(loc.lng) : "");
    setImageUrl(loc.image_url || "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    setSaving(true);
    setError(null);
    try {
      const payload = {
        name,
        address,
        city,
        phone,
        hours,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        image_url: imageUrl || null,
      };

      if (editingId) {
        await api.centers.update(editingId, payload);
      } else {
        await api.centers.create(payload);
      }
      setIsModalOpen(false);
      await refreshData();
    } catch {
      setError("Failed to save the location.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    try {
      await api.centers.remove(id);
      await refreshData();
    } catch {
      setError("Failed to delete the location.");
    }
  };

  const filtered = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Locations Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure diagnostic center branches and map hubs.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-450">No locations found.</div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((loc) => (
              <div key={loc.id} className="border border-gray-150 dark:border-gray-800 rounded-xl p-5 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/20 relative">
                <div>
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-600" /> {loc.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-450 mt-2 leading-relaxed font-semibold">{loc.address}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">ID: {loc.id}</span>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(loc)}
                      className="p-1.5 text-slate-400 hover:text-teal-600 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(loc.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-md cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit Location" : "Add Location"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <ImageUploadField
                label="Location Image"
                value={imageUrl}
                onChange={setImageUrl}
                placeholder="Location image URL, or upload a file"
              />
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Location / Hub Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="HSR Layout, Bengaluru" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Hub Address</label>
                <textarea 
                  rows={2}
                  required
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="No 12, Ring Road..." 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    list="city-suggestions"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <datalist id="city-suggestions">
                    <option value="Bengaluru" />
                    <option value="Delhi" />
                    <option value="Mumbai" />
                    <option value="Chennai" />
                    <option value="Hyderabad" />
                    <option value="Kolkata" />
                    <option value="Pune" />
                    <option value="Ahmedabad" />
                    <option value="Jaipur" />
                    <option value="Lucknow" />
                    <option value="Gurgaon" />
                    <option value="Noida" />
                    <option value="Chandigarh" />
                    <option value="Kochi" />
                    <option value="Indore" />
                    <option value="Coimbatore" />
                    <option value="Mysuru" />
                    <option value="Visakhapatnam" />
                    <option value="Nagpur" />
                    <option value="Bhopal" />
                    <option value="Patna" />
                    <option value="Thiruvananthapuram" />
                    <option value="Surat" />
                    <option value="Vadodara" />
                    <option value="Mangaluru" />
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    required
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Working Hours</label>
                <input 
                  type="text" 
                  required
                  value={hours} 
                  onChange={(e) => setHours(e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Latitude</label>
                  <input 
                    type="text" 
                    value={lat} 
                    onChange={(e) => setLat(e.target.value)} 
                    placeholder="12.9113"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Longitude</label>
                  <input 
                    type="text" 
                    value={lng} 
                    onChange={(e) => setLng(e.target.value)} 
                    placeholder="77.4850"
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
