
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, CheckCircle2, ArrowRight, Play, Zap, Heart, 
  Camera, Video, Star, TrendingUp, Sparkles, Layers, Image as ImageIcon,
  Package, MousePointerClick
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';

// --- Components ---

const BenefitCard = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
    <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-pink-600">
      <Icon size={28} />
    </div>
    <h3 className="font-serif font-bold text-xl mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
  </div>
);

const PackCard = ({ 
  title, 
  price, 
  type, 
  features, 
  image,
  popular = false
}: { 
  title: string; 
  price: string; 
  type: 'Photo' | 'Video'; 
  features: string[]; 
  image: string;
  popular?: boolean;
}) => (
  <div className={`group relative bg-white rounded-[2.5rem] border overflow-hidden transition-all duration-500 h-full flex flex-col ${popular ? 'border-pink-200 shadow-2xl ring-4 ring-pink-50' : 'border-gray-100 hover:shadow-2xl hover:border-gray-200'}`}>
    {popular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg z-20">
        Most Popular
      </div>
    )}
    
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 text-gray-900">
        {type === 'Photo' ? <Camera size={12} /> : <Video size={12} />}
        {type}
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-grow relative">
      <div className="mb-6">
        <h3 className="font-serif font-bold text-2xl mb-2 group-hover:text-pink-600 transition-colors">{title}</h3>
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-bold text-gray-900">{price}</p>
          <span className="text-sm text-gray-400 font-medium">/ pack</span>
        </div>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feat, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${popular ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'}`}>
              <CheckCircle2 size={12} strokeWidth={3} />
            </div>
            {feat}
          </li>
        ))}
      </ul>
      
      <Link to="/start-project">
        <Button variant={popular ? "primary" : "outline"} fullWidth className={popular ? "bg-gradient-to-r from-gray-900 to-black border-none shadow-lg shadow-pink-500/20" : "hover:bg-gray-50"}>
          Book This Pack
        </Button>
      </Link>
    </div>
  </div>
);

const GalleryImage = ({ src, alt, className, badge }: { src: string; alt: string; className?: string; badge?: string }) => (
  <div className={`relative rounded-3xl overflow-hidden group cursor-pointer w-full ${className} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur p-4 rounded-full text-pink-600 shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
        <Heart size={24} className="fill-current" />
      </div>
    </div>
    {badge && (
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        {badge}
      </div>
    )}
    {/* Mobile Only Badge Overlay if standard badge isn't enough */}
    <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none border border-white/10"></div>
  </div>
);

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=800", alt: "Lifestyle", badge: "Lifestyle" },
  { src: "https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=400", alt: "Flatlay", badge: "Flatlay" },
  { src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400", alt: "On-Model", badge: "On-Model" },
  { src: "https://images.unsplash.com/photo-1522335789203-abd852269401?q=80&w=400", alt: "Detail", badge: "Detail" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600", alt: "Product", badge: "Product" },
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600", alt: "Editorial", badge: "Editorial" },
  { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600", alt: "Beauty", badge: "Beauty" },
  { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600", alt: "Fashion", badge: "Fashion" },
];

export const InstagramPage: React.FC = () => {
  return (
    <div className="bg-white pt-20 overflow-x-hidden font-sans text-fashion-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 md:py-32 container mx-auto px-6 md:px-12 overflow-visible">
        {/* Ambient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-pink-50 via-purple-50 to-transparent rounded-full blur-[120px] -z-10 opacity-60" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-white border border-pink-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 shadow-sm text-pink-600 animate-in fade-in slide-in-from-bottom-4">
                <Instagram size={14} /> Social First Photography
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.95] mb-6 text-gray-900 tracking-tight">
                Refresh <br/>
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">Feed.</span>
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0 font-light">
                Create scroll-stopping content tailored for the social generation. High-quality, trend-aware, and optimized for engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/start-project">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto px-10 shadow-xl shadow-pink-500/20 bg-gradient-to-r from-gray-900 to-black border-none h-14 text-base">
                    Get Started
                  </Button>
                </Link>
                <a href="#packs">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 h-14 text-base bg-white/50 backdrop-blur-sm">
                    View Packs
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
          
          <div className="order-1 lg:order-2 relative perspective-1000">
            <FadeIn direction="left" delay={200}>
              <div className="relative z-10 grid grid-cols-2 gap-4 transform rotate-y-12 rotate-x-6 lg:rotate-0 transition-transform duration-700">
                <div className="space-y-4 translate-y-12">
                   <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600" className="rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover hover:scale-[1.02] transition-transform duration-500" alt="Beauty Product" />
                   <div className="bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl border border-white/50 flex items-center gap-4 animate-bounce-slow">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Engagement</p>
                        <p className="text-2xl font-bold text-gray-900">+340%</p>
                      </div>
                   </div>
                </div>
                <div className="space-y-4">
                   <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600" className="rounded-[2.5rem] shadow-2xl w-full aspect-square object-cover hover:scale-[1.02] transition-transform duration-500" alt="Fashion Lifestyle" />
                   <img src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=600" className="rounded-[2.5rem] shadow-2xl w-full aspect-[4/5] object-cover hover:scale-[1.02] transition-transform duration-500" alt="Flatlay" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 rotate-6 hidden lg:block animate-in zoom-in duration-700 delay-500">
                <Heart className="fill-pink-500 text-pink-500" size={32} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="border-y border-gray-100 bg-gray-50/30 py-16 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-10 flex items-center justify-center gap-2">
             20k+ Brands ❤️ Us
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-serif font-bold">Glossier</span>
              <span className="text-2xl font-bold tracking-tighter">REVOLVE</span>
              <span className="text-2xl font-serif italic font-bold">Mejuri</span>
              <span className="text-2xl font-bold tracking-widest">SKIMS</span>
              <span className="text-2xl font-sans font-light">Aesop.</span>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={0}>
            <BenefitCard 
              icon={Star} 
              title="Stand Out Instantly" 
              text="Aesthetic visuals designed to stop the scroll and capture attention in milliseconds."
            />
          </FadeIn>
          <FadeIn delay={100}>
            <BenefitCard 
              icon={MousePointerClick} 
              title="Boost Engagement" 
              text="Content optimized for saves, shares, and comments. We know what the algorithm loves."
            />
          </FadeIn>
          <FadeIn delay={200}>
            <BenefitCard 
              icon={Instagram} 
              title="Made for Instagram" 
              text="Lighting, styling, and formats (4:5, 9:16) specifically crafted for the platform."
            />
          </FadeIn>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW */}
      <section className="py-20 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div className="max-w-xl">
               <SectionTag color="text-pink-400">Visuals</SectionTag>
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">Creative Photos <br/> for Your Feed</h2>
               <p className="text-gray-400 text-lg">
                 From minimalist flatlays to vibrant lifestyle shots, we curate aesthetics that fit your brand.
               </p>
             </div>
             <Link to="/directory" className="hidden md:block">
                <Button variant="white">View Full Gallery</Button>
             </Link>
          </div>

          {/* Desktop Grid: Masonry using columns */}
          <div className="hidden md:block columns-2 lg:columns-4 gap-6 space-y-6 mb-16">
             {GALLERY_IMAGES.map((img, i) => (
                <FadeIn key={i} delay={i * 50} className="break-inside-avoid">
                    <GalleryImage {...img} className="mb-6" />
                </FadeIn>
             ))}
          </div>

          {/* Mobile Carousel: Swipeable */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scroll-smooth hide-scrollbar">
             {GALLERY_IMAGES.map((img, i) => (
                <div key={i} className="min-w-[85%] h-[400px] snap-center">
                   <GalleryImage {...img} className="h-full shadow-xl" />
                </div>
             ))}
          </div>
          
          <div className="mt-8 md:mt-16 text-center flex justify-center relative z-10">
             <Link to="/directory">
                <Button 
                  variant="white" 
                  size="lg" 
                  className="rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all px-12 h-16 text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] border-none"
                >
                   Explore what's possible <ArrowRight className="ml-2" size={20} />
                </Button>
             </Link>
          </div>
        </div>
      </section>

      {/* 5. PACKS PREVIEW */}
      <section id="packs" className="py-24 bg-gradient-to-b from-gray-50 to-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-20 max-w-3xl mx-auto">
               <SectionTag>Pricing</SectionTag>
               <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Get Started with <br/> Our Ecomm Packs</h2>
               <p className="text-gray-500 text-xl">Standardized packages making it easy to get everything you need.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
               <FadeIn delay={0}>
                  <PackCard 
                    title="Ecomm Starter"
                    price="$837"
                    type="Photo"
                    image="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600"
                    features={["13 Photos", "2 Animated GIFs", "1 Hand Model", "5 Products", "Web Optimized"]}
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <PackCard 
                    title="Hand Model Video"
                    price="$694"
                    type="Video"
                    image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600"
                    features={["15-30s Video", "3 Angles", "1 Hand Model", "1 Music Track", "9:16 Format"]}
                    popular
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <PackCard 
                    title="Model Demo Video"
                    price="$794"
                    type="Video"
                    image="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600"
                    features={["30-60s Video", "5 Angles", "Full Body Model", "Music Track", "Social Cutdown"]}
                  />
               </FadeIn>
            </div>
            
            <div className="mt-16 text-center">
               <Link to="/pricing" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider border-b-2 border-gray-200 pb-1 hover:text-pink-600 hover:border-pink-600 transition-all">
                  View all packs <ArrowRight size={16} />
               </Link>
            </div>
         </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <FadeIn>
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl text-center flex flex-col items-center justify-center min-h-[500px]">
               <div className="relative z-10 max-w-2xl">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 rotate-3 shadow-lg">
                    <Sparkles size={40} className="text-pink-300 fill-pink-300" />
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight">Ready to scale your content?</h2>
                  <p className="text-purple-100 text-xl mb-12 leading-relaxed font-light">
                     Join thousands of brands creating world-class imagery with FashionOS.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Link to="/start-project">
                        <Button variant="white" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg">
                           Build My Shoot
                        </Button>
                     </Link>
                     <Link to="/contact">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-lg border-white text-white hover:bg-white hover:text-purple-600">
                           Talk to an Expert
                        </Button>
                     </Link>
                  </div>
               </div>
               
               {/* Abstract Shapes */}
               <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-pulse" />
                   <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-pulse delay-1000" />
               </div>
            </div>
         </FadeIn>
      </section>

    </div>
  );
};
