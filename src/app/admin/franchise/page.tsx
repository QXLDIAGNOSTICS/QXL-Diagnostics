"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Store, Search, CheckCircle, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { api, type CollaborationLeadRead } from "@/lib/api";

export default function FranchisePage() {
  const [leads, setLeads] = useState<CollaborationLeadRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await api.leads.adminListCollaboration(unreadOnly, 200, 0);
      setLeads(items);
    } catch {
      setError("Failed to load collaboration leads.");
    } finally {
      setLoading(false);
    }
  }, [unreadOnly]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleMarkRead = async (id: string) => {
    try {
      await api.leads.markCollaborationRead(id);
      await refreshData();
    } catch {
      setError("Failed to mark lead as read.");
    }
  };

  const filtered = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Store className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Collaboration & Partnership
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review partnership/franchise leads submitted via the website and mark them as read.</p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Action Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search collaboration applications..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => setUnreadOnly(e.target.checked)}
              className="rounded border-gray-300"
            />
            Unread only
          </label>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            {filtered.length} requests
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Store className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No applications found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1">Partnership inquiries will populate here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Applicant Name</th>
                  <th className="px-6 py-4">City</th>
                  <th className="px-6 py-4">Interest</th>
                  <th className="px-6 py-4">Contacts</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{lead.name}</td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {lead.city || "—"}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{lead.interest || "—"}</td>
                    <td className="px-6 py-4 font-medium space-y-1">
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-450" /> {lead.phone}</div>
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-450" /> {lead.email || "—"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        lead.is_read ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-700"
                      }`}>
                        {lead.is_read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!lead.is_read && (
                        <button 
                          onClick={() => handleMarkRead(lead.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer text-[10px] font-bold"
                          title="Mark as read"
                        >
                          <CheckCircle className="w-4 h-4" /> Mark Read
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

    </div>
  );
}
