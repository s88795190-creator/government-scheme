import React from 'react';
import { X, CheckCircle2, AlertTriangle, XCircle, ShieldCheck, ArrowRight, ExternalLink, HelpCircle, FileCheck2 } from 'lucide-react';
import { GovernmentScheme, SchemeMatchResult, Language, CitizenProfile, DigiLockerDocument } from '../types';

interface SchemeDetailModalProps {
  scheme: GovernmentScheme | null;
  matchResult: SchemeMatchResult | undefined;
  profile: CitizenProfile;
  documents: DigiLockerDocument[];
  onClose: () => void;
  onOpenFormFill: (scheme: GovernmentScheme) => void;
  language: Language;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  matchResult,
  profile,
  documents,
  onClose,
  onOpenFormFill,
  language,
}) => {
  if (!scheme) return null;

  const match = matchResult || {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Top Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-5 rounded-t-2xl flex justify-between items-start z-10 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[10px] font-bold bg-emerald-900/80 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-700">
                {scheme.level}
              </span>
              <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full">
                {scheme.sector}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">
              {language === 'ta' ? scheme.titleTamil : scheme.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'ta' ? scheme.title : scheme.titleTamil}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-slate-800">
          
          {/* Match Score & Status Banner */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isEligible
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : needsDocs
              ? 'bg-amber-50 border-amber-200 text-amber-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${
                isEligible ? 'bg-emerald-200 text-emerald-800' : needsDocs ? 'bg-amber-200 text-amber-800' : 'bg-rose-200 text-rose-800'
              }`}>
                {isEligible && <CheckCircle2 className="w-6 h-6" />}
                {needsDocs && <AlertTriangle className="w-6 h-6" />}
                {!isEligible && !needsDocs && <XCircle className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-sm font-bold">
                  {isEligible && (language === 'ta' ? 'நீங்கள் இத்திட்டத்திற்கு முழுத் தகுதி பெற்றுள்ளீர்கள்! ✅' : 'You are Potentially Eligible for this Scheme! ✅')}
                  {needsDocs && (language === 'ta' ? 'தகுதியுள்ளது, ஆனால் சில சான்றிதழ்கள் தேவை! ⚠️' : 'Potentially Eligible! Missing required document(s) ⚠️')}
                  {!isEligible && !needsDocs && (language === 'ta' ? 'இத்திட்டத்திற்கான தகுதி வரம்புகள் பொருந்தவில்லை ❌' : 'Eligibility Criteria Not Met ❌')}
                </h3>
                <p className="text-xs mt-0.5 opacity-90">
                  {match.aiNotes || (language === 'ta' ? match.aiNotesTamil : '')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur border px-3 py-1.5 rounded-xl text-center shrink-0">
              <span className="text-[10px] text-slate-500 font-bold block">AI MATCH SCORE</span>
              <span className="text-lg font-mono font-bold text-slate-900">{match.matchScore}%</span>
            </div>
          </div>

          {/* Benefit Box */}
          <div className="bg-slate-900 text-white p-4 rounded-xl">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              🎁 {language === 'ta' ? 'அரசு தரும் சலுகை & உதவித் தொகை:' : 'Sanction Benefit Details:'}
            </h4>
            <p className="text-sm font-bold text-slate-100">
              {language === 'ta' ? scheme.benefitsTamil : scheme.benefits}
            </p>
          </div>

          {/* AI Reasoning Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'AI தகுதி ஆய்வு காரணங்கள்:' : 'AI Eligibility Evaluation Reasoning:'}</span>
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
              {(language === 'ta' ? match.reasonsTamil : match.reasons).map((reason, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span className="text-slate-800 leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Document Verification Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'டிஜிலாக்கர் சான்றிதழ்கள் நிலை:' : 'DigiLocker Document Verification Status:'}</span>
            </h4>

            <div className="space-y-2 text-xs">
              {scheme.requiredDocuments.map((docName) => {
                const isVerified = match.verifiedDocuments.includes(docName);
                return (
                  <div
                    key={docName}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      isVerified
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                        : 'bg-amber-50/80 border-amber-200 text-amber-950'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      {isVerified ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <div>
                        <span className="font-bold">{docName}</span>
                        <p className="text-[11px] opacity-80">
                          {isVerified
                            ? (language === 'ta' ? 'டிஜிலாக்கர் அறையில் சரிபார்க்கப்பட்டது' : 'Verified in DigiLocker Vault')
                            : (language === 'ta' ? 'டிஜிலாக்கரில் இல்லை - e-Seva மையம் மூலம் விண்ணப்பிக்கவும்' : 'Missing in Vault - Apply via e-Seva portal')}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isVerified ? 'bg-emerald-200 text-emerald-900 border-emerald-300' : 'bg-amber-200 text-amber-900 border-amber-300'
                    }`}>
                      {isVerified ? 'VERIFIED ✅' : 'ACTION REQUIRED ⚠️'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Steps */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">
              📋 {language === 'ta' ? 'விண்ணப்பிக்கும் முறை & படிகள்:' : 'Official Application Procedure:'}
            </h4>
            <ol className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 list-decimal list-inside text-slate-700">
              {(language === 'ta' ? scheme.applicationStepsTamil : scheme.applicationSteps).map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Official Portal Reference */}
          <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">OFFICIAL GOVERNMENT PORTAL</span>
              <span className="font-bold text-slate-900">{scheme.officialPortalName}</span>
            </div>
            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center space-x-1"
            >
              <span>Visit Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 p-4 rounded-b-2xl border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-slate-500">
            {language === 'ta'
              ? 'டிஜிலாக்கர் தகவல்களைப் பயன்படுத்தி விண்ணப்பப் படிவத்தை தானாகப் பூர்த்தி செய்யலாம்.'
              : 'Auto-fill application fields instantly using verified DigiLocker data.'}
          </p>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenFormFill(scheme);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-md"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{language === 'ta' ? 'டிஜிலாக்கர் மூலம் தானியங்கி படிவம் பூர்த்தி செய்ய' : 'Pre-fill Form via DigiLocker'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
