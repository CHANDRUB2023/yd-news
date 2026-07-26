'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  UserPlus, CheckCircle2, Download, Printer, Share2, 
  Sparkles, Camera, ShieldCheck, QrCode, RefreshCw, Award
} from 'lucide-react';

export default function MembershipPage() {
  const { language, t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Chennai');
  const [wing, setWing] = useState('Youth Wing (இளைஞர் அணி)');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  
  const [submitted, setSubmitted] = useState(false);
  const [membershipId, setMembershipId] = useState('');
  const [joinedDate, setJoinedDate] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    // Generate random 5-digit ID number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `YD-TN-2026-${randomNum}`;
    const todayFormatted = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    setMembershipId(generatedId);
    setJoinedDate(todayFormatted);
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans">
      
      {/* PRINT-ONLY CSS RULES TO PRINT ONLY THE ID CARD */}
      <style jsx global>{`
        @media print {
          /* Hide everything in the body by default */
          body * {
            visibility: hidden !important;
          }
          /* Show ONLY the printable ID card container and its children */
          #printable-id-card, #printable-id-card * {
            visibility: visible !important;
          }
          /* Center the card cleanly on the paper */
          #printable-id-card {
            position: fixed !important;
            left: 50% !important;
            top: 20% !important;
            transform: translateX(-50%) !important;
            width: 100% !important;
            max-width: 440px !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: 2px solid #C8102E !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Hide navigation, header, footer, alert banners, buttons */
          header, footer, nav, .print-hide {
            display: none !important;
          }
        }
      `}</style>

      {/* Header Banner */}
      <div className="print-hide bg-gradient-to-r from-[#C8102E] via-slate-900 to-[#0E6233] text-white p-8 md:p-10 rounded-3xl shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" />
          {t('join.title')}
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          {language === 'ta' ? 'இளம் ஜனநாயகவாதிகள் டிஜிட்டல் உறுப்பினர் அட்டை' : 'Young Democrats Digital Membership Card'}
        </h1>
        <p className="text-slate-200 text-xs md:text-sm leading-relaxed max-w-2xl">
          {language === 'ta' 
            ? 'உங்கள் தகவல்களைப் பதிவிட்டு உடனடியாக உங்கள் அதிகாரப்பூர்வ டிஜிட்டல் உறுப்பினர் அட்டையைப் பெறுங்கள்.'
            : 'Fill in your details below to generate and download your instant official party digital ID card.'}
        </p>
      </div>

      {!submitted ? (
        /* Form Section */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#C8102E]" />
              {language === 'ta' ? 'உறுப்பினர் சேர்க்கை படிவம்' : 'Membership Registration Form'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ta' ? 'அனைத்து விவரங்களையும் தெளிவாகப் பூர்த்தி செய்யவும்.' : 'Please enter accurate details to print on your membership card.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-bold">
            
            {/* Photo Upload Area */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center shrink-0 relative group">
                {photoUrl ? (
                  <img src={photoUrl} alt="Member Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2 text-slate-400 space-y-1">
                    <Camera className="w-6 h-6 mx-auto text-slate-400" />
                    <span className="text-[9px] block">Photo</span>
                  </div>
                )}
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <label className="block text-slate-800 font-extrabold text-xs">
                  {language === 'ta' ? 'உறுப்பினர் புகைப்படம் (விருப்பமான):' : 'Member Photo (Optional):'}
                </label>
                <p className="text-[11px] text-slate-500 font-normal">
                  {language === 'ta' ? 'உங்கள் அட்டையில் தோன்றும் புகைப்படத்தைப் பதிவேற்றலாம்.' : 'Upload a photo to feature on your official ID card.'}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="text-xs font-normal text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C8102E] file:text-white hover:file:bg-[#990B22] cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-slate-700">{t('contact.formName')} *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={language === 'ta' ? 'உங்கள் முழு பெயர்' : 'e.g. S. Karthikeyan'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-slate-700">{t('contact.formPhone')} *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-slate-700">{t('contact.formEmail')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
              </div>

              {/* District */}
              <div className="space-y-1">
                <label className="block text-slate-700">{t('join.district')}</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                >
                  <option>Chennai (சென்னை)</option>
                  <option>Madurai (மதுரை)</option>
                  <option>Coimbatore (கோவை)</option>
                  <option>Salem (சேலம்)</option>
                  <option>Trichy (திருச்சி)</option>
                  <option>Tirunelveli (திருநெல்வேலி)</option>
                  <option>Vellore (வேலூர்)</option>
                  <option>Thanjavur (தஞ்சாவூர்)</option>
                  <option>Erode (ஈரோடு)</option>
                  <option>Kanchipuram (காஞ்சிபுரம்)</option>
                </select>
              </div>

            </div>

            {/* Wing Selection */}
            <div className="space-y-1">
              <label className="block text-slate-700">{t('join.wing')}</label>
              <select
                value={wing}
                onChange={(e) => setWing(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              >
                <option>Youth Wing (இளைஞர் அணி)</option>
                <option>Women Wing (மகளிர் அணி)</option>
                <option>Student Wing (மாணவர் அணி)</option>
                <option>IT & Digital Media (தகவல் தொழில்நுட்ப அணி)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#C8102E] via-[#800A1D] to-[#0E6233] hover:opacity-95 text-white font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.99] text-sm tracking-wide uppercase"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>{language === 'ta' ? 'அட்டையை உருவாக்குங்கள் (Generate Card)' : 'Generate Digital Member Card'}</span>
            </button>

          </form>
        </div>
      ) : (
        /* Generated Membership Card Screen */
        <div className="space-y-6">
          
          <div className="print-hide bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold text-[#0E6233]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>
              {language === 'ta' 
                ? 'வாழ்த்துகள்! உங்கள் டிஜிட்டல் உறுப்பினர் அட்டை வெற்றிகரமாக உருவாக்கப்பட்டது.' 
                : 'Congratulations! Your digital party membership card is ready below.'}
            </span>
          </div>

          {/* THE ID CARD WRAPPER FOR PRINT & PREVIEW */}
          <div className="flex justify-center p-2">
            <div 
              id="printable-id-card"
              ref={cardRef} 
              className="w-full max-w-md bg-gradient-to-b from-white via-slate-50 to-red-50/30 rounded-3xl border-2 border-red-800/30 shadow-2xl overflow-hidden relative font-sans text-slate-900"
            >
              {/* Top Banner (Party Colors Header) */}
              <div className="bg-gradient-to-r from-[#C8102E] via-[#800A1D] to-[#0E6233] text-white p-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  
                  {/* Flag & Logo */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-7 bg-[#C8102E] relative overflow-hidden rounded border border-white/40 shadow-sm shrink-0">
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-t-white border-l-[20px] border-l-transparent"></div>
                      <div className="absolute top-0.5 right-0.5 text-[#0E6233] text-[10px] font-black leading-none">★</div>
                    </div>
                    <div>
                      <h2 className="text-sm font-black tracking-tight text-white uppercase leading-none">YOUNG DEMOCRATS</h2>
                      <p className="text-[8px] font-bold text-emerald-300 tracking-widest uppercase mt-0.5">இளம் ஜனநாயகவாதிகள்</p>
                    </div>
                  </div>

                  {/* Gold Verified Seal */}
                  <div className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm uppercase border border-amber-300">
                    <Award className="w-3 h-3" /> OFFICIAL
                  </div>

                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                
                {/* Photo & Member Meta Row */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-20 h-24 rounded-2xl border-2 border-[#C8102E] overflow-hidden bg-slate-100 shrink-0 shadow-md relative">
                    <img 
                      src={photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'} 
                      alt={fullName} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#0E6233] text-white text-[8px] font-extrabold text-center py-0.5 uppercase">
                      MEMBER
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MEMBER NAME / பெயர்</p>
                    <h3 className="text-base font-black text-slate-900 truncate leading-tight">{fullName}</h3>
                    
                    <div className="pt-1 space-y-0.5 text-xs">
                      <p className="text-[11px] font-mono font-bold text-[#C8102E] bg-red-50 px-2 py-0.5 rounded inline-block border border-red-100">
                        {membershipId}
                      </p>
                      <p className="text-[10px] text-slate-600 font-bold">
                        District: <span className="text-slate-900">{district}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info Table Grid */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-2xl border border-slate-200 font-medium">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Wing / அணி:</span>
                    <span className="font-extrabold text-slate-800 text-[10px] leading-tight block">{wing}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Issued Date:</span>
                    <span className="font-bold text-slate-800 text-[10px]">{joinedDate}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Mobile:</span>
                    <span className="font-bold text-slate-800 text-[10px]">{phone}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Status:</span>
                    <span className="font-extrabold text-[#0E6233] text-[10px] flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED CADRE
                    </span>
                  </div>
                </div>

                {/* Bottom QR Code & Signatures */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-white p-1 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-slate-800" />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase">SCAN TO VERIFY</p>
                      <p className="text-[9px] font-bold text-[#0E6233]">youngdemocrats.org</p>
                    </div>
                  </div>

                  <div className="text-right space-y-0.5">
                    <p className="font-serif italic text-xs font-bold text-slate-800 tracking-wide">S. Arul</p>
                    <p className="text-[8px] font-extrabold text-slate-500 uppercase border-t border-slate-300 pt-0.5">State Convener</p>
                  </div>
                </div>

              </div>

              {/* Card Footer Stripe */}
              <div className="bg-slate-900 text-white text-[9px] font-bold text-center py-1.5 px-4 tracking-wider uppercase flex items-center justify-between">
                <span>VOICE OF PEOPLE</span>
                <span className="text-amber-400 font-extrabold">POWER OF YOUTH</span>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="print-hide flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto bg-[#C8102E] hover:bg-[#A00B22] text-white font-extrabold text-xs py-3 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'ta' ? 'அட்டையை மட்டும் அச்சிடு / டவுன்லோட் செய்' : 'Print / Save Only ID Card'}</span>
            </button>

            <button
              onClick={() => alert(`Share your Member ID ${membershipId} on WhatsApp!`)}
              className="w-full sm:w-auto bg-[#0E6233] hover:bg-emerald-800 text-white font-extrabold text-xs py-3 px-6 rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'ta' ? 'பகிர் (Share Digital Card)' : 'Share Digital Card'}</span>
            </button>

            <button
              onClick={() => {
                setSubmitted(false);
                setFullName('');
                setEmail('');
                setPhone('');
                setPhotoUrl(null);
              }}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-6 rounded-2xl border border-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'ta' ? 'புதிய அட்டை உருவாக்க' : 'Create Another Card'}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
