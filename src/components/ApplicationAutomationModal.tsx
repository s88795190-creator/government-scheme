import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, FileText, Send, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { GovernmentScheme, CitizenProfile, DigiLockerDocument, Language, SchemeApplication } from '../types';

interface ApplicationAutomationModalProps {
  scheme: GovernmentScheme | null;
  profile: CitizenProfile;
  documents: DigiLockerDocument[];
  onClose: () => void;
  onSubmitApplication: (application: SchemeApplication) => void;
  language: Language;
}

export const ApplicationAutomationModal: React.FC<ApplicationAutomationModalProps> = ({
  scheme,
  profile,
  documents,
  onClose,
  onSubmitApplication,
  language,
}) => {
  if (!scheme) return null;

  // Pre-fill form state using DigiLocker data
  const [formData, setFormData] = useState({
    applicantName: profile.name,
    gender: profile.gender,
    dob: profile.dob,
    age: String(profile.age),
    address: profile.district + ', ' + profile.state,
    income: String(profile.annualIncome),
    category: profile.category,
    education: profile.education,
    aadhaarNumber: 'XXXX-XXXX-8821',
    bankAccount: 'SB-8820194821',
    bankIfsc: 'IDIB000T042 (Indian Bank)',
    rationCardNo: 'TN-PHH-339281',
    mobileNo: '98401*****',
  });

  const [consentChecked, setConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<SchemeApplication | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const refNo = `TN-GOV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const newApp: SchemeApplication = {
        id: `app-${Date.now()}`,
        schemeId: scheme.id,
        schemeTitle: scheme.title,
        schemeTitleTamil: scheme.titleTamil,
        citizenName: formData.applicantName,
        submittedAt: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        referenceNo: refNo,
        status: 'Submitted to Nodal API',
        prefilledData: formData,
        attachedDocIds: documents.map((d) => d.id),
        amountOrBenefit: scheme.benefits,
        remarks: 'Application pre-filled using verified DigiLocker digital seals. Sent to Nodal Verification API.',
      };

      onSubmitApplication(newApp);
      setSubmittedApp(newApp);
      setIsSubmitting(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-5 rounded-t-2xl flex justify-between items-start z-10 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-700/60 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DigiLocker Automated Pre-fill Engine</span>
            </div>
            <h2 className="text-lg font-bold">
              {language === 'ta' ? 'தானியங்கி விண்ணப்ப தயாரிப்பு' : 'Automated Application Preparation'}
            </h2>
            <p className="text-xs text-slate-300">
              {language === 'ta' ? scheme.titleTamil : scheme.title}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!submittedApp ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 text-slate-800 text-xs">
            
            {/* Informational Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3 text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  {language === 'ta'
                    ? 'டிஜிலாக்கர் சான்றிதழ்களிலிருந்து தகவல்கள் நேரடியாக பெறப்பட்டன!'
                    : 'Application fields auto-populated using verified DigiLocker digital documents!'}
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Green badges denote parameters extracted directly from digital certificates with digital cryptographic signatures.
                </p>
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-4">
              
              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5">
                1. Personal & Resident Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">Applicant Full Name</label>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      DigiLocker Verified ✅
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">Gender & Age</label>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Aadhaar Verified ✅
                    </span>
                  </div>
                  <input
                    type="text"
                    value={`${formData.gender} (${formData.age} yrs)`}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">District & State</label>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Verified ✅
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.address}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 cursor-not-allowed"
                  />
                </div>

              </div>

              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5 pt-2">
                2. Eligibility & Income Validation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">Annual Household Income</label>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Income Cert Verified ✅
                    </span>
                  </div>
                  <input
                    type="text"
                    value={`₹${Number(formData.income).toLocaleString('en-IN')}`}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 font-mono font-bold cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">Community Category</label>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Community Cert ✅
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.category}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">Education Status</label>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Marksheet Verified ✅
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.education}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 cursor-not-allowed"
                  />
                </div>

              </div>

              <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5 pt-2">
                3. Direct Benefit Transfer (DBT) Bank Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">NPCI Aadhaar-Seeded Bank Account</label>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Passbook Verified ✅
                    </span>
                  </div>
                  <input
                    type="text"
                    value={`${formData.bankAccount} (${formData.bankIfsc})`}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-600 font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">Applicant Mobile Number</label>
                    <span className="text-[9px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                      Editable
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.mobileNo}
                    onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>

              </div>

              {/* Verified Documents Proof Box */}
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Attached DigiLocker Digital Proofs ({documents.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {documents.map((d) => (
                    <div key={d.id} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-[10px]">
                      <span className="font-bold text-emerald-800 block">{d.docType}</span>
                      <span className="text-slate-500 font-mono">{d.docNumber}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citizen Authorization Checkbox */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded mt-0.5 cursor-pointer"
                  />
                  <span className="text-amber-950 font-medium text-[11px] leading-relaxed">
                    <strong>Citizen Verification & Consent Confirmation:</strong> I confirm that the pre-filled information from my authorized DigiLocker account is correct. I authorize <strong>YojnaSetu AI</strong> to transmit this application form and attached digital proofs to the official government portal / Nodal API for sanction.
                  </span>
                </label>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Back to Details
              </button>

              <button
                type="submit"
                disabled={!consentChecked || isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <ShieldCheck className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Government Nodal API...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm & Transmit Application</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Submission Success State */
          <div className="p-8 text-center space-y-5 text-slate-800">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
                Application Transmitted Successfully! ✅
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3">
                {language === 'ta' ? 'விண்ணப்பம் வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது' : 'Application Pre-Filled & Transmitted'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                Your application has been prepared with verified DigiLocker proofs and forwarded to the government nodal department for processing.
              </p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-xl max-w-md mx-auto text-left font-mono text-xs space-y-1.5">
              <p className="text-slate-400 text-[10px]">APPLICATION ACKNOWLEDGEMENT RECEIPT</p>
              <p><span className="text-slate-400">Reference No:</span> <strong className="text-emerald-400">{submittedApp.referenceNo}</strong></p>
              <p><span className="text-slate-400">Scheme Title:</span> <strong className="text-white">{submittedApp.schemeTitle}</strong></p>
              <p><span className="text-slate-400">Applicant:</span> <strong className="text-white">{submittedApp.citizenName}</strong></p>
              <p><span className="text-slate-400">Sanction Amount:</span> <strong className="text-emerald-300">{submittedApp.amountOrBenefit}</strong></p>
            </div>

            <div className="pt-2 flex justify-center space-x-3">
              <button
                onClick={onClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Go to Application Tracker
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
