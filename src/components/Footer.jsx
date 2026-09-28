import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Share2,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export default function Footer({ onOpenSearch }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#060608] pt-20 pb-12 relative overflow-hidden">
      {/* Ambient glow in footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter / Dispatch Box */}
        <div className="rounded-3xl glass-card p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-medium block mb-1.5">
              Archival Dispatch
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-snug">
              Receive The Weekly Reflection Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-2 font-light leading-relaxed">
              Every Sunday: One declassified file analyzed, one civilizational debate unpacked, and our newest video documentary release.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check your inbox this Sunday.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] focus:border-white/20 rounded-full text-xs sm:text-sm text-white placeholder:text-stone-500 outline-none w-full sm:w-80 transition-all"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-stone-200 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center">
                <span className="font-serif text-sm font-semibold text-amber-300">R</span>
              </div>
              <div>
                <span className="font-serif tracking-widest text-base font-medium text-white block">
                  REFLECTION
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                  Voice • Ideas • Action
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              An independent intellectual archive & digital media platform uncovering Indian history, philosophy, constitutional debates, and fearless public discourse.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400/90 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Primary Source Guarantee</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[11px] uppercase font-mono tracking-widest text-stone-400 mb-4">
              Knowledge Vault
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><a href="#videos" className="hover:text-white transition-colors">Video Documentary Hub</a></li>
              <li><a href="#archive" className="hover:text-white transition-colors">Declassified Archive Index</a></li>
              <li><a href="#india" className="hover:text-white transition-colors">Interactive India Map</a></li>
              <li><a href="#timeline" className="hover:text-white transition-colors">5-Epoch History Timeline</a></li>
              <li><a href="#stories" className="hover:text-white transition-colors">Reflection Editorial Stories</a></li>
            </ul>
          </div>

          {/* Audio & Media */}
          <div>
            <h4 className="text-[11px] uppercase font-mono tracking-widest text-stone-400 mb-4">
              Formats & Dialogue
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><a href="#podcasts" className="hover:text-white transition-colors">Reflection Podcasts (Spotify)</a></li>
              <li><a href="#shorts" className="hover:text-white transition-colors">Vertical Archival Shorts</a></li>
              <li><button onClick={onOpenSearch} className="hover:text-white transition-colors text-left">Search Universal Database</button></li>
            </ul>
          </div>

          {/* Civilizational Statement */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase font-mono tracking-widest text-stone-400 mb-2">
              Civilizational Credo
            </h4>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <p className="font-serif text-xs text-amber-200/90 italic leading-relaxed">
                "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः"
              </p>
              <p className="text-[11px] text-stone-400 mt-2 leading-relaxed font-light">
                Truth alone triumphs; not untruth. Through truth the path is spread out, the divine way.
              </p>
              <span className="text-[9px] font-mono text-amber-400/80 block mt-1.5">— Mundaka Upanishad 3.1.6</span>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Reflection Media & Digital Archive. All rights preserved.</p>
          <p className="text-[11px] text-stone-500">
            Engineered with Precision for Amogh & The Reflection Team.
          </p>
        </div>

      </div>
    </footer>
  );
}
