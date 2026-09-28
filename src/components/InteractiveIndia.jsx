import React, { useState } from 'react';
import { 
  MapPin, 
  Play, 
  Sparkles, 
  Compass, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Crosshair,
  Layers,
  Info
} from 'lucide-react';
import { INDIA_REGIONS } from '../data/reflectionData';

export default function InteractiveIndia({ videos, onSelectVideo }) {
  const [selectedRegionId, setSelectedRegionId] = useState('telangana');
  const [hoveredRegionId, setHoveredRegionId] = useState(null);

  const selectedRegion = INDIA_REGIONS.find(r => r.id === selectedRegionId) || INDIA_REGIONS[0];
  const relatedVids = videos.filter(v => selectedRegion.relatedVideos.includes(v.id));

  const fallbackImage = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80';

  return (
    <section id="india" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-widest mb-1.5">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Civilizational Cartography & Regional Vault</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-stone-100 tracking-wide">
            Interactive India
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Select any region to unlock declassified state files, archaeological surveys, civilizational milestones, and Reflection documentaries.
          </p>
        </div>

        {/* State Quick Switcher Pills */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-1.5">
          {INDIA_REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegionId(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedRegionId === r.id
                  ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-stone-950 font-bold shadow-md shadow-orange-950/40 scale-[1.04]'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-amber-500/30'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cartography Vector Map Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-amber-500/25 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Map Top Bar */}
          <div className="flex items-center justify-between mb-2 relative z-10">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '30s' }} />
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                Radar Telemetry 28°N • 77°E
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
              ● Live Hotspots
            </span>
          </div>

          {/* Authentic Faithful SVG Silhouette Map of India */}
          <div className="relative aspect-[3/4] w-full flex items-center justify-center py-2 z-10">
            <svg 
              viewBox="0 0 420 520" 
              className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] select-none"
            >
              <defs>
                <linearGradient id="indiaFillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#141418" />
                  <stop offset="50%" stopColor="#1c1c24" />
                  <stop offset="100%" stopColor="#111116" />
                </linearGradient>

                <linearGradient id="selectedStateGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>

                <filter id="radarGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Tactical Cartography Grid Lines */}
              <g opacity="0.12" stroke="#F59E0B" strokeWidth="0.75" strokeDasharray="3 4">
                <line x1="30" y1="80" x2="390" y2="80" />
                <line x1="30" y1="180" x2="390" y2="180" />
                <line x1="30" y1="280" x2="390" y2="280" />
                <line x1="30" y1="380" x2="390" y2="380" />
                <line x1="120" y1="20" x2="120" y2="500" />
                <line x1="210" y1="20" x2="210" y2="500" />
                <line x1="300" y1="20" x2="300" y2="500" />
              </g>

              {/* Detailed Accurate Outline of India */}
              <path
                d="M 175,22 
                   C 183,18 193,18 200,24 
                   C 207,32 216,40 220,52 
                   C 225,65 218,74 212,85 
                   C 214,92 225,98 238,104 
                   C 252,110 268,118 274,130 
                   C 285,133 300,132 312,136 
                   C 328,141 345,134 358,142 
                   C 370,149 378,162 374,175 
                   C 368,188 350,192 342,204 
                   C 336,212 340,224 332,232 
                   C 324,238 310,230 302,228 
                   C 292,230 286,242 278,250 
                   C 270,258 274,272 268,284 
                   C 260,298 250,314 244,330 
                   C 236,350 226,375 220,398 
                   C 214,420 205,448 196,472 
                   C 192,482 188,490 184,490 
                   C 180,490 176,478 172,465 
                   C 165,440 156,412 150,388 
                   C 142,358 136,330 130,302 
                   C 124,275 110,252 98,235 
                   C 88,220 74,212 60,208 
                   C 48,204 40,214 34,222 
                   C 30,226 36,234 46,236 
                   C 56,238 68,245 66,255 
                   C 64,264 52,268 45,260 
                   C 38,252 42,242 36,236 
                   C 32,232 30,224 35,214 
                   C 42,198 56,192 70,185 
                   C 85,178 98,164 104,148 
                   C 110,132 118,118 126,102 
                   C 134,86 142,68 152,52 
                   C 160,38 168,26 175,22 Z"
                fill="url(#indiaFillGradient)"
                stroke="#d97706"
                strokeWidth="1.8"
                strokeOpacity="0.55"
                className="filter drop-shadow"
              />

              {/* Subtle Coastal and Major River Accents (Ganga, Narmada, Godavari, Krishna) */}
              <g stroke="#F59E0B" strokeWidth="0.8" fill="none" opacity="0.22">
                {/* Ganga River Flow */}
                <path d="M 180,120 Q 215,145 250,170 T 300,215" />
                {/* Godavari River Flow */}
                <path d="M 140,270 Q 180,275 240,295" />
                {/* Krishna River Flow */}
                <path d="M 145,310 Q 185,325 230,340" />
              </g>

              {/* Interactive Radar Hotspots for Each State */}
              {INDIA_REGIONS.map((region) => {
                const isSelected = selectedRegionId === region.id;
                const isHovered = hoveredRegionId === region.id;
                const { x, y } = region.mapCoords;

                return (
                  <g 
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    onMouseEnter={() => setHoveredRegionId(region.id)}
                    onMouseLeave={() => setHoveredRegionId(null)}
                    className="cursor-pointer group/node"
                  >
                    {/* Animated Pulsing Radar Rings when active */}
                    {isSelected && (
                      <>
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="18" 
                          fill="none" 
                          stroke="#F97316" 
                          strokeWidth="1.5" 
                          className="animate-ping"
                          opacity="0.45"
                        />
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="28" 
                          fill="none" 
                          stroke="#EAB308" 
                          strokeWidth="1" 
                          strokeDasharray="2 3"
                          opacity="0.35"
                        />
                      </>
                    )}

                    {/* Outer Target Dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 9 : isHovered ? 7 : 5}
                      fill={isSelected ? '#EA580C' : isHovered ? '#F59E0B' : '#78350F'}
                      stroke={isSelected ? '#FDE047' : '#D97706'}
                      strokeWidth={isSelected ? 2 : 1.2}
                      filter="url(#radarGlow)"
                      className="transition-all duration-300"
                    />

                    {/* Inner Core Dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 3.5 : 2}
                      fill="#FFFFFF"
                    />

                    {/* Clean Offset Callout Label with Background Box */}
                    <g transform={`translate(${x + 12}, ${y - 8})`}>
                      <rect
                        x="-3"
                        y="-10"
                        width={region.name.length * 6.8 + 14}
                        height="18"
                        rx="4"
                        fill={isSelected ? '#0c0d12' : '#14141a'}
                        stroke={isSelected ? '#F59E0B' : '#292524'}
                        strokeWidth="1"
                        opacity={isSelected ? 0.95 : 0.8}
                      />
                      <text
                        x="4"
                        y="3"
                        fill={isSelected ? '#FDE047' : '#D6D3D1'}
                        fontSize="9.5"
                        fontFamily="sans-serif"
                        fontWeight={isSelected ? 'bold' : '600'}
                        letterSpacing="0.03em"
                      >
                        {region.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Prompt */}
          <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Click any node to navigate states</span>
            </span>
            <span className="font-mono text-amber-400/80">
              Active: {selectedRegion.name}
            </span>
          </div>

        </div>

        {/* Right: State Dossier Profile & Documentaries (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl glass-panel border border-amber-500/25 overflow-hidden shadow-2xl space-y-6">
          
          {/* Panoramic State Banner Header */}
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img
              src={selectedRegion.bannerImage}
              alt={selectedRegion.name}
              onError={(e) => { e.currentTarget.src = fallbackImage; }}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-black/40 to-black/60" />

            {/* Banner Overlay Info */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-600/90 text-stone-950">
                    State Dossier
                  </span>
                  <span className="text-xs text-amber-300 font-mono">
                    Focal Center: {selectedRegion.capital}
                  </span>
                </div>
                <h3 className="font-cinzel text-3xl sm:text-4xl font-black text-stone-100 drop-shadow-md">
                  {selectedRegion.name}
                </h3>
                <p className="text-xs text-amber-200/90 font-medium italic mt-0.5">
                  "{selectedRegion.tagline}"
                </p>
              </div>

              {/* 3 Metric Pills */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-stone-800 text-center">
                  <span className="block text-xs font-bold text-amber-400">{selectedRegion.stats.videos}</span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400">Videos</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-stone-800 text-center">
                  <span className="block text-xs font-bold text-amber-400">{selectedRegion.stats.articles}</span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400">Articles</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-stone-800 text-center">
                  <span className="block text-xs font-bold text-emerald-400">{selectedRegion.stats.sources}</span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-400">Sources</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-0 space-y-6">
            
            {/* State Civilizational Description */}
            <p className="text-stone-300 text-sm leading-relaxed">
              {selectedRegion.description}
            </p>

            {/* Key Historical & Cultural Pillars */}
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-stone-400 block mb-2.5">
                Key Historical & Cultural Pillars:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.focalPoints.map((point) => (
                  <span
                    key={point}
                    className="px-3 py-1.5 rounded-xl bg-stone-900/90 text-amber-300 text-xs border border-amber-500/25 font-medium flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3 h-3 text-orange-400" />
                    <span>{point}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Reflection Documentaries on Selected State */}
            <div className="pt-4 border-t border-stone-800">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-3.5">
                Archival Documentaries on {selectedRegion.name}:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedVids.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => onSelectVideo(v)}
                    className="p-3 rounded-2xl glass-panel glass-panel-hover border border-stone-800 flex gap-3.5 cursor-pointer group"
                  >
                    <div className="relative w-28 h-18 rounded-xl overflow-hidden shrink-0 bg-stone-950">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        onError={(e) => { e.currentTarget.src = fallbackImage; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-stone-300">
                        {v.duration}
                      </div>
                    </div>

                    <div className="min-w-0 flex flex-col justify-between py-0.5">
                      <h5 className="font-bold text-xs text-stone-100 group-hover:text-amber-300 line-clamp-2 leading-snug transition-colors">
                        {v.title}
                      </h5>
                      <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                        <span className="text-emerald-400/90 font-mono font-medium">
                          ✓ Verified
                        </span>
                        <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                          Watch <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
