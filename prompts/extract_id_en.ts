export const prompt = `I will present a medical student's clinical training record and the objectives a medical student should experience during clinical training. Please read the clinical training record of the medical student and output the objectives the student experienced, using comma-separated IDs. Do not include explanations or verifications in your output.

First, I will show the objectives that should be experienced.

# Objectives

## Objectives: diseases

item,id
JlvnlXM,Iron-deficiency anemia
JlvnlYM,Vitamin B12 deficiency anemia
JlvnlZE,Disseminated intravascular coagulation (DIC)
JlvnlcA,Cerebral hemorrhage
JlvnlcE,Subarachnoid hemorrhage
JlvnlcQ,Cerebral infarction
JlvnlcY,Transient ischemic attack
Jlvnlcw,Encephalitis/meningitis
JlvnldE,Multiple sclerosis
JlvnldM,Alzheimer’s disease
Jlvnldc,Parkinson’s disease
JlvnleU,Myasthenia gravis
Jlvnleo,Generalized epilepsy
Jlvnles,Localization-related (focal) epilepsy
Jlvnle0,Migraine
Jlvnle8,Tension-type headache
JlvnlfU,Acute extradural hematoma
JlvnlfY,Subdural hematoma (acute/chronic)
JlvnlgE,Eczema (including the ‘eczema triangle’, a diagram mapping eczema progression)
JlvnlgM,Contact dermatitis
JlvnlgQ,Atopic dermatitis
Jlvnlg4,Urticaria
Jlvnlh8,Stevens-Johnson syndrome
Jlvnljk,Cellulitis
Jlvnlj8,Scabies
Jlvnlk8,Rashes occurring in the context of acquired immunodeficiency syndrome (AIDS) including syphilis, refractory herpes, molluscum contagiosum, Kaposi’s sarcoma etc.
JlvnlkE,Herpes simplex virus
JlvnlkM,Shingles
Jlvnlkc,Measles
Jlvnlkk,Rubella
Jlvnlko,Chicken pox
JlvnlmI,Bedsores
Jlvnlpc,Spinal cord injury
Jlvnlnk,Bone fracture
Jlvnlnw,Osteoporosis
Jlvnlpg,Herniated intervertebral disc
Jlvnlpo,Spinal stenosis
Jlvnloc,Osteoarthritis
Jlvnlr8,Exertional angina
JlvnlsE,Variant angina/Prinzmetal angina
JlvnlsI,Unstable angina
JlvnlsQ,Acute myocardial infarction
Jlvnlsc,Atrioventricular block
Jlvnlsg,Atrial fibrillation
Jlvnlso,Atrial flutter
Jlvnlsw,Paroxysmal supraventricular tachycardia
Jlvnls0,Ventricular tachycardia
JlvnltA,Ventricular fibrillation
JlvnltI,Extrasystoles (supraventricular and ventricular)
Jlvnltg,Mitral valve disease (stenosis and regurgitation)
Jlvnlts,Aortic valve disease (stenosis and regurgitation)
JlvnluA,Idiopathic cardiomyopathy (hypertrophic, dilated, restrictive)
JlvnluY,Acute myocarditis
Jlvnlug,Infective endocarditis
JlvnlvY,Acute aortic dissection
Jlvnlvc,Aortic aneurysm (thoracic and abdominal)
Jlvnlvk,Arteriosclerosis obliterans
Jlvnlv0,Deep vein thrombosis
JlvnlwI,Varicose veins of the lower extremities
Jlvnlwo,Orthostatic hypotension
JlvnlxA,Acute upper respiratory tract infection
JlvnlxI,Tonsillitis
J-RA37E,Bronchitis
Jlvnlxc,Pneumonia (typical and atypical)
Jlvnlxg,Pulmonary tuberculosis
JlvnlyE,Chronic obstructive pulmonary disease (COPD)
JlvnlyQ,Bronchial asthma (including cough variant asthma)
JlvnlzI,Pulmonary thromboembolism
Jlvnl0I,Sleep apnea
J-RA9r4,Acute respiratory distress syndrome (ARDS)
Jlvnl1A,Pneumothorax (spontaneous/ tension/ traumatic)
Jlvnl2E,Esophageal varices/gastric varices
Jlvnl2M,Gastroesophageal reflux disease (GERD)
Jlvnl2k,Peptic ulcer disease (gastric and duodenal)
Jlvnl3Q,Functional gastrointestinal disorders (functional dyspepsia)
Jlvnl3k,Acute appendicitis
Jlvnl3o,Intestinal obstruction
Jlvnl30,Hemorrhoids
Jlvnl4o,Constipation
Jlvnl34,Functional gastrointestinal disorders (irritable bowel syndrome)
Jlvnl3s,Ulcerative colitis
Jlvnl3w,Crohn’s disease
Jlvnl28,Acute gastroenteritis
Jlvnl50,Hepatitis A
Jlvnl54,Hepatitis B
Jlvnl6A,Hepatitis C
Jlvnl6Q,Acute hepatitis
Jlvnl6Y,Chronic hepatitis
Jlvnl6g,Acute liver failure
Jlvnl7c,Fatty liver
Jlvnl64,Alcoholic liver disease
Jlvnl6k,Portal hypertension
Jlvnl6s,Hepatic encephalopathy
Jlvnl6w,Liver cancer
Jlvnl5M,Cholelithiasis
Jlvnl5U,Cholecystitis
Jlvnl5Y,Cholangitis
Jlvnl7k,Acute pancreatitis (alcoholic/biliary/idiopathic)
Jlvnl7o,Chronic pancreatitis (alcoholic/idiopathic)
Jlvnl70,Peritonitis
Jlvnl8E,Inguinal hernia
Jlvnl8Q,Acute kidney injury (AKI)
Jlvnl8U,Chronic kidney disease (CKD)
Jlvnl8g,Hyper- and hyponatremia
Jlvnl8o,Hyper- and hypokalemia
Jlvnl8s,Hyper- and hypocalcemia
Jlvnl9M,Acute glomerulonephritis
Jlvnl9U,IgA nephropathy
Jlvnl9Y,Membranous nephropathy
Jlvnl9k,Minimal change disease
Jlvnl-M,Acute pyelonephritis
Jlvnl-Q,Diabetic nephropathy
Jlvnl_I,Urinary stone disease
Jlvnl_Q,Cystitis
Jlvnl_U,Prostatitis
Jlvnl_c,Urethritis
Jlvnl_0,Enlarged prostate
JlvnmAo,Primary dysmenorrhea
JlvnmA0,Menopausal and female climacteric states
JlvnmBA,Uterine fibroids and adenomyosis of the uterus
JlvnmBE,Endometriosis
JlvnmBk,Ectopic pregnancy
JlvnmBs,Miscarriage and threatened miscarriage
JlvnmB4,Gestational hypertension
JlvnmCM,Threatened preterm labor
JlvnmCY,Preterm labor with preterm delivery
JlvnmEs,Acute leukemia
JlvnmE4,Febrile seizures
JlvnmFA,Cerebral palsy
JlvnmGY,Bronchiolitis
JlvnmGw,Intussusception
JlvnmG8,Infantile diarrhea
JlvnmHI,Inguinal hernia
JlvnmHU,Nephrotic syndrome
JlvnmK8,Hyperthyroidism
JlvnmLA,Hypothyroidism
JlvnmL0,Type 1 diabetes mellitus
JlvnmL8,Type 2 diabetes mellitus
JlvnmMA,Diabetic ketoacidosis
JlvnmMI,Hyperglycemia-hyperosmotic syndrome
JlvnmMU,Diabetic retinopathy
JlvnmMY,Diabetic nephropathy
JlvnmMg,Diabetic neuropathy
JlvnmMk,Diabetic foot
JlvnmMw,Dyslipidemia (dyslipidemia, dyslipidemia)
JlvnmNE,Hyperuricemia/gout
JlvnmNs,Conjunctivitis/keratitis
JlvnmN4,Cataract
JlvnmN8,Glaucoma
JlvnmOQ,Fundus changes due to diabetes and hypertension (e.g., diabetic retinopathy)
JlvnmO0,Otitis media (acute, chronic, exudative, pearly)
JlvnmPg,Benign paroxysmal positional vertigo
JlvnmPo,Ménière’s disease
JlvnmP0,Nosebleed
JlvnmP4,Sinusitis (acute/chronic)
JlvnmQA,Allergic rhinitis
JlvnmQU,Pharyngitis
JlvnmTI,Cervical lymph node metastasis, etc.
JlvnmT0,Major depressive disorder
JlvnmT4,Bipolar disorder (manic-depressive illness)
JlvnmUA,Schizophrenia
JlvnmUY,Somatic symptom disorder, pain disorder, hypochondriasis
JlvnmTU,Dementia
JmxLo0Y,Rheumatoid arthritis
JmxLo0g,Systemic lupus erythematosus (SLE) and complications (central nervous system lupus, lupus nephritis, and antiphospholipid antibody syndrome)
JlvnmWs,IgA vasculitis
JlvnmW0,Kawasaki disease
JmxLo1A,Acquired immunodeficiency syndrome (AIDS)
JlvnmXE,Meningoencephalitis
JlvnmXY,Bloodstream infection and infective endocarditis
JlvnmXo,Cystitis/pyelonephritis
JlvnmX4,Intravascular indwelling catheter-related infection
JlvnmX8,Catheter-associated urinary tract infection
JlvnmYI,Surgical site infection
JlvnmcI,Lung cancer
Jlvnmcg,Esophageal cancer
Jlvnmco,Gastric cancer
Jlvnmc0,Colorectal cancer
JlvnmdA,Primary liver cancer
JlvnmdQ,Pancreatic cancer
JlvnmdY,Kidney cancer
Jlvnmdg,Cancer of the renal pelvis and ureter, bladder cancer
Jlvnmdk,Prostate cancer
Jlvnmdw,Cervical cancer
Jlvnmd4,Uterine cancer (endometrial cancer)
JlvnmeA,Ovarian tumor
JlvnmeQ,Primary breast cancer

## Objectives: Symptoms

item,id
Fever,JlAK6lk
General malaise,JlAK6lo
Anorexia,JlAK6ls
Weight loss,JlAK6lw
Weight gain,JlAK6l0
Altered mental status,JlAK6l4
Syncope,JlAK6l8
Seizure,JlAK6mA
Vertigo and dizziness,JlAK6mE
Edema,JlAK6mI
Rash,JlAK6mM
Cough and sputum production,JlAK6mQ
Blood in sputum and hemoptysis,JlAK6mU
Dyspnea,JlAK6mY
Chest pain,JlAK6mc
Palpitations,JlAK6mg
Dysphagia,JlAK6mk
Abdominal pain,JlAK6mo
Nausea and vomiting,JlAK6ms
Hematemesis,JlAK6mw
Melena,JlAK6m0
Constipation,JlAK6m4
Diarrhea,JlAK6m8
Jaundice,JlAK6nA
Abdominal distention and abdominal mass,JlAK6nE
Lymphadenopathy,JlAK6nI
Abnormal urine output/urination,JlAK6nM
Hematuria,JlAK6nQ
Menstrual abnormality,JlAK6nU
Anxiety/depression,JlAK6nY
Cognitive dysfunction,JlAK6nc
Headache,JlAK6ng
Skeletal muscle paralysis/muscle weakness,JlAK6nk
Gait disturbance,JlAK6no
Sensory disturbance,JlAK6ns
Back pain,JlAK6nw
Arthralgia/joint swelling,JlAK6n0


## Objectives: Major clinical and diagnostic imaging tests

item,id
Full blood count,JkxirwY
Blood biochemistry,Jli6WW4
Coagulation/fibrinolysis,Jli6WW8
Immunoserology tests,Jli6WXE
Urinalysis,Jli6WXI
Stool (fecal) examination,Jli6WXQ
Blood typing (ABO, RhD), blood compatibility test (cross-matching), atypical antibody screening,Jkxir08
Arterial blood gas analysis,JkxirxY
Pregnancy test,Jkxiryk
Microbiological tests (bacterial smear, culture, identification, antibiotic sensitivity test),JkxirxU
Cerebrospinal fluid,Jkxirxc
Pleural fluid analysis,Jli6TOw
Peritoneal fluid analysis,Jli6TO0
Histopathology and cytology (including intraoperative rapid diagnosis),Jkxirwk
Genetic testing and chromosome analysis,Jkxirwg
ECG,JkxirxQ
Lung function tests,Jli6Y7U
Endocrine and metabolic function tests,Jli6Y7Y
Electroencephalography,Jli6Y7c
Ultrasound,JkxirxA
X-ray,Jkxirw4
CT,Jli6aBM
MRI,Jli6aBU
Nuclear medicine examination,Jkxirxk
Endoscopy,Jkxirw8


## Objectives: Basic clinical techniques

item	id
Position change, transfer	JlAKx_k
Skin antisepsis	Jub5cSY
Application of topical medications	Jub5cSc
Airway suction	JlAKx_s
Nebulizer	Jub5dh8
Venous blood sampling	JlAKx_w
Peripheral venous catheterization	JlAKx_0
Insertion and extraction of nasogastric tube	JlAKyAA
Insertion and extraction of urinary catheter	JlAKyAE
Intradermal injection	JlAKyAI
Subcutaneous injection	JlAKyAQ
Intramuscular injection	JlAKyAU
Intravenous injection	JlAKyAY
Urinalysis (including pregnancy test)	Jub5eUA
Microbiological testing (including gram staining)	JlAKyAc
Recording of a 12-lead ECG	JlAKyAg
Rapid bedside ultrasound (including FAST) for clinical decision-making	JlAKyAk
Rapid antigen/pathogen testing	JlAKyAs
Blood glucose test	JlAKyAw
Aseptic technique	JlAKyA0
Surgical hand washing	JlAKyA4
Gowning techniques in the operating room	JlAKyA8
Basic sutures and suture removal	JlAKyBA

Below, I present the clinical clerkship record of a medical student.

# clinical clerkship record
`
