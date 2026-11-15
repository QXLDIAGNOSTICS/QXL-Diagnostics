import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:material_ui/material_ui.dart';

import '../config/app_config.dart';
import '../theme/app_theme.dart';

/// Bengaluru city centre — the initial view when nothing better is known.
const bengaluru = LatLng(12.9716, 77.5946);

/// A marker shown on [QxlMap].
class MapPin {
  const MapPin({required this.point, required this.kind, this.label});

  final LatLng point;
  final MapPinKind kind;
  final String? label;
}

enum MapPinKind { home, collector, lab }

/// OpenStreetMap-based map used by both apps (tiles from [AppConfig]).
class QxlMap extends StatelessWidget {
  const QxlMap({
    super.key,
    required this.config,
    this.pins = const [],
    this.center,
    this.zoom = 15,
    this.controller,
    this.interactive = true,
    this.onMoved,
    this.fitPins = false,
  });

  final AppConfig config;
  final List<MapPin> pins;
  final LatLng? center;
  final double zoom;
  final MapController? controller;
  final bool interactive;
  final bool fitPins;

  /// Called with the map centre whenever the user stops moving the map.
  final ValueChanged<LatLng>? onMoved;

  @override
  Widget build(BuildContext context) {
    final start = center ?? (pins.isNotEmpty ? pins.first.point : bengaluru);
    final canFit = fitPins && pins.length > 1;
    return FlutterMap(
      mapController: controller,
      options: MapOptions(
        initialCenter: start,
        initialZoom: zoom,
        initialCameraFit: canFit
            ? CameraFit.coordinates(coordinates: [for (final p in pins) p.point], padding: const EdgeInsets.all(56))
            : null,
        interactionOptions: InteractionOptions(
          flags: interactive ? InteractiveFlag.all & ~InteractiveFlag.rotate : InteractiveFlag.none,
        ),
        onPositionChanged: onMoved == null
            ? null
            : (camera, hasGesture) {
                if (hasGesture) onMoved!(camera.center);
              },
      ),
      children: [
        TileLayer(urlTemplate: config.mapTileUrl, userAgentPackageName: 'com.qxldiagnostics.app'),
        MarkerLayer(
          markers: [
            for (final pin in pins)
              Marker(
                point: pin.point,
                width: 44,
                height: 44,
                child: Semantics(
                  label: pin.label,
                  child: _PinIcon(kind: pin.kind),
                ),
              ),
          ],
        ),
        RichAttributionWidget(attributions: [TextSourceAttribution(config.mapAttribution)]),
      ],
    );
  }
}

class _PinIcon extends StatelessWidget {
  const _PinIcon({required this.kind});

  final MapPinKind kind;

  @override
  Widget build(BuildContext context) {
    final (icon, color) = switch (kind) {
      MapPinKind.home => (Icons.home_rounded, Brand.navy),
      MapPinKind.collector => (Icons.directions_bike_rounded, Brand.gold),
      MapPinKind.lab => (Icons.science_rounded, Brand.mint),
    };
    return Container(
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
        border: Border.all(color: Colors.white, width: 3),
        boxShadow: const [BoxShadow(blurRadius: 6, color: Colors.black26)],
      ),
      child: Icon(icon, color: Colors.white, size: 22),
    );
  }
}

/// Fixed centre pin for "move the map under the pin" location picking.
class CenterPin extends StatelessWidget {
  const CenterPin({super.key});

  @override
  Widget build(BuildContext context) {
    return IgnorePointer(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.only(bottom: 40),
          child: Icon(
            Icons.location_on,
            size: 48,
            color: Brand.navy,
            shadows: const [Shadow(blurRadius: 6, color: Colors.black38)],
          ),
        ),
      ),
    );
  }
}
