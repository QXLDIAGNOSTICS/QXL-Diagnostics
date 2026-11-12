import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/launch.dart';
import '../../core/network/api_exception.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/states.dart';
import '../../data/models/account.dart';
import '../../data/providers.dart';
import '../auth/auth_controller.dart';

/// `POST /leads/contact`.
class ContactScreen extends ConsumerStatefulWidget {
  const ContactScreen({super.key});

  @override
  ConsumerState<ContactScreen> createState() => _ContactScreenState();
}

class _ContactScreenState extends ConsumerState<ContactScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _phone = TextEditingController();
  final _email = TextEditingController();
  final _subject = TextEditingController();
  final _message = TextEditingController();
  bool _sending = false;
  bool _sent = false;
  bool _prefilled = false;
  String? _error;

  @override
  void dispose() {
    for (final c in [_name, _phone, _email, _subject, _message]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _send() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;
    setState(() {
      _sending = true;
      _error = null;
    });
    try {
      final email = _email.text.trim();
      final subject = _subject.text.trim();
      await ref
          .read(contentRepositoryProvider)
          .submitContact(
            name: _name.text.trim(),
            message: _message.text.trim(),
            phone: normalizeIndianPhone(_phone.text),
            email: email.isEmpty ? null : email,
            subject: subject.isEmpty ? null : subject,
          );
      if (mounted) setState(() => _sent = true);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _sending = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authControllerProvider).value;
    if (!_prefilled && user != null) {
      _prefilled = true;
      _name.text = user.name ?? '';
      _phone.text = user.phone.startsWith('+91') ? user.phone.substring(3) : user.phone;
      _email.text = user.email ?? '';
    }
    final settings = ref.watch(siteSettingsProvider).value;

    if (_sent) {
      return Scaffold(
        appBar: AppBar(title: const Text('Contact us')),
        body: EmptyState(
          icon: Icons.mark_email_read_outlined,
          title: 'Message sent',
          message: 'Thanks for reaching out. The QXL team will get back to you.',
          action: FilledButton(onPressed: () => context.pop(), child: const Text('Done')),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Contact us')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            if (settings?.phoneE164 != null || settings?.whatsappNumber != null) ...[
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  if (settings?.phoneE164 != null)
                    FilledButton.tonalIcon(
                      onPressed: () => Launch.phone(context, settings!.phoneE164!),
                      icon: const Icon(Icons.call_outlined),
                      label: Text(settings?.phoneDisplay ?? 'Call'),
                    ),
                  if (settings?.whatsappNumber != null)
                    FilledButton.tonalIcon(
                      onPressed: () => Launch.whatsapp(context, settings!.whatsappNumber!),
                      icon: const Icon(Icons.chat_outlined),
                      label: const Text('WhatsApp'),
                    ),
                ],
              ),
              const SizedBox(height: 20),
              Text('Or send us a message', style: context.text.titleMedium),
              const SizedBox(height: 12),
            ],
            TextFormField(
              controller: _name,
              textCapitalization: TextCapitalization.words,
              decoration: const InputDecoration(labelText: 'Your name'),
              validator: (v) => (v ?? '').trim().length < 2 ? 'Enter your name' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _phone,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(labelText: 'Mobile number', prefixText: '+91 '),
              validator: (v) {
                final t = (v ?? '').trim();
                final email = _email.text.trim();
                if (t.isEmpty && email.isEmpty) return 'Add a phone number or email so we can reply';
                if (t.isNotEmpty && normalizeIndianPhone(t) == null) return 'Enter a valid mobile number';
                return null;
              },
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(labelText: 'Email (optional)'),
              validator: (v) {
                final t = (v ?? '').trim();
                if (t.isEmpty) return null;
                return RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(t) ? null : 'Enter a valid email address';
              },
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _subject,
              decoration: const InputDecoration(labelText: 'Subject (optional)'),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _message,
              minLines: 4,
              maxLines: 8,
              textCapitalization: TextCapitalization.sentences,
              decoration: const InputDecoration(
                labelText: 'Message',
                helperText: 'Please don’t include detailed medical information here.',
              ),
              validator: (v) => (v ?? '').trim().length < 5 ? 'Write a short message' : null,
            ),
            if (_error != null) ...[
              const SizedBox(height: 12),
              Text(_error!, style: TextStyle(color: context.colors.error)),
            ],
            const SizedBox(height: 20),
            FilledButton(
              onPressed: _sending ? null : _send,
              child: _sending
                  ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                  : const Text('Send message'),
            ),
          ],
        ),
      ),
    );
  }
}
