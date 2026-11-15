import 'dart:math';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../../data/models/catalog.dart';
import '../../data/models/collect.dart';
import '../../data/providers.dart';
import '../addresses/address_screens.dart';
import '../auth/auth_controller.dart';
import '../bookings/bookings_screen.dart';
import '../cart/cart_controller.dart';
import '../payment/payment_gateway.dart';
import '../payment/payment_screen.dart';
import '../profiles/profiles_screen.dart';
import 'collect_providers.dart';

final _slotsProvider = FutureProvider.autoDispose.family<List<VisitSlot>, (String, String)>(
  (ref, key) => ref.watch(collectRepositoryProvider).slots(DateTime.parse(key.$1), key.$2),
);

const _bookingDays = 14;

String _newIdempotencyKey() {
  final r = Random.secure();
  return List.generate(32, (_) => r.nextInt(16).toRadixString(16)).join();
}

/// Book a home collection for the cart: patient → address & pin → slot →
/// preparation → payment & consent → review. One idempotency key per attempt
/// so a retried submit never creates a second visit.
class HomeVisitFlowScreen extends ConsumerStatefulWidget {
  const HomeVisitFlowScreen({super.key});

  @override
  ConsumerState<HomeVisitFlowScreen> createState() => _HomeVisitFlowScreenState();
}

class _HomeVisitFlowScreenState extends ConsumerState<HomeVisitFlowScreen> {
  final String _idempotencyKey = _newIdempotencyKey();
  late final List<DateTime> _days = List.generate(_bookingDays, (i) {
    final now = DateTime.now();
    return DateTime(now.year, now.month, now.day + i);
  });

  PatientProfile? _profile;
  SavedAddress? _address;
  late DateTime _day = _days.first;
  VisitSlot? _slot;
  String _paymentMode = 'online';
  bool _consent = false;
  final _notes = TextEditingController();
  bool _submitting = false;
  Object? _error;
  ServiceCheck? _service;

  @override
  void dispose() {
    _notes.dispose();
    super.dispose();
  }

  Future<void> _selectAddress(SavedAddress address) async {
    setState(() {
      _address = address;
      _slot = null;
      _service = null;
    });
    try {
      final check = await ref.read(collectRepositoryProvider).checkPincode(address.pincode);
      if (mounted && _address?.id == address.id) setState(() => _service = check);
    } catch (_) {}
  }

  Future<void> _pickAddress(List<SavedAddress> list) async {
    final picked = await showModalBottomSheet<SavedAddress>(
      context: context,
      isScrollControlled: true,
      builder: (context) => SafeArea(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
          children: [
            Text('Collection address', style: context.text.titleLarge),
            const SizedBox(height: 12),
            for (final a in list) ...[
              AddressTile(address: a, selected: a.id == _address?.id, onTap: () => Navigator.pop(context, a)),
              const SizedBox(height: 8),
            ],
            OutlinedButton.icon(
              onPressed: () async {
                final created = await context.push<SavedAddress>('/addresses/edit');
                if (created != null && context.mounted) Navigator.pop(context, created);
              },
              icon: const Icon(Icons.add_location_alt_outlined),
              label: const Text('Add a new address'),
            ),
          ],
        ),
      ),
    );
    if (picked != null) await _selectAddress(picked);
  }

  List<String> _preparation(List<CartItem> items) {
    final tests = ref.read(allTestsProvider).value ?? const <LabTest>[];
    final packages = ref.read(allPackagesProvider).value ?? const <HealthPackage>[];
    final notes = <String>{};
    for (final item in items) {
      if (item.kind == CatalogKind.test) {
        final t = tests.where((t) => t.id == item.id).firstOrNull;
        if (t?.preparation != null) notes.add('${item.name}: ${t!.preparation}');
      } else {
        final p = packages.where((p) => p.id == item.id).firstOrNull;
        final prep = p?.details.fasting ?? p?.details.beforeBooking;
        if (prep != null) notes.add('${item.name}: $prep');
      }
    }
    return notes.toList();
  }

  String? _blocker(List<CartItem> items) {
    if (items.isEmpty) return 'Your cart is empty.';
    if (items.any((i) => !i.homeCollectionAvailable)) return 'Remove centre-only tests to book a home collection.';
    if (_profile == null) return 'Choose who the tests are for.';
    if (_address == null) return 'Choose the collection address.';
    if (!_address!.hasPin) return 'Add a map pin to this address.';
    if (_service != null && !_service!.serviceable) return 'Home collection isn’t available at this PIN code yet.';
    if (_slot == null) return 'Choose a time slot.';
    if (!_consent) return 'Please accept the consent and privacy notice.';
    return null;
  }

  Future<void> _review(List<CartItem> items) async {
    final blocker = _blocker(items);
    if (blocker != null) {
      showSnack(context, blocker);
      return;
    }
    final confirmed = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      builder: (context) => _ReviewSheet(
        items: items,
        profile: _profile!,
        address: _address!,
        day: _day,
        slot: _slot!.label,
        paymentMode: _paymentMode,
        feeHint: _service?.collectionFeePaise,
      ),
    );
    if (confirmed == true) await _submit(items);
  }

  Future<void> _submit(List<CartItem> items) async {
    setState(() {
      _submitting = true;
      _error = null;
    });
    try {
      final repo = ref.read(collectRepositoryProvider);
      final visit = await repo.createVisit(
        idempotencyKey: _idempotencyKey,
        body: {
          'profile_id': _profile!.id,
          'items': [
            for (final i in items) {'kind': i.kind.name, 'id': i.id},
          ],
          'address': _address!.toAddressJson(),
          'slot_date': isoDate(_day),
          'slot_label': _slot!.label,
          'payment_mode': _paymentMode,
          'consent_accepted': _consent,
          'notes': _notes.text.trim().isEmpty ? null : _notes.text.trim(),
        },
      );
      final keys = {for (final i in items) i.key};
      ref.read(cartProvider.notifier).removeWhere((i) => keys.contains(i.key));
      refreshVisitData(ref, visit.id);
      ref.invalidate(myBookingsProvider);
      if (!mounted) return;
      if (visit.awaitingPayment) {
        final user = ref.read(authControllerProvider).value;
        context.pushReplacement(
          '/pay',
          extra: PayRequest(
            visitId: visit.id,
            afterCheckout: true,
            prefill: PaymentPrefill(name: _profile!.fullName, phone: user?.phone, email: user?.email),
          ),
        );
      } else {
        context.pushReplacement('/visits/${visit.id}');
      }
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = e);
      if (e is ApiException && e.statusCode == 409) {
        setState(() => _slot = null);
        ref.invalidate(_slotsProvider);
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authControllerProvider).value;
    final cart = ref.watch(cartProvider);
    final items = cart.bookable;
    if (user == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Home collection')),
        body: EmptyState(
          icon: Icons.lock_outline,
          title: 'Sign in to book a home collection',
          message: 'We use your account to keep the patient’s bookings, live tracking and reports together.',
          action: FilledButton(onPressed: () => context.push('/login'), child: const Text('Sign in')),
        ),
      );
    }
    final profiles = ref.watch(profilesProvider);
    final addresses = ref.watch(addressesProvider);
    profiles.whenData((list) {
      if (_profile == null && list.isNotEmpty) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted && _profile == null) {
            setState(() => _profile = list.firstWhere((p) => p.isSelf, orElse: () => list.first));
          }
        });
      }
    });
    addresses.whenData((list) {
      if (_address == null && list.isNotEmpty) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted && _address == null) {
            _selectAddress(list.firstWhere((a) => a.isDefault, orElse: () => list.first));
          }
        });
      }
    });
    final prep = _preparation(items);

    return Scaffold(
      appBar: AppBar(title: const Text('Book home collection')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
        children: [
          _Section(
            title: 'Tests',
            child: Column(
              children: [
                for (final i in items)
                  ListTile(
                    dense: true,
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.science_outlined),
                    title: Text(i.name),
                    trailing: Text(formatRupees(i.priceRupees)),
                  ),
                if (items.any((i) => !i.homeCollectionAvailable))
                  MedicalNotice(text: 'Some items need a centre visit and can’t be collected at home.'),
              ],
            ),
          ),
          _Section(
            title: 'Who is it for?',
            child: AsyncValueView<List<PatientProfile>>(
              value: profiles,
              compact: true,
              onRetry: () => ref.invalidate(profilesProvider),
              data: (list) => Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final p in list)
                    ChoiceChip(
                      avatar: Icon(p.isSelf ? Icons.person : Icons.people_outline, size: 18),
                      label: Text('${p.fullName} (${p.relationLabel})'),
                      selected: _profile?.id == p.id,
                      onSelected: (_) => setState(() => _profile = p),
                    ),
                  ActionChip(
                    avatar: const Icon(Icons.add, size: 18),
                    label: Text(list.isEmpty ? 'Add patient details' : 'Add family member'),
                    onPressed: () async {
                      final created = await showProfileSheet(context, ref);
                      if (created != null) setState(() => _profile = created);
                    },
                  ),
                ],
              ),
            ),
          ),
          _Section(
            title: 'Collection address',
            child: AsyncValueView<List<SavedAddress>>(
              value: addresses,
              compact: true,
              onRetry: () => ref.invalidate(addressesProvider),
              data: (list) => _address == null
                  ? OutlinedButton.icon(
                      onPressed: () => list.isEmpty
                          ? context.push<SavedAddress>('/addresses/edit').then((a) {
                              if (a != null) _selectAddress(a);
                            })
                          : _pickAddress(list),
                      icon: const Icon(Icons.add_location_alt_outlined),
                      label: const Text('Add the collection address'),
                    )
                  : Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AddressTile(address: _address!, onTap: () => _pickAddress(list)),
                        if (_service != null && !_service!.serviceable)
                          Padding(
                            padding: const EdgeInsets.only(top: 8),
                            child: Text(
                              'Home collection isn’t available at PIN ${_address!.pincode} yet. Choose another address or visit a centre.',
                              style: TextStyle(color: context.colors.error),
                            ),
                          ),
                        if (!_address!.hasPin)
                          TextButton(
                            onPressed: () => context.push<SavedAddress>('/addresses/edit', extra: _address).then((a) {
                              if (a != null) _selectAddress(a);
                            }),
                            child: const Text('Add a map pin to this address'),
                          ),
                      ],
                    ),
            ),
          ),
          _Section(
            title: 'Date and time',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 76,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: _days.length,
                    separatorBuilder: (_, _) => const SizedBox(width: 8),
                    itemBuilder: (_, i) {
                      final d = _days[i];
                      final selected = d == _day;
                      return ChoiceChip(
                        label: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(i == 0 ? 'Today' : DateFormat('EEE').format(d)),
                            Text(
                              '${d.day} ${DateFormat('MMM').format(d)}',
                              style: const TextStyle(fontWeight: FontWeight.w700),
                            ),
                          ],
                        ),
                        selected: selected,
                        onSelected: (_) => setState(() {
                          _day = d;
                          _slot = null;
                        }),
                      );
                    },
                  ),
                ),
                const SizedBox(height: 12),
                if (_address == null)
                  Text('Choose an address to see available slots.', style: context.text.bodySmall)
                else
                  ref
                      .watch(_slotsProvider((isoDate(_day), _address!.pincode)))
                      .when(
                        loading: () => const LinearProgressIndicator(),
                        error: (e, _) => ErrorState(
                          error: e,
                          compact: true,
                          onRetry: () => ref.invalidate(_slotsProvider((isoDate(_day), _address!.pincode))),
                        ),
                        data: (slots) => slots.isEmpty
                            ? const Text('No collection slots on this day. Try another date.')
                            : Wrap(
                                spacing: 8,
                                runSpacing: 8,
                                children: [
                                  for (final s in slots)
                                    ChoiceChip(
                                      label: Text(
                                        s.available
                                            ? s.label
                                            : '${s.label} · ${switch (s.reason) {
                                                'past' => 'Passed',
                                                'full' => 'Full',
                                                _ => 'Unavailable',
                                              }}',
                                      ),
                                      selected: _slot?.label == s.label,
                                      onSelected: s.available ? (_) => setState(() => _slot = s) : null,
                                    ),
                                ],
                              ),
                      ),
              ],
            ),
          ),
          if (prep.isNotEmpty)
            _Section(
              title: 'Before your collection',
              child: Card(
                color: context.colors.secondaryContainer,
                child: Padding(
                  padding: const EdgeInsets.all(14),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      for (final p in prep)
                        Padding(padding: const EdgeInsets.symmetric(vertical: 3), child: Text('• $p')),
                    ],
                  ),
                ),
              ),
            ),
          _Section(
            title: 'Payment',
            child: RadioGroup<String>(
              groupValue: _paymentMode,
              onChanged: (v) => setState(() => _paymentMode = v ?? 'online'),
              child: const Column(
                children: [
                  RadioListTile<String>(
                    contentPadding: EdgeInsets.zero,
                    value: 'online',
                    title: Text('Pay now'),
                    subtitle: Text('UPI, cards or netbanking via Razorpay'),
                  ),
                  RadioListTile<String>(
                    contentPadding: EdgeInsets.zero,
                    value: 'pay_on_visit',
                    title: Text('Pay at collection'),
                    subtitle: Text('Cash or UPI to the collector at your door'),
                  ),
                ],
              ),
            ),
          ),
          _Section(
            title: 'Notes for the collector (optional)',
            child: TextField(
              controller: _notes,
              maxLines: 2,
              decoration: const InputDecoration(hintText: 'e.g. Patient is elderly, please call on arrival'),
            ),
          ),
          const SizedBox(height: 12),
          _ConsentBox(value: _consent, onChanged: (v) => setState(() => _consent = v)),
          if (_error != null) ...[const SizedBox(height: 12), ErrorState(error: _error!, compact: true)],
        ],
      ),
      bottomNavigationBar: BottomActionBar(
        child: FilledButton(
          onPressed: _submitting ? null : () => _review(items),
          child: _submitting
              ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
              : const Text('Review booking'),
        ),
      ),
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(top: 18),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Semantics(header: true, child: Text(title, style: context.text.titleMedium)),
        const SizedBox(height: 10),
        child,
      ],
    ),
  );
}

class _ConsentBox extends ConsumerWidget {
  const _ConsentBox({required this.value, required this.onChanged});

  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final config = ref.watch(appConfigProvider);
    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(4, 8, 12, 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CheckboxListTile(
              value: value,
              onChanged: (v) => onChanged(v ?? false),
              controlAffinity: ListTileControlAffinity.leading,
              title: const Text(
                'I consent to QXL collecting my sample at home, processing it at its laboratory, '
                'and using my details (including health information) to deliver this service.',
              ),
            ),
            Wrap(
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                const SizedBox(width: 16),
                Text('Read the ', style: context.text.bodySmall),
                InlineLink('Privacy policy', onTap: () => Launch.web(context, config.privacyPolicyUrl)),
                Text(' and ', style: context.text.bodySmall),
                InlineLink('Terms', onTap: () => Launch.web(context, config.termsUrl)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ReviewSheet extends StatelessWidget {
  const _ReviewSheet({
    required this.items,
    required this.profile,
    required this.address,
    required this.day,
    required this.slot,
    required this.paymentMode,
    this.feeHint,
  });

  final List<CartItem> items;
  final PatientProfile profile;
  final SavedAddress address;
  final DateTime day;
  final String slot;
  final String paymentMode;
  final int? feeHint;

  @override
  Widget build(BuildContext context) {
    final total = items.fold(0, (s, i) => s + i.priceRupees);
    return SafeArea(
      child: ListView(
        shrinkWrap: true,
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
        children: [
          Text('Review your booking', style: context.text.titleLarge),
          const SizedBox(height: 12),
          FactRow(
            icon: Icons.person_outline,
            label: 'Patient',
            value: '${profile.fullName} · born ${formatDate(profile.dateOfBirth)}',
          ),
          FactRow(icon: Icons.location_on_outlined, label: 'Address', value: address.line),
          FactRow(icon: Icons.event_outlined, label: 'When', value: '${DateFormat('EEE, d MMM').format(day)} · $slot'),
          FactRow(
            icon: Icons.payments_outlined,
            label: 'Payment',
            value: paymentMode == 'online' ? 'Pay now (Razorpay)' : 'Pay the collector at the visit',
          ),
          const Divider(height: 24),
          for (final i in items)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 3),
              child: Row(
                children: [
                  Expanded(child: Text(i.name)),
                  Text(formatRupees(i.priceRupees)),
                ],
              ),
            ),
          const SizedBox(height: 6),
          Row(
            children: [
              Expanded(child: Text('Tests total', style: context.text.titleSmall)),
              Text(formatRupees(total), style: context.text.titleSmall),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            feeHint != null && feeHint! > 0
                ? 'A home collection fee of ${formatPaise(feeHint!)} applies. The final amount is confirmed next.'
                : 'Any home collection fee is confirmed by QXL on the next screen.',
            style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
          ),
          const SizedBox(height: 20),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Confirm booking')),
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Make changes')),
        ],
      ),
    );
  }
}
