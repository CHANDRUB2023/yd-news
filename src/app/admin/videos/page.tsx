'use client';

import React, { useState } from 'react';
import { Video, Plus, Search, Trash2, Eye, Play, X } from 'lucide-react';

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [videos, setVideos] = useState([
    { id: 1, title: 'சென்னை இளைஞர் மாநாடு 2026 - முழு காணொளி', duration: '45:20', views: '124.5K', date: todayStr, youtubeId: 'dQw4w9WgXcQ' },
    { id: 2, name: 'தலைவர் அவர்களின் சிறப்பு உரை - மதுரை', title: 'தலைவர் அவர்களின் சிறப்பு உரை - மதுரை', duration: '28:15', views: '89.2K', date: todayStr, youtubeId: 'dQw4w9WgXcQ' },
    { id: 3, title: 'கொள்கை விளக்க பொதுக்கூட்டம் - கோவை', duration: '35:40', views: '67.8K', date: todayStr, youtubeId: 'dQw4w9WgXcQ' },
    { id: 4, title: 'செய்தியாளர்கள் சந்திப்பு - பத்திரிகையாளர் கூட்டம்', duration: '18:05', views: '45.1K', date: todayStr, youtubeId: 'dQw4w9WgXcQ' },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setVideos([
      ...videos,
      {
        id: Date.now(),
        title,
        duration: '12:00',
        views: '0',
        date: todayStr,
        youtubeId: 'dQw4w9WgXcQ'
      }
    ]);
    setTitle('');
    setUrl('');
    setIsModalOpen(false);
  };

  const filtered = videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-[#C8102E]" /> Video Portal Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage YouTube embeds, speech clips, rally streams, and video archives</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Video</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search video title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
            <div className="h-48 bg-slate-900 relative flex items-center justify-center group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80" alt={v.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-[#C8102E] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform absolute">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {v.duration}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-xs font-black text-slate-900 line-clamp-2 leading-snug">{v.title}</h3>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-medium">
                <span>Views: <strong className="text-[#0E6233]">{v.views}</strong></span>
                <span>{v.date}</span>
              </div>
              <div className="flex justify-end pt-1">
                <button onClick={() => setVideos(videos.filter(item => item.id !== v.id))} className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Add New Video</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Video Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Video Headline"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">YouTube URL or Video Embed Link</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Add Video</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
