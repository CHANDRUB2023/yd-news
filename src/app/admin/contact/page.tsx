'use client';

import React, { useState } from 'react';
import { Mail, Search, Trash2, CheckCircle, Clock } from 'lucide-react';

export default function ContactPage() {
  const [messages, setMessages] = useState([
    { id: 1, name: 'S. Karthi', email: 'karthi@gmail.com', district: 'Madurai', subject: 'இளைஞர் அமைப்பில் சேர விருப்பம்', date: '2 hours ago', status: 'Unread' },
    { id: 2, name: 'M. Anand', email: 'anand@yahoo.com', district: 'Chennai', subject: 'மக்களின் குரல் பகுதியில் பதிவு செய்ய உதவி', date: '1 day ago', status: 'Read' },
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#C8102E]" /> Contact & Citizen Messages
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Read public queries, membership requests, and citizen contact form messages</p>
        </div>
      </div>

      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-slate-900">{m.name} ({m.district})</span>
                <span className="text-slate-400">&lt;{m.email}&gt;</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{m.date}</span>
            </div>
            <h3 className="text-xs font-black text-[#C8102E]">{m.subject}</h3>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 text-xs font-bold">
              <button onClick={() => alert(`Replying to ${m.email}`)} className="text-[#0E6233] hover:underline">Reply</button>
              <button onClick={() => setMessages(messages.filter(item => item.id !== m.id))} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
