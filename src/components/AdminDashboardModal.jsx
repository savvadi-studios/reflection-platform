import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Plus, 
  TrendingUp, 
  Users, 
  Eye, 
  FileText, 
  CheckCircle,
  Database,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/reflectionData';

export default function AdminDashboardModal({ 
  isOpen, 
  onClose, 
  onAddVideo 
}) {
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [category, setCategory] = useState('history');
  const [duration, setDuration] = useState('35:00');
  const [youtubeId, setYoutubeId] = useState('dQw4w9WgXcQ');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('History, Archives, India');
  const [primarySource, setPrimarySource] = useState('National Archives of India, Transfer of Power Records');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newVideo = {
      id: `vid-${Date.now()}`,
      title,
      speaker: speaker || 'Reflection Research Desk',
      category,
      duration,
      views: '1.2K',
      date: 'Just now',
      thumbnail,
      youtubeId,
      videoUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
      featured: false,
      trending: false,
      rating: 'Archival Verified',
      tags: tags.split(',').map(t => t.trim()),
      description,
      claimBreakdown: [
        {
          type: 'fact',
          claim: 'Archival entry documented and verified by Reflection editorial standards.',
          source: primarySource,
          badge: 'Verified Archive Record'
        }
      ]
    };

    onAddVideo(newVideo);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0a0a0c] border border-white/[0.08] shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/[0.04] text-amber-400 flex items-center justify-center border border-white/[0.08]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-light text-white">
                Reflection Editorial CMS & Telemetry
              </h3>
              <span className="text-[10px] text-stone-500 font-mono">
                Archival Ingestion Pipeline • Production Studio
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.04] text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Analytics KPI Tiles */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 block mb-3">
              Platform Real-time Telemetry
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Total Users</span>
                  <Users className="w-4 h-4 text-stone-400" />
                </div>
                <span className="font-serif text-2xl font-light text-white">142,850</span>
                <span className="text-[10px] text-emerald-400/90 font-mono block mt-1">+14.2% this week</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Today's Visitors</span>
                  <Eye className="w-4 h-4 text-stone-400" />
                </div>
                <span className="font-serif text-2xl font-light text-white">24,190</span>
                <span className="text-[10px] text-emerald-400/90 font-mono block mt-1">Live Peak</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Video Views</span>
                  <TrendingUp className="w-4 h-4 text-stone-400" />
                </div>
                <span className="font-serif text-2xl font-light text-white">3.8M</span>
                <span className="text-[10px] text-stone-500 font-mono block mt-1">48.2k hrs streamed</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Verified Sources</span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-serif text-2xl font-light text-white">340+</span>
                <span className="text-[10px] text-emerald-400/90 font-mono block mt-1">Declassified files</span>
              </div>
            </div>
          </div>

          {/* Content Manager: Add Video */}
          <div className="pt-6 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block mb-1">
                  Content Publishing Pipeline
                </span>
                <h4 className="font-serif text-xl font-light text-white">
                  Publish New Archival Documentary
                </h4>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-serif text-xl font-normal text-white">
                  Documentary Published to Permanent Archive
                </h4>
                <p className="text-xs text-stone-400 font-light">
                  The page and knowledge graph entries have been automatically generated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Documentary Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Battle of Saraighat & Lachit Borphukan"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Speaker / Guest</label>
                    <input
                      type="text"
                      placeholder="e.g. Amogh & Defense Historians"
                      value={speaker}
                      onChange={e => setSpeaker(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                        <option key={c.id} value={c.id} className="bg-stone-900">{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="42:15"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">YouTube Video ID</label>
                    <input
                      type="text"
                      placeholder="dQw4w9WgXcQ"
                      value={youtubeId}
                      onChange={e => setYoutubeId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-400 mb-1">Thumbnail URL</label>
                  <input
                    type="url"
                    value={thumbnail}
                    onChange={e => setThumbnail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-stone-400 mb-1">Detailed Description & Archival Background</label>
                  <textarea
                    rows={3}
                    placeholder="Enter comprehensive narrative background and research context..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none font-light"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={e => setTags(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Primary Source Citation</label>
                    <input
                      type="text"
                      value={primarySource}
                      onChange={e => setPrimarySource(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-white hover:bg-stone-200 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish & Generate Permanent Vault Entry</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
