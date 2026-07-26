'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Users, Target, Award, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { language, t } = useLanguage();

  const milestones = [
    { year: '2024', titleEn: 'Founding Year', titleTa: 'துவக்கப்பட்ட ஆண்டு', descEn: 'Formed as a state-wide volunteer network to organize student student unions.', descTa: 'மாணவர் சங்கங்களை ஒருங்கிணைக்க மாநில அளவிலான தன்னார்வ வலையமைப்பாக உருவானது.' },
    { year: '2025', titleEn: 'Reforestation Campaign Launch', titleTa: 'காடமைப்பு பிரச்சாரம்', descEn: 'Organized environmental drives planting 50,000+ trees in urban centers.', descTa: 'நகர்ப்புறங்களில் 50,000 க்கும் மேற்பட்ட மரங்களை நடும் சுற்றுச்சூழல் இயக்கங்களை நடத்தியது.' },
    { year: '2026', titleEn: 'National Youth Forum Representation', titleTa: 'தேசிய இளைஞர் மாநாடு', descEn: 'Expanded coordinates to all 38 districts of Tamil Nadu, raising over 2,500 volunteers.', descTa: 'தமிழ்நாட்டின் 38 மாவட்டங்களுக்கும் ஒருங்கிணைப்பை விரிவுபடுத்தி, 2,500க்கும் மேற்பட்ட தன்னார்வலர்களைத் திரட்டியது.' }
  ];

  const leaders = [
    {
      nameEn: 'Thiru. S. Arul',
      nameTa: 'திரு. செ. அருள்',
      roleKey: 'about.leaderRole1',
      descEn: 'A policy researcher and environmental activist who studied at Madras University. Arul organized the first Student Reforms forum in 2023.',
      descTa: 'சென்னை பல்கலைக்கழகத்தில் படித்த கொள்கை ஆராய்ச்சியாளர் மற்றும் சுற்றுச்சூழல் ஆர்வலர். அருள் 2023 இல் முதல் மாணவர் சீர்திருத்த மன்றத்தை ஒருங்கிணைத்தார்.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
    },
    {
      nameEn: 'Ms. V. Anitha',
      nameTa: 'செல்வி. வெ. அனிதா',
      roleKey: 'about.leaderRole2',
      descEn: 'Focuses on building women’s leadership representation. Leading the safety campaigns and skill development programs in colleges.',
      descTa: 'பெண்களின் தலைமைத்துவ பிரதிநிதித்துவத்தை உருவாக்குவதில் கவனம் செலுத்துகிறார். கல்லூரிகளில் பாதுகாப்பு பிரச்சாரங்கள் மற்றும் திறன் மேம்பாட்டு திட்டங்களை வழிநடத்துகிறார்.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
    },
    {
      nameEn: 'Mr. R. Karthik',
      nameTa: 'திரு. இரா. கார்த்திக்',
      roleKey: 'about.leaderRole3',
      descEn: 'Coordinates district-level networks and community volunteer mobilizations. Karthik specializes in flood relief logistics and public relations.',
      descTa: 'மாவட்ட அளவிலான நெட்வொர்க்குகள் மற்றும் சமூக தன்னார்வ அணிதிரட்டல்களை ஒருங்கிணைக்கிறார். கார்த்திக் வெள்ள நிவாரண தளவாடங்கள் மற்றும் மக்கள் தொடர்புகளில் நிபுணத்துவம் பெற்றவர்.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#0B5D34] to-[#084325] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            {t('about.title')}
          </h1>
          <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide max-w-xl mx-auto uppercase">
            {t('slogan')}
          </p>
        </div>
      </section>

      {/* Mission & Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[#E31B23] text-xs font-black uppercase tracking-wider block">
              Who We Are
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight">
              {t('about.missionTitle')}
            </h2>
          </div>
          <p className="text-zinc-600 text-xs md:text-sm leading-relaxed">
            {t('about.missionText')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="flex gap-3">
              <Users className="w-8 h-8 text-[#0B5D34] shrink-0" />
              <div>
                <h4 className="font-extrabold text-[#111111] mb-1">Statewide Network</h4>
                <p className="text-zinc-400">Coordinators active in all 38 districts of Tamil Nadu.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Target className="w-8 h-8 text-[#0B5D34] shrink-0" />
              <div>
                <h4 className="font-extrabold text-[#111111] mb-1">Policy Focused</h4>
                <p className="text-zinc-400">Drafting and presenting resolutions directly to educational committees.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-[100px] z-0"></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-lg font-black text-[#0B5D34] uppercase tracking-wider">Our Core Vision</h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-tamil">
              அரசியலில் இளைஞர்களின் ஆக்கப்பூர்வமான பங்களிப்பை உறுதி செய்வதுடன், தூய்மையான கொள்கைகள், கல்வி மேம்பாடு மற்றும் சமூக சமத்துவத்தை முன்னெடுப்பதே எமது தலையாய நோக்கமாகும்.
            </p>
            <div className="border-t border-zinc-100 pt-4 flex justify-between items-center text-xs font-bold text-[#E31B23]">
              <span>Join as Volunteer</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Committee */}
      <section className="bg-zinc-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[#E31B23] text-xs font-black uppercase tracking-wider block">Coordinators</span>
            <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight">
              {t('about.leaderTitle')}
            </h2>
            <p className="text-zinc-500 text-xs max-w-lg mx-auto">Meet the state coordinating team steering the policy changes and environmental movements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center p-6 text-center group"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#0B5D34] shadow-md mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img src={leader.image} alt={leader.nameEn} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-[#111111] font-black text-lg">
                      {language === 'en' ? leader.nameEn : leader.nameTa}
                    </h3>
                    <p className="text-[10px] font-black tracking-wider text-[#E31B23] uppercase">
                      {t(leader.roleKey)}
                    </p>
                  </div>
                  <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mt-2">
                    {language === 'en' ? leader.descEn : leader.descTa}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[#E31B23] text-xs font-black uppercase tracking-wider block">Our Journey</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight">
            Milestones & Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {milestones.map((ms, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm relative space-y-4">
              <span className="text-3xl font-black text-[#0B5D34]/15 absolute top-4 right-4">{ms.year}</span>
              <div className="space-y-2">
                <h4 className="font-black text-md text-[#0B5D34] uppercase tracking-wide">
                  {language === 'en' ? ms.titleEn : ms.titleTa}
                </h4>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {language === 'en' ? ms.descEn : ms.descTa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
