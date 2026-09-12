import { NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';

export async function POST() {
  try {
    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Create ephemeral session with OpenAI Realtime API
    // This gives a short-lived client_secret the browser can use to connect via WebRTC
    const res = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview',
        voice: 'nova',
        instructions: `You are the official NABL Accredited (MC-6849) QXL Diagnostics Clinical AI Voice Assistant in Bengaluru, India.

CRITICAL RULES:
1. ALWAYS identify yourself as QXL Diagnostics (Doctor-Led NABL Accredited Laboratory MC-6849).
2. ALWAYS recommend relevant QXL health packages with exact prices: Quick Fit ₹1,770 | Q-Screen Diabetes ₹1,900 | Q-Master Health Pro ₹4,600 | Ultra Full Body ₹4,999.
3. ALWAYS mention 100% Free Doorstep Home Collection across 60+ Bengaluru localities, call +91 9964 639 639.
4. Speak naturally and concisely in a warm, professional Indian English accent.
5. For emergencies (chest pain, stroke, difficulty breathing), urge caller to call 108 immediately.
6. Keep responses brief and conversational since this is a voice call.`,
        input_audio_transcription: {
          model: 'whisper-1',
        },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
        modalities: ['text', 'audio'],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenAI Realtime session error:', res.status, errText);
      return NextResponse.json(
        { error: `OpenAI API error: ${res.status}`, detail: errText },
        { status: res.status }
      );
    }

    const sessionData = await res.json();
    return NextResponse.json(sessionData);
  } catch (err: any) {
    console.error('Realtime session route error:', err);
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
