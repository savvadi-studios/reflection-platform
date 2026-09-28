import React, { useState } from 'react';
import { 
  Clock, 
  ChevronRight, 
  Calendar, 
  Scroll, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { TIMELINE_ERAS } from '../data/reflectionData';

export default function TimelineSection({ onExploreTopic }) {
  const [selectedEraId, setSelectedEraId] = useState('independence');

  const activeEra = TIMELINE_ERAS.find(e => e.id === selectedEraId) || TIMELINE_ERAS[3];

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-orange-500 font-semibold text-xs uppercase tracking-widest mb-1.5">
            <Scroll className="w-4 h-4 text-orange-400" />
            <span>Chronological Civilizational Canvas</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-stone-100 tracking-wide">
            Interactive Historical Timeline
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
            Trace the 5,000-year continuity of Indian thought, empires, anti-colonial resistance, and constitutional birth.
          </p>
        </div>

        <span className="text-xs text-amber-400/90 font-mono mt-2 md:mt-0 shrink-0">
          5 Epochs • Verified Archival Milestones
        </span>
      </div>

      {/* Epoch Stepper Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10">
        {TIMELINE_ERAS.map((era, index) => {
          const isActive = era.id === selectedEraId;
          const isLastOdd = index === TIMELINE_ERAS.length - 1;

          return (
            <button
              key={era.id}
              onClick={() => setSelectedEraId(era.id)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all duration-300 relative border ${
                isLastOdd ? 'col-span-2 sm:col-span-1' : ''
              } ${
                isActive
                  ? 'glass-panel border-amber-500/50 bg-gradient-to-b from-amber-500/15 to-orange-950/20 shadow-xl shadow-orange-950/30'
                  : 'bg-stone-900/60 border-stone-800 hover:border-amber-500/30 text-stone-400 hover:text-stone-200'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-t-2xl" />
              )}
              <span className={`block text-xs uppercase font-bold tracking-wider ${isActive ? 'text-amber-300' : 'text-stone-300'}`}>
                {era.era}
              </span>
              <span className="block text-[10px] sm:text-[11px] font-mono text-stone-500 mt-1">
                {era.period}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Era Deep Dive Card */}
      <div className="rounded-3xl glass-panel p-5 sm:p-8 lg:p-10 border border-amber-500/25 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-amber-400 text-xs font-mono mb-4 border border-stone-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>Epoch Span: {activeEra.period}</span>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-stone-100 mb-3">
            {activeEra.era}
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-8">
            {activeEra.highlights}
          </p>
        </div>

        {/* Milestone Events List with Pixel-Perfect Spine Line */}
        <div className="relative border-l-2 border-amber-500/30 space-y-6 my-6 ml-3 sm:ml-4">
          {activeEra.keyEvents.map((evt, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Marker Dot perfectly centered at -9px on 2px border */}
              <div className="absolute -left-[9px] top-3.5 w-4 h-4 rounded-full bg-[#0a0a0c] border-2 border-amber-500 group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 hover:bg-stone-800/80 border border-stone-800 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1.5">
                  <span className="font-mono text-xs sm:text-sm font-bold text-amber-400">
                    {evt.year}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-emerald-400 flex items-center gap-1 self-start sm:self-auto">
                    <ShieldCheck className="w-3 h-3" />
                    Archival Grounded
                  </span>
                </div>
                <p className="text-stone-200 text-xs sm:text-sm font-medium leading-relaxed">
                  {evt.event}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to explore related content */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400 text-center sm:text-left">
            View all documentary films, primary sources, and podcasts tagged under <span className="text-amber-300 font-semibold">{activeEra.era}</span>.
          </p>
          <button
            onClick={() => onExploreTopic(activeEra.era)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg shadow-orange-950/40 shrink-0"
          >
            <span>Explore {activeEra.era} Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
