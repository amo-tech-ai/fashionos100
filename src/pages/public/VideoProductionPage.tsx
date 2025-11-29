import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Film, Video, MonitorPlay, Layers, Share2, 
  CheckCircle2, Star, ArrowRight, Camera, Sparkles,
  Clock, TrendingUp, Clapperboard, Smartphone, CreditCard
} from 'lucide-react';
import { Button } from '../../components/Button';
import { FadeIn } from '../../components/FadeIn';
import { SectionTag } from '../../components/SectionTag';
import { ContactForm } from '../../components/forms/ContactForm';

// --- Sub-Components ---

const StatCard = ({ value, label, icon: Icon }: { value: string, label: string, icon?: any }) => (
  <div className="p-6 bg-white rounded-xl border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
    {Icon && <div className="flex justify-center mb-3 text-fashion-purple group-hover:scale-110 transition-transform"><Icon size={24} /></div>}
    <h3 className="text-3xl font-serif font-bold text-fashion-black mb-1">{value}</h3>
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-fashion-purple transition-colors">{label}</p>
  </div>
);

const VideoServiceCard = ({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) => (
  <div className="group p-10 bg-white rounded-2xl border border-gray-100 hover:border-fashion-purple/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
    <div className="w-14 h-14 bg-purple-50 text-fashion-purple rounded-2xl flex items-center justify-center mb-8 group-hover:bg-fashion-purple group-hover:text-white transition-colors duration-500">
      <Icon size={28} />
    </div>
    <h3 className="font-serif font-bold text-2xl mb-4 text-fashion-black">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{desc}</p>
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-fashion-purple transition-colors mt-auto">
      Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const ProcessStep = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
  <div className="relative flex flex-col items-center text-center md:items-start md:text-left group">
    <div className="w-16 h-16 bg-fashion-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
       <Icon size={28} />
       <div className="absolute -top-3 -right-3 w-8 h-8 bg-fashion-purple rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
         {number}
       </div>
    </div>
    <h3 className="font-serif font-bold text-xl mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">{desc}</p>
    {/* Connector Line (Desktop) */}
    <div className="hidden md:block absolute top-8 left-16 w-[calc(100%+2rem)] h-[2px] bg-gray-100 -z-0">
      <div className="w-0 h-full bg-fashion-purple group-hover:w-full transition-all duration-700 ease-out" />
    </div>
  </div>
);

const PricingCard = ({ title, price, features, highlight = false, cta }: { title: string, price: string, features: string[], highlight?: boolean, cta: string }) => (
  <div className={`relative p-10 rounded-3xl border flex flex-col h-full transition-transform duration-300 ${highlight ? 'bg-fashion-black text-white border-fashion-black shadow-2xl md:-translate-y-4' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-xl'}`}>
    {highlight && (
      <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
        <span className="bg-fashion-purple text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">Recommended</span>
      </div>
    )}
    <div className="mb-8 pb-8 border-b border-gray-100/10">
      <h3 className={`font-serif font-bold text-2xl mb-2 ${highlight ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-4xl font-bold ${highlight ? 'text-fashion-purple' : 'text-gray-900'}`}>{price}</p>
    </div>
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${highlight ? 'text-fashion-purple' : 'text-green-500'}`} />
          <span className={highlight ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
        </li>
      ))}
    </ul>
    <Button variant={highlight ? 'accent' : 'outline'} fullWidth className={highlight ? 'shadow-lg shadow-purple-500/30' : 'hover:bg-gray-50'}>
      {cta}
    </Button>
  </div>
);

// --- Main Component ---

export const VideoProductionPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white pt-20 overflow-x-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
         {/* Background Video/Image */}
         <div className="absolute inset-0 bg-black z-0">
            <img 
              src="https://images.unsplash.com/photo-1532716377393-51aa28ee92b5?q=80&w=2070&auto=format&fit=crop" 
              alt="Cinematic Video Set" 
              className="w-full h-full object-cover opacity-50"
            />
            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-900/20 to-black/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
         </div>

         <div className="container mx-auto px-6 md:px-12 relative z-10 text-white text-center md:text-left">
            <FadeIn>
               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-8 animate-in slide-in-from-bottom-4 fade-in duration-1000">
                  <div className="w-2 h-2 bg-fashion-purple rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Video Production</span>
               </div>
               <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.1] tracking-tight">
                  From Concept <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">to Completion.</span>
               </h1>
               <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed font-light">
                  High-impact visuals crafted for fashion brands. From campaign films to social-first content, we tell stories that move audiences.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button onClick={() => scrollToSection('contact')} variant="accent" size="lg" className="px-10 shadow-lg shadow-purple-500/20">Start a Project</Button>
                  <Button onClick={() => scrollToSection('work')} variant="white" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black backdrop-blur-sm">View Recent Work</Button>
               </div>
            </FadeIn>
         </div>
      </section>

      {/* 2. VALUE PROP - "Film. Fashion. Finish." */}
      <section className="py-24 bg-white relative">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-20">
               <div className="lg:w-1/2">
                  <FadeIn>
                     <SectionTag>The Workflow</SectionTag>
                     <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 text-fashion-black leading-tight">
                        Film. Fashion. <br/>
                        <span className="text-fashion-purple">Finish.</span>
                     </h2>
                     <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                        From concept storyboarding through full production and delivery, we craft cinematic content designed specifically for the fashion industry.
                     </p>
                     <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                        Whether you’re launching a capsule collection, driving ecommerce conversions, or creating social-first reels, our team handles the full production workflow with editorial precision.
                     </p>
                     
                     <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8">
                        {[
                           { title: "Creative Direction", desc: "Concepts, storyboards & casting", icon: Sparkles },
                           { title: "Production & Filming", desc: "Studio & on-location shoots", icon: Camera },
                           { title: "Post-Production", desc: "Color grading & motion graphics", icon: Layers }
                        ].map((item, i) => (
                           <div key={i} className="flex gap-5 items-start">
                              <div className="bg-purple-50 p-3 rounded-xl text-fashion-purple shrink-0"><item.icon size={20} /></div>
                              <div>
                                 <h4 className="font-bold text-lg text-fashion-black mb-1">{item.title}</h4>
                                 <p className="text-sm text-gray-500">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </FadeIn>
               </div>
               
               <div className="lg:w-1/2">
                  <FadeIn direction="left">
                     <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-[4/5] group">
                           <img src="https://images.unsplash.com/photo-1601506521937-244b01c92805?q=80&w=800" alt="Cinema Camera" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                           
                           {/* Floating Stats */}
                           <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg animate-bounce-slow">
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Avg Turnaround</p>
                              <p className="text-2xl font-bold text-fashion-black">&lt;10 Days</p>
                           </div>
                           
                           <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-lg">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-fashion-black rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer hover:scale-110 transition-transform">
                                    <Play className="fill-white ml-1" size={20} />
                                 </div>
                                 <div>
                                    <p className="font-serif font-bold text-lg">Watch Showreel</p>
                                    <p className="text-xs uppercase tracking-widest text-gray-400">2025 Collection</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* Decor elements */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl -z-10" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl -z-10" />
                     </div>
                  </FadeIn>
               </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
               <FadeIn delay={100}><StatCard value="+220%" label="Engagement Lift" icon={TrendingUp} /></FadeIn>
               <FadeIn delay={200}><StatCard value="15M+" label="Campaign Views" icon={MonitorPlay} /></FadeIn>
               <FadeIn delay={300}><StatCard value="30+" label="Brands Produced" icon={Star} /></FadeIn>
               <FadeIn delay={400}><StatCard value="48hrs" label="Social Edits" icon={Clock} /></FadeIn>
            </div>
         </div>
      </section>

      {/* 3. RECENT WORK GALLERY */}
      <section id="work" className="py-24 bg-fashion-black text-white overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div className="max-w-xl">
                  <SectionTag color="text-fashion-purple">Portfolio</SectionTag>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Recent Work</h2>
                  <p className="text-gray-400">A look at how FashionOS brings fashion stories to life on screen — for campaigns, social, and runway.</p>
               </div>
               <div className="hidden md:flex gap-4">
                  <Button variant="outline" className="text-white border-gray-700 hover:bg-white hover:text-black hover:border-white">View All Projects</Button>
               </div>
            </div>
            
            {/* Horizontal Scroll Gallery */}
            <div className="flex gap-6 overflow-x-auto pb-12 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar snap-x cursor-grab active:cursor-grabbing">
               {[
                  { img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800", title: "Vogue Editorial", tag: "Campaign" },
                  { img: "https://images.unsplash.com/photo-1470072582277-d990675202fa?q=80&w=800", title: "Summer 25", tag: "Runway" },
                  { img: "https://images.unsplash.com/photo-1536240478700-b869070f927c?q=80&w=800", title: "Urban Decay", tag: "Social" },
                  { img: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=800", title: "Minimalist", tag: "Product" },
                  { img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800", title: "Street Style", tag: "Lookbook" }
               ].map((item, i) => (
                  <div key={i} className="min-w-[300px] md:min-w-[450px] aspect-video bg-gray-900 rounded-2xl overflow-hidden relative group snap-center border border-gray-800">
                     <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     
                     <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-fashion-purple text-xs font-bold uppercase tracking-wider mb-2 block">{item.tag}</span>
                        <h3 className="font-serif font-bold text-2xl text-white">{item.title}</h3>
                     </div>

                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                           <Play className="fill-white text-white ml-1" size={24} />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. SERVICES CARDS */}
      <section className="py-24 bg-gray-50/50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <SectionTag>Capabilities</SectionTag>
               <h2 className="text-4xl font-serif font-bold mb-4">Our Video Services</h2>
               <p className="text-gray-500">Specialized production workflows tailored to the needs of modern fashion brands.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FadeIn delay={0}>
                  <VideoServiceCard 
                     title="Campaign Films"
                     desc="Full-length brand storytelling for runway, lookbooks and collection launches. Cinema-grade cameras and lighting."
                     icon={Clapperboard}
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <VideoServiceCard 
                     title="Social Content"
                     desc="Vertical video, Reels, TikTok clips, and influencer collabs optimized for feed retention and viral engagement."
                     icon={Smartphone}
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <VideoServiceCard 
                     title="Product & Lifestyle"
                     desc="High-quality visuals for ecommerce, Amazon/Shopify listings, with motion graphic overlays and 360 product views."
                     icon={Video}
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 5. PROCESS */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-20">
               <SectionTag>How We Work</SectionTag>
               <h2 className="text-4xl font-serif font-bold">Our Process</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
               <FadeIn delay={0}>
                  <ProcessStep 
                     number="01" 
                     title="Discovery" 
                     desc="Creative briefing, mood boards & strategy alignment." 
                     icon={Sparkles} 
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <ProcessStep 
                     number="02" 
                     title="Production" 
                     desc="Filming on location or in-studio with professional crew." 
                     icon={Camera} 
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <ProcessStep 
                     number="03" 
                     title="Editing" 
                     desc="Color grading, motion graphics, & platform formatting." 
                     icon={Film} 
                  />
               </FadeIn>
               <FadeIn delay={300}>
                  <ProcessStep 
                     number="04" 
                     title="Delivery" 
                     desc="Multi-format exports, upload guidance & analytics." 
                     icon={Share2} 
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 6. TESTIMONIAL HIGHLIGHT */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <FadeIn>
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-20 rounded-[3rem] shadow-2xl border border-gray-100 max-w-5xl mx-auto relative overflow-hidden text-center">
               {/* Decorative Quote Marks */}
               <div className="absolute top-10 left-10 text-9xl font-serif text-gray-100 opacity-50 font-bold pointer-events-none">"</div>
               
               <div className="relative z-10">
                  <div className="flex justify-center gap-1 text-fashion-purple mb-8">
                     <Star size={24} fill="currentColor" />
                     <Star size={24} fill="currentColor" />
                     <Star size={24} fill="currentColor" />
                     <Star size={24} fill="currentColor" />
                     <Star size={24} fill="currentColor" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10 text-gray-900 leading-tight max-w-4xl mx-auto">
                     We really love the video — it definitely exceeded expectations. 
                     Truly professional and captured our vision perfectly.
                  </h2>
                  <div className="flex flex-col items-center gap-2">
                     <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" alt="Client" className="w-full h-full object-cover" loading="lazy" />
                     </div>
                     <span className="font-bold text-xl">Charlotte Evans</span>
                     <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Creative Director, Atelier Nova</span>
                  </div>
               </div>
            </div>
         </FadeIn>
      </section>

      {/* 7. PRICING */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
               <SectionTag>Investment</SectionTag>
               <h2 className="text-4xl font-serif font-bold mb-4">Video Production Packages</h2>
               <p className="text-gray-500">Choose the package that fits your creative vision and budget.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
               <FadeIn delay={0}>
                  <PricingCard 
                     title="Starter Video"
                     price="$3,499"
                     cta="Request Quote"
                     features={[
                        "Up to 1 minute social video",
                        "1 location + 1 talent",
                        "Standard editing + music licence",
                        "Delivery in 7 days",
                        "Instagram/TikTok optimized"
                     ]}
                  />
               </FadeIn>
               <FadeIn delay={100}>
                  <PricingCard 
                     title="Brand Film"
                     price="$7,999"
                     cta="Request Quote"
                     features={[
                        "Up to 4 minutes of final content",
                        "2 locations + styling team",
                        "Advanced editing + motion graphics",
                        "Storyboarding + voiceover",
                        "Multiple platform cutdowns",
                        "Premium color grading"
                     ]}
                     highlight
                  />
               </FadeIn>
               <FadeIn delay={200}>
                  <PricingCard 
                     title="Full Production"
                     price="Custom"
                     cta="Contact Team"
                     features={[
                        "End-to-end creative campaign",
                        "Multi-location shoot",
                        "Influencer integration",
                        "AI-assisted video optimization",
                        "Dedicated producer",
                        "Unlimited revisions"
                     ]}
                  />
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 8. CLIENT STORIES */}
      <section className="py-24 container mx-auto px-6 md:px-12">
         <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold">Client Stories</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { text: "The video brought our runway show to life in ways we never imagined. Absolutely stunning cinematography.", author: "Ana Silva", role: "Fashion Designer" },
               { text: "Our campaign video went viral. The team captured the perfect balance of style and storytelling.", author: "Diego Ramirez", role: "Marketing Director" },
               { text: "Professional, creative, and collaborative. The final videos exceeded all our expectations.", author: "Valentina Cruz", role: "Brand Founder" }
            ].map((item, i) => (
               <FadeIn key={i} delay={i * 100}>
                  <div className="bg-white border border-gray-100 p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                     <div className="flex gap-1 text-fashion-purple mb-6">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                     </div>
                     <p className="text-gray-600 leading-relaxed mb-6 flex-grow">"{item.text}"</p>
                     <div>
                        <p className="font-bold">{item.author}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{item.role}</p>
                     </div>
                  </div>
               </FadeIn>
            ))}
         </div>
      </section>

      {/* 9. CONTACT / START PROJECT */}
      <section id="contact" className="py-24 bg-white border-t border-gray-50">
         <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
               <ContactForm 
                  title="Ready to roll?" 
                  subtitle="Tell us about your vision. We'll assemble the production crew." 
                  serviceType="Video Production"
               />
            </div>
         </div>
      </section>

    </div>
  );
};