'use client';

import React, { useState } from 'react';
import {
  Radio,
  Clock,
  UserCheck,
  AlertTriangle,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Send,
  Filter,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { BookingRecord, FieldJob, CollectorProfile } from '@/lib/collect/types';
import { PHLEBOTOMIST_ROSTER } from '@/lib/collect/catalogueData';

interface DispatchControlRoomViewProps {
  bookings: BookingRecord[];
  jobs: FieldJob[];
  collectors: CollectorProfile[];
  onJobAssigned: () => void;
}

export const DispatchControlRoomView: React.FC<DispatchControlRoomViewProps> = ({
  bookings,
  jobs,
  collectors = PHLEBOTOMIST_ROSTER,
  onJobAssigned
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [selectedJob, setSelectedJob] = useState<{ job: FieldJob; booking: BookingRecord } | null>(null);
  const [chosenCollectorId, setChosenCollectorId] = useState<string>('');
  const [overrideReason, setOverrideReason] = useState<string>('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; error: boolean } | null>(null);

  // Group bookings into Kanban Queues
  const queues = [
    { id: 'UNASSIGNED', label: 'Unassigned Queue', count: bookings.filter(b => b.bookingStatus === 'CONFIRMED').length },
    { id: 'ALLOCATED', label: 'Allocated / Acknowledged', count: bookings.filter(b => b.bookingStatus === 'ALLOCATED').length },
    { id: 'EN_ROUTE', label: 'Collector En Route', count: bookings.filter(b => b.bookingStatus === 'EN_ROUTE').length },
    { id: 'IN_PROGRESS', label: 'At Bedside / Collecting', count: bookings.filter(b => b.bookingStatus === 'IN_PROGRESS').length },
    { id: 'COLLECTED', label: 'Drawn & Awaiting Transport', count: bookings.filter(b => b.bookingStatus === 'COLLECTED').length },
    { id: 'FAILED_RECOLLECT', label: 'Recollection Exceptions', count: bookings.filter(b => b.bookingStatus === 'FAILED_RECOLLECT').length }
  ];

  const filteredBookings = bookings.filter(b => {
    if (selectedZone === 'ALL') return true;
    return b.slot.zoneId === selectedZone;
  });

  const handleOpenAssign = (booking: BookingRecord) => {
    const job = jobs.find(j => j.bookingId === booking.bookingId) || {
      jobId: booking.assignedJobId || `QXL-JOB-${booking.bookingId.split('-').pop()}`,
      bookingId: booking.bookingId,
      jobStatus: 'UNASSIGNED' as const,
      scheduledDate: booking.slot.slotDate,
      scheduledTimeWindow: `${booking.slot.slotStartTime} - ${booking.slot.slotEndTime}`
    };
    setSelectedJob({ job, booking });
    setChosenCollectorId(collectors[0]?.collectorId || '');
    setOverrideReason('');
    setFeedbackMsg(null);
  };

  const handleExecuteAssign = async () => {
    if (!selectedJob || !chosenCollectorId) return;

    setIsAssigning(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/v1/collect/jobs/${selectedJob.job.jobId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collectorId: chosenCollectorId,
          dispatcherId: 'DISPATCHER_CTRL_ROOM_01',
          overrideReason: overrideReason.trim() || undefined
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to allocate phlebotomist');
      }

      setFeedbackMsg({ text: `Successfully allocated visit to ${data.collector?.fullName}`, error: false });
      setTimeout(() => {
        setSelectedJob(null);
        onJobAssigned();
      }, 1200);
    } catch (err: any) {
      setFeedbackMsg({ text: err.message, error: true });
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dispatch Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#082142] tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#D69A18]" />
            <span>Stage 03 — Dispatch Control Room & Route Board</span>
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Real-time collector roster • Competency-gated auto assignment • Route SLA tracking • Shift capacity
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-gray-500" />
          <span className="font-semibold text-gray-700">Filter Zone:</span>
          <select
            value={selectedZone}
            onChange={e => setSelectedZone(e.target.value)}
            className="px-2.5 py-1 border border-gray-300 rounded-lg bg-white text-xs"
          >
            <option value="ALL">All Bengaluru Zones</option>
            <option value="ZONE_SOUTH_WEST">South-West (Kengeri / RR Nagar)</option>
            <option value="ZONE_NORTH">North (Yelahanka / Hebbal)</option>
            <option value="ZONE_CENTRAL_EAST">Central & East (Indiranagar / Koramangala)</option>
            <option value="ZONE_TECH_CORRIDOR">Tech Corridor (Whitefield / Bellandur)</option>
            <option value="ZONE_SOUTH">South (Jayanagar / JP Nagar)</option>
          </select>
        </div>
      </div>

      {/* Kanban Queue Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {queues.map(q => (
          <div key={q.id} className="p-3 rounded-xl border border-gray-200 bg-white shadow-xs">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-500 block truncate">
              {q.label}
            </span>
            <span className="text-xl font-black text-[#082142] mt-1 block">{q.count}</span>
          </div>
        ))}
      </div>

      {/* Active Work Orders Grid */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider">
            Scheduled Visits ({filteredBookings.length})
          </h2>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Auto-route SLA Active: 100% on-time target
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredBookings.map(b => {
            const p = b.patients[0]?.patient;
            const assignedCollector = collectors.find(
              c => c.collectorId === jobs.find(j => j.bookingId === b.bookingId)?.collectorId
            );
            const isUnassigned = b.bookingStatus === 'CONFIRMED';

            return (
              <div
                key={b.bookingId}
                className={`p-3.5 rounded-xl border transition space-y-2.5 ${
                  isUnassigned ? 'border-amber-300 bg-amber-50/20' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#082142]">{b.bookingId}</span>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      isUnassigned
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {b.bookingStatus}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="font-bold text-gray-900">{p?.fullName}</div>
                  <div className="text-gray-500 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D69A18]" />
                    <span>
                      {b.address.locality} ({b.address.pincode})
                    </span>
                  </div>
                  <div className="text-gray-500 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D69A18]" />
                    <span>
                      {b.slot.slotStartTime}–{b.slot.slotEndTime} ({b.slot.slotDate})
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 line-clamp-1">
                    Tests: {b.patients[0]?.orderItems.map(i => i.testName).join(', ')}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                  {assignedCollector ? (
                    <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      <span>{assignedCollector.fullName}</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-amber-700 font-bold">⚠️ Collector Required</span>
                  )}

                  <button
                    onClick={() => handleOpenAssign(b)}
                    className="px-2.5 py-1 rounded-lg bg-[#082142] text-white text-[11px] font-bold hover:bg-[#0c3162] transition"
                  >
                    {isUnassigned ? 'Allocate Staff' : 'Reassign / View'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Allocation Drawer / Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-sm font-extrabold text-[#082142]">
                Assign Phlebotomist • {selectedJob.booking.bookingId}
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs space-y-1">
              <p>
                <span className="font-semibold text-gray-600">Patient:</span>{' '}
                <span className="font-bold text-[#082142]">
                  {selectedJob.booking.patients[0]?.patient.fullName} (
                  {selectedJob.booking.patients[0]?.patient.ageYears} yrs)
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Locality:</span>{' '}
                {selectedJob.booking.address.locality} (PIN {selectedJob.booking.address.pincode})
              </p>
              <p>
                <span className="font-semibold text-gray-600">Slot:</span>{' '}
                {selectedJob.booking.slot.slotStartTime}–{selectedJob.booking.slot.slotEndTime} (
                {selectedJob.booking.slot.slotDate})
              </p>
            </div>

            {/* Collector Selection List */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#082142]">Available Shift Phlebotomists</label>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {collectors.map(c => {
                  const isSelected = chosenCollectorId === c.collectorId;
                  const isFull = c.activeJobsCount >= c.dailyCapacityMax;

                  return (
                    <div
                      key={c.collectorId}
                      onClick={() => !isFull && setChosenCollectorId(c.collectorId)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'border-[#082142] bg-[#082142]/5 ring-1 ring-[#082142]'
                          : isFull
                          ? 'opacity-40 border-gray-200 cursor-not-allowed bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#082142]">{c.fullName}</div>
                        <p className="text-[10px] text-gray-500">
                          Base: {c.homeBaseZone} • Shift: {c.shiftHours}
                        </p>
                        <p className="text-[10px] text-gray-600">
                          Skills: {c.competencies.join(', ')}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100">
                          {c.activeJobsCount} / {c.dailyCapacityMax} Jobs
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Override Reason */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Dispatcher Override Justification (If reallocating or cross-zone)
              </label>
              <input
                type="text"
                value={overrideReason}
                onChange={e => setOverrideReason(e.target.value)}
                placeholder="e.g. Route optimization / requested collector"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
              />
            </div>

            {feedbackMsg && (
              <div
                className={`p-2.5 rounded-lg text-xs font-medium ${
                  feedbackMsg.error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800'
                }`}
              >
                {feedbackMsg.text}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteAssign}
                disabled={isAssigning || !chosenCollectorId}
                className="px-4 py-1.5 rounded-lg bg-[#082142] text-white text-xs font-bold hover:bg-[#0c3162] disabled:opacity-50 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#D69A18]" />
                <span>{isAssigning ? 'Allocating…' : 'Confirm Assignment'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

