'use client';

import React, { useState } from 'react';
import {
  History,
  Search,
  ShieldCheck,
  Clock,
  User,
  MapPin,
  Barcode,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CollectAuditEvent } from '@/lib/collect/types';

interface AuditForensicsViewProps {
  events: CollectAuditEvent[];
}

export const AuditForensicsView: React.FC<AuditForensicsViewProps> = ({ events }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const filteredEvents = events.filter(e => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase().trim();
    return (
      e.eventId.toLowerCase().includes(q) ||
      e.eventType.toLowerCase().includes(q) ||
      e.bookingId.toLowerCase().includes(q) ||
      (e.specimenId && e.specimenId.toLowerCase().includes(q)) ||
      (e.manifestId && e.manifestId.toLowerCase().includes(q)) ||
      e.actorRole.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#082142] tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-[#D69A18]" />
            <span>QMS Forensics — Immutable Chain-of-Custody Audit Log</span>
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Append-only event stream • Cryptographic timestamps • Actor role attribution • ISO 15189 compliance
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Search by Booking, Specimen or Manifest ID..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082142]"
          />
        </div>
      </div>

      {/* Events Timeline */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 pb-2">
          <span className="font-extrabold uppercase text-[#082142]">Audit Events ({filteredEvents.length})</span>
          <span>Displaying chronological records</span>
        </div>

        <div className="space-y-2">
          {filteredEvents.map(evt => {
            const isExpanded = expandedEventId === evt.eventId;

            return (
              <div
                key={evt.eventId}
                className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition text-xs space-y-2 bg-gray-50/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-900 bg-blue-100/60 px-2 py-0.5 rounded text-[11px]">
                      {evt.eventType}
                    </span>
                    <span className="font-mono text-gray-400 text-[10px]">{evt.eventId}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span>{new Date(evt.occurredAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-gray-700 text-[11px]">
                  <div>
                    <span className="text-gray-400">Booking:</span>{' '}
                    <span className="font-mono font-bold text-[#082142]">{evt.bookingId}</span>
                  </div>

                  {evt.specimenId && (
                    <div>
                      <span className="text-gray-400">Specimen:</span>{' '}
                      <span className="font-mono font-semibold text-purple-900">{evt.specimenId}</span>
                    </div>
                  )}

                  {evt.manifestId && (
                    <div>
                      <span className="text-gray-400">Manifest:</span>{' '}
                      <span className="font-mono font-semibold text-emerald-900">{evt.manifestId}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-gray-400">Role:</span>{' '}
                    <span className="font-semibold text-gray-800">{evt.actorRole}</span> ({evt.actorId})
                  </div>

                  <div>
                    <span className="text-gray-400">Location:</span>{' '}
                    <span className="font-semibold text-gray-800">{evt.locationId}</span>
                  </div>

                  <button
                    onClick={() => setExpandedEventId(isExpanded ? null : evt.eventId)}
                    className="ml-auto text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 font-bold"
                  >
                    <span>{isExpanded ? 'Hide Payload' : 'View Payload'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-2 p-3 bg-black/90 text-emerald-400 rounded-lg font-mono text-[10px] overflow-x-auto">
                    <pre>{JSON.stringify(evt.payload, null, 2)}</pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

