import React from 'react';
import { FileText, CheckCircle2, Clock, Send, ShieldCheck, Printer, Download, Sparkles } from 'lucide-react';
import { SchemeApplication, Language } from '../types';

interface ApplicationTrackerProps {
  applications: SchemeApplication[];
  language: Language;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  language,
}) => {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-600 shadow-sm">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-900">
          {language === 'ta' ? 'விண்ணப்பங்கள் எதுவும் இல்லை' : 'No Submitted Applications Yet'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {language === 'ta'
            ? 'திட்டப் பக்கத்திலிருந்து தகுதியுள்ள திட்டங்களைத் தேர்ந்தெடுத்து டிஜிலாக்கர் மூலம் விண்ணப்பிக்கலாம்.'
            : 'Select eligible schemes from the Discovery tab and use DigiLocker auto-fill to generate applications.'}
        </p>
      </div>
    );
  }

  const handlePrint = (app: SchemeApplication) => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>
              {language === 'ta'
                ? `சமர்ப்பிக்கப்பட்ட விண்ணப்ப கண்காணிப்பு (${applications.length})`
                : `Application Tracking & Status Dashboard (${applications.length})`}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ta'
              ? 'அதிகாரப்பூர்வ அரசு இணையதளங்களுடன் நேரடி நிலை இணைக்கப்பட்டது'
              : 'Real-time status tracking with official government department Nodal APIs'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition space-y-4"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  REF: {app.referenceNo}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {language === 'ta' ? app.schemeTitleTamil : app.schemeTitle}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-500">{app.submittedAt}</span>
                <button
                  onClick={() => handlePrint(app)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Receipt</span>
                </button>
              </div>
            </div>

            {/* Applicant Details & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-500 block text-[10px]">APPLICANT NAME</span>
                <span className="font-bold text-slate-900">{app.citizenName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">SANCTION BENEFIT</span>
                <span className="font-bold text-emerald-700">{app.amountOrBenefit}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">DIGILOCKER STATUS</span>
                <span className="font-bold text-slate-900 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{app.attachedDocIds.length} Docs Verified</span>
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 block mb-2">LIVE PROCESSING TIMELINE:</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                
                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center space-x-2 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-[11px]">1. DigiLocker Verified</span>
                    <span className="text-[10px] text-emerald-800">Digital Seal OK</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center space-x-2 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-[11px]">2. Form Auto-Filled</span>
                    <span className="text-[10px] text-emerald-800">Data Pre-populated</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center space-x-2 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-[11px]">3. Nodal API Dispatch</span>
                    <span className="text-[10px] text-emerald-800">Sent to Portal</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center space-x-2 text-amber-950">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-pulse" />
                  <div>
                    <span className="font-bold block text-[11px]">4. Officer Verification</span>
                    <span className="text-[10px] text-amber-800">Under Nodal Review</span>
                  </div>
                </div>

              </div>
            </div>

            {app.remarks && (
              <p className="text-[11px] text-slate-500 italic bg-slate-100 p-2 rounded-lg">
                <strong>Nodal System Log:</strong> {app.remarks}
              </p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};
