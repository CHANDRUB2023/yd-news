'use client';

import React, { useState } from 'react';
import { Calendar, Plus, Search, MapPin, Users, Edit, Trash2, Clock, X } from 'lucide-react';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [events, setEvents] = useState([
    { id: 1, title: 'மாநில இளைஞர் பேரணி 2026', location: 'நந்தனம் மைதானம், சென்னை', date: todayStr, time: '10:00 AM', status: 'Upcoming', expected: '50,000+' },
    { id: 2, title: 'கொள்கை விளக்க கருத்தரங்கம்', location: 'கலைவாணர் அரங்கம், சென்னை', date: todayStr, time: '04:00 PM', status: 'Upcoming', expected: '2,500' },
    { id: 3, title: 'தென்மண்டல நிர்வாகிகள் ஆலோசனைக் கூட்டம்', location: 'தமுக்கம் மைதானம், மதுரை', date: todayStr, time: '11:00 AM', status: 'Upcoming', expected: '10,000' },
    { id: 4, title: 'சுற்றுச்சூழல் பாதுகாப்பு விழிப்புணர்வு முகாம்', location: 'வ உ சி மைதானம், கோவை', date: todayStr, time: '09:00 AM', status: 'Completed', expected: '5,000' },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        location: location || 'Tamil Nadu',
        date: date || todayStr,
        time: '10:00 AM',
        status: 'Upcoming',
        expected: '1,000+'
      }
    ]);
    setTitle('');
    setLocation('');
    setDate('');
    setIsModalOpen(false);
  };

  const filtered = events.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.location.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C8102E]" /> Events & Rally Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Schedule state conferences, public rallies, youth conventions, and seminars</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Event</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search event title or venue..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                item.status === 'Upcoming' ? 'bg-red-50 text-[#C8102E] border-red-200' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {item.status}
              </span>
              <span className="text-xs font-bold text-[#0E6233] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                👥 Expected: {item.expected}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 leading-snug">{item.title}</h3>
              <div className="space-y-1 mt-2 text-xs text-slate-600 font-medium">
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#C8102E]" /> {item.location}</p>
                <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {item.date} at {item.time}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setEvents(events.filter(e => e.id !== item.id))} className="text-xs font-bold text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Schedule Event</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. State Youth Rally"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Venue / Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Venue & City"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Event Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Save Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
