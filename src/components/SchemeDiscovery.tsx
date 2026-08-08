import React, { useState } from 'react';
import { Search, Sparkles, Filter, CheckCircle2, AlertTriangle, XCircle, ArrowRight, RefreshCw, FileText, Landmark } from 'lucide-react';
import { GovernmentScheme, SchemeMatchResult, Language, EligibilityStatus } from '../types';

interface SchemeDiscoveryProps {
  schemes: GovernmentScheme[];
  matchResults: Record<string, SchemeMatchResult>;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  language: Language;
  isLoadingAi: boolean;
  onRefreshMatching: () => void;
}

export const SchemeDiscovery: React.FC<SchemeDiscoveryProps> = ({
  schemes,
  matchResults,
  onSelectScheme,
  language,
  isLoadingAi,
  onRefreshMatching,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | EligibilityStatus>('All');
  const [sectorFilter, setSectorFilter] = useState<string>('All');
  const [levelFilter, setLevelFilter] = useState<string>('All');

  // Filter logic
  const filteredSchemes = schemes.filter((scheme) => {
    const result = matchResults[scheme.id];
    const matchStatus = result ? result.status : 'Not Eligible';

    if (statusFilter !== 'All' && matchStatus !== statusFilter) {
      return false;
    }

    if (sectorFilter !== 'All' && scheme.sector !== sectorFilter) {
      return false;
    }

    if (levelFilter !== 'All' && scheme.level !== levelFilter) {
      return false;
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchText = `${scheme.title} ${scheme.titleTamil} ${scheme.description} ${scheme.benefits} ${scheme.sector}`.toLowerCase();
      return matchText.includes(q);
    }

    return true;
  });

  // Calculate counts
  const countEligible = schemes.filter((s) => matchResults[s.id]?.status === 'Eligible').length;
  const countNeedsDocs = schemes.filter((s) => matchResults[s.id]?.status === 'Needs Documents').length;
  const countIneligible = schemes.filter((s) => matchResults[s.id]?.status === 'Not Eligible').length;

  return (
    <div className="space-y-6">
      
      {/* Search & AI Match Re-run Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={language === 'ta' ? 'திட்டம் அல்லது சலுகை பெயர் மூலம் தேடுக...' : 'Search by scheme name or benefit...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Level Filter & Re-evaluate Button */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="All">{language === 'ta' ? 'அனைத்து அரசுகள்' : 'All Governments'}</option>
              <option value="Tamil Nadu State Government">{language === 'ta' ? 'தமிழ்நாடு அரசு' : 'Tamil Nadu State Govt'}</option>
              <option value="Central Government">{language === 'ta' ? 'மத்திய அரசு' : 'Central Govt'}</option>
            </select>

            <button
              onClick={onRefreshMatching}
              disabled={isLoadingAi}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isLoadingAi ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{language === 'ta' ? 'AI கணக்கீடு செய்கிறது...' : 'Gemini AI Matching...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  <span>{language === 'ta' ? 'AI தகுதி புதுப்பி' : 'Re-run AI Engine'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              statusFilter === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {language === 'ta' ? 'அனைத்து திட்டங்கள்' : 'All Schemes'} ({schemes.length})
          </button>

          <button
            onClick={() => setStatusFilter('Eligible')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 cursor-pointer ${
              statusFilter === 'Eligible'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'நேரடி தகுதி ✅' : 'Eligible ✅'} ({countEligible})</span>
          </button>

          <button
            onClick={() => setStatusFilter('Needs Documents')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 cursor-pointer ${
              statusFilter === 'Needs Documents'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'சான்றிதழ் தேவை ⚠️' : 'Needs Documents ⚠️'} ({countNeedsDocs})</span>
          </button>

          <button
            onClick={() => setStatusFilter('Not Eligible')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 cursor-pointer ${
              statusFilter === 'Not Eligible'
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'தகுதியில்லை ❌' : 'Ineligible ❌'} ({countIneligible})</span>
          </button>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="text-slate-400 font-semibold self-center mr-1">Sector:</span>
          {['All', 'Education', 'Agriculture', 'Women Empowerment', 'Health & Insurance', 'Housing & Pension', 'MSME & Skill'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                sectorFilter === sec
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => {
          const match = matchResults[scheme.id] || {
            status: 'Not Eligible',
            matchScore: 0,
            reasons: [],
            reasonsTamil: [],
            missingDocuments: scheme.requiredDocuments,
            verifiedDocuments: [],
          };

          const isEligible = match.status === 'Eligible';
          const needsDocs = match.status === 'Needs Documents';

          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm transition hover:shadow-md flex flex-col justify-between ${
                isEligible
                  ? 'border-emerald-300 ring-1 ring-emerald-200'
                  : needsDocs
                  ? 'border-amber-300'
                  : 'border-slate-200 opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                
                {/* Card Top Row Badges */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md flex items-center space-x-1">
                    <Landmark className="w-3 h-3 text-slate-500" />
                    <span>{scheme.level.includes('Tamil Nadu') ? 'TN Govt' : 'Central Govt'}</span>
                    <span>•</span>
                    <span className="text-slate-800">{scheme.sector}</span>
                  </span>

                  {/* Match Score & Status Pill */}
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                      isEligible
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : needsDocs
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {isEligible && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {needsDocs && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                      {!isEligible && !needsDocs && <XCircle className="w-3 h-3 text-rose-600" />}
                      <span>
                        {isEligible && (language === 'ta' ? 'தகுதியுள்ளது' : 'Eligible')}
                        {needsDocs && (language === 'ta' ? 'சான்றிதழ் தேவை' : 'Needs Docs')}
                        {!isEligible && !needsDocs && (language === 'ta' ? 'தகுதியில்லை' : 'Ineligible')}
                      </span>
                    </span>

                    <span className="bg-slate-900 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                      {match.matchScore}%
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {language === 'ta' ? scheme.titleTamil : scheme.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 italic">
                  {language === 'ta' ? scheme.title : scheme.titleTamil}
                </p>

                {/* Scheme Benefit Highlight Box */}
                <div className="mt-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-950 font-medium">
                  <span className="font-bold text-emerald-800 block text-[10px] uppercase tracking-wider mb-0.5">
                    🎁 {language === 'ta' ? 'திட்டச் சலுகை:' : 'Scheme Benefit:'}
                  </span>
                  {language === 'ta' ? scheme.benefitsTamil : scheme.benefits}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {language === 'ta' ? scheme.descriptionTamil : scheme.description}
                </p>

                {/* Document Status Tags */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-500 font-semibold">{language === 'ta' ? 'தேவையான சான்றிதழ்கள்:' : 'Required Docs:'}</span>
                    {scheme.requiredDocuments.map((docName) => {
                      const isPresent = match.verifiedDocuments.includes(docName);
                      return (
                        <span
                          key={docName}
                          className={`px-2 py-0.5 rounded font-medium border text-[10px] ${
                            isPresent
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          }`}
                        >
                          {isPresent ? '✓ ' : '⚠️ '}
                          {docName}
                        </span>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Card Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {match.missingDocuments.length === 0
                    ? (language === 'ta' ? 'டிஜிலாக்கர் சான்றிதழ்கள் பூர்த்தி செய்யப்பட்டன' : 'DigiLocker Verification Ready')
                    : (language === 'ta' ? `${match.missingDocuments.length} சான்றிதழ் தேவை` : `${match.missingDocuments.length} Doc(s) Missing`)}
                </span>

                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-sm group"
                >
                  <span>{language === 'ta' ? 'தகுதி & ஆட்டோமேஷன்' : 'Inspect & Apply'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-600">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="font-bold text-sm">No government schemes matched the current filters.</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search keyword or switching category tabs.</p>
        </div>
      )}

    </div>
  );
};
