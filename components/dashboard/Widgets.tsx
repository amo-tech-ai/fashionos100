import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Send, Sparkles, AlertCircle } from 'lucide-react';

// Donut Chart
export const DonutChart = () => (
  <div className="relative w-48 h-48 mx-auto">
    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="12" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="113 251" strokeLinecap="round" className="drop-shadow-sm" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="12" strokeDasharray="75 251" strokeDashoffset="-120" strokeLinecap="round" className="drop-shadow-sm" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="55 251" strokeDashoffset="-205" strokeLinecap="round" className="drop-shadow-sm" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-3xl font-bold text-gray-800">2,780</span>
      <span className="text-[10px] uppercase tracking-wider text-gray-400">Total Tickets</span>
    </div>
  </div>
);

// Custom Bar Chart
export const CustomBarChart = () => {
  const data = [35, 55, 40, 70, 50, 60, 85, 45];
  return (
    <div className="flex items-end justify-between h-48 gap-2 pt-4">
       {data.map((h, i) => (
          <div key={i} className="w-full bg-purple-100 rounded-t-sm relative group hover:bg-purple-200 transition-colors cursor-pointer" style={{height: `${h}%`}}>
             <div className="absolute bottom-0 w-full bg-purple-500 rounded-t-sm transition-all duration-500 ease-out" style={{height: `${h * 0.6}%`}}></div>
          </div>
       ))}
    </div>
  );
};

// AI Copilot Widget
interface AICopilotProps {
  title?: string;
  context?: string;
  placeholder?: string;
}

export const AICopilotWidget: React.FC<AICopilotProps> = ({ 
  title = "AI Copilot", 
  context = "You are an expert fashion event planner and creative strategist. Your goal is to help the user optimizing schedules, drafting high-converting marketing copy, and solving logistical challenges. Keep responses professional, concise, and actionable.",
  placeholder = "Ask to draft an invite or optimize a schedule..."
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: [{
            role: 'user',
            parts: [{ text: query }]
        }],
        config: {
            systemInstruction: context,
        }
      });
      setResponse(result.text);
    } catch (e) {
      console.error("AI Widget Error:", e);
      setError("Unable to connect to AI. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden h-full flex flex-col">
        <div className="relative z-10 flex-1 flex flex-col">
           <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300 animate-pulse" size={20} />
              <h3 className="font-serif font-bold text-lg">{title}</h3>
           </div>
           
           <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 flex-1 min-h-[140px] max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent border border-white/10 relative" aria-busy={loading}>
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-white/80" size={24} />
                  <span className="text-xs font-medium text-white/70 animate-pulse">Generating suggestions...</span>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                    <AlertCircle className="text-red-300" size={20} />
                    <p className="text-sm font-medium text-red-100">{error}</p>
                </div>
              ) : (
                <div className="text-sm font-medium opacity-95 leading-relaxed whitespace-pre-wrap font-sans">
                  {response || (
                      <span className="opacity-60 italic">
                          Ready to assist. Try asking: <br/>
                          "Draft an email invite for a summer runway show." <br/>
                          "Create a 2-hour run of show schedule."
                      </span>
                  )}
                </div>
              )}
           </div>

           <div className="relative mt-auto">
              <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleAsk()}
                type="text" 
                placeholder={placeholder}
                className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all shadow-sm placeholder:text-white/40"
                disabled={loading}
              />
              <button 
                onClick={handleAsk} 
                disabled={loading || !query.trim()}
                className="absolute right-1.5 top-1.5 bg-white text-purple-600 p-2 rounded-full hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                 {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
           </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-20%] w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-30 pointer-events-none" />
     </div>
  );
};