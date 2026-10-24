"use client";

import React, { useState } from "react";
import { Building2, CheckCircle2, ShieldCheck, Send, Clock, Phone, Mail, User, AlertCircle } from "lucide-react";

export default function HospitalQualificationForm() {
  const [form, setForm] = useState({
    hospitalName: "",
    contactPerson: "",
    designation: "Medical Director",
    city: "Bengaluru",
    bedCount: "50-150 beds",
    partnershipModel: "Full Hospital Laboratory Management",
    workloadBand: "500-1500 samples/month",
    businessEmail: "",
    phone: "",
    preferredTime: "Morning (9 AM - 12 PM)",
    notes: "",
    consent: true,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [referenceId, setReferenceId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.hospitalName || !form.contactPerson || !form.phone || !form.businessEmail) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Generate unique B2B LeadSquared tracking reference
    const ref = `HLM-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    try {
      // Simulate/trigger CRM lead ingestion
      // Format payload strictly adhering to non-PHI B2B enterprise requirements
      const payload = {
        LeadSource: "Website HLM Landing Page",
        ReferenceId: ref,
        FirstName: form.contactPerson,
        JobTitle: form.designation,
        Company: form.hospitalName,
        City: form.city,
        Phone: form.phone,
        EmailAddress: form.businessEmail,
        CustomFields: {
          BedCount: form.bedCount,
          PartnershipModel: form.partnershipModel,
          MonthlyWorkload: form.workloadBand,
          PreferredDiscussionTiming: form.preferredTime,
          Notes: form.notes,
        },
      };

      // Dispatched to lead event handler without exposing medical or patient identifiers
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "generate_lead",
          lead_type: "b2b_hlm",
          lead_id: ref,
          lead_data: payload,
          partnership_model: form.partnershipModel,
        });
      }

      setReferenceId(ref);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div id="qualification-form" className="bg-white rounded-3xl border border-blue-200/80 p-6 md:p-10 shadow-lg relative overflow-hidden">
      {/* Top accent badge */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 bg-[#EAF6FF] text-[#1055AE] border border-[#DCE8F5] text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          <Building2 className="w-4 h-4 text-[#1055AE]" />
          <span>Hospital Partnership Assessment</span>
        </span>
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#0B9B9A]" />
          24-Hour Executive Consultation SLA
        </span>
      </div>

      <div className="max-w-2xl mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-[#082C61] tracking-tight">
          Request Laboratory Assessment &amp; Feasibility Study
        </h3>
        <p className="text-xs md:text-sm text-[#52677D] mt-2 font-medium leading-relaxed">
          Receive a tailored operational model, onsite test menu recommendation, capital cost breakdown, and NABL-readiness roadmap from our senior clinical leadership.
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-[#EAF6FF] border border-[#1055AE]/30 rounded-2xl p-8 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-[#1055AE] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-black text-[#082C61]">Assessment Request Received</h4>
          <p className="text-xs text-[#142A43] max-w-lg mx-auto font-medium leading-relaxed">
            Thank you, <strong>{form.contactPerson}</strong>. Your enquiry for <strong>{form.hospitalName}</strong> has been assigned to Dr. Shantakumar Muruda&apos;s executive clinical operations desk.
          </p>
          <div className="inline-block bg-white border border-[#DCE8F5] px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#082C61]">
            CRM Reference ID: {referenceId}
          </div>
          <p className="text-[11px] text-[#52677D] font-medium">
            Our Hospital Partnerships Lead will reach out to schedule an onsite or video consultation within 1 business day.
          </p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setForm({
                hospitalName: "",
                contactPerson: "",
                designation: "Medical Director",
                city: "Bengaluru",
                bedCount: "50-150 beds",
                partnershipModel: "Full Hospital Laboratory Management",
                workloadBand: "500-1500 samples/month",
                businessEmail: "",
                phone: "",
                preferredTime: "Morning (9 AM - 12 PM)",
                notes: "",
                consent: true,
              });
            }}
            className="text-xs font-bold text-[#1055AE] underline hover:text-[#082C61] transition-colors mt-2"
          >
            Submit another institution inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Institution & Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="hospitalName" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Hospital / Institution Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="hospitalName"
                  type="text"
                  required
                  placeholder="e.g. City Life Multispeciality Hospital"
                  value={form.hospitalName}
                  onChange={(e) => setForm({ ...form, hospitalName: e.target.value })}
                  className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-[#142A43] font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#1055AE] focus:ring-2 focus:ring-[#1055AE]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contactPerson" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="contactPerson"
                  type="text"
                  required
                  placeholder="e.g. Dr. Ramesh Rao"
                  value={form.contactPerson}
                  onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-[#142A43] font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#1055AE] focus:ring-2 focus:ring-[#1055AE]/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="designation" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Role / Designation
              </label>
              <select
                id="designation"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl px-3.5 py-3 text-xs md:text-sm text-[#142A43] font-semibold focus:outline-none focus:border-[#1055AE] transition-all"
              >
                <option value="Medical Director">Medical Director / Superintendent</option>
                <option value="Managing Director / CEO">Managing Director / CEO</option>
                <option value="Chief Operating Officer">Chief Operating Officer (COO)</option>
                <option value="Head of Pathology / Lab">Head of Pathology / Lab Services</option>
                <option value="Hospital Administrator">Hospital Administrator</option>
                <option value="Managing Trustee">Managing Trustee</option>
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Hospital City / District
              </label>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. Bengaluru, Mysuru, Hubli"
                className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl px-4 py-3 text-xs md:text-sm text-[#142A43] font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#1055AE] transition-all"
              />
            </div>

            <div>
              <label htmlFor="bedCount" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Bed Capacity
              </label>
              <select
                id="bedCount"
                value={form.bedCount}
                onChange={(e) => setForm({ ...form, bedCount: e.target.value })}
                className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl px-3.5 py-3 text-xs md:text-sm text-[#142A43] font-semibold focus:outline-none focus:border-[#1055AE] transition-all"
              >
                <option value="Under 50 beds">&lt; 50 beds (Nursing Home / Daycare)</option>
                <option value="50-150 beds">50 – 150 beds (Secondary Care)</option>
                <option value="150-300 beds">150 – 300 beds (Tertiary Care)</option>
                <option value="300+ beds">300+ beds (Super Speciality / Teaching)</option>
              </select>
            </div>
          </div>

          {/* Model & Workload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="partnershipModel" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Preferred Partnership Model
              </label>
              <select
                id="partnershipModel"
                value={form.partnershipModel}
                onChange={(e) => setForm({ ...form, partnershipModel: e.target.value })}
                className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl px-3.5 py-3 text-xs md:text-sm text-[#142A43] font-semibold focus:outline-none focus:border-[#1055AE] transition-all"
              >
                <option value="Full Hospital Laboratory Management">Full HLM (End-to-End Onsite + Reference Operations)</option>
                <option value="Hybrid HLM">Hybrid HLM (Emergency Onsite + Super Speciality Referral)</option>
                <option value="Laboratory Management Services">Laboratory Management Services (Quality &amp; QMS Support)</option>
                <option value="Reference Laboratory Partnership">Reference Laboratory Partnership (Specialised Referral Only)</option>
              </select>
            </div>

            <div>
              <label htmlFor="workloadBand" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Approximate Monthly Sample Volume
              </label>
              <select
                id="workloadBand"
                value={form.workloadBand}
                onChange={(e) => setForm({ ...form, workloadBand: e.target.value })}
                className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl px-3.5 py-3 text-xs md:text-sm text-[#142A43] font-semibold focus:outline-none focus:border-[#1055AE] transition-all"
              >
                <option value="Under 500 samples/month">&lt; 500 samples / month</option>
                <option value="500-1500 samples/month">500 – 1,500 samples / month</option>
                <option value="1500-3500 samples/month">1,500 – 3,500 samples / month</option>
                <option value="3500+ samples/month">3,500+ samples / month</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="businessEmail" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Business Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="businessEmail"
                  type="email"
                  required
                  placeholder="doctor@hospital.org"
                  value={form.businessEmail}
                  onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
                  className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-[#142A43] font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#1055AE] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Official Phone / Mobile *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/[^\d+ ]/g, "") })}
                  className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm text-[#142A43] font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#1055AE] transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
                Preferred Discussion Window
              </label>
              <select
                id="preferredTime"
                value={form.preferredTime}
                onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl px-3.5 py-3 text-xs md:text-sm text-[#142A43] font-semibold focus:outline-none focus:border-[#1055AE] transition-all"
              >
                <option value="Morning (9 AM - 12 PM)">Morning (9:00 AM – 12:00 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
                <option value="Evening (4 PM - 7 PM)">Evening (4:00 PM – 7:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-xs font-extrabold text-[#082C61] mb-1.5">
              Specific Clinical, Equipment, or TAT Requirements (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="e.g. Looking to transition emergency ICU lab to 24x7 automated operations, or explore reference testing for oncology & molecular genetics."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-[#FAFBFD] border border-[#DCE8F5] rounded-xl p-4 text-xs md:text-sm text-[#142A43] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#1055AE] transition-all resize-none"
            />
          </div>

          {/* Privacy & DPDP Notice */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="b2b-consent"
              type="checkbox"
              required
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-[#DCE8F5] text-[#1055AE] focus:ring-[#1055AE] cursor-pointer shrink-0"
            />
            <label htmlFor="b2b-consent" className="text-[11px] text-[#52677D] font-medium leading-relaxed cursor-pointer">
              I consent to QXL Diagnostics contacting me regarding institutional laboratory management. No patient health records or PHI are requested or stored in this enquiry.
            </label>
          </div>

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Please fill in all required fields (Hospital Name, Contact Person, Business Email, and Phone).</span>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto bg-[#1055AE] hover:bg-[#082C61] active:scale-[0.98] text-white font-black text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Feasibility Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit HLM Assessment Request</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-[#52677D] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0B9B9A]" />
              Institutional data kept strictly confidential
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
