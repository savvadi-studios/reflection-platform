import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  FileCheck, 
  ExternalLink,
  Search,
  Scale
} from 'lucide-react';

export default function KnowTheSourceSection({ onSearchSource }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const claimsExamples = [
    {
      claim: "Radcliffe had only 5 weeks to demarcate the 4,500 km international border of India.",
      type: "fact",
      category: "History",
      source: "Transfer of Power Documents, Vol. XII, Her Majesty's Stationery Office (HMSO), 1983.",
      tier: "Official British Cabinet Records",
      status: "Verified 100%"
    },
    {
      claim: "Over 60% of India's constitutional administrative structure stems from the Government of India Act 1935.",
      type: "analysis",
      category: "Constitution",
      source: "Granville Austin, 'The Indian Constitution: Cornerstone of a Nation' (Oxford University Press).",
      tier: "Scholarly Historiographical Analysis",
      status: "Academic Consensus"
    },
    {
      claim: "Earlier British troop deployment in Punjab during August 1947 could have curbed refugee casualties by 40%.",
      type: "opinion",
      category: "Debate",
      source: "Historians Panel Debate (Prof. Meghnad Desai vs Sir Martin Gilbert papers).",
      tier: "Counterfactual Editorial Perspective",
      status: "Debated Hypothesis"
    },
    {
      claim: "Rajendra Chola's naval force captured 14 ports across Sumatra and the Malacca Strait in 1025 CE.",
      type: "fact",
      category: "Epigraphy",
      source: "Brihadisvara Temple Inscriptions (Archaeological Survey of India Epigraphia Indica Vol. IX).",
      tier: "Stone Inscription & ASI Record",
      status: "Epigraphically Confirmed"
    }
  ];

  const filtered = selectedCategory === 'all'
    ? claimsExamples
    : claimsExamples.filter(c => c.type === selectedCategory);

  return (
    <section id="archive" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] tracking-widest uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Reflection Verification Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-serif">
            Know the Source
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            In an era of outrage algorithms and unverified claims, Reflection maps every claim against declassified archives, distinguishing verified fact from commentary.
          </p>
        </div>

        <span className="text-[11px] text-stone-500 font-mono mt-3 md:mt-0 shrink-0">
          Strict 3-Tier Epistemic Audit
        </span>
      </div>

      {/* 3 Pillars of Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* Tier 1: Fact */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card relative overflow-hidden group">
          <div className="w-8 h-8 rounded-full bg-white/[0.05] text-emerald-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400/90 font-medium block mb-1">
            Tier 01
          </span>
          <h3 className="font-serif text-lg font-normal text-white mb-2">
            Fact / Primary Source
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed font-light">
            Declassified cabinet papers, parliamentary debate records (CAD), Archaeological Survey of India inscriptions, official gazettes, and treaties.
          </p>
        </div>

        {/* Tier 2: Analysis */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card relative overflow-hidden group">
          <div className="w-8 h-8 rounded-full bg-white/[0.05] text-amber-400 flex items-center justify-center mb-4">
            <AlertCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/90 font-medium block mb-1">
            Tier 02
          </span>
          <h3 className="font-serif text-lg font-normal text-white mb-2">
            Analysis & Historiography
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed font-light">
            Peer-reviewed papers, economic datasets (PLFS, RBI, World Bank), historiographical scholarship, and academic cross-examinations.
          </p>
        </div>

        {/* Tier 3: Opinion */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card relative overflow-hidden group">
          <div className="w-8 h-8 rounded-full bg-white/[0.05] text-stone-400 flex items-center justify-center mb-4">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-medium block mb-1">
            Tier 03
          </span>
          <h3 className="font-serif text-lg font-normal text-white mb-2">
            Opinion & Debate
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed font-light">
            Distinguished guest opinions, philosophical perspectives, and counterfactual hypotheses — labeled clearly so viewers judge for themselves.
          </p>
        </div>
      </div>

      {/* Interactive Verification Matrix */}
      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
          <div>
            <h4 className="font-serif text-lg font-normal text-white">
              Live Claim Verification Matrix
            </h4>
            <p className="text-xs text-stone-400 mt-1 font-light">
              Audit how claims across our video archives are systematically indexed and cited.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['all', 'fact', 'analysis', 'opinion'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedCategory(t)}
                className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-mono transition-all ${
                  selectedCategory === t
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/[0.03] text-stone-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Claims Table / Cards */}
        <div className="mt-6 space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  {item.type === 'fact' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      Fact / Source
                    </span>
                  )}
                  {item.type === 'analysis' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20">
                      Analysis / Historiography
                    </span>
                  )}
                  {item.type === 'opinion' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-stone-300 bg-white/[0.06] border border-white/[0.1]">
                      Opinion / Viewpoint
                    </span>
                  )}
                  <span className="text-[10px] text-stone-500 font-mono">#{item.category}</span>
                </div>

                <p className="text-white text-xs sm:text-sm font-light leading-relaxed">
                  "{item.claim}"
                </p>

                <div className="text-[11px] text-stone-400 flex items-center gap-1.5 font-light">
                  <span className="text-amber-400/90 font-mono text-[10px] uppercase">Source:</span>
                  <span className="text-stone-300 italic">{item.source}</span>
                </div>
              </div>

              <div className="md:text-right shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.04]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-1">
                  {item.status}
                </span>
                <span className="text-[11px] text-stone-500 block font-light">
                  {item.tier}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
