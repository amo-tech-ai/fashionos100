
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts - Using explicit relative paths to avoid alias resolution issues in some environments
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { BookingLayout } from './layouts/BookingLayout';

// Components
import { ErrorBoundary } from './components/ErrorBoundary';

// Auth
import { RequireAuth } from './components/auth/RequireAuth';
import { LoginPage } from './pages/auth/LoginPage';

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
import { ContactPage } from './pages/public/ContactPage';
import { AboutPage } from './pages/public/AboutPage';
import { PricingPage } from './pages/public/PricingPage';
import { AmazonServicesPage } from './pages/public/AmazonServicesPage';
import { InstagramPage } from './pages/public/InstagramPage';

// Booking Wizard Pages
import { StepCategory } from './pages/public/booking/StepCategory';
import { StepStyle } from './pages/public/booking/StepStyle';
import { StepSize } from './pages/public/booking/StepSize';
import { StepScenes } from './pages/public/booking/StepScenes';
import { StepShotType } from './pages/public/booking/StepShotType';
import { StepSubCategory } from './pages/public/booking/StepSubCategory';
import { StepModels } from './pages/public/booking/StepModels';
import { StepShotList } from './pages/public/booking/StepShotList';
import { StepReferences } from './pages/public/booking/StepReferences';
import { StepBrief } from './pages/public/booking/StepBrief';
import { StepShotListBuilder } from './pages/public/booking/StepShotListBuilder';
import { StepRetouching } from './pages/public/booking/StepRetouching';
import { StepSchedule } from './pages/public/booking/StepSchedule'; 
import { StepReview } from './pages/public/booking/StepReview';
import { StepCheckout } from './pages/public/booking/StepCheckout';
import { BookingProvider } from './context/BookingContext';

// Dashboard Pages
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { DashboardBookings } from './pages/dashboard/DashboardBookings';
import { DashboardStudio } from './pages/dashboard/DashboardStudio';
import { DashboardCalendar } from './pages/dashboard/DashboardCalendar';
import { DashboardEvents } from './pages/dashboard/DashboardEvents';
import { DashboardFinancials } from './pages/dashboard/DashboardFinancials';
import { DashboardGallery } from './pages/dashboard/DashboardGallery';
import { DashboardPlaceholder } from './pages/dashboard/DashboardPlaceholder';
import { DashboardSponsors } from './pages/dashboard/DashboardSponsors';
import { DashboardLeads } from './pages/dashboard/DashboardLeads';
import { DashboardPackages } from './pages/dashboard/DashboardPackages';
import { DashboardSettings } from './pages/dashboard/DashboardSettings';
import { SponsorDetailPage } from './pages/dashboard/SponsorDetailPage';
import { SponsorDealWizard } from './pages/dashboard/SponsorDealWizard';
import { EventOpportunitiesPage } from './pages/dashboard/EventOpportunitiesPage';
import { DashboardContracts, DashboardActivations, DashboardMedia } from './pages/dashboard/OperationsPages';
import { ActivationDetailPage } from './pages/dashboard/ActivationDetailPage';
import { DashboardROI } from './pages/dashboard/AnalyticsPages';
import { SponsorPortal } from './pages/dashboard/SponsorPortal';
import { EventWizard } from './components/events/EventWizard';
import { DeliveryPortal } from './pages/dashboard/DeliveryPortal';
import { VisualQAPage } from './pages/dashboard/VisualQAPage';
import { VenueDirectory } from './pages/dashboard/VenueDirectory';
import { TalentNetwork } from './pages/dashboard/TalentNetwork';

// Event Context Pages
import { EventCommandCenter } from './pages/dashboard/events/EventCommandCenter';
import { EventVenue } from './pages/dashboard/events/EventVenue';
import { EventCasting } from './pages/dashboard/events/EventCasting';
import { EventTimeline } from './pages/dashboard/events/EventTimeline';
import { EventRunOfShow } from './pages/dashboard/events/EventRunOfShow';
import { EventGuests } from './pages/dashboard/events/EventGuests';
import { EventTickets } from './pages/dashboard/events/EventTickets';

const App: React.FC = () => {
  return (
    <Routes>
      {/* --- Auth --- */}
      <Route path="/login" element={<LoginPage />} />

      {/* --- Shortcuts / Redirects --- */}
      <Route path="/new" element={<Navigate to="/dashboard/events/new" replace />} />

      {/* --- Booking Wizard (Wrapped in Provider & ErrorBoundary) --- */}
      <Route path="/start-project" element={
        <ErrorBoundary>
          <BookingProvider>
            <BookingLayout />
          </BookingProvider>
        </ErrorBoundary>
      }>
        <Route index element={<Navigate to="category" replace />} />
        <Route path="category" element={<StepCategory />} />
        <Route path="style" element={<StepStyle />} />
        <Route path="size" element={<StepSize />} />
        <Route path="scenes" element={<StepScenes />} />
        <Route path="shot-type" element={<StepShotType />} />
        <Route path="sub-category" element={<StepSubCategory />} />
        <Route path="models" element={<StepModels />} />
        <Route path="shot-list" element={<StepShotList />} />
        <Route path="references" element={<StepReferences />} />
        <Route path="brief" element={<StepBrief />} />
        <Route path="shot-builder" element={<StepShotListBuilder />} />
        <Route path="retouching" element={<StepRetouching />} />
        <Route path="schedule" element={<StepSchedule />} /> 
        <Route path="review" element={<StepReview />} />
        <Route path="checkout" element={<StepCheckout />} />
      </Route>

      {/* --- Public Zone --- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/photography" element={<PhotographyPage />} />
        <Route path="/services/video-production" element={<VideoProductionPage />} />
        <Route path="/services/web-design" element={<WebDesignPage />} />
        <Route path="/services/social" element={<SocialPage />} />
        <Route path="/services/ecommerce" element={<EcommercePage />} />
        <Route path="/services/amazon" element={<AmazonServicesPage />} />
        <Route path="/services/instagram" element={<InstagramPage />} />
        
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
          <ErrorBoundary>
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          </ErrorBoundary>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="bookings" element={<DashboardBookings />} />
        <Route path="studio" element={<DashboardStudio />} /> 
        <Route path="delivery" element={<DeliveryPortal />} /> 
        <Route path="qa" element={<VisualQAPage />} /> 
        <Route path="calendar" element={<DashboardCalendar />} />
        
        {/* Global Logistics Directories */}
        <Route path="venues" element={<VenueDirectory />} />
        <Route path="talent" element={<TalentNetwork />} />

        {/* Events Module - Global */}
        <Route path="events" element={<DashboardEvents />} />
        <Route path="events/new" element={<EventWizard />} />
        
        {/* Events Module - Event Context */}
        {/* These map to /dashboard/events/:id/... */}
        <Route path="events/:id" element={<EventCommandCenter />} />
        <Route path="events/:id/timeline" element={<EventTimeline />} />
        <Route path="events/:id/schedule" element={<EventRunOfShow />} />
        <Route path="events/:id/venue" element={<EventVenue />} />
        <Route path="events/:id/guests" element={<EventGuests />} />
        <Route path="events/:id/tickets" element={<EventTickets />} />
        <Route path="events/:id/models" element={<EventCasting />} />
        <Route path="events/:id/designers" element={<DashboardPlaceholder title="Designers" />} />
        <Route path="events/:id/sponsors" element={<DashboardSponsors />} /> {/* Reusing for now, will scope later */}
        <Route path="events/:id/activations" element={<DashboardActivations />} />
        <Route path="events/:id/deliverables" element={<DashboardPlaceholder title="Deliverables Tracker" />} />
        
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
        
        {/* Settings */}
        <Route path="settings" element={<DashboardSettings />} />

        {/* Misc */}
        <Route path="invoices" element={<DashboardPlaceholder title="Invoices & Billing" />} />
        <Route path="messages" element={<DashboardPlaceholder title="Messages & Inbox" />} />
        <Route path="feedback" element={<DashboardPlaceholder title="Client Feedback" />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
