import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { bookingId, itdoseAccession, clinicianName, testSummaries, isCritical, criticalReadbackLogged } = body;

    if (!bookingId || !itdoseAccession) {
      return NextResponse.json(
        { error: 'Missing bookingId or itdoseAccession for clinical authorization' },
        { status: 400 }
      );
    }

    const result = collectService.authorizeReportFromItdose({
      bookingId,
      itdoseAccession,
      clinicianName: clinicianName || 'Dr. Shantakumar Muruda, MD Pathologist',
      testSummaries,
      isCritical: Boolean(isCritical),
      criticalReadbackLogged: Boolean(criticalReadbackLogged)
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to authorize report in ITDOSE' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      report: result.report,
      booking: result.booking,
      message: 'Report clinically released by pathologist in ITDOSE and authorized for patient delivery'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Report authorization error', detail: err?.message },
      { status: 500 }
    );
  }
}

