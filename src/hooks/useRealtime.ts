
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Subscribes to realtime changes on a specific table.
 * @param table The table name to listen to
 * @param callback Function to execute when a change occurs
 * @param event Optional event filter (INSERT, UPDATE, DELETE, or *)
 * @param filter Optional filter string (e.g. 'id=eq.123')
 */
export const useRealtime = (
  table: string,
  callback: (payload: any) => void,
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
  filter?: string
) => {
  useEffect(() => {
    const channelName = `public:${table}${filter ? `:${filter}` : ''}`;
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: event,
          schema: 'public',
          table: table,
          filter: filter,
        },
        (payload) => {
          // console.log(`Realtime update on ${table}:`, payload);
          callback(payload);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          // console.log(`Subscribed to ${channelName}`);
        } else if (status === 'CHANNEL_ERROR') {
          console.error(`Failed to subscribe to ${channelName}`);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event, filter, callback]);
};
