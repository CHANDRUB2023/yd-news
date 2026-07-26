'use client';

import React, { useState } from 'react';
import { Tv, Radio, Play, CheckCircle2, AlertCircle, RefreshCw, RadioIcon, Flame } from 'lucide-react';

export default function LiveTvPage() {
  const [streamStatus, setStreamStatus] = useState<'OFFLINE' | 'LIVE' | 'SCHEDULED'>('LIVE');
  const [streamUrl, setStreamUrl] = useState('https://www.youtube.com/embed/live_stream?channel=youngdemocrats');
  const [streamTitle, setStreamTitle] = useState('மாநில இளைஞர் எழுச்சி மாநாடு 2026 - நேரலை (LIVE)');

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#C8102E]" /> Live TV & Broadcast Studio
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Control live stream broadcasts, party channel schedules, and breaking live feeds</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${
            streamStatus === 'LIVE' ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-200 text-slate-700'
          }`}>
            <Flame className="w-4 h-4" />
            <span>{streamStatus === 'LIVE' ? 'CURRENTLY BROADCASTING LIVE' : 'STREAM OFFLINE'}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stream Preview Panel */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="aspect-video bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800">
            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded shadow flex items-center gap-1">
              <RadioIcon className="w-3.5 h-3.5 animate-pulse" /> LIVE HD
            </div>
            <img src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80" alt="Live Stream" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900">{streamTitle}</h2>
              <p className="text-xs text-slate-500">Live Viewers: <strong className="text-[#0E6233]">18,420 watching</strong></p>
            </div>
          </div>
        </div>

        {/* Studio Controls */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">Broadcast Controls</h2>

          <div className="space-y-3 text-xs font-bold">
            <div>
              <label className="block text-slate-700 mb-1">Stream Status</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setStreamStatus('LIVE')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    streamStatus === 'LIVE' ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Start Live
                </button>
                <button
                  onClick={() => setStreamStatus('OFFLINE')}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    streamStatus === 'OFFLINE' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Stop Stream
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">Live Broadcast Title</label>
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">YouTube Live Embed Stream URL</label>
              <input
                type="text"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <button
              onClick={() => alert("Live Broadcast settings updated successfully!")}
              className="w-full bg-[#0E6233] text-white py-3 rounded-xl font-bold shadow hover:bg-emerald-800 transition-colors"
            >
              Update Live Broadcast Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
