import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "teal" | "blue" | "purple" | "orange" | "rose";
}

const colorMap = {
  teal: "bg-teal-100 text-teal-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  rose: "bg-rose-100 text-rose-700",
};

export default function StatCard({ title, value, icon: Icon, trend, trendUp, color = "teal" }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex flex-wrap items-center text-xs gap-x-2 gap-y-0.5">
          <span className={`font-semibold whitespace-nowrap ${trendUp ? "text-emerald-700" : "text-rose-700"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
          <span className="text-slate-500 whitespace-nowrap">vs last month</span>
        </div>
      )}
    </div>
  );
}
