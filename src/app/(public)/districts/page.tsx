'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, UserCheck, Search, Building2, Users } from 'lucide-react';

export default function DistrictsPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const districtList = [
    { 
      id: '1', 
      nameEn: 'Chennai Central', 
      nameTa: 'சென்னை மத்திய', 
      leaderEn: 'Thiru. S. Ramanathan', 
      leaderTa: 'திரு. ச. இராமநாதன்', 
      phone: '+91 98400 12345', 
      email: 'chennai.central@youngdemocrats.org', 
      volunteers: 45200,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      leaderPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: '2', 
      nameEn: 'Madurai Urban', 
      nameTa: 'மதுரை மாநகர்', 
      leaderEn: 'Thiru. M. Alagarsamy', 
      leaderTa: 'திரு. மு. அழகர்சாமி', 
      phone: '+91 94430 56789', 
      email: 'madurai.urban@youngdemocrats.org', 
      volunteers: 32100,
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      leaderPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: '3', 
      nameEn: 'Coimbatore South', 
      nameTa: 'கோவை தெற்கு', 
      leaderEn: 'Thiru. K. Venkatesh', 
      leaderTa: 'திரு. கோ. வெங்கடேஷ்', 
      phone: '+91 98422 98765', 
      email: 'covai.south@youngdemocrats.org', 
      volunteers: 28400,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
      leaderPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: '4', 
      nameEn: 'Trichy', 
      nameTa: 'திருச்சிராப்பள்ளி', 
      leaderEn: 'Thiru. P. Sivakumar', 
      leaderTa: 'திரு. பா. சிவகுமார்', 
      phone: '+91 94421 11223', 
      email: 'trichy@youngdemocrats.org', 
      volunteers: 24800,
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80',
      leaderPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: '5', 
      nameEn: 'Salem North', 
      nameTa: 'சேலம் வடக்கு', 
      leaderEn: 'Thiru. R. Periasamy', 
      leaderTa: 'திரு. இரா. பெரியசாமி', 
      phone: '+91 98427 33445', 
      email: 'salem.north@youngdemocrats.org', 
      volunteers: 19500,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      leaderPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: '6', 
      nameEn: 'Tirunelveli', 
      nameTa: 'திருநெல்வேலி', 
      leaderEn: 'Thiru. A. Subbiah', 
      leaderTa: 'திரு. அ. சுப்பையா', 
      phone: '+91 94431 55667', 
      email: 'nellai@youngdemocrats.org', 
      volunteers: 21300,
      image: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=600&q=80',
      leaderPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
  ];

  const filtered = districtList.filter(d => {
    const q = searchQuery.toLowerCase();
    return d.nameEn.toLowerCase().includes(q) || d.nameTa.toLowerCase().includes(q) || d.leaderEn.toLowerCase().includes(q) || d.leaderTa.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0E6233] via-slate-900 to-[#C8102E] text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {t('nav.districts')}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          {language === 'ta' ? 'மாவட்ட அமைப்புகள் & நிர்வாகிகள் புகைப்படத் தொகுப்பு' : 'District Units & Secretaries Gallery'}
        </h1>
        <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed">
          {t('sec.districtsSub')}
        </p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ta' ? 'மாவட்டப் பெயரைத் தேடுக...' : 'Search district name or leader...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E6233]"
          />
        </div>
        <div className="text-xs font-bold text-slate-500 hidden sm:block">
          {language === 'ta' ? 'மொத்த மாவட்டங்கள்:' : 'Total Districts:'} <strong className="text-slate-900">{filtered.length}</strong>
        </div>
      </div>

      {/* Grid with Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(dist => (
          <div key={dist.id} className="bg-white rounded-3xl border border-slate-200 hover:border-[#0E6233] shadow-sm hover:shadow-xl transition-all space-y-4 overflow-hidden group">
            
            {/* Landmark Cover */}
            <div className="h-48 bg-slate-900 relative overflow-hidden">
              <img src={dist.image} alt={dist.nameEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-lg font-black leading-tight drop-shadow">
                  {language === 'ta' ? dist.nameTa : dist.nameEn}
                </h3>
                <p className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest mt-0.5">
                  {language === 'ta' ? 'மாவட்ட தலைமையகம்' : 'District Headquarters'}
                </p>
              </div>
            </div>

            {/* Secretary Portrait Info */}
            <div className="p-5 space-y-4 pt-1">
              
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <img src={dist.leaderPhoto} alt={dist.leaderEn} className="w-12 h-12 rounded-xl object-cover border-2 border-[#C8102E] shrink-0 shadow-sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-extrabold text-[#C8102E] uppercase tracking-wider">
                    {language === 'ta' ? 'மாவட்ட செயலாளர்:' : 'District Secretary:'}
                  </p>
                  <h4 className="text-xs font-black text-slate-900 truncate">
                    {language === 'ta' ? dist.leaderTa : dist.leaderEn}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-[#0E6233]" /> {dist.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-600 truncate">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{dist.email}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0E6233] bg-emerald-50 px-3.5 py-2 rounded-xl">
                <span>{language === 'ta' ? 'பதிவுசெய்த தொண்டர்கள்:' : 'Registered Cadres:'}</span>
                <span className="font-black text-[#0E6233] text-sm">{dist.volunteers.toLocaleString()}</span>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
