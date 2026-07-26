'use client';

import React, { useState } from 'react';
import { Bell, Plus, Search, Send, CheckCircle2, X } from 'lucide-react';

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'நேரலை தொடங்குகிறது: சென்னை இளைஞர் மாநாடு 2026', recipients: '145,000 Users', date: todayStr, status: 'Sent' },
    { id: 2, title: 'புதிய செய்தி அறிக்கை: நீர் மேலாண்மை கொள்கை', recipients: '112,000 Users', date: todayStr, status: 'Sent' },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        title,
        recipients: 'Broadcast (All Users)',
        date: todayStr,
        status: 'Sent'
      }
    ]);
    setTitle('');
    setIsModalOpen(false);
  };

  const filtered = notifications.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#C8102E]" /> Push Notifications & Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Send instant push notifications and SMS breaking alerts to registered mobile app users</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Send Broadcast Notification</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notification title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Notification Title</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Sent Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.title}</td>
                  <td className="py-3.5 px-4 font-bold text-[#0E6233]">{row.recipients}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-50 text-[#0E6233] border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">
                      {row.status}
                    </span>
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
              <h3 className="text-base font-black text-slate-900">Send Notification</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSend} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Notification Title & Message</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter broadcast message"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow flex items-center gap-1.5">
                  <Send className="w-4 h-4" /> Send Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
