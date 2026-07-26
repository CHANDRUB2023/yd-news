'use client';

import React, { useState } from 'react';
import { 
  Newspaper, FolderCheck, FileText, Video, Users, 
  TrendingUp, TrendingDown, Eye, Edit, Trash2, Plus, 
  Upload, Calendar, Bell, Radio, ArrowUpRight, HardDrive, 
  ExternalLink, Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, PieChart, Pie, Cell 
} from 'recharts';

export default function AdminDashboardPage() {
  // Current date helpers
  const today = new Date();
  const formatDate = (daysAgo: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  const formatShortDate = (daysAgo: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  const lineChartData = [
    { date: formatShortDate(30), Published: 250, Views: 8000 },
    { date: formatShortDate(25), Published: 450, Views: 22000 },
    { date: formatShortDate(20), Published: 280, Views: 15000 },
    { date: formatShortDate(15), Published: 620, Views: 32000 },
    { date: formatShortDate(10), Published: 890, Views: 26000 },
    { date: formatShortDate(5), Published: 750, Views: 44000 },
    { date: formatShortDate(0), Published: 1032, Views: 52000 },
  ];

  const categoryPieData = [
    { name: 'Party News', value: 435, percentage: '35%', color: '#C8102E' },
    { name: 'Speeches', value: 312, percentage: '25%', color: '#16A34A' },
    { name: 'District News', value: 187, percentage: '15%', color: '#0284C7' },
    { name: 'Press Release', value: 187, percentage: '15%', color: '#9333EA' },
    { name: 'Others', value: 127, percentage: '10%', color: '#0E6233' },
  ];

  const topNewsList = [
    {
      id: 1,
      title: 'இளைஞர் எழுச்சி மாநாடு - சென்னை',
      date: formatDate(0),
      views: '48.7K',
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 2,
      title: 'மக்களின் குரல், மக்களுக்காக!',
      date: formatDate(1),
      views: '36.2K',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 3,
      title: 'மாவட்ட செயலாளர்கள் கூட்டம்',
      date: formatDate(2),
      views: '28.9K',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 4,
      title: 'கொள்கை விளக்க பொதுக்கூட்டம்',
      date: formatDate(3),
      views: '22.1K',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 5,
      title: 'பெண்கள் அணி மாநில மாநாடு',
      date: formatDate(4),
      views: '18.6K',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    },
  ];

  const [recentNews, setRecentNews] = useState([
    {
      id: 1,
      title: 'இளைஞர் எழுச்சி மாநாடு - சென்னை',
      category: 'Party News',
      categoryBg: 'bg-red-50 text-red-600 border-red-200',
      author: 'Admin',
      status: 'Published',
      date: formatDate(0),
    },
    {
      id: 2,
      title: 'மக்களின் குரல், மக்களுக்காக!',
      category: 'Speeches',
      categoryBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      author: 'Editor',
      status: 'Published',
      date: formatDate(1),
    },
    {
      id: 3,
      title: 'மாவட்ட செயலாளர்கள் கூட்டம்',
      category: 'District News',
      categoryBg: 'bg-blue-50 text-blue-700 border-blue-200',
      author: 'Admin',
      status: 'Published',
      date: formatDate(2),
    },
    {
      id: 4,
      title: 'கொள்கை விளக்க பொதுக்கூட்டம்',
      category: 'Press Release',
      categoryBg: 'bg-purple-50 text-purple-700 border-purple-200',
      author: 'Editor',
      status: 'Published',
      date: formatDate(3),
    },
    {
      id: 5,
      title: 'பெண்கள் அணி மாநில மாநாடு',
      category: 'Women Wing',
      categoryBg: 'bg-amber-50 text-amber-700 border-amber-200',
      author: 'Editor',
      status: 'Draft',
      date: formatDate(4),
    },
  ]);

  const handleDeleteNews = (id: number) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      setRecentNews(recentNews.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 1. TOP 5 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total News */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500">Total News</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">1,248</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> ↑ 12.5% <span className="text-slate-400 font-normal">this month</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#C8102E] border border-red-100 flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        {/* Published News */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500">Published News</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">1,032</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> ↑ 10.3% <span className="text-slate-400 font-normal">this month</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0E6233] border border-emerald-100 flex items-center justify-center shrink-0">
            <FolderCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Drafts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500">Drafts</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">216</h3>
            <p className="text-[11px] font-bold text-red-600 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> ↓ 4.2% <span className="text-slate-400 font-normal">this month</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Total Videos */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500">Total Videos</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">156</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> ↑ 8.1% <span className="text-slate-400 font-normal">this month</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Video className="w-6 h-6" />
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-500">Total Users</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">2,543</h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> ↑ 15.7% <span className="text-slate-400 font-normal">this month</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 2. MIDDLE ROW: News Overview Chart + Top News + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: News Overview Line Chart (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-900">News Overview</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#0E6233]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0E6233]"></div>
                <span>Published</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-[#C8102E]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C8102E]"></div>
                <span>Views</span>
              </div>
              <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2.5 py-1 text-slate-700 outline-none">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis yAxisId="left" stroke="#0E6233" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#C8102E" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="Published" stroke="#0E6233" strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="Views" stroke="#C8102E" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Center: Top News (By Views) (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-extrabold text-slate-900">Top News <span className="text-xs font-medium text-slate-400">(By Views)</span></h3>
            <button className="text-xs font-bold text-[#C8102E] hover:underline">View All</button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {topNewsList.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
                </div>
                <div className="text-[11px] font-bold text-[#0E6233] bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-0.5">
                  <Eye className="w-3 h-3" /> {item.views}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Actions 2x3 Grid (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 mb-3">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-3 flex-1">
            
            <button 
              onClick={() => alert("Open Add News Form Modal")}
              className="bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#C8102E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Add News</span>
            </button>

            <button 
              onClick={() => alert("Open Upload Media Modal")}
              className="bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0E6233] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Upload Media</span>
            </button>

            <button 
              onClick={() => alert("Open Add Event Modal")}
              className="bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#C8102E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Add Event</span>
            </button>

            <button 
              onClick={() => alert("Open Send Notification Modal")}
              className="bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#C8102E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Send Notification</span>
            </button>

            <button 
              onClick={() => alert("Open Press Release Form")}
              className="bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0E6233] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Add Press Release</span>
            </button>

            <button 
              onClick={() => alert("Open Live TV Stream Setup")}
              className="bg-slate-50 hover:bg-red-50/60 border border-slate-200 hover:border-red-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#C8102E] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800">Live TV</span>
            </button>

          </div>
        </div>

      </div>

      {/* 3. BOTTOM ROW: Recent News Table + News By Category Donut + Storage Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recent News Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-900">Recent News</h3>
            <button className="text-xs font-bold text-[#C8102E] hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentNews.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 max-w-[220px] truncate">
                      {row.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${row.categoryBg}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-bold">{row.author}</td>
                    <td className="py-3 px-4">
                      {row.status === 'Published' ? (
                        <span className="bg-emerald-50 text-[#0E6233] border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold">
                          Published
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">{row.date}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => alert(`Viewing: ${row.title}`)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => alert(`Editing: ${row.title}`)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteNews(row.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right: News By Category Donut & Storage Usage (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Donut Chart Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-extrabold text-slate-900">News By Category</h3>
              <button className="text-xs font-bold text-[#C8102E] hover:underline">View All</button>
            </div>

            <div className="flex items-center justify-center h-44 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {categoryPieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-700">{item.name}</span>
                  </div>
                  <div className="text-slate-500">
                    {item.percentage} <span className="text-[10px] text-slate-400 font-medium">({item.value})</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Storage Usage Progress Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900">Storage Usage</h3>
              <button className="text-xs font-bold text-[#C8102E] hover:underline">View Details</button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-900">35.6 GB <span className="text-slate-400 font-normal">/ 100 GB Used</span></span>
                <span className="font-black text-[#C8102E]">35%</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#C8102E] h-2.5 rounded-full w-[35%]"></div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              Media files, images, videos and documents
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
