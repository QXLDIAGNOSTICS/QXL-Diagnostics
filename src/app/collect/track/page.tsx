'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Sparkles, PhoneCall, ShieldCheck } from 'lucide-react';
import { BookingRecord } from '@/lib/collect/types';
import { collectStore } from '@/lib/collect/store';

export default function CollectTrackPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchRef, setSearchRef] = useState('');

  useEffect(() => {
    setBookings(collectStore.getAllBookings());
  }, []);

  const filtered = bookings.filter(b => {
    if (!searchRef.trim()) return true;
    const q = searchRef.toLowerCase().trim();
    return (
      b.bookingId.toLowerCase().includes(q) ||
      b.orderId.toLowerCase().includes(q) ||
      b.patients.some(p => p.patient.mobileNumber.includes(q) || p.patient.fullName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#f8faff] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/collect"
              className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-[#082142]">Track Home Blood Collection Visit</h1>
              <p className="text-xs text-gray-500">Live visit status, collector dispatch, and turnaround progress</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+919964639639"
              className="text-xs font-bold text-[#082142] hover:text-[#D69A18] flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D69A18]" />
              <span>+91 9964 639 639</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchRef}
            onChange={e => setSearchRef(e.target.value)}
            placeholder="Search by Booking ID (e.g. QXL-HC-...), Order ID, or Mobile..."
            className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-300 rounded-xl bg-white shadow-xs focus:ring-2 focus:ring-[#082142]"
          />
        </div>

        <div className="space-y-4">
          {filtered.map(b => (
            <div
              key={b.bookingId}
              className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm font-extrabold text-[#082142]">{b.bookingId}</span>
                  <span className="text-xs text-gray-400 ml-2">Order {b.orderId}</span>
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                  {b.bookingStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block">Patient Details</span>
                  <span className="font-bold text-gray-800">
                    {b.patients[0]?.patient.fullName} ({b.patients[0]?.patient.gender},{' '}
                    {b.patients[0]?.patient.ageYears} yrs)
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block">Scheduled Time Window</span>
                  <span className="font-medium text-gray-800">
                    {b.slot.slotStartTime}–{b.slot.slotEndTime} ({b.slot.slotDate})
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block">Collection Address</span>
                  <span className="font-medium text-gray-800">
                    {b.address.houseFlat}, {b.address.locality} – {b.address.pincode}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block">Investigations</span>
                  <span className="font-medium text-gray-800">
                    {b.patients[0]?.orderItems.map(i => i.testName).join(', ')}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  Total: <strong className="text-[#082142]">₹{b.netPayable}</strong> ({b.paymentStatus})
                </span>

                <Link
                  href="/collect"
                  className="text-xs font-bold text-[#082142] hover:text-[#D69A18] underline"
                >
                  Manage in QXL Collect Portal →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

