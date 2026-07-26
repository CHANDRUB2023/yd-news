'use client';

import React, { useState } from 'react';
import { MessageSquare, Search, CheckCircle, Trash2, AlertCircle } from 'lucide-react';

export default function CommentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Senthil M', text: 'மாநாடு மிகவும் பிரம்மாண்டமாக இருந்தது! வாழ்த்துகள்!', article: 'இளைஞர் எழுச்சி மாநாடு', date: '10 mins ago', status: 'Approved' },
    { id: 2, author: 'Kavitha R', text: 'கொள்கை விளக்கம் சிறப்பாக உள்ளது.', article: 'கொள்கை விளக்க பொதுக்கூட்டம்', date: '1 hour ago', status: 'Pending' },
    { id: 3, author: 'Anonymous User', text: 'Buy cheap items online now link...', article: 'செய்திகள்', date: '3 hours ago', status: 'Spam' },
  ]);

  const filtered = comments.filter(c => c.text.toLowerCase().includes(searchQuery.toLowerCase()) || c.author.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#C8102E]" /> Reader Comments & Moderation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Moderate public comments, approve feedback, and block spam</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search comments..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-slate-900">{c.author}</span>
                <span className="text-slate-400">on</span>
                <span className="text-[#C8102E]">{c.article}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{c.date}</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">{c.text}</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 text-xs font-bold">
              {c.status !== 'Approved' && (
                <button 
                  onClick={() => setComments(comments.map(item => item.id === c.id ? { ...item, status: 'Approved' } : item))}
                  className="text-[#0E6233] hover:underline"
                >
                  Approve
                </button>
              )}
              <button 
                onClick={() => setComments(comments.filter(item => item.id !== c.id))}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
