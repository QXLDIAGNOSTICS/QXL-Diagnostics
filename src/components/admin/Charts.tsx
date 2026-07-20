"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const revenueData = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 5000 },
  { name: "Apr", total: 4500 },
  { name: "May", total: 6000 },
  { name: "Jun", total: 7000 },
  { name: "Jul", total: 6500 },
];

const bookingData = [
  { name: "Mon", tests: 40, consults: 24 },
  { name: "Tue", tests: 30, consults: 13 },
  { name: "Wed", tests: 20, consults: 38 },
  { name: "Thu", tests: 27, consults: 39 },
  { name: "Fri", tests: 18, consults: 48 },
  { name: "Sat", tests: 23, consults: 38 },
  { name: "Sun", tests: 34, consults: 43 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
        <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => "$" + value} />
        <Tooltip
          contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #cbd5e1", boxShadow: "0 6px 20px -6px rgb(15 23 42 / 0.22)", color: "#0f172a" }}
        />
        <Area type="monotone" dataKey="total" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BookingChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={bookingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
        <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #cbd5e1", boxShadow: "0 6px 20px -6px rgb(15 23 42 / 0.22)", color: "#0f172a" }}
        />
        <Bar dataKey="tests" name="Lab Tests" fill="#0d9488" radius={[4, 4, 0, 0]} />
        <Bar dataKey="consults" name="Consultations" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
