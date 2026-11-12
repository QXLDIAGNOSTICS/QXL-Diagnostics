'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Radio } from 'lucide-react';
import { DispatchControlRoomView } from '@/components/collect/DispatchControlRoomView';
import { collectStore } from '@/lib/collect/store';
import { PHLEBOTOMIST_ROSTER } from '@/lib/collect/catalogueData';
import { BookingRecord, FieldJob } from '@/lib/collect/types';

export default function CollectDispatchPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [jobs, setJobs] = useState<FieldJob[]>([]);

  const refresh = useCallback(() => {
    setBookings(collectStore.getAllBookings());
    setJobs(collectStore.getAllJobs());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

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

        <DispatchControlRoomView
          bookings={bookings}
          jobs={jobs}
          collectors={PHLEBOTOMIST_ROSTER}
          onJobAssigned={refresh}
        />
      </div>
    </div>
  );
}

