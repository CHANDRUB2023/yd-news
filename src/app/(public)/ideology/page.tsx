'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Scale, ShieldCheck, Heart, Flag, Zap, Leaf } from 'lucide-react';

export default function IdeologyPage() {
  const { t } = useLanguage();

  const ideologies = [
    {
      titleKey: 'ideo.socialJustice',
      descKey: 'ideo.socialJusticeSub',
      Icon: Scale,
      color: 'bg-green-50 text-[#0B5D34] border-green-150',
      badge: 'Social Justice'
    },
    {
      titleKey: 'ideo.equality',
      descKey: 'ideo.equalitySub',
      Icon: ShieldCheck,
      color: 'bg-red-50 text-[#E31B23] border-red-150',
      badge: 'Equality'
    },
    {
      titleKey: 'ideo.secularism',
      descKey: 'ideo.secularismSub',
      Icon: Heart,
      color: 'bg-green-50 text-[#0B5D34] border-green-150',
      badge: 'Secularism'
    },
    {
      titleKey: 'ideo.democracy',
      descKey: 'ideo.democracySub',
      Icon: Flag,
      color: 'bg-red-50 text-[#E31B23] border-red-150',
      badge: 'Democracy'
    },
    {
      titleKey: 'ideo.youthEmpowerment',
      descKey: 'ideo.youthEmpowermentSub',
      Icon: Zap,
      color: 'bg-green-50 text-[#0B5D34] border-green-150',
      badge: 'Youth Power'
    },
    {
      titleKey: 'ideo.development',
      descKey: 'ideo.developmentSub',
      Icon: Leaf,
      color: 'bg-[#E31B23]/5 text-[#E31B23] border-[#E31B23]/10',
      badge: 'Development'
    }
  ];

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#0B5D34] to-[#084325] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            {t('ideo.title')}
          </h1>
          <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide max-w-xl mx-auto uppercase">
            {t('ideo.subtitle')}
          </p>
        </div>
      </section>

      {/* Grid listing core values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideologies.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-3xl border border-zinc-200 hover:border-[#0B5D34]/30 hover:shadow-xl transition-all duration-300 p-8 flex flex-col justify-between gap-6 group"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E31B23] block">
                      {item.badge}
                    </span>
                    <h3 className="text-[#111111] font-black text-lg md:text-xl group-hover:text-[#0B5D34] transition-colors leading-snug">
                      {t(item.titleKey)}
                    </h3>
                  </div>
                  <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Flag / Emblem Ideology quote */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center bg-white border border-zinc-200 rounded-3xl relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-3 h-full bg-[#0B5D34]"></div>
        <div className="absolute top-0 right-0 w-3 h-full bg-[#E31B23]"></div>
        <div className="p-4 md:p-8 space-y-4">
          <h4 className="text-[#111111] font-extrabold text-sm uppercase tracking-wider">The Star Emblem on our Flag</h4>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-2xl mx-auto italic font-tamil">
            நமது கொடியில் உள்ள பசுமை நட்சத்திரம் சமூக நீதியையும், சிவப்பு நிறம் சமத்துவத்திற்கான போராட்டத்தையும் குறிக்கிறது. வெள்ளை பின்னணி அமைதியையும் நல்லிணக்கத்தையும் வலியுறுத்துகிறது.
          </p>
        </div>
      </section>

    </div>
  );
}
