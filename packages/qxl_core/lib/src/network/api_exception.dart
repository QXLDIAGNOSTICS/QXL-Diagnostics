import 'package:dio/dio.dart';

enum ApiErrorKind {
  offline,
  timeout,
  unauthorized,
  forbidden,
  notFound,
  validation,
  rateLimited,
  server,
  cancelled,
  unknown,
}

/// A failed API call, normalised from the backend's error envelope
/// `{"error": {"code", "message", "detail"}}`.
class ApiException implements Exception {
  const ApiException({required this.kind, required this.message, this.statusCode, this.code, this.detail});

  factory ApiException.fromDio(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.transformTimeout:
        return const ApiException(
          kind: ApiErrorKind.timeout,
          message: 'The server is taking too long to respond. Please try again.',
        );
      case DioExceptionType.connectionError:
        return const ApiException(
          kind: ApiErrorKind.offline,
          message: 'You appear to be offline. Check your connection and try again.',
        );
      case DioExceptionType.cancel:
        return const ApiException(kind: ApiErrorKind.cancelled, message: 'Cancelled');
      case DioExceptionType.badCertificate:
        return const ApiException(
          kind: ApiErrorKind.offline,
          message: 'A secure connection to QXL could not be established.',
        );
      case DioExceptionType.badResponse:
        final response = error.response;
        return ApiException.fromResponse(response?.statusCode, response?.data);
      case DioExceptionType.unknown:
        return const ApiException(kind: ApiErrorKind.unknown, message: 'Something went wrong. Please try again.');
    }
  }

  factory ApiException.fromResponse(int? status, Object? body) {
    String? code;
    String? message;
    Object? detail;
    if (body is Map && body['error'] is Map) {
      final envelope = body['error'] as Map;
      code = envelope['code'] as String?;
      message = envelope['message'] as String?;
      detail = envelope['detail'];
    } else if (body is Map && body['detail'] is String) {
      message = body['detail'] as String;
    }

    final kind = switch (status) {
      401 => ApiErrorKind.unauthorized,
      403 => ApiErrorKind.forbidden,
      404 => ApiErrorKind.notFound,
      400 || 409 || 422 => ApiErrorKind.validation,
      429 => ApiErrorKind.rateLimited,
      final s? when s >= 500 => ApiErrorKind.server,
      _ => ApiErrorKind.unknown,
    };

    // Pydantic request validation: surface the first human-readable reason.
    if (code == 'validation_error' && detail is List && detail.isNotEmpty) {
      final first = detail.first;
      if (first is Map && first['msg'] is String) {
        message = _cleanValidationMessage(first['msg'] as String);
      }
    }

    return ApiException(
      kind: kind,
      statusCode: status,
      code: code,
      detail: detail,
      message: message?.trim().isNotEmpty == true ? message!.trim() : _fallback(kind),
    );
  }

  final ApiErrorKind kind;
  final String message;
  final int? statusCode;
  final String? code;
  final Object? detail;

  bool get isRetryable => switch (kind) {
    ApiErrorKind.offline || ApiErrorKind.timeout || ApiErrorKind.server => true,
    _ => false,
  };

  static String _cleanValidationMessage(String raw) {
    const prefix = 'Value error, ';
    return raw.startsWith(prefix) ? raw.substring(prefix.length) : raw;
  }

  static String _fallback(ApiErrorKind kind) => switch (kind) {
    ApiErrorKind.unauthorized => 'Please sign in to continue.',
    ApiErrorKind.forbidden => "You don't have access to this.",
    ApiErrorKind.notFound => "We couldn't find what you were looking for.",
    ApiErrorKind.validation => 'Please check the details and try again.',
    ApiErrorKind.rateLimited => 'Too many attempts. Please wait a moment and try again.',
    ApiErrorKind.server => 'QXL is having trouble right now. Please try again shortly.',
    _ => 'Something went wrong. Please try again.',
  };

  @override
  String toString() => 'ApiException($kind, $statusCode, $code)';
}

/// User-facing text for any error thrown by the data layer.
String describeError(Object error) {
  if (error is ApiException) return error.message;
  if (error is DioException) return ApiException.fromDio(error).message;
  return 'Something went wrong. Please try again.';
}
