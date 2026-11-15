import 'package:material_ui/material_ui.dart';

/// QXL brand palette. Ink navy is sampled from the QXL wordmark; the accent
/// dots echo the logo's colour ring.
abstract final class Brand {
  /// QXL navy (wordmark) — primary actions, headers.
  static const navy = Color(0xFF182A5C);
  static const navyDeep = Color(0xFF0F1D44);

  /// QXL gold (#D69A18) — accents and highlights. Never use as text on
  /// white (contrast ~2.6:1); use navy text on gold fills instead (~5.8:1).
  static const gold = Color(0xFFD69A18);
  static const goldSoft = Color(0xFFFBF0D9);

  // Kept for compatibility with existing call sites.
  static const ink = navy;
  static const blue = navy;

  static const sky = Color(0xFF6FB3E6);
  static const coral = Color(0xFFF08A7E);
  static const peach = Color(0xFFF6C58E);
  static const lilac = Color(0xFF9D7CC0);
  static const mint = Color(0xFF3FA98B);

  static const dots = [gold, coral, lilac, sky, mint];

  /// A stable accent for a label (e.g. a category name).
  static Color accentFor(String key) => dots[key.codeUnits.fold(0, (a, b) => a + b) % dots.length];
}

/// Semantic colours not covered by [ColorScheme].
@immutable
class StatusColors extends ThemeExtension<StatusColors> {
  const StatusColors({
    required this.success,
    required this.onSuccess,
    required this.successContainer,
    required this.warning,
    required this.warningContainer,
    required this.info,
    required this.infoContainer,
  });

  final Color success;
  final Color onSuccess;
  final Color successContainer;
  final Color warning;
  final Color warningContainer;
  final Color info;
  final Color infoContainer;

  static const light = StatusColors(
    success: Color(0xFF1E7A4C),
    onSuccess: Colors.white,
    successContainer: Color(0xFFDDF3E6),
    warning: Color(0xFF8A5300),
    warningContainer: Color(0xFFFFEBCC),
    info: Color(0xFF1F4FB8),
    infoContainer: Color(0xFFE2EAFE),
  );

  static const dark = StatusColors(
    success: Color(0xFF7FD8A4),
    onSuccess: Color(0xFF003920),
    successContainer: Color(0xFF16422C),
    warning: Color(0xFFFFC56B),
    warningContainer: Color(0xFF4A3200),
    info: Color(0xFFAFC6FF),
    infoContainer: Color(0xFF1D2F5C),
  );

  @override
  StatusColors copyWith() => this;

  @override
  StatusColors lerp(ThemeExtension<StatusColors>? other, double t) => t < 0.5 ? this : (other as StatusColors? ?? this);
}

extension ThemeX on BuildContext {
  ThemeData get theme => Theme.of(this);
  ColorScheme get colors => Theme.of(this).colorScheme;
  TextTheme get text => Theme.of(this).textTheme;
  StatusColors get status => Theme.of(this).extension<StatusColors>() ?? StatusColors.light;
}

abstract final class AppTheme {
  static ThemeData light() => _build(
    ColorScheme.fromSeed(
      seedColor: Brand.navy,
      primary: Brand.navy,
      onPrimary: Colors.white,
      secondary: Brand.gold,
      onSecondary: Brand.navyDeep,
      secondaryContainer: Brand.goldSoft,
      onSecondaryContainer: const Color(0xFF4A3300),
      tertiary: Brand.mint,
      surface: Colors.white,
    ),
    StatusColors.light,
  );

  static ThemeData dark() => _build(
    ColorScheme.fromSeed(
      seedColor: Brand.navy,
      brightness: Brightness.dark,
      primary: const Color(0xFFB9C7F2),
      onPrimary: Brand.navyDeep,
      secondary: const Color(0xFFEDB447),
      onSecondary: const Color(0xFF2B1D00),
      tertiary: const Color(0xFF8BD6BC),
    ),
    StatusColors.dark,
  );

  static ThemeData _build(ColorScheme scheme, StatusColors status) {
    final base = ThemeData(colorScheme: scheme, useMaterial3: true);
    final text = base.textTheme.copyWith(
      headlineMedium: base.textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w700, letterSpacing: -0.5),
      headlineSmall: base.textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700, letterSpacing: -0.3),
      titleLarge: base.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
      titleMedium: base.textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600),
      labelLarge: base.textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w600),
    );
    const radius = BorderRadius.all(Radius.circular(16));
    return base.copyWith(
      textTheme: text,
      scaffoldBackgroundColor: scheme.surface,
      extensions: [status],
      appBarTheme: AppBarTheme(
        backgroundColor: scheme.surface,
        foregroundColor: scheme.onSurface,
        surfaceTintColor: Colors.transparent,
        centerTitle: false,
        titleTextStyle: text.titleLarge?.copyWith(color: scheme.onSurface),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        margin: EdgeInsets.zero,
        color: scheme.surfaceContainerLow,
        shape: RoundedRectangleBorder(
          borderRadius: radius,
          side: BorderSide(color: scheme.outlineVariant.withValues(alpha: 0.6)),
        ),
        clipBehavior: Clip.antiAlias,
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size(64, 52),
          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(14))),
          textStyle: text.labelLarge?.copyWith(fontSize: 16),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size(64, 52),
          shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(14))),
          textStyle: text.labelLarge?.copyWith(fontSize: 16),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(minimumSize: const Size(48, 48), textStyle: text.labelLarge),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: scheme.surfaceContainerHighest.withValues(alpha: 0.5),
        border: const OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(14))),
        enabledBorder: OutlineInputBorder(
          borderRadius: const BorderRadius.all(Radius.circular(14)),
          borderSide: BorderSide(color: scheme.outlineVariant),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
      chipTheme: base.chipTheme.copyWith(
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(12))),
        labelStyle: text.labelLarge,
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: scheme.surfaceContainer,
        indicatorColor: scheme.primaryContainer,
        labelTextStyle: WidgetStatePropertyAll(text.labelMedium?.copyWith(fontWeight: FontWeight.w600)),
      ),
      listTileTheme: const ListTileThemeData(
        minVerticalPadding: 12,
        contentPadding: EdgeInsets.symmetric(horizontal: 16),
      ),
      dividerTheme: DividerThemeData(color: scheme.outlineVariant.withValues(alpha: 0.6), space: 1),
      snackBarTheme: const SnackBarThemeData(behavior: SnackBarBehavior.floating),
      bottomSheetTheme: const BottomSheetThemeData(showDragHandle: true),
    );
  }
}
