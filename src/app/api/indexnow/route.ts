import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'qxl4a675003c401490ca9d6fb3083811f56';
const HOST = 'qxldiagnostics.com';
const KEY_LOCATION = `https://${HOST}/qxl-indexnow-key.txt`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const urls: string[] = body.urls || [];

    if (!urls || urls.length === 0) {
      return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    };

    // Submit to IndexNow endpoint
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      return NextResponse.json({ success: true, submittedUrls: urls.length, status: response.status });
    }

    return NextResponse.json(
      { error: 'IndexNow API response error', status: response.status },
      { status: response.status }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
