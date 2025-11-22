
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
import { EcommercePage } from './pages/public/EcommercePage';
import { StartProjectPage } from './pages/public/StartProjectPage';

// Dashboard Pages
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { DashboardBookings } from './pages/dashboard/DashboardBookings';
import { DashboardCalendar } from './pages/dashboard/DashboardCalendar';
import { DashboardEvents } from './pages/dashboard/DashboardEvents';
import { DashboardFinancials } from './pages/dashboard/DashboardFinancials';
import { DashboardGallery } from './pages/dashboard/DashboardGallery';
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
        <Route path="/services/social" element={<SocialPage />} />
        <Route path="/services/ecommerce" element={<EcommercePage />} />
        
        {/* Booking Wizard */}
        <Route path="/start-project" element={<StartProjectPage />} />
        
        {/* Placeholders for future pages ensuring links work */}
        <Route path="/services/web-design" element={<ServicesPage />} />
        <Route path="/portfolio" element={<DirectoryPage />} /> {/* Using Directory as Portfolio fallback for now */}
        <Route path="/contact" element={<ServicesPage />} /> {/* Using Services as Contact fallback for now */}
        
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/events" element={<EventsPage />} />
        
        {/* Legacy redirects */}
        <Route path="/social" element={<Navigate to="/services/social" replace />} />
        <Route path="/shop" element={<Navigate to="/services/ecommerce" />} />
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
        <Route path="events" element={<DashboardEvents />} />
        <Route path="financials" element={<DashboardFinancials />} />
        <Route path="gallery" element={<DashboardGallery />} />
        
        {/* New Modules */}
        <Route path="invoices" element={<DashboardPlaceholder title="Invoices & Billing" />} />
        <Route path="messages" element={<DashboardPlaceholder title="Messages & Inbox" />} />
        <Route path="feedback" element={<DashboardPlaceholder title="Client Feedback" />} />
        
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
