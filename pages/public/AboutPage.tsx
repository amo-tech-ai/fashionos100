
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
              alt="FashionOS Team" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-500">The principles that guide every feature we build and every shoot we produce.</p>
            </div>
            <Link to="/services"><Button variant="outline">Explore Services</Button></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
              <ValueCard 
                icon={Zap} 
                title="Efficiency First" 
                desc="We believe creativity thrives when chaos is tamed. Our tools are designed to eliminate friction from the production process." 
              />
            </FadeIn>
            <FadeIn delay={100}>
              <ValueCard 
                icon={Award} 
                title="Uncompromising Quality" 
                desc="Whether it's a line of code or a hemline, details matter. We maintain the highest standards in both our software and our studio output." 
              />
            </FadeIn>
            <FadeIn delay={200}>
              <ValueCard 
                icon={Globe} 
                title="Global Connection" 
                desc="Fashion is a global language. We connect talent from Medellín to Milan, creating a borderless creative economy." 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Team */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <SectionTag>The Team</SectionTag>
            <h2 className="text-4xl font-serif font-bold">Meet the Makers</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay={0}>
              <TeamMember 
                name="Orlando L." 
                role="Founder & CEO" 
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" 
              />
            </FadeIn>
            <FadeIn delay={100}>
              <TeamMember 
                name="Elena R." 
                role="Head of Creative" 
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" 
              />
            </FadeIn>
            <FadeIn delay={200}>
              <TeamMember 
                name="Marcus C." 
                role="Lead Engineer" 
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" 
              />
            </FadeIn>
            <FadeIn delay={300}>
              <TeamMember 
                name="Sarah J." 
                role="Operations Director" 
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop" 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Stats */}
      <section className="py-20 bg-fashion-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-purple-400 mb-2">3+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Years Active</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-purple-400 mb-2">450+</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Shoots Produced</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-purple-400 mb-2">12k</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Assets Delivered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-bold text-purple-400 mb-2">3</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Global HQs</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-5xl font-serif font-bold mb-8">Join the movement.</h2>
            <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
              Whether you're a brand looking to scale or a creative looking for work, there's a place for you in FashionOS.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/start-project"><Button variant="primary" size="lg">Start a Project</Button></Link>
              <Link to="/contact"><Button variant="outline" size="lg">Contact Us</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};
