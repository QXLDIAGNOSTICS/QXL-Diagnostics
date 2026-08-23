import React from 'react';
import { ArrowLeft, Scale, Building2, Phone, Mail, MapPin, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Online Payment Terms & Conditions | QXL Diagnostics',
  description: 'QXL Diagnostics Online Payment Terms and Conditions — Qualitify Healthtech Private Limited. Effective 22 July 2026.',
};

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-extrabold text-[#0f2d5e] mb-4 pb-2 border-b border-blue-100 flex items-center gap-2">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2563eb] text-white text-xs font-black flex items-center justify-center">{number}</span>
        {title}
      </h2>
      <div className="space-y-3 text-slate-700 text-sm leading-relaxed font-medium pl-9">
        {children}
      </div>
    </section>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-[#2563eb] font-black flex-shrink-0 mt-0.5">›</span>
      <p>{children}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] flex-shrink-0 mt-2" />
      <p>{children}</p>
    </div>
  );
}

function InfoTable({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <table className="w-full text-sm border border-blue-100 rounded-xl overflow-hidden mb-4">
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-blue-50/50' : 'bg-white'}>
            <td className="px-4 py-3 font-bold text-[#0f2d5e] w-40 align-top border-r border-blue-100">{label}</td>
            <td className="px-4 py-3 text-slate-700">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function PaymentTermsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div
        className="w-full py-12 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 60%, #0284c7 100%)' }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:'absolute', top:'-60px', right:'10%', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,255,255,0.2) 0%,transparent 70%)', filter:'blur(40px)' }} />
          <div style={{ position:'absolute', bottom:'-40px', left:'5%', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle,rgba(224,242,254,0.3) 0%,transparent 70%)', filter:'blur(30px)' }} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-white/90 hover:text-white text-sm font-bold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/25 border border-white/40 flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/90 text-xs font-extrabold uppercase tracking-widest">Legal Document</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
            Online Payment Terms<br />and Conditions
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Entity Info Box */}
        <div
          className="rounded-3xl p-6 mb-10 border"
          style={{
            background: 'rgba(224,242,254,0.7)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(125,199,232,0.4)',
            boxShadow: '0 4px 24px rgba(14,165,233,0.08)',
          }}
        >
          <h2 className="text-sm font-extrabold text-[#0f2d5e] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#2563eb]" /> Legal Entity Information
          </h2>
          <InfoTable rows={[
            ['Legal entity', 'Qualitify Healthtech Private Limited (CIN: U85320KA2020PTC140145)'],
            ['Brand', 'QXL Diagnostics Super Speciality Lab Bengaluru'],
            ['Registered office', 'No. 30/3, Sunny Vale, 2nd Main, 2nd Cross, Jyothi Layout, Yelachenahalli, JP Nagar, Bengaluru – 560078, Karnataka, India'],
            ['Main laboratory', '3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060, Karnataka, India'],
          ]} />
        </div>

        {/* Preamble */}
        <div
          className="rounded-3xl p-6 mb-10 border"
          style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(125,199,232,0.3)',
            boxShadow: '0 4px 24px rgba(14,165,233,0.06)',
          }}
        >
          <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">
            These Online Payment Terms and Conditions (<strong>"Terms"</strong>) govern payments made through QXL Diagnostics&apos; website, payment links, UPI/QR facilities, point-of-sale devices or other authorised electronic payment channels (<strong>"Platform"</strong>). QXL Diagnostics is a brand owned and operated by Qualitify Healthtech Private Limited (<strong>"QXL"</strong>, <strong>"Company"</strong>, <strong>"we"</strong>, <strong>"us"</strong> or <strong>"our"</strong>).
          </p>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            By ticking the mandatory unticked acceptance checkbox and proceeding to payment, the patient, customer, attendant, corporate client or authorised payer (<strong>"Customer"</strong>, <strong>"you"</strong> or <strong>"your"</strong>) confirms that they have read and agreed to these Terms, the applicable Cancellation and Refund Policy, Privacy Policy and Website Terms of Use. Statutory rights available under applicable law remain unaffected.
          </p>
        </div>

        {/* Main Content */}
        <div
          className="rounded-3xl p-8 md:p-12"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(125,199,232,0.3)',
            boxShadow: '0 8px 40px rgba(14,165,233,0.08)',
          }}
        >

          <Section number="1" title="Scope and Definitions">
            <Sub><strong>"Applicable Law"</strong> means laws and binding regulatory requirements applicable to the transaction and QXL, including the Indian Contract Act, 1872; Consumer Protection Act, 2019; Consumer Protection (E-Commerce) Rules, 2020, where applicable; Information Technology Act, 2000 and applicable rules; Digital Personal Data Protection Act, 2023 and rules, to the extent in force; Payment and Settlement Systems Act, 2007; RBI Guidelines on Regulation of Payment Aggregators and Payment Gateways dated 17 March 2020, as amended; and the Karnataka Private Medical Establishments Act, 2007 and applicable rules.</Sub>
            <Sub><strong>"Payment Provider"</strong> means the bank, card network, UPI participant, RBI-authorised payment aggregator or gateway engaged to process a transaction. The applicable Razorpay contracting entity shall be the entity identified in QXL&apos;s executed merchant agreement.</Sub>
            <Sub><strong>"Services"</strong> means pathology, laboratory, home-collection and other diagnostic services expressly offered on the Platform. A service offered under another brand, including Bharath Jan Sewa Labs, is covered only where the checkout expressly identifies Qualitify Healthtech Private Limited as the service provider.</Sub>
          </Section>

          <Section number="2" title="Acceptance, Capacity and Authority">
            <Sub>These Terms bind the Customer only after the mandatory checkbox has been selected and payment is submitted. Electronic acceptance may be recorded with the policy version, date, time, booking reference and transaction identifier.</Sub>
            <Sub>The payer confirms that they are legally competent to contract and authorised to use the selected payment instrument.</Sub>
            <Sub>Where the payer is not the patient, payment does not by itself authorise access to the patient&apos;s report or health information. Disclosure will occur only to the patient or a legally authorised representative in accordance with QXL&apos;s identification, consent and confidentiality procedures.</Sub>
            <Sub>For a minor or person lacking legal capacity, booking and consent must be provided by a parent, legal guardian or legally authorised representative.</Sub>
            <Sub>A person accepting these Terms for a hospital, insurer, TPA, company or other organisation confirms that they are authorised to bind that organisation. Separate written B2B terms will prevail in the event of conflict.</Sub>
          </Section>

          <Section number="3" title="Payment Authorisation and Fraud Prevention">
            <Sub>You confirm that the patient, contact and billing information provided is accurate and that use of the selected card, bank account, UPI ID, wallet or other payment instrument is authorised.</Sub>
            <Sub>You authorise QXL and the Payment Provider to process the displayed amount and exchange transaction data necessary for authentication, processing, reconciliation, fraud prevention and refunds.</Sub>
            <Sub>Stolen, unauthorised, counterfeit or fraudulently obtained payment credentials must not be used. Suspected fraud may be reported to the relevant bank, Payment Provider or lawful authority.</Sub>
            <Sub>Acting reasonably and in good faith, QXL may withhold booking confirmation, request additional verification, cancel the booking or initiate a refund where fraud, impersonation, money-laundering risk or unauthorised use is reasonably suspected. QXL remains responsible for its own proven error, negligence or unlawful conduct.</Sub>
          </Section>

          <Section number="4" title="Third-Party Payment Processing">
            <Sub>Payment transactions may be processed by Razorpay or another RBI-authorised Payment Provider. The provider&apos;s applicable terms and privacy notice also govern its processing activities.</Sub>
            <Sub>QXL does not intend to collect or store complete card numbers, CVV, UPI PINs, net-banking passwords, OTPs or similar authentication credentials. Customers must enter such information only within the authorised Payment Provider interface.</Sub>
            <Sub>QXL is not responsible for a failure or delay caused exclusively by a bank, Payment Provider, card network, UPI application, telecom operator or internet provider outside QXL&apos;s reasonable control. QXL will provide reasonable reconciliation assistance and does not exclude any liability that cannot lawfully be excluded.</Sub>
          </Section>

          <Section number="5" title="Prices, Charges and Payment Confirmation">
            <Sub>The total amount payable and any applicable tax, collection charge or permitted convenience fee will be displayed before payment. No undisclosed compulsory charge will be added after payment.</Sub>
            <Sub>Prices may vary by test, package, service location, home collection, promotional offer or expressly requested additional service. A future price revision will not alter an already confirmed and paid booking.</Sub>
            <Sub>A booking is ordinarily confirmed after the Payment Provider reports successful authorisation and capture, or after QXL issues written confirmation. Merchant settlement into QXL&apos;s bank account may occur later; the timing of settlement does not affect when the booking is confirmed.</Sub>
            <Sub>Where transaction records conflict, QXL will reconcile the gateway status, UTR/RRN, bank record and other available evidence. No single record will be treated as conclusive where a genuine dispute remains.</Sub>
          </Section>

          <Section number="6" title="Failed, Pending and Duplicate Payments">
            <Sub>If an account is debited but the transaction is shown as failed or pending, the Customer should verify its status before paying again and retain the transaction ID, date, amount and bank reference.</Sub>
            <Sub>Reversal and compensation for failed transactions, where applicable, are governed by the relevant payment system and RBI-prescribed timelines. QXL cannot directly control a reversal for funds it has not received, but will provide reasonable transaction information for follow-up.</Sub>
            <Sub>QXL will request a fresh payment only after checking available gateway records and warning the Customer about possible duplication. If QXL subsequently receives both payments for the same booking, the verified duplicate amount will be refunded under Section 8.</Sub>
          </Section>

          <Section number="7" title="Cancellation and Refund Eligibility">
            <p className="text-slate-700 text-sm mb-3">A full or proportionate refund may be approved where:</p>
            <div className="space-y-1.5 mb-4">
              <Bullet>QXL receives a duplicate payment for the same booking;</Bullet>
              <Bullet>QXL is unable to provide the paid service;</Bullet>
              <Bullet>the Customer cancels before phlebotomist dispatch, sample collection, testing or procurement of a booking-specific reagent/outsourced test, as applicable;</Bullet>
              <Bullet>QXL collects an incorrect or excess amount; or</Bullet>
              <Bullet>a refund is otherwise required by law.</Bullet>
            </div>
            <p className="text-slate-700 text-sm mb-3">A refund may be declined or proportionately reduced where a legitimate, disclosed cost has already been incurred, including completed home-collection attendance, valid sample collection, commenced testing, completed reporting or procurement of a booking-specific reagent or outsourced test.</p>
            <p className="text-slate-700 text-sm">No-refund restrictions will not apply where non-performance, recollection, incorrect testing, material delay, sample loss or mishandling is attributable to QXL, or where a refund is required by law. The basis and calculation of any deduction will be communicated to the Customer.</p>
          </Section>

          <Section number="8" title="Refund Procedure">
            <Sub>Submit refund requests to <a href="mailto:accounts@qxldiagnostics.com" className="text-[#2563eb] hover:underline font-bold">accounts@qxldiagnostics.com</a> with the patient name, booking number, transaction ID/UTR, payment date, amount and reason. Do not send an OTP, PIN, CVV, password or complete card number.</Sub>
            <Sub>QXL will acknowledge a complete request within 48 hours and ordinarily communicate its decision within seven working days. An approved refund will ordinarily be initiated within seven working days after approval.</Sub>
            <Sub>The recipient bank or Payment Provider may require additional time to display the credit. Refunds will normally be returned to the original payment method. An alternative account may be used only where technically necessary and after identity and ownership verification.</Sub>
            <Sub>No amount will be deducted from an approved refund unless the charge was disclosed before payment, relates to a service or cost already incurred, and is legally permissible.</Sub>
          </Section>

          <Section number="9" title="Chargebacks and Payment Disputes">
            <Sub>Customers are encouraged to contact QXL first so that the transaction and service records can be investigated promptly. This does not restrict any lawful banking, payment-system or consumer remedy.</Sub>
            <Sub>QXL may provide relevant booking, invoice, collection, testing, report-delivery and communication records to the Payment Provider or bank when responding to a dispute, subject to applicable confidentiality and data-protection requirements.</Sub>
            <Sub>Where credible evidence establishes deliberate payment fraud or a knowingly false chargeback, QXL may pursue proportionate remedies available under law. A genuine or unsuccessful dispute will not, by itself, be treated as fraud.</Sub>
          </Section>

          <Section number="10" title="Patient Information, Samples and Reports">
            <Sub>The Customer must provide accurate patient identity, age/date of birth, sex where clinically relevant, contact details and test selection. QXL retains its own duty to verify patient identity at sample collection.</Sub>
            <Sub>Certain tests require fasting, clinical information, medication details, timing, appointment or special collection and transport conditions. The Customer should follow instructions communicated before collection.</Sub>
            <Sub>QXL may postpone testing or request recollection where a sample is unsuitable, insufficient, haemolysed, contaminated or otherwise fails documented acceptance criteria. No additional fee will be charged where recollection is required because of QXL&apos;s collection, handling or processing error.</Sub>
            <Sub>Reports are diagnostic aids and should be interpreted by a qualified registered medical practitioner in clinical context. This statement does not exclude QXL&apos;s responsibility for performing and reporting services with reasonable professional care and in accordance with its documented quality procedures, applicable NABL requirements and professional standards.</Sub>
            <Sub>The Platform and payment facility are not emergency medical services. In a medical emergency, contact an appropriate emergency service or healthcare facility immediately.</Sub>
          </Section>

          <Section number="11" title="Packages and Promotional Offers">
            <Sub>A package covers only the tests and services expressly listed at purchase. Additional tests require the Customer&apos;s approval of the additional price.</Sub>
            <Sub>Offers, coupons and promotional prices are governed by their stated validity and eligibility conditions and cannot be exchanged for cash unless required by law.</Sub>
            <Sub>Consultation, imaging, home collection or specialist interpretation is included only where expressly stated.</Sub>
          </Section>

          <Section number="12" title="Unauthorised Transactions">
            <Sub>A Customer who suspects an unauthorised transaction should immediately notify their bank or payment provider, obtain an acknowledgement and inform QXL with the relevant transaction reference. The National Cyber Crime Helpline <strong>1930</strong> or <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-[#2563eb] hover:underline font-bold">cybercrime.gov.in</a> may also be used where appropriate.</Sub>
            <Sub>Liability for an unauthorised electronic transaction will be determined by the issuing bank, Payment Provider and applicable RBI directions. QXL will not independently treat a transaction as authorised solely because an OTP, PIN, biometric, password or registered device was used.</Sub>
            <Sub>QXL will reasonably cooperate with lawful investigations without guaranteeing a particular outcome or recovery timeline.</Sub>
          </Section>

          <Section number="13" title="Privacy and Payment Security">
            <Sub>QXL will handle personal and health information according to its <Link href="/privacy-policy" className="text-[#2563eb] hover:underline font-bold">Privacy Policy</Link> and applicable law. The Privacy Policy should be read separately and is not replaced by these Payment Terms.</Sub>
            <Sub>The minimum necessary information may be shared with Payment Providers, banks and service partners for transaction processing, fraud prevention, reconciliation, refunds, service delivery and legal compliance. Medical information will not be disclosed to a payer merely because that person paid for the service.</Sub>
            <Sub>QXL will never request an OTP, UPI PIN, card PIN, CVV or net-banking password, including for a refund. Customers are responsible for protecting their own devices and payment credentials.</Sub>
          </Section>

          <Section number="14" title="Fair Allocation of Responsibility">
            <Sub>QXL is not liable for indirect or consequential loss caused exclusively by payment infrastructure outside its reasonable control. For a verified payment-processing error attributable to QXL, QXL will correct the booking, provide the paid service or issue an appropriate refund, together with any additional remedy required by law. Save for the matters described in the following paragraph, QXL&apos;s aggregate liability arising out of or in connection with a booking will not exceed the amount paid by the Customer for that booking.</Sub>
            <Sub>Nothing in these Terms excludes or limits liability for fraud, wilful misconduct, gross negligence, death or personal injury caused by negligence, breach of patient confidentiality, or any liability that cannot lawfully be excluded. Liability for a deficient diagnostic service or a data-security failure is likewise not limited where it results from QXL&apos;s negligence, wilful default or failure to follow its documented quality procedures.</Sub>
            <Sub>A Customer is responsible for direct loss caused by their proven deliberate fraud, wilful misconduct or knowing misuse of another person&apos;s payment credentials. The Customer is not required to indemnify QXL merely because a good-faith complaint, refund request or payment dispute is unsuccessful.</Sub>
          </Section>

          <Section number="15" title="Force Majeure">
            <p className="text-slate-700 text-sm leading-relaxed">QXL will not be responsible for delay caused by events beyond its reasonable control, including natural disasters, governmental restrictions, widespread infrastructure failure, civil disturbance or payment-network outage. QXL will take reasonable steps to minimise disruption and will offer rescheduling or an appropriate refund where the service cannot be provided within a reasonable period. This clause does not excuse QXL&apos;s failure to exercise reasonable care or maintain legally required safeguards.</p>
          </Section>

          {/* Section 16 — Grievance */}
          <section className="mb-10">
            <h2 className="text-lg font-extrabold text-[#0f2d5e] mb-4 pb-2 border-b border-blue-100 flex items-center gap-2">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2563eb] text-white text-xs font-black flex items-center justify-center">16</span>
              Grievance Redressal and Support
            </h2>
            <div className="pl-9 space-y-4">
              <InfoTable rows={[
                ['Legal entity', 'Qualitify Healthtech Private Limited'],
                ['Grievance officer', <>Ms. Meghana Bhat, Grievance Redressal Officer, Finance &amp; Accounts</>],
                ['Email', <a key="email" href="mailto:accounts@qxldiagnostics.com" className="text-[#2563eb] hover:underline font-bold">accounts@qxldiagnostics.com</a>],
                ['Telephone', <a key="tel" href="tel:+919964639639" className="text-[#2563eb] hover:underline font-bold">+91 9964 639 639</a>],
                ['Correspondence', '3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060, Karnataka, India'],
                ['Support hours', 'Monday to Saturday: 7:00 AM – 9:00 PM; Sunday: 7:00 AM – 2:00 PM IST'],
                ['Response timeline', 'Acknowledgement within 48 hours; refund decisions within seven working days (Section 8); other grievances resolved ordinarily within 30 days'],
              ]} />
              <p className="text-sm text-slate-700 leading-relaxed">
                If a complaint remains unresolved, the Customer may approach the <strong>National Consumer Helpline</strong> (1915 or <a href="https://consumerhelpline.gov.in" target="_blank" rel="noreferrer" className="text-[#2563eb] hover:underline">consumerhelpline.gov.in</a>), the competent Consumer Disputes Redressal Commission, or the relevant regulated payment entity. An eligible complaint against a regulated entity may be escalated under the <strong>RBI Integrated Ombudsman Scheme</strong> after following the prescribed complaint process.
              </p>
            </div>
          </section>

          <Section number="17" title="Governing Law and Disputes">
            <Sub>These Terms are governed by the laws of India. The parties should first attempt good-faith resolution through the grievance process above.</Sub>
            <Sub>Nothing in these Terms restricts a consumer from approaching a competent Consumer Disputes Redressal Commission or exercising any non-waivable statutory or regulatory remedy.</Sub>
            <Sub>Subject to the jurisdiction available to consumers under applicable law, courts at Bengaluru, Karnataka, will have jurisdiction. Any arbitration arrangement applicable to a B2B customer must arise under a separate written commercial agreement and does not apply merely through these patient-facing Terms.</Sub>
          </Section>

          <Section number="18" title="General Provisions">
            <Sub>If any provision is held unenforceable, it will be limited or severed only to the extent necessary, and the remainder will continue to apply.</Sub>
            <Sub>No delay by QXL in exercising a right constitutes a waiver. These Terms and the expressly linked policies constitute the agreement concerning online payment, subject to any separate written B2B agreement.</Sub>
            <Sub>QXL may update these Terms prospectively. The effective date and version will be displayed, and an update will not retrospectively alter a confirmed and paid booking except where required by law.</Sub>
            <Sub>Notices to QXL may be sent using the contact information in Section 16. Communications to the Customer may be sent to the registered mobile number or email address, subject to applicable law.</Sub>
          </Section>

          {/* Section 19 — Consent checkbox highlight */}
          <section className="mb-4">
            <h2 className="text-lg font-extrabold text-[#0f2d5e] mb-4 pb-2 border-b border-blue-100 flex items-center gap-2">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2563eb] text-white text-xs font-black flex items-center justify-center">19</span>
              Mandatory Checkout Consent
            </h2>
            <div
              className="ml-9 flex items-start gap-4 rounded-2xl p-5 border"
              style={{
                background: 'linear-gradient(135deg, rgba(224,242,254,0.7) 0%, rgba(219,234,254,0.6) 100%)',
                border: '1.5px solid rgba(37,99,235,0.25)',
              }}
            >
              <AlertCircle className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-extrabold text-[#0f2d5e] uppercase tracking-wider mb-2">Consent Declaration (Displayed at Checkout)</p>
                <p className="text-sm text-slate-700 leading-relaxed font-medium italic">
                  ☐ &nbsp;I confirm that the booking and payment details are accurate, that I am authorised to use the selected payment method, and that I have read and agree to QXL Diagnostics&apos; Online Payment Terms and Conditions, Cancellation and Refund Policy, Privacy Policy and Website Terms of Use. If I am paying for another patient, I understand that payment does not authorise disclosure of that patient&apos;s medical information to me unless I am legally authorised to receive it.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer quick links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'accounts@qxldiagnostics.com', href: 'mailto:accounts@qxldiagnostics.com' },
            { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: '+91 9964 639 639', href: 'tel:+919964639639' },
            { icon: <MapPin className="w-4 h-4" />, label: 'Lab Address', value: 'Kengeri, Bengaluru – 560060', href: 'https://maps.google.com/?q=QXL+Diagnostics+Kengeri+Bangalore' },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center gap-3 rounded-2xl p-4 transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(125,199,232,0.35)',
                boxShadow: '0 4px 16px rgba(14,165,233,0.08)',
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#dbeafe] flex items-center justify-center text-[#2563eb] flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-xs font-bold text-[#0f2d5e]">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium pb-8 justify-center">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: 22 July 2026 · Version 1.0 · Qualitify Healthtech Private Limited</span>
        </div>

      </div>
    </div>
  );
}
