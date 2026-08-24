"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

      {/* Call Me Button — sky-blue glass */}
      <a
        href="tel:+919964639639"
        className="fab-scroll-top-btn text-white p-4 rounded-full flex items-center justify-center hover:scale-110 transition-all"
        style={{
          background: 'linear-gradient(135deg, rgba(56,189,248,0.92) 0%, rgba(14,165,233,0.95) 100%)',
          boxShadow: '0 4px 18px rgba(14,165,233,0.45)',
          border: '1px solid rgba(255,255,255,0.35)',
          width: '56px',
          height: '56px',
        }}
        aria-label="Call QXL Diagnostics"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send?phone=919964639639"
        target="_blank"
        rel="noreferrer"
        className="fab-whatsapp-btn text-white p-4 rounded-full flex items-center justify-center hover:scale-110 transition-all"
        style={{
          background: '#25D366',
          boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
          width: '56px',
          height: '56px',
          position: 'relative',
          bottom: 'auto',
          right: 'auto',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
