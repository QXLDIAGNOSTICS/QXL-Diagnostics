import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/booking.dart';
import '../../data/models/catalog.dart';
import '../../data/models/lab_center.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';
import '../bookings/bookings_screen.dart';
import '../cart/cart_controller.dart';
import '../payment/payment_gateway.dart';
import '../payment/payment_screen.dart';
import 'booking_submitter.dart';

final slotAvailabilityProvider = FutureProvider.autoDispose.family<SlotAvailability, String>(
  (ref, isoDay) => ref.watch(bookingRepositoryProvider).slots(isoDay),
);

/// How many days ahead patients can pick (UI choice; the server validates
/// every date and slot).
const _bookingWindowDays = 14;

class CheckoutScreen extends ConsumerStatefulWidget {
  const CheckoutScreen({super.key, this.preferredCenterId, this.centreOnly = false});

  /// Home collections are booked through the home-visit flow; this screen
  /// then handles centre visits only.
  final bool centreOnly;

  final String? preferredCenterId;

  @override
  ConsumerState<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends ConsumerState<CheckoutScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _phone = TextEditingController();
  final _email = TextEditingController();
  final _age = TextEditingController();
  final _address = TextEditingController();
  final _notes = TextEditingController();

  late final BookingSubmitter _submitter = BookingSubmitter(ref.read(bookingRepositoryProvider));
  late final List<DateTime> _days = List.generate(_bookingWindowDays, (i) {
    final now = DateTime.now();
    return DateTime(now.year, now.month, now.day + i);
  });

  CollectionType _collection = CollectionType.home;
  LabCenter? _center;
  late DateTime _day = _days.first;
  SlotOption? _slot;
  String? _gender;
  bool _submitting = false;
  Object? _error;
  bool _prefilled = false;
  bool _attempted = false;

  @override
  void initState() {
    super.initState();
    if (widget.centreOnly) _collection = CollectionType.center;
    if (widget.preferredCenterId != null) {
      _collection = CollectionType.center;
      _loadPreferredCenter(widget.preferredCenterId!);
    }
  }

  Future<void> _loadPreferredCenter(String id) async {
    try {
      final centers = await ref.read(centersRepositoryProvider).centers();
      final match = centers.where((c) => c.id == id).firstOrNull;
      if (mounted && match != null) setState(() => _center = match);
    } catch (_) {
      // The picker remains available if this convenience lookup fails.
    }
  }

  void _prefill(AppUser? user) {
    if (_prefilled || user == null) return;
    _prefilled = true;
    _name.text = user.name ?? '';
    _phone.text = user.phone.startsWith('+91') ? user.phone.substring(3) : user.phone;
    _email.text = user.email ?? '';
    final age = user.ageOn(DateTime.now());
    if (age != null) _age.text = '$age';
  }

  @override
  void dispose() {
    for (final c in [_name, _phone, _email, _age, _address, _notes]) {
      c.dispose();
    }
    super.dispose();
  }

  bool get _locked => _submitter.hasCreated;

  Future<void> _pickCenter() async {
    final picked = await context.push<LabCenter>('${Routes.centers}?pick=1');
    if (picked != null && mounted) setState(() => _center = picked);
  }

  BookingRequest _requestFor(CartItem item) {
    final notes = _notes.text.trim();
    final email = _email.text.trim();
    return BookingRequest(
      patientName: _name.text.trim(),
      patientPhone: normalizeIndianPhone(_phone.text)!,
      patientEmail: email.isEmpty ? null : email,
      patientAge: int.tryParse(_age.text.trim()),
      patientGender: _gender,
      testId: item.kind == CatalogKind.test ? item.id : null,
      packageId: item.kind == CatalogKind.package ? item.id : null,
      collectionType: _collection,
      collectionAddress: _collection == CollectionType.home ? _address.text.trim() : null,
      centerId: _collection == CollectionType.center ? _center?.id : null,
      preferredDate: isoDate(_day),
      preferredTime: _slot!.label,
      notes: notes.isEmpty ? null : notes,
    );
  }

  String? _validateSelection(int itemCount, SlotAvailability? availability) {
    if (_collection == CollectionType.center && _center == null) return 'Choose the centre you will visit.';
    if (_slot == null) return 'Choose a time slot.';
    if (availability != null && !availability.canHold(_slot!, itemCount)) {
      return 'That slot no longer has room for $itemCount booking${itemCount == 1 ? '' : 's'}. Please pick another.';
    }
    return null;
  }

  Future<void> _submit(List<CartItem> items) async {
    setState(() => _attempted = true);
    final formOk = _formKey.currentState?.validate() ?? false;
    final availability = ref.read(slotAvailabilityProvider(isoDate(_day))).value;
    final selectionError = _validateSelection(items.length, availability);
    if (!formOk || selectionError != null) {
      if (selectionError != null) showSnack(context, selectionError);
      return;
    }
    FocusScope.of(context).unfocus();
    setState(() {
      _submitting = true;
      _error = null;
    });
    try {
      final bookings = await _submitter.submit(items, _requestFor);
      _finish(items, bookings);
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = e);
      // The slot may have filled up — show fresh capacity.
      if (e is ApiException && e.kind == ApiErrorKind.validation) {
        ref.invalidate(slotAvailabilityProvider(isoDate(_day)));
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  void _continueWithBooked(List<CartItem> items) => _finish(items, _submitter.createdFor(items));

  void _finish(List<CartItem> items, List<Booking> bookings) {
    if (!mounted || bookings.isEmpty) return;
    final bookedKeys = _submitter.created.keys.toSet();
    ref.read(cartProvider.notifier).removeWhere((i) => bookedKeys.contains(i.key));
    ref.invalidate(myBookingsProvider);
    final user = ref.read(authControllerProvider).value;
    context.pushReplacement(
      Routes.pay,
      extra: PayRequest(
        afterCheckout: true,
        bookings: bookings,
        applyHomeCollectionFee: _collection == CollectionType.home,
        isGuest: user == null,
        prefill: PaymentPrefill(
          name: _name.text.trim(),
          phone: normalizeIndianPhone(_phone.text),
          email: _email.text.trim().isEmpty ? null : _email.text.trim(),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final cart = ref.watch(cartProvider);
    final user = ref.watch(authControllerProvider).value;
    _prefill(user);
    final items = cart.bookable;
    if (!cart.homeCollectionPossible && _collection == CollectionType.home && !_locked) {
      _collection = CollectionType.center;
    }

    if (items.isEmpty && !_locked) {
      return Scaffold(
        appBar: AppBar(title: const Text('Book')),
        body: const EmptyState(
          icon: Icons.shopping_bag_outlined,
          title: 'Nothing to book',
          message: 'Your cart is empty.',
        ),
      );
    }

    final availability = ref.watch(slotAvailabilityProvider(isoDate(_day)));

    return Scaffold(
      appBar: AppBar(title: const Text('Book your tests')),
      body: Form(
        key: _formKey,
        autovalidateMode: _attempted ? AutovalidateMode.onUserInteraction : AutovalidateMode.disabled,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
          children: [
            if (user == null && !_locked) _GuestBanner(onSignIn: () => context.push(Routes.login)),
            if (_locked) _PartialBanner(booked: _submitter.created.length, total: items.length),
            _Section(
              title: '1. Items',
              child: Column(
                children: [
                  for (final item in items)
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      title: Text(item.name),
                      trailing: Text(formatRupees(item.priceRupees), style: context.text.titleSmall),
                      leading: Icon(
                        _submitter.created.containsKey(item.key) ? Icons.check_circle : Icons.science_outlined,
                        color: _submitter.created.containsKey(item.key)
                            ? context.status.success
                            : context.colors.primary,
                      ),
                    ),
                ],
              ),
            ),
            _Section(
              title: '2. Where should we collect your sample?',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: double.infinity,
                    child: SegmentedButton<CollectionType>(
                      segments: [
                        ButtonSegment(
                          value: CollectionType.home,
                          icon: const Icon(Icons.home_outlined),
                          label: const Text('At home'),
                          enabled: cart.homeCollectionPossible && !_locked && !widget.centreOnly,
                        ),
                        ButtonSegment(
                          value: CollectionType.center,
                          icon: const Icon(Icons.store_mall_directory_outlined),
                          label: const Text('At a centre'),
                          enabled: !_locked,
                        ),
                      ],
                      selected: {_collection},
                      onSelectionChanged: (s) => setState(() => _collection = s.first),
                    ),
                  ),
                  if (!cart.homeCollectionPossible) ...[
                    const SizedBox(height: 8),
                    Text(
                      'Home collection is unavailable because some items need a centre visit.',
                      style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                    ),
                  ],
                  const SizedBox(height: 16),
                  if (_collection == CollectionType.home)
                    TextFormField(
                      controller: _address,
                      enabled: !_locked,
                      minLines: 2,
                      maxLines: 4,
                      textCapitalization: TextCapitalization.sentences,
                      keyboardType: TextInputType.streetAddress,
                      autofillHints: const [AutofillHints.fullStreetAddress],
                      decoration: const InputDecoration(
                        labelText: 'Collection address',
                        hintText: 'House / flat, street, area, landmark, PIN code',
                      ),
                      validator: (v) =>
                          (v ?? '').trim().length < 10 ? 'Enter the full address for the collection' : null,
                    )
                  else
                    _CenterPicker(center: _center, onPick: _locked ? null : _pickCenter),
                ],
              ),
            ),
            _Section(
              title: '3. Date and time',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: 76,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: _days.length,
                      separatorBuilder: (_, _) => const SizedBox(width: 8),
                      itemBuilder: (context, i) => _DayChip(
                        day: _days[i],
                        selected: _days[i] == _day,
                        isToday: i == 0,
                        onTap: _locked
                            ? null
                            : () => setState(() {
                                _day = _days[i];
                                _slot = null;
                              }),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  AsyncValueView<SlotAvailability>(
                    value: availability,
                    compact: true,
                    loading: const LinearProgressIndicator(),
                    onRetry: () => ref.invalidate(slotAvailabilityProvider(isoDate(_day))),
                    data: (a) => _SlotGrid(
                      availability: a,
                      itemCount: items.length,
                      selected: _slot,
                      enabled: !_locked,
                      onSelected: (s) => setState(() => _slot = s),
                    ),
                  ),
                ],
              ),
            ),
            _Section(
              title: '4. Patient details',
              child: Column(
                children: [
                  TextFormField(
                    controller: _name,
                    enabled: !_locked,
                    textCapitalization: TextCapitalization.words,
                    autofillHints: const [AutofillHints.name],
                    decoration: const InputDecoration(labelText: 'Full name'),
                    validator: (v) {
                      final t = (v ?? '').trim();
                      if (t.length < 2) return 'Enter the patient’s name';
                      if (t.length > 120) return 'Name is too long';
                      return null;
                    },
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _phone,
                    enabled: !_locked,
                    keyboardType: TextInputType.phone,
                    autofillHints: const [AutofillHints.telephoneNumberNational],
                    inputFormatters: [
                      FilteringTextInputFormatter.allow(RegExp(r'[\d +\-]')),
                      LengthLimitingTextInputFormatter(16),
                    ],
                    decoration: const InputDecoration(labelText: 'Mobile number', prefixText: '+91 '),
                    validator: (v) =>
                        normalizeIndianPhone(v ?? '') == null ? 'Enter a valid 10-digit mobile number' : null,
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _email,
                    enabled: !_locked,
                    keyboardType: TextInputType.emailAddress,
                    autofillHints: const [AutofillHints.email],
                    decoration: const InputDecoration(
                      labelText: 'Email (optional)',
                      helperText: 'For your booking updates',
                    ),
                    validator: (v) {
                      final t = (v ?? '').trim();
                      if (t.isEmpty) return null;
                      return RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(t) ? null : 'Enter a valid email address';
                    },
                  ),
                  const SizedBox(height: 12),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: 120,
                        child: TextFormField(
                          controller: _age,
                          enabled: !_locked,
                          keyboardType: TextInputType.number,
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly,
                            LengthLimitingTextInputFormatter(3),
                          ],
                          decoration: const InputDecoration(labelText: 'Age'),
                          validator: (v) {
                            final t = (v ?? '').trim();
                            if (t.isEmpty) return null;
                            final n = int.tryParse(t);
                            return n == null || n > 130 ? 'Invalid' : null;
                          },
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: DropdownButtonFormField<String>(
                          initialValue: _gender,
                          decoration: const InputDecoration(labelText: 'Gender (optional)'),
                          items: const [
                            DropdownMenuItem(value: 'Female', child: Text('Female')),
                            DropdownMenuItem(value: 'Male', child: Text('Male')),
                            DropdownMenuItem(value: 'Other', child: Text('Other')),
                          ],
                          onChanged: _locked ? null : (v) => setState(() => _gender = v),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _notes,
                    enabled: !_locked,
                    minLines: 1,
                    maxLines: 3,
                    textCapitalization: TextCapitalization.sentences,
                    decoration: const InputDecoration(labelText: 'Notes for the team (optional)'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            _ConsentText(),
            if (_error != null) ...[
              const SizedBox(height: 16),
              _ErrorCard(
                error: _error!,
                bookedCount: _submitter.created.length,
                onContinue: _submitter.hasCreated ? () => _continueWithBooked(items) : null,
              ),
            ],
          ],
        ),
      ),
      bottomNavigationBar: BottomActionBar(
        child: Row(
          children: [
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Estimated total', style: context.text.labelMedium),
                  Text(formatRupees(cart.estimatedTotalRupees), style: context.text.titleLarge),
                ],
              ),
            ),
            FilledButton(
              onPressed: _submitting || availability.value?.slots.isEmpty == true ? null : () => _submit(items),
              child: _submitting
                  ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                  : Text(_locked ? 'Retry booking' : 'Request booking'),
            ),
          ],
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
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Semantics(header: true, child: Text(title, style: context.text.titleMedium)),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _GuestBanner extends StatelessWidget {
  const _GuestBanner({required this.onSignIn});

  final VoidCallback onSignIn;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: context.status.infoContainer,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 12, 8, 12),
        child: Row(
          children: [
            Icon(Icons.person_outline, color: context.status.info),
            const SizedBox(width: 12),
            const Expanded(child: Text('Sign in to track this booking and see your reports in the app.')),
            TextButton(onPressed: onSignIn, child: const Text('Sign in')),
          ],
        ),
      ),
    );
  }
}

class _PartialBanner extends StatelessWidget {
  const _PartialBanner({required this.booked, required this.total});

  final int booked;
  final int total;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: context.status.warningContainer,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          '$booked of $total items are already booked with these details. '
          'Retry to book the rest — details are locked so every item matches.',
          style: context.text.bodyMedium,
        ),
      ),
    );
  }
}

class _CenterPicker extends StatelessWidget {
  const _CenterPicker({required this.center, required this.onPick});

  final LabCenter? center;
  final VoidCallback? onPick;

  @override
  Widget build(BuildContext context) {
    final c = center;
    return Card(
      child: ListTile(
        onTap: onPick,
        leading: Icon(Icons.location_on_outlined, color: context.colors.primary),
        title: Text(c?.name ?? 'Choose a centre'),
        subtitle: c == null ? const Text('Required for a centre visit') : Text(c.address),
        trailing: const Icon(Icons.chevron_right),
      ),
    );
  }
}

class _DayChip extends StatelessWidget {
  const _DayChip({required this.day, required this.selected, required this.isToday, required this.onTap});

  final DateTime day;
  final bool selected;
  final bool isToday;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final bg = selected ? context.colors.primary : context.colors.surfaceContainerHigh;
    final fg = selected ? context.colors.onPrimary : context.colors.onSurface;
    return Semantics(
      button: true,
      selected: selected,
      label: DateFormat('EEEE d MMMM').format(day),
      excludeSemantics: true,
      child: Material(
        color: bg,
        borderRadius: BorderRadius.circular(14),
        child: InkWell(
          borderRadius: BorderRadius.circular(14),
          onTap: onTap,
          child: SizedBox(
            width: 64,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  isToday ? 'Today' : DateFormat('EEE').format(day),
                  style: context.text.labelSmall?.copyWith(color: fg),
                ),
                Text('${day.day}', style: context.text.titleLarge?.copyWith(color: fg)),
                Text(DateFormat('MMM').format(day), style: context.text.labelSmall?.copyWith(color: fg)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _SlotGrid extends ConsumerWidget {
  const _SlotGrid({
    required this.availability,
    required this.itemCount,
    required this.selected,
    required this.enabled,
    required this.onSelected,
  });

  final SlotAvailability availability;
  final int itemCount;
  final SlotOption? selected;
  final bool enabled;
  final ValueChanged<SlotOption> onSelected;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (availability.slots.isEmpty) {
      final phone = ref.watch(siteSettingsProvider).value?.phoneE164;
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Online slot booking isn’t available right now.', style: context.text.titleSmall),
              const SizedBox(height: 6),
              const Text('Please call QXL and the team will schedule your visit.'),
              if (phone != null) ...[
                const SizedBox(height: 12),
                OutlinedButton.icon(
                  onPressed: () => Launch.phone(context, phone),
                  icon: const Icon(Icons.call_outlined),
                  label: const Text('Call QXL'),
                ),
              ],
            ],
          ),
        ),
      );
    }
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        for (final slot in availability.slots)
          Builder(
            builder: (context) {
              final fits = availability.canHold(slot, itemCount);
              final reason = switch (slot.unavailableReason) {
                'past' => 'Passed',
                'full' => 'Full',
                _ => fits ? null : 'Not enough room',
              };
              return ChoiceChip(
                label: Text(reason == null ? slot.label : '${slot.label} · $reason'),
                selected: selected?.label == slot.label,
                onSelected: enabled && fits ? (_) => onSelected(slot) : null,
              );
            },
          ),
      ],
    );
  }
}

class _ConsentText extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final config = ref.watch(appConfigProvider);
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Text('By booking you agree to QXL’s ', style: context.text.bodySmall),
        InlineLink('Terms', onTap: () => Launch.web(context, config.termsUrl)),
        Text(' and ', style: context.text.bodySmall),
        InlineLink('Payment terms', onTap: () => Launch.web(context, config.paymentTermsUrl)),
        Text('.', style: context.text.bodySmall),
      ],
    );
  }
}

class _ErrorCard extends StatelessWidget {
  const _ErrorCard({required this.error, required this.bookedCount, this.onContinue});

  final Object error;
  final int bookedCount;
  final VoidCallback? onContinue;

  @override
  Widget build(BuildContext context) {
    return Card(
      color: context.colors.errorContainer,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Semantics(
              liveRegion: true,
              child: Text(
                describeError(error),
                style: context.text.bodyMedium?.copyWith(color: context.colors.onErrorContainer),
              ),
            ),
            if (onContinue != null) ...[
              const SizedBox(height: 12),
              Text(
                '$bookedCount item${bookedCount == 1 ? ' was' : 's were'} booked successfully.',
                style: context.text.bodySmall?.copyWith(color: context.colors.onErrorContainer),
              ),
              const SizedBox(height: 8),
              OutlinedButton(onPressed: onContinue, child: const Text('Continue with booked items')),
            ],
          ],
        ),
      ),
    );
  }
}
