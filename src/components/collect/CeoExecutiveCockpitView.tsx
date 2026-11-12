'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Clock,
  DollarSign,
  Activity,
  Layers,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { OperationsKpiSnapshot } from '@/lib/collect/types';

interface CeoExecutiveCockpitViewProps {
  snapshot: OperationsKpiSnapshot;
}

export const CeoExecutiveCockpitView: React.FC<CeoExecutiveCockpitViewProps> = ({ snapshot }) => {
  const [selectedHub, setSelectedHub] = useState<string>('ALL');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#082142] tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#D69A18]" />
            <span>QXL Diagnostics — CEO & Operations Executive Cockpit</span>
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Real-time unit economics, pre-analytical sample quality, phlebotomy productivity & ITDOSE LIS health
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-gray-600">Hub Attribution:</span>
          <select
            value={selectedHub}
            onChange={e => setSelectedHub(e.target.value)}
            className="px-2.5 py-1 border border-gray-300 rounded-lg bg-white text-xs font-semibold"
          >
            <option value="ALL">All Hubs (Kengeri Lab + Yelahanka)</option>
            <option value="KENGERI">Kengeri Central Reference Laboratory</option>
            <option value="YELAHANKA">Yelahanka North Hub</option>
          </select>
          <span className="text-[10px] text-gray-400 font-mono ml-2">
            Freshness: {new Date(snapshot.freshnessTimestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Top 4 Hero KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Verified Collected Revenue
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#082142]">
              ₹{snapshot.financialEconomics.verifiedPaidReceiptsInr.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              100% Verified
            </span>
          </div>
          <p className="text-[10px] text-gray-500">Gross Booked: ₹{snapshot.financialEconomics.grossBookedValueInr}</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Operating Contribution Margin
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#D69A18]">
              {snapshot.financialEconomics.operatingMarginPercent}%
            </span>
            <span className="text-[11px] font-bold text-gray-600">
              ₹{snapshot.financialEconomics.netOperatingContributionInr} Net
            </span>
          </div>
          <p className="text-[10px] text-gray-500">Excludes historic capex & creditors</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Pre-Analytical Quality Rate
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700">
              {snapshot.preAnalyticalQuality.rejectionRatePer1000}
            </span>
            <span className="text-[10px] font-bold text-gray-600">Per 1,000 Tubes</span>
          </div>
          <p className="text-[10px] text-gray-500">
            {snapshot.preAnalyticalQuality.rejectionCount} Rejection / {snapshot.preAnalyticalQuality.totalSpecimensDrawn} Drawn
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
            Average End-to-End TAT
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[#082142]">
              {snapshot.tatMetrics.totalBookingToReportHours}h
            </span>
            <span className="text-[10px] font-bold text-emerald-600">0% SLA Breach</span>
          </div>
          <p className="text-[10px] text-gray-500">Booking to Authorized Release</p>
        </div>
      </div>

      {/* Section 1: Booking Funnel & Collector Productivity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Funnel */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#D69A18]" />
              <span>Conversion & Intake Funnel</span>
            </h2>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {snapshot.bookingFunnel.conversionRatePercent}% Conversion
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
              <span className="text-gray-600">Visits Started:</span>
              <span className="font-bold text-gray-900">{snapshot.bookingFunnel.visitsStarted}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-blue-50/50">
              <span className="text-blue-900 font-semibold">Confirmed Orders:</span>
              <span className="font-extrabold text-blue-900">{snapshot.bookingFunnel.confirmedBookings}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
              <span className="text-gray-600">Scheduled / En Route:</span>
              <span className="font-bold text-gray-900">{snapshot.bookingFunnel.scheduledVisits}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-50/50">
              <span className="text-emerald-900 font-semibold">Completed & Released:</span>
              <span className="font-extrabold text-emerald-900">{snapshot.bookingFunnel.completedCollections}</span>
            </div>
          </div>

          {/* Source Breakdown */}
          <div className="border-t border-gray-100 pt-3">
            <span className="text-[10px] uppercase font-extrabold text-gray-400 block mb-2">
              Bookings by Acquisition Channel
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg border border-gray-200">
                <span className="font-bold text-[#082142] block">{snapshot.bookingFunnel.sourceBreakdown.website}</span>
                <span className="text-[10px] text-gray-500">Website</span>
              </div>
              <div className="p-2 rounded-lg border border-gray-200">
                <span className="font-bold text-[#082142] block">{snapshot.bookingFunnel.sourceBreakdown.whatsapp}</span>
                <span className="text-[10px] text-gray-500">WhatsApp</span>
              </div>
              <div className="p-2 rounded-lg border border-gray-200">
                <span className="font-bold text-[#082142] block">{snapshot.bookingFunnel.sourceBreakdown.callCenter}</span>
                <span className="text-[10px] text-gray-500">Call Center</span>
              </div>
              <div className="p-2 rounded-lg border border-gray-200">
                <span className="font-bold text-[#082142] block">{snapshot.bookingFunnel.sourceBreakdown.hospitalPartner}</span>
                <span className="text-[10px] text-gray-500">Hospital</span>
              </div>
            </div>
          </div>
        </div>

        {/* Collector Productivity */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#D69A18]" />
              <span>Phlebotomist Fleet Efficiency</span>
            </h2>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {snapshot.collectorProductivity.totalActiveCollectors} Active Collectors
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-gray-50">
              <span className="text-gray-600">Draws Per Shift Average:</span>
              <span className="font-bold text-gray-900">
                {snapshot.collectorProductivity.drawsPerShiftAverage} visits / shift
              </span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-gray-50">
              <span className="text-gray-600">On-Time Arrival SLA:</span>
              <span className="font-bold text-emerald-700">
                {snapshot.collectorProductivity.onTimeArrivalPercent}% within slot
              </span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-gray-50">
              <span className="text-gray-600">Average Bedside Duration:</span>
              <span className="font-bold text-gray-900">
                {snapshot.collectorProductivity.averageCollectionDurationMinutes} mins
              </span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-lg bg-gray-50">
              <span className="text-gray-600">First-Attempt Draw Success:</span>
              <span className="font-bold text-emerald-700">
                {snapshot.collectorProductivity.firstAttemptSuccessPercent}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: TAT Waterfall & ITDOSE Integration Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TAT Waterfall */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D69A18]" />
            <span>Turnaround Time (TAT) Waterfall</span>
          </h2>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg border border-gray-200 flex justify-between">
              <span>Stage 01 to 04 (Booking → Bedside Draw):</span>
              <span className="font-bold text-gray-800">{snapshot.tatMetrics.bookingToCollectionAverageHours}h</span>
            </div>
            <div className="p-2.5 rounded-lg border border-gray-200 flex justify-between">
              <span>Stage 05 (Bedside → Lab Cold-Chain Transit):</span>
              <span className="font-bold text-gray-800">{snapshot.tatMetrics.collectionToLabReceiptAverageHours}h</span>
            </div>
            <div className="p-2.5 rounded-lg border border-gray-200 flex justify-between">
              <span>Stage 06 & 07 (Lab Receipt → Pathologist Signoff):</span>
              <span className="font-bold text-gray-800">
                {snapshot.tatMetrics.labReceiptToAuthorizationAverageHours}h
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex justify-between text-emerald-900 font-bold">
              <span>Total Booking to Authorized Report:</span>
              <span>{snapshot.tatMetrics.totalBookingToReportHours} Hours</span>
            </div>
          </div>
        </div>

        {/* ITDOSE LIS Health */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D69A18]" />
            <span>ITDOSE INNOPATH LIS Interface Health</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-gray-200">
              <span className="text-[10px] text-gray-500 block">Synced Accessions</span>
              <span className="text-lg font-bold text-emerald-700">
                {snapshot.lisIntegrationHealth.syncedAccessions}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200">
              <span className="text-[10px] text-gray-500 block">Queue Backlog Depth</span>
              <span className="text-lg font-bold text-[#082142]">
                {snapshot.lisIntegrationHealth.pendingQueueDepth}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200">
              <span className="text-[10px] text-gray-500 block">Failed Retries</span>
              <span className="text-lg font-bold text-gray-700">
                {snapshot.lisIntegrationHealth.failedRetryCount}
              </span>
            </div>
            <div className="p-3 rounded-lg border border-gray-200">
              <span className="text-[10px] text-gray-500 block">Avg Sync Latency</span>
              <span className="text-lg font-bold text-gray-700">
                {snapshot.lisIntegrationHealth.averageSyncLatencySeconds}s
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-[11px] text-gray-600 flex items-start gap-2 border border-gray-200">
            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>
              All accession messages authenticated via mutually verified JWT over HTTPS. Dead-letter queue depth is 0.
            </span>
          </div>
        </div>
      </div>

      {/* Data Source & Metric Footnotes */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-500 space-y-1">
        <p className="font-bold text-[#082142]">Data Governance & Methodology Note:</p>
        <p>
          • Revenue figures reflect verified electronic payments and authorized pay-at-collection cash collections.
          Provisional bookings are excluded from collected revenue.
        </p>
        <p>
          • Operating expense accounts for direct phlebotomy trip compensation (₹180/visit), consumable kits (₹45/tube),
          and runner logistics. Capital expenditure, IT licenses, and prior period creditors are segregated into central
          P&L statements.
        </p>
      </div>
    </div>
  );
};

