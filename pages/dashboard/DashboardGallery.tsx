
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, MoreHorizontal, Image as ImageIcon, 
  Folder, Grid, List, ChevronDown, Download, Heart, Share2, 
  Upload, Camera, Film, Star, ArrowRight, LayoutGrid
} from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { Button } from '../../components/Button';

// --- Types ---
interface MediaItem {
  id: number;
  title: string;
  category: string;
  date: string;
  type: 'image' | 'video';
  url: string;
  dimensions: string;
  size: string;
  isFavorite?: boolean;
}

interface FolderItem {
  id: number;
  name: string;
  count: number;
  previews: string[];
}

// --- Mock Data ---
const FOLDERS: FolderItem[] = [
  {
    id: 1,
    name: "Summer Campaign '25",
    count: 128,
    previews: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=200",
      "https://images.unsplash.com/photo-1529139574466-a302d2052505?q=80&w=200"
    ]
  },
  {
    id: 2,
    name: "Paris Fashion Week",
    count: 45,
    previews: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=200",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=200"
    ]
  },
  {
    id: 3,
    name: "Product - Jewelry",
    count: 82,
    previews: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=200",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=200",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200"
    ]
  },
  {
    id: 4,
    name: "UGC Content",
    count: 12,
    previews: [
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=200"
    ]
  }
];

const MEDIA_ITEMS: MediaItem[] = [
  { id: 1, title: "Runway Revolution", category: "Fashion", date: "May 1, 2029", type: "image", dimensions: "4000x6000", size: "12MB", url: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=600" },
  { id: 2, title: "Neon Editorial", category: "Art & Design", date: "May 15, 2029", type: "image", dimensions: "3500x5000", size: "8.5MB", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600" },
  { id: 3, title: "BTS Video Clip", category: "Video", date: "May 20, 2029", type: "video", dimensions: "1920x1080", size: "145MB", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600" },
  { id: 4, title: "Vogue Cover Shot", category: "Fashion", date: "June 1, 2029", type: "image", dimensions: "4500x5500", size: "18MB", isFavorite: true, url: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600" },
  { id: 5, title: "Product - Serum", category: "Beauty", date: "June 2, 2029", type: "image", dimensions: "2000x2000", size: "4.2MB", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600" },
  { id: 6, title: "Model Casting", category: "Events", date: "June 5, 2029", type: "image", dimensions: "6000x4000", size: "22MB", url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600" },
  { id: 7, title: "Street Style Paris", category: "Fashion", date: "June 10, 2029", type: "image", dimensions: "3000x4500", size: "5MB", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600" },
  { id: 8, title: "Abstract Texture", category: "Art", date: "June 12, 2029", type: "image", dimensions: "5000x3000", size: "15MB", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600" },
];

// --- Sub-Components ---

const FolderCard = ({ folder }: { folder: FolderItem }) => (
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
       <h3 className="font-bold text-sm text-gray-900 group-hover:text-purple-600 transition-colors">{folder.name}</h3>
       <p className="text-xs text-gray-400">{folder.count} items</p>
    </div>
  </div>
);

const MediaCard = ({ item }: { item: MediaItem }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer break-inside-avoid mb-6">
    <div className="aspect-[4/5] relative overflow-hidden">
      <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      
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
                <button className="p-2 bg-white/20 backdrop-blur hover:bg-white hover:text-black text-white rounded-full transition-colors">
                   <Heart size={16} className={item.isFavorite ? "fill-current text-red-500" : ""} />
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
          <span className="px-2 py-0.5 rounded-full bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-100">
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
  
  const categories = ['All Categories', 'Fashion', 'Beauty', 'Events', 'Art', 'Video'];

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
                 <option>This Month</option>
                 <option>Last 3 Months</option>
                 <option>All Time</option>
              </select>
           </div>
           <Button variant="accent" size="sm" className="rounded-full gap-2 shadow-lg shadow-purple-500/20 bg-gradient-to-r from-pink-500 to-purple-600 border-none text-white">
              <Plus size={16} /> Create New Folder
           </Button>
        </div>
      </div>

      {/* 2. Folders Row */}
      <div className="overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar">
         <div className="flex gap-6 min-w-max">
            {/* Add New Folder Placeholder */}
            <div className="min-w-[200px] group cursor-pointer">
               <div className="h-36 mb-3 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 group-hover:border-purple-400 group-hover:text-purple-500 transition-colors bg-gray-50/50">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                     <Plus size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">New Folder</span>
               </div>
               <div>
                  <h3 className="font-bold text-sm text-gray-400 group-hover:text-purple-500">Create Collection</h3>
               </div>
            </div>

            {/* Folder Cards */}
            {FOLDERS.map(folder => (
               <FolderCard key={folder.id} folder={folder} />
            ))}
         </div>
      </div>

      {/* 3. Filter & Search Bar */}
      <div className="sticky top-20 z-30 bg-[#F8F9FB]/95 backdrop-blur-md py-2">
         <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center flex-1 w-full">
               <Search className="text-gray-400 ml-4 shrink-0" size={20} />
               <input 
                  type="text" 
                  placeholder="Search events, products, categories..." 
                  className="w-full p-3 outline-none text-sm bg-transparent placeholder:text-gray-400"
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
      {MEDIA_ITEMS.length > 0 ? (
         <>
            <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
               {MEDIA_ITEMS.map((item) => (
                  <MediaCard key={item.id} item={item} />
               ))}
            </div>
            
            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 mt-12 gap-4">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Showing 8 out of 48</span>
               <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                     <ChevronDown className="rotate-90" size={16} />
                  </button>
                  <div className="flex items-center gap-1">
                     <button className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold">1</button>
                     <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 text-xs font-bold transition-colors">2</button>
                     <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 text-xs font-bold transition-colors">3</button>
                     <span className="text-gray-300 text-xs">...</span>
                     <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500 text-xs font-bold transition-colors">8</button>
                  </div>
                  <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                     <ChevronDown className="-rotate-90" size={16} />
                  </button>
               </div>
            </div>
         </>
      ) : (
         /* Empty State */
         <div className="py-20 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
               <ImageIcon size={48} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Your gallery is looking a bit empty!</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
               Upload your own media or build a studio shoot to populate your gallery with high-end content.
            </p>
            <div className="flex justify-center gap-4">
               <Button variant="primary" className="gap-2"><Upload size={16} /> Upload Media</Button>
               <Button variant="outline" className="gap-2"><Camera size={16} /> Book a Shoot</Button>
            </div>
         </div>
      )}

      {/* 5. AI Suggestions */}
      <div className="pt-12 border-t border-gray-200">
         <div className="flex items-center gap-2 mb-8">
            <div className="p-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
               <Star size={14} className="animate-pulse" />
            </div>
            <h2 className="text-lg font-bold uppercase tracking-wider">Recommended Collections</h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
               { title: "Editorial Beauty", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=400" },
               { title: "Tech Expo Scenes", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400" },
               { title: "Wellness Lifestyle", img: "https://images.unsplash.com/photo-1544367563-12123d896889?q=80&w=400" },
               { title: "Trend Runway", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400" }
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
                  <p className="text-xs text-gray-400 uppercase tracking-wider">AI Curated • 24 items</p>
               </FadeIn>
            ))}
         </div>
      </div>

    </div>
  );
};
