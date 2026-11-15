import 'package:flutter_test/flutter_test.dart';
import 'package:qxl_core/qxl_core.dart';
import 'package:qxl_mobile/data/models/booking.dart';
import 'package:qxl_mobile/data/models/catalog.dart';
import 'package:qxl_mobile/data/models/records.dart';
import 'package:qxl_mobile/data/repositories/repositories.dart';

import '../support/fake_api.dart';

void main() {
  group('HealthPackage', () {
    test('parses the production shape including encoded benefits and breakdown', () {
      final p = HealthPackage.fromJson(packageJson());
      expect(p.benefits, ['Quick overall health snapshot', 'Check basic organ functions']);
      expect(p.details.sections.single.tests, ['Fasting Blood Sugar (FBS)', 'HbA1c']);
      expect(p.details.turnaround, 'Reports within 6 hours');
      expect(p.isBookableOnline, isTrue);
      expect(p.hasDiscount, isTrue);
    });

    test('contact-for-price packages are never bookable or discounted', () {
      final p = HealthPackage.fromJson(packageJson(price: 0, contactForPrice: true));
      expect(p.isBookableOnline, isFalse);
      expect(p.hasDiscount, isFalse);
    });
  });

  test('LabTest without a price is not bookable online', () {
    expect(LabTest.fromJson(testJson(price: null)).isBookableOnline, isFalse);
    expect(LabTest.fromJson(testJson()).isBookableOnline, isTrue);
  });

  group('SlotAvailability.canHold', () {
    final availability = SlotAvailability.fromJson(
      slotsJson(
        max: 3,
        slots: [
          {'label': 'A', 'booked': 1, 'available': true},
          {'label': 'B', 'booked': 3, 'available': false, 'unavailable_reason': 'full'},
        ],
      ),
    );

    test('checks remaining capacity for every item in the cart', () {
      final a = availability.slots.first;
      expect(availability.canHold(a, 2), isTrue);
      expect(availability.canHold(a, 3), isFalse);
    });

    test('never allows an unavailable slot', () {
      expect(availability.canHold(availability.slots.last, 1), isFalse);
    });
  });

  group('Booking', () {
    test('canPay mirrors the server preconditions', () {
      expect(Booking.fromJson(bookingJson()).canPay, isTrue);
      expect(Booking.fromJson(bookingJson(paymentStatus: 'paid')).canPay, isFalse);
      expect(Booking.fromJson(bookingJson(status: 'cancelled')).canPay, isFalse);
      expect(Booking.fromJson(bookingJson(amountPaise: null)).canPay, isFalse);
    });

    test('BookingRequest serialises ids and the slot label exactly', () {
      const request = BookingRequest(
        patientName: 'Asha Rao',
        patientPhone: '+919876543210',
        collectionType: CollectionType.center,
        preferredDate: '2030-01-15',
        preferredTime: '8:00 AM - 10:00 AM',
        packageId: 'p-1',
        centerId: 'c-1',
      );
      expect(request.toJson(), {
        'patient_name': 'Asha Rao',
        'patient_phone': '+919876543210',
        'package_id': 'p-1',
        'center_id': 'c-1',
        'collection_type': 'center',
        'preferred_date': '2030-01-15',
        'preferred_time': '8:00 AM - 10:00 AM',
        'visit_type': 'scheduled',
      });
    });
  });

  group('normalizeIndianPhone', () {
    test('matches the backend normalisation', () {
      expect(normalizeIndianPhone('98765 43210'), '+919876543210');
      expect(normalizeIndianPhone('+91-98765-43210'), '+919876543210');
      expect(normalizeIndianPhone('09876543210'), '+919876543210');
    });

    test('rejects numbers the SMS provider cannot reach', () {
      expect(normalizeIndianPhone('12345'), isNull);
      expect(normalizeIndianPhone('1234567890'), isNull);
    });
  });

  test('AppUser age is computed from date of birth', () {
    final user = AppUser.fromJson(userJson());
    expect(user.ageOn(DateTime(2030, 5, 3)), 39);
    expect(user.ageOn(DateTime(2030, 5, 4)), 40);
  });

  group('decodeChatEvent', () {
    test('maps every backend event', () {
      expect(decodeChatEvent('{"conversation_id": "c1"}'), isA<ChatConversationStarted>());
      expect((decodeChatEvent('{"delta": "Hi"}')! as ChatDelta).text, 'Hi');
      expect(decodeChatEvent('{"error": "generation_failed"}'), isA<ChatFailed>());
      expect(decodeChatEvent('[DONE]'), isA<ChatDone>());
      expect(decodeChatEvent('not json'), isNull);
    });

    test('accepts only complete payment orders', () {
      final event = decodeChatEvent(
        '{"payment_order": {"key_id": "rzp_test_x", "order_id": "order_1", "amount": 50000, "currency": "INR", "booking_ids": ["b1"]}}',
      );
      expect(event, isA<ChatPaymentOrder>());
      expect((event! as ChatPaymentOrder).order.bookingIds, ['b1']);
      expect(decodeChatEvent('{"payment_order": {"order_id": "order_1"}}'), isNull);
    });
  });
}
