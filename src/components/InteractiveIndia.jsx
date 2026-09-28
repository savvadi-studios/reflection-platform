import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight,
  Sparkles,
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
      {/* Sleek Minimalist Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-white/[0.06]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 block mb-1">
            Civilizational Cartography
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100">
            Interactive India
          </h2>
        </div>
        <span className="text-xs text-stone-400 mt-2 md:mt-0 font-normal">
          Select any region to unlock declassified state files and documentaries
        </span>
      </div>

      {/* State Switcher Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none touch-pan-x">
        {INDIA_REGIONS.map((r) => {
          const isSelected = selectedRegionId === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRegionId(r.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-sm'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-stone-400 hover:text-stone-200 border border-white/[0.05]'
              }`}
            >
              {r.name}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Clean & Uncluttered */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: The Map (Clean, No Nested Boxes) */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-4">
          <div className="relative aspect-[3/4] w-full max-w-[380px] flex items-center justify-center">
            <svg 
              viewBox="0 0 420 520" 
              className="w-full h-full drop-shadow-2xl select-none"
            >
              <defs>
                <linearGradient id="indiaMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#141418" />
                  <stop offset="100%" stopColor="#181820" />
                </linearGradient>

                <filter id="radarFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Lines */}
              <g opacity="0.08" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="3 4">
                <line x1="30" y1="100" x2="390" y2="100" />
                <line x1="30" y1="220" x2="390" y2="220" />
                <line x1="30" y1="340" x2="390" y2="340" />
                <line x1="140" y1="30" x2="140" y2="490" />
                <line x1="260" y1="30" x2="260" y2="490" />
              </g>

              {/* India Silhouette */}
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
                fill="url(#indiaMapGrad)"
                stroke="#d97706"
                strokeWidth="1.2"
                strokeOpacity="0.45"
              />

              {/* State Nodes */}
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
                    className="cursor-pointer"
                  >
                    {/* Pulsing ring */}
                    {isSelected && (
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="16" 
                        fill="none" 
                        stroke="#F97316" 
                        strokeWidth="1.2" 
                        className="animate-ping"
                        opacity="0.4"
                      />
                    )}

                    {/* Dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7 : isHovered ? 6 : 4.5}
                      fill={isSelected ? '#EA580C' : isHovered ? '#F59E0B' : '#57534E'}
                      stroke={isSelected ? '#FDE047' : '#292524'}
                      strokeWidth={1.5}
                      filter="url(#radarFilter)"
                      className="transition-all duration-200"
                    />

                    {/* Clean Label */}
                    <g transform={`translate(${x + 10}, ${y - 6})`}>
                      <rect
                        x="-2"
                        y="-9"
                        width={region.name.length * 6.5 + 10}
                        height="16"
                        rx="3"
                        fill={isSelected ? '#0e0e12' : '#141418'}
                        stroke={isSelected ? '#F59E0B' : 'transparent'}
                        strokeWidth="1"
                        opacity="0.9"
                      />
                      <text
                        x="3"
                        y="3"
                        fill={isSelected ? '#FDE047' : '#A8A29E'}
                        fontSize="9"
                        fontFamily="sans-serif"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {region.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
          <span className="text-[11px] text-stone-500 font-mono mt-3">
            Click map pins or state pills above
          </span>
        </div>

        {/* Right: Modern State Dossier Showcase */}
        <div className="lg:col-span-7 rounded-3xl glass-card overflow-hidden">
          
          {/* Panoramic Image Header */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-stone-950">
            <img
              src={selectedRegion.bannerImage}
              alt={selectedRegion.name}
              onError={(e) => { e.currentTarget.src = fallbackImage; }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-black/40 to-transparent" />

            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-300 block mb-0.5">
                  Capital: {selectedRegion.capital}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-stone-100">
                  {selectedRegion.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-stone-300 border border-white/[0.08]">
                  {selectedRegion.stats.videos} Documentaries
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/[0.08]">
                  {selectedRegion.stats.sources} Sources
                </span>
              </div>
            </div>
          </div>

          {/* Dossier Content */}
          <div className="p-5 sm:p-7 space-y-6">
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {selectedRegion.description}
            </p>

            {/* Focal Points Pills */}
            <div className="flex flex-wrap gap-2">
              {selectedRegion.focalPoints.map((point) => (
                <span
                  key={point}
                  className="px-3 py-1 rounded-full bg-white/[0.04] text-stone-300 text-xs border border-white/[0.06] flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{point}</span>
                </span>
              ))}
            </div>

            {/* Documentaries Row */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <span className="text-xs font-semibold text-stone-400 block">
                Related Documentaries:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedVids.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => onSelectVideo(v)}
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] flex gap-3 cursor-pointer group transition-all"
                  >
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      onError={(e) => { e.currentTarget.src = fallbackImage; }}
                      className="w-20 h-14 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex flex-col justify-between py-0.5">
                      <h4 className="font-semibold text-xs text-stone-200 group-hover:text-amber-300 line-clamp-2">
                        {v.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-stone-500">
                        <span>{v.duration}</span>
                        <span className="text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform">
                          Watch →
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
