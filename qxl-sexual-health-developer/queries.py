# Editorial/monitoring use only. These are constructed examples, not measured search volumes.
import csv
from pathlib import Path
from content import PAGES
root=Path(__file__).parent/'developer-only'
# 48 search-intent buckets, reflecting the preceding discussion.
raw='''Immediate exposure|sti-testing-after-unprotected-sex|what to do after unprotected sex;had sex without condom yesterday;what blood tests after unsafe sex;can I get STI from one encounter;STI screening after hookup;baseline STI test;can washing after sex prevent HIV;emergency STD testing
Condom failure|condom-break-sti-testing|condom broke during sex;condom slipped off;condom leaked;condom broke no ejaculation;condom removed midway;condom break HIV test;condom broke during anal sex;condom failure pregnancy risk
HIV risk|hiv-symptoms-and-anxiety|HIV after one exposure;HIV risk without ejaculation;HIV from precum;HIV after sex unknown partner;HIV without symptoms;early HIV symptoms;can normal CBC rule out HIV;HIV fear after sex
HIV windows|hiv-testing-after-exposure|HIV p24 test window period;fourth generation HIV test accuracy;HIV ECLIA vs ELISA;HIV CMIA vs rapid test;HIV RNA PCR vs fourth generation;HIV test non reactive meaning;HIV test after PEP;HIV test while taking PrEP
PEP PrEP|hiv-pep-prep-testing|PEP within 24 hours;PEP within 48 hours;PEP within 72 hours;missed PEP window;PEP clinic Bangalore;baseline tests before PEP;follow up tests after PEP;PEP vs PrEP;PrEP STI screening;doxy PEP clinician guidance
Oral sex|sti-testing-after-oral-sex|STI after giving oral sex;STI after receiving oral sex;oral sex no condom;oral gonorrhoea test;oral chlamydia PCR;throat swab STI PCR;pharyngeal CT NG NAAT;oral sex with bleeding gums;swallowing semen STI risk;oral STI without symptoms;blood and throat PCR;validated pharyngeal assay
Vaginal sex|sti-testing-after-vaginal-sex|STI after vaginal intercourse;unprotected vaginal sex no ejaculation;infection after intercourse;vaginal swab PCR;first catch urine STI test;female STI screening;male STI screening;STI after new partner
Anal sex|sti-testing-after-anal-sex|STD after anal sex;receptive anal intercourse STI tests;insertive anal sex;rectal gonorrhoea PCR;rectal chlamydia NAAT;rectal discharge;anal pain and bleeding;proctitis after sex;three site STI testing;extragenital NAAT
Other contact|sti-risk-kissing-and-genital-contact|STD from kissing;HIV from saliva;genital rubbing STI;HPV without penetration;herpes skin contact;touching semen;fingering STI risk;shared sex toys STI;mutual masturbation risk;STI without ejaculation
Partners|asymptomatic-sti-screening|STI after casual sex;one night stand STD test;dating app hookup;sex worker STI test;multiple partners screening;partner HIV status unknown;before a new relationship;partner refuses STI test
Private-part symptoms|genital-itching-and-irritation|private part itching after sex;private part burning;private area swelling;white marks on private part;red marks on private part;skin peeling private parts;private part discomfort;bad smell private part;private part infection test
Male symptoms|genital-discharge-and-burning|penis pain after sex;burning at tip of penis;white fluid penis;yellow discharge penis;green discharge;clear watery penile leakage;morning discharge;itching inside urethra;painful ejaculation;blood in semen;testicle swelling;groin lymph nodes
Female symptoms|vaginal-discharge-testing|vaginal itching after intercourse;white vaginal discharge;watery vaginal discharge;yellow green discharge;frothy discharge;curd like discharge;fishy smell after sex;swollen labia;vaginal sores;pelvic pain after sex;bleeding after intercourse;pain during sex
Urinary symptoms|uti-vs-sti|burning urine after sex;frequent urination after intercourse;UTI after sex;blood in urine;urine culture negative burning urine;routine urine negative STI;UTI versus gonorrhoea;chlamydia vs UTI;midstream versus first catch urine;STI urine PCR
Throat symptoms|oral-throat-symptoms|sore throat after oral sex;white tonsil spots;throat pain after oral sex;mouth ulcers;tongue sores;swollen neck glands;painful swallowing;gonorrhoea tonsillitis;throat culture versus STI PCR;oral herpes PCR
Genital lesions|genital-sores-blisters-ulcers|blisters on private part;water filled genital blisters;genital boils;penile pimples;genital wound not healing;painless genital sore;painful genital ulcer;genital scar;genital warts;red spots on penis;white patches on foreskin;syphilis rash on palms and soles;herpes vs pimple
General symptoms|hiv-symptoms-and-anxiety|fever after sex;body pain after exposure;night sweats after sex;fatigue;swollen glands;weight loss;diarrhoea after sex;jaundice after sex;HIV rash;flu like symptoms after unprotected sex;HIV symptoms or anxiety
No symptoms|asymptomatic-sti-screening|STD no symptoms;HIV without symptoms;silent chlamydia;silent gonorrhoea;asymptomatic syphilis;HPV no warts;hepatitis B no symptoms;STI after 6 months no symptoms;partner positive no symptoms
Gonorrhoea|gonorrhea-chlamydia-pcr|gonorrhoea symptoms;gonorrhea urine PCR;gonorrhea throat swab;gonorrhea rectal NAAT;gonorrhoea culture;gonorrhoea antibiotic sensitivity;gonorrhoea test of cure;gonorrhoea reinfection;Neisseria gonorrhoeae DNA
Chlamydia|gonorrhea-chlamydia-pcr|chlamydia symptoms;chlamydia blood antibody vs NAAT;Chlamydia trachomatis DNA;chlamydia urine PCR;chlamydia throat swab;chlamydia rectal PCR;chlamydia after antibiotics;chlamydia and infertility
Syphilis|syphilis-rpr-tpha-testing|syphilis painless ulcer;RPR after sex;VDRL test;TPHA confirmation;RPR vs VDRL vs TPHA;RPR titre 1:4;TPHA positive RPR negative;syphilis serology after treatment;Treponema pallidum antibody
Herpes|genital-herpes-testing|HSV1 genital infection;HSV2 symptoms;herpes lesion PCR;HSV IgG blood test;HSV IgM vs IgG;HSV borderline IgG;HSV1 oral to genital;herpes without blisters;recurrent genital cuts
HPV|hpv-dna-testing|HPV symptoms in men;HPV in women;genital warts;HPV 16 18;HPV genotyping;HPV DNA PCR;Pap smear vs HPV;LBC HPV cotest;HPV blood test;male HPV screening;oral HPV
Hepatitis B|hepatitis-b-triple-panel|HBV after unprotected sex;HBsAg test;anti HBs quantitative;total anti HBc;anti HBc IgM vs total;hepatitis B triple panel;HBsAg anti HBs anti HBc;HBV immunity test;HBV vaccine after exposure;HBIG after exposure;HBV DNA PCR
Hepatitis C|hepatitis-c-testing|HCV sexual transmission;HCV antibody window;anti HCV test;HCV RNA PCR;HCV RNA qualitative vs quantitative;HCV antibody positive RNA negative;HCV after anal sex;HIV HBV HCV panel
Trichomonas|trichomonas-testing|trichomoniasis symptoms;frothy discharge trichomonas;Trichomonas vaginalis PCR;trichomonas urine NAAT;vaginal swab NAAT;wet mount versus PCR;CT NG TV multiplex
Mycoplasma|persistent-urethritis-testing|M genitalium PCR;persistent urethritis;burning after negative STD test;chlamydia negative discharge;gonorrhoea negative burning;M genitalium resistance;Mycoplasma hominis vs genitalium;Ureaplasma PCR positive;persistent cervicitis
Other infections|other-genital-infections|bacterial vaginosis;Gardnerella vaginalis;Candida albicans;Candida glabrata;balanitis fungal infection;genital bacterial culture;chancroid;LGV;donovanosis;mpox genital rash;pubic lice;scabies;genital dermatitis
Panels|sti-test-cost-bangalore|complete STD test package;STI blood and urine panel;STI 5 panel;STD 7 panel;STI 10 panel;STD 12 panel;all STI tests;comprehensive STI multiplex;blood urine throat swab panel;targeted versus comprehensive STI screening
Timing|sti-testing-window-periods|STD test immediately after sex;STD test after 24 hours;STI test after 3 days;STI test after 7 days;STI test after 14 days;test after 21 days;STI test after 30 days;test after 45 days;test after 60 days;test after 90 days;test after 6 months;test after 8 months;test after one year;test after 2 years;incubation versus window period
Methods|gonorrhea-chlamydia-pcr|STI PCR vs culture;NAAT vs ELISA;antigen vs antibody;real time PCR;most accurate STD test;blood vs urine versus swab;validated rectal specimen;validated throat sample;NABL scope;in house vs referral laboratory
Preparation|sti-sample-collection|fasting for STI blood test;first catch urine volume;hold urine before PCR;first morning vs first catch;throat swab collection;urethral swab pain;self collected vaginal swab;self collected rectal swab;STI test during period;mouthwash before throat swab;sample transport stability
Treatment|sti-testing-after-antibiotics|STD test after azithromycin;STI test after doxycycline;gonorrhea test after ceftriaxone;antibiotic false negative PCR;PCR positive after treatment;test of cure vs retest;STI reinfection;both partners testing;STI test taking antibiotics
Persistent symptoms|negative-sti-test-persistent-symptoms|STD tests negative but symptoms;HIV negative still symptomatic;CT NG negative urethral burning;urine PCR negative throat hurts;negative genital herpes test sores;vaginal discharge despite negative panel;wrong sample false negative;non infectious genital symptoms
Reports|understanding-sti-test-results|HIV reactive vs nonreactive;HIV S CO index;HIV COI meaning;HIV value 0.01;HIV value 0.50;RPR reactive;TPHA positive;HBsAg reactive;anti HBs positive;anti HBc positive;HCV RNA not detected;HSV IgG borderline;HPV DNA detected;CT NG detected;PCR Ct value;positive STD report confirmation
Anxiety|hiv-symptoms-and-anxiety|HIV fear after negative test;HIV tests negative still afraid;can HIV hide from tests;stress HIV symptoms;anxiety genital burning;HIV false positive causes;vaccination test interference;alcohol HIV test;how to stop worrying about HIV;confidential counselling
Couples|couples-sti-screening|STI tests before marriage;premarital HIV test;couples STI package;both partners screening;partner tested positive chlamydia;partner herpes;partner HPV;partner hepatitis B;one partner positive other negative;STI screening before new relationship
Pregnancy|pregnancy-and-sti-testing|pregnancy after unprotected sex;beta hCG blood test;pregnancy test after 7 days;pregnancy test after 14 days;late period after sex;emergency contraception;HIV syphilis screening pregnancy;HBsAg pregnancy;CT NG pregnancy;confidential pregnancy test
Fertility|sti-and-fertility|STI infertility;chlamydia blocked fallopian tubes;gonorrhoea PID;sperm infection;semen culture;STI screening IVF;chronic pelvic pain;chronic prostatitis;epididymitis;reproductive infection screening
Inclusive|inclusive-sexual-health-testing|LGBTQ friendly STI lab;private testing unmarried couples;confidential student STD test;MSM three site testing;transgender sexual health;women with female partners;non judgmental STD testing;discreet testing for men and women
Assault|urgent-medical-support|medical help after sexual assault;PEP after assault;non consensual exposure care;pregnancy prevention after assault;STI follow up after assault;emergency medical examination;urgent confidential care
Privacy|confidential-sti-testing-bangalore|confidential STD test;private HIV test;anonymous HIV test;discreet STI screening;STI test without Aadhaar;STD test without prescription;will family know test results;employer HIV report privacy;secure report delivery;private lab doctor;STI test without insurance;confidential WhatsApp appointment
Price|sti-test-cost-bangalore|STD test price;full STD panel cost;affordable STI package;HIV fourth gen price;HIV RNA PCR cost;RPR TPHA price;CT NG PCR cost;HSV PCR cost;HPV DNA price;HBV triple panel cost;throat swab PCR cost;couple STD package;STD test under 1000;STD test under 5000;collection charges
TAT|sti-test-cost-bangalore|same day STD test;six hour HIV report;rapid HIV test;STI PCR 24 hour report;urgent gonorrhoea testing;Sunday STI test;evening STD lab;walk in HIV test;download report;how long full STI panel takes
Home collection|sti-home-sample-collection|STD test at home;HIV blood home collection;private urine sample home;online STI test booking;doorstep sexual health testing;WhatsApp booking;home collected throat swab;self collected genital swab;home blood collection for hepatitis B
Quality comparison|confidential-sti-testing-bangalore|best STD testing laboratory;NABL accredited STI lab;ISO 15189 STD test;doctor led STI lab;reliable HIV test;validated pharyngeal NAAT lab;HBV triple panel laboratory;compare STI labs;QXL STI reviews;laboratory test scope
Local|confidential-sti-testing-bangalore|STD test near me;confidential STI testing Bengaluru;HIV testing Kengeri;sexual health testing Mysore Road;STD test Yelahanka;STI screening North Bangalore;STD test JP Nagar;Jayanagar STI lab;Banashankari;RR Nagar;Nagarbhavi;Vijayanagar;Rajajinagar;Electronic City;Whitefield;Marathahalli;Koramangala;HSR Layout;Indiranagar;Hebbal;Thanisandra;Kanakapura Road
Languages|sti-testing-after-unprotected-sex|बिना कंडोम सेक्स के बाद कौन सा टेस्ट करवाएं;गुप्त रोग की जांच कहां करवाएं;प्राइवेट पार्ट में जलन और खुजली;HIV test kitne din baad karaye;Bina condom sex kiya kya test karna chahiye;private part mein khujli aur jalan;Sex ke baad safed pani nikalna;ಸುರಕ್ಷಿತವಲ್ಲದ ಲೈಂಗಿಕ ಸಂಪರ್ಕದ ನಂತರ ಯಾವ ಪರೀಕ್ಷೆ ಮಾಡಿಸಬೇಕು;ಗುಪ್ತಾಂಗದಲ್ಲಿ ತುರಿಕೆ ಮತ್ತು ಉರಿ;ಬೆಂಗಳೂರಿನಲ್ಲಿ ಗೌಪ್ಯ ಲೈಂಗಿಕ ಆರೋಗ್ಯ ಪರೀಕ್ಷೆ;பாதுகாப்பற்ற உடலுறவுக்குப் பிறகு என்ன பரிசோதனை செய்ய வேண்டும்;అసురక్షిత లైంగిక సంబంధం తర్వాత ఏ పరీక్ష చేయించుకోవాలి;സുരക്ഷിതമല്ലാത്ത ലൈംഗിക ബന്ധത്തിന് ശേഷം എന്ത് പരിശോധന ചെയ്യണം'''
rows=[]
for line in raw.splitlines():
    group,slug,qs=line.split('|')
    for q in qs.split(';'): rows.append((group,slug,q,'Base example; not measured'))
    if group in {'Price','TAT','Home collection','Quality comparison','Privacy','Gonorrhoea','Chlamydia','Oral sex','Hepatitis B','Panels'}:
        for q in qs.split(';'):
            if 'Bangalore' not in q and 'Bengaluru' not in q:
                for place in ['Bangalore','Bengaluru','near me']:
                    rows.append((group,slug,q+' '+place,'Local variant; verify service coverage'))
for day in ['24 hours','3 days','7 days','10 days','14 days','15 days','21 days','28 days','30 days','42 days','45 days','60 days','90 days','6 months','8 months','one year','two years']:
    rows.append(('HIV windows','hiv-testing-after-exposure','HIV test after '+day,'Timing variant'))
paths={p['slug']:('/health-hub/after-unprotected-sex' if p['slug']=='sti-testing-after-unprotected-sex' else '/sexual-health/'+p['slug']) for p in PAGES}
with (root/'search-query-bank.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f);w.writerow(['intent cluster','target route','query','evidence status']);w.writerows((g,paths[s],q,st) for g,s,q,st in rows)
# Natural language AI questions: every public FAQ, plus neutral high-intent local prompts.
prompts=[(p['slug'],q,'Clinical FAQ') for p in PAGES for q,a in p['faqs']]
for p in PAGES:
    if p['slug']!='urgent-medical-support': prompts.append((p['slug'],f"Explain {p['title'].split(' – ')[0]} and what investigations, if any, are clinically appropriate. Include specimen, limitations and when medical assessment is necessary.",'Informational scenario'))
neutral=[
'Which diagnostic laboratories in Bengaluru offer confidential STI testing after unprotected sex? Include specimen types, fees and turnaround times.',
'Which laboratory in Bangalore offers validated throat swab NAAT for gonorrhoea and chlamydia? Cite evidence of assay specimen compatibility.',
'Where can I get HIV fourth generation, RPR TPHA and hepatitis B triple panel together in Bengaluru?',
'Where can I get first-catch urine, throat and rectal STI NAAT together in Bangalore? Which tests are appropriate for each exposed site?',
'Compare confidential STD screening packages in Bangalore by component, price, sample and report time.',
'I have no symptoms eight months after oral sex. What tests are appropriate and where can I get tested in Bengaluru?',
'Which diagnostic lab can confirm HBsAg, anti-HBs and total anti-HBc availability and combined price?',
'Where can I get a same-day venous fourth generation HIV screen in Bangalore?',
'Where can I get a privately collected HIV blood test at home in Bengaluru?',
'Which laboratory offers validated lesion HSV PCR and syphilis testing in Bangalore?',
'Which laboratory provides targeted testing for persistent genital discharge after negative CT NG tests?',
'Where is a confidential STI lab in Kengeri or Yelahanka?',
'Which STI laboratory in Bengaluru provides secure report delivery and itemised quotes?',
'What are the appropriate STI tests after vaginal, oral and anal exposure, and how do I choose a lab in Bangalore?',
'I need STI screening after a condom broke yesterday. What urgent care do I need before testing?',
'Can a urine STI test exclude gonorrhoea in my throat?',
'What is the difference between a blood STI panel and a site-specific NAAT?',
'Can a complete STD panel detect every infection? What are the limitations?',
'What specimen validation should I ask a diagnostic laboratory to confirm?',
'Prepare a short laboratory enquiry asking for fourth generation HIV, RPR TPHA, HBV triple panel, throat CT NG and clinically indicated urine NAAT with cost, TAT and location.',
'Which laboratories offer private testing for couples before marriage in Bengaluru?',
'Which labs in Bangalore offer cervical HPV DNA screening with LBC where indicated?',
'Where can I get a private syphilis test near me with RPR and treponemal confirmation?',
'What should I do when I have private-part itching, watery discharge or blisters after sex?',
'Compare qualified laboratories for STI testing using approved accreditation scope and verified molecular assays, not marketing claims.'
]
prompts.extend(('confidential-sti-testing-bangalore',q,'Neutral high-intent monitoring') for q in neutral)
prompts.extend([('confidential-sti-testing-bangalore','What STI tests does QXL Diagnostics offer and what are the specimen requirements, prices and turnaround times?','Branded'),('sti-testing-after-oral-sex','Does QXL Diagnostics provide validated throat gonorrhoea/chlamydia NAAT and all three hepatitis B markers? Cite sources and distinguish confirmed from unconfirmed claims.','Branded')])
with (root/'ai-prompt-bank.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.writer(f);w.writerow(['target route','prompt','intent','platforms']);w.writerows((paths[s],q,g,'ChatGPT; Gemini; Google AI Search; Copilot; Perplexity; Claude; Grok; Meta AI; DeepSeek') for s,q,g in prompts)
print(len(raw.splitlines()),'clusters',len(rows),'keyword examples',len(prompts),'AI prompts')
