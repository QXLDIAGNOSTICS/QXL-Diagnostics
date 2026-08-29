"use client";
import React from 'react';

export default function ScooterPhlebotomistSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Scooter Shadow */}
      <ellipse cx="80" cy="115" rx="55" ry="8" fill="#E2E8F0" />

      {/* Rear & Front Wheels */}
      <circle cx="36" cy="100" r="15" fill="#1E293B" />
      <circle cx="36" cy="100" r="8" fill="#94A3B8" />
      <circle cx="36" cy="100" r="3" fill="#F8FAFC" />

      <circle cx="124" cy="100" r="15" fill="#1E293B" />
      <circle cx="124" cy="100" r="8" fill="#94A3B8" />
      <circle cx="124" cy="100" r="3" fill="#F8FAFC" />

      {/* Scooter Body Frame — Amber Yellow #D69A18 & #E08500 */}
      <path d="M25 92C25 84 32 76 44 76H78L88 94H36C30 94 25 92 25 92Z" fill="#D69A18" />
      <path d="M78 76L96 46H108L94 76H78Z" fill="#E08500" />
      <path d="M98 94C98 83 107 74 122 74C135 74 144 83 144 94H98Z" fill="#D69A18" />

      {/* Sample Collection Box on Scooter Back */}
      <rect x="18" y="48" width="38" height="30" rx="6" fill="#F59E0B" stroke="#D69A18" strokeWidth="2" />
      <rect x="22" y="52" width="30" height="22" rx="4" fill="#FBBF24" />
      <path d="M26 63H48" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <text x="37" y="70" textAnchor="middle" fill="#0B2545" fontSize="6.5" fontWeight="900" letterSpacing="0.5">SAMPLES</text>

      {/* Scooter Seat */}
      <rect x="50" y="70" width="34" height="9" rx="4" fill="#0F172A" />

      {/* Handlebar & Headlight */}
      <path d="M96 44L103 34H114" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="108" cy="36" r="6.5" fill="#FEF08A" stroke="#D69A18" strokeWidth="2" />

      {/* Phlebotomist Rider */}
      {/* Pants & Shoes */}
      <path d="M66 72L76 50L88 60L80 76Z" fill="#1E3A8A" />
      <path d="M74 76L82 92H92L84 76Z" fill="#1E293B" />

      {/* Scrub Shirt */}
      <path d="M72 42L92 46L86 64L68 58Z" fill="#2563EB" />
      <path d="M86 46L102 40" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />

      {/* Phlebotomist Yellow Helmet & Face */}
      <circle cx="76" cy="30" r="13.5" fill="#D69A18" />
      <path d="M76 17C68 17 63 22 63 30H89C89 22 84 17 76 17Z" fill="#E08500" />
      <circle cx="77" cy="31" r="10" fill="#FDE047" />
      <circle cx="81" cy="31" r="2" fill="#0F172A" />
      <path d="M72 38C75 40 80 40 83 38" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Red Cross Badge on Helmet */}
      <rect x="72" y="21" width="8" height="8" rx="2" fill="white" />
      <path d="M76 23V27M74 25H78" stroke="#D69A18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
