
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Download, Filter, Heart, CheckCircle2, AlertCircle, 
  MoreHorizontal, ChevronDown, Sparkles, X, MessageSquare,
  Grid, List, Check, Image as ImageIcon, Search, ArrowRight, Loader2,
  Upload, File
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { FileUploader } from '../../components/FileUploader';
import { useToast } from '../../components/Toast';
import { notificationService } from '../../lib/notification-service';
import { useAuth } from '../../context/AuthContext';

// --- Types ---
interface Asset {
  id: string;
  url: string;
  title: string;
  status: 'raw' | 'retouched' | 'revision' | 'approved';
  metadata: {
    angle: string;
    model?: string;
    background?: string;
  };
  shoot_id?: string;
  isFavorite: boolean;
  aiScore?: number;
  aiReason?: string;
}

export const DeliveryPortal: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRevision, setActiveRevision] = useState<Asset | null>(null);
  const [revisionNote, setRevisionNote] = useState('');
  
  // Filters
  const [filterAngle, setFilterAngle] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const { success, error } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
      try {
        setLoading(true);
        // Fetch assets that are ready for client view
        const { data, error } = await supabase
            .from('shoot_assets')
            .select('*')
            .in('status', ['review', 'approved', 'revision_requested', 'final'])
            .order('created_at', { ascending: false });
            
        if (error) throw error;

        const mappedAssets: Asset[] = (data as any[]).map(a => ({
            id: a.id,
            url: a.url,
            title: a.filename || 'Untitled',
            status: (a.status === 'revision_requested' ? 'revision' : a.status === 'final' ? 'approved' : a.status === 'review' ? 'retouched' : 'raw') as any,
            metadata: {
                angle: a.metadata?.angle || 'General',
                model: a.metadata?.model || 'Unknown',
                background: a.metadata?.background || 'Studio'
            },
            shoot_id: a.shoot_id,
            isFavorite: a.is_favorite
        }));

        setAssets(mappedAssets);
      } catch (e) {
          console.error("Error loading assets:", e);
      } finally {
          setLoading(false);
      }
  };

  // --- Derived State ---
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      if (showFavorites && !asset.isFavorite) return false;
      if (filterAngle !== 'All' && asset.metadata.angle !== filterAngle) return false;
      return true;
    });
  }, [assets, filterAngle, showFavorites]);

  // --- Handlers ---
  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleFavorite = async (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (!asset) return;
    
    const newVal = !asset.isFavorite;
    
    // Optimistic update
    setAssets(prev => prev.map(a => a.id === id ? { ...a, isFavorite: newVal } : a));
    
    // DB Update
    await supabase.from('shoot_assets').update({ is_favorite: newVal }).eq('id', id);
  };

  const handleApprove = async () => {
    const ids = Array.from(selectedIds);
    
    // Optimistic
    setAssets(prev => prev.map(a => selectedIds.has(a.id) ? { ...a, status: 'approved' } : a));
    setSelectedIds(new Set());
    
    // DB
    await supabase.from('shoot_assets').update({ status: 'final' }).in('id', ids);
    success("Assets approved successfully");
  };

  const submitRevision = async () => {
    if (activeRevision) {
      const note = revisionNote || "Please review this asset.";
      
      // Optimistic
      setAssets(prev => prev.map(a => a.id === activeRevision.id ? { ...a, status: 'revision' } : a));
      
      // DB
      await supabase.from('shoot_assets').update({ status: 'revision_requested' }).eq('id', activeRevision.id);
      
      // NOTIFY STUDIO / ADMIN
      // Find shoot designer (owner) or just notify all admins in real app
      // For now, we'll assume we notify the studio admin (represented by a specific ID or service role logic)
      // Here we'll just create a notification record that admins can see
      if (activeRevision.shoot_id) {
          // Optional: Fetch shoot details to know who to notify specifically
          // For MVP, we log the notification which admins can see if they query all
          // Or notify the user themselves for confirmation
          await notificationService.create({
              userId: user?.id || 'system', // Self-notification for audit
              title: "Revision Requested",
              message: `You requested changes on ${activeRevision.title}: "${note}"`,
              type: 'info'
          });
          
          // In a real multi-tenant app, we'd notify the studio owner.
      }

      success("Revision request sent");
      setRevisionNote('');
      setActiveRevision(null);
    }
  };

  const handleBulkUpload = async (files: File[]) => {
    try {
        const { data: { user } } = await (supabase.auth as any).getUser();
        if (!user) throw new Error("User not authenticated");

        const uploads = files.map(async (file) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `uploads/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('production-assets')
                .upload(fileName, file);
            
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('production-assets')
                .getPublicUrl(fileName);

            // 2. Create Record
            const { data: recentShoot } = await supabase.from('shoots').select('id').limit(1).single();
            const shootId = recentShoot?.id; 

            if (shootId) {
                await supabase.from('shoot_assets').insert({
                    shoot_id: shootId,
                    url: publicUrl,
                    filename: file.name,
                    file_type: file.type.split('/')[1] || 'unknown',
                    status: 'review',
                    metadata: { angle: 'Uploaded', background: 'Custom' }
                });
            }
            
            return publicUrl;
        });

        await Promise.all(uploads);
        success(`Successfully uploaded ${files.length} files`);
        fetchAssets(); // Refresh grid
    } catch (e: any) {
        console.error("Upload error:", e);
        error("Failed to upload files. " + e.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" size={48}/></div>;

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32 relative">
      
      {/* 1. Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
              <span>Assets Portal</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-purple-600">Review Mode</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Deliverables</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="text-right hidden md:block mr-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Progress</p>
                <p className="text-sm font-medium text-gray-900">
                  <span className="text-green-600 font-bold">{assets.filter(a => a.status === 'approved').length}</span> / {assets.length} Approved
                </p>
             </div>
             <Button variant="outline" size="sm">Share Gallery</Button>
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
                    <option value="All">All Types</option>
                    <option value="Front">Front</option>
                    <option value="Detail">Detail</option>
                    <option value="Lifestyle">Lifestyle</option>
                 </select>
              </div>
              <button 
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${showFavorites ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
              >
                 <Heart size={12} className={showFavorites ? "fill-current" : ""} /> Favorites
              </button>
           </div>
        </div>
      </div>

      <div className="p-6 max-w-[1600px] mx-auto space-y-8">
        
        {/* 3. Main Grid */}
        {filteredAssets.length > 0 ? (
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
                            {asset.status === 'retouched' && <span className="bg-white/90 backdrop-blur text-gray-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">Review</span>}
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
                            </div>
                        </div>
                    </div>
                    </FadeIn>
                );
            })}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-400">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                <p>No assets found.</p>
            </div>
        )}

        {/* Upload Area */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="font-serif font-bold text-lg mb-4">Add New Assets</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1">
             <FileUploader 
                onUpload={handleBulkUpload} 
                accept="image/*,video/*" 
                multiple 
             />
          </div>
        </div>

      </div>

      {/* 4. Bulk Action Bar (Sticky Bottom) */}
      {selectedIds.size > 0 && (
         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 animate-in slide-in-from-bottom-4">
            <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between">
               <div className="flex items-center gap-4 pl-2">
                  <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md">{selectedIds.size} Selected</div>
               </div>
               
               <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-2 border border-gray-600">
                     <Download size={16} /> Download
                  </Button>

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
                              onClick={() => setRevisionNote(prev => prev ? `${prev}\n${chip}` : chip)}
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
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                     />
                  </div>
               </div>

               <div className="pt-6 mt-auto border-t border-gray-100">
                  <Button fullWidth size="lg" variant="primary" onClick={submitRevision} disabled={!revisionNote.trim()}>
                     Submit Revision Request
                  </Button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};
