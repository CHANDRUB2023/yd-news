'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('loading');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-16 py-12">
      
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-[#0B5D34] to-[#084325] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            {t('contact.title')}
          </h1>
          <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide max-w-xl mx-auto uppercase">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Info list */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-black text-[#111111] uppercase tracking-wide border-l-4 border-[#0B5D34] pl-3">
              Office Channels
            </h3>
            
            <div className="space-y-4 text-xs md:text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-150 flex items-center justify-center text-[#0B5D34] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#111111] mb-1">{t('contact.office')}</h4>
                  <p className="text-zinc-500 leading-relaxed">123, People&apos;s Road, Chennai - 600 001, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-150 flex items-center justify-center text-[#E31B23] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#111111] mb-1">{t('contact.phone')}</h4>
                  <p className="text-zinc-500">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-150 flex items-center justify-center text-[#0B5D34] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#111111] mb-1">{t('contact.email')}</h4>
                  <p className="text-zinc-500 select-all">info@youngdemocrats.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Custom SVG/iframe Headquarters Map */}
          <div className="bg-zinc-950 rounded-3xl overflow-hidden aspect-video border border-zinc-800 shadow-lg relative flex items-center justify-center group">
            {/* Custom vector stylized grid maps */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e3b2e_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-0"></div>
            <div className="relative z-10 text-center space-y-3 p-6">
              <MapPin className="w-10 h-10 text-[#E31B23] animate-bounce mx-auto" />
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">State Headquarters Map</h4>
                <p className="text-zinc-500 text-[10px] mt-1">Chennai Central Coordination Base</p>
              </div>
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="inline-block bg-[#0B5D34] hover:bg-[#084325] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase transition-all shadow"
              >
                Open Google Maps
              </Link>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-3xl p-8 md:p-10 shadow-sm relative">
          {status === 'success' ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-lg font-black text-[#111111]">{t('contact.formSuccess')}</h3>
              <p className="text-zinc-500 text-xs">Our response team has received your ticket.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-black text-[#111111] uppercase tracking-wide border-l-4 border-[#E31B23] pl-3 mb-6">
                Submit Inquiry Form
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">{t('contact.formName')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F8F9FA] hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:border-[#0B5D34] rounded-xl px-4 py-3 text-xs outline-none transition-all"
                    placeholder="Enter your name"
                    required
                    suppressHydrationWarning
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">{t('contact.formEmail')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F8F9FA] hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:border-[#0B5D34] rounded-xl px-4 py-3 text-xs outline-none transition-all"
                    placeholder="name@domain.com"
                    required
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">{t('contact.formPhone')}</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#F8F9FA] hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:border-[#0B5D34] rounded-xl px-4 py-3 text-xs outline-none transition-all"
                  placeholder="+91 98765 43210 (Optional)"
                  suppressHydrationWarning
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">{t('contact.formMessage')}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full bg-[#F8F9FA] hover:bg-zinc-100/50 border border-zinc-200 focus:bg-white focus:border-[#0B5D34] rounded-xl px-4 py-3 text-xs outline-none transition-all"
                  placeholder="Type your message detail..."
                  required
                  suppressHydrationWarning
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#0B5D34] hover:bg-[#084325] text-white text-xs font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 cursor-pointer"
                suppressHydrationWarning
              >
                <Send className="w-4 h-4" />
                {status === 'loading' ? 'Sending Ticket...' : t('contact.formSubmit')}
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}
