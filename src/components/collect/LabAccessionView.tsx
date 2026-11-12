'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  Barcode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  RefreshCw,
  Send,
  SlidersHorizontal
} from 'lucide-react';
import { BedsideSpecimen, LabAccessionEntry, RejectionReasonCode, SpecimenDecision } from '@/lib/collect/types';

interface LabAccessionViewProps {
  specimens: BedsideSpecimen[];
  accessions: LabAccessionEntry[];
  onAccessionProcessed: () => void;
}

export const LabAccessionView: React.FC<LabAccessionViewProps> = ({
  specimens,
  accessions,
  onAccessionProcessed
}) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<BedsideSpecimen | null>(
    specimens.find(s => s.status === 'LAB_RECEIVED' || s.status === 'IN_TRANSIT') || specimens[0] || null
  );

  // Pre-analytical inspection controls
  const [hemolysisGrade, setHemolysisGrade] = useState<'0' | '1' | '2' | '3' | '4'>('0');
  const [hasClot, setHasClot] = useState(false);
  const [volumeAdequate, setVolumeAdequate] = useState(true);
  const [decision, setDecision] = useState<SpecimenDecision>('ACCEPTED');
  const [rejectionReason, setRejectionReason] = useState<RejectionReasonCode>('HEMOLYSIS_SEVERE');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; error: boolean } | null>(null);

  const rejectionOptions: Array<{ code: RejectionReasonCode; label: string }> = [
    { code: 'HEMOLYSIS_SEVERE', label: 'Severe Hemolysis (Grade 3+/4+ Interfering)' },
    { code: 'CLOTTED_SPECIMEN', label: 'Fibrin Clot in EDTA / Anticoagulated Tube' },
    { code: 'INSUFFICIENT_VOLUME', label: 'Quantity Not Sufficient (QNS) for Assay' },
    { code: 'INCORRECT_CONTAINER', label: 'Wrong Specimen Container / Additive' },
    { code: 'SPECIMEN_LEAKAGE', label: 'Specimen Leakage in Transit' },
    { code: 'UNREADABLE_BARCODE', label: 'Damaged / Unreadable Bedside Barcode' },
    { code: 'TEMPERATURE_EXCURSION', label: 'Cold-Chain Temperature Excursion (>8°C)' }
  ];

  const handleProcessDecision = async () => {
    if (!selectedSpecimen) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/v1/collect/lab/specimens/${selectedSpecimen.specimenId}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decision,
          rejectionReason: decision === 'REJECTED' ? rejectionReason : undefined,
          rejectionNotes: comments.trim() || undefined,
          staffId: 'LAB-TECH-KENGERI-01'
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit accession decision');
      }

      setFeedback({
        text: `Specimen ${selectedSpecimen.specimenId} disposition recorded as ${decision}.${
          data.accession?.itdoseAccessionNumber
            ? ` Synced to ITDOSE Accession: ${data.accession.itdoseAccessionNumber}`
            : ''
        }`,
        error: false
      });
      onAccessionProcessed();
    } catch (err: any) {
      setFeedback({ text: err.message, error: true });
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
            <FlaskConical className="w-5 h-5 text-[#D69A18]" />
            <span>Stage 06 — Laboratory Accession & ITDOSE Bridge Desk</span>
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Physical specimen integrity inspection • ISO 15189 pre-analytical quality gates • ITDOSE LIMS mapping & auto-recollection
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kengeri Central Reference Laboratory</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Specimen Queue & Inspection Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Specimen Receiving Queue */}
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider">
            Specimens at Accessioning ({specimens.length})
          </h2>

          <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
            {specimens.map(s => {
              const isSelected = selectedSpecimen?.specimenId === s.specimenId;
              const accession = accessions.find(a => a.specimenId === s.specimenId);

              return (
                <div
                  key={s.specimenId}
                  onClick={() => setSelectedSpecimen(s)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                    isSelected
                      ? 'border-[#082142] bg-[#082142]/5 ring-1 ring-[#082142]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#082142]">{s.specimenId}</span>
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                        s.status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : s.status === 'ACCESSIONED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-gray-800 mt-1">{s.patientName}</p>
                  <p className="text-[10px] text-gray-500">
                    Tube: {s.containerType} ({s.tubeColor}) • Vol: {s.volumeCollectedMl || 3} mL
                  </p>

                  {accession?.itdoseAccessionNumber && (
                    <div className="text-[10px] text-blue-700 font-mono font-bold mt-1 bg-blue-50 px-1.5 py-0.5 rounded">
                      ITDOSE: {accession.itdoseAccessionNumber}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Physical Integrity Inspection Form */}
        <div className="lg:col-span-2 space-y-4">
          {selectedSpecimen ? (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-[#082142]">
                      Physical Inspection Desk • {selectedSpecimen.specimenId}
                    </h3>
                    <span className="text-[10px] font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                      Booking: {selectedSpecimen.bookingId}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Patient: {selectedSpecimen.patientName} ({selectedSpecimen.patientId}) • Bedside Two-Identifier
                    Verified ✓
                  </p>
                </div>
              </div>

              {/* Pre-Analytical Checklist */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <h4 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#D69A18]" />
                  <span>Physical Specimen Integrity Matrix</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Hemolysis Grade</label>
                    <select
                      value={hemolysisGrade}
                      onChange={e => {
                        setHemolysisGrade(e.target.value as any);
                        if (parseInt(e.target.value) >= 3) {
                          setDecision('REJECTED');
                          setRejectionReason('HEMOLYSIS_SEVERE');
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="0">Grade 0: None / Clear</option>
                      <option value="1">Grade 1: Slight (Pink)</option>
                      <option value="2">Grade 2: Moderate</option>
                      <option value="3">Grade 3: Marked (Red)</option>
                      <option value="4">Grade 4: Severe (Dark Red)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Fibrin Clots in EDTA</label>
                    <select
                      value={hasClot ? 'YES' : 'NO'}
                      onChange={e => {
                        const val = e.target.value === 'YES';
                        setHasClot(val);
                        if (val) {
                          setDecision('REJECTED');
                          setRejectionReason('CLOTTED_SPECIMEN');
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="NO">No Clots (Adequate Mixing)</option>
                      <option value="YES">Micro-clot / Macro-clot Present</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Volume Sufficiency</label>
                    <select
                      value={volumeAdequate ? 'ADEQUATE' : 'QNS'}
                      onChange={e => {
                        const val = e.target.value === 'ADEQUATE';
                        setVolumeAdequate(val);
                        if (!val) {
                          setDecision('REJECTED');
                          setRejectionReason('INSUFFICIENT_VOLUME');
                        }
                      }}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="ADEQUATE">Adequate Fill Volume</option>
                      <option value="QNS">Underfilled / QNS</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Disposition Decision Tree */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#082142] block">
                  Accessioning Disposition Decision
                </label>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setDecision('ACCEPTED')}
                    className={`p-3 rounded-xl border text-center transition ${
                      decision === 'ACCEPTED'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500 font-bold'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                    <span className="text-xs block">ACCEPTED</span>
                    <span className="text-[10px] text-gray-500">Route to Analyzers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecision('REJECTED')}
                    className={`p-3 rounded-xl border text-center transition ${
                      decision === 'REJECTED'
                        ? 'border-red-600 bg-red-50 text-red-900 ring-2 ring-red-500 font-bold'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <XCircle className="w-4 h-4 mx-auto text-red-600 mb-1" />
                    <span className="text-xs block">REJECTED</span>
                    <span className="text-[10px] text-gray-500">Auto Recollect Order</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecision('ON_HOLD')}
                    className={`p-3 rounded-xl border text-center transition ${
                      decision === 'ON_HOLD'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500 font-bold'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                    <span className="text-xs block">ON HOLD</span>
                    <span className="text-[10px] text-gray-500">Supervisor Review</span>
                  </button>
                </div>

                {decision === 'REJECTED' && (
                  <div className="bg-red-50 p-3.5 rounded-xl border border-red-200 text-xs space-y-2">
                    <label className="font-bold text-red-800 block">Standardized Rejection Reason Code *</label>
                    <select
                      value={rejectionReason}
                      onChange={e => setRejectionReason(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 border border-red-300 rounded-lg bg-white text-xs"
                    >
                      {rejectionOptions.map(r => (
                        <option key={r.code} value={r.code}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-red-700">
                      * Pre-analytical safety policy: Rejection automatically triggers an operational recollection
                      order at no expense to the patient.
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Technician Observation & Notes
                  </label>
                  <input
                    type="text"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    placeholder="e.g. Verified tube volume and vacuum integrity. Centrifuged at 3000 RPM."
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium ${
                    feedback.error
                      ? 'bg-red-100 text-red-900 border border-red-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={handleProcessDecision}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#082142] text-white text-xs font-black shadow-md hover:bg-[#0c3162] transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#D69A18]" />
                  <span>{isSubmitting ? 'Recording Accession in ITDOSE…' : 'Submit Accession Disposition'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">
              Select a specimen to perform pre-analytical accessioning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

