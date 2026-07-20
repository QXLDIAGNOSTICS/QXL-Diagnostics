import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_KEY = "6cd5d24c3242477fa5a0ad18f2d3ebd8";
const HOST = "qxldiagnostics.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

/**
 * Bing IndexNow — notify search engines of URL updates.
 * POST JSON: { "urlList": ["https://qxldiagnostics.com/...", ...] }
 * Optional header: x-indexnow-secret matching INDEXNOW_SUBMIT_SECRET env.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (secret && req.headers.get("x-indexnow-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { urlList?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const urlList = (body.urlList || []).filter(
    (u) => typeof u === "string" && u.startsWith(`https://${HOST}`)
  );
  if (urlList.length === 0) {
    return NextResponse.json({ error: "urlList required" }, { status: 400 });
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList.slice(0, 10000),
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  const results = await Promise.allSettled(
    endpoints.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }).then(async (r) => ({ endpoint, status: r.status, ok: r.ok }))
    )
  );

  return NextResponse.json({
    submitted: urlList.length,
    keyLocation: KEY_LOCATION,
    results: results.map((r) =>
      r.status === "fulfilled" ? r.value : { error: String(r.reason) }
    ),
  });
}

export async function GET() {
  return NextResponse.json({
    service: "IndexNow",
    host: HOST,
    keyLocation: KEY_LOCATION,
    usage: 'POST { "urlList": ["https://qxldiagnostics.com/"] }',
  });
}
