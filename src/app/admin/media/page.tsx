'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Search, Trash2, Download, Copy, X } from 'lucide-react';

export default function MediaLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [mediaFiles, setMediaFiles] = useState([
    { id: 1, name: 'youth_rally_chennai_2026.jpg', type: 'IMAGE', size: '2.4 MB', dimensions: '1920x1080', date: todayStr, url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'leader_speech_madurai.jpg', type: 'IMAGE', size: '1.8 MB', dimensions: '1600x900', date: todayStr, url: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'party_manifesto_2026.pdf', type: 'DOCUMENT', size: '5.6 MB', dimensions: '12 Pages', date: todayStr, url: '#' },
    { id: 4, name: 'press_conference_banner.jpg', type: 'IMAGE', size: '3.1 MB', dimensions: '2400x1200', date: todayStr, url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'district_secretaries_meet.jpg', type: 'IMAGE', size: '2.9 MB', dimensions: '1920x1080', date: todayStr, url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80' },
  ]);

  const filtered = mediaFiles.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#C8102E]" /> Media Library & Uploads
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Central repository for press photos, document attachments, and portal assets</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Media File</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search media file name..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
            <div className="h-36 bg-slate-100 relative group overflow-hidden flex items-center justify-center">
              {item.type === 'IMAGE' ? (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <div className="text-center space-y-1 text-slate-500">
                  <ImageIcon className="w-8 h-8 mx-auto text-slate-400" />
                  <span className="text-[10px] font-bold uppercase">{item.type}</span>
                </div>
              )}
              <span className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                {item.size}
              </span>
            </div>

            <div className="p-3 space-y-2">
              <h3 className="text-xs font-bold text-slate-900 truncate" title={item.name}>{item.name}</h3>
              <p className="text-[10px] text-slate-400 font-medium">{item.date}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button onClick={() => alert(`Copied URL for ${item.name}`)} className="text-slate-400 hover:text-slate-700 flex items-center gap-1 font-bold text-[10px]">
                  <Copy className="w-3 h-3" /> Copy URL
                </button>
                <button onClick={() => setMediaFiles(mediaFiles.filter(m => m.id !== item.id))} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-3.5 h-3.5" />
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
              <h3 className="text-base font-black text-slate-900">Upload Media File</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-3 bg-slate-50 cursor-pointer hover:border-[#C8102E] transition-colors">
              <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Click or drag image / PDF file here to upload</p>
              <p className="text-[10px] text-slate-400">Supported formats: JPG, PNG, WEBP, PDF up to 25MB</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
