import 'dart:async';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import 'data/providers.dart';
import 'features/auth/auth_controller.dart';
import 'features/visits/collect_providers.dart';
import 'routing/router.dart';

class QxlApp extends ConsumerStatefulWidget {
  const QxlApp({super.key});

  @override
  ConsumerState<QxlApp> createState() => _QxlAppState();
}

class _QxlAppState extends ConsumerState<QxlApp> {
  final _subs = <StreamSubscription<Object?>>[];

  @override
  void initState() {
    super.initState();
    final push = ref.read(pushServiceProvider);
    if (!push.enabled) return;
    _subs
      ..add(push.taps.listen(_openFromNotification))
      ..add(
        push.foreground.listen((data) {
          // Refresh whatever the message is about; the inbox mirrors it.
          ref.invalidate(inboxProvider);
          final visitId = data['visit_id'];
          if (visitId != null) refreshVisitData(ref, visitId);
        }),
      )
      ..add(push.tokenRefresh.listen(_register));
  }

  @override
  void dispose() {
    for (final s in _subs) {
      s.cancel();
    }
    super.dispose();
  }

  void _openFromNotification(Map<String, String> data) {
    final visitId = data['visit_id'];
    final router = ref.read(routerProvider);
    if (visitId != null) {
      router.push(Routes.visit(visitId));
    } else {
      router.push(Routes.inbox);
    }
  }

  Future<void> _register([String? token]) async {
    if (ref.read(currentUserIdProvider) == null) return;
    final push = ref.read(pushServiceProvider);
    final value = token ?? await push.token();
    if (value == null) return;
    try {
      await ref.read(collectRepositoryProvider).registerDevice(value, Platform.isIOS ? 'ios' : 'android');
    } catch (_) {
      // Retried on the next sign-in or token refresh.
    }
  }

  @override
  Widget build(BuildContext context) {
    // Register the device for push whenever someone signs in.
    ref.listen(currentUserIdProvider, (previous, next) {
      if (next != null && next != previous) _register();
    });
    final router = ref.watch(routerProvider);
    return MaterialApp.router(
      title: 'QXL Diagnostics',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      routerConfig: router,
      builder: (context, child) {
        // Respect the user's text size, but cap extreme scales so key
        // booking controls stay usable.
        final media = MediaQuery.of(context);
        return MediaQuery(
          data: media.copyWith(textScaler: media.textScaler.clamp(maxScaleFactor: 2.0)),
          child: child ?? const SizedBox.shrink(),
        );
      },
    );
  }
}
