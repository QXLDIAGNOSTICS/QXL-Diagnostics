"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Mic, FileText, ArrowRight, Activity, BookOpen, Package } from 'lucide-react';

interface SmartSearchBarProps {
  placeholder?: string;
  isMobile?: boolean;
}

export default function SmartSearchBar({ placeholder = "Search For Lab Tests/Package", isMobile = false }: SmartSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSuggestions = () => {
    if (!query.trim()) {
      return { tests: [] as string[], packages: [] as string[], blogs: [] as string[] };
    }

    const q = query.toLowerCase();
    
    // Simulate AI Smart Search matching symptoms to tests
    if (q.includes("fever") || q.includes("hot") || q.includes("temperature")) {
      return {
        tests: ["Complete Blood Count (CBC)", "Dengue NS1 Antigen", "Malaria Parasite (MP) Test", "Typhoid Widal Test"],
        packages: ["Fever Profile - Basic", "Fever Profile - Advanced"],
        blogs: ["Understanding Dengue and Malaria Tests", "When to worry about a fever?"]
      };
    } else if (q.includes("sugar") || q.includes("diabet")) {
      return {
        tests: ["HbA1c (Glycosylated Hemoglobin)", "Fasting Blood Sugar (FBS)", "Post Prandial Blood Sugar (PPBS)"],
        packages: ["Diabetes Care Package", "Comprehensive Diabetic Profile"],
        blogs: ["Why Your Diet Affects Your Lipid Profile", "Managing Diabetes at Home"]
      };
    } else if (q.includes("heart") || q.includes("chest") || q.includes("pain")) {
      return {
        tests: ["Lipid Profile", "Troponin I", "ECG"],
        packages: ["Healthy Heart Package"],
        blogs: ["Understanding Your Lipid Profile"]
      };
    } else {
      return {
        tests: [`${query.toUpperCase()} Test`, "Complete Blood Count (CBC)"],
        packages: ["General Full Body Checkup"],
        blogs: [] as string[]
      };
    }
  };

  const suggestions = getSuggestions();

  return (
    <div ref={wrapperRef} className="relative flex-1 w-full">
      <div className={`flex items-center w-full transition-all ${isMobile ? 'bg-white rounded-2xl border border-gray-200 px-3 py-2.5 gap-2' : 'bg-transparent border-none'}`}>
        {isMobile && <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />}
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent border-none text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-0 ${isMobile ? 'text-[13px] font-medium p-0 min-w-0' : 'py-3 pl-6 pr-3 text-[15px] font-semibold w-full'}`}
        />

        {!isMobile && (
          <div className="flex items-center pr-12">
            <button className="p-2 text-[#2563eb] hover:bg-blue-50/50 rounded-full transition-colors" aria-label="Search" onClick={() => {
              setIsFocused(true);
            }}>
              <Search className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-sky-200/40 mx-2"></div>
          </div>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isFocused && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-blue-100 z-[9999] overflow-hidden max-h-[400px] overflow-y-auto">
          {/* AI Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 border-b border-blue-100 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider">AI Smart Suggestions</span>
          </div>

          <div className="p-2 space-y-4">
            {suggestions.tests.length > 0 && (
              <div>
                <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Activity className="w-3 h-3" /> Recommended Tests</h4>
                {suggestions.tests.map((test: string, idx: number) => (
                  <div key={idx} onClick={() => { setIsFocused(false); setQuery(test); router.push('/tests'); }} className="px-3 py-2 hover:bg-blue-50 rounded-lg cursor-pointer flex items-center justify-between group">
                    <span className="text-sm font-semibold text-slate-700">{test}</span>
                    <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            )}

            {suggestions.packages.length > 0 && (
              <div>
                <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Package className="w-3 h-3" /> Health Packages</h4>
                {suggestions.packages.map((pkg: string, idx: number) => (
                  <div key={idx} onClick={() => { setIsFocused(false); setQuery(pkg); router.push('/packages'); }} className="px-3 py-2 hover:bg-green-50 rounded-lg cursor-pointer flex items-center justify-between group">
                    <span className="text-sm font-semibold text-green-800">{pkg}</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Recommended</span>
                  </div>
                ))}
              </div>
            )}

            {suggestions.blogs.length > 0 && (
              <div>
                <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> Related Information</h4>
                {suggestions.blogs.map((blog: string, idx: number) => (
                  <div key={idx} onClick={() => { setIsFocused(false); setQuery(blog); router.push('/blog'); }} className="px-3 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3 h-3 text-slate-500" />
                    </div>
                    <span className="text-xs font-medium text-slate-600 truncate">{blog}</span>
                  </div>
                ))}
              </div>
            )}
            
            {(suggestions.tests.length === 0 && suggestions.packages.length === 0) && (
              <div className="px-3 py-4 text-center text-sm text-slate-500">
                No specific AI matches found. Press enter to search all.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
