import React, { useState } from 'react';
import { 
  MapPin, 
  Play, 
  Sparkles, 
  Compass, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { INDIA_REGIONS } from '../data/reflectionData';

export default function InteractiveIndia({ videos, onSelectVideo }) {
  const [selectedRegionId, setSelectedRegionId] = useState('telangana');

  const selectedRegion = INDIA_REGIONS.find(r => r.id === selectedRegionId) || INDIA_REGIONS[0];
  const relatedVids = videos.filter(v => selectedRegion.relatedVideos.includes(v.id));

  return (
    <section id="india" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-widest mb-1.5">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Geographic & Civilizational Knowledge Engine</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-wide">
            Interactive India
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
            Explore India’s historical landmarks, linguistic heritage, geopolitical crossroads, and regional archives by state.
          </p>
        </div>

        {/* Region Quick Select Chips */}
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          {INDIA_REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegionId(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedRegionId === r.id
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-stone-950 font-bold shadow-md shadow-orange-950/40'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Visual Map / Graphic Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-amber-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              Subcontinent Cartography
            </span>
            <span className="text-[10px] text-stone-400 bg-stone-900 px-2 py-0.5 rounded-md border border-stone-800">
              Interactive Hotspots
            </span>
          </div>

          {/* Stylized SVG Map Representation of India */}
          <div className="relative aspect-[4/5] w-full flex items-center justify-center p-4">
            <svg viewBox="0 0 400 480" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1c1917" />
                  <stop offset="50%" stopColor="#292524" />
                  <stop offset="100%" stopColor="#171717" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Stylized India Landmass Outline */}
              <path
                d="M 175,25 
                   C 190,15 210,18 215,35 
                   L 230,55 
                   C 250,65 270,75 260,95 
                   L 245,115 
                   L 280,125 
                   L 330,130 
                   L 360,115 
                   L 365,140 
                   L 320,165 
                   L 275,185 
                   L 270,225 
                   L 245,280 
                   L 215,360 
                   L 190,440 
                   L 175,445 
                   L 165,390 
                   L 140,320 
                   L 115,260 
                   L 90,205 
                   L 60,185 
                   L 85,150 
                   L 130,135 
                   L 135,80 
                   Z"
                fill="url(#mapGradient)"
                stroke="#D97706"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                className="hover:stroke-amber-400/80 transition-colors"
              />

              {/* Latitude / Longitude Subtle Grid */}
              <line x1="50" y1="120" x2="350" y2="120" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
              <line x1="50" y1="240" x2="350" y2="240" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
              <line x1="50" y1="360" x2="350" y2="360" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
              <line x1="200" y1="20" x2="200" y2="450" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />

              {/* Hotspots for Regions */}
              {/* Punjab */}
              <g 
                onClick={() => setSelectedRegionId('punjab')} 
                className="cursor-pointer group/pin"
                transform="translate(145, 100)"
              >
                <circle cx="0" cy="0" r={selectedRegionId === 'punjab' ? 8 : 5} fill={selectedRegionId === 'punjab' ? '#EA580C' : '#F59E0B'} filter="url(#glow)" />
                <text x="10" y="4" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Punjab</text>
              </g>

              {/* Delhi */}
              <g 
                onClick={() => setSelectedRegionId('delhi')} 
                className="cursor-pointer group/pin"
                transform="translate(175, 135)"
              >
                <circle cx="0" cy="0" r={selectedRegionId === 'delhi' ? 8 : 5} fill={selectedRegionId === 'delhi' ? '#EA580C' : '#F59E0B'} filter="url(#glow)" />
                <text x="10" y="4" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Delhi</text>
              </g>

              {/* Uttar Pradesh (Ayodhya) */}
              <g 
                onClick={() => setSelectedRegionId('up')} 
                className="cursor-pointer group/pin"
                transform="translate(210, 160)"
              >
                <circle cx="0" cy="0" r={selectedRegionId === 'up' ? 8 : 5} fill={selectedRegionId === 'up' ? '#EA580C' : '#F59E0B'} filter="url(#glow)" />
                <text x="10" y="4" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">UP (Ayodhya)</text>
              </g>

              {/* West Bengal */}
              <g 
                onClick={() => setSelectedRegionId('bengal')} 
                className="cursor-pointer group/pin"
                transform="translate(265, 205)"
              >
                <circle cx="0" cy="0" r={selectedRegionId === 'bengal' ? 8 : 5} fill={selectedRegionId === 'bengal' ? '#EA580C' : '#F59E0B'} filter="url(#glow)" />
                <text x="10" y="4" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Bengal</text>
              </g>

              {/* Maharashtra */}
              <g 
                onClick={() => setSelectedRegionId('maharashtra')} 
                className="cursor-pointer group/pin"
                transform="translate(145, 255)"
              >
                <circle cx="0" cy="0" r={selectedRegionId === 'maharashtra' ? 8 : 5} fill={selectedRegionId === 'maharashtra' ? '#EA580C' : '#F59E0B'} filter="url(#glow)" />
                <text x="-70" y="4" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Maharashtra</text>
              </g>

              {/* Telangana (Hyderabad) */}
              <g 
                onClick={() => setSelectedRegionId('telangana')} 
                className="cursor-pointer group/pin"
                transform="translate(190, 275)"
              >
                <circle cx="0" cy="0" r={selectedRegionId === 'telangana' ? 10 : 6} fill={selectedRegionId === 'telangana' ? '#F97316' : '#EAB308'} className="animate-ping" opacity="0.4" />
                <circle cx="0" cy="0" r={selectedRegionId === 'telangana' ? 8 : 6} fill={selectedRegionId === 'telangana' ? '#EA580C' : '#F59E0B'} filter="url(#glow)" />
                <text x="12" y="4" fill="#FDE047" fontSize="11" fontFamily="sans-serif" fontWeight="extrabold">Telangana</text>
              </g>

              {/* Tamil Nadu */}
              <g 
                onClick={() => setSelectedRegionId('tamilnadu')} 
                className="cursor-pointer group/pin"
                transform="translate(180, 390)"
              >
                <circle cx="0" cy="0" r={selectedRegionId === 'tamilnadu' ? 8 : 5} fill={selectedRegionId === 'tamilnadu' ? '#EA580C' : '#F59E0B'} filter="url(#glow)" />
                <text x="10" y="4" fill="#E2E8F0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Tamil Nadu</text>
              </g>
            </svg>
          </div>

          <p className="text-[11px] text-stone-500 text-center mt-2 italic">
            Click any pin on the map or the state chips above to reveal regional documentaries and civilizational archives.
          </p>
        </div>

        {/* Selected Region Deep-Dive Explorer (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl glass-panel p-6 sm:p-8 border border-amber-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100">
                  {selectedRegion.name}
                </h3>
              </div>
              <span className="text-xs text-amber-400 font-mono tracking-wider ml-7">
                Capital / Focal Center: {selectedRegion.capital}
              </span>
            </div>

            {/* Region Stats */}
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-center">
                <span className="block text-xs font-bold text-amber-400">{selectedRegion.stats.videos}</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-400">Videos</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-center">
                <span className="block text-xs font-bold text-amber-400">{selectedRegion.stats.articles}</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-400">Articles</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-center">
                <span className="block text-xs font-bold text-emerald-400">{selectedRegion.stats.sources}</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-400">Sources</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-300 text-sm leading-relaxed">
            {selectedRegion.description}
          </p>

          {/* Key Focal Points */}
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-stone-400 block mb-2">
              Key Historical & Cultural Pillars:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedRegion.focalPoints.map((point) => (
                <span
                  key={point}
                  className="px-3 py-1 rounded-lg bg-stone-900/90 text-amber-300 text-xs border border-amber-500/20 font-medium"
                >
                  ⚡ {point}
                </span>
              ))}
            </div>
          </div>

          {/* Related Reflection Documentaries for this State */}
          <div className="pt-4 border-t border-stone-800">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block mb-3">
              Reflection Documentaries on {selectedRegion.name}:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedVids.map((v) => (
                <div
                  key={v.id}
                  onClick={() => onSelectVideo(v)}
                  className="p-3 rounded-2xl glass-panel glass-panel-hover border border-stone-800 flex gap-3 cursor-pointer group"
                >
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-24 h-16 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex flex-col justify-between">
                    <h5 className="font-bold text-xs text-stone-100 group-hover:text-amber-300 line-clamp-2">
                      {v.title}
                    </h5>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1">
                      <span>{v.duration}</span>
                      <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
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
    </section>
  );
}
