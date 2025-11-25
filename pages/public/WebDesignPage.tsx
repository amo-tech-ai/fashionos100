
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Monitor, Smartphone, Layers, ShoppingCart, Code, 
  Cpu, Zap, Globe, ArrowRight, CheckCircle2, LayoutTemplate
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

// --- Sub-Components ---

const TechCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-black transition-colors duration-300 group h-full">
    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const PortfolioItem = ({ image, title, category }: { image: string, title: string, category: string }) => (
  <div className="group cursor-pointer">
    <div className="relative overflow-hidden rounded-2xl aspect-[16/10] mb-4 border border-gray-100 shadow-sm">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <Button variant="white" size="sm" className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          View Case Study
        </Button>
      </div>
    </div>
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{category}</p>
  </div>
);

const PricingTier = ({ title, price, features, recommended = false }: { title: string, price: string, features: string[], recommended?: boolean }) => (
  <div className={`p-8 rounded-3xl border flex flex-col h-full ${recommended ? 'bg-fashion-black text-white border-fashion-black shadow-2xl relative md:-translate-y-4' : 'bg-white border-gray-100'}`}>
    {recommended && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-fashion-purple text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
        Most Popular
      </div>
    )}
    <div className="mb-8">
      <h3 className={`font-serif font-bold text-2xl mb-2 ${recommended ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-3xl font-bold ${recommended ? 'text-fashion-purple' : 'text-gray-900'}`}>{price}</p>
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${recommended ? 'text-fashion-purple' : 'text-green-500'}`} />
          <span className={recommended ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
        </li>
      ))}
    </ul>
    <Link to="/start-project" className="w-full">
      <Button fullWidth variant={recommended ? 'accent' : 'outline'} className={recommended ? '' : 'hover:bg-gray-50'}>
        Start Project
      </Button>
    </Link>
  </div>
);

// --- Main Page ---

export const WebDesignPage: React.FC = () => {
  return (
    <div className="bg-white pt-20 overflow-x-hidden font-sans">
      
      {/* 1. HERO */}
      <section className="relative py-24 md:py-32 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                <Code size={12} /> Digital Atelier
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-fashion-black">
                Digital Flagships <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Built to Sell.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                We build immersive, high-performance e-commerce experiences. From custom Shopify themes to headless architectures, we ensure your digital presence is as premium as your product.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/start-project"><Button variant="primary" size="lg">Start Your Build</Button></Link>
                <Button variant="outline" size="lg">View Portfolio</Button>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 relative">
            <FadeIn direction="left" delay={200}>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-square">
                 <img 
                   src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                   alt="Web Design Mockup" 
                   className="absolute inset-0 w-full h-full object-cover opacity-90"
                   loading="lazy"
                 />
                 {/* Mockup UI Elements */}
                 <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-6 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                       <div className="h-2 w-24 bg-gray-200 rounded"></div>
                       <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white"><ArrowRight size={14} /></div>
                    </div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                 </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl -z-10" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITIES */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionTag>Capabilities</SectionTag>
            <h2 className="text-4xl font-serif font-bold mb-4">Full-Stack Digital Fashion.</h2>
            <p className="text-gray-500">We blend aesthetic precision with technical engineering.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={0}>
              <TechCard 
                icon={ShoppingCart} 
                title="Shopify Plus" 
                desc="Custom theme development and app integration for high-volume fashion merchants." 
              />
            </FadeIn>
            <FadeIn delay={100}>
              <TechCard 
                icon={Cpu} 
                title="Headless Commerce" 
                desc="Next.js and Sanity.io architectures for brands demanding instant page loads and total creative freedom." 
              />
            </FadeIn>
            <FadeIn delay={200}>
              <TechCard 
                icon={Layers} 
                title="UX/UI Design" 
                desc="User-centric interfaces designed to minimize friction and maximize conversion rates." 
              />
            </FadeIn>
            <FadeIn delay={300}>
              <TechCard 
                icon={Globe} 
                title="Internationalization" 
                desc="Multi-currency, multi-language setups to take your fashion label global." 
              />
            </FadeIn>
            <FadeIn delay={400}>
              <TechCard 
                icon={Zap} 
                title="Performance Tuning" 
                desc="Code optimization to ensure you pass Core Web Vitals with flying colors." 
              />
            </FadeIn>
            <FadeIn delay={500}>
              <TechCard 
                icon={Smartphone} 
                title="Mobile First" 
                desc="Responsive designs that look and feel like native apps on mobile devices." 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. PORTFOLIO */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-2">Selected Work</h2>
              <p className="text-gray-500">Recent digital flagships launched by our team.</p>
            </div>
            <Button variant="outline">View Full Portfolio</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FadeIn delay={0}>
              <PortfolioItem 
                image="https://images.unsplash.com/photo-1481487484168-9b930d55208d?q=80&w=800&auto=format&fit=crop" 
                title="Atelier Noir" 
                category="Shopify Plus • Custom Theme" 
              />
            </FadeIn>
            <FadeIn delay={100}>
              <PortfolioItem 
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" 
                title="Lumina Jewelry" 
                category="Headless • Next.js" 
              />
            </FadeIn>
            <FadeIn delay={200}>
              <PortfolioItem 
                image="https://images.unsplash.com/photo-1522542552923-22d784275702?q=80&w=800&auto=format&fit=crop" 
                title="Vogue Editorial Archive" 
                category="Portfolio • WebGL" 
              />
            </FadeIn>
            <FadeIn delay={300}>
              <PortfolioItem 
                image="https://images.unsplash.com/photo-1555421689-492a6c3be37b?q=80&w=800&auto=format&fit=crop" 
                title="Canvas Streetwear" 
                category="Drop Site • Stripe Integration" 
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="py-24 bg-fashion-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:w-3/4">
              <SectionTag color="text-blue-400">Methodology</SectionTag>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Design meets Data.</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We don't just make things look pretty. We build systems. Our development process is rooted in component-driven architecture and data-backed UX decisions.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-blue-500 font-bold text-xl">01</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Discovery & Strategy</h4>
                    <p className="text-gray-500 text-sm">Tech stack selection, sitemap planning, and UX wireframing.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-purple-500 font-bold text-xl">02</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">High-Fidelity Design</h4>
                    <p className="text-gray-500 text-sm">Visual design in Figma, focusing on brand identity and interactions.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-500 font-bold text-xl">03</span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Development & QA</h4>
                    <p className="text-gray-500 text-sm">Clean code, pixel-perfect implementation, and rigorous testing.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                     <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 h-40 animate-pulse"></div>
                     <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 h-56"></div>
                  </div>
                  <div className="space-y-4">
                     <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 h-56"></div>
                     <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 h-40 animate-pulse"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Build Packages</h2>
            <p className="text-gray-500">Transparent pricing for standard builds. Custom quotes available for complex needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            <FadeIn delay={0}>
              <PricingTier 
                title="Landing Page"
                price="$3,000"
                features={[
                  "Single scrollable page",
                  "Conversion focused layout",
                  "Email capture integration",
                  "Basic SEO setup",
                  "2 weeks turnaround"
                ]}
              />
            </FadeIn>
            <FadeIn delay={100}>
              <PricingTier 
                title="Brand Site"
                price="$8,500"
                recommended
                features={[
                  "Up to 10 custom pages",
                  "CMS Integration (Sanity/Contentful)",
                  "Blog / Lookbook functionality",
                  "Advanced animations",
                  "Google Analytics setup",
                  "4-6 weeks turnaround"
                ]}
              />
            </FadeIn>
            <FadeIn delay={200}>
              <PricingTier 
                title="E-Commerce"
                price="$15,000+"
                features={[
                  "Shopify or Headless build",
                  "Product filtering & search",
                  "Cart & Checkout customization",
                  "Payment gateway setup",
                  "Inventory migration",
                  "8+ weeks turnaround"
                ]}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. TECH STACK BANNER */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6 text-center">
           <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">Powering Your Digital Growth With</p>
           <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-gray-400 font-bold text-xl">
              <span>Shopify Plus</span>
              <span>React</span>
              <span>Next.js</span>
              <span>Stripe</span>
              <span>Sanity.io</span>
              <span>Vercel</span>
           </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-24 container mx-auto px-6 text-center">
         <FadeIn>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8">Ready to Upgrade Your <br/> Online Presence?</h2>
            <div className="flex justify-center gap-4">
               <Link to="/start-project"><Button variant="primary" size="lg">Start Your Project</Button></Link>
               <Link to="/contact"><Button variant="outline" size="lg">Book a Consultation</Button></Link>
            </div>
         </FadeIn>
      </section>

    </div>
  );
};