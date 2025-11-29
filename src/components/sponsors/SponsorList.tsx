
import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { EventSponsor } from '../../types/sponsorship';
import { SponsorCard } from './SponsorCard';
import { FadeIn } from '../FadeIn';
import { EmptyState } from '../EmptyState';

interface SponsorListProps {
  sponsors: EventSponsor[];
  onSponsorClick?: (sponsor: EventSponsor) => void;
}

type SortOption = 'Name (A-Z)' | 'Value (High-Low)' | 'Status' | 'Newest';

export const SponsorList: React.FC<SponsorListProps> = ({ sponsors, onSponsorClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('All Tiers');
  const [filterStatus, setFilterStatus] = useState<string>('All Statuses');
  const [filterType, setFilterType] = useState<string>('All Types');
  const [sortBy, setSortBy] = useState<SortOption>('Name (A-Z)');
  const [showFilters, setShowFilters] = useState(false);

  // Generate unique filter options based on current data
  const uniqueTiers = useMemo(() => {
    const tiers = new Set(sponsors.map(s => s.level));
    return ['All Tiers', ...Array.from(tiers).filter(Boolean)];
  }, [sponsors]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(sponsors.map(s => s.status));
    return ['All Statuses', ...Array.from(statuses)];
  }, [sponsors]);

  const uniqueTypes = useMemo(() => {
    const types = new Set(sponsors.map(s => s.sponsor?.sponsor_type));
    return ['All Types', ...Array.from(types).filter(Boolean)];
  }, [sponsors]);

  const filteredAndSortedSponsors = useMemo(() => {
    let result = [...sponsors];

    // 1. Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.sponsor?.name.toLowerCase().includes(q) || 
        s.sponsor?.industry?.toLowerCase().includes(q)
      );
    }

    if (filterTier !== 'All Tiers') {
      result = result.filter(s => s.level === filterTier);
    }

    if (filterStatus !== 'All Statuses') {
      result = result.filter(s => s.status === filterStatus);
    }

    if (filterType !== 'All Types') {
      result = result.filter(s => s.sponsor?.sponsor_type === filterType);
    }

    // 2. Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'Name (A-Z)':
          return (a.sponsor?.name || '').localeCompare(b.sponsor?.name || '');
        case 'Value (High-Low)':
          return b.cash_value - a.cash_value;
        case 'Status':
          return a.status.localeCompare(b.status);
        case 'Newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [sponsors, searchQuery, filterTier, filterStatus, filterType, sortBy]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search sponsors or industry..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-gray-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${showFilters ? 'bg-gray-100 border-gray-300 text-black' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
          >
            <Filter size={14} /> Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-gray-300 transition-all">
              <ArrowUpDown size={14} /> {sortBy}
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl p-1 z-20 hidden group-hover:block animate-in fade-in zoom-in-95">
              {['Name (A-Z)', 'Value (High-Low)', 'Status', 'Newest'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt as SortOption)}
                  className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-colors ${sortBy === opt ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <FadeIn className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier Filter */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Sponsor Tier</label>
            <div className="relative">
                <select 
                    value={filterTier} 
                    onChange={(e) => setFilterTier(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                >
                    {uniqueTiers.map(tier => (
                        <option key={tier} value={tier || 'Unknown'}>{tier || 'Unknown'}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Deal Status</label>
            <div className="relative">
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                >
                    {uniqueStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Industry Type</label>
            <div className="relative">
                <select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                >
                    {uniqueTypes.map(type => (
                        <option key={type} value={type as string}>{type as string}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Grid Results */}
      {filteredAndSortedSponsors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedSponsors.map((sponsor, i) => (
            <FadeIn key={sponsor.id} delay={i * 50}>
              <SponsorCard sponsor={sponsor} onClick={() => onSponsorClick?.(sponsor)} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SlidersHorizontal}
          title="No sponsors found"
          description="Try adjusting your search or filters."
          actionLabel="Clear Filters"
          onAction={() => { setSearchQuery(''); setFilterTier('All Tiers'); setFilterStatus('All Statuses'); setFilterType('All Types'); }}
        />
      )}
    </div>
  );
};
