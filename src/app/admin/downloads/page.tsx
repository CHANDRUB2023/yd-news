'use client';

import React, { useState } from 'react';
import { DownloadCloud, Plus, Search, Trash2, FileText, Download, X } from 'lucide-react';

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const [files, setFiles] = useState([
    { id: 1, name: 'இளைஞர் அணி கொள்கை வரைவு 2024.pdf', size: '4.2 MB', downloads: '12,450', category: 'Manifesto' },
    { id: 2, name: 'கட்சி உறுப்பினர் படிவம் - தமிழ்.pdf', size: '1.1 MB', downloads: '38,900', category: 'Forms' },
    { id: 3, name: 'மாவட்ட செயலாளர்களுக்கான வழிகாட்டி நெறிமுறைகள்.pdf', size: '2.8 MB', downloads: '5,120', category: 'Guidelines' },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setFiles([
      ...files,
      {
        id: Date.now(),
        name: `${title}.pdf`,
        size: '2.0 MB',
        downloads: '0',
        category: 'Publications'
      }
    ]);
    setTitle('');
    setIsModalOpen(false);
  };

  const filtered = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <DownloadCloud className="w-5 h-5 text-[#C8102E]" /> Downloads & Publications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage downloadable PDF publications, party manifestos, and membership forms</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New File</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document name..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Total Downloads</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C8102E]" />
                    <span>{row.name}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{row.size}</td>
                  <td className="py-3.5 px-4 font-bold text-[#0E6233]">{row.downloads} downloads</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => alert(`Downloading: ${row.name}`)} className="p-1 text-slate-400 hover:text-slate-700"><Download className="w-4 h-4" /></button>
                      <button onClick={() => setFiles(files.filter(f => f.id !== row.id))} className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4 text-red-500" /></button>
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
              <h3 className="text-base font-black text-slate-900">Upload PDF File</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Document Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Save Document</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
