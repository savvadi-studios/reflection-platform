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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-widest mb-1.5">
            <Radio className="w-4 h-4 text-amber-400" />
            <span>Long-form Intellectual Discourses</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-wide">
            Reflection Podcasts
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
            Uncut 90-minute dialogues with economists, historians, defense strategists, and civilizational thinkers.
          </p>
        </div>

        <span className="text-xs text-amber-400 font-mono mt-2 md:mt-0">
          Available on Spotify, Apple & YouTube
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Featured Audio Player Player Deck (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-5 sm:p-8 border border-amber-500/25 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 group bg-stone-950">
            <img
              src={activeEpisode.cover}
              alt={activeEpisode.title}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80'; }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Play Button Overlay */}
            <button
              onClick={() => togglePlay(activeEpisode)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-stone-950 flex items-center justify-center shadow-2xl shadow-orange-600/60 hover:scale-110 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </button>

            {/* Episode Number Tag */}
            <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/80 text-amber-400 text-xs font-mono font-bold border border-stone-800 backdrop-blur-md">
              {activeEpisode.episodeNumber}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest block mb-1">
              Now Streaming: {activeEpisode.category}
            </span>
            <h3 className="font-cinzel text-xl font-bold text-stone-100 leading-snug">
              {activeEpisode.title}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              With: <span className="text-amber-200 font-medium">{activeEpisode.guest}</span>
            </p>

            {/* Sound Wave Animation Visualizer */}
            <div className="flex items-center gap-1.5 py-4 my-2">
              {[40, 75, 30, 90, 60, 100, 45, 80, 50, 95, 35, 70, 85, 40].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full bg-amber-500 transition-all duration-300 ${
                    isPlaying ? 'opacity-90 animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(12, (h * Math.random()).toFixed(0))}px` : '6px',
                    transitionDelay: `${i * 40}ms`
                  }}
                />
              ))}
            </div>

            {/* Transcript Snippet */}
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 italic leading-relaxed">
              {activeEpisode.transcriptSnippet}
            </div>

            {/* Platforms Bar */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-800">
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">
                {activeEpisode.duration}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={activeEpisode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-400 hover:text-red-400 flex items-center gap-1"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={activeEpisode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-400 hover:text-emerald-400 flex items-center gap-1"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Episodes List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-stone-400 block mb-2">
            Archived Dialogues ({PODCASTS.length} Episodes)
          </span>

          {PODCASTS.map((ep) => {
            const isCurrent = activeEpisode.id === ep.id;
            return (
              <div
                key={ep.id}
                onClick={() => setActiveEpisode(ep)}
                className={`p-5 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'glass-panel border-amber-500/50 bg-amber-500/10'
                    : 'bg-stone-900/60 hover:bg-stone-900/90 border-stone-800/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(ep);
                      }}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      {isCurrent && isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {ep.episodeNumber}
                      </span>
                      <span className="text-[10px] text-stone-500">• {ep.date}</span>
                    </div>

                    <h4 className="font-bold text-stone-100 text-sm leading-snug">
                      {ep.title}
                    </h4>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Guest: <span className="text-stone-300">{ep.guest}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {ep.topics.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-xs font-mono text-stone-400 block">
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
