import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../../data/models/collect.dart';
import '../auth/auth_controller.dart';
import '../visits/collect_providers.dart';

const relations = ['self', 'spouse', 'child', 'parent', 'sibling', 'other'];

class ProfilesScreen extends ConsumerWidget {
  const ProfilesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profiles = ref.watch(profilesProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Family members')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => showProfileSheet(context, ref),
        icon: const Icon(Icons.person_add_alt_1_outlined),
        label: const Text('Add member'),
      ),
      body: AsyncValueView<List<PatientProfile>>(
        value: profiles,
        onRetry: () => ref.invalidate(profilesProvider),
        data: (list) => list.isEmpty
            ? const EmptyState(
                icon: Icons.family_restroom_outlined,
                title: 'No patients yet',
                message: 'Add yourself and family members to book tests for them and keep their reports together.',
              )
            : ListView.separated(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
                itemCount: list.length,
                separatorBuilder: (_, _) => const SizedBox(height: 10),
                itemBuilder: (_, i) {
                  final p = list[i];
                  return Card(
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: context.colors.secondaryContainer,
                        child: Text(p.fullName.characters.first.toUpperCase()),
                      ),
                      title: Text(p.fullName),
                      subtitle: Text('${p.relationLabel} · born ${formatDate(p.dateOfBirth)}'),
                      trailing: const Icon(Icons.edit_outlined),
                      onTap: () => showProfileSheet(context, ref, existing: p),
                    ),
                  );
                },
              ),
      ),
    );
  }
}

/// Add/edit a patient profile. Returns the saved profile.
Future<PatientProfile?> showProfileSheet(BuildContext context, WidgetRef ref, {PatientProfile? existing}) {
  return showModalBottomSheet<PatientProfile>(
    context: context,
    isScrollControlled: true,
    builder: (_) => _ProfileForm(existing: existing),
  );
}

class _ProfileForm extends ConsumerStatefulWidget {
  const _ProfileForm({this.existing});

  final PatientProfile? existing;

  @override
  ConsumerState<_ProfileForm> createState() => _ProfileFormState();
}

class _ProfileFormState extends ConsumerState<_ProfileForm> {
  final _formKey = GlobalKey<FormState>();
  late final _name = TextEditingController(text: widget.existing?.fullName);
  late DateTime? _dob = widget.existing?.dateOfBirth;
  late String _relation = widget.existing?.relation ?? 'self';
  late String? _gender = widget.existing?.gender;
  bool _saving = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    if (widget.existing != null) return;
    final hasSelf = ref.read(profilesProvider).value?.any((p) => p.isSelf) ?? false;
    if (hasSelf) {
      // "Myself" already exists, so a new profile is for someone else.
      _relation = relations.firstWhere((r) => r != 'self', orElse: () => 'self');
    } else {
      // Start "Myself" from the account details; the patient can still edit.
      final me = ref.read(authControllerProvider).value;
      if ((me?.name ?? '').trim().isNotEmpty) _name.text = me!.name!.trim();
      _dob = me?.dateOfBirth;
    }
  }

  @override
  void dispose() {
    _name.dispose();
    super.dispose();
  }

  Future<void> _pickDob() async {
    final now = DateTime.now();
    final picked = await showDatePicker(
      context: context,
      initialDate: _dob ?? DateTime(now.year - 30),
      firstDate: DateTime(now.year - 120),
      lastDate: now,
      helpText: 'Date of birth',
    );
    if (picked != null) setState(() => _dob = picked);
  }

  Future<void> _save() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;
    if (_dob == null) {
      setState(() => _error = 'Date of birth is required — the collector checks it before taking a sample.');
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      final saved = await ref
          .read(collectRepositoryProvider)
          .saveProfile(
            id: widget.existing?.id,
            fullName: _name.text,
            dateOfBirth: _dob!,
            relation: _relation,
            gender: _gender,
          );
      ref.invalidate(profilesProvider);
      if (mounted) Navigator.pop(context, saved);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(context).bottom),
      child: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            shrinkWrap: true,
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            children: [
              Text(widget.existing == null ? 'Add a patient' : 'Edit patient', style: context.text.titleLarge),
              const SizedBox(height: 4),
              Text(
                'Use the name and date of birth exactly as on their ID. The collector verifies both before collecting.',
                style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _name,
                textCapitalization: TextCapitalization.words,
                decoration: const InputDecoration(labelText: 'Full name'),
                validator: (v) => (v ?? '').trim().length < 2 ? 'Enter the full name' : null,
              ),
              const SizedBox(height: 12),
              Card(
                child: ListTile(
                  leading: const Icon(Icons.cake_outlined),
                  title: const Text('Date of birth'),
                  subtitle: Text(_dob == null ? 'Required' : formatDate(_dob!)),
                  trailing: const Icon(Icons.edit_calendar_outlined),
                  onTap: _pickDob,
                ),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: _relation,
                decoration: const InputDecoration(labelText: 'Relationship to you'),
                items: [
                  for (final r in relations)
                    DropdownMenuItem(value: r, child: Text(r == 'self' ? 'Myself' : titleCase(r))),
                ],
                onChanged: (v) => setState(() => _relation = v ?? 'self'),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: _gender,
                decoration: const InputDecoration(labelText: 'Gender (optional)'),
                items: const [
                  DropdownMenuItem(value: 'female', child: Text('Female')),
                  DropdownMenuItem(value: 'male', child: Text('Male')),
                  DropdownMenuItem(value: 'other', child: Text('Other')),
                ],
                onChanged: (v) => setState(() => _gender = v),
              ),
              if (_error != null) ...[
                const SizedBox(height: 12),
                Text(_error!, style: TextStyle(color: context.colors.error)),
              ],
              const SizedBox(height: 20),
              FilledButton(
                onPressed: _saving ? null : _save,
                child: _saving
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                    : const Text('Save'),
              ),
              if (widget.existing != null && !widget.existing!.isSelf)
                TextButton(
                  onPressed: _saving
                      ? null
                      : () async {
                          await ref.read(collectRepositoryProvider).archiveProfile(widget.existing!.id);
                          ref.invalidate(profilesProvider);
                          if (context.mounted) Navigator.pop(context);
                        },
                  child: const Text('Remove from my account'),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
