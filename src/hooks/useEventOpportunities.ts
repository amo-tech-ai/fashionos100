
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface OpportunityPackage {
  name: string;
  price: number;
  sold: number;
  remaining: number;
  status: string;
}

export interface Opportunity {
  id: string;
  event: string;
  date: string;
  raised: number;
  goal: number;
  status: string;
  packages: OpportunityPackage[];
  image: string;
  missing_categories: string[];
}

export const useEventOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 1. Get Active Events
        const { data: events, error: eventError } = await supabase
          .from('events')
          .select('id, title, start_time, featured_image_url')
          .in('status', ['published', 'draft']) // Include drafts for planning
          .order('start_time', { ascending: true });

        if (eventError) throw eventError;
        if (!events || events.length === 0) { 
            setOpportunities([]);
            setLoading(false); 
            return; 
        }

        // 2. Get all Sponsors for these events
        const eventIds = events.map(e => e.id);
        const { data: sponsors, error: sponsorError } = await supabase
          .from('event_sponsors')
          .select('event_id, level, cash_value, status')
          .in('event_id', eventIds);
        
        if (sponsorError) throw sponsorError;

        // 3. Get Global Packages (to see what's available)
        const { data: packages, error: pkgError } = await supabase
          .from('sponsorship_packages')
          .select('name, default_price, default_slots');
        
        if (pkgError) throw pkgError;

        // 4. Aggregate
        const ops = events.map(event => {
          const eventSponsors = sponsors?.filter(s => s.event_id === event.id) || [];
          const raised = eventSponsors.reduce((sum, s) => sum + (s.cash_value || 0), 0);
          
          // Calculate Goal (Simple heuristic: Sum of all package potential * 0.8)
          // In a real app, this would be a column on the events table
          const estimatedGoal = packages?.reduce((sum, p) => sum + (p.default_price * (p.default_slots || 5)), 0) || 100000;
          
          // Map packages to this event
          const packageStats: OpportunityPackage[] = packages?.map(pkg => {
            const soldCount = eventSponsors.filter(s => s.level === pkg.name).length;
            const totalSlots = pkg.default_slots || 10; // Default if not set
            const remaining = totalSlots - soldCount;
            
            let status = `${remaining} Left`;
            if (remaining <= 0) status = 'Sold Out';
            else if (remaining <= 2) status = 'Low Stock';

            return {
              name: pkg.name,
              price: pkg.default_price,
              sold: soldCount,
              remaining: Math.max(0, remaining),
              status
            };
          }) || [];

          return {
            id: event.id,
            event: event.title,
            date: new Date(event.start_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
            raised,
            goal: estimatedGoal, 
            status: new Date(event.start_time) > new Date() ? 'Active' : 'Completed',
            packages: packageStats,
            image: event.featured_image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
            missing_categories: [] // Placeholder for advanced logic
          };
        });

        setOpportunities(ops);
      } catch (err) {
        console.error("Failed to fetch opportunities", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { opportunities, loading };
};
