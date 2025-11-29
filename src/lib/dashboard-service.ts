
import { supabase } from './supabase';

export interface DashboardStats {
  totalBookings: number;
  activeShoots: number;
  totalEvents: number;
  upcomingEvents: number;
  totalRevenue: number;
  socialGrowth: number; // Mocked for now
}

export const dashboardService = {
  /**
   * Fetch aggregated stats for the dashboard
   */
  async getOverviewStats(userId?: string): Promise<DashboardStats> {
    // 1. Shoots Stats
    let shootsQuery = supabase.from('shoots').select('id, status, estimated_quote', { count: 'exact' });
    if (userId) shootsQuery = shootsQuery.eq('designer_id', userId);
    
    const { data: shoots, count: totalBookings, error: shootsError } = await shootsQuery;
    
    if (shootsError) throw shootsError;

    const activeShoots = shoots?.filter(s => ['confirmed', 'shooting', 'post_production'].includes(s.status)).length || 0;
    const totalRevenue = shoots?.reduce((acc, curr) => acc + (curr.estimated_quote || 0), 0) || 0;

    // 2. Events Stats
    let eventsQuery = supabase.from('events').select('id, start_time', { count: 'exact' });
    if (userId) eventsQuery = eventsQuery.eq('organizer_id', userId);

    const { data: events, count: totalEvents, error: eventsError } = await eventsQuery;

    if (eventsError) throw eventsError;

    const upcomingEvents = events?.filter(e => new Date(e.start_time) > new Date()).length || 0;

    return {
      totalBookings: totalBookings || 0,
      activeShoots,
      totalEvents: totalEvents || 0,
      upcomingEvents,
      totalRevenue,
      socialGrowth: 18 // Static/Mocked
    };
  },

  /**
   * Get recent activity stream (combining shoots and events)
   */
  async getRecentActivity(userId?: string, limit = 5) {
    const { data: shoots } = await supabase
      .from('shoots')
      .select('id, created_at, status, fashion_category, shoot_type')
      .eq(userId ? 'designer_id' : '', userId || '')
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: events } = await supabase
      .from('events')
      .select('id, created_at, status, title')
      .eq(userId ? 'organizer_id' : '', userId || '')
      .order('created_at', { ascending: false })
      .limit(limit);

    const combined = [
      ...(shoots || []).map(s => ({ 
          ...s, 
          type: 'shoot', 
          title: `${s.shoot_type} - ${s.fashion_category}`,
          description: `Status: ${s.status}`
      })),
      ...(events || []).map(e => ({ 
          ...e, 
          type: 'event',
          description: `Status: ${e.status}`
      }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);

    return combined;
  }
};
