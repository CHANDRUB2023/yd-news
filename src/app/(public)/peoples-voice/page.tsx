'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Video, Edit3, Megaphone, CheckSquare, Upload, 
  MapPin, Search, ShieldCheck, 
  TrendingUp, TrendingDown, UserPlus, Heart, 
  Image as ImageIcon, FileCheck, CheckCircle2, ChevronRight
} from 'lucide-react';

interface TrackResult {
  id: string;
  title: string;
  location: string;
  date: string;
  status: string;
  statusClass: string;
  image: string;
}

export default function PeoplesVoicePage() {
  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form fields
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('Coimbatore');
  const [locationAddress, setLocationAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [generatedComplaintId, setGeneratedComplaintId] = useState<string | null>(null);

  // Tracking state
  const [trackInput, setTrackInput] = useState('');
  const [trackedResult, setTrackedResult] = useState<TrackResult | null>(null);

  // Demo Demands Feed matching Reference Image 3
  const [recentDemands, setRecentDemands] = useState([
    {
      id: 'YDN-GRV-784912',
      title: 'சாலை பழுதைந்துள்ளது',
      location: 'Coimbatore, RS Puram',
      date: '24 May 2024',
      status: 'Under Review',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'YDN-GRV-659302',
      title: 'குடிநீர் வசதி இல்லை',
      location: 'Madurai, Anna Nagar',
      date: '23 May 2024',
      status: 'In Progress',
      statusClass: 'bg-blue-50 text-blue-700 border-blue-200',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'YDN-GRV-491283',
      title: 'மின்விளக்கு வேலை செய்யவில்லை',
      location: 'Tiruchirappalli, Cantonment',
      date: '22 May 2024',
      status: 'Pending',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'YDN-GRV-948102',
      title: 'குப்பை அகற்றும் வண்டி வரவில்லை',
      location: 'Salem, Fairlands',
      date: '21 May 2024',
      status: 'Resolved',
      statusClass: 'bg-emerald-50 text-[#0E6233] border-emerald-200',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 'YDN-GRV-381904',
      title: 'பள்ளி அடிப்படை வசதிகள் இல்லை',
      location: 'Erode, Perundurai',
      date: '20 May 2024',
      status: 'In Progress',
      statusClass: 'bg-blue-50 text-blue-700 border-blue-200',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=120&q=80',
    },
  ]);

  const handleFileUpload = (type: string) => {
    const fakeFileName = `${type}_proof_${Date.now().toString().slice(-4)}.${type === 'photo' ? 'jpg' : 'mp4'}`;
    setUploadedFiles([...uploadedFiles, fakeFileName]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Please complete the required issue details.");
      return;
    }
    const newId = `YDN-GRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedComplaintId(newId);

    const newDemand = {
      id: newId,
      title: title,
      location: `${district}, ${locationAddress || 'Main Central Area'}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Under Review',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=120&q=80',
    };

    setRecentDemands([newDemand, ...recentDemands]);
    setCurrentStep(4); // Move to review/success
  };

  const handleTrackDemand = () => {
    if (!trackInput) return;
    const found = recentDemands.find(d => d.id.toLowerCase().includes(trackInput.toLowerCase())) || {
      id: trackInput,
      title: 'Road Maintenance Demand',
      location: 'Coimbatore District',
      date: '24 May 2024',
      status: 'In Progress',
      statusClass: 'bg-blue-50 text-blue-700 border-blue-200',
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=120&q=80',
    };
    setTrackedResult(found);
  };

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. HERO SUBHEADER BANNER WITH CROWD BACKGROUND EFFECT */}
      <div className="bg-gradient-to-r from-red-900/10 via-emerald-900/10 to-emerald-950/15 rounded-3xl p-6 sm:p-10 border border-slate-200 text-center space-y-6 relative overflow-hidden shadow-xs">
        
        {/* Real Crowd Photo Background Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply pointer-events-none transition-opacity" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1600&q=80')` }}
        ></div>

        {/* Soft Tint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-white/80 to-emerald-700/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white pointer-events-none"></div>

        <div className="relative z-10 space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-xs">
            <span className="text-[#C8102E]">People’s </span>
            <span className="text-[#0E6233]">Voice</span>
          </h1>
          <p className="text-sm sm:text-base font-bold text-slate-800">
            Your Voice. Our Action. Better Tomorrow.
          </p>
        </div>

        {/* 4-Step Horizontal Process Pills Bar */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-sm max-w-5xl mx-auto">
          
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#C8102E] border border-red-100 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-slate-900">Identify a Problem</h4>
              <p className="text-[10px] text-slate-500 font-medium">Share your issue with proof</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors border-t sm:border-t-0 sm:border-l border-slate-100">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0E6233] border border-emerald-100 flex items-center justify-center shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-slate-900">Our Team Reviews</h4>
              <p className="text-[10px] text-slate-500 font-medium">We verify and check</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors border-t lg:border-t-0 lg:border-l border-slate-100">
            <div className="w-10 h-10 rounded-full bg-red-50 text-[#C8102E] border border-red-100 flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-slate-900">We Take Action</h4>
              <p className="text-[10px] text-slate-500 font-medium">We escalate to authorities</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors border-t sm:border-t-0 sm:border-l border-slate-100">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0E6233] border border-emerald-100 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-slate-900">You Get Updates</h4>
              <p className="text-[10px] text-slate-500 font-medium">Track the status of your issue</p>
            </div>
          </div>

        </div>

      </div>

      {/* 2. MAIN TWO-COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Stepper Form + People's Voice in Numbers (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Stepper Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shrink-0 shadow-md">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Submit Your Demand / Issue</h2>
                <p className="text-xs text-slate-500 mt-0.5">Fill in the details below. Your voice can bring change!</p>
              </div>
            </div>

            {/* Stepper Circles Bar */}
            <div className="flex items-center justify-between relative py-2">
              <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-slate-200 -translate-y-1/2 -z-0"></div>
              
              {[
                { num: 1, label: 'Issue Details' },
                { num: 2, label: 'Upload Proof' },
                { num: 3, label: 'Location' },
                { num: 4, label: 'Review & Submit' }
              ].map((step) => {
                const isActive = currentStep >= step.num;
                return (
                  <div key={step.num} className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => setCurrentStep(step.num)}>
                    <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-[#C8102E] text-white shadow-md' 
                        : 'bg-white border-2 border-slate-300 text-slate-500'
                    }`}>
                      {step.num}
                    </div>
                    <span className={`text-[10px] font-bold ${isActive ? 'text-[#C8102E]' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Form Content */}
            <form onSubmit={handleFormSubmit} className="space-y-5 pt-2">
              
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Issue Category */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">Issue Category <span className="text-[#C8102E]">*</span></label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Roads">Roads & Transport</option>
                        <option value="Water">Water Supply</option>
                        <option value="Electricity">Electricity & Street Lights</option>
                        <option value="Sanitation">Sanitation & Garbage</option>
                        <option value="Health">Healthcare & Hospitals</option>
                        <option value="Education">School & Education</option>
                        <option value="Environment">Environment & Parks</option>
                      </select>
                    </div>

                    {/* Issue Title */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">Issue Title <span className="text-[#C8102E]">*</span></label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a short title"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        required
                      />
                    </div>

                  </div>

                  {/* Detailed Description */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Detailed Description <span className="text-[#C8102E]">*</span></label>
                    <div className="relative">
                      <textarea
                        rows={4}
                        maxLength={500}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue in detail. What is the problem? How does it affect people?"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        required
                      />
                      <span className="absolute bottom-2.5 right-3 text-[10px] font-bold text-slate-400">
                        {description.length}/500
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-3 px-6 rounded-xl shadow flex items-center gap-1.5"
                    >
                      <span>Next: Upload Proof</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <label className="block text-xs font-bold text-slate-700">Upload Photo / Video Proof <span className="text-slate-400 font-normal">(Max 5 files)</span></label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleFileUpload('photo')}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors"
                    >
                      <ImageIcon className="w-6 h-6 text-[#C8102E] mb-1" />
                      <span className="text-xs font-bold text-slate-800">Upload Photo</span>
                      <span className="text-[10px] text-slate-400">JPG, PNG (Max 5MB)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFileUpload('video')}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors"
                    >
                      <Video className="w-6 h-6 text-[#C8102E] mb-1" />
                      <span className="text-xs font-bold text-slate-800">Upload Video</span>
                      <span className="text-[10px] text-slate-400">MP4, MOV (Max 20MB)</span>
                    </button>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div 
                    onClick={() => handleFileUpload('document')}
                    className="border-2 border-dashed border-slate-300 hover:border-[#C8102E] rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">Drag & Drop Files</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">or click to browse</p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <p className="text-xs font-bold text-slate-700">Uploaded Files ({uploadedFiles.length}):</p>
                      <div className="flex flex-wrap gap-2">
                        {uploadedFiles.map((file, i) => (
                          <span key={i} className="bg-emerald-50 text-[#0E6233] border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                            <FileCheck className="w-3 h-3" /> {file}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-5 rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-3 px-6 rounded-xl shadow flex items-center gap-1.5"
                    >
                      <span>Next: Add Location</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">District <span className="text-[#C8102E]">*</span></label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none"
                      >
                        <option>Coimbatore</option>
                        <option>Madurai</option>
                        <option>Chennai</option>
                        <option>Tiruchirappalli</option>
                        <option>Salem</option>
                        <option>Erode</option>
                        <option>Tirunelveli</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">Specific Area / Address</label>
                      <input
                        type="text"
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                        placeholder="e.g. RS Puram 4th Street"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">Mobile Number (For Tracking)</label>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 rounded text-[#C8102E] accent-[#C8102E]"
                      />
                      <span>Submit Anonymously</span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-5 rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-3 px-6 rounded-xl shadow flex items-center gap-1.5"
                    >
                      <span>Submit Grievance</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 4 && generatedComplaintId && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0E6233] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0E6233]">Grievance Submitted Successfully!</h3>
                    <p className="text-xs text-slate-600 mt-1">Your complaint has been logged and assigned to the district coordinator.</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 inline-block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Unique Complaint ID</p>
                    <p className="text-lg font-black text-[#C8102E] tracking-widest mt-0.5">{generatedComplaintId}</p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        setTitle('');
                        setDescription('');
                        setGeneratedComplaintId(null);
                      }}
                      className="bg-[#0E6233] hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-colors"
                    >
                      Submit Another Demand
                    </button>
                  </div>
                </div>
              )}

            </form>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-2 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              Your uploads are secure and will only be used for verification and action.
            </p>

          </div>

          {/* "People's Voice in Numbers" Stats Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-900">People’s Voice in Numbers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              
              <div className="bg-red-50/70 border border-red-150 p-3.5 rounded-2xl text-center space-y-1">
                <p className="text-[10px] font-bold text-slate-500">Total Demands</p>
                <p className="text-xl font-black text-slate-900">2,458</p>
                <p className="text-[9px] font-bold text-emerald-600 flex items-center justify-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> ↑ 120 this week
                </p>
              </div>

              <div className="bg-blue-50/70 border border-blue-150 p-3.5 rounded-2xl text-center space-y-1">
                <p className="text-[10px] font-bold text-slate-500">In Progress</p>
                <p className="text-xl font-black text-slate-900">1,125</p>
                <p className="text-[9px] font-bold text-emerald-600 flex items-center justify-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> ↑ 85 this week
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-150 p-3.5 rounded-2xl text-center space-y-1">
                <p className="text-[10px] font-bold text-slate-500">Resolved</p>
                <p className="text-xl font-black text-slate-900">1,025</p>
                <p className="text-[9px] font-bold text-emerald-600 flex items-center justify-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> ↑ 90 this week
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-150 p-3.5 rounded-2xl text-center space-y-1">
                <p className="text-[10px] font-bold text-slate-500">Rejected</p>
                <p className="text-xl font-black text-slate-900">308</p>
                <p className="text-[9px] font-bold text-red-600 flex items-center justify-center gap-0.5">
                  <TrendingDown className="w-2.5 h-2.5" /> ↓ 20 this week
                </p>
              </div>

              <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-2xl text-center space-y-1 col-span-2 sm:col-span-1">
                <p className="text-[10px] font-bold text-slate-500">Active Districts</p>
                <p className="text-xl font-black text-[#0E6233]">38</p>
                <p className="text-[9px] font-medium text-slate-500">Across Tamil Nadu</p>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Recent Demands + Track Your Demand + Categories (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card 1: Recent Demands */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">Recent Demands</h3>
              <button className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-0.5">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentDemands.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors border border-slate-100">
                  <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {item.location}
                    </p>
                    <p className="text-[9px] text-slate-400">{item.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border shrink-0 ${item.statusClass}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Track Your Demand */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#0E6233]" /> Track Your Demand
              </h3>
              <p className="text-xs text-slate-500">Enter your registered mobile number or Complaint ID to track status</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                placeholder="Enter mobile number or ID"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E6233]"
              />
              <button
                type="button"
                onClick={handleTrackDemand}
                className="bg-[#0E6233] hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shrink-0"
              >
                Track Now
              </button>
            </div>

            {trackedResult && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1 text-xs">
                <p className="font-bold text-slate-900">{trackedResult.title}</p>
                <p className="text-[11px] text-slate-500">ID: <span className="font-mono text-[#C8102E] font-bold">{trackedResult.id}</span></p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">{trackedResult.date}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${trackedResult.statusClass}`}>
                    {trackedResult.status}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Categories Grid */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">Categories</h3>
              <button className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-0.5">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center">
              {[
                { name: 'Roads', icon: '🛣️' },
                { name: 'Water', icon: '💧' },
                { name: 'Electricity', icon: '⚡' },
                { name: 'Sanitation', icon: '🗑️' },
                { name: 'Health', icon: '🏥' },
                { name: 'Education', icon: '🎓' },
                { name: 'Environment', icon: '🌱' },
              ].map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setCategory(cat.name); setCurrentStep(1); }}
                  className="bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-200 rounded-2xl p-3 flex flex-col items-center justify-center transition-colors group"
                >
                  <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="text-[11px] font-bold text-slate-700">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. BOTTOM CTA BANNER WITH CROWD BACKGROUND EFFECT */}
      <div className="bg-[#0E6233] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-700/50">
        
        {/* Real Crowd Photo Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#990B22]/90 via-[#0E6233]/90 to-[#0A4725]/95 pointer-events-none"></div>

        <div className="relative z-10 max-w-xl space-y-2 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow">
            Together we can build a better society. Speak up, Stand up!
          </h2>
          <p className="text-xs text-emerald-100/90 font-medium">
            Join thousands of passionate citizens working towards a prosperous Tamil Nadu.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/volunteer"
            className="bg-white text-[#0E6233] hover:bg-emerald-50 font-black text-xs py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-[#0E6233]" />
            <span>Join Us as Volunteer</span>
          </Link>

          <Link
            href="/membership"
            className="bg-white text-[#C8102E] hover:bg-red-50 font-black text-xs py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Heart className="w-4 h-4 text-[#C8102E]" />
            <span>Membership</span>
          </Link>
        </div>

        {/* Flag Graphic right corner */}
        <div className="hidden lg:block relative w-20 h-16 shrink-0">
          <div className="w-16 h-12 bg-[#C8102E] relative rounded overflow-hidden shadow-lg border border-white/20">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-t-white border-l-[36px] border-l-transparent"></div>
            <span className="absolute top-1 right-1 text-[#0E6233] text-lg font-black">★</span>
          </div>
        </div>

      </div>

    </div>
  );
}
