'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  CollectRoleHeader,
  CollectActiveRole
} from '@/lib/../components/collect/CollectRoleHeader';
import { PatientBookingView } from '@/components/collect/PatientBookingView';
import { DispatchControlRoomView } from '@/lib/../components/collect/DispatchControlRoomView';
import { PhlebotomistMobileView } from '@/lib/../components/collect/PhlebotomistMobileView';
import { LogisticsCustodyView } from '@/lib/../components/collect/LogisticsCustodyView';
import { LabAccessionView } from '@/lib/../components/collect/LabAccessionView';
import { ItdoseClinicalReleaseView } from '@/lib/../components/collect/ItdoseClinicalReleaseView';
import { SecureReportPortalView } from '@/lib/../components/collect/SecureReportPortalView';
import { CeoExecutiveCockpitView } from '@/lib/../components/collect/CeoExecutiveCockpitView';
import { AuditForensicsView } from '@/lib/../components/collect/AuditForensicsView';
import {
  BookingRecord,
  FieldJob,
  BedsideSpecimen,
  TransportManifest,
  LabAccessionEntry,
  DiagnosticReportMetadata,
  CollectAuditEvent,
  OperationsKpiSnapshot
} from '@/lib/collect/types';
import { PHLEBOTOMIST_ROSTER } from '@/lib/collect/catalogueData';
import { collectStore } from '@/lib/collect/store';

export default function CollectPlatformPage() {
  const [activeRole, setActiveRole] = useState<CollectActiveRole>('PATIENT');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [jobs, setJobs] = useState<FieldJob[]>([]);
  const [specimens, setSpecimens] = useState<BedsideSpecimen[]>([]);
  const [manifests, setManifests] = useState<TransportManifest[]>([]);
  const [accessions, setAccessions] = useState<LabAccessionEntry[]>([]);
  const [reports, setReports] = useState<DiagnosticReportMetadata[]>([]);
  const [auditEvents, setAuditEvents] = useState<CollectAuditEvent[]>([]);
  const [snapshot, setSnapshot] = useState<OperationsKpiSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Synchronize state from store
  const refreshState = useCallback(() => {
    setBookings(collectStore.getAllBookings());
    setJobs(collectStore.getAllJobs());
    setSpecimens(collectStore.getAllSpecimens());
    setManifests(collectStore.getAllManifests());
    setAccessions(collectStore.getAllAccessions());
    setReports(collectStore.getAllReports());
    setAuditEvents(collectStore.getAuditEvents());
    setSnapshot(collectStore.getOperationsSnapshot());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  const pendingDispatchCount = bookings.filter(b => b.bookingStatus === 'CONFIRMED').length;

  return (
    <div className="min-h-screen bg-[#f8faff] flex flex-col">
      {/* Role Navigation & Master Header */}
      <CollectRoleHeader
        activeRole={activeRole}
        onSelectRole={role => setActiveRole(role)}
        pendingCount={pendingDispatchCount}
      />

      {/* Main Role Workstation Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-24 text-gray-500 space-y-3 flex-col">
            <div className="w-8 h-8 border-2 border-[#082142] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold">Initializing QXL Collect Operational Engine…</p>
          </div>
        ) : (
          <>
            {activeRole === 'PATIENT' && (
              <PatientBookingView
                activeBookings={bookings}
                onBookingConfirmed={() => {
                  refreshState();
                  setActiveRole('DISPATCHER');
                }}
              />
            )}

            {activeRole === 'DISPATCHER' && (
              <DispatchControlRoomView
                bookings={bookings}
                jobs={jobs}
                collectors={PHLEBOTOMIST_ROSTER}
                onJobAssigned={refreshState}
              />
            )}

            {activeRole === 'PHLEBOTOMIST' && (
              <PhlebotomistMobileView
                bookings={bookings}
                jobs={jobs}
                onSpecimenCollected={() => {
                  refreshState();
                  setActiveRole('LOGISTICS');
                }}
              />
            )}

            {activeRole === 'LOGISTICS' && (
              <LogisticsCustodyView
                manifests={manifests}
                specimens={specimens}
                onManifestUpdated={refreshState}
              />
            )}

            {activeRole === 'LAB' && (
              <LabAccessionView
                specimens={specimens}
                accessions={accessions}
                onAccessionProcessed={() => {
                  refreshState();
                  setActiveRole('CLINICAL_LIS');
                }}
              />
            )}

            {activeRole === 'CLINICAL_LIS' && (
              <ItdoseClinicalReleaseView
                bookings={bookings}
                reports={reports}
                onReportAuthorized={() => {
                  refreshState();
                  setActiveRole('REPORTS');
                }}
              />
            )}

            {activeRole === 'REPORTS' && (
              <SecureReportPortalView bookings={bookings} reports={reports} />
            )}

            {activeRole === 'EXECUTIVE' && snapshot && (
              <CeoExecutiveCockpitView snapshot={snapshot} />
            )}

            {activeRole === 'AUDIT' && (
              <AuditForensicsView events={auditEvents} />
            )}
          </>
        )}
      </main>

      {/* Footer System Status Banner */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-gray-800">QXL Collect 1.0 Live Operational Engine</span>
            <span>• Reference Laboratory: Kengeri, Bengaluru</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>NABL Certificate: MC-6849</span>
            <span>ITDOSE Adapter: INNOPATH REST Bridge</span>
            <span>DPDP 2026 Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

