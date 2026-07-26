'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calendar, MapPin, CheckCircle2, Clock, Users, Send, X } from 'lucide-react';

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

export default function EventsPage() {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [registerModal, setRegisterModal] = useState<EventItem | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) return;
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      setRegisterModal(null);
      setRsvpName('');
      setRsvpPhone('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-[#C8102E] text-white p-8 md:p-12 rounded-3xl shadow-xl space-y-3">
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {t('nav.events')}
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          {language === 'ta' ? 'மாநில நிகழ்வுகள் & பேரணி அட்டவணை' : 'State Events & Rally Calendar'}
        </h1>
        <p className="text-slate-200 text-sm md:text-base max-w-2xl leading-relaxed">
          {t('sec.eventsSub')}
        </p>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-12 h-12 border-4 border-t-[#C8102E] border-[#0E6233] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold text-xs">Loading event schedule...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 font-bold text-sm">
          {t('sec.noEvents')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-red-50 text-[#C8102E] border border-red-200 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                    {evt.status || 'UPCOMING'}
                  </span>
                  <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 10:00 AM IST
                  </span>
                </div>

                <h2 className="text-xl font-black text-slate-900 leading-snug">
                  {language === 'ta' ? evt.titleTa : evt.titleEn}
                </h2>

                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  {language === 'ta' ? evt.descriptionTa : evt.descriptionEn}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold text-[#0E6233] bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{language === 'ta' ? evt.locationTa : evt.locationEn}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="text-xs font-extrabold text-slate-700">
                  <Calendar className="w-4 h-4 text-[#C8102E] inline mr-1" />
                  {new Date(evt.date).toLocaleDateString()}
                </div>

                <button
                  onClick={() => setRegisterModal(evt)}
                  className="bg-[#C8102E] hover:bg-[#990B22] text-white text-xs font-extrabold px-5 py-2.5 rounded-full shadow transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Users className="w-4 h-4" />
                  <span>{language === 'ta' ? 'பதிவு செய்' : 'Register / RSVP'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RSVP Modal */}
      {registerModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {language === 'ta' ? 'நிகழ்வில் பங்கேற்க பதிவு' : 'Event RSVP Registration'}
              </h3>
              <button onClick={() => setRegisterModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {registered ? (
              <div className="p-4 bg-emerald-50 text-[#0E6233] border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  {language === 'ta'
                    ? 'பதிவு வெற்றிகரமாக முடிந்தது! விரைவில் உறுதிப்படுத்தல் குறுஞ்செய்தி வரும்.'
                    : 'RSVP confirmed successfully! Confirmation SMS will be sent shortly.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleRSVP} className="space-y-3 text-xs font-bold">
                <p className="text-slate-600 font-medium">{language === 'ta' ? registerModal.titleTa : registerModal.titleEn}</p>

                <div className="space-y-1">
                  <label className="block text-slate-700">{t('contact.formName')}</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">{t('contact.formPhone')}</label>
                  <input
                    type="tel"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setRegisterModal(null)} className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold">
                    {t('cancel')}
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#C8102E] text-white font-bold shadow flex items-center gap-1.5">
                    <Send className="w-4 h-4" />
                    <span>{t('submit')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
