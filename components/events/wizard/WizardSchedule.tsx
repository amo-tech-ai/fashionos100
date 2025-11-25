import React from 'react';
import { Plus, X, Clock } from 'lucide-react';
import { Button } from '../../Button';
import { Input } from '../../forms/Input';
import { WizardState } from './types';

interface WizardScheduleProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

export const WizardSchedule: React.FC<WizardScheduleProps> = ({ data, updateData }) => {
  const addScheduleItem = () => {
    updateData({
      schedule: [...data.schedule, { time: '', activity: '' }]
    });
  };

  const updateScheduleItem = (index: number, field: 'time' | 'activity', value: string) => {
    const newSchedule = [...data.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    updateData({ schedule: newSchedule });
  };

  const removeScheduleItem = (index: number) => {
    const newSchedule = data.schedule.filter((_, i) => i !== index);
    updateData({ schedule: newSchedule });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold">Run of Show</h2>
          <p className="text-gray-500 text-sm mt-1">Plan the sequence of events for your guests.</p>
        </div>
        <Button variant="outline" size="sm" onClick={addScheduleItem}>
          <Plus size={14} className="mr-1" /> Add Item
        </Button>
      </div>

      <div className="space-y-4">
        {data.schedule.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <Clock className="mx-auto text-gray-300 mb-2" size={24} />
            <p className="text-gray-400 text-sm">No schedule items yet.</p>
            <button onClick={addScheduleItem} className="text-purple-600 font-bold text-xs mt-2 hover:underline">Add the first item</button>
          </div>
        )}

        {data.schedule.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start group">
            <div className="w-24 shrink-0">
              <Input
                label="Time"
                type="time"
                value={item.time}
                onChange={(e) => updateScheduleItem(idx, 'time', e.target.value)}
                className="bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="flex-1">
              <Input
                label="Activity"
                type="text"
                value={item.activity}
                onChange={(e) => updateScheduleItem(idx, 'activity', e.target.value)}
                className="bg-gray-50 focus:bg-white"
                placeholder="e.g. Doors Open"
              />
            </div>
            <button 
              onClick={() => removeScheduleItem(idx)}
              className="mt-7 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};