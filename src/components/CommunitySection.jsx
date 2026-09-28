import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Smile, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Flame, 
  Pin, 
  Radio, 
  BookOpen, 
  Scale, 
  MapPin,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Heart
} from 'lucide-react';
import { 
  COMMUNITY_CHANNELS, 
  COMMUNITY_INITIAL_MESSAGES 
} from '../data/reflectionData';

export default function CommunitySection() {
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [messages, setMessages] = useState(() => {
    try {
      const local = localStorage.getItem('reflection_community_messages');
      return local ? JSON.parse(local) : COMMUNITY_INITIAL_MESSAGES;
    } catch {
      return COMMUNITY_INITIAL_MESSAGES;
    }
  });

  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('reflection_user_handle') || 'Citizen Scholar';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  
  const chatScrollRef = useRef(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('reflection_community_messages', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('reflection_user_handle', userName);
    } catch (e) {
      console.error(e);
    }
  }, [userName]);

  const activeChannel = COMMUNITY_CHANNELS.find(c => c.id === activeChannelId) || COMMUNITY_CHANNELS[0];
  const channelMessages = messages.filter(m => m.channelId === activeChannelId);

  // Auto scroll to latest message when channel or messages change
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeChannelId, messages.length]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      channelId: activeChannelId,
      author: userName,
      handle: `@${userName.toLowerCase().replace(/\s+/g, '_')}`,
      role: 'Citizen Scholar',
      roleColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      timestamp: 'Just now',
      text: inputMessage.trim(),
      reactions: { '💡': 1, '🔥': 1 }
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
  };

  const handleReaction = (msgId, emoji) => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId) {
        const currentCount = m.reactions?.[emoji] || 0;
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [emoji]: currentCount + 1
          }
        };
      }
      return m;
    }));
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const channelIcons = {
    MessageSquare: <MessageSquare className="w-4 h-4" />,
    BookOpen: <BookOpen className="w-4 h-4" />,
    Scale: <Scale className="w-4 h-4" />,
    MapPin: <MapPin className="w-4 h-4" />
  };

  return (
    <section id="community" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold">
              Live Citizen Town Hall
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight">
            Reflection Community
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-3 md:mt-0 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{activeChannel.memberCount}</span>
          </div>
        </div>
      </div>

      {/* Main Community Terminal Card */}
      <div className="rounded-3xl glass-card border border-white/[0.1] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Column: Channels Sidebar (4 cols) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between bg-black/40">
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
                Discourse Rooms
              </span>
              <span className="text-[10px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                4 Active Rooms
              </span>
            </div>

            {/* Channels List */}
            <div className="space-y-1.5">
              {COMMUNITY_CHANNELS.map((ch) => {
                const isActive = activeChannelId === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannelId(ch.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-lg shadow-amber-500/10'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] text-stone-300 hover:text-white border border-white/[0.04]'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      isActive ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-white/[0.05] text-stone-400'
                    }`}>
                      {channelIcons[ch.icon] || <MessageSquare className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-stone-100 block truncate">
                          #{ch.name}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 font-light">
                        {ch.topic}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Citizen Identity Badge / Handle Switcher */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 block">
                Your Community Identity:
              </span>

              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white/[0.06] border border-amber-400/50 rounded-xl text-xs text-white outline-none font-medium"
                    placeholder="Enter handle..."
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-xs text-stone-950">
                      {userName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-stone-200 block">{userName}</span>
                      <span className="text-[10px] font-mono text-amber-400/80">Citizen Contributor</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setTempName(userName); setIsEditingName(true); }}
                    className="text-[10px] font-mono text-stone-400 hover:text-amber-300 underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Guidelines Box */}
          <div className="pt-4 border-t border-white/[0.06] text-[11px] text-stone-400 space-y-1">
            <div className="flex items-center gap-1.5 text-stone-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evidence-First Principles</span>
            </div>
            <p className="text-[10px] text-stone-400 font-light leading-relaxed">
              Discourse here is grounded in primary archival citations, peer respect, and fearless inquiry.
            </p>
          </div>

        </div>

        {/* Right Column: Group Chat Stream & Live Composer (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-black/25">
          
          {/* Cyber Telemetry Status Bar */}
          <div className="px-4 py-1.5 bg-black/60 border-b border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-stone-400 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DISCOURSE CHANNEL SECURE // 256-BIT SYNC</span>
            </div>
            <div className="flex items-center gap-3">
              <span>LATENCY: 18ms</span>
              <span className="text-amber-400">TELEMETRY: ACTIVE</span>
            </div>
          </div>

          {/* Room Header & Pinned Prompt */}
          <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.01]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-amber-400 text-sm font-bold">#{activeChannel.name}</span>
                <span className="text-[10px] font-mono text-stone-400 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">
                  Live Stream
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 font-light">
                {activeChannel.topic}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-stone-400">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{channelMessages.length} Messages in Room</span>
            </div>
          </div>

          {/* Pinned Topic Banner with Specular Shimmer */}
          <div className="relative overflow-hidden px-4 sm:px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2 text-xs text-amber-200">
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent skew-x-[-25deg] pointer-events-none animate-shimmer" />
            <Pin className="w-3.5 h-3.5 text-amber-400 shrink-0 relative z-10" />
            <span className="font-semibold text-amber-300 font-mono text-[11px] relative z-10">Pinned Topic:</span>
            <span className="text-stone-300 truncate relative z-10">
              "How do declassified documents change our understanding of 20th century Indian history?"
            </span>
          </div>

          {/* Chat Message Stream */}
          <div 
            ref={chatScrollRef}
            className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[460px] scrollbar-thin"
          >
            {channelMessages.map((msg) => (
              <div 
                key={msg.id} 
                className="group p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1] transition-all space-y-2"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={msg.avatar}
                      alt={msg.author}
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'; }}
                      className="w-8 h-8 rounded-full object-cover border border-white/[0.1]"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-xs sm:text-sm text-stone-100">
                          {msg.author}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          {msg.handle}
                        </span>
                        <span className={`text-[9px] font-mono px-2 py-0.2 rounded-full border ${msg.roleColor}`}>
                          {msg.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-stone-400">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Message Body */}
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed pl-10">
                  {msg.text}
                </p>

                {/* Reactions Row */}
                <div className="pl-10 pt-1 flex items-center gap-1.5 flex-wrap">
                  {Object.entries(msg.reactions || {}).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(msg.id, emoji)}
                      className="px-2 py-0.5 rounded-full bg-white/[0.04] hover:bg-amber-400/20 hover:border-amber-400/40 text-stone-300 text-[11px] font-mono border border-white/[0.06] flex items-center gap-1 transition-all"
                    >
                      <span>{emoji}</span>
                      <span className="font-semibold text-[10px] text-amber-300">{count}</span>
                    </button>
                  ))}

                  {/* Quick Add Reaction Triggers */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ml-2">
                    {['🔥', '💡', '🇮🇳', '👏'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(msg.id, emoji)}
                        title={`React with ${emoji}`}
                        className="text-xs hover:scale-125 transition-transform px-1 py-0.5"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Message Composer Input Form */}
          <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#0c0d13]">
            <form onSubmit={handleSendMessage} className="space-y-2">
              
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Message #${activeChannel.name} as ${userName}...`}
                  className="w-full pl-4 pr-12 py-3 bg-white/[0.04] border border-white/[0.08] focus:border-amber-400/60 focus:bg-white/[0.07] rounded-2xl text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 outline-none transition-all shadow-inner"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className={`absolute right-2 p-2 rounded-xl transition-all ${
                    inputMessage.trim()
                      ? 'bg-amber-400 text-stone-950 font-bold hover:scale-105 shadow-md shadow-amber-400/30'
                      : 'bg-white/[0.04] text-stone-600 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>

              {/* Quick Emojis & Tips */}
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-stone-400">Quick cite:</span>
                  {['📜 Primary Source', '💡 Insight', '🇮🇳 Heritage', '🔥 Viral'].map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setInputMessage(prev => prev ? `${prev} [${tag}]` : `[${tag}] `)}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] hover:bg-white/[0.08] text-[10px] text-stone-400 hover:text-amber-300 border border-white/[0.04] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <span className="hidden sm:inline text-[10px] text-stone-400">
                  Press Enter ↵ to Send
                </span>
              </div>

            </form>
          </div>

        </div>

      </div>

    </section>
  );
}
