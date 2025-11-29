import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TITLE_MAP: Record<string, string> = {
  '/': 'FashionOS | Premium Studio & Agency Platform',
  '/services': 'Services | FashionOS',
  '/directory': 'Directory | FashionOS',
  '/events': 'Events | FashionOS',
  '/shop': 'Marketplace | FashionOS',
  '/about': 'About Us | FashionOS',
  '/contact': 'Contact | FashionOS',
  '/pricing': 'Pricing | FashionOS',
  '/login': 'Login | FashionOS',
  '/start-project': 'Book a Shoot | FashionOS',
  '/dashboard': 'Dashboard | FashionOS'
};

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Find exact match or use default logic
    const title = TITLE_MAP[location.pathname] || 'FashionOS';
    document.title = title;
  }, [location]);
};