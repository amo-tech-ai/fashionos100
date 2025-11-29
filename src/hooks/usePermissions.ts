
import { useProfile } from './useProfile';

export type UserRole = 'admin' | 'designer' | 'sponsor' | 'model' | 'creative' | 'guest';

export const usePermissions = () => {
  const { profile, loading } = useProfile();

  const role = (profile?.role as UserRole) || 'guest';

  const canAccessStudio = ['admin', 'designer', 'creative'].includes(role);
  const canAccessEvents = ['admin', 'designer', 'organizer'].includes(role);
  const canAccessSponsors = ['admin'].includes(role);
  const canAccessFinance = ['admin'].includes(role);
  
  // Sponsor Portal is specifically for the 'sponsor' role
  const isSponsor = role === 'sponsor';
  
  // Admin has god mode
  const isAdmin = role === 'admin';

  return {
    role,
    loading,
    canAccessStudio,
    canAccessEvents,
    canAccessSponsors,
    canAccessFinance,
    isSponsor,
    isAdmin
  };
};
