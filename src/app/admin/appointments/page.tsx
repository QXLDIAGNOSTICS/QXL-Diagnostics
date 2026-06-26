"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, Plus, Search, Trash2, X, Check, Clock, Eye } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Full Body Checkup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00 AM");

  useEffect(() => {
    const refreshData = () => {
      setAppointments(cmsStore.getAll("appointments"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setPatientName("");
    setPhone("");
    setService("Full Body Checkup");
    setDate(new Date().toISOString().split("T")[0]);
    setTime("09:00 AM");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone || !date) return;

    const payload = {
      patientName,
      phone,
      service,
      date,
      time,
      status: "Confirmed"
    };

    cmsStore.addItem("appointments", payload);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      cmsStore.deleteItem("appointments", id);
    }
  };

  const handleStatusChange = (id: string, status: string) => {
    cmsStore.updateItem("appointments", id, { status });
  };

  const filtered = appointments.filter(apt =>
    apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Appointments Coordinator
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage booked test visits and home samples schedule.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Schedule Visit
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} bookings
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <CalendarDays className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No appointments found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add your diagnostic panels schedule here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Requested Service</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{apt.patientName}</td>
                    <td className="px-6 py-4 font-medium">{apt.phone}</td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">{apt.service}</td>
                    <td className="px-6 py-4 font-medium">{apt.date} @ {apt.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        apt.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" :
                        apt.status === "Checked In" ? "bg-blue-100 text-blue-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1.5">
                      {apt.status !== "Confirmed" && (
                        <button 
                          onClick={() => handleStatusChange(apt.id, "Confirmed")}
                          className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer"
                          title="Confirm Appointment"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {apt.status === "Confirmed" && (
                        <button 
                          onClick={() => handleStatusChange(apt.id, "Checked In")}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer"
                          title="Check In Patient"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(apt.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
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
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Schedule Patient Visit</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Patient Name</label>
                <input 
                  type="text" 
                  required
                  value={patientName} 
                  onChange={(e) => setPatientName(e.target.value)} 
                  placeholder="Rahul Verma" 
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
                  placeholder="9876543210" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Requested Service</label>
                <input 
                  type="text" 
                  required
                  value={service} 
                  onChange={(e) => setService(e.target.value)} 
                  placeholder="Full Body Checkup" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Visit Date</label>
                  <input 
                    type="date" 
                    required
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Visit Time</label>
                  <input 
                    type="text" 
                    required
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    placeholder="09:00 AM" 
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
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
