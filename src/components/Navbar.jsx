import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  Bell, 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  Sparkles,
  Flame,
  Radio,
  FileText,
  Bot
} from 'lucide-react';

export default function Navbar({ 
  onOpenSearch, 
  onOpenBookmarks, 
  onOpenAdmin, 
  savedCount = 0,
  activeSection,
  setActiveSection 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Archive Release', desc: 'Declassified 1947 Cabinet Minutes uploaded to Archive', time: '10m ago', unread: true },
    { id: 2, title: 'Podcast Live', desc: 'Ep. 48: De-dollarization & India Century streaming now', time: '1h ago', unread: true },
    { id: 3, title: 'Fact Check Updated', desc: 'Constitutional Assembly CAD references verified', time: '4h ago', unread: false },
  ];

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'videos', label: 'Video Hub' },
    { id: 'archive', label: 'Archive' },
    { id: 'india', label: 'Interactive India' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'stories', label: 'Stories' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'shorts', label: 'Shorts' },
  ];

  React.useEffect(() => {
    const sections = ['hero', 'videos', 'archive', 'india', 'timeline', 'stories', 'podcasts', 'shorts'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-400 p-[1.5px] shadow-lg shadow-orange-950/40 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0d0d10] rounded-[10px] flex items-center justify-center">
                <span className="font-cinzel text-xl font-black bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-fill-transparent text-transparent">
                  R
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel tracking-[0.22em] text-xl font-extrabold text-amber-50 group-hover:text-amber-300 transition-colors">
                  REFLECTION
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                  ARCHIVE
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-200/50 font-medium">
                Voice • Ideas • Action
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1 2xl:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 transition-all text-xs"
              title="Search Archive"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline font-medium text-stone-400">Search Archive...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-800 text-stone-400 rounded border border-stone-700">⌘K</kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 transition-all relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>

              {/* Notification Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel p-4 shadow-2xl border border-amber-500/20 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-300">Live Dispatches</span>
                    <span className="text-[10px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div className="mt-3 space-y-2.5">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-stone-900/60 hover:bg-stone-800/80 transition-colors border border-stone-800/60 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-200">{n.title}</span>
                          <span className="text-[10px] text-stone-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-1 leading-snug">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Items */}
            <button
              onClick={onOpenBookmarks}
              className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 transition-all relative"
              title="My Reflection (Saved)"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 text-amber-100 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Admin CMS */}
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600/20 to-orange-600/20 hover:from-amber-600/30 hover:to-orange-600/30 text-amber-300 border border-amber-500/30 transition-all text-xs font-bold"
              title="Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin CMS</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-amber-300 border border-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-stone-800/80 space-y-1.5 animate-in slide-in-from-top-4 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-stone-300 hover:text-amber-300 hover:bg-stone-900 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-amber-500/50 text-xs">→</span>
              </button>
            ))}
            <div className="pt-2 border-t border-stone-800">
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-amber-400 hover:bg-stone-900 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin CMS Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
