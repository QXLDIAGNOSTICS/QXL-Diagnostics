"use client";
import React from 'react';

export default function Technologies() {
  const techs = [
    { name: "Beckman Coulter", type: "Immunoassay & Biochemistry", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Beckman_Coulter_Logo.svg/512px-Beckman_Coulter_Logo.svg.png" },
    { name: "Sysmex", type: "Hematology Analyzers", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Sysmex_logo.svg/512px-Sysmex_logo.svg.png" },
    { name: "Roche Diagnostics", type: "Molecular Diagnostics", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Roche_Logo.svg/512px-Roche_Logo.svg.png" },
    { name: "Siemens Healthineers", type: "Advanced Imaging & Lab", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Siemens_Healthineers_logo.svg/512px-Siemens_Healthineers_logo.svg.png" },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-150 overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-2">Global Standards</span>
          <h2 className="text-[#0f2d5e] text-3xl font-extrabold mb-3">Powered by World-Class Technology</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto font-medium">
            We partner with the world&apos;s leading diagnostic equipment manufacturers to ensure every test result is highly accurate, reliable, and swift.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techs.map((tech, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 flex items-center justify-center mb-4 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src={tech.logo} alt={tech.name} className="max-h-full max-w-[120px] object-contain" />
              </div>
              <h3 className="font-extrabold text-[#0f2d5e] text-[13px]">{tech.name}</h3>
              <p className="text-slate-400 text-[11px] font-medium">{tech.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
