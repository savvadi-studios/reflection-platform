import React, { useState } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  ExternalLink, 
  Clock, 
  FileText, 
  Volume2, 
  Sparkles,
  Radio
} from 'lucide-react';
import { PODCASTS } from '../data/reflectionData';

export default function PodcastsSection() {
  const [activeEpisode, setActiveEpisode] = useState(PODCASTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const togglePlay = (ep) => {
    if (activeEpisode.id === ep.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveEpisode(ep);
      setIsPlaying(true);
    }
  };

  return (
    <section id="podcasts" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] tracking-widest uppercase mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>Long-form Intellectual Discourses</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-serif">
            Reflection Podcasts
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            Uncut 90-minute dialogues with economists, historians, defense strategists, and civilizational thinkers.
          </p>
        </div>

        <span className="text-[11px] text-stone-500 font-mono mt-3 md:mt-0 shrink-0">
          Available on Spotify • Apple Podcasts • YouTube
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Featured Audio Player Player Deck (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-card p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 group bg-stone-950">
            <img
              src={activeEpisode.cover}
              alt={activeEpisode.title}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Play Button Overlay */}
            <button
              onClick={() => togglePlay(activeEpisode)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            {/* Episode Number Tag */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 text-white text-[11px] font-mono border border-white/10 backdrop-blur-md">
              {activeEpisode.episodeNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1.5">
              {activeEpisode.category}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
              {activeEpisode.title}
            </h3>
            <p className="text-xs text-stone-400 mt-1 font-light">
              Dialogue with: <span className="text-white font-medium">{activeEpisode.guest}</span>
            </p>

            {/* Sound Wave Animation Visualizer */}
            <div className="flex items-center gap-1 py-4 my-2">
              {[35, 70, 25, 85, 55, 95, 40, 75, 45, 90, 30, 65, 80, 35].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full bg-amber-400/80 transition-all duration-300 ${
                    isPlaying ? 'opacity-90 animate-pulse' : 'opacity-20'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(10, (h * Math.random()).toFixed(0))}px` : '4px',
                    transitionDelay: `${i * 30}ms`
                  }}
                />
              ))}
            </div>

            {/* Transcript Snippet */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-xs text-stone-300 italic leading-relaxed font-light">
              "{activeEpisode.transcriptSnippet}"
            </div>

            {/* Platforms Bar */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
              <span className="text-[11px] text-stone-500 font-mono">
                {activeEpisode.duration}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={activeEpisode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
                <a
                  href={activeEpisode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Episodes List (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[11px] uppercase font-mono tracking-widest text-stone-500 block mb-3">
            Archived Episodes ({PODCASTS.length})
          </span>

          {PODCASTS.map((ep) => {
            const isCurrent = activeEpisode.id === ep.id;
            return (
              <div
                key={ep.id}
                onClick={() => setActiveEpisode(ep)}
                className={`p-5 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'glass-card border-white/20 bg-white/[0.06]'
                    : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.05]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-white">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(ep);
                      }}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      {isCurrent && isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-amber-400">
                        {ep.episodeNumber}
                      </span>
                      <span className="text-[11px] text-stone-500">• {ep.date}</span>
                    </div>

                    <h4 className="font-serif text-white text-sm sm:text-base font-normal leading-snug">
                      {ep.title}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 font-light">
                      Guest: <span className="text-stone-300">{ep.guest}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {ep.topics.map(t => (
                        <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.04] text-stone-400 border border-white/[0.06]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[11px] font-mono text-stone-500 block">
                    {ep.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
