
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Ticket, Plus, DollarSign, Users, TrendingUp, Loader2, Save } from 'lucide-react';
import { PageHeader, StatCard } from '../../../components/dashboard/Shared';
import { Button } from '../../../components/Button';
import { FadeIn } from '../../../components/FadeIn';
import { Input } from '../../../components/forms/Input';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../components/Toast';
import { EmptyState } from '../../../components/EmptyState';

interface TicketTier {
  id?: string;
  name: string;
  price: number;
  quantity_total: number;
  quantity_sold: number;
  type: 'paid' | 'free' | 'donation';
}

export const EventTickets: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tiers, setTiers] = useState<TicketTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    if (id) fetchTiers();
  }, [id]);

  const fetchTiers = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('ticket_tiers')
        .select('*')
        .eq('event_id', id)
        .order('price', { ascending: true });

      if (err) throw err;
      setTiers(data || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      error('Failed to load ticket tiers');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Separate new vs existing tiers
      const newTiers = tiers.filter(t => !t.id).map(t => ({ ...t, event_id: id }));
      const existingTiers = tiers.filter(t => t.id);

      // 1. Insert New
      if (newTiers.length > 0) {
        const { error: insertErr } = await supabase.from('ticket_tiers').insert(newTiers);
        if (insertErr) throw insertErr;
      }

      // 2. Update Existing
      for (const tier of existingTiers) {
        const { error: updateErr } = await supabase
          .from('ticket_tiers')
          .update({ 
            name: tier.name, 
            price: tier.price, 
            quantity_total: tier.quantity_total 
          })
          .eq('id', tier.id);
        if (updateErr) throw updateErr;
      }

      success('Ticket tiers saved successfully');
      fetchTiers();
    } catch (err: any) {
      console.error(err);
      error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const addTier = () => {
    setTiers([...tiers, { 
      name: 'New Ticket', 
      price: 0, 
      quantity_total: 100, 
      quantity_sold: 0, 
      type: 'paid' 
    }]);
  };

  const updateTier = (index: number, field: keyof TicketTier, value: any) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTiers(newTiers);
  };

  // KPIs
  const totalRevenue = tiers.reduce((sum, t) => sum + (t.price * t.quantity_sold), 0);
  const totalSold = tiers.reduce((sum, t) => sum + t.quantity_sold, 0);
  const totalCapacity = tiers.reduce((sum, t) => sum + t.quantity_total, 0);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-600" size={32}/></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Tickets & Pricing" 
        subtitle="Manage ticket tiers, pricing, and capacity."
        breadcrumbs={['Dashboard', 'Events', 'Tickets']}
        actionLabel="Add Ticket Tier"
        onAction={addTier}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Gross Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-green-50 text-green-600" />
        <StatCard label="Tickets Sold" value={`${totalSold}/${totalCapacity}`} icon={Ticket} color="bg-purple-50 text-purple-600" />
        <StatCard label="Sales Velocity" value="+12/day" icon={TrendingUp} color="bg-blue-50 text-blue-600" />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
           <h3 className="font-bold text-gray-900">Ticket Configuration</h3>
           <Button size="sm" onClick={handleSave} disabled={saving} className="gap-2">
             {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
             Save Changes
           </Button>
        </div>

        {tiers.length === 0 ? (
          <EmptyState
            icon={Ticket}
            title="No Tickets Configured"
            description="Create ticket tiers to start selling access to your event."
            actionLabel="Add First Tier"
            onAction={addTier}
            className="border-none py-12"
          />
        ) : (
          <div className="p-6 space-y-4">
            {tiers.map((tier, idx) => (
              <FadeIn key={idx} delay={idx * 50}>
                <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex-1 w-full">
                    <Input 
                      label="Ticket Name"
                      value={tier.name}
                      onChange={(e) => updateTier(idx, 'name', e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <Input 
                      label="Price ($)"
                      type="number"
                      value={tier.price}
                      onChange={(e) => updateTier(idx, 'price', parseFloat(e.target.value) || 0)}
                      className="bg-white"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <Input 
                      label="Capacity"
                      type="number"
                      value={tier.quantity_total}
                      onChange={(e) => updateTier(idx, 'quantity_total', parseInt(e.target.value) || 0)}
                      className="bg-white"
                    />
                  </div>
                  <div className="w-full md:w-32">
                     <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 mb-1.5 block">Sold</label>
                     <div className="h-[50px] flex items-center px-4 bg-gray-100 rounded-xl border border-transparent text-gray-500 font-mono text-sm">
                        {tier.quantity_sold}
                     </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
