import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  ArrowRight,
  Sparkles,
  MapPin,
  Play,
  Film,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { INDIA_REGIONS } from '../data/reflectionData';
import { INDIA_STATE_PATHS } from '../data/indiaSvgData';

export default function InteractiveIndia({ videos = [], onSelectVideo }) {
  const [selectedRegionId, setSelectedRegionId] = useState('telangana');
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, name: '' });

  // Map state codes to featured regions
  const stateCodeToRegionMap = useMemo(() => {
    const map = {};
    INDIA_REGIONS.forEach(r => {
      if (r.stateCode) map[r.stateCode] = r;
      map[r.id] = r;
    });
    return map;
  }, []);

  // Determine active region dossier
  const activeRegion = useMemo(() => {
    // 1. Direct match by id
    const match = INDIA_REGIONS.find(r => r.id === selectedRegionId || r.stateCode === selectedRegionId);
    if (match) return match;

    // 2. If it's another state from INDIA_STATE_PATHS
    const stateObj = INDIA_STATE_PATHS.find(s => s.id === selectedRegionId);
    if (stateObj) {
      return {
        id: stateObj.id,
        stateCode: stateObj.id,
        name: stateObj.name,
        capital: 'Regional Capital',
        tagline: `Civilizational Heritage & Historical Archives of ${stateObj.name}`,
        bannerImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        mapCoords: { x: stateObj.cx, y: stateObj.cy },
        focalPoints: ['Epigraphical Records', 'Regional Dynasties', 'Monuments & Stepwells', 'Oral Traditions'],
        description: `${stateObj.name} holds profound civilizational memory, architectural heritage, and historical archives contributing to the sovereign tapestry of the Indian subcontinent.`,
        relatedVideos: ['vid-1', 'vid-2'],
        stats: { videos: 14, articles: 6, sources: 38 }
      };
    }

    return INDIA_REGIONS[0];
  }, [selectedRegionId]);

  // Active geographic coordinates for pinpoint beacon
  const activeGeo = useMemo(() => {
    const statePath = INDIA_STATE_PATHS.find(
      s => s.id === activeRegion.stateCode || s.name.toLowerCase() === activeRegion.name.toLowerCase()
    );
    if (statePath) {
      return { cx: statePath.cx, cy: statePath.cy, name: statePath.name };
    }
    return activeRegion.mapCoords || { cx: 410, cy: 642, name: activeRegion.name };
  }, [activeRegion]);

  // Related documentaries
  const relatedVids = useMemo(() => {
    const ids = activeRegion.relatedVideos || [];
    const directMatches = videos.filter(v => ids.includes(v.id));
    if (directMatches.length > 0) return directMatches;
    return videos.filter(v => v.category === 'india' || v.category === 'history').slice(0, 2);
  }, [videos, activeRegion]);

  const fallbackImage = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80';

  const handleStateClick = (stateObj) => {
    const matchedRegion = stateCodeToRegionMap[stateObj.id];
    if (matchedRegion) {
      setSelectedRegionId(matchedRegion.id);
    } else {
      setSelectedRegionId(stateObj.id);
    }
  };

  return (
    <section id="india" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
              Authentic Subcontinental Cartography
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight">
            Interactive India
          </h2>
        </div>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <span className="text-xs text-stone-400 font-normal">
            Select any state boundary to unlock regional dossiers & field footage
          </span>
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-white/[0.04] text-[10px] font-mono text-stone-300 border border-white/[0.08]">
            36 States & UTs
          </span>
        </div>
      </div>

      {/* Featured State Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none touch-pan-x">
        {INDIA_REGIONS.map((r) => {
          const isSelected = activeRegion.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRegionId(r.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-md shadow-amber-500/10'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] text-stone-400 hover:text-stone-200 border border-white/[0.05]'
              }`}
            >
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
              <span>{r.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Map (Left) + Dossier Showcase (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Authentic Vector Map */}
        <div className="lg:col-span-5 rounded-3xl glass-card p-4 sm:p-6 relative overflow-hidden border border-white/[0.08] shadow-2xl flex flex-col items-center justify-between min-h-[580px] bg-gradient-to-b from-[#111116] via-[#0d0d12] to-[#0a0a0e]">
          
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          
          {/* Cartography HUD Top Bar */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono text-stone-500 select-none border-b border-white/[0.04] pb-2.5 z-10">
            <div className="flex items-center gap-1.5 text-stone-400">
              <Compass className="w-3.5 h-3.5 text-amber-400/90" />
              <span>COORDS: 28°38'N • 77°13'E</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400/80 inline-block animate-pulse" />
              <span className="text-emerald-400/90 font-medium">GIS CALIBRATED</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[860/960] max-w-[420px] my-auto py-2 flex items-center justify-center">
            
            <svg 
              viewBox="70 20 860 960" 
              className="w-full h-full drop-shadow-2xl select-none"
            >
              <defs>
                {/* Active State Radiant Gold Fill */}
                <radialGradient id="activeStateGrad" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#d97706" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#92400e" stopOpacity="0.9" />
                </radialGradient>

                {/* Subtle Hover Gradient */}
                <radialGradient id="hoverStateGrad" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#3f3f50" />
                  <stop offset="100%" stopColor="#22222d" />
                </radialGradient>

                {/* Glow Filter for Active State */}
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Decorative Subtle Nautical / Radar Grid Rings */}
              <g opacity="0.05" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 4">
                <circle cx="430" cy="500" r="180" fill="none" />
                <circle cx="430" cy="500" r="340" fill="none" />
                <circle cx="430" cy="500" r="480" fill="none" />
                <line x1="80" y1="500" x2="880" y2="500" />
                <line x1="430" y1="40" x2="430" y2="940" />
              </g>

              {/* ALL 36 GEOGRAPHIC STATE PATHS */}
              <g id="india-states-group">
                {INDIA_STATE_PATHS.map((state) => {
                  const isCurrentActive = 
                    activeRegion.stateCode === state.id || 
                    activeRegion.name.toLowerCase() === state.name.toLowerCase();
                  
                  const isHovered = hoveredStateId === state.id;
                  const isFeatured = Boolean(stateCodeToRegionMap[state.id]);

                  return (
                    <path
                      key={state.id}
                      d={state.d}
                      id={state.id}
                      onClick={() => handleStateClick(state)}
                      onMouseEnter={(e) => {
                        setHoveredStateId(state.id);
                        setHoverPos({ x: state.cx, y: state.cy, name: state.name });
                      }}
                      onMouseLeave={() => setHoveredStateId(null)}
                      fill={
                        isCurrentActive
                          ? 'url(#activeStateGrad)'
                          : isHovered
                          ? 'url(#hoverStateGrad)'
                          : isFeatured
                          ? '#181822'
                          : '#121218'
                      }
                      stroke={
                        isCurrentActive
                          ? '#fde047'
                          : isHovered
                          ? '#f59e0b'
                          : isFeatured
                          ? '#353545'
                          : '#252530'
                      }
                      strokeWidth={
                        isCurrentActive
                          ? '2'
                          : isHovered
                          ? '1.6'
                          : isFeatured
                          ? '0.9'
                          : '0.6'
                      }
                      filter={isCurrentActive ? 'url(#goldGlow)' : undefined}
                      className="cursor-pointer transition-colors duration-200"
                    >
                      <title>{state.name}</title>
                    </path>
                  );
                })}
              </g>

              {/* FEATURED REGIONAL HOTSPOT NODES */}
              {INDIA_REGIONS.map((region) => {
                const isSelected = activeRegion.id === region.id;
                const coords = region.mapCoords || { x: 410, y: 642 };

                if (isSelected) return null; // rendered by main active beacon

                return (
                  <g 
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="4"
                      fill="#78716c"
                      stroke="#1c1917"
                      strokeWidth="1.2"
                      className="transition-all duration-200 hover:fill-amber-400 hover:scale-125"
                    />
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="1.8"
                      fill="#fef08a"
                    />
                  </g>
                );
              })}

              {/* ACTIVE REGIONAL BEACON (PINPOINT RADAR PIN) */}
              <g className="pointer-events-none">
                {/* Outer Ripple Wave */}
                <circle
                  cx={activeGeo.cx}
                  cy={activeGeo.cy}
                  r="24"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  className="animate-ping origin-center"
                  opacity="0.6"
                />

                {/* Secondary Pulse Shield */}
                <circle
                  cx={activeGeo.cx}
                  cy={activeGeo.cy}
                  r="12"
                  fill="#f59e0b"
                  fillOpacity="0.25"
                  stroke="#fde047"
                  strokeWidth="1"
                />

                {/* Center Core Luminous Bead */}
                <circle
                  cx={activeGeo.cx}
                  cy={activeGeo.cy}
                  r="5"
                  fill="#ffffff"
                  stroke="#d97706"
                  strokeWidth="2"
                />

                {/* Floating Micro Pin Callout Label */}
                <g transform={`translate(${activeGeo.cx + 12}, ${activeGeo.cy - 12})`}>
                  <rect
                    x="0"
                    y="-12"
                    width={activeRegion.name.length * 7.5 + 16}
                    height="20"
                    rx="5"
                    fill="#0a0a0f"
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    opacity="0.95"
                    className="drop-shadow-lg"
                  />
                  <text
                    x="8"
                    y="2"
                    fill="#fde047"
                    fontSize="10"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    letterSpacing="0.3px"
                  >
                    {activeRegion.name}
                  </text>
                </g>
              </g>

              {/* HOVER TOOLTIP ON UNSELECTED STATES */}
              {hoveredStateId && hoveredStateId !== activeRegion.stateCode && (
                <g 
                  transform={`translate(${hoverPos.x + 10}, ${hoverPos.y - 10})`}
                  className="pointer-events-none"
                >
                  <rect
                    x="0"
                    y="-11"
                    width={hoverPos.name.length * 6.8 + 14}
                    height="18"
                    rx="4"
                    fill="#181822"
                    stroke="#d97706"
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x="7"
                    y="2"
                    fill="#e7e5e4"
                    fontSize="9"
                    fontFamily="sans-serif"
                    fontWeight="500"
                  >
                    {hoverPos.name}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Cartography HUD Bottom Bar */}
          <div className="w-full pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono select-none z-10">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-semibold">Active:</span>
              <span className="text-stone-200">{activeRegion.name}</span>
            </div>
            <span className="text-stone-500 text-[10px]">
              Tap any state boundary to inspect
            </span>
          </div>

        </div>

        {/* Right Column: State Dossier Showcase */}
        <div className="lg:col-span-7 rounded-3xl glass-card overflow-hidden border border-white/[0.08] shadow-2xl">
          
          {/* Panoramic Image Banner */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-stone-950">
            <img
              src={activeRegion.bannerImage}
              alt={activeRegion.name}
              onError={(e) => { e.currentTarget.src = fallbackImage; }}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-black/45 to-transparent" />

            {/* Title & Coordinates Overlay */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 block mb-0.5">
                  Capital: {activeRegion.capital}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-stone-100 drop-shadow-md">
                  {activeRegion.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-stone-300 border border-white/[0.08]">
                  {activeRegion.stats?.videos || 12} Documentaries
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-white/[0.08]">
                  {activeRegion.stats?.sources || 35} Sources
                </span>
              </div>
            </div>
          </div>

          {/* Dossier Content */}
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Tagline */}
            <p className="text-sm font-serif italic text-amber-300/90 border-l-2 border-amber-400/50 pl-3">
              "{activeRegion.tagline}"
            </p>

            {/* Deep Archival Insight */}
            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
              {activeRegion.description}
            </p>

            {/* Focal Points Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                Primary Investigated Focus:
              </span>
              <div className="flex flex-wrap gap-2">
                {(activeRegion.focalPoints || []).map((point) => (
                  <span
                    key={point}
                    className="px-3 py-1 rounded-full bg-white/[0.04] text-stone-300 text-xs border border-white/[0.06] flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{point}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Documentaries Row */}
            <div className="pt-5 border-t border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-300 flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  <span>Related Declassified Documentaries:</span>
                </span>
                <span className="text-[10px] font-mono text-stone-500">
                  Click card to play
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {relatedVids.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => onSelectVideo(v)}
                    className="p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-400/30 flex gap-3.5 cursor-pointer group transition-all duration-200"
                  >
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-900">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        onError={(e) => { e.currentTarget.src = fallbackImage; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-amber-400/90 text-stone-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-lg">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0 flex flex-col justify-between py-0.5">
                      <h4 className="font-semibold text-xs text-stone-200 group-hover:text-amber-300 line-clamp-2 leading-snug">
                        {v.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                        <span>{v.duration}</span>
                        <span className="text-amber-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Watch <ArrowRight className="w-2.5 h-2.5" />
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
