
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
import { WebDesignPage } from './pages/public/WebDesignPage';
import { DirectoryPage } from './pages/public/DirectoryPage';
import { ProfileDetailPage } from './pages/public/ProfileDetailPage';
import { DesignerProfilePage } from './pages/public/DesignerProfilePage';
import { EventsPage } from './pages/public/EventsPage';
import { SocialPage } from './pages/public/SocialPage';
import { EcommercePage } from './pages/public/EcommercePage';
import { StartProjectPage } from './pages/public/StartProjectPage';
import { ContactPage } from './pages/public/ContactPage';
import { AboutPage } from './pages/public/AboutPage';
import { PricingPage } from './pages/public/PricingPage';

// Dashboard Pages
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { DashboardBookings } from './pages/dashboard/DashboardBookings';
import { DashboardCalendar } from './pages/dashboard/DashboardCalendar';
import { DashboardEvents } from './pages/dashboard/DashboardEvents';
import { DashboardFinancials } from './pages/dashboard/DashboardFinancials';
import { DashboardGallery } from './pages/dashboard/DashboardGallery';
import { DashboardPlaceholder } from './pages/dashboard/DashboardPlaceholder';
import { DashboardSponsors } from './pages/dashboard/DashboardSponsors';

// New Dashboard Pages
import { DashboardLeads, DashboardPackages } from './pages/dashboard/SponsorshipPages';
import { SponsorDetailPage } from './pages/dashboard/SponsorDetailPage';
import { SponsorDealWizard } from './pages/dashboard/SponsorDealWizard';
import { EventOpportunitiesPage } from './pages/dashboard/EventOpportunitiesPage';
import { DashboardContracts, DashboardActivations, DashboardMedia } from './pages/dashboard/OperationsPages';
import { ActivationDetailPage } from './pages/dashboard/ActivationDetailPage';
import { DashboardROI } from './pages/dashboard/AnalyticsPages';
import { SponsorPortal } from './pages/dashboard/SponsorPortal';

// Components
import { EventWizard } from './components/events/EventWizard';

const App: React.FC = () => {
  return (
    <Routes>
      {/* --- Public Zone --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/photography" element={<PhotographyPage />} />
        <Route path="/services/video-production" element={<VideoProductionPage />} />
        <Route path="/services/web-design" element={<WebDesignPage />} />
        <Route path="/services/social" element={<SocialPage />} />
        <Route path="/services/ecommerce" element={<EcommercePage />} />
        
        {/* Booking Wizard */}
        <Route path="/start-project" element={<StartProjectPage />} />
        
        {/* Main Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        
        {/* Directory & Profiles */}
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/directory/:id" element={<ProfileDetailPage />} />
        <Route path="/designers/:id" element={<DesignerProfilePage />} />
        
        <Route path="/events" element={<EventsPage />} />
        
        {/* Placeholders/Redirects */}
        <Route path="/portfolio" element={<DirectoryPage />} />
        
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
        
        {/* Events Module */}
        <Route path="events" element={<DashboardEvents />} />
        <Route path="events/new" element={<EventWizard />} />
        
        <Route path="financials" element={<DashboardFinancials />} />
        <Route path="gallery" element={<DashboardGallery />} />
        
        {/* Sponsorship & Sales */}
        <Route path="leads" element={<DashboardLeads />} />
        <Route path="sponsors" element={<DashboardSponsors />} />
        <Route path="sponsors/new-deal" element={<SponsorDealWizard />} />
        <Route path="sponsors/:id" element={<SponsorDetailPage />} />
        <Route path="packages" element={<DashboardPackages />} />
        <Route path="opportunities" element={<EventOpportunitiesPage />} />
        
        {/* Operations */}
        <Route path="contracts" element={<DashboardContracts />} />
        <Route path="activations" element={<DashboardActivations />} />
        <Route path="activations/:id" element={<ActivationDetailPage />} />
        <Route path="media" element={<DashboardMedia />} />
        
        {/* Analytics */}
        <Route path="roi" element={<DashboardROI />} />
        <Route path="portal" element={<SponsorPortal />} />
        
        {/* Misc */}
        <Route path="invoices" element={<DashboardPlaceholder title="Invoices & Billing" />} />
        <Route path="messages" element={<DashboardPlaceholder title="Messages & Inbox" />} />
        <Route path="feedback" element={<DashboardPlaceholder title="Client Feedback" />} />
        <Route path="settings" element={<DashboardPlaceholder title="Settings" />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
