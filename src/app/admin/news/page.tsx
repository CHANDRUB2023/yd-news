'use client';

import React, { useState } from 'react';
import { 
  Newspaper, Plus, Search, Filter, Eye, Edit, 
  Trash2, CheckCircle2, AlertCircle, FileText, Download, 
  Upload, Sparkles, X, ChevronDown
} from 'lucide-react';

export default function AdminNewsManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Party News');
  const [author, setAuthor] = useState('Admin');
  const [content, setContent] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [articles, setArticles] = useState([
    { id: 1, title: 'இளைஞர் எழுச்சி மாநாடு - சென்னை', category: 'Party News', author: 'Admin', status: 'Published', date: todayStr, views: '48.7K' },
    { id: 2, title: 'மக்களின் குரல், மக்களுக்காக!', category: 'Speeches', author: 'Editor', status: 'Published', date: todayStr, views: '36.2K' },
    { id: 3, title: 'மாவட்ட செயலாளர்கள் கூட்டம்', category: 'District News', author: 'Admin', status: 'Published', date: todayStr, views: '28.9K' },
    { id: 4, title: 'கொள்கை விளக்க பொதுக்கூட்டம்', category: 'Press Release', author: 'Editor', status: 'Published', date: todayStr, views: '22.1K' },
    { id: 5, title: 'பெண்கள் அணி மாநில மாநாடு', category: 'Women Wing', author: 'Editor', status: 'Draft', date: todayStr, views: '0' },
  ]);

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newArticle = {
      id: Date.now(),
      title,
      category,
      author,
      status: 'Published',
      date: todayStr,
      views: '0'
    };
    setArticles([newArticle, ...articles]);
    setIsModalOpen(false);
    setTitle('');
    setContent('');
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const filtered = articles.filter(a => {
    const matchQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === 'ALL' || a.status.toUpperCase() === selectedStatus;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-[#C8102E]" /> News Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Create, edit, publish, and archive political news articles</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Article</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or category..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 text-xs font-bold w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedStatus === st
                  ? 'bg-[#0E6233] text-white border-[#0E6233] shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-[280px] truncate">{row.title}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-red-50 text-[#C8102E] border border-red-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{row.author}</td>
                  <td className="py-3.5 px-4">
                    {row.status === 'Published' ? (
                      <span className="bg-emerald-50 text-[#0E6233] border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">Published</span>
                    ) : (
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">Draft</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{row.date}</td>
                  <td className="py-3.5 px-4 font-bold text-[#0E6233]">{row.views}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => alert(`Previewing: ${row.title}`)} className="p-1 text-slate-400 hover:text-slate-700"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => alert(`Editing: ${row.title}`)} className="p-1 text-slate-400 hover:text-slate-700"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(row.id)} className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create New Article</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddNews} className="space-y-4 text-xs font-bold">
              <div className="space-y-1">
                <label className="block text-slate-700">Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter headline title"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  >
                    <option>Party News</option>
                    <option>Speeches</option>
                    <option>District News</option>
                    <option>Press Release</option>
                    <option>Women Wing</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">Author Role</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700">Article Content</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write full article body text..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#C8102E] text-white font-bold shadow">Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
