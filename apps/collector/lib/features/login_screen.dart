import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../data/providers.dart';

/// Staff sign-in: employee phone/email + password, then a one-time code.
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _identifier = TextEditingController();
  final _password = TextEditingController();
  final _otp = TextEditingController();
  LoginChallenge? _challenge;
  bool _busy = false;
  bool _obscure = true;
  String? _error;

  @override
  void dispose() {
    _identifier.dispose();
    _password.dispose();
    _otp.dispose();
    super.dispose();
  }

  Future<void> _submitPassword() async {
    if (_identifier.text.trim().isEmpty || _password.text.isEmpty) {
      setState(() => _error = 'Enter your registered phone or email and password.');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final challenge = await ref.read(sessionProvider.notifier).login(_identifier.text, _password.text);
      if (!mounted) return;
      if (challenge.requiresAdminSecret) {
        setState(() => _error = 'Administrator accounts can’t use the Collector app.');
        return;
      }
      setState(() => _challenge = challenge);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _submitOtp() async {
    final challenge = _challenge;
    if (challenge == null || _otp.text.trim().length < 4) return;
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await ref.read(sessionProvider.notifier).verifyOtp(challenge.challengeId, _otp.text.trim());
      TextInput.finishAutofillContext();
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final challenge = _challenge;
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(24, 48, 24, 24),
          children: [
            const Align(alignment: Alignment.centerLeft, child: QxlLogo(size: 64)),
            const SizedBox(height: 24),
            Semantics(header: true, child: Text('QXL Collector', style: context.text.headlineMedium)),
            const SizedBox(height: 6),
            Text(
              challenge == null
                  ? 'Sign in with your QXL staff account.'
                  : 'Enter the code sent to ${challenge.maskedPhone}.',
              style: context.text.bodyLarge?.copyWith(color: context.colors.onSurfaceVariant),
            ),
            const SizedBox(height: 28),
            if (challenge == null) ...[
              AutofillGroup(
                child: Column(
                  children: [
                    TextField(
                      controller: _identifier,
                      keyboardType: TextInputType.emailAddress,
                      autofillHints: const [AutofillHints.username],
                      decoration: const InputDecoration(labelText: 'Phone or email'),
                    ),
                    const SizedBox(height: 12),
                    TextField(
                      controller: _password,
                      obscureText: _obscure,
                      autofillHints: const [AutofillHints.password],
                      onSubmitted: (_) => _submitPassword(),
                      decoration: InputDecoration(
                        labelText: 'Password',
                        suffixIcon: IconButton(
                          tooltip: _obscure ? 'Show password' : 'Hide password',
                          icon: Icon(_obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined),
                          onPressed: () => setState(() => _obscure = !_obscure),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              FilledButton(
                onPressed: _busy ? null : _submitPassword,
                child: _busy
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                    : const Text('Continue'),
              ),
            ] else ...[
              TextField(
                controller: _otp,
                autofocus: true,
                keyboardType: TextInputType.number,
                autofillHints: const [AutofillHints.oneTimeCode],
                inputFormatters: [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(8)],
                textAlign: TextAlign.center,
                style: context.text.headlineSmall?.copyWith(letterSpacing: 8),
                decoration: const InputDecoration(labelText: 'One-time code'),
                onSubmitted: (_) => _submitOtp(),
              ),
              const SizedBox(height: 20),
              FilledButton(
                onPressed: _busy ? null : _submitOtp,
                child: _busy
                    ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(strokeWidth: 2.5))
                    : const Text('Verify and sign in'),
              ),
              TextButton(onPressed: _busy ? null : () => setState(() => _challenge = null), child: const Text('Back')),
            ],
            if (_error != null) ...[
              const SizedBox(height: 16),
              Semantics(
                liveRegion: true,
                child: Text(_error!, style: TextStyle(color: context.colors.error)),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
