import React from 'react';
import { Flame, Play, BookOpen, Zap, ArrowRight, Eye } from 'lucide-react';

export default function TrendingSection({ 
  videos, 
  articles, 
  shorts, 
  onSelectVideo, 
  onSelectArticle, 
  onSelectShort 
}) {
  const trendingList = [
    {
      rank: '01',
      type: 'video',
      title: videos[0]?.title || 'The Great Partition of 1947',
      views: videos[0]?.views || '1.4M',
      meta: '48 min • Documentary',
      badge: 'Archival Investigation',
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
      badge: 'Viral Insight',
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
      badge: 'Strategic Analysis',
      thumbnail: videos[5]?.thumbnail,
      raw: videos[5],
      handler: () => onSelectVideo(videos[5])
    },
    {
      rank: '04',
      type: 'article',
      title: articles[0]?.title || 'The Myth of the Lazy Native',
      views: '420K Reads',
      meta: '9 min read • Research Desk',
      badge: 'Sociological Paper',
      thumbnail: articles[0]?.image,
      raw: articles[0],
      handler: () => onSelectArticle(articles[0])
    }
  ];

  return (
    <section id="trending" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Sleek Minimalist Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-white/[0.06]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-orange-400 block mb-1">
            Real-time Telemetry
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100">
            Trending This Week
          </h2>
        </div>
        <span className="text-xs text-stone-400 mt-2 sm:mt-0 font-normal">
          Ranked by verified archival view velocity
        </span>
      </div>

      {/* Grid of 4 Minimalist Cinematic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {trendingList.map((item) => (
          <div
            key={item.rank}
            onClick={item.handler}
            className="group rounded-2xl overflow-hidden glass-card cursor-pointer flex flex-col justify-between"
          >
            {/* Poster */}
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
              <img
                src={item.thumbnail}
                alt={item.title}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-black/30" />

              {/* Minimal Rank Pill */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/[0.08] text-xs font-mono font-bold text-amber-300">
                #{item.rank}
              </div>

              {/* Type Badge */}
              <div className="absolute top-2.5 right-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-black/70 text-stone-300 border border-white/[0.08] backdrop-blur-md">
                  {item.type === 'video' && <Play className="w-2.5 h-2.5 fill-amber-400" />}
                  {item.type === 'short' && <Zap className="w-2.5 h-2.5 fill-amber-400" />}
                  {item.type === 'article' && <BookOpen className="w-2.5 h-2.5 text-amber-400" />}
                  <span>{item.type}</span>
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-stone-100 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span>{item.views}</span>
                <span className="text-amber-400/80 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
