import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, Globe, Smartphone, ArrowRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

const HubCard = ({ title, desc, icon: Icon, link, image }: { title: string, desc: string, icon: any, link: string, image: string }) => (
  <Link to={link} className="group block h-full">
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
      <div className="absolute top-4 right-4 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
         <ArrowRight size={20} />
      </div>
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2">
         <Icon size={16} className="text-fashion-purple" />
         <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
      </div>
    </div>
    <h3 className="text-3xl font-serif font-bold mb-3 group-hover:text-fashion-purple transition-colors">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </Link>
);

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
           <FadeIn>
             <SectionTag>Our Expertise</SectionTag>
             <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Agency Services</h1>
             <p className="text-xl text-gray-500 leading-relaxed">
                We provide the infrastructure so you can focus on the art. Select a discipline to explore our capabilities.
             </p>
           </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto">
           <FadeIn delay={0}>
             <HubCard 
                title="Photography"
                desc="High-impact visuals for designers, events, and e-commerce. From runway to packshot."
                icon={Camera}
                link="/services/photography"
                image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
             />
           </FadeIn>
           <FadeIn delay={100}>
             <HubCard 
                title="Video Production"
                desc="Cinematic storytelling, fashion films, and reels designed for the digital age."
                icon={Video}
                link="/services/video-production"
                image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800"
             />
           </FadeIn>
           <FadeIn delay={200}>
             <HubCard 
                title="Web Design"
                desc="Luxury e-commerce experiences built on Shopify and headless architectures."
                icon={Globe}
                link="#"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
             />
           </FadeIn>
           <FadeIn delay={300}>
             <HubCard 
                title="Social Media"
                desc="Full-stack management, content creation, and community growth strategies."
                icon={Smartphone}
                link="/social"
                image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800"
             />
           </FadeIn>
        </div>

        <div className="mt-24 bg-gray-50 rounded-3xl p-12 text-center">
           <h2 className="text-3xl font-serif font-bold mb-4">Need a Custom Solution?</h2>
           <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
              Our teams often work across disciplines to deliver integrated campaigns. 
              Tell us about your goals and we'll build a team around you.
           </p>
           <Link to="/dashboard"><Button variant="primary">Book a Consultation</Button></Link>
        </div>
      </div>
    </div>
  );
};