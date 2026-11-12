import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../config/app_config.dart';
import '../core/network/api_client.dart';
import '../core/network/session_store.dart';
import 'models/catalog.dart';
import 'models/content.dart';
import 'repositories/repositories.dart';

/// Overridden in `main()` (and in tests) with the loaded instances.
final appConfigProvider = Provider<AppConfig>((ref) => throw UnimplementedError('appConfigProvider'));
final sessionStoreProvider = Provider<SessionStore>((ref) => throw UnimplementedError('sessionStoreProvider'));
final userAgentProvider = Provider<String>((ref) => 'QXLMobile');

final apiClientProvider = Provider<ApiClient>(
  (ref) => ApiClient(
    baseUrl: ref.watch(appConfigProvider).apiBaseUrl,
    session: ref.watch(sessionStoreProvider),
    userAgent: ref.watch(userAgentProvider),
  ),
);

final catalogRepositoryProvider = Provider((ref) => CatalogRepository(ref.watch(apiClientProvider)));
final contentRepositoryProvider = Provider((ref) => ContentRepository(ref.watch(apiClientProvider)));
final centersRepositoryProvider = Provider((ref) => CentersRepository(ref.watch(apiClientProvider)));
final authRepositoryProvider = Provider((ref) => AuthRepository(ref.watch(apiClientProvider)));
final bookingRepositoryProvider = Provider((ref) => BookingRepository(ref.watch(apiClientProvider)));
final paymentRepositoryProvider = Provider((ref) => PaymentRepository(ref.watch(apiClientProvider)));
final prescriptionRepositoryProvider = Provider((ref) => PrescriptionRepository(ref.watch(apiClientProvider)));
final chatRepositoryProvider = Provider((ref) => ChatRepository(ref.watch(apiClientProvider)));

// ── Shared, cacheable public data ───────────────────────────────────────────

final siteSettingsProvider = FutureProvider<SiteSettings>((ref) => ref.watch(contentRepositoryProvider).settings());

final allPackagesProvider = FutureProvider<List<HealthPackage>>((ref) async {
  final packages = await ref.watch(catalogRepositoryProvider).packages();
  return packages.where((p) => p.isActive).toList();
});

final allTestsProvider = FutureProvider<List<LabTest>>((ref) async {
  final tests = await ref.watch(catalogRepositoryProvider).tests();
  return tests.where((t) => t.isActive).toList();
});

final featuredPackagesProvider = FutureProvider<List<HealthPackage>>((ref) async {
  final packages = await ref.watch(catalogRepositoryProvider).packages(homeOnly: true);
  return packages.where((p) => p.isActive).toList();
});

final bannersProvider = FutureProvider<List<PromoBanner>>((ref) => ref.watch(contentRepositoryProvider).banners());

final specialitiesProvider = FutureProvider<List<Speciality>>(
  (ref) => ref.watch(contentRepositoryProvider).specialities(),
);

final doctorsProvider = FutureProvider<List<Doctor>>((ref) => ref.watch(contentRepositoryProvider).doctors());

final faqsProvider = FutureProvider<List<Faq>>((ref) => ref.watch(contentRepositoryProvider).faqs());

final reviewsProvider = FutureProvider<Paged<Review>>((ref) => ref.watch(contentRepositoryProvider).reviews(limit: 10));

final testProvider = FutureProvider.autoDispose.family<LabTest, String>(
  (ref, id) => ref.watch(catalogRepositoryProvider).test(id),
);

final packageProvider = FutureProvider.autoDispose.family<HealthPackage, String>(
  (ref, id) => ref.watch(catalogRepositoryProvider).package(id),
);

final specialityProvider = FutureProvider.autoDispose.family<Speciality, String>(
  (ref, slug) => ref.watch(contentRepositoryProvider).speciality(slug),
);
