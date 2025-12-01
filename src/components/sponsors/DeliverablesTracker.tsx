import React, { useState, useRef } from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle, Paperclip, MoreHorizontal, Filter, User, Plus, Trash2, Upload, X, Download, Loader2 } from 'lucide-react';
import { SponsorDeliverable, DeliverableStatus, EventSponsor } from '../../types/sponsorship';
import { StatusBadge } from '../StatusBadge';
import { Button } from '../Button';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';

interface DeliverablesTrackerProps {
  deliverables: SponsorDeliverable[];
  compact?: boolean;
  deals?: EventSponsor[];
  onAdd?: (item: Partial<SponsorDeliverable>) => Promise<void>;
  onUpdate?: (id: string, updates: Partial<SponsorDeliverable>) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onUpload?: (id: string, file: File) => Promise<void>;
  readOnly?: boolean;
}

export const DeliverablesTracker: React.FC<DeliverablesTrackerProps> = ({ 
  deliverables, 
  compact = false,
  deals = [],
  onAdd,
  onUpdate,
  onDelete,
  onUpload,
  readOnly = false
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'doc',
    due_date: '',
    event_sponsor_id: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'pending_review': return <Clock className="text-amber-500" size={16} />;
      case 'blocked': return <AlertCircle className="text-red-500" size={16} />;
      case 'uploaded': return <CheckCircle2 className="text-purple-500" size={16} />;
      default: return <Circle className="text-gray-300" size={16} />;
    }
  };

  const statusColors: Record<DeliverableStatus, string> = {
    'not_started': 'bg-gray-100 text-gray-600',
    'in_progress': 'bg-blue-50 text-blue-700',
    'pending': 'bg-gray-100 text-gray-600',
    'uploaded': 'bg-purple-50 text-purple-700',
    'pending_review': 'bg-amber-50 text-amber-700',
    'approved': 'bg-green-50 text-green-700',
    'blocked': 'bg-red-50 text-red-700'
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.event_sponsor_id || !onAdd) return;
    setIsSubmitting(true);
    try {
      await onAdd({
        title: newItem.title,
        type: newItem.type,
        due_date: newItem.due_date || new Date(Date.now() + 7 * 86400000).toISOString(),
        event_sponsor_id: newItem.event_sponsor_id,
        status: 'pending'
      });
      setNewItem({ title: '', type: 'doc', due_date: '', event_sponsor_id: '' });
      setIsAdding(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file || !onUpload) return;
    
    setUploadingId(id);
    try {
      await onUpload(id, file);
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingId(null);
      // Reset input
      e.target.value = '';
    }
  };

  const triggerUpload = (id: string) => {
    const input = document.getElementById(`file-upload-${id}`) as HTMLInputElement;
    if (input) input.click();
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {!compact && (
        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-serif font-bold text-gray-900">Deliverables Tracker</h3>
          <div className="flex items-center gap-2">
             {!readOnly && onAdd && (
                <Button size="sm" variant="outline" onClick={() => setIsAdding(!isAdding)} className="gap-1">
                   <Plus size={14} /> Add Item
                </Button>
             )}
             <div className="hidden sm:flex items-center gap-2">
                <button className="p-2 hover:bg-white rounded-lg text-gray-400 transition-colors">
                    <Filter size={16} />
                </button>
                <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                    {deliverables.length} Items
                </span>
             </div>
          </div>
        </div>
      )}

      {isAdding && deals && deals.length > 0 && (
        <div className="p-4 bg-gray-50 border-b border-gray-100 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
             <Input 
                placeholder="Deliverable Title (e.g. Logo Vector)" 
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                className="bg-white"
             />
             <Select 
                options={deals.map(d => ({ label: `${d.event?.title} (${d.level || 'Deal'})`, value: d.id }))}
                value={newItem.event_sponsor_id}
                onChange={(e) => setNewItem({...newItem, event_sponsor_id: e.target.value})}
                className="bg-white"
             />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
             <Select 
                options={[
                    { label: 'Document', value: 'doc' },
                    { label: 'Logo/Image', value: 'logo' },
                    { label: 'Video', value: 'video' },
                    { label: 'Physical Asset', value: 'physical' }
                ]}
                value={newItem.type}
                onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                className="bg-white"
             />
             <Input 
                type="date"
                value={newItem.due_date.split('T')[0]}
                onChange={(e) => setNewItem({...newItem, due_date: new Date(e.target.value).toISOString()})}
                className="bg-white"
             />
          </div>
          <div className="flex justify-end gap-2">
             <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
             <Button size="sm" variant="primary" onClick={handleAddItem} disabled={isSubmitting || !newItem.title || !newItem.event_sponsor_id}>
                {isSubmitting ? <Loader2 className="animate-spin" size={14}/> : 'Save Item'}
             </Button>
          </div>
        </div>
      )}
      
      <div className="divide-y divide-gray-50">
        {deliverables.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">No deliverables tracked yet.</div>
        ) : (
            deliverables.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="shrink-0 pt-1 cursor-pointer" title="Status">
                        {getStatusIcon(item.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 truncate">{item.title}</span>
                            {item.asset_url && (
                                <a href={item.asset_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 transition-colors">
                                    <Download size={14} />
                                </a>
                            )}
                        </div>
                        {!compact && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="font-medium">{item.event_sponsor?.sponsor?.name}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span>{item.event_sponsor?.event?.title || 'General'}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="text-left sm:text-right min-w-[80px]">
                        <div className={`text-xs font-medium ${item.due_date && new Date(item.due_date) < new Date() && item.status !== 'approved' ? 'text-red-500' : 'text-gray-500'}`}>
                            {item.due_date ? new Date(item.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'No Date'}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Select 
                           value={item.status}
                           onChange={(e) => onUpdate && onUpdate(item.id, { status: e.target.value as DeliverableStatus })}
                           options={['pending', 'in_progress', 'uploaded', 'pending_review', 'approved', 'blocked']}
                           className={`text-[10px] h-7 py-0 pl-2 pr-6 w-auto min-w-[100px] border-none shadow-none ${statusColors[item.status] || 'bg-gray-100'}`}
                           disabled={readOnly}
                        />

                        {!readOnly && (
                            <div className="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                <input 
                                    type="file" 
                                    id={`file-upload-${item.id}`} 
                                    className="hidden" 
                                    onChange={(e) => handleFileChange(e, item.id)}
                                />
                                <button 
                                    onClick={() => triggerUpload(item.id)}
                                    className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                                    title="Upload Asset"
                                    disabled={uploadingId === item.id}
                                >
                                    {uploadingId === item.id ? <Loader2 size={16} className="animate-spin"/> : <Upload size={16} />}
                                </button>
                                <button 
                                    onClick={() => onDelete && onDelete(item.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};