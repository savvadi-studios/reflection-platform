import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  Zap, 
  MapPin, 
  Settings, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  ArrowLeft, 
  Eye, 
  Flame, 
  Star, 
  CheckCircle2, 
  RefreshCw, 
  Download, 
  Upload, 
  Search, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  ShieldCheck,
  AlertTriangle,
  Play
} from 'lucide-react';
import { CATEGORIES, INDIA_REGIONS } from '../data/reflectionData';

export default function DashboardPage({ 
  videos, 
  setVideos, 
  shorts, 
  setShorts, 
  settings, 
  setSettings, 
  onNavigateHome,
  onResetDefaults 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [videoSearch, setVideoSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  // Video Form State (for adding / editing)
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [videoForm, setVideoForm] = useState({
    title: '',
    speaker: '',
    category: 'history',
    duration: '42:00',
    views: '10K',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    description: '',
    tags: 'India, History, Archives',
    source: 'National Archives of India',
    featured: false,
    trending: true
  });
  const [videoFormSuccess, setVideoFormSuccess] = useState('');

  // Short Form State
  const [shortForm, setShortForm] = useState({
    title: '',
    author: 'Amogh',
    views: '120K',
    likes: 12000,
    comments: 340,
    videoPoster: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    fullVideoId: 'vid-1',
    tags: 'Insight, History'
  });
  const [shortFormSuccess, setShortFormSuccess] = useState('');

  // Settings Form State
  const [localSettings, setLocalSettings] = useState({
    announcementTicker: settings.announcementTicker || '1,200+ Documented Hours • 100% Primary Archives Cited • 28 States & UTs Covered • 4.5M+ Intellectual Thinkers',
    heroTagline: settings.heroTagline || 'See Beyond the Surface.',
    heroDescription: settings.heroDescription || 'Indian history, civilizational roots, constitutional thought, and fearless discourse — indexed with declassified primary sources and archival transparency.',
    broadcastBanner: settings.broadcastBanner || ''
  });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // --- Handlers for Videos ---
  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!videoForm.title.trim()) return;

    if (editingVideoId) {
      // Edit existing
      setVideos(prev => prev.map(v => {
        if (v.id === editingVideoId) {
          return {
            ...v,
            title: videoForm.title,
            speaker: videoForm.speaker,
            category: videoForm.category,
            duration: videoForm.duration,
            youtubeId: videoForm.youtubeId,
            videoUrl: `https://www.youtube.com/watch?v=${videoForm.youtubeId}`,
            thumbnail: videoForm.thumbnail,
            description: videoForm.description,
            tags: typeof videoForm.tags === 'string' ? videoForm.tags.split(',').map(t => t.trim()) : videoForm.tags,
            featured: videoForm.featured,
            trending: videoForm.trending
          };
        }
        return v;
      }));
      setVideoFormSuccess('Video updated successfully in live archive!');
      setEditingVideoId(null);
    } else {
      // Add new
      const newVid = {
        id: `vid-${Date.now()}`,
        title: videoForm.title,
        speaker: videoForm.speaker || 'Reflection Research Desk',
        category: videoForm.category,
        duration: videoForm.duration || '35:00',
        views: videoForm.views || '1.5K',
        date: 'Just now',
        thumbnail: videoForm.thumbnail || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        youtubeId: videoForm.youtubeId || 'dQw4w9WgXcQ',
        videoUrl: `https://www.youtube.com/watch?v=${videoForm.youtubeId || 'dQw4w9WgXcQ'}`,
        featured: videoForm.featured,
        trending: videoForm.trending,
        rating: 'Archival Verified',
        tags: videoForm.tags.split(',').map(t => t.trim()),
        description: videoForm.description || 'Comprehensive documentary research narrative.',
        claimBreakdown: [
          {
            type: 'fact',
            claim: 'Documented entry verified against official records.',
            source: videoForm.source || 'National Archives of India',
            badge: 'Verified Archive Record'
          }
        ]
      };
      setVideos(prev => [newVid, ...prev]);
      setVideoFormSuccess('New documentary published to live platform!');
    }

    // Reset form
    setVideoForm({
      title: '',
      speaker: '',
      category: 'history',
      duration: '42:00',
      views: '10K',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      description: '',
      tags: 'India, History, Archives',
      source: 'National Archives of India',
      featured: false,
      trending: true
    });

    setTimeout(() => setVideoFormSuccess(''), 3000);
  };

  const handleEditVideoClick = (v) => {
    setEditingVideoId(v.id);
    setVideoForm({
      title: v.title,
      speaker: v.speaker,
      category: v.category,
      duration: v.duration,
      views: v.views,
      youtubeId: v.youtubeId,
      thumbnail: v.thumbnail,
      description: v.description,
      tags: Array.isArray(v.tags) ? v.tags.join(', ') : v.tags,
      source: v.claimBreakdown?.[0]?.source || 'National Archives of India',
      featured: !!v.featured,
      trending: !!v.trending
    });
    // Switch to form section or scroll to it
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this documentary from the live platform?')) {
      setVideos(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleToggleTrending = (id) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, trending: !v.trending } : v));
  };

  const handleToggleFeatured = (id) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, featured: !v.featured } : v));
  };

  // --- Handlers for Shorts ---
  const handleSaveShort = (e) => {
    e.preventDefault();
    if (!shortForm.title.trim()) return;

    const newShort = {
      id: `short-${Date.now()}`,
      title: shortForm.title,
      author: shortForm.author || 'Amogh',
      views: shortForm.views || '50K',
      likes: parseInt(shortForm.likes) || 8500,
      comments: parseInt(shortForm.comments) || 210,
      videoPoster: shortForm.videoPoster,
      fullVideoId: shortForm.fullVideoId || 'vid-1',
      tags: typeof shortForm.tags === 'string' ? shortForm.tags.split(',').map(t => t.trim()) : shortForm.tags
    };

    setShorts(prev => [newShort, ...prev]);
    setShortFormSuccess('New Reflection Short added to live feed!');
    setShortForm({
      title: '',
      author: 'Amogh',
      views: '120K',
      likes: 12000,
      comments: 340,
      videoPoster: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      fullVideoId: 'vid-1',
      tags: 'Insight, History'
    });
    setTimeout(() => setShortFormSuccess(''), 3000);
  };

  const handleDeleteShort = (id) => {
    if (window.confirm('Delete this vertical Short from live reels?')) {
      setShorts(prev => prev.filter(s => s.id !== id));
    }
  };

  // --- Handlers for Settings ---
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettings(localSettings);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 2500);
  };

  // --- Data Export / Import ---
  const handleExportData = () => {
    const data = {
      videos,
      shorts,
      settings: localSettings,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reflection-database-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.videos) setVideos(parsed.videos);
        if (parsed.shorts) setShorts(parsed.shorts);
        if (parsed.settings) {
          setSettings(parsed.settings);
          setLocalSettings(parsed.settings);
        }
        alert('Database imported and live website synchronized successfully!');
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Filtered videos for manager table
  const filteredVideos = videos.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(videoSearch.toLowerCase()) || 
                          v.speaker?.toLowerCase().includes(videoSearch.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || v.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#060608] text-[#ede8df] flex flex-col selection:bg-amber-400/30 selection:text-amber-200">
      
      {/* Top Studio Command Bar */}
      <header className="sticky top-0 z-40 bg-[#09090c]/90 border-b border-white/[0.08] backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-stone-300 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Public Website</span>
          </button>

          <div className="h-4 w-[1px] bg-white/[0.1] hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0a0c] rounded-[7px] flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-amber-400">R</span>
              </div>
            </div>
            <div>
              <span className="font-serif tracking-widest text-sm font-medium text-white block">
                REFLECTION STUDIO
              </span>
              <span className="text-[9px] uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Control Center
              </span>
            </div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-stone-400 bg-white/[0.02] px-3 py-1 rounded-full border border-white/[0.06]">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <button
            onClick={onNavigateHome}
            className="px-4 py-1.5 rounded-full bg-white hover:bg-stone-200 text-black text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-lg transition-all hover:scale-[1.02]"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Open Public Site</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[#070709] p-4 sm:p-6 shrink-0 flex flex-row lg:flex-col justify-between overflow-x-auto no-scrollbar">
          <div className="flex flex-row lg:flex-col gap-1.5 w-full">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20'
                  : 'text-stone-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Overview & Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-between transition-all whitespace-nowrap ${
                activeTab === 'videos'
                  ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20'
                  : 'text-stone-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Video Vault Manager</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-stone-300">
                {videos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('shorts')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-between transition-all whitespace-nowrap ${
                activeTab === 'shorts'
                  ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20'
                  : 'text-stone-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Shorts & Reels</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-stone-300">
                {shorts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('india')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center justify-between transition-all whitespace-nowrap ${
                activeTab === 'india'
                  ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20'
                  : 'text-stone-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>India Cartography</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-stone-300">
                {INDIA_REGIONS.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20'
                  : 'text-stone-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Settings className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Platform Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide flex items-center gap-2.5 transition-all whitespace-nowrap ${
                activeTab === 'database'
                  ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/20'
                  : 'text-stone-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Database className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Backup & Reset</span>
            </button>
          </div>

          {/* Quick System Stats */}
          <div className="hidden lg:block pt-6 border-t border-white/[0.06] space-y-3 mt-auto">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] uppercase font-mono text-stone-500 block mb-1">
                Database Sync
              </span>
              <p className="text-xs text-stone-300 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>LocalStorage Active</span>
              </p>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight">
              All edits automatically save and update the live website immediately.
            </p>
          </div>
        </aside>

        {/* Right Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
          
          {/* ========================================================================= */}
          {/* TAB 1: OVERVIEW & TELEMETRY */}
          {/* ========================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Overview Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.06] gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                    Live Operations Command
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Platform Telemetry & Health
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-400 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.06]">
                    ● 24,190 Active Viewers Now
                  </span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl glass-card">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Total Views</span>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="font-serif text-3xl font-light text-white block">3.82M</span>
                  <span className="text-[10px] text-emerald-400 font-mono mt-1 block">+18.4% this month</span>
                </div>

                <div className="p-5 rounded-3xl glass-card">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Watch Hours</span>
                    <Clock className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="font-serif text-3xl font-light text-white block">48.2K</span>
                  <span className="text-[10px] text-stone-400 font-mono mt-1 block">Avg 22m / session</span>
                </div>

                <div className="p-5 rounded-3xl glass-card">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Vault Documentaries</span>
                    <Video className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-serif text-3xl font-light text-white block">{videos.length}</span>
                  <span className="text-[10px] text-amber-400 font-mono mt-1 block">100% Primary Cited</span>
                </div>

                <div className="p-5 rounded-3xl glass-card">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">Vertical Shorts</span>
                    <Zap className="w-4 h-4 text-amber-300" />
                  </div>
                  <span className="font-serif text-3xl font-light text-white block">{shorts.length}</span>
                  <span className="text-[10px] text-stone-400 font-mono mt-1 block">Viral micro-insights</span>
                </div>
              </div>

              {/* Quick Operational Actions Bar */}
              <div className="p-6 rounded-3xl glass-card flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-normal text-white">
                    Need to publish a new documentary or insight?
                  </h3>
                  <p className="text-xs text-stone-400 font-light mt-1">
                    Manage documentary video releases, edit video details, and update live tickers.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setActiveTab('videos')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-stone-200 text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload Documentary</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('shorts')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium uppercase tracking-wider border border-white/[0.08] flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add Short</span>
                  </button>
                </div>
              </div>

              {/* Top Performing Documentaries Table */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block">
                  Top Performing Documentaries On Live Platform
                </span>
                <div className="space-y-2.5">
                  {videos.slice(0, 5).map((v, i) => (
                    <div
                      key={v.id}
                      className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="text-xs font-mono font-bold text-amber-400/90 w-6">
                          0{i + 1}
                        </span>
                        <img src={v.thumbnail} alt={v.title} className="w-16 h-10 object-cover rounded-xl shrink-0" />
                        <div>
                          <h4 className="text-xs sm:text-sm font-normal text-white truncate max-w-md">
                            {v.title}
                          </h4>
                          <span className="text-[10px] font-mono text-stone-500">
                            {v.category} • {v.duration} • {v.views} views
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {v.trending && (
                          <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                            Trending
                          </span>
                        )}
                        {v.featured && (
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Featured
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setActiveTab('videos');
                            handleEditVideoClick(v);
                          }}
                          className="px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-stone-300 hover:text-white text-xs font-mono transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MANAGE VIDEOS (FULL CRUD) */}
          {/* ========================================================================= */}
          {activeTab === 'videos' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.06] gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 block mb-1">
                    Documentary Content Studio
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Video Vault Management
                  </h1>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {videos.length} Documentaries Live
                </span>
              </div>

              {/* Form Success Banner */}
              {videoFormSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{videoFormSuccess}</span>
                </div>
              )}

              {/* Add / Edit Video Panel */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-lg font-normal text-white">
                      {editingVideoId ? 'Edit Documentary Details' : 'Publish New Archival Documentary'}
                    </h3>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      {editingVideoId ? 'Modifying existing entry in the live archive.' : 'Fill details below to instantly publish to the live site.'}
                    </p>
                  </div>
                  {editingVideoId && (
                    <button
                      onClick={() => {
                        setEditingVideoId(null);
                        setVideoForm({
                          title: '',
                          speaker: '',
                          category: 'history',
                          duration: '42:00',
                          views: '10K',
                          youtubeId: 'dQw4w9WgXcQ',
                          thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
                          description: '',
                          tags: 'India, History, Archives',
                          source: 'National Archives of India',
                          featured: false,
                          trending: true
                        });
                      }}
                      className="text-xs font-mono text-stone-400 hover:text-white px-3 py-1 rounded-full bg-white/[0.04]"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveVideo} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Documentary Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Great Partition of 1947: Declassified Files"
                        value={videoForm.title}
                        onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Speaker / Guest</label>
                      <input
                        type="text"
                        placeholder="e.g. Amogh & Dr. Sanjeev Sanyal"
                        value={videoForm.speaker}
                        onChange={e => setVideoForm({ ...videoForm, speaker: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Category</label>
                      <select
                        value={videoForm.category}
                        onChange={e => setVideoForm({ ...videoForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-900 border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      >
                        {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="48:22"
                        value={videoForm.duration}
                        onChange={e => setVideoForm({ ...videoForm, duration: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">YouTube Video ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="dQw4w9WgXcQ"
                        value={videoForm.youtubeId}
                        onChange={e => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Views Count Label</label>
                      <input
                        type="text"
                        placeholder="1.4M"
                        value={videoForm.views}
                        onChange={e => setVideoForm({ ...videoForm, views: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Thumbnail Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={videoForm.thumbnail}
                      onChange={e => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-400 mb-1">Comprehensive Description & Archival Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Enter detailed historical background and archival context..."
                      value={videoForm.description}
                      onChange={e => setVideoForm({ ...videoForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none font-light"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="Partition, Radcliffe, Colonial India"
                        value={videoForm.tags}
                        onChange={e => setVideoForm({ ...videoForm, tags: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Primary Source Reference</label>
                      <input
                        type="text"
                        placeholder="Transfer of Power Documents, Vol. XII, HMSO 1983"
                        value={videoForm.source}
                        onChange={e => setVideoForm({ ...videoForm, source: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* Checkboxes: Trending & Featured */}
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-stone-300">
                      <input
                        type="checkbox"
                        checked={videoForm.trending}
                        onChange={e => setVideoForm({ ...videoForm, trending: e.target.checked })}
                        className="accent-amber-400 rounded"
                      />
                      <span>Mark as Trending on Homepage</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-stone-300">
                      <input
                        type="checkbox"
                        checked={videoForm.featured}
                        onChange={e => setVideoForm({ ...videoForm, featured: e.target.checked })}
                        className="accent-amber-400 rounded"
                      />
                      <span>Feature in Top Spotlight</span>
                    </label>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-white hover:bg-stone-200 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{editingVideoId ? 'Update Documentary' : 'Publish to Live Archive'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Live Videos Table with Search & Filter */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400">
                    Live Video Catalog ({filteredVideos.length})
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search documentaries..."
                        value={videoSearch}
                        onChange={e => setVideoSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded-full text-xs text-white placeholder:text-stone-500 outline-none w-48 sm:w-60 font-mono"
                      />
                    </div>

                    <select
                      value={selectedCategoryFilter}
                      onChange={e => setSelectedCategoryFilter(e.target.value)}
                      className="px-3 py-1.5 bg-stone-900 border border-white/[0.08] rounded-full text-xs text-stone-300 outline-none font-mono"
                    >
                      <option value="all">All Categories</option>
                      {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {filteredVideos.map((v) => (
                    <div
                      key={v.id}
                      className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <img src={v.thumbnail} alt={v.title} className="w-20 h-13 object-cover rounded-xl shrink-0" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                              {v.category}
                            </span>
                            <span className="text-[10px] text-stone-500 font-mono">• {v.duration}</span>
                            <span className="text-[10px] text-stone-500 font-mono">• ID: {v.youtubeId}</span>
                          </div>
                          <h4 className="text-sm font-normal text-white leading-snug">
                            {v.title}
                          </h4>
                          <p className="text-xs text-stone-400 font-light mt-0.5">
                            Speaker: <span className="text-stone-300">{v.speaker}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => handleToggleTrending(v.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all border ${
                            v.trending 
                              ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' 
                              : 'bg-white/[0.02] text-stone-500 border-white/[0.05] hover:text-white'
                          }`}
                          title="Toggle Trending"
                        >
                          🔥 {v.trending ? 'Trending' : 'Make Trending'}
                        </button>

                        <button
                          onClick={() => handleToggleFeatured(v.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all border ${
                            v.featured 
                              ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' 
                              : 'bg-white/[0.02] text-stone-500 border-white/[0.05] hover:text-white'
                          }`}
                          title="Toggle Featured"
                        >
                          ⭐ {v.featured ? 'Featured' : 'Make Featured'}
                        </button>

                        <button
                          onClick={() => handleEditVideoClick(v)}
                          className="p-2 rounded-full bg-white/[0.04] text-stone-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                          title="Edit video"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeleteVideo(v.id)}
                          className="p-2 rounded-full bg-white/[0.04] text-stone-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete video"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MANAGE SHORTS & REELS */}
          {/* ========================================================================= */}
          {activeTab === 'shorts' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.06] gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                    Vertical Reels Engine
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Reflection Shorts Management
                  </h1>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {shorts.length} Shorts Live
                </span>
              </div>

              {shortFormSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{shortFormSuccess}</span>
                </div>
              )}

              {/* Add Short Form */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card">
                <h3 className="font-serif text-lg font-normal text-white mb-4">
                  Add New Vertical Short Reel
                </h3>
                <form onSubmit={handleSaveShort} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Short Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The secret behind the Koh-i-Noor diamond"
                        value={shortForm.title}
                        onChange={e => setShortForm({ ...shortForm, title: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Creator Handle</label>
                      <input
                        type="text"
                        placeholder="Amogh"
                        value={shortForm.author}
                        onChange={e => setShortForm({ ...shortForm, author: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Poster Image URL</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={shortForm.videoPoster}
                        onChange={e => setShortForm({ ...shortForm, videoPoster: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Link to Full Video</label>
                      <select
                        value={shortForm.fullVideoId}
                        onChange={e => setShortForm({ ...shortForm, fullVideoId: e.target.value })}
                        className="w-full px-4 py-2.5 bg-stone-900 border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      >
                        {videos.map(v => (
                          <option key={v.id} value={v.id}>{v.title.slice(0, 45)}...</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">Tags (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="Diamond, Mughals, Loot"
                        value={shortForm.tags}
                        onChange={e => setShortForm({ ...shortForm, tags: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-white hover:bg-stone-200 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Short Reel</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Shorts Grid */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block">
                  Active Vertical Reels ({shorts.length})
                </span>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {shorts.map((s) => (
                    <div
                      key={s.id}
                      className="group rounded-3xl overflow-hidden glass-card p-4 relative aspect-[9/14] flex flex-col justify-between"
                    >
                      <img
                        src={s.videoPoster}
                        alt={s.title}
                        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-70 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 -z-10" />

                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono uppercase text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                          Short
                        </span>
                        <button
                          onClick={() => handleDeleteShort(s.id)}
                          className="p-1.5 rounded-full bg-black/60 text-stone-400 hover:text-red-400 border border-white/10 transition-colors"
                          title="Delete short"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <p className="font-serif text-xs text-white leading-snug line-clamp-2">
                          {s.title}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                          <span>@{s.author}</span>
                          <span>{s.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: INTERACTIVE INDIA CARTOGRAPHY */}
          {/* ========================================================================= */}
          {activeTab === 'india' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.06] gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                    Cartography & Regional Archive
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Interactive India Mapped Regions
                  </h1>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {INDIA_REGIONS.length} Regions Mapped
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INDIA_REGIONS.map((region) => (
                  <div key={region.id} className="p-5 rounded-3xl glass-card space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <h3 className="font-serif text-base font-normal text-white">
                          {region.name}
                        </h3>
                        <span className="text-[10px] text-stone-400 font-mono">
                          • {region.capital}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                        {region.stats?.videos || 0} Docs
                      </span>
                    </div>

                    <p className="text-xs text-amber-300/80 font-mono italic">
                      "{region.tagline}"
                    </p>

                    <p className="text-xs text-stone-300 font-light leading-relaxed">
                      {region.description}
                    </p>

                    <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-stone-400 font-mono">
                      <span>Sources: {region.stats?.sources || 0}</span>
                      <span className="text-emerald-400/90 font-medium">Active on Map Canvas</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: PLATFORM SETTINGS & LIVE ANNOUNCEMENTS */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.06] gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1">
                    Platform Architecture
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Live Broadcast Settings & Ticker
                  </h1>
                </div>
              </div>

              {settingsSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Platform settings saved to live website!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-3xl glass-card space-y-6">
                <div>
                  <label className="block text-xs font-mono text-stone-300 mb-1.5">
                    Live Hero Marquee Ticker (Appears across bottom of Hero)
                  </label>
                  <input
                    type="text"
                    value={localSettings.announcementTicker}
                    onChange={e => setLocalSettings({ ...localSettings, announcementTicker: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none font-mono"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Separate ticker points with • characters.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-300 mb-1.5">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={localSettings.heroTagline}
                    onChange={e => setLocalSettings({ ...localSettings, heroTagline: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none font-serif"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-300 mb-1.5">
                    Hero Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={localSettings.heroDescription}
                    onChange={e => setLocalSettings({ ...localSettings, heroDescription: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl text-xs text-white outline-none font-light"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full bg-white hover:bg-stone-200 text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <span>Save Live Settings</span>
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: BACKUP, IMPORT & RESET */}
          {/* ========================================================================= */}
          {activeTab === 'database' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/[0.06] gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-1">
                    Persistence Engine
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Database Backup, Sync & Restoration
                  </h1>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Export Card */}
                <div className="p-6 rounded-3xl glass-card flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] text-amber-400 flex items-center justify-center mb-3">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-normal text-white mb-1">
                      Export Archive Database
                    </h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      Download complete JSON backup containing all videos, shorts, custom states, and settings.
                    </p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="w-full py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono tracking-wider uppercase border border-white/[0.08] transition-all"
                  >
                    Download JSON
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-6 rounded-3xl glass-card flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] text-emerald-400 flex items-center justify-center mb-3">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-normal text-white mb-1">
                      Import Backup File
                    </h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      Upload a previously exported JSON backup to synchronize and replace active platform records.
                    </p>
                  </div>
                  <label className="w-full py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono tracking-wider uppercase border border-white/[0.08] transition-all text-center cursor-pointer block">
                    <span>Upload JSON File</span>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>
                </div>

                {/* Reset Card */}
                <div className="p-6 rounded-3xl glass-card flex flex-col justify-between space-y-4 border-red-500/20">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-3">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-normal text-white mb-1">
                      Restore Curated Defaults
                    </h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">
                      Reverts all modifications and resets videos, shorts, and settings back to original Reflection defaults.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all platform content back to pristine default archives?')) {
                        onResetDefaults();
                        alert('Platform reset to original curated archives!');
                      }
                    }}
                    className="w-full py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-mono tracking-wider uppercase border border-red-500/20 transition-all"
                  >
                    Reset Everything
                  </button>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
