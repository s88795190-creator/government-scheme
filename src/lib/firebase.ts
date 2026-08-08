import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import config from '../../firebase-applet-config.json';
import { SchemeApplication, CitizenProfile, DigiLockerDocument } from '../types';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db =
  config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, config.firestoreDatabaseId)
    : getFirestore(app);

// Save or sync application
export async function saveApplicationToFirestore(appData: SchemeApplication) {
  try {
    const docRef = doc(db, 'applications', appData.id);
    await setDoc(docRef, {
      ...appData,
      createdAt: new Date().toISOString(),
    });
    console.log('Application saved to Firestore with ID:', appData.id);
  } catch (error) {
    console.error('Error saving application to Firestore:', error);
  }
}

// Fetch applications from Firestore
export async function fetchApplicationsFromFirestore(): Promise<SchemeApplication[]> {
  try {
    const q = query(collection(db, 'applications'));
    const snapshot = await getDocs(q);
    const apps: SchemeApplication[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      apps.push({
        id: data.id || docSnap.id,
        schemeId: data.schemeId,
        schemeTitle: data.schemeTitle,
        schemeTitleTamil: data.schemeTitleTamil,
        citizenName: data.citizenName,
        submittedAt: data.submittedAt,
        referenceNo: data.referenceNo,
        status: data.status,
        prefilledData: data.prefilledData || {},
        attachedDocIds: data.attachedDocIds || [],
        amountOrBenefit: data.amountOrBenefit || '',
        remarks: data.remarks || '',
      });
    });
    return apps;
  } catch (error) {
    console.error('Error fetching applications from Firestore:', error);
    return [];
  }
}

// Save profile to Firestore
export async function saveProfileToFirestore(profile: CitizenProfile) {
  try {
    const docRef = doc(db, 'citizen_profiles', 'active_profile');
    await setDoc(docRef, {
      ...profile,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving profile to Firestore:', error);
  }
}

// Save document to Firestore
export async function saveDocumentToFirestore(docData: DigiLockerDocument) {
  try {
    const docRef = doc(db, 'documents', docData.id);
    await setDoc(docRef, docData);
  } catch (error) {
    console.error('Error saving document to Firestore:', error);
  }
}
