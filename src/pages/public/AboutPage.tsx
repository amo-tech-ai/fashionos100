
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
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop" 
              alt="Team Collaboration" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-16">
               <p className="text-white text-2xl md:text-3xl font-serif max-w-2xl">
                 "We believe that technology should be invisible. It should empower creativity, not complicate it."
               </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. Core Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Core Values</h2>
            <p className="text-gray-500">The principles that guide our design and development.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
              <ValueCard 
                icon={Heart}
                title="Creativity First"
                desc="Every feature we build is designed to give time back to the artist. We automate the boring stuff so you can create."
              />
            </FadeIn>
            <FadeIn delay={100}>
              <ValueCard 
                icon={Zap}
                title="Speed & Efficiency"
                desc="Fashion moves fast. Our platform is built for speed, from instant booking to real-time collaboration."
              />
            </FadeIn>
            <FadeIn delay={200}>
              <ValueCard 
                icon={Globe}
                title="Global Connection"
                desc="Talent is everywhere. We connect brands in New York with photographers in Paris and models in Tokyo."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <SectionTag>The Team</SectionTag>
              <h2 className="text-4xl font-serif font-bold">Meet the Founders</h2>
            </div>
            <Button variant="outline" className="hidden md:flex">Join Our Team</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FadeIn delay={0}><TeamMember name="Elena Rossi" role="CEO & Co-Founder" image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" /></FadeIn>
            <FadeIn delay={100}><TeamMember name="David Chen" role="CTO & Co-Founder" image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" /></FadeIn>
            <FadeIn delay={200}><TeamMember name="Sarah Jones" role="Head of Design" image="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" /></FadeIn>
            <FadeIn delay={300}><TeamMember name="Marcus Aluba" role="Head of Partnerships" image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" /></FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Offices / Global Presence */}
      <section className="py-24 bg-black text-white">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">Global Presence.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { city: "London", address: "12 Carnaby St, Soho" },
                 { city: "New York", address: "55 Water St, Dumbo" },
                 { city: "Medellín", address: "Cra 43A, El Poblado" }
               ].map((loc, i) => (
                 <FadeIn key={i} delay={i * 100}>
                    <div className="p-8 border border-white/20 rounded-2xl hover:bg-white/5 transition-colors">
                       <h3 className="text-2xl font-bold mb-2">{loc.city}</h3>
                       <p className="text-gray-400">{loc.address}</p>
                    </div>
                 </FadeIn>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-gray-50 text-center">
         <div className="container mx-auto px-6">
            <FadeIn>
               <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to join the future of fashion?</h2>
               <div className="flex justify-center gap-4">
                  <Link to="/dashboard"><Button variant="primary" size="lg">Get Started</Button></Link>
                  <Link to="/contact"><Button variant="outline" size="lg">Contact Sales</Button></Link>
               </div>
            </FadeIn>
         </div>
      </section>

    </div>
  );
}
