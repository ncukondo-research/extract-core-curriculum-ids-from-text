export const prompt = `I will present a medical student's clinical training record and the objectives a medical student should experience during clinical training. Please read the clinical training record of the medical student and output the objectives the student experienced, using comma-separated IDs. Do not include explanations or verifications in your output.

First, I will show the objectives that should be experienced.

# Objectives

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
