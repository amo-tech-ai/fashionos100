
import { useState, useEffect, useCallback } from 'react';
import { chatService, ChatRoom, ChatMessage } from '../lib/chat-service';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const useChat = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Rooms
  useEffect(() => {
    if (!user) return;
    
    const loadRooms = async () => {
      try {
        const data = await chatService.getRooms();
        setRooms(data);
        if (data.length > 0 && !activeRoomId) {
           setActiveRoomId(data[0].id);
        }
      } catch (error) {
        console.error("Error loading chats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();

    // Subscribe to room updates (new messages in any room)
    // Note: A simplified subscription to chat_messages to update last_message preview
    const roomSub = supabase
      .channel('public:chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, () => {
         loadRooms(); // Refresh room list order/preview
      })
      .subscribe();

    return () => { supabase.removeChannel(roomSub); };
  }, [user]);

  // Fetch Messages for Active Room & Subscribe
  useEffect(() => {
    if (!activeRoomId) return;

    const loadMessages = async () => {
      try {
        const msgs = await chatService.getMessages(activeRoomId);
        setMessages(msgs);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
    loadMessages();

    const messageSub = supabase
      .channel(`room:${activeRoomId}`)
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `room_id=eq.${activeRoomId}` },
        async (payload) => {
            // Optimistically append, but ideally fetch sender info
            const newMsg = payload.new as ChatMessage;
            // Fetch sender details for display
            const { data: sender } = await supabase.from('profiles').select('full_name, avatar_url').eq('id', newMsg.sender_id).single();
            const msgWithSender = { ...newMsg, sender };
            setMessages(prev => [...prev, msgWithSender as ChatMessage]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(messageSub); };
  }, [activeRoomId]);

  const sendMessage = async (content: string) => {
    if (!activeRoomId) return;
    try {
      await chatService.sendMessage(activeRoomId, content);
    } catch (error) {
      console.error("Failed to send message", error);
      throw error;
    }
  };

  return {
    rooms,
    activeRoomId,
    setActiveRoomId,
    messages,
    sendMessage,
    loading
  };
};
