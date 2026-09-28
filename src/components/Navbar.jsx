import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bookmark, 
  Bell, 
  LayoutDashboard, 
  Menu, 
  X
} from 'lucide-react';

export default function Navbar({ 
  onOpenSearch, 
  onOpenBookmarks, 
  onOpenDashboard, 
  savedCount = 0,
  activeSection,
  setActiveSection 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const notifications = [
    { id: 1, title: 'Archival Vault Updated', desc: 'Declassified 1947 Cabinet Minutes uploaded', time: '10m ago' },
    { id: 2, title: 'Studio Live', desc: 'New viral short published on the live feed', time: '1h ago' },
  ];

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'trending', label: 'Trending' },
    { id: 'videos', label: 'Watch' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'india', label: 'India' },
    { id: 'community', label: 'Community' },
  ];

  // Scroll spy & background blur transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['hero', 'trending', 'videos', 'shorts', 'india', 'community'];
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-nav py-3' : 'bg-transparent py-4 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Sleek Brand Emblem & Typography */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 p-[1px] shadow-lg shadow-orange-950/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#09090c] rounded-[7px] flex items-center justify-center">
                <span className="font-cinzel text-xs font-black text-amber-400">
                  R
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel tracking-[0.25em] text-sm sm:text-base font-black text-stone-100 group-hover:text-amber-300 transition-colors">
                REFLECTION
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-stone-400 font-medium -mt-0.5">
                Voice • Ideas • Action
              </span>
            </div>
          </div>

          {/* Centered Minimalist Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-stone-950/40 px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-amber-300 bg-amber-500/15 font-semibold'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-stone-400 hover:text-amber-300 border border-white/[0.06] transition-all flex items-center gap-2 text-xs"
              title="Search Archive (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-stone-400 font-normal">Search</span>
              <kbd className="hidden xl:inline px-1.5 py-0.2 text-[9px] font-mono bg-white/[0.06] text-stone-400 rounded">⌘K</kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-stone-400 hover:text-amber-300 border border-white/[0.06] transition-all relative"
                title="Dispatches"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-72 rounded-2xl glass-card p-4 shadow-2xl z-50">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 block mb-2">Live Dispatches</span>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs">
                        <span className="font-semibold text-stone-200 block">{n.title}</span>
                        <span className="text-stone-400 text-[11px] mt-0.5 block">{n.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-stone-400 hover:text-amber-300 border border-white/[0.06] transition-all relative"
              title="Saved Vault"
            >
              <Bookmark className="w-3.5 h-3.5" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-orange-600 text-stone-100 rounded-full text-[8px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Studio Dashboard Button */}
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-stone-950 font-bold text-xs tracking-wider uppercase hover:from-amber-300 hover:to-orange-300 transition-all shadow-md shadow-amber-500/25 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95"
              title="Open Reflection Studio Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/[0.04] text-stone-300 border border-white/[0.06]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3 rounded-2xl glass-card border border-white/[0.08] space-y-1 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between ${
                  activeSection === item.id
                    ? 'text-amber-300 bg-amber-500/15'
                    : 'text-stone-300 hover:text-stone-100'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-stone-500 text-xs">→</span>
              </button>
            ))}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white text-black flex items-center justify-between mt-2"
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Studio Dashboard</span>
              </span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
