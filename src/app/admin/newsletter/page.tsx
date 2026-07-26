'use client';

import React, { useState } from 'react';
import { Mail, Search, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function NewsletterSubscribersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [subscribers, setSubscribers] = useState([
    { id: 1, email: 'karthik@gmail.com', subscribedDate: todayStr, status: 'Active' },
    { id: 2, email: 'priya@yahoo.com', subscribedDate: todayStr, status: 'Active' },
    { id: 3, email: 'senthil@gmail.com', subscribedDate: todayStr, status: 'Active' },
  ]);

  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#C8102E]" /> Newsletter Subscribers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage email bulletin subscribers and export email lists for campaigns</p>
        </div>
        <button
          onClick={() => alert("Exporting CSV subscriber list...")}
          className="bg-[#0E6233] hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Subscriber CSV</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search email address..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Subscription Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.email}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.subscribedDate}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-50 text-[#0E6233] border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => setSubscribers(subscribers.filter(s => s.id !== row.id))} className="p-1 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
