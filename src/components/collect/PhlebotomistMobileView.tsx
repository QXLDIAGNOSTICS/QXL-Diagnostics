'use client';

import React, { useState } from 'react';
import {
  Activity,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  Barcode,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Phone,
  Flame,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BookingRecord, FieldJob } from '@/lib/collect/types';
import { CONTAINER_SOP_MAP } from '@/lib/collect/catalogueData';

interface PhlebotomistMobileViewProps {
  bookings: BookingRecord[];
  jobs: FieldJob[];
  onSpecimenCollected: () => void;
}

export const PhlebotomistMobileView: React.FC<PhlebotomistMobileViewProps> = ({
  bookings,
  jobs,
  onSpecimenCollected
}) => {
  // Find a job assigned or ready for field collection
  const targetBooking =
    bookings.find(b => ['ALLOCATED', 'EN_ROUTE', 'IN_PROGRESS'].includes(b.bookingStatus)) || bookings[0];

  const currentJob = jobs.find(j => j.bookingId === targetBooking?.bookingId);

  // Field workflow steps
  const [bedsideStep, setBedsideStep] = useState<1 | 2 | 3 | 4>(
    targetBooking?.bookingStatus === 'IN_PROGRESS' ? 2 : 1
  );

  // Identity verification state
  const [statedName, setStatedName] = useState('');
  const [statedDob, setStatedDob] = useState('');
  const [idVerified, setIdVerified] = useState(false);
  const [idMismatchError, setIdMismatchError] = useState<string | null>(null);

  // Draw difficulty & complication
  const [drawDifficulty, setDrawDifficulty] = useState<
    'NORMAL' | 'FRAGILE_VEIN' | 'PEDIATRIC_RESTRAINT' | 'SECOND_ATTEMPT'
  >('NORMAL');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collectionSuccess, setCollectionSuccess] = useState(false);

  if (!targetBooking) {
    return (
      <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">
        <Activity className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm font-semibold">No active field jobs currently assigned.</p>
      </div>
    );
  }

  const patient = targetBooking.patients[0]?.patient;
  const orderItems = targetBooking.patients[0]?.orderItems || [];

  // Derive required containers from tests
  const requiredContainers = Array.from(
    new Set(orderItems.flatMap(i => i.requiredContainers || ['SST_GOLD_YELLOW']))
  );

  // Step 1: Mark Arrived
  const handleArriveAtLocation = async () => {
    try {
      if (currentJob) {
        await fetch(`/api/v1/collect/jobs/${currentJob.jobId}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventType: 'ARRIVED' })
        });
      }
      setBedsideStep(2);
    } catch {
      setBedsideStep(2);
    }
  };

  // Step 2: Two-Identifier Verification
  const handleVerifyIdentity = () => {
    setIdMismatchError(null);
    if (!patient) return;

    const nameMatch = statedName.trim().toLowerCase() === patient.fullName.trim().toLowerCase();
    const dobMatch =
      statedDob.trim() === patient.dateOfBirth.trim() ||
      statedDob.trim().toLowerCase() === patient.patientId.toLowerCase();

    if (!nameMatch || !dobMatch) {
      setIdMismatchError(
        'BLOCKING SAFETY ALERT: Patient stated name or date of birth does not match electronic booking order. Venipuncture is strictly prohibited under pre-analytical safety protocols. Contact supervisor immediately.'
      );
      setIdVerified(false);
      return;
    }

    setIdVerified(true);
    setBedsideStep(3);
  };

  // Step 4: Submit Bedside Specimen Collection
  const handleSubmitCollection = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        bookingId: targetBooking.bookingId,
        patientId: patient.patientId,
        collectorId: 'QXL-COL-101',
        drawDifficulty,
        complicationsNotes: notes,
        containers: requiredContainers.map(c => {
          const sop = CONTAINER_SOP_MAP[c];
          return {
            containerType: c,
            tubeColor: sop.tubeName.split(' ')[1] || 'Gold',
            associatedTestIds: orderItems.map(i => i.testId),
            volumeMl: sop.nominalVolumeMl
          };
        })
      };

      const res = await fetch(`/api/v1/collect/jobs/${currentJob?.jobId || 'demo'}/collect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to record specimen collection');
      }

      setCollectionSuccess(true);
      onSpecimenCollected();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Mobile Device Frame Header */}
      <div className="bg-[#082142] text-white p-4 rounded-2xl shadow-lg border-2 border-[#D69A18]/40 space-y-2">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5 font-bold">
            <Activity className="w-4 h-4 text-[#D69A18]" />
            <span>QXL Collector Mobile • Ramesh Gowda</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
            ONLINE • GPS LOCK
          </span>
        </div>

        <div className="text-xs space-y-0.5">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-sm">{patient?.fullName}</span>
            <span className="font-mono text-[10px] text-gray-300">{targetBooking.bookingId}</span>
          </div>
          <p className="text-gray-300 text-[11px] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#D69A18]" />
            <span>
              {targetBooking.address.houseFlat}, {targetBooking.address.locality}
            </span>
          </p>
          <p className="text-gray-300 text-[11px] flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D69A18]" />
            <span>Slot: {targetBooking.slot.slotStartTime}–{targetBooking.slot.slotEndTime}</span>
          </p>
        </div>
      </div>

      {/* Bedside Step Stepper */}
      <div className="grid grid-cols-4 gap-1.5 bg-gray-100 p-1.5 rounded-xl text-center text-[10px] font-bold">
        <span className={`py-1 rounded ${bedsideStep === 1 ? 'bg-[#082142] text-white' : 'text-gray-600'}`}>
          1. Arrived
        </span>
        <span className={`py-1 rounded ${bedsideStep === 2 ? 'bg-[#082142] text-white' : 'text-gray-600'}`}>
          2. 2-ID Check
        </span>
        <span className={`py-1 rounded ${bedsideStep === 3 ? 'bg-[#082142] text-white' : 'text-gray-600'}`}>
          3. Tube SOP
        </span>
        <span className={`py-1 rounded ${bedsideStep === 4 ? 'bg-[#082142] text-white' : 'text-gray-600'}`}>
          4. Barcode
        </span>
      </div>

      {/* STEP 1: ARRIVE AT LOCATION */}
      {bedsideStep === 1 && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-extrabold text-sm text-[#082142]">At Patient Residence</h3>
            <p className="text-xs text-gray-500">
              Verify address notes: {targetBooking.address.specialAccessInstructions || 'Ring bell directly'}
            </p>
          </div>

          <a
            href={`tel:${patient?.mobileNumber}`}
            className="inline-flex items-center gap-1.5 text-xs text-[#082142] font-bold py-1.5 px-3 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Phone className="w-3.5 h-3.5 text-[#D69A18]" />
            <span>Call Patient (+91 {patient?.mobileNumber})</span>
          </a>

          <button
            onClick={handleArriveAtLocation}
            className="w-full py-3 rounded-xl bg-[#082142] text-white text-xs font-black shadow-md hover:bg-[#0c3162] transition flex items-center justify-center gap-2"
          >
            <span>Confirm Arrival at Bedside</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: TWO-IDENTIFIER SAFETY CHECK */}
      {bedsideStep === 2 && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#082142] font-black text-xs uppercase tracking-wide">
            <UserCheck className="w-4 h-4 text-[#D69A18]" />
            <span>Mandatory Two-Identifier Patient Check</span>
          </div>
          <p className="text-xs text-gray-600">
            Ask patient to verbally state their full name and Date of Birth (or show ID).
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-gray-700 block mb-1">1. Patient Stated Full Name</label>
              <input
                type="text"
                value={statedName}
                onChange={e => setStatedName(e.target.value)}
                placeholder="e.g. Ananthnarayan Rao"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <span className="text-[10px] text-gray-400 block mt-0.5">
                Expected: {patient?.fullName} (One-click quickfill: click to test)
              </span>
              <button
                type="button"
                onClick={() => setStatedName(patient?.fullName || '')}
                className="text-[10px] text-blue-600 underline font-semibold mt-0.5"
              >
                Autofill verified name
              </button>
            </div>

            <div>
              <label className="font-semibold text-gray-700 block mb-1">
                2. Second Identifier (DOB YYYY-MM-DD or Patient ID)
              </label>
              <input
                type="text"
                value={statedDob}
                onChange={e => setStatedDob(e.target.value)}
                placeholder="e.g. 1974-08-14"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setStatedDob(patient?.dateOfBirth || '')}
                className="text-[10px] text-blue-600 underline font-semibold mt-0.5 block"
              >
                Autofill verified DOB ({patient?.dateOfBirth})
              </button>
            </div>
          </div>

          {idMismatchError && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-red-700">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>SAFETY PROTOCOL VIOLATION</span>
              </div>
              <p className="text-[11px] leading-relaxed">{idMismatchError}</p>
            </div>
          )}

          <button
            onClick={handleVerifyIdentity}
            className="w-full py-2.5 rounded-xl bg-[#082142] text-white text-xs font-black shadow-md hover:bg-[#0c3162] transition"
          >
            Verify Patient Identity & Proceed
          </button>
        </div>
      )}

      {/* STEP 3: PRE-ANALYTICAL TUBE SOP CHECKLIST */}
      {bedsideStep === 3 && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-[#082142] uppercase tracking-wide">
              Pre-Analytical Container Checklist
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Identity Verified ✓
            </span>
          </div>

          <div className="space-y-2.5">
            {requiredContainers.map(c => {
              const sop = CONTAINER_SOP_MAP[c];
              return (
                <div key={c} className="p-3 rounded-xl border border-gray-200 bg-gray-50/70 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#082142]">
                    <span>{sop.tubeName}</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200">
                      Vol: {sop.nominalVolumeMl} mL
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    Inversions: {sop.inversionCount} gentle mixes • Temp: {sop.transportTemp}
                  </p>
                  <p className="text-[10px] text-amber-900 bg-amber-50 p-1 rounded">
                    SOP: {sop.specialHandlingNotes}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setBedsideStep(4)}
            className="w-full py-2.5 rounded-xl bg-[#082142] text-white text-xs font-black shadow-md hover:bg-[#0c3162] transition flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Bedside Barcode Binding</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 4: BEDSIDE BARCODE BINDING & SIGN-OFF */}
      {bedsideStep === 4 && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <span className="text-xs font-black text-[#082142] uppercase tracking-wide">
              Barcode Labeling & Draw Sign-off
            </span>
            <Barcode className="w-4 h-4 text-[#D69A18]" />
          </div>

          <div className="space-y-2 text-xs">
            <label className="font-semibold text-gray-700 block">Venipuncture Difficulty</label>
            <select
              value={drawDifficulty}
              onChange={e => setDrawDifficulty(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="NORMAL">Normal Draw (First Attempt)</option>
              <option value="FRAGILE_VEIN">Fragile / Rolling Vein</option>
              <option value="SECOND_ATTEMPT">Second Attempt (Alternate Site)</option>
              <option value="PEDIATRIC_RESTRAINT">Pediatric Comfort Hold</option>
            </select>
          </div>

          <div className="text-xs">
            <label className="font-semibold text-gray-700 block mb-1">Collector Clinical Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Left antecubital fossa, good volume"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs"
            />
          </div>

          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sharps Safety & Barcode Verification</span>
            </div>
            <p className="text-[11px]">
              Sharps incinerated in portable sharps container. Vacuum tubes verified with printed unique barcodes
              before leaving residence.
            </p>
          </div>

          {collectionSuccess ? (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold text-center">
              ✓ Specimen Collection Successfully Sealed & Ready for Custody Handover
            </div>
          ) : (
            <button
              onClick={handleSubmitCollection}
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D69A18] to-[#b37e0e] text-[#082142] text-xs font-black shadow-md hover:brightness-105 transition flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Generating Barcodes & Binding…' : 'Sign Off & Seal Specimen Tubes'}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

