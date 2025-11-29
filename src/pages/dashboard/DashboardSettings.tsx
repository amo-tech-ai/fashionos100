
import React, { useState } from 'react';
import { 
  User, Bell, Shield, CreditCard, Save, Mail, Smartphone, 
  Globe, LogOut, Building2, Plus, Trash2, Users as UsersIcon
} from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/forms/Input';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader } from '../../components/dashboard/Shared';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../components/Toast';

// Helper Toggle Component
const Toggle = ({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: () => void }) => (
  <div className="flex items-start justify-between cursor-pointer" onClick={onChange}>
    <div>
      <p className="text-sm font-bold text-gray-900">{label}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
    <div className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-purple-600' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  </div>
);

export const DashboardSettings: React.FC = () => {
  const { success } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'team' | 'billing'>('profile');

  // Mock State for Demo
  const [profile, setProfile] = useState({
    firstName: 'Orlando',
    lastName: 'L.',
    email: 'orlando@fashionos.com',
    phone: '+1 (555) 123-4567',
    company: 'FashionOS Studio',
    role: 'Admin'
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailMarketing: false,
    pushMessages: true,
    pushUpdates: false
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API Call
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    success("Settings saved successfully");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account preferences and team."
        breadcrumbs={['Dashboard', 'Settings']}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
            <nav className="flex flex-col p-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'team', label: 'Team Members', icon: UsersIcon },
                { id: 'billing', label: 'Billing', icon: CreditCard },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <item.icon size={18} /> {item.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100 mt-2">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <FadeIn key={activeTab} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 min-h-[500px]">
            
            {/* PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-gray-900 mb-1">Profile Information</h3>
                  <p className="text-gray-500 text-sm">Update your personal details and public profile.</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-serif text-gray-400 relative overflow-hidden group cursor-pointer">
                    {profile.firstName[0]}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold uppercase">
                      Change
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{profile.firstName} {profile.lastName}</h4>
                    <p className="text-sm text-gray-500">{profile.role} at {profile.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="First Name" 
                    value={profile.firstName} 
                    onChange={e => setProfile({...profile, firstName: e.target.value})} 
                  />
                  <Input 
                    label="Last Name" 
                    value={profile.lastName} 
                    onChange={e => setProfile({...profile, lastName: e.target.value})} 
                  />
                  <Input 
                    label="Email Address" 
                    value={profile.email} 
                    type="email"
                    onChange={e => setProfile({...profile, email: e.target.value})} 
                    icon={<Mail size={16} />}
                  />
                  <Input 
                    label="Phone Number" 
                    value={profile.phone} 
                    onChange={e => setProfile({...profile, phone: e.target.value})} 
                    icon={<Smartphone size={16} />}
                  />
                </div>

                <div className="pt-6 border-t border-gray-100">
                   <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                     <Save size={16} /> {isLoading ? 'Saving...' : 'Save Changes'}
                   </Button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-gray-900 mb-1">Notification Preferences</h3>
                  <p className="text-gray-500 text-sm">Control how and when we communicate with you.</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Mail size={18} className="text-purple-600" /> Email Notifications
                    </h4>
                    <div className="space-y-4">
                      <Toggle 
                        label="Order Updates" 
                        desc="Receive emails about your booking status and asset delivery."
                        checked={notifications.emailOrders}
                        onChange={() => setNotifications(p => ({...p, emailOrders: !p.emailOrders}))}
                      />
                      <div className="h-px bg-gray-200" />
                      <Toggle 
                        label="Marketing & Trends" 
                        desc="Weekly fashion insights and platform updates."
                        checked={notifications.emailMarketing}
                        onChange={() => setNotifications(p => ({...p, emailMarketing: !p.emailMarketing}))}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Smartphone size={18} className="text-purple-600" /> Push Notifications
                    </h4>
                    <div className="space-y-4">
                      <Toggle 
                        label="New Messages" 
                        desc="Get notified when talent or support messages you."
                        checked={notifications.pushMessages}
                        onChange={() => setNotifications(p => ({...p, pushMessages: !p.pushMessages}))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                   <Button onClick={handleSave}>Save Preferences</Button>
                </div>
              </div>
            )}

            {/* TEAM */}
            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-gray-900 mb-1">Team Members</h3>
                    <p className="text-gray-500 text-sm">Manage access to your FashionOS workspace.</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Plus size={16} /> Invite Member
                  </Button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Orlando L.', role: 'Admin', email: 'orlando@fashionos.com' },
                    { name: 'Sarah J.', role: 'Editor', email: 'sarah@fashionos.com' },
                    { name: 'Mike R.', role: 'Viewer', email: 'mike@fashionos.com' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                          {member.name[0]}
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900 text-sm">{member.name}</h5>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase tracking-wider">
                          {member.role}
                        </span>
                        <button className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

             {/* BILLING */}
             {activeTab === 'billing' && (
               <div className="text-center py-20">
                 <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CreditCard size={32} className="text-purple-500" />
                 </div>
                 <h3 className="font-serif font-bold text-2xl mb-2">Billing Portal</h3>
                 <p className="text-gray-500 mb-8 max-w-md mx-auto">
                   Manage your subscription, payment methods, and invoices via our secure Stripe portal.
                 </p>
                 <Button variant="primary" className="gap-2">
                   Open Customer Portal <Globe size={16} />
                 </Button>
               </div>
             )}

          </FadeIn>
        </div>
      </div>
    </div>
  );
};
