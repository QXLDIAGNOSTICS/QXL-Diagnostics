import type { KnPageData } from "./types";
import { KN, callBtn, waBtn } from "./common";

const SELF = "ನೀವೇ ಕೋರಿ ಮಾಡಿಸಬಹುದು";
const CONSULT = "ವೈದ್ಯರ ಸಲಹೆ ಪಡೆಯುವುದು ಸೂಕ್ತ";
const DOCTOR = "ವೈದ್ಯರ ನಿರ್ದೇಶನದಂತೆ ಮಾತ್ರ";

/** [title, guidance, key-component count, when useful, includes] */
const PANELS: [string, string, number, string, string][] = [
  ["ರಕ್ತಹೀನತೆ ಮೌಲ್ಯಮಾಪನ ಪ್ರೊಫೈಲ್ (Anemia Evaluation Profile)", SELF, 7, "ಆಯಾಸ, ಬಿಳಿಚಿಕೊಳ್ಳುವಿಕೆ, ಕಡಿಮೆ ಹಿಮೋಗ್ಲೋಬಿನ್ ಅಥವಾ ಪೋಷಕಾಂಶ ಕೊರತೆಯ ಶಂಕೆ", "ಸಂಪೂರ್ಣ ರಕ್ತ ಕಣ ಎಣಿಕೆ (CBC), Ferritin, Serum iron, TIBC ಮತ್ತು transferrin saturation, Reticulocyte count, Vitamin B12, Serum folate, ಉರಿಯೂತದ ಶಂಕೆ ಇದ್ದಾಗ CRP/ESR"],
  ["ಉರಿಯೂತದ ಸಂಧಿವಾತ ಮೌಲ್ಯಮಾಪನ (Inflammatory Arthritis Evaluation)", CONSULT, 8, "ನಿರಂತರ ಉರಿಯೂತದ ಕೀಲು ನೋವು, ಊತ ಅಥವಾ ಬಿಗಿತ", "CBC, ESR ಮತ್ತು CRP, Rheumatoid factor, Anti-CCP, ಅಗತ್ಯಾನುಸಾರ ರಿಫ್ಲೆಕ್ಸ್ ಪರೀಕ್ಷೆಯೊಂದಿಗೆ ANA, Uric acid, ವೈದ್ಯಕೀಯವಾಗಿ ಸೂಕ್ತವಾದಾಗ HLA-B27, ಮೂತ್ರಪಿಂಡ ಮತ್ತು ಯಕೃತ್ ಮೂಲ ಪರೀಕ್ಷೆಗಳು"],
  ["ಆರಂಭಿಕ ಗರ್ಭಿಣಿ (ಆಂಟಿನೇಟಲ್) ಪ್ರಯೋಗಾಲಯ ಪ್ರೊಫೈಲ್ (Initial Antenatal Laboratory Profile)", DOCTOR, 7, "ಗರ್ಭಾವಸ್ಥೆಯ ಆರಂಭಿಕ ಪ್ರಯೋಗಾಲಯ ಮೌಲ್ಯಮಾಪನ", "CBC, ABO/Rh ರಕ್ತದ ಗುಂಪು ಮತ್ತು ಪ್ರತಿಕಾಯ ತಪಾಸಣೆ, ಮೂತ್ರ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಮೂತ್ರ ಕಲ್ಚರ್, ಗ್ಲೂಕೋಸ್ ಮೌಲ್ಯಮಾಪನ, HIV, ಹೆಪಟೈಟಿಸ್ B/C ಮತ್ತು ಸಿಫಿಲಿಸ್ ತಪಾಸಣೆ, Rubella IgG, ಅಪಾಯ/ಶಿಷ್ಟಾಚಾರಕ್ಕೆ ಅನುಗುಣವಾಗಿ TSH ಮತ್ತು STI NAAT"],
  ["ಸಮಗ್ರ ಕಬ್ಬಿಣಾಂಶ ಪರೀಕ್ಷೆಗಳು (Comprehensive Iron Studies)", SELF, 6, "ಕಬ್ಬಿಣಾಂಶ ಕೊರತೆ ಅಥವಾ ಅತಿಯಾದ ಸಂಗ್ರಹದ ಶಂಕೆ, ಅಥವಾ ಚಿಕಿತ್ಸೆಯ ಮೇಲ್ವಿಚಾರಣೆ", "Serum iron, Ferritin, TIBC ಅಥವಾ transferrin, UIBC, ಲೆಕ್ಕಾಚಾರದ transferrin saturation, ಉರಿಯೂತದಿಂದ ferritin ಪ್ರಭಾವಿತವಾಗುವ ಸಾಧ್ಯತೆ ಇದ್ದಾಗ CRP"],
  ["ಆಂಡ್ರೋಜನ್ ಮೌಲ್ಯಮಾಪನ ಪ್ರೊಫೈಲ್ (Androgen Evaluation Profile)", CONSULT, 7, "ಆಂಡ್ರೋಜನ್ ಅಧಿಕ/ಕೊರತೆಯ ಲಕ್ಷಣಗಳು ಅಥವಾ ಸಂತಾನೋತ್ಪತ್ತಿ ಸಂಬಂಧಿ ಕಾಳಜಿಗಳು", "Total testosterone, SHBG ಮತ್ತು albumin, ಲೆಕ್ಕಾಚಾರದ free testosterone, DHEA-S, Androstenedione, ಅಗತ್ಯವಿದ್ದಾಗ DHT, ಅಗತ್ಯವಿದ್ದಾಗ 17-hydroxyprogesterone"],
  ["ಆಟೋಇಮ್ಯೂನ್ ಯಕೃತ್ ಕಾಯಿಲೆ ಮೌಲ್ಯಮಾಪನ (Autoimmune Liver Disease Evaluation)", DOCTOR, 7, "ಆಟೋಇಮ್ಯೂನ್ ಕಾಯಿಲೆಯ ಶಂಕೆಯೊಂದಿಗೆ ಅಸಹಜ ಯಕೃತ್ ಪರೀಕ್ಷೆಗಳು", "ಯಕೃತ್ ಕಾರ್ಯ ಪರೀಕ್ಷೆಗಳು: bilirubin, AST, ALT, ALP, GGT ಮತ್ತು proteins; Total IgG; ANA ಮತ್ತು smooth-muscle antibody; LKM-1 ಮತ್ತು SLA antibodies; Antimitochondrial antibody; ವೈರಲ್ ಕಾರಣಗಳನ್ನು ಹೊರತುಪಡಿಸಲು ಹೆಪಟೈಟಿಸ್ B/C ತಪಾಸಣೆ; ಅಗತ್ಯವಿದ್ದಾಗ IgG4 ಅಥವಾ ಚಯಾಪಚಯ ಪರೀಕ್ಷೆಗಳು"],
  ["ಅಡ್ರಿನಲ್ ಕೊರತೆ ಮೌಲ್ಯಮಾಪನ (Adrenal Insufficiency Evaluation)", DOCTOR, 7, "ಕಾರ್ಟಿಸಾಲ್ ಕೊರತೆಯ ಲಕ್ಷಣಗಳು ಅಥವಾ ವೈದ್ಯಕೀಯ ಶಂಕೆ", "ಬೆಳಿಗ್ಗೆ 8 ಗಂಟೆಯ cortisol ಜೊತೆಗೆ ACTH, Sodium ಮತ್ತು potassium, Glucose, Creatinine, ಅಗತ್ಯವಿದ್ದಾಗ Cosyntropin stimulation test, ಪ್ರಾಥಮಿಕ ಕಾಯಿಲೆಯ ಶಂಕೆ ಇದ್ದಾಗ Renin/aldosterone, ಅಗತ್ಯವಿದ್ದಾಗ 21-hydroxylase antibodies"],
  ["ಮೂಲ ಚಯಾಪಚಯ ಪ್ಯಾನಲ್ – ಪ್ರಮಾಣೀಕೃತ (Basic Metabolic Panel – Standardized)", SELF, 8, "ಸಾಮಾನ್ಯ ಚಯಾಪಚಯ, ಗ್ಲೂಕೋಸ್, ಮೂತ್ರಪಿಂಡ ಮತ್ತು ಎಲೆಕ್ಟ್ರೋಲೈಟ್ ಮೌಲ್ಯಮಾಪನ", "ಖಾಲಿ ಹೊಟ್ಟೆ ಅಥವಾ ರ‍್ಯಾಂಡಮ್ glucose, Urea/BUN, ಲೆಕ್ಕಾಚಾರದ eGFR ಸಹಿತ Creatinine, Sodium, Potassium, Chloride, Bicarbonate, Calcium"],
  ["ಸ್ತನ ತಪಾಸಣೆ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಬಯೋಮಾರ್ಕರ್ ಮೇಲ್ವಿಚಾರಣೆ (Breast Screening Guidance & Biomarker Monitoring)", DOCTOR, 3, "ತಪಾಸಣಾ ಮಾರ್ಗದರ್ಶನ ಅಥವಾ ಕ್ಯಾನ್ಸರ್ ತಜ್ಞರ ನಿರ್ದೇಶನದ ಬಯೋಮಾರ್ಕರ್ ಮೇಲ್ವಿಚಾರಣೆ", "ಸ್ತನ ಕ್ಯಾನ್ಸರ್ ತಪಾಸಣೆಗೆ ಯಾವುದೇ ಸಾಮಾನ್ಯ ರಕ್ತ ಪರೀಕ್ಷೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುವುದಿಲ್ಲ; ವೈದ್ಯಕೀಯ ಸ್ತನ ಪರೀಕ್ಷೆ ಮತ್ತು ವಯಸ್ಸು/ಅಪಾಯಕ್ಕೆ ಸೂಕ್ತವಾದ ಇಮೇಜಿಂಗ್; ಕ್ಯಾನ್ಸರ್ ತಜ್ಞರು ಮೇಲ್ವಿಚಾರಣೆಗಾಗಿ ಆಯ್ಕೆ ಮಾಡಿದಾಗ ಮಾತ್ರ CA 15-3, CA 27.29 ಅಥವಾ CEA"],
  ["ಮೂಲ ಮೂಳೆ ಮತ್ತು ಖನಿಜ ಪ್ರೊಫೈಲ್ (Basic Bone and Mineral Profile)", SELF, 8, "ವಿಟಮಿನ್ D, ಖನಿಜ ಸಮತೋಲನ ಅಥವಾ ಸಾಮಾನ್ಯ ಮೂಳೆ ಆರೋಗ್ಯದ ಕಾಳಜಿಗಳು", "Calcium, Phosphorus, Magnesium, Albumin, Alkaline phosphatase, 25-OH vitamin D, Intact PTH, eGFR ಸಹಿತ Creatinine"],
  ["ಹೃದಯ ಅಪಾಯ ಮತ್ತು ತೀವ್ರ ಹೃದಯ ಹಾನಿ ಪರೀಕ್ಷಾ ಮಾರ್ಗಗಳು (Cardiac Risk & Acute Injury Pathways)", DOCTOR, 5, "ಹೃದಯ-ರಕ್ತನಾಳ ಅಪಾಯದ ಪರಿಶೀಲನೆ ಅಥವಾ ತೀವ್ರ ಲಕ್ಷಣಗಳು — ಪ್ರತ್ಯೇಕ ಮಾರ್ಗಗಳ ಮೂಲಕ", "LDL ಮತ್ತು non-HDL ಸಹಿತ Lipid profile, ಆಯ್ದ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ High-sensitivity CRP, ತೀವ್ರ ಲಕ್ಷಣಗಳಿಗೆ High-sensitivity troponin I ಅಥವಾ T, ಹೃದಯ ವೈಫಲ್ಯದ ಶಂಕೆ ಇದ್ದಾಗ BNP/NT-proBNP, ಅಗತ್ಯವಿದ್ದಾಗ ApoB ಮತ್ತು lipoprotein(a)"],
  ["ಕಾರ್ಡಿಯೋಲಿಪಿನ್ ಪ್ರತಿಕಾಯ ಪ್ರೊಫೈಲ್ (Cardiolipin Antibody Profile)", DOCTOR, 5, "ರಕ್ತ ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ (ಥ್ರಾಂಬೋಸಿಸ್) ಅಥವಾ ನಿರ್ದಿಷ್ಟ ಗರ್ಭಧಾರಣೆ ತೊಂದರೆಗಳು", "Anticardiolipin IgG, Anticardiolipin IgM, Anti-beta-2 glycoprotein I IgG/IgM, Lupus anticoagulant, ಪಾಸಿಟಿವ್ ಬಂದರೆ ಕನಿಷ್ಠ 12 ವಾರಗಳ ನಂತರ ಮರುಪರೀಕ್ಷೆ"],
  ["ಮೂಲ ರಕ್ತ ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ ಪ್ರೊಫೈಲ್ (Basic Coagulation Profile)", CONSULT, 3, "ರಕ್ತಸ್ರಾವದ ಇತಿಹಾಸ, ಹೆಪ್ಪುರೋಧಕ (ಆಂಟಿಕೋಆಗ್ಯುಲೆಂಟ್) ಔಷಧಿ ಮೇಲ್ವಿಚಾರಣೆ ಅಥವಾ ಕೆಲವು ಶಸ್ತ್ರಚಿಕಿತ್ಸಾ ಪ್ರಕ್ರಿಯೆಗಳು", "Prothrombin time/INR, Activated partial thromboplastin time (APTT), platelet count ಸಹಿತ CBC"],
  ["ವಿಸ್ತೃತ ರಕ್ತಸ್ರಾವ ಮತ್ತು ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ ಮೌಲ್ಯಮಾಪನ (Extended Bleeding and Coagulation Evaluation)", DOCTOR, 7, "ಕಾರಣ ತಿಳಿಯದ ರಕ್ತಸ್ರಾವ/ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ ಅಥವಾ ಅಸಹಜ ಮೂಲ ಪರೀಕ್ಷೆಗಳು", "PT/INR, APTT, Fibrinogen, Thrombin time, Platelet count, ವೈದ್ಯಕೀಯವಾಗಿ ಅಗತ್ಯವಿದ್ದಾಗ ಮಾತ್ರ D-dimer, ಅಗತ್ಯವಿದ್ದಾಗ Mixing studies ಅಥವಾ von Willebrand ಪರೀಕ್ಷೆ"],
  ["ಮೊದಲ ತ್ರೈಮಾಸಿಕ ಸಂಯೋಜಿತ ಕ್ರೋಮೋಸೋಮ್ ವ್ಯತ್ಯಯ (ಅನ್ಯೂಪ್ಲಾಯ್ಡಿ) ತಪಾಸಣೆ (First-Trimester Combined Aneuploidy Screen)", DOCTOR, 4, "ಮೊದಲ ತ್ರೈಮಾಸಿಕದಲ್ಲಿ ಕ್ರೋಮೋಸೋಮ್ ವ್ಯತ್ಯಯದ ಅಪಾಯ ತಪಾಸಣೆ", "PAPP-A, Free beta-hCG, Nuchal-translucency ಅಲ್ಟ್ರಾಸೌಂಡ್, ದೃಢೀಕೃತ ಅಪಾಯ ಲೆಕ್ಕಾಚಾರಕ್ಕಾಗಿ ತಾಯಿಯ ಮತ್ತು ಗರ್ಭಾವಧಿಯ ಮಾಹಿತಿ"],
  ["ಎರಡನೇ ತ್ರೈಮಾಸಿಕ ಟ್ರಿಪಲ್ ಮಾರ್ಕರ್ ತಪಾಸಣೆ (Second-Trimester Triple Marker Screen)", DOCTOR, 3, "ಎರಡನೇ ತ್ರೈಮಾಸಿಕದ ಜೀವರಾಸಾಯನಿಕ ಅಪಾಯ ತಪಾಸಣೆ", "Alpha-fetoprotein (AFP), hCG, Unconjugated estriol (uE3), ದೃಢೀಕೃತ ಅಪಾಯ ಲೆಕ್ಕಾಚಾರಕ್ಕಾಗಿ ತಾಯಿಯ ಮತ್ತು ಗರ್ಭಾವಧಿಯ ಮಾಹಿತಿ"],
  ["ಎರಡನೇ ತ್ರೈಮಾಸಿಕ ಕ್ವಾಡ್ರುಪಲ್ ಮಾರ್ಕರ್ ತಪಾಸಣೆ (Second-Trimester Quadruple Marker Screen)", DOCTOR, 4, "ಎರಡನೇ ತ್ರೈಮಾಸಿಕದ ಜೀವರಾಸಾಯನಿಕ ಅಪಾಯ ತಪಾಸಣೆ", "Alpha-fetoprotein (AFP), hCG, Unconjugated estriol (uE3), Inhibin A, ದೃಢೀಕೃತ ಅಪಾಯ ಲೆಕ್ಕಾಚಾರಕ್ಕಾಗಿ ತಾಯಿಯ ಮತ್ತು ಗರ್ಭಾವಧಿಯ ಮಾಹಿತಿ"],
  ["ಎಲೆಕ್ಟ್ರೋಲೈಟ್ಸ್ ಪ್ಲಸ್ (Electrolytes Plus)", SELF, 6, "ವಾಂತಿ, ನಿರ್ಜಲೀಕರಣ, ಮೂತ್ರಪಿಂಡ ಕಾಯಿಲೆ ಅಥವಾ ಔಷಧಿ ಮೇಲ್ವಿಚಾರಣೆ", "Sodium, Potassium, Chloride, Bicarbonate/total carbon dioxide, ಅಗತ್ಯವಿದ್ದಾಗ Magnesium, ಅಗತ್ಯವಿದ್ದಾಗ Calcium"],
  ["STI ತಪಾಸಣಾ ಪ್ಯಾನಲ್ – ಅಪಾಯ ಆಧಾರಿತ (STI Screening Panel – Risk Based)", CONSULT, 6, "ಅಪಾಯ ಆಧಾರಿತ STI ತಪಾಸಣೆ, ಲಕ್ಷಣಗಳು ಅಥವಾ ಸೋಂಕಿಗೆ ಒಡ್ಡಿಕೊಂಡ ಆತಂಕ", "HIV-1/2 antigen-antibody test, Hepatitis B ಸೋಂಕು/ರೋಗನಿರೋಧಕ ಪ್ಯಾನಲ್, Hepatitis C ತಪಾಸಣೆ, Chlamydia ಮತ್ತು gonorrhea NAAT, ದೃಢೀಕರಣ ಸಹಿತ Syphilis ತಪಾಸಣೆ, ಸಂಪರ್ಕದ ಆಧಾರದ ಮೇಲೆ ಇತರ ಸ್ಥಳ-ನಿರ್ದಿಷ್ಟ ಪರೀಕ್ಷೆಗಳು"],
  ["ಮಹಿಳಾ ಫಲವತ್ತತೆ ಮೌಲ್ಯಮಾಪನ – ವೈದ್ಯರ ನಿರ್ದೇಶಿತ (Female Fertility Evaluation – Clinician Directed)", CONSULT, 9, "ಋತುಚಕ್ರದ ಸಮಯಕ್ಕೆ ಅನುಗುಣವಾದ ವಿಶ್ಲೇಷಣೆಯೊಂದಿಗೆ ಫಲವತ್ತತೆ ಮೌಲ್ಯಮಾಪನ", "FSH ಮತ್ತು LH, Prolactin, Estradiol, ಋತುಚಕ್ರದ ಸಮಯಕ್ಕೆ ತಕ್ಕ progesterone, AMH, TSH, DHEA-S, Testosterone/SHBG, ಸೂಕ್ತವಾದಾಗ ಗರ್ಭಧಾರಣೆ ಪರೀಕ್ಷೆ"],
  ["ಋತುಬಂಧ ಮೌಲ್ಯಮಾಪನ – ವೈದ್ಯರ ನಿರ್ದೇಶಿತ (Menopause Assessment – Clinician Directed)", CONSULT, 5, "ಋತುಬಂಧದ ಬಗ್ಗೆ ಅನಿಶ್ಚಿತತೆ ಅಥವಾ ಅಕಾಲಿಕ ಅಂಡಾಶಯ ಕೊರತೆಯ ಕಾಳಜಿ", "TSH ಮತ್ತು free T4, FSH, LH, Estradiol, ಲಕ್ಷಣಗಳು ಅಸಾಮಾನ್ಯವಾಗಿದ್ದಾಗ ಗರ್ಭಧಾರಣೆ ಪರೀಕ್ಷೆ ಅಥವಾ prolactin"],
  ["ಸಂಕೀರ್ಣ ಋತುಬಂಧ ಮತ್ತು ಮುಟ್ಟು ನಿಲ್ಲುವಿಕೆ (ಅಮೆನೋರಿಯಾ) ಮೌಲ್ಯಮಾಪನ (Complex Menopause and Amenorrhea Evaluation)", CONSULT, 7, "ಸಂಕೀರ್ಣ ಅಮೆನೋರಿಯಾ ಅಥವಾ ಅಸಾಮಾನ್ಯ ಹಾರ್ಮೋನ್ ಲಕ್ಷಣಗಳು", "ಸೂಕ್ತವಾದಾಗ ಗರ್ಭಧಾರಣೆ ಪರೀಕ್ಷೆ, TSH ಮತ್ತು free T4, FSH, Prolactin, Estradiol, ನಿರ್ದಿಷ್ಟ ಲಕ್ಷಣಗಳಿಗೆ ಮಾತ್ರ Androgen/17-OHP ಪರೀಕ್ಷೆ, ಪ್ರತ್ಯೇಕ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನವಾಗಿ HbA1c ಮತ್ತು lipids"],
  ["MMR ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಪ್ರೊಫೈಲ್ (MMR Immunity Profile)", SELF, 4, "ಲಸಿಕೆ ದಾಖಲೆಗಳು ಲಭ್ಯವಿಲ್ಲದಾಗ ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯ ದಾಖಲೀಕರಣ", "Measles IgG, Mumps IgG, Rubella IgG, ಕಾಯಿಲೆಯ ಶಂಕೆ ಇದ್ದಾಗ ಮಾತ್ರ ತೀವ್ರ-ಸೋಂಕು ಮಾರ್ಗದ ಮೂಲಕ PCR/IgM"],
  ["ಮೊನೊಕ್ಲೋನಲ್ ಗ್ಯಾಮೋಪತಿ / ಮೈಲೋಮಾ ಮೌಲ್ಯಮಾಪನ (Monoclonal Gammopathy / Myeloma Evaluation)", DOCTOR, 8, "ತಜ್ಞರ ಪರಿಶೀಲನೆಯಲ್ಲಿರುವ ಮೊನೊಕ್ಲೋನಲ್ ಪ್ರೋಟೀನ್ ಕಾಯಿಲೆಯ ಶಂಕೆ", "CBC, Serum protein electrophoresis (SPEP), Serum immunofixation, Free light chains ಮತ್ತು ratio, IgG, IgA ಮತ್ತು IgM, Calcium ಮತ್ತು creatinine/eGFR, Albumin, total protein, LDH ಮತ್ತು beta-2 microglobulin, ಅಗತ್ಯವಿದ್ದಾಗ ಮೂತ್ರದ electrophoresis/immunofixation"],
  ["ಸ್ನಾಯು-ಅಸ್ಥಿ ಉರಿಯೂತ ತಪಾಸಣೆ (Musculoskeletal Inflammation Screen)", CONSULT, 6, "ವೈದ್ಯರ ಪರೀಕ್ಷೆಯ ನಂತರ ಆಯ್ದ ಕೀಲು ಅಥವಾ ಸ್ನಾಯು-ಅಸ್ಥಿ ಲಕ್ಷಣಗಳು", "CBC, ESR ಮತ್ತು CRP, ಅಗತ್ಯವಿದ್ದಾಗ Rheumatoid factor/anti-CCP, Uric acid, ಅಗತ್ಯವಿದ್ದಾಗ Vitamin D ಮತ್ತು calcium, ಸೋಂಕು ಅಥವಾ ಹರಳುಗಳ (ಕ್ರಿಸ್ಟಲ್) ಶಂಕೆ ಇದ್ದಾಗ ಕೀಲು ದ್ರವ ವಿಶ್ಲೇಷಣೆ"],
  ["ಆಸ್ಟಿಯೊಪೊರೋಸಿಸ್ ಮತ್ತು ದ್ವಿತೀಯ ಕಾರಣಗಳ ಪ್ರಯೋಗಾಲಯ ಪ್ಯಾನಲ್ (Osteoporosis and Secondary-Cause Laboratory Panel)", CONSULT, 8, "ಕಡಿಮೆ ಮೂಳೆ ಸಾಂದ್ರತೆ, ಮೂಳೆ ಮುರಿತಗಳು ಅಥವಾ ದ್ವಿತೀಯ ಕಾರಣಗಳ ಮೌಲ್ಯಮಾಪನ", "Calcium, phosphorus ಮತ್ತು magnesium, 25-OH vitamin D, Intact PTH, Albumin ಮತ್ತು ALP, Creatinine, TSH, P1NP ಮತ್ತು osteocalcin, ಮೇಲ್ವಿಚಾರಣೆ ಅಗತ್ಯವಿದ್ದಾಗ Beta-CTX"],
  ["ಪುನರಾವರ್ತಿತ ಗರ್ಭಪಾತ / APS ಮೌಲ್ಯಮಾಪನ (Recurrent Pregnancy Loss / APS Evaluation)", DOCTOR, 5, "ಪುನರಾವರ್ತಿತ ಗರ್ಭಪಾತ ಅಥವಾ APS ಮೌಲ್ಯಮಾಪನ", "Lupus anticoagulant, Anticardiolipin IgG/IgM, Anti-beta-2 glycoprotein I IgG/IgM, ಪಾಸಿಟಿವ್ ಬಂದರೆ ಕನಿಷ್ಠ 12 ವಾರಗಳ ನಂತರ ಮರುಪರೀಕ್ಷೆ, ಪ್ರಸೂತಿ/ತಜ್ಞರ ಪರಿಶೀಲನೆಯ ನಂತರವೇ ಇತರ ಪರೀಕ್ಷೆಗಳು"],
  ["ಪ್ರಾಸ್ಟೇಟ್ ಮೌಲ್ಯಮಾಪನ – PSA ಆಧಾರಿತ (Prostate Assessment – PSA Based)", DOCTOR, 3, "ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಿ ತೆಗೆದುಕೊಂಡ ಜಂಟಿ ನಿರ್ಧಾರದ ನಂತರ PSA ಆಧಾರಿತ ಪ್ರಾಸ್ಟೇಟ್ ಮೌಲ್ಯಮಾಪನ", "Total PSA, ತಾತ್ಕಾಲಿಕ ಏರಿಕೆಯ ಕಾರಣಗಳು ನಿವಾರಣೆಯಾದ ನಂತರ ಸಲಹೆ ನೀಡಿದಾಗ ಮರು PSA, ಮೂತ್ರ ಸಂಬಂಧಿ ಲಕ್ಷಣಗಳಿಗೆ ಮೂತ್ರ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು creatinine/eGFR"],
  ["ಪ್ರಾಸ್ಟೇಟ್ ಕ್ಯಾನ್ಸರ್ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ – PSA ರಿಫ್ಲೆಕ್ಸ್ (Prostate Cancer Risk Assessment – PSA Reflex)", DOCTOR, 4, "ಮೂತ್ರರೋಗ ತಜ್ಞರ ಮಾರ್ಗದ ಮೂಲಕ PSA ಅಪಾಯದ ಸ್ಪಷ್ಟೀಕರಣ", "Total PSA, ಲೆಕ್ಕಾಚಾರದ free-to-total ಶೇಕಡಾವಾರು ಸಹಿತ reflex free PSA, ಮೂತ್ರರೋಗ ತಜ್ಞರು ಆಯ್ಕೆ ಮಾಡಿದಾಗ ಮಾತ್ರ PHI/4Kscore, ಅಗತ್ಯವಿದ್ದಾಗ ಮೂತ್ರರೋಗ ತಜ್ಞರ ಪರೀಕ್ಷೆ ಮತ್ತು MRI"],
  ["PCOS ರೋಗನಿರ್ಣಯ ಮತ್ತು ಚಯಾಪಚಯ ಪ್ರೊಫೈಲ್ (PCOS Diagnostic and Metabolic Profile)", CONSULT, 8, "ಅನಿಯಮಿತ ಋತುಚಕ್ರ, ಆಂಡ್ರೋಜನ್ ಲಕ್ಷಣಗಳು ಅಥವಾ PCOS ಶಂಕೆ", "TSH, Total/free testosterone ಮತ್ತು SHBG, DHEA-S, Prolactin, FSH ಮತ್ತು LH, HbA1c ಅಥವಾ oral glucose tolerance test, ಸಂಪೂರ್ಣ lipid profile, ಅಗತ್ಯವಿದ್ದಾಗ ಗರ್ಭಧಾರಣೆ ಪರೀಕ್ಷೆ/17-OHP"],
  ["PCOS ಮೌಲ್ಯಮಾಪನ – ಸಾಮೂಹಿಕ ತಪಾಸಣೆಗೆ ಅಲ್ಲ (PCOS Evaluation – Not Population Screening)", CONSULT, 8, "PCOS ಶಂಕೆಯ ವೈದ್ಯಕೀಯ ಮೌಲ್ಯಮಾಪನ — ಸಾಮೂಹಿಕ ತಪಾಸಣೆಗೆ ಅಲ್ಲ", "TSH, Total/free testosterone ಮತ್ತು SHBG, DHEA-S, Prolactin, 17-hydroxyprogesterone, HbA1c ಅಥವಾ oral glucose tolerance test, ಸಂಪೂರ್ಣ lipid profile, ಸೂಕ್ತವಾದಾಗ ಗರ್ಭಧಾರಣೆ ಪರೀಕ್ಷೆ"],
  ["ಸಂಪೂರ್ಣ ಆಂಟಿಫಾಸ್ಫೋಲಿಪಿಡ್ ಸಿಂಡ್ರೋಮ್ ಪ್ಯಾನಲ್ (Complete Antiphospholipid Syndrome Panel)", DOCTOR, 4, "ಆಂಟಿಫಾಸ್ಫೋಲಿಪಿಡ್ ಸಿಂಡ್ರೋಮ್ ಶಂಕೆ", "Anticardiolipin IgG/IgM, Anti-beta-2 glycoprotein I IgG/IgM, Lupus anticoagulant, ಪಾಸಿಟಿವ್ ಬಂದರೆ ಕನಿಷ್ಠ 12 ವಾರಗಳ ನಂತರ ಮರುಪರೀಕ್ಷೆ"],
  ["ಮೂಲ ಕಬ್ಬಿಣಾಂಶ ಕೊರತೆ ಪ್ರೊಫೈಲ್ (Basic Iron Deficiency Profile)", SELF, 5, "ಕಬ್ಬಿಣಾಂಶ ಕೊರತೆಯ ಸಾಧ್ಯತೆಗೆ ಕೇಂದ್ರೀಕೃತ ಮೊದಲ ಹಂತದ ಪರೀಕ್ಷೆ", "ಸಂಪೂರ್ಣ ರಕ್ತ ಕಣ ಎಣಿಕೆ (CBC), Serum iron, TIBC, Ferritin, ಲೆಕ್ಕಾಚಾರದ transferrin saturation"],
  ["ಮೂತ್ರಪಿಂಡ ಕಾರ್ಯ ಪರೀಕ್ಷೆ – ಮೂಲ (Kidney Function Test – Basic)", SELF, 6, "ಸಾಮಾನ್ಯ ಮೂತ್ರಪಿಂಡ ಮೌಲ್ಯಮಾಪನ ಅಥವಾ ಮಧುಮೇಹ/ಅಧಿಕ ರಕ್ತದೊತ್ತಡದ ಅಪಾಯ", "Urea/BUN, ಲೆಕ್ಕಾಚಾರದ eGFR ಸಹಿತ Creatinine, Uric acid, Sodium, potassium ಮತ್ತು chloride, ಸಾಮಾನ್ಯ ಮೂತ್ರ ವಿಶ್ಲೇಷಣೆ, ಮಧುಮೇಹ, ಅಧಿಕ ರಕ್ತದೊತ್ತಡ ಅಥವಾ CKD ಅಪಾಯಕ್ಕೆ Urine ACR"],
  ["ಮೂತ್ರಪಿಂಡ ಕಾರ್ಯ ಮತ್ತು ಖನಿಜ ಪ್ರೊಫೈಲ್ (Kidney Function and Mineral Profile)", SELF, 7, "ವಿಸ್ತೃತ ಮೂತ್ರಪಿಂಡ ಮತ್ತು ಖನಿಜ ಮೌಲ್ಯಮಾಪನ", "Urea/BUN, eGFR ಸಹಿತ Creatinine, Sodium, potassium ಮತ್ತು chloride, Calcium, phosphorus ಮತ್ತು magnesium, Serum albumin, ಸಾಮಾನ್ಯ ಮೂತ್ರ ವಿಶ್ಲೇಷಣೆ, Urine albumin-creatinine ratio (UACR)"],
  ["ತೀವ್ರ ಜ್ವರದ ಆರಂಭಿಕ ಮೌಲ್ಯಮಾಪನ – ಸಂದರ್ಭಾಧಾರಿತ (Acute Fever Initial Evaluation – Context Based)", CONSULT, 7, "ಜ್ವರ ಬಂದು ಎಷ್ಟು ದಿನವಾಗಿದೆ ಮತ್ತು ಸ್ಥಳೀಯ ಅಪಾಯಕ್ಕೆ ಅನುಗುಣವಾಗಿ ತೀವ್ರ ಜ್ವರದ ಮೌಲ್ಯಮಾಪನ", "CBC, CRP, ಯಕೃತ್ ಕಾರ್ಯ ಪರೀಕ್ಷೆಗಳು, Creatinine/eGFR ಮತ್ತು electrolytes, ಅಗತ್ಯವಿದ್ದಾಗ Malaria rapid test ಮತ್ತು smear, ಜ್ವರದ ದಿನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಆಯ್ಕೆ ಮಾಡಿದ Dengue ಪರೀಕ್ಷೆ, ಅಗತ್ಯವಿದ್ದಾಗ ಮೂತ್ರ ವಿಶ್ಲೇಷಣೆ/ಕಲ್ಚರ್"],
  ["ಮಧುಮೇಹ ಗ್ಲೈಸೆಮಿಕ್ ಪ್ರೊಫೈಲ್ – ಮೂಲ (Diabetes Glycemic Profile – Basic)", SELF, 4, "ಮಧುಮೇಹ ತಪಾಸಣೆ ಅಥವಾ ಮೂಲ ಗ್ಲೂಕೋಸ್ ಮೇಲ್ವಿಚಾರಣೆ", "HbA1c, ಖಾಲಿ ಹೊಟ್ಟೆಯ blood glucose, ಊಟದ ನಂತರದ blood glucose, ಲೆಕ್ಕಾಚಾರದ eGFR ಸಹಿತ Creatinine"],
  ["ಸಮಗ್ರ ಮಧುಮೇಹ ಮೇಲ್ವಿಚಾರಣಾ ಪ್ರೊಫೈಲ್ (Comprehensive Diabetes Monitoring Profile)", SELF, 7, "ಮೂತ್ರಪಿಂಡ ಮತ್ತು ಹೃದಯ ಅಪಾಯದ ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ ನಿರಂತರ ಮಧುಮೇಹ ಆರೈಕೆ", "HbA1c, ಖಾಲಿ ಹೊಟ್ಟೆ ಮತ್ತು ಊಟದ ನಂತರದ glucose, Lipid profile, eGFR ಸಹಿತ Creatinine, Urine albumin-creatinine ratio, ಸಾಮಾನ್ಯ ಮೂತ್ರ ವಿಶ್ಲೇಷಣೆ, ಯಕೃತ್ ಕಾರ್ಯ ಪರೀಕ್ಷೆಗಳು"],
  ["ಮಾದರಿ-ನಿರ್ದಿಷ್ಟ ಕಲ್ಚರ್ ಮತ್ತು ಔಷಧ ಸಂವೇದನಾ (ಸಸೆಪ್ಟಿಬಿಲಿಟಿ) ಪರೀಕ್ಷೆಗಳು (Specimen-Specific Culture and Susceptibility Menu)", DOCTOR, 5, "ಸರಿಯಾದ ಮಾದರಿಯೊಂದಿಗೆ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕಿನ ಶಂಕೆ", "ಶಂಕಿತ ಸ್ಥಳಕ್ಕೆ ಸರಿಯಾದ ಮಾದರಿಯ ಆಯ್ಕೆ, ಸೂಕ್ತವಾದಲ್ಲಿ Gram stain, ಕಲ್ಚರ್ ಮತ್ತು ಸೂಕ್ಷ್ಮಜೀವಿ ಗುರುತಿಸುವಿಕೆ, ಆಂಟಿಮೈಕ್ರೋಬಿಯಲ್ ಸಸೆಪ್ಟಿಬಿಲಿಟಿ ಪರೀಕ್ಷೆ, ಅಗತ್ಯವಿದ್ದಾಗ ಆನೆರೋಬಿಕ್, ಶಿಲೀಂಧ್ರ ಅಥವಾ ಮೈಕೋಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಕಲ್ಚರ್"],
  ["ಕ್ಷಯರೋಗ (TB) ಮೌಲ್ಯಮಾಪನ – ಸಕ್ರಿಯ ಮತ್ತು ಸುಪ್ತ (Tuberculosis Evaluation – Active vs Latent)", DOCTOR, 7, "ಸಕ್ರಿಯ TB ಶಂಕೆ ಅಥವಾ ಪ್ರತ್ಯೇಕ ಸುಪ್ತ ಸೋಂಕಿನ ಮೌಲ್ಯಮಾಪನ", "ಕಫದ CBNAAT/ಮಾಲಿಕ್ಯುಲರ್ ಪರೀಕ್ಷೆ, AFB smear, Mycobacterial culture, ಔಷಧ ಸಂವೇದನಾ ಪರೀಕ್ಷೆ, HIV ತಪಾಸಣೆ, ಚಿಕಿತ್ಸೆಗೆ ಮುನ್ನ ಮೂಲ ಯಕೃತ್/ಮೂತ್ರಪಿಂಡ ಪರೀಕ್ಷೆಗಳು, ಸುಪ್ತ ಸೋಂಕಿನ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಮಾತ್ರ IGRA/TB Gold"],
  ["ನ್ಯುಮೋನಿಯಾ ತೀವ್ರತೆ ಮತ್ತು ಕಾರಣ ಮೌಲ್ಯಮಾಪನ (Pneumonia Severity and Etiology Evaluation)", DOCTOR, 5, "ವೈದ್ಯಕೀಯ ಪರೀಕ್ಷೆ ಮತ್ತು ಇಮೇಜಿಂಗ್ ನಂತರ ನ್ಯುಮೋನಿಯಾ ಶಂಕೆ", "CBC ಮತ್ತು CRP, ಮಧ್ಯಮ/ತೀವ್ರ ಕಾಯಿಲೆಗೆ ಮೂತ್ರಪಿಂಡ, ಎಲೆಕ್ಟ್ರೋಲೈಟ್ ಮತ್ತು ಯಕೃತ್ ಪರೀಕ್ಷೆಗಳು, Respiratory viral NAAT, ಅಗತ್ಯವಿದ್ದಾಗ ಕಫದ Gram stain/culture, ಆಯ್ದ ತೀವ್ರ ಪ್ರಕರಣಗಳಿಗೆ Blood cultures ಅಥವಾ urinary antigens"],
  ["ಮೂತ್ರ ಮಾದಕವಸ್ತು ತಪಾಸಣೆ – ದೃಢೀಕರಣ ಸಹಿತ 10 ವರ್ಗಗಳು (Urine Drug Screen – 10 Classes with Confirmation)", CONSULT, 5, "ನಿರ್ದಿಷ್ಟ ಉದ್ದೇಶದ ವೈದ್ಯಕೀಯ, ಉದ್ಯೋಗಸ್ಥಳ ಅಥವಾ ಕಾನೂನು ಪರೀಕ್ಷೆ", "ನಿಗದಿತ 10 ಮಾದಕವಸ್ತು ವರ್ಗಗಳಿಗೆ Immunoassay ತಪಾಸಣೆ, ಮೂತ್ರದ creatinine, specific gravity ಮತ್ತು pH, ಆಕ್ಸಿಡೆಂಟ್/ಕಲಬೆರಕೆ ಪರಿಶೀಲನೆ, ನೆಗೆಟಿವ್ ಅಲ್ಲದ ಫಲಿತಾಂಶಗಳಿಗೆ GC-MS ಅಥವಾ LC-MS/MS ದೃಢೀಕರಣ, ಅಗತ್ಯವಿರುವಲ್ಲಿ ನಿಗದಿತ ಕಟ್‌ಆಫ್‌ಗಳು ಮತ್ತು ಚೈನ್-ಆಫ್-ಕಸ್ಟಡಿ"],
];

export const packagesPage: KnPageData = {
  enPath: "/packages",
  knPath: "/kn/packages",
  seoTitle: "ಆರೋಗ್ಯ ತಪಾಸಣಾ ಪ್ಯಾಕೇಜ್‌ಗಳು | ಸಂಪೂರ್ಣ ದೇಹ ಮತ್ತು ವಿಶೇಷ ಪ್ಯಾನಲ್‌ಗಳು",
  description:
    "ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ಉಚಿತ ಮನೆ ಮಾದರಿ ಸಂಗ್ರಹದೊಂದಿಗೆ ವೈದ್ಯರು ರೂಪಿಸಿದ 49 ಆರೋಗ್ಯ ತಪಾಸಣಾ ಪ್ಯಾಕೇಜ್‌ಗಳು — Quick Fit, Q-Master Health Pro, ಸಂಪೂರ್ಣ ದೇಹ ತಪಾಸಣೆ ಮತ್ತು ವಿಶೇಷ ಪ್ಯಾನಲ್‌ಗಳು.",
  breadcrumb: [{ label: "ಮುಖಪುಟ", href: "/kn" }, { label: "ಆರೋಗ್ಯ ತಪಾಸಣಾ ಪ್ಯಾಕೇಜ್‌ಗಳು" }],
  hero: {
    eyebrow: `NABL ಮಾನ್ಯತೆ (${KN.nabl}) • ISO 15189:2022`,
    title: "ಸಂಪೂರ್ಣ ರೋಗನಿರ್ಣಯ ಪ್ಯಾಕೇಜ್‌ಗಳು",
    subtitle:
      "ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ಉಚಿತ ಮನೆ ಬಾಗಿಲಿನ ಮಾದರಿ ಸಂಗ್ರಹದೊಂದಿಗೆ ವೈದ್ಯರು ರೂಪಿಸಿದ ಆರೋಗ್ಯ ತಪಾಸಣೆಗಳು; ಹಲವು ಸಾಮಾನ್ಯ ಪರೀಕ್ಷೆಗಳಿಗೆ ಅದೇ ದಿನ ವರದಿ (ಪರೀಕ್ಷೆಗೆ ಅನುಗುಣವಾದ ವರದಿ ಅವಧಿ ಅನ್ವಯ).",
    badges: ["49 ರಲ್ಲಿ 49 ರೋಗನಿರ್ಣಯ ಪ್ಯಾಕೇಜ್‌ಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ"],
    ctas: [
      { label: "ಪ್ರಮಾಣಿತ ಪ್ಯಾಕೇಜ್‌ಗಳು", href: "#standard", variant: "primary" },
      { label: "ವೈದ್ಯರ ನಿರ್ದೇಶಿತ ಪ್ಯಾನಲ್‌ಗಳು", href: "#doctor-directed" },
    ],
  },
  sections: [
    {
      tone: "muted",
      eyebrow: "ಮಾರ್ಗದರ್ಶನ ಮಟ್ಟ",
      title: "ಪ್ರತಿ ಪ್ಯಾಕೇಜ್‌ನ ಮಾರ್ಗದರ್ಶನ ಲೇಬಲ್‌ಗಳು",
      blocks: [
        {
          type: "kv",
          items: [
            { k: SELF, v: "ವೈದ್ಯರ ಚೀಟಿ ಇಲ್ಲದೆಯೂ ನೀವೇ ಬುಕ್ ಮಾಡಬಹುದಾದ ಪ್ಯಾನಲ್‌ಗಳು." },
            { k: CONSULT, v: "ಬುಕ್ ಮಾಡುವ ಮೊದಲು ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸುವುದು ಉತ್ತಮ." },
            { k: DOCTOR, v: "ವೈದ್ಯರು ಸೂಚಿಸಿದಾಗ ಮಾತ್ರ ಮಾಡಿಸಬೇಕಾದ ಪ್ಯಾನಲ್‌ಗಳು." },
          ],
        },
        { type: "p", text: "ವರ್ಗ:", strong: true },
        {
          type: "chips",
          items: [
            "ಫಿಟ್‌ನೆಸ್ · ಮಧುಮೇಹ · ಎಕ್ಸಿಕ್ಯೂಟಿವ್ · ವಿಶೇಷ",
            "ಕ್ಯಾನ್ಸರ್ ಶಾಸ್ತ್ರ · ಹೃದಯ ರೋಗ ವಿಜ್ಞಾನ · ರಕ್ತದ ಆರೋಗ್ಯ",
            "ಕೀಲು ಮತ್ತು ಹೃದಯದ ಆರೋಗ್ಯ · ಗರ್ಭಧಾರಣೆ ಆರೈಕೆ",
            "ಹಾರ್ಮೋನ್ ಮತ್ತು PCOS · ಆಟೋಇಮ್ಯೂನ್ ಮತ್ತು ಪ್ರೋಟೀನ್ ಸಂಬಂಧಿ ಕಾಯಿಲೆಗಳು",
            "ಕ್ಷಯರೋಗ ಮತ್ತು ಅಡ್ರಿನಲ್ ಆರೋಗ್ಯ · ರಕ್ತ ಮತ್ತು ಚಯಾಪಚಯ",
            "ತಜ್ಞ ಪರೀಕ್ಷೆಗಳು · ಮಧುಮೇಹ ಮತ್ತು ಮೂಳೆ ಆರೋಗ್ಯ",
            "ರಕ್ತಸ್ರಾವ ಮತ್ತು ಹೆಪ್ಪುಗಟ್ಟುವಿಕೆ · ಗರ್ಭಧಾರಣೆ ಅಪಾಯ ತಪಾಸಣೆ",
            "ಎಲೆಕ್ಟ್ರೋಲೈಟ್‌ಗಳು ಮತ್ತು ಮೂತ್ರಪಿಂಡ · ಸೋಂಕು ತಪಾಸಣೆ",
            "PCOS ಮತ್ತು ಫಲವತ್ತತೆ · ಗರ್ಭಧಾರಣೆ ಮತ್ತು ರೋಗನಿರೋಧಕ ಶಕ್ತಿ",
            "ಮೂಳೆ ಮತ್ತು ಸ್ನಾಯು-ಅಸ್ಥಿ ಆರೋಗ್ಯ · ಪುರುಷರ ಆರೋಗ್ಯ",
            "ಆಂಟಿಫಾಸ್ಫೋಲಿಪಿಡ್ ಪ್ರತಿಕಾಯಗಳು · ಉಸಿರಾಟ ಮತ್ತು ಸೂಕ್ಷ್ಮಜೀವಿಶಾಸ್ತ್ರ",
          ],
        },
      ],
    },
    {
      id: "standard",
      eyebrow: "ತಕ್ಷಣ ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್ (7 ಪ್ಯಾಕೇಜ್‌ಗಳು)",
      title: "ಪ್ರಮಾಣಿತ ಆರೋಗ್ಯ ಪ್ಯಾಕೇಜ್‌ಗಳು",
      subtitle: "ಪಾರದರ್ಶಕ ದರ ಮತ್ತು ಉಚಿತ ಮನೆ ಬಾಗಿಲಿನ ಮಾದರಿ ಸಂಗ್ರಹದೊಂದಿಗೆ ವೈದ್ಯರು ರೂಪಿಸಿದ ಮುನ್ನೆಚ್ಚರಿಕೆಯ ಆರೋಗ್ಯ ತಪಾಸಣೆಗಳು.",
      blocks: [
        {
          type: "table",
          headers: ["ಪ್ಯಾಕೇಜ್", "ಒಳಗೊಂಡಿದೆ", "ವರದಿ ಸಮಯ", "MRP", "ರಿಯಾಯಿತಿ", "ಕೊಡುಗೆ ದರ"],
          rows: [
            ["Quick Fit ಪ್ಯಾಕೇಜ್ (ಫಿಟ್‌ನೆಸ್ ತಪಾಸಣೆ)", "80 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು", "6 ಗಂಟೆ", "₹4,696", "62%", "₹1,770"],
            ["Q-Screen ಮಧುಮೇಹ ಪ್ಯಾಕೇಜ್", "62 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು", "6 ಗಂಟೆ", "₹4,960", "62%", "₹1,900"],
            ["Q-Master Health Pro ಪ್ಯಾಕೇಜ್ (ಸಮಗ್ರ ಆರೋಗ್ಯ ತಪಾಸಣೆ)", "92 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು", "6 ಗಂಟೆ", "₹9,600", "52%", "₹4,600"],
            ["ಅಲ್ಟ್ರಾ ಸಂಪೂರ್ಣ ದೇಹ ತಪಾಸಣೆ – ಮಾಸ್ಟರ್ (Ultra Full Body Checkup – Master)", "117 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು", "6 ಗಂಟೆ", "₹18,588", "73%", "₹4,999"],
            ["Q-Advanced ಸಂಧಿವಾತ ಮತ್ತು ಆಟೋಇಮ್ಯೂನ್ ಪ್ಯಾನಲ್", "22 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು", "24 ಗಂಟೆ", "₹12,660", "45%", "₹6,900"],
            ["Q-Oncoscreen ಪ್ಯಾಕೇಜ್ (ಕ್ಯಾನ್ಸರ್ ತಪಾಸಣೆ)", "15 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು", "24–48 ಗಂಟೆ", "₹13,600", "42%", "₹7,900"],
            ["Q-ಅಧಿಕ ರಕ್ತದೊತ್ತಡ ಮತ್ತು ಹೃದಯ-ರಕ್ತನಾಳ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ಪ್ಯಾಕೇಜ್ (Q-Hypertension and Cardiovascular Risk Assessment)", "25 ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು", "24 ಗಂಟೆ", "₹18,900", "52%", "₹9,000"],
          ],
        },
        { type: "buttons", items: [{ label: "ಸೇರಿಸಿ / ಬುಕ್ ಮಾಡಿ", href: "/packages", variant: "primary" }, callBtn()] },
      ],
    },
    {
      id: "doctor-directed",
      tone: "muted",
      eyebrow: "ತಜ್ಞ ಮತ್ತು ವೈದ್ಯರ ನಿರ್ದೇಶಿತ (42 ಪ್ಯಾನಲ್‌ಗಳು)",
      title: "ವೈದ್ಯರ ನಿರ್ದೇಶಿತ ಮತ್ತು ವಿಶೇಷ ಪ್ಯಾಕೇಜ್‌ಗಳು",
      subtitle: "ವಿಶೇಷ ರೀತಿಯ ಮಾದರಿ ನಿರ್ವಹಣೆ ಅಥವಾ ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ ಅಗತ್ಯವಿರುವ ವಿಶೇಷ ಪ್ರೊಫೈಲ್‌ಗಳು. ದರ ಮತ್ತು ಸಲಹೆಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      blocks: [
        {
          type: "cards",
          cols: 2,
          items: PANELS.map(([title, guidance, count, when, includes], i) => ({
            badge: `#${String(i + 1).padStart(2, "0")} · ${guidance} · ${count} ಪ್ರಮುಖ ಅಂಶಗಳು`,
            title,
            kv: [
              { k: "ಯಾವಾಗ ಉಪಯುಕ್ತ", v: when },
              { k: "ಒಳಗೊಂಡಿದೆ", v: includes },
              { k: "ದರ", v: "ದರಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸಿ" },
            ],
          })),
        },
        { type: "buttons", items: [callBtn("ಕರೆ ಮಾಡಿ"), waBtn("ದರ ವಿಚಾರಿಸಿ")] },
      ],
    },
  ],
};
