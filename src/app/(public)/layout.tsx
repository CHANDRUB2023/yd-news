'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Smartphone, UserPlus, Heart, Search, Radio, ChevronDown, 
  Menu, X, ShieldCheck
} from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mainNavItems = [
    { nameKey: 'nav.home', href: '/' },
    { nameKey: 'nav.news', href: '/news' },
    { nameKey: 'nav.districts', href: '/districts' },
    { nameKey: 'nav.speeches', href: '/speeches' },
    { nameKey: 'nav.gallery', href: '/gallery' },
    { nameKey: 'nav.videos', href: '/videos' },
    { nameKey: 'nav.events', href: '/events' },
    { nameKey: 'nav.peoplesVoice', href: '/peoples-voice' },
    { nameKey: 'nav.about', href: '/about' },
    { nameKey: 'nav.contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans">
      
      {/* 1. TOP RED ANNOUNCEMENT TICKER BAR */}
      <div className="bg-[#C8102E] text-white text-xs font-bold flex items-center justify-between h-9 px-4 sm:px-8 border-b border-red-800 z-50 overflow-hidden">
        
        {/* Left Breaking News Ticker */}
        <div className="flex items-center gap-3 overflow-hidden flex-1 mr-4">
          <div className="bg-[#990B22] text-white px-2.5 py-0.5 rounded text-[10px] uppercase font-black tracking-wider shrink-0 shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            {t('ticker.breaking')}
          </div>
          <div className="overflow-hidden relative w-full">
            <div className="animate-ticker whitespace-nowrap text-xs font-medium tracking-wide">
              <span>{language === 'ta' ? 'தமிழகத்தில் இளைஞர் நலத்திட்டங்கள் விரைவில் - முழு விவரம்! ✦ மாநிலம் முழுவதும் புதிய உறுப்பினர் சேர்க்கை முகாம் ✦ மக்கள் குரல் திட்டத்தின் மூலம் உடனடியாக பிரச்சனைகளுக்கு தீர்வு!' : 'Youth welfare projects launching across Tamil Nadu soon! ✦ Statewide new membership campaign ongoing ✦ Resolve issues fast with People\'s Voice portal!'}</span>
            </div>
          </div>
        </div>

        {/* Right Quick Action Links */}
        <div className="hidden md:flex items-center gap-4 text-[11px] font-bold shrink-0">
          <a href="#app" onClick={(e) => { e.preventDefault(); alert(language === 'ta' ? "அலைபேசி செயலி பதிவிறக்கம் விரைவில்!" : "Mobile App Download Link Coming Soon!"); }} className="flex items-center gap-1 hover:text-red-200 transition-colors">
            <Smartphone className="w-3.5 h-3.5" /> Mobile App
          </a>
          <Link href="/membership" className="flex items-center gap-1 hover:text-red-200 transition-colors">
            <UserPlus className="w-3.5 h-3.5" /> {t('nav.membership')}
          </Link>
          <Link href="/volunteer" className="flex items-center gap-1 hover:text-red-200 transition-colors">
            <Heart className="w-3.5 h-3.5 text-red-200" /> {t('nav.volunteer')}
          </Link>
          <div className="h-3 w-px bg-white/30"></div>
          
          {/* Language Switcher */}
          <button 
            onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
            className="flex items-center gap-1 hover:text-red-200 cursor-pointer font-extrabold select-none bg-black/20 px-2 py-0.5 rounded border border-white/20"
            title="Switch Language / மொழியை மாற்றவும்"
          >
            <span className={language === 'ta' ? 'text-yellow-300 font-black' : 'text-white/80'}>தமிழ்</span>
            <span className="text-white/50 font-normal">|</span>
            <span className={language === 'en' ? 'text-yellow-300 font-black' : 'text-white/80'}>English</span>
          </button>
        </div>

      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 gap-2">
            
            {/* Round Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-11 h-11 rounded-full border-2 border-[#C8102E]/30 shadow-md overflow-hidden bg-white shrink-0 flex items-center justify-center p-0.5 group hover:scale-105 transition-transform">
                <img src="/img/flag.svg" alt="Young Democrats Flag" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="leading-tight">
                <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight uppercase">YOUNG DEMOCRATS</h1>
                <p className="text-[9px] sm:text-[10px] font-extrabold text-[#C8102E] tracking-wider uppercase">{t('slogan')}</p>
              </div>
            </Link>

            {/* Desktop Navigation Links (Responsive compact spacing for Tamil text) */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 overflow-x-auto no-scrollbar py-1">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.nameKey}
                    href={item.href}
                    className={`relative px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs font-extrabold transition-colors whitespace-nowrap flex items-center gap-1 ${
                      isActive 
                        ? 'text-[#C8102E]' 
                        : 'text-slate-700 hover:text-[#C8102E]'
                    }`}
                  >
                    <span>{t(item.nameKey)}</span>
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-1.5 h-0.75 bg-[#C8102E] rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Language switch button for small screens */}
              <button 
                onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
                className="md:hidden text-[11px] font-extrabold text-[#C8102E] bg-red-50 border border-red-200 px-2 py-1 rounded"
              >
                {language === 'ta' ? 'ENG' : 'தமிழ்'}
              </button>

              {/* Search Modal Trigger */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                title="Search Portal"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* LIVE TV Pill Button */}
              <Link
                href="/videos"
                className="bg-[#C8102E] hover:bg-[#A00B22] text-white text-xs font-black px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-md transition-all active:scale-95 border border-red-700"
              >
                <Radio className="w-4 h-4 animate-pulse text-red-200" />
                <span>{t('nav.liveTv')}</span>
              </Link>

              {/* Admin Portal Quick Link */}
              <Link
                href="/admin/login"
                className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-[#0E6233] bg-slate-100 hover:bg-emerald-50 border border-slate-200 px-3 py-1.5 rounded-full transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#0E6233]" />
                <span>{t('nav.admin')}</span>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>

          </div>
        </div>

        {/* Search Input Bar Expansion */}
        {searchOpen && (
          <div className="bg-slate-100 p-3 border-t border-slate-200">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}#news`;
                }
              }}
              className="max-w-2xl mx-auto flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                autoFocus
              />
              <button type="submit" className="bg-[#C8102E] text-white text-xs font-bold px-4 py-2 rounded-xl">
                {t('search')}
              </button>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-xs font-bold text-slate-500 hover:text-slate-800">
                {t('cancel')}
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 p-4 space-y-2 shadow-lg">
            {mainNavItems.map((item) => (
              <Link
                key={item.nameKey}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 rounded-lg text-sm font-bold text-slate-800 hover:bg-red-50 hover:text-[#C8102E]"
              >
                {t(item.nameKey)}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <Link href="/admin/login" className="text-xs font-bold text-[#0E6233] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> {t('nav.admin')}
              </Link>
              <button 
                onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
                className="text-xs font-bold text-[#C8102E]"
              >
                {language === 'ta' ? 'English' : 'தமிழ்'}
              </button>
            </div>
          </div>
        )}

      </header>

      {/* 3. MAIN PAGE CONTENT VIEWPORT */}
      <main className="flex-1">
        {children}
      </main>

      {/* 4. FOOTER BANNER & COPYRIGHT */}
      <footer className="bg-slate-950 text-white mt-12 border-t border-slate-800">
        
        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-white/30 shadow overflow-hidden bg-white shrink-0 p-0.5 flex items-center justify-center">
                <img src="/img/flag.svg" alt="Young Democrats Flag" className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-sm font-black tracking-tight uppercase text-white">YOUNG DEMOCRATS</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-tamil">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="font-extrabold uppercase text-white tracking-wider border-l-2 border-[#C8102E] pl-2">{t('footer.quickLinks')}</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link href="/" className="hover:text-white">{t('nav.home')}</Link></li>
              <li><Link href="/peoples-voice" className="hover:text-white">{t('nav.peoplesVoice')}</Link></li>
              <li><Link href="/news" className="hover:text-white">{t('nav.news')}</Link></li>
              <li><Link href="/districts" className="hover:text-white">{t('nav.districts')}</Link></li>
              <li><Link href="/events" className="hover:text-white">{t('nav.events')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Wings */}
          <div className="space-y-2">
            <h4 className="font-extrabold uppercase text-white tracking-wider border-l-2 border-[#0E6233] pl-2">Organization Wings</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link href="/about" className="hover:text-white">{t('cat.youthWing')}</Link></li>
              <li><Link href="/about" className="hover:text-white">{t('cat.womensWing')}</Link></li>
              <li><Link href="/speeches" className="hover:text-white">{t('cat.speeches')}</Link></li>
              <li><Link href="/membership" className="hover:text-white">{t('nav.membership')}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Portal */}
          <div className="space-y-2">
            <h4 className="font-extrabold uppercase text-white tracking-wider border-l-2 border-[#C8102E] pl-2">{t('nav.admin')}</h4>
            <p className="text-slate-400">Authorized login for Admin and Editorial team members.</p>
            <Link 
              href="/admin/login" 
              className="inline-flex items-center gap-1.5 bg-[#0E6233] hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors mt-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Sign In to Admin Panel
            </Link>
          </div>

        </div>

        {/* Copyright */}
        <div className="bg-black py-4 border-t border-slate-900 text-center text-[11px] text-slate-500">
          {t('footer.copyright')}
        </div>

      </footer>

    </div>
  );
}
