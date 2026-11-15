import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:latlong2/latlong.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../../data/models/collect.dart';
import '../../data/providers.dart';
import '../centers/location_service.dart';
import '../visits/collect_providers.dart';

class AddressesScreen extends ConsumerWidget {
  const AddressesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final addresses = ref.watch(addressesProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Saved addresses')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => context.push<SavedAddress>('/addresses/edit'),
        icon: const Icon(Icons.add_location_alt_outlined),
        label: const Text('Add address'),
      ),
      body: AsyncValueView<List<SavedAddress>>(
        value: addresses,
        onRetry: () => ref.invalidate(addressesProvider),
        data: (list) => list.isEmpty
            ? const EmptyState(
                icon: Icons.home_work_outlined,
                title: 'No saved addresses',
                message: 'Save your home or office with an exact map pin so collectors find you quickly.',
              )
            : ListView.separated(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
                itemCount: list.length,
                separatorBuilder: (_, _) => const SizedBox(height: 10),
                itemBuilder: (_, i) => AddressTile(
                  address: list[i],
                  onTap: () => context.push<SavedAddress>('/addresses/edit', extra: list[i]),
                ),
              ),
      ),
    );
  }
}

class AddressTile extends StatelessWidget {
  const AddressTile({super.key, required this.address, this.onTap, this.selected = false});

  final SavedAddress address;
  final VoidCallback? onTap;
  final bool selected;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: selected ? context.colors.secondaryContainer : null,
      child: ListTile(
        onTap: onTap,
        leading: Icon(
          address.label.toLowerCase().contains('office') ? Icons.business_outlined : Icons.home_outlined,
          color: context.colors.primary,
        ),
        title: Row(
          children: [
            Flexible(child: Text(address.label)),
            if (address.isDefault) ...[const SizedBox(width: 8), const Tag('Default')],
          ],
        ),
        subtitle: Text(
          address.line + (address.hasPin ? '' : '\nNo map pin — add one for faster collection'),
          maxLines: 3,
          overflow: TextOverflow.ellipsis,
        ),
        trailing: selected ? Icon(Icons.check_circle, color: context.colors.primary) : const Icon(Icons.chevron_right),
      ),
    );
  }
}

/// Create or edit an address with an exact map pin. The map moves under a
/// fixed centre pin; GPS is optional and only used when the user asks.
class AddressEditorScreen extends ConsumerStatefulWidget {
  const AddressEditorScreen({super.key, this.existing});

  final SavedAddress? existing;

  @override
  ConsumerState<AddressEditorScreen> createState() => _AddressEditorScreenState();
}

class _AddressEditorScreenState extends ConsumerState<AddressEditorScreen> {
  final _formKey = GlobalKey<FormState>();
  final _map = MapController();
  late final _label = TextEditingController(text: widget.existing?.label ?? 'Home');
  late final _house = TextEditingController(text: widget.existing?.house);
  late final _street = TextEditingController(text: widget.existing?.street);
  late final _locality = TextEditingController(text: widget.existing?.locality);
  late final _pincode = TextEditingController(text: widget.existing?.pincode);
  late final _landmark = TextEditingController(text: widget.existing?.landmark);
  late final _instructions = TextEditingController(text: widget.existing?.instructions);
  late LatLng? _pin = widget.existing?.hasPin == true ? LatLng(widget.existing!.lat!, widget.existing!.lng!) : null;
  late bool _isDefault = widget.existing?.isDefault ?? false;
  bool _locating = false;
  bool _saving = false;
  String? _error;
  ServiceCheck? _service;
  Timer? _pinDebounce;

  @override
  void initState() {
    super.initState();
    _pincode.addListener(_onPincode);
    if (_pincode.text.length == 6) _onPincode();
  }

  @override
  void dispose() {
    _pinDebounce?.cancel();
    for (final c in [_label, _house, _street, _locality, _pincode, _landmark, _instructions]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _onPincode() async {
    final pin = _pincode.text.trim();
    if (pin.length != 6) {
      if (_service != null) setState(() => _service = null);
      return;
    }
    try {
      final check = await ref.read(collectRepositoryProvider).checkPincode(pin);
      if (!mounted || _pincode.text.trim() != pin) return;
      setState(() => _service = check);
      if (check.serviceable && _locality.text.trim().isEmpty && check.locality != null) {
        _locality.text = check.locality!;
      }
    } catch (_) {
      // Shown again at booking; not blocking for saving an address.
    }
  }

  Future<void> _useGps() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        icon: const Icon(Icons.my_location),
        title: const Text('Use your current location?'),
        content: const Text(
          'QXL uses it once to place the pin on the map. You can then drag the map to the exact building. '
          "It isn't tracked.",
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Not now')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Continue')),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    setState(() => _locating = true);
    final result = await ref.read(locationServiceProvider).current(precise: true);
    if (!mounted) return;
    setState(() => _locating = false);
    switch (result) {
      case LocationFound(:final lat, :final lng):
        final point = LatLng(lat, lng);
        setState(() => _pin = point);
        _map.move(point, 18);
      case LocationUnavailable(:final message):
        showSnack(context, '$message Drag the map to place the pin instead.');
    }
  }

  Future<void> _save() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;
    if (_pin == null) {
      setState(() => _error = 'Place the pin on your building so the collector can find you.');
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    String? nullIfEmpty(TextEditingController c) => c.text.trim().isEmpty ? null : c.text.trim();
    try {
      final saved = await ref.read(collectRepositoryProvider).saveAddress(widget.existing?.id, {
        'label': _label.text.trim().isEmpty ? 'Home' : _label.text.trim(),
        'house': _house.text.trim(),
        'street': nullIfEmpty(_street),
        'locality': _locality.text.trim(),
        'pincode': _pincode.text.trim(),
        'landmark': nullIfEmpty(_landmark),
        'instructions': nullIfEmpty(_instructions),
        'lat': _pin!.latitude,
        'lng': _pin!.longitude,
        'is_default': _isDefault,
      });
      ref.invalidate(addressesProvider);
      if (mounted) context.pop(saved);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final config = ref.watch(appConfigProvider);
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.existing == null ? 'New address' : 'Edit address'),
        actions: [
          if (widget.existing != null)
            IconButton(
              tooltip: 'Delete address',
              icon: const Icon(Icons.delete_outline),
              onPressed: () async {
                await ref.read(collectRepositoryProvider).deleteAddress(widget.existing!.id);
                ref.invalidate(addressesProvider);
                if (context.mounted) context.pop();
              },
            ),
        ],
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.only(bottom: 24),
          children: [
            SizedBox(
              height: 280,
              child: Stack(
                children: [
                  QxlMap(
                    config: config,
                    controller: _map,
                    center: _pin ?? bengaluru,
                    zoom: _pin == null ? 12 : 18,
                    onMoved: (center) {
                      _pinDebounce?.cancel();
                      _pinDebounce = Timer(const Duration(milliseconds: 250), () {
                        if (mounted) setState(() => _pin = center);
                      });
                    },
                  ),
                  const CenterPin(),
                  Positioned(
                    // Sits above the OpenStreetMap attribution button (bottom right),
                    // which must stay visible and tappable under the OSM licence.
                    right: 12,
                    bottom: 64,
                    child: FloatingActionButton.small(
                      heroTag: 'gps',
                      tooltip: 'Use my current location',
                      onPressed: _locating ? null : _useGps,
                      child: _locating
                          ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2))
                          : const Icon(Icons.my_location),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
              child: Text(
                _pin == null
                    ? 'Drag the map so the pin sits on your building.'
                    : 'Pin set at ${_pin!.latitude.toStringAsFixed(5)}, ${_pin!.longitude.toStringAsFixed(5)}. Drag to adjust.',
                style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
              child: Column(
                children: [
                  TextFormField(
                    controller: _house,
                    decoration: const InputDecoration(labelText: 'House / flat / floor & building'),
                    validator: (v) => (v ?? '').trim().isEmpty ? 'Required' : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _street,
                    decoration: const InputDecoration(labelText: 'Street / road'),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: 130,
                        child: TextFormField(
                          controller: _pincode,
                          keyboardType: TextInputType.number,
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly,
                            LengthLimitingTextInputFormatter(6),
                          ],
                          decoration: const InputDecoration(labelText: 'PIN code'),
                          validator: (v) => (v ?? '').length != 6 ? '6 digits' : null,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: TextFormField(
                          controller: _locality,
                          decoration: const InputDecoration(labelText: 'Locality / area'),
                          validator: (v) => (v ?? '').trim().length < 2 ? 'Required' : null,
                        ),
                      ),
                    ],
                  ),
                  if (_service != null) ...[
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(
                          _service!.serviceable ? Icons.check_circle_outline : Icons.info_outline,
                          size: 18,
                          color: _service!.serviceable ? context.status.success : context.status.warning,
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            _service!.serviceable
                                ? 'Home collection is available at this PIN code.'
                                : 'Home collection isn’t available at this PIN code yet.',
                            style: context.text.bodySmall,
                          ),
                        ),
                      ],
                    ),
                  ],
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _landmark,
                    decoration: const InputDecoration(labelText: 'Landmark (optional)'),
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _instructions,
                    minLines: 1,
                    maxLines: 3,
                    decoration: const InputDecoration(
                      labelText: 'Directions for the collector (optional)',
                      hintText: 'Gate colour, lift, parking, pets…',
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _label,
                    decoration: const InputDecoration(labelText: 'Save as (e.g. Home, Office)'),
                  ),
                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Use as my default address'),
                    value: _isDefault,
                    onChanged: (v) => setState(() => _isDefault = v),
                  ),
                  if (_error != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 8),
                      child: Text(_error!, style: TextStyle(color: context.colors.error)),
                    ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: FilledButton(
                      onPressed: _saving ? null : _save,
                      child: _saving
                          ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                          : const Text('Save address'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
