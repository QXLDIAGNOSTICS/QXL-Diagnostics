import 'package:flutter/foundation.dart';

import '../../core/json.dart';

enum CollectionType {
  home('home'),
  center('center');

  const CollectionType(this.wire);
  final String wire;

  static CollectionType parse(Object? value) => value == 'center' ? CollectionType.center : CollectionType.home;
}

/// `BookingRead`.
@immutable
class Booking {
  const Booking({
    required this.id,
    required this.patientName,
    required this.patientPhone,
    required this.collectionType,
    required this.status,
    required this.paymentStatus,
    this.patientEmail,
    this.patientAge,
    this.patientGender,
    this.testName,
    this.testId,
    this.packageId,
    this.centerId,
    this.collectionAddress,
    this.preferredDate,
    this.preferredTime,
    this.notes,
    this.isUrgent = false,
    this.isDelayed = false,
    this.wasRescheduled = false,
    this.reportUrl,
    this.amountPaise,
    this.createdAt,
    this.updatedAt,
  });

  factory Booking.fromJson(Json json) => Booking(
    id: json['id'] as String,
    patientName: strOr(json['patient_name'], ''),
    patientPhone: strOr(json['patient_phone'], ''),
    patientEmail: str(json['patient_email']),
    patientAge: intOrNull(json['patient_age']),
    patientGender: str(json['patient_gender']),
    testName: str(json['test_name']),
    testId: str(json['test_id']),
    packageId: str(json['package_id']),
    centerId: str(json['center_id']),
    collectionType: CollectionType.parse(json['collection_type']),
    collectionAddress: str(json['collection_address']),
    preferredDate: str(json['preferred_date']),
    preferredTime: str(json['preferred_time']),
    status: strOr(json['status'], 'pending'),
    notes: str(json['notes']),
    isUrgent: boolOr(json['is_urgent'], false),
    isDelayed: boolOr(json['is_delayed'], false),
    wasRescheduled: boolOr(json['was_rescheduled'], false),
    reportUrl: str(json['report_url']),
    amountPaise: intOrNull(json['amount_paise']),
    paymentStatus: strOr(json['payment_status'], 'unpaid'),
    createdAt: dateTimeOrNull(json['created_at']),
    updatedAt: dateTimeOrNull(json['updated_at']),
  );

  final String id;
  final String patientName;
  final String patientPhone;
  final String? patientEmail;
  final int? patientAge;
  final String? patientGender;
  final String? testName;
  final String? testId;
  final String? packageId;
  final String? centerId;
  final CollectionType collectionType;
  final String? collectionAddress;

  /// ISO date (YYYY-MM-DD) after server normalisation.
  final String? preferredDate;

  /// Canonical slot label, e.g. "8:00 AM - 10:00 AM".
  final String? preferredTime;
  final String status;
  final String? notes;
  final bool isUrgent;
  final bool isDelayed;
  final bool wasRescheduled;
  final String? reportUrl;
  final int? amountPaise;
  final String paymentStatus;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  bool get isCancelled => status == 'cancelled';
  bool get isPaid => paymentStatus == 'paid';
  bool get hasReport => reportUrl != null && reportUrl!.isNotEmpty;

  /// Mirrors `payment_service.create_order` preconditions.
  bool get canPay => !isPaid && !isCancelled && status != 'no_show' && (amountPaise ?? 0) >= 100;

  bool get isActive => !const {'completed', 'cancelled', 'no_show'}.contains(status);
}

/// One server-defined window from `GET /bookings/slot-availability`.
@immutable
class SlotOption {
  const SlotOption({
    required this.label,
    required this.available,
    this.start,
    this.end,
    this.booked = 0,
    this.unavailableReason,
  });

  factory SlotOption.fromJson(Json json) => SlotOption(
    label: strOr(json['label'], ''),
    start: str(json['start']),
    end: str(json['end']),
    booked: intOrNull(json['booked']) ?? 0,
    available: boolOr(json['available'], false),
    unavailableReason: str(json['unavailable_reason']),
  );

  final String label;
  final String? start;
  final String? end;
  final int booked;
  final bool available;

  /// `past` or `full`.
  final String? unavailableReason;
}

@immutable
class SlotAvailability {
  const SlotAvailability({required this.date, required this.maxPerSlot, required this.slots});

  factory SlotAvailability.fromJson(Json json) => SlotAvailability(
    date: strOr(json['date'], ''),
    maxPerSlot: intOrNull(json['max_per_slot']) ?? 0,
    slots: asJsonList(json['slots']).map(SlotOption.fromJson).where((s) => s.label.isNotEmpty).toList(),
  );

  final String date;
  final int maxPerSlot;
  final List<SlotOption> slots;

  /// Whether a slot can hold [count] more bookings (each cart item is its
  /// own booking server-side and counts against the slot's capacity).
  bool canHold(SlotOption slot, int count) => slot.available && slot.booked + count <= maxPerSlot;
}

/// `BookingCreate` request body for one item.
@immutable
class BookingRequest {
  const BookingRequest({
    required this.patientName,
    required this.patientPhone,
    required this.collectionType,
    required this.preferredDate,
    required this.preferredTime,
    this.patientEmail,
    this.patientAge,
    this.patientGender,
    this.testId,
    this.packageId,
    this.centerId,
    this.collectionAddress,
    this.notes,
  });

  final String patientName;
  final String patientPhone;
  final String? patientEmail;
  final int? patientAge;
  final String? patientGender;
  final String? testId;
  final String? packageId;
  final String? centerId;
  final CollectionType collectionType;
  final String? collectionAddress;
  final String preferredDate;
  final String preferredTime;
  final String? notes;

  Json toJson() => {
    'patient_name': patientName,
    'patient_phone': patientPhone,
    if (patientEmail != null) 'patient_email': patientEmail,
    if (patientAge != null) 'patient_age': patientAge,
    if (patientGender != null) 'patient_gender': patientGender,
    if (testId != null) 'test_id': testId,
    if (packageId != null) 'package_id': packageId,
    if (centerId != null) 'center_id': centerId,
    'collection_type': collectionType.wire,
    if (collectionAddress != null) 'collection_address': collectionAddress,
    'preferred_date': preferredDate,
    'preferred_time': preferredTime,
    if (notes != null) 'notes': notes,
    'visit_type': 'scheduled',
  };
}

/// `CreateOrderResponse` — everything Razorpay Checkout needs.
@immutable
class PaymentOrder {
  const PaymentOrder({
    required this.keyId,
    required this.orderId,
    required this.amountPaise,
    required this.currency,
    required this.bookingIds,
    this.collectionFeePaise = 0,
    this.name,
    this.description,
  });

  factory PaymentOrder.fromJson(Json json) => PaymentOrder(
    keyId: strOr(json['key_id'], ''),
    orderId: strOr(json['order_id'], ''),
    amountPaise: intOrNull(json['amount']) ?? 0,
    currency: strOr(json['currency'], 'INR'),
    bookingIds: stringList(json['booking_ids']),
    collectionFeePaise: intOrNull(json['collection_fee']) ?? 0,
    name: str(json['name']),
    description: str(json['description']),
  );

  final String keyId;
  final String orderId;
  final int amountPaise;
  final String currency;
  final List<String> bookingIds;
  final int collectionFeePaise;
  final String? name;
  final String? description;

  bool get isUsable => keyId.isNotEmpty && orderId.isNotEmpty && amountPaise >= 100;
}

/// `PaymentRead` returned by `POST /payments/verify`.
@immutable
class PaymentRecord {
  const PaymentRecord({required this.id, required this.status, required this.amountPaise});

  factory PaymentRecord.fromJson(Json json) => PaymentRecord(
    id: strOr(json['id'], ''),
    status: strOr(json['status'], 'created'),
    amountPaise: intOrNull(json['amount']) ?? 0,
  );

  final String id;
  final String status;
  final int amountPaise;

  bool get isPaid => status == 'paid';
}
