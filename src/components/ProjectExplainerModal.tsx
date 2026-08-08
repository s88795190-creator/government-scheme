import React from 'react';
import { X, Shield, Cpu, ArrowRight, CheckCircle, FileCheck, Layers, Award } from 'lucide-react';
import { Language } from '../types';

interface ProjectExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ProjectExplainerModal: React.FC<ProjectExplainerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-6 rounded-t-2xl flex justify-between items-start z-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-900/80 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-emerald-700">
              <Award className="w-3.5 h-3.5" />
              <span>Project Architecture & Innovation Blueprint</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              AI Smart Government Scheme Automation System Using DigiLocker
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {language === 'ta'
                ? 'பிரச்சனை அறிக்கை, தீர்வு கட்டமைப்பு மற்றும் அமைப்பு வரைபடம்'
                : 'Problem Statement, Proposed Solution & System Flow Diagram'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-x-0 space-y-6 text-slate-800">
          
          {/* Problem Statement Section */}
          <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-rose-900 flex items-center space-x-2">
              <span className="bg-rose-200 text-rose-800 px-2 py-0.5 rounded-md text-xs font-bold">🔴 PROBLEM STATEMENT</span>
            </h3>
            <p className="text-sm text-rose-950 mt-2.5 leading-relaxed">
              India has hundreds of welfare schemes for students, farmers, women, artisans, senior citizens, and low-income families. However, millions of citizens remain unaware of their eligibility or struggle with complex application forms, multiple portal logins, and manual document uploads. This results in **missed benefits, high error rates, and time-consuming paperwork**.
            </p>
          </div>

          {/* Solution Section */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-5">
            <h3 className="text-lg font-bold text-emerald-900 flex items-center space-x-2">
              <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md text-xs font-bold">🟢 PROPOSED SOLUTION</span>
            </h3>
            <p className="text-sm text-emerald-950 mt-2.5 leading-relaxed">
              An **AI-powered centralized platform** integrated with **DigiLocker**. With explicit citizen consent, the system reads authorized digital documents (Aadhaar, Marksheets, Income & Community Certificates, Land Pattas), extracts structured parameters, and uses an AI Reasoning Engine to compare citizen profile details against central and state government scheme rules.
            </p>
          </div>

          {/* System Architecture / Flow Diagram */}
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>🔄 System Flow & Execution Pipeline</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-2">1</div>
                <Shield className="w-5 h-5 text-blue-600 mb-1" />
                <h4 className="text-xs font-bold text-slate-900">User Consent & DigiLocker</h4>
                <p className="text-[11px] text-slate-600 mt-1">Citizen authorizes consent to fetch verified digital documents.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-2">2</div>
                <Cpu className="w-5 h-5 text-teal-600 mb-1" />
                <h4 className="text-xs font-bold text-slate-900">AI Extraction & Matching</h4>
                <p className="text-[11px] text-slate-600 mt-1">Gemini AI evaluates age, income, education, and location rules.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">3</div>
                <FileCheck className="w-5 h-5 text-emerald-600 mb-1" />
                <h4 className="text-xs font-bold text-slate-900">Missing Doc Detection</h4>
                <p className="text-[11px] text-slate-600 mt-1">Identifies missing certificates and guides e-Seva acquisition.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-2">4</div>
                <ArrowRight className="w-5 h-5 text-purple-600 mb-1" />
                <h4 className="text-xs font-bold text-slate-900">Form Auto-Fill & Submit</h4>
                <p className="text-[11px] text-slate-600 mt-1">Pre-fills application fields and submits to official portal API.</p>
              </div>

            </div>
          </div>

          {/* Key Benefits Grid */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">🌟 Key System Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Centralized Discovery:</strong> Single unified portal for Central & Tamil Nadu schemes.</span>
              </div>
              <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero Manual Entry:</strong> Pre-populates forms using DigiLocker authentic data.</span>
              </div>
              <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tamil & English AI Assistance:</strong> Interactive bilingual explanations in simple terms.</span>
              </div>
              <div className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Missing Document Alerts:</strong> Proactively warns about missing income/community certificates.</span>
              </div>
            </div>
          </div>

          {/* One-Line USP Banner */}
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm">
            <span className="font-bold text-emerald-400">🏆 Project Unique Selling Proposition (USP):</span>
            <p className="italic mt-1 text-slate-200">
              &quot;An AI-powered platform that, with the citizen&apos;s consent, uses authorized DigiLocker documents to identify eligible government schemes, simplify document verification, and automate application preparation through official integrations.&quot;
            </p>
          </div>

          {/* College Project Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900">
            <strong>📌 Project Implementation Scope Note:</strong> DigiLocker is connected via authorized user consent OAuth integration endpoints. Official application submission relies on nodal API capabilities, requiring citizen final review and confirmation.
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
          >
            {language === 'ta' ? 'புரிந்தது, போர்ட்டலுக்குச் செல்' : 'Understand & Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
