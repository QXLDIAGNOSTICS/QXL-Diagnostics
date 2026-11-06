import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: manifestId } = await context.params;
    const body = await req.json().catch(() => ({}));
    const { scannedSpecimenIds, temperatureAtReceiptCelsius, receiverStaffId, sealIntact } = body;

    if (!scannedSpecimenIds || !Array.isArray(scannedSpecimenIds)) {
      return NextResponse.json(
        { error: 'Missing scannedSpecimenIds array in manifest handover' },
        { status: 400 }
      );
    }

    const result = collectService.recordManifestReceipt({
      manifestId,
      scannedSpecimenIds,
      temperatureAtReceiptCelsius:
        typeof temperatureAtReceiptCelsius === 'number' ? temperatureAtReceiptCelsius : 4.5,
      receiverStaffId: receiverStaffId || 'LAB-RECEIVER-01',
      sealIntact: sealIntact !== false
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to record manifest handover' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 'success',
      manifest: result.manifest,
      message: 'Manifest handover and physical barcode reconciliation complete'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Manifest handover error', detail: err?.message },
      { status: 500 }
    );
  }
}

