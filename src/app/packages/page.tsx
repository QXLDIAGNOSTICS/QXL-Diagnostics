"use client";
import React from 'react';
import PopularPackagesGrid from '@/components/PopularPackagesGrid';
import MobileTrustBadges from '@/components/MobileTrustBadges';

export default function PackagesPage() {
  return (
    <div className="bg-[#f8faff] min-h-screen pb-12">
      {/* Unified Single-Render Package Grid */}
      <PopularPackagesGrid />

      {/* Trust Badges */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <MobileTrustBadges />
      </div>
    </div>
  );
}

