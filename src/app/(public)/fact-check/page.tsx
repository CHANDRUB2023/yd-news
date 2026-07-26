'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckSquare, AlertTriangle, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';

export default function FactCheckPage() {
  const { language, t } = useLanguage();

  const factChecks = [
    {
      id: '1',
      claimEn: 'Viral Video Claiming Misuse of Youth Funds in District Campaign',
      claimTa: 'மாவட்ட பிரச்சாரத்தில் இளைஞர் நிதி தவறாக பயன்படுத்தப்பட்டதாக பரவும் காணொளி உண்மைதானா?',
      verdict: 'FALSE',
      verdictTa: 'பொய்யானது',
      verdictColor: 'bg-red-100 text-red-700 border-red-200',
      explanationEn: 'Official bank statements confirm all campaign donations were audited and transferred directly to the environmental drive account.',
      explanationTa: 'அதிகாரப்பூர்வ வங்கி தணிக்கை அறிக்கைகள் அனைத்து நிதிகளும் பசுமைத் திட்டக் கணக்கிற்கு நேரடியாக மாற்றப்பட்டதை உறுதிப்படுத்துகின்றன.',
      date: '2026-07-22'
    },
    {
      id: '2',
      claimEn: 'Young Democrats Proposing 50% Local Reservation Draft',
      claimTa: 'உள்ளாட்சி தேர்தலில் 50% இடஒதுக்கீடு வரைவு திட்டம் தாக்கல் உண்மையா?',
      verdict: 'VERIFIED TRUE',
      verdictTa: 'உண்மையானது',
      verdictColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      explanationEn: 'The resolution was officially passed during the 2026 Women Wing Leadership Conclave.',
      explanationTa: '2026 மகளிர் அணி தலைமைத்துவ மாநாட்டில் இந்த தீர்மானம் அதிகாரப்பூர்வமாக நிறைவேற்றப்பட்டது.',
      date: '2026-07-10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-[#C8102E] text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-3">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {t('nav.factcheck')}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          {language === 'ta' ? 'உண்மைச் சரிபார்ப்பு பிரிவு' : 'Verified Fact-Check Desk'}
        </h1>
        <p className="text-purple-100 text-sm md:text-base max-w-2xl leading-relaxed">
          {language === 'ta'
            ? 'போலியான செய்திகள் மற்றும் தவறான தகவல்களைத் தடுத்து, மக்களுக்கு உண்மையான செய்திகளை வழங்குகிறோம்.'
            : 'Countering misinformation and fake news with verified receipts and empirical evidence.'}
        </p>
      </div>

      {/* Fact check list */}
      <div className="space-y-6">
        {factChecks.map(fc => (
          <div key={fc.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border uppercase tracking-wider w-fit ${fc.verdictColor}`}>
                {language === 'ta' ? fc.verdictTa : fc.verdict}
              </span>
              <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0E6233]" /> {fc.date}
              </span>
            </div>

            <h2 className="text-lg font-black text-slate-900 leading-snug">
              &ldquo;{language === 'ta' ? fc.claimTa : fc.claimEn}&rdquo;
            </h2>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-black text-[#0E6233] uppercase tracking-wider">
                {language === 'ta' ? 'உண்மை விளக்கம்:' : 'Fact Check Finding:'}
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {language === 'ta' ? fc.explanationTa : fc.explanationEn}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
