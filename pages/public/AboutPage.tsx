
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Globe, Heart, Zap, ArrowRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => (
  <div className="group">
    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-gray-100">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
        loading="lazy"
      />
    </div>
    <h4 className="font-serif font-bold text-xl mb-1">{name}</h4>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{role}</p>
  </div>
);

const ValueCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
      <Icon size={24} />
    </div>
    <h3 className="font-serif font-bold text-lg mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white pt-20 font-sans text-fashion-black">
      
      {/* 1. Hero Section */}
      <section className="py-20 md:py-32 container mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <SectionTag>Our Story</SectionTag>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Bridging the gap between <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">High Fashion</span> & High Tech.
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            FashionOS was born from a simple frustration: creative talent was spending too much time on logistics, and not enough on art. We built the operating system to change that.
          </p>
        </FadeIn>
      </section>

      {/* 2. Manifesto / Image */}
      <section className="pb-24 container mx-auto px-6 md:px-12">
        <FadeIn delay={200}>
          <div className="relative aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-15220754