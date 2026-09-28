import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrendingSection from './components/TrendingSection';
import VideoHub from './components/VideoHub';
import VideoModal from './components/VideoModal';
import ArchiveSearchModal from './components/ArchiveSearchModal';
import InteractiveIndia from './components/InteractiveIndia';
import ShortsModal from './components/ShortsModal';
import MyReflectionModal from './components/MyReflectionModal';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import CommunitySection from './components/CommunitySection';

import AmbientBackground from './components/AmbientBackground';
import { 
  VIDEOS as initialVideos, 
  SHORTS as initialShorts 
} from './data/reflectionData';
import { Zap, Play, Eye, Sparkles, Radio, ArrowRight } from 'lucide-react';

export default function App() {
  // Routing: 'home' or 'dashboard'
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash === '#dashboard' || hash === '#/dashboard' || path === '/dashboard') {
      return 'dashboard';
    }
    return 'home';
  });

  // Persistent Platform State across App & Dashboard
  const [videos, setVideos] = useState(() => {
    try {
      const local = localStorage.getItem('reflection_videos');
      return local ? JSON.parse(local) : initialVideos;
    } catch {
      return initialVideos;
    }
  });

  const [shorts, setShorts] = useState(() => {
    try {
      const local = localStorage.getItem('reflection_shorts');
      return local ? JSON.parse(local) : initialShorts;
    } catch {
      return initialShorts;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const local = localStorage.getItem('reflection_settings');
      return local ? JSON.parse(local) : {
        announcementTicker: '1,200+ Documented Hours • 100% Primary Archives Cited • 28 States & UTs Covered • 4.5M+ Intellectual Thinkers',
        heroTagline: 'See Beyond the Surface.',
        heroDescription: 'Indian history, civilizational roots, constitutional thought, and fearless discourse — indexed with declassified primary sources and archival transparency.',
        broadcastBanner: ''
      };
    } catch {
      return {
        announcementTicker: '1,200+ Documented Hours • 100% Primary Archives Cited • 28 States & UTs Covered • 4.5M+ Intellectual Thinkers',
        heroTagline: 'See Beyond the Surface.',
        heroDescription: 'Indian history, civilizational roots, constitutional thought, and fearless discourse — indexed with declassified primary sources and archival transparency.',
        broadcastBanner: ''
      };
    }
  });

  // Saved bookmarks
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const local = localStorage.getItem('reflection_saved_items');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [shortsModalOpen, setShortsModalOpen] = useState(false);
  const [activeShort, setActiveShort] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  // URL Hash & Popstate Listener for #dashboard
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#dashboard' || hash === '#/dashboard' || path === '/dashboard') {
        setRoute('dashboard');
      } else {
        setRoute('home');
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('reflection_videos', JSON.stringify(videos));
    } catch (e) {
      console.error(e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem('reflection_shorts', JSON.stringify(shorts));
    } catch (e) {
      console.error(e);
    }
  }, [shorts]);

  useEffect(() => {
    try {
      localStorage.setItem('reflection_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('reflection_saved_items', JSON.stringify(savedItems));
    } catch (e) {
      console.error(e);
    }
  }, [savedItems]);

  // Global Keyboard Shortcut: Cmd/Ctrl + K opens search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateToDashboard = () => {
    window.location.hash = 'dashboard';
    setRoute('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    if (window.location.hash === '#dashboard' || window.location.hash === '#/dashboard') {
      window.location.hash = '';
    }
    if (window.location.pathname === '/dashboard') {
      window.history.pushState(null, '', '/');
    }
    setRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetDefaults = () => {
    setVideos(initialVideos);
    setShorts(initialShorts);
    setSettings({
      announcementTicker: '1,200+ Documented Hours • 100% Primary Archives Cited • 28 States & UTs Covered • 4.5M+ Intellectual Thinkers',
      heroTagline: 'See Beyond the Surface.',
      heroDescription: 'Indian history, civilizational roots, constitutional thought, and fearless discourse — indexed with declassified primary sources and archival transparency.',
      broadcastBanner: ''
    });
    localStorage.removeItem('reflection_videos');
    localStorage.removeItem('reflection_shorts');
    localStorage.removeItem('reflection_settings');
  };

  const handleToggleSave = (item) => {
    setSavedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveSaved = (id) => {
    setSavedItems(prev => prev.filter(i => i.id !== id));
  };

  const openShort = (short) => {
    setActiveShort(short);
    setShortsModalOpen(true);
  };

  const handleWatchFullVideoFromShort = (videoId) => {
    const matched = videos.find(v => v.id === videoId);
    if (matched) {
      setSelectedVideo(matched);
    }
  };

  const savedVideoIds = savedItems.filter(i => i.id.startsWith('vid-')).map(i => i.id);

  // If on Dashboard page, render dedicated Dashboard Page
  if (route === 'dashboard') {
    return (
      <DashboardPage
        videos={videos}
        setVideos={setVideos}
        shorts={shorts}
        setShorts={setShorts}
        settings={settings}
        setSettings={setSettings}
        onNavigateHome={navigateToHome}
        onResetDefaults={handleResetDefaults}
      />
    );
  }

  // Otherwise, render Public Website (without Timeline, Know the Source, Podcasts, Stories)
  return (
    <div className="relative min-h-screen bg-[#050608] text-[#ede8df] selection:bg-amber-400/30 selection:text-amber-200 overflow-x-hidden">
      
      {/* Dynamic Luxury Ambient Background (Spotlight, Aurora Orbs, Stardust) */}
      <AmbientBackground />

      {/* Primary Floating Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenDashboard={navigateToDashboard}
        savedCount={savedItems.length}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="relative z-10">
        {/* 1. Cinematic Hero Section */}
        <Hero
          onWatchLatest={() => setSelectedVideo(videos[0])}
          onExploreArchive={() => setSearchOpen(true)}
          onScrollTrending={() => {
            document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' });
          }}
          settings={settings}
        />

        {/* 2. Trending on Reflection */}
        <TrendingSection
          videos={videos}
          shorts={shorts}
          onSelectVideo={setSelectedVideo}
          onSelectShort={openShort}
        />

        {/* 3. Reflection Video Hub */}
        <VideoHub
          videos={videos}
          onSelectVideo={setSelectedVideo}
          onToggleSave={handleToggleSave}
          savedVideoIds={savedVideoIds}
        />

        {/* 4. Reflection Shorts Reel Feed Grid */}
        <section id="shorts" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] tracking-widest uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Bite-sized Archival Insights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-serif">
                Reflection Shorts
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed font-light">
                Vertical 9:16 archival episodes, historical revelations, and primary evidence clips designed for rapid immersion.
              </p>
            </div>
            
            {/* Visual Reel Indicator */}
            <div className="flex items-center gap-3 mt-4 md:mt-0 text-[11px] font-mono text-stone-400">
              <div className="flex items-center gap-1 text-amber-400/80">
                <span className="w-1 h-3 bg-amber-400 animate-pulse" />
                <span className="w-1 h-4 bg-amber-400 animate-pulse" style={{ animationDelay: '0.15s' }} />
                <span className="w-1 h-2 bg-amber-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
              <span>Click Any Card to Enter Reel Mode</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {shorts.map((s) => (
              <div
                key={s.id}
                onClick={() => openShort(s)}
                className="group relative aspect-[9/16] rounded-3xl overflow-hidden glass-card cursor-pointer flex flex-col justify-between p-4 sm:p-5 border border-white/[0.08] hover:border-amber-400/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(245,158,11,0.15)] hover:scale-[1.03] transition-all duration-300"
              >
                {/* Poster Image with Zoom */}
                <img
                  src={s.videoPoster}
                  alt={s.title}
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'; }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 z-0 bg-stone-950"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40 z-10 group-hover:via-black/20 transition-colors" />

                {/* Top Badge & Play Trigger */}
                <div className="relative z-20 flex justify-between items-center">
                  <span className="text-[10px] font-mono font-medium uppercase text-white bg-black/65 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
                    ⚡ Short
                  </span>
                  <div className="w-9 h-9 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all duration-300">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Meta & Title */}
                <div className="relative z-20 space-y-2">
                  <p className="font-serif text-white font-normal text-xs sm:text-sm group-hover:text-amber-200 leading-snug line-clamp-2 drop-shadow-md">
                    {s.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 font-mono border-t border-white/[0.08]">
                    <span className="text-stone-300 font-medium">@{s.author}</span>
                    <span className="flex items-center gap-1 text-amber-300 font-semibold">
                      <Eye className="w-3 h-3 text-amber-400" />
                      {s.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Interactive India Cartography & State Explorer */}
        <InteractiveIndia
          videos={videos}
          onSelectVideo={setSelectedVideo}
        />

        {/* 6. Live Citizen Community Town Hall Group Chat */}
        <CommunitySection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenSearch={() => setSearchOpen(true)} 
        onOpenDashboard={navigateToDashboard}
      />

      {/* MODALS */}
      {/* 1. Deep Video Player & Citation Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          allVideos={videos}
          onClose={() => setSelectedVideo(null)}
          onSelectVideo={setSelectedVideo}
          onToggleSave={handleToggleSave}
          isSaved={savedItems.some(i => i.id === selectedVideo.id)}
        />
      )}

      {/* 2. Global Universal Search Modal */}
      <ArchiveSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        videos={videos}
        shorts={shorts}
        onSelectVideo={setSelectedVideo}
        onSelectShort={openShort}
      />

      {/* 3. Shorts Vertical Player */}
      <ShortsModal
        isOpen={shortsModalOpen}
        onClose={() => setShortsModalOpen(false)}
        shorts={shorts}
        initialShort={activeShort}
        onWatchFullVideo={handleWatchFullVideoFromShort}
        onToggleSave={handleToggleSave}
        isSaved={activeShort ? savedItems.some(i => i.id === activeShort.id) : false}
      />

      {/* 4. My Reflection Bookmarks Modal */}
      <MyReflectionModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        savedItems={savedItems}
        onRemoveItem={handleRemoveSaved}
        onSelectItem={(item) => {
          if (item.id.startsWith('vid-')) {
            setSelectedVideo(item);
          } else if (item.id.startsWith('short-')) {
            openShort(item);
          }
        }}
      />

    </div>
  );
}
