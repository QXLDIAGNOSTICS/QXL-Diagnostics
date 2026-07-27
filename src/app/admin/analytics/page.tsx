"use client";

import React from "react";
import { BarChart3, TrendingUp, Users, ArrowUpRight, Monitor, Laptop, Globe, Compass, Share2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const trafficData = [
  { day: "Mon", pageViews: 1200, uniqueVisitors: 800 },
  { day: "Tue", pageViews: 1450, uniqueVisitors: 920 },
  { day: "Wed", pageViews: 1100, uniqueVisitors: 710 },
  { day: "Thu", pageViews: 1800, uniqueVisitors: 1150 },
  { day: "Fri", pageViews: 2200, uniqueVisitors: 1400 },
  { day: "Sat", pageViews: 1900, uniqueVisitors: 1200 },
  { day: "Sun", dayViews: 2400, pageViews: 2500, uniqueVisitors: 1550 }
];

const referralSources = [
  { name: "Google Organic Search", count: 8450, percentage: 48 },
  { name: "Direct Browser Link", count: 3520, percentage: 20 },
  { name: "WhatsApp Campaigns", count: 2640, percentage: 15 },
  { name: "Instagram & Facebook ads", count: 1760, percentage: 10 },
  { name: "Local Listing Map Pin", count: 1230, percentage: 7 }
];

const deviceBreakdown = [
  { name: "Mobile Phones", count: 14080, percentage: 80, icon: Monitor },
  { name: "Desktop / Laptops", count: 3168, percentage: 18, icon: Laptop },
  { name: "Tablets / iPads", count: 352, percentage: 2, icon: Globe }
];

const browserBreakdown = [
  { name: "Chrome", percentage: 65 },
  { name: "Safari (iOS/macOS)", percentage: 22 },
  { name: "Firefox", percentage: 8 },
  { name: "Edge & Opera", percentage: 5 }
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          Traffic & Conversion Analytics
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor page view logs, referral sources, organic keywords, and device usage statistics.</p>
      </div>

      {/* Overview stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Average CTR</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">4.82%</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +1.2% this week
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/20 flex items-center justify-center text-teal-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Session Duration</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">3m 42s</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +15s vs last month
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center text-blue-650">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bounce Rate</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">38.4%</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              -2.1% improvement
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/20 flex items-center justify-center text-orange-600">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-150 dark:border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Conversion Rate</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">8.54%</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.8% package orders
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center text-purple-600">
            <Share2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Traffic over time chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm">
        <h3 className="text-sm font-bold text-gray-950 dark:text-white mb-6 uppercase tracking-wider">Daily Web Traffic Summary</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
            <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#viewsGrad)" />
            <Area type="monotone" dataKey="uniqueVisitors" name="Unique Visitors" stroke="#0ea5e9" strokeWidth={2} fillOpacity={0} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Referral Sources */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider">Referral Traffic Channels</h3>
          <div className="space-y-4">
            {referralSources.map((src, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-750 dark:text-slate-200">
                  <span>{src.name}</span>
                  <span>{src.count.toLocaleString()} visits ({src.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#2563eb] h-full rounded-full transition-all" 
                    style={{ width: `${src.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device breakdown */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Device Breakdown</h3>
          <div className="space-y-4">
            {deviceBreakdown.map((dev, idx) => {
              const DevIcon = dev.icon;
              return (
                <div key={idx} className="flex items-center justify-between text-xs bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-xl border border-gray-100 dark:border-gray-850">
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                    <DevIcon className="w-4 h-4 text-gray-400" />
                    {dev.name}
                  </div>
                  <div className="font-extrabold text-[#2563eb]">
                    {dev.percentage}%
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-xs font-bold text-gray-450 uppercase mb-3 tracking-wide">Popular Browsers</h4>
            <div className="grid grid-cols-2 gap-3">
              {browserBreakdown.map((b, idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-medium text-gray-400">{b.name}</p>
                  <p className="font-extrabold text-slate-900 dark:text-white text-sm mt-0.5">{b.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
