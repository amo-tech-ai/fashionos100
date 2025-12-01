
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../forms/Input';
import { SponsorContact } from '../../types/sponsorship';
import { sponsorService } from '../../lib/sponsor-service';
import { useToast } from '../Toast';
import { FadeIn } from '../FadeIn';

interface SponsorContactListProps {
  sponsorId: string;
}

export const SponsorContactList: React.FC<SponsorContactListProps> = ({ sponsorId }) => {
  const [contacts, setContacts] = useState<SponsorContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });

  const { success, error } = useToast();

  const fetchContacts = async () => {
    try {
      const data = await sponsorService.getContacts(sponsorId);
      setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [sponsorId]);

  const handleSave = async () => {
    if (!newContact.name) return;
    setSubmitting(true);
    try {
      await sponsorService.saveContact({
        sponsor_id: sponsorId,
        name: newContact.name,
        email: newContact.email,
        role: newContact.role,
        phone: newContact.phone,
        is_primary: contacts.length === 0 // First contact is primary by default
      });
      success("Contact added successfully");
      setNewContact({ name: '', role: '', email: '', phone: '' });
      setIsAdding(false);
      fetchContacts();
    } catch (e) {
      console.error(e);
      error("Failed to save contact");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await sponsorService.deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      success("Contact deleted");
    } catch (e) {
      error("Failed to delete contact");
    }
  };

  if (loading) return <div className="py-8 text-center"><Loader2 className="animate-spin mx-auto text-purple-600" /></div>;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif font-bold text-lg">Key People</h3>
        <Button size="sm" variant="outline" onClick={() => setIsAdding(!isAdding)}>
          <Plus size={14} className="mr-1"/> Add Contact
        </Button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 animate-in fade-in slide-in-from-top-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">New Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input 
              placeholder="Name" 
              value={newContact.name} 
              onChange={e => setNewContact({...newContact, name: e.target.value})} 
              className="bg-white" 
            />
            <Input 
              placeholder="Role" 
              value={newContact.role} 
              onChange={e => setNewContact({...newContact, role: e.target.value})} 
              className="bg-white" 
            />
            <Input 
              placeholder="Email" 
              value={newContact.email} 
              onChange={e => setNewContact({...newContact, email: e.target.value})} 
              className="bg-white" 
            />
            <Input 
              placeholder="Phone" 
              value={newContact.phone} 
              onChange={e => setNewContact({...newContact, phone: e.target.value})} 
              className="bg-white" 
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button size="sm" variant="primary" onClick={handleSave} disabled={!newContact.name || submitting}>
              {submitting ? <Loader2 className="animate-spin" size={14} /> : 'Save'}
            </Button>
          </div>
        </div>
      )}

      {/* Contact List */}
      <div className="space-y-3">
        {contacts.map((contact) => (
          <FadeIn key={contact.id}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-purple-200 hover:bg-purple-50/10 transition-all group">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${contact.is_primary ? 'bg-purple-100 text-purple-600 border-purple-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">{contact.name}</p>
                    {contact.is_primary && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold uppercase">Primary</span>}
                  </div>
                  <p className="text-xs text-gray-500">{contact.role || 'No Role'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pl-14 sm:pl-0">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="p-2 text-gray-400 hover:text-purple-600 bg-gray-50 hover:bg-white rounded-full transition-colors border border-transparent hover:border-purple-100">
                    <Mail size={14}/>
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="p-2 text-gray-400 hover:text-purple-600 bg-gray-50 hover:bg-white rounded-full transition-colors border border-transparent hover:border-purple-100">
                    <Phone size={14}/>
                  </a>
                )}
                <button 
                  onClick={() => handleDelete(contact.id)} 
                  className="p-2 text-gray-300 hover:text-red-500 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          </FadeIn>
        ))}

        {contacts.length === 0 && !loading && (
          <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl">
            <User className="mx-auto text-gray-300 mb-2" size={24} />
            <p className="text-sm text-gray-400">No contacts added yet.</p>
            <Button variant="ghost" size="sm" onClick={() => setIsAdding(true)} className="mt-2 text-purple-600">
              Add Primary Contact
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};