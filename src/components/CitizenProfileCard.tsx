import React, { useState } from 'react';
import { User, Edit3, CheckCircle, ShieldCheck, MapPin, Briefcase, GraduationCap, DollarSign, School } from 'lucide-react';
import { CitizenProfile, Language } from '../types';

interface CitizenProfileCardProps {
  profile: CitizenProfile;
  onUpdateProfile: (updated: CitizenProfile) => void;
  language: Language;
}

export const CitizenProfileCard: React.FC<CitizenProfileCardProps> = ({
  profile,
  onUpdateProfile,
  language,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<CitizenProfile>(profile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg border border-emerald-300">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900">{profile.name}</h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>DigiLocker Verified</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center space-x-2 mt-0.5">
              <span>{profile.age} yrs • {profile.gender}</span>
              <span>•</span>
              <span className="flex items-center text-slate-600">
                <MapPin className="w-3 h-3 mr-0.5 text-slate-400" />
                {profile.district}, {profile.state}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditForm(profile);
            setIsEditing(true);
          }}
          className="self-start sm:self-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition cursor-pointer border border-slate-200"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'விவரங்களை திருத்து' : 'Modify Parameters'}</span>
        </button>
      </div>

      {/* Key Profile Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-xs">
        
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-500 flex items-center mb-0.5">
            <DollarSign className="w-3 h-3 mr-1 text-emerald-600" />
            Annual Income
          </span>
          <span className="font-bold text-slate-900">
            ₹{profile.annualIncome.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-500 flex items-center mb-0.5">
            <Briefcase className="w-3 h-3 mr-1 text-blue-600" />
            Occupation
          </span>
          <span className="font-bold text-slate-900 truncate block">
            {profile.occupation}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-500 flex items-center mb-0.5">
            <GraduationCap className="w-3 h-3 mr-1 text-purple-600" />
            Education
          </span>
          <span className="font-bold text-slate-900 truncate block">
            {profile.education}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-500 flex items-center mb-0.5">
            Category
          </span>
          <span className="font-bold text-slate-900">
            {profile.category}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-500 flex items-center mb-0.5">
            <School className="w-3 h-3 mr-1 text-amber-600" />
            Govt School (6-12)
          </span>
          <span className={`font-bold ${profile.isGovernmentSchoolStudent ? 'text-emerald-700' : 'text-slate-600'}`}>
            {profile.isGovernmentSchoolStudent ? 'Yes (அரசுப் பள்ளி)' : 'No'}
          </span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <span className="text-[10px] text-slate-500 flex items-center mb-0.5">
            Land Holding
          </span>
          <span className="font-bold text-slate-900">
            {profile.landOwnershipAcres > 0 ? `${profile.landOwnershipAcres} Acres` : 'Nil'}
          </span>
        </div>

      </div>

      {/* Edit Profile Modal Drawer */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'ta' ? 'சுயவிவர அளவுருக்களை திருத்து' : 'Edit Citizen Profile Parameters'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs text-slate-800">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Citizen Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Annual Household Income (₹)</label>
                  <input
                    type="number"
                    value={editForm.annualIncome}
                    onChange={(e) => setEditForm({ ...editForm, annualIncome: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Occupation</label>
                  <select
                    value={editForm.occupation}
                    onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="Student">Student</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Artisan / Skilled Worker">Artisan / Skilled Worker</option>
                    <option value="Senior Citizen">Senior Citizen</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Entrepreneur / Self-Employed">Entrepreneur / Self-Employed</option>
                    <option value="Housewife / SHG Member">Housewife / SHG Member</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Education Level</label>
                  <select
                    value={editForm.education}
                    onChange={(e) => setEditForm({ ...editForm, education: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="School (Class 6-12)">School (Class 6-12)</option>
                    <option value="College UG Student">College UG Student</option>
                    <option value="Diploma / ITI">Diploma / ITI</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Uneducated / Primary">Uneducated / Primary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">District</label>
                  <input
                    type="text"
                    value={editForm.district}
                    onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Community Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value as any })}
                    className="w-full border border-slate-300 rounded-lg p-2"
                  >
                    <option value="OBC / BC / MBC">OBC / BC / MBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="General">General</option>
                    <option value="Minority">Minority</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">Studied in TN Govt School (Class 6-12)?</span>
                  <p className="text-[11px] text-slate-500">Required for Pudhumai Penn & 7.5% TN reservation schemes.</p>
                </div>
                <input
                  type="checkbox"
                  checked={editForm.isGovernmentSchoolStudent}
                  onChange={(e) => setEditForm({ ...editForm, isGovernmentSchoolStudent: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-1"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Update & Re-evaluate Schemes</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
