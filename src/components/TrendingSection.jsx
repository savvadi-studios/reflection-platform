import React from 'react';
import { Flame, Play, BookOpen, Zap, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';

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
    <section id="trending" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-orange-500 font-semibold text-xs uppercase tracking-widest mb-1.5">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>High Engagement Velocity</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-wide">
            Trending on Reflection
          </h2>
        </div>
        <p className="text-stone-400 text-xs sm:text-sm mt-2 md:mt-0 max-w-md text-left md:text-right">
          Ranked dynamically across documentaries, scholarly stories, and archival dispatches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingList.map((item) => (
          <div
            key={item.rank}
            onClick={item.handler}
            className="group relative rounded-2xl overflow-hidden glass-panel glass-panel-hover border border-stone-800/80 cursor-pointer flex flex-col justify-between"
          >
            {/* Thumbnail Header with Rank */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-black/40" />

              {/* Huge Cinematic Rank Overlay */}
              <span className="absolute top-2 left-3 font-cinzel text-5xl font-black text-white/30 drop-shadow-md select-none group-hover:text-amber-400/60 transition-colors">
                {item.rank}
              </span>

              {/* Type Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  {item.type === 'video' && <Play className="w-3 h-3 fill-amber-400" />}
                  {item.type === 'short' && <Zap className="w-3 h-3 fill-amber-400" />}
                  {item.type === 'article' && <BookOpen className="w-3 h-3 text-amber-400" />}
                  <span>{item.type}</span>
                </span>
              </div>

              {/* Engagement Stat */}
              <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[11px] text-stone-300 bg-stone-950/80 px-2 py-0.5 rounded-md border border-stone-800">
                <Eye className="w-3 h-3 text-amber-400" />
                <span>{item.views}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-semibold text-amber-400/90 uppercase tracking-widest">
                  {item.badge}
                </span>
                <h3 className="font-sans font-bold text-stone-100 text-sm mt-1 leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>{item.meta}</span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
