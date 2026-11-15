import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/models/collect.dart';
import '../../data/providers.dart';
import '../../data/repositories/collect_repository.dart';
import '../auth/auth_controller.dart';

final collectRepositoryProvider = Provider((ref) => CollectRepository(ref.watch(apiClientProvider)));

final profilesProvider = FutureProvider.autoDispose<List<PatientProfile>>((ref) {
  if (ref.watch(currentUserIdProvider) == null) return const [];
  return ref.watch(collectRepositoryProvider).profiles();
});

final addressesProvider = FutureProvider.autoDispose<List<SavedAddress>>((ref) {
  if (ref.watch(currentUserIdProvider) == null) return const [];
  return ref.watch(collectRepositoryProvider).addresses();
});

final myVisitsProvider = FutureProvider<List<HomeVisit>>((ref) {
  if (ref.watch(currentUserIdProvider) == null) return const [];
  return ref.watch(collectRepositoryProvider).visits();
});

final visitProvider = FutureProvider.autoDispose.family<HomeVisit, String>((ref, id) {
  ref.watch(currentUserIdProvider);
  return ref.watch(collectRepositoryProvider).visit(id);
});

final myReportsProvider = FutureProvider.autoDispose<List<ReportSummary>>((ref) {
  if (ref.watch(currentUserIdProvider) == null) return const [];
  return ref.watch(collectRepositoryProvider).reports();
});

final inboxProvider = FutureProvider<({int unread, List<InboxItem> items})>((ref) {
  if (ref.watch(currentUserIdProvider) == null) return (unread: 0, items: const <InboxItem>[]);
  return ref.watch(collectRepositoryProvider).inbox();
});

/// Invalidate everything that a visit change can affect.
void refreshVisitData(WidgetRef ref, [String? visitId]) {
  ref.invalidate(myVisitsProvider);
  ref.invalidate(inboxProvider);
  if (visitId != null) ref.invalidate(visitProvider(visitId));
}
