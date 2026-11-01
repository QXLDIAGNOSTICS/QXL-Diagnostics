import React from 'react';
import PackagesCatalog from '@/components/PackagesCatalog';
import MobileTrustBadges from '@/components/MobileTrustBadges';

// Packages managed in the admin panel show up within five minutes.
export const revalidate = 300;

export default function PackagesPage() {
  return (
    <div className="bg-[#f8faff] min-h-screen pb-12">
      {/* Unified Single-Render Package Grid */}
      <PackagesCatalog />

      {/* Trust Badges */}
      <div className="max-w-[1200px] mx-auto px-4 mt-6">
        <MobileTrustBadges />
      </div>
    </div>
  );
}
