import React, { useEffect, useRef } from 'react';
import { Play, Compass, ChevronDown, ArrowRight } from 'lucide-react';

export default function Hero({ onWatchLatest, onExploreArchive, onScrollTrending, settings = {} }) {
  const canvasRef = useRef(null);
  
  const heroTagline = settings.heroTagline || 'See Beyond the Surface.';
  const heroDescription = settings.heroDescription || 'Indian history, civilizational roots, constitutional thought, and fearless discourse — indexed with declassified primary sources and archival transparency.';
  const tickerText = settings.announcementTicker || '1,200+ Documented Hours • 100% Primary Archives Cited • 28 States & UTs Covered • 4.5M+ Intellectual Thinkers';
  const tickerItems = tickerText.split('•').map(t => t.trim());

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

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.15,
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? 'rgba(245, 158, 11, ' : 'rgba(234, 88, 12, '
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
        ctx.shadowBlur = 8;
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
    <div id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-28 pb-16 px-4">
      {/* Subtle Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 opacity-60" />

      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-orange-600/20 via-amber-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-amber-300 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span>Knowledge Archive • Digital Platform</span>
        </div>

        {/* Grand Headline: Guaranteed Single Line */}
        <div className="space-y-2">
          <h1 
            style={{ fontSize: 'clamp(2.4rem, 8.5vw, 6.8rem)' }}
            className="font-cinzel font-black tracking-[0.08em] sm:tracking-[0.16em] uppercase text-stone-100 select-none leading-none whitespace-nowrap drop-shadow-2xl"
          >
            REFLECT<span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">ION</span>
          </h1>

          <p className="font-cinzel text-base sm:text-xl md:text-2xl font-semibold tracking-[0.2em] uppercase text-amber-200/80 italic">
            {heroTagline}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="max-w-xl mx-auto text-stone-400 text-xs sm:text-sm md:text-base font-normal leading-relaxed">
          {heroDescription}
        </p>

        {/* Clean, High-End Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          <button
            onClick={onWatchLatest}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-orange-950/40 hover:scale-105 transition-all duration-300"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            <span>Watch Latest Release</span>
          </button>

          <button
            onClick={onExploreArchive}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-stone-200 hover:text-amber-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Explore Knowledge Vault</span>
          </button>
        </div>

        {/* Refined Minimalist Ticker Line */}
        <div className="pt-12 sm:pt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-stone-500 font-mono">
          {tickerItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className={idx % 2 === 1 ? 'text-stone-300' : 'text-stone-500'}>{item}</span>
              {idx < tickerItems.length - 1 && <span className="opacity-30">•</span>}
            </React.Fragment>
          ))}
        </div>

      </div>

      {/* Subtle Scroll Down Prompt */}
      <div 
        onClick={onScrollTrending}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-stone-500 hover:text-amber-400 cursor-pointer animate-bounce z-20"
      >
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}
