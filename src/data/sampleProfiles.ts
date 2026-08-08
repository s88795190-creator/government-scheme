import { CitizenProfile, DigiLockerDocument } from '../types';

export interface SamplePerson {
  id: string;
  label: string;
  labelTamil: string;
  roleDescription: string;
  profile: CitizenProfile;
  documents: DigiLockerDocument[];
}

export const SAMPLE_PERSONAS: SamplePerson[] = [
  {
    id: 'persona-student',
    label: 'Selvi Anbarasi',
    labelTamil: 'செல்வி அன்பரசி',
    roleDescription: '19 yr female, Govt School Student, Pursuing B.E. Computer Science, Chennai',
    profile: {
      name: 'Selvi Anbarasi',
      gender: 'Female',
      dob: '2007-04-12',
      age: 19,
      state: 'Tamil Nadu',
      district: 'Chennai',
      areaType: 'Urban',
      occupation: 'Student',
      education: 'College UG Student',
      annualIncome: 140000,
      category: 'OBC / BC / MBC',
      landOwnershipAcres: 0,
      disabilityPercentage: 0,
      isGovernmentSchoolStudent: true,
      electricityUsageUnitsPerYear: 1800,
      digiLockerConnected: true,
      connectedDocTypes: ['Aadhaar', 'Marksheet (10th/12th)', 'Income Certificate', 'Native / Community Certificate', 'Bank Passbook']
    },
    documents: [
      {
        id: 'doc-aadhaar-1',
        docType: 'Aadhaar',
        docNumber: 'XXXX-XXXX-8821',
        holderName: 'Selvi Anbarasi',
        issueDate: '2018-06-15',
        issuer: 'Unique Identification Authority of India (UIDAI)',
        status: 'verified',
        extractedData: {
          age: 19,
          gender: 'Female',
          dob: '2007-04-12',
          state: 'Tamil Nadu',
          district: 'Chennai',
          aadhaarLast4: '8821',
          address: 'Door 14, Kamarajar Street, Triplicane, Chennai - 600005'
        },
        rawText: 'Government of India Unique Identification Authority of India. Name: Selvi Anbarasi. DOB: 12/04/2007. Gender: Female. Address: Chennai, Tamil Nadu.'
      },
      {
        id: 'doc-hsc-1',
        docType: 'Marksheet (10th/12th)',
        docNumber: 'TN-HSC-2024-91024',
        holderName: 'Selvi Anbarasi',
        issueDate: '2024-05-10',
        issuer: 'State Board of School Examinations, Govt of Tamil Nadu',
        status: 'verified',
        extractedData: {
          educationLevel: 'College UG Student',
          state: 'Tamil Nadu'
        },
        rawText: 'Government of Tamil Nadu Higher Secondary Examination Certificate. School: Government Higher Secondary School, Triplicane. Total Marks: 542/600. Passed in First Class.'
      },
      {
        id: 'doc-income-1',
        docType: 'Income Certificate',
        docNumber: 'TN-52024081290',
        holderName: 'Anbarasi Family (Father: Murugesan)',
        issueDate: '2025-01-20',
        issuer: 'Revenue Department, Government of Tamil Nadu (e-Seva)',
        status: 'verified',
        extractedData: {
          annualIncome: 140000,
          state: 'Tamil Nadu',
          district: 'Chennai'
        },
        rawText: 'This is to certify that the total annual household income of Selvi Anbarasi from all sources is Rs. 1,40,000 (Rupees One Lakh Forty Thousand Only).'
      },
      {
        id: 'doc-community-1',
        docType: 'Native / Community Certificate',
        docNumber: 'TN-32024018241',
        holderName: 'Selvi Anbarasi',
        issueDate: '2022-08-11',
        issuer: 'Tahsildar, Chennai South, Tamil Nadu',
        status: 'verified',
        extractedData: {
          communityCategory: 'OBC / BC / MBC',
          state: 'Tamil Nadu'
        },
        rawText: 'Certified that Selvi Anbarasi belongs to Backward Class (BC) Community recognized by Govt of Tamil Nadu.'
      },
      {
        id: 'doc-bank-1',
        docType: 'Bank Passbook',
        docNumber: 'SB-8820194821',
        holderName: 'Selvi Anbarasi',
        issueDate: '2024-06-01',
        issuer: 'Indian Bank, Triplicane Branch (IFSC: IDIB000T042)',
        status: 'verified',
        extractedData: {
          aadhaarLast4: '8821'
        },
        rawText: 'Indian Bank Savings Account. Account Holder: Selvi Anbarasi. Aadhaar Linked & NPCI Direct Benefit Transfer Active.'
      }
    ]
  },
  {
    id: 'persona-farmer',
    label: 'Murugan Veerasamy',
    labelTamil: 'முருகன் வீராசாமி',
    roleDescription: '42 yr male, Small Farmer, 2.5 Acres Paddy Cultivation, Madurai',
    profile: {
      name: 'Murugan Veerasamy',
      gender: 'Male',
      dob: '1984-08-15',
      age: 42,
      state: 'Tamil Nadu',
      district: 'Madurai',
      areaType: 'Rural',
      occupation: 'Farmer',
      education: 'School (Class 6-12)',
      annualIncome: 95000,
      category: 'OBC / BC / MBC',
      landOwnershipAcres: 2.5,
      disabilityPercentage: 0,
      isGovernmentSchoolStudent: false,
      electricityUsageUnitsPerYear: 1200,
      digiLockerConnected: true,
      connectedDocTypes: ['Aadhaar', 'Land Patta / Chitta', 'Ration Card', 'Bank Passbook']
    },
    documents: [
      {
        id: 'doc-aadhaar-2',
        docType: 'Aadhaar',
        docNumber: 'XXXX-XXXX-4412',
        holderName: 'Murugan Veerasamy',
        issueDate: '2016-03-20',
        issuer: 'UIDAI',
        status: 'verified',
        extractedData: {
          age: 42,
          gender: 'Male',
          dob: '1984-08-15',
          state: 'Tamil Nadu',
          district: 'Madurai'
        },
        rawText: 'Name: Murugan Veerasamy. DOB: 15/08/1984. Address: Vadipatti Village, Madurai District, Tamil Nadu.'
      },
      {
        id: 'doc-patta-2',
        docType: 'Land Patta / Chitta',
        docNumber: 'TN-PATTA-MDU-8821',
        holderName: 'Murugan Veerasamy',
        issueDate: '2023-11-04',
        issuer: 'Revenue & Land Records Dept, Govt of Tamil Nadu',
        status: 'verified',
        extractedData: {
          landAcres: 2.5,
          state: 'Tamil Nadu',
          district: 'Madurai'
        },
        rawText: 'Patta Record No 8821. Survey No 142/2. Total Extent: 2.50 Acres Agricultural Land (Wet Land Paddy).'
      },
      {
        id: 'doc-ration-2',
        docType: 'Ration Card',
        docNumber: 'TN-PHH-339281',
        holderName: 'Murugan Veerasamy',
        issueDate: '2020-02-18',
        issuer: 'Civil Supplies Dept, Govt of Tamil Nadu',
        status: 'verified',
        extractedData: {
          annualIncome: 95000,
          state: 'Tamil Nadu'
        },
        rawText: 'Smart Ration Card Type: Priority Household (PHH). Family Count: 4.'
      },
      {
        id: 'doc-bank-2',
        docType: 'Bank Passbook',
        docNumber: 'SB-302910482',
        holderName: 'Murugan Veerasamy',
        issueDate: '2019-01-10',
        issuer: 'Canara Bank, Vadipatti Branch',
        status: 'verified',
        extractedData: {},
        rawText: 'Canara Bank Savings Account. NPCI Seeded.'
      }
    ]
  },
  {
    id: 'persona-woman-artisan',
    label: 'Kavitha Rajendran',
    labelTamil: 'கவிதா ராஜேந்திரன்',
    roleDescription: '34 yr female, Traditional Silk Handloom Weaver & SHG Leader, Kanchipuram',
    profile: {
      name: 'Kavitha Rajendran',
      gender: 'Female',
      dob: '1992-11-03',
      age: 34,
      state: 'Tamil Nadu',
      district: 'Kanchipuram',
      areaType: 'Urban',
      occupation: 'Artisan / Skilled Worker',
      education: 'School (Class 6-12)',
      annualIncome: 110000,
      category: 'OBC / BC / MBC',
      landOwnershipAcres: 0,
      disabilityPercentage: 0,
      isGovernmentSchoolStudent: false,
      electricityUsageUnitsPerYear: 2100,
      digiLockerConnected: true,
      connectedDocTypes: ['Aadhaar', 'Income Certificate', 'Ration Card', 'Bank Passbook']
    },
    documents: [
      {
        id: 'doc-aadhaar-3',
        docType: 'Aadhaar',
        docNumber: 'XXXX-XXXX-9931',
        holderName: 'Kavitha Rajendran',
        issueDate: '2017-09-12',
        issuer: 'UIDAI',
        status: 'verified',
        extractedData: {
          age: 34,
          gender: 'Female',
          dob: '1992-11-03',
          state: 'Tamil Nadu',
          district: 'Kanchipuram'
        },
        rawText: 'Name: Kavitha Rajendran. DOB: 03/11/1992. Address: Weaver Colony, Kanchipuram, Tamil Nadu.'
      },
      {
        id: 'doc-income-3',
        docType: 'Income Certificate',
        docNumber: 'TN-52025019231',
        holderName: 'Kavitha Rajendran',
        issueDate: '2025-02-01',
        issuer: 'Revenue Department, Govt of Tamil Nadu',
        status: 'verified',
        extractedData: {
          annualIncome: 110000,
          state: 'Tamil Nadu'
        },
        rawText: 'Annual Household Income: Rs. 1,10,000. Verified for Handloom Weaver Assistance.'
      },
      {
        id: 'doc-ration-3',
        docType: 'Ration Card',
        docNumber: 'TN-NPHH-204918',
        holderName: 'Kavitha Rajendran',
        issueDate: '2021-04-12',
        issuer: 'Civil Supplies Dept, TN',
        status: 'verified',
        extractedData: {
          state: 'Tamil Nadu'
        },
        rawText: 'Ration Card Holder: Household Head - Kavitha Rajendran.'
      },
      {
        id: 'doc-bank-3',
        docType: 'Bank Passbook',
        docNumber: 'SB-993029104',
        holderName: 'Kavitha Rajendran',
        issueDate: '2022-10-15',
        issuer: 'State Bank of India, Kanchipuram Main',
        status: 'verified',
        extractedData: {},
        rawText: 'SBI Savings Account. Account Holder: Kavitha Rajendran.'
      }
    ]
  },
  {
    id: 'persona-senior',
    label: 'Ramasamy K',
    labelTamil: 'ராமசாமி கே',
    roleDescription: '68 yr male, Senior Citizen, Retired Agricultural Worker, Coimbatore',
    profile: {
      name: 'Ramasamy K',
      gender: 'Male',
      dob: '1958-02-10',
      age: 68,
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      areaType: 'Rural',
      occupation: 'Senior Citizen',
      education: 'Uneducated / Primary',
      annualIncome: 48000,
      category: 'OBC / BC / MBC',
      landOwnershipAcres: 0,
      disabilityPercentage: 0,
      isGovernmentSchoolStudent: false,
      electricityUsageUnitsPerYear: 800,
      digiLockerConnected: true,
      connectedDocTypes: ['Aadhaar', 'Income Certificate', 'Ration Card', 'Bank Passbook']
    },
    documents: [
      {
        id: 'doc-aadhaar-4',
        docType: 'Aadhaar',
        docNumber: 'XXXX-XXXX-1102',
        holderName: 'Ramasamy K',
        issueDate: '2015-01-10',
        issuer: 'UIDAI',
        status: 'verified',
        extractedData: {
          age: 68,
          gender: 'Male',
          dob: '1958-02-10',
          state: 'Tamil Nadu',
          district: 'Coimbatore'
        },
        rawText: 'Name: Ramasamy K. DOB: 10/02/1958. Address: Pollachi, Coimbatore, Tamil Nadu.'
      },
      {
        id: 'doc-income-4',
        docType: 'Income Certificate',
        docNumber: 'TN-52024098201',
        holderName: 'Ramasamy K',
        issueDate: '2024-09-01',
        issuer: 'Tahsildar, Pollachi',
        status: 'verified',
        extractedData: {
          annualIncome: 48000,
          state: 'Tamil Nadu'
        },
        rawText: 'Certified Annual Income: Rs. 48,000 (Below Poverty Line category).'
      },
      {
        id: 'doc-ration-4',
        docType: 'Ration Card',
        docNumber: 'TN-AAY-109281',
        holderName: 'Ramasamy K',
        issueDate: '2019-05-10',
        issuer: 'Civil Supplies Dept, TN',
        status: 'verified',
        extractedData: {
          state: 'Tamil Nadu'
        },
        rawText: 'Antyodaya Anna Yojana (AAY) Card. Destitute Elder Status Verified.'
      },
      {
        id: 'doc-bank-4',
        docType: 'Bank Passbook',
        docNumber: 'SB-110293841',
        holderName: 'Ramasamy K',
        issueDate: '2018-07-20',
        issuer: 'Indian Overseas Bank, Pollachi Branch',
        status: 'verified',
        extractedData: {},
        rawText: 'IOB Savings Account for Pension Credit.'
      }
    ]
  }
];
