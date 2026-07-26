'use client';

import React, { useState } from 'react';
import { Camera, Plus, Search, Trash2, Eye, X } from 'lucide-react';

export default function PhotoGalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [albums, setAlbums] = useState([
    { id: 1, title: 'சென்னை இளைஞர் எழுச்சி மாநாடு புகைப்படங்கள்', count: 48, date: todayStr, cover: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'மதுரை மாவட்ட பேரணி மற்றும் கூட்டப் படங்கள்', count: 32, date: todayStr, cover: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'கோவை தகவல் தொழில்நுட்ப அணி மாநாடு', count: 25, date: todayStr, cover: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'மகளிர் அணி மாநில விழிப்புணர்வு பேரணி', count: 60, date: todayStr, cover: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80' },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setAlbums([
      ...albums,
      {
        id: Date.now(),
        title,
        count: 1,
        date: todayStr,
        cover: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80'
      }
    ]);
    setTitle('');
    setIsModalOpen(false);
  };

  const filtered = albums.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#C8102E]" /> Photo Albums Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage party photo galleries, event picture archives, and rally snapshots</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Album</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search album title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
            <div className="h-44 bg-slate-100 relative group overflow-hidden">
              <img src={a.cover} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                📸 {a.count} Photos
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="text-xs font-black text-slate-900 line-clamp-2 leading-snug">{a.title}</h3>
              <p className="text-[10px] text-slate-400 font-medium">{a.date}</p>
              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button onClick={() => setAlbums(albums.filter(item => item.id !== a.id))} className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Delete Album
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
              <h3 className="text-base font-black text-slate-900">Create Album</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Album Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Album Title"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Save Album</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
