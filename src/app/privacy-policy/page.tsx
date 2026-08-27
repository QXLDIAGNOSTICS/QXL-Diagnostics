import React from 'react';
import { Shield, Lock, FileText, UserCheck, AlertTriangle } from 'lucide-react';
import { SITE_URL, EMAIL, PHONE_DISPLAY } from '@/lib/businessInfo';

export const metadata = {
  title: 'Privacy Policy & Data Protection (DPDP 2023) | QXL Diagnostics',
  description: 'Privacy policy, DPDP Act 2023 compliance, health data confidentiality, PCPNDT compliance, and patient data rights at QXL Diagnostics Bengaluru.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#f8faff] min-h-screen py-16">
      <div className="max-w-[1000px] mx-auto px-4 w-full">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-sky-50 text-[#2563eb] rounded-2xl flex items-center justify-center flex-shrink-0 border border-sky-100">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e]">Privacy Policy &amp; Data Governance</h1>
              <p className="text-xs text-slate-500 font-semibold mt-1">Digital Personal Data Protection (DPDP) Act 2023 &amp; Statutory Disclosures</p>
            </div>
          </div>
          
          <div className="prose prose-blue max-w-none text-slate-600 text-sm leading-relaxed space-y-6">
            <p className="font-bold text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <strong>Data Fiduciary:</strong> Qualitify Healthtech Private Limited (&quot;QXL Diagnostics&quot;)<br />
              <strong>Registered Address:</strong> 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060, Karnataka, India.<br />
              <strong>Last Updated:</strong> August 27, 2026
            </p>

            <h2 className="text-xl font-extrabold text-[#0f2d5e]">1. Principles of Data Collection</h2>
            <p>
              QXL Diagnostics collects and processes personal data strictly for legitimate clinical diagnostic purposes, home sample collection logistics, medical report delivery, and quality assurance in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 and applicable Indian healthcare laws.
            </p>

            <h2 className="text-xl font-extrabold text-[#0f2d5e]">2. Categories of Personal &amp; Sensitive Health Data Collected</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Patient Identity Data:</strong> Full name, age, date of birth, gender, government ID (where mandated for specialized testing).</li>
              <li><strong>Contact &amp; Logistics Data:</strong> Mobile phone number, email address, home address for phlebotomy collection, landmark coordinates.</li>
              <li><strong>Clinical &amp; Diagnostic Data:</strong> Doctor test prescriptions, medical history notes, biological sample metadata, and laboratory test results.</li>
              <li><strong>Financial Data:</strong> Transaction references and payment status via secure RBI-licensed payment gateways. QXL Diagnostics does not store raw credit card numbers or UPI PINs.</li>
            </ul>

            <h2 className="text-xl font-extrabold text-[#0f2d5e]">3. Statutory PCPNDT Disclosure</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-extrabold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Pre-Conception &amp; Pre-Natal Diagnostic Techniques (PCPNDT) Compliance</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                QXL Diagnostics strictly adheres to the PCPNDT Act, 1994. Prenatal diagnostic tests (such as Double Marker, Triple Marker, Quadruple Marker, and NIPT) are conducted strictly for detecting genetic and chromosomal abnormalities in accordance with registered clinical laboratory protocols. QXL Diagnostics does not perform, offer, disclose, or assist in prenatal sex determination under any circumstances.
              </p>
            </div>

            <h2 className="text-xl font-extrabold text-[#0f2d5e]">4. Patient Rights under the DPDP Act 2023</h2>
            <p>
              As a Data Principal, you possess the following rights regarding your personal and diagnostic data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access:</strong> Request a summary of your personal data processed by QXL Diagnostics and diagnostic report history.</li>
              <li><strong>Right to Correction &amp; Erasure:</strong> Request correction of inaccurate demographic data or erasure of non-statutory records when clinical retention periods expire.</li>
              <li><strong>Right to Grievance Redressal:</strong> Submit inquiries or complaints directly to our designated Data Protection &amp; Grievance Officer.</li>
              <li><strong>Right to Nominate:</strong> Nominate an authorized representative to exercise data rights in the event of incapacity.</li>
            </ul>

            <h2 className="text-xl font-extrabold text-[#0f2d5e]">5. Data Retention &amp; Security Protocols</h2>
            <p>
              Diagnostic laboratory reports are archived in encrypted electronic storage in accordance with NABL ISO 15189:2022 standards and National Medical Commission guidelines. Technical security controls include TLS 1.3 transport encryption, role-based access control, and strict verification prior to releasing patient report downloads.
            </p>

            <h2 className="text-xl font-extrabold text-[#0f2d5e]">6. Data Protection &amp; Grievance Redressal Officer</h2>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <p className="font-extrabold text-[#0f2d5e] mb-1">Grievance Officer — QXL Data Governance</p>
              <p className="text-xs text-slate-600">
                Qualitify Healthtech Private Limited<br />
                3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru 560060<br />
                Email: <strong>{EMAIL}</strong><br />
                Phone / WhatsApp: <strong>{PHONE_DISPLAY}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
