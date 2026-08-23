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
      { source: "/uncategorized/:slug*", destination: "/", permanent: true },
      { source: "/endocrinology-2/:slug*", destination: "/specialities/endocrinology", permanent: true },
      { source: "/author/:slug*", destination: "/doctors", permanent: true },
    ];
  },
};

export default nextConfig;
