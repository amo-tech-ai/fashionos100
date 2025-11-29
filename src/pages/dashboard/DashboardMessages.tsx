
import React, { useState } from 'react';
import { Search, Send, User, MoreVertical, Phone, Video, Image as ImageIcon, Paperclip } from 'lucide-react';
import { PageHeader } from '../../components/dashboard/Shared';

export const DashboardMessages: React.FC = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [messageInput, setMessageInput] = useState('');
  
  // Mock Chats
  const chats = [
    { id: 0, name: 'Sarah Jenkins', role: 'Model', lastMsg: 'Available for the 14th!', time: '10:30 AM', unread: 2 },
    { id: 1, name: 'Studio 54', role: 'Venue', lastMsg: 'Contract sent for review.', time: 'Yesterday', unread: 0 },
    { id: 2, name: 'Marcus Chen', role: 'Designer', lastMsg: 'Can we change the lighting?', time: '2 days ago', unread: 0 },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hi! Checking availability for the SS25 shoot.', time: '10:00 AM' },
    { id: 2, sender: 'me', text: 'Hey Sarah, yes we have a slot on the 14th. Does that work?', time: '10:15 AM' },
    { id: 3, sender: 'them', text: 'Available for the 14th! What are the call times?', time: '10:30 AM' },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'me', text: messageInput, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col animate-in fade-in duration-500">
      <PageHeader 
        title="Messages" 
        subtitle="Chat with your team and talent." 
        breadcrumbs={['Dashboard', 'Inbox']}
      />

      <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search chats..." className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-100" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat, i) => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeChat === chat.id ? 'bg-purple-50' : ''}`}
              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold shrink-0">
                  {chat.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className={`text-sm font-bold truncate ${activeChat === chat.id ? 'text-purple-900' : 'text-gray-900'}`}>{chat.name}</h4>
                    <span className="text-[10px] text-gray-400">{chat.time}</span>
                  </div>
                  <p className={`text-xs truncate ${chat.unread ? 'font-bold text-gray-900' : 'text-gray-500'}`}>{chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50/30">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                  {chats[activeChat].name[0]}
                </div>
                <div>
                   <h3 className="font-bold text-gray-900">{chats[activeChat].name}</h3>
                   <span className="text-xs text-gray-500 flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"/> Online</span>
                </div>
             </div>
             <div className="flex gap-2 text-gray-400">
                <button className="p-2 hover:bg-gray-100 rounded-full"><Phone size={18}/></button>
                <button className="p-2 hover:bg-gray-100 rounded-full"><Video size={18}/></button>
                <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical size={18}/></button>
             </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${
                     msg.sender === 'me' 
                        ? 'bg-black text-white rounded-tr-none' 
                        : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                  }`}>
                     <p>{msg.text}</p>
                     <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-gray-400' : 'text-gray-400'}`}>{msg.time}</p>
                  </div>
               </div>
             ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
             <form onSubmit={handleSend} className="flex gap-2 items-center">
                <button type="button" className="p-2 text-gray-400 hover:text-purple-600 hover:bg-gray-100 rounded-full"><Paperclip size={20}/></button>
                <button type="button" className="p-2 text-gray-400 hover:text-purple-600 hover:bg-gray-100 rounded-full"><ImageIcon size={20}/></button>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-100"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit" disabled={!messageInput.trim()} className="p-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">
                   <Send size={18} />
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};
