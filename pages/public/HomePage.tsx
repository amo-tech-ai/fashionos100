
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Camera, CheckCircle2, Video, ShoppingBag, Users, Play, Sparkles, Star } from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { ImageCarousel, CarouselItem } from '../../components/ImageCarousel';

// --- Helper Components Local to Homepage ---

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-1 h-1 rounded-full bg-black" />
    <span className="text-sm font-medium text-gray-600">{text}</span>
  </div>
);

const ServiceCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="group bg-white p-8 border border-gray-100 rounded-sm hover:border-black transition-colors duration-300 cursor-pointer h-full flex flex-col">
    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
      <Icon size={20} />
    </div>
    <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-grow">{desc}</p>
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mt-auto group-hover:translate-x-2 transition-transform">
      View Details <ArrowRight size={12} />
    </div>
  </div>
);

const TalentCard = ({ image, name, role, tag }: { image: string, name: string, role: string, tag: string }) => (
  <div className="min-w-[280px] md:min-w-[320px] bg-white p-3 border border-gray-100 rounded-sm hover:shadow-lg transition-shadow cursor-pointer">
    <div className="aspect-[3/4] w-full overflow-hidden mb-4 relative">
      <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 uppercase tracking-wide">{tag}</span>
    </div>
    <h4 className="font-serif font-bold text-lg">{name}</h4>
    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{role}</p>
    <div className="flex items-center gap-1 text-amber-400">
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
      <span className="text-gray-400 text-xs ml-1">(24)</span>
    </div>
  </div>
);

const MarketplaceCard = ({ title, price, features, image }: { title: string, price: string, features: string[], image: string }) => (
  <div className="relative aspect-[4/5] group overflow-hidden rounded-sm cursor-pointer">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end text-white">
      <h3 className="font-serif font-bold text-2xl mb-1">{title}</h3>
      <p className="text-fashion-purple font-medium mb-4">{price}</p>
      <ul className="space-y-1 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
        {features.map((f, i) => (
          <li key={i} className="text-xs text-gray-300 flex items-center gap-2"><CheckCircle2 size={10} /> {f}</li>
        ))}
      </ul>
      <Button variant="white" size="sm" className="w-full">View Package</Button>
    </div>
  </div>
);

// --- Main Page Component ---

export const HomePage: React.FC = () => {
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
      title: "Summer Editorial '25",
      subtitle: "Campaign"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1200&auto=format&fit=crop",
      title: "Milan Fashion Week",
      subtitle: "Runway"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
      title: "Urban Street Style",
      subtitle: "Lookbook"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop",
      title: "Studio Minimalist",
      subtitle: "Product"
    }
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionTag color="text-fashion-purpleDark">FashionOS Studio</SectionTag>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6 text-fashion-black">
                Exceptional <br/>
                fashion imagery. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Every time.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                Runway, campaigns, ecommerce, and editorial — we help fashion brands look as premium as they feel.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/dashboard"><Button variant="primary" size="lg">Book a Discovery Call</Button></Link>
                <Link to="/directory"><Button variant="outline" size="lg">Explore Directory</Button></Link>
              </div>
              <div className="space-y-2 border-t border-gray-100 pt-6">
                <BenefitItem text="Runway & backstage coverage" />
                <BenefitItem text="Ecommerce & lookbooks" />
                <BenefitItem text="Campaigns, video & social content" />
              </div>
            </FadeIn>
          </div>
          
          {/* Image Grid */}
          <div className="lg:col-span-7">
            <FadeIn direction="left" delay={200}>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4 md:space-y-6 translate-y-8">
                  <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop" alt="Runway" className="w-full aspect-[3/4] object-cover rounded-sm shadow-lg" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1550614000-4b9519e0013f?q=80&w=800&auto=format&fit=crop" alt="Detail" className="w-full aspect-square object-cover rounded-sm shadow-lg" loading="lazy" />
                </div>
                <div className="space-y-4 md:space-y-6">
                  <img src="https://images.unsplash.com/photo-1529139574466-a302d2052505?q=80&w=800&auto=format&fit=crop" alt="Editorial" className="w-full aspect-square object-cover rounded-sm shadow-lg" loading="lazy" />
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" alt="Model" className="w-full aspect-[3/4] object-cover rounded-sm shadow-lg" loading="lazy" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 1.5 CAROUSEL SECTION (New) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="mb-8 flex justify-between items-end">
              <div>
                <SectionTag>Featured Work</SectionTag>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Latest Campaigns</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                <span className="w-12 h-px bg-gray-200"></span>
                Swipe to explore
              </div>
            </div>
            <ImageCarousel items={carouselItems} aspectRatio="landscape" className="rounded-2xl shadow-2xl" />
          </FadeIn>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">A studio you can trust.</h2>
              <p className="text-gray-500 leading-relaxed">
                We understand the pressures of the fashion calendar. From Fashion Week deadlines to seasonal drops, 
                agencies and designers rely on us for on-time, high-fidelity assets.
              </p>
            </FadeIn>
          </div>
          
          <FadeIn delay={100}>
            <div className="relative w-full h-[400px] md:h-[600px] rounded-sm overflow-hidden mb-12 group">
               <img src="https://images.unsplash.com/photo-1534595032350-92298174321c?q=80&w=2000&auto=format&fit=crop" alt="Studio Set" className="w-full h-full object-cover" loading="lazy" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: "On-set Creative Direction", desc: "Our art directors work with you to ensure every shot aligns with your campaign vision." },
              { title: "Rapid Retouching", desc: "First proofs in 24 hours. Final assets delivered ready for print and digital channels." },
              { title: "Brand Consistency", desc: "We maintain your visual identity across lookbooks, social, and ecommerce." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100} direction="up">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-12">
             <Link to="/services"><Button variant="outline">View Studio Services</Button></Link>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE / 20 YEARS */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16">
           <div className="w-full md:w-1/2">
              <FadeIn direction="right">
                 <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop" alt="Photographer" className="w-full aspect-[4/5] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
              </FadeIn>
           </div>
           <div className="w-full md:w-1/2">
              <FadeIn direction="left">
                 <SectionTag>Our Heritage</SectionTag>
                 <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">20+ years in the <br/> fashion industry.</h2>
                 <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    From boutique labels to Fortune 500 brands, we've mastered the art of capturing fashion that sells. 
                    Our extensive portfolio includes work for fashion houses, beauty brands, jewelry designers, and lifestyle companies across the globe.
                 </p>
                 <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4">
                       <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Camera size={18} /></div>
                       <span className="font-medium">Global runway coverage</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Sparkles size={18} /></div>
                       <span className="font-medium">Campaigns for independent labels</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="bg-purple-100 p-2 rounded-full text-purple-600"><ShoppingBag size={18} /></div>
                       <span className="font-medium">Ecommerce & catalog production</span>
                    </div>
                 </div>
                 <Link to="/services" className="text-fashion-purpleDark font-bold uppercase tracking-widest text-xs hover:underline">See Client Stories →</Link>
              </FadeIn>
           </div>
        </div>
      </section>

      {/* 4. ECOMMERCE SPOTLIGHT */}
      <section className="py-24 bg-gray-900 text-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1">
                  <FadeIn>
                     <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ecommerce Product Photography.</h2>
                     <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Clean, high-fidelity product photography increases conversion and reduces returns. 
                        We provide styling, shooting, and retouching optimized for Shopify, Amazon, and luxury marketplaces.
                     </p>
                     <ul className="space-y-4 mb-10">
                        <li className="flex items-start gap-3">
                           <CheckCircle2 className="text-fashion-purple mt-1" size={20} />
                           <div>
                              <strong className="block text-white">Consistent Lighting & Styling</strong>
                              <span className="text-sm text-gray-500">Ensure your collection looks cohesive on the grid.</span>
                           </div>
                        </li>
                        <li className="flex items-start gap-3">
                           <CheckCircle2 className="text-fashion-purple mt-1" size={20} />
                           <div>
                              <strong className="block text-white">On-Model, Flat-Lay, or Ghost Mannequin</strong>
                              <span className="text-sm text-gray-500">Versatile shooting styles to match your brand guidelines.</span>
                           </div>
                        </li>
                     </ul>
                     <Button variant="white">View Ecommerce Packages</Button>
                  </FadeIn>
               </div>
               <div className="order-1 lg:order-2 relative">
                  <FadeIn direction="left">
                     <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop" className="rounded-sm transform translate-y-8" alt="Shoes" loading="lazy" />
                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" className="rounded-sm" alt="Watch" loading="lazy" />
                     </div>
                  </FadeIn>
               </div>
            </div>
         </div>
      </section>

      {/* 5. TESTIMONIAL BANNER */}
      <section className="py-20 bg-black text-white border-t border-white/10">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <FadeIn>
               <div className="text-fashion-purple text-6xl font-serif mb-6">"</div>
               <blockquote className="text-2xl md:text-4xl font-serif leading-tight max-w-4xl mx-auto mb-8">
                  We’ve trusted FashionOS Studio with our campaigns for 6+ years. They always deliver imagery that moves product.
               </blockquote>
               <div className="flex flex-col items-center gap-2">
                  <cite className="not-italic font-bold text-lg">Cristina Álvarez</cite>
                  <span className="text-gray-500 text-sm uppercase tracking-widest">Creative Director, Atelier Eclipse</span>
               </div>
               <div className="mt-8">
                  <a href="#" className="text-gray-400 text-xs hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">See more client feedback →</a>
               </div>
            </FadeIn>
         </div>
      </section>

      {/* 6. CREATIVE SERVICES */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
               <SectionTag>What we do</SectionTag>
               <h2 className="text-4xl font-serif font-bold">Creative Services</h2>
            </div>
            <Link to="/services" className="hidden md:block text-xs font-bold uppercase tracking-widest border-b border-black pb-1">View All Services</Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn delay={0}><ServiceCard icon={Camera} title="Campaigns" desc="Editorial-quality campaigns for new launches and seasonal stories." /></FadeIn>
            <FadeIn delay={100}><ServiceCard icon={Sparkles} title="Runway" desc="On-the-ground coverage that captures energy, details, and atmosphere." /></FadeIn>
            <FadeIn delay={200}><ServiceCard icon={ShoppingBag} title="Ecommerce" desc="High-volume, consistent imagery optimized for online sales." /></FadeIn>
            <FadeIn delay={300}><ServiceCard icon={Video} title="Video & Social" desc="Short-form video, reels, and behind-the-scenes content for social." /></FadeIn>
         </div>
      </section>

      {/* 7. DIRECTORY PREVIEW */}
      <section className="py-24 bg-gray-50 overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
               <div className="lg:w-1/3">
                  <SectionTag>The Network</SectionTag>
                  <h2 className="text-4xl font-serif font-bold mb-6">Fashion Directory.</h2>
                  <p className="text-gray-500 mb-8">
                     We curate a network of the best photographers, stylists, models, and MUAs in the industry. 
                     Find your next collaborator.
                  </p>
                  <div className="bg-white p-2 rounded-full shadow-sm border border-gray-200 flex items-center mb-6">
                     <Search className="ml-3 text-gray-400" size={18} />
                     <input type="text" placeholder="Search talent, services, or cities..." className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-gray-800 placeholder:text-gray-400" />
                     <Button size="sm" className="rounded-full">Search</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {['Photographers', 'Stylists', 'Models', 'MUAs', 'Paris', 'NYC'].map(tag => (
                        <span key={tag} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase text-gray-500 cursor-pointer hover:border-black hover:text-black transition-colors">{tag}</span>
                     ))}
                  </div>
               </div>
               <div className="lg:w-2/3 relative">
                  <div className="flex gap-6 overflow-x-auto pb-8 px-2 hide-scrollbar">
                     <TalentCard image="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400" name="Elena Rodriguez" role="Photographer" tag="Editorial" />
                     <TalentCard image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400" name="Marcus Chen" role="Stylist" tag="Runway" />
                     <TalentCard image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" name="Sarah Jenkins" role="Model" tag="Commercial" />
                     <TalentCard image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" name="David Kim" role="Videographer" tag="Documentary" />
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
               </div>
            </div>
            <div className="text-center">
               <Link to="/directory"><Button variant="secondary">Browse Full Directory</Button></Link>
            </div>
         </div>
      </section>

      {/* 8. MARKETPLACE */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionTag>Packages</SectionTag>
            <h2 className="text-4xl font-serif font-bold mb-4">Fashion Marketplace.</h2>
            <p className="text-gray-500">Ready-made packages for emerging and established brands.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0}>
               <MarketplaceCard 
                  title="Lookbook Starter" 
                  price="$2,500" 
                  image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop"
                  features={["Half-day studio shoot", "1 Model included", "10 Retouched images", "Styling assistance"]}
               />
            </FadeIn>
            <FadeIn delay={100}>
               <MarketplaceCard 
                  title="Campaign Launch" 
                  price="$5,800" 
                  image="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop"
                  features={["Full-day location shoot", "2 Models included", "20 Retouched images", "Social media cuts (Video)"]}
               />
            </FadeIn>
            <FadeIn delay={200}>
               <MarketplaceCard 
                  title="Ecommerce Scale" 
                  price="Custom Quote" 
                  image="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop"
                  features={["High volume product shots", "Ghost mannequin or on-model", "Next-day proofs", "Shopify formatted export"]}
               />
            </FadeIn>
         </div>
      </section>

      {/* 9. BEHIND THE SCENES */}
      <section className="py-24 bg-black text-white overflow-hidden relative group cursor-pointer">
         <div className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-700">
             <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop" alt="BTS" className="w-full h-full object-cover" loading="lazy" />
         </div>
         <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center h-[50vh]">
             <div className="bg-white/10 backdrop-blur-md p-6 rounded-full mb-8 border border-white/20 group-hover:scale-110 transition-transform duration-500">
                <Play fill="white" className="ml-1" size={40} />
             </div>
             <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-center">Behind the scenes.</h2>
             <p className="text-xl text-gray-300 max-w-xl text-center mb-8">Take a peek at how we plan, light, and shoot your campaigns.</p>
             <Button variant="white">Watch the Studio Tour</Button>
         </div>
      </section>

      {/* 10. CUSTOM BRIEF */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-200">
         <div className="container mx-auto px-6 md:px-12">
            <div className="bg-white rounded-sm shadow-xl overflow-hidden flex flex-col md:flex-row">
               <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                  <SectionTag>Bespoke Production</SectionTag>
                  <h2 className="text-4xl font-serif font-bold mb-6">Need something a <br/> little more creative?</h2>
                  <p className="text-gray-500 text-lg mb-8">
                     Have a complex vision? We love the unusual. Bring us your wildest briefs for multi-day productions, 
                     exotic locations, or set builds.
                  </p>
                  <ul className="space-y-3 mb-10">
                     {["Full campaign development", "Concept, casting, and location scouting", "Multi-day, multi-location productions"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 font-medium">
                           <div className="w-1.5 h-1.5 bg-fashion-purple rounded-full" /> {item}
                        </li>
                     ))}
                  </ul>
                  <div><Button variant="primary" size="lg">Start a Custom Brief</Button></div>
               </div>
               <div className="w-full md:w-1/2 relative min-h-[400px]">
                  <img src="https://images.unsplash.com/photo-1470072582277-d990675202fa?q=80&w=800&auto=format&fit=crop" alt="Creative" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
