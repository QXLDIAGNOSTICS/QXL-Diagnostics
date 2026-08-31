"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, Globe, Heart } from "lucide-react";
import { RAKSHA_CAMPAIGN_CONFIG } from "@/lib/rakshaBandhanConfig";

export default function RakshaFooterSection() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-left">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white">QXL DIAGNOSTICS</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Premier NABL Accredited Pathology & Speciality Laboratory in Bengaluru. Delivering precision diagnostic testing with convenient home sample collection.
            </p>
            <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#00A8A8]" />
                <span>NABL Accredited Laboratory ({RAKSHA_CAMPAIGN_CONFIG.nablCertNumber})</span>
              </div>
              <div className="text-slate-400 flex items-center gap-1.5 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{RAKSHA_CAMPAIGN_CONFIG.labLocation}</span>
              </div>
              <div className="text-teal-400 font-medium">Home Sample Collection Available Across Bengaluru</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About QXL</Link>
              </li>
              <li>
                <Link href="/tests" className="hover:text-white transition-colors">Tests Directory</Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">Health Packages</Link>
              </li>
              <li>
                <Link href="/centers" className="hover:text-white transition-colors">Lab Centres</Link>
              </li>
              <li>
                <Link href="/home-collection" className="hover:text-white transition-colors">Home Collection</Link>
              </li>
            </ul>
          </div>

          {/* Campaign Panels */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Campaign Packages</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/raksha-bandhan-health-checkup-bangalore#rakhi-offer-card" className="text-amber-400 hover:underline">
                  Full Body Checkup (₹800)
                </Link>
              </li>
              <li>
                <Link href="/full-body-checkup-bangalore" className="hover:text-white transition-colors">
                  Full Body Checkup
                </Link>
              </li>
              <li>
                <Link href="/hba1c-test" className="hover:text-white transition-colors">
                  Diabetes HbA1c Panel
                </Link>
              </li>
              <li>
                <Link href="/thyroid-test" className="hover:text-white transition-colors">
                  Thyroid Profile
                </Link>
              </li>
              <li>
                <Link href="/lipid-profile-test" className="hover:text-white transition-colors">
                  Lipid Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={`tel:${RAKSHA_CAMPAIGN_CONFIG.contactPhoneE164}`} className="flex items-center gap-1.5 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-[#00A8A8]" />
                  <span>{RAKSHA_CAMPAIGN_CONFIG.contactPhoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@qxldiagnostics.com" className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-[#D69A18]" />
                  <span>info@qxldiagnostics.com</span>
                </a>
              </li>
              <li>
                <a href="https://qxldiagnostics.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white">
                  <Globe className="w-3.5 h-3.5 text-[#00A8A8]" />
                  <span>qxldiagnostics.com</span>
                </a>
              </li>
              <li className="pt-2">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} QXL Diagnostics (Qualitify Healthtech Pvt Ltd). All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Bengaluru</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
