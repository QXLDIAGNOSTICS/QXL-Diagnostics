import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';

import 'core/theme/app_theme.dart';
import 'routing/router.dart';

class QxlApp extends ConsumerWidget {
  const QxlApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
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
