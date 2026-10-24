import React from "react";
import { HelpCircle } from "lucide-react";

export interface QuickAnswerProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

export function QuickAnswer({
  title,
  children,
  subtitle
}: QuickAnswerProps) {
  return (
    <section
      className="p-5 my-6 bg-gradient-to-br from-blue-50/60 to-white border border-blue-200/80 rounded-2xl shadow-sm text-slate-800"
      aria-labelledby={`qa-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <div className="flex items-start gap-3 mb-2.5">
        <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h2
            id={`qa-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="text-base sm:text-lg font-bold text-[#082C61] tracking-tight"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-500 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 pl-9">
        {children}
      </div>
    </section>
  );
}

export default QuickAnswer;
