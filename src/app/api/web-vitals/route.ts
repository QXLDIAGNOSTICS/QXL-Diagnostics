import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let payload;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      const text = await request.text();
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { raw: text };
      }
    }

    // In production, send to your telemetry / logging aggregator (e.g. CloudWatch, BigQuery, Datadog)
    // Core Web Vitals targets (75th percentile):
    // LCP <= 2.5s, INP <= 200ms, CLS <= 0.10
    if (process.env.NODE_ENV !== "production") {
      console.log("[Core Web Vitals]", payload);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to record web vital";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
