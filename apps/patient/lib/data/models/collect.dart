import 'package:flutter/foundation.dart';
import 'package:qxl_core/qxl_core.dart';

/// A family member tests are booked for (`/me/profiles`).
@immutable
class PatientProfile {
  const PatientProfile({
    required this.id,
    required this.reference,
    required this.fullName,
    required this.dateOfBirth,
    required this.relation,
    this.gender,
    this.phone,
  });

  factory PatientProfile.fromJson(Json j) => PatientProfile(
    id: j['id'] as String,
    reference: strOr(j['reference'], ''),
    fullName: strOr(j['full_name'], ''),
    dateOfBirth: DateTime.parse(j['date_of_birth'] as String),
    relation: strOr(j['relation'], 'self'),
    gender: str(j['gender']),
    phone: str(j['phone']),
  );

  final String id;
  final String reference;
  final String fullName;
  final DateTime dateOfBirth;
  final String relation;
  final String? gender;
  final String? phone;

  bool get isSelf => relation == 'self';
  String get relationLabel => titleCase(relation == 'self' ? 'you' : relation);
}

/// A saved collection address with its map pin (`/me/addresses`).
@immutable
class SavedAddress {
  const SavedAddress({
    required this.id,
    required this.label,
    required this.house,
    required this.locality,
    required this.city,
    required this.pincode,
    this.street,
    this.landmark,
    this.instructions,
    this.lat,
    this.lng,
    this.isDefault = false,
  });

  factory SavedAddress.fromJson(Json j) => SavedAddress(
    id: j['id'] as String,
    label: strOr(j['label'], 'Home'),
    house: strOr(j['house'], ''),
    street: str(j['street']),
    locality: strOr(j['locality'], ''),
    city: strOr(j['city'], 'Bengaluru'),
    pincode: strOr(j['pincode'], ''),
    landmark: str(j['landmark']),
    instructions: str(j['instructions']),
    lat: doubleOrNull(j['lat']),
    lng: doubleOrNull(j['lng']),
    isDefault: boolOr(j['is_default'], false),
  );

  final String id;
  final String label;
  final String house;
  final String? street;
  final String locality;
  final String city;
  final String pincode;
  final String? landmark;
  final String? instructions;
  final double? lat;
  final double? lng;
  final bool isDefault;

  bool get hasPin => lat != null && lng != null;

  String get line => [
    house,
    street,
    landmark == null ? null : 'near $landmark',
    locality,
    city,
    pincode,
  ].whereType<String>().where((s) => s.isNotEmpty).join(', ');

  Json toAddressJson() => {
    'house': house,
    'street': street,
    'locality': locality,
    'city': city,
    'pincode': pincode,
    'landmark': landmark,
    'instructions': instructions,
    'lat': lat,
    'lng': lng,
  };
}

@immutable
class ServiceCheck {
  const ServiceCheck({required this.pincode, required this.serviceable, this.locality, this.collectionFeePaise});

  factory ServiceCheck.fromJson(Json j) => ServiceCheck(
    pincode: strOr(j['pincode'], ''),
    serviceable: boolOr(j['serviceable'], false),
    locality: str(j['locality']),
    collectionFeePaise: intOrNull(j['collection_fee_paise']),
  );

  final String pincode;
  final bool serviceable;
  final String? locality;
  final int? collectionFeePaise;
}

@immutable
class VisitSlot {
  const VisitSlot({required this.label, required this.available, this.remaining = 0, this.reason});

  factory VisitSlot.fromJson(Json j) => VisitSlot(
    label: strOr(j['label'], ''),
    available: boolOr(j['available'], false),
    remaining: intOrNull(j['remaining']) ?? 0,
    reason: str(j['unavailable_reason']),
  );

  final String label;
  final bool available;
  final int remaining;

  /// `past`, `full` or `no_collectors`.
  final String? reason;
}

@immutable
class VisitTest {
  const VisitTest({
    required this.bookingId,
    required this.name,
    required this.labStatus,
    required this.paymentStatus,
    this.amountPaise,
  });

  factory VisitTest.fromJson(Json j) => VisitTest(
    bookingId: j['booking_id'] as String,
    name: strOr(j['name'], 'Test'),
    labStatus: strOr(j['lab_status'], 'not_received'),
    paymentStatus: strOr(j['payment_status'], 'unpaid'),
    amountPaise: intOrNull(j['amount_paise']),
  );

  final String bookingId;
  final String name;
  final String labStatus;
  final String paymentStatus;
  final int? amountPaise;
}

@immutable
class VisitSpecimen {
  const VisitSpecimen({required this.containerType, required this.status, this.collectedAt, this.reason});

  factory VisitSpecimen.fromJson(Json j) => VisitSpecimen(
    containerType: strOr(j['container_type'], 'Sample'),
    status: strOr(j['status'], 'collected'),
    collectedAt: dateTimeOrNull(j['collected_at']),
    reason: str(j['decision_reason']),
  );

  final String containerType;
  final String status;
  final DateTime? collectedAt;
  final String? reason;
}

@immutable
class ReportSummary {
  const ReportSummary({
    required this.id,
    required this.reference,
    required this.title,
    required this.version,
    required this.status,
    this.isPartial = false,
    this.releasedAt,
    this.visitId,
    this.patientName,
    this.amendmentNote,
  });

  factory ReportSummary.fromJson(Json j) => ReportSummary(
    id: j['id'] as String,
    reference: strOr(j['reference'], ''),
    title: strOr(j['title'], 'Laboratory report'),
    version: intOrNull(j['version']) ?? 1,
    status: strOr(j['status'], 'released'),
    isPartial: boolOr(j['is_partial'], false),
    releasedAt: dateTimeOrNull(j['released_at']),
    visitId: str(j['visit_id']),
    patientName: str(j['patient_name']),
    amendmentNote: str(j['amendment_note']),
  );

  final String id;
  final String reference;
  final String title;
  final int version;
  final String status;
  final bool isPartial;
  final DateTime? releasedAt;
  final String? visitId;
  final String? patientName;
  final String? amendmentNote;

  bool get isCurrent => status == 'released';
}

@immutable
class CollectorCard {
  const CollectorCard({required this.name, required this.employeeCode, this.photoUrl, this.phone, this.qualification});

  factory CollectorCard.fromJson(Json j) => CollectorCard(
    name: strOr(j['name'], 'QXL collector'),
    employeeCode: strOr(j['employee_code'], ''),
    photoUrl: str(j['photo_url']),
    phone: str(j['phone']),
    qualification: str(j['qualification']),
  );

  final String name;
  final String employeeCode;
  final String? photoUrl;
  final String? phone;
  final String? qualification;
}

@immutable
class TimelineEntry {
  const TimelineEntry({required this.event, required this.at, this.details});

  factory TimelineEntry.fromJson(Json j) => TimelineEntry(
    event: strOr(j['event'], ''),
    at: dateTimeOrNull(j['at']) ?? DateTime.now(),
    details: j['details'] is Map ? asJson(j['details']) : null,
  );

  final String event;
  final DateTime at;
  final Json? details;
}

/// `GET /home-visits/{id}` — one home collection and everything about it.
@immutable
class HomeVisit {
  const HomeVisit({
    required this.id,
    required this.reference,
    required this.status,
    required this.stage,
    required this.paymentMode,
    required this.paymentStatus,
    required this.totalPaise,
    required this.collectionFeePaise,
    required this.patientName,
    required this.addressLine,
    required this.pincode,
    required this.slotDate,
    required this.slotLabel,
    required this.tests,
    this.visitCode,
    this.lat,
    this.lng,
    this.canCancel = false,
    this.canReschedule = false,
    this.jobStatus,
    this.isDelayed = false,
    this.delayNote,
    this.outcomeReason,
    this.collector,
    this.specimens = const [],
    this.reports = const [],
    this.timeline = const [],
    this.completedAt,
  });

  factory HomeVisit.fromJson(Json j) {
    final job = j['job'] is Map ? asJson(j['job']) : null;
    final address = asJson(j['address']);
    final patient = asJson(j['patient']);
    return HomeVisit(
      id: j['id'] as String,
      reference: strOr(j['reference'], ''),
      status: strOr(j['status'], 'confirmed'),
      stage: strOr(j['stage'], 'awaiting_assignment'),
      paymentMode: strOr(j['payment_mode'], 'online'),
      paymentStatus: strOr(j['payment_status'], 'unpaid'),
      totalPaise: intOrNull(j['total_paise']) ?? 0,
      collectionFeePaise: intOrNull(j['collection_fee_paise']) ?? 0,
      patientName: strOr(patient['name'], ''),
      addressLine: strOr(address['line'], ''),
      pincode: strOr(address['pincode'], ''),
      lat: doubleOrNull(address['lat']),
      lng: doubleOrNull(address['lng']),
      slotDate: DateTime.parse(j['slot_date'] as String),
      slotLabel: strOr(j['slot_label'], ''),
      visitCode: str(j['visit_code']),
      canCancel: boolOr(j['can_cancel'], false),
      canReschedule: boolOr(j['can_reschedule'], false),
      jobStatus: job == null ? null : str(job['status']),
      isDelayed: job != null && boolOr(job['is_delayed'], false),
      delayNote: job == null ? null : str(job['delay_note']),
      outcomeReason: job == null ? null : str(job['outcome_reason']),
      completedAt: job == null ? null : dateTimeOrNull(job['completed_at']),
      collector: j['collector'] is Map ? CollectorCard.fromJson(asJson(j['collector'])) : null,
      tests: asJsonList(j['tests']).map(VisitTest.fromJson).toList(),
      specimens: asJsonList(j['specimens']).map(VisitSpecimen.fromJson).toList(),
      reports: asJsonList(j['reports']).map(ReportSummary.fromJson).toList(),
      timeline: asJsonList(j['timeline']).map(TimelineEntry.fromJson).toList(),
    );
  }

  final String id;
  final String reference;
  final String status;

  /// Patient-facing stage computed by the server (see docs/COLLECT.md).
  final String stage;
  final String paymentMode;
  final String paymentStatus;
  final int totalPaise;
  final int collectionFeePaise;
  final String patientName;
  final String addressLine;
  final String pincode;
  final double? lat;
  final double? lng;
  final DateTime slotDate;
  final String slotLabel;
  final String? visitCode;
  final bool canCancel;
  final bool canReschedule;
  final String? jobStatus;
  final bool isDelayed;
  final String? delayNote;
  final String? outcomeReason;
  final DateTime? completedAt;
  final CollectorCard? collector;
  final List<VisitTest> tests;
  final List<VisitSpecimen> specimens;
  final List<ReportSummary> reports;
  final List<TimelineEntry> timeline;

  bool get awaitingPayment => stage == 'awaiting_payment';
  bool get isLive => stage == 'on_the_way' || stage == 'arrived';
  bool get isClosed => status == 'cancelled' || stage == 'report_ready';
}

@immutable
class Tracking {
  const Tracking({
    this.jobStatus,
    this.collector,
    this.lat,
    this.lng,
    this.locationAt,
    this.etaSeconds,
    this.distanceM,
    this.isDelayed = false,
    this.delayNote,
    this.destinationLat,
    this.destinationLng,
  });

  factory Tracking.fromJson(Json j) {
    final loc = j['location'] is Map ? asJson(j['location']) : null;
    final dest = j['destination'] is Map ? asJson(j['destination']) : null;
    return Tracking(
      jobStatus: str(j['job_status']),
      collector: j['collector'] is Map ? CollectorCard.fromJson(asJson(j['collector'])) : null,
      lat: loc == null ? null : doubleOrNull(loc['lat']),
      lng: loc == null ? null : doubleOrNull(loc['lng']),
      locationAt: loc == null ? null : dateTimeOrNull(loc['at']),
      etaSeconds: intOrNull(j['eta_seconds']),
      distanceM: intOrNull(j['distance_m']),
      isDelayed: boolOr(j['is_delayed'], false),
      delayNote: str(j['delay_note']),
      destinationLat: dest == null ? null : doubleOrNull(dest['lat']),
      destinationLng: dest == null ? null : doubleOrNull(dest['lng']),
    );
  }

  final String? jobStatus;
  final CollectorCard? collector;
  final double? lat;
  final double? lng;
  final DateTime? locationAt;
  final int? etaSeconds;
  final int? distanceM;
  final bool isDelayed;
  final String? delayNote;
  final double? destinationLat;
  final double? destinationLng;

  bool get hasLocation => lat != null && lng != null;
}

@immutable
class InboxItem {
  const InboxItem({
    required this.id,
    required this.kind,
    required this.title,
    required this.body,
    required this.read,
    required this.createdAt,
    this.data = const {},
  });

  factory InboxItem.fromJson(Json j) => InboxItem(
    id: j['id'] as String,
    kind: strOr(j['kind'], ''),
    title: strOr(j['title'], ''),
    body: strOr(j['body'], ''),
    read: boolOr(j['read'], false),
    createdAt: dateTimeOrNull(j['created_at']) ?? DateTime.now(),
    data: j['data'] is Map ? asJson(j['data']).map((k, v) => MapEntry(k, '$v')) : const {},
  );

  final String id;
  final String kind;
  final String title;
  final String body;
  final bool read;
  final DateTime createdAt;
  final Map<String, String> data;

  String? get visitId => data['visit_id'];
}

/// Patient-facing labels for server stages / lab statuses.
String visitStageLabel(String stage) => switch (stage) {
  'awaiting_payment' => 'Awaiting payment',
  'awaiting_assignment' => 'Confirmed — assigning a collector',
  'collector_assigned' => 'Collector assigned',
  'collector_confirmed' => 'Collector confirmed',
  'on_the_way' => 'Collector on the way',
  'arrived' => 'Collector has arrived',
  'collected' => 'Samples collected',
  'partially_collected' => 'Partly collected',
  'unsuccessful' => 'Collection not completed',
  'in_transit' => 'Samples on the way to the lab',
  'at_lab' => 'At the lab',
  'partial_report' => 'Partial report ready',
  'report_ready' => 'Report ready',
  'cancelled' => 'Cancelled',
  _ => titleCase(stage),
};

String labStatusLabel(String status) => switch (status) {
  'not_received' => 'Awaiting sample',
  'received' => 'Sample received',
  'in_progress' => 'Testing in progress',
  'under_review' => 'Report under review',
  'partial' => 'Partial report available',
  'delayed' => 'Report delayed',
  'on_hold' => 'On hold',
  'authorized' => 'Report ready',
  _ => titleCase(status),
};

String specimenStatusLabel(String status) => switch (status) {
  'collected' => 'Collected',
  'handed_over' => 'Handed to courier',
  'in_transit' => 'In transit',
  'received' => 'Received at lab',
  'accepted' => 'Accepted by lab',
  'rejected' => 'Needs recollection',
  'on_hold' => 'On hold at lab',
  'missing' => 'Under investigation',
  'damaged' => 'Damaged — recollection needed',
  _ => titleCase(status),
};
