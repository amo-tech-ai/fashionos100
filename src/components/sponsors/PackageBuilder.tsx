
import React, { useState, useEffect } from 'react';
import { Award, Plus, X, Sparkles, CheckCircle2, DollarSign, Loader2, FileText } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../forms/Input';
import { Textarea } from '../forms/Textarea';
import { SponsorshipPackage } from '../../types/sponsorship';
import { aiService } from '../../lib/ai-service';
import { Select } from '../forms/Select';

interface PackageBuilderProps {
  initialData?: SponsorshipPackage | null;
  onSave: (pkg: Partial<SponsorshipPackage>) => Promise<void>;
  onCancel: () => void;
}

interface FormPackageState extends Partial<SponsorshipPackage> {
  tier?: string;
  deliverables_template?: any[]; // Explicit typing
}

export const PackageBuilder: React.FC<PackageBuilderProps> = ({ initialData, onSave, onCancel }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState<FormPackageState>({
    name: '',
    tier: 'Gold',
    description: '',
    default_price: 0,
    default_slots: 5,
    deliverables_template: []
  });

  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [newDeliverable, setNewDeliverable] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (Array.isArray(initialData.deliverables_template)) {
         setDeliverables(initialData.deliverables_template.map((d: any) => d.title || d));
      }
    }
  }, [initialData]);

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleAiSuggest = async () => {
    setIsGenerating(true);
    try {
       const result = await aiService.sponsorAgent('recommend-packages', {
           sponsorName: 'Generic',
           sponsorIndustry: 'General',
           eventDetails: 'Fashion Week'
       });

       if (result.success && result.data?.recommendations) {
           const rec = result.data.recommendations[0];
           if (rec) {
               setFormData(prev => ({
                   ...prev,
                   name: rec.tier_name,
                   default_price: rec.price,
                   description: `Premium sponsorship package tailored for high visibility.`
               }));
               setDeliverables(rec.features);
           }
       }
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        const deliverableObjects = deliverables.map(d => ({ title: d, type: 'generic', status: 'pending' }));
        
        const dataToSave: FormPackageState = { ...formData, deliverables_template: deliverableObjects };
        
        // Clean up
        const { tier, ...validData } = dataToSave;
        
        if (tier && !validData.description?.includes(tier)) {
             validData.description = `[${tier} Tier] ${validData.description || ''}`;
        }

        await onSave(validData);
    } catch (e) {
        console.error(e);
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4">
      <div className="bg-white md:rounded-3xl w-full max-w-6xl shadow-2xl h-full md:max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        {/* LEFT: Editor Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-r border-gray-100 bg-white relative">
           {/* Mobile Close */}
           <button onClick={onCancel} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full md:hidden">
               <X size={20} />
           </button>

           <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-serif font-bold text-gray-900">
                   {initialData ? 'Edit Package' : 'Create Package'}
               </h2>
               <Button variant="ghost" size="sm" onClick={handleAiSuggest} disabled={isGenerating} className="text-purple-600 bg-purple-50 hover:bg-purple-100 hidden md:flex">
                   {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="mr-2" />}
                   Auto-Fill
               </Button>
           </div>

           <form id="package-form" onSubmit={handleSubmit} className="space-y-6 pb-20 md:pb-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Input 
                       label="Package Name"
                       placeholder="e.g. Title Sponsor"
                       value={formData.name || ''}
                       onChange={e => setFormData({...formData, name: e.target.value})}
                       required
                       className="bg-gray-50"
                   />
                   <Select
                       label="Tier Level"
                       value={formData.tier}
                       onChange={e => setFormData({...formData, tier: e.target.value})}
                       options={['Title', 'Gold', 'Silver', 'Bronze', 'Custom']}
                       className="bg-gray-50"
                   />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                   <Input 
                       label="Base Price ($)"
                       type="number"
                       value={formData.default_price}
                       onChange={e => setFormData({...formData, default_price: Number(e.target.value)})}
                       icon={<DollarSign size={14} />}
                       className="bg-gray-50"
                   />
                   <Input 
                       label="Inventory (Slots)"
                       type="number"
                       value={formData.default_slots || 0}
                       onChange={e => setFormData({...formData, default_slots: Number(e.target.value)})}
                       className="bg-gray-50"
                   />
               </div>

               <Textarea 
                   label="Description"
                   placeholder="What value does this package provide?"
                   value={formData.description || ''}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   className="h-24 bg-gray-50"
               />

               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                   <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 block">Deliverables Builder</label>
                   <div className="flex gap-2 mb-4">
                       <Input 
                           placeholder="e.g. Logo on Step & Repeat"
                           value={newDeliverable}
                           onChange={e => setNewDeliverable(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddDeliverable())}
                           containerClassName="flex-1"
                           className="bg-white"
                       />
                       <Button type="button" onClick={handleAddDeliverable} variant="secondary" className="mt-1.5 aspect-square p-0 w-[46px] flex items-center justify-center">
                           <Plus size={18} />
                       </Button>
                   </div>
                   <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                       {deliverables.map((item, idx) => (
                           <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm group hover:border-purple-300 transition-colors">
                               <div className="flex items-center gap-3">
                                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                   <span className="text-sm text-gray-700 font-medium">{item}</span>
                               </div>
                               <button type="button" onClick={() => handleRemoveDeliverable(idx)} className="text-gray-300 hover:text-red-500 transition-colors">
                                   <X size={14} />
                               </button>
                           </div>
                       ))}
                       {deliverables.length === 0 && (
                           <p className="text-xs text-gray-400 italic text-center py-4">No deliverables added yet.</p>
                       )}
                   </div>
               </div>
           </form>
        </div>

        {/* RIGHT: Preview Pane (Hidden on mobile or toggled) */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gray-50 flex-col relative">
            <div className="absolute top-4 right-4 z-20">
                <button onClick={onCancel} className="p-2 bg-white rounded-full text-gray-500 hover:text-black shadow-sm transition-transform hover:scale-110">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                {/* Card Preview */}
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-2xl w-full max-w-md relative overflow-hidden group transition-transform duration-500 hover:scale-[1.02]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-100 to-pink-50 rounded-bl-[100%] -mr-12 -mt-12 z-0 opacity-50" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 bg-black text-white rounded-2xl shadow-lg flex items-center justify-center">
                           <Award size={28} />
                        </div>
                        {formData.tier && (
                            <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600 border border-gray-200">
                                {formData.tier} Tier
                            </span>
                        )}
                    </div>

                    <h3 className="font-serif font-bold text-3xl mb-2 text-gray-900">{formData.name || 'Package Name'}</h3>
                    <p className="text-4xl font-bold text-purple-600 mb-6 tracking-tight">${(formData.default_price || 0).toLocaleString()}</p>
                    
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed min-h-[3rem]">
                        {formData.description || 'This premium package offers maximum visibility and exclusive access to our VIP audience.'}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Includes</p>
                        {deliverables.length > 0 ? deliverables.map((d, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                <CheckCircle2 size={18} className="text-green-500 shrink-0" /> 
                                <span className="font-medium">{d}</span>
                            </div>
                        )) : (
                            <div className="text-xs text-gray-400 italic bg-gray-50 p-2 rounded border border-dashed border-gray-200">Add items to see preview</div>
                        )}
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <FileText size={14} /> PDF Ready
                        </div>
                        <span className="text-xs font-bold bg-black text-white px-3 py-1.5 rounded-lg">
                            {formData.default_slots || 0} Remaining
                        </span>
                    </div>
                  </div>
                </div>
            </div>
            
            {/* Desktop Footer Actions */}
            <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button variant="primary" form="package-form" disabled={isSaving} className="px-8 shadow-lg shadow-purple-500/20">
                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : null}
                    {isSaving ? 'Saving...' : 'Save Package'}
                </Button>
            </div>
        </div>

        {/* Mobile Sticky Footer */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-3 md:hidden z-50 pb-safe">
             <Button variant="ghost" onClick={onCancel} className="flex-1">Cancel</Button>
             <Button variant="primary" form="package-form" disabled={isSaving} className="flex-1">
                 {isSaving ? 'Saving...' : 'Save Package'}
             </Button>
        </div>

      </div>
    </div>
  );
};
