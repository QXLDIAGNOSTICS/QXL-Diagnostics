import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../data/providers.dart';

/// Branded frame for the sign-in, password and reset screens: a navy header
/// with the QXL lock-up and a white form card.
class AuthScaffold extends StatelessWidget {
  const AuthScaffold({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.children,
    this.onBack,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final List<Widget> children;
  final VoidCallback? onBack;

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion(
      value: SystemUiOverlayStyle.light,
      child: Scaffold(
        body: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  DecoratedBox(
                    decoration: const BoxDecoration(gradient: Brand.fieldGradient),
                    child: SafeArea(
                      bottom: false,
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(20, 12, 20, 56),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                if (onBack != null)
                                  IconButton(
                                    tooltip: 'Back',
                                    color: Colors.white,
                                    onPressed: onBack,
                                    icon: const Icon(Icons.arrow_back),
                                  ),
                                const QxlWordmark(size: 36, subtitle: 'Collector', onDark: true),
                              ],
                            ),
                            const SizedBox(height: 28),
                            Semantics(
                              header: true,
                              child: Text(title, style: context.text.headlineMedium?.copyWith(color: Colors.white)),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              subtitle,
                              style: context.text.bodyLarge?.copyWith(color: Colors.white.withValues(alpha: 0.82)),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Transform.translate(
                    offset: const Offset(0, -32),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: BrandCard(
                        padding: const EdgeInsets.fromLTRB(20, 24, 20, 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: IconTile(icon: icon),
                            ),
                            const SizedBox(height: 16),
                            ...children,
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
                child: Text(
                  'For QXL field staff only. Accounts are created by your QXL administrator.',
                  textAlign: TextAlign.center,
                  style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

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
      _otp.clear();
      setState(() => _challenge = challenge);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _submitOtp() async {
    final challenge = _challenge;
    if (challenge == null) return;
    if (_otp.text.trim().length < 6) {
      setState(() => _error = 'Enter the code from the SMS.');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await ref.read(sessionProvider.notifier).verifyOtp(challenge.challengeId, _otp.text.trim());
      TextInput.finishAutofillContext();
      _password.clear();
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final challenge = _challenge;
    return AuthScaffold(
      icon: challenge == null ? Icons.badge_outlined : Icons.sms_outlined,
      title: challenge == null ? 'Sign in' : 'Verify it’s you',
      subtitle: challenge == null
          ? 'Use the phone number or email and password from your QXL administrator.'
          : 'Enter the code we sent to ${challenge.maskedPhone}.',
      onBack: challenge == null ? null : () => setState(() => _challenge = null),
      children: [
        if (challenge == null) ...[
          AutofillGroup(
            child: Column(
              children: [
                TextField(
                  controller: _identifier,
                  keyboardType: TextInputType.emailAddress,
                  autofillHints: const [AutofillHints.username],
                  textInputAction: TextInputAction.next,
                  decoration: const InputDecoration(
                    labelText: 'Phone or email',
                    prefixIcon: Icon(Icons.person_outline),
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _password,
                  obscureText: _obscure,
                  autofillHints: const [AutofillHints.password],
                  onSubmitted: (_) => _submitPassword(),
                  decoration: InputDecoration(
                    labelText: 'Password',
                    prefixIcon: const Icon(Icons.lock_outline),
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
          Align(
            alignment: Alignment.centerRight,
            child: TextButton(
              onPressed: _busy ? null : () => context.push('/forgot-password', extra: _identifier.text.trim()),
              child: const Text('Forgot password?'),
            ),
          ),
          const SizedBox(height: 4),
          _Error(_error),
          GradientButton(label: 'Continue', icon: Icons.arrow_forward, busy: _busy, onPressed: _submitPassword),
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
          _Error(_error),
          GradientButton(
            label: 'Verify and sign in',
            icon: Icons.verified_user_outlined,
            busy: _busy,
            onPressed: _submitOtp,
          ),
          const SizedBox(height: 4),
          TextButton(onPressed: _busy ? null : _submitPassword, child: const Text('Send a new code')),
        ],
      ],
    );
  }
}

class _Error extends StatelessWidget {
  const _Error(this.error);

  final String? error;

  @override
  Widget build(BuildContext context) {
    if (error == null) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Semantics(
        liveRegion: true,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(Icons.error_outline, color: context.colors.error, size: 20),
            const SizedBox(width: 8),
            Expanded(
              child: Text(error!, style: TextStyle(color: context.colors.error)),
            ),
          ],
        ),
      ),
    );
  }
}
