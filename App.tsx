import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Auth
import { RequireAuth } from './components/auth/RequireAuth';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { PhotographyPage } from './pages/public/PhotographyPage';
import { VideoProductionPage } from './pages/public/VideoProductionPage';
import { DirectoryPage } from './pages/public/DirectoryPage';
import { EventsPage } from './pages/public/EventsPage';
import { SocialPage } from './pages/public/SocialPage';

// Dashboard Pages
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { DashboardBookings } from './pages/dashboard/DashboardBookings';
import { DashboardCalendar } from './pages/dashboard/DashboardCalendar';
import { DashboardPlaceholder } from './pages/dashboard/DashboardPlaceholder';

const App: React.FC = () => {
  return (
    <Routes>
      {/* --- Public Zone --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/photography" element={<PhotographyPage />} />
        <Route path="/services/video-production" element={<VideoProductionPage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/shop" element={<Navigate to="/services" />} /> {/* Temp redirect */}
      </Route>

      {/* --- Authenticated Dashboard Zone --- */}
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
        
        {/* Modules under development */}
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