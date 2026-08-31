"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Home,
  Phone,
  MessageCircle,
  ArrowRight,
  FlaskConical,
  Package,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

const popularTests = [
  { name: "CBC", href: "/cbc" },
  { name: "Vitamin D", href: "/vitamin-d" },
  { name: "HbA1c", href: "/hba1c" },
  { name: "Thyroid Profile", href: "/thyroid-profile" },
  { name: "Lipid Profile", href: "/lipid-profile" },
];

const popularPackages = [
  { name: "Q-Master Health Pro", href: "/packages" },
  { name: "Q-Oncoscreen", href: "/packages" },
];

const quickLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Book Now", href: "/book", icon: ArrowRight },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Packages", href: "/packages", icon: Package },
];

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function NotFound() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(
        `https://www.google.com/search?q=site:qxldiagnostics.com+${encodeURIComponent(query.trim())}`,
        "_blank",
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #e0f2fe 0%, #f0f9ff 30%, #e8f4fd 60%, #dbeafe 100%)' }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0ea5e9]/8 blur-3xl" />
          <div className="absolute bottom-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[#38bdf8]/8 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-[100px] sm:text-[140px] md:text-[180px] font-black leading-none bg-gradient-to-br from-[#0ea5e9] via-[#38bdf8] to-[#7dd3fc] bg-clip-text text-transparent select-none">
              404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: '#0c4a6e' }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed"
            style={{ color: '#0369a1' }}
          >
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Try searching below or explore our popular tests and packages.
          </motion.p>

          {/* Search */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto max-w-lg"
          >
            <div
              className="relative flex items-center overflow-hidden"
              style={{ borderRadius: '999px', background: 'rgba(240,249,255,0.80)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(125,199,232,0.35)', boxShadow: '0 8px 32px rgba(14,165,233,0.10), inset 0 1px 0 rgba(255,255,255,0.9)' }}
            >
              <Search className="ml-5 h-5 w-5 flex-shrink-0" style={{ color: '#0284c7' }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search QXL Diagnostics..."
                className="flex-1 bg-transparent px-4 py-4 text-sm outline-none"
                style={{ color: '#0c4a6e' }}
              />
              <button
                type="submit"
                className="mr-2 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', boxShadow: '0 4px 16px rgba(14,165,233,0.35)' }}
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Content Grid */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Popular Tests */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'rgba(14,165,233,0.12)' }}>
                <FlaskConical className="h-5 w-5 text-[#0284c7]" />
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#0c4a6e' }}>
                Popular Tests
              </h2>
            </div>
            <ul className="space-y-3">
              {popularTests.map((test) => (
                <li key={test.name}>
                  <Link
                    href={test.href}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    style={{ color: '#0369a1' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.08)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    {test.name}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0284c7]" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Popular Packages */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'rgba(14,165,233,0.12)' }}>
                <Package className="h-5 w-5 text-[#0284c7]" />
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#0c4a6e' }}>
                Popular Packages
              </h2>
            </div>
            <ul className="space-y-3">
              {popularPackages.map((pkg) => (
                <li key={pkg.name}>
                  <Link
                    href={pkg.href}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                    style={{ color: '#0369a1' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.08)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    {pkg.name}
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0284c7]" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'rgba(14,165,233,0.12)' }}>
                <Shield className="h-5 w-5 text-[#0284c7]" />
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: '#0c4a6e' }}>
                Quick Links
              </h2>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                      style={{ color: '#0369a1' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,233,0.08)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <Icon className="h-4 w-4 transition-colors text-[#0284c7]" />
                      {link.name}
                      <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#0284c7]" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.a
          href="https://wa.me/919964639639"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
          style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.a>
        <motion.a
          href="tel:+919964639639"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.15, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', boxShadow: '0 4px 20px rgba(14,165,233,0.45)' }}
          aria-label="Call us"
        >
          <Phone className="h-6 w-6" />
        </motion.a>
      </div>
    </div>
  );
}
