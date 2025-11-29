
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, MapPin, Users, DollarSign, CheckCircle, 
  Clock, Circle, FileText, Image as ImageIcon, Camera, File, 
  MoreHorizontal, ChevronRight, Loader2
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { SponsorActivation, SponsorDeliverable } from '../../types/sponsorship';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    completed: "bg-green-100 text-green-700 border-green-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    "in-progress": "bg-amber-100 text-amber-700 border-amber-200",
    pending: "bg-blue-50 text-blue-600 border-blue-100",
    planning: "bg-gray-100 text-gray-600 border-gray-200"
  };
  
  const baseClass = "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors duration-300";
  const normalizedStatus = status?.toLowerCase().replace(' ', '-') || 'planning';
  const specificClass = styles[normalizedStatus] || "bg-gray-100 text-gray-600";

  return <span className={`${baseClass} ${specificClass}`}>{status}</span>;
};

const TaskIcon = ({ status }: { status: string }) => {
  const isCompleted = status === 'completed';
  return (
    <div className={`transform transition-all duration-500 ${isCompleted ? 'scale-110' : 'scale-100'}`}>
      {isCompleted ? (
        <CheckCircle className="text-green-500 transition-colors duration-300" size={20} />
      ) : status === 'in-progress' ? (
        <Clock className="text-amber-500 transition-colors duration-300" size={20} />
      ) : (
        <Circle className="text-blue-300 transition-colors duration-300 group-hover:text-blue-400" size={20} />
      )}
    </div>
  );
};

const MediaIcon = ({ type }: { type: string }) => {
  if (type === 'image') return <ImageIcon size={18} className="text-purple-600" />;
  if (type === 'camera') return <Camera size={18} className="text-purple-600" />;
  return <FileText size={18} className="text-gray-500" />;
};

export const ActivationDetailPage: React.FC = () => {
  const { id } = useParams();
  const [activation, setActivation] = useState<SponsorActivation | null>(null);
  const [deliverables, setDeliverables] = useState<SponsorDeliverable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Activation with expanded Sponsor/Event
      const { data, error } = await supabase
        .from('sponsor_activations')
        .select(`
            *,
            event_sponsor:event_sponsors(
                *,
                sponsor:sponsor_profiles(*),
                event:events(*)
            )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setActivation(data);

      // 2. Fetch related deliverables (using the event_sponsor_id from activation)
      if (data?.event_sponsor_id) {
          const { data: delData } = await supabase
            .from('sponsor_deliverables')
            .select('*')
            .eq('event_sponsor_id', data.event_sponsor_id);
          setDeliverables(delData || []);
      }

    } catch (err) {
        console.error("Failed to load activation", err);
    } finally {
        setLoading(false);
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={32} /></div>;
  if (!activation) return <div className="p-12 text-center">Activation not found</div>;

  // Safely access nested properties
  // @ts-ignore
  const sponsorName = activation.event_sponsor?.sponsor?.name || 'Unknown Sponsor';
  // @ts-ignore
  const eventName = activation.event_sponsor?.event?.title || 'Unknown Event';
  // @ts-ignore
  const eventDate = activation.event_sponsor?.event?.start_time ? new Date(activation.event_sponsor.event.start_time).toLocaleDateString() : 'TBD';
  // @ts-ignore
  const dealValue = activation.event_sponsor?.cash_value || 0;

  // MOCK TASKS (Since we don't have a granular task table for activations yet)
  const tasks = [
    { id: 1, name: "Space Design & Layout", dept: "Design Team", due: "TBD", status: "completed" },
    { id: 2, name: "Furniture Setup", dept: "Events Team", due: "TBD", status: "in-progress" },
    { id: 3, name: "Staff Briefing", dept: "Operations Team", due: "TBD", status: "pending" }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      
      {/* 1. Back Navigation */}
      <div className="mb-6">
        <Link to="/dashboard/activations" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-fashion-black transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Activations
        </Link>
      </div>

      {/* 2. Activation Hero Card */}
      <FadeIn>
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50 -mr-16 -mt-16 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center p-3 text-2xl font-bold text-gray-300">
                   {sponsorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-serif font-bold text-gray-900">{activation.title}</h1>
                    <StatusBadge status={activation.status} />
                  </div>
                  <p className="text-gray-500 text-sm">{sponsorName} • {eventName}</p>
                </div>
              </div>
              <div className="flex gap-3">
                 <Button variant="white" size="sm">Edit Details</Button>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed max-w-4xl mb-8 text-sm md:text-base">
              {activation.description || "No description provided."}
            </p>

            {/* Info Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Event Date', value: eventDate, icon: Calendar, color: 'bg-blue-50 text-blue-600' },
                { label: 'Location', value: activation.location_in_venue || 'TBD', icon: MapPin, color: 'bg-purple-50 text-purple-600' },
                { label: 'Expected Attendees', value: '500+', icon: Users, color: 'bg-pink-50 text-pink-600' },
                { label: 'Deal Value', value: `$${dealValue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-50 text-green-600' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4 hover:bg-white hover:shadow-sm transition-all">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 4. Two-Column Layout: Tasks & Media */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Column 1: Tasks (Mock) */}
        <FadeIn delay={100}>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900">Milestones</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="group flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all">
                  <div className="mt-1 shrink-0">
                    <TaskIcon status={task.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{task.name}</h4>
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{task.dept}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Column 2: Media Deliverables (Real) */}
        <FadeIn delay={200}>
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900">Deliverables</h3>
              <Button variant="white" size="sm" className="text-xs h-8">
                + Add New
              </Button>
            </div>

            <div className="space-y-4">
              {deliverables.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm group-hover:border-purple-200 group-hover:text-purple-600 transition-colors">
                      <MediaIcon type={item.type} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 mb-0.5">{item.title}</h4>
                      <p className="text-xs text-gray-500">Due: {new Date(item.due_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={item.status} />
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              ))}
              {deliverables.length === 0 && (
                  <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                      No deliverables tracked.
                  </div>
              )}
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};
