
import React, { useState, useEffect } from 'react';
import { Search, Plus, Building2, MapPin, Globe, Phone, Mail, MoreHorizontal, Edit, Filter, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { SponsorProfile } from '../../types/sponsorship';
import { Button } from '../Button';
import { FadeIn } from '../FadeIn';
import { SponsorForm } from './SponsorForm';
import { Link } from 'react-router-dom';

export const SponsorDirectory: React.FC = () => {
  const [sponsors, setSponsors] = useState<SponsorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorProfile | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchSponsors = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('sponsor_profiles')
        .select('*')
        .order('name', { ascending: true });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setSponsors(data || []);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchSponsors();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleEdit = (sponsor: SponsorProfile, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSponsor(sponsor);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedSponsor(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search companies..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-gray-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="primary" size="sm" className="rounded-full gap-2" onClick={handleCreate}>
          <Plus size={16} /> Add Sponsor
        </Button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-gray-100 rounded-2xl"></div>)}
        </div>
      ) : sponsors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor, i) => (
            <FadeIn key={sponsor.id} delay={i * 50}>
              <Link to={`/dashboard/sponsors/${sponsor.id}`} className="block h-full">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all group h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                      {sponsor.logo_url ? (
                        <img src={sponsor.logo_url} alt={sponsor.name} className="w-full h-full object-contain p-1" />
                      ) : (
                        <Building2 className="text-gray-300" size={24} />
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleEdit(sponsor, e)}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Edit size={16} />
                    </button>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-gray-900 mb-1 line-clamp-1">{sponsor.name}</h3>
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-4">{sponsor.industry || 'Unknown Industry'}</p>

                  <div className="space-y-2 text-sm text-gray-500 mt-auto">
                    {sponsor.contact_name && (
                      <div className="flex items-center gap-2">
                        <User size={14} /> {sponsor.contact_name}
                      </div>
                    )}
                    {sponsor.contact_email && (
                      <div className="flex items-center gap-2 truncate">
                        <Mail size={14} /> {sponsor.contact_email}
                      </div>
                    )}
                    {sponsor.website_url && (
                      <div className="flex items-center gap-2 text-blue-500 hover:underline" onClick={e => e.stopPropagation()}>
                        <Globe size={14} /> 
                        <a href={sponsor.website_url} target="_blank" rel="noreferrer">Website</a>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-bold text-gray-900">No sponsors found</h3>
          <p className="text-gray-500 mb-4">Get started by adding a new company profile.</p>
          <Button variant="outline" onClick={handleCreate}>Add Sponsor</Button>
        </div>
      )}

      {/* Edit/Create Modal */}
      {showForm && (
        <SponsorForm 
          sponsor={selectedSponsor}
          onClose={() => setShowForm(false)}
          onSave={fetchSponsors}
        />
      )}
    </div>
  );
};
