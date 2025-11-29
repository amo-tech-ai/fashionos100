import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

const SitemapSection = ({ title, links }: { title: string, links: { label: string, href: string }[] }) => (
  <div className="mb-12">
    <h3 className="text-xl font-serif font-bold mb-6 border-b border-gray-200 pb-2">{title}</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link, i) => (
        <li key={i}>
          <Link 
            to={link.href} 
            className="text-gray-600 hover:text-fashion-purple transition-colors text-sm flex items-center gap-2 group"
          >
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-fashion-purple transition-colors" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const SitemapPage: React.FC = () => {
  return (
    <div className="bg-white pt-20 min-h-screen">
      <section className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <FadeIn>
          <SectionTag>Navigation</SectionTag>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-12">Sitemap</h1>

          <div className="max-w-4xl">
            <SitemapSection 
              title="Main Pages"
              links={[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Pricing", href: "/pricing" },
                { label: "Contact", href: "/contact" },
                { label: "Login", href: "/login" },
              ]}
            />

            <SitemapSection 
              title="Services"
              links={[
                { label: "All Services", href: "/services" },
                { label: "Photography", href: "/services/photography" },
                { label: "Video Production", href: "/services/video-production" },
                { label: "Web Design", href: "/services/web-design" },
                { label: "Ecommerce", href: "/services/ecommerce" },
                { label: "Amazon Services", href: "/services/amazon" },
                { label: "Social Media", href: "/services/social" },
                { label: "Instagram Marketing", href: "/services/instagram" },
              ]}
            />

            <SitemapSection 
              title="Platform"
              links={[
                { label: "Talent Directory", href: "/directory" },
                { label: "Events Calendar", href: "/events" },
                { label: "Marketplace", href: "/shop" },
                { label: "Start a Project", href: "/start-project" },
              ]}
            />

            <SitemapSection 
              title="Dashboard (Requires Login)"
              links={[
                { label: "Overview", href: "/dashboard" },
                { label: "Bookings", href: "/dashboard/bookings" },
                { label: "Studio Command", href: "/dashboard/studio" },
                { label: "Events Manager", href: "/dashboard/events" },
                { label: "Financials", href: "/dashboard/financials" },
              ]}
            />
          </div>
        </FadeIn>
      </section>
    </div>
  );
};