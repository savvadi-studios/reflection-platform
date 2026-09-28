import React, { useState } from 'react';
import { 
  Play, 
  Bookmark, 
  Share2, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Filter,
  Eye,
  ShieldCheck,
  Search
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
    <section id="videos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Curated Intelligence & Documentaries</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-wide">
            Reflection Video Hub
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
            Not just embeds — every documentary is indexed with declassified primary sources, claim verification, and transcripts.
          </p>
        </div>

        {/* Local Search Input */}
        <div className="mt-4 md:mt-0 relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter library by topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-stone-900/90 border border-stone-800 focus:border-amber-500/50 rounded-xl text-xs text-stone-200 placeholder:text-stone-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none touch-pan-x">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-stone-950 font-bold shadow-lg shadow-orange-950/40 scale-[1.02]'
                : 'bg-stone-900/70 hover:bg-stone-800/80 text-stone-300 border border-stone-800/80 hover:border-amber-500/30'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-16 text-center glass-panel rounded-2xl border border-stone-800">
          <p className="text-stone-400 text-sm">No videos match this filter query. Try selecting another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredVideos.map((video) => {
            const isSaved = savedVideoIds.includes(video.id);

            return (
              <div
                key={video.id}
                className="group rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-stone-800/90 flex flex-col justify-between"
              >
                {/* Thumbnail Container */}
                <div 
                  className="relative aspect-video overflow-hidden cursor-pointer bg-stone-950"
                  onClick={() => onSelectVideo(video)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-stone-950 flex items-center justify-center shadow-2xl shadow-orange-600/50 scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-950/90 text-stone-200 text-[10px] font-mono tracking-wide border border-stone-800 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-amber-400" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Source Verified Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-stone-950/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{video.rating}</span>
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(video);
                    }}
                    className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg border backdrop-blur-md transition-all ${
                      isSaved 
                        ? 'bg-amber-500 text-stone-950 border-amber-400' 
                        : 'bg-stone-950/80 text-stone-300 border-stone-800 hover:text-amber-400 hover:border-amber-500/40'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save for later'}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Speaker & Category */}
                    <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
                      <span className="text-amber-400/90 font-semibold uppercase tracking-wider">
                        {video.speaker}
                      </span>
                      <span>{video.date}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectVideo(video)}
                      className="font-bold text-stone-100 text-base leading-snug line-clamp-2 hover:text-amber-300 cursor-pointer transition-colors"
                    >
                      {video.title}
                    </h3>

                    {/* Description preview */}
                    <p className="text-xs text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-5 pt-3.5 border-t border-stone-800/80 flex items-center justify-between text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {video.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-900 text-stone-400 border border-stone-800">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectVideo(video)}
                      className="text-amber-400 hover:text-amber-300 font-semibold text-xs flex items-center gap-1 group/btn"
                    >
                      <span>Explore</span>
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                    </button>
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
