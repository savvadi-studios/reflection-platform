import React, { useEffect, useRef } from 'react';
import { Play, Flame, Compass, Sparkles, Shield, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Hero({ onWatchLatest, onExploreArchive, onScrollTrending }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle embers and light dust
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? 'rgba(245, 158, 11, ' : 'rgba(234, 88, 12, '
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#F97316';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 bg-[#08080a]">
      {/* Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-70" />

      {/* Cinematic Ambient Light Rays & Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-b from-orange-600/25 via-amber-600/15 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -top-32 left-1/4 w-[400px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-orange-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Indian Geometric Mandala Motif in Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none">
        <svg className="w-[850px] h-[850px] animate-spin" style={{ animationDuration: '180s' }} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="#F59E0B" strokeWidth="1" />
          <polygon points="100,10 190,150 10,150" fill="none" stroke="#F59E0B" strokeWidth="1" />
          <polygon points="100,190 10,50 190,50" fill="none" stroke="#F59E0B" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-[0.25em] font-semibold mb-8 shadow-lg shadow-orange-950/30 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Digital Media Platform • Knowledge Archive • Community</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-cinzel text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.08em] uppercase text-stone-100 drop-shadow-2xl select-none leading-none">
          REFLECT<span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">ION</span>
        </h1>

        {/* Core Subtitle */}
        <div className="mt-4 mb-3">
          <p className="font-cinzel text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.16em] uppercase text-amber-200/90 italic">
            "See Beyond the Surface."
          </p>
        </div>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto text-stone-300/80 text-sm sm:text-base font-normal leading-relaxed mt-4 mb-10">
          Uncovering Indian history, civilizational roots, constitutional thought, and fearless discourse. 
          Every claim cataloged with verified primary sources, declassified files, and transparent methodology.
        </p>

        {/* 3 Core Hero Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Watch Latest */}
          <button
            onClick={onWatchLatest}
            className="group relative px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-sm uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-orange-700/30 hover:scale-[1.03] transition-all duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center group-hover:bg-stone-900 transition-colors">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>Watch Latest Release</span>
          </button>

          {/* Trending */}
          <button
            onClick={onScrollTrending}
            className="px-6 py-4 rounded-2xl bg-stone-900/90 hover:bg-stone-800/90 text-stone-200 hover:text-amber-300 font-semibold text-sm uppercase tracking-wider flex items-center gap-2.5 border border-stone-800 hover:border-amber-500/40 shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Trending This Week</span>
          </button>

          {/* Explore Archive */}
          <button
            onClick={onExploreArchive}
            className="px-6 py-4 rounded-2xl bg-amber-950/20 hover:bg-amber-950/40 text-amber-300 font-semibold text-sm uppercase tracking-wider flex items-center gap-2.5 border border-amber-600/30 hover:border-amber-500/60 shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Explore Knowledge Archive</span>
          </button>
        </div>

        {/* Platform Stat Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-stone-800/60">
          <div className="p-4 rounded-2xl glass-panel text-center">
            <span className="block font-cinzel text-2xl font-bold text-amber-300">1,200+</span>
            <span className="text-[11px] uppercase tracking-wider text-stone-400">Documented Hours</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="font-cinzel text-2xl font-bold text-amber-400">100%</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[11px] uppercase tracking-wider text-stone-400">Primary Sources Cited</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <span className="block font-cinzel text-2xl font-bold text-amber-300">28</span>
            <span className="text-[11px] uppercase tracking-wider text-stone-400">States & UTs Covered</span>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <span className="block font-cinzel text-2xl font-bold text-amber-400">4.5M+</span>
            <span className="text-[11px] uppercase tracking-wider text-stone-400">Intellectual Thinkers</span>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-500 hover:text-amber-400 cursor-pointer animate-bounce z-20">
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}
