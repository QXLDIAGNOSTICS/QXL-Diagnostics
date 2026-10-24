/**
 * Verification test script for QXL Delivery Control Centre
 * Validates exact counts, priority distributions, and data integrity.
 */

import {
  DELIVERY_TASKS,
  URL_INVENTORY,
  QA_TEST_CASES,
  GOVERNANCE_GATES,
  BACKLOG_HEALTH,
  PRIORITY_SUMMARY,
  WEEKLY_RHYTHM,
} from '../src/data/deliveryControlCentreData';

console.log('=== QXL DELIVERY CONTROL CENTRE VERIFICATION ===\n');

let errors = 0;

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    errors++;
  } else {
    console.log(`✅ PASSED: ${msg}`);
  }
}

// 1. Task Counts & Priority Breakdown
assert(DELIVERY_TASKS.length === 87, `Total Delivery Tasks must be exactly 87 (got ${DELIVERY_TASKS.length})`);

const p0Tasks = DELIVERY_TASKS.filter((t) => t.priority === 'P0');
assert(p0Tasks.length === 14, `P0 tasks must be exactly 14 (got ${p0Tasks.length})`);

const p1Tasks = DELIVERY_TASKS.filter((t) => t.priority === 'P1');
assert(p1Tasks.length === 64, `P1 tasks must be exactly 64 (got ${p1Tasks.length})`);

const p2Tasks = DELIVERY_TASKS.filter((t) => t.priority === 'P2');
assert(p2Tasks.length === 9, `P2 tasks must be exactly 9 (got ${p2Tasks.length})`);

// 2. URL Inventory Counts
assert(URL_INVENTORY.length === 27, `URL Inventory must have exactly 27 paths (got ${URL_INVENTORY.length})`);
const p0Urls = URL_INVENTORY.filter((u) => u.priority === 'P0');
assert(p0Urls.length === 6, `P0 URLs must be exactly 6 (got ${p0Urls.length})`);

// 3. QA Test Cases
assert(QA_TEST_CASES.length === 61, `QA Test Cases must be exactly 61 (got ${QA_TEST_CASES.length})`);
const p0Qa = QA_TEST_CASES.filter((q) => q.priority === 'P0');
assert(p0Qa.length === 33, `P0 QA cases count must be exactly 33 (got ${p0Qa.length})`);
const p1Qa = QA_TEST_CASES.filter((q) => q.priority === 'P1');
assert(p1Qa.length === 28, `P1 QA cases count must be exactly 28 (got ${p1Qa.length})`);

// 4. Governance Gates
assert(GOVERNANCE_GATES.length === 9, `Governance Gates must be exactly 9 (got ${GOVERNANCE_GATES.length})`);

// 5. Weekly Rhythm Steps
assert(WEEKLY_RHYTHM.length === 5, `Weekly Rhythm must have 5 steps (got ${WEEKLY_RHYTHM.length})`);

// 6. ID Uniqueness Checks
const taskIds = new Set(DELIVERY_TASKS.map((t) => t.id));
assert(taskIds.size === 87, `All 87 task IDs must be unique (got ${taskIds.size})`);

const qaIds = new Set(QA_TEST_CASES.map((q) => q.id));
assert(qaIds.size === 61, `All 61 QA case IDs must be unique (got ${qaIds.size})`);

const gateIds = new Set(GOVERNANCE_GATES.map((g) => g.id));
assert(gateIds.size === 9, `All 9 Gate IDs must be unique (got ${gateIds.size})`);

console.log(`\nVerification Summary: ${errors === 0 ? 'ALL CHECKS PASSED PERFECTLY' : `${errors} ERRORS FOUND`}`);

if (errors > 0) {
  process.exit(1);
}
