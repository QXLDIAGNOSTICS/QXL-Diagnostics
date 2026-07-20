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
  teal: "bg-teal-100 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400",
  blue: "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
  purple: "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400",
  orange: "bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400",
  rose: "bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400",
};

export default function StatCard({ title, value, icon: Icon, trend, trendUp, color = "teal" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex flex-wrap items-center text-xs gap-x-2 gap-y-0.5">
          <span className={`font-semibold whitespace-nowrap ${trendUp ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
          <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap">vs last month</span>
        </div>
      )}
    </div>
  );
}
