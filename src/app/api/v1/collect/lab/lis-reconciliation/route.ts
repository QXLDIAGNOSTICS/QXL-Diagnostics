import { NextRequest, NextResponse } from 'next/server';
import { collectStore } from '@/lib/collect/store';

export async function GET() {
  try {
    const accessions = collectStore.getAllAccessions();
    const pendingSync = accessions.filter(a => a.lisSyncStatus === 'PENDING' || a.lisSyncStatus === 'FAILED_RETRY');
    const synced = accessions.filter(a => a.lisSyncStatus === 'SYNCED');

    return NextResponse.json({
      status: 'success',
      totalAccessions: accessions.length,
      syncedCount: synced.length,
      pendingCount: pendingSync.length,
      pendingSyncItems: pendingSync,
      syncedItems: synced.slice(0, 10),
      integrationContract: {
        vendor: 'ITDOSE INNOPATH LIS',
        adapterMode: 'REST_HL7_EVENT_BRIDGE',
        queueStatus: pendingSync.length > 0 ? 'BACKLOG_ACTIVE' : 'HEALTHY_SYNCED',
        deadLetterCount: 0
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch LIS reconciliation queue', detail: err?.message },
      { status: 500 }
    );
  }
}

