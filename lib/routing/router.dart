import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:material_ui/material_ui.dart';

import '../features/account/account_screen.dart';
import '../features/assistant/assistant_screen.dart';
import '../features/auth/login_screen.dart';
import '../features/auth/profile_screen.dart';
import '../features/bookings/booking_detail_screen.dart';
import '../features/bookings/bookings_screen.dart';
import '../features/cart/cart_screen.dart';
import '../features/catalog/explore_screen.dart';
import '../features/catalog/package_detail_screen.dart';
import '../features/catalog/search_screen.dart';
import '../features/catalog/speciality_screen.dart';
import '../features/catalog/test_detail_screen.dart';
import '../features/centers/center_detail_screen.dart';
import '../features/centers/centers_screen.dart';
import '../features/checkout/booking_result_screen.dart';
import '../features/checkout/checkout_screen.dart';
import '../features/content/about_screen.dart';
import '../features/content/blog_screens.dart';
import '../features/content/contact_screen.dart';
import '../features/content/doctors_screens.dart';
import '../features/content/faqs_screen.dart';
import '../features/home/home_screen.dart';
import '../features/payment/payment_screen.dart';
import '../features/prescriptions/prescription_detail_screen.dart';
import '../features/prescriptions/prescriptions_screen.dart';
import '../features/shell/app_shell.dart';

abstract final class Routes {
  static const home = '/home';
  static const explore = '/explore';
  static const bookings = '/bookings';
  static const account = '/account';
  static const search = '/search';
  static const cart = '/cart';
  static const checkout = '/checkout';
  static const bookingResult = '/booking-result';
  static const pay = '/pay';
  static const login = '/login';
  static const profile = '/profile';
  static const centers = '/centers';
  static const prescriptions = '/prescriptions';
  static const assistant = '/assistant';
  static const doctors = '/doctors';
  static const faqs = '/faqs';
  static const blog = '/blog';
  static const contact = '/contact';
  static const about = '/about';

  static String test(String id) => '/tests/$id';
  static String package(String id) => '/packages/$id';
  static String speciality(String slug) => '/specialities/$slug';
  static String center(String slug) => '/centers/$slug';
  static String booking(String id) => '/bookings/$id';
  static String prescription(String id) => '/prescriptions/$id';
  static String doctor(String slug) => '/doctors/$slug';
  static String blogPost(String slug) => '/blog/$slug';
  static String exploreTab(ExploreTab tab) => '$explore?tab=${tab.name}';
}

final rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');

final routerProvider = Provider<GoRouter>((ref) {
  GoRoute page(String path, Widget Function(GoRouterState state) build) =>
      GoRoute(path: path, parentNavigatorKey: rootNavigatorKey, builder: (context, state) => build(state));

  return GoRouter(
    navigatorKey: rootNavigatorKey,
    initialLocation: Routes.home,
    debugLogDiagnostics: false,
    routes: [
      StatefulShellRoute.indexedStack(
        builder: (context, state, shell) => AppShell(shell: shell),
        branches: [
          StatefulShellBranch(
            routes: [GoRoute(path: Routes.home, builder: (_, _) => const HomeScreen())],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: Routes.explore,
                builder: (_, state) => ExploreScreen(initialTab: ExploreTab.parse(state.uri.queryParameters['tab'])),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [GoRoute(path: Routes.bookings, builder: (_, _) => const BookingsScreen())],
          ),
          StatefulShellBranch(
            routes: [GoRoute(path: Routes.account, builder: (_, _) => const AccountScreen())],
          ),
        ],
      ),
      page(Routes.search, (_) => const SearchScreen()),
      page('/tests/:id', (s) => TestDetailScreen(id: s.pathParameters['id']!)),
      page('/packages/:id', (s) => PackageDetailScreen(id: s.pathParameters['id']!)),
      page('/specialities/:slug', (s) => SpecialityScreen(slug: s.pathParameters['slug']!)),
      page(Routes.centers, (s) => CentersScreen(pickForBooking: s.uri.queryParameters['pick'] == '1')),
      page('/centers/:slug', (s) => CenterDetailScreen(slug: s.pathParameters['slug']!)),
      page(Routes.cart, (_) => const CartScreen()),
      page(Routes.checkout, (s) => CheckoutScreen(preferredCenterId: s.uri.queryParameters['center'])),
      page(Routes.bookingResult, (s) => BookingResultScreen(result: s.extra as BookingResult?)),
      page(Routes.pay, (s) => PaymentScreen(request: s.extra as PayRequest?)),
      page('/bookings/:id', (s) => BookingDetailScreen(id: s.pathParameters['id']!)),
      page(Routes.login, (_) => const LoginScreen()),
      page(Routes.profile, (s) => ProfileScreen(completing: s.uri.queryParameters['complete'] == '1')),
      page(Routes.prescriptions, (_) => const PrescriptionsScreen()),
      page('/prescriptions/:id', (s) => PrescriptionDetailScreen(id: s.pathParameters['id']!)),
      page(Routes.assistant, (_) => const AssistantScreen()),
      page(Routes.doctors, (_) => const DoctorsScreen()),
      page('/doctors/:slug', (s) => DoctorDetailScreen(slug: s.pathParameters['slug']!)),
      page(Routes.faqs, (_) => const FaqsScreen()),
      page(Routes.blog, (_) => const BlogListScreen()),
      page('/blog/:slug', (s) => BlogPostScreen(slug: s.pathParameters['slug']!)),
      page(Routes.contact, (_) => const ContactScreen()),
      page(Routes.about, (_) => const AboutScreen()),
    ],
    errorBuilder: (context, state) => Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text("This page isn't available.", textAlign: TextAlign.center),
              const SizedBox(height: 16),
              FilledButton(onPressed: () => context.go(Routes.home), child: const Text('Go home')),
            ],
          ),
        ),
      ),
    ),
  );
});

/// Maps a CMS link (website-relative path such as `/book`) to an in-app
/// route. Returns `null` when the app has no native equivalent.
String? appRouteForCmsLink(String? link) {
  if (link == null) return null;
  final uri = Uri.tryParse(link);
  if (uri == null) return null;
  final path = uri.path.toLowerCase();
  if (uri.hasScheme && !(uri.host.endsWith('qxldiagnostics.com'))) return null;
  if (path == '/' || path.isEmpty) return Routes.home;
  if (path.startsWith('/book') || path.startsWith('/packages') || path.startsWith('/health-checkup')) {
    return Routes.exploreTab(ExploreTab.packages);
  }
  if (path.startsWith('/tests')) return Routes.exploreTab(ExploreTab.tests);
  if (path.startsWith('/categories') || path.startsWith('/specialities')) {
    return Routes.exploreTab(ExploreTab.specialities);
  }
  if (path.startsWith('/centers') || path.startsWith('/locations')) return Routes.centers;
  if (path.startsWith('/upload-prescription')) return Routes.prescriptions;
  if (path.startsWith('/doctors')) return Routes.doctors;
  if (path.startsWith('/faq')) return Routes.faqs;
  if (path.startsWith('/blog')) return Routes.blog;
  if (path.startsWith('/contact')) return Routes.contact;
  if (path.startsWith('/ai-assistant')) return Routes.assistant;
  if (path.startsWith('/bookings') || path.startsWith('/report')) return Routes.bookings;
  return null;
}
