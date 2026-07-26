'use client';

import React, { useState } from 'react';
import { FileText, Plus, Search, Download, Trash2, Eye, X } from 'lucide-react';

export default function PressReleasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [releases, setReleases] = useState([
    { id: 1, title: 'அறிக்கை: நீர் மேலாண்மை மற்றும் விவசாயிகள் நலன் குறித்த முக்கிய கோரிக்கை', refNo: 'YD/PR/2026/048', date: todayStr, status: 'Official' },
    { id: 2, title: 'அறிக்கை: இளைஞர் வேலைவாய்ப்பு கொள்கை வரைவு வெளியீடு', refNo: 'YD/PR/2026/047', date: todayStr, status: 'Official' },
    { id: 3, title: 'அறிக்கை: மின்சார கட்டண உயர்வைக் கண்டித்து அறிக்கை', refNo: 'YD/PR/2026/046', date: todayStr, status: 'Official' },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setReleases([
      ...releases,
      {
        id: Date.now(),
        title,
        refNo: `YD/PR/2026/0${releases.length + 49}`,
        date: todayStr,
        status: 'Official'
      }
    ]);
    setTitle('');
    setIsModalOpen(false);
  };

  const filtered = releases.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.refNo.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C8102E]" /> Press Releases & Statements
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Publish official party press statements, media advisories, and policy announcements</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Press Release</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ref no or title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Ref Number</th>
                <th className="py-3 px-4">Press Statement Headline</th>
                <th className="py-3 px-4">Release Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#C8102E]">{row.refNo}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.title}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-50 text-[#0E6233] border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => alert(`Downloading PDF for ${row.refNo}`)} className="p-1 text-slate-400 hover:text-slate-700"><Download className="w-4 h-4" /></button>
                      <button onClick={() => setReleases(releases.filter(r => r.id !== row.id))} className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">New Press Release</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Release Headline</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Official Press Title"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Publish Release</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
