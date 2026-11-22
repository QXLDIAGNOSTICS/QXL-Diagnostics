import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';
import 'package:qxl_core/qxl_core.dart';

import '../data/providers.dart';
import 'login_screen.dart' show AuthScaffold;

/// New password + confirmation with the shared rule and a show/hide toggle.
class _NewPasswordFields extends StatefulWidget {
  const _NewPasswordFields({required this.password, required this.confirm, this.onSubmitted});

  final TextEditingController password;
  final TextEditingController confirm;
  final VoidCallback? onSubmitted;

  @override
  State<_NewPasswordFields> createState() => _NewPasswordFieldsState();
}

class _NewPasswordFieldsState extends State<_NewPasswordFields> {
  bool _obscure = true;

  @override
  void initState() {
    super.initState();
    widget.password.addListener(_changed);
  }

  @override
  void dispose() {
    widget.password.removeListener(_changed);
    super.dispose();
  }

  void _changed() => setState(() {});

  @override
  Widget build(BuildContext context) {
    final value = widget.password.text;
    final problem = value.isEmpty ? null : passwordProblem(value);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        TextField(
          controller: widget.password,
          obscureText: _obscure,
          autofillHints: const [AutofillHints.newPassword],
          decoration: InputDecoration(
            labelText: 'New password',
            prefixIcon: const Icon(Icons.lock_outline),
            suffixIcon: IconButton(
              tooltip: _obscure ? 'Show password' : 'Hide password',
              icon: Icon(_obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined),
              onPressed: () => setState(() => _obscure = !_obscure),
            ),
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: widget.confirm,
          obscureText: _obscure,
          autofillHints: const [AutofillHints.newPassword],
          onSubmitted: (_) => widget.onSubmitted?.call(),
          decoration: const InputDecoration(labelText: 'Confirm new password', prefixIcon: Icon(Icons.lock_outline)),
        ),
        const SizedBox(height: 8),
        Text(
          problem ?? '8 or more characters with letters and numbers. Don’t use your phone number or email.',
          style: context.text.bodySmall?.copyWith(
            color: problem == null ? context.colors.onSurfaceVariant : context.colors.error,
          ),
        ),
      ],
    );
  }
}

String? _checkNew(TextEditingController password, TextEditingController confirm) {
  final problem = passwordProblem(password.text);
  if (problem != null) return problem;
  if (password.text != confirm.text) return 'The two passwords don’t match.';
  return null;
}

/// First sign-in with a temporary password from the administrator.
class SetPasswordScreen extends ConsumerStatefulWidget {
  const SetPasswordScreen({super.key});

  @override
  ConsumerState<SetPasswordScreen> createState() => _SetPasswordScreenState();
}

class _SetPasswordScreenState extends ConsumerState<SetPasswordScreen> {
  final _current = TextEditingController();
  final _password = TextEditingController();
  final _confirm = TextEditingController();
  bool _busy = false;
  String? _error;

  @override
  void dispose() {
    _current.dispose();
    _password.dispose();
    _confirm.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (_current.text.isEmpty) {
      setState(() => _error = 'Enter the temporary password you were given.');
      return;
    }
    final problem = _checkNew(_password, _confirm);
    if (problem != null) {
      setState(() => _error = problem);
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await ref.read(sessionProvider.notifier).changeTemporaryPassword(_current.text, _password.text);
      TextInput.finishAutofillContext();
      if (mounted) showSnack(context, 'Password saved. Welcome to QXL Collector.');
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AuthScaffold(
      icon: Icons.key_outlined,
      title: 'Set your password',
      subtitle: 'You signed in with a temporary password from your administrator. Choose your own to continue.',
      children: [
        AutofillGroup(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextField(
                controller: _current,
                obscureText: true,
                autofillHints: const [AutofillHints.password],
                decoration: const InputDecoration(labelText: 'Temporary password', prefixIcon: Icon(Icons.password)),
              ),
              const SizedBox(height: 12),
              _NewPasswordFields(password: _password, confirm: _confirm, onSubmitted: _submit),
            ],
          ),
        ),
        const SizedBox(height: 20),
        _ErrorText(_error),
        GradientButton(label: 'Save password', busy: _busy, onPressed: _submit),
        const SizedBox(height: 8),
        TextButton(
          onPressed: _busy
              ? null
              : () async {
                  try {
                    await ref.read(sessionProvider.notifier).signOut(force: true);
                  } catch (_) {}
                },
          child: const Text('Sign out'),
        ),
      ],
    );
  }
}

/// Forgot password (signed out) or change password (signed in): a code by
/// SMS plus a second code by email, then a new password. Signs out
/// everywhere, including this phone.
class ResetPasswordScreen extends ConsumerStatefulWidget {
  const ResetPasswordScreen({super.key, this.identifier, this.signedIn = false});

  final String? identifier;
  final bool signedIn;

  @override
  ConsumerState<ResetPasswordScreen> createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends ConsumerState<ResetPasswordScreen> {
  late final _identifier = TextEditingController(text: widget.identifier ?? '');
  final _phoneCode = TextEditingController();
  final _emailCode = TextEditingController();
  final _password = TextEditingController();
  final _confirm = TextEditingController();
  PasswordResetStart? _started;
  bool _busy = false;
  String? _error;

  @override
  void dispose() {
    for (final c in [_identifier, _phoneCode, _emailCode, _password, _confirm]) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _send() async {
    if (_identifier.text.trim().length < 3) {
      setState(() => _error = 'Enter your registered phone or email.');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final started = await ref.read(repositoryProvider).forgotPassword(_identifier.text);
      if (mounted) setState(() => _started = started);
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _reset() async {
    final started = _started;
    if (started == null) return;
    if (_phoneCode.text.trim().length < 4) {
      setState(() => _error = 'Enter the code from the SMS.');
      return;
    }
    final problem = _checkNew(_password, _confirm);
    if (problem != null) {
      setState(() => _error = problem);
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await ref
          .read(repositoryProvider)
          .resetPassword(
            resetId: started.resetId,
            phoneCode: _phoneCode.text,
            emailCode: _emailCode.text,
            newPassword: _password.text,
          );
      if (!mounted) return;
      if (widget.signedIn) {
        // Every session ended on the server; finish signing out here too.
        try {
          await ref.read(sessionProvider.notifier).signOut(force: true);
        } catch (_) {}
      }
      if (!mounted) return;
      showSnack(context, 'Password changed. Sign in with your new password.');
      context.go('/login');
    } catch (e) {
      if (mounted) setState(() => _error = describeError(e));
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final started = _started;
    return AuthScaffold(
      icon: Icons.lock_reset_outlined,
      title: widget.signedIn ? 'Change password' : 'Reset password',
      subtitle: started == null
          ? 'We’ll send one code by SMS and another to your email. You need both.'
          : started.message,
      onBack: () => context.canPop() ? context.pop() : context.go('/login'),
      children: [
        if (started == null) ...[
          TextField(
            controller: _identifier,
            readOnly: widget.signedIn,
            keyboardType: TextInputType.emailAddress,
            autofillHints: const [AutofillHints.username],
            onSubmitted: (_) => _send(),
            decoration: const InputDecoration(labelText: 'Phone or email', prefixIcon: Icon(Icons.person_outline)),
          ),
          const SizedBox(height: 20),
          _ErrorText(_error),
          GradientButton(label: 'Send codes', busy: _busy, onPressed: _send),
        ] else ...[
          TextField(
            controller: _phoneCode,
            keyboardType: TextInputType.number,
            autofillHints: const [AutofillHints.oneTimeCode],
            inputFormatters: [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(8)],
            decoration: const InputDecoration(labelText: 'Code from SMS', prefixIcon: Icon(Icons.sms_outlined)),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _emailCode,
            keyboardType: TextInputType.number,
            inputFormatters: [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(8)],
            decoration: const InputDecoration(labelText: 'Code from email', prefixIcon: Icon(Icons.mail_outline)),
          ),
          const SizedBox(height: 12),
          _NewPasswordFields(password: _password, confirm: _confirm, onSubmitted: _reset),
          const SizedBox(height: 20),
          _ErrorText(_error),
          GradientButton(label: 'Save new password', busy: _busy, onPressed: _reset),
          TextButton(
            onPressed: _busy ? null : () => setState(() => _started = null),
            child: const Text('Send new codes'),
          ),
        ],
      ],
    );
  }
}

class _ErrorText extends StatelessWidget {
  const _ErrorText(this.error);

  final String? error;

  @override
  Widget build(BuildContext context) {
    if (error == null) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Semantics(
        liveRegion: true,
        child: Text(error!, style: TextStyle(color: context.colors.error)),
      ),
    );
  }
}
