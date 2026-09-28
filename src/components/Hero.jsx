import React from 'react';
import { Play, Compass, ChevronDown, ArrowRight, Sparkles, ShieldCheck, Film, Award, Radio } from 'lucide-react';

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

        {/* 3D Holographic Cinema Showcase Deck */}
        <div className="relative pt-6 sm:pt-10 w-full max-w-4xl mx-auto">
          
          {/* Rotating Astrolabe / Celestial Coordinates HUD in Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full border border-amber-400/10 pointer-events-none animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono text-amber-400/40">000° NORTH</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[9px] font-mono text-amber-400/40">180° SOUTH</div>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono text-amber-400/40 -rotate-90">270° WEST</div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-[9px] font-mono text-amber-400/40 rotate-90">090° EAST</div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[390px] h-[260px] sm:h-[390px] rounded-full border border-dashed border-orange-500/15 pointer-events-none animate-spin-reverse" />

          {/* 3D Perspective Stage Container */}
          <div 
            className="relative z-10"
            style={{ perspective: '1200px' }}
          >
            {/* Floating Left Preview Shard */}
            <div 
              onClick={onWatchLatest}
              className="hidden md:block absolute -left-12 top-10 w-64 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-stone-900/60 backdrop-blur-md shadow-2xl opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer pointer-events-auto"
              style={{
                transform: 'rotateY(18deg) rotateZ(-3deg) translateZ(-60px)',
                transformStyle: 'preserve-3d'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80" 
                alt="Archival study" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest">Archive 02</span>
                <h4 className="text-xs font-semibold text-stone-200 line-clamp-1">Telangana: Armed Rebellion</h4>
              </div>
            </div>

            {/* Centerpiece 3D Glass Master Card */}
            <div 
              onClick={onWatchLatest}
              className="relative mx-auto w-full max-w-2xl rounded-3xl overflow-hidden glass-card border border-amber-400/35 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.2)] group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-amber-400/70"
            >
              {/* Specular Glare Shimmer Beam */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer" />

              {/* Cybernetic HUD Frame Brackets */}
              <div className="absolute top-3 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-amber-300 bg-stone-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/25">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>MASTER 4K HDR // DECLASSIFIED ARCHIVE</span>
              </div>

              <div className="absolute top-3 right-4 z-20 hidden sm:flex items-center gap-2 text-[10px] font-mono text-stone-300 bg-stone-950/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                <Radio className="w-3 h-3 text-orange-400 animate-pulse" />
                <span>PRIMARY EVIDENCE CITATIONS: 100%</span>
              </div>

              {/* Video Preview Visual */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-stone-950">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80" 
                  alt="Featured Documentary"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-95" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Center Glowing Play Button with Shockwave Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="absolute inset-0 w-16 h-16 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 text-stone-950 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.6)] group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                    <Play className="w-6 sm:w-8 h-6 sm:h-8 fill-current ml-1" />
                  </div>
                </div>

                {/* Bottom Audio Visualizer & Metadata */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase">Featured Investigation</span>
                      <span className="text-stone-400 text-xs font-mono">48:12</span>
                    </div>
                    <h3 className="font-cinzel text-base sm:text-xl font-bold text-stone-100 group-hover:text-amber-200 transition-colors">
                      The Great Partition of 1947: The Radcliffe Line
                    </h3>
                  </div>

                  {/* Equalizer Waveform Bars */}
                  <div className="hidden sm:flex items-end gap-1 h-6 px-2.5 py-1 rounded-lg bg-stone-950/60 backdrop-blur-md border border-white/10">
                    <span className="w-1 bg-amber-400 rounded-full animate-wave-1" />
                    <span className="w-1 bg-orange-400 rounded-full animate-wave-2" />
                    <span className="w-1 bg-amber-300 rounded-full animate-wave-3" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-wave-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Right Preview Shard */}
            <div 
              onClick={onWatchLatest}
              className="hidden md:block absolute -right-12 top-10 w-64 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-stone-900/60 backdrop-blur-md shadow-2xl opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-500 cursor-pointer pointer-events-auto"
              style={{
                transform: 'rotateY(-18deg) rotateZ(3deg) translateZ(-60px)',
                transformStyle: 'preserve-3d'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80" 
                alt="Archival study" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-3 flex flex-col justify-end">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">Archive 03</span>
                <h4 className="text-xs font-semibold text-stone-200 line-clamp-1">Chola Maritime Empire</h4>
              </div>
            </div>
          </div>

          {/* Cyber Telemetry Readout Footing */}
          <div className="pt-3.5 flex flex-wrap items-center justify-between text-[10px] font-mono text-stone-400 px-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold">LAT/LONG</span>
              <span>20° 35' 38" N, 78° 57' 46" E</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-stone-300">GEO-DATUM: WGS-84</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                SATELLITE SYNC
              </span>
            </div>
          </div>

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
        <div className="pt-8 sm:pt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-stone-400 font-mono">
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
