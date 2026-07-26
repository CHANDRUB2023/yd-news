'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mic, Play, Calendar, Eye, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpeechesPage() {
  const { language, t } = useLanguage();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const speechList = [
    {
      id: '1',
      titleEn: 'Keynote Speech at Chennai Youth Summit 2026',
      titleTa: 'சென்னை இளைஞர் மாநாட்டில் தலைமை உரை 2026',
      speakerEn: 'Thiru. S. Arul (State Convener)',
      speakerTa: 'திரு. செ. அருள் (மாநில ஒருங்கிணைப்பாளர்)',
      date: '2026-07-10',
      views: 843,
      duration: '18 min',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      excerptEn: 'My dear friends, the future of our state does not lie in the hands of the passive. It lies in the hands of the youth who ask questions and demand accountability.',
      excerptTa: 'எனது அருமை நண்பர்களே, நமது மாநிலத்தின் எதிர்காலம் செயலற்றவர்களின் கைகளில் இல்லை. கேள்விகளை எழுப்பும் இளைஞர்களின் கைகளிலேயே உள்ளது.'
    },
    {
      id: '2',
      titleEn: 'Addressing Educational Reforms and Incubation Centers',
      titleTa: 'கல்வி சீர்திருத்தங்கள் மற்றும் அடைகாக்கும் மையங்கள் உரையாடல்',
      speakerEn: 'Thiru. S. Arul (State Convener)',
      speakerTa: 'திரு. செ. அருள் (மாநில ஒருங்கிணைப்பாளர்)',
      date: '2026-06-25',
      views: 721,
      duration: '25 min',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      excerptEn: 'We demand government-backed startup incubators in every district college to bridge the gap between degree education and industry skills.',
      excerptTa: 'பட்டப்படிப்பு கல்விக்கும் தொழில்சார் திறன்களுக்கும் இடையே உள்ள இடைவெளியைக் குறைக்க அனைத்து மாவட்ட கல்லூரிகளிலும் அரசு நிதியுதவி பெறும் அடைகாக்கும் மையங்களைக் கோருகிறோம்.'
    },
    {
      id: '3',
      titleEn: "Women's Empowerment & Rights Conclave Address",
      titleTa: 'மகளிர் உரிமை மாநாட்டு உரை',
      speakerEn: 'Tmt. V. Anitha (Women Wing Lead)',
      speakerTa: 'திருமதி. வெ. அனிதா (மகளிர் அணி தலைவர்)',
      date: '2026-05-18',
      views: 954,
      duration: '22 min',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      excerptEn: 'Equal representation in administrative bodies is not a privilege; it is a fundamental democratic right.',
      excerptTa: 'நிர்வாக அமைப்புகளில் சமமான பிரதிநிதித்துவம் என்பது சலுகை அல்ல; அது அடிப்படை ஜனநாயக உரிமை.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-slate-900 to-[#C8102E] text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-3">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {t('nav.speeches')}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          {t('sec.featuredSpeeches')}
        </h1>
        <p className="text-slate-200 text-sm md:text-base max-w-2xl leading-relaxed">
          {t('sec.featuredSpeechesSub')}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {speechList.map(speech => (
          <div key={speech.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="space-y-4">
              <span className="inline-block bg-[#0E6233]/10 text-[#0E6233] text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                {t('sec.featuredAddress')} • {speech.duration}
              </span>
              <h2 className="text-xl font-black text-slate-900 leading-snug">
                {language === 'ta' ? speech.titleTa : speech.titleEn}
              </h2>
              <div className="flex flex-wrap gap-4 text-slate-500 text-xs font-bold">
                <span>{t('sec.speaker')}: <strong className="text-[#0E6233]">{language === 'ta' ? speech.speakerTa : speech.speakerEn}</strong></span>
                <span>{t('sec.date')}: {speech.date}</span>
                <span>{t('sec.views')}: {speech.views}</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                &ldquo;{language === 'ta' ? speech.excerptTa : speech.excerptEn}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveVideoUrl(speech.videoUrl)}
                className="bg-[#C8102E] hover:bg-[#990B22] text-white text-xs font-black px-5 py-2.5 rounded-full flex items-center gap-2 shadow transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t('sec.playSpeech')}</span>
              </button>
              <button
                onClick={() => alert(language === 'ta' ? 'சொற்பொழிவு உரைவடிவம் பதிவிறக்கம் தயார் நிலையில் உள்ளது.' : 'Downloading transcript PDF...')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t('sec.downloadTranscript')}</span>
              </button>
            </div>
          </div>
        ))}
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
                title="Speech Address"
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
