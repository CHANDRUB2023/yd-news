'use client';

import React, { useState } from 'react';
import { 
  Users, UserCheck, Search, Plus, Edit, Trash2, Eye, 
  ShieldCheck, X, CheckCircle2, Award, QrCode, Printer, Filter
} from 'lucide-react';

interface Member {
  id: string; // e.g. YD-TN-2026-89412
  name: string;
  phone: string;
  email: string;
  district: string;
  wing: string;
  joinedDate: string;
  status: 'Verified Cadre' | 'Pending Approval' | 'Suspended';
  photo: string;
}

export default function AdminMembersPage() {
  const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const [members, setMembers] = useState<Member[]>([
    {
      id: 'YD-TN-2026-89412',
      name: 'S. Karthikeyan',
      phone: '+91 98765 43210',
      email: 'karthik@gmail.com',
      district: 'Chennai',
      wing: 'Youth Wing (இளைஞர் அணி)',
      joinedDate: todayStr,
      status: 'Verified Cadre',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'YD-TN-2026-75124',
      name: 'Anitha Vijay',
      phone: '+91 94432 10987',
      email: 'anitha@yahoo.com',
      district: 'Madurai',
      wing: 'Women Wing (மகளிர் அணி)',
      joinedDate: todayStr,
      status: 'Verified Cadre',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'YD-TN-2026-61298',
      name: 'M. Selvakumar',
      phone: '+91 98421 56789',
      email: 'selvam@gmail.com',
      district: 'Coimbatore',
      wing: 'IT & Digital Media (தகவல் தொழில்நுட்ப அணி)',
      joinedDate: todayStr,
      status: 'Pending Approval',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'YD-TN-2026-53891',
      name: 'R. Priya Dharshini',
      phone: '+91 97890 12345',
      email: 'priya@gmail.com',
      district: 'Salem',
      wing: 'Student Wing (மாணவர் அணி)',
      joinedDate: todayStr,
      status: 'Verified Cadre',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'YD-TN-2026-42109',
      name: 'K. Ramesh Kumar',
      phone: '+91 96555 67890',
      email: 'ramesh@youngdemocrats.org',
      district: 'Trichy',
      wing: 'Youth Wing (இளைஞர் அணி)',
      joinedDate: todayStr,
      status: 'Pending Approval',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modal States
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [viewingCardMember, setViewingCardMember] = useState<Member | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Member Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDistrict, setNewDistrict] = useState('Chennai');
  const [newWing, setNewWing] = useState('Youth Wing (இளைஞர் அணி)');

  // Handle Edit Member Submit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
    setEditingMember(null);
  };

  // Handle Add Member Submit
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newMember: Member = {
      id: `YD-TN-2026-${randomNum}`,
      name: newName,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      district: newDistrict,
      wing: newWing,
      joinedDate: todayStr,
      status: 'Verified Cadre',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    };

    setMembers([newMember, ...members]);
    setIsAddModalOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
  };

  // Handle Delete Member
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from party membership?`)) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  // Filtered List
  const filtered = members.filter(m => {
    const matchQuery = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       m.phone.includes(searchQuery);
    const matchDistrict = selectedDistrict === 'ALL' || m.district === selectedDistrict;
    const matchStatus = selectedStatus === 'ALL' || m.status === selectedStatus;
    return matchQuery && matchDistrict && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#C8102E]" /> Party Members & Cadre Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Edit member profiles, issue verified digital ID cards, change wing roles and districts</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Member</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Total Registered Members</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{members.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Verified Cadres</p>
            <h3 className="text-2xl font-black text-[#0E6233] mt-0.5">
              {members.filter(m => m.status === 'Verified Cadre').length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0E6233] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Pending Verification</p>
            <h3 className="text-2xl font-black text-amber-600 mt-0.5">
              {members.filter(m => m.status === 'Pending Approval').length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500">Active Districts</p>
            <h3 className="text-2xl font-black text-blue-600 mt-0.5">38</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Member Name, Phone or ID..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto text-xs font-bold">
          
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-700 outline-none"
          >
            <option value="ALL">All Districts</option>
            <option value="Chennai">Chennai</option>
            <option value="Madurai">Madurai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Salem">Salem</option>
            <option value="Trichy">Trichy</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-700 outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="Verified Cadre">Verified Cadre</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Suspended">Suspended</option>
          </select>

        </div>

      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Member Info</th>
                <th className="py-3.5 px-4">Member ID</th>
                <th className="py-3.5 px-4">District</th>
                <th className="py-3.5 px-4">Wing / அணி</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Photo & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={row.photo} 
                        alt={row.name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" 
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{row.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{row.phone}</div>
                      </div>
                    </div>
                  </td>

                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-[#C8102E]">
                    {row.id}
                  </td>

                  {/* District */}
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {row.district}
                  </td>

                  {/* Wing */}
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      {row.wing}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {row.joinedDate}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      row.status === 'Verified Cadre' ? 'bg-emerald-50 text-[#0E6233] border-emerald-200' :
                      row.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {row.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      
                      {/* View ID Card */}
                      <button 
                        onClick={() => setViewingCardMember(row)} 
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                        title="View Digital ID Card"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Member Details Button */}
                      <button 
                        onClick={() => setEditingMember({ ...row })} 
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors font-bold flex items-center gap-1 text-[11px] px-2.5"
                        title="Edit Member Details"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>

                      {/* Delete */}
                      <button 
                        onClick={() => handleDelete(row.id, row.name)} 
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MEMBER MODAL */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 font-sans">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Edit className="w-4 h-4 text-[#C8102E]" /> Edit Member Profile
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">ID: {editingMember.id}</p>
              </div>
              <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-bold">
              
              <div className="space-y-1">
                <label className="block text-slate-700">Full Name (பெயர்)</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Phone Number</label>
                  <input
                    type="text"
                    value={editingMember.phone}
                    onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">District (மாவட்டம்)</label>
                  <select
                    value={editingMember.district}
                    onChange={(e) => setEditingMember({ ...editingMember, district: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  >
                    <option>Chennai</option>
                    <option>Madurai</option>
                    <option>Coimbatore</option>
                    <option>Salem</option>
                    <option>Trichy</option>
                    <option>Tirunelveli</option>
                    <option>Vellore</option>
                    <option>Thanjavur</option>
                    <option>Erode</option>
                    <option>Kanchipuram</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">Verification Status</label>
                  <select
                    value={editingMember.status}
                    onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="Verified Cadre">Verified Cadre</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700">Party Wing (அணி)</label>
                <select
                  value={editingMember.wing}
                  onChange={(e) => setEditingMember({ ...editingMember, wing: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                >
                  <option>Youth Wing (இளைஞர் அணி)</option>
                  <option>Women Wing (மகளிர் அணி)</option>
                  <option>Student Wing (மாணவர் அணி)</option>
                  <option>IT & Digital Media (தகவல் தொழில்நுட்ப அணி)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setEditingMember(null)} 
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 rounded-xl bg-[#0E6233] text-white font-black shadow hover:bg-emerald-800 transition-colors"
                >
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ADD NEW MEMBER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 font-sans">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Add New Party Member</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">District</label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  >
                    <option>Chennai</option>
                    <option>Madurai</option>
                    <option>Coimbatore</option>
                    <option>Salem</option>
                    <option>Trichy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Party Wing</label>
                  <select
                    value={newWing}
                    onChange={(e) => setNewWing(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  >
                    <option>Youth Wing (இளைஞர் அணி)</option>
                    <option>Women Wing (மகளிர் அணி)</option>
                    <option>Student Wing (மாணவர் அணி)</option>
                    <option>IT Wing</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Register Member</button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* VIEW ID CARD PREVIEW MODAL */}
      {viewingCardMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 font-sans relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C8102E]" /> Member ID Card Preview
              </h3>
              <button onClick={() => setViewingCardMember(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ID Card Display */}
            <div className="w-full bg-gradient-to-b from-white via-slate-50 to-red-50/30 rounded-3xl border-2 border-red-800/30 shadow-xl overflow-hidden relative font-sans text-slate-900">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#C8102E] via-[#800A1D] to-[#0E6233] text-white p-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 bg-[#C8102E] relative overflow-hidden rounded border border-white/40 shadow-xs shrink-0">
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-t-white border-l-[16px] border-l-transparent"></div>
                      <div className="absolute top-0.5 right-0.5 text-[#0E6233] text-[9px] font-black leading-none">★</div>
                    </div>
                    <div>
                      <h2 className="text-xs font-black tracking-tight text-white uppercase leading-none">YOUNG DEMOCRATS</h2>
                      <p className="text-[7px] font-bold text-emerald-300 tracking-widest uppercase mt-0.5">இளம் ஜனநாயகவாதிகள்</p>
                    </div>
                  </div>
                  <span className="bg-amber-400 text-slate-950 font-black text-[8px] px-2 py-0.5 rounded-full uppercase border border-amber-300">
                    OFFICIAL
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={viewingCardMember.photo} alt={viewingCardMember.name} className="w-16 h-20 rounded-xl border-2 border-[#C8102E] object-cover shrink-0" />
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">MEMBER NAME</p>
                    <h3 className="text-sm font-black text-slate-900 leading-tight">{viewingCardMember.name}</h3>
                    <p className="text-[10px] font-mono font-bold text-[#C8102E] bg-red-50 px-2 py-0.5 rounded inline-block mt-1">
                      {viewingCardMember.id}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">
                  <div><span className="text-[8px] text-slate-400 uppercase font-bold block">District:</span><span className="font-bold">{viewingCardMember.district}</span></div>
                  <div><span className="text-[8px] text-slate-400 uppercase font-bold block">Wing:</span><span className="font-bold">{viewingCardMember.wing}</span></div>
                  <div><span className="text-[8px] text-slate-400 uppercase font-bold block">Mobile:</span><span className="font-bold">{viewingCardMember.phone}</span></div>
                  <div><span className="text-[8px] text-slate-400 uppercase font-bold block">Status:</span><span className="font-extrabold text-[#0E6233]">{viewingCardMember.status}</span></div>
                </div>
              </div>

              <div className="bg-slate-900 text-white text-[8px] font-bold text-center py-1 tracking-wider uppercase">
                VOICE OF PEOPLE ★ POWER OF YOUTH
              </div>

            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => window.print()} 
                className="w-full bg-[#C8102E] text-white font-bold text-xs py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Member ID Card
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
