
import { useState, useEffect, useCallback } from 'react';
import { eventService, Event } from '../lib/event-service';
import { useToast } from '../components/Toast';

export const useEvents = (initialFilters?: { organizerId?: string; status?: string; limit?: number }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { error: showError } = useToast();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents(initialFilters);
      setEvents(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(initialFilters)]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // KPI Calculations
  const kpis = {
    totalEvents: events.length,
    upcoming: events.filter(e => new Date(e.start_time) > new Date()).length,
    revenue: 0 // Placeholder
  };

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    kpis
  };
};
