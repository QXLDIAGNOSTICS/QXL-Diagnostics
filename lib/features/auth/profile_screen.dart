import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/format.dart';
import '../../core/network/api_exception.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/states.dart';
import '../../data/models/account.dart';
import 'auth_controller.dart';

/// Edit name, email and date of birth (`PATCH /users/me`). The phone number
/// is the login identity and can't be changed here.
class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key, this.completing = false});

  /// Shown straight after a first sign-in.
  final bool completing;

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  DateTime? _dob;
  bool _loaded = false;
  bool _saving = false;
  String? _error;

  void _load(AppUser user) {
    if (_loaded) return;
    _loaded = true;
    _name.text = user.name ?? '';
    _email.text = user.email ?? '';
    _dob = user.dateOfBirth;
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
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
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      await ref
          .read(authControllerProvider.notifier)
          .updateProfile(name: _name.text, email: _email.text, dateOfBirth: _dob);
      if (!mounted) return;
      showSnack(context, 'Profile saved');
      context.pop(true);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = ref.watch(authControllerProvider);
    final user = auth.value;
    if (user == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Profile')),
        body: auth.isLoading
            ? const LoadingState()
            : const EmptyState(icon: Icons.lock_outline, title: 'Please sign in to edit your profile'),
      );
    }
    _load(user);
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.completing ? 'Welcome to QXL' : 'Edit profile'),
        actions: [
          if (widget.completing)
            TextButton(onPressed: _saving ? null : () => context.pop(true), child: const Text('Skip')),
        ],
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            if (widget.completing) ...[
              Text('Tell us a little about you', style: context.text.titleLarge),
              const SizedBox(height: 4),
              Text(
                'We use this on your bookings and reports.',
                style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
              ),
              const SizedBox(height: 20),
            ],
            TextFormField(
              controller: _name,
              textCapitalization: TextCapitalization.words,
              autofillHints: const [AutofillHints.name],
              decoration: const InputDecoration(labelText: 'Full name'),
              validator: (v) => (v ?? '').trim().length < 2 ? 'Enter your name' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              autofillHints: const [AutofillHints.email],
              decoration: const InputDecoration(labelText: 'Email (optional)'),
              validator: (v) {
                final t = (v ?? '').trim();
                if (t.isEmpty) return null;
                return RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(t) ? null : 'Enter a valid email address';
              },
            ),
            const SizedBox(height: 12),
            Card(
              child: ListTile(
                leading: const Icon(Icons.cake_outlined),
                title: const Text('Date of birth (optional)'),
                subtitle: Text(_dob == null ? 'Not set' : formatDate(_dob!)),
                trailing: const Icon(Icons.edit_calendar_outlined),
                onTap: _pickDob,
              ),
            ),
            const SizedBox(height: 12),
            Card(
              child: ListTile(
                leading: const Icon(Icons.phone_iphone_outlined),
                title: const Text('Mobile number'),
                subtitle: Text(user.phone),
                trailing: Icon(Icons.lock_outline, color: context.colors.outline),
              ),
            ),
            if (_error != null) ...[
              const SizedBox(height: 16),
              Text(_error!, style: TextStyle(color: context.colors.error)),
            ],
            const SizedBox(height: 24),
            FilledButton(
              onPressed: _saving ? null : _save,
              child: _saving
                  ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                  : const Text('Save'),
            ),
          ],
        ),
      ),
    );
  }
}
