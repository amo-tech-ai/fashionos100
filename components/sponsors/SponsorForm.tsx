
import React, { useState, useEffect } from 'react';
import { X, Save, Building2, Globe, User, Mail, Phone, FileImage } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../forms/Input';
import { SponsorProfile } from '../../types/sponsorship';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../LoadingSpinner';

interface SponsorFormProps {
  sponsor?: SponsorProfile | null;
  onClose: () => void;
  onSave: () => void;
}

export const SponsorForm: React.FC<SponsorFormProps> = ({ sponsor, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<SponsorProfile>>({
    name: '',
    industry: '',
    website_url: '',
    logo_url: '',
    contact_name: '',
    contact_email: '',
    contact_phone: ''
  });

  useEffect(() => {
    if (sponsor) {
      setFormData({
        name: sponsor.name,
        industry: sponsor.industry,
        website_url: sponsor.website_url,
        logo_url: sponsor.logo_url,
        contact_name: sponsor.contact_name,
        contact_email: sponsor.contact_email,
        contact_phone: sponsor.contact_phone,
      });
    }
  }, [sponsor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (sponsor?.id) {
        // Update
        const { error } = await supabase
          .from('sponsor_profiles')
          .update(formData)
          .eq('id', sponsor.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('sponsor_profiles')
          .insert([formData]);
        if (error) throw error;
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving sponsor:', error);
      alert('Failed to save sponsor profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-xl font-serif font-bold text-gray-900">
            {sponsor ? 'Edit Sponsor Profile' : 'Add New Sponsor'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <Building2 size={14} /> Company Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Company Name" 
                value={formData.name || ''} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Acme Corp"
                required
                className="bg-gray-50"
              />
              <Input 
                label="Industry" 
                value={formData.industry || ''} 
                onChange={e => setFormData({...formData, industry: e.target.value})}
                placeholder="e.g. Beauty, Tech"
                className="bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1">
                  <Globe size={12} /> Website
                </label>
                <input 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black transition-all"
                  value={formData.website_url || ''} 
                  onChange={e => setFormData({...formData, website_url: e.target.value})}
                  placeholder="https://"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1">
                  <FileImage size={12} /> Logo URL
                </label>
                <input 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black transition-all"
                  value={formData.logo_url || ''} 
                  onChange={e => setFormData({...formData, logo_url: e.target.value})}
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <User size={14} /> Primary Contact
            </h4>
            <Input 
              label="Contact Name" 
              value={formData.contact_name || ''} 
              onChange={e => setFormData({...formData, contact_name: e.target.value})}
              placeholder="Jane Doe"
              className="bg-gray-50"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1">
                  <Mail size={12} /> Email
                </label>
                <input 
                  type="email"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black transition-all"
                  value={formData.contact_email || ''} 
                  onChange={e => setFormData({...formData, contact_email: e.target.value})}
                  placeholder="jane@company.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1">
                  <Phone size={12} /> Phone
                </label>
                <input 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black transition-all"
                  value={formData.contact_phone || ''} 
                  onChange={e => setFormData({...formData, contact_phone: e.target.value})}
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="ghost" fullWidth onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? <LoadingSpinner size={16} /> : <><Save size={16} className="mr-2" /> Save Profile</>}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
