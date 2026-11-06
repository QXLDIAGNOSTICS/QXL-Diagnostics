'use client';

import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { MASTER_CATALOGUE, MasterCatalogEntry } from '@/lib/masterCatalogue';
import { SERVICE_ZONES, APPOINTMENT_TIME_SLOTS } from '@/lib/collect/catalogueData';
import { BookingRecord } from '@/lib/collect/types';

interface PatientBookingViewProps {
  onBookingConfirmed: (booking: BookingRecord) => void;
  activeBookings: BookingRecord[];
}

export const PatientBookingView: React.FC<PatientBookingViewProps> = ({
  onBookingConfirmed,
  activeBookings
}) => {
  const [activeTab, setActiveTab] = useState<'NEW_BOOKING' | 'TRACK_VISIT'>('NEW_BOOKING');

  // Booking Flow State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cartItems, setCartItems] = useState<MasterCatalogEntry[]>([]);

  // Step 2: Slot & Location
  const [pincode, setPincode] = useState('560098'); // RR Nagar default
  const [serviceCheck, setServiceCheck] = useState<{
    serviceable: boolean;
    zoneName?: string;
    hub?: string;
  }>({
    serviceable: true,
    zoneName: 'South-West Bengaluru (Kengeri, RR Nagar, Vijayanagar)',
    hub: 'Kengeri Central Reference Laboratory'
  });
  const [selectedDate, setSelectedDate] = useState('2026-11-06');
  const [selectedSlot, setSelectedSlot] = useState(APPOINTMENT_TIME_SLOTS[0]);

  // Step 3: Patient & Address
  const [patientName, setPatientName] = useState('Ananya Sharma');
  const [dob, setDob] = useState('1994-06-15');
  const [gender, setGender] = useState<'FEMALE' | 'MALE' | 'OTHER'>('FEMALE');
  const [mobileNumber, setMobileNumber] = useState('9845012345');
  const [email, setEmail] = useState('ananya.s@example.com');
  const [houseFlat, setHouseFlat] = useState('Flat 304, Brigade Panorama');
  const [streetName, setStreetName] = useState('Mysore Road, Kengeri');
  const [locality, setLocality] = useState('Kengeri');
  const [landmark, setLandmark] = useState('Near RV College of Engineering');
  const [elevator, setElevator] = useState(true);
  const [accessNotes, setAccessNotes] = useState('Gate 2 visitor entry. Call if intercom fails.');
  const [consentClinical, setConsentClinical] = useState(true);
  const [consentPromo, setConsentPromo] = useState(false);

  // Step 4: Submission & Payment
  const [payAtCollection, setPayAtCollection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search Filter
  const categories = ['All', 'Core Blood', 'Diabetes', 'Thyroid', 'Vitamins', 'Lipid', 'Infectious', 'Package'];
  const filteredCatalogue = MASTER_CATALOGUE.filter(t => {
    const matchesCat =
      selectedCategory === 'All' ||
      t.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Package' && t.kind === 'package');
    const matchesQuery =
      searchQuery.trim() === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery && t.homeCollectionAvailable !== false;
  });

  // Cart Calculations
  const grossTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const collectionFee = grossTotal >= 1000 || grossTotal === 0 ? 0 : 150;
  const grandTotal = grossTotal + collectionFee;
  const hasFasting = cartItems.some(i => i.fasting);

  const addToCart = (item: MasterCatalogEntry) => {
    if (!cartItems.some(c => c.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(c => c.id !== id));
  };

  const handlePincodeChange = (pin: string) => {
    setPincode(pin);
    const clean = pin.replace(/\D/g, '');
    if (clean.length === 6 && clean.startsWith('560')) {
      const z = SERVICE_ZONES.find(zone => zone.coveredPincodes.includes(clean));
      if (z) {
        setServiceCheck({
          serviceable: true,
          zoneName: z.zoneName,
          hub: z.servicingHub === 'KENGERI_REFERENCE_LAB' ? 'Kengeri Central Reference Laboratory' : 'Yelahanka North Hub'
        });
      } else {
        setServiceCheck({
          serviceable: true,
          zoneName: 'Greater Bengaluru Coverage Zone',
          hub: 'Central Mobile Dispatch'
        });
      }
    } else if (clean.length === 6) {
      setServiceCheck({
        serviceable: false
      });
    }
  };

  const handleConfirmBooking = async () => {
    setErrorMsg(null);
    if (cartItems.length === 0) {
      setErrorMsg('Please select at least one test or package.');
      return;
    }
    if (!patientName.trim() || !dob || !mobileNumber.trim()) {
      setErrorMsg('Please complete patient full name, date of birth, and contact number.');
      return;
    }
    if (!consentClinical) {
      setErrorMsg('Please accept the pre-analytical testing and clinical consent notice.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        source: 'WEBSITE' as const,
        patients: [
          {
            fullName: patientName,
            dateOfBirth: dob,
            gender,
            mobileNumber,
            email,
            relationshipToBooker: 'SELF' as const,
            testIds: cartItems.map(c => c.id)
          }
        ],
        address: {
          houseFlat,
          streetName,
          locality,
          pincode,
          landmark,
          elevatorAvailable: elevator,
          specialAccessInstructions: accessNotes
        },
        slot: {
          slotDate: selectedDate,
          slotStartTime: selectedSlot.startTime,
          slotEndTime: selectedSlot.endTime,
          isFastingPriority: selectedSlot.isFastingPriority,
          zoneId: 'ZONE_SOUTH_WEST'
        },
        consent: {
          sensitiveClinicalConsentAccepted: consentClinical,
          promotionalConsentAccepted: consentPromo
        },
        payAtCollection
      };

      const res = await fetch('/api/v1/collect/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok || !data.booking) {
        throw new Error(data.error || 'Failed to confirm booking');
      }

      setConfirmedBooking(data.booking);
      onBookingConfirmed(data.booking);
      setActiveTab('TRACK_VISIT');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error creating booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#082142] tracking-tight">
            Stage 01 & 02 — Home Blood Collection Booking & Live Visit Tracker
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Verified NABL test catalogue • Real-time collector capacity • Atomic slot reservation • Razorpay & COD
          </p>
        </div>

        <div className="flex items-center p-1 bg-gray-100 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setActiveTab('NEW_BOOKING')}
            className={`px-3 py-1.5 rounded-md transition ${
              activeTab === 'NEW_BOOKING'
                ? 'bg-white text-[#082142] shadow-sm font-bold'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            New Booking
          </button>
          <button
            onClick={() => setActiveTab('TRACK_VISIT')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'TRACK_VISIT'
                ? 'bg-white text-[#082142] shadow-sm font-bold'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Track Active Visits
            <span className="w-4 h-4 rounded-full bg-[#D69A18] text-[#082142] text-[10px] flex items-center justify-center font-bold">
              {activeBookings.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'NEW_BOOKING' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Booking Wizard Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stepper Header */}
            <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-xs">
              {[
                { step: 1, label: '1. Select Tests' },
                { step: 2, label: '2. Slot & PIN' },
                { step: 3, label: '3. Patient & Address' },
                { step: 4, label: '4. Review & Pay' }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(s.step as any)}
                  className={`py-2 px-2 rounded-lg text-center font-semibold transition ${
                    currentStep === s.step
                      ? 'bg-[#082142] text-white shadow-sm'
                      : currentStep > s.step
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* STEP 1: TEST & PACKAGE CATALOGUE */}
            {currentStep === 1 && (
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search tests, symptoms, or packages..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#082142]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 text-xs rounded-full whitespace-nowrap transition ${
                          selectedCategory === cat
                            ? 'bg-[#082142] text-white font-semibold'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Catalogue Grid */}
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {filteredCatalogue.slice(0, 12).map(item => {
                    const isSelected = cartItems.some(c => c.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-[#D69A18] bg-amber-50/40 shadow-xs'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#082142]">{item.name}</span>
                            {item.fasting && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                                Fasting Required
                              </span>
                            )}
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                              TAT: {item.tat}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500">
                            Sample: {item.sampleType} • {item.paramText}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="font-extrabold text-sm text-[#082142]">₹{item.price}</span>
                            {item.mrp > item.price && (
                              <span className="block text-[10px] text-gray-400 line-through">₹{item.mrp}</span>
                            )}
                          </div>

                          <button
                            onClick={() => (isSelected ? removeFromCart(item.id) : addToCart(item))}
                            className={`p-2 rounded-lg transition font-semibold text-xs flex items-center gap-1 ${
                              isSelected
                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                : 'bg-[#082142] text-white hover:bg-[#0c3162]'
                            }`}
                          >
                            {isSelected ? <Trash2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{isSelected ? 'Remove' : 'Add'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    disabled={cartItems.length === 0}
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-lg bg-[#082142] text-white text-xs font-bold hover:bg-[#0c3162] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>Proceed to Slot & Location</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PINCODE, ZONE & TIME SLOTS */}
            {currentStep === 2 && (
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#082142] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#D69A18]" />
                    Bengaluru PIN Code Verification
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={e => handlePincodeChange(e.target.value)}
                      placeholder="Enter 6-digit PIN (e.g. 560098)"
                      className="w-48 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#082142]"
                    />
                    <div className="flex items-center gap-2 text-xs">
                      {serviceCheck.serviceable ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Covered: {serviceCheck.zoneName} ({serviceCheck.hub})
                          </span>
                        </span>
                      ) : (
                        <span className="text-red-700 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                          <span>Currently outside Bengaluru active mobile dispatch zone</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#082142] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D69A18]" />
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Time Slot Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#082142] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#D69A18]" />
                      Select Appointment Window
                    </span>
                    {hasFasting && (
                      <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ⚡ Fasting items in cart: 06:30–08:30 AM prioritized
                      </span>
                    )}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {APPOINTMENT_TIME_SLOTS.map((s, idx) => {
                      const isSelected = selectedSlot.startTime === s.startTime;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedSlot(s)}
                          className={`p-3 rounded-xl border text-left transition ${
                            isSelected
                              ? 'border-[#082142] bg-[#082142]/5 ring-1 ring-[#082142]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#082142]">{s.label}</span>
                            {s.isFastingPriority && (
                              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                                Fasting
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 mt-0.5 block">
                            Capacity: 3 phlebotomist slots available
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50"
                  >
                    Back to Tests
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!serviceCheck.serviceable}
                    className="px-5 py-2.5 rounded-lg bg-[#082142] text-white text-xs font-bold hover:bg-[#0c3162] disabled:opacity-40"
                  >
                    Proceed to Patient Details
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PATIENT & ADDRESS DETAILS */}
            {currentStep === 3 && (
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider">
                  Patient & Clinical Verification Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="As per Government ID"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={e => setDob(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Gender *</label>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option value="FEMALE">Female</option>
                      <option value="MALE">Male</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Mobile Contact *</label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <h3 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider mb-2">
                    Collection Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">House / Flat / Villa No. *</label>
                      <input
                        type="text"
                        value={houseFlat}
                        onChange={e => setHouseFlat(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Building & Street Name *</label>
                      <input
                        type="text"
                        value={streetName}
                        onChange={e => setStreetName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Locality *</label>
                      <input
                        type="text"
                        value={locality}
                        onChange={e => setLocality(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Landmark (Optional)</label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={e => setLandmark(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={elevator}
                        onChange={e => setElevator(e.target.checked)}
                        className="rounded text-[#082142]"
                      />
                      <span>Elevator available in building</span>
                    </label>
                  </div>

                  <div className="mt-2">
                    <label className="font-semibold text-gray-700 block mb-1 text-xs">
                      Phlebotomist Access & Parking Notes
                    </label>
                    <input
                      type="text"
                      value={accessNotes}
                      onChange={e => setAccessNotes(e.target.value)}
                      placeholder="e.g. Ring bell 304, park near clubhouse"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Consent & Privacy Notice (DPDP 2026 Compliant) */}
                <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#082142] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#D69A18]" />
                    <span>Clinical Data Consent & DPDP Privacy Notice (v2026.1)</span>
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer text-gray-700 text-[11px]">
                    <input
                      type="checkbox"
                      checked={consentClinical}
                      onChange={e => setConsentClinical(e.target.checked)}
                      className="mt-0.5 rounded text-[#082142]"
                    />
                    <span>
                      I consent to the collection of clinical specimens at my residence, two-identifier identity
                      verification, and authorized laboratory processing under NABL accredited protocols (MC-6849).
                    </span>
                  </label>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50"
                  >
                    Back to Slot
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-5 py-2.5 rounded-lg bg-[#082142] text-white text-xs font-bold hover:bg-[#0c3162]"
                  >
                    Review Order & Pay
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW, PAYMENT & CONFIRMATION */}
            {currentStep === 4 && (
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider">
                  Review & Confirm Booking
                </h3>

                <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Patient:</span>
                    <span className="font-bold text-[#082142]">
                      {patientName} ({gender}, DOB: {dob})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-medium text-gray-800">+91 {mobileNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Appointment:</span>
                    <span className="font-medium text-gray-800">
                      {selectedDate} • {selectedSlot.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address:</span>
                    <span className="font-medium text-gray-800 text-right max-w-xs">
                      {houseFlat}, {streetName}, {locality} – {pincode}
                    </span>
                  </div>
                </div>

                {/* Payment Option */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#082142]">Choose Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPayAtCollection(false)}
                      className={`p-3 rounded-xl border text-left transition ${
                        !payAtCollection
                          ? 'border-[#082142] bg-[#082142]/5 ring-1 ring-[#082142]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#082142]">Instant Razorpay (UPI/Cards)</div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Instant confirmation with digital receipt</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPayAtCollection(true)}
                      className={`p-3 rounded-xl border text-left transition ${
                        payAtCollection
                          ? 'border-[#082142] bg-[#082142]/5 ring-1 ring-[#082142]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#082142]">Pay at Collection (Cash/UPI)</div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Settled with phlebotomist at bedside</p>
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-semibold hover:bg-gray-50"
                  >
                    Back to Address
                  </button>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D69A18] to-[#b37e0e] text-[#082142] text-xs font-black shadow-md hover:brightness-105 transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Slot & Creating Order…</span>
                    ) : (
                      <>
                        <span>Confirm Booking (₹{grandTotal})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Cart Column */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 font-black text-sm text-[#082142]">
                  <ShoppingCart className="w-4 h-4 text-[#D69A18]" />
                  <span>Selected Tests ({cartItems.length})</span>
                </div>
                {cartItems.length > 0 && (
                  <button
                    onClick={() => setCartItems([])}
                    className="text-[11px] text-red-600 hover:underline font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-400 space-y-2">
                  <ShoppingCart className="w-8 h-8 mx-auto opacity-30" />
                  <p className="text-xs font-medium">Your cart is empty.</p>
                  <p className="text-[11px]">Select tests from the catalogue to reserve a home draw slot.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-start text-xs border-b border-gray-50 pb-2">
                      <div className="max-w-[170px]">
                        <span className="font-semibold text-gray-800 line-clamp-1">{item.name}</span>
                        <span className="text-[10px] text-gray-500">
                          {item.fasting ? 'Fasting Required' : 'No Fasting'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#082142]">₹{item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Gross Test Value:</span>
                  <span>₹{grossTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Home Collection Fee:</span>
                  <span>
                    {collectionFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE (Orders ≥ ₹1000)</span>
                    ) : (
                      '₹150'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#082142] border-t border-gray-200 pt-2">
                  <span>Net Payable:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Trust & Accreditation Badge */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-[11px] text-gray-600 space-y-1">
                <div className="font-bold text-[#082142] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NABL Accredited (MC-6849)</span>
                </div>
                <p>All vacutainers barcode-scanned at bedside. Temperature-controlled cold chain logistics.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TRACK VISITS & BOOKING STATUS VIEW */
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#082142] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D69A18]" />
              <span>Active Home Collection Orders ({activeBookings.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBookings.map(b => {
                const patient = b.patients[0]?.patient;
                const statusColors: Record<string, string> = {
                  CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
                  ALLOCATED: 'bg-purple-100 text-purple-800 border-purple-200',
                  EN_ROUTE: 'bg-amber-100 text-amber-800 border-amber-200',
                  COLLECTED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                  IN_TRANSIT: 'bg-sky-100 text-sky-800 border-sky-200',
                  ACCESSIONED: 'bg-teal-100 text-teal-800 border-teal-200',
                  AUTHORIZED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                  DELIVERED: 'bg-green-100 text-green-800 border-green-200',
                  FAILED_RECOLLECT: 'bg-red-100 text-red-800 border-red-200'
                };

                return (
                  <div
                    key={b.bookingId}
                    className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition bg-white space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-mono font-bold text-xs text-[#082142]">{b.bookingId}</span>
                        <span className="block text-[10px] text-gray-400">Order Ref: {b.orderId}</span>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                          statusColors[b.bookingStatus] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="font-bold text-gray-800">
                        {patient?.fullName} ({patient?.gender}, {patient?.ageYears} yrs)
                      </p>
                      <p className="text-gray-500">
                        {b.address.locality} • Slot: {b.slot.slotStartTime}–{b.slot.slotEndTime} ({b.slot.slotDate})
                      </p>
                      <p className="text-gray-600 font-medium">
                        Tests: {b.patients[0]?.orderItems.map(i => i.testName).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
                      <div className="text-gray-600">
                        Amount:{' '}
                        <span className="font-extrabold text-[#082142]">₹{b.netPayable}</span>{' '}
                        <span className="text-[10px] text-emerald-600">({b.paymentStatus})</span>
                      </div>

                      <a
                        href="tel:+919964639639"
                        className="flex items-center gap-1 text-[11px] font-bold text-[#082142] hover:text-[#D69A18]"
                      >
                        <PhoneCall className="w-3 h-3 text-[#D69A18]" />
                        <span>Support</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

