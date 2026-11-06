import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await context.params;
    const body = await req.json().catch(() => ({}));
    const { bookingId, patientId, collectorId, drawDifficulty, complicationsNotes, containers } = body;

    if (!bookingId || !patientId || !containers || !containers.length) {
      return NextResponse.json(
        { error: 'Missing required specimen collection data' },
        { status: 400 }
      );
    }

    const result = collectService.recordSpecimenCollection({
      bookingId,
      patientId,
      collectorId: collectorId || 'QXL-COL-101',
      drawDifficulty,
      complicationsNotes,
      containers
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to record specimen collection' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      jobId,
      specimens: result.specimens,
      message: `${result.specimens?.length || 0} physical container(s) successfully barcoded and recorded at bedside`
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Specimen collection error', detail: err?.message },
      { status: 500 }
    );
  }
}

