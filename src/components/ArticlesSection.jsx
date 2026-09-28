import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Bookmark, 
  Share2, 
  FileText,
  Sparkles
} from 'lucide-react';
import { ARTICLES } from '../data/reflectionData';

export default function ArticlesSection({ onToggleSave, savedArticleIds = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="stories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] tracking-widest uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Scholarly Journalism & Long Reads</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-serif">
            Reflection Stories
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            In-depth archival essays, declassified document analyses, and civilizational explainers.
          </p>
        </div>

        <span className="text-[11px] text-stone-500 font-mono mt-3 md:mt-0 shrink-0">
          Peer-Reviewed by Archival Researchers
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {ARTICLES.map((art) => {
          const isSaved = savedArticleIds.includes(art.id);

          return (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group rounded-3xl overflow-hidden glass-card cursor-pointer flex flex-col justify-between hover:scale-[1.01] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                  <img
                    src={art.image}
                    alt={art.title}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1000&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Read time badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-stone-300 text-[10px] font-mono border border-white/10 flex items-center gap-1 backdrop-blur-md">
                    <Clock className="w-2.5 h-2.5 text-amber-400" />
                    <span>{art.readTime}</span>
                  </div>

                  {/* Source count badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-medium border border-emerald-500/30 flex items-center gap-1 backdrop-blur-md">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{art.verifiedSourcesCount} Sources</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2.5">
                    <span className="text-amber-400 uppercase font-mono text-[10px] tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-stone-500 font-mono text-[10px]">{art.date}</span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-white group-hover:text-amber-200 transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-stone-400 mt-2.5 line-clamp-3 leading-relaxed font-light">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs text-stone-400 border-t border-white/[0.06] mt-4">
                <span className="text-[11px] text-stone-500 font-light">{art.author}</span>
                <span className="text-white text-xs font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  Read Essay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0c0d10] border border-amber-500/30 shadow-2xl overflow-hidden my-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
                Reflection Editorial Archive
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSave(selectedArticle)}
                  className="p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-amber-400 border border-stone-800"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-stone-100 border border-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10 max-h-[75vh] overflow-y-auto space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-orange-400">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-stone-100 leading-snug">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-stone-400 pt-1">
                  <span>By {selectedArticle.author}</span>
                  <span>•</span>
                  <span>Published {selectedArticle.date}</span>
                </div>
              </div>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Formatted Article Content */}
              <div className="text-sm text-stone-200 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {selectedArticle.content}
              </div>

              {/* Citation Footer */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3 mt-8">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Verified by Reflection Fact-Check Desk
                  </h4>
                  <p className="text-xs text-stone-300 mt-1">
                    This article cites {selectedArticle.verifiedSourcesCount} archival records, gazettes, and academic papers preserved permanently on the Reflection platform.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
