'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { CeoExecutiveCockpitView } from '@/components/collect/CeoExecutiveCockpitView';
import { collectStore } from '@/lib/collect/store';
import { OperationsKpiSnapshot } from '@/lib/collect/types';

export default function CollectAnalyticsPage() {
  const [snapshot, setSnapshot] = useState<OperationsKpiSnapshot | null>(null);

  useEffect(() => {
    setSnapshot(collectStore.getOperationsSnapshot());
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faff] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <Link
            href="/collect"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to QXL Collect Workstation</span>
          </Link>
        </div>

        {snapshot ? (
          <CeoExecutiveCockpitView snapshot={snapshot} />
        ) : (
          <div className="p-8 text-center text-xs text-gray-500">Loading operations snapshot…</div>
        )}
      </div>
    </div>
  );
}

