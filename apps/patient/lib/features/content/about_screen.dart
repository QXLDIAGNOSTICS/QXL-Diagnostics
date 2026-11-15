import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:material_ui/material_ui.dart';
import 'package:package_info_plus/package_info_plus.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/providers.dart';

final _packageInfoProvider = FutureProvider<PackageInfo>((ref) => PackageInfo.fromPlatform());

class AboutScreen extends ConsumerWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final info = ref.watch(_packageInfoProvider).value;
    final config = ref.watch(appConfigProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('About')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Center(child: QxlLogo(size: 88)),
          const SizedBox(height: 16),
          Text('QXL Diagnostics', style: context.text.titleLarge, textAlign: TextAlign.center),
          if (info != null)
            Text(
              'Version ${info.version} (${info.buildNumber})${config.isProduction ? '' : ' · ${config.environment}'}',
              style: context.text.bodySmall,
              textAlign: TextAlign.center,
            ),
          const SizedBox(height: 24),
          Card(
            child: Column(
              children: [
                ListTile(
                  leading: const Icon(Icons.privacy_tip_outlined),
                  title: const Text('Privacy policy'),
                  trailing: const Icon(Icons.open_in_new, size: 18),
                  onTap: () => Launch.web(context, config.privacyPolicyUrl),
                ),
                const Divider(indent: 56),
                ListTile(
                  leading: const Icon(Icons.gavel_outlined),
                  title: const Text('Terms of use'),
                  trailing: const Icon(Icons.open_in_new, size: 18),
                  onTap: () => Launch.web(context, config.termsUrl),
                ),
                const Divider(indent: 56),
                ListTile(
                  leading: const Icon(Icons.receipt_long_outlined),
                  title: const Text('Payment & refund terms'),
                  trailing: const Icon(Icons.open_in_new, size: 18),
                  onTap: () => Launch.web(context, config.paymentTermsUrl),
                ),
                const Divider(indent: 56),
                ListTile(
                  leading: const Icon(Icons.description_outlined),
                  title: const Text('Open-source licences'),
                  onTap: () => showLicensePage(
                    context: context,
                    applicationName: 'QXL Diagnostics',
                    applicationVersion: info?.version,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          const MedicalNotice(),
        ],
      ),
    );
  }
}
