import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import { PublicLayout } from './components/Layout';
import { DashboardLayout } from './components/DashboardLayout';

// Public Pages
import { HomePage, ServicesPage, DirectoryPage, EventsPage, SocialPage } from './pages/PublicPages';

// Dashboard Views
import { 
  DashboardOverview, 
  DashboardBookings, 
  DashboardCalendar, 
  DashboardPlaceholder 
} from './pages/DashboardPage';

// Simple Auth Mock - In a real app, this would use a Context Provider (e.g., Clerk, Supabase)
const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = true; // Set to false to test redirect
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* --- Public Marketing Routes --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/social" element={<SocialPage />} />
      </Route>

      {/* --- Private Dashboard Routes --- */}
      <Route 
        path="/dashboard" 
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="bookings" element={<DashboardBookings />} />
        <Route path="calendar" element={<DashboardCalendar />} />
        
        {/* Placeholders for remaining routes */}
        <Route path="events" element={<DashboardPlaceholder title="Events Management" />} />
        <Route path="financials" element={<DashboardPlaceholder title="Financials" />} />
        <Route path="social" element={<DashboardPlaceholder title="Social Analytics" />} />
        <Route path="directory" element={<DashboardPlaceholder title="Talent CRM" />} />
        <Route path="shop" element={<DashboardPlaceholder title="E-Commerce" />} />
        <Route path="settings" element={<DashboardPlaceholder title="Settings" />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;