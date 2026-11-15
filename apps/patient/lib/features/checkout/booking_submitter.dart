import '../../data/models/booking.dart';
import '../../data/repositories/repositories.dart';
import '../cart/cart_controller.dart';

/// Creates one server booking per cart item (the API books a single test or
/// package per booking) and remembers what already succeeded, so a retry
/// after a partial failure never creates duplicates.
class BookingSubmitter {
  BookingSubmitter(this._repository);

  final BookingRepository _repository;
  final Map<String, Booking> _created = {};
  bool _inFlight = false;

  Map<String, Booking> get created => Map.unmodifiable(_created);
  bool get hasCreated => _created.isNotEmpty;
  bool get inFlight => _inFlight;

  /// Books every item not booked yet, in order. Throws the first failure;
  /// successes before it are kept. Returns all bookings when complete.
  Future<List<Booking>> submit(List<CartItem> items, BookingRequest Function(CartItem item) requestFor) async {
    if (_inFlight) throw StateError('A booking request is already in progress.');
    _inFlight = true;
    try {
      for (final item in items) {
        if (_created.containsKey(item.key)) continue;
        _created[item.key] = await _repository.create(requestFor(item));
      }
      return [for (final item in items) _created[item.key]!];
    } finally {
      _inFlight = false;
    }
  }

  List<Booking> createdFor(List<CartItem> items) => [
    for (final item in items)
      if (_created[item.key] != null) _created[item.key]!,
  ];
}
