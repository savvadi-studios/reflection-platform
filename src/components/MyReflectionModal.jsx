import React from 'react';
import { 
  X, 
  Bookmark, 
  Play, 
  BookOpen, 
  Trash2, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export default function MyReflectionModal({ 
  isOpen, 
  onClose, 
  savedItems = [], 
  onRemoveItem, 
  onSelectItem 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0a0a0c] border border-white/[0.08] shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] bg-black/40">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif text-lg font-light text-white">
              My Reflection Vault
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/[0.04] text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {savedItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-stone-600 mx-auto" />
              <p className="text-white text-sm font-normal">Your personal vault is empty</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">
                Click the bookmark icon on any documentary, podcast, or archival essay to save it here for later reference.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] flex items-center justify-between gap-4 group transition-all"
                >
                  <div
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={item.thumbnail || item.image || item.videoPoster}
                      alt={item.title}
                      className="w-16 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">
                        {item.category || 'Archive Item'}
                      </span>
                      <h4 className="text-xs font-normal text-white group-hover:text-amber-200 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {item.duration || item.readTime || 'Saved item'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-stone-500 hover:text-red-400 hover:bg-white/[0.05] rounded-full transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
