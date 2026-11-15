import 'package:flutter/foundation.dart';
import 'package:qxl_core/qxl_core.dart';

@immutable
class CollectorMe {
  const CollectorMe({
    required this.userId,
    required this.role,
    required this.name,
    required this.employeeCode,
    required this.zone,
    required this.shiftStart,
    required this.shiftEnd,
    required this.onDuty,
    this.photoUrl,
    this.phone,
    this.competencies = const [],
    this.qualification,
    this.workingDays = const [],
    this.today = 0,
    this.completedToday = 0,
    this.pendingToday = 0,
    this.unsuccessfulToday = 0,
  });

  factory CollectorMe.fromJson(Json j) {
    final stats = asJson(j['stats']);
    return CollectorMe(
      userId: j['user_id'] as String,
      role: strOr(j['role'], 'collector'),
      name: strOr(j['name'], ''),
      employeeCode: strOr(j['employee_code'], ''),
      zone: strOr(j['zone'], ''),
      shiftStart: strOr(j['shift_start'], ''),
      shiftEnd: strOr(j['shift_end'], ''),
      onDuty: boolOr(j['on_duty'], false),
      photoUrl: str(j['photo_url']),
      phone: str(j['phone']),
      competencies: stringList(j['competencies']),
      qualification: str(j['qualification']),
      workingDays: (j['working_days'] is List)
          ? [for (final d in j['working_days'] as List) intOrNull(d) ?? 0]
          : const [],
      today: intOrNull(stats['today']) ?? 0,
      completedToday: intOrNull(stats['completed_today']) ?? 0,
      pendingToday: intOrNull(stats['pending_today']) ?? 0,
      unsuccessfulToday: intOrNull(stats['unsuccessful_today']) ?? 0,
    );
  }

  final String userId;
  final String role;
  final String name;
  final String employeeCode;
  final String zone;
  final String shiftStart;
  final String shiftEnd;
  final bool onDuty;
  final String? photoUrl;
  final String? phone;
  final List<String> competencies;
  final String? qualification;
  final List<int> workingDays;
  final int today;
  final int completedToday;
  final int pendingToday;
  final int unsuccessfulToday;

  bool get isCourier => role == 'courier';
  bool get isCollector => role == 'collector';
}

@immutable
class JobSummary {
  const JobSummary({
    required this.id,
    required this.reference,
    required this.status,
    required this.kind,
    required this.visitReference,
    required this.slotDate,
    required this.slotLabel,
    required this.patientName,
    required this.locality,
    required this.pincode,
    required this.tests,
    required this.paymentMode,
    this.lat,
    this.lng,
    this.isDelayed = false,
    this.visitStatus = 'confirmed',
  });

  factory JobSummary.fromJson(Json j) => JobSummary(
    id: j['id'] as String,
    reference: strOr(j['reference'], ''),
    status: strOr(j['status'], 'assigned'),
    kind: strOr(j['kind'], 'initial'),
    visitReference: strOr(j['visit_reference'], ''),
    slotDate: DateTime.parse(j['slot_date'] as String),
    slotLabel: strOr(j['slot_label'], ''),
    patientName: strOr(j['patient_name'], ''),
    locality: strOr(j['locality'], ''),
    pincode: strOr(j['pincode'], ''),
    tests: stringList(j['tests']),
    paymentMode: strOr(j['payment_mode'], 'online'),
    lat: doubleOrNull(j['lat']),
    lng: doubleOrNull(j['lng']),
    isDelayed: boolOr(j['is_delayed'], false),
    visitStatus: strOr(j['visit_status'], 'confirmed'),
  );

  final String id;
  final String reference;
  final String status;
  final String kind;
  final String visitReference;
  final DateTime slotDate;
  final String slotLabel;
  final String patientName;
  final String locality;
  final String pincode;
  final List<String> tests;
  final String paymentMode;
  final double? lat;
  final double? lng;
  final bool isDelayed;
  final String visitStatus;

  bool get isOpen => const {'assigned', 'acknowledged', 'en_route', 'arrived'}.contains(status);
}

@immutable
class Requirement {
  const Requirement({
    required this.bookingId,
    required this.name,
    this.containerType,
    this.sampleType,
    this.instructions,
    this.fastingRequired,
    this.preparation,
  });

  factory Requirement.fromJson(Json j) => Requirement(
    bookingId: j['booking_id'] as String,
    name: strOr(j['name'], 'Test'),
    containerType: str(j['container_type']),
    sampleType: str(j['sample_type']),
    instructions: str(j['instructions']),
    fastingRequired: j['fasting_required'] is bool ? j['fasting_required'] as bool : null,
    preparation: str(j['preparation']),
  );

  final String bookingId;
  final String name;
  final String? containerType;
  final String? sampleType;
  final String? instructions;
  final bool? fastingRequired;
  final String? preparation;
}

@immutable
class CollectedSpecimen {
  const CollectedSpecimen({
    required this.barcode,
    required this.containerType,
    required this.bookingIds,
    required this.status,
    this.sampleType,
    this.collectedAt,
    this.pendingSync = false,
  });

  factory CollectedSpecimen.fromJson(Json j) => CollectedSpecimen(
    barcode: strOr(j['barcode'], ''),
    containerType: strOr(j['container_type'], ''),
    sampleType: str(j['sample_type']),
    bookingIds: stringList(j['booking_ids']),
    status: strOr(j['status'], 'collected'),
    collectedAt: dateTimeOrNull(j['collected_at']),
    pendingSync: boolOr(j['_pending'], false),
  );

  final String barcode;
  final String containerType;
  final String? sampleType;
  final List<String> bookingIds;
  final String status;
  final DateTime? collectedAt;
  final bool pendingSync;
}

/// `GET /collector/jobs/{id}` (possibly with offline changes applied).
@immutable
class JobDetail {
  const JobDetail(this.json);

  final Json json;

  String get id => json['id'] as String;
  String get reference => strOr(json['reference'], '');
  String get kind => strOr(json['kind'], 'initial');
  String get status => strOr(json['status'], 'assigned');
  String get visitReference => strOr(json['visit_reference'], '');
  String get visitStatus => strOr(json['visit_status'], 'confirmed');
  DateTime get slotDate => DateTime.parse(json['slot_date'] as String);
  String get slotLabel => strOr(json['slot_label'], '');
  Json get _patient => asJson(json['patient']);
  String get patientName => strOr(_patient['name'], '');
  DateTime? get patientDob =>
      _patient['date_of_birth'] is String ? DateTime.tryParse(_patient['date_of_birth'] as String) : null;
  String? get patientGender => str(_patient['gender']);
  String? get patientPhone => str(_patient['phone']);
  int? get patientAge => intOrNull(_patient['age']);
  Json get _address => asJson(json['address']);
  String get addressLine => strOr(_address['line'], '');
  String? get landmark => str(_address['landmark']);
  String? get addressInstructions => str(_address['instructions']);
  double? get lat => doubleOrNull(_address['lat']);
  double? get lng => doubleOrNull(_address['lng']);
  String? get notes => str(json['notes']);
  List<Requirement> get requirements => asJsonList(json['requirements']).map(Requirement.fromJson).toList();
  List<Json> get recollect => asJsonList(json['recollect']);
  String get paymentMode => strOr(json['payment_mode'], 'online');
  int get amountDuePaise => intOrNull(json['amount_due_paise']) ?? 0;
  bool get identityVerified => boolOr(json['identity_verified'], false);
  List<CollectedSpecimen> get specimens => asJsonList(json['specimens']).map(CollectedSpecimen.fromJson).toList();
  List<String> get checklistKeys => stringList(json['checklist_keys']);
  bool get isDelayed => boolOr(json['is_delayed'], false);
  String? get outcomeReason => str(json['outcome_reason']);
  bool get hasPin => lat != null && lng != null;

  bool get isOpen => const {'assigned', 'acknowledged', 'en_route', 'arrived'}.contains(status);

  /// Tests without any specimen yet.
  List<Requirement> get uncovered {
    final covered = {for (final s in specimens) ...s.bookingIds};
    return requirements.where((r) => !covered.contains(r.bookingId)).toList();
  }

  JobDetail copyWith(Json changes) => JobDetail({...json, ...changes});
}

@immutable
class Manifest {
  const Manifest({
    required this.id,
    required this.reference,
    required this.status,
    required this.specimens,
    this.custodianName,
    this.destinationName,
    this.sealIntact,
    this.createdAt,
  });

  factory Manifest.fromJson(Json j) => Manifest(
    id: j['id'] as String,
    reference: strOr(j['reference'], ''),
    status: strOr(j['status'], 'open'),
    specimens: asJsonList(j['specimens']).map(CollectedSpecimen.fromJson).toList(),
    custodianName: j['custodian'] is Map ? str(asJson(j['custodian'])['name']) : null,
    destinationName: j['destination'] is Map ? str(asJson(j['destination'])['name']) : null,
    sealIntact: j['seal_intact'] is bool ? j['seal_intact'] as bool : null,
    createdAt: dateTimeOrNull(j['created_at']),
  );

  final String id;
  final String reference;
  final String status;
  final List<CollectedSpecimen> specimens;
  final String? custodianName;
  final String? destinationName;
  final bool? sealIntact;
  final DateTime? createdAt;
}

@immutable
class LabCentre {
  const LabCentre({required this.id, required this.name, this.address});

  factory LabCentre.fromJson(Json j) =>
      LabCentre(id: j['id'] as String, name: strOr(j['name'], 'Lab'), address: str(j['address']));

  final String id;
  final String name;
  final String? address;
}

String jobStatusLabel(String s) => switch (s) {
  'assigned' => 'New — please acknowledge',
  'acknowledged' => 'Acknowledged',
  'en_route' => 'On the way',
  'arrived' => 'At patient',
  'collected' => 'Collected',
  'partially_collected' => 'Partly collected',
  'unsuccessful' => 'Unsuccessful',
  'cancelled' => 'Cancelled',
  _ => titleCase(s),
};

PillTone jobTone(String s) => switch (s) {
  'assigned' => PillTone.warning,
  'en_route' || 'arrived' => PillTone.info,
  'collected' => PillTone.success,
  'partially_collected' => PillTone.warning,
  'unsuccessful' || 'cancelled' => PillTone.danger,
  _ => PillTone.neutral,
};

/// Standard tube types collectors pick from (labels only; the lab's SOP per
/// test comes from the catalogue `container_type`).
const containerTypes = <String>[
  'EDTA',
  'SST',
  'Fluoride',
  'Citrate',
  'Heparin',
  'Urine container',
  'Swab / VTM',
  'Stool container',
  'Other',
];
