
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { BookingLayout } from './layouts/BookingLayout';

// Components
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';
import { usePageTitle } from './hooks/usePageTitle';
import { PageLoader } from './components/PageLoader';

// Auth
import { RequireAuth } from './components/auth/RequireAuth';
import { LoginPage } from './pages/auth/LoginPage';

// --- Lazy Loaded Pages ---

// Public Pages
const HomePage = lazy(() => import('./pages/public/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/public/ServicesPage').then(m => ({ default: m.ServicesPage })));
const PhotographyPage = lazy(() => import('./pages/public/PhotographyPage').then(m => ({ default: m.PhotographyPage })));
const VideoProductionPage = lazy(() => import('./pages/public/VideoProductionPage').then(m => ({ default: m.VideoProductionPage })));
const WebDesignPage = lazy(() => import('./pages/public/WebDesignPage').then(m => ({ default: m.WebDesignPage })));
const SocialPage = lazy(() => import('./pages/public/SocialPage').then(m => ({ default: m.SocialPage })));
const EcommercePage = lazy(() => import('./pages/public/EcommercePage').then(m => ({ default: m.EcommercePage })));
const AmazonServicesPage = lazy(() => import('./pages/public/AmazonServicesPage').then(m => ({ default: m.AmazonServicesPage })));
const InstagramPage = lazy(() => import('./pages/public/InstagramPage').then(m => ({ default: m.InstagramPage })));

// Main Pages
const AboutPage = lazy(() => import('./pages/public/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/public/ContactPage').then(m => ({ default: m.ContactPage })));
const PricingPage = lazy(() => import('./pages/public/PricingPage').then(m => ({ default: m.PricingPage })));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const SitemapPage = lazy(() => import('./pages/public/SitemapPage').then(m => ({ default: m.SitemapPage })));

// Directory
const DirectoryPage = lazy(() => import('./pages/public/DirectoryPage').then(m => ({ default: m.DirectoryPage })));
const ProfileDetailPage = lazy(() => import('./pages/public/ProfileDetailPage').then(m => ({ default: m.ProfileDetailPage })));
const DesignerProfilePage = lazy(() => import('./pages/public/DesignerProfilePage').then(m => ({ default: m.DesignerProfilePage })));
const EventsPage = lazy(() => import('./pages/public/EventsPage').then(m => ({ default: m.EventsPage })));
const EventDetailPage = lazy(() => import('./pages/public/EventDetailPage').then(m => ({ default: m.EventDetailPage })));

// Booking Wizard
const StepCategory = lazy(() => import('./pages/public/booking/StepCategory').then(m => ({ default: m.StepCategory })));
const StepStyle = lazy(() => import('./pages/public/booking/StepStyle').then(m => ({ default: m.StepStyle })));
const StepSize = lazy(() => import('./pages/public/booking/StepSize').then(m => ({ default: m.StepSize })));
const StepScenes = lazy(() => import('./pages/public/booking/StepScenes').then(m => ({ default: m.StepScenes })));
const StepShotType = lazy(() => import('./pages/public/booking/StepShotType').then(m => ({ default: m.StepShotType })));
const StepSubCategory = lazy(() => import('./pages/public/booking/StepSubCategory').then(m => ({ default: m.StepSubCategory })));
const StepModels = lazy(() => import('./pages/public/booking/StepModels').then(m => ({ default: m.StepModels })));
const StepShotList = lazy(() => import('./pages/public/booking/StepShotList').then(m => ({ default: m.StepShotList })));
const StepReferences = lazy(() => import('./pages/public/booking/StepReferences').then(m => ({ default: m.StepReferences })));
const StepBrief = lazy(() => import('./pages/public/booking/StepBrief').then(m => ({ default: m.StepBrief })));
const StepShotListBuilder = lazy(() => import('./pages/public/booking/StepShotListBuilder').then(m => ({ default: m.StepShotListBuilder })));
const StepRetouching = lazy(() => import('./pages/public/booking/StepRetouching').then(m => ({ default: m.StepRetouching })));
const StepSchedule = lazy(() => import('./pages/public/booking/StepSchedule').then(m => ({ default: m.StepSchedule })));
const StepReview = lazy(() => import('./pages/public/booking/StepReview').then(m => ({ default: m.StepReview })));
const StepCheckout = lazy(() => import('./pages/public/booking/StepCheckout').then(m => ({ default: m.StepCheckout })));
import { BookingProvider } from './context/BookingContext';

// Dashboard
const DashboardOverview = lazy(() => import('./pages/dashboard/DashboardOverview').then(m => ({ default: m.DashboardOverview })));
const DashboardBookings = lazy(() => import('./pages/dashboard/DashboardBookings').then(m => ({ default: m.DashboardBookings })));
const DashboardStudio = lazy(() => import('./pages/dashboard/DashboardStudio').then(m => ({ default: m.DashboardStudio })));
const DashboardCalendar = lazy(() => import('./pages/dashboard/DashboardCalendar').then(m => ({ default: m.DashboardCalendar })));
const DashboardEvents = lazy(() => import('./pages/dashboard/DashboardEvents').then(m => ({ default: m.DashboardEvents })));
const DashboardFinancials = lazy(() => import('./pages/dashboard/DashboardFinancials').then(m => ({ default: m.DashboardFinancials })));
const DashboardGallery = lazy(() => import('./pages/dashboard/DashboardGallery').then(m => ({ default: m.DashboardGallery })));
const DashboardPlaceholder = lazy(() => import('./pages/dashboard/DashboardPlaceholder').then(m => ({ default: m.DashboardPlaceholder })));
const DashboardSponsors = lazy(() => import('./pages/dashboard/DashboardSponsors').then(m => ({ default: m.DashboardSponsors })));
const DashboardLeads = lazy(() => import('./pages/dashboard/DashboardLeads').then(m => ({ default: m.DashboardLeads })));
const DashboardPackages = lazy(() => import('./pages/dashboard/DashboardPackages').then(m => ({ default: m.DashboardPackages })));
const DashboardSettings = lazy(() => import('./pages/dashboard/DashboardSettings').then(m => ({ default: m.DashboardSettings })));
const SponsorDetailPage = lazy(() => import('./pages/dashboard/SponsorDetailPage').then(m => ({ default: m.SponsorDetailPage })));
const SponsorDealWizard = lazy(() => import('./pages/dashboard/SponsorDealWizard').then(m => ({ default: m.SponsorDealWizard })));
const EventOpportunitiesPage = lazy(() => import('./pages/dashboard/EventOpportunitiesPage').then(m => ({ default: m.EventOpportunitiesPage })));
const DashboardContracts = lazy(() => import('./pages/dashboard/OperationsPages').then(m => ({ default: m.DashboardContracts })));
const DashboardActivations = lazy(() => import('./pages/dashboard/OperationsPages').then(m => ({ default: m.DashboardActivations })));
const DashboardMedia = lazy(() => import('./pages/dashboard/OperationsPages').then(m => ({ default: m.DashboardMedia })));
const ActivationDetailPage = lazy(() => import('./pages/dashboard/ActivationDetailPage').then(m => ({ default: m.ActivationDetailPage })));
const DashboardROI = lazy(() => import('./pages/dashboard/AnalyticsPages').then(m => ({ default: m.DashboardROI })));
const SponsorPortal = lazy(() => import('./pages/dashboard/SponsorPortal').then(m => ({ default: m.SponsorPortal })));
const EventWizard = lazy(() => import('./components/events/EventWizard').then(m => ({ default: m.EventWizard })));
const DeliveryPortal = lazy(() => import('./pages/dashboard/DeliveryPortal').then(m => ({ default: m.DeliveryPortal })));
const VisualQAPage = lazy(() => import('./pages/dashboard/VisualQAPage').then(m => ({ default: m.VisualQAPage })));
const BrandProfilePage = lazy(() => import('./pages/dashboard/BrandProfilePage').then(m => ({ default: m.BrandProfilePage })));
const SystemHealth = lazy(() => import('./pages/dashboard/SystemHealth').then(m => ({ default: m.SystemHealth })));
const DashboardInvoices = lazy(() => import('./pages/dashboard/DashboardInvoices').then(m => ({ default: m.DashboardInvoices })));
const DashboardMessages = lazy(() => import('./pages/dashboard/DashboardMessages').then(m => ({ default: m.DashboardMessages })));

const App: React.FC = () => {
  usePageTitle();

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* --- Auth --- */}
          <Route path="/login" element={<LoginPage />} />

          {/* --- Shortcuts / Redirects --- */}
          <Route path="/new" element={<Navigate to="/dashboard/events/new" replace />} />

          {/* --- Booking Wizard (Wrapped in Provider & ErrorBoundary) --- */}
          <Route path="/start-project" element={
            <BookingProvider>
              <BookingLayout />
            </BookingProvider>
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
            <Route path="/sitemap" element={<SitemapPage />} />
            
            {/* Directory & Profiles */}
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/directory/:id" element={<ProfileDetailPage />} />
            <Route path="/designers/:id" element={<DesignerProfilePage />} />
            
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            
            {/* Placeholders/Redirects */}
            <Route path="/portfolio" element={<DirectoryPage />} />
            <Route path="/social" element={<Navigate to="/services/social" replace />} />
            <Route path="/shop" element={<Navigate to="/services/ecommerce" />} />

            {/* 404 for Public */}
            <Route path="*" element={<NotFoundPage />} />
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
            <Route path="studio" element={<DashboardStudio />} /> 
            <Route path="delivery" element={<DeliveryPortal />} /> 
            <Route path="qa" element={<VisualQAPage />} /> 
            <Route path="calendar" element={<DashboardCalendar />} />
            <Route path="system" element={<SystemHealth />} />
            
            {/* Brand Profile */}
            <Route path="brand-profile" element={<BrandProfilePage />} />
            <Route path="brand/:id" element={<BrandProfilePage />} />

            {/* Events Module */}
            <Route path="events" element={<DashboardEvents />} />
            <Route path="events/new" element={<EventWizard />} />
            
            {/* Finance & Assets */}
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
            <Route path="invoices" element={<DashboardInvoices />} />
            <Route path="messages" element={<DashboardMessages />} />
            <Route path="feedback" element={<DashboardPlaceholder title="Client Feedback" />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
