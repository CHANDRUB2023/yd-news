'use client';

import React, { useState } from 'react';
import { Megaphone, Search } from 'lucide-react';

export default function AdminPeoplesVoicePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [grievances, setGrievances] = useState([
    { id: 'YDN-GRV-784912', title: 'சாலை பழுதைந்துள்ளது', category: 'Roads', district: 'Coimbatore', location: 'RS Puram', date: todayStr, status: 'Under Review', statusBg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'YDN-GRV-659302', title: 'குடிநீர் வசதி இல்லை', category: 'Water', district: 'Madurai', location: 'Anna Nagar', date: todayStr, status: 'In Progress', statusBg: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'YDN-GRV-491283', title: 'மின்விளக்கு வேலை செய்யவில்லை', category: 'Electricity', district: 'Tiruchirappalli', location: 'Cantonment', date: todayStr, status: 'Pending', statusBg: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'YDN-GRV-948102', title: 'குப்பை அகற்றும் வண்டி வரவில்லை', category: 'Sanitation', district: 'Salem', location: 'Fairlands', date: todayStr, status: 'Resolved', statusBg: 'bg-emerald-50 text-[#0E6233] border-emerald-200' },
    { id: 'YDN-GRV-381904', title: 'பள்ளி அடிப்படை வசதிகள் இல்லை', category: 'Education', district: 'Erode', location: 'Perundurai', date: todayStr, status: 'In Progress', statusBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  ]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    let bg = 'bg-amber-50 text-amber-700 border-amber-200';
    if (newStatus === 'In Progress') bg = 'bg-blue-50 text-blue-700 border-blue-200';
    if (newStatus === 'Resolved') bg = 'bg-emerald-50 text-[#0E6233] border-emerald-200';
    if (newStatus === 'Rejected') bg = 'bg-red-50 text-red-700 border-red-200';

    setGrievances(grievances.map(g => g.id === id ? { ...g, status: newStatus, statusBg: bg } : g));
  };

  const filtered = grievances.filter(g => {
    const matchQuery = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.id.toLowerCase().includes(searchQuery.toLowerCase()) || g.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === 'ALL' || g.status.toUpperCase().replace(' ', '_') === selectedStatus;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#C8102E]" /> People&apos;s Voice Grievance Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Track, assign, verify, and resolve public complaints across districts</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Complaint ID or Title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-bold overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'PENDING', 'UNDER_REVIEW', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedStatus === st
                  ? 'bg-[#0E6233] text-white border-[#0E6233]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st.replace('_', ' ')}
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
                <th className="py-3 px-4">Complaint ID</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Change Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#C8102E]">{row.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-[200px] truncate">{row.title}</td>
                  <td className="py-3.5 px-4"><span className="bg-slate-100 px-2 py-0.5 rounded font-bold">{row.category}</span></td>
                  <td className="py-3.5 px-4 text-slate-700">{row.district} ({row.location})</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${row.statusBg}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={row.status}
                      onChange={(e) => handleUpdateStatus(row.id, e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-[11px] font-bold rounded-lg px-2 py-1 text-slate-800 outline-none"
                    >
                      <option>Pending</option>
                      <option>Under Review</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Rejected</option>
                    </select>
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
