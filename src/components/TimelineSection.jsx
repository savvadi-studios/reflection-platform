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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-amber-400/90 font-mono text-[11px] tracking-widest uppercase mb-2">
            <Scroll className="w-3.5 h-3.5 text-amber-400" />
            <span>5,000-Year Civilizational Continuity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-serif">
            Interactive Timeline
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            Trace the evolution of Indian philosophy, empires, maritime power, anti-colonial resistance, and the democratic republic.
          </p>
        </div>

        <span className="text-[11px] text-stone-500 font-mono mt-3 md:mt-0 shrink-0">
          5 Epochs • Primary Archival Milestones
        </span>
      </div>

      {/* Epoch Stepper Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
        {TIMELINE_ERAS.map((era) => {
          const isActive = era.id === selectedEraId;

          return (
            <button
              key={era.id}
              onClick={() => setSelectedEraId(era.id)}
              className={`px-5 py-3 rounded-full text-left transition-all duration-300 shrink-0 border ${
                isActive
                  ? 'bg-amber-400 text-black font-semibold border-amber-400 shadow-lg shadow-amber-400/10'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.2] text-stone-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider">
                  {era.era}
                </span>
                <span className={`text-[10px] font-mono ${isActive ? 'text-stone-900/80' : 'text-stone-500'}`}>
                  ({era.period})
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Era Deep Dive Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] text-amber-300/90 text-[11px] font-mono mb-4 border border-white/[0.08]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Epoch Span: {activeEra.period}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white font-serif mb-3">
            {activeEra.era}
          </h3>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-8">
            {activeEra.highlights}
          </p>
        </div>

        {/* Milestone Events List with Elegant Spine */}
        <div className="relative border-l border-white/[0.1] space-y-6 my-6 ml-3 sm:ml-4">
          {activeEra.keyEvents.map((evt, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Marker Dot centered on border */}
              <div className="absolute -left-[7px] top-3.5 w-3.5 h-3.5 rounded-full bg-[#0a0a0c] border border-amber-400/80 group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 mb-1.5">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-amber-300">
                    {evt.year}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400/90 flex items-center gap-1 self-start sm:self-auto">
                    <ShieldCheck className="w-3 h-3" />
                    Archival Grounded
                  </span>
                </div>
                <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
                  {evt.event}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to explore related content */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400 text-center sm:text-left">
            View all documentary films, primary sources, and podcasts tagged under <span className="text-stone-200 font-medium">{activeEra.era}</span>.
          </p>
          <button
            onClick={() => onExploreTopic(activeEra.era)}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-stone-200 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          >
            <span>Explore {activeEra.era} Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
