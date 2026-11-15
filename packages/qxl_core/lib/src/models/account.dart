import 'package:flutter/foundation.dart';

import '../json.dart';

/// `UserMe` from `GET /auth/me`.
@immutable
class AppUser {
  const AppUser({
    required this.id,
    required this.phone,
    this.email,
    this.name,
    this.dateOfBirth,
    this.role = 'patient',
    this.isEmailVerified = false,
    this.isPhoneVerified = false,
    this.isStaff = false,
  });

  factory AppUser.fromJson(Json json) => AppUser(
    id: json['id'] as String,
    phone: strOr(json['phone'], ''),
    email: str(json['email']),
    name: str(json['name']),
    dateOfBirth: json['date_of_birth'] is String ? DateTime.tryParse(json['date_of_birth'] as String) : null,
    role: strOr(json['role'], 'patient'),
    isEmailVerified: boolOr(json['is_email_verified'], false),
    isPhoneVerified: boolOr(json['is_phone_verified'], false),
    isStaff: boolOr(json['is_staff'], false),
  );

  final String id;
  final String phone;
  final String? email;
  final String? name;
  final DateTime? dateOfBirth;
  final String role;
  final bool isEmailVerified;
  final bool isPhoneVerified;
  final bool isStaff;

  bool get needsProfile => name == null || name!.trim().isEmpty;

  String get displayName => name?.trim().isNotEmpty == true ? name!.trim() : phone;

  /// Whole years, for pre-filling the booking form.
  int? ageOn(DateTime day) {
    final dob = dateOfBirth;
    if (dob == null) return null;
    var age = day.year - dob.year;
    if (day.month < dob.month || (day.month == dob.month && day.day < dob.day)) age--;
    return age < 0 ? null : age;
  }
}

/// `LoginChallengeResponse`.
@immutable
class LoginChallenge {
  const LoginChallenge({
    required this.challengeId,
    required this.maskedPhone,
    required this.otpExpiresIn,
    this.maskedEmail,
    this.requiresAdminSecret = false,
  });

  factory LoginChallenge.fromJson(Json json) => LoginChallenge(
    challengeId: json['challenge_id'] as String,
    maskedPhone: strOr(json['masked_phone'], ''),
    maskedEmail: str(json['masked_email']),
    otpExpiresIn: intOrNull(json['otp_expires_in']) ?? 300,
    requiresAdminSecret: boolOr(json['requires_admin_secret'], false),
  );

  final String challengeId;
  final String maskedPhone;
  final String? maskedEmail;

  /// Seconds.
  final int otpExpiresIn;
  final bool requiresAdminSecret;

  bool get emailedToo => maskedEmail != null && maskedEmail != '***';
}

/// `LoginStatusResponse`.
@immutable
class LoginStatus {
  const LoginStatus({required this.challengeId, required this.otpVerified, required this.completed});

  factory LoginStatus.fromJson(Json json) => LoginStatus(
    challengeId: json['challenge_id'] as String,
    otpVerified: boolOr(json['otp_verified'], false),
    completed: boolOr(json['completed'], false),
  );

  final String challengeId;
  final bool otpVerified;
  final bool completed;
}

/// Accepts what people type ("98765 43210", "+91-98765-43210", "098...")
/// and returns the E.164 form the backend's `normalize_phone_number` would
/// produce, or `null` when it can't be a valid number.
String? normalizeIndianPhone(String raw) {
  var digits = raw.replaceAll(RegExp(r'\D'), '');
  if (digits.length == 10) {
    digits = '91$digits';
  } else if (digits.length == 13 && digits.startsWith('091')) {
    digits = '91${digits.substring(3)}';
  } else if (digits.length == 11 && digits.startsWith('0')) {
    digits = '91${digits.substring(1)}';
  }
  if (digits.length < 8 || digits.length > 15) return null;
  // The SMS provider only reaches Indian mobiles (6–9 prefixes).
  if (digits.startsWith('91') && digits.length == 12 && !RegExp(r'^91[6-9]').hasMatch(digits)) {
    return null;
  }
  return '+$digits';
}
