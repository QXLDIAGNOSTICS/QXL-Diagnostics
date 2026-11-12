import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin') || '';

    if (!pin) {
      return NextResponse.json(
        { error: 'Missing required query parameter "pin"' },
        { status: 400 }
      );
    }

    const result = collectService.checkServiceability(pin);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Serviceability check failed', detail: err?.message },
      { status: 500 }
    );
  }
}

