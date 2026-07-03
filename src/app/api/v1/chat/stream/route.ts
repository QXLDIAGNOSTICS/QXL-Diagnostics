// Dedicated streaming proxy for POST /api/v1/chat/stream.
//
// The generic rewrites() proxy in next.config.ts buffers streamed/SSE
// response bodies (it appears to gzip-compress + coalesce chunks before
// forwarding them to the browser), so tokens from the backend arrive all at
// once instead of incrementally. Route Handlers give us direct control over
// the Response, so we manually fetch the backend and pipe its ReadableStream
// straight through without buffering or compression.
export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.BACKEND_INTERNAL_URL || "http://localhost:8000";

export async function POST(request: Request): Promise<Response> {
  const body = await request.text();
  const cookie = request.headers.get("cookie") ?? "";

  const backendRes = await fetch(`${BACKEND_URL}/api/v1/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body,
  });

  return new Response(backendRes.body, {
    status: backendRes.status,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
