import 'package:flutter/foundation.dart';

import 'package:qxl_core/qxl_core.dart';

/// `BannerRead`. Named to avoid clashing with Flutter's `Banner` widget.
@immutable
class PromoBanner {
  const PromoBanner({
    required this.id,
    this.title,
    this.titleAccent,
    this.subtitle,
    this.description,
    this.badge,
    this.ctaLabel,
    this.ctaLink,
    this.imageUrl,
    this.imageFit,
    this.imageOnly = false,
    this.bgFrom,
    this.bgTo,
    this.features = const [],
  });

  factory PromoBanner.fromJson(Json json) => PromoBanner(
    id: json['id'] as String,
    title: str(json['title']),
    titleAccent: str(json['title_accent']),
    subtitle: str(json['subtitle']),
    description: str(json['description']),
    badge: str(json['badge']),
    ctaLabel: str(json['cta_label']),
    ctaLink: str(json['cta_link']),
    imageUrl: str(json['image_url']),
    imageFit: str(json['image_fit']),
    imageOnly: boolOr(json['image_only'], false),
    bgFrom: str(json['bg_from']),
    bgTo: str(json['bg_to']),
    features: stringListFromEncoded(json['features']),
  );

  final String id;
  final String? title;
  final String? titleAccent;
  final String? subtitle;
  final String? description;
  final String? badge;
  final String? ctaLabel;
  final String? ctaLink;
  final String? imageUrl;
  final String? imageFit;
  final bool imageOnly;
  final String? bgFrom;
  final String? bgTo;
  final List<String> features;

  String get accessibleLabel => [badge, title, titleAccent, subtitle, description].whereType<String>().join('. ');
}

@immutable
class Doctor {
  const Doctor({
    required this.id,
    required this.name,
    required this.slug,
    this.qualification,
    this.specialization,
    this.bio,
    this.imageUrl,
    this.title,
    this.experience,
    this.expertise,
    this.achievements,
    this.department,
    this.registrationNumber,
    this.cardImageUrl,
    this.isFounder = false,
  });

  factory Doctor.fromJson(Json json) => Doctor(
    id: json['id'] as String,
    name: strOr(json['name'], ''),
    slug: strOr(json['slug'], ''),
    qualification: str(json['qualification']),
    specialization: str(json['specialization']),
    bio: str(json['bio']),
    imageUrl: str(json['image_url']),
    title: str(json['title']),
    experience: str(json['experience']),
    expertise: str(json['expertise']),
    achievements: str(json['achievements']),
    department: str(json['department']),
    registrationNumber: str(json['registration_number']),
    cardImageUrl: str(json['card_image_url']),
    isFounder: boolOr(json['is_founder'], false),
  );

  final String id;
  final String name;
  final String slug;
  final String? qualification;
  final String? specialization;
  final String? bio;
  final String? imageUrl;
  final String? title;
  final String? experience;
  final String? expertise;
  final String? achievements;
  final String? department;
  final String? registrationNumber;
  final String? cardImageUrl;
  final bool isFounder;

  String? get photo => cardImageUrl ?? imageUrl;
}

@immutable
class SpecialityProfile {
  const SpecialityProfile({required this.name, this.tests, this.turnaround, this.sample});

  factory SpecialityProfile.fromJson(Json json) => SpecialityProfile(
    name: strOr(json['name'], ''),
    tests: str(json['tests']),
    turnaround: str(json['tat']),
    sample: str(json['sample']),
  );

  final String name;
  final String? tests;
  final String? turnaround;
  final String? sample;
}

@immutable
class QuestionAnswer {
  const QuestionAnswer({required this.question, required this.answer});

  final String question;
  final String answer;
}

@immutable
class Speciality {
  const Speciality({
    required this.id,
    required this.name,
    required this.slug,
    this.cardImageUrl,
    this.heroImageUrl,
    this.heroTitle,
    this.heroDescription,
    this.intro,
    this.whoShouldTake = const [],
    this.profiles = const [],
    this.clinicianNotes = const [],
    this.disclaimer,
    this.whyChoose = const [],
    this.faqs = const [],
    this.colorHex,
    this.summary,
  });

  factory Speciality.fromJson(Json json) {
    final directory = asJson(json['directory']);
    return Speciality(
      id: json['id'] as String,
      name: strOr(json['name'], ''),
      slug: strOr(json['slug'], ''),
      cardImageUrl: str(json['card_image_url']),
      heroImageUrl: str(json['hero_image_url']),
      heroTitle: str(json['hero_title']),
      heroDescription: str(json['hero_description']),
      intro: str(json['intro']),
      whoShouldTake: stringList(json['who_should_take']),
      profiles: asJsonList(json['profiles']).map(SpecialityProfile.fromJson).where((p) => p.name.isNotEmpty).toList(),
      clinicianNotes: stringList(json['clinician_notes']),
      disclaimer: str(json['disclaimer']),
      whyChoose: asJsonList(json['why_choose'])
          .map((e) => QuestionAnswer(question: strOr(e['title'], ''), answer: strOr(e['desc'], '')))
          .where((e) => e.question.isNotEmpty)
          .toList(),
      faqs: asJsonList(json['faqs'])
          .map((e) => QuestionAnswer(question: strOr(e['q'], ''), answer: strOr(e['a'], '')))
          .where((e) => e.question.isNotEmpty)
          .toList(),
      colorHex: str(directory['color']),
      summary: str(directory['description']),
    );
  }

  final String id;
  final String name;
  final String slug;
  final String? cardImageUrl;
  final String? heroImageUrl;
  final String? heroTitle;
  final String? heroDescription;
  final String? intro;
  final List<String> whoShouldTake;
  final List<SpecialityProfile> profiles;
  final List<String> clinicianNotes;
  final String? disclaimer;
  final List<QuestionAnswer> whyChoose;
  final List<QuestionAnswer> faqs;
  final String? colorHex;
  final String? summary;
}

@immutable
class Faq {
  const Faq({required this.id, required this.question, required this.answer, this.category});

  factory Faq.fromJson(Json json) => Faq(
    id: json['id'] as String,
    question: strOr(json['question'], ''),
    answer: strOr(json['answer'], ''),
    category: str(json['category']),
  );

  final String id;
  final String question;
  final String answer;
  final String? category;
}

@immutable
class Review {
  const Review({required this.id, required this.authorName, required this.rating, required this.content, this.source});

  factory Review.fromJson(Json json) => Review(
    id: json['id'] as String,
    authorName: strOr(json['author_name'], 'Patient'),
    rating: (intOrNull(json['rating']) ?? 0).clamp(0, 5),
    content: strOr(json['content'], ''),
    source: str(json['source']),
  );

  final String id;
  final String authorName;
  final int rating;
  final String content;
  final String? source;
}

@immutable
class BlogPost {
  const BlogPost({
    required this.id,
    required this.title,
    required this.slug,
    this.excerpt,
    this.content,
    this.author,
    this.category,
    this.imageUrl,
    this.createdAt,
  });

  factory BlogPost.fromJson(Json json) => BlogPost(
    id: json['id'] as String,
    title: strOr(json['title'], ''),
    slug: strOr(json['slug'], ''),
    excerpt: str(json['excerpt']),
    content: str(json['content']),
    author: str(json['author']),
    category: str(json['category']),
    imageUrl: str(json['image_url']),
    createdAt: dateTimeOrNull(json['created_at']),
  );

  final String id;
  final String title;
  final String slug;
  final String? excerpt;
  final String? content;
  final String? author;
  final String? category;
  final String? imageUrl;
  final DateTime? createdAt;
}

@immutable
class Paged<T> {
  const Paged({required this.items, required this.count});

  final List<T> items;
  final int count;

  bool get hasMore => items.length < count;
}

/// `SiteSettingsRead` — contact numbers and feature switches.
@immutable
class SiteSettings {
  const SiteSettings({
    this.maintenanceMode = false,
    this.aiChatEnabled = true,
    this.announcement,
    this.phoneDisplay,
    this.phoneE164,
    this.whatsappNumber,
  });

  factory SiteSettings.fromJson(Json json) => SiteSettings(
    maintenanceMode: boolOr(json['maintenance_mode'], false),
    aiChatEnabled: boolOr(json['ai_chat_enabled'], true),
    announcement: str(json['announcement']),
    phoneDisplay: str(json['phone_display']),
    phoneE164: str(json['phone_e164']),
    whatsappNumber: str(json['whatsapp_number']),
  );

  final bool maintenanceMode;
  final bool aiChatEnabled;
  final String? announcement;
  final String? phoneDisplay;
  final String? phoneE164;
  final String? whatsappNumber;
}
