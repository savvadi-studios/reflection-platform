import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  Clock, 
  Eye, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles,
  Play
} from 'lucide-react';

export default function VideoModal({ 
  video, 
  allVideos = [], 
  onClose, 
  onSelectVideo, 
  onToggleSave, 
  isSaved = false 
}) {
  const [activeTab, setActiveTab] = useState('sources');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const related = allVideos.filter(v => v.id !== video.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0a0a0c] border border-white/[0.08] shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-black/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[11px] font-mono tracking-widest text-stone-400 uppercase">
              Reflection Permanent Archive ID: #{video.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(video)}
              className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSaved 
                  ? 'bg-amber-400 text-black font-semibold' 
                  : 'bg-white/[0.04] text-stone-300 hover:text-white border border-white/[0.06]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isSaved ? 'Saved in Vault' : 'Save Video'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/[0.04] text-stone-300 hover:text-white border border-white/[0.06] transition-colors"
              title="Copy Archive Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.04] text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-black group">
          {!isPlaying ? (
            <div className="relative w-full h-full">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-black/30 to-black/60" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </button>
                <p className="mt-4 font-serif text-lg sm:text-2xl font-normal text-white max-w-2xl drop-shadow-md">
                  {video.title}
                </p>
                <span className="text-[11px] text-stone-400 mt-1 uppercase tracking-widest font-mono">
                  {video.duration} • Archival Documentary
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-950 p-6">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/[0.08]">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* Video Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          
          {/* Title & Metadata Strip */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20">
                  {video.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {video.rating}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  {video.views} views
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-white leading-snug">
                {video.title}
              </h2>
              <p className="text-xs text-stone-400 font-light mt-1">
                Dialogue With: <span className="text-stone-200 font-normal">{video.speaker}</span>
              </p>
            </div>

            {/* Watch on YouTube External Bridge */}
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-stone-300 hover:text-white border border-white/[0.08] text-xs font-mono uppercase tracking-wider transition-all shrink-0 self-start"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'sources'
                  ? 'bg-white text-black font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Know the Source (Audit)</span>
            </button>

            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'description'
                  ? 'bg-white text-black font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Narrative & Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('related')}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'related'
                  ? 'bg-white text-black font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Related Archives</span>
            </button>
          </div>

          {/* TAB 1: Know the Source (Core Feature) */}
          {activeTab === 'sources' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                    Reflection Transparency Guarantee
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed font-light">
                    Every factual assertion in this production is indexed against verified records. Distinguish primary archives from historiographical debate.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {video.claimBreakdown?.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] space-y-2 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.type === 'fact' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Fact / Primary Source
                          </span>
                        )}
                        {item.type === 'analysis' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-400" />
                            Analysis / Commentary
                          </span>
                        )}
                        {item.type === 'opinion' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-stone-300 bg-white/[0.06] border border-white/[0.1] flex items-center gap-1">
                            <HelpCircle className="w-3 h-3 text-stone-400" />
                            Opinion / Panel Perspective
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 bg-white/[0.04] px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs font-light text-white pl-1 leading-relaxed">
                      "{item.claim}"
                    </p>

                    <div className="text-[11px] text-stone-400 pl-1 pt-1 border-t border-white/[0.04] flex items-center gap-1.5 font-light">
                      <span className="text-amber-400 font-mono text-[10px] uppercase">Source:</span>
                      <span className="text-stone-300 italic">{item.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Full Narrative */}
          {activeTab === 'description' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                {video.description}
              </p>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-2">
                  Key Indexed Topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {video.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.04] text-stone-300 text-xs border border-white/[0.06]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Related Videos */}
          {activeTab === 'related' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectVideo(rel)}
                  className="rounded-2xl overflow-hidden glass-card cursor-pointer group hover:scale-[1.02] transition-all"
                >
                  <div className="relative aspect-video">
                    <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-2 py-0.5 rounded-full font-mono text-stone-300">
                      {rel.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-normal text-white line-clamp-2 group-hover:text-amber-200">
                      {rel.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
