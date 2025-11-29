
import { useState, useEffect } from 'react';
import { profileService, Profile } from '../lib/profile-service';
import { useToast } from '../components/Toast';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { error: showError } = useToast();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getProfile();
      if (data) {
        setProfile(data.profile);
      }
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      // showError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const updated = await profileService.updateProfile(updates);
      setProfile(updated);
      return updated;
    } catch (err: any) {
      showError('Failed to update profile');
      throw err;
    }
  };

  return { profile, loading, refetch: fetchProfile, updateProfile };
};
