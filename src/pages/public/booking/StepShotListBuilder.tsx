
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../context/BookingContext';
import { FadeIn } from '../../../components/FadeIn';
import { Button } from '../../../components/Button';
import { ArrowRight, Plus, Trash2, FileText, Link as LinkIcon, Image as ImageIcon, Upload, Loader2, X, Sparkles } from 'lucide-react';
import { Input } from '../../../components/forms/Input';
import { ShotListItem } from '../../../lib/pricing';
import { uploadEventImage } from '../../../lib/storage';
import { useBookingAI } from '../../../hooks/useBookingAI';
import { useToast } from '../../../components/Toast';

export const StepShotListBuilder: React.FC = () => {
  const { state, updateState } = useBooking();
  const navigate = useNavigate();
  const { recommendShots, loading: aiLoading } = useBookingAI();
  const { toast } = useToast();

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

  const handleAiSuggest = async () => {
    if (!state.category) return;
    
    toast("AI is analyzing your style to suggest shots...", "info");
    
    const result = await recommendShots(state.category, state.style || 'standard');
    
    if (result && result.suggestedAngles) {
        const newItems: ShotListItem[] = result.suggestedAngles.map(angle => ({
            id: Math.random().toString(36).substr(2, 9),
            name: angle,
            instructions: `Standard ${state.style} lighting. Focus on ${state.category} details.`,
            referenceImage: ''
        }));
        
        updateState({ shotList: [...state.shotList, ...newItems] });
        toast(`Added ${newItems.length} suggested shots`, "success");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Data = reader.result as string;
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
        <h1 className="text-4xl font-serif font-bold mb-4">Shot List</h1>
        <p className="text-gray-500 text-lg mb-10">
          Define specific shots you need. Upload references or add descriptions to ensure we capture exactly what you envision.
        </p>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
            
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Build Your List</h3>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAiSuggest} 
                    disabled={aiLoading}
                    className="text-purple-600 bg-purple-50 hover:bg-purple-100"
                >
                    {aiLoading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Sparkles size={14} className="mr-2" />}
                    AI Suggest Shots
                </Button>
            </div>

            {/* Builder Form */}
            <div className="grid gap-5 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">New Shot Request</h3>
                    {newItem.referenceImage && (
                        <button 
                            onClick={() => setNewItem({...newItem, referenceImage: ''})} 
                            className="text-xs text-red-500 hover:underline flex items-center gap-1"
                        >
                            <X size={12} /> Remove Image
                        </button>
                    )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-6">
                    <div className="space-y-4">
                        <Input 
                            placeholder="Shot Name (e.g. Hero Shot - Front)" 
                            value={newItem.name}
                            onChange={e => setNewItem({...newItem, name: e.target.value})}
                            className="bg-white font-medium"
                        />
                        <Input 
                            placeholder="Instructions (e.g. Highlight texture, soft lighting)" 
                            value={newItem.instructions}
                            onChange={e => setNewItem({...newItem, instructions: e.target.value})}
                            className="bg-white text-sm"
                        />
                        <div className="flex gap-2">
                             <div className="relative flex-1">
                                <Input 
                                    placeholder="Reference URL (Optional)" 
                                    value={newItem.referenceImage}
                                    onChange={e => setNewItem({...newItem, referenceImage: e.target.value})}
                                    className="bg-white pl-9"
                                    onKeyDown={e => e.key === 'Enter' && addItem()}
                                />
                                <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                                className="bg-white border-gray-200 hover:bg-gray-100 px-4"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                title="Upload Reference Image"
                                type="button"
                             >
                                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                             </Button>
                        </div>
                    </div>

                    {/* Image Preview Box */}
                    <div className="h-full min-h-[120px] bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 overflow-hidden relative">
                        {newItem.referenceImage ? (
                            <img src={newItem.referenceImage} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                        ) : (
                            <>
                                <ImageIcon size={24} className="mb-2" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">No Image</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button onClick={addItem} disabled={!newItem.name || isUploading} size="md" className="gap-2 shadow-lg shadow-purple-500/10">
                        <Plus size={18} /> Add Shot
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-3">
                {state.shotList.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                            <FileText size={24} />
                        </div>
                        <p className="text-gray-500 font-medium">Your shot list is empty</p>
                        <p className="text-gray-400 text-sm">Add items above or use AI to get started.</p>
                    </div>
                )}
                
                {state.shotList.map((item, idx) => (
                    <div key={item.id} className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all">
                        <span className="text-xs font-bold text-gray-300 w-6">{(idx + 1).toString().padStart(2, '0')}</span>
                        
                        <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {item.referenceImage ? (
                                <img src={item.referenceImage} alt="Ref" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            ) : (
                                <ImageIcon size={20} className="text-gray-300" />
                            )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                            {item.instructions && <p className="text-sm text-gray-500 mt-0.5 truncate">{item.instructions}</p>}
                        </div>
                        
                        <button onClick={() => removeItem(item.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-between items-center">
            <Button variant="ghost" className="text-gray-400">Skip & Upload CSV Later</Button>
            <Button variant="primary" size="lg" onClick={() => navigate('/start-project/retouching')} disabled={state.shotList.length === 0}>
                Next: Retouching <ArrowRight size={18} className="ml-2" />
            </Button>
        </div>
      </div>
    </FadeIn>
  );
};
