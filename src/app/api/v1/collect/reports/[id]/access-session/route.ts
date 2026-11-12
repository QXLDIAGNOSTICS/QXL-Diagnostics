import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportIdOrBookingId } = await context.params;
    const body = await req.json().catch(() => ({}));
    const { otp, mobileNumber } = body;

    if (!otp || !mobileNumber) {
      return NextResponse.json(
        { error: 'Missing OTP code or mobile number' },
        { status: 400 }
      );
    }

    const result = collectService.verifyReportOtpAndCreateSession(
      reportIdOrBookingId,
      otp,
      mobileNumber
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Authentication failed' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      status: 'success',
      session: result.session,
      booking: result.booking,
      reports: result.reports,
      message: 'Secure time-limited access session generated successfully'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Report session error', detail: err?.message },
      { status: 500 }
    );
  }
}

