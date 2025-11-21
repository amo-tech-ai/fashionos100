import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Globe, Camera, Video, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

// --- Components ---

const ServiceSection: React.FC<{
  title: string;
  subcopy: string;
  ctaText?: string;
  link: string;
  image: string;
  align: 'left' | 'right';
  theme?: 'light' | 'dark';
}> = ({ title, subcopy, ctaText = "Learn More", link, image, align, theme = 'light' }) => (
  <section className={`py-12 md:py-24 ${theme === 'dark' ? 'bg-fashion-black text-white' : 'bg-white text-fashion-black'}`}>
    <div className="container mx-auto px-6 md:px-12">
      <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Image Side */}
        <div className="w-full lg:w-1/2">
          <FadeIn direction={align === 'left' ? 'right' : 'left'}>
            <div className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl group">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          </FadeIn>
        </div>

        {/* Text Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-[1.1] tracking-tight">
              {title}
            </h2>
            <p className={`text-lg md:text-xl mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {subcopy}
            </p>
            <Link to={link}>
              <Button variant={theme === 'dark' ? 'white' : 'primary'} size="lg" className="px-8">
                {ctaText}
              </Button>
            </Link>
          </FadeIn>
        </div>

      </div>
    </div>
  </section>
);

const CaseStudyCard: React.FC<{
  client: string;
  stat: string;
  desc: string;
  image: string;
}> = ({ client, stat, desc, image }) => (
  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
        <img src={image} alt={client} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-serif font-bold text-lg">{client}</h4>
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Fashion Brand</span>
      </div>
    </div>
    <div className="mb-4 flex-grow">
      <h3 className="text-3xl md:text-4xl font-bold text-fashion-purple mb-2">{stat}</h3>
      <p className="text-gray-500 font-medium">{desc}</p>
    </div>
    <div className="pt-6 border-t border-gray-50 flex items-center text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
      View Case Study <ArrowRight size={12} className="ml-2" />
    </div>
  </div>
);

// --- Main Page ---

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20 bg-white overflow-x-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-32 container mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-fashion-black tracking-tight leading-[0.9]">
            Create. Connect. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Convert.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            FashionOS combines world-class creativity with automation. From cinematic runway videos to web design and digital marketing — we help fashion brands tell stories that sell.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard"><Button variant="primary" size="lg" className="px-12">Start Your Project</Button></Link>
            <Link to="/directory"><Button variant="outline" size="lg" className="px-12">View Portfolio</Button></Link>
          </div>
        </FadeIn>
      </section>

      {/* 2. SERVICE HIGHLIGHTS: VIDEO */}
      <ServiceSection 
        align="right"
        title="Tell Stories That Move."
        subcopy="From cinematic runway videos to branded campaigns, our video team brings your collections to life. We produce high-quality, story-driven videos optimized for web, ads, and social media."
        link="/services/video-production"
        image="https://images.unsplash.com/photo-1532716377393-51aa28ee92b5?q=80&w=1200&auto=format&fit=crop"
        ctaText="Learn More"
      />

      {/* 3. SERVICE HIGHLIGHTS: PHOTOGRAPHY */}
      <ServiceSection 
        align="left"
        title="Capture Your Brand at Its Best."
        subcopy="Whether it's an editorial photoshoot, product photography, or behind-the-scenes coverage — FashionOS photographers deliver the quality and consistency that your brand deserves."
        link="/services/photography"
        image="https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1200&auto=format&fit=crop"
        ctaText="Learn More"
        theme="light" 
      />

      {/* 4. SERVICE HIGHLIGHTS: WEB DESIGN */}
      <ServiceSection 
        align="right"
        theme="dark"
        title="Build Beautiful, High-Converting Websites."
        subcopy="We design and develop responsive websites that blend fashion, storytelling, and performance. From landing pages to full eCommerce experiences, every site is built for conversion and elegance."
        link="/services/web-design"
        image="https://images.unsplash.com/photo-1601506521937-244b01c92805?q=80&w=1200"
        ctaText="Learn More"
      />

      {/* 5. SERVICE HIGHLIGHTS: ECOMMERCE */}
      <ServiceSection 
        align="left"
        title="Turn Your Style Into Sales."
        subcopy="Connect your store to Shopify, Amazon, Mercado Libre, and more — all in one platform. FashionOS automates listings, pricing, and product descriptions so you can focus on creating."
        link="/services/ecommerce"
        image="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200"
        ctaText="Learn More"
      />

      {/* 6. SERVICE HIGHLIGHTS: SOCIAL */}
      <ServiceSection 
        align="right"
        title="Your Story. Everywhere."
        subcopy="We manage your content, campaigns, and collaborations. FashionOS helps you reach audiences on Instagram, TikTok, YouTube, and Facebook — with data-driven creativity."
        link="/services/social"
        image="https://images.unsplash.com/photo-1542038784424-48dd95131591?q=80&w=1200"
        ctaText="Learn More"
      />

      {/* 7. SERVICE HIGHLIGHTS: CRM/BRANDING */}
      <ServiceSection 
        align="left"
        title="Personalize Every Connection."
        subcopy="Send automated updates, event invites, and product launches through WhatsApp — the most personal marketing channel. Connect with customers in real-time using AI-powered messaging flows."
        link="/services/ecommerce" 
        image="https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=1200"
        ctaText="Learn More"
      />

      {/* 8. RESULTS / CASE STUDIES */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Results You Can See.</h2>
            <p className="text-gray-500 text-lg">
              Our creative and digital strategies have delivered measurable success for brands worldwide. FashionOS helps fashion companies grow visibility, engagement, and sales — all with AI precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
              <CaseStudyCard 
                client="Maison Lina"
                image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
                stat="+312% engagement in 30 days"
                desc="SOCIAL + VIDEO"
              />
            </FadeIn>
            <FadeIn delay={100}>
              <CaseStudyCard 
                client="Zane Studio"
                image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200"
                stat="2.5x conversion rate after redesign"
                desc="WEB + ECOMMERCE"
              />
            </FadeIn>
            <FadeIn delay={200}>
              <CaseStudyCard 
                client="Atelier 43"
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                stat="+65% ROI on influencer campaign"
                desc="PHOTOGRAPHY + ADS"
              />
            </FadeIn>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">View All Case Studies</Button>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-24 bg-fashion-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Loved by Designers, Trusted by Brands.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <FadeIn delay={0}>
              <div className="space-y-6">
                <div className="text-fashion-purple text-4xl font-serif">"</div>
                <p className="text-xl md:text-2xl leading-relaxed font-light">
                  FashionOS helped us launch our new collection with stunning visuals and seamless online sales.
                </p>
                <div>
                  <p className="font-bold text-lg">Mila Ortiz</p>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">Designer</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="space-y-6">
                <div className="text-fashion-purple text-4xl font-serif">"</div>
                <p className="text-xl md:text-2xl leading-relaxed font-light">
                  The AI tools saved us hours every week. Our marketing feels effortless now.
                </p>
                <div>
                  <p className="font-bold text-lg">Lucia Campos</p>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">Brand Manager</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-fashion-black">
              Let’s Create Something <br/> Beautiful.
            </h2>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed">
              Whether you're launching your first fashion line or scaling an international brand — FashionOS has the tools, team, and AI automation to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard"><Button variant="primary" size="lg" className="px-12">Book a Call</Button></Link>
              <Link to="/services"><Button variant="outline" size="lg" className="px-12">Explore Services</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
};