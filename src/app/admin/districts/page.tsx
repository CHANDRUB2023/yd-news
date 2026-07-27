'use client';

import React, { useState } from 'react';
import { 
  MapPin, Plus, Search, Edit, Trash2, Users, Building2, 
  CheckCircle2, X, Phone, Mail, Award, ShieldCheck, Filter, Camera, Image as ImageIcon
} from 'lucide-react';

interface DistrictUnit {
  id: number;
  name: string;
  zones: number;
  cadres: string;
  secretary: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Restructuring';
  image: string; // District landmark / HQ photo
  secretaryPhoto: string; // Secretary portrait
}

export default function DistrictsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const [districts, setDistricts] = useState<DistrictUnit[]>([
    { 
      id: 1, 
      name: 'Chennai Central (சென்னை மத்திய)', 
      zones: 15, 
      cadres: '45,200', 
      secretary: 'S. Ramanathan', 
      phone: '+91 98400 12345', 
      email: 'chennai.central@youngdemocrats.org', 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      secretaryPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 2, 
      name: 'Madurai Urban (மதுரை மாநகர்)', 
      zones: 12, 
      cadres: '32,100', 
      secretary: 'M. Alagarsamy', 
      phone: '+91 94430 56789', 
      email: 'madurai.urban@youngdemocrats.org', 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      secretaryPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 3, 
      name: 'Coimbatore South (கோவை தெற்கு)', 
      zones: 14, 
      cadres: '28,400', 
      secretary: 'K. Venkatesh', 
      phone: '+91 98422 98765', 
      email: 'covai.south@youngdemocrats.org', 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
      secretaryPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 4, 
      name: 'Tiruchirappalli (திருச்சிராப்பள்ளி)', 
      zones: 10, 
      cadres: '24,800', 
      secretary: 'P. Sivakumar', 
      phone: '+91 94421 11223', 
      email: 'trichy@youngdemocrats.org', 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=600&q=80',
      secretaryPhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 5, 
      name: 'Salem North (சேலம் வடக்கு)', 
      zones: 9, 
      cadres: '19,500', 
      secretary: 'R. Periasamy', 
      phone: '+91 98427 33445', 
      email: 'salem.north@youngdemocrats.org', 
      status: 'Restructuring',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      secretaryPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 6, 
      name: 'Tirunelveli (திருநெல்வேலி)', 
      zones: 11, 
      cadres: '21,300', 
      secretary: 'A. Subbiah', 
      phone: '+91 94431 55667', 
      email: 'nellai@youngdemocrats.org', 
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?auto=format&fit=crop&w=600&q=80',
      secretaryPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
  ]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState<DistrictUnit | null>(null);

  // New District Form State
  const [name, setName] = useState('');
  const [secretary, setSecretary] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zones, setZones] = useState(10);
  const [cadres, setCadres] = useState('5,000');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Restructuring'>('Active');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80');
  const [secretaryPhoto, setSecretaryPhoto] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80');

  // Handle Photo File Upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isEdit && editingDistrict) {
          setEditingDistrict({ ...editingDistrict, image: result });
        } else {
          setImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSecretaryPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isEdit && editingDistrict) {
          setEditingDistrict({ ...editingDistrict, secretaryPhoto: result });
        } else {
          setSecretaryPhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add District Submit
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newUnit: DistrictUnit = {
      id: Date.now(),
      name,
      secretary: secretary || 'To Be Appointed',
      phone: phone || '+91 90000 00000',
      email: email || 'district@youngdemocrats.org',
      zones: Number(zones) || 8,
      cadres: cadres || '1,000',
      status,
      image,
      secretaryPhoto,
    };
    setDistricts([...districts, newUnit]);
    setName('');
    setSecretary('');
    setPhone('');
    setEmail('');
    setIsAddModalOpen(false);
  };

  // Edit District Submit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDistrict) return;
    setDistricts(districts.map(d => d.id === editingDistrict.id ? editingDistrict : d));
    setEditingDistrict(null);
  };

  // Delete District
  const handleDelete = (id: number, unitName: string) => {
    if (confirm(`Are you sure you want to delete ${unitName} district unit?`)) {
      setDistricts(districts.filter(d => d.id !== id));
    }
  };

  // Filtered list
  const filtered = districts.filter(d => {
    const matchQuery = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       d.secretary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === 'ALL' || d.status === selectedStatus;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#C8102E]" /> State & District Coordinators Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage State Coordinators, nested District Coordinators, landmark photos, and cadres count</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#C8102E] hover:bg-[#A00B22] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add District Unit</span>
        </button>
      </div>

      {/* Grid Card View with Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(row => (
          <div key={row.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group">
            
            {/* District Cover Landmark Image */}
            <div className="h-44 bg-slate-900 relative overflow-hidden">
              <img src={row.image} alt={row.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
              
              <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black border backdrop-blur-xs ${
                row.status === 'Active' ? 'bg-emerald-500/90 text-white border-emerald-400' :
                row.status === 'Restructuring' ? 'bg-amber-500/90 text-white border-amber-400' :
                'bg-red-500/90 text-white border-red-400'
              }`}>
                {row.status}
              </span>

              {/* District Name overlay */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-base font-black truncate drop-shadow">{row.name}</h3>
                <p className="text-[11px] text-emerald-300 font-bold">{row.zones} Zones • {row.cadres} Cadres</p>
              </div>
            </div>

            {/* Secretary Details & Photo Row */}
            <div className="p-5 space-y-4">
              
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <img src={row.secretaryPhoto} alt={row.secretary} className="w-12 h-12 rounded-xl object-cover border-2 border-[#C8102E] shrink-0 shadow-sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">DISTRICT SECRETARY</p>
                  <h4 className="text-xs font-black text-slate-900 truncate">{row.secretary}</h4>
                  <p className="text-[10px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-[#C8102E]" /> {row.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-medium">
                <span className="flex items-center gap-1 truncate"><Mail className="w-3.5 h-3.5 text-slate-400" /> {row.email}</span>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button 
                  onClick={() => setEditingDistrict({ ...row })} 
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" /> Edit District & Photos
                </button>

                <button 
                  onClick={() => handleDelete(row.id, row.name)} 
                  className="text-red-500 hover:text-red-700 p-1.5 rounded-xl hover:bg-red-50 transition-colors"
                  title="Delete District"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* FULL EDIT DISTRICT WITH IMAGES MODAL */}
      {editingDistrict && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 font-sans my-8">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Edit className="w-4 h-4 text-[#C8102E]" /> Edit District & Images
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Update photos, leadership details and zone counts</p>
              </div>
              <button onClick={() => setEditingDistrict(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-bold">
              
              {/* Cover Landmark Photo Upload */}
              <div className="space-y-1">
                <label className="block text-slate-700">District Cover Photo (Landmark / Headquarters):</label>
                <div className="flex items-center gap-3">
                  <img src={editingDistrict.image} alt="District Cover" className="w-20 h-14 rounded-xl object-cover border border-slate-200 shrink-0" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleCoverUpload(e, true)}
                    className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-[#C8102E] file:text-white file:font-bold cursor-pointer"
                  />
                </div>
              </div>

              {/* Secretary Portrait Photo Upload */}
              <div className="space-y-1">
                <label className="block text-slate-700">District Secretary Portrait Photo:</label>
                <div className="flex items-center gap-3">
                  <img src={editingDistrict.secretaryPhoto} alt="Secretary Avatar" className="w-12 h-12 rounded-xl object-cover border-2 border-[#C8102E] shrink-0" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSecretaryPhotoUpload(e, true)}
                    className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-[#0E6233] file:text-white file:font-bold cursor-pointer"
                  />
                </div>
              </div>

              {/* District Name */}
              <div className="space-y-1">
                <label className="block text-slate-700">District Unit Name (மாவட்ட பெயர்)</label>
                <input
                  type="text"
                  value={editingDistrict.name}
                  onChange={(e) => setEditingDistrict({ ...editingDistrict, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>

              {/* Secretary Name */}
              <div className="space-y-1">
                <label className="block text-slate-700">District Secretary Name (மாவட்ட செயலாளர்)</label>
                <input
                  type="text"
                  value={editingDistrict.secretary}
                  onChange={(e) => setEditingDistrict({ ...editingDistrict, secretary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Secretary Phone</label>
                  <input
                    type="text"
                    value={editingDistrict.phone}
                    onChange={(e) => setEditingDistrict({ ...editingDistrict, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">Official Email</label>
                  <input
                    type="email"
                    value={editingDistrict.email}
                    onChange={(e) => setEditingDistrict({ ...editingDistrict, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Zones, Cadres & Status */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Zones / Wards</label>
                  <input
                    type="number"
                    value={editingDistrict.zones}
                    onChange={(e) => setEditingDistrict({ ...editingDistrict, zones: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">Cadre Count</label>
                  <input
                    type="text"
                    value={editingDistrict.cadres}
                    onChange={(e) => setEditingDistrict({ ...editingDistrict, cadres: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-700">Unit Status</label>
                  <select
                    value={editingDistrict.status}
                    onChange={(e) => setEditingDistrict({ ...editingDistrict, status: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Restructuring">Restructuring</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setEditingDistrict(null)} 
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 rounded-xl bg-[#0E6233] text-white font-black shadow hover:bg-emerald-800 transition-colors"
                >
                  Save District Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ADD DISTRICT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200 font-sans my-8">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Add New District Unit</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs font-bold">
              
              <div>
                <label className="block text-slate-700 mb-1">Cover Landmark Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleCoverUpload(e, false)}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-[#C8102E] file:text-white file:font-bold cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Secretary Portrait Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSecretaryPhotoUpload(e, false)}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-[#0E6233] file:text-white file:font-bold cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">District Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kanchipuram East"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">District Secretary Name</label>
                <input
                  type="text"
                  value={secretary}
                  onChange={(e) => setSecretary(e.target.value)}
                  placeholder="Secretary Full Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">Secretary Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Restructuring">Restructuring</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#C8102E] text-white font-bold shadow">Save District</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
