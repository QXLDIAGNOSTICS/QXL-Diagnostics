import 'dart:async';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:material_ui/material_ui.dart';

import 'package:qxl_core/qxl_core.dart';

import '../../data/models/content.dart';
import '../../data/models/records.dart';
import '../../data/providers.dart';
import '../../routing/router.dart';
import '../auth/auth_controller.dart';
import '../bookings/bookings_screen.dart';

final prescriptionsProvider = FutureProvider.autoDispose<Paged<Prescription>>((ref) {
  ref.watch(currentUserIdProvider);
  return ref.watch(prescriptionRepositoryProvider).list();
});

final uploadQuotaProvider = FutureProvider.autoDispose<UploadQuota>((ref) {
  ref.watch(currentUserIdProvider);
  return ref.watch(prescriptionRepositoryProvider).quota();
});

class _PickedFile {
  const _PickedFile({required this.path, required this.name, required this.mimeType, required this.size});
  final String path;
  final String name;
  final String mimeType;
  final int size;
}

String? _mimeFor(String name) {
  final lower = name.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.webp')) return 'image/webp';
  return null;
}

class PrescriptionsScreen extends ConsumerStatefulWidget {
  const PrescriptionsScreen({super.key});

  @override
  ConsumerState<PrescriptionsScreen> createState() => _PrescriptionsScreenState();
}

class _PrescriptionsScreenState extends ConsumerState<PrescriptionsScreen> {
  double? _progress;
  CancelToken? _cancel;

  Future<_PickedFile?> _pick(_Source source) async {
    try {
      switch (source) {
        case _Source.camera:
        case _Source.gallery:
          final image = await ImagePicker().pickImage(
            source: source == _Source.camera ? ImageSource.camera : ImageSource.gallery,
            imageQuality: 85,
            maxWidth: 2400,
          );
          if (image == null) return null;
          final name = image.name;
          return _PickedFile(
            path: image.path,
            name: name,
            mimeType: image.mimeType ?? _mimeFor(name) ?? 'image/jpeg',
            size: await image.length(),
          );
        case _Source.pdf:
          final file = await FilePicker.pickFile(type: FileType.custom, allowedExtensions: const ['pdf']);
          final path = file?.path;
          if (file == null || path == null) return null;
          return _PickedFile(
            path: path,
            name: file.name,
            mimeType: 'application/pdf',
            size: await file.length() ?? await File(path).length(),
          );
      }
    } catch (_) {
      if (mounted) showSnack(context, 'Couldn’t open the picker. Check the app’s permissions in Settings.');
      return null;
    }
  }

  Future<void> _upload(_Source source) async {
    final picked = await _pick(source);
    if (picked == null || !mounted) return;
    if (!ApiContract.prescriptionMimeTypes.contains(picked.mimeType)) {
      showSnack(context, 'Please choose a PDF, JPG, PNG or WEBP file.');
      return;
    }
    if (picked.size > ApiContract.maxUploadBytes) {
      showSnack(
        context,
        'That file is ${fileSize(picked.size)}. The limit is ${fileSize(ApiContract.maxUploadBytes)}.',
      );
      return;
    }
    final cancel = CancelToken();
    setState(() {
      _progress = 0;
      _cancel = cancel;
    });
    try {
      final prescription = await ref
          .read(prescriptionRepositoryProvider)
          .upload(
            filePath: picked.path,
            filename: picked.name,
            mimeType: picked.mimeType,
            cancelToken: cancel,
            onProgress: (sent, total) {
              if (mounted && total > 0) setState(() => _progress = sent / total);
            },
          );
      if (!mounted) return;
      ref.invalidate(prescriptionsProvider);
      ref.invalidate(uploadQuotaProvider);
      unawaited(context.push(Routes.prescription(prescription.id)));
    } catch (e) {
      if (!mounted) return;
      if (e is ApiException && e.kind == ApiErrorKind.cancelled) {
        showSnack(context, 'Upload cancelled');
      } else {
        showSnack(context, describeError(e));
        ref.invalidate(uploadQuotaProvider);
      }
    } finally {
      if (mounted) {
        setState(() {
          _progress = null;
          _cancel = null;
        });
      }
    }
  }

  Future<void> _chooseSource() async {
    final source = await showModalBottomSheet<_Source>(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.photo_camera_outlined),
              title: const Text('Take a photo'),
              onTap: () => Navigator.pop(context, _Source.camera),
            ),
            ListTile(
              leading: const Icon(Icons.photo_library_outlined),
              title: const Text('Choose from photos'),
              onTap: () => Navigator.pop(context, _Source.gallery),
            ),
            ListTile(
              leading: const Icon(Icons.picture_as_pdf_outlined),
              title: const Text('Choose a PDF'),
              onTap: () => Navigator.pop(context, _Source.pdf),
            ),
          ],
        ),
      ),
    );
    if (source != null) await _upload(source);
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authControllerProvider).value;
    return Scaffold(
      appBar: AppBar(title: const Text('Prescriptions')),
      body: user == null
          ? const SignInPrompt(
              icon: Icons.upload_file_outlined,
              title: 'Upload a prescription',
              message: 'Sign in to upload a prescription. QXL will help you find the tests your doctor asked for.',
            )
          : _content(),
    );
  }

  Widget _content() {
    final quota = ref.watch(uploadQuotaProvider);
    final list = ref.watch(prescriptionsProvider);
    final remaining = quota.value?.remaining;
    final uploading = _progress != null;
    return RefreshIndicator(
      onRefresh: () async {
        ref
          ..invalidate(uploadQuotaProvider)
          ..invalidate(prescriptionsProvider);
        await ref.read(prescriptionsProvider.future);
      },
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 24),
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Upload your prescription', style: context.text.titleMedium),
                  const SizedBox(height: 6),
                  Text(
                    'Photo or PDF. We read the tests your doctor prescribed so you can find them quickly — '
                    'nothing is booked until you choose.',
                    style: context.text.bodyMedium?.copyWith(color: context.colors.onSurfaceVariant),
                  ),
                  const SizedBox(height: 12),
                  quota.when(
                    data: (q) => Text(
                      '${q.remaining} of ${q.limit} uploads left this month'
                      '${q.resetsAt != null ? ' · resets ${formatDate(q.resetsAt!)}' : ''}',
                      style: context.text.labelLarge,
                    ),
                    loading: () => const SkeletonBox(height: 16, width: 180),
                    error: (e, _) =>
                        ErrorState(error: e, compact: true, onRetry: () => ref.invalidate(uploadQuotaProvider)),
                  ),
                  const SizedBox(height: 16),
                  if (uploading) ...[
                    Semantics(
                      label: 'Uploading, ${((_progress ?? 0) * 100).round()} percent',
                      child: LinearProgressIndicator(value: _progress),
                    ),
                    const SizedBox(height: 8),
                    TextButton(onPressed: () => _cancel?.cancel(), child: const Text('Cancel upload')),
                  ] else
                    SizedBox(
                      width: double.infinity,
                      child: FilledButton.icon(
                        onPressed: remaining == null || remaining <= 0 ? null : _chooseSource,
                        icon: const Icon(Icons.upload_file_outlined),
                        label: Text(
                          remaining != null && remaining <= 0 ? 'Monthly limit reached' : 'Upload prescription',
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
          const SectionHeader(title: 'Your uploads', padding: EdgeInsets.fromLTRB(0, 24, 0, 8)),
          list.when(
            loading: () =>
                const Column(children: [SkeletonBox(height: 72), SizedBox(height: 10), SkeletonBox(height: 72)]),
            error: (e, _) => ErrorState(error: e, onRetry: () => ref.invalidate(prescriptionsProvider)),
            data: (page) => page.items.isEmpty
                ? Padding(
                    padding: const EdgeInsets.symmetric(vertical: 24),
                    child: Text(
                      'No prescriptions uploaded yet.',
                      style: context.text.bodyMedium,
                      textAlign: TextAlign.center,
                    ),
                  )
                : Column(
                    children: [
                      for (final p in page.items) ...[
                        Card(
                          child: ListTile(
                            leading: Icon(p.isPdf ? Icons.picture_as_pdf_outlined : Icons.image_outlined),
                            title: Text(p.filename, maxLines: 1, overflow: TextOverflow.ellipsis),
                            subtitle: Text(analysisStatusLabel(p.analysisStatus)),
                            trailing: const Icon(Icons.chevron_right),
                            onTap: () => context.push(Routes.prescription(p.id)),
                          ),
                        ),
                        const SizedBox(height: 8),
                      ],
                    ],
                  ),
          ),
          const SizedBox(height: 16),
          const MedicalNotice(
            text:
                'Prescription reading is automated and can make mistakes. It is not a diagnosis. '
                'Always follow your doctor’s advice.',
          ),
        ],
      ),
    );
  }
}

enum _Source { camera, gallery, pdf }

String analysisStatusLabel(String status) => switch (status) {
  'pending' => 'Waiting to be read',
  'processing' => 'Reading your prescription…',
  'completed' => 'Ready to review',
  'failed' => 'Couldn’t be read',
  _ => titleCase(status),
};
