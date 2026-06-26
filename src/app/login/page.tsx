"use client";
import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    step: 'phone' // 'phone' or 'otp'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.phone.length >= 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFormData({ ...formData, step: 'otp' });
      }, 1000);
    } else {
      setError('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Verification successful!");
      }, 1000);
    } else {
      setError('Please enter the 6-digit OTP code sent to your phone.');
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="text-center mb-6">
          <img 
            src="/image/Logo (1).png" 
            alt="QXL Diagnostics Logo" 
            className="h-12 mx-auto mb-4 object-contain"
            onError={(e) => { e.currentTarget.src='/image/QXL-Diagnostics-Lab-Logo-1.jpg'; }} 
          />
          <h2 className="text-[#0f2d5e] text-xl font-bold mb-1">Patient Portal</h2>
          <p className="text-slate-500 text-xs font-semibold">Access reports, book history, and health tracking</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl mb-4 text-center font-semibold">
            {error}
          </div>
        )}

        {formData.step === 'phone' ? (
          <form onSubmit={handleGetOtp} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Mobile Number</label>
              <div className="flex gap-2">
                <span className="bg-gray-50 border border-gray-200 px-3.5 py-3 rounded-xl text-xs font-bold flex items-center text-slate-500">+91</span>
                <input 
                  type="tel" 
                  required
                  placeholder="Enter 10-digit mobile"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send Verification OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Enter 6-Digit OTP</label>
              <input 
                type="text" 
                maxLength={6}
                required
                placeholder="0 0 0 0 0 0"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                className="border border-gray-200 rounded-xl px-4 py-3 text-xs text-center font-bold tracking-widest focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Log In'}
            </button>

            <button 
              type="button"
              onClick={() => setFormData({ ...formData, step: 'phone' })}
              className="w-full text-center text-xs font-bold text-[#0f2d5e] hover:underline"
            >
              Change Mobile Number
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
            By signing in, you agree to QXL's <a href="#" className="underline text-slate-500">Terms of Use</a> and <a href="#" className="underline text-slate-500">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
