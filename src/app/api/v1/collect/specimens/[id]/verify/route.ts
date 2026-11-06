import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: patientId } = await context.params;
    const body = await req.json().catch(() => ({}));
    const { bookingId, statedFullName, statedDobOrId } = body;

    if (!bookingId || !statedFullName || !statedDobOrId) {
      return NextResponse.json(
        { error: 'Missing required bedside identity verification fields' },
        { status: 400 }
      );
    }

    const result = collectService.verifyBedsideIdentity({
      bookingId,
      patientId,
      statedFullName,
      statedDobOrId
    });

    if (!result.matched) {
      return NextResponse.json(
        { error: result.error, matched: false },
        { status: 422 } // Unprocessable entity due to clinical identity mismatch
      );
    }

    return NextResponse.json({
      status: 'success',
      matched: true,
      patient: result.patient,
      message: 'Bedside two-identifier clinical verification successfully confirmed'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Identity verification error', detail: err?.message },
      { status: 500 }
    );
  }
}

