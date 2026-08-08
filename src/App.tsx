import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { DigiLockerVault } from './components/DigiLockerVault';
import { CitizenProfileCard } from './components/CitizenProfileCard';
import { SchemeDiscovery } from './components/SchemeDiscovery';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { ApplicationAutomationModal } from './components/ApplicationAutomationModal';
import { ApplicationTracker } from './components/ApplicationTracker';
import { AIChatAssistant } from './components/AIChatAssistant';
import { ProjectExplainerModal } from './components/ProjectExplainerModal';

import { SCHEMES_DATABASE } from './data/schemes';
import { SAMPLE_PERSONAS } from './data/sampleProfiles';
import {
  saveApplicationToFirestore,
  fetchApplicationsFromFirestore,
  saveProfileToFirestore,
  saveDocumentToFirestore,
} from './lib/firebase';
import {
  CitizenProfile,
  DigiLockerDocument,
  GovernmentScheme,
  SchemeMatchResult,
  SchemeApplication,
  Language,
} from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('persona-student');

  // Active persona initial state
  const initialPersona = SAMPLE_PERSONAS[0];
  const [profile, setProfile] = useState<CitizenProfile>(initialPersona.profile);
  const [documents, setDocuments] = useState<DigiLockerDocument[]>(initialPersona.documents);
  const [digiLockerConnected, setDigiLockerConnected] = useState<boolean>(true);

  // App UI Navigation & Modals
  const [activeTab, setActiveTab] = useState<'schemes' | 'vault' | 'applications'>('schemes');
  const [selectedSchemeForDetail, setSelectedSchemeForDetail] = useState<GovernmentScheme | null>(null);
  const [selectedSchemeForFormFill, setSelectedSchemeForFormFill] = useState<GovernmentScheme | null>(null);
  const [submittedApplications, setSubmittedApplications] = useState<SchemeApplication[]>([]);
  const [isExplainerOpen, setIsExplainerOpen] = useState<boolean>(false);

  // AI Matching state
  const [matchResults, setMatchResults] = useState<Record<string, SchemeMatchResult>>({});
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Load existing applications from Firebase Firestore on startup
  useEffect(() => {
    async function loadFirestoreData() {
      const storedApps = await fetchApplicationsFromFirestore();
      if (storedApps.length > 0) {
        setSubmittedApplications(storedApps);
      }
    }
    loadFirestoreData();
  }, []);

  // Call API to evaluate eligibility with Gemini AI or deterministic fallback
  const evaluateEligibility = useCallback(async (prof: CitizenProfile, docs: DigiLockerDocument[]) => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/match-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: prof,
          documents: digiLockerConnected ? docs : [],
        }),
      });

      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const resultMap: Record<string, SchemeMatchResult> = {};
        data.results.forEach((r: SchemeMatchResult) => {
          resultMap[r.schemeId] = r;
        });
        setMatchResults(resultMap);
      }
    } catch (err) {
      console.error('Error evaluating eligibility:', err);
    } finally {
      setIsLoadingAi(false);
    }
  }, [digiLockerConnected]);

  // Initial load & persona switch listener
  useEffect(() => {
    evaluateEligibility(profile, documents);
  }, [profile, documents, digiLockerConnected, evaluateEligibility]);

  const handleSelectPersona = (personaId: string) => {
    setSelectedPersonaId(personaId);
    const found = SAMPLE_PERSONAS.find((p) => p.id === personaId);
    if (found) {
      setProfile(found.profile);
      setDocuments(found.documents);
      setDigiLockerConnected(true);
    }
  };

  const handleUpdateProfile = (updated: CitizenProfile) => {
    setProfile(updated);
    saveProfileToFirestore(updated);
  };

  const handleAddDocument = (newDoc: DigiLockerDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    saveDocumentToFirestore(newDoc);
  };

  const handleSubmitApplication = (newApp: SchemeApplication) => {
    setSubmittedApplications((prev) => [newApp, ...prev]);
    saveApplicationToFirestore(newApp);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col antialiased">
      
      {/* Navigation Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        selectedPersonaId={selectedPersonaId}
        onSelectPersona={handleSelectPersona}
        digiLockerConnected={digiLockerConnected}
        onOpenExplainer={() => setIsExplainerOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        applicationsCount={submittedApplications.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Active Citizen Profile Bar */}
        <CitizenProfileCard
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          language={language}
        />

        {/* Tab 1: Scheme Discovery */}
        {activeTab === 'schemes' && (
          <SchemeDiscovery
            schemes={SCHEMES_DATABASE}
            matchResults={matchResults}
            onSelectScheme={(scheme) => setSelectedSchemeForDetail(scheme)}
            language={language}
            isLoadingAi={isLoadingAi}
            onRefreshMatching={() => evaluateEligibility(profile, documents)}
          />
        )}

        {/* Tab 2: DigiLocker Vault */}
        {activeTab === 'vault' && (
          <DigiLockerVault
            documents={documents}
            digiLockerConnected={digiLockerConnected}
            onToggleConnect={() => setDigiLockerConnected(!digiLockerConnected)}
            onAddDocument={handleAddDocument}
            language={language}
          />
        )}

        {/* Tab 3: Applications & Tracker */}
        {activeTab === 'applications' && (
          <ApplicationTracker
            applications={submittedApplications}
            language={language}
          />
        )}

      </main>

      {/* Modals & Drawers */}
      <SchemeDetailModal
        scheme={selectedSchemeForDetail}
        matchResult={selectedSchemeForDetail ? matchResults[selectedSchemeForDetail.id] : undefined}
        profile={profile}
        documents={documents}
        onClose={() => setSelectedSchemeForDetail(null)}
        onOpenFormFill={(scheme) => setSelectedSchemeForFormFill(scheme)}
        language={language}
      />

      <ApplicationAutomationModal
        scheme={selectedSchemeForFormFill}
        profile={profile}
        documents={documents}
        onClose={() => setSelectedSchemeForFormFill(null)}
        onSubmitApplication={handleSubmitApplication}
        language={language}
      />

      <ProjectExplainerModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
        language={language}
      />

      {/* Docked AI Chatbot */}
      <AIChatAssistant
        profile={profile}
        language={language}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <p className="font-bold text-slate-200">
              AI Smart Government Scheme Automation System Using DigiLocker
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Powered by Google Gemini AI & Official DigiLocker Authorization Framework
            </p>
          </div>
          <div className="text-right text-[11px] text-slate-500">
            <span className="text-emerald-400 font-semibold block sm:inline mr-2">Firebase Firestore Connected ✅</span>
            <span>Official Integration Demo • English & தமிழ் (Tamil)</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
