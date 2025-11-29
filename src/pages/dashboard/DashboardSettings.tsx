
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Bell, Shield, CreditCard, Save, Mail, Smartphone, 
  Globe, LogOut, Building2, Plus, Trash2, Users as UsersIcon, Camera, Loader2
} from 'lucide-react';
import { Button } from '../../components/Button';
import { Input } from '../../components/forms/Input';
import { FadeIn } from '../../components/FadeIn';
import { PageHeader } from '../../components/dashboard/Shared';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../components/Toast';
import { profileService } from '../../lib/profile-service';

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
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'team' | 'billing'>('profile');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    avatarUrl: '',
    role: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileService.getProfile();
      if (data && data.user) {
        setProfileData({
          fullName: data.profile?.full_name || '',
          email: data.user.email || '',
          phone: '', // Phone not in default auth schema usually, would need custom field
          companyName: data.company?.name || data.profile?.company_name || '',
          website: data.company?.website_url || '',
          avatarUrl: data.profile?.avatar_url || '',
          role: data.profile?.role || 'User'
        });
      }
    } catch (e) {
      console.error("Failed to load profile", e);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update Profile
      await profileService.updateProfile({
        full_name: profileData.fullName,
      });

      // Update Company
      if (profileData.companyName) {
        await profileService.updateCompany(profileData.companyName, profileData.website);
      }

      success("Settings saved successfully");
    } catch (e) {
      console.error(e);
      error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    try {
      const file = e.target.files[0];
      const url = await profileService.uploadAvatar(file);
      setProfileData(prev => ({ ...prev, avatarUrl: url }));
      success("Avatar updated");
    } catch (e) {
      console.error(e);
      error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const getInitials = (name: string) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
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
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-0 z-20">
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
                  <div 
                    className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-serif text-gray-400 relative overflow-hidden group cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profileData.avatarUrl ? (
                      <img src={profileData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      getInitials(profileData.fullName)
                    )}
                    
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Camera size={20} />}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleAvatarUpload} 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{profileData.fullName || 'User'}</h4>
                    <p className="text-sm text-gray-500">{profileData.role} at {profileData.companyName || 'Unknown Company'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="Full Name" 
                    value={profileData.fullName} 
                    onChange={e => setProfileData({...profileData, fullName: e.target.value})} 
                  />
                  <Input 
                    label="Email Address" 
                    value={profileData.email} 
                    type="email"
                    disabled // Email usually handled via auth provider update flow
                    icon={<Mail size={16} />}
                    className="bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-6">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400">Company Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      label="Company Name" 
                      value={profileData.companyName} 
                      onChange={e => setProfileData({...profileData, companyName: e.target.value})} 
                      icon={<Building2 size={16} />}
                    />
                    <Input 
                      label="Website" 
                      value={profileData.website} 
                      onChange={e => setProfileData({...profileData, website: e.target.value})} 
                      icon={<Globe size={16} />}
                      placeholder="https://"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                   <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                     <Save size={16} /> {isLoading ? 'Saving...' : 'Save Changes'}
                   </Button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS (Mock for now, similar structure to before but clearer separation) */}
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
                        checked={true}
                        onChange={() => {}}
                      />
                      <div className="h-px bg-gray-200" />
                      <Toggle 
                        label="Marketing & Trends" 
                        desc="Weekly fashion insights and platform updates."
                        checked={false}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                   <Button onClick={() => success("Preferences saved")}>Save Preferences</Button>
                </div>
              </div>
            )}

            {/* TEAM (Mock for MVP, but ready structure) */}
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
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 overflow-hidden">
                         {profileData.avatarUrl ? <img src={profileData.avatarUrl} className="w-full h-full object-cover" /> : getInitials(profileData.fullName)}
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm">{profileData.fullName} (You)</h5>
                        <p className="text-xs text-gray-500">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold bg-purple-100 text-purple-600 px-3 py-1 rounded-full uppercase tracking-wider">
                        Owner
                      </span>
                    </div>
                  </div>
                  {/* Example invite */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 opacity-60">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-400">
                           SJ
                        </div>
                        <div>
                           <h5 className="font-bold text-gray-700 text-sm">Sarah J.</h5>
                           <p className="text-xs text-gray-500">sarah@example.com</p>
                        </div>
                     </div>
                     <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">Pending</span>
                  </div>
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
