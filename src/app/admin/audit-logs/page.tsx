'use client';

import React from 'react';
import { ShieldAlert, Clock, UserCheck } from 'lucide-react';

export default function AuditLogsPage() {
  const logs = [
    { id: 1, action: 'Published News Article', user: 'Karthik R (Admin)', ip: '192.168.1.45', time: '10 mins ago' },
    { id: 2, action: 'Updated Live Stream URL', user: 'Anitha V (Editor)', ip: '192.168.1.88', time: '1 hour ago' },
    { id: 3, action: 'User Sign In', user: 'Selvam K (User)', ip: '104.28.12.5', time: '3 hours ago' },
    { id: 4, action: 'Deleted Draft News Article', user: 'Karthik R (Admin)', ip: '192.168.1.45', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#C8102E]" /> Security & Audit Trail Logs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Track admin logins, article modifications, and system security events</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Action Performed</th>
                <th className="py-3 px-4">User Account</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {logs.map(row => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.action}</td>
                  <td className="py-3.5 px-4 font-bold text-[#0E6233]">{row.user}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{row.ip}</td>
                  <td className="py-3.5 px-4 text-slate-500">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
