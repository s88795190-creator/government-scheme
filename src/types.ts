export type Language = 'en' | 'ta';

export type EligibilityStatus = 'Eligible' | 'Needs Documents' | 'Not Eligible';

export interface DigiLockerDocument {
  id: string;
  docType: 'Aadhaar' | 'Income Certificate' | 'Native / Community Certificate' | 'Marksheet (10th/12th)' | 'Ration Card' | 'Land Patta / Chitta' | 'Disability Certificate' | 'Bank Passbook';
  docNumber: string;
  holderName: string;
  issueDate: string;
  issuer: string;
  status: 'verified' | 'pending' | 'missing';
  extractedData: {
    age?: number;
    gender?: 'Male' | 'Female' | 'Other';
    dob?: string;
    annualIncome?: number;
    educationLevel?: string;
    state?: string;
    district?: string;
    communityCategory?: string;
    landAcres?: number;
    disabilityPercentage?: number;
    address?: string;
    aadhaarLast4?: string;
  };
  rawText?: string;
  iconName?: string;
}

export interface CitizenProfile {
  name: string;
  gender: 'Female' | 'Male' | 'Other';
  dob: string;
  age: number;
  state: string;
  district: string;
  areaType: 'Rural' | 'Urban';
  occupation: 'Student' | 'Farmer' | 'Artisan / Skilled Worker' | 'Senior Citizen' | 'Unemployed' | 'Entrepreneur / Self-Employed' | 'Housewife / SHG Member';
  education: 'School (Class 6-12)' | 'College UG Student' | 'Diploma / ITI' | 'Graduate' | 'Post Graduate' | 'Uneducated / Primary';
  annualIncome: number;
  category: 'General' | 'OBC / BC / MBC' | 'SC' | 'ST' | 'Minority';
  landOwnershipAcres: number;
  disabilityPercentage: number;
  isGovernmentSchoolStudent: boolean;
  electricityUsageUnitsPerYear: number;
  digiLockerConnected: boolean;
  connectedDocTypes: string[];
}

export interface GovernmentScheme {
  id: string;
  title: string;
  titleTamil: string;
  sector: 'Education' | 'Agriculture' | 'Women Empowerment' | 'Health & Insurance' | 'Housing & Pension' | 'MSME & Skill';
  level: 'Central Government' | 'Tamil Nadu State Government';
  description: string;
  descriptionTamil: string;
  benefits: string;
  benefitsTamil: string;
  requiredDocuments: string[];
  eligibilityConditions: {
    minAge?: number;
    maxAge?: number;
    gender?: ('Female' | 'Male')[];
    maxIncome?: number;
    occupation?: string[];
    education?: string[];
    stateConstraint?: string;
    isGovtSchoolRequired?: boolean;
    maxLandAcres?: number;
  };
  officialPortalName: string;
  officialPortalUrl: string;
  applicationSteps: string[];
  applicationStepsTamil: string[];
}

export interface SchemeMatchResult {
  schemeId: string;
  status: EligibilityStatus;
  matchScore: number; // 0 to 100
  reasons: string[];
  reasonsTamil: string[];
  missingDocuments: string[];
  verifiedDocuments: string[];
  aiNotes?: string;
  aiNotesTamil?: string;
}

export interface SchemeApplication {
  id: string;
  schemeId: string;
  schemeTitle: string;
  schemeTitleTamil: string;
  citizenName: string;
  submittedAt: string;
  referenceNo: string;
  status: 'Draft' | 'DigiLocker Verified' | 'Application Generated' | 'Submitted to Nodal API' | 'Under Verification' | 'Sanctioned';
  prefilledData: Record<string, string>;
  attachedDocIds: string[];
  amountOrBenefit: string;
  remarks?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedSchemes?: string[];
}
