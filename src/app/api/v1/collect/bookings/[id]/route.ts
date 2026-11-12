import { NextRequest, NextResponse } from 'next/server';
import { collectStore } from '@/lib/collect/store';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const booking = collectStore.getBooking(id);

    if (!booking) {
      return NextResponse.json(
        { error: `Booking with reference "${id}" was not found.` },
        { status: 404 }
      );
    }

    const job = booking.assignedJobId ? collectStore.getJob(booking.assignedJobId) : undefined;
    const specimens = collectStore.getAllSpecimens().filter(s => s.bookingId === booking.bookingId);
    const reports = collectStore.getReportsForBooking(booking.bookingId);

    return NextResponse.json({
      status: 'success',
      booking,
      job,
      specimens,
      reports: reports.map(r => ({
        reportId: r.reportId,
        reportStatus: r.reportStatus,
        reportVersion: r.reportVersion,
        isCritical: r.isCriticalResult,
        authorizedAt: r.authorizedAt
      }))
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve booking', detail: err?.message },
      { status: 500 }
    );
  }
}

