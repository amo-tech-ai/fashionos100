
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Shirt, CheckCircle2, Plus, Search, MoreHorizontal, X, Star, Ruler } from 'lucide-react';
import { PageHeader, StatCard } from '../../../components/dashboard/Shared';
import { Button } from '../../../components/Button';
import { FadeIn } from '../../../components/FadeIn';
import { DIRECTORY_ITEMS } from '../../../data/mockDirectory';
import { EmptyState } from '../../../components/EmptyState';
import { useToast } from '../../../components/Toast';

// Local types for the casting module
interface CastMember {
  id: string;
  modelId: number;
  name: string;
  image: string;
  agency: string;
  looks_count: number;
  status: 'Optioned' | 'Confirmed' | 'Fitted';
  measurements?: string;
}

export const EventCasting: React.FC = () => {
  const { id: eventId } = useParams<{ id: string }>();
  const { success } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock state - in production this would fetch from 'event_models' table
  const [cast, setCast] = useState<CastMember[]>([
    {
        id: '1',
        modelId: 5,
        name: 'Sarah Jenkins',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        agency: 'Elite London',
        looks_count: 3,
        status: 'Confirmed',
        measurements: '5\'11" | 32-24-35'
    },
    {
        id: '2',
        modelId: 99, // Mock ID
        name: 'Kai Rivera',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        agency: 'Next Models',
        looks_count: 2,
        status: 'Fitted',
        measurements: '6\'2" | 38-30-38'
    }
  ]);

  const availableModels = DIRECTORY_ITEMS.filter(item => 
    item.role === 'Model' && 
    !cast.find(c => c.modelId === item.id) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddModel = (model: typeof DIRECTORY_ITEMS[0]) => {
      const newMember: CastMember = {
          id: Math.random().toString(36).substr(2, 9),
          modelId: model.id,
          name: model.name,
          image: model.image,
          agency: 'Freelance', // Mock default
          looks_count: 1,
          status: 'Optioned',
          measurements: 'N/A'
      };
      setCast([...cast, newMember]);
      success(`Added ${model.name} to casting`);
      setIsAdding(false);
  };

  const updateStatus = (id: string, status: CastMember['status']) => {
      setCast(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const incrementLooks = (id: string) => {
      setCast(prev => prev.map(m => m.id === id ? { ...m, looks_count: m.looks_count + 1 } : m));
  };

  // KPIs
  const totalModels = cast.length;
  const totalLooks = cast.reduce((acc, curr) => acc + curr.looks_count, 0);
  const confirmedCount = cast.filter(m => m.status === 'Confirmed' || m.status === 'Fitted').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Casting Board" 
        subtitle="Manage models, fittings, and look assignments."
        breadcrumbs={['Dashboard', 'Events', 'Casting']}
        actionLabel="Cast Model"
        onAction={() => setIsAdding(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Models Cast" value={totalModels.toString()} icon={Users} color="bg-pink-50 text-pink-600" />
        <StatCard label="Total Looks" value={totalLooks.toString()} icon={Shirt} color="bg-purple-50 text-purple-600" />
        <StatCard label="Confirmed" value={`${confirmedCount}/${totalModels}`} icon={CheckCircle2} color="bg-green-50 text-green-600" />
      </div>

      {/* Casting Grid */}
      {cast.length === 0 ? (
          <EmptyState 
            icon={Users}
            title="Casting Board Empty"
            description="Start adding models to your event."
            actionLabel="Open Directory"
            onAction={() => setIsAdding(true)}
          />
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cast.map((model, i) => (
                <FadeIn key={model.id} delay={i * 50}>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                        <div className="aspect-[3/4] relative">
                            <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3">
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                                    model.status === 'Fitted' ? 'bg-green-500/90 text-white' :
                                    model.status === 'Confirmed' ? 'bg-blue-500/90 text-white' :
                                    'bg-white/90 text-gray-600'
                                }`}>
                                    {model.status}
                                </span>
                            </div>
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                <h3 className="font-serif font-bold text-lg">{model.name}</h3>
                                <p className="text-xs opacity-80">{model.agency}</p>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Ruler size={14} /> {model.measurements}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => incrementLooks(model.id)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                        <Plus size={12} />
                                    </button>
                                    <span className="text-sm font-bold">{model.looks_count} Looks</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    fullWidth 
                                    className="text-xs h-8"
                                    onClick={() => updateStatus(model.id, model.status === 'Optioned' ? 'Confirmed' : 'Fitted')}
                                >
                                    {model.status === 'Optioned' ? 'Confirm' : model.status === 'Confirmed' ? 'Mark Fitted' : 'Edit'}
                                </Button>
                                <button className="p-2 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-colors text-gray-400 hover:text-black">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            ))}
          </div>
      )}

      {/* Add Model Modal */}
      {isAdding && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h2 className="font-serif font-bold text-xl">Cast Talent</h2>
                      <button onClick={() => setIsAdding(false)}><X className="text-gray-400 hover:text-black" /></button>
                  </div>
                  
                  <div className="p-4 border-b border-gray-100">
                      <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            autoFocus
                            placeholder="Search models..." 
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-100"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                      </div>
                  </div>

                  <div className="overflow-y-auto p-4 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {availableModels.map(model => (
                              <div key={model.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm cursor-pointer group transition-all" onClick={() => handleAddModel(model)}>
                                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                      <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <h4 className="font-bold text-sm truncate">{model.name}</h4>
                                      <p className="text-xs text-gray-500">{model.loc}</p>
                                  </div>
                                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                      <Plus size={16} />
                                  </div>
                              </div>
                          ))}
                          {availableModels.length === 0 && (
                              <p className="col-span-full text-center text-gray-400 py-8">No matching models found.</p>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
