
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Plus, Trash2, FileText, Link as LinkIcon, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { Input } from '../../../components/forms/Input';
import { ShotListItem } from '../../../lib/pricing';
import { uploadEventImage } from '../../../lib/storage';

export const StepShotListBuilder: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({ name: '', instructions: '', referenceImage: '' });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addItem = () => {
    if (newItem.name) {
      const item: ShotListItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: newItem.name,
        instructions: newItem.instructions,
        referenceImage: newItem.referenceImage
      };
      updateState({ shotList: [...state.shotList, item] });
      setNewItem({ name: '', instructions: '', referenceImage: '' });
    }
  };

  const removeItem = (id: string) => {
    updateState({ shotList: state.shotList.filter(i => i.id !== id) });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Data = reader.result as string;
            // Use existing storage utility (assuming it works for general images too)
            const publicUrl = await uploadEventImage(base64Data, `shot-ref-${Date.now()}`);
            if (publicUrl) {
                setNewItem(prev => ({ ...prev, referenceImage: publicUrl }));
            }
            setIsUploading(false);
        };
    } catch (error) {
        console.error("Upload failed", error);
        setIsUploading(false);
    }
  };

  return (
    <FadeIn>
      <div className="max-w-3xl">
        <h1 className="text-4xl font-serif font-bold mb-4">Build Shot List</h1>
        <p className="text-gray-500 text-lg mb-10">
          Itemize your products or looks. Add specific instructions to ensure we don't miss a detail.
        </p>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
            <div className="grid gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Add New Shot Request</h3>
                
                <Input 
                    placeholder="Shot Name (e.g. Red Silk Dress - Front)" 
                    value={newItem.name}
                    onChange={e => setNewItem({...newItem, name: e.target.value})}
                    className="bg-white"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                        placeholder="Instructions (e.g. Focus on embroidery detail)" 
                        value={newItem.instructions}
                        onChange={e => setNewItem({...newItem, instructions: e.target.value})}
                        className="bg-white"
                    />
                    
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input 
                                placeholder="Reference Image URL" 
                                value={newItem.referenceImage}
                                onChange={e => setNewItem({...newItem, referenceImage: e.target.value})}
                                className="bg-white"
                                icon={<LinkIcon size={14} />}
                                onKeyDown={e => e.key === 'Enter' && addItem()}
                            />
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleFileUpload}
                        />
                        <Button 
                            variant="outline" 
                            className="px-3 bg-white border-gray-200 hover:bg-gray-100"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            title="Upload Image"
                        >
                            {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                        </Button>
                    </div>
                </div>

                {/* Preview if image exists */}
                {newItem.referenceImage && (
                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 p-2 rounded-lg border border-green-100">
                        <ImageIcon size={14} />
                        <span className="truncate flex-1">{newItem.referenceImage}</span>
                        <button onClick={() => setNewItem({...newItem, referenceImage: ''})} className="text-gray-400 hover:text-red-500">
                            <Trash2 size={14} />
                        </button>
                    </div>
                )}

                <div className="flex justify-end mt-2">
                    <Button onClick={addItem} disabled={!newItem.name || isUploading} size="sm" className="gap-2">
                        <Plus size={16} /> Add to List
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {state.shotList.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <FileText className="mx-auto text-gray-300 mb-2" size={24} />
                        <p className="text-gray-400 text-sm">No items added yet.</p>
                        <p className="text-gray-400 text-xs mt-1">You can skip this step if you prefer to email a spreadsheet later.</p>
                    </div>
                )}
                {state.shotList.map((item) => (
                    <div key={item.id} className="flex items-start justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all group">
                        <div className="flex gap-4 items-start overflow-hidden w-full">
                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 text-gray-400 overflow-hidden relative">
                                {item.referenceImage ? (
                                    <img src={item.referenceImage} alt="Ref" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                ) : (
                                    <ImageIcon size={20} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                                {item.instructions && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.instructions}</p>}
                            </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2 shrink-0">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-between items-center">
            <Button variant="ghost" className="text-gray-400">Skip & Upload CSV</Button>
            <Button variant="primary" size="lg" onClick={() => navigate('/start-project/retouching')}>
                Next: Retouching <ArrowRight size={18} className="ml-2" />
            </Button>
        </div>
      </div>
    </FadeIn>
  );
};
