import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
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
        destination: `${process.env.BACKEND_INTERNAL_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
