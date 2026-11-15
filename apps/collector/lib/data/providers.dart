import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:qxl_core/qxl_core.dart';

import '../tracking/location_sharing.dart';
import 'job_actions.dart';
import 'models.dart';
import 'offline_store.dart';
import 'repository.dart';

final appConfigProvider = Provider<AppConfig>((ref) => throw UnimplementedError('appConfigProvider'));
final sessionStoreProvider = Provider<SessionStore>((ref) => throw UnimplementedError('sessionStoreProvider'));
final encryptedStoreProvider = Provider<EncryptedStore>((ref) => throw UnimplementedError('encryptedStoreProvider'));
final pushServiceProvider = Provider<PushService>((ref) => PushService(null));
final userAgentProvider = Provider<String>((ref) => 'QXLCollector');

final apiClientProvider = Provider<ApiClient>(
  (ref) => ApiClient(
    baseUrl: ref.watch(appConfigProvider).apiBaseUrl,
    session: ref.watch(sessionStoreProvider),
    userAgent: ref.watch(userAgentProvider),
  ),
);

final jobCacheProvider = Provider((ref) => JobCache(ref.watch(encryptedStoreProvider)));
final repositoryProvider = Provider(
  (ref) => CollectorRepository(ref.watch(apiClientProvider), ref.watch(jobCacheProvider)),
);

final offlineQueueProvider = ChangeNotifierProvider<OfflineQueue>(
  (ref) => OfflineQueue(ref.watch(apiClientProvider), ref.watch(encryptedStoreProvider)),
);

final jobActionsProvider = Provider((ref) => JobActions(ref.read(offlineQueueProvider), ref.watch(repositoryProvider)));

final locationSharingProvider = Provider<LocationSharing>((ref) {
  final sharing = LocationSharing(ref.watch(apiClientProvider));
  ref.onDispose(sharing.stop);
  return sharing;
});

/// Signed-in staff member's collector profile (null when signed out).
final sessionProvider = AsyncNotifierProvider<SessionController, CollectorMe?>(SessionController.new);

class SessionController extends AsyncNotifier<CollectorMe?> {
  StreamSubscription<bool>? _sub;

  @override
  Future<CollectorMe?> build() async {
    final session = ref.watch(sessionStoreProvider);
    unawaited(_sub?.cancel());
    _sub = session.changes.listen((has) {
      if (!has) state = const AsyncData(null);
    });
    ref.onDispose(() => _sub?.cancel());
    if (!session.hasSession) return null;
    final repo = ref.read(repositoryProvider);
    try {
      return await repo.profile();
    } on ApiException catch (e) {
      if (e.kind == ApiErrorKind.forbidden) {
        // Signed in but not a collector/courier: sign out of this app.
        await session.clear();
        throw const ApiException(
          kind: ApiErrorKind.forbidden,
          message: 'This account isn’t set up for the Collector app.',
        );
      }
      rethrow;
    }
  }

  Future<LoginChallenge> login(String identifier, String password) =>
      ref.read(repositoryProvider).login(identifier, password);

  Future<CollectorMe> verifyOtp(String challengeId, String otp) async {
    final repo = ref.read(repositoryProvider);
    final status = await repo.verifyOtp(challengeId, otp);
    final session = ref.read(sessionStoreProvider);
    if (!status.completed || !session.hasSession) {
      throw const ApiException(
        kind: ApiErrorKind.unauthorized,
        message: 'Sign-in could not be completed. Request a new code.',
      );
    }
    try {
      final me = await repo.profile();
      state = AsyncData(me);
      return me;
    } on ApiException catch (e) {
      await session.clear();
      if (e.kind == ApiErrorKind.forbidden) {
        throw ApiException(kind: e.kind, message: 'This account isn’t a collector or courier. Contact dispatch.');
      }
      rethrow;
    }
  }

  Future<void> refreshProfile() async {
    try {
      state = AsyncData(await ref.read(repositoryProvider).profile());
    } catch (_) {}
  }

  /// Signs out and wipes offline patient data. Refuses while actions are
  /// still waiting to sync, so no collection record is lost.
  Future<void> signOut({bool force = false}) async {
    final queue = ref.read(offlineQueueProvider);
    if (!force && queue.pendingCount > 0) {
      throw const ApiException(
        kind: ApiErrorKind.validation,
        message: 'Some actions haven’t synced yet. Connect to the internet and sync before signing out.',
      );
    }
    ref.read(locationSharingProvider).stop();
    final repo = ref.read(repositoryProvider);
    // Signing out ends the shift on this phone, so dispatch stops seeing
    // the collector as available. Best effort: offline sign-out still works.
    if (state.value?.onDuty ?? false) {
      try {
        await repo.setDuty(false);
      } catch (_) {}
    }
    try {
      await repo.logout();
    } catch (_) {}
    await queue.clear();
    await ref.read(encryptedStoreProvider).wipe();
    await ref.read(sessionStoreProvider).clear();
    state = const AsyncData(null);
  }
}

final jobsProvider = FutureProvider.autoDispose.family<(List<JobSummary>, bool), String>((ref, scope) async {
  ref.watch(sessionProvider.select((s) => s.value?.userId));
  final result = await ref.watch(repositoryProvider).jobs(scope);
  if (scope == 'today' && !result.$2) unawaited(ref.read(repositoryProvider).prefetch(result.$1));
  return result;
});

final jobProvider = FutureProvider.autoDispose.family<(JobDetail, bool), String>((ref, id) {
  return ref.watch(repositoryProvider).job(id);
});

final mySpecimensProvider = FutureProvider.autoDispose<List<CollectedSpecimen>>(
  (ref) => ref.watch(repositoryProvider).mySpecimens(),
);
final courierManifestsProvider = FutureProvider.autoDispose<List<Manifest>>(
  (ref) => ref.watch(repositoryProvider).courierManifests(),
);
final centresProvider = FutureProvider<List<LabCentre>>((ref) => ref.watch(repositoryProvider).centres());
