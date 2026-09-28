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
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#0c0d10] border border-amber-500/30 shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg font-bold text-stone-100">
                Reflection Admin CMS & Analytics
              </h3>
              <span className="text-[10px] text-stone-400 font-mono">
                Firebase Cloud Connected • Production Dashboard
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-stone-100 border border-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Analytics KPI Tiles */}
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-stone-400 block mb-3">
              Platform Real-time Telemetry
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl glass-panel border border-stone-800">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase tracking-wider">Total Users</span>
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-cinzel text-2xl font-bold text-stone-100">142,850</span>
                <span className="text-[10px] text-emerald-400 block mt-1">+14.2% this week</span>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-stone-800">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase tracking-wider">Today's Visitors</span>
                  <Eye className="w-4 h-4 text-orange-400" />
                </div>
                <span className="font-cinzel text-2xl font-bold text-stone-100">24,190</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Live Peak</span>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-stone-800">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase tracking-wider">Video Views</span>
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-cinzel text-2xl font-bold text-stone-100">3.8M</span>
                <span className="text-[10px] text-stone-400 block mt-1">48.2k hrs streamed</span>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-stone-800">
                <div className="flex items-center justify-between text-stone-400 mb-1">
                  <span className="text-[10px] uppercase tracking-wider">Verified Sources</span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-cinzel text-2xl font-bold text-stone-100">340+</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Declassified files</span>
              </div>
            </div>
          </div>

          {/* Content Manager: Add Video */}
          <div className="pt-6 border-t border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
                  Content Publishing Pipeline
                </span>
                <h4 className="font-cinzel text-xl font-bold text-stone-100">
                  Publish New Archival Documentary
                </h4>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-cinzel text-xl font-bold text-emerald-300">
                  Documentary Published to Permanent Archive!
                </h4>
                <p className="text-xs text-stone-300">
                  The page and knowledge graph entries have been automatically generated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Documentary Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Battle of Saraighat & Lachit Borphukan"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Speaker / Guest</label>
                    <input
                      type="text"
                      placeholder="e.g. Amogh & Defense Historians"
                      value={speaker}
                      onChange={e => setSpeaker(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none"
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="42:15"
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">YouTube Video ID</label>
                    <input
                      type="text"
                      placeholder="dQw4w9WgXcQ"
                      value={youtubeId}
                      onChange={e => setYoutubeId(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Thumbnail URL</label>
                  <input
                    type="url"
                    value={thumbnail}
                    onChange={e => setThumbnail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">Detailed Description & Archival Background</label>
                  <textarea
                    rows={3}
                    placeholder="Enter comprehensive narrative background and research context..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={e => setTags(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">Primary Source Citation</label>
                    <input
                      type="text"
                      value={primarySource}
                      onChange={e => setPrimarySource(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-950/40"
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
