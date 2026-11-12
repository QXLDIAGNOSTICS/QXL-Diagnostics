import { NextRequest, NextResponse } from 'next/server';
import { collectService } from '@/lib/collect/service';
import { collectStore } from '@/lib/collect/store';

export async function GET() {
  try {
    const manifests = collectStore.getAllManifests();
    return NextResponse.json({
      status: 'success',
      count: manifests.length,
      manifests
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch manifests', detail: err?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      originType,
      destinationLab,
      riderUserId,
      riderName,
      insulatedBoxId,
      specimenIds,
      temperatureAtDispatchCelsius
    } = body;

    if (!specimenIds || !specimenIds.length) {
      return NextResponse.json(
        { error: 'Cannot create manifest with zero specimens' },
        { status: 400 }
      );
    }

    const result = collectService.createTransportManifest({
      originType: originType || 'COLLECTOR_BAG',
      destinationLab: destinationLab || 'KENGERI_REFERENCE_LAB',
      riderUserId: riderUserId || 'RIDER-402',
      riderName: riderName || 'Syed Arbaaz (Logistics Runner)',
      insulatedBoxId: insulatedBoxId || 'COLD-BOX-09',
      specimenIds,
      temperatureAtDispatchCelsius: typeof temperatureAtDispatchCelsius === 'number' ? temperatureAtDispatchCelsius : 4.0
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create transport manifest' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        manifest: result.manifest,
        message: 'Digital transport manifest generated and dispatched'
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Manifest creation error', detail: err?.message },
      { status: 500 }
    );
  }
}

