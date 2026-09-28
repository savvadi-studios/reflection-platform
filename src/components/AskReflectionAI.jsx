import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Play, 
  ArrowRight, 
  FileText, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AI_KNOWLEDGE_BASE } from '../data/reflectionData';

export default function AskReflectionAI({ videos, onSelectVideo }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Namaste! I am Ask Reflection, grounded exclusively in declassified archives, Constituent Assembly debates, and Reflection’s verified documentary library. What historical, cultural, or constitutional topic would you like to explore?',
      sources: ['National Archives of India', 'Lok Sabha CAD Records', 'HMSO Declassified Files'],
      citationVideo: null,
      badge: 'Grounded in Primary Records'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    'What happened during the 1947 Partition?',
    'How was the Indian Constitution drafted?',
    'Tell me about the Chola Navy expeditions',
    'What is the historical struggle for Telangana?',
    'What was Shivaji Maharaj’s guerrilla strategy?'
  ];

  const handleQuery = (queryText) => {
    if (!queryText.trim()) return;

    // Add user message
    const userMsg = { role: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const q = queryText.toLowerCase();

      // Find matching knowledge base entry
      const match = AI_KNOWLEDGE_BASE.find(k => 
        k.keywords.some(word => q.includes(word))
      );

      let responseMsg;

      if (match) {
        responseMsg = {
          role: 'assistant',
          text: match.answer,
          sources: match.sources,
          citationVideo: match.citationVideo,
          badge: match.badge,
          reliability: match.reliability
        };
      } else {
        responseMsg = {
          role: 'assistant',
          text: `In Reflection's archival registry, inquiry into "${queryText}" touches multiple cross-civilizational themes. Our researchers cross-examine primary treaties, gazettes, and oral histories before asserting definitive claims. Explore our full video hub or search specific eras in our Timeline.`,
          sources: ['Reflection Cross-Archive Registry'],
          citationVideo: 'vid-1',
          badge: 'Synthesis Perspective',
          reliability: 'General Historical Context'
        };
      }

      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <section id="ask-ai" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-4">
          <Bot className="w-4 h-4 text-orange-400" />
          <span>Transparent Knowledge Agent</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-stone-100 tracking-wide">
          "Ask Reflection" AI
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
          Grounded strictly in peer-reviewed historiography, CAD parliamentary debates, and declassified archives. 
          No hallucinations. Explicitly marks established facts versus commentary.
        </p>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleQuery(p)}
            className="px-3 py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/30 text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{p}</span>
          </button>
        ))}
      </div>

      {/* Chat Window Deck */}
      <div className="rounded-3xl glass-panel border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col h-[560px]">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0a0c] rounded-[7px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold font-cinzel text-stone-100 block">
                Reflection Knowledge Engine v1.0
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Knowledge Graph • 100% Citation Grounded
              </span>
            </div>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            const citedVideoObj = m.citationVideo ? videos.find(v => v.id === m.citationVideo) : null;

            return (
              <div
                key={idx}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
              >
                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-stone-950 font-semibold rounded-br-none shadow-lg'
                      : 'glass-panel border border-stone-800 text-stone-200 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Sourced Badge & Sources Pill */}
                  {!isUser && m.sources && (
                    <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          {m.badge}
                        </span>
                        {m.reliability && (
                          <span className="text-[10px] text-stone-400 font-mono">
                            {m.reliability}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-stone-400">
                        <span className="text-amber-400 font-semibold">Citations: </span>
                        {m.sources.join(' • ')}
                      </div>

                      {/* Bridge to Watch Referenced Documentary */}
                      {citedVideoObj && (
                        <div 
                          onClick={() => onSelectVideo(citedVideoObj)}
                          className="mt-2 p-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 flex items-center justify-between cursor-pointer group/vid"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src={citedVideoObj.thumbnail} alt="" className="w-12 h-8 rounded object-cover" />
                            <div>
                              <span className="text-[10px] text-amber-400 font-mono block">Related Reflection Documentary:</span>
                              <span className="text-xs font-bold text-stone-200 group-hover/vid:text-amber-300 line-clamp-1">
                                {citedVideoObj.title}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-amber-400 flex items-center gap-1 shrink-0 font-semibold">
                            Watch <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-stone-400 text-xs italic glass-panel p-3 rounded-2xl w-48 border border-stone-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              <span>Verifying primary citations...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery(input);
          }}
          className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about Partition, Constitution CAD debates, Cholas, Telangana..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-3 bg-stone-900 border border-stone-800 focus:border-amber-500/50 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 outline-none transition-all font-medium"
          />
          <button
            type="submit"
            className="p-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-stone-950 font-bold transition-all shadow-lg"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </section>
  );
}
