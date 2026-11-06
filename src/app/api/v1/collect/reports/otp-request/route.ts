import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { bookingId, mobileNumber } = body;

    if (!bookingId || !mobileNumber) {
      return NextResponse.json(
        { error: 'Missing bookingId or mobileNumber for report OTP request' },
        { status: 400 }
      );
    }

    const result = collectService.requestReportOtp(bookingId, mobileNumber);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send OTP' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: result.message,
      demoOtpCode: result.demoOtpCode
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'OTP request error', detail: err?.message },
      { status: 500 }
    );
  }
}

