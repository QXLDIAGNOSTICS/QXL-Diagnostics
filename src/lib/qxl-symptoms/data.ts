export type SymptomPage = {slug:string;title:string;seoTitle:string;description:string;overview:string;causes:string[];tests:string[];nextsteps:string[];urgent:string;faq:{q:string;a:string}[];queries:string[];references:string[]};
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || "https://qxldiagnostics.com").replace(/\/$/, "");
export const clinicalReferences: Record<string,{label:string;href:string}> = {
  "cdc-urethritis": {
    "label": "CDC — Urethritis and Cervicitis",
    "href": "https://www.cdc.gov/std/treatment-guidelines/urethritis-and-cervicitis.htm"
  },
  "cdc-vaginal": {
    "label": "CDC — Vulvovaginal itching, discharge and odour",
    "href": "https://www.cdc.gov/std/treatment-guidelines/vaginal-discharge.htm"
  },
  "cdc-ulcers": {
    "label": "CDC — Genital, anal and perianal ulcers",
    "href": "https://www.cdc.gov/std/treatment-guidelines/genital-ulcers.htm"
  },
  "cdc-herpes": {
    "label": "CDC — Genital herpes clinical testing",
    "href": "https://www.cdc.gov/std/treatment-guidelines/herpes.htm"
  },
  "cdc-syphilis": {
    "label": "CDC — Syphilis diagnostic considerations",
    "href": "https://www.cdc.gov/std/treatment-guidelines/p-and-s-syphilis.htm"
  },
  "cdc-hiv": {
    "label": "CDC — Getting tested for HIV",
    "href": "https://www.cdc.gov/hiv/testing/index.html"
  },
  "who-pep": {
    "label": "WHO — HIV PEP guidelines (2024)",
    "href": "https://www.who.int/india/publications/i/item/9789240095137"
  }
};
export const symptomPages: SymptomPage[] = [
  {
    "slug": "private-part-itching",
    "title": "Itching in the Private Parts: Causes and Tests",
    "seoTitle": "Private Part Itching After Sex: Causes & STI Tests | QXL",
    "description": "Genital itching or irritation after sex? Learn about infections, contact irritation and when a swab, urine or blood test may help.",
    "overview": "Itching around the penis, vulva, vagina, groin or anus is common and does not automatically indicate an STI. Sweat, friction, scented products and skin disorders are possible causes; infections can also cause itch. A clinical examination helps distinguish a skin condition from urethral or vaginal infection.",
    "causes": [
      "Irritant or allergic contact dermatitis from soaps, lubricants, latex or friction",
      "Fungal infections including candidiasis or groin dermatophyte infection",
      "Vaginitis, trichomoniasis or other STI when discharge or exposure history suggests it",
      "Eczema, psoriasis, pubic lice or other skin conditions"
    ],
    "tests": [
      "Genital or skin examination is often the first step",
      "Vaginal microscopy / vaginitis assessment for compatible vaginal symptoms",
      "Chlamydia/gonorrhea NAAT if urethral symptoms or exposure indicate it",
      "Fungal microscopy or scraping when a clinician suspects fungal skin disease"
    ],
    "nextsteps": [
      "Avoid harsh antiseptics, perfumed products and scratching",
      "Document when the itch began and whether there is discharge, rash or new product exposure",
      "Seek assessment if symptoms persist, return or worsen"
    ],
    "urgent": "Prompt assessment for severe swelling, fever, extensive painful rash or urinary obstruction.",
    "faq": [
      {
        "q": "Does private-part itching mean I have HIV?",
        "a": "Itching by itself cannot diagnose HIV. HIV screening is based on exposure history and an appropriate testing schedule."
      },
      {
        "q": "Can itching start immediately after sex without an STI?",
        "a": "Yes. Friction, latex or lubricant irritation can cause prompt symptoms. STI assessment may still be appropriate if there was a relevant exposure."
      },
      {
        "q": "Which specimen is needed?",
        "a": "It depends on the examination: a vaginal swab, urine NAAT, skin scraping or no laboratory specimen may be appropriate."
      }
    ],
    "queries": [
      "private part itching after sex",
      "itching in private area male",
      "vaginal itching after sex",
      "penis itching after condom",
      "itchy pubic area",
      "itching down there but no discharge",
      "groin itching std or fungal",
      "vaginal lips itching after intercourse",
      "private part itching test bangalore",
      "itchy penis tip after sex"
    ],
    "references": [
      "cdc-vaginal",
      "cdc-urethritis"
    ]
  },
  {
    "slug": "burning-urination-after-sex",
    "title": "Burning Urination After Sex: UTI or STI?",
    "seoTitle": "Burning Urination After Sex: UTI vs STI Tests | QXL",
    "description": "Pain or burning while peeing after sex can have several causes. Compare UTI and STI testing and learn which urine sample is appropriate.",
    "overview": "Burning when passing urine (dysuria) can follow irritation, a urinary tract infection or urethritis caused by an STI. Urgency, frequency, fever, discharge, anatomy and sexual exposure change which tests are useful.",
    "causes": [
      "Urinary tract infection, particularly when frequency and urgency are present",
      "Urethritis due to chlamydia, gonorrhea or other causes",
      "Friction, dehydration or chemical irritation",
      "Genital herpes lesions near the urethral opening"
    ],
    "tests": [
      "Urinalysis and urine culture using a clean-catch midstream urine specimen when UTI is suspected",
      "Chlamydia/gonorrhea NAAT using first-catch urine in men or vaginal swab in women when STI is suspected",
      "Further examination or testing if sores or discharge are present"
    ],
    "nextsteps": [
      "Do not use the same urine sample instructions for UTI culture and STI NAAT",
      "Seek prompt examination if symptoms are persistent or severe",
      "Discuss pregnancy, new sexual exposure and previous antibiotics with the clinician"
    ],
    "urgent": "Urgent assessment for fever with flank pain, vomiting, inability to pass urine or pregnancy with urinary symptoms.",
    "faq": [
      {
        "q": "What is the difference between first-catch and midstream urine?",
        "a": "First-catch urine is commonly used for urethral STI NAAT; clean-catch midstream urine is generally used for bacterial UTI culture. They are distinct collections."
      },
      {
        "q": "Can I have a UTI and STI together?",
        "a": "Yes. Symptoms can overlap and a clinician may order both investigations."
      },
      {
        "q": "Is burning two hours after sex definitely an STI?",
        "a": "No. Immediate irritation can be noninfectious; symptoms alone cannot establish the cause."
      }
    ],
    "queries": [
      "burning when i pee after sex",
      "urine burning after intercourse",
      "painful urination after sex male",
      "burning urine after sex female",
      "uti or std burning pee",
      "penis tip burning after sex",
      "urine infection after sex blood test",
      "stinging when peeing after condom break",
      "urine burning after oral sex",
      "burning in private part when urinating"
    ],
    "references": [
      "cdc-urethritis"
    ]
  },
  {
    "slug": "watery-discharge-after-sex",
    "title": "Watery Leakage or Discharge After Sex: What It May Mean",
    "seoTitle": "Watery Discharge After Sex: Normal or Infection? | QXL",
    "description": "Watery leakage after intercourse may be normal fluid or a sign needing assessment. Learn when vaginal or penile discharge requires STI testing.",
    "overview": "Watery or clear fluid after sex can be normal lubrication, semen leaking out or a change in vaginal secretions. New, persistent, foul-smelling, painful or unusual discharge should be assessed. Clear fluid from the penis unrelated to arousal may represent urethral discharge.",
    "causes": [
      "Normal arousal fluid or semen after intercourse",
      "Bacterial vaginosis, trichomoniasis or cervicitis when vaginal discharge changes",
      "Urethritis or STI when there is unexpected penile fluid",
      "Urinary leakage or irritation in some circumstances"
    ],
    "tests": [
      "For changed vaginal discharge: examination and vaginal microscopy or validated vaginitis testing",
      "For unexpected penile discharge: first-catch urine chlamydia/gonorrhea NAAT",
      "For exposure-related concerns: additional HIV/syphilis blood screening at appropriate times"
    ],
    "nextsteps": [
      "Note whether leakage is from the vagina, penis or urinary opening",
      "Look for associated odour, itch, pain or bleeding without self-diagnosing",
      "Ask about the correct specimen before a home collection booking"
    ],
    "urgent": "Seek urgent care for heavy bleeding, severe pelvic pain, fever, pregnancy-related fluid leakage or acute urinary difficulty.",
    "faq": [
      {
        "q": "Is watery discharge after sex always an STD?",
        "a": "No. Semen, lubrication and normal secretions can cause watery leakage."
      },
      {
        "q": "Is clear fluid from the penis normal?",
        "a": "Pre-ejaculate during arousal can be normal. New discharge without arousal, especially with burning, needs evaluation."
      },
      {
        "q": "Which test checks watery discharge?",
        "a": "Tests depend on source and symptoms; vaginal swab assessment or urethral CT/GC NAAT may be appropriate."
      }
    ],
    "queries": [
      "watery leak after sex",
      "water coming from private part after sex",
      "clear watery discharge after intercourse",
      "watery discharge after unprotected sex",
      "wet underwear after sex std",
      "clear liquid from penis after sex",
      "water leaking from vagina after sex",
      "thin discharge fishy smell",
      "watery vaginal discharge std",
      "watery penile discharge without pain",
      "private part water leakage causes"
    ],
    "references": [
      "cdc-vaginal",
      "cdc-urethritis"
    ]
  },
  {
    "slug": "penile-discharge",
    "title": "Discharge From the Penis: Causes and STI Testing",
    "seoTitle": "Penile Discharge: Clear, White, Yellow or Green | QXL",
    "description": "Unexpected discharge from the penis can indicate urethritis. Understand chlamydia, gonorrhea, specimen choices and when to seek care.",
    "overview": "Fluid emerging from the urethra when not sexually aroused can be a sign of urethritis. Clear, whitish, yellow or green discharge can occur with different infections; colour cannot identify the organism. A clinician may need to evaluate both STI and non-STI causes.",
    "causes": [
      "Chlamydia or gonorrhea urethritis",
      "Other nongonococcal urethritis such as Mycoplasma genitalium in persistent cases",
      "Normal pre-ejaculate during sexual arousal",
      "Local irritation or prostatitis in selected presentations"
    ],
    "tests": [
      "Chlamydia/gonorrhea NAAT from first-catch urine (or validated urethral specimen)",
      "Gonorrhea culture and susceptibility testing when clinically indicated",
      "Additional testing for persistent or recurrent urethritis, guided by a clinician"
    ],
    "nextsteps": [
      "Avoid relying on the colour or smell alone",
      "Seek assessment promptly, and discuss partners and recent exposure",
      "Do not take antibiotics without an appropriate clinical plan"
    ],
    "urgent": "Prompt medical assessment for fever, testicular swelling, severe pain or inability to urinate.",
    "faq": [
      {
        "q": "Is white discharge from the penis definitely gonorrhea?",
        "a": "No. Other forms of urethritis and noninfectious causes can appear similar."
      },
      {
        "q": "Will a blood test detect penile chlamydia?",
        "a": "Routine chlamydia diagnosis uses an appropriate NAAT specimen, commonly first-catch urine in men, rather than a standard blood test."
      },
      {
        "q": "Can discharge occur without pain?",
        "a": "Yes. Some urethral infections cause minimal or no other symptoms."
      }
    ],
    "queries": [
      "white discharge from penis after sex",
      "yellow fluid from penis",
      "green discharge penis std",
      "clear drops from penis morning",
      "watery penile discharge after oral sex",
      "penis leaking fluid no erection",
      "penile discharge test bangalore",
      "sticky fluid penis without sex",
      "pus from penis tip",
      "urethral discharge with no burning"
    ],
    "references": [
      "cdc-urethritis"
    ]
  },
  {
    "slug": "vaginal-discharge-odor",
    "title": "Unusual Vaginal Discharge, Smell or Itching",
    "seoTitle": "Vaginal Discharge & Fishy Smell After Sex | QXL",
    "description": "Fishy odour, green discharge, white discharge or vaginal itching can have different causes. Learn about appropriate vaginal swabs and STI testing.",
    "overview": "Changes in vaginal discharge, smell or irritation are often caused by vaginitis, but the cause cannot be confirmed by colour or odour alone. Some conditions, including bacterial vaginosis and candidiasis, are not classified as STIs; trichomoniasis and cervicitis may be sexually transmitted.",
    "causes": [
      "Bacterial vaginosis, which can be associated with fishy odour",
      "Vulvovaginal candidiasis, often associated with itching and irritation",
      "Trichomoniasis or cervical chlamydia/gonorrhea where the history suggests it",
      "Normal cyclical changes or irritation from products"
    ],
    "tests": [
      "Vaginal pH, microscopy and/or Gram stain/Nugent assessment where indicated",
      "Candida microscopy or culture in recurrent or complicated presentations",
      "Trichomonas NAAT and chlamydia/gonorrhea NAAT when indicated"
    ],
    "nextsteps": [
      "Describe odour, texture, itch, pain and time course to the clinician",
      "Avoid douching or antiseptic vaginal washes",
      "Follow instructions for swab collection and medication use before testing"
    ],
    "urgent": "Prompt medical assessment for fever, significant pelvic pain, pregnancy, or foul discharge with bleeding.",
    "faq": [
      {
        "q": "Does a fishy smell mean an STD?",
        "a": "Not necessarily. Bacterial vaginosis is a common cause and is not simply an STI diagnosis."
      },
      {
        "q": "Is thick white discharge always yeast?",
        "a": "No. Vaginal symptoms overlap and sometimes require examination and laboratory testing."
      },
      {
        "q": "Can I use a urine sample for every vaginal infection?",
        "a": "No. A vaginal swab is often preferred for diagnosis of vaginitis and urogenital chlamydia/gonorrhea in women."
      }
    ],
    "queries": [
      "fishy smell after sex",
      "bad vagina smell after intercourse",
      "green vaginal discharge after sex",
      "yellow discharge private part",
      "white cottage cheese discharge itchy",
      "vaginal smell after condom break",
      "watery vaginal discharge fishy odor",
      "vaginal infection test bangalore",
      "smelly private part after sex female",
      "thick white discharge yeast or std",
      "burning vaginal discharge after sex"
    ],
    "references": [
      "cdc-vaginal",
      "cdc-urethritis"
    ]
  },
  {
    "slug": "genital-blisters",
    "title": "Painful Genital Blisters: Herpes or Another Cause?",
    "seoTitle": "Genital Blisters After Sex: HSV PCR & Causes | QXL",
    "description": "Painful blisters on the penis, vulva or genital skin may require examination and HSV lesion PCR. Learn about the right tests and timing.",
    "overview": "Painful fluid-filled blisters, clusters of small sores or new ulcers can be caused by herpes simplex infection, but other skin conditions are possible. A fresh active lesion is usually the preferred site for HSV molecular testing. Examination also helps identify conditions needing a different approach.",
    "causes": [
      "Herpes simplex virus type 1 or 2",
      "Friction blisters or contact irritation",
      "Other infectious or inflammatory skin conditions",
      "Syphilis or another ulcer cause when an ulcer is present"
    ],
    "tests": [
      "HSV-1/2 NAAT/PCR from a fresh active lesion when clinically indicated and available",
      "Syphilis serology when ulcer characteristics or exposure suggest it",
      "HIV screening based on exposure history and appropriate window period"
    ],
    "nextsteps": [
      "Arrange clinical assessment while lesions are active",
      "Do not puncture or squeeze blisters",
      "Avoid sexual contact while active ulcers are being evaluated"
    ],
    "urgent": "Urgent evaluation if severe pain, difficulty urinating, spreading rash, pregnancy, immunosuppression or eye involvement.",
    "faq": [
      {
        "q": "Are all genital blisters herpes?",
        "a": "No. Several conditions can mimic herpes; a clinician examines the lesion and may request an HSV swab."
      },
      {
        "q": "Is HSV blood IgG better than PCR for a new blister?",
        "a": "For a new active lesion, HSV NAAT/PCR from the lesion is generally preferred. Blood tests cannot establish that a particular sore is caused by HSV."
      },
      {
        "q": "Should I test for HSV IgM?",
        "a": "CDC does not recommend HSV IgM testing."
      }
    ],
    "queries": [
      "painful blister on penis",
      "genital blisters after sex",
      "water blisters on private parts",
      "blister on vaginal lip hurts",
      "small grouped blisters down there",
      "herpes or friction blister after sex",
      "blister on penis tip after oral sex",
      "genital blister test near me",
      "tiny blisters genital area painful",
      "red blister on private part after sex"
    ],
    "references": [
      "cdc-herpes",
      "cdc-ulcers"
    ]
  },
  {
    "slug": "genital-boils-bumps",
    "title": "Boils, Pimples and Bumps on Private Parts",
    "seoTitle": "Boil or Bump on Private Part: STI or Ingrown Hair? | QXL",
    "description": "A painful boil, pimple, lump or bump near the genitals can be an ingrown hair, skin infection or STI. Learn when an examination or test is needed.",
    "overview": "A lump in the pubic region, groin, penile skin or vulva can result from a blocked follicle, an ingrown hair, cyst, abscess, wart or an STI. Appearance, growth and location guide the examination. Not every bump needs an STD panel.",
    "causes": [
      "Folliculitis or ingrown hair after shaving",
      "Skin cyst, boil or bacterial abscess",
      "Genital warts or molluscum in selected cases",
      "HSV lesions if grouped painful vesicles or ulcers are present"
    ],
    "tests": [
      "Clinical skin examination before choosing laboratory tests",
      "Swab/culture of drained material only if clinically indicated",
      "HSV lesion PCR when active vesicles or ulcers suggest herpes",
      "Syphilis testing if an ulcer or compatible exposure is present"
    ],
    "nextsteps": [
      "Do not squeeze, cut or pop a genital boil",
      "Avoid shaving over an inflamed lesion",
      "Arrange assessment if the lump enlarges or is recurrent"
    ],
    "urgent": "Urgent assessment for fever, rapidly spreading redness, severe pain, extensive swelling or a painful perineal abscess.",
    "faq": [
      {
        "q": "Can an ingrown hair look like herpes?",
        "a": "Yes. Skin lesions can overlap. Examination and, where appropriate, a lesion swab distinguish causes."
      },
      {
        "q": "Does every genital pimple need an STD test?",
        "a": "No. Test choice depends on the lesion and sexual exposure, not the presence of a bump alone."
      },
      {
        "q": "Can I swab an old scar for herpes PCR?",
        "a": "A scar without an active lesion usually provides little diagnostic value for HSV PCR."
      }
    ],
    "queries": [
      "boil on penis after sex",
      "boil near vagina opening",
      "pimple on private part male",
      "ingrown hair or herpes genital",
      "genital bump after shaving hurts",
      "puss boil groin after intercourse",
      "private part lump painful",
      "red bump on foreskin",
      "boil on vaginal lips after sex",
      "painful boil between legs private part",
      "pimple private part std or not"
    ],
    "references": [
      "cdc-ulcers",
      "cdc-herpes"
    ]
  },
  {
    "slug": "genital-ulcers-sores",
    "title": "Genital Sores and Ulcers: When to Test",
    "seoTitle": "Painless or Painful Genital Sore: Syphilis & HSV | QXL",
    "description": "A painless genital ulcer or painful sore needs clinical evaluation. Learn about syphilis serology, HSV lesion PCR and appropriate timing.",
    "overview": "A genital or anal ulcer may be painful or painless. Syphilis and herpes are important causes, but a visual guess is unreliable; irritation, trauma and other conditions can also ulcerate. Early evaluation is particularly important for syphilis and new herpes lesions.",
    "causes": [
      "Primary syphilis, often described as a painless chancre",
      "Genital herpes, sometimes causing painful clustered sores",
      "Traumatic, inflammatory or other infectious ulcers",
      "Less-common ulcer causes requiring clinician evaluation"
    ],
    "tests": [
      "Syphilis treponemal and non-treponemal serology, with repeat testing if early and clinically suspected",
      "HSV-1/2 NAAT/PCR from an active lesion",
      "HIV screening and exposure-related tests as indicated"
    ],
    "nextsteps": [
      "Seek examination promptly rather than waiting for a sore to resolve",
      "Discuss previous syphilis treatment and any recent exposure",
      "Avoid sexual contact until medically assessed and appropriately managed"
    ],
    "urgent": "Seek urgent care for severe pain, fever, pregnancy, rapidly worsening lesions or inability to pass urine.",
    "faq": [
      {
        "q": "Does a painless sore mean syphilis?",
        "a": "Syphilis is one possible cause, but examination and appropriate tests are needed."
      },
      {
        "q": "Can VDRL be negative with a new syphilis sore?",
        "a": "Yes. Early infection may precede seroconversion; a clinician may arrange repeat or additional testing."
      },
      {
        "q": "Is an HSV blood test enough to diagnose a current sore?",
        "a": "No. When an active suspicious lesion is available, lesion NAAT/PCR is preferred for diagnosis."
      }
    ],
    "queries": [
      "painless sore on penis",
      "painless ulcer vagina after sex",
      "genital wound that does not hurt",
      "painful sore private part",
      "ulcer on foreskin after sex",
      "syphilis chancre test bangalore",
      "genital sore red spot hurts",
      "open wound genital region",
      "private part ulcer from std",
      "penis sore with no pain",
      "vagina sore after unprotected sex"
    ],
    "references": [
      "cdc-ulcers",
      "cdc-syphilis",
      "cdc-herpes"
    ]
  },
  {
    "slug": "genital-rash-spots-marks",
    "title": "Red Spots, Dark Marks, Scars and Rashes on Genitals",
    "seoTitle": "Genital Rash, Red Spots or Dark Marks After Sex | QXL",
    "description": "Not every genital mark or rash is an STI. Learn about friction, fungal skin disease, dermatitis, syphilis and when tests are useful.",
    "overview": "Genital skin can develop red spots, scaling, discoloration, dark marks or scars from irritation, skin infections, inflammation and healed lesions. A mark alone does not identify HIV, syphilis or herpes. The history and appearance matter more than a broad blood-test panel.",
    "causes": [
      "Post-inflammatory pigmentation or healing after a scratch or previous boil",
      "Contact dermatitis or friction rash",
      "Fungal groin infections, eczema or other dermatologic disorders",
      "STIs including syphilis when other findings or exposure support concern"
    ],
    "tests": [
      "Clinical skin examination with dermatology referral when appropriate",
      "Fungal microscopy or other lesion-specific testing if indicated",
      "Syphilis serology where the rash is compatible and history supports it",
      "HSV lesion PCR only if a fresh suspicious lesion is present"
    ],
    "nextsteps": [
      "Avoid applying steroid-mixed creams without clinical advice",
      "Photograph changing lesions privately for the treating clinician if useful",
      "Seek examination for persistent, spreading or unusual marks"
    ],
    "urgent": "Prompt evaluation for rapidly spreading rash, mucosal blisters, fever or widespread painful skin changes.",
    "faq": [
      {
        "q": "Can a black spot on the penis be an STI?",
        "a": "It may represent pigmentation, healed inflammation or another lesion; an examination is required to assess it."
      },
      {
        "q": "Can a scar prove I had herpes?",
        "a": "No. Scars and marks are not diagnostic of HSV."
      },
      {
        "q": "Should I order a full STD panel for a rash?",
        "a": "Not automatically. Evaluation should be guided by the rash, history and potential exposures."
      }
    ],
    "queries": [
      "black mark on penis after sex",
      "red dots on penis head",
      "dark spot on vagina lips",
      "scar on private part hurts",
      "genital rash after sex",
      "red patch on private part",
      "red marks around penis foreskin",
      "private part skin peeling after intercourse",
      "penis skin discoloration std",
      "painful genital red mark",
      "rash between thighs fungal or std"
    ],
    "references": [
      "cdc-ulcers",
      "cdc-herpes"
    ]
  },
  {
    "slug": "pain-during-after-sex",
    "title": "Pain or Burning During and After Sex",
    "seoTitle": "Pain During or After Sex: Causes, Infection Tests | QXL",
    "description": "Pain, stinging or irritation during or after intercourse can have non-STI causes as well as infections. Learn when examination and testing are needed.",
    "overview": "Pain during intercourse (dyspareunia) or soreness afterward may arise from dryness, friction, pelvic-floor tension, skin irritation, infection or other medical conditions. Location, duration and accompanying discharge, urinary symptoms or bleeding guide evaluation.",
    "causes": [
      "Dryness, friction or minor tissue injury",
      "Vaginitis, cervicitis, urethritis or a urinary infection",
      "Pelvic floor disorders, vulvodynia or prostatitis in selected patients",
      "Pelvic inflammatory disease or other pelvic conditions when pain is deeper and persistent"
    ],
    "tests": [
      "Clinical genital or pelvic examination to localize symptoms",
      "Vaginal swab or NAAT tests when infection is suspected",
      "Urine testing for urinary symptoms",
      "Pregnancy evaluation and other tests when clinically indicated"
    ],
    "nextsteps": [
      "Describe whether pain is superficial or deep and whether there is bleeding",
      "Do not assume pain after sex proves an STI",
      "Seek gynecology or urology assessment for persistent pain"
    ],
    "urgent": "Immediate care for severe pelvic or abdominal pain, fainting, heavy bleeding or sudden severe testicular pain.",
    "faq": [
      {
        "q": "Does pain after sex mean I have gonorrhea?",
        "a": "No. Infection is only one possible cause."
      },
      {
        "q": "Should I take a full STI panel for pain alone?",
        "a": "A clinician should first assess the type of pain and exposure to choose suitable tests."
      },
      {
        "q": "Can dryness cause burning after sex?",
        "a": "Yes. Friction and dryness can cause irritation even without an infection."
      }
    ],
    "queries": [
      "pain in private part after sex",
      "burning vagina after intercourse",
      "sex hurts after condom",
      "penis pain after intercourse",
      "vaginal burning after sex no discharge",
      "pain at vagina opening during sex",
      "private part swelling after sex",
      "pelvic pain after unprotected sex",
      "pain in foreskin after intercourse",
      "dyspareunia infection tests"
    ],
    "references": [
      "cdc-vaginal",
      "cdc-urethritis"
    ]
  },
  {
    "slug": "lower-abdominal-pelvic-pain",
    "title": "Lower Abdominal or Pelvic Pain After Sex",
    "seoTitle": "Lower Abdominal Pain After Sex: When to Seek Care | QXL",
    "description": "Lower abdominal or pelvic pain after sex needs an assessment, especially with fever, bleeding or pregnancy possibility. Learn the role of STI tests.",
    "overview": "Pelvic or lower abdominal pain after sex has many causes, including urinary infections, gynecologic conditions and pelvic inflammatory disease (PID). Significant pain may require urgent clinical examination before laboratory booking.",
    "causes": [
      "Pelvic inflammatory disease associated with sexually transmitted pathogens in some patients",
      "Urinary infection or bladder-related discomfort",
      "Menstrual, ovarian or other gynecologic causes",
      "Pregnancy-related complications or gastrointestinal conditions"
    ],
    "tests": [
      "Urgent clinical examination when symptoms are significant",
      "Pregnancy testing where relevant",
      "Chlamydia/gonorrhea NAAT and other STI tests if clinically indicated",
      "Urinalysis/culture or additional clinical investigations as directed"
    ],
    "nextsteps": [
      "Do not delay assessment for severe pelvic pain just to obtain a package",
      "Record fever, bleeding, pregnancy possibility and whether the pain is one-sided",
      "Follow clinician directions for imaging or other evaluation when necessary"
    ],
    "urgent": "Emergency care for severe or one-sided pain, fainting, fever with significant pain, pregnancy possibility with pain or heavy bleeding.",
    "faq": [
      {
        "q": "Can an STI cause pelvic pain?",
        "a": "Yes. Untreated infections can contribute to PID, but many non-STI conditions can also cause pain."
      },
      {
        "q": "Is a blood STI panel enough for pelvic pain?",
        "a": "No. Examination and potentially imaging, pregnancy testing or site-specific swabs may be needed."
      },
      {
        "q": "What if pelvic pain starts immediately after sex?",
        "a": "Timing alone cannot establish the cause; severity and associated symptoms determine urgency."
      }
    ],
    "queries": [
      "lower stomach pain after sex female",
      "pelvic cramps after intercourse",
      "lower abdomen pain after unprotected sex",
      "deep pelvic pain sex std",
      "vagina pain and lower belly pain",
      "abdominal pain after rough sex",
      "pelvic infection test bangalore",
      "stomach cramps after sex and discharge",
      "one sided pelvic pain after sex"
    ],
    "references": [
      "cdc-urethritis",
      "cdc-vaginal"
    ]
  },
  {
    "slug": "testicular-pain-swelling",
    "title": "Testicle Pain or Swelling After Sex",
    "seoTitle": "Testicle Pain After Sex: Urgent Causes & STI Tests | QXL",
    "description": "Testicular pain can require emergency care, particularly when sudden or severe. Learn when chlamydia/gonorrhea NAAT may be used.",
    "overview": "Testicular or scrotal pain may be related to epididymitis, injury or other conditions. Sudden severe one-sided testicular pain can indicate testicular torsion, a medical emergency that must not be delayed for laboratory testing.",
    "causes": [
      "Testicular torsion, especially with sudden severe pain",
      "Epididymitis, which may involve STI or urinary organisms",
      "Trauma, strain or other scrotal causes",
      "Hernia or other conditions"
    ],
    "tests": [
      "Immediate clinical examination; urgent imaging may be needed",
      "Chlamydia/gonorrhea NAAT when STI-related epididymitis is suspected",
      "Urinalysis/culture where a urinary cause is suspected"
    ],
    "nextsteps": [
      "Do not self-triage sudden testicular pain using a web questionnaire",
      "Arrange same-day medical care for new testicular swelling or pain",
      "Explain fever, urinary symptoms, injuries and recent sexual exposure"
    ],
    "urgent": "Sudden severe testicular pain, nausea/vomiting with scrotal pain, a high-riding testicle or rapidly increasing swelling: go to emergency care immediately.",
    "faq": [
      {
        "q": "Does testicular pain after sex mean chlamydia?",
        "a": "Not necessarily. An examination is required and sudden severe pain may be a surgical emergency."
      },
      {
        "q": "Should I collect urine before emergency treatment?",
        "a": "No. Emergency evaluation must take priority over specimen collection."
      },
      {
        "q": "What STI test can help if epididymitis is suspected?",
        "a": "A clinician may request chlamydia/gonorrhea NAAT, in addition to other evaluation."
      }
    ],
    "queries": [
      "testicle pain after sex",
      "left ball pain after intercourse",
      "swollen testicle after sex",
      "groin pain scrotum after unprotected sex",
      "pain in right testicle sudden",
      "testicular discomfort and burning urine",
      "testicle infection std test",
      "pain in balls after ejaculation"
    ],
    "references": [
      "cdc-urethritis"
    ]
  },
  {
    "slug": "mouth-throat-after-oral-sex",
    "title": "Mouth Sores or Sore Throat After Oral Sex",
    "seoTitle": "Sore Throat or Mouth Blister After Oral Sex | QXL",
    "description": "Sore throat, oral blisters and mouth ulcers after oral sex may have many causes. Learn when a throat swab or lesion testing is appropriate.",
    "overview": "A sore throat or mouth ulcer after oral sex does not automatically imply HIV or another STI. Common respiratory infections, aphthous ulcers and irritation may be more likely; oral exposure can transmit some infections, including pharyngeal gonorrhea and HSV.",
    "causes": [
      "Ordinary viral sore throat or aphthous ulcer",
      "Pharyngeal gonorrhea after relevant oral exposure",
      "Oral HSV lesions in some cases",
      "Irritation, trauma or other oral conditions"
    ],
    "tests": [
      "Clinical oral/throat examination",
      "Pharyngeal gonorrhea NAAT and other assays only where site validated and indicated",
      "HSV lesion PCR for a suspicious fresh blister if available",
      "HIV/syphilis blood screening when exposure history and timing justify it"
    ],
    "nextsteps": [
      "Avoid assuming one sore throat identifies a specific STI",
      "Discuss the exposed anatomical site rather than ordering urine-only tests",
      "Seek care for a persistent or worsening oral lesion"
    ],
    "urgent": "Urgent assessment for difficulty swallowing or breathing, severe dehydration or spreading neck swelling.",
    "faq": [
      {
        "q": "Can a urine STI test find throat gonorrhea?",
        "a": "No. A suitable throat specimen is needed for a throat-only infection."
      },
      {
        "q": "Does a mouth ulcer mean HIV?",
        "a": "No. Mouth ulcers have many causes and are not diagnostic of HIV."
      },
      {
        "q": "Is oral sex risk the same for all STIs?",
        "a": "No. Routes and risks vary considerably by infection; testing should be individualized."
      }
    ],
    "queries": [
      "sore throat after oral sex",
      "mouth blister after oral sex",
      "white spot throat after giving oral",
      "tongue ulcer after kissing",
      "std sore throat oral exposure",
      "throat gonorrhea test bangalore",
      "mouth ulcer after unprotected oral sex",
      "herpes blister mouth after oral",
      "oral sex std test throat swab"
    ],
    "references": [
      "cdc-ulcers",
      "cdc-urethritis"
    ]
  },
  {
    "slug": "anal-itching-discharge-pain",
    "title": "Anal Itching, Discharge or Pain After Sex",
    "seoTitle": "Anal Pain, Itching or Discharge After Sex | QXL",
    "description": "Rectal pain, discharge, itching or bleeding may need a clinical examination and, after anal exposure, site-specific STI testing.",
    "overview": "Anal itching, burning, pain or discharge may be due to fissures, hemorrhoids, skin conditions or infections. Rectal chlamydia and gonorrhea can occur after anal exposure and may be asymptomatic. A urine-only test cannot exclude an infection confined to the rectum.",
    "causes": [
      "Anal fissure, hemorrhoids or local skin irritation",
      "Rectal gonorrhea or chlamydia following exposure",
      "HSV or other causes of painful perianal ulcers",
      "Proctitis from non-STI causes"
    ],
    "tests": [
      "Clinical anorectal examination",
      "Rectal chlamydia/gonorrhea NAAT when appropriate and validated",
      "HSV PCR if active ulcers/vesicles are present",
      "Other testing as directed by clinical findings"
    ],
    "nextsteps": [
      "Avoid inserting products or using harsh chemicals to treat symptoms yourself",
      "Discuss rectal exposure confidentially with the clinician",
      "Ask whether site-specific swab collection is available"
    ],
    "urgent": "Emergency assessment for severe rectal pain, heavy bleeding, fever or inability to pass stool with significant pain.",
    "faq": [
      {
        "q": "Can anal itching be a sexually transmitted infection?",
        "a": "Yes, sometimes, but skin conditions, hemorrhoids and fissures are also common causes."
      },
      {
        "q": "Is a urine STD test sufficient after anal sex?",
        "a": "No. Rectal NAAT may be required for rectal exposure."
      },
      {
        "q": "Do I need HIV testing for rectal pain?",
        "a": "HIV testing depends on exposure risk and timing, not rectal pain alone."
      }
    ],
    "queries": [
      "anal itching after anal sex",
      "rectal discharge after sex",
      "pain in anus after intercourse",
      "bleeding anus after sex",
      "anal std test near me",
      "rectal gonorrhea test bangalore",
      "itchy anus after condom break",
      "anal blister pain after sex",
      "rectal burning after unprotected sex"
    ],
    "references": [
      "cdc-urethritis",
      "cdc-ulcers"
    ]
  },
  {
    "slug": "bleeding-after-sex",
    "title": "Bleeding or Spotting After Sex: Causes and Tests",
    "seoTitle": "Bleeding After Sex: Causes, STI & Cervicitis Tests | QXL",
    "description": "Spotting or bleeding after intercourse can come from friction, cervical conditions, infections and other causes. Learn when urgent care is needed.",
    "overview": "Bleeding after sex (postcoital bleeding) may occur from minor friction, cervical inflammation, polyps or other conditions. Recurrent or unexplained bleeding should not be dismissed as an STI; clinical examination and, where appropriate, cervical assessment are important.",
    "causes": [
      "Friction or mucosal injury",
      "Cervicitis, which may be associated with chlamydia or gonorrhea",
      "Cervical polyps, ectropion or other gynecologic conditions",
      "Pregnancy-related bleeding or other urgent conditions"
    ],
    "tests": [
      "Gynecologic examination and age-appropriate cervical evaluation",
      "Chlamydia/gonorrhea NAAT when cervicitis or exposure suggests it",
      "Pregnancy testing where relevant",
      "Other investigations determined by the treating clinician"
    ],
    "nextsteps": [
      "Track whether bleeding is light spotting or heavy and whether it recurs",
      "Do not replace examination with a blanket STI panel",
      "Arrange gynecologic assessment for any unexplained recurrent bleeding"
    ],
    "urgent": "Urgent medical care for heavy bleeding, faintness, severe pain or bleeding with possible pregnancy.",
    "faq": [
      {
        "q": "Can chlamydia cause bleeding after sex?",
        "a": "Cervicitis associated with chlamydia can contribute to bleeding, but other causes need consideration."
      },
      {
        "q": "Is spotting after sex always dangerous?",
        "a": "It can have minor causes, but unexplained or recurrent bleeding warrants examination."
      },
      {
        "q": "Should I just book an STD panel?",
        "a": "A clinical assessment may be more important initially, especially for recurring bleeding."
      }
    ],
    "queries": [
      "spotting after sex std",
      "blood after intercourse female",
      "bleeding after unprotected sex",
      "post coital bleeding infection",
      "brown discharge after sex",
      "vaginal spotting after rough sex",
      "bleeding after sex with pelvic pain",
      "blood on tissue after sex"
    ],
    "references": [
      "cdc-urethritis",
      "cdc-vaginal"
    ]
  },
  {
    "slug": "urine-frequency-after-sex",
    "title": "Frequent Urination and Bladder Discomfort After Sex",
    "seoTitle": "Frequent Urination After Sex: UTI or STI? | QXL",
    "description": "Frequent urination, urgency or bladder discomfort after sex may suggest UTI or irritation. Learn when a midstream urine culture or STI NAAT helps.",
    "overview": "Needing to pass urine repeatedly after sex is often evaluated for a urinary tract infection, but other urinary conditions and STIs can overlap. Symptom pattern, urinalysis and exposure history help determine testing.",
    "causes": [
      "Bacterial urinary tract infection",
      "Bladder sensitivity, irritation or other urinary conditions",
      "Urethritis from chlamydia or gonorrhea in some presentations",
      "Noninfectious causes including fluids or caffeine"
    ],
    "tests": [
      "Urinalysis and urine culture from an appropriate midstream specimen",
      "Chlamydia/gonorrhea NAAT when sexual exposure or urethritis is suspected",
      "Clinical examination when symptoms are persistent or recurrent"
    ],
    "nextsteps": [
      "Do not confuse UTI midstream collection with first-catch STI NAAT",
      "Seek assessment for recurrent symptoms instead of repeated empiric antibiotics",
      "Mention fever, flank pain and pregnancy possibility"
    ],
    "urgent": "Prompt medical evaluation for fever, flank pain, vomiting, blood in urine with significant symptoms, or pregnancy.",
    "faq": [
      {
        "q": "Is peeing frequently after sex an STD?",
        "a": "Not necessarily. A UTI or urinary irritation may be more relevant."
      },
      {
        "q": "What urine test should I book?",
        "a": "UTI investigation generally uses clean-catch midstream urine, while urethral STI NAAT uses first-catch urine in men."
      },
      {
        "q": "Can both tests be needed?",
        "a": "Yes, depending on symptoms and sexual exposure."
      }
    ],
    "queries": [
      "urinating every few minutes after sex",
      "frequent urination after intercourse",
      "uti after sex women",
      "pee urgency after unprotected sex",
      "bladder pain after sex",
      "urine infection or std after sex",
      "pressure bladder after sex",
      "frequent urination after sex without pain"
    ],
    "references": [
      "cdc-urethritis"
    ]
  },
  {
    "slug": "genital-warts-skin-tags",
    "title": "Genital Warts, Skin Tags and New Growths",
    "seoTitle": "Genital Warts or Skin Tag: Causes & Examination | QXL",
    "description": "A fleshy growth or wart on the genital skin may not be a herpes blister. Learn the role of examination and when additional STI tests are appropriate.",
    "overview": "Raised fleshy genital bumps may be HPV-related warts, benign skin tags, molluscum or other dermatologic conditions. A clinician usually identifies typical genital warts through examination. Routine blood or urine HPV testing does not diagnose a genital wart.",
    "causes": [
      "HPV-related genital warts",
      "Benign skin tags or sebaceous glands",
      "Molluscum contagiosum or follicular conditions",
      "Other growths requiring dermatoscopic or biopsy assessment"
    ],
    "tests": [
      "Visual clinical examination is primary",
      "Biopsy is considered for atypical, pigmented, bleeding or nonhealing lesions",
      "Other STI tests only when separately indicated by exposure history"
    ],
    "nextsteps": [
      "Do not cut, burn or use over-the-counter hand-wart medicines on genital tissue",
      "Arrange examination for a persistent or growing lesion",
      "Discuss HPV vaccination and prevention with a clinician"
    ],
    "urgent": "Prompt assessment for rapidly enlarging, bleeding, ulcerated or unusual pigmented growths.",
    "faq": [
      {
        "q": "Do genital warts mean I have herpes?",
        "a": "No. HPV warts and HSV blisters are different conditions."
      },
      {
        "q": "Can a blood test confirm genital warts?",
        "a": "Typically no. Diagnosis is usually clinical; some atypical lesions need biopsy."
      },
      {
        "q": "Does a genital wart mean I need ten STI tests?",
        "a": "Not automatically; screening depends on the wider clinical history."
      }
    ],
    "queries": [
      "genital wart or skin tag",
      "cauliflower bump on penis",
      "vaginal wart after sex",
      "small flesh colored bumps genital",
      "hpv wart test near me",
      "skin tag on private part",
      "painless bumps on penis shaft",
      "wart in pubic area std"
    ],
    "references": [
      "cdc-ulcers"
    ]
  },
  {
    "slug": "no-symptoms-after-unprotected-sex",
    "title": "No Symptoms After Unprotected Sex: Should I Test?",
    "seoTitle": "No Symptoms After Unprotected Sex: STI Test Guide | QXL",
    "description": "You can have an STI without symptoms. Learn about time-sensitive HIV PEP assessment and which blood, urine or swab tests may be relevant.",
    "overview": "Having no symptoms after an exposure does not prove that no infection occurred. Testing decisions depend on when the exposure happened, which sexual activities occurred, previous vaccination or testing, and use of PEP/PrEP. Immediate assessment may be more important than testing if HIV PEP could be needed.",
    "causes": [
      "Many bacterial STIs can be asymptomatic",
      "HIV and syphilis may not cause early recognizable symptoms",
      "Testing done too early can miss an infection",
      "Some exposures are low risk and do not warrant a broad panel"
    ],
    "tests": [
      "Urgent clinician assessment for HIV PEP within 72 hours of a potentially significant exposure",
      "HIV screening using the correct assay and detection window",
      "Chlamydia/gonorrhea NAAT at exposed sites when indicated",
      "Syphilis, HBV/HCV or pregnancy tests where risk indicates"
    ],
    "nextsteps": [
      "Record the exposure date and type privately for the clinician",
      "Do not wait for symptoms before seeking PEP assessment",
      "Follow a clinician-recommended test schedule instead of repeated daily testing"
    ],
    "urgent": "Within 72 hours of a potentially significant HIV exposure, seek immediate PEP medical assessment. Sexual assault also requires urgent compassionate medical care.",
    "faq": [
      {
        "q": "Can I have gonorrhea or chlamydia with no symptoms?",
        "a": "Yes. Asymptomatic infection is possible."
      },
      {
        "q": "Can HIV be detected the day after sex?",
        "a": "No. There is a period before tests can detect infection, and PEP assessment may be urgent."
      },
      {
        "q": "Is an STD panel needed after every kiss?",
        "a": "No. Testing should reflect actual transmission routes and risk."
      }
    ],
    "queries": [
      "no symptoms after unprotected sex should i test",
      "had sex without condom no symptoms std",
      "condom broke yesterday hiv test",
      "when to test for std after sex no symptoms",
      "one time unprotected sex std risk",
      "do i need sti test after oral sex",
      "hiv test 28 days negative reassurance",
      "std testing near me discreet bangalore",
      "safe after unprotected sex if no symptoms",
      "hiv pep near me bangalore"
    ],
    "references": [
      "cdc-hiv",
      "who-pep",
      "cdc-urethritis"
    ]
  }
];
export const symptomPath = (slug:string) => `/sexual-health/symptoms/${slug}`;
export const symptomIndexPath = "/sexual-health/symptoms";
export const packageDirectoryPath = "/sexual-health/packages";
export const symptomBySlug = (slug:string) => symptomPages.find(p=>p.slug===slug);
