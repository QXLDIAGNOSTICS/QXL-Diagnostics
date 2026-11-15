import 'package:flutter/foundation.dart';

import 'package:qxl_core/qxl_core.dart';

enum CatalogKind {
  test,
  package;

  static CatalogKind? parse(Object? value) => switch (value) {
    'test' => CatalogKind.test,
    'package' => CatalogKind.package,
    _ => null,
  };
}

/// `TestCatalogRead`.
@immutable
class LabTest {
  const LabTest({
    required this.id,
    required this.name,
    required this.slug,
    this.category,
    this.description,
    this.price,
    this.preparation,
    this.turnaroundHours,
    this.isActive = true,
    this.homeCollectionAvailable = true,
    this.imageUrl,
  });

  factory LabTest.fromJson(Json json) => LabTest(
    id: json['id'] as String,
    name: strOr(json['name'], 'Unnamed test'),
    slug: strOr(json['slug'], ''),
    category: str(json['category']),
    description: str(json['description']),
    price: intOrNull(json['price']),
    preparation: str(json['preparation']),
    turnaroundHours: intOrNull(json['turnaround_hours']),
    isActive: boolOr(json['is_active'], true),
    homeCollectionAvailable: boolOr(json['home_collection_available'], true),
    imageUrl: str(json['image_url']),
  );

  final String id;
  final String name;
  final String slug;
  final String? category;
  final String? description;

  /// Rupees. `null` means the server has no price — never guess one.
  final int? price;
  final String? preparation;
  final int? turnaroundHours;
  final bool isActive;
  final bool homeCollectionAvailable;
  final String? imageUrl;

  bool get isBookableOnline => isActive && price != null && price! > 0;
}

/// One group in a package's `details.detailed_breakdown`.
@immutable
class PackageSection {
  const PackageSection({required this.title, required this.tests});

  factory PackageSection.fromJson(Json json) => PackageSection(
    title: strOr(json['categoryName'] ?? json['category_name'] ?? json['title'], 'Included tests'),
    tests: stringList(json['testsList'] ?? json['tests_list'] ?? json['tests']),
  );

  final String title;
  final List<String> tests;
}

/// The free-form `details` object on a package; only known keys are shown.
@immutable
class PackageDetails {
  const PackageDetails({
    this.fasting,
    this.turnaround,
    this.sampleType,
    this.guidanceLevel,
    this.mayHelpWhen,
    this.beforeBooking,
    this.keyTests = const [],
    this.sections = const [],
    this.priceDisplay,
  });

  factory PackageDetails.fromJson(Json json) => PackageDetails(
    fasting: str(json['fasting_hours']),
    turnaround: str(json['tat']),
    sampleType: str(json['sample_type']),
    guidanceLevel: str(json['guidance_level']),
    mayHelpWhen: str(json['may_help_when']),
    beforeBooking: str(json['before_booking']),
    keyTests: stringList(json['key_tests']),
    sections: asJsonList(json['detailed_breakdown']).map(PackageSection.fromJson).toList(),
    priceDisplay: str(json['price_display']),
  );

  final String? fasting;
  final String? turnaround;
  final String? sampleType;
  final String? guidanceLevel;
  final String? mayHelpWhen;
  final String? beforeBooking;
  final List<String> keyTests;
  final List<PackageSection> sections;
  final String? priceDisplay;
}

/// `HealthPackageRead`.
@immutable
class HealthPackage {
  const HealthPackage({
    required this.id,
    required this.name,
    required this.slug,
    required this.price,
    this.tag,
    this.oldPrice,
    this.saveAmount,
    this.parameters,
    this.includes,
    this.benefits = const [],
    this.whoShouldTake,
    this.ageGroup,
    this.gender,
    this.doctorRecommended = false,
    this.isActive = true,
    this.homeCollectionAvailable = true,
    this.imageUrl,
    this.category,
    this.showOnHome = false,
    this.mostBooked = false,
    this.contactForPrice = false,
    this.details = const PackageDetails(),
  });

  factory HealthPackage.fromJson(Json json) => HealthPackage(
    id: json['id'] as String,
    name: strOr(json['name'], 'Health package'),
    slug: strOr(json['slug'], ''),
    price: intOrNull(json['price']) ?? 0,
    tag: str(json['tag']),
    oldPrice: intOrNull(json['old_price']),
    saveAmount: intOrNull(json['save_amount']),
    parameters: str(json['parameters']),
    includes: str(json['includes']),
    benefits: stringListFromEncoded(json['benefits']),
    whoShouldTake: str(json['who_should_take']),
    ageGroup: str(json['age_group']),
    gender: str(json['gender']),
    doctorRecommended: boolOr(json['doctor_recommended'], false),
    isActive: boolOr(json['is_active'], true),
    homeCollectionAvailable: boolOr(json['home_collection_available'], true),
    imageUrl: str(json['image_url']),
    category: str(json['category']),
    showOnHome: boolOr(json['show_on_home'], false),
    mostBooked: boolOr(json['most_booked'], false),
    contactForPrice: boolOr(json['contact_for_price'], false),
    details: json['details'] is Map ? PackageDetails.fromJson(asJson(json['details'])) : const PackageDetails(),
  );

  final String id;
  final String name;
  final String slug;

  /// Rupees.
  final int price;
  final String? tag;
  final int? oldPrice;
  final int? saveAmount;
  final String? parameters;
  final String? includes;
  final List<String> benefits;
  final String? whoShouldTake;
  final String? ageGroup;
  final String? gender;
  final bool doctorRecommended;
  final bool isActive;
  final bool homeCollectionAvailable;
  final String? imageUrl;
  final String? category;
  final bool showOnHome;
  final bool mostBooked;
  final bool contactForPrice;
  final PackageDetails details;

  /// Mirrors `booking_service.is_package_bookable_online`.
  bool get isBookableOnline => isActive && !contactForPrice && price > 0;

  /// A discount is shown only when the server sends a higher old price.
  bool get hasDiscount => oldPrice != null && oldPrice! > price && isBookableOnline;
}

/// `CatalogResolveMatch` — what a free-text name would book, per the server.
@immutable
class CatalogMatch {
  const CatalogMatch({
    required this.query,
    required this.kind,
    required this.id,
    required this.name,
    this.price,
    this.homeCollectionAvailable = true,
  });

  factory CatalogMatch.fromJson(Json json) => CatalogMatch(
    query: strOr(json['query'], ''),
    kind: CatalogKind.parse(json['kind']) ?? CatalogKind.test,
    id: json['id'] as String,
    name: strOr(json['name'], ''),
    price: intOrNull(json['price']),
    homeCollectionAvailable: boolOr(json['home_collection_available'], true),
  );

  final String query;
  final CatalogKind kind;
  final String id;
  final String name;
  final int? price;
  final bool homeCollectionAvailable;
}
