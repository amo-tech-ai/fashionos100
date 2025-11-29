
import React, { useState } from 'react';
import { Textarea } from '../forms/Textarea';
import { Button } from '../Button';
import { Wand2, Save, Loader2 } from 'lucide-react';
import { useBookingAI } from '../../hooks/useBookingAI';

interface ShootBriefModuleProps {
  brief: string;
  onSave: (newBrief: string) => void;
}

export const ShootBriefModule: React.FC<ShootBriefModuleProps> = ({ brief, onSave }) => {
  const [text, setText] = useState(brief || '');
  const [isEditing, setIsEditing] = useState(false);
  const { polishBrief, loading } = useBookingAI();

  const handlePolish = async () => {
    const result = await polishBrief(text);
    if (result?.polished_text) {
        setText(result.polished_text);
        onSave(result.polished_text); // Auto-save polished version
    }
  };

  const handleSave = () => {
      onSave(text);
      setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-serif font-bold text-lg text-gray-900">Creative Brief</h3>
            <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handlePolish} disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" size={14} /> : <Wand2 size={14} className="text-purple-600" />}
                </Button>
                {isEditing ? (
                    <Button variant="primary" size="sm" onClick={handleSave}>
                        <Save size={14} />
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                )}
            </div>
        </div>
        
        <div className="p-6 flex-1">
            {isEditing ? (
                <Textarea 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    className="h-full min-h-[300px] border-none bg-transparent focus:ring-0 p-0 resize-none"
                    placeholder="Describe your vision..."
                />
            ) : (
                <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
                    {text || "No brief provided."}
                </div>
            )}
        </div>
    </div>
  );
};
