
import React, { useState } from 'react';
import { Search, Send, Phone, Video, Image as ImageIcon, Paperclip, MoreVertical, Loader2 } from 'lucide-react';
import { PageHeader } from '../../components/dashboard/Shared';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../context/AuthContext';

export const DashboardMessages: React.FC = () => {
  const { rooms, activeRoomId, setActiveRoomId, messages, sendMessage, loading } = useChat();
  const { user } = useAuth();
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    try {
      await sendMessage(messageInput);
      setMessageInput('');
    } catch (e) {
      // Handle error visibility if needed
    }
  };

  const activeRoom = rooms.find(r => r.id === activeRoomId);
  const otherParticipant = activeRoom?.participants?.find(p => p.user_id !== user?.id) || { full_name: 'Unknown', avatar_url: '' };
  
  // Derived chat name logic: If group, use name. If direct, use other person's name.
  const getRoomName = (room: any) => {
      if (room.type === 'group' && room.name) return room.name;
      const other = room.participants?.find((p: any) => p.user_id !== user?.id);
      return other?.full_name || 'Chat';
  };
  
  const getRoomAvatar = (room: any) => {
      const other = room.participants?.find((p: any) => p.user_id !== user?.id);
      return other?.avatar_url || null;
  };

  const getInitials = (name: string) => name ? name.substring(0,1).toUpperCase() : '?';

  const filteredRooms = rooms.filter(r => getRoomName(r).toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
      return (
        <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-purple-600" size={32} />
        </div>
      );
  }

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
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-100" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredRooms.length === 0 && (
                <div className="p-8 text-center text-gray-400 text-sm">
                    No chats found.
                </div>
            )}
            {filteredRooms.map((room) => {
              const roomName = getRoomName(room);
              const avatar = getRoomAvatar(room);
              const isActive = activeRoomId === room.id;
              
              return (
                <div 
                  key={room.id} 
                  onClick={() => setActiveRoomId(room.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${isActive ? 'bg-purple-50' : ''}`}
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold shrink-0 overflow-hidden">
                    {avatar ? <img src={avatar} alt={roomName} className="w-full h-full object-cover" /> : getInitials(roomName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className={`text-sm font-bold truncate ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>{roomName}</h4>
                      <span className="text-[10px] text-gray-400">
                          {room.last_message ? new Date(room.last_message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${isActive ? 'text-purple-700' : 'text-gray-500'}`}>
                        {room.last_message?.content || 'Start a conversation'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50/30">
          {/* Chat Header */}
          {activeRoomId ? (
            <>
                <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                            {otherParticipant.avatar_url ? <img src={otherParticipant.avatar_url} alt={otherParticipant.full_name} className="w-full h-full object-cover"/> : getInitials(otherParticipant.full_name || 'Chat')}
                        </div>
                        <div>
                        <h3 className="font-bold text-gray-900">{getRoomName(activeRoom)}</h3>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"/> Active</span>
                        </div>
                    </div>
                    <div className="flex gap-2 text-gray-400">
                        <button className="p-2 hover:bg-gray-100 rounded-full"><Phone size={18}/></button>
                        <button className="p-2 hover:bg-gray-100 rounded-full"><Video size={18}/></button>
                        <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical size={18}/></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col-reverse">
                    {[...messages].reverse().map((msg) => {
                        const isMe = msg.sender_id === user?.id;
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${
                                    isMe 
                                        ? 'bg-black text-white rounded-tr-none' 
                                        : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                                }`}>
                                    <p>{msg.content}</p>
                                    <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-gray-400' : 'text-gray-400'}`}>
                                        {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 py-12 text-sm">
                            No messages yet. Say hello!
                        </div>
                    )}
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 flex-col">
                <Search size={48} className="mb-4 opacity-20" />
                <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
