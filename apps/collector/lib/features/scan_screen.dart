import 'package:flutter/services.dart';
import 'package:material_ui/material_ui.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:qxl_core/qxl_core.dart';

import '../data/job_actions.dart';

/// Scans one barcode (or lets the collector type it when the camera can't
/// read a damaged label). Returns the upper-cased code.
Future<String?> scanBarcode(BuildContext context, {String title = 'Scan specimen label'}) =>
    Navigator.of(context)
        .push<String>(MaterialPageRoute(builder: (_) => _ScanScreen(title: title), fullscreenDialog: true));

class _ScanScreen extends StatefulWidget {
  const _ScanScreen({required this.title});

  final String title;

  @override
  State<_ScanScreen> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<_ScanScreen> {
  final _controller = MobileScannerController(detectionSpeed: DetectionSpeed.noDuplicates);
  bool _done = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onDetect(BarcodeCapture capture) {
    if (_done) return;
    for (final b in capture.barcodes) {
      final value = b.rawValue?.trim();
      if (value != null && barcodePattern.hasMatch(value)) {
        _done = true;
        HapticFeedback.mediumImpact();
        Navigator.pop(context, value.toUpperCase());
        return;
      }
    }
  }

  Future<void> _manual() async {
    final controller = TextEditingController();
    final value = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Type the label'),
        content: TextField(
          controller: controller,
          autofocus: true,
          textCapitalization: TextCapitalization.characters,
          decoration: const InputDecoration(labelText: 'Barcode number'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          FilledButton(onPressed: () => Navigator.pop(context, controller.text.trim()), child: const Text('Use')),
        ],
      ),
    );
    if (value == null || !mounted) return;
    if (!barcodePattern.hasMatch(value)) {
      showSnack(context, 'That isn’t a valid label number.');
      return;
    }
    Navigator.pop(context, value.toUpperCase());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Colors.black,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            tooltip: 'Torch',
            color: Colors.white,
            onPressed: _controller.toggleTorch,
            icon: const Icon(Icons.flashlight_on_outlined),
          ),
        ],
      ),
      body: Stack(
        children: [
          MobileScanner(
            controller: _controller,
            onDetect: _onDetect,
            errorBuilder: (context, error) => Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Text(
                  'Camera unavailable (${error.errorCode.name}). Allow camera access in Settings, or type the label.',
                  style: const TextStyle(color: Colors.white),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ),
          Center(
            child: Container(
              width: 280,
              height: 160,
              decoration: BoxDecoration(
                border: Border.all(color: Brand.accent, width: 3),
                borderRadius: BorderRadius.circular(16),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: FilledButton.tonalIcon(
                  onPressed: _manual,
                  icon: const Icon(Icons.keyboard_outlined),
                  label: const Text('Type label instead'),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
