import { NextRequest, NextResponse } from 'next/server';
import { collectStore } from '@/lib/collect/store';

export async function GET() {
  try {
    const accessions = collectStore.getAllAccessions();
    return NextResponse.json({
      status: 'success',
      count: accessions.length,
      accessions
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch lab accessions', detail: err?.message },
      { status: 500 }
    );
  }
}

