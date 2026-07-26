'use client';

import React from 'react';
import { BarChart2, TrendingUp, Eye, Users, Globe, Smartphone } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#C8102E]" /> Portal Analytics & Traffic Insights
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time readership stats, district traffic heatmaps, and popular political articles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Monthly Page Views</span>
            <Eye className="w-4 h-4 text-[#C8102E]" />
          </div>
          <p className="text-2xl font-black text-slate-900">1.42 M</p>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from last month
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Unique Readers</span>
            <Users className="w-4 h-4 text-[#0E6233]" />
          </div>
          <p className="text-2xl font-black text-slate-900">420.5 K</p>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12.1% active cadres
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Avg Reading Time</span>
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">4m 12s</p>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> High engagement
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Mobile Traffic</span>
            <Smartphone className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">84.2%</p>
          <p className="text-[10px] text-slate-500 font-medium">iOS & Android App + Web</p>
        </div>
      </div>
    </div>
  );
}
