
import React from 'react';
import { X, Calendar, HardDrive, Maximize2, Download, Heart, Share2, Sparkles, Tag } from 'lucide-react';
import { Button } from '../Button';
import { GalleryItem } from '../../hooks/useGallery';

interface AssetDetailModalProps {
  asset: GalleryItem;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({ asset, onClose, onToggleFavorite }) => {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = asset.url;
    a.download = asset.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image/Video Preview Area */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative min-h-[300px] md:min-h-full">
           {asset.type === 'video' ? (
             <video src={asset.url} controls className="max-w-full max-h-full w-auto h-auto" />
           ) : (
             <img src={asset.url} alt={asset.title} className="max-w-full max-h-full object-contain" />
           )}
        </div>

        {/* Sidebar / Metadata */}
        <div className="w-full md:w-96 bg-white flex flex-col border-l border-gray-100 overflow-y-auto">
          <div className="p-8 flex-1">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h2 className="font-serif font-bold text-2xl text-gray-900 mb-1 truncate max-w-[200px]" title={asset.title}>{asset.title}</h2>
                  <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                    {asset.category}
                  </span>
               </div>
               <button 
                 onClick={() => onToggleFavorite(asset.id)}
                 className={`p-2 rounded-full transition-all ${asset.isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
               >
                 <Heart size={20} className={asset.isFavorite ? "fill-current" : ""} />
               </button>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <Maximize2 size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-wider">Dimensions</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{asset.dimensions}</p>
               </div>
               <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <HardDrive size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-wider">Size</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{asset.size}</p>
               </div>
               <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <Calendar size={14} />
                     <span className="text-[10px] font-bold uppercase tracking-wider">Date</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{asset.date}</p>
               </div>
            </div>

            {/* AI Analysis */}
            <div className="mb-8">
               <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2 mb-3">
                  <Sparkles size={16} /> AI Analysis
               </h3>
               <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {asset.aiDescription}
               </p>
               <div className="flex flex-wrap gap-2">
                  {asset.aiTags?.map((tag, i) => (
                     <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
                        <Tag size={10} /> {tag}
                     </span>
                  ))}
               </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
             <div className="flex gap-3">
                <Button variant="outline" fullWidth onClick={handleDownload}>
                   <Download size={16} className="mr-2" /> Download
                </Button>
                <Button variant="primary" fullWidth>
                   <Share2 size={16} className="mr-2" /> Share
                </Button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
