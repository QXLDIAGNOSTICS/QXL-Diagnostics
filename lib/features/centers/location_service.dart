import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';

sealed class LocationResult {
  const LocationResult();
}

class LocationFound extends LocationResult {
  const LocationFound(this.lat, this.lng);
  final double lat;
  final double lng;
}

class LocationUnavailable extends LocationResult {
  const LocationUnavailable(this.message, {this.canOpenSettings = false});
  final String message;
  final bool canOpenSettings;
}

/// One-shot, coarse, foreground location — only after the user asks for it.
/// Nothing is stored; coordinates are sent once to sort centres.
class LocationService {
  const LocationService();

  Future<LocationResult> current() async {
    try {
      if (!await Geolocator.isLocationServiceEnabled()) {
        return const LocationUnavailable('Location is turned off on this device.', canOpenSettings: true);
      }
      var permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }
      if (permission == LocationPermission.denied) {
        return const LocationUnavailable('Location permission was not granted. You can still browse all centres.');
      }
      if (permission == LocationPermission.deniedForever) {
        return const LocationUnavailable(
          'Location access is blocked for QXL. You can allow it in Settings, or keep browsing all centres.',
          canOpenSettings: true,
        );
      }
      final position = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(accuracy: LocationAccuracy.low, timeLimit: Duration(seconds: 15)),
      );
      return LocationFound(position.latitude, position.longitude);
    } catch (_) {
      return const LocationUnavailable("Couldn't get your location right now. Showing all centres instead.");
    }
  }

  Future<void> openSettings() => Geolocator.openAppSettings();
}

final locationServiceProvider = Provider<LocationService>((ref) => const LocationService());
