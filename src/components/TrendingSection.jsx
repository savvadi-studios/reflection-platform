import React from 'react';
import { Flame, Play, Zap, ArrowRight, Eye, TrendingUp, Sparkles } from 'lucide-react';

export default function TrendingSection({ 
  videos, 
  shorts, 
  onSelectVideo, 
  onSelectShort 
}) {
  const trendingList = [
    {
      rank: '01',
      type: 'video',
      title: videos[0]?.title || 'The Great Partition of 1947',
      views: videos[0]?.views || '1.4M',
      meta: '48 min • Archival Investigation',
      badge: 'Trending #1',
      rankColor: 'text-amber-300 border-amber-400/40 bg-amber-500/10 shadow-amber-500/20',
      thumbnail: videos[0]?.thumbnail,
      raw: videos[0],
      handler: () => onSelectVideo(videos[0])
    },
    {
      rank: '02',
      type: 'short',
      title: shorts[2]?.title || 'Radcliffe drew India’s border using 30-year-old maps',
      views: shorts[2]?.views || '5.1M',
      meta: 'Short • 480k Likes',
      badge: 'Viral Revelation',
      rankColor: 'text-stone-200 border-white/20 bg-white/10 shadow-white/10',
      thumbnail: shorts[2]?.videoPoster,
      raw: shorts[2],
      handler: () => onSelectShort(shorts[2])
    },
    {
      rank: '03',
      type: 'video',
      title: videos[5]?.title || 'Shivaji Maharaj’s Guerrilla Strategy',
      views: videos[5]?.views || '2.1M',
      meta: '45 min • Military Study',
      badge: 'Strategic Doctrine',
      rankColor: 'text-orange-300 border-orange-400/30 bg-orange-500/10 shadow-orange-500/10',
      thumbnail: videos[5]?.thumbnail,
      raw: videos[5],
      handler: () => onSelectVideo(videos[5])
    },
    {
      rank: '04',
      type: 'video',
      title: videos[1]?.title || 'How the Indian Constitution Was Really Written',
      views: videos[1]?.views || '980K',
      meta: '54 min • Constitutional Study',
      badge: 'Assembly Debates',
      rankColor: 'text-stone-300 border-white/15 bg-white/5',
      thumbnail: videos[1]?.thumbnail,
      raw: videos[1],
      handler: () => onSelectVideo(videos[1])
    }
  ];

  return (
    <section id="trending" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-orange-400 font-semibold">
              Live Velocity Ranking
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
            Trending This Week
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-400 mt-2 sm:mt-0 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>Real-time Archival Streaming Stream</span>
        </div>
      </div>

      {/* Grid of 4 Cinematic Trend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trendingList.map((item) => (
          <div
            key={item.rank}
            onClick={item.handler}
            className="group rounded-3xl overflow-hidden glass-card cursor-pointer flex flex-col justify-between border border-white/[0.08] hover:border-amber-400/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.15)] hover:scale-[1.02] transition-all duration-300"
          >
            {/* Poster Showcase */}
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
              <img
                src={item.thumbnail}
                alt={item.title}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-black/40" />

              {/* Hover Play Icon Beacon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-amber-400/90 text-stone-950 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
              </div>

              {/* Rank Badge with Luxury Glow */}
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-xl backdrop-blur-md border text-xs font-mono font-black shadow-lg ${item.rankColor}`}>
                #{item.rank}
              </div>

              {/* Type Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-mono font-medium uppercase tracking-wider bg-black/75 text-stone-300 border border-white/[0.1] backdrop-blur-md">
                  {item.type === 'video' ? <Play className="w-2.5 h-2.5 fill-amber-400" /> : <Zap className="w-2.5 h-2.5 fill-amber-400" />}
                  <span>{item.type}</span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-5 space-y-2.5">
              <span className="text-[10px] font-mono text-amber-400/90 tracking-wider block">
                {item.meta}
              </span>
              <h3 className="font-semibold text-stone-100 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-white/[0.04] font-mono">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>{item.views}</span>
                </span>
                <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Stream <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
