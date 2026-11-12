import 'dart:async';
import 'dart:convert';

import 'package:dio/dio.dart';

import '../../config/app_config.dart';
import 'api_exception.dart';
import 'session_store.dart';

typedef JsonDecoder<T> = T Function(Object? json);

/// Thin wrapper over Dio that speaks the QXL FastAPI contract:
/// session cookie handling, the error envelope, multipart and SSE.
class ApiClient {
  ApiClient({
    required String baseUrl,
    required this.session,
    String userAgent = 'QXLMobile',
    HttpClientAdapter? adapter,
  }) : _dio = Dio(
         BaseOptions(
           baseUrl: baseUrl,
           connectTimeout: const Duration(seconds: 15),
           receiveTimeout: const Duration(seconds: 30),
           sendTimeout: const Duration(seconds: 30),
           headers: {'Accept': 'application/json', 'User-Agent': userAgent},
           responseType: ResponseType.json,
         ),
       ) {
    if (adapter != null) _dio.httpClientAdapter = adapter;
    _dio.interceptors.add(SessionCookieInterceptor(session));
  }

  final Dio _dio;
  final SessionStore session;

  Future<T> get<T>(
    String path, {
    Map<String, dynamic>? query,
    required JsonDecoder<T> decode,
    CancelToken? cancelToken,
  }) => _send(() => _dio.get<Object?>(path, queryParameters: _clean(query), cancelToken: cancelToken), decode);

  Future<T> post<T>(
    String path, {
    Object? body,
    Map<String, dynamic>? query,
    required JsonDecoder<T> decode,
    CancelToken? cancelToken,
  }) => _send(
    () => _dio.post<Object?>(path, data: body, queryParameters: _clean(query), cancelToken: cancelToken),
    decode,
  );

  Future<T> patch<T>(String path, {Object? body, required JsonDecoder<T> decode}) =>
      _send(() => _dio.patch<Object?>(path, data: body), decode);

  Future<void> delete(String path) => _send(() => _dio.delete<Object?>(path), (_) {});

  /// Multipart upload of a single file field named `file`.
  Future<T> upload<T>(
    String path, {
    required String filePath,
    required String filename,
    required String mimeType,
    required JsonDecoder<T> decode,
    void Function(int sent, int total)? onProgress,
    CancelToken? cancelToken,
  }) async {
    final form = FormData.fromMap({
      'file': await MultipartFile.fromFile(filePath, filename: filename, contentType: DioMediaType.parse(mimeType)),
    });
    return _send(
      () => _dio.post<Object?>(
        path,
        data: form,
        cancelToken: cancelToken,
        onSendProgress: onProgress,
        options: Options(sendTimeout: const Duration(minutes: 3), receiveTimeout: const Duration(minutes: 2)),
      ),
      decode,
    );
  }

  /// Opens a `text/event-stream` POST and yields each `data:` payload.
  ///
  /// Non-2xx responses are read fully and surfaced as [ApiException] (e.g.
  /// the chat endpoint's `429 chat_limit_reached` envelope).
  Stream<String> postEventStream(String path, {Object? body, CancelToken? cancelToken}) async* {
    final Response<ResponseBody> response;
    try {
      response = await _dio.post<ResponseBody>(
        path,
        data: body,
        cancelToken: cancelToken,
        options: Options(
          responseType: ResponseType.stream,
          receiveTimeout: const Duration(minutes: 2),
          headers: {'Accept': 'text/event-stream'},
          validateStatus: (_) => true,
        ),
      );
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }

    final status = response.statusCode ?? 0;
    final stream = response.data!.stream.cast<List<int>>().transform(utf8.decoder);
    if (status < 200 || status >= 300) {
      final raw = await stream.join();
      Object? parsed;
      try {
        parsed = jsonDecode(raw);
      } catch (_) {
        parsed = null;
      }
      throw ApiException.fromResponse(status, parsed);
    }

    try {
      yield* parseServerSentEvents(stream);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<T> _send<T>(Future<Response<Object?>> Function() request, JsonDecoder<T> decode) async {
    try {
      final response = await request();
      return decode(response.data);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    } on TypeError {
      throw const ApiException(
        kind: ApiErrorKind.unknown,
        message: 'Received an unexpected response from QXL. Please update the app or try again later.',
      );
    } on FormatException {
      throw const ApiException(
        kind: ApiErrorKind.unknown,
        message: 'Received an unexpected response from QXL. Please try again later.',
      );
    }
  }

  static Map<String, dynamic>? _clean(Map<String, dynamic>? query) {
    if (query == null) return null;
    final result = <String, dynamic>{};
    query.forEach((key, value) {
      if (value != null && value != '') result[key] = value;
    });
    return result;
  }
}

/// Splits an SSE text stream into the payloads of its `data:` lines.
/// Multi-line events are joined with `\n`; comments and other fields are
/// ignored, matching the backend's single-line `data: {...}` events.
Stream<String> parseServerSentEvents(Stream<String> chunks) async* {
  final buffer = StringBuffer();
  final dataLines = <String>[];
  await for (final chunk in chunks) {
    buffer.write(chunk);
    var text = buffer.toString();
    var newline = text.indexOf('\n');
    while (newline != -1) {
      var line = text.substring(0, newline);
      text = text.substring(newline + 1);
      if (line.endsWith('\r')) line = line.substring(0, line.length - 1);
      if (line.isEmpty) {
        if (dataLines.isNotEmpty) {
          yield dataLines.join('\n');
          dataLines.clear();
        }
      } else if (line.startsWith('data:')) {
        final value = line.substring(5);
        dataLines.add(value.startsWith(' ') ? value.substring(1) : value);
      }
      newline = text.indexOf('\n');
    }
    buffer
      ..clear()
      ..write(text);
  }
  final rest = buffer.toString().trim();
  if (rest.startsWith('data:')) {
    final value = rest.substring(5);
    dataLines.add(value.startsWith(' ') ? value.substring(1) : value);
  }
  if (dataLines.isNotEmpty) yield dataLines.join('\n');
}

/// Replays the stored session cookie and captures new/cleared ones.
class SessionCookieInterceptor extends Interceptor {
  SessionCookieInterceptor(this._session);

  final SessionStore _session;

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final token = _session.token;
    if (token != null && token.isNotEmpty) {
      options.headers['Cookie'] = '${ApiContract.sessionCookieName}=$token';
      options.extra['qxl.sentSession'] = true;
    }
    handler.next(options);
  }

  @override
  Future<void> onResponse(Response<dynamic> response, ResponseInterceptorHandler handler) async {
    await _capture(response.headers);
    handler.next(response);
  }

  @override
  Future<void> onError(DioException err, ErrorInterceptorHandler handler) async {
    final response = err.response;
    if (response != null) {
      await _capture(response.headers);
      // The server rejected the cookie we sent (expired, idle-timed-out or
      // revoked): drop it so the app falls back to the signed-out state.
      if (response.statusCode == 401 && err.requestOptions.extra['qxl.sentSession'] == true) {
        await _session.clear();
      }
    }
    handler.next(err);
  }

  Future<void> _capture(Headers headers) async {
    final cookies = headers.map['set-cookie'];
    if (cookies == null) return;
    for (final raw in cookies) {
      final parsed = parseSessionCookie(raw);
      if (parsed == null) continue;
      if (parsed.isEmpty) {
        await _session.clear();
      } else {
        await _session.save(parsed);
      }
    }
  }
}

/// Returns the `qxl_session` value from a `Set-Cookie` header, `''` when the
/// header deletes the cookie, or `null` when it is about another cookie.
String? parseSessionCookie(String header) {
  final parts = header.split(';');
  final pair = parts.first.trim();
  final eq = pair.indexOf('=');
  if (eq <= 0) return null;
  if (pair.substring(0, eq).trim() != ApiContract.sessionCookieName) return null;

  var value = pair.substring(eq + 1).trim();
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    value = value.substring(1, value.length - 1);
  }
  for (final attribute in parts.skip(1)) {
    final attr = attribute.trim().toLowerCase();
    if (attr == 'max-age=0' || attr.startsWith('max-age=-')) return '';
    if (attr.startsWith('expires=')) {
      final expires = _tryParseHttpDate(attribute.trim().substring(8));
      if (expires != null && expires.isBefore(DateTime.now().toUtc())) return '';
    }
  }
  return value;
}

DateTime? _tryParseHttpDate(String value) {
  // RFC 1123, e.g. "Thu, 01 Jan 1970 00:00:00 GMT".
  final match = RegExp(r'(\d{1,2})[ -]([A-Za-z]{3})[ -](\d{4}) (\d{2}):(\d{2}):(\d{2})').firstMatch(value);
  if (match == null) return null;
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  final month = months.indexOf(match.group(2)!.toLowerCase()) + 1;
  if (month == 0) return null;
  return DateTime.utc(
    int.parse(match.group(3)!),
    month,
    int.parse(match.group(1)!),
    int.parse(match.group(4)!),
    int.parse(match.group(5)!),
    int.parse(match.group(6)!),
  );
}
