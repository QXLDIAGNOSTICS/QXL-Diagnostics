import 'dart:async';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:qxl_core/qxl_core.dart';

/// Shares the collector's location with the patient and dispatch only while
/// travelling to an assigned visit. Runs as an Android foreground service
/// with a visible notification; stops on arrival, completion or sign-out.
class LocationSharing extends ChangeNotifier {
  LocationSharing(this._api);

  final ApiClient _api;
  StreamSubscription<Position>? _sub;
  Timer? _flushTimer;
  String? _jobId;
  final List<Map<String, Object?>> _buffer = [];
  Position? _last;
  String? _error;

  String? get activeJobId => _jobId;
  bool get active => _jobId != null;
  Position? get lastPosition => _last;
  String? get error => _error;

  /// One-off fix for start/arrival stamps. Null when unavailable.
  static Future<Position?> currentFix() async {
    try {
      if (!await Geolocator.isLocationServiceEnabled()) return null;
      var permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied || permission == LocationPermission.deniedForever) return null;
      return await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(accuracy: LocationAccuracy.high, timeLimit: Duration(seconds: 12)),
      );
    } catch (_) {
      return null;
    }
  }

  Future<bool> start(String jobId) async {
    if (_jobId == jobId) return true;
    stop();
    try {
      if (!await Geolocator.isLocationServiceEnabled()) {
        _error = 'Turn on location to share your journey with the patient.';
        notifyListeners();
        return false;
      }
      var permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied || permission == LocationPermission.deniedForever) {
        _error = 'Location permission is needed to share your journey.';
        notifyListeners();
        return false;
      }
      _jobId = jobId;
      _error = null;
      final LocationSettings settings = Platform.isAndroid
          ? AndroidSettings(
              accuracy: LocationAccuracy.high,
              distanceFilter: 25,
              intervalDuration: const Duration(seconds: 10),
              foregroundNotificationConfig: const ForegroundNotificationConfig(
                notificationTitle: 'Sharing your journey',
                notificationText: 'QXL shares your location with the patient until you arrive.',
                notificationChannelName: 'Journey sharing',
                enableWakeLock: true,
              ),
            )
          : AppleSettings(
              accuracy: LocationAccuracy.high,
              distanceFilter: 25,
              activityType: ActivityType.automotiveNavigation,
              allowBackgroundLocationUpdates: true,
              showBackgroundLocationIndicator: true,
              pauseLocationUpdatesAutomatically: false,
            );
      _sub = Geolocator.getPositionStream(locationSettings: settings).listen(
        (p) {
          _last = p;
          _buffer.add({
            'lat': p.latitude,
            'lng': p.longitude,
            'accuracy_m': p.accuracy,
            'speed_mps': p.speed,
            'recorded_at': p.timestamp.toUtc().toIso8601String(),
          });
          if (_buffer.length > 60) _buffer.removeRange(0, _buffer.length - 60);
          notifyListeners();
        },
        onError: (Object e) {
          _error = 'Location unavailable';
          notifyListeners();
        },
      );
      _flushTimer = Timer.periodic(const Duration(seconds: 15), (_) => _flush());
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Couldn’t start location sharing.';
      _jobId = null;
      notifyListeners();
      return false;
    }
  }

  Future<void> _flush() async {
    final job = _jobId;
    if (job == null || _buffer.isEmpty) return;
    final batch = List.of(_buffer);
    try {
      await _api.post('/collector/jobs/$job/location', body: {'points': batch}, decode: (_) {});
      _buffer.removeRange(0, batch.length.clamp(0, _buffer.length));
    } catch (_) {
      // Keep the newest points and try again on the next tick.
    }
  }

  void stop() {
    _sub?.cancel();
    _sub = null;
    _flushTimer?.cancel();
    _flushTimer = null;
    if (_jobId != null) unawaited(_flush());
    _jobId = null;
    _buffer.clear();
    notifyListeners();
  }
}
