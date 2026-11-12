import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../data/models/catalog.dart';

@immutable
class CartItem {
  const CartItem({
    required this.kind,
    required this.id,
    required this.name,
    required this.priceRupees,
    required this.homeCollectionAvailable,
    this.unavailable = false,
  });

  factory CartItem.fromTest(LabTest t) => CartItem(
    kind: CatalogKind.test,
    id: t.id,
    name: t.name,
    priceRupees: t.price ?? 0,
    homeCollectionAvailable: t.homeCollectionAvailable,
  );

  factory CartItem.fromPackage(HealthPackage p) => CartItem(
    kind: CatalogKind.package,
    id: p.id,
    name: p.name,
    priceRupees: p.price,
    homeCollectionAvailable: p.homeCollectionAvailable,
  );

  factory CartItem.fromMatch(CatalogMatch m) => CartItem(
    kind: m.kind,
    id: m.id,
    name: m.name,
    priceRupees: m.price ?? 0,
    homeCollectionAvailable: m.homeCollectionAvailable,
  );

  static CartItem? fromJson(Map<String, dynamic> json) {
    final kind = CatalogKind.parse(json['kind']);
    final id = json['id'];
    final name = json['name'];
    if (kind == null || id is! String || name is! String) return null;
    return CartItem(
      kind: kind,
      id: id,
      name: name,
      priceRupees: json['price'] is int ? json['price'] as int : 0,
      homeCollectionAvailable: json['home'] != false,
    );
  }

  final CatalogKind kind;
  final String id;
  final String name;

  /// Display snapshot only; the server prices each booking on creation.
  final int priceRupees;
  final bool homeCollectionAvailable;

  /// Set when a refresh shows the item is no longer active/bookable.
  final bool unavailable;

  String get key => '${kind.name}:$id';

  Map<String, dynamic> toJson() => {
    'kind': kind.name,
    'id': id,
    'name': name,
    'price': priceRupees,
    'home': homeCollectionAvailable,
  };

  CartItem copyWith({String? name, int? priceRupees, bool? homeCollectionAvailable, bool? unavailable}) => CartItem(
    kind: kind,
    id: id,
    name: name ?? this.name,
    priceRupees: priceRupees ?? this.priceRupees,
    homeCollectionAvailable: homeCollectionAvailable ?? this.homeCollectionAvailable,
    unavailable: unavailable ?? this.unavailable,
  );
}

@immutable
class CartState {
  const CartState(this.items);

  final List<CartItem> items;

  bool get isEmpty => items.isEmpty;
  int get count => items.length;
  List<CartItem> get bookable => items.where((i) => !i.unavailable).toList();
  int get estimatedTotalRupees => bookable.fold(0, (sum, i) => sum + i.priceRupees);
  bool get homeCollectionPossible => bookable.every((i) => i.homeCollectionAvailable);
  bool contains(CatalogKind kind, String id) => items.any((i) => i.kind == kind && i.id == id);
}

/// Where the cart is persisted. The cart holds catalog ids/names only —
/// no personal data — so plain preferences are appropriate.
abstract interface class CartStorage {
  Future<String?> load();
  Future<void> save(String value);
}

class PreferencesCartStorage implements CartStorage {
  static const _key = 'qxl.cart.v1';
  final _prefs = SharedPreferencesAsync();

  @override
  Future<String?> load() => _prefs.getString(_key);

  @override
  Future<void> save(String value) => _prefs.setString(_key, value);
}

class MemoryCartStorage implements CartStorage {
  String? value;

  @override
  Future<String?> load() async => value;

  @override
  Future<void> save(String value) async => this.value = value;
}

final cartStorageProvider = Provider<CartStorage>((ref) => PreferencesCartStorage());

final cartProvider = NotifierProvider<CartController, CartState>(CartController.new);

class CartController extends Notifier<CartState> {
  bool _restored = false;

  @override
  CartState build() {
    _restore();
    return const CartState([]);
  }

  Future<void> _restore() async {
    if (_restored) return;
    _restored = true;
    try {
      final raw = await ref.read(cartStorageProvider).load();
      if (raw == null) return;
      final decoded = jsonDecode(raw);
      if (decoded is! List) return;
      final restored = decoded
          .whereType<Map<Object?, Object?>>()
          .map((e) => CartItem.fromJson(Map<String, dynamic>.from(e)))
          .whereType<CartItem>()
          .toList();
      // Items added before restore finished take precedence.
      final merged = [...state.items];
      for (final item in restored) {
        if (!merged.any((i) => i.key == item.key)) merged.add(item);
      }
      state = CartState(merged);
    } catch (_) {
      // A corrupt cart is not worth crashing for; start empty.
    }
  }

  void add(CartItem item) {
    if (state.items.any((i) => i.key == item.key)) return;
    _set([...state.items, item]);
  }

  void remove(CartItem item) => _set(state.items.where((i) => i.key != item.key).toList());

  void removeWhere(bool Function(CartItem) test) => _set(state.items.where((i) => !test(i)).toList());

  void clear() => _set(const []);

  /// Refreshes names/prices/availability from the live catalog so the cart
  /// never shows stale prices. Items missing from the catalog or no longer
  /// bookable online are flagged rather than silently dropped.
  void reconcile({required List<LabTest> tests, required List<HealthPackage> packages}) {
    final testById = {for (final t in tests) t.id: t};
    final packageById = {for (final p in packages) p.id: p};
    final updated = state.items.map((item) {
      switch (item.kind) {
        case CatalogKind.test:
          final t = testById[item.id];
          if (t == null || !t.isBookableOnline) return item.copyWith(unavailable: true);
          return item.copyWith(
            name: t.name,
            priceRupees: t.price,
            homeCollectionAvailable: t.homeCollectionAvailable,
            unavailable: false,
          );
        case CatalogKind.package:
          final p = packageById[item.id];
          if (p == null || !p.isBookableOnline) return item.copyWith(unavailable: true);
          return item.copyWith(
            name: p.name,
            priceRupees: p.price,
            homeCollectionAvailable: p.homeCollectionAvailable,
            unavailable: false,
          );
      }
    }).toList();
    _set(updated);
  }

  void _set(List<CartItem> items) {
    state = CartState(List.unmodifiable(items));
    ref.read(cartStorageProvider).save(jsonEncode(items.map((i) => i.toJson()).toList())).ignore();
  }
}
