"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import FaqSection from '@/components/FaqSection';

export default function ContactUsPage() {
  return (
    <div className="bg-[#f8faff] min-h-screen">
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-14 border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">
            Contact Us
          </h1>
          <div className="flex items-center text-xs text-slate-500 gap-1 font-semibold">
            <Link href="/" className="hover:text-[#2563eb]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#2563eb]">Contact Us</span>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-[1260px] mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0f2d5e] mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                We are here to assist you with all your diagnostic needs. Feel free to reach out to us via phone, email, or visit our centers.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f2d5e] mb-1">Main Lab (Kengeri)</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f2d5e] mb-1">Phone & WhatsApp</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">+91 99646 39639</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0f2d5e] mb-1">Email</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">qxldiagnostics@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.008442848986!2d77.47271981141708!3d12.923616656360408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3ee1516e8ea3%3A0x6b47ccf3edc12745!2sKengeri%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
