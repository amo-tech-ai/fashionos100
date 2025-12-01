
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, Calendar, ArrowRight, CheckCircle2, Loader2, Plus } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/dashboard/Shared';
import { useEventOpportunities } from '../../hooks/useEventOpportunities';
import { EmptyState } from '../../components/EmptyState';

export const EventOpportunitiesPage: React.FC = () => {
  const { opportunities, loading } = useEventOpportunities();
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      <PageHeader 
        title="Event Opportunities" 
        subtitle="Track sponsorship inventory and revenue goals per event."
        breadcrumbs={['Dashboard', 'Opportunities']}
        actionLabel="New Event"
        onAction={() => navigate('/dashboard/events/new')}
      />

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-purple-600" size={32} />
        </div>
      ) : opportunities.length === 0 ? (
         <EmptyState 
            icon={Target}
            title="No Opportunities Found"
            description="Create an event to start tracking sponsorship opportunities."
            actionLabel="Create Event"
            actionLink="/dashboard/events/new"
         />
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {opportunities.map((opp, i) => (
            <FadeIn key={opp.id} delay={i * 100}>
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Visual Side */}
                  <div className="lg:w-1/3 relative min-h-[240px]">
                    <img src={opp.image} alt={opp.event} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                      <div className="flex items-center gap-2 mb-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
                        <Calendar size={14} /> {opp.date}
                      </div>
                      <h2 className="text-2xl font-serif font-bold mb-4">{opp.event}</h2>
                      
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span>${(opp.raised / 1000).toFixed(1)}k Raised</span>
                          <span className="text-gray-400">${(opp.goal / 1000).toFixed(1)}k Goal</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${opp.raised < opp.goal * 0.3 ? 'bg-amber-500' : 'bg-green-500'}`} 
                            style={{ width: `${Math.min(100, (opp.raised / opp.goal) * 100)}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inventory Side */}
                  <div className="lg:w-2/3 p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
                          Package Inventory
                          {opp.status === 'Completed' && <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Past Event</span>}
                        </h3>
                        <p className="text-gray-500 text-sm">Available slots for brand partners.</p>
                      </div>
                      <Link to={`/dashboard/sponsors/new-deal`}>
                         <Button variant="outline" size="sm">Add Deal</Button>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {opp.packages.map((pkg, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border ${pkg.status === 'Sold Out' ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white border-purple-100 ring-1 ring-purple-50'}`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{pkg.name}</span>
                            {pkg.status === 'Sold Out' ? <CheckCircle2 size={14} className="text-green-500" /> : <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
                          </div>
                          <div className="flex justify-between items-end">
                            <span className={`text-sm font-bold ${pkg.status === 'Sold Out' ? 'text-gray-900' : 'text-purple-600'}`}>
                              {pkg.status}
                            </span>
                            <span className="text-xs text-gray-400">
                              ${pkg.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                      {opp.packages.length === 0 && (
                          <div className="col-span-3 text-center py-4 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">
                              No packages defined. <Link to="/dashboard/packages" className="text-purple-600 hover:underline">Create some?</Link>
                          </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Link to="/dashboard/sponsors" className="text-sm font-bold text-gray-900 flex items-center gap-2 hover:text-purple-600 transition-colors">
                        Find Sponsors <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
};
