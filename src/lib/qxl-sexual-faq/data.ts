// Original educational content. Publication requires clinician approval.
export type FAQ = {q:string;a:string};
export type FAQGroup = {title:string;source:string;faq:FAQ[]};
export const sourceUrls = {
  "hiv": "https://www.cdc.gov/hiv/testing/index.html",
  "pep": "https://www.who.int/india/publications/i/item/9789240095137",
  "urethritis": "https://www.cdc.gov/std/treatment-guidelines/urethritis-and-cervicitis.htm",
  "vaginal": "https://www.cdc.gov/std/treatment-guidelines/vaginal-discharge.htm",
  "herpes": "https://www.cdc.gov/std/treatment-guidelines/herpes.htm",
  "ulcers": "https://www.cdc.gov/std/treatment-guidelines/genital-ulcers.htm",
  "chlamydia": "https://www.cdc.gov/std/treatment-guidelines/chlamydia.htm",
  "screening": "https://www.cdc.gov/std/treatment-guidelines/screening-recommendations.htm",
  "syphilis": "https://www.cdc.gov/std/treatment-guidelines/p-and-s-syphilis.htm"
} as const;
export const faqGroups: FAQGroup[] = [
  {
    "title": "Immediate steps after sex or exposure",
    "source": "pep",
    "faq": [
      {
        "q": "The condom broke during sex yesterday. What should I do?",
        "a": "If HIV exposure is possible, seek urgent medical care to assess PEP; it is most effective as soon as possible and must be started no later than 72 hours. Also discuss pregnancy prevention and STI testing based on the exposure."
      },
      {
        "q": "Should I wait for an HIV test result before starting PEP?",
        "a": "No. An early negative result cannot exclude the new exposure. Seek urgent PEP assessment without delaying for a laboratory report."
      },
      {
        "q": "Can a test today rule out an infection from sex last night?",
        "a": "Usually not. Different infections have detection windows, so a baseline test does not rule out a new exposure. A clinician can make a follow-up plan."
      },
      {
        "q": "Does washing immediately after sex prevent an STI?",
        "a": "Washing cannot reliably prevent STI transmission or replace medical advice. Avoid irritating chemicals or douching."
      },
      {
        "q": "Can I self-prescribe antibiotics to prevent an STI?",
        "a": "Do not use leftover or unprescribed antibiotics. Treatment and any prophylaxis should be based on clinician assessment and applicable guidance."
      },
      {
        "q": "I have no symptoms after unprotected sex. Do I still need testing?",
        "a": "Some infections have no symptoms. A clinician can recommend site-specific tests and timing from the exposure history."
      },
      {
        "q": "What if an assault or nonconsensual exposure occurred?",
        "a": "Seek urgent emergency care for safety, compassionate support, evidence-preservation options and HIV PEP assessment where appropriate. Do not rely only on booking an online test."
      }
    ]
  },
  {
    "title": "HIV windows, screening and interpretation",
    "source": "hiv",
    "faq": [
      {
        "q": "How soon can an HIV blood test detect an infection?",
        "a": "A laboratory antigen/antibody test using venous blood usually detects HIV 18–45 days after exposure, without antiretroviral interference. Test type and timing matter."
      },
      {
        "q": "Can an HIV RNA test detect infection sooner?",
        "a": "HIV NAT can usually detect infection 10–33 days after exposure, but is not necessarily the routine first test for everyone. A clinician selects it when indicated."
      },
      {
        "q": "Is an HIV negative result at 14 days conclusive?",
        "a": "Not for standard laboratory antigen/antibody screening. It can be too early; follow the assay-specific window and clinical advice."
      },
      {
        "q": "Is a negative fourth-generation HIV test at 28 days definitive?",
        "a": "It is reassuring but remains within the commonly cited 18–45 day window. The next step depends on the assay and whether PEP, PrEP or newer exposures are relevant."
      },
      {
        "q": "Does everyone need to test at 90 days?",
        "a": "Not necessarily. The correct follow-up depends on the test type, timing, ongoing exposure and use of PEP or PrEP. Do not apply a universal 90-day rule to every case."
      },
      {
        "q": "Can symptoms alone show that I have HIV?",
        "a": "No. Symptoms of early HIV can resemble many illnesses. Diagnosis requires appropriate laboratory testing and a validated confirmation algorithm."
      },
      {
        "q": "Does one reactive fourth-generation screening result confirm HIV?",
        "a": "No. A reactive screening test requires additional testing under the applicable diagnostic algorithm, with counselling and confidentiality safeguards."
      },
      {
        "q": "Does PEP change when I should be tested?",
        "a": "It can affect HIV detectability and follow-up scheduling. The treating clinician should determine the Ag/Ab and NAT testing plan."
      },
      {
        "q": "Can a normal CBC confirm I do not have HIV?",
        "a": "No. CBC cannot establish or exclude HIV infection. Use an appropriate HIV-specific test."
      }
    ]
  },
  {
    "title": "PEP, PrEP and prevention",
    "source": "pep",
    "faq": [
      {
        "q": "What is HIV PEP?",
        "a": "PEP is a course of antiretroviral medication after a potentially significant HIV exposure, prescribed by a clinician to reduce infection risk."
      },
      {
        "q": "What is the maximum time to start HIV PEP?",
        "a": "WHO recommends starting as soon as possible, ideally within 24 hours, and no later than 72 hours after exposure."
      },
      {
        "q": "How long is a standard PEP course?",
        "a": "WHO recommends a 28-day course, prescribed and monitored by a qualified clinician."
      },
      {
        "q": "Is an STI test a substitute for PEP?",
        "a": "No. Testing does not prevent HIV infection. People within the PEP window need timely medical assessment."
      },
      {
        "q": "Is PrEP the same as PEP?",
        "a": "No. PrEP is preventive medication used before possible exposures as directed; PEP is used after a specific exposure. A clinician determines the appropriate pathway."
      },
      {
        "q": "Can I start PEP through a diagnostic laboratory alone?",
        "a": "PEP is a medical treatment, not a laboratory test. Contact an emergency department or qualified prescribing clinician for urgent assessment."
      }
    ]
  },
  {
    "title": "Discharge from penis or urethra",
    "source": "urethritis",
    "faq": [
      {
        "q": "Is clear fluid from the penis always an STI?",
        "a": "No. Pre-ejaculate during arousal can be normal. New discharge unrelated to arousal, particularly with burning, needs assessment."
      },
      {
        "q": "Can chlamydia cause discharge without pain?",
        "a": "Yes. Urethritis can have little discomfort or no obvious symptoms. NAAT testing may be indicated by exposure history."
      },
      {
        "q": "What if there is yellow or green discharge?",
        "a": "An infection such as urethritis is possible, but colour alone cannot identify the cause. Seek prompt medical assessment and site-appropriate testing."
      },
      {
        "q": "Can a routine urine culture find gonorrhea and chlamydia?",
        "a": "A standard urine culture is not an adequate substitute for CT/GC NAAT. The investigations use different methods and specimens."
      },
      {
        "q": "Can discharge appear right after sex from irritation?",
        "a": "Yes, friction or normal secretions can be mistaken for discharge. Persistent or spontaneous discharge requires assessment."
      },
      {
        "q": "Should I test for HIV because my penis is leaking fluid?",
        "a": "The urethral symptom does not diagnose HIV. HIV testing depends on exposure risks and routine screening recommendations."
      }
    ]
  },
  {
    "title": "Vaginal discharge, itching and odour",
    "source": "vaginal",
    "faq": [
      {
        "q": "Is watery discharge after intercourse always a sexually transmitted infection?",
        "a": "No. Semen, arousal fluid and usual vaginal secretions may cause leakage. Persistent change, itching, odour, pain or unusual colour merits assessment."
      },
      {
        "q": "What causes a fishy vaginal odour after sex?",
        "a": "Bacterial vaginosis is one possibility, but symptoms overlap with other infections and noninfectious causes. Testing should be clinician-directed."
      },
      {
        "q": "Does white thick discharge prove yeast infection?",
        "a": "No. Appearance is not fully reliable. Examination and appropriate microscopy or other tests can help distinguish causes."
      },
      {
        "q": "Can bacterial vaginosis be called a sexually transmitted disease?",
        "a": "BV is associated with changes in vaginal microbiota; it is not simply equivalent to an STI diagnosis."
      },
      {
        "q": "Can a normal urine test rule out vaginal infection?",
        "a": "No. Vaginal conditions commonly require evaluation of vaginal specimens, rather than a routine urine culture."
      },
      {
        "q": "Can irritation from a condom cause itching?",
        "a": "Yes. Latex, lubricant or friction can irritate skin. Persistent symptoms or relevant exposures may still require tests."
      },
      {
        "q": "Should I self-treat every vaginal itch as thrush?",
        "a": "No. Vaginal itching has multiple causes. Persistent or recurrent symptoms should be evaluated before repeating medicines."
      }
    ]
  },
  {
    "title": "Genital boils, pimples, marks and rashes",
    "source": "ulcers",
    "faq": [
      {
        "q": "Does a single genital boil mean herpes?",
        "a": "No. Folliculitis, an ingrown hair or a skin cyst can produce a bump. An examination is important if it is painful, recurrent or blister-like."
      },
      {
        "q": "Do black marks or old scars on private parts indicate an STI?",
        "a": "Usually a mark alone is not diagnostic. Pigmentation, healed inflammation and skin disorders are possible. A changing or painful lesion should be examined."
      },
      {
        "q": "Can shaving cause genital pimples?",
        "a": "Yes. Ingrown hairs and folliculitis can follow shaving. Avoid squeezing or scratching and seek care for spreading redness or fever."
      },
      {
        "q": "Are painful genital red spots always an STD?",
        "a": "No. Irritation, dermatitis, yeast infection, trauma and sexually transmitted infections can overlap in appearance."
      },
      {
        "q": "Can a genital rash be diagnosed with blood tests alone?",
        "a": "Not usually. A skin examination may be more useful; targeted samples or blood tests depend on the suspected cause."
      },
      {
        "q": "Is a nonhealing penile ulcer serious?",
        "a": "Yes. A persistent sore needs prompt clinical evaluation to assess infections and noninfectious causes, including malignancy."
      }
    ]
  },
  {
    "title": "Blisters, sores, HSV and syphilis",
    "source": "herpes",
    "faq": [
      {
        "q": "What test is preferred for fresh genital blisters?",
        "a": "Where clinically indicated, HSV-1/2 NAAT from an active lesion is generally preferred to routine blood antibody testing."
      },
      {
        "q": "Does a negative HSV lesion swab rule out herpes?",
        "a": "Not always. Test yield falls as lesions heal and HSV shedding is intermittent. Clinical history still matters."
      },
      {
        "q": "Should HSV IgM be ordered for a genital sore?",
        "a": "No. CDC does not recommend HSV IgM testing."
      },
      {
        "q": "Can a painless genital sore be syphilis?",
        "a": "Yes, but it can have other causes. Prompt examination and syphilis serology with appropriate follow-up are important."
      },
      {
        "q": "Can herpes and syphilis look alike?",
        "a": "Yes. The appearance of ulcers can overlap and both conditions can occur together; diagnosis should not rely only on photos or symptoms."
      },
      {
        "q": "Is a herpes blood test appropriate for everyone with no symptoms?",
        "a": "Routine screening of asymptomatic general populations with HSV-2 serology is not recommended. Discuss selected circumstances with a clinician."
      },
      {
        "q": "Are all genital ulcers sexually transmitted?",
        "a": "No. Trauma, inflammatory skin conditions and other infections are possible. Clinical examination and selected tests help distinguish causes."
      }
    ]
  },
  {
    "title": "Chlamydia, gonorrhea and NAAT samples",
    "source": "chlamydia",
    "faq": [
      {
        "q": "What is a CT/GC NAAT?",
        "a": "It is a nucleic acid amplification test to detect Chlamydia trachomatis and Neisseria gonorrhoeae in an appropriate specimen."
      },
      {
        "q": "Which urine sample is preferred for urethral chlamydia in men?",
        "a": "First-catch urine is commonly used for urethral CT NAAT in men. Follow the specific assay and laboratory collection instructions."
      },
      {
        "q": "Is a vaginal swab better than urine for chlamydia in women?",
        "a": "For urogenital chlamydia NAAT screening, vaginal swabs are generally the optimal specimen in women."
      },
      {
        "q": "Can urine CT/GC NAAT exclude gonorrhea in the throat?",
        "a": "No. A negative urine test does not exclude infection limited to the throat or rectum."
      },
      {
        "q": "Does a blood sample diagnose uncomplicated genital chlamydia?",
        "a": "Generally no. Diagnosis commonly uses urine or swab NAAT, rather than a routine chlamydia blood antibody test."
      },
      {
        "q": "Can chlamydia or gonorrhea be silent?",
        "a": "Yes. Infection can occur without symptoms. Exposure history and screening recommendations determine testing."
      },
      {
        "q": "Do negative results exclude infection if collected very soon after exposure?",
        "a": "Not always. Testing too early, wrong anatomical site or unsuitable specimen can reduce useful reassurance. A clinician can plan repeat testing."
      }
    ]
  },
  {
    "title": "Syphilis and VDRL/RPR",
    "source": "syphilis",
    "faq": [
      {
        "q": "Is VDRL or RPR alone enough to diagnose syphilis?",
        "a": "Usually not. Syphilis evaluation uses both a non-treponemal and treponemal test, with an appropriate diagnostic algorithm."
      },
      {
        "q": "Why may a VDRL test be negative with a new sore?",
        "a": "Very early syphilis can precede detectable serologic response. Clinical assessment and a repeat schedule may be needed."
      },
      {
        "q": "Can a positive TPHA stay positive after treatment?",
        "a": "Treponemal tests often remain reactive after treatment, so interpretation requires treatment history and non-treponemal titres."
      },
      {
        "q": "Can RPR become falsely positive?",
        "a": "Yes. Non-treponemal tests can have biological false-positive reactions; clinical context and treponemal testing matter."
      },
      {
        "q": "Can syphilis cause a painless genital ulcer?",
        "a": "Yes. A painless chancre is a possible early manifestation, but not every genital ulcer is syphilis."
      },
      {
        "q": "Should my sexual partner be assessed if I have syphilis?",
        "a": "Yes. Partner evaluation and public health follow-up are important and should be coordinated by a treating clinician."
      }
    ]
  },
  {
    "title": "UTI versus STI and urine collection",
    "source": "urethritis",
    "faq": [
      {
        "q": "Can burning urination after sex be a UTI or an STI?",
        "a": "Yes. Symptoms can overlap. Testing may include a urine routine/culture for UTI and separate first-catch urine NAAT for STI."
      },
      {
        "q": "Is first-catch urine the same as midstream urine?",
        "a": "No. First-catch urine and clean-catch midstream urine are different collections used for different clinical questions."
      },
      {
        "q": "Can I collect one urine container for both UTI culture and CT/GC NAAT?",
        "a": "Do not assume so. Ask the laboratory for separate validated collection instructions and tubes/containers."
      },
      {
        "q": "Do I need antibiotics immediately if I urinate frequently?",
        "a": "Not necessarily; causes vary. Seek a clinician for diagnosis, especially with fever, blood in urine, flank pain or pregnancy."
      },
      {
        "q": "Can a sexually transmitted infection occur with a negative urine culture?",
        "a": "Yes. A routine bacterial urine culture is not the same as an STI NAAT."
      },
      {
        "q": "When is frequent urination an emergency?",
        "a": "Urgent care is needed for urinary retention, systemic illness, severe flank pain, significant bleeding or other red flags."
      }
    ]
  },
  {
    "title": "Throat, mouth and rectal STI questions",
    "source": "chlamydia",
    "faq": [
      {
        "q": "Can oral sex transmit gonorrhea?",
        "a": "Yes. Anatomic exposure matters; a throat swab NAAT may be indicated after receptive oral exposure where validated."
      },
      {
        "q": "Can a urine test check for throat STIs?",
        "a": "No. A urine sample cannot reliably detect an infection confined to the throat."
      },
      {
        "q": "Is every sore throat after oral sex a sexually transmitted infection?",
        "a": "No. Common viral respiratory illness and irritation are alternatives. Evaluate persistent symptoms or relevant exposure."
      },
      {
        "q": "Can anal itching after sex indicate a rectal STI?",
        "a": "It can, but hemorrhoids, irritation, skin disorders and other causes are possible. Examination guides testing."
      },
      {
        "q": "When is a rectal NAAT considered?",
        "a": "When the anatomical exposure and clinical assessment indicate possible rectal chlamydia or gonorrhea, using an assay validated for that specimen."
      },
      {
        "q": "Can a genital HIV blood test tell me whether I have throat gonorrhea?",
        "a": "No. Blood HIV screening and throat gonorrhea NAAT are different tests for different organisms."
      }
    ]
  },
  {
    "title": "Pelvic, testicular, bleeding and urgent signs",
    "source": "urethritis",
    "faq": [
      {
        "q": "Is sudden severe pain in one testicle an emergency?",
        "a": "Yes. Sudden severe one-sided testicular pain can signal torsion and requires immediate emergency assessment; do not delay for lab tests."
      },
      {
        "q": "What if pelvic pain and fever develop after sex?",
        "a": "Seek urgent clinical assessment for pelvic inflammatory disease or other urgent causes. Laboratory tests may support but not replace evaluation."
      },
      {
        "q": "Does bleeding after sex always indicate an STI?",
        "a": "No. Cervical, vaginal, hormonal, pregnancy-related and other causes are possible. Recurrent bleeding needs clinical examination."
      },
      {
        "q": "I have missed a period and one-sided pelvic pain after sex. What should I do?",
        "a": "Seek urgent evaluation to exclude ectopic pregnancy and other emergencies; a booking for routine STI blood tests alone is insufficient."
      },
      {
        "q": "What if I have painful genital swelling with fever?",
        "a": "Prompt medical assessment is needed for possible infection, abscess or another urgent condition."
      },
      {
        "q": "Is severe pain during intercourse something I should ignore?",
        "a": "No. Persistent or severe pain merits medical evaluation, and testing depends on findings rather than a default full STI panel."
      }
    ]
  },
  {
    "title": "Packages, prices and test methodology",
    "source": "screening",
    "faq": [
      {
        "q": "Does a comprehensive STI package test for every infection?",
        "a": "No. Package names are not standardized. Read the exact organism, assay, specimen and limitations list before booking."
      },
      {
        "q": "Is HIV screening the same as confirmatory HIV testing?",
        "a": "No. Screening identifies potentially reactive samples; diagnostic confirmation uses the applicable algorithm."
      },
      {
        "q": "Do I need all 10 STI packages?",
        "a": "No. Select investigations according to symptoms, exposure, screening recommendations and clinician advice."
      },
      {
        "q": "Is fasting required for the common STI tests?",
        "a": "Fasting is generally not required for standard HIV, syphilis and CT/GC tests, but follow test-specific collection instructions."
      },
      {
        "q": "Can every STI test use a home-collected blood sample?",
        "a": "No. Some investigations require first-catch urine or appropriately collected swabs; QXL must confirm home-collection suitability for each test."
      },
      {
        "q": "How much does a full STD test cost in Bangalore?",
        "a": "Prices vary by actual included tests and collection method. Check the current QXL package directory for verified rates rather than a generic estimate."
      },
      {
        "q": "Can a urine STI PCR replace a genital lesion swab?",
        "a": "Not for all suspected infections. For example, active genital herpes is usually evaluated using an appropriate lesion specimen."
      }
    ]
  },
  {
    "title": "Privacy, consent and results access",
    "source": "screening",
    "faq": [
      {
        "q": "Can I ask about STI testing without sharing intimate photos?",
        "a": "Yes. Describe symptoms in words or request a private clinical consultation. Avoid uploading identifiable intimate images in public or unsecured forms."
      },
      {
        "q": "Is a laboratory result automatically anonymous?",
        "a": "No. Laboratory accessioning generally needs patient identity and specimen traceability. Ask QXL about actual confidentiality and report-access controls."
      },
      {
        "q": "Will my STI result be sent by WhatsApp?",
        "a": "Confirm QXL’s secure report-delivery options before booking and choose a communication channel you are comfortable with. Do not assume ordinary chat is a secure clinical record."
      },
      {
        "q": "Can another person access my report?",
        "a": "Report access should follow verified identity and authorization controls. Ask about patient portal and consent mechanisms."
      },
      {
        "q": "Do I need counselling for an HIV test?",
        "a": "India has specific HIV testing consent, counselling and diagnostic pathways. QXL should follow its approved HIV testing SOP and refer appropriately."
      },
      {
        "q": "Can QXL promise absolute 100% privacy?",
        "a": "Absolute guarantees are inappropriate. The website should describe implemented access controls, consent, disclosure and retention policies accurately."
      }
    ]
  },
  {
    "title": "Partners, pregnancy and repeated tests",
    "source": "screening",
    "faq": [
      {
        "q": "If my partner has an STI, should I get tested without symptoms?",
        "a": "Often yes, but timing, examination, treatment and partner management depend on the organism. Seek clinical advice."
      },
      {
        "q": "If I completed treatment for an STI, do I need a follow-up test?",
        "a": "Some infections require test-of-cure in particular circumstances and others need retesting for reinfection. Follow clinician guidance rather than repeat a panel daily."
      },
      {
        "q": "Can STI testing be done during pregnancy?",
        "a": "Many recommended tests are performed during pregnancy, but pregnancy changes assessment, follow-up and treatment choices. Consult obstetric care."
      },
      {
        "q": "Is a negative test enough if a partner remains untreated?",
        "a": "No. Reinfection can occur after renewed exposure. Partner evaluation and treatment are important for certain STIs."
      },
      {
        "q": "Does a history of STI mean I will always test positive?",
        "a": "It depends on the test. Some antibody tests, including treponemal syphilis tests, may remain reactive after treatment; other pathogen tests behave differently."
      },
      {
        "q": "Can an AI symptom checker tell me for sure which STD I have?",
        "a": "No. AI answers cannot examine lesions, assess specimen quality or establish diagnoses. Use them to learn about options and seek qualified clinical care."
      }
    ]
  }
];
