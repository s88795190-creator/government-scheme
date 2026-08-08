import React from 'react';
import { ShieldCheck, Globe, UserCheck, FileText, Sparkles, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { SAMPLE_PERSONAS } from '../data/sampleProfiles';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedPersonaId: string;
  onSelectPersona: (personaId: string) => void;
  digiLockerConnected: boolean;
  onOpenExplainer: () => void;
  activeTab: 'schemes' | 'vault' | 'applications';
  setActiveTab: (tab: 'schemes' | 'vault' | 'applications') => void;
  applicationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  selectedPersonaId,
  onSelectPersona,
  digiLockerConnected,
  onOpenExplainer,
  activeTab,
  setActiveTab,
  applicationsCount
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top Banner / Gov Brand Bar */}
      <div className="bg-emerald-700 text-emerald-50 px-4 py-1.5 text-xs flex flex-wrap justify-between items-center font-medium">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
          <span>
            {language === 'ta'
              ? '🇮🇳 இந்திய மற்றும் தமிழ்நாடு அரசு நலத்திட்டங்கள் AI ஆட்டோமேஷன் போர்ட்டல்'
              : '🇮🇳 Indian Central & Tamil Nadu State Government Schemes Automation System'}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenExplainer}
            className="hover:underline flex items-center space-x-1 text-emerald-100 font-semibold cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'திட்டம் & செயல்பாட்டு வரைபடம்' : 'Problem Statement & System Flow'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Main Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-900/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  YojnaSetu AI <span className="text-xs font-normal text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">DigiLocker Integrated</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'ta'
                  ? 'டிஜிலாக்கர் சான்றிதழ்கள் மூலம் அரசுத் திட்ட தகுதி கண்டறிதல் & ஆட்டோமேஷன்'
                  : 'AI Smart Scheme Eligibility & Automatic Application System'}
              </p>
            </div>
          </div>

          {/* Right Controls: Persona Switcher, DigiLocker Badge, Language Toggle */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Persona Switcher Dropdown */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
              <span className="text-slate-400 mr-1 hidden sm:inline">
                {language === 'ta' ? 'மாதிரி சுயவிவரம்:' : 'Persona:'}
              </span>
              <select
                value={selectedPersonaId}
                onChange={(e) => onSelectPersona(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                {SAMPLE_PERSONAS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                    {language === 'ta' ? p.labelTamil : p.label} ({p.profile.district})
                  </option>
                ))}
              </select>
            </div>

            {/* DigiLocker Status Badge */}
            <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold border ${
              digiLockerConnected
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                : 'bg-amber-950/80 text-amber-300 border-amber-700/60'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {digiLockerConnected
                  ? (language === 'ta' ? 'டிஜிலாக்கர் இணைக்கப்பட்டது' : 'DigiLocker Connected')
                  : (language === 'ta' ? 'டிஜிலாக்கர் இணைப்பில்லை' : 'DigiLocker Not Linked')}
              </span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span>{language === 'en' ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mt-4 border-t border-slate-800 pt-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 cursor-pointer ${
              activeTab === 'schemes'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ta' ? 'திட்டங்கள் கண்டறிதல்' : 'Scheme Discovery & Matching'}</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 cursor-pointer ${
              activeTab === 'vault'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'ta' ? 'டிஜிலாக்கர் ஆவண அறை' : 'DigiLocker Vault'}</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 cursor-pointer relative ${
              activeTab === 'applications'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{language === 'ta' ? 'விண்ணப்ப நிலை' : 'Applications & Tracker'}</span>
            {applicationsCount > 0 && (
              <span className="ml-1.5 bg-emerald-400 text-slate-950 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {applicationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
