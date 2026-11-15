import 'package:flutter/foundation.dart';

import 'package:qxl_core/qxl_core.dart';

/// `CenterRead`. Named to avoid clashing with Flutter's `Center` widget.
@immutable
class LabCenter {
  const LabCenter({
    required this.id,
    required this.name,
    required this.slug,
    required this.address,
    required this.city,
    this.phone,
    this.hours,
    this.lat,
    this.lng,
    this.isNabl = false,
    this.imageUrl,
    this.distanceKm,
  });

  factory LabCenter.fromJson(Json json) => LabCenter(
    id: json['id'] as String,
    name: strOr(json['name'], 'QXL centre'),
    slug: strOr(json['slug'], ''),
    address: strOr(json['address'], ''),
    city: strOr(json['city'], ''),
    phone: str(json['phone']),
    hours: str(json['hours']),
    lat: doubleOrNull(json['lat']),
    lng: doubleOrNull(json['lng']),
    isNabl: boolOr(json['is_nabl'], false),
    imageUrl: str(json['image_url']),
    distanceKm: doubleOrNull(json['distance_km']),
  );

  final String id;
  final String name;
  final String slug;
  final String address;
  final String city;
  final String? phone;
  final String? hours;
  final double? lat;
  final double? lng;
  final bool isNabl;
  final String? imageUrl;

  /// Computed by the server only when the request included a location.
  final double? distanceKm;

  bool get hasCoordinates => lat != null && lng != null;
}
