
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Clock, MapPin, MoreHorizontal, Trash2, Calendar } from 'lucide-react';
import { PageHeader } from '../../../components/dashboard/Shared';
import { Button } from '../../../components/Button';
import { FadeIn } from '../../../components/FadeIn';
import { Input } from '../../../components/forms/Input';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../components/Toast';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location_in_venue: string;
}

export const EventRunOfShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { success, error } = useToast();

  // New Item State
  const [newItem, setNewItem] = useState({
    title: '',
    time: '',
    duration: '60',
    description: '',
    location: ''
  });

  useEffect(() => {
    if (id) fetchSchedule();
  }, [id]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('event_schedules')
        .select('*')
        .eq('event_id', id)
        .order('start_time', { ascending: true });

      if (err) throw err;
      setItems(data || []);
    } catch (err) {
      console.error('Error loading schedule:', err);
      error('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!id || !newItem.title || !newItem.time) return;

    try {
      // Construct ISO dates
      // Note: In a real app, we'd merge this with the event date. 
      // For MVP we assume "today" or just store the time component if possible, 
      // but standard ISO requires a date. We'll pick a dummy date or the event's date if we fetched it.
      // Here we'll use a dummy date base for sorting.
      const baseDate = new Date().toISOString().split('T')[0]; 
      const start = new Date(`${baseDate}T${newItem.time}:00`);
      const end = new Date(start.getTime() + parseInt(newItem.duration) * 60000);

      const { error: err } = await supabase
        .from('event_schedules')
        .insert({
          event_id: id,
          title: newItem.title,
          description: newItem.description,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          location_in_venue: newItem.location
        });

      if (err) throw err;
      
      success('Schedule item added');
      setIsAdding(false);
      setNewItem({ title: '', time: '', duration: '60', description: '', location: '' });
      fetchSchedule();
    } catch (err) {
      console.error(err);
      error('Failed to add item');
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const { error: err } = await supabase
        .from('event_schedules')
        .delete()
        .eq('id', itemId);
      
      if (err) throw err;
      success('Item removed');
      setItems(prev => prev.filter(i => i.id !== itemId));
    } catch (err) {
      error('Failed to delete item');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Run of Show" 
        subtitle="Minute-by-minute event schedule."
        breadcrumbs={['Dashboard', 'Events', 'Schedule']}
        actionLabel="Add Item"
        onAction={() => setIsAdding(!isAdding)}
      />

      {isAdding && (
        <FadeIn>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
            <h3 className="font-bold text-lg mb-4">New Schedule Item</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Input 
                label="Time" 
                type="time" 
                value={newItem.time} 
                onChange={e => setNewItem({...newItem, time: e.target.value})} 
                className="bg-gray-50"
              />
              <Input 
                label="Activity Title" 
                placeholder="e.g. Doors Open" 
                value={newItem.title} 
                onChange={e => setNewItem({...newItem, title: e.target.value})} 
                containerClassName="md:col-span-2"
                className="bg-gray-50"
              />
              <Input 
                label="Duration (min)" 
                type="number" 
                value={newItem.duration} 
                onChange={e => setNewItem({...newItem, duration: e.target.value})} 
                className="bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input 
                label="Location (Optional)" 
                placeholder="e.g. Main Stage" 
                value={newItem.location} 
                onChange={e => setNewItem({...newItem, location: e.target.value})} 
                className="bg-gray-50"
              />
              <Input 
                label="Description (Optional)" 
                placeholder="Notes for crew..." 
                value={newItem.description} 
                onChange={e => setNewItem({...newItem, description: e.target.value})} 
                className="bg-gray-50"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleAddItem}>Save Item</Button>
            </div>
          </div>
        </FadeIn>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Schedule is empty</h3>
            <p className="text-gray-500 text-sm">Start building your run of show.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {items.map((item) => (
              <div key={item.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50/50 transition-colors group">
                <div className="w-32 shrink-0">
                  <span className="font-mono font-bold text-xl text-gray-900">
                    {new Date(item.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                    {Math.round((new Date(item.end_time).getTime() - new Date(item.start_time).getTime()) / 60000)} Mins
                  </p>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-black shadow-sm border border-transparent hover:border-gray-100">
                        <MoreHorizontal size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {item.description && <p className="text-gray-600 text-sm mb-3">{item.description}</p>}
                  
                  <div className="flex gap-3">
                    {item.location_in_venue && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100">
                        <MapPin size={12} /> {item.location_in_venue}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
