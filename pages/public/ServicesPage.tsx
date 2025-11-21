import React from 'react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

export const ServicesPage: React.FC = () => {
  const services = [
    { title: 'Photography', desc: 'Connect with high-fashion photographers for editorial, runway, and product shoots.' },
    { title: 'Video Production', desc: 'Cinematic video services for fashion shows, brand stories, and social reels.' },
    { title: 'Web Design & E-comm', desc: 'Custom Shopify and headless builds designed specifically for luxury brands.' },
    { title: 'Social Media', desc: 'Full-stack social management from content creation to community engagement.' },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
           <SectionTag>Our Expertise</SectionTag>
           <h1 className="text-5xl font-serif font-bold mb-6">Agency Services</h1>
           <p className="text-gray-500 text-lg">We provide the infrastructure so you can focus on the art.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           {services.map((s, i) => (
             <FadeIn key={i} delay={i * 100}>
               <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group">
                  <h3 className="text-2xl font-serif font-bold mb-4">{s.title}</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">{s.desc}</p>
                  <Button variant="outline" size="sm">View Details</Button>
               </div>
             </FadeIn>
           ))}
        </div>
      </div>
    </div>
  );
};