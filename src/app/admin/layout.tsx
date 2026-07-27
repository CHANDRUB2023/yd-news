'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Menu, Search, Bell, Download, ChevronDown, 
  LayoutDashboard, Newspaper, Layers, MapPin, Image as ImageIcon, 
  Video, Camera, Tv, Calendar, FileText, CheckSquare, DownloadCloud, 
  Users, UserCheck, MessageSquare, Mail, BarChart2, Search as SearchIcon, 
  Settings, ShieldAlert, RotateCcw, X, LogOut, ChevronRight, Sparkles, Contact, Home
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login' || pathname?.startsWith('/admin/login');

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  // Bypass admin layout on login page so sidebar and top header don't show up on login
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading indicator while checking authentication state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-300">Checking Auth...</p>
        </div>
      </div>
    );
  }

  // If not logged in and trying to view protected admin page, show redirecting state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold tracking-wider uppercase text-slate-300">Redirecting to Admin Sign In...</p>
        </div>
      </div>
    );
  }

  const handleLogoutToHome = () => {
    logout();
    router.push('/');
  };

  const navCategories = [
    {
      title: language === 'ta' ? 'உள்ளடக்க மேலாண்மை' : 'CONTENT MANAGEMENT',
      items: [
        { name: language === 'ta' ? 'முகப்பு பலகை' : 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: language === 'ta' ? 'செய்தி மேலாண்மை' : 'News Management', icon: Newspaper, href: '/admin/news' },
        { name: language === 'ta' ? 'வகைகள்' : 'Categories', icon: Layers, href: '/admin/categories' },
        { name: language === 'ta' ? 'மாவட்டங்கள்' : 'Districts', icon: MapPin, href: '/admin/districts' },
        { name: language === 'ta' ? 'ஊடக நூலகம்' : 'Media Library', icon: ImageIcon, href: '/admin/media' },
        { name: language === 'ta' ? 'காணொளிகள்' : 'Videos', icon: Video, href: '/admin/videos' },
        { name: language === 'ta' ? 'புகைப்படத் தொகுப்பு' : 'Photo Gallery', icon: Camera, href: '/admin/photos' },
        { name: language === 'ta' ? 'லைவ் டிவி மேலாண்மை' : 'Live TV Management', icon: Tv, href: '/admin/livetv' },
        { name: language === 'ta' ? 'நிகழ்வுகள்' : 'Events', icon: Calendar, href: '/admin/events' },
        { name: language === 'ta' ? 'செய்திக்குறிப்புகள்' : 'Press Releases', icon: FileText, href: '/admin/press-releases' },
        { name: language === 'ta' ? 'உண்மைச் சரிபார்ப்பு' : 'Fact Check', icon: CheckSquare, href: '/admin/fact-check' },
        { name: language === 'ta' ? 'பதிவிறக்கங்கள்' : 'Downloads', icon: DownloadCloud, href: '/admin/downloads' },
        { name: language === 'ta' ? 'மக்கள் குரல்' : "People's Voice", icon: Sparkles, href: '/admin/peoples-voice' },
      ]
    },
    {
      title: language === 'ta' ? 'பயனர் & உறுப்பினர் மேலாண்மை' : 'USER & MEMBER MANAGEMENT',
      items: [
        { name: language === 'ta' ? 'கட்சி உறுப்பினர்கள்' : 'Party Members', icon: Contact, href: '/admin/members' },
        { name: language === 'ta' ? 'அட்மின் பயனர்கள்' : 'Admin Users', icon: Users, href: '/admin/users' },
        { name: language === 'ta' ? 'பொறுப்புகள் & அனுமதிகள்' : 'Roles & Permissions', icon: UserCheck, href: '/admin/roles' },
        { name: language === 'ta' ? 'கருத்துகள்' : 'Comments', icon: MessageSquare, href: '/admin/comments' },
      ]
    },
    {
      title: language === 'ta' ? 'தொடர்புகள்' : 'COMMUNICATION',
      items: [
        { name: language === 'ta' ? 'அறிவிப்புகள்' : 'Notifications', icon: Bell, href: '/admin/notifications' },
        { name: language === 'ta' ? 'செய்தி மடல்' : 'Newsletter', icon: Mail, href: '/admin/newsletter' },
        { name: language === 'ta' ? 'தொடர்பு செய்திகள்' : 'Contact Messages', icon: Mail, href: '/admin/contact' },
      ]
    },
    {
      title: language === 'ta' ? 'பகுப்பாய்வு & அமைப்புகள்' : 'ANALYTICS & SETTINGS',
      items: [
        { name: language === 'ta' ? 'பகுப்பாய்வு' : 'Analytics', icon: BarChart2, href: '/admin/analytics' },
        { name: language === 'ta' ? 'எஸ்சிஓ (SEO) மேலாண்மை' : 'SEO Management', icon: SearchIcon, href: '/admin/seo' },
        { name: language === 'ta' ? 'தள அமைப்புகள்' : 'Website Settings', icon: Settings, href: '/admin/settings' },
        { name: language === 'ta' ? 'தணிக்கைப் பதிவு' : 'Audit Logs', icon: ShieldAlert, href: '/admin/audit-logs' },
        { name: language === 'ta' ? 'காப்புப்பிரதி (Backup)' : 'Backup & Restore', icon: RotateCcw, href: '/admin/backup' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans flex flex-col text-slate-800">
      
      {/* TOP HEADER BAR */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        
        {/* Left Branding & Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-slate-200 shadow-sm overflow-hidden bg-white shrink-0 p-0.5 flex items-center justify-center">
              <img src="/img/flag.svg" alt="Young Democrats Flag" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="leading-tight hidden sm:block">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-tight">YOUNG DEMOCRATS</h2>
              <p className="text-[8px] font-bold text-[#C8102E] tracking-widest uppercase">{t('admin.title')}</p>
            </div>
          </div>

          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors ml-2"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h1 className="text-base font-bold text-slate-900 ml-2 hidden md:block">
            {language === 'ta' ? 'நிர்வாகத் தளம்' : 'Admin Dashboard'}
          </h1>
        </div>

        {/* Center Search Input */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'ta' ? 'நிர்வாகத் தளத்தில் தேடுக...' : 'Search admin dashboard...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-all"
            />
          </div>
        </div>

        {/* Right Action Icons & User Dropdown */}
        <div className="flex items-center gap-3">
          
          {/* Quick Home Portal Link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            title="Go to Public News Portal"
          >
            <Home className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="hidden sm:inline">{language === 'ta' ? 'செய்தித் தளம்' : 'News Portal'}</span>
          </Link>

          {/* Language Selector */}
          <button 
            onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
            title="Toggle Admin Panel Language"
          >
            <div className="w-4 h-3 bg-red-600 relative overflow-hidden rounded-xs border border-white flex items-center justify-center">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-t-white border-l-[8px] border-l-transparent"></div>
              <span className="absolute top-0 right-0 text-emerald-800 text-[6px]">★</span>
            </div>
            <span>{language === 'ta' ? 'தமிழ் (TA)' : 'English (EN)'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Profile & Logout Button */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-300 relative flex items-center justify-center font-bold text-slate-700 text-xs">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Admin" className="w-full h-full object-cover" />
            </div>
            
            <button
              onClick={handleLogoutToHome}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-[#C8102E] border border-red-200 px-3 py-1.5 rounded-lg text-xs font-black transition-colors"
              title="Logout and return to News Portal Home"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'வெளியேறு (Logout)' : 'Logout'}</span>
            </button>
          </div>

        </div>

      </header>

      {/* MAIN BODY AREA (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transition-all duration-300 z-20 ${sidebarOpen ? 'block' : 'hidden lg:flex'}`}>
          
          <div className="overflow-y-auto py-4 px-3 flex-1 space-y-6">
            
            {navCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                  {cat.title}
                </h3>

                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                  
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#C8102E] text-white shadow-md'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            ))}

          </div>

          {/* Bottom Sidebar Profile Card */}
          <div className="p-3 border-t border-slate-200">
            <div className="bg-[#C8102E] text-white p-3 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-xs">
                  YD
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black truncate leading-tight">Young Democrats</p>
                  <p className="text-[10px] text-white/80 font-medium truncate">{language === 'ta' ? 'நிர்வாகக் குழு' : 'Admin Council'}</p>
                </div>
              </div>
              <button 
                onClick={handleLogoutToHome} 
                title="Logout to Public News Portal"
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors shrink-0 flex items-center justify-center"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

        </aside>

        {/* MAIN VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F4F6F9]">
          {children}
        </main>

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div>
          © {new Date().getFullYear()} <span className="font-bold text-[#C8102E]">Young Democrats News Portal</span>. All rights reserved.
        </div>
        <div className="flex items-center gap-1 font-medium">
          Design with <span className="text-red-500">❤</span> for Democracy
        </div>
      </footer>

    </div>
  );
}
