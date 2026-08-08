import { GovernmentScheme } from '../types';

export const SCHEMES_DATABASE: GovernmentScheme[] = [
  {
    id: 'scheme-pudhumai-penn',
    title: 'Moovalur Ramamirtham Ammayar Higher Education Assurance Scheme (Pudhumai Penn)',
    titleTamil: 'மூவலூர் இராமாமிர்தம் அம்மையார் உயர்கல்வி உறுதித் திட்டம் (புதுமைப் பெண்)',
    sector: 'Education',
    level: 'Tamil Nadu State Government',
    description: 'Financial assistance of ₹1,000 per month directly deposited into bank accounts of female students who studied in Govt schools from Class 6 to 12 and are pursuing higher education.',
    descriptionTamil: '6 முதல் 12 ஆம் வகுப்பு வரை அரசுப் பள்ளிகளில் படித்து உயர்கல்வி பயிலும் மாணவிகளுக்கு மாதம் ரூ.1,000 நேரடியாக வங்கிச் கணக்கில் செலுத்தும் திட்டம்.',
    benefits: '₹1,000 / month until completion of UG Degree, Diploma, or ITI course',
    benefitsTamil: 'பட்டப்படிப்பு / பட்டயப்படிப்பு முடியும் வரை மாதம் ரூ.1,000',
    requiredDocuments: ['Aadhaar', 'Marksheet (10th/12th)', 'Bank Passbook', 'Native / Community Certificate'],
    eligibilityConditions: {
      gender: ['Female'],
      isGovtSchoolRequired: true,
      education: ['College UG Student', 'Diploma / ITI'],
      stateConstraint: 'Tamil Nadu'
    },
    officialPortalName: 'Pudhumai Penn Portal (penkalvi.tn.gov.in)',
    officialPortalUrl: 'https://penkalvi.tn.gov.in',
    applicationSteps: [
      'Verify DigiLocker HSC Marksheet & Aadhaar',
      'Select College & Course details',
      'Link NPCI-activated Aadhaar Bank Account',
      'Submit digitally to College Nodal Officer'
    ],
    applicationStepsTamil: [
      'டிஜிலாக்கர் 12வது மதிப்பெண் சான்றிதழ் மற்றும் ஆதாரைச் சரிபார்க்கவும்',
      'கல்லூரி மற்றும் படிப்பு விவரங்களைத் தேர்ந்தெடுக்கவும்',
      'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கை இணைக்கவும்',
      'கல்லூரி அலுவலருக்கு இணையம் வழியே சமர்ப்பிக்கவும்'
    ]
  },
  {
    id: 'scheme-pm-kisan',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    titleTamil: 'பிரதம மந்திரி கிசான் சம்மான் நிதி (PM-KISAN)',
    sector: 'Agriculture',
    level: 'Central Government',
    description: 'Income support scheme providing ₹6,000 per year in three equal installments to small and marginal farmer families across India.',
    descriptionTamil: 'விவசாயிக் குடும்பங்களுக்கு ஆண்டுக்கு ரூ.6,000 மூன்று தவணைகளில் நேரடியாக வழங்கும் வருமான ஆதரவுத் திட்டம்.',
    benefits: '₹6,000 per year (3 installments of ₹2,000)',
    benefitsTamil: 'ஆண்டுக்கு ரூ.6,000 (ரூ.2,000 வீதம் 3 தவணைகள்)',
    requiredDocuments: ['Aadhaar', 'Land Patta / Chitta', 'Bank Passbook'],
    eligibilityConditions: {
      occupation: ['Farmer'],
      maxLandAcres: 5
    },
    officialPortalName: 'PM KISAN Official Portal (pmkisan.gov.in)',
    officialPortalUrl: 'https://pmkisan.gov.in',
    applicationSteps: [
      'Authenticate Aadhaar via e-KYC',
      'Validate Land Patta/Chitta ownership record via DigiLocker',
      'Verify Bank IFSC and Account Number',
      'Submit for Agriculture Officer Verification'
    ],
    applicationStepsTamil: [
      'ஆதார் e-KYC மூலம் சரிபார்க்கவும்',
      'டிஜிலாக்கர் மூலம் நிலப் பட்டா சான்றிதழைச் சரிபார்க்கவும்',
      'வங்கி விவரங்களை உள்ளிடவும்',
      'வேளாண்மை அலுவலர் ஒப்புதலுக்குச் சமர்ப்பிக்கவும்'
    ]
  },
  {
    id: 'scheme-magalir-urimai',
    title: 'Kalaignar Magalir Urimai Thogai Scheme',
    titleTamil: 'கலைஞர் மகளிர் உரிமைத் தொகைத் திட்டம்',
    sector: 'Women Empowerment',
    level: 'Tamil Nadu State Government',
    description: 'Basic income entitlement scheme providing ₹1,000 per month to eligible female heads of households in Tamil Nadu to recognize unpaid domestic work.',
    descriptionTamil: 'தமிழ்நாட்டில் தகுதியுள்ள குடும்பத் தலைவிகளுக்கு மாதம் ரூ.1,000 வாழ்வாதார உதவித் தொகையாக வழங்கும் திட்டம்.',
    benefits: '₹1,000 / month (Direct Benefit Transfer)',
    benefitsTamil: 'மாதம் ரூ.1,000 (நேரடி பணப் பரிமாற்றம்)',
    requiredDocuments: ['Aadhaar', 'Ration Card', 'Income Certificate', 'Bank Passbook'],
    eligibilityConditions: {
      minAge: 21,
      gender: ['Female'],
      maxIncome: 250000,
      stateConstraint: 'Tamil Nadu',
      maxLandAcres: 5
    },
    officialPortalName: 'TN e-Seva Magalir Urimai Portal',
    officialPortalUrl: 'https://kmut.tn.gov.in',
    applicationSteps: [
      'Scan Ration Card & Aadhaar via DigiLocker',
      'Self-declare annual household income (< ₹2.5 Lakhs)',
      'Confirm electricity connection usage limits (< 3600 units/year)',
      'e-Sign & Submit to Village Administrative Officer (VAO)'
    ],
    applicationStepsTamil: [
      'ரேஷன் கார்டு மற்றும் ஆதாரை டிஜிலாக்கர் மூலம் சரிபார்க்கவும்',
      'குடும்ப ஆண்டு வருமானம் ரூ.2.5 லட்சத்திற்குள் என உறுதிப்படுத்தவும்',
      'மின்சாரப் பயன்பாட்டு வரம்பைச் சரிபார்க்கவும்',
      'கிராம நிர்வாக அலுவலர் (VAO) சரிபார்ப்புக்குச் சமர்ப்பிக்கவும்'
    ]
  },
  {
    id: 'scheme-post-matric-scholarship',
    title: 'Post-Matric Scholarship Scheme for SC/ST/BC/MBC Students',
    titleTamil: 'ஆதிதிராவிடர், பழங்குடியினர் மற்றும் பிற்படுத்தப்பட்டோர் உயர்கல்வி கல்வி உதவித்தொகை',
    sector: 'Education',
    level: 'Tamil Nadu State Government',
    description: '100% tuition fee waiver, compulsory non-refundable fees, and monthly maintenance allowance for post-secondary students from reserved community categories.',
    descriptionTamil: 'பிற்படுத்தப்பட்ட, ஆதிதிராவிட மற்றும் பழங்குடியின மாணவர்களுக்கு முழு கல்விக் கட்டண விலக்கு மற்றும் பராமரிப்புப்படி வழங்கும் திட்டம்.',
    benefits: '100% Tuition Fee Waiver + Maintenance Allowance up to ₹10,000/year',
    benefitsTamil: '100% கல்விக் கட்டண விலக்கு + ஆண்டிற்கு ரூ.10,000 வரை பராமரிப்புத் தொகை',
    requiredDocuments: ['Aadhaar', 'Native / Community Certificate', 'Income Certificate', 'Marksheet (10th/12th)', 'Bank Passbook'],
    eligibilityConditions: {
      maxIncome: 250000,
      education: ['College UG Student', 'Post Graduate', 'Diploma / ITI'],
      stateConstraint: 'Tamil Nadu'
    },
    officialPortalName: 'TN Scholarship Portal (tn.gov.in/scholarship)',
    officialPortalUrl: 'https://tn.gov.in/scholarships',
    applicationSteps: [
      'Extract Community & Income Certificates from DigiLocker',
      'Enter Institutional roll number and fee structure',
      'Verify Bank Account details',
      'Submit application to District Welfare Officer'
    ],
    applicationStepsTamil: [
      'சமூகச் சான்றிதழ் மற்றும் வருமானச் சான்றிதழை டிஜிலாக்கரிலிருந்து பெறவும்',
      'கல்லூரி கட்டண விவரங்களை உள்ளிடவும்',
      'வங்கி கணக்கைச் சரிபார்க்கவும்',
      'மாவட்ட நல அலுவலருக்குச் சமர்ப்பிக்கவும்'
    ]
  },
  {
    id: 'scheme-naan-mudhalvan',
    title: 'Tamil Nadu Naan Mudhalvan Skill & Employability Scheme',
    titleTamil: 'நான் முதல்வன் திறன் மேம்பாட்டு மற்றும் வேலைவாய்ப்புத் திட்டம்',
    sector: 'MSME & Skill',
    level: 'Tamil Nadu State Government',
    description: 'State flagship skill initiative offering free industrial courses in AI, coding, robotics, healthcare, finance, and career mentorship for students across Tamil Nadu.',
    descriptionTamil: 'தமிழ்நாடு மாணவர்களுக்கு இலவச செயற்கை நுண்ணறிவு, மென்பொருள், மற்றும் தொழிற்திறன் பயிற்சிகள் வழங்கும் முன்னணி திட்டம்.',
    benefits: 'Free Industry Certifications, Upskilling Modules & Direct Campus Placement Drive access',
    benefitsTamil: 'இலவச சான்றிதழ் பயிற்சிகள் மற்றும் வேலைவாய்ப்பு முகாம் வாய்ப்புகள்',
    requiredDocuments: ['Aadhaar', 'Marksheet (10th/12th)'],
    eligibilityConditions: {
      education: ['School (Class 6-12)', 'College UG Student', 'Diploma / ITI', 'Graduate'],
      stateConstraint: 'Tamil Nadu'
    },
    officialPortalName: 'Naan Mudhalvan Portal (naanmudhalvan.tn.gov.in)',
    officialPortalUrl: 'https://naanmudhalvan.tn.gov.in',
    applicationSteps: [
      'Authorize Student Identity via DigiLocker Educational Documents',
      'Choose preferred technology skill domain',
      'Enroll in free online/offline batch',
      'Receive Govt Skill Certification'
    ],
    applicationStepsTamil: [
      'டிஜிலாக்கர் மூலம் மாணவர் விவரங்களைச் சரிபார்க்கவும்',
      'விருப்பமான தொழில் நுட்பப் பாடத்தைத் தேர்ந்தெடுக்கவும்',
      'இலவச பயிற்சியில் இணையவும்',
      'அரசு சான்றிதழைப் பெறவும்'
    ]
  },
  {
    id: 'scheme-cmchis-ayushman',
    title: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS / Ayushman Bharat)",
    titleTamil: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம் (CMCHIS)',
    sector: 'Health & Insurance',
    level: 'Tamil Nadu State Government',
    description: 'Provides cashless medical treatment and surgical coverage up to ₹5 Lakhs per family per year in empanelled government and private hospitals.',
    descriptionTamil: 'ஆண்டுக்குக் குடும்பத்திற்கு ரூ.5 லட்சம் வரை அரசு மற்றும் தனியார் மருத்துவமனைகளில் பணமில்லா மருத்துவச் சிகிச்சை வழங்கும் திட்டம்.',
    benefits: 'Cashless Medical Treatment up to ₹5,000,000 / family / year',
    benefitsTamil: 'ஆண்டுக்கு ரூ.5,00,000 வரை இலவச மருத்துவச் சிகிச்சை',
    requiredDocuments: ['Aadhaar', 'Ration Card', 'Income Certificate'],
    eligibilityConditions: {
      maxIncome: 120000,
      stateConstraint: 'Tamil Nadu'
    },
    officialPortalName: 'CMCHIS Official Portal (cmchis.tn.gov.in)',
    officialPortalUrl: 'https://cmchis.tn.gov.in',
    applicationSteps: [
      'Fetch Smart Ration Card details via DigiLocker',
      'Validate Income Certificate status (< ₹1.2 Lakhs/year)',
      'Generate e-Health Card with unique URN',
      'Present at Kiosk in Empanelled Hospitals'
    ],
    applicationStepsTamil: [
      'ஸ்மார்ட் ரேஷன் கார்டை டிஜிலாக்கர் மூலம் எடுக்கவும்',
      'வருமானச் சான்றிதழைச் சரிபார்க்கவும் (ரூ.1.2 லட்சத்திற்குள்)',
      'மருத்துவக் காப்பீட்டு அட்டை பெறவும்',
      'அங்கீகரிக்கப்பட்ட மருத்துவமனைகளில் சிகிச்சை பெறவும்'
    ]
  },
  {
    id: 'scheme-pm-vishwakarma',
    title: 'PM Vishwakarma Scheme for Artisans & Craftspeople',
    titleTamil: 'பிரதம மந்திரி விஸ்வகர்மா திட்டம் (கைவினைஞர்களுக்கான நிதி உதவி)',
    sector: 'MSME & Skill',
    level: 'Central Government',
    description: 'Comprehensive support for traditional artisans including collateral-free loans up to ₹3 Lakhs at 5% interest, ₹15,000 toolkit incentive, and daily stipend during training.',
    descriptionTamil: 'பாரம்பரிய கைவினைஞர்களுக்கு ரூ.3 லட்சம் வரை குறைந்த வட்டியில் கடன், ரூ.15,000 இலவச உபகரண ஊக்கத்தொகை மற்றும் பயிற்சி நிதி வழங்கும் திட்டம்.',
    benefits: '₹15,000 Toolkit E-Voucher + ₹3 Lakh Loan @ 5% interest + ₹500/day stipend during skill training',
    benefitsTamil: 'ரூ.15,000 உபகரண நிதி + ரூ.3 லட்சம் வரை 5% வட்டியில் கடன் + பயிற்சி நேரத்தில் நாள் ஒன்றுக்கு ரூ.500',
    requiredDocuments: ['Aadhaar', 'Income Certificate', 'Bank Passbook', 'Native / Community Certificate'],
    eligibilityConditions: {
      minAge: 18,
      occupation: ['Artisan / Skilled Worker', 'Entrepreneur / Self-Employed']
    },
    officialPortalName: 'PM Vishwakarma Portal (pmvishwakarma.gov.in)',
    officialPortalUrl: 'https://pmvishwakarma.gov.in',
    applicationSteps: [
      'Verify Artisan trade category & Aadhaar e-KYC',
      'Complete 5-day Basic Skill Training registration',
      'Receive ₹15,000 Toolkit E-Voucher code',
      'Apply for Phase-1 Collateral Free Loan'
    ],
    applicationStepsTamil: [
      'கைவினைத் தொழில் மற்றும் ஆதாரைச் சரிபார்க்கவும்',
      '5 நாள் அடிப்படைத் திறன் பயிற்சியில் பதிவு செய்யவும்',
      'ரூ.15,000 கருவி நிதி பெறவும்',
      'குறைந்த வட்டி கடனுக்கு விண்ணப்பிக்கவும்'
    ]
  },
  {
    id: 'scheme-oap-pension',
    title: 'Indira Gandhi National Old Age Pension & TN Senior Citizen Pension',
    titleTamil: 'முதியோர் உதவித்தொகைத் திட்டம் (Senior Citizen Pension)',
    sector: 'Housing & Pension',
    level: 'Tamil Nadu State Government',
    description: 'Monthly pension of ₹1,000 provided to destitute senior citizens aged 60 and above who do not have adequate family support or source of income.',
    descriptionTamil: '60 வயதிற்கு மேற்பட்ட ஆதரவற்ற முதியவர்களுக்கு மாதம் ரூ.1,000 ஓய்வூதியம் வழங்கும் திட்டம்.',
    benefits: '₹1,000 / month Pension + Free Rice allowance',
    benefitsTamil: 'மாதம் ரூ.1,000 முதியோர் ஓய்வூதியம் + இலவச அரிசி',
    requiredDocuments: ['Aadhaar', 'Income Certificate', 'Native / Community Certificate', 'Bank Passbook'],
    eligibilityConditions: {
      minAge: 60,
      maxIncome: 100000,
      stateConstraint: 'Tamil Nadu'
    },
    officialPortalName: 'TN Social Welfare Pension Portal',
    officialPortalUrl: 'https://tnesevai.tn.gov.in',
    applicationSteps: [
      'Verify Age proof via Aadhaar in DigiLocker',
      'Verify Destitution / Income status via VAO e-Seva report',
      'Validate Direct Bank Account details',
      'Submit to Revenue Inspector (RI) for doorstep sanction'
    ],
    applicationStepsTamil: [
      'ஆதார் மூலம் வயதுச் சான்றைச் சரிபார்க்கவும்',
      'வருமானச் சான்றிதழ் மற்றும் ஆதரவற்ற நிலையினைச் சரிபார்க்கவும்',
      'வங்கி விவரங்களை உள்ளிடவும்',
      'வருவாய் ஆய்வாளர் (RI) ஒப்புதலுக்குச் சமர்ப்பிக்கவும்'
    ]
  },
  {
    id: 'scheme-differently-abled',
    title: 'TN Welfare Pension & Battery Wheelchair Scheme for Persons with Disabilities',
    titleTamil: 'மாற்றுத்திறனாளிகளுக்கான மாத உதவித்தொகை & உபகரண திட்டம்',
    sector: 'Housing & Pension',
    level: 'Tamil Nadu State Government',
    description: 'Monthly pension of ₹1,500 to ₹2,000 and free battery-operated motorized wheelchairs / hearing aids for persons with 40% or higher disability benchmark.',
    descriptionTamil: '40% அல்லது அதற்கு மேற்பட்ட மாற்றுத்திறனாளிகளுக்கு மாதம் ரூ.1,500-2,000 உதவித்தொகை மற்றும் இலவச மின்கல சக்கர நாற்காலி வழங்கும் திட்டம்.',
    benefits: '₹1,500 to ₹2,000 / month pension + Free Battery Wheelchair / Assistive Devices',
    benefitsTamil: 'மாதம் ரூ.1,500 - ரூ.2,000 + இலவச நவீன சக்கர நாற்காலி',
    requiredDocuments: ['Aadhaar', 'Disability Certificate', 'Income Certificate', 'Bank Passbook'],
    eligibilityConditions: {
      stateConstraint: 'Tamil Nadu'
    },
    officialPortalName: 'TN Disability Welfare Department Portal',
    officialPortalUrl: 'https://scda.tn.gov.in',
    applicationSteps: [
      'Fetch UDID / Disability Certificate from DigiLocker',
      'Validate Aadhaar identity & residence proof',
      'Choose required assistive device (Wheelchair / Hearing aid / Pension)',
      'Submit to District Differently Abled Welfare Officer (DDAWO)'
    ],
    applicationStepsTamil: [
      'மாற்றுத்திறனாளி சான்றிதழை டிஜிலாக்கரிலிருந்து பெறவும்',
      'முகவரி மற்றும் ஆதாரைச் சரிபார்க்கவும்',
      'தேவையான உதவி உபகரணத்தைத் தேர்ந்தெடுக்கவும்',
      'மாவட்ட மாற்றுத்திறனாளிகள் நல அலுவலருக்குச் சமர்ப்பிக்கவும்'
    ]
  }
];
