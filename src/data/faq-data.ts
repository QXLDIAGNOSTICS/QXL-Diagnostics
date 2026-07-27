export interface FAQEntry {
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export const faqData: FAQEntry[] = [
  {
    question: "What diagnostic tests does QXL Diagnostics offer?",
    answer: "QXL Diagnostics offers a comprehensive range of diagnostic tests including blood tests (CBC, lipid profile, thyroid, diabetes, liver, kidney panels), hormone tests, tumor markers, autoimmune panels, vitamin and mineral tests, cardiac markers, coagulation tests, and specialized panels like genetic testing and infectious disease markers.",
    category: "Tests",
    tags: ["diagnostic tests", "blood tests", "QXL services"]
  },
  {
    question: "Do I need to fast before a blood test?",
    answer: "It depends on the test. Fasting for 8-12 hours is required for tests like fasting blood sugar, lipid profile, and some iron studies. Tests like CBC, thyroid function, HbA1c, and most tumor markers do not require fasting. Always confirm with our team when booking.",
    category: "Tests",
    tags: ["fasting", "preparation", "blood test"]
  },
  {
    question: "How should I prepare for a blood test?",
    answer: "Stay hydrated, avoid alcohol for 24 hours before testing, inform us about any medications you take, wear loose-fitting clothes for easy blood draw, and follow specific fasting instructions if applicable. Avoid strenuous exercise 24 hours before hormone or cardiac tests.",
    category: "Tests",
    tags: ["preparation", "blood test", "instructions"]
  },
  {
    question: "Are diagnostic tests painful?",
    answer: "Blood tests involve a brief needle prick, which most people describe as a mild discomfort lasting a few seconds. Our trained phlebotomists use fine-gauge needles and techniques to minimize discomfort. Urine and stool tests are completely painless.",
    category: "Tests",
    tags: ["pain", "comfort", "blood draw"]
  },
  {
    question: "How accurate are the tests at QXL Diagnostics?",
    answer: "Our tests are performed in NABL-accredited laboratories using internationally standardized equipment and protocols. We maintain strict quality control at every stage. Our accuracy rates meet or exceed international standards for diagnostic testing.",
    category: "Tests",
    tags: ["accuracy", "quality", "NABL accredited"]
  },
  {
    question: "Can I get a blood test done without a doctor's prescription?",
    answer: "Yes, many tests at QXL Diagnostics can be ordered as walk-in or self-referred tests without a prescription. However, we recommend consulting a doctor for interpretation of results and appropriate follow-up. Some specialized tests may require a prescription.",
    category: "Tests",
    tags: ["prescription", "walk-in", "self-referral"]
  },
  {
    question: "What is the difference between a complete blood count (CBC) and ESR?",
    answer: "CBC provides detailed information about all blood cells including RBCs, WBCs, platelets, hemoglobin, and hematocrit. ESR measures how quickly red blood cells settle, indicating inflammation. CBC identifies specific blood disorders, while ESR is a general inflammation marker often used alongside CBC.",
    category: "Tests",
    tags: ["CBC", "ESR", "difference"]
  },
  {
    question: "How often should I get routine blood tests done?",
    answer: "For healthy adults, annual blood work is generally recommended. If you have chronic conditions like diabetes, thyroid disorders, or heart disease, your doctor may recommend more frequent testing (every 3-6 months). Senior citizens and those with risk factors should test more frequently.",
    category: "Tests",
    tags: ["routine tests", "frequency", "annual checkup"]
  },
  {
    question: "What does a lipid profile test measure?",
    answer: "A lipid profile measures total cholesterol, LDL (bad) cholesterol, HDL (good) cholesterol, and triglycerides. It assesses your cardiovascular risk and helps doctors recommend lifestyle changes or medications. Additional markers like Apo A-1, Apo B, and Lp(a) provide deeper cardiovascular risk assessment.",
    category: "Tests",
    tags: ["lipid profile", "cholesterol", "heart health"]
  },
  {
    question: "What is HbA1c and why is it important?",
    answer: "HbA1c (glycated hemoglobin) reflects your average blood sugar over the past 2-3 months. Unlike fasting glucose which gives a snapshot, HbA1c provides a long-term picture. Normal is below 5.7%, prediabetes 5.7-6.4%, and diabetes 6.5%+. It is the gold standard for diabetes monitoring.",
    category: "Tests",
    tags: ["HbA1c", "diabetes", "blood sugar"]
  },
  {
    question: "What is the difference between Type 1 and Type 2 diabetes tests?",
    answer: "Both types use fasting blood sugar and HbA1c for diagnosis. Additional tests like C-peptide (measures insulin production), insulin levels, and HOMA-IR (insulin resistance) help differentiate. Type 1 typically shows very low C-peptide, while Type 2 shows high insulin with low sensitivity.",
    category: "Tests",
    tags: ["diabetes", "Type 1", "Type 2", "C-peptide"]
  },
  {
    question: "What tests are included in a thyroid profile?",
    answer: "A standard thyroid profile includes TSH, Free T4, and Free T3. TSH is the most sensitive screening test. Anti-TPO and Anti-thyroglobulin antibodies are added to diagnose autoimmune thyroid disease. Reverse T3 may be included in comprehensive panels.",
    category: "Tests",
    tags: ["thyroid", "TSH", "T3", "T4"]
  },
  {
    question: "How long does it take to get test results?",
    answer: "Most routine blood test results are available within 24 hours via email or our app. Specialized tests like cultures, genetic tests, or hormone panels may take 2-5 working days. Home collection customers receive digital reports directly.",
    category: "Tests",
    tags: ["results", "turnaround time", "reports"]
  },
  {
    question: "What is the difference between serum and plasma tests?",
    answer: "Serum tests use blood that has been allowed to clot and the liquid portion separated. Plasma tests use anticoagulated blood that is centrifuged without clotting. Most standard tests use serum, while coagulation tests like PT/INR and APTT use plasma.",
    category: "Tests",
    tags: ["serum", "plasma", "blood collection"]
  },
  {
    question: "Can I get blood tests done at home?",
    answer: "Yes, QXL Diagnostics provides home sample collection services across most areas in your city. Our trained phlebotomists visit your home at your preferred time slot. The samples are collected following all safety protocols and transported to our lab in temperature-controlled conditions.",
    category: "Tests",
    tags: ["home collection", "home visit", "sample collection"]
  },
  {
    question: "What are tumor markers and should I be worried if they are elevated?",
    answer: "Tumor markers like AFP, CEA, CA-125, and PSA are proteins that may be elevated in certain cancers but can also be elevated due to benign conditions. A single elevated result does not mean cancer. Your doctor will interpret results in context with symptoms, imaging, and other tests.",
    category: "Tests",
    tags: ["tumor markers", "cancer screening", "AFP", "CEA"]
  },
  {
    question: "What is the difference between hs-CRP and regular CRP?",
    answer: "Regular CRP measures general inflammation and is elevated in infections and autoimmune diseases. High-sensitivity CRP (hs-CRP) detects very low levels of inflammation and is specifically used to assess cardiovascular risk. Levels above 3.0 mg/L indicate high heart disease risk.",
    category: "Tests",
    tags: ["hs-CRP", "CRP", "inflammation", "cardiovascular risk"]
  },
  {
    question: "Do hormone tests need to be done on specific days?",
    answer: "Yes, some hormone tests are timing-dependent. For women, FSH, LH, estradiol, and progesterone should ideally be tested on specific days of the menstrual cycle (typically day 2-5). Testosterone is best tested in the morning. Thyroid and cortisol tests can be done any time.",
    category: "Tests",
    tags: ["hormones", "timing", "menstrual cycle", "FSH"]
  },
  {
    question: "What is the significance of an elevated PSA level?",
    answer: "Elevated PSA can indicate prostate cancer, but also benign prostatic hyperplasia (BPH), prostatitis, or even recent sexual activity. Free PSA testing helps differentiate. PSA above 4 ng/mL warrants further investigation, but your doctor will consider age, family history, and other factors.",
    category: "Tests",
    tags: ["PSA", "prostate", "cancer screening"]
  },
  {
    question: "Can I eat before a urine test?",
    answer: "For a routine urine test, you can eat normally. However, a first morning urine sample is preferred as it is more concentrated and provides better results. Avoid excessive water intake before collection and follow the specific instructions provided.",
    category: "Tests",
    tags: ["urine test", "preparation", "fasting"]
  },
  {
    question: "What does an elevated SGOT/SGPT indicate?",
    answer: "SGOT (AST) and SGPT (ALT) are liver enzymes. Elevated levels indicate liver damage or inflammation. Causes include hepatitis, fatty liver, alcohol use, medications, or muscle injury. SGPT is more specific to liver, while SGOT is also found in heart and muscles.",
    category: "Tests",
    tags: ["SGOT", "SGPT", "liver enzymes", "ALT", "AST"]
  },
  {
    question: "What is the difference between D-Dimer and fibrinogen?",
    answer: "D-Dimer is a product of clot breakdown and indicates active clotting. Fibrinogen is a clotting protein needed to form clots. High D-Dimer with low fibrinogen may indicate DIC. D-Dimer is used to rule out blood clots; fibrinogen assesses clotting capacity.",
    category: "Tests",
    tags: ["D-Dimer", "fibrinogen", "coagulation", "blood clots"]
  },
  {
    question: "How do I interpret my lipid profile results?",
    answer: "Desirable levels: Total cholesterol <200 mg/dL, LDL <100 mg/dL, HDL >60 mg/dL, Triglycerides <150 mg/dL. Borderline high LDL is 130-159, high is 160-189, very high is 190+. HDL below 40 is a risk factor. Your doctor considers your overall risk profile when interpreting results.",
    category: "Tests",
    tags: ["lipid profile", "cholesterol", "interpretation", "results"]
  },
  {
    question: "What autoimmune tests does QXL Diagnostics offer?",
    answer: "We offer ANA, Anti-dsDNA, Anti-CCP, Rheumatoid Factor, Anti-TPO, ANCA, Complement C3/C4, and Immunoglobulin panels. These tests help diagnose and monitor autoimmune conditions like lupus, rheumatoid arthritis, and thyroid autoimmune diseases.",
    category: "Tests",
    tags: ["autoimmune", "ANA", "Anti-CCP", "lupus"]
  },

  // ==========================================
  // PACKAGES
  // ==========================================
  {
    question: "What health packages does QXL Diagnostics offer?",
    answer: "QXL Diagnostics offers curated packages including Quick Fit, Q-Screen Diabetes, Q-Master Health Pro, Q-Oncoscreen, Q-Advanced Arthritis and Autoimmune Panel, and Q-Hypertension and Cardiovascular Risk Assessment. Each package is designed for specific health screening needs.",
    category: "Packages",
    tags: ["packages", "health packages", "screening"]
  },
  {
    question: "How do I choose the right health package?",
    answer: "Choose based on your health concerns and risk factors. Quick Fit is ideal for annual checkups, Q-Screen Diabetes for those at risk of diabetes, Q-Master Health Pro for comprehensive screening, Q-Oncoscreen for cancer screening, and Q-Advanced Arthritis for joint pain or autoimmune concerns.",
    category: "Packages",
    tags: ["package selection", "health screening", "recommendations"]
  },
  {
    question: "Can I customize a health package?",
    answer: "Yes, you can add or remove specific tests from any package based on your doctor's recommendation. Contact our team or use the booking form to request customization. Additional tests will be charged at individual test rates.",
    category: "Packages",
    tags: ["customization", "package modification", "add tests"]
  },
  {
    question: "Are the package prices inclusive of home collection?",
    answer: "Yes, all package prices at QXL Diagnostics include home sample collection, phlebotomist visit charges, and digital report delivery. There are no hidden charges for standard packages.",
    category: "Packages",
    tags: ["pricing", "included charges", "home collection"]
  },
  {
    question: "What is the Quick Fit Package and who is it for?",
    answer: "The Quick Fit Package includes FBS, HbA1c, Lipid Profile, Liver and Kidney Function Tests, TSH, Vitamin D, CBC, ESR, and Urine Routine. It is ideal for healthy adults who want a comprehensive annual health checkup at an affordable price.",
    category: "Packages",
    tags: ["Quick Fit", "annual checkup", "basic package"]
  },
  {
    question: "What tests are included in the Q-Master Health Pro Package?",
    answer: "The Q-Master Health Pro includes 25+ parameters: FBS, HbA1c, Insulin, HOMA IR, Lipid Profile, Apo A-1, Apo B, Liver and Kidney Screen, Thyroid Panel, Vitamin D, Vitamin B12, CBC, ESR, Urine Routine, H. pylori IgG, and hs-CRP for comprehensive health assessment.",
    category: "Packages",
    tags: ["Q-Master Health Pro", "comprehensive", "detailed testing"]
  },
  {
    question: "What is the Q-Oncoscreen Package?",
    answer: "The Q-Oncoscreen Package includes cancer markers (AFP, CEA, Beta-HCG, PSA for males, CA-125 for females, CA-19.9), CBC, ESR, Urine Routine, Calprotectin in Stool, FOBT, and Protein Electrophoresis. It is designed for cancer screening and early detection.",
    category: "Packages",
    tags: ["Q-Oncoscreen", "cancer screening", "tumor markers"]
  },
  {
    question: "How often should I take a health package?",
    answer: "For healthy adults aged 25-40, an annual health package is sufficient. For those over 40 or with risk factors like family history of diabetes or heart disease, every 6 months is recommended. Consult your doctor for personalized advice.",
    category: "Packages",
    tags: ["frequency", "annual", "recommended schedule"]
  },
  {
    question: "Do packages include doctor consultation?",
    answer: "Some premium packages at QXL Diagnostics include a complimentary teleconsultation with a doctor to discuss your results. For other packages, you can add a consultation at an additional charge during booking.",
    category: "Packages",
    tags: ["consultation", "doctor", "included services"]
  },
  {
    question: "Can I gift a health package to someone?",
    answer: "Yes, QXL Diagnostics health packages make excellent gifts for family and friends. You can purchase a package and schedule a home collection at the recipient's convenience. Contact our team for gifting options.",
    category: "Packages",
    tags: ["gifting", "gift package", "health gift"]
  },
  {
    question: "What is the difference between basic and comprehensive packages?",
    answer: "Basic packages like Quick Fit cover essential parameters (13+) for general health. Comprehensive packages like Q-Master Health Pro include 25+ parameters with advanced markers like Apo B, HOMA-IR, and hs-CRP. Choose basic for routine screening and comprehensive for detailed assessment.",
    category: "Packages",
    tags: ["basic vs comprehensive", "package comparison"]
  },
  {
    question: "Are package prices subject to change?",
    answer: "Package prices may be updated periodically to reflect changes in test costs and market conditions. However, once you book a package at a particular price, that price is locked in. Check our website for current pricing.",
    category: "Packages",
    tags: ["pricing", "price changes", "current offers"]
  },
  {
    question: "Can I combine tests from different packages?",
    answer: "Yes, you can combine tests from different packages or add individual tests to create a customized health panel. Our team can help you design a package tailored to your specific health needs.",
    category: "Packages",
    tags: ["combination", "customization", "mix packages"]
  },
  {
    question: "Is there a family package available?",
    answer: "Yes, QXL Diagnostics offers family packages with special pricing when multiple family members book together. Contact our team to discuss family package options and discounts.",
    category: "Packages",
    tags: ["family package", "family discount", "group booking"]
  },
  {
    question: "What is the Q-Hypertension and Cardiovascular Risk Assessment Package?",
    answer: "This premium package includes 25+ parameters: Lipid Profile, Apo A1/B, hs-CRP, Lipoprotein(a), Fibrinogen, Homocysteine, NT-proBNP, Insulin, C-Peptide, Thyroid Screen, Cortisol, and more. It provides the most comprehensive cardiovascular risk assessment available.",
    category: "Packages",
    tags: ["Q-Hypertension", "cardiovascular", "heart health", "premium package"]
  },

  // ==========================================
  // HOME COLLECTION
  // ==========================================
  {
    question: "How does home sample collection work?",
    answer: "Book online or via call, select your preferred date and time slot, and our trained phlebotomist will visit your home. The phlebotomist collects samples following strict safety protocols, and samples are transported in temperature-controlled conditions to our NABL-accredited lab.",
    category: "Home Collection",
    tags: ["home collection", "process", "how it works"]
  },
  {
    question: "What are the home collection time slots?",
    answer: "Home collection slots are typically available from 7:00 AM to 10:00 AM for fasting tests and up to 5:00 PM for non-fasting tests. Exact availability may vary by area. You can select your preferred slot during booking.",
    category: "Home Collection",
    tags: ["time slots", "scheduling", "morning collection"]
  },
  {
    question: "Is home collection safe and hygienic?",
    answer: "Absolutely. Our phlebotomists follow strict infection control protocols including wearing PPE, using sterile single-use needles and collection tubes, sanitizing hands before and after collection, and following WHO blood collection guidelines. All equipment is single-use and disposed of safely.",
    category: "Home Collection",
    tags: ["safety", "hygiene", "PPE", "protocols"]
  },
  {
    question: "Which areas does QXL Diagnostics cover for home collection?",
    answer: "We cover all major areas within the city. Specific pincode availability can be checked during booking. If your area is not currently covered, please contact us and we will try to arrange a special visit.",
    category: "Home Collection",
    tags: ["coverage area", "service locations", "pincode"]
  },
  {
    question: "Can someone else be present during home collection?",
    answer: "Yes, you can have a family member present during the collection. For children, a parent or guardian must be present. Our phlebotomists are trained professionals who follow strict privacy and safety protocols.",
    category: "Home Collection",
    tags: ["presence", "family member", "safety"]
  },
  {
    question: "What if I need to reschedule or cancel my home collection?",
    answer: "You can reschedule or cancel your home collection up to 2 hours before the scheduled time without any charges. For cancellations within 2 hours, a nominal fee may apply. Contact our support team for assistance.",
    category: "Home Collection",
    tags: ["reschedule", "cancel", "cancellation policy"]
  },
  {
    question: "Do I need to be fasting for home collection?",
    answer: "If your tests require fasting (like lipid profile, fasting blood sugar), you should fast for 8-12 hours before the phlebotomist arrives. We recommend scheduling fasting tests in the morning. Non-fasting tests can be done at any time.",
    category: "Home Collection",
    tags: ["fasting", "preparation", "home visit"]
  },
  {
    question: "How are samples transported after collection?",
    answer: "Samples are placed in temperature-controlled transport containers immediately after collection. Our phlebotomists follow strict cold chain protocols to maintain sample integrity during transit to the laboratory.",
    category: "Home Collection",
    tags: ["transport", "cold chain", "sample integrity"]
  },
  {
    question: "Is there an additional charge for home collection?",
    answer: "Home sample collection is included in the price of health packages at QXL Diagnostics. For individual tests, a nominal home visit charge may apply depending on your location and the number of tests.",
    category: "Home Collection",
    tags: ["charges", "pricing", "home visit fee"]
  },
  {
    question: "Can I request a specific phlebotomist for home collection?",
    answer: "While we cannot guarantee a specific phlebotomist, all our phlebotomists are equally trained and certified. If you have a preferred phlebotomist, you can mention it during booking and we will try our best to accommodate.",
    category: "Home Collection",
    tags: ["phlebotomist", "request", "preference"]
  },
  {
    question: "What if I miss my home collection appointment?",
    answer: "If you miss your appointment, please contact us to reschedule. A nominal re-scheduling fee may apply. We recommend keeping your phone accessible during the scheduled time slot as the phlebotomist may call before arriving.",
    category: "Home Collection",
    tags: ["missed appointment", "reschedule", "re-booking"]
  },
  {
    question: "Can children have samples collected at home?",
    answer: "Yes, children can have samples collected at home. A parent or guardian must be present. Our phlebotomists are experienced with pediatric collections and use appropriate-sized equipment for minimal discomfort.",
    category: "Home Collection",
    tags: ["children", "pediatric", "kids collection"]
  },
  {
    question: "How do I prepare my home for sample collection?",
    answer: "Ensure good lighting in the collection area, have a clean flat surface available, keep your prescription or test order handy, and have your identification ready. For fasting tests, ensure you have not eaten or drunk anything except water.",
    category: "Home Collection",
    tags: ["preparation", "home setup", "collection area"]
  },
  {
    question: "Is home collection available on weekends?",
    answer: "Yes, home sample collection is available seven days a week including weekends and most public holidays. Weekend slots may fill up faster, so we recommend booking in advance.",
    category: "Home Collection",
    tags: ["weekend", "availability", "7 days a week"]
  },
  {
    question: "Can I book home collection for multiple family members at the same time?",
    answer: "Yes, you can book home collection for multiple family members in a single visit. Our phlebotomist will collect samples from all members during the same visit, which is both convenient and cost-effective.",
    category: "Home Collection",
    tags: ["family booking", "multiple members", "same visit"]
  },

  // ==========================================
  // REPORTS
  // ==========================================
  {
    question: "What format are the test reports delivered in?",
    answer: "Reports are delivered as PDF files via email and are also accessible through our app and website. Reports include detailed test results, reference ranges, and interpretive comments where applicable.",
    category: "Reports",
    tags: ["report format", "PDF", "digital reports"]
  },
  {
    question: "How long does it take to receive test reports?",
    answer: "Routine blood test reports are typically available within 24 hours. Specialized tests may take 2-5 working days. You will receive an email and app notification when your report is ready.",
    category: "Reports",
    tags: ["report time", "turnaround", "delivery time"]
  },
  {
    question: "Can I understand my reports without a doctor?",
    answer: "Our reports include reference ranges and interpretive comments to help you understand your results. However, we strongly recommend consulting a doctor for proper interpretation, diagnosis, and treatment advice based on your complete health profile.",
    category: "Reports",
    tags: ["report interpretation", "self-understanding", "doctor consultation"]
  },
  {
    question: "How long are test reports valid?",
    answer: "Most test reports are considered valid for 3-6 months for general purposes. However, this depends on the test type and the purpose (insurance, employment, travel). Some tests like blood sugar and blood pressure change rapidly and should be repeated frequently.",
    category: "Reports",
    tags: ["validity", "report expiry", "duration"]
  },
  {
    question: "Can I get hard copies of my reports?",
    answer: "Yes, hard copies of reports can be delivered for an additional charge. However, digital reports via email and our app are the default and recommended format for easy storage and sharing.",
    category: "Reports",
    tags: ["hard copy", "printed reports", "physical delivery"]
  },
  {
    question: "What if there is an error in my report?",
    answer: "If you notice any discrepancy in your report, please contact our support team immediately. We will verify the results and issue a corrected report if necessary. Quality assurance is our top priority.",
    category: "Reports",
    tags: ["report error", "correction", "quality assurance"]
  },
  {
    question: "Can I share my reports with my doctor online?",
    answer: "Yes, you can share your digital reports directly from our app or via a secure link. Reports can be shared via email, WhatsApp, or other messaging platforms. All reports are securely stored in your QXL account.",
    category: "Reports",
    tags: ["share reports", "digital sharing", "secure link"]
  },
  {
    question: "Do reports show reference ranges?",
    answer: "Yes, every test result in your QXL report includes the reference range (normal range) for comparison. Results outside the normal range are highlighted for easy identification. Age and gender-specific ranges are used where applicable.",
    category: "Reports",
    tags: ["reference ranges", "normal range", "highlighted results"]
  },
  {
    question: "Can I access my past reports?",
    answer: "Yes, all your past reports are stored securely in your QXL account and can be accessed anytime through our app or website. This allows you to track trends and compare results over time.",
    category: "Reports",
    tags: ["past reports", "history", "trend tracking"]
  },
  {
    question: "What does it mean if a result is flagged as high or low?",
    answer: "A flagged result means the value is outside the reference range for your age and gender. High does not always mean something is wrong, and low does not always indicate a problem. Your doctor will interpret these flags in the context of your overall health.",
    category: "Reports",
    tags: ["flagged results", "high", "low", "abnormal"]
  },
  {
    question: "Are reports available in multiple languages?",
    answer: "Currently, our reports are available in English. However, our customer support team can help explain results in your preferred language over the phone.",
    category: "Reports",
    tags: ["language", "report language", "support"]
  },
  {
    question: "How are urgent or critical results communicated?",
    answer: "Critical or life-threatening results are immediately flagged and communicated to you via phone call by our medical team. We follow strict protocols for critical value reporting to ensure you receive timely medical attention.",
    category: "Reports",
    tags: ["critical results", "urgent", "immediate communication"]
  },
  {
    question: "Can I get a comparative analysis of my reports over time?",
    answer: "Yes, our app and website provide trend analysis for tests that have been done multiple times. You can view graphs and comparisons to track how your values have changed over months or years.",
    category: "Reports",
    tags: ["trend analysis", "comparative", "history tracking"]
  },
  {
    question: "What information is included in the report header?",
    answer: "The report header includes your name, age, gender, date of collection, date of report, unique report ID, and the name of the referring doctor if applicable. It also shows the laboratory details and accreditation information.",
    category: "Reports",
    tags: ["report header", "patient info", "report details"]
  },
  {
    question: "Can I download my reports as a single file?",
    answer: "Yes, when multiple tests are done, you can download all results as a single consolidated PDF report. Individual test reports can also be downloaded separately if needed.",
    category: "Reports",
    tags: ["download", "single PDF", "consolidated report"]
  },

  // ==========================================
  // PAYMENTS
  // ==========================================
  {
    question: "What payment methods does QXL Diagnostics accept?",
    answer: "We accept UPI (Google Pay, PhonePe, Paytm), credit cards, debit cards, net banking, and cash on service. For online bookings, digital payment is preferred for a seamless experience.",
    category: "Payments",
    tags: ["payment methods", "UPI", "cards", "cash"]
  },
  {
    question: "Is there a discount for online payment?",
    answer: "QXL Diagnostics offers special pricing and occasional discounts for online bookings. Check our website and app for current offers and promotional codes.",
    category: "Payments",
    tags: ["discount", "online payment", "offers"]
  },
  {
    question: "Can I pay in installments?",
    answer: "For high-value packages, we may offer installment options through select payment partners. Contact our team to check availability of EMI options for your preferred package.",
    category: "Payments",
    tags: ["EMI", "installments", "payment plans"]
  },
  {
    question: "Is there a refund policy?",
    answer: "If you cancel before sample collection, a full refund is provided. After collection, refunds are subject to our cancellation policy. Please contact support for specific refund requests.",
    category: "Payments",
    tags: ["refund", "cancellation", "money back"]
  },
  {
    question: "Do I need to pay separately for each family member?",
    answer: "Yes, each individual's tests are billed separately. However, when multiple family members book together for home collection, we may offer a combined discount. Check with our team for family booking offers.",
    category: "Payments",
    tags: ["family payment", "separate billing", "family discount"]
  },
  {
    question: "Are there any hidden charges?",
    answer: "No, QXL Diagnostics believes in transparent pricing. All charges including home collection, sample processing, and digital report delivery are included in the quoted price. Any additional charges will be communicated upfront.",
    category: "Payments",
    tags: ["hidden charges", "transparent pricing", "no extra fees"]
  },
  {
    question: "Can I get a receipt for my payment?",
    answer: "Yes, an electronic receipt (e-receipt) is automatically generated and sent to your email after payment. You can also download it from your account on our app or website.",
    category: "Payments",
    tags: ["receipt", "e-receipt", "payment proof"]
  },
  {
    question: "Is the pricing inclusive of GST?",
    answer: "Yes, all prices displayed on the QXL Diagnostics website and app are inclusive of applicable GST. The tax amount is shown separately on your receipt for your records.",
    category: "Payments",
    tags: ["GST", "tax", "inclusive pricing"]
  },
  {
    question: "What if my payment fails but money is deducted?",
    answer: "If your payment fails but amount is deducted, it is typically reversed within 5-7 business days depending on your bank. If not reversed, contact our support with your transaction ID for immediate assistance.",
    category: "Payments",
    tags: ["payment failure", "refund", "transaction issue"]
  },
  {
    question: "Can I pay at the time of report delivery?",
    answer: "For home collection services, payment is usually collected at the time of sample collection. For walk-in visits, payment is made before sample collection. Online payment at booking is also available.",
    category: "Payments",
    tags: ["payment timing", "pay later", "collection time"]
  },

  // ==========================================
  // INSURANCE
  // ==========================================
  {
    question: "Does QXL Diagnostics accept health insurance?",
    answer: "Yes, we work with major insurance companies and TPAs (Third Party Administrators). Cashless claims are available at our partner network, and reimbursement claims are supported with proper documentation.",
    category: "Insurance",
    tags: ["insurance", "health insurance", "TPA"]
  },
  {
    question: "How does cashless insurance work at QXL Diagnostics?",
    answer: "For cashless claims, we verify your insurance eligibility before the test. You just need to provide your insurance card and ID proof. We handle the claim process with your insurance company directly, so you do not pay out of pocket.",
    category: "Insurance",
    tags: ["cashless", "insurance claim", "no out-of-pocket"]
  },
  {
    question: "What documents do I need for insurance claims?",
    answer: "For reimbursement claims, you typically need the original report, payment receipt, doctor's prescription, insurance claim form, and your ID proof. Our team can help you with the required documentation.",
    category: "Insurance",
    tags: ["documents", "claim process", "reimbursement"]
  },
  {
    question: "Which insurance companies does QXL Diagnostics partner with?",
    answer: "We partner with most major insurance companies and TPAs in India. Contact our team to check if your specific insurance provider is covered under our network.",
    category: "Insurance",
    tags: ["insurance partners", "TPA network", "coverage"]
  },
  {
    question: "Can I use insurance for health packages?",
    answer: "Insurance coverage for health packages depends on your policy terms. Preventive health checkups may be covered under wellness benefits. Contact your insurance provider or our team for specific coverage details.",
    category: "Insurance",
    tags: ["package insurance", "wellness benefit", "preventive checkup"]
  },
  {
    question: "Is home collection covered by insurance?",
    answer: "Some insurance policies cover home collection charges as part of the diagnostic benefit. Check with your insurance provider or our team to confirm if home collection is included in your coverage.",
    category: "Insurance",
    tags: ["home collection insurance", "coverage", "home visit"]
  },
  {
    question: "How long does insurance claim processing take?",
    answer: "Cashless claims are typically processed at the time of service. Reimbursement claims take 7-30 days depending on your insurance company. We provide all necessary documentation to expedite the process.",
    category: "Insurance",
    tags: ["claim processing", "timeline", "cashless vs reimbursement"]
  },
  {
    question: "Can I get tests done if my insurance is not accepted?",
    answer: "Yes, you can pay for tests at QXL Diagnostics regardless of insurance acceptance. You can then submit the receipt and reports to your insurance company for reimbursement if your policy covers diagnostics.",
    category: "Insurance",
    tags: ["no insurance", "self-pay", "reimbursement claim"]
  },
  {
    question: "Does QXL Diagnostics provide insurance documentation?",
    answer: "Yes, we provide all necessary documentation including itemized bills, reports, and doctor prescriptions required for insurance claims. Our support team can assist you with claim-related paperwork.",
    category: "Insurance",
    tags: ["documentation", "claim support", "paperwork"]
  },
  {
    question: "Are there any tests not covered by insurance?",
    answer: "Insurance coverage varies by policy and provider. Cosmetic or purely preventive tests may not be covered. Most diagnostic tests prescribed by a doctor are typically covered. Check your specific policy for details.",
    category: "Insurance",
    tags: ["coverage limits", "excluded tests", "policy terms"]
  },

  // ==========================================
  // DOCTORS
  // ==========================================
  {
    question: "Can I get a doctor consultation at QXL Diagnostics?",
    answer: "Yes, QXL Diagnostics offers teleconsultation with experienced doctors who can help interpret your test results and provide medical advice. Consultations can be booked online alongside your test booking.",
    category: "Doctors",
    tags: ["consultation", "teleconsultation", "doctor advice"]
  },
  {
    question: "Do I need a referral from a doctor for tests?",
    answer: "No, most tests at QXL Diagnostics do not require a doctor's referral. You can book any test directly. However, some insurance claims may require a doctor's prescription, and specialist tests may benefit from clinical guidance.",
    category: "Doctors",
    tags: ["referral", "prescription", "self-booking"]
  },
  {
    question: "Can my doctor order tests through QXL Diagnostics?",
    answer: "Yes, doctors can prescribe tests through QXL Diagnostics. We work with many healthcare providers who recommend our services to their patients. Reports can be shared directly with the prescribing doctor.",
    category: "Doctors",
    tags: ["doctor prescribed", "healthcare provider", "prescription"]
  },
  {
    question: "How do I share my QXL reports with my doctor?",
    answer: "Reports can be shared via email, secure link, or directly through our app. You can also print the PDF reports and carry them to your doctor's office. Your doctor can access reports with your consent.",
    category: "Doctors",
    tags: ["share reports", "doctor access", "email reports"]
  },
  {
    question: "Can QXL Diagnostics recommend a doctor based on my results?",
    answer: "While we do not directly recommend specific doctors, our customer support team can help you understand which specialist to consult based on your results (e.g., endocrinologist for thyroid issues, cardiologist for heart markers).",
    category: "Doctors",
    tags: ["doctor recommendation", "specialist referral", "specialist advice"]
  },
  {
    question: "Are doctor consultations available on weekends?",
    answer: "Yes, teleconsultation services are available seven days a week including weekends. You can book a consultation slot through our app or website at your convenience.",
    category: "Doctors",
    tags: ["weekend consultation", "availability", "7 days"]
  },
  {
    question: "Can I get a second opinion on my test results?",
    answer: "Yes, you can share your QXL Diagnostics reports with any doctor for a second opinion. Our comprehensive reports with reference ranges and interpretive comments make it easy for any doctor to review your results.",
    category: "Doctors",
    tags: ["second opinion", "review", "independent assessment"]
  },
  {
    question: "How much does a doctor consultation cost?",
    answer: "Consultation fees depend on the type and duration of consultation. Some premium health packages include a complimentary consultation. Check our website or contact our team for current consultation pricing.",
    category: "Doctors",
    tags: ["consultation fee", "pricing", "complimentary consultation"]
  },
  {
    question: "Can a doctor help me choose which tests to take?",
    answer: "Yes, our teleconsultation service includes a pre-test consultation where a doctor can assess your health concerns and recommend appropriate tests. This ensures you take only the relevant tests.",
    category: "Doctors",
    tags: ["test selection", "doctor guidance", "pre-test consultation"]
  },
  {
    question: "Is follow-up consultation included with test packages?",
    answer: "Some premium packages at QXL Diagnostics include a post-test consultation to discuss results and next steps. For other packages, follow-up consultations can be booked separately at nominal charges.",
    category: "Doctors",
    tags: ["follow-up", "post-test consultation", "result discussion"]
  },

  // ==========================================
  // DISEASES
  // ==========================================
  {
    question: "What tests should I take if I suspect diabetes?",
    answer: "Key tests include Fasting Blood Sugar, Post-Prandial Blood Sugar, HbA1c, and Insulin. For deeper assessment, add C-Peptide and HOMA-IR to evaluate insulin production and resistance. Our Q-Screen Diabetes Package covers all essential diabetes markers.",
    category: "Diseases",
    tags: ["diabetes", "blood sugar", "HbA1c"]
  },
  {
    question: "How do I know if I have a thyroid problem?",
    answer: "Common symptoms include unexplained weight changes, fatigue, hair loss, mood swings, and sensitivity to temperature. The best screening test is TSH. If abnormal, Free T4, Free T3, and Anti-TPO antibodies are added to identify the specific condition.",
    category: "Diseases",
    tags: ["thyroid", "hypothyroidism", "hyperthyroidism", "TSH"]
  },
  {
    question: "What tests detect heart disease risk?",
    answer: "Lipid profile, hs-CRP, homocysteine, NT-proBNP, Apo A-1/B, Lipoprotein(a), and Fibrinogen provide comprehensive cardiovascular risk assessment. Our Q-Hypertension and Cardiovascular Risk Assessment Package covers all these markers.",
    category: "Diseases",
    tags: ["heart disease", "cardiovascular", "risk factors"]
  },
  {
    question: "What is the difference between Type 1 and Type 2 diabetes?",
    answer: "Type 1 diabetes is an autoimmune condition where the pancreas produces little or no insulin. Type 2 diabetes occurs when the body becomes resistant to insulin. Blood tests like C-peptide help differentiate between the two types.",
    category: "Diseases",
    tags: ["Type 1 diabetes", "Type 2 diabetes", "autoimmune"]
  },
  {
    question: "Can blood tests detect cancer?",
    answer: "Blood tests cannot definitively diagnose cancer, but tumor markers like AFP, CEA, CA-125, PSA, and Beta-HCG can indicate the presence of certain cancers. These markers are used for screening, monitoring treatment, and detecting recurrence.",
    category: "Diseases",
    tags: ["cancer", "tumor markers", "screening"]
  },
  {
    question: "What tests are needed for anemia?",
    answer: "CBC (hemoglobin, hematocrit), iron studies (iron, ferritin, TIBC), vitamin B12, folate, reticulocyte count, and peripheral smear help identify the type and cause of anemia. Iron deficiency is the most common cause worldwide.",
    category: "Diseases",
    tags: ["anemia", "iron deficiency", "hemoglobin"]
  },
  {
    question: "How is liver disease detected through blood tests?",
    answer: "Liver function tests (LFT) including SGOT, SGPT, ALP, Gamma-GT, bilirubin, albumin, and total protein assess liver health. Elevated liver enzymes indicate liver damage, while low albumin suggests chronic liver disease.",
    category: "Diseases",
    tags: ["liver disease", "hepatitis", "fatty liver", "LFT"]
  },
  {
    question: "What tests check kidney function?",
    answer: "Creatinine, BUN, eGFR, uric acid, and electrolytes (sodium, potassium, chloride) evaluate kidney function. Urine albumin and microalbumin detect early kidney damage, especially important for diabetic patients.",
    category: "Diseases",
    tags: ["kidney disease", "creatinine", "eGFR", "renal function"]
  },
  {
    question: "What is rheumatoid arthritis and how is it diagnosed?",
    answer: "Rheumatoid arthritis is an autoimmune disease causing joint inflammation. Blood tests include Anti-CCP (most specific), Rheumatoid Factor, ESR, and CRP. Anti-CCP can detect RA years before symptoms appear.",
    category: "Diseases",
    tags: ["rheumatoid arthritis", "autoimmune", "joint pain"]
  },
  {
    question: "What is lupus and which tests diagnose it?",
    answer: "Systemic lupus erythematosus (SLE) is a chronic autoimmune disease. ANA is the primary screening test, Anti-dsDNA is highly specific, and complement C3/C4 levels indicate disease activity. ESR and CRP measure inflammation levels.",
    category: "Diseases",
    tags: ["lupus", "SLE", "ANA", "autoimmune"]
  },
  {
    question: "Can high cholesterol be reversed without medication?",
    answer: "Mildly elevated cholesterol can often be managed with lifestyle changes including a heart-healthy diet, regular exercise, weight management, and stress reduction. However, significantly elevated levels or high-risk patients may require medication as prescribed by your doctor.",
    category: "Diseases",
    tags: ["cholesterol", "lifestyle", "diet", "heart health"]
  },
  {
    question: "What are the early signs of vitamin D deficiency?",
    answer: "Early signs include fatigue, bone pain, muscle weakness, mood changes, and frequent illness. Severe deficiency causes rickets in children and osteomalacia in adults. A simple blood test (25-hydroxyvitamin D) confirms the diagnosis.",
    category: "Diseases",
    tags: ["vitamin D", "deficiency", "bone health"]
  },
  {
    question: "What causes elevated liver enzymes?",
    answer: "Common causes include fatty liver disease, hepatitis (viral, alcoholic, autoimmune), medications, obesity, and metabolic syndrome. SGPT (ALT) is more liver-specific, while SGOT (AST) can also be elevated due to heart or muscle damage.",
    category: "Diseases",
    tags: ["liver enzymes", "fatty liver", "hepatitis"]
  },
  {
    question: "What tests detect infections?",
    answer: "CBC (WBC count and differential), CRP, ESR, procalcitonin, and blood cultures help detect infections. Specific tests like H. pylori antibodies, dengue NS1 antigen, and malaria parasite tests identify particular pathogens.",
    category: "Diseases",
    tags: ["infection", "CBC", "CRP", "procalcitonin"]
  },
  {
    question: "What is metabolic syndrome and how is it tested?",
    answer: "Metabolic syndrome is a cluster of conditions: high blood sugar, excess belly fat, high cholesterol, and high blood pressure. Tests include fasting glucose, HbA1c, lipid profile, insulin, and HOMA-IR. Having three or more risk factors confirms the diagnosis.",
    category: "Diseases",
    tags: ["metabolic syndrome", "insulin resistance", "obesity"]
  },
  {
    question: "What tests should pregnant women take?",
    answer: "Essential tests include CBC, blood group and Rh factor, hemoglobin, urine routine, blood sugar, thyroid function, hepatitis B, HIV, VDRL, and iron studies. First trimester screening may include Beta-HCG and PAPP-A. Consult your OB-GYN for a complete prenatal testing schedule.",
    category: "Diseases",
    tags: ["pregnancy", "prenatal", "maternal health"]
  },
  {
    question: "What are the warning signs of a heart attack detected by blood tests?",
    answer: "Troponin is the gold standard for detecting heart attacks, becoming elevated within 3-6 hours. CK-MB rises within 4-6 hours. NT-proBNP indicates heart failure. If you experience chest pain, shortness of breath, or arm pain, seek emergency care immediately.",
    category: "Diseases",
    tags: ["heart attack", "troponin", "CK-MB", "emergency"]
  },
  {
    question: "How often should diabetics get tested?",
    answer: "Diabetics should get HbA1c every 3 months, fasting glucose as recommended, lipid profile every 6-12 months, kidney function (creatinine, microalbumin) annually, liver function annually, and eye and foot exams annually. Vitamin D and B12 should also be monitored.",
    category: "Diseases",
    tags: ["diabetes monitoring", "HbA1c", "frequency"]
  },
  {
    question: "What is PCOS and how is it diagnosed?",
    answer: "Polycystic Ovary Syndrome (PCOS) is a hormonal disorder in women. Diagnosis involves elevated testosterone, LH:FSH ratio >2, elevated DHEA-S, and clinical features like irregular periods and excess hair growth. Ultrasound showing polycystic ovaries supports the diagnosis.",
    category: "Diseases",
    tags: ["PCOS", "hormonal disorder", "women health"]
  },
  {
    question: "What is the difference between acute and chronic inflammation markers?",
    answer: "CRP rises rapidly (within hours) during acute inflammation and falls quickly when inflammation resolves. ESR rises more slowly and stays elevated longer, making it better for monitoring chronic conditions. Procalcitonin is specific for bacterial infections.",
    category: "Diseases",
    tags: ["inflammation", "CRP", "ESR", "acute vs chronic"]
  }
];
