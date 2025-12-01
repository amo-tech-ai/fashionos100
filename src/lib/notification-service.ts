
import { supabase } from './supabase';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export const notificationService = {
  /**
   * Create a notification for a specific user
   */
  async create({
    userId,
    title,
    message,
    type = 'info'
  }: {
    userId: string;
    title: string;
    message: string;
    type?: NotificationType;
  }) {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title,
          message,
          type,
          is_read: false
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Failed to create notification:', error);
      return false;
    }
  },

  /**
   * Create a notification for the owner of an event/resource
   * useful when the current user triggers an action that affects an admin/owner
   */
  async notifyOwner({
    ownerId,
    title,
    message,
    type = 'info'
  }: {
    ownerId: string;
    title: string;
    message: string;
    type?: NotificationType;
  }) {
    return this.create({ userId: ownerId, title, message, type });
  },

  /**
   * Mark all notifications as read for the current user
   */
  async markAllRead() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id);
  }
};
