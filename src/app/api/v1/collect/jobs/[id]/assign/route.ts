import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await context.params;
    const body = await req.json().catch(() => ({}));
    const { collectorId, dispatcherId, overrideReason } = body;

    if (!collectorId) {
      return NextResponse.json(
        { error: 'Missing collectorId in assignment request' },
        { status: 400 }
      );
    }

    const result = collectService.assignCollector({
      jobId,
      collectorId,
      dispatcherId: dispatcherId || 'DISPATCH_OFFICER_01',
      overrideReason
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to assign collector' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      job: result.job,
      collector: result.collector,
      message: 'Job successfully allocated to collector'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Job assignment error', detail: err?.message },
      { status: 500 }
    );
  }
}

