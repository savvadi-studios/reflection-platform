import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  ArrowUp, 
  ArrowDown, 
  Play, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function ShortsModal({ 
  isOpen, 
  onClose, 
  shorts = [], 
  initialShort = null,
  onWatchFullVideo,
  onToggleSave,
  isSaved = false
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likesState, setLikesState] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: 'Vikram R.', text: 'The acoustics in Golconda are truly mind-boggling!', time: '2h ago' },
    { id: 2, user: 'Ananya S.', text: 'Primary source citations make Reflection 100x better than normal news.', time: '5h ago' },
  ]);

  useEffect(() => {
    if (initialShort) {
      const idx = shorts.findIndex(s => s.id === initialShort.id);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [initialShort, shorts]);

  if (!isOpen || shorts.length === 0) return null;

  const currentShort = shorts[currentIndex] || shorts[0];
  const isLiked = !!likesState[currentShort.id];

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(shorts.length - 1);
    }
  };

  const toggleLike = () => {
    setLikesState(prev => ({
      ...prev,
      [currentShort.id]: !prev[currentShort.id]
    }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentsList([
      { id: Date.now(), user: 'You', text: commentText, time: 'Just now' },
      ...commentsList
    ]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      
      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-2.5 rounded-full bg-stone-900/90 text-stone-300 hover:text-white border border-stone-800 shadow-xl"
        title="Close (Esc)"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Container */}
      <div className="relative flex items-center gap-4 sm:gap-6 w-full justify-center max-w-lg">
        
        {/* Vertical Reel Viewport (Responsive to screen height) */}
        <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[85vh] max-h-[680px] rounded-3xl overflow-hidden bg-[#0a0a0c] border border-amber-500/30 shadow-2xl flex flex-col justify-between my-auto">
          
          {/* Background Reel Poster Image / Video Simulation */}
          <div className="absolute inset-0 z-0 bg-stone-950">
            <img
              src={currentShort.videoPoster}
              alt={currentShort.title}
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'; }}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/95" />
          </div>

          {/* Top Reel Info */}
          <div className="relative z-10 p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md">
                ⚡ Reflection Shorts
              </span>
            </div>
            <span className="text-xs text-stone-300 font-mono bg-black/60 px-2 py-0.5 rounded">
              {currentIndex + 1} / {shorts.length}
            </span>
          </div>

          {/* Right Action Bar (Reels / TikTok style) */}
          <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4">
            {/* Like */}
            <button
              onClick={toggleLike}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-125 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-stone-900/80 text-stone-200 hover:text-red-400'
              }`}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-[10px] font-bold text-stone-200">
                {isLiked ? (currentShort.likes + 1).toLocaleString() : currentShort.likes.toLocaleString()}
              </span>
            </button>

            {/* Comments */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-11 h-11 rounded-full bg-stone-900/80 text-stone-200 hover:text-amber-400 flex items-center justify-center backdrop-blur-md">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-stone-200">
                {currentShort.comments.toLocaleString()}
              </span>
            </button>

            {/* Share */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Short link copied to clipboard!');
              }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-11 h-11 rounded-full bg-stone-900/80 text-stone-200 hover:text-amber-400 flex items-center justify-center backdrop-blur-md">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-stone-200">Share</span>
            </button>

            {/* Save */}
            <button
              onClick={() => onToggleSave(currentShort)}
              className="flex flex-col items-center gap-1"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md ${
                isSaved ? 'bg-amber-500 text-stone-950' : 'bg-stone-900/80 text-stone-200 hover:text-amber-400'
              }`}>
                <Bookmark className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-stone-200">Save</span>
            </button>
          </div>

          {/* Bottom Narrative & "Watch Full Video" */}
          <div className="relative z-10 p-5 pr-16 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300">
                @{currentShort.author}
              </span>
              <span className="text-[10px] text-stone-400">• {currentShort.views} views</span>
            </div>

            <p className="text-sm font-semibold text-stone-100 leading-snug">
              {currentShort.title}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentShort.tags.map(t => (
                <span key={t} className="text-[10px] text-amber-400/90 font-mono">
                  #{t}
                </span>
              ))}
            </div>

            {/* Bridge: Watch Full Video */}
            <button
              onClick={() => {
                onClose();
                onWatchFullVideo(currentShort.fullVideoId);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/50 transition-all hover:scale-[1.02]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Full Archival Documentary →</span>
            </button>
          </div>

          {/* Slide-over Comments Panel */}
          {showComments && (
            <div className="absolute inset-0 z-30 bg-stone-950/95 backdrop-blur-xl p-5 flex flex-col justify-between animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Community Discussion ({commentsList.length})
                </span>
                <button onClick={() => setShowComments(false)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-3">
                {commentsList.map(c => (
                  <div key={c.id} className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
                      <span className="font-bold text-amber-400">{c.user}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-stone-200">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Add your reflection..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 placeholder:text-stone-500 outline-none"
                />
                <button type="submit" className="px-3 py-2 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl">
                  Post
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Up / Down Navigation Controls (Desktop) */}
        <div className="hidden sm:flex flex-col gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-stone-900/90 text-stone-300 hover:text-amber-400 hover:bg-stone-800 border border-stone-800 transition-all shadow-lg"
            title="Previous Short"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-stone-900/90 text-stone-300 hover:text-amber-400 hover:bg-stone-800 border border-stone-800 transition-all shadow-lg"
            title="Next Short"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
