import React, { useState } from 'react';
import { 
  Play, 
  Bookmark, 
  Clock, 
  Search,
  ShieldCheck
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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-white/[0.06]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 block mb-1">
            Archival Documentaries
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100">
            Reflection Video Hub
          </h2>
        </div>

        {/* Minimal Search Bar */}
        <div className="mt-4 md:mt-0 relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topic or speaker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white/[0.04] border border-white/[0.08] focus:border-amber-500/50 rounded-full text-xs text-stone-200 placeholder:text-stone-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none touch-pan-x">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-stone-400 hover:text-stone-200 border border-white/[0.05]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Clean Cinematic Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-12 text-center glass-card rounded-2xl">
          <p className="text-stone-400 text-sm">No videos match your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => {
            const isSaved = savedVideoIds.includes(video.id);

            return (
              <div
                key={video.id}
                className="group rounded-2xl overflow-hidden glass-card cursor-pointer flex flex-col justify-between"
              >
                {/* 16:9 Thumbnail Poster */}
                <div 
                  className="relative aspect-video overflow-hidden bg-stone-950"
                  onClick={() => onSelectVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-black/30" />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-orange-600 text-stone-950 flex items-center justify-center shadow-xl shadow-orange-600/40 scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-stone-300 text-[10px] font-mono border border-white/[0.08]">
                    {video.duration}
                  </div>

                  {/* Save Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(video);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                      isSaved 
                        ? 'bg-amber-500 text-stone-950 border-amber-400' 
                        : 'bg-black/60 text-stone-300 border-white/[0.08] hover:text-amber-400'
                    }`}
                    title={isSaved ? 'Saved' : 'Save'}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Card Meta */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="text-amber-400/90 font-medium truncate">
                      {video.speaker}
                    </span>
                    <span className="shrink-0">{video.date}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectVideo(video)}
                    className="font-bold text-stone-100 text-sm leading-snug line-clamp-2 hover:text-amber-300 transition-colors"
                  >
                    {video.title}
                  </h3>

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-white/[0.05]">
                    <span className="text-[10px] font-mono text-emerald-400/90 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {video.rating}
                    </span>
                    <span 
                      onClick={() => onSelectVideo(video)}
                      className="text-amber-400/80 font-medium hover:text-amber-300 flex items-center gap-0.5"
                    >
                      Watch →
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
