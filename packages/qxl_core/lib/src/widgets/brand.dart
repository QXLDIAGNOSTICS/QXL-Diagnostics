import 'package:material_ui/material_ui.dart';

import '../theme/app_theme.dart';
import 'common.dart';

/// The website's primary call to action: a sky → blue gradient button.
class GradientButton extends StatelessWidget {
  const GradientButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.icon,
    this.busy = false,
    this.height = 54,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool busy;
  final double height;

  @override
  Widget build(BuildContext context) {
    final enabled = onPressed != null && !busy;
    return Semantics(
      button: true,
      enabled: enabled,
      label: busy ? '$label, please wait' : label,
      excludeSemantics: true,
      child: Opacity(
        opacity: enabled || busy ? 1 : 0.5,
        child: DecoratedBox(
          decoration: BoxDecoration(
            gradient: Brand.ctaGradient,
            borderRadius: BorderRadius.circular(14),
            boxShadow: enabled
                ? const [BoxShadow(color: Color(0x331055AE), blurRadius: 16, offset: Offset(0, 6))]
                : null,
          ),
          child: Material(
            type: MaterialType.transparency,
            child: InkWell(
              borderRadius: BorderRadius.circular(14),
              onTap: enabled ? onPressed : null,
              child: SizedBox(
                height: height,
                child: Center(
                  child: busy
                      ? const SizedBox(
                          width: 22,
                          height: 22,
                          child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white),
                        )
                      : Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            if (icon != null) ...[Icon(icon, color: Colors.white, size: 20), const SizedBox(width: 8)],
                            Flexible(
                              child: Text(
                                label,
                                overflow: TextOverflow.ellipsis,
                                style: context.text.labelLarge?.copyWith(
                                  color: Colors.white,
                                  fontSize: 15.5,
                                  letterSpacing: 0.3,
                                ),
                              ),
                            ),
                          ],
                        ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// White rounded card with the website's soft border and shadow.
class BrandCard extends StatelessWidget {
  const BrandCard({super.key, required this.child, this.padding = const EdgeInsets.all(16), this.onTap, this.color});

  final Widget child;
  final EdgeInsetsGeometry padding;
  final VoidCallback? onTap;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final light = context.theme.brightness == Brightness.light;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: color ?? (light ? Colors.white : context.colors.surfaceContainerLow),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: context.colors.outlineVariant),
        boxShadow: light ? Brand.cardShadow : null,
      ),
      child: Material(
        type: MaterialType.transparency,
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: onTap,
          child: Padding(padding: padding, child: child),
        ),
      ),
    );
  }
}

/// Logo + "QXL Diagnostics / Super Speciality Lab" lock-up, as in the site header.
class QxlWordmark extends StatelessWidget {
  const QxlWordmark({super.key, this.size = 40, this.subtitle = 'Super Speciality Lab', this.onDark = false});

  final double size;
  final String subtitle;
  final bool onDark;

  @override
  Widget build(BuildContext context) {
    final title = onDark ? Colors.white : Brand.navy;
    final sub = onDark ? Colors.white70 : Brand.muted;
    return Semantics(
      label: 'QXL Diagnostics',
      excludeSemantics: true,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          QxlLogo(size: size),
          SizedBox(width: size * 0.25),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'QXL Diagnostics',
                style: context.text.titleMedium?.copyWith(color: title, fontWeight: FontWeight.w800, height: 1.1),
              ),
              Text(subtitle, style: context.text.labelSmall?.copyWith(color: sub, letterSpacing: 0.4)),
            ],
          ),
        ],
      ),
    );
  }
}

/// Small rounded icon tile used in lists and quick actions.
class IconTile extends StatelessWidget {
  const IconTile({super.key, required this.icon, this.color, this.size = 44});

  final IconData icon;
  final Color? color;
  final double size;

  @override
  Widget build(BuildContext context) {
    final c = color ?? context.colors.primary;
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(color: c.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(size * 0.3)),
      child: Icon(icon, color: c, size: size * 0.5),
    );
  }
}
