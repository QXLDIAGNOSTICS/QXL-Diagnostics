"use client";

import { useState, useEffect, useCallback } from "react";
import StatCard from "@/components/admin/StatCard";
import { RevenueChart, BookingChart } from "@/components/admin/Charts";
import { Users, CalendarDays, Stethoscope, Activity, Clock3, X, Loader2 } from "lucide-react";
import { api, type HealthPackage } from "@/lib/api";

interface RecentAppointment {
  id: string;
  name: string;
  service: string;
  date: string;
  status: string;
  note: string;
}

interface TopService {
  name: string;
  count: number;
  percentage: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    bookings: 0,
    doctors: 0,
    tests: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<RecentAppointment[]>([]);
  const [topServices, setTopServices] = useState<TopService[]>([]);


  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      const [adminStats, doctors, tests, { items: bookings }, packages] = await Promise.all([
        api.admin.stats(),
        api.doctors.list(),
        api.tests.list(),
        api.bookings.adminList(undefined, 100, 0),
        api.packages.list(),
      ]);

      setStats({
        patients: adminStats.total_users,
        bookings: adminStats.total_bookings,
        doctors: doctors.length,
        tests: tests.length,
        pending: adminStats.pending_bookings,
      });

      setRecentAppointments(
        bookings.slice(0, 5).map((b) => ({
          id: b.id,
          name: b.patient_name,
          service: b.test_name || "—",
          date: `${b.preferred_date || "—"} ${b.preferred_time ? `@ ${b.preferred_time}` : ""}`.trim(),
          status: b.status,
          note: `${b.collection_type === "home" ? "Home collection" : "Center visit"} · ${b.status.replace("_", " ")}`,
        }))
      );

      const counts = new Map<string, number>();
      for (const b of bookings) {
        if (b.package_id) counts.set(b.package_id, (counts.get(b.package_id) || 0) + 1);
      }
      const ranked: (HealthPackage & { count: number })[] = packages
        .map((p) => ({ ...p, count: counts.get(p.id) || 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4);
      const maxCount = Math.max(1, ...ranked.map((p) => p.count));
      setTopServices(
        ranked.map((p) => ({ name: p.name, count: p.count, percentage: Math.round((p.count / maxCount) * 100) || 5 }))
      );
    } catch {
      // Leave defaults on failure — dashboard should never hard-crash.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const STATUS_BADGE: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    sample_collected: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    report_ready: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    completed: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          Dashboard Overview
          <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Updates Active
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400">Welcome back, here's what's happening right now.</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="p-12 flex items-center justify-center text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard title="Total Patients" value={stats.patients.toString()} icon={Users} color="blue" trend="Live" trendUp={true} />
        <StatCard title="Total Bookings" value={stats.bookings.toString()} icon={CalendarDays} color="teal" trend="Live" trendUp={true} />
        <StatCard title="Total Doctors" value={stats.doctors.toString()} icon={Stethoscope} color="purple" trend="" trendUp={true} />
        <StatCard title="Total Tests" value={stats.tests.toString()} icon={Activity} color="orange" trend="" trendUp={true} />
        <StatCard title="Pending Bookings" value={stats.pending.toString()} icon={Clock3} color="blue" trend="Live" trendUp={true} />
      </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Overview</h3>
            <select className="text-sm bg-slate-50 dark:bg-gray-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-gray-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <RevenueChart />
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Appointments & Tests</h3>
            <select className="text-sm bg-slate-50 dark:bg-gray-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-gray-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <BookingChart />
        </div>
      </div>

      {/* Bottom Row - Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Appointments */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Appointments</h3>
            <button 
              onClick={() => window.location.href = '/admin/appointments'}
              className="text-sm text-teal-700 font-medium hover:underline px-3 py-1 rounded-md hover:bg-teal-50 transition-colors cursor-pointer"
            >
              View All Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="text-xs text-slate-700 dark:text-slate-400 uppercase bg-slate-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Patient</th>
                  <th className="px-4 py-3">Test / Package</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">
                      No recent appointments found.
                    </td>
                  </tr>
                ) : recentAppointments.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                    <td className="px-4 py-4">{item.service}</td>
                    <td className="px-4 py-4">{item.date}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_BADGE[item.status] || "bg-slate-100 text-slate-700"}`}>
                        {item.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => setSelectedPatient(item.id)}
                        className="text-teal-700 hover:text-white hover:bg-teal-600 border border-teal-600 px-3 py-1.5 rounded-lg cursor-pointer font-bold transition-all shadow-sm text-xs"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Packages</h3>
          </div>
          <div className="space-y-4">
            {topServices.map((service, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="truncate max-w-50">{service.name}</span>
                  <span>{service.count} bookings</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal Example */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">Appointment Details</h3>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {recentAppointments.map(apt => apt.id === selectedPatient && (
              <div key={apt.id} className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Patient Name</p>
                  <p className="font-medium text-slate-900">{apt.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Test / Package</p>
                    <p className="text-slate-700">{apt.service}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Time</p>
                    <p className="text-slate-700">{apt.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Reason / Condition</p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <p className="text-slate-700 text-sm">{apt.note}</p>
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => {
                      setSelectedPatient(null);
                      window.location.href = '/admin/appointments';
                    }}
                    className="flex-1 py-2.5 bg-teal-650 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
                  >
                    Edit Record
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedPatient(null);
                      window.location.href = '/admin/patients';
                    }}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors border border-slate-200 cursor-pointer text-xs"
                  >
                    View Patient Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
