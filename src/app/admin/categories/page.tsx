'use client';

import React, { useState } from 'react';
import { Layers, Plus, Search, Edit, Trash2, Eye, X, Tag, Sparkles } from 'lucide-react';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState([
    { id: 1, name: 'Party News', slug: 'party-news', count: 142, color: 'bg-red-50 text-red-700 border-red-200' },
    { id: 2, name: 'Speeches & Rallies', slug: 'speeches-rallies', count: 89, color: 'bg-[#0E6233]/10 text-[#0E6233] border-emerald-200' },
    { id: 3, name: 'District News', slug: 'district-news', count: 215, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 4, name: 'Press Releases', slug: 'press-releases', count: 64, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 5, name: 'Youth Wing', slug: 'youth-wing', count: 110, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 6, name: 'Women Wing', slug: 'women-wing', count: 78, color: 'bg-pink-50 text-pink-700 border-pink-200' },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setCategories([
      ...categories,
      {
        id: Date.now(),
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        count: 0,
        color: 'bg-slate-100 text-slate-800 border-slate-200'
      }
    ]);
    setName('');
    setSlug('');
    setDescription('');
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const filtered = categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C8102E]" /> News Categories
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage article categories, topics, and classification tags</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cat => (
          <div key={cat.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${cat.color}`}>
                  {cat.name}
                </span>
                <p className="text-[11px] text-slate-400 mt-2 font-mono">/{cat.slug}</p>
              </div>
              <Tag className="w-5 h-5 text-slate-300" />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">Articles: <strong className="text-slate-900">{cat.count}</strong></span>
              <div className="flex items-center gap-1">
                <button onClick={() => alert(`Edit category: ${cat.name}`)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100">
                  <Trash2 className="w-4 h-4 text-red-500" />
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
              <h3 className="text-base font-black text-slate-900">Add Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Environmental Policy"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. environmental-policy"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
