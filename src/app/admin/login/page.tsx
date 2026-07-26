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

  const handleQuickRole = async (role: 'superadmin' | 'admin' | 'editor' | 'reporter' | 'coordinator') => {
    let targetEmail = '';
    let targetPassword = 'admin123';
    switch (role) {
      case 'superadmin':
        targetEmail = 'superadmin@youngdemocrats.org';
        targetPassword = 'admin123';
        break;
      case 'admin':
        targetEmail = 'karthik@youngdemocrats.org';
        targetPassword = 'admin123';
        break;
      case 'editor':
        targetEmail = 'anitha@youngdemocrats.org';
        targetPassword = 'editor123';
        break;
      case 'reporter':
        targetEmail = 'reporter@youngdemocrats.org';
        targetPassword = 'reporter123';
        break;
      case 'coordinator':
        targetEmail = 'coordinator@youngdemocrats.org';
        targetPassword = 'district123';
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
        
        {/* Left Hero Section (5 Cols on LG) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#C8102E] to-[#990B22] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Background Crowd Pattern Overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
          
          {/* Party Flag Banner Top Left */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl shadow-md flex items-center gap-2.5">
              <div className="w-10 h-8 bg-[#C8102E] relative overflow-hidden rounded flex items-center justify-center border border-slate-100 shadow-inner">
                {/* White triangle clip */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[32px] border-t-white border-l-[24px] border-l-transparent"></div>
                {/* Green Star */}
                <div className="absolute top-1 right-1 text-[#0E6233] text-xs font-black leading-none">★</div>
              </div>
              <div className="leading-none pr-1">
                <h2 className="text-sm font-black text-slate-900 tracking-tight">YOUNG DEMOCRATS</h2>
                <p className="text-[9px] font-bold text-[#C8102E] tracking-widest uppercase mt-0.5">NEWS PORTAL</p>
              </div>
            </div>
          </div>

          {/* Center Flag Visual Representation */}
          <div className="relative z-10 my-8 sm:my-10 flex flex-col items-center justify-center text-center">
            
            {/* Flagpole & Flag illustration */}
            <div className="relative w-full max-w-xs h-56 flex items-center justify-center">
              
              {/* Flagpole */}
              <div className="absolute left-10 top-0 bottom-0 w-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 rounded-full shadow-lg z-20">
                <div className="w-4 h-4 rounded-full bg-amber-300 border border-amber-500 absolute -top-2 -left-0.75 shadow"></div>
              </div>

              {/* Waving Party Flag Graphic */}
              <div className="absolute left-12 top-4 w-64 h-36 bg-gradient-to-r from-[#C8102E] via-[#D31B38] to-[#B80D29] rounded-r-2xl shadow-xl flex flex-col justify-between p-4 border-y border-r border-white/20 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                
                {/* Diagonal White triangle section with Green Star */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[144px] border-t-white border-l-[110px] border-l-transparent pointer-events-none"></div>
                <div className="absolute top-3 right-3 text-[#0E6233] text-2xl font-black z-10 drop-shadow-sm">★</div>
                
                <div className="relative z-10 mt-3 max-w-[140px]">
                  <p className="text-xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-md">
                    YOUNG DEMOCRATS
                  </p>
                </div>
              </div>

              {/* Crowd watermark graphic simulation */}
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#990B22] via-[#990B22]/80 to-transparent flex items-end justify-center gap-1 opacity-40">
                {[...Array(18)].map((_, i) => (
                  <div key={i} className="w-3 bg-white/30 rounded-t-full" style={{ height: `${20 + (i % 5) * 8}px` }}></div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Wave & Feature Badges Card */}
          <div className="relative z-10 bg-[#0E6233] -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 pt-8 rounded-t-[2.5rem] shadow-inner border-t border-emerald-500/20">
            <div className="grid grid-cols-3 gap-3 text-center">
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 text-white">
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                </div>
                <h4 className="text-xs font-bold text-white">Secure Access</h4>
                <p className="text-[10px] text-emerald-100/70 mt-0.5 leading-tight">Multi-layer protection for admin panel</p>
              </div>

              <div className="flex flex-col items-center border-x border-white/10 px-1">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 text-white">
                  <Users className="w-5 h-5 text-emerald-300" />
                </div>
                <h4 className="text-xs font-bold text-white">Role Based</h4>
                <p className="text-[10px] text-emerald-100/70 mt-0.5 leading-tight">Granular permissions for every role</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 text-white">
                  <Gauge className="w-5 h-5 text-emerald-300" />
                </div>
                <h4 className="text-xs font-bold text-white">Real-time Analytics</h4>
                <p className="text-[10px] text-emerald-100/70 mt-0.5 leading-tight">Monitor portal performance in real-time</p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Form Section (7 Cols on LG) */}
        <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-white">
          
          <div>
            {/* Top Shield Avatar Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0E6233] mx-auto mb-4 shadow-sm">
                <div className="relative">
                  <User className="w-8 h-8 text-[#0E6233]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#C8102E] rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">✓</div>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome Back, <span className="text-[#0E6233]">Admin!</span>
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Sign in to continue to Young Democrats News Portal Admin Dashboard
              </p>
            </div>

            {/* Error Message Alert */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username or Email Input */}
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

              {/* Password Input */}
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

              {/* Remember Me & Forgot Password */}
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
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link has been sent to system administrator."); }} className="text-[#C8102E] font-bold hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-[#C8102E] via-[#8B0000] to-[#0E6233] hover:opacity-95 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
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

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative px-3 bg-white text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                or continue with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                onClick={() => handleQuickRole('admin')}
                className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button 
                type="button" 
                onClick={() => handleQuickRole('admin')}
                className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
                <span>Microsoft</span>
              </button>
            </div>
          </div>

          {/* Demo Role Switcher Quick Access */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick Role Auto-Fill
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" onClick={() => handleQuickRole('superadmin')} className="text-[10px] font-bold bg-slate-100 hover:bg-[#C8102E] hover:text-white px-2 py-1 rounded transition-colors text-slate-700">Super Admin</button>
              <button type="button" onClick={() => handleQuickRole('admin')} className="text-[10px] font-bold bg-slate-100 hover:bg-[#0E6233] hover:text-white px-2 py-1 rounded transition-colors text-slate-700">Admin</button>
              <button type="button" onClick={() => handleQuickRole('editor')} className="text-[10px] font-bold bg-slate-100 hover:bg-blue-600 hover:text-white px-2 py-1 rounded transition-colors text-slate-700">Editor</button>
              <button type="button" onClick={() => handleQuickRole('reporter')} className="text-[10px] font-bold bg-slate-100 hover:bg-amber-600 hover:text-white px-2 py-1 rounded transition-colors text-slate-700">Reporter</button>
              <button type="button" onClick={() => handleQuickRole('coordinator')} className="text-[10px] font-bold bg-slate-100 hover:bg-purple-600 hover:text-white px-2 py-1 rounded transition-colors text-slate-700">District Coord</button>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="mt-4 text-center text-[11px] text-slate-400">
            © {new Date().getFullYear()} <span className="font-bold text-[#C8102E]">Young Democrats</span> <span className="font-bold text-[#0E6233]">News Portal</span>. All rights reserved.
          </div>

        </div>

      </div>

    </div>
  );
}
