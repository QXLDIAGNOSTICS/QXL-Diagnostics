import { NextRequest, NextResponse } from 'next/server';
import { collectStore } from '@/lib/collect/store';

export async function GET() {
  try {
    const snapshot = collectStore.getOperationsSnapshot();
    return NextResponse.json({
      status: 'success',
      snapshot
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to compute operations snapshot', detail: err?.message },
      { status: 500 }
    );
  }
}

