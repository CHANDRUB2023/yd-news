'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, Eye, X, Upload, Plus, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoItem {
  id: string;
  url: string;
  localUrl?: string;
  titleEn: string;
  titleTa: string;
  date?: string;
}

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  
  // Upload modal states
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [titleEn, setTitleEn] = useState('');
  const [titleTa, setTitleTa] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          setPhotos(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('titleEn', titleEn || 'Event Photo');
      formData.append('titleTa', titleTa || 'நிகழ்வு படம்');

      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok && result.photo) {
        setPhotos([result.photo, ...photos]);
        setSuccessMessage(language === 'ta' ? 'படம் /img/ கோப்புறையில் வெற்றிகரமாக சேமிக்கப்பட்டது!' : 'Image saved successfully to /public/img/ folder!');
        setTimeout(() => {
          setSuccessMessage('');
          setIsUploadModalOpen(false);
          setUploadFile(null);
          setTitleEn('');
          setTitleTa('');
        }, 1500);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0E6233] text-white p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl space-y-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3">
          <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
            {t('nav.gallery')}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight">
            {t('sec.mediaGallery')}
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            {t('sec.gallerySub')}
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white text-xs font-black px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 shrink-0 transition-transform active:scale-95 border border-red-500"
        >
          <Upload className="w-4 h-4" />
          <span>{language === 'ta' ? 'புகைப்படம் சேமி / பதிவேற்று' : 'Save Photo to /img/'}</span>
        </button>
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-4 border-t-[#C8102E] border-[#0E6233] rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-slate-500 text-xs font-bold">Loading photo gallery...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer relative flex flex-col"
            >
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={photo.localUrl || photo.url}
                  alt={photo.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to online image if local img file not found
                    (e.target as HTMLImageElement).src = photo.url;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#C8102E] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {t('sec.viewPhoto')}
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  /img/
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-xs font-black text-slate-800 line-clamp-2 leading-snug group-hover:text-[#C8102E] transition-colors">
                  {language === 'ta' ? photo.titleTa : photo.titleEn}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal to Save Images to /public/img/ */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#C8102E]" />
                <span>{language === 'ta' ? 'படத்தை /img/ கோப்புறையில் சேமிக்க' : 'Save Image to /public/img/ Folder'}</span>
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMessage ? (
              <div className="p-4 bg-emerald-50 text-[#0E6233] border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{successMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-700 mb-1">Select Image File (saved to /img/)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#C8102E] file:text-white file:font-bold cursor-pointer bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Title in English"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">தலைப்பு (தமிழ்)</label>
                  <input
                    type="text"
                    value={titleTa}
                    onChange={(e) => setTitleTa(e.target.value)}
                    placeholder="தமிழில் தலைப்பு"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-5 py-2.5 rounded-xl bg-[#0E6233] text-white font-bold shadow hover:bg-emerald-800 transition-colors disabled:opacity-50"
                  >
                    {uploading ? 'Saving to /img/...' : 'Save to img folder'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
                src={activePhoto.localUrl || activePhoto.url}
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



