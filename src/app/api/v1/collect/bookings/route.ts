import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';
import { collectStore } from '@/lib/collect/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    let bookings = collectStore.getAllBookings();

    if (status) {
      bookings = bookings.filter(b => b.bookingStatus === status);
    }

    return NextResponse.json({
      status: 'success',
      count: bookings.length,
      bookings
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings', detail: err?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // Server-side validation
    const result = collectService.createBooking(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create booking' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        booking: result.booking,
        message: 'Booking created successfully'
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Internal server error creating booking', detail: err?.message },
      { status: 500 }
    );
  }
}

