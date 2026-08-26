import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV !== "production";
const backendUrl =
  process.env.BACKEND_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (isDev ? "http://localhost:8000" : "https://qxl-diagnostics-production.up.railway.app");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Next.js's built-in gzip compression buffers streamed responses (Node's
  // zlib doesn't flush per-chunk by default), which breaks real-time SSE
  // delivery for the chat streaming route. Disable it here; in production
  // this should sit behind a reverse proxy/CDN (nginx, Cloudflare, etc.)
  // that handles compression for non-streaming responses instead.
  compress: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/our_team/dr-shantakumar-muruda-md",
        destination: "/dr-shantakumar-muruda",
        permanent: true,
      },
      {
        source: "/our_team/dr-shantakumar-muruda-md/",
        destination: "/dr-shantakumar-muruda",
        permanent: true,
      },
      {
        source: "/our_team/naveen-kumar",
        destination: "/dr-naveen-kumar-n",
        permanent: true,
      },
      {
        source: "/our_team/naveen-kumar/",
        destination: "/dr-naveen-kumar-n",
        permanent: true,
      },
      {
        source: "/uncategorized/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/founder",
        destination: "/team",
        permanent: false,
      },
      {
        source: "/our-specialities",
        destination: "/speciality-tests",
        permanent: true,
      },
      {
        source: "/our_team/:slug*",
        destination: "/doctors",
        permanent: true,
      },
      {
        source: "/tests/complete-blood-count-test-bangalore",
        destination: "/tests/cbc-test-bangalore",
        permanent: true,
      },
      {
        source: "/tests/lft-test-bangalore",
        destination: "/tests/liver-function-test-bangalore",
        permanent: true,
      },
      {
        source: "/tests/kft-test-bangalore",
        destination: "/tests/kidney-function-test-bangalore",
        permanent: true,
      },
      {
        source: "/diagnostic-lab-whitefield",
        destination: "/locations/whitefield",
        permanent: true,
      },
      {
        source: "/home-blood-test-bangalore",
        destination: "/home-blood-collection-bangalore",
        permanent: true,
      },
      {
        source: "/home-sample-collection-bangalore",
        destination: "/home-blood-collection-bangalore",
        permanent: true,
      },
      {
        source: "/blood-sample-collection",
        destination: "/home-blood-collection-bangalore",
        permanent: true,
      },
      {
        source: "/home-collection",
        destination: "/home-blood-collection-bangalore",
        permanent: true,
      },
      {
        source: "/tests/blood-test-at-home-bangalore",
        destination: "/home-blood-collection-bangalore",
        permanent: true,
      },
      {
        source: "/tests/home-blood-collection-bangalore",
        destination: "/home-blood-collection-bangalore",
        permanent: true,
      },
      {
        source: "/tests/home-sample-collection-bangalore",
        destination: "/home-blood-collection-bangalore",
        permanent: true,
      },
      // P2.1 & P2.4 Thin specialty route & slug deduplication redirects
      { source: "/hematology", destination: "/specialities/hematology", permanent: true },
      { source: "/cardiology", destination: "/specialities/cardiology", permanent: true },
      { source: "/endocrinology", destination: "/specialities/endocrinology", permanent: true },
      { source: "/neurology", destination: "/specialities/neurology", permanent: true },
      { source: "/oncology", destination: "/specialities/oncology", permanent: true },
      { source: "/urology", destination: "/specialities/urology", permanent: true },
      { source: "/gastroenterology", destination: "/specialities/gastroenterology", permanent: true },
      { source: "/specialities/womens-health", destination: "/specialities/women-s-health", permanent: true },
      { source: "/specialities/womenshealth", destination: "/specialities/women-s-health", permanent: true },
      // P2.3 Legacy WordPress URL mappings
      { source: "/urology-3", destination: "/specialities/urology", permanent: true },
      { source: "/doctors/dr-shantakumar-muruda-6f7b6161", destination: "/dr-shantakumar-muruda", permanent: true },
      { source: "/our_team/naveen-kumar", destination: "/dr-naveen-kumar-n", permanent: true },
      { source: "/our_team/dr-shantakumar-muruda-md", destination: "/dr-shantakumar-muruda", permanent: true },
      { source: "/uncategorized/:slug*", destination: "/", permanent: true },
      { source: "/endocrinology-2/:slug*", destination: "/specialities/endocrinology", permanent: true },
      { source: "/author/:slug*", destination: "/doctors", permanent: true },

      // ── Canonical slug suffix: -bengaluru → -bangalore (301 permanent) ──────
      // Test pages: resolve SEO master plan -bengaluru URLs to canonical -bangalore
      { source: "/tests/cbc-test-bengaluru", destination: "/tests/cbc-test-bangalore", permanent: true },
      { source: "/tests/thyroid-profile-bengaluru", destination: "/tests/thyroid-test-bangalore", permanent: true },
      { source: "/tests/thyroid-test-bengaluru", destination: "/tests/thyroid-test-bangalore", permanent: true },
      { source: "/tests/vitamin-d-test-bengaluru", destination: "/tests/vitamin-d-test-bangalore", permanent: true },
      { source: "/tests/hba1c-test-bengaluru", destination: "/tests/hba1c-test-bangalore", permanent: true },
      { source: "/tests/lipid-profile-bengaluru", destination: "/tests/lipid-profile-test-bangalore", permanent: true },
      { source: "/tests/liver-function-test-bengaluru", destination: "/tests/liver-function-test-bangalore", permanent: true },
      { source: "/tests/kidney-function-test-bengaluru", destination: "/tests/kidney-function-test-bangalore", permanent: true },
      { source: "/tests/vitamin-b12-test-bengaluru", destination: "/tests/vitamin-b12-test-bangalore", permanent: true },
      { source: "/tests/blood-sugar-test-bengaluru", destination: "/tests/blood-sugar-test-bangalore", permanent: true },
      { source: "/tests/urine-routine-test-bengaluru", destination: "/tests/urine-test-bangalore", permanent: true },
      { source: "/tests/crp-test-bengaluru", destination: "/tests/crp-test-bangalore", permanent: true },
      { source: "/tests/esr-test-bengaluru", destination: "/tests/esr-test-bangalore", permanent: true },
      { source: "/tests/creatinine-test-bengaluru", destination: "/tests/creatinine-test-bangalore", permanent: true },
      { source: "/tests/uric-acid-test-bengaluru", destination: "/tests/uric-acid-test-bangalore", permanent: true },
      { source: "/tests/iron-profile-bengaluru", destination: "/tests/iron-profile-test-bangalore", permanent: true },
      { source: "/tests/ferritin-test-bengaluru", destination: "/tests/ferritin-test-bangalore", permanent: true },
      { source: "/tests/amh-test-bengaluru", destination: "/tests/amh-test-bangalore", permanent: true },
      { source: "/tests/pcos-profile-bengaluru", destination: "/tests/pcos-test-bangalore", permanent: true },
      { source: "/tests/beta-hcg-test-bengaluru", destination: "/tests/beta-hcg-test-bangalore", permanent: true },
      { source: "/tests/double-marker-test-bengaluru", destination: "/tests/double-marker-test-bangalore", permanent: true },
      { source: "/tests/ana-test-bengaluru", destination: "/tests/ana-test-bangalore", permanent: true },
      { source: "/tests/anti-ccp-test-bengaluru", destination: "/tests/anti-ccp-test-bangalore", permanent: true },
      { source: "/tests/psa-test-bengaluru", destination: "/tests/psa-test-bangalore", permanent: true },
      { source: "/tests/ca-125-test-bengaluru", destination: "/tests/ca-125-test-bangalore", permanent: true },
      { source: "/tests/cea-test-bengaluru", destination: "/tests/cea-test-bangalore", permanent: true },
      { source: "/tests/troponin-test-bengaluru", destination: "/tests/troponin-test-bangalore", permanent: true },
      { source: "/tests/testosterone-test-bengaluru", destination: "/tests/testosterone-test-bangalore", permanent: true },
      { source: "/tests/prolactin-test-bengaluru", destination: "/tests/prolactin-test-bangalore", permanent: true },
      { source: "/tests/d-dimer-test-bengaluru", destination: "/tests/d-dimer-test-bangalore", permanent: true },
      // Generic pattern: any remaining /tests/*-bengaluru → /tests/*-bangalore
      { source: "/tests/:slug*-bengaluru", destination: "/tests/:slug*-bangalore", permanent: true },
      // Location variants
      { source: "/diagnostic-lab-bengaluru", destination: "/diagnostic-lab-bangalore", permanent: true },
      { source: "/home-blood-collection-bengaluru", destination: "/home-blood-collection-bangalore", permanent: true },
      { source: "/packages/full-body-checkup-bengaluru", destination: "/full-body-checkup-bangalore", permanent: true },
    ];
  },
};

export default nextConfig;

