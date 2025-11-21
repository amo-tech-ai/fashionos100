import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Play,
  ShoppingBag,
  Users,
  Sparkles,
  Zap,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { Button } from './components/Button';
import { FadeIn } from './components/FadeIn';

// --- Navigation ---
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Directory', href: '#directory' },
    { name: 'Events', href: '#events' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-serif font-bold tracking-tighter">FashionOS</a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-fashion-purpleDark transition-colors">
              {link.name}
            </a>
          ))}
          <Button variant="primary" size="sm">Get Started</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b p-6 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-lg font-medium">
              {link.name}
            </a>
          ))}
          <Button className="w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
};

// --- Sections ---

const Hero: React.FC = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Text Content */}
        <div className="lg:w-1/2 z-10">
          <FadeIn>
            <h1 className="text-5xl lg:text-7xl font-serif font-medium leading-[1.1] mb-8">
              Exceptional imagery.<br />
              <span className="italic text-fashion-purpleDark">Every time.</span>
            </h1>
            <p className="text-gray-600 text-lg mb-10 max-w-md leading-relaxed">
              As the leading professional product photography studio, we deliver outstanding images with an unrivaled level of service. 
              We blend art direction with commercial strategy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Book Session</Button>
              <Button variant="secondary" size="lg">Explore Directory</Button>
            </div>
          </FadeIn>
        </div>

        {/* Image Grid */}
        <div className="lg:w-1/2 relative">
          <div className="grid grid-cols-2 gap-4 transform lg:rotate-3 hover:rotate-0 transition-transform duration-700">
            <FadeIn delay={100} className="space-y-4">
              <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600" alt="Fashion Model 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="h-48 bg-gray-200 rounded-2xl overflow-hidden relative group">
                 <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" alt="Fashion Model 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </FadeIn>
            <FadeIn delay={300} className="space-y-4 mt-12">
              <div className="h-48 bg-gray-200 rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1529139574466-a302c27e0169?auto=format&fit=crop&q=80&w=600" alt="Fashion Model 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600" alt="Fashion Model 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StudioTrust: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="bg-black rounded-[3rem] p-12 lg:p-24 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <FadeIn direction="right">
              <h2 className="text-4xl lg:text-6xl font-serif mb-8">A studio you can trust.</h2>
              <div className="space-y-6 text-gray-300 text-lg font-light">
                <p>
                  We offer a full creative photography service, from location scouting and art direction to retouching and delivery.
                </p>
                <p>
                  Our team consists of award-winning photographers, stylists, and creative directors who have worked with leading fashion brands worldwide.
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="lg:w-1/2 relative">
            <FadeIn direction="left">
              <div className="relative aspect-square rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800" 
                  alt="High End Camera" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Decorative Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <Camera className="w-8 h-8 text-fashion-purple" />
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Abstract Background Gradients */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-gray-900 to-transparent opacity-50" />
      </div>
    </div>
  </section>
);

const ColorBlockRow: React.FC = () => (
  <section className="py-0">
    <div className="grid grid-cols-1 md:grid-cols-3 h-[60vh] min-h-[500px]">
      <div className="relative group overflow-hidden">
        <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Beauty Products" />
        <div className="absolute inset-0 bg-yellow-500/20 group-hover:bg-yellow-500/10 transition-colors" />
        <div className="absolute bottom-8 left-8">
          <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-yellow-700">Cosmetics</span>
        </div>
      </div>
      <div className="relative group overflow-hidden">
        <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sneakers" />
        <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-purple-500/10 transition-colors" />
        <div className="absolute bottom-8 left-8">
          <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-purple-700">Footwear</span>
        </div>
      </div>
      <div className="relative group overflow-hidden">
        <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fragrance" />
        <div className="absolute inset-0 bg-cyan-500/20 group-hover:bg-cyan-500/10 transition-colors" />
        <div className="absolute bottom-8 left-8">
          <span className="bg-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-700">Fragrance</span>
        </div>
      </div>
    </div>
  </section>
);

const Experience: React.FC = () => (
  <section className="py-24 bg-fashion-cream">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
           <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1598550487031-0898b4852123?auto=format&fit=crop&q=80&w=800" alt="Studio Setup" className="w-full" />
           </div>
        </div>
        <div className="md:w-1/2">
          <FadeIn>
            <h2 className="text-5xl font-serif mb-6">20+ years in the industry.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              With over two decades of experience in fashion and product photography, we've mastered the art of capturing products that sell. From small boutique brands to Fortune 500 companies.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We combine traditional photography expertise with cutting-edge AI tools to deliver images that stand out in today's competitive marketplace.
            </p>
            <Button variant="outline">Read Our Story</Button>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
);

const CreativeServices: React.FC = () => {
  const services = [
    { icon: Layers, title: "Consistency", desc: "Uniform imagery essential for professional representation across all media channels." },
    { icon: Sparkles, title: "Boost Brand Image", desc: "High-quality product photography instantly elevates your brand perception." },
    { icon: Zap, title: "Improve Sales", desc: "Studies show that better product images directly correlate with higher conversion rates." },
    { icon: Users, title: "Enhance Content", desc: "Visual content is more important than ever on social media platforms." },
  ];

  return (
    <section className="py-24 bg-white" id="services">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl font-serif mb-4">Creative Services</h2>
          <div className="h-1 w-20 bg-fashion-purpleDark"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, idx) => (
            <FadeIn key={idx} delay={idx * 100} className="bg-fashion-cream p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-fashion-purpleDark group-hover:bg-fashion-purpleDark group-hover:text-white transition-colors">
                <s.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </FadeIn>
          ))}
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg">
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <span className="uppercase text-xs font-bold tracking-widest text-gray-400 mb-2">Featured Service</span>
                <h3 className="text-3xl font-serif mb-4">Ecommerce Product Photography</h3>
                <p className="text-gray-600 mb-8">If you require clean, high-end catalogue images for online, print, or PR purposes, consider our complete service.</p>
                <div><Button>View Packages</Button></div>
            </div>
            <div className="md:w-1/2 bg-gray-100 relative h-80 md:h-auto">
                 <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover" alt="Serum Bottle" />
            </div>
        </div>
      </div>
    </section>
  );
};

const Testimonial: React.FC = () => (
  <section className="py-24 bg-fashion-black text-white relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50"></div>
    <div className="container mx-auto px-6 relative z-10 text-center">
      <div className="text-6xl text-fashion-purpleDark opacity-50 font-serif mb-8">"</div>
      <h3 className="text-2xl md:text-4xl font-serif leading-tight max-w-4xl mx-auto mb-10">
        I've been using FashionOS for the past 6 years and have only ever found them to be friendly, professional and willing to work with you to get the perfect product shots.
      </h3>
      <div>
        <p className="font-bold text-lg">Christopher Haste</p>
        <p className="text-gray-400 text-sm">Creative Director, Blend Studios</p>
      </div>
    </div>
  </section>
);

const Directory: React.FC = () => {
  const items = [
    { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", title: "Models" },
    { img: "https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?auto=format&fit=crop&q=80&w=400", title: "Designers" },
    { img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400", title: "Photographers" },
    { img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=400", title: "Stylists" },
  ];

  return (
    <section className="py-24 bg-fashion-cream" id="directory">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <FadeIn>
            <h2 className="text-5xl font-serif mb-6">Fashion Directory</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Connect with the industry's most talented professionals. Our curated directory features designers, photographers, models, and stylists from around the world.
            </p>
            <Button variant="primary">Explore Directory</Button>
          </FadeIn>
        </div>
        <div className="lg:w-2/3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {items.map((item, idx) => (
                <FadeIn key={idx} delay={idx * 100} direction="up">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer">
                     <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-serif font-medium tracking-wide">{item.title}</p>
                     </div>
                  </div>
                </FadeIn>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Marketplace: React.FC = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif mb-4">Fashion Marketplace</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">Shop exclusive pieces from emerging and established designers.</p>
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-orange-50 rounded-3xl p-8 flex flex-col justify-between group hover:shadow-xl transition-all">
                <div className="mb-8">
                    <h3 className="text-3xl font-serif mb-2">Summer Collection</h3>
                    <a href="#" className="text-sm font-bold uppercase tracking-wider border-b border-black pb-1">Shop Now</a>
                </div>
                <div className="rounded-2xl overflow-hidden h-64">
                    <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Summer" />
                </div>
            </div>
            <div className="md:w-2/3 relative rounded-3xl overflow-hidden h-[500px] group">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Model" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center p-12">
                    <div className="text-white max-w-md">
                        <h3 className="text-4xl font-serif mb-4">Signature Pieces</h3>
                        <p className="mb-8 opacity-90">From ready-to-wear to haute couture, discover fashion that makes a statement.</p>
                        <Button variant="ghost" className="bg-white/20 backdrop-blur">View Collection</Button>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="h-80 bg-fashion-purple/10 rounded-3xl overflow-hidden relative group flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" className="absolute w-full h-full object-cover mix-blend-overlay opacity-50" alt="Shoes" />
                <div className="relative z-10 text-center">
                  <h3 className="text-3xl font-serif font-bold text-fashion-purpleDark mb-4">Sneaker Drop</h3>
                  <Button size="sm" variant="primary">Shop Drops</Button>
                </div>
            </div>
            <div className="h-80 bg-fashion-blue/10 rounded-3xl overflow-hidden relative group flex items-center justify-center">
                 <img src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800" className="absolute w-full h-full object-cover mix-blend-overlay opacity-50" alt="Bag" />
                 <div className="relative z-10 text-center">
                  <h3 className="text-3xl font-serif font-bold text-cyan-700 mb-4">Accessories</h3>
                  <Button size="sm" variant="secondary">Browse All</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

const BehindTheScenes: React.FC = () => (
  <section className="relative h-[80vh] bg-black overflow-hidden flex items-end">
    <img src="https://images.unsplash.com/photo-1505399309418-30322a4642b3?auto=format&fit=crop&q=80&w=1800" alt="Behind the scenes" className="absolute inset-0 w-full h-full object-cover opacity-60" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    
    <div className="container mx-auto px-6 relative z-10 pb-24">
      <FadeIn direction="up">
        <h2 className="text-6xl md:text-8xl font-serif text-white mb-6">Behind<br/>The Scenes.</h2>
        <p className="text-gray-300 max-w-xl text-lg mb-8">
            Take a peek into our professional studio and see how we create exceptional imagery. It takes a village to build a brand.
        </p>
        <button className="flex items-center gap-4 text-white group">
            <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Play fill="currentColor" size={20} />
            </div>
            <span className="font-medium tracking-widest uppercase text-sm">Watch Film</span>
        </button>
      </FadeIn>
    </div>
  </section>
);

const CreativeVideo: React.FC = () => (
  <section className="py-24 bg-fashion-cream">
     <div className="container mx-auto px-6 bg-white rounded-[3rem] shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 h-96 lg:h-auto relative">
                 <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover" alt="Creative" />
                 <div className="absolute inset-0 bg-black/20"></div>
            </div>
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
                <h2 className="text-4xl font-serif mb-6">Need something a little more creative?</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Looking to push creative boundaries? Our network of 500+ fashion professionals is ready to collaborate on ambitious projects. From conceptual fashion films to avant-garde editorial shoots.
                </p>
                <div>
                  <Button variant="primary">Join the Network</Button>
                </div>
            </div>
        </div>
     </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <span className="text-2xl font-serif font-bold">FashionOS</span>
          <p className="text-gray-500 text-sm">Connecting the fashion industry through AI-powered creativity and storytelling.</p>
          <div className="flex gap-4 text-gray-400">
            <Instagram size={20} className="hover:text-black cursor-pointer transition-colors" />
            <Twitter size={20} className="hover:text-black cursor-pointer transition-colors" />
            <Facebook size={20} className="hover:text-black cursor-pointer transition-colors" />
            <Linkedin size={20} className="hover:text-black cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Directory</a></li>
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Events</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-4 text-sm text-gray-600">
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Photography</a></li>
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Video Production</a></li>
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Web Design</a></li>
            <li><a href="#" className="hover:text-fashion-purpleDark transition-colors">Social Media</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
          <p className="text-gray-500 text-sm mb-4">Subscribe for the latest trends.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Email address" className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:border-fashion-purple" />
            <button className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors">Go</button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>&copy; 2025 FashionOS. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-fashion-black">
      <Navbar />
      <main>
        <Hero />
        <StudioTrust />
        <ColorBlockRow />
        <Experience />
        <CreativeServices />
        <Testimonial />
        <Directory />
        <Marketplace />
        <BehindTheScenes />
        <CreativeVideo />
      </main>
      <Footer />
    </div>
  );
};

export default App;