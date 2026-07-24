import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Payment Terms & Conditions | QXL Diagnostics',
  description: 'Payment Terms and Conditions for QXL Diagnostics',
};

export default function PaymentTermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-bold text-[#2563eb] mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c4a6e] mb-2">
            Payment Terms and Conditions
          </h1>
          <p className="italic text-slate-500 font-medium mb-8">
            (Qualitify Healthtech Pvt Ltd — NABL Accredited Diagnostic Laboratory, Bengaluru)
          </p>

          <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">1. Introduction</h2>
              <p>
                These Payment Terms and Conditions ("Terms") apply to all payments made to QXL Diagnostics ("QXL," "we," "us," or "our") for diagnostic lab tests, health packages, home sample collection, and related services booked by a patient or customer ("Customer," "you," or "your"). By booking a test, scheduling a home collection, or making any payment to QXL, you agree to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">2. Accepted Payment Methods</h2>
              <p className="mb-2">QXL accepts the following payment methods for lab tests and home collection bookings:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>UPI (Google Pay, PhonePe, Paytm, BHIM, or any UPI-enabled app)</li>
                <li>Credit card / Debit card</li>
                <li>Net banking</li>
                <li>Cash on collection (at the time of home sample collection or lab visit, where available)</li>
                <li>Online payment gateway (via website or WhatsApp booking link)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">3. Booking and Payment</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Payment can be made either <strong>in advance</strong> at the time of booking (online) or <strong>at the time of home sample collection / lab visit</strong>, depending on the option selected during booking.</li>
                <li>For home collection bookings, full payment confirms your slot. Unpaid or unconfirmed bookings may be cancelled automatically.</li>
                <li>A payment receipt/confirmation will be sent via SMS, WhatsApp, or email after successful payment.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">4. Failed or Lost Payments</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>If a payment is deducted from your account/card/UPI but the booking is <strong>not confirmed</strong>, or the transaction fails, is duplicated, or the amount does not reflect in QXL's system ("Lost Payment"), please report it to us immediately with your transaction ID/UPI reference number.</li>
                <li>QXL will investigate and process the refund (or correctly apply the payment to your booking) <strong>within 7 (seven) business days</strong> of the payment issue being reported and verified.</li>
                <li>Refunds for failed/lost payments will be credited back to the original payment method (UPI, card, or bank account) used for the transaction.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">5. Cancellations and Refunds</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>If you cancel a booked test or home collection before sample collection, you may be eligible for a refund as per QXL's cancellation policy, processed within 7 business days.</li>
                <li>Once a sample has been collected and processing has begun, the amount paid is generally non-refundable, except in cases of an error on QXL's part (e.g., wrong test booked due to a system error, rejected/void sample requiring re-collection at no extra cost).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">6. Home Collection Charges</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Home sample collection is offered <strong>free of charge</strong> as per QXL's current policy, unless stated otherwise for specific locations, tests, or off-hour slots, in which case applicable charges will be clearly shown before you confirm payment.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">7. Pricing and Offers</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All test and package prices displayed on the QXL website or communicated via WhatsApp/phone are subject to change without prior notice. The price confirmed at the time of booking will apply to that booking.</li>
                <li>Discounts, offers, and package deals (e.g., family offers, preventive screening packages) are subject to the terms specified for that particular offer and cannot be combined unless explicitly stated.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">8. Disputed Transactions</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any dispute regarding a charge must be reported within 7 days of the transaction, along with the transaction ID and booking reference, to QXL's support team for investigation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">9. Data and Report Access</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Digital reports are released only after full payment for the respective test/package has been received and verified.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">10. Contact & Support</h2>
              <p className="mb-2">For payment issues, refunds, or booking assistance, reach out to us:</p>
              <ul className="space-y-1 font-medium">
                <li><strong>📞 Phone / WhatsApp:</strong> +91 99646 39639 (Open 24x7)</li>
                <li><strong>📧 Email:</strong> qxldiagnostics@gmail.com</li>
                <li><strong>📍 Main Lab (Kengeri):</strong> 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560060</li>
                <li><strong>📍 North Hub (Yelahanka):</strong> L Square, opposite RMZ Galleria Mall, Yelahanka, Bengaluru – 560064</li>
                <li><strong>🌐 Website:</strong> <a href="https://qxldiagnostics.com" className="text-[#2563eb] hover:underline">qxldiagnostics.com</a></li>
                <li><strong>💬 WhatsApp Booking:</strong> <a href="https://wa.me/919964639639" className="text-[#2563eb] hover:underline">wa.me/919964639639</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-2">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts in Bengaluru, Karnataka.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
