
import { supabase } from './supabase';
import { Database } from '../types/database';

export type ChatRoom = Database['public']['Tables']['chat_rooms']['Row'] & {
  participants?: { user_id: string; full_name?: string; avatar_url?: string }[];
  last_message?: ChatMessage;
};

export type ChatMessage = Database['public']['Tables']['chat_messages']['Row'] & {
  sender?: { full_name?: string; avatar_url?: string };
};

export const chatService = {
  /**
   * Get all chat rooms for the current user
   */
  async getRooms() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // 1. Get room IDs the user is in
    const { data: participations } = await supabase
      .from('chat_participants')
      .select('room_id')
      .eq('user_id', user.id);

    if (!participations || participations.length === 0) return [];
    const roomIds = participations.map(p => p.room_id);

    // 2. Get room details
    const { data: rooms, error } = await supabase
      .from('chat_rooms')
      .select('*')
      .in('id', roomIds)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    // 3. Hydrate with participants and last message (simplified for MVP)
    // In a production app with many rooms, this might need optimization or a view
    const enrichedRooms = await Promise.all(rooms.map(async (room) => {
        const { data: parts } = await supabase
            .from('chat_participants')
            .select('user_id')
            .eq('room_id', room.id);
        
        // Fetch profile details for participants
        const participantsDetails = await Promise.all((parts || []).map(async (p) => {
            const { data: profile } = await supabase
                .from('profiles')
                .select('full_name, avatar_url')
                .eq('id', p.user_id)
                .single();
            return { user_id: p.user_id, ...profile };
        }));

        const { data: lastMsg } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('room_id', room.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        return {
            ...room,
            participants: participantsDetails,
            last_message: lastMsg
        };
    }));

    return enrichedRooms as ChatRoom[];
  },

  /**
   * Get messages for a specific room
   */
  async getMessages(roomId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        sender:profiles(full_name, avatar_url)
      `)
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as ChatMessage[];
  },

  /**
   * Send a message
   */
  async sendMessage(roomId: string, content: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        room_id: roomId,
        sender_id: user.id,
        content
      })
      .select()
      .single();

    if (error) throw error;
    
    // Update room updated_at
    await supabase.from('chat_rooms').update({ updated_at: new Date().toISOString() }).eq('id', roomId);

    return data;
  }
};
