import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrendingSection from './components/TrendingSection';
import VideoHub from './components/VideoHub';
import VideoModal from './components/VideoModal';
import ArchiveSearchModal from './components/ArchiveSearchModal';
import InteractiveIndia from './components/InteractiveIndia';
import TimelineSection from './components/TimelineSection';
import KnowTheSourceSection from './components/KnowTheSourceSection';
import PodcastsSection from './components/PodcastsSection';
import ArticlesSection from './components/ArticlesSection';
import ShortsModal from './components/ShortsModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import MyReflectionModal from './components/MyReflectionModal';
import Footer from './components/Footer';

import { 
  VIDEOS as initialVideos, 
  ARTICLES, 
  SHORTS 
} from './data/reflectionData';
import { Zap, Play, Eye, Sparkles } from 'lucide-react';

export default function App() {
  const [videos, setVideos] = useState(initialVideos);
  const [articles] = useState(ARTICLES);
  const [shorts] = useState(SHORTS);

  // Modals state
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [shortsModalOpen, setShortsModalOpen] = useState(false);
  const [activeShort, setActiveShort] = useState(null);

  // Saved items in localStorage
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const local = localStorage.getItem('reflection_saved_items');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  const [activeSection, setActiveSection] = useState('hero');

  // Sync saved items to localStorage
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

  const handleAddVideo = (newVid) => {
    setVideos([newVid, ...videos]);
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
  const savedArticleIds = savedItems.filter(i => i.id.startsWith('art-')).map(i => i.id);

  return (
    <div className="min-h-screen bg-[#08080a] text-[#ede8df] selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Primary Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        savedCount={savedItems.length}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        {/* 1. Cinematic Hero Section */}
        <Hero
          onWatchLatest={() => setSelectedVideo(videos[0])}
          onExploreArchive={() => setSearchOpen(true)}
          onScrollTrending={() => {
            document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Trending on Reflection */}
        <TrendingSection
          videos={videos}
          articles={articles}
          shorts={shorts}
          onSelectVideo={setSelectedVideo}
          onSelectArticle={(art) => {
            // scroll to stories or open
            document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
          }}
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
        <section id="shorts" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-widest mb-1.5">
                <Zap className="w-4 h-4 fill-amber-500" />
                <span>Bite-sized Archival Insights</span>
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-wide">
                Reflection Shorts
              </h2>
            </div>
            <p className="text-xs text-stone-400 mt-2 sm:mt-0 font-mono">
              Vertical Reels • Click to Enter Fullscreen Swipe Mode
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {shorts.map((s) => (
              <div
                key={s.id}
                onClick={() => openShort(s)}
                className="group relative aspect-[9/16] rounded-3xl overflow-hidden glass-panel glass-panel-hover border border-stone-800 cursor-pointer flex flex-col justify-between p-4"
              >
                <img
                  src={s.videoPoster}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 z-10" />

                <div className="relative z-20 flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-300 bg-stone-950/80 px-2 py-0.5 rounded border border-stone-800">
                    ⚡ Short
                  </span>
                  <div className="w-8 h-8 rounded-full bg-orange-600/90 text-stone-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="relative z-20 space-y-1.5">
                  <p className="font-bold text-xs sm:text-sm text-stone-100 group-hover:text-amber-300 leading-snug line-clamp-2">
                    {s.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                    <span>@{s.author}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-amber-400" />
                      {s.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Know the Source Transparency Engine */}
        <KnowTheSourceSection
          onSearchSource={(query) => {
            setSearchOpen(true);
          }}
        />

        {/* 6. Interactive India Cartography & State Explorer */}
        <InteractiveIndia
          videos={videos}
          onSelectVideo={setSelectedVideo}
        />

        {/* 7. Interactive Timeline of 5 Eras */}
        <TimelineSection
          onExploreTopic={(era) => {
            setSearchOpen(true);
          }}
        />

        {/* 8. Reflection Podcasts */}
        <PodcastsSection />

        {/* 9. Reflection Editorial Stories */}
        <ArticlesSection
          onToggleSave={handleToggleSave}
          savedArticleIds={savedArticleIds}
        />
      </main>

      {/* Footer */}
      <Footer onOpenSearch={() => setSearchOpen(true)} />

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
        articles={articles}
        shorts={shorts}
        onSelectVideo={setSelectedVideo}
        onSelectArticle={(art) => {
          document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
        }}
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

      {/* 4. Admin CMS Dashboard */}
      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onAddVideo={handleAddVideo}
      />

      {/* 5. My Reflection Bookmarks Modal */}
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
          } else {
            document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

    </div>
  );
}
