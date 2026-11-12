import { NextRequest, NextResponse } from 'next/server';
import { collectStore } from '@/lib/collect/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get('bookingId');

    let reports = collectStore.getAllReports();
    if (bookingId) {
      reports = reports.filter(r => r.bookingId === bookingId);
    }

    // Zero-leakage: Return only metadata, never raw unauthenticated file streams
    return NextResponse.json({
      status: 'success',
      count: reports.length,
      reports: reports.map(r => ({
        reportId: r.reportId,
        bookingId: r.bookingId,
        patientName: r.patientName,
        reportStatus: r.reportStatus,
        reportVersion: r.reportVersion,
        isCriticalResult: r.isCriticalResult,
        authorizedByClinicianName: r.authorizedByClinicianName,
        authorizedAt: r.authorizedAt,
        testSummaries: r.testSummaries
      }))
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch reports metadata', detail: err?.message },
      { status: 500 }
    );
  }
}

