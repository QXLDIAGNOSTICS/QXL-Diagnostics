import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/network/api_exception.dart';
import '../../data/models/account.dart';
import '../../data/providers.dart';

/// The signed-in patient, or `null` for guests.
///
/// Restores the session on start by probing `GET /auth/me` with the stored
/// cookie; drops back to guest whenever the server rejects the cookie.
final authControllerProvider = AsyncNotifierProvider<AuthController, AppUser?>(AuthController.new);

/// Changes only when the account changes — user-scoped providers watch this
/// so they reload on sign-in and clear on sign-out.
final currentUserIdProvider = Provider<String?>((ref) {
  return ref.watch(authControllerProvider.select((s) => s.value?.id));
});

class AuthController extends AsyncNotifier<AppUser?> {
  StreamSubscription<bool>? _sessionSub;

  @override
  Future<AppUser?> build() async {
    final session = ref.watch(sessionStoreProvider);
    unawaited(_sessionSub?.cancel());
    _sessionSub = session.changes.listen((hasSession) {
      if (!hasSession && state.value != null) state = const AsyncData(null);
    });
    ref.onDispose(() => _sessionSub?.cancel());

    if (!session.hasSession) return null;
    final user = await ref.read(authRepositoryProvider).me();
    if (user == null) await session.clear();
    return user;
  }

  Future<LoginChallenge> requestOtp(String phoneE164) => ref.read(authRepositoryProvider).requestOtp(phoneE164);

  /// Completes login. Succeeds only once the server has issued a session
  /// cookie and `/auth/me` confirms it.
  Future<AppUser> verifyOtp({required String challengeId, required String otp}) async {
    final repo = ref.read(authRepositoryProvider);
    final status = await repo.verifyOtp(challengeId: challengeId, otp: otp);
    final session = ref.read(sessionStoreProvider);
    if (!status.completed || !session.hasSession) {
      throw const ApiException(
        kind: ApiErrorKind.unauthorized,
        message: "We couldn't finish signing you in. Please request a new code.",
      );
    }
    final user = await repo.me();
    if (user == null) {
      await session.clear();
      throw const ApiException(
        kind: ApiErrorKind.unauthorized,
        message: "We couldn't finish signing you in. Please try again.",
      );
    }
    state = AsyncData(user);
    return user;
  }

  /// Re-probes the session (e.g. after a network failure on start-up).
  Future<void> reload() async {
    ref.invalidateSelf();
    await future;
  }

  Future<void> updateProfile({required String name, String? email, DateTime? dateOfBirth}) async {
    final repo = ref.read(authRepositoryProvider);
    final current = state.value;
    final trimmedEmail = email?.trim();
    await repo.updateProfile(
      name: name.trim(),
      email: trimmedEmail?.isEmpty == true ? null : trimmedEmail,
      clearEmail: trimmedEmail?.isEmpty == true && current?.email != null,
      dateOfBirth: dateOfBirth,
    );
    final user = await repo.me();
    state = AsyncData(user);
  }

  Future<void> signOut() async {
    try {
      await ref.read(authRepositoryProvider).logout();
    } catch (_) {
      // Revoking server-side is best effort; the local session is always
      // cleared so the device is signed out regardless.
    } finally {
      await ref.read(sessionStoreProvider).clear();
      state = const AsyncData(null);
    }
  }
}
