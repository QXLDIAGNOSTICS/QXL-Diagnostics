import 'dart:convert';

/// Defensive readers for API JSON. The backend schema is authoritative, but a
/// missing optional field must never crash a screen.
typedef Json = Map<String, dynamic>;

Json asJson(Object? value) => value is Map<Object?, Object?> ? Map<String, dynamic>.from(value) : <String, dynamic>{};

List<Json> asJsonList(Object? value) =>
    value is List ? value.whereType<Map<Object?, Object?>>().map(Map<String, dynamic>.from).toList() : const [];

String? str(Object? value) {
  if (value == null) return null;
  final text = value.toString().trim();
  return text.isEmpty ? null : text;
}

String strOr(Object? value, String fallback) => str(value) ?? fallback;

int? intOrNull(Object? value) => switch (value) {
  int v => v,
  double v => v.round(),
  String v => int.tryParse(v) ?? double.tryParse(v)?.round(),
  _ => null,
};

double? doubleOrNull(Object? value) => switch (value) {
  num v => v.toDouble(),
  String v => double.tryParse(v),
  _ => null,
};

bool boolOr(Object? value, bool fallback) => value is bool ? value : fallback;

DateTime? dateTimeOrNull(Object? value) => value is String ? DateTime.tryParse(value)?.toLocal() : null;

List<String> stringList(Object? value) {
  if (value is List) {
    return value.map(str).whereType<String>().toList();
  }
  return const [];
}

/// Some CMS fields store a JSON array serialised as a string
/// (e.g. package `benefits`, banner `features`).
List<String> stringListFromEncoded(Object? value) {
  if (value is List) return stringList(value);
  final text = str(value);
  if (text == null) return const [];
  if (text.startsWith('[')) {
    try {
      return stringList(jsonDecode(text));
    } catch (_) {
      return [text];
    }
  }
  return [text];
}
