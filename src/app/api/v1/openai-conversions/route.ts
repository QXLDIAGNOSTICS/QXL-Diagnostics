import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const apiKey = process.env.OPENAI_CONVERSIONS_API_KEY || process.env.OPENAI_API_KEY;
    const pixelId = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID || '4zM4txkAYrYXzAtH8bTNp7';

    if (!apiKey) {
      // If no API key configured on server, return mock success (pixel still fires on client)
      return NextResponse.json(
        { success: true, message: 'Client pixel active; OPENAI_CONVERSIONS_API_KEY environment variable not set for server-side dispatch.' },
        { status: 200 }
      );
    }

    const payload = {
      event_name: body.event_name || 'lead_created',
      event_type: body.event_type || 'customer_action',
      event_id: body.event_id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Math.floor(Date.now() / 1000),
      user_data: body.user_data || {},
      custom_data: body.custom_data || {},
    };

    const res = await fetch(`https://bzr.openai.com/v1/events?pid=${pixelId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await res.json().catch(() => ({}));

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      data: responseData,
    });
  } catch (err: any) {
    console.error('OpenAI Conversions API dispatch error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error dispatching event' },
      { status: 500 }
    );
  }
}
