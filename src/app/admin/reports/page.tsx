"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FileText, Plus, Search, X, Download, CheckCircle, Loader2 } from "lucide-react";
import { api, type Booking } from "@/lib/api";

export default function ReportsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [reportUrl, setReportUrl] = useState("");
  const [markCompleted, setMarkCompleted] = useState(false);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Reports only make sense once a sample has been collected or beyond.
      const [collected, ready, completed] = await Promise.all([
        api.bookings.adminList("sample_collected", 100, 0),
        api.bookings.adminList("report_ready", 100, 0),
        api.bookings.adminList("completed", 100, 0),
      ]);
      setBookings([...collected.items, ...ready.items, ...completed.items]);
    } catch {
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openEditModal = (booking: Booking) => {
    setEditingId(booking.id);
    setReportUrl(booking.report_url || "");
    setMarkCompleted(booking.status === "completed");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !reportUrl) return;

    setSaving(true);
    setError(null);
    try {
      await api.bookings.update(editingId, {
        report_url: reportUrl,
        status: markCompleted ? "completed" : "report_ready",
      });
      setIsModalOpen(false);
      await refreshData();
    } catch {
      setError("Failed to release the report.");
    } finally {
      setSaving(false);
    }
  };

  const filtered = bookings.filter(
    (r) =>
      r.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.test_name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Diagnostic Reports
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Attach report links to collected bookings and release them to patients.</p>
        </div>
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
              placeholder="Search reports..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} reports
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No reports found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Bookings appear here once a sample has been collected.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Lab Test / Package</th>
                  <th className="px-6 py-4">Preferred Date</th>
                  <th className="px-6 py-4">Document Status</th>
                  <th className="px-6 py-4">Report Link</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{rep.patient_name}</td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">{rep.test_name || "—"}</td>
                    <td className="px-6 py-4 font-medium">{rep.preferred_date || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 w-fit ${
                        rep.status === "completed" || rep.status === "report_ready" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        <CheckCircle className="w-3 h-3" />
                        {rep.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {rep.report_url ? (
                        <a href={rep.report_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2563eb] hover:underline">
                          <Download className="w-3.5 h-3.5" />
                          View Report
                        </a>
                      ) : (
                        <span className="text-gray-400">Not released</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1.5">
                      <button 
                        onClick={() => openEditModal(rep)}
                        className="px-3 py-1.5 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/20 rounded-md cursor-pointer font-bold"
                      >
                        {rep.report_url ? "Update" : "Attach Report"}
                      </button>
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
                Release Diagnostic Report
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Report PDF / Link URL</label>
                <input 
                  type="text" 
                  required
                  value={reportUrl} 
                  onChange={(e) => setReportUrl(e.target.value)} 
                  placeholder="https://.../report.pdf" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={markCompleted}
                  onChange={(e) => setMarkCompleted(e.target.checked)}
                  className="rounded"
                />
                Mark booking as Completed (otherwise: Report Ready)
              </label>

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
                  Release Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

