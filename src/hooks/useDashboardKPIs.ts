
import { useState, useEffect } from 'react';
import { dashboardService, DashboardStats } from '../lib/dashboard-service';
import { useAuth } from '../context/AuthContext';

export const useDashboardKPIs = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeShoots: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalRevenue: 0,
    socialGrowth: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const [kpis, activity] = await Promise.all([
          dashboardService.getOverviewStats(user.id),
          dashboardService.getRecentActivity(user.id)
        ]);
        setStats(kpis);
        setRecentActivity(activity);
      } catch (error) {
        console.error('Failed to fetch dashboard KPIs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, recentActivity, loading };
};
