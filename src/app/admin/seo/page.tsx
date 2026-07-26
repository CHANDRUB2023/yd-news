'use client';

import React, { useState } from 'react';
import { Search as SearchIcon, Save, Globe, Share2 } from 'lucide-react';

export default function SeoPage() {
  const [siteTitle, setSiteTitle] = useState('Young Democrats News Portal | Voice of People');
  const [metaDesc, setMetaDesc] = useState('Official digital news portal of Young Democrats. Breaking political updates, election news, speeches, and district announcements.');

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-[#C8102E]" /> SEO & Meta Tags Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Optimize search engine visibility, OpenGraph social previews, and canonical metadata</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-3xl">
        <div className="space-y-3 text-xs font-bold">
          <div>
            <label className="block text-slate-700 mb-1">Global Site Title</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <button
            onClick={() => alert("SEO configuration saved!")}
            className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-bold shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save SEO Settings
          </button>
        </div>
      </div>
    </div>
  );
}
