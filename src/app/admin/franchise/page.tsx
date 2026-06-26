"use client";

import React, { useState, useEffect } from "react";
import { Store, Search, Trash2, CheckCircle, Clock, X, Mail, Phone, MapPin, DollarSign } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function FranchisePage() {
  const [franchiseList, setFranchiseList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const refreshData = () => {
      setFranchiseList(cmsStore.getAll("franchise"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this franchise enquiry?")) {
      cmsStore.deleteItem("franchise", id);
    }
  };

  const updateStatus = (id: string, status: string) => {
    cmsStore.updateItem("franchise", id, { status });
  };

  const filtered = franchiseList.filter(fran => 
    fran.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fran.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (fran.email || "").toLowerCase().includes(searchQuery.toLowerCase())
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
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review partnership request applications, check candidate cities, investment budgets, and change review status.</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm p-4 flex items-center justify-between">
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
        <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">
          {filtered.length} requests registered
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
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
                  <th className="px-6 py-4">Partnership City</th>
                  <th className="px-6 py-4">Investment Capacity</th>
                  <th className="px-6 py-4">Contacts</th>
                  <th className="px-6 py-4">Review Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((fran) => (
                  <tr key={fran.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{fran.name}</td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400 flex items-center gap-1.5 mt-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {fran.city}
                    </td>
                    <td className="px-6 py-4 font-extrabold">
                      <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 text-amber-700 px-2 py-0.5 rounded border border-amber-100">
                        <DollarSign className="w-3 h-3" />
                        {fran.investment}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium space-y-1">
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-450" /> {fran.phone}</div>
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-450" /> {fran.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        fran.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                        fran.status === "Declined" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {fran.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1.5">
                      {fran.status !== "Approved" && (
                        <button 
                          onClick={() => updateStatus(fran.id, "Approved")}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer"
                          title="Approve Proposal"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {fran.status !== "Declined" && (
                        <button 
                          onClick={() => updateStatus(fran.id, "Declined")}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                          title="Decline Proposal"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(fran.id)}
                        className="p-1 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
