/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = './src/lib/cmsStore.ts';

let content = fs.readFileSync(path, 'utf8');

// Find where defaultBlogs starts
const startIdx = content.indexOf('const defaultBlogs = [');
if (startIdx === -1) throw new Error("Could not find defaultBlogs");

// Find where the next variable starts to know where defaultBlogs ends
const nextVarIdx = content.indexOf('\nexport', startIdx);
if (nextVarIdx === -1) throw new Error("Could not find end of defaultBlogs");

const newBlogs = `const defaultBlogs = [
  {
    id: "blog-1",
    title: "The Future is Now: AI-Assisted Diagnostics at QXL",
    excerpt: "Discover how QXL Diagnostics integrates artificial intelligence to deliver faster, more accurate pathology reports.",
    content: "Artificial Intelligence is transforming healthcare, and at QXL Diagnostics, we are at the forefront of this revolution. By integrating AI algorithms into our diagnostic workflows, our pathologists can identify cellular abnormalities with unprecedented precision.\\n\\nAI doesn't replace our expert doctors; it acts as a powerful second set of eyes, rapidly analyzing thousands of data points in blood smears and tissue samples to flag potential issues. This reduces human error and significantly decreases turnaround times, meaning you get your results faster without compromising on accuracy.\\n\\nWhether it's a routine CBC or a complex histopathology report, AI-assisted diagnostics ensure that your doctor receives the most reliable data to guide your treatment.",
    author: "Dr. Shantakumar Muruda",
    date: "June 20, 2026",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-2",
    title: "Understanding AMH: Your Guide to Fertility Testing",
    excerpt: "Anti-Mullerian Hormone (AMH) testing is crucial for understanding ovarian reserve. Learn who needs it and why.",
    content: "Anti-Mullerian Hormone (AMH) is a protein produced by the cells inside the ovarian follicles. Measuring AMH levels in the blood is currently the most accurate way to assess a woman's ovarian reserve—essentially, the number of eggs she has remaining.\\n\\nUnlike other fertility hormones, AMH levels remain relatively stable throughout the menstrual cycle, meaning the test can be taken on any day. It's an invaluable tool for women planning for pregnancy, those considering IVF, or those experiencing symptoms of PCOS (where AMH is typically elevated).\\n\\nAt QXL Diagnostics, we use advanced CLIA technology to provide highly accurate AMH results, empowering women with the knowledge they need to make informed family planning decisions.",
    author: "Dr. Pritilata Rout",
    date: "June 15, 2026",
    image: "/image/slide_womens_wellness.png"
  },
  {
    id: "blog-3",
    title: "Allergy Testing: Identifying Your Hidden Triggers",
    excerpt: "Chronic sneezing, rashes, or digestive issues? Learn how comprehensive allergy testing can pinpoint the exact cause.",
    content: "Allergies occur when your immune system overreacts to a foreign substance, such as pollen, pet dander, or specific foods. While symptoms can range from mild sneezing to severe anaphylaxis, identifying the exact trigger is often a frustrating guessing game.\\n\\nQXL Diagnostics offers comprehensive allergy panels that test for hundreds of common environmental and food allergens specific to the Indian context. Using a single blood sample, we can measure specific IgE antibodies to pinpoint exactly what is causing your symptoms.\\n\\nArmed with an accurate allergy profile, you and your doctor can develop a targeted avoidance strategy or immunotherapy plan, finally bringing relief from chronic allergic reactions.",
    author: "Dr. Ajitha Pillai",
    date: "June 05, 2026",
    image: "/image/slide_immunity_test_new.png"
  },
  {
    id: "blog-4",
    title: "Beyond Cholesterol: Advanced Cardiac Risk Assessment",
    excerpt: "A standard lipid profile isn't always enough. Learn about hs-CRP, Lp(a), and advanced markers for heart health.",
    content: "For decades, the standard lipid profile (Total Cholesterol, LDL, HDL) has been the gold standard for assessing heart disease risk. However, up to 50% of heart attacks occur in individuals with 'normal' cholesterol levels. This is where advanced cardiac risk assessment comes in.\\n\\nAt QXL Diagnostics, we test for deeper risk markers such as High-Sensitivity C-Reactive Protein (hs-CRP), which measures dangerous inflammation in the arteries, and Lipoprotein(a), a genetic lipid particle highly associated with early heart disease.\\n\\nBy looking beyond basic cholesterol, we provide cardiologists with a comprehensive picture of your cardiovascular health, allowing for truly preventative, personalized heart care.",
    author: "Dr. Shantakumar Muruda",
    date: "May 28, 2026",
    image: "/image/slide_heart_health.png"
  },
  {
    id: "blog-5",
    title: "The Science of Kidney Stones: Diagnosis and Analysis",
    excerpt: "Kidney stones are incredibly painful, but analyzing them can prevent future occurrences. Learn about our stone analysis tests.",
    content: "Passing a kidney stone is often described as one of the most painful experiences a person can endure. Unfortunately, if you've had one stone, you are highly likely to develop another. The key to prevention lies in understanding exactly what the stone is made of.\\n\\nQXL Diagnostics offers advanced Kidney Stone Analysis. If you catch a passed stone, our lab can determine its chemical composition—whether it's calcium oxalate, uric acid, struvite, or cystine.\\n\\nCoupled with our 24-hour urine metabolic workup and serum kidney function tests, this analysis allows your urologist to prescribe specific dietary changes and medications that effectively stop new stones from forming.",
    author: "Dr. Naveen Kumar N",
    date: "May 15, 2026",
    image: "/image/slide_liver_kidney.png"
  },
  {
    id: "blog-6",
    title: "Histopathology: The Gold Standard in Cancer Diagnosis",
    excerpt: "Take a look inside the lab to understand how pathologists examine tissue biopsies to diagnose cancer with certainty.",
    content: "When a suspicious lump or lesion is found, imaging scans can only tell a doctor so much. The definitive diagnosis always relies on histopathology—the microscopic examination of a tissue biopsy.\\n\\nAt QXL Diagnostics, our highly trained histopathologists prepare tissue samples into wafer-thin slices, stain them, and meticulously examine the cellular architecture under powerful microscopes. We look for abnormal cell shapes, chaotic growth patterns, and invasion into surrounding tissues.\\n\\nIn cases of cancer, our histopathology reports determine the exact type and grade of the tumor, which is the most critical factor in deciding whether a patient needs surgery, chemotherapy, or radiation.",
    author: "Dr. Pritilata Rout",
    date: "May 02, 2026",
    image: "/image/slide_histopathology.png"
  },
  {
    id: "blog-7",
    title: "Multiplex PCR: Rapid Detection of Infectious Diseases",
    excerpt: "When every hour counts, Multiplex PCR testing identifies multiple viruses and bacteria simultaneously from a single sample.",
    content: "In cases of severe infections like meningitis or acute respiratory distress, waiting days for traditional bacterial cultures to grow is not an option. Doctors need answers immediately to start the correct life-saving antibiotics or antivirals.\\n\\nQXL Diagnostics utilizes state-of-the-art Multiplex PCR technology. This molecular technique amplifies the DNA or RNA of pathogens, allowing us to test for dozens of different viruses, bacteria, and fungi simultaneously from a single sample (like blood, sputum, or CSF).\\n\\nWithin hours, we can accurately identify the exact organism causing the infection, revolutionizing the speed and accuracy of infectious disease treatment.",
    author: "Dr. Ajitha Pillai",
    date: "April 20, 2026",
    image: "/image/slide_molecular.png"
  },
  {
    id: "blog-8",
    title: "Demystifying the ANA Test for Autoimmune Diseases",
    excerpt: "What does a positive ANA test mean? Learn how this crucial blood test helps diagnose Lupus, Rheumatoid Arthritis, and more.",
    content: "Autoimmune diseases occur when your immune system mistakenly attacks your own body. Because symptoms like joint pain and fatigue are so vague, diagnosing them can be a long, frustrating process. The Antinuclear Antibody (ANA) test is usually the first step.\\n\\nAn ANA test detects antibodies that target the nucleus of your own cells. A positive result is a strong indicator of autoimmune conditions like Systemic Lupus Erythematosus (SLE), Sjögren's syndrome, or Scleroderma.\\n\\nAt QXL Diagnostics, we use advanced Immunofluorescence techniques to not only detect ANA but also determine its 'pattern', providing rheumatologists with crucial clues to pinpoint your exact autoimmune diagnosis.",
    author: "Dr. Pritilata Rout",
    date: "April 08, 2026",
    image: "/image/slide_autoimmune.png"
  },
  {
    id: "blog-9",
    title: "What Makes a 'Super Speciality' Laboratory Different?",
    excerpt: "Not all labs are created equal. Discover the technology, expertise, and quality control that define a super speciality lab.",
    content: "You've likely seen many diagnostic centers in your neighborhood, but what exactly sets a 'Super Speciality' laboratory like QXL Diagnostics apart?\\n\\nThe difference lies in capabilities and expertise. While routine labs handle basic blood sugar and CBC tests, super speciality labs are equipped with high-end molecular platforms, flow cytometers, and automated immunohistochemistry stainers. We perform complex genetic, oncological, and autoimmune assays that require immense precision.\\n\\nFurthermore, these complex tests require interpretation by specialized doctors. Our reports are reviewed by consultant pathologists, microbiologists, and biochemists, ensuring that the data provided to your doctor is of the highest clinical standard.",
    author: "Dr. Shantakumar Muruda",
    date: "March 25, 2026",
    image: "/image/slide_lab_facility.png"
  },
  {
    id: "blog-10",
    title: "The Importance of Expert-Reviewed Diagnostic Reports",
    excerpt: "A machine can generate numbers, but it takes an expert pathologist to provide a clinically meaningful diagnosis.",
    content: "In an era of automated healthcare, it is easy to assume that a blood test is simply a machine printing out numbers. However, context is everything in medicine.\\n\\nAt QXL Diagnostics, we mandate that all critical and specialized reports are reviewed by our panel of senior medical consultants before they reach your doctor. Our experts look for subtle discrepancies, correlate findings across different tests, and add clinical interpretation notes that guide treatment.\\n\\nWhen a borderline result could mean the difference between a cancer diagnosis and a benign condition, the trained eye of an expert pathologist is irreplaceable. This is our commitment to precision care.",
    author: "Dr. Naveen Kumar N",
    date: "March 10, 2026",
    image: "/image/dr_shantakumar_v4.jpg"
  }
];`;

content = content.substring(0, startIdx) + newBlogs + '\n' + content.substring(nextVarIdx);
fs.writeFileSync(path, content, 'utf8');
console.log("Replaced defaultBlogs successfully.");
