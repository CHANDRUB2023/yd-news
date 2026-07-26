'use client';

import React, { useState } from 'react';
import { Settings, Save, Sliders, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const [portalName, setPortalName] = useState('Young Democrats News Portal');
  const [supportEmail, setSupportEmail] = useState('contact@youngdemocrats.org');

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#C8102E]" /> Website & Portal Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Configure portal branding, default language options, and API integrations</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-3xl">
        <div className="space-y-3 text-xs font-bold">
          <div>
            <label className="block text-slate-700 mb-1">Portal Name</label>
            <input
              type="text"
              value={portalName}
              onChange={(e) => setPortalName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Support & Official Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <button
            onClick={() => alert("Website settings saved successfully!")}
            className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-bold shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Portal Settings
          </button>
        </div>
      </div>
    </div>
  );
}
