import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Play, 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Database
} from 'lucide-react';

export default function ArchiveSearchModal({
  isOpen,
  onClose,
  videos = [],
  articles = [],
  shorts = [],
  onSelectVideo,
  onSelectArticle,
  onSelectShort
}) {
  const [query, setQuery] = useState('');

  const suggestedQueries = [
    'Partition',
    'Constitution',
    'Telangana',
    'Cholas',
    'Shivaji Maharaj',
    'Youth Economy',
    'Upanishads',
    'Radcliffe'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedVideos = q
    ? videos.filter(
        v =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some(t => t.toLowerCase().includes(q)) ||
          v.speaker?.toLowerCase().includes(q)
      )
    : [];

  const matchedArticles = q
    ? articles.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      )
    : [];

  const matchedShorts = q
    ? shorts.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.tags.some(t => t.toLowerCase().includes(q))
      )
    : [];

  // Extract cited primary sources matching query
  const matchedSources = [];
  if (q) {
    videos.forEach(v => {
      v.claimBreakdown?.forEach(c => {
        if (
          c.source.toLowerCase().includes(q) ||
          c.claim.toLowerCase().includes(q)
        ) {
          matchedSources.push({
            videoTitle: v.title,
            claim: c.claim,
            source: c.source,
            badge: c.badge
          });
        }
      });
    });
  }

  const totalResults = matchedVideos.length + matchedArticles.length + matchedShorts.length + matchedSources.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0d0e12] border border-amber-500/30 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-5 border-b border-stone-800 bg-stone-950/80">
          <Search className="w-6 h-6 text-amber-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search Reflection Knowledge Archive (e.g. Partition, Cholas, Constitution)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-stone-100 placeholder:text-stone-500 text-base sm:text-lg outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-200 mr-3 text-xs bg-stone-800 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Queries Chips */}
        <div className="px-6 py-3 bg-stone-950/40 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 shrink-0">Popular:</span>
          {suggestedQueries.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="px-2.5 py-1 rounded-lg text-xs bg-stone-900/80 hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/30 whitespace-nowrap transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
          {!query ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-stone-200">
                Reflection Universal Knowledge Index
              </h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                Type any civilizational event, state, declassified file, or thinker to search cross-referenced videos, articles, and citations.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <p className="text-sm">No archive items matched "{query}".</p>
              <p className="text-xs text-stone-500 mt-1">Try searching for keywords like "Constitution", "1947", "Chola", or "Hyderabad".</p>
            </div>
          ) : (
            <>
              {/* VIDEOS MATCHED */}
              {matchedVideos.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-amber-400" />
                      Documentaries & Videos ({matchedVideos.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedVideos.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => {
                          onSelectVideo(v);
                          onClose();
                        }}
                        className="p-3 rounded-xl glass-panel glass-panel-hover border border-stone-800 flex gap-3 cursor-pointer group"
                      >
                        <img src={v.thumbnail} alt={v.title} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-stone-100 group-hover:text-amber-300 truncate">
                            {v.title}
                          </h4>
                          <p className="text-[11px] text-stone-400 mt-0.5">{v.speaker}</p>
                          <span className="text-[10px] text-amber-500/80 font-mono">{v.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ARTICLES MATCHED */}
              {matchedArticles.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-stone-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    Editorial Stories ({matchedArticles.length})
                  </span>
                  <div className="space-y-2">
                    {matchedArticles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          onSelectArticle(a);
                          onClose();
                        }}
                        className="p-3 rounded-xl glass-panel glass-panel-hover border border-stone-800 flex items-center justify-between cursor-pointer group"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-stone-100 group-hover:text-amber-300">
                            {a.title}
                          </h4>
                          <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">{a.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SHORTS MATCHED */}
              {matchedShorts.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-stone-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" />
                    Shorts ({matchedShorts.length})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedShorts.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectShort(s);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl glass-panel glass-panel-hover border border-stone-800 flex items-center gap-3 cursor-pointer group"
                      >
                        <img src={s.videoPoster} alt={s.title} className="w-10 h-14 object-cover rounded-lg shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-stone-200 group-hover:text-amber-300 line-clamp-2">
                            {s.title}
                          </p>
                          <span className="text-[10px] text-stone-500">{s.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRIMARY SOURCES MATCHED */}
              {matchedSources.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-stone-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Primary Sources & Historical Records ({matchedSources.length})
                  </span>
                  <div className="space-y-2">
                    {matchedSources.map((src, i) => (
                      <div key={i} className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-amber-400 mb-1">
                          <span className="font-semibold">{src.videoTitle}</span>
                          <span className="bg-stone-800 px-2 py-0.5 rounded text-stone-300 font-mono">{src.badge}</span>
                        </div>
                        <p className="text-stone-300 font-medium italic">"{src.claim}"</p>
                        <p className="text-emerald-400/90 font-mono text-[11px] mt-1">Citation: {src.source}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
