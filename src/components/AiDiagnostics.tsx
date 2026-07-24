"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Microscope, 
  FileText, 
  ScanSearch, 
  Bot, 
  Search, 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  HelpCircle,
  Clock,
  Heart
} from 'lucide-react';

// Comprehensive Q&A and Category Dataset
const QA_DATA = {
  categories: [
    { id: 'general', label: 'General FAQs', icon: '🏥' },
    { id: 'blood_tests', label: 'Blood Tests', icon: '💉' },
    { id: 'home_collection', label: 'Home Collection', icon: '🏠' },
    { id: 'pricing', label: 'Pricing & Packages', icon: '💰' },
    { id: 'reports', label: 'Reports Help', icon: '📄' },
    { id: 'symptoms', label: 'Symptom Checker', icon: '❤️' },
    { id: 'capabilities', label: 'AI Capabilities', icon: '🚀' }
  ],
  questions: [
    // General Questions
    {
      id: 'g1',
      category: 'general',
      question: 'What is QXL Diagnostics?',
      answer: 'QXL Diagnostics is a trusted diagnostic center offering blood tests, health packages, home sample collection, and accurate reports with modern laboratory technology.'
    },
    {
      id: 'g2',
      category: 'general',
      question: 'Where are your diagnostic centers?',
      answer: 'QXL Diagnostics has multiple collection centers in Bengaluru. Share your location or enable location access to find the nearest center. Our main lab is located at 3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru.'
    },
    {
      id: 'g3',
      category: 'general',
      question: 'Do you provide home sample collection?',
      answer: 'Yes! We offer professional home blood sample collection across Bengaluru. A certified phlebotomist will visit your home at your preferred time to safely collect samples.'
    },
    {
      id: 'g4',
      category: 'general',
      question: 'How can I book a test?',
      answer: 'Click "Upload Prescription" or "Book a Test" on our home page, select your tests or packages, choose a convenient date/time slot, and confirm. You can also book via WhatsApp.'
    },
    {
      id: 'g5',
      category: 'general',
      question: 'Can I book tests for my family?',
      answer: 'Yes, you can easily book tests for yourself, parents, children, spouse, or other family members. You can manage multiple profiles under one booking.'
    },
    {
      id: 'g6',
      category: 'general',
      question: 'What are your working hours?',
      answer: 'Our laboratory operates 24/7. Home sample collection slots are available daily from 6:00 AM to 8:00 PM. Individual collection centers typically open from 7:00 AM to 7:00 PM.'
    },
    {
      id: 'g7',
      category: 'general',
      question: 'Is fasting required for blood tests?',
      answer: 'Fasting (usually 8-12 hours) is mandatory for tests like Fasting Blood Sugar (FBS) and Lipid Profile (Cholesterol). Most other tests do not require fasting. Please check instructions when booking.'
    },
    {
      id: 'g8',
      category: 'general',
      question: 'How long does it take to get reports?',
      answer: 'Most routine test reports (like CBC, Thyroid, Blood Sugar) are available within 24 hours. Specialized tests or cultures may take 48-72 hours.'
    },
    {
      id: 'g9',
      category: 'general',
      question: 'Are reports available online?',
      answer: 'Yes. You will receive a secure SMS and WhatsApp link to download your PDF reports. You can also click "Download Report" on our website and log in with your mobile number.'
    },
    {
      id: 'g10',
      category: 'general',
      question: 'Are your reports accurate?',
      answer: 'Absolutely. QXL Diagnostics follows strict international quality standards and is NABL certified. We use fully automated, advanced analysers and every report is reviewed by our senior doctors.'
    },

    // Blood Test Questions
    {
      id: 'b1',
      category: 'blood_tests',
      question: 'Which blood test should I take?',
      answer: 'It depends on your symptoms and health goals. Common indicators:\n\n• Diabetes → HbA1c / Fasting Sugar\n• Fever/Infection → CBC (Complete Blood Count)\n• Thyroid Issues → TSH (Thyroid Profile)\n• Heart/Cholesterol → Lipid Profile\n• Liver Health → LFT (Liver Function Test)\n• Kidney Health → KFT (Kidney Function Test)\n• Bone/Joints → Vitamin D, B12 & Calcium'
    },
    {
      id: 'b2',
      category: 'blood_tests',
      question: 'What is CBC (Complete Blood Count)?',
      answer: 'CBC stands for Complete Blood Count. It checks your red blood cells, white blood cells, platelets, hemoglobin, and helps detect infections and anemia.'
    },
    {
      id: 'b3',
      category: 'blood_tests',
      question: 'What is HbA1c?',
      answer: 'HbA1c measures your average blood sugar over the last 2–3 months.'
    },
    {
      id: 'b4',
      category: 'blood_tests',
      question: 'What is Vitamin D test?',
      answer: 'It measures Vitamin D levels to detect deficiency affecting bones and immunity.'
    },
    {
      id: 'b5',
      category: 'blood_tests',
      question: 'What is Thyroid Profile?',
      answer: 'It evaluates thyroid hormones (TSH, T3, T4) to diagnose thyroid disorders.'
    },
    {
      id: 'b6',
      category: 'blood_tests',
      question: 'What is Lipid Profile?',
      answer: 'Measures cholesterol and triglycerides to assess heart health.'
    },

    // Home Collection
    {
      id: 'hc1',
      category: 'home_collection',
      question: 'How does home sample collection work?',
      answer: 'Our home collection process is simple:\n1. Book online or via WhatsApp (+91 99646 39639).\n2. Select your preferred date and time slot.\n3. A certified phlebotomist visits your home to collect samples safely.\n4. Samples are transported in temperature-controlled kits to our lab.\n5. Secure digital reports are delivered online within 24 hours.'
    },
    {
      id: 'hc2',
      category: 'home_collection',
      question: 'Is home collection available today?',
      answer: 'Check your location, and we\'ll show the earliest available slot. We support same-day bookings if slots are open!'
    },
    {
      id: 'hc3',
      category: 'home_collection',
      question: 'Is there any extra charge for home collection?',
      answer: 'Home collection is FREE for bookings above ₹500. For lower values, a nominal convenience fee of ₹100 is charged depending on location.'
    },

    // Pricing
    {
      id: 'p1',
      category: 'pricing',
      question: 'What is the price of CBC?',
      answer: 'Our standard CBC (Complete Blood Count) starts from ₹299. Seasonal discounts or package pricing may apply.'
    },
    {
      id: 'p2',
      category: 'pricing',
      question: 'Do you offer discounts?',
      answer: 'Yes! We offer corporate discounts, senior citizen concessions, seasonal health campaign offers, and up to 50% savings on bundled health packages.'
    },
    {
      id: 'p3',
      category: 'pricing',
      question: 'Which package is best?',
      answer: 'Popular packages include:\n\n• Full Body Checkup\n• Diabetes Package\n• Heart Checkup\n• Women\'s Health\n• Men\'s Health\n• Senior Citizen Package'
    },

    // Reports
    {
      id: 'r1',
      category: 'reports',
      question: 'How do I download my report?',
      answer: 'To download your report:\n1. Click "Download Report" on the header.\n2. Enter your registered mobile number.\n3. Verify with the OTP sent to your phone.\n4. View and download secure PDF copies of your reports.'
    },
    {
      id: 'r2',
      category: 'reports',
      question: 'I forgot my report ID.',
      answer: 'No worries! You do not need a report ID. You can securely retrieve all past reports using your registered mobile number and OTP.'
    },
    {
      id: 'r3',
      category: 'reports',
      question: 'Can I share reports with my doctor?',
      answer: 'Yes, you can easily download the PDF and share it via WhatsApp, Email, or print it out. The report contains clean charts and reference ranges for easy medical review.'
    },

    // Health Packages
    {
      id: 'hp1',
      category: 'health_packages',
      question: 'Which package is suitable for me?',
      answer: 'To recommend the perfect package, share your details:\n• Age & Gender\n• Any current symptoms (e.g. fatigue, weight changes)\n• Health goals (routine checkup, diabetes monitoring)\n\nAlternatively, select "Full Body Checkup" for a comprehensive baseline screening.'
    },
    {
      id: 'hp2',
      category: 'health_packages',
      question: 'Best package for diabetes?',
      answer: 'Our "Diabetes Screening & Care Package" includes Fasting Blood Sugar, HbA1c, Lipid Profile, Kidney Function Tests, and Urine analysis, offering a thorough metabolic overview.'
    },
    {
      id: 'hp3',
      category: 'health_packages',
      question: 'Best package for women?',
      answer: 'Our "Women\'s Wellness Package" covers thyroid levels, vitamin deficiencies, complete blood count, lipid profiles, bone health, and optional ovarian hormone tests.'
    },
    {
      id: 'hp4',
      category: 'health_packages',
      question: 'Best package for senior citizens?',
      answer: 'Our "Senior Citizen Health Package" is optimized for age-specific factors, focusing on bone density (calcium), vitamin markers, liver/kidney functions, cardiac risk, and blood count.'
    },

    // Symptoms
    {
      id: 's_fever',
      category: 'symptoms',
      question: 'Fever / Cough / Cold / Infections',
      answer: '• Recommended Tests: Complete Blood Count (CBC) to check WBC levels, Fever Profile (if persistent for 3+ days, checks for Dengue, Malaria, Typhoid).\n• Preparation: Fasting is not required.\n• Note: This is informational only. Please consult a physician immediately if fever is high or persistent.'
    },
    {
      id: 's_fatigue',
      category: 'symptoms',
      question: 'Fatigue / Weakness / Tiredness',
      answer: '• Recommended Tests: Vitamin D3 & Vitamin B12 (vital for energy), CBC (checks for anemia), Thyroid Profile (TSH).\n• Preparation: Fasting is not required for these routine checks.\n• Insight: Chronic fatigue is highly correlated with low vitamin levels or low iron/hemoglobin.'
    },
    {
      id: 's_sugar',
      category: 'symptoms',
      question: 'High Sugar / Diabetes / Low Sugar',
      answer: '• Recommended Tests: HbA1c (3-month average), Fasting Blood Sugar (FBS), Post-Prandial Blood Sugar (PPBS).\n• Preparation: FBS requires 8-10 hours of strict overnight fasting (water allowed). PPBS is taken exactly 2 hours after breakfast.'
    },
    {
      id: 's_hair',
      category: 'symptoms',
      question: 'Hair Fall / Weight Loss / Thyroid symptoms',
      answer: '• Recommended Tests: Thyroid Profile (T3, T4, TSH), Vitamin D3, Serum Iron Profile.\n• Preparation: Fasting is not required.\n• Insight: Thyroid imbalances (hypo/hyperthyroidism) and iron deficiencies are leading causes of sudden hair loss.'
    },
    {
      id: 's_heart',
      category: 'symptoms',
      question: 'Chest Pain / High Cholesterol / Heart health',
      answer: '• Recommended Tests: Lipid Profile (Cholesterol, HDL, LDL, Triglycerides), hs-CRP (Cardiac inflammation marker), HbA1c, ECG.\n• Preparation: Lipid profile requires 10-12 hours of overnight fasting.\n• Disclaimer: Emergency! If experiencing severe chest pain, shortness of breath, or pain radiating to the arm/jaw, seek emergency medical care immediately.'
    },
    {
      id: 's_bp',
      category: 'symptoms',
      question: 'High BP / Low BP / Hypertension',
      answer: '• Recommended Tests: Kidney Function Test (KFT), Lipid Profile, Electrolytes (Sodium, Potassium).\n• Preparation: Fasting required if combined with a Lipid Profile.\n• Insight: Hypertension is closely linked to kidney health and electrolyte balance.'
    },
    {
      id: 's_pcos',
      category: 'symptoms',
      question: 'PCOS symptoms / Irregular periods / Acne',
      answer: '• Recommended Tests: AMH (Ovarian reserve), LH, FSH, Prolactin, Free Testosterone, Thyroid TSH.\n• Preparation: AMH can be done on any day. For other hormones, testing on Day 2-3 of the menstrual cycle is often recommended.'
    },
    {
      id: 's_stomach',
      category: 'symptoms',
      question: 'Stomach Pain / Digestive issues',
      answer: '• Recommended Tests: Liver Function Test (LFT), Amylase/Lipase, Ultrasound Abdomen.\n• Preparation: Fasting of 8-10 hours is required for abdominal ultrasound or LFT.'
    },
    {
      id: 's_joint',
      category: 'symptoms',
      question: 'Joint Pain / Bone Health / Calcium',
      answer: '• Recommended Tests: Vitamin D3, Calcium, Uric Acid, Rheumatoid Factor (RA).\n• Preparation: Fasting not required.'
    },
    {
      id: 's_kidney',
      category: 'symptoms',
      question: 'Kidney Pain / Urinary issues',
      answer: '• Recommended Tests: Kidney Function Test (KFT / Renal Profile), Urine Routine & Microscopy.\n• Preparation: First morning urine sample is preferred for urine microscopy.'
    },
    {
      id: 's_liver',
      category: 'symptoms',
      question: 'Liver issues / Jaundice / Nausea',
      answer: '• Recommended Tests: Liver Function Test (LFT), Hepatitis B & C panel.\n• Preparation: Fasting of 8-10 hours is recommended for LFT.'
    },

    // AI Capabilities
    {
      id: 'cap1',
      category: 'capabilities',
      question: 'What AI features are available on QXL?',
      answer: 'QXL Diagnostics integrates the following AI capabilities:\n\n• AI Health Package Recommender: Matches age, gender, and symptoms to specific packages.\n• AI Biomarker Scanner: Instantly scans and explains reports.\n• AI Symptom Suggestion: Recommends non-diagnostic screening tests based on symptoms.\n• AI Test Preparation Guide: Provides fasting and test instructions.\n• Multilingual Support: Accessible in English, Kannada, Hindi, Tamil, Telugu, and Malayalam.'
    }
  ]
};

// Search router logic
const findAnswer = (query: string): { text: string; relatedQuestions?: string[] } => {
  const q = query.toLowerCase().trim();
  
  if (q.includes('nearest center') || q.includes('location') || q.includes('branch') || q.includes('where is')) {
    return {
      text: "📍 **QXL Diagnostics Center Locations**\n\nOur main super-specialty laboratory is located at:\n**3rd Floor, SLN Complex, Mysore Road, Kengeri, Bengaluru – 560 060**\n\nWe also have multiple collection centers across Bengaluru. Allow location access in your browser or type your area name to find the closest collection center.\n\n🕒 **Lab Hours:** 24/7 Operations\n📞 **Phone:** +91 99646 39639",
      relatedQuestions: ["Book Home Collection", "Working Hours"]
    };
  }
  
  if (q.includes('home collection') || q.includes('home sample') || q.includes('technician visit')) {
    return {
      text: "🏠 **Home Sample Collection Booking**\n\nWe offer convenient home sample collection across Bengaluru!\n\n**How it works:**\n1. Book online or message us on WhatsApp.\n2. Choose a date and time slot (available 6:00 AM - 8:00 PM).\n3. Our certified health technician visits you.\n4. Secure digital reports are delivered within 24 hours.\n\nWould you like me to schedule a collection slot for you today?",
      relatedQuestions: ["Is there any extra charge?", "Is fasting required?"]
    };
  }

  if (q.includes('book blood test') || q.includes('book appointment') || q.includes('how to book') || q.includes('book test')) {
    return {
      text: "📅 **How to Book a Test/Appointment**\n\n1. Click **\'Book a Test\'** or **\'Upload Prescription\'** at the top of our page.\n2. Select your required test or health package.\n3. Choose home sample collection or center visit.\n4. Select your date & time, then submit.\n\nAlternatively, you can book instantly by sending a photo of your prescription to us on **WhatsApp (+91 99646 39639)**. We will set up everything for you!",
      relatedQuestions: ["Do you provide home sample collection?", "View Packages"]
    };
  }

  if (q.includes('download report') || q.includes('view report') || q.includes('forgot report id') || q.includes('report status') || q.includes('reports')) {
    return {
      text: "📄 **Report Download & Status**\n\n• Most routine tests (CBC, Sugar, Thyroid) are ready within **24 hours**.\n• We send a secure PDF link directly to your WhatsApp and SMS as soon as the results are certified.\n\n**To download manually:**\n1. Click **\'Upload Prescription / Reports\'** or **\'Download Report\'**.\n2. Enter your registered mobile number.\n3. Enter the 4-digit OTP sent to your phone to view/download all your reports.\n\nNo report ID or password required!",
      relatedQuestions: ["Are reports available online?", "Are your reports accurate?"]
    };
  }

  if (q.includes('offers') || q.includes('discounts') || q.includes('discount') || q.includes('promo')) {
    return {
      text: "💰 **Exclusive Today's Offers**\n\n• **Wellness Health Packages:** Save up to 50% on complete body profiles.\n• **Free Home Collection:** Free sample collection at home for bookings above ₹500.\n• **Senior Citizens:** Flat 10% special discount on routine center walk-ins.\n\nWhatsApp us a photo of your prescription to get a custom, discounted price estimate instantly!",
      relatedQuestions: ["What is the price of CBC?", "Which package is best?"]
    };
  }

  if (q.includes('working hours') || q.includes('timings') || q.includes('hours') || q.includes('open')) {
    return {
      text: "🕒 **QXL Diagnostics Timings**\n\n• **Main Kengeri Lab:** Open 24 Hours / 7 Days a week\n• **Home Sample Collection:** 6:00 AM to 8:00 PM (Daily)\n• **Collection Centers:** 7:00 AM to 7:00 PM (Monday - Saturday), 7:00 AM to 1:00 PM (Sundays)\n\nWe recommend booking home collection before 8:00 PM for next-morning slots.",
      relatedQuestions: ["Find Nearest Center", "Do you provide home sample collection?"]
    };
  }

  if (q.includes('emergency') || q.includes('critical') || q.includes('accident') || q.includes('severe chest pain')) {
    return {
      text: "🚨 **Emergency Guidance**\n\nQXL Diagnostics provides outpatient diagnostic testing. **We do not offer emergency medical treatment.**\n\nIf you or someone else is experiencing critical symptoms such as severe chest pain, shortness of breath, sudden numbness, or loss of consciousness, please call an ambulance or go to the nearest emergency hospital immediately.",
      relatedQuestions: ["Contact Support", "Speak to Human"]
    };
  }

  if (q.includes('speak to human') || q.includes('contact support') || q.includes('talk to support') || q.includes('whatsapp booking') || q.includes('human')) {
    return {
      text: "💬 **Speak with a Representative**\n\nNeed to talk to a human? We are here to help!\n\n• **WhatsApp Support:** Text us at [+91 99646 39639](https://api.whatsapp.com/send?phone=919964639639) (Fastest reply)\n• **Customer Care Call:** Dial **+91 99646 39639**\n• **Email Support:** qxldiagnostics@gmail.com\n\nYou can also click the WhatsApp button at the bottom of the chat to start a direct message thread.",
      relatedQuestions: ["How can I book a test?", "Find Nearest Center"]
    };
  }

  // Check symptoms keywords
  const symptomKeywords: { [key: string]: string } = {
    fever: 's_fever', cough: 's_fever', cold: 's_fever', infection: 's_fever', flu: 's_fever',
    fatigue: 's_fatigue', weakness: 's_fatigue', tired: 's_fatigue', exhaustion: 's_fatigue',
    sugar: 's_sugar', diabetes: 's_sugar', diabetic: 's_sugar', glucose: 's_sugar',
    hair: 's_hair', weight: 's_hair', hairfall: 's_hair', thyroid: 's_hair', tsh: 's_hair',
    heart: 's_heart', cholesterol: 's_heart', chest: 's_heart', lipid: 's_heart',
    bp: 's_bp', pressure: 's_bp', hypertension: 's_bp',
    pcos: 's_pcos', pcod: 's_pcos', irregular: 's_pcos', hormone: 's_pcos', hormonal: 's_pcos',
    stomach: 's_stomach', gastric: 's_stomach', abdomen: 's_stomach', digestive: 's_stomach',
    joint: 's_joint', bone: 's_joint', arthritis: 's_joint', uric: 's_joint', calcium: 's_joint',
    kidney: 's_kidney', urine: 's_kidney', urinary: 's_kidney', kft: 's_kidney',
    liver: 's_liver', jaundice: 's_liver', lft: 's_liver', bile: 's_liver'
  };

  for (const keyword of Object.keys(symptomKeywords)) {
    if (q.includes(keyword)) {
      const qId = symptomKeywords[keyword];
      const match = QA_DATA.questions.find(x => x.id === qId);
      if (match) {
        return {
          text: `❤️ **Symptom Screening Guide (${keyword.toUpperCase()})**\n\n${match.answer}\n\n*Note: Screening tests are for proactive wellness and are not a clinical diagnosis. Always consult a certified medical doctor.*`,
          relatedQuestions: ["Book Home Collection", "Check Test Price", "Speak to Human"]
        };
      }
    }
  }

  // Keyword check in general questions
  let bestMatch: typeof QA_DATA.questions[0] | null = null;
  let highestScore = 0;
  
  for (const question of QA_DATA.questions) {
    const questionText = question.question.toLowerCase();
    const answerText = question.answer.toLowerCase();
    let score = 0;
    
    if (questionText.includes(q)) score += 10;
    if (q.includes(questionText)) score += 10;
    
    const queryWords = q.split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 2) {
        if (questionText.includes(word)) score += 3;
        if (answerText.includes(word)) score += 1;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = question;
    }
  }

  if (bestMatch && highestScore > 2) {
    return {
      text: bestMatch.answer,
      relatedQuestions: QA_DATA.questions
        .filter(x => x.category === bestMatch!.category && x.id !== bestMatch!.id)
        .slice(0, 2)
        .map(x => x.question)
    };
  }

  return {
    text: "I couldn't find an exact match for your query. Here are some options you can explore, or ask something else:",
    relatedQuestions: ["Book Home Collection", "Fasting Instructions", "Speak to Human", "QXL Diagnostics Center Locations"]
  };
};

interface ChatMessage {
  text: string;
  isBot: boolean;
  time: string;
  isMenu?: boolean;
  categoryQuestions?: string;
  relatedQuestions?: string[];
}

export default function AiDiagnostics({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const Heading = decorativeHeading ? 'p' : 'h2';
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "👋 Hello! I am the QXL AI Assistant. How can I help you today?\n\nSelect a topic below, choose an FAQ category, or ask about any symptom/test in the chatbox!", isBot: true, time: "09:41 AM", isMenu: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-[#2563eb]" />,
      title: "Machine Learning Algorithms",
      desc: "Advanced algorithms assist our pathologists in identifying microscopic anomalies with unprecedented accuracy."
    },
    {
      icon: <Activity className="w-8 h-8 text-[#2563eb]" />,
      title: "Predictive Analytics",
      desc: "Leveraging vast datasets to predict health trends and provide proactive wellness insights."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#2563eb]" />,
      title: "Automated Quality Control",
      desc: "Continuous AI monitoring ensures every test result meets our stringent quality standards."
    },
    {
      icon: <Microscope className="w-8 h-8 text-[#2563eb]" />,
      title: "Enhanced Imaging",
      desc: "AI-enhanced image analysis for radiology and histopathology, revealing details invisible to the naked eye."
    }
  ];

  // Conversation Starters shown at the top of the chat
  const conversationStarters = [
    "Find nearest center",
    "Book home collection",
    "Compare health packages",
    "Download my report",
    "Check prices",
    "I have fever",
    "I have diabetes",
    "Recommend tests for me",
    "Talk to support"
  ];

  // Context-aware Smart Action chips shown at the bottom
  const getContextChips = () => {
    if (!activeCategory) {
      return [
        "Find Nearest Center",
        "Book Home Collection",
        "View Packages",
        "Download Report",
        "Check Test Price",
        "Today's Offers",
        "Fasting Instructions"
      ];
    }
    
    if (activeCategory === 'symptoms') {
      return [
        "Fever Profile",
        "Diabetes Tests",
        "Thyroid Tests",
        "Vitamin D Test",
        "Lipid Profile",
        "Speak to Human",
        "← Back to Main Menu"
      ];
    }

    if (activeCategory === 'blood_tests') {
      return [
        "CBC Test",
        "HbA1c Test",
        "Thyroid Profile",
        "Lipid Profile",
        "Fasting Instructions",
        "← Back to Main Menu"
      ];
    }

    return [
      "Book Blood Test",
      "Book Home Collection",
      "Speak to Human",
      "← Back to Main Menu"
    ];
  };

  const handleSend = (text: string, categoryId: string | null = null) => {
    if (!text.trim()) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    setMessages(prev => [...prev, { text, isBot: false, time, isMenu: false }]);
    setIsTyping(true);

    if (categoryId) {
      setActiveCategory(categoryId);
    }

    if (text.includes("Interpret My Lab Report")) {
      setIsScanning(true);
    }

    setTimeout(() => {
      let replyText = "";
      let customRelated: string[] | undefined = undefined;
      let showCategoryQuestions: string | null = null;

      // Check if it's a category selection
      const matchingCategory = QA_DATA.categories.find(c => c.label === text || c.id === categoryId);
      
      if (matchingCategory) {
        replyText = `Here are common questions about **${matchingCategory.label}**. Click on any question to view the answer:`;
        showCategoryQuestions = matchingCategory.id;
        setActiveCategory(matchingCategory.id);
      } else if (text === "← Back to Main Menu" || text.toLowerCase().includes("back to main")) {
        replyText = "Sure! Here is the main FAQ and diagnostic menu. Select a category below or ask me a direct question:";
        showCategoryQuestions = "menu";
        setActiveCategory(null);
      } else {
        // Direct answer matching
        const res = findAnswer(text);
        replyText = res.text;
        customRelated = res.relatedQuestions;
      }
      
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsScanning(false);
      
      setMessages(prev => [...prev, { 
        text: replyText, 
        isBot: true, 
        time: botTime,
        isMenu: showCategoryQuestions === "menu",
        categoryQuestions: showCategoryQuestions && showCategoryQuestions !== "menu" ? showCategoryQuestions : undefined,
        relatedQuestions: customRelated
      }]);
      setIsTyping(false);
    }, text.includes("Interpret My Lab Report") ? 3500 : 1200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    const query = searchVal;
    setSearchVal('');
    handleSend(query);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, isScanning]);

  return (
    <section className="py-16 bg-white border-t border-gray-150">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-sm">Next-Gen Technology</span>
            <Heading className="text-[#0f2d5e] text-3xl md:text-4xl font-extrabold mb-4 leading-tight">AI-Powered Diagnostics</Heading>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
              At QXL Diagnostics, we integrate Artificial Intelligence into our core testing processes. This powerful synergy between our expert doctors and advanced AI systems ensures unparalleled precision, faster turnaround times, and deeper clinical insights for every patient.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0f2d5e] text-[14px] mb-1">{feature.title}</h3>
                    <p className="text-slate-500 text-[12px] leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[600px] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#efeae2] flex flex-col" style={{ height: '600px', maxHeight: '600px' }}>
            {/* AI Assistant Header */}
            <div className="bg-gradient-to-r from-[#075e54] to-[#128C7E] text-white p-4 flex items-center justify-between shadow-md z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#075e54] rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-[15px] leading-tight flex items-center gap-2">
                    QXL AI Assistant 
                    <span className="bg-[#1d4ed8] text-white text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-extrabold">Beta</span>
                  </h3>
                  <p className="text-[11px] text-white/90">{isTyping ? 'typing...' : isScanning ? 'analyzing report...' : 'Online'}</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {activeCategory && (
                  <button 
                    onClick={() => handleSend("← Back to Main Menu")}
                    className="flex items-center gap-1 text-[11px] bg-white/20 hover:bg-white/35 px-2 py-1 rounded-md transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                )}
                <ScanSearch className="w-5 h-5 text-white/80 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>
            
            {/* WhatsApp Chat Area */}
            <div ref={chatContainerRef} className="flex-1 min-h-0 p-4 flex flex-col gap-3 overflow-y-auto z-10 scroll-smooth" style={{ backgroundImage: "url('https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 0 }}>
              
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    {/* Message Bubble */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 rounded-xl max-w-[85%] shadow-sm relative ${msg.isBot ? 'bg-white rounded-tl-none self-start border border-gray-100' : 'bg-[#dcf8c6] rounded-tr-none self-end border border-[#c3ebb0]'}`}
                    >
                      {msg.isBot && <div className="absolute -left-[9px] top-0 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent drop-shadow-sm"></div>}
                      {!msg.isBot && <div className="absolute -right-[9px] top-0 w-0 h-0 border-t-[10px] border-t-[#dcf8c6] border-r-[10px] border-r-transparent drop-shadow-sm"></div>}
                      
                      <p className="text-[13px] text-gray-800 whitespace-pre-wrap leading-relaxed">{msg.text ? msg.text.replace(/\*/g, '') : ''}</p>
                      <p className={`text-[9px] text-right mt-1 ${msg.isBot ? 'text-gray-400' : 'text-[#6ca553]'}`}>{msg.time} {!msg.isBot && '✓✓'}</p>
                    </motion.div>

                    {/* Render Category Grid if Menu is requested */}
                    {msg.isBot && msg.isMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 gap-2 mt-1 self-start w-[85%] pb-2"
                      >
                        {QA_DATA.categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleSend(cat.label, cat.id)}
                            className="bg-white/95 hover:bg-[#128C7E] hover:text-white border border-[#128C7E]/20 text-gray-800 p-2.5 rounded-xl text-[12px] font-bold transition-all text-left shadow-sm flex items-center gap-2"
                          >
                            <span className="text-sm">{cat.icon}</span>
                            <span className="truncate">{cat.label.replace(/🏥|💉|🏠|💰|📄|❤️|🚀/, '').trim()}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* Render Category Questions */}
                    {msg.isBot && msg.categoryQuestions && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-1.5 mt-1 self-start w-[85%] pb-2"
                      >
                        {QA_DATA.questions
                          .filter(q => q.category === msg.categoryQuestions)
                          .map((q) => (
                            <button
                              key={q.id}
                              onClick={() => handleSend(q.question)}
                              className="bg-white/95 hover:bg-[#128C7E] hover:text-white border border-gray-200 hover:border-[#128C7E] text-[#128C7E] hover:text-white px-3 py-2 rounded-lg text-[12px] text-left transition-all shadow-sm leading-snug font-medium"
                            >
                              {q.question}
                            </button>
                          ))}
                      </motion.div>
                    )}

                    {/* Render Custom Related Questions / Follow ups */}
                    {msg.isBot && msg.relatedQuestions && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap gap-1.5 mt-1 self-start w-full pb-2"
                      >
                        {msg.relatedQuestions.map((qText, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(qText)}
                            className="bg-white/80 hover:bg-[#0f766e] hover:text-white border border-[#0f766e] text-[#0f766e] px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-all shadow-sm"
                          >
                            {qText}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </AnimatePresence>

              {/* Initial Conversation Starters (only visible at the top when starting) */}
              {messages.length === 1 && (
                <div className="mt-2">
                  <p className="text-[11px] text-slate-500 font-bold mb-1.5 uppercase tracking-wider px-1">💡 Conversation Starters</p>
                  <div className="flex flex-wrap gap-1.5">
                    {conversationStarters.map((starter, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(starter)}
                        className="bg-white/90 hover:bg-[#128C7E] hover:text-white border border-[#128C7E]/20 text-gray-800 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all shadow-sm"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isScanning && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white p-4 rounded-xl rounded-tl-none max-w-[85%] shadow-sm self-start border border-blue-100 flex flex-col items-center gap-3 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-50/50"></div>
                  <div className="w-full h-1 bg-blue-500 absolute top-0 left-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <p className="text-[12px] font-medium text-blue-600">Extracting biomarkers from PDF...</p>
                  </div>
                </motion.div>
              )}

              {isTyping && !isScanning && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white p-3 rounded-xl rounded-tl-none max-w-[85%] shadow-sm self-start flex gap-1.5 items-center h-[38px] border border-gray-100 relative"
                >
                  <div className="absolute -left-[9px] top-0 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
                  <span className="w-1.5 h-1.5 bg-[#128C7E]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#128C7E]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#128C7E]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
              <div className="h-2" />
            </div>

            {/* Quick Action Smart Chips */}
            <div className="bg-[#f0f0f0] p-3 z-20 border-t border-gray-200">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {getContextChips().map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSend(q);
                    }}
                    disabled={isTyping || isScanning}
                    className="snap-start shrink-0 bg-white border border-[#0f766e] text-[#0f766e] px-3.5 py-2.5 rounded-full text-[12px] font-medium hover:bg-[#0f766e] hover:text-white transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 font-semibold"
                  >
                    {q.includes("Back") && <ArrowLeft className="w-3.5 h-3.5" />}
                    {q}
                  </button>
                ))}
              </div>

              {/* Active Search & Text input Form */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mt-1">
                <input 
                  type="text" 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Ask about tests, symptoms, or packages..."
                  className="flex-1 bg-white rounded-full px-4 py-2.5 text-[13px] text-slate-800 placeholder-gray-400 shadow-sm border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#128C7E] transition-all"
                  disabled={isTyping || isScanning}
                />
                
                {/* WhatsApp Direct Handoff Link */}
                <a 
                  href="https://api.whatsapp.com/send?phone=919964639639" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Direct WhatsApp Booking"
                  className="w-10 h-10 bg-[#25d366] rounded-full flex items-center justify-center text-white shrink-0 shadow-sm cursor-pointer hover:bg-[#128C7E] transition-colors"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.794.002-2.615-1.012-5.074-2.857-6.919-1.846-1.843-4.305-2.856-6.924-2.857-5.399 0-9.799 4.4-9.802 9.8-.001 1.547.41 3.054 1.193 4.4l-.433 1.58 1.592-.418zm11.381-5.308c-.263-.132-1.557-.767-1.797-.854-.24-.087-.414-.13-.588.131-.174.26-.673.854-.826 1.028-.152.173-.305.195-.568.063-.263-.132-1.111-.409-2.116-1.306-.782-.698-1.31-1.56-1.464-1.822-.154-.262-.016-.404.116-.536.118-.118.263-.306.394-.459.131-.153.174-.262.263-.437.087-.174.043-.328-.022-.459-.065-.131-.588-1.417-.805-1.942-.212-.51-.444-.44-.606-.448-.156-.008-.335-.01-.513-.01-.178 0-.469.067-.714.334-.246.267-.938.917-.938 2.237 0 1.32.96 2.593 1.093 2.768.133.174 1.888 2.883 4.574 4.043.639.276 1.137.44 1.526.564.643.204 1.229.175 1.691.106.514-.077 1.557-.636 1.776-1.25.218-.613.218-1.138.152-1.25-.065-.11-.24-.175-.503-.307z" />
                  </svg>
                </a>
              </form>
            </div>

          </div>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.2; }
          100% { top: 0%; opacity: 0.8; }
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
