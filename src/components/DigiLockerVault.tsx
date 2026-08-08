import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, RefreshCw, Upload, Eye, X, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import { DigiLockerDocument, Language } from '../types';

interface DigiLockerVaultProps {
  documents: DigiLockerDocument[];
  digiLockerConnected: boolean;
  onToggleConnect: () => void;
  onAddDocument: (doc: DigiLockerDocument) => void;
  language: Language;
}

export const DigiLockerVault: React.FC<DigiLockerVaultProps> = ({
  documents,
  digiLockerConnected,
  onToggleConnect,
  onAddDocument,
  language,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DigiLockerDocument | null>(null);
  const [isFetchModalOpen, setIsFetchModalOpen] = useState(false);
  const [fetchOtp, setFetchOtp] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchSuccessMsg, setFetchSuccessMsg] = useState('');

  // Upload simulation state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDocType, setUploadDocType] = useState<DigiLockerDocument['docType']>('Income Certificate');
  const [uploadDocText, setUploadDocText] = useState('');

  const handleSimulateFetch = () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setFetchSuccessMsg(
        language === 'ta'
          ? 'டிஜிலாக்கர் கணக்கிலிருந்து 2 புதிய சான்றிதழ்கள் பெறப்பட்டன! (வருமானச் சான்றிதழ், சமூகச் சான்றிதழ்)'
          : 'Successfully synced 2 latest digital certificates from DigiLocker repository!'
      );
      setTimeout(() => setFetchSuccessMsg(''), 5000);
      setIsFetchModalOpen(false);
      setFetchOtp('');
    }, 1500);
  };

  const handleSimulateUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const res = await fetch('/api/ai/extract-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType: uploadDocType,
          docText: uploadDocText || 'Sample document content verified for ' + uploadDocType,
        }),
      });
      const data = await res.json();
      const extracted = data.extracted || {};

      const newDoc: DigiLockerDocument = {
        id: `doc-uploaded-${Date.now()}`,
        docType: uploadDocType,
        docNumber: extracted.docNumber || `TN-DL-${Math.floor(100000 + Math.random() * 900000)}`,
        holderName: extracted.holderName || 'Verified Citizen',
        issueDate: new Date().toISOString().split('T')[0],
        issuer: 'Government e-Seva Authority (DigiLocker Upload)',
        status: 'verified',
        extractedData: extracted,
        rawText: uploadDocText || 'Verified government certificate.',
      };

      onAddDocument(newDoc);
      setUploadDocText('');
      setIsUploading(false);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Vault Status Header Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
        digiLockerConnected
          ? 'bg-gradient-to-r from-emerald-900 to-teal-900 text-white border-emerald-700 shadow-md'
          : 'bg-amber-900/90 text-amber-50 border-amber-700 shadow-md'
      }`}>
        <div className="flex items-start space-x-3.5">
          <div className={`p-3 rounded-xl shrink-0 ${digiLockerConnected ? 'bg-emerald-800/80' : 'bg-amber-800/80'}`}>
            <ShieldCheck className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold">
                {language === 'ta' ? 'அதிகாரப்பூர்வ டிஜிலாக்கர் சான்றிதழ் அறை' : 'Authorized DigiLocker Digital Vault'}
              </h2>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${
                digiLockerConnected ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
              }`}>
                {digiLockerConnected ? 'Consent Active ✅' : 'Consent Required 🔒'}
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1 max-w-2xl">
              {language === 'ta'
                ? 'உங்கள் ஒப்புதலுடன், அரசு வழங்கிய ஆதார், மதிப்பெண், வருமான மற்றும் சமூக சான்றிதழ்கள் பாதுகாப்பாக பெறப்படுகின்றன.'
                : 'With your authorized consent, verified government documents are fetched directly from DigiLocker for instant scheme matching.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsFetchModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'சான்றிதழ்கள் புதுப்பித்தல்' : 'Fetch / Sync DigiLocker'}</span>
          </button>

          <button
            onClick={onToggleConnect}
            className={`font-semibold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer border ${
              digiLockerConnected
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
            }`}
          >
            {digiLockerConnected
              ? (language === 'ta' ? 'ஒப்புதல் திரும்பப்பெறு' : 'Revoke Consent')
              : (language === 'ta' ? 'இணைத்து ஒப்புதல் அளி' : 'Authorize & Connect')}
          </button>
        </div>
      </div>

      {fetchSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 rounded-xl text-xs font-medium flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{fetchSuccessMsg}</span>
        </div>
      )}

      {/* Grid of Verified Digital Documents */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>
              {language === 'ta'
                ? `சரிபார்க்கப்பட்ட சான்றிதழ்கள் (${documents.length})`
                : `Verified Digital Documents in Vault (${documents.length})`}
            </span>
          </h3>
          <span className="text-xs text-slate-500">
            {language === 'ta' ? 'அனைத்தும் e-Seva / DigiLocker சரிபார்க்கப்பட்டவை' : 'All certificates e-Seva / DigiLocker verified'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{doc.docType}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {doc.docNumber}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition">
                  {doc.holderName}
                </h4>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  <strong>{language === 'ta' ? 'வழங்கியவர்:' : 'Issuer:'}</strong> {doc.issuer}
                </p>

                {/* Key Extracted Metadata Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                  {doc.extractedData.annualIncome !== undefined && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      Income: ₹{doc.extractedData.annualIncome.toLocaleString('en-IN')}
                    </span>
                  )}
                  {doc.extractedData.educationLevel && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {doc.extractedData.educationLevel}
                    </span>
                  )}
                  {doc.extractedData.communityCategory && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {doc.extractedData.communityCategory}
                    </span>
                  )}
                  {doc.extractedData.landAcres !== undefined && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      Land: {doc.extractedData.landAcres} Acres
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400 text-[11px]">Issued: {doc.issueDate}</span>
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="text-emerald-700 font-semibold hover:text-emerald-900 flex items-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'சான்றிதழ் காண்க' : 'Inspect Details'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Upload Section for AI Scanning */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center space-x-2 mb-2">
          <Upload className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'ta' ? 'கூடுதல் சான்றிதழ் பதிவேற்றி AI ஆய்வு செய்தல்' : 'Upload Additional Certificate for AI Extraction'}
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          {language === 'ta'
            ? 'வருமானச் சான்றிதழ், மாற்றுத்திறனாளி சான்றிதழ் அல்லது நிலப்பட்டா உரையை பதிவேற்றி AI மூலம் தரவுகளைப் பெறலாம்.'
            : 'If a certificate is missing in DigiLocker, upload text/details here to extract eligibility metadata with Gemini AI.'}
        </p>

        <form onSubmit={handleSimulateUpload} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Document Type</label>
              <select
                value={uploadDocType}
                onChange={(e) => setUploadDocType(e.target.value as DigiLockerDocument['docType'])}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Income Certificate">Income Certificate (வருமானச் சான்றிதழ்)</option>
                <option value="Native / Community Certificate">Community Certificate (சாதிச் சான்றிதழ்)</option>
                <option value="Land Patta / Chitta">Land Patta / Chitta (நிலப் பட்டா)</option>
                <option value="Disability Certificate">Disability Certificate (மாற்றுத்திறனாளி சான்று)</option>
                <option value="Marksheet (10th/12th)">Marksheet (மதிப்பெண் சான்றிதழ்)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Document Text / Summary</label>
              <input
                type="text"
                placeholder="e.g. Issued by Tahsildar Madurai. Income Rs 1,20,000 per annum for family."
                value={uploadDocText}
                onChange={(e) => setUploadDocText(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUploading}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center space-x-1.5 transition cursor-pointer"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Gemini AI Extracting...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'ta' ? 'AI மூலம் பகுப்பாய்வு செய்து சேர்க்க' : 'Scan & Extract with AI'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Document Detail Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedDoc.docType}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedDoc.holderName}</h3>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-slate-500">Document No: <strong className="text-slate-900">{selectedDoc.docNumber}</strong></p>
                <p className="text-slate-500 mt-1">Issuer: <strong className="text-slate-900">{selectedDoc.issuer}</strong></p>
                <p className="text-slate-500 mt-1">Issue Date: <strong className="text-slate-900">{selectedDoc.issueDate}</strong></p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1.5">Extracted AI Metadata Parameters:</h4>
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 space-y-1 font-mono text-[11px] text-emerald-950">
                  {Object.entries(selectedDoc.extractedData).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-emerald-100 last:border-0 py-0.5">
                      <span className="text-emerald-800">{key}:</span>
                      <span className="font-bold">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Raw DigiLocker Digital Seal Text:</h4>
                <p className="bg-slate-100 p-2.5 rounded text-[11px] text-slate-700 font-mono leading-relaxed">
                  {selectedDoc.rawText}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="bg-slate-900 text-white font-semibold text-xs px-4 py-2 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fetch DigiLocker Modal */}
      {isFetchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">DigiLocker Authorize & Sync</h3>
              </div>
              <button onClick={() => setIsFetchModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-700">
              <p>
                Authorizing <strong>YojnaSetu AI</strong> to fetch your latest digital certificates from National DigiLocker Repository (Ministry of Electronics & IT).
              </p>

              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-emerald-900">
                <p className="font-semibold">Simulated OAuth Consent Screen</p>
                <p className="text-[11px] mt-1 text-emerald-800">
                  A 6-digit OTP has been sent to your registered Aadhaar mobile number ending in <strong>****8821</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Enter Mobile OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 881204"
                  value={fetchOtp}
                  onChange={(e) => setFetchOtp(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-mono tracking-widest text-center"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsFetchModalOpen(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateFetch}
                disabled={isFetching || fetchOtp.length < 4}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center space-x-1.5 cursor-pointer"
              >
                {isFetching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                <span>Verify OTP & Sync Vault</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
