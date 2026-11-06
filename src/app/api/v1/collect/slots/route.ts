import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin') || '';
    const date = searchParams.get('date') || undefined;

    if (!pin) {
      return NextResponse.json(
        { error: 'Missing required query parameter "pin"' },
        { status: 400 }
      );
    }

    const result = collectService.getAvailableSlots(pin, date);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Slots lookup failed', detail: err?.message },
      { status: 500 }
    );
  }
}

