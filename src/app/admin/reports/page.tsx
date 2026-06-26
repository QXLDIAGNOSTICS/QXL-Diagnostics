"use client";

import React, { useState, useEffect } from "react";
import { FileText, Plus, Search, Trash2, Edit2, X, Download, FileCheck, CheckCircle } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [patientName, setPatientName] = useState("");
  const [testName, setTestName] = useState("");
  const [status, setStatus] = useState("Released");
  const [date, setDate] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const refreshData = () => {
      let data = cmsStore.getAll("reports");
      // If empty, let's mock it so the user isn't greeted with a blank screen
      if (data.length === 0) {
        const mockReports = [
          { id: "rep-1", patientName: "Rahul Verma", testName: "Complete Blood Count (CBC)", status: "Released", date: "2026-06-18", pdfUrl: "#" },
          { id: "rep-2", patientName: "Sania Mirza", testName: "HbA1c & Diabetes Panel", status: "Released", date: "2026-06-19", pdfUrl: "#" }
        ];
        cmsStore.saveState("reports", mockReports);
        data = mockReports;
      }
      setReports(data);
      setPatients(cmsStore.getAll("patients"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setPatientName(patients[0]?.name || "");
    setTestName("Complete Blood Count (CBC)");
    setStatus("Released");
    setDate(new Date().toISOString().split("T")[0]);
    setPdfUrl("/reports/sample_report.pdf");
    setIsModalOpen(true);
  };

  const openEditModal = (rep: any) => {
    setEditingId(rep.id);
    setPatientName(rep.patientName);
    setTestName(rep.testName);
    setStatus(rep.status);
    setDate(rep.date);
    setPdfUrl(rep.pdfUrl || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !testName || !date) return;

    const payload = {
      patientName,
      testName,
      status,
      date,
      pdfUrl
    };

    if (editingId) {
      cmsStore.updateItem("reports", editingId, payload);
    } else {
      cmsStore.addItem("reports", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this report record?")) {
      cmsStore.deleteItem("reports", id);
    }
  };

  const filtered = reports.filter(r => 
    r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.testName.toLowerCase().includes(searchQuery.toLowerCase())
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
          <p className="text-gray-500 dark:text-gray-400 mt-1">Release lab result documents and track patient report download links.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Release Report PDF
        </button>
      </div>

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

        {filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No reports found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Upload and assign diagnostic PDFs here.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Release First Report
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Lab Test name</th>
                  <th className="px-6 py-4">Released Date</th>
                  <th className="px-6 py-4">Document Status</th>
                  <th className="px-6 py-4">Download PDF</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{rep.patientName}</td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">{rep.testName}</td>
                    <td className="px-6 py-4 font-medium">{rep.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 w-fit ${
                        rep.status === "Released" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        <CheckCircle className="w-3 h-3" />
                        {rep.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <a href={rep.pdfUrl} download className="inline-flex items-center gap-1 text-[#2563eb] hover:underline">
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1.5">
                      <button 
                        onClick={() => openEditModal(rep)}
                        className="p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer"
                        title="Edit Report Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(rep.id)}
                        className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md cursor-pointer"
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

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit Released Report" : "Release Diagnostic Report"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Select Patient</label>
                <select 
                  value={patientName} 
                  onChange={(e) => setPatientName(e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-600 dark:text-slate-100 focus:outline-none"
                >
                  <option value="">-- Choose registered patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.name}>{p.name} ({p.phone})</option>
                  ))}
                  {patients.length === 0 && (
                    <>
                      <option value="Rahul Verma">Rahul Verma</option>
                      <option value="Sania Mirza">Sania Mirza</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Test Title / Package Name</label>
                <input 
                  type="text" 
                  required
                  value={testName} 
                  onChange={(e) => setTestName(e.target.value)} 
                  placeholder="Complete Blood Count (CBC)" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Report PDF URL</label>
                  <input 
                    type="text" 
                    value={pdfUrl} 
                    onChange={(e) => setPdfUrl(e.target.value)} 
                    placeholder="/reports/cbc_verma.pdf" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Release Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-655 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="Released">Released</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Release Date</label>
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
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer"
                >
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
