import React, { useState, useMemo, useRef } from 'react';
import { 
  Compass, 
  ArrowRight,
  Sparkles,
  MapPin,
  Play,
  Film,
  Box,
  Layers,
  Maximize2,
  RefreshCw,
  Eye,
  Radio,
  Zap
} from 'lucide-react';
import { INDIA_REGIONS } from '../data/reflectionData';
import { INDIA_STATE_PATHS } from '../data/indiaSvgData';

export default function InteractiveIndia({ videos = [], onSelectVideo }) {
  const [selectedRegionId, setSelectedRegionId] = useState('telangana');
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, name: '' });
  
  // Creative 3D & Lighting controls
  const [is3DMode, setIs3DMode] = useState(true);
  const [colorTheme, setColorTheme] = useState('gold'); // 'gold' | 'cyan'
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const mapCardRef = useRef(null);

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
    const match = INDIA_REGIONS.find(r => r.id === selectedRegionId || r.stateCode === selectedRegionId);
    if (match) return match;

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
      return { 
        cx: statePath.cx, 
        cy: statePath.cy, 
        name: statePath.name, 
        d: statePath.d,
        id: statePath.id 
      };
    }
    return {
      cx: activeRegion.mapCoords?.x || 410,
      cy: activeRegion.mapCoords?.y || 642,
      name: activeRegion.name,
      d: '',
      id: activeRegion.stateCode || 'INTG'
    };
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

  // Interactive 3D mouse tilt tracking
  const handleMouseMove = (e) => {
    if (!is3DMode || !mapCardRef.current) return;
    const rect = mapCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1
    setMouseTilt({
      x: (x - 0.5) * 16, // max 8 deg tilt left/right
      y: (y - 0.5) * -16 // max 8 deg tilt up/down
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setHoveredStateId(null);
  };

  // 3D CSS transform style
  const stageTransform = is3DMode
    ? `perspective(1200px) rotateX(${22 + mouseTilt.y}deg) rotateY(${mouseTilt.x}deg) rotateZ(-3.5deg) scale3d(0.97, 0.97, 0.97)`
    : 'none';

  return (
    <section id="india" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Section Header with Creative Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
              Volumetric 3D Civilizational Cartography
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight">
            Interactive India
          </h2>
        </div>

        {/* 3D & Illumination Toggle Toolbar */}
        <div className="flex items-center flex-wrap gap-2.5 mt-4 md:mt-0">
          
          {/* 3D / 2D Perspective Button */}
          <button
            onClick={() => setIs3DMode(!is3DMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-md ${
              is3DMode 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-amber-500/10' 
                : 'bg-white/[0.04] text-stone-400 border border-white/[0.08] hover:text-white'
            }`}
          >
            <Box className={`w-3.5 h-3.5 ${is3DMode ? 'text-amber-400 animate-spin-slow' : ''}`} />
            <span>{is3DMode ? '3D Hologram [ON]' : '2D Planar Mode'}</span>
          </button>

          {/* Color Palette Toggle (Gold / Neon Cyan) */}
          <button
            onClick={() => setColorTheme(colorTheme === 'gold' ? 'cyan' : 'gold')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all border ${
              colorTheme === 'cyan'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-md shadow-cyan-500/10'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${colorTheme === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`} />
            <span>{colorTheme === 'gold' ? 'Gold Solar' : 'Cyber Neon'}</span>
          </button>

          {/* Reset Perspective */}
          {is3DMode && (
            <button
              onClick={() => setMouseTilt({ x: 0, y: 0 })}
              title="Reset 3D camera angle"
              className="p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-stone-400 hover:text-white border border-white/[0.06] transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <span className="hidden sm:inline-flex px-2.5 py-1.5 rounded-xl bg-white/[0.03] text-[10px] font-mono text-stone-300 border border-white/[0.06]">
            36 States & UTs
          </span>
        </div>
      </div>

      {/* Featured State Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none touch-pan-x">
        {INDIA_REGIONS.map((r) => {
          const isSelected = activeRegion.id === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setSelectedRegionId(r.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? colorTheme === 'cyan'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-semibold shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-amber-500/25 text-amber-300 border border-amber-400/50 font-semibold shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-stone-300 hover:text-white border border-white/[0.08]'
              }`}
            >
              {isSelected && (
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${
                  colorTheme === 'cyan' ? 'bg-cyan-400' : 'bg-amber-400'
                }`} />
              )}
              <span>{r.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: 3D Holographic Map + State Dossier Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 3D Hologram Map Terminal */}
        <div 
          ref={mapCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 rounded-3xl p-4 sm:p-6 relative overflow-hidden border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between min-h-[640px] bg-gradient-to-b from-[#131625] via-[#0d101a] to-[#090b12]"
        >
          
          {/* Luminous Ocean Backdrop Glow (Rich Cyan / Amber Aura) */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
              colorTheme === 'cyan'
                ? 'bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.18)_0%,rgba(14,116,144,0.08)_45%,transparent_75%)]'
                : 'bg-[radial-gradient(circle_at_50%_45%,rgba(245,158,11,0.20)_0%,rgba(180,83,9,0.09)_45%,transparent_75%)]'
            }`} 
          />

          {/* Secondary Coastal Rim Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.12)_0%,transparent_60%)] pointer-events-none" />

          {/* Holographic Laser Scanline */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none animate-scanline z-20" />

          {/* Cartography HUD Top Bar */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono text-stone-400 select-none border-b border-white/[0.08] pb-2.5 z-10">
            <div className="flex items-center gap-2">
              <Compass className={`w-3.5 h-3.5 ${colorTheme === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`} />
              <span className="tracking-wider">GEO-OPTICAL: 20°35'N • 78°57'E</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium tracking-wide">3D RELIEF TELEMETRY</span>
            </div>
          </div>

          {/* 3D Map Perspective Stage */}
          <div 
            className="relative w-full aspect-[860/960] max-w-[430px] my-auto py-2 flex items-center justify-center map-3d-stage"
            style={{
              transform: stageTransform,
              transition: 'transform 0.15s ease-out'
            }}
          >
            
            <svg 
              viewBox="70 20 860 960" 
              className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] select-none overflow-visible"
            >
              <defs>
                {/* 1. Bright Base State Gradient (Titanium Slate) */}
                <linearGradient id="stateBrightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2c3045" />
                  <stop offset="50%" stopColor="#202434" />
                  <stop offset="100%" stopColor="#171926" />
                </linearGradient>

                {/* 2. Featured State Warm Luster */}
                <linearGradient id="featuredStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3d3330" />
                  <stop offset="100%" stopColor="#221e25" />
                </linearGradient>

                {/* 3. Hover State Radiant Luster */}
                <linearGradient id="hoverStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#434b6b" />
                  <stop offset="100%" stopColor="#282e46" />
                </linearGradient>

                {/* 4. Active State Radiant Gold Prism */}
                <radialGradient id="activeGoldGrad" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="75%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#78350f" />
                </radialGradient>

                {/* 5. Active State Cyber Neon Cyan Prism */}
                <radialGradient id="activeCyanGrad" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#a5f3fc" />
                  <stop offset="35%" stopColor="#06b6d4" />
                  <stop offset="75%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#164e63" />
                </radialGradient>

                {/* 6. Laser Hologram Light Beam */}
                <linearGradient id="lightBeamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#fef08a" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>

                {/* 7. Deep 3D Extrusion Drop Shadow */}
                <filter id="depthShadow" x="-15%" y="-15%" width="130%" height="130%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.85 0"/>
                  <feOffset dx="0" dy="16" />
                  <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
                </filter>

                {/* 8. Neon Flare Glow Filter */}
                <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur1" />
                  <feGaussianBlur stdDeviation="10" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* AERIAL RADAR RINGS & BATHYMETRIC CONTOURS */}
              <g opacity="0.12" stroke={colorTheme === 'cyan' ? '#06b6d4' : '#f59e0b'} strokeWidth="1">
                <circle cx="430" cy="500" r="160" fill="none" strokeDasharray="4 6" />
                <circle cx="430" cy="500" r="280" fill="none" strokeDasharray="5 7" />
                <circle cx="430" cy="500" r="420" fill="none" strokeDasharray="6 8" />
                <line x1="80" y1="500" x2="880" y2="500" strokeDasharray="3 5" />
                <line x1="430" y1="40" x2="430" y2="940" strokeDasharray="3 5" />
              </g>

              {/* OCEAN LABELS (High-Tech Nautical Micro-Typography) */}
              <g className="select-none pointer-events-none" opacity="0.45" fill={colorTheme === 'cyan' ? '#38bdf8' : '#fbbf24'} fontSize="11" fontFamily="monospace" letterSpacing="3px">
                <text x="120" y="680" transform="rotate(-25 120 680)">✦ ARABIAN SEA</text>
                <text x="640" y="680" transform="rotate(25 640 680)">✦ BAY OF BENGAL</text>
                <text x="320" y="940">✦ INDIAN OCEAN</text>
              </g>

              {/* ============================================================== */}
              {/* LAYER 1: 3D EXTRUDED TERRAIN SLAB (Foundation Thickness) */}
              {/* ============================================================== */}
              {is3DMode && (
                <g id="extruded-3d-base" transform="translate(0, 18)" opacity="0.8">
                  {INDIA_STATE_PATHS.map((state) => (
                    <path
                      key={`base-${state.id}`}
                      d={state.d}
                      fill="#06080f"
                      stroke="#141829"
                      strokeWidth="2.5"
                    />
                  ))}
                </g>
              )}

              {/* ============================================================== */}
              {/* LAYER 2: INTERACTIVE STATE SURFACE (Bright, Luminous, Crisp) */}
              {/* ============================================================== */}
              <g id="india-states-surface">
                {INDIA_STATE_PATHS.map((state) => {
                  const isCurrentActive = 
                    activeRegion.stateCode === state.id || 
                    activeRegion.name.toLowerCase() === state.name.toLowerCase();
                  
                  const isHovered = hoveredStateId === state.id;
                  const isFeatured = Boolean(stateCodeToRegionMap[state.id]);

                  // Determine active color style
                  const activeFill = colorTheme === 'cyan' ? 'url(#activeCyanGrad)' : 'url(#activeGoldGrad)';
                  const activeStroke = colorTheme === 'cyan' ? '#67e8f9' : '#fde047';
                  const hoverStroke = colorTheme === 'cyan' ? '#38bdf8' : '#f59e0b';
                  const borderStroke = isFeatured 
                    ? (colorTheme === 'cyan' ? '#475569' : '#52526e') 
                    : '#393c52';

                  return (
                    <path
                      key={state.id}
                      d={state.d}
                      id={state.id}
                      onClick={() => handleStateClick(state)}
                      onMouseEnter={() => {
                        setHoveredStateId(state.id);
                        setHoverPos({ x: state.cx, y: state.cy, name: state.name });
                      }}
                      onMouseLeave={() => setHoveredStateId(null)}
                      fill={
                        isCurrentActive
                          ? activeFill
                          : isHovered
                          ? 'url(#hoverStateGrad)'
                          : isFeatured
                          ? 'url(#featuredStateGrad)'
                          : 'url(#stateBrightGrad)'
                      }
                      stroke={
                        isCurrentActive
                          ? activeStroke
                          : isHovered
                          ? hoverStroke
                          : borderStroke
                      }
                      strokeWidth={
                        isCurrentActive
                          ? '2.4'
                          : isHovered
                          ? '2'
                          : isFeatured
                          ? '1.2'
                          : '0.85'
                      }
                      filter={isCurrentActive ? 'url(#neonGlow)' : undefined}
                      className="cursor-pointer transition-colors duration-200"
                    >
                      <title>{state.name}</title>
                    </path>
                  );
                })}
              </g>

              {/* ============================================================== */}
              {/* LAYER 3: 3D ELEVATED ACTIVE STATE (Floating Shard Effect) */}
              {/* ============================================================== */}
              {is3DMode && activeGeo.d && (
                <g 
                  id="floating-3d-shard" 
                  transform="translate(0, -10)" 
                  className="pointer-events-none animate-float-3d"
                >
                  {/* Glowing 3D elevated slice */}
                  <path
                    d={activeGeo.d}
                    fill={colorTheme === 'cyan' ? 'url(#activeCyanGrad)' : 'url(#activeGoldGrad)'}
                    stroke={colorTheme === 'cyan' ? '#a5f3fc' : '#ffffff'}
                    strokeWidth="2.5"
                    filter="url(#neonGlow)"
                    opacity="0.95"
                  />
                </g>
              )}

              {/* ============================================================== */}
              {/* LAYER 4: FEATURED HOTSPOT NODES */}
              {/* ============================================================== */}
              {INDIA_REGIONS.map((region) => {
                const isSelected = activeRegion.id === region.id;
                const coords = region.mapCoords || { x: 410, y: 642 };
                if (isSelected) return null;

                return (
                  <g 
                    key={region.id}
                    onClick={() => setSelectedRegionId(region.id)}
                    className="cursor-pointer group"
                  >
                    {/* Glowing outer halo */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="7"
                      fill={colorTheme === 'cyan' ? '#06b6d4' : '#f59e0b'}
                      fillOpacity="0.2"
                      className="transition-all duration-300 group-hover:scale-150"
                    />
                    {/* Crisp pin bead */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r="4"
                      fill={colorTheme === 'cyan' ? '#38bdf8' : '#f59e0b'}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      className="transition-transform duration-200 group-hover:scale-125"
                    />
                  </g>
                );
              })}

              {/* ============================================================== */}
              {/* LAYER 5: 3D HOLOGRAPHIC VERTICAL LIGHT BEAM & RADAR BEACON */}
              {/* ============================================================== */}
              <g className="pointer-events-none">
                
                {/* 3D Vertical Light Beam extending up into the sky */}
                <line
                  x1={activeGeo.cx}
                  y1={activeGeo.cy}
                  x2={activeGeo.cx}
                  y2={activeGeo.cy - 55}
                  stroke="url(#lightBeamGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#neonGlow)"
                />

                {/* Ground Radiating Wave Pulse */}
                <circle
                  cx={activeGeo.cx}
                  cy={activeGeo.cy}
                  r="28"
                  fill="none"
                  stroke={colorTheme === 'cyan' ? '#22d3ee' : '#f59e0b'}
                  strokeWidth="1.8"
                  className="animate-ping origin-center"
                  opacity="0.75"
                />

                {/* Ground Target Ring */}
                <circle
                  cx={activeGeo.cx}
                  cy={activeGeo.cy}
                  r="14"
                  fill={colorTheme === 'cyan' ? '#06b6d4' : '#f59e0b'}
                  fillOpacity="0.3"
                  stroke={colorTheme === 'cyan' ? '#67e8f9' : '#fef08a'}
                  strokeWidth="1.5"
                />

                {/* Floating Summit Orb */}
                <circle
                  cx={activeGeo.cx}
                  cy={activeGeo.cy - 55}
                  r="7"
                  fill="#ffffff"
                  stroke={colorTheme === 'cyan' ? '#06b6d4' : '#d97706'}
                  strokeWidth="2.5"
                  filter="url(#neonGlow)"
                />

                {/* Floating Holographic 3D Territory Badge */}
                <g transform={`translate(${activeGeo.cx + 16}, ${activeGeo.cy - 65})`}>
                  <rect
                    x="0"
                    y="-14"
                    width={activeRegion.name.length * 8.5 + 24}
                    height="24"
                    rx="7"
                    fill="#080a14"
                    stroke={colorTheme === 'cyan' ? '#06b6d4' : '#f59e0b'}
                    strokeWidth="1.6"
                    opacity="0.96"
                    className="drop-shadow-2xl"
                  />
                  <circle 
                    cx="12" 
                    cy="-2" 
                    r="3.5" 
                    fill={colorTheme === 'cyan' ? '#38bdf8' : '#fde047'} 
                    className="animate-pulse"
                  />
                  <text
                    x="22"
                    y="2"
                    fill={colorTheme === 'cyan' ? '#a5f3fc' : '#fef08a'}
                    fontSize="11"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    letterSpacing="0.4px"
                  >
                    {activeRegion.name}
                  </text>
                </g>
              </g>

              {/* HOVER CALLOUT FOR UNSELECTED STATES */}
              {hoveredStateId && hoveredStateId !== activeRegion.stateCode && (
                <g 
                  transform={`translate(${hoverPos.x + 12}, ${hoverPos.y - 14})`}
                  className="pointer-events-none"
                >
                  <rect
                    x="0"
                    y="-13"
                    width={hoverPos.name.length * 7.5 + 18}
                    height="22"
                    rx="5"
                    fill="#151928"
                    stroke={colorTheme === 'cyan' ? '#38bdf8' : '#f59e0b'}
                    strokeWidth="1.2"
                    opacity="0.95"
                    className="drop-shadow-lg"
                  />
                  <text
                    x="9"
                    y="2"
                    fill="#ffffff"
                    fontSize="10"
                    fontFamily="sans-serif"
                    fontWeight="600"
                  >
                    {hoverPos.name}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Cartography HUD Bottom Bar */}
          <div className="w-full pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono select-none z-10">
            <div className="flex items-center gap-2">
              <span className={colorTheme === 'cyan' ? 'text-cyan-400 font-bold' : 'text-amber-400 font-bold'}>
                ACTIVE TERRITORY:
              </span>
              <span className="text-white font-semibold">{activeRegion.name}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>CLICK ANY STATE BORDER</span>
            </div>
          </div>

        </div>

        {/* Right Column: State Dossier Showcase Card */}
        <div className="lg:col-span-7 rounded-3xl glass-card overflow-hidden border border-white/[0.1] shadow-2xl">
          
          {/* Panoramic Image Banner */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-stone-950">
            <img
              src={activeRegion.bannerImage}
              alt={activeRegion.name}
              onError={(e) => { e.currentTarget.src = fallbackImage; }}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-black/45 to-transparent" />

            {/* Title & Stats Overlay */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-widest block mb-0.5 ${
                  colorTheme === 'cyan' ? 'text-cyan-300' : 'text-amber-300'
                }`}>
                  Capital: {activeRegion.capital}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-stone-100 drop-shadow-md">
                  {activeRegion.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-mono text-stone-200 border border-white/[0.08]">
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
            <p className={`text-sm font-serif italic border-l-2 pl-3 ${
              colorTheme === 'cyan' 
                ? 'text-cyan-300/90 border-cyan-400/50' 
                : 'text-amber-300/90 border-amber-400/50'
            }`}>
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
                    className="px-3 py-1 rounded-full bg-white/[0.04] text-stone-200 text-xs border border-white/[0.08] flex items-center gap-1.5"
                  >
                    <Sparkles className={`w-3 h-3 shrink-0 ${
                      colorTheme === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
                    }`} />
                    <span>{point}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Documentaries Row */}
            <div className="pt-5 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-200 flex items-center gap-2">
                  <Film className={`w-3.5 h-3.5 ${colorTheme === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`} />
                  <span>Related Declassified Documentaries:</span>
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  Click card to play
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {relatedVids.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => onSelectVideo(v)}
                    className={`p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] flex gap-3.5 cursor-pointer group transition-all duration-200 ${
                      colorTheme === 'cyan' ? 'hover:border-cyan-400/40' : 'hover:border-amber-400/40'
                    }`}
                  >
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-900">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        onError={(e) => { e.currentTarget.src = fallbackImage; }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-lg text-stone-950 ${
                          colorTheme === 'cyan' ? 'bg-cyan-400' : 'bg-amber-400'
                        }`}>
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0 flex flex-col justify-between py-0.5">
                      <h4 className={`font-semibold text-xs text-stone-200 line-clamp-2 leading-snug ${
                        colorTheme === 'cyan' ? 'group-hover:text-cyan-300' : 'group-hover:text-amber-300'
                      }`}>
                        {v.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono">
                        <span>{v.duration}</span>
                        <span className={`font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 ${
                          colorTheme === 'cyan' ? 'text-cyan-400' : 'text-amber-400'
                        }`}>
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
