import 'package:flutter/foundation.dart';

import '../../core/json.dart';
import 'booking.dart';

/// `PrescriptionAnalysis` — machine output, never a diagnosis.
@immutable
class PrescriptionAnalysis {
  const PrescriptionAnalysis({
    this.tests = const [],
    this.medications = const [],
    this.diagnosisHints = const [],
    this.summary,
    this.disclaimer,
  });

  factory PrescriptionAnalysis.fromJson(Json json) => PrescriptionAnalysis(
    tests: stringList(json['tests']),
    medications: stringList(json['medications']),
    diagnosisHints: stringList(json['diagnosis_hints']),
    summary: str(json['summary']),
    disclaimer: str(json['disclaimer']),
  );

  final List<String> tests;
  final List<String> medications;
  final List<String> diagnosisHints;
  final String? summary;
  final String? disclaimer;

  bool get isEmpty => tests.isEmpty && medications.isEmpty && diagnosisHints.isEmpty && summary == null;
}

@immutable
class Prescription {
  const Prescription({
    required this.id,
    required this.filename,
    required this.contentType,
    required this.analysisStatus,
    this.fileId,
    this.analysis,
    this.errorMessage,
  });

  factory Prescription.fromJson(Json json) => Prescription(
    id: json['id'] as String,
    fileId: str(json['file_id']),
    filename: strOr(json['filename'], 'Prescription'),
    contentType: strOr(json['content_type'], ''),
    analysisStatus: strOr(json['analysis_status'], 'pending'),
    analysis: json['analysis'] is Map ? PrescriptionAnalysis.fromJson(asJson(json['analysis'])) : null,
    errorMessage: str(json['error_message']),
  );

  final String id;
  final String? fileId;
  final String filename;
  final String contentType;

  /// `pending`, `processing`, `completed` or `failed` (server-defined).
  final String analysisStatus;
  final PrescriptionAnalysis? analysis;
  final String? errorMessage;

  bool get isInProgress => analysisStatus == 'pending' || analysisStatus == 'processing';
  bool get isFailed => analysisStatus == 'failed';
  bool get isPdf => contentType == 'application/pdf';
}

/// `GET /prescriptions/quota`.
@immutable
class UploadQuota {
  const UploadQuota({required this.used, required this.limit, required this.remaining, this.resetsAt});

  factory UploadQuota.fromJson(Json json) => UploadQuota(
    used: intOrNull(json['used']) ?? 0,
    limit: intOrNull(json['limit']) ?? 0,
    remaining: intOrNull(json['remaining']) ?? 0,
    resetsAt: dateTimeOrNull(json['resets_at']),
  );

  final int used;
  final int limit;
  final int remaining;
  final DateTime? resetsAt;
}

/// `FileWithUrl` — the download URL is short-lived and signed.
@immutable
class StoredFile {
  const StoredFile({required this.id, required this.filename, required this.contentType, this.downloadUrl});

  factory StoredFile.fromJson(Json json) => StoredFile(
    id: strOr(json['id'], ''),
    filename: strOr(json['filename'], 'file'),
    contentType: strOr(json['content_type'], ''),
    downloadUrl: str(json['download_url']),
  );

  final String id;
  final String filename;
  final String contentType;
  final String? downloadUrl;
}

@immutable
class Conversation {
  const Conversation({required this.id, this.title, this.createdAt});

  factory Conversation.fromJson(Json json) =>
      Conversation(id: json['id'] as String, title: str(json['title']), createdAt: dateTimeOrNull(json['created_at']));

  final String id;
  final String? title;
  final DateTime? createdAt;
}

enum ChatRole { user, assistant }

@immutable
class ChatMessage {
  const ChatMessage({required this.role, required this.content, this.id, this.createdAt});

  factory ChatMessage.fromJson(Json json) => ChatMessage(
    id: str(json['id']),
    role: json['role'] == 'user' ? ChatRole.user : ChatRole.assistant,
    content: strOr(json['content'], ''),
    createdAt: dateTimeOrNull(json['created_at']),
  );

  final String? id;
  final ChatRole role;
  final String content;
  final DateTime? createdAt;

  ChatMessage copyWith({String? content}) =>
      ChatMessage(id: id, role: role, content: content ?? this.content, createdAt: createdAt);
}

@immutable
class ChatQuota {
  const ChatQuota({required this.used, required this.limit, required this.remaining, required this.kind});

  factory ChatQuota.fromJson(Json json) => ChatQuota(
    used: intOrNull(json['used']) ?? 0,
    limit: intOrNull(json['limit']) ?? 0,
    remaining: intOrNull(json['remaining']) ?? 0,
    kind: strOr(json['kind'], 'guest'),
  );

  final int used;
  final int limit;
  final int remaining;
  final String kind;
}

/// Events on `POST /chat/stream`.
sealed class ChatEvent {
  const ChatEvent();
}

class ChatConversationStarted extends ChatEvent {
  const ChatConversationStarted(this.conversationId);
  final String conversationId;
}

class ChatDelta extends ChatEvent {
  const ChatDelta(this.text);
  final String text;
}

/// The assistant created a Razorpay order for bookings it made on the
/// user's behalf. The app never pays automatically — it offers checkout.
class ChatPaymentOrder extends ChatEvent {
  const ChatPaymentOrder(this.order);
  final PaymentOrder order;
}

class ChatFailed extends ChatEvent {
  const ChatFailed(this.code);
  final String code;
}

class ChatDone extends ChatEvent {
  const ChatDone();
}
