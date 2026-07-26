'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Heart, CheckCircle2, Send } from 'lucide-react';

export default function VolunteerPage() {
  const { language, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0E6233] via-slate-900 to-[#C8102E] text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-3">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {t('nav.volunteer')}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          {language === 'ta' ? 'தன்னார்வலராகப் பணியாற்றுங்கள்' : 'Become a Volunteer for Change'}
        </h1>
        <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-2xl">
          {language === 'ta' 
            ? 'பிரச்சாரங்கள், களப் பணிகள், மற்றும் அலைபேசி இணையப் பணிகளில் தன்னார்வலராக பங்களித்து சமூக மாற்றத்திற்கு வழிவகுப்போம்.'
            : 'Join our ground campaigns, digital outreach, and community service drives across Tamil Nadu.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-6">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#0E6233] rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {language === 'ta' ? 'தன்னார்வலர் பதிவு முடிந்தது!' : 'Volunteer Application Received!'}
            </h2>
            <p className="text-slate-600 text-xs max-w-md mx-auto leading-relaxed">
              {language === 'ta' ? 'எங்கள் தன்னார்வலர் ஒருங்கிணைப்பாளர் உங்களை தொடர்பு கொள்வார்.' : 'Our volunteer desk will contact you soon.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-bold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-slate-700">{t('contact.formName')} *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E6233]"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">{t('contact.formPhone')} *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E6233]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-700">
                {language === 'ta' ? 'உங்கள் திறன்கள் / பங்களிப்பு விபரம்' : 'Your Skills & Area of Interest'}
              </label>
              <textarea
                rows={3}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder={language === 'ta' ? 'எ.கா. சோஷியல் மீடியா, களப்பணி, மொழிபெயர்ப்பு' : 'e.g., Social Media, Field Organizing, Graphic Design'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E6233]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0E6233] hover:bg-[#084325] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 text-sm"
            >
              <Heart className="w-5 h-5 text-red-200" />
              <span>{t('join.submit')}</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
