'use client';

import React from 'react';
import { UserCheck, ShieldCheck, Check, Lock, Info } from 'lucide-react';

export default function RolesPage() {
  const roles = [
    { title: 'Admin', desc: 'Full administrative permissions across news, categories, media, users, live stream & settings', count: 3, color: 'bg-red-50 text-[#C8102E] border-red-200' },
    { title: 'Editor', desc: 'Can publish, edit, manage, and review news articles, photo gallery & press releases', count: 8, color: 'bg-emerald-50 text-[#0E6233] border-emerald-200' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#C8102E]" /> Simplified Roles & Permissions Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Streamlined administrative role policies for Young Democrats Portal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map(r => (
          <div key={r.title} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-black border ${r.color}`}>
                {r.title}
              </span>
              <span className="text-xs font-bold text-slate-500">{r.count} Active Accounts</span>
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{r.desc}</p>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0E6233]">
              <ShieldCheck className="w-4 h-4 text-[#0E6233]" />
              <span>Configured Access Controls</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

