
import React, { useState, useEffect } from 'react';
import { X, Save, Building2, Globe, User, Mail, Phone, FileImage, Tag, Sparkles, Instagram } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Textarea } from '../forms/Textarea';
import { SponsorProfile, SponsorType } from '../../types/sponsorship';
import { supabase } from '../../lib/supabase';
import { LoadingSpinner } from '../LoadingSpinner';
import { aiService } from '../../lib/ai-service';

interface SponsorFormProps {
  sponsor?: SponsorProfile | null;
  onClose: () => void;
  onSave: () => void;
}

const SPONSOR_TYPES: SponsorType[] = [
  'Luxury Brand', 'Beauty & Cosmetics', 'Retailer', 'Media Outlet', 
  'Lifestyle & Wellness', 'Technology Partner', 'Beverage & Spirits', 
  'Automotive Partner', 'Local Business', 'Other'
];

export const SponsorForm: React.FC<SponsorFormProps> = ({ sponsor, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [generatingStory, setGeneratingStory] = useState(false);
  const [socialLinksStr, setSocialLinksStr] = useState('');
  const [formData, setFormData] = useState<Partial<SponsorProfile>>({
    name: '',
    industry: '',
    sponsor_type: 'Other',
    website_url: '',
    logo_url: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    brand_story: '',
    social_links: []
  });

  useEffect(() => {
    if (sponsor) {
      setFormData({
        name: sponsor.name,
        industry: sponsor.industry,
        sponsor_type: sponsor.sponsor_type || 'Other',
        website_url: sponsor.website_url,
        logo_url: sponsor.logo_url,
        contact_name: sponsor.contact_name,
        contact_email: sponsor.contact_email,
        contact_phone: sponsor.contact_phone,
        brand_story: sponsor.brand_story || '',
        social_links: sponsor.social_links || []
      });
      setSocialLinksStr(sponsor.social_links?.join(', ') || '');
    }
  }, [sponsor]);

  const handleGenerateStory = async () => {
    if (!formData.name || !formData.industry) {
        alert("Please enter Company Name and Industry first to generate a story.");
        return;
    }
    setGeneratingStory(true);
    try {
        const result = await aiService.sponsorAgent('generate-brand-story', {
            sponsorName: formData.name,
            sponsorIndustry: formData.industry
        });
        
        if (result.success && typeof result.data === 'string') {
            setFormData(prev => ({ ...prev, brand_story: result.data }));
        } else {
            console.error("Invalid AI response", result);
            alert("Failed to generate story from AI.");
        }
    } catch (e) {
        console.error(e);
        alert("Failed to generate story. Please check your connection.");
    } finally {
        setGeneratingStory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Process social links robustly
    const links = socialLinksStr
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const payload = {
        ...formData,
        social_links: links
    };

    try {
      if (sponsor?.id) {
        // Update
        const { error } = await supabase
          .from('sponsor_profiles')
          .update(payload)
          .eq('id', sponsor.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase
          .from('sponsor_profiles')
          .insert([payload]);
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
              <Select
                label="Sponsor Type"
                value={formData.sponsor_type || ''}
                onChange={e => setFormData({...formData, sponsor_type: e.target.value as SponsorType})}
                options={SPONSOR_TYPES}
                className="bg-gray-50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Industry (Specific)" 
                value={formData.industry || ''} 
                onChange={e => setFormData({...formData, industry: e.target.value})}
                placeholder="e.g. Organic Skincare"
                className="bg-gray-50"
              />
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

            {/* Brand Story with AI */}
            <div className="space-y-1.5 relative">
                <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1">
                        <Tag size={12} /> Brand Story
                    </label>
                    <button 
                        type="button"
                        onClick={handleGenerateStory}
                        disabled={generatingStory}
                        className="text-[10px] font-bold text-purple-600 flex items-center gap-1 hover:text-purple-800 transition-colors uppercase tracking-wider mb-1"
                    >
                        {generatingStory ? <LoadingSpinner size={12} /> : <Sparkles size={12} />}
                        {generatingStory ? 'Writing...' : 'AI Generate Draft'}
                    </button>
                </div>
                <Textarea 
                    className="h-24 bg-gray-50"
                    placeholder="Our mission is to..."
                    value={formData.brand_story || ''}
                    onChange={e => setFormData({...formData, brand_story: e.target.value})}
                />
            </div>

            {/* Social Links */}
            <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1 flex items-center gap-1">
                  <Instagram size={12} /> Social Media Links (Comma Separated)
                </label>
                <input 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-black transition-all"
                  value={socialLinksStr} 
                  onChange={e => setSocialLinksStr(e.target.value)}
                  placeholder="https://instagram.com/brand, https://tiktok.com/@brand"
                />
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
