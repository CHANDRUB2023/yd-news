'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Newspaper, Mic, MapPin, Award, Heart, Radio, Vote, AlertTriangle, 
  Eye, Calendar, ArrowRight, Play, CheckCircle2, ChevronLeft, ChevronRight,
  Sparkles, Smartphone, ShieldCheck, Zap, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface EventItem {
  id: string;
  status?: string;
  titleEn: string;
  descriptionEn: string;
  titleTa: string;
  descriptionTa: string;
  date: string;
  locationEn: string;
  locationTa: string;
}

interface DistrictItem {
  id: string;
  nameEn: string;
  nameTa: string;
  leaderEn: string;
  leaderTa: string;
  phone: string;
  email: string;
}

interface SpeechItem {
  id: string;
  titleEn: string;
  titleTa: string;
  speakerEn: string;
  speakerTa: string;
  date: string;
  views: number;
  duration: string;
  videoUrl: string;
}

// Quick categories helper
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Party News': Newspaper,
  'Speeches': Mic,
  'District News': MapPin,
  'Youth Wing': Award,
  'Women\'s Wing': Heart,
  'Press Release': Radio,
  'Election Updates': Vote,
  'Government Issues': AlertTriangle
};

const categoryKeys: Record<string, string> = {
  'Party News': 'cat.partyNews',
  'Speeches': 'cat.speeches',
  'District News': 'cat.districtNews',
  'Youth Wing': 'cat.youthWing',
  'Women\'s Wing': 'cat.womensWing',
  'Press Release': 'cat.pressRelease',
  'Election Updates': 'cat.electionUpdates',
  'Government Issues': 'cat.governmentIssues'
};

function HomeContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const searchVal = searchParams.get('search') || '';

  // STATE MANAGEMENT
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [districts, setDistricts] = useState<DistrictItem[]>([]);
  const [speeches, setSpeeches] = useState<SpeechItem[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch news
        const resNews = await fetch('/api/news');
        const dataNews = await resNews.json();
        setNews(Array.isArray(dataNews) ? dataNews : []);

        // Fetch events
        const resEvents = await fetch('/api/events');
        const dataEvents = await resEvents.json();
        setEvents(Array.isArray(dataEvents) ? dataEvents : []);

        // Fetch districts
        // We can hardcode or load from local
        setDistricts([
          { id: '1', nameEn: 'Chennai', nameTa: 'சென்னை', leaderEn: 'Mr. R. Karthik', leaderTa: 'திரு. இரா. கார்த்திக்', phone: '+91 98765 43211', email: 'chennai@youngdemocrats.org' },
          { id: '2', nameEn: 'Madurai', nameTa: 'மதுரை', leaderEn: 'Ms. V. Anitha', leaderTa: 'செல்வி. வெ. அனிதா', phone: '+91 98765 43212', email: 'madurai@youngdemocrats.org' },
          { id: '3', nameEn: 'Coimbatore', nameTa: 'கோயம்புத்தூர்', leaderEn: 'Mr. K. Selvam', leaderTa: 'திரு. கோ. செல்வம்', phone: '+91 98765 43213', email: 'coimbatore@youngdemocrats.org' },
          { id: '4', nameEn: 'Salem', nameTa: 'சேலம்', leaderEn: 'Mr. A. Prem', leaderTa: 'திரு. அ. பிரேம்', phone: '+91 98765 43214', email: 'salem@youngdemocrats.org' },
          { id: '5', nameEn: 'Trichy', nameTa: 'திருச்சி', leaderEn: 'Mrs. S. Latha', leaderTa: 'திருமதி. சி. லதா', phone: '+91 98765 43215', email: 'trichy@youngdemocrats.org' },
        ]);

        // Fetch speeches
        setSpeeches([
          { id: '1', titleEn: 'Keynote Speech at Chennai Youth Summit', titleTa: 'சென்னை இளைஞர் மாநாட்டில் தலைமை உரை', speakerEn: 'Thiru. S. Arul', speakerTa: 'திரு. செ. அருள்', date: '2026-07-10', views: 843, duration: '18 min', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          { id: '2', titleEn: 'Addressing Educational Reforms and Incubation Centers', titleTa: 'கல்வி சீர்திருத்தங்கள் மற்றும் அடைகாக்கும் மையங்கள் உரையாடல்', speakerEn: 'Thiru. S. Arul', speakerTa: 'திரு. செ. அருள்', date: '2026-06-25', views: 721, duration: '25 min', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
        ]);

      } catch (err) {
        console.error('Error fetching dashboard portal data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter News
  const filteredNews = news.filter(item => {
    // Only published articles shown in public portal
    if (item.status !== 'published') return false;
    
    // Category match
    if (selectedCategory && item.category !== selectedCategory) return false;
    
    // Search match
    if (searchVal) {
      const q = searchVal.toLowerCase();
      const matchEn = item.titleEn.toLowerCase().includes(q) || item.summaryEn.toLowerCase().includes(q) || item.contentEn.toLowerCase().includes(q);
      const matchTa = item.titleTa.toLowerCase().includes(q) || item.summaryTa.toLowerCase().includes(q) || item.contentTa.toLowerCase().includes(q);
      return matchEn || matchTa;
    }
    
    return true;
  });

  // Hero Carousel Data (Showcasing top leaders/events)
  const heroSlides = [
    {
      titleEn: "Voice of People, Power of Youth!",
      titleTa: "மக்கள் குரல் மக்களுக்காக!",
      descEn: "Young Democrats launch the 'Green Tamil Nadu' Campaign to plant 100,000 saplings statewide.",
      descTa: "மாநிலம் தழுவிய அளவில் 1 லட்சம் மரக்கன்றுகளை நடுவதற்கு இளம் ஜனநாயகவாதிகள் 'பசுமைத் தமிழ்நாடு' பிரச்சாரத்தை முன்னெடுத்துள்ளனர்.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
      buttonTextEn: "Read Campaign News",
      buttonTextTa: "செய்தியை வாசிக்க",
      actionUrl: "#news",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      titleEn: "Demand for Educational Reforms & Job Incubation Centers",
      titleTa: "கல்வி சீர்திருத்தங்கள் மற்றும் அடைகாக்கும் மையங்கள் கோரிக்கை",
      descEn: "State Coordinator Thiru. S. Arul spearheads district tour to emphasize skill-based public education.",
      descTa: "திறன் சார்ந்த பொதுக் கல்வியை வலியுறுத்தி மாநில ஒருங்கிணைப்பாளர் திரு. செ. அருள் மாவட்ட வாரியான சுற்றுப்பயணத்தை மேற்கொள்கிறார்.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200",
      buttonTextEn: "Watch Speech Video",
      buttonTextTa: "காணொளியைக் காண்க",
      actionUrl: "#speeches",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      titleEn: "Women's Wing Leadership Summit 2026",
      titleTa: "மகளிர் அணி தலைமைத்துவ மாநாடு 2026",
      descEn: "Advocating for workspace safety protocols and 50% reservation in local administration.",
      descTa: "பணியிட பாதுகாப்பு விதிகள் மற்றும் உள்ளாட்சி அமைப்புகளில் 50% இடஒதுக்கீடு பெறக் குரல் எழுப்புகிறோம்.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200",
      buttonTextEn: "Read Resolutions",
      buttonTextTa: "தீர்மானங்களை வாசிக்க",
      actionUrl: "#news",
      videoUrl: ""
    }
  ];

  // Auto transition hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Gallery items (mock)
  const galleryPhotos = [
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600",
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* A. HERO BANNER / SLIDER */}
      <section className="relative w-full h-[400px] md:h-[580px] bg-black overflow-hidden select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/30 z-10" />
            <img 
              src={heroSlides[heroIndex].image} 
              alt="Leader Showcase Banner" 
              className="w-full h-full object-cover opacity-85"
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Content */}
        <div className="absolute inset-0 flex flex-col justify-end z-20 pb-12 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl space-y-4 text-left"
          >
            <span className="inline-flex items-center gap-1 bg-[#E31B23] text-white text-[10px] md:text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight
            </span>
            <h1 className="text-white text-3xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
              {language === 'en' ? heroSlides[heroIndex].titleEn : heroSlides[heroIndex].titleTa}
            </h1>
            <p className="text-zinc-200 text-sm md:text-lg font-medium leading-relaxed max-w-2xl drop-shadow">
              {language === 'en' ? heroSlides[heroIndex].descEn : heroSlides[heroIndex].descTa}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={heroSlides[heroIndex].actionUrl}
                className="bg-[#0B5D34] hover:bg-[#084325] border border-[#0B5D34] text-white text-xs md:text-sm font-extrabold px-6 py-3 rounded-full shadow-lg transition-all transform active:scale-95"
              >
                {language === 'en' ? heroSlides[heroIndex].buttonTextEn : heroSlides[heroIndex].buttonTextTa}
              </Link>
              {heroSlides[heroIndex].videoUrl && (
                <button
                  onClick={() => setActiveVideoUrl(heroSlides[heroIndex].videoUrl)}
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs md:text-sm font-extrabold px-6 py-3 rounded-full flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <Play className="w-4 h-4 text-[#E31B23] fill-current" />
                  {t('watchVideo')}
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Carousel controls */}
        <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 flex gap-2 z-30">
          <button
            onClick={() => setHeroIndex(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 rounded-full bg-black/45 border border-white/10 text-white hover:bg-[#0B5D34] transition-all flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setHeroIndex(prev => (prev + 1) % heroSlides.length)}
            className="w-10 h-10 rounded-full bg-black/45 border border-white/10 text-white hover:bg-[#0B5D34] transition-all flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* B. TOP CATEGORIES QUICK FILTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-6">
          <h2 className="text-lg font-black text-[#111111] uppercase tracking-wider border-l-4 border-[#0B5D34] pl-3 mb-1">
            {t('sec.browseCategory')}
          </h2>
          <p className="text-zinc-500 text-xs">{t('sec.browseCategorySub')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {Object.entries(categoryIcons).map(([catName, Icon]) => {
            const isSelected = selectedCategory === catName;
            return (
              <button
                key={catName}
                onClick={() => setSelectedCategory(isSelected ? null : catName)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B5D34] border-[#0B5D34] text-white shadow-lg scale-105'
                    : 'bg-white border-zinc-200 text-[#111111] hover:border-[#0B5D34] hover:shadow-md'
                }`}
              >
                <div className={`p-2.5 rounded-full mb-2 ${isSelected ? 'bg-white/10' : 'bg-green-50 text-[#0B5D34]'}`}>
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-tight">
                  {t(categoryKeys[catName])}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* C. DYNAMIC NEWS FEED & GRIDS */}
      <section id="news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-200 pb-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#111111] tracking-tight uppercase">
              {t('sec.latestNews')}
              {selectedCategory && <span className="text-[#E31B23] text-sm ml-2">({t(categoryKeys[selectedCategory])})</span>}
            </h2>
            <p className="text-zinc-500 text-xs mt-1">{t('sec.verifiedReleases')}</p>
          </div>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-[#0B5D34] hover:underline text-xs font-bold flex items-center gap-1"
            >
              {t('sec.clearFilter')}
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-t-[#E31B23] border-[#0B5D34] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-500 text-xs font-bold">Retrieving latest feed articles...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-zinc-200 rounded-xl bg-white">
            <Newspaper className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-zinc-700 font-extrabold text-sm mb-1">No Articles Found</h3>
            <p className="text-zinc-400 text-xs">There are no articles available matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, idx) => (
              <article 
                key={item.id || idx} 
                className="bg-white rounded-2xl overflow-hidden border border-zinc-150 hover:border-[#0B5D34]/40 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* News Image */}
                <div className="relative w-full h-48 bg-zinc-100 overflow-hidden shrink-0">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"}
                    alt={item.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-[#0B5D34] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                    {t(categoryKeys[item.category] || item.category)}
                  </span>
                  
                  {/* Watch Video icon overlay */}
                  {item.videoUrl && (
                    <button 
                      onClick={() => setActiveVideoUrl(item.videoUrl || null)}
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#E31B23] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </button>
                  )}
                </div>

                {/* News details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#0B5D34]" />
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[#0B5D34]" />
                        {item.views || 0} views
                      </span>
                    </div>
                    <h3 className="text-[#111111] font-black text-md leading-snug group-hover:text-[#0B5D34] transition-colors line-clamp-2">
                      {language === 'en' ? item.titleEn : item.titleTa}
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                      {language === 'en' ? item.summaryEn : item.summaryTa}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    <button 
                      onClick={() => setActiveImageUrl(item.imageUrl || null)} 
                      className="text-[#E31B23] hover:text-[#b51218] text-xs font-extrabold flex items-center gap-1"
                    >
                      {t('readMore')} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    {item.videoUrl && (
                      <span className="text-[10px] text-zinc-400 font-bold bg-zinc-100 px-2 py-0.5 rounded">
                        Has Video
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* D. LIVE TV SECTION */}
      <section id="livetv" className="bg-gradient-to-br from-[#0B5D34] to-[#084325] py-16 text-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-[#E31B23] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest animate-pulse border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
              {t('sec.liveBroadcast')}
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Young Democrats LIVE TV / நேரடி ஒளிபரப்பு
            </h2>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              {t('sec.liveSub')}
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-[#E31B23] shrink-0" />
                <span>{t('sec.liveBullet1')}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-[#E31B23] shrink-0" />
                <span>{t('sec.liveBullet2')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Live TV Container with Player */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" 
                alt="Live Broadcast Frame Placeholder" 
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <button
                  onClick={() => setActiveVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#E31B23] text-white flex items-center justify-center shadow-2xl border border-white/20 hover:scale-105 active:scale-95 transition-transform"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
                </button>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest mt-4 text-white/90">{t('sec.liveClick')}</span>
              </div>
              
              {/* Overlay controls */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span>1,248 {t('sec.liveViewers')}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* E. FEATURED SPEECHES SECTION */}
      <section id="speeches" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center md:text-left mb-10 border-b border-zinc-200 pb-4">
          <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tight">
            {t('sec.featuredSpeeches')}
          </h2>
          <p className="text-zinc-500 text-xs">{t('sec.featuredSpeechesSub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {speeches.map((speech, idx) => (
            <div 
              key={speech.id || idx} 
              className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="space-y-4">
                <span className="inline-block bg-[#0B5D34]/10 text-[#0B5D34] text-[10px] font-black tracking-widest px-2.5 py-1 rounded uppercase">
                  {t('sec.featuredAddress')}
                </span>
                <h3 className="text-[#111111] font-black text-lg md:text-xl leading-snug">
                  {language === 'en' ? speech.titleEn : speech.titleTa}
                </h3>
                <div className="flex flex-wrap gap-4 text-zinc-400 text-xs font-bold">
                  <span>{t('sec.speaker')}: <span className="text-[#0B5D34]">{language === 'en' ? speech.speakerEn : speech.speakerTa}</span></span>
                  <span>{t('sec.date')}: {speech.date}</span>
                  <span>{t('sec.views')}: {speech.views}</span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed italic">
                  &ldquo;{language === 'en' 
                    ? "My dear friends, the future of our state does not lie in the hands of the passive. It lies in the hands of the youth who ask questions..." 
                    : "எனது அருமை நண்பர்களே, நமது மாநிலத்தின் எதிர்காலம் செயலற்றவர்களின் கைகளில் இல்லை. கேள்விகளை எழுப்பும் இளைஞர்களின் கைகளிலேயே உள்ளது..."
                  }&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveVideoUrl(speech.videoUrl)}
                  className="bg-[#E31B23] hover:bg-[#b51218] text-white text-xs font-extrabold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {t('sec.playSpeech')}
                </button>
                <button 
                  onClick={() => alert(`Transcript downloads are currently limited to registered media profiles.`)}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-extrabold px-5 py-2.5 rounded-full"
                >
                  {t('sec.downloadTranscript')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. PHOTO & VIDEO GALLERIES */}
      <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center md:text-left mb-10 border-b border-zinc-200 pb-4">
          <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tight">
            {t('sec.mediaGallery')}
          </h2>
          <p className="text-zinc-500 text-xs font-bold">{t('sec.gallerySub')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryPhotos.map((url, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveImageUrl(url)}
              className="relative aspect-square bg-zinc-100 rounded-xl overflow-hidden shadow-sm border border-zinc-200 hover:border-[#0B5D34]/40 cursor-pointer group"
            >
              <img 
                src={url} 
                alt={`Gallery image ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-[10px] text-white font-extrabold uppercase bg-[#0B5D34] px-2.5 py-1 rounded-full shadow-md">
                  {t('sec.viewPhoto')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* G. EVENTS SECTION */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center md:text-left mb-10 border-b border-zinc-200 pb-4">
          <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tight">
            {t('nav.events')}
          </h2>
          <p className="text-zinc-500 text-xs">{t('sec.eventsSub')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.length > 0 ? (
            events.map((event, idx) => (
              <div key={event.id || idx} className="bg-white border border-zinc-150 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-sm">
                <div className="bg-green-50 text-[#0B5D34] px-5 py-4 rounded-xl flex flex-col items-center justify-center shrink-0 border border-green-100 min-w-24">
                  <span className="text-xs font-black uppercase tracking-wider">AUG</span>
                  <span className="text-3xl font-black">{new Date(event.date).getDate() || (15 - idx * 14)}</span>
                </div>
                <div className="space-y-2 flex-grow">
                  <span className="inline-block bg-[#E31B23]/10 text-[#E31B23] text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase">
                    {event.status || 'upcoming'}
                  </span>
                  <h3 className="text-[#111111] font-black text-md leading-snug">
                    {language === 'en' ? event.titleEn : event.titleTa}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    {language === 'en' ? event.descriptionEn : event.descriptionTa}
                  </p>
                  <p className="text-[#0B5D34] text-xs font-bold flex items-center gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {language === 'en' ? event.locationEn : event.locationTa}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-zinc-400 text-xs py-8">
              {t('sec.noEvents')}
            </div>
          )}
        </div>
      </section>

      {/* H. DISTRICTS SECTOR MAP */}
      <section id="districts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center md:text-left mb-10 border-b border-zinc-200 pb-4">
          <h2 className="text-2xl font-black text-[#111111] uppercase tracking-tight">
            {t('nav.districts')}
          </h2>
          <p className="text-zinc-500 text-xs">{t('sec.districtsSub')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {districts.map((dist, idx) => (
            <div 
              key={dist.id || idx}
              className="bg-white border border-zinc-200 hover:border-[#0B5D34]/40 rounded-2xl p-5 text-center shadow-sm space-y-4 hover:shadow transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 border border-green-150 flex items-center justify-center mx-auto text-[#0B5D34] font-black text-sm">
                {dist.nameEn.slice(0, 2).toUpperCase()}
              </div>
              <div className="space-y-1">
                <h4 className="text-[#111111] font-black text-md">
                  {language === 'en' ? dist.nameEn : dist.nameTa}
                </h4>
                <p className="text-[10px] font-bold text-[#E31B23] uppercase tracking-wider">
                  {language === 'en' ? dist.leaderEn : dist.leaderTa}
                </p>
              </div>
              <div className="text-[10px] text-zinc-500 space-y-1 pt-2 border-t border-zinc-100">
                <p className="font-medium">Ph: {dist.phone}</p>
                <p className="font-medium select-all truncate">{dist.email}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* I. MOBILE PREVIEW SECTION */}
      <section className="bg-zinc-100 py-16 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-[#111111] tracking-tight leading-tight uppercase">
              {t('sec.mobilePreview')}
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
              {t('sec.mobilePreviewSub')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-2">
                <Zap className="w-6 h-6 text-[#E31B23]" />
                <h4 className="text-xs font-black text-[#111111]">{t('sec.mobileFast')}</h4>
                <p className="text-[10px] text-zinc-400">{t('sec.mobileFastSub')}</p>
              </div>
              <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-2">
                <Smartphone className="w-6 h-6 text-[#0B5D34]" />
                <h4 className="text-xs font-black text-[#111111]">{t('sec.mobileUi')}</h4>
                <p className="text-[10px] text-zinc-400">{t('sec.mobileUiSub')}</p>
              </div>
              <div className="p-4 bg-white border border-zinc-200 rounded-xl space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#0B5D34]" />
                <h4 className="text-xs font-black text-[#111111]">{t('sec.mobileSec')}</h4>
                <p className="text-[10px] text-zinc-400">{t('sec.mobileSecSub')}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* FLOATING MOBILE PHONE MOCKUP */}
            <div className="relative w-[280px] h-[560px] bg-zinc-900 rounded-[40px] shadow-2xl border-[8px] border-zinc-800 flex items-center justify-center p-2.5 overflow-hidden">
              {/* Speaker & camera slot */}
              <div className="absolute top-2 w-28 h-4 bg-zinc-800 rounded-full z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-black/60 mr-2"></div>
                <div className="w-12 h-1 bg-black/45 rounded-full"></div>
              </div>
              
              {/* Phone Content Screen */}
              <div className="w-full h-full bg-white rounded-[28px] overflow-hidden relative flex flex-col select-none pt-4 text-[10px] font-sans">
                
                {/* Mini Header */}
                <div className="bg-[#0B5D34] text-white px-3 py-2 flex items-center justify-between shrink-0 font-bold border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="relative w-4 h-4 bg-white rounded-full overflow-hidden p-0.5 shrink-0 flex items-center justify-center">
                      <Image src="/logo.png" alt="logo" fill className="object-cover" />
                    </div>
                    <span className="text-[7px]">Y.D.</span>
                  </div>
                  <span className="bg-[#E31B23] text-[6px] tracking-widest font-black px-1.5 py-0.5 rounded text-white animate-pulse uppercase">LIVE</span>
                </div>

                {/* Mini breaking news */}
                <div className="bg-[#E31B23] text-white text-[7px] font-bold px-2 py-1 shrink-0 overflow-hidden relative flex items-center">
                  <span className="shrink-0 bg-black text-white px-1 mr-1 text-[6px] uppercase">HOT</span>
                  <div className="animate-pulse truncate font-medium">Statewide Reforestation Drive Commences...</div>
                </div>

                {/* Mini Body scroll area */}
                <div className="flex-grow overflow-y-auto p-3 space-y-3">
                  
                  {/* Hero card */}
                  <div className="relative rounded-lg overflow-hidden h-28 bg-black">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400" alt="Hero" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-2.5 flex flex-col justify-end">
                      <h5 className="text-white font-black text-[8px] leading-tight truncate">Green Tamil Nadu Initiative</h5>
                      <p className="text-zinc-200 text-[6px] truncate">100,000 saplings reforestation drive.</p>
                    </div>
                  </div>

                  {/* News list */}
                  <div className="space-y-2">
                    <h6 className="font-bold text-[#111111] uppercase tracking-wide border-l-2 border-[#0B5D34] pl-1 text-[8px]">{t('sec.latestUpdates')}</h6>
                    
                    <div className="flex gap-2 p-1.5 bg-zinc-50 border border-zinc-150 rounded">
                      <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=200" alt="N" className="w-8 h-8 object-cover rounded shrink-0" />
                      <div className="min-w-0">
                        <h6 className="font-bold text-[#111111] leading-tight block truncate">Educational Reform Tour</h6>
                        <p className="text-[6px] text-zinc-400 truncate">Leader Thiru S. Arul demands educational adjustments...</p>
                      </div>
                    </div>

                    <div className="flex gap-2 p-1.5 bg-zinc-50 border border-zinc-150 rounded">
                      <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=200" alt="N" className="w-8 h-8 object-cover rounded shrink-0" />
                      <div className="min-w-0">
                        <h6 className="font-bold text-[#111111] leading-tight block truncate">Women Wing Rally</h6>
                        <p className="text-[6px] text-zinc-400 truncate">Advocating for safety guidelines and 50% reservation...</p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Mini Navigation Bar Footer */}
                <div className="bg-zinc-50 border-t border-zinc-200 py-1.5 px-3 flex justify-between items-center shrink-0 text-zinc-400 font-bold text-[6px]">
                  <span className="text-[#0B5D34]">Home</span>
                  <span>News</span>
                  <span>Videos</span>
                  <span>Districts</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* J. LIGHTBOX & VIDEO MODAL PORTALS */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-50 cursor-pointer"
            onClick={() => setActiveVideoUrl(null)}
          >
            <div 
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-[#E31B23]"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Simulated Embed player */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Young Democrats Broadcast Channel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeImageUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 z-50 cursor-pointer"
            onClick={() => setActiveImageUrl(null)}
          >
            <div 
              className="relative w-full max-w-3xl max-h-[85vh] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveImageUrl(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-[#E31B23] z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img 
                src={activeImageUrl} 
                alt="Enlarged media asset" 
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function HomePage() {
  return (
    <React.Suspense fallback={
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-t-[#E31B23] border-[#0B5D34] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-500 text-xs font-bold">Loading Young Democrats Portal...</p>
      </div>
    }>
      <HomeContent />
    </React.Suspense>
  );
}
