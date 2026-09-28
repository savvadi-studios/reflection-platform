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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#0c0d10] border border-amber-500/25 shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800/80 bg-stone-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-300">
              Reflection Permanent Archive ID: #{video.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(video)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isSaved 
                  ? 'bg-amber-500 text-stone-950 border-amber-400' 
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:text-amber-400'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{isSaved ? 'Saved in My Reflection' : 'Save Video'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-amber-300 border border-stone-800 transition-colors"
              title="Copy Archive Link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border border-stone-800 transition-colors"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-black/40 to-black/60" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-stone-950 flex items-center justify-center shadow-2xl shadow-orange-600/50 hover:scale-110 transition-transform duration-300"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
                <p className="mt-4 font-cinzel text-xl font-bold text-stone-100 max-w-2xl drop-shadow-md">
                  {video.title}
                </p>
                <span className="text-xs text-amber-300 mt-1 uppercase tracking-widest font-mono">
                  {video.duration} • Full Archival Documentary
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-950 p-6">
              <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-stone-800">
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {video.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {video.rating}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  {video.views} views
                </span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100 leading-snug">
                {video.title}
              </h2>
              <p className="text-xs text-amber-300/80 font-medium mt-1">
                Featuring: <span className="text-amber-200">{video.speaker}</span>
              </p>
            </div>

            {/* Watch on YouTube External Bridge */}
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600/20 hover:bg-red-600/30 text-red-200 hover:text-white border border-red-500/40 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shrink-0 self-start"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-3 border-b border-stone-800 pb-2">
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'sources'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Know the Source (Audit)</span>
            </button>

            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'description'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Full Narrative & Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('related')}
              className={`px-4 py-2 rounded-xl text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 ${
                activeTab === 'related'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Related Archives</span>
            </button>
          </div>

          {/* TAB 1: Know the Source (Core Feature) */}
          {activeTab === 'sources' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Reflection Transparency Guarantee
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    We distinguish between established facts, academic analyses, and editorial opinions.
                    Below is the verified citation breakdown for claims made in this documentary.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {video.claimBreakdown?.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass-panel border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.type === 'fact' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Fact / Primary Source
                          </span>
                        )}
                        {item.type === 'analysis' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-400" />
                            Analysis / Commentary
                          </span>
                        )}
                        {item.type === 'opinion' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                            <HelpCircle className="w-3 h-3 text-purple-400" />
                            Opinion / Panel Perspective
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-stone-200 pl-1 leading-relaxed">
                      "{item.claim}"
                    </p>

                    <div className="text-[11px] text-stone-400 pl-1 pt-1 border-t border-stone-800/60 flex items-center gap-1.5">
                      <span className="text-amber-400 font-semibold">Source:</span>
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
              <p className="text-sm text-stone-300 leading-relaxed">
                {video.description}
              </p>

              <div className="pt-4 border-t border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                  Key Indexed Topics:
                </span>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-stone-900 text-stone-300 text-xs border border-stone-800">
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
                  className="rounded-xl overflow-hidden glass-panel border border-stone-800 cursor-pointer group hover:border-amber-500/40"
                >
                  <div className="relative aspect-video">
                    <img src={rel.thumbnail} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1.5 rounded font-mono text-stone-300">
                      {rel.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-stone-200 line-clamp-2 group-hover:text-amber-300">
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
