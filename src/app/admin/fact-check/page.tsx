'use client';

import React, { useState } from 'react';
import { CheckSquare, Plus, Search, Trash2, Eye, X } from 'lucide-react';

export default function AdminFactCheckPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claim, setClaim] = useState('');

  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [facts, setFacts] = useState([
    { id: 1, claim: 'சமூக வலைதளங்களில் பரவும் போலியான கடன் தள்ளுபடி சுற்றறிக்கை', verdict: 'FAKE', source: 'WhatsApp / Facebook Circulation', date: todayStr },
    { id: 2, claim: 'இளைஞர் மாநாட்டு நிதி திரட்டல் குறித்த உண்மை விவரம்', verdict: 'TRUE', source: 'Official Press Briefing', date: todayStr },
    { id: 3, claim: 'வேலைவாய்ப்பு முகாம் குறித்த தவறாக திரிக்கப்பட்ட செய்தி', verdict: 'MISLEADING', source: 'Twitter Viral Clip', date: todayStr },
  ]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim) return;
    setFacts([
      ...facts,
      {
        id: Date.now(),
        claim,
        verdict: 'VERIFIED',
        source: 'Fact Check Desk',
        date: todayStr
      }
    ]);
    setClaim('');
    setIsModalOpen(false);
  };

  const filtered = facts.filter(f => f.claim.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#C8102E]" /> Fact Check & Verification Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Publish fact-check findings to debunk viral fake news and rumors</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Fact Check Finding</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search claim text..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Viral Claim</th>
                <th className="py-3 px-4">Verdict</th>
                <th className="py-3 px-4">Source Channel</th>
                <th className="py-3 px-4">Verified Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.claim}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      row.verdict === 'FAKE' ? 'bg-red-100 text-red-700 border border-red-200' :
                      row.verdict === 'TRUE' ? 'bg-emerald-100 text-[#0E6233] border border-emerald-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {row.verdict}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{row.source}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button onClick={() => setFacts(facts.filter(f => f.id !== row.id))} className="p-1 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
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
              <h3 className="text-base font-black text-slate-900">Add Fact Check Finding</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Claim Statement</label>
                <input
                  type="text"
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  placeholder="Enter headline or claim to verify"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Save Finding</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
