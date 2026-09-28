import React, { useState } from 'react';
import { 
  Play, 
  Bookmark, 
  Clock, 
  Search,
  ShieldCheck,
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/reflectionData';

export default function VideoHub({ 
  videos, 
  onSelectVideo, 
  onToggleSave, 
  savedVideoIds = [] 
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter((vid) => {
    const matchesCategory = activeCategory === 'all' || vid.category === activeCategory;
    const matchesSearch = 
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      vid.speaker?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="videos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Sleek Minimalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
              Curated Archival Catalog
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight">
            Reflection Video Hub
          </h2>
        </div>

        {/* Minimal Search Bar */}
        <div className="mt-4 md:mt-0 relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search investigative topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/60 focus:bg-white/[0.07] rounded-full text-xs text-stone-100 placeholder:text-stone-500 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none touch-pan-x">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-400/60 font-semibold shadow-md shadow-amber-500/15 scale-105'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-stone-300 hover:text-white border border-white/[0.06]'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Clean Cinematic Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-16 text-center glass-card rounded-3xl border border-white/[0.08] space-y-3">
          <p className="text-stone-300 text-sm font-medium">No documentaries match your search criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="text-xs text-amber-400 hover:underline font-mono"
          >
            Clear filters & view all catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isSaved = savedVideoIds.includes(video.id);

            return (
              <div
                key={video.id}
                className="group rounded-3xl overflow-hidden glass-card cursor-pointer flex flex-col justify-between border border-white/[0.08] hover:border-amber-400/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.12)] hover:scale-[1.02] transition-all duration-300"
              >
                {/* 16:9 Thumbnail Poster with Hover Scrim & Play Button */}
                <div 
                  className="relative aspect-video overflow-hidden bg-stone-950"
                  onClick={() => onSelectVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-black/25 to-black/30" />

                  {/* Play Button Glow Ring */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-stone-200 border border-white/[0.08]">
                    {video.duration}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-[10px] font-mono font-medium uppercase text-amber-300 border border-white/[0.1]">
                    {video.category}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(video);
                    }}
                    title={isSaved ? "Saved to Bookmarks" : "Save to Bookmarks"}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition-all ${
                      isSaved
                        ? 'bg-amber-400 text-stone-950 border-amber-400 shadow-md'
                        : 'bg-black/60 text-stone-400 hover:text-white border-white/[0.08] hover:bg-black/80'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>{video.views} Views</span>
                    <span className="flex items-center gap-1 text-emerald-400/90 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{video.claimBreakdown?.length || 4} Verified Claims</span>
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectVideo(video)}
                    className="font-semibold text-stone-100 text-sm leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors"
                  >
                    {video.title}
                  </h3>

                  <p className="text-stone-400 text-xs font-light line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-stone-400">
                      @{video.speaker || 'Reflection Desk'}
                    </span>
                    <span 
                      onClick={() => onSelectVideo(video)}
                      className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1 font-mono text-[11px]"
                    >
                      Inspect Dossier <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
