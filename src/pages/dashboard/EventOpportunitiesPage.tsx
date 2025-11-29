
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Calendar, ArrowRight, AlertCircle, CheckCircle2, DollarSign, PieChart } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/dashboard/Shared';

const OPPORTUNITIES = [
  {
    id: 1,
    event: "Paris Fashion Week SS25",
    date: "Jan 15-23, 2026",
    raised: 350000,
    goal: 500000,
    status: "On Track",
    packages: [
      { name: "Title Sponsor", status: "Sold", holder: "LVMH" },
      { name: "Gold Tier", status: "1/3 Left", price: "$75k" },
      { name: "Silver Tier", status: "4/10 Left", price: "$25k" }
    ],
    missing_categories: ["Automotive", "Tech"],
    image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=600"
  },
  {
    id: 2,
    event: "New York Designer Series",
    date: "Mar 01-05, 2026",
    raised: 120000,
    goal: 250000,
    status: "Behind",
    packages: [
      { name: "Title Sponsor", status: "Available", price: "$100k" },
      { name: "Gold Tier", status: "2/4 Left", price: "$50k" },
      { name: "Partner", status: "Open", price: "$10k" }
    ],
    missing_categories: ["Beverage", "Beauty"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600"
  },
  {
    id: 3,
    event: "Milan Digital Showcase",
    date: "Feb 14, 2026",
    raised: 80000,
    goal: 100000,
    status: "On Track",
    packages: [
      { name: "Presenting Partner", status: "Sold", holder: "Samsung" },
      { name: "Digital Sponsor", status: "Sold Out", holder: "Multiple" }
    ],
    missing_categories: [],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600"
  }
];

export const EventOpportunitiesPage: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-20 font-sans">
      <PageHeader 
        title="Event Opportunities" 
        subtitle="Track sponsorship inventory and revenue goals per event."
        breadcrumbs={['Dashboard', 'Opportunities']}
        actionLabel="New Opportunity"
      />

      <div className="grid grid-cols-1 gap-8">
        {OPPORTUNITIES.map((opp, i) => (
          <FadeIn key={opp.id} delay={i * 100}>
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
              <div className="flex flex-col lg:flex-row">
                
                {/* Visual Side */}
                <div className="lg:w-1/3 relative min-h-[240px]">
                  <img src={opp.image} alt={opp.event} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="flex items-center gap-2 mb-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
                      <Calendar size={14} /> {opp.date}
                    </div>
                    <h2 className="text-2xl font-serif font-bold mb-4">{opp.event}</h2>
                    
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>${(opp.raised / 1000)}k Raised</span>
                        <span className="text-gray-400">${(opp.goal / 1000)}k Goal</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${opp.status === 'Behind' ? 'bg-amber-500' : 'bg-green-500'}`} 
                          style={{ width: `${(opp.raised / opp.goal) * 100}%` }} 
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
                        {opp.status === 'Behind' && <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Attention Needed</span>}
                      </h3>
                      <p className="text-gray-500 text-sm">Available slots for brand partners.</p>
                    </div>
                    <Button variant="outline" size="sm">View Sales Sheet</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {opp.packages.map((pkg, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border ${pkg.status === 'Sold' || pkg.status === 'Sold Out' ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white border-purple-100 ring-1 ring-purple-50'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{pkg.name}</span>
                          {pkg.status.includes('Sold') ? <CheckCircle2 size={14} className="text-green-500" /> : <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />}
                        </div>
                        <div className="flex justify-between items-end">
                          <span className={`text-sm font-bold ${pkg.status.includes('Sold') ? 'text-gray-900' : 'text-purple-600'}`}>
                            {pkg.status}
                          </span>
                          <span className="text-xs text-gray-400">
                            {pkg.holder ? `Held by ${pkg.holder}` : pkg.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {opp.missing_categories.length > 0 && (
                    <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-800 text-xs font-medium mb-4">
                      <Target size={16} />
                      <span>Targeting Opportunity: Pitch to <strong>{opp.missing_categories.join(' & ')}</strong> brands to reach goal.</span>
                    </div>
                  )}

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
    </div>
  );
};
