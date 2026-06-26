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
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400",
};

export default function StatCard({ title, value, icon: Icon, trend, trendUp, color = "teal" }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex flex-wrap items-center text-xs gap-x-2 gap-y-0.5">
          <span className={`font-semibold whitespace-nowrap ${trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
          <span className="text-gray-400 dark:text-gray-500 whitespace-nowrap">vs last month</span>
        </div>
      )}
    </div>
  );
}
