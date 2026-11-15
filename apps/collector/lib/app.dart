import 'dart:async';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import 'data/models.dart';
import 'data/providers.dart';
import 'features/custody_screens.dart';
import 'features/home_screen.dart';
import 'features/job_screen.dart';
import 'features/login_screen.dart';

final _authRefresh = ValueNotifier<int>(0);

final routerProvider = Provider<GoRouter>((ref) {
  ref.listen(sessionProvider, (_, _) => _authRefresh.value++);
  return GoRouter(
    initialLocation: '/',
    refreshListenable: _authRefresh,
    redirect: (context, state) {
      final session = ref.read(sessionProvider);
      if (session.isLoading && !session.hasValue) return null;
      final signedIn = session.value != null;
      final atLogin = state.matchedLocation == '/login';
      if (!signedIn && !atLogin) return '/login';
      if (signedIn && atLogin) return '/';
      return null;
    },
    routes: [
      GoRoute(path: '/', builder: (_, _) => const HomeScreen()),
      GoRoute(path: '/login', builder: (_, _) => const LoginScreen()),
      GoRoute(
        path: '/jobs/:id',
        builder: (_, s) => JobScreen(id: s.pathParameters['id']!),
      ),
      GoRoute(path: '/handover', builder: (_, _) => const HandoverScreen()),
      GoRoute(
        path: '/manifests/:id',
        builder: (_, s) => ManifestScreen(manifest: s.extra! as Manifest),
      ),
      GoRoute(path: '/sync', builder: (_, _) => const SyncScreen()),
      GoRoute(path: '/profile', builder: (_, _) => const ProfileScreen()),
    ],
  );
});

class CollectorApp extends ConsumerStatefulWidget {
  const CollectorApp({super.key});

  @override
  ConsumerState<CollectorApp> createState() => _CollectorAppState();
}

class _CollectorAppState extends ConsumerState<CollectorApp> {
  Timer? _syncTimer;
  late final AppLifecycleListener _lifecycle;
  final _subs = <StreamSubscription<Object?>>[];

  @override
  void initState() {
    super.initState();
    final queue = ref.read(offlineQueueProvider);
    unawaited(queue.load().then((_) => queue.flush()));
    _syncTimer = Timer.periodic(const Duration(seconds: 30), (_) => queue.flush());
    _lifecycle = AppLifecycleListener(
      onResume: () {
        unawaited(queue.flush());
        ref.invalidate(jobsProvider('today'));
      },
    );
    final push = ref.read(pushServiceProvider);
    if (push.enabled) {
      _subs
        ..add(
          push.taps.listen((data) {
            final job = data['job_id'];
            if (job != null) ref.read(routerProvider).push('/jobs/$job');
          }),
        )
        ..add(push.foreground.listen((_) => ref.invalidate(jobsProvider('today'))))
        ..add(push.tokenRefresh.listen(_register));
    }
  }

  @override
  void dispose() {
    _syncTimer?.cancel();
    _lifecycle.dispose();
    for (final s in _subs) {
      s.cancel();
    }
    super.dispose();
  }

  Future<void> _register([String? token]) async {
    final push = ref.read(pushServiceProvider);
    final value = token ?? await push.token();
    if (value == null) return;
    try {
      await ref.read(repositoryProvider).registerDevice(value, Platform.isIOS ? 'ios' : 'android');
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(sessionProvider.select((s) => s.value?.userId), (prev, next) {
      if (next != null && next != prev) _register();
    });
    return MaterialApp.router(
      title: 'QXL Collector',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      routerConfig: ref.watch(routerProvider),
      builder: (context, child) {
        final media = MediaQuery.of(context);
        return MediaQuery(
          data: media.copyWith(textScaler: media.textScaler.clamp(maxScaleFactor: 1.8)),
          child: child ?? const SizedBox.shrink(),
        );
      },
    );
  }
}
