
import React, { useState, useMemo } from 'react';
import { 
  Download, Filter, Heart, CheckCircle2, AlertCircle, 
  MoreHorizontal, ChevronDown, Sparkles, X, MessageSquare,
  Grid, List, Check, Image as ImageIcon, Search, ArrowRight
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';

// --- Types ---
interface Asset {
  id: string;
  url: string;
  title: string;
  status: 'raw' | 'retouched' | 'revision' | 'approved';
  metadata: {
    angle: 'Front' | 'Back' | 'Detail' | 'Lifestyle';
    model: string;
    background: 'White' | 'Color' | 'Location';
  };
  isFavorite: boolean;
  aiScore?: number; // 0-100
  aiReason?: string;
}

// --- Mock Cloudinary/Supabase Data ---
const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800',
    title: 'Look 01 - Front',
    status: 'approved',
    metadata: { angle: 'Front', model: 'Sarah', background: 'White' },
    isFavorite: true,
    aiScore: 98,
    aiReason: 'Strong eye contact & perfect exposure'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800',
    title: 'Look 01 - Detail',
    status: 'retouched',
    metadata: { angle: 'Detail', model: 'Sarah', background: 'White' },
    isFavorite: false,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800',
    title: 'Look 02 - Lifestyle',
    status: 'revision',
    metadata: { angle: 'Lifestyle', model: 'Marcus', background: 'Location' },
    isFavorite: false,
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800',
    title: 'Look 03 - Full',
    status: 'raw',
    metadata: { angle: 'Front', model: 'Marcus', background: 'White' },
    isFavorite: false,
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
    title: 'Look 04 - Motion',
    status: 'retouched',
    metadata: { angle: 'Lifestyle', model: 'Sarah', background: 'Location' },
    isFavorite: true,
    aiScore: 92,
    aiReason: 'Dynamic movement captured sharply'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
    title: 'Look 02 - Side',
    status: 'retouched',
    metadata: { angle: 'Back', model: 'Marcus', background: 'White' },
    isFavorite: false,
  },
];

// --- Helper: Simulate Cloudinary Transforms ---
const getDownloadUrl = (url: string, preset: 'original' | 'web' | 'square') => {
  // In production, this would manipulate the Cloudinary URL string
  // e.g. replace '/upload/' with '/upload/w_2000,q_auto/'
  return url; 
};

export const DeliveryPortal: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [activeRevision, setActiveRevision] = useState<Asset | null>(null);
  
  // Filters
  const [filterAngle, setFilterAngle] = useState('All');
  const [filterModel, setFilterModel] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);

  // --- Derived State ---
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      if (showFavorites && !asset.isFavorite) return false;
      if (filterAngle !== 'All' && asset.metadata.angle !== filterAngle) return false;
      if (filterModel !== 'All' && asset.metadata.model !== filterModel) return false;
      return true;
    });
  }, [assets, filterAngle, filterModel, showFavorites]);

  const heroPicks = useMemo(() => assets.filter(a => (a.aiScore || 0) > 90), [assets]);

  // --- Handlers ---
  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleFavorite = (id: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, isFavorite: !a.isFavorite } : a));
  };

  const handleDownload = (preset: 'original' | 'web' | 'square') => {
    alert(`Downloading ${selectedIds.size} assets with preset: ${preset.toUpperCase()}`);
    // Real logic: Loop selectedIds, gen Cloudinary URLs, trigger zip or individual downloads
  };

  const handleApprove = () => {
    setAssets(prev => prev.map(a => selectedIds.has(a.id) ? { ...a, status: 'approved' } : a));
    setSelectedIds(new Set());
  };

  const submitRevision = (note: string) => {
    if (activeRevision) {
      setAssets(prev => prev.map(a => a.id === activeRevision.id ? { ...a, status: 'revision' } : a));
      setActiveRevision(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32 relative">
      
      {/* 1. Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
              <span>Project #SHO-2025-001</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-purple-600">In Review</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Summer Campaign '25</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="text-right hidden md:block mr-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progress</p>
                <p className="text-sm font-medium text-gray-900">
                  <span className="text-green-600 font-bold">{assets.filter(a => a.status === 'approved').length}</span> / {assets.length} Approved
                </p>
             </div>
             <Button variant="outline" size="sm">Share Gallery</Button>
             <Button variant="primary" size="sm">Complete Project</Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-2 border-t border-gray-100">
           <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar">
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                 <Filter size={14} className="ml-2 text-gray-400" />
                 <select 
                    className="bg-transparent text-xs font-bold p-1 outline-none cursor-pointer text-gray-700"
                    value={filterAngle}
                    onChange={(e) => setFilterAngle(e.target.value)}
                 >
                    <option value="All">All Angles</option>
                    <option value="Front">Front</option>
                    <option value="Back">Back</option>
                    <option value="Detail">Detail</option>
                    <option value="Lifestyle">Lifestyle</option>
                 </select>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                 <select 
                    className="bg-transparent text-xs font-bold p-1 outline-none cursor-pointer text-gray-700"
                    value={filterModel}
                    onChange={(e) => setFilterModel(e.target.value)}
                 >
                    <option value="All">All Models</option>
                    <option value="Sarah">Sarah</option>
                    <option value="Marcus">Marcus</option>
                 </select>
              </div>
              <button 
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${showFavorites ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
              >
                 <Heart size={12} className={showFavorites ? "fill-current" : ""} /> Favorites
              </button>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                 <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                 <input type="text" placeholder="Search filenames..." className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 w-48" />
              </div>
           </div>
        </div>
      </div>

      <div className="p-6 max-w-[1600px] mx-auto space-y-8">
        
        {/* 2. AI Hero Strip */}
        {!showFavorites && filterAngle === 'All' && (
          <FadeIn>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                 <Sparkles className="text-amber-500" size={18} />
                 <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Gemini's Hero Picks</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {heroPicks.map((pick) => (
                   <div key={pick.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-amber-400 transition-all shadow-sm">
                      <img src={pick.url} alt={pick.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                         <p className="text-white text-xs font-bold">{pick.title}</p>
                         <p className="text-amber-300 text-[10px] mt-1">{pick.aiReason}</p>
                      </div>
                      <div className="absolute top-2 right-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                         {pick.aiScore}% Match
                      </div>
                   </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* 3. Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
           {filteredAssets.map((asset) => {
              const isSelected = selectedIds.has(asset.id);
              return (
                <FadeIn key={asset.id}>
                  <div 
                    className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-200 ${
                       isSelected ? 'border-purple-500 shadow-lg ring-1 ring-purple-500' : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                     {/* Image Area */}
                     <div className="aspect-[3/4] relative overflow-hidden cursor-pointer" onClick={() => toggleSelection(asset.id)}>
                        <img src={asset.url} alt={asset.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                           {asset.status === 'approved' && <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1"><CheckCircle2 size={10}/> Approved</span>}
                           {asset.status === 'revision' && <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1"><AlertCircle size={10}/> Revision</span>}
                           {asset.status === 'retouched' && <span className="bg-white/90 backdrop-blur text-gray-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">Retouched</span>}
                        </div>

                        {/* Hover Actions */}
                        <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center gap-2 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                           <button 
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(asset.id); }}
                              className={`p-2 rounded-full bg-white/90 hover:bg-white transition-colors ${asset.isFavorite ? 'text-red-500' : 'text-gray-600'}`}
                           >
                              <Heart size={18} className={asset.isFavorite ? "fill-current" : ""} />
                           </button>
                           <button 
                              onClick={(e) => { e.stopPropagation(); setActiveRevision(asset); }}
                              className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-600 transition-colors"
                              title="Request Revision"
                           >
                              <MessageSquare size={18} />
                           </button>
                        </div>

                        {/* Selection Check */}
                        <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-purple-600 border-purple-600' : 'bg-white/30 border-white hover:bg-white/50'}`}>
                           {isSelected && <Check size={14} className="text-white" />}
                        </div>
                     </div>

                     {/* Meta Area */}
                     <div className="p-3">
                        <div className="flex justify-between items-center mb-1">
                           <p className="text-xs font-bold text-gray-900 truncate">{asset.title}</p>
                           <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                        </div>
                        <div className="flex gap-2">
                           <span className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{asset.metadata.angle}</span>
                           <span className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{asset.metadata.background}</span>
                        </div>
                     </div>
                  </div>
                </FadeIn>
              );
           })}
        </div>

      </div>

      {/* 4. Bulk Action Bar (Sticky Bottom) */}
      {selectedIds.size > 0 && (
         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 animate-in slide-in-from-bottom-4">
            <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between">
               <div className="flex items-center gap-4 pl-2">
                  <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">{selectedIds.size} Selected</div>
                  <span className="text-sm text-gray-400 hidden sm:inline">Bulk Actions</span>
               </div>
               
               <div className="flex items-center gap-3">
                  <div className="h-8 w-px bg-gray-700 mx-2 hidden sm:block"></div>
                  
                  {/* Download Dropdown Simulator */}
                  <div className="relative group">
                     <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-2 border border-gray-600">
                        <Download size={16} /> Download <ChevronDown size={14} />
                     </Button>
                     <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl shadow-xl overflow-hidden text-gray-900 hidden group-hover:block animate-in fade-in zoom-in-95 origin-bottom-right">
                        <div className="p-2">
                           <button onClick={() => handleDownload('original')} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-xs font-bold flex justify-between items-center">
                              Original (TIFF) <span className="text-gray-400 font-normal">50MB</span>
                           </button>
                           <button onClick={() => handleDownload('web')} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-xs font-bold flex justify-between items-center">
                              Web (JPG) <span className="text-gray-400 font-normal">2MB</span>
                           </button>
                           <button onClick={() => handleDownload('square')} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-xs font-bold flex justify-between items-center">
                              Instagram (1:1) <span className="text-gray-400 font-normal">Crop</span>
                           </button>
                        </div>
                     </div>
                  </div>

                  <Button variant="primary" size="sm" className="bg-white text-black hover:bg-gray-100 border-transparent" onClick={handleApprove}>
                     Approve Selected
                  </Button>
               </div>
            </div>
         </div>
      )}

      {/* 5. Revision Drawer */}
      {activeRevision && (
         <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setActiveRevision(null)} />
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300 flex flex-col">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif font-bold text-xl">Request Revision</h3>
                  <button onClick={() => setActiveRevision(null)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
               </div>

               <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 mb-6">
                  <img src={activeRevision.url} className="w-full" alt="Preview" />
               </div>

               <div className="space-y-6 flex-1">
                  <div>
                     <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Quick Feedback</label>
                     <div className="flex flex-wrap gap-2">
                        {['Fix Lighting', 'Remove Blemish', 'Color Correct', 'Crop tighter', 'Clean Background'].map(chip => (
                           <button 
                              key={chip}
                              onClick={() => {}} // Would append to text area
                              className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                           >
                              {chip}
                           </button>
                        ))}
                     </div>
                  </div>
                  
                  <div>
                     <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Detailed Notes</label>
                     <textarea 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 min-h-[150px] resize-none"
                        placeholder="Describe exactly what needs to be changed..."
                     />
                  </div>
               </div>

               <div className="pt-6 mt-auto border-t border-gray-100">
                  <Button fullWidth size="lg" variant="primary" onClick={() => submitRevision("Notes")}>
                     Submit Revision Request
                  </Button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};
