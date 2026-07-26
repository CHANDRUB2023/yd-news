'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Video, Radio, Play, Eye, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideosPage() {
  const { language, t } = useLanguage();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const videoList = [
    {
      id: '1',
      titleEn: 'Statewide Reforestation Campaign Live Coverage',
      titleTa: 'மாநில அளவிலான காடமைப்பு இயக்கம் நேரடி ஒளிபரப்பு',
      date: '2026-07-24',
      views: '12.4K',
      duration: '42 min',
      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '2',
      titleEn: 'State Convener Special Interview on Educational Policy',
      titleTa: 'கல்விக் கொள்கை குறித்து மாநில ஒருங்கிணைப்பாளர் சிறப்பு நேர்காணல்',
      date: '2026-07-15',
      views: '8.9K',
      duration: '28 min',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: '3',
      titleEn: 'Women Wing Leadership Conclave Highlights',
      titleTa: 'மகளிர் அணி தலைமைத்துவ மாநாட்டின் முக்கிய நிகழ்வுகள்',
      date: '2026-06-30',
      views: '15.1K',
      duration: '35 min',
      thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      
      {/* LIVE STREAM HERO CARD */}
      <div className="bg-gradient-to-br from-[#0E6233] to-[#084325] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-[#C8102E] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 animate-pulse">
            <Radio className="w-4 h-4 text-white" />
            <span>{t('sec.liveBroadcast')}</span>
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Young Democrats LIVE TV
          </h1>
          <p className="text-emerald-100 text-xs md:text-sm leading-relaxed">
            {t('sec.liveSub')}
          </p>
          <button
            onClick={() => setActiveVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
            className="bg-[#C8102E] hover:bg-[#990B22] text-white text-xs font-extrabold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-transform active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t('sec.liveClick')}</span>
          </button>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl group cursor-pointer" onClick={() => setActiveVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}>
            <img
              src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800"
              alt="Live frame"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#C8102E] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO GALLERY GRID */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 border-l-4 border-[#C8102E] pl-3">
          {language === 'ta' ? 'அனைத்து வீடியோக்கள்' : 'Video Archives & Coverage'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoList.map(v => (
            <div key={v.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group">
              <div 
                className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
                onClick={() => setActiveVideoUrl(v.videoUrl)}
              >
                <img src={v.thumbnail} alt={v.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#C8102E] text-white flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  {v.duration}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug group-hover:text-[#C8102E] transition-colors">
                    {language === 'ta' ? v.titleTa : v.titleEn}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0E6233]" /> {v.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#C8102E]" /> {v.views} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 cursor-pointer"
            onClick={() => setActiveVideoUrl(null)}
          >
            <div 
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-[#C8102E]"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Young Democrats Stream"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
