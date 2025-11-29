
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Bot, User } from 'lucide-react';
import { Button } from '../Button';
import { supabaseUrl, supabaseAnonKey } from '../../lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  isAction?: boolean;
}

interface ShootCopilotProps {
  shootId: string;
  context: any;
  onUpdate: () => void;
}

export const ShootCopilot: React.FC<ShootCopilotProps> = ({ shootId, context, onUpdate }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'ai', text: 'Hi! I can help update your brief or add shots. What do you need?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/shoot-agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          shootId,
          message: userMsg.text,
          context
        })
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        text: data.text,
        isAction: data.actions && data.actions.length > 0
      };
      
      setMessages(prev => [...prev, aiMsg]);

      if (data.actions && data.actions.length > 0) {
          onUpdate(); // Refresh parent data
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-t-2xl">
        <div className="flex items-center gap-2">
           <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
             <Sparkles size={16} className="text-yellow-300" />
           </div>
           <span className="font-serif font-bold">Production Copilot</span>
        </div>
        <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded text-white/80">Gemini 2.5</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'}`}>
              {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-gray-900 text-white rounded-tr-sm' 
                : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm'
            }`}>
              <p>{msg.text}</p>
              {msg.isAction && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-wide">
                      <Sparkles size={10} /> Changes Applied
                  </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <Loader2 size={14} className="animate-spin text-purple-500" />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl rounded-tl-sm shadow-sm">
                  <span className="text-xs text-gray-400 font-medium">Thinking...</span>
              </div>
           </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
         <div className="flex gap-2">
             <input 
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-purple-100 transition-all"
                placeholder="Ask to add shots or change brief..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
             />
             <Button 
                size="sm" 
                onClick={handleSend} 
                disabled={!input.trim() || loading}
                className="rounded-xl w-10 h-10 p-0 flex items-center justify-center"
             >
                <Send size={16} />
             </Button>
         </div>
      </div>
    </div>
  );
};
