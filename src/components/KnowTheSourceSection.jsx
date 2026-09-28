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
    <section id="archive" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs uppercase tracking-widest font-semibold mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>The Reflection Standard</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-stone-100 tracking-wide">
          Know the Source
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed">
          In an era of outrage algorithms and unverified claims, Reflection guarantees transparency. 
          Every narrative claim is mapped against primary archives, distinguishing verified fact from commentary.
        </p>
      </div>

      {/* 3 Pillars of Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Tier 1: Fact */}
        <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">
            Tier 01
          </span>
          <h3 className="font-cinzel text-xl font-bold text-stone-100 mb-2">
            Fact / Primary Source
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Declassified cabinet papers, parliamentary debate records (CAD), Archaeological Survey of India inscriptions, official gazettes, and treaties.
          </p>
        </div>

        {/* Tier 2: Analysis */}
        <div className="p-6 rounded-3xl glass-panel border border-amber-500/30 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
            Tier 02
          </span>
          <h3 className="font-cinzel text-xl font-bold text-stone-100 mb-2">
            Analysis & Commentary
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Peer-reviewed papers, economic datasets (PLFS, RBI, World Bank), historiographical scholarship, and academic cross-examinations.
          </p>
        </div>

        {/* Tier 3: Opinion */}
        <div className="p-6 rounded-3xl glass-panel border border-purple-500/30 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 font-bold block mb-1">
            Tier 03
          </span>
          <h3 className="font-cinzel text-xl font-bold text-stone-100 mb-2">
            Opinion & Debate
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Distinguished guest opinions, philosophical perspectives, and counterfactual hypotheses — labeled clearly so viewers can judge for themselves.
          </p>
        </div>
      </div>

      {/* Interactive Verification Matrix */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
          <div>
            <h4 className="font-cinzel text-lg font-bold text-stone-100">
              Live Claim Verification Matrix
            </h4>
            <p className="text-xs text-stone-400 mt-0.5">
              Inspect how claims from our video archive are tagged and cited.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['all', 'fact', 'analysis', 'opinion'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedCategory(t)}
                className={`px-3 py-1.5 rounded-xl text-xs uppercase font-semibold transition-all ${
                  selectedCategory === t
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Claims Table / Cards */}
        <div className="mt-6 space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-stone-900/60 hover:bg-stone-900/90 border border-stone-800/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  {item.type === 'fact' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Fact / Source
                    </span>
                  )}
                  {item.type === 'analysis' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Analysis / Commentary
                    </span>
                  )}
                  {item.type === 'opinion' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Opinion / Viewpoint
                    </span>
                  )}
                  <span className="text-[10px] text-stone-500 font-mono">#{item.category}</span>
                </div>

                <p className="text-stone-100 text-xs sm:text-sm font-semibold leading-relaxed">
                  "{item.claim}"
                </p>

                <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                  <span className="text-amber-400 font-medium">Source:</span>
                  <span className="text-stone-300 italic">{item.source}</span>
                </div>
              </div>

              <div className="md:text-right shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30 block mb-1">
                  {item.status}
                </span>
                <span className="text-[11px] text-stone-500">
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
