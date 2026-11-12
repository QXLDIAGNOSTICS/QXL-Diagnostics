'use client';

import React, { useState } from 'react';
import {
  Truck,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  Barcode,
  CheckCircle2,
  Box,
  ArrowRight,
  RefreshCw,
  Plus
} from 'lucide-react';
import { TransportManifest, BedsideSpecimen } from '@/lib/collect/types';

interface LogisticsCustodyViewProps {
  manifests: TransportManifest[];
  specimens: BedsideSpecimen[];
  onManifestUpdated: () => void;
}

export const LogisticsCustodyView: React.FC<LogisticsCustodyViewProps> = ({
  manifests,
  specimens,
  onManifestUpdated
}) => {
  const [selectedManifest, setSelectedManifest] = useState<TransportManifest | null>(manifests[0] || null);

  // New Manifest Creation State
  const [isCreatingManifest, setIsCreatingManifest] = useState(false);
  const [riderName, setRiderName] = useState('Syed Arbaaz (Logistics Runner)');
  const [boxId, setBoxId] = useState('COLD-BOX-09');
  const [tempDispatch, setTempDispatch] = useState('4.2');

  // Handover state
  const [scannedTubesInput, setScannedTubesInput] = useState('');
  const [tempAtReceipt, setTempAtReceipt] = useState('4.8');
  const [sealIntact, setSealIntact] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handoverResult, setHandoverResult] = useState<{ success: boolean; message: string } | null>(null);

  // Available collected specimens needing transport
  const pendingSpecimens = specimens.filter(s => s.status === 'COLLECTED');

  const handleCreateNewManifest = async () => {
    if (pendingSpecimens.length === 0) {
      alert('No specimens are currently in COLLECTED status awaiting manifest creation.');
      return;
    }

    try {
      const res = await fetch('/api/v1/collect/manifests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originType: 'COLLECTOR_BAG',
          destinationLab: 'KENGERI_REFERENCE_LAB',
          riderUserId: 'RIDER-402',
          riderName,
          insulatedBoxId: boxId,
          specimenIds: pendingSpecimens.map(s => s.specimenId),
          temperatureAtDispatchCelsius: parseFloat(tempDispatch) || 4.0
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create manifest');

      setIsCreatingManifest(false);
      onManifestUpdated();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRecordHandover = async () => {
    if (!selectedManifest) return;
    setIsSubmitting(true);
    setHandoverResult(null);

    const scannedIds = scannedTubesInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const finalScanned = scannedIds.length > 0 ? scannedIds : selectedManifest.specimenIds;

    try {
      const res = await fetch(`/api/v1/collect/manifests/${selectedManifest.manifestId}/handover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scannedSpecimenIds: finalScanned,
          temperatureAtReceiptCelsius: parseFloat(tempAtReceipt) || 4.5,
          receiverStaffId: 'LAB-RECEIVER-KENGERI',
          sealIntact
        })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to record manifest receipt');

      setHandoverResult({
        success: true,
        message: 'Chain-of-custody transfer signed off. All specimens verified at laboratory receiving desk.'
      });
      onManifestUpdated();
    } catch (err: any) {
      setHandoverResult({ success: false, message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#082142] tracking-tight flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#D69A18]" />
            <span>Stage 05 — Sample Logistics & Chain of Custody</span>
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Digital transport manifests • Calibrated cold chain (2°C–8°C) • Physical scan reconciliation • Sealed box tracking
          </p>
        </div>

        <button
          onClick={() => setIsCreatingManifest(true)}
          className="px-3.5 py-1.5 rounded-lg bg-[#082142] text-white text-xs font-bold hover:bg-[#0c3162] flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#D69A18]" />
          <span>New Transport Manifest ({pendingSpecimens.length} tubes)</span>
        </button>
      </div>

      {/* Manifest Selector & Details Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Manifest Inventory */}
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider">
            Active Manifest Batches ({manifests.length})
          </h2>

          <div className="space-y-2">
            {manifests.map(m => {
              const isSelected = selectedManifest?.manifestId === m.manifestId;
              const hasExcursion = m.temperatureExcursionDetected;

              return (
                <div
                  key={m.manifestId}
                  onClick={() => setSelectedManifest(m)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                    isSelected
                      ? 'border-[#082142] bg-[#082142]/5 ring-1 ring-[#082142]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#082142]">{m.manifestId}</span>
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                        hasExcursion
                          ? 'bg-red-100 text-red-800'
                          : m.receivedAt
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {hasExcursion ? 'TEMP EXCURSION' : m.receivedAt ? 'RECEIVED AT LAB' : 'IN TRANSIT'}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-600 mt-1">
                    Rider: {m.riderName} • Box: {m.insulatedBoxId}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-500 mt-1 border-t border-gray-100 pt-1">
                    <span>Specimens: {m.specimenIds.length} tubes</span>
                    <span>Temp: {m.temperatureAtDispatchCelsius}°C</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Handover Reconciliation Workspace */}
        <div className="lg:col-span-2 space-y-4">
          {selectedManifest ? (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-sm text-[#082142]">
                    Manifest Handover & Reconciliation • {selectedManifest.manifestId}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Destination: {selectedManifest.destinationLab} • Insulated Box: {selectedManifest.insulatedBoxId}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 px-3 py-1 rounded-lg text-xs font-semibold">
                  <Thermometer className="w-4 h-4 text-blue-600" />
                  <span>Dispatch Temp: {selectedManifest.temperatureAtDispatchCelsius}°C</span>
                </div>
              </div>

              {/* Expected Specimen Tubes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#082142]">
                  Manifested Physical Specimens ({selectedManifest.specimenIds.length})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedManifest.specimenIds.map(sId => (
                    <div
                      key={sId}
                      className="p-2.5 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Barcode className="w-4 h-4 text-gray-500" />
                        <span className="font-mono font-bold text-gray-800">{sId}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Sealed
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Laboratory Scanned Handover Protocol */}
              <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-200 space-y-3">
                <h4 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider">
                  Custody Transfer Verification
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      Thermometer Reading at Receipt (°C) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={tempAtReceipt}
                      onChange={e => setTempAtReceipt(e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-white"
                    />
                    <span className="text-[10px] text-gray-500 mt-0.5 block">
                      Standard Cold Chain: 2.0°C to 8.0°C
                    </span>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Security Seal Integrity</label>
                    <label className="flex items-center gap-2 mt-2 cursor-pointer font-semibold text-gray-700">
                      <input
                        type="checkbox"
                        checked={sealIntact}
                        onChange={e => setSealIntact(e.target.checked)}
                        className="rounded text-[#082142]"
                      />
                      <span>Insulated box tamper seal is intact and undamaged</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1 text-xs">
                    Barcode Scan Verification (Leave blank to verify all manifested tubes)
                  </label>
                  <textarea
                    rows={2}
                    value={scannedTubesInput}
                    onChange={e => setScannedTubesInput(e.target.value)}
                    placeholder="Scan barcodes with handheld laser scanner (one barcode per line)..."
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-mono bg-white"
                  />
                </div>

                {handoverResult && (
                  <div
                    className={`p-3 rounded-lg text-xs font-medium ${
                      handoverResult.success
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-red-100 text-red-900 border border-red-300'
                    }`}
                  >
                    {handoverResult.message}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleRecordHandover}
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#082142] text-white text-xs font-black shadow-md hover:bg-[#0c3162] transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D69A18]" />
                    <span>{isSubmitting ? 'Verifying Manifest Handover…' : 'Acknowledge Custody & Transfer to Lab'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">
              Select a manifest to review custody details.
            </div>
          )}
        </div>
      </div>

      {/* New Manifest Modal */}
      {isCreatingManifest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-sm font-extrabold text-[#082142]">Generate Digital Transport Manifest</h3>
              <button
                onClick={() => setIsCreatingManifest(false)}
                className="text-gray-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Transit Rider / Courier Name</label>
                <input
                  type="text"
                  value={riderName}
                  onChange={e => setRiderName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Insulated Cold Box ID</label>
                <input
                  type="text"
                  value={boxId}
                  onChange={e => setBoxId(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">
                  Calibrated Temperature at Bag Dispatch (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={tempDispatch}
                  onChange={e => setTempDispatch(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                <span className="font-bold text-[#082142]">Eligible Collected Specimens:</span>
                <span className="ml-1 text-gray-600">{pendingSpecimens.length} tubes will be attached.</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setIsCreatingManifest(false)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewManifest}
                className="px-4 py-1.5 rounded-lg bg-[#082142] text-white text-xs font-bold hover:bg-[#0c3162]"
              >
                Create & Dispatch Manifest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

