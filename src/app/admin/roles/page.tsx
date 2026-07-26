'use client';

import React from 'react';
import { UserCheck, ShieldCheck, Check, Lock, Info } from 'lucide-react';

export default function RolesPage() {
  const roles = [
    { title: 'Super Admin', desc: 'Full system permissions across all modules, database & configuration', count: 2, color: 'bg-red-50 text-[#C8102E] border-red-200' },
    { title: 'Chief Editor', desc: 'Can publish, edit, approve, and delete news articles & press releases', count: 5, color: 'bg-emerald-50 text-[#0E6233] border-emerald-200' },
    { title: 'District Coordinator', desc: 'Can manage district specific news, local rally events & cadres', count: 38, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { title: 'Content Reporter', desc: 'Can draft articles and upload media for editorial review', count: 120, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#C8102E]" /> Roles & Permissions Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Granular access control policies for administrative roles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map(r => (
          <div key={r.title} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-black border ${r.color}`}>
                {r.title}
              </span>
              <span className="text-xs font-bold text-slate-500">{r.count} Active Users</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">{r.desc}</p>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#0E6233]">
              <ShieldCheck className="w-4 h-4" />
              <span>Granular Permissions Configured</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
