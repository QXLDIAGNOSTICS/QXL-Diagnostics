import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/launch.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/common.dart';
import '../../core/widgets/states.dart';
import '../../data/models/lab_center.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import 'location_service.dart';

typedef LatLng = ({double lat, double lng});

final centersProvider = FutureProvider.autoDispose.family<List<LabCenter>, LatLng?>(
  (ref, location) => ref.watch(centersRepositoryProvider).centers(lat: location?.lat, lng: location?.lng),
);

/// Lists active centres. With `pickForBooking`, tapping a centre returns it
/// to the caller (checkout) instead of opening its page.
class CentersScreen extends ConsumerStatefulWidget {
  const CentersScreen({super.key, this.pickForBooking = false});

  final bool pickForBooking;

  @override
  ConsumerState<CentersScreen> createState() => _CentersScreenState();
}

class _CentersScreenState extends ConsumerState<CentersScreen> {
  LatLng? _location;
  bool _locating = false;
  String? _city;

  Future<void> _useLocation() async {
    final allowed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        icon: const Icon(Icons.near_me_outlined),
        title: const Text('Sort centres by distance?'),
        content: const Text(
          'QXL will ask for your approximate location once, to show the nearest centres first. '
          "It isn't stored, and you can keep browsing without it.",
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Not now')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Continue')),
        ],
      ),
    );
    if (allowed != true || !mounted) return;
    setState(() => _locating = true);
    final service = ref.read(locationServiceProvider);
    final result = await service.current();
    if (!mounted) return;
    setState(() => _locating = false);
    switch (result) {
      case LocationFound(:final lat, :final lng):
        setState(() => _location = (lat: lat, lng: lng));
      case LocationUnavailable(:final message, :final canOpenSettings):
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            persist: false,
            content: Text(message),
            action: canOpenSettings ? SnackBarAction(label: 'Settings', onPressed: service.openSettings) : null,
          ),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    final centers = ref.watch(centersProvider(_location));
    return Scaffold(
      appBar: AppBar(title: Text(widget.pickForBooking ? 'Choose a centre' : 'Our centres')),
      body: AsyncValueView<List<LabCenter>>(
        value: centers,
        loading: const SkeletonList(itemHeight: 120),
        onRetry: () => ref.invalidate(centersProvider(_location)),
        data: (all) {
          final cities = {
            for (final c in all)
              if (c.city.isNotEmpty) c.city,
          }.toList()..sort();
          final visible = _city == null ? all : all.where((c) => c.city == _city).toList();
          return RefreshIndicator(
            onRefresh: () => ref.refresh(centersProvider(_location).future),
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        _location == null ? '${all.length} centres' : 'Nearest first',
                        style: context.text.labelLarge?.copyWith(color: context.colors.onSurfaceVariant),
                      ),
                    ),
                    if (_location == null)
                      TextButton.icon(
                        onPressed: _locating ? null : _useLocation,
                        icon: _locating
                            ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                            : const Icon(Icons.near_me_outlined),
                        label: const Text('Use my location'),
                      )
                    else
                      TextButton(
                        onPressed: () => setState(() => _location = null),
                        child: const Text('Clear location'),
                      ),
                  ],
                ),
                if (cities.length > 1)
                  Wrap(
                    spacing: 8,
                    children: [
                      ChoiceChip(
                        label: const Text('All cities'),
                        selected: _city == null,
                        onSelected: (_) => setState(() => _city = null),
                      ),
                      for (final c in cities)
                        ChoiceChip(label: Text(c), selected: _city == c, onSelected: (_) => setState(() => _city = c)),
                    ],
                  ),
                const SizedBox(height: 8),
                if (visible.isEmpty)
                  const Padding(
                    padding: EdgeInsets.only(top: 48),
                    child: EmptyState(icon: Icons.location_off_outlined, title: 'No centres to show'),
                  ),
                for (final c in visible) ...[
                  CenterCard(
                    center: c,
                    onTap: widget.pickForBooking ? () => context.pop(c) : () => context.push(Routes.center(c.slug)),
                    actionLabel: widget.pickForBooking ? 'Select' : null,
                  ),
                  const SizedBox(height: 12),
                ],
              ],
            ),
          );
        },
      ),
    );
  }
}

class CenterCard extends StatelessWidget {
  const CenterCard({super.key, required this.center, required this.onTap, this.actionLabel});

  final LabCenter center;
  final VoidCallback onTap;
  final String? actionLabel;

  @override
  Widget build(BuildContext context) {
    final c = center;
    return Card(
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(Icons.location_on_outlined, color: context.colors.primary),
                  const SizedBox(width: 10),
                  Expanded(child: Text(c.name, style: context.text.titleSmall)),
                  if (c.distanceKm != null)
                    Text('${c.distanceKm!.toStringAsFixed(1)} km', style: context.text.labelLarge),
                ],
              ),
              const SizedBox(height: 8),
              Text(c.address, style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 6,
                children: [
                  if (c.isNabl) Tag('NABL accredited', icon: Icons.verified_outlined, color: context.status.success),
                  if (c.hours != null) Tag(c.hours!, icon: Icons.schedule_outlined, color: context.colors.secondary),
                ],
              ),
              if (actionLabel == null && (c.phone != null || c.hasCoordinates)) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    if (c.phone != null)
                      TextButton.icon(
                        onPressed: () => Launch.phone(context, c.phone!),
                        icon: const Icon(Icons.call_outlined, size: 18),
                        label: const Text('Call'),
                      ),
                    TextButton.icon(
                      onPressed: () =>
                          Launch.directions(context, lat: c.lat, lng: c.lng, query: '${c.name}, ${c.address}'),
                      icon: const Icon(Icons.directions_outlined, size: 18),
                      label: const Text('Directions'),
                    ),
                  ],
                ),
              ],
              if (actionLabel != null) ...[
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton.tonal(onPressed: onTap, child: Text(actionLabel!)),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
