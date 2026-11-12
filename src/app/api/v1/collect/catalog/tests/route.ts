import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || undefined;
    const category = searchParams.get('category') || undefined;

    const tests = collectService.searchCatalogue(query, category);

    return NextResponse.json({
      status: 'success',
      count: tests.length,
      items: tests
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to search catalogue', detail: err?.message },
      { status: 500 }
    );
  }
}

