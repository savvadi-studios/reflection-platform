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
    <footer className="border-t border-stone-800/80 bg-[#070709] pt-16 pb-12 relative overflow-hidden">
      {/* Ambient glow in footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter / Dispatch Box */}
        <div className="rounded-3xl glass-panel p-8 sm:p-10 border border-amber-500/25 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
              Archival Telegram & Email
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100">
              Receive The Weekly Reflection Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-2">
              Every Sunday: One declassified file analyzed, one civilizational debate unpacked, and our newest video documentary release.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check your inbox this Sunday.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500/50 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 outline-none w-64 sm:w-80"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-orange-950/50"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 p-[1.5px]">
                <div className="w-full h-full bg-[#0a0a0c] rounded-[10px] flex items-center justify-center">
                  <span className="font-cinzel text-lg font-black text-amber-400">R</span>
                </div>
              </div>
              <div>
                <span className="font-cinzel tracking-widest text-lg font-extrabold text-stone-100 block">
                  REFLECTION
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-medium">
                  Voice • Ideas • Action
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              An independent intellectual archive & digital media platform uncovering Indian history, culture, constitutional debates, and fearless public discourse.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Primary Source Guarantee</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-stone-300 mb-4">
              Knowledge Ecosystem
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#videos" className="hover:text-amber-300 transition-colors">Video Documentary Hub</a></li>
              <li><a href="#archive" className="hover:text-amber-300 transition-colors">Declassified Archive Index</a></li>
              <li><a href="#india" className="hover:text-amber-300 transition-colors">Interactive India Map</a></li>
              <li><a href="#timeline" className="hover:text-amber-300 transition-colors">5-Epoch History Timeline</a></li>
              <li><a href="#stories" className="hover:text-amber-300 transition-colors">Reflection Editorial Stories</a></li>
            </ul>
          </div>

          {/* Audio & Media */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-stone-300 mb-4">
              Formats & Dialogue
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#podcasts" className="hover:text-amber-300 transition-colors">Reflection Podcasts (Spotify)</a></li>
              <li><a href="#shorts" className="hover:text-amber-300 transition-colors">Vertical Archival Shorts</a></li>
              <li><a href="#ask-ai" className="hover:text-amber-300 transition-colors">"Ask Reflection" AI Engine</a></li>
              <li><button onClick={onOpenSearch} className="hover:text-amber-300 transition-colors text-left">Search Universal Database</button></li>
            </ul>
          </div>

          {/* Civilizational Statement */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-stone-300 mb-2">
              Civilizational Credo
            </h4>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
              <p className="font-cinzel text-xs text-amber-200/90 italic leading-relaxed">
                "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः"
              </p>
              <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                Truth alone triumphs; not untruth. Through truth the path is spread out, the divine way.
              </p>
              <span className="text-[9px] font-mono text-amber-400 block mt-1">— Mundaka Upanishad 3.1.6</span>
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
