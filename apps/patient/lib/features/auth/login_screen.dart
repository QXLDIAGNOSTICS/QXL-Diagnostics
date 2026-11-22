import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/providers.dart';
import '../../routing/router.dart';
import 'auth_controller.dart';

/// Phone → one-time code. The backend creates the patient account on the
/// first verified login, so there is no separate registration step.
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _phone = TextEditingController();
  final _otp = TextEditingController();
  final _phoneKey = GlobalKey<FormState>();
  final _otpFocus = FocusNode();

  LoginChallenge? _challenge;
  String? _phoneE164;
  bool _busy = false;
  String? _error;
  Timer? _timer;
  int _resendIn = 0;
  DateTime? _expiresAt;

  /// Client-side courtesy delay; the server separately rate-limits requests.
  static const _resendCooldown = 30;

  @override
  void dispose() {
    _timer?.cancel();
    _phone.dispose();
    _otp.dispose();
    _otpFocus.dispose();
    super.dispose();
  }

  void _startTimers(LoginChallenge challenge) {
    _expiresAt = DateTime.now().add(Duration(seconds: challenge.otpExpiresIn));
    _resendIn = _resendCooldown;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) return t.cancel();
      setState(() => _resendIn = _resendIn > 0 ? _resendIn - 1 : 0);
    });
  }

  Future<void> _requestCode() async {
    if (!(_phoneKey.currentState?.validate() ?? false)) return;
    final phone = normalizeIndianPhone(_phone.text)!;
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final challenge = await ref.read(authControllerProvider.notifier).requestOtp(phone);
      if (!mounted) return;
      if (challenge.requiresAdminSecret) {
        setState(() => _error = 'This number belongs to a staff account. Please use the QXL admin portal.');
        return;
      }
      setState(() {
        _challenge = challenge;
        _phoneE164 = phone;
        _otp.clear();
      });
      _startTimers(challenge);
      _otpFocus.requestFocus();
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _verify() async {
    final challenge = _challenge;
    final code = _otp.text.trim();
    if (challenge == null || code.length < 4) return;
    if (_expiresAt != null && DateTime.now().isAfter(_expiresAt!)) {
      setState(() => _error = 'This code has expired. Request a new one.');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final user = await ref
          .read(authControllerProvider.notifier)
          .verifyOtp(challengeId: challenge.challengeId, otp: code);
      if (!mounted) return;
      TextInput.finishAutofillContext();
      if (user.needsProfile) {
        context.pushReplacement('${Routes.profile}?complete=1');
      } else {
        context.pop(true);
      }
    } catch (e) {
      if (!mounted) return;
      final message = describeError(e);
      setState(() => _error = message);
      // "Too many incorrect attempts" / consumed challenge: start over.
      if (e is ApiException && e.kind == ApiErrorKind.unauthorized && message.toLowerCase().contains('log in again')) {
        setState(() => _challenge = null);
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final config = ref.watch(appConfigProvider);
    final challenge = _challenge;
    return Scaffold(
      appBar: AppBar(
        leading: challenge != null
            ? IconButton(
                tooltip: 'Change number',
                icon: const BackButtonIcon(),
                onPressed: _busy ? null : () => setState(() => _challenge = null),
              )
            : null,
      ),
      body: DecoratedBox(
        decoration: const BoxDecoration(gradient: Brand.washGradient),
        child: SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
            children: [
              BrandCard(
                padding: const EdgeInsets.fromLTRB(20, 28, 20, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Center(child: QxlWordmark(size: 44)),
                    const SizedBox(height: 24),
                    Semantics(
                      header: true,
                      child: Text(
                        challenge == null ? 'Patient Portal' : 'Enter your code',
                        textAlign: TextAlign.center,
                        style: context.text.headlineSmall?.copyWith(color: Brand.navy, fontWeight: FontWeight.w800),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      challenge == null
                          ? 'Secure sign-in with your mobile number and an 8-digit code. New to QXL? Your account is created when you verify.'
                          : 'We sent a code to ${challenge.maskedPhone}${challenge.emailedToo ? ' and ${challenge.maskedEmail}' : ''}.',
                      textAlign: TextAlign.center,
                      style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
                    ),
                    const SizedBox(height: 24),
                    if (challenge == null) _phoneStep() else _otpStep(),
                    if (_error != null) ...[
                      const SizedBox(height: 16),
                      Semantics(
                        liveRegion: true,
                        child: Text(
                          _error!,
                          textAlign: TextAlign.center,
                          style: context.text.bodyMedium?.copyWith(color: context.colors.error),
                        ),
                      ),
                    ],
                    const SizedBox(height: 20),
                    const Divider(),
                    const SizedBox(height: 12),
                    Wrap(
                      alignment: WrapAlignment.center,
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        Text('By signing in, you agree to QXL’s ', style: context.text.bodySmall),
                        InlineLink('Terms', onTap: () => Launch.web(context, config.termsUrl)),
                        Text(' and ', style: context.text.bodySmall),
                        InlineLink('Privacy Policy', onTap: () => Launch.web(context, config.privacyPolicyUrl)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.lock_outline, size: 16, color: context.colors.onSurfaceVariant),
                  const SizedBox(width: 6),
                  Flexible(
                    child: Text(
                      'Your reports and health details stay private to your account.',
                      textAlign: TextAlign.center,
                      style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _phoneStep() {
    return Form(
      key: _phoneKey,
      child: AutofillGroup(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextFormField(
              controller: _phone,
              autofocus: true,
              keyboardType: TextInputType.phone,
              textInputAction: TextInputAction.done,
              autofillHints: const [AutofillHints.telephoneNumberNational],
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'[\d +\-]')),
                LengthLimitingTextInputFormatter(16),
              ],
              decoration: const InputDecoration(
                labelText: 'Mobile number',
                prefixText: '+91 ',
                prefixIcon: Icon(Icons.phone_iphone),
              ),
              validator: (v) => normalizeIndianPhone(v ?? '') == null ? 'Enter a valid 10-digit mobile number' : null,
              onFieldSubmitted: (_) => _requestCode(),
            ),
            const SizedBox(height: 20),
            GradientButton(label: 'Send code', busy: _busy, onPressed: _requestCode),
          ],
        ),
      ),
    );
  }

  Widget _otpStep() {
    return AutofillGroup(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          TextField(
            controller: _otp,
            focusNode: _otpFocus,
            keyboardType: TextInputType.number,
            textInputAction: TextInputAction.done,
            autofillHints: const [AutofillHints.oneTimeCode],
            inputFormatters: [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(8)],
            textAlign: TextAlign.center,
            style: context.text.headlineSmall?.copyWith(letterSpacing: 8),
            decoration: const InputDecoration(labelText: 'One-time code', counterText: ''),
            onChanged: (_) => setState(() {}),
            onSubmitted: (_) => _verify(),
          ),
          const SizedBox(height: 20),
          GradientButton(
            label: 'Verify and sign in',
            busy: _busy,
            onPressed: _otp.text.trim().length < 4 ? null : _verify,
          ),
          const SizedBox(height: 8),
          TextButton(
            onPressed: _busy || _resendIn > 0 ? null : _requestCode,
            child: Text(_resendIn > 0 ? 'Resend code in ${_resendIn}s' : 'Resend code'),
          ),
          if (_phoneE164 != null)
            Text(
              'Code sent to $_phoneE164',
              textAlign: TextAlign.center,
              style: context.text.bodySmall?.copyWith(color: context.colors.onSurfaceVariant),
            ),
        ],
      ),
    );
  }
}
