"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, FileText } from 'lucide-react';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show buttons after scrolling down a bit
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

      
      {/* WhatsApp Button */}
      <a 
        href="https://api.whatsapp.com/send?phone=919964639639" 
        target="_blank" 
        rel="noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:bg-[#1ebe57] hover:scale-110 transition-all animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
