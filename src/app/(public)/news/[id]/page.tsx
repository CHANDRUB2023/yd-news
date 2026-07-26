'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Calendar, Eye, ArrowLeft, Share2, MessageSquare, 
  ThumbsUp, Send, CheckCircle2, Newspaper 
} from 'lucide-react';

interface NewsItem {
  id: string;
  category: string;
  titleEn: string;
  summaryEn: string;
  contentEn: string;
  titleTa: string;
  summaryTa: string;
  contentTa: string;
  imageUrl?: string;
  videoUrl?: string;
  date: string;
  views?: number;
}

interface CommentItem {
  id: string;
  authorName: string;
  text: string;
  date: string;
  approved: boolean;
}

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id as string;
  const { language, t } = useLanguage();

  const [article, setArticle] = useState<NewsItem | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Comment submission form
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);
        const res = await fetch(`/api/news/${newsId}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data.article || data);
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error('Error loading article:', err);
      } finally {
        setLoading(false);
      }
    }
    if (newsId) fetchArticle();
  }, [newsId]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newsId, authorName, text: commentText })
      });
      if (res.ok) {
        setSubmitted(true);
        setAuthorName('');
        setCommentText('');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-t-[#C8102E] border-[#0E6233] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-bold text-xs">Loading news article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <Newspaper className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-xl font-black text-slate-800">
          {language === 'ta' ? 'செய்தி பெறப்படவில்லை' : 'Article Not Found'}
        </h2>
        <Link href="/news" className="inline-flex items-center gap-1 bg-[#C8102E] text-white text-xs font-bold px-4 py-2 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> {t('backToHome')}
        </Link>
      </div>
    );
  }

  const title = language === 'ta' ? article.titleTa : article.titleEn;
  const summary = language === 'ta' ? article.summaryTa : article.summaryEn;
  const content = language === 'ta' ? article.contentTa : article.contentEn;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 font-sans">
      
      {/* Back Button */}
      <Link 
        href="/news"
        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-600 hover:text-[#C8102E] bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === 'ta' ? 'செய்திகள் பட்டியலுக்கு திரும்பு' : 'Back to All News'}</span>
      </Link>

      {/* Article Container */}
      <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-10 space-y-6">
        
        {/* Category & Meta */}
        <div className="space-y-3">
          <span className="inline-block bg-[#0E6233] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-xs font-bold pt-1 border-b border-slate-100 pb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#0E6233]" />
              {new Date(article.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-[#C8102E]" />
              {article.views || 0} {t('sec.views')}
            </span>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(language === 'ta' ? 'இணைப்பு நகலெடுக்கப்பட்டது!' : 'Link copied to clipboard!');
                }
              }}
              className="ml-auto flex items-center gap-1 text-[#C8102E] hover:underline"
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'ta' ? 'பகிர்' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {article.imageUrl && (
          <div className="relative w-full h-[320px] md:h-[450px] bg-slate-100 rounded-2xl overflow-hidden shadow">
            <img 
              src={article.imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Summary Lead Box */}
        <div className="p-4 bg-red-50/70 border-l-4 border-[#C8102E] rounded-r-2xl font-bold text-slate-800 text-sm leading-relaxed">
          {summary}
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-slate-800 text-sm md:text-base leading-relaxed space-y-4 font-medium">
          {content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

      </article>

      {/* COMMENTS SECTION */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <MessageSquare className="w-5 h-5 text-[#C8102E]" />
          <span>{language === 'ta' ? 'கருத்துகள்' : 'Reader Comments'}</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
            {comments.filter(c => c.approved).length}
          </span>
        </h3>

        {/* List of approved comments */}
        <div className="space-y-4">
          {comments.filter(c => c.approved).length > 0 ? (
            comments.filter(c => c.approved).map(c => (
              <div key={c.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>{c.authorName}</span>
                  <span className="text-slate-400 font-normal">{new Date(c.date).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{c.text}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">
              {language === 'ta' ? 'முதல் கருத்தை நீங்கள் பதிவிடுங்கள்!' : 'Be the first to share a comment on this article.'}
            </p>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h4 className="text-sm font-extrabold text-slate-900">
            {language === 'ta' ? 'உங்கள் கருத்தை பதிவிடவும்' : 'Leave a Reply'}
          </h4>

          {submitted ? (
            <div className="p-4 bg-emerald-50 text-[#0E6233] border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>
                {language === 'ta' 
                  ? 'உங்கள் கருத்து சமர்ப்பிக்கப்பட்டது! நிர்வாகியின் ஒப்புதலுக்குப் பின் வெளியிடப்படும்.'
                  : 'Thank you! Your comment has been submitted and is pending administrator review.'}
              </span>
            </div>
          ) : (
            <form onSubmit={handlePostComment} className="space-y-3 text-xs font-bold">
              <div className="space-y-1">
                <label className="block text-slate-700">{t('contact.formName')}</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">{language === 'ta' ? 'உங்கள் கருத்து' : 'Your Comment'}</label>
                <textarea
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your thoughts..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#C8102E] hover:bg-[#990B22] text-white font-extrabold px-5 py-2.5 rounded-xl shadow flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{t('submit')}</span>
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}
