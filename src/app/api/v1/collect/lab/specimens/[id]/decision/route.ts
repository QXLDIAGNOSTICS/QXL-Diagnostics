import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: specimenId } = await context.params;
    const body = await req.json().catch(() => ({}));
    const { decision, rejectionReason, rejectionNotes, staffId } = body;

    const validDecisions = ['ACCEPTED', 'REJECTED', 'ON_HOLD'];
    if (!validDecisions.includes(decision)) {
      return NextResponse.json(
        { error: `Invalid decision "${decision}". Must be one of: ${validDecisions.join(', ')}` },
        { status: 400 }
      );
    }

    if (decision === 'REJECTED' && !rejectionReason) {
      return NextResponse.json(
        { error: 'Rejection requires a standardized rejection reason code' },
        { status: 400 }
      );
    }

    const result = collectService.accessionSpecimen({
      specimenId,
      decision: decision as any,
      rejectionReason,
      rejectionNotes,
      staffId: staffId || 'LAB-TECH-01'
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to process specimen decision' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      accession: result.accession,
      booking: result.booking,
      message: `Specimen ${specimenId} disposition marked as ${decision}`
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Specimen accession decision error', detail: err?.message },
      { status: 500 }
    );
  }
}

