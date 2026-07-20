"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Users, Award, Shield, Stethoscope, HeartPulse } from "lucide-react";

function CounterItem({ end, label, suffix = "+", icon: Icon, delay = 0 }: any) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const duration = 2500; // 2.5 seconds
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      // easeOutExpo function
      const t = Math.min((timestamp - startTimestamp) / duration, 1);
      const progress = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      
      setCount(Math.floor(progress * end));
      if (t < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, end]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm border border-blue-50 hover:shadow-lg transition-shadow group"
    >
      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2563eb] group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-[#2563eb] group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-3xl md:text-4xl font-black text-[#0f2d5e] mb-1 tracking-tight">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-slate-500 font-semibold text-sm uppercase tracking-wide">{label}</p>
    </motion.div>
  );
}

export default function AnimatedCounters() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#f8faff] to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563eb]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-4 w-full relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">Trusted By Thousands</span>
          <h2 className="text-[#0f2d5e] text-2xl md:text-3xl font-extrabold mb-3">Excellence in Diagnostics</h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">We are committed to delivering accurate, timely, and accessible healthcare solutions to every patient.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          <CounterItem end={100000} label="Tests Performed" icon={Activity} delay={0.1} />
          <CounterItem end={50000} label="Happy Patients" icon={Users} delay={0.2} />
          <CounterItem end={50} label="Expert Doctors" icon={Stethoscope} delay={0.3} />
          <CounterItem end={98} label="Satisfaction" suffix="%" icon={HeartPulse} delay={0.4} />
          <CounterItem end={24} label="Support" suffix="/7" icon={Shield} delay={0.5} />
        </div>
      </div>
    </section>
  );
}
