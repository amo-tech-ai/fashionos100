
import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Camera, Sparkles } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../forms/Input';

interface ShotItem {
  id: string;
  name: string;
  instructions: string;
  status?: string;
}

interface ShootShotListModuleProps {
  items: ShotItem[];
  onUpdate: (items: ShotItem[]) => void;
}

export const ShootShotListModule: React.FC<ShootShotListModuleProps> = ({ items, onUpdate }) => {
  const [newItemName, setNewItemName] = useState('');

  const handleAdd = () => {
    if (!newItemName.trim()) return;
    const newItem: ShotItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: newItemName,
        instructions: 'Standard setup',
        status: 'pending'
    };
    onUpdate([...(items || []), newItem]);
    setNewItemName('');
  };

  const handleDelete = (id: string) => {
      onUpdate(items.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-serif font-bold text-lg text-gray-900">Shot List</h3>
            <span className="text-xs font-bold bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-500">
                {items?.length || 0} Shots
            </span>
        </div>

        <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Camera size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                        placeholder="Add new shot..."
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    />
                </div>
                <Button size="sm" onClick={handleAdd} disabled={!newItemName}>
                    <Plus size={16} />
                </Button>
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-2">
                {items && items.length > 0 ? items.map((item, idx) => (
                    <div key={item.id} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                        <span className="text-gray-300 cursor-move"><GripVertical size={14} /></span>
                        <span className="text-xs font-bold text-gray-400 w-6">{(idx + 1).toString().padStart(2, '0')}</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500 truncate">{item.instructions}</p>
                        </div>
                        <button onClick={() => handleDelete(item.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1">
                            <Trash2 size={14} />
                        </button>
                    </div>
                )) : (
                    <div className="text-center py-12 text-gray-400 text-sm">
                        No shots added yet.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
