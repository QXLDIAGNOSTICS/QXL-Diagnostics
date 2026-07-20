"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Truck, Plus, Search, X, Check, MapPin, Calendar, Ban, Loader2 } from "lucide-react";
import { api, type Booking, type HealthPackage, type TestCatalogItem } from "@/lib/api";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-orange-100 text-orange-700",
  confirmed: "bg-blue-100 text-blue-700",
  sample_collected: "bg-blue-100 text-blue-700",
  report_ready: "bg-purple-100 text-purple-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function HomeCollectionPage() {
  const [homeCollections, setHomeCollections] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<HealthPackage[]>([]);
  const [tests, setTests] = useState<TestCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bookingType, setBookingType] = useState<"test" | "package">("package");
  const [selectedTestId, setSelectedTestId] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [date, setDate] = useState("");

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingsRes, packagesRes, testsRes] = await Promise.all([
        api.bookings.adminList(undefined, 200, 0),
        api.packages.adminList(200, 0),
        api.tests.adminList(200, 0),
      ]);
      setHomeCollections(bookingsRes.items.filter((b) => b.collection_type === "home"));
      setPackages(packagesRes.items);
      setTests(testsRes.items);
    } catch {
      setError("Failed to load home collections.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAddModal = () => {
    setName("");
    setPhone("");
    setAddress("");
    setBookingType("package");
    setSelectedPackageId(packages[0]?.id || "");
    setSelectedTestId("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;
    if (bookingType === "package" && !selectedPackageId) return;
    if (bookingType === "test" && !selectedTestId) return;

    setSaving(true);
    setError(null);
    try {
      await api.bookings.create({
        patient_name: name,
        patient_phone: phone,
        package_id: bookingType === "package" ? selectedPackageId : null,
        test_id: bookingType === "test" ? selectedTestId : null,
        collection_type: "home",
        collection_address: address,
        preferred_date: date,
      });
      setIsModalOpen(false);
      await refreshData();
    } catch {
      setError("Failed to schedule collection — please choose a valid test/package.");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, nextStatus: string) => {
    try {
      await api.bookings.updateStatus(id, nextStatus);
      await refreshData();
    } catch {
      setError("Failed to update collection status.");
    }
  };

  const filtered = homeCollections.filter(
    (hc) =>
      hc.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hc.collection_address || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hc.test_name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Home Collections
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Coordinate phlebotomist visits, sample collections, patient addresses, and update processing statuses.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Schedule collection
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search address or patient..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} scheduled visits
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Truck className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No collections scheduled</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add your home visits coordinator data here.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Schedule First Visit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Patient & Phone</th>
                  <th className="px-6 py-4">Visit Address</th>
                  <th className="px-6 py-4">Required Test/Package</th>
                  <th className="px-6 py-4">Schedule Date</th>
                  <th className="px-6 py-4">Collection Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((hc) => (
                  <tr key={hc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">
                      <div>{hc.patient_name}</div>
                      <div className="text-[10px] text-gray-450 dark:text-gray-500 mt-0.5">{hc.patient_phone}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-650 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 max-w-[200px] truncate">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {hc.collection_address || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">{hc.test_name || "—"}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-1.5 mt-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {hc.preferred_date || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${STATUS_STYLES[hc.status] || "bg-gray-100 text-gray-700"}`}>
                        {hc.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1.5">
                      {hc.status !== "completed" && hc.status !== "cancelled" && (
                        <button 
                          onClick={() => updateStatus(hc.id, "completed")}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer"
                          title="Complete collection"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {hc.status !== "completed" && hc.status !== "cancelled" && (
                        <button 
                          onClick={() => updateStatus(hc.id, "cancelled")}
                          className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md cursor-pointer"
                          title="Cancel collection"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Schedule collection details
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Patient Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Karan Johar" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Contact Phone</label>
                <input 
                  type="tel" 
                  required
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="9911882277" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Home Address</label>
                <input 
                  type="text" 
                  required
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Flat 402, Oakwood Apts, Indiranagar, Bengaluru" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Booking Type</label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setBookingType("package")}
                    className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${bookingType === "package" ? "bg-teal-600 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
                  >
                    Health Package
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType("test")}
                    className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer ${bookingType === "test" ? "bg-teal-600 text-white" : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}
                  >
                    Individual Test
                  </button>
                </div>
                {bookingType === "package" ? (
                  <select
                    required
                    value={selectedPackageId}
                    onChange={(e) => setSelectedPackageId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="">Select a package…</option>
                    {packages.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — ₹{p.price}</option>
                    ))}
                  </select>
                ) : (
                  <select
                    required
                    value={selectedTestId}
                    onChange={(e) => setSelectedTestId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="">Select a test…</option>
                    {tests.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}{t.price ? ` — ₹${t.price}` : ""}</option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Visit Date</label>
                <input 
                  type="date" 
                  required
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
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
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
