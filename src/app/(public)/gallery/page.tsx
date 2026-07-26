'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [activePhoto, setActivePhoto] = useState<{ url: string; titleEn: string; titleTa: string } | null>(null);

  const photos = [
    { url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", titleEn: "Green Tamil Nadu Reforestation Drive", titleTa: "பசுமைத் தமிழ்நாடு காடமைப்பு இயக்கம்" },
    { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800", titleEn: "Youth Rally in Chennai Headquarters", titleTa: "சென்னை தலைமை அலுவலகத்தில் இளைஞர் பேரணி" },
    { url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800", titleEn: "Women's Wing Conclave 2026", titleTa: "மகளிர் அணி மாநாடு 2026" },
    { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800", titleEn: "District Leadership Assembly", titleTa: "மாவட்ட நிர்வாகிகள் கூட்டம்" },
    { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800", titleEn: "Student Rights Public Forum", titleTa: "மாணவர் உரிமைகள் பொது மன்றம்" },
    { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800", titleEn: "Volunteer Training Workshop", titleTa: "தன்னார்வலர் பயிற்சி முகாம்" },
    { url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800", titleEn: "Community Service Drive in Madurai", titleTa: "மதுரையில் சமூக சேவை இயக்கம்" },
    { url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=800", titleEn: "Youth Leadership Conclave", titleTa: "இளைஞர் தலைமைத்துவ மாநாடு" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0E6233] text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-3">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {t('nav.gallery')}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          {t('sec.mediaGallery')}
        </h1>
        <p className="text-slate-200 text-sm md:text-base max-w-2xl leading-relaxed">
          {t('sec.gallerySub')}
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setActivePhoto(photo)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer relative"
          >
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              <img
                src={photo.url}
                alt={photo.titleEn}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-[#C8102E] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {t('sec.viewPhoto')}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xs font-black text-slate-800 line-clamp-1 group-hover:text-[#C8102E] transition-colors">
                {language === 'ta' ? photo.titleTa : photo.titleEn}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50 cursor-pointer"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl space-y-4 p-4 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-[#C8102E]"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={activePhoto.url}
                alt={activePhoto.titleEn}
                className="w-full max-h-[70vh] object-contain rounded-2xl"
              />
              <div className="px-4 pb-2 text-center">
                <h3 className="text-base font-black text-white">
                  {language === 'ta' ? activePhoto.titleTa : activePhoto.titleEn}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
