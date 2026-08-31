export interface HomeCollectionArea {
  id: string;
  name: string;
  slug: string;
  nearestLab: string;
  description: string;
  pincodes: string[];
  popularTests?: string[];
}

export const homeCollectionAreas: HomeCollectionArea[] = [
  {
    id: "bengaluru",
    name: "Bengaluru (All Localities)",
    slug: "bengaluru",
    nearestLab: "QXL Central NABL Processing Laboratory",
    description: "QXL Diagnostics provides 100% free and hygienic home blood sample collection across all pin codes in Bengaluru. Book routine tests, diabetes profiles, thyroid panels, and full body health checkups with same-day digital reports.",
    pincodes: ["560001", "560002", "560004", "560011", "560024", "560037", "560060", "560064", "560066", "560100"],
    popularTests: ["Full Body Health Check", "Complete Blood Count (CBC)", "HbA1c & Fasting Sugar", "Lipid Profile", "Thyroid Profile (T3, T4, TSH)"]
  },
  {
    id: "kengeri",
    name: "Kengeri",
    slug: "kengeri",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "QXL Diagnostics provides fast and reliable home blood sample collection across Kengeri Satellite Town, Kengeri Upanagara, and surrounding areas. Our trained phlebotomists ensure painless collection at your doorstep.",
    pincodes: ["560060", "560059"],
    popularTests: ["Fever Profile", "Complete Blood Count (CBC)", "Diabetes Screening", "Full Body Checkup"]
  },
  {
    id: "rajarajeshwari-nagar",
    name: "Rajarajeshwari Nagar (RR Nagar)",
    slug: "rajarajeshwari-nagar",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Book home sample collection in Rajarajeshwari Nagar (RR Nagar, Ideal Homes, BEML Layout). We offer 300+ diagnostic tests with same-day digital reports delivered straight to WhatsApp.",
    pincodes: ["560098"],
    popularTests: ["Full Body Package", "Thyroid Care", "Vitamin D3 & B12", "Liver Function Test"]
  },
  {
    id: "nagarabhavi",
    name: "Nagarabhavi",
    slug: "nagarabhavi",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Hygienic and convenient home sample collection in Nagarabhavi 1st and 2nd Stage, Mallathahalli, and Teachers Layout. Safe cold-chain sample transport to NABL lab.",
    pincodes: ["560072", "560056"],
    popularTests: ["Kidney Function Test", "HbA1c Sugar Test", "Lipid Profile", "Senior Citizen Health Package"]
  },
  {
    id: "vijayanagar",
    name: "Vijayanagar",
    slug: "vijayanagar",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Prompt home blood sample collection in Vijayanagar, RPC Layout, and Maruti Mandir area. Doctor-reviewed digital test results delivered within 6 to 12 hours.",
    pincodes: ["560040", "560104"],
    popularTests: ["Complete Blood Count (CBC)", "Master Full Body Checkup", "Dengue NS1 Antigen", "Thyroid Profile"]
  },
  {
    id: "mysore-road",
    name: "Mysore Road",
    slug: "mysore-road",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Located near Mysore Road? Book free doorstep sample collection or visit QXL Diagnostics Kengeri Main Lab. NABL Certified facility for high precision diagnostics.",
    pincodes: ["560026", "560039", "560060"],
    popularTests: ["Cardiac Risk Profile", "Allergy Testing", "Full Body Health Check", "Vitamin Profile"]
  },
  {
    id: "banashankari",
    name: "Banashankari",
    slug: "banashankari",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Convenient at-home blood tests in Banashankari 1st, 2nd, 3rd, 5th, and 6th Stages. Trained phlebotomists with sterile single-use vacuum tubes.",
    pincodes: ["560050", "560070", "560085"],
    popularTests: ["Diabetes Care Package", "Thyroid Profile", "Kidney Panel", "HbA1c Test"]
  },
  {
    id: "jayanagar",
    name: "Jayanagar",
    slug: "jayanagar",
    nearestLab: "Kengeri Main Lab / Central Hub",
    description: "Schedule home blood collection across Jayanagar 1st to 9th Blocks. From routine CBC to comprehensive wellness packages, enjoy home diagnostic service.",
    pincodes: ["560011", "560041", "560069"],
    popularTests: ["Senior Citizen Wellness", "Vitamin D3", "HbA1c & FBS", "Lipid Profile"]
  },
  {
    id: "jp-nagar",
    name: "JP Nagar",
    slug: "jp-nagar",
    nearestLab: "Kengeri Main Lab / Central Hub",
    description: "Fast and professional sample collection at home in JP Nagar 1st to 8th Phases. NABL Certified lab quality, cold-chain preservation, and fast digital reports.",
    pincodes: ["560078"],
    popularTests: ["Full Body Checkup", "Thyroid Panel", "Liver Function Test", "Complete Blood Count"]
  },
  {
    id: "uttarahalli",
    name: "Uttarahalli",
    slug: "uttarahalli",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "At-home diagnostic lab services in Uttarahalli, Channasandra, and Subramanyapura. Safe blood collection by expert phlebotomy specialists.",
    pincodes: ["560061"],
    popularTests: ["Diabetes Profile", "Thyroid Care", "Full Body Wellness", "Fever Panel"]
  },
  {
    id: "kanakapura-road",
    name: "Kanakapura Road",
    slug: "kanakapura-road",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Doorstep blood sample collection along Kanakapura Road, Konanakunte, and Anjanapura. Accurate lab testing backed by doctor validation.",
    pincodes: ["560062", "560088"],
    popularTests: ["Full Body Package", "Lipid Profile", "Vitamin B12", "Kidney Function Test"]
  },
  {
    id: "bannerghatta-road",
    name: "Bannerghatta Road",
    slug: "bannerghatta-road",
    nearestLab: "Central Processing Hub",
    description: "Book home sample collection along Bannerghatta Road, Hulimavu, Arekere, and Gottigere. Same-day report delivery via WhatsApp & Email.",
    pincodes: ["560076", "560083"],
    popularTests: ["Executive Health Check", "Thyroid Profile", "HbA1c", "CBC Test"]
  },
  {
    id: "btm-layout",
    name: "BTM Layout",
    slug: "btm-layout",
    nearestLab: "Central Processing Hub",
    description: "Reliable home collection service in BTM Layout 1st & 2nd Stages. Fast blood drawing, painless procedure, and quality-controlled, high-precision lab reports.",
    pincodes: ["560068", "560076"],
    popularTests: ["Fever Profile", "Diabetes Checkup", "Liver Function Test", "Full Body Checkup"]
  },
  {
    id: "bommanahalli",
    name: "Bommanahalli",
    slug: "bommanahalli",
    nearestLab: "Central Processing Hub",
    description: "QXL Diagnostics offers doorstep blood collection in Bommanahalli, Begur Road, and Hongasandra. Affordable pricing and NABL Certified quality.",
    pincodes: ["560068"],
    popularTests: ["Complete Blood Count (CBC)", "HbA1c", "Thyroid T3 T4 TSH", "Lipid Profile"]
  },
  {
    id: "hsr-layout",
    name: "HSR Layout",
    slug: "hsr-layout",
    nearestLab: "Central Processing Hub",
    description: "Premium home sample collection across HSR Layout Sectors 1 to 7. Quick slot booking, painless blood draw, and instant WhatsApp report delivery.",
    pincodes: ["560102"],
    popularTests: ["Master Health Checkup", "Vitamin D & B12", "Thyroid Profile", "Cardiac Markers"]
  },
  {
    id: "koramangala",
    name: "Koramangala",
    slug: "koramangala",
    nearestLab: "Central Processing Hub",
    description: "Doorstep diagnostic services in Koramangala 1st to 8th Blocks. NABL Certified medical laboratory processing for all routine & specialty diagnostic tests.",
    pincodes: ["560034", "560095"],
    popularTests: ["Full Body Health Profile", "HbA1c Sugar Test", "CBC", "Lipid & Liver Panel"]
  },
  {
    id: "electronic-city",
    name: "Electronic City",
    slug: "electronic-city",
    nearestLab: "Kengeri Main Lab / Express Hub",
    description: "Trusted home sample collection for residents of Electronic City Phase 1 & Phase 2, Neeladri Nagar, and Rayasandra. Fast bookings & NABL reports.",
    pincodes: ["560100"],
    popularTests: ["Full Body Package", "Thyroid Profile", "Vitamin B12", "Executive Wellness"]
  },
  {
    id: "sarjapur-road",
    name: "Sarjapur Road",
    slug: "sarjapur-road",
    nearestLab: "Central Processing Hub",
    description: "Blood test at home service across Sarjapur Road, Carmelaram, Kaikondrahalli, and Kodathi. 100% hygienic collection & cold-chain transport.",
    pincodes: ["560035", "562125"],
    popularTests: ["Comprehensive Health Profile", "Thyroid & Diabetes", "CBC", "Kidney Function"]
  },
  {
    id: "bellandur",
    name: "Bellandur",
    slug: "bellandur",
    nearestLab: "Central Processing Hub",
    description: "Free home sample collection in Bellandur, Green Glen Layout, and Devarabeesanahalli. Doctor-reviewed reports delivered straight to your smartphone.",
    pincodes: ["560103"],
    popularTests: ["Vitamin D3 & B12", "Full Body Checkup", "Lipid Profile", "HbA1c Test"]
  },
  {
    id: "whitefield",
    name: "Whitefield",
    slug: "whitefield",
    nearestLab: "Yelahanka North Hub / Express Hub",
    description: "Get NABL Certified diagnostic testing with our seamless home collection service across Whitefield, ITPL, Kadugodi, and Hope Farm. Same-day reports.",
    pincodes: ["560066"],
    popularTests: ["Executive Health Package", "Thyroid T3 T4 TSH", "Liver & Kidney Panel", "CBC Test"]
  },
  {
    id: "marathahalli",
    name: "Marathahalli",
    slug: "marathahalli",
    nearestLab: "Central Processing Hub",
    description: "Prompt home blood sample collection in Marathahalli, Spice Garden, and Munnekollal. Affordable packages and verified digital lab reports.",
    pincodes: ["560037"],
    popularTests: ["Fever Profile", "Master Health Check", "Diabetes Profile", "Lipid Test"]
  },
  {
    id: "mahadevapura",
    name: "Mahadevapura",
    slug: "mahadevapura",
    nearestLab: "Central Processing Hub",
    description: "Doorstep diagnostic blood collection in Mahadevapura, BKN Ambaram, and Outer Ring Road belt. Sterile procedure and cold-chain sample preservation.",
    pincodes: ["560048"],
    popularTests: ["CBC", "HbA1c", "Thyroid Profile", "Senior Citizen Wellness"]
  },
  {
    id: "kr-puram",
    name: "KR Puram (Krishnarajapuram)",
    slug: "kr-puram",
    nearestLab: "Yelahanka North Hub / Express Hub",
    description: "Free home sample collection in KR Puram, TC Palya, Bhattarahalli, and ITI Layout. Reliable pathology & biochemistry testing.",
    pincodes: ["560036", "560049"],
    popularTests: ["Full Body Health Check", "Fever Profile", "Diabetes Check", "Vitamin Panel"]
  },
  {
    id: "indiranagar",
    name: "Indiranagar",
    slug: "indiranagar",
    nearestLab: "Central Processing Hub",
    description: "At-home blood collection service in Indiranagar 1st & 2nd Stages, 100ft Road, and Defense Colony. Fast booking & doctor-validated reports.",
    pincodes: ["560038"],
    popularTests: ["Master Wellness Check", "Thyroid Profile", "Vitamin D3", "HbA1c"]
  },
  {
    id: "domlur",
    name: "Domlur",
    slug: "domlur",
    nearestLab: "Central Processing Hub",
    description: "Doorstep diagnostic services in Domlur Layout, EGL, and Amarjyoti Layout. Painless sample draw by trained phlebotomists.",
    pincodes: ["560071"],
    popularTests: ["Executive Health Package", "CBC", "Lipid Profile", "Liver Function"]
  },
  {
    id: "ulsoor",
    name: "Ulsoor (Halasuru)",
    slug: "ulsoor",
    nearestLab: "Central Processing Hub",
    description: "Hygienic home sample collection in Ulsoor, Bazaar Street, and Someshwarpura. Accurate NABL lab testing with digital report delivery.",
    pincodes: ["560008"],
    popularTests: ["Thyroid Panel", "HbA1c & Fasting Sugar", "Full Body Checkup", "CBC"]
  },
  {
    id: "ramamurthy-nagar",
    name: "Ramamurthy Nagar",
    slug: "ramamurthy-nagar",
    nearestLab: "Yelahanka North Hub",
    description: "Book blood test at home in Ramamurthy Nagar, Kowdenahalli, and Kasturi Nagar. Cold-chain transport ensures maximum sample accuracy.",
    pincodes: ["560016"],
    popularTests: ["Fever Profile", "Diabetes Profile", "CBC", "Thyroid Test"]
  },
  {
    id: "banaswadi",
    name: "Banaswadi",
    slug: "banaswadi",
    nearestLab: "Yelahanka North Hub",
    description: "Doorstep lab collection in Banaswadi, HRBR Layout, and Subbaiahnapalya. NABL lab processing with same-day reports.",
    pincodes: ["560043"],
    popularTests: ["Full Body Checkup", "Thyroid Profile", "Vitamin B12", "Lipid Test"]
  },
  {
    id: "kalyan-nagar",
    name: "Kalyan Nagar",
    slug: "kalyan-nagar",
    nearestLab: "Yelahanka North Hub",
    description: "Home sample collection in Kalyan Nagar, Chelekere, and Kammanahalli. Professional blood draw and doctor-verified reporting.",
    pincodes: ["560043"],
    popularTests: ["Senior Citizen Package", "HbA1c Test", "Kidney Profile", "CBC"]
  },
  {
    id: "hennur",
    name: "Hennur",
    slug: "hennur",
    nearestLab: "Yelahanka North Hub",
    description: "Safe at-home blood collection along Hennur Main Road, Hennur Gardens, and Geddalahalli. Fast booking and digital reports.",
    pincodes: ["560043", "560077"],
    popularTests: ["Full Body Package", "Thyroid Profile", "Vitamin D", "Fever Panel"]
  },
  {
    id: "thanisandra",
    name: "Thanisandra",
    slug: "thanisandra",
    nearestLab: "Yelahanka North Hub",
    description: "Doorstep diagnostic services in Thanisandra Main Road, Bhartiya City, and Rachenahalli. Same-day reports for routine blood tests.",
    pincodes: ["560077"],
    popularTests: ["Full Body Wellness", "Diabetes Profile", "CBC", "Liver Panel"]
  },
  {
    id: "nagawara",
    name: "Nagawara",
    slug: "nagawara",
    nearestLab: "Yelahanka North Hub",
    description: "Free home sample collection in Nagawara, Manyata Tech Park area, and AC Post. NABL Certified quality diagnostics.",
    pincodes: ["560045"],
    popularTests: ["Executive Health Check", "Thyroid Care", "HbA1c", "Lipid Profile"]
  },
  {
    id: "hebbal",
    name: "Hebbal",
    slug: "hebbal",
    nearestLab: "Yelahanka North Hub",
    description: "QXL Diagnostics offers premium home sample collection in Hebbal, Kempapura, and Anandnagar. Get routine & specialty tests done at home.",
    pincodes: ["560024", "560094"],
    popularTests: ["Master Health Package", "Vitamin B12 & D3", "CBC", "Thyroid T3 T4 TSH"]
  },
  {
    id: "sahakara-nagar",
    name: "Sahakara Nagar",
    slug: "sahakara-nagar",
    nearestLab: "Yelahanka North Hub",
    description: "At-home blood collection in Sahakara Nagar Blocks A-G and Kodigehalli. Expert phlebotomists and cold-chain sample preservation.",
    pincodes: ["560092"],
    popularTests: ["Senior Citizen Wellness", "HbA1c", "Thyroid Profile", "Kidney Function"]
  },
  {
    id: "yelahanka",
    name: "Yelahanka",
    slug: "yelahanka",
    nearestLab: "Yelahanka North Hub",
    description: "Reliable home blood test collection across Yelahanka New Town, Old Town, and Kogilu. Supported by our advanced Yelahanka North Hub lab.",
    pincodes: ["560064"],
    popularTests: ["Full Body Package", "Complete Blood Count", "Diabetes Screening", "Full Body Checkup"]
  },
  {
    id: "vidyaranyapura",
    name: "Vidyaranyapura",
    slug: "vidyaranyapura",
    nearestLab: "Yelahanka North Hub",
    description: "Prompt doorstep blood collection in Vidyaranyapura, BEL Layout, and NTI Layout. Painless blood draw by phlebotomy specialists.",
    pincodes: ["560097"],
    popularTests: ["Full Body Checkup", "Thyroid Profile", "HbA1c", "Lipid Test"]
  },
  {
    id: "sanjaynagar",
    name: "Sanjaynagar",
    slug: "sanjaynagar",
    nearestLab: "Yelahanka North Hub",
    description: "Home sample collection in Sanjaynagar, RMV 2nd Stage, and New BEL Road. High accuracy NABL lab results delivered digitally.",
    pincodes: ["560094"],
    popularTests: ["Master Health Profile", "Vitamin D3", "CBC", "Liver Panel"]
  },
  {
    id: "jalahalli",
    name: "Jalahalli",
    slug: "jalahalli",
    nearestLab: "Yelahanka North Hub",
    description: "Doorstep diagnostic sample collection in Jalahalli East & West, HMT Layout, and Gangamma Circle. Quick online booking.",
    pincodes: ["560013", "560015"],
    popularTests: ["Fever Profile", "Diabetes Checkup", "Thyroid Panel", "CBC"]
  },
  {
    id: "peenya",
    name: "Peenya",
    slug: "peenya",
    nearestLab: "Kengeri Main Lab / Express Hub",
    description: "Diagnostic blood tests at home across Peenya Industrial Area 1st & 2nd Stages, Dasarahalli, and TVS Cross. Fast reporting.",
    pincodes: ["560058"],
    popularTests: ["Full Body Health Check", "HbA1c", "Liver Function", "Kidney Function"]
  },
  {
    id: "yeshwanthpur",
    name: "Yeshwanthpur",
    slug: "yeshwanthpur",
    nearestLab: "Kengeri Main Lab / Express Hub",
    description: "Free home blood sample collection in Yeshwanthpur, APMC Yard, and Mathikere. NABL Certified laboratory accuracy.",
    pincodes: ["560022"],
    popularTests: ["CBC", "Thyroid Profile", "Vitamin B12", "Lipid Profile"]
  },
  {
    id: "malleshwaram",
    name: "Malleshwaram",
    slug: "malleshwaram",
    nearestLab: "Central Processing Hub",
    description: "Book home collection in Malleshwaram 1st to 18th Cross, Margosa Road, and Sampige Road. Trusted heritage locality diagnostic service.",
    pincodes: ["560003"],
    popularTests: ["Senior Citizen Package", "HbA1c & Fasting Sugar", "Thyroid T3 T4 TSH", "Full Body Checkup"]
  },
  {
    id: "rajajinagar",
    name: "Rajajinagar",
    slug: "rajajinagar",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "At-home blood collection in Rajajinagar Blocks 1 to 6, Navrang Circle, and ESI Hospital area. Professional technician visits.",
    pincodes: ["560010"],
    popularTests: ["Complete Blood Count (CBC)", "Diabetes Profile", "Lipid Profile", "Full Body Wellness"]
  },
  {
    id: "basaveshwaranagar",
    name: "Basaveshwaranagar",
    slug: "basaveshwaranagar",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Doorstep diagnostic services in Basaveshwaranagar, Sanjeevini Nagar, and Water Tank Road. Safe, hygienic sample draw.",
    pincodes: ["560079"],
    popularTests: ["Thyroid Care", "HbA1c Test", "Full Body Health Check", "Vitamin Profile"]
  },
  {
    id: "mahalakshmi-layout",
    name: "Mahalakshmi Layout",
    slug: "mahalakshmi-layout",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Free home collection in Mahalakshmi Layout, ISKCON Temple area, and Nandini Layout. Fast report delivery on WhatsApp.",
    pincodes: ["560086", "560096"],
    popularTests: ["Master Wellness Check", "CBC", "Liver Panel", "Kidney Function"]
  },
  {
    id: "magadi-road",
    name: "Magadi Road",
    slug: "magadi-road",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Sample collection at home along Magadi Road, Kamakshipalya, and Anjananagar. NABL lab processing with cold-chain maintenance.",
    pincodes: ["560023", "560091"],
    popularTests: ["Fever Profile", "Diabetes Checkup", "Thyroid Test", "Lipid Profile"]
  },
  {
    id: "frazer-town",
    name: "Frazer Town (Pulikeshi Nagar)",
    slug: "frazer-town",
    nearestLab: "Central Processing Hub",
    description: "Home sample collection in Frazer Town, Coles Road, and Mosque Road. Quick appointment booking & digital reports.",
    pincodes: ["560005"],
    popularTests: ["Full Body Checkup", "HbA1c", "Thyroid Profile", "CBC"]
  },
  {
    id: "shivajinagar",
    name: "Shivajinagar",
    slug: "shivajinagar",
    nearestLab: "Central Processing Hub",
    description: "Doorstep blood test collection in Shivajinagar, Commercial Street area, and Russell Market. NABL Certified laboratory testing.",
    pincodes: ["560001", "560051"],
    popularTests: ["Fever Profile", "Diabetes Screening", "Lipid Panel", "CBC"]
  },
  {
    id: "vasanth-nagar",
    name: "Vasanth Nagar",
    slug: "vasanth-nagar",
    nearestLab: "Central Processing Hub",
    description: "Home blood collection in Vasanth Nagar, High Grounds, and Palace Road. Precise NABL Certified diagnostic testing.",
    pincodes: ["560052"],
    popularTests: ["Executive Wellness", "Thyroid Profile", "Vitamin D3", "HbA1c"]
  },
  {
    id: "mg-road",
    name: "MG Road",
    slug: "mg-road",
    nearestLab: "Central Processing Hub",
    description: "Diagnostic sample collection at home near MG Road, Brigade Road, and Residency Road. Same-day digital lab reports.",
    pincodes: ["560001"],
    popularTests: ["Master Health Checkup", "Lipid Profile", "CBC", "Liver Panel"]
  },
  {
    id: "richmond-town",
    name: "Richmond Town",
    slug: "richmond-town",
    nearestLab: "Central Processing Hub",
    description: "Free home collection in Richmond Town, Langford Town, and Victoria Layout. Hygienic blood draw by trained phlebotomists.",
    pincodes: ["560025"],
    popularTests: ["Senior Citizen Profile", "Thyroid Care", "HbA1c", "Vitamin B12"]
  },
  {
    id: "shantinagar",
    name: "Shantinagar",
    slug: "shantinagar",
    nearestLab: "Central Processing Hub",
    description: "Blood test at home service in Shantinagar, Double Road, and KKH Road. NABL quality assured test results.",
    pincodes: ["560027"],
    popularTests: ["Full Body Checkup", "Diabetes Profile", "CBC", "Thyroid Test"]
  },
  {
    id: "wilson-garden",
    name: "Wilson Garden",
    slug: "wilson-garden",
    nearestLab: "Central Processing Hub",
    description: "At-home sample collection in Wilson Garden 1st to 12th Cross and Lakkasandra. Doctor-reviewed electronic reports.",
    pincodes: ["560027"],
    popularTests: ["Master Wellness Check", "HbA1c", "Lipid Test", "Kidney Profile"]
  },
  {
    id: "basavanagudi",
    name: "Basavanagudi",
    slug: "basavanagudi",
    nearestLab: "Kengeri Main Lab / Central Hub",
    description: "Doorstep diagnostic services in Basavanagudi, Gandhi Bazaar, and DVG Road. Trusted heritage Bengaluru medical lab service.",
    pincodes: ["560004"],
    popularTests: ["Senior Citizen Package", "Thyroid Profile", "HbA1c", "CBC"]
  },
  {
    id: "padmanabhanagar",
    name: "Padmanabhanagar",
    slug: "padmanabhanagar",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Prompt home blood sample collection in Padmanabhanagar, Yarab Nagar, and Devegowda Petrol Bunk area.",
    pincodes: ["560070"],
    popularTests: ["Full Body Health Check", "Diabetes Profile", "Thyroid T3 T4 TSH", "Vitamin Panel"]
  },
  {
    id: "kumaraswamy-layout",
    name: "Kumaraswamy Layout",
    slug: "kumaraswamy-layout",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Home sample collection in Kumaraswamy Layout 1st & 2nd Stages, ISRO Layout, and Dayananda Sagar College belt.",
    pincodes: ["560078", "560111"],
    popularTests: ["Full Body Package", "CBC", "Fever Panel", "Lipid Profile"]
  },
  {
    id: "yelachenahalli",
    name: "Yelachenahalli",
    slug: "yelachenahalli",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Free doorstep blood test collection in Yelachenahalli, Kanakapura Main Road metro belt. NABL Certified quality.",
    pincodes: ["560078"],
    popularTests: ["Diabetes Care", "Thyroid Profile", "HbA1c", "Full Body Checkup"]
  },
  {
    id: "nayandahalli",
    name: "Nayandahalli",
    slug: "nayandahalli",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Doorstep blood sample collection in Nayandahalli, Pantarapalya, and Outer Ring Road junction. Cold-chain sample transport.",
    pincodes: ["560039"],
    popularTests: ["CBC", "Fever Profile", "Diabetes Check", "Liver Panel"]
  },
  {
    id: "chandra-layout",
    name: "Chandra Layout",
    slug: "chandra-layout",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Hygienic blood sample collection at home in Chandra Layout 1st & 2nd Stages and Attiguppe. Painless phlebotomy procedure.",
    pincodes: ["560040"],
    popularTests: ["Master Health Check", "Thyroid Care", "HbA1c Test", "Lipid Profile"]
  },
  {
    id: "kumbalgodu",
    name: "Kumbalgodu",
    slug: "kumbalgodu",
    nearestLab: "Kengeri Main Lab (Mysore Road)",
    description: "Home blood collection across Kumbalgodu Industrial Area, Rajarajeswari Medical College zone, and Kengeri extension.",
    pincodes: ["560074"],
    popularTests: ["Full Body Checkup", "Diabetes Screening", "CBC", "Thyroid Test"]
  },
  {
    id: "devanahalli",
    name: "Devanahalli",
    slug: "devanahalli",
    nearestLab: "Yelahanka North Hub",
    description: "Reliable home sample collection in Devanahalli Town, KIADB IT Park, and Nandi Hills Road. Fast express processing.",
    pincodes: ["562110"],
    popularTests: ["Full Body Package", "Thyroid Profile", "Vitamin D3 & B12", "Fever Profile"]
  },
  {
    id: "bengaluru-airport",
    name: "Bengaluru Airport (KIADB Zone)",
    slug: "bengaluru-airport",
    nearestLab: "Yelahanka North Hub",
    description: "Express sample collection & testing service around Kempegowda International Airport (BLR), Aerospace Park, and Trumpet Flyover.",
    pincodes: ["560300", "562157"],
    popularTests: ["Executive Health Check", "Thyroid Profile", "CBC", "HbA1c Test"]
  }
];
