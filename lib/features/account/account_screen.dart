import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../../core/launch.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/states.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';

class AccountScreen extends ConsumerWidget {
  const AccountScreen({super.key});

  Future<void> _signOut(BuildContext context, WidgetRef ref) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Sign out?'),
        content: const Text('You can sign in again any time with your mobile number.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Sign out')),
        ],
      ),
    );
    if (ok != true) return;
    await ref.read(authControllerProvider.notifier).signOut();
    if (context.mounted) showSnack(context, 'Signed out');
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final auth = ref.watch(authControllerProvider);
    final user = auth.value;
    final settings = ref.watch(siteSettingsProvider).value;
    final config = ref.watch(appConfigProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Account')),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 24),
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: auth.isLoading && user == null
                    ? const SkeletonBox(height: 56)
                    : auth.hasError && user == null
                    ? ErrorState(
                        error: auth.error!,
                        compact: true,
                        onRetry: () => ref.read(authControllerProvider.notifier).reload(),
                      )
                    : user == null
                    ? Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Welcome to QXL', style: context.text.titleLarge),
                          const SizedBox(height: 4),
                          const Text('Sign in to see your bookings, reports and prescriptions.'),
                          const SizedBox(height: 12),
                          FilledButton.icon(
                            onPressed: () => context.push(Routes.login),
                            icon: const Icon(Icons.login_rounded),
                            label: const Text('Sign in with mobile number'),
                          ),
                        ],
                      )
                    : Row(
                        children: [
                          CircleAvatar(
                            radius: 28,
                            backgroundColor: context.colors.primaryContainer,
                            child: Text(
                              user.displayName.characters.first.toUpperCase(),
                              style: context.text.titleLarge?.copyWith(color: context.colors.onPrimaryContainer),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(user.displayName, style: context.text.titleMedium),
                                Text(user.phone, style: context.text.bodyMedium),
                                if (user.email != null) Text(user.email!, style: context.text.bodySmall),
                              ],
                            ),
                          ),
                          IconButton(
                            tooltip: 'Edit profile',
                            onPressed: () => context.push(Routes.profile),
                            icon: const Icon(Icons.edit_outlined),
                          ),
                        ],
                      ),
              ),
            ),
          ),
          if (user != null && user.needsProfile)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
              child: Card(
                color: context.status.warningContainer,
                child: ListTile(
                  leading: const Icon(Icons.badge_outlined),
                  title: const Text('Complete your profile'),
                  subtitle: const Text('Add your name so it appears on bookings and reports.'),
                  onTap: () => context.push(Routes.profile),
                ),
              ),
            ),
          _Group(
            title: 'Health',
            tiles: [
              _Tile(Icons.event_note_outlined, 'My bookings & reports', () => context.go(Routes.bookings)),
              _Tile(Icons.upload_file_outlined, 'Prescriptions', () => context.push(Routes.prescriptions)),
              if (settings?.aiChatEnabled ?? true)
                _Tile(Icons.auto_awesome_outlined, 'QXL Assistant', () => context.push(Routes.assistant)),
            ],
          ),
          _Group(
            title: 'Explore',
            tiles: [
              _Tile(Icons.location_on_outlined, 'Centres', () => context.push(Routes.centers)),
              _Tile(Icons.medical_information_outlined, 'Our doctors', () => context.push(Routes.doctors)),
              _Tile(Icons.article_outlined, 'Health articles', () => context.push(Routes.blog)),
            ],
          ),
          _Group(
            title: 'Help',
            tiles: [
              _Tile(Icons.help_outline, 'FAQs', () => context.push(Routes.faqs)),
              _Tile(Icons.mail_outline, 'Contact us', () => context.push(Routes.contact)),
              if (settings?.phoneE164 != null)
                _Tile(
                  Icons.call_outlined,
                  'Call ${settings!.phoneDisplay ?? settings.phoneE164!}',
                  () => Launch.phone(context, settings.phoneE164!),
                ),
            ],
          ),
          _Group(
            title: 'Legal',
            tiles: [
              _Tile(Icons.privacy_tip_outlined, 'Privacy policy', () => Launch.web(context, config.privacyPolicyUrl)),
              _Tile(Icons.gavel_outlined, 'Terms of use', () => Launch.web(context, config.termsUrl)),
              _Tile(
                Icons.receipt_long_outlined,
                'Payment & refund terms',
                () => Launch.web(context, config.paymentTermsUrl),
              ),
              _Tile(Icons.info_outline, 'About this app', () => context.push(Routes.about)),
            ],
          ),
          if (user != null)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
              child: OutlinedButton.icon(
                onPressed: () => _signOut(context, ref),
                icon: const Icon(Icons.logout_rounded),
                label: const Text('Sign out'),
              ),
            ),
        ],
      ),
    );
  }
}

class _Tile {
  const _Tile(this.icon, this.label, this.onTap);
  final IconData icon;
  final String label;
  final VoidCallback onTap;
}

class _Group extends StatelessWidget {
  const _Group({required this.title, required this.tiles});

  final String title;
  final List<_Tile> tiles;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 4, bottom: 6),
            child: Semantics(
              header: true,
              child: Text(title, style: context.text.labelLarge?.copyWith(color: context.colors.primary)),
            ),
          ),
          Card(
            child: Column(
              children: [
                for (var i = 0; i < tiles.length; i++) ...[
                  if (i > 0) const Divider(indent: 56),
                  ListTile(
                    leading: Icon(tiles[i].icon),
                    title: Text(tiles[i].label),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: tiles[i].onTap,
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
