import 'package:material_ui/material_ui.dart';

/// QXL brand palette — the official qxldiagnostics.com design tokens
/// (`public/qxl-design-tokens.css`): corporate navy, primary blue, light
/// blue surfaces, medical teal and the logo gold as a sparing accent.
abstract final class Brand {
  /// `--qxl-corporate-navy` — headings, dark headers.
  static const navy = Color(0xFF082C61);
  static const navyDeep = Color(0xFF061F45);

  /// `--qxl-neutral-text` / `--qxl-muted-text`.
  static const text = Color(0xFF142A43);
  static const muted = Color(0xFF52677D);

  /// `--qxl-primary-blue` — primary actions and links (7:1 on white).
  static const blue = Color(0xFF1055AE);
  static const blueDeep = Color(0xFF0C4590);

  /// `--qxl-light-blue` — tinted surfaces, selected states.
  static const blueSoft = Color(0xFFEAF6FF);

  /// Start of the "Book now" gradient (deepened from the site so white text
  /// stays above 4.5:1).
  static const sky = Color(0xFF1672C4);
  static const skySoft = Color(0xFFE6F3FD);

  /// `--qxl-medical-teal`.
  static const teal = Color(0xFF0B9B9A);

  /// `--qxl-logo-gold` — small highlights only. Never as text on white.
  static const gold = Color(0xFFD69A18);
  static const goldSoft = Color(0xFFFBF0D9);

  /// Accent for live/progress highlights.
  static const accent = sky;
  static const accentSoft = skySoft;

  /// `--qxl-surface-border` and the page canvas.
  static const border = Color(0xFFDCE8F5);
  static const canvas = Color(0xFFF5F9FE);

  static const ink = navy;

  // Logo ring colours, for category accents.
  static const coral = Color(0xFFF08A7E);
  static const peach = Color(0xFFF6C58E);
  static const lilac = Color(0xFF9D7CC0);
  static const mint = teal;
  static const amber = Color(0xFFF59E0B);

  static const dots = [sky, coral, lilac, teal, gold];

  /// The website's call-to-action gradient.
  static const ctaGradient = LinearGradient(colors: [sky, blue], begin: Alignment.centerLeft, end: Alignment.centerRight);

  /// Soft page-top wash behind headers.
  static const washGradient = LinearGradient(
    colors: [blueSoft, canvas],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  /// Dark header for the Collector app.
  static const fieldGradient = LinearGradient(
    colors: [navy, Color(0xFF0E4386)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  /// Card shadow (`--qxl-shadow-md`).
  static const cardShadow = [BoxShadow(color: Color(0x14082C61), blurRadius: 14, offset: Offset(0, 4))];

  /// A stable accent for a label (e.g. a category name).
  static Color accentFor(String key) => dots[key.codeUnits.fold(0, (a, b) => a + b) % dots.length];

  /// Font family bundled in qxl_core (Plus Jakarta Sans, SIL OFL).
  static const fontFamily = 'packages/qxl_core/PlusJakartaSans';
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
      seedColor: Brand.blue,
      primary: Brand.blue,
      onPrimary: Colors.white,
      primaryContainer: Brand.blueSoft,
      onPrimaryContainer: Brand.blueDeep,
      secondary: Brand.navy,
      onSecondary: Colors.white,
      secondaryContainer: Brand.skySoft,
      onSecondaryContainer: Brand.navy,
      tertiary: Brand.teal,
      surface: Colors.white,
      onSurface: Brand.text,
      onSurfaceVariant: Brand.muted,
      outline: const Color(0xFF94A3B8),
      outlineVariant: Brand.border,
      surfaceContainerLowest: Colors.white,
      surfaceContainerLow: const Color(0xFFF7FAFE),
      surfaceContainer: const Color(0xFFF0F6FD),
      surfaceContainerHigh: const Color(0xFFE8F1FB),
      surfaceContainerHighest: const Color(0xFFDFEAF7),
    ),
    StatusColors.light,
    canvas: Brand.canvas,
  );

  static ThemeData dark() => _build(
    ColorScheme.fromSeed(
      seedColor: Brand.blue,
      brightness: Brightness.dark,
      primary: const Color(0xFF93B4FF),
      onPrimary: const Color(0xFF0A2463),
      primaryContainer: const Color(0xFF1E3A8A),
      onPrimaryContainer: const Color(0xFFDBE6FF),
      secondary: const Color(0xFF7DD3FC),
      onSecondary: const Color(0xFF053049),
      surface: const Color(0xFF0B1424),
      onSurface: const Color(0xFFE6EDF7),
      surfaceContainerLow: const Color(0xFF101C30),
      surfaceContainer: const Color(0xFF14223A),
      surfaceContainerHigh: const Color(0xFF1A2A45),
      surfaceContainerHighest: const Color(0xFF213351),
      outlineVariant: const Color(0xFF26385A),
    ),
    StatusColors.dark,
    canvas: const Color(0xFF07101E),
  );

  static ThemeData _build(ColorScheme scheme, StatusColors status, {required Color canvas}) {
    final base = ThemeData(colorScheme: scheme, useMaterial3: true, fontFamily: Brand.fontFamily);
    final t = base.textTheme;
    final text = t.copyWith(
      displaySmall: t.displaySmall?.copyWith(fontWeight: FontWeight.w800, letterSpacing: -0.8),
      headlineLarge: t.headlineLarge?.copyWith(fontWeight: FontWeight.w800, letterSpacing: -0.8),
      headlineMedium: t.headlineMedium?.copyWith(fontWeight: FontWeight.w800, letterSpacing: -0.6),
      headlineSmall: t.headlineSmall?.copyWith(fontWeight: FontWeight.w700, letterSpacing: -0.4),
      titleLarge: t.titleLarge?.copyWith(fontWeight: FontWeight.w700, letterSpacing: -0.2),
      titleMedium: t.titleMedium?.copyWith(fontWeight: FontWeight.w700),
      titleSmall: t.titleSmall?.copyWith(fontWeight: FontWeight.w700),
      labelLarge: t.labelLarge?.copyWith(fontWeight: FontWeight.w700, letterSpacing: 0.1),
      labelMedium: t.labelMedium?.copyWith(fontWeight: FontWeight.w600),
      bodyLarge: t.bodyLarge?.copyWith(height: 1.45),
      bodyMedium: t.bodyMedium?.copyWith(height: 1.45),
    );
    const radius = BorderRadius.all(Radius.circular(20));
    const control = BorderRadius.all(Radius.circular(14));
    final light = scheme.brightness == Brightness.light;
    return base.copyWith(
      textTheme: text,
      scaffoldBackgroundColor: canvas,
      extensions: [status],
      appBarTheme: AppBarTheme(
        backgroundColor: canvas,
        foregroundColor: scheme.onSurface,
        surfaceTintColor: Colors.transparent,
        scrolledUnderElevation: 0.5,
        shadowColor: scheme.outlineVariant,
        centerTitle: false,
        titleTextStyle: text.titleLarge?.copyWith(color: scheme.onSurface, fontSize: 19),
      ),
      cardTheme: CardThemeData(
        elevation: 0,
        margin: EdgeInsets.zero,
        color: light ? Colors.white : scheme.surfaceContainerLow,
        shadowColor: const Color(0x140B2545),
        shape: RoundedRectangleBorder(borderRadius: radius, side: BorderSide(color: scheme.outlineVariant)),
        clipBehavior: Clip.antiAlias,
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          minimumSize: const Size(64, 52),
          shape: const RoundedRectangleBorder(borderRadius: control),
          textStyle: text.labelLarge?.copyWith(fontSize: 15.5),
          elevation: 0,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size(64, 52),
          shape: const RoundedRectangleBorder(borderRadius: control),
          side: BorderSide(color: scheme.outlineVariant, width: 1.4),
          foregroundColor: light ? Brand.navy : scheme.onSurface,
          textStyle: text.labelLarge?.copyWith(fontSize: 15.5),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(minimumSize: const Size(48, 48), textStyle: text.labelLarge),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: light ? Colors.white : scheme.surfaceContainer,
        border: const OutlineInputBorder(borderRadius: control),
        enabledBorder: OutlineInputBorder(borderRadius: control, borderSide: BorderSide(color: scheme.outlineVariant)),
        focusedBorder: OutlineInputBorder(borderRadius: control, borderSide: BorderSide(color: scheme.primary, width: 1.8)),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        labelStyle: TextStyle(color: scheme.onSurfaceVariant),
        prefixIconColor: scheme.onSurfaceVariant,
      ),
      chipTheme: base.chipTheme.copyWith(
        shape: const StadiumBorder(),
        side: BorderSide(color: scheme.outlineVariant),
        labelStyle: text.labelLarge,
        backgroundColor: light ? Colors.white : scheme.surfaceContainer,
        selectedColor: scheme.primaryContainer,
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: light ? Colors.white : scheme.surfaceContainer,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        height: 70,
        indicatorColor: scheme.primaryContainer,
        indicatorShape: const RoundedRectangleBorder(borderRadius: control),
        iconTheme: WidgetStateProperty.resolveWith(
          (s) => IconThemeData(color: s.contains(WidgetState.selected) ? scheme.primary : scheme.onSurfaceVariant),
        ),
        labelTextStyle: WidgetStateProperty.resolveWith(
          (s) => text.labelMedium?.copyWith(
            fontWeight: FontWeight.w700,
            color: s.contains(WidgetState.selected) ? scheme.primary : scheme.onSurfaceVariant,
          ),
        ),
      ),
      tabBarTheme: TabBarThemeData(
        labelColor: scheme.primary,
        unselectedLabelColor: scheme.onSurfaceVariant,
        indicatorColor: scheme.primary,
        labelStyle: text.labelLarge,
        unselectedLabelStyle: text.labelLarge?.copyWith(fontWeight: FontWeight.w600),
        dividerColor: scheme.outlineVariant,
      ),
      listTileTheme: ListTileThemeData(
        minVerticalPadding: 12,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16),
        iconColor: scheme.primary,
        titleTextStyle: text.titleSmall?.copyWith(color: scheme.onSurface, fontSize: 15),
      ),
      dividerTheme: DividerThemeData(color: scheme.outlineVariant, space: 1),
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        backgroundColor: Brand.navy,
        contentTextStyle: text.bodyMedium?.copyWith(color: Colors.white),
        shape: const RoundedRectangleBorder(borderRadius: control),
      ),
      bottomSheetTheme: BottomSheetThemeData(
        showDragHandle: true,
        backgroundColor: light ? Colors.white : scheme.surfaceContainerLow,
        surfaceTintColor: Colors.transparent,
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: light ? Colors.white : scheme.surfaceContainerLow,
        surfaceTintColor: Colors.transparent,
        shape: const RoundedRectangleBorder(borderRadius: radius),
      ),
      switchTheme: SwitchThemeData(
        trackOutlineColor: WidgetStateProperty.resolveWith(
          (s) => s.contains(WidgetState.selected) ? Colors.transparent : scheme.outline,
        ),
      ),
      progressIndicatorTheme: ProgressIndicatorThemeData(color: scheme.primary),
    );
  }
}
