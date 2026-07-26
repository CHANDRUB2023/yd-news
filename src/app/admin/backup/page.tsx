'use client';

import React from 'react';
import { RotateCcw, Download, Database, CheckCircle2 } from 'lucide-react';

export default function BackupPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#C8102E]" /> Database Backup & Recovery
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Automated database backups, SQL export dumps, and disaster recovery</p>
        </div>
        <button onClick={() => alert("Generating full database SQL dump...")} className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center gap-1.5">
          <Database className="w-4 h-4" />
          <span>Create Instant Backup</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-2">Recent Database Backups</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#0E6233]" />
              <span>backup_young_democrats_2024_05_24.sql.gz (14.2 MB)</span>
            </div>
            <button onClick={() => alert("Downloading backup SQL file...")} className="text-[#C8102E] hover:underline flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Download Dump
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
