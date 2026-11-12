import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';

import '../network/api_exception.dart';
import '../theme/app_theme.dart';

/// Renders an [AsyncValue] with consistent loading, error+retry and data
/// states. Keeps showing previous data while refreshing.
class AsyncValueView<T> extends StatelessWidget {
  const AsyncValueView({
    super.key,
    required this.value,
    required this.data,
    this.onRetry,
    this.loading,
    this.compact = false,
  });

  final AsyncValue<T> value;
  final Widget Function(T data) data;
  final VoidCallback? onRetry;
  final Widget? loading;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    return value.when(
      data: data,
      loading: () => loading ?? const LoadingState(),
      error: (error, _) => ErrorState(error: error, onRetry: onRetry, compact: compact),
    );
  }
}

class LoadingState extends StatelessWidget {
  const LoadingState({super.key, this.label = 'Loading'});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Semantics(label: label, child: const CircularProgressIndicator()),
      ),
    );
  }
}

class ErrorState extends StatelessWidget {
  const ErrorState({super.key, required this.error, this.onRetry, this.compact = false});

  final Object error;
  final VoidCallback? onRetry;
  final bool compact;

  @override
  Widget build(BuildContext context) {
    final api = error is ApiException ? error as ApiException : null;
    final offline = api?.kind == ApiErrorKind.offline || api?.kind == ApiErrorKind.timeout;
    final message = describeError(error);
    if (compact) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          children: [
            Icon(Icons.error_outline, color: context.colors.error, size: 20),
            const SizedBox(width: 8),
            Expanded(child: Text(message, style: context.text.bodyMedium)),
            if (onRetry != null) TextButton(onPressed: onRetry, child: const Text('Retry')),
          ],
        ),
      );
    }
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(offline ? Icons.wifi_off_rounded : Icons.cloud_off_rounded, size: 56, color: context.colors.outline),
            const SizedBox(height: 16),
            Text(
              offline ? "Can't reach QXL" : 'Something went wrong',
              style: context.text.titleMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(message, style: context.text.bodyMedium, textAlign: TextAlign.center),
            if (onRetry != null) ...[
              const SizedBox(height: 20),
              FilledButton.tonalIcon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh),
                label: const Text('Try again'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class EmptyState extends StatelessWidget {
  const EmptyState({super.key, required this.icon, required this.title, this.message, this.action});

  final IconData icon;
  final String title;
  final String? message;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: context.colors.primaryContainer.withValues(alpha: 0.5),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, size: 40, color: context.colors.primary),
            ),
            const SizedBox(height: 20),
            Text(title, style: context.text.titleMedium, textAlign: TextAlign.center),
            if (message != null) ...[
              const SizedBox(height: 8),
              Text(
                message!,
                style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
                textAlign: TextAlign.center,
              ),
            ],
            if (action != null) ...[const SizedBox(height: 20), action!],
          ],
        ),
      ),
    );
  }
}

/// Lightweight pulsing placeholder used in place of spinners for lists.
class SkeletonBox extends StatefulWidget {
  const SkeletonBox({super.key, this.height = 16, this.width, this.radius = 12});

  final double height;
  final double? width;
  final double radius;

  @override
  State<SkeletonBox> createState() => _SkeletonBoxState();
}

class _SkeletonBoxState extends State<SkeletonBox> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 900),
  )..repeat(reverse: true);

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final color = context.colors.surfaceContainerHighest;
    final reduceMotion = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    return ExcludeSemantics(
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, _) => Container(
          height: widget.height,
          width: widget.width,
          decoration: BoxDecoration(
            color: reduceMotion ? color : Color.lerp(color, color.withValues(alpha: 0.4), _controller.value),
            borderRadius: BorderRadius.circular(widget.radius),
          ),
        ),
      ),
    );
  }
}

class SkeletonList extends StatelessWidget {
  const SkeletonList({super.key, this.count = 6, this.itemHeight = 88});

  final int count;
  final double itemHeight;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Loading',
      child: ListView.separated(
        physics: const NeverScrollableScrollPhysics(),
        padding: const EdgeInsets.all(16),
        itemCount: count,
        separatorBuilder: (_, _) => const SizedBox(height: 12),
        itemBuilder: (_, _) => SkeletonBox(height: itemHeight, radius: 16),
      ),
    );
  }
}

void showSnack(BuildContext context, String message) {
  ScaffoldMessenger.of(context)
    ..hideCurrentSnackBar()
    ..showSnackBar(SnackBar(content: Text(message)));
}
