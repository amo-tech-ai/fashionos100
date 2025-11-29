
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreHorizontal, Image as ImageIcon, 
  Folder, Grid, List, ChevronDown, Download, Heart, Share2, 
  Upload, Camera, Film, Star, ArrowRight, LayoutGrid, Loader2
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';
import { useGallery, GalleryItem, GalleryFolder } from '../../hooks/useGallery';
import { FileUploader } from '../../components/FileUploader';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../components/Toast';

// --- Sub-Components ---

const FolderCard: React.FC<{ folder: GalleryFolder }> = ({ folder }) => (
  <div className="group cursor-pointer min-w-[200px]">
    <div className="relative h-36 mb-3">
       {/* Stack Effect */}
       <div className="absolute top-0 left-2 right-2 bottom-2 bg-gray-100 rounded-2xl border border-gray-200 transform -rotate-3 transition-transform group-hover:-rotate-6" />
       <div className="absolute top-1 left-1 right-1 bottom-1 bg-gray-50 rounded-2xl border border-gray-200 transform rotate-2 transition-transform group-hover:rotate-4" />
       
       {/* Main Preview */}
       <div className="absolute inset-0 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm group-hover:shadow-md transition-all z-10">
          {folder.previews.length > 0 ? (
             <div className="grid grid-cols-2 h-full">
                <img src={folder.previews[0]} className="w-full h-full object-cover" alt="" />
                <div className="grid grid-rows-2 h-full">
                   {folder.previews[1] && <img src={folder.previews[1]} className="w-full h-full object-cover" alt="" />}
                   {folder.previews[2] ? (
                     <img src={folder.previews[2]} className="w-full h-full object-cover" alt="" />
                   ) : (
                     <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                        <Folder size={16} />
                     </div>
                   )}
                </div>
             </div>
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                <Folder size={32} />
             </div>
          )}
       </div>
    </div>
    <div>
       <h3 className="font-bold text-sm text-gray-900 group-hover:text-purple-600 transition-colors truncate">{folder.name}</h3>
       <p className="text-xs text-gray-400">{folder.count} items • {folder.date}</p>
    </div>
  </div>
);

const MediaCard: React.FC<{ item: GalleryItem }> = ({ item }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer break-inside-avoid mb-6">
    <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
      <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
      
      {/* Type Badge */}
      <div className="absolute top-3 right-3">
         {item.type === 'video' && (
            <div className="w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white">
               <Film size={14} />
            </div>
         )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
         <div className="flex justify-between items-start">
             <div className="flex gap-2">
                <button className={`p-2 bg-white/20 backdrop-blur hover:bg-white hover:text-black text-white rounded-full transition-colors ${item.isFavorite ? 'text-red-500 bg-white' : ''}`}>
                   <Heart size={16} className={item.isFavorite ? "fill-current" : ""} />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur hover:bg-white hover:text-black text-white rounded-full transition-colors">
                   <Download size={16} />
                </button>
             </div>
             <button className="p-2 text-white hover:text-gray-200">
                <MoreHorizontal size={20} />
             </button>
         </div>
         <div>
            <Button size="sm" variant="white" fullWidth>View Details</Button>
         </div>
      </div>
    </div>
    
    <div className="p-4">
       <div className="flex justify-between items-start mb-1">
          <h3 className="font-serif font-bold text-base text-gray-900 truncate pr-2">{item.title}</h3>
          <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
             <MoreHorizontal size={16} />
          </button>
       </div>
       <div className="flex justify-between items-center">
          <span className="px-2 py-0.5 rounded-full bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100 truncate max-w-[100px]">
             {item.category}
          </span>
          <span className="text-[10px] text-gray-400">{item.date}</span>
       </div>
    </div>
  </div>
);

// --- Main Component ---

export const DashboardGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { folders, assets, loading, refetch } = useGallery();
  const { success, error } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['All Categories', 'Fashion', 'Beauty', 'Events', 'Art', 'Video'];

  const filteredAssets = assets.filter(item => {
      const matchesCategory = categoryFilter === 'All Categories' || item.category === categoryFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    try {
        const uploads = files.map(async (file) => {
            const fileName = `gallery/${Date.now()}-${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from('production-assets') // Reusing existing bucket
                .upload(fileName, file);
            
            if (uploadError) throw uploadError;
            
            const { data: { publicUrl } } = supabase.storage
                .from('production-assets')
                .getPublicUrl(fileName);

            // Insert into assets (simplified, ideally linked to a shoot)
            await supabase.from('shoot_assets').insert({
                url: publicUrl,
                filename: file.name,
                file_type: file.type.includes('video') ? 'video' : 'image',
                status: 'approved', // Auto approve direct uploads
                shoot_id: folders[0]?.id // Fallback to most recent shoot or null if allowed
            });
        });

        await Promise.all(uploads);
        success(`Uploaded ${files.length} items`);
        refetch();
    } catch (e: any) {
        console.error(e);
        error('Upload failed: ' + e.message);
    } finally {
        setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            <span>Dashboard</span> <span className="text-gray-300">/</span> <span className="text-fashion-purple">Gallery</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1A1D2D]">Media Gallery</h1>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
              <span className="text-xs font-bold text-gray-500">Show:</span>
              <select className="bg-transparent border-none text-xs font-bold text-gray-900 focus:outline-none cursor-pointer">
                 <option>Recent</option>
                 <option>Oldest</option>
              </select>
           </div>
        </div>
      </div>

      {/* 2. Upload & Folders Row */}
      {loading ? (
         <div className="h-40 bg-gray-100 rounded-2xl animate-pulse"></div>
      ) : (
         <div className="overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
            <div className="flex gap-6 min-w-max">
                {/* Quick Upload */}
                <div className="min-w-[200px] group relative">
                   <div className="h-36 mb-3 bg-purple-50 border-2 border-dashed border-purple-200 rounded-2xl flex flex-col items-center justify-center text-purple-400 hover:border-purple-400 hover:text-purple-500 transition-colors cursor-pointer overflow-hidden">
                      {isUploading ? (
                          <Loader2 className="animate-spin" size={24} />
                      ) : (
                          <>
                            <div className="absolute inset-0 opacity-0">
                                <FileUploader onUpload={handleUpload} className="w-full h-full" />
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 pointer-events-none">
                                <Upload size={20} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider pointer-events-none">Upload New</span>
                          </>
                      )}
                   </div>
                   <div>
                      <h3 className="font-bold text-sm text-gray-900">Quick Upload</h3>
                      <p className="text-xs text-gray-400">Drag & drop anywhere</p>
                   </div>
                </div>

                {/* Folder Cards */}
                {folders.map(folder => (
                   <FolderCard key={folder.id} folder={folder} />
                ))}
            </div>
         </div>
      )}

      {/* 3. Filter & Search Bar */}
      <div className="sticky top-20 z-30 bg-[#F8F9FB]/95 backdrop-blur-md py-2">
         <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center flex-1 w-full">
               <Search className="text-gray-400 ml-4 shrink-0" size={20} />
               <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="w-full p-3 outline-none text-sm bg-transparent placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto px-2 overflow-x-auto hide-scrollbar">
               <div className="h-8 w-px bg-gray-100 mx-2 hidden md:block" />
               
               {categories.map(cat => (
                  <button 
                     key={cat}
                     onClick={() => setCategoryFilter(cat)}
                     className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                        categoryFilter === cat 
                           ? 'bg-black text-white shadow-md' 
                           : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                     }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
            <div className="flex items-center gap-1 px-2 border-l border-gray-100">
               <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-black'}`}>
                  <LayoutGrid size={18} />
               </button>
               <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-black' : 'text-gray-400 hover:text-black'}`}>
                  <List size={18} />
               </button>
            </div>
         </div>
      </div>

      {/* 4. Gallery Grid */}
      {loading ? (
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
             {[1,2,3,4].map(i => <div key={i} className="aspect-[4/5] bg-gray-100 rounded-2xl" />)}
         </div>
      ) : filteredAssets.length > 0 ? (
         <>
            <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
               {filteredAssets.map((item) => (
                  <MediaCard key={item.id} item={item} />
               ))}
            </div>
         </>
      ) : (
         /* Empty State */
         <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
               <ImageIcon size={48} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">No assets found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
               Try adjusting your search filters or upload new content.
            </p>
            <div className="flex justify-center gap-4">
               <Button variant="primary" className="gap-2"><Camera size={16} /> Book a Shoot</Button>
            </div>
         </div>
      )}

      {/* 5. AI Suggestions */}
      <div className="pt-12 border-t border-gray-200">
         <div className="flex items-center gap-2 mb-8">
            <div className="p-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
               <Star size={14} className="animate-pulse" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-wider">AI Curated Collections</h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
               { title: "Best of Editorial", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=400" },
               { title: "High Contrast", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400" },
               { title: "Warm Tones", img: "https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=400" },
               { title: "Runway Highlights", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400" }
            ].map((item, i) => (
               <FadeIn key={i} delay={i * 100} className="group cursor-pointer">
                  <div className="aspect-[3/2] rounded-xl overflow-hidden relative mb-3">
                     <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={12} />
                     </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg group-hover:text-purple-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Auto-Generated</p>
               </FadeIn>
            ))}
         </div>
      </div>

    </div>
  );
};
