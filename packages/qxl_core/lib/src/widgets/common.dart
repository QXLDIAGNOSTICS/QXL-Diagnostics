import 'package:cached_network_image/cached_network_image.dart';
import 'package:material_ui/material_ui.dart';

import '../format.dart';
import '../theme/app_theme.dart';

/// Network image for public CMS assets, with a neutral fallback.
class NetImage extends StatelessWidget {
  const NetImage(
    this.url, {
    super.key,
    this.fit = BoxFit.cover,
    this.semanticLabel,
    this.fallbackIcon = Icons.image_outlined,
  });

  final String? url;
  final BoxFit fit;
  final String? semanticLabel;
  final IconData fallbackIcon;

  @override
  Widget build(BuildContext context) {
    final fallback = Container(
      color: context.colors.surfaceContainerHigh,
      alignment: Alignment.center,
      child: Icon(fallbackIcon, color: context.colors.outline),
    );
    final value = url;
    if (value == null || !value.startsWith('https://')) return fallback;
    return Semantics(
      image: true,
      label: semanticLabel,
      excludeSemantics: semanticLabel == null,
      child: CachedNetworkImage(
        imageUrl: value,
        fit: fit,
        fadeInDuration: const Duration(milliseconds: 150),
        placeholder: (_, _) => Container(color: context.colors.surfaceContainerHigh),
        errorWidget: (_, _, _) => fallback,
      ),
    );
  }
}

/// Price exactly as the server returns it. Contact-for-price items never
/// show a number.
class PriceView extends StatelessWidget {
  const PriceView({super.key, required this.price, this.oldPrice, this.contactForPrice = false, this.large = false});

  final int? price;
  final int? oldPrice;
  final bool contactForPrice;
  final bool large;

  @override
  Widget build(BuildContext context) {
    final style = (large ? context.text.headlineSmall : context.text.titleMedium)?.copyWith(
      color: context.colors.onSurface,
    );
    if (contactForPrice || price == null || price! <= 0) {
      return Text('Price on request', style: context.text.titleSmall?.copyWith(color: context.colors.onSurfaceVariant));
    }
    final showOld = oldPrice != null && oldPrice! > price!;
    return Semantics(
      label: showOld ? '${formatRupees(price!)}, was ${formatRupees(oldPrice!)}' : formatRupees(price!),
      excludeSemantics: true,
      child: Wrap(
        crossAxisAlignment: WrapCrossAlignment.end,
        spacing: 8,
        children: [
          Text(formatRupees(price!), style: style),
          if (showOld)
            Padding(
              padding: const EdgeInsets.only(bottom: 2),
              child: Text(
                formatRupees(oldPrice!),
                style: context.text.bodyMedium?.copyWith(
                  decoration: TextDecoration.lineThrough,
                  color: context.colors.onSurfaceVariant,
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class SectionHeader extends StatelessWidget {
  const SectionHeader({super.key, required this.title, this.actionLabel, this.onAction, this.padding});

  final String title;
  final String? actionLabel;
  final VoidCallback? onAction;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding ?? const EdgeInsets.fromLTRB(16, 24, 8, 8),
      child: Row(
        children: [
          Expanded(
            child: Semantics(header: true, child: Text(title, style: context.text.titleLarge)),
          ),
          if (actionLabel != null && onAction != null) TextButton(onPressed: onAction, child: Text(actionLabel!)),
        ],
      ),
    );
  }
}

class Tag extends StatelessWidget {
  const Tag(this.label, {super.key, this.color, this.icon});

  final String label;
  final Color? color;
  final IconData? icon;

  @override
  Widget build(BuildContext context) {
    final base = color ?? context.colors.primary;
    // Pastel accents fail contrast as text; shade them toward the surface's
    // opposite so labels stay readable (WCAG AA) in both themes.
    final dark = Theme.of(context).brightness == Brightness.dark;
    final fg = Color.lerp(base, dark ? Colors.white : Colors.black, dark ? 0.35 : 0.45)!;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(color: base.withValues(alpha: 0.12), borderRadius: BorderRadius.circular(8)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[Icon(icon, size: 14, color: fg), const SizedBox(width: 4)],
          Flexible(
            child: Text(
              label,
              style: context.text.labelSmall?.copyWith(color: fg, fontWeight: FontWeight.w700),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}

/// Icon + label + value row for facts like fasting, sample type, turnaround.
class FactRow extends StatelessWidget {
  const FactRow({super.key, required this.icon, required this.label, required this.value});

  final IconData icon;
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return MergeSemantics(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: context.colors.primaryContainer.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, size: 20, color: context.colors.onPrimaryContainer),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: context.text.labelMedium?.copyWith(color: context.colors.onSurfaceVariant)),
                  const SizedBox(height: 2),
                  Text(value, style: context.text.bodyLarge),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Persistent reminder that content is informational, not medical advice.
class MedicalNotice extends StatelessWidget {
  const MedicalNotice({super.key, this.text});

  final String? text;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: context.status.infoContainer, borderRadius: BorderRadius.circular(12)),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.info_outline, size: 20, color: context.status.info),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              text ??
                  'This information is for general awareness and is not medical advice. '
                      'Please consult a qualified doctor about your health and test results.',
              style: context.text.bodySmall?.copyWith(color: context.colors.onSurface),
            ),
          ),
        ],
      ),
    );
  }
}

class StatusPill extends StatelessWidget {
  const StatusPill({super.key, required this.label, required this.tone});

  final String label;
  final PillTone tone;

  @override
  Widget build(BuildContext context) {
    final (bg, fg) = switch (tone) {
      PillTone.success => (context.status.successContainer, context.status.success),
      PillTone.warning => (context.status.warningContainer, context.status.warning),
      PillTone.danger => (context.colors.errorContainer, context.colors.onErrorContainer),
      PillTone.info => (context.status.infoContainer, context.status.info),
      PillTone.neutral => (context.colors.surfaceContainerHighest, context.colors.onSurfaceVariant),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(20)),
      child: Text(
        label,
        style: context.text.labelMedium?.copyWith(color: fg, fontWeight: FontWeight.w700),
      ),
    );
  }
}

enum PillTone { success, warning, danger, info, neutral }

PillTone bookingTone(String status) => switch (status) {
  'completed' || 'report_ready' => PillTone.success,
  'cancelled' || 'no_show' => PillTone.danger,
  'pending' => PillTone.warning,
  'confirmed' || 'checked_in' || 'in_progress' || 'sample_collected' => PillTone.info,
  _ => PillTone.neutral,
};

PillTone paymentTone(String status) => switch (status) {
  'paid' => PillTone.success,
  'failed' => PillTone.danger,
  'refunded' => PillTone.neutral,
  _ => PillTone.warning,
};

class QxlLogo extends StatelessWidget {
  const QxlLogo({super.key, this.size = 40});

  final double size;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'QXL Diagnostics',
      image: true,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(size * 0.22),
        child: Image.asset(
          'assets/brand/qxl_logo.png',
          package: 'qxl_core',
          width: size,
          height: size,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}

/// Bottom-anchored primary action that respects the safe area and keyboard.
class BottomActionBar extends StatelessWidget {
  const BottomActionBar({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: context.colors.surfaceContainer,
      elevation: 3,
      child: SafeArea(
        top: false,
        child: Padding(padding: const EdgeInsets.fromLTRB(16, 12, 16, 12), child: child),
      ),
    );
  }
}

/// Underlined inline link with a full 48dp touch target.
class InlineLink extends StatelessWidget {
  const InlineLink(this.label, {super.key, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      link: true,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: ConstrainedBox(
          constraints: const BoxConstraints(minHeight: 48, minWidth: 48),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 2),
            child: Center(
              widthFactor: 1,
              child: Text(
                label,
                style: context.text.bodySmall?.copyWith(
                  color: context.colors.primary,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
