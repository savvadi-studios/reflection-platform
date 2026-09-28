import React from 'react';
import { Play, Compass, ChevronDown, ArrowRight, Sparkles, ShieldCheck, Film, Award } from 'lucide-react';

export default function Hero({ onWatchLatest, onExploreArchive, onScrollTrending, settings = {} }) {
  const heroTagline = settings.heroTagline || 'See Beyond the Surface.';
  const heroDescription = settings.heroDescription || 'Indian history, civilizational roots, constitutional thought, and fearless discourse — indexed with declassified primary sources and archival transparency.';
  const tickerText = settings.announcementTicker || '1,200+ Documented Hours • 100% Primary Archives Cited • 28 States & UTs Covered • 4.5M+ Intellectual Thinkers';
  const tickerItems = tickerText.split('•').map(t => t.trim());

  return (
    <div id="hero" className="relative min-h-[94vh] flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-4">
      
      {/* Central Radiant Sunburst Flare */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-gradient-to-b from-amber-500/25 via-orange-600/15 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Decorative Cinematic Lens Flare Line */}
      <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Shimmering Studio Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold shadow-lg shadow-amber-500/10 backdrop-blur-md hover:border-amber-400/60 transition-colors">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 animate-ping" />
          <span className="font-mono">Independent Investigative Archive</span>
        </div>

        {/* Grand Headline: Single Line Cinema Title */}
        <div className="space-y-3 relative">
          <h1 
            style={{ fontSize: 'clamp(2.5rem, 8.8vw, 7.2rem)' }}
            className="font-cinzel font-black tracking-[0.1em] sm:tracking-[0.18em] uppercase text-stone-100 select-none leading-none whitespace-nowrap drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
          >
            REFLECT<span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent">ION</span>
          </h1>

          {/* Subtitle / Tagline */}
          <p className="font-cinzel text-lg sm:text-2xl md:text-3xl font-semibold tracking-[0.22em] uppercase text-amber-200/90 italic drop-shadow-md">
            {heroTagline}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed">
          {heroDescription}
        </p>

        {/* Luxury Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 pt-3">
          
          {/* Primary Glow Button */}
          <button
            onClick={onWatchLatest}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <div className="w-6 h-6 rounded-full bg-stone-950/20 flex items-center justify-center">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            <span>Watch Latest Documentary</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Glass Vault Button */}
          <button
            onClick={onExploreArchive}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.09] text-stone-200 hover:text-amber-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 border border-white/[0.1] hover:border-amber-400/50 shadow-lg backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            <span>Explore Knowledge Vault</span>
          </button>
        </div>

        {/* Floating Feature Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
          <div className="px-3.5 py-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md flex items-center gap-2 text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px]">Declassified Government Records</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md flex items-center gap-2 text-stone-300">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">Cinematic 4K Archival Footage</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md flex items-center gap-2 text-stone-300">
            <Award className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-mono text-[11px]">Independent & Uncompromised</span>
          </div>
        </div>

        {/* Refined Minimalist Ticker Line */}
        <div className="pt-8 sm:pt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-stone-400 font-mono">
          {tickerItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className={idx % 2 === 1 ? 'text-amber-300 font-medium' : 'text-stone-400'}>
                {item}
              </span>
              {idx < tickerItems.length - 1 && <span className="opacity-25 text-amber-500">•</span>}
            </React.Fragment>
          ))}
        </div>

      </div>

      {/* Interactive Scroll Down Indicator */}
      <div 
        onClick={onScrollTrending}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-stone-400 hover:text-amber-400 cursor-pointer group transition-colors z-20"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

    </div>
  );
}
