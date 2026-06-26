"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/admin/StatCard";
import { RevenueChart, BookingChart } from "@/components/admin/Charts";
import { Users, CalendarDays, Stethoscope, Activity, DollarSign, MousePointerClick, X } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    bookings: 0,
    doctors: 0,
    tests: 0,
    revenue: 0,
    active: 0
  });

  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [topServices, setTopServices] = useState<any[]>([]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  useEffect(() => {
    const loadStats = () => {
      const pats = cmsStore.getAll("patients");
      const appts = cmsStore.getAll("appointments");
      const docs = cmsStore.getAll("doctors");
      const tsts = cmsStore.getAll("tests");
      const pkgs = cmsStore.getAll("packages");

      // Calculate revenue based on booked package prices or a standard visit cost
      const rev = appts.reduce((sum, apt) => {
        // Try to find matching package price
        const matchedPkg = pkgs.find(p => p.name === apt.service);
        const price = matchedPkg ? Number(matchedPkg.price) : 1800;
        return sum + price;
      }, 0);

      setStats({
        patients: 0,
        bookings: 0,
        doctors: 0,
        tests: 0,
        revenue: 0,
        active: 0
      });

      // Map doctors names dynamically
      const mappedAppointments = appts.map(apt => {
        const docIndex = Math.abs(apt.id.split('-')[1] || 0) % (docs.length || 1);
        const docName = docs[docIndex]?.name || "Dr. Shantakumar Muruda";
        return {
          id: apt.id,
          name: apt.patientName,
          doctor: docName,
          date: `${apt.date} @ ${apt.time}`,
          status: apt.status || "Confirmed",
          condition: `Routine checkup for ${apt.service}`
        };
      });

      setRecentAppointments(mappedAppointments.slice(0, 5));

      // Calculate Top Packages
      setTopServices(pkgs.slice(0, 4).map((p, idx) => ({
        name: p.name,
        count: [14, 11, 7, 5][idx] || 3,
        percentage: [90, 75, 55, 35][idx] || 25
      })));
    };

    loadStats();
    window.addEventListener("cms-update", loadStats);
    return () => window.removeEventListener("cms-update", loadStats);
  }, []);

  return (
    <div className="space-y-6 relative">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          Dashboard Overview
          <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Updates Active
          </span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Welcome back, here's what's happening right now.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Patients" value={stats.patients.toString()} icon={Users} color="blue" trend="+12%" trendUp={true} />
        <StatCard title="Total Bookings" value={stats.bookings.toString()} icon={CalendarDays} color="teal" trend="+8%" trendUp={true} />
        <StatCard title="Total Doctors" value={stats.doctors.toString()} icon={Stethoscope} color="purple" trend="0%" trendUp={true} />
        <StatCard title="Total Tests" value={stats.tests.toString()} icon={Activity} color="orange" trend="+15%" trendUp={true} />
        <StatCard title="Total Revenue" value={formatCurrency(stats.revenue)} icon={DollarSign} color="rose" trend="+6%" trendUp={true} />
        <StatCard title="Active Users" value={stats.active.toString()} icon={MousePointerClick} color="blue" trend="Live" trendUp={true} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
            <select className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <RevenueChart />
        </div>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Appointments & Tests</h3>
            <select className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
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
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Appointments</h3>
            <button 
              onClick={() => window.location.href = '/admin/appointments'}
              className="text-sm text-teal-600 font-medium hover:underline px-3 py-1 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors cursor-pointer"
            >
              View All Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Patient</th>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                      No recent appointments found.
                    </td>
                  </tr>
                ) : recentAppointments.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                    <td className="px-4 py-4">{item.doctor}</td>
                    <td className="px-4 py-4">{item.date}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${item.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                        ${item.status === 'Checked In' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                        ${item.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                      `}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => setSelectedPatient(item.id)}
                        className="text-teal-650 hover:text-white hover:bg-teal-600 border border-teal-600 px-3 py-1.5 rounded-lg cursor-pointer font-bold transition-all shadow-sm text-xs"
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
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Packages</h3>
          </div>
          <div className="space-y-4">
            {topServices.map((service, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-750 dark:text-gray-300">
                  <span className="truncate max-w-[200px]">{service.name}</span>
                  <span>{service.count} bookings</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Appointment Details</h3>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {recentAppointments.map(apt => apt.id === selectedPatient && (
              <div key={apt.id} className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Patient Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">{apt.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Assigned Doctor</p>
                    <p className="text-gray-700 dark:text-gray-300">{apt.doctor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Time</p>
                    <p className="text-gray-700 dark:text-gray-300">{apt.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Reason / Condition</p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{apt.condition}</p>
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
                    className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-lg transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer text-xs"
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
