import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../../Button';
import { WizardState } from './types';

interface WizardTicketsProps {
  data: WizardState;
  updateData: (updates: Partial<WizardState>) => void;
}

export const WizardTickets: React.FC<WizardTicketsProps> = ({ data, updateData }) => {
  const totalCapacity = data.tickets.reduce((sum, t) => sum + t.quantity, 0);
  const potentialRevenue = data.tickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);

  const updateTicket = (index: number, field: string, value: any) => {
    const newTickets = [...data.tickets];
    newTickets[index] = { ...newTickets[index], [field]: value };
    updateData({ tickets: newTickets });
  };

  const removeTicket = (index: number) => {
    const newTickets = data.tickets.filter((_, i) => i !== index);
    updateData({ tickets: newTickets });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-6">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-serif font-bold">Ticket Tiers</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => updateData({ tickets: [...data.tickets, { name: '', price: 0, quantity: 0 }] })}
          >
            <Plus size={14} className="mr-1" /> Add Tier
          </Button>
        </div>

        <div className="space-y-4">
          {data.tickets.map((ticket, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50 p-4 rounded-xl border border-gray-200 group">
              <div className="flex-1 space-y-1 w-full">
                <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Ticket Name</label>
                <input 
                  type="text" 
                  value={ticket.name}
                  onChange={(e) => updateTicket(idx, 'name', e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold"
                  placeholder="e.g. VIP"
                />
              </div>
              <div className="w-full sm:w-32 space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Price ($)</label>
                <input 
                  type="number" 
                  value={ticket.price}
                  onChange={(e) => updateTicket(idx, 'price', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="w-full sm:w-32 space-y-1">
                <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Quantity</label>
                <input 
                  type="number" 
                  value={ticket.quantity}
                  onChange={(e) => updateTicket(idx, 'quantity', parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              {data.tickets.length > 1 && (
                <button 
                  onClick={() => removeTicket(idx)}
                  className="p-2 text-gray-400 hover:text-red-500 sm:mt-5"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Total Capacity</p>
          <p className="text-2xl font-bold text-gray-900">{totalCapacity}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Est. Revenue</p>
          <p className="text-2xl font-bold text-green-600">${potentialRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};