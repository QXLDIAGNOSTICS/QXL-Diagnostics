import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await context.params;
    const body = await req.json().catch(() => ({}));
    const { eventType, notes } = body;

    const validEvents = ['ACKNOWLEDGED', 'EN_ROUTE', 'ARRIVED', 'CANCELLED'];
    if (!validEvents.includes(eventType)) {
      return NextResponse.json(
        { error: `Invalid eventType "${eventType}". Must be one of: ${validEvents.join(', ')}` },
        { status: 400 }
      );
    }

    const result = collectService.updateJobStatus({
      jobId,
      newStatus: eventType as any,
      notes
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to update job event' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      job: result.job,
      booking: result.booking,
      message: `Job event "${eventType}" recorded successfully`
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Job event recording error', detail: err?.message },
      { status: 500 }
    );
  }
}

