'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Newspaper, Calendar, Eye, ArrowRight, Search, Filter } from 'lucide-react';

interface NewsItem {
  id: string;
  status: string;
  category: string;
  titleEn: string;
  summaryEn: string;
  contentEn: string;
  titleTa: string;
  summaryTa: string;
  contentTa: string;
  imageUrl?: string;
  videoUrl?: string;
  date: string;
  views?: number;
}

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const res = await fetch('/api/news');
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch news:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const categories = [
    { key: 'ALL', labelEn: 'All News', labelTa: 'அனைத்து செய்திகளும்' },
    { key: 'Party News', labelEn: 'Party News', labelTa: 'கட்சி செய்திகள்' },
    { key: 'District News', labelEn: 'District News', labelTa: 'மாவட்ட செய்திகள்' },
    { key: 'Youth Wing', labelEn: 'Youth Wing', labelTa: 'இளைஞர் அணி' },
    { key: 'Women\'s Wing', labelEn: 'Women\'s Wing', labelTa: 'மகளிர் அணி' },
    { key: 'Press Release', labelEn: 'Press Release', labelTa: 'செய்திக்குறிப்பு' },
    { key: 'Election Updates', labelEn: 'Election Updates', labelTa: 'தேர்தல் செய்திகள்' },
    { key: 'Government Issues', labelEn: 'Government Issues', labelTa: 'அரசுப் பிரச்சனைகள்' },
  ];

  const filtered = news.filter(item => {
    if (item.status !== 'published') return false;
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = item.titleEn.toLowerCase().includes(q) || item.summaryEn.toLowerCase().includes(q);
      const matchTa = item.titleTa.toLowerCase().includes(q) || item.summaryTa.toLowerCase().includes(q);
      return matchEn || matchTa;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#C8102E] text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
            {t('nav.news')}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            {language === 'ta' ? 'அனைத்து அதிகாரப்பூர்வ செய்திகள்' : 'Official News Bulletin & Updates'}
          </h1>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            {language === 'ta' 
              ? 'இளம் ஜனநாயகவாதிகள் இயக்கத்தின் அண்மைக்கால செய்திகள், அறிக்கைகள் மற்றும் கட்சி அறிவிப்புகளை உடனுக்குடன் பெறுக.'
              : 'Stay updated with verified releases, district campaigns, and leadership announcements from Young Democrats.'}
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('nav.searchPlaceholder')}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs font-bold">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-[#C8102E] text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {language === 'ta' ? cat.labelTa : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-12 h-12 border-4 border-t-[#C8102E] border-[#0E6233] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 text-xs font-bold">Loading news bulletin...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white space-y-3">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-slate-700 font-extrabold text-sm">
            {language === 'ta' ? 'செய்திகள் எதுவும் கிடைக்கவில்லை' : 'No News Articles Found'}
          </h3>
          <p className="text-slate-400 text-xs">
            {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட வகைக்கு ஏற்ப செய்திகள் இல்லை.' : 'Try adjusting your category filter or search terms.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(item => (
            <article 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#C8102E]/40 hover:shadow-xl transition-all flex flex-col group"
            >
              <div className="relative w-full h-52 bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={item.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"}
                  alt={item.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-[#0E6233] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0E6233]" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-[#C8102E]" />
                      {item.views || 0} {t('sec.views')}
                    </span>
                  </div>
                  <h2 className="text-slate-900 font-black text-base leading-snug group-hover:text-[#C8102E] transition-colors line-clamp-2">
                    {language === 'ta' ? item.titleTa : item.titleEn}
                  </h2>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-medium">
                    {language === 'ta' ? item.summaryTa : item.summaryEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    href={`/news/${item.id}`}
                    className="text-[#C8102E] hover:text-[#990B22] text-xs font-extrabold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{t('readMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
