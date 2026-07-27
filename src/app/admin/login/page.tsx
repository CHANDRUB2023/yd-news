'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  ShieldCheck, Eye, EyeOff, Lock, User, Users, Gauge, 
  AlertCircle, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithCredentials } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email/username and password.');
      return;
    }

    setError(null);
    setLoading(true);

    const result = await loginWithCredentials(email, password);
    setLoading(false);

    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Invalid credentials. Please check your details.');
    }
  };

  const handleQuickRole = async (role: 'admin' | 'editor') => {
    let targetEmail = '';
    let targetPassword = 'admin123';
    switch (role) {
      case 'admin':
        targetEmail = 'karthik@youngdemocrats.org';
        targetPassword = 'admin123';
        break;
      case 'editor':
        targetEmail = 'anitha@youngdemocrats.org';
        targetPassword = 'editor123';
        break;
    }
    setEmail(targetEmail);
    setPassword(targetPassword);
    setError(null);
    setLoading(true);

    const result = await loginWithCredentials(targetEmail, targetPassword);
    setLoading(false);

    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Failed to sign in.');
    }
  };

  return (
    <div className="min-h-screen bg-[#800A1D] flex items-center justify-center p-3 sm:p-6 font-sans">
      
      {/* Outer Card Frame */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] border border-red-950/20">
        
        {/* Left Hero Section (6 Cols on LG) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#C8102E] to-[#990B22] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Background Overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          {/* Party Flag Banner Top Left */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-md flex items-center gap-2.5">
              <div className="w-10 h-8 bg-[#C8102E] relative overflow-hidden rounded flex items-center justify-center border border-slate-100 shadow-inner">
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-t-white border-l-[24px] border-l-transparent"></div>
                <div className="absolute top-1 right-1 text-[#0E6233] text-xs font-black leading-none">★</div>
              </div>
              <div className="leading-none pr-1">
                <h2 className="text-sm font-black text-slate-900 tracking-tight">YOUNG DEMOCRATS</h2>
                <p className="text-[9px] font-bold text-[#C8102E] tracking-widest uppercase mt-0.5">NEWS PORTAL</p>
              </div>
            </div>
          </div>

          {/* Center Circular Flag Visual */}
          <div className="relative z-10 my-8 sm:my-10 flex flex-col items-center justify-center text-center">
            <div className="w-36 h-36 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden bg-white/10 backdrop-blur flex items-center justify-center p-2 mb-4">
              <img src="/img/flag.svg" alt="Young Democrats Flag" className="w-full h-full rounded-full object-cover shadow-inner" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">YOUNG DEMOCRATS</h2>
            <p className="text-xs text-red-100 font-bold mt-1">Official Administration Portal</p>
          </div>

          {/* Bottom Feature Badges */}
          <div className="relative z-10 bg-[#0E6233] -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 pt-8 rounded-t-[2.5rem] shadow-inner border-t border-emerald-500/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mb-1.5 text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                </div>
                <h4 className="text-xs font-bold text-white">Admin Access</h4>
                <p className="text-[10px] text-emerald-100/70 mt-0.5">Full system management</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mb-1.5 text-white">
                  <Users className="w-4 h-4 text-emerald-300" />
                </div>
                <h4 className="text-xs font-bold text-white">Editor Access</h4>
                <p className="text-[10px] text-emerald-100/70 mt-0.5">Article & media publication</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Form Section (6 Cols on LG) */}
        <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-white">
          
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0E6233] mx-auto mb-4 shadow-sm">
                <div className="relative">
                  <User className="w-8 h-8 text-[#0E6233]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C8102E] rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">✓</div>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Portal <span className="text-[#0E6233]">Sign In</span>
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Select Admin or Editor login to continue
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Username or Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username or Email"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E6233]/20 focus:border-[#0E6233] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E6233]/20 focus:border-[#0E6233] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0E6233] focus:ring-[#0E6233] border-slate-300 accent-[#0E6233]"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-[#C8102E] to-[#0E6233] hover:opacity-95 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Clean 2-Role Demo Access */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick Sign In Options
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onClick={() => handleQuickRole('admin')} 
                className="text-xs font-extrabold bg-red-50 border border-red-200 text-[#C8102E] hover:bg-[#C8102E] hover:text-white py-2 px-3 rounded-xl transition-colors text-center"
              >
                1. Admin Login
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickRole('editor')} 
                className="text-xs font-extrabold bg-emerald-50 border border-emerald-200 text-[#0E6233] hover:bg-[#0E6233] hover:text-white py-2 px-3 rounded-xl transition-colors text-center"
              >
                2. Editor Login
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-[11px] text-slate-400">
            © {new Date().getFullYear()} <span className="font-bold text-[#C8102E]">Young Democrats</span> News Portal.
          </div>

        </div>

      </div>

    </div>
  );
}

