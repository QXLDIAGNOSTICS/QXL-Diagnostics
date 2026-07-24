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
    ],
  },
  // Next.js's built-in gzip compression buffers streamed responses (Node's
  // zlib doesn't flush per-chunk by default), which breaks real-time SSE
  // delivery for the chat streaming route. Disable it here; in production
  // this should sit behind a reverse proxy/CDN (nginx, Cloudflare, etc.)
  // that handles compression for non-streaming responses instead.
  compress: false,
  async redirects() {
    return [
      {
        source: '/womens-health',
        destination: '/specialities/womens-health',
        permanent: true,
      },
      {
        source: '/speciality-tests/womens-health',
        destination: '/specialities/womens-health',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/specialities',
        permanent: true,
      },
      {
        source: '/health-checkup-packages',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/tests',
        destination: '/speciality-tests',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
