'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, UserCheck, Search, Building2, Users, ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';

interface DistrictCoordinator {
  id: string;
  districtNameEn: string;
  districtNameTa: string;
  coordNameEn: string;
  coordNameTa: string;
  phone: string;
  email: string;
  cadres: number;
  image: string;
  coordPhoto: string;
}

interface StateCoordinator {
  id: string;
  zoneEn: string;
  zoneTa: string;
  stateLeaderEn: string;
  stateLeaderTa: string;
  titleEn: string;
  titleTa: string;
  phone: string;
  email: string;
  leaderPhoto: string;
  districts: DistrictCoordinator[];
}

export default function DistrictsPage() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const stateCoordinators: StateCoordinator[] = [
    {
      id: 'state-north',
      zoneEn: 'North Zone (வட மண்டலம்)',
      zoneTa: 'வட மண்டலம் (North Zone)',
      stateLeaderEn: 'Thiru. S. Arul',
      stateLeaderTa: 'திரு. செ. அருள்',
      titleEn: 'State Coordinator - North Region',
      titleTa: 'மாநில ஒருங்கிணைப்பாளர் - வட மண்டலம்',
      phone: '+91 98400 99999',
      email: 'arul.state@youngdemocrats.org',
      leaderPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      districts: [
        {
          id: 'd-1',
          districtNameEn: 'Chennai Central',
          districtNameTa: 'சென்னை மத்திய',
          coordNameEn: 'Thiru. S. Ramanathan',
          coordNameTa: 'திரு. ச. இராமநாதன்',
          phone: '+91 98400 12345',
          email: 'chennai.central@youngdemocrats.org',
          cadres: 45200,
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
          coordPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 'd-2',
          districtNameEn: 'Kanchipuram & Chengalpattu',
          districtNameTa: 'காஞ்சிபுரம் & செங்கல்பட்டு',
          coordNameEn: 'Thiru. G. Venkatesan',
          coordNameTa: 'திரு. கோ. வெங்கடேசன்',
          phone: '+91 98400 54321',
          email: 'kanchi@youngdemocrats.org',
          cadres: 29800,
          image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
          coordPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
        }
      ]
    },
    {
      id: 'state-south',
      zoneEn: 'South Zone (தென் மண்டலம்)',
      zoneTa: 'தென் மண்டலம் (South Zone)',
      stateLeaderEn: 'Thirumathi. V. Anitha',
      stateLeaderTa: 'திருமதி. வெ. அனிதா',
      titleEn: 'State Coordinator - South Region',
      titleTa: 'மாநில ஒருங்கிணைப்பாளர் - தென் மண்டலம்',
      phone: '+91 94430 88888',
      email: 'anitha.state@youngdemocrats.org',
      leaderPhoto: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=300&q=80',
      districts: [
        {
          id: 'd-3',
          districtNameEn: 'Madurai Urban',
          districtNameTa: 'மதுரை மாநகர்',
          coordNameEn: 'Thiru. M. Alagarsamy',
          coordNameTa: 'திரு. மு. அழகர்சாமி',
          phone: '+91 94430 56789',
          email: 'madurai.urban@youngdemocrats.org',
          cadres: 32100,
          image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
          coordPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 'd-4',
          districtNameEn: 'Tirunelveli & Tenkasi',
          districtNameTa: 'திருநெல்வேலி & தென்காசி',
          coordNameEn: 'Thiru. A. Subbiah',
          coordNameTa: 'திரு. அ. சுப்பையா',
          phone: '+91 94431 55667',
          email: 'nellai@youngdemocrats.org',
          cadres: 21300,
          image: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=600&q=80',
          coordPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        }
      ]
    },
    {
      id: 'state-west',
      zoneEn: 'West Zone (மேற்கு மண்டலம்)',
      zoneTa: 'மேற்கு மண்டலம் (West Zone)',
      stateLeaderEn: 'Thiru. K. Selvam',
      stateLeaderTa: 'திரு. கோ. செல்வம்',
      titleEn: 'State Coordinator - West Region',
      titleTa: 'மாநில ஒருங்கிணைப்பாளர் - மேற்கு மண்டலம்',
      phone: '+91 98422 77777',
      email: 'selvam.state@youngdemocrats.org',
      leaderPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      districts: [
        {
          id: 'd-5',
          districtNameEn: 'Coimbatore South',
          districtNameTa: 'கோவை தெற்கு',
          coordNameEn: 'Thiru. K. Venkatesh',
          coordNameTa: 'திரு. கோ. வெங்கடேஷ்',
          phone: '+91 98422 98765',
          email: 'covai.south@youngdemocrats.org',
          cadres: 28400,
          image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
          coordPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
        },
        {
          id: 'd-6',
          districtNameEn: 'Salem North',
          districtNameTa: 'சேலம் வடக்கு',
          coordNameEn: 'Thiru. R. Periasamy',
          coordNameTa: 'திரு. இரா. பெரியசாமி',
          phone: '+91 98427 33445',
          email: 'salem.north@youngdemocrats.org',
          cadres: 19500,
          image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
          coordPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0E6233] via-slate-900 to-[#C8102E] text-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {t('nav.districts')}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">
          {language === 'ta' ? 'மாநில & மாவட்ட ஒருங்கிணைப்பாளர்கள் கட்டமைப்பு' : 'State & District Coordinators Hierarchy'}
        </h1>
        <p className="text-emerald-100 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
          {language === 'ta' 
            ? 'மாநில ஒருங்கிணைப்பாளர்களின் கீழ் செயல்படும் மாவட்ட அமைப்புகள் மற்றும் மாவட்ட ஒருங்கிணைப்பாளர்களின் விவரங்கள்.'
            : 'Explore state coordinators and their respective nested district coordinators across Tamil Nadu.'}
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ta' ? 'மாநில / மாவட்டப் பெயரைத் தேடுக...' : 'Search coordinator or district...'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0E6233]"
          />
        </div>
      </div>

      {/* STATE COORDINATORS LIST WITH NESTED DISTRICT COORDINATORS */}
      <div className="space-y-12">
        {stateCoordinators.map((stateGroup) => {
          // Search filter matching state or nested district
          const q = searchQuery.toLowerCase();
          const matchState = stateGroup.zoneEn.toLowerCase().includes(q) || stateGroup.zoneTa.toLowerCase().includes(q) || stateGroup.stateLeaderEn.toLowerCase().includes(q) || stateGroup.stateLeaderTa.toLowerCase().includes(q);
          
          const filteredDistricts = stateGroup.districts.filter(d => 
            matchState || d.districtNameEn.toLowerCase().includes(q) || d.districtNameTa.toLowerCase().includes(q) || d.coordNameEn.toLowerCase().includes(q) || d.coordNameTa.toLowerCase().includes(q)
          );

          if (searchQuery && filteredDistricts.length === 0) return null;

          return (
            <div key={stateGroup.id} className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
              
              {/* STATE COORDINATOR HEADER CARD */}
              <div className="bg-gradient-to-r from-slate-900 to-[#0E6233] text-white p-5 md:p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md border border-white/10">
                <div className="flex items-center gap-4">
                  <img 
                    src={stateGroup.leaderPhoto} 
                    alt={stateGroup.stateLeaderEn} 
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#C8102E] shrink-0 shadow-lg"
                  />
                  <div>
                    <span className="bg-[#C8102E] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      {language === 'ta' ? stateGroup.titleTa : stateGroup.titleEn}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black mt-1 leading-tight">
                      {language === 'ta' ? stateGroup.stateLeaderTa : stateGroup.stateLeaderEn}
                    </h2>
                    <p className="text-emerald-200 text-xs font-extrabold mt-0.5">
                      {language === 'ta' ? stateGroup.zoneTa : stateGroup.zoneEn}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-200 space-y-1 bg-black/20 p-3 rounded-xl border border-white/10 shrink-0">
                  <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {stateGroup.phone}</p>
                  <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-red-400" /> {stateGroup.email}</p>
                </div>
              </div>

              {/* NESTED DISTRICT COORDINATORS CONTAINER */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ChevronRight className="w-4 h-4 text-[#C8102E]" />
                    <span>{language === 'ta' ? 'மாநில ஒருங்கிணைப்பாளரின் கீழ் உள்ள மாவட்ட ஒருங்கிணைப்பாளர்கள்:' : 'Nested District Coordinators under this State Coordinator:'}</span>
                  </h3>
                  <span className="text-xs font-bold text-[#0E6233] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {filteredDistricts.length} {language === 'ta' ? 'மாவட்டங்கள்' : 'Districts'}
                  </span>
                </div>

                {/* District Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {filteredDistricts.map(dist => (
                    <div key={dist.id} className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-[#0E6233] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      
                      <div className="flex items-center gap-3">
                        <img 
                          src={dist.coordPhoto} 
                          alt={dist.coordNameEn} 
                          className="w-12 h-12 rounded-xl object-cover border-2 border-[#0E6233] shrink-0 shadow-sm"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-extrabold text-[#C8102E] uppercase tracking-wider block">
                            {language === 'ta' ? 'மாவட்ட ஒருங்கிணைப்பாளர்:' : 'District Coordinator:'}
                          </span>
                          <h4 className="text-sm font-black text-slate-900 truncate">
                            {language === 'ta' ? dist.coordNameTa : dist.coordNameEn}
                          </h4>
                          <p className="text-xs font-extrabold text-[#0E6233] truncate">
                            {language === 'ta' ? dist.districtNameTa : dist.districtNameEn}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs font-medium text-slate-600 space-y-1.5 pt-2 border-t border-slate-200/60">
                        <p className="flex items-center gap-1.5 text-slate-700 font-bold">
                          <Phone className="w-3.5 h-3.5 text-[#0E6233]" /> {dist.phone}
                        </p>
                        <p className="flex items-center gap-1.5 text-slate-500 truncate">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {dist.email}
                        </p>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-bold text-[#0E6233]">
                        <span>{language === 'ta' ? 'பதிவுசெய்த தொண்டர்கள்:' : 'Registered Cadres:'}</span>
                        <span className="font-black text-[#C8102E] text-sm">{dist.cadres.toLocaleString()}</span>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

