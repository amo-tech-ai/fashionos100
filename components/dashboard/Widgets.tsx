import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Send, Sparkles } from 'lucide-react';

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
  context = "You are a fashion creative director assistant. Keep response concise (max 30 words).",
  placeholder = "Ask anything..."
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  
  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${context} Answer: ${query}`,
      });
      setResponse(result.text);
    } catch (e) {
      setResponse("Offline mode. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden h-full">
        <div className="relative z-10">
           <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-300 animate-pulse" size={20} />
              <h3 className="font-serif font-bold text-lg">{title}</h3>
           </div>
           
           <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 min-h-[80px] flex items-center justify-center text-center border border-white/10">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <p className="text-sm font-medium opacity-90 leading-relaxed">{response || "How can I help you today?"}</p>
              )}
           </div>

           <div className="relative">
              <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                type="text" 
                placeholder={placeholder}
                className="w-full bg-white text-gray-900 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none shadow-lg placeholder:text-gray-400"
              />
              <button onClick={handleAsk} className="absolute right-1 top-1 bg-indigo-600 p-2 rounded-full hover:bg-indigo-700 transition-colors text-white">
                 <Send size={14} />
              </button>
           </div>
        </div>
        <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-pink-500 rounded-full blur-[80px] opacity-40" />
        <div className="absolute bottom-[-20%] left-[-20%] w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-40" />
     </div>
  );
};