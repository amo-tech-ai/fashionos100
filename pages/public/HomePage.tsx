import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

const FeatureSection: React.FC<{
  title: string;
  description: string;
  image: string;
  align?: 'left' | 'right';
}> = ({ title, description, image, align = 'left' }) => (
  <section className="py-12 md:py-24">
    <div className="container mx-auto px-6 md:px-12">
      <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className="w-full md:w-1/2">
          <FadeIn direction={align === 'left' ? 'right' : 'left'}>
            <div className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden bg-gray-100 group shadow-lg">
              <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
          </FadeIn>
        </div>
        <div className="w-full md:w-1/2">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6">{title}</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">{description}</p>
            <Button variant="primary">Learn More</Button>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

export const HomePage: React.FC = () => (
  <div className="pt-20">
    <section className="container mx-auto px-6 py-20 md:py-32 text-center">
      <FadeIn>
        <SectionTag>The Operating System for Fashion</SectionTag>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 tracking-tight text-gray-900">Elevate Your <br /> Creative Business.</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">Manage events, bookings, finances, and social media in one unified platform designed for the fashion industry.</p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard"><Button variant="primary" size="lg">Get Started</Button></Link>
          <Button variant="outline" size="lg">View Demo</Button>
        </div>
      </FadeIn>
    </section>
    <FeatureSection 
      title="Unified Dashboard" 
      description="Track your entire fashion business at a glance. From ticket sales to model bookings, everything is one click away."
      image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
      align="left"
    />
    <FeatureSection 
      title="Global Directory" 
      description="Connect with top tier photographers, models, stylists and venues. Our AI-powered search helps you find the perfect match."
      image="https://images.unsplash.com/photo-1537832816519-689ad163238b?auto=format&fit=crop&q=80&w=1000"
      align="right"
    />
  </div>
);